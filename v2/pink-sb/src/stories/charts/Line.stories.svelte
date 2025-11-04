<script context="module" lang="ts">
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import Line from '$lib/lab/charts/line/Line.svelte';

    export const meta: MetaProps = {
        title: 'Lab/Charts/Line',
        component: Line
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    // @ts-expect-error weird json import warning
    import data from './data.json';
</script>

<Template>
    <Line {data} />
</Template>

<Story name="Default" args={{ data: [] }} />
