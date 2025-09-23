'use strict';

function createStoreUI(_noAnimation) {
	let _html = '<div class="book-page-wrapper shop-container' + (_noAnimation ? '' : ' fade-me') + '"><div class="flex book-page-bg">';
	const _lastReset = getCurrentResetTime();
	for(let _si of __storeItems) {
		let _title = misc.find(x => x.type === _si.key)?.titles?.[getLang()];
		if(!_title)
			switch(_si.key){
				case 'pot':
					_title = getLangData('Potion');
					break;
			}
		let _price = (typeof _si.price === 'function' ? _si.price() : _si.price);
		if(_price > 0)
			_price = _price.formatWithDots();
		else 
			_price = getLangData('Free');
		let _ok = 1;
		if(__account.storeDates) {
			let _date = __account.storeDates.find(x => x.id === _si.id)?.date;
			if(_date && (typeof _date === "string"))
				_date = new Date(_date);
			if(_lastReset < _date)
				_ok = 0;
		}
		_html += `<div class="store-item">
			<div${_price > 0 ? '' : ' id="free-store-item"'} class="store-item-wrapper flex${_ok ? '' : ' gray'}" onexactclick="askBuyStoreItem(${_si.id}, ${_ok})">
				<div class="store-item-title one-line${(_price > 0 || _ok) ? '' : ' v-none'}">${_si.count > 2 ? _si.count.toString() + ' x ' : ''}${_title}</div>
				<div class="flex store-item-icon"><img${(_price > 0 || !_ok) ? '' : ' class="glow-yellow"'} src='./images/icons/${_si.key}.png' /></div>
				<div class="store-item-price one-line${!_ok ? ' v-none': ''}${(_price > 0 || !_ok) ? '' : ' zoom-in-out'}"><span${_price > 0 ? '' : ' style="color:#F7C103 !important;font-weight:600;font-size:larger !important"'}>${_price}</span> <img${_price > 0 ? '' : ' class="d-none"'} src="./images/icons/coin.png" /></div>
			</div>
			<div class="store-item-price store-item-price-sold${_ok ? ' d-none': ' flex'}">${getLangData('SOLD')}!</div>
		</div>`;
	}
	
    updateMenuBottom(7);
    const _container = selectMenuContainer();
    _container.innerHTML =  _html + '</div></div>';
}

function askBuyStoreItem(_id, _ok) {
	if(!_ok) {
		episode.playSound({ key: 'disabled' });
		return;
	}
	const _item = __storeItems.find(x => x.id === _id);
	const _price = typeof _item.price === 'function' ? _item.price() : _item.price;
	if(_price === 0) {
		if(getDailyFreeStoreItem(_item.id))
			episode.playSound({ key: 'reward' });
		else
			episode.playSound({ key: 'disabled' });
		return;
	}
    episode.playSound({ key: 'click' });
	let _title = misc.find(x => x.type === _item.key)?.titles?.[getLang()];
		if(!_title)
			switch(_item.key){
				case 'pot':
					_title = getLangData('Potion');
					break;
			}
	// if(_price < __account.gold) {
    //     warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
    //     return;
	// }
	askSomething(`<div class="flex store-item-purchase">
				<div class="w-100 flex p-02"><img style="height:12vh !important" src='./images/icons/${_item.key}.png' /></div>
                <div class="w-100 flex p-02">${getLangData('Confirm purchase')}?</div>
                <div class="w-100 flex" style="padding:0 2vh"><div class="flex">${getLangData('Price')}:&nbsp;${_price.formatWithDots()}&nbsp;<img src='./images/icons/coin.png' /></div></div>
			</div>`, 'buyStoreItem(' + _id + ')');
}

function buyStoreItem(_id) {
	const _item = __storeItems.find(x => x.id === _id);
	const _price = _item.price === 'function' ? _item.price() : _item.price;
	if(__account.gold < _price) {
		closeInventoryQuestionModal();
		warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
		return;
	}
	let _title = misc.find(x => x.type === _item.key)?.titles?.[getLang()];
		if(!_title)
			switch(_item.key){
				case 'pot':
					_title = getLangData('Potion');
					break;
			}
	if(_item.key === 'pot') {
		let _pot = __account.pots.find(x => x.key === 'pot');
		if(((_pot?.value ?? 0) + (_item.count ?? 1)) > __maxPotCount) {
			closeInventoryQuestionModal();
			warn('<span>' + getLangData('You can not carry more pots') + '</span>', 'warn');
			return;
		}
	}
	PlaySound({ key: 'reward' });
    updateGold(-_price);
	if(!__account.storeDates)
		__account.storeDates = [];
	const _si = __account.storeDates.find(x => x.id === _id);
	if(_si)
		_si.date = new Date();
	else
		__account.storeDates.push({id: _id, date: new Date()});
	warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/' + _item.key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + (_item.count > 1 ? _item.count.toString() + ' x ' : '') + _title + '</span></div>', null, null, 1);
	getChestReward(__account.grade ?? 1, _item.key === 'pot' ? 'pot' : 'misc', _item.key, _item.count);
	closeInventoryQuestionModal();
	createStoreUI(1);
}

function getDailyFreeStoreItem(_id) {
	const _si = __account.storeDates?.find(x => x.id === _id);
	if(_si) {
		const _lastReset = getCurrentResetTime();
		let _date = _si.date;
		if(_date && (typeof _date === "string"))
			_date = new Date(_date);
		if(_lastReset < _date)
			return false;
	}
	if(!__account.storeDates)
		__account.storeDates = [];
	if(_si)
		_si.date = new Date();
	else
		__account.storeDates.push({id: _id, date: new Date()});
	closeInventoryQuestionModal();
	createStoreUI(1);
	warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/chest.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, null, 1);
	getChestReward(__account.grade ?? 1, 'misc', 'chest');
	_client.saveState();
	checkUpdateAvailable2(8);
	return true;
}

function checkIfStoreFreeItemAvailable() {
	const _lastReset = getCurrentResetTime();
	for(let _si of __storeItems) {
		let _price = (typeof _si.price === 'function' ? _si.price() : _si.price);
		if(_price === 0) {
			let _ok = 1;
			if(__account.storeDates) {
				let _date = __account.storeDates.find(x => x.id === _si.id)?.date;
				if(_date && (typeof _date === "string"))
					_date = new Date(_date);
				if(_lastReset < _date)
					_ok = 0;
			}
			return _ok;
		}
	}
	return false;
}