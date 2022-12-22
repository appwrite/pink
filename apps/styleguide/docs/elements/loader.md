# Loader

```html
<div class="loader"></div>
```

# Loader with Card and Button
Loader inside Box partial with Button partial
- also using utility classes of "ul-flex", "u-gap-16", "u-cross-center" and "u-stretch"
```html
    <div class="box u-flex u-gap-16 u-cross-center">
        <div class="loader"></div>
        <p class="u-stretch">Provide contextual message</p>
        <button class="button is-secondary">
            <span class="text">button</span>
        </button>
    </div>
```

#multi Loader Boxes
smart border-radius for multiple boxes.
- Only top corners of the first-child
- Only bottom corners of the last-child
```html
<div class="boxes-wrapper">
    <div class="box u-flex u-gap-16 u-cross-center">
        <div class="loader"></div>
        <p class="u-stretch">Provide contextual message</p>
        <button class="button is-secondary">
            <span class="text">button</span>
        </button>
    </div>
    <div class="box u-flex u-gap-16 u-cross-center">
        <div class="loader"></div>
        <p class="u-stretch">Provide contextual message</p>
        <button class="button is-secondary">
            <span class="text">button</span>
        </button>
    </div>
    <div class="box u-flex u-gap-16 u-cross-center">
        <div class="loader"></div>
        <p class="u-stretch">Provide contextual message</p>
        <button class="button is-secondary">
            <span class="text">button</span>
        </button>
    </div>
</div>
```