<script lang="ts">
    /**
     * The direction of the stack.
     */
    export let direction: 'column' | 'row' = 'column';
    /**
     * The gap between the stack items.
     */
    export let gap: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
    /**
     * The wrap behavior of the stack.
     */
    export let wrap: 'normal' | 'wrap' | 'nowrap' = 'normal';
    /**
     * The alignment of the stack content.
     */
    export let alignContent:
        | 'normal'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch' = 'normal';
    /**
     * The alignment of the stack items.
     */
    export let alignItems:
        | 'normal'
        | 'stretch'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'baseline' = 'normal';
    export let justifyContent:
        | 'normal'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch' = 'normal';
</script>

<div
    style:--p-stack-direction={direction}
    style:--p-stack-gap={`var(--gap-${gap})`}
    style:--p-stack-wrap={wrap}
    style:--p-stack-align-content={alignContent}
    style:--p-stack-align-items={alignItems}
    style:--p-stack-justify-content={justifyContent}
>
    <slot />
</div>

<style lang="scss">
    div {
        width: 100%;
        display: flex;
        flex-direction: var(--p-stack-direction);
        flex-wrap: var(--p-stack-wrap);
        align-content: var(--p-stack-align-content);
        align-items: var(--p-stack-align-items);
        justify-content: var(--p-stack-justify-content);
        gap: var(--p-stack-gap);
    }
</style>
