# ワームホールSDK

>注:これはプレアルファリリースであり、活発に開発されています。関数名とシグニチャは変更される可能性があります。

## ワームホールとは何ですか？

[ワームホール](https://wormholenetwork.com/)では、複数のブロックチェーン間で任意のデータを送信できます。ワームホールは現在、次のプラットフォームをサポートしています。

-ソラナ
-イーサリアム
-テラ
-Binanceスマートチェーン

ワームホールは、そのベースレイヤーでは、非常に単純なプロトコルです。ワームホールスマートコントラクトは、サポートされている各ブロックチェーンにデプロイされており、ユーザーは、スマートコントラクトにデータを送信することで、ワームホールネットワークでメッセージを送信できます。これらのメッセージは非常に単純で、次の6つのフィールドしかありません。

--_ emitterChain_-このメッセージの発信元のブロックチェーン。
--_ emitterAddress_-メッセージを送信したパブリックアドレス。
--_ consistencyLevel_-このメッセージが確認されたと見なされる前に通過する必要があるブロック/スロットの数。
--_ timestamp_-ワームホールネットワークがメッセージを確認したときのタイムスタンプ。
--_ sequence_-この_emitterAddress_が発行したメッセージの数を示す増分シーケンス。
--_ payload_-このメッセージの任意の内容。

ワームホール契約がこれらのメッセージの1つを処理するときはいつでも、ワームホールネットワークの参加者(個別に**ガーディアン**と呼ばれます)はトランザクションを監視し、トランザクションがエミッタチェーンで指定された確認時間。

SignedVAAは、基本的に、トランザクションがエミッタチェーンで終了し、他のチェーンに依存するアクションが進行する可能性があることをワームホールネットワークから確認したものです。

ワームホールプロトコルはシンプルですが、多くの「ブリッジ」アプリケーションを構築できる強力なベースレイヤーを提供します。ワームホールは任意のデータを検証できるため、ワームホールを利用するブリッジは、ネイティブ通貨、トークン、NFT、オラクルデータ、ガバナンス投票、およびその他のさまざまな形式の分散データを転送できます。

## コアワームホールブリッジのしくみ

コアワームホールブリッジは、_ソースチェーン_(データが現在存在する場所)と_ターゲットチェーン_(データが移動される場所)の両方でスマートコントラクトを実行することで動作し、通常は次のワークフローに従います。

    1)エンドユーザーまたは別のスマートコントラクトは、ソースチェーンのブリッジコントラクトを使用してメッセージを公開します。

    2)ワームホールネットワークはこのトランザクションを監視し、確認しきい値を超えるとSignedVAAを発行します。

    3)オフチェーンプロセスは、SignedVAAを収集し、トランザクションでターゲットチェーンのブリッジコントラクトに送信します。これにより、メッセージを解析および検証できます。

## ワームホールトークンブリッジのしくみ

ワームホールトークンブリッジは、厳密に言えば、ワームホールプロトコルの一部ではなく、その上のブリッジであることに注意することが重要です。ただし、トークン転送はブリッジの非常に重要なユースケースであるため、WormholeSDKの一部として構築およびパッケージ化されています。

Token Bridgeは上記と同じように機能し、CoreBridgeを利用してメッセージを公開します。ただし、トークンブリッジには、実際にはAttestとTransferの2つの異なる機能があります。

### 証明

アテステーションは、トークンがトークンブリッジに「登録」されるプロセスです。転送される前に、トークンは最初に**オリジンチェーン**で証明され、転送先の**外部チェーン**で作成された対応するラップされたトークンを持っている必要があります。オリジンチェーンで認証すると、ラップされたアセットがフォーリンチェーンに存在できるようにするために必要なアドレスとメタデータが作成されます。

### 移行

証明されると、トークンはネイティブチェーンから外部チェーンの「ラップされた」アセットにマップされます。イーサリアムネイティブトークンをソラナに転送すると、ソラナで「ラップされたアセット」が生成され、同じアセットをイーサリアムに転送すると、ネイティブトークンが復元されます。

ワームホールでラップされたトークンは、他のブリッジでラップされたトークンとは異なり、互換性がないことに注意することが重要です。別のブリッジによってラップされたトークンを転送しても、ネイティブトークンは引き換えられませんが、「二重ラップ」トークンになります。

## 例

### 証明

#### ソラナからイーサリアムへ

