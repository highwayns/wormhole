# 虫洞桥-ETH

这些智能合约允许在虫洞协议中使用以太坊作为外链。

“虫洞”合约是桥梁合约，允许将代币从 ETH 和 VAA 中转出以提交
转移令牌或更改配置设置。

“WrappedAsset”是一个 ERC-20 代币合约，其中包含有关 ETH 上虫洞资产的元数据。虫洞资产全是
包装当前持有 ETH 的非 ETH 资产。

### 部署

要在以太坊上部署网桥，您首先需要编译所有智能合约:
`npx truffle compile`

要部署，您可以使用 `build/contracts` 文件夹中的字节码或 oz cli `oz deploy <Contract>`
([文档](https://docs.openzeppelin.com/learn/deploying-and-interacting))。

您首先需要部署一个“Wrapped Asset”并使用虚拟数据对其进行初始化。

然后使用初始守护者密钥(`key_x,y_parity,0`)和之前部署的地址部署`Wormhole`
`WrappedAsset`。包装好的资产合约将作为代理库用于所有廉价代理包装的创建
资产。

### 测试

对于每次测试运行:

运行 `npx ganache-cli --deterministic --time "1970-01-01T00:00:00+00:00"` 来启动一个链。

使用 `npm run test` 运行测试

### 用户方法

`submitVAA(bytes vaa)` 可用于执行 VAA。

可以使用`lockAssets(address asset, uint256 amount, bytes32 receiver, uint8 target_chain)`
将任何符合 ERC20 的资产从 ETH 转移到连接到虫洞的另一条链上的任何接收者
协议。 `asset` 是要转让的资产，`amount` 是要转让的金额(这必须 <=
如果令牌不是虫洞令牌，则您之前已将其提供给桥接智能合约)，`recipient` 是外来的
接收者的链地址，`target_chain` 是要转移到的链的 id。

`lockETH(bytes32 receiver, uint8 target_chain)` 是一个方便的函数，用于包装随函数调用发送的 Ether
并按照“lockAssets”中的描述转移它。