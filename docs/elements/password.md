
The password input is a specialized input field with the ability to show the strength of a password.

```html
<div class="input-text-wrapper">
    <input type="password" class="input-text" placeholder="enter password">
    <meter value="0" min="0" max="100" class="password-meter" aria-label="Empty password"></meter>
</div>
```

# Weak
```html
<div class="input-text-wrapper">
    <input type="password" class="input-text" placeholder="enter password">
    <meter value="33" min="0" max="100" class="password-meter is-weak" aria-label="Password strength week"></meter>
</div>
```

# Medium
```html
<div class="input-text-wrapper">
    <input type="password" class="input-text" placeholder="enter password">
    <meter value="66" min="0" max="100" class="password-meter is-medium" aria-label="Password strength good"></meter>
</div>
```

# Strong
```html
<div class="input-text-wrapper">
    <input type="password" class="input-text" placeholder="enter password">
    <meter value="100" min="0" max="100" class="password-meter is-strong" aria-label="Password strength excellent"></meter>
</div>
```
