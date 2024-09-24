<script context="module" lang="ts">
    import { Code } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Code',
        component: Code,
        args: {
            dashed: false
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Code {...args} />
</Template>

<Story name="Default" />
