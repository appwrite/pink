<script lang="ts">
    /**
     * The gap between the stack items.
     * none: 0 | xxxs: 2px | xxs: 4px | xs: 6px | s: 8px | m: 12px | l: 16px | xl: 20px | xxl: 32px | xxxl: 40px
     */
    export let gap: 'none' | 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'm';

    export let itemSize: string = '210px';
    export let mobileItemSize: string = '150px';
</script>

<div
    class="grid-box"
    style:--p-grid-gap={`var(--gap-${gap})`}
    style:--p-grid-item-size={itemSize}
    style:--p-grid-item-size-mobile={mobileItemSize}
>
    <slot />
</div>

<style>
    .grid-box {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--p-grid-item-size), 1fr));
        grid-auto-rows: 1fr;
        gap: var(--p-grid-gap);
        flex-shrink: 0;

        @media (max-width: 1024px) {
            --p-grid-item-size: var(--p-grid-item-size-mobile);
        }
    }
</style>
