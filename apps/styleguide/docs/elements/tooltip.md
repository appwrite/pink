# Tooltip

Include: icons

```html
<button class="tooltip" aria-label="variables info">
  <span class="icon-info" aria-hidden="true"></span>
  <span class="tooltip-popup" role="tooltip">
      Set variables or secret keys that will be passed as env vars to your function at runtime.
  </span>
</button>
```

## Tooltip on Tag
```html
<button class="tag tooltip">
    <span class="icon-duplicate" aria-hidden="true"></span>
    <span class="text">User ID</span>
    <span class="tooltip-popup" role="tooltip">
      Set variables or secret keys that will be passed as env vars to your function at runtime.
  </span>
</button>
```

## Tooltip on Tag (align bottom)
```html
<button class="tag tooltip">
    <span class="icon-duplicate" aria-hidden="true"></span>
    <span class="text">User ID</span>
    <span class="tooltip-popup is-bottom" role="tooltip">
      Set variables or secret keys that will be passed as env vars to your function at runtime.
  </span>
</button>
```