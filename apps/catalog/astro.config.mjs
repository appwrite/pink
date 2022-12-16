import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";
import m2dx from "astro-m2dx";

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  autoImports: true,
  exportComponents: true,
  frontmatter: true,
  componentDirectives: true,
  unwrapImages: true,
};

export default defineConfig({
  server: {
    port: 3333,
  },
  integrations: [mdx(), alpinejs()],
  markdown: {
    remarkPlugins: [remarkDirective, [m2dx, m2dxOptions]],
    extendDefaultPlugins: true,
  },
});
