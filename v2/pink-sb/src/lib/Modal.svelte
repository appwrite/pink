<script lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import Button from '$lib/button/Button.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import Icon from './Icon.svelte';

    export let title: string;
    export let open = false;
    export let hideFooter = false;

    let dialog: HTMLDialogElement;

    function handleBLur(event: MouseEvent) {
        if (event.target === dialog) {
            dialog.close();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
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
    <section>
        {#if open}
            <header>
                <Stack gap="xl" justifyContent="space-between" direction="row" alignItems="center">
                    <Title size="s">{title}</Title>
                    <Button icon variant="ghost" size="s" on:click={() => (open = false)}>
                        <Icon icon={IconX} />
                    </Button>
                </Stack>
                <p>
                    <slot name="description" />
                </p>
            </header>
            <div class="content">
                <Stack gap="xl">
                    <slot />
                </Stack>
            </div>
            {#if !hideFooter}
                <footer>
                    <slot name="footer">
                        <Stack direction="row" gap="s" justifyContent="flex-end">
                            <Button variant="text" size="s" on:click={() => (open = false)}>
                                Cancel
                            </Button>
                            <Button on:click size="s">Save</Button>
                        </Stack>
                    </slot>
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
            width: 100%;
            width: 600px;
            border-radius: var(--border-radius-l);
            border: var(--border-width-s) solid var(--color-border-neutral);
            background: var(--color-bgcolor-neutral-primary);
            color: var(--color-fgcolor-neutral-primary);

            /* box-shadow/neutral/XL */
            box-shadow:
                0px 56px 32px 0px rgba(0, 0, 0, 0.02),
                0px 6px 14px 0px rgba(0, 0, 0, 0.04),
                0px 24px 25px 0px rgba(0, 0, 0, 0.03);

            header,
            footer {
                display: flex;
                width: 100%;
                padding: var(--space-8);
                flex-direction: column;
                align-items: flex-start;
                gap: var(--gap-xxs);
                border-top: var(--border-width-s) solid var(--color-border-neutral);
            }
            header {
                border-bottom: var(--border-width-s) solid var(--color-border-neutral);
                background: var(--color-bgcolor-neutral-primary);

                p {
                    color: var(--color-fgcolor-neutral-secondary);
                    font-family: var(--font-family-sansserif);
                    font-size: var(--font-size-s);
                    font-style: normal;
                    font-weight: 400;
                    line-height: 140%; /* 19.6px */
                    letter-spacing: -0.063px;
                }
            }
            .content {
                width: 100%;
                padding: var(--space-8);
            }
        }
        &::backdrop {
            background-color: rgba(25, 25, 28, 0.8);
        }
    }
</style>
