# クロスチェーンガバナンス意思決定メッセージング

【目次】

## 目的

ガバナンスを伝達するために、ワームホールコアの実装とさまざまなチェーン上のモジュールのプロトコルを確立する
お互いの決定/指示。

## 目標

-グローバルおよびチェーン固有のガバナンスアクションのメッセージングプロトコルを定義します。
-メッセージには、実装に必要なすべての情報が含まれている必要があります。

## 非目標

-ガバナンスプロセス自体を定義します(ステーキング、投票など)

## 概要

ガバナンスは、Solana(指定予定)のスマートコントラクトで発生します。この契約は、最終決定されたVAAをワームホールに渡します。

他のチェーンの実装には、そのコントラクトのアドレスがハードコーディングされており、そのコントラクトからのガバナンスアクション用の一連のVAAを受け入れます。
すべてのガバナンスVAAは、「GovernancePacket」構造に従います。

### 一般的なパケット構造

`Module`は、このガバナンスVAAが対象としているコンポーネントです。これはコアブリッジ契約である可能性がありますが、
プログラム(ワームホール拡張モジュールなど)は、独自の機能を選択することで、ガバナンス契約とガバナンスメッセージングを使用できます。
識別子。

`Action`は、モジュールのさまざまなガバナンスメッセージペイロードを識別する一意のアクションIDです。

```go
GovernancePacket struct {
   //Module identifier (left-padded)
    Module [32]byte
   //Action index
    Action uint8
   //Chain index (0 for non-specific actions like guardian set changes)
    Chain uint16
   //Action-specific payload fields
    [...]
}
```

### 特定のガバナンスVAA

次のVAAは、コアワームホール契約のガバナンスVAAの例です。

```go
//ContractUpgrade is a VAA that instructs an implementation on a specific chain to upgrade itself
ContractUpgrade struct {
   //Core Wormhole Module
    Module [32]byte = "Core"
   //Action index (1 for Contract Upgrade)
    Action uint8 = 1
   //Target chain ID
    Chain uint16
   //Address of the new Implementation
    NewContract [32]byte
}

//GuardianSetUpgrade is a VAA that instructs an implementation to upgrade the current guardian set
GuardianSetUpgrade struct {
   //Core Wormhole Module
    Module [32]byte = "Core"
   //Action index (2 for GuardianSet Upgrade)
    Action uint8 = 2
   //This update is chain independent
    Chain uint16 = 0

   //New GuardianSet
    NewGuardianSetIndex uint32
   //New GuardianSet
    NewGuardianSetLen u8
    NewGuardianSet []Guardian
}
```
