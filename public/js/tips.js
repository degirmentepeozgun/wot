'use strict';
(function () {
	function tips() {
		console.log('tips');
		const _tips = [
			{
				id: 1,
				texts: {
					en: '',
					tr: ''
				}
			},
			{
				id: 2,
				texts: {
					en: '',
					tr: ''
				}
			}
		];
		this.render = function (_noAnimation) {
			updateMenuBottom(8);
			const _container = selectMenuContainer();

			_container.innerHTML = `<div data-module="tips" id="card-decks-container" class="book-page-wrapper lottery-container${_noAnimation ? '' : ' fade-me'}"></div>`;
			requestAnimationFrame(() => {
				const _a = document.getElementById('card-decks-container');
				if (_a) new storyBonus(null, null, _a);
			});
		};
		this.giveRate = function (_order, _noSound) {
			if (!_noSound) playClick();
			this.rate = _order;
			const _imgs = document.querySelectorAll('.tips-left-top-right img');
			for (let i = 0; i < 5; i++) {
				if (i < _order) _imgs[i].src = './images/ui/star-on.png';
				else _imgs[i].src = './images/ui/star-off.png';
			}
		};
		this.isEmail = function (value) {
			const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return regex.test(value);
		};
		this.addToWishList = function (_clicked) {
			const _elem = document.getElementById('wot-subscribe-input');
			playClick();
			let _txt = _elem.value;
			_txt = _txt.replace(/\s/g, '');
			if (_txt.length === 0 || !this.isEmail(_txt)) {
				warn('<span>' + getLangData('Value must be in email format') + '</span>', 'warn');
				return;
			}
			addClass(_clicked, 'disabled');
			webClient.post(
				'subscription/edit',
				{ 'id': _txt },
				function () {
					warn(
						'<div class="flex achievement important" style="position:relative"><img style="height:12cqh" src="./images/icons/tick.png" />&nbsp;<span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' +
							getLangData('Welcome To Our Community') +
							'</span></div>',
						null,
						null,
						1
					);
					if (_elem) _elem.value = '';
					removeClass(_clicked, 'disabled');
				},
				function () {
					removeClass(_clicked, 'disabled');
					warn(
						'<div class="flex achievement important" style="position:relative"><img style="height:12cqh" src="./images/icons/cross.png" />&nbsp;<span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' +
							getLangData('Something Went Wrong') +
							'!</span></div>',
						null,
						null,
						1
					);
				}
			);
		};
		this.sendRate = function (_clicked) {
			const _elem = document.getElementById('wot-feedback-input');
			playClick();
			let _txt = _elem.value.trim();
			if (!this.rate && _txt.length === 0) {
				warn('<span>' + getLangData('You must give rate or write message') + '</span>', 'warn');
				return;
			}
			addClass(_clicked, 'disabled');
			webClient.post(
				'feedback/edit',
				{ 'message': _txt, 'rate': this.rate },
				function () {
					warn(
						'<div class="flex achievement important" style="position:relative"><img style="height:12cqh" src="./images/icons/tick.png" />&nbsp;<span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' +
							getLangData('Feedback Sent') +
							'</span></div>',
						null,
						null,
						1
					);
					if (_elem) _elem.value = '';
					getRef('tips')?.giveRate(0, 1);
					removeClass(_clicked, 'disabled');
				},
				function () {
					removeClass(_clicked, 'disabled');
					warn(
						'<div class="flex achievement important" style="position:relative"><img style="height:12cqh" src="./images/icons/cross.png" />&nbsp;<span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' +
							getLangData('Something Went Wrong') +
							'!</span></div>',
						null,
						null,
						1
					);
				}
			);
		};
		return this;
	}
	window.tips = tips;
})();
