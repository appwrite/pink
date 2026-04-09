<script lang="ts">
    import Action from './Action.svelte';
    import Base from './Base.svelte';
    import { IconEye, IconEyeOff } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';
    import { autofocusInput } from './autofocus.js';
    import type { ComponentType } from 'svelte';

    type $$Props = Omit<HTMLInputAttributes, 'type'> &
        Partial<{
            label: string;
            state: States;
            helper: string;
            showPassword: boolean;
            autofocus: boolean;
            leadingIcon?: ComponentType;
        }>;

    export let state: States = 'default';
    export let showPassword: $$Props['showPassword'] = false;
    export let value: $$Props['value'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let required: $$Props['required'] = false;
    export let autofocus: $$Props['autofocus'] = false;
    export let leadingIcon: $$Props['leadingIcon'] = undefined;
</script>

<Base id={$$props.id} {label} {helper} {state} {required} {leadingIcon}>
    <slot name="info" slot="info" />
    <div
        class="input"
        class:disabled={$$props.disabled}
        class:readonly={$$props.readonly}
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        <slot name="start" />
        {#if showPassword}
            <input
                on:input
                on:invalid
                on:change
                type="text"
                bind:value
                {...$$restProps}
                {required}
                use:autofocusInput={autofocus}
            />
        {:else}
            <input
                on:input
                on:invalid
                on:change
                type="password"
                bind:value
                {...$$restProps}
                {required}
                use:autofocusInput={autofocus}
            />
        {/if}
        <Action
            icon={showPassword ? IconEyeOff : IconEye}
            on:click={() => (showPassword = !showPassword)}
        />
        <slot name="end" />
    </div>
</Base>

<style lang="scss">
    @use './input';
    @use '../../scss/mixins/transitions';

    .input {
        @include transitions.common;
        @include input.wrapper;

        input {
            @include input.input;
        }

        @include input.state;
    }
</style>
