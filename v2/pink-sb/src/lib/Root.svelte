<script>
    import 'the-new-css-reset/css/reset.css';
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<slot />

<style>
    :root {
        --border-radius-xxs: 0.25rem;
        --border-radius-s: 0.5rem;
        --border-width-s: 1px;
        --border-width-xl: 3px;
        --color-bg-accent: hsl(343 98 60);
        --color-bg-accent-secondary: hsl(343 65 48);
        --color-bg-accent-tertiary: hsl(343 65 36);
        --color-bg-neutral: hsl(240 16 96);
        --color-bg-neutral-primary: hsla(0 0 100);
        --color-bg-neutral-secondary: hsl(240 16 96);
        --color-bg-neutral-tertiary: hsla(240 9 94);
        --color-border-neutral: hsl(240 9 94);
        --color-border-neutral-weak: hsl(240 4 85);
        --color-border-focus: hsl(179 24 41);
        --color-fg-on-accent: hsl(0 0 100);
        --color-fg-neutral-secondary: hsl(240 3 35);
        --font-family-sans: 'Inter', sans-serif;
        --font-size-s: 14px;
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
        --space-5: 20px;
        --space-6: 24px;
    }
</style>
