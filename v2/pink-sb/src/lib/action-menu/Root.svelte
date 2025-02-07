<script lang="ts">
    export let noPadding: undefined | boolean = false;
</script>

<div style:--action-menu-root-padding={noPadding ? 0 : 'var(--space-2)'}>
    <slot />
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        padding: var(--action-menu-root-padding);
        overflow: hidden;
    }
</style>
