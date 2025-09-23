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
	const _m = document.querySelector('.menu-left-opener.opened');
	if(!_m)
		return;
	if (_m.contains(e.target))
		return;
	closeSideMenu();
}
function closeSideMenu() {
	PlaySound({key:'click'});
	hideSideMenu();
}
function openSideMenu() {
   	PlaySound({ key: 'click' });
	const _ml = document.querySelector('.menu-left-opener');
	if(_ml)
		return;
	let _html = '<div class="menu-left-opener show-ui flex flex-ai-start">';
	for(let _m of __holoMenuItems)
		_html += `<div id="lobby-${_m.icon}" class="flex menu-left-opener-item animate-me" onexactclick="openSectionFromMenu(${_m.order},${_m.subOrder},${_m.tabOrder ?? 0})">
			<div class="w-100 flex">
				<div class="w-100 flex"><img src="./images/ui/menu-icons/${_m.icon}.png" /></div>
				<div class="w-100 flex">${_m.titles[getLang()]}</div>
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
	const _upperDiv = document.createElement('div');
	_upperDiv.className = 'flex flex-jc-end show-ui lobby-navbar fade-in';
	const _div = document.createElement('div');
	_upperDiv.innerHTML = `
		<div class="lobby-navbar-left flex flex-jc-start" onexactclick="openSideMenu()">
			<div id="side-hamburger-menu" class="flex menu-icon-wrapper">
				<div class="menu-icon flex">
					<img src="./images/icons/menu.png" />
				</div>
			</div>
		</div>
		<div class="flex lobby-navbar-center"><div class="flex"></div></div>
		<div class="lobby-navbar-right flex flex-jc-end">
			#${__account.name}
		</div>
		</div>
	`;
	_div.className = 'flex show-ui stories-screen fade-in';
	_div.innerHTML = getStoryTemplates();
	_gameUI.appendChild(_upperDiv);
}
function openSectionFromMenu(_order, _subOrder, _tabOrder) {
	const _ml = document.querySelector('.menu-left-opener');
	if(!_ml || !hasClass(_ml, 'opened') || hasClass(_ml, 'closing'))
		return;
	PlaySound({key:'click'});
	hideSideMenu(function() {
		switchBookPage(_order, _subOrder, _tabOrder);
	})
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
    episode.playSound({ key: 'click' });
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
    episode.playSound({ key: 'click' });
	const _cards = document.querySelectorAll('.story-card');
	for(let _card of _cards)
		removeClass(_card, 'selected');
	document.querySelector('.story-detail').remove();
}

function openInventoryScreen() {
	showMyModalPopUp('game-menu');
	switchBookPage(1,1);
}