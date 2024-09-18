<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import ToastIcon from './Icon.svelte';
    import { Button } from '$lib/button/index.js';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import type { ToastStatus } from './index.ts';
    import { Typography } from '$lib/index.ts';

    type DefaultProps = {
        title: string;
        status: ToastStatus;
        dismissible?: boolean;
    };
    type ToastProps = DefaultProps & {
        description?: never;
        actions?: never;
    };
    type ExpandedToastProps = DefaultProps & {
        description: string;
        actions?: Array<{
            label: string;
            onClick: () => void;
        }>;
    };

    type $$Props = ToastProps | ExpandedToastProps;

    export let title: $$Props['title'];
    export let status: $$Props['status'];
    export let description: $$Props['description'] = '';
    export let dismissible: $$Props['dismissible'] = true;
    export let actions: $$Props['actions'] = undefined;
</script>

<div class="toast">
    <div class="content">
        <ToastIcon {status} />
        <section>
            <Typography.Text variant="m-500">{title}</Typography.Text>
            {#if description}
                <Typography.Text variant="m-400">{description}</Typography.Text>
                {#if actions}
                    <div class="actions">
                        {#each actions as action}
                            <Button variant="compact" size="small" on:click={action.onClick}>
                                {action.label}
                            </Button>
                        {/each}
                    </div>
                {/if}
            {/if}
        </section>
    </div>
    {#if dismissible}
        <Button icon variant="ghost" size="small">
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
        border: var(--border-width-s) solid var(--color-border-neutral);
        background: var(--color-bgcolor-neutral-primary);
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
