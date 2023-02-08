'use strict';
export function sendForm() {
	document.addEventListener('DOMContentLoaded', () => {

		const form = document.querySelectorAll('.ajax-contact-form');
		const note = document.querySelectorAll('.note');
		const formBlock = document.querySelectorAll('.form');

		const formArr = Array.from(form);
		const noteArr = Array.from(note);
		const formBlockArr = Array.from(formBlock);

		formArr.forEach((el, index) => {
			el.addEventListener('submit', formSend);
			async function formSend(e) {
				e.preventDefault();
				let formData = new FormData(el);

				let response = await fetch('send.php', {
					method: 'POST',
					body: formData,
				});
				console.log(response)
				if (response.ok) {

					let result = await response.json();
					let mes = `<p>${result.message}</p>`;
					el.reset();
					formBlockArr[index].remove();
					noteArr[index].innerHTML = mes;
				} else {
					alert('Что-то пошло не так и ничего не отправилось...')
				}
			}
		})
	})
}