<script lang="ts">
    export let width: string | undefined = undefined;
</script>

<div role="cell" style:--cell-width={width}>
    <span>
        <slot />
    </span>
</div>

<style lang="scss">
    [role='cell'] {
        --p-cell-width: var(--cell-width);
        display: table-cell;
        vertical-align: middle;
        padding-inline: var(--space-6);
        padding-block: var(--space-4);
        border-bottom: var(--border-width-s) solid var(--color-border-neutral);
        width: var(--p-cell-width);
        min-width: 100%;
        white-space: nowrap;

        > span {
            display: flex;
        }
    }
</style>
