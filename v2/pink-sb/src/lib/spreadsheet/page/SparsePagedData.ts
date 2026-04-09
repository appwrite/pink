import { writable } from 'svelte/store';

export class SparsePagedData<T> {
    private _pageData = new Map<number, T[]>();
    private _completePages = new Set<number>();

    private _pageAccessOrder = new Map<number, { prev: number | null; next: number | null }>();
    private _lruHead: number | null = null;
    private _lruTail: number | null = null;
    private readonly _maxCachePageLimit: number;

    private _loadedPagesSet = new Set<number>();

    private _maxPage = 0;
    private readonly _itemsPerPage: number;
    private _totalKnownItems: number | null = null;

    private _cacheHits = 0;
    private _cacheMisses = 0;
    private readonly _maxItemCacheSize = 1000;
    private _itemCache = new Map<number, T | null>();

    constructor(itemsPerPage: number = 30, maxCachePageLimit: number = 10) {
        this._itemsPerPage = itemsPerPage;
        this._maxCachePageLimit = maxCachePageLimit;
    }

    get itemsPerPage(): number {
        return this._itemsPerPage;
    }

    push(...items: T[]): number {
        if (items.length === 0) return this.virtualLength;

        const nextPage = this._maxPage + 1;
        this.setPage(nextPage, items);
        return this.virtualLength;
    }

    setPage(pageNum: number, items: T[]): void {
        if (pageNum < 1) throw new Error('Page number must be >= 1');

        const isNewPage = !this._pageData.has(pageNum);

        if (isNewPage && this._pageData.size >= this._maxCachePageLimit) {
            this._evictLeastRecentlyUsedPage();
        }

        this._pageData.set(pageNum, [...items]);

        if (items.length < this._itemsPerPage) {
            this._completePages.add(pageNum);

            const maxCompletePage = Math.max(...this._completePages);
            if (pageNum === maxCompletePage) {
                this._totalKnownItems = (pageNum - 1) * this._itemsPerPage + items.length;
            }
        } else if (this._completePages.has(pageNum)) {
            this._completePages.delete(pageNum);
            this._totalKnownItems = null;
        }

        if (this._totalKnownItems !== null && this._completePages.size > 0) {
            const maxCompletePage = Math.max(...this._completePages);
            if (pageNum > maxCompletePage) {
                this._totalKnownItems = null;
            }
        }

        if (pageNum > this._maxPage) {
            this._maxPage = pageNum;
        }

        if (isNewPage) {
            this._loadedPagesSet.add(pageNum);
        }

        this._updateLRU(pageNum);

        this._invalidateItemCacheForPage(pageNum);
    }

    setMaxPage(pageNum: number): void {
        if (pageNum < 1) throw new Error('Page number must be >= 1');
        if (pageNum > this._maxPage) {
            this._maxPage = pageNum;
            if (this._totalKnownItems !== null) {
                this._totalKnownItems = null;
            }
        }
    }

    getItemAtVirtualIndex(virtualIndex: number): T | null {
        if (virtualIndex < 0) return null;

        // try cache first
        if (this._itemCache.has(virtualIndex)) {
            this._cacheHits++;
            return this._itemCache.get(virtualIndex)!;
        }

        this._cacheMisses++;

        const pageNum = Math.floor(virtualIndex / this._itemsPerPage) + 1;
        const offset = virtualIndex % this._itemsPerPage;

        // check if page exists
        if (!this._pageData.has(pageNum)) {
            this._cacheItem(virtualIndex, null);
            return null;
        }

        const pageItems = this._pageData.get(pageNum)!;
        const item = offset < pageItems.length ? pageItems[offset] : null;

        this._cacheItem(virtualIndex, item);

        return item;
    }

