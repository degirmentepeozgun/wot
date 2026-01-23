'use strict';
const pvpAvatarTemplate = function (char, _name) {
	const _oldAvatar = document.getElementById('char-' + char.key);
	if (_oldAvatar)
		_oldAvatar.remove();
	const _class = char.main ? ' war-player-profile-me' : ' war-player-profile';
	return `<div${char.main ? '' : ' onexactclick="episode.focusOnPlayer(\'' + char.key + '\')"'} class="flex war-player-card profile${_class}" id="char-${char.key}">
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
	let _html = `<div style="margin-top:0 !important;cursor:pointer;position:relative;width:20.2vw;aspect-ratio:101/59;height:auto!important" ${char.main ? 'onexactclick="if(episode.id > 99 || __story) { return; } showMyModalPopUp(\'game-menu\');switchBookPage(1)" ' : 'onexactclick="switchCharacter(null,null,null,1)"'}class="profile${_class}" id="char-${char.key}">
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
						<span class="character-name-text" style="color:#E2DFD2;font-weight:600;font-size:1.4vw !important;text-shadow:.25vh .25vh .5vh #000">${char?.main ? (__account.name === '' ? getLangData('Player') + ' ' + __account.id.substring(0,4).toUpperCase() : __account.name) ?? char.name : char?.displayName ?? char?.name}</span>
					</div>
					<div style="position:relative;margin-top:2%;height:16%;background:#FFFFFF99;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:95%;overflow:hidden">
						<div class="full healthvalue" style="position:absolute;background:#880808;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:${100 * (char.health / char.MAXHP)}%">
						</div>
						<div class="full healthvalue" style="position:absolute;background:#0818A8;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%); width:${100 * (char.health / char.MAXHP)}%">
						</div>
					</div>
					<div style="width:68%;height:10%;background:#FFFFFF99;clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%);overflow:hidden">
						<div class="full defbar-value" style="background:#BF40BF;clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)"></div>
					</div>
					<div class="buffs flex flex-jc-start" style="padding:.4vw .8vw"></div>
				</div>
			</div>
			<img class="move-up d-none" src="./images/icons/upgrade.png" style="-webkit-filter:drop-shadow(0 0 .3vh #fff);filter:drop-shadow(0 0 .3vh #fff);z-index:2;position:absolute;width:1.8vw;left:.8vw" />
			<img class="aid${episode?.pvp || char.main || char.isDead() || char.health >= char.MAXHP ? ' v-none' : ''}" id="aid-${char.key}" onexactclick="drinkPot(episode.enemies.find(x => x.key === '${char.key}'), mainCharacter, event)" src="./images/icons/aid.png" />`
			if(char.main && char.heartCount > 1) {
				_html += `<img src='./images/icons/heart.png' id='heartcount1' />
					<img${char.heartCount > 1 ? '' : ' class="gray"'} src='./images/icons/heart.png' id='heartcount2' />
					<img${char.heartCount > 2 ? '' : ' class="gray"'} src='./images/icons/heart.png' id='heartcount3' />`;
			}
		return _html + '</div>';
}
function addDmgFrame(_item) {
	if(dmgFrames?.[0]){
		let _found;
		for(let df of dmgFrames)
			if(df.from === _item.from && df.startTime > (_gameTick - 100)) {
				if(_item.item?.key && df.item?.key === _item.item.key && 
					(!_item.val || _item.val === df.val))
					_found = 1;
				else if(_item.val && df.val === _item.val && df.crit === _item.crit)
					_found = 1;
				else if(_item.text && df.text === _item.text)
					_found = 1;
				if(_found) {
					df.startTime = _gameTick;
					df.t = 0;
					return;
				}
			}
	}
	_item.startTime = _gameTick;
	dmgFrames.push(_item);
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
					if(_frame.heavy || _frame.crit)
						_frame.pop = {
							strength: getRandomValue2(101, 131) / 100, // heavy hit buradan ayarlanır
							overshoot: getRandomValue2(105, 110) / 100,                   // ne kadar fazla şişsin
							duration: getRandomValue2(5,6),                       // kaç frame sürecek
							t: 0
						};
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

function getDmgFrameNumbers2(_frame) {
	let _r = [], _type = '', _text = _frame.val?.toString() ?? '';
	switch(_frame.atkType) {
		case 'common':
			_type = 'dmg';
			break;
		case 'toxic':
		case 'fire': 
		case 'ice': 
		case 'shadow': 
		case 'lightning': 
			_type = _frame.atkType;
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
	if(_frame.img)
		_r.push(getImage(`./images/icons/power-up.png`));
	for(var i = 0; i < _text.length; i++)
		_r.push(getImage(`./images/frames/${_type === '' ? '' : _type + '/'}${_text.charAt(i)}.png`));
	return _r;
}


function renderTextElement2(_settings) {
	if(_settings.images?.[0]){
		let _l = _settings.x, i = 0, _settingsY = (_settings.frame.maxStepY - _settings.frame.totalStepY);
		for(let _sprite of _settings.images)
			if(_sprite) {
				const _sim = _sprite.img ?? _sprite;
				const _spriteHeight = MathRound((episode.dmgFrameHeight) * _settings.frame.zoom);
				const _y =  _settings.frame.startY - 
				(_settings.frame.zoom > 1  ? 0 : MathRound(_settingsY * 
				((_spriteHeight / _settings.frame.stepY))));
				if(_y < episode.dmgFrameTopBoundary){
					_settings.frame.remove = true;
					return;
				}
				const _spriteWidth = (_sim.width *  _spriteHeight) / _sim.height;
				if(_settings.images.find(x => x.img))
					console.log(_sim.height);
				let _sWidth = _spriteWidth;//  MathRound(_spriteWidth * _settings.frame.zoom);
				episode.offDmgCtx.drawImage(_sim, 
					(_l + (_settings.frame.platformX - platformX)) - MathRound(i * (_spriteHeight / 5)) - MathRound((_sWidth - _spriteWidth) / 2),
					_y, _sWidth, _spriteHeight);
				_l += _spriteWidth;
				i++;
			}
		if (_settings.frame.zoom > 1) {
			if (!_settings.frame.start)
				_settings.frame.start = 0;
			if(_settings.frame.pop) {
				const pop = _settings.frame.pop;
				if (_settings.frame.start < pop.duration) {
					if (pop && pop.t < (pop.duration / 2)) {
						const p = pop.t / pop.duration;

						//const max = pop.strength;
						// let ease;
						// if (p < 0.3) {
						// 	ease = 1 + (max - 1) * (p / 0.3);
						// } else {
						// 	const q = (p - 0.3) / 0.7;
						// 	ease = max - (max - 1) * q;
						// }
						const ease = 1 + (pop.strength - 1) * (1 - Math.pow(1 - p, 2));

						_settings.frame.zoom = _settings.frame.startZoom * ease;
						pop.t++;
					}
					else {
						// eski davranışın aynısı
						//_settings.frame.zoom -= (_settings.frame.startZoom - 1) / 2;
						_settings.frame.zoom += (1 - _settings.frame.zoom) * 0.35;
					}
				}
				else if (_settings.frame.start === pop.duration)
					_settings.frame.zoom = 1;
			}
			else {
				if(_settings.frame.start === 2)
					_settings.frame.zoom -= (_settings.frame.startZoom - 1) / 2;
				else if (_settings.frame.start === 4)
					_settings.frame.zoom = 1;
			}
			_settings.frame.start++;
		}
		else {
			//_settings.frame.totalStepY--;
			// POP bitmeden yukarı çıkma çok yavaş
			if (_settings.frame.heavy || _settings.frame.crit) {
				_settings.frame.totalStepY -= .75;
			} else {
				_settings.frame.totalStepY--;
			}
			
		}
		if (_settings.frame.totalStepY <= 0)
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
					if(_openingSound){
						_openingSound.pause();
						_openingSound.currentTime = 0;
					}
					blurKeyboard();
					if(episode && episode.bgMusic)
						episode.pauseBgMusic();
					if(episode && episode.bgSound)
						episode.pauseAmbianceMusic();
					if(__weather?.sound)
						__weather.sound.pause();
					mainCharacter.stopHeartBeatSound();
					mainCharacter.stopStepSound();
        			SoundManager.suspend();
					pauseQuestTimer();
					if(episode.hasGoSound)
						episode.stopGoSound();	
					episodeVisibilityHidden = _closeOpeningMusic = true;
				} else {
					_gameTick = Date.now();
					reconnectSocket();
					if(_lastGameTick){
						const _diff = (Date.now() - _lastGameTick);
						if(episode?.enemies?.[0])
							episode.enemies.forEach(x => {
								for(let _an in x.animations) {
									const _anm = x.animations[_an];
									if(_anm.coolDownStart2)
										_anm.coolDownStart2 += _diff;
								}
							});
					}
					organizeModules();
					episodeVisibilityHidden = false;
					if(episode && episode.bgMusic)
						episode.playBgMusic();
					if(episode && episode.bgSound)
						episode.resumeAmbianceMusic();
					if(__weather?.sound)
						__weather.sound.play();
					if(episode.hasGoSound)
						PlaySound({key:'go', force: true, loop:true, volume:.5});
        			SoundManager.resume();
					resumeQuestTimer();

					window.SoundManager.warmAudio();
				}
			}
			catch(e) {

			}
		});
		document.addEventListener("pause", () => {
			try {
				if(_gameTick)
					_lastGameTick = Date.now();
				if(_openingSound){
					_openingSound.pause();
					_openingSound.currentTime = 0;
				}
				blurKeyboard();
				if(episode && episode.bgMusic)
					episode.pauseBgMusic();
				if(episode && episode.bgSound)
					episode.pauseAmbianceMusic();
				if(__weather?.sound)
					__weather.sound.pause();
				mainCharacter.stopHeartBeatSound();
				mainCharacter.stopStepSound();
				if(episode.hasGoSound)
					episode.stopGoSound();
        		SoundManager.suspend();
				pauseQuestTimer();
				episodeVisibilityHidden = _closeOpeningMusic = true;
				if (window.plugins && window.plugins.insomnia)
					window.plugins.insomnia.allowSleepAgain();
			}
			catch(e) {

			}
		});
		document.addEventListener("resume", () => {
			try{ 
				_gameTick = Date.now();
				organizeModules();
				reconnectSocket();
				if(_lastGameTick){
					const _diff = (Date.now() - _lastGameTick);
					if(episode?.enemies?.[0])
							episode.enemies.forEach(x => {
								for(let _an in x.animations) {
									const _anm = x.animations[_an];
									if(_anm.coolDownStart2)
										_anm.coolDownStart2 += _diff;
								}
							});
				}
				episodeVisibilityHidden = false;
				if(episode && episode.bgMusic)
					episode.playBgMusic();
				if(episode && episode.bgSound)
					episode.resumeAmbianceMusic();
				if(__weather?.sound)
					__weather.sound.play();
				if(episode.hasGoSound)
					PlaySound({key:'go', force: true, loop:true, volume:.5});
				if (window.plugins && window.plugins.insomnia)
					window.plugins.insomnia.keepAwake();
        		SoundManager.resume();
				resumeQuestTimer();
				window.SoundManager.warmAudio();
			}
			catch(ex) {

			}
		});
	}
	const icons = __holoMenuItems.map(m => `./images/ui/menu-icons/${m.icon}.png`);
  
	icons.forEach(src => {
		const link = document.createElement("link");
		link.rel = "preload";
		link.as = "image";
		link.href = src;
		document.head.appendChild(link);
	});
	organizeScreenResize();
}
function openChatPage() {
	showMyModalPopUp('game-menu');
	switchBookPage(12);
}

let _toastWrappers = [], _lastToastHtml;
function warn(_html, _class, _ms, _new, _buttons, _important, _container) {
	if(mainCharacter?.tagContainer)
		return;
	const _hasButton = _buttons?.[0]?.text;
	let _toast, _toastWrapper;
	if(_toastWrappers?.find(x => x.isImportant))
		return;
	if(_toastWrappers?.[0]){
		_toastWrappers.forEach(tw => {
			if((tw.showTime + tw.showMS) < _gameTick){
				tw.remove();
				tw.removed = true;
			}
		});
		_toastWrappers = _toastWrappers.filter(x => !x.removed) ?? [];
	}
	if(!_toastWrappers.length)
		_lastToastHtml = null;
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
	let _MS = (_ms ?? 1800) + 500;
	if (!_toastWrappers.length || _new) {
		const _rand = Math.random();
		_toastWrapper = document.createElement('div');
		_toastWrapper.id = 'toast-wrapper-'+ _rand;
		_toastWrapper.className = 'toast-wrapper' + (_class === 'warn' ? ' toast-with-warning' : '') + (_hasButton ? ' need-action' : '') + ' show-ui flex fade-start' + _extraClassW;
		_toast = document.createElement('div');
		_toast.id = 'toast';
		_toast.className = 'fade-start flex my-toast' + _extraClass;
		if (_class)
			_toast.className += (' ' + _class);
		_toastWrapper.appendChild(_toast);
		(_container ?? _gameUI).appendChild(_toastWrapper);
		_toastWrapper.isImportant = _important;
		_toastWrapper.showTime = _gameTick;
		_toastWrapper.showMS = _MS;
		_toastWrappers.push(_toastWrapper);
	}
	else {
		_toastWrapper = _toastWrappers[_toastWrappers.length - 1];
		_toastWrapper.className = 'toast-wrapper' + (_hasButton ? ' need-action' : '') + ' show-ui flex' + _extraClassW;
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
	let _t = _toastWrapper, _HTML = _html;
	const _tid = _t.id;
	const closeToast = function() {
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
	}
	if(_hasButton) {
		const _btnsWrapper = document.createElement('div');
		_btnsWrapper.style.width = '100%';
		_btnsWrapper.className = 'flex';
		for(let _btn of _buttons){
			const _b = document.createElement('div');
			_b.className = 'game-btn flex';
			_b.innerText = _btn.text;
			_b.onclick = function() {
				_btn.func();
				closeToast();
			}
			_btnsWrapper.appendChild(_b);
		}
		_toast.appendChild(_btnsWrapper);
	}
	if (!_toastWrapper.timer) {
		_toastWrapper.timer = setTimeout(function () {
			if(!_t)
				return;
			addClass(_toast, 'fade-end');
			addClass(_t, 'fade-end');
			_t.addEventListener('animationend', function() {
				closeToast();
			}, false);
		}, _MS);
	}
}
function shine(_ms, _elem) {
	addUpgradeEffect();
	return true;
	const _name = 'shine' + (_ms ? '-' + _ms.toString() : '');
	const _shine = _elem ? _elem.querySelector('#shine') : document.getElementById('shine');
	if (_shine && !_shine.shining) {
		_shine.shining = true;
		addClass(_shine, _name);
		PlaySound({ key: 'upgrade', volume: .5, reset: true, force: true });
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
	if(_c.skills?.[_key]?.locked)
		return false;
	resetSkills(_c?.ultimate, 1, _char, _key);
	return true;
}
function forceResetSkills(_char) {
	resetSkills(null,null,_char,null,null,1);
}
function resetSkills(_ultimate, _keepCD, _char, _k, _endOfRage, _force) {
	const _c = _char ?? mainCharacter;
	const _animations = _c.animations;
	const _keys = _k ? [_k] : Object.keys(_animations);
	for (var _key of _keys) {
		const _skill = _animations[_key];
		if(_c.ultimateUsed && _skill.delay)
			continue;
		if (_skill.next)
			_skill.next = _skill.realNext;
		const _characterSkill = _c.skills[_skill.key];
		if (_characterSkill?.unlockLevel)
			_characterSkill.locked = _c.level < _characterSkill.unlockLevel;
		if (!_skill.ultimate) {
			if (_skill.finishingMove && !_c.hasFinishingMove)
				_c.hasFinishingMove = true;
			if(_endOfRage && _skill.key === 'tag')
				continue;
			if ((!_keepCD && !_k && !_skill.chain && !_skill.maxCharge) || _force) {
				if (_skill.coolDownLeft != undefined)
					_skill.coolDownLeft = _force ? 1 : undefined;
				if (_skill.coolDownStart2 != undefined)
					_skill.coolDownStart2 = undefined;
			}
			if (!(_c.ultimate || _ultimate) && _skill.skillOrder && !_k)
				continue;
			if (!_skill?.order && !_skill?.skillOrder && !_k && !_force)
				continue;
			else {
				if (_c.main) {
					const _elem = (_force && _skill.chainOrder) ? document.getElementById('chain-skill-' + _skill.chainOrder)
					: document.getElementById('skill' + (_skill.order ?? _skill.skillOrder ?? _skill.beforeOrder));
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
				if(!_client.quickPlay)
					_c.startCooldown(_tag, null, 1);
				const _ts = document.getElementById('skill12');
				_ts.style = 'background-image:url(./images/main/skill-icons/' + _myFr.key + '/' + _chosenSkill + '.png?x=2);background-size:contain;background-position:center';
				removeClass(_ts, 'v-none');
			}
			else{
				const _ts = document.getElementById('skill12');
				//addClass(_ts, 'v-none');
				addClass(_ts, 'bgless');
			}
		}
		else if(!_ultimate && _c.animations.tag.delay)
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
	_c.tagLeft = getTagSkillNode(_fr, __left);
	_c.tagRight = getTagSkillNode(_fr, __right);
	PlaySound({key:'tagimpact', volume:.001, force: true});
	if(_fr.sound)
		PlaySound({key:_fr.sound.key, volume:.001, force: true});
	const _arr = Array.isArray(_fr.charId) ? _fr.charId : [_fr.charId];
	const _limit = _fr.limits.find(x => x.grade === _tag.grade);
	const _skill = _limit.skill;
	if(episode){
		episode.loadCharacterSprites(function() {}, _arr, ['idle', _skill], 1);
	  	const _src = './images/main/' + _fr.key + '/concept.png';
		if(!episode.tagUrls)
			episode.tagUrls = [];
		if(episode.tagUrls.indexOf(_fr.key) === -1) {
			episode.tagUrls.push(_fr.key);
			const link = document.createElement("link");
			link.rel = "preload";
			link.as = "image";
			link.href = _src;
			document.head.appendChild(link);
		}
	}
	_c.animations.tag = new animation({
		order:12,
		type:'skill',
		key:'tag',
		delay: !_client.quickPlay,
		useInCC: true,
		cooldown:30000,
		frames: [{
			spriteWidth:0,
			spriteHeight:0,
			spriteLeft:0,
			spriteTop:0,
			speed:1,
			do: function(_e){
				_c.immobilize = _c.still = false;
				_c.tagSkillUsed = _gameTick;
				createTagSkillEffect(_fr, _c);
				const _ck = _e.animations.dash.chargeKey;
				delete _e.animations.dash.chargeKey;
				_e.animate('dash', 1);
				_e.animations.dash.chargeKey = _ck;
				const _dir = _e.direction;
				requestAnimationFrame(() => {
					let _i = 0;
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
						_mob.updateVariables();
						if(!episode.tagWarmed) {
							episode.tagWarmed = 1;
							_mob.warm = 1;
						}
						_mob.enemy = _mob.still = false;
						_mob.friendly = _mob.invulnerable = _mob.puppetMode = _mob.alp = true;
						_mob.puppetXMove = 0;
						_mob.related = _mob.owner = _e;
						_mob.experience = 0;
						_mob.class = 'minion';
						_mob.direction = _dir;
						if(_c.animations.tag.modify)
							_c.animations.tag.modify(_mob);
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
								if(!_mob)
									return;
								_mob.animate('idle', 1);
								_mob.release = true;
								_mob.animations.idle.after = function() {
									if(_mob)
										_mob.remove = true;
								}
							}
						},
						//_mob.setAutoMode(0, 1);
						_mob.autoMode = 0;
						_mob.animation = _skill;
						_mob.frame = _mob.start = 0;
						//_mob.animate(_skill, 1);
						_i++;
					}
				});
			},
			def: {
				iframe: true
			}
		}]
	});
}

function getTagSkillNode(_fr, _dir) {
	const _key = _fr.key;
	const _tag = document.createElement('div');
	_tag.className = `wrapper-3d fade-me-slide-${_dir === __left ? __left : __right}`;
	_tag.innerHTML = `<div class="tag-char-area-wrapper-outer${_dir === __left ? ' rtl' : ''}">
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
	return _tag;
}

