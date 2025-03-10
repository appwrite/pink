<script lang="ts">
    export let width: string | undefined = undefined;
    export let alignment: 'middle' | 'start' | 'end' = 'middle';
</script>

<div role="cell" style:--cell-width={width} style:--cell-alignment={alignment}>
    <slot />
</div>

<style lang="scss">
    [role='cell'] {
        --p-cell-width: var(--cell-width);
        --p-cell-alignment: var(--cell-alignment);
        display: table-cell;
        vertical-align: var(--cell-alignment);
        padding-inline: var(--space-6);
        height: 40px;
        border-bottom: var(--border-width-s) solid var(--border-neutral);
        width: var(--p-cell-width);
        white-space: nowrap;
    }
</style>
