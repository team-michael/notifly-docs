# notifly-docs

Hosted via Vercel: [https://docs.notifly.tech/](https://docs.notifly.tech/)

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Repository structure

Sidebar automatically detects the directory structure.

```
└── /docs # default 
    ├── client-sdk
    ├── http-api
    └── intro.md
└── /i18n/ko
    └── docusaurus-plugin-content-docs/current # translation data the docs plugin needs
    │   └── current
    │       ├── client-sdk
    │       ├── http-api
    │       └── intro.md
    └── ...
```

## Getting started

### Setup

```
npm i
```

There are no env variables, so no `.env` file. 

### Translations

```
npm run write-translations -- --locale ko
```

### Local development

__NOTE: Each locale is a distinct standalone single-page application: it is not possible to start the Docusaurus sites in all locales at the same time.__

English (default)
```
npm run start
```

Korean

```
npm run start -- --locale ko
```
