<script>
    import Checkbox from '$lib/selector/Checkbox.svelte';
    /**
     * @type {boolean} disabled
     */
    export let disabled;
    /**
     * @type {string|number|boolean|null} value
     */
    export let value;

    let checked = value === null;

    /**
     * The current value is parked when an input is "nulled".
     * @type {string|number|boolean} parked_value
     */
    let parked_value;
    /**
     * @param {CustomEvent<boolean>} event
     */
    function park_value(event) {
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
    <Checkbox bind:checked on:change={park_value} size="small" />
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
