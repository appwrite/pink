<script context="module" lang="ts">
    import Input from '$lib/input/Text.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Input/Text',
        component: Input,
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
    import Action from '$lib/input/Action.svelte';
    import Icon from '$lib/input/Icon.svelte';
    import IconSearch from 'pink-icons/svg/search.svelte';
    import IconDuplicate from 'pink-icons/svg/duplicate.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Input {...args} />
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
    <Input {...args}>
        <Icon slot="start" icon={IconSearch} />
    </Input>
</Story>

<Story name="With action" let:args>
    <Input {...args}>
        <Action slot="end" icon={IconDuplicate} />
    </Input>
</Story>

<Story name="With action and icon" let:args>
    <Input {...args}>
        <Icon slot="start" icon={IconSearch} />
        <Action slot="end" icon={IconDuplicate} />
    </Input>
</Story>
