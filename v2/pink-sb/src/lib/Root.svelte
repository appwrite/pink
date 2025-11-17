<script lang="ts">
    import './root.scss';
    import { activePopover } from './context.js';

    export let theme: Record<string, string>;

    $: Object.keys(theme).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });

    activePopover.init();
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
        href="https://fonts.bunny.net/css?family=fira-code:300,400,500,600,700"
        rel="stylesheet"
    />
</svelte:head>

<slot />
