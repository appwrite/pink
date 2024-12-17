<script context="module" lang="ts">
    import { Lights } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Lab/Lights',
        component: Lights
    };
</script>

<script>
    import { Card } from '$lib/index.js';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Lights />
</Template>

<Story name="Default" let:args>
    <Lights {...args} />
    <Card.Base style="width:590px;height:500px;"></Card.Base>
</Story>
