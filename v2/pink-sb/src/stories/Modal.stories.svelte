<script context="module" lang="ts">
    import Modal from '$lib/Modal.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Modal',
        component: Modal,
        args: {
            title: 'Modal Title'
        }
    };
</script>

<script>
    import { Button } from '$lib/button/index.js';
    import Text from '$lib/input/Text.svelte';
    import { Story } from '@storybook/addon-svelte-csf';
    let open = false;
</script>

<Story name="Default" let:args>
    <Modal {...args} bind:open>
        <span slot="description">This is a Modal description title.</span>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem
            alias omnis quod.
        </p>
        <Text placeholder="Type something here" />
    </Modal>
    <Button on:click={() => (open = !open)}>Open Modal</Button>
</Story>
