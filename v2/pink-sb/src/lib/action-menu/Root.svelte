<script lang="ts">
    export let width: string | undefined = undefined;
    export let noPadding: undefined | boolean = false;
</script>

<div
    style:--action-menu-root-width={width ? width : '224px'}
    style:--action-menu-root-padding={noPadding ? 0 : 'var(--space-2)'}
>
    <slot />
</div>

<style lang="scss">
    div {
        display: flex;
        overflow: hidden;
        flex-direction: column;
        padding: var(--action-menu-root-padding);
        min-width: var(--action-menu-root-width);
    }
</style>
