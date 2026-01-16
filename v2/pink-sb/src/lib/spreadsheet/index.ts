import Root from './Root.svelte';
import Cell from './Cell.svelte';
import Row from './row/index.js';
import Header from './header/index.js';
import type { TableAlignment, TableColumn } from '../table/index.ts';

export { SparsePagedData, createSparsePagedDataStore } from './page/SparsePagedData.js';

// there's no reasoning for this,
// just md5("appwrite-pink-spreadsheet")
export const EMPTY_ROW_ID = '0x6601336413';

export const ESTIMATED_ROW_HEIGHT = 40;

export type SpreadsheetColumn = TableColumn & {
    minimumWidth?: number;
    fixed?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    resizedWidth?: number;
    isAction?: boolean;
};

export type SpreadsheetRootProps = Readonly<{
    loading: boolean;
    selectedRows: string[];
    allowSelection: boolean;
    keyboardNavigation: boolean;
    selectedAll: boolean;
    selectedNone: boolean;
    selectedSome: boolean;
    columns: Record<SpreadsheetColumn['id'], SpreadsheetColumn>;
    columnIndexById: Record<SpreadsheetColumn['id'], number>;
    columnArrayIndexById: Record<SpreadsheetColumn['id'], number>;
    selectionColumnIndex?: number;
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
    currentlyHoveredColumnHeader: string;
    setColumnHeaderHovered: (col: string | null | undefined) => void;
    expandKbdShortcut?: string | undefined;
    currentFocusedRow: { rowId: string; rowIndex: number } | null;
    setFocusedRow: (rowId: string | null, rowIndex: number | null) => void;
    registerRowElement?: (rowIndex: number, element: HTMLElement) => void;
    unregisterRowElement?: (element: HTMLElement) => void;
    useColumnVirtualizer?: boolean;
    useVirtualizer?: boolean;
    useAbsoluteCells?: boolean;
    columnVirtualMetricsById?: Record<SpreadsheetColumn['id'], { start: number; size: number }>;
}>;

export type SpreadsheetAlignment = TableAlignment;

export default {
    Root,
    Cell,
    Row,
    Header
};
