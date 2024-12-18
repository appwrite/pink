<script context="module" lang="ts">
    import Sheet from '$lib/Sheet.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Sheet',
        component: Sheet,
        args: {
            title: 'Sheet Title',
            description: 'This is a Modal description title.'
        }
    };
</script>

<script>
    import { Button } from '$lib/button/index.js';
    import Stack from '$lib/layout/Stack.svelte';
    import { Story } from '@storybook/addon-svelte-csf';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import Icon from '$lib/Icon.svelte';
    let open = true;
</script>

<Story name="Default" let:args>
    <Sheet {...args} bind:open>
        <div slot="header" style:width="100%">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h2>Sheet title</h2>

                <Button icon variant="text" size="s">
                    <Icon icon={IconChevronDown}></Icon>
                </Button>
            </Stack>
        </div>
    </Sheet>
    <Button on:click={() => (open = !open)}>Open Sheet</Button>
</Story>
