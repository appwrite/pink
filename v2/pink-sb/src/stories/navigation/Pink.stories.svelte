<script context="module" lang="ts">
    import { Navbar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Navigation/Navbar',
        component: Navbar.Pink,
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
            avatar: 'https://cloud.appwrite.io/v1/avatars/initials?name=Walter%20Obrian&width=80&height=80&project=console',
            hasSearch: true
        },
        argTypes: {
            hasSearch: {
                control: {
                    type: 'boolean'
                },
                options: [true, false]
            },
            logo: {
                control: false
            },
            links: {
                control: false
            },
            avatar: {
                control: false
            },
            searchValue: {
                control: false
            }
        }
    };
</script>

<Story name="Pink" let:args>
    <Navbar.Pink {...args} />
</Story>
