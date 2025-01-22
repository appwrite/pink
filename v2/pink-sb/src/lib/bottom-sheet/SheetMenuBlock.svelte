<script lang="ts">
    import type { SheetMenu, SubMenu } from '$lib/bottom-sheet/index.js';
    import { ActionMenu } from '$lib/index.js';

    export let menu: SubMenu;
    export let isOpen: boolean;
    export let navigateSubMenu: (menu: SheetMenu) => void;
</script>

{#if menu.title}
    <span class="menu-title">{menu.title}</span>
{/if}
<ActionMenu.Root noPadding={true}>
    {#each menu.items as menuItem}
        {#if menuItem.href}
            <ActionMenu.Item.Anchor
                size="l"
                leadingIcon={menuItem.leadingIcon}
                trailingIcon={menuItem.trailingIcon}
                href={menuItem.href}
                on:click={() => {
                    isOpen = false;
                }}
            >
                <span class="anchor">{menuItem.name}</span>
            </ActionMenu.Item.Anchor>
        {:else}
            <ActionMenu.Item.Button
                size="l"
                leadingIcon={menuItem.leadingIcon}
                trailingIcon={menuItem.trailingIcon}
                on:click={() => {
                    if (menuItem.subMenu) {
                        navigateSubMenu(menuItem.subMenu);
                    } else if (menuItem.onClick !== undefined) {
                        menuItem.onClick();
                        isOpen = false;
                    }
                }}
            >
                {menuItem.name}
            </ActionMenu.Item.Button>
        {/if}
    {/each}
</ActionMenu.Root>

<style lang="scss">
    .menu-title {
        padding: var(--space-3) var(--space-5);
        display: block;
        text-transform: uppercase;
        font-size: var(--font-size-xs, 12px);
        line-height: 130%; /* 15.6px */
        letter-spacing: 0.96px;
    }
</style>
