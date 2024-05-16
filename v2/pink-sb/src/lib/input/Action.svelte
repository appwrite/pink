<script>
    /** @type {typeof import('svelte').SvelteComponent} */
    export let icon;
</script>

<button type="button" on:click><svelte:component this={icon} /></button>

<style lang="scss">
    button {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        :global(path) {
            fill: currentColor;
        }
    }
</style>
