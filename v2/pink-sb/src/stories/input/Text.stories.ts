import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '$lib/input/Text.svelte';

const meta = {
    title: 'Elements/Input/Text',
    component: Input
} satisfies Meta<Input>;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
    args: {
        id: 'id',
        name: 'name',
        label: 'Label'
    }
};

export default meta;
