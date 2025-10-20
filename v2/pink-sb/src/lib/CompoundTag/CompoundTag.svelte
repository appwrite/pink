<script lang="ts">
    type $$Props = {
        size?: 'xs' | 's' | 'm';
    };

    export let size: $$Props['size'] = 'm';
</script>

<div
    class="compound-tag"
    class:xs={size === 'xs'}
    class:s={size === 's'}
    class:m={size === 'm'}
>
    <slot />
</div>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    .compound-tag {
        @include transitions.common;

        --p-compound-tag-font-family:
            var(--badge-font-family, var(--font-family-sansserif)), var(--sans-fallbacks);
        --p-compound-tag-font-size: var(--badge-font-size, var(--font-size-s));
        --p-compound-tag-padding-block: var(--badge-padding-block, var(--space-3));
        --p-compound-tag-padding-inline: var(--badge-padding-inline, var(--space-5));
        --p-compound-tag-gap: var(--badge-gap, var(--space-3));
        --p-compound-tag-color: var(--tag-color, var(--fgcolor-neutral-secondary));
        --p-compound-tag-background-color: var(--tag-background-color, var(--bgcolor-neutral-default));
        --p-compound-tag-border-color: var(--border-neutral);
        --p-compound-tag-divider-color: var(--border-neutral);

        display: inline-flex;
        align-items: stretch;
        background-color: var(--p-compound-tag-background-color);
        border: var(--border-width-s) solid var(--p-compound-tag-border-color);
        border-radius: var(--border-radius-XS, 6px);
        overflow: hidden;

        &.xs {
            --p-compound-tag-font-size: var(--font-size-xs);
            --p-compound-tag-padding-block: var(--space-1);
            --p-compound-tag-padding-inline: var(--space-3);
        }

        &.s {
            --p-compound-tag-padding-block: var(--space-1);
            --p-compound-tag-padding-inline: var(--space-3);
        }
    }
</style>
