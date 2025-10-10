'use strict';

const avatarTemplate = function (char, _name) {
	if(!char)
		return '';
	const _oldAvatar = document.getElementById('char-' + char.key);
	if (_oldAvatar)
		_oldAvatar.remove();
	const _class = char.main ? '' : (episode?.war ? ' war-player-profile' : ' friendly-profile');
	let _html = `<div style="margin-top:0 !important;cursor:pointer;position:relative;width:20.2vw !important;height:11.8vw !important" ${char.main ? 'onclick="if(episode.id > 99 || __story) { return; } showMyModalPopUp(\'game-menu\');switchBookPage(1)" ' : 'onclick="switchCharacter()"'}class="profile${_class}" id="char-${char.key}">
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
			<img class="aid${episode?.pvp || char.main || char.isDead() || char.health >= char.getMaxHP() ? ' d-none' : ''}" id="aid-${char.key}" onclick="drinkPot(episode.enemies.find(x => x.key === '${char.key}'), mainCharacter, event)" src="./images/icons/aid.png" />`
			// if(char.main && char.heartCount > 0) {
			// 	_html += `<img src='./images/icons/heart.png' id='heartcount1' />
			// 		<img src='./images/icons/heart.png' id='heartcount2' />
			// 		<img src='./images/icons/heart.png' id='heartcount3' />`;
			// }
		return _html + '</div>';
}
var lastDmgFrameRenderTime;
function drawDmgFrames() {
	if(lastDmgFrameRenderTime && ((_gameTick - lastDmgFrameRenderTime) < 100))
		return;
	lastDmgFrameRenderTime = _gameTick;
	let dmg = 0;
	const _texts = [];
	for (var _frame of dmgFrames.sort(x => x.counterAttack ? 0 : (x.crit ? 1 : 2))) {
		_frame.remove = true;
		if (dmg < 5) {
			if(_texts.find(x => x === _frame.text))
				dmg--;
			else {
				_texts.push(_frame.text);
				renderText(_frame, dmg + 1);
			}
		}
		dmg++;
	}
	_renderDmgFrame = 5;
	dmgFrames.length = 0;
}
function renderText(_frame, _i) {
	_frame.val = MathCeil(_frame.val);
	if (_frame.val === 0 && !_frame.steal && !_frame.text && !_frame.buff)
		return;
	//let _class = 'dmg', 
	let yStep = __dmgFrameDistance - (_i * 20), xStep = 0;
	// if (_frame.steal > 0) {
	// 	_text = '+' + parseInt(_frame.steal);
	// 	yStep = __dmgFrameDistance;
	// 	mainCharacter.increaseHealth(_frame.steal);
	// 	renderTextElement({
	// 		steal: _frame.steal,
	// 		x: _frame.x + xStep,
	// 		y: _frame.y + yStep - __dmgFrameDistance,
	// 		class: _class + ' life-steal',
	// 		text: _text,
	// 		crit: _frame.crit,
	// 		ms: 1000
	// 	});
	// }
	//if (_frame.text) {
		// if (_frame.class)
		// 	_class += ' ' + _frame.class;
		// else
		// 	_class += ' effect-text';
		// if(_frame.atkType)
		// 	_class += ' atk-' + _frame.atkType;
		//_text = _frame.text;
	//}
	//else
		//_class += ' hit-text' + (_frame.atkType ? ' atk-' + _frame.atkType : '');
	if (_frame.buff)
		return;
	renderTextElement({
		//crit: _frame.crit,
		x: _frame.x + xStep,
		y: _frame.y + yStep - __dmgFrameDistance,
		//class: _class,
		//text: _text,
		crit: _frame.text === 'crit',
		text: getDmgFrameNumbers(_frame),
		ms: 1000
	});
}

