<script lang="ts">
    import { Icon, Sidebar, ProgressCircle } from '$lib/index.js';
    import { Button as LinkButton } from '$lib/link/index.js';
    import { Button } from '$lib/button/index.js';
    import {
        IconBell,
        IconChartBar,
        IconChatBubble,
        IconCog,
        IconDatabase,
        IconFolder,
        IconGlobeAlt,
        IconLightningBolt,
        IconSearch,
        IconUserGroup
    } from '@appwrite.io/pink-icons-svelte';
    import Stack from '$lib/layout/Stack.svelte';

    type $$Props = HTMLElement & {
        state?: 'closed' | 'open' | 'icons';
        project: { $id: string } | undefined;
        avatar: string;
        progressCard?: {
            title: string;
            percentage: number;
        };
    };

    export let state: $$Props['state'] = 'closed';
    export let project: $$Props['project'];
    export let avatar: $$Props['avatar'];
    export let progressCard: $$Props['progressCard'];

    const projectOptions = [
        { name: 'Auth', icon: IconUserGroup, slug: 'auth' },
        { name: 'Databases', icon: IconDatabase, slug: 'databases' },
        { name: 'Functions', icon: IconLightningBolt, slug: 'functions' },
        { name: 'Messaging', icon: IconChatBubble, slug: 'messaging' },
        { name: 'Sites', icon: IconGlobeAlt, slug: 'sites' },
        { name: 'Storage', icon: IconFolder, slug: 'storage' }
    ];
</script>

