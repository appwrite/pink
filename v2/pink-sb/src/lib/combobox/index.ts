import type { HTMLInputAttributes } from 'svelte/elements';

export type ComboboxOption = { key: string; value: string };
export type ComboboxProps = HTMLInputAttributes & {
    label: string;
    options: Array<ComboboxOption>;
};

export { default as Combobox } from './Combobox.svelte';
