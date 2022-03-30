# @appwrite/ui

This repo contains the SCSS library under `/src` and the styleguide for using those under `/docs`.

# Roadmap

This is work in progress. Each item listed should be its own page on the documentation with following content:

- Examples
- Description
- States
- Usage

## Layout

|     | Name       | Preview |
| --- | ---------- | ------- |
|     | App        |         |
|     | Header     |         |
|     | Navigation |         |
|     | Footer     |         |

## Elements

|     | Name         | Preview                                              |
| --- | ------------ | ---------------------------------------------------- |
| ☑️  | Button       | https://appwrite-ui.vercel.app/#/elements/button     |
| ☑️  | Input        | https://appwrite-ui.vercel.app/#/elements/input      |
| ☑️  | Search       | https://appwrite-ui.vercel.app/#/elements/search     |
| ☑️  | Password     | https://appwrite-ui.vercel.app/#/elements/password   |
| ☑️  | File         | https://appwrite-ui.vercel.app/#/elements/file       |
| ☑️  | Checkbox     | https://appwrite-ui.vercel.app/#/elements/checkbox   |
| ☑️  | Toggle       | https://appwrite-ui.vercel.app/#/elements/toggle     |
| ☑️  | Radio        | https://appwrite-ui.vercel.app/#/elements/radio      |
| ☑️  | Select       | https://appwrite-ui.vercel.app/#/elements/select     |
| ☑️  | Label        | https://appwrite-ui.vercel.app/#/elements/label      |
| ☑️  | Helper       | https://appwrite-ui.vercel.app/#/elements/helper     |
| ☑️  | Pill         | https://appwrite-ui.vercel.app/#/elements/pill       |
|     | Tag          |                                                      |
| ☑️  | Tags Input   | https://appwrite-ui.vercel.app/#/elements/tags-input |
|     | Datalist     |                                                      |
|     | Icon         |                                                      |
|     | Range        |                                                      |
|     | Textarea     |                                                      |
|     | Input Group  |                                                      |
|     | Button Group |                                                      |

## Components

|     | Name         | Preview                                                  |
| --- | ------------ | -------------------------------------------------------- |
| ☑️  | Upload Box   | https://appwrite-ui.vercel.app/#/components/upload-box   |
| ☑️  | Upload Image | https://appwrite-ui.vercel.app/#/components/upload-image |
|     | Modal        |                                                          |
|     | Toast        |                                                          |
|     | Tabs         |                                                          |
|     | Avatar       |                                                          |
|     | Tile         |                                                          |
|     | Card         |                                                          |
|     | Data table   |                                                          |
|     | Code snippet |                                                          |
|     | Theme switch |                                                          |
|     | Dropdown     |                                                          |
|     | Loading      |                                                          |
|     | Empty state  |                                                          |
|     | Pagination   |                                                          |
|     | Tooltip      |                                                          |
|     | Bar Chart    |                                                          |
|     | Column Chart |                                                          |
|     | Line Chart   |                                                          |

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

## Publish

This will build the styleguide in `/dist`.

```sh
# Builds the styleguide
npm run build
```

## Preview

This will preview the build styleguide.

```sh
npm run preview
```
