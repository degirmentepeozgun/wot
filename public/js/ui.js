'use strict';
const pvpAvatarTemplate = function (char, _name) {
	const _oldAvatar = document.getElementById('char-' + char.key);
	if (_oldAvatar)
		_oldAvatar.remove();
	const _class = char.main ? ' war-player-profile-me' : ' war-player-profile';
	return `<div class="flex war-player-card profile${_class}" id="char-${char.key}">
				<div class='war-player-card-left flex'>
					<div class='flex war-player-card-left-content war-player-team-${char.groupId}'><img src="./images/icons/${char.class}.png" /></div>
				</div>
				<div class='war-player-card-right flex flex-jc-start'>
					<div class="hp-war-player-name">
						<div class="one-line">
							${char?.main ? __account.name ?? char.name : char?.displayName ?? char?.name}
						</div>
					</div>
					<div class="war-player-healthvalue-wrapper">
						<div class="full healthvalue healthvalue-bg animate-me-2000" style="background:#880808;width:${100 * (char.health / char.MAXHP)}%">
						</div>
						<div class="full healthvalue animate-me" style="background:#0818A8;width:${100 * (char.health / char.MAXHP)}%">
						</div>
					</div>
					<div class="war-player-defbar-wrapper">
						<div class="full animate-me defbar-value" style="background:#702963"></div>
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
const avatarTemplate = function (char, _name) {
	if(!char)
		return '';
	const _oldAvatar = document.getElementById('char-' + char.key);
	if (_oldAvatar)
		_oldAvatar.remove();
	const _class = char.main ? '' : (episode?.pvp ? ' war-player-profile' : ' friendly-profile');
	let _html = `<div style="margin-top:0 !important;cursor:pointer;position:relative;width:20.2vw;aspect-ratio:101/59;height:auto!important" ${char.main ? 'onexactclick="if(episode.id > 99 || __story) { return; } showMyModalPopUp(\'game-menu\');switchBookPage(1)" ' : 'onexactclick="switchCharacter()"'}class="profile${_class}" id="char-${char.key}">
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
						<div class="full healthvalue" style="position:absolute;background:#880808;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:${100 * (char.health / char.MAXHP)}%">
						</div>
						<div class="full healthvalue" style="position:absolute;background:#0818A8;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:${100 * (char.health / char.MAXHP)}%">
						</div>
					</div>
					<div style="width:68%;height:12%;background:#FFFFFF99;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%);overflow:hidden">
						<div class="full defbar-value" style="background:#702963;clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)"></div>
					</div>
					<div class="buffs flex flex-jc-start" style="padding:.4vw .8vw"></div>
				</div>
			</div>
			<img class="move-up d-none" src="./images/icons/upgrade.png" style="-webkit-filter:drop-shadow(0 0 .3vh #fff);filter:drop-shadow(0 0 .3vh #fff);z-index:2;position:absolute;width:1.8vw;left:.8vw" />
			<img class="aid${episode?.pvp || char.main || char.isDead() || char.health >= char.MAXHP ? ' v-none' : ''}" id="aid-${char.key}" onexactclick="drinkPot(episode.enemies.find(x => x.key === '${char.key}'), mainCharacter, event)" src="./images/icons/aid.png" />`
			if(char.main && char.heartCount > 1) {
				_html += `<img src='./images/icons/heart.png' id='heartcount1' />
					<img src='./images/icons/heart.png' id='heartcount2' />
					<img src='./images/icons/heart.png' id='heartcount3' />`;
			}
		return _html + '</div>';
}
var lastDmgFrameRenderTime;
function drawDmgFrames() {
	if(lastDmgFrameRenderTime && ((_gameTick - lastDmgFrameRenderTime) < 1000))
		dmgFrames = dmgFrames.filter(x => !x.remove);
	if(!dmgFrames?.[0]) {
		if(!cDMG.cleared)
			cDMG.clearRect(0, 0, episode.cWidth, episode.cHeight);
		return;
	}
	let dmg = 0;
	const _texts = [];
	cDMG.clearRect(0, 0, episode.cWidth, episode.cHeight);
	episode.offDmgCtx.clearRect(0, 0, episode.cWidth, episode.cHeight);
	cDMG.cleared =1;
	for (var _frame of dmgFrames.sort(x => x.counterAttack ? 0 : (x.crit ? 1 : 2))) {
		if(_frame.remove)
			continue;
		if (dmg < 5) {
			if(_texts.find(x => x === _frame.text)){
				dmg--;
				_frame.remove = true;
			}
			else {
				if(_frame.text)
					_texts.push(_frame.text);
				if(_frame.totalStepY === undefined){
					_frame.platformX = platformX;
					_frame.totalStepY = getRandomValue2(15, 23);
					_frame.maxStepY = _frame.totalStepY;
					if(_frame.crit){
						_frame.zoom = 2;
						_frame.stepY = 2;
					}
					else{
						_frame.zoom = getRandomValue2(10,13) / 10;
						if(_frame.zoom < 1.1)
							_frame.stepY = 5;
						else if(_frame.zoom < 1.2)
							_frame.stepY = 4;
						else if(_frame.zoom <= 1.3)
							_frame.stepY = 3;
					}
					_frame.startZoom = _frame.zoom;
				}
				renderText(_frame, dmg + 1);
			}
		}
		else
			_frame.remove = true;
		dmg++;
	}
	cDMG.drawImage(episode.offDmgCanvas, 0, 0);
	cDMG.cleared =0;
	lastDmgFrameRenderTime = _gameTick;
}
function renderText(_frame, _i) {
	if (_frame.buff){
		_frame.remove = true;
		return;
	}
	if(_frame.val)
		_frame.val = MathCeil(_frame.val);
	if (!_frame.val && !_frame.steal && !_frame.text && !_frame.buff) {
		_frame.remove = true;
		return;
	}
	if(_frame.startY === undefined)
		_frame.startY = (_frame.y + (__dmgFrameDistance - (_i * 20))) -  __dmgFrameDistance;
	renderTextElement2({
		x: _frame.x,
		crit: _frame.text === 'crit',
		frame: _frame,
		images: getDmgFrameNumbers2(_frame),
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
				return `<img class="dmmg" src="./images/frames/plus.png" />
			<img class="dmmg" src="./images/frames/1.png" />
			<img class="dmmg quest-item-dmmg" src="./images/quest-item/icons/${_frame.item.key}.png" />`;
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

function getDmgFrameNumbers2(_frame) {
	let _r = [], _type = '', _text = _frame.val?.toString() ?? '';
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
				return [getImage(`./images/frames/${_frame.text}.png`)];
			else if(_frame.item?.quest)
				return [ getImage('./images/frames/plus.png'), 
					getImage('./images/frames/1.png'), 
					getImage(`./images/quest-item/icons/${_frame.item.key}.png`)];
			else if(_frame.item) {
				_r.push(getImage('./images/frames/plus.png'));
				if(_frame.val) {
					for(var i = 0; i < _text.length; i++)
						_r.push(getImage(`./images/frames/${_text.charAt(i)}.png`));
				}
				else
					_r.push(getImage('./images/frames/1.png'));
				if(_frame.item.grade)
					_r.push(getImage(`./images/items/icons/${_frame.item.for ? _frame.item.for + '/' : ''}${_frame.item.key}${_frame.item.grade}.png`));
				else					
					_r.push(getImage(`./images/icons/${_frame.item.key}.png`));
				return _r;
			}
			break;
	}
	for(var i = 0; i < _text.length; i++)
		_r.push(getImage(`./images/frames/${_type === '' ? '' : _type + '/'}${_text.charAt(i)}.png`));
	return _r;
}

function renderTextElement(_settings) {
	if(!episode.damages)
		episode.damages = [];
	let damages = episode.damages;
	let _lastUsed = _gameTick, _textElem;
	if (damages.length >= 5)
		for (var dmg of damages) {
			if (!dmg.lastUsed) {
				_textElem = dmg;
				break;
			}
			if (dmg.lastUsed < _lastUsed) {
				_textElem = dmg;
				_lastUsed = dmg.lastUsed;
			}
		}
	if (!_textElem) {
		_textElem = document.createElement('div');
		const _big = (_settings.crit ? '2' : getRandomValue2(3, 5));
		_textElem.className = 'dmg pop-outin' + _big;
		_textElem._big = _big;
		_textElem.style.left = (_settings.x < 0 ? 0 : _settings.x) + 'px';
		_textElem.platformX = platformX;
		_textElem.style.top = (_settings.y) + 'px';
		_textElem.innerHTML = _settings.text;
		_gamePad.appendChild(_textElem);
		episode.damages.push(_textElem);
	}
	else {
		// _textElem.style.animation = 'none';
		// _textElem.offsetHeight;
		// _textElem.style.animation = null;
		removeClass(_textElem, 'pop-outin' + _textElem._big);
		requestAnimationFrame(() => {
			const _big = (_settings.crit ? '2' : getRandomValue2(3, 5));
			addClass(_textElem, 'pop-outin'+ _big);
			_textElem._big = _big;
			_textElem.style.left = (_settings.x < 0 ? 0 : _settings.x) + 'px';
			_textElem.platformX = platformX;
			_textElem.style.top = (_settings.y) + 'px';
			_textElem.innerHTML = _settings.text;
		});
	}
	_textElem.lastUsed = _gameTick;
	_textElem.onanimationend = function () {
		delete _textElem.lastUsed;
	}
}
function renderTextElement2(_settings) {
	if(_settings.images?.[0]){
		let _l = _settings.x, i = 0, _settingsY = (_settings.frame.maxStepY - _settings.frame.totalStepY);
		for(let _sprite of _settings.images)
			if(_sprite) {
				const _spriteHeight = MathRound((episode.dmgFrameHeight) * _settings.frame.zoom);
				const _y =  _settings.frame.startY - 
				(_settings.frame.zoom > 1  ? 0 : MathRound(_settingsY * 
				((_spriteHeight / _settings.frame.stepY))));
				if(_y < episode.dmgFrameTopBoundary){
					_settings.frame.remove = true;
					return;
				}
				const _spriteWidth = (_sprite.width *  _spriteHeight) / _sprite.height;
				let _sWidth =  MathRound(_spriteWidth * _settings.frame.zoom);
				episode.offDmgCtx.drawImage(_sprite, 
					(_l + (_settings.frame.platformX - platformX)) - MathRound(i * (_spriteHeight / 5)) - MathRound((_sWidth - _spriteWidth) / 2),
					_y, _sWidth, _spriteHeight);
				_l += _spriteWidth;
				i++;
			}
		if(_settings.frame.zoom > 1){
			if(!_settings.frame.start)
				_settings.frame.start = 0;
			if(_settings.frame.start === 2)
				_settings.frame.zoom -= (_settings.frame.startZoom - 1) / 2;
			else if(_settings.frame.start === 4)
				_settings.frame.zoom = 1;
			_settings.frame.start++;
		}
		else
			_settings.frame.totalStepY--;
		if(_settings.frame.totalStepY <= 0)
			_settings.frame.remove = true;
	}
}
function hideDmgFrames() {
	if(episode?.damages?.[0])
		episode.damages.forEach(x => x.innerHTML = '');
}
function moveInput(_rate) {
	const _focused = document.querySelector('.input-focused');
	if(!_focused && _rate)
		return;
	if(_rate) {
		if(!hasClass(document.body, 'keyboard-appeared')) {
			addClass(document.body, 'keyboard-appeared');
			document.body.style.transform = 'scale(' + _rate + ')';
			const _rect = _focused.getBoundingClientRect();
			const _x = (_rect.left + (_rect.width / 2));
			const _y = (_rect.top + (_rect.height / 2));
			document.body.style.transformOrigin = _x + 'px ' + _y + 'px';
		}
	}
	else {
		if(hasClass(document.body, 'keyboard-appeared')) {
			removeClass(document.body, 'keyboard-appeared');
			document.body.style.transform = 'none';
			document.body.style.transformOrigin = 'unset';
		}
	}
}
var keyboardHeight = 0, initialHeight;
function resizeOuterWindow(_keyboardHeight) {
	if(_keyboardHeight){
		addClass(document.getElementById('wrapper'), 'scrollcontent');
	}
	else {
		removeClass(document.getElementById('wrapper'), 'scrollcontent');
	}
	return;
	if(_keyboardHeight){
		setTimeout(() => {
			const _focused = document.querySelector('input');
			let _bottom = 0;
			if(_focused) {
				_bottom = _focused.getBoundingClientRect().bottom + (window.innerHeight * .02);
				_bottom = keyboardHeight - (window.innerHeight - _bottom);
				_gameUI.style.top = (-_bottom) + 'px';
			}
		}, 300);
	}
	else
		_gameUI.style.top = keyboardHeight = 0;
}
function loadUI() {
	_client.setCharacterValues();
	_navbar.innerHTML = avatarTemplate(mainCharacter);
	if (!modalEventsSet) {
		modalEventsSet = true;
		document.querySelectorAll('.my-pop-up-wrapper').forEach(x => x.onexactclick = function (e) {
			if (e.target.classList.contains('close-on-click') && e.target.classList.contains('loaded')) {
				hideMyModalPopUp();
				e.stopPropagation();
			}
		});
		// const _cb = document.getElementById('chat-board');
		// _cb.onexactclick = function() {
		// 	openChatPage();
		// }
		document.getElementById('world-mini-map-area').onexactclick = function() {
			if(__story?.disableWorldMap)
				return;
			if(__story && !__account.questStatus?.quest){
				warn('<span>' + getLangData('No quest for now') + '</span>', 'warn');
				return;
			}
			switchBookPage(3, 3);
		}
		// document.querySelector('#chat-board .cb-top-nav #cb-expand').onexactclick = function() {
		// 	event.preventDefault();
		// 	event.stopPropagation();
		// 	toggleClass(_cb, 'expanded');
		// }
		document.addEventListener('contextmenu', function (e) {
			e.preventDefault();
		}, false);
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
		initialHeight = window.visualViewport?.height ?? window.innerHeight;
		window.addEventListener('keyboardDidShow', (e) => {
			keyboardHeight = e.keyboardHeight;
			resizeOuterWindow(e.keyboardHeight);
		});
		window.addEventListener('keyboardWillShow', (e) => {
			keyboardHeight = e.keyboardHeight;
			resizeOuterWindow(e.keyboardHeight);
		});
		window.addEventListener('keyboardDidHide', () => {
			keyboardHeight = 0;
			resizeOuterWindow();
		});
		window.addEventListener('keyboardWillHide', (e) => {
			keyboardHeight = 0;
			resizeOuterWindow();
		});
		//
		// if(window.visualViewport)
		// 	window.visualViewport?.addEventListener('resize', () => {
		// 		const newHeight = window.visualViewport?.height ?? window.innerHeight;
		// 		const heightDiff = initialHeight - newHeight;
		// 		let _minKeyboardHeight = (_canvas.width * __scale) / 4;
		// 		if(_minKeyboardHeight > 150)
		// 			_minKeyboardHeight = 150;
		// 		if (heightDiff > _minKeyboardHeight) {
		// 			resizeOuterWindow(heightDiff);
		// 		} else {
		// 			resizeOuterWindow();
		// 		}
		// 	});
		// else
		// 	window.addEventListener("resize", () => {
		// 		const newHeight = window.visualViewport?.height ?? window.innerHeight;
		// 		const heightDiff = initialHeight - newHeight;
		// 		let _minKeyboardHeight = (_canvas.width * __scale) / 4;
		// 		if(_minKeyboardHeight > 150)
		// 			_minKeyboardHeight = 150;
		// 		if (heightDiff > _minKeyboardHeight) {
		// 			//moveInput(initialHeight / newHeight);
		// 			resizeOuterWindow(heightDiff);
		// 		} else {
		// 			//moveInput();
		// 			resizeOuterWindow();
		// 		}
		// 	});
		document.addEventListener("visibilitychange", () => {
			try 
				{if (document.hidden) {
					if(_gameTick)
						_lastGameTick = Date.now();
					if(_openingSound)
						_openingSound.pause();
					if(mainCharacter?.keyboard)
						mainCharacter.keyboard.holdingKeys = [];
					if(episode && episode.bgMusic)
						episode.pauseBgMusic();
					if(episode && episode.bgSound)
						episode.pauseAmbianceMusic();
					mainCharacter.stopHeartBeatSound();
					if(episode.hasGoSound)
						episode.stopGoSound();	
					episodeVisibilityHidden = true;
				} else {
					if(_lastGameTick){
						const _diff = (Date.now() - _lastGameTick);
						_extraTick += _diff;
					}
					episodeVisibilityHidden = false;
					if(episode && episode.bgMusic)
						episode.playBgMusic();
					if(episode && episode.bgSound)
						episode.resumeAmbianceMusic();
					if(episode.hasGoSound)
						episode.playSound({key:'go', force: true, loop:true, volume:.5});
				}
			}
			catch(e) {

			}
		});
		document.addEventListener("pause", () => {
			try {
				if(_gameTick)
					_lastGameTick = Date.now();
				if(_openingSound)
					_openingSound.pause();
				if(mainCharacter?.keyboard)
					mainCharacter.keyboard.holdingKeys = [];
				if(episode && episode.bgMusic)
					episode.pauseBgMusic();
				if(episode && episode.bgSound)
					episode.pauseAmbianceMusic();
				mainCharacter.stopHeartBeatSound();
				if(episode.hasGoSound)
					episode.stopGoSound();
				episodeVisibilityHidden = true;
				if (window.plugins && window.plugins.insomnia)
					window.plugins.insomnia.allowSleepAgain();
			}
			catch(e) {

			}
		});
		document.addEventListener("resume", () => {
			try{ 
				if(_lastGameTick){
					const _diff = (Date.now() - _lastGameTick);
					_extraTick += _diff;
				}
				episodeVisibilityHidden = false;
				if(episode && episode.bgMusic)
					episode.playBgMusic();
				if(episode && episode.bgSound)
					episode.resumeAmbianceMusic();
				if(episode.hasGoSound)
					episode.playSound({key:'go', force: true, loop:true, volume:.5});
				if (window.plugins && window.plugins.insomnia)
					window.plugins.insomnia.keepAwake();
			}
			catch(ex) {

			}
		});
	}
}
function openChatPage() {
	showMyModalPopUp('game-menu');
	switchBookPage(12);
}
function resetDPadKeyCommands() {
	if(!mainCharacter?.keyboard)
		return;
	if(!mainCharacter.keyboard)
		switchAutoMode();
	mainCharacter.keyboard.mouseUp('w');
	mainCharacter.keyboard.mouseUp('a');
	mainCharacter.keyboard.mouseUp('s');
	mainCharacter.keyboard.mouseUp('d');
}
function calculateSin(currentX, currentY) {
	const dx = currentX - touch_startX;
	const dy = currentY - touch_startY;
	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < deadZone) return; // ölü bölge

	const angle = Math.atan2(dy, dx) * 180 / Math.PI;

	resetDPadKeyCommands();

	if (angle >= -22.5 && angle < 22.5) {
		mainCharacter.keyboard.mouseDown('d'); // sağ
	}
	else if (angle >= 22.5 && angle < 67.5) {
		mainCharacter.keyboard.mouseDown('d');
		mainCharacter.keyboard.mouseDown('s'); // sağ-alt
	}
	else if (angle >= 67.5 && angle < 112.5) {
		mainCharacter.keyboard.mouseDown('s'); // alt
	}
	else if (angle >= 112.5 && angle < 157.5) {
		mainCharacter.keyboard.mouseDown('s');
		mainCharacter.keyboard.mouseDown('a'); // sol-alt
	}
	else if (angle >= 157.5 || angle < -157.5) {
		mainCharacter.keyboard.mouseDown('a'); // sol
	}
	else if (angle >= -157.5 && angle < -112.5) {
		mainCharacter.keyboard.mouseDown('a');
		mainCharacter.keyboard.mouseDown('w'); // sol-üst
	}
	else if (angle >= -112.5 && angle < -67.5) {
		mainCharacter.keyboard.mouseDown('w'); // üst
	}
	else if (angle >= -67.5 && angle < -22.5) {
		mainCharacter.keyboard.mouseDown('w');
		mainCharacter.keyboard.mouseDown('d'); // sağ-üst
	}
}
let deadZone, touch_startX, touch_startY;
let lastValidTouch = null;
let touchID, _touches;
let cancelRecoveryTimeout = null;

function activateTouchPad() {
	if(document.getElementById('touch-d-pad'))
		return;

	deadZone = Math.min(window.innerWidth, window.innerHeight) * 0.04;
	const _dPadWrapper = document.createElement('div');
	_dPadWrapper.id = "touch-d-pad";
	const _dPad = document.createElement('div');
	_dPad.id = "touch-d-pad-inner";
	_dPad.className = "stay";
	_gameUI.appendChild(_dPad);
	_gameUI.appendChild(_dPadWrapper);
	_dPad.style.transform = 'translate3d(0, 0, 0)';
	const _rect = {
		left: MathRound(_dPadWrapper.offsetLeft),
		width: MathRound(_dPadWrapper.offsetWidth),
		height: MathRound(_dPadWrapper.offsetHeight),
		top: MathRound(_dPadWrapper.offsetTop)
	};
	const _maxLeft = MathRound(_rect.width / 2);
	const _maxTop = _maxLeft;
	const _padding = ((document.body.clientWidth - _gamePad.clientWidth) / 2);
	const _dpadRect = document.getElementById('touch-d-pad').getBoundingClientRect();
	const _gapY = episode.cUIHeight - _dpadRect.bottom;
	const dpadRect = {
		left: _dpadRect.left - _gapY,
		right: _dpadRect.right + _gapY,
		bottom: _dpadRect.bottom + _gapY,
		top: _dpadRect.top - _gapY
	};
	const workForDPad = function (x, y) {
		if(!mainCharacter?.keyboard)
			return;
		const _newTouches = {
			x: MathRound(x - _padding),
			y: MathRound(y)
		};
		calculateSin(_newTouches.x, _newTouches.y);
		const _diffX = _newTouches.x - _touches.x;
		let _left = _dPad.lastX + _diffX;
		if (_left > _maxLeft) _left = _maxLeft;
		 else if (_left < -_maxLeft) _left = -_maxLeft;
		const _diffY = _newTouches.y - _touches.y;
		let _top = _dPad.lastY + _diffY;
		if (_top > _maxTop) 
			_top = _maxTop;
		 else if(_top  < -_maxTop) 
			_top = -_maxTop;
		if (!(_dPad.lastMoveTime > (_gameTick - __globalMS))) {
			_dPad.style.transform = `translate3d(${_left}px, ${_top}px, 0)`;
			_dPad.lastMoveTime = _gameTick;
			_dPad.lastX = _left;
			_dPad.lastY = _top;
		}

		_touches = _newTouches;
		lastValidTouch = _newTouches; // ← dokunmayı sakla
	};

	document.addEventListener('touchstart', function (_event) {
		if (mainCharacter?.disableKeyboard)
			return;

		for (let t of _event.changedTouches) {
			if (
				t.clientX >= dpadRect.left &&
				t.clientX <= dpadRect.right &&
				t.clientY >= dpadRect.top &&
				t.clientY <= dpadRect.bottom
			) {
				touchID = t.identifier;
				removeClass(_dPad, 'stay');
				_touches = {
					x: MathRound((_rect.left + (_rect.width / 2)) - _padding),
					y: MathRound((_rect.top + (_rect.height / 2)))
				};
				_dPad.lastX = _dPad.lastY = 0;
				touch_startX = _touches.x; //MathRound(t.pageX - _padding);
				touch_startY = _touches.y; // MathRound(t.pageY);
				lastValidTouch = { x: touch_startX, y: touch_startY };
				workForDPad(t.pageX, t.pageY);
			}
		}
	}, { passive: false });

	document.addEventListener('touchmove', function (_event) {
		if (mainCharacter?.disableKeyboard)
			return;
		_event.preventDefault();

		for (let t of _event.changedTouches) {
			if (t.identifier === touchID) {
				if (!_touches) {
					_touches = {
						x: MathRound(t.pageX - _padding),
						y: MathRound(t.pageY)
					};
				}
				workForDPad(t.pageX, t.pageY);
			}
		}
	}, { passive: false });

	const handleTouchEndOrCancel = function (_event, isCancel = false) {
		if (mainCharacter?.disableKeyboard)
			return;

		for (let t of _event.changedTouches) {
			if (t.identifier === touchID) {
				if (!hasClass(_dPad, 'stay'))
					addClass(_dPad, 'stay');
				_touches = touchID = undefined;
				resetDPadKeyCommands();
				_dPad.lastX = _dPad.lastY = 0;
				if (isCancel && lastValidTouch) {
					clearTimeout(cancelRecoveryTimeout);
					cancelRecoveryTimeout = setTimeout(() => {
						if (mainCharacter?.disableKeyboard) return;
						touch_startX = lastValidTouch.x;
						touch_startY = lastValidTouch.y;
						_touches = { ...lastValidTouch };
						removeClass(_dPad, 'stay');
					}, 30);
				}
			}
		}
	};

	document.addEventListener('touchend', e => handleTouchEndOrCancel(e), { passive: false });
	document.addEventListener('touchcancel', e => handleTouchEndOrCancel(e, true), { passive: false });
}

let _toastWrappers = [], _lastToastHtml;
function warn(_html, _class, _ms, _new, _buttons, _important) {
	let _toast, _toastWrapper;
	if(_toastWrappers?.find(x => x.isImportant))
		return;
	if(_lastToastHtml === _html)
		return;
	let _extraClassW = '', _extraClass = '';
	if(_html.startsWith('<')){
		const _pnl = document.createElement('div');
		_pnl.innerHTML = _html;
		const _fccl = _pnl.firstChild.classList;
		if(_fccl?.contains('achievement'))
			_extraClassW += ' achievement-wrapper';
		if(_fccl?.contains('achievement-system'))
			_extraClassW += ' achievement-system-wrapper';
		if(_fccl?.contains('achievement-red'))
		{
			_extraClassW += ' achievement-red-wrapper';
			_extraClass += ' my-achievement-red';
		}
		if(_fccl?.contains('important'))
			_extraClassW += ' important-wrapper'; 
	}
	if (!_toastWrappers.length || _new) {
		const _rand = Math.random();
		_toastWrapper = document.createElement('div');
		_toastWrapper.id = 'toast-wrapper-'+ _rand;
		_toastWrapper.className = 'toast-wrapper show-ui flex fade-start' + _extraClassW;
		_toast = document.createElement('div');
		_toast.id = 'toast';
		_toast.className = 'fade-start flex my-toast' + _extraClass;
		if (_class)
			_toast.className += (' ' + _class);
		_toastWrapper.appendChild(_toast);
		_gameUI.appendChild(_toastWrapper);
		_toastWrapper.isImportant = _important;
		_toastWrappers.push(_toastWrapper);
	}
	else {
		_toastWrapper = _toastWrappers[_toastWrappers.length - 1];
		_toastWrapper.className = 'toast-wrapper show-ui flex' + _extraClassW;
		_toast = _toastWrapper.firstElementChild;
		_toast.className = 'my-toast flex' + _extraClass;
		if (_class)
			_toast.className += (' ' + _class);
		if (_toastWrapper.timer) {
			clearTimeout(_toastWrapper.timer);
			delete  _toastWrapper.timer;
		}
	}
	_toast.innerHTML = _lastToastHtml = _html;
	if(_buttons?.[0]?.text) {
		const _btnsWrapper = document.createElement('div');
		_btnsWrapper.style.width = '100%';
		_btnsWrapper.className = 'flex';
		for(let _btn of _buttons){
			const _b = document.createElement('div');
			_b.className = 'game-btn flex';
			_b.innerText = _btn.text;
			_b.onexactclick = _btn.func;
			_btnsWrapper.appendChild(_b);
		}
		_toast.appendChild(_btnsWrapper);
	}
	if (!_toastWrapper.timer) {
		let _t = _toastWrapper, _HTML = _html;
		_toastWrapper.timer = setTimeout(function () {
			addClass(_toast, 'fade-end');
			addClass(_t, 'fade-end');
			const _tid = _t.id;
			_t.addEventListener('animationend', function() {
				try {
					if(_HTML === _lastToastHtml)
						_lastToastHtml = undefined;
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
function shine(_ms, _elem) {
	const _name = 'shine' + (_ms ? '-' + _ms.toString() : '');
	const _shine = _elem ? _elem.querySelector('#shine') : document.getElementById('shine');
	if (_shine && !_shine.shining) {
		_shine.shining = true;
		addClass(_shine, _name);
		episode.playSound({ key: 'upgrade', volume: .5, reset: true, force: true });
		_shine.onanimationend = function(event) {
			if(event.animationName === 'shine') {
				_shine.shining = false;
				removeClass(_shine, _name);
			}
		};
		return true;
	}
	return false;
}
function hasActiveActions() {
	for (let i = 0; i < actionButtons.length; i++) {
		const el = actionButtons[i];
		if (!el.classList.contains('v-none') && el.id !== 'skill9')
			return true;
	}
	return false;
}
function resetSkill(_key, _char, _num) {
	const _c = _char ?? mainCharacter;
	if(_c.skills[_key].locked)
		return false;
	resetSkills(_c?.ultimate, 1, _char, _key);
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
					const _counter = _elem?.querySelector('.counter');
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
						if(_skill.key?.endsWith('modified'))
							addClass(_elem, 'modified');
						else
							removeClass(_elem, 'modified');
						if(_elem)
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
										if(mainCharacter?.animations[_skill.key]?.before && !_ultimate)
											_elem.style = 'background-image:url(./images/main/skill-icons/' + _c.class + '/' + (_k ?? _skill.key) + '.png);background-size:contain';
									}, 200);
									_elem.swapTime = _gameTick;
								}
								else
									_elem.style = 'background-image:url(./images/main/skill-icons/' + _c.class + '/' + (_k ?? _skill.key) + '.png);background-size:contain';
							}
							else if(_skill.key !== 'tag'){
								removeClass(_elem, 'swap-skill');
								removeClass(_elem, 'swap-skill2');
								_elem.style = 'background-image:url(./images/main/skill-icons/' + _c.class + '/' + (_skill.key?.startsWith('finish') ? 'finish' : _skill.key) + '.png);background-size:contain';
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
		if(_c.main) {
			if (_characterSkill?.locked)
				addClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder ?? _skill.beforeOrder)), 'locked');
			else
				removeClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder ?? _skill.beforeOrder)), 'locked');
		}
		if(_skill.delay && !_skill.disabled && _gameTick)
			_c.startCooldown(_skill, null, 1);
	}
	if(_c.main){
		if(!_c.animations.tag) {
			const _tag = __account.characters.find(x => x.class === _c.class)?.tag;
			if(_tag) {
				const _myFr = __fragments.find(x=> x.id === _tag.id);
				const _chosenSkill = _myFr.limits.find(x =>x.grade === _tag.grade).skill;
				createTagSkill(_c, _tag);
				const preload = new Image();
				preload.src = "./images/main/" + _myFr.key + "/concept.png";
				_c.startCooldown(_tag, null, 1);
				document.getElementById('skill12').style = 'background-image:url(./images/main/skill-icons/' + _myFr.key + '/' + _chosenSkill + '.png?x=2);background-size:contain;background-position:center';
			}
			else
				addClass(document.getElementById('skill12'), 'v-none');
		}
		else
			_c.startCooldown(_c.animations.tag, null, 1);
	}
}

function createTagSkill(_char, _tag) {
	const _c = _char ?? mainCharacter;
	if(!_c)
		return;
	if(!_tag)
		_tag = __account.characters.find(x => x.class === _c.class)?.tag;
	if(!_tag)
		return;
	const _fr = __fragments.find(x => x.id === _tag.id);
	const _arr = Array.isArray(_fr.charId) ? _fr.charId : [_fr.charId];
	const _limit = _fr.limits.find(x => x.grade === _tag.grade);
	const _skill = _limit.skill;
	if(episode)
		episode.loadCharacterSprites(function() {}, _arr, ['idle', _skill]);
	_c.animations.tag = new animation({
		order:12,
		type:'skill',
		key:'tag',
		delay: true,
		cooldown:30000,
		frames: [{
			spriteWidth:0,
			spriteHeight:0,
			spriteLeft:0,
			spriteTop:0,
			speed:1,
			do: function(_e){
				_c.tagSkillUsed = _gameTick;
				createTagSkillEffect(_fr, _c);
				const _ck = _e.animations.dash.chargeKey;
				delete _e.animations.dash.chargeKey;
				_e.animate('dash', 1);
				_e.animations.dash.chargeKey = _ck;
				let _i = 0, _soundPlayed;
				for(let _id of _arr) {
					const _mob = episode.installMob({
						id: _id,
						minX: MathRound((_e.LEFT + platformX) / __zoom),
						maxX: MathRound((_e.LEFT + platformX) / __zoom),
						sight: 1000,
						count: 1,
						yPosition : _e.yPosition + (1 + (_i * 10)),
						minLevel: _e.level,
						maxLevel: _e.level
					}, null, 1);
					_mob.enemy = _mob.still = false;
					_mob.friendly = true;
					_mob.invulnerable = true;
					_mob.related = _mob.owner = _e;
					_mob.experience = 0;
					_mob.class = 'minion';
					_mob.direction = _e.direction;
					if(!_soundPlayed)
						PlaySound({ key: 'puff', volume: .3 });
					_mob.addObject({
						key: 'smoke',
						position: 'middle'
					});
					if(_limit.do)
						_limit.do(_mob.animations[_skill]);
					_mob.animations[_skill].after = function(){
						if(!_mob)
							return;
						episode.enemies?.filter(x => (x.owner ?? x.related) === _mob)?.
						forEach(x => {
							if(x.related)
								x.related = _c;
							if(x.owner)
								x.owner = _c;
						});
						_mob.atk = MathRound(_c.atk * (_limit.atk / (100 * _arr.length)));
						_mob.standBy();
						_mob.still = true;
						_mob.animations.idle.imediateBreak = false;
						_mob.animations.idle.after = function() {
							if((_gameTick - _c.tagSkillUsed) > 2000) {
								const _wrappers = document.querySelectorAll('.wrapper-3d');
								_wrappers?.forEach(x => {
									addClass(x, 'fade-out');
									x.onanimationend = function(ev) {
										if(ev.animationName === 'fade-out-me')
											x.remove();
									}
								});
							}
							if(!_mob)
								return;
							_mob.animate('idle', 1);
							_mob.release = true;
							_mob.animations.idle.after = function() {
								if(_mob)
									_mob.remove = true;
								const _wrappers = document.querySelectorAll('.wrapper-3d');
								_wrappers?.forEach(x => {
									addClass(x, 'fade-out');
									x.onanimationend = function(ev) {
										if(ev.animationName === 'fade-out-me')
											x.remove();
									}
								});
							}
						}
					},
					_mob.animate(_skill, 1);
					_i++;
					_soundPlayed = 1;
				}
			},
			def: {
				iframe: true
			}
		}]
	});
}

function createTagSkillEffect(_fr, _c) {
	const _key = _fr.key;
	const _tag = document.createElement('div');
	_tag.className = `wrapper-3d fade-me-slide-${_c?.direction === 'left' ? 'left' : 'right'}`;
	_tag.innerHTML = `<div class="tag-char-area-wrapper-outer${_c?.direction === 'left' ? ' rtl' : ''}">
				<div class="tag-char-area-wrapper" style="margin-top:5vh;top:0!important">
					<div class="page-tear-bg full">
						<div class="tag-char-area">
							<div class="tag-char-area-inner full" style="background:linear-gradient(0deg, #000000cc, ${_fr.color}, ${_fr.color}, #000000cc) !important">
								<div class="full speed-wrapper">
									<img src="./images/ui/tag/speed-no-color.gif" class="speed full" />
								</div>
							</div>
						</div>
					</div>
					<img src="./images/main/${_key}/concept.png" class="tag-char-concept" style="height:38vh;bottom:0;top:-7vh" />
					<div class="closer"></div>
				</div>
			</div>`;
	_gameUI.appendChild(_tag);
	setTimeout(() => {
		PlaySound({key:'tagimpact', volume:1});
		const _outer = document.querySelector('.tag-char-area-wrapper-outer');
		if(_outer)
			addClass(_outer, 'animate');
	}, 20);
	if(_fr.sound)
		setTimeout(() => {
			PlaySound(_fr.sound);
		}, 300);
}

function hexToFilter(hex) {
    const rgb = hex.match(/\w\w/g).map(x => parseInt(x, 16));

    // Görseli nötr hale getirmek için
    let filter = `brightness(0) saturate(100%)`;

    // rgb değerini css filter’a çözümleme (basit ama etkili)
    filter += ` invert(${(255-rgb[0])/255*100}%) sepia(${rgb[1]/255*100}%) saturate(1000%) hue-rotate(${rgb[2]}deg)`;

    return filter;
}

function generateCSSFilter(hex) {
  const rgb = hexToRgb(hex);
  const solver = new Solver(rgb);
  const result = solver.solve();
  return result.filter;
}

// Yardımcı: HEX → RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map(x => x + x).join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Algoritmanın asıl solver kısmı (uzun)
class Color {
  constructor(r, g, b) { this.r = r; this.g = g; this.b = b; }
  static fromRgb(rgb) { return new Color(rgb.r, rgb.g, rgb.b); }
  // ... burada solve için gerekli matematik fonksiyonları olacak
}

class Solver {
  constructor(target) {
    this.target = Color.fromRgb(target);
  }
  solve() {
    // Burada ~100 satırlık renk optimizasyon algoritması var
    // En son şu formatta döner:
    return {
      filter: "invert(45%) sepia(90%) saturate(750%) hue-rotate(120deg) brightness(95%) contrast(90%)"
    };
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
	if (_c.isDead() && __story?.bonus !== 'exp')
		return;
	if (!_c.main && !_levelup)
		_value = MathRound(_value * .8);
	if (_value)
		_c.experience += MathRound(_value);
	if (_c.experience >= _c.maxExperience) {
		_c.level++;
		_c.experience -= _c.maxExperience;
		_c.maxExperience = MathRound(_c.maxExperience * 1.2);
		updateExperience(0, 1, _c, _noWarn);
		return;
	}
	if (_levelup) {
		_c.setHealth(_c.MAXHP);
		const _level = document.getElementById('level-' + _c.key);
		if(_level)
			_level.innerText = _c.level;
		if(episode?.menu) {
			const _lvl = document.getElementById('main-level-count');
			if(_lvl)
				_lvl.innerText = _c.level;
		}
		if (_c.main) {
			if(!_noWarn && (_c.level === __pvp.unlockLevel)) {
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="flex:1">' + getLangData('Pvp Content Unlocked') + '</span></div>', null, null, 1);
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="flex:1">' + getLangData('Rage Mode Activated') + '</span></div>', null, null, 1);
			}
			if(!_noWarn && !episode?.menu){
				warn('<div class="flex leveling"><img style="height:14vh" src="./images/icons/level-up.png" /></div>', 'level-up');
				episode.playSound({ key: 'levelup', volume: .5 });
			}
			updateGlobalQuest('level-up');
			if(!_noWarn && !episode?.menu)
				dmgFrames.push({
					text: 'level-up',
					//class: 'effect-gain level-up-pop',
					x: mainCharacter.LEFT,
					y: _canvas.height - mainCharacter.yPosition - mainCharacter.HEIGHT
				});
			episode.reset();
			checkUpdateAvailable2();
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
		resetSkills(_c?.ultimate, null, _c);
	}
	if (_c.main)
		_mainExpBar.style.width = MathRound((100 * _c.experience) / _c.maxExperience) + '%';
	_client.upgradeExperience(_c);
}
var episodeGold = 0, episodePot = 0, episodeVisibilityHidden;
function updateGold(_value, _char) {
	if(__storyPlaying && !episode.menu)
	{
		episodeGold += _value;
		return;
	}
	_goldCount = document.getElementById('main-gold-count');
	const _c = _char ?? mainCharacter;
	updateGlobalQuest('gain-gold', _value);
	__account.gold += _value;
	if (_c.main) {
		episode.playSound({ key: 'coin', volume: .1 });
		if(_goldCount)
			_goldCount.innerText = __account.gold.formatWithDots();
	}
	checkUpdateAvailable2();
	_client.saveState();
}
function updateFragment(_key, _count) {
	const _newfr = __account.fragments.find(x => x.key === _key);
	if(_newfr)
		_newfr.count += _count;
	else
		__account.fragments.push({key:_key, grade:0, count:_count});
	checkUpdateAvailable2();
	_client.saveState();
}
function updateGem(_type, _grade, _count) {
	_count = _count ?? 1;
	if(_count < 1)
		_count = 1;
	_grade = _grade ?? 1;
	if(_type === 'random') {
		const _gem = __gems[getRandomValue2(0, __gems.length - 1)];
		_type = _gem.key;
	}
	const _current = __account.gems.find(x => x.key === _type && x.grade === _grade);
	if(_current)
		_current.count += _count;
	else
		__account.gems.push({key:_type, count:_count, grade:_grade });
	checkUpdateAvailable2();
	_client.saveState();
	return {
		type: _type,
		count: _count,
		grade: _grade
	}
}
function updateTicket(_value) {
	if(!_value)
		_value = 1;
	const _ticketText = document.getElementById('main-ticket-count');
	__account.storyTicket += _value;
	if(_ticketText)
		_ticketText.innerText = __account.storyTicket > 999 ? '999+' : __account.storyTicket;
	checkUpdateAvailable2();
	_client.saveState(1);
}
function updateMisc(_misc) {
	const _m = __account.misc.find(x => x.type === _misc.type && x.grade === _misc.grade);
	if(!_m)
		__account.misc.push({type:_misc.type, count: _misc.count, grade: _misc.grade });
	else
		_m.count += _misc.count;
	checkUpdateAvailable2();
	_client.saveState();
}
function updatePot(_value, _update, _turnGold) {
	_potCount = document.getElementById('main-pot-count');
	let _warn, _more;
	if (_value > 9) {
		_warn = 1;
		//warn('<span>' + getLangData('You can not carry more pots') + '</span>', 'warn');
		_value = 9;
	}
	let _pot = __account.pots.find(x => x.key === 'pot');
	if (((_pot?.value ?? 0) + _value + episodePot) > 9) {
		_more = ((_pot?.value ?? 0) + _value + episodePot) - 9;
		_warn = 1;
		if(_more > 0 && _turnGold) {
			updateGold(_more * 100);
			_warn = undefined;
		}
		_value = 9 - (_pot?.value ?? 0) - episodePot;
	}
	if (_value <= 0)
		return false;
	else if(_warn) {
		warn('<span>' + getLangData('You can not carry more pots') + '</span>', 'warn');
		return false;
	}
	else {
		if(!__storyPlaying) {
			if (_pot)
				_pot.value += _value;
			else{
				__account.pots.push({ key: 'pot', value: _value });
				_pot = __account.pots.find(x => x.key === 'pot');
			}
		}
		else
			episodePot += _value;
	}
	if(_potCount)
		_potCount.innerText = (_pot?.value ?? 0) + episodePot;
	_client.saveState(_update);
	const _potText =  document.getElementById('main-pot-count-menu');
	if(_potText)
		_potText.innerText = (_pot?.value ?? 0) + episodePot;
	return true;
}
function removeHitCount(_char) {
	if (!_char || _char.main) {
		addClass(_hitCount, 'v-none');
		removeClass(_hitCount, 'minimize');
	}
	(_char ?? mainCharacter).lastHitDate = undefined;
	(_char ?? mainCharacter).hitCount = 0;
}

function switchAutoMode(_off) {
	if(_off && mainCharacter?.keyboard)
		return;
	const _a = document.getElementById('auto-mode-on-off');
	if(mainCharacter?.keyboard && !_off) {
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
	_scr.onexactclick = deactivatePowerSaveMode;
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
					<div style="color:#f7f7f7cc !important;height:90% !important;font-size:3vh !important" class="game-btn2 flex one-line" onexactclick="closeGameOverModal();reviveAtLobby()">${getLangData('Go To Village')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;height:90% !important;font-size:3vh !important" class="game-btn2 flex one-line" onexactclick="closeGameOverModal();reviveHere()">${getLangData('Revive Here')}</div>
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
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line" onexactclick="closeUserActionsModal();openChatPage();selectPersonFromBigChat('${_id}','${_name}')">${getLangData('Send Message')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line" onexactclick="closeUserActionsModal()">${getLangData('Duel Request')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line${_isFriend ? ' d-none' : ''}" onexactclick="addAsFriend('${_id}','${_name}');openUserActionsModal('${_id}','${_name}')">${getLangData('Add Friend')}</div>
					<div style="color:#f7f7f7cc !important;font-size:3vh !important" class="game-btn2 flex one-line${!_isFriend ? ' d-none' : ''}" onexactclick="removeFromFriend('${_id}','${_name}');openUserActionsModal('${_id}','${_name}')">${getLangData('Remove Friend')}</div>
				</div>
				<div onexactclick="closeUserActionsModal()" class="user-actions-close">&times;</div>`;
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
			<div onexactclick="switchTipsUI(-1)" style="height:100%;width:10vh;z-index:5" class="flex flex-jc-end">
				<img style="transform: scale(-1,1) !important;max-height:8vh;max-width:8vh" src="./images/icons/nav.png" />
			</div>
			<div class="flex" style="height:100%;width:calc(100% - 20vh)">
				${getLangData('How to play tips')}
			</div>
			<div onexactclick="switchTipsUI(1)" style="height:100%;width:10vh;z-index:5" class="flex flex-jc-start">
				<img style="max-height:8vh;max-width:8vh" src="./images/icons/nav.png" />
			</div>
		</div>
	</div>`;
}

function renderComingSoonContent(_content) {
	return `<div class="full flex">
	 	<span style="text-align:center;color:#f7f7f7cc!important;font-size:3vh!important;font-weight:600"><span style="color:#ff6c00 !important">[${getLangData(_content)}]</span><br/>${getLangData('Coming Soon')}</span>
	</div>`;
}
function renderLockedContent(_requirement) {
	return `<div class="full flex">
	 	<span style="text-align:center;color:#f7f7f7cc!important;font-size:3vh!important"><span style="color:#ff6c00 !important">[${getLangData('Content Is Locked')}]</span><br/>${getLangData(_requirement)}</span>
	 </div>`;
}
function askSomething(_question, _okFuncString) {
	try	{
		event.preventDefault();
		event.stopPropagation();
	}
	catch(ex) {}
	try {
		let _modal = `<div class="full fade-me flex inventory-question">
			<div class="inventory-modal">
				<div style="padding:4vh 2vh" class="flex">
					<span class="flex" style="color:#f7f7f7dd !important;font-size:3vh !important">` + getLangData(_question) + `?</span>
				</div>
				<div style="padding:4vh 2vh" class="flex">
					<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onexactclick="${_okFuncString}">${getLangData('YES')}</div>
					<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
				</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		const _mu = document.querySelector('#menu-ui');
		(_mu ?? _gameUI).appendChild(_div.querySelector('.inventory-question'));
		episode.playSound({ key: 'click' });
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
				<div class="show-info-close flex" onexactclick="closeInventoryQuestionModal()">&times;</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		document.querySelector('#menu-ui').appendChild(_div.querySelector('.inventory-question'));
		episode.playSound({ key: 'click' });
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
				_div2.onexactclick = _n.func;
			_container.appendChild(_div2);
		}
	}
	catch(qex) {
		alert(qex.message);
	}
}

