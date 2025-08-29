'use strict';
function pvp() {
	this.matchedUnit;
	this.meContext;
	this.rendered;
	this.meFrame = 0;
	this.meStart = 0;
	this.timeLeft = 0;
	this.unlockLevel = 10;
	this.match = function(_key) {
		const _opponent = this.opponents.find(x => x.key === _key);
		if(_opponent) {
			closeInventoryQuestionModal();
			if(__account.pvp.duelCount > 0)
			{
				__account.pvp.duelCount--;
				if(!__account.pvp.lastDuelTime)
					__account.pvp.lastDuelTime = _gameTick;
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
	this.findOpponents = function() {
		const _container = document.querySelector('.pvp-content-left-content');
		this.opponents = [];
		for(var i = 1; i < 21; i++) {
			const _e = setCharacterFunctions(_allEnemies['enemy0' + getRandomValue2(1, 3)]());
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
			_html += `<div onclick="__pvp.selectOpponent(this,'${_opponent.key}')" class="skill-card animate-me flex">
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
		const _container = selectMenuContainer();
		const _left = document.createElement('div');
		_left.className = 'pvp-content-left menu-ui-left fade-me';
		const _right = document.createElement('div');
		_right.className = 'pvp-content-right menu-ui-right fade-me';
		_container.innerHTML = '';
		_container.appendChild(_left);
		_container.appendChild(_right);
		const _leftContent = document.createElement('div');
		_leftContent.className = 'pvp-content-left-content menu-modal-left';
		_left.appendChild(_leftContent);
		const _rightContent2 = document.createElement('div');
		_rightContent2.className = 'pvp-content-right-content menu-modal-right';
		_right.appendChild(_rightContent2);

		
		const _rightContent1 = document.createElement('div');
		_rightContent1.className = 'skills-content-right';
		_rightContent2.appendChild(_rightContent1);

		
		const _rightContent = document.createElement('div');
		_rightContent.className = 'honor-content-detail-wrapper menu-modal-right-container';
		_rightContent1.appendChild(_rightContent);

		const _meContainer = document.createElement('div');
		_meContainer.className = 'me-container flex';
		const _meFrame = document.createElement('div');
		_meFrame.className = 'me-frame';
		const _meCanvas = document.createElement('canvas');
		_meCanvas.width = MathRound(_canvas.height * .45);
		_meCanvas.height = _meCanvas.width;
		const _meBanner = document.createElement('div');
		_meBanner.className = 'pvp-banner flex';
		let _league = 'Bronze';
		if(__account.pvp.order < 1001)
			_league = 'Platinum';
		else if(__account.pvp.order < 5001)
			_league = 'Gold';
		else if(__account.pvp.order < 10001)
			_league = 'Silver';
		//_meBanner.innerText = getLangData(_league) + ' ' + getLangData('League');
		//_meContainer.appendChild(_meBanner);
		this.meContext = _meCanvas.getContext('2d');
		_meCanvas.className = 'full';
		_meFrame.appendChild(_meCanvas);
		const _meFrameTop = document.createElement('img');
		_meFrameTop.className = 'me-frame-top';
		_meFrameTop.src= './images/ui/wolf-head.png';
		_meFrame.appendChild(_meFrameTop);

		const _bl = document.createElement('div');
		_bl.innerHTML = `<div style="height:100%;aspect-ratio:110 / 365;position:relative;z-index:10"><img src="./images/ui/border-left.png" style="max-width:120%;max-height:120%;position:relative;right:-15%;top:-10%;z-index:10"></div>`;
		_meContainer.appendChild(_bl.firstChild);
		_meContainer.appendChild(_meFrame);
		const _br = document.createElement('div');
		_br.innerHTML = `<div style="height:100%;aspect-ratio:110 / 365"><img src="./images/ui/border-right.png" style="max-width: 120%;max-height: 120%;position: relative;left:-40%;top:-10%"></div>`;
		_meContainer.appendChild(_br.firstChild);
		_rightContent.appendChild(_meContainer);
		_meContainer.style = 'justify-content:center';
		const _meInfo = document.createElement('div');
		_meInfo.className = 'flex me-info';
		_rightContent.appendChild(_meInfo);
		_meInfo.innerHTML = `<div class="flex pvp-info-0 w-100">
		<div class="flex flex-jc-start w-50">
			${getLangData('League')}</div>
		<div class="flex flex-jc-end w-50">
			${getLangData(_league)}
		</div></div>
		<div class="flex pvp-info-1 w-100">
		<div class="flex flex-jc-start w-50">
			${getLangData('PVP Order')}</div>
		<div class="flex flex-jc-end w-50">
			${mainCharacter.level < this.unlockLevel ? '-' : __account.pvp.order.formatWithDots()}
		</div></div>
		<div class="flex w-100 pvp-info-2"></div>
		<div class="flex pvp-info-3 w-100"><div class="w-50 flex flex-jc-start">
			${getLangData('Total Power')}
		</div>
		<div class="flex w-50 flex-jc-end">
			${getTotalPower()?.total?.formatWithDots()}
		</div></div>
		<div class="flex pvp-info-4 w-100"></div>`;
		this.rendered = 1;
		this.meFrame = this.meStart = 0;
		this.width = _meCanvas.width;
		this.height = _meCanvas.height;
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
			const _hak = MathFloor((_gameTick - __account.pvp.lastDuelTime) / 600000);
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
	}
	this.updatePlayStatus = function() {
		const _container = document.getElementById('pvp-play-time-left');
		_container.innerHTML = this.timeLeft === 0 ? '' : ' (' + this.timeLeft + ')';
	}
	this.getSize = function(_frame) {
		const _maxWidth = MathRound(this.width * .75);
		const _maxHeight = MathRound(this.height * .75);
		const _widthRate = _maxWidth / _frame.spriteWidth;
		const _heightRate = _maxHeight / _frame.spriteHeight;
		const _rate = _widthRate < _heightRate ? _widthRate : _heightRate;
		const _w = MathRound(_frame.spriteWidth * _rate);
		const _h = MathRound(_frame.spriteHeight * _rate);
		const _t = MathRound((this.height - _h) / 2);
		const _l = MathRound((this.width - _w) / 2);
		return {
			w: _w,
			t: _t,
			h: _h,
			l: _l
		};
	}
	this.draw = function() {
		this.meStart++;
		if(this.animation.frames[this.meFrame].speed < this.meStart) {
			this.meStart = 0;
			this.meFrame++;
			this.meContext.clearRect(0,0,this.width, this.height);
			if(this.animation.frames.length <= this.meFrame)
				this.meFrame = 0;
			let _frame = this.animation.frames[this.meFrame];
			const _size = this.getSize(_frame);
			this.meContext.drawImage(mainCharacter.sprite, _frame.spriteLeft, 
				_frame.spriteTop, _frame.spriteWidth, _frame.spriteHeight,
				_size.l, _size.t, _size.w, _size.h
			);
		}
		if(__account.pvp.duelCount < 10) {
			const _between = 600000 - (_gameTick - __account.pvp.lastDuelTime);
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
		}
	}
	this.checkInPvpContent = function() {
		if(!this.rendered)
			return;
		if(this.animation) {
			this.draw();
			return;
		}
		this.animation = mainCharacter.animations.idle;
		this.draw();
	}
	this.dispose = function() {
		this.me = this.animation = this.rendered = this.meFrame = this.meStart = 
		this.width = this.height = this.timeLeft = this.meContext = undefined;
	}
}
var __pvp = new pvp();

function getArenaUI() {
	
}