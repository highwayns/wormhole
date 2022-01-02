## クラウドBigTableインスタンスの初期化

BigTableインスタンスとサービスアカウントキーを作成すると、これらのGoスクリプトでテーブルと列のファミリーを作成してイベントデータを保存できます。

BigTableの接続情報をargs経由で渡します。
-GoogleCloudプロジェクトID
-BigTableインスタンス名
-適切な権限を持つGCPサービスアカウントへのパス

DB構成オプションと `-setupDB`を使用してスクリプトを呼び出し、テーブルと列のファミリーがまだ存在しない場合はそれらを作成します。 スクリプトの実行時にそれらがすでに存在する場合、スクリプトは何もしません。

```bash
go run . \
  -project your-GCP-projectID \
  -instance your-BigTable-instance-name \
  -keyFilePath ./service-account-key.json \
  -setupDB
```

## Querying cloud BigTable

Lookup a row by the `EmitterChain:TxID`:

```bash
go run . \
  -project wormhole-315720 \
  -instance wormhole \
  -keyFilePath ./bigtable-admin.json \
  -queryRowKey 2:000000000000000000000000e982e462b094850f12af94d21d470e21be9d0e9:6
```

Lookup all rows with a timestamp >= `queryPreviousMinutes` ago:

```bash
go run . \
  -project wormhole-315720 \
  -instance wormhole \
  -keyFilePath ./bigtable-admin.json \
  -queryPreviousMinutes 120
```
