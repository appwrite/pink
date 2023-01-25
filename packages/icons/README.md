# @appwrite.io/pink-icons

SVG Icon library that is used to generate an icon font for Pink Design.


<br />
<p align="center">
    <a href="https://pink.appwrite.io" target="_blank"><img width="260" height="39" src="../../logo.svg" alt="Pink Design Logo"></a>
    <br />
    <br />
    <b>Appwrite's open-source design system for building consistent and reusable user interfaces.</b>
    <br />
    <br />
    <a href="https://github.com/appwrite/pink"><img width="800" height=auto src="../../github.png" alt="Visit the Pink Design repo"></a>
</p>

Pink Design is a CSS library designed for building accessible and visually appealing user interfaces. The library is built with a focus on accessibility, ensuring that users of all abilities can easily interact with your web application. Pink Design offers a wide range of classes and components that can be easily integrated into your project. Whether you're building a complex user interface or a simple web app, Pink Design has everything you need to create a polished and professional look.

## Getting Started

### NPM
Install the CSS library:

```bash
npm install @appwrite.io/pink
```

After installing Pink Design as a package, include Pink Design as CSS library by importing it in your JavaScript files.

```js
import "@appwrite.io/pink";
// optionally, add icons
import "@appwrite.io/pink-icons";
```

### CDN

Copy the following code into the `<head>` section of your HTML file.

```html
<link rel="stylesheet" href="https://unpkg.com/@appwrite.io/pink">
<!-- optionally, add icons -->
<link rel="stylesheet" href="https://unpkg.com/@appwrite.io/pink-icons">
```

## Optimize Icons

In order to prepare all SVG files to be compatible for fonts, you can optimize all icons.

```sh
npm run optimize -w @appwrite.io/pink-icons
```
