<script lang="ts">
    /**
     * The direction of the stack.
     */
    export let direction: 'column' | 'row' = 'column';
    /**
     * The gap between the stack items.
     */
    export let gap: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
</script>

<div style:--p-stack-direction={direction} style:--p-stack-gap={`var(--gap-${gap})`}>
    <slot />
</div>

<style lang="scss">
    div {
        width: 100%;
        display: flex;
        flex-direction: var(--p-stack-direction);
        gap: var(--p-stack-gap);
    }
</style>
