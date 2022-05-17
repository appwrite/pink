import "./main.css";
import "@appwrite/ui/src/_index.scss";

const body = document.querySelector("body");
const toggle = document.querySelector("#catalog-theme-toggle > input");

let darkMode = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme"))
  : false;

if (darkMode) {
  body.classList.add("theme-dark");
  toggle.setAttribute("checked", "true");
}

toggle.addEventListener("change", () => {
  body.classList.toggle("theme-dark");
  darkMode = !darkMode;
  localStorage.setItem("theme", JSON.stringify(darkMode));
});

const menuButton = document.querySelector("#menuButton");
const main = document.querySelector("#main");
const nav = document.querySelector("#nav");
menuButton.addEventListener("click", () => {
  main.classList.toggle("is-open");
  nav.classList.toggle("nav-top");
});

const dropdownBtn = document.querySelector("#dropdownBtn");
const dropdown = document.querySelector("#dropdown");
dropdownBtn.addEventListener("click", () => {
  dropdown.classList.toggle("u-hide");
});
