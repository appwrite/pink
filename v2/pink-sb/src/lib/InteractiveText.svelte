<script lang="ts">
    import { IconDuplicate, IconEye, IconEyeOff } from '@appwrite.io/pink-icons-svelte';

    export let text: string;
    export let autoHideTimeoutMs = 10000;
    export let isVisible: boolean = true;
    export let variant: 'secret' | 'secret-code' | 'copy' | 'copy-code' = 'copy';
    let timeout: ReturnType<typeof setTimeout>;
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

<div
    class="interactiveTextContainer"
    role="status"
    on:mouseenter={() => {
        if (variant === 'copy' || variant === 'copy-code') {
            isVisible = true;
        }
    }}
    on:mouseleave={() => {
        if (variant === 'copy' || variant === 'copy-code') {
            isVisible = false;
        }
    }}
>
    <div class="buttons-container" class:only-copy={variant === 'copy' || variant === 'copy-code'}>
        {#if variant === 'secret' || variant === 'secret-code'}
            {#if isVisible}
                <button type="button" title="Hide text" on:click={toggleVisibility}>
                    <IconEyeOff />
                </button>
            {:else}
                <button title="Show text" on:click={toggleVisibility}>
                    <IconEye />
                </button>
            {/if}
        {/if}
        <div class="copy-container">
            <button type="button" title="Copy to clipboard" on:click={copyToClipboard}
                ><IconDuplicate /></button
            >
            <div role="tooltip" aria-hidden={!showCopySuccess}>Copied</div>
        </div>
    </div>
    {#if isVisible}
        <span class:code-text={variant === 'secret-code' || variant === 'copy-code'}>{text}</span>
    {:else if variant === 'copy'}
        <span>{text}</span>
    {:else if variant === 'copy-code'}
        <span class="code-text">{text}</span>
    {:else}
        <span class="dots">••••••••••</span>
    {/if}
</div>

<style>
    .interactiveTextContainer {
        display: flex;
        justify-content: end;
        width: fit-content;
        min-width: 132px;
        max-width: 100%;
        height: 20px;
        border-radius: var(--border-radius-xxs, 4px);
        align-items: center;
        padding: 0 var(--gap-xxs, 4px);

        &:hover {
            background: var(--overlay-neutral-hover, rgba(25, 25, 28, 0.03));
        }
    }
    .interactiveTextContainer:hover button {
        display: block;
    }
    button {
        width: var(--icon-size-S, 16px);
        height: var(--icon-size-S, 16px);
        flex-shrink: 0;
        cursor: pointer;
        color: var(--fgcolor-neutral-tertiary);
        display: none;
    }

    .dots {
        font-size: var(--font-size-m);
        line-height: var(--font-size-s, 14px);
    }

    span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex-grow: 1;

        color: var(--fgcolor-neutral-secondary, #56565c);

        /* Desktop/Code M */
        font-size: var(--font-size-s, 14px);
        font-style: normal;
        font-weight: 400;
    }

    .code-text {
        font-family: var(--font-family-code, 'Fira Code');
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
        background: var(--bgcolor-neutral-invert-weak);
        color: var(--fgcolor-on-invert);
        visibility: hidden;
        margin-top: 1.5rem;
        margin-left: -2.5rem;

        &[aria-hidden='false'] {
            visibility: visible;
        }
    }

    .buttons-container {
        position: absolute;
        display: flex;
        gap: var(--space-4, 8px);
        width: 70px;
        justify-content: end;
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            var(--bgcolor-neutral-secondary) 30%,
            var(--bgcolor-neutral-secondary) 100%
        );
    }

    .only-copy {
        width: var(--base-32, 32px);
    }
</style>
