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
	updateMenuBottom(4);
	const _container = selectMenuContainer();
	_container.innerHTML = 
		`<div class="honor-items-container full flex">
				<div class="menu-ui-left fade-me">
						<div class="menu-modal-left">
							<div class="skills-content-left menu-modal-left-container">
								<div style="padding:1% 5%;overflow-y:auto" class="full">`
						+ getHonorItemsUI(_type ?? Object.keys(_equips)[0]) +
					`</div>
							</div>
						</div>
					</div>
					<div class="menu-ui-right fade-me"> 
							<div class="menu-modal-right">
						<div class="skills-content-right">
								<div class="skills-content-detail-wrapper honor-items-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">`
							+ getHonorItemDetailUI(_type ?? Object.keys(_equips)[0]) +
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
function getHonorItemsUI(_type) {
	var _items = getRandomItems(4, mainCharacter.class);
	let html = '<div class="honor-items-list-wrapper">';
	for (var _item of _items) {
		const _perc = getHonorItemForgePerc(_item.type);
		html += '<div data-key="' + _item.type + '" onclick="selectHonorItem(\'' + _item.type + '\')" class="' + (_perc >= 100 ? 'glow ' : '') + 'honor-item-card flex-jc-start flex' + (_item.type === _type ? ' selected' : '') + '">'
				+ getHonorItemIcon(_item, 1) +
				'<div style="flex:1"><span class="honor-item-list-title one-line">' + 
				getItemGradeLetter(4) + ' ' + getLangData('Grade') + ' ' + 
				getLangData(_item.type).toProperCase() + '</span>' + 
				'<div class="honor-item-list-cost flex flex-jc-end">' + 
				(_perc >= 0 ? '<div class="honor-item-progress-wrapper"><div style="width:' + _perc + '%" class="honor-item-progress"></div></div>' : __forges[_item.type].cost + '<img src="./images/icons/honor.png"/>') + 
				'</div></div>' +
			'</div>';
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
function getHonorItemDetailUI(_type) {
	var _item = JSON.parse(JSON.stringify(_equips[_type].grade4));
	_item.type = _type;
	_item.grade = 4;
	_item.level = 1;
	_item.cost = __forges[_type].cost;
	_item.time = __forges[_type].time;
	const _forgeStart = __account.forges?.find(x => x.type === _type)?.start;
	const _date = ((_forgeStart ?? 0) + (_item.time * 60 * 60 * 1000));
	const _enabled = _date < _gameTick && _forgeStart;
	const _perc = getHonorItemForgePerc(_type);
	let html = '<div style="height:86%;overflow-y:auto;padding-top:1.5vh">' +
	'<div class="forge-item-desc">' + getLangData('Redeem your honor points, own an item with 4 random attributes after forge time') + '</div>' +
		'<div class="flex w-100"><div class="honor-items-content-title flex flex-jc-start w-50">' + getLangData('Forge Time') + '</div>' +
		'<div class="flex w-50 flex-jc-end honor-items-content-value">'  + _item.time + ' ' + getLangData('hours') + '</div></div>' +
		'<div class="flex w-100"><div class="honor-items-content-title flex flex-jc-start w-50">' + getLangData('Cost') + '</div>' +
		'<div class="flex w-50 flex-jc-end honor-items-content-value">' + _item.cost + '&nbsp;/&nbsp;<span' + ((__account.pvp.honor < _item.cost) ? ' style="color:#FD1C03 !important"' : '') + '>' + __account.pvp.honor + '</span>&nbsp;<img class="honor-item-cost-icon" src="./images/icons/honor.png" /></div></div>' +
		'<div class="flex w-100"><div class="honor-items-content-title flex w-50 flex-jc-start">' + getLangData('Progress') + '</div>' +
		'<div class="flex w-50 flex-jc-end honor-items-content-value">'  + (!_enabled ? getLangData('Not started') : '<span class="forge-time-left" style="opacity:.75;color:#ff6c00 !important">(' + getLangData('last') + ' ' + getTimeDiffUntilDate(new Date(_date)) + ')</span>') + '</div></div>' +
		'<div class="flex w-100"><div class="honor-items-content-title flex-jc-start flex w-50">' + getLangData('Min Level') + '</div>' +
		'<div class="w-50 flex flex-jc-end honor-items-content-value">' + _item.minLevelRequired + '</div></div>' +
		'<div class="flex w-100"><div class="honor-items-content-title flex-jc-start flex w-50">' + getLangData('Max Upgrade Level') + '</div>' +
		'<div class="flex flex-jc-end w-50 honor-items-content-value">' + _item.maxLevel + '</div></div>' +
		'<div class="flex w-100"><div class="honor-items-content-title bold-title flex-jc-start flex w-100">' + getLangData('Attribute Possibilities') + '</div>' +
		'<div class="w-100 flex flex-jc-end honor-items-content-value">' + renderItemProps(_item, '#ffffffcc') + '</div></div>' +
		'</div>' +
		'<div style="height:14%" class="flex">' +
			'<div class="game-menu-button animate-me flex' + (_perc < 0 ? '' : ' d-none') + ((__account.pvp.honor < _item.cost || !_enabled) ? ' gray disabled' : '') + '" onclick="askStartForge(\'' + _type + '\')" style="height:65%"><div class="flex">' + getLangData('CREATE') + '</div></div>' + 
			'<div class="game-menu-button animate-me flex' + (_perc >= 100 ? ' glow' : (_perc < 0 ? ' d-none' : ' gray disabled')) + '" onclick="takeForgedItem(\'' + _type + '\')" style="height:65%"><div class="flex">' + getLangData('READY') + '</div></div>' + 
			'</div>';
	return html;
}
function takeForgedItem(_type) {
	if(pushItemIntoInventory(getSpecificItem(_type, 4, mainCharacter.class))) {
		__account.forges = __account.forges?.filter(x => x.type !== _type);
		_client.saveState();
		getHonorStoreUI(_type);
	}
}
function askStartForge(_type) {
	var _item = JSON.parse(JSON.stringify(_equips[_type].grade4));
	_item.cost = __forges[_type].cost;
	askSomething(`${getLangData('Redeem honor points')} <b style="margin:0 1vh;color:#F4BB44 !important">${_item.cost.formatWithDots()}</b> <img style="height:4vh" src="./images/icons/honor.png" />`, "startForge('" + _type + "')");
}
function startForge(_type) {
	if(!__account.forges)
		__account.forges = [];
	const _cost = __forges[_type].cost;
	if(_cost > __account.pvp.honor) {
		warn('<span>' + getLangData('Not enough honor points') + '</span>', 'warn');
		return;
	}
	closeInventoryQuestionModal();
	__account.forges.push({start:_gameTick, type: _type});
	__account.pvp.honor -= _cost;
	_client.saveState();
	getHonorStoreUI(_type);
}
function getHonorItemIcon(_item) {
    return '<span class="full grade' + _item.grade + '-item" style="display:inline-block;position:relative"><img style="background:#010101" class="item-img" src="./images/items/icons/' + (_item.for ? (_item.for + '/') : '') + _item.type + _item.grade + '.png"/></span>';
}