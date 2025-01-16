<script lang="ts">
    import BottomSheet, { type SheetMenu } from '$lib/bottom-sheet/index.js';
    import SheetMenuBlock from '$lib/bottom-sheet/SheetMenuBlock.svelte';

    export let menu: SheetMenu;
    export let isOpen = false;
    let sheetContainerRef: HTMLDivElement;
    let activeMenu = menu;
    let showDivider = true;

    function navigateSubMenu(subMenu: SheetMenu) {
        if (sheetContainerRef) {
            const currentHeight = sheetContainerRef.offsetHeight;
            sheetContainerRef.style.overflowY = 'hidden';
            sheetContainerRef.style.maxHeight = `${currentHeight}px`;
            activeMenu = subMenu;
            requestAnimationFrame(() => {
                const newHeight = sheetContainerRef.scrollHeight;
                sheetContainerRef.style.maxHeight = `${newHeight + 5}px`;
            });
        } else {
            activeMenu = subMenu;
        }
        showDivider = activeMenu.bottom !== undefined;
    }

    function restoreMenu(isOpenState: boolean) {
        showDivider = activeMenu.bottom !== undefined;
        if (!isOpenState) {
            setTimeout(() => {
                activeMenu = menu;
            }, 400);
        }
    }

    $: restoreMenu(isOpen);
</script>

<BottomSheet.Default bind:isOpen useSlots={true} bind:sheetContainerRef bind:showDivider>
    <div slot="top"><SheetMenuBlock menu={activeMenu.top} {navigateSubMenu} bind:isOpen /></div>
    <div slot="bottom">
        {#if activeMenu.bottom}<SheetMenuBlock
                menu={activeMenu.bottom}
                {navigateSubMenu}
                bind:isOpen
            />{/if}
    </div>
</BottomSheet.Default>
