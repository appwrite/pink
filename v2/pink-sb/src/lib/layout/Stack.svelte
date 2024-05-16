<script>
    /**
     * The direction of the stack.
     * @type {'column' | 'row'}
     */
    export let direction = 'column';
    /**
     * The gap between the stack items.
     * @type {'none' | 'xs' | 's' | 'm' | 'l' | 'xl'}
     */
    export let gap = 'm';
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
