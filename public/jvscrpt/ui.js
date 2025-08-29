'use strict';

const avatarTemplate = function (char, _name) {
	const _oldAvatar = document.getElementById('char-' + char.key);
	if (_oldAvatar)
		_oldAvatar.remove();
	const _class = char.main ? '' : (episode?.war ? ' war-player-profile' : ' friendly-profile');
	return `<div style="margin-top:0 !important;cursor:pointer;position:relative;width:20.2vw !important;height:11.8vw !important" ${char.main ? 'onclick="if(episode.id > 99) { return; } showMyModalPopUp(\'game-menu\');switchBookPage(1)" ' : 'onclick="switchCharacter()"'}class="profile${_class}" id="char-${char.key}">
			<img src='./images/icons/hp-frame.png' class='full' style='left: 0; top: 0; position: absolute; z-index: 2; filter:drop-shadow(0 0 .8vh #000) drop-shadow(0 0 .8vh #000)' />
			<div class="full flex">
				<div style="color:white;width:34%;height:100%">
					<div style="height:55%;padding:6.5% 5%;overflow:hidden;position:relative">
						<div class="full flex" style="margin:14% 22% 15% 8%;transform:rotate(45deg);-webkit-transform:rotate(45deg);background:radial-gradient(circle at center, ${char.color}, black);border-radius:100%">
							<span id="level-${char.key}" class="character-level-text">${char.level ?? 1}</span>
						</div>
						<div class="${!char.main && char.switchTime ? 'switch-character-cooldown' : 'd-none'}" style="opacity:0;margin-top:14%;position:absolute;width:100%;height:100%;top:0;left:0;background:#000000cc"></div>
					</div>
				</div>
				<div style="width:66%;height:100%">
					<div class="flex flex-ai-start flex-jc-start" style="width:100%;height:24%">
						<span class="character-name-text" style="color:#E2DFD2;font-weight:600;font-size:1.4vw !important;text-shadow:.25vh .25vh .5vh #000">${char?.main ? __account.name ?? char.name : char?.displayName ?? char?.name}</span>
					</div>
					<div style="position:relative;margin-top:2%;height:16%;background:#FFFFFF99;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:95%;overflow:hidden">
						<div class="full healthvalue animate-me-2000" style="position:absolute;background:#880808;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:${100 * (char.health / char.getMaxHP())}%">
						</div>
						<div class="full healthvalue animate-me" style="position:absolute;background:#0818A8;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:${100 * (char.health / char.getMaxHP())}%">
						</div>
					</div>
					<div style="width:68%;height:12%;background:#FFFFFF99;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%);overflow:hidden">
						<div class="full animate-me defbar-value" style="background:#702963;clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)"></div>
					</div>
					<div class="buffs flex flex-jc-start" style="padding:.4vw .8vw"></div>
				</div>
			</div>
			<img class="move-up d-none" src="./images/icons/upgrade.png" style="-webkit-filter:drop-shadow(0 0 .3vh #fff);filter:drop-shadow(0 0 .3vh #fff);z-index:2;position:absolute;width:1.8vw;left:.8vw" />
			<img class="aid${episode?.pvp || char.main || char.isDead() || char.health >= char.getMaxHP() ? ' d-none' : ''}" id="aid-${char.key}" onclick="drinkPot(episode.enemies.find(x => x.key === '${char.key}'), mainCharacter, event)" src="./images/icons/aid.png" />
			</div>`;
}
const pvpAvatarTemplate = function (char, _name) {
	const _oldAvatar = document.getElementById('char-' + char.key);
	if (_oldAvatar)
		_oldAvatar.remove();
	const _class = char.main ? '' : ' war-player-profile';
	return `<div class="flex war-player-card">
				<div class='war-player-card-left flex'>
					<div class='flex war-player-card-left-content war-player-team-${char.groupId}'>${char.level}</div>
				</div>
				<div class='war-player-card-medium flex'>
					<div class='war-player-card-medium-content flex'><img src="./images/icons/${char.class}.png" /></div>
				</div>
				<div class='war-player-card-right flex flex-jc-start'>
					<div>
						<div class="full healthvalue animate-me-2000" style="width:${100 * (char.health / char.getMaxHP())}%">
						</div>
						<div class="full healthvalue animate-me" style="width:${100 * (char.health / char.getMaxHP())}%">
						</div>
					</div>
					<div>
						<div class="full animate-me defbar-value"></div>
					</div>
					<div class="buffs flex flex-jc-start" style="padding:.4vw .8vw"></div>
				</div>
			</div>`;


	return `<div style="width:33% !important;height:auto !important" class="hp-war-profile profile${_class}" id="char-${char.key}">
			<div class="full flex">
				<div style="width:66%;height:100%">
					<div class="flex flex-ai-start flex-jc-start">
						<span class="character-name-text hp-war-player-name">${char?.main ? __account.name ?? char.name : char?.displayName ?? char?.name}</span>
					</div>
					<div>
						<div class="full healthvalue animate-me-2000" style="width:${100 * (char.health / char.getMaxHP())}%">
						</div>
						<div class="full healthvalue animate-me" style="width:${100 * (char.health / char.getMaxHP())}%">
						</div>
					</div>
					<div>
						<div class="full animate-me defbar-value"></div>
					</div>
					<div class="buffs flex flex-jc-start" style="padding:.4vw .8vw"></div>
				</div>
			</div>
		</div>`;
}
function renderText(_frame, _i) {
	const _val = MathCeil(_frame.dmg);
	if (_val === 0 && !_frame.steal && !_frame.counterAttack && !_frame.text && !_frame.buff)
		return;
	let _text = _frame.text ?? _val.toString();
	let _class = 'dmg', yStep = __dmgFrameDistance - (_i * 20), xStep = 0;
	if (_frame.steal > 0) {
		_text = '+' + parseInt(_frame.steal);
		yStep = __dmgFrameDistance;
		mainCharacter.increaseHealth(_frame.steal);
		renderTextElement({
			steal: _frame.steal,
			x: _frame.x + xStep,
			y: _frame.y + yStep - __dmgFrameDistance,
			class: _class + ' life-steal',
			text: _text,
			crit: _frame.crit,
			ms: 1000
		});
	}
	if (_frame.text) {
		if (_frame.class)
			_class += ' ' + _frame.class;
		else
			_class += ' effect-text';
		// if(_frame.atkType)
		// 	_class += ' atk-' + _frame.atkType;
		_text = _frame.text;
	}
	else
		_class += ' hit-text' + (_frame.atkType ? ' atk-' + _frame.atkType : '');
	if (_frame.buff)
		return;
	renderTextElement({
		//crit: _frame.crit,
		x: _frame.x + xStep,
		y: _frame.y + yStep - __dmgFrameDistance,
		class: _class,
		//text: _text,
		text: getDmgFrameNumbers(getRandomValue2(1, 9999)),
		ms: 1000
	});
}

