# Enabled

Use when interactive and ready for input.

```html
<input type="radio" name="radio" /> <input type="radio" name="radio" checked />
```

# Disabled

Use when not interactive. For example, when a user does not have permissions to edit the input.

```html
<input type="radio" disabled /> <input type="radio" checked disabled />
```

# Sizes

Three sizes, big is the default.
To define the others add the class name "is-small" or "is-medium"

```html
<input type="radio" class="is-small" name="size" checked />
<input type="radio" name="size" />
<input type="radio" class="is-large" name="size" />
```
