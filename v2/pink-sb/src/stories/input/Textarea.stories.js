import Input from '$lib/input/Textarea.svelte';
import { argsBase, argsDisabled } from './base.js';

/**
 * @satisfies {import('@storybook/svelte').Meta<Input>}
 * @typedef {import('@storybook/svelte').StoryObj<typeof meta>} Story
 */
const meta = {
    title: 'Elements/Input/Textarea',
    component: Input
};

/** @type {Story} */
export const Default = {
    args: {
        ...argsBase
    }
};

/** @type {Story} */
export const Disabled = {
    args: {
        ...argsBase,
        ...argsDisabled
    }
};

export default meta;
