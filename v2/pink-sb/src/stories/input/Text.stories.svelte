<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { Meta } from '@storybook/svelte';

    export const meta = {
        title: 'Components/Input/Text',
        component: Input.Text,
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
    import Action from '$lib/input/Action.svelte';
    import Icon from '$lib/input/Icon.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { IconDuplicate, IconSearch } from '@appwrite.io/pink-icons';
</script>

<Template let:args>
    <Input.Text {...args} />
</Template>

<Story name="Default" />
<Story name="Success" args={{ state: 'success' }} />
<Story name="Warning" args={{ state: 'warning' }} />
<Story name="Error" args={{ state: 'error' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Disabled with value" args={{ disabled: true, value: 'Lorem ipsum dolor' }} />
<Story name="Limits" args={{ maxlength: 32 }} />
<Story name="Nullable" args={{ nullable: true }} />

<Story name="With icons" let:args>
    <Input.Text {...args}>
        <Icon slot="start" icon={IconSearch} />
    </Input.Text>
</Story>

<Story name="With action" let:args>
    <Input.Text {...args}>
        <Action slot="end" icon={IconDuplicate} />
    </Input.Text>
</Story>

<Story name="With action and icon" let:args>
    <Input.Text {...args}>
        <Icon slot="start" icon={IconSearch} />
        <Action slot="end" icon={IconDuplicate} />
    </Input.Text>
</Story>
