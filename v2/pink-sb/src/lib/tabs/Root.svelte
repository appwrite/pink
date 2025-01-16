<script lang="ts">
    export let variant: 'primary' | 'secondary' = 'primary';
</script>

<div role="tablist" class:primary={variant === 'primary'} class:secondary={variant === 'secondary'}>
    <slot />
</div>

<style lang="scss">
    div {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--space-6);
        border-radius: var(--border-radius-s);
        flex-wrap: wrap;

        &.primary {
            background: var(--color-bgcolor-neutral-secondary);
        }
    }
</style>
