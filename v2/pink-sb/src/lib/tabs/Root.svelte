<script lang="ts">
    export let variant: 'primary' | 'secondary' = 'primary';
</script>

<div
    role="tablist"
    class:tabs-primary={variant === 'primary'}
    class:tabs-secondary={variant === 'secondary'}
>
    <slot />
</div>

<style lang="scss">
    div {
        display: inline-flex;
        align-items: flex-start;
        border-radius: var(--border-radius-s);
        flex-wrap: wrap;

        &.tabs {
            &-primary {
                background: var(--color-bgcolor-neutral-secondary);
            }
            &-secondary {
                background: transparent;
            }
        }
    }
</style>
