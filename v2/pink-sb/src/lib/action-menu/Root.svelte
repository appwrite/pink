<script lang="ts">
    export let width: string | undefined = undefined;
    export let maxWidth: string | undefined = undefined;
    export let noPadding: undefined | boolean = false;
</script>

<div
    style:--action-menu-root-width={width ? width : '224px'}
    style:--action-menu-root-padding={noPadding ? 0 : 'var(--space-2)'}
    style:--action-menu-root-max-width={maxWidth ? maxWidth : '320px'}
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
        max-width: var(--action-menu-root-max-width);
    }
</style>
