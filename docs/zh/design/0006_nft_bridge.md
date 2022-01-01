# NFT 桥接应用

[目录]

## 客观的

使用 Wormhole 消息传递协议在不同连接的链之间传输 NFT。

## 背景

NFT 是一种新的资产类别，最近越来越受欢迎。它特别吸引了新用户和公司
加密。 NFTs，就像传统的代币一样，是在单个区块链上铸造的，不能转移到其他链上。
然而，随着越来越多的链引入 NFT 标准和市场，需要跨链传输 NFTS 的方法
进入这些市场并将它们收集在一个钱包中。

## 目标

我们想要使用 Wormhole 消息传递协议来实现一个通用的 NFT 桥接器，它能够桥接任何
链之间符合标准的 NFT，按需在每个连接的链上创建独特的包装表示。

* 允许在链之间传输符合标准的 NFT。
* 使用与大多数 VM 数据类型兼容的通用 NFT 表示。

## 非目标

* 支持 EIP1155
* 管理/传输并非广泛适用于所有链的特定于链的 NFT 元数据。
* 自动将 NFT 传输消息中继到目标链。

## 概述

在 NFT 桥接网络的每条链上都会有一个 NFT 桥接端点程序。

这些程序将管理有效载荷的授权(发射器过滤)，外链的包装表示
NFT(“Wrapped NFT”)和托管锁定 NFT。

我们旨在支持:

- EIP721:以太坊，BSC
- Metaplex SPL Meta: Solana

## 详细设计

对于出站转账，合约将有一个锁定方法，要么锁定一个本地 NFT 并产生一个
发布到 Wormhole 的相应传输消息，或烧毁包装的 NFT 并生成/发布所述消息。

对于入站传输，他们可以使用、验证和处理包含 NFT 桥负载的虫洞消息。

将有三种不同的有效载荷:

* 转移 - 将触发释放锁定的 NFT 或铸造包裹的 NFT。

与 NFT 网桥相同:

* RegisterChain - 为外部链注册 NFT 桥接合约(发射方地址)。
* UpgradeContract - 升级合同。

为了将一个 NFT 转移到另一个链，用户需要调用桥接合约的 transfer 方法与
收件人详细信息。合约要么将 NFT 保存在托管账户中(如果它是原生 NFT)要么销毁
包裹的 NFT。包装好的 NFT 可以被烧毁，因为一旦它们被转移回来，它们就可以自由铸造。之后
锁定合约将向虫洞发送传输负载消息。一旦消息得到监护人的签名，
它可以发布到传输的目标链。然后目标链将从中释放本机 NFT
保管或铸造一个包裹的 NFT，取决于它是否是那里的本地 NFT。该程序将跟踪消耗
用于防止重播的消息摘要。

由于将 VAA 发布到 NFT 网桥的方法是由消息签名本身授权的，因此任何人都可以发布任何
信息。

由于每个 NFT 都有唯一的元数据，因此传输消息包含所有元数据，一个传输(甚至每个 NFT 上的第一个)
与令牌桥相比，只需要传递一个虫洞消息。关于第一个转移动作
NFT(地址/符号/名称)创建了一个包装好的资产(即主版本或新合约)。当包装好的资产 (
合同)已经初始化或刚刚初始化，注册(新)token_id 和元数据 URL。

### API/数据库架构

建议的桥接接口:

转移(地址令牌，uint256 token_id，uint16接收者链，bytes32接收者) - 发起转移

completeTransfer(Message transfer) - 执行传输消息

registerChain(Message registerChain) - 执行 RegisterChain 治理消息

upgrade(Message upgrade) - 执行 UpgradeContract 治理消息

---
Payloads:

Transfer:

```
PayloadID uint8 = 1
//Address of the NFT. Left-zero-padded if shorter than 32 bytes
NFTAddress [32]uint8
//Chain ID of the NFT
NFTChain uint16
//Symbol of the NFT
Symbol [32]uint8
//Name of the NFT
Name [32]uint8
//ID of the token (big-endian uint256)
TokenID [32]uint8
//URL of the NFT
URLLength u8
URL [n]uint8
//Address of the recipient. Left-zero-padded if shorter than 32 bytes
To [32]uint8
//Chain ID of the recipient
ToChain uint16
```

RegisterChain:

```
PayloadID uint8 = 2
//Chain ID
ChainID uint16
//Emitter address. Left-zero-padded if shorter than 32 bytes
EmitterAddress [32]uint8
```

UpgradeContract:

```
PayloadID uint8 = 3
//Address of the new contract
NewContract [32]uint8
```

## 注意事项

无法保证完成转移。如果用户发起传输并且没有调用 completeTransfer on
目标链，传输可能无法完成。如果监护人设置更改发生在原始设置之间
签名人监护人集到期，转账将无限期卡住。

由于 NFT 桥接端点无法知道哪个其他链已经为
其链上的原生资产，可能会针对尚未在其上设置打包资产的资产发起转移
目标链。但是，一旦设置了包装的资产(可以随时完成)，传输将变得可执行
.

目前 Solana 仅支持 u64 令牌 ID，与以太坊不兼容，其中特别提到使用
UUID 作为令牌 ID(利用 uint256 的所有字节)。要么需要一种机制来翻译 id，即
`[32]u8 -> incrementing_u64` 的映射(期望永远不会超过 MaxU64 版本)或 Solana 需要
更改他们的 NFT 合约。