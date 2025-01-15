<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    type $$Props = HTMLAnchorAttributes & { href: string };
</script>

<button type="button" role="row" on:click|preventDefault {...$$restProps}>
    <slot />
</button>

<style lang="scss">
    [role='row'] {
        display: table-row;
        width: 100%;

        &:hover {
            background: var(--color-overlay-neutral-hover);
        }

        &:last-child {
            :global([role='cell']) {
                border-bottom: 0;
            }
        }
    }
</style>
