# Icons

Three common sizes: being used with CSS native variables using the font-size property.


```html
<ul class="u-grid u-gap-12" style="line-height:1;">
    <li>
        <span class="icon-check" aria-hidden="true" style="font-size: var(--icon-size-small); vertical-align:middle;"></span>
        <span class="text" style="vertical-align:middle;">Small Size</span>
    </li>
    <li>
        <span class="icon-check" aria-hidden="true"  style="vertical-align:middle;"></span>
        <span class="text"  style="vertical-align:middle;">Default Size (Medium)</span>
    </li>
    <li>
        <span class="icon-check" aria-hidden="true" style="font-size: var(--icon-size-large); vertical-align:middle;"></span>
        <span class="text"  style="vertical-align:middle;">Large Size</span>
    </li>
</ul>
```