<script lang="ts">
    export let direction: 'column' | 'row' = 'column';
    export let gap: string = '1rem';
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
