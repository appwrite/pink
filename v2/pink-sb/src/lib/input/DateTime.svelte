<script lang="ts">
    import Base from './Base.svelte';
    import type { States } from './types.js';
    import type { ComponentType } from 'svelte';
    import { autofocusInput } from './autofocus.js';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type $$Props = Omit<HTMLInputAttributes, 'type'> &
        Partial<{
            label: string;
            state: States;
            helper: string;
            nullable: boolean;
            autofocus: boolean;
            type: 'date' | 'time' | 'datetime-local';
            leadingIcon?: ComponentType;
        }>;

    export let state: States = 'default';
    export let type: $$Props['type'] = 'date';
    export let disabled: $$Props['disabled'] = false;
    export let label: $$Props['label'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let id: $$Props['id'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let readonly: $$Props['readonly'] = false;
    export let required: $$Props['required'] = false;
    export let autofocus: $$Props['autofocus'] = false;
    export let leadingIcon: $$Props['leadingIcon'] = undefined;

    function openPicker(event: Event) {
        const target = event.currentTarget as HTMLInputElement;
        if (typeof target.showPicker === 'function') {
            target.showPicker();
        } else {
            target.focus();
        }
    }
</script>

<Base {id} {label} {helper} {state} {required} {leadingIcon}>
    <slot name="info" slot="info" />
    <div
        class="input"
        class:disabled
        class:readonly
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        <slot name="start" />
        {#key type}
            <input
                on:input
                on:invalid
                on:change
                bind:value
                {...{ type }}
                {disabled}
                {readonly}
                {required}
                {id}
                {...$$restProps}
                on:click={openPicker}
                use:autofocusInput={autofocus}
            />
        {/key}
        <slot name="end" />
    </div>
</Base>

<style lang="scss">
    @use './input';
    @use '../../scss/mixins/transitions';

    .input {
        @include transitions.common;
        @include input.wrapper;

        .limits {
            color: var(--fgcolor-neutral-tertiary);
        }

        input {
            @include input.input;
        }
        @include input.state;
    }
</style>
