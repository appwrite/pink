import Root from './root/Root.svelte';
import Row from './row/Row.svelte';
import Cell from './cell/Cell.svelte';
import SummaryRow from '../table/row/Base.svelte';
import SummaryCell from '../table/cell/Base.svelte';

export type Align = 'left' | 'center' | 'right';

export type Column = {
    id: string;
    align?: Align;
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

export type RootProp = {
    // Open state controls
    single: boolean;
    openIds: string[];
    isOpen: (id: string) => boolean;
    open: (id: string) => void;
    close: (id: string) => void;
    toggle: (id: string) => void;
    register: (id: string) => void;
    unregister: (id: string) => void;
    isFirstColumn: (id: string) => boolean;
    getColumn: (id: string) => Column | undefined;

    columns: Array<Column>;
    columnsCount: number;
};

export default {
    Root,
    Row,
    Cell,
    Summary: {
        Row: SummaryRow,
        Cell: SummaryCell
    }
};
