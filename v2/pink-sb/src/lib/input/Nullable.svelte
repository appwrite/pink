<script lang="ts">
    import Checkbox from '$lib/selector/Checkbox.svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    export let disabled: HTMLInputAttributes['disabled'];
    export let value: string | number | boolean | undefined | null;

    let checked = value === null;
    /**
     * The current value is parked when an input is "nulled".
     */
    let parked_value: typeof value;

    function park_value(event: CustomEvent<boolean>) {
        const is_null = event.detail;
        if (is_null && value !== null) {
            disabled = true;
            parked_value = value;
            value = null;
        } else {
            value = parked_value;
            disabled = false;
        }
    }
</script>

<span>
    <Checkbox bind:checked on:change={park_value} size="s" />
    NULL
</span>

<style lang="scss">
    span {
        display: inline-flex;
        align-items: center;
        gap: var(--space-3);
        color: var(--color-fgcolor-neutral-tertiary);
        font-size: var(--font-size-xs);
    }
</style>
