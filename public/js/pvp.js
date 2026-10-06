'use strict';
function pvp() {
	this.matchedUnit;
	this.timeLeft = 0;
	this.unlockLevel = 10;
	this.updateTimer;
	this.match = function(_key) {
		const _opponent = this.opponents.find(x => x.key === _key);
		if(_opponent) {
			closeInventoryQuestionModal();
			if(__account.pvp.duelCount > 0)
			{
				__account.pvp.duelCount--;
				//if(!__account.pvp.lastDuelTime)
					__account.pvp.lastDuelTime = msNow;
				this.timeLeft = '';
				_client.saveState();
				this.getPlayStatus();
				createArena(_opponent);
				const _noSelect = tryShowMenuTutorial('duel');
				if(_noSelect) {
					__account.menuTutorials.push('duel');
					_client.saveState(1);
				}
			}
			else {
				warn('<span>' + getLangData('Duel limit reached') + '</span>', 'warn');
				return;
			}
		}
	}
	this.selectOpponent = function(_elem, _key) {
		const _opponents = document.querySelectorAll('.pvp-opponent-item');
		for(let _o of _opponents)
			if(_o === _elem)
				addClass(_o, 'selected');
			else
				removeClass(_o, 'selected');
		askSomething('Start duel battle', "__pvp.match('" + _key + "')", 'modal_2x1');
	}
	this.findOpponents = function () {
		const _container = document.querySelector('.pvp-content-left-content');
		if(mainCharacter.level < this.unlockLevel) {
			_container.innerHTML = `<div class="skills-content-left menu-modal-left-container full"><div style="overflow-y:auto" class="full">` +
				renderLockedContent(getLangData('Lvl') + ' ' + this.unlockLevel + ' ' + getLangData('required')) + `</div></div>`;
			return;
		}
		this.opponents = [];
		for(var i = 1; i < 11; i++) {
			if((__account.pvp.order - i) <= 0)
				break;
			const _e = setCharacterFunctions(_allEnemies['enemy0' + getRandomValue2(1, 3)](), 1);
			let _itemGrade = 1;
			if(__account.pvp.order < 5000)
				_itemGrade = 3;
			else if(__account.pvp.order < 10000)
				_itemGrade = 2;
			_e.level = MathRound(getRandomValue2((mainCharacter.level - (this.unlockLevel / 2)) < this.unlockLevel ? this.unlockLevel : mainCharacter.level - (this.unlockLevel / 2), mainCharacter.level + (this.unlockLevel / 2)));
			_e.inventory = getRandomItems(_itemGrade, _e.class);
			_e.inventory.forEach(x => x.weared = _e.class);
			_e.totalPower = getTotalPower(_e).total;
			_e.pvpOrder = __account.pvp.order - i;
			this.opponents.push(_e);
		}
		let _html = '<div class="skills-content-left menu-modal-left-container full"><div style="overflow-y:auto" class="full">';
		for(let _opponent of this.opponents)
			_html += `<div onexactclick="__pvp.selectOpponent(this,'${_opponent.key}')" class="skill-card animate-me flex">
						<div class="skill-icon-wrapper flex" style="padding-right:.5vh">
							<img src="./images/main/avatars/${_opponent.class}.png" />
						</div>
						<div style="flex:1;height:100%" class="flex flex-jc-start">
							<div class="flex flex-jc-start skill-card-title w-100" style="height:50%">${getLangData('Lvl')}&nbsp;${_opponent.level}&nbsp;${getLangData(_opponent.class)}</div>
							<div class="flex skill-card-title w-100" style="height:50%">
								<div class="flex flex-jc-start w-50 pvp-opponent-power" style="height:100%">
									<span style="opacity:.7">${getLangData('Power')}:</span>&nbsp;${_opponent.totalPower.formatWithDots()}
								</div>
								<div class="flex flex-jc-end w-50 pvp-opponent-order" style="height:100%">
									${_opponent.pvpOrder.formatWithDots()}
								</div>
							</div>
						</div>
					</div>`;
		_container.innerHTML = _html + '</div></div>';
	}
	this.render = function() {
		let _tutorial = {
			tr: {
				title: 'PVP Duello',
				desc: 'Seviye 10 ve sonrasında kullanabileceğiniz bu içerikte düşmanları yapay zeka yönlendirir. Belli bir sıralamanın olduğu bu serüvene başlarken alt ligde ve sıralarda başlarsınız ve kazandıkça galip geldiğiniz rakibiniz ile sıralamanız değiştirilir. Bulunduğunuz sıraya göre lig değişir. Lig kalitesi arttıkça o ligde karşılaşacağınız rakiplerin de gücü artar. Her galibiyet başına onur puanı kazanırsınız.'
			},
			en: {
				title: 'PVP Duel',
				desc: 'Available at level 10 and above, this content features AI-guided enemies. You\'ll begin this quest with a specific ranking, starting in a lower league and ranked position. As you win, your ranking is adjusted based on your victories. The league changes based on your current rank. As the league\'s quality increases, so too do the opponents you face within it. You earn honor points for each victory.'
			}
		};
		if(!tryShowMenuTutorial('duel'))
			_tutorial = undefined;
		let _content = showMenuTutorial(_tutorial, 'duel');
 		updateMenuBottom(4);
		let _league = 'Bronze';
		if(__account.pvp.order === undefined)
			__account.pvp.order= 0;
		if (__account.pvp.order < 1001) _league = 'Platinum';
		else if (__account.pvp.order < 5001) _league = 'Gold';
		else if (__account.pvp.order < 10001) _league = 'Silver';
    	const _container = selectMenuContainer();
		_container.innerHTML =
    	`<div class="pvp-content-left menu-ui-left fade-me"><div class="pvp-content-left-content menu-modal-left menu-modal-left-content"></div></div>
			<div class="pvp-content-right menu-ui-right fade-me"><div class="pvp-content-right-content menu-modal-right menu-modal-right-content"><div class="skills-content-right">
			<div class="honor-content-detail-wrapper menu-modal-right-container">`
			+ (_content !== '' ? _content :
			`<div style="justify-content:center" class="me-container flex">
				<div class="me-frame artifact-detail-header-icon">
					<div class="me-concept flex full">
						<img loading="lazy" src="./images/main/${mainCharacter.class}/finish-concept-s.png" />
					</div>
				</div>
			</div>
			<div class="w-100 flex pvp-top-splitter"><img src="./images/ui/game/item-detail-top-splitter.png" /></div>
			<div class="flex me-info">
				<div class="flex pvp-info-0 w-100">
				<div class="flex flex-jc-start w-50 page-detail-item-label">${getLangData('League')}</div>
				<div class="flex flex-jc-end w-50 page-detail-item-value">${getLangData(_league)}</div>
			</div>
			<div class="flex pvp-info-1 w-100">
				<div class="flex flex-jc-start w-50 page-detail-item-label">${getLangData('PVP Order')}</div>
				<div class="flex flex-jc-end w-50 page-detail-item-value">${mainCharacter.level < this.unlockLevel ? '-' : __account.pvp.order.formatWithDots()}</div>
			</div>
			<div class="flex w-100 pvp-info-2"></div>
			<div class="flex pvp-info-3 w-100">
				<div class="w-50 flex flex-jc-start page-detail-item-label">${getLangData('Total Power')}</div>
				<div class="flex w-50 flex-jc-end page-detail-item-value">${getTotalPower()?.total?.formatWithDots()}</div>
			</div>
			<div class="flex pvp-info-4 w-100"></div>`)
			+
			`</div>
			</div>
		</div></div></div>`;

		this.updateTimer = 1;
		this.lastDuelTimeCheck = 0;
		this.findOpponents();
		this.getPlayStatus();
	}
	this.getPlayStatus = function() {
		const _container = document.querySelector('.pvp-info-2');
		const _container4 = document.querySelector('.pvp-info-4');
		if(!_container4)
			return;
		if(mainCharacter.level < this.unlockLevel) {
			_container.innerHTML = '<div class="w-50 flex flex-jc-start">' + getLangData('Active Duel') + '</div><div class="flex flex-jc-end w-50">-</div>';
			return;
		}
		if(__account.pvp.duelCount < 10) {
			const _hak = MathFloor((msNow - __account.pvp.lastDuelTime) / 600000);
			if(_hak > 0) {
				__account.pvp.duelCount += _hak;
				if(__account.pvp.duelCount > 10)
					__account.pvp.duelCount = 10;
				if(__account.pvp.duelCount === 10)
					__account.pvp.lastDuelTime = 0;
				else
					__account.pvp.lastDuelTime += (_hak * 600000);
				_client.saveState();
			}
		}
		_container4.innerHTML = `<div class="flex w-50 flex-jc-start page-detail-item-label">${getLangData('Win Streak')}</div><div class="flex w-50 flex-jc-end page-detail-item-value">${__account.pvp.maxWinCount.formatWithDots()}</div>`;
		_container.innerHTML = '<div class="flex w-50 flex-jc-start page-detail-item-label">' + getLangData('Active Duel') + '</div><div class="flex w-50 flex-jc-end page-detail-item-value"><span id="pvp-play-time-left"></span>' + (__account.pvp.duelCount < 1 ? '0' : __account.pvp.duelCount.toString()) + ' / 10</div>';
		this.updatePlayStatus();
	}
	this.updatePlayStatus = function() {
		if(!this.updateTimer)
			return;
		if(!((_gameTick - this.lastDuelTimeCheck) > 999))
			return;
		if(__account.pvp.duelCount < 10) {
			const _between = 600000 - (msNow - __account.pvp.lastDuelTime);
			const _minute = MathFloor(_between / 60000);
			const _second = MathFloor((_between % 60000) / 1000);
			const _result = (((_minute > 9 ? _minute : '0' + _minute) + getLangData('m')) + ' ' +
			((_second > 9 ? _second : '0' + _second) + getLangData('s'))).trim();
			if(this.timeLeft !== _result) {
				this.timeLeft = _result;
				if(_minute <= 0 && _second <= 0)
				{
					__account.pvp.duelCount++;
					this.timeLeft = 0;
					_client.saveState();
					this.getPlayStatus();
				}
				this.updatePlayStatus();
			}
			const _container = document.getElementById('pvp-play-time-left');
			if(_container) {
				const _txt = this.timeLeft === 0 ? '' : '&nbsp;<span class="red">(' + this.timeLeft + ')</span>';
				if(_txt !== _container.innerHTML)
					_container.innerHTML = _txt;
			}
			else
				this.updateTimer = false;
			this.lastDuelTimeCheck = _gameTick;
		}
	}
}
var __pvp = new pvp();
