<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import ToastIcon from './Icon.svelte';
    import { Button } from '$lib/button/index.js';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import type { ToastStatus } from './index.js';
    import { Typography } from '$lib/index.js';
    import { createEventDispatcher, type ComponentType } from 'svelte';

    type DefaultProps = {
        status: ToastStatus;
        title?: string;
        dismissible?: boolean;
        icon?: ComponentType;
        isHtml?: boolean;
    };
    type ToastProps = DefaultProps & {
        description?: never;
        actions?: never;
    };
    type ExpandedToastProps = DefaultProps & {
        description: string;
        actions?: Array<{
            label: string;
            isHtml?: boolean;
            onClick: () => void;
        }>;
    };

    type $$Props = ToastProps | ExpandedToastProps;

    const dispatch = createEventDispatcher();

    export let status: $$Props['status'];
    export let title: $$Props['title'] = '';
    export let description: $$Props['description'] = '';
    export let dismissible: $$Props['dismissible'] = true;
    export let actions: $$Props['actions'] = undefined;
    export let icon: $$Props['icon'] = undefined;
    export let isHtml: $$Props['isHtml'] = undefined;
</script>

<div class="toast">
    <div class="content">
        {#if icon}
            <svelte:component this={icon} />
        {:else}
            <ToastIcon {status} />
        {/if}

        <section>
            {#if title}
                <Typography.Text variant="m-500">
                    {#if isHtml}
                        {@html title}
                    {:else}
                        {title}
                    {/if}
                </Typography.Text>
            {/if}
            {#if description}
                <Typography.Text variant="m-400">
                    {#if isHtml}
                        {@html description}
                    {:else}
                        {description}
                    {/if}
                </Typography.Text>
                {#if actions}
                    <div class="actions">
                        {#each actions as action}
                            <Button variant="extra-compact" size="s" on:click={action.onClick}>
                                {#if action.isHtml}
                                    {@html action.label}
                                {:else}
                                    {action.label}
                                {/if}
                            </Button>
                        {/each}
                    </div>
                {/if}
            {/if}
        </section>
    </div>
    {#if dismissible}
        <Button icon variant="ghost" size="s" on:click={() => dispatch('dismiss')}>
            <Icon icon={IconX} />
        </Button>
    {/if}
</div>

<style lang="scss">
    .toast {
        inline-size: 24rem;
        display: inline-flex;
        padding: var(--space-4);
        align-items: start;
        justify-content: space-between;
        gap: var(--space-6);
        border-radius: var(--border-radius-m);
        border: var(--border-width-s) solid var(--border-neutral);
        background: var(--bgcolor-neutral-primary);
        box-shadow:
            0px 2px 12px 0px rgba(0, 0, 0, 0.02),
            0px 6px 8px 0px rgba(0, 0, 0, 0.02);

        .content {
            display: flex;
            align-items: start;
            gap: var(--space-6);

            section {
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
                margin-block: auto;

                .actions {
                    display: flex;
                    gap: var(--space-5);
                }
            }
        }
    }
</style>
