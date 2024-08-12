<script lang="ts">
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
                <h1>{title}</h1>
                <p>{description}</p>
            </header>
            <p>Greetings, one and all!</p>
            <footer></footer>
        {/if}
    </section>
</dialog>

<button on:click={() => (open = true)}>open</button>

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
            gap: var(--space-9);
            border-radius: var(--border-radius-l);
            border: var(--border-width-s) solid var(--color-border-neutral);
            background: var(--color-bgcolor-neutral-primary);

            /* box-shadow/neutral/XL */
            box-shadow:
                0px 56px 32px 0px rgba(0, 0, 0, 0.02),
                0px 6px 14px 0px rgba(0, 0, 0, 0.04),
                0px 24px 25px 0px rgba(0, 0, 0, 0.03);
        }
    }
</style>
