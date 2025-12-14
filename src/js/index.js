"use strict"
function setFps(_val) {
	fps = _val;
	if (fps > _defaultFPS)
		fps = _defaultFPS;
	msPerFrame = 900 / fps;
	if (fps === _defaultFPS)
		return;
	setTimeout(function () {
		setFps(MathRound(fps + (_defaultFPS / 15)));
	}, 200);
}
var _gameTick, _extraTick = 0;
function animate(_tick) {
	if (!_startAnimate) {
		requestAnimationFrame(animate);
		return;
	}
	_gameTick = parseInt(_tick) - _extraTick;
	msNow = Date.now();
	const msPassed = msNow - msPrev;
	if (msPassed < msPerFrame) {
		requestAnimationFrame(animate);
		return;
	}
	if(_closeOpeningMusic && _openingSound?.volume > 0)
	{
		const _vol = _openingSound.volume - .025;
		if(_vol <=0) {
			_openingSound.volume = 0;
			if(!_openingSound.paused) {
				_openingSound.pause();
				_openingSound = _closeOpeningMusic =null;
			}
		}
		else 
			_openingSound.volume = _vol;
	}
	const excessTime = msPassed % msPerFrame;
	msPrev = msNow - excessTime;
	episode.check = true;
	__queue.length = 0;
	_cNPC.clearRect(0, 0, _canvasS.width, _canvasS.height);
	if(mainCharacter)
		mainCharacter.draw(__queue);
	const _sameCoords = (platformX === prevPlatformX);
	episode.checkWeatherEffect();
	episode.checkForgeDone();
	if (!_sameCoords && !episode?.effect) {
		episode.drawLayers();
		episode.drawObjects();
		episode.drawSpriteObjects();
	}
	episode.drawEnemies(__queue);
	if (mainCharacter?.lastHitDate)
		if ((_gameTick - mainCharacter.lastHitDate) > 2499)
			removeHitCount();
	if (!_sameCoords)
		prevPlatformX = platformX;
	
	episode.drawCharacterQueue(__queue);
	if (!_renderDmgFrame)
		drawDmgFrames();
	else
		_renderDmgFrame--;
	if(__storyTell)
		__storyTell.render();
	requestAnimationFrame(animate);
}
//animate();
requestAnimationFrame(animate);
//setInterval(animate, __globalMS);
function drawBg() {
	c2.clearRect(0, 0, _canvas.width, _canvas.height);
	const _bg = mapSprites.find(x => x.id === episode.id).background;
	if(_bg) 
		 c2.drawImage(getImage('./images/texture/' + episode.assetPath + '-' + _bg.key + '.png'), 
			0, 0, _bg.width, _bg.height, 0, 0, _canvas.width, MathCeil(_bg.height * (_canvas.width / _bg.width)));
}
function getMapAssets(_ep, _callback) {
	_startAnimate = false;
	const _assets = [];
	if(_firstOpening) {
		loadSounds();
		loadRelatedImages();
	}
	loadSceneSounds();
	const _map = mapSprites.find(x => x.id === _ep.id);
	const _enemies = ['01', '02', '03'];
	for(let _mob of _map.mobs ?? [])
		if(_enemies.indexOf(_mob.id.toString()) === -1)
			_enemies.push(_mob.id.toString());
	for(let _e of _enemies) {
		const _mob = _allEnemies['enemy' + _e]();
		const _mobAssets = [_mob.src + 'sprite.png'];
		for(let _ass of _map.assets ?? [])
			_mobAssets.push(_ass);
		for(let _key of Object.keys(_mob.animations)) {
			const _anima = _mob.animations[_key];
			if(_anima.src && _mobAssets.indexOf(_anima.src) === -1)
				_mobAssets.push(_anima.src);
			if(_anima.alternateFrames)
				for(let _af of _anima.alternateFrames)
					for(let _f of _af.frames)
						if(_f.src)
							_mobAssets.push(_f.src);
			for(let _frame of _anima.frames) {
				if(_frame.src && _mobAssets.indexOf(_frame.src) === -1)
					_mobAssets.push(_frame.src);
				if(_frame.spell || _frame.atk?.spell) {
					const _spell = _frame.atk?.spell ?? _frame.spell;
					if(spells[_spell.key]?.src && _mobAssets.indexOf(spells[_spell.key].src) === -1)
						_mobAssets.push(spells[_spell.key].src);
				}
			}
		}
		for(let _ass of _mobAssets)
			_assets.push({episodes: [_ep.id], path: _ass});
	}
	if (_ep.layers)
		for (var _lay of _ep.layers)
			_assets.push({episodes: [_ep.id], path: './images/texture/' + (_lay.theme ?? _ep.assetPath) + '-' + _lay.name + '.png?z=' + _lay.zoom});
	if (_ep.sprites)
		for (var _obj of _ep.sprites)
			if (!_obj.text)
				_assets.push({episodes: [_ep.id], path: createSpritePath(_obj, _ep)});
	//const _distinctAssets = [...new Set(_assets)];
	const _distinctAssets = distinctEpisodeAssets(_assets, _ep.id);
	let _assetCount = _distinctAssets.length + (_firstOpening ? __globalAssets.length : 0);
	for(let _key of Object.keys(loadedEpisodeImages)) {
		if(loadedEpisodeImages[_key]) {
			if(loadedEpisodeImages[_key].remove)
				loadedEpisodeImages[_key].remove();
			delete loadedEpisodeImages[_key];
		}
	}
	for(let _key of Object.keys(loadedImages)) {
		if(loadedImages[_key]){
			if(loadedImages[_key].remove)
				loadedImages[_key].remove();
			delete loadedImages[_key];
		}
	}
	const _checkObj = { limit: _assetCount, order: 0 };
	if(_firstOpening){
		_firstOpening = false;
		// __globalAssets.push('./images/main/warrior/concept.png');
		// __globalAssets.push('./images/main/wizard/concept.png');
		// __globalAssets.push('./images/main/blacksmith/concept.png');
		// __globalAssets.push('./images/main/druid/concept.png');
		// __globalAssets.push('./images/main/tank/concept.png');
		// __globalAssets.push('./images/main/archer/concept.png');
		for (let _asset of __globalAssets)
			loadAsset(_asset, _checkObj, _callback, 1);
	}
	for (let _asset of _distinctAssets)
		loadAsset(_asset, _checkObj, _callback);
}
function createSpritePath(_obj, _ep) {
	if(_obj.src)
		return _obj.src;
	else if(_obj.artifactId)
		return './images/artifacts/' + _obj.artifactId + '.png';
	else
		return './images/texture/' + (_obj.animation.theme ?? _ep.assetPath) + (_obj.totalFrames > 1 ? '-' + _obj.animation.key + '.gif' : _obj.animation.key + '.png')
}
function distinctEpisodeAssets(_assets, _id) {
	const _arr = [];
	for(let _ass of _assets)
		if(_ass.episodes.indexOf(_id) !== -1)
			if(_arr.indexOf(_ass.path) === -1)
				_arr.push(_ass.path);
	return _arr;
}
function loadAsset(src, _checkObj, _callback, _global, _zoom) {
	if (getExistingImage(src)) {
		if(_checkObj) {
			_checkObj.order++;
			_assetsProgress.innerText = _checkObj.order + ' / ' + _checkObj.limit;
			if (_checkObj.order === _checkObj.limit)
				_callback();
		}
		return;
	}
	getImage(src, function () {
		if(_checkObj) {
			_checkObj.order++;
			_assetsProgress.innerText = _checkObj.order + ' / ' + _checkObj.limit;
			if (_checkObj.order === _checkObj.limit)
				_callback();
		}
	}, _global, _zoom);
}
function launchIntoFullscreen(element) {
	return;
	//_gamePad.style.setProperty('width', MathRound(_gamePad.clientWidth) + 'px', 'important');
	//_gamePad.style.setProperty('height', MathRound(_gamePad.clientHeight) + 'px', 'important');
	if (element.requestFullscreen)
		element.requestFullscreen();
	else if (element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if (element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if (element.msRequestFullscreen)
		element.msRequestFullscreen();
}
function startGame(_callback) {
	if ('ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch) ||
		navigator.maxTouchPoints > 0 ||
		window.navigator.msMaxTouchPoints > 0)
		setTimeout(function () {
			activateTouchPad();
		}, 500);
	//let _openingSong = new Audio('./images/sounds/opening.mpeg');
	//openingSong.type = 'audio/mpeg';
	//_openingSong.play();
	const _loading = document.getElementById('game-start-loading');
	let _loadCounter = 0;
	prevPlatformX = -1;
	_loadAssetsTimer = setInterval(function () {
		drawBg();
		_loadCounter++;
		prevPlatformX--;
		if (_loadCounter > 10) {
			clearInterval(_loadAssetsTimer);
			_loadAssetsTimer = undefined;
			setTimeout(function () {
				_startAnimate = true;
				_gamePad.style.display = 'block';
				//addClass(document.getElementById('splash'), 'd-none');
				if (_callback)
					_callback(1);
			}, 30);
		}
		//else
		//	_loading.style.width = ((10 * _loadCounter) > 100 ? 100 : (10 * _loadCounter)) + '%';
	}, 100);
}
function removeCoopCharacter(_force) {
	if (_coopMembers?.[0] && (!episode.pvp || _force)) {
		const _oldAvatar = document.getElementById('char-' + _coopMembers[0].key);
		if (_oldAvatar)
			_oldAvatar.remove();
		episode.enemies = episode.enemies.filter(x => !x.friendly);
		const _class = _coopMembers[0].class;
		_coopMembers = [];
		episode.drawSpriteObjects(_class);
		//removeClass(addPlayer, 'd-none');
	}
}
function startWithThisCharacter(_id) {
	removeCoopCharacter();
	const _clone = _allEnemies['enemy' + _id]();
	addCoopCharacter(null, _clone.class, 1, 1);
	_squadMemberKey = _clone.class;
	switchCharacter(1, 1);
	removeCoopCharacter();
	const _friendlyChars = episode.enemies?.filter(x => x.friendly);
	if(_friendlyChars?.[0])
		_friendlyChars.forEach(x => {
			x.friendly = x.main = false;
			x.enemy = true;
			x.setAutoMode(0);
		});
	resetSkills(null, 1, mainCharacter);
	mainCharacter.atk = _clone.atk;
	mainCharacter.hp = mainCharacter.maxHP = _clone.hp;
	mainCharacter.setHealth(mainCharacter.getMaxHP());
	mainCharacter.def = _clone.def;
	if(mainCharacter.coopWith)
		delete mainCharacter.coopWith;
}
function addArcherCoopCharacter(_noSound, _append) {
	if(mainCharacter && mainCharacter.isDead())
		return;
	if (!_append)
		removeCoopCharacter();
	const _c = addCoopCharacter(null, 'arc', _append);
	_squadMemberKey = 'archer';
	if (!_noSound)
		PlaySound({ key: _squadMemberKey + 'select' + getRandomValue(1, 2), volume: .5 });
	return _c;
}
function addWarriorCoopCharacter(_noSound, _append) {
	if (!_append)
		removeCoopCharacter();
	removeCoopCharacter();
	const _c = addCoopCharacter(null, 'wrr', _append);
	_squadMemberKey = 'warrior';
	if (!_noSound)
		PlaySound({ key: _squadMemberKey + 'select' + getRandomValue(1, 2), volume: .5 });
	return _c;
}
function addThiefCoopCharacter(_noSound, _append) {
	if (!_append)
		removeCoopCharacter();
	removeCoopCharacter();
	const _c = addCoopCharacter(null, 'thf', _append);
	_squadMemberKey = 'thief';
	if (!_noSound)
		PlaySound({ key: _squadMemberKey + 'select' + getRandomValue(1, 2), volume: .5 });
	return _c;
}
function getCharacterJSON(_prefix) {
	switch (_prefix ?? _squadMemberKey) {
		case 'arc':
		case 'archer':
			return { key: '2212' + Math.random().toString().replace(/[.]/g, ''), name: _conceptArts.archer.title, class: 'archer', width: 132, height: 191 };
		case 'thf':
		case 'thief':
			return { key: '3212' + Math.random().toString().replace(/[.]/g, ''), name: _conceptArts.thief.title, class: 'thief', width: 275, height: 155 };
		case 'wrr':
		case 'warrior':
			return { key: '1212' + Math.random().toString().replace(/[.]/g, ''), name: _conceptArts.warrior.title, class: 'warrior', width: 122, height: 212 };
		case 'cyc':
		case 'cyclops':
			return { key: '4212' + Math.random().toString().replace(/[.]/g, ''), name: 'Cyclops', class: 'cyclops', width: 400, height: 422 };
		case 'wwf':
		case 'werewolf':
			return { key: '5212' + Math.random().toString().replace(/[.]/g, ''), name: 'Werewolf', class: 'werewolf', width: 226, height: 172 };
		default:
			return false;
	}
}
function addCharacterAsEnemy(_prefix, _name) {
	const _char = getCharacterJSON(_prefix);
	let _enemy = createCharacter(_char);
	_enemy = _store.getMainCharacter(_enemy);
	_store.setCharacterStats(_enemy);
	_enemy.name = _name;
	_enemy.key = _char.key;
	_enemy.main = _enemy.friendly = false;
	_enemy.enemy = true;
	_enemy.setAutoMode(2);
	_enemy.sight = 100;
	episode.enemies.push(_enemy);
	_enemy.animate('idle', 1);
	return _enemy;
}

function addCoopCharacter(_char, _prefix, _append, _level) {
	if(mainCharacter && mainCharacter.deadTime)
		return;
	if (episode?.pvp || episode?.dungeon) {
		warn('<span>' + getLangData('Unable to use in that zone') + '</span>', 'warn');
		return;
	}
	if (_coopMembers?.length >= 2)
		return;
	if (!_char) {
		_char = getCharacterJSON(_prefix);
		if (!_char) {
			warn('<span>' + getLangData('Recruit member first') + '</span>', 'warn');
			return;
		}
	}
	let _coopMember, _addNew;
	if (_coopMembers.length < 1 || _append) {
		_coopMember = createCharacter(_char);
		_addNew = true;
	}
	else
		_coopMember = _coopMembers.find(x => x.key === _char.key);
	if (_addNew) {
		_coopMember = _store.getMainCharacter(_coopMember);
		_store.setCharacterStats(_coopMember);
		_coopMember.name = _char.name;
		_coopMember.key = _char.key;
		_coopMember.main = false;
		_coopMember.enemy = false;
		_coopMember.friendly = true;
		_coopMember.setAutoMode(2);
		_coopMember.sight = 0;
		_coopMembers.push(_coopMember);
		episode.drawSpriteObjects(_char.class);
	}
	_coopMember.coopWith = mainCharacter;
	_coopMember.autoTarget = undefined;
	_coopMember.animate('idle', 1);
	_client.setCharacterValues(_coopMember);
	setCharacterDefaults(_coopMember);
	_coopMember.yPosition = getRandomValue(MathRound(getGroundHeight() * .1), MathRound(getGroundHeight() * .9));
	episode.enemies.push(_coopMember);
	if(_level)
		_coopMember.level = _level;
	_navbar.innerHTML += avatarTemplate(_coopMember);
	addClass(addPlayer, 'd-none');
	_coopMember.left = mainCharacter.getScreenLeft() + (platformX ?? 0);
	let _randomLeft = getRandomValue(0, MathRound(_canvas.width / 20)) - MathRound(_canvas.width / 10);
	_coopMember.left += _randomLeft;
	if (_coopMember.left < minLeft)
		_coopMember.left = minLeft;
	return _coopMember;
}

function reviveAtLobby(_char, _func) {
	hideMyModalPopUp();
	removeCoopCharacter();
	const _c = _char ?? mainCharacter;
	_c.deadTime = _c.dead = _c.remove = _c.dying = _c.immobilize = undefined;
	_c.revived = true;
	switchMap(1, null, function() {
		if(_func)
			_func();
	});
	_c.immobilize = undefined;
}
function reviveHere() {
	removeCoopCharacter();
	mainCharacter.revived = true;
	setCharacterDefaults(mainCharacter);
	resetSkills(null);
	mainCharacter.idle();
	mainCharacter.reviveTime = _gameTick;
	mainCharacter.deadTime = mainCharacter.dead = mainCharacter.remove = mainCharacter.dying = mainCharacter.immobilize = undefined;
	hideMyModalPopUp();
	if(!episode.enemies.find(x => x === mainCharacter))
		episode.enemies.push(mainCharacter);
}
function reviveAsGhost() {
	addClass(_gamePad, 'ghost-mode');
	mainCharacter.ghost = true;
	setCharacterDefaults(mainCharacter);
	resetSkills(null);
	mainCharacter.idle();
	mainCharacter.deadTime = mainCharacter.remove = mainCharacter.immobilize = undefined;
}
function switchCharacter(_force, _nowarn) {
	if (!_force)
		return;
	if (episode.pvp)
		return;
	//3 sn geçmeden tekrar karakter değiştirilemez,
	//karakter interactive animasyonda ise
	let _x = _coopMembers?.[0];
	if (!_x && !_nowarn)
		warn('<span>' + getLangData('No teammate right now') + '</span>', 'warn');
	if (!_x || _x.isDead())
		return;
	const _xAnima = _x.animation;
	const _mainAnima = mainCharacter.animation;
	const _availableAnimations = ['walk', 'run', 'idle'];
	if (_availableAnimations.indexOf(_xAnima) === -1 || _availableAnimations.indexOf(_mainAnima) === -1 ||
		(mainCharacter.switchTime && ((_gameTick - mainCharacter.switchTime) < 3000))) {
		warn('<span>' + getLangData('Can not switch right now') + '</span>', 'warn');
		return;
	}
	else {
		mainCharacter.animate('idle', 1);
		_x.animate('idle', 1);
		_startAnimate = false;
	}
	const _coopLeft = MathRound(_x.left);
	setKeyBoard(_x);
	_x.main = true;
	_x.friendly = false;
	_x.autoMode = undefined;
	mainCharacter.main = false;
	mainCharacter.friendly = true;
	mainCharacter.setAutoMode(2);
	mainCharacter.keyboard = undefined;
	[_coopMembers[0], mainCharacter] = [mainCharacter, _coopMembers[0]];
	setCharacterDefaults(_coopMembers[0], 1);
	setCharacterDefaults(mainCharacter, 1);
	mainCharacter.switchTime = _coopMembers[0].switchTime = _gameTick;
	_navbar.innerHTML = avatarTemplate(mainCharacter);
	_navbar.innerHTML += avatarTemplate(_coopMembers[0]);
	mainCharacter.main = true;
	mainCharacter.friendly = false;
	const _scrLeft = _coopLeft - platformX;
	const _scrDiff = MathRound(_scrLeft - (_canvas.width / 2));
	//platformX += _scrDiff;
	const _centerOfScreen = MathRound(_canvas.width / 2);
	_coopMembers[0].left += platformX;
	platformX = _coopLeft - _centerOfScreen;
	mainCharacter.left = _centerOfScreen;
	if(platformX < 0)
	{
		mainCharacter.left += platformX;
		platformX = 0;
	}
	else if(platformX > (episode.width - _canvas.width)){
		mainCharacter.left += (platformX - (episode.width - _canvas.width));
		platformX = (episode.width - _canvas.width);
	}
	mainCharacter.unseen = false;
	prevPlatformX = undefined;
	_coopMembers[0].setAutoMode(2);
	// mainCharacter.main = true;
	// mainCharacter.friendly = false;
	// const _scrLeft = mainCharacter.getScreenLeft() - mainCharacter.getOriginDistance();
	// const _leftDiff = _scrLeft - (_canvas.width / 2);
	// const _oldPlatformX = platformX;
	// platformX += MathRound(_leftDiff);
	// _coopMembers[0].left += _oldPlatformX;
	// mainCharacter.left -= platformX;
	_client.setCharacterValues(mainCharacter, 1);
	_squadMemberKey = _coopMembers[0].class;
	PlaySound({ key: mainCharacter.class + 'select' + getRandomValue(1, 2), volume: .5 });
	_startAnimate = true;
	_client.loadItems();
}
const _tipChoices = [];
function createTipsUI(_tipOrder, _showCurrent) {
	const _count = _tips.length;
	const _current = _tipOrder + 1;
	let _images = '';
	// for(let i = 1; i <= (_tips[_tipOrder].imageCount ?? 1); i++)
	// 	_images += `<img class="tip-img" style="height:100%" src="./images/tips/${_tipOrder}-${i}.png" onerror="this.remove()" />`;
	let _html = 
	`<div id="tip-screen" class="full"><div class="flex" style="padding:0 2vw;width:100%;height:40%">
		<div class="tip-wrapper flex flex-ai-start">
			<div style="padding:0 3vh;text-align:right"> 
				${getLangData('Tip')}<span id="tip-current">${_showCurrent ? ' ' + _current.toString() + '/' + _count.toString() : ': '}</span>
			</div>
			<div class="flex flex-jc-start" style="flex:1;padding:0 3vh 0 0">
				${_tips[_tipOrder][getLang()]}
			</div>
		</div>
	</div>
	<div class="flex" style="width:100%;height:60%">`
		+ _images +
	`</div></div>`;
	return _html;
}
function switchMap(_x, _force, _func, _effect, _ss, _onEnd) {
	if(__switchingMap)
		return;
	//try{
	_game.suspended = 1;
	if(mainCharacter) {
		const _maph = mapSprites.find(x => x.id === _x);
		if(mainCharacter.level < _maph.minLevel) {
			warn('<span>' + getLangData('Your level is too low') + '</span>', 'warn');
			return;
		}
	}
	const _map = mapSprites.find(x => x.id === _x);
	if(_map.gold) {
		const _gm = __account.missions.find(x => x.key === 'gold');
		const _limit = _missions.find(x => x.key === 'gold').limit;
		const _lastReset = getCurrentResetTime();
		if(_gm.lastActivity > _lastReset && _gm.current >= _limit) {
			warn('<span>' + getLangData('Daily limit reached') + '</span>', 'warn');
			return;
		}
	}
	let _setFullHP = _map.id > 99 || episode?.id > 99;
	if(episode)
		episode.dispose();
	__switchingMap = true;
	hideMyModalPopUp();
	removeClass(_gamePad, 'ghost-mode');
	__queue.length = 0;
	_startAnimate = false;
	const _splash = document.getElementById('splash');
	if (_splash) {
		_splash.style.display = 'flex';
		_splash.style.opacity = '.99';
		//_splash.style.background = 'url(./images/loading/' + getRandomValue(1, 8) + '.png), linear-gradient(0deg, #000, #000)';
		//_splash.style.backgroundSize = 'contain';
		//_splash.style.backgroundPosition = 'center center';
		//_splash.style.backgroundRepeat = 'no-repeat';
		let _tipOrder;
		while(true) {
			_tipOrder = getRandomValue2(0, _tips.length - 1);
			if(_tipChoices.length === _tips.length)
				break;
			else if(_tipChoices.indexOf(_tipOrder + 1) === -1) {
				_tipChoices.push(_tipOrder + 1);
				break;
			}
		}
		_splash.innerHTML += createTipsUI(_tipOrder);
		removeClass(_splash, 'd-none');
	}
	prevPlatformX = undefined;
	frames = 0;
	const _am = document.getElementById('auto-mode-on-off');
	removeClass(_am, 'selected');
	if(__story)
		addClass(_am, 'd-none');
	else
		removeClass(_am, 'd-none');
	if (episode?.bgSound) {
		episode.bgSound.pause();
		episode.bgSound.currentTime = 0;
	}
	const _dungeonFloor = episode?.currentFloor;
	const _oldSeason = episode?.season ?? 0;
	const _fromLobby = episode?.lobby;
	const _eps = new map({
		loadObjects: true,
		key: 'map' + _x + '-' + 1,
		season: _x,
		height: _canvas.height,
		sprites: []
	});
	if(episode && _effect){
		episode.nextEpisode = _eps;
		episode.effect = _effect;
		return;
	}
	else
		episode = _eps;
	episode.msNow = getRandomValue(1, 1000);
	const _hasLead = mainCharacter?.leader;
	const _unarmed = mainCharacter?.unarmed;
	const _mh = mainCharacter?.health;
	const _me = mainCharacter?.experience;
	const _mme = mainCharacter?.maxExperience;
	
	mainCharacter = _store.getMainCharacter();
	let hasMainCharacter;
	if(_mh && !_setFullHP) {
		hasMainCharacter = 1;
		mainCharacter.health = _mh;
		mainCharacter.experience = _me;
		mainCharacter.maxExperience = _mme;
	}
	_store.setCharacterStats();
	if (!mainCharacter.keyboard)
		setKeyBoard(mainCharacter);
	else
		mainCharacter.keyboard.holdingKeys = [];
	_store.minPosX = -1 * MathRound((mainCharacter.width / 2) * __zoom);
	_store.maxPosX = _canvas.width - MathRound((mainCharacter.width / 2) * __zoom);
	// if(episode.pvp || episode.dungeon) {
	// 	episode.roomId = _newId ?? getRandomValue(10000, 99999);
	// 	createBattleGround();
	// 	addClass(document.getElementById('quest-status'), 'd-none');
	// }
	// if(episode.id === 500) {
	// 	episode.roomId = _newId ?? getRandomValue(10000, 99999);
	// 	createArena();
	// 	addClass(document.getElementById('quest-status'), 'd-none');
	// }
	if (_dungeonFloor && episode.dungeon && episode.floors > _dungeonFloor)
		episode.currentFloor = _dungeonFloor + 1;
	const _isBattleGround = _map?.battleGround || _map?.pvp;
	const _isTower = _map?.tower;
	const _isMission = _map?.tower || _map?.gold;
	const _f = _force;
	getMapAssets(episode, function () {
		startGame(function (_connectingToGame) {
			//try	{
				loadUI();
				//const _oldMapCoords = parseInt(mapSprites.find(x => x.id === _oldSeason)?.coords?.left?.replace('%','') ?? 0);
				//const _newMapCoords = parseInt(mapSprites.find(x => x.id === episode.season).coords.left.replace('%',''));
				
				// if ((episode.lobby && MathAbs(_oldSeason - episode.season) > 2) || _oldSeason == episode.season || ((_oldSeason > episode.season) && ((episode.season % 2) === 1) &&
				// 	(((_oldSeason % 2) === 1) || _fromLobby)) ||
				// 	((_oldSeason < episode.season) && ((episode.season % 2) === 0))) {

				if(episode.still) {
					mainCharacter.left = MathRound(_canvas.width / (_map.enterDirection === 'left' ? 5 : 2));
					mainCharacter.direction = 'right';
					mainCharacter.platformX = platformX = MathRound(episode.width / 2) - mainCharacter.left - (_map.enterDirection === 'left' ? MathRound((_canvas.width / 2) - (_canvas.width / 5)) : 0);
				}
				else if(_oldSeason > episode.season || _ss?.from === 'right') {
					mainCharacter.left = MathRound((_canvas.width * .8) - mainCharacter.getWidth());
					mainCharacter.direction = 'left';
					mainCharacter.platformX = platformX = MathRound(episode.width - _canvas.width);
				}
				else
				// if ((episode.lobby && MathAbs(_oldSeason - episode.season) > 2) || _oldSeason == episode.season || ((_oldSeason > episode.season) && ((episode.season % 2) === 1) &&
				// 	(((_oldSeason % 2) === 1) || _fromLobby)) ||
				// 	((_oldSeason < episode.season) && ((episode.season % 2) === 0))) {
				{
					mainCharacter.left = MathRound(_canvas.width / 5);
					mainCharacter.direction = 'right';
					mainCharacter.platformX = platformX = 0;
				}
				// }
				// else {
				// 	mainCharacter.left = MathRound((_canvas.width * .8) - mainCharacter.getWidth());
				// 	mainCharacter.direction = 'left';
				// 	mainCharacter.platformX = platformX = MathRound(episode.width - _canvas.width);
				// }
				_client.setCharacterValues();
				setCharacterDefaults(mainCharacter);
				if (!_f)
					resetSkills(null);
				if (_hasLead && (episode.dungeon ||episode.pvp))
					mainCharacter.leader = 1;
				if (_isBattleGround) {
					createBattleGround(_map);
				} else {
					removeClass(document.getElementById('quest-status'), 'd-none');
					episode.drawQuestNavIcon();
					if (_coopMembers?.[0])
						for (let cm of _coopMembers){
							const _ua = cm.unarmed;
							let cc = addCoopCharacter({ key: cm.key, name: cm.name, class: cm.class, width: cm.width, height: cm.height }, null, 1);
							if(cc && _ua)
								cc.unarm();
						}
				}
				episode.enemies.push(mainCharacter);
				//eskiden liderliği burada veriyorduk
				episode.installMobs();
				episode.status = 'loaded';
				//animate();
				mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
				mainCharacter.immobilize = mainCharacter.ghost = false;
				mainCharacter.animate('idle', 1);
				mainCharacter.lastActivity = _gameTick;
				episode.playAmbianceMusic();
				let _mapDiscovered;
				if (!_isBattleGround && !episode.dungeon && !_isMission && __account.visitedMaps.indexOf(episode.subMap ?? episode.id) === -1) {
					_client.upgradeVisitedMaps(episode.id);
					_mapDiscovered = 1;
				}
				if (_func)
					_func();
				if (_isBattleGround)
					episode.enemies?.forEach(x => {
						x.immobilize = true;
						x.killCount = 0;
						x.setHealth(x.getMaxHP(), null, null, 8);
						x.killedBy = undefined;
						x.grayAvatar = false;
					});
				if (!(episode.currentFloor > 1))
					connectSocket();
				const _activeCoolDowns = document.querySelectorAll('.skill .counter');
				if(_activeCoolDowns?.[0])
					for(let _acd of _activeCoolDowns)
						_acd.remove();
				let _startWith = _ss?.startWith;
				if(_startWith)
					startWithThisCharacter(_startWith);
				setTimeout(function() {
					if(_onEnd)
						_onEnd();
					else {
					//try {
						//if(__account.cs || _startWith) {
						addClass(_splash, 'd-none');
						document.getElementById('tip-screen').remove();
						//}
					}
						const _loading = document.getElementById('game-start-loading');
						removeClass(_loading, 'animate-me');
						addClass(_loading, 'animate-me');
						//_loading.style.width = '0%';
						episode.drawSpriteObjects2();
						_client.loadItems(hasMainCharacter);
						updateQuestArea();
						checkUpdateAvailable();
						__account.questStatus.dialogOrder = __account.questStatus.dialogArr = undefined;
						__switchingMap = false;
						if(!episode.pvp)
							episode.pvp = _isMission;
						if(episode.pvp)
							addClass(document.getElementById('pot-btn'), 'not-allowed');
						else
							removeClass(document.getElementById('pot-btn'), 'not-allowed');
						closeUserActionsModal();
						if(_isTower)
							setTowerMobsByLevel();
						else if(_isMission) {
							episode.enemies?.forEach(x => x.immobilize = true);
							if(episode.gold) {
								mainCharacter.yPosition = episode.enemies.find(x => x.enemy).yPosition;
								removeCoopCharacter(1);
								const _gm = __account.missions.find(x => x.key === 'gold');
								_gm.current++;
								_gm.lastActivity = _gameTick;
								_client.saveState(1);
								//mainCharacter.chargeSpeedRate *= .7;
							}
						}
						// if(episode.characterZoom) {
						// 	mainCharacter.zoom *= episode.characterZoom;
						// 	mainCharacter.stepXRate *= episode.characterZoom;
						// }
						if(_mapDiscovered) {
							warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/scroll.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('New Map Discovered') + '</span></div>');
							PlaySound({ key: 'page', volume: .5 });
						}
						if(_unarmed)
							mainCharacter.unarm();
						if(_startWith)
							mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
						else if(_startWith === 0)
							mainCharacter = undefined;
						if(__storyScene?.afterInit)
							__storyScene.afterInit();
						_game.suspended = false;
					}, 2000);
				// if (!(!window.Keyboard || !window.Keyboard.shrinkView))
				// 	window.Keyboard.disableScrollingInShrinkView(false);
				// if(!__account.cs && !_startWith)
				//  	requestVideo(1);
				// mainCharacter.addCommonSkill({key:'poisonpuff'});
				// mainCharacter.addCommonSkill({key:'poisonpuff'});
				// mainCharacter.addCommonSkill({key:'poisonpuff'});
				// mainCharacter.addCommonSkill({key:'poisonpuff'});
			// }
			// catch(_ex) {
			// 	alert('index 937' + _ex.message);
			// }
		});
	});
// }
// catch(_tex) { alert('index 942' + _tex.message);}
 }
_allEnemies.enemy10001 = function () { return createCharacter(getCharacterJSON('wrr')); };
_allEnemies.enemy10002 = function () { return createCharacter(getCharacterJSON('arc')); };
_allEnemies.enemy10003 = function () { return createCharacter(getCharacterJSON('thf')); };
function requestVideo(_order, _again) {
	loadVideo('./images/cutscenes/cs' + _order + '.mp4', function() {
		addClass(document.getElementById('splash'), 'd-none');
		const _ts = document.getElementById('tip-screen');
		if(_ts)
			_ts.remove();
	}, _again);
}
function loadVideo(_url, _after, _again) {
	var r = new XMLHttpRequest();
	r.onload = function() {
		const _videoWrapper = document.createElement('div');
		_videoWrapper.className = 'full flex video-loader';
		const _myVid = document.createElement('video');
		_videoWrapper.appendChild(_myVid);
		_gameUI.appendChild(_videoWrapper);
		_myVid.src = URL.createObjectURL(r.response);
		_myVid.controls = false;
		_myVid.className = 'd-none';
		_myVid.play();
		_myVid.addEventListener('ended', function() {
			skipVideo(_myVid, _again);
		});
		_myVid.addEventListener('canplaythrough', function() {
			removeClass(_myVid, 'd-none');
		});
		const _videoTouch = document.createElement('div');
		_videoTouch.className = 'full video-touch';
		_videoTouch.innerHTML = '<span>' + getLangData('Touch to skip') + '</span>';
		_videoTouch.onexactclick = function() {
			askSkipVideo(_myVid, _again)
		}
		_videoWrapper.appendChild(_videoTouch);
		if(_after)
			_after();
	};
	r.open("GET", _url);
	r.responseType = "blob";
	r.send();
}
let _playingVideo;
function askSkipVideo(_video, _again) {
    playClick();
	_playingVideo = _video;
    let _modal = document.createElement('div');
	_modal.className = "full flex inventory-question";
	_modal.style.zIndex = 9999;
    _modal.innerHTML = `<div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Skip Story')}?</span></div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="skipVideo(null, ${_again})">${getLangData('YES')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
            </div>
        </div>`;
    _gameUI.appendChild(_modal);
}
function skipVideo(_video, _again) {
	const _v = _playingVideo ?? _video;
	_v.pause();
	_v.remove();
	const _loader = document.querySelector('.video-loader');
	if(_loader)
		_loader.remove();
	closeInventoryQuestionModal();
	if(!_again)
		playCutScene(1);
}
function getGroundHeight() {
	if(isNaN(groundheight) && episode)
	{
		const _gh = MathRound(idealground_height * (episode.ground.yRate ?? 1));
		groundheight = _gh;
		return groundheight;
	}
	return groundheight;
}

var _closeOpeningMusic, gameopening;
function openGame() {
	if(gameopening)
		return;
	gameopening = 1;
	//launchIntoFullscreen(document.documentElement);
	setTimeout(function () {
		const __r = document.querySelector(':root');
		//const __rs = getComputedStyle(__r);
		__zoom = _canvas.clientHeight / 1152;
		__dmgFrameDistance = MathRound(100 * __zoom);
		groundheight = MathRound(200 * __zoom);
		idealground_height = groundheight;
		console.log('INDEX GH ' + groundheight);
		console.log('INDEX İDEAL GH ' + idealground_height);
		console.log('INDEX ZOOM ' + __zoom);
		console.log('INDEX CCH ' + _canvas.clientHeight);
		if(_openingSound)
			_closeOpeningMusic = 1;
		_canvas.width = _canvas1.width =_canvasB.width = _canvasGore.width = _canvasRage.width = _canvas3.width = _canvas4.width = _canvas5.width = 
		_canvasF.width = _canvasS.width = _canvasR.width = _gamePad.offsetWidth;
		const root = document.querySelector(':root');
		root.style.setProperty('--canvas-width', _canvas.width + "px");

		document.getElementById('game-pad-left').style.width =
		document.getElementById('game-pad-right').style.width =
		'calc((100vw - ' + _canvas.width + 'px) / 2)';
		_canvas.height = _canvasB.height = _canvas4.height = _canvas3.height = _canvasGore.height = _canvasRage.height = _canvas5.height = 
		_canvasS.height = _canvasF.height = _canvasR.height = _gamePad.offsetHeight;
		_canvas1.height = _canvas.height - getGroundHeight();
		__r.style.setProperty('--ground-height', getGroundHeight() + 'px');
		__r.style.setProperty('--use-progress-time', (2 * (165 / getGroundHeight())) + 's');
		centerMinX = parseInt(_canvas.width * 0.36);
		centerMaxX = parseInt(_canvas.width * 0.64);
		// switchMap(testMap ?? 1, null, function () {
		// 	for (var i = 1; i <= Object.keys(chainSkills).length; i++)
		// 		addClass(chainSkills['skill' + i], 'd-none');
		// 	addClass(document.getElementById('first-splash'), 'd-none');
		// 	removeClass(document.getElementById('game-start-loading-wrapper'), 'd-none');
		// });
		startStory(1);
		_client.loadGold();
		_client.loadPots();
		updateQuestArea();
	}, 2000);
}
function setTowerMobsByLevel() {
	const _towerProps = _missions.find(x => x.key === 'tower').props;
	const _t = __account.missions.find(x => x.key === 'tower');
	const _mobs = _towerProps.find(x => x.level === _t.level).floors.find(x => x.floor === _t.current).mobs;
	let _mobIds = [];
	for(let _mob of _mobs)
		for(var i = 0; i < _mob.count; i++)
			_mobIds.push(_mob.id);
	_mobIds = _mobIds.sort(() => Math.random() - 0.5);
	var _len = MathRound(_mobIds.length / 2);
	episode.mobs = [];
	episode.centerLeft = MathRound(((mainCharacter.platformX + mainCharacter.getScreenLeft()) / __zoom));
	var minX = episode.centerLeft - MathRound(_canvas.width * .4);
	var maxX = episode.centerLeft + MathRound(_canvas.width * .4);
	for(var i = 0; i < _mobIds.length; i++) {
		const _rate = MathCeil(_t.current / 3);
		episode.mobs.push({
			id: _mobIds[i],
			count: 1,
			grade: _t.level + MathFloor(_t.current / 10),
			minLevel: _t.current,
			maxLevel: _t.current,
			name: _mobs[i]?.name,
			difficulty: 5 - _rate,
			direction: i < _len ? 'right' : 'left',
			minX: i < _len ? maxX : minX,
			maxX: i < _len ? maxX : minX,
			yPosition: MathRound((((i % _len) + 1) / (_len + 1)) * getGroundHeight()),
			// yPosition: function() {
			// 	return getRandomValue(MathRound(getGroundHeight() * .25), MathRound(getGroundHeight() * .75));
			// },
			sight: 200,
		});
	}
	episode.installMobs();
	if(_mobIds.length === 1) {
		mainCharacter.direction = 'right';
		mainCharacter.left = MathRound(_canvas.width * .2);
		const _boss = episode.enemies.find(x => x.enemy);
		_boss.left += _boss.getWidth();
	}
	episode.enemies?.forEach(x => {
		x.immobilize = true;
		x.killCount = 0;
		x.direction = x.getLeft() <= mainCharacter.getLeft() ? 'right' : 'left',
		x.setHealth(x.getMaxHP());
		x.killedBy = undefined;
		x.grayAvatar = false;
	});
	episode.resultStars = [
		{ id: 1, title: 'Clear floor' },
		{ id: 2, title: 'Finish in time' },
		{ id: 3, title: 'Keep HP over %50' }
	];
	removeCoopCharacter();
}
function setKeyBoard(_c) {
	_c.keyboard = new keyboard(_c, ['a', 'g', 'd', ' ', 'h', 'j', 'k', 'l', 'e', 'q', 'r', 'f', 'arrowleft', 'arrowup', 'arrowright', 'arrowdown', 'w', 's', 'u', '1', '2', '3', '4', 'p']);
}
function setCharacterDefaults(_char, _swap) {
	if (_char.stepSound && !_char.stepSound.paused)
		_char.stepSound.pause();
	_char.stepSound = undefined;
	removeHitCount(_char);
	if (!_swap) {
		_char.rageCount = 0;
		_char.fatique = _client.loadFatique(_char);
		_char.removeBuffs();
	}
	if (_char.main) {
		if (!_char.updateRageSkillUI(_swap))
			resetSkills(null, 1, _char);
		const _bar = document.querySelector('#char-' + _char.key + ' .defbar-value');
		if (_bar)
			_bar.style.width = ((_char.fatique / _char.maxFatique) * 100) + '%';
		if(!episode.pvp) {
			_enemyProfile.innerHTML = `<div data-key="1" id='common-skill-1' class="flex common"></div>
					<div data-key="2" id='common-skill-2' class="flex common"></div>
					<div data-key="3" id='common-skill-3' class="flex common"></div>
					<div data-key="4" id='common-skill-4' class="flex common"></div>`;
			_commons = document.querySelectorAll('.common');
			_char.checkCommonInventory();
		}
		else
			_char.disableCommonInventory();
	}
	else if (!_swap) {
		_char.left = mainCharacter.left + mainCharacter.platformX;
		_char.direction = mainCharacter.direction;
	}
	let _footStepEffectKey = 'defaultfootsteps';
	if (relatedObjectImages[((episode.pvp || episode.dungeon) ? 'dungeon' : episode.theme) + 'footsteps'])
		_footStepEffectKey = ((episode.pvp || episode.dungeon) ? 'dungeon' : episode.theme) + 'footsteps';
	_char.animations.run.frames[1].objects = [{
		key: _footStepEffectKey,
		position: 'behind-feet',
		yGap: -5,
		scale: .35
	}];
	if (_char.health === undefined || _char.revived) {
		if (_char.revived)
			_char.setHealth(_char.getMaxHP(), 0, 0, 10);
		else
			if (!_client.loadHP(_char))
				_char.setHealth(_char.getMaxHP(), 0, 0, 9);
		_char.remove = _char.revived = undefined;
	}
}
function showMyModalPopUp(_id) {
	if(_id === 'game-menu' && mainCharacter && mainCharacter.deadTime)
		return;
	if(_id && hasClass(document.getElementById(_id), 'loaded'))
		return;
	__account.questStatus.dialogOrder = __account.questStatus.dialogArr;
	_dialogAppeared = 1;
	if(mainCharacter?.keyboard?.holdingKeys)
		mainCharacter.keyboard.holdingKeys = [];
	addClass(document.getElementById('quest-dialog'), 'd-none');
	if(_id === 'game-menu') {
		if(document.getElementById('menu-ui'))
			return;
		let _menuBD = document.createElement('div');
		_menuBD.className = 'menu-backdrop full flex show-ui';
		let _menu = document.createElement('div');
		_menu.id = 'menu-ui';
		_menu.innerHTML = '<div class="flex full"></div>';
		_menuBD.appendChild(_menu);
		_gameUI.appendChild(_menuBD);
		return;
	}
	const _modal = document.querySelector(_id ? '#' + _id : '.my-pop-up-wrapper');
	addClass(_modal, 'show');
	setTimeout(function () {
		addClass(_modal, 'loaded');
		removeClass(_modal, 'show');
	}, 250);
}
function hideMyMenu() {
	_dialogAppeared = false;
	playClick();
	const _mbd = document.querySelector('.menu-backdrop');
	if(_mbd)
		_mbd.remove();
}
function hideMyModalPopUp(_asap) { 
	if(__pvp)
		__pvp.dispose();
	_dialogAppeared = 0;
	const _modal = document.querySelector('.my-pop-up-wrapper.loaded');
	if(_asap) {
		removeClass(_modal, 'loaded');
		return;
	}
	addClass(_modal, 'hide');
	setTimeout(function () {
		removeClass(_modal, 'loaded');
		removeClass(_modal, 'hide');
		const _removals = document.querySelectorAll('#game-menu .remove-me');
		for(let _r of _removals ?? [])
			_r.innerHTML = '';
	}, 250);
}
function switchBookPage(_order, _subOrder) {
	if(!(_order === 3 && (_subOrder === 1 || _subOrder === 3)) && !episode?.menu)
	{
		warn('<span>' + getLangData('Unreachable in story mode') + '</span>', 'warn');
		return;
	}
	// if(_order === 3 && _subOrder === 1 && __story && !__account.questStatus?.quest){
	// 	warn('<span>' + getLangData('No quest for now') + '</span>', 'warn');
	// 	return false;
	// }
	const _removals = document.querySelectorAll('#game-menu .remove-me');
	for(let _r of _removals ?? [])
		_r.innerHTML = '';
	PlaySound({ key: 'page', volume: .3 });
	let _pvpPressed;
	detachModule();
	for (var i = 0; i < 9; i++) {
		if ((i + 1) === _order) {
			addClass(document.getElementById('book-sign-' + _order), 'selected');
			addClass(document.getElementById('book-content-' + _order), 'selected');
			// if (_order === 4)
			// 	organizeMapCoordinates();
			// else 
			if (_order === 3 && _subOrder === 2)
				renderGlobalQuestList();
			else if (_order === 3 && _subOrder === 3)
				installWorldMap();
			else if (_order === 3)
				createStoryUI();
			else if(_order === 4 && _subOrder === 3)
				installMailbox();
			else if(_order === 4 && _subOrder === 2)
			{
				//online friends / blacklist / add friend / remove friend / pm
			}
			else if(_order === 4)
			{
				//chat
			}
			else if (_order === 2 && _subOrder === 2)
				installTalents();
			else if (_order === 2) {
				skill.getSkillUI(mainCharacter.class);
				checkUpdateAvailable();
			}
			else if (_order === 1 && _subOrder === 2)
				createArtifactsUI();
			else if (_order === 9)
				getOptionsUI();
			// else if (_order === 5) {
			// 	//getOnlineUsersUI();
			// 	checkIfLotteryAvailable();
			// }
			else if (_order === 7)
				getFragmentUI();
			else if(_order === 8 && _subOrder === 2)
				renderDailyLottery();
			else if (_order === 8 && _subOrder === 3)
				installDailyLogin();
			else if (_order === 8)
				createStoreUI();
			// else if (_order === 9) {
			// 	document.getElementById('book-content-9')
			// 	.innerHTML = renderTipsUI();
			// }
			else if (_order === 5 && _subOrder === 2)
				getHonorStoreUI();
			else if (_order === 5) {
				__pvp.render();
				_pvpPressed = 1;
			}
			else if (_order === 12)
				getOnlineUsersUI();
			else if(_order === 1) {
				renderInventory();
				checkUpdateAvailable();
			}
			if(__pvp && !_pvpPressed)
				__pvp.dispose();
		}
		else {
			//removeClass(document.getElementById('book-sign-' + (i + 1)), 'selected');
			//removeClass(document.getElementById('book-content-' + (i + 1)), 'selected');
			// removeClass(_elems[i], 'selected');
			// removeClass(_elems[i + _step], 'selected');
		}
	}
	switchBookPageTabs(_order, _subOrder);
	checkUpdateAvailable2(_order);
}
function checkUpdateAvailable2(_order) {
	if(!mainCharacter)
		return;
	const _badges = document.querySelectorAll('.my-badge');
	if(_badges?.[0])
		_badges.forEach(x => removeClass(x, 'my-badge'));
	const _skills = skill.getAvailableSkills();
	const availables = [];
	for(let _skill of _skills)
		if(skill.calculateSkillPrice(_skill.key) <= __account.gold)
			availables.push({index:1, subIndex:0});
	var _items = allPowerDiffOrItemUpgrades();
	for(const _item of _items)
			availables.push({index:0, subIndex:0});
	if(checkIfGlobalQuestDone())
			availables.push({index:2, subIndex:1});
	if(checkIfFragmentUpdate())
			availables.push({index:6, subIndex:0});
	if(checkIfStoreFreeItemAvailable())
			availables.push({index:7, subIndex:0});
	if(__account.pvp.duelCount > 0 && mainCharacter.level >= __pvp.unlockLevel)
			availables.push({index:4, subIndex:0});
	if(__account.forges?.find(x => x.warned))
			availables.push({index:4, subIndex:1});
	if(availables?.[0]) {
		const _btns = document.querySelectorAll('.main-menu-btn');
		for(let i = 0; i < _btns.length; i++)
		{
			const _a = availables.find(x=> x.index === i);
			if(_a)
				addClass(_btns[i], 'my-badge');
		}
		const _a = availables.find(x=> x.index === _order);
		if(_a) {
			const _b = document.querySelectorAll('.menu-sub-button-' + _a.index)?.[_a.subIndex];
				if(_b)
					addClass(_b, 'my-badge');
		}
	}
}
function checkIfFragmentUpdate() {
	for(let _f of __fragments) {
		if(hasFragmentUpdate(_f.key))
			return true;
	}
	return false;
}
function getBottomMenuTemplate(_index) {
	return `<div class="menu-bottom">
        <div class="flex" style="padding: 3.7% 11.5% 3% 11.5%;height: 100%;">
            <div class="flex animate-me main-menu-btn${_index === 0 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/item3.png" onexactclick="switchBookPage(1, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 1 ? ' selected' : ''}">
                <img id="skills-menu-icon" class="animate-me" src="./images/ui/menu/skill5.png" onexactclick="switchBookPage(2, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 2 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/quest.png" onexactclick="switchBookPage(3, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 3 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/social.png"  onexactclick="switchBookPage(4, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 4 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/pvp.png" onexactclick="switchBookPage(5, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 5 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/dungeon.png"  />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 6 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/puzzle2.png" onexactclick="switchBookPage(7, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 7 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/gift.png" onexactclick="switchBookPage(8, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 8 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/settings.png" onexactclick="switchBookPage(9)" />
            </div>
        </div>
    </div>`;
}
function switchBookPageTabs(_order, _subOrder) {
	let _btns = document.querySelectorAll('.menu-left .menu-sub-button');
	_btns.forEach(x => {
		removeClass(x, 'selected');
		removeClass(x, 'active');
	});
	let _tabs = document.querySelectorAll('.menu-left .menu-sub-button-' + _order);
	if(_tabs?.[0])
		_tabs.forEach(x => addClass(x, 'active'));
	if(_subOrder)
		addClass(_tabs[_subOrder - 1], 'selected');

	_btns = document.querySelectorAll('.menu-right .menu-sub-button');
	_btns.forEach(x => {
		removeClass(x, 'active');
	});
	_tabs = document.querySelectorAll('.menu-right .menu-sub-button-' + _order + '-' + _subOrder);
	if(_tabs?.[0])
		_tabs.forEach(x => addClass(x, 'active'));
}
function getLeftMenuTemplate(_index) {
	return `<div class="menu-left">
		<div class="w-100 menu-sub-button animate-me menu-sub-button-1" data-index="1"><img onexactclick="switchBookPage(1, 1)" src="./images/ui/menu/item.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-1" data-index="2"><img onexactclick="switchBookPage(1, 2)" src="./images/ui/menu/relics1.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-2" data-index="1"><img onexactclick="switchBookPage(2, 1)" src="./images/ui/menu/skill-1.png"/></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-2" data-index="2"><img onexactclick="switchBookPage(2, 2)" src="./images/ui/menu/skill-2.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-3" data-index="1"><img onexactclick="switchBookPage(3, 1)" src="./images/ui/menu/puzzle.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-3" data-index="2"><img onexactclick="switchBookPage(3, 2)" src="./images/ui/menu/achievement.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-3" data-index="3"><img onexactclick="switchBookPage(3, 3)" src="./images/ui/menu/world.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-4" data-index="1"><img onexactclick="switchBookPage(4, 1)" src="./images/ui/menu/chat.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-4" data-index="2"><img onexactclick="switchBookPage(4, 2)" src="./images/ui/menu/social2.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-4" data-index="3"><img onexactclick="switchBookPage(4, 3)" src="./images/ui/menu/mailbox.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-5" data-index="1"><img onexactclick="switchBookPage(5, 1)" src="./images/ui/menu/pvp-1.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-5" data-index="2"><img onexactclick="switchBookPage(5, 2)" src="./images/ui/menu/craft.png"></div>

		<div class="w-100 menu-sub-button animate-me menu-sub-button-8" data-index="1"><img onexactclick="switchBookPage(8, 1)" src="./images/ui/menu/store2.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-8" data-index="2"><img onexactclick="switchBookPage(8, 2)" src="./images/ui/menu/luck.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-8" data-index="3"><img onexactclick="switchBookPage(8, 3)" src="./images/ui/menu/calendar.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-9" data-index="1"><img onexactclick="switchBookPage(9, 1)" src="./images/ui/menu/tools.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-9" data-index="2"><img onexactclick="switchBookPage(9, 2)" src="./images/ui/menu/question.png"></div>
	</div>`;	
}
function getRightMenuTemplate(_index) {
	const _gc = __account.misc?.find(x => x.type === 'ticket-gold')?.count ?? 0;
	const _ec = __account.misc?.find(x => x.type === 'ticket-exp')?.count ?? 0;
	const _ic = __account.misc?.find(x => x.type === 'ticket-item')?.count ?? 0;
	const _pc = __account.misc?.find(x => x.type === 'ticket-pass')?.count ?? 0;
	return `<div class="menu-right flex-ai-end flex">
		<div onexactclick="tryUseStoryTicket(3,1,2,'exp')" class="w-100 menu-sub-button animate-me menu-sub-button-3-1" data-index="2"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-exp.png" /><div class="story-ticket-count story-exp-ticket-count${_ec > 0 ? '' : ' no-ticket'}">${_ec > 999 ? '999+' : _ec}</div></div>
		<div onexactclick="tryUseStoryTicket(3,1,3,'gold')" class="w-100 menu-sub-button animate-me menu-sub-button-3-1" data-index="3"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-gold.png" /><div class="story-ticket-count story-gold-ticket-count${_gc > 0 ? '' : ' no-ticket'}">${_gc > 999 ? '999+' : _gc}</div></div>
		<div onexactclick="tryUseStoryTicket(3,1,4,'item')" class="w-100 menu-sub-button animate-me menu-sub-button-3-1" data-index="4"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-item.png" /><div class="story-ticket-count story-item-ticket-count${_ic > 0 ? '' : ' no-ticket'}">${_ic > 999 ? '999+' : _ic}</div></div>
		<div onexactclick="tryUseStoryTicket(3,1,5,'pass')" class="w-100 menu-sub-button animate-me menu-sub-button-3-1" data-index="5"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-pass.png" /><div class="story-ticket-count story-pass-ticket-count${_pc > 0 ? '' : ' no-ticket'}">${_pc > 999 ? '999+' : _pc}</div></div>
		<div onexactclick="zoomInWorldMap()" class="w-100 zoom-in menu-sub-button animate-me menu-sub-button-3-3${__storyPlaying ? ' disabled gray' : ''}" data-index="4"><img src="./images/ui/menu/plus.png"></div>
		<div onexactclick="zoomOutWorldMap()" class="w-100 zoom-out menu-sub-button animate-me menu-sub-button-3-3${__storyPlaying ? '' : ' disabled gray'}" data-index="5"><img src="./images/ui/menu/minus.png"></div>
	</div>`;	
}
function zoomInWorldMap(_act) {
	const _ref = getRef('world');
	const _btns = document.querySelectorAll('.menu-sub-button-3-3');
	if(_ref) {
		_ref.render(null, true);
		const _zi = _btns[0];
		const _zo = _btns[1];
		addClass(_zi, 'disabled');
		addClass(_zi, 'gray');
		removeClass(_zo, 'disabled');
		removeClass(_zo, 'gray');
	}
}
function zoomOutWorldMap() {
	const _ref = getRef('world');
	const _btns = document.querySelectorAll('.menu-sub-button-3-3');
	if(_ref) {
		_ref.render(null, false);
		const _zi = _btns[0];
		const _zo = _btns[1];
		addClass(_zo, 'disabled');
		addClass(_zo, 'gray');
		removeClass(_zi, 'disabled');
		removeClass(_zi, 'gray');
	}
}
function updateRightMenuTemplate(_index) {
	const _ec = __account.misc?.find(x => x.type === 'ticket-exp')?.count ?? 0;
	const _gc = __account.misc?.find(x => x.type === 'ticket-gold')?.count ?? 0;
	const _ic = __account.misc?.find(x => x.type === 'ticket-item')?.count ?? 0;
	const _pc = __account.misc?.find(x => x.type === 'ticket-pass')?.count ?? 0;
	const _exp = document.querySelector('.menu-right .story-exp-ticket-count');
	_exp.innerText = _ec > 999 ? '999+' : _ec;
	if(_ec < 1)
		addClass(_exp, 'no-ticket');
	else
		removeClass(_exp, 'no-ticket');
	const _gold = document.querySelector('.menu-right .story-gold-ticket-count');
	_gold.innerText = _gc > 999 ? '999+' : _gc;
	if(_gc < 1)
		addClass(_gold, 'no-ticket');
	else
		removeClass(_gold, 'no-ticket');
	const _item = document.querySelector('.menu-right .story-item-ticket-count');
	_item.innerText = _ic > 999 ? '999+' : _ic;
	if(_ic < 1)
		addClass(_item, 'no-ticket');
	else
		removeClass(_item, 'no-ticket');
	const _pass = document.querySelector('.menu-right .story-pass-ticket-count');
	_pass.innerText = _pc > 999 ? '999+' : _pc;
	if(_pc < 1)
		addClass(_pass, 'no-ticket');
	else
		removeClass(_pass, 'no-ticket');
}

function tryUseStoryTicket(_x, _y, _z, _key) {
	const _t = __account.misc?.find(x => x.type === 'ticket-' + _key)?.count ?? 0;
	if(_t > 0)
		selectRightMenuSubItem(_x, _y, _z);
	else
		warn('<span>' + getLangData('No ticket to use') + '</span>', 'warn');
}

function selectRightMenuSubItem(_x, _y, _z) {
	const _m = document.querySelector('.menu-right .menu-sub-button.menu-sub-button-' + _x + '-' + _y + '[data-index="' + _z + '"]');
	if(hasClass(_m, 'selected'))
		removeClass(_m, 'selected');
	else
		addClass(_m, 'selected');
}
function howToGainGold() {
	showInfo({
		titles: {
			en: 'How To Gain Gold',
			tr: 'Nasıl Altın Kazanılır'
		},
		navigations: [
			{ icon:'quest', titles: {
				en: 'Playing Story',
				tr: 'Hikaye Oynamak'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(3, 1);
			}},
			{ icon:'world', titles: {
				en: 'Gold Hunt',
				tr: 'Altın Avı'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(3, 3);
			}},
			{ icon:'lottery', titles: {
				en: 'Daily Lottery',
				tr: 'Günlük Çekiliş'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(8, 2);
			}},
			{ icon:'inventory', titles: {
				en: 'Selling Items',
				tr: 'Ekipman Satma'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(1, 1);
			}}
		]
	})
}
function howToGetStronger() {
	showInfo({
		titles: {
			en: 'How To Get Stronger',
			tr: 'Nasıl Güçlenirim'
		},
		navigations: [
			{ icon:'quest', titles: {
				en: 'Playing Story',
				tr: 'Hikaye Oynamak'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(3, 1);
			}},
			{ icon:'world', titles: {
				en: 'Challange Tower',
				tr: 'Kule Oynamak'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(3, 3);
			}},
			{ icon:'skill', titles: {
				en: 'Upgrade Skill',
				tr: 'Yetenek Yükselt'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(1, 1);
			}},
			{ icon:'talent', titles: {
				en: 'Upgrade Talent',
				tr: 'Beceri Yükselt'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(1, 2);
			}},
			{ icon:'inventory', titles: {
				en: 'Upgrade Items',
				tr: 'Ekipman Yükselt'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(1, 1);
			}}
		]
	})
}
function getTopMenuTemplate(_index) {
	return `<div class="menu-top flex w-100">
		<div class="menu-top-item flex">
			<span onexactclick="howToGainGold()">+</span>
			<img src="./images/icons/coin.png" />
		</div>
		<div class="menu-top-item flex flex-jc-start" id="main-gold-count">
			${__account.gold.formatWithDots()}
		</div>
		<div class="menu-top-item flex">
			<span>+</span>
			<img src="./images/icons/honor.png" />
		</div>
		<div class="menu-top-item flex flex-jc-start">
			${__account.pvp.honor.formatWithDots()}
		</div>
		<div class="menu-top-item flex">
			<span>+</span>
			<img src="./images/icons/key.png" />
		</div>
		<div class="menu-top-item flex flex-jc-start" id="main-ticket-count">
			${__account.storyTicket > 999 ? '999+' : __account.storyTicket}
		</div>
		<div class="menu-top-item flex">
			<span>+</span>
			<img src="./images/icons/pot.png" />
		</div>
		<div class="menu-top-item flex flex-jc-start" id="main-pot-count-menu">
			${(__account.pots?.find(x => x.key === 'pot')?.length ?? 0).formatWithDots()}
		</div>
		<div class="menu-top-item flex">
		</div>
		<img onexactclick="hideMyMenu()" src="./images/icons/close.png" class="gray top-menu-close animate-me" />
	</div>`;	
}
function updateMenuBottom(_order) {
	let _mmb = document.querySelectorAll('.main-menu-btn');
	if(!_mmb?.[0]) {
		const _div = document.createElement('div');
		_div.innerHTML = getBottomMenuTemplate(_order);
		let _menuUI = document.querySelector('#menu-ui');
		if(!_menuUI){
			showMyModalPopUp('game-menu');
			_menuUI = document.querySelector('#menu-ui');
		}
		_menuUI.appendChild(_div.firstChild); 
		const _div1 = document.createElement('div');
		_div1.innerHTML = getRightMenuTemplate(_order);
		document.querySelector('#menu-ui').appendChild(_div1.firstChild); 
		const _div2 = document.createElement('div');
		_div2.innerHTML = getLeftMenuTemplate(_order);
		document.querySelector('#menu-ui').appendChild(_div2.firstChild); 
		const _div3 = document.createElement('div');
		_div3.innerHTML = getTopMenuTemplate();
		document.querySelector('#menu-ui').appendChild(_div3.firstChild); 
		_mmb = document.querySelectorAll('.main-menu-btn');
	}
	else {
		const _old = document.querySelector('.menu-right');
		if(_old)
			updateRightMenuTemplate(_order);
	}
	_mmb.forEach(x => removeClass(x, 'selected'));
	addClass(_mmb[_order], 'selected');
}
function selectMenuContainer(_order) {
	let _container = document.querySelector('#menu-ui:has(.menu-bottom)');
	if(_container)
		_container = _container.firstChild;
	else {
		_container = document.getElementById('menu-ui');
		if(!_container){
			showMyModalPopUp('game-menu');
			_container = document.getElementById('menu-ui');
		}
	}
	return _container;
}
function trySwitchMap(_id) {
	playClick(); 
	const _map = mapSprites.find(x => x.id === _id);
	if(mainCharacter.level < _map.minLevel) {
		warn('<span>' + getLangData('Your level is too low') + '</span>', 'warn');
		return;
	}
	hideMyModalPopUp(1); 
	//closeMapInfoModal();
	switchMap(_id);
}
function restartPVPMatch() {
	switchMap(episode.id);
}
function createBattleGround(_map) {
	_coopMembers = [];
	if(_map && !_map.pvp) {
		if (_map.mobs?.length > 1) {
			console.log('thief ekleniyor');
			const p1 = addThiefCoopCharacter(1, 1);
			p1.yPosition = MathRound((getGroundHeight() / 6) * 5);
			p1.left = MathRound(_canvas.width / 4);
			p1.direction = 'right';
			p1.setAutoMode(2);
			p1.sight = 10000;
			p1.level = 10;
		}
		if (_map.mobs?.length > 2) {
			console.log('archer ekleniyor');
			const p2 = addArcherCoopCharacter(1, 1);
			p2.left = MathRound(_canvas.width / 4);
			p2.direction = 'right';
			p2.setAutoMode(2);
			p2.yPosition = MathRound(getGroundHeight() / 6);
			p2.sight = 10000;
			p2.level = 10;
		}
	}
	mainCharacter.level = 10;
	mainCharacter.dead = false;
	prevPlatformX = undefined;
		mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
	if(mainCharacter.leader || episode.id === 8) {
		platformX = 0;
		mainCharacter.left = MathRound(_canvas.width / 5);
		mainCharacter.direction = 'right';
	}
	else {
		platformX = episode.width - _canvas.width;
		mainCharacter.left = _canvas.width - MathRound(_canvas.width / 5) - mainCharacter.getWidth();
		mainCharacter.direction = 'left';
	}
	resetSkills(null);
	//__account.commonInventory = [];
}

function createArena(_opponent) {
	const _map = mapSprites.find(x => x.id === 500);
	const _ms = mapSprites.filter(x => !x.currentFloor && !x.still);
	const _assetMap = _ms[getRandomValue(0, _ms.length - 1)];
	_map.assetPath = _assetMap.theme;
	const _doFunc = _assetMap.do;
	_map.do = function() { 
		if(_doFunc) 
			_doFunc(); 
	};
	const _afterFunc = _assetMap.after;
	_map.after = function() { 
		if(_afterFunc) 
			_afterFunc();
	};
	_map.ambiancePath = './images/music/' + getRandomValue(1, 14) + '.mp3';
	_map.tiles = JSON.parse(JSON.stringify(_assetMap.tiles ?? []));
	_map.ground = JSON.parse(JSON.stringify(_assetMap.ground));
	if(_assetMap.background)
		_map.background = JSON.parse(JSON.stringify(_assetMap.background));
	else
		delete _map.background;
	_map.objects = []; //JSON.parse(JSON.stringify(_assetMap.objects ?? []));
	if(_map.pvp) {
		_map.mobs = [{
			id: _opponent.id,
			minX: 5800,
			maxX: 5800,
			sight: 1000,
			count: 1,
			inventory: JSON.parse(JSON.stringify(_opponent.inventory)),
			minLevel: _opponent.level,
			maxLevel: _opponent.level,
			direction: 'left',
			name: 'Player',
			difficulty: 0,
			yPosition: MathRound(getGroundHeight() / 2)
		}];
		hideMyModalPopUp(1);
		switchMap(500, 1, function() {
			mainCharacter.dead = false;
			prevPlatformX = undefined;
			mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
			platformX = 0;
			mainCharacter.left = MathRound(_canvas.width / 5);
			mainCharacter.direction = 'right';
			resetSkills(null);
			episode.pvpOrder = _opponent.pvpOrder;
			episode.enemies?.filter(x => x.enemy)?.forEach(x => {
				applyCharacterStats(1, x);
				resetSkills(null, null, x);
				x.alp = 1;
				x.setHealth(x.getMaxHP());
				_enemyProfile.innerHTML = avatarTemplate(x);
			});
		});
	}
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	try{
		if(StatusBar)
			StatusBar.hide();
		__deviceId = device.uuid;
	}catch(ex) {

	}
	_client = new dataOperations();
	_client.loadState();
}

function floatDusts() {
	return;
	var speed = 400;
	function twinkle(id, duration) {
		const top = (Math.floor(Math.random() * 85) + 0) + '%';
		const left = (Math.floor(Math.random() * 85) + 0) + '%';
		const _rem = document.getElementById('speck' + id);
		if(_rem)
			_rem.remove();
		const _div = document.createElement('div');
		_div.className = 'speck';
		_div.id = 'speck' + id;
		document.getElementById('specks').appendChild(_div);
		const _spck = document.getElementById('speck' + id);
		_spck.style.top = top;
		_spck.style.left = left;
		_spck.style.animationDuration = duration + 's';
		_spck.style.animationTimingFunction = 'cubic-bezier(0.250, 0.250, 0.750, 0.750)';
		_spck.style.animationName = 'twinkle';
	}
	const twinkleLoop = function(i) {
		var duration = ((Math.random() * 5) + 3);
		duration = duration - ((495 - speed)/100);
		twinkle(i, duration);
		setTimeout(function() {
			twinkleLoop(i)
		}, duration * 1000);
	}
	for (let i = 1; i < 6; i++)
		twinkleLoop(i);
}
var _openingSound;
function playOpeningMusic() {
	return;
	_openingSound = document.createElement("audio");
	_openingSound.crossOrigin = 'anonymous';
	if ("src" in _openingSound)
		_openingSound.autoPlay = false;
	else
		_openingSound.preload = 'auto';
	_openingSound.volume = 1;
	_openingSound.src = "./images/sounds/opening.mp3";
	_openingSound.play();
	_openingSound.onended = function() {
		_openingSound = _closeOpeningMusic = null;
	}
}

function installOpeningScreen() {
	var _img = new Image();
	var _bg = document.getElementById('splash');
	var _opening = document.getElementById('first-splash');
	if(!_opening) {
		setTimeout(() => {
			installOpeningScreen();
		}, 1000);
		return;
	}
	document.getElementById('play-os').click();
	var _wrapper = document.getElementById('wrapper');
	_opening.style.width = MathRound(_wrapper.clientWidth * 1.02) + 'px';
	_opening.style.height = '100vh';
	_bg.style.background = 'url(./images/icons/logo-rect.png), linear-gradient(0deg, #000, #000)'
	_bg.style.backgroundSize = '25%, cover';
	_bg.style.backgroundRepeat = 'no-repeat, repeat';
	_bg.style.backgroundPosition = 'center, center';
	_img.onload = function() {
		setTimeout(() => {
			_opening.style.opacity = 0;
			document.getElementById('connect-btn').innerText = getLangData('CONNECT');
			removeClass(_opening, 'd-none');
			_opening.style.background = 'url(./images/loading/0.png), linear-gradient(0deg, #000, #000)'
			_opening.style.backgroundSize = 'contain, cover';
			_opening.style.backgroundRepeat = 'no-repeat, repeat';
			_opening.style.backgroundPosition = 'center, center';
			addClass(_opening, 'fade-start');
			setTimeout(function() {
				_opening.style.opacity = 1;
				_bg.style.background = '#000';
			}, 1000);
		}, 1000);
	}
	_img.src = './images/loading/0.png';
}
setTimeout(function() {
	installOpeningScreen();
}, 2000);

const hideModal = function() {
	PlaySound({ key: 'page', volume:.3 });
	hideMyModalPopUp();
}

// const __types = ['fire', 'toxic', 'common', 'lightning', 'ice'];
// let __typeIndex = 0;
// setInterval(function() {
// 	try	{
// 		const _dmg = getRandomValue(100, 999);
// 		if(getRandomValue(1, 5) === 1)
// 			dmgFrames.push({
// 				dmg: _dmg,
// 				atkType: 'critical',
// 				x: mainCharacter.getLeft() - __dmgFrameDistance,
// 				y: _canvas.height - mainCharacter.yPosition - mainCharacter.getHeight() - __dmgFrameDistance
// 			});
// 		else
// 			dmgFrames.push({
// 				atkType: __types[(++__typeIndex % 5)],
// 				dmg: _dmg,
// 				x: mainCharacter.getLeft(),
// 				y: _canvas.height - mainCharacter.yPosition - mainCharacter.getHeight()
// 			});
// 	}
// 	catch(e) {

// 	}
// }, 2000)
function spawnMob(_json, _func, _noAnimation, _noSund) {
		let _respawner = episode.installMob(_json, _func, 1, 1);
		if(!_respawner.animations.respawn)
			_respawner.animations.respawn = {
				key: 'respawn',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteOrigin: 0,
						spriteHeight: _respawner.getHeight(),
						objects: _noAnimation ? undefined : [{ 
							key:'respawn', 
							position: 'middle',
							scale: (_respawner.zoom * _respawner.height) / 100
						}],
						sound: (_noAnimation || _noSund) ? undefined : { key: 'puff', volume: .3, reset: true },
						speed: _noAnimation ? 1 : 20,
						def: { iframe: true }
					}
				]
			};
		_respawner.animate('respawn', 1);
		return _respawner;
}
var __latestUIModule = {};
function getRef(_name) {
	return __latestUIModule[_name]?.ref;
}
function installWorldMap() {
	injectModule('world', function(_arr, _name) {
		var x = new world();
		x.render();
		switchBookPageTabs(3, 3);
		checkUpdateAvailable2(3);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function installTalents() {
	injectModule('talent', function(_arr, _name) {
		var x = new talent();
		x.render();
		switchBookPageTabs(2, 2);
		checkUpdateAvailable2(2);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function installDailyLogin() {
	injectModule('dailylogin', function(_arr, _name) {
		var x = new dailylogin();
		x.render();
		switchBookPageTabs(8, 3);
		checkUpdateAvailable2(8);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function installMailbox() {
	injectModule('mailbox', function(_arr, _name) {
		var x = new mailbox();
		x.render();
		switchBookPageTabs(4, 2);
		checkUpdateAvailable2(4);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function detachModule() {
	const _keys = Object.keys(__latestUIModule);
	if(_keys?.[0]) {
		try {
			for(let _k of _keys){
				const refs = document.querySelectorAll('*[data-module=' + _k + ']');
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