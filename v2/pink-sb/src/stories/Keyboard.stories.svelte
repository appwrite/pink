<script context="module" lang="ts">
    import Keyboard, { SpecialCharacter } from '$lib/Keyboard.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Keyboard',
        component: Keyboard,
        args: {
            key: 'A'
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Stack>
        <Keyboard {...args} />
        <Keyboard key={SpecialCharacter.Command} />
        <Keyboard key={SpecialCharacter.Option} />
        <Keyboard key={SpecialCharacter.Up} />
        <Keyboard key={SpecialCharacter.Right} />
        <Keyboard key={SpecialCharacter.Down} />
        <Keyboard key={SpecialCharacter.Left} />
    </Stack>
</Template>

<Story name="Default" />
