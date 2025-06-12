<script lang="ts">
    import type { VirtualItem } from '@tanstack/svelte-virtual';
    import type { Alignment, RootProp } from '../index.js';

    export let column: string | undefined = undefined;
    export let root: RootProp;
    export let virtualItem: VirtualItem;
    export let alignment: Alignment = 'middle-middle';

    $: options = column !== undefined && root.columnsMap?.[column];
    $: isVerticalStart = alignment.startsWith('start');
    $: isVerticalEnd = alignment.startsWith('end');
    $: isHorizontalStart = alignment.endsWith('start');
    $: isHorizontalEnd = alignment.endsWith('end');
</script>

{#if !options || options?.hide !== true}
    <div
        role="cell"
        class:vertical-start={isVerticalStart}
        class:vertical-end={isVerticalEnd}
        class:horizontal-start={isHorizontalStart}
        class:horizontal-end={isHorizontalEnd}
        style:width="{virtualItem.size}px"
        style:transform="translateX({virtualItem.start}px)"
    >
        <slot />
    </div>
{/if}

<style lang="scss">
    [role='cell'] {
        --p-cell-width: var(--cell-width);
        --p-cell-max-width: var(--cell-max-width);
        --p-cell-alignment: var(--cell-alignment);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        padding-inline: var(--space-6);
        height: 40px;
        border-bottom: var(--border-width-s) solid var(--border-neutral);
        overflow: hidden;
        white-space: nowrap;

        &.horizontal-start {
            justify-content: flex-start;
        }

        &.horizontal-end {
            justify-content: flex-end;
        }

        &.vertical-start {
            align-items: flex-start;
        }

        &.vertical-end {
            align-items: flex-end;
        }
    }
</style>
