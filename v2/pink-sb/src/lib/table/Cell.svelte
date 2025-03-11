<script lang="ts">
    export let width: string | undefined = undefined;
    export let alignment: 'middle' | 'start' | 'end' = 'middle';
</script>

<div
    role="cell"
    style:--cell-width={width}
    class:vertical-start={alignment === 'start'}
    class:vertical-end={alignment === 'end'}
>
    <slot />
</div>

<style lang="scss">
    [role='cell'] {
        --p-cell-width: var(--cell-width);
        --p-cell-alignment: var(--cell-alignment);
        display: table-cell;
        vertical-align: middle;
        padding-inline: var(--space-6);
        height: 40px;
        border-bottom: var(--border-width-s) solid var(--border-neutral);
        width: var(--p-cell-width);
        white-space: nowrap;

        &.vertical-start {
            vertical-align: top;
        }

        &.vertical-end {
            vertical-align: bottom;
        }
    }
</style>
