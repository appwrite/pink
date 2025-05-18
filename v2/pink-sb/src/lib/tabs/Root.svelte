<script lang="ts">
    import type { Variant } from './types.js';

    export let variant: Variant = 'primary';
    export let stretch: boolean = false;
</script>

<div
    role="tablist"
    class:tabs-primary={variant === 'primary'}
    class:tabs-secondary={variant === 'secondary'}
    class:tabs-stretch={stretch}
>
    <slot root={{ variant, stretch }} />
</div>

<style lang="scss">
    div {
        display: inline-flex;
        align-items: flex-start;
        flex-wrap: nowrap;
        width: 100%;
        max-width: fit-content;
        overflow-x: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        &.tabs {
            &-primary {
                background: var(--bgcolor-neutral-secondary);
                border-radius: var(--border-radius-s);
            }
            &-secondary {
                background: transparent;
            }
            &-stretch {
                width: 100%;
                justify-content: space-between;
                max-width: none;
            }
        }
    }
</style>
