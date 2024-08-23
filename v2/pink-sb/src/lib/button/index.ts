export type ButtonProps = {
    size: 'small' | 'medium';
    variant: 'primary' | 'secondary' | 'text' | 'compact';
    badge: string;
};

export { default as Anchor } from './Anchor.svelte';
export { default as Button } from './Button.svelte';
