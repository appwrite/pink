<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { Meta } from '@storybook/svelte';

    export const meta = {
        title: 'Components/Input/DateTime',
        component: Input.DateTime,
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
    <Input.DateTime {...args} />
</Template>

<Story name="Default" />
<Story name="Time" args={{ type: 'time' }} />
<Story name="DateTime" args={{ type: 'datetime-local' }} />
<Story name="Success" args={{ state: 'success' }} />
<Story name="Warning" args={{ state: 'warning' }} />
<Story name="Error" args={{ state: 'error' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Disabled with value" args={{ disabled: true, value: '2025-02-24' }} />
<Story name="With Min Date" args={{ min: '2025-02-24' }} />
<Story name="With Max Date" args={{ max: '2025-02-24' }} />
<Story name="With Min and Max Date" args={{ min: '2025-02-24', max: '2025-12-31' }} />
<Story name="Readonly" args={{ readonly: true, value: '2025-02-24' }} />
<Story
    name="DateTime - With Min and Max Time"
    args={{ type: 'datetime-local', min: '2025-02-24T08:00', max: '2025-12-31T18:00' }}
/>
