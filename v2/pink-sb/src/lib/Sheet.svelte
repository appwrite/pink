<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import Button from '$lib/button/Button.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';

    export let open = false;
</script>

<aside class:open>
    <header>
        <slot name="header" />
        <Button icon variant="text" size="s"><Icon icon={IconX}></Icon></Button>
    </header>
    <slot />
</aside>

<style lang="scss">
    aside {
        position: fixed;
        top: 0;
        right: 0;
        width: min(800px, 100%);
        height: 100%;
        z-index: 1000;
        display: none;
        border: 1px solid var(--color-border-neutral);
        background: var(--color-bgcolor-neutral-primary);
        box-shadow:
            0px 8px 16px 0px rgba(0, 0, 0, 0.02),
            0px 20px 24px 0px rgba(0, 0, 0, 0.02);
        &.open {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: var(--space-4) var(--space-8);
        }
    }
</style>
