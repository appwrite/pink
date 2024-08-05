<script context="module" lang="ts">
    import { Divider } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Divider',
        component: Divider,
        args: {
            dashed: false
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Divider {...args} />
</Template>

<Story name="Default" />
<Story name="Dashed" args={{ dashed: true }} />
