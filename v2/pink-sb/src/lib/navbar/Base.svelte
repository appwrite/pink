<script context="module" lang="ts">
    export type BaseNavbarProps = HTMLHeadElement & {
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
        width: calc(100% - calc(2 * var(--space-7, 16px)));
        height: 48px;
        padding: var(--space-4, 8px) var(--space-7, 16px);
        justify-content: space-between;
        align-items: center;
        z-index: 10;

        border-bottom: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
        gap: 17px;
    }
</style>
