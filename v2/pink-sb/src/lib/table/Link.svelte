<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    type $$Props = HTMLAnchorAttributes & { href: string };

    export let href: $$Props['href'];
</script>

<a role="row" {href} {...$$restProps}>
    <slot />
</a>

<style lang="scss">
    a {
        display: table-row;
        width: 100%;
    }
</style>
