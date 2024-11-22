<script context="module" lang="ts">
    export type BaseNavbarProps = HTMLHeadElement & {
        logo: {
            src: string;
            alt: string;
        };
        avatar: string;
    };
</script>

<header {...$$props}>
    <slot name="left"></slot>
    <slot name="right"></slot>
</header>

<style lang="scss">
    header {
        display: flex;
        width: 100%;
        height: 48px;
        padding: var(--space-4, 8px) var(--space-7, 16px);
        justify-content: space-between;
        align-items: center;

        border-bottom: var(--border-width-s, 1px) solid var(--color-border-neutral-weak, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
        gap: 17px;
    }
</style>
