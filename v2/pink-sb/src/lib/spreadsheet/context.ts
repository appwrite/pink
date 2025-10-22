import { getContext, hasContext, setContext } from 'svelte';

type RowContext = {
    id?: string;
    index?: number;
}

const ROW_CONTEXT_KEY = Symbol("row");

export function setRowContext(rowInfo: RowContext) {
    setContext(ROW_CONTEXT_KEY, rowInfo);
}

export function getRowContext(): RowContext | null {
    return hasContext(ROW_CONTEXT_KEY) ? getContext(ROW_CONTEXT_KEY) : null;
}