function createTagSkillEffect(_fr, _c) {
	const _tag = (_c.direction === __left ? _c.tagLeft : _c.tagRight).cloneNode(true);
	_gameUI.appendChild(_tag);
	if(_c.tagContainer)
		_c.tagContainer.remove();
	_c.tagContainer = _tag;
	PlaySound({key:'tagimpact', volume:1, reset: true});
	const _outer = _tag?.firstChild;
	if(_outer)
		addClass(_outer, 'animate');
	if(_fr.sound)
		setTimeout(() => {
			_fr.sound.reset = true;
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
function updateLevelUI(_c) {
	if(!_c)
		return;
	const _level = document.getElementById('level-' + _c.key);
	if(_level)
		_level.innerText = _c.level;
	if(episode?.menu) {
		const _lvl = document.getElementById('main-level-count');
		if(_lvl)
			_lvl.innerText = _c.level;
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
		updateLevelUI(_c);
		if (_c.main) {
			if(!_noWarn && !_client.quickPlay && (_c.level === __pvp.unlockLevel)) {
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/duel.png" />&nbsp;<span style="flex:1">' + getLangData('Pvp Content Unlocked') + '</span></div>', null, null, 1);
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/rage.png" />&nbsp;<span style="flex:1">' + getLangData('Rage Mode Activated') + '</span></div>', null, null, 1);
			}
			if(!_noWarn && !episode?.menu){
				//warn('<div class="flex leveling"><img style="height:14vh" src="./images/icons/level-up.png" /></div>', 'level-up');
				PlaySound({ key: 'levelup', volume: .5 });
			}
			updateGlobalQuest('level-up');
			if(!_noWarn && !episode?.menu)
				addDmgFrame({
					text: 'level-up',
					from:mainCharacter.key,
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
					warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/ui/menu-icons/skill.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('New skill unlocked') + '!</span></div>', null, null, 1);
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
		PlaySound({ key: 'coin', volume: .1 });
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
const __maxPotCount = 9;
function updatePot(_value, _update, _turnGold) {
	_potCount = document.getElementById('main-pot-count');
	let _warn, _more;
	if (_value > __maxPotCount) {
		_warn = 1;
		//warn('<span>' + getLangData('You can not carry more pots') + '</span>', 'warn');
		_value = __maxPotCount;
	}
	let _pot = __account.pots.find(x => x.key === 'pot');
	if (((_pot?.value ?? 0) + _value + episodePot) > __maxPotCount) {
		_more = ((_pot?.value ?? 0) + _value + episodePot) - __maxPotCount;
		_warn = 1;
		if(_more > 0 && _turnGold) {
			updateGold(_more * 100);
			_warn = undefined;
		}
		_value = __maxPotCount - (_pot?.value ?? 0) - episodePot;
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
	if(mainCharacter?.keyboard && !_off) {
		mainCharacter.keyboard = undefined;
		mainCharacter.enemy = true;
		mainCharacter.setAutoMode(2, 1);
		mainCharacter.enemy = false;
		mainCharacter.sight = 1000;
	}
	else {
		setKeyBoard(mainCharacter);
		mainCharacter.autoMode = mainCharacter.realAutoMode = mainCharacter.sight = mainCharacter.autoTarget = undefined;
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
	playClick();
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
	playClick();
	const _i = __account.friends?.findIndex(x => x.id === _id);
	if(_i >= 0) {
		__account.friends.splice(_i, 1);
		_client.saveState();
	}
}
function playClick() {
	PlaySound({key:'click', reset: true});
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
function askSomething(_question, _okFuncString, _singletonAttr, _container) {
	try	{
		event.preventDefault();
		event.stopPropagation();
	}
	catch(ex) {}
	try {
		if(_storySceneSwitching || __switchingMap)
			return;
		if(_singletonAttr) {
			const _que = document.querySelector('.inventory-question[data-singleton-key="' + _singletonAttr + '"]');
			if(_que)
				return;
		}
		const _addQuestionMark = !(_question.endsWith('>') || _question.endsWith('?'));
		let _modal = `<div${_singletonAttr ? " data-singleton-key='" + _singletonAttr + "'" : ""} class="full fade-me show-ui flex inventory-question">
			<div class="inventory-modal">
				<div style="padding:4vh 2vh" class="flex">
					<span class="flex" style="color:#f7f7f7dd !important;font-size:3vh !important">` + getLangData(_question) + `${_addQuestionMark ? '?' : ''}</span>
				</div>
				<div style="padding:4vh 2vh" class="flex">
					<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
					<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onexactclick="${_okFuncString}">${getLangData('YES')}</div>
				</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		const _mu = _container ?? document.querySelector('#menu-ui');
		(_mu ?? _gameUI).appendChild(_div.querySelector('.inventory-question'));
		playClick();
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
		playClick();
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

/**
 * Modül yükleyici
 * @param {string} _name - modül adı
 * @param {function} _func - modül yüklendiğinde çağrılacak callback
 * @param {boolean} _reload - true ise eksik modül yeniden yüklenir
 */
function injectModule(_name, _func, _reload) {
	const _oldModule = __injectedModules.find(x => x.name === _name);

	// Eğer zaten tam yüklüyse
	if (_oldModule && _oldModule.jsLoaded && _oldModule.cssLoaded) {
		if (_func) {
			const scriptRef = document.querySelector(`script[data-name="${_name}"]`);
			const styleRef = document.querySelector(`style[data-name="${_name}"]`);
			_func([scriptRef, styleRef], _name);
		}
		return;
	}

	// Hâlihazırda yükleniyor ama reload değilse bekle
	if (_oldModule && !_reload) return;

	// Mevcut modül objesini koru veya oluştur
	const _module = _oldModule ?? { name: _name, do: _func, jsLoaded: 0, cssLoaded: 0 };
	if (!_oldModule) __injectedModules.push(_module);

	const _ver = Math.random();
	let _installedCount = (_module.jsLoaded ?? 0) + (_module.cssLoaded ?? 0);

	let scriptEl = document.querySelector(`script[data-name="${_name}"]`);
	let styleEl = document.querySelector(`style[data-name="${_name}"]`);

	// CSS yükleme
	if (!_module.cssLoaded) {
		fetch(`./css/${_name}.css?x=${_ver}`)
			.then(resp => resp.text())
			.then(cssText => {
				_module.cssLoaded = 1;
				_installedCount++;

				// Eski varsa temizle
				if (styleEl) styleEl.remove();

				styleEl = document.createElement("style");
				styleEl.textContent = cssText;
				styleEl.dataset.name = _name;
				document.head.appendChild(styleEl);

				if (_installedCount > 1 && _func)
					setTimeout(() => _func([scriptEl, styleEl], _name), 10);
			})
			.catch(err => console.error("[injectModule] CSS yüklenemedi:", err));
	}

	// JS yükleme
	if (!_module.jsLoaded) {
		if (scriptEl) scriptEl.remove();

		scriptEl = document.createElement("script");
		scriptEl.setAttribute("data-name", _name);
		scriptEl.src = `./js/${_name}.js?x=${_ver}`;
		document.head.appendChild(scriptEl);

		scriptEl.addEventListener("load", () => {
			_module.jsLoaded = 1;
			_installedCount++;
			if (_installedCount > 1 && _func)
				setTimeout(() => _func([scriptEl, styleEl], _name), 10);
		});

		scriptEl.addEventListener("error", e => {
			console.error("[injectModule] JS yüklenemedi:", e.message);
		});
	}
}

/**
 * Eksik modülleri yeniden yükle
 */
function organizeModules() {
	setTimeout(() => {
		for (let _m of __injectedModules) {
			// Modülün tag’leri var ama callback çalışmamış olabilir
			const hasScript = document.querySelector(`script[data-name="${_m.name}"]`);
			const hasStyle = document.querySelector(`style[data-name="${_m.name}"]`);
			
			// Eğer tag var ama jsLoaded/cssLoaded flag false ise, 
			// muhtemelen load event kaçtı => yeniden başlat
			if (!_m.jsLoaded || !_m.cssLoaded || !hasScript || !hasStyle) {
				console.warn("Modül yeniden yükleniyor:", _m.name);
				injectModule(_m.name, _m.do, true);
			}
		}
	}, 100);
}
function detachModule() {
	const _keys = Object.keys(__latestUIModule);
	if(_keys?.[0]) {
		try {
			for(let _k of _keys){
				const refs = document.querySelectorAll('*[data-module="' + _k + '"]');
				if(refs?.[0])
					refs.forEach(x => x.remove());
				const _arr = __latestUIModule[_k]?.data;
				if(_arr?.[0])
					for(let i = _arr.length - 1; i >= 0;  i--)
						_arr[i].remove();
				removeModule(_k);
				delete __latestUIModule[_k];
			}
		}
		catch(_lumex) { }
	}
}
function removeModule(_name) {
	const _i = __injectedModules.findIndex(x => x.name === _name);
	if(_i >= 0)
		__injectedModules.splice(_i, 1);
	document.head.querySelectorAll(`script[data-name="${_name}"], style[data-name="${_name}"]`)
        ?.forEach(x => x.remove());
	// const _module = window.installedModules?.find(x => x.name === _name);
	// if(_module?.ref){
	// 	delete _module.ref;
	// 	window.installedModules.splice(window.installedModules.findIndex(x => x.name === _name),1);
	// }
}

// function applyComputedStylesDeep(sourceEl, targetEl) {
//     // 1) source element’in computed style’larını al
//     const computed = getComputedStyle(sourceEl);

//     // 2) target element’in inline style’ına yaz
//     for (let prop of computed) {
//         targetEl.style.setProperty(prop, computed.getPropertyValue(prop));
//     }

//     // 3) Çocukları recursive eşleştir
//     const sourceChildren = sourceEl.children;
//     const targetChildren = targetEl.children;

//     for (let i = 0; i < sourceChildren.length; i++) {
//         applyComputedStylesDeep(sourceChildren[i], targetChildren[i]);
//     }
// }
/**
 * Inline'a: sourceElement'e şu anda uygulanan tüm CSS kurallarını kopyalar.
 * - performans için sadece gerçekten MATCH eden selector'ları işler.
 * - rule.style içindeki yalnızca tanımlı deklarasyonları target'a yazar (priority ile).
 * - media/supports vs. iç içe kuralları da iterate eder.
 */
// cache for parsed rules to avoid repeated heavy parsing
const __RULE_CACHE = {
  flatRules: null,   // array of {selectorText, style, ownerSheetHref}
  lastSheetsCount: 0
};

function _buildFlatRuleList() {
  // If stylesheet count unchanged and cache exists, reuse
  const sheets = Array.from(document.styleSheets);
  if (__RULE_CACHE.flatRules && __RULE_CACHE.lastSheetsCount === sheets.length) {
    return __RULE_CACHE.flatRules;
  }

  const flat = [];

  function processRules(rules, ownerHref) {
    for (const rule of rules) {
      try {
        if (rule.type === CSSRule.STYLE_RULE) {
          // store minimal necessary info
          flat.push({
            selectorText: rule.selectorText,
            style: rule.style,
            owner: ownerHref || null
          });
        } else if (rule.cssRules && rule.cssRules.length) {
          // MEDIA / SUPPORTS etc -> recurse
          processRules(rule.cssRules, ownerHref);
        }
      } catch (e) {
        // ignore weird/invalid rules
        continue;
      }
    }
  }

  for (const sheet of sheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      // CORS-protected sheet -> skip but record as null owner
      continue;
    }
    if (!rules) continue;
    processRules(rules, sheet.href || null);
  }

  __RULE_CACHE.flatRules = flat;
  __RULE_CACHE.lastSheetsCount = sheets.length;
  return flat;
}

/**
 * Copy all CSS declarations from rules that actually match sourceEl,
 * apply them inline to targetEl, BUT do not override existing inline props on targetEl.
 * Returns stats object.
 */
// function applyAppliedRulesPreserveInline(sourceEl, targetEl, options = {}) {
//   // options:
//   //  - skipPseudo: true/false (default false)  -> we ignore ::before/::after rules in selector matching
//   //  - debug: true/false
//   const skipPseudo = !!options.skipPseudo;
//   const debug = !!options.debug;

//   const flatRules = _buildFlatRuleList();

//   let matchedRules = 0;
//   let appliedProps = 0;
//   let skippedPropsBecauseInline = 0;
//   const skippedSheets = new Set();

//   // quick lookup for target's existing inline properties -> don't overwrite these
//   const targetInline = {};
//   for (let i = 0; i < targetEl.style.length; i++) {
//     const p = targetEl.style[i];
//     if (p) targetInline[p] = true;
//   }

//   // Also collect source's inline properties (we'll apply them if not present on target)
//   const sourceInline = {};
//   for (let i = 0; i < sourceEl.style.length; i++) {
//     const p = sourceEl.style[i];
//     if (p) sourceInline[p] = {
//       value: sourceEl.style.getPropertyValue(p),
//       priority: sourceEl.style.getPropertyPriority(p)
//     };
//   }

//   // iterate flat rules and test selectors
//   for (const r of flatRules) {
//     const selectorText = r.selectorText;
//     if (!selectorText) continue;

//     // split multiple selectors in a rule
//     const selectors = selectorText.split(",").map(s => s.trim());
//     let ruleMatches = false;

//     for (const sel of selectors) {
//       if (!sel) continue;
//       if (skipPseudo && sel.includes("::")) continue;

//       // safe matches check
//       try {
//         if (sourceEl.matches(sel)) {
//           ruleMatches = true;
//           break;
//         }
//       } catch (e) {
//         // invalid selector for matches() -> skip
//         continue;
//       }
//     }

//     if (!ruleMatches) continue;

//     // this rule applies to sourceEl in its original context
//     matchedRules++;

//     const style = r.style;
//     for (let i = 0; i < style.length; i++) {
//       const prop = style[i];
//       const val = style.getPropertyValue(prop);
//       const pr  = style.getPropertyPriority(prop); // 'important' if present

//       // do not override target's pre-existing inline properties
//       if (targetInline[prop]) {
//         skippedPropsBecauseInline++;
//         continue;
//       }

//       try {
//         targetEl.style.setProperty(prop, val, pr);
//         appliedProps++;
//       } catch (e) {
//         // some properties might be invalid to set inline -> ignore
//       }
//     }
//   }

//   // Finally: apply source's inline styles (since they are author's explicit)
//   for (const prop in sourceInline) {
//     if (!Object.prototype.hasOwnProperty.call(targetInline, prop)) {
//       // set only if target didn't already have that inline prop
//       try {
//         targetEl.style.setProperty(prop, sourceInline[prop].value, sourceInline[prop].priority);
//         appliedProps++;
//       } catch (e) {}
//     } else {
//       skippedPropsBecauseInline++;
//     }
//   }

//   if (debug) {
//     console.log('[applyAppliedRulesPreserveInline] matchedRules', matchedRules,
//                 'appliedProps', appliedProps,
//                 'skippedInline', skippedPropsBecauseInline);
//   }

//   return { matchedRules, appliedProps, skippedPropsBecauseInline };
// }
// ---------- OPTIMIZED VERSION ----------
 const DEFAULT_WHITELIST = [
    "display","position","z-index","top","left","right","bottom",
    "width","height","min-width","min-height","max-width","max-height",
    "flex","flex-direction","align-items","justify-content","gap",
    "padding","margin","box-shadow","border","border-radius",
    "background","background-image","background-color","color",
    "font-size","font-family","line-height","white-space",
    "transform","transform-origin","filter","backdrop-filter",
    "opacity","pointer-events"
  ];
function applyAppliedRulesPreserveInlineFast(sourceEl, targetEl, options = {}) {
  const skipPseudo = !!options.skipPseudo;
  const debug = !!options.debug;
  // minimal whitelist - ihtiyaca göre genişlet
 
  const whitelist = Array.isArray(options.whitelist) ? options.whitelist : DEFAULT_WHITELIST;

  const flatRules = _buildFlatRuleList(); // reuse your cached flat list
  let matchedRules = 0, appliedProps = 0, skippedPropsBecauseInline = 0;

  // quick lookup of target inline properties (do not override)
  const targetInline = {};
  for (let i = 0; i < targetEl.style.length; i++) {
    const p = targetEl.style[i];
    if (p) targetInline[p] = true;
  }

  // source inline props (to apply later if not present on target)
  const sourceInline = {};
  for (let i = 0; i < sourceEl.style.length; i++) {
    const p = sourceEl.style[i];
    if (p) sourceInline[p] = {
      value: sourceEl.style.getPropertyValue(p),
      priority: sourceEl.style.getPropertyPriority(p)
    };
  }

  // build small token set to prefilter rules (class names, id, tag)
  const tokens = new Set();
  const tag = sourceEl.tagName && sourceEl.tagName.toLowerCase();
  if (tag) tokens.add(tag);
  if (sourceEl.id) tokens.add("#" + sourceEl.id);
  for (const c of sourceEl.classList) tokens.add("." + c);

  // prefilter rules by string inclusion of any token - much cheaper than matches()
  const candidateRules = [];
  for (const r of flatRules) {
    const s = (r.selectorText || "").toLowerCase();
    // if rule has pseudo and skipPseudo true, skip
    if (skipPseudo && s.includes("::")) continue;

    // quick accept if selectorText contains any token
    let ok = false;
    for (const t of tokens) {
      if (s.includes(t)) { ok = true; break; }
    }
    // also accept if selector is generic (contains tag or '.' or '#') - fallback to include,
    // but to avoid scanning everything, require at least one of tokens OR the selector contains the full class names
    if (!ok) {
      // cheap heuristic: if selector uses attributes or universal selectors, ignore (rare)
      continue;
    }
    candidateRules.push(r);
  }

  // if no candidates (very unlikely), fall back to small subset of flatRules to avoid empty
  const rulesToCheck = candidateRules.length ? candidateRules : flatRules.slice(0, 200);

  // now test matches only on candidates
  for (const r of rulesToCheck) {
    const selectorText = r.selectorText;
    if (!selectorText) continue;

    const selectors = selectorText.split(",").map(s => s.trim());
    let ruleMatches = false;
    for (const sel of selectors) {
      if (!sel) continue;
      if (skipPseudo && sel.includes("::")) continue;

      try {
        if (sourceEl.matches(sel)) { ruleMatches = true; break; }
      } catch (e) {
        continue;
      }
    }
    if (!ruleMatches) continue;

    matchedRules++;
    const style = r.style;
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      // whitelist check (fast) - skip non-essential props
      if (whitelist && whitelist.length && !whitelist.includes(prop)) continue;

      const val = style.getPropertyValue(prop);
      const pr  = style.getPropertyPriority(prop);

      // don't override target inline
      if (targetInline[prop]) { skippedPropsBecauseInline++; continue; }

      // skip if target already has same computed inline string (avoid reflow)
      try {
        const cur = targetEl.style.getPropertyValue(prop) || "";
        const curPr = targetEl.style.getPropertyPriority(prop) || "";
        if (cur === val && curPr === pr) continue;
      } catch(e){}

      try {
        targetEl.style.setProperty(prop, val, pr);
        appliedProps++;
      } catch (e) {
        // ignore invalid props
      }
    }
  }

  // finally apply source inline props if target doesn't have them
  for (const prop in sourceInline) {
    if (!Object.prototype.hasOwnProperty.call(targetInline, prop)) {
      try {
        targetEl.style.setProperty(prop, sourceInline[prop].value, sourceInline[prop].priority);
        appliedProps++;
      } catch(e){}
    } else {
      skippedPropsBecauseInline++;
    }
  }

  return { matchedRules, appliedProps, skippedPropsBecauseInline, candidates: rulesToCheck.length };
}


function addUpgradeEffect() {

  const _area   = document.querySelector('.shine-area');
  if(!_area) return;

  const target  = _area.parentNode;
  const _item   = target.firstElementChild;
  if(!_item) return;

  /* RESET + TRIGGER ITEM */
  removeClass(_item,'shining-item');
  void _item.offsetWidth;
  addClass(_item,'shining-item');

  const rect = _item.getBoundingClientRect();

  /* OVERLAY */
  const overlay = document.createElement("div");
  overlay.className = 'upgrade-overlay';

  /* GHOST WRAP */
  const ghostWrap = document.createElement("div");
  ghostWrap.className = "ghost-wrap active-shine";
  Object.assign(ghostWrap.style,{
    position: "fixed",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    zIndex: 9999,
    pointerEvents: "none",
    "--angle": "0deg",
    opacity: 1,
    transition: "1s"
  });

  /* CLONE */
  const ghost = _item.cloneNode(true);
  applyAppliedRulesPreserveInlineFast(_item, ghost);

  Object.assign(ghost.style, {
    width: "100%",
    height: "100%",
    margin: 0,
    pointerEvents: "none",
    transform: "scale(1)",
    transition: "transform .4s cubic-bezier(.2,.8,.3,1.2)"
  });

  /* GLOW LAYER */
  const glow = document.createElement("div");
  Object.assign(glow.style, {
    position: "absolute",
    inset: "-0.7vh",
    boxShadow: `
  0 0 1vh rgba(255, 240, 200, 0.9),
  0 0 4vh rgba(255, 210, 120, 0.75),
  0 0 8vh rgba(255, 170, 40, 0.55),
  0 0 14vh rgba(255, 160, 0, 0.35),
  inset 0 0 4vh rgba(255, 240, 200, 0.65),
  inset 0 0 2vh rgba(255, 255, 255, 0.25)
    `,
    opacity: "1",
    pointerEvents: "none",
    transition: "opacity 1s ease"
  });
	ghostWrap.style.transformOrigin = "center center";
	ghost.style.transformOrigin = "center center";
	/* APPEND ORDER */
	ghostWrap.appendChild(ghost);
	ghostWrap.appendChild(glow);
	document.body.appendChild(overlay);
	document.body.appendChild(ghostWrap);

ghostWrap.style.setProperty("--angle", "360deg"); 

// 2 FRAME BEKLET → 0ms START
ghostWrap.style.transition = "none";
glow.style.transition = "none";
overlay.style.transition = "none";
ghost.style.transition = "none";
	addClass(ghost, 'fade-me-300');
requestAnimationFrame(() => {
	addClass(ghost, 'shining-item');
        // ghostWrap.animate(
        //   [{ "--angle": "360deg" }, { "--angle": "0deg" }],
        //   { duration: 1000, easing: "linear" }
        // );
		const _rAngle = getRandomValue2(0,20);
		ghostWrap.animate(
		[
			{ "--angle": _rAngle + "deg" },
			{ "--angle": (_rAngle + 240) + "deg" }  // 1.33 tur
		],
		{ duration: 1000, easing: "cubic-bezier(.3,.9,.3,1)" }
		);
    requestAnimationFrame(() => {
		ghostWrap.style.animation = "micro-wiggle 90ms 2 linear";
  		PlaySound({ key: 'upgrade', volume: .5, reset: true, force: true });
		ghostWrap.style.transition = "0.2s ease";
		glow.style.transition       = "0.3s ease";
		overlay.style.transition    = "0.3s ease";
		ghost.style.transition      = "0.25s ease";
    });
});
  /* SCALE UP */
    ghost.style.transform = "scale(1)";
  requestAnimationFrame(() => {
    ghost.style.transform = "scale(1.03)";
  });

  /* RETURN */
  setTimeout(() => {
    ghost.style.transform = "scale(1)";
    glow.style.opacity = "0";
    ghostWrap.style.opacity = "0";
    overlay.style.opacity = "0";
  }, 400);

  /* CLEAN */
  setTimeout(() => {
    overlay.remove();
    ghostWrap.remove();
  	removeClass(_item,'shining-item');
  }, 1000);

}
function organizeScreenResize() {
	let oldWidth = _gamePad.offsetWidth;

	function resizeCanvas() {
		setWindowVariables();
		if(episode)
			episode.resize();
		if(mainCharacter){
			_store.minPosX = -1 * MathRound((mainCharacter.width / 2) * __zoom);
			_store.maxPosX = _canvas.width - MathRound((mainCharacter.width / 2) * __zoom);
		}
		const newWidth = _gamePad.offsetWidth;

		// Oran hesapla
		const scaleX = newWidth / oldWidth;

		// Pozisyonları ölçekle
		platformX *= scaleX;
		if(episode)
			episode.enemies?.forEach(x => {
				if(x.platformX)
					x.platformX *= scaleX;
				const _ol = x.left;
				x.left *= scaleX;
				console.log(_ol + ' ' + x.left);
				x.yPosition *= scaleX;
				x.updateVariables();
				if(x.relatedObjects?.[0])
					x.relatedObjects.forEach(y => {
				 		y.remove = true;
					});
			});
		prevPlatformX = undefined;

		oldWidth = newWidth;
	}

	window.addEventListener("resize", resizeCanvas);
}

function setWindowVariables() {
	const __r = document.querySelector(':root');
		//const __rs = getComputedStyle(__r);
	
	_canvas.width = _canvas1.width = _canvasB.width = _canvasGore.width = _canvasSPB.width = _canvas3.width = _canvas5.width = 
	_canvasF.width = _canvasS.width = _canvasDMG.width = _canvasR.width = MathRound(_gamePad.offsetWidth / __scale);
	const root = document.querySelector(':root');
	root.style.setProperty('--scale', __scale);
	root.style.setProperty('--canvas-width', (_canvas.width * __scale)+ "px");

	document.getElementById('game-pad-left').style.width =
	document.getElementById('game-pad-right').style.width =
	'calc((100vw - ' + (_canvas.width * __scale) + 'px) / 2)';
	_canvas.height = _canvasDMG.height = _canvasB.height = _canvas3.height = _canvasGore.height = _canvas5.height = 
	_canvasS.height = _canvasSPB.height = _canvasF.height = _canvasR.height = MathRound(_gamePad.offsetHeight / __scale);
	
	__zoom = _canvas.width / 2048;
	__dmgFrameDistance = MathRound(100 * __zoom);
	groundheight = MathRound(200 * __zoom);
	idealground_height = groundheight;
	_canvas1.height = _canvas.height - getGroundHeight();
	__r.style.setProperty('--ground-height', getGroundHeight() + 'px');
	__r.style.setProperty('--use-progress-time', ((2 / __scale) * (165 / getGroundHeight())) + 's');
	centerMinX = MathFloor(_canvas.width * 0.36);
	centerMaxX = MathFloor(_canvas.width * 0.64);
}