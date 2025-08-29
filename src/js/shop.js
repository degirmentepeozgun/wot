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
			if(_lastReset < __account.storeDates.find(x => x.id === _si.id)?.date)
				_ok = 0;
		}
		_html += `<div class="store-item">
			<div${_price > 0 ? '' : ' id="free-store-item"'} class="store-item-wrapper flex${_ok ? '' : ' gray'}" onclick="askBuyStoreItem(${_si.id}, ${_ok})">
				<div class="store-item-title one-line${(_price > 0 || _ok) ? '' : ' d-none'}">${_si.count > 2 ? _si.count.toString() + ' x ' : ''}${_title}</div>
				<div class="flex store-item-icon"><img${(_price > 0 || !_ok) ? '' : ' class="glow-yellow"'} src='./images/icons/${_si.key}.png' /></div>
				<div class="store-item-price one-line${!_ok ? ' d-none': ''}${(_price > 0 || !_ok) ? '' : ' zoom-in-out'}"><span${_price > 0 ? '' : ' style="color:#F7C103 !important;font-weight:600;font-size:larger !important"'}>${_price}</span> <img${_price > 0 ? '' : ' class="d-none"'} src="./images/icons/coin.png" /></div>
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
		if(getDailyFreeStoreItem())
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
    let _modal = document.createElement('div');
	_modal.className = "full flex inventory-question";
	_modal.style.zIndex = 9999;
    _modal.innerHTML = `<div class="inventory-modal">
            <div class="flex store-item-purchase">
				<div class="w-100 flex p-2"><img src='./images/icons/${_item.key}.png' /></div>
                <div class="w-100 flex p-02">${getLangData('Confirm purchase')}?</div>
                <div class="w-100 flex p-02"><div class="flex">${getLangData('Price')}:&nbsp;${_price.formatWithDots()}&nbsp;<img src='./images/icons/coin.png' /></div></div>
			</div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;min-width:10vw;color:#F4BB44 !important;font-size:3vh !important" onclick="buyStoreItem(${_id})">${getLangData('YES')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;min-width:10vw;color:#F4BB44 !important;font-size:3vh !important" onclick="episode.playSound({ key: 'click' });closeInventoryQuestionModal()">${getLangData('NO')}</div>
            </div>
        </div>`;
    document.body.appendChild(_modal);
}

function buyStoreItem(_id) {
	const _item = __storeItems.find(x => x.id === _id);
	const _price = _item.price === 'function' ? _item.price() : _item.price;
	if(__account.gold < _price) {
		warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
		return;
	}
	episode.playSound({ key: 'reward' });
	let _title = misc.find(x => x.type === _item.key)?.titles?.[getLang()];
		if(!_title)
			switch(_item.key){
				case 'pot':
					_title = getLangData('Potion');
					break;
			}
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

function getDailyFreeStoreItem() {
	const _si = __account.storeDates?.find(x => x.id === 5);
	if(_si) {
		const _lastReset = getCurrentResetTime();
		if(_lastReset < _si.date)
			return false;
	}
	if(!__account.storeDates)
		__account.storeDates = [];
	if(_si)
		_si.date = new Date();
	else
		__account.storeDates.push({id: 5, date: new Date()});
	closeInventoryQuestionModal();
	createStoreUI(1);
	checkUpdateAvailable();
	warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/chest.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, null, 1);
	getChestReward(__account.grade ?? 1, 'misc', 'chest');
	_client.saveState();
	return true;
}

function checkIfStoreFreeItemAvailable() {
	const _lastReset = getCurrentResetTime();
	for(let _si of __storeItems) {
		let _price = (typeof _si.price === 'function' ? _si.price() : _si.price);
		if(_price === 0) {
			let _ok = 1;
			if(__account.storeDates) {
				if(_lastReset < __account.storeDates.find(x => x.id === _si.id)?.date)
					_ok = 0;
			}
			return _ok;
		}
	}
	return false;
}