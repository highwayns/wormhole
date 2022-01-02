# トークンブリッジアプリ

【目次】

## 目的

ワームホールメッセージパッシングプロトコルを使用して、接続されている異なるチェーン間でトークンを転送します。

## バックグラウンド

分散型ファイナンスエコシステムは、さまざまな強みを持つさまざまなチェーンが存在する方向に発展しています
さまざまなプロトコルのホームになります。ただし、トークンは通常、単一のチェーンでのみ作成されるため、
他のチェーンのエコシステムとプロトコルから切断されています。

各チェーンには通常、イーサリアムのERC-20やソラナのSPLのように、トークン発行のデファクトスタンダードが1つあります。それらの
標準は同一ではありませんが、所有、鋳造、
トークンの転送と書き込み。

チェーンを接続するには、トークンにネイティブのミントが含まれているのが理想的です。これは、元々作成されたチェーン上の元のトークンです。
on-およびネイティブトークンの所有権を表す他のチェーンのラップされたバージョン。

ワームホールメッセージングプロトコルは、チェーン間でメッセージを証明および転送する方法を提供しますが、
技術的には、個々のトークンのブリッジングを実装するために使用されます。これには、それぞれに手動のエンジニアリング作業が必要になります。
トークンを作成し、UXが悪い互換性のないプロトコルを作成します。

## 目標

あらゆるものをブリッジできるワームホールメッセージパッシングプロトコルを使用して、一般化されたトークンブリッジを実装したいと考えています。
チェーン間の標準準拠のトークン。接続された各チェーンに一意のラップされた表現をオンデマンドで作成します。

*チェーン間での標準準拠のトークンの転送を許可します。
*ラップされたアセットの作成を許可します。
*ほとんどのVMデータ型と互換性のあるユニバーサルトークン表現を使用します。

## 非目標

*手数料の燃焼/リベース/非標準トークンをサポートします。
*すべてのチェーンに広く適用できるわけではないチェーン固有のトークンメタデータを管理します。
*トークン転送メッセージをターゲットチェーンに自動的に中継します。

## 概要

トークンブリッジネットワークの各チェーンには、トークンブリッジエンドポイントプログラムがあります。

これらのプログラムは、ペイロードの承認(エミッターフィルタリング)、外部チェーンのラップされた表現を管理します
トークン(「ラップされたアセット」)および保管ロックされたトークン。

## 詳細設計

アウトバウンド転送の場合、コントラクトには、ネイティブトークンをロックして、
ワームホールに投稿された、またはラップされたトークンを焼き付けてそのメッセージを生成/投稿するそれぞれの転送メッセージ。

インバウンド転送の場合、トークンブリッジペイロードを含むワームホールメッセージを消費、検証、および処理できます。

4つの異なるペイロードがあります。

* `Transfer`-ロックされたトークンの解放またはラップされたトークンの作成をトリガーします。
* `AssetMeta`-アセットメタデータを証明します(最初の転送の前に必要です)。
* `RegisterChain`-外部チェーンのトークンブリッジ契約(送信者アドレス)を登録します。
* `UpgradeContract`-契約をアップグレードします。

誰でもワームホールを使用して、トークンブリッジのペイロード形式に一致するメッセージを公開できるため、承認
ペイロードを実装する必要があります。これは、 `(emitter_chain、emitter_address)`タプルを使用して行われます。のすべてのエンドポイント
トークンブリッジは、他のチェーン上のそれぞれの他のエンドポイントのアドレスを知る必要があります。このトークンの登録
ブリッジエンドポイントは、 `(chain_id、emitter_address)`タプルを登録できる `RegisterChain`を介して実装されます。それだけ
チェーンごとに1つのエンドポイントを登録できます。エンドポイントは不変です。このペイロードは、エミッタが
ハードコードされたガバナンス契約。

アセットを別のチェーンに転送するには、ユーザーはブリッジコントラクトの「転送」メソッドを呼び出す必要があります。
受取人の詳細と彼らが喜んで支払うそれぞれの料金。契約はトークンを保管します
アカウント(ネイティブトークンの場合)またはラップされたアセットを焼きます。ラップされたアセットは自由に焼けるので燃やすことができます
トークンが返送されるとミントされ、このようにして総供給量は現在のトークンの総量を示すことができます
このチェーンで開催されました。ロックアップ後、コントラクトは「転送」ペイロードメッセージをワームホールに送信します。メッセージが一度
保護者によって署名されている場合は、転送のターゲットチェーンに投稿できます。その後、ターゲットチェーンは
ネイティブトークンがそこにあるかどうかに応じて、ネイティブトークンを保管から解放するか、ラップされたアセットを作成します。 The
プログラムは、再生防止のために消費されたメッセージダイジェストを追跡します。

