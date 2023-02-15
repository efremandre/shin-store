'use strict';
export function sendForm() {
	document.addEventListener('DOMContentLoaded', () => {

		const form = document.querySelectorAll('.ajax-contact-form');
		const formPreloaders = document.querySelectorAll('.form-preloader');
		const note = document.querySelectorAll('.form-callback');

		const formArr = Array.from(form);
		const formPreloader = Array.from(formPreloaders);
		const noteArr = Array.from(note);

		formArr.forEach((el) => {
			el.addEventListener('submit', formSend);
			async function formSend(e) {
				e.preventDefault();
				let formData = new FormData(el);

				let response = await fetch('../../vendor/send.php', {
					method: 'POST',
					body: formData,
				});
				formPreloader.forEach(el => el.classList.add('_preloader-active'));

				if (response.ok) {
					let result = await response.json();
					let mes = `<p>${result.message}</p>`;
					el.reset();
					formPreloader.forEach(el => el.classList.remove('_preloader-active'));
					noteArr.forEach(el => {
						el.innerHTML = mes;
						el.classList.add('_form-callback-active');
						setTimeout(()=> {
							el.classList.remove('_form-callback-active');
						}, 2000);
					});
				} else {
					formPreloader.forEach(el => el.classList.remove('_preloader-active'));
					noteArr.forEach(el => {
						el.innerHTML = 'Что-то пошло не так и ничего не отправилось...';
						el.classList.add('_form-callback-active');
						setTimeout(()=> {
							el.classList.remove('_form-callback-active');
						}, 2000);
					});
				}
			}
		})
	})

	const eventCalllback = function (e) {
		const el = e.target;
			const clearVal = el.dataset.phoneClear;
			const pattern = el.dataset.phonePattern;
			const matrix_def = "+7(___) ___-__-__";
			const matrix = pattern ? pattern : matrix_def;
			let i = 0;
			const def = matrix.replace(/\D/g, "");
			let val = e.target.value.replace(/\D/g, "");
		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
	}
	const phone_inputs = document.querySelectorAll('[data-phone-pattern]');
	for (let elem of phone_inputs) {
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, eventCalllback);
		}
	}
}