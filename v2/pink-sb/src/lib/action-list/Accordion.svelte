<script lang="ts">
    import { Accordion as AccordionBase } from '../index.js';
    import type { ComponentType } from 'svelte';

    export let open = false;
    export let title: string;
    export let icon: ComponentType | null = null;
    export let hasDivider = false;
</script>

<div class="action-list-accordion" class:action-list-accordion-divider={hasDivider}>
    <AccordionBase
        bind:title
        bind:open
        bind:icon
        hideDivider={!hasDivider}
        hasAvatarIcon={false}
        titleVariant="m-400"
        titleColor="--fgcolor-neutral-secondary"
        buttonPadding="--space-6"><slot /></AccordionBase
    >
</div>

<style lang="scss">
    @use './item';

    :global(.action-list-accordion button) {
        @include item.base;
        padding: 0;
        display: block;
    }
    :global(.action-list-accordion-divider button),
    :global(.action-list-accordion-divider .divider) {
        margin-bottom: var(--gap-xxxs);
    }
</style>