function getDmgFrameNumbers(_text) {
	_text = _text.toString();
	let _r = '';
	let _type = getRandomValue2(1,6);
	switch(_type) {
		case 1:
			_type = 'dmg';
			break;
		case 2:
			_type = 'toxic';
			break;
		case 3: 
			_type = 'fire';
			break;
		case 4: 
			_type = 'ice';
			break;
		case 5: 
			_type = 'lightning';
			break;
		case 6: 
			_type = 'hit';
			break;
	}
	for(var i = 0; i < _text.length; i++)
		_r += `<img class="dmmg ${_type}-dmmg" src="./images/frames/${_type}/${_text.charAt(i)}.png" />`;
	return _r;
}

function renderTextElement(_settings) {
	if(!episode.damages)
		episode.damages = [];
	let damages = episode.damages;
	let _top = _canvas.height, _textElem;
	if (damages.length >= 5)
		for (var dmg of damages) {
			if (!dmg.running) {
				_textElem = dmg;
				break;
			}
			if (dmg.offsetTop < _top) {
				_textElem = dmg;
				_top = dmg.offsetTop;
			}
		}
	if (!_textElem) {
		_textElem = document.createElement('div');
		_gamePad.appendChild(_textElem);
		episode.damages.push(_textElem);
	}
	else {
		_textElem.style.animation = 'none';
		_textElem.offsetHeight;
		_textElem.style.animation = null;
	}
	_textElem.running = true;
	_textElem.onanimationend = function () {
		_textElem.running = false;
	}
	if (_settings.class?.indexOf('effect-gain') >= 0)
		_textElem.className = 'pop-outinGain ' + _settings.class;
	else
		_textElem.className = 'pop-outin' + (_settings.crit ? '2' : getRandomValue(3, 5)) + ' ' + _settings.class;
	_textElem.style.left = (_settings.x < 0 ? 0 : _settings.x) + 'px';
	_textElem.style.top = (_settings.y) + 'px';
	_textElem.innerHTML = _settings.text;
}
function loadUI() {
	_client.setCharacterValues();
	_navbar.innerHTML = avatarTemplate(mainCharacter);
	if (!modalEventsSet) {
		modalEventsSet = true;
		document.querySelectorAll('.my-pop-up-wrapper').forEach(x => x.onclick = function (e) {
			if (e.target.classList.contains('close-on-click') && e.target.classList.contains('loaded')) {
				hideMyModalPopUp();
				e.stopPropagation();
			}
		});
		for(let i = 1; i < 13; i++)
			document.getElementById('book-sign-' + i).onclick = function() {
				switchBookPage(i);
			}
		document.getElementById('book-sign-close').onclick = function() {
			hideModal();
		}
		const _cb = document.getElementById('chat-board');
		_cb.onclick = function() {
			openChatPage();
		}
		document.querySelector('#chat-board .cb-top-nav #cb-expand').onclick = function() {
			event.preventDefault();
			event.stopPropagation();
			toggleClass(_cb, 'expanded');
		}
		addPlayer = document.getElementById('add-player');
		addPlayer.addEventListener('click', function() {
			addCoopCharacter();
		});
		deadCountdown = document.getElementById('dead-countdown');
		rageSkill = document.getElementById('skill6');
		useProgress = document.getElementById('use-progress');
		_enemyProfile = document.querySelector('.enemy-profile');
	}
}
function openChatPage() {
	showMyModalPopUp('game-menu');
	switchBookPage(12);
}
function activateTouchPad() {
	if(document.getElementById('touch-d-pad'))
		return;
	const _dPadWrapper = document.createElement('div');
	_dPadWrapper.id = "touch-d-pad";
	const _dPad = document.createElement('div');
	_dPad.id = "touch-d-pad-inner";
	_dPad.className = "stay";
	_gameUI.appendChild(_dPad);
	_gameUI.appendChild(_dPadWrapper);
	let _touches;
	const _rect = {
		left: MathRound(_dPadWrapper.offsetLeft),
		width: MathRound(_dPadWrapper.offsetWidth),
		height: MathRound(_dPadWrapper.offsetHeight),
		top: MathRound(_dPadWrapper.offsetTop)
	};
	const _miniRect = {
		left: MathRound(_dPad.offsetLeft),
		width: MathRound(_dPad.offsetWidth),
		height: MathRound(_dPad.offsetHeight),
		top: MathRound(_dPad.offsetTop)
	};
	const _origin = {
		left: MathRound(_rect.left + (_rect.width / 2)),
		width: 1,
		height: 1,
		top: MathRound(_rect.top + (_rect.height / 2))
	};
	const _maxLeft = _rect.left + _rect.width;
	const maxTop = _rect.top - _miniRect.height;
	const workForDPad = function () {
		_touchEvent.preventDefault();
		if (!_touches) {
			_touches = {
				x: MathRound(_touchEvent.touches[0].pageX - ((document.body.clientWidth - _gamePad.clientWidth) / 2)),
				y: MathRound(_touchEvent.touches[0].pageY)
			};
			//_dPad.style.left = MathRound(_touches.x - (_miniRect.width / 2)) + 'px';
			//_dPad.style.top = MathRound(_touches.y - (_miniRect.height / 2)) + 'px';
		}
		//else {
			const _newTouches = {
				x: MathRound(_touchEvent.touches[0].pageX - ((document.body.clientWidth - _gamePad.clientWidth) / 2)),
				y: MathRound(_touchEvent.touches[0].pageY)
			};
			const k1 = MathAbs(_origin.left - _newTouches.x);
			const k2 = MathAbs(_origin.top - _newTouches.y);
			let directionX, directionY;
			if (_origin.left < _newTouches.x)
				directionX = 'right';
			else if (_origin.left > _newTouches.x)
				directionX = 'left';
			else
				directionX = _dPad.lastDirectionX ?? 'right';
			if (_origin.top > _newTouches.y)
				directionY = 'up';
			else if (_origin.top < _newTouches.y)
				directionY = 'down';
			else
				directionY = _dPad.lastDirectionY ?? 'up';
			calculateSin(k1, k2, directionX, directionY);
			let _left = (_dPad.offsetLeft + (_newTouches.x - _touches.x));
			if (_left > _maxLeft)
				_left = _maxLeft;
			else if (_left < 0)
				_left = 0;
			let _top = (_dPad.offsetTop - (_touches.y - _newTouches.y));
			if (_top < maxTop)
				_top = maxTop;
			else if (_top > (_canvas.height - _miniRect.height))
				_top = (_canvas.height - _miniRect.height);
			_dPad.style.left = _left + 'px';
			_dPad.style.top = _top + 'px';
			_touches = _newTouches;
			_dPad.lastDirectionX = directionX;
			_dPad.lastDirectionY = directionY;
		//}
	}
	_dPadWrapper.addEventListener('touchstart', function (_event) {
		_event.preventDefault();
		if (hasClass(_dPad, 'stay'))
			removeClass(_dPad, 'stay');
		if (dPadTimer)
			clearInterval(dPadTimer);
		_touchEvent = _event;
		dPadTimer = setInterval(function () {
			workForDPad();
		}, __globalMS);
	}, { passive: false });
	_dPadWrapper.addEventListener('touchmove', function (_event) {
		_touchEvent = _event;
	}, { passive: false });
	_dPadWrapper.addEventListener('touchend', function (_event) {
		if (dPadTimer)
			clearInterval(dPadTimer);
		_event.preventDefault();
		if (!hasClass(_dPad, 'stay'))
			addClass(_dPad, 'stay');
		_touches = undefined;
		_dPad.style.left = _miniRect.left + 'px';
		_dPad.style.top = _miniRect.top + 'px';
		resetDPadKeyCommands();
	}, { passive: false });
}
function resetDPadKeyCommands() {
	if(!mainCharacter.keyboard)
		switchAutoMode();
	mainCharacter.keyboard.mouseUp('w');
	mainCharacter.keyboard.mouseUp('a');
	mainCharacter.keyboard.mouseUp('s');
	mainCharacter.keyboard.mouseUp('d');
}
function calculateSin(k1, k2, dx, dy) {
	const h = Math.sqrt(Math.pow(k1, 2) + Math.pow(k2, 2));
	const _angle = Math.asin(k2 / h) * 180 / Math.PI;
	resetDPadKeyCommands();
	if (dx === 'right') {
		if (dy === 'up') {
			if (_angle <= 22.5)
				mainCharacter.keyboard.mouseDown('d');
			else if (_angle >= 67.5)
				mainCharacter.keyboard.mouseDown('w');
			else {
				mainCharacter.keyboard.mouseDown('w');
				mainCharacter.keyboard.mouseDown('d');
			}
		}
		else if (dy === 'down') {
			if (_angle <= 22.5)
				mainCharacter.keyboard.mouseDown('d');
			else if (_angle >= 67.5)
				mainCharacter.keyboard.mouseDown('s');
			else {
				mainCharacter.keyboard.mouseDown('s');
				mainCharacter.keyboard.mouseDown('d');
			}
		}
	}
	else {
		if (dy === 'up') {
			if (_angle <= 22.5)
				mainCharacter.keyboard.mouseDown('a');
			else if (_angle >= 67.5)
				mainCharacter.keyboard.mouseDown('w');
			else {
				mainCharacter.keyboard.mouseDown('w');
				mainCharacter.keyboard.mouseDown('a');
			}
		}
		else if (dy === 'down') {
			if (_angle <= 22.5)
				mainCharacter.keyboard.mouseDown('a');
			else if (_angle >= 67.5)
				mainCharacter.keyboard.mouseDown('s');
			else {
				mainCharacter.keyboard.mouseDown('s');
				mainCharacter.keyboard.mouseDown('a');
			}
		}
	}
}
let _toastWrappers = [];
function warn(_html, _class, _ms, _new, _buttons) {
	let _toast, _toastWrapper;
	if (!_toastWrappers.length || _new) {
		const _rand = Math.random();
		_toastWrapper = document.createElement('div');
		_toastWrapper.id = 'toast-wrapper-'+ _rand;
		_toastWrapper.className = 'toast-wrapper show-ui flex animate-me fade-start';
		_toast = document.createElement('div');
		_toast.id = 'toast';
		_toast.className = 'fade-start flex my-toast animate-me';
		if (_class)
			_toast.className += (' ' + _class);
		_toastWrapper.appendChild(_toast);
		_gameUI.appendChild(_toastWrapper);
		_toastWrappers.push(_toastWrapper);
	}
	else {
		_toastWrapper = _toastWrappers[_toastWrappers.length - 1];
		_toast = _toastWrapper.firstElementChild;
		_toast.className = 'my-toast animate-me';
		if (_class)
			_toast.className += (' ' + _class);
	}
	_toast.innerHTML = _html;
	if(_buttons?.[0]?.text) {
		const _btnsWrapper = document.createElement('div');
		_btnsWrapper.style.width = '100%';
		_btnsWrapper.className = 'flex';
		for(let _btn of _buttons){
			const _b = document.createElement('div');
			_b.className = 'game-btn flex';
			_b.innerText = _btn.text;
			_b.onclick = _btn.func;
			_btnsWrapper.appendChild(_b);
		}
		_toast.appendChild(_btnsWrapper);
	}
	if (!_toastWrapper.timer) {
		let _t = _toastWrapper;
		_toastWrapper.timer = setTimeout(function () {
			addClass(_toast, 'fade-end');
			addClass(_t, 'fade-end');
			const _tid = _t.id;
			_t.addEventListener('animationend', function() {
				try {
					if(_t) {
						_t.remove();
						_t = null;
					}
					_toastWrappers.find(x => x?.id === _tid).remove();
					_toastWrappers = _toastWrappers.filter(x => x && x.id !== _tid) ?? [];
				}
				catch (twex) { }
			}, false);
		}, (_ms ?? 1800) + 500);
	}
}
function shine(ms, _elem) {
	const _name = 'shine' + (ms ? '-' + ms.toString() : '');
	const _shine = _elem ? _elem.querySelector('#shine') : document.getElementById('shine');
	if (_shine && !_shine.shining) {
		_shine.shining = true;
		addClass(_shine, _name);
		setTimeout(function () {
			_shine.shining = false;
			removeClass(_shine, _name);
		}, (ms ?? 1500) - 200)
	}
}
function resetSkill(_key, _char, _num) {
	if((_char ?? mainCharacter).skills[_key].locked)
		return false;
	resetSkills(null, 1, _char, _key);
	return true;
}
function resetSkills(_ultimate, _keepCD, _char, _k) {
	const _c = _char ?? mainCharacter;
	const _animations = _c.animations;
	const _keys = _k ? [_k] : Object.keys(_animations);
	for (var _key of _keys) {
		const _skill = _animations[_key];
		if (_skill.next)
			_skill.next = _skill.realNext;
		const _characterSkill = _c.skills[_skill.key];
		if (_characterSkill?.unlockLevel)
			_characterSkill.locked = _c.level < _characterSkill.unlockLevel;
		if (!_skill.ultimate) {
			if (_skill.finishingMove && !_c.hasFinishingMove)
				_c.hasFinishingMove = true;
			if (!_keepCD && !_k && !_skill.chain && !_skill.maxCharge) {
				if (_skill.maxCharge)
					_skill.charge = _skill.maxCharge;
				if (_skill.coolDownLeft != undefined)
					_skill.coolDownLeft = undefined;
				if (_skill.coolDownStart != undefined)
					_skill.coolDownStart = undefined;
			}
			if (!(_c.ultimate || _ultimate) && _skill.skillOrder && !_k)
				continue;
			if (!_skill?.order && !_skill?.skillOrder && !_k)
				continue;
			else {
				if (_c.main) {
					const _elem = document.getElementById('skill' + (_skill.order ?? _skill.skillOrder ?? _skill.beforeOrder));
					const _counter = _elem.querySelector('.counter');
					if(_skill.disabled) {
						if (_counter)
							_counter.remove();
						_elem.style.background = 'none';
					}
					else {
						if (_counter)
							_counter.remove();
						if ((_skill.coolDownLeft > 0) && _keepCD)
							_c.startCooldown(_skill, 1);
						addClass(_elem, 'animate-me');
						if(_skill.key?.endsWith('modified'))
							addClass(_elem, 'modified');
						else
							removeClass(_elem, 'modified');
						if(_skill.before)
						{
							if(!_elem.swapTime || ((msNow - _elem.swapTime) > 400)) {
								if(hasClass(_elem, 'swap-skill')) {
									removeClass(_elem, 'swap-skill');
									addClass(_elem, 'swap-skill2');
								}
								else {
									removeClass(_elem, 'swap-skill2');
									addClass(_elem, 'swap-skill');
								}
								setTimeout(() => {
									_elem.style = 'background:url(./images/main/skill-icons/' + _c.class + '/' + (_k ?? _skill.key) + '.png);background-size:contain';
								}, 200);
								_elem.swapTime = msNow;
							}
							else
								_elem.style = 'background:url(./images/main/skill-icons/' + _c.class + '/' + (_k ?? _skill.key) + '.png);background-size:contain';
						}
						else
							_elem.style = 'background:url(./images/main/skill-icons/' + _c.class + '/' + (_skill.key?.startsWith('finish') ? 'finish' : _skill.key) + '.png);background-size:contain';
						if (_skill.maxCharge) {
							for (var ch = 1; ch <= _skill.maxCharge; ch++)
								removeClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder) + '-cd-' + ch), 'passive-charge');
							if (_keepCD)
								for (var ch = 1; ch <= _skill.maxCharge - _skill.charge; ch++)
									addClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder) + '-cd-' + ch), 'passive-charge');
						}
					}
				}
			}
		}
		if (_characterSkill?.locked)
			addClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder ?? _skill.beforeOrder)), 'locked');
		else
			removeClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder ?? _skill.beforeOrder)), 'locked');
		if(_skill.delay && !_skill.disabled)
			_c.startCooldown(_skill);
	}
}

