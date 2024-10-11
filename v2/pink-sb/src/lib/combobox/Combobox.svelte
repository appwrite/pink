<script lang="ts">
    import type { ComboboxOption, ComboboxProps } from '$lib/combobox/index.js';

    export let placeholder: ComboboxProps['placeholder'] = '';
    export let disabled: ComboboxProps['disabled'] = false;
    export let options: ComboboxProps['options'] = [];
    export let label: ComboboxProps['label'] = '';

    $: hasFocus = true;
    let currentActiveIndex: number | null = null;
    let selectedOption: ComboboxOption | null = null;
    let filteredOptions = options;
    let inputTextValue: string | null = null;
    $: hasScroll = detectScroll();

    function detectScroll(): boolean {}

    function selectOption(optionIndex: number) {
        selectedOption = filteredOptions[optionIndex];
        inputTextValue = selectedOption.value;
        hasFocus = false;
        currentActiveIndex = null;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (hasFocus) {
            switch (event.key) {
                case 'ArrowUp':
                    if (currentActiveIndex !== null && currentActiveIndex > 0) {
                        currentActiveIndex--;
                    } else if (currentActiveIndex === 0) {
                        currentActiveIndex = null;
                    }

                    break;
                case 'ArrowDown':
                    if (currentActiveIndex !== null && currentActiveIndex < options.length - 1) {
                        currentActiveIndex++;
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
                    setTimeout(() => {
                        hasFocus = false;
                        currentActiveIndex = null;
                        filteredOptions = options;
                    }, 100);
                }}
                bind:value={inputTextValue}
                on:input={() => {
                    filteredOptions = options.filter((option) =>
                        option.value.toLowerCase().includes(inputTextValue.toLowerCase())
                    );
                }}
            />
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                />
            </svg>
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
