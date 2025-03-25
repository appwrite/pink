import Root from './Root.svelte';
import Cell from './Cell.svelte';
import Row from './row/index.js';
import Header from './header/index.js';
export type Column = {
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
    show?: boolean;
};

export type RootProp = {
    allowSelection: boolean;
    selectedRows: string[];
    selectedAll: boolean;
    selectedNone: boolean;
    selectedSome: boolean;
    columns: Record<Column['id'], Column>;
    toggle: (id: string) => void;
    toggleAll: () => void;
    addAvailableId: (id: string) => void;
    removeAvailableId: (id: string) => void;
};

export type Alignment =
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
    Cell,
    Row,
    Header
};