function checkUpdateAvailable() {
	addClass(document.querySelector('.move-up'), 'd-none');
	if(!mainCharacter)
		return;
	const _badges = document.querySelectorAll('.update-badge');
	if(_badges?.[0])
		_badges.forEach(x => x.remove());
	const _skills = skill.getAvailableSkills();
	// const _currentSkillLevels = __account.characters.find(x => x.class === mainCharacter.class).skills.
	// 	filter(x => _skills.find(y => y.order === x.order)?.unlockLevel <= mainCharacter.level)
	// 	.filter(x => x.level < mainCharacter.level);
	// if(!_currentSkillLevels?.[0]) {
	// 	addClass(document.querySelector('.move-up'), 'd-none');
	// 	return;
	// }
	const availables = [];
	for(let _skill of _skills)
		if(skill.calculateSkillPrice(_skill.key) <= __account.gold)
			availables.push({ type: 'skill', key: _skill.key });
	var _items = allPowerDiffOrItemUpgrades();
	for(const _item of _items)
		availables.push(_item);
	if(checkIfGlobalQuestDone())
		availables.push({ type: 'pvp'});
	if(checkIfStoreFreeItemAvailable())
		availables.push({ type: 'ads'});
	if(checkIfLotteryAvailable())
		availables.push({ type: 'dungeon'});
	if(__account.pvp.duelCount > 0 && mainCharacter.level >= __pvp.unlockLevel)
		availables.push({ type: 'realpvp'});
	if(__account.forges?.find(x => x.warned))
		availables.push({ type: 'realdungeon'});
	if(availables?.[0]) {
		if(availables.find(x => x.type === 'skill'))
		{
			const _skillIcon = document.querySelector('.book-sign.game-skills');
			if(_skillIcon)
				_skillIcon.innerHTML += '<div class="update-badge"></div>';
		}
		if(availables.find(x => x.type === 'controls'))
		{
			const _skillIcon = document.querySelector('.book-sign.game-controls');
			if(_skillIcon)
				_skillIcon.innerHTML += '<div class="update-badge"></div>';
		}
		if(availables.find(x => x.type === 'dungeon'))
		{
			const _skillIcon = document.querySelector('.book-sign.game-dungeons');
			if(_skillIcon)
				_skillIcon.innerHTML += '<div class="update-badge"></div>';
		}
		if(availables.find(x => x.type === 'pvp'))
		{
			const _skillIcon = document.querySelector('.book-sign.game-pvp');
			if(_skillIcon)
				_skillIcon.innerHTML += '<div class="update-badge"></div>';
		}
		if(availables.find(x => x.type === 'realpvp'))
		{
			const _skillIcon = document.querySelector('.book-sign.game-realpvp');
			if(_skillIcon)
				_skillIcon.innerHTML += '<div class="update-badge"></div>';
		}
		if(availables.find(x => x.type === 'realdungeon'))
		{
			const _skillIcon = document.querySelector('.book-sign.game-realdungeon');
			if(_skillIcon)
				_skillIcon.innerHTML += '<div class="update-badge"></div>';
		}
		if(availables.find(x => x.type === 'ads'))
		{
			const _skillIcon = document.querySelector('.book-sign.game-ads');
			if(_skillIcon)
				_skillIcon.innerHTML += '<div class="update-badge"></div>';
		}
		removeClass(document.querySelector('.move-up'), 'd-none');
		//const _skillContainerLeft = document.querySelector('.skills-content-left');
		//if(_skillContainerLeft) {
			const _cards = document.querySelectorAll('.my-pop-up-content-body *[data-key]'); //_skillContainerLeft.querySelectorAll('.skill-card');
			for(let i = 0; i < _cards.length; i++)
				if(availables.find(x => x.key && (x.key.toString() === _cards[i].getAttribute('data-key'))))
					_cards[i].innerHTML += '<div class="update-badge"></div>';
		//}
	}
	else
		addClass(document.querySelector('.move-up'), 'd-none');
}

