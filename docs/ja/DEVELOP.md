# ブリッジの開発

## ローカルDevnet

ローカル開発には、次の依存関係が必要です。

-[Go](https://golang.org/dl/)> = 1.17.0
-[傾き](http://tilt.dev/)> = 0.20.8
-TiltでサポートされているローカルKubernetesクラスターのいずれか。
   [minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/)を強くお勧めします> =
   kvm2ドライバーを使用したv1.21.0。
   --TiltはMinikubeの組み込みDockerサーバーを使用します。 Minikubeを使用しない場合、のローカルインスタンス
     [Docker](https://docs.docker.com/engine/install/)/moby-engine> = 19.03が必要です。

ローカルクラスタの設定方法については、[Tilt docs](https://docs.tilt.dev/install.html)ドキュメントを参照してください-
セットアップには数分もかかりません！ minikubeの呼び出しの例、必要に応じて制限を調整します。

    minikube start --cpus=8 --memory=8G --disk-size=50G --driver=kvm2

npmは、カーネルの制限を超える可能性のある非常識な数のinotifyウォッチをWebコンテナに設定したいと考えています。
minikubeのデフォルトが低すぎるため、次のように調整します。

    minikube ssh 'echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p'

これは、Linux、MacOS、およびWindowsで機能するはずです。

デフォルトでは、devnetは `default`ではなく` wormhole`名前空間にデプロイされます。 これにより、クリーンアップが簡単になります。
名前空間を削除するだけで展開全体が可能になります。これは `default`では不可能です。 デフォルトの名前空間を変更する
すべてのコマンドに `-nwormhole`を指定する必要をなくすには:

    kubectl config set-context --current --namespace=wormhole

すべての依存関係をインストールした後、 `tiltup`を実行するだけです。
ファイルを変更するたびに、devnetが自動的に再構築され、ローリング更新が実行されます。

実行するガーディアンノードの数を指定しながらdevnetを起動します(デフォルトは5)。

    tilt up -- --num=1

コードのコンセンサスのない部分で作業する場合は、1人の保護者で実行するのが最も簡単です。
k8sがすべてのポッドを再起動するのを待つ必要はありません。

## 使用法

クラスタ内のポッドステータスを監視します。

    kubectl get pod -A -w

単一の保護者ノードのログを取得します。

    kubectl logs guardian-0

特定のポッドを再起動します。

    kubectl delete pod guardian-0

実行中のクラスター内のノードの数を調整します:(これは、その数が
ノードの数がガーディアンセットから分岐します-それ以外の場合は、 `tilt down --delete-namespaces`してクラスターを再起動します)

    tilt args -- --num=2

クラスターを分解します。

    tilt down --delete-namespaces

完了したら、Ctrl-Cを押します。 `tilt down`を実行して、devnetを破棄します。


### メッセージを投稿する

ソラナへ:

    kubectl exec solana-devnet-0 -c setup -- client post-message Bridge1p5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o 1 confirmed ffff

CPI命令としてソラナに:

    kubectl exec solana-devnet-0 -c setup -- client post-message --proxy CP1co2QMMoDPbsmV7PGcUTLFwyhgCgTXt25gLQ5LewE1 Bridge1p5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o 1 confirmed ffff


## IntelliJProtobufオートコンプリート

インクルードパスを設定します。

！[](https://i.imgur.com/bDij6Cu.png)


## BigTableイベントの永続性

GCPプロジェクトとサービスアカウントキーをTiltに渡すことで、GuardianイベントをクラウドBigTableインスタンスに永続化できます。
ローカルのdevnetBigTableエミュレーターではなく、イベントをクラウドBigTableに転送するためのデータベース情報を提供するフラグを使用してdevnetを起動します。

    tilt up -- --num=1  --gcpProject=your-project-id --bigTableKeyPath=./your-service-account-key.json
