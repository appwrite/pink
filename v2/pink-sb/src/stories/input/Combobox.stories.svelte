<script context="module" lang="ts">
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';
    import { Input } from '$lib/index.js';

    export const meta: MetaProps = {
        title: 'Components/Input/Combobox',
        component: Input.ComboBox,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Select option',
            value: '',
            options: [
                {
                    label: 'Option 1',
                    value: 'option1'
                },
                {
                    label: 'Option 2',
                    value: 'option2'
                },
                {
                    label: 'Option 3',
                    disabled: true,
                    value: 'option3'
                },
                ...Array.from({ length: 100 }, (_, i) => ({
                    label: `Option ${i + 4}`,
                    value: `option${i + 4}`
                }))
            ]
        },
        argTypes: {
            state: {
                options: ['default', 'success', 'warning', 'error'],
                control: { type: 'select' }
            }
        }
    };
</script>

<div class="container">
    <Story name="Default" let:args>
        <Input.ComboBox {...args} />
    </Story>
</div>

<style>
    .container {
        margin: 100px auto;
        width: 500px;
    }
</style>
