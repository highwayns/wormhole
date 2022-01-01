# 消息发布

[目录]

## 客观的

指定通过 Wormhole 发布消息的机制和接口。

## 背景

原始的通用消息传递设计文档描述了虫洞消息的格式，但是，消息的方式是
为了构建链端点，需要明确定义已发布。

## 目标

* 指定发布消息的接口。
* 指定消息发布的费用模型。

## 非目标

* 动态垃圾邮件保护。
* 费用分配。

## 概述

每条链上的核心 Wormhole 合约都有一个向 Wormhole 发布消息的方法，该方法将发出一个事件
这需要被在给定链上运行完整节点的监护人观察到。

费用将以相应连锁店的本国货币支付。费用可以
协议声明并收集在 Solana 的费用池中，在那里它们可以根据协议规则进行分配。

## 详细设计

虫洞核心合约有一个 `postMessage` 方法，可供 EOA(外部拥有的账户)或 SC(智能
合同)
通过虫洞发布消息。

此方法必须对有效负载进行验证，以达到 **750 字节**的最大大小限制。消息
应该发出，以便守护者可以以允许离线节点重放丢失的块的方式获取它。

虫洞合约还需要使已发布消息的发射器可供监护人使用。这
如果链允许证明调用者控制或者是
由上述地址(即 Solana PDA)授权，或者它是交易的发送者。

此外，Wormhole 合约将跟踪每个发射器的序列号，该序列号随每个发射器递增
消息提交。

时间戳由监护人软件使用消息发布的区块的最终时间戳得出
在。

发布消息时，发送者可以指定监护人在发送消息之前应等待多少次确认
产生证明。这允许延迟敏感的应用程序在关键的时候牺牲安全性
应用程序可以牺牲延迟而不是安全。具有即时终结性的链可以省略参数。

**费用:**

为了激励监护人并防止虫洞网络的垃圾邮件，发布消息需要付费
支付。

在发布消息时，该费用应该以任何链的本地费用货币支付。这假设
任何发送交易的人都需要持有此类资产，以便交易发布
消息，因此费用不会对桥的可用性产生负面影响。

费用由治理使用`SetMessageFee` VAA 定义。设置的费用以各自的链计价
本国货币。每个链的虫洞计划都应该使用链上价格预言机(例如 Uniswap 池 TWAP 或
Pyth 价格馈送)
每条链都设置费用，以允许协议考虑保持链节点所需的努力
在线和帐户垃圾邮件攻击。

费用将在由虫洞合约、治理或更自动化的机制控制的钱包中收取
将在以后的设计文档中实现将能够产生一个 `TransferFees`，允许移动收集到的
向指定地址收取代币费用。如果有一个被广泛接受的令牌桥，这个机制可能会扩展到
将代币桥接到治理和抵押合约所在的链上，以便在那里分发。

### API/数据库架构

建议的桥接接口:

`postMessage(bytes payload, u8knowledges)` - 发布一条消息，由 Wormhole 证明。

`setFees(VAA fee_payload)` - 使用 `SetMessageFee` VAA 更新费用

`transferFees(VAA transfer_payload)` - 使用 `TransderFees` VAA 的转账费用

---

**有效载荷**:

有效负载遵循治理消息格式。

设置消息费用:

```
//Core Wormhole Module
Module [32]byte = "Core"
//Action index (3 for Fee Update)
Action uint16 = 3
Chain uint16
//Message fee in the native token
Fee uint256
```

TransferFees:

```
//Core Wormhole Module
Module [32]byte = "Core"
//Action index (4 for Fee Transfer)
Action uint16 = 4
Chain uint16
//Amount being transferred (big-endian uint256)
Amount uint256
//Address of the recipient. Left-zero-padded if shorter than 32 bytes
To [32]uint8
```

## 注意事项

收费需要治理决策。 这意味着大量的人工干预
向抵押人和监护人分配费用。 缺乏令牌桥使得早期很难实现自动化
天的协议。 此外，传输原语不太可能支持令牌桥(这可能需要智能合约
电话)，因此需要签订合同。

## 安全注意事项
