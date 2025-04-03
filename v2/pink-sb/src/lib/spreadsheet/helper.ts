export function createDragPreview(
    rootElement: HTMLElement,
    columnId: string,
    event: DragEvent
): HTMLElement | null {
    const cellElements: HTMLElement[] = [];

    const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
        const el = walker.currentNode as HTMLElement;
        if (el.dataset.column === columnId) {
            cellElements.push(el);
        }
    }

    if (!cellElements.length) return null;

    const referenceCell = cellElements[0];
    const colWidth = referenceCell.offsetWidth;
    const referenceStyle = getComputedStyle(referenceCell);

    const preview = document.createElement('div');
    Object.assign(preview.style, {
        position: 'absolute',
        top: '-99999px',
        left: '-99999px',
        width: `${colWidth}px`,
        boxSizing: 'border-box',
        border: 'var(--border-width-s) solid var(--border-neutral)',
        background: 'var(--bgcolor-neutral-primary)',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: '9999'
    });

    for (const cell of cellElements) {
        const clone = cell.cloneNode(true) as HTMLElement;

        const resizer = Array.from(clone.children).find((c) =>
            (c as HTMLElement).classList?.contains('column-resizer')
        );
        if (resizer) resizer.remove();

        Object.assign(clone.style, {
            width: '100%',
            boxSizing: 'border-box',
            padding: referenceStyle.padding,
            font: referenceStyle.font,
            background: referenceStyle.background,
            border: 'none',
            borderBottom: referenceStyle.borderBottom,
            minHeight: `${cell.offsetHeight}px`
        });

        preview.appendChild(clone);
    }

    document.body.appendChild(preview);
    event.dataTransfer?.setDragImage(preview, 0, 0);

    return preview;
}
