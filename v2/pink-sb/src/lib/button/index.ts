export type ButtonProps = {
    size: 'xs' | 's' | 'm';
    variant: 'primary' | 'secondary' | 'text' | 'compact' | 'ghost' | 'danger' | 'extra-compact';
    badge: string;
    icon: boolean;
};

export { default as Anchor } from './Anchor.svelte';
export { default as Button } from './Button.svelte';
export { default as Split } from './Split.svelte';

export const BUTTON_SPLIT_CONTEXT = Symbol('button-split-context');
