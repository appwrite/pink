import Button from '$lib/Button.svelte';

/**
 * @satisfies {import('@storybook/svelte').Meta<Button>}
 * @typedef {import('@storybook/svelte').StoryObj<typeof meta>} Story
 */
const meta = {
    title: 'Elements/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'text'],
            control: { type: 'select' }
        },
        type: {
            options: ['button', 'submit', 'reset'],
            control: { type: 'select' }
        }
    }
};

const argsBase = {
    content: 'Button',
    type: 'button'
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

export default meta;
