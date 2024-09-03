<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import type { ComponentType } from 'svelte';

    export let title: string;
    export let subtitle: string | undefined = undefined;
    export let icon: ComponentType | undefined = undefined;
    export let description: string | undefined = undefined;
</script>

<button on:click>
    <Stack gap="xs">
        <Stack direction="row" gap="s">
            {#if icon}
                <Icon {icon} />
            {/if}
            <span>{title}</span>
            {#if subtitle}
                <span class="divider" />
                <span>{subtitle}</span>
            {/if}
        </Stack>
        {#if description}
            <span>{description}</span>
        {/if}
    </Stack>
</button>

<style lang="scss">
    button {
        display: block;
        width: 100%;
        padding: var(--space-6);
        border-radius: var(--border-radius-s);
        cursor: pointer;

        &:hover {
            background: var(--color-overlay-secondary-hover);
        }
        i {
            width: var(--icon-size-m);
            height: var(--icon-size-m);
        }
        .divider {
            display: block;
            border-right: 1px solid var(--color-border-neutral);
        }
    }
</style>
