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
    hide?: boolean;
    fixed?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    resizedWidth?: number;
    isAction?: boolean;
};

export type RootProp = Readonly<{
    loading: boolean;
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
    registerCell: (id: string, el: HTMLElement) => void;
    unregisterCell: (id: string) => void;
    moveFocus: (currentId: string, direction: string) => void;
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
