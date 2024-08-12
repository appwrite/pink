<script context="module" lang="ts">
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
    <Spinner {...args} />
</Template>

<Story name="Neutral" />
<Story name="Neutral - small" args={{ size: 'small' }} />
<Story name="Neutral - large" args={{ size: 'large' }} />
