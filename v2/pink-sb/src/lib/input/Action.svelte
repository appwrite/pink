<script>
    /** @type {typeof import('svelte').ComponentType} */
    export let icon;
</script>

<button type="button" on:click><svelte:component this={icon} /></button>

<style lang="scss">
    button {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-xs);

        &:hover {
            background: var(--color-overlay-secondary-hover);
        }
        &:active {
            background: var(--color-overlay-secondary-pressed);
        }

        :global(path) {
            fill: currentColor;
        }
    }
</style>
