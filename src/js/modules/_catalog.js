'use strict';

export function catalog() {
	const getCards = async () => {
		const response = await fetch('../../files/cards.json') // https://jsonplaceholder.typicode.com/photos
		const data = await response.json();
		return data;
	}

	const main = async () => {
		const DATA = await getCards();
		const filters = document.querySelector('.catalog__filter');

		const getFilter = () => {
			const season = filters.querySelector('#season').value;
			const grid = document.querySelector('.card__grid');
			grid.style.transform = `translateX(0)`;

			getOutputCard(DATA.filter(el => ((!season || el.season === season))));
		}

		const getOutputCard = (data) => {
			document.querySelector('.card__grid').innerHTML = data.map(el =>
				`<li class="card__item">
                    <article class="card__body">
                        <div class="card__image-wrapper">
                            <img src="${el.url}" alt="*">
                            <span class="card__season-icon">
                            	<img src="../../assets/images/icon/${el.season.url}.svg" alt="${el.season.alt} шины">
                            </span>
                        </div>
                        <div class="card__content">
                            <div class="card__title-wrapper">
                            	<h3 class="card__title">${el.title.brand}
													${el.title.modelname}
													${el.title.modelnumber}
													</h3>
								<ul class="card__listcharact">
								<li title="Ширина и высота">${el.title.width}/${el.title.height}</li>
								<li title="Радиус">R${el.title.radius}</li>
								<li title="Индекс нагрузки и скорости">${el.title.indexload}${el.title.indexspeed}</li>
								</ul>
							</div>
                            <div class="card__param">
                                <p class="card__price">${el.price}₽ / шт</p>
                                <a title="Написать Шин.Store в WhatsApp" href="https://wa.me/79298424232" class="card__btn fullscreen__button button">Уточнить наличие</a>
                            </div>
                        </div>
                    </article>
                </li>`
			).join('');
		}


		const getSlider = () => {
			const prev = document.querySelector('.catalog__btn_prev');
			const next = document.querySelector('.catalog__btn_next');
			const slideTrack = document.querySelector('.card');
			const slide = document.querySelector('.card__grid');
			const slideOffset = slide.childNodes[0].offsetWidth;

			const maxScrollLeft = slideTrack.scrollWidth - slideTrack.clientWidth

			const getPrev = () => {
				slideTrack.scrollLeft -= slideOffset * 2;
				if (slideTrack.scrollLeft === 0) {
					prev.setAttribute('disabled', 'disabled');
				} else if (slideTrack.scrollLeft < maxScrollLeft) {
					next.removeAttribute('disabled', 'disabled');
				}
			}

			const getNext = () => {
				slideTrack.scrollLeft += slideOffset * 2;
				if (slideTrack.scrollLeft === maxScrollLeft) {
					next.setAttribute('disabled', 'disabled');
				} else if (slideTrack.scrollLeft > 0) {
					prev.removeAttribute('disabled', 'disabled');
				}
			}

			const getPrevScroll = () => {
				const prev = document.querySelector('.catalog__btn_prev');
				const next = document.querySelector('.catalog__btn_next');
				const slideTrack = document.querySelector('.card');
				const maxScrollLeft = slideTrack.scrollWidth - slideTrack.clientWidth

				if (slideTrack.scrollLeft === 0) {
					prev.setAttribute('disabled', 'disabled');
					console.log('start')
				} else if (slideTrack.scrollLeft === maxScrollLeft) {
					next.setAttribute('disabled', 'disabled');
				} else {
					prev.removeAttribute('disabled', 'disabled');
					next.removeAttribute('disabled', 'disabled');
				}
			}

			prev.addEventListener('click', getPrev);
			document.querySelector('.card').addEventListener('scroll', getPrevScroll);
			next.addEventListener('click', getNext);

		}

		getOutputCard(DATA);
		filters.addEventListener('input', getFilter);
		getSlider();
	}

	function getSearch() {
		const input = document.getElementById('myInput');
		const cardWrapper = document.querySelector('.card__grid');

		input.oninput = () => {
			const inputValue = input.value.toLowerCase();
			let textValue;
			const card = document.querySelectorAll('.card__item');
			card.forEach(el => {
				textValue = el.textContent || el.innerText;
				console.log(textValue.toLowerCase().search(inputValue))
				if (textValue.toLowerCase().search(inputValue) > -1) {
					el.classList.remove('_card-item-hidden');
				} else {
					el.classList.add('_card-item-hidden');
					if (el.style.display = 'none') {
						cardWrapper.innerHTML = `<p>Ничего не найдено...</p>`
					}
				}
			})
		}
	}

	main();
	getSearch();
}