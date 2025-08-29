'use strict';
console.log('tips');
function tips() {
	const _tips = [
		{ id:1, texts: {
			en: '',
			tr: ''
		}},
		{ id:2, texts: {
			en: '',
			tr: ''
		}},
	];
	this.render = function(_noAnimation) {
		let _html = 
		'<div data-module="tips" class="book-page-wrapper tips-container' + (_noAnimation ? '' : ' fade-me') + '">'
			+ '<div class="flex" style="width:91%;height:83%">' + renderComingSoonContent('Tips & Tricks Content') +
		'</div></div>';
		updateMenuBottom(8);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
	}
	return this;
}