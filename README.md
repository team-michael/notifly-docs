# [docs.notifly.tech](https://docs.notifly.tech/)

This repo contains the website configuration and documentation powering the [Notifly Documentation](https://docs.notifly.tech/).

## Contents

- [Getting started](#%EF%B8%8F-getting-started)
- [Contributing](#-contributing)

## ✈️ Getting started

### Prerequisites

1.  [Git](https://git-scm.com/downloads).
1.  [Node](https://nodejs.org/en/download/) _(version 12 or greater)_.
1.  A fork of the repo _(for any contributions)_.
1.  A clone of the `notifly-docs` repo.

### Installation

1.  Run `npm install` to install the website's workspace dependencies.

### Running locally

1.  `npm run write-translations -- --locale ko` to generate translations for Korean language.
1.  `npm run start` to start the development server _(powered by [Docusaurus](https://v2.docusaurus.io))_.
    - `npm run start -- --locale ko` to start the server in Korean.
1.  Open http://localhost:3000/ site in your favorite browser.
1.  **NOTE: Each locale is a distinct standalone single-page application: it is not possible to start the Docusaurus sites in all locales at the same time.**

### Directory Structure

The following is a high-level overview of relevant files and folders.
Sidebar automatically detects the directory structure.

```
└── /docs # default, english
    ├── client-sdk
    ├── http-api
    └── intro.md
└── /i18n/ko # korean translation
    └── docusaurus-plugin-content-docs/current # translation data the docs plugin needs
    │   └── current
    │       ├── client-sdk
    │       ├── http-api
    │       └── intro.md
    └── ...
```

## 👏 Contributing

### Create a branch

1.  `git checkout main` from any folder in your local `notifly-docs` repository.
1.  `git pull origin main` to ensure you have the latest main code.
1.  `git checkout -b the-name-of-my-branch` to create a branch.

### Make the change

1.  Follow the "[Running locally](#running-locally)" instructions.
1.  Save the files and check in the browser.
1.  Some changes may require a server restart to generate new files. (Pages in `docs` always do!)

### Test the change

If possible, test any visual changes in all latest versions of the following browsers:

- Chrome and Firefox on the desktop.
- Chrome and Safari on mobile.

### Push it

1.  Run `npm run format` to ensure your changes are consistent with other files in the repo.
1.  `git add -A && git commit -m "feat: My message"` to stage and commit your changes.
    - replace `My message` with a commit message, such as `Fixed header logo on Android`
    - Follow the rules of [Conventional Commits](https://www.conventionalcommits.org/)
1.  `git push my-fork-name the-name-of-my-branch`
1.  Go to the [notifly-docs repo](https://github.com/team-michael/notifly-docs) and you should see recently pushed branches.
1.  Follow GitHub's instructions.
1.  Describe briefly your changes (in case of visual changes, please include screenshots).
