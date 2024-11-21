<script lang="ts">
    import Base from './Base.svelte';
    import type { States } from './types.js';
    import { createTagsInput } from '@melt-ui/svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';

    type $$Props = Partial<{
        label: string;
        id: string;
        disabled: boolean;
        state: States;
        helper: string;
        nullable: boolean;
        value: string[];
        pattern: string;
        placeholder: string;
    }>;

    export let state: States = 'default';
    export let disabled: $$Props['disabled'] = false;
    export let label: $$Props['label'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let id: $$Props['id'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let pattern: $$Props['pattern'] = undefined;
    export let placeholder: $$Props['placeholder'] = undefined;

    const {
        elements: { root, input, tag, deleteTrigger, edit },
        states: { tags }
    } = createTagsInput({
        trim: true,
        unique: true,
        addOnPaste: true,
        defaultTags: value,
        placeholder,
        add(tag) {
            return { id: tag, value: tag };
        }
    });

    tags.subscribe((tags) => {
        value = tags.map((tag) => tag.value);
    });
</script>

<Base {id} {label} {helper} {state}>
    <div
        class="input"
        {...$root}
        use:root
        class:disabled
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        {#each $tags as t}
            <div {...$tag(t)} use:tag>
                <span>{t.value}</span>
                <button {...$deleteTrigger(t)} use:deleteTrigger>
                    <Icon icon={IconX} />
                </button>
            </div>
            <div {...$edit(t)} use:edit />
        {/each}
        <input on:input on:invalid on:change use:input {pattern} {id} {...$input} />
    </div>
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    div[hidden] {
        display: initial;
    }

    .input {
        @include transitions.common;

        display: flex;
        gap: var(--space-5);
        align-items: center;
        width: 100%;
        border: var(--border-width-s) solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);
        background-color: var(--color-bgcolor-neutral-default);
        padding-inline: var(--space-6);
        outline-offset: calc(var(--border-width-s) * -1);

        .limits {
            color: var(--color-fgcolor-neutral-tertiary);
        }

        input {
            inline-size: 100%;
            padding-block: var(--space-3);
            padding-inline: 0;
            border: none;
            display: block;
            block-size: 2.5rem;
            background: none;

            &:disabled {
                color: var(--color-fgcolor-neutral-tertiary);
            }
            &::placeholder {
                color: var(--color-fgcolor-neutral-tertiary);
            }
        }
        &:hover:not(:focus-within):not(.disabled) {
            border: var(--border-width-s) solid var(--color-border-focus);
        }
        &:focus-within {
            outline: var(--border-width-l) solid var(--color-border-focus);

            .limits {
                color: var(--color-fgcolor-neutral-secondary);
            }
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
