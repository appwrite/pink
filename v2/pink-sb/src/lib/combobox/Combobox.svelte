<script lang="ts">
    import type { ComboboxOption, ComboboxProps } from '$lib/combobox/index.js';
    import { Icon } from '$lib';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';

    export let placeholder: ComboboxProps['placeholder'] = '';
    export let disabled: ComboboxProps['disabled'] = false;
    export let options: ComboboxProps['options'] = [];
    export let label: ComboboxProps['label'] = '';

    $: hasFocus = false;
    let currentActiveIndex: number | null = null;
    let selectedOption: ComboboxOption | null = null;
    let filteredOptions = options;
    let inputTextValue: string | null = null;
    // eslint-disable-next-line no-undef
    let focusTimeout: NodeJS.Timeout | null = null;

    function selectOption(optionIndex: number) {
        if (focusTimeout !== null) {
            clearTimeout(focusTimeout);
        }
        selectedOption = filteredOptions[optionIndex];
        inputTextValue = selectedOption.value;
        hasFocus = false;
        currentActiveIndex = null;
    }

    function keepActiveInView() {
        const element = document.getElementById(`option-${options[currentActiveIndex].key}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (hasFocus) {
            switch (event.key) {
                case 'ArrowUp':
                    if (currentActiveIndex !== null && currentActiveIndex > 0) {
                        currentActiveIndex--;
                        keepActiveInView();
                    } else if (currentActiveIndex === 0) {
                        currentActiveIndex = null;
                    }

                    break;
                case 'ArrowDown':
                    if (currentActiveIndex !== null && currentActiveIndex < options.length - 1) {
                        currentActiveIndex++;
                        keepActiveInView();
                    } else if (currentActiveIndex === null) {
                        currentActiveIndex = 0;
                    }
                    break;
                case 'Enter':
                    if (currentActiveIndex !== null) {
                        selectOption(currentActiveIndex);
                    }
                    break;
                default:
                    break;
            }
        }
    }
</script>

<div
    class="combobox-container"
    tabindex="0"
    on:keydown={handleKeydown}
    role="combobox"
    aria-expanded={hasFocus}
    data-active-option={currentActiveIndex ? `option-${options[currentActiveIndex].key}` : ''}
    aria-controls="comboboxoptions"
>
    <label
        ><span>{label}</span>
        <div class="combobox-input" class:disabled>
            <input
                type="text"
                {placeholder}
                {disabled}
                on:focus={() => {
                    hasFocus = true;
                }}
                on:focusout={() => {
                    focusTimeout = setTimeout(() => {
                        hasFocus = false;
                        currentActiveIndex = null;
                        filteredOptions = options;
                    }, 200);
                }}
                bind:value={inputTextValue}
                on:input={() => {
                    filteredOptions = options.filter((option) =>
                        option.value
                            .toLowerCase()
                            .includes(inputTextValue ? inputTextValue.toLowerCase() : '')
                    );
                }}
            />
            <Icon icon={IconChevronDown} />
        </div>
    </label>
    <div class="combobox-menu" class:hidden={!hasFocus || filteredOptions.length === 0}>
        <ul id="comboboxoptions" role="listbox" aria-label="Options">
            {#each filteredOptions as option, index}
                <li
                    class="option"
                    class:active={currentActiveIndex === index}
                    id={`option-${option.key}`}
                    on:mouseenter={() => {
                        currentActiveIndex = index;
                    }}
                >
                    <button
                        on:click={() => {
                            selectOption(index);
                        }}
                    >
                        {option.value}
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
    @use './combobox';

    @include combobox.base;
</style>
