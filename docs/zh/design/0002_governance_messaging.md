# 跨链治理决策消息传递

[目录]

## 客观的

为不同链上的虫洞核心实现和模块建立协议以进行治理沟通
决定/指示。

## 目标

- 为全球和特定链治理行动定义消息传递协议。
- 消息应携带实现实现它所需的所有必需信息。

## 非目标

- 定义治理流程本身(抵押、投票等)

## 概述

治理发生在 Solana 上的智能合约中(待定)。该合同将最终决定的 VAA 传递给虫洞。

其他链上的实现具有该合约的硬编码地址，并接受一组用于该合约的治理操作的 VAA。
所有治理 VAA 都遵循“GovernancePacket”结构。

### 通用数据包结构

`Module` 是这个治理 VAA 的目标组件。这可能是核心桥梁合同，但任何
程序(例如一个虫洞扩展模块)可以通过选择一个独特的来使用治理契约和治理消息
标识符。

`Action` 是唯一的操作 ID，用于标识模块的不同治理消息有效负载。

```go
GovernancePacket struct {
    // Module identifier (left-padded)
    Module [32]byte
    // Action index
    Action uint8
    // Chain index (0 for non-specific actions like guardian set changes)
    Chain uint16
    // Action-specific payload fields
    [...]
}
```

### 指定的治理 VAA

以下 VAA 是核心 Wormhole 合约的治理 VAA 示例。

```go
// ContractUpgrade is a VAA that instructs an implementation on a specific chain to upgrade itself
ContractUpgrade struct {
    // Core Wormhole Module
    Module [32]byte = "Core"
    // Action index (1 for Contract Upgrade)
    Action uint8 = 1
    // Target chain ID
    Chain uint16
    // Address of the new Implementation
    NewContract [32]byte
}

// GuardianSetUpgrade is a VAA that instructs an implementation to upgrade the current guardian set
GuardianSetUpgrade struct {
    // Core Wormhole Module
    Module [32]byte = "Core"
    // Action index (2 for GuardianSet Upgrade)
    Action uint8 = 2
    // This update is chain independent
    Chain uint16 = 0

    // New GuardianSet
    NewGuardianSetIndex uint32
    // New GuardianSet
    NewGuardianSetLen u8
    NewGuardianSet []Guardian
}
```
