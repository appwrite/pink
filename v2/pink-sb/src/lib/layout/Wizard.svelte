<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import Button from '$lib/button/Button.svelte';
    import LinkButton from '$lib/button/Anchor.svelte';
    import { onMount } from 'svelte';

    export let title = '';
    export let buttonMethod = () => {};
    export let href = '';
    export let invertColumns = false;
    export let hideFooter = false;
    export let column = false;
    export let columnSize: 's' | 'm' | 'l' = 'm';
    export let stickySide = false;

    let wizardElement: HTMLElement;
    let sentinel: HTMLElement;
    let isHeaderTop = true;
    let observer: IntersectionObserver;

    onMount(() => {
        observer = new IntersectionObserver(
            ([entry]) => {
                isHeaderTop = entry.isIntersecting;
            },
            {
                root: wizardElement,
                threshold: 0.001,
                rootMargin: '-32px 0px 0px 0px'
            }
        );
        if (sentinel) observer.observe(sentinel);

        return () => {
            if (observer) observer.disconnect();
        };
    });
</script>

<section class="wizard" bind:this={wizardElement}>
    <div
        class="wizard-container"
        class:single={column}
        class:single--s={columnSize === 's'}
        class:single--l={columnSize === 'l'}
        class:hide-footer={hideFooter}
    >
        <div>
            <header class:hasScrolled={!isHeaderTop || !title} class:hasTitle={!!title}>
                <Stack
                    gap="xl"
                    justifyContent={title ? 'space-between' : 'flex-end'}
                    direction="row"
                    alignItems="center"
                >
                    {#if title}
                        <h1>
                            {title}
                        </h1>
                    {/if}
                    {#if href}
                        <LinkButton
                            icon
                            variant="secondary"
                            size={!isHeaderTop ? 'xs' : 's'}
                            {href}
                        >
                            <Icon icon={IconX} />
                        </LinkButton>
                    {:else}
                        <Button
                            icon
                            variant="secondary"
                            size={!isHeaderTop ? 'xs' : 's'}
                            on:click={buttonMethod}
                        >
                            <Icon icon={IconX} />
                        </Button>
                    {/if}
                </Stack>
            </header>
            <div class="sentinel" bind:this={sentinel} aria-hidden="true"></div>
            {#if column}
                <main>
                    <slot />
                </main>
            {:else}
                <div
                    class="wizard-content"
                    class:invert-columns={invertColumns}
                    class:sticky-side={stickySide}
                >
                    <main class:hide-footer={hideFooter}>
                        <slot />
                    </main>
                    <aside>
                        <slot name="aside" />
                    </aside>
                </div>
            {/if}
        </div>
        {#if !hideFooter && $$slots.footer}
            <footer>
                <slot name="footer" />
            </footer>
        {/if}
    </div>
</section>

<style lang="scss">
    @use '../../scss/_breakpoints' as *;

    .sentinel {
        width: 100%;
        height: 1px;
        pointer-events: none;
    }

    .wizard {
        display: flex;
        align-items: stretch;
        justify-content: center;
        min-block-size: 100dvh;
        padding-inline: var(--space-11);
        background-color: var(--bgcolor-neutral-primary);
        scrollbar-gutter: stable;

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 100%;
        max-height: 100dvh;
        overflow-y: auto;
        @media (max-width: $breakpoint-m) {
            padding-inline: var(--space-10);
        }

        @media (max-width: $breakpoint-s) {
            padding-inline: var(--space-7);
        }

        &-container {
            max-inline-size: 1200px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: var(--space-7);
            justify-content: space-between;

            @media (max-width: $breakpoint-l) {
                max-inline-size: 1040px;
            }

            &.single {
                max-inline-size: 1040px;
                &--s {
                    max-inline-size: 794px;
                }
                &--l {
                    max-inline-size: 1200px;
                }
            }
        }

        &-content {
            display: flex;
            gap: var(--space-11);
            position: relative;

            &.invert-columns {
                flex-direction: row-reverse;
                @media (max-width: $breakpoint-m) {
                    flex-direction: column-reverse;
                }
            }

            &.sticky-side {
                position: relative;

                aside {
                    position: sticky;
                    height: fit-content;
                    top: var(--space-12);
                    @media (max-width: $breakpoint-m) {
                        position: relative;
                    }
                }
            }
            @media (max-width: $breakpoint-m) {
                flex-direction: column;
                gap: var(--space-10);
            }

            main {
                width: 100%;
                max-width: 795px;
            }
            aside {
                width: 100%;

                max-width: 365px;
            }
            @media (max-width: $breakpoint-l) {
                main {
                    max-width: 688px;
                }
                aside {
                    max-width: 312px;
                }
            }
            @media (max-width: $breakpoint-m) {
                main {
                    max-width: 100%;
                }
                aside {
                    max-width: 100%;
                }
            }
        }

        header {
            position: sticky;
            z-index: 1;
            inset-block-start: 0;
            display: flex;
            flex-direction: column;
            gap: var(--space-7);
            padding-block-end: var(--base-28);
            padding-block-start: var(--space-12);
            margin-block-end: var(--base-4);
            background-color: var(--bgcolor-neutral-primary);
            transition: height, padding-block-end, padding-block-start;
            transition-duration: 300ms;
            z-index: 5;
            outline: 1px solid var(--bgcolor-neutral-primary);

            h1 {
                transition: transform, font-size;
                transition-duration: 300ms;
            }

            &.hasScrolled.hasTitle {
                padding-block-end: var(--base-4);
                padding-block-start: var(--space-4);

                border-block-end: 1px solid var(--border-neutral);

                h1 {
                    font-size: var(--font-size-m);
                }
            }
            @media (max-width: $breakpoint-s) {
                padding-block-start: var(--space-10);
            }

            h1 {
                color: var(--fgcolor-neutral-primary);

                /* Desktop/Title XL */
                font-family: var(--font-family-brand), var(--sans-fallbacks);
                font-size: var(--font-size-xxl);
                font-style: normal;
                font-weight: 400;
                line-height: 140%; /* 44.8px */
                letter-spacing: -0.144px;
            }
        }

        footer {
            position: sticky;
            inset-block-end: 0;
            display: flex;
            gap: var(--gap-m);
            justify-content: flex-end;
            padding-block: var(--space-7);
            border-block-start: 1px solid var(--border-neutral);
            background-color: var(--bgcolor-neutral-primary);
            z-index: 10;
        }

        .hide-footer {
            padding-block-end: var(--space-10);
        }
    }
</style>
