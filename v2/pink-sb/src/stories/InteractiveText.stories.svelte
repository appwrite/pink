<script context="module" lang="ts">
    import { InteractiveText } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/InteractiveText',
        component: InteractiveText,
        args: {
            text: 'my-very-long-secr3t-text',
            autoHideTimeoutMs: 10000,
            isVisible: false
        }
    };
</script>

<script>
    import Layout from '$lib/layout/index.js';
    import { Typography } from '$lib/index.ts';
    import { Button } from '$lib/button/index.js';

    let showText = false;
</script>

<div class="wrapper">
    <Story name="Secret" let:args>
        <InteractiveText {...args} variant="secret" />
    </Story>
    <Story name="Copy" let:args>
        <InteractiveText {...args} variant="copy" />
    </Story>

    <Story name="Prevent Parent Click" let:args>
        <Layout.Stack>
            <Typography.Text variant="m-400">
                Clicking "Copy" won't trigger the button's action.
            </Typography.Text>

            <Button
                variant="secondary"
                on:click={() => {
                    showText = !showText;
                }}
            >
                <InteractiveText {...args} variant="copy" stopPropagation />
            </Button>

            {#if showText}
                <Typography.Text variant="m-400">Demo text!</Typography.Text>
            {/if}
        </Layout.Stack>
    </Story>
</div>

<style>
    .wrapper {
        margin: 100px auto;
        width: 400px;
    }
</style>
