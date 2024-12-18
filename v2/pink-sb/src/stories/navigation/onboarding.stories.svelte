<script context="module" lang="ts">
    import { Navbar, Button } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';
    import DatabaseImgSource from './database.png';
    import UsersImgSource from './users.png';

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

<script lang="ts">
    import { Sidebar, Step } from '$lib/index.js';
    let sideBarIsOpen = false;
    let state: undefined | 'open' | 'closed' | 'icons' = 'closed';

    $: state = sideBarIsOpen ? 'open' : 'closed';
</script>

<Story name="Onboarding">
    <div>
        <Navbar.Appwrite {...navbarProps} bind:sideBarIsOpen />
        <Sidebar.Appwrite
            project={navbarProps.organizations[0].projects[0]}
            avatar={navbarProps.avatar}
            bind:state
            progressCard={{ title: 'Get started', percentage: 33 }}
        />
        <div class="content" class:icons={state === 'icons'}>
            <div class="dashboard-header">
                <div>
                    <h1>Welcome, Jacob {state}</h1>
                    <span>Follow a few quick steps to get started with Appwrite</span>
                </div>
                <Button.Button variant="secondary" size="s">Dismiss this page</Button.Button>
            </div>
            <div class="dashboard-content">
                <Step.List>
                    <Step.Item state="previous"
                        ><div>
                            <h2 class="done">Create project</h2>
                        </div></Step.Item
                    >
                    <Step.Item state="previous"
                        ><div>
                            <h2 class="done">Add a platform</h2>
                        </div></Step.Item
                    >
                    <Step.Item state="current"
                        ><div class="build-container">
                            <div class="build-info">
                                <h2>Build your app</h2>
                                <span>
                                    Continue building your app by setting up services such as Auth,
                                    Databases, Storage and Functions.</span
                                >
                            </div>
                            <div class="grid">
                                <div class="card">
                                    <img src={DatabaseImgSource} alt="" />
                                    <div class="card-content">
                                        <h3>Setup your database</h3>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content card-docs">
                                        <h3>Discover our docs</h3>
                                        <div class="card-links">
                                            <a href="/" class="card-link">API references</a>
                                            <a href="/" class="card-link">Tutorial</a>
                                            <a href="/" class="card-link">Storage quick start</a>
                                            <a href="/" class="card-link">Functions quick start</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-auth">
                                    <div class="card-content">
                                        <h3>Setup auth</h3>
                                        <div class="card-links">
                                            <a href="/" class="card-link">E-mail and password</a>
                                            <a href="/" class="card-link">OAuth 2</a>
                                            <a href="/" class="card-link">View all methods</a>
                                        </div>
                                    </div>
                                    <img src={UsersImgSource} alt="" />
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                        <h3>Discord</h3>
                                    </div>
                                </div>
                            </div>
                        </div></Step.Item
                    >
                </Step.List>
            </div>
        </div>
        <div class:overlay={sideBarIsOpen}></div>
    </div>
</Story>

<style lang="scss">
    .content {
        width: 100%;

        margin-top: 40px;

        @media (min-width: 1024px) {
            width: calc(100% - 200px);
            margin-left: 200px;

            &.icons {
                margin-left: 64px;
                width: calc(100% - 64px);
            }
        }
    }

    .dashboard-header {
        width: 100%;
        border-bottom: 1px solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
        height: 250px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 55px;

        h1 {
            color: var(--color-fgcolor-neutral-primary, #2d2d31);

            /* Desktop/Title XL */
            font-family: var(--font-family-brand, 'Aeonik Pro');
            font-size: var(--font-size-xxxl, 32px);
            font-style: normal;
            font-weight: 400;
            line-height: 140%; /* 44.8px */
            letter-spacing: -0.144px;
            margin-block: 6px;
        }

        span {
            color: var(--color-fgcolor-neutral-secondary, #56565c);

            /* Desktop/Body L 400 */
            font-family: var(--font-family-sansserif, Inter);
            font-size: var(--font-size-m, 16px);
            font-style: normal;
            font-weight: 400;
            line-height: 140%; /* 22.4px */
            letter-spacing: -0.16px;
        }
    }

    .dashboard-content {
        padding: 55px;
        background: var(--color-bgcolor-neutral-default, #fafafb);

        h2 {
            color: var(--color-fgcolor-neutral-primary, #2d2d31);

            /* Desktop/Title S */
            font-family: var(--font-family-brand, 'Aeonik Pro');
            font-size: var(--font-size-L, 20px);
            font-style: normal;
            font-weight: 400;
            line-height: 130%; /* 26px */
        }

        h2.done {
            color: var(--color-fgcolor-neutral-tertiary, #97979b);
        }

        .build-container {
            display: flex;
            flex-direction: row;
            gap: 70px;

            .build-info {
                display: flex;
                flex-direction: column;
                gap: 12px;
                span {
                    color: var(--color-fgcolor-neutral-secondary, #56565c);

                    /* Desktop/Body M 400 */
                    font-family: var(--font-family-sansserif, Inter);
                    font-size: var(--font-size-S, 14px);
                    font-style: normal;
                    font-weight: 400;
                    line-height: 140%; /* 19.6px */
                    letter-spacing: -0.063px;
                }
            }

            .card {
                border-radius: 8px;
                border: 1px solid var(--color-border-neutral, #ededf0);
                background: var(--color-bgcolor-neutral-primary, #fff);

                h3 {
                    color: var(--color-fgcolor-neutral-secondary, #56565c);

                    /* Desktop/Title S */
                    font-family: var(--font-family-brand, 'Aeonik Pro');
                    font-size: var(--font-size-l, 20px);
                    font-style: normal;
                    font-weight: 400;
                    line-height: 130%; /* 26px */
                }
            }

            .grid {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                grid-template-rows: auto auto;
                gap: 16px;
            }

            .card:nth-child(1) {
                grid-column: span 3;
            }

            .card:nth-child(2) {
                grid-column: span 3;
            }

            .card:nth-child(3) {
                grid-column: span 4;
            }

            .card:nth-child(4) {
                grid-column: span 2;
            }

            .card-content {
                padding: 24px;
            }

            .card-docs {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
            }

            .card-auth {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                overflow: hidden;

                img {
                    height: 160px;
                }

                .card-links {
                    min-width: 200px;
                }
            }

            .card-links {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .card-link::after {
                content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMzk5NDEgNUw4LjU5OTQxIDUiIHN0cm9rZT0iIzJEMkQzMSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNNC45OTk2MSA4LjYwMDAxTDguNTk5NjEgNS4wMDAwMSIgc3Ryb2tlPSIjMkQyRDMxIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik00Ljk5OTYxIDEuNDAwMDFMOC41OTk2MSA1LjAwMDAxIiBzdHJva2U9IiMyRDJEMzEiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==');
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-inline: 4px;
            }
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
