<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Input/Number',
        component: Input.Number,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Placeholder'
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
    <Input.Number {...args} />
</Template>

<Story name="Default" />
<Story name="Success" args={{ state: 'success' }} />
<Story name="Warning" args={{ state: 'warning' }} />
<Story name="Error" args={{ state: 'error' }} />
<Story name="Readonly" args={{ readonly: true, value: 42 }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Nullable" args={{ nullable: true }} />
<Story name="BigInt">
    <Input.Number
        label="BigInt"
        helper="Min: 1, Max: 9007199254741001"
        value={9007199254740993n}
        step="2"
        min={1}
        max={9007199254741001n}
    />
</Story>
