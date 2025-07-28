<script lang="ts">
    import { Divider } from '../index.js';
    import { autofocusInput } from '$lib/input/autofocus.js';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type $$Props = HTMLInputAttributes & {
        autofocus?: boolean;
    };

    export let value: $$Props['value'] = '';
    export let type: $$Props['type'] = 'text';
    export let disabled: $$Props['disabled'] = false;
    export let readonly: $$Props['readonly'] = false;
    export let required: $$Props['required'] = false;
    export let maxlength: $$Props['maxlength'] = undefined;
    export let id: $$Props['id'] = undefined;
    export let autofocus: $$Props['autofocus'] = false;
</script>

<div class="input-text-wrapper">
    <input
        bind:value
        {...{ type }}
        {disabled}
        {readonly}
        {required}
        {maxlength}
        {id}
        {...$$restProps}
        use:autofocusInput={autofocus}
    />

    <Divider />
</div>

<style lang="scss">
    .input-text-wrapper {
        padding-block-end: 0.5rem;

        & input {
            padding: var(--space-3) var(--space-3) var(--space-3) var(--space-5);

            inline-size: 100%;
            line-height: 140%;

            &:disabled {
                color: var(--fgcolor-neutral-tertiary);
            }

            &::placeholder {
                color: var(--fgcolor-neutral-tertiary);
            }

            &:is(:-webkit-autofill, :autofill) {
                -webkit-background-clip: text;
            }

            &::-webkit-calendar-picker-indicator {
                filter: invert(0.5);
            }
        }
    }
</style>
