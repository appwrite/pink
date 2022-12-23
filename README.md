# Appwrite UI

## Applications

| Application                               | Link                                             | Changelog                                  |
| ----------------------------------------- | ------------------------------------------------ | ------------------------------------------ |
| [@appwrite/styleguide](apps/styleguide)   | [Link](https://appwrite-ui.vercel.app/)          | [Changelog](apps/styleguide/CHANGELOG.md)  |
| [@appwrite/kitchensink](apps/kitchensink) | [Link](https://appwrite-kitchensink.vercel.app/) | [Changelog](apps/kitchensink/CHANGELOG.md) |
| [@appwrite/pink](apps/pink)               | [Link](https://ui-pinkui.vercel.app/)            | [Changelog](apps/pink/CHANGELOG.md)        |

## Packages

| Package                           | Changelog                                |
| --------------------------------- | ---------------------------------------- |
| [@appwrite/ui](packages/ui)       | [Changelog](packages/ui/CHANGELOG.md)    |
| [@appwrite/icons](packages/icons) | [Changelog](packages/icons/CHANGELOG.md) |

# Development

## Setup

[Node.js 16+](https://nodejs.org/) needs to be installed.

```sh
git clone https://github.com/appwrite/ui.git
cd ui
npm install
```

## Development

This command can be used to develop components and have the styleguide available under [http://localhost:3000](http://localhost:3000), the kitchen sink under [http://localhost:3030](http://localhost:3030), and the pinkUI under [http://localhost:3333](http://localhost:3333) with auto-reload.

Both applications inherit styles and icons respectively from the ui and icon packages. Changes made to these packages will also affect the applications. Styles and icons are taken from the dist folder so `npm run build` must be run to be able to see updates.

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
- [`apps/pink`](apps/pink) - PinkUI design style library

## Old Style guide

The old style guide currently makes use of the [catalog.style](https://www.catalog.style/) library.

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

## New Style guide (PinkUI)

PinkUI currently makes use of the [astro.build](https://astro.build/) library.

New pages can be added by creating a `.mdx` file in the `pages` folder.

To show code examples the `<Preview>...</Preview>` tag can be used. To render html without the code example `<Showcase>...</Showcase>` tag can be used. They are both auto imported in every mdx file inside the pages folder. They autoimport is handled in `/pages/_autoimports.ts` with [m2dx](https://astro-m2dx.netlify.app/docs)

m2dx is also used to overwrite native markdown components to apply custom classes to html elements. This behaviour can be modified in the `/pages/_components.ts`

Layout is applied in `/pages/_frontmatter.yaml`

There are 3 custom directives. `COMPARISON`, `DO` and `DONT` they are set in `/pages/_directives.ts` and can be used like this:

```md
::::COMPARISON

![image1](/images/button-do-1.svg)

![image2](/images/button-dont-1.png)

:::DO
Increase recognition by using icons with universal meaning. Increase readability by keeping text short and using uppercase letter only for the first word.
:::

:::DONT
Avoid using specific icons, uppercase in every word and long sentences.
:::

::::
```
