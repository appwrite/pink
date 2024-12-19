<script context="module" lang="ts">
    import { Lights } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Lab/Lights',
        component: Lights
    };
</script>

<script>
    import { Card, Typography } from '$lib/index.ts';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Lights />
</Template>

<Story name="Default" let:args>
    <Lights {...args} />

    <div class="spacer">
        <div class="flex">
            <Typography.Title>Congratulations!</Typography.Title>
            <Typography.Text>You deployed your Site successfully.</Typography.Text>
        </div>
        <Card.Base {...args}>
            <div class="filler" />
        </Card.Base>
    </div>
</Story>

<style lang="scss">
    .spacer {
        text-align: center;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .flex {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .filler {
        height: 400px;
    }
</style>
