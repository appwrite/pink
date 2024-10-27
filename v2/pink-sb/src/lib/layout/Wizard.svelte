<script>
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
</script>

<section class="wizard">
    <div class="wizard-container">
        <div>
            <header>
                <Stack gap="xl" justifyContent="space-between" direction="row" alignItems="center">
                    <Title size="s">{title}</Title>
                    {#if href}
                        <LinkButton icon variant="ghost" size="s" {href}>
                            <Icon icon={IconX} />
                        </LinkButton>
                    {:else}
                        <Button icon variant="ghost" size="s" on:click={buttonMethod}>
                            <Icon icon={IconX} />
                        </Button>
                    {/if}
                </Stack>
            </header>
            <div class="wizard-content" class:invert-columns={invertColumns}>
                <main>
                    <slot />
                </main>
                <aside>
                    <slot name="aside" />
                </aside>
            </div>
        </div>
        {#if $$slots.footer}
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
        padding-inline: var(--space-10);
        background-color: var(--color-bgcolor-neutral-primary);

        &-container {
            max-inline-size: 1440px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: space-between;
        }

        &-content {
            display: flex;
            gap: 2rem;
            height: 100%;

            @media (max-width: 1127.99px) {
                flex-direction: column;
            }

            main {
                flex: 2.25;
            }
            aside {
                flex: 1;
            }

            &.invert-columns {
                flex-direction: row-reverse;
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
            padding-block-start: 2rem;
            padding-block-end: 1rem;
            background-color: var(--color-bgcolor-neutral-primary);
            // @media (min-width: 768px) {
            //     border: var(--border-width-s, 1px) solid var(--color-border-neutral);
            // }
        }

        footer {
            position: sticky;
            inset-block-end: 0;
            display: flex;
            gap: 1rem;
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
