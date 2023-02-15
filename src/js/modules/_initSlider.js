'use strict';
import Swiper, {Navigation, Pagination, Autoplay, FreeMode, Keyboard} from 'swiper';
export function initSlider() {
	const port = new Swiper('.feedback__slider-container', {
		modules:[Navigation, Pagination, Autoplay, FreeMode, Keyboard],
		loop: true,
		speed: 1000,
		pagination: {
			el: '.feedback__pagination',
			clickable: true,
			dynamicBullets: true
		},
		navigation: {
			nextEl: '.feedback__next',
			prevEl: '.feedback__prev',
		},
		autoplay: {
			delay: 10000,
		},
		keyboard: {
			enabled: true,
		},
		breakpoints: {
			569: {
				slidesPerView: 1,
				spaceBetween: 10
			},
		},
	});
}