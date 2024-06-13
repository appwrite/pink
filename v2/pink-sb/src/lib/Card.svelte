<script>
    /** @type {'primary'|'secondary'} type */
    export let type = 'primary';
    /** @type {'small'|'medium'|'large'} radius */
    export let radius = 'medium';
    /** @type {'small'|'medium'|'large'} padding */
    export let padding = 'medium';
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
