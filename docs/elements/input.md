# Input Text

```html
<label class="label">Common label</label>
<div class="input-text-wrapper">
    <input type="text" class="input-text" placeholder="placeholder text">
</div>
```

# Input Disabled

```html
<label class="label">Company Name</label>
<div class="input-text-wrapper">
    <input type="text" class="input-text" value="Appwrite" disabled>
</div>
```

# Input Disabled with Copy Button

```html
<label class="label" for="jason">Jason</label>
<div class="input-text-wrapper is-with-end-button">
    <input type="text" id="jason" class="input-text" value="63yb7b2852321746d6e9" disabled>
    <button class="input-button" aria-label="copy jason">
        <span class="icon-docs" aria-hidden="true"></span>
    </button>
</div>
```

# Input Password

```html
<form class="form">
    <ul class="form-list">
        <li class="form-item">
            <div class="input-text-wrapper">
                <input type="password" class="input-text" placeholder="placeholder password">
            </div>
        </li>
        <li class="form-item">
            <div class="input-text-wrapper">
                <input type="password" class="input-text" placeholder="placeholder password">
                <meter value="33" min="0" max="100" class="password-meter is-weak" aria-label="Password strength week"></meter>
            </div>  
        </li>
        <li class="form-item">
            <div class="input-text-wrapper">
                <input type="password" class="input-text" placeholder="placeholder password">
                <meter value="66" min="0" max="100" class="password-meter is-medium" aria-label="Password strength good"></meter>
            </div> 
        </li>
        <li class="form-item">
            <div class="input-text-wrapper">
                <input type="password" class="input-text" placeholder="placeholder password">
                <meter value="100" min="0" max="100" class="password-meter is-strong" aria-label="Password strength excellent"></meter>
            </div>
        </li>
    </ul>

    
</form>
```

# Native Select
```html
<div class="select">
    <select name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
    </select>
    <span class="icon-down-open" aria-hidden="true"></span>
</div>
```

# Native File Upload Input
```html
<input type="file" name="file" id="file-file" size="1" required="">
```

# Input Checkbox And Radio

```html
<input type="checkbox">
<input type="checkbox" checked>
<input type="checkbox" disabled>
<input type="checkbox" checked disabled>

<input type="radio">
<input type="radio" checked>
<input type="radio" disabled>
<input type="radio" checked disabled>
```

# Switch Button (Designed Checkbox)

```html
<input class="switch" type="checkbox">
<input class="switch" type="checkbox" checked>
<input class="switch" type="checkbox" disabled>
<input class="switch" type="checkbox" checked disabled>
```

# Tags Input
```html
<div class="tags-input">
    <div class="tags">
        <ul class="tags-list">
            <li class="tags-item">
                <div class="tag">
                    <span class="tag-text">role:all</span>
                    <button class="x-button" aria-label="delete all:role tag">
                        <span class="icon-cancel" aria-hidden="true"></span>
                    </button>
                </div>
            </li>
        </ul>
    </div>
    <input type="text" class="tags-input-text" placeholder="User ID, Team ID or Role">
</div>
```
