const faqContainer = document.getElementById('faqContainer');
const faqs = faqContainer.querySelectorAll("[data-faq]");
const faqButtons= faqContainer.querySelectorAll('button');

faqButtons.forEach((btn) => {
	btn?.addEventListener("click", (event) => {
		closeAllFAQs();

		const btnClicked = event.target;
		const svg = btnClicked.querySelector("[data-svg]");
		const faqContainer = btnClicked.parentNode;
		const answer = faqContainer.querySelector("[data-content]");
		const dateValue = btnClicked.dataset.clicked;

		if (svg && answer && dateValue === 'false') {
			btnClicked.setAttribute("data-clicked", "true");
			svg.classList.add('transform', 'rotate-180');
			answer.classList.remove('hidden');
		  } else {
			btnClicked.setAttribute("data-clicked", "false");
			svg.classList.remove('transform', 'rotate-180');
			answer.classList.add('hidden');
		  }
	});
});

const closeAllFAQs = () => {
	faqs.forEach((faqItem) => {
		faqItem.querySelector("[data-svg]").classList.remove('transform', 'rotate-180');
		faqItem.querySelector("[data-content]").classList.add('hidden');
	});
}
