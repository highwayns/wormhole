module.exports = {
    locales: {
        '/': {
            title: "Wormhole Docs",
            description: "Wormhole is an open source, public blockchain protocol that provides fundamental infrastructure for a decentralized economy and enables open participation in the creation of new financial primitives to power the innovation of money.",
        },
        '/zh/': {
            title: "Wormhole 文档",
            description: "Wormhole is an open source, public blockchain protocol that provides fundamental infrastructure for a decentralized economy and enables open participation in the creation of new financial primitives to power the innovation of money.",
        },
        '/ja/': {
            title: "Wormhole ドキュメント",
            description: "Wormhole is an open source, public blockchain protocol that provides fundamental infrastructure for a decentralized economy and enables open participation in the creation of new financial primitives to power the innovation of money.",
        }
    },
    markdown: {
        extendMarkdown: (md) => {
            md.use(require("markdown-it-footnote"));
        },
    },
    plugins: [
        [
            "@vuepress/register-components",
            {
                componentsDir: "theme/components",
            },
        ],
        [
            "vuepress-plugin-mathjax",
            {
                target: "svg",
                macros: {
                    "*": "\\times",
                },
            },
        ],
    ],
    head: [
        [
            "link",
            {
                rel: "stylesheet",
                type: "text/css",
                href: "https://cloud.typography.com/7420256/6416592/css/fonts.css",
            },
        ],
        [
            "link",
            {
                rel: "stylesheet",
                type: "text/css",
                href: "https://www.terra.money/static/fonts/jetbrainsMono.css?updated=190220"
            },
        ],
        [
            "link",
            {
                rel: "stylesheet",
                type: "text/css",
                href: "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined",
            },
        ],

        [
            "link",
            {
                rel: "stylesheet",
                type: "text/css",
                href: "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&display=swap",
            },
        ],
        [
            "link",
            {
                rel: "icon",
                type: "image/png",
                href: "/img/favicon.png",
            },
        ],
        [
            "script",
            {},
            `window.onload = function() {
requestAnimationFrame(function() {
    if (location.hash) {
    const element = document.getElementById(location.hash.slice(1))

    if (element) {
        element.scrollIntoView()
    }
    }
})
}`,
        ],
    ],
    themeConfig: {
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                nav: [
                    { text: "Top", link: "/" },
                    { text: "Design", link: "/design/" },
                    { text: "SDK", link: "/sdk/" },
                    { text: "Bridge UI", link: "/bridge_ui/" },
                    { text: "LP UI", link: "/lp_ui/" },
                    { text: "Explorer", link: "/explorer/" },
                    { text: "Event Database", link: "/event_database/" },
                    { text: "Ethereum", link: "/ethereum/" },
                    {
                        text: "GitHub",
                        link: "https://github.com/highwayns/cosmos-sdk",
                        icon: "/img/github.svg",
                    },
                ],
                sidebar: {
                    "/design/": [
                        "/design/",
                        "/design/0001_generic_message_passing",
                        "/design/0002_governance_messaging",
                        "/design/0003_token_bridge",
                        "/design/0004_message_publishing",
                        "/design/0005_data_availability",
                        "/design/0006_nft_bridge",
                    ],
                    "/sdk/": [
                        "/sdk/",
                    ],
                    "/bridge_ui/": [
                        "/bridge_ui/",
                    ],
                    "/lp_ui/": [
                        "/lp_ui/",
                    ],
                    "/explorer/": [
                        "/explorer/",
                    ],
                    "/event_database/": [
                        "/event_database/",
                    ],
                    "/ethereum/": [
                        "/ethereum/",
                    ],
                    "/": [{
                        title: "Overview",
                        children: [
                            "/DEVELOP",
                            "/CONTRIBUTING",
                            "/assumptions",
                            "/devnet",
                            "/operations",
                        ],
                        collapsable: false,
                    }, ],
                },
            },
            '/zh/': {
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                nav: [
                    { text: "首页", link: "/zh/" },
                    { text: "设计", link: "/zh/design/" },
                    { text: "SDK", link: "/zh/sdk/" },
                    { text: "Bridge UI", link: "/zh/bridge_ui/" },
                    { text: "LP UI", link: "/zh/lp_ui/" },
                    { text: "Explorer", link: "/zh/explorer/" },
                    { text: "Event Database", link: "/zh/event_database/" },
                    { text: "Ethereum", link: "/zh/ethereum/" },
                    {
                        text: "GitHub",
                        link: "https://github.com/highwayns/cosmos-sdk",
                        icon: "/img/github.svg",
                    },
                ],
                sidebar: {
                    "/zh/design/": [
                        "/zh/design/",
                        "/zh/design/0001_generic_message_passing",
                        "/zh/design/0002_governance_messaging",
                        "/zh/design/0003_token_bridge",
                        "/zh/design/0004_message_publishing",
                        "/zh/design/0005_data_availability",
                        "/zh/design/0006_nft_bridge",
                    ],
                    "/zh/sdk/": [
                        "/zh/sdk/",
                    ],
                    "/zh/bridge_ui/": [
                        "/zh/bridge_ui/",
                    ],
                    "/zh/lp_ui/": [
                        "/zh/lp_ui/",
                    ],
                    "/zh/explorer/": [
                        "/zh/explorer/",
                    ],
                    "/zh/event_database/": [
                        "/zh/event_database/",
                    ],
                    "/zh/ethereum/": [
                        "/zh/ethereum/",
                    ],
                    "/zh/": [{
                        title: "Overview",
                        children: [
                            "/zh/DEVELOP",
                            "/zh/CONTRIBUTING",
                            "/zh/assumptions",
                            "/zh/devnet",
                            "/zh/operations",
                        ],
                        collapsable: false,
                    }, ],
                },
            },
            '/ja/': {
                selectText: '言語選択',
                // 该语言在下拉菜单中的标签
                label: '日本語',
                nav: [
                    { text: "トップ", link: "/ja/" },
                    { text: "設計", link: "/ja/design/" },
                    { text: "SDK", link: "/ja/sdk/" },
                    { text: "Bridge UI", link: "/ja/bridge_ui/" },
                    { text: "LP UI", link: "/ja/lp_ui/" },
                    { text: "Explorer", link: "/ja/explorer/" },
                    { text: "Event Database", link: "/ja/event_database/" },
                    { text: "Ethereum", link: "/ja/ethereum/" },
                    {
                        text: "GitHub",
                        link: "https://github.com/highwayns/cosmos-sdk",
                        icon: "/img/github.svg",
                    },
                ],
                sidebar: {
                    "/ja/design/": [
                        "/ja/design/",
                        "/ja/design/0001_generic_message_passing",
                        "/ja/design/0002_governance_messaging",
                        "/ja/design/0003_token_bridge",
                        "/ja/design/0004_message_publishing",
                        "/ja/design/0005_data_availability",
                        "/ja/design/0006_nft_bridge",
                    ],
                    "/ja/sdk/": [
                        "/ja/sdk/",
                    ],
                    "/ja/bridge_ui/": [
                        "/ja/bridge_ui/",
                    ],
                    "/ja/lp_ui/": [
                        "/ja/lp_ui/",
                    ],
                    "/ja/explorer/": [
                        "/ja/explorer/",
                    ],
                    "/ja/event_database/": [
                        "/ja/event_database/",
                    ],
                    "/ja/ethereum/": [
                        "/ja/ethereum/",
                    ],
                    "/ja/": [{
                        title: "Overview",
                        children: [
                            "/ja/DEVELOP",
                            "/ja/CONTRIBUTING",
                            "/ja/assumptions",
                            "/ja/devnet",
                            "/ja/operations",
                        ],
                        collapsable: false,
                    }, ],
                },
            },
        },
        sidebarDepth: 3,
        // overrideTheme: 'dark',
        // prefersTheme: 'dark',
        // overrideTheme: { light: [6, 18], dark: [18, 6] },
        // theme: 'default-prefers-color-scheme',
        logo: "/img/logo-cosmos.svg",
        lastUpdated: "Updated on",
        repo: "teiwei2003/wormhole",
        editLinks: true,
        editLinkText: "Edit this page on GitHub",
        docsBranch: 'main',
        docsDir: "docs",
        algolia: {
            apiKey: "5957091e293f7b97f2994bde312aed99",
            indexName: "terra-project",
        },
    },
};