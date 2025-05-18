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
    import Stack from '$lib/layout/Stack.svelte';
    import { Button } from '$lib/button/index.js';
    import Text from '$lib/input/Text.svelte';
    import { Story } from '@storybook/addon-svelte-csf';
    let open = false;
</script>

<Story name="Default" let:args>
    <Modal {...args} bind:open>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem alias
        omnis quod.
        <Text placeholder="Type something here" />
        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button variant="text" size="s" on:click={() => (open = false)}>Cancel</Button>
                <Button on:click size="s">Save</Button>
            </Stack>
        </svelte:fragment>
    </Modal>
    <Button on:click={() => (open = !open)}>Open Modal</Button>
</Story>

<Story name="With Description" let:args>
    <Modal {...args} bind:open>
        <span slot="description">This is a Modal description title.</span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem alias
        omnis quod.
        <Text placeholder="Type something here" />
        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button variant="text" size="s" on:click={() => (open = false)}>Cancel</Button>
                <Button on:click size="s">Save</Button>
            </Stack>
        </svelte:fragment>
    </Modal>
    <Button on:click={() => (open = !open)}>Open Modal</Button>
</Story>

<Story name="Small" let:args>
    <Modal {...args} size="s" bind:open>
        <span slot="description">This is a Modal description title.</span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem alias
        omnis quod.
        <Text placeholder="Type something here" />
        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button variant="text" size="s" on:click={() => (open = false)}>Cancel</Button>
                <Button on:click size="s">Save</Button>
            </Stack>
        </svelte:fragment>
    </Modal>
    <Button on:click={() => (open = !open)}>Open Modal</Button>
</Story>

<Story name="Large" let:args>
    <Modal {...args} size="l" bind:open>
        <span slot="description">This is a Modal description title.</span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem alias
        omnis quod.
        <Text placeholder="Type something here" />
        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button variant="text" size="s" on:click={() => (open = false)}>Cancel</Button>
                <Button on:click size="s">Save</Button>
            </Stack>
        </svelte:fragment>
    </Modal>
    <Button on:click={() => (open = !open)}>Open Modal</Button>
</Story>
