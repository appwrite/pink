# Main Header 

```html
<header class="main-header">
    <button class="icon-button is-no-desktop" aria-label="Open Menu">
      <span class="icon-dot-3" aria-hidden="true"></span>
    </button>
    <a class="logo">
        <img src="/images/appwrite-gray-light.svg" width="132" height="34" alt="Appwrite">
    </a>

    <div class="main-header-end">
        <nav class="u-flex">
            <button class="button is-text"><span class="text">Feedback</span></button>
            <button class="button is-text"><span class="text">Support</span></button>
            <button class="button is-secondary"><span class="text">Upgrade</span></button>
        </nav>
        <nav class="user-profile">
            <button class="user-profile-button">
                <span class="avatar">IM</span>
                <span class="user-profile-info">
                <span class="name">Walter O’brien</span>
                <span class="title">Acme Corp</span>
            </span>
                <span class="icon-cheveron-down" aria-hidden="true"></span>
            </button>
        </nav>
    </div>
</header>
```

# Main Header  (Full)

```html
<header class="main-header">
    <button class="icon-button is-no-desktop" aria-label="Open Menu">
      <span class="icon-dot-3" aria-hidden="true"></span>
    </button>
    <a class="logo">
        <img src="/images/appwrite-gray-light.svg" width="132" height="34" alt="Appwrite">
    </a>
    <nav class="breadcrumbs" aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumbs-list">
            <li class="breadcrumbs-item"><a href="#" aria-level="1">Home</a></li>
            <li class="breadcrumbs-item"><a href="#" aria-level="2">News</a></li>
        </ol>
    </nav>
    
    <div class="main-header-end">
        <nav class="u-flex">
            <button class="button is-text"><span class="text">Feedback</span></button>
            <button class="button is-text"><span class="text">Support</span></button>
            <button class="button is-secondary"><span class="text">Upgrade</span></button>
        </nav>
        <nav class="user-profile">
            <button class="user-profile-button">
                <span class="avatar">IM</span>
                <span class="user-profile-info">
                    <span class="name">Walter O’brien</span>
                    <span class="title">Acme Corp</span>
                </span>
                <span class="icon-cheveron-down" aria-hidden="true"></span>
            </button>
            <section class="user-profile-menu">
                <section class="user-profile-section">
                    
                </section>
                <section class="user-profile-section">
                    
                </section>
                <section class="user-profile-section">
                    
                </section>
            </section>
        </nav>       
    </div>
</header>
```