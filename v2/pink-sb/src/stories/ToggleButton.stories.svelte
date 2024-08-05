<script context="module" lang="ts">
    import { ToggleButton } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ToggleButton',
        component: ToggleButton,
        args: {
            content: 'Tag'
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import {
        IconViewList,
        IconViewGrid,
        IconCheckCircle,
        IconXCircle
    } from '@appwrite.io/pink-icons';
</script>

<Template let:args>
    <ToggleButton {...args} />
</Template>

<Story name="Default">
    <ToggleButton
        buttons={[
            {
                id: 'a',
                label: 'Button 1',
                icon: IconViewList
            },
            {
                id: 'b',
                label: 'Button 2',
                icon: IconViewGrid
            }
        ]}
    />
</Story>

<Story name="Disabled">
    <ToggleButton
        active="a"
        buttons={[
            {
                id: 'a',
                label: 'Button 1',
                icon: IconCheckCircle
            },
            {
                id: 'b',
                label: 'Button 2',
                icon: IconXCircle,
                disabled: true
            }
        ]}
    />
</Story>
