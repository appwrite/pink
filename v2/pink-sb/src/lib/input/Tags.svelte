<script lang="ts">
    import Base from './Base.svelte';
    import Icon from '$lib/Icon.svelte';
    import type { States } from './types.js';
    import { createTagsInput, melt } from '@melt-ui/svelte';
    import { IconX } from '@appwrite.io/pink-icons-svelte';
    import type { ComponentType } from 'svelte';

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
        required: boolean;
        leadingIcon?: ComponentType;
    }>;

    export let state: States = 'default';
    export let disabled: $$Props['disabled'] = false;
    export let label: $$Props['label'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let id: $$Props['id'] = undefined;
    export let helper: $$Props['helper'] = undefined;
    export let pattern: $$Props['pattern'] = undefined;
    export let placeholder: $$Props['placeholder'] = undefined;
    export let required: $$Props['required'] = false;
    export let leadingIcon: $$Props['leadingIcon'] = undefined;

    let tagValue: string;

    const handleInput = (e: KeyboardEvent) => {
        /**
         * Allow form submit and tab input switch
         */
        if (tagValue === '' && ['Enter', 'Tab', ','].includes(e.key)) {
            return;
        }

        if (['Enter', 'Tab', ' ', ','].includes(e.key)) {
            e.preventDefault();
            if (pattern && !new RegExp(pattern).test(tagValue)) {
                helper = 'Invalid value';
                state = 'error';
                return;
            }
            addTag(tagValue);
            tagValue = '';
        }
    };

    const {
        elements: { root, input, tag, deleteTrigger, edit },
        states: { tags },
        helpers: { addTag }
    } = createTagsInput({
        trim: true,
        blur: 'add',
        unique: true,
        addOnPaste: true,
        defaultTags: value,
        placeholder,
        add(tag) {
            const segments = tag.trim().split(' ');
            if (segments.length > 1) {
                for (const [index, value] of segments.entries()) {
                    // if last
                    if (index === segments.length - 1) {
                        return { id: value, value };
                    }
                    addTag(value);
                }
            }
            return { id: tag, value: tag };
        }
    });

    tags.subscribe((tags) => {
        value = tags.map((tag) => tag.value);
    });
</script>

<Base {id} {label} {helper} {state} {required} {leadingIcon}>
    <slot name="info" slot="info" />
    <div
        class="input"
        use:melt={$root}
        class:disabled
        class:success={state === 'success'}
        class:warning={state === 'warning'}
        class:error={state === 'error'}
    >
        {#each $tags as t}
            <div use:melt={$tag(t)} class="tag">
                <span>{t.value}</span>
                <button type="button" use:melt={$deleteTrigger(t)}>
                    <Icon size="s" icon={IconX} />
                </button>
            </div>
            <div use:melt={$edit(t)} class="edit" />
        {/each}
        <input
            on:input
            on:invalid
            on:change
            on:keydown={handleInput}
            use:melt={$input}
            {pattern}
            {id}
            bind:value={tagValue}
            required={required && !$tags?.length}
        />
    </div>
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    div[hidden] {
        display: initial;
    }

    .input {
        @include transitions.common;
        padding-block: var(--space-3);
        flex-wrap: wrap;
        display: flex;
        gap: var(--space-5);
        align-items: center;
        width: 100%;
        border: var(--border-width-s) solid var(--border-neutral);
        border-radius: var(--border-radius-s);
        background-color: var(--bgcolor-neutral-default);
        padding-inline: var(--space-6);
        outline-offset: calc(var(--border-width-s) * -1);

        input {
            padding-inline: 0;
            border: none;
            display: block;
            background: none;

            &:disabled {
                color: var(--fgcolor-neutral-tertiary);
            }
            &::placeholder {
                color: var(--fgcolor-neutral-tertiary);
            }
        }
        &:hover:not(:focus-within):not(.disabled) {
            border: var(--border-width-s) solid var(--border-focus);
        }
        &:focus-within {
            outline: var(--border-width-l) solid var(--border-focus);
        }
        &.disabled {
            background-color: var(--bgcolor-neutral-tertiary);
        }
        &.success {
            border-color: var(--border-success);
        }
        &.warning {
            border-color: var(--border-warning);
        }
        &.error {
            border-color: var(--border-error);
        }

        .tag {
            display: inline-flex;
            padding: var(--space-1) var(--space-3);
            justify-content: center;
            align-items: center;
            gap: var(--space-3, 6px);
            border-radius: var(--border-radius-xs);
            border: var(--border-width-s) solid var(--border-neutral);
            background: var(--bgcolor-neutral-default);

            line-height: 140%;
            font-size: var(--badge-font-size, var(--font-size-s));

            &:hover {
                background: var(--bgcolor-neutral-secondary);
            }
            &:active {
                background: var(--bgcolor-neutral-secondary);
            }
            &:focus-visible {
                outline: var(--border-width-l) solid var(--border-focus);
            }

            span {
                color: var(--fgcolor-neutral-secondary);
                font-family: var(--font-family-sansserif), var(--sans-fallbacks);
                font-size: var(--font-size-xs);
                font-style: normal;
                font-weight: 500;
                line-height: 130%;
                letter-spacing: -0.12px;
            }

            button {
                display: inline-flex;
            }
        }

        .edit {
            color: var(--fgcolor-neutral-secondary);
            font-family: var(--font-family-sansserif), var(--sans-fallbacks);
            font-size: var(--font-size-xs);
            font-style: normal;
            font-weight: 500;
            line-height: 130%;
            letter-spacing: -0.12px;
            padding: var(--space-1) var(--space-3);
        }
    }
</style>
