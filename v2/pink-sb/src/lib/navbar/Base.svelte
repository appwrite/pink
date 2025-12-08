<script context="module" lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    export type BaseNavbarProps = HTMLAttributes<HTMLHeadElement> & {
        logo: {
            src: string;
            alt: string;
        };
        avatar: string;
        sideBarIsOpen: boolean;
    };
</script>

<header {...$$props}>
    <slot name="left"></slot>
    <slot name="right"></slot>
</header>

<style lang="scss">
    header {
        position: fixed;
        top: 0;
        display: flex;
        height: 48px;
        padding: var(--space-4) var(--space-6);
        justify-content: space-between;
        align-items: center;
        z-index: 10;
        width: 100%;

        border-bottom: var(--border-width-s, 1px) solid var(--border-neutral, #ededf0);
        background: var(--bgcolor-neutral-primary, #fff);
        gap: var(--gap-l, 16px);
    }
</style>
