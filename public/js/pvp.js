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
		askSomething('Start duel battle', "__pvp.match('" + _key + "')");
	}
	this.findOpponents = function () {
		const _container = document.querySelector('.pvp-content-left-content');
		if(mainCharacter.level < this.unlockLevel) {
			_container.innerHTML = `<div class="skills-content-left menu-modal-left-container full"><div style="padding:1% 5%;overflow-y:auto" class="full">` +
				renderLockedContent('Level ' + this.unlockLevel + ' required') + `</div></div>`;
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
		let _html = '<div class="skills-content-left menu-modal-left-container full"><div style="padding:1% 5%;overflow-y:auto" class="full">';
		for(let _opponent of this.opponents)
			_html += `<div onexactclick="__pvp.selectOpponent(this,'${_opponent.key}')" class="skill-card animate-me flex">
						<div class="skill-icon-wrapper flex">
							<img src="./images/icons/${_opponent.class}.png" />
						</div>
						<div style="flex:1;height:100%" class="flex flex-jc-start">
							<div class="flex flex-jc-start skill-card-title w-100" style="height:50%">${getLangData('Lvl')}&nbsp;${_opponent.level}&nbsp;${getLangData(_opponent.class)}</div>
							<div class="flex skill-card-title w-100" style="height:50%">
								<div class="flex flex-jc-start w-50 pvp-opponent-power" style="height:100%">
									${getLangData('Power')}:&nbsp;${_opponent.totalPower.formatWithDots()}
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
			<div class="honor-content-detail-wrapper menu-modal-right-container"><div style="justify-content:center" class="me-container flex">
				<div style="height:100%;aspect-ratio:110/365;position:relative;z-index:10">
					<img loading="lazy" src="./images/ui/border-left.png" style="max-width:120%;max-height:120%;position:relative;right:-20%;top:-10%;z-index:10" />
				</div>
				<div class="me-frame">
					<div class="me-concept flex full">
						<img loading="lazy" src="./images/main/${mainCharacter.class}/finish-concept-s.png" />
					</div>
				</div>
				<div style="height:100%;aspect-ratio:110/365">
					<img style="max-width:120%;max-height:120%;position:relative;left:-40%;top:-10%" loading="lazy" src="./images/ui/border-right.png" />
				</div>
			</div>
			<div class="flex me-info">
				<div class="flex pvp-info-0 w-100">
				<div class="flex flex-jc-start w-50">${getLangData('League')}</div>
				<div class="flex flex-jc-end w-50">${getLangData(_league)}</div>
			</div>
			<div class="flex pvp-info-1 w-100">
				<div class="flex flex-jc-start w-50">${getLangData('PVP Order')}</div>
				<div class="flex flex-jc-end w-50">${mainCharacter.level < this.unlockLevel ? '-' : __account.pvp.order.formatWithDots()}</div>
			</div>
			<div class="flex w-100 pvp-info-2"></div>
			<div class="flex pvp-info-3 w-100">
				<div class="w-50 flex flex-jc-start">${getLangData('Total Power')}</div>
				<div class="flex w-50 flex-jc-end">${getTotalPower()?.total?.formatWithDots()}</div>
			</div>
			<div class="flex pvp-info-4 w-100"></div>
			</div>
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
		_container4.innerHTML = `<div class="flex w-50 flex-jc-start">${getLangData('Win Streak')}</div><div class="flex w-50 flex-jc-end">${__account.pvp.maxWinCount.formatWithDots()}</div>`;
		_container.innerHTML = '<div class="flex w-50 flex-jc-start">' + getLangData('Active Duel') + '</div><div class="flex w-50 flex-jc-end">' + (__account.pvp.duelCount < 1 ? '0' : __account.pvp.duelCount.toString()) + ' / 10<span id="pvp-play-time-left"></span></div>';
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
			const _result = ((_minute > 0 ? (_minute + getLangData('m')) : '') + ' ' +
			(_second > 0 ? (_second + getLangData('s')) : '')).trim();
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
