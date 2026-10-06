'use strict';

const __forges = {
	"helmet": {
		cost: 80,
		time: 8
	},
	"belt": {
		cost: 60,
		time: 6
	},
	"gloves": {
		cost: 70,
		time: 7
	},
	"leggings": {
		cost: 80,
		time: 8
	},
	"boots": {
		cost: 70,
		time: 7
	},
	"chest": {
		cost: 80,
		time: 8
	},
	"ring": {
		cost: 60,
		time: 6
	},
	"necklace": {
		cost: 60,
		time: 6
	},
	"bracers": {
		cost: 70,
		time: 7
	},
	"weapon": {
		cost: 120,
		time: 12
	}
}
function getHonorStoreUI(_type) {
	let _tutorial = {
			tr: {
				title: 'Onur Ödülleri',
				desc: '1v1 Arena veya 3v3 Savaş içeriklerinden kazandığınız onur puanlarını sol kısımda gördüğünüz ekipmanları seçerek kullanabilirsiniz. Öncelikle dövülmesi gereken bu ekipmanlar ödemeyi yaptıktan belli bir süre sonra aktif olur.'
			},
			en: {
				title: 'Honor Items',
				desc: 'You can spend the honor points you earn from 1v1 Arena or 3v3 War content by selecting the equipment you see on the left. These equipment must be crafted first, and they become active after a certain amount of time has passed.'
			}
		};
		if(!tryShowMenuTutorial('honor'))
			_tutorial = undefined;
	let _content = showMenuTutorial(_tutorial, 'honor');
	updateMenuBottom(4);
	const _container = selectMenuContainer();
	_container.innerHTML = 
		`<div class="honor-items-container full flex">
				<div class="menu-ui-left fade-me">
						<div class="menu-modal-left menu-modal-left-content">
							<div class="skills-content-left menu-modal-left-container">`
						+ getHonorItemsUI(_type ?? Object.keys(_equips)[0]) +
					`</div>
						</div>
					</div>
					<div class="menu-ui-right fade-me"> 
							<div class="menu-modal-right menu-modal-right-content">
						<div class="skills-content-right">
								<div class="skills-content-detail-wrapper honor-items-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">`
							+ (_content !== '' ? _content : getHonorItemDetailUI(_type ?? Object.keys(_equips)[0], 1, 1)) +
						`</div>
					</div>
				</div>
			</div>
		</div>`;
}
function getHonorItemForgePerc(_type) {
	const _forgeStart = __account.forges?.find(x => x.type === _type)?.start;
	let _perc;
	if(_forgeStart){
		const _time = __forges[_type].time * 60 * 60 * 1000;
		const _end = _time + _forgeStart;
		if(_gameTick >= _end)
			_perc = 100;
		else 
			_perc = MathFloor(((_gameTick - _forgeStart) / _time) * 100);
		if(_perc > 100)
			_perc = 100; 
		return _perc;
	}
	return -1;
}
function getHonorItemUI(_item) {
	const _perc = getHonorItemForgePerc(_item.type);
	return  getHonorItemIcon(_item, 1) +
	'<div class="honor-item-desc"><div class="honor-item-list-title flex flex-jc-start w-100 skill-card-title one-line">' + 
	getItemGradeLetter(4) + ' ' + getLangData('Grade') + ' ' + 
	getLangData(_item.type).toProperCase() + '</div>' + 
	'<div class="honor-item-list-cost skill-card-level flex flex-jc-end">' + 
	(_perc >= 0 ? '<div class="honor-item-progress-wrapper"><div style="width:' + _perc + '%" class="honor-item-progress"></div></div>' : __forges[_item.type].cost + '<img src="./images/icons/honor.png"/>') + 
	'</div></div>';
}
function getHonorItemsUI(_type) {
	var _items = getRandomItems(4, mainCharacter.class);
	let html = '<div class="full honor-items-list-wrapper skill-content-inner">';
	const _noSelect = tryShowMenuTutorial('honor');
	for (var _item of _items){
		const _perc = getHonorItemForgePerc(_item.type);
		html += '<div data-key="' + _item.type + '" onexactclick="selectHonorItem(\'' + _item.type + '\')" class="' + (_perc >= 100 ? 'glow ' : '') + 'honor-item-card skill-card flex-jc-start flex' + (((_item.type === _type) && !_noSelect) ? ' selected' : '') + '">' +
		 getHonorItemUI(_item) + '</div>';
	}
	return html + '</div>';
}
function selectHonorItem(_type) {
	const _itemCards = document.querySelectorAll('.honor-items-container .honor-item-card');
	const _container = document.querySelector('.honor-items-container .honor-items-content-detail-wrapper');
	let _i = 0;
	for (var _hc of _itemCards) {
		if (_hc.getAttribute('data-key') === _type) {
			addClass(_hc, 'selected');
			_container.innerHTML = getHonorItemDetailUI(_type) + '<div id="shine"></div>';
		}
		else
			removeClass(_hc, 'selected');
		_i++;
	}
}
function getHonorItemDetailUI(_type, _noSound, _noAnimation) {
	if(!_noSound)
		playClick();
	var _item = JSON.parse(JSON.stringify(_equips[_type].grade4));
	_item.type = _type;
	_item.grade = 4;
	_item.level = 1;
	_item.cost = __forges[_type].cost;
	_item.time = __forges[_type].time;
	const _forgeStart = __account.forges?.find(x => x.type === _type)?.start;
	const _date = ((_forgeStart ?? 0) + (_item.time * 60 * 60 * 1000));
	const _enabled = (_date < _gameTick && _forgeStart) || !_forgeStart;
	let _status, _started = _forgeStart;
	if(_forgeStart && (_date < _gameTick))
		_status = getLangData('Ready');
	else if(_forgeStart)
		_status = '(' + getLangData('last') + ' ' + getTimeDiffUntilDate(new Date(_date)) + ')';
	const _perc = getHonorItemForgePerc(_type);
	let html = '<div class="honor-scroll-area-wrapper flex full"><div class="honor-scroll-area' + (_noAnimation ? '' : ' fade-me') + '"><div class="full">' +
	'<div class="forge-item-desc w-100 flex"><div class="page-detail-badge"><img src="./images/ui/game/desc-badge.png" /></div><div class="flex flex-jc-start">' + getLangData('Redeem your honor points, own an item with 4 random attributes after forge time') + '</div></div>' +
		'<div class="page-detail-splitter"></div>' +
		'<div class="flex w-100"><div class="page-detail-item-label honor-items-content-title flex flex-jc-start w-50"><img src="./images/ui/game/prop-badge.png" />' + getLangData('Forge Time') + '</div>' +
		'<div class="page-detail-item-value flex w-50 flex-jc-end honor-items-content-value">'  + _item.time + ' ' + getLangData('hours') + '</div></div>' +
		'<div class="page-detail-item-label flex w-100"><div class="page-detail-item-label honor-items-content-title flex flex-jc-start w-50"><img src="./images/ui/game/prop-badge.png" />' + getLangData('Cost') + '</div>' +
		'<div class="page-detail-item-value flex w-50 flex-jc-end honor-items-content-value">' + _item.cost + '&nbsp;/&nbsp;<span' + ((__account.pvp.honor < _item.cost) ? ' style="color:#FD1C03 !important"' : '') + '>' + __account.pvp.honor + '</span>&nbsp;<img class="honor-item-cost-icon" src="./images/icons/honor.png" /></div></div>' +
		'<div class="page-detail-item-label flex w-100"><div class="page-detail-item-label honor-items-content-title flex w-50 flex-jc-start"><img src="./images/ui/game/prop-badge.png" />' + getLangData('Progress') + '</div>' +
		'<div class="page-detail-item-value flex w-50 flex-jc-end honor-items-content-value">'  + (!_started ? getLangData('Not started') : '<span class="forge-time-left" style="opacity:.75;color:#ff6c00 !important">' + _status + '</span>') + '</div></div>' +
		'<div class="page-detail-item-label flex w-100"><div class="page-detail-item-label honor-items-content-title flex-jc-start flex w-50"><img src="./images/ui/game/prop-badge.png" />' + getLangData('Min Level') + '</div>' +
		'<div class="page-detail-item-value w-50 flex flex-jc-end honor-items-content-value">' + _item.minLevelRequired + '</div></div>' +
		'<div class="page-detail-item-label flex w-100"><div class="page-detail-item-label honor-items-content-title flex-jc-start flex w-50"><img src="./images/ui/game/prop-badge.png" />' + getLangData('Max Upgrade Level') + '</div>' +
		'<div class="page-detail-item-value flex flex-jc-end w-50 honor-items-content-value">' + _item.maxLevel + '</div></div>' +
		'<div class="flex w-100"><div class="flex-jc-start flex w-100 page-detail-header">' + getLangData('Attribute Possibilities') + '</div>' +
		'<div class="page-detail-splitter"></div>' +
		'<div class="w-100 flex flex-jc-end honor-items-content-value">' + renderItemProps(_item, '#ffffffcc') + '</div></div>' +
		'</div></div>' +
		'<div class="flex action-button-container">' +
			'<div class="page-detail-splitter"></div>' +
			'<div class="page-detail-button animate-me flex' + (_perc < 0 ? '' : ' d-none') + '" onexactclick="askStartForge(\'' + _type + '\')"><div class="flex">' + getLangData('CREATE') + '</div></div>' + 
			'<div class="page-detail-button animate-me flex' + (_perc >= 100 ? ' glow' : (_perc < 0 ? ' d-none' : ' gray disabled')) + '" onexactclick="takeForgedItem(\'' + _type + '\')"><div class="flex">' + getLangData('READY') + '</div></div>' + 
		'</div></div>';
	return html;
}
function updateForgeItemUI(_key) {
	const _card = document.querySelector('.honor-item-card[data-key="' + _key + '"]');
	_card.innerHTML = getHonorItemUI(getRandomItem(4, _key, mainCharacter.class));
	const _html = getHonorItemDetailUI(_key, null, 1);
	const _cont = document.querySelector('.honor-items-content-detail-wrapper');
	_cont.innerHTML = _html;
	removeClass(_card, 'fade-me');
	addClass(_card, 'fade-me');
	removeClass(_cont, 'fade-me');
	addClass(_cont, 'fade-me');
}
function takeForgedItem(_type) {
	if(pushItemIntoInventory(getSpecificItem(_type, 4, mainCharacter.class))) {
		PlaySound({key:'forgestart', volume:.5});
		__account.forges = __account.forges?.filter(x => x.type !== _type);
		_client.saveState();
		//getHonorStoreUI(_type);
		updateForgeItemUI(_type);
	}
}
function askStartForge(_type) {
	var _item = JSON.parse(JSON.stringify(_equips[_type].grade4));
	_item.cost = __forges[_type].cost;
	if(__account.pvp.honor < _item.cost) {
		warn('<span>' + getLangData('Not enough honor points') + '</span>', 'warn');
		return;
	}
	askSomething(`${getLangData('Redeem honor points')} <b style="margin:0 1vh;color:#F4BB44 !important">${_item.cost.formatWithDots()}</b> <img style="height:4vh" src="./images/icons/honor.png" />`, "startForge('" + _type + "')", "modal_2x1");
}
function startForge(_type) {
	if(!__account.forges)
		__account.forges = [];
	const _cost = __forges[_type].cost;
	PlaySound({key:'forgeready', volume:.5});
	if(_cost > __account.pvp.honor) {
		warn('<span>' + getLangData('Not enough honor points') + '</span>', 'warn');
		return;
	}
	closeInventoryQuestionModal(1);
	__account.forges.push({start:_gameTick, type: _type});
	__account.pvp.honor -= _cost;
	_client.saveState();
	//getHonorStoreUI(_type);
	updateForgeItemUI(_type);
}
function getHonorItemIcon(_item) {
    return '<div class="full skill-card-icon grade' + _item.grade + '-item" style="display:inline-block;position:relative"><img class="item-img" src="./images/items/icons/' + (_item.for ? (_item.for + '/') : '') + _item.type + _item.grade + '.png"/></div>';
}