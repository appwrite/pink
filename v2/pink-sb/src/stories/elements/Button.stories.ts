import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '$lib/Button.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Elements/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'text'],
            control: { type: 'select' }
        }
    }
} satisfies Meta<Button>;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        content: 'Button',
        variant: 'primary'
    }
};

export const Secondary: Story = {
    args: {
        content: 'Button',
        variant: 'secondary'
    }
};

export const Text: Story = {
    args: {
        content: 'Button',
        variant: 'text'
    }
};

export default meta;
