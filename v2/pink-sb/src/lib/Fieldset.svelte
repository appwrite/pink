<script lang="ts">
    import Badge from './Badge.svelte';
    import Stack from './layout/Stack.svelte';

    export let legend: string;
    export let badge: string | undefined = undefined;
    export let badgeVariant: 'primary' | 'secondary' | 'accent' = 'secondary';
</script>

<fieldset>
    <legend>
        <span>
            <Stack inline direction="row" alignItems="center" gap="xxs">
                <span class="legend-text">{legend}</span>
                {#if badge}
                    <Badge content={badge} variant={badgeVariant} size="xs" />
                {/if}
            </Stack>
        </span>
    </legend>
    <div class="content"><slot /></div>
</fieldset>

<style lang="scss">
    fieldset {
        border-radius: var(--border-radius-s, 8px);
        border: var(--border-width-s, 1px) solid var(--border-neutral, #ededf0);
        background: var(--bgcolor-neutral-primary, #fff);
        margin: 0;
        padding: 0;
    }

    legend {
        position: relative;
        margin-left: var(--space-6, 12px);
    }

    .legend-text {
        font-family: var(--font-family-sansserif);
        font-size: var(--font-size-xs, 12px);
        font-style: normal;
        font-weight: 400;
        line-height: 130%; /* 15.6px */
        letter-spacing: -0.12px;
    }

    .content {
        margin: 16px 16px 20px 16px;
    }
</style>
