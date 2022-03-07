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
        <br><br><br><br><br><br><br>
    </section>
</main>
```

# Grid with Side - Filled
```html
<main class="grid-with-side">
    <header class="main-header">
        <button class="icon-button is-no-desktop" aria-label="Open Menu">
            <span class="icon-dot-3" aria-hidden="true"></span>
        </button>
        
        <div class="console-header">
            <div class="start">
                <div class="select is-only-desktop">
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

                <button class="button is-only-icon is-only-desktop" aria-label="Create Project">
                    <span class="icon-plus" aria-hidden="true"></span>
                </button>
            </div>
            
            <div class="center">
                <a href="" class="is-no-desktop">
                    <img src="/images/appwrite-nav.svg" loading="lazy" alt="Appwrite" class="console-header-logo is-dark-mode">
                    <img src="/images/appwrite.svg" loading="lazy" alt="Appwrite" class="console-header-logo is-light-mode">  
                </a>
            </div>
            
            <div class="end">
                <button class="transparent-button">
                    <span class="link is-only-desktop">Elad Shechter</span>
                    <span class="user-image">[IMAGE]</span>
                </button>
            </div>
        </div>
        
    </header>
    <nav class="main-side">
        <div class="side-nav">
            <div class="side-nav-top">
                <a class="side-nav-logo">
                    <img src="/images/appwrite-nav.svg" loading="lazy" alt="Appwrite Logo" class="side-nav-logo-image" height="26">
                </a>
            </div>

            <div class="side-nav-main">
                <a class="side-nav-link">
                    <span class="icon-home" aria-hidden="true"></span>
                    <span class="text">Home</span>
                </a>
                <section class="side-nav-section">
                    <h4 class="side-nav-subtitle">
                        Develop
                    </h4>
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
                    <h4 class="side-nav-subtitle">
                        Manage
                    </h4>
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
        MAIN Content
        <br><br><br><br><br><br><br>
    </section>
</main>
```

# Grid with Side (open in mobile) 
```html
<main class="grid-with-side is-open">
    <header class="main-header">
        <button class="icon-button is-no-desktop" aria-label="Open Menu">
            <span class="icon-dot-3" aria-hidden="true"></span>
        </button>
        
        <div class="console-header">
            <div class="start">
                <div class="select is-only-desktop">
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

                <button class="button is-only-icon is-only-desktop" aria-label="Create Project">
                    <span class="icon-plus" aria-hidden="true"></span>
                </button>
            </div>
            
            <div class="center">
                <a href="" class="is-no-desktop">
                    <img src="/images/appwrite-nav.svg" loading="lazy" alt="Appwrite" class="console-header-logo is-dark-mode">
                    <img src="/images/appwrite.svg" loading="lazy" alt="Appwrite" class="console-header-logo is-light-mode">  
                </a>
            </div>
            
            <div class="end">
                <button class="transparent-button">
                    <span class="link is-only-desktop">Elad Shechter</span>
                    <span class="user-image">[IMAGE]</span>
                </button>
            </div>
        </div>
        
    </header>
    <nav class="main-side">
        <div class="side-nav">
            <div class="side-nav-top">
                <a class="side-nav-logo">
                    <img src="/images/appwrite-nav.svg" loading="lazy" alt="Appwrite Logo" class="side-nav-logo-image" height="26">
                </a>
            </div>

            <div class="side-nav-main">
                <a class="side-nav-link">
                    <span class="icon-home" aria-hidden="true"></span>
                    <span class="text">Home</span>
                </a>
                <section class="side-nav-section">
                    <h4 class="side-nav-subtitle">
                        Develop
                    </h4>
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
                    <h4 class="side-nav-subtitle">
                        Manage
                    </h4>
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
        MAIN Content
        <br><br><br><br><br><br><br>
    </section>
</main>
```