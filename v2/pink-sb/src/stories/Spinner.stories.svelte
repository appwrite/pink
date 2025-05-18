<script context="module" lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import Spinner from '$lib/Spinner.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Spinner',
        component: Spinner
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Stack alignItems="center" direction="row">
        <Spinner {...args} />
        Some text
    </Stack>
</Template>

<Story name="Neutral" />
<Story name="Neutral - s" args={{ size: 's' }} />
<Story name="Neutral - l" args={{ size: 'l' }} />
