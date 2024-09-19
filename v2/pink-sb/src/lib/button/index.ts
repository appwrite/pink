export type ButtonProps = {
    size: 'x-small' | 'small' | 'medium';
    variant: 'primary' | 'secondary' | 'text' | 'compact' | 'ghost';
    badge: string;
    icon: boolean;
};

export { default as Anchor } from './Anchor.svelte';
export { default as Button } from './Button.svelte';
