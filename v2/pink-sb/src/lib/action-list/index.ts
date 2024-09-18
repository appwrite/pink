import Root from './Root.svelte';
import Anchor from './Anchor.svelte';
import Button from './Button.svelte';
import type { ComponentType } from 'svelte';

export type ItemProps = {
    title: string;
} & Partial<{
    subtitle: string;
    icon: ComponentType;
    description: string;
}>;

export default {
    Root,
    Item: {
        Anchor,
        Button
    }
};
