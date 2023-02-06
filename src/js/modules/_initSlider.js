'use strict';
import Swiper, {Navigation, Pagination, Autoplay, Lazy, FreeMode, Keyboard, Thumbs, Mousewheel} from 'swiper';
export function initSlider() {
	// Swiper.use([Navigation, Pagination, Autoplay, Lazy, FreeMode]);
	const port = new Swiper('.feedback__slider-container', {
		modules:[Navigation, Pagination, Autoplay, FreeMode, Keyboard],
		loop: true,
		speed: 1000,
		spaceBetween: 30,
		pagination: {
			el: '.portfolio__pagination',
			clickable: true,
			dynamicBullets: true
		},
		navigation: {
			nextEl: '.portfolio__next',
			prevEl: '.portfolio__prev',
		},
		autoplay: {
			delay: 6000,
		},
		keyboard: {
			enabled: true,
		},
		breakpoints: {
			569: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
		},
	});
}