import { writable } from 'svelte/store';

export class SparsePagedData<T> {
    private _data: T[] = [];

    private _loadedPages: number[] = [];
    private _pageData = new Map<number, T[]>();
    private _pageBaseIndex = new Map<number, number>();
    private _sortedLoadedPageCache: number[] | null = null;
    private _completePages = new Set<number>();

    private _maxPage = 0;
    private _loadedItemCount = 0;
    private readonly _itemsPerPage: number;
    private _totalKnownItems: number | null = null;

    constructor(itemsPerPage: number = 30) {
        this._itemsPerPage = itemsPerPage;
    }

    push(...items: T[]): number {
        if (items.length === 0) return this._data.length;

        const nextPage = this._maxPage + 1;
        this.setPage(nextPage, items);
        return this._data.length;
    }

    setPage(pageNum: number, items: T[]): void {
        if (pageNum < 1) throw new Error('Page number must be >= 1');

        const existingItems = this._pageData.get(pageNum);
        if (existingItems) {
            this.removePage(pageNum);
        }

        this._pageData.set(pageNum, items);

        if (items.length < this._itemsPerPage) {
            this._completePages.add(pageNum);
            this._totalKnownItems = (pageNum - 1) * this._itemsPerPage + items.length;
        }

        if (!this._loadedPages.includes(pageNum)) {
            this._loadedPages.push(pageNum);

            // clean cache.
            this._sortedLoadedPageCache = null;
        }

        if (pageNum > this._maxPage) {
            this._maxPage = pageNum;
        }

        this._insertPageData(pageNum, items);
    }

    setMaxPage(pageNum: number): void {
        if (pageNum < 1) throw new Error('Page number must be >= 1');
        this._maxPage = Math.max(this._maxPage, pageNum);
    }

    getItemAtVirtualIndex(virtualIndex: number): T | null {
        if (virtualIndex < 0) return null;

        const pageNum = Math.floor(virtualIndex / this._itemsPerPage) + 1;
        const offset = virtualIndex % this._itemsPerPage;

        if (!this._pageData.has(pageNum)) {
            return null;
        }

        const baseIndex = this._pageBaseIndex.get(pageNum);
        if (baseIndex === undefined) return null;

        const actualIndex = baseIndex + offset;
        return this._data[actualIndex] || null;
    }

    hasPage(pageNum: number): boolean {
        return this._pageData.has(pageNum);
    }

    hasItemAtVirtualIndex(virtualIndex: number): boolean {
        if (virtualIndex < 0) return false;

        const pageNum = Math.floor(virtualIndex / this._itemsPerPage) + 1;
        const offset = virtualIndex % this._itemsPerPage;

        if (!this._pageData.has(pageNum)) {
            return false;
        }

        const pageItems = this._pageData.get(pageNum)!;
        return offset < pageItems.length;
    }

    get loadedPages(): number[] {
        if (this._sortedLoadedPageCache === null) {
            this._sortedLoadedPageCache = [...this._loadedPages].sort((a, b) => a - b);
        }
        return this._sortedLoadedPageCache;
    }

    get loadedItemCount(): number {
        return this._loadedItemCount;
    }

    get virtualLength(): number {
        if (this._totalKnownItems !== null) {
            return this._totalKnownItems;
        }

        if (this._completePages.size > 0) {
            const maxCompletePage = Math.max(...this._completePages);
            const completePageItems = this._pageData.get(maxCompletePage)?.length || 0;
            return (maxCompletePage - 1) * this._itemsPerPage + completePageItems;
        }

        return this._maxPage * this._itemsPerPage;
    }

    get length(): number {
        return this._data.length;
    }

    get items(): T[] {
        return this._data;
    }

    getPage(pageNum: number): T[] | undefined {
        return this._pageData.get(pageNum);
    }

    clear(): void {
        this._maxPage = 0;
        this._data.length = 0;
        this._loadedItemCount = 0;
        this._loadedPages.length = 0;
        this._totalKnownItems = null;

        this._pageData.clear();
        this._pageBaseIndex.clear();
        this._completePages.clear();
        this._sortedLoadedPageCache = null;
    }

    removePage(pageNum: number): void {
        if (!this._pageData.has(pageNum)) return;

        const baseIndex = this._pageBaseIndex.get(pageNum);
        if (baseIndex !== undefined) {
            const items = this._pageData.get(pageNum)!;

            this._data.splice(baseIndex, items.length);
            this._loadedItemCount -= items.length;

            this._updateBaseIndicesAfter(pageNum, -items.length);
        }

        this._pageData.delete(pageNum);
        this._pageBaseIndex.delete(pageNum);
        this._completePages.delete(pageNum);

        if (this._totalKnownItems !== null) {
            this._totalKnownItems = null;
        }

        const index = this._loadedPages.indexOf(pageNum);
        if (index > -1) {
            this._loadedPages.splice(index, 1);
            this._sortedLoadedPageCache = null; // Invalidate
        }
    }

    private _insertPageData(pageNum: number, items: T[]): void {
        const sortedPages = this.loadedPages;

        let insertPos = 0;
        let low = 0;
        let high = sortedPages.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (sortedPages[mid] < pageNum) {
                low = mid + 1;
                insertPos = low;
            } else {
                high = mid - 1;
            }
        }

        let baseIndex = 0;
        if (insertPos > 0) {
            const prevPage = sortedPages[insertPos - 1];
            const prevBase = this._pageBaseIndex.get(prevPage)!;
            const prevItems = this._pageData.get(prevPage)!.length;
            baseIndex = prevBase + prevItems;
        }

        this._data.splice(baseIndex, 0, ...items);
        this._loadedItemCount += items.length;

        this._pageBaseIndex.set(pageNum, baseIndex);

        this._updateBaseIndicesAfter(pageNum, items.length);
    }

    private _updateBaseIndicesAfter(pageNum: number, delta: number): void {
        const sortedPages = this.loadedPages;
        const startIdx = sortedPages.indexOf(pageNum) + 1;
        for (let i = startIdx; i < sortedPages.length; i++) {
            const p = sortedPages[i];
            const oldBase = this._pageBaseIndex.get(p)!;
            this._pageBaseIndex.set(p, oldBase + delta);
        }
    }
}

export function createSparsePagedDataStore<T>(itemsPerPage: number = 30) {
    const data = new SparsePagedData<T>(itemsPerPage);
    const { subscribe, update } = writable(data);

    return {
        subscribe,

        setPage: (pageNum: number, items: T[]) =>
            update((d) => {
                d.setPage(pageNum, items);
                return d;
            }),

        setMaxPage: (pageNum: number) =>
            update((d) => {
                d.setMaxPage(pageNum);
                return d;
            }),

        push: (...items: T[]) =>
            update((d) => {
                d.push(...items);
                return d;
            }),

        removePage: (pageNum: number) =>
            update((d) => {
                d.removePage(pageNum);
                return d;
            }),

        clear: () =>
            update((d) => {
                d.clear();
                return d;
            }),

        update: (index: number, value: T) =>
            update((d) => {
                d.items[index] = value;
                return d;
            }),

        hasPage: (pageNum: number) => data.hasPage(pageNum),
        getPage: (pageNum: number) => data.getPage(pageNum),
        getItemAtVirtualIndex: (virtualIndex: number) => data.getItemAtVirtualIndex(virtualIndex),
        hasItemAtVirtualIndex: (virtualIndex: number) => data.hasItemAtVirtualIndex(virtualIndex),
        get items() {
            return data.items;
        }
    };
}
