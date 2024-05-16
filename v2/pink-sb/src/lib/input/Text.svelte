<script>
    import Base from './Base.svelte';

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
     * @type {string}
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
        <input {id} {name} {disabled} {required} {placeholder} bind:value type="text" />
        <slot name="end" />
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
        padding-inline: var(--space-6);
        outline-offset: var(--border-width-l);

        input {
            width: 100%;
            padding-block: var(--space-3);
            &:disabled {
                color: var(--color-fgcolor-neutral-tertiary);
            }
            &::placeholder {
                color: var(--color-fgcolor-neutral-tertiary);
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
