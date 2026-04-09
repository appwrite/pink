<script lang="ts">
    import type { ComponentType } from 'svelte';

    export let icon: ComponentType;
    export let size: 'xs' | 's' | 'm' | 'l' = 'm';
    export let color: string | undefined = undefined;
</script>

<i
    class:xs={size === 'xs'}
    class:s={size === 's'}
    class:l={size === 'l'}
    style:--icon-fill={color ? `var(${color})` : undefined}
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
        fill: var(--icon-fill, current-color);
        color: var(--icon-fill, current-color);

        :global(svg) {
            width: var(--p-icon-size);
            height: var(--p-icon-size);
        }

        &.xs {
            --p-icon-size: var(--icon-size-xs);
        }
        &.s {
            --p-icon-size: var(--icon-size-s);
        }
        &.l {
            --p-icon-size: var(--icon-size-l);
        }
    }
</style>
