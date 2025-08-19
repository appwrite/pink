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
    import { Anchor } from '$lib/link/index.js';
    import Stack from '$lib/layout/Stack.svelte';
    import Text from '../../lib/typography/Text.svelte';
    import Button from '../../lib/button/Button.svelte';
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

<Story name="Custom end slot">
    <Input.Textarea
        rows={3}
        placeholder="Placeholder"
        id="test"
        name="test"
        label="Test"
        value="Emily Johnson, Amanda Rodriguez, Guy Hawkins"
    >
        <Stack direction="column" alignItems="flex-start" slot="end">
            <Anchor size="s" variant="quiet">
                <Text variant="m-400">Advanced edit</Text>
            </Anchor>
        </Stack>
    </Input.Textarea>
</Story>
