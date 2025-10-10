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
function animate() {
	if (!_startAnimate) {
		requestAnimationFrame(animate);
		return;
	}
	msNow = Date.now();
	const msPassed = msNow - msPrev;
	if (msPassed < msPerFrame) {
		requestAnimationFrame(animate);
		return;
	}
	const excessTime = msPassed % msPerFrame;
	msPrev = msNow - excessTime;
	episode.check = true;
	__queue.length = 0;
	mainCharacter.draw(__queue);
	const _sameCoords = (platformX === prevPlatformX);
	if (!_sameCoords) {
		episode.drawLayers();
		episode.drawObjects();
		episode.drawSpriteObjects();
	}
	episode.drawEnemies(__queue);
	if (mainCharacter?.lastHitDate)
		if ((msNow - mainCharacter.lastHitDate) > 2499)
			removeHitCount();
	if (!_sameCoords)
		prevPlatformX = platformX;
	
	episode.drawCharacterQueue(__queue);
	if (!_renderDmgFrame)
		drawDmgFrames();
	else
		_renderDmgFrame--;
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
			_assets.push({episodes: [_ep.id], path: './images/texture/' + _ep.assetPath + '-' + _lay.name + '.png?z=' + _lay.zoom});
	if (_ep.sprites)
		for (var _obj of _ep.sprites)
			if (!_obj.text)
				_assets.push({episodes: [_ep.id], path: createSpritePath(_obj, _ep)});
	//const _distinctAssets = [...new Set(_assets)];
	const _distinctAssets = distinctEpisodeAssets(_assets, _ep.id);
	let _assetCount = _distinctAssets.length + (_firstOpening ? __globalAssets.length : 0);
	for(let _i of loadedEpisodeImages) {
		_i.image.remove();
		_i.image = null;
	}
	for(let _i of loadedImages) {
		_i.image.remove();
		_i.image = null;
	}
	loadedEpisodeImages.length = loadedImages.length = 0;
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
		return './images/texture/' + _ep.assetPath + (_obj.totalFrames > 1 ? '-' + _obj.animation.key + '.gif' : _obj.animation.key + '.png')
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
		removeClass(addPlayer, 'd-none');
	}
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
function addCoopCharacter(_char, _prefix, _append) {
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
	_coopMember.yPosition = getRandomValue(MathRound(groundHeight * .1), MathRound(groundHeight * .9));
	episode.enemies.push(_coopMember);
	_navbar.innerHTML += avatarTemplate(_coopMember);
	addClass(addPlayer, 'd-none');
	_coopMember.left = mainCharacter.getScreenLeft() + (platformX ?? 0);
	let _randomLeft = getRandomValue(0, MathRound(_canvas.width / 20)) - MathRound(_canvas.width / 10);
	_coopMember.left += _randomLeft;
	if (_coopMember.left < 0)
		_coopMember.left = 0;
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
	mainCharacter.reviveTime = msNow;
	mainCharacter.deadTime = mainCharacter.dead = mainCharacter.remove = mainCharacter.dying = mainCharacter.immobilize = undefined;
	hideMyModalPopUp();
}
function reviveAsGhost() {
	addClass(_gamePad, 'ghost-mode');
	mainCharacter.ghost = true;
	setCharacterDefaults(mainCharacter);
	resetSkills(null);
	mainCharacter.idle();
	mainCharacter.deadTime = mainCharacter.remove = mainCharacter.immobilize = undefined;
}
function switchCharacter() {
	return;
	if (episode.pvp)
		return;
	//3 sn geçmeden tekrar karakter değiştirilemez,
	//karakter interactive animasyonda ise
	let _x = _coopMembers?.[0];
	if (!_x)
		warn('<span>' + getLangData('No teammate right now') + '</span>', 'warn');
	if (!_x || _x.isDead())
		return;
	const _xAnima = _x.animation;
	const _mainAnima = mainCharacter.animation;
	const _availableAnimations = ['walk', 'run', 'idle'];
	if (_availableAnimations.indexOf(_xAnima) === -1 || _availableAnimations.indexOf(_mainAnima) === -1 ||
		(mainCharacter.switchTime && (msNow - mainCharacter.switchTime) < 3000)) {
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
	mainCharacter.switchTime = _coopMembers[0].switchTime = msNow;
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
function switchMap(_x, _force, _func, _newId) {
	if(__switchingMap)
		return;
	//try{
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
			_tipOrder = getRandomValue(0, _tips.length - 1);
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
	const _hasLead = mainCharacter?.leader;
	const _mh = mainCharacter?.health;
	const _me = mainCharacter?.experience;
	const _mme = mainCharacter?.maxExperience;
	mainCharacter = _store.getMainCharacter();
	let hasMainCharacter;
	if(_mh) {
		hasMainCharacter = 1;
		mainCharacter.health = _mh;
		mainCharacter.experience = _me;
		mainCharacter.maxExperience = _mme;
	}
	const _am = document.getElementById('auto-mode-on-off');
	removeClass(_am, 'selected');
	_store.setCharacterStats();
	if (!mainCharacter.keyboard)
		setKeyBoard(mainCharacter);
	else
		mainCharacter.keyboard.holdingKeys = [];
	if (episode?.bgSound) {
		episode.bgSound.pause();
		episode.bgSound.currentTime = 0;
	}
	_store.minPosX = -1 * MathRound((mainCharacter.width / 2) * __zoom);
	_store.maxPosX = _canvas.width - MathRound((mainCharacter.width / 2) * __zoom);
	const _dungeonFloor = episode?.currentFloor;
	const _oldSeason = episode?.season ?? 0;
	const _fromLobby = episode?.lobby;
	episode = new map({
		loadObjects: true,
		key: 'map' + _x + '-' + 1,
		season: _x,
		height: _canvas.height,
		sprites: []
	});
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
				const _oldMapCoords = parseInt(mapSprites.find(x => x.id === _oldSeason)?.coords?.left?.replace('%','') ?? 0);
				const _newMapCoords = parseInt(mapSprites.find(x => x.id === episode.season).coords.left.replace('%',''));
				
				// if ((episode.lobby && MathAbs(_oldSeason - episode.season) > 2) || _oldSeason == episode.season || ((_oldSeason > episode.season) && ((episode.season % 2) === 1) &&
				// 	(((_oldSeason % 2) === 1) || _fromLobby)) ||
				// 	((_oldSeason < episode.season) && ((episode.season % 2) === 0))) {

				if(episode.still) {
					mainCharacter.left = MathRound(_canvas.width / (_map.enterDirection === 'left' ? 5 : 2));
					mainCharacter.direction = 'right';
					mainCharacter.platformX = platformX = MathRound(episode.width / 2) - mainCharacter.left - (_map.enterDirection === 'left' ? MathRound((_canvas.width / 2) - (_canvas.width / 5)) : 0);
				}
				else if(_oldSeason > episode.season) {
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
						for (let cm of _coopMembers)
							addCoopCharacter({ key: cm.key, name: cm.name, class: cm.class, width: cm.width, height: cm.height });
				}
				episode.enemies.push(mainCharacter);
				//eskiden liderliği burada veriyorduk
				episode.installMobs();
				episode.status = 'loaded';
				//animate();
				mainCharacter.yPosition = MathRound(groundHeight / 2);
				mainCharacter.immobilize = mainCharacter.ghost = false;
				mainCharacter.animate('idle', 1);
				mainCharacter.lastActivity = msNow;
				episode.playAmbianceMusic();
				let _mapDiscovered;
				if (!_isBattleGround && !episode.dungeon && !_isMission && __account.visitedMaps.indexOf(episode.id) === -1) {
					_client.upgradeVisitedMaps(episode.id);
					_mapDiscovered = 1;
				}
				if (_func)
					_func();
				if (_isBattleGround)
					episode.enemies?.forEach(x => {
						x.immobilize = true;
						x.killCount = 0;
						x.setHealth(x.getMaxHP());
						x.killedBy = undefined;
						x.grayAvatar = false;
					});
				if (!(episode.currentFloor > 1))
					connectSocket();
				setTimeout(function() {
					//try {
						if(__account.cs) {
							addClass(_splash, 'd-none');
							document.getElementById('tip-screen').remove();
						}
						const _loading = document.getElementById('game-start-loading');
						removeClass(_loading, 'animate-me');
						//_loading.style.width = '0%';
						addClass(_loading, 'animate-me');
						const _activeCoolDowns = document.querySelectorAll('.skill .counter');
						if(_activeCoolDowns?.[0])
							for(let _acd of _activeCoolDowns)
								_acd.remove();
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
						if(_isTower)
							setTowerMobsByLevel();
						else if(_isMission) {
							episode.enemies?.forEach(x => x.immobilize = true);
							if(episode.gold) {
								mainCharacter.yPosition = episode.enemies.find(x => x.enemy).yPosition;
								mainCharacter.zoom *= 1.4;
								mainCharacter.stepXRate *= 1.4;
								removeCoopCharacter(1);
								const _gm = __account.missions.find(x => x.key === 'gold');
								_gm.current++;
								_gm.lastActivity = msNow;
								_client.saveState(1);
								//mainCharacter.chargeSpeedRate *= .7;
							}
						}
						if(_mapDiscovered) {
							warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/scroll.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('New Map Discovered') + '</span></div>', 'level-up');
							PlaySound({ key: 'page', volume: .5 });
						}
					// }
					// catch(_ex2) {
					// 	alert('index 931' + _ex2.message);
					// }
				}, 2000);
				if(!__account.cs)
					requestVideo(1);
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
		_videoTouch.onclick = function() {
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
	_playingVideo = _video;
	askSomething('Skip Story', `skipVideo(null, ${_again})`);
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
function openGame() {
	//launchIntoFullscreen(document.documentElement);
	setTimeout(function () {
		const __r = document.querySelector(':root');
		//const __rs = getComputedStyle(__r);
		__zoom = _canvas.clientHeight / 1152;
		__dmgFrameDistance = MathRound(100 * __zoom);
		groundHeight = MathRound(200 * __zoom);
		idealground_height = groundHeight;

		_canvas.width = _canvas1.width = _canvasB.width = _canvasGore.width = _canvasSPB.width = _canvasShadow.width = _canvasRage.width = _canvasHurt.width = _canvas3.width = _canvas4.width = _canvas5.width = _canvasF.width = _canvasS.width = _canvasR.width = _gamePad.offsetWidth;
		_canvas.height = _canvasB.height = _canvas4.height = _canvas3.height = _canvasGore.height = _canvasShadow.height = _canvasHurt.height = _canvasRage.height = _canvas5.height = _canvasS.height = _canvasSPB.height = _canvasF.height = _canvasR.height = _gamePad.offsetHeight;
		_canvas1.height = _canvas.height - groundHeight;
		__r.style.setProperty('--ground-height', groundHeight + 'px');
		__r.style.setProperty('--use-progress-time', (2 * (165 / groundHeight)) + 's');
		centerMinX = parseInt(_canvas.width * 0.36);
		centerMaxX = parseInt(_canvas.width * 0.64);
		switchMap(testMap ?? 1, null, function () {
			for (var i = 1; i <= Object.keys(chainSkills).length; i++)
				addClass(chainSkills['skill' + i], 'd-none');
			addClass(document.getElementById('first-splash'), 'd-none');
			removeClass(document.getElementById('game-start-loading-wrapper'), 'd-none');
		});
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
			yPosition: MathRound((((i % _len) + 1) / (_len + 1)) * groundHeight),
			// yPosition: function() {
			// 	return getRandomValue(MathRound(groundHeight * .25), MathRound(groundHeight * .75));
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
		if(!episode.pvp)
			_char.checkCommonInventory();
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
			_char.setHealth(_char.getMaxHP());
		else
			if (!_client.loadHP(_char))
				_char.setHealth(_char.getMaxHP());
		_char.remove = _char.revived = undefined;
	}
}
function showMyModalPopUp(_id) {
	if(_id === 'game-menu' && mainCharacter && mainCharacter.deadTime)
		return;
	__account.questStatus.dialogOrder = __account.questStatus.dialogArr;
	_dialogAppeared = 1;
	if(mainCharacter?.keyboard?.holdingKeys)
		mainCharacter.keyboard.holdingKeys = [];
	addClass(document.getElementById('quest-dialog'), 'd-none');
	const _modal = document.querySelector(_id ? '#' + _id : '.my-pop-up-wrapper');
	addClass(_modal, 'show');
	setTimeout(function () {
		addClass(_modal, 'loaded');
		removeClass(_modal, 'show');
	}, 250);
}
function hideMyModalPopUp(_asap) { 
	const _removals = document.querySelectorAll('#game-menu .remove-me');
	for(let _r of _removals ?? [])
		_r.innerHTML = '';
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
	}, 250);
}
function switchBookPage(_order) {
	const _removals = document.querySelectorAll('#game-menu .remove-me');
	for(let _r of _removals ?? [])
		_r.innerHTML = '';
	const _elems = document.querySelectorAll('.my-pop-up-content-body, .book-sign, #game-talents');
	const _step = _elems.length / 2;
	PlaySound({ key: 'page', volume: .3 });
	for (var i = 0; i < _step; i++) {
		if ((i + 1) === _order) {
			addClass(document.getElementById('book-sign-' + _order), 'selected');
			addClass(document.getElementById('book-content-' + _order), 'selected');
			if (_order === 4)
				organizeMapCoordinates();
			else if (_order === 2) {
				skill.getSkillUI(mainCharacter.class);
				checkUpdateAvailable();
			}
			else if (_order === 3) {
				document.getElementById('book-content-3')
				.innerHTML = createArtifactsUI();
			}
			else if (_order === 8) {
				getOptionsUI();
			}
			else if (_order === 5) {
				//getOnlineUsersUI();
				checkIfLotteryAvailable();
			}
			else if (_order === 6) {
				renderQuests();
			}
			else if (_order === 7) {
				document.getElementById('book-content-7')
				.innerHTML = createStoreUI();
			}
			else if (_order === 9) {
				document.getElementById('book-content-9')
				.innerHTML = renderTipsUI();
			}
			else if (_order === 10) {
				document.getElementById('book-content-10')
				.innerHTML = renderComingSoonContent('PVP Content');
				__pvp.render();
				return;
			}
			else if (_order === 11) {
				document.getElementById('book-content-11')
				.innerHTML = renderComingSoonContent('Coop Content');
			}
			else if(_order === 1) {
				document.getElementById('book-content-1')
				.innerHTML = renderInventory();
				checkUpdateAvailable();
			}
			if(__pvp)
				__pvp.dispose();
		}
		else {
			removeClass(document.getElementById('book-sign-' + (i + 1)), 'selected');
			removeClass(document.getElementById('book-content-' + (i + 1)), 'selected');
			// removeClass(_elems[i], 'selected');
			// removeClass(_elems[i + _step], 'selected');
		}
	}
}
function getOptionsUI() {
	let _html = `<div style="width:50%;height:100%">
		<div style="width:100%;height:10%;padding:4vh 2vh 5vh 2vh" class="flex flex-jc-start">${getLangData('Language Choice')}</div>
		<div class="flex flex-jc-start" style="width:100%;padding:1vh;height:10vh">
			<div style="aspect-ratio:1/1;padding:1vh">
				<div onclick="langSelect('en')" class="my-radio${(getLang()) === 'en' ? ' selected' : ''} flex">
					<div></div>
				</div>
			</div>
			<div style="flex:1;width:80%;color:#262626 !important" class="flex flex-jc-start one-line">
				${getLangData('English')}
			</div>
		</div>
		<div class="flex flex-jc-start" style="width:100%;padding:1vh;height:10vh">
			<div style="aspect-ratio:1/1;padding:1vh">
				<div onclick="langSelect('tr')" class="my-radio${(getLang()) === 'tr' ? ' selected' : ''} flex">
					<div></div>
				</div>
			</div>
			<div style="flex:1;width:80%;color:#262626 !important" class="flex flex-jc-start one-line">
				${getLangData('Turkish')}
			</div>
		</div>
	</div>`;
	
	_html += '<div class="flex" style="width:50%;height:100%">';
	const _optionTitles = { en: [
			'Gore Effects', 
			'Visual Effects', 
			'Weather Effects', 
			'Request From Players', 
			'Sound Effects', 
			'Background Music'
		],
		tr: [
			'Kan Efektleri', 
			'Görsel Efektler', 
			'Hava Olayları', 
			'Oyunculardan İstek Alma', 
			'Ses Efektleri', 
			'Arka Plan Müziği'
		]
	};
	let _i = 0;
	for(let _key of Object.keys(__account.options)) {
		const _opt = __account.options[_key];
		_html += '<div class="flex flex-jc-start" style="width:100%;padding:0 2%;height:15%">' +
					'<div style="aspect-ratio:1/1;padding:2%">' +
						'<div onclick="optionSelect(this, \'' + _key + '\')" class="my-check' + (_opt ? ' selected' : '') + ' flex">' +
							'<div></div>' +
						'</div>' +
					'</div>' +
					'<div style="flex:1;width:80%;color:#262626 !important" class="flex flex-jc-start one-line">' +
						_optionTitles[getLang()][_i++] +
					'</div>' +
				'</div>';
	}
	document.getElementById('book-content-8').innerHTML = _html + '</div>';
}
function langSelect(_lang) {
	__account.lang = _lang;
	_client.saveState();
	getOptionsUI();
	updateQuestArea(1);
	const _name = document.querySelector('.map-name');
	if(_name) {
		const _mapSprite = mapSprites.find(x => x.id === episode.id);
		if(_mapSprite)
			_name.innerText = getLangData(_mapSprite.coords.title.split(' ')[0]);
	}
}
function optionSelect(_elem, _key) {
	_client.upgradeOptions(_key);
	if(__account.options[_key])
		addClass(_elem, 'selected');
	else
		removeClass(_elem, 'selected');
}
function organizeMapCoordinates() {
	let mapArea = document.getElementById('map-coords');
	closeMapInfoModal(1);
	if(mapArea.innerText.trim() !== '')
	{
		// const _tiles = mapArea.querySelectorAll('.waypoint-title');
		// for(let _tile of _tiles) {
		// 	let sprite = mapSprites.find(x => x.id.toString() === _tile.getAttribute('data-id').toString());
		// 	_tile.onclick = function() {
		// 		const _isActive = sprite.battleGround || __account.visitedMaps.indexOf(sprite.id) !== -1;
		// 		if ((episode.id !== sprite.id && _isActive) || true)
		// 			//switchMap(sprite.id);
		// 			openMapDetailModal(sprite.id);
		// 		else if (!_isActive)
		// 			warn('<span>Explore area first</span>', 'warn');
		// 	}
		// }
		return;
	}
	mapArea.innerHTML = '<img src="./images/icons/compass.png" class="map-compass" />';
	const _clouds = document.createElement('img');
	_clouds.className = 'map-clouds';
	_clouds.src = "./images/icons/clouds.png";
	mapArea.appendChild(_clouds);
	var _maps = __account.questStatus.quest?.maps ?? [];
	var _isQuestInProgress = __account.questStatus.state === 'progress';
	for (let sprite of mapSprites) {
		if (!sprite.coords || sprite.disabled)
			continue;
		const _hasQuest = _isQuestInProgress && _maps.indexOf(sprite.id) !== -1;
		const _isLocked = mainCharacter.level < (sprite.minLevel ?? 1); //__account.visitedMaps.indexOf(sprite.id) === -1;
		let _label = '<div class="waypoint-title' + (_isLocked ? ' waypoint-locked' : (_hasQuest ? ' waypoint-quest' : '')) + (episode.id === sprite.id ? ' waypoint-current' : '') + '" onclick="selectMapArea(' + sprite.id + 
		')" style="left:' + sprite.coords.left + ';top:' + sprite.coords.top + ';cursor:pointer">' +
			getLangData(sprite.coords.title) + (sprite.coords.dir ? ' (' + getLangData(sprite.coords.dir) + ')': '');
		if (sprite.coords.icon)
			_label += '<img src="./images/icons/' + sprite.coords.icon + '.png" class="map-lock map-icon" />';
		else if (_isLocked) //(__account.visitedMaps.indexOf(sprite.id) === -1) {
			//_label.style.opacity = .65;
			_label += '<img src="./images/icons/lock.png" class="map-lock" />';
		//}
		//if (episode.id === sprite.id)
		//	_label += '<img src="./images/icons/spinner.png" class="map-current-location" />';
		mapArea.innerHTML += (_label + '</div>');
	}
}
function selectMapArea(_id, _container) {
	const sprite = mapSprites.find(x => x.id === _id);
	const _isActive = sprite.battleGround || sprite.public || sprite.tower || sprite.gold || __account.visitedMaps.indexOf(sprite.id) !== -1;
	if(((episode.id !== sprite.id) && _isActive)) {
		if(!sprite.lobby)
			openMapDetailModal(sprite.id, _container);
		else {
			PlaySound({ key: 'click' });
			switchMap(sprite.id);
		}
	}
	else if (!_isActive)
		warn('<span>' + getLangData('Discover area first') + '</span>', 'warn');
}
function closeMapInfoModal(_nosound) {
	if(!_nosound)
		PlaySound({ key: 'click' });
	document.querySelector('.map-description-container')?.remove();
}
function openMapDetailModal(_id, _container) {
	const _map = mapSprites.find(x => x.id === _id);
	let _mission;
	if(_map.coords.key)
		_mission = _missions.find(x => x.key === _map.coords.key);
	const _wm = _container ?? document.getElementById('world-map');
	PlaySound({ key: 'click' });
	const _quests = _npcQuests.filter(x => x.maps.indexOf(_map.id) !== -1);
	const _mapQuestCount = _quests?.length ?? 0;
	const _mapQuestDone = _quests?.filter(x => x.id < __account.questStatus.order)?.length ?? 0;
	let _equipments = '', _enemies = '';
	for(let _item of _map.equipmentDropRates ?? [])
		_equipments += `<div style="width:50%" class="stats-group-item flex flex-jc-start"><img style="width:6vw;margin:1.5vh;background:#191919" class="grade${_map.itemGrade}-item" src="./images/items/icons/${_item.key === 'weapon' ? mainCharacter.class + '/' : ''}${_item.key}${_map.itemGrade}.png" /><div style="color:#f7f7f7cc!important;padding-left:1.5vh">%${_item.rate}</div></div>`;
	let _mobIndex = 0;
	const _nameArr = [];
	let _mobArray;
	if(_mission) {
		const _missionProps = _missions.find(x => x.key === _mission.key).props;
		const _t = __account.missions.find(x => x.key === _mission.key);
		_mobArray = _missionProps.find(x => x.level === _t.level).floors?.find(x => x.floor === 10)?.mobs;
	}
	if(!_mobArray)
		_mobArray = _map.mobs ?? [];
	for(let _enemy of _mobArray) {
		const _e = _allEnemies['enemy' + (_enemy.displayId ?? _enemy.id)]();
		let _defIcons = '', _atkIcons = '';
		const _professions = [];
		for(let _key of Object.keys(_e.animations))
		{
			const _anima = _e.animations[_key];
			for(const _frame of _anima.frames)
				if(_frame.atk?.type && _professions.indexOf(_frame.atk.type) === -1)
					_professions.push(_frame.atk.type);
		}
		if(_professions?.[0])
		{
			if((_mobIndex % 2) === 0)
				_atkIcons += '<span style="display:inline-block;position:absolute;right:1vh;top:0;height:100%" class="flex">';
			else
				_atkIcons += '<span style="display:inline-block;position:absolute;left:1vh;top:0;height:100%" class="flex">';
			for(let _i of _professions.sort())
				_atkIcons += '<img style="height:100%" src="./images/elemental/' + _i + '.png" />';
			_atkIcons += '</span>';
		}
		if(_e.immunities?.[0])
		{
			if((_mobIndex % 2) === 0)
				_defIcons += '<span style="display:inline-block;position:absolute;right:1vh;top:0;height:100%" class="flex">';
			else
				_defIcons += '<span style="display:inline-block;position:absolute;left:1vh;top:0;height:100%" class="flex">';
			for(let _i of _e.immunities.sort())
				_defIcons += '<img style="height:100%" src="./images/elemental/' + _i + '.png" />';
			_defIcons += '</span>';
		}
		if((_e.class === 'object' && !_enemy.displayId) || _nameArr.indexOf(_e.name) !== -1)
			continue;
		_nameArr.push(_e.name);
		let _spawnHTML = '';
		if(_enemy.spawn)
			_spawnHTML = `<div class="mob-spawn-info flex"><img src="./images/icons/hour-glass.png" /></div>`;
		_enemies += `<div class="flex${(_mobIndex % 2) === 0 ? '' : ' mob-rtl'}" style="position:relative${(_mobIndex % 2) === 0 ? '' : ';direction:rtl'}">
		<div style="width:50%;background:radial-gradient(ellipse at center bottom, ${getGradeBGColor((_enemy.grade ?? 1) + 1)}89, transparent, transparent)" class="flex">
			<img src="./images/sprites/ep${_enemy.id < 10 ? '0' + _enemy.id.toString() : _enemy.id}/mob.png" style="width:auto;max-height:25vh;max-width:90%${(_mobIndex % 2) === 0 ? '' : ';-webkit-transform:scaleX(-1);transform:scaleX(-1)'}" />`
		+ _spawnHTML +
		`</div>
		<div style="width:50%" class="flex">
			<div style="position:relative;margin-top:1vh;width:100%;color:${_enemy.attackAfterHit ? '#F4BB44' : '#ff6c00'} !important" class="stats-group-item flex flex-jc-start">${getLangData(_enemy.name ?? _e.name)}${_e.class === 'boss' ? ' [' + getLangData('BOSS') + ']' : ''}</div>
			<div style="width:100%;color:#f7f7f7ab !important" class="one-line stats-group-item">${getLangData('Level')}: ${_enemy.minLevel ?? '?'}${_enemy.minLevel === _enemy.maxLevel ? '' : ' - ' + _enemy.maxLevel}</div>
			<div style="width:100%;color:#f7f7f7ab !important" class="one-line stats-group-item">${getLangData('Type')}: ${getLangData(_e.ranged ? 'Ranged' : 'Melee')}</div>
			<div style="width:100%;color:#f7f7f7ab !important" class="one-line stats-group-item${(_enemy.atk ?? _e.atk) > 0 ? '' : ' d-none'}" style="position:relative">${getLangData('Atk')}: ${(_enemy.atk ?? _e.atk).formatWithDots()}` + _atkIcons + `</div>
			<div style="width:100%;color:#f7f7f7ab !important" class="one-line stats-group-item" style="position:relative">${getLangData('Def')}: ${(_enemy.def ?? _e.def).formatWithDots()}` + _defIcons + `</div>
			<div style="width:100%;color:#f7f7f7ab !important" class="one-line stats-group-item">${getLangData('HP')}: ${(_enemy.maxHP ?? _e.maxHP).formatWithDots()}</div>
		</div></div>`;
		_mobIndex++;
	}
	const _btnContainerHeight = MathRound(_canvas.height / 10);
	const _btnHeight =MathRound(_btnContainerHeight * .85);
	let _html = `<div style="height:calc(100% - ${_btnContainerHeight}px)">
					<div style="width:100%;height:100%;">
						<div class="flex" style="height:6vh;border-bottom:1px solid #665835">
							<div class="flex" style="width:90%;padding-left:3vh">
								<div class="one-line" style="width:100%;font-size:3vh !important;font-weight:600;color:#F4BB44 !important;line-height:5vh!important">${getLangData(_map.coords.title) + (_map.coords.dir ? ' (' + getLangData(_map.coords.dir) + ')' : '')}</div>
							</div>
							<div class="flex flex-jc-end" style="height:100%;width:10%"><img style="opacity:.75;cursor:pointer;height:4vh;margin-right:.4vw" onclick="closeMapInfoModal()" src="./images/icons/close.png" /></div>
						</div>
						<div style="height:calc(100% - 6vh);overflow-y:auto">
							<div style="width:100%;padding:.5vh 0">
								<div style="color:#f7f7f7cc!important" class="stats-group-item"><span style="color:#f7f7f7ab!important">${getLangData('Min Level Requirement')}:</span>&nbsp;${_map.minLevel}</div>
								<div style="color:#f7f7f7cc!important" class="stats-group-item${_mission || (_mapQuestCount === 0) ? ' d-none' : ''}"><span style="color:#f7f7f7ab!important">${getLangData('Quest Progress')}:</span>&nbsp;${_mapQuestDone} / ${_mapQuestCount}</div>
								<div style="color:#f7f7f7cc!important" class="stats-group-item${_mission ? ' d-none' : ''}"><span style="color:#f7f7f7ab!important">${getLangData('Map Distance')}:</span>&nbsp;${MathRound(_map.width.formatWithDots())} ${getLangData('Yards')}</div>
								<div style="color:#f7f7f7cc!important" class="stats-group-item${(_mission || !_map.itemGrade) ? ' d-none' : ''}"><span style="color:#f7f7f7ab!important">${getLangData('Equipment Drop Quality')}:</span>&nbsp;${getItemGradeLetter(_map.itemGrade) ?? ''}</div>
								<div style="color:#f7f7f7cc!important" class="stats-group-item"><span style="color:#f7f7f7ab!important">${getLangData('Status')}:</span>&nbsp;<span style="color:${mainCharacter.level < _map.minLevel ? '#F3F3F3 !important">' + getLangData('Locked') : '#39FF14 !important">' + getLangData('Active')}</div>`
									+ (_mission ?  _mission.description() : '') +
								`<div style="color:#F4BB44 !important;position:relative;margin-top:1vh" class="stats-group-title${(_mission || _equipments === '') ? ' d-none' : ''}">${getLangData('Item Drop Rates')}</div>
								<div class="flex flex-jc-start">`
										+ _equipments +
								`</div>
								<div style="color:#F4BB44 !important;position:relative;margin-top:1vh" class="stats-group-title${((_mission && !_map.tower) || _enemies === '') ? ' d-none' : ''}">${getLangData('Enemies')}</div>`
								+ _enemies +
							`</div>
						</div>
					</div>
				</div>
				<div class="flex" style="height:${_btnContainerHeight}px;border-top:1px solid #665835">
					<div onclick="trySwitchMap(${_id})" class="flex framed-btn" style="height:8vh !important;font-size:3vh !important">
						${getLangData('TRAVEL')}
					</div>
				</div>`;
	_wm.innerHTML += '<div class="map-description-container"><div class="map-description">' + _html + '</div></div>';
	
	const root = document.querySelector(':root');
	root.style.setProperty('--map-description-url', "url('./../images/map/" + _map.theme + ".png')");
}
function trySwitchMap(_id) {
	PlaySound({ key: 'click' }); 
	const _map = mapSprites.find(x => x.id === _id);
	if(mainCharacter.level < _map.minLeve) {
		warn('<span>' + getLangData('Your level is too low') + '</span>', 'warn');
		return;
	}
	hideMyModalPopUp(1); 
	closeMapInfoModal();
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
			p1.yPosition = MathRound((groundHeight / 6) * 5);
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
			p2.yPosition = MathRound(groundHeight / 6);
			p2.sight = 10000;
			p2.level = 10;
		}
	}
	mainCharacter.level = 10;
	mainCharacter.dead = false;
	prevPlatformX = undefined;
		mainCharacter.yPosition = MathRound(groundHeight / 2);
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
	__account.commonInventory = [];
}

function createArena(_opponent) {
	const _map = mapSprites.find(x => x.id === 500);
	if(_map.pvp) {
		_map.mobs.push({
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
			yPosition: MathRound(groundHeight / 2)
		});
		hideMyModalPopUp(1);
		switchMap(500, 1, function() {
			mainCharacter.dead = false;
			prevPlatformX = undefined;
			mainCharacter.yPosition = MathRound(groundHeight / 2);
			platformX = 0;
			mainCharacter.left = MathRound(_canvas.width / 5);
			mainCharacter.direction = 'right';
			resetSkills(null);
			episode.enemies?.filter(x => x.enemy)?.forEach(x => {
				applyCharacterStats(null, x);
				resetSkills(null, null, x);
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