function updateExperience(_value, _levelup, _char) {
	if (!_mainExpBar && (!_char || _char.main))
		_mainExpBar = document.getElementById('main-exp-bar');
	const _c = _char ?? mainCharacter;
	if (_c.isDead())
		return;
	if (!_c.main && !_levelup)
		_value = MathRound(_value * .8);
	if (_value)
		_c.experience += _value;
	if (_c.experience >= _c.maxExperience) {
		_c.level++;
		_c.experience -= _c.maxExperience;
		_c.maxExperience *= 2;
		updateExperience(0, 1, _c);
		return;
	}
	if (_levelup) {
		_c.setHealth(_c.getMaxHP());
		const _level = document.getElementById('level-' + _c.key);
		_level.innerText = _c.level;
		if (_c.main) {
			if(_c.level === __pvp.unlockLevel) {
				warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="flex:1">' + getLangData('Pvp Content Unlocked') + '</span></div>', 'level-up', null, 1);
				warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="flex:1">' + getLangData('Rage Mode Activated') + '</span></div>', 'level-up', null, 1);
			}
			warn('<div class="flex leveling"><img style="height:14vh" src="./images/icons/level-up.png" /></div>', 'level-up');
			episode.playSound({ key: 'levelup', volume: .5 });
			updateGlobalQuest('level-up');
			dmgFrames.push({
				text: 'LEVEL UP!',
				//class: 'effect-gain level-up-pop',
				x: mainCharacter.getLeft(),
				y: _canvas.height - mainCharacter.yPosition - mainCharacter.getHeight()
			});
			episode.reset();
			checkUpdateAvailable();
			applyCharacterStats(1);
		}
		else
			_c.addObject({ key: 'levelup', position: 'middle-bottom', scale: 2.5 });
		for (var _key of Object.keys(_c.skills))
			if (_c.skills[_key].unlockLevel === _c.level) {
				_c.skills[_key].locked = false;
				warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/spell.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('New skill unlocked') + '!</span></div>', 'level-up', null, 1);
				break;
			}
		resetSkills(null, null, _c);
	}
	if (_c.main)
		_mainExpBar.style.width = MathRound((100 * _c.experience) / _c.maxExperience) + '%';
	_client.upgradeExperience(_c);
}
function updateGold(_value, _char) {
	if (!_goldCount)
		_goldCount = document.getElementById('main-gold-count');
	const _c = _char ?? mainCharacter;
	__account.gold += _value;
	if (_c.main) {
		episode.playSound({ key: 'coin', volume: .1 });
		_goldCount.innerText = __account.gold.formatWithDots();
	}
	_client.saveState();
}
function updateMisc(_misc) {
	const _m = __account.misc.find(x => x.type === _misc.type && x.grade === _misc.grade);
	if(!_m)
		__account.misc.push({type:_misc.type, count: _misc.count, grade: _misc.grade });
	else
		_m.count += _misc.count;
	_client.saveState();
}
function updatePot(_value) {
	if (!_potCount)
		_potCount = document.getElementById('main-pot-count');
	let _warn;
	if (_value > 9) {
		//warn('<span>' + getLangData('You can not carry more pots') + '</span>', 'warn');
		_value = 9;
		_warn = 1;
	}
	let _pot = __account.pots.find(x => x.key === 'pot');
	if (_pot && ((_pot.value ?? 0) + _value) > 9) {
		_warn = 1;
		_value = 9 - _pot.value;
	}
	if (_value <= 0)
		return false;
	else if(_warn) {
		warn('<span>' + getLangData('You can not carry more pots') + '</span>', 'warn');
		return false;
	}
	else if (_pot)
		_pot.value += _value;
	else
		__account.pots.push({ key: 'pot', value: _value });
	_potCount.innerText = _pot?.value ?? _value;
	_client.saveState();
	return true;
}
function removeHitCount(_char) {
	if (!_char || _char.main) {
		addClass(_hitCount, 'd-none');
		removeClass(_hitCount, 'minimize');
		if(episode && episode.bgMusic){
			episode.bgMusic.volumeDown = 1;
			episode.resetBgMusicVolume();
		}
	}
	(_char ?? mainCharacter).lastHitDate = undefined;
	(_char ?? mainCharacter).hitCount = 0;
}

