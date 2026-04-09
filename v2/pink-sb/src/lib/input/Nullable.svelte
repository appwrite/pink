<script lang="ts">
    import Checkbox from '$lib/selector/Checkbox.svelte';

    export let value: string | number | boolean | bigint | undefined | null;

    $: checked = value === null || value === undefined || value === '';
    $: hasValidContent = value !== null && value !== undefined && value !== '';

    function change(event: CustomEvent<boolean>) {
        const isChecked = event.detail;

        if (isChecked) {
            value = null;
        } else if (!hasValidContent) {
            checked = true;
        }
    }
</script>

<span>
    <Checkbox
        size="s"
        bind:checked
        on:change={change}
        showDisabledState={false}
        disabled={!hasValidContent}
    />
    NULL
</span>

<style lang="scss">
    span {
        display: inline-flex;
        align-items: center;
        gap: var(--space-3);
        color: var(--fgcolor-neutral-tertiary);
        font-size: var(--font-size-xs);
    }
</style>
