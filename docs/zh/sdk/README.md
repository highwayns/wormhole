# 虫洞SDK

> 注意:这是一个 pre-alpha 版本并且正在积极开发中。函数名称和签名可能会发生变化。

## 什么是虫洞？

[虫洞](https://wormholenetwork.com/) 允许跨多个区块链传输任意数据。虫洞目前支持以下平台:

- 索拉纳
- 以太坊
- 地球
- 币安智能链

虫洞在其基础层是一个非常简单的协议。每个支持的区块链上都部署了一个虫洞智能合约，用户可以通过向智能合约提交数据来在虫洞网络中发出消息。这些消息非常简单，只有以下六个字段。

- _emitterChain_ - 此消息源自的区块链。
- _emitterAddress_ - 提交消息的公共地址。
- _consistencyLevel_ - 在该消息被确认之前应该通过的块/槽的数量。
- _timestamp_ - 虫洞网络确认消息的时间戳。
- _sequence_ - 一个递增的序列，表示这个 _emitterAddress_ 已经发出了多少消息。
- _payload_ - 此消息的任意内容。

每当虫洞合约处理这些消息之一时，虫洞网络的参与者(个人称为 **Guardians** )将观察交易并在交易达到在发射器链上指定确认时间。

SignedVAA 本质上是来自虫洞网络的确认，即交易已在发射器链上完成，并且其他链上的任何相关操作都可以继续进行。

虽然简单，但虫洞协议提供了一个强大的基础层，可以在其上构建许多“桥梁”应用程序。由于虫洞能够验证任意数据，利用它的桥梁能够传输本地货币、代币、NFT、oracle 数据、治理投票和大量其他形式的去中心化数据。

## 核心虫洞桥是如何工作的

核心 Wormhole 桥通过在 _Source Chain_(数据当前所在的位置)和 _Target Chain_(数据将被移动的位置)上运行智能合约来运行，并且通常遵循以下工作流程:

    1) 最终用户或其他智能合约使用源链上的桥接合约发布消息。

    2) 虫洞网络观察此交易，并在超过其确认阈值时发出 SignedVAA。

    3)链下进程收集SignedVAA并在交易中将其提交给目标链上的桥接合约，桥接合约可以解析和验证消息。

## 虫洞令牌桥的工作原理

需要注意的是，严格来说，Wormhole Token Bridge 并不是 Wormhole 协议的一部分，而是它之上的一座桥。但是，由于令牌传输是桥的一个重要用例，因此它是作为 Wormhole SDK 的一部分构建和打包的。

令牌桥以与上述相同的方式工作，利用核心桥来发布消息。但是，令牌桥实际上有两个不同的功能:Attest 和 Transfer。

### 证明

证明是将令牌“注册”到令牌桥的过程。在转移之前，代币必须首先在其**源链**上进行证明，并在将转移到的**外链**上创建相应的包装代币。在原始链上进行证明将创建必要的地址和元数据，这将允许打包的资产存在于外部链上。

### 转移

一旦得到证明，代币就会从它们的原生链映射到外部链上的“包装”资产。将以太坊原生代币转移到 Solana 将导致 Solana 上的“包装资产”，而将相同资产转移回以太坊将恢复原生代币。

需要注意的是，Wormhole 包裹的令牌与其他网桥包裹的令牌不同且不兼容。传输由不同网桥包装的令牌不会赎回本机令牌，而是会导致“双重包装”令牌。

## 例子

### 证明

#### Solana 到以太坊

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

### 转移

#### Solana 到以太坊

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
