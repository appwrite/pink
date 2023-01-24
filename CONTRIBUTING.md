# Contributing

We would ❤️ for you to contribute to Appwrite and help make it better! We want contributing to Appwrite to be fun, enjoyable, and educational for anyone and everyone. All contributions are welcome, including issues, new docs as well as updates and tweaks, blog posts, workshops, and more.

## How to Start?

If you are worried or don’t know where to start, check out our next section explaining what kind of help is needed and where you can get involved. You can reach out with questions on our [Discord](https://appwrite.io/discord) server. You can also submit an issue and a maintainer can guide you!

## Repo Structure

Entry points to be aware of are:

- [`packages/ui`](packages/ui) - SCSS library for all elements and components
- [`packages/icons`](packages/icons) - SVG icons that are converted to an icon font
- [`apps/pink`](apps/pink) - Pink Design style library

```
├── apps
│   └── pink                                    //Pink Design repo
│       ├── public
│       │   ├── comparison                      //Images used in comparison separated in dark and light
│       │   │   ├── dark
│       │   │   └── light
│       │   └── images                          //Image in use in the pages
│       └── src
│           ├── components                      //General components folder
│           │   ├── defaults                    //Components used to overwrite markdown defaults
│           │   ├── homepage                    //Components used in the homepage
│           │   └── layout                      //Components used in the layout
│           ├── helpers                         //Helpers functions
│           ├── layout                          //Layout folder
│           └── pages                           //Pages separated by category
│               ├── components
│               ├── elements
│               ├── foundations
│               ├── layout
│               ├── utilities
│               ├── _autoimports.ts             //List of components autoimported in all the pages
│               ├── _components.ts              //Components used to overwrite markdown defaults
│               ├── _directives.ts              //List of custom components available in mdx
│               ├── _frontmatter.yaml           //Default import in the frontmatter for all the pages
│               ├── getting-started.mdx         //MDX file
│               └── index.astro                 //Astro page
└── packages
    ├── icons
    │   └── svg                                 //Folder containing all the SVGs
    └── ui
        └── src                                 //Scss separated by folder
            ├── 1-css-variables
            ├── 2-resets
            ├── 5-animations
            ├── 6-elements
            ├── 7-components
            ├── 8-grids
            ├── 10-themes
            └── abstract
```

Pink Design makes use of the [astro.build](https://astro.build/) library.

New pages can be added by creating a `.mdx` file in the `pages` folder.

To show code examples the `<Preview>...</Preview>` tag can be used. To render html without the code example `<Showcase>...</Showcase>` tag can be used. They are both auto-imported in every `.mdx` file inside the pages folder. The auto-import is handled in `/pages/_autoimports.ts` with [m2dx](https://astro-m2dx.netlify.app/docs)

`.m2dx` is also used to overwrite native markdown components to apply custom classes to HTML elements. This behavior can be modified in the `/pages/_components.ts`

Layout is applied in `/pages/_frontmatter.yaml`

There are 4 custom directives. `COMPARISON`, `DO`, `DONT`, and `IMG` they are set in `/pages/_directives.ts` and can be used like this:

```md
::::COMPARISON

::IMG[/images/button-do-1.png, description]
:::DO
Increase recognition by using icons with universal meaning. Increase readability by keeping text short and using uppercase letter only for the first word.
:::

::IMG[/images/button-dont-1.png, description]
:::DONT
Avoid using specific icons, uppercase in every word and long sentences.
:::

::::
```

## Development

### Setup

[Node.js 16+](https://nodejs.org/) needs to be installed.

```sh
git clone https://github.com/appwrite/ui.git
cd pink
npm install
```

### Development

This command can be used to develop components Pink Design is available under [http://localhost:3333](http://localhost:3333) with auto-reload.

Both applications inherit styles and icons respectively from the ui and icon packages. Changes made to these packages will also affect the applications. Styles and icons are taken from the dist folder so `npm run build` must be run to be able to see updates.

```sh
npm run dev
```

### Build

You can build Pink Design, including all dependencies in [`packages/`](packages/), with:

```sh
npm run build
```

## Submit a Pull Request 🚀

Branch naming convention is as follows

`TYPE-ISSUE_ID-DESCRIPTION`

example:

```
doc-548-submit-a-pull-request-section-to-contribution-guide
```

When `TYPE` can be:

- **feat** - is a new feature
- **doc** - documentation only changes
- **cicd** - changes related to CI/CD system
- **fix** - a bug fix
- **refactor** - code change that neither fixes a bug nor adds a feature

**All PRs must include a commit message with the description of the changes made!**

Start by forking the project and use the `git clone` command to download the repository to your computer. A standard procedure for working on an issue would be to:

1. Before creating a new branch, pull the changes from upstream to make sure your default branch is be up to date.

```
$ git pull
```

2. Create a new branch from the default branch. For example `doc-548-submit-a-pull-request-section-to-contribution-guide`

```
$ git checkout -b [name_of_your_new_branch]
```

3. Work - commit - repeat ( be sure to be in your branch )
4. Push changes to GitHub

```
$ git push origin [name_of_your_new_branch]
```

6. Submit your changes for review. If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.
7. Start a Pull Request (PR) by clicking on `Create pull request`. Make sure to update the PR description following the template provided.
8. Wait for a code review.
9. If you need to make changes based on feedback, make sure to re-request a review from your reviewer after you've made the necessary changes.

![Re-Request a Review](https://docs.github.com/assets/cb-4714/images/help/pull_requests/request-re-review.png)

10. After approval, your PR will be merged.
11. You can delete your branch after it has been merged.

## Guidelines

### Consistency

TBW

### Performance

Page load times are a key consideration for users of all browsers and device types.

There are some general things we can do in front-end development:

- Minimise HTTP requests
- Minimise blocking – content should be readable before client side processing
- Lazy load 'supplementary' content (especially images)
- Leverage Astro and use as little JS as possible

### Don't Repeat Yourself (DRY)

If you repeat anything that has already been defined in code, refactor it so that it only ever has one representation in the codebase.

If you stick to this principle, you will ensure that you will only ever need to change one implementation of a feature without worrying about needing to change any other part of the code.

### Separation of concerns

Separate _structure_ from _presentation_ from _behaviour_ to aid maintainability and understanding.

- Keep CSS (presentation), JS (behaviour) and HTML (structure) in the same respective Astro component
- Don't choose HTML elements to imply style
- Where appropriate, use CSS rather than Javascript for animations and transitions
- Try to use templates when defining markup in Javascript

### Write code to be read

Follow the principles of ['Keep It Simple, Stupid'](http://en.wikipedia.org/wiki/KISS_principle) (KISS); hard to read or obfuscated code is difficult to maintain and debug. Don't be too clever; write code to be read.

### Identify technical debt

Use code comment annotations (`@todo`) to mark parts of your code that require further work. This will allow the measurement and management of technical debt.

Don't use `@fixme` (which defines things that are broken) - you shouldn't be committing broken code to the repo.

### Dependencies

Please avoid introducing new dependencies to Appwrite without consulting the team. New dependencies can be very helpful but also introduce new security and privacy issues, complexity, and impact total docker image size.

Adding a new dependency should have vital value on the product with minimum possible risk.

## Introducing New Features

We would 💖 you to contribute to Appwrite, but we would also like to make sure Appwrite is as great as possible and loyal to its vision and mission statement 🙏.

For us to find the right balance, please open an issue explaining your ideas before introducing a new pull request.

This will allow the Appwrite community to have sufficient discussion about the new feature value and how it fits in the product roadmap and vision.

This is also important for Appwrite maintainers to discuss the feature's design and architecture to help the contribution fit in organically in the Appwrite codebase. Some bigger features might need to go through our [RFC process](https://github.com/appwrite/rfc).

## Other Ways to Help

Pull requests are great, but there are many other areas where you can help Appwrite.

### Blogging & Speaking

Blogging, speaking about, or creating tutorials about one of Appwrite’s many features. Mention [@appwrite](https://twitter.com/appwrite) on Twitter and/or email [team@appwrite.io](mailto:team@appwrite.io) so we can give pointers and tips and help you spread the word by promoting your content on the different Appwrite communication channels. Please add your blog posts and videos of talks to our [Awesome Appwrite](https://github.com/appwrite/awesome-appwrite) repo on GitHub.

### Presenting at Meetups

Presenting at meetups and conferences about your Appwrite projects. Your unique challenges and successes in building things with Appwrite can provide great speaking material. We’d love to review your talk abstract/CFP, so get in touch with us if you’d like some help!

### Sending Feedbacks & Reporting Bugs

Sending feedback is a great way for us to understand your different use cases of Appwrite better. If you had any issues, bugs, or want to share about your experience, feel free to do so on our GitHub issues page or at our [Discord channel](https://discord.gg/GSeTUeA).

### Submitting New Ideas

If you think Appwrite could use a new feature, please open an issue on our GitHub repository, stating as much information as you can think about your new idea and it's implications. We would also use this issue to gather more information, get more feedback from the community, and have a proper discussion about the new feature.

### Improving Documentation

Submitting documentation updates, enhancements, designs, or bug fixes. Spelling or grammar fixes will be very much appreciated.

### Helping Someone

Searching for Appwrite on Discord, GitHub, or StackOverflow and helping someone else who needs help. You can also help by teaching others how to contribute to Appwrite's repo!

## Code of Conduct

Help us keep Appwrite open and inclusive. Please read and follow our [Code of Conduct](https://github.com/appwrite/.github/blob/main/CODE_OF_CONDUCT.md).