function getDmgFrameNumbers(_frame) {
	let _r = '', _type = '', _text = _frame.val?.toString() ?? '';
	switch(_frame.atkType) {
		case 'common':
			_type = 'dmg';
			break;
		case 'toxic':
			_type = 'toxic';
			break;
		case 'fire': 
			_type = 'fire';
			break;
		case 'ice': 
			_type = 'ice';
			break;
		case 'lightning': 
			_type = 'lightning';
			break;
		case 'hurt': 
			_type = 'hit';
			break;
		default:
			if(_frame.text)
				return `<img class="dmmg" src="./images/frames/${_frame.text}.png" />`;
			else if(_frame.item?.quest)
				return `<img class="dmmg" src="./images/frames/plus.png" /><img class="dmmg" src="./images/frames/1.png" /><img class="dmmg quest-item-dmmg" src="./images/quest-item/icons/${_frame.item.key}.png" />`;
			else if(_frame.item) {
				_r += '<img class="dmmg" src="./images/frames/plus.png" />';
				if(_frame.val) {
					for(var i = 0; i < _text.length; i++)
						_r += `<img class="dmmg dmg-num" src="./images/frames/${_text.charAt(i)}.png" />`;
				}
				else
					_r += '<img class="dmmg" src="./images/frames/1.png" />';
				if(_frame.item.grade)
					_r += `<img class="dmmg item-dmmg" src="./images/items/icons/${_frame.item.for ? _frame.item.for + '/' : ''}${_frame.item.key}${_frame.item.grade}.png" />`;
				else					
					_r += `<img class="dmmg icon-dmmg" src="./images/icons/${_frame.item.key}.png" />`;
				return _r;
			}
			break;
	}
	for(var i = 0; i < _text.length; i++)
		_r += `<img class="dmmg ${_type}-dmmg dmg-num" src="./images/frames/${_type === '' ? '' : _type + '/'}${_text.charAt(i)}.png" />`;
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
	// if (_settings.class?.indexOf('effect-gain') >= 0)
	// 	_textElem.className = 'pop-outinGain ' + _settings.class;
	// else
		_textElem.className = 'dmg pop-outin' + (_settings.crit ? '2' : getRandomValue2(3, 5));
	_textElem.style.left = (_settings.x < 0 ? 0 : _settings.x) + 'px';
	_textElem.platformX = platformX;
	_textElem.style.top = (_settings.y) + 'px';
	_textElem.innerHTML = _settings.text;
}
function hideDmgFrames() {
	if(episode?.damages?.[0])
		episode.damages.forEach(x => x.innerHTML = '');
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
		const _cb = document.getElementById('chat-board');
		_cb.onclick = function() {
			openChatPage();
		}
		document.getElementById('world-mini-map-area').onclick = function() {
			if(__story && !__account.questStatus?.quest){
				warn('<span>' + getLangData('No quest for now') + '</span>', 'warn');
				return;
			}
			switchBookPage(3, 3);
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
		_gameMenu = document.getElementById('game-menu');
		let _lastGameTick;
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
			   if(_gameTick)
					_lastGameTick = Date.now();
				if(mainCharacter?.keyboard)
					mainCharacter.keyboard.holdingKeys = [];
				if (window.plugins && window.plugins.insomnia)
					window.plugins.insomnia.allowSleepAgain();
			} else {
			   	if(_lastGameTick)
					_extraTick += (Date.now() - _lastGameTick);
			   	if (window.plugins && window.plugins.insomnia)
					window.plugins.insomnia.keepAwake();
			}
		});
		if (window.plugins && window.plugins.insomnia)
			window.plugins.insomnia.keepAwake();
		document.addEventListener("pause", () => {
			if(_gameTick)
				_lastGameTick = Date.now();
			if(mainCharacter?.keyboard)
				mainCharacter.keyboard.holdingKeys = [];
			if (window.plugins && window.plugins.insomnia)
				window.plugins.insomnia.allowSleepAgain();
		});
		document.addEventListener("resume", () => {
			 if(_lastGameTick)
				_extraTick += (Date.now() - _lastGameTick);
			if (window.plugins && window.plugins.insomnia)
				window.plugins.insomnia.keepAwake();
		});
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
		//_touchEvent.preventDefault();
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
		//_event.preventDefault();
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
		//_event.preventDefault();
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
function warn(_html, _class, _ms, _new, _buttons, _important) {
	let _toast, _toastWrapper;
	if(_toastWrappers?.find(x => x.isImportant))
		return;
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
		_toastWrapper.isImportant = _important;
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
				if (_skill.coolDownStart2 != undefined)
					_skill.coolDownStart2 = undefined;
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
						addClass(_elem, 'bgless');
					}
					else {
						if (_counter)
							_counter.remove();
						if ((_skill.coolDownLeft > 0) && _keepCD)
							_c.startCooldown(_skill, 1);
						removeClass(_elem, 'bgless');
						addClass(_elem, 'animate-me');
						if(_skill.key?.endsWith('modified'))
							addClass(_elem, 'modified');
						else
							removeClass(_elem, 'modified');
						if(_skill.before)
						{
							if(!_elem.swapTime || ((_gameTick - _elem.swapTime) > 400)) {
								if(hasClass(_elem, 'swap-skill')) {
									removeClass(_elem, 'swap-skill');
									addClass(_elem, 'swap-skill2');
								}
								else {
									removeClass(_elem, 'swap-skill2');
									addClass(_elem, 'swap-skill');
								}
								setTimeout(() => {
									if(mainCharacter?.animations[_skill.key]?.before)
										_elem.style = 'background:url(./images/main/skill-icons/' + _c.class + '/' + (_k ?? _skill.key) + '.png);background-size:contain';
								}, 200);
								_elem.swapTime = _gameTick;
							}
							else
								_elem.style = 'background:url(./images/main/skill-icons/' + _c.class + '/' + (_k ?? _skill.key) + '.png);background-size:contain';
						}
						else {
							removeClass(_elem, 'swap-skill');
							removeClass(_elem, 'swap-skill2');
							_elem.style = 'background:url(./images/main/skill-icons/' + _c.class + '/' + (_skill.key?.startsWith('finish') ? 'finish' : _skill.key) + '.png);background-size:contain';
						}
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
		if(_skill.delay && !_skill.disabled && _gameTick)
			_c.startCooldown(_skill, null, 1);
	}
}

