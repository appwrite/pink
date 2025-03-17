import type { RootProp } from '../index.js';
import Base from './Base.svelte';
import Button from './Button.svelte';
import Link from './Link.svelte';

export type RowBaseProps = {
    id?: string;
    root: RootProp;
};

export default {
    Base,
    Button,
    Link
};
