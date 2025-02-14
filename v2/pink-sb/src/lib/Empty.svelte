<script lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import Text from '$lib/typography/Text.svelte';
    import Image from './Image.svelte';
    import Stack from './layout/Stack.svelte';

    export let type: 'primary' | 'secondary' = 'primary';
    export let title: string;
    export let description: string = '';
    export let src: string = '';
</script>

<div class="empty">
    <Stack gap="l">
        {#if src}
            <Image {src} alt="Empty State" height={235} />
        {/if}
        <header>
            {#if type === 'primary'}
                <Title size="s">{title}</Title>
            {:else if type === 'secondary'}
                <Text variant="m-600">{title}</Text>
            {/if}
            <Text><slot name="description">{description}</slot></Text>
        </header>
    </Stack>
    <footer>
        <slot name="actions" />
    </footer>
</div>

<style lang="scss">
    .empty {
        display: flex;
        padding: var(--space-10);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap-xl);

        @container card (width < 400px) {
            --button-width: 100%;
            padding: var(--space-7);
        }

        header,
        footer {
            width: 100%;
        }
        header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--gap-xs);
            text-align: center;
        }
        footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--gap-s);

            @container card (width < 400px) {
                flex-direction: column-reverse;
            }
        }
    }
</style>
