# ワームホールエクスプローラー

以下で構築されたWebアプリ:
-[GatsbyJS](https://www.gatsbyjs.com/)
-[gatsby-plugin-intl](https://www.gatsbyjs.com/plugins/gatsby-plugin-intl/)
-[Typescript](https://www.typescriptlang.org/)
-[Ant Design](https://ant.design/)


## 注目すべきファイル

-サポートされている言語-ここでサポートされている言語を追加/削除します[./src/utils/i18n/supportedLanguages.js](../src/utils/i18n/supportedLanguages.js)
-多言語コピー[./src/locales](./src/locales)
-トップレベルのページとクライアント側のルート。ここにファイルを追加すると、@ reach-routerルートが作成されます[./src/pages](./src/pages)
-SEO構成、すべてのページに継承[./src/components/SEO/SEO.tsx](./src/components/SEO/SEO.tsx)
-メインレイアウトHOC、トップメニューナビゲーションとフッターが含まれています[./src/components/Layout/DefaultLayout.tsx](./ src / components / Layout / DefaultLayout.tsx)
-Gatsbyプラグイン[./gatsby-config.js](./gatsby-config.js)
-Ant Designテーマ変数、Antdのデフォルトをオーバーライド[./src/AntdTheme.js](./ src / AntdTheme.js)


## リポジトリの設定

npmを使用した依存関係のインストール:

    npm install

`.env.sample`から、開発環境用の` .env`ファイルを作成します。

    cp .env.sample .env.development

## 開発中

npmスクリプトを使用して開発サーバーを起動します。

    npm run dev

次に、ブラウザで[http:// localhost:8000](http:// localhost:8000)のWebアプリを開きます。

## デバッグ
### VSCodeを使用したNodeJのデバッグ

Gatsby開発サーバーをデバッグするか、VSCodeのdebbugerを使用してプロセスをビルドできます。 [.vscode / launch.json](./。vscode / launch.json)をチェックアウトして、NodeJSのデバッグオプションを確認します。

これらのデバッガー構成を使用すると、Gatsbyノードプログラム([./gatsby-config.js](./gatsby-config.js)、[./gatsby-node.js](./gatsby-node.js)にブレークポイントを設定できます。 ))webpack、Gatsbyプラグインなどをデバッグします。

### VSCodeを使用したブラウザのデバッグ

[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)拡張機能をインストールすると、Webアプリを検査し、VSCodeからブラウザーブレークポイントを設定できます。開発サーバー( `npm run dev`)が実行されている状態で、デバッガーペインから[Debug in Chrome](./。vscode / launch.json#L12)を選択して実行します。

## ストーリーブックコンポーネントのレンダリング

[ストーリーブック](https://storybook.js.org/)は、UIコンポーネント開発のために、スタイルとロケールを使用してコンポーネントをレンダリングできます。

ストーリーブックを実行する:

    npm run storybook

[./src/components/Button/button.stories.tsx](./ src / components / Button / button.stories.tsx)を参照してください

## eslintリンティングとフォーマット

リンティングを確認します。

    npm run lint

リンティングエラーを修正します。

    npm run format

## Antデザインのテーマ

Ant Design [デフォルトレス変数](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)は[./src/AntdTheme.jsでオーバーライドできます ](./ src / AntdTheme.js)、[。/gatsby-config.js#L51](./ gatsby-config.js#L51)で使用されます。


## プログラマティック翻訳

サポートされている言語([./src/utils/i18n/supportedLanguages.js](../src/utils/i18n/supportedLanguages.js))の翻訳を行うことができます。 英語の定義ファイル([./src/locales/en.json](./src/locales/en.json))が読み取られ、ソースとして使用され、DeepLまたはGoogle翻訳のいずれかを使用して翻訳が提供されます。

### DeepLによる翻訳

DeepL Proapiキーをnpmスクリプトに渡します。

    npm run translate:deepl -- your-DeepL-Pro-api-key-here

### Google翻訳で翻訳

サービスアカウント[credentials](https://github.com/leolabs/json-autotranslate#google-translate)をローカルのファイルに保存した状態で、.jsonファイルへのパスをnpmスクリプトに渡します。

    npm run translate:google -- ./your-GCP-service-account.json

### Protobufの生成

次のコマンドを実行して、プロトファイルを生成する必要があります。

    npm run generate-protos

### WASM生成

WASMファイルを生成するには、次のコマンドを実行します。

    npm run generate-wasm
