<script lang="ts">
    import type { ComponentType } from 'svelte';

    export let icon: ComponentType;
</script>

<button type="button" on:click><i><svelte:component this={icon} /></i></button>

<style lang="scss">
    button {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-xs);

        i {
            width: var(--icon-size-m);
            height: var(--icon-size-m);
        }
        &:hover {
            background: var(--color-overlay-secondary-hover);
        }
        &:active {
            background: var(--color-overlay-secondary-pressed);
        }
    }
</style>
