# 开发桥梁

## 本地开发网

本地开发需要以下依赖:

- [Go](https://golang.org/dl/) >= 1.17.0
- [倾斜](http://tilt.dev/) >= 0.20.8
- Tilt 支持的任何本地 Kubernetes 集群。
   我们强烈推荐 [minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/) >=
   v1.21.0 带有 kvm2 驱动程序。
   - Tilt 将使用 Minikube 的嵌入式 Docker 服务器。 如果不使用 Minikube，则本地实例
     [Docker](https://docs.docker.com/engine/install/)/moby-engine >= 19.03 是必需的。

请参阅 [Tilt docs](https://docs.tilt.dev/install.html) 文档，了解如何设置本地集群 -
设置不会超过几分钟！ 示例 minikube 调用，根据需要调整限制:

    minikube start --cpus=8 --memory=8G --disk-size=50G --driver=kvm2

npm 想要在 web 容器中设置疯狂数量的 inotify 监视，这可能会超出内核限制。
minikube 默认太低了，这样调整:

    minikube ssh 'echo fs.inotify.max_user_watches=524288 | sudo tee -a/etc/sysctl.conf && sudo sysctl -p'

这应该适用于 Linux、MacOS 和 Windows。

默认情况下，devnet 部署到 `wormhole` 命名空间而不是 `default`。 这样可以很容易地清理
通过简单地删除命名空间来完成整个部署，这在 `default` 中是不可能的。 更改默认命名空间
避免必须为所有命令指定`-n wormhole`:

    kubectl config set-context --current --namespace=wormhole

安装所有依赖项后，只需运行`tilt up`。
每当您修改文件时，都会自动重建 devnet 并完成滚动更新。

启动 devnet，同时指定要运行的 Guardians 节点的数量(默认为 5):

    tilt up -- --num=1

如果您想处理代码的非共识部分，那么与单个监护人一起运行是最简单的，因为
您不必等待 k8s 重新启动所有 pod。

## 用法

观察集群中的 pod 状态:

    kubectl get pod -A -w

获取单个守护节点的日志:

    kubectl logs guardian-0

重启一个特定的 pod:

    kubectl delete pod guardian-0

调整正在运行的集群中的节点数:(这仅在您想测试节点数
的节点与监护人集不同 - 否则，`向下倾斜 --delete-namespaces` 并重新启动集群)

    tilt args -- --num=2

拆除集群:

    tilt down --delete-namespaces

完成后，按 Ctrl-C。 运行 `tilt down` 来拆除 devnet。


### 发布消息

索拉纳:

    kubectl exec solana-devnet-0 -c setup -- client post-message Bridge1p5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o 1 confirmed ffff

将 Solana 作为 CPI 指令:

    kubectl exec solana-devnet-0 -c setup -- client post-message --proxy CP1co2QMMoDPbsmV7PGcUTLFwyhgCgTXt25gLQ5LewE1 Bridge1p5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o 1 confirmed ffff


## IntelliJ Protobuf 自动完成

设置包含路径:

![](https://i.imgur.com/bDij6Cu.png)


## BigTable 事件持久化

通过将 GCP 项目和服务帐户密钥传递给 Tilt，可以将 Guardian 事件持久化到云端 BigTable 实例。
使用提供数据库信息的标志启动 devnet，以将事件转发到您的云 BigTable，而不是本地 devnet BigTable 模拟器:

    tilt up -- --num=1  --gcpProject=your-project-id --bigTableKeyPath=./your-service-account-key.json
