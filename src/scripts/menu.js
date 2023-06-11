const hamburgerOpen = document.getElementById("hamburger-menu-open-btn");
const hamburgerClose = document.getElementById("hamburger-menu-close-btn");
const menu = document.getElementById("mobile-menu");
hamburgerOpen?.addEventListener("click", () => {
	menu.classList.toggle("invisible");
});
hamburgerClose?.addEventListener("click", () => {
	menu.classList.toggle("invisible");
});
