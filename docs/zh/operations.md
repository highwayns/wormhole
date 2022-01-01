# 运行一个虫洞节点

![](../images/nodearchitecture.svg)

## 连接链

除了 Wormhole 本身，您还需要为 Wormhole 连接的每条链运行自己的验证节点:

- **索拉娜**。 Solana 还没有轻客户端，因此您必须运行完整的 solana-validator 节点。它不是
  实际上必须是验证器 - 如果您不是验证器，则可以在非验证模式下运行 solana-validator。

  有关如何运行验证器，请参阅 [Solana 文档](https://docs.solana.com/running-validator)。验证器
  他们的文档中所述的要求过多 - 对于 mainnet-beta 的当前迭代，“低端”配置
  没有 GPU 是完全足够的，并且会有足够的备用容量。
  [Solana 的 Discord 服务器](https://solana.com/community) 是有关验证器操作问题的绝佳资源。

- **以太坊**。见下文 - 您至少需要一个轻客户端。出于稳定性原因，建议使用完整节点。

- **Terra** 需要一个完整的节点和一个 [LCD 服务器](https://docs.terra.money/terracli/lcd.html#light-client-daemon)
  指向您的完整节点。参考【Terra 文档】(https://docs.terra.money/node/join-network.html)
  关于如何运行完整节点。从安全的角度来看，只运行一个带有`--trust-node=false`指向的LCD服务器
  到其他人的完整节点就足够了，但是您将依赖于该单个节点的可用性，除非
  您设置了一个指向一组节点的负载均衡器。

- **币安智能链**:要求与以太坊相同。请注意，BSC 的吞吐量高于以太坊，并且
  大约需要两倍的计算资源。

**不要为任何链使用第三方 RPC 服务提供商**！你会完全信任他们，他们可以撒谎
你是否真的观察到了一个事件。虫洞的全部意义在于不依赖中心化节点！

我们强烈建议为测试网和主网运行您自己的完整节点(如果适用)
因此您可以测试主网全节点的更改并获得操作经验。

### Solana 节点要求

您的 Solana RPC 节点需要启用以下参数: 

```
--enable-rpc-transaction-history
--enable-cpi-and-log-storage
```

`--enable-rpc-transaction-history` 允许通过 *getConfirmedBlock* API 检索历史交易，
这是虫洞寻找交易所必需的。

`--enable-cpi-and-log-storage` 存储有关 CPI 调用的元数据。

请注意，这些需要额外的磁盘空间！

#### 账户索引

如果Wormhole v1使用同一个RPC节点，还需要以下附加参数来加速
`getProgramAccount` 查询: 

```
[... see above for other required parameters ...]

--account-index program-id
--account-index-include-key WormT3McKhFJ2RkiGpdw9GKvNCrB2aB54gb2uV9MfQC   # for mainnet
--account-index-include-key 5gQf5AUhAgWYgUCt9ouShm9H7dzzXUsLdssYwe5krKhg  # for testnet
```

或者，如果您想运行带有所有程序索引的通用 RPC 节点，而不仅仅是 Wormhole，
省略过滤: 

```
--account-index program-id
```

在主网上，我们强烈建议将 KIN 和令牌程序列入黑名单以加速追赶: 

```
--account-index-exclude-key kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6  # Mainnet only
--account-index-exclude-key TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA  # Mainnet only
```

请注意，这些索引需要额外的磁盘空间并且可能会减慢追赶速度。之后的第一次启动
添加这些参数会很慢，因为 Solana 需要重新创建所有索引。

### 以太坊节点要求

为了观察以太坊链上的事件，您需要访问以太坊 RPC 端点。最普遍的
选择是 geth，但为了多样性，您可能想要运行不是 geth 的东西。

通过 Alchemy、Infura 等 RPC 提供商，您信任这些运营商为您提供未经篡改的链数据和
无法验证正确性。因此，Wormhole 需要以太坊全节点或轻客户端。这
节点可以在完全、快速或轻量模式下运行，而不会影响网桥软件的安全性或性能。
只要节点支持以太坊 JSON RPC API，它将与网桥兼容，因此所有主要
实现将正常工作。

一般来说，全节点会比容易受到 DoS 攻击的轻客户端工作得更好，更可靠
因为只有很少的节点支持轻客户端协议。

运行一个完整的节点通常需要约 500G 的 SSD 存储、8G 的 RAM 和 4-8 个 CPU 线程(取决于时钟
频率)。轻客户端的硬件要求要低得多。

## 建筑监护

出于安全原因，我们不提供预构建的二进制文件。您需要查看 repo 并构建
来自源头的受保护的二进制文件。 Git 存储库比发布二进制文件更难篡改。

要构建虫洞节点，您需要 [Go](https://golang.org/dl/) >= 1.17.0。

首先，检查您要部署的 Wormhole 存储库的版本: 

```bash
git clone https://github.com/certusone/wormhole && cd wormhole
git checkout v2.0.x
```

然后，以非特权构建用户身份编译发布二进制文件: 

```bash
make node
```
    
你最终会在 `build/` 中得到一个 `guardiand` 二进制文件。

考虑这些建议，而不是盲目遵循的教程。你会想把它与你的
现有的构建管道。如果您需要 Dockerfile 示例，可以查看我们的 devnet 部署。

如果要本地编译部署，可以运行`sudo make install`将二进制文件安装到/usr/local/bin。

如果您使用自定义管道进行部署，则需要在二进制文件上设置“CAP_IPC_LOCK”功能(例如，执行
等效于`sudo setcap cap_ipc_lock=+ep`) 以允许它锁定其内存页面以防止它们被调出。
请参阅下文了解原因 - 这是一种通用的纵深防御缓解措施，可确保永远不会换出进程内存
到磁盘。如果此额外功能代表操作或合规性问题，请创建 GitHub 问题。

## 密钥生成

要生成监护人密钥，请先安装监护人。如果您在单独的机器上生成密钥，您可能需要
仅编译 Guardiand 而不安装它: 

    make node
    sudo setcap cap_ipc_lock=+ep ./build/bin/guardiand

否则，请使用您使用上述常规指令编译的同一个受保护的二进制文件。

使用 `keygen` 子命令生成新密钥: 

    guardiand keygen --desc "Testnet key foo"/path/to/your.key

密钥文件包括一个人类可读的部分，其中包括公钥哈希和描述。

## 部署

我们强烈建议为虫洞服务使用单独的用户和系统服务。

有关示例，请参阅单独的 [wormhole-networks](https://github.com/certusone/wormhole-networks) 存储库
关于如何为特定网络设置监护单元。

您需要在防火墙中为 P2P 网络打开端口 8999/udp。没有其他东西必须暴露在外部。

journalctl 可以使用二进制输出的 `-a` 标志显示 Guardiand 的彩色输出，即:`journalctl -a -f -u Guardiand`。

### Kubernetes

完全支持 Kubernetes 部署。

参考 [devnet/](../devnet) 例如 k8s 部署，作为您自己的生产部署的起点。你会
必须构建自己的容器。除非您已经在生产中运行 Kubernetes，否则我们强烈建议您使用传统的
在专用实例上部署 - 更容易理解和排除故障。

### 监控

虫洞公开了一个状态服务器，用于准备就绪和指标。默认情况下，它侦听本地主机上的端口 6060。
您可以使用命令行参数公开它:`--statusAddr=[::]:6060`。

#### `/readyz`

一旦 Wormhole 节点准备好为请求提供服务，此端点将返回 200 OK 状态代码。一个节点是
一旦它成功连接到所有链并开始处理请求，就认为它准备好了。

这**仅用于启动信号** - 它不会告诉它是否*停止*
稍后处理请求。一旦是真的，它就一直是真的！使用指标来解决这个问题。

#### `/metrics`

此端点为 [Prometheus 指标](https://prometheus.io/docs/concepts/data_model/) 提供警报和
内省。我们建议使用 Prometheus 和 Alertmanager，但任何可以使用
标准化的 Prometheus 展示格式将起作用。

一旦我们获得了更多关于虫洞的操作经验，就可以根据症状提供适当的具体建议
警报将在此处记录。

有关 Grafana 仪表板示例，请参阅 [Wormhole.json](../dashboards/Wormhole.json)。

**注意:** 不建议解析日志输出以进行监控。日志输出是供人类消费的，并且是
不被视为稳定的 API。日志消息可能会被添加、修改或删除，恕不另行通知。使用指标:-)

## 运行公共 API 端点

Wormhole v2 不再使用 Solana 作为数据可用性层(参见 [设计文档](../design/0005_data_availability.md))。
相反，它依赖于 Guardian 节点公开一个 API，网络钱包和其他客户端可以使用该 API 来检索已签名的 VAA
给定交易的消息。

**强烈鼓励**监护人节点公开公共 API 端点以提高协议的稳健性。

Guardiand 带有一个内置的 REST 和 grpc-web 服务器，可以使用 `--publicWeb` 标志启用: 

```
--publicWeb=[::]:443
```

与网络钱包一起使用时，需要支持 TLS。 Guardiand 内置了 Let's Encrypt 支持: 

```
--tlsHostname=wormhole-v2-mainnet-api.example.com
--tlsProdEnv=true
```

或者，您可以使用像 CloudFlare 这样的托管反向代理来终止 TLS。

在签名节点上公开 publicWeb 端口是安全的。 为了更好地抵御拒绝服务攻击，
未来的监护人版本将包括只听模式，以便多个监护人实例没有监护人密钥
可以在负载均衡器后面操作。

### systemd 套接字激活

Guardiand 可选择支持 systemd 套接字激活，用于非特权绑定到端口 443 并重新启动
停机时间最短。

它可以通过在你的 `--publicWeb` 端点前面加上 `sd:` 来启用。 Guardiand 然后将使用指定的
systemd 提供的套接字(例如`--publicWeb=sd:[::]:443`)。

你需要第二个 systemd 单元绑定到你的主要 `guardiand.service`: 

```
#/etc/systemd/system/guardiand-web.socket

[Socket]
ListenStream=443
Service=guardiand.service

[Install]
WantedBy=sockets.target
```

...并启用它:`systemctl enable --now Guardiand-web.socket`。 您还需要重新启动`guardiand.service`。

### 绑定到特权端口

如果你想将 `--publicWeb` 绑定到端口 <1024 **而不使用 ** 如上所述使用套接字激活，你需要分配
CAP_NET_BIND_SERVICE 功能。 这可以通过向二进制文件添加功能来实现
(如在非系统环境中): 

     sudo setcap cap_net_bind_service=+ep guardiand

...或者通过扩展`guardiand.service`中设置的功能: 

    AmbientCapabilities=CAP_IPC_LOCK CAP_NET_BIND_SERVICE
    CapabilityBoundingSet=CAP_IPC_LOCK CAP_NET_BIND_SERVICE

## 密钥管理

您必须管理以下密钥:

 - **监护人密钥**，即网桥共识密钥。此密钥非常关键 - 您的节点使用它来认证
   VAA 消息。公钥的哈希值存储在所有连接链上的监护人集中。它不会累积奖励。
   这是保护虫洞网络的多重签名机制的一部分。守护者套装可更换
   如果大多数监护人同意签署并发布新的监护人集。
  
 - **节点密钥**，用于在八卦网络上对其进行标识，类似于 Solana 的节点身份或 Tendermint
   节点键。它被对等网络用于路由和传输层加密。
   攻击者可能会使用它来审查您在网络上的消息。除此之外，它不是很
   关键，可以轮换。如果节点不存在，该节点将在您指定的路径上自动创建一个节点键。
 
对于生产，我们强烈建议加密您的磁盘，和/或注意不要让密钥接触磁盘。
实现的一种方法是将密钥存储在无法换出的内存 ramfs 上，并从冷态恢复
每当节点重新启动时，存储或 HSM/保险库。您可能希望完全禁用交换。这都不是
特定于虫洞 - 这适用于任何热键。

我们的节点软件特别注意使用 mlock(2) 锁定内存，以防止密钥被换出到磁盘，这
这就是为什么它需要额外的功能。是的，其他连锁店可能也想这样做:-)

将密钥存储在 HSM 上或使用远程签名者只能部分降低服务器受损的风险 - 这意味着密钥
不会被盗，但攻击者仍可能导致 HSM 对恶意负载进行签名。虫洞的未来迭代
可能包括对使用 [SignOS](https://certus.one/sign-os/) 等签名者的远程签名的支持。 