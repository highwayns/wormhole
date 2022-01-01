# 令牌桥应用程序

[目录]

## 客观的

使用虫洞消息传递协议在不同的连接链之间传输令牌。

## 背景

去中心化金融生态正朝着不同链不同优势的方向发展
成为各种协议的家。然而，令牌通常只在单个链上铸造，因此
与其他链上的生态系统和协议断开连接。

每条链通常都有一个事实上的代币发行标准，例如以太坊上的 ERC-20 和 Solana 上的 SPL。那些
标准虽然不完全相同，但都实现了具有相同概念的类似接口，例如拥有、铸造、
转移和燃烧代币。

为了连接链，理想情况下，代币应该有一个本地造币厂——它最初创建的链上的原始代币
on - 以及其他链上的包装版本，代表本机令牌的所有权。

虽然虫洞消息传递协议提供了一种在链之间证明和传输消息的方法，它可以
从技术上讲，用于为单个令牌实现桥接，这将需要为每个令牌进行手动工程工作
令牌并创建具有不良用户体验的不兼容协议。

## 目标

我们想要使用 Wormhole 消息传递协议来实现一个通用的令牌桥，该协议能够桥接任何
链之间符合标准的令牌，按需在每个连接的链上创建独特的包装表示。

* 允许在链之间传输符合标准的代币。
* 允许创建包装资产。
* 使用与大多数 VM 数据类型兼容的通用令牌表示。

## 非目标

* 支持烧费/变基/非标准代币。
* 管理并非广泛适用于所有链的特定于链的令牌元数据。
* 自动将代币传输消息中继到目标链。

## 概述

在令牌桥网络的每条链上都会有一个令牌桥端点程序。

这些程序将管理有效载荷的授权(发射器过滤)，外链的包装表示
代币(“包装资产”)和托管锁定代币。

## 详细设计

对于出站转账，合约将有一个锁定方法，要么锁定一个原生代币，要么产生一个
发布到虫洞的相应传输消息，或烧毁包装的令牌并生成/发布所述消息。

对于入站传输，他们可以使用、验证和处理包含令牌桥有效负载的虫洞消息。

将有四种不同的有效载荷:

* `Transfer` - 将触发锁定代币的释放或包装代币的铸造。
* `AssetMeta` - 证明资产元数据(在第一次传输之前需要)。
* `RegisterChain` - 注册外链的代币桥合约(发射者地址)。
* `UpgradeContract` - 升级合约。

由于任何人都可以使用 Wormhole 发布与令牌桥的有效负载格式匹配的消息，因此授权
需要实现有效载荷。这是使用“(emitter_chain,emitter_address)”元组完成的。的每一个端点
令牌桥需要知道其他链上各自其他端点的地址。本次注册token
桥接端点是通过“RegisterChain”实现的，其中可以注册“(chain_id,emitter_address)”元组。仅有的
每个链可以注册一个端点。端点是不可变的。仅当发射器为
硬编码的治理合约。

为了将资产转移到另一条链，用户需要调用桥合约的`transfer`方法与
收件人详细信息和他们愿意支付的相应费用。合约将保管代币
帐户(如果它是原生代币)或销毁包装好的资产。包装好的资产可以被烧毁，因为它们可以自由地
一旦代币被转回就铸造，这样总供应量可以指示当前代币的总量
持有这条链。锁定后，合约将向 Wormhole 发布“Transfer”有效载荷消息。一旦消息
经监护人签名后，可发布至转账目标链。然后目标链将
要么从托管中释放原生代币，要么根据它是否是原生代币来铸造一个包装好的资产。这
程序将跟踪消耗的消息摘要以防止重播。

由于将 VAA 发布到令牌桥的方法是由消息签名本身授权的，因此任何人都可以发布
任何消息。 `completeTransfer` 方法将接受费用接收者。如果设置了该字段，则费用金额
指定将发送给费用接收者，剩余的金额将发送给预期的转账接收者。
这允许独立的中继者完成传输，以改善用户的 UX，只需要发送一个
只要费用足够并且任何充当中继者的人都接受代币，就可以进行单笔交易。

为了保持 `Transfer` 消息较小，它们不携带令牌的所有元数据。然而，这意味着之前
令牌可以第一次转移到新链，需要桥接元数据和包裹的资产
创建。在这种情况下，元数据包括小数位数，这是实例化令牌的核心要求。

