<script context="module" lang="ts">
    import Password from '$lib/input/Password.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Input/Password',
        component: Password,
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
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Password {...args} />
</Template>

<Story name="Default" />
<Story name="Success" args={{ state: 'success' }} />
<Story name="Warning" args={{ state: 'warning' }} />
<Story name="Error" args={{ state: 'error' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Disabled with value" args={{ disabled: true, value: 'Lorem ipsum dolor' }} />
<Story name="Limits" args={{ maxlength: 32 }} />
<Story name="Nullable" args={{ nullable: true }} />
