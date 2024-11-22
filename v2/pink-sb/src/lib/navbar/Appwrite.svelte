<script lang="ts">
    import { Navbar, Input, Breadcrumbs, BreadcrumbsConsole, Icon } from '$lib';
    import type { BaseNavbarProps } from '$lib/navbar/Base.svelte';
    import { IconBell, IconSearch } from '@appwrite.io/pink-icons-svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import { Button } from '$lib/link/index.js';

    type $$Props = BaseNavbarProps & {
        links: Array<{ label: string; href: string }>;
        organizations: Array<{
            name: string;
            id: string;
            isSelected?: boolean;
            tier: string;
            projects: Array<{ name: string; id: string }>;
        }>;
    };

    export let logo: $$Props['logo'];
    export let organizations: $$Props['organizations'];
    export let avatar: $$Props['avatar'];
</script>

<Navbar.Base {...$$props}>
    <div slot="left" class="left">
        <img src={logo.src} alt={logo.alt} class="only-desktop" />
        <BreadcrumbsConsole {organizations} />
    </div>
    <div slot="right" class="right">
        <Stack gap="l" direction="row">
            <Button variant="quiet" size="m">Feedback</Button>
            <Button variant="quiet" size="m">Support</Button>
        </Stack>
        <div class="icons">
            <Button variant="quiet-muted"><Icon icon={IconSearch} /></Button>
            <Button variant="quiet-muted"><Icon icon={IconBell} /></Button>
        </div>
        <Button><img src={avatar} alt={'Avatar'} class="avatar" /></Button>
    </div>
</Navbar.Base>

<style lang="scss">
    .left {
        display: flex;
        gap: 17px;
        align-items: center;
        flex-shrink: 0;
    }

    .right {
        display: flex;
        align-items: center;
        gap: var(--space-9, 24px);

        .icons {
            display: flex;
            gap: var(--space-5, 10px);
        }

        img {
            max-inline-size: none;
            max-block-size: none;
        }
    }

    .avatar {
        width: 32px;
        aspect-ratio: 1 /1;
        border-radius: var(--border-radius-circle, 99999px);
    }

    .only-desktop {
        display: none;
    }
    .only-mobile {
        display: block;
    }
    .sideNavToggle {
        display: flex;
        width: 28px;
        height: 28px;
        padding: var(--space-3, 6px);
        justify-content: center;
        align-items: center;
        gap: var(--space-4, 8px);
        border-radius: var(--border-radius-xs, 6px);
        border: var(--border-width-s, 1px) solid var(--color-border-neutral-strong, #d8d8db);
        background: var(--color-bgcolor-neutral-primary, #fff);
        cursor: pointer;
    }

    @media (min-width: 768px) {
        .only-desktop {
            display: block;
        }
        .only-mobile {
            display: none;
        }
    }
</style>
