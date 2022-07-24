# Base Colors
Color variables (colors.scss)
## Hue base definition (can edit the demo here)
```html
<style style="display:block; white-space: pre;" contenteditable="true">
    :root {
        --color-primary-hue: 343;
        --color-secondary-hue: 189;
        --color-success-hue: 150;
        --color-warning-hue: 33;
        --color-danger-hue: 3;
    }
</style>
```

```html
<style>
    .color-box li{
        display:flex; justify-content:center; align-items:center; font-size:12px;
        width:150px; height:60px; border-radius:4px; color:#fff;
    }
</style>
<div class="u-grid u-gap-16">
    <h2 class="heading-level-6">Primary</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-primary-100));">--color-primary-100</li>
        <li style="background-color:hsl(var(--color-primary-200));">--color-primary-200</li>
        <li style="background-color:hsl(var(--color-primary-300));">--color-primary-300</li>
    </ul>

    <h2 class="heading-level-6">Neutral</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-neutral-0)); color:#000;">--color-neutral-0</li>
        <li style="background-color:hsl(var(--color-neutral-5)); color:#000;">--color-neutral-5</li>
        <li style="background-color:hsl(var(--color-neutral-10)); color:#000;">--color-neutral-10</li>
        <li style="background-color:hsl(var(--color-neutral-30)); color:#000;">--color-neutral-30</li>
        <li style="background-color:hsl(var(--color-neutral-50)); color:#000;">--color-neutral-50</li>
    </ul>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-neutral-70));">--color-neutral-70</li>
        <li style="background-color:hsl(var(--color-neutral-100));">--color-neutral-100</li>
        <li style="background-color:hsl(var(--color-neutral-120));">--color-neutral-120</li>
    </ul>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-neutral-150));">--color-neutral-150</li>
        <li style="background-color:hsl(var(--color-neutral-200));">--color-neutral-200</li>
        <li style="background-color:hsl(var(--color-neutral-300));">--color-neutral-300</li>
        <li style="background-color:hsl(var(--color-neutral-400));">--color-neutral-400</li>
        <li style="background-color:hsl(var(--color-neutral-500));">--color-neutral-500</li>
    </ul>

    <h2 class="heading-level-6">Secondary</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-secondary-10)); color:#000;">--color-secondary-10</li>
        <li style="background-color:hsl(var(--color-secondary-50)); color:#000;">--color-secondary-50</li>
        <li style="background-color:hsl(var(--color-secondary-100));">--color-secondary-100</li>
        <li style="background-color:hsl(var(--color-secondary-120));">--color-secondary-120</li>
        <li style="background-color:hsl(var(--color-secondary-200));">--color-secondary-200</li>
    </ul>

    <h2 class="heading-level-6">Success</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-success-10)); color:#000;">--color-success-10</li>
        <li style="background-color:hsl(var(--color-success-50)); color:#000;">--color-success-50</li>
        <li style="background-color:hsl(var(--color-success-100));">--color-success-100</li>
        <li style="background-color:hsl(var(--color-success-120));">--color-success-120</li>
        <li style="background-color:hsl(var(--color-success-200));">--color-success-200</li>
    </ul>

    <h2 class="heading-level-6">Warning</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-warning-10)); color:#000;">--color-warning-10</li>
        <li style="background-color:hsl(var(--color-warning-50)); color:#000;">--color-warning-50</li>
        <li style="background-color:hsl(var(--color-warning-100));">--color-warning-100</li>
        <li style="background-color:hsl(var(--color-warning-120));">--color-warning-120</li>
        <li style="background-color:hsl(var(--color-warning-200));">--color-warning-200</li>
    </ul>

    <h2 class="heading-level-6">Danger</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-danger-10)); color:#000;">--color-danger-10</li>
        <li style="background-color:hsl(var(--color-danger-50)); color:#000;">--color-danger-50</li>
        <li style="background-color:hsl(var(--color-danger-100));">--color-danger-100</li>
        <li style="background-color:hsl(var(--color-danger-120));">--color-danger-120</li>
        <li style="background-color:hsl(var(--color-danger-200));">--color-danger-200</li>
    </ul>
</div>
```

## Special Colors
These are colors which use the color above and look different in light-mode and dark-mode (use different color according the theme)

```html
<div class="u-grid u-gap-16">
    <h2 class="heading-level-6">Color Text</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-text-disabled));">--color-text-disabled</li>
        <li style="background-color:hsl(var(--color-text-info));">--color-text-info</li>
        <li style="background-color:hsl(var(--color-text-danger));">--color-text-danger</li>
        <li style="background-color:hsl(var(--color-text-warning));">--color-text-warning</li>
        <li style="background-color:hsl(var(--color-text-success));">--color-text-success</li>
    </ul>

    <h2 class="heading-level-6">Common Border Color</h2>
    <ul class="color-box u-flex u-gap-16">
        <li style="background-color:hsl(var(--color-border)); color:#000;">--color-border</li>
    </ul>
</div>
```