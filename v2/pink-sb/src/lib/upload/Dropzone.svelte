<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = HTMLAttributes<HTMLInputElement> & {
        files: FileList;
    } & Partial<{
            extensions: string[];
            required: boolean;
            disabled: boolean;
            multiple: boolean;
        }>;

    /**
     * The list of files.
     */
    export let files: $$Props['files'];

    export let extensions: $$Props['extensions'] = [];
    export let required: $$Props['required'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let multiple: $$Props['multiple'] = false;

    const dispatch = createEventDispatcher();

    let input: HTMLInputElement;
    let hovering = false;

    onMount(() => {
        setFiles(files);
    });
    function setFiles(value: FileList) {
        if (!value) return;
        if (multiple && files?.length) {
            const dataTransfer = new DataTransfer();
            Array.from(files).forEach((file) => dataTransfer.items.add(file));
            Array.from(value).forEach((file) => dataTransfer.items.add(file));
            files = dataTransfer.files;
            input.files = files;
        } else {
            files = value;
            input.files = value;
        }
        dispatch('change', { files });
    }

    function isFileExtensionAllowed(fileExtension: string) {
        if (extensions?.length && !extensions.includes(fileExtension)) {
            return false;
        } else {
            return true;
        }
    }
    function dropHandler(ev: DragEvent) {
        if (disabled) return;
        if (!ev.dataTransfer) return;
        ev.dataTransfer.dropEffect = 'move';
        hovering = false;
        if (!ev?.dataTransfer?.items) return;
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            const file = ev.dataTransfer.items[i].getAsFile();
            if (!file) return;
            const fileExtension = file.name.split('.').pop();
            if (!fileExtension) return;
            if (!isFileExtensionAllowed(fileExtension)) {
                dispatch('invalid', ev);

                return;
            }
            if (ev.dataTransfer.items[i].kind === 'file') {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                setFiles(dataTransfer.files);
            }
        }
    }

    const handleChange = (event: Event) => {
        const target = event.currentTarget as HTMLInputElement;
        if (!target?.files) return;

        const isValidFiles = Array.from(target.files).every((file) => {
            const fileExtension = file.name.split('.').pop();
            if (!fileExtension) return false;
            return isFileExtensionAllowed(fileExtension);
        });

        if (!isValidFiles) {
            dispatch('invalid', event);

            target.value = '';
            return;
        }

        setFiles(target.files);
    };

    $: console.log(files);
</script>

<input
    on:change={handleChange}
    bind:this={input}
    accept={extensions?.map((n) => `.${n}`).join(',') ?? ''}
    type="file"
    style="display: none"
    {required}
    {multiple}
    on:invalid
/>

<div
    role="region"
    on:drop|preventDefault={dropHandler}
    on:dragenter|preventDefault
    on:dragover|preventDefault={() => (hovering = true)}
    on:dragleave|preventDefault={() => (hovering = false)}
>
    <button
        data-dragover={hovering}
        type="button"
        on:click|preventDefault={() => input.click()}
        {disabled}
        {...$$restProps}
    >
        <slot></slot>
    </button>
</div>

<style lang="scss">
    button {
        --p-dropzone-padding: var(--dropzone-padding, var(--space-10));
        --p-dropzone-border-radius: var(--dropzone-border-radius, var(--border-radius-s));
        display: flex;
        width: 100%;
        padding: var(--p-dropzone-padding);
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: var(--p-dropzone-border-radius);
        border: var(--border-width-s, 1px) dashed var(--color-border-neutral-strong);
        background: var(--color-bgColor-neutral-default);
        &:hover:not([disabled]) {
            background: var(--color-overlay-neutral-hover);
            border-color: var(--color-border-neutral-strong);
            cursor: pointer;
        }
        &[data-dragover='true']:not([disabled]) {
            background: var(--color-overlay-neutral-hover);
            border-color: var(--color-border-neutral-strong);
        }
        &[disabled] {
            cursor: not-allowed;
            opacity: 0.4;
            border-color: var(--color-border-neutral-strong);
        }
        &:focus-visible {
            outline-offset: 2px;
            outline: var(--border-width-s) solid var(--color-border-focus-secondary);
        }
    }
</style>