トークンブリッジにVAAを投稿する方法は、メッセージ署名自体によって承認されているため、誰でも投稿できます。
任意のメッセージ。 `completeTransfer`メソッドは手数料の受取人を受け入れます。そのフィールドが設定されている場合、手数料額
指定された金額は手数料の受取人に送られ、残りの金額は送金の目的の受取人に送られます。
これにより、独立した中継者が転送を完了して、送信するだけでよいユーザーのUXを向上させることができます。
料金が十分であり、中継者として行動する人によってトークンが受け入れられる限り、単一のトランザクション。

`Transfer`メッセージを小さく保つために、それらはトークンのすべてのメタデータを運びません。しかし、これは前にそれを意味します
トークンを初めて新しいチェーンに転送できるため、メタデータをブリッジして、ラップされたアセットを作成する必要があります
作成した。この場合のメタデータには、トークンをインスタンス化するためのコア要件である小数点以下の桁数が含まれます。

トークンのメタデータは、それぞれのネイティブチェーンで `attestToken`を呼び出すことで証明できます。これにより、
`AssetMeta`ワームホールメッセージ。このメッセージを使用して、状態を証明し、チェーン内の任意のチェーンでWrappedAssetを初期化できます。
詳細を使用したワームホールネットワーク。トークンはタプル `(chain_id、chain_address)`で識別され、メタデータは
この識別子にマップされます。ラップされたアセットは、特定の識別子に対して1回だけ作成でき、更新されません。

### トークンの金額と小数の処理

一部のサポートされているチェーンの制約により、トークンブリッジを通過するすべてのトークン量は、小数点以下8桁まで切り捨てられます。

チェーンの実装では、スロットの長さが32バイトであっても(理論的にはuint256に適合)、常にMaxUint64ユニット(シフト後)のみがワームホールネットワークにブリッジされるようにする必要があります(すべてのターゲットチェーンを組み合わせる)。

デポジット中の切り捨てにより譲渡できないトークン「ダスト」は、ユーザーに返金する必要があります。

**例:**
-小数点以下18桁のイーサリアムトークンの量「1」は、元々「1000000000000000000」として表され、ワー​​ムホールでは「100000000」として渡されます。
-4つの10進数トークンの量「2」は `20000`として表され、10進数のシフトなしでワームホールを通過します。

**ターゲットチェーンの処理:**

ターゲットチェーンの実装は、次のいずれかの方法で10進シフトを処理できます。
-チェーンが元の小数( `AssetMeta`から知られている)をサポートしている場合、元の小数に小数シフトを戻すことができます。これにより、たとえばさまざまなEVM環境間でのDeFiプロトコルのすぐに使用可能な相互運用性が可能になります。
-それ以外の場合、ラップされたトークンは、プロトコルが使用する小数点以下8桁に固定する必要があります。

### API/データベーススキーマ

提案されたブリッジインターフェイス:

`attestToken(address token)`-指定されたトークンに対して `AssetMeta`メッセージを生成します

`transfer(アドレストークン、uint64-uint256の金額(チェーンの標準に応じたサイズ)、uint16のrecipient_chain、bytes32の受信者、uint256の料金)`-開始
`転送`。トークンのネイティブ小数での量。

`createWrapped(Message AssetMeta)` -`AssetMeta`を使用してラップされたアセットを作成します

`completeTransfer(Message transfer)` -`Transfer`メッセージを実行します

`registerChain(Message registerChain)` -`RegisterChain`ガバナンスメッセージを実行します

`upgrade(Message upgrade)` -`UpgradeContract`ガバナンスメッセージを実行します

---
**Payloads**:

Transfer:

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

## 警告

転送の完了を保証するものではありません。 ユーザーが転送を開始し、 `completeTransfer`を呼び出さない場合
ターゲットチェーンでは、転送が完了しない場合があります。 保護者セットの変更がとの間で発生した場合
元の署名者保護者セットの有効期限が切れると、転送は無期限に停止します。

トークンブリッジエンドポイントは、他のどのチェーンがすでにアセットをラップしているかを知る方法がないため、
チェーン上のネイティブアセットの場合、ラップされたアセットがまだ設定されていないアセットに対して転送が開始される可能性があります
ターゲットチェーン。 ただし、ラップされたアセットが設定されると、転送は実行可能になります(これはいつでも実行できます)
。