<div class:only-mobile={project === undefined}>
    <Sidebar.Base {...$$props} bind:state>
        <div slot="top">
            <div class="only-mobile top">
                <div class="icons">
                    <LinkButton variant="quiet-muted"
                        ><div class="icon"><Icon icon={IconSearch} /></div></LinkButton
                    >
                    <LinkButton variant="quiet-muted"
                        ><div class="icon"><Icon icon={IconBell} /></div></LinkButton
                    >
                </div>
                <LinkButton><img src={avatar} alt={'Avatar'} class="avatar" /></LinkButton>
            </div>
        </div>
        <div slot="middle" class:icons={state === 'icons'}>
            {#if progressCard}
                <div class="progress-card">
                    <ProgressCircle size="s" progress={progressCard.percentage} />
                    <div class="info" class:no-text={state === 'icons'}>
                        <span class="title">{progressCard.title}</span>
                        <span class="description">{progressCard.percentage}% complete</span>
                    </div>
                </div>
            {/if}
            {#if project}<Stack direction="column" gap="s">
                    <a href={`/console/project-${project.$id}`} class="link"
                        ><span class="link-icon"><Icon icon={IconChartBar} size="s" /> </span><span
                            class:no-text={state === 'icons'}
                            class:has-text={state === 'open'}
                            class="link-text">Overview</span
                        ></a
                    >
                    <span class="products-label" class:not-visible={state === 'icons'}
                        >Products</span
                    >
                    {#each projectOptions as projectOption}
                        <a
                            href={`/console/project-${project.$id}/${projectOption.slug}`}
                            class="link"
                            ><span class="link-icon"
                                ><Icon icon={projectOption.icon} size="s" />
                            </span><span
                                class:no-text={state === 'icons'}
                                class:has-text={state === 'open'}
                                class="link-text">{projectOption.name}</span
                            ></a
                        >
                    {/each}
                </Stack>
            {:else}
                <div class="action-buttons">
                    <Stack direction="column" gap="s">
                        <Button variant="secondary" size="s"><span>Feedback</span></Button>
                        <Button variant="secondary" size="s"><span>Support</span></Button>
                    </Stack>
                </div>
            {/if}
        </div>
        <div slot="bottom" class="bottom" class:icons={state === 'icons'}>
            {#if project}
                <a href={`/console/project-${project.$id}/settings`} class="link"
                    ><span class="link-icon"><Icon icon={IconCog} size="s" /> </span><span
                        class:no-text={state === 'icons'}
                        class:has-text={state === 'open'}
                        class="link-text">Settings</span
                    ></a
                >
            {/if}
            <div class="only-mobile">
                {#if project}
                    <div class="action-buttons">
                        <Stack direction="column" gap="s">
                            <Button variant="secondary" size="s"><span>Feedback</span></Button>
                            <Button variant="secondary" size="s"><span>Support</span></Button>
                        </Stack>
                    </div>
                {/if}
            </div>
        </div>
    </Sidebar.Base>
</div>

<style lang="scss">
    .link {
        display: flex;
        height: 32px;
        padding: var(--space-4, 8px);
        align-items: center;
        gap: var(--gap-s, 8px);
        flex-shrink: 0;
        border-radius: var(--border-radius-s, 8px);
        transition: all 0.2s ease-in-out;

        .link-icon {
            height: 16px;
            color: var(--color-fgcolor-neutral-weak);
        }

        &:hover {
            background: var(--color-bgcolor-neutral-secondary, #f4f4f7);
            .link-icon {
                color: var(--color-fgcolor-neutral-tertiary);
            }
        }

        &:focus {
            background: var(--color-bgcolor-neutral-secondary, #f4f4f7);

            /* box-shadow/state/focus */
            box-shadow:
                var(--shadow-offsetx-0, 0px) var(--shadow-offsety-0, 0px) 0 2px
                    var(--color-bgcolor-neutral-default, #fafafb),
                0px 0px 0px 4px var(--color-border-focus, #818186);
        }

        &:active {
            background: var(--color-bgcolor-neutral-secondary, #f4f4f7);

            .link-icon {
                color: var(--color-fgcolor-neutral-primary);
            }
        }
    }

    .icons .link {
        gap: 0;
    }

    .link-text {
        width: 128px;
        transition: all 0.2s ease-in-out;
        transition-behavior: allow-discrete;
        opacity: 1;
        visibility: visible;
        &.no-text {
            visibility: hidden;
            opacity: 0;
            width: 0;
        }
    }

    .bottom .link .link-icon {
        color: var(--color-fgcolor-neutral-tertiary);
        height: 16px;
        width: 16px;
        display: flex;
        align-items: center;
    }

    .action-buttons {
        margin-top: var(--gap-s);
        span {
            width: 144px;
            text-align: center;
        }
    }
    .avatar {
        width: 32px;
        aspect-ratio: 1 /1;
        border-radius: var(--border-radius-circle, 99999px);
    }

    .top {
        display: flex;
        width: 199px;
        max-height: 48px;
        padding: var(--space-4, 8px) var(--space-7, 16px) var(--space-4, 8px) var(--space-7, 16px);
        margin-left: calc(-1 * var(--space-7, 16px));
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--gap-s, 8px);

        border-bottom: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);

        .icon {
            display: flex;
            padding: var(--space-3, 6px);
            justify-content: center;
            align-items: center;

            color: var(--color-fgcolor-neutral-tertiary);
        }
    }

    .products-label {
        color: var(--color-fgcolor-neutral-tertiary);
    }
    .not-visible {
        visibility: hidden;
        width: 0;
    }

    .hidden {
        display: none;
    }

    .only-desktop {
        display: none;
    }
    .only-mobile {
        display: flex;
    }

    @media (min-width: 768px) {
        .only-mobile {
            display: none;
        }
    }

    @media (min-width: 1024px) {
        .only-desktop {
            display: block;
        }
        .only-mobile {
            display: none;
        }
    }

    .progress-card {
        display: flex;
        padding: 8px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        align-self: stretch;
        border-radius: 8px;
        border: 1px solid var(--color-border-neutral-weak, #ededf0);
        background: var(--color-bgColor-neutral-default, #fafafb);

        .info {
            display: flex;
            flex-direction: column;
        }

        .no-text {
            display: none;
        }

        .title {
            color: var(--color-fgcolor-neutral-secondary, #56565c);

            font-size: var(--font-size-s, 14px);
            font-style: normal;
            font-weight: 600;
            line-height: 140%; /* 19.6px */
            letter-spacing: -0.063px;
        }

        .description {
            color: var(--color-fgcolor-neutral-secondary, #56565c);

            /* Desktop/Body M 400 */
            font-size: var(--font-size-s, 14px);
            font-style: normal;
            font-weight: 400;
            line-height: 140%; /* 19.6px */
            letter-spacing: -0.063px;
        }
    }
</style>
