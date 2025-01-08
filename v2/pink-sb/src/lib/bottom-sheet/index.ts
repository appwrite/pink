import Default from './Default.svelte';
import Menu from './SheetMenu.svelte';
import type { ComponentType } from 'svelte';

export type SubMenu = {
    title?: string;
    items: MenuItem[];
};

type MenuItem = {
    name: string;
    leadingIcon?: ComponentType;
    trailingIcon?: ComponentType;
    onClick?: () => void;
    subMenu?: { top: SubMenu; bottom: SubMenu };
};

export type SheetMenu = { top: SubMenu; bottom: SubMenu };

export default { Default, Menu };
