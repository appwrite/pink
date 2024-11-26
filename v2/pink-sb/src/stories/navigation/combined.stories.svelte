<script context="module" lang="ts">
    import { Navbar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Navigation/Combined'
    };

    const navbarProps = {
        logo: {
            src: 'https://appwrite.io/images/logos/logo.svg',
            alt: 'Logo Appwrite'
        },

        avatar: 'https://cloud.appwrite.io/v1/avatars/initials?name=Walter%20Obrian&width=80&height=80&project=console',
        organizations: [
            {
                name: 'Alpha Corp',
                id: 'org-001',
                tier: 'tier-0',
                isSelected: true,
                projects: [
                    {
                        name: 'Alpha Project A',
                        $id: 'proj-001',
                        isSelected: true
                    },
                    {
                        name: 'Alpha Project B',
                        $id: 'proj-002',
                        isSelected: false
                    },
                    {
                        name: 'Alpha Project C',
                        $id: 'proj-003',
                        isSelected: false
                    }
                ]
            },
            {
                name: 'Beta Group',
                id: 'org-002',
                tier: 'tier-1',
                isSelected: false,
                projects: [
                    {
                        name: 'Beta Project X',
                        $id: 'proj-004',
                        isSelected: false
                    },
                    {
                        name: 'Beta Project Y',
                        $id: 'proj-005',
                        isSelected: false
                    }
                ]
            },
            {
                name: 'Gamma Inc.',
                id: 'org-003',
                tier: 'tier-2',
                isSelected: false,
                projects: []
            },
            {
                name: 'Delta LLC',
                id: 'org-004',
                tier: 'auto-1',
                isSelected: false,
                projects: [
                    {
                        name: 'Delta Project Z',
                        $id: 'proj-006',
                        isSelected: false
                    }
                ]
            }
        ]
    };
</script>

<script>
    import { Sidebar } from '$lib/index.js';
    let sideBarIsOpen = false;
</script>

<Story name="Appwrite">
    <div>
        <Navbar.Appwrite {...navbarProps} bind:sideBarIsOpen />
        <Sidebar.Appwrite
            project={navbarProps.organizations[0].projects[0]}
            avatar={navbarProps.avatar}
            state={sideBarIsOpen ? 'open' : 'closed'}
        />
        <div class="content">
            <h1>My content</h1>
        </div>
        <div class:overlay={sideBarIsOpen}></div>
    </div>
</Story>

<style>
    .content {
        width: 100%;
        height: 300px;
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (min-width: 1024px) {
            width: calc(100% - 200px);
            margin-left: 200px;
        }
    }

    .overlay {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        top: 0;
        background-color: #56565c1a;
        backdrop-filter: blur(5px);

        @media (min-width: 1024px) {
            display: none;
        }
    }
</style>