function checkUpdateAvailable() {
	//addClass(document.querySelector('.move-up'), 'd-none');
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
	// if(checkIfLotteryAvailable())
	// 	availables.push({ type: 'dungeon'});
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
		//removeClass(document.querySelector('.move-up'), 'd-none');
		//const _skillContainerLeft = document.querySelector('.skills-content-left');
		//if(_skillContainerLeft) {
			const _cards = document.querySelectorAll('.my-pop-up-content-body *[data-key]'); //_skillContainerLeft.querySelectorAll('.skill-card');
			for(let i = 0; i < _cards.length; i++)
				if(availables.find(x => x.key && (x.key.toString() === _cards[i].getAttribute('data-key'))))
					_cards[i].innerHTML += '<div class="update-badge"></div>';
		//}
	}
	//else
		//addClass(document.querySelector('.move-up'), 'd-none');
}

function setCharacterLevel(_to, _char, _noWarn) {
	const _c = _char ?? mainCharacter;
	if(_c.level >= _to)
		return;
	while(true) {
		updateExperience(_c.maxExperience - _c.experience, null, _c, _noWarn);
		if(_c.level >= _to)
			return;
	}
}

function updateExperience(_value, _levelup, _char, _noWarn) {
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
		_c.maxExperience = MathRound(_c.maxExperience * 1.2);
		updateExperience(0, 1, _c, _noWarn);
		return;
	}
	if (_levelup) {
		_c.setHealth(_c.getMaxHP());
		const _level = document.getElementById('level-' + _c.key);
		if(_level)
		_level.innerText = _c.level;
		if (_c.main) {
			if(!_noWarn && (_c.level === __pvp.unlockLevel)) {
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="flex:1">' + getLangData('Pvp Content Unlocked') + '</span></div>', null, null, 1);
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="flex:1">' + getLangData('Rage Mode Activated') + '</span></div>', null, null, 1);
			}
			if(!_noWarn){
				warn('<div class="flex leveling"><img style="height:14vh" src="./images/icons/level-up.png" /></div>', 'level-up');
				PlaySound({ key: 'levelup', volume: .5 });
			}
			updateGlobalQuest('level-up');
			if(!_noWarn)
				dmgFrames.push({
					text: 'level-up',
					//class: 'effect-gain level-up-pop',
					x: mainCharacter.getLeft(),
					y: _canvas.height - mainCharacter.yPosition - mainCharacter.getHeight()
				});
			episode.reset();
			checkUpdateAvailable();
			applyCharacterStats(1);
		}
		else if(!_noWarn)
			_c.addObject({ key: 'levelup', position: 'middle-bottom', scale: 2.5 });
		for (var _key of Object.keys(_c.skills))
			if (_c.skills[_key].unlockLevel === _c.level) {
				_c.skills[_key].locked = false;
				if(!_noWarn)
					warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/spell.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('New skill unlocked') + '!</span></div>', null, null, 1);
				break;
			}
		resetSkills(_c.ultimate, null, _c);
	}
	if (_c.main)
		_mainExpBar.style.width = MathRound((100 * _c.experience) / _c.maxExperience) + '%';
	_client.upgradeExperience(_c);
}
var episodeGold = 0;
function updateGold(_value, _char) {
	if(__storyPlaying)
	{
		episodeGold += _value;
		return;
	}
	if (!_goldCount)
		_goldCount = document.getElementById('main-gold-count');
	const _c = _char ?? mainCharacter;
	__account.gold += _value;
	if (_c.main) {
		PlaySound({ key: 'coin', volume: .1 });
		if(_goldCount)
			_goldCount.innerText = __account.gold.formatWithDots();
	}
	_client.saveState();
}
function updateFragment(_key, _count) {
	const _newfr = __account.fragments.find(x => x.key === _key);
	if(_newfr)
		_newfr.count += _count;
	else
		__account.fragments.push({key:_key, grade:0, count:_count});
	_client.saveState();
}
function updateTicket(_value) {
	if(!_value)
		_value = 1;
	const _ticketText = document.getElementById('main-ticket-count');
	__account.storyTicket += _value;
	if(_ticketText)
		_ticketText.innerText = __account.storyTicket > 999 ? '999+' : __account.storyTicket;
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
	const _potText =  document.getElementById('main-pot-count-menu');
	if(_potText)
		_potText.innerText = _pot?.value ?? _value;
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
	PlaySound({key:'click'});
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
	PlaySound({key:'click'});
	const _i = __account.friends?.findIndex(x => x.id === _id);
	if(_i >= 0) {
		__account.friends.splice(_i, 1);
		_client.saveState();
	}
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
					<span class="flex" style="color:#f7f7f7dd !important;font-size:3vh !important">` + getLangData(_question) + `?</span>
				</div>
				<div style="padding:4vh 2vh" class="flex">
					<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onclick="${_okFuncString}">${getLangData('YES')}</div>
					<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
				</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		document.querySelector('#menu-ui').appendChild(_div.querySelector('.inventory-question'));
		PlaySound({ key: 'click' });
	}
	catch(qex) {
		alert(qex.message);
	}
}

