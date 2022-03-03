# @appwrite/ui

This repo contains the SCSS library under `/src` and the styleguide for using those under `/docs`.

# Roadmap

This is work in progress. Each item listed should be its own page on the documentation with following content:

- Examples
- Description
- States
- Usage

## Layout

|   | Name         |
|---|--------------|
|   | App          |
|   | Header       |
|   | Navigation   |
|   | Footer       |

## Elements

|   | Name         |
|---|--------------|
| ☑️ | Button       |
| ☑️ | Input        |
| ☑️ | Search       |
| ☑️ | Password     |
| ☑️ | File         |
| ☑️ | Checkbox     |
| ☑️ | Toggle       |
| ☑️ | Radio        |
| ☑️ | Select       |
| ☑️ | Label        |
| ☑️ | Helper       |
| ☑️ | Pill         |
|   | Tag          |
| ☑️ | Tags Input   |
|   | Datalist     |
|   | Icon         |
|   | Range        |
|   | Textarea     |
|   | Input Group  |
|   | Button Group |

## Components

|   | Name         |
|---|--------------|
| ☑️ | Upload Box   |
| ☑️ | Upload Image |
|   | Modal        |
|   | Toast        |
|   | Tabs         |
|   | Avatar       |
|   | Tile         |
|   | Card         |
|   | Data table   |
|   | Code snippet |
|   | Theme switch |
|   | Dropdown     |
|   | Loading      |
|   | Empty state  |
|   | Pagination   |
|   | Tooltip      |
|   | Bar Chart    |
|   | Column Chart |
|   | Line Chart   |

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
npm run build // Builds the styleguide
```

## Preview

This will preview the build styleguide.

```sh
npm run preview
```
