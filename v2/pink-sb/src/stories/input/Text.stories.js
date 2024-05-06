import Input from '$lib/input/Text.svelte';
import { argsBase, argsDisabled } from './base.js';

/**
 * @satisfies {import('@storybook/svelte').Meta<Input>}
 * @typedef {import('@storybook/svelte').StoryObj<typeof meta>} Story
 */
const meta = {
    title: 'Elements/Input/Text',
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
