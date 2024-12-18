<div role="tablist">
    <slot />
</div>

<style lang="scss">
    div {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--space-6);
        border-radius: var(--border-radius-s);
        background: var(--color-bgcolor-neutral-secondary);
        flex-wrap: wrap;
    }
</style>
