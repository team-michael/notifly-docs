// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Notifly",
  tagline: "Customer messaging software for every small business.",
  favicon: "img/favicon.ico",
  url: "https://docs.notifly.tech",
  baseUrl: "/",
  projectName: "notifly-docs",
  organizationName: "team-michael",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"],
    localeConfigs: {
      en: {
        label: "English",
        direction: "ltr",
        htmlLang: "en-US",
        calendar: "gregory",
        path: "en",
      },
      ko: {
        label: "Korean",
        direction: "ltr",
        htmlLang: "ko-KR",
        calendar: "gregory",
        path: "ko",
      },
    },
  },

  scripts: [
    {
      src: "/js/redirect-based-on-locale.js",
    },
  ],

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap",
      },
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-LBWM5EWR3L",
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        hashed: true,
        docsRouteBasePath: "/",
        language: ["en", "ko"],
        indexBlog: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Notifly",
        logo: {
          alt: "Notifly Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "localeDropdown",
            position: "left",
          },
          {
            type: "doc",
            docId: "user-guide/intro",
            position: "left",
            label: "User Guide",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "developerGuide",
            label: "Developer Guide",
          },
          {
            href: "https://www.notifly.tech",
            label: "Notifly",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Notifly Homepage",
                href: "https://www.notifly.tech",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Grey Box, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          "kotlin",
          "java",
          "swift",
          "gradle",
          "dart",
          "objectivec",
        ],
      },
      typesense: {
        // Replace this with the name of your index/collection.
        // It should match the "index_name" entry in the scraper's "config.json" file.
        typesenseCollectionName: "notifly-docs",

        typesenseServerConfig: {
          nodes: [
            {
              host: "bakpg1hyxec9fow0p-1.a1.typesense.net",
              port: 443,
              protocol: "https",
            },
          ],
          apiKey: "1fEbxnQmaCreZDHOMpHM470sq5gqWOb3", // Search-only API key
        },

        // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
        typesenseSearchParameters: {},

        // Optional
        contextualSearch: true,
      },
    }),
};

module.exports = config;
