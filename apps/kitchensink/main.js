import "./main.css";
import "../../packages/ui/src/_index.scss";

const body = document.querySelector("body");
const light = document.querySelector("#light");
const dark = document.querySelector("#dark");

let darkMode = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme"))
  : false;

light.addEventListener("change", function (e) {
  body.classList.remove("theme-dark");
  darkMode = false;
  localStorage.setItem("theme", JSON.stringify(darkMode));
});
dark.addEventListener("change", function (e) {
  body.classList.add("theme-dark");
  darkMode = true;
  localStorage.setItem("theme", JSON.stringify(darkMode));
});

if (darkMode) {
  body.classList.add("theme-dark");
  dark.setAttribute("checked", "true");
}

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
