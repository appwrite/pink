# Tags Input

```html
<div class="tags-input">
  <div class="tags">
    <ul class="tags-list">
      <li class="tags-item">
        <div class="input-tag">
          <span class="tag-text">role:all</span>
          <button
            class="input-tag-delete-button"
            aria-label="delete all:role tag"
          >
            <span class="icon-x" aria-hidden="true"></span>
          </button>
        </div>
      </li>
    </ul>
  </div>
  <input
    type="text"
    class="tags-input-text"
    placeholder="User ID, Team ID or Role"
  />
</div>
```

# Focus

```html
<div class="tags-input is-focus">
  <div class="tags">
    <ul class="tags-list">
      <li class="tags-item">
        <div class="input-tag">
          <span class="tag-text">role:all</span>
          <button
            class="input-tag-delete-button"
            aria-label="delete all:role tag"
          >
            <span class="icon-x" aria-hidden="true"></span>
          </button>
        </div>
      </li>
    </ul>
  </div>
  <input
    type="text"
    class="tags-input-text"
    placeholder="User ID, Team ID or Role"
  />
</div>
```

# Disabled

```html
<div class="tags-input is-disabled">
  <div class="tags">
    <ul class="tags-list">
      <li class="tags-item">
        <div class="input-tag is-disabled">
          <span class="tag-text">role:all</span>
          <button
            class="input-tag-delete-button"
            aria-label="delete all:role tag"
            disabled
          >
            <span class="icon-x" aria-hidden="true"></span>
          </button>
        </div>
      </li>
    </ul>
  </div>
  <input
    type="text"
    class="tags-input-text"
    placeholder="User ID, Team ID or Role"
    disabled
  />
</div>
```

# Readonly

```html
<div class="tags-input is-read-only">
  <div class="tags">
    <ul class="tags-list">
      <li class="tags-item">
        <div class="input-tag">
          <span class="tag-text">role:all</span>
          <button
            class="input-tag-delete-button"
            aria-label="delete all:role tag"
          >
            <span class="icon-x" aria-hidden="true"></span>
          </button>
        </div>
      </li>
    </ul>
  </div>
  <input
    type="text"
    class="tags-input-text u-hide"
    placeholder="User ID, Team ID or Role"
    readonly
  />
</div>
```
