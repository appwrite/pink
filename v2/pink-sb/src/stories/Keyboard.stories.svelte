<script context="module" lang="ts">
    import Keyboard, { SpecialCharacter } from '$lib/Keyboard.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Keyboard',
        component: Keyboard,
        args: {
            size: 'm'
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Stack>
        <Keyboard {...args} key="A" />
        <Keyboard key={SpecialCharacter.Command} {...args} />
        <Keyboard key={SpecialCharacter.Option} {...args} />
        <Keyboard key={SpecialCharacter.Up} {...args} />
        <Keyboard key={SpecialCharacter.Right} {...args} />
        <Keyboard key={SpecialCharacter.Down} {...args} />
        <Keyboard key={SpecialCharacter.Left} {...args} />
        <Keyboard key={'Enter'} autoWidth {...args} />
    </Stack>
</Template>

<Story name="Default" />

<Story name="Small size" args={{ size: 's' }} />