function switchAutoMode(_off) {
	if(_off && mainCharacter.keyboard)
		return;
	const _a = document.getElementById('auto-mode-on-off');
	if(mainCharacter.keyboard && !_off) {
		mainCharacter.keyboard = undefined;
		mainCharacter.enemy = true;
		mainCharacter.setAutoMode(2, 1);
		mainCharacter.enemy = false;
		mainCharacter.sight = 1000;
		addClass(_a, 'selected');
	}
	else {
		setKeyBoard(mainCharacter);
		mainCharacter.autoMode = mainCharacter.realAutoMode = mainCharacter.sight = mainCharacter.autoTarget = undefined;
		removeClass(_a, 'selected');
	}
}

function activatePowerSaveMode() {
	if(document.getElementById('b-s-m'))
		return;
	setTimeout(function() {
		__batterySaveMode = 1;
		removeClass(document.getElementById('b-s-m'), 'fade-start');
	}, 1000);
	episode.pauseAmbianceMusic();
	episode.pauseBgMusic();
	const _scr = document.createElement('div');
	_scr.onclick = deactivatePowerSaveMode;
	_scr.id = 'b-s-m';
	_scr.className = 'fade-start full flex';
	_scr.style.zIndex = 9999;
	_scr.style.position = 'absolute';
	_scr.style.top = 0;
	_scr.style.left = 0;
	_scr.style.background = '#000';
	_scr.innerHTML += `
		<div class="flex" style="width:100%">
			<img src="./images/icons/battery.png" style="width:30%" />
			<div class="flex" style="width:100%;color:#f7f7f780 !important;padding:3vh;font-size:3.5vh !important">
				${getLangData('Battery Save Mode')}
			</div>
		</div>`;
	_gameUI.appendChild(_scr);
}

function deactivatePowerSaveMode() {
	const _elem = document.getElementById('b-s-m');
	if(hasClass(_elem, 'fade-start'))
		return;
	__batterySaveMode = prevPlatformX = undefined;
	addClass(_elem, 'fade-end');
	setTimeout(function() {
		_elem.remove();
		episode.playAmbianceMusic();
	}, 1000);
}

