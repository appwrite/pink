<script context="module" lang="ts">
    import { HiddenText } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/HiddenText',
        component: HiddenText,
        args: {
            text: 'my-secr3t-text'
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
        width: 200px;
    }
</style>
