<script>
    /** @type {typeof import('svelte').SvelteComponent} */
    export let icon;
</script>

<i><svelte:component this={icon} /></i>

<style lang="scss">
    i {
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;

        :global(path) {
            fill: currentColor;
        }
    }
</style>
