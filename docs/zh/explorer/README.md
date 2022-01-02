# 虫洞探险家

使用以下内容构建的网络应用程序:
- [GatsbyJS](https://www.gatsbyjs.com/)
- [gatsby-plugin-intl](https://www.gatsbyjs.com/plugins/gatsby-plugin-intl/)
- [打字稿](https://www.typescriptlang.org/)
- [蚂蚁设计](https://ant.design/)


## 值得注意的文件

- 支持的语言 - 在此处添加/删除支持的语言 [./src/utils/i18n/supportedLanguages.js](../src/utils/i18n/supportedLanguages.js)
- 多语言复制 [./src/locales](./src/locales)
- 顶级页面和客户端路由。在此处添加文件会创建一个@reach-router 路由 [./src/pages](./src/pages)
- SEO 配置，被所有页面继承 [./src/components/SEO/SEO.tsx](./src/components/SEO/SEO.tsx)
- 主布局 HOC，包含顶部菜单导航和页脚 [./src/components/Layout/DefaultLayout.tsx](./src/components/Layout/DefaultLayout.tsx)
- Gatsby 插件 [./gatsby-config.js](./gatsby-config.js)
- Ant Design 主题变量，覆盖 Antd 默认值 [./src/AntdTheme.js](./src/AntdTheme.js)


## 回购设置

使用 npm 安装依赖项:

    npm install

从 `.env.sample` 为你的开发环境创建一个 `.env` 文件:

    cp .env.sample .env.development

## 开发

使用 npm 脚本启动开发服务器:

    npm run dev

然后在浏览器中打开 Web 应用程序 [http://localhost:8000](http://localhost:8000)

## 调试
### NodeJs 用 VSCode 调试

您可以使用 VSCode 的 debbuger 调试 Gatsby 开发服务器或构建过程。签出 [.vscode/launch.json](./.vscode/launch.json) 以查看 NodeJS 调试选项。

这些调试器配置将允许您在 Gatsby 节点程序 ([./gatsby-config.js](./gatsby-config.js)、[./gatsby-node.js](./gatsby-node.js) 中设置断点)) 来调试 webpack、Gatsby 插件等。

### 使用 VSCode 进行浏览器调试

安装 [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) 扩展程序后，您可以检查 Web 应用程序并从 VSCode 设置浏览器断点。在开发服务器 (`npm run dev`) 运行的情况下，从调试器窗格中选择并运行 [Debug in Chrome](./.vscode/launch.json#L12)。

## Storybook 组件渲染

[Storybook](https://storybook.js.org/) 可以渲染带有样式和语言环境的组件，用于 UI 组件开发。

使用以下命令运行 Storybook:

    npm run storybook

见 [./src/components/Button/button.stories.tsx](./src/components/Button/button.stories.tsx)

## eslint lint 和格式化

检查掉毛:

    npm run lint

修复掉毛错误:

    npm run format

## Ant 设计主题

Ant Design [默认较少变量](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) 可以在 [./src/AntdTheme.js 中覆盖 ](./src/AntdTheme.js)，在 [./gatsby-config.js#L51](./gatsby-config.js#L51) 中使用。


## 程序化翻译

可以对支持的语言进行翻译 ([./src/utils/i18n/supportedLanguages.js](../src/utils/i18n/supportedLanguages.js))。 英语语言定义文件 ([./src/locales/en.json](./src/locales/en.json)) 将被读取并用作源，使用 DeepL 或谷歌翻译提供翻译。

### 使用 DeepL 进行翻译

将您的 DeepL Pro api 密钥传递给 npm 脚本:

    npm run translate:deepl -- your-DeepL-Pro-api-key-here

### 使用 Google 翻译进行翻译

将您的服务帐户 [凭据](https://github.com/leolabs/json-autotranslate#google-translate) 保存到本地文件，将 .json 文件的路径传递给 npm 脚本:

    npm run translate:google -- ./your-GCP-service-account.json

### Protobuf 生成

您需要通过运行来生成 proto 文件:

    npm run generate-protos

### WASM 生成

要生成 WASM 文件，请运行:

    npm run generate-wasm
