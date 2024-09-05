<script context="module" lang="ts">
    import Pagination from '$lib/Pagination.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Pagination',
        component: Pagination,
        args: {
            total: 10,
            page: 1,
            limit: 5
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Pagination {...args} />
</Template>

<Story name="Default" />
<Story
    name="Many"
    args={{
        total: 200,
        page: 1,
        limit: 5
    }}
/>
