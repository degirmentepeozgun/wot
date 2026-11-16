'use strict';
const pvpAvatarTemplate = function (char, _name) {
	const _oldAvatar = document.getElementById('char-' + char.key);
	if (_oldAvatar)
		_oldAvatar.remove();
	const _class = char.main ? ' war-player-profile-me' : ' war-player-profile';
	let _slot = '';
	if(!char.main && episode?.playerTag) {
		const _sign = episode.playerTag(char);
		const _src = _sign === episode.p1Sign ? 'p1-sign' : (_sign === episode.p2Sign ? 'p2-sign' : '');
		if(_src)
			_slot = `<img class="war-player-slot" src="./images/icons/${_src}.png" />`;
	}
	return `<div${char.main ? '' : ' onexactclick="episode.focusOnPlayer(\'' + char.key + '\')"'} class="flex war-player-card profile${_class}" id="char-${char.key}">
				<div class='war-player-card-left flex'>
					<div class='flex war-player-card-left-content war-player-team-${char.teamId}'><img src="./images/icons/${char.class}.png" /></div>
					${_slot}
				</div>
				<div class='war-player-card-right flex flex-jc-start'>
					<div class="hp-war-player-name">
						<div class="one-line wot-title">
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
					<div class="buffs flex flex-jc-start" style="padding:.4cqw .8cqw"></div>
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
					<div class="buffs flex flex-jc-start" style="padding:.4cqw .8cqw"></div>
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
	let _html = `<div ${char.main ? 'onexactclick="if(episode.id > 99 || __story) { return; } showMyModalPopUp(\'game-menu\');switchBookPage(1)" ' : 'onexactclick="switchCharacter(null,null,null,1)"'}class="hb-frame-wrapper profile${_class}" id="char-${char.key}">
			<img src='./images/ui/game/hb2.png' class='full hb-frame' />
			<div class="full flex hb-frame-inner">
				<div class="hb-frame-inner-left">
					<div class="hb-frame-inner-left-inner">
						<div class="full flex hb-frame-inner-left-inner-top" style="background:radial-gradient(circle at center, ${char.color}, black)">
							<span id="level-${char.key}" class="wot-title character-level-text">${char.level ?? 1}</span>
						</div>
						<div class="hb-frame-inner-left-inner-bottom ${!char.main && char.switchTime ? 'switch-character-cooldown' : 'd-none'}"></div>
					</div>
				</div>
				<div class="hb-frame-inner-right">
					<div class="flex flex-ai-start flex-jc-start hb-frame-inner-right-top">
						<span class="character-name-text hb-frame-inner-right-top-inner font-player-name wot-title">${char?.main ? (__account.name === '' ? getLangData('Player') + ' ' + __account.id.substring(0,4).toUpperCase() : __account.name) ?? char.name : char?.displayName ?? char?.name}</span>
					</div>
					<div class="hb-frame-inner-right-middle">
						<div class="full healthvalue hb-frame-inner-right-middle-top" style="width:${100 * (char.health / char.MAXHP)}%">
						</div>
						<div class="full healthvalue hb-frame-inner-right-middle-bottom" style="width:${100 * (char.health / char.MAXHP)}%">
						</div>
					</div>
					<div class="hb-frame-inner-right-bottom">
						<div class="full defbar-value hb-frame-inner-right-bottom-inner"></div>
					</div>
					<div class="buffs flex flex-jc-start" style="padding:.4cqw .8cqw"></div>
				</div>
			</div>
			<img class="move-up d-none" src="./images/icons/upgrade.png" style="-webkit-filter:drop-shadow(0 0 .3cqh #fff);filter:drop-shadow(0 0 .3cqh #fff);z-index:2;position:absolute;width:1.8cqw;left:.8cqw" />
			<img class="aid${episode?.pvp || char.main || char.isDead() || char.health >= char.MAXHP ? ' v-none' : ''}" id="aid-${char.key}" onexactclick="drinkPot(episode.enemies.find(x => x.key === '${char.key}'), mainCharacter, event)" src="./images/icons/aid.png" />`
			if(char.main && char.heartCount > 1) {
				_html += `<img src='./images/icons/heart.png' id='heartcount1' style="display:none" />
					<img${char.heartCount > 1 ? '' : ' class="gray"'} style="display:none" src='./images/icons/heart.png' id='heartcount2' />
					<img${char.heartCount > 2 ? '' : ' class="gray"'} style="display:none" src='./images/icons/heart.png' id='heartcount3' />`;
			}
		return _html + '</div>';
}
function bootDmgFrame(_item) {
	if(_item.val)
		_item.val = MathCeil(_item.val);
	_item.platformX = platformX;
	_item.startY = _item.y;
	_item.age = 0;
	_item.baseZoom = _item.zoom > 0 ? _item.zoom : 1;
	const textOnly = _item.text && !_item.val;
	const crit = !!_item.crit && !textOnly;
	const big = crit || (_item.heavy && !textOnly);
	const h = episode?.cHeight || 640;
	_item.life = textOnly || _item.item ? 16 : (crit ? 36 : (big ? 22 : 18));
	_item.rise = MathRound(h * (textOnly || _item.item ? 0.07 : (crit ? 0.2 : (big ? 0.13 : 0.11))));
	_item.popLen = crit ? 9 : 6;
	_item.popStrength = textOnly || _item.item ? 1.08 : (crit ? 1.85 : (big ? 1.28 : 1.12));
	_item.popSettle = crit ? 1.28 : 1;
	const w = episode?.cWidth || 1;
	let sign = 1;
	if(_item.dir === __left)
		sign = -1;
	else if(_item.dir !== __right)
		sign = getRandomValue2(0, 1) === 0 ? -1 : 1;
	let fan = 0;
	const near = w * 0.04;
	if(!textOnly) {
		for(let i = 0; i < dmgFrames.length; i++) {
			const o = dmgFrames[i];
			if(!o || o.remove)
				continue;
			if((_gameTick - o.startTime) > 420)
				continue;
			const dx = o.x - _item.x;
			if(dx > near || dx < -near)
				continue;
			fan++;
			if(fan >= 4)
				break;
		}
	}
	const kick = textOnly ? getRandomValue2(4, 8) : getRandomValue2(10, 18);
	_item.drift = sign * w * (kick + fan * 12) * 0.001;
	if(crit)
		_item.drift *= 1.4;
	applyDmgDepth(_item);
	_item.rise = MathRound(_item.rise * _item.depthScale);
}
function applyDmgDepth(_item) {
	const attackerY = _item.from?.yPosition;
	const victimY = _item.hitY;
	const ground = getGroundHeight() || 1;
	let depth = 1;
	let behind = 0;
	if(attackerY === attackerY && victimY === victimY) {
		const span = ground * 0.28;
		behind = (victimY - attackerY) / (span > 0 ? span : 1);
		if(behind < 0)
			behind = 0;
		else if(behind > 1)
			behind = 1;
		depth = 1 - (victimY / ground);
		if(depth < 0)
			depth = 0;
		else if(depth > 1)
			depth = 1;
	}
	_item.depth = depth;
	_item.depthScale = 1 - behind * 0.28;
	_item.depthDark = 1 - behind * 0.62;
}
function addDmgFrame(_item) {
	if(episode?.noDamageFrame)
		return;
	if(_item.text && !_item.val) {
		for(let i = 0; i < dmgFrames.length; i++) {
			const df = dmgFrames[i];
			if(!df.remove && df.text === _item.text) {
				df.age = 0;
				df.x = _item.x;
				df.y = _item.y;
				df.startY = _item.y;
				df.platformX = platformX;
				df.startTime = _gameTick;
				applyDmgDepth(df);
				return;
			}
		}
	}
	_item.startTime = _gameTick;
	bootDmgFrame(_item);
	let alive = 0, oldest;
	for(let i = 0; i < dmgFrames.length; i++) {
		const df = dmgFrames[i];
		if(df.remove)
			continue;
		alive++;
		if(!oldest || df.startTime < oldest.startTime)
			oldest = df;
	}
	const cap = (episode?.seenEnemies?.length || 0) < 10 ? 6 : 7;
	if(alive >= cap && oldest) {
		let drop = oldest;
		if(_item.crit) {
			for(let i = 0; i < dmgFrames.length; i++) {
				const df = dmgFrames[i];
				if(df.remove || df.crit)
					continue;
				if(!drop || drop.crit || df.startTime < drop.startTime)
					drop = df;
			}
		}
		drop.remove = true;
	}
	let at = dmgFrames.length;
	if(!_item.crit) {
		for(let i = 0; i < dmgFrames.length; i++) {
			if((dmgFrames[i].depth ?? 1) > _item.depth) {
				at = i;
				break;
			}
		}
	}
	dmgFrames.splice(at, 0, _item);
}
var lastDmgFrameRenderTime;
function drawDmgFrames() {
	let w = 0;
	for(let i = 0; i < dmgFrames.length; i++) {
		if(!dmgFrames[i].remove)
			dmgFrames[w++] = dmgFrames[i];
	}
	dmgFrames.length = w;
	if(!w) {
		if(!cDMG.cleared)
			cDMG.clearRect(0, 0, episode.cWidth, episode.cHeight);
		return;
	}
	cDMG.clearRect(0, 0, episode.cWidth, episode.cHeight);
	episode.offDmgCtx.clearRect(0, 0, episode.cWidth, episode.cHeight);
	cDMG.cleared = 1;
	for(let i = 0; i < w; i++)
		renderText(dmgFrames[i]);
	cDMG.drawImage(episode.offDmgCanvas, 0, 0);
	cDMG.cleared = 0;
	lastDmgFrameRenderTime = _gameTick;
}
function renderText(_frame) {
	if(_frame.buff) {
		_frame.remove = true;
		return;
	}
	if(!_frame.val && !_frame.steal && !_frame.text && !_frame.buff) {
		_frame.remove = true;
		return;
	}
	renderTextElement2({
		x: _frame.x,
		frame: _frame,
		from: _frame.from,
		images: getDmgFrameNumbers2(_frame)
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
			if(_frame.text) {
				const t = _frame.text;
				let digits = t.length > 0;
				for(let i = 0; i < t.length; i++) {
					const c = t.charCodeAt(i);
					if(c < 48 || c > 57) {
						digits = false;
						break;
					}
				}
				if(digits) {
					const out = [];
					for(let i = 0; i < t.length; i++)
						out.push(getImage('./images/frames/' + t.charAt(i) + '.png'));
					return out;
				}
				return [getImage('./images/frames/' + t + '.png')];
			}
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


function dmgFrameZoom(_frame) {
	const len = _frame.popLen || 6;
	const age = _frame.age || 0;
	const strength = _frame.popStrength || 1;
	const base = _frame.baseZoom || 1;
	const settle = _frame.popSettle || 1;
	if(age >= len || strength <= 1)
		return base * settle;
	if(_frame.crit) {
		const peakAt = len * 0.28;
		if(age <= peakAt) {
			const p = age / peakAt;
			const e = 1 - (1 - p) * (1 - p);
			return base * (1 + (strength - 1) * e);
		}
		const p = (age - peakAt) / (len - peakAt);
		return base * (strength + (settle - strength) * p * p);
	}
	const half = len * 0.5;
	if(age < half)
		return base * (1 + (strength - 1) * (age / half));
	return base * (strength + (1 - strength) * ((age - half) / half));
}
function renderTextElement2(_settings) {
	const frame = _settings.frame;
	const images = _settings.images;
	if(!images?.[0]) {
		frame.remove = true;
		return;
	}
	const life = frame.life || 18;
	let t = (frame.age || 0) / life;
	if(t > 1)
		t = 1;
	const inv = 1 - t;
	const y = frame.startY - frame.rise * (1 - inv * inv);
	let alpha = t < 0.65 ? 1 : inv / 0.35;
	if(y < episode.dmgFrameTopBoundary) {
		const fadeBand = (episode.cHeight || 1) * 0.045;
		alpha *= Math.max(0, 1 - (episode.dmgFrameTopBoundary - y) / fadeBand);
		if(alpha <= 0.02) {
			frame.remove = true;
			return;
		}
	}
	const driftT = t < 0.4 ? t / 0.4 : 1;
	let x = _settings.x + frame.drift * (1 - (1 - driftT) * (1 - driftT)) + (frame.platformX - platformX);
	const depthScale = (frame.depthScale || 1) * 0.82;
	const zoom = dmgFrameZoom(frame) * depthScale;
	const height = MathRound(episode.dmgFrameHeight * zoom);
	const rest = (frame.baseZoom || 1) * (frame.popSettle || 1);
	const baseH = MathRound(episode.dmgFrameHeight * rest * depthScale);
	const yDraw = y - (height - baseH) * 0.5;
	const ctx = episode.offDmgCtx;
	let dark = frame.depthDark == null ? 1 : frame.depthDark;
	if(frame.crit)
		dark *= 1.45;
	if(dark > 1.35)
		dark = 1.35;
	ctx.globalAlpha = alpha;
	if(dark !== 1)
		ctx.filter = 'brightness(' + dark + ')';
	let i = 0;
	for(let sprite of images) {
		if(!sprite) {
			i++;
			continue;
		}
		const scale = frame.scale ?? 1;
		const sim = sprite.img ?? sprite;
		if(!sim.width || !sim.height) {
			i++;
			continue;
		}
		const spriteHeight = height * scale;
		const spriteWidth = ((sim.width * height) / sim.height) * scale;
		ctx.drawImage(sim,
			x - MathRound(i * (spriteHeight / 5)),
			yDraw, spriteWidth, spriteHeight);
		x += spriteWidth;
		i++;
	}
	ctx.filter = 'none';
	ctx.globalAlpha = 1;
	if(_settings.from?.hitStop)
		return;
	frame.age++;
	if(frame.age >= life)
		frame.remove = true;
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
	removeClass(document.getElementById('wrapper'), 'scrollcontent');
	if(_keyboardHeight) {
		placeChatAboveKeyboard();
		return;
	}
	_menuShift = 0;
	_keyboardInput = null;
	const _panel = document.getElementById('menu-ui');
	if(_panel)
		_panel.style.transform = '';
	fitWrapperParent();
}
let _lastGameTick;
function loadUI() {
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
		initialHeight = window.visualViewport?.height ?? window.innerHeight;
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
	setNativeMethods();
}
function setNativeMethods() {
	window.platformAPI = {
		share(text, base64) {
			if (window.AndroidBridge?.share)
				return window.AndroidBridge.share(text, base64);
			if (window.electronAPI?.share)
				return window.electronAPI.share(text, base64);
			//console.log("share fallback");
		}
	};
}
function loadWindowEvents() {
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
		document.addEventListener("visibilitychange", () => {
			try 
				{
					if (document.hidden || document.visibilityState === 'hidden') {
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
					if(episode?.hasGoSound)
						episode.stopGoSound();	
					episodeVisibilityHidden = _closeOpeningMusic = true;
					if(window.__duelBgTimer)
						clearInterval(window.__duelBgTimer);
					window.__duelBgAt = Date.now();
					window.__duelBgTimer = setInterval(function() {
						if(typeof stepDuelBotsHidden === 'function')
							stepDuelBotsHidden();
					}, 50);
				} else {
					if(window.__duelBgTimer) {
						clearInterval(window.__duelBgTimer);
						window.__duelBgTimer = 0;
					}
					_gameTick = Date.now();
					reconnectSocket();
					if(_lastGameTick && !episode?.realTime){
						const _diff = (Date.now() - _lastGameTick);
						if(episode?.enemies?.[0])
							episode.enemies.forEach(x => {
								for(let _an in x.animations) {
									const _anm = x.animations[_an];
									if(_anm.coolDownStart2)
										_anm.coolDownStart2 += _diff;
								}
							});
						if(episode?.mobPhaseTick)
							episode.mobPhaseTick += _diff;
					}
					organizeModules();
					episodeVisibilityHidden = false;
					if(!_openingSound) {
						if(episode && episode.bgMusic)
							episode.playBgMusic();
						if(episode && episode.bgSound && !_gameUI.sound)
							episode.resumeAmbianceMusic();
						if(__weather?.sound)
							__weather.sound.play();
						if(episode?.hasGoSound)
							PlaySound({key:'go', force: true, loop:true, volume:.5});
					}
        			SoundManager.resume();
					resumeQuestTimer();
					window.SoundManager.warmAudio();
					if(__account?.gameOpening && _openingSound?.paused)
						_openingSound.play();
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
				if(_lastGameTick && !episode?.realTime){
					const _diff = (Date.now() - _lastGameTick);
					if(episode?.enemies?.[0])
							episode.enemies.forEach(x => {
								for(let _an in x.animations) {
									const _anm = x.animations[_an];
									if(_anm.coolDownStart2)
										_anm.coolDownStart2 += _diff;
								}
							});
						if(episode.mobPhaseTick)
							episode.mobPhaseTick += _diff;
				}
				episodeVisibilityHidden = false;
				if(!_openingSound) {
					if(episode && episode.bgMusic)
						episode.playBgMusic();
					if(episode && episode.bgSound && !_gameUI.sound)
						episode.resumeAmbianceMusic();
					if(__weather?.sound)
						__weather.sound.play();
					if(episode?.hasGoSound)
						PlaySound({key:'go', force: true, loop:true, volume:.5});
				}
				if (window.plugins && window.plugins.insomnia)
					window.plugins.insomnia.keepAwake();
        		SoundManager.resume();
				resumeQuestTimer();
				window.SoundManager.warmAudio();
				if(__account?.gameOpening && _openingSound?.paused)
					_openingSound.play();
			}
			catch(ex) {

			}
		});
}
loadWindowEvents();
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
			if(!tw.isConnected || (tw.showTime + tw.showMS) < _gameTick){
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
function forceResetSkills(_char, _endOfRage) {
	resetSkills(null,null,_char,null,_endOfRage,1);
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
				if(_key !== 'tag'){
					if (_skill.coolDownLeft != undefined)
						_skill.coolDownLeft = _force ? 1 : undefined;
					if (_skill.coolDownStart2 != undefined) {
						_skill.coolDownStart2 = undefined;
						if(_skill.maxCharge)
							_skill.charge = _skill.maxCharge;
					}
				}
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
						if (_counter && _key !== 'tag')
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
								if(!_elem.swapTime || _endOfRage || ((_gameTick - _elem.swapTime) > 400)) {
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
						_mob.friendly = _mob.invulnerable = _mob.puppetMode = _mob.alp = _mob.important = true;
						_mob.puppetXMove = 0;
						_mob.related = _mob.owner = _e;
						_mob.mustDraw = true;
						_mob.experience = 0;
						_mob.class = 'minion';
						_mob.noDirection = false;
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
							if(_c.animations.tag.end)
								_c.animations.tag.end(_mob);
							_mob.still = true;
							_mob.swapAnimation('idle');
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
				<div class="tag-char-area-wrapper" style="margin-top:5cqh;top:0!important">
					<div class="page-tear-bg full">
						<div class="tag-char-area">
							<div class="tag-char-area-inner full" style="background:linear-gradient(0deg, #000000cc, ${_fr.color}, ${_fr.color}, #000000cc) !important">
								<div class="full speed-wrapper">
									<img src="./images/ui/tag/speed-no-color.gif" class="speed full" />
								</div>
							</div>
						</div>
					</div>
					<img src="./images/main/${_key}/concept.png" class="tag-char-concept" />
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

function calculateExperienceByLevel(_level) {
	if(_level === 1)
		return 0;
	let _totalExp = 1000;
	let _maxExp = 1000;
	for(let i=2; i < _level; i++) {
		_maxExp = MathRound(_maxExp * 1.2);
		_totalExp += _maxExp;
	}
	return _totalExp;
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
		_c.hbBars = undefined;
		_c.setHealth(_c.MAXHP);
		updateLevelUI(_c);
		if (_c.main) {
			if(!_noWarn && !_client.quickPlay && (_c.level === __pvp.unlockLevel)) {
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12cqh" src="./images/icons/duel.png" />&nbsp;<span style="flex:1">' + getLangData('Pvp Content Unlocked') + '</span></div>', null, null, 1);
				warn('<div class="flex important achievement" style="position:relative"><img style="height:12cqh" src="./images/icons/rage.png" />&nbsp;<span style="flex:1">' + getLangData('Rage Mode Activated') + '</span></div>', null, null, 1);
			}
			if(!_noWarn && !episode?.menu){
				//warn('<div class="flex leveling"><img style="height:14cqh" src="./images/icons/level-up.png" /></div>', 'level-up');
				PlaySound({ key: 'levelup', volume: .5 });
			}
			updateGlobalQuest('level-up');
			if(!_noWarn && !episode?.menu)
				addDmgFrame({
					text: 'level-up',
					from:mainCharacter,
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
					warn('<div class="flex important achievement" style="position:relative"><img style="height:12cqh" src="./images/ui/menu-icons/skill.png" />&nbsp;<span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' + getLangData('New skill unlocked') + '!</span></div>', null, null, 1);
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
		removeClass(_hitCount, 'squash');
	}
	const _who = _char ?? mainCharacter;
	_who.lastHitDate = undefined;
	_who.hitCount = 0;
	_who._hitShown = undefined;
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
			<div class="flex" style="width:100%;color:#f7f7f780 !important;padding:3cqh;font-size:3.5cqh !important">
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
					<div style="width:80%;color:#f7f7f7dd;text-align:center;font-size:2.8cqh !important">
						${getLangData('You died! You will revive at closest lobby after')} <span style="color:#ff6c00 !important" id="dead-countdown"></span> ${getLangData('seconds')}
					</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;height:90% !important;font-size:3cqh !important" class="game-btn2 flex one-line" onexactclick="closeGameOverModal();reviveAtLobby()">${getLangData('Go To Village')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;height:90% !important;font-size:3cqh !important" class="game-btn2 flex one-line" onexactclick="closeGameOverModal();reviveHere()">${getLangData('Revive Here')}</div>
				</div>`;
	document.getElementById('game-over-content').innerHTML = _html;
	showMyModalPopUp('game-over');
	deadCountdown = document.getElementById('dead-countdown');
}
function openUserActionsModal(_id, _name) {
	//hideMyModalPopUp();
	const _isFriend = __account.friends?.find(x => x.id === _id);
	let _html = `<div style="width:100%;height:50%" class="flex">
					<div style="width:80%;color:#f7f7f7dd;text-align:center;font-size:2.8cqh !important">
						<span class="player-name">${_name}</span>
					</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3cqh !important" class="game-btn2 flex one-line" onexactclick="closeUserActionsModal();openChatPage();selectPersonFromBigChat('${_id}','${_name}')">${getLangData('Send Message')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3cqh !important" class="game-btn2 flex one-line" onexactclick="closeUserActionsModal()">${getLangData('Duel Request')}</div>
				</div>
				<div style="width:100%;height:25%" class="flex">
					<div style="color:#f7f7f7cc !important;font-size:3cqh !important" class="game-btn2 flex one-line${_isFriend ? ' d-none' : ''}" onexactclick="addAsFriend('${_id}','${_name}');openUserActionsModal('${_id}','${_name}')">${getLangData('Add Friend')}</div>
					<div style="color:#f7f7f7cc !important;font-size:3cqh !important" class="game-btn2 flex one-line${!_isFriend ? ' d-none' : ''}" onexactclick="removeFromFriend('${_id}','${_name}');openUserActionsModal('${_id}','${_name}')">${getLangData('Remove Friend')}</div>
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
function playClick(_volume) {
	PlaySound({key:'click', reset: true, volume: _volume ?? .1});
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
		<div id="all-tips" data-order="0" style="height:calc(100% - 10cqh);width:100%">`
			+ createTipsUI(0, 1) +
		`</div>
		<div class="tips-nav flex" style="height:10cqh;width:100%">
			<div onexactclick="switchTipsUI(-1)" style="height:100%;width:10cqh;z-index:5" class="flex flex-jc-end">
				<img style="transform: scale(-1,1) !important;max-height:8cqh;max-width:8cqh" src="./images/icons/nav.png" />
			</div>
			<div class="flex" style="height:100%;width:calc(100% - 20cqh)">
				${getLangData('How to play tips')}
			</div>
			<div onexactclick="switchTipsUI(1)" style="height:100%;width:10cqh;z-index:5" class="flex flex-jc-start">
				<img style="max-height:8cqh;max-width:8cqh" src="./images/icons/nav.png" />
			</div>
		</div>
	</div>`;
}