function checkIfLotteryAvailable() {
	const _lot = __account.missions.find(x => x.key === 'lottery');
	document.getElementById('spinner-btn').innerText = getLangData('SPIN');
	if(_lot.lastActivity && (_lot.lastActivity + (1000 * 60 * 60 * 24)) > msNow)
	{
		var _scr = document.getElementById('book-content-5');
		var _block = document.getElementById('lottery-block');
		if(!_block){
			_block = document.createElement('div');
			_block.id = "lottery-block";
			_block.className = "full flex event-block";
			_block.innerHTML = `<div class="block flex">
									<div class="flex" style="width:100%;padding:2vh;color:#f7f7f7 !important">${getLangData('Next Spin')}</div>
									<div class="flex" style="font-size:larger !important;font-weight:600;width:100%;padding:0 2vh 2vh 2vh;color:#880808 !important">${getTimeDiffUntilReset()}</div>
								</div>`;
			_scr.appendChild(_block);
		}
		return false;
	}
	return 1;
}
function closeGameOverModal() {
	const _goc = document.getElementById('game-over-content');
	if(_goc)
		_goc.innerHTML = '';
}
function closeUserActionsModal() {
	const _uac = document.getElementById('user-actions-content');
	if(_uac)
		_uac.innerHTML = '';
	const _modal = document.querySelector('.my-pop-up-wrapper.loaded');
	if(_modal)
		removeClass(_modal, 'loaded');
}
function openGameOverModal() {
	hideMyModalPopUp();
	let _html = `<div style="width:100%;height:50%" class="flex">
					<div style="width:80%;color:#f7f7f7dd;text-align:center;font-size:2.8vh !important">
						${getLangData('You died! You will revive at closest lobby after')} <span style="color:#ff6c00 !important" id="dead-countdown"></span> ${getLangData('seconds')}
					</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;height:90% !important;font-size:3vh !important" class="game-btn2 flex one-line" onclick="closeGameOverModal();reviveAtLobby()">${getLangData('Go To Village')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;height:90% !important;font-size:3vh !important" class="game-btn2 flex one-line" onclick="closeGameOverModal();reviveHere()">${getLangData('Revive Here')}</div>
				</div>`;
	document.getElementById('game-over-content').innerHTML = _html;
	showMyModalPopUp('game-over');
	deadCountdown = document.getElementById('dead-countdown');
}
function openUserActionsModal(_id, _name) {
	//hideMyModalPopUp();
	const _isFriend = __account.friends?.find(x => x.id === _id);
	let _html = `<div style="width:100%;height:50%" class="flex">
					<div style="width:80%;color:#f7f7f7dd;text-align:center;font-size:2.8vh !important">
						<span class="player-name">${_name}</span>
					</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line" onclick="closeUserActionsModal();openChatPage();selectPersonFromBigChat('${_id}','${_name}')">${getLangData('Send Message')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line" onclick="closeUserActionsModal()">${getLangData('Duel Request')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line${_isFriend ? ' d-none' : ''}" onclick="addAsFriend('${_id}','${_name}');openUserActionsModal('${_id}','${_name}')">${getLangData('Add Friend')}</div>
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line${!_isFriend ? ' d-none' : ''}" onclick="removeFromFriend('${_id}','${_name}');openUserActionsModal('${_id}','${_name}')">${getLangData('Remove Friend')}</div>
				</div>
				<div onclick="closeUserActionsModal()" class="user-actions-close">&times;</div>`;
	document.getElementById('user-actions-content').innerHTML = _html;
	showMyModalPopUp('user-actions');
}
function addAsFriend(_id, _name) {
	episode.playSound({key:'click'});
	const _f = __account.friends?.find(x => x.id === _id);
	if(!_f) {
		if(__account.friends?.length >= 100) {
			warn('<span>' + getLangData('Friend limit reached') + '</span>', 'warn');
			return;
		}
		__account.friends.push({id:_id, n:_name});
		_client.saveState();
	}
}
function removeFromFriend(_id, _name) {
	episode.playSound({key:'click'});
	const _i = __account.friends?.findIndex(x => x.id === _id);
	if(_i >= 0) {
		__account.friends.splice(_i, 1);
		_client.saveState();
	}
}
const _giftOrder = [
	{ key: 'pot', type: 'pot' },
	{ key: 'ticket-item', type: 'misc' },
	{ key: 'gold', type: 'gold' },
	{ key: 'ticket-exp', type: 'misc' },
	{ key: 'ticket-random', type: 'misc' },
	{ key: 'ticket-item-selection', type: 'misc' },
	{ key: 'chest', type: 'misc' },
	{ key: 'ticket-gold', type: 'misc' },
];
function spinLottery() {
	const _lot = __account.missions.find(x => x.key === 'lottery');
	if(_lot.lastActivity && (_lot.lastActivity + (1000 * 60 * 60 * 24)) > msNow)
		return;
	addClass(document.getElementById('spinner-btn'), 'disabled');
	var style = getComputedStyle(document.documentElement);
	var minRate = 45 / 900;
	var currentRate = parseInt(style.getPropertyValue('--spin-rate'));
	var itemOrder = getRandomValue(0, 7);
	const root = document.querySelector(':root');
	root.style.setProperty('--spin-rate', currentRate + (minRate * itemOrder));
	var currentRate2 = parseInt(style.getPropertyValue('--spin-rate2'));
	var itemOrder2 = getRandomValue(0, 7);
	root.style.setProperty('--spin-rate2', currentRate2 + (minRate * itemOrder2));
	episode.playSound({key:'click'});
	setTimeout(function() {
		const sbg = document.getElementById('spinner-bg');
		const sbg2 = document.getElementById('spinner-bg2');
		addClass(sbg, 'spin-me');
		sbg.src = sbg.src.replace('0.png', '.png');
		sbg2.style.background = sbg2.style.background.replace('bg0.png', '-bgf.png');
		addClass(sbg2, 'spin-me2');
		episode.playSound({key:'spinner', volume: .5});
		setTimeout(function() {
			setTimeout(function() {
				episode.playSound({key:'gift', volume: .5});
				setTimeout(function() {
					removeClass(document.getElementById('spinner-bg'), 'spin-me');
					removeClass(document.getElementById('spinner-bg2'), 'spin-me2');
					removeClass(document.getElementById('spinner-btn'), 'disabled');
					sbg.src = sbg.src.replace('.png', '0.png');
					sbg2.style.background = sbg2.style.background.replace('-bgf.png', 'bg0.png');
				}, 2000);
				warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[itemOrder].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', 'level-up', null, 1);
				warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[itemOrder2].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', 'level-up', null, 1);
				getChestReward(__account.grade ?? 1, _giftOrder[itemOrder].type, _giftOrder[itemOrder].key);
				getChestReward(__account.grade ?? 1, _giftOrder[itemOrder2].type, _giftOrder[itemOrder2].key);
				_lot.lastActivity = msNow;
				_client.saveState();
				checkUpdateAvailable();
				let itemOrder3;
				if(itemOrder === itemOrder2){
					episode.playSound({key:'clap', volume:.3});
					itemOrder3 = getRandomValue(0, _giftOrder.length - 1);
					warn('<div class="flex heading achievement jackpot glow-yellow" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[itemOrder3].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">!!!' + getLangData('JACKPOT') + '!!!</span></div>', 'level-up', null, 1);
					getChestReward(__account.grade ?? 1, _giftOrder[itemOrder3].type, _giftOrder[itemOrder3].key);
				}
			}, 500);
		}, 2500);
	},300);
}

