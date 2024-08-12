<script context="module" lang="ts">
    import Modal from '$lib/Modal.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Modal',
        component: Modal
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Primary">
    <Modal title="Test" description="test" />
</Story>
