<script>
    import { createToggleGroup } from '@melt-ui/svelte';
    import { createEventDispatcher } from 'svelte';

    /**
     * @typedef {Object} GroupItem
     * @property {string} id
     * @property {string} label
     * @property {boolean} disabled
     * @property {typeof import('svelte').SvelteComponent} icon
     */
    /**
     * @type {GroupItem[]} buttons
     */
    export let buttons;
    /**
     * @type {string}
     */
    export let label;
    /**
     * @type {string|undefined}
     */
    export let active = undefined;

    const {
        elements: { root, item },
        states: { value }
    } = createToggleGroup({
        type: 'single',
        onValueChange: ({ curr, next }) => {
            if (next === undefined || Array.isArray(next)) return curr;
            active = next;

            return next;
        }
    });

    $: value.set(active ?? undefined);
</script>

<div {...$root} use:root aria-label={label}>
    {#each buttons as button}
        <button {...$item(button.id)} use:item aria-label={button.label} disabled={button.disabled}>
            <svelte:component this={button.icon} />
        </button>
    {/each}
</div>

<style lang="scss">
    @use '../scss/mixins/transitions';

    div {
        @include transitions.common;

        display: inline-flex;
        padding: var(--space-1);
        gap: var(--space-3);

        border-radius: var(--border-radius-s);
        border: 1px solid var(--color-border-neutral);
        background: var(--color-bgcolor-neutral-default);

        button {
            @include transitions.common;

            display: inline-flex;
            padding: var(--space-2);
            border-radius: var(--border-radius-xs);
            outline-offset: var(--border-width-l);

            &:not(:disabled) {
                cursor: pointer;
            }

            &[aria-checked='true'] {
                background: var(--color-bgcolor-neutral-tertiary);
            }

            &:hover:not(&[aria-checked='true']):not(:disabled) {
                background: var(--color-overlay-button-secondary-hover);
            }

            &:disabled {
                opacity: 0.4;
            }

            &:focus-visible {
                outline: var(--border-width-l) solid var(--color-border-focus);
            }
        }
    }
</style>
