# Appwrite UI

## Applications

| Application                             | Changelog                                 |
| --------------------------------------- | ----------------------------------------- |
| [@appwrite/styleguide](apps/styleguide) | [Changelog](apps/styleguide/CHANGELOG.md) |

## Packages

| Package                           | Changelog                                |
| --------------------------------- | ---------------------------------------- |
| [@appwrite/ui](packages/ui)       | [Changelog](packages/ui/CHANGELOG.md)    |
| [@appwrite/icons](packages/icons) | [Changelog](packages/icons/CHANGELOG.md) |

# Development

## Setup

[Node.js 14+](https://nodejs.org/) needs to be installed.

```sh
git clone https://github.com/appwrite/ui.git
cd ui
npm install
```

## Development

This command can be used to develop components und have the styleguide available under [http://localhost:3000](http://localhost:3000) with auto-reload.

```sh
npm run dev
```

## Build

You can build the Styleguide, including all dependencies in [`packages/`](packages/), with:

```sh
npm run build
```

## Code structure

Entry points to be aware of are:

- [`packages/ui`](packages/ui) - SCSS library for all elements and components
- [`packages/icons`](packages/icons) - SVG icons that are converted to an icon font
- [`apps/styleguide`](packages/styleguide) - Styleguide of Appwrite containing design specification and components
