<script lang="ts">
    import { IconDuplicate, IconEye, IconEyeOff } from '@appwrite.io/pink-icons-svelte';

    export let text: string;
    export let autoHideTimeoutMs = 10000;
    let isVisible: boolean = false;
    let timeout: NodeJS.Timeout;
    let showCopySuccess = false;

    function toggleVisibility() {
        clearTimeout(timeout);
        if (isVisible) {
            isVisible = false;
        } else {
            isVisible = true;
            timeout = setTimeout(() => {
                isVisible = false;
            }, autoHideTimeoutMs);
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(text);
        showCopySuccess = true;
        setTimeout(() => {
            showCopySuccess = false;
        }, 2000);
    }
</script>

<div class="container">
    {#if isVisible}
        <span>{text}</span><button title="Hide text" on:click={toggleVisibility}
            ><IconEyeOff /></button
        >
    {:else}
        <span class="dots">••••••••••</span><button title="Show text" on:click={toggleVisibility}
            ><IconEye /></button
        >
    {/if}
    <div class="copy-container">
        <button title="Copy to clipboard" on:click={copyToClipboard}><IconDuplicate /></button>
        <div role="tooltip" aria-hidden={!showCopySuccess}>Copied</div>
    </div>
</div>

<style>
    .container {
        height: 20px;
        display: flex;
        border-radius: var(--border-radius-XXS, 4px);
        align-items: center;

        gap: var(--space-2, 4px);
        padding: 0 var(--gap-XXS, 4px);

        &:hover {
            background: var(--color-overlay-neutral-hover, rgba(25, 25, 28, 0.03));
        }
    }
    button {
        width: var(--icon-size-S, 16px);
        height: var(--icon-size-S, 16px);
        flex-shrink: 0;
        cursor: pointer;
        color: var(--color-fgcolor-neutral-tertiary);
    }

    .dots {
        font-size: var(--font-size-m);
    }

    span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex-grow: 1;

        color: var(--color-fgcolor-neutral-secondary, #56565c);

        /* Desktop/Code M */
        font-family: var(--font-family-code, 'Fira Code');
        font-size: var(--font-size-S, 14px);
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 19.6px */
    }

    .copy-container {
        display: flex;
    }

    [role='tooltip'] {
        display: inline-flex;
        width: max-content;
        position: absolute;
        padding: var(--space-2) var(--space-4);
        justify-content: center;
        align-items: center;
        gap: var(--space-0);
        border-radius: var(--border-radius-s);
        background: var(--color-bgcolor-neutral-invert-weak);
        color: var(--color-fgcolor-on-invert);
        visibility: hidden;
        margin-top: 1.5rem;
        margin-left: -2.5rem;

        &[aria-hidden='false'] {
            visibility: visible;
        }
    }
</style>
