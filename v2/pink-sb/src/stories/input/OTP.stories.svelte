<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Input/OTP',
        component: Input.OTP,
        args: {
            id: 'id',
            name: 'name',
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
    <Input.OTP {...args} />
</Template>

<Story name="Default" />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Disabled with value" args={{ disabled: true, value: '123456' }} />
