<script lang="ts">
    import { Accordion as AccordionBase } from '../index.js';
    import type { ComponentProps, ComponentType } from 'svelte';

    export let open = false;
    export let title: string;
    export let icon: ComponentType | null = null;
</script>

<div class="action-list-accordion">
    <AccordionBase
        bind:title
        bind:open
        bind:icon
        hideDivider
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
</style>
