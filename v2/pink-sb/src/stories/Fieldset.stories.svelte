<script context="module" lang="ts">
    import { Fieldset } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Fieldset',
        component: Fieldset,
        args: {
            legend: 'Legend'
        }
    };
</script>

<div class="container">
    <div class="wrapper">
        <Story name="Default" let:args>
            <Fieldset {...args}><div class="demo-block">Demo block</div></Fieldset>
        </Story>
    </div>
</div>

<style>
    .container {
        margin: 100px auto;
        width: fit-content;
        background-color: lightblue;
    }
    .wrapper {
        padding: 100px;
    }

    .demo-block {
        display: flex;
        max-width: 747px;
        width: calc(100vw - 50px);
        height: 136px;
        padding: 20px;
        justify-content: center;
        align-items: center;
        gap: var(--gap-XL, 20px);
        flex-shrink: 0;

        border: 1px dashed var(--color-border-accent, #fd366e);
        background: var(--color-bgColor-accent-weak, rgba(253, 54, 110, 0.12));
    }
</style>
