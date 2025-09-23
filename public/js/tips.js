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
		let _html = `<div data-module='tips' class="menu-ui-left${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-left menu-modal-left-content">
				<div class="skills-content-left talent-content-left menu-modal-left-container">
					<div class="w-100 flex tips-left-top" style="height:14%">
						<div class="flex flex-jc-start" style="padding:2vh">
							${getLangData('Rate Us')}
						</div>
						<div class="flex tips-left-top-right" style="flex:1;height:100%">
							<img onexactclick="getRef('tips')?.giveRate(1)" src="./images/ui/star-off.png" style="max-height:80%;max-width:80%;margin:5%" />
							<img onexactclick="getRef('tips')?.giveRate(2)" src="./images/ui/star-off.png" style="max-height:80%;max-width:80%;margin:5%" />
							<img onexactclick="getRef('tips')?.giveRate(3)" src="./images/ui/star-off.png" style="max-height:80%;max-width:80%;margin:5%" />
							<img onexactclick="getRef('tips')?.giveRate(4)" src="./images/ui/star-off.png" style="max-height:80%;max-width:80%;margin:5%" />
							<img onexactclick="getRef('tips')?.giveRate(5)" src="./images/ui/star-off.png" style="max-height:80%;max-width:80%;margin:5%" />
						</div>
					</div>
					<div class="w-100 tips-left-middle" style="height:72%">
						<textarea id="wot-feedback-input" onpaste="return false" ondrop="return false" autocomplete="off" maxlength="500" class="full" placeholder="${getLangData('Write your feedback')} (${getLangData('Optional')})"></textarea>
					</div>
					<div style="height:14%" class="flex tips-left-bottom action-button-container">
						<div onexactclick="getRef('tips')?.sendRate(this)" class="game-menu-button animate-me flex" onexactclick="" style="height:65%">
							<div class="flex">${getLangData('SEND FEEDBACK')}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div data-module='tips' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right menu-modal-right-content">
				<div class="skills-content-right talent-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container tips-right-container">
						<div class="full">
							<div class="w-100 flex tips-right-top" style="height:14%;padding:2vh">
								<div class="flex" style="flex:1;height:100%">
									<input onpaste="return false" ondrop="return false" autocomplete="off" id="wot-subscribe-input" maxlength="100" type="text" placeholder="${getLangData('Join Community With Email')}" />
								</div>
								<div onexactclick="getRef('tips')?.addToWishList(this)" class="flex" style="height:100%">
									<div class="game-menu-button animate-me flex">
										<div class="flex">${getLangData('ADD')}</div>
									</div>
								</div>
							</div>
							<div class="w-100 tips-right-middle" style="height:86%;overflow-y:auto">
								<div class="heading w-100 flex">${getLangData('Our Squad')}</div>
								<div class="flex flex-ai-start w-100">
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Özgün Değirmentepe</div>
											<div class="credit-item-job">[Developer]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Mehmet Canpolat</div>
											<div class="credit-item-job">[Art Designer]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Ricky Kasady</div>
											<div class="credit-item-job">[Cinematic Designer]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Robert Pinero</div>
											<div class="credit-item-job">[Character Designer]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Theon James</div>
											<div class="credit-item-job">[Map Designer]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Buğra Güven Günbatı</div>
											<div class="credit-item-job">[Tester]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Hasan Yanılmaz</div>
											<div class="credit-item-job">[Tester]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Yiğit Kuyucu</div>
											<div class="credit-item-job">[Tester]</div>
										</div>
									</div>
									<div class="credit-item w-100 flex">
										<div class="flex">
											<div class="credit-item-name">Tolga Canpolat</div>
											<div class="credit-item-job">[Tester]</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
		// '<div data-module="tips" class="book-page-wrapper tips-container' + (_noAnimation ? '' : ' fade-me') + '">'
		// 	+ '<div class="flex" style="width:91%;height:83%">' + renderComingSoonContent('Tips & Tricks Content') +
		// '</div></div>';
		updateMenuBottom(8);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
	}
	this.giveRate = function(_order, _noSound) {
		if(!_noSound)
    		PlaySound({ key: 'click' });
		this.rate = _order;
		const _imgs = document.querySelectorAll('.tips-left-top-right img');
		for(let i = 0; i < 5; i++) {
			if(i < _order)
				_imgs[i].src = './images/ui/star-on.png';
			else
				_imgs[i].src = './images/ui/star-off.png';
		}
	}
	this.isEmail = function(value) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(value);
	}
	this.addToWishList = function(_clicked) {
		//warn('<span>' + getLangData('Visit www.warriorsoftengri.com') + '</span>', 'warn');
		const _elem = document.getElementById('wot-subscribe-input');
    	PlaySound({ key: 'click' });
		let _txt = _elem.value;
		_txt = _txt.replace(/\s/g, '');
		if(_txt.length === 0 || !this.isEmail(_txt))
		{
			warn('<span>' + getLangData('Value must be in email format') + '</span>', 'warn');
			return;
		}
		addClass(_clicked, 'disabled');
		webClient.post('subscription/edit', { "id": _txt}, function() {
			warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/tick.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Welcome To Our Community') + '</span></div>', null, null, 1);
			if(_elem)
				_elem.value = '';
			removeClass(_clicked, 'disabled');
		}, function() {	
			removeClass(_clicked, 'disabled');		
			warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/cross.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Something Went Wrong') + '!</span></div>', null, null, 1);
		});
	}
	this.sendRate = function(_clicked) {
		//warn('<span>' + getLangData('Visit www.warriorsoftengri.com') + '</span>', 'warn');
		const _elem = document.getElementById('wot-feedback-input');
    	PlaySound({ key: 'click' });
		let _txt = _elem.value.trim();
		if(!this.rate && _txt.length === 0)
		{
			warn('<span>' + getLangData('You must give rate or write message') + '</span>', 'warn');
			return;
		}
		addClass(_clicked, 'disabled');
		webClient.post('feedback/edit', { "message": _txt, "rate": this.rate}, function() {
			warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/tick.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Feedback Sent') + '</span></div>', null, null, 1);
			if(_elem)
				_elem.value = '';
			getRef('tips')?.giveRate(0, 1);
			removeClass(_clicked, 'disabled');
		}, function() {	
			removeClass(_clicked, 'disabled');		
			warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/cross.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Something Went Wrong') + '!</span></div>', null, null, 1);
		});
	}
	return this;
}