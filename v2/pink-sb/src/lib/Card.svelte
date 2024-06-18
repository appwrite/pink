<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    interface $$Props extends HTMLAttributes<HTMLDivElement> {
        type: 'primary' | 'secondary';
        radius: 'small' | 'medium' | 'large';
        padding: 'small' | 'medium' | 'large';
    }

    export let type: $$Props['type'] = 'primary';
    export let radius: $$Props['radius'] = 'medium';
    export let padding: $$Props['padding'] = 'medium';
</script>

<div
    class:type-primary={type === 'primary'}
    class:type-secondary={type === 'secondary'}
    class:radius-small={radius === 'small'}
    class:radius-medium={radius === 'medium'}
    class:radius-large={radius === 'large'}
    class:padding-small={padding === 'small'}
    class:padding-medium={padding === 'medium'}
    class:padding-large={padding === 'large'}
    {...$$restProps}
>
    <slot />
</div>

<style lang="scss">
    div {
        border: 1px solid var(--color-border-neutral);

        &.type- {
            &primary {
                background: var(--color-bgcolor-neutral-primary);
            }
            &secondary {
                background: var(--color-bgcolor-neutral-secondary);
            }
        }
        &.radius- {
            &small {
                border-radius: var(--border-radius-s);
            }
            &medium {
                border-radius: var(--border-radius-m);
            }
            &large {
                border-radius: var(--border-radius-l);
            }
        }
        &.padding- {
            &small {
                padding: var(--space-7);
            }
            &medium {
                padding: var(--space-9);
            }
            &large {
                padding: var(--space-10);
            }
        }
    }
</style>
