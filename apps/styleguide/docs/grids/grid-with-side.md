# Grid with Side

```html
<main class="grid-with-side">
  <header class="main-header" style="background-color:#bbb">
    <button class="icon-button is-no-desktop" aria-label="Open Menu">
      <span class="icon-dot-3" aria-hidden="true"></span>
    </button>
    <div>MAIN HEADER</div>
  </header>
  <nav class="main-side" style="background-color:#ccc">MAIN SIDE</nav>
  <section class="main-content" style="background-color:#ddd">
    MAIN Content
    <br /><br /><br /><br /><br /><br /><br />
  </section>
</main>
```

# Grid with Side - Filled regulat state

```html

<main class="grid-with-side">
    <header class="main-header">
        <button class="icon-button is-no-desktop" aria-label="Open Menu">
            <span class="icon-dot-3" aria-hidden="true"></span>
        </button>
        <a class="logo">
            <img src="/packages/ui/images/logos/appwrite-gray-light.svg" alt="Appwrite">
        </a>
        <nav class="breadcrumbs" aria-label="breadcrumb" role="navigation">
            <ol class="breadcrumbs-list">
                <li class="breadcrumbs-item"><a href="#" aria-level="1">Home</a></li>
                <li class="breadcrumbs-item"><a href="#" aria-level="2">News</a></li>
            </ol>
        </nav>
        <nav class="u-flex">
            <button class="button is-text"><span class="text">Feedback</span></button>
            <button class="button is-text"><span class="text">Support</span></button>
            <button class="button is-secondary"><span class="text">Upgrade</span></button>
        </nav>
        <nav class="user-profile">
            <button class="user-profile-button">
                <span class="avatar">IMG</span>
                <span class="user-profile">
                    <span class="name">Walter O’brien</span>
                    <span class="title">Acme Corp</span>
                </span>
                <span class="icon-chevron-down" aria-hidden="true"></span>
            </button>
        </nav>
    </header>

    <nav class="main-side">
        <div class="side-nav">
            <div class="side-nav-top">
                <a class="side-nav-logo">
                    <img
                            src="/packages/ui/images/appwrite-nav.svg"
                            loading="lazy"
                            alt="Appwrite Logo"
                            class="side-nav-logo-image"
                            height="26"
                    />
                </a>
            </div>

            <div class="side-nav-main">
                <a class="side-nav-link">
                    <span class="icon-home" aria-hidden="true"></span>
                    <span class="text">Home</span>
                </a>
                <section class="side-nav-section">
                    <h4 class="side-nav-subtitle">Develop</h4>
                    <ul class="side-nav-list">
                        <li class="side-nav-item">
                            <a class="side-nav-link">
                                <span class="icon-database" aria-hidden="true"></span>
                                <span class="text">Database</span>
                            </a>
                        </li>
                        <li class="side-nav-item">
                            <a class="side-nav-link is-selected">
                                <span class="icon-folder" aria-hidden="true"></span>
                                <span class="text">Storage</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="side-nav-section">
                    <h4 class="side-nav-subtitle">Manage</h4>
                    <ul class="side-nav-list">
                        <li class="side-nav-item">
                            <a class="side-nav-link">
                                <span class="icon-link" aria-hidden="true"></span>
                                <span class="text">Webhooks</span>
                            </a>
                        </li>
                        <li class="side-nav-item">
                            <a class="side-nav-link">
                                <span class="icon-key-inv" aria-hidden="true"></span>
                                <span class="text">API Keys</span>
                            </a>
                        </li>
                    </ul>
                </section>
            </div>

            <div class="side-nav-bottom">
                <a class="side-nav-link">
                    <span class="icon-cog" aria-hidden="true"></span>
                    <span class="text">Settings</span>
                </a>
            </div>
        </div>
    </nav>

    <section class="main-content" style="background-color:#ddd">
        <div class="top-cover">
            <div class="container">
                <h1 class="main-title">Your Projects</h1>
                <p>Take advantage of the Appwrite APIs and tools.</p>
                <ul class="links-nav">
                    <li class="links-nav-item">
                        <a class="link" href="#">
                            <span class="icon-search" aria-hidden="true"></span>
                            <span class="text">Settings</span>
                        </a>
                    </li>
                    <li class="links-nav-item">
                        <a class="link" href="#">
                            <span class="icon-search" aria-hidden="true"></span>
                            <span class="text">API Keys</span>
                        </a>
                    </li>
                    <li class="links-nav-item">
                        <a class="link" href="#">
                            <span class="icon-search" aria-hidden="true"></span>
                            <span class="text">Webhooks</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <ul class="grid-box">
                <li class="tile">
                    <a class="card" href="">
                        <h2 class="tile-title">Tile Name</h2>
                        <span class="icon-right-open" aria-hidden="true"></span>
                    </a>
                </li>
                <li class="tile">
                    <a class="card" href="">
                        <h2 class="tile-title">Tile Name</h2>
                        <span class="icon-right-open" aria-hidden="true"></span>
                    </a>
                </li>
                <li class="tile">
                    <a class="card" href="">
                        <h2 class="tile-title">Tile Name</h2>
                        <span class="icon-right-open" aria-hidden="true"></span>
                    </a>
                </li>
            </ul>
        </div>
    </section>
</main>
```