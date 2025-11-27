<script lang="ts">
    import { activePopover } from './context.js';

    export let theme: Record<string, string>;

    $: Object.keys(theme).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });

    activePopover.init();
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<slot />

<style lang="scss">
    @use '../scss/_breakpoints' as *;

    :root {
        --sans-fallbacks: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        --mono-fallbacks: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
        color: var(--fgcolor-neutral-secondary);
        background-color: var(--bgcolor-neutral-primary);
        font-size: var(--font-size-m);
        font-family: var(--font-family-sansserif), var(--sans-fallbacks);
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        scrollbar-width: thin;
        scrollbar-gutter: stable;

        /* temporary experiment */
        //@media (max-width: $breakpoint-s) {
        //    --font-size-s: var(--font-size-m) !important;
        //}
    }
    :global(::-webkit-scrollbar) {
        width: var(--base-4);
        height: var(--base-4);
    }

    :global(::-webkit-scrollbar-track) {
        background-color: transparent;
        border-radius: var(--border-radius-circle);
    }

    :global(::-webkit-scrollbar-corner) {
        background-color: transparent;
    }
    :global(::-webkit-scrollbar-thumb) {
        border-radius: var(--border-radius-circle);
        background: var(--overlay-on-neutral);
        &:hover {
            background: var(--overlay-neutral-hover);
        }
    }
</style>
