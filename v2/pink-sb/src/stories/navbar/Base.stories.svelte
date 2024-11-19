<script context="module" lang="ts">
    import { Navbar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Navbar/Base',
        component: Navbar.Base,
        args: {
            logo: {
                src: 'https://appwrite.io/images/logos/logo.svg',
                alt: 'Logo Appwrite'
            },
            links: [
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Contact', href: '/contact' }
            ],
            avatar: 'https://cloud.appwrite.io/v1/avatars/initials?name=Walter%20Obrian&width=80&height=80&project=console'
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    let searchValue = '';
</script>

<Template let:args>
    <Navbar.Base {...args} bind:searchValue />
    Search: {searchValue}
</Template>

<Story name="Default" args={{ hasSearch: false }} />
<Story name="Search" args={{ hasSearch: true }} />
