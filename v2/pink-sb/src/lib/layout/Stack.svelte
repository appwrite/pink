<script>
    /**
     * The direction of the stack.
     * @type {'column' | 'row'}
     */
    export let direction = 'column';
    /**
     * The gap between the stack items.
     * @type {string}
     */
    export let gap = '1rem';
</script>

<div style:--p-stack-direction={direction} style:--p-stack-gap={gap}>
    <slot />
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: var(--p-stack-direction);
        gap: var(--p-stack-gap);
    }
</style>
