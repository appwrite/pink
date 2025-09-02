<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import type { RootProp } from '../index.js';
    import Stack from '$lib/layout/Stack.svelte';
    import { type ComponentProps, getContext } from 'svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';

    export let root: RootProp;
    export let column: string;

    let expandable: boolean;
    $: expandable = getContext<boolean>('expandable');

    let justify: ComponentProps<Stack>['justifyContent'];

    $: isFirstColumn = root.isFirstColumn(column);
    $: columnAlignment = root.getColumn(column)?.align ?? 'left';

    $: justify =
        columnAlignment === 'right'
            ? 'flex-end'
            : columnAlignment === 'center'
              ? 'center'
              : 'flex-start';
</script>

<Stack direction="row" alignItems="center" gap="xxs" justifyContent={justify}>
    <slot />
</Stack>

{#if !expandable && isFirstColumn}
    <!-- needed to balance out the empty spacing when not expandable -->
    <span class="balancing-placeholder">
        <!-- placeholder icon to fit dimensions -->
        <Icon icon={IconChevronDown} size="s"></Icon>
    </span>
{/if}

<style>
    .balancing-placeholder {
        margin-inline: 2px;
        visibility: hidden;
        touch-action: none;
        pointer-events: none;
    }
</style>