function showInfo(_json) {
	// {
	//		titles: '''',
	//		navigations: [
	//			{ titles:[], func: '' }
	//		]
	// }
	try	{
		event.preventDefault();
		event.stopPropagation();
	}
	catch(ex) {}
	try {
		const _title = _json.titles?.[getLang()] ?? '';
		let _modal = `<div class="full flex inventory-question show-info">
			<div class="inventory-modal">
				<div style="padding:6vh 2vh 2vh 2vh" class="flex">
					<span class="flex show-info-title">${_title}</span>
				</div>
				<div id="show-info-navigations" style="padding:4vh 2vh" class="flex w-100"></div>
				<div class="show-info-close flex" onclick="closeInventoryQuestionModal()">&times;</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		document.querySelector('#menu-ui').appendChild(_div.querySelector('.inventory-question'));
		PlaySound({ key: 'click' });
		const _container = document.getElementById('show-info-navigations');
		for(let _n of _json.navigations ?? []) {
			const _div2 = document.createElement('div');
			_div2.className = 'info-nav-container flex';
			_div2.innerHTML = 
			`<div class="flex" style="height:100%">
				<img src="./images/ui/menu-icons/${_n.icon}.png" />
			</div>
			<div class="info-nav flex flex-jc-start" style='flex:1'>
				${_n.titles[getLang()]}
			</div>`;
			if(_n.func)
				_div2.onclick = _n.func;
			_container.appendChild(_div2);
		}
	}
	catch(qex) {
		alert(qex.message);
	}
}

window.__injectedModules = [];

function injectModule(_name, _func) {
	// if(document.head.querySelector('script[data-name=' + _name + ']'))
	// 	return;
	if(window.__injectedModules.indexOf(_name) !== -1)
		return;
	window.__injectedModules.push(_name);
	let scriptEle = document.createElement("script");
	scriptEle.setAttribute("src", "./js/" + _name + ".js?x=" + Math.random());
	//scriptEle.setAttribute('data-name', _name);
	let styleEle = document.createElement("link");
	styleEle.setAttribute("href", "./css/" + _name + ".css?x=" + Math.random());
	styleEle.setAttribute('rel', 'stylesheet');
	//styleEle.setAttribute('data-name', _name);
	document.head.appendChild(scriptEle);
	document.head.appendChild(styleEle);
	scriptEle.addEventListener("load", () => {
		if(_func)
			_func([scriptEle, styleEle], _name);
	});
}

function removeModule(_name) {
	const _i = window.__injectedModules.findIndex(x => x === _name);
	if(_i >= 0)
		window.__injectedModules.splice(_i, 1);
	return;
	const _insts = document.head.querySelectorAll('script[data-name=' + _name + '],link[data-name=' + _name + ']');
	if(_insts?.[0])
		_insts.forEach(x => x.remove());
}