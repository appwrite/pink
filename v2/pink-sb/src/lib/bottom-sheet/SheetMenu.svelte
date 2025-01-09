<script lang="ts">
    import BottomSheet, { type SheetMenu } from '$lib/bottom-sheet/index.js';
    import SheetMenuBlock from '$lib/bottom-sheet/SheetMenuBlock.svelte';

    export let menu: SheetMenu;
    export let isOpen = false;
    let sheetContainerRef: HTMLDivElement;
    let activeMenu = menu;

    function navigateSubMenu(subMenu: SheetMenu) {
        if (sheetContainerRef) {
            const currentHeight = sheetContainerRef.offsetHeight;
            sheetContainerRef.style.overflowY = 'hidden';
            sheetContainerRef.style.maxHeight = `${currentHeight}px`;
            activeMenu = subMenu;
            requestAnimationFrame(() => {
                const newHeight = sheetContainerRef.scrollHeight;
                sheetContainerRef.style.maxHeight = `${newHeight}px`;
            });
        } else {
            activeMenu = subMenu;
        }
    }

    function restoreMenu(isOpenState: boolean) {
        if (!isOpenState) {
            setTimeout(() => {
                activeMenu = menu;
            }, 400);
        }
    }

    $: restoreMenu(isOpen);
</script>

<BottomSheet.Default bind:isOpen useSlots={true} bind:sheetContainerRef>
    <div slot="top"><SheetMenuBlock menu={activeMenu.top} {navigateSubMenu} /></div>
    <div slot="bottom"><SheetMenuBlock menu={activeMenu.bottom} {navigateSubMenu} /></div>
</BottomSheet.Default>
