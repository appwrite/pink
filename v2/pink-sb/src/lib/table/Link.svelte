<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    type $$Props = HTMLAnchorAttributes & { href: string };

    export let href: $$Props['href'];
</script>

<a role="row" {href} {...$$restProps}>
    <slot />
</a>

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