function renderComingSoonContent(_content) {
	return `<div class="full flex">
	 	<span style="text-align:center;color:#f7f7f7cc!important;font-size:3cqh!important;font-weight:600"><span style="color:#ff6c00 !important">[${getLangData(_content)}]</span><br/>${getLangData('Coming Soon')}</span>
	</div>`;
}
function renderLockedContent(_requirement) {
	return `<div class="full flex">
	 	<span style="text-align:center;color:#f7f7f7cc!important;font-size:3cqh!important"><span style="color:#ff6c00 !important">[${getLangData('Content Is Locked')}]</span><br/>${getLangData(_requirement)}</span>
	 </div>`;
}
function askSomething(_question, _okFuncString, _singletonAttr, _container, className) {
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
		let _modal = `<div${_singletonAttr ? " data-singleton-key='" + _singletonAttr + "'" : ""} class="full fade-me show-ui flex inventory-question${className ? ' ' + className : ''}">
			<div class="inventory-modal flex w-100" style="padding-top:0;flex-direction:column !important">
				<div style="flex:1" class="flex question-modal-desc">
					<span class="flex ask-something-modal-text wot-subtitle">` + getLangData(_question) + `${_addQuestionMark ? '?' : ''}</span>
				</div>
				<div class="flex w-100 new-game-menu-buttons">
					<div class="new-game-menu-button flex animate-me" style="cursor:pointer;min-width:80px" onexactclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
					<div class="quick-space-btn new-game-menu-button flex animate-me" style="cursor:pointer;min-width:80px;" onexactclick="${_okFuncString}">${getLangData('YES')}</div>
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
		let _modal = `<div data-singleton-key="modal_vert" class="full flex inventory-question show-info show-ui">
			<div class="inventory-modal flex">
				<div class="flex show-info-title-wrapper">
					<span class="flex show-info-title wot-title">${_title}</span>
				</div>
				<div class="line1-splitter"></div>
				<div id="show-info-navigations" style="padding:4cqh 2cqh" class="flex w-100">
					<div id="show-info-navigations-inner" class="flex w-100">
				
					</div>
				</div>
				<div class="item-info-modal-close" onexactclick="closeInventoryQuestionModal()"></div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		const _parentDiv = document.querySelector('#menu-ui');
		(_parentDiv ?? _gameUI).appendChild(_div.querySelector('.inventory-question'));
		playClick();
		const _container = document.getElementById('show-info-navigations-inner');
		for(let _n of _json.navigations ?? []) {
			const _div2 = document.createElement('div');
			_div2.className = 'info-nav-container flex';
			_div2.innerHTML = 
			`<div class="flex" style="height:100%">
				<img src="./images/ui/game/menu-icons/${_n.icon}.png" />
			</div>
			<div class="info-nav flex flex-jc-start one-line" style='flex:1'>
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
				delete window[_k];
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

function clippedClientRect(el) {
  const base = el.getBoundingClientRect();
  let left = base.left, top = base.top, right = base.right, bottom = base.bottom;
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const cs = getComputedStyle(node);
    if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
      const r = node.getBoundingClientRect();
      if (cs.overflowX !== 'visible') {
        left = Math.max(left, r.left);
        right = Math.min(right, r.right);
      }
      if (cs.overflowY !== 'visible') {
        top = Math.max(top, r.top);
        bottom = Math.min(bottom, r.bottom);
      }
    }
    node = node.parentElement;
  }
  return { left: left, top: top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
}
let activeUpgradeEffect = null;
function addUpgradeEffect() {

  if (activeUpgradeEffect) {
    clearTimeout(activeUpgradeEffect.timer1);
    clearTimeout(activeUpgradeEffect.timer2);

    activeUpgradeEffect.overlay?.remove();
    activeUpgradeEffect.ghostWrap?.remove();

    activeUpgradeEffect = null;
  }

  const _area   = document.querySelector('.shine-area');
  if(!_area) return;

  const target  = _area.parentNode;
  const _item   = target.firstElementChild;
  if(!_item) return;

  removeClass(_item,'shining-item');

  const rect = clippedClientRect(_item);
  const origin = _item.closest('.page') || document.body;
  const originRect = origin.getBoundingClientRect();

  /* OVERLAY */
  const overlay = document.createElement("div");
  overlay.className = 'upgrade-overlay';

  /* GHOST WRAP */
  const ghostWrap = document.createElement("div");
  ghostWrap.className = "ghost-wrap active-shine";
  Object.assign(ghostWrap.style,{
    position: "absolute",
    top: (rect.top - originRect.top) + "px",
    left: (rect.left - originRect.left) + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    zIndex: 9999,
    pointerEvents: "none",
    "--angle": "0deg",
    opacity: 1,
    margin: "0",
    overflow: "visible",
    transition: "opacity 1s ease"
  });

  /* CLONE */
  const ghost = _item.cloneNode(true);
  applyAppliedRulesPreserveInlineFast(_item, ghost);

  ghost.style.setProperty('position', 'relative', 'important');
  ghost.style.setProperty('width', '100%', 'important');
  ghost.style.setProperty('height', '100%', 'important');
  ghost.style.setProperty('max-width', '100%', 'important');
  ghost.style.setProperty('max-height', '100%', 'important');
  ghost.style.setProperty('min-width', '0', 'important');
  ghost.style.setProperty('min-height', '0', 'important');
  ghost.style.setProperty('aspect-ratio', 'auto', 'important');
  ghost.style.setProperty('left', '0', 'important');
  ghost.style.setProperty('top', '0', 'important');
  ghost.style.setProperty('right', 'auto', 'important');
  ghost.style.setProperty('bottom', 'auto', 'important');
  ghost.style.setProperty('margin', '0', 'important');
  ghost.style.transformOrigin = 'center center';
  ghost.style.transform = 'scale(1)';
  ghost.style.pointerEvents = 'none';
  ghost.style.transition = 'transform .4s cubic-bezier(.2,.8,.3,1.2)';

  /* GLOW LAYER */
  const glow = document.createElement("div");
  Object.assign(glow.style, {
    position: "absolute",
    inset: "-0.7cqh",
    boxShadow: `
  0 0 1cqh rgba(255, 240, 200, 0.9),
  0 0 4cqh rgba(255, 210, 120, 0.75),
  0 0 8cqh rgba(255, 170, 40, 0.55),
  0 0 14cqh rgba(255, 160, 0, 0.35),
  inset 0 0 4cqh rgba(255, 240, 200, 0.65),
  inset 0 0 2cqh rgba(255, 255, 255, 0.25)
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
	origin.appendChild(overlay);
	origin.appendChild(ghostWrap);

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
		ghostWrap.style.transition = "opacity .2s ease";
		glow.style.transition       = "opacity .3s ease";
		overlay.style.transition    = "opacity .3s ease";
		ghost.style.transition      = "opacity .25s ease, transform .4s cubic-bezier(.2,.8,.3,1.2)";
    });
});
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
	const timer1 = setTimeout(() => {
		ghost.style.transform = "scale(1)";
		glow.style.opacity = "0";
		ghostWrap.style.opacity = "0";
		overlay.style.opacity = "0";
	}, 400);


	const timer2 = setTimeout(() => {
		overlay.remove();
		ghostWrap.remove();
		removeClass(_item,'shining-item');

		if(activeUpgradeEffect?.ghostWrap === ghostWrap){
			activeUpgradeEffect = null;
		}

	}, 1000);


	activeUpgradeEffect = {
		overlay,
		ghostWrap,
		timer1,
		timer2
	};

}
let _screenBox = null;
let _holdingForKeyboard = false;
let _keyboardInput = null;
let _menuShift = 0;
function keyboardOverlap() {
	let plugin = 0;
	if(typeof keyboardHeight === 'number' && keyboardHeight > 0) {
		plugin = keyboardHeight;
		if(window.devicePixelRatio > 1 && plugin > (window.screen?.height || 4000))
			plugin = Math.round(plugin / window.devicePixelRatio);
	}
	let cover = 0;
	const view = window.visualViewport;
	if(view && _screenBox && Math.abs((view.width || 0) - _screenBox.vw) <= 40) {
		cover = _screenBox.vh - (view.height + (view.offsetTop || 0));
		if(cover < 0)
			cover = 0;
	}
	if(plugin > 0)
		return Math.max(plugin, cover);
	if(cover > 80 && window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
		return cover;
	return 0;
}
function menuField() {
	const panel = document.getElementById('menu-ui');
	if(!panel)
		return null;
	const active = document.activeElement;
	if(active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && panel.contains(active))
		return active;
	if(_keyboardInput && _keyboardInput.isConnected && panel.contains(_keyboardInput))
		return _keyboardInput;
	return null;
}
function placeChatAboveKeyboard() {
	const panel = document.getElementById('menu-ui');
	if(!panel)
		return;
	const field = menuField();
	const overlap = keyboardOverlap();
	if(!field || overlap <= 80) {
		_menuShift = 0;
		panel.style.transform = '';
		return;
	}
	const view = window.visualViewport;
	const visibleBottom = view ? (view.offsetTop + view.height) : window.innerHeight;
	const boxBottom = _screenBox ? _screenBox.top + _screenBox.height : visibleBottom;
	const limit = Math.min(visibleBottom, boxBottom - overlap) - 6;
	const extra = Math.ceil(field.getBoundingClientRect().bottom - limit);
	let next = _menuShift - extra;
	if(next > 0)
		next = 0;
	_menuShift = next;
	panel.style.transform = next < 0 ? 'translateY(' + next + 'px)' : '';
}
function fitWrapperParent() {
	const wrapper = document.getElementById('wrapper');
	const parent = wrapper && wrapper.parentElement;
	if (!parent)
		return;
	const root = document.documentElement;
	const body = document.body;
	const view = window.visualViewport;
	const vw = Math.round(view?.width || window.innerWidth);
	const vh = Math.round(view?.height || window.innerHeight);
	if (vw < 2 || vh < 2)
		return;
	if(_screenBox && Math.abs(vw - _screenBox.vw) <= 40 && keyboardOverlap() > 80) {
		_holdingForKeyboard = true;
		placeChatAboveKeyboard();
		return;
	}
	_holdingForKeyboard = false;
	let width, height, left, top;
	if (vw * 9 < vh * 16) {
		width = vw;
		height = Math.round(width * 9 / 16);
		left = 0;
		top = Math.round((vh - height) / 2);
	}
	else {
		height = vh;
		width = Math.round(height * 16 / 9);
		if (width > vw)
			width = vw;
		top = 0;
		left = Math.round((vw - width) / 2);
	}
	[root, body, parent, wrapper].forEach(function (el, i) {
		if (!el)
			return;
		el.style.position = i === 0 ? 'fixed' : 'absolute';
		el.style.margin = '0';
		el.style.right = 'auto';
		el.style.bottom = 'auto';
		el.style.left = (i === 0 ? left : 0) + 'px';
		el.style.top = (i === 0 ? top : 0) + 'px';
		el.style.width = width + 'px';
		el.style.height = height + 'px';
		el.style.minWidth = width + 'px';
		el.style.minHeight = height + 'px';
		el.style.maxWidth = width + 'px';
		el.style.maxHeight = height + 'px';
	});
	_screenBox = { vw: vw, vh: vh, top: top, height: height };
	_menuShift = 0;
	const _panel = document.getElementById('menu-ui');
	if(_panel)
		_panel.style.transform = '';
}
function watchWrapperParent() {
	window.addEventListener('resize', fitWrapperParent);
	if (window.visualViewport) {
		window.visualViewport.addEventListener('resize', fitWrapperParent);
		window.visualViewport.addEventListener('scroll', function() {
			if(keyboardOverlap() > 80)
				placeChatAboveKeyboard();
		});
	}
	document.addEventListener('focusin', function(e) {
		const t = e.target;
		if(!t || (t.tagName !== 'INPUT' && t.tagName !== 'TEXTAREA'))
			return;
		const panel = document.getElementById('menu-ui');
		if(!panel || !panel.contains(t))
			return;
		_keyboardInput = t;
		placeChatAboveKeyboard();
	});
	if (document.readyState === 'loading')
		document.addEventListener('DOMContentLoaded', fitWrapperParent);
	else
		fitWrapperParent();
}
watchWrapperParent();
function organizeScreenResize() {
	function resizeCanvas() {
		fitWrapperParent();
		if(_holdingForKeyboard)
			return;
		const newWidth = _gamePad.offsetWidth;
		if((newWidth ?? 0) <= 0)
			return;
		const _oldZoom = __zoom ?? 1;
		setWindowVariables();
		if(episode)
			episode.resize();
		if(mainCharacter){
			_store.minPosX = -1 * MathRound((mainCharacter.width / 2) * __zoom);
			_store.maxPosX = _canvas.width - MathRound((mainCharacter.width / 2) * __zoom);
		}
		// Oran hesapla
		const scaleX = __zoom / _oldZoom;

		// Pozisyonları ölçekle
		platformX *= scaleX;
		if(episode)
			episode.enemies?.forEach(x => {
				x.left *= scaleX;
				x.yPosition *= scaleX;
				x.limitYPosition();
				x.updateVariables();
				x.yGap *= scaleX;
				if(x.healtbarGap)
					x.healtbarGap *= x.getZoom();
				if(x.relatedObjects?.[0])
					x.relatedObjects.forEach(y => {
				 		y.remove = true;
					});
			});
		prevPlatformX = -1;
	}

	window.addEventListener("resize", resizeCanvas);
}

function setWindowVariables() {
	const __r = document.querySelector(':root');
		//const __rs = getComputedStyle(__r);
	// if(!_gamePad)
	// 	_gamePad = document.getElementById('game-pad');
	const _w = MathRound(_gamePad.offsetWidth / __scale);
	let _wr = 1;
	if(__scale === 1 && _w > 1152)
		_wr = 1152 / _w;
	__scale /= _wr;
	_canvas.width = _canvas1.width = _canvasB.width = _canvasGore.width = _canvasBRB.width = _canvasSPB.width = _canvas3.width = _canvas5.width = 
	_canvasF.width = _canvasS.width = _canvasDMG.width = _canvasR.width = MathRound(_w * _wr)
	const root = document.querySelector(':root');
	root.style.setProperty('--scale', __scale);
	root.style.setProperty('--canvas-width', (_canvas.width * __scale)+ "px");

	document.getElementById('game-pad-left').style.width =
	document.getElementById('game-pad-right').style.width =
	'calc((100cqw - ' + (_canvas.width * __scale) + 'px) / 2)';
	_canvas.height = _canvasDMG.height = _canvasB.height = _canvas3.height = _canvasGore.height = _canvas5.height = 
	_canvasS.height = _canvasSPB.height = _canvasBRB.height = _canvasF.height = _canvasR.height = MathRound(_gamePad.offsetHeight / __scale);
	
	__zoom = _canvas.width / 2048;
	// if(_canvas.width > 1152){
	// 	const _rate = _canvas.width / 1152;
	// 	__scale *= _rate;
	// 	__zoom /= _rate;
	// }
	__dmgFrameDistance = MathRound(100 * __zoom);
	groundheight = MathRound(200 * __zoom);
	idealground_height = groundheight;
	_canvas1.height = _canvas.height - getGroundHeight();
	__r.style.setProperty('--ground-height', getGroundHeight() + 'px');
	__r.style.setProperty('--use-progress-time', ((2 / __scale) * (165 / getGroundHeight())) + 's');
	centerMinX = MathFloor(_canvas.width * 0.36);
	centerMaxX = MathFloor(_canvas.width * 0.64);
}