'use strict';
function hideSideMenu(_func) {
	document.removeEventListener("click", outsideClick, true);
	const _ml = document.querySelector('.menu-left-opener');
	if(_ml) {
		addClass(_ml, 'slide-to-left');
		addClass(_ml, 'closing');
		_ml.onanimationend = function(e) {
			if(e.animationName === 'slide-to-left'){
				if(_ml)
					_ml.remove();
				if(_func)
					_func();
			}
		}
	}
}
function outsideClick(e) {
	if(document.getElementById('focus-ui'))
		return;
	const _m = document.querySelector('.menu-left-opener.opened');
	if(!_m)
		return;
	if (_m.contains(e.target))
		return;
	closeSideMenu();
}
function closeSideMenu() {
	playClick();
	hideSideMenu();
}
function openSideMenu() {
   	playClick();
	const _ml = document.querySelector('.menu-left-opener');
	if(_ml)
		return;
	let _html = '<div class="menu-left-opener show-ui flex flex-ai-start">';
	for(let _m of __holoMenuItems)
		_html += `<div id="lobby-${_m.icon}" class="flex menu-left-opener-item animate-me" onexactclick="openSectionFromMenu(${_m.order},${_m.subOrder},${_m.tabOrder ?? 0})">
			<div class="w-100 flex">
				<div class="w-100 flex"><img src="./images/ui/game/menu-icons/${_m.icon}.png" /></div>
				<div class="w-100 flex">${_m.lang ? getLangData(_m.lang) : _m.titles[getLang()]}</div>
			</div>
		</div>`;
	'</div>';
	const _div = document.createElement('div');
	_div.innerHTML = _html;
	_div.firstChild.onanimationend = function(e) {
		if(e.animationName === 'slide-from-left'){
			const _ml = document.querySelector('.menu-left-opener');
			if(_ml)
				addClass(_ml, 'opened');
		}
	}
	document.querySelector('#game-ui').appendChild(_div.firstChild); 
	document.addEventListener("click", outsideClick, true);
}

function createMenu() {
	if (document.querySelector('.lobby-navbar'))
        return;
	if(_presentationMode === 1) {
		__account.name = getLangData('Guest') + getRandomValue2(1000, 9999);
		_presentationMode = 2;
		__fragments.forEach(x =>
		updateFragment(x.key, 1500));
		updateGem('fire', 1, 5);
		updateGem('ice', 1, 5);
		updateGem('shadow', 1, 5);
		updateGem('lightning', 1, 5);
		updateGem('toxic', 1, 5);
		updateMisc({ type:'ticket-gem-selection', count: 1 });
		const _actIds = __stories.filter(x => x.listed !== false && !x.mission).map(x => x.id);
		__account.storyResults = [];
		_actIds.forEach(x => __account.storyResults.push({id:x, stars: [1,2,4], perfect:true}));
		__account.gold = 0;
		updateGold(1000000);
		connectSocket();
	}
	const _upperDiv = document.createElement('div');
	_upperDiv.className = 'flex flex-jc-end show-ui lobby-navbar fade-in';
	const _div = document.createElement('div');
	_upperDiv.innerHTML = `
		<div class="lobby-navbar-left flex flex-jc-start" onexactclick="openSideMenu()">
			<div id="side-hamburger-menu" class="flex menu-icon-wrapper">
				<div class="menu-icon flex">
					<img src="./images/ui/game/menu.png" />
				</div>
			</div>
			<div onexactclick="event.stopPropagation();askAvatar()" class="top-bar-avatar-wrapper">
				<img class="top-bar-avatar" src="./images/ui/game/avatars/avatar${__account.avatarOrder ?? 21}.png" />
			</div>
			<div class="top-bar-character-info">
				<div class="top-bar-character-info-name flex flex-jc-start">
					${__account.name}
				</div>
				<div class="top-bar-character-info-progress flex flex-jc-start">
					<div class="top-bar-character-info-level-frame flex">
						<div class="top-bar-character-info-level-value">
							${getLangData('Lv')}.&nbsp;${mainCharacter.level}
						</div>
					</div>
					<div class="top-bar-experience-frame flex flex-jc-start">
						<div style="width:${100 * (mainCharacter.experience / mainCharacter.maxExperience)}% !important" class="top-bar-experience-progress">

						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex lobby-navbar-center">
			<div class="flex w-100 flex-jc-end">
				<div class="top-bar-resource-frame flex">
					<img src="./images/ui/game/platina.png" class="top-bar-resource-icon" />
					<div class="flex top-bar-resource-value">
						${(__account.platina ?? 0).formatWithDots()}
					</div>
				</div>
				<div class="top-bar-resource-frame flex">
					<img src="./images/ui/game/gold-coin.png" class="top-bar-resource-icon" />
					<div class="flex top-bar-resource-value">
						${__account.gold.formatWithDots()}
					</div>
				</div>
				<div class="top-bar-plus-icon flex" onexactclick="howToGainGold()">
					<img src="./images/ui/game/plus.png" />
				</div>
			</div>
		</div>
		<div class="lobby-navbar-right flex flex-jc-end">
			<div class="top-bar-quick-menu flex w-100">
				<div class="flex top-bar-quick-menu-icon-wrapper" onexactclick="openSectionFromMenu(4,2,0,1)">
					<img src="./images/ui/game/notification.png" class="top-bar-quick-menu-icon" />
				</div>
				<div class="flex top-bar-quick-menu-icon-wrapper" onexactclick="openSectionFromMenu(9,1,0,1)">
					<img src="./images/ui/game/settings.png" class="top-bar-quick-menu-icon" />
				</div>
				<div class="flex top-bar-quick-menu-icon-wrapper" onexactclick="askExitApp()">
					<img src="./images/ui/game/menu-close.png" class="top-bar-quick-menu-icon" />
				</div>
			</div>
		</div>
		</div>
	`;
	_div.className = 'flex show-ui stories-screen fade-in';
	_div.innerHTML = getStoryTemplates();
	_gameUI.appendChild(_upperDiv);
}
function openSectionFromMenu(_order, _subOrder, _tabOrder, _force) {
	const _ml = document.querySelector('.menu-left-opener');
	if(!_force && (!_ml || !hasClass(_ml, 'opened') || hasClass(_ml, 'closing')))
		return;
	playClick();
	if(_force && !_ml)
		switchBookPage(_order, _subOrder, _tabOrder);
	else
		hideSideMenu(function() {
			switchBookPage(_order, _subOrder, _tabOrder);
		});
}
function getStoryTemplates() {
	let _html = '<div class="stories-wrapper">';
	for(let _s of __stories)
		_html += `<div id="story-${_s.id}" onexactclick="openStoryDetail(${_s.id})" class="story-card flex animate-me">
			<div class="story-avatar animate-me flex">
				<img src="./images/main/${_s.boss}/concept.png" />
			</div>
			<div class="story-info flex">
				<div class="story-title flex flex-jc-start">${_s.title[getLang()]}</div>
				<div class="story-consume flex flex-jc-start">${_s.ticket} x Ticket</div>
				<div class="story-level flex flex-jc-start">Level ${_s.minLevel} required</div>
				<div class="story-stars flex flex-jc-end">
					<img src="./images/icons/star.png"${(_s.locked || _s.resultStars?.[0]?.failed) ? ' class="gray"' : ''}  />
					<img src="./images/icons/star.png"${(_s.locked || _s.resultStars?.[1]?.failed) ? ' class="gray"' : ''}  />
					<img src="./images/icons/star.png"${(_s.locked || _s.resultStars?.[2]?.failed) ? ' class="gray"' : ''} />
				</div>
			</div>
		</div>`;
	return _html + '</div>';
}

function openStoryDetail(_id) {
    playClick();
	const _s = __stories.find(x => x.id === _id);
	if(_s?.locked) {
		warn('<span>' + getLangData('Story is locked for now') + '</span>', 'warn');
		return;
	}
	const _cards = document.querySelectorAll('.story-card');
	for(let _card of _cards)
		removeClass(_card, 'selected');
	addClass(document.getElementById('story-' + _id), 'selected');
	const _div = document.createElement('div');
	_div.className = 'flex show-ui story-detail fade-in';
	let _html = '';
	for(const _r of _s.rewards)
		_html += `<div class="flex story-reward"><div class="flex"><img src="./images/icons/${_r.key}.png" />${_r.count.formatWithDots()}</div></div>`;
	_div.innerHTML = `<div class="flex flex-jc-end story-detail-close"><div>${_s.title[getLang()]}</div><img class="animate-me" onexactclick="closeStoryModal()" src="./images/icons/close.png" /></div>
		<div class="story-detail-wrapper"><div class="story-description">${_s.description[getLang()]}</div><div class="flex flex-jc-start story-detail-heading">${getLangData('Rewards')}</div>
		<div class="story-rewards w-100 flex">`
		+ _html +
		`</div>
		</div>
		<div class="flex story-detail-button"><div class="flex game-btn2 animate-me">START</div></div>`;
	_gameUI.appendChild(_div);
}

function closeStoryModal() {
    playClick();
	const _cards = document.querySelectorAll('.story-card');
	for(let _card of _cards)
		removeClass(_card, 'selected');
	document.querySelector('.story-detail').remove();
}

function openInventoryScreen() {
	showMyModalPopUp('game-menu');
	switchBookPage(1,1);
}