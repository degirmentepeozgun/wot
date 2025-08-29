'use strict';
function pvp() {
	this.matchedUnit;
	this.meContext;
	this.rendered;
	this.container;
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
	this.findOpponents = function() {
		const _container = document.querySelector('.pvp-content-right-content');
		if(mainCharacter.level < this.unlockLevel) {
			_container.innerHTML = `<div class="full flex" style="color:#ff6c00 !important;font-size:3vh !important">${getLangData('Min Level Requirement')}: ${this.unlockLevel}</div>`;
			return;
		}
		this.opponents = [];
		for(var i = 1; i < 21; i++) {
			const _e = setCharacterFunctions(_allEnemies['enemy0' + getRandomValue(1, 3)]());
			let _itemGrade = 1;
			if(__account.pvp.order < 5000)
				_itemGrade = 3;
			else if(__account.pvp.order < 10000)
				_itemGrade = 2;
			_e.level = MathRound(getRandomValue((mainCharacter.level - (this.unlockLevel / 2)) < this.unlockLevel ? this.unlockLevel : mainCharacter.level - (this.unlockLevel / 2), mainCharacter.level + (this.unlockLevel / 2)));
			_e.inventory = getRandomItems(_itemGrade, _e.class);
			_e.inventory.forEach(x => x.weared = _e.class);
			_e.totalPower = getTotalPower(_e).total;
			_e.pvpOrder = __account.pvp.order - i;
			this.opponents.push(_e);
		}
		let _html = '';
		for(let _opponent of this.opponents)
			_html += `<div onclick="__pvp.selectOpponent(this,'${_opponent.key}')" class="pvp-opponent-item flex opponent-${_opponent.class}">
				<div class="opponent-item-left flex">
					${_opponent.pvpOrder.formatWithDots()}
				</div>
				<div class="opponent-item-center flex">
					<img src="./images/icons/${_opponent.class}.png" />${getLangData('Lvl')}&nbsp;${_opponent.level}
				</div>
				<div class="opponent-item-right flex">
					${_opponent.totalPower.formatWithDots()}
				</div>
			</div>`;
		_container.innerHTML = _html;
	}
	this.render = function() {
		this.container = document.querySelector('#book-content-10 .book-page-wrapper');
		const _left = document.createElement('div');
		_left.className = 'pvp-content-left';
		const _right = document.createElement('div');
		_right.className = 'pvp-content-right';
		this.container.appendChild(_left);
		this.container.appendChild(_right);
		const _leftContent = document.createElement('div');
		_leftContent.className = 'full flex pvp-content-left-content';
		_left.appendChild(_leftContent);
		const _rightContent = document.createElement('div');
		_rightContent.className = 'full pvp-content-right-content';
		_right.appendChild(_rightContent);
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
		_meBanner.innerText = getLangData(_league) + ' ' + getLangData('League');
		_meContainer.appendChild(_meBanner);
		this.meContext = _meCanvas.getContext('2d');
		_meCanvas.className = 'full';
		_meFrame.appendChild(_meCanvas);
		_meContainer.appendChild(_meFrame);
		_leftContent.appendChild(_meContainer);
		const _meInfo = document.createElement('div');
		_meInfo.className = 'flex me-info';
		_leftContent.appendChild(_meInfo);
		_meInfo.innerHTML = `<div class="flex pvp-info-1">${getLangData('PVP Order')}: ${mainCharacter.level < this.unlockLevel ? '-' : __account.pvp.order.formatWithDots()}</div>
		<div class="flex pvp-info-2"></div>
		<div class="flex pvp-info-3">${getLangData('Total Power')}: ${getTotalPower()?.total?.formatWithDots()}</span></div>
		<div class="flex pvp-info-4"></div>`;
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
			_container.innerHTML = '<span>' + getLangData('Active Duel') + ': -</span>';
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
		_container4.innerHTML = `<span class="flex">${getLangData('Honor Point')}:<img src="./images/icons/honor.png" /><span style="color:#f7f7f7cc!important">${__account.pvp.honor.formatWithDots()}</span></span>`;
		_container.innerHTML = '<span>' + getLangData('Active Duel') + ': ' + (__account.pvp.duelCount < 1 ? '<span style="color:#ff6c00 !important">0</span>' : __account.pvp.duelCount) + ' / 10<span id="pvp-play-time-left"></span></span>';
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
		if(this.container)
			this.container.innerHTML = '';
		this.me = this.animation = this.rendered = this.meFrame = this.meStart = 
		this.width = this.height = this.timeLeft = this.container = this.meContext = undefined;
	}
}
var __pvp = new pvp();

function getArenaUI() {
	
}