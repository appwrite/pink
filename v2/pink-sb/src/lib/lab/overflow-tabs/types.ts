export type Variant = 'primary' | 'secondary';

export type RootContext = {
    variant: Variant;
    stretch: boolean;
    updateTabWidth: (size: number, node: HTMLElement, text: string) => void;
};
