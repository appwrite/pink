import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '$lib/input/Textarea.svelte';

const meta = {
    title: 'Elements/Input/Textarea',
    component: Input
} satisfies Meta<Input>;

type Story = StoryObj<typeof meta>;

export const Textarea: Story = {
    args: {
        id: 'id',
        name: 'name',
        label: 'Label'
    }
};

export default meta;
