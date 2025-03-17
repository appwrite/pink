<script context="module" lang="ts">
    import { Logs } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Logs',
        component: Logs,
        args: {
            logs: `Preparing for build ...
Building ...
<button onclick="alert('<%= escapedOutput %>')">[[Click Me to test injection]]</button>

added 76 packages, and audited 77 packages in 7s

11 packages are looking for funding
  run \`npm fund\` for details

[31m[1m4[22m[39m vulnerabilities (2 [1mlow[22m, 2 [33m[1mmoderate[22m[39m)

To address all issues, run:
  npm audit fix

Run \`npm audit\` for details.

> starter@0.0.1 build
> vite build
 [33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mCannot find base config file "./.svelte-kit/tsconfig.json"[0m [tsconfig.json]
 

[36mvite v5.4.11 [32mbuilding SSR bundle for production...[36m[39m
transforming...
"confetti" is imported from external module "@neoconfetti/svelte" but never used in "src/routes/sverdle/+page.svelte".
[32m✓[39m 174 modules transformed.
rendering chunks...
[36mvite v5.4.11 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 152 modules transformed.
rendering chunks...
computing gzip size...
[2m.svelte-kit/output/client/[22m[32m_app/version.json                                                       [39m[1m[2m  0.03 kB[22m[1m[22m[2m │ gzip:  0.05 kB[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-greek-ext-400-normal.BEhC8Nsh.woff      [39m[1m[2m  6.60 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-cyrillic-400-normal.Dq7SlH2J.woff       [39m[1m[2m  7.09 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-greek-ext-400-normal.CsqI23CO.woff2     [39m[1m[2m  7.51 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-greek-400-normal.DUeQbRz0.woff          [39m[1m[2m  8.46 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-latin-ext-400-normal.lWlD_NAB.woff      [39m[1m[2m  9.09 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-cyrillic-400-normal.36-45Uyg.woff2      [39m[1m[2m  9.10 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-greek-400-normal.C3zng6O6.woff2         [39m[1m[2m 10.52 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m.vite/manifest.json                                                     [39m[1m[2m 10.92 kB[22m[1m[22m[2m │ gzip:  1.34 kB[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-latin-ext-400-normal.D6XfiR-_.woff2     [39m[1m[2m 11.36 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.0xXfcOOq.woff   [39m[1m[2m 12.91 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-latin-400-normal.g4W12wf9.woff          [39m[1m[2m 13.51 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2  [39m[1m[2m 15.77 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/fira-mono-latin-400-normal.DKjLVgQi.woff2         [39m[1m[2m 16.28 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/svelte-welcome.0pIiHnVF.webp                      [39m[1m[2m115.47 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[32m_app/immutable/assets/svelte-welcome.VNiyy3gC.png                       [39m[1m[2m360.81 kB[22m[1m[22m
[2m.svelte-kit/output/client/[22m[35m_app/immutable/assets/5.Dv9QCmvw.css                                    [39m[1m[2m  0.74 kB[22m[1m[22m[2m │ gzip:  0.35 kB[22m
[2m.svelte-kit/output/client/[22m[35m_app/immutable/assets/2.sTI-GHXi.css                                    [39m[1m[2m  1.37 kB[22m[1m[22m[2m │ gzip:  0.54 kB[22m
[2m.svelte-kit/output/client/[22m[35m_app/immutable/assets/4.yeGN9jlM.css                                    [39m[1m[2m  3.69 kB[22m[1m[22m[2m │ gzip:  1.07 kB[22m
[2m.svelte-kit/output/client/[22m[35m_app/immutable/assets/0.MkCFnZkZ.css                                    [39m[1m[2m  5.12 kB[22m[1m[22m[2m │ gzip:  1.77 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/legacy.BBHJs4jf.js                                [39m[1m[2m  0.04 kB[22m[1m[22m[2m │ gzip:  0.06 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/index.DHZQLOUe.js                                 [39m[1m[2m  0.07 kB[22m[1m[22m[2m │ gzip:  0.08 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/entry/start.BCV2ooXh.js                                  [39m[1m[2m  0.07 kB[22m[1m[22m[2m │ gzip:  0.08 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/svelte-head.DGOUwGjP.js                           [39m[1m[2m  0.40 kB[22m[1m[22m[2m │ gzip:  0.29 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/attributes.CaPm3nup.js                            [39m[1m[2m  0.43 kB[22m[1m[22m[2m │ gzip:  0.32 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/index.KyJerEPT.js                                 [39m[1m[2m  0.51 kB[22m[1m[22m[2m │ gzip:  0.33 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/nodes/1.C8PQ9MfL.js                                      [39m[1m[2m  0.62 kB[22m[1m[22m[2m │ gzip:  0.39 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/store.KIUi2Iq3.js                                 [39m[1m[2m  0.64 kB[22m[1m[22m[2m │ gzip:  0.36 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/stores.BX43RqtY.js                                [39m[1m[2m  0.75 kB[22m[1m[22m[2m │ gzip:  0.43 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/disclose-version.DvCzCkvC.js                      [39m[1m[2m  0.98 kB[22m[1m[22m[2m │ gzip:  0.56 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/attributes.DJgKnbgG.js                            [39m[1m[2m  1.19 kB[22m[1m[22m[2m │ gzip:  0.66 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/nodes/3.CF_rTgAV.js                                      [39m[1m[2m  1.19 kB[22m[1m[22m[2m │ gzip:  0.74 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/nodes/5.BCqjAyWh.js                                      [39m[1m[2m  1.99 kB[22m[1m[22m[2m │ gzip:  0.89 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/render.C7cLqPAm.js                                [39m[1m[2m  3.11 kB[22m[1m[22m[2m │ gzip:  1.60 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/props.BO0UpYjv.js                                 [39m[1m[2m  3.66 kB[22m[1m[22m[2m │ gzip:  1.76 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/nodes/2.CjAgYzap.js                                      [39m[1m[2m  4.09 kB[22m[1m[22m[2m │ gzip:  2.02 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/nodes/0.BIE_3BY1.js                                      [39m[1m[2m  6.43 kB[22m[1m[22m[2m │ gzip:  2.66 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/entry/app.B0GxLtVI.js                                    [39m[1m[2m  6.80 kB[22m[1m[22m[2m │ gzip:  3.11 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/runtime.Ctia-zZj.js                               [39m[1m[2m 12.02 kB[22m[1m[22m[2m │ gzip:  4.94 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/nodes/4.D2GTnf1t.js                                      [39m[1m[2m 14.46 kB[22m[1m[22m[2m │ gzip:  6.60 kB[22m
[2m.svelte-kit/output/client/[22m[36m_app/immutable/chunks/entry.BaUtrnVZ.js                                 [39m[1m[2m 29.22 kB[22m[1m[22m[2m │ gzip: 11.46 kB[22m
[32m✓ built in 3.10s[39m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-greek-ext-400-normal.BEhC8Nsh.woff      [39m[1m[2m  6.60 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-cyrillic-400-normal.Dq7SlH2J.woff       [39m[1m[2m  7.09 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-greek-ext-400-normal.CsqI23CO.woff2     [39m[1m[2m  7.51 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-greek-400-normal.DUeQbRz0.woff          [39m[1m[2m  8.46 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-latin-ext-400-normal.lWlD_NAB.woff      [39m[1m[2m  9.09 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-cyrillic-400-normal.36-45Uyg.woff2      [39m[1m[2m  9.10 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m.vite/manifest.json                                                     [39m[1m[2m  9.39 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-greek-400-normal.C3zng6O6.woff2         [39m[1m[2m 10.52 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-latin-ext-400-normal.D6XfiR-_.woff2     [39m[1m[2m 11.36 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.0xXfcOOq.woff   [39m[1m[2m 12.91 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-latin-400-normal.g4W12wf9.woff          [39m[1m[2m 13.51 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2  [39m[1m[2m 15.77 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/fira-mono-latin-400-normal.DKjLVgQi.woff2         [39m[1m[2m 16.28 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/svelte-welcome.0pIiHnVF.webp                      [39m[1m[2m115.47 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[32m_app/immutable/assets/svelte-welcome.VNiyy3gC.png                       [39m[1m[2m360.81 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[35m_app/immutable/assets/_page.Dv9QCmvw.css                                [39m[1m[2m  0.74 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[35m_app/immutable/assets/_page.DyB6JVG_.css                                [39m[1m[2m  1.35 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[35m_app/immutable/assets/_page.yeGN9jlM.css                                [39m[1m[2m  3.69 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[35m_app/immutable/assets/_layout.Cx3-GBnG.css                              [39m[1m[2m  5.37 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/node.js                                                          [39m[1m[2m  0.04 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/_page.js                                                  [39m[1m[2m  0.05 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/index4.js                                                        [39m[1m[2m  0.08 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/about/_page.js                                            [39m[1m[2m  0.13 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/sverdle/how-to-play/_page.js                              [39m[1m[2m  0.13 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/client.js                                                        [39m[1m[2m  0.26 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36minternal.js                                                             [39m[1m[2m  0.31 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/equality.js                                                      [39m[1m[2m  0.33 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/attributes.js                                                    [39m[1m[2m  0.52 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/escaping.js                                                      [39m[1m[2m  0.53 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/stores.js                                                        [39m[1m[2m  0.55 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/fallbacks/error.svelte.js                                       [39m[1m[2m  0.56 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/about/_page.svelte.js                                     [39m[1m[2m  0.94 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/index2.js                                                        [39m[1m[2m  1.44 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/sverdle/how-to-play/_page.svelte.js                       [39m[1m[2m  1.74 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/index.js                                                         [39m[1m[2m  2.10 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/exports.js                                                       [39m[1m[2m  6.09 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/_layout.svelte.js                                         [39m[1m[2m  6.32 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/sverdle/_page.svelte.js                                   [39m[1m[2m  6.39 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/_page.svelte.js                                           [39m[1m[2m  6.41 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/internal.js                                                      [39m[1m[2m 18.19 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mchunks/index3.js                                                        [39m[1m[2m 25.70 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mindex.js                                                                [39m[1m[2m 91.64 kB[22m[1m[22m
[2m.svelte-kit/output/server/[22m[36mentries/pages/sverdle/_page.server.js                                   [39m[1m[2m146.23 kB[22m[1m[22m
[32m✓ built in 7.82s[39m

Run [1m[36mnpm run preview[22m[39m to preview your production build locally.
[1m[36m
> Using @sveltejs/adapter-node[22m[39m
  [32m✔ done[39m
Packing build ...
Build finished.
`
        }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
    import { page } from '$app/stores';
</script>

<Story name="Default" let:args>
    <div style:max-width="1200px">
        <Logs {...args} />
    </div>
</Story>
<Story name="Full heigth" let:args>
    <div style:max-width="1200px">
        <Logs {...args} fullHeight />
    </div>
</Story>
<Story name="No logs" let:args>
    <div style:max-width="1200px">
        <Logs {...args} fullHeight logs="No logs available" />
    </div>
</Story>
