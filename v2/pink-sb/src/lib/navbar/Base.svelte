<script context="module" lang="ts">
    export type BaseNavbarProps = {
        logo: {
            src: string;
            alt: string;
        };
        links: Array<{ label: string; href: string }>;
        avatar: string;
        hasSearch?: boolean;
    };
</script>

<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import Stack from '$lib/layout/Stack.svelte';
    import { Input } from '$lib';
    import { IconSearch } from '@appwrite.io/pink-icons-svelte';
    import Icon from '$lib/Icon.svelte';

    type $$Props = BaseNavbarProps & HTMLAttributes<'nav'>;

    export let logo: $$Props['logo'];
    export let links: $$Props['links'];
    export let avatar: $$Props['avatar'];
    export let hasSearch: $$Props['hasSearch'] = false;
    export let searchValue: string;
</script>

<nav>
    <div class="logo-links">
        <img src={logo.src} alt={logo.alt} />
        <Stack gap="xl" direction="row">
            {#each links as link}
                <a href={link.href}>{link.label}</a>
            {/each}
        </Stack>
    </div>

    <div>
        <Stack gap="l" direction="row" alignItems="center">
            {#if hasSearch}
                <Input.Text placeholder="Search" bind:value={searchValue}>
                    <Icon slot="start" icon={IconSearch} />
                </Input.Text>
            {/if}
            <img src={avatar} alt={'Avatar'} class="avatar" />
        </Stack>
    </div>
</nav>

<style lang="scss">
    nav {
        display: flex;
        width: 100%;
        max-height: 48px;
        padding: var(--space-4, 8px) var(--space-7, 16px);
        justify-content: space-between;
        align-items: center;

        border-bottom: var(--border-width-s, 1px) solid var(--color-border-neutral-weak, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
    }

    .logo-links {
        display: flex;
        gap: 17px;
        align-items: center;

        a {
            color: var(--color-fgcolor-accent-neutral, #19191c);

            /* Desktop/Body M 400 */
            font-family: var(--font-family-sansserif, Inter);
            font-size: var(--font-size-s, 14px);
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.063px;
        }
    }

    .avatar {
        width: 32px;
        aspect-ratio: 1 /1;
        border-radius: var(--border-radius-circle, 99999px);
    }
</style>
