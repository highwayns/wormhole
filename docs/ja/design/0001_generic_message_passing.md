# 一般的なメッセージパッシング

【目次】

## 目的

ワームホールを完全に汎用的なクロスチェーンメッセージングプロトコルにリファクタリングし、アプリケーション固有のものを削除するには
コアプロトコルからの機能。

## バックグラウンド

ワームホールは元々、非常に特殊な種類のクロスチェーンメッセージパッシング(トークンラッピング/スワップ)をサポートするように設計されていました
ソラナとイーサリアムの間。元のデザインとその目標について詳しくは、
[発表ブログ投稿](https://medium.com/certus-one/introducing-the-wormhole-bridge-24911b7335f7)および
[プロトコルドキュメント](https://github.com/certusone/wormhole/blob/48b3c0a3f8b35818952f61c38d89850eb8924b55/docs/protocol.md)

それ以来、ワームホールの単純なクロスチェーン状態証明を使用することが強く求められていることが明らかになりました。
元の設計を超えたアプリケーションのモデル。これには、他のトークンを転送したいサードパーティプロジェクトが含まれます
ERC20(NFTなど)よりも、保険プール、「スローパス/ファストパス」設計、および完全に保証された転送
オラクルが任意のデータを複数のチェーンにブロードキャストするなど、さまざまなユースケース。

これらのユースケースを有効にするには、ワームホールを拡張して、APIとデザインパターンの一般的なセットを提供し、それを分離する必要があります。
アプリケーションロジックから。

現在および将来のワームホール設計の両方が解決している主要な問題は、** 1つの契約を有効にすることです。
別のチェーンからのメッセージを検証するためのチェーン**。チェーン上のスマートコントラクトエンジンは、多くの場合、十分に強力ではありません
必要なストレージと計算の量のために、他のチェーンからの高価な状態証明を独立して検証します。彼ら
したがって、メッセージを監視および検証するためにオフチェーンのオラクルに依存し、メッセージが*できる*ように再署名する必要があります。
を信頼するのではなく、仲介者としてoracleネットワークを信頼することにより、接続されたチェーンのいずれかで検証されます
リモートチェーン。

以前、EE-VAAと呼ばれる現在のワームホール設計用の同様のプロトコル拡張を設計しました。
この完全に一般的な設計の前身:

-[外部エンティティVAA](https://github.com/certusone/wormhole/issues/147)
-[外部エンティティ:アカウント状態の証明](https://github.com/certusone/wormhole/issues/149)
-[外部エンティティ:リレイヤーモード](https://github.com/certusone/wormhole/issues/150)

この設計ドキュメントは、ワームホールの現在の設計に基本的に精通していることを前提としています。

## 目標

ワームホール上に1:1と1:nの両方のメッセージングアプリケーションを、必要とせずに構築できるようにしたいと考えています。
新しいユースケースごとにコアプロトコルを変更します。サードパーティが構築できるそのようなアプリケーションのいくつかの例:

-異なるチェーン上の2つの特定のコントラクト間のユニキャストメッセージング(例:トークンまたはNFTスワップ)。

-単一のチェーンから接続されたチェーンの特定のセットへのマルチキャスト(例:価格オラクルによって公開されたデータの中継
  PythやChainlinkのように)。

目標は、**アプリケーションロジックから完全に分離されるようにプロトコルを再設計する**ことです。この意味は
ワームホールは、低レベルのプロトコルを提供する以外に、資産を保管したり、トークンとやり取りしたりすることはなくなります。
トークンと相互作用するプロトコルは、その上に構築できます。これにはメッセージ配信が含まれます-ワームホールの現在
一部のチェーンのターゲットコントラクトに直接配信されるメッセージを設計します。ジェネリックプロトコルでは、配信メカニズム
ユースケースによって大きく異なる可能性があります。

## 非目標

この設計ドキュメントは、メッセージパッシングプロトコルの仕組みにのみ焦点を当てており、
次の問題、将来の設計反復のためにそれらを残します:

-適切なAPIを確実に提供すること以外の、アプリケーションの実装の詳細。

-データの可用性/永続性。署名されたメッセージをターゲットチェーンに配信するのは、
  個々のアプリケーション。可能な実装には、クライアント側のメッセージの取得と送信が含まれます。
  現在のワームホールの実装は、イーサリアムまたはメッセージリレーで転送メッセージを配信するために行われます。

-稼働時間を維持し、メッセージを検閲または偽造しないようにノードに経済的にインセンティブを与えるメカニズム。

-ガバナンスと保護者セットに含めるための基準。ガバナンスAPIを指定するのは、その定義なしでのみです。
  実装。これは、接続されたチェーンの1つでのスマートコントラクトである可能性があります。

## 概要

ワームホールの設計を簡素化して、一般的な**最終的なチェーン状態の署名された証明書**のみを提供します。
証明書は、メッセージを公開することにより、任意の契約で要求できます。メッセージは、
ワームホールガーディアンセット。署名された証明書は、ワームホールP2Pネットワークで公開されます。

ターゲットチェーン上のコントラクトへのメッセージの配信は、上位層プロトコルにシフトされます。

## 詳細設計

新しい汎用VAA構造体は、次のようになります。

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

以前の `Payload`メソッドと` BodyTransfer`/`BodyGuardianSetUpdate`/` BodyContractUpgrade`構造体とフィールド
`TargetChain`、` TargetAddress`、 `Asset`、` Amount`のように削除され、トップレベルの `EmitterChain`に置き換えられます
および `EmitterAddress`フィールドと非構造化` Payload`ブロブ。受信側での注文を可能にするために、 `シーケンス`
エミッタごとに追跡されるメッセージカウンタであるが追加されました。

特に、ターゲットチェーンのセマンティクスを削除し、上位レベルのリレープロトコルの実装の詳細として残します。

ガーディアンセットの更新と契約のアップグレードは、引き続きワームホール契約レイヤーで処理され、特別な場合に使用されます。
以前に行ったようにVAAペイロードタイプを指定する代わりに、ワームホールコントラクトは代わりに
ガバナンス操作の実行を許可されている特定の有名な `EmitterChain`および` EmitterAddress`タプル。
ガバナンス業務は、契約に専用のガバナンス手法を呼び出すことによって実行されます。

すべての契約は、オンラインアップグレードをサポートすることが期待されます。これは、イーサリアムとテラの契約が
それらをアップグレード可能にします。

## 関連技術

このセクションでは、ワームホールを市場に出回っている関連テクノロジーと比較します。既存のすべてを慎重に評価しました
独自のトレードオフのセットを選択し、ホイールを再発明しないようにするためのソリューション。

### コスモスハブとIBC

Cosmos SDKによって有名に実装されている[IBCプロトコル](https://ibcprotocol.org/documentation)も同様です。
ワームホールとしての問題空間-クロスチェーンメッセージパッシング。それはワームホールに直交し、より大きな
異なる形状の問題、異なる設計につながります。

IBCは、チャネル、ポート、確認応答、
順序付けとタイムアウト。これは、パケット/データグラムトランスポート上のストリーム抽象化であり、TCP/IPと漠然と似ています。
プロトコル。 IBCは、Cosmos Internet of Blockchainスケーラビリティビジョンの一部であり、数百または数千もの
ハブアンドスポークトポロジを使用してIBCを介して通信するソブリンIBC互換チェーン(「ゾーン」と呼ばれる)。データの可用性
許可のない中継者によって提供されます。

IBCでは、2つのチェーンが相互に直接通信するには、相互に状態を証明できる必要があります。
これは通常、他のチェーンにライトクライアントを実装することを意味します。ベースのような現代のpBFTチェーンでは
[Tendermint](https://v1.cosmos.network/resources/whitepaper)のコンセンサスで、軽いクライアントの証明を検証します
は[非常に安い](https://blog.cosmos.network/light-clients-in-tendermint-consensus-1237cfbda104)-必要なのは
完全なヘッダーチェーンではなく、バリデーターセットの変更を追跡します。ただし、チェーンが直接通信すると、
多くのチェーンで管理不能になります-そしてこれがコスモスハブのような中央ハブの出番です。すべての個人の代わりに
チェーンは、他のすべてのチェーンの証明を検出して検証します。代わりに、単一のチェーン(ハブ)を信頼することを選択できます。
次に、接続されているすべてのチェーンに対してライトクライアントを実行します。これには、ハブが非常に高度である必要があります
セキュリティ。これが、CosmosHubが独自のトークン($ ATOM)を持っている理由です。このトークンには、現在10億ドルの時価総額があります。

IBCは、IBCプロトコルを実装し、クライアントの証明が軽い最新のpBFTチェーンを接続する場合に最適に機能します。
検証するのが安い。

これは、イーサリアムやソラナのようなチェーンには当てはまりません。イーサリアムは多くの状態(完全なヘッダーチェーン)を必要とします
包含証明を確認します。これは、ハブや個々のCosmosチェーンで実行するにはコストがかかりすぎるため、プロキシチェーン(
「ペグゾーン」と呼ばれる)は、代わりにワームホールと同様に証明を検証します。ペグゾーンには独自のセキュリティがあり、
バリデーターは他のゾーンと同じように設定され、イーサリアム状態を保証します。

イーサリアムペグゾーンがどのように見えるかについては、[Gravity](https://github.com/cosmos/gravity-bridge)を参照してください。それは可能です
イーサリアムでコスモスライトクライアントの証明を検証しますが、その逆はありません-ペグゾーンバリデーターは次のように信頼されています
ワームホールノード、およびイーサリアムに送信されるメッセージにワームホールと同様のマルチシグメカニズムを使用します。

Solanaは現在、ライトクライアントの実装を提供していませんが、Ethereumと同様に、Solanaライトクライアントも提供します。
確認するには[大量の状態](https://docs.solana.com/proposals/simple-payment-and-state-verification)が必要です
ソラナコンセンサスの複雑さによる包含証明。

何百ものIBC互換チェーンを、ペグゾーンを持ついくつかの非IBC外れ値と接続する代わりに、ワームホールは設計されています
**少数の高価値DeFiチェーンを接続**します。これらのチェーンのほとんどはIBCをサポートしていないため、異なる結果になります。
設計。

ペグゾーンは、IBCモデルのワームホールに最も近いアナロジーですが、いくつかの重要な違いがあります。

-ワームホールはIBCよりも低レベルのビルディングブロックであり、接続やターゲットなどの高レベルのセマンティクスを指定していません
  チェーン、これを上位層プロトコルに任せます(「TCP/IP」ではなく「イーサネット」と考えてください)。これはより柔軟で少ない
  実装と監査が複雑であり、必要な場合にのみ複雑さを上位層とライブラリに移動します。

-独自のレイヤー1プルーフオブステークチェーンを運用する代わりに、接続されたチェーンのファイナリティに依存しています。ステーキング
  ワームホールガーディアンノードのメカニズムは、これらのチェーンの1つでスマートコントラクトによって管理され、
  セキュリティプロパティ。ノードは、それ自体でコンセンサスを開始することはできません。

-それぞれが強力なファイナリティ保証を備えたチェーンのファイナライズされた状態にのみ反応することにより、ワームホールプロトコルは
  複雑なコンセンサス、ファイナリティ、またはリーダー選出が必要です。これは、すべてのノードが行う最終状態の*観測*に署名します
  同期して、それらをピアツーピアネットワークにブロードキャストします。誤解や日食の可能性はありません
  不一致につながる攻撃。

-長距離攻撃やその他のPoS攻撃は、接続されたチェーンの保護者セット更新のファイナリティによって防止されます。後
  短い収束ウィンドウでは、古い保護者セットが無効になり、代替の履歴を構築できなくなります。

-包含証明に依存する代わりに、理解と監査がより簡単で安価なマルチシグスキームを使用します
  接続されているすべてのチェーンを確認します。ワームホールでは、包含証明によって提供される追加の保証は必要ありません。
  ネットワークは、チェーン間でデータをシャトルするだけなので、各チェーンには証明可能で不変の履歴があります。
