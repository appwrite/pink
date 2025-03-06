<script lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import Button from '$lib/button/Button.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import { Typography } from '$lib/index.js';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import Icon from './Icon.svelte';
    import { setContext } from 'svelte';

    export let title: string;
    export let open = false;
    export let hideFooter = false;
    export let dismissible = true;
    export let size: 's' | 'm' | 'l' = 'm';

    let dialog: HTMLDialogElement;

    setContext('dialog-group', true);

    function handleBLur(event: MouseEvent) {
        if (event.target === dialog && dismissible) {
            dialog.close();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' && dismissible) {
            event.preventDefault();
            dialog.close();
        }
    }

    $: if (dialog) {
        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }
</script>

<svelte:window on:mousedown={handleBLur} on:keydown={handleKeydown} />

<dialog bind:this={dialog} on:close={() => (open = false)}>
    <section class:s={size === 's'} class:l={size === 'l'}>
        {#if open}
            <header>
                <Stack gap="xl" justifyContent="space-between" direction="row" alignItems="center">
                    <Title size="s">{title}</Title>
                    {#if dismissible}
                        <Button icon variant="ghost" size="s" on:click={() => (open = false)}>
                            <Icon icon={IconX} />
                        </Button>
                    {/if}
                </Stack>
                {#if $$slots.description}
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        <slot name="description" />
                    </Typography.Text>
                {/if}
            </header>
            <div class="content">
                <Stack gap="xl">
                    <slot />
                </Stack>
            </div>
            {#if !hideFooter}
                <footer>
                    <slot name="footer" />
                </footer>
            {/if}
        {/if}
    </section>
</dialog>

<style lang="scss">
    dialog {
        padding: 0;
        border: none;
        background: none;
        overflow: visible;
        width: 100%;

        section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            margin-inline: auto;
            inline-size: 600px;
            border-radius: var(--border-radius-l);
            border: var(--border-width-s) solid var(--border-neutral);
            background: var(--bgcolor-neutral-primary);
            color: var(--fgcolor-neutral-secondary);

            /* box-shadow/neutral/XL */
            box-shadow:
                0px 56px 32px 0px rgba(0, 0, 0, 0.02),
                0px 6px 14px 0px rgba(0, 0, 0, 0.04),
                0px 24px 25px 0px rgba(0, 0, 0, 0.03);

            &.s {
                inline-size: 480px;
            }
            &.l {
                inline-size: 1200px;
                max-inline-size: 90vw;
            }

            header,
            footer {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: flex-start;
                gap: var(--gap-xxxs);
                padding: var(--space-8);
            }
            header {
                border-bottom: var(--border-width-s) solid var(--border-neutral);
                background: var(--bgcolor-neutral-primary);
                padding-block-start: var(--space-7);
            }
            footer {
                border-top: var(--border-width-s) solid var(--border-neutral);
            }
            .content {
                width: 100%;
                padding: var(--space-8);
                max-height: 70vh;
                overflow-y: auto;
            }
        }

        // animations
        &::backdrop {
            background: var(--overlay-scrim);
            opacity: 0;
            transition: opacity 150ms ease-in-out;
        }

        section {
            transform: scale(0.96);
            transition:
                transform 200ms ease-in-out,
                opacity 200ms ease-in-out;
        }

        &[open] {
            &::backdrop {
                opacity: 1;
                animation: backdrop-enter 150ms ease-in-out forwards;
            }
            section {
                animation: show 200ms ease-in-out forwards;
            }
        }

        @keyframes show {
            to {
                transform: scale(1);
            }
        }

        @keyframes hide {
            to {
                transform: scale(0.96);
            }
        }

        @keyframes backdrop-enter {
            to {
                opacity: 1;
            }
        }

        @keyframes hideBackdrop {
            to {
                opacity: 0;
            }
        }
    }
</style>
