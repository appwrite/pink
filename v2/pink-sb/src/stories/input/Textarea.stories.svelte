<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Input/Textarea',
        component: Input.Textarea,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Placeholder',
            value: '',
            rows: 3
        },
        argTypes: {
            state: {
                options: ['default', 'success', 'warning', 'error'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Input.Textarea {...args} />
</Template>

<Story name="Default" />
<Story name="Success" args={{ state: 'success' }} />
<Story name="Warning" args={{ state: 'warning' }} />
<Story name="Error" args={{ state: 'error' }} />
<Story name="Readonly" args={{ readonly: true }} />
<Story name="Readonly with value" args={{ readonly: true, value: 'Lorem ipsum dolor' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Disabled with value" args={{ disabled: true, value: 'Lorem ipsum dolor' }} />
<Story name="Limits" args={{ maxlength: 32 }} />
<Story name="Nullable" args={{ nullable: true }} />
