<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import type { ComponentType } from 'svelte';

    export let icon: ComponentType;
</script>

<button type="button" on:click><Icon {icon} /></button>

<style lang="scss">
    button {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-xs);

        &:hover {
            background: var(--color-overlay-neutral-hover);
        }
        &:active {
            background: var(--color-overlay-secondary-pressed);
        }
    }
</style>
