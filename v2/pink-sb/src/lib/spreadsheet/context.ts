import { getContext, hasContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export type RowContext = {
    id?: string;
    index?: number;
    hovered: boolean;
    focused: boolean;
    selected: boolean;
    isHeader: boolean;
    isEmptyRow: boolean;
};

const ROW_CONTEXT_KEY = Symbol('row');

export function setRowContext(rowInfo: RowContext) {
    const store = writable(rowInfo);
    setContext(ROW_CONTEXT_KEY, store);
    return store;
}

export function getRowContext(): Writable<RowContext> | null {
    return hasContext(ROW_CONTEXT_KEY) ? getContext(ROW_CONTEXT_KEY) : null;
}
