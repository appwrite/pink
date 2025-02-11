<script lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import Button from '$lib/button/Button.svelte';
    import LinkButton from '$lib/button/Anchor.svelte';

    export let title = '';
    export let buttonMethod = () => {};
    export let href = '';
    export let invertColumns = false;
    export let hideAside = false;
    export let hideFooter = false;

    let scrollY: number;
</script>

<svelte:window bind:scrollY />

<section class="wizard">
    <div class="wizard-container">
        <div>
            <header class:hasScroll={scrollY > 0}>
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
                        <LinkButton icon variant="secondary" size="s" {href}>
                            <Icon icon={IconX} />
                        </LinkButton>
                    {:else}
                        <Button icon variant="secondary" size="s" on:click={buttonMethod}>
                            <Icon icon={IconX} />
                        </Button>
                    {/if}
                </Stack>
            </header>
            <div class="wizard-content" class:invert-columns={invertColumns}>
                <main>
                    <slot />
                </main>
                {#if !hideAside}
                    <aside>
                        <slot name="aside" />
                    </aside>
                {/if}
            </div>
        </div>
        {#if !hideFooter && $$slots.footer}
            <footer>
                <slot name="footer" />
            </footer>
        {/if}
    </div>
</section>

<style lang="scss">
    .wizard {
        display: flex;
        align-items: stretch;
        justify-content: center;
        min-block-size: 100dvh;
        padding-inline: var(--space-11);
        background-color: var(--color-bgcolor-neutral-primary);

        @media (max-width: 768px) {
            padding-inline: var(--space-10);
        }

        @media (max-width: 360px) {
            padding-inline: var(--space-7);
        }

        &-container {
            max-inline-size: 1200px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: space-between;
        }

        &-content {
            display: flex;
            gap: var(--space-11);
            &.invert-columns {
                flex-direction: row-reverse;
            }
            @media (max-width: 768px) {
                flex-direction: column;
            }

            main {
                width: 100%;
                max-width: 795px;
            }
            aside {
                width: 100%;

                max-width: 365px;
            }
            @media (max-width: 1280px) {
                main {
                    max-width: 688px;
                }
                aside {
                    max-width: 312px;
                }
            }
            @media (max-width: 1024px) {
                main {
                    max-width: 598px;
                }
                aside {
                    max-width: 306px;
                }
            }
            @media (max-width: 768px) {
                main {
                    max-width: 100%;
                }
                aside {
                    max-width: 100%;
                }
            }
        }

        header {
            margin-block-end: 2rem;
            position: sticky;
            z-index: 1;
            inset-block-start: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding-block-start: var(--space-12);
            padding-block-end: 1rem;
            background-color: var(--color-bgcolor-neutral-primary);
            &.hasScroll {
                border-block-end: 1px solid var(--color-border-neutral);
            }
            @media (max-width: 768px) {
                padding-block-start: var(--space-10);
            }

            h1 {
                color: var(--color-fgcolor-neutral-primary);

                /* Desktop/Title XL */
                font-family: var(--font-family-brand, 'Aeonik Pro');
                font-size: var(--font-size-xxxl, 32px);
                font-style: normal;
                font-weight: 400;
                line-height: 140%; /* 44.8px */
                letter-spacing: -0.144px;
                @media (max-width: 768px) {
                    font-size: var(--font-size-xxl, 28px);
                }
            }
        }

        footer {
            position: sticky;
            inset-block-end: 0;
            display: flex;
            gap: var(--gap-m);
            justify-content: flex-end;
            padding-block: 1rem;
            border-block-start: 1px solid var(--color-border-neutral);
            background-color: var(--color-bgcolor-neutral-primary);
            @media (max-width: 767.99px) {
                flex-direction: column-reverse;
            }
        }
    }
</style>
