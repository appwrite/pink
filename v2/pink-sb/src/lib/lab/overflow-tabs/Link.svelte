<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { RootContext } from './types.ts';
    import { onMount } from 'svelte';

    type $$Props = HTMLAnchorAttributes & {
        href: string;
        root: RootContext;
    } & Partial<{
            disabled: boolean;
            active: boolean;
            noscroll: boolean;
        }>;

    export let root: $$Props['root'];
    export let href: $$Props['href'];
    export let disabled: $$Props['disabled'] = false;
    export let active: $$Props['active'] = false;
    export let noscroll: $$Props['noscroll'] = false;

    $: width = 0;

    onMount(() => {
        root.updateTabWidth(width);
    });
</script>

<a
    bind:clientWidth={width}
    role="tab"
    {href}
    on:keydown
    {...$$restProps}
    class:active
    class:tab-primary={root.variant === 'primary'}
    class:tab-secondary={root.variant === 'secondary'}
    class:tab-stretch={root.stretch}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    data-sveltekit-noscroll={noscroll}
>
    <slot />
</a>

<style lang="scss">
    @use 'tabs';

    a {
        @include tabs.base;
    }
</style>
