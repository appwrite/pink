<script lang="ts">
</script>

<div role="cell">
    <slot />
</div>

<style>
    [role='cell'] {
        display: table-cell;
        padding-inline: var(--space-6);
        padding-block: var(--space-4);
        border-bottom: var(--border-width-s) solid var(--color-border-neutral);
    }
</style>
