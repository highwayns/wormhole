## 初始化一个云端 BigTable 实例

创建 BigTable 实例和服务帐户键后，这些 Go 脚本可以创建表和列族以保存事件数据。

通过 args 传递您的 BigTable 连接信息:
- 谷歌云项目ID
- BigTable 实例名称
- 具有适当权限的 GCP 服务帐户的路径

使用 DB 配置选项和 `-setupDB` 调用脚本以创建表和列族(如果它们尚不存在)。 如果它们在脚本运行时已经存在，则不会执行任何操作。

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
