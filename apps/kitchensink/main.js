import "./main.css";
import "@appwrite/ui/src/_index.scss";

const body = document.querySelector("body");
const toggle = document.querySelector("#catalog-theme-toggle > input");
toggle.addEventListener("change", () => {
  body.classList.toggle("theme-dark");
});

const menuButton = document.querySelector("#menuButton");
const main = document.querySelector("#main");
const nav = document.querySelector("#nav");
menuButton.addEventListener("click", () => {
  main.classList.toggle("is-open");
  nav.classList.toggle("nav-top");
});
