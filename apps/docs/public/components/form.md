# Form

Include: Label, Input and Input-text-wrapper.
Can include also: password-meter, tags-input, helper, placeholder.

Form layout include semantics.

```html
<form class="form">
  <ul class="form-list">
    <li class="form-item">
      <label for="text1" class="label">Text Field</label>
      <div class="input-text-wrapper">
        <input
          id="text1"
          type="text"
          class="input-text"
          placeholder="placeholder text"
        />
      </div>
    </li>
    <li class="form-item">
      <label for="text2" class="label">Text Field</label>
      <div class="input-text-wrapper">
        <input
          id="text2"
          type="text"
          class="input-text"
          placeholder="placeholder text"
        />
      </div>
    </li>
    <li class="form-item">
      <label for="text3" class="label">Text Field</label>
      <div class="input-text-wrapper">
        <input
          id="text3"
          type="text"
          class="input-text"
          placeholder="placeholder text"
        />
      </div>
    </li>
    <li class="form-item">
      <section class="checkboxes">
        <header class="checkboxes-header">
          <h4 class="label">Events</h4>
          <div class="checkboxes-options">
            <button class="link"><span class="text">Unselect All</span></button>
            <button class="link"><span class="text">Select All</span></button>
          </div>
        </header>
        <ul class="checkboxes-list">
          <li class="checkboxes-item">
            <input type="checkbox" id="item1" />
            <label class="label" for="item1">item1</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item2" />
            <label class="label" for="item2">item2</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item3" />
            <label class="label" for="item3">item3</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item4" />
            <label class="label" for="item4">item4</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item5" />
            <label class="label" for="item5">item5</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item6" />
            <label class="label" for="item6">item6</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item7" />
            <label class="label" for="item7">item7</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item8" />
            <label class="label" for="item8">item8</label>
          </li>
          <li class="checkboxes-item">
            <input type="checkbox" id="item9" />
            <label class="label" for="item9">item9</label>
          </li>
        </ul>
      </section>
    </li>
  </ul>
</form>
```
