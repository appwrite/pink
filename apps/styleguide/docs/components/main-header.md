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
            <div class="drop-wrapper">
                <button class="user-profile-button">
                    <span class="avatar">IM</span>
                    <span class="user-profile-info">
                        <span class="name">Walter O’brien</span>
                        <span class="title">Acme Corp</span>
                    </span>
                    <span class="icon-cheveron-down" aria-hidden="true"></span>
                </button>
            </div>
        </nav>       
    </div>
</header>
```


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
            <div class="drop-wrapper">
                <button class="user-profile-button">
                    <span class="avatar">IM</span>
                    <span class="user-profile-info">
                    <span class="name">Walter O’brien</span>
                    <span class="title">Acme Corp</span>
                </span>
                    <span class="icon-cheveron-down" aria-hidden="true"></span>
                </button>
                <div class="drop is-block-end is-no-arrow">
                <section class="drop-section">
                    <ul class="drop-list">
                        <li class="drop-list-item">
                            <button class="drop-button">
                                <span class="text">Acme Corp</span>
                            </button>
                        </li>
                        <li class="drop-list-item">
                            <button class="drop-button">
                                <span class="text">Acme Organisation</span>
                            </button>
                        </li>
                    </ul>
                </section>
                <section class="drop-section">
                    <ul class="drop-list">
                        <li class="drop-list-item">
                            <button class="drop-button">
                                <span class="text">New organisation</span>
                                <span class="icon-plus" aria-hidden="true"></span>
                            </button>
                        </li>
                        <li class="drop-list-item">
                            <button class="drop-button">
                                <span class="text">Your Account</span>
                            </button>
                        </li>
                    </ul>
                </section>
                <section class="drop-section">
                    <ul class="u-flex u-gap-12">
                        <li>
                            <label class="image-radio">
                                <img src="/images/mode/light-mode.svg" alt="light mode">
                                <input type="radio" class="is-small" name="mode" checked>
                            </label>
                        </li>
                        <li>
                            <label class="image-radio">
                                <img src="/images/mode/dark-mode.svg" alt="dark mode">
                                <input type="radio" class="is-small" name="mode">
                            </label>
                        </li>
                        <li>
                            <label class="image-radio">
                                <img src="/images/mode/system-mode.svg" alt="system mode">
                                <input type="radio" class="is-small" name="mode">
                            </label>
                        </li>
                    </ul>
                </section>
            </div>
            </div>
        </nav>
    </div>
</header>
```