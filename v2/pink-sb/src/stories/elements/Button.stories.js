import Button from '$lib/Button.svelte';
import { userEvent, within, expect } from '@storybook/test';

/**
 * @satisfies {import('@storybook/svelte').Meta<Button>}
 * @typedef {import('@storybook/svelte').StoryObj<typeof meta>} Story
 */
const meta = {
    title: 'Elements/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'text'],
            control: { type: 'select' }
        },
        type: {
            options: ['button', 'submit', 'reset'],
            control: { type: 'select' }
        },
    }
};

const argsBase = {
    content: 'Button',
    type: 'button',
};

const argsPrimary = {
    ...argsBase,
    variant: 'primary'
};

const argsSecondary = {
    ...argsBase,
    variant: 'secondary'
};

const argsText = {
    ...argsBase,
    variant: 'text'
};

const argsDisabled = {
    disabled: true
};

/** @type {Story['play']} */
const playFocus = async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('highlight button', async () => {
        await userEvent.click(button);
        await expect(button).toHaveFocus();
    });
};

/** @type {Story} */
export const Primary = {
    args: {
        ...argsPrimary
    }
};

/** @type {Story} */
export const PrimaryDisabled = {
    args: {
        ...argsPrimary,
        ...argsDisabled
    }
};

/** @type {Story} */
export const PrimaryFocus = {
    play: playFocus,
    args: {
        ...argsPrimary
    }
};

/** @type {Story} */
export const Secondary = {
    args: {
        ...argsSecondary
    }
};

/** @type {Story} */
export const SecondaryDisabled = {
    args: {
        ...argsSecondary,
        ...argsDisabled
    }
};

/** @type {Story} */
export const SecondaryFocus = {
    play: playFocus,
    args: {
        ...argsSecondary
    }
};

/** @type {Story} */
export const Text = {
    args: {
        ...argsText
    }
};

/** @type {Story} */
export const TextDisabled = {
    args: {
        ...argsText,
        ...argsDisabled
    }
};

/** @type {Story} */
export const TextFocus = {
    play: playFocus,
    args: {
        ...argsText
    }
};

export default meta;
