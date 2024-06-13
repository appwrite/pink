<script>
    import Base from './Base.svelte';
    import IconChevronUp from 'pink-icons/svg/chevron-up.svelte';
    import IconChevronDown from 'pink-icons/svg/chevron-down.svelte';
    import Nullable from './Nullable.svelte';

    /**
     * The unique identifier of the input.
     * @type {string}
     */
    export let id;
    /**
     * The name of the input.
     * @type {string}
     */
    export let name;
    /**
     * The label of the input.
     * @type {string}
     */
    export let label;
    /**
     * The value of the input.
     * @type {number}
     */
    export let value;
    /**
     * Whether the input is disabled.
     * @type {boolean}
     */
    export let disabled = false;
    /**
     * Whether the input is required.
     * @type {boolean}
     */
    export let required = false;
    /**
     * The placeholder of the input.
     * @type {string}
     */
    export let placeholder = '';
    /**
     * The state of the input.
     * @type {'default' | 'success' | 'warning' | 'error'}
     */
    export let state = 'default';
    /**
     * @type {boolean} nullable
     */
    export let nullable = false;

    /** @type {HTMLInputElement} */
    let input;

    function increment() {
        input.stepUp();
    }
    function decrement() {
        input.stepDown();
    }
</script>

<Base {id} {label}>
    <div
        class="input"
        class:disabled
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        <slot name="start" />
        <input
            {id}
            {name}
            {disabled}
            {required}
            {placeholder}
            bind:this={input}
            bind:value
            type="number"
        />
        {#if nullable}
            <Nullable bind:disabled bind:value />
        {/if}
        <span class="actions">
            <button {disabled} on:click={increment}><IconChevronUp /></button>
            <button {disabled} on:click={decrement}><IconChevronDown /></button>
        </span>
    </div>
</Base>

<style lang="scss">
    @use '$scss/mixins/transitions';

    .input {
        @include transitions.common;

        display: flex;
        gap: var(--space-5);
        align-items: center;
        width: 100%;
        border: var(--border-width-s) solid var(--color-border-neutral-weak);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        padding-inline-start: var(--space-6);
        outline-offset: var(--border-width-l);
        overflow: hidden;

        input {
            width: 100%;
            padding-block: var(--space-3);
            appearance: textfield;
            -moz-appearance: textfield;

            &:disabled {
                color: var(--color-fgcolor-neutral-tertiary);
            }
            &::placeholder {
                color: var(--color-fgcolor-neutral-tertiary);
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }

        .actions {
            display: flex;
            flex-direction: column;
            border-left: var(--border-width-s) solid var(--color-border-neutral-weak);

            button {
                display: inline-flex;
                align-items: center;
                height: var(--icon-size-s);
                justify-content: center;
                padding-inline: var(--space-3);

                &:not(:disabled) {
                    &:hover {
                        background: var(--color-overlay-secondary-hover);
                    }

                    &:active {
                        background: var(--color-overlay-secondary-pressed);
                    }
                }

                :global(path) {
                    fill: currentColor;
                }
                &:first-child {
                    border-block-end: var(--border-width-s) solid var(--color-border-neutral-weak);
                }
            }
        }

        &:hover:not(:focus-within):not(.disabled) {
            border: var(--border-width-s) solid var(--color-border-focus-secondary);
        }
        &:focus-within {
            outline: var(--border-width-xl) solid var(--color-border-focus);
        }
        &.disabled {
            background-color: var(--color-bgcolor-neutral-tertiary);
        }

        &.success {
            border-color: var(--color-border-success);
        }
        &.warning {
            border-color: var(--color-border-warning);
        }
        &.error {
            border-color: var(--color-border-error);
        }
    }
</style>
