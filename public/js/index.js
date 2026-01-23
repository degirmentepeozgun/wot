"use strict"
const setFps = (function () {

	let _timer = null;

	return function (_val, _step) {

		if (_timer) {
			clearTimeout(_timer);
			_timer = null;
		}

		fps = _val;

		if (fps <= 0) fps = 1;
		if (fps > _defaultFPS) fps = _defaultFPS;

		msPerFrame = 900 / fps;

		if (fps === _defaultFPS)
			return;

		_timer = setTimeout(function () {
			setFps(MathRound(fps + (_defaultFPS / (_step ?? 15))), _step);
		}, 200);
	};

})();
var _gameTick, _extraTick = 0;
function animate(_tick) {
	if (!_startAnimate) {
		requestAnimationFrame(animate);
		return;
	}
	msNow = Date.now();
	_gameTick = msNow; //MathFloor(_tick) - _extraTick;
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
	//if (!_renderDmgFrame)
		drawDmgFrames();
	//else
	//	_renderDmgFrame--;
	if(__storyTell)
		__storyTell.render();
	
	const _moved = episode.tinyMoveCamera();
	if(_moved)
		prevPlatformX = undefined;
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
		//loadSounds();
		//loadRelatedImages();
	}
	loadSceneSounds();
	const _map = mapSprites.find(x => x.id === _ep.id);
	const _enemies = []; //['01', '02', '03'];
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
	const _assetsProgress = document.getElementById('assets-progress');
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
	if (!__isPC)
		setTimeout(function () {
			addClass(document.body, 'mobile-device');
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
function startWithThisCharacter(_id, _level, _select, _noSound) {
	removeCoopCharacter(1);
	const _clone = _allEnemies['enemy' + _id]();
	addCoopCharacter(null, _clone.class, 1, _level, 1, _select);
	_squadMemberKey = _clone.class;
	switchCharacter(1, 1, _noSound);
	if(_level && mainCharacter.level !== _level)
		mainCharacter.level = _level;
	removeCoopCharacter(1);
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
	mainCharacter.setHealth(mainCharacter.MAXHP);
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

function addCoopCharacter(_char, _prefix, _append, _level, _nowarn, _select) {
	if(mainCharacter && mainCharacter.deadTime)
		return;
	if ((episode?.pvp && !episode.realTime) || episode?.dungeon) {
		warn('<span>' + getLangData('Unable to use in that zone') + '</span>', 'warn');
		return;
	}
	if (_coopMembers?.length >= 2)
		return;
	if (!_char) {
		_char = getCharacterJSON(_prefix);
		if (!_char) {
			if(!_nowarn)
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
	if(_level)
		_coopMember.level = _level;
	_client.setCharacterValues(_coopMember, _select, _level);
	setCharacterDefaults(_coopMember);
	_coopMember.yPosition = getRandomValue(MathRound(getGroundHeight() * .1), MathRound(getGroundHeight() * .9));
	episode.enemies.push(_coopMember);
	_navbar.innerHTML += avatarTemplate(_coopMember);
	addClass(addPlayer, 'd-none');
	_coopMember.left = mainCharacter.SCREENLEFT + (platformX ?? 0);
	let _randomLeft = getRandomValue(0, MathRound(_canvas.width / 20)) - MathRound(_canvas.width / 10);
	_coopMember.left += _randomLeft;
	if (_coopMember.left < minLeft)
		_coopMember.left = minLeft;
	return _coopMember;
}

function reviveAtLobby(_char, _func) {
	hideMyModalPopUp();
	hideMyMenu();
	hideMenu();
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
	return;
	addClass(_gamePad, 'ghost-mode');
	mainCharacter.ghost = true;
	setCharacterDefaults(mainCharacter);
	resetSkills(null);
	mainCharacter.idle();
	mainCharacter.deadTime = mainCharacter.remove = mainCharacter.immobilize = undefined;
}
function switchCharacter(_force, _nowarn, _noSound, _checkCooldown) {
	if(!episode?.entertainment) {
		if (!_force)
			return;
		if (episode.pvp && !episode.realTime)
			return;
	}
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
	if (_checkCooldown && (mainCharacter.switchTime && ((_gameTick - mainCharacter.switchTime) < 3000))) {
		warn('<span>' + getLangData('Can not switch right now') + '</span>', 'warn');
		return;
	}
	// else {
		// mainCharacter.animate('idle', 1);
		// _x.animate('idle', 1);
		_startAnimate = false;
	//}
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
	if(!episode.still) {
		const _scrLeft = _coopLeft - platformX;
		const _scrDiff = MathRound(_scrLeft - (_canvas.width / 2));
		//platformX += _scrDiff;
		const _centerOfScreen = MathRound(_canvas.width / 2);
		_coopMembers[0].left += platformX;
		if(!episode.still)
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
		prevPlatformX = undefined;
	}
	else {
		_coopMembers[0].left += platformX;
		mainCharacter.left -= platformX;
	}
	mainCharacter.unseen = false;
	_coopMembers[0].setAutoMode(2);
	// mainCharacter.main = true;
	// mainCharacter.friendly = false;
	// const _scrLeft = mainCharacter.getExactLeft();
	// const _leftDiff = _scrLeft - (_canvas.width / 2);
	// const _oldPlatformX = platformX;
	// platformX += MathRound(_leftDiff);
	// _coopMembers[0].left += _oldPlatformX;
	// mainCharacter.left -= platformX;
	_client.setCharacterValues(mainCharacter, null);
	_squadMemberKey = _coopMembers[0].class;
	if(!_noSound)
		PlaySound({ key: mainCharacter.class + 'select' + getRandomValue(1, 2), volume: .5 });
	_startAnimate = true;
	_client.loadItems();
	clearChainSkills();
}
const _tipChoices = [];
function createTipsUI(_tipOrder, _showCurrent) {
	const _count = _tips.length;
	const _current = _tipOrder + 1;
	let _images = '';
	// for(let i = 1; i <= (_tips[_tipOrder].imageCount ?? 1); i++)
	// 	_images += `<img class="tip-img" style="height:100%" src="./images/tips/${_tipOrder}-${i}.png" onerror="this.remove()" />`;
	let _html = 
	`<div id="tip-screen" class="full" style="background:url(./images/loading/${getRandomValue2(1, 7)}.png);background-size:contain;background-position:center;background-repeat:no-repeat"><div class="flex" style="padding:0 2vw;width:100%;height:40%">
		
	</div>
	<div class="flex tip-bg-image" style="width:100%;height:60%">`
		+ _images +
	`</div></div>`;
	setTimeout(() => {
		document.getElementById('loading-tip').innerHTML = `<div class="tip-wrapper flex flex-ai-start">
			<div style="padding:0 3vh;text-align:right"> 
				${getLangData('Tip')}<span id="tip-current">${_showCurrent ? ' ' + _current.toString() + '/' + _count.toString() : ': '}</span>
			</div>
			<div class="flex flex-jc-start" style="flex:1;padding:0 3vh 0 0">
				${_tips[_tipOrder][getLang()]}
			</div>
		</div>`;
	}, 20);
	return _html;
}
function initMainCharacter() {
	const _mh = mainCharacter?.health;
	const _me = mainCharacter?.experience;
	const _mme = mainCharacter?.maxExperience;
	mainCharacter = _store.getMainCharacter();
	if(_mh) {
		mainCharacter.health = _mh;
		mainCharacter.experience = _me;
		mainCharacter.maxExperience = _mme;
	}
	_store.setCharacterStats();
	if (!mainCharacter.keyboard)
		setKeyBoard(mainCharacter);
	else
		mainCharacter.keyboard.holdingKeys = [];
	return _mh;
}
function setTip() {
	const _splash = document.getElementById('splash');
	if (_splash) {
		_splash.style.display = 'flex';
		_splash.style.opacity = '.99';
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
	return _splash;
}
function switchMap(_x, _force, _func, _effect, _ss, _onEnd) {
	if(__switchingMap)
		return;
	_game.suspended = 1;
	if(mainCharacter) {
		const _maph = mapSprites.find(x => x.id === _x);
		if(mainCharacter.level < _maph.minLevel) {
			warn('<span>' + getLangData('Your level is too low') + '</span>', 'warn');
			return;
		}
	}
	closeInventoryQuestionModal(1);
	const _map = mapSprites.find(x => x.id === _x);
	if(episode)
		episode.dispose();
	__switchingMap = true;
	hideMyModalPopUp();
	removeClass(_gamePad, 'ghost-mode');
	__queue.length = 0;
	_startAnimate = false;
	const _splash = setTip();
	prevPlatformX = undefined;
	frames = 0;
	if (episode?.bgSound) {
		episode.bgSound.pause();
		episode.bgSound.currentTime = 0;
	}
	const _dungeonFloor = episode?.currentFloor;
	const _oldSeason = episode?.season ?? 0;
	if(mainCharacter)
		mainCharacter.platformX;
	platformX = 0;
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
	let hasMainCharacter = initMainCharacter();
	_store.minPosX = -1 * MathRound((mainCharacter.width / 2) * __zoom);
	_store.maxPosX = _canvas.width - MathRound((mainCharacter.width / 2) * __zoom);
	if (_dungeonFloor && episode.dungeon && episode.floors > _dungeonFloor)
		episode.currentFloor = _dungeonFloor + 1;
	const _isBattleGround = _map?.battleGround || _map?.pvp;
	const _isTower = _map?.tower;
	const _isMission = _map?.tower || _map?.gold;
	const _f = _force;
	getMapAssets(episode, function () {
		startGame(function (_connectingToGame) {
			loadUI();
			if(episode.still) {
				mainCharacter.left = MathRound(_canvas.width / (_map.enterDirection === __left ? 5 : 2));
				mainCharacter.direction = __right;
				mainCharacter.platformX = platformX = MathRound(episode.width / 2) - mainCharacter.left - (_map.enterDirection === 'left' ? MathRound((_canvas.width / 2) - (_canvas.width / 5)) : 0);
			}
			else if(_ss?.from === __right && _ss?.from !== __left) {
				mainCharacter.left = MathRound((_canvas.width * .8) - mainCharacter.getWidth());
				mainCharacter.direction = __left;
				mainCharacter.platformX = platformX = MathRound(episode.width - _canvas.width);
			}
			else
			{
				mainCharacter.left = MathRound(_canvas.width / 5);
				mainCharacter.direction = __right;
				mainCharacter.platformX = platformX = 0;
			}
			_client.setCharacterValues(mainCharacter, 1);
			setCharacterDefaults(mainCharacter);
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
			mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
			mainCharacter.immobilize = false;
			mainCharacter.animate('idle', 1);
			mainCharacter.lastActivity = _gameTick;
			mainCharacter.enableSkillUI();
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
					x.setHealth(x.MAXHP, null, null, 8);
					x.killedBy = undefined;
					x.grayAvatar = false;
				});
			const _activeCoolDowns = document.querySelectorAll('.skill .counter');
			if(_activeCoolDowns?.[0])
				for(let _acd of _activeCoolDowns)
					_acd.remove();
			let _startWith = _ss?.startWith;
			if(_startWith && (mainCharacter?.id % 10000) !== _startWith)
				startWithThisCharacter(_startWith, null, null, 1);
			setTimeout(function() {
				if(_onEnd)
					_onEnd();
				else {
					addClass(_splash, 'd-none');
					document.getElementById('tip-screen').remove();
				}
				const _loading = document.getElementById('game-start-loading');
				episode.drawSpriteObjects2();
				if(!episode.realTime)
					_client.loadItems(hasMainCharacter);
				updateQuestArea();
				__account.questStatus.dialogOrder = __account.questStatus.dialogArr = undefined;
				__switchingMap = false;
				if(!episode.pvp)
					episode.pvp = _isMission;
				if(episode.pvp){
					addClass(document.getElementById('pot-btn'), 'not-allowed');
					if(!episode.gold)
						addClass(document.getElementById('world-mini-map'), 'd-none');
				}
				else {
					removeClass(document.getElementById('pot-btn'), 'not-allowed');
					removeClass(document.getElementById('world-mini-map'), 'd-none');
				}
				closeUserActionsModal();
				if(_isTower)
					setTowerMobsByLevel();
				else if(_isMission) {
					episode.enemies?.forEach(x => x.immobilize = true);
					if(episode.gold) {
						const _e = episode.enemies.find(x => x.enemy);
						if(_e)
							mainCharacter.yPosition = _e.yPosition;
						removeCoopCharacter(1);
						const _gm = __account.missions.find(x => x.key === 'gold');
						_gm.current++;
						_gm.lastActivity = _gameTick;
						_client.saveState(1);
					}
				}
				if(_unarmed)
					mainCharacter.unarm();
				if(_startWith)
					mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
				else if(_startWith === 0)
					mainCharacter = undefined;
				if(__storyScene?.afterInit)
					__storyScene.afterInit();
				if(!_storySceneSwitching)
					_game.suspended = false;
				if(!episode?.menu && mainCharacter?.yPosition > getGroundHeight() && !episode?.pvp)
					mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
				if(episode && !episode.menu) {
					episode.enemies?.forEach(x => {
						resetSkills(null, null, x);
						x.hbBars = undefined;
						x.maxHP = x.MAXHP = x.health;
						x.setHealth(x.MAXHP);
					});
					updateLevelUI(mainCharacter);
				}
				removeClass(_gameUI, 'ghost');
				disposeFocus();
				if(__particles)
					__particles.cancel();
				if(episode.war)
					_gameUI.setAttribute('data-mapid', 'war');
				else if(_gameUI.hasAttribute('data-mapid'))
					_gameUI.removeAttribute('data-mapid');
				for(let i = 1; i < 5; i++) {
					const cfc = chainSkills['skill' + i].firstChild;
					cfc.removeAttribute("src");
				}
				blurKeyboard();
				resetTouchPad();
				checkPC();
				clearStatusBoard();
			}, 2000);
		});
	});
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
function clearStatusBoard() {
	const _board = document.querySelector('.game-status-screen');
	if(_board)
		_board.remove();
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
	setTimeout(async function () {
		const _isHEDevice = await isHighEndDevice();
		if(!_isHEDevice)
			__scale = 2;
		if(_openingSound)
			_closeOpeningMusic = 1;
		//alert((__scale === 2 ? 'Low' : 'High') + '-end device detected');
		setWindowVariables();
		// switchMap(testMap ?? 1, null, function () {
		// 	for (var i = 1; i <= Object.keys(chainSkills).length; i++)
		// 		addClass(chainSkills['skill' + i], 'd-none');
		// 	addClass(document.getElementById('first-splash'), 'd-none');
		// 	removeClass(document.getElementById('game-start-loading-wrapper'), 'd-none');
		// });
		if(!__account.lastLobbyUsage)
			startStory(1);
		else {
			//__storySceneOrder = __account.lastLobbyUsage.sceneOrder;
			__storySceneOrder = 1;
			startStory(__stories.find(x => x.act === __account.act && x.lobby).id, null, 1);
		}
		_client.loadGold();
		_client.loadPots();
		__account.onlineStart = Date.now();
		if(__account.name)
			connectSocket();
		_client.saveState();
		updateQuestArea();
		setNewKeyCombinations();
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
	episode.centerLeft = MathRound(((mainCharacter.platformX + mainCharacter.SCREENLEFT) / __zoom));
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
		x.setHealth(x.MAXHP);
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
	_c.keyboard = new keyboard(_c, [
		__account.keyboard?.[0]?.toLowerCase() ?? 'a', 
		__account.keyboard?.[5]?.toLowerCase() ?? 'g', 
		__account.keyboard?.[1]?.toLowerCase() ?? 'd', 
		__account.keyboard?.[6]?.toLowerCase() ?? ' ', 
		__account.keyboard?.[4]?.toLowerCase() ?? 'h', 
		__account.keyboard?.[7]?.toLowerCase() ?? 'j', 
		__account.keyboard?.[8]?.toLowerCase() ?? 'k', 
		__account.keyboard?.[9]?.toLowerCase() ?? 'l', 
		__account.keyboard?.[10]?.toLowerCase() ?? 'e', 
		__account.keyboard?.[11]?.toLowerCase() ?? 'q', 
		__account.keyboard?.[14]?.toLowerCase() ?? 'r', 
		__account.keyboard?.[13]?.toLowerCase() ?? 'f', 
		'arrowleft', 
		'arrowup', 
		'arrowright', 
		'arrowdown', 
		__account.keyboard?.[2]?.toLowerCase() ?? 'w', 
		__account.keyboard?.[3]?.toLowerCase() ?? 's', 
		__account.keyboard?.[15]?.toLowerCase() ?? 'u', 
		__account.keyboard?.[17]?.toLowerCase() ?? '1', 
		__account.keyboard?.[18]?.toLowerCase() ?? '2', 
		__account.keyboard?.[19]?.toLowerCase() ?? '3', 
		__account.keyboard?.[20]?.toLowerCase() ?? '4', 
		__account.keyboard?.[16]?.toLowerCase() ?? 'p', 
		__account.keyboard?.[12]?.toLowerCase() ?? 't'
	]);
}
function addEvent(_id, _char) {
	const _skillbtn = document.getElementById(_id);
	_skillbtn.addEventListener("mousedown", function() {
		//mainCharacter.keyboard.mouseDown(_char);
		physicalKeys.add(_char);
	});
	_skillbtn.addEventListener("mouseup", function() {
		//mainCharacter.keyboard.mouseUp(_char);
		physicalKeys.delete(_char);
	});
	_skillbtn.addEventListener("mouseout", function() {
		//mainCharacter.keyboard.mouseUp(_char);
		physicalKeys.delete(_char);
	});
	_skillbtn.addEventListener("touchcancel", function() {
		//mainCharacter.keyboard.mouseUp(_char);
		physicalKeys.delete(_char);
	});
	_skillbtn.addEventListener("touchend", function() {
		//mainCharacter.keyboard.mouseUp(_char);
		physicalKeys.delete(_char);
	});
	_skillbtn.addEventListener("touchstart", function() {
		//mainCharacter.keyboard.mouseDown(_char);
		physicalKeys.add(_char);
	});
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
			_enemyProfile.innerHTML = `<div data-key="1" data-new-key="${document.getElementById('common-skill-1')?.getAttribute?.('data-new-key')}" id='common-skill-1' class="flex common"></div>
					<div data-key="2" id='common-skill-2' data-new-key="${document.getElementById('common-skill-2')?.getAttribute?.('data-new-key')}" class="flex common"></div>
					<div data-key="3" id='common-skill-3' data-new-key="${document.getElementById('common-skill-3')?.getAttribute?.('data-new-key')}" class="flex common"></div>
					<div data-key="4" id='common-skill-4' data-new-key="${document.getElementById('common-skill-4')?.getAttribute?.('data-new-key')}" class="flex common"></div>`;
			removeClass(_enemyProfile, 'pvp');
			_commons = document.querySelectorAll('.common');
			_char.checkCommonInventory();
			setTimeout(() => {
				addEvent('common-skill-1', document.getElementById('common-skill-1')?.getAttribute?.('data-new-key'));
				addEvent('common-skill-2', document.getElementById('common-skill-2')?.getAttribute?.('data-new-key'));
				addEvent('common-skill-3', document.getElementById('common-skill-3')?.getAttribute?.('data-new-key'));
				addEvent('common-skill-4', document.getElementById('common-skill-4')?.getAttribute?.('data-new-key'));
			}, 20);
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
			_char.setHealth(_char.MAXHP, 0, 0, 10);
		else
			if (!_client.loadHP(_char))
				_char.setHealth(_char.MAXHP, 0, 0, 9);
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

function hideMenu() {
	const _upperDiv= document.querySelector('.lobby-navbar');
	if(_upperDiv)
		_upperDiv.remove();
}
function hideMyMenu(_noSound) {
	if(_warMatchInProgress)
		return;
	_dialogAppeared = false;
	if(!__switchingMap && !_storySceneSwitching)
		_game.suspended = false;
	if(episode && !_noSound)
		playClick();
	const _mbd = document.querySelector('.menu-backdrop');
	if(_mbd)
		_mbd.remove();
	if(episode?.oldBGSoundVolume){
		episode.bgSound.volume = episode.oldBGSoundVolume;
		delete  episode.oldBGSoundVolume;
	}
}
function hideMyModalPopUp(_asap) { 
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
function switchBookPage(_order, _subOrder, _tabOrder) {
	if(!(_order === 3 && _subOrder === 3) && !episode?.menu)
	{
		warn('<span>' + getLangData('Unreachable in story mode') + '</span>', 'warn');
		return;
	}
	if(_warMatchInProgress)
	{
		warn('<span>' + getLangData('War match in progress') + '</span>', 'warn');
		return;
	}
	// if(_order === 3 && _subOrder === 1 && __story && !__account.questStatus?.quest){
	// 	warn('<span>' + getLangData('No quest for now') + '</span>', 'warn');
	// 	return false;
	// }
	_game.suspended = true;
	const _removals = document.querySelectorAll('#game-menu .remove-me');
	for(let _r of _removals ?? [])
		_r.innerHTML = '';
	PlaySound({ key: 'page', volume: .3, reset: true });
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
			else if(_order === 4 && _subOrder === 2)
				installMailbox();
			else if(_order === 4 && _subOrder === 3)
				installOnlineUsers();
			// else if(_order === 4 && _subOrder === 2)
			// {
			// 	//online friends / blacklist / add friend / remove friend / pm
			// }
			else if(_order === 4)
			{
				installChat();
			}
			else if (_order === 2 && _subOrder === 2)
				installTalents();
			else if (_order === 2) {
				skill.getSkillUI(mainCharacter.class);
				checkUpdateAvailable2(_order);
			}
			else if (_order === 1 && _subOrder === 2)
				createArtifactsUI();
			else if (_order === 9 && _subOrder === 2)
				installTips();
			else if(_order === 9)
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
			else if (_order === 5 && _subOrder === 3)
				installWarUI();
			else if (_order === 5)
				__pvp.render();
			else if (_order === 6)
				installDungeonUI();
			else if (_order === 12)
				getOnlineUsersUI();
			else if(_order === 1) {
				renderInventory(null, _tabOrder ?? 1);
				checkUpdateAvailable2(_order);
			}
		}
		else {
			//removeClass(document.getElementById('book-sign-' + (i + 1)), 'selected');
			//removeClass(document.getElementById('book-content-' + (i + 1)), 'selected');
			// removeClass(_elems[i], 'selected');
			// removeClass(_elems[i + _step], 'selected');
		}
	}
	if(episode?.bgSound?.volume > 0 && episode.oldBGSoundVolume === undefined){
		episode.oldBGSoundVolume = episode.bgSound.volume;
		episode.bgSound.volume = episode.bgSound.volume / 2;
	}
	switchBookPageTabs(_order, _subOrder);
	checkUpdateAvailable2(_order);
}
function checkIfMailItemAvailable() {
	const _ma = _client.getMails();
	for(const _m of _ma)
	{
		const _mail = __account.mailbox?.find(x => x.id === _m.id);
		if(!_mail || (_m.attachment && !_mail.looted))
			return true;
	}
	return false;
}
function checkIfLotteryAvailable() {
	const _btn = document.getElementById('spinner-btn');
	if(_btn)
		_btn.innerText = getLangData('SPIN');
	const _lot = __account.missions.find(x => x.key === 'lottery');
	if(_lot.lastActivity && ((_lot.lastActivity + (1000 * 60 * 60 * 24)) > Date.now()))
	{
		if(_btn) {
			let _scr = selectMenuContainer();
			let _block = document.getElementById('lottery-block');
			if(!_block){
				_block = document.createElement('div');
				_block.id = "lottery-block";
				_block.className = "full flex event-block";
				_block.innerHTML = `<div class="spin-block flex">
										<div class="flex w-100 next-spin">${getLangData('Next Spin')}</div>
										<div class="flex w-100 next-spin-until">${getTimeDiffUntilReset()}</div>
									</div>`;
				_scr.appendChild(_block);
			}
		}
		return false;
	}
	return 1;
}
function checkIfDailyLoginGiftAvailable() {
	const _date = new Date();
	if(_date.getDate() > 28)
		return false;
	const _key = _date.getDate().toString() + '-' + (_date.getMonth() + 1).toString() + '-' + _date.getFullYear();
	return __account.monthlyLogins.indexOf(_key) === -1;
}
function checkTalentPointsAvailable() {
	const _char = __account.characters.find(x => x.class === mainCharacter.class);
	const _currentTotalTalents = _char.talents?.reduce((x, {count}) => x + count, 0);
	const _currentTalentsLimit = MathFloor(mainCharacter.level / 2);
	return _currentTalentsLimit > _currentTotalTalents;
}
function checkIfDungeonUpdate() {
	const _stories = __stories.filter(x => x.mission);
	const _resetTime = getTodayResetTimestamp();
	for(let item of _stories) {
		const _mission = __account.missions?.find(x => x.key === item.mission);
		if((_mission?.current ?? 0) < item.daily)
			return true;
		if(item.daily && _mission?.current === item.daily) {
			if((_gameTick > _resetTime || ((_resetTime - _mission.lastActivity) > (24 * 60 * 60 * 1000))) 
				&& _resetTime > _mission.lastActivity){
				return true;
			}
		}
	}
	return false;
}
function checkUpdateAvailable2(_order) {
	if(!episode?.menu)
		return;
	const _badges = document.querySelectorAll('.my-badge');
	if(_badges?.[0])
		_badges.forEach(x => removeClass(x, 'my-badge'));
	const _skills = skill.getAvailableSkills();
	const availables = [];
	for(let _skill of _skills){
		if(_skill.unlockLevel > mainCharacter.level)
			continue;
		if(_skill.level >= mainCharacter.level)
			continue;
		if(_skill.props[_skill.props.length - 1].level <= _skill.level)
			continue;
		if(_skill.list !== false && skill.calculateSkillPrice(_skill.key) <= __account.gold)
			availables.push({index:1, subIndex:0});
	}
	var _items = allPowerDiffOrItemUpgrades();
	for(const _item of _items)
			availables.push({index:0, subIndex:0});
	if(checkTalentPointsAvailable())
			availables.push({index:1, subIndex:1});
	if(checkIfGlobalQuestDone())
			availables.push({index:2, subIndex:1});
	if(__account.storyTicket > 1)
			availables.push({index:2, subIndex:0});
	if(checkIfDungeonUpdate())
			availables.push({index:5, subIndex:0});
	if(checkIfFragmentUpdate())
			availables.push({index:6, subIndex:0});
	if(checkIfStoreFreeItemAvailable())
			availables.push({index:7, subIndex:0});
	if(__lastChatCheck < __lastChatAppend || (!__lastChatCheck && __lastChatAppend))
			availables.push({index:3, subIndex:0});
	if(checkIfMailItemAvailable())
			availables.push({index:3, subIndex:1});
	if(checkIfLotteryAvailable())
			availables.push({index:7, subIndex:1});
	if(checkIfDailyLoginGiftAvailable())
			availables.push({index:7, subIndex:2});
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
		const _a = availables.filter(x=> (x.index + 1) === _order);
		if(_a?.[0]) {
			for(const a of _a) {
				const _b = document.querySelectorAll('.menu-sub-button-' + _order)?.[a.subIndex];
					if(_b)
						addClass(_b, 'my-badge');
			}
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
                <img class="animate-me" src="./images/ui/menu/dungeon.png" onexactclick="switchBookPage(6, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 6 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/puzzle2.png" onexactclick="switchBookPage(7, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 7 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/gift.png" onexactclick="switchBookPage(8, 1)" />
            </div>
            <div class="flex animate-me main-menu-btn${_index === 8 ? ' selected' : ''}">
                <img class="animate-me" src="./images/ui/menu/settings.png" onexactclick="switchBookPage(9, 1)" />
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
		<div class="w-100 menu-sub-button animate-me menu-sub-button-4" data-index="1"><img onexactclick="switchBookPage(4, 1)" src="./images/ui/menu/chat.png"></div>`
		//<div class="w-100 menu-sub-button animate-me menu-sub-button-4" data-index="2"><img onexactclick="switchBookPage(4, 2)" src="./images/ui/menu/social2.png"></div>
		+
		`<div class="w-100 menu-sub-button animate-me menu-sub-button-4" data-index="2"><img onexactclick="switchBookPage(4, 2)" src="./images/ui/menu/mailbox.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-4" data-index="3"><img onexactclick="switchBookPage(4, 3)" src="./images/ui/menu/social2.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-5" data-index="1"><img onexactclick="switchBookPage(5, 1)" src="./images/ui/menu/pvp-1.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-5" data-index="2"><img onexactclick="switchBookPage(5, 2)" src="./images/ui/menu/craft.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-5" data-index="3"><img onexactclick="switchBookPage(5, 3)" src="./images/ui/menu/war.png"></div>

		<div class="w-100 menu-sub-button animate-me menu-sub-button-6" data-index="1"><img onexactclick="switchBookPage(6, 1)" src="./images/ui/menu/exit.png"></div>
		<div class="w-100 menu-sub-button animate-me menu-sub-button-7" data-index="1"><img onexactclick="switchBookPage(7, 1)" src="./images/ui/menu/pet.png"></div>
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
		<div onexactclick="tryUseStoryTicket(3,1,2,'exp')" class="w-100 menu-sub-button${_ec > 0 ? '' : ' msb-no-ticket'} animate-me menu-sub-button-3-1" data-index="2"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-exp.png" /><div class="story-ticket-count story-exp-ticket-count${_ec > 0 ? '' : ' no-ticket'}">${_ec > 999 ? '999+' : _ec}</div></div>
		<div onexactclick="tryUseStoryTicket(3,1,3,'gold')" class="w-100 menu-sub-button${_gc > 0 ? '' : ' msb-no-ticket'} animate-me menu-sub-button-3-1" data-index="3"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-gold.png" /><div class="story-ticket-count story-gold-ticket-count${_gc > 0 ? '' : ' no-ticket'}">${_gc > 999 ? '999+' : _gc}</div></div>
		<div onexactclick="tryUseStoryTicket(3,1,4,'item')" class="w-100 menu-sub-button${_ic > 0 ? '' : ' msb-no-ticket'} animate-me menu-sub-button-3-1" data-index="4"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-item.png" /><div class="story-ticket-count story-item-ticket-count${_ic > 0 ? '' : ' no-ticket'}">${_ic > 999 ? '999+' : _ic}</div></div>
		<div onexactclick="tryUseStoryTicket(3,1,5,'pass')" class="w-100 menu-sub-button${_pc > 0 ? '' : ' msb-no-ticket'} animate-me menu-sub-button-3-1" data-index="5"><img src="./images/ui/12.png"><img class="story-ticket-img" src="./images/icons/ticket-pass.png" /><div class="story-ticket-count story-pass-ticket-count${_pc > 0 ? '' : ' no-ticket'}">${_pc > 999 ? '999+' : _pc}</div></div>
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
	playClick();
}
function zoomOutWorldMap() {
	if(!episode?.menu)
	{
		warn('<span>' + getLangData('Unreachable in story mode') + '</span>', 'warn');
		return;
	}
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
	playClick();
}
function updateRightMenuTemplate(_index) {
	const _ec = __account.misc?.find(x => x.type === 'ticket-exp')?.count ?? 0;
	const _gc = __account.misc?.find(x => x.type === 'ticket-gold')?.count ?? 0;
	const _ic = __account.misc?.find(x => x.type === 'ticket-item')?.count ?? 0;
	const _pc = __account.misc?.find(x => x.type === 'ticket-pass')?.count ?? 0;
	const _exp = document.querySelector('.menu-right .story-exp-ticket-count');
	_exp.innerText = _ec > 999 ? '999+' : _ec;
	if(_ec < 1){
		addClass(_exp, 'no-ticket');
		const _elem = document.querySelector('.menu-sub-button[data-index="2"]');
		addClass(_elem, 'msb-no-ticket');
		removeClass(_elem, 'selected');
	}
	else{
		removeClass(_exp, 'no-ticket');
		removeClass(document.querySelector('.menu-sub-button[data-index="2"]'), 'msb-no-ticket');
	}
	const _gold = document.querySelector('.menu-right .story-gold-ticket-count');
	_gold.innerText = _gc > 999 ? '999+' : _gc;
	if(_gc < 1){
		addClass(_gold, 'no-ticket');
		const _elem = document.querySelector('.menu-sub-button[data-index="3"]');
		addClass(_elem, 'msb-no-ticket');
		removeClass(_elem, 'selected');
	}
	else {
		removeClass(_gold, 'no-ticket');
		removeClass(document.querySelector('.menu-sub-button[data-index="3"]'), 'msb-no-ticket');
	}
	const _item = document.querySelector('.menu-right .story-item-ticket-count');
	_item.innerText = _ic > 999 ? '999+' : _ic;
	if(_ic < 1){
		addClass(_item, 'no-ticket');
		const _elem = document.querySelector('.menu-sub-button[data-index="4"]');
		addClass(_elem, 'msb-no-ticket');
		removeClass(_elem, 'selected');
	}
	else{
		removeClass(_item, 'no-ticket');
		removeClass(document.querySelector('.menu-sub-button[data-index="4"]'), 'msb-no-ticket');
	}
	const _pass = document.querySelector('.menu-right .story-pass-ticket-count');
	_pass.innerText = _pc > 999 ? '999+' : _pc;
	if(_pc < 1){
		addClass(_pass, 'no-ticket');
		const _elem = document.querySelector('.menu-sub-button[data-index="5"]');
		addClass(_elem, 'msb-no-ticket');
		removeClass(_elem, 'selected');
	}
	else{
		removeClass(_pass, 'no-ticket');
		removeClass(document.querySelector('.menu-sub-button[data-index="5"]'), 'msb-no-ticket');
	}
}

function unselectStoryTickets(){
	const _tix = document.querySelectorAll('.menu-right .menu-sub-button.menu-sub-button-3-1');
	for(const _m of _tix)
		if(hasClass(_m, 'selected'))
			removeClass(_m, 'selected');
}
var _uiSelectedStoryId;
function tryUseStoryTicket(_x, _y, _z, _key) {
	const _elm = document.querySelector('.skill-card.selected');
	if(!_elm) {
		warn('<span>' + getLangData('Select a story first') + '</span>', 'warn');
		return;
	}
	if(_key === 'pass') {
		const _s = __stories.find(x => x.id === _uiSelectedStoryId);
		const _ss = __account.storyResults.find(x => x.id === _uiSelectedStoryId);
		if(!_ss?.perfect) {
			warn('<span>' + getLangData('Finish story with 3 stars first') + '</span>', 'warn');
			return;
		}
	}
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
			{ icon:'achievement', titles: {
				en: 'Daily Event',
				tr: 'Günlük Etklinlik'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(3, 2);
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
function howToGainTickets() {
	showInfo({
		titles: {
			en: 'How To Gain Portal',
			tr: 'Hikaye Portalı Kazanmak'
		},
		navigations: [
			{ icon:'calendar', titles: {
				en: 'Daily Login',
				tr: 'Günlük Ödül'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(8, 3);
			}},
			{ icon:'achievement', titles: {
				en: 'Qlobal Quests',
				tr: 'Global Görevler'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(3, 2);
			}},
			{ icon:'shop', titles: {
				en: 'Shop',
				tr: 'Dükkan'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(8, 1);
			}}
		]
	});
}
function howToGainHonor() {
	showInfo({
		titles: {
			en: 'How To Gain Honor',
			tr: 'Onur Puanı Kazanmak'
		},
		navigations: [
			{ icon:'achievement', titles: {
				en: 'Qlobal Quests',
				tr: 'Global Görevler'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(3, 2);
			}},
			{ icon:'pvp', titles: {
				en: 'PVP Duel',
				tr: 'Düello'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(5, 1);
			}},
			{ icon:'war', titles: {
				en: 'PVP War',
				tr: 'Savaş'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(5, 3);
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
			{ icon:'fragment', titles: {
				en: 'Gather Fragment',
				tr: 'Parçacık Topla'
			}, func: function() {
				closeInventoryQuestionModal();
				switchBookPage(7, 1);
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
			<span onexactclick="howToGainHonor()">+</span>
			<img src="./images/icons/honor.png" />
		</div>
		<div class="menu-top-item flex flex-jc-start" id="main-honor-count">
			${__account.pvp.honor.formatWithDots()}
		</div>
		<div class="menu-top-item flex">
			<span onexactclick="howToGainTickets()">+</span>
			<img src="./images/icons/key.png" />
		</div>
		<div class="menu-top-item flex" style="width:14.6% !important">
			<div class="w-50 flex flex-jc-start" id="main-ticket-count">${__account.storyTicket > 999 ? '999+' : __account.storyTicket}</div>
			<div class="w-50 flex flex-jc-start" id="portal-timer"></div>
		</div>
		<div class="menu-top-item flex" style="width:6.6% !important">
			<img src="./images/icons/pot.png" style="max-width:100% !important" />
		</div>
		<div class="menu-top-item flex flex-jc-start" id="main-pot-count-menu">
			${(__account.pots?.find(x => x.key === 'pot')?.value ?? 0).formatWithDots()}
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
	const _has = document.querySelector('#menu-ui .menu-bottom');
	let _container;
	if(_has)
		_container = document.getElementById('menu-ui');
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
			const p1 = addThiefCoopCharacter(1, 1);
			p1.yPosition = MathRound((getGroundHeight() / 6) * 5);
			p1.left = MathRound(_canvas.width / 4);
			p1.direction = 'right';
			p1.setAutoMode(2);
			p1.sight = 10000;
			p1.level = 10;
		}
		if (_map.mobs?.length > 2) {
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
function normalizeSkills(_char) {
	//_char.skills?.forEach(x => delete x.locked);
	if(_char.animations['attack'])
		_char.animations['attack'].priority = 4;
	let i = 2;
	while(_char.animations['attack' + i]) {
		_char.animations['attack' + i].priority = 4;
		i++;
	}
	_char.animations['attack' + (i - 1)].priority = 3;
}
function createArena(_opponent, _realTime) {
	resetStoryVariables();
	const _map = mapSprites.find(x => x.id === 500);
	const _ms = mapSprites.filter(x => x.pvp);
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
			id: _opponent.cl ? _selectableChars.find(x => x.class === _opponent.cl).id : _opponent.id,
			minX: 5800,
			maxX: 5800,
			sight: 1000,
			count: 1,
			inventory: _opponent.inventory ? JSON.parse(JSON.stringify(_opponent.inventory)) : undefined,
			minLevel: _opponent.l ?? _opponent.level,
			maxLevel: _opponent.l ?? _opponent.level,
			name: _opponent.n ?? 'Player',
			difficulty: 0,
			props: {
				alp: true
			},
			yPosition: MathRound(getGroundHeight() / 2)
		}];
		hideMyModalPopUp(1);
		switchMap(500, 1, function() {
			if(_opponent.pvpOrder)
				episode.pvpOrder = _opponent.pvpOrder;
			else {
				episode.realTime = mainCharacter.realTime = true;
				episode.roomId = _opponent.e;
			}
			if(_realTime) {
				startWithThisCharacter(_selectableChars.find(x => x.class === __selectedPvPClass).id, 10);
				__selectedPvPClass = undefined;
			}
			mainCharacter.dead = false;
			prevPlatformX = undefined;
			if(_opponent.d >= 0) {
				if(_opponent.d === 0)//rakip sağa bakıyorsa en soldadır
					platformX = episode.width - episode.cWidth;
				else
					platformX = 0;
				mainCharacter.direction = _opponent.d === 1 ? __right : __left;
				mainCharacter.left = _opponent.d === 1 ? MathRound(_canvas.width / 5) : (episode.cWidth - MathRound(episode.cWidth / 5) - mainCharacter.getWidth());
			}
			else {
				platformX = 0;
				mainCharacter.direction = __right;
				mainCharacter.left = MathRound(_canvas.width / 5);
			}
			mainCharacter.yPosition = MathRound(getGroundHeight() / 2);
			hideMyMenu();
			hideMenu();
			removeClass(_gameUI, 'disable-ui');
			normalizeSkills(mainCharacter);
			resetSkills();
			mainCharacter.alp = true;
			mainCharacter.villain = false;
			applyDefaultCharacterStats(mainCharacter);
			episode.enemies?.filter(x => x.enemy)?.forEach(x => {
				x.level = 10;
				//applyCharacterStats(1, x);
				resetSkills(null, null, x);
				x.groupId = x.alp = 1;
				x.villain = false;
				//x.setHealth(x.MAXHP);
				_enemyProfile.innerHTML = avatarTemplate(x);
				x.yPosition = mainCharacter.yPosition;
				//x.hbBars = undefined;
				addClass(_enemyProfile, 'pvp');
				if(episode.realTime){
					x.realTime = true;
					x.autoMode = undefined;
					x.socketId = _opponent.s;
					if(_opponent.d === 1)// bu arkadaş sola bakıyosa
						x.left = (episode.cWidth - MathRound(episode.cWidth / 5) - x.getWidth()) + (episode.width - episode.cWidth);
					else
						x.left = MathRound(episode.cWidth / 5);
					x.direction = _opponent.d === 1 ? __left : __right;
				}
				else {
					x.left = (episode.cWidth - MathRound(episode.cWidth / 5) - x.getWidth()) + (episode.width - episode.cWidth);
					x.direction = __left;
				}
				normalizeSkills(x);
				applyDefaultCharacterStats(x);
			});
			delete episode.war;
		});
	}
}
function createWar(_opponents) {
	resetStoryVariables();
	const _map = mapSprites.find(x => x.id === 500);
	const _ms = mapSprites.filter(x => x.pvp);
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
		let _place = _opponents.findIndex(x => x === mainCharacter) + 1, i = 0;
		const _myTeam = _place < 4 ? 1 : 2;
		_map.mobs = [];
		for(let _opponent of _opponents){
			i++;
			if(_opponent === mainCharacter)
				continue;
			const _team = i < 4 ? 1 : 2;
			_map.mobs.push({
				id: _opponent.id,
				minX: i < 4 ? 250 : 5800,
				maxX: i < 4 ? 250 : 5800,
				sight: 1000,
				count: 1,
				groupId: _team,
				inventory: JSON.parse(JSON.stringify(_opponent.inventory)),
				minLevel: _opponent.level,
				maxLevel: _opponent.level,
				direction: i < 4 ? 'right' : 'left',
				name: 'Player' + i,
				difficulty: 0,
				enemy: _team !== _myTeam,
				props: {
					alp: true
				},
			});
		}
		hideMyModalPopUp(1);
		switchMap(500, 1, function() {
			episode.war = true;
			mainCharacter.dead = false;
			prevPlatformX = undefined;
			if(_myTeam <= 1)
				platformX = 0;
			else
				platformX = episode.width - episode.cWidth;
			resetSkills(null);
			//episode.pvpOrder = _opponent.pvpOrder;
			hideMyMenu();
			hideMenu();
			removeClass(_gameUI, 'disable-ui');
			_enemyProfile.innerHTML = '';
			mainCharacter.groupId = _myTeam;
			mainCharacter.maxHP = mainCharacter.MAXHP = mainCharacter.health = mainCharacter.maxHP * 5;
			_navbar.innerHTML = pvpAvatarTemplate(mainCharacter);
			episode.enemies.filter(x => !x.main).forEach(x => {
				applyCharacterStats(1, x);
				resetSkills(null, null, x);
				x.alp = 1;
				if(x.groupId === _myTeam)
					x.skipHealthBar = true;
				x.health = x.maxHP = x.MAXHP = x.maxHP * 5;
				//x.setHealth(x.MAXHP);
				if(x.groupId === _myTeam)
					_navbar.innerHTML += pvpAvatarTemplate(x);
				else
					_enemyProfile.innerHTML += pvpAvatarTemplate(x);
				//x.hbBars = undefined;
			});
			addClass(_enemyProfile, 'pvp');
			for(let i = 1; i < 7; i++) {
				const _opponent = episode.enemies.find(x => x.displayName === ('Player' + i));
				const x = _opponent ?? mainCharacter;
				let _y;
				switch(i) {
					case 1:
					case 4:
						_y = MathRound(getGroundHeight() * .25);
						if(i === 1)
							x.left = MathRound(episode.cWidth / 5);
						else
							x.left = (episode.cWidth - MathRound(episode.cWidth / 5) - x.getWidth()) + (x.main ? 0 : episode.width - episode.cWidth);
						break;
					case 2:
					case 5:
						_y = MathRound(getGroundHeight() * .5);
						if(i === 2)
							x.left = MathRound(episode.cWidth / 4);
						else
							x.left = (episode.cWidth - MathRound(episode.cWidth / 4) - x.getWidth()) + (x.main ? 0 : episode.width - episode.cWidth);
						break;
					case 3:
					case 6:
						if(i === 3)
							x.left = MathRound(episode.cWidth / 5);
						else
							x.left = (episode.cWidth - MathRound(episode.cWidth / 5) - x.getWidth()) + (x.main ? 0 : episode.width - episode.cWidth);
						_y = MathRound(getGroundHeight() * .75);
						break;
				}
				x.yPosition = _y;
				x.direction = i < 4 ? 'right' : 'left';
				x.updateVariables();
			}
		});
	}
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	try{
		if(StatusBar)
			StatusBar.hide();
		if (window.plugins && window.plugins.insomnia)
			window.plugins.insomnia.keepAwake();
		 if (window.NavigationBar)
        		window.NavigationBar.backgroundColorByHexString("#000000");
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
	if(episodeVisibilityHidden)
		return;
	_openingSound = document.createElement("audio");
	_openingSound.crossOrigin = 'anonymous';
	if ("src" in _openingSound)
		_openingSound.autoPlay = false;
	else
		_openingSound.preload = 'auto';
	_openingSound.volume = .5;
	_openingSound.currentTime = 0;
	_openingSound.src = "./images/sounds/opening3.mp3";
	_openingSound.play();
	_openingSound.onended = function() {
		_openingSound = _closeOpeningMusic = null;
	}
}

function activateGameStart(_quickPlay, _force) {
	__story = undefined;
	if(_quickPlay){
		if(!_force) {
			askSomething(`<div class="question-area">${getLangData('This section is designed solely to provide a quick overview of our game mechanics and gameplay. It doesn\'t award any rewards or impact your demo progress. Still want to play?')}</div>`, 
				'activateGameStart(1, 1)', null, document.getElementById('first-splash'));
			return;
		}
		closeInventoryQuestionModal(1);
		_client = new dataOperations(1);
		_client.loadState();
	}
	else
	{
		_client = new dataOperations();
		_client.loadState();
	}
	PlaySound({key:'enter', volume:.5});
	addClass(document.querySelector('.opening-controls-icon'), 'd-none');
	addClass(document.querySelector('.opening-lang-icon'), 'd-none');
	addClass(document.getElementById('game-difficulty-down'), 'disabled');
	addClass(document.getElementById('game-difficulty-up'), 'disabled');
	localStorage.setItem(__difficultyKey, __account.difficulty);
	__account.difficulty = 6 - __account.difficulty;
	addClass(document.getElementById('connect-btn'), 'disabled2'); 
	addClass(document.getElementById('qp-btn'), 'disabled2'); 
	document.getElementById('mini-menu').innerHTML = '<div onexactclick="askExitApp()" id="b-s-m-btn" class="mini-menu-icon" style="aspect-ratio: 128/100;background:url(./images/icons/pause.png);background-size: cover"></div>'; // '<div onexactclick="activatePowerSaveMode()" id="b-s-m-btn" class="mini-menu-icon" style="aspect-ratio: 128/100;background:url(./images/icons/power-save.png);background-size: cover"></div>';
	openGame();
}
const __difficulties = [
	{ text: {
		en: 'Sugar Teddy',
		tr: 'Minnoş'
	}},
	{ text: {
		en: 'Easy',
		tr: 'Kolay'
	}},
	{ text: {
		en: 'Normal',
		tr: 'Normal'
	}},
	{ text: {
		en: 'Hard',
		tr: 'Zor'
	}},
	{ text: {
		en: 'Inferno',
		tr: 'Cehennem'
	}}
];
const __difficultyKey = 'WOT-Warriors-of-Tengri-Difficulty';
function changeDifficulty(_step){
	const _val = document.querySelector('.game-difficulty-value');
	PlaySound({key:'switch', volume:.3});
	__account.difficulty += _step;
	if(__account.difficulty > 1)
		removeClass(document.getElementById('game-difficulty-down'), 'disabled');
	else
		addClass(document.getElementById('game-difficulty-down'), 'disabled');
	if(__account.difficulty < 5)
		removeClass(document.getElementById('game-difficulty-up'), 'disabled');
	else
		addClass(document.getElementById('game-difficulty-up'), 'disabled');
	_val.innerText = __difficulties[__account.difficulty - 1].text[getLang()];
}
function resetOpeningScreen() {
	_game.suspended = 1;
	removeClass(_gamePad, 'ghost-mode');
	__queue.length = 0;
	_startAnimate = _warMatchInProgress = false;
	prevPlatformX = undefined;
	frames = 0;
	closeInventoryQuestionModal(1);
	hideMyModalPopUp();
	hideMyMenu(1);
	detachModule();
	episode?.dispose?.();
	gameopening = false;
	setTip();
	installOpeningScreen(null, 1);
	episode = __story = mainCharacter = null;
}
function approveSelectedLanguage() {
	const _lang = document.querySelector('.opening-lang-item.selected').getAttribute('data-lang');
	if(__account.lang === _lang)
	{
		closeInventoryQuestionModal();
		return;
	}
	__account.lang = _lang;
	_client.saveState();
	closeInventoryQuestionModal();
	installOpeningScreen(1);
}
function getOpeningLanguages(_selected) {
	_selected = _selected ?? getLang();
	return `<div class="full flex fade-me"><div data-lang="en" onexactclick="selectOpeningLanguage('en')" class="opening-lang-item w-100 flex flex-jc-start${_selected === 'en' ? ' selected' : ''}" style="padding:2vh 0 1vh 0">
		<img style="height:4.5vh" src="./images/ui/circle-${_selected === 'en' ? 'on' : 'off'}.png" />
		<div style="margin-left:2vh;font-size:3vh;color:#f3f4f5${_selected === 'en' ? '' : 'cc'}">${getLangData("English")}</div>
	</div>
	<div data-lang="tr" onexactclick="selectOpeningLanguage('tr')" class="opening-lang-item w-100 flex flex-jc-start${_selected === 'tr' ? ' selected' : ''}" style="padding:1vh 0 2vh 0">
		<img style="height:4.5vh" src="./images/ui/circle-${_selected === 'tr' ? 'on' : 'off'}.png" />
		<div style="margin-left:2vh;font-size:3vh;color:#f3f4f5${_selected === 'tr' ? '' : 'cc'}">${getLangData("Turkish")}</div>
	</div></div>`;
}
function selectOpeningLanguage(_key) {
	playClick();
	document.getElementById('opening-languages').innerHTML = getOpeningLanguages(_key);
}
function askChangeLanguage() {
	playClick();
	let _modal = `<div class="full fade-me show-ui flex inventory-question">
		<div class="inventory-modal flex" style="width:50vh;aspect-ratio:1/1;flex-direction:column">`
			+
			`<div style="padding:6vh 4vh 2vh 4vh" class="flex w-100">
				<span style="color:#F4BB44 !important;font-size:3.2vh !important">${getLangData('CHOOSE LANGUAGE')}</span>
			</div>
			<div id="opening-languages" class="flex w-50" style="padding:0 4%;flex:1">`
				+ getOpeningLanguages() +
			`</div>
			<div style="padding:2vh 2vh 6vh 2vh" class="flex w-100">
				<div class="game-menu-button flex animate-me" style="font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('IGNORE')}</div>
				<div id="item-selection-approve-btn" class="game-menu-button flex animate-me" style="font-size:3vh !important" onexactclick="approveSelectedLanguage()">${getLangData('APPROVE')}</div>
			</div>
		</div>
	</div>`;
	const _div = document.createElement('div');
	_div.innerHTML = _modal;
	document.getElementById('first-splash').appendChild(_div.firstChild);
}
function askResetKeyboardConfig() {
	playClick();
	let _modal = `<div class="full fade-me show-ui flex inventory-question">
		<div class="inventory-modal flex">`
			+
			`<div style="padding:6vh 4vh 2vh 4vh" class="flex w-100">
				<span style="color:#F4BB44 !important;font-size:3.2vh !important">${getLangData('Reset to default settings')}?</span>
			</div>
			<div style="padding:2vh 2vh 6vh 2vh" class="flex w-100">
				<div class="game-menu-button flex animate-me" style="font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('IGNORE')}</div>
				<div id="item-selection-approve-btn" class="game-menu-button flex animate-me" style="font-size:3vh !important" onexactclick="resetKeyboardConfig()">${getLangData('APPROVE')}</div>
			</div>
		</div>
	</div>`;
	const _div = document.createElement('div');
	_div.innerHTML = _modal;
	let _parent = document.getElementById('first-splash');
	if(hasClass(_parent, 'v-none'))
		_parent = document.querySelector('#menu-ui') ?? _gameUI;
	_parent.appendChild(_div.firstChild);
}
function resetKeyboardConfig() {
	const _coms = document.querySelectorAll('.key-combination-item');
	let i = 0;
	for(let kc of _keyCombinations) {
		_coms[i].value = kc.baseKey === ' ' ? 'SPACE' : kc.baseKey;
		i++;
	}
	closeInventoryQuestionModal();
}
function cancelKeyboardConfig() {
	approveKeyboardPromo();
}
function approveKeyboardConfig() {
	__account.keyboard = [];
	const _coms = document.querySelectorAll('.key-combination-item');
	_coms?.forEach(x => __account.keyboard.push(x.value === 'SPACE' ? ' ' : x.value));
	_client.saveState();
	setNewKeyCombinations();
	approveKeyboardPromo();
}
function setNewKeyCombinations() {
	const dk = document.querySelectorAll('#game-ui div[data-key]');
	for(let _item of dk) {
		const _key = _item.getAttribute('data-key');
		const _index = _keyCombinations.findIndex(x => (x.baseKey === ' ' ? 'space' : x.baseKey).toLowerCase() === _key);
		_item.setAttribute('data-new-key', (__account.keyboard?.[_index] === ' ' ? 'space' : __account.keyboard?.[_index]?.toLowerCase?.()) ?? _key);
	}
}
function approveKeyboardPromo() {
	const _container = document.querySelector('.keyboard-promo-container');
	if(hasClass(_container, 'fade-out-99'))
		return;
	playClick();
	removeClass(_container, 'fade-me-99');
	const _elem = document.getElementById('key-promo-skip');
	if(hasClass(_elem, 'selected'))
		localStorage.setItem('keyboard-promo-skip', 1);
	addClass(_container, 'fade-out-99');
	_container.onanimationend = function(_e) {
		if(_e.animationName === 'fade-out-me99')
			_container?.remove?.();
	}
}
function skipKeyboardPromo() {
	const _elem = document.getElementById('key-promo-skip');
	const _img = _elem.querySelector('img');
	playClick();
	if(hasClass(_elem, 'selected')) {
		removeClass(_elem, 'selected');
		_img.src = './images/ui/star-off.png';
	}
	else {
		addClass(_elem, 'selected');
		_img.src = './images/ui/star-on.png';
	}
}
function getKeyboardPromo(_force) {
	const _seenBefore = localStorage.getItem('keyboard-promo-skip');
	if(_seenBefore && !_force)
		return;
	if(_force)
		playClick();
	const _desc = document.createElement('div');
	_desc.className = 'flex show-ui full keyboard-promo-container quick-play-desc-container fade-me-99 animate-me';
	_desc.style = 'position:absolute;top:0;left:0;overflow:hidden;z-index:1499';
	//let _html = '<div style="height:calc(100% - 9vh);position:relative" class="w-100 flex"><img src="./images/icons/keys.png" style="border:.2vh solid #F3F4F599;border-top:0;position:absolute;object-fit:cover;max-width:100%;max-height:100%" /></div>';
	// _desc.innerHTML = _html +
	// 		`<div class="quick-play-desc-skip flex" style="padding:0 5vh;width:91% !important">
	// 			<div id="key-promo-skip" onexactclick="skipKeyboardPromo()" class="flex flex-jc-start w-50${_seenBefore ? ' v-none' : ''}" style="height:100%">
	// 				<div class="flex" style="height:100%">
	// 					<img src="./images/ui/star-off.png" style="height:5vh;transform:rotate(44deg);-webkit-transform:rotate(44deg)" />
	// 					<div class="flex" style="margin:0 2vh">${getLangData("Don't show again")}</div>
	// 				</div>
	// 			</div>
	// 			<div onexactclick="approveKeyboardPromo()" class="flex flex-jc-end w-50" style="height:100%">
	// 				${getLangData('UNDERSTOOD')}
	// 			</div>
	// 		</div>`;
	let _html = '<div style="height:calc(100% - 9vh);position:relative;background:radial-gradient(#00000080, #000000cc), linear-gradient(180deg, #000, transparent, transparent, #00000080, #000), url(./images/icons/kb-bg.png);background-size:contain;background-position:center;background-repeat:no-repeat" class="w-100 flex key-combinations"><div class="w-50" style="height:100%">';
	for(let i = 0; i < 11; i++) {
		const _item = { title: _keyCombinations[i].title, baseKey: __account.keyboard?.[i] ?? _keyCombinations[i].baseKey };
		_html += `<div class="w-100 flex" style="height:9%">
			<div class="w-50 flex flex-jc-end" style="height:100%">${_item.title[getLang()]}</div>
			<div class="w-50 flex flex-jc-start" style="height:100%"><input onkeydown="setBindKey(this, event)" data-key="${_item.baseKey}" onfocus="readyToBindKey(this)" onblur="tryResetBindKey(this)" class="key-combination-item" type="text" style="height:100%;aspect-ratio:5/1" value="${_item.baseKey === ' ' ? 'SPACE' : _item.baseKey}" />` 
			+ (_keyCombinations[i].desc ?? '') +
			`</div>
		</div>`;
	}
	_html += '</div><div class="w-50" style="height:100%">';
	for(let i = 11; i < 21; i++) {
		const _item = { title: _keyCombinations[i].title, baseKey: __account.keyboard?.[i] ?? _keyCombinations[i].baseKey };
		_html += `<div class="w-100 flex" style="height:9%">
			<div class="w-50 flex flex-jc-end" style="height:100%">` 
			+ (_keyCombinations[i].desc ?? '') +
			`<input onkeydown="setBindKey(this, event)" data-key="${_item.baseKey}" onfocus="readyToBindKey(this)" onblur="tryResetBindKey(this)" class="key-combination-item" type="text" style="height:100%;aspect-ratio:5/1" value="${_item.baseKey === ' ' ? 'SPACE' : _item.baseKey}" /></div>
			<div class="w-50 flex flex-jc-start" style="height:100%">${_item.title[getLang()]}</div>
		</div>`;
	}
	_desc.innerHTML = _html + '</div></div>' +
			`<div class="quick-play-desc-skip flex" style="padding:0 10vh">
				<div onexactclick="cancelKeyboardConfig()" class="flex flex-jc-end" style="height:100%">
					${getLangData('CANCEL')}
				</div>
				<div onexactclick="askResetKeyboardConfig()" class="flex flex-jc-end" style="height:100%">
					${getLangData('RESET')}
				</div>
				<div onexactclick="approveKeyboardConfig()" class="flex flex-jc-end" style="height:100%">
					${getLangData('APPROVE')}
				</div>
			</div>`;
	let _parent = document.getElementById('first-splash');
	if(hasClass(_parent, 'v-none'))
		_parent = document.querySelector('#menu-ui') ?? _gameUI;
	_parent.appendChild(_desc);
}
let __particles;
function installOpeningScreen(_instant, _lateOpening) {
	const _current = parseInt(localStorage.getItem(__difficultyKey) ?? 3);
	__account.difficulty = _current;
	var _img = new Image();
	var _bg = document.getElementById('splash');
	var _opening = document.getElementById('first-splash');
	if(_opening)
		_opening.innerHTML = `<canvas id="particles"></canvas>
				<div onexactclick="getKeyboardPromo(1)" class="opening-controls-icon flex flex-jc-start${__isPC ? '' : ' d-none'}">
				<img src="./images/icons/controls.png" />
			</div>
			<div onexactclick="askChangeLanguage()" class="opening-lang-icon flex flex-jc-end">
				<img src="./images/icons/lang.png" /><span>${getLang().toUpperCase()}</span>
			</div>
			<div style="height:20%;width:100%;padding-bottom:30vh;z-index:2" class="flex">
				<div class="game-difficulty-wrapper flex w-100">
					<div class="game-difficulty-content flex">
						<div class="flex">
							<div class="game-difficulty-title">${getLangData('Difficulty')}:</div>
							<img${_current <= 1 ? ' class="disabled"':''} id="game-difficulty-down" onexactclick="changeDifficulty(-1)" style="margin:2vh;height:4vh;transform:rotate(-90deg)" src="./images/ui/arrow-up.png" />
							<div class="game-difficulty-value one-line">${__difficulties[_current-1].text[getLang()]}</div>
							<img${_current >= 5 ? ' class="disabled"':''} id="game-difficulty-up" onexactclick="changeDifficulty(1)" style="margin:2vh;height:4vh;transform:rotate(90deg) scale(-1,1)" src="./images/ui/arrow-up.png" />
						</div>
					</div>
				</div>
				<div class="flex">
					<div id="qp-btn" class="framed-btn flex" onexactclick="activateGameStart(1)">${getLangData('QUICK PLAY')}</div>
					<div id="connect-btn" class="framed-btn flex" onexactclick="activateGameStart()">${getLangData('DEMO PLAY')}</div>
				</div>
				<div style="padding-top:1vh;width:100%;color:#f8f8f880 !important;font-size:2.8vh!important" class="flex" id="assets-progress"></div>
			</div>`;
	if(!_opening) {
		setTimeout(() => {
			installOpeningScreen();
		}, 1000);
		return;
	}
	var _wrapper = document.getElementById('wrapper');
	_opening.style.width = MathRound(_wrapper.clientWidth) + 'px';
	_opening.style.height = '100vh';
	if(!_instant) {
		_bg.style.background = 'url(./images/icons/logo-rect.png), linear-gradient(0deg, #000, #000)'
		_bg.style.backgroundSize = '25%, cover';
		_bg.style.backgroundRepeat = 'no-repeat, repeat';
		_bg.style.backgroundPosition = 'center, center';
	}
	else if(_openingSound){
		_openingSound.pause();
		_openingSound.currentTime= 0;
	}
	_img.onload = function() {
		const renderOpeningUI = function() {
			if(__particles)
				__particles.cancel();
			__particles = new dustParticles();
			_opening.style.opacity = 0;
			document.getElementById('connect-btn').innerText = getLangData('DEMO PLAY');
			document.getElementById('qp-btn').innerText = getLangData('QUICK PLAY');
			removeClass(_opening, 'd-none');
			removeClass(_opening, 'v-none');
			// _opening.style.background = 'url(./images/loading/00.png), linear-gradient(0deg, #000, #000)'
			// _opening.style.backgroundSize = 'contain, cover';
			// _opening.style.backgroundRepeat = 'no-repeat, repeat';
			// _opening.style.backgroundPosition = 'center, center';
			const _cover = document.createElement('div');
			_cover.className = 'opening-cover';
			_cover.innerHTML = '<img src="./images/loading/00.gif" />';
			_opening.appendChild(_cover)
			addClass(_opening, 'fade-start');
			if(!_instant)
				setTimeout(function() {
					_opening.style.opacity = 1;
					_bg.style.background = '#000';
					document.getElementById('play-os').click();
				}, 1000);
			else {
				_opening.style.opacity = 1;
				document.getElementById('play-os').click();
			}
		}
		if(!_instant)
			setTimeout(() => {
				renderOpeningUI();
			}, 1000);
		else
			renderOpeningUI();
	}
	_img.src = './images/loading/00.gif';
	// if(__isPC && !_lateOpening && !_instant)
	// 	setTimeout(() => {
	// 		getKeyboardPromo();
	// 	}, 100);
}
setTimeout(function() {
	if ('ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch) ||
		navigator.maxTouchPoints > 0 ||
		window.navigator.msMaxTouchPoints > 0)
		__isPC = false;
	else
		__isPC = true;
	installOpeningScreen();
	const _stopOpeningSound = function() {
		if(_openingSound)
			_openingSound.pause();
	}
	document.addEventListener("visibilitychange", () => {
		if (document.hidden)
			_stopOpeningSound();
	});
	document.addEventListener("pause", () => {
		_stopOpeningSound();
	});
	document.addEventListener('keyup', function(e) {
		if (e.key === "Escape" && __isPC !== undefined)
			askExitApp();
	}, false);
}, 2000);

function dustParticles() {
	const c = document.getElementById("particles");
    const ctx = c.getContext("2d");
	this.clock;
	this.rand = function(min, max) {
      return Math.random() * (max - min) + min;
    }
	const _self = this;
    let particles = [];
	c.width = c.clientWidth;
	c.height = c.clientHeight;
const randomAshColor = function() {
    const base = { r: 157, g: 152, b: 127 }; // kül rengi
    const variation = 20;
    return {
        r: Math.floor(_self.rand(base.r - variation, base.r + variation)),
        g: Math.floor(_self.rand(base.g - variation, base.g + variation)),
        b: Math.floor(_self.rand(base.b - variation, base.b + variation))
    };
};
	const randomFireflyColor = function() {
    // köz / kor kırmızısı tonları
	if(getRandomValue2(1,2) > 1)
		return randomFireflyColor2();
    const colors = [
        { r: 255, g: 80,  b: 60 },   // parlak kor kırmızı
        { r: 220, g: 50,  b: 40 },   // koyu kırmızı
        { r: 200, g: 30,  b: 20 },   // koyu kor
        { r: 255, g: 120, b: 80 }    // hafif turuncu yansıma (çok az)
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
const randomFireflyColor2 = function() {
		// ateş böceği/alev tonları: sarı, turuncu, kırmızı
		const colors = [
			{ r: 255, g: 200, b: 80 },   // sarı-turuncu
			{ r: 255, g: 150, b: 50 },   // turuncu
			{ r: 220, g: 80,  b: 40 }    // kırmızımsı
		];
		return colors[Math.floor(Math.random() * colors.length)];
	};
   const createParticle = function(initial = false) {
    const minSize = 0.55 * c.height / 100;
    const maxSize = 0.95 * c.height / 100;
    const size = _self.rand(minSize, maxSize);

    const ratio = (size - minSize) / (maxSize - minSize);
    const alpha = 0.1 + ratio * 0.5;
    const speed = 0.005 + ratio * 0.1;

    const isFirefly = Math.random() < 0.1; // %10 alev rengi

    return {
        x: _self.rand(0, c.width),
        y: initial ? _self.rand(0, c.height) : c.height + 10,
        size,
        speed,
        angle: _self.rand(-15, 15) * Math.PI / 180,
        driftChange: _self.rand(0.001, 0.004),

        baseAlpha: alpha,
        alpha: alpha,
        color: isFirefly ? randomFireflyColor() : randomAshColor(),
        firefly: isFirefly, // bayrak koyduk

        // yansıma
        canReflect: isFirefly ? true : Math.random() < 0.1,
        reflectTimer: _self.rand(300, 900),
        reflecting: false,
        reflectPhase: 0,

        // fade
        fadePhase: 0,
        fadeTimer: _self.rand(300, 900),
    };
};


    const animateParticles = function() {
	  if(c.width === 0) {
		c.width = c.clientWidth;
		c.height = c.clientHeight;
	  }
	  if(c.width > 0 && !particles?.[0])
		for (let i = 0; i < 150; i++)
			particles.push(createParticle(true));
      ctx.clearRect(0, 0, c.width, c.height);

      for (let p of particles) {
        // yansıma
        if (p.canReflect) {
          if (!p.reflecting) {
            p.reflectTimer--;
            if (p.reflectTimer <= 0) {
              p.reflecting = true;
              p.reflectPhase = 1;
              p.reflectStrength = _self.rand(0.4, 0.8);
            }
          } else {
            if (p.reflectPhase === 1) {
              p.alpha += 0.01;
              if (p.alpha >= p.baseAlpha + p.reflectStrength) {
                p.alpha = p.baseAlpha + p.reflectStrength;
                p.reflectPhase = 2;
              }
            } else if (p.reflectPhase === 2) {
              p.alpha -= 0.005;
              if (p.alpha <= p.baseAlpha) {
                p.alpha = p.baseAlpha;
                p.reflecting = false;
                p.reflectPhase = 0;
                p.reflectTimer = _self.rand(300, 900);
              }
            }
          }
        }
		if (!p.reflecting) { // parlayanlar hariç
			p.fadeTimer--;
			if (p.fadeTimer <= 0 && p.fadePhase === 0) {
				p.fadePhase = 1; // fade out başla
			}

			if (p.fadePhase === 1) {
				p.alpha -= 0.005; // fade out
				if (p.alpha <= 0) {
					p.alpha = 0;
					p.fadePhase = 3; // fade in başla
					p.fadeUp = _self.rand(30,60);
				}
			}
			else if(p.fadeUp) {
				p.fadePhase++;
				if(p.fadePhase >= p.fadeUp)
				{
					delete p.fadeUp;
					p.fadePhase = 2;
				}
			} else if (p.fadePhase === 2) {
				p.alpha += 0.003; // fade in
				if (p.alpha >= p.baseAlpha) {
					p.alpha = p.baseAlpha;
					p.fadePhase = 0;
					p.fadeTimer = _self.rand(600, 1200); // bir sonraki fade için bekle
				}
			}
		}
        // partikül çiz
		if (p.firefly) {
			ctx.shadowBlur = p.size * 6; // ateş böceği için daha güçlü glow
			ctx.shadowColor = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha})`;
		} else {
			ctx.shadowBlur = p.size * 3;
			ctx.shadowColor = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha * 0.5})`;
		}

		// partikül çiz
		ctx.save(); // ayarları kaydet

		// gölge/blur ayarı
		ctx.shadowColor = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha})`;
		ctx.shadowBlur = p.size * 2; // boyuta göre blur (oranı değiştirebilirsin)

		// gölgeli gradient
		const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
		gradient.addColorStop(0, `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha})`);
		gradient.addColorStop(1, `rgba(${p.color.r},${p.color.g},${p.color.b},0)`);

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore(); // ayarları sıfırla

        // hareket
        p.x += Math.sin(p.angle) * p.speed;
        p.y -= Math.cos(p.angle) * p.speed;

        // açı değişimi
        p.angle += _self.rand(-p.driftChange, p.driftChange);
        p.angle += Math.sin(Date.now() * 0.001 + p.x) * 0.002;

        // ekran dışına çıkarsa yeniden oluştur
        if (p.y < -20 || p.x < -50 || p.x > c.width + 50) {
          Object.assign(p, createParticle());
        }
      }

      _self.clock = requestAnimationFrame(animateParticles);
    }

    this.start = function() {
        if (!_self.clock) animateParticles();
    };

    this.cancel = function() {
        if (_self.clock) {
            cancelAnimationFrame(_self.clock);
            _self.clock = null;
			particles = [];
			ctx.clearRect(0, 0, c.width, c.height);
        }
    };

    // otomatik başlatmak istersen:
    this.start();
}

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
function installCharacterSelection(_func) {
	injectModule('character-selection', function(_arr, _name) {
		const x = _func();
		__latestUIModule[_name] = { data: _arr, ref: x };
	})
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
function installWarUI() {
	injectModule('war', function(_arr, _name) {
		var x = new war();
		x.render();
		switchBookPageTabs(5, 3);
		checkUpdateAvailable2(5);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function installDungeonUI() {
	injectModule('dungeon', function(_arr, _name) {
		var x = new dungeon();
		x.render();
		switchBookPageTabs(6, 1);
		checkUpdateAvailable2(6);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function installStoryFinish(_failed, _extraGain, _content) {
	if(__storyScene?.leaderBoards)
	{
		installQuickPlayStageFinish(_failed);
		return;
	}
	episode.end = true;
	__storyPlaying = false;
	addClass(_gameUI, 'disable-ui');
	mainCharacter.disableKeyboard = true;
	blurKeyboard();
	episode.enemies?.forEach(x=> x.standBy());
	episode.pauseBgMusic(1);
	injectModule('storyfinish', function(_arr, _name) {
		__latestUIModule[_name] = { data: _arr };
		animateStart(_failed, _extraGain, _content);
	});
}
function installQuickPlayStageFinish(_failed) {
	episode.end = true;
	__storyPlaying = false;
	addClass(_gameUI, 'disable-ui');
	mainCharacter.disableKeyboard = true;
	blurKeyboard();
	episode.enemies?.forEach(x=> x.standBy());
	episode.pauseBgMusic(1);
	injectModule('stagefinish', function(_arr, _name) {
		__latestUIModule[_name] = { data: _arr };
		animateStart(_failed);
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
function installOnlineUsers() {
	injectModule('onlineusers', function(_arr, _name) {
		var x = new onlineusers();
		x.render();
		switchBookPageTabs(4, 3);
		checkUpdateAvailable2(4);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function installTips() {
	injectModule('tips', function(_arr, _name) {
		var x = new tips();
		x.render();
		switchBookPageTabs(9);
		checkUpdateAvailable2(9);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}
function installChat() {
	injectModule('chat', function(_arr, _name) {
		var x = new chat();
		x.render();
		switchBookPageTabs(4);
		checkUpdateAvailable2(4);
		__latestUIModule[_name] = { data: _arr, ref: x };
	});
}

async function measureFps(frames = 60) {
  return new Promise(resolve => {
    let count = 0;
    const start = performance.now();

    function frame() {
      count++;
      if (count >= frames) {
        const duration = performance.now() - start;
        const fps = frames / (duration / 1000);
        resolve(fps);
      } else {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  });
}

async function isHighEndDevice() {
  const isDesktop = matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isDesktop)
    return true;
  const cores = navigator.hardwareConcurrency || 1;
  const dpr = window.devicePixelRatio || 1;
  const fps = await measureFps();

  return (
    cores >= 6 &&
    dpr >= 2 &&
    fps >= 50
  );
}