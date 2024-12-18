<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    type $$Props = HTMLAnchorAttributes & {
        href: string;
    } & Partial<{
            disabled: boolean;
            active: boolean;
        }>;

    export let href: $$Props['href'];
    export let disabled: $$Props['disabled'] = false;
    export let active: $$Props['active'] = false;
</script>

<a
    role="tab"
    {href}
    on:keydown
    {...$$restProps}
    class:active
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
>
    <slot />
</a>

<style lang="scss">
    @use 'tabs';
    a {
        @include tabs.base;
    }
</style>
