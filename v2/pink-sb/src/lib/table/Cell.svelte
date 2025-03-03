<script lang="ts">
    export let width: string | undefined = undefined;
</script>

<div role="cell" style:--cell-width={width}>
    <slot />
</div>

<style lang="scss">
    [role='cell'] {
        --p-cell-width: var(--cell-width);
        display: table-cell;
        vertical-align: middle;
        padding-inline: var(--space-6);
        height: 40px;
        border-bottom: var(--border-width-s) solid var(--border-neutral);
        width: var(--p-cell-width);
        white-space: nowrap;
    }
</style>
