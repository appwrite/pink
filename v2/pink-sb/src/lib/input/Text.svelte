<script lang="ts">
    import Base from './Base.svelte';
    import Nullable from './Nullable.svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';

    type $$Props = HTMLInputAttributes &
        Partial<{
            label: string;
            state: States;
            helper: string;
            nullable: boolean;
        }>;

    export let state: States = 'default';
    export let type: $$Props['type'] = 'text';
    export let nullable: $$Props['nullable'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let label: $$Props['label'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let id: $$Props['id'] = undefined;
    export let maxlength: $$Props['maxlength'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let readonly: $$Props['readonly'] = false;
</script>

<Base {id} {label} {helper} {state}>
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
                {maxlength}
                {id}
                {...$$restProps}
            />
        {/key}
        {#if maxlength}
            <span class="limits">{value?.length ?? 0}/{maxlength}</span>
        {/if}
        {#if nullable}
            <Nullable bind:disabled bind:value />
        {/if}
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
            color: var(--color-fgcolor-neutral-tertiary);
        }

        input {
            @include input.input;
        }
        @include input.state;
    }
</style>
