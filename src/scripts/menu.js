const hamburgerOpen = document.getElementById("hamburger-menu-open-btn");
const hamburgerClose = document.getElementById("hamburger-menu-close-btn");
const menu = document.getElementById("mobile-menu");
hamburgerOpen?.addEventListener("click", () => {
	menu.classList.toggle("invisible");
});
hamburgerClose?.addEventListener("click", () => {
	menu.classList.toggle("invisible");
});

const navLinks = document.querySelectorAll("[data-navLink]");

navLinks.forEach((link) => {
	if (link.getAttribute("href") === window.location.pathname) {
		link.setAttribute("aria-current", "page");
		link.classList.add("text-blue-accent-400");
		link.classList.remove("text-gray-700");
	} else {
		link.classList.add("text-gray-700");
		link.classList.remove("text-blue-accent-400");
	}
});
