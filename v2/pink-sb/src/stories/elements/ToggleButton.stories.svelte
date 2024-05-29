<script context="module">
    import ToggleButton from '$lib/ToggleButton.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/ToggleButton',
        component: ToggleButton,
        args: {
            content: 'Tag'
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import Icon1 from 'pink-icons/svg/view-list.svelte';
    import Icon2 from 'pink-icons/svg/view-grid.svelte';
    import Icon3 from 'pink-icons/svg/check-circle.svelte';
    import Icon4 from 'pink-icons/svg/x-circle.svelte';
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
                icon: Icon1
            },
            {
                id: 'b',
                label: 'Button 2',
                icon: Icon2
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
                icon: Icon3
            },
            {
                id: 'b',
                label: 'Button 2',
                icon: Icon4,
                disabled: true
            }
        ]}
    />
</Story>
