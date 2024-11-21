import Base from '$lib/navbar/Base.svelte';
import Pink from '$lib/navbar/Pink.svelte';
import Appwrite from '$lib/navbar/Appwrite.svelte';
import type { HTMLAttributes } from 'svelte/elements';

// type BaseNavbarProps = {
//     logo: {
//         src: string;
//         alt: string;
//     };
//     links: Array<{ label: string; href: string }>;
//     avatar: string;
//     hasSearch?: boolean;
// };
//
// export type NavbarProps = BaseNavbarProps & HTMLAttributes<HTMLElement>;

export default {
    Base,
    Pink,
    Appwrite
};
