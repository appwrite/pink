<script lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import Text from '$lib/typography/Text.svelte';

    export let type: 'primary' | 'secondary' = 'primary';
    export let title: string;
    export let description: string;
</script>

<div class="empty">
    <header>
        {#if type === 'primary'}
            <Title size="small">{title}</Title>
        {:else if type === 'secondary'}
            <Text variant="m-600">{title}</Text>
        {/if}
        <Text>{description}</Text>
    </header>
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
