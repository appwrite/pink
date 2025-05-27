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

<div class="wrapper">
    <Story name="Secret" let:args>
        <InteractiveText {...args} variant="secret" />
    </Story>
    <Story name="Secret code" let:args>
        <InteractiveText {...args} variant="secret-code" />
    </Story>
    <Story name="Copy" let:args>
        <InteractiveText {...args} variant="copy" />
    </Story>
    <Story name="Copy code" let:args>
        <InteractiveText {...args} variant="copy-code" />
    </Story>
    <Story name="No copy" let:args>
        <InteractiveText {...args} copy={false} />
    </Story>
    <Story name="Copy something else">
        <InteractiveText
            isVisible
            variant="copy"
            text="Click to copy the secret"
            value="my-very-long-secr3t-text"
        />
    </Story>
</div>

<style>
    .wrapper {
        margin: 100px auto;
        width: 400px;
    }
</style>
