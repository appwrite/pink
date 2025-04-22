<script lang="ts">
    import type { Alignment, RootProp } from './index.js';

    export let column: string | undefined = undefined;
    export let root: RootProp;
    export let alignment: Alignment = 'middle-middle';

    $: options = column !== undefined && root.columns?.[column];
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
        style:--cell-height={root.cellHeight}
    >
        <slot />
    </div>
{/if}

<style lang="scss">
    [role='cell'] {
        --p-cell-height: var(--cell-height);

        display: flex;
        align-items: center;
        padding-inline: var(--space-6);
        height: var(--p-cell-height);
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