令牌的元数据可以通过在其各自的本地链上调用 `attestToken` 来证明，这将产生一个
`AssetMeta` 虫洞消息。此消息可用于证明状态并在任何链上初始化 WrappedAsset
虫洞网络使用细节。令牌由元组“(chain_id，chain_address)”标识，元数据应该
映射到这个标识符。对于给定的标识符，包装的资产只能创建一次并且不会更新。

### 代币金额和小数的处理

由于某些受支持链的限制，通过代币桥传递的所有代币数量都被截断为最多 8 位小数。

任何链的实现都必须确保任何令牌中只有 MaxUint64 单元(后移位)在任何给定时间(所有目标链组合)桥接到虫洞网络，即使插槽长 32 字节(理论上适合 uint256)。

存入期间因截断而无法转移的代币“灰尘”需要退还给用户。

**例子:**
- 一个 18 位十进制以太坊代币的数量“1”最初表示为:`1000000000000000000`，通过虫洞它被传递为:`100000000`。
- 4 位十进制标记的数量“2”表示为“20000”，并通过虫洞而没有小数点移位。

**处理目标链:**

目标链上的实现可以通过以下方式之一处理十进制移位:
- 如果链支持原始十进制数量(从`AssetMeta` 得知)，它可以将十进制移回原始十进制数量。这允许 DeFi 协议在不同 EVM 环境中的开箱即用互操作性。
- 否则包装的令牌应坚持协议使用的 8 位小数。

### API/数据库架构

建议的桥接接口:

`attestToken(address token)` - 为给定的令牌生成一个 `AssetMeta` 消息

`transfer(地址令牌，uint64-uint256 数量(大小取决于链标准)，uint16 接收者链，bytes32 接收者，uint256 费用)` - 启动
一个`转移`。代币本机小数中的金额。

`createWrapped(Message assetMeta)` - 使用 `AssetMeta` 创建一个包装好的资产

`completeTransfer(Message transfer)` - 执行 `Transfer` 消息

`registerChain(Message registerChain)` - 执行一个 `RegisterChain` 治理消息

`upgrade(Message upgrade)` - 执行 `UpgradeContract` 治理消息

---
**有效载荷**:

转移:

```
PayloadID uint8 = 1
//Amount being transferred (big-endian uint256)
Amount uint256
//Address of the token. Left-zero-padded if shorter than 32 bytes
TokenAddress bytes32
//Chain ID of the token
TokenChain uint16
//Address of the recipient. Left-zero-padded if shorter than 32 bytes
To bytes32
//Chain ID of the recipient
ToChain uint16
//Amount of tokens (big-endian uint256) that the user is willing to pay as relayer fee. Must be <= Amount.
Fee uint256
```

AssetMeta:

```
PayloadID uint8 = 2
//Address of the token. Left-zero-padded if shorter than 32 bytes
TokenAddress [32]uint8
//Chain ID of the token
TokenChain uint16
//Number of decimals of the token
//(the native decimals, not truncated to 8)
Decimals uint8
//Symbol of the token (UTF-8)
Symbol [32]uint8
//Name of the token (UTF-8)
Name [32]uint8
```

RegisterChain:

```
//Gov Header
//Module Identifier  ("TokenBridge" left-padded)
Module [32]byte 
//Governance Action ID (1 for RegisterChain)
Action uint8 = 1
//Target Chain (Where the governance action should be applied)
//(0 is a valid value for all chains) 
ChainId uint16

//Packet
//Emitter Chain ID
EmitterChainID uint16
//Emitter address. Left-zero-padded if shorter than 32 bytes
EmitterAddress [32]uint8
```

UpgradeContract:

```
//Header
//Module Identifier  ("TokenBridge" left-padded)
Module [32]byte 
//Governance Action ID (2 for UpgradeContract)
Action uint8 = 2
//Target Chain  (Where the governance action should be applied)
ChainId uint16

//Packet
//Address of the new contract
NewContract [32]uint8
```

## 注意事项

无法保证完成转移。 如果用户发起转账并且没有调用`completeTransfer`
在目标链上，传输可能无法完成。 如果监护人设置更改发生在和
原始签名人监护人集到期，转账将无限期卡住。

由于令牌桥端点无法知道哪个其他链已经为
其链上的原生资产，可能会针对尚未在其上设置打包资产的资产发起转移
目标链。 但是，一旦设置了包装的资产(可以随时完成)，传输将变得可执行
.