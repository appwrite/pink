export type Variant = 'primary' | 'secondary';

export type RootContext = {
    variant: Variant;
    stretch: boolean;
    updateTabWidths: (width: number) => void;
    registerTabNode: (node: HTMLElement) => { destroy: () => void };
    hasOverflow: boolean;
    overflowedItems: { text: string; disabled: boolean; active: boolean }[];
};
