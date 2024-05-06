import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '$lib/input/Number.svelte';

const meta = {
    title: 'Elements/Input/Number',
    component: Input
} satisfies Meta<Input>;

type Story = StoryObj<typeof meta>;

export const Number: Story = {
    args: {
        id: 'id',
        name: 'name',
        label: 'Label'
    }
};

export default meta;
