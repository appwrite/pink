<script lang="ts">
    export let theme: Record<string, string>;

    $: cssVariables = Object.keys(theme)
        .map((key) => `--${key}: ${theme[key]};`)
        .join(' ');
</script>

<svelte:head>
    {@html `<style>:root {${cssVariables}}</style>`}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<slot />

<style>
    :root {
        color: var(--color-fgcolor-neutral-secondary);
        background-color: var(--color-bgcolor-neutral-primary);
        font-size: var(--font-size-s);
        font-family: var(--font-family-sansserif);
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
