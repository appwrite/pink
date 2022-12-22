# User Profile
```html
<span class="user-profile">
    <span class="avatar">IM</span>
    <span class="user-profile-info is-only-desktop">
        <span class="name">Walter O’brien</span>
        <span class="title">Acme Corp</span>
    </span> 
    
    <span class="user-profile-sep"></span>
    
    <span class="user-profile-empty-column"></span>
    <span class="user-profile-info is-only-desktop">
        <span class="text">Members: 12</span>
    </span> 
</span>
```

```html
<div class="user-profile">
    <span class="avatar">IM</span>
    <span class="user-profile-info is-only-desktop">
        <span class="name">Walter O’brien</span>
        <div class="interactive-text-output u-padding-inline-0">
            <span class="text">abcdef</span>
            <div class="u-flex u-cross-child-start u-gap-8">
                <button class="interactive-text-output-button" aria-label="copy text">
                    <span class="icon-duplicate" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </span> 
    
    <span class="user-profile-sep"></span>
    
    <span class="user-profile-empty-column"></span>
    <span class="user-profile-info is-only-desktop">
        <span class="text">Members: 12</span>
    </span> 
</div>
```

# User Profile Button

```html
<button id="dropdownBtn" class="u-flex u-gap-12 u-height-100-percents">
    <span class="user-profile u-height-100-percents">
        <span class="avatar">IM</span>
        <span class="user-profile-info is-only-desktop">
            <span class="name">Walter O’brien</span>
            <span class="title">Acme Corp</span>
        </span>      
    </span>
    <span class="icon-cheveron-down is-only-desktop u-height-100-percents u-cross-child-center" aria-hidden="true"></span>
</button>
```