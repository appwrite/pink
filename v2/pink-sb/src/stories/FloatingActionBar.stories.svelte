<script context="module" lang="ts">
    import { FloatingActionBar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/FloatingActionBar',
        component: FloatingActionBar
    };
</script>

<script>
    import { Badge } from '$lib/index.js';
    import { Button } from '$lib/button/index.js';
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<div class="wrapper">
    <Story name="Default">
        <FloatingActionBar>
            <svelte:fragment slot="start">
                <Badge content="1" />
                <span>selected</span>
            </svelte:fragment>
            <svelte:fragment slot="end">
                <Button size="s">Save</Button>
                <Button size="s" variant="secondary">Cancel</Button>
            </svelte:fragment>
        </FloatingActionBar>
    </Story>
</div>

<style>
    .wrapper {
        height: 100px;
        position: relative;
    }
</style>
