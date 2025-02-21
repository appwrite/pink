<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    type $$Props = HTMLAnchorAttributes & Partial<{ disabled: boolean; selected: boolean }>;

    export let href: $$Props['href'] = '';
    export let disabled: $$Props['disabled'] = false;
    export let selected: $$Props['selected'] = false;
    export let tabindex: $$Props['tabindex'] = undefined;
</script>

<a
    {href}
    {...$$restProps}
    tabindex={disabled ? -1 : tabindex}
    aria-disabled={disabled ? 'true' : undefined}
    class:selected><slot /></a
>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    a {
        @include transitions.common;

        display: flex;
        width: 32px;
        height: 32px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border: var(--border-width-s) solid transparent;
        border-radius: var(--border-radius-s);

        &:hover {
            background-color: var(--color-bgcolor-neutral-secondary);
            border: var(--border-width-s) solid var(--color-bgcolor-neutral-secondary);
        }
        &:active,
        &.selected {
            background-color: var(--color-bgcolor-neutral-tertiary);
            border: var(--border-width-s) solid var(--color-bgcolor-neutral-tertiary);
        }
        &:focus-visible {
            outline: var(--border-width-l) solid var(--color-border-focus);
        }

        &[aria-disabled='true'] {
            opacity: 0.4;
            pointer-events: none;
        }

        &:focus-visible {
            outline: var(--border-width-l) solid var(--color-border-focus);
        }
    }
</style>
