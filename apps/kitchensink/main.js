import "./main.css";
import "@appwrite/ui/src/_index.scss";

const body = document.querySelector("body");
const toggle = document.querySelector("#catalog-theme-toggle > input");
toggle.addEventListener("change", () => {
  body.classList.toggle("theme-dark");
});
