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
