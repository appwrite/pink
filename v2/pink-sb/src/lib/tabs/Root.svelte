<script lang="ts">
    import { setContext } from 'svelte';
    import type { Variant } from './types.js';

    export let variant: Variant = 'primary';
    export let stretch: boolean = false;
    setContext('tabs-variant', variant);
    setContext('tabs-stretch', stretch);
</script>

<div
    role="tablist"
    class:tabs-primary={variant === 'primary'}
    class:tabs-secondary={variant === 'secondary'}
    class:tabs-stretch={stretch}
>
    <slot />
</div>

<style lang="scss">
    div {
        display: inline-flex;
        align-items: flex-start;
        border-radius: var(--border-radius-s);
        flex-wrap: nowrap;
        width: 100%;
        max-width: fit-content;
        overflow: scroll;

        &.tabs {
            &-primary {
                background: var(--color-bgcolor-neutral-secondary);
            }
            &-secondary {
                background: transparent;
            }
            &-stretch {
                width: 100%;
                justify-content: space-between;
            }
        }
    }
</style>
