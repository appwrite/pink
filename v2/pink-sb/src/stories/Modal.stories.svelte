<script context="module" lang="ts">
    import Modal from '$lib/Modal.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Modal',
        component: Modal
    };
</script>

<script>
    import Button from '$lib/Button.svelte';
    import { Story } from '@storybook/addon-svelte-csf';
    let open = false;
</script>

<Story name="Primary">
    <Modal title="Test" description="test" bind:open />
    <Button on:click={() => (open = !open)}>Open Modal</Button>
</Story>
