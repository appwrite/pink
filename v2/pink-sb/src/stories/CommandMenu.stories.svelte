<script context="module" lang="ts">
    import CommandMenu from '$lib/CommandMenu.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/CommandMenu',
        component: CommandMenu,
        args: {
            grouppedCommands: [
                {
                    name: 'test',
                    commands: [
                        {
                            callback: () => console.log('test'),
                            label: 'Test 1',
                            icon: 'users'
                        },
                        {
                            callback: () => console.log('test'),
                            label: 'Test 2',
                            icon: 'users'
                        }
                    ]
                }
            ]
        }
    };
</script>

<script>
    import { Button } from '$lib/button/index.js';
    import { Story } from '@storybook/addon-svelte-csf';
    let open = false;
</script>

<Story name="Default" let:args>
    <CommandMenu {...args} bind:open />
    <Button on:click={() => (open = !open)}>Open command menu</Button>
</Story>