    getVirtualRange(startIndex: number, count: number): (T | null)[] {
        if (startIndex < 0 || count < 0) throw new Error('Invalid range parameters');
        if (count === 0) return [];

        const result: (T | null)[] = new Array(count);

        const pageGroups = new Map<number, { indices: number[]; offsets: number[] }>();

        for (let i = 0; i < count; i++) {
            const virtualIndex = startIndex + i;
            const pageNum = Math.floor(virtualIndex / this._itemsPerPage) + 1;
            const offset = virtualIndex % this._itemsPerPage;

            if (!pageGroups.has(pageNum)) {
                pageGroups.set(pageNum, { indices: [], offsets: [] });
            }
            const group = pageGroups.get(pageNum)!;
            group.indices.push(i);
            group.offsets.push(offset);
        }

        for (const [pageNum, group] of pageGroups) {
            const pageItems = this._pageData.get(pageNum);

            if (pageItems) {
                // one update per page
                this._updateLRU(pageNum);

                for (let j = 0; j < group.indices.length; j++) {
                    const resultIndex = group.indices[j];
                    const offset = group.offsets[j];
                    const virtualIndex = startIndex + resultIndex;

                    const item = offset < pageItems.length ? pageItems[offset] : null;
                    result[resultIndex] = item;

                    // cache hot items
                    if (!this._itemCache.has(virtualIndex)) {
                        this._cacheItem(virtualIndex, item);
                    }
                }
            } else {
                // page not loaded - fill with nulls
                for (const resultIndex of group.indices) {
                    result[resultIndex] = null;
                }
            }
        }

        return result;
    }

    removePage(pageNum: number): void {
        if (!this._pageData.has(pageNum)) return;

        this._pageData.delete(pageNum);
        this._completePages.delete(pageNum);
        this._loadedPagesSet.delete(pageNum);

        // If removing the max page, recalculate max
        if (pageNum === this._maxPage && this._loadedPagesSet.size > 0) {
            this._maxPage = Math.max(...this._loadedPagesSet);
        } else if (this._loadedPagesSet.size === 0) {
            this._maxPage = 0;
        }

        if (this._totalKnownItems !== null) {
            this._totalKnownItems = null;
        }

        this._removeFromLRU(pageNum);
        this._invalidateItemCacheForPage(pageNum);
    }

    hasPage(pageNum: number): boolean {
        return this._loadedPagesSet.has(pageNum);
    }

    hasItemAtVirtualIndex(virtualIndex: number): boolean {
        if (virtualIndex < 0) return false;

        const pageNum = Math.floor(virtualIndex / this._itemsPerPage) + 1;
        const offset = virtualIndex % this._itemsPerPage;

        if (!this._loadedPagesSet.has(pageNum)) {
            return false;
        }

        this._updateLRU(pageNum);

        const pageItems = this._pageData.get(pageNum)!;
        return offset < pageItems.length;
    }

    get loadedPages(): number[] {
        return Array.from(this._loadedPagesSet).sort((a, b) => a - b);
    }

    get loadedItemCount(): number {
        let count = 0;
        for (const items of this._pageData.values()) {
            count += items.length;
        }
        return count;
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
        return this.virtualLength;
    }

    get items(): T[] {
        const result: T[] = [];
        const sortedPages = this.loadedPages;

        for (const pageNum of sortedPages) {
            const pageItems = this._pageData.get(pageNum);
            if (pageItems) {
                result.push(...pageItems);
            }
        }

        return result;
    }

    getPage(pageNum: number): T[] | undefined {
        const page = this._pageData.get(pageNum);
        if (page) {
            this._updateLRU(pageNum);
            return [...page];
        }
        return undefined;
    }

    clear(): void {
        this._maxPage = 0;
        this._totalKnownItems = null;

        this._pageData.clear();
        this._completePages.clear();
        this._loadedPagesSet.clear();

        this._lruHead = null;
        this._lruTail = null;
        this._pageAccessOrder.clear();

        this._itemCache.clear();
        this._cacheHits = 0;
        this._cacheMisses = 0;
    }

    get cacheSize(): number {
        return this._pageData.size;
    }

    get maxCacheSize(): number {
        return this._maxCachePageLimit;
    }