function createStoreUI() {
	let _html = '<div class="book-page-wrapper need-money"><div class="flex book-page-bg">';
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
				<div class="flex store-item-icon"><img${(_price > 0 || !_ok) ? '' : ' class="glow-yellow"'} src='./images/icons/${_si.key}.png' /></div>
				<div class="store-item-title one-line${(_price > 0 || _ok) ? '' : ' d-none'}">${_si.count > 2 ? _si.count.toString() + ' x ' : ''}${_title}</div>
				<div style="font-weight:600!important;color:#262626 !important" class="store-item-price one-line${_ok ? ' d-none': ''}">${getLangData('SOLD')}!</div>
				<div class="store-item-price one-line${!_ok ? ' d-none': ''}${(_price > 0 || !_ok) ? '' : ' zoom-in-out'}"><span${_price > 0 ? '' : ' style="color:yellow !important;font-weight:600;font-size:larger !important"'}>${_price}</span> <img${_price > 0 ? '' : ' class="d-none"'} src="./images/icons/coin.png" /></div>
			</div>
		</div>`;
	}
	return _html + '</div></div>';
}

function createArtifactsUI() {
	let _html = '<div class="book-page-wrapper"><div class="flex book-page-bg">';
	for(let _i of __artifacts) {
		let _ok = __account.artifacts.find(x => x.id === _i.id);
		_html += `<div onclick="openArtifactDetailModal(${_i.id})" class="store-item">
			<div style="max-width:100%;max-height:100%;padding:0;width:100%;height:100%;border-radius:1.66vh;border:.5vh solid darkgoldenrod;box-shadow:inset 0 0 2vh #000;background:radial-gradient(#f7f7f7, ${_i.group === 1 ? '#008000' : '#000080'}80, #00000099, #000)" class="store-item-wrapper flex${_ok ? '' : ' gray'}">
				<div class="store-item-icon full" style="max-height:85%"><img style="height:90%!important;max-width:100%!important;max-height:100%!important" src='./images/artifacts/${_i.id}.png' /></div>
			</div>
		</div>`;
	}
	return _html + '</div></div>';
}
function openArtifactDetailModal(_id) {
	episode.playSound({ key: 'click' });
    var _item = __artifacts.find(x => x.id === _id);
	_item.bonus = __artifactGroups.find(x => x.id === _item.group).bonus;
	var _ids = __artifacts.filter(x => x.group === _item.group).map(x => x.id);
	var _bonusTitle = __properties.find(x => x.key === _item.bonus.key).titles[getLang()];
	var _pieces = '';
	for(let _i of __artifacts.filter(x => x.group === _item.group)) {
		var _owned = __account.artifacts.find(x => x.id === _i.id);
		_pieces += `<div class="flex artifact-bonus-item${_owned ? ' owned' : ''}" style="width:100%;padding:1vh">
               ${_i.titles[getLang()]}
        	</div>`;
	}
	const _isActive = __account.artifacts.filter(x => _ids.indexOf(x.id) !== -1)?.length >= 4;
    var _html = `<div class="full flex item-info-container-parent" style="z-index:2;position:absolute;padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
        <div class="full flex item-info-container artifact-info" style="overflow:hidden;background:radial-gradient(#262626, #000);border-radius:1.6vh;border:.4vh solid darkgoldenrod;position:relative">
            <div class="flex artifact-title" style="width:100%;padding:2vh">
               ${_item.titles[getLang()]}
            </div>
			<div class="flex artifact-description" style="width:100%;padding:2vh;text-align:center">
               ${getItemGradeLetter(_item.group)} ${getLangData('grade talisman, adds bonus attributes when you combine with other set pieces')}
            </div>
			<div class="flex artifact-heading" style="width:100%;padding:2vh">
               <span style="color:#f7f7f7!important">Set Bonus: <span style="font-weight:600;color:${_item.group < 2 ? '#FF3131': '#6495ED'}!important">%${_item.bonus.rate} ${_bonusTitle}</span><span${_isActive ? ' style="color:green!important;font-weight:600"' : ' class="d-none"'}">&nbsp;(${getLangData('Active')})</span></span>
            </div>
			<div class="flex artifact-bonus" style="width:100%;padding:1vh">`
               + _pieces +
            `</div>
			<div onclick="closeItemInfoModal()" style="position:absolute;top:0;right:0;padding:2vh;font-weight:600;font-size:5vh!important;line-height:3vh !important;color:darkgoldenrod !important">&times;</div>
        </div>
    </div>`;
    var _currentItemModal = document.querySelector('.item-info-container-parent');
    if(_currentItemModal)
        _currentItemModal.remove();
    document.getElementById('book-content-3').innerHTML += _html;
}
function refreshStoreItems() {
	document.getElementById('book-content-7').innerHTML = createStoreUI();
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
		_si.date = msNow;
	else
		__account.storeDates.push({id: _id, date: msNow});
	warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/' + _item.key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + (_item.count > 1 ? _item.count.toString() + ' x ' : '') + _title + '</span></div>', 'level-up', null, 1);
	getChestReward(__account.grade ?? 1, _item.key === 'pot' ? 'pot' : 'misc', _item.key, _item.count);
	closeInventoryQuestionModal();
	refreshStoreItems();
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
		_si.date = msNow;
	else
		__account.storeDates.push({id: 5, date: msNow});
	closeInventoryQuestionModal();
	refreshStoreItems();
	checkUpdateAvailable();
	warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/chest.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', 'level-up', null, 1);
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

function switchTipsUI(_inc) {
	const _at = document.getElementById('all-tips');
	let _order = parseInt(_at.getAttribute('data-order'));
	_order += _inc;
	if(_order < 0)
		_order = _tips.length - 1;
	else if(_order >= _tips.length)
		_order = 0;
	_at.innerHTML = createTipsUI(_order, 1);
	_at.setAttribute('data-order', _order.toString());
}

function renderTipsUI() {
	return `<div class="book-page-wrapper">
		<div id="all-tips" data-order="0" style="height:calc(100% - 10vh);width:100%">`
			+ createTipsUI(0, 1) +
		`</div>
		<div class="tips-nav flex" style="height:10vh;width:100%">
			<div onclick="switchTipsUI(-1)" style="height:100%;width:10vh;z-index:5" class="flex flex-jc-end">
				<img style="transform: scale(-1,1) !important;max-height:8vh;max-width:8vh" src="./images/icons/nav.png" />
			</div>
			<div class="flex" style="height:100%;width:calc(100% - 20vh)">
				${getLangData('How to play tips')}
			</div>
			<div onclick="switchTipsUI(1)" style="height:100%;width:10vh;z-index:5" class="flex flex-jc-start">
				<img style="max-height:8vh;max-width:8vh" src="./images/icons/nav.png" />
			</div>
		</div>
	</div>`;
}

function renderComingSoonContent(_content) {
	return `<div class="book-page-wrapper flex" style="height:86.5%;padding:0!important;margin:4% 7% 4.5% 8%;background:#262626"></div>`;
	// 	<span style="text-align:center;color:#f7f7f7cc!important;font-size:3vh!important;font-weight:600"><span style="color:#ff6c00 !important">[${getLangData(_content)}]</span><br/>${getLangData('Coming Soon')}</span>
	// </div>`;
}

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
	const _left = document.querySelector('.honor-items-container .honor-items-content-left');
	if (_left) {
		_left.innerHTML = getHonorItemsUI(_type ?? Object.keys(_equips)[0]);
		document.querySelector('.honor-items-container .honor-items-content-detail-wrapper').innerHTML = getHonorItemDetailUI(Object.keys(_equips)[0]) + '<div id="shine"></div>';
		return;
	}
	document.getElementById('book-content-11').innerHTML = 
		`<div class="honor-items-container need-honor full" style="padding:0 9% 6% 9%;overflow:hidden;position:relative">
			<div class="full flex">
				<div style="width:50%;height:100%">
					<div class="honor-items-content-left">`
						+ getHonorItemsUI(_type ?? Object.keys(_equips)[0]) +
					`</div>
				</div>
				<div style="width:50%;height:100%">
					<div class="honor-items-content-right">
						<div class="honor-items-content-detail-wrapper" style="position:relative !important;overflow:hidden !important">`
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
		if(msNow >= _end)
			_perc = 100;
		else 
			_perc = MathFloor(((msNow - _forgeStart) / _time) * 100);
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
	const _enabled = _date < msNow;
	const _perc = getHonorItemForgePerc(_type);
	let html = '<div style="height:86%;overflow-y:auto;padding-top:1.5vh">' +
	'<div style="padding:1vh 5vh">' + getLangData('Redeem your honor points, own an item with 4 random attributes after forge time') + '</div>' +
		'<div class="honor-items-content-title">' + getLangData('Forge Time') + '</div>' +
		'<div style="padding:1vh 5vh">'  + _item.time + ' ' + getLangData('hours') + '</div>' +
		'<div class="honor-items-content-title">' + getLangData('Cost') + '</div>' +
		'<div style="padding:1vh 5vh;height:8vh" class="flex flex-jc-start"><img class="honor-item-cost-icon" src="./images/icons/honor.png" />&nbsp;' + _item.cost + '&nbsp;/&nbsp;<span' + ((__account.pvp.honor < _item.cost) ? ' style="color:#FD1C03 !important"' : '') + '>' + __account.pvp.honor + '</span></div>' +
		'<div class="honor-items-content-title">' + getLangData('Status') + '</div>' +
		'<div style="padding:1vh 5vh">'  + (_enabled ? getLangData('Not started yet') : getLangData('In progress') + ' (' + getLangData('last') + ' ' + getTimeDiffUntilDate(new Date(_date)) + ')') + '</div>' +
		'<div class="honor-items-content-title">' + getLangData('Attribute Possibilities') + '</div>' +
		'<div style="padding:1vh 5vh">' + renderItemProps(_item, '#ffffffcc') + '</div>' +
		'<div class="honor-items-content-title">' + getLangData('Min Level Requirement') + '</div>' +
		'<div style="padding:1vh 5vh">' + _item.minLevelRequired + '</div>' +
		'<div class="honor-items-content-title">' + getLangData('Max Upgrade Level') + '</div>' +
		'<div style="padding:1vh 5vh">' + _item.maxLevel + '</div>' +
		'</div>' +
		'<div style="height:14%" class="flex">' +
			'<div class="game-btn2 flex' + (_perc < 0 ? '' : ' d-none') + ((__account.pvp.honor < _item.cost || !_enabled) ? ' gray disabled' : '') + '" onclick="askStartForge(\'' + _type + '\')" style="height:65%"><div class="flex">' + getLangData('CREATE') + '</div></div>' + 
			'<div class="game-btn2 flex' + (_perc >= 100 ? ' glow' : (_perc < 0 ? ' d-none' : ' gray disabled')) + '" onclick="takeForgedItem(\'' + _type + '\')" style="height:65%"><div class="flex">' + getLangData('READY') + '</div></div>' + 
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
	__account.forges.push({start:msNow, type: _type});
	__account.pvp.honor -= _cost;
	_client.saveState();
	getHonorStoreUI(_type);
}
function getHonorItemIcon(_item) {
    return '<span class="full grade' + _item.grade + '-item" style="display:inline-block;position:relative"><img style="background:#010101" class="item-img" src="./images/items/icons/' + (_item.for ? (_item.for + '/') : '') + _item.type + _item.grade + '.png"/></span>';
}
function askSomething(_question, _okFuncString) {
	try	{
		event.preventDefault();
		event.stopPropagation();
	}
	catch(ex) {}
	try {
		let _modal = `<div class="full flex inventory-question">
			<div class="inventory-modal">
				<div style="padding:4vh 2vh" class="flex">
					<span class="flex" style="color:#f3f4f5cc !important;font-size:3vh !important">` + getLangData(_question) + `?</span>
				</div>
				<div style="padding:4vh 2vh" class="flex">
					<div class="game-menu-button flex animate-me" style="color:#9d987f;cursor:pointer;min-width:80px;font-size:3vh !important" onclick="${_okFuncString}">${getLangData('YES')}</div>
					<div class="game-menu-button flex animate-me" style="color:#9d987f;cursor:pointer;min-width:80px;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
				</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		document.querySelector('#game-menu').appendChild(_div.querySelector('.inventory-question'));
		episode.playSound({ key: 'click' });
	}
	catch(qex) {
		alert(qex.message);
	}
}

function injectModule(_name, _func) {
	if(document.head.querySelector('script[data-name=' + _name + ']'))
		return;
	let scriptEle = document.createElement("script");
	scriptEle.setAttribute("src", "./js/" + _name + ".js");
	scriptEle.setAttribute('data-name', _name);
	let styleEle = document.createElement("link");
	styleEle.setAttribute("href", "./css/" + _name + ".css");
	styleEle.setAttribute('rel', 'stylesheet');
	styleEle.setAttribute('data-name', _name);
	document.head.appendChild(scriptEle);
	document.head.appendChild(styleEle);
	scriptEle.addEventListener("load", () => {
		if(_func)
			_func();
	});
}

function removeModule(_name) {
	const _insts = document.head.querySelectorAll('script[data-name=' + _name + '],link[data-name=' + _name + ']');
	if(_insts?.[0])
		_insts.forEach(x => x.remove());
}