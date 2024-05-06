<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';

    export let id: string;
    export let label: string;
</script>

<div class="wrapper">
    <Stack direction="column" gap="4px">
        <label for={id}>{label}</label>
        <slot />
    </Stack>
</div>

<style lang="scss">
    @mixin typography {
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
    }

    .wrapper {
        @include typography;
    }

    label {
        @include typography;
        color: #414146;
    }
</style>
