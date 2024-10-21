<script lang="ts">
    import { IconDuplicate, IconEye, IconEyeOff } from '@appwrite.io/pink-icons-svelte';

    export let text: string;
    export let autoHideTimeoutMs = 10000;
    let isVisible: boolean = false;
    let timeout: NodeJS.Timeout;

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
    <button title="Copy to clipboard" on:click={copyToClipboard}><IconDuplicate /></button>
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

        color: var(--color-fgColor-neutral-secondary, #56565c);

        /* Desktop/Code M */
        font-family: var(--font-family-code, 'Fira Code');
        font-size: var(--font-size-S, 14px);
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 19.6px */
    }
</style>