```js
// Submit transaction - results in a Wormhole message being published
const transaction = await attestFromSolana(
  connection,
  SOL_BRIDGE_ADDRESS,
  SOL_TOKEN_BRIDGE_ADDRESS,
  payerAddress,
  mintAddress
);
const signed = await wallet.signTransaction(transaction);
const txid = await connection.sendRawTransaction(signed.serialize());
await connection.confirmTransaction(txid);
// Get the sequence number and emitter address required to fetch the signedVAA of our message
const info = await connection.getTransaction(txid);
const sequence = parseSequenceFromLogSolana(info);
const emitterAddress = await getEmitterAddressSolana(SOL_TOKEN_BRIDGE_ADDRESS);
// Fetch the signedVAA from the Wormhole Network (this may require retries while you wait for confirmation)
const { signedVAA } = await getSignedVAA(
  WORMHOLE_RPC_HOST,
  CHAIN_ID_SOLANA,
  emitterAddress,
  sequence
);
// Create the wrapped token on Ethereum
await createWrappedOnEth(ETH_TOKEN_BRIDGE_ADDRESS, signer, signedVAA);
```

#### Ethereum to Solana

```js
// Submit transaction - results in a Wormhole message being published
const receipt = await attestFromEth(
  ETH_TOKEN_BRIDGE_ADDRESS,
  signer,
  tokenAddress
);
// Get the sequence number and emitter address required to fetch the signedVAA of our message
const sequence = parseSequenceFromLogEth(receipt, ETH_BRIDGE_ADDRESS);
const emitterAddress = getEmitterAddressEth(ETH_TOKEN_BRIDGE_ADDRESS);
// Fetch the signedVAA from the Wormhole Network (this may require retries while you wait for confirmation)
const { signedVAA } = await getSignedVAA(
  WORMHOLE_RPC_HOST,
  CHAIN_ID_ETH,
  emitterAddress,
  sequence
);
// On Solana, we have to post the signedVAA ourselves
await postVaaSolana(
  connection,
  wallet,
  SOL_BRIDGE_ADDRESS,
  payerAddress,
  signedVAA
);
// Finally, create the wrapped token
const transaction = await createWrappedOnSolana(
  connection,
  SOL_BRIDGE_ADDRESS,
  SOL_TOKEN_BRIDGE_ADDRESS,
  payerAddress,
  signedVAA
);
const signed = await wallet.signTransaction(transaction);
const txid = await connection.sendRawTransaction(signed.serialize());
await connection.confirmTransaction(txid);
```

### 移行

#### ソラナからイーサリアムへ

```js
// Submit transaction - results in a Wormhole message being published
const transaction = await transferFromSolana(
  connection,
  SOL_BRIDGE_ADDRESS,
  SOL_TOKEN_BRIDGE_ADDRESS,
  payerAddress,
  fromAddress,
  mintAddress,
  amount,
  targetAddress,
  CHAIN_ID_ETH,
  originAddress,
  originChain
);
const signed = await wallet.signTransaction(transaction);
const txid = await connection.sendRawTransaction(signed.serialize());
await connection.confirmTransaction(txid);
// Get the sequence number and emitter address required to fetch the signedVAA of our message
const info = await connection.getTransaction(txid);
const sequence = parseSequenceFromLogSolana(info);
const emitterAddress = await getEmitterAddressSolana(SOL_TOKEN_BRIDGE_ADDRESS);
// Fetch the signedVAA from the Wormhole Network (this may require retries while you wait for confirmation)
const { signedVAA } = await getSignedVAA(
  WORMHOLE_RPC_HOST,
  CHAIN_ID_SOLANA,
  emitterAddress,
  sequence
);
// Redeem on Ethereum
await redeemOnEth(ETH_TOKEN_BRIDGE_ADDRESS, signer, signedVAA);
```

#### Ethereum to Solana

```js
// Submit transaction - results in a Wormhole message being published
const receipt = await transferFromEth(
  ETH_TOKEN_BRIDGE_ADDRESS,
  signer,
  tokenAddress,
  amount,
  CHAIN_ID_SOLANA,
  recipientAddress
);
// Get the sequence number and emitter address required to fetch the signedVAA of our message
const sequence = parseSequenceFromLogEth(receipt, ETH_BRIDGE_ADDRESS);
const emitterAddress = getEmitterAddressEth(ETH_TOKEN_BRIDGE_ADDRESS);
// Fetch the signedVAA from the Wormhole Network (this may require retries while you wait for confirmation)
const { signedVAA } = await getSignedVAA(
  WORMHOLE_RPC_HOST,
  CHAIN_ID_ETH,
  emitterAddress,
  sequence
);
// On Solana, we have to post the signedVAA ourselves
await postVaaSolana(
  connection,
  wallet,
  SOL_BRIDGE_ADDRESS,
  payerAddress,
  signedVAA
);
// Finally, redeem on Solana
const transaction = await redeemOnSolana(
  connection,
  SOL_BRIDGE_ADDRESS,
  SOL_TOKEN_BRIDGE_ADDRESS,
  payerAddress,
  signedVAA,
  isSolanaNative,
  mintAddress
);
const signed = await wallet.signTransaction(transaction);
const txid = await connection.sendRawTransaction(signed.serialize());
await connection.confirmTransaction(txid);
```
