<script context="module" lang="ts">
    import { InteractiveText } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/HiddenText',
        component: InteractiveText,
        args: {
            text: 'my-very-long-secr3t-text',
            autoHideTimeoutMs: 10000,
            isVisible: false
        }
    };
</script>

<div class="wrapper">
    <Story name="Secret" let:args>
        <InteractiveText {...args} variant="secret" />
    </Story>
    <Story name="Copy" let:args>
        <InteractiveText {...args} variant="copy" />
    </Story>
</div>

<style>
    .wrapper {
        margin: 100px auto;
        width: 400px;
    }
</style>
