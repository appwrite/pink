<script lang="ts">
    import Badge from './Badge.svelte';

    export let legend: string;
    export let badge: string | undefined = undefined;
    export let badgeVariant: 'primary' | 'secondary' | 'accent' = 'secondary';
</script>

<fieldset>
    <legend>
        <span class="legend-content">
            <span class="legend-text">{legend}</span>
            {#if badge}
                <Badge content={badge} variant={badgeVariant} size="xs" />
            {/if}
        </span>
    </legend>
    <div class="content"><slot /></div>
</fieldset>

<style lang="scss">
    fieldset {
        border-radius: var(--border-radius-s, 8px);
        border: var(--border-width-s, 1px) solid var(--border-neutral, #ededf0);
        background: var(--bgcolor-neutral-primary, #fff);
        margin-top: -8px;
    }

    legend {
        position: relative;
        margin-left: var(--space-6, 12px);
    }

    .legend-content {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2, 4px);
        padding: 0 var(--space-2, 4px);
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