    getCacheStats(): {
        pagesCached: number;
        maxPages: number;
        itemCacheSize: number;
        cacheHitRate: number;
        lruOrder: number[];
    } {
        const total = this._cacheHits + this._cacheMisses;

        const lruOrder: number[] = [];
        let current = this._lruHead;
        while (current !== null) {
            lruOrder.push(current);
            const node = this._pageAccessOrder.get(current);
            current = node ? node.next : null;
        }

        return {
            pagesCached: this.cacheSize,
            maxPages: this.maxCacheSize,
            itemCacheSize: this._itemCache.size,
            cacheHitRate: total > 0 ? this._cacheHits / total : 0,
            lruOrder
        };
    }

    private _cacheItem(virtualIndex: number, item: T | null): void {
        if (this._itemCache.size >= this._maxItemCacheSize) {
            const firstKey = this._itemCache.keys().next().value;
            if (firstKey !== undefined) {
                this._itemCache.delete(firstKey);
            }
        }

        this._itemCache.set(virtualIndex, item);
    }

    private _invalidateItemCacheForPage(pageNum: number): void {
        const startIndex = (pageNum - 1) * this._itemsPerPage;
        const endIndex = startIndex + this._itemsPerPage;

        for (let index = startIndex; index < endIndex; index++) {
            this._itemCache.delete(index);
        }
    }

    private _updateLRU(pageNum: number): void {
        if (this._lruHead === pageNum) {
            return;
        }

        this._removeFromLRU(pageNum);

        const node = { prev: null, next: this._lruHead };
        this._pageAccessOrder.set(pageNum, node);

        if (this._lruHead !== null) {
            const headNode = this._pageAccessOrder.get(this._lruHead)!;
            headNode.prev = pageNum;
        }

        this._lruHead = pageNum;

        if (this._lruTail === null) {
            this._lruTail = pageNum;
        }
    }

    private _removeFromLRU(pageNum: number): void {
        const node = this._pageAccessOrder.get(pageNum);
        if (!node) return;

        if (node.prev !== null) {
            const prevNode = this._pageAccessOrder.get(node.prev)!;
            prevNode.next = node.next;
        } else {
            this._lruHead = node.next;
        }

        if (node.next !== null) {
            const nextNode = this._pageAccessOrder.get(node.next)!;
            nextNode.prev = node.prev;
        } else {
            this._lruTail = node.prev;
        }

        this._pageAccessOrder.delete(pageNum);
    }

    private _evictLeastRecentlyUsedPage(): void {
        if (this._lruTail === null) return;

        const pageToEvict = this._lruTail;
        this.removePage(pageToEvict);
    }
}

export function createSparsePagedDataStore<T>(
    itemsPerPage: number = 30,
    maxCachePageLimit: number = 10
) {
    const data = new SparsePagedData<T>(itemsPerPage, maxCachePageLimit);
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

        update: (virtualIndex: number, value: T) =>
            update((d) => {
                const pageNum = Math.floor(virtualIndex / d.itemsPerPage) + 1;
                const offset = virtualIndex % d.itemsPerPage;
                const page = d.getPage(pageNum);
                if (page && offset < page.length) {
                    page[offset] = value;
                    d.setPage(pageNum, page);
                }
                return d;
            }),

        hasPage: (pageNum: number) => data.hasPage(pageNum),
        getPage: (pageNum: number) => data.getPage(pageNum),
        getItemAtVirtualIndex: (virtualIndex: number) => data.getItemAtVirtualIndex(virtualIndex),
        hasItemAtVirtualIndex: (virtualIndex: number) => data.hasItemAtVirtualIndex(virtualIndex),
        getVirtualRange: (startIndex: number, count: number) =>
            data.getVirtualRange(startIndex, count),
        getCacheStats: () => data.getCacheStats(),

        get items() {
            console.warn('This method call is expensive - use `getVirtualRange()` instead');

            return data.items;
        },

        get loadedPages() {
            return data.loadedPages;
        },

        get virtualLength() {
            return data.virtualLength;
        },

        get cacheSize() {
            return data.cacheSize;
        }
    };
}
