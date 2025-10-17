import type { VirtualItem } from '@tanstack/svelte-virtual';
import type { RootProp } from '../index.js';
import Base from './Base.svelte';

export type RowBaseProps = {
    id?: string;
    root: RootProp;
    virtualItem?: VirtualItem;
    index?: number;
    select?: true | 'disabled' | 'hidden';
    showSelectOnHover?: boolean;
    valueWithoutHover?: string | number | boolean;
    hoverEffect?: boolean;
    isSelected?: boolean;
};

export default {
    Base
};
