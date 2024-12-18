<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import { IconUpload } from '@appwrite.io/pink-icons-svelte';
    import { createEventDispatcher, onMount } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = HTMLAttributes<HTMLInputElement> & {
        files: FileList;
    } & Partial<{
            extensions: string[];
            required: boolean;
            disabled: boolean;
            multiple: boolean;
            folder: boolean;
        }>;

    /**
     * The list of files.
     */
    export let files: $$Props['files'];
    export let extensions: $$Props['extensions'] = [];
    export let required: $$Props['required'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let multiple: $$Props['multiple'] = false;
    export let folder: $$Props['folder'] = false;

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

    $: inputAttributes = {
        type: 'file',
        style: 'display: none',
        accept: extensions?.map((n) => `.${n}`).join(',') ?? '',
        required,
        multiple,
        ...(folder
            ? {
                  webkitdirectory: true,
                  directory: true,
                  mozdirectory: true
              }
            : {})
    };
</script>

<input on:change={handleChange} bind:this={input} {...inputAttributes} on:invalid />

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
        <Stack alignItems="center" gap="xl">
            <span class="upload-icon">
                <Icon icon={IconUpload} />
            </span>
            <slot></slot>
        </Stack>
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

    .upload-icon {
        display: flex;
        width: 3rem;
        height: 3rem;
        padding: 0.75rem;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 99999px;
        border: 1px solid var(--color-border-neutral);
        background: var(--color-bgColor-neutral-primary);

        /* box-shadow/neutral/S */
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);
    }
</style>
