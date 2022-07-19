# Bucket 
Bucket is using grid-box, card, tag, eyebrow-heading, heading and utility classes.

Full example with list, second example.
```html
<div class="card">
    <div class="bucket">
        <div class="eyebrow-heading-3">700 Files</div>
        <h2 class="heading-level-6">Bucket Name</h2>
        <div class="bucket-status">

        </div>
        <div class="bucket-options">
            <div class="tag">
                <span class="icon-duplicate" aria-hidden="true"></span>
                <span class="text">Bucket ID</span>
            </div>         
        </div>
        <ul class="bucket-icons u-flex u-gap-8">
            <li><span class="icon-lock-closed" aria-hidden="true" aria-label="Secure [OR] unsecure"></span></li>
            <li><span class="icon-shield-check" aria-hidden="true" aria-label="Safe [OR] unsafe"></span></li>
        </ul>
    </div> 
</div>

```

# List of Buckets
```html
<ul class="grid-box" style="--grid-gap:2rem; --grid-item-size:25rem;">
    <li class="card">
        <div class="bucket">
            <div class="eyebrow-heading-3">700 Files</div>
            <h2 class="heading-level-6">Bucket Name</h2>
            <div class="bucket-status">
               
            </div>
            <div class="bucket-options">
                <div class="tag">
                    <span class="icon-duplicate" aria-hidden="true"></span>
                    <span class="text">Bucket ID</span>
                </div>
            </div>
            <ul class="bucket-icons u-flex u-gap-8">
                <li><span class="icon-lock-closed" aria-hidden="true" aria-label="Secure [OR] unsecure"></span></li>
                <li><span class="icon-shield-check" aria-hidden="true" aria-label="Safe [OR] unsafe"></span></li>
            </ul>
        </div>
    </li>
    <li class="card">
        <div class="bucket">
            <div class="eyebrow-heading-3">700 Files</div>
            <h2 class="heading-level-6">Bucket Name</h2>
            <div class="bucket-status">
                <button class="tag" disabled>
                    <span class="text">Disabled</span>
                </button>
            </div>
            <div class="bucket-options">
                <div class="tag">
                    <span class="icon-duplicate" aria-hidden="true"></span>
                    <span class="text">Bucket ID</span>
                </div>
            </div>
            <ul class="bucket-icons u-flex u-gap-8">
                <li><span class="icon-lock-closed u-opacity-0-2" aria-hidden="true" aria-label="Secure [OR] unsecure"></span></li>
                <li><span class="icon-shield-check u-opacity-0-2" aria-hidden="true" aria-label="Safe [OR] unsafe"></span></li>
            </ul>
        </div>
    </li>
</ul>
```