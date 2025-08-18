import Root from './root/Root.svelte';
import Row from './row/Row.svelte';
import Cell from './cell/Cell.svelte';

export type RootProp = {
    single: boolean;
    openIds: string[];
    isOpen: (id: string) => boolean;
    open: (id: string) => void;
    close: (id: string) => void;
    toggle: (id: string) => void;
    register: (id: string) => void;
    unregister: (id: string) => void;
};

export default {
    Root,
    Row,
    Cell
};
