<script lang="ts">
    import type { ComponentType } from 'svelte';

    export let icon: ComponentType;
    export let size: 'x-small' | 'small' | 'medium' | 'large' = 'medium';
    export let color: string = '--color-fgcolor-neutral-tertiary';
</script>

<i
    class:x-small={size === 'x-small'}
    class:small={size === 'small'}
    class:large={size === 'large'}
    style:--icon-fill={`var(${color})`}
>
    <svelte:component this={icon} />
</i>

<style lang="scss">
    i {
        --p-icon-size: var(--icon-size-m);

        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        width: var(--p-icon-size);
        height: var(--p-icon-size);
        position: relative;
        fill: var(--icon-fill);

        &.x-small {
            --p-icon-size: var(--icon-size-xs);
        }
        &.small {
            --p-icon-size: var(--icon-size-s);
        }
        &.large {
            --p-icon-size: var(--icon-size-l);
        }
    }
</style>
