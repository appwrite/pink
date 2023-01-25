import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";
import m2dx from "astro-m2dx";

/** @type {import('astro-m2dx').Options} */
import svelte from "@astrojs/svelte";
const m2dxOptions = {
  autoImports: true,
  exportComponents: true,
  frontmatter: true,
  componentDirectives: true,
  unwrapImages: true,
};

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3333,
  },
  integrations: [mdx(), alpinejs(), svelte()],
  markdown: {
    remarkPlugins: [remarkDirective, [m2dx, m2dxOptions]],
    extendDefaultPlugins: true,
  },
  vite: {
    exclude: ["codemirror", "@codemirror/language-javascript" /* ... */],
  },
});
