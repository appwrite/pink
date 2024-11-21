<script context="module" lang="ts">
    import { Navbar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Navigation/Navbar',
        component: Navbar.Appwrite,
        args: {
            logo: {
                src: 'https://appwrite.io/images/logos/logo.svg',
                alt: 'Logo Appwrite'
            },

            avatar: 'https://cloud.appwrite.io/v1/avatars/initials?name=Walter%20Obrian&width=80&height=80&project=console'
        },
        argTypes: {
            hasSearch: {
                control: false
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

<Story name="Appwrite" let:args>
    <Navbar.Appwrite {...args} />
</Story>
