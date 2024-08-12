<script lang="ts">
    import Button from './Button.svelte';
    import Stack from './layout/Stack.svelte';

    export let title: string;
    export let description: string;
    export let open = false;

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
                <Stack gap="xl" justifyContent="space-between" direction="row">
                    <h1>{title}</h1>
                    <button on:click={() => (open = false)}>X</button>
                </Stack>
                <p>{description}</p>
            </header>
            <slot />
            <footer>
                <Stack direction="row" gap="s" justifyContent="flex-end">
                    <Button variant="text" on:click={() => (open = false)}>Cancel</Button>
                    <Button>Save</Button>
                </Stack>
            </footer>
        {/if}
    </section>
</dialog>

<style lang="scss">
    dialog {
        padding: 0;
        border: none;
        background: none;

        section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            gap: var(--space-9);
            width: 440px;
            border-radius: var(--border-radius-l);
            border: var(--border-width-s) solid var(--color-border-neutral);
            background: var(--color-bgcolor-neutral-primary);

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
            }
            header {
                border-bottom: var(--border-width-s) solid var(--color-border-neutral);
                background: var(--color-bgcolor-neutral-primary);
            }
        }
    }
</style>
