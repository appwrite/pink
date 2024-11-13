<script context="module" lang="ts">
    import { StepIndicator } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/StepIndicator',
        component: StepIndicator,
        args: {
            total: 3
        }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default" let:args>
    <StepIndicator status="done" step={1} {...args}>
        <div class="demo-block">Item 1</div>
    </StepIndicator>
    <StepIndicator status="active" step={2} {...args}>
        <div class="demo-block">Item 2</div>
    </StepIndicator>
    <StepIndicator status="pending" step={3} {...args}>
        <div class="demo-block">Item 3</div>
    </StepIndicator>
</Story>

<style>
    .demo-block {
        display: grid;
        place-content: center;
        background-color: #f0f0f0;
        padding: 1rem;
        width: 100%;
        height: 100%;
    }
</style>
