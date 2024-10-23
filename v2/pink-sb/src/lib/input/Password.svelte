<script lang="ts">
    import Action from './Action.svelte';
    import Base from './Base.svelte';
    import { IconEye, IconEyeOff } from '@appwrite.io/pink-icons-svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';
    import type { States } from './types.js';

    type $$Props = Omit<HTMLInputAttributes, 'type'> &
        Partial<{
            label: string;
            state: States;
            helper: string;
            showPassword: boolean;
        }>;

    export let state: States = 'default';
    export let showPassword: $$Props['showPassword'] = false;
    export let value: $$Props['value'] = undefined;
    export let label: $$Props['label'] = undefined;
    export let helper: $$Props['helper'] = undefined;
</script>

<Base id={$$props.id} {label} {helper} {state}>
    <div
        class="input"
        class:disabled={$$props.disabled}
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        {#if showPassword}
            <input on:input on:invalid on:change type="text" bind:value {...$$restProps} />
        {:else}
            <input on:input on:invalid on:change type="password" bind:value {...$$restProps} />
        {/if}
        <Action
            icon={showPassword ? IconEyeOff : IconEye}
            on:click={() => (showPassword = !showPassword)}
        />
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
