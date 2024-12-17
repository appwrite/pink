<script context="module" lang="ts">
    import { InlineInput } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Lab/InlineInput',
        component: InlineInput,
        args: {
            label: 'ID',
            value: ''
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <InlineInput {...args} />
</Template>

<Story name="Default" let:args>
    <InlineInput {...args} />
</Story>
