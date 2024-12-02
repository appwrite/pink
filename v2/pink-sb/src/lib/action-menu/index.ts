import Root from './Root.svelte';
import Anchor from './Anchor.svelte';
import Button from './Button.svelte';
import type { ComponentType } from 'svelte';

export type ItemProps = {
    disabled?: boolean;
    status?: 'default' | 'danger';
    badge?: string;
    leadingIcon?: ComponentType;
    trailingIcon?: ComponentType;
};

export default {
    Root,
    Item: {
        Anchor,
        Button
    }
};
