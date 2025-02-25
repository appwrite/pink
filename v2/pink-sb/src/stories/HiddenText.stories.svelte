<script context="module" lang="ts">
    import { HiddenText } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/HiddenText',
        component: HiddenText,
        args: {
            text: 'my-very-long-secr3t-text',
            publicText: 'my public text',
            autoHideTimeoutMs: 10000,
            isVisible: false
        }
    };
</script>

<div class="wrapper">
    <Story name="Secret" let:args>
        <HiddenText {...args} />
    </Story>
    <Story name="Public" let:args>
        <HiddenText {...args} variant="public" />
    </Story>
</div>

<style>
    .wrapper {
        margin: 100px auto;
        width: 400px;
    }
</style>
