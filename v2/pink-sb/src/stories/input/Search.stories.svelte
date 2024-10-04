<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { Meta } from '@storybook/svelte';

    export const meta = {
        title: 'Components/Input/Search',
        component: Input.Search,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Placeholder',
            value: ''
        },
        argTypes: {
            state: {
                options: ['default', 'success', 'warning', 'error'],
                control: { type: 'select' }
            }
        }
    } satisfies Meta;
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Input.Search {...args} />
</Template>

<Story name="Default" />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Disabled with value" args={{ disabled: true, value: 'Lorem ipsum dolor' }} />
