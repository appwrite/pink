<script lang="ts">
    import { Navbar, Input, Breadcrumbs } from '$lib';
    import type { BaseNavbarProps } from '$lib/navbar/Base.svelte';

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
</script>

<Navbar.Base {...$$props}>
    <div slot="left" class="left">
        <img src={logo.src} alt={logo.alt} class="only-desktop" />
        <Breadcrumbs crumbs={[]} />
    </div>
    <div slot="right">rechts</div>
</Navbar.Base>

<style lang="scss">
    .left {
        display: flex;
        gap: 17px;
        align-items: center;
        flex-shrink: 0;

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
