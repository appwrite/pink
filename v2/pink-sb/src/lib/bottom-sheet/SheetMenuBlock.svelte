<script lang="ts">
    import type { SheetMenu, SubMenu } from '$lib/bottom-sheet/index.js';
    import { ActionMenu } from '$lib';

    export let menu: SubMenu;
    export let navigateSubMenu: (menu: SheetMenu) => void;
</script>

{#if menu.title}
    <span>{menu.title}</span>
{/if}
<ActionMenu.Root noPadding={true}>
    {#each menu.items as menuItem}
        <ActionMenu.Item.Button
            size="l"
            leadingIcon={menuItem.leadingIcon}
            trailingIcon={menuItem.trailingIcon}
            on:click={() => {
                if (menuItem.subMenu) {
                    navigateSubMenu(menuItem.subMenu);
                } else if (menuItem.onClick !== undefined) {
                    menuItem.onClick();
                }
            }}>{menuItem.name}</ActionMenu.Item.Button
        >
    {/each}
</ActionMenu.Root>

<style>
    span {
        padding: var(--space-3) var(--space-5);
        display: block;
        text-transform: uppercase;
        font-size: var(--font-size-xs, 12px);
        line-height: 130%; /* 15.6px */
        letter-spacing: 0.96px;
    }
</style>
