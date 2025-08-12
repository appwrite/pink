<script context="module" lang="ts">
    import { Fieldset } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Fieldset',
        component: Fieldset,
        args: {
            legend: 'Legend'
        },
        argTypes: {
            badge: {
                control: { type: 'text' }
            },
            badgeVariant: {
                control: { type: 'select' },
                options: ['primary', 'secondary', 'accent']
            }
        }
    };
</script>

<div class="container">
    <div class="wrapper">
        <Story name="Default" let:args>
            <Fieldset {...args}><div class="demo-block">Demo block</div></Fieldset>
        </Story>

        <Story name="With Badge" let:args>
            <Fieldset {...args} badge="New">
                <div class="demo-block">Demo block with badge</div>
            </Fieldset>
        </Story>
    </div>
</div>

<style>
    .container {
        margin: 100px auto;
        width: fit-content;
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

        border: 1px dashed var(--border-accent, #fd366e);
        background: var(--bgColor-accent-weak, rgba(253, 54, 110, 0.12));
    }
</style>
