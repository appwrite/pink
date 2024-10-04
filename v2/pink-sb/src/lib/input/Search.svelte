<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import Icon from '$lib/Icon.svelte';
    import { IconSearch } from '@appwrite.io/pink-icons-svelte';
    import { Input } from '$lib/index.ts';
    import Keyboard, { SpecialCharacter } from '$lib/Keyboard.svelte';

    type $$Props = HTMLInputAttributes &
        Partial<{
            label: string;
        }>;

    export let disabled: $$Props['disabled'] = false;
    export let label: $$Props['label'] = undefined;
    export let value: $$Props['value'] = undefined;
</script>

<Input.Text {disabled} {label} bind:value>
    <Icon slot="start" icon={IconSearch} />
    <svelte:fragment slot="end">
        <Keyboard key={`${SpecialCharacter.Command}+k`}></Keyboard>
    </svelte:fragment>
</Input.Text>
