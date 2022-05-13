# Appwrite UI

## Applications

| Application                               | Link                                                      | Changelog                                  |
| ----------------------------------------- | --------------------------------------------------------- | ------------------------------------------ |
| [@appwrite/styleguide](apps/styleguide)   | [Link](https://appwrite-ui.vercel.app/)                   | [Changelog](apps/styleguide/CHANGELOG.md)  |
| [@appwrite/kitchensink](apps/kitchensink) | [Link](https://appwrite-kitchensink.vercel.app/)          | [Changelog](apps/kitchensink/CHANGELOG.md) |

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

This command can be used to develop components and have the styleguide available under [http://localhost:3000](http://localhost:3000), and the kitchen sink under [http://localhost:3030](http://localhost:3030), with auto-reload.

Both applications inherit styles and icons respectively from the ui and icon packages. Changes made to these packages will also affect the applications.

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
- [`apps/styleguide`](apps/styleguide) - Styleguide of Appwrite containing design specification and components
- [`apps/kitchensink`](apps/kitchensink) - The kitchen-sink displays all elements and components in one page, and contains two demo pages

## Style guide

The style guide currently makes use of the [catalog.style](https://www.catalog.style/) library.

New pages can be added by creating a markdown file in the docs folder.

## Kitchen sink

The kitchen sink is built with vite and uses vite-plugin-handlebars to create partials for sidebars and navigation.

To add a new page: create a new HTML file, then add a new route in the vite config file pointing at the HTML file.

```js

const config = {
  [...]
  build: {
    rollupOptions: {
      input: {
        newPage: new URL("./newPage.html", import.meta.url).pathname,
      },
    },
  },
  [...]
};

```

Partials found in the partial folder are automatically available. You can add them by:

```html
{{> partialName}}
```
