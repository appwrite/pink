<script context="module" lang="ts">
    import Dialog from '$lib/Dialog.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Dialog',
        component: Dialog,
        args: {
            title: 'Dialog Title',
            description: 'This is a Modal description title.'
        }
    };
</script>

<script>
    import Button from '$lib/Button.svelte';
    import { Story } from '@storybook/addon-svelte-csf';
    let open = false;
</script>

<Story name="Default" let:args>
    <Dialog {...args} bind:open />
    <Button on:click={() => (open = !open)}>Open Dialog</Button>
</Story>
