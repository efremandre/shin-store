'use strict';
export function sendForm() {
	document.addEventListener('DOMContentLoaded', () => {

		const form = document.querySelectorAll('.ajax-contact-form');
		const note = document.querySelectorAll('.note');
		const formBlock = document.querySelectorAll('.fields');

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

				if (response.ok) {
					let result = await response.json();
					console.log(result.mesage)
					let mes = '<p>Ваша заявка принята!</p><br><p>Ожидайте ответ в ближайшее время!</p><br><p>Людей в очереди : 5</p>';
					el.reset();
					formBlockArr[index].remove();
					noteArr[index].innerHTML = mes;
				} else {
					alert('not ok')
				}
			}
		})
	})
}