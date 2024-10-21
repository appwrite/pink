<script context="module" lang="ts">
    import { HiddenText } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/HiddenText',
        component: HiddenText,
        args: {
            text: 'my-secr3t-text',
            autoHideTimeoutMs: 10000
        }
    };
</script>

<div class="wrapper">
    <Story name="Default" let:args>
        <HiddenText {...args} />
    </Story>
</div>

<style>
    .wrapper {
        margin: 100px calc(50% - 100px);
        width: 200px;
    }
</style>
