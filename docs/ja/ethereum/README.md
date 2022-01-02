# ワームホールブリッジ-ETH

これらのスマートコントラクトにより、Ethereumをワームホールプロトコルの外部チェーンとして使用できます。

「ワームホール」契約はブリッジ契約であり、トークンをETHから転送し、VAAを送信できるようにします
トークンを転送したり、構成設定を変更したりします。

`WrappedAsset`は、ETH上のワームホールアセットに関するメタデータを保持するERC-20トークンコントラクトです。ワームホールの資産はすべて
現在ETHに保持されているラップされた非ETHアセット。

### デプロイ

イーサリアムにブリッジをデプロイするには、最初にすべてのスマートコントラクトをコンパイルする必要があります。
`npx truffle compile`

デプロイするには、 `build / contracts`フォルダーのバイトコードまたはozcli` oz deploy <Contract>`のいずれかを使用できます。
([ドキュメント](https://docs.openzeppelin.com/learn/deploying-and-interacting))。

まず、1つの「ラップされたアセット」をデプロイし、ダミーデータを使用して初期化する必要があります。

次に、最初の保護者キー( `key_x、y_parity、0`)と以前にデプロイされたアドレスを使用して` Wormhole`をデプロイします
`WrappedAsset`。ラップされたアセット契約は、安価なプロキシラップされたすべての作成のプロキシライブラリとして使用されます
資産。

### テスト

テスト実行ごとに:

`npx ganache-cli --deterministic --time" 1970-01-01T00:00:00 + 00:00 "`を実行して、チェーンを開始します。

`npm runtest`を使用してテストを実行します

### ユーザーメソッド

`submitVAA(bytes vaa)`を使用してVAAを実行できます。

`lockAssets(アドレスアセット、uint256金額、bytes32受信者、uint8 target_chain)`を使用できます
ETHからERC20準拠のアセットを、ワームホールに接続されている別のチェーン上の受信者に転送する
プロトコル。 `asset`は譲渡される資産であり、` amount`は譲渡される金額です(これは<=
トークンがワームホールトークンでない場合、以前にブリッジスマートコントラクトに与えたもの)、 `recipient`は外国人です
受信者のチェーンアドレス。`target_chain`は転送先のチェーンのIDです。

`lockETH(bytes32 receive、uint8 target_chain)`は、関数呼び出しで送信されたEtherをラップするための便利な関数です。
`lockAssets`の説明に従って転送します。