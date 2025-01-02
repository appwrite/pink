<script context="module" lang="ts">
    import { Navbar, Button } from '$lib/index.js';
    import IconComponent from '$lib/Icon.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';
    import DatabaseImgSource from './database.png';
    import UsersImgSource from './users.png';
    import { IconArrowRight } from '@appwrite.io/pink-icons-svelte';

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
    import { Layout, Sidebar, Step } from '$lib/index.js';
    import { Anchor } from '$lib/link/index.js';
    let sideBarIsOpen = false;
    let state: undefined | 'open' | 'closed' | 'icons' = 'closed';

    $: state = sideBarIsOpen ? 'open' : 'closed';
</script>

<Story name="Onboarding">
    <div style="background-color: var(--color-bgcolor-neutral-default, #fafafb)">
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
                    <h1>Welcome, Jacob</h1>
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
                                        <Anchor variant="quiet-muted" style="width: 100%"
                                            ><Layout.Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <h3>Setup your database</h3>
                                                <IconComponent
                                                    icon={IconArrowRight}
                                                /></Layout.Stack
                                            ></Anchor
                                        >
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content card-docs">
                                        <h3>Discover our docs</h3>
                                        <div class="card-links">
                                            <Anchor variant="quiet-muted" href="/"
                                                ><Layout.Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap="xxs"
                                                    >API references <IconComponent
                                                        icon={IconArrowRight}
                                                        size="s"
                                                    /></Layout.Stack
                                                ></Anchor
                                            >
                                            <Anchor variant="quiet-muted" href="/"
                                                ><Layout.Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap="xxs"
                                                    >Tutorial <IconComponent
                                                        icon={IconArrowRight}
                                                        size="s"
                                                    /></Layout.Stack
                                                ></Anchor
                                            >
                                            <Anchor variant="quiet-muted" href="/"
                                                ><Layout.Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap="xxs"
                                                    >Storage quick start<IconComponent
                                                        icon={IconArrowRight}
                                                        size="s"
                                                    /></Layout.Stack
                                                ></Anchor
                                            >
                                            <Anchor variant="quiet-muted" href="/"
                                                ><Layout.Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap="xxs"
                                                    >Functions quick start<IconComponent
                                                        icon={IconArrowRight}
                                                        size="s"
                                                    /></Layout.Stack
                                                ></Anchor
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-auth">
                                    <div class="card-content">
                                        <h3>Setup auth</h3>
                                        <div class="card-links">
                                            <Anchor variant="quiet-muted" href="/"
                                                ><Layout.Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap="xxs"
                                                    >E-mail and password<IconComponent
                                                        icon={IconArrowRight}
                                                        size="s"
                                                    /></Layout.Stack
                                                ></Anchor
                                            >
                                            <Anchor variant="quiet-muted" href="/"
                                                ><Layout.Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap="xxs"
                                                    >OAuth 2<IconComponent
                                                        icon={IconArrowRight}
                                                        size="s"
                                                    /></Layout.Stack
                                                ></Anchor
                                            >
                                            <Anchor variant="quiet-muted" href="/"
                                                ><Layout.Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    gap="xxs"
                                                    >View all methods<IconComponent
                                                        icon={IconArrowRight}
                                                        size="s"
                                                    /></Layout.Stack
                                                ></Anchor
                                            >
                                        </div>
                                    </div>
                                    <img src={UsersImgSource} alt="" />
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                        <h3>Discord</h3>
                                        <Anchor
                                            variant="quiet-muted"
                                            href="https://appwrite.io/discord"
                                            size="l"
                                            ><Layout.Stack
                                                direction="row"
                                                alignItems="flex-end"
                                                gap="xxs"
                                                >Join our Discord for support, tips and product
                                                updates
                                                <div style:flex-shrink="0">
                                                    <IconComponent icon={IconArrowRight} size="s" />
                                                </div></Layout.Stack
                                            ></Anchor
                                        >
                                    </div>
                                </div>
                            </div>
                        </div></Step.Item
                    >
                </Step.List>
            </div>
        </div>
        <button
            class:overlay={sideBarIsOpen}
            on:click={() => {
                sideBarIsOpen = false;
            }}
        ></button>
    </div>
</Story>

<style lang="scss">
    .content {
        width: 100%;

        margin-top: 34px;

        @media (min-width: 1024px) {
            width: 100%;

            padding-left: 190px;
            transition: all 0.3s ease-in-out;

            &.icons {
                padding-left: 54px;
            }
        }
    }

    .dashboard-header {
        width: 100%;
        border-bottom: 1px solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
        gap: var(--space-7, 16px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        padding: var(--space-7, 16px);

        @media (min-width: 768px) {
            padding-inline: 55px;
            padding-block: var(--base-40);
            flex-direction: row;
            gap: 0;
        }

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
        background: var(--color-bgcolor-neutral-default, #fafafb);
        padding: 0 var(--space-7, 16px) var(--space-7, 16px) var(--space-7, 16px);

        @media (min-width: 768px) {
            padding-inline: 55px;
            padding-block: var(--base-40);
        }

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
            flex-direction: column;
            gap: var(--space-6);

            @media (min-width: 768px) {
                flex-direction: row;
                gap: var(--space-13);
            }

            .build-info {
                display: flex;
                flex-direction: column;
                gap: var(--space-7);
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
                gap: var(--space-7);
                @media (min-width: 768px) {
                    grid-template-columns: repeat(6, 1fr);
                    grid-template-rows: auto auto;

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
                }
            }

            .card-content {
                padding: 24px;
                height: 100%;
                display: flex;
                flex-direction: column;

                h3 {
                    margin-block-end: var(--space-4);

                    @media (min-width: 768px) {
                        margin-block-end: auto;
                    }
                }
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
                    margin-top: var(--space-7);
                }

                .card-links {
                    min-width: 200px;
                }
            }

            .card-links {
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
            }
        }
    }

    .overlay {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 10;
        top: 0;
        background-color: #56565c1a;
        backdrop-filter: blur(5px);

        @media (min-width: 1024px) {
            display: none;
        }
    }

    :global(.sb-show-main.sb-main-padded) {
        padding: 0;
    }
</style>
