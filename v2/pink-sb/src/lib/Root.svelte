<script>
    import 'the-new-css-reset/css/reset.css';
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<slot />

<style>
    :root {
        /* primitives */
        --neutral-0: #ffffff;
        --neutral-25: #fafafb;
        --neutral-40: #f4f4f7;
        --neutral-50: #ededf0;
        --neutral-100: #e4e4e7;
        --neutral-200: #d8d8db;
        --neutral-250: #c3c3c6;
        --neutral-300: #adadb0;
        --neutral-400: #97979b;
        --neutral-500: #818186;
        --neutral-600: #6c6c71;
        --neutral-700: #56565c;
        --neutral-750: #414146;
        --neutral-800: #2d2d31;
        --neutral-850: #1d1d21;
        --neutral-900: #19191c;
        --neutral-950: #141416;
        --neutral-1000: #000000;
        --brand-pink-200: #feafc5;
        --brand-purple-200: #cbc2ff;
        --brand-purple-500: #7c67fe;
        --brand-purple-700: #4a3e98;
        --brand-mint-200: #cef1ef;
        --brand-mint-500: #85dbd8;
        --brand-mint-600: #6aafad;
        --brand-mint-700: #4e7e7c;
        --brand-mint-900: #1b2c2b;
        --brand-orange-200: #ffd5c2;
        --brand-orange-500: #fe9567;
        --brand-orange-700: #98593e;
        --brand-yellow-200: #ffedc2;
        --brand-yellow-500: #fed367;
        --brand-yellow-700: #987f3e;
        --brand-blue-200: #c3daff;
        --brand-blue-500: #68a3fe;
        --brand-blue-600: #5382cb;
        --web-red-200: #ffd5d4;
        --web-red-500: #ff453a;
        --web-red-700: #b31212;
        --brand-blue-700: #3e6298;
        --brand-pink-500: #fd366e;
        --brand-pink-600: #ca2b58;
        --brand-pink-700: #982042;
        --web-orange-200: #ffd5c2;
        --web-green-100: #dffdee;
        --web-green-200: #b4f8e2;
        --web-green-500: #10b981;
        --web-green-700: #0a714f;
        --web-orange-500: #fe7c43;
        --web-orange-700: #61250a;

        /* colors */
        --color-fgcolor-neutral-primary: var(--neutral-800);
        --color-fgcolor-neutral-secondary: var(--neutral-700);
        --color-fgcolor-neutral-tertiary: var(--neutral-400);
        --color-bgcolor-neutral-default: var(--neutral-25);
        --color-fgcolor-neutral-weak: var(--neutral-200);
        --color-fgcolor-accent: var(--brand-pink-500);
        --color-fgcolor-accent-neutral: var(--neutral-900);
        --color-fgcolor-on-accent: var(--neutral-0);
        --color-bgcolor-neutral-primary: var(--neutral-0);
        --color-bgcolor-neutral-secondary: var(--neutral-40);
        --color-fgcolor-success: var(--web-green-700);
        --color-bgcolor-neutral-tertiary: var(--neutral-50);
        --color-bgcolor-neutral-invert: var(--neutral-900);
        --color-bgcolor-neutral-invert-weak: var(--neutral-700);
        --color-bgcolor-neutral-invert-weaker: var(--neutral-500);
        --color-bgcolor-accent: var(--brand-pink-500);
        --color-bgcolor-accent-weak: #fc356e1e;
        --color-bgcolor-accent-secondary: var(--brand-pink-600);
        --color-bgcolor-accent-tertiary: var(--brand-pink-700);
        --color-bgcolor-success-weaker: #10b9810a;
        --color-bgcolor-success-weak: #10b98128;
        --color-bgcolor-success: var(--web-green-500);
        --color-bgcolor-success-strong: var(--web-green-700);
        --color-bgcolor-error-weaker: #ff453a0a;
        --color-bgcolor-error-weak: #ff453a28;
        --color-bgcolor-error: var(--web-red-500);
        --color-bgcolor-error-strong: var(--web-red-700);
        --color-bgcolor-warning: var(--web-orange-500);
        --color-bgcolor-warning-weak: #fe7c4328;
        --color-bgcolor-warning-weaker: #fe7c430a;
        --color-bgcolor-warning-strong: var(--web-orange-700);
        --color-fgcolor-on-success: var(--neutral-0);
        --color-fgcolor-on-success-weak: var(--web-green-700);
        --color-fgcolor-error: var(--web-red-700);
        --color-fgcolor-on-error: var(--neutral-0);
        --color-fgcolor-on-error-weak: var(--web-red-700);
        --color-fgcolor-warning: var(--web-orange-700);
        --color-fgcolor-on-warning: var(--neutral-0);
        --color-border-neutral-stronger: var(--neutral-900);
        --color-fgcolor-on-warning-weak: var(--web-orange-700);
        --color-border-neutral-strong: var(--neutral-500);
        --color-border-neutral: var(--neutral-200);
        --color-border-neutral-weak: var(--neutral-50);
        --color-border-focus: var(--neutral-600);
        --color-border-focus-secondary: var(--neutral-500);
        --color-border-accent: var(--brand-pink-500);
        --color-border-accent-secondary: var(--brand-pink-600);
        --color-border-success: var(--web-green-500);
        --color-border-success-weak: #10b98151;
        --color-border-warning: var(--web-orange-500);
        --color-border-warning-weak: #fe7c4351;
        --color-border-error: var(--web-red-500);
        --color-border-error-weak: #ff453a51;
        --color-overlay-on-accent: #ffffff51;
        --color-overlay-on-neutral: #0000000f;
        --color-overlay-accent-hover: #00000033;
        --color-overlay-accent-pressed: #00000066;
        --color-overlay-secondary-hover: #19191c0a;
        --color-overlay-secondary-pressed: #19191c0f;
        --color-overlay-secondary-selected: #19191c0a;
        --gradient-border-button-secondary-bottom: var(--color-border-neutral-weak);
        --gradient-border-button-secondary-top: var(--color-border-neutral);
        --color-fgcolor-on-invert: var(--neutral-25);

        /* typography */
        --font-family-brand: 'Aeonik Pro';
        --font-family-sansserif: 'Inter';
        --font-family-monospace: 'Aeonik Fono';
        --font-family-code: 'Fira Code';
        --font-weight-regular: 'Regular';
        --font-weight-medium: 'Medium';
        --font-weight-semibold: 'Semibold';
        --font-size-xs: 12px;
        --font-size-s: 14px;
        --font-size-m: 16px;
        --font-size-l: 20px;
        --font-size-xl: 24px;
        --font-size-xxl: 28px;
        --font-size-xxxl: 32px;

        /* base */
        --base-0: 0px;
        --base-2: 2px;
        --base-4: 4px;
        --base-6: 6px;
        --base-8: 8px;
        --base-10: 10px;
        --base-12: 12px;
        --base-16: 16px;
        --base-20: 20px;
        --base-24: 24px;
        --base-28: 28px;
        --base-32: 32px;
        --base-36: 36px;
        --base-40: 40px;
        --base-44: 44px;
        --base-48: 48px;
        --base-64: 64px;
        --base-80: 80px;
        --base-96: 96px;
        --base-128: 128px;
        --base-160: 160px;
        --border-radius-none: var(--base-0);
        --border-radius-xxs: var(--base-4);
        --border-radius-xs: var(--base-6);
        --border-radius-s: var(--base-8);
        --border-radius-m: var(--base-12);
        --border-radius-l: var(--base-16);
        --border-radius-xl: var(--base-20);
        --border-radius-xxl: var(--base-24);
        --border-radius-circle: 100%;
        --border-width-s: 1px;
        --border-width-m: 1.2000000476837158px;
        --border-width-l: 2px;
        --border-width-xl: 3px;
        --gap-none: var(--base-0);
        --gap-xs: var(--base-4);
        --gap-s: var(--base-8);
        --gap-m: var(--base-16);
        --gap-l: var(--base-20);
        --gap-xl: var(--base-32);
        --icon-size-s: var(--base-16);
        --icon-size-m: var(--base-20);
        --icon-size-l: var(--base-24);
        --space-0: var(--base-0);
        --space-1: var(--base-2);
        --space-2: var(--base-4);
        --space-3: var(--base-6);
        --space-4: var(--base-8);
        --space-5: var(--base-10);
        --space-6: var(--base-12);
        --space-7: var(--base-16);
        --space-8: var(--base-20);
        --space-9: var(--base-24);
        --space-10: var(--base-32);
        --space-11: var(--base-40);
        --space-12: var(--base-48);
        --space-13: var(--base-64);

        /* elevation */
        --shadow-offset-x-0: var(--base-0);
        --shadow-offset-y-0: var(--base-0);
        --shadow-offset-y-1: 1px;
        --shadow-offset-y-4: var(--base-4);
        --shadow-offset-y-6: var(--base-6);
        --shadow-offset-y-8: var(--base-8);
        --shadow-offset-y-20: var(--base-20);
    }

    :root {
        color: var(--color-fgcolor-neutral-secondary);
        font-size: var(--font-size-s);
        font-family: var(--font-family-sansserif);
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
