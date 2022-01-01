# 通用消息传递

[目录]

## 客观的

将 Wormhole 重构为完全通用的跨链消息传递协议并删除任何特定于应用程序的
核心协议的功能。

## 背景

虫洞最初旨在支持一种非常特殊的跨链消息传递 - 令牌包装/交换
在 Solana 和以太坊之间。阅读有关原始设计及其目标的更多信息
[公告博文](https://medium.com/certus-one/introducing-the-wormhole-bridge-24911b7335f7) 和
[协议文档](https://github.com/certusone/wormhole/blob/48b3c0a3f8b35818952f61c38d89850eb8924b55/docs/protocol.md)

从那时起，很明显，使用 Wormhole 的简单跨链状态证明有强烈的需求
超出其原始设计的应用模型。这包括希望将代币转移到其他项目的第三方项目
比 ERC20(如 NFT)、保险池保证的转移、“慢路径/快路径”设计，以及完全
不同的用例，例如预言机将任意数据广播到多个链。

启用这些用例需要扩展 Wormhole 以提供一组通用的 API 和设计模式，将其解耦
从应用逻辑来看。

当前和未来的 Wormhole 设计正在解决的核心问题是**使能合约在一个
链来验证来自不同链的消息**。链上的智能合约引擎通常不够强大
由于所需的存储和计算量，独立验证来自其他链的昂贵状态证明。他们
因此需要依靠链下预言机来观察和验证消息，然后对它们重新签名，以便它们*可以*
在任何连接的链上进行验证，通过信任 oracle 网络作为中介而不是信任
远程链。

我们之前为当前的虫洞设计设计了一个类似的协议扩展，称为 EE-VAA，它是
这种完全通用的设计的先驱:

- [外部实体 VAA](https://github.com/certusone/wormhole/issues/147)
- [外部实体:账户状态证明](https://github.com/certusone/wormhole/issues/149)
- [外部实体:中继模式](https://github.com/certusone/wormhole/issues/150)

本设计文档假定您基本熟悉 Wormhole 的当前设计。

## 目标

我们希望在 Wormhole 上构建更广泛的 1:1 和 1:n 消息传递应用程序，而无需
对每个新用例的核心协议进行更改。第三方可以构建的此类应用程序的一些示例:

- 不同链上两个特定合约之间的单播消息传递(例如:代币或 NFT 交换)。

- 从单个链组播到一组特定的连接链(例如:中继价格预言机发布的数据
  像 Pyth 或 Chainlink)。

目标是**重新设计协议，使其与应用程序逻辑完全解耦**。这意味着
除提供低级协议外，Wormhole 将不再托管资产或与任何代币交互
可以建立在哪些与令牌交互的协议之上。这包括消息传递 - 虫洞的当前
为某些链设计直接将消息传递到目标合约。使用通用协议，交付机制
不同的用例之间可能会有很大的不同。

## 非目标

本设计文档只关注消息传递协议的机制，并不试图解决
以下问题，留给未来的设计迭代:

- 除了确保我们提供正确的 API 之外，实施应用程序的细节。

- 数据可用性/持久性。将签名的消息传递到目标链取决于
  个人申请。可能的实现包括客户端消息检索和提交，例如
  当前的虫洞实现用于在以太坊上传递传输消息或消息中继。

- 从经济上激励节点以保持正常运行时间而不是审查或伪造消息的机制。

- 包含在监护人集中的治理和标准。我们只指定了治理 API 而没有定义它的
  实现，这可以是连接链之一上的智能合约。

## 概述

我们简化了 Wormhole 的设计，仅提供最终链状态的通用**签名证明**。
任何合约都可以通过发布一条消息来请求证明，然后由
虫洞守护者套装。 签署的证明将发布在虫洞 P2P 网络上。

将消息传递到目标链上的合约被转移到更高层的协议。

## 详细设计

新的通用 VAA 结构如下所示:

```go
//VAA is a verifiable action approval of the Wormhole protocol.
//It represents a message observation made by the Wormhole network.
VAA struct {
	//--------------------------------------------------------------------
	//HEADER - these values are not part of the observation and instead
	//carry metadata used to interpret the observation. It is not signed.
	
	//Protocol version of the entire VAA.
	Version uint8

	//GuardianSetIndex is the index of the guardian set that signed this VAA.
	//Signatures are verified against the public keys in the guardian set.
	GuardianSetIndex uint32

	//Number of signatures included in this VAA
	LenSignatures uint8

	//Signatures contain a list of signatures made by the guardian set.
	Signatures []*Signature

   //--------------------------------------------------------------------
	//OBSERVATION - these fields are *deterministically* set by the
	//Guardian nodes when making an observation. They uniquely identify
	//a message and are used for replay protection.
	//
	//Any given message MUST NEVER result in two different VAAs.
	//
	//These fields are part of the signed digest.

	//Timestamp of the observed message (for most chains, this
	//identifies the block that contains the message transaction).
	Timestamp time.Time

	//Nonce of the VAA, must to be set to random bytes. Nonces
	//prevent collisions where one emitter publishes identical
	//messages within one block (= timestamp).
	//
	//It is not suitable as a global identifier -
	//use the (chain, emitter, sequence) tuple instead.
	Nonce uint32//<-- NEW

	//EmitterChain the VAA was emitted on. Set by the guardian node
	//according to which chain it received the message from.
	EmitterChain ChainID//<-- NEW

	//EmitterAddress of the contract that emitted the message. Set by
	//the guardian node according to protocol metadata.
	EmitterAddress Address//<-- NEW

	//Sequence number of the message. Automatically set and
	//and incremented by the core contract when called by
	//an emitter contract.
	//
	//Tracked per (EmitterChain, EmitterAddress) tuple.
	Sequence uint64//<-- NEW

   //Level of consistency requested by the emitter.
   //
   //The semantic meaning of this field is specific to the target
   //chain (like a commitment level on Solana, number of
   //confirmations on Ethereum, or no meaning with instant finality). 
    ConsistencyLevel uint8//<-- NEW

	//Payload of the message.
	Payload []byte//<-- NEW
}

//ChainID of a Wormhole chain. These are defined in the guardian node
//for each chain it talks to.
ChainID uint8

//Address is a Wormhole protocol address. It contains the native chain's address.
//If the address data type of a chain is < 32 bytes, the value is zero-padded on the left.
Address [32]byte

//Signature of a single guardian.
Signature struct {
//Index of the validator in the guardian set.
Index uint8
//Signature bytes.
Signature [65]byte
}
```

之前的 `Payload` 方法和带有字段的 `BodyTransfer`/`BodyGuardianSetUpdate`/`BodyContractUpgrade` 结构
像 `TargetChain`、`TargetAddress`、`Asset` 和 `Amount` 将被移除并替换为顶级的 `EmitterChain`
和 `EmitterAddress` 字段和一个非结构化的 `Payload` blob。为了允许在接收端排序，`Sequence`
添加了每个发射器跟踪的消息计数器。

值得注意的是，我们删除了目标链语义，将其作为更高级别中继协议的实现细节。

守护者套装更新和合约升级仍将在虫洞合约层进行处理和特殊处理。
不像我们之前那样指定 VAA 有效载荷类型，虫洞合约将改为使用
特定的众所周知的“EmitterChain”和“EmitterAddress”元组，它们被授权执行治理操作。
治理操作是通过调用合约上的专用治理方法来执行的。

预计所有合同都将支持在线升级。这意味着以太坊和 Terra 合约的变化
使它们可升级。

## 相关技术

本节将虫洞与市场上的相关技术进行比较。我们仔细评估了所有现有的
解决方案，以确保我们选择了一组独特的权衡，而不是重新发明任何轮子。

### Cosmos Hub 和 IBC

著名的由 Cosmos SDK 实现的 [IBC 协议](https://ibcprotocol.org/documentation) 占据了类似的
问题空间作为虫洞 - 跨链消息传递。它与虫洞正交并解决了一个更大的
不同形状的问题，导致不同的设计。

IBC 指定了一种具有高级语义的跨链通信协议，如通道、端口、确认、
排序和超时。它是数据包/数据报传输之上的流抽象，有点类似于 TCP/IP
协议。 IBC 是 Cosmos Internet of Blockchain 可扩展性愿景的一部分，拥有数百甚至数千个
主权 IBC 兼容链(称为“区域”)使用中心辐射拓扑通过 IBC 进行通信。数据可用性
由无需许可的中继器提供。

使用 IBC，两个链要直接相互通信，它们必须能够相互证明状态。
这通常意味着为另一条链实现轻客户端。在现代 pBFT 链中，像那些基于
在 [Tendermint](https://v1.cosmos.network/resources/whitepaper) 共识上，验证轻客户端证明
是 [非常便宜](https://blog.cosmos.network/light-clients-in-tendermint-consensus-1237cfbda104) - 所需要的只是
跟踪验证器集更改，而不是完整的头链。然而，链之间直接交谈会
许多链变得难以管理——这就是像 Cosmos Hub 这样的中心枢纽进来的地方。而不是每个人
链发现和验证所有其他链的证明，相反，它可以选择信任单个链 - Hub -
然后为它连接的每个链运行轻客户端。这就要求集线器具有非常高的
安全，这就是 Cosmos Hub 拥有自己的代币 $ATOM 的原因，该代币现在拥有 10 亿美元的市值。

IBC 在连接实现 IBC 协议的现代 pBFT 链时效果最好，其轻客户端证明是
验证便宜。

对于像 Ethereum 或 Solana 这样的链，情况并非如此。以太坊需要很多状态——完整的头链——来
验证包含证明。在 Hub 或任何单独的 Cosmos 链上这样做太昂贵了，因此代理链(
称为“钉区”)代替验证证明，类似于虫洞。挂钩区将有自己的安全性和
验证器设置就像任何其他区域一样，并为以太坊状态提供担保。

请参阅 [Gravity](https://github.com/cosmos/gravity-bridge) 了解以太坊挂钩区域的外观。有可能
在以太坊上验证 Cosmos 轻客户端证明，但反之则不然——挂钩区域验证器就像受信任一样
虫洞节点，并使用类似于虫洞的多重签名机制发送到以太坊的消息。

Solana 目前不提供轻客户端实现，但像以太坊一样，任何 Solana 轻客户端也可以
需要[大量状态](https://docs.solana.com/proposals/simple-payment-and-state-verification)来验证
由于 Solana 共识的复杂性，包含证明。

Wormhole 不是将数百个 IBC 兼容链与一些非 IBC 异常值与挂钩区域连接起来，而是设计了
**连接少量高价值 DeFi 链**，其中大部分不支持 IBC，导致不同
设计。

钉区是 IBC 模型中与虫洞最接近的类比，但有一些重要区别:

- 虫洞是比 IBC 低级的构建块，没有指定连接或目标等高级语义
  链，将其留给更高层的协议(想想“以太网”，而不是“TCP/IP”)。这更灵活，更少
  实施和审计复杂，并将复杂性移至上层和仅在需要的地方使用库。

- 我们不运行我们自己的第 1 层股权证明链，而是依赖于连接链的终结性。一个赌注
  虫洞守护者节点的机制将由其中一个链上的智能合约管理并继承其
  安全属性。节点不能自行发起共识。

- 通过只对链上的最终状态做出反应，每个链都有很强的最终性保证，Wormhole 协议不会
  需要复杂的共识、确定性或领导人选举。它签署了最终状态的*观察*，所有节点都这样做
  同步，并将它们广播到对等网络。没有模棱两可或日食的可能性
  攻击导致分歧。

- 连接链上的监护人设置更新终结性防止了远程攻击和其他 PoS 攻击。后
  一个短暂的收敛窗口，旧的守护者集合变得无效并且无法建立替代历史。

- 我们不依赖包含证明，而是使用更容易理解和审计且更便宜的多重签名方案
  在所有连接的链上进行验证。虫洞不需要包含证明提供的额外保证
  网络，因为它只是在链之间穿梭数据，每个链都有可证明和不可变的历史。
