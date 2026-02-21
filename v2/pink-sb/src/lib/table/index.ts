import Root from './root/Default.svelte';
import VirtualRoot from './root/Virtual.svelte';
import Cell from './cell/Base.svelte';
import VirtualCell from './cell/Virtual.svelte';
import Row from './row/index.js';
import Header from './header/index.js';

export type TableColumn = {
    id: string;
    width?:
        | {
              min: number;
              max: number;
          }
        | {
              min: number;
          }
        | number;
    hide?: boolean;
};

export type TableRootProps = Readonly<{
    allowSelection: boolean;
    selectedRows: string[];
    selectedAll: boolean;
    selectedNone: boolean;
    selectedSome: boolean;
    columns: Array<TableColumn> | number;
    columnsMap: Record<TableColumn['id'], TableColumn>;
    toggle: (id: string) => void;
    toggleAll: () => void;
    addAvailableId: (id: string) => void;
    removeAvailableId: (id: string) => void;
    enableContextMenu: boolean;
    handleCellContextMenu?: (event: CustomEvent<{ event: MouseEvent; id?: string }>) => void;
}>;

export type TableAlignment =
    | 'middle-middle'
    | 'middle-start'
    | 'middle-end'
    | 'start-middle'
    | 'start-start'
    | 'start-end'
    | 'end-middle'
    | 'end-start'
    | 'end-end';

export default {
    Root,
    VirtualRoot,
    Cell,
    VirtualCell,
    Row,
    Header
};
