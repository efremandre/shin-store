'use strict';

export function catalog() {
	const getCards = async () => {
		const response = await fetch('../../files/cards.json');
		const data = await response.json();
		return data;
	}

	const creatCards = async () => {
		const DATA = await getCards();

		const getOutputCard = (data) => {
			document.querySelector('.card__grid').innerHTML = data.map(el =>
				`<li class="card__item">
                    <article class="card__body">
                        <div class="card__image-wrapper">
                            <img data-images src="${el.url}" title="Шины ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber}" alt="Шины ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber}">
                        
                        </div>
                        <div class="card__content">
                            <div class="card__title-wrapper">
                            	<h3 class="card__title">${el.title.brand}
													${el.title.modelname}
													${el.title.modelnumber}
													</h3>
								<ul class="card__listcharact">
									<li title="Ширина и высота ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber}">${el.title.width}/${el.title.height}</li>
									<li title="Радиус ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber}">R${el.title.radius}</li>
									<li title="Индекс нагрузки и скорости ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber}">${el.title.indexload}${el.title.indexspeed} </li>
									<li title="${el.season.alt} шины ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber}">
										<img src="../../assets/images/icon/${el.season.url}.svg" alt="${el.season.alt} шины ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber}">
									</li>
								</ul>
							</div>
                            <div class="card__param">
                                <p class="card__price" title="Стоимость шин ${el.title.brand} ${el.title.modelname} ${el.title.modelnumber} ${el.price} руб/шт">${el.price}₽ / шт</p>
                                <a title="Написать Шин.Store в WhatsApp" href="https://wa.me/79298424232" class="card__btn fullscreen__button button">Уточнить наличие</a>
                            </div>
                        </div>
                    </article>
                </li>`
			).join('');
		}

		getOutputCard(DATA);
	}

	creatCards();
}