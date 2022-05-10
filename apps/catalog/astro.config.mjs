import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), lit()],
  server: {
    port: 3060,
  },
});
