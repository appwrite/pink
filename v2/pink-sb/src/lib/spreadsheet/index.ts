import Root from './Root.svelte';
import Cell from './Cell.svelte';
import Row from './row/index.js';
import Header from './header/index.js';

// there's no reasoning for this,
// just md5("appwrite-pink-spreadsheet")
export const EMPTY_ROW_ID = '0x6601336413';

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
    minimumWidth?: number;
    hide?: boolean;
    fixed?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    resizedWidth?: number;
    isAction?: boolean;
};

export type RootProp = Readonly<{
    loading: boolean;
    selectedRows: string[];
    allowSelection: boolean;
    keyboardNavigation: boolean;
    selectedAll: boolean;
    selectedNone: boolean;
    selectedSome: boolean;
    columns: Record<Column['id'], Column>;
    toggle: (id: string) => void;
    toggleAll: () => void;
    addAvailableId: (id: string) => void;
    removeAvailableId: (id: string) => void;
    updateCells: (columnId: string, newWidth: number) => void;
    currentlyEditingCellId?: string | null;
    setEditing: (el: string | null) => void;
    draggingColumn?: string | null;
    dragOverColumn?: string | null;
    startDrag: (columnId?: string, event?: DragEvent) => void;
    overDrag: (columnId?: string, event?: DragEvent) => void;
    endDrag: () => void;
    clearDragOver: () => void;
    lastResizableColumnId?: string;
    lastColumnBeforeAction?: string;
    unregisterForNavigation: (row: number, col: number) => void;
    registerForNavigation: (element: HTMLElement, row: number, col: number) => void;
    moveFocus: (row: number, col: number, direction: string) => void;
}>;

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
