<script context="module" lang="ts">
    import { Divider } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Divider',
        component: Divider,
        args: {
            dashed: false,
            vertical: false
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <div style:height="100px">
        <Divider {...args} />
    </div>
</Template>

<Story name="Default" />
<Story name="Dashed" args={{ dashed: true }} />
<Story name="Vertical" args={{ vertical: true }} />
