'use strict';
const __holoMenuItems = [
	{ icon: 'inventory', order:1, subOrder:1, titles: {
		en: 'Inventory',
		tr: 'Envanter'
	}},
	{ icon: 'skill', order:2, subOrder:1, titles: {
		en: 'Skill',
		tr: 'Yetenek'
	}},
	{ icon: 'quest', order:3, subOrder:1, titles: {
		en: 'Story',
		tr: 'Hikaye'
	}},
	{ icon: 'fragment', order:7, subOrder:1, titles: {
		en: 'Fragment',
		tr: 'Parçacık'
	}},
	{ icon: 'artifact', order:1, subOrder:2, titles: {
		en: 'Artifact',
		tr: 'Eser'
	}},
	{ icon: 'talent', order:2, subOrder:2, titles: {
		en: 'Talent',
		tr: 'Yetenek'
	}},
	{ icon: 'achievement',  order:3, subOrder:2, titles: {
		en: 'Event',
		tr: 'Etkinlik'
	}},
	{ icon: 'gem', order:1, subOrder:1, tabOrder:2, titles: {
		en: 'Gem',
		tr: 'Taş'
	}},
	{ icon: 'pvp', order:5, subOrder:1, titles: {
		en: 'PvP',
		tr: 'PvP'
	}},
	{ icon: 'dungeon', order:6, subOrder:1, titles: {
		en: 'Dungeon',
		tr: 'Zindan'
	}},
	{ icon: 'shop', order:8, subOrder:1, titles: {
		en: 'Shop',
		tr: 'Market'
	}},
	{ icon: 'mailbox', order:4, subOrder:2, titles: {
		en: 'Mailbox',
		tr: 'Posta'
	}},
	{ icon: 'forge', order:5, subOrder:2, titles: {
		en: 'Forge',
		tr: 'Demirci'
	}},
	{ icon: 'lottery', order:8, subOrder:2, titles: {
		en: 'Lottery',
		tr: 'Piyango'
	}},
	{ icon: 'war', order:5, subOrder:3, titles: {
		en: 'War',
		tr: 'Savaş'
	}},
	{ icon: 'calendar', order:8, subOrder:3, titles: {
		en: 'Calendar',
		tr: 'Takvim'
	}},
	{ icon: 'chat', order:4, subOrder:1, titles: {
		en: 'Chat',
		tr: 'Sohbet'
	}},
	{ icon: 'world', order:3, subOrder:3, titles: {
		en: 'Map',
		tr: 'Harita'
	}},
	{ icon: 'settings', order:9, subOrder:1, titles: {
		en: 'Settings',
		tr: 'Ayarlar'
	}},
	{ icon: 'tip', order:9, subOrder:2, titles: {
		en: 'About Us',
		tr: 'Hakkımızda'
	}}
];
function hideSideMenu(_func) {
	const _ml = document.querySelector('.menu-left-opener');
	if(_ml) {
		addClass(_ml, 'slide-to-left');
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
function openSideMenu() {
   	episode.playSound({ key: 'click' });
	const _ml = document.querySelector('.menu-left-opener');
	if(_ml){
		hideSideMenu();
		return;
	}
	let _html = '<div class="menu-left-opener show-ui flex flex-ai-start">';
	for(let _m of __holoMenuItems)
		_html += `<div id="lobby-${_m.icon}" class="flex menu-left-opener-item animate-me "onexactclick="hideSideMenu(function() {
				switchBookPage(${_m.order},${_m.subOrder},${_m.tabOrder ?? 0});
			})">
			<div class="w-100 flex">
				<div class="w-100 flex"><img src="./images/ui/menu-icons/${_m.icon}.png" /></div>
				<div class="w-100 flex">${_m.titles[getLang()]}</div>
			</div>
		</div>`;
	'</div>';
	const _div = document.createElement('div');
	_div.innerHTML = _html;
	document.querySelector('#game-ui').appendChild(_div.firstChild); 
}
function createMenu() {
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
	const icons = __holoMenuItems.map(m => `./images/ui/menu-icons/${m.icon}.png`);
	icons.forEach(src => {
		const img = new Image();
		img.src = src;
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