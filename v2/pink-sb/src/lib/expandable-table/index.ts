import Root from './root/Root.svelte';
import Row from './row/Row.svelte';
import Cell from './cell/Cell.svelte';

export type ExpandableTableColumn = {
    id: string;
    title?: string;
    width?: string; // e.g. '2fr'
    align?: 'left' | 'center' | 'right';
};

export type RootProp = {
    single: boolean;
    openIds: string[];
    isOpen: (id: string) => boolean;
    open: (id: string) => void;
    close: (id: string) => void;
    toggle: (id: string) => void;
    register: (id: string) => void;
    unregister: (id: string) => void;
    columns: ExpandableTableColumn[];
    gridTemplateColumns: string;
    childGridTemplate: string;
    alignment: (align?: 'left' | 'center' | 'right') => string;
};

export default {
    Root,
    Row,
    Cell
};