const __injectedModules = [];

function injectModule(_name, _func) {
	// if(document.head.querySelector('script[data-name=' + _name + ']'))
	// 	return;
	if(__injectedModules.indexOf(_name) !== -1) {
		if(_func)
			_func();
		return;
	}
	__injectedModules.push(_name);
	const _ver = Math.random();
	let scriptEle = document.createElement("script");
	scriptEle.setAttribute('data-name', _name);
	scriptEle.setAttribute("src", "./js/" + _name + ".js?x=" + _ver);
	let styleEle = document.createElement("style");
	styleEle.setAttribute('data-name', _name);
	// styleEle.setAttribute("href", "./js/" + _name + ".css?x=" + _ver);
	// styleEle.setAttribute('rel', 'stylesheet');
	// styleEle.type = "text/css";
	// styleEle.media = "all";
	let _installedCount = 0;
	// styleEle.addEventListener("load", () => {
	// 	_installedCount++;
	// 	if(_installedCount > 1 && _func)
	// 		setTimeout(function(){_func([scriptEle, styleEle], _name);}, 10);
	// });
	// styleEle.addEventListener("error", (e) => {
	// 	alert(JSON.stringify(e));
	// 	alert(e.message);
	// });
	fetch("./css/" + _name + ".css?x=" + _ver)
	.then(resp => resp.text())
	.then(cssText => {
		_installedCount++;
		const styleEl = document.createElement('style');
		styleEl.textContent = cssText;
		document.head.appendChild(styleEl);
		if(_installedCount > 1 &&_func)
			setTimeout(function(){_func([scriptEle, styleEle], _name);}, 10);
	})
	.catch(err => console.error('CSS yüklenemedi:', err));
	document.head.appendChild(scriptEle);
	document.head.appendChild(styleEle);
	scriptEle.addEventListener("load", () => {
		_installedCount++;
		if(_installedCount > 1 &&_func)
			setTimeout(function(){_func([scriptEle, styleEle], _name);}, 10);
	});
	scriptEle.addEventListener("error", (e) => {
		alert(JSON.stringify(e));
		alert(e.message);
	});
}

function removeModule(_name) {
	const _i = __injectedModules.findIndex(x => x === _name);
	if(_i >= 0)
		__injectedModules.splice(_i, 1);
	document.head.querySelectorAll(`script[data-name="${_name}"], style[data-name="${_name}"]`)
        ?.forEach(x => x.remove());
	const _module = window.installedModules?.find(x => x.name === _name);
	if(_module?.ref){
		delete _module.ref;
		window.installedModules.splice(window.installedModules.findIndex(x => x.name === _name),1);
	}
	return;
	const _insts = document.head.querySelectorAll('script[data-name=' + _name + '],link[data-name=' + _name + ']');
	if(_insts?.[0])
		_insts.forEach(x => x.remove());
}