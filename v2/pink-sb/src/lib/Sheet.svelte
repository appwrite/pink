<script lang="ts">
    import Button from '$lib/button/Button.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import { slide } from 'svelte/transition';
    import { Skeleton } from './index.ts';
    import { quadInOut } from 'svelte/easing';
    import { tick } from 'svelte';

    export let open = false;
    export let closeOnBlur = true;

    let transitioning = false;

    let sheet: HTMLElement;

    function handleBLur(event: MouseEvent) {
        if (event.target !== sheet && !sheet.contains(event.target as Node) && closeOnBlur) {
            transitioning = true;
            tick().then(() => {
                open = false;
            });
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            transitioning = true;
            tick().then(() => {
                open = false;
            });
        }
    }
</script>

<svelte:window on:mousedown={handleBLur} on:keydown={handleKeydown} />

{#if open}
    <aside
        bind:this={sheet}
        class:open
        in:slide={{ axis: 'x', duration: 400, easing: quadInOut }}
        out:slide={{ axis: 'x', duration: 400, easing: quadInOut }}
        on:introstart={() => (transitioning = true)}
        on:introend={() => (transitioning = false)}
        on:outrostart={() => (transitioning = true)}
        on:outroend={() => (transitioning = false)}
    >
        {#if transitioning || !open}
            <header>
                <Skeleton variant="line" height={20} width="100%" />
            </header>
            <section>
                <Skeleton variant="line" height={40} width="auto" />
            </section>
        {:else}
            <header>
                <slot name="header" />
                <div>
                    <span class="divider"></span>
                    <Button icon variant="secondary" size="xs" on:click={() => (open = false)}>
                        <Icon icon={IconX}></Icon>
                    </Button>
                </div>
            </header>
            <section>
                <slot />
            </section>
        {/if}
    </aside>
{/if}

<style lang="scss">
    @use '../scss/_breakpoints' as *;

    aside {
        position: fixed;
        top: 0;
        right: 0;
        width: min(800px, 100%);
        height: 100%;
        z-index: 1000;
        display: none;
        border-block-start: 1px solid transparent;
        border-inline-start: 1px solid var(--border-neutral);
        background: var(--bgcolor-neutral-primary);
        box-shadow:
            0px 8px 16px 0px rgba(0, 0, 0, 0.02),
            0px 20px 24px 0px rgba(0, 0, 0, 0.02);
        &.open {
            display: flex;
            flex-direction: column;
        }

        @media (max-width: $breakpoint-xl) {
            width: 56%;
        }

        @media (max-width: $breakpoint-s) {
            width: 100%;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-4) var(--space-8);
            border-block-end: 1px solid var(--border-neutral);
            div {
                display: flex;
                align-items: center;
                height: 100%;

                .divider {
                    display: block;
                    margin-inline: var(--gap-m);
                    width: 1px;
                    height: 100%;
                    background: var(--border-neutral);
                }
            }
        }
        section {
            padding: var(--space-8);
        }
    }
</style>
