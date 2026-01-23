'use strict';
const _borderRates = [
	1.06, 1.06, 1.06, 
	1.05, 1.05, 1.05, 1.05,
	1.04, 1.04, 1.04, 1.04,
	1.025, 1.025, 1.025, 1.025, 1.025,
	1.025, 1.025, 1.025, 1.025, 1.025,
	1.025, 1.025, 1.025, 1.025, 1.025,
	1.025, 1.025, 1.025, 1.025, 1.025,
	1.025, 1.025, 1.025, 1.025, 1.025,
	1.025, 1.025, 1.025, 1.025, 1.025,
	1.04, 1.04, 1.04, 1.04, 
	1.05, 1.05, 1.05, 1.05,
	1.06, 1.06, 1.06,
];
console.log('map');
function map(_m) {
	
	if (!window._distortFX) {
		const distc = document.createElement('canvas');
		const dctx = distc.getContext('2d', { willReadFrequently: true });
		window._distortFX = { distc, dctx };
	}
	this.season = _m.season;
	const _mapSprite = mapSprites.find(x => x.id == this.season);
	this.still = _mapSprite.still;
	// this.width = MathRound((_mapSprite.width ?? _m.width) * __zoom);
	// if(this.width < _canvas.width)
	// 	this.width = _canvas.width;
	// _canvasR.width = _canvasS.width = (this.width);
	//_canvasR.style.width = _canvasS.style.width = (this.width) + 'px';
	//_canvasS.style.width = (this.width * __scale) + 'px';
	this.missionRoadRate = 1;
	cc = document.getElementById('constant-obj');
	c3 = document.getElementById('droad');
	c50 = document.getElementById('droad50');
	c85 = document.getElementById('droad85');
	c90 = document.getElementById('droad90');
	c9 = document.getElementById('dobj-foreground');
	this.FootShadow = getImage('./images/related/shadow3.png');
	this.HBMob = getImage('./images/icons/hbmob.png');
	this.HBBoss = getImage('./images/icons/hbboss.png');
	const _cArr = [c3, c9, c50, c85, c90, cc];
	for(let _c of _cArr) {
		_c.innerHTML = '';
		//_c.style.width = this.width + 'px';
		_c.style.transform = 'translateX(0)';
		_c.style.setProperty('-webkit-transform', 'translateX(0)');
		_c.backgroundSet = undefined;
	}
	this.after = _mapSprite.after;
	this.menu = _mapSprite.menu;
	//this.height = _m.height;
	this.hitCount = 0;
	this.limitedEffects = [];
	//this.distance = (__globalDistance ? parseFloat(__globalDistance) / 100 : undefined) ?? (_mapSprite.distance ?? .5);
	this.sprites = _m.sprites;
	this.status = _m.status ?? 'loading';
	this.loadObjects = _m.loadObjects;
	this.loadEnemies = _m.loadEnemies;
	this.enemies = [];
	this.seenEnemies = [];
	this.activeSpells = [];
	this.lastUnseenCheck = Date.now() - 200;
	this.type = _m.type ?? 'mission';
	this.enemyCounts = _m.enemyCounts;
	this.pvp = _mapSprite.battleGround || _mapSprite.pvp;
	this.runToSwitch = _mapSprite.runToSwitch;
	this.subMap = _mapSprite.subMap;
	this.characterZoom = _mapSprite.characterZoom;
	this.tower = _mapSprite.tower;
	this.gold = _mapSprite.gold;
	this.dungeon = _mapSprite.dungeon;
	__maxRageCount = this.pvp ? 40 : 20;
	this.theme = _mapSprite.theme;
	this.assetPath = _mapSprite.assetPath ?? this.theme;
	this.lobby = _mapSprite.lobby;
	this.floors = _mapSprite.floors;
	this.ambianceVolume = _mapSprite.ambianceVolume;
	this.ambiancePath = _mapSprite.ambiancePath;
	if (this.floors)
		this.currentFloor = _m.currentFloor ?? 1;
	this.backgroundSrc = this.assetPath;
	this.totalObjectCount = _m.totalObjectCount;
	this.ground = _mapSprite.ground;
	//this.zoom = __zoom * (this.ground.zoom ?? 1);
	this.id = _mapSprite.id;
	this.mobs = _mapSprite.mobs;
	this.mobs.forEach(x => {
		x.listed = 1;
		if(x.spawnMinX !== undefined)
			delete x.spawnMinX;
		if(x.spawnMaxX !== undefined)
			delete x.spawnMaxX;
	});
	this.itemGrade = _mapSprite.itemGrade ?? 0;
	this.equipmentDropRates = _mapSprite.equipmentDropRates;
	this.artifacts = [];
	// this.cHeight = _canvas.height;
	// this.cUIHeight = _canvas.height * __scale;
	// this.cWidth = _canvas.width;
	// this.cUIWidth = _canvas.width * __scale;
	// this.dmgFrameHeight = this.cHeight / 20;
	// this.dmgFrameTopBoundary = MathRound(this.cHeight * .15);
	// this.RECT = { 
	// 	left: 0, 
	// 	right: this.cWidth,
	// 	top: 0, 
	// 	bottom: this.cHeight, 
	// 	width: this.cWidth, 
	// 	realWidth: this.cWidth 
	// };
	// this.damages = [];
	// for(let i = 0; i < 5; i++){
	// 	const _textElem = document.createElement('div');
	// 	_textElem.className = 'dmg';
	// 	_gamePad.appendChild(_textElem);
	// 	this.damages.push(_textElem);
	// }
	// setTimeout(function() {
	// 	initDmgFrames();
	// }, 100);
	if(this.id < 107 && this.id > 1 && !this.lobby && !_mapSprite.menu && !this.entertainment && !__storyScene?.noArtifact)
	{
		//artifact ekleyelim
		const _minArtifactGrade = __artifacts.map(x => x.group).sort()[0];
		const _maxArtifactGrade = __artifacts.map(x => x.group).sort().reverse()[0];
		const _artifactGrade = getRandomValue2(_minArtifactGrade, _maxArtifactGrade);
		let _artifact;
		if(getRandomValue2(1, _artifactGrade * 100) === 1)
		{
			const _artifactOrder = getRandomValue2(1, __artifacts.filter(x => x.group === _artifactGrade).length);
			const _art = __artifacts.filter(x => x.group === _artifactGrade)[_artifactOrder - 1];
			if(!__account.artifacts.find(x => x.id === _art.id))
				_artifact = _art;
		}
		if(_artifact)
			this.artifacts.push({
				id: 'artifact', 
				artifactId: _artifact.id,
				frames: [
					{ 
						top: 0, 
						left: 0, 
						width: 128, 
						height: 128, 
						speed: 120 
					}
				], 
				npc: true, 
				width: 128, 
				height: 128,
				zoom: 1, 
				locate: { left: getRandomValue2(256, _mapSprite.width - 256), bottom: -10 },
			});
	}
	this.croppedSprites = new Map();
	this.getCroppedSprite = function(_x, _y, _w,  _h, _char, _src, _fKey) {
		const _key = _fKey ?? ('l' + _x + 't' + _y +'w' + _w  + 'h'+ _h);
		if(_char.lastSpriteKey === _key)
			return _char.lastSprite;
		// let _map = this.croppedSprites.get(_src);
		// if (_map) {
		// 	let sprite = _map[_key];
		// 	_char.lastSprite = sprite;
		// 	_char.lastSpriteKey = _key;
		// 	return sprite;
		// }
		let srcMap = this.croppedSprites.get(_src);
		if (srcMap) {
			let sprite = srcMap.get(_key);
			_char.lastSprite = sprite;
			_char.lastSpriteKey = _key;
			return sprite;
		}
		if(_char.lastSprite)
			_char.lastSprite = _char.lastSpriteKey = undefined;
		return undefined;
	}
	this.loadCharacterSprites = async function(_func, _extraIds, _kk, _excludeMain, _useCurrentEnemies) {
		if(this.menu)
		{
			_func();
			return;
		}
		if(!_kk)
			this.disposing = 1;
		const _ids = this.mobs.map(x => x.id);
		if(mainCharacter && !_excludeMain)
			_ids.push(mainCharacter.realId ?? mainCharacter.id);
		if(_extraIds?.[0])
			for(let _id of _extraIds)
				if(_ids.indexOf(_id) === -1)
					_ids.push(_id);
		const _spls = [];
		const _loadCharacterSprite = async function(_e) {
			const _keys = _kk ?? Object.keys(_e.animations);
			for(let _key of _keys) {
				const _anim = _e.animations[_key];
				// if(_key.startsWith('idle') || _key.startsWith('counter') || _key === 'release' || _key === 'before' || _key === 'start' ||
				// 	_anim.type === 'move' || _anim.interactive || _anim.baseKey === 'finish' ||
				// 	_anim.key.startsWith('dead') || _anim.key.startsWith('knockback'))
				// 	continue;
				if(!_anim) {
					console.log('enemy' + _e?.id + ' ' + _key);
					continue;
				}
				if(_anim.frames?.[0]){
					for(let _f of _anim.frames) {
						if(_f.spell?.key && _spls.indexOf(_f.spell.key) === -1)
							_spls.push(_f.spell.key);
						const _cKey = 'l' + _f.spriteLeft + 't' + _f.spriteTop + 'w' + _f.spriteWidth + 'h' + _f.spriteHeight;
						let _src = _f.src ?? _anim.src ?? _e.src;
						if(!_src)
							continue;
						if(episode.croppedSprites.get(_src)?.[_cKey])
							continue;
						else if(!_src.endsWith('.png'))
							_src += 'sprite.png';
						const _img = await getImagePromise(_src, 1);
						const _cacheCAN = document.createElement('canvas');
						_cacheCAN.width = _f.spriteWidth;
						_cacheCAN.height = _f.spriteHeight;
						const _cacheCTX = _cacheCAN.getContext('2d');
						_cacheCAN.imageSmoothingEnabled = false;
						_cacheCTX.drawImage(_img, _f.spriteLeft, _f.spriteTop, 
						_f.spriteWidth, _f.spriteHeight, 0, 0, _cacheCAN.width, _cacheCAN.height);
						// if (!episode.croppedSprites.has(_src))
						// 	episode.croppedSprites.set(_src, {});
						// const _map = episode.croppedSprites.get(_src);
						// if (!_map[_cKey])
						// 	_map[_cKey] = _cacheCAN;
						let srcMap = episode.croppedSprites.get(_src);
						if (!srcMap) {
							srcMap = new Map();
							episode.croppedSprites.set(_src, srcMap);
						}
						if (!srcMap.has(_cKey)) {
							srcMap.set(_cKey, _cacheCAN);
}
					}
				}
			}
		}
		for(const id of _ids)
			await _loadCharacterSprite(_useCurrentEnemies ? episode.enemies.find(x => x.id === id) : _allEnemies['enemy' + id]());
		_spls.push('electricboltsmall');
		for(const key of _spls)
			await _loadCharacterSprite(new enemy(structuredClone2(spells[key])));
		if(!_kk)
			delete this.disposing;
		_func();
	}
	this.setRepeat = function(_mSprite) {
		if (_mSprite.do) {
			if(_mSprite.repeat){
				this.do = _mSprite.do;
				this.doTime = _gameTick;
				this.repeat = _mSprite.repeat;
			}
			_mSprite.do();
		}
	}
	this.setRepeat(_mapSprite);
	let _canvasAreas = document.querySelectorAll('.canvas');
	for (var _ca of _canvasAreas)
		_ca.innerHTML = '';
	_canvasAreas = document.querySelectorAll('canvas');
	for (var _ca of _canvasAreas)
		_ca.getContext('2d').clearRect(0, 0, _ca.width, _ca.height);
	const _healtbars = document.querySelectorAll('.health-bar-tiny, .war-player-name');
	for (var _hb of _healtbars)
		_hb.remove();
	if (pvpCounter)
		pvpCounter.remove();
	if (this.ground) {
		this.ground.src = './images/texture/' + this.assetPath + '-ground.png';
		// if (this.ground.yRate)
		// 	groundheight = MathRound(idealground_height * this.ground.yRate);
		// else
		// 	groundheight = idealground_height;
		// minPositionY = this.ground.bottomGap ? MathRound(this.ground.bottomGap * __zoom) : 1;
		// minLeft = this.ground.leftGap ? MathRound(this.ground.leftGap * __zoom) : 0;
		// maxLeft = this.ground.rightGap ? MathRound(this.ground.rightGap * __zoom) : 0;
	}
	// else
	// 	groundheight = idealground_height;
	
	// this.XStep = MathRound(getGroundHeight() / 4);
	// this.YStep = MathRound(getGroundHeight() / 5);
	this.moveCamera = function(_endFunc, speed, force) {
		if(!mainCharacter)
			return;
		if(!force && mainCharacter.left <= centerMinX) {
			if(_endFunc)
				_endFunc();
			return;
		}
		const _chars = this.enemies.filter(x => x.class !== 'object' && !x.isDead() && !x.remove && (!x.immobilize || force));
		if(_chars?.[0]) {
			if(!this.cameraMoveStep) {
				_chars.forEach(x => x.immobilize = x.disableKeyboard = true);
				mainCharacter.fps = 1;
				blurKeyboard();
				this.cameraMoveStep = (speed ?? 1) * MathCeil((mainCharacter.calculateMoveXStep() * this.cWidth) / 100);
				this.cameraMoveEndFunc = _endFunc;
			}
		}
	}
	this.installMob = function (_mob, _func, _return, _respawn) {
		for (var i = 0; i < (_respawn ? 1 : (_mob.count ?? 1)); i++) {
			if (_mob.chanceRate && getRandomValue2(1, 100) > _mob.chanceRate)
				continue;
			let _id = _mob.id;
			if (_mob.ids)
				_id = _mob.ids[getRandomValue2(0, _mob.ids.length - 1)];
			const _enemy = _store.getMainCharacter(_allEnemies[('enemy' + _id)]());
			_store.setCharacterStats(_enemy);
			_enemy.yPosition = (_mob.yPosition ? (typeof _mob.yPosition === 'function' ? _mob.yPosition(_enemy) : _mob.yPosition) : getRandomValue2(minPositionY, getGroundHeight()));
			_enemy.direction = _mob.direction ?? getRandomValue2(0, 1) < 1 ? __left : __right;
			_enemy.left = getRandomValue2((_mob.spawnMinX ?? _mob.minX) ? MathRound((_mob.spawnMinX ?? _mob.minX) * __zoom) : 0,
				(_mob.spawnMaxX ?? _mob.maxX) ? MathRound((_mob.spawnMaxX ?? _mob.maxX) * __zoom) : this.width - _enemy.WIDTH);
			if(_respawn)
				_enemy.respawned = _enemy.located = _enemy.started = 1;
			_enemy.platformX = platformX;
			_enemy.experience = _mob.experience ?? 0;
			_enemy.grade = _mob.grade ?? 1;
			if (_enemy.grade > 1) {
				_enemy.gradeLeft = _enemy.grade - 1;
				_enemy.zoom *= (1 + ((_enemy.gradeZoomRate ?? .1) * _enemy.gradeLeft));
				_enemy.atk *= _enemy.grade;
				_enemy.experience *= _enemy.grade;
			}
			if(_mob.spawn)
				_enemy.respawnAfterSeconds = _mob.spawn;
			if(_mob.spawnAsGroup)
				_enemy.spawnAsGroup = _mob.spawnAsGroup;
			if(_mob.spawnTime)
				_enemy.spawnTime = _mob.spawnTimeStart = _mob.spawnTime;
			if (_mob.groupId)
				_enemy.groupId = _mob.groupId;
			_enemy.displayName = _mob.name;
			_enemy.level = getRandomValue2(_mob.minLevel ?? 1, _mob.maxLevel ?? (_mob.minLevel ?? 1));
			let _levelRate = 1;
			if(_enemy.level > (_mob.minLevel ?? _enemy.level))
				_levelRate = 1 + ((_enemy.level - _mob.minLevel) / 10);
			_enemy.atk = _mob.atk ?? MathRound(_enemy.atk *_levelRate);
			_enemy.maxHP = MathRound(_enemy.maxHP *_levelRate);
			_enemy.def = MathRound(_enemy.def *_levelRate);
			if (_mob.hp)
				_enemy.maxHP = _enemy.MAXHP = _enemy.health = _mob.hp;
			_enemy.setHealth(_enemy.MAXHP);
			_enemy.sight = _mob.sight;
			if(_mob.zoom)
				_enemy.zoom *= _mob.zoom;
			_enemy.actions = _mob.actions;
			if (_mob.props)
				_enemy.setProps(_mob.props);
			if (_mob.difficulty >= 0)
				_enemy.difficulty = _mob.difficulty;
			if(_mob.inventory) {
				_enemy.inventory = _mob.inventory;
				applyCharacterStats(null, _enemy);
			}
			_enemy.enemy = _mob.enemy ?? true;
			_enemy.friendly = _mob.friendly ?? false;
			_enemy.main = false;
			_enemy.setAutoMode(_mob.attackAfterHit ? 0 : 2);
			this.enemies.push(_enemy);
			if (_func)
				_func(_enemy);
			// if((this.dungeon || this.pvp) && mainCharacter.leader) 
			// {
			// 	_enemy.socketId = (this.enemies.filter(x => x.socketId < 1000).map(x => x.socketId).sort().slice(-1)[0] ?? 0) + 1;
			// 	_enemy.station = mainCharacter.socketId;
			// 	//_enemy.getNewStatus(1, 1);
			// }
			if(_mob.do)
				_mob.do(_enemy);
			if(_mob.targetKey) {
				let _tKey = _mob.targetKey;
				if(_mob.targetKey.indexOf(',') !== -1)
				{
					const _arr = _mob.targetKey.split(',');
					_tKey = _arr[getRandomValue2(0, _arr.length - 1)];
				}
				const _m = this.enemies.find(x => x.key === _tKey);
				if(_m)
					_enemy.setAutoTarget(_m);
			}
			if(_mob.ownerKey){
				_enemy.owner = this.enemies.find(x => x.key === _mob.ownerKey);
				if(!_enemy.owner.enemy)
					_enemy.enemy = false;
			}
			if(_mob.pick)
				_enemy.pickNewTarget();
			if (_return)
				return _enemy;
		}
	}
	this.installMobs = function (_arr, _func) {
		if (!mainCharacter.leader && this.dungeon)
			return;
		if (this.mobs?.[0] || _arr)
			for (var _mob of _arr ?? this.mobs){
				delete _mob.spawnMinX;
				delete _mob.spawnMaxX;
				if(_mob.spawnAsGroup)
					_mob.spawnAsGroup = (_arr ?? this.mobs).filter(x => x.id === _mob.id && x.groupId === _mob.groupId)?.map(x => x.count)?.reduce((prev, next) => prev + next) ?? 1;
				this.installMob(_mob, _func);
			}
		if(_arr && !this.mobs?.[0])
			this.mobs = _arr.filter(x => x.spawn);
	}
	this.road = _mapSprite.road;
	if (this.road)
		this.road.src = './images/texture/' + this.assetPath + '-road.png';
	this.loadLayers = function(_arr) {
		const _tiles = _arr ?? _mapSprite.tiles ?? [];
		this.layers = [];
		for(let _tile of _tiles)
			for(var i = 1; i <= _tile.count; i++)
				this.layers.push({
					theme: _tile.theme,
					name: _tile.name,
					locate: {
						bottom: _tile.bottom,
						left: _tile.left ? _tile.left :  (i - 1) * _tile.width
					},
					marginTop: _tile.marginTop,
					marginLeft: _tile.marginLeft ? _tile.marginLeft : (i - 1) * _tile.width,
					left: _tile.left ? _tile.left : (i - 1) * _tile.width,
					bottom: _tile.bottom,
					foreground: _tile.foreground,
					new: i > 1,
					rate: _tile.rate,
					zoom: _tile.zoom,
					width: _tile.width,
					height: _tile.height
				});
		if (this.layers)
			for (var _lay of this.layers)
				_lay.src = './images/texture/' + (_lay.theme ?? this.assetPath) + '-' + _lay.name + '.png?z=' + _lay.zoom;
				
	}
	this.floor = _mapSprite.floor;
	this.bgAnimations = _mapSprite.bgAnimations;
	if (this.bgAnimations)
		for (var _lay of this.bgAnimations) {
			_lay.src = './images/texture/' + this.assetPath + '-bg-sprite-' + _lay.name + '.png';
			if (_lay.delay)
				_lay.delayLeft = _lay.delay;
			if (_lay.from) {
				_lay.left = _lay.from;
				const _distance = MathAbs(_lay.from - _lay.to);
				_lay.stepX = MathRound(_distance / (_lay.ms / (1000 / fps)));
			}
		}
	if (this.floor)
		for (var _lay of this.floor)
			_lay.src = './images/texture/' + this.assetPath + '-' + _lay.name + '.png';
	if (this.ground && !this.ground.totalFrames)
		this.ground.totalFrames = 1;
	this.drops = _m.drops;
	this.experience = _m.experience;
	this.finalDrops = _m.finalDrops;
	this.perfectCompleteRequirements = _m.perfectCompleteRequirements;
	this.key = _m.key;
	this.minGearScore = _m.minGearScore;
	this.loadObject = function(_obj) {
		if(_obj.frames && !_obj.speedUp){
			_obj.speedUp = 1;
			_obj.frames.forEach(x => x.speed = MathRound(x.speed / (__globalMS / 20)));
		}
		const _maxCount = 1;
		for (var i = 0; i < _maxCount; i++) {
			if (!_obj.key)
				_obj.key = _obj.id;
			const _clone = structuredClone2(_obj);
			let _src = _clone.src;
			if (!_clone.text && !_src)
				_clone.src = (_obj.id === 'artifact' ? './images/artifacts/' : './images/texture/') +
					(_obj.totalFrames > 1 ? (_obj.theme ?? this.assetPath) + '-' + _obj.key + '.gif' :
					(_obj.id !== 'artifact' ? (_obj.theme ?? this.assetPath) + _obj.key + '.png' : _obj.artifactId + '.png'));
			if (!_clone.totalFrames)
				_clone.totalFrames = 1;
			if (!_clone.zoom)
				_clone.zoom = 1;
			const _object = getObject(_clone, _obj.locate.left, _obj.locate.bottom);
			if (_obj.when)
				_object.when = _obj.when;
			if (_obj.do)
				_object.do = _obj.do;
			_object.totalFrames = _clone.totalFrames;
			_object.speed = _clone.speed;
			_object.delay = _clone.delay;
			_object.disabled = _clone.disabled;
			_object.rotate = _clone.rotate;
			_object.dialogs = _clone.dialogs;
			_object.wait = _clone.wait;
			_object.glow = _clone.glow;
			_object.alpha = _clone.alpha;
			_object.npc = _clone.npc;
			_object.frames = _clone.frames;
			_object.sound = _clone.sound;
			_object.to = _clone.to;
			_object.text = _clone.text;
			if(_clone.artifactId)
				_object.artifactId = _clone.artifactId;
			if(_src)
				_object.src = _src;
			if(_clone.maxWidth)
				_object.maxWidth = MathRound((_clone.zoom ?? 1) * __zoom * _clone.maxWidth);
			if (_clone.rightGap)
				_object.rightGap = MathRound(_clone.rightGap * (_clone.zoom ?? 1) * __zoom);
			if (_clone.topGap)
				_object.topGap = MathRound(_clone.topGap * (_clone.zoom ?? 1) * __zoom);
			_object.quest = _clone.quest;
			_object.rate = _clone.rate;
			_object.col = _clone.col ?? _object.totalFrames;
			if (_clone.foreground)
				_object.foreground = _clone.foreground;
			if (_clone.background)
				_object.background = _clone.background;
			if (!_object.realWidth)
				_object.realWidth = _object.width;
			this.sprites.push(_object);
			return _object;
		}
	}
	
	this.checkTowerResult = function(_timeIsUp, _diff) {
		let _end;
		if(mainCharacter.isDead()) {
			this.resultStars.forEach(x => x.failed = 1);
			_end = 1;
		}
		const _drawCount = this.enemies?.filter(x => x.enemy && x.class !== __spell && x.class !== 'object' && !x.remove)?.length ?? 0;
		const _enemyCount = this.enemies?.filter(x => x.enemy && x.class !== __spell && x.class !== 'object' && !x.isDead())?.length ?? 0;
		const _object = this.enemies?.find(x => x.enemy && x.class === 'object');
		if(_enemyCount === 0 && !this.pauseTime)
			this.pauseTime = Date.now();
		if(_timeIsUp && _enemyCount > 0)
			this.resultStars[1].failed = _end = 1;
		const _t = __account.missions.find(x => x.key === 'tower');
		const _noObject = _t.current <= _t.max;
		if(_drawCount === 0 && !_object && !_noObject) {
			const _chest = {
				id: 4,
				count: 1,
				direction: __right,
				minX: this.centerLeft,
				maxX: this.centerLeft,
				yPosition: getGroundHeight(),
				attackAfterHit: true
			};
			const _respawner = episode.installMob(_chest, null, 1);
			_respawner.respawn();
			return;
		}
		if(!_object?.remove && !_end && !_noObject)
			return;
		if(!_end)
			_end = (_enemyCount === 0);
		if(!_end)
			return;
		if (!pvpResult)
			pvpResult = document.getElementById('pvp-result');
		if (!pvpStatus)
			pvpStatus = document.getElementById('pvp-status');
		showMyModalPopUp('pvp-result');
		this.pauseAmbianceMusic();
		const _fail = this.resultStars.find(x => x.failed);
		if(!_fail)
			this.playSound({ key: 'victory', volume: .2 });
		else
			this.enemies.forEach(x => x.immobilize = true);
		const _missionGain = !_diff ? 0 : _diff * 100;
		let _table = '<div class="flex full pvp-result-table tower-result"><div class="flex" style="width:100%;height:15vh;position:relative"><img src="./images/icons/reward-star.png" style="height:100%;position:absolute"' + (_fail ? ' class="gray"': '') + ' /><span style="z-index:2;margin-top:4.7vh;font-size:3.15vh!important;font-weight:600;text-shadow:0px 0px 1vh #000;color:' + (_fail ? 'crimson' : '#F4BB44') + ' !important">' + getLangData('Mission' + (_fail ? ' Failed' : ' Cleared')) + '</span></div><div style="width:100%;overflow-y:auto;height:calc(100% - 15vh)"><div style="width:100%" class="flex"><span>';
		for(let _star of this.resultStars)
			_table += `<div class="flex" style="padding:2vh 2vh 0 2vh;width:100%;height:6vh">
				<img src="./images/icons/star.png" style="height:4vh"${_star.failed ? ' class="gray"' : ' class="glow"'} />
				<div class="flex flex-jc-start" style="padding-left:2vh;flex:1;font-size:2.4vh !important;height:100%;${_star.failed ? 'color:#f7f7f799 !important;text-decoration: line-through' : 'color:F4BB44 !important'}">
					${getLangData(_star.title)}
				</div>
			</div>`;
		_table += `</span></div>`;
		let _needUpdateFirst;
		if(!_fail) {
			const _mission = _missions.find(x => x.key === 'tower').props.find(x => x.level === _t.level);
			const _gain = _mission.floors.find(x => x.floor = _t.current).gain;
			const _rewards = [];
			for(const _g of _gain)
				if(_g.key === 'chest' && _t.max < _t.current)
					for(let _i = 0; _i < (_g.count ?? 1); _i++)
						_rewards.push(getChestReward(_g.grade ?? 1));
				else
					_rewards.push(structuredClone2(_g));
			_table += `<div class="flex" style="width:100%;padding:2vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Chest Rewards')}</div>`;
				for(let _reward of _rewards)
					_table += `<div class="flex" style="width:100%;height:5vh"><div style="height:100%" class="flex"><img style="width:5vh" src="${_reward.src ?? './images/icons/' + _reward.key + '.png'}" /><div class="flex" style="height:100%;font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">${_reward.count ?? 1}x ${getLangData(_reward.title ?? _reward.type).toProperCase()}</div></div></div>`;
				_table += `<div class="flex" style="width:100%;padding:2vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Mission Rewards')}</div>
				<div class="flex" style="width:100%;height:5vh"><div style="height:100%" class="flex"><img style="width:5vh" src="./images/icons/coin.png" /><div class="flex" style="height:100%;font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">${_missionGain} ${getLangData('Gold')} (+Bonus)</div></div></div>
			`;
			if(_t.current < 10) {
				if(_t.max < _t.current)
					_t.max = _t.current;
				_t.current++;
				_t.lastActivity = _gameTick;
				_client.saveState(1);
			}
			else 
				_needUpdateFirst = 1;
		}
		_table += `</div><div class="flex" style="width:100%;height:8vh">
			<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important;line-height:3vh !important" onexactclick="hideMyModalPopUp(1);reviveAtLobby()">${getLangData('QUIT')}</div>
			</div>
			<div class="${_fail ? 'd-none' : 'flex'}" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me${_needUpdateFirst ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important;line-height:3vh !important" onexactclick="trySwitchMap(${episode.id})">${getLangData('NEXT')}</div>
			</div>
			<div class="${_fail ? 'flex' : 'd-none'}" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important;line-height:3vh !important" onexactclick="trySwitchMap(${episode.id})">${getLangData('RETRY')}</div>
			</div>
		</div>`;
		pvpStatus.innerHTML = _table + '</div>';
		this.pvpEnded = true;
		switchAutoMode(1);
	}
	this.checkMapName = function () {
		if (!_mapSprite.coords?.title || _mapSprite.gold || _mapSprite.tower || _mapSprite.pvp)
			return;
		if(!this.nameWriten) {
			this.nameWriten = _gameTick;
			pvpCounter = document.createElement('div');
			pvpCounter.className = 'flex animate-me-600 map-name countdown';
			pvpCounter.id = 'pvp-counter';
			if(!__storyScene?.leaderBoards)
				pvpCounter.innerText = __locations.find(x => x.mapId === _mapSprite.id)?.titles?.[getLang()] ?? getLangData( _mapSprite.coords.title);
			else
				pvpCounter.innerHTML = '<div class="flex" style="color:#F4BB44">' + getLangData('Stage') + ' ' + __storySceneOrder + '</div><div class="flex w-100">' + getLangData('Score') + ': ' + (__story.point ?? 0).formatWithDots() + '</div>'; 
			_gameUI.appendChild(pvpCounter);
		}
		else if((_gameTick - this.nameWriten) > 2399) {
			this.nameWriten *= 2;
			removeClass(pvpCounter, 'countdown');
		}
	}
	this.checkGoldResult = function(_timeIsUp, _diff) {
		let _end;
		let _fail = false;
		const _enemyCount = this.enemies?.filter(x => x.enemy && x.class != 'object' && !x.isDead())?.length ?? 0;
		if(_enemyCount === 0 && !this.pauseTime){
			this.pauseTime = Date.now();
			if(__story)
				__story.endTime = _gameTick;
		}
		const _t = __account.missions.find(x => x.key === 'gold');
		const _miss = _missions.find(x => x.key === 'gold');
		const _mission = _miss.props.find(x => x.level === _t.level);
		let _goldGain = _mission.gold;
		const _en = this.enemies.find(x => x.enemy);
		if(_timeIsUp && _enemyCount > 0){
			_fail = _end = 1;
			const _hpAll = _en.MAXHP * _en.grade;
			const _hpLeft = (_en.MAXHP * _en.gradeLeft) + _en.health;
			_goldGain = MathRound(_goldGain * ((_hpAll - _hpLeft) / _hpAll));
		}
		if(!_en?.remove && !_end)
			return;
		if(!_end)
			_end = (_enemyCount === 0);
		if(!_end)
			return;
		this.pvpEnded = true;
		const _missionGain = _fail ? 0 : (!_diff ? 0 : _diff * 100);
		if(!_fail)
			installStoryFinish();
		else
			installStoryFinish(1, {key:'gold', count:_missionGain + _goldGain});
		return;
		this.pauseAmbianceMusic();
		if(!_fail)
			this.playSound({ key: 'victory', volume: .2 });
		else
			mainCharacter.immobilize = true;
		//const _missionGain = _fail ? 0 : (!_diff ? 0 : _diff * 100);
		let _table = '<div class="flex full pvp-result-table tower-result"><div class="flex" style="width:100%;height:16vh;position:relative"><span style="margin-top:4.7vh;z-index:2;font-size:3.15vh !important;font-weight:600;text-shadow:0px 0px 1vh #000;color:' + (_fail ? 'crimson' : '#F4BB44') + ' !important">' + getLangData('Mission' + (_fail ? ' Failed' : ' Cleared')) + '!</span></div><div style="width:100%;overflow-y:auto;height:calc(100% - 24vh);z-index:2"><div style="width:100%" class="flex"><span>';
		_table += `</span></div>`;
		let _reachedMax = false;
		_table += `<div class="flex flex-jc-start" style="z-index:2;width:100%;padding:2vh 0 1vh 0;color:#F3F4F5 !important; font-size:2.6vh !important;padding-top: 4%;padding: 1%;border-bottom: 1px solid #9d987f60">${getLangData('Finish Rewards')}</div>`;
		_table += `<div class="flex flex-jc-start" style="padding:4% 2%;z-index:2;width:100%"><div class="flex flex-ai-end"><img style="width:5vh" src="./images/icons/gold.png" /><div style="font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">&nbsp;x&nbsp;${_goldGain}</div></div></div>`;
		if(!_fail && _missionGain > 0)
			_table += `<div class="flex flex-jc-start" style="z-index:2;width:100%;padding:2vh 0 1vh 0;color:#F3F4F5 !important; font-size:2.6vh !important; ;padding-top: 4%;padding: 1%;border-bottom: 1px solid #9d987f60">${getLangData('Mission Rewards')}</div>
				<div class="flex flex-jc-start" style="padding:4% 2%;z-index:2;width:100%"><div class="flex"><img style="width:5vh" src="./images/icons/coin.png" /><div style="font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">&nbsp;x&nbsp;${_missionGain} (+Bonus)</div></div></div>`;
		//_t.current++;
		// if(_miss.limit <= _t.current)
		// 	_reachedMax = 1;
		updateGold(_missionGain + _goldGain);
		_table += `</div><div class="flex" style="width:100%;height:8vh;z-index:2">
			<div class="flex" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="quitFromStory()">${getLangData('QUIT')}</div>
			</div>
			<div class="flex" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me${_reachedMax ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="loadLastStoryCheckPoint()">${getLangData('RETRY')}</div>
			</div>
		</div>`;
		//pvpStatus.innerHTML = _table + '</div>';
		const _parent = document.createElement('div');
		_parent.innerHTML = `<div class="flex my-pop-up-wrapper show" id="pvp-result">
				<div id="game-over-pvp-content" class="flex" style="padding: 2%; width: 50%; height: 80%; border: 2px solid #b8860bcc; border-radius: 4vh; box-shadow: 0px 0px 2vh #000; background: linear-gradient(180deg, #000000cc, #00000099), url(./images/icons/battle.png); background-size:cover">
					<div style="width:100%" class="flex full">
						<div class="full" style="width:80%;color:#fff;text-align:center" id="pvp-status">`
							+ _table + '</div>' +
						`</div>
					</div>
				</div>
			</div>`;
		this.pvpResult = _parent.firstChild;
		_gameUI.appendChild(this.pvpResult);
		this.pvpEnded = true;
		switchAutoMode(1);
	}
	this.checkPVPResult = function () {
		if (this.pvpEnded || this.pvpResult || _storySceneSwitching || __switchingMap || this.disposing)
			return;
		let _end, _diff;
		if (!this.pvpStarted) {
			this.pvpStarted = Date.now();
			this.missionCountDown = 1;
			pvpCounter = document.createElement('div');
			pvpCounter.className = 'flex animate-me countdown pop2';
			pvpCounter.id = 'pvp-counter';
			pvpCounter.innerHTML = this.tower ? '<span style="font-weight:600;color:crimson!important">FLOOR ' +__account.missions.find(x => x.key === 'tower').current + '</span>' : 3;
			if(!this.tower)
				this.playSound({ key: 'beep', volume:.3 });
			_gameUI.appendChild(pvpCounter);
			if(mainCharacter?.keyboard) {
				mainCharacter.disableKeyboard = true;
				blurKeyboard();
			}
		}
		else {
			const _baseTime = ((this.tower && (__account.missions.find(x => x.key === 'tower').current % 10) > 0) || this.gold) ? 60 : 180;
			_diff = (_baseTime + (this.tower ? 4 : 3)) - MathFloor(((this.pauseTime ?? Date.now()) - this.pvpStarted) / 1000);
			if (_diff < 10)
				addClass(pvpCounter, 'pvp-end-soon');
			if (_diff < 0 || (_diff > _baseTime && this.challangeStarted)) {
				_end = true;
				delete this.challangeStarted;
				pvpCounter.innerText = 0;
			}
			if (_diff > _baseTime) {
				if (pvpCounter.innerText !== (_diff - _baseTime).toString()) {
					if((_diff - _baseTime) <= 3) {
						this.playSound({ key: 'beep', volume:.3 });
						pvpCounter.innerHTML = '';
						pvpCounter.innerText = _diff - _baseTime;
						removeClass(pvpCounter, 'pop2');
						removeClass(pvpCounter, 'pop');
						void pvpCounter.offsetWidth;
						addClass(pvpCounter, 'pop');
					}
				}
			}
			else if (_diff === _baseTime) {
				if (pvpCounter.innerText !== 'START') {
					this.playSound({ key: 'questaccepted', volume: .3 });
					pvpCounter.innerText = 'START';
					removeClass(pvpCounter, 'pop');
					void pvpCounter.offsetWidth;
					addClass(pvpCounter, 'pop');
					delete this.missionCountDown;
					if(mainCharacter?.keyboard)
						mainCharacter.disableKeyboard = false;
				}
			}
			else if (pvpCounter.innerText !== _diff.toString()) {
				if (_diff === _baseTime || (_diff < _baseTime && hasClass(pvpCounter, 'countdown'))) {
					removeClass(pvpCounter, 'countdown');
					episode.enemies?.forEach(x => x.immobilize = false);
					if(__story) {
						__story.startTime = _gameTick;
						this.challangeStarted = 1;
						__story.endTime = undefined;
					}
				}
				if (_diff >= 0 && pvpCounter.innerText !== _diff.toString())
					pvpCounter.innerText = _diff;
			}
		}
		if(this.tower) {
			this.checkTowerResult(_end, _diff);
			return;
		}
		else if(this.gold) {
			this.checkGoldResult(_end, _diff);
			return;
		}
		const _enemies = this.enemies?.filter(x => x.enemy && x.class !== __spell && x.class !== 'object' && !x.isDead() && !x.remove);
		const _teamMates = this.enemies?.filter(x => (x.friendly || x.main || (x.groupId && x.groupId === (mainCharacter.realGroupId ?? mainCharacter.groupId))) && x.class !== __spell && x.class !== 'object' && !x.isDead() && !x.remove);
		const _deads = this.enemies?.filter(x => x.class !== __spell && x.class !== 'object' && x.killedBy);
		if(this.war){
			if(mainCharacter.remove && !mainCharacter.ghosted) {
				const _isMyTeamAlive = _teamMates?.[0];
				if(_isMyTeamAlive) {
					const _isOtherTeamAlive = _enemies?.[0];
					if(_isOtherTeamAlive) {
						episode.realClass = mainCharacter.class;
						const _ghost = summonMob(500, MathRound(mainCharacter.SCREENLEFT / __zoom),
						mainCharacter.yPosition);
						_ghost.realGroupId = mainCharacter.groupId;
						_ghost.noDirection = _ghost.still = _ghost.hasShadow = false;
						_ghost.stepX = mainCharacter.stepX;
						_ghost.stepXRate = mainCharacter.oldProps.stepXRate;
						_ghost.animations.idle.frames.forEach(x => x.objects = undefined);
						_ghost.animations.run = {
							key: 'run',
							type: 'move',
							imediateBreak: true,
							hold: true,
							mobilityY: true,
							frames: structuredClone2(_ghost.animations.idle.frames)
						};
						addClass(_gameUI, 'ghost');
						mainCharacter.main = false;
						mainCharacter.keyboard = undefined;
						mainCharacter.setAutoMode(2);
						const oldMain = mainCharacter;
						mainCharacter = _ghost;
						if (!episode.enemies.includes(oldMain)) {
							const gidx = episode.enemies.indexOf(_ghost);
							if (gidx === -1)
								episode.enemies.push(oldMain);
							else
								episode.enemies.splice(gidx, 0, oldMain);
						}
						_ghost.main = true;
						_ghost.enemy = false;
						setKeyBoard(_ghost);
						_ghost.dead = _ghost.remove = false;
						_ghost.ghosted = 1;
						_ghost.autoMode = undefined;
						_ghost.unseen = false;
						_ghost.located = true;
						warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/ghost.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('You are in ghost mode') + '</span></div>', null, null, 1);
					}
				}
			}
			_deads?.forEach(x => {
				if (!x.grayAvatar) {
					x.grayAvatar = true;
					const _killer = episode.enemies.find(y => y.key === x.killedBy);
					_killer.killCount++;
					let _msg = '';
					if (_killer.killCount > 1) {
						this.playSound({ key: _killer.gender + 'laugh', reset: true });
						_msg = '<div class="flex" style="color:#FD1C03;font-weight:600;font-size:larger !important">' + _killer.killCount + ' x Killing Spree!</div>';
					}
					warn('<div class="pvp-kill">' + _msg + (_killer.main ? __account.name : _killer.displayName ?? _killer.name) + '&nbsp;<span style="color:' + (_killer.enemy ? 'red' : 'blue') + ' !important">' + getLangData('killed') + '</span>&nbsp;' + (x.main ? __account.name : x.displayName ?? x.name) + '</div>', 'level-up', null, null, 1);
				}
				else
					return;
				if (!x.enemy) {
					const _avatar = document.getElementById('char-' + x.key);
					if (_avatar)
						addClass(_avatar, 'gray');
				}
			});
		}
		const _eCount = _enemies?.length ?? 0;
		const _tCount = _teamMates?.length ?? 0;
		if(!this.pauseTime && (!_enemies?.filter(x => !x.isDead())?.length || !_teamMates?.filter(x => !x.isDead())?.length))
			this.pauseTime = Date.now();
		if(_deads?.length) {
			if((_deads.filter(x => x.remove)?.length ?? 0) < _deads.length)
				return;
		}
		if ((_eCount === 0 || _tCount === 0 || _end)) {
			this.pauseAmbianceMusic();
			let _status = (_eCount > 0 && _tCount > 0) ? 1 : (_tCount > 0 ? 2 : 0);
			let _table;
			if(this.war) {
				const _team1 = this.enemies.filter(x => x.groupId === 1);
				const _team2 = this.enemies.filter(x => x.groupId === 2);
				let _rewardsHtml = '';
				if(_status > 1){
					let _honorCount = (mainCharacter.killCount ?? 0) + (mainCharacter.killCount > 1 ? 1: 0) + (mainCharacter.killCount > 2 ? 1: 0);
					__account.pvp.honor+=_honorCount;
					_client.saveState();
					_rewardsHtml = `<div class="flex w-100" style="padding:1vh 0;color:#F4BB44 !important; font-size:3.15vh !important; font-weight: 600">
									${getLangData('Victory Rewards')}
								</div>
								<div class="flex w-100">
									<div class="flex" style="height:4.5vh">
										<img style="width:4vh" src="./images/icons/honor.png" />
										<div style="font-size:3vh !important;color:#f7f7f7cc !important;padding-left:2vh">+1 ${getLangData('Win Bonus')}</div>
									</div>
								</div>`;
					if(mainCharacter.killCount > 0)
							_rewardsHtml += `<div class="flex w-100">
									<div class="flex" style="height:4.5vh">
										<img style="width:4vh" src="./images/icons/honor.png" />
										<div style="font-size:3vh !important;color:#f7f7f7cc !important;padding-left:2vh">+${mainCharacter.killCount} ${getLangData('Kill Bonus')}</div>
									</div>
								</div>`;
				}
				_table = `<div class="flex full pvp-result-table arena-result">
							<div class="flex" style="width:100%;height:11vh;position:relative">
								<span style="margin-top:5vh;z-index:2;font-size:3.15vh !important;font-weight:600;text-shadow:0px 0px 1vh #000;color:${(!_status ? 'crimson' : '#F4BB44')} !important">${getLangData(!_status ? 'Defeat' : (_status > 1 ? 'Victory' : 'Draw'))}</span>
							</div>
							<div class="flex flex-ai-start" style="width:100%;overflow-y:auto;height:calc(100% - 17vh)">
								<div class="war-final-screen flex w-100">
									<div class="war-final-screen-row flex team-1-header">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											&nbsp;
										</div>
										<div class="war-final-screen-cell-25 flex">
											<img src="./images/icons/kill.png">
										</div>
										<div class="war-final-screen-cell-25 flex">
											<img src="./images/icons/dead.png">
										</div>
									</div>
									<div class="war-final-screen-row flex${_team1[0].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team1[0].main ? __account.name : _team1[0].displayName ?? _team1[0].name}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team1[0].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team1[0].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team1[1].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team1[1].main ? __account.name : _team1[1].displayName ?? _team1[1].name}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team1[1].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team1[1].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team1[2].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team1[2].main ? __account.name : _team1[2].displayName ?? _team1[2].name}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team1[2].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team1[2].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex team-2-header">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											&nbsp;
										</div>
										<div class="war-final-screen-cell-25 flex">
											<img src="./images/icons/kill.png">
										</div>
										<div class="war-final-screen-cell-25 flex">
											<img src="./images/icons/dead.png">
										</div>
									</div>
									<div class="war-final-screen-row flex${_team2[0].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team2[0].main ? __account.name : _team2[0].displayName ?? _team2[0].name}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team2[0].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team2[0].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team2[1].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team2[1].main ? __account.name : _team2[1].displayName ?? _team2[1].name}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team2[1].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team2[1].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team2[2].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team2[2].main ? __account.name : _team2[2].displayName ?? _team2[2].name}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team2[2].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex">
											${_team2[2].isDead() ? 1 : 0}
										</div>
									</div>
								</div>
								<div class="flex flex-ai-start w-100">`
							+ _rewardsHtml +
							`</div></div>
							<div class="flex" style="width:100%;height:6vh">
								<div class="flex w-100" style="overflow:hidden;position:relative;height:100%">
									<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(null, __storySceneOrder)">${getLangData('QUIT')}</div>
								</div>
							</div>
						</div>`;
			}
			else {
				_table = '<div class="flex full pvp-result-table arena-result"><div class="flex" style="width:100%;height:15vh;position:relative"><span style="margin-top:4.7vh;z-index:2;font-size:3.15vh !important;font-weight:600;text-shadow:0px 0px 1vh #000;color:' + (!_status ? 'crimson' : '#F4BB44') + ' !important">' + getLangData(!_status ? 'Defeat' : (_status > 1 ? 'Victory' : 'Draw')) + '</span></div><div class="flex" style="flex-direction:column;justify-content:space-between;width:100%;overflow-y:auto;height:calc(100% - 15vh)"><div style="width:80%" class="flex">';
				switch(_status) {
					case 2: 
						if(__account.pvp.lastDuelWin)
							__account.pvp.winStreak++;
						else
							__account.pvp.winStreak = 1;
						if(__account.pvp.maxWinCount < __account.pvp.winStreak)
							__account.pvp.maxWinCount = __account.pvp.winStreak;
						__account.pvp.winCount++;
					    __account.pvp.lastDuelWin = true;
						_table += `<div class="pvp-player-item pvp-winner flex"><div class="pvp-player-item-left flex">
							${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
							<div class="pvp-player-item pvp-looser flex"><div class="pvp-player-item-left flex">
							Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/dead.png" /></div></div>`;
						break;
					case 1: 
					    __account.pvp.lastDuelWin = false;
						__account.pvp.winStreak = 0;
						_table += `<div class="pvp-player-item pvp-draw flex"><div class="pvp-player-item-left flex">
							${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
							<div class="pvp-player-item pvp-draw flex"><div class="pvp-player-item-left flex">
							Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>`;
						break;
					case 0: 
					    __account.pvp.lastDuelWin = false;
						__account.pvp.winStreak = 0;
						__account.pvp.looseCount++;
						_table += `<div class="pvp-player-item pvp-winner flex"><div class="pvp-player-item-left flex">
							Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
							<div class="pvp-player-item pvp-looser flex"><div class="pvp-player-item-left flex">
							${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/dead.png" /></div></div>`;
					break;
				}
				_table + `</div>`;
				if(_status > 1) {
					__account.pvp.honor++;
					updateGlobalQuest('pvp-win');
					const _oldOrder = __account.pvp.order;
					__account.pvp.order = this.pvpOrder;
					const _newOrder = __account.pvp.order;
					if((_oldOrder > 10000 && _newOrder < 10000) ||
						(_oldOrder > 5000 && _newOrder < 5000) ||
						(_oldOrder > 1000 && _newOrder < 1000)) {
						if(_newOrder > 5000)
							updateGlobalQuest('pvp-league-silver');
						else if(_newOrder > 1000)
							updateGlobalQuest('pvp-league-gold');
						warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('Pvp League Updated') + '</span></div>', null, null, 1);
					}
					_table += `<div class="flex" style="width:100%;padding:4vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Duel Rewards')}</div>
						<div class="flex" style="width:100%"><div class="flex"><img style="width:5vh" src="./images/icons/honor.png" /><div style="font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">+1 ${getLangData('Honor Point')}</div></div></div>`;
				}
				_client.saveState();
				_table += `</div><div class="flex" style="width:100%;height:8vh">
					<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
						<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(null, __storySceneOrder)">${getLangData('QUIT')}</div>
					</div>
					<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
						<div class="game-menu-button btn-info full flex animate-me${!__account.pvp.duelCount ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(function() { switchBookPage(` + (this.realTime ? '4,3' : '5,1') + `); }, __storySceneOrder)">${getLangData('BACK')}</div>
					</div>
				</div>`;
			}
			if(_status > 1)
				this.playSound({ key: 'victory', volume: .3 });
			else if(_status === 0)
				this.playSound({ key: 'defeat', volume: .3 });
			//pvpStatus.innerHTML =  _table;
			const _parent = document.createElement('div');
			_parent.innerHTML = `<div class="flex my-pop-up-wrapper show" id="pvp-result">
					<div id="game-over-pvp-content" class="flex" style="padding: 2%; width: 50%; height: 80%; border: 2px solid #b8860bcc; border-radius: 4vh; box-shadow: 0px 0px 2vh #000; background: linear-gradient(180deg, #000000cc, #00000099), url(./images/icons/battle.png); background-size:cover">
						<div style="width:100%" class="flex full">
							<div class="full" style="width:80%;color:#fff;text-align:center" id="pvp-status">`
								+ _table +
							`</div>
						</div>
					</div>
				</div>`;
			this.pvpResult = _parent.firstChild;
			_gameUI.appendChild(this.pvpResult);
			_enemies?.forEach(x => {
				x.immobilize = true;
				x.animate('idle', 1);
				x.upcomingAnimation = 'idle';
			});
			_teamMates?.forEach(x => {
				x.immobilize = !x.main;
				x.animate('idle', 1);
				x.upcomingAnimation = 'idle';
			});
			this.pvpEnded = true;
			switchAutoMode(1);
		}
	}
	this.checkPVPResult2 = function () {
		if (this.pvpEnded || this.pvpResult || _storySceneSwitching || __switchingMap || this.disposing)
			return;
		let _end, _diff;
		if (!this.pvpStarted) {
			this.pvpStarted = Date.now();
			this.missionCountDown = 1;
			pvpCounter = document.createElement('div');
			pvpCounter.className = 'flex animate-me countdown pop2';
			pvpCounter.id = 'pvp-counter';
			pvpCounter.innerHTML = this.tower ? '<span style="font-weight:600;color:crimson!important">FLOOR ' +__account.missions.find(x => x.key === 'tower').current + '</span>' : 3;
			if(!this.tower)
				this.playSound({ key: 'beep', volume:.3 });
			_gameUI.appendChild(pvpCounter);
		}
		else {
			const _baseTime = ((this.tower && (__account.missions.find(x => x.key === 'tower').current % 10) > 0) || this.gold) ? 60 : 180;
			_diff = (_baseTime + (this.tower ? 4 : 3)) - MathFloor(((this.pauseTime ?? Date.now()) - this.pvpStarted) / 1000);
			if (_diff < 10)
				addClass(pvpCounter, 'pvp-end-soon');
			if (_diff < 0 || (_diff > _baseTime && this.challangeStarted)) {
				_end = true;
				delete this.challangeStarted;
				pvpCounter.innerText = 0;
			}
			if (_diff > _baseTime) {
				if (pvpCounter.innerText !== (_diff - _baseTime).toString()) {
					if((_diff - _baseTime) <= 3) {
						this.playSound({ key: 'beep', volume:.3 });
						pvpCounter.innerHTML = '';
						pvpCounter.innerText = _diff - _baseTime;
						removeClass(pvpCounter, 'pop2');
						removeClass(pvpCounter, 'pop');
						void pvpCounter.offsetWidth;
						addClass(pvpCounter, 'pop');
					}
				}
			}
			else if (_diff === _baseTime) {
				if (pvpCounter.innerText !== 'START') {
					this.playSound({ key: 'questaccepted', volume: .3 });
					pvpCounter.innerText = 'START';
					removeClass(pvpCounter, 'pop');
					void pvpCounter.offsetWidth;
					addClass(pvpCounter, 'pop');
					delete this.missionCountDown;
				}
			}
			else if (pvpCounter.innerText !== _diff.toString()) {
				if (_diff === _baseTime || (_diff < _baseTime && hasClass(pvpCounter, 'countdown'))) {
					removeClass(pvpCounter, 'countdown');
					episode.enemies?.forEach(x => x.immobilize = false);
					if(__story) {
						__story.startTime = _gameTick;
						this.challangeStarted = 1;
						__story.endTime = undefined;
					}
				}
				if (_diff >= 0 && pvpCounter.innerText !== _diff.toString())
					pvpCounter.innerText = _diff;
			}
		}
		if(this.tower) {
			this.checkTowerResult(_end, _diff);
			return;
		}
		else if(this.gold) {
			this.checkGoldResult(_end, _diff);
			return;
		}
		const _enemies = this.enemies?.filter(x => x.enemy && x.class !== __spell && x.class !== 'object' && !x.isDead() && !x.remove);
		const _teamMates = this.enemies?.filter(x => (x.friendly || x.main || (x.groupId && x.groupId === (mainCharacter.realGroupId ?? mainCharacter.groupId))) && x.class !== __spell && x.class !== 'object' && !x.isDead() && !x.remove);
		const _deads = this.enemies?.filter(x => x.class !== __spell && x.class !== 'object' && x.killedBy);
		if(this.war){
			if(mainCharacter.remove && !mainCharacter.ghosted) {
				const _isMyTeamAlive = _teamMates?.[0];
				if(_isMyTeamAlive) {
					const _isOtherTeamAlive = _enemies?.[0];
					if(_isOtherTeamAlive) {
						this.realClass = mainCharacter.class;
						const _ghost = summonMob(500, MathRound(mainCharacter.SCREENLEFT / __zoom),
						mainCharacter.yPosition);
						_ghost.killCount = mainCharacter.killCount;
						_ghost.realGroupId = mainCharacter.groupId;
						_ghost.noDirection = _ghost.still = _ghost.hasShadow = false;
						_ghost.stepX = mainCharacter.stepX;
						_ghost.stepXRate = mainCharacter.oldProps.stepXRate;
						_ghost.animations.idle.frames.forEach(x => x.objects = undefined);
						_ghost.animations.run = {
							key: 'run',
							type: 'move',
							imediateBreak: true,
							hold: true,
							mobilityY: true,
							frames: structuredClone2(_ghost.animations.idle.frames)
						};
						addClass(_gameUI, 'ghost');
						mainCharacter.main = false;
						mainCharacter.keyboard = undefined;
						mainCharacter.setAutoMode(2);
						const oldMain = mainCharacter;
						mainCharacter = _ghost;
						if (!episode.enemies.includes(oldMain)) {
							const gidx = episode.enemies.indexOf(_ghost);
							if (gidx === -1)
								episode.enemies.push(oldMain);
							else
								episode.enemies.splice(gidx, 0, oldMain);
						}
						_ghost.main = true;
						_ghost.enemy = false;
						setKeyBoard(_ghost);
						_ghost.dead = _ghost.remove = false;
						_ghost.ghosted = 1;
						_ghost.autoMode = undefined;
						_ghost.unseen = false;
						_ghost.located = true;
						warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/ghost.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('You are in ghost mode') + '</span></div>', null, null, 1);
					}
				}
			}
			_deads?.forEach(x => {
				if (!x.grayAvatar) {
					x.grayAvatar = true;
					const _killer = episode.enemies.find(y => y.key === x.killedBy);
					_killer.killCount++;
					let _msg = '';
					if (_killer.killCount > 1) {
						this.playSound({ key: _killer.gender + 'laugh', reset: true });
						_msg = '<div class="flex" style="color:#FD1C03;font-weight:600;font-size:larger !important">' + _killer.killCount + ' x Killing Spree!</div>';
					}
					warn('<div class="pvp-kill">' + _msg + (_killer.main ? __account.name : _killer.displayName ?? _killer.name) + '&nbsp;<span style="color:' + (_killer.enemy ? 'red' : 'blue') + ' !important">' + getLangData('killed') + '</span>&nbsp;' + (x.main ? __account.name : x.displayName ?? x.name) + '</div>', 'level-up', null, null, 1);
				}
				else
					return;
				if (!x.enemy) {
					const _avatar = document.getElementById('char-' + x.key);
					if (_avatar)
						addClass(_avatar, 'gray');
				}
			});
		}
		const _eCount = _enemies?.length ?? 0;
		const _tCount = _teamMates?.length ?? 0;
		if(!this.pauseTime && (!_enemies?.filter(x => !x.isDead())?.length || !_teamMates?.filter(x => !x.isDead())?.length))
			this.pauseTime = Date.now();
		if(_deads?.length) {
			if((_deads.filter(x => x.remove)?.length ?? 0) < _deads.length)
				return;
		}
		if ((_eCount === 0 || _tCount === 0 || _end)) {
			//this.pauseAmbianceMusic();
			let _rewards = [];
			let _status = (_eCount > 0 && _tCount > 0) ? 1 : (_tCount > 0 ? 2 : 0);
			let _table;
			if(this.war) {
				const _team1 = this.enemies.filter(x => x.groupId === 1);
				const _team2 = this.enemies.filter(x => x.groupId === 2);
				let _rewardsHtml = '';
				_rewards.push({key:'honor', title:getLangData('Blood Honor'), count:mainCharacter.killCount ?? 0});
				if(_status > 1){
					let _honorCount = (mainCharacter.killCount ?? 0) + (mainCharacter.killCount > 1 ? 1: 0) + (mainCharacter.killCount > 2 ? 1: 0);
					//__account.pvp.honor+=_honorCount;
					_client.saveState();
					_rewards.push({key:'honor', title:getLangData('Victory Honor'), count:1});
					// _rewardsHtml = `<div class="flex w-100" style="padding:1vh 0;color:#F4BB44 !important; font-size:3.15vh !important; font-weight: 600">
					// 				${getLangData('Victory Rewards')}
					// 			</div>
					// 			<div class="flex w-100">
					// 				<div class="flex" style="height:4.5vh">
					// 					<img style="width:4vh" src="./images/icons/honor.png" />
					// 					<div style="font-size:3vh !important;color:#f7f7f7cc !important;padding-left:2vh">+1 ${getLangData('Win Bonus')}</div>
					// 				</div>
					// 			</div>`;
					// if(mainCharacter.killCount > 0)
					// 		_rewardsHtml += `<div class="flex w-100">
					// 				<div class="flex" style="height:4.5vh">
					// 					<img style="width:4vh" src="./images/icons/honor.png" />
					// 					<div style="font-size:3vh !important;color:#f7f7f7cc !important;padding-left:2vh">+${mainCharacter.killCount} ${getLangData('Kill Bonus')}</div>
					// 				</div>
					// 			</div>`;
				}
				else
					_rewards.push({key:'honor', title:getLangData('Victory Honor'), count:0});
				_table = `<div class="flex full pvp-result-table arena-result" style="height:68%">
							<div class="flex d-none" style="width:100%;height:11vh;position:relative">
								<span style="margin-top:5vh;z-index:2;font-size:3.15vh !important;font-weight:600;text-shadow:0px 0px 1vh #000;color:${(!_status ? 'crimson' : '#F4BB44')} !important">${getLangData(!_status ? 'Defeat' : (_status > 1 ? 'Victory' : 'Draw'))}</span>
							</div>
							<div class="flex" style="width:100%;overflow-y:auto;height:100%">
								<div class="war-final-screen flex w-100">
									<div class="war-final-screen-row flex team-1-header">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											&nbsp;
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end">
											<img src="./images/icons/kill.png">
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											<img src="./images/icons/dead.png">
										</div>
									</div>
									<div class="war-final-screen-row flex${_team1[0].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team1[0].main ? __account.name : _team1[0].displayName ?? _team1[0].name}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											${_team1[0].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:2vh">
											${_team1[0].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team1[1].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team1[1].main ? __account.name : _team1[1].displayName ?? _team1[1].name}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											${_team1[1].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:2vh">
											${_team1[1].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team1[2].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team1[2].main ? __account.name : _team1[2].displayName ?? _team1[2].name}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											${_team1[2].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:2vh">
											${_team1[2].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex team-2-header">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											&nbsp;
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end">
											<img src="./images/icons/kill.png">
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											<img src="./images/icons/dead.png">
										</div>
									</div>
									<div class="war-final-screen-row flex${_team2[0].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team2[0].main ? __account.name : _team2[0].displayName ?? _team2[0].name}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											${_team2[0].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:2vh">
											${_team2[0].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team2[1].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team2[1].main ? __account.name : _team2[1].displayName ?? _team2[1].name}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											${_team2[1].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:2vh">
											${_team2[1].isDead() ? 1 : 0}
										</div>
									</div>
									<div class="war-final-screen-row flex${_team2[2].main ? ' war-final-screen-row-me' : ''}">
										<div class="war-final-screen-cell-50 flex flex-jc-start">
											${_team2[2].main ? __account.name : _team2[2].displayName ?? _team2[2].name}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:1vh">
											${_team2[2].killCount ?? 0}
										</div>
										<div class="war-final-screen-cell-25 flex flex-jc-end" style="padding-right:2vh">
											${_team2[2].isDead() ? 1 : 0}
										</div>
									</div>
								</div>
								<div class="flex flex-ai-start w-100 d-none">`
									+ _rewardsHtml +
								`</div>
							</div>
							<div class="flex d-none" style="width:100%;height:6vh">
								<div class="flex w-100" style="overflow:hidden;position:relative;height:100%">
									<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(null, __storySceneOrder)">${getLangData('QUIT')}</div>
								</div>
							</div>
						</div>`;
			}
			else {
				_table = '<div class="flex full pvp-result-table arena-result"><div class="flex" style="flex-direction:column;justify-content:space-between;width:100%;overflow-y:auto;height:87.5%;padding:0 12.5%"><div class="flex" style="width:80%;margin-bottom:10%">';
				switch(_status) {
					case 2: 
						_rewards.push({key:'honor', title:getLangData('Victory Honor'), count:1});
						if(__account.pvp.lastDuelWin)
							__account.pvp.winStreak++;
						else
							__account.pvp.winStreak = 1;
						if(__account.pvp.maxWinCount < __account.pvp.winStreak)
							__account.pvp.maxWinCount = __account.pvp.winStreak;
						__account.pvp.winCount++;
					    __account.pvp.lastDuelWin = true;
						_table += `<div class="pvp-player-item pvp-winner flex"><div class="pvp-player-item-left flex flex-jc-start">
							${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
							<div class="pvp-player-item pvp-looser flex"><div class="pvp-player-item-left flex flex-jc-start">
							Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/dead.png" /></div></div>`;
						break;
					case 1: 
						_rewards.push({key:'honor', title:getLangData('Victory Honor'), count:0});
					    __account.pvp.lastDuelWin = false;
						__account.pvp.winStreak = 0;
						_table += `<div class="pvp-player-item pvp-draw flex"><div class="pvp-player-item-left flex flex-jc-start">
							${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
							<div class="pvp-player-item pvp-draw flex"><div class="pvp-player-item-left flex flex-jc-start">
							Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>`;
						break;
					case 0: 
						_rewards.push({key:'honor', title:getLangData('Victory Honor'), count:0});
					    __account.pvp.lastDuelWin = false;
						__account.pvp.winStreak = 0;
						__account.pvp.looseCount++;
						_table += `<div class="pvp-player-item pvp-winner flex"><div class="pvp-player-item-left flex flex-jc-start">
							Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
							<div class="pvp-player-item pvp-looser flex"><div class="pvp-player-item-left flex flex-jc-start">
							${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/dead.png" /></div></div>`;
					break;
				}
				_table + `</div>`;
				if(_status > 1) {
					//__account.pvp.honor++;
					updateGlobalQuest('pvp-win');
					const _oldOrder = __account.pvp.order;
					if(this.pvpOrder)
						__account.pvp.order = this.pvpOrder;
					const _newOrder = __account.pvp.order;
					if((_oldOrder > 10000 && _newOrder < 10000) ||
						(_oldOrder > 5000 && _newOrder < 5000) ||
						(_oldOrder > 1000 && _newOrder < 1000)) {
						if(_newOrder > 5000)
							updateGlobalQuest('pvp-league-silver');
						else if(_newOrder > 1000)
							updateGlobalQuest('pvp-league-gold');
						warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/pvp.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('Pvp League Updated') + '</span></div>', null, null, 1);
					}
					// _table += `<div class="flex" style="width:100%;padding:4vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Duel Rewards')}</div>
					// 	<div class="flex" style="width:100%"><div class="flex"><img style="width:5vh" src="./images/icons/honor.png" /><div style="font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">+1 ${getLangData('Honor Point')}</div></div></div>`;
				}
				_client.saveState();
				_table += `</div><div class="flex d-none w-100" style="height:8vh">
					<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
						<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(null, __storySceneOrder)">${getLangData('QUIT')}</div>
					</div>
					<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
						<div class="game-menu-button btn-info full flex animate-me${!__account.pvp.duelCount ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(function() { switchBookPage(` + (this.realTime ? '4,3' : '5,1') + `); }, __storySceneOrder)">${getLangData('BACK')}</div>
					</div>
				</div>`;
			}
			_enemies?.forEach(x => {
				x.immobilize = true;
				x.animate('idle', 1);
				x.upcomingAnimation = 'idle';
			});
			_teamMates?.forEach(x => {
				x.immobilize = !x.main;
				x.animate('idle', 1);
				x.upcomingAnimation = 'idle';
			});
			this.pvpEnded = true;
			switchAutoMode(1);
			if(this.realTime)
				_rewards = [];
			installStoryFinish(_status === 2 ? 0 : (_status === 1 ? 2 : 1), _rewards, _table);
		}
	}
	this.focusOnPlayer = function(_key) {
		if(!mainCharacter.ghosted)
			return;
		const char = episode.enemies.find(x => x.key === _key);
		if(!char || char.main || char.remove)
			return;
		const _center = MathRound(this.cWidth / 2);
		platformX = char.left - _center;
		mainCharacter.left = _center;
		mainCharacter.updateVariables();
		prevPlatformX = undefined;
		playClick();
	}
	this.checkRespawn = function() {
		if(!this.respawners?.[0])
			return;
		for(let i = 0; i < this.respawners.length; i++)
		{
			const _mob = this.respawners[i];
			if((_mob.date + _mob.ms) < _gameTick) {
				let _respawner = this.installMob(
					_mob.spawnSettings ??
					this.mobs.find(x => x.id === _mob.id),
					null, 1, 1
				);
				//_respawner.zoom *= this.getPerspectiveRate(_respawner, 1);
				this.respawners.splice(i, 1);
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
								spriteHeight: _respawner.HEIGHT,
								objects: _mob.spawnDirection ? undefined : [
									{ 
									key:'respawn', 
									position: 'middle',
									scale: (_respawner.zoom * _respawner.height) / 100
								}
								],
								sound: _mob.spawnDirection ? undefined : { skipUnseen: true, key: 'puff', volume: .3, range: 50 },
								speed: 20,
								def: { iframe: true }
							}
						]
					};
				//_respawner.addObject({ key: 'respawn', position: 'around' });
				_respawner.animate('respawn', 1);
				_respawner.immobilize = false;
				_respawner.updateVariables();
				return;
			}
		}
	}
	this.checkStoryTicketTimer = function() {
		if(__account.storyTicket > 99){
			if(__account.lastStoryTicketNeedTime)
				delete __account.lastStoryTicketNeedTime;
			return;
		}
		const _now = Date.now();
		if(!__account.lastStoryTicketNeedTime)
			__account.lastStoryTicketNeedTime = _now;
		const _diff = _now - __account.lastStoryTicketNeedTime;
		let _finish = 0;
		if(_diff >= 600000) {
			updateTicket(1);
			if(__account.storyTicket > 99){
				delete __account.lastStoryTicketNeedTime;
				_finish = 2;
			}
			else {
				__account.lastStoryTicketNeedTime = _now - (_diff - 600000);
				_finish = 1;
			}
			_client.saveState();
		}
		if(this.menu) {
			const _pt = document.getElementById('portal-timer');
			if(!_pt)
				return;
			if(this.lastStoryTicketTimerCheck > (_gameTick - 1000))
				return;
			switch(_finish) {
				case 2: 
					if(_pt.innerText !== '')
						_pt.innerText = '';
					break;
				case 1:
					if(_pt.innerText !== '(09:59)')
						_pt.innerText = '(09:59)';
					break;
				default:
					const _txt = convertTimespanToTime(_diff);
					if(_pt.innerText !== _txt)
						_pt.innerText = _txt;
					break;
			}
			this.lastStoryTicketTimerCheck = _gameTick;
		}
	}
	this.tinyMoveCamera = function() {
		if(__storyCutScenePlaying || this.end || _dialogAppeared || _game.suspended)
			return false;
		if(this.skipTinyCameraMove) {
			this.skipTinyCameraMove--;
			return false;
		}
		if(!mainCharacter || this?.still || this.ultimateTimeStop || __storyCutScenePlaying || mainCharacter.animation === 'run')
			return false;
		const _deadLeft = mainCharacter.direction === __left ? this.cWidth * .55 : this.cWidth * .35;
		const _deadRight = mainCharacter.direction === __left ? this.cWidth * .65 : this.cWidth * .45;
		if(mainCharacter.left > _deadLeft && mainCharacter.left < _deadRight)
			return false;
		if(!this.cameraEasing){
			this.cameraEasing = 1;
			this.cameraEasingStart = 0;
		}
		this.cameraEasingStart++;
		if(this.cameraEasingStart !== this.cameraEasing)
			return false;
		else
			this.cameraEasingStart = 0;
		const _half = mainCharacter.direction === __left ? _deadRight : _deadLeft;
		const _part = this.cWidth / 10;
		let _step = episode.cWidth / 400;
		if(mainCharacter.left < (_half - _step))
		{
			if(mainCharacter.getCurrentAnimation()?.attack || mainCharacter.animation === 'roll'
		|| mainCharacter.animation === 'dash' || mainCharacter.animation === 'escape')
				_step *= 2;
			if(mainCharacter.chargeProperties)
				_step *= 4;
			if(_step > 1 && mainCharacter.left > (_half - _part))
				_step *= .5;
			else if(_step > 1 && mainCharacter.left > (_half - _part * 2))
				_step *= .75;
			if(mainCharacter.direction === __right)
				_step *= .75;
			_step = MathCeil(_step);
			if((platformX - _step) >= 0){
				platformX -= _step;
				mainCharacter.left += _step;
				return true;
			}
		}
		else if(mainCharacter.left > (_half + _step)) {
			if(mainCharacter.getCurrentAnimation()?.attack || mainCharacter.animation === 'roll'
		|| mainCharacter.animation === 'dash' || mainCharacter.animation === 'escape')
				_step *= 2;
			if(mainCharacter.chargeProperties)
				_step *= 4;
			if(_step > 1 && mainCharacter.left < (_half + _part))
				_step *= .5;
			else if(_step > 1 && mainCharacter.left < (_half + _part * 2))
				_step *= .75;
			if(mainCharacter.direction === __left)
				_step *= .75;
			_step = MathCeil(_step);
			const _maxW = this.width - this.cWidth;
			if((platformX + _step) <= _maxW){
				platformX += _step;
				mainCharacter.left -= _step;
				return true;
			}
		}
		return false;
	}
	this.drawEnemies = function (_queue) {
		//const rect = getVisibleRectangle();
		if(this.disposing)
			return;
		__pvp.updatePlayStatus();
		this.checkRespawn();
		this.checkStoryTicketTimer();
		checkCSSAnimations();
		if(this.repeat){
			if(!this.doTime)
				this.doTime = _gameTick;
			if((_gameTick - this.doTime) > this.repeat) {
				this.doTime = _gameTick;
				this.do();
			}
		}
		this.hasSolid = false;
		//this.enemies?.filter(x => x.nextPoint)?.forEach(x => {delete x.nextPoint;});
		//this.enemies?.filter(x => x.unseen && x.class !== 'boss' && x.healthBarDrawn)?.forEach(x => episode.hideHealthBar(x));
		//if(this.enemies?.find(x => x.related?.dead || x.remove))
		//	this.enemies = this.enemies.filter(x => !x.related?.dead && !x.remove);
		let _len = this.enemies?.length, updateUnseen;
		if((_gameTick - this.lastUnseenCheck) > 200) {
			updateUnseen = 1;
			this.lastUnseenCheck = _gameTick;
			this.seenEnemies.length = 0;
		}
		this.limitedEffects.length = this.activeSpells.length = 0;
		if(mainCharacter)
			mainCharacter.hasLeftEnemy = mainCharacter.hasRightEnemy = undefined;
		if (_len)
			for (var i = 0; i < _len; i++) {
				let sprite = this.enemies[i];
				if(!sprite)
					continue;
				if(sprite.tagContainer && sprite.tagSkillUsed && ((_gameTick - sprite.tagSkillUsed) > 1500)) {
					const _wrapper = sprite.tagContainer;
					addClass(_wrapper, 'fade-out');
					_wrapper.onanimationend = function(ev) {
						if(ev.animationName === 'fade-out-me'){
							if(_wrapper)
								_wrapper.remove();
							delete sprite.tagContainer;
						}
					}
				}
				if(sprite.remove || sprite.related?.dead)
				{
					sprite.tagContainer?.remove?.();
					const _bubble = episode.bubbles?.find(x => x.key === sprite.key)?.elem;
					if (_bubble)
						removeBubble(_bubble, sprite);
					if(!this.war || sprite.owner || sprite.class === __spell) {
						const spriteAnima = sprite.getCurrentAnimation();
						if(spriteAnima.sound?.stop){
							spriteAnima.sound.stop();
							delete spriteAnima.sound;
						}
						this.enemies.splice(i, 1);
						i--;
						_len--;
					}
				}
				else if(sprite.relatedObjects?.[0]) {
					for(let _spr of sprite.relatedObjects)
						if(_spr.removeId && !_spr.remove)
							this.limitedEffects.push(_spr);
				}
				if(sprite.main){
					if(updateUnseen)
						this.seenEnemies.push(sprite);
					if(sprite.hitStop > 0)
						sprite.hitStop--;
					continue;
				}
				if(!this.hasSolid && sprite.solid)
					this.hasSolid = 1;
				sprite.out = (((sprite.EXACTLEFT) + sprite.WIDTH) < 0 ||
						(sprite.EXACTLEFT) > this.cWidth);
				sprite.unseen = sprite.out && !sprite.npc && sprite.dropType !== 'quest-item';
				if(sprite.unseen && !sprite.main) {
					if(sprite.autoTarget && !sprite.invulnerable && !sprite.friendly && 
						!sprite.puppetMode && sprite.enemy && sprite.class !== __spell && 
						sprite.class !== 'object' && !sprite.isDead() && mainCharacter &&
						sprite.autoTarget === mainCharacter)
						{
							if(mainCharacter.EXACTLEFT > sprite.EXACTLEFT)
							{
								if(!mainCharacter.hasLeftEnemy)
									mainCharacter.hasLeftEnemy = 1;
							}
							else if(!mainCharacter.hasRightEnemy)
								mainCharacter.hasRightEnemy = 1;
						}
				}
				if(!sprite.unseen && updateUnseen && !sprite.remove){
					this.seenEnemies.push(sprite);
					if(sprite.class === __spell)
						this.activeSpells.push(sprite);
				}
				if (sprite.autoMode > 0)
					sprite.started = true;
				else if (sprite.autoMode === 0 && sprite.dmgTaken)
					sprite.started = true;
				if (!sprite.located && sprite.animations.run)
					sprite.located = true;
				if (!episode.end || (episode.end && sprite.class !== __spell))
					if (!sprite.unseen || sprite.started || sprite.socketId || (this.pvp || this.dungeon))
						sprite.draw(_queue);
				if(sprite.hitStop > 0)
					sprite.hitStop--;
			}
		if(this.realTime && !this.pvpEnded && !__switchingMap)
		{
			let _dataItem;
			if(!mainCharacter.firstTransferDone){
				_dataItem = mainCharacter.getNewStatus2(1);
				mainCharacter.firstTransferDone = 1;
				mainCharacter.synced = true;
			}
			else {
				_dataItem = mainCharacter.getNewStatus2(0, !mainCharacter.synced);
				mainCharacter.synced = !mainCharacter.synced;
			}
			if(!_dataItem)
				return;
			const _last = JSON.stringify(_dataItem);
			if(mainCharacter.lastRealTimePack === _last)
				return;
			mainCharacter.lastRealTimePack = _last;
			_dataItem.s = __socketId;
			setTransferMessage([_dataItem]);
		}
	}
	this.drawBGAnimations = function () {
		return;
		if (!this.bgAnimations)
			return;
		c5.clearRect(0, 0, _canvasB.clientWidth, _canvasB.clientHeight);
		for (var _lay of this.bgAnimations) {
			if (_lay.delayLeft) {
				_lay.delayLeft--;
				continue;
			}
			if (_lay.frame === undefined)
				_lay.frame = 0;
			if (_lay.start === undefined)
				_lay.start = 0;
			if (_lay.stepX === undefined)
				_lay.stepX = 0;
			const _layer = getObject(_lay.zoom, _lay, _lay.left, _lay.top);
			_layer.realWidth = _lay.realWidth;
			if (isObjectInVisibleRectangle(_lay,
				{ left: MathRound(platformX * (_lay.platformRate ?? 0)), right: MathRound(platformX * (_lay.platformRate ?? 0)) + _canvas.width, top: 0, bottom: _canvas.height, width: _canvas.width, realWidth: _canvas.width }
			)) {
				c5.drawImage(_layer.animation.sprites[0].image,
					_lay.frameDirection === 'vertical' ? 0 : _lay.frame * _lay.width,
					_lay.frameDirection === 'vertical' ? _lay.frame * _lay.height : 0, _lay.width, _lay.height,
					_lay.left - MathRound(platformX * (_lay.platformRate ?? 0)), _lay.top, _layer.width, _layer.height);
			}
			if (_lay.start > 0 && (_lay.start % _lay.speed) === 0) {
				_lay.frame++;
				_lay.start = 0;
				if (_lay.frame === _lay.totalFrames)
					_lay.frame = 0;
				if (_lay.to !== undefined && _lay.left >= _lay.to)
					_lay.left = _lay.from;
			}
			else {
				_lay.start++;
				_lay.left += MathRound((_lay.stepX * (_lay.platformRate ?? 1)) * __zoom);
			}
		}
	}
	this.layersDrawn = 0;
	this.drawLayers = function () {
		this.drawLayers7();
	}
	this.checkForgeDone = function() {
		if(__account.forges?.[0]) {
			var _forges = __account.forges.filter(x => !x.warned);
			if(_forges?.[0]){
				let _warn;
				for(let _f of _forges) {
					const _time = __forges[_f.type].time * 60 * 60 * 1000;
					if(_gameTick > (_f.start + _time))
						_f.warned = _warn = 1;
				}
				if(_warn) {
					_client.saveState();
					warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/forge.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('Item Is Ready') + '</span></div>',  null, null, 1);
					PlaySound({ key: 'forgeready', volume: .5 });
				}
			}
		}
	}
	this.checkWeatherEffect = function() {
		if(__weather.status === 'autumn') {
			const _leaves = document.querySelectorAll('img.leaf');
			if(_leaves?.[0])
				for(let _leaf of _leaves) {
					let _p = _leaf.parentNode;
					if(_gameTick > (_leaf.fallingStart + _leaf.fallingTime)) {
						createLeaf(_leaf, _p);
						continue;
					}
					_p.style.transform = 'translateX(' + (-1 * MathRound((platformX - _leaf.startPlatformX) * 1.1)) + 'px)';
					_p.style.setProperty('-webkit-transform', _p.style.transform);
				}
		}
		else if(__weather.status === 'quake') {
			const _rocks = document.querySelectorAll('img.rock');
			if(_rocks?.[0])
				for(let _rock of _rocks) {
					let _p = _rock.parentNode;
					_p.style.transform = 'translateX(' + (-1 * MathRound((platformX - _rock.startPlatformX) * 1.1)) + 'px)';
					_p.style.setProperty('-webkit-transform', _p.style.transform);
				}
		}
		else if(letItSnow)
			letItSnow.drawSnowFlakes();
	}
	// this.drawLayers5 = function () {
	// 	for (let _lay of this.layers) {
	// 		const p = MathRound(platformX * (_lay.rate ?? 1));
	// 			getObject(_lay.zoom, _lay, _lay.locate.left, _lay.locate.bottom, function(_layer, lay) {
	// 				let _c = lay.foreground ? c9 : (lay.rate == .9 ? c90 : (lay.rate == .85 ? c85 : (lay.rate == .5 ? c50 : c3)));
	// 				_c.save();
	// 				_c.clearRect(0, 0, episode.width, _canvasR.height);
	// 				_c.translate(-p, 0);
	// 				if(!__batterySaveMode)
	// 					_c.drawImage(_layer.animation.sprites[0].image, 0, 0, _lay.width, _lay.height,
	// 						0, 0, _layer.width, _canvasR.height);
	// 				_c.restore();
	// 			});
	// 	}
	// }
	// this.drawLayers5 = function () {
	// 	for (let _lay of this.layers) {
	// 		const p = MathRound(platformX * (_lay.rate ?? 1));
	// 			getObject(_lay.zoom, _lay, _lay.locate.left, _lay.locate.bottom, function(_layer, lay) {
	// 				let _c = lay.foreground ? c9 : (lay.rate == .9 ? c90 : (lay.rate == .85 ? c85 : (lay.rate == .5 ? c50 : c3)));
	// 				_c.save();
	// 				_c.clearRect(0, 0, episode.width, _canvasR.height);
	// 				_c.translate(-p, 0);
	// 				_c.drawImage(_layer.animation.sprites[0].image, 0, 0, _lay.width, _lay.height,
	// 					0, 0, _layer.width, _canvasR.height);
	// 				_c.restore();
	// 			});
	// 	}
	// }
	this.drawLayers7 = async function () {
		if(this.disposing || __batterySaveMode)
			return;
		let i = 0;
		for (let _lay of this.layers) {
			let _c;// = _lay.foreground ? c9 : (_lay.rate == .9 ? c90 : (_lay.rate == .85 ? c85 : (_lay.rate == .5 ? c50 : c3)));
			if(_lay.foreground)
				_c = c9;
			else if(_lay.rate >= .75 && _lay.rate < .9)
				_c = c85;
			else if(_lay.rate >= .9 && _lay.rate < 1)
				_c = c90;
			else if(_lay.rate <= .5)
				_c = c50;
			else
				_c = c3;
			const p = MathRound(platformX * (_lay.rate ?? 1) * __scale);
			if(!this.layersDrawn)
			{
				const _i = await getImagePromise(_lay.src);
				let _img;
				if(_lay.new) {
					const copyc = document.createElement('canvas');
					copyc.width = _i.width;
					copyc.height = _i.height;
					const copyctx = copyc.getContext("2d");
					copyc.imageSmoothingEnabled = false;
					copyctx.drawImage(_i, 0, 0);
					_img = copyc;
				}
				else 
					_img = _i; //bitmapToCanvas(_i); // _i;
				if(!_img)
					return;
				if(_lay.marginTop)
					_img.style.top = MathFloor(_lay.marginTop * __scale * __zoom * _lay.zoom) + 'px';
				if(_lay.marginLeft)
					_img.style.left = MathFloor(_lay.marginLeft * __scale * __zoom * _lay.zoom) + 'px';
				if(_lay.marginTop || _lay.marginLeft) {
					_img.style.position = 'absolute';
					_img.style.setProperty('width', MathRound(_img.width * __scale) + 'px', 'important');
					_img.style.setProperty('height', MathRound(_img.height * __scale) + 'px', 'important');
				}
				_c.appendChild(_img);
			}	
			_c.style.transform = 'translateX(-' + p + 'px)';
			_c.style.setProperty('-webkit-transform', _c.style.transform);
			i++;
		}
		if(!this.layersDrawn)
			this.layersDrawn = 1;
	}
	
	this.drawSpriteObjects2 = function (_forceId, _reset) {
		if(this.disposing)
			return;
		if(_reset) {
			const _nodes = document.querySelectorAll('.quest-sign') ?? [];
			for (var _node of _nodes)
				_node.remove();
		}
		if(_forceId || !(this.lastNPCCheckTime > (_gameTick - 1000))){
			this.NPCS = this.enemies?.filter(x => x.npc);
			this.lastNPCCheckTime = _gameTick;
		}
		let npcs;
		if (_forceId)
			npcs = this.NPCS.filter(x => x.class === _forceId);
		else
			npcs = this.NPCS;
		if(npcs?.[0]) {
			if (!this.spritesDrawnForeGround || _forceId || _reset) {
				for (var sprite of npcs) {
					let _unseen = false;//true;
					// let _w = sprite.WIDTH, _l = sprite.LEFT;
					// if((platformX < _l && (platformX + _canvas.width) > _l) || 
					// (platformX < (_l + _w) && (platformX + _canvas.width) > (_l + _w)))	
						//_unseen = false;
					this.resetMainQuest(sprite, _unseen);
					this.resetSideQuests(sprite, _unseen);
				}
			}
		}
		let sprites = this.sprites?.filter(x => (x.totalFrames > 1 || x.npc) && !x.remove);
		if (_forceId)
			sprites = sprites.filter(x => x.animation.id === _forceId);
		if (sprites?.[0]) {
			if (!this.spritesDrawnForeGround || _forceId || _reset) {
				for (var sprite of sprites) {
					let _unseen = false;
					if((platformX < sprite.left && (platformX + this.cWidth) > sprite.left) || 
					(platformX < (sprite.left + sprite.width) && (platformX + this.cWidth) > (sprite.left + sprite.width)))	
						_unseen = false;
					this.resetMainQuest(sprite, _unseen);
					this.resetSideQuests(sprite, _unseen);
					if (!sprite.frames && sprite.when && !sprite.when(sprite)) {
						const _id = 'SPRT-' + sprite.animation.id;
						let _img = this.elements?.find(x => x.key === _id)?.elem;
						if(!_img) {
							_img = document.getElementById(_id);
							if(_img) {
								if(!this.elements)
									this.elements = [];
								this.elements.push({key:_id, elem:_img});
							}
						}
						if (_img) {
							_img.remove();
							sprite.start = sprite.frame = 0;
						}
						continue;
					}
					const _c = sprite.rate == .9 ? _canvasAnimated90 : cc;
					const _l = MathRound(sprite.left);
					const _t = MathRound(sprite.top);
					if (sprite.text) {
						let _labelid = 'SIGN' + sprite.animation.id;
						let _label = this.elements?.find(x => x.key === _labelid)?.elem;
						if(!_label) {
							_label = document.getElementById(_labelid);
							if(_label) {
								if(!this.elements)
									this.elements = [];
								this.elements.push({key:_labelid, elem:_label});
							}
						}
						if(_label && _unseen)
							addClass(_label, 'd-none');
						if(!_unseen){
							if(!_label) {
								_label = document.createElement('span');
								_label.left = _l;
								_label.style.left = _label.left + 'px';
								_label.style.top = _t + 'px';
								_label.id = _labelid;
								_label.innerText = sprite.text;
								_label.className = 'waypoint-title-sign';
								_c.appendChild(_label);
							}
							else
								removeClass(_label, 'd-none');
						}
						continue;
					}
					const _isCanvas = sprite.npc && sprite.frames?.length;
					const _id = 'SPRT-' + sprite.animation.id;
					let _img = this.elements?.find(x => x.key === _id)?.elem;
					if(!_img) {
						_img = document.getElementById(_id);
						if(_img) {
							if(!this.elements)
								this.elements = [];
							this.elements.push({key:_id, elem:_img});
						}
					}
					if(_img && _unseen)
						addClass(_img, 'd-none');
					if(!_unseen){
						if(!_img) {
							if(!_isCanvas) {
								_img = document.createElement('img');
								_img.src = sprite.animation.src;
								const _w = MathRound(sprite.width);
								const _h = MathRound(sprite.height);
								_img.left = _l;
								_img.style.left = _img.left + 'px';
								_img.style.width = _w + 'px';
								_img.style.height = _h + 'px';
								_img.style.top = _t + 'px';
								_img.id = _id;
								if (sprite.to)
									_img.className = 'portal';
								if (sprite.questItem)
									addClass(_img, 'glow-quest-item');
								_img.style.position = 'absolute';
								if (sprite.alpha)
									_img.style.opacity = sprite.alpha;
								// if (_isCanvas) {
								// 	_img.width = _w;
								// 	_img.height = _h;
								// 	const _context = _img.getContext('2d');
								// 	sprite.drawNPCAnimation = function () {
								// 		episode.drawNPCAnimation(_img, _context, this);
								// 	}
								// }
								else if (sprite.rotate)
									_img.className = 'rotate';
								_c.appendChild(_img);
							}
							else {
								sprite.drawNPCAnimation = function () {
									episode.drawNPCAnimation(this, _l, _t);
								}
							}
						}
						else
							removeClass(_img, 'd-none');
					}
				}
				if(!this.spritesDrawnForeGround || _forceId){
					this.spritesDrawnForeGround = true;
					this.reset();
				}
				return true;
			}
			else {
				_canvasS.style.transform = 'translateX(-' + (platformX * __scale) + 'px)';
				_canvasS.style.setProperty('-webkit-transform', _canvasS.style.transform);
			}
			cc.style.transform = 'translateX(-' + (platformX * __scale)+ 'px)';
			cc.style.setProperty('-webkit-transform', cc.style.transform);
		}
		return false;
	}
	this.spritesDrawnBackGround = false, this.spritesDrawnForeGround = false;
	this.drawSpriteObjects = function (_forceId, _reset) {
		return this.drawSpriteObjects2(_forceId, _reset);
	}
	this.createBgMusic = function(_path, _start, _end, _key, _newVolume) {
		if(!this.bgMusic)
			this.bgMusic = (_path && _path.indexOf('.') === -1) ? getSound(null, _path) :
		new Audio(_path ?? './images/music/' + (_key ?? getRandomValue(1, 13)) + '.mp3');
		this.minBgMusicVolume = _newVolume;
		this.bgMusicVolume = _newVolume ?? .1;
		if(_start)
			this.bgMusic.oncanplay = function() {
				_start();
			}
		if(_end)
			this.bgMusic.onended = function() {
				_end();
			}
	}
	this.setBgMusicVolume = function(_new, _force, _noRate) {
		if(this.bgMusic && !this.bgMusic.still) {
			if(this.bgMusic.volumeDown)
				delete this.bgMusic.volumeDown;
			if(!(this.bgMusic.lastVolumeChangeTime > (_gameTick - 300)))
				if((this.bgMusic.volume <= .5 && _new > 0 && _new <= .5) || _force)
					if(this.bgMusic.volume !== _new){
						this.bgMusic.volume = _new;
						this.bgMusic.lastVolumeChangeTime = _gameTick;
						if(!_noRate)
							this.setBgMusicPlayBackRate();
					}
		}
	}
	this.setBgMusicPlayBackRate = function() {
		return;
		if(this.bgMusic.volume < .25) {
			if(this.bgMusic.playbackRate !== 1)
				this.bgMusic.playbackRate = 1;
		}
		else if(this.bgMusic.volume < .5) {
			if(this.bgMusic.playbackRate !== 1.05)
				this.bgMusic.playbackRate = 1.05;
		}
		else {
			if(this.bgMusic.playbackRate !== 1.1)
				this.bgMusic.playbackRate = 1.1;
		}
	}
	this.resetBgMusicVolume = function() {
		if(this.bgMusic  && !this.bgMusic.still)
			if(this.bgMusic.volumeDown && this.bgMusic.volume > (this.minBgMusicVolume ?? .1))
				if ((_gameTick - 500) > this.bgMusic.lastVolumeChangeTime){
					this.bgMusic.volume -= .02;
					this.bgMusic.lastVolumeChangeTime = _gameTick;
					this.setBgMusicPlayBackRate();
				}
	}
	this.playBgMusic = function (_once, _still) {
		// if(!_once)
		// 	return;
		if(!__account.options.ambiance || episodeVisibilityHidden || this.tower || !this.bgMusic)
			return;
		if(__batterySaveMode) {
			this.pauseBgMusic();
			return;
		}
		if(this.bgMusic && !this.bgMusic.paused){
			if((_gameTick - this.bgMusic.startTime) > 10000) {
				//this.bgMusic.playbackRate = parseFloat((this.bgMusic.playbackRate + .025).toFixed(2));
				//if(this.bgMusic.playbackRate > 1.25)
				//	this.bgMusic.playbackRate = 1.25;
				this.bgMusic.startTime = _gameTick;
			}
			return;
		}
		if(this.bgMusic?.playRequestSent)
			return;
		try {
			this.bgMusic.volume = (this.minBgMusicVolume ?? .1);
			this.bgMusic.crossOrigin = 'anonymous';
			if(!_once)
				this.bgMusic.loop = true;
			//this.bgMusic.playbackRate = 1;
			this.bgMusic.play();
			this.bgMusic.still = _still;
			this.bgMusic.playRequestSent = 1;
			this.bgMusic.startTime = _gameTick;
			if(this.bgMusicTimer) {
				clearInterval(episode.bgMusicTimer);
				delete episode.bgMusicTimer;
			}
			this.bgMusicTimer = setInterval(function() {
				if(!episode.bgMusic || episode.bgMusic.volume >= (episode.bgMusicVolume ?? (episode.minBgMusicVolume ?? .1))) {
					episode.bgMusic.volume = episode.bgMusicVolume ?? (episode.minBgMusicVolume ?? .1);
					clearInterval(episode.bgMusicTimer);
					delete episode.bgMusicTimer;
					return;
				}
				episode.bgMusic.volume += .01;
			}, 100);
		} catch (e) {

		}
	}
	// this.pauseBgMusic = function (_force) {
	// 	if(!this.bgMusic || this.bgMusicTimer)
	// 		return;
	// 	if(this.bgMusic && this.bgMusic.paused && !_force)
	// 		return;
	// 	try {
	// 		if(this.bgMusic && _force) {
	// 			if(this.bgMusicTimer)
	// 				clearInterval(this.bgMusicTimer);
	// 			if(this.bgMusic){
	// 				if(!this.bgMusic.paused)
	// 					this.bgMusic.pause();
	// 				this.bgMusic = null;
	// 			}
	// 			return;
	// 		}
	// 		this.bgMusic.volume = this.bgMusicVolume ?? (this.minBgMusicVolume ?? .1);
	// 		if(this.bgMusicTimer) {
	// 			clearInterval(episode.bgMusicTimer);
	// 			delete episode.bgMusicTimer;
	// 		}
	// 		this.bgMusicTimer = setInterval(function() {
	// 			if(!episode.bgMusic || episode.bgMusic.volume <= (episode.bgMusicVolume ?? .01)) {
	// 				clearInterval(episode.bgMusicTimer);
	// 				delete episode.bgMusicTimer;
	// 				if(!episode.bgMusic)
	// 					return;
	// 				episode.bgMusic.pause();
	// 				delete episode.bgMusic.playRequestSent;
	// 				return;
	// 			}
	// 			episode.bgMusic.volume -= .01;
	// 		}, 100);
	// 	} catch (e) {

	// 	}
	// }
	this.pauseBgMusic = function (_force) {

		if (!this.bgMusic) return;

		if (_force) {
			if(this.bgMusicTimer)
				clearInterval(this.bgMusicTimer);
			this.bgMusic.pause();
			this.bgMusic = null;
			return;
		}

		if(this.bgMusicTimer) {
			clearInterval(this.bgMusicTimer);
			this.bgMusicTimer = null;
		}
		const fadeSpeed = 0.005; // daha yumuşak
		const interval = 16; // ~60fps

		this.bgMusicTimer = setInterval(() => {

			if (!this.bgMusic) {
				if(this.bgMusicTimer)
					clearInterval(this.bgMusicTimer);
				this.bgMusicTimer = null;
				return;
			}

			if (this.bgMusic.volume <= 0.01) {
				this.bgMusic.volume = 0;
				this.bgMusic.pause();

				clearInterval(this.bgMusicTimer);
				this.bgMusicTimer = null;
				return;
			}

			this.bgMusic.volume = Math.max(0, this.bgMusic.volume - fadeSpeed);

		}, interval);
	}
	this.pauseAmbianceMusic = function() {
		if(this.bgSound)
			this.bgSound.pause();
	}
	this.resumeAmbianceMusic = function() {
		if(!__account.options.ambiance || episodeVisibilityHidden)
			return;
		if(this.bgSound && this.bgSound.paused)
			this.bgSound.play();
	}
	this.playAmbianceMusic = function (_src, _force) {
		// if(!__account.cs)
		// 	return;
		let _name=this.theme;
		if(this.theme.endsWith('mobile'))
			_name  =  _name.slice(0, this.theme.length - 6);
		if(!_src)
			_src = this.dungeon ? 'dungeon' : _name.replace(/\d+/, '');
		if(episodeVisibilityHidden)
			return;
		if((!__account.options.ambiance || __batterySaveMode) && !_force)
			return;
		try {
			const _sound = getSound(this.ambiancePath, _src, 1, this.ambiancePath);
			if (_sound) {
				_sound.volume = this.ambianceVolume ?? .05;
				_sound.crossOrigin = 'anonymous';
				_sound.loop = true;
				if (this.bgSound) {
					this.bgSound.pause();
					this.bgSound.currentTime = 0;
				}
				this.bgSound = _sound;
				_sound.play();
			}
		} catch (e) {
			console.log(_src);
		}
	}
	this.playSound = function (_s, _alternateKeys, _volumeRate) {
		return PlaySound(_s, _alternateKeys, _volumeRate);
		return undefined;
		let _sound = getSound(null, _soundKey);
		let _play = _s?.reset;
		if(!_sound && _s.path){
			_sound = getSound(_s.path);
			_play = true;
		}
		if(_sound && (_sound.lastUsed > (_gameTick - 100)))
			return undefined;
		if (_sound && (_sound.paused || _sound.currentTime === 0 || _play)) {
			const _vol = (_volumeRate ?? 1) * (_s.volume ?? .1);
			if(_sound.volume !== _vol)
				_sound.volume = _vol;
			if (_s.loop && !_sound.loop)
				_sound.loop = true;
			
			// let _speed = _s.speed;
			// const _fps = _s.owner ? _s.owner.getFps() : 1;
			// if (_s.owner && _fps !== 1)
			// 	_speed = (_speed ?? 1) / _fps;
			// if (_speed && _speed !== 1){
			// 	const _r = _speed < 1 ? .5 : 2;
			// 	if(_sound.playbackRate !== _r)
			// 		_sound.playbackRate = _r;
			// }
			_sound.key = _soundKey;
			if(_sound.crossOrigin !== 'anonymous')
				_sound.crossOrigin = 'anonymous';
			if (_sound.currentTime > 0 && !_sound.paused && (_s.reset && (_soundKey === _sound.key))) {
				_sound.currentTime = 0;
				if(!_sound.paused)
					_sound.pause();
				_sound.play();
				_sound.lastUsed = _gameTick;
				if (_s.end)
					_sound.addEventListener('ended', _s.end);
				return _sound;
			}
			if (_sound.currentTime === 0 || _sound.paused)
				try {
					_sound.play();
					_sound.lastUsed = _gameTick;
					if (_s.end)
						_sound.addEventListener('ended', _s.end);
					return _sound;
				} catch (e) {
					if (_s.end)
						_sound.addEventListener('ended', _s.end);
				}
		}
		return undefined;
	}
	this.stopSound = function (_sf) {
		return;
		const _soundKey = _sf.key;
		const _index = this.runningSounds?.indexOf(_soundKey);
		if (_index >= 0) {
			const _sound = getSound(null, _soundKey);
			if (_sound.currentTime > 1) {
				this.runningSounds.splice(_index, 1);
				_sound.pause();
				_sound.currentTime = 0;
			}
		}
	}
	this.drawNPCAnimation = function (_rel) {
		if(__batterySaveMode)
			return false;
		if((platformX < _rel.left && (platformX + this.cWidth) > _rel.left) || 
				(platformX < (_rel.left + (_rel.maxWidth ?? _rel.width)) && (platformX + this.cWidth) > (_rel.left + (_rel.maxWidth ?? _rel.width))))	
		{
			if (!_rel.frames || this.disposing || _rel.remove)
				return false;
			if (_rel.start === undefined)
				_rel.start = 0;
			if (_rel.frame === undefined)
				_rel.frame = 0;
			let _f = _rel.frames[_rel.frame];
			if ((_rel.start % _f.speed) === 0) {
				_rel.start = 0;
				if (_rel.frame >= (_rel.frames.length - 1))
					_rel.frame = 0;
				else
					_rel.frame++;
			}
			_rel.start++;
			if(!__batterySaveMode) {
				if(_rel.rotate) {
					_cNPC.save();
					_cNPC.scale(-1, 1);
				}
				_cNPC.drawImage(_rel.animation.sprites[0].image,
					_f.left ?? (_rel.frame * _rel.animation.width),
					(_f.top ?? 0),
					_f.width, 
					_rel.animation.height,
					(_rel.rotate ? -1 : 1) *_rel.left + MathRound(((_f.leftGap ?? 0) * _rel.zoom * __zoom)), 
					_rel.top,
					_rel.width, 
					_rel.height);
				if(_rel.rotate)
					_cNPC.restore();
			}
			return true;
		}
		return false;
	}
	this.removeLocationHand = function() {
		let _hand = document.getElementById('go-location');
		if(_hand) 
			_hand.remove();
		// if(window.SoundManager.stop('go')) {
		// 	if(!episode.goSound.paused)
		// 		episode.goSound.pause();
		// 	episode.goSound = null;
		// }
		this.stopGoSound();
		this.hasGoSound = 0;
	}
	this.stopGoSound = function() {
		window.SoundManager.stop('go');
	}
	this.showLocationHand = function(_dir) {
		let _hand = document.getElementById('go-location');
		if(!_hand) {
			_hand = document.createElement('div');
			_hand.id = 'go-location';
			_hand.className = 'go go-' + _dir;
			this.playSound({key:'go', force: true, loop:true, volume:.5});
			this.hasGoSound = 1;
			_gameUI.appendChild(_hand);
		}
		else if(!hasClass(_hand, 'go-' + _dir)) {
			removeClass(_hand, 'go-' + (_dir === __left ? __right : __left));
			// if(episode.goSound) {
			// 	if(!episode.goSound.paused)
			// 		episode.goSound.pause();
			// 	episode.goSound = null;
			// }
			this.stopGoSound();
			this.playSound({key:'go', force: true, loop:true, volume:.5});
			this.hasGoSound = 1;
			addClass(_hand, 'go-' + _dir);
		}
	}
	this.drawQuestNavIcon = function () {
		return;
		let _nav = document.querySelector('.quest-nav');
		if (this.pvp || this.id > 99) {
			addClass(_nav, 'd-none');
			return;
		}
		else
			removeClass(_nav, 'd-none');
		const _quest = _npcQuests.find(x => x.id === __account.questStatus.order);
		if (!_quest)
			return;
		if (__account.questStatus.state === 'progress') {
			if (_quest.maps && _quest.maps.indexOf(episode.id) === -1) {
				if (!_nav) {
					_nav = document.createElement('img');
					_nav.src = './images/icons/nav.png';//sağ
					_nav.className = 'quest-nav';
					_gameUI.appendChild(_nav);
				}
				let _closestSide = _quest.maps[0], _sideDiff = MathAbs(_quest.maps[0] - episode.id);
				for (var _m of _quest.maps)
					if (MathAbs(_m - episode.id) < _sideDiff) {
						_sideDiff = MathAbs(_m - episode.id);
						_closestSide = _m;
					}
				let _side = __left;
				// if (((_closestSide % 2) === 0) && _closestSide < episode.id && ((episode.id % 2) === 0))
				// 	_side = __left;
				// else 
				if (((_closestSide % 2) === 1) && _closestSide > episode.id)
					_side = __right;
				if (_side === __left) {
					addClass(_nav, __left);
					removeClass(_nav, __right);
				}
				else {
					addClass(_nav, __right);
					removeClass(_nav, __left);
				}
			}
			else if (_nav)
				_nav.remove();
		}
		else if (_nav)
			_nav.remove();
	}
	this.reset = function () {
		addClass(document.getElementById('quest-dialog'), 'd-none');
		this.drawQuestNavIcon();
		this.drawSpriteObjects2(null, 1);
	}
	this.resetMainQuest = function(_sprite, _unseen) {
		if(!mainCharacter || this.menu)
			return;
		const sprites =  _sprite ? [_sprite] : this.enemies?.filter(x => x.npc);
		if (sprites?.[0]) {
			if(!_sprite) {
				const _nodes = document.querySelectorAll('.quest-sign');
				for (var _node of _nodes)
					_node.remove();
			}
			let _quest = __story?.quests.find(x => x.id === __account.questStatus.order);
			if (!_quest)
				return;
			let _status; //1 başlamadı, 2 alındı, 3 devam ediyor, 4 bitti git ödülü al
			switch (__account.questStatus.state) {
				case 'begin':
					_status = 2;
					break;
				case 'end':
					_status = 4;
					break;
				case 'progress':
					_status = 3;
					break;
				default:
					_status = _quest.minLevel > (__account.characters.find(x => x.class === mainCharacter.class)?.level ?? 1) ? 1 : 2;
					break;
			}
			for (var sprite of sprites) {
				if (sprite.class !== _quest.owner)
					continue;
				if(!sprite.animations?.idle)
					continue;
				if(!sprite.animations.idle.frames[1].objects)
					sprite.animations.idle.frames[1].objects = [];
				if(!sprite.animations.idle.frames[1].objects.find(x => x.key === 'questprogress'))
					sprite.animations.idle.frames[1].objects.push({
						key:'questprogress',
						position:'middle',
						yGap: MathRound(sprite.animations.idle.frames[1].spriteHeight / 2) + 100
					});
				sprite.frame = 1;
				sprite.start = 0;
			}
		}
	}
	this.resetSideQuests = function (_sprite, _unseen) {
		return;
		const sprites = _sprite ? [_sprite] : this.sprites?.filter(x => x.frames && x.npc);
		if (sprites?.[0]) {
			if(!_sprite) {
				const _nodes = document.querySelectorAll('.side-quest-sign');
				for (var _node of _nodes)
					_node.remove();
			}
			const _quest = _sideQuests.find(x => x.id === __account.questStatus.side.order);
			if (!_quest)
				return;
			let _status; //1 başlamadı, 2 devam ediyor
			switch (__account.questStatus.side.state) {
				case 'begin':
					_status = 2;
					break;
				case 'end':
					_status = 4;
					break;
				case 'progress':
					_status = 3;
					break;
				default:
					_status = _quest.minLevel > mainCharacter.level ? 1 : 2;
					break;
			}
			for (var sprite of sprites) {
				if (sprite.animation.id !== _quest.owner)
					continue;
				const _id =_sprite.animation.id + '-side-quest-mark';
				let _imgQuest = document.getElementById(_id);
				if(_imgQuest && _unseen)
					addClass(_imgQuest, 'd-none');
				if(!_unseen) {
					if(!_imgQuest) {
						const _w = MathRound(sprite.width);
						const _l = MathRound(sprite.left);
						const _t = MathRound(sprite.top);
						const _c = sprite.rate == .9 ? _canvasAnimated90 : cc;
						_imgQuest = document.createElement('img');
						_imgQuest.oldStatus = _status;
						_imgQuest.src = "./images/icons/side-quest-" + (_status < 3 ? 'start' : 'progress') + ".png";
						const _questMarkHeight = MathRound(this.cHeight / 16);
						const _left = MathRound(_l + (((_w - (sprite.rightGap ?? 0)) - _questMarkHeight) / 2));
						_imgQuest.left = _left;
						_imgQuest.style.left = _left + 'px';
						_imgQuest.style.height = _imgQuest.style.width = _questMarkHeight + 'px';
						_imgQuest.style.top = MathRound(_t - (sprite.topGap ?? 0)) + 'px';
						_imgQuest.style.position = 'absolute';
						_imgQuest.id = _id;
						_imgQuest.className = 'side-quest-sign';
						if ((_status % 2) === 0)
							_imgQuest.className += ' glow-dark';
						else
							_imgQuest.className += ' gray';
						_c.appendChild(_imgQuest);
					}
					else {
						if(_imgQuest.oldStatus !== _status) {
							_imgQuest.src = "./images/icons/side-quest-" + (_status < 3 ? 'start' : 'progress') + ".png";
							if ((_status % 2) === 0) {
								removeClass(_imgQuest, 'gray');
								addClass(_imgQuest, 'glow-dark');
							}
							else {
								addClass(_imgQuest, 'gray');
								removeClass(_imgQuest, 'glow-dark');
							}
						}
						//_imgQuest.style.left = (_imgQuest.left - platformX) + 'px';
						removeClass(_imgQuest, 'd-none');
					}
				}
			}
		}
	}
	this.drawObjects = function () {
		if(this.disposing || __batterySaveMode)
			return;
		const rect = getVisibleRectangle();
		c6.clearRect(0, 0, this.cWidth, this.cHeight);
		const sprites = this.sprites?.filter(x => (!x.totalFrames || x.totalFrames < 2) && !x.npc && !x.foreground && isObjectInVisibleRectangle(x, rect));
		if (sprites?.[0]) {
			for (var sprite of sprites)
				c6.drawImage(sprite.animation.sprites[0].image, 0,
					0, sprite.animation.width, sprite.animation.height,
					sprite.left - platformX,
					sprite.top,
					sprite.width, sprite.height);
		}
	}
	this.hurtSprites = {}, this.hurtRelSprites = {};
	// this.colorizeSprite4 = function (_item, _col, _force) {
	// 	let _opc = .01;
	// 	// switch (_item?.char?.hurting?.count) {
	// 	// 	case 5: case 4: case 3:
	// 	// 		_item.char.hurting.count = 2;
	// 	// 		_opc = 90 / MathCeil((_item.char.attackerRange ?? 10) / 10);
	// 	// 		break;
	// 	// 	case 1: case 2:
	// 	// 		_opc = 150 / MathCeil((_item.char.attackerRange ?? 10) / 10);
	// 	// 		break;
	// 	// }
	// 	// _opc = Math.min(1, _opc / 100);
	// 	let _color;
	// 	if (_item?.char?.hurting?.hit) {
	// 		// _color = `rgba(255,255,255,${_force ? _opc : _item.char.hurting.hit > 2 ? 1 : _item.char.hurting.hit * .3})`;
	// 		// _item.char.hurting.hit--;
	// 		let h = _item.char.hurting.hit;
	// 		if (h >= 3) {
	// 			// İlk şok
	// 			_color = 'rgba(255,255,255,1)';
	// 		}
	// 		else if (h === 2) {
	// 			// Heat flash
	// 			_color = 'rgba(255,230,150,0.85)';
	// 		}
	// 		else if (h === 1) {
	// 			// Burn fade
	// 			_color = 'rgba(255,110,40,0.55)';
	// 		}
	// 		_item.char.hurting.hit--;
	// 	} else {
	// 		const base = _col ?? _item.skinColor ?? _item.char?.hurtColor ?? '#FFFFFF';
	// 		if (base.startsWith('#') && base.length >= 7) {
	// 			let r = parseInt(base.slice(1, 3), 16);
	// 			let g = parseInt(base.slice(3, 5), 16);
	// 			let b = parseInt(base.slice(5, 7), 16);
	// 			if(base.length === 9)
	// 				_opc = parseInt(base.slice(7, 9), 16) / 255;
	// 			_color = `rgba(${r},${g},${b},${_force ? MathRound(_opc * 10) / 10 : 1})`;
	// 		} else
	// 			_color = base;
	// 	}
	// 	const _key1 = 'i' + _item.char.id;
	// 	const _key2 = 'a' + _item.animation;
	// 	const _key3 = 
	// 		'c' + _color + 'l' + _item.spriteX + 't' + _item.spriteY +
	// 		'w' + _item.spriteWidth + 'h' + _item.spriteHeight;
	// 	const _key = _key1 + _key2 + _key3;
	// 	if(_key === _item.char.lastHurtSpriteKey)
	// 		return _item.char.lastHurtSprite;
	// 	let _hs = this.hurtSprites[_key1]?.[_key2]?.[_key3];
	// 	if(!_hs) {
	// 		this._colorizeCanvas = document.createElement('canvas');
	// 		const _osc = this._colorizeCanvas;
	// 		_osc.width = MathRound(_item.spriteWidth);
	// 		_osc.height = MathRound(_item.spriteHeight);
	// 		const ctx = _osc.getContext('2d');
	// 		if(_osc.imageSmoothingEnabled != false)
	// 			_osc.imageSmoothingEnabled = false;
	// 		ctx.clearRect(0, 0, _osc.width, _osc.height);
	// 		ctx.drawImage(_item.sprite,
	// 			_item.spriteX,
	// 			_item.spriteY,
	// 			_item.spriteWidth,
	// 			_item.spriteHeight,
	// 			0, 0,
	// 			_osc.width,
	// 			_osc.height
	// 		);
	// 		ctx.globalCompositeOperation = 'source-atop';
	// 		ctx.fillStyle = _color;
	// 		ctx.fillRect(0, 0, _osc.width, _osc.height);
	// 		ctx.globalCompositeOperation = 'source-over';
	// 		if(!this.hurtSprites[_key1])
	// 			this.hurtSprites[_key1] = {};
	// 		if(!this.hurtSprites[_key1][_key2])
	// 			this.hurtSprites[_key1][_key2] = {};
	// 		this.hurtSprites[_key1][_key2][_key3] = _hs = _osc;
	// 	}
	// 	if (_hs) {
	// 		_item.char.lastHurtSprite = _hs;
	// 		_item.char.lastHurtSpriteKey = _key;
	// 		return _hs;
	// 	}
	// 	else 	
	// 		_item.char.lastHurtSprite = _item.char.lastHurtSpriteKey = undefined;
	// 	if (_item.char?.hurting?.count <= 0)
	// 		delete _item.char.hurtColor;
	// 	return null;
	// };
	this.colorizeSprite4 = function (_item, _col, _force) {

	// =====================
	// COLOR CACHE
	// =====================
	if (!this._colorCache)
		this._colorCache = Object.create(null);

	let _opc = 1;
	let _color;

	// =====================
	// HIT FLASH (AYNI)
	// =====================
	if (_item?.char?.hurting?.hit) {
		const h = _item.char.hurting.hit;
		if (h >= 3)
			_color = 'rgba(255,255,255,1)';
		else if (h === 2)
			_color = 'rgba(255,230,150,0.85)';
		else
			_color = 'rgba(255,110,40,0.55)';

		_item.char.hurting.hit--;
	}
	else {
		const base = _col ?? _item.skinColor ?? _item.char?.hurtColor ?? '#FFFFFF';

		_color = this._colorCache[base];
		if (!_color) {
			if (base.startsWith('#') && base.length >= 7) {
				const r = parseInt(base.slice(1, 3), 16);
				const g = parseInt(base.slice(3, 5), 16);
				const b = parseInt(base.slice(5, 7), 16);
				if (base.length === 9)
					_opc = parseInt(base.slice(7, 9), 16) / 255;

				_color = `rgba(${r},${g},${b},${_force ? Math.round(_opc * 10) / 10 : 1})`;
			}
			else {
				_color = base;
			}
			this._colorCache[base] = _color;
		}
	}

	// =====================
	// KEY (AYNI MANTIK)
	// =====================
	const _key1 = 'i' + _item.char.id;
	const _key2 = 'a' + _item.animation;
	const _key3 =
		'c' + _color +
		'l' + _item.spriteX +
		't' + _item.spriteY +
		'w' + _item.spriteWidth +
		'h' + _item.spriteHeight;

	const _key = _key1 + _key2 + _key3;

	if (_key === _item.char.lastHurtSpriteKey)
		return _item.char.lastHurtSprite;

	let _hs = this.hurtSprites[_key1]?.[_key2]?.[_key3];

	if (!_hs) {

		// =====================
		// SHARED WORK CANVAS
		// =====================
		if (!this._colorizeCanvas)
			this._colorizeCanvas = document.createElement('canvas');

		const _osc = this._colorizeCanvas;
		_osc.width = _item.spriteWidth;
		_osc.height = _item.spriteHeight;

		const ctx = _osc.getContext('2d');
		if (ctx.imageSmoothingEnabled)
			ctx.imageSmoothingEnabled = false;

		ctx.clearRect(0, 0, _osc.width, _osc.height);
		const _cropped = this.getCroppedSprite(_item.spriteX, _item.spriteY, _item.spriteWidth, _item.spriteHeight, 
								_item.char, _item.sprite.relativeSrc, _item.frameKey);
		if(_cropped)
			ctx.drawImage(_cropped, 0, 0, _osc.width, _osc.height);
		else
			ctx.drawImage(
				_item.sprite,
				_item.spriteX,
				_item.spriteY,
				_item.spriteWidth,
				_item.spriteHeight,
				0, 0,
				_osc.width,
				_osc.height
			);

		ctx.globalCompositeOperation = 'source-atop';
		ctx.fillStyle = _color;
		ctx.fillRect(0, 0, _osc.width, _osc.height);
		ctx.globalCompositeOperation = 'source-over';

		// =====================
		// CLONE (CACHE SAFE)
		// =====================
		const out = document.createElement('canvas');
		out.width = _osc.width;
		out.height = _osc.height;
		if(_osc.width > 0)
			out.getContext('2d').drawImage(_osc, 0, 0);

		if (!this.hurtSprites[_key1]) this.hurtSprites[_key1] = {};
		if (!this.hurtSprites[_key1][_key2]) this.hurtSprites[_key1][_key2] = {};

		this.hurtSprites[_key1][_key2][_key3] = _hs = out;
	}

	_item.char.lastHurtSprite = _hs;
	_item.char.lastHurtSpriteKey = _key;

	if (_item.char?.hurting?.count <= 0)
		delete _item.char.hurtColor;

	return _hs;
};

	// this.colorizeRelSprite4 = function (_item, _col, _animationKey) {
	// 	let _opc = .01;
	// 	let _color;
	// 	const base = _col;
	// 	if (base.startsWith('#') && base.length >= 7) {
	// 		let r = parseInt(base.slice(1, 3), 16);
	// 		let g = parseInt(base.slice(3, 5), 16);
	// 		let b = parseInt(base.slice(5, 7), 16);
	// 		if(base.length === 9)
	// 			_opc = parseInt(base.slice(7, 9), 16) / 255;
	// 		_color = `rgba(${r},${g},${b},1)`;
	// 	} 
	// 	else
	// 		_color = base;

	// 	const _key = _animationKey ?? (
	// 		_item.animation + 'id' + _item.char.id +
	// 		'c' + _color + 'l' + _item.spriteX + 't' + _item.spriteY +
	// 		'w' + _item.spriteWidth + 'h' + _item.spriteHeight
	// 	);
	// 	if(_key === _item.char.lastHurtRelSpriteKey)
	// 		return _item.char.lastHurtRelSprite;
	// 	let _hs =this.hurtRelSprites[_key];
	// 	if(!_hs) {
	// 		this._colorizeCanvas = document.createElement('canvas');
	// 		const _osc = this._colorizeCanvas;
	// 		_osc.width = MathRound(_item.spriteWidth);
	// 		_osc.height = MathRound(_item.spriteHeight);
	// 		const ctx = _osc.getContext('2d');
	// 		if(_osc.imageSmoothingEnabled != false)
	// 			_osc.imageSmoothingEnabled = false;
	// 		ctx.clearRect(0, 0, _osc.width, _osc.height);
	// 		ctx.drawImage(_item.sprite,
	// 			_item.spriteX,
	// 			_item.spriteY,
	// 			_item.spriteWidth,
	// 			_item.spriteHeight,
	// 			0, 0,
	// 			_osc.width,
	// 			_osc.height
	// 		);
	// 		ctx.globalCompositeOperation = 'source-atop';
	// 		ctx.fillStyle = _color;
	// 		ctx.fillRect(0, 0, _osc.width, _osc.height);
	// 		ctx.globalCompositeOperation = 'source-over';
	// 		this.hurtRelSprites[_key] = _hs = _osc;
	// 	}

	// 	if (_hs) {
	// 		_item.char.lastHurtRelSprite = _hs;
	// 		_item.char.lastHurtRelSpriteKey = _key;
	// 		return _hs;
	// 	}
	// 	else 	
	// 		_item.char.lastHurtRelSprite = _item.char.lastHurtRelSpriteKey = undefined;
	// 	return null;
	// };
	// this.spriteWorker = new Worker('./js/worker.js');
	// this.spriteWorker.onmessage = (e) => {
	// 	const { key, result } = e.data;
	// 	this.hurtSprites[key] = result;
	// };
	// this.colorizeSprite2 = function(_item, _col, _animationKey) {
	// 	let _opc = 'ff';
	// 	switch(_item?.char?.hurting?.count) {
	// 		case 4:
	// 		case 3:
	// 		case 2:
	// 			_item.char.hurting.count = 2;
	// 			let _val = 60;
	// 			if(_item.char.attackerRange > 10)
	// 				_val = MathCeil(_val / MathCeil((_item.char.attackerRange / 10)));
	// 			_opc = _val.toString(16);
	// 			break;
	// 		case 1:
	// 			{
	// 				let _val = 100;
	// 				if(_item.char.attackerRange > 10)
	// 					_val = MathCeil(_val / MathCeil((_item.char.attackerRange / 10)));
	// 				_opc = _val.toString(16);
	// 			}
	// 			break;
	// 	}
	// 	let _color;
	// 	if(_item?.char?.hurting?.hit) {
	// 		delete _item.char.hurting.hit;
	// 		_color = '#FFFFFF';
	// 	}
	// 	else
	// 		_color = _item.skinColor ?? _item.char?.hurtColor ?? '#FFFFFF';
	// 	if(_opc !== 'ff')
	// 		_color += _opc;
	// 	if(_col)
	// 		_color = _col;
	// 	const _key = _animationKey ?? (_item.char.animation + 'id' + _item.char.id + 'c' + _color +
	// 	'l' + _item.spriteX + 't' + _item.spriteY + 'w' + _item.spriteWidth + 'h' + _item.spriteHeight);
	// 	const _sprite = this.hurtSprites[_key];
	// 	if(_sprite === 1)
	// 		return null;
	// 	else if(_sprite)
	// 		return _sprite;
	// 	this.hurtSprites[_key] = 1;
	// 	createImageBitmap(_item.sprite).then((bitmap) => {
	// 	this.spriteWorker.postMessage({
	// 			key: _key,
	// 			bitmap,
	// 			x: _item.spriteX,
	// 			y: _item.spriteY,
	// 			w: _item.spriteWidth,
	// 			h: _item.spriteHeight,
	// 			outputW: Math.round(_item.width * (_item.zoom ?? 1)),
	// 			outputH: Math.round(_item.height * (_item.zoom ?? 1)),
	// 			color: _color
	// 		}, [bitmap]);
	// 	});
	// 	if(_item.char?.hurting?.count <= 0 && _item.char.hurtColor)
	// 		delete _item.char.hurtColor;
	// 	return null;
	// }
	this.colorizeRelSprite4 = function (_item, _col, _animationKey) {

	// =====================
	// COLOR CACHE
	// =====================
	if (!this._colorCache)
		this._colorCache = Object.create(null);

	let _color = this._colorCache[_col];
	let _opc = 1;

	if (!_color) {
		const base = _col;
		if (base.startsWith('#') && base.length >= 7) {
			const r = parseInt(base.slice(1, 3), 16);
			const g = parseInt(base.slice(3, 5), 16);
			const b = parseInt(base.slice(5, 7), 16);
			if (base.length === 9)
				_opc = parseInt(base.slice(7, 9), 16) / 255;

			_color = `rgba(${r},${g},${b},1)`;
		} else {
			_color = base;
		}
		this._colorCache[_col] = _color;
	}

	// =====================
	// KEY
	// =====================
	const _key = _animationKey ?? (
		_item.animation + ':' +
		_item.char.id + ':' +
		_color + ':' +
		_item.spriteX + ',' +
		_item.spriteY + ',' +
		_item.spriteWidth + ',' +
		_item.spriteHeight
	);

	if (_key === _item.char.lastHurtRelSpriteKey)
		return _item.char.lastHurtRelSprite;

	let _hs = this.hurtRelSprites[_key];
	if (!_hs) {

		// =====================
		// OFFSCREEN CANVAS (REUSE)
		// =====================
		if (!this._colorizeCanvas)
			this._colorizeCanvas = document.createElement('canvas');

		const _osc = this._colorizeCanvas;
		_osc.width = _item.spriteWidth;
		_osc.height = _item.spriteHeight;

		const ctx = _osc.getContext('2d');

		if (ctx.imageSmoothingEnabled)
			ctx.imageSmoothingEnabled = false;

		ctx.clearRect(0, 0, _osc.width, _osc.height);

		ctx.drawImage(
			_item.sprite,
			_item.spriteX,
			_item.spriteY,
			_item.spriteWidth,
			_item.spriteHeight,
			0, 0,
			_osc.width,
			_osc.height
		);

		ctx.globalCompositeOperation = 'source-atop';
		ctx.fillStyle = _color;
		ctx.fillRect(0, 0, _osc.width, _osc.height);
		ctx.globalCompositeOperation = 'source-over';

		// ⚠️ CLONE CANVAS
		// çünkü shared canvas reuse ediliyor
		const out = document.createElement('canvas');
		out.width = _osc.width;
		out.height = _osc.height;
		if(_osc.width > 0)
			out.getContext('2d').drawImage(_osc, 0, 0);

		this.hurtRelSprites[_key] = _hs = out;
	}

	_item.char.lastHurtRelSprite = _hs;
	_item.char.lastHurtRelSpriteKey = _key;
	return _hs;
};

	const _maxSort = 200000000;
	let _yTol = 7 * __zoom;
	this.getPerspectiveRate = function(_char, _force, _animation) {
		if(_char.lastYPosition === _char.yPosition)
			return _char.lastPerspectiveRate;
		const _anim = _animation ?? _char.animation;
		const _x = (_anim === 'walk' || _anim === 'run' || _force) ? 1 + ((((getGroundHeight() - _char.yPosition) * 10) / getGroundHeight()) / 100) : 1;
		_char.lastYPosition = _char.yPosition;
		if(_x !== _char.lastPerspectiveRate)
			_char.lastPerspectiveRate = _x;
		return _x;
	}
	this.offCanvas = document.createElement('canvas');
	this.offCanvas.width = this.cWidth;
	this.offCanvas.height = this.cHeight;
	const offCtx = this.offCanvas.getContext('2d');
	this.getOffContext = function() {
		return offCtx;
	}
	this.offCanvas.imageSmoothingEnabled = false;
	this.offGoreCanvas = document.createElement('canvas');
	this.offGoreCanvas.width = this.cWidth;
	this.offGoreCanvas.height = this.cHeight;
	const offGoreCtx = this.offGoreCanvas.getContext('2d');
	this.offGoreCanvas.imageSmoothingEnabled = false;
	this.offDmgCanvas = document.createElement('canvas');
	this.offDmgCanvas.width = this.cWidth;
	this.offDmgCanvas.height = this.cHeight;
	this.offDmgCtx = this.offDmgCanvas.getContext('2d');
	this.offDmgCanvas.imageSmoothingEnabled = false;
	this.drawChargeParticles = function (_item) {
		  const list = _item.char.spawnDusts;
    if (!list || list.length === 0) return;

	const prevAlpha = offCtx.globalAlpha;
	const prevFill = offCtx.fillStyle;
    for (let d of list) {

        // local wobble ve ilerleme etkilerini WORLD pozisyonuna uygula:
        const pxWorld = d.worldX - ((_item.reversed ? -1 : 1) * (platformX - d.p))
            + d.wobble * Math.sin(d.progress * 6) * 8
            - (d.progress * 4);
        // yukarı çıkış (y zaten dünya/ekran uyumlu olduğunu varsayıyoruz)
        const py = d.y - d.rise * d.progress;

        // asıl toz tanesinin boyutu
        const s = d.size * (1 + d.progress * 1.4);

        // üstteki parlak, alttaki flu
        const alpha = 0.75 * (1 - d.progress);

        // kamera offseti — ekranX = worldX - cameraX
        const camX = pxWorld;

        // ----------------------------
        // 1) DALGA izi üretelim (izlerin de worldX olarak saklanması)
        // ----------------------------
        if (Math.random() < 0.6) {
            d.trails.push({
                worldX: pxWorld,   // world pozisyonu kaydet
                y: py,
                size: s * (1 + Math.random() * 0.6),
                alpha: alpha * 0.6
            });
        }

        // İzler çok olursa eskiyi sil
        if (d.trails.length > 12) d.trails.shift();

        // ----------------------------
        // 2) İZLERİ ÇİZ (izleri world->cam çevir)
        // ----------------------------

		offCtx.fillStyle = "#c7b8a3";

		for (let i = d.trails.length - 1; i >= 0; i--) {
			const t = d.trails[i];

			t.alpha *= 0.85;
			t.size  *= 1.03;

			if (t.alpha < 0.1)
				break;

			offCtx.globalAlpha = t.alpha;

			offCtx.beginPath();
			offCtx.ellipse(
				t.worldX, t.y,
				t.size * 1.3, t.size * 0.75,
				0, 0, Math.PI * 2
			);
			offCtx.fill();
		}



        // ----------------------------
        // 3) ASIL PARTİKÜLÜ ÇİZ
        // ----------------------------
        //offCtx.save();
        offCtx.globalAlpha = alpha;
        offCtx.fillStyle = "#d6c7b4";

        offCtx.beginPath();
        offCtx.ellipse(
            camX, py,
            s * 1.1, s * 0.7,
            0, 0, Math.PI * 2
        );
        offCtx.fill();
        //offCtx.restore();
		
        d.progress += 0.1;
    }
	offCtx.globalAlpha = prevAlpha;
	offCtx.fillStyle   = prevFill;
    // Ömür dolunca partikülleri sil
    _item.char.spawnDusts = list.filter(d => d.progress < 1);
	return;
		if (_item.char.spawnDusts) {
			for(let d of _item.char.spawnDusts) {
				offCtx.save();
				const w = d.width;
				const h = d.height;
				offCtx.globalAlpha = d.alpha;
				offCtx.translate(d.x - ((_item.reversed ? -1 : 1) * (platformX - d.p)), d.y);

				// Earth-like color (a bit brownish gray)
				offCtx.fillStyle = "rgba(200, 180, 160, 0.9)";

				// Soft horizontal oval
				offCtx.beginPath();
				offCtx.ellipse(0, 0, w, h * 0.45, 0, 0, Math.PI * 2);
				offCtx.fill();

				// Side small puffs (adds realism)
				offCtx.beginPath();
				offCtx.ellipse(-w * 0.5, -h * 0.1, h * 0.4, h * 0.35, 0, 0, Math.PI * 2);
				offCtx.ellipse(w * 0.5, -h * 0.1, h * 0.4, h * 0.35, 0, 0, Math.PI * 2);
				offCtx.fill();
				offCtx.restore();
				d.x += d.vx;
				d.y += d.vy * 0.3;
				d.vx *= 0.92;
				d.alpha -= 0.06;
			}
			_item.char.spawnDusts = _item.char.spawnDusts.filter(g => g.alpha > 0);
		}
	}
	// this.drawCharacterGhost = function (_item, _sprite, _x,_y,_w,_h) {
	// 	if (_item.char.chargeProperties && _item.char.ghostData) {
	// 		let _blur = _item.char.ghostData.length;
	// 		const _ga = offCtx.globalAlpha;
	// 		for (let g of _item.char.ghostData) {
	// 			//offCtx.save();
	// 			offCtx.globalAlpha = g.alpha;
	// 			//offCtx.filter = 'blur(' + this.H(_blur) + 'px)';
	// 			// offCtx.drawImage(
	// 			// 	g.sprite,
	// 			// 	g.left - ((_item.reversed ? -1 : 1) * (platformX - g.p)), g.top,
	// 			// 	g.width, g.height
	// 			// );
	// 			 offCtx.drawImage(
	// 			g.sprite,
	// 			g.left - ((_item.reversed ? -1 : 1) * (platformX - g.p)),
	// 			g.top,
	// 			g.width * scale,
	// 			g.height * scale
	// 			);
	// 			offCtx.filter = '';
	// 			//offCtx.restore();
	// 			g.alpha -= 0.12;
	// 			_blur--;
	// 		}
	// 		offCtx.globalAlpha = _ga;
	// 		_item.char.ghostData = _item.char.ghostData.filter(g => g.alpha > 0);
	// 	}
	// }
	this.drawCharacterGhost = function (_item) {
		const gd = _item.char.ghostData;
		if (!_item.char.chargeProperties || !gd) return;

		let blur = gd.length;

		const baseAlpha = offCtx.globalAlpha;

		for (let i = 0; i < gd.length; i++) {
			const g = gd[i];

			offCtx.globalAlpha = g.alpha;

			const scale = 1 + blur * 0.02;

			offCtx.drawImage(
			g.sprite,
			g.left - ((_item.reversed ? -1 : 1) * (platformX - g.p)),
			g.top,
			g.width * scale,
			g.height * scale
			);

			g.alpha -= 0.12;
			blur--;
		}

		offCtx.globalAlpha = baseAlpha;

		_item.char.ghostData = gd.filter(g => g.alpha > 0);
	};

	this.H = function(v) {
		return v * (episode.cHeight / 768);
	}
	this.drawSpriteWithFade = function(_can, img, imgx, imgy, imgw, imgh, x, y, w, h, op) {
		const temp = document.createElement("canvas");
		temp.width = w;
		temp.height = h;
		const tctx = temp.getContext("2d");

		// 1 - Sprite'ı çiz
		tctx.drawImage(img, imgx, imgy, imgw, imgh, 0, 0, w, h);

		// 2 - Dikey fade: üst %50 → alt %0
		const g = tctx.createLinearGradient(0, 0, 0, h);
		g.addColorStop(0.0, `rgba(255,255,255,${op})`);
		g.addColorStop(0.92, "rgba(255,255,255,0.0)"); // alt

		tctx.globalCompositeOperation = "destination-in";
		tctx.fillStyle = g;
		tctx.fillRect(0, 0, w, h);
		tctx.globalCompositeOperation = "source-over";

		// 3 - Sonucu ana canvasa aktar
		_can.drawImage(temp, x, y);
	}
	this.drawHitParticles = function(_char, x, y, direction, color, strength, reversed, _key) {
	if (!_char.particles) _char.particles = [];

	if (x) {

		strength = Math.max(1, Math.min(3, strength - 1));
		let _countRate = 1;
		if(strength >= 2 && strength < 3)
			_countRate = getRandomValue2(100, 300) / 100;
		else if(strength >= 3)
			_countRate = 4;
		if(_char.particles.length > 0 && _countRate < 4)
			return;
		const count = (16 + _countRate) + strength * _countRate * ((_char.width * _char.ZOOM) / 30);
		const spread = (20 + _countRate) + strength * 20;
		const baseSpeed = (getRandomValue2(25, 45) / 10) + _countRate * ((_char.width * _char.ZOOM) / (60 + (_countRate * 15)));

		// 2.5D için kontrollü aşağı eğim
		let downwardBias = 18 + Math.random() * 6;
		for (let i = 0; i < count; i++) {

			const angle =
				direction +
				downwardBias +
				(Math.random() * spread - spread / 2);
			
			const rad = angle * Math.PI / 180;

			// HER PARTİKÜL FARKLI HAREKET PROFİLİ ALIR
			let speedVariance = Math.random();
			let speed =
				baseSpeed *
				(0.6 + speedVariance * speedVariance * 1.6);

			let vx = Math.cos(rad) * speed;
			let vy = Math.sin(rad) * speed;
			if (_key === 'slam')
				vy -= speed * 0.8;

			// Mikro yön bozulması (robotik hissi öldürür)
			vx += (Math.random() - 0.5) * 0.6;
			vy += (Math.random() - 0.5) * 0.4;

			_char.particles.push({
				x,
				y,
				vx,
				vy,
				p: platformX,
				radius: 1.5 + Math.random() * 3.2,
				life: getRandomValue2(80, 110) / 100,
				decay: 0.035 + Math.random() * 0.05,
				frame: 0,
				gravity: 0.28 + Math.random() * 0.5,
				wobble: Math.random() * 2,
				color: randomShade(color)
			});
		}
	}

	const oldAlpha = offCtx.globalAlpha;
	const _reversed = (offCtx.reversed && !reversed) || (!offCtx.reversed && reversed);
	for (let i = _char.particles.length - 1; i >= 0; i--) {
		const p = _char.particles[i];

		// Agresif başlangıç
		let speedMultiplier = p.frame < 2 ? 2.5 : 1;
		let sizeMultiplier  = p.frame < 2 ? 1.5 : 1;

		// Organik jitter (çizgi hissini yok eder)
		p.x += p.vx * speedMultiplier + Math.sin(p.frame + p.wobble) * 0.4;
		p.y += p.vy * speedMultiplier;

		p.vy += p.gravity;
		p.vx *= 0.96; // hafif sürtünme

		p.life -= p.decay;
		p.frame++;

		offCtx.globalAlpha = p.life;
		offCtx.beginPath();
		offCtx.fillStyle = p.color;
		offCtx.ellipse(
			p.x - ((_reversed ? -1 : 1) * (platformX - p.p)),
			p.y,
			p.radius * sizeMultiplier * (getRandomValue2(8, 24) / 10),
			p.radius * sizeMultiplier * (getRandomValue2(8, 12) / 10),
			0,
			0,
			Math.PI * 2
		);
		offCtx.fill();

		if (p.life <= 0)
			_char.particles.splice(i, 1);
	}

	offCtx.globalAlpha = oldAlpha;

	if (_char.particles.length === 0)
		delete _char.particles;

	function randomShade(hex) {
		let r = parseInt(hex.substr(1,2),16);
		let g = parseInt(hex.substr(3,2),16);
		let b = parseInt(hex.substr(5,2),16);

		r += Math.random() * 35 - 15;
		g += Math.random() * 25 - 10;
		b += Math.random() * 20 - 5;

		return `rgb(${r|0},${g|0},${b|0})`;
	}
}

// 	this.drawHitParticles = function(_char, x, y, direction, color, strength, reversed) {
// 	if (!_char.particles) _char.particles = [];

// 	if (x) {
// 		if(_char.particles.length > 0)
// 			return;

// 		strength = Math.max(1, Math.min(3, strength - 1));
// 		let _countRate = 1;
// 		if(strength >= 2 && strength < 3)
// 			_countRate = getRandomValue2(100, 300) / 100;
// 		else if(strength >= 3)
// 			_countRate = 4;
// 		const count = 8 + strength * _countRate * ((_char.width * _char.ZOOM) / 30);
// 		const spread = (18 + _countRate) + strength * 6;
// 		const baseSpeed = (getRandomValue2(18, 28) / 10) + _countRate * ((_char.width * _char.ZOOM) / 120);

// 		// 2.5D için kontrollü aşağı eğim
// 		const downwardBias = strength >= 2 ? 12 : 6;

// 		for (let i = 0; i < count; i++) {

// 			const angle =
// 				direction +
// 				downwardBias +
// 				(Math.random() * spread - spread / 2);

// 			const rad = angle * Math.PI / 180;

// 			// HER PARTİKÜL FARKLI HAREKET PROFİLİ ALIR
// 			let speedVariance = Math.random();
// 			let speed =
// 				baseSpeed *
// 				(0.6 + speedVariance * speedVariance * 1.6);

// 			let vx = Math.cos(rad) * speed;
// 			let vy = Math.sin(rad) * speed * 0.6;

// 			// Mikro yön bozulması (robotik hissi öldürür)
// 			vx += (Math.random() - 0.5) * 1.2;
// 			vy += (Math.random() - 0.5) * 0.8;

// 			_char.particles.push({
// 				x,
// 				y,
// 				vx,
// 				vy,
// 				p: platformX,
// 				radius: 1.5 + Math.random() * 3.2,
// 				life: 1,
// 				decay: 0.035 + Math.random() * 0.045,
// 				frame: 0,
// 				gravity: 0.32 + Math.random() * 0.18,
// 				wobble: Math.random() * 2,
// 				color: randomShade(color)
// 			});
// 		}
// 	}

// 	const oldAlpha = offCtx.globalAlpha;
// 	const _reversed = (offCtx.reversed && !reversed) || (!offCtx.reversed && reversed);
// 	for (let i = _char.particles.length - 1; i >= 0; i--) {
// 		const p = _char.particles[i];

// 		// Agresif başlangıç
// 		let speedMultiplier = p.frame < 2 ? 3.4 : 1;
// 		let sizeMultiplier  = p.frame < 2 ? 1.5 : 1;

// 		// Organik jitter (çizgi hissini yok eder)
// 		p.x += p.vx * speedMultiplier + Math.sin(p.frame + p.wobble) * 0.4;
// 		p.y += p.vy * speedMultiplier;

// 		p.vy += p.gravity;
// 		p.vx *= 0.92; // hafif sürtünme

// 		p.life -= p.decay;
// 		p.frame++;

// 		offCtx.globalAlpha = p.life;
// 		offCtx.beginPath();
// 		offCtx.fillStyle = p.color;
// 		offCtx.ellipse(
// 			p.x - ((_reversed ? -1 : 1) * (platformX - p.p)),
// 			p.y,
// 			p.radius * sizeMultiplier * (getRandomValue2(8, 20) / 10),
// 			p.radius * sizeMultiplier * (getRandomValue2(8, 12) / 10),
// 			0,
// 			0,
// 			Math.PI * 2
// 		);
// 		offCtx.fill();

// 		if (p.life <= 0)
// 			_char.particles.splice(i, 1);
// 	}

// 	offCtx.globalAlpha = oldAlpha;

// 	if (_char.particles.length === 0)
// 		delete _char.particles;

// 	function randomShade(hex) {
// 		let r = parseInt(hex.substr(1,2),16);
// 		let g = parseInt(hex.substr(3,2),16);
// 		let b = parseInt(hex.substr(5,2),16);

// 		r += Math.random() * 35 - 15;
// 		g += Math.random() * 25 - 10;
// 		b += Math.random() * 20 - 5;

// 		return `rgb(${r|0},${g|0},${b|0})`;
// 	}
// }

	this.drawCharacterQueue = function (_queue) {
		if (this.disposing || !_queue?.[0]){
			this.checkSceneActions();
			this.checkSceneActions(1);
			return;
		}
		this.checkSceneActions(1);
		for(let a of _queue)
			a.sortOrder = _maxSort - MathFloor((MathRound((a.drawPriority >= 10 ? 
				0 : a.char.yPosition) / _yTol)
			* 100000) + 
			(a.drawPriority * 10000)
			+ ((999 - (a.char.drawOrder ?? 0)))
			);
		_queue = radixSortLSD(_queue, a => a.sortOrder);
		c10.clearRect(0, 0, this.cWidth, this.cHeight);
		offCtx.clearRect(0, 0, this.cWidth, this.cHeight);
		if(__account.options.gore){
			cGore.clearRect(0, 0, this.cWidth, this.cHeight);
			offGoreCtx.clearRect(0, 0, this.cWidth, this.cHeight);
		}
		let _hasDmg, _shadowItems;
		for (var _item of _queue) {
			if(_item.unseen || _item.char.out || _item.char.unseen){
				continue;
			}
			if(!_hasDmg && (_item.char.hurting?.count > 0 || _item.skinColor))
				_hasDmg = true;
			if (!_item.unseen && _item.char?.shadow && !_item.char.unseen) {
				const _rel = _item.char.shadow;
				const _relZoom = _item.char.WIDTH / (_rel.width);
				const _shadowHeight = _item.char.ZOOM * (_item.char.yGap < 5 ? 8 : _item.char.yGap) * 3;
				if(!__batterySaveMode)
					offCtx.drawImage(this.FootShadow, _rel.left ?? 0, _rel.top ?? 0, _rel.width, _rel.height,
						_item.char.LEFT,
						MathRound(this.cHeight - _item.char.yPosition - (_item.char.yGap < 5 ? _shadowHeight / 2 : ((_shadowHeight * 3) / 4))),
						MathFloor(_rel.width * _relZoom), MathFloor(_shadowHeight));
			}
		}
		let i = 0;
		offCtx.reversed = c10.reversed = offGoreCtx.reversed = false;// = _cNPC.cleared = false;
		//let _zoomRate, _zoomedWidth, _zoomedHeight, _zoomedLeft, _zoomedTop, 
		let _hurt, _hurted, _rotate, _wDiff, _hDiff, _hurtedCount = 0, _bounceCount = 0;
		let _preDraws = [], _backgrounds = [], _relateds = [], _afterCanvasAnimations = [], _out;
		for (var _item of _queue) {
			if (_item.unseen || _item.char.remove || _item.char.unseen)
				continue;
			if(_item.char.bounce){
				if(_bounceCount > 1)
					continue;
				_bounceCount++;
			}
			_backgrounds.length = _preDraws.length = _relateds.length = 0;
			if(_item.objects)
				for(let ob of _item.objects) {
					if(ob.background)
						_backgrounds.push(ob);
					else if(ob.preDraw)
						_preDraws.push(ob);
					else
						_relateds.push(ob);
				}
			this.drawRelatedObjects(_item, _backgrounds);
			this.drawGoreObjects(_item);
			_out = _item.char.out || _item.alpha;
			if (!_out) {
				if (_item.reversed) {
					if (!offCtx.reversed) {
						offCtx.reversed = true;
						offCtx.save();
						offCtx.scale(-1, 1);
					}
				}
				else {
					if (offCtx.reversed) {
						offCtx.reversed = false;
						offCtx.restore();
					}
				}
			}
			++i;
			_item.char.drawOrder = i;
			if (!_item.char.main && platformX)
				_item.left -= platformX;
			_hurt = _item.char.hurting?.count > 0;
			const _anim = _item.char.animations?.[_item.animation];
			if(_hurt && !_item.char.getCurrentAnimation()?.hurt) {
				_hurt = false;
				_item.char.hurting.count = 0;
			}
			// && (!_item.char.lastHurtTime || ((_gameTick - _item.char.lastHurtTime) > 200));
			_shadowItems = [];
			// if(_flash || _item.skinColor)
			// {
			// }
			// else 
			// if (__account.options.effect && (_item.shadow || _item.char.shadowData?.length > 0) && 
			// !_item.char.unseen && !_hurt) {
			// 	for (var shadowindex = 0; shadowindex < (_item.char.shadowData?.length ?? 1); shadowindex++) {
			// 		if ((shadowindex % (_item.char.shadowIndex ?? 2)) > 0)
			// 			continue;
			// 		_shadowItems.push(_item.char.shadowData?.[shadowindex] ?? _item);
			// 	}
			// }
			if (__account.options.effect && _item.char.shadowData?.length > 0 && 
			!_item.char.unseen && !_hurt) {
				for (var shadowindex = 0; shadowindex < (_item.char.shadowData?.length ?? 1); shadowindex++) {
					if ((shadowindex % (_item.char.shadowIndex ?? 2)) > 0)
						continue;
					_shadowItems.push(_item.char.shadowData?.[shadowindex] ?? _item);
				}
			}
			if (_hurt){
				_item.char.hurting.count--;
				if(_item.char.hurting.count <= 0)
					_item.char.lastHurtTime = _gameTick;
			}
			if (!_out) {
				if(_item.char.release || _item.animation === 'release' || 
					_item.char.buffs?.find(x => x.key === 'release')) {
					if(!_item.char.releaseCount)
						_item.char.releaseCount = 0;
					_item.char.releaseCount++;
				}
				else if(_item.char.releaseCount)
					delete _item.char.releaseCount;
				if(!_item.char.releaseCount || ((_item.char.releaseCount % 8) < 4)) {
					_wDiff = (offCtx.reversed ? -1 : 1) * ((_item.width - (_item.width * (_item.zoom ?? 1))) / 2);
					_hDiff = (_item.height - (_item.height * (_item.zoom ?? 1)));
					if(!__batterySaveMode) {
						_hurted = !(_item.char.readyForFatality && _item.animation === 'hurtground1') && (_hurt || _item.skinColor);// && (_item.char.frame + _item.char.start) > 0;
						if(!_hurted && !_item.char.dead && _shadowItems?.[0]) {
							let _shadowItemOrder = 55;
							for(let _shadowItem of _shadowItems) {
								if(_shadowItemOrder > 255)
									break;
								const _shadowSprite = this.colorizeSprite4(_item, _item.shadow + _shadowItemOrder.toString(16), 1);
								if(_shadowSprite?.width > 0)
									offCtx.drawImage(_shadowSprite,
										MathRound(_shadowItem.reversed ? (-1 * _shadowItem.left) + (platformX - (_shadowItem.platformX ?? platformX))
											: _shadowItem.left - (platformX - (_shadowItem.platformX ?? platformX))), 
											MathRound(_shadowItem.top), 
											_shadowItem.width,
										_shadowItem.height);
								_shadowItemOrder += 50;
							}
						}
						_rotate = _item.char.animations ? _anim?.rotate : null;
						if(_rotate) {
							offCtx.translate(MathRound(offCtx.reversed ? -1 * (_item.left + _wDiff - (_item.width / 2)) : (_item.left + _wDiff + (_item.width / 2))), 
							MathRound(_item.top + _hDiff + (_item.height / 2)));  
							offCtx.rotate(_rotate);  
						}
						// _zoomRate = this.getPerspectiveRate(_item.char, null, _item.animation);
						// _zoomedWidth = MathRound(_item.width * _zoomRate);
						// _zoomedHeight = MathRound(_item.height * _zoomRate);
						// _zoomedLeft = MathRound((_zoomedWidth - _item.width) / 2);
						// _zoomedTop = MathRound(_zoomedHeight - _item.height);
						//_colorized = false;
						let _drawParticles = 1;
						if((_hurted && _item.char.frame < 2 && (_hurtedCount < 4 || _item.char.main)) || _item.skinColor) {
							//if(!_item.char.colorized) {
								//_item.char.colorized = _colorized = true;
								const _hurtSprite = this.colorizeSprite4(_item, null, _item.skinColor ? 1 : null);
								if(_hurtSprite?.width > 0)
									offCtx.drawImage(_hurtSprite,
										MathRound(offCtx.reversed ? -1 * (_item.left + _wDiff) : (_item.left + _wDiff)), 
										MathRound(_item.top + _hDiff), 
										MathRound(_item.width * (_item.zoom ?? 1) * 1.02),
										MathRound(_item.height * (_item.zoom ?? 1) * 1.02));
								_hurtedCount++;
							// }
							// else if(_item.char.colorized)
							// 	_item.char.colorized = false;
						}
						else
						{
							if(_item.border) {
								if(_item.char.borderIndex === undefined)
									_item.char.borderIndex = 0;
								else {
									_item.char.borderIndex++;
									if(_item.char.borderIndex >= _borderRates.length)
										_item.char.borderIndex =  0;
								}
								const _borderRate = _borderRates[_item.char.borderIndex];
								const _zoomBRate = 1 * _borderRate * (_item.char.borderRate ?? 1);
								let _zoomedBWidth, _zoomedBHeight;
								if(_item.width >= _item.height) {
									_zoomedBWidth = MathCeil(_item.width * _zoomBRate);
									_zoomedBHeight = (_zoomedBWidth - _item.width) + _item.height;
								}
								else {
									_zoomedBHeight = MathCeil(_item.height * _zoomBRate);
									_zoomedBWidth = (_zoomedBHeight - _item.height) + _item.width;
								}
								const _zoomedBLeft = MathRound((_zoomedBWidth - _item.width) / 2);
								const _zoomedBTop = MathRound((_zoomedBHeight - _item.height) / 2);
								const _borderSprite = this.colorizeSprite4(_item, _item.border);
								if(_borderSprite?.width > 0)
									offCtx.drawImage(_borderSprite,
										MathRound(offCtx.reversed ? -1 * (_item.left + _wDiff + _zoomedBLeft) : 
										(_item.left + _wDiff - _zoomedBLeft)), 
										MathRound(_item.top + _hDiff - _zoomedBTop), 
										MathRound(_zoomedBWidth * (_item.zoom ?? 1)),
										MathRound(_zoomedBHeight * (_item.zoom ?? 1)));
							}
							else if(_item.char.borderIndex >= 0)
								delete _item.char.borderIndex;
							this.drawRelatedObjects(_item, _preDraws);
							const _cropped = this.getCroppedSprite(_item.spriteX, _item.spriteY, _item.spriteWidth, _item.spriteHeight, 
								_item.char, _item.sprite.relativeSrc, _item.frameKey);
							if(!_cropped)
								offCtx.drawImage(_item.sprite, _item.spriteX, _item.spriteY,
									_item.spriteWidth, _item.spriteHeight,
									MathRound(offCtx.reversed ? -1 * (_item.left + _wDiff) : (_item.left + _wDiff)), 
									MathRound(_item.top + _hDiff), 
									MathRound(_item.width * (_item.zoom ?? 1)),
									MathRound(_item.height * (_item.zoom ?? 1)));
							else if(_cropped.width > 0) {
								const _x = MathRound(offCtx.reversed ? -1 * (_item.left + _wDiff) : (_item.left + _wDiff));
								const _y = MathRound(_item.top + _hDiff);
								const _w = MathRound(_item.width * (_item.zoom ?? 1));
								const _h = MathRound(_item.height * (_item.zoom ?? 1));
								this.drawCharacterGhost(_item,_cropped,_x,_y,_w,_h);
								offCtx.drawImage(_cropped,_x,_y,_w,_h);
								if(_item.char.chargeProperties) {
									if(!_item.char.ghostData)
										_item.char.ghostData = [];
									_item.char.ghostData.push({
										left: _x,
										top: _y,
										width: _w,
										height: _h,
										sprite: _cropped,
										p : platformX,
										alpha: .6
									});
									if (_item.char.ghostData.length > 5)
										_item.char.ghostData.shift();
									// if(!_item.char.spawnDusts)
									// 	_item.char.spawnDusts = [];
									const _trails = (_item.char.relatedObjects.filter(x => x.key === 'trail2')?.length ?? 0);
									const _scale = 1.5 - (_trails * 0.085);
									// char init
									if (_item.char.trailTick === undefined)
										_item.char.trailTick = 0;

									_item.char.trailTick++;

									if ((_item.char.trailTick & 1) === 0)
										_item.char.addObject({
											key: 'trail2',
											position: 'behind-feet',
											xGap: 100 - (_trails * 10),
											scale: _scale,
											yGap: -5
										});
									// _item.char.spawnDusts.push({
									// 	worldX: _x,
									// 	y: _y + _h - 2,
									// 	p: platformX,

									// 	rise: (_h * 0.5),
									// 	progress: 0,

									// 	size: this.H(8) + Math.random() * this.H(4),
									// 	wobble: (Math.random() - 0.5) * 0.5,

									// 	trails: [] // ← işte dalga izi burada
									// });
								}
								else {
									if(_item.char.ghostData){
										delete _item.char.ghostData;
										_item.char.relatedObjects = _item.char.relatedObjects.filter(x => x.key !== 'trail2');
									}
								}
								if(_item.char.hurtingStrength) {
									const _knockback = _item.char.animation.startsWith('knockback');
									let _hs = _item.char.hurtingStrength;
									if(typeof _hs === 'string')
										_hs = 4;
									else 
										_hs += (_knockback ? 2 : (_item.particleColor ? 3 : 0));
									this.drawHitParticles(_item.char, _x + MathRound(_w / 2),
									_y + MathRound(_h / 2), getRandomValue2(150, 190), _item.char.bloodColor === 'green' ? '#1f6f2e' : '#880808', 
									_hs, _knockback, _item.char.hurtingStrength);
									delete _item.char.hurtingStrength;
									_drawParticles = 0;
								}
							}
						}
						if(_drawParticles && _item.char.particles)
							this.drawHitParticles(_item.char);
						if(_item.char.text)
						{
							let _restored;
							if (offCtx.reversed) {
								offCtx.restore();
								_restored = 1;
							}
							const _text = getLangData(_item.char.text.value).toLocaleUpperCase(getLang());
							if(offCtx.font !== 'bold 3vh immortal')
								offCtx.font = "bold 3vh immortal";
							offCtx.fillStyle = "#1B1212";
							offCtx.textAlign = 'center';
							offCtx.fillText(_text, 
								MathRound((_item.left + _wDiff - (_item.char.ZOOM * _item.char.text.left))), 
								MathRound(_item.top + _hDiff + (_item.char.ZOOM * _item.char.text.top)));
							if(_restored) {
								offCtx.save();
								offCtx.scale(-1, 1);
							}				
						}
						if(_rotate) { 
							offCtx.rotate(-_rotate);  
							offCtx.translate(-1 * MathRound(offCtx.reversed ? -1 * (_item.left + _wDiff - (_item.width / 2)) : (_item.left + _wDiff + (_item.width / 2))), 
							-1 * MathRound(_item.top + _hDiff + (_item.height / 2)));  
						}
					}
				}
			}
			if (!_item.char.friendly && !_anim?.skipHealthBar)
				this.drawHealthBar2(_item);
			this.checkBubbleText(_item.char);
			if (_item.shadow 
				// || (_item.char.chargeProperties && 
				// (_item.char.main || _item.char.class === 'boss' || _item.char.alp))
			) {
				if (!_item.char.shadowData)
					_item.char.shadowData = [];
				else if (_item.char.shadowData.length > (_item.char.class === 'boss' ? 3 : 1))
				_item.char.shadowData.splice(0, _item.char.shadowIndex ?? 2);
				_item.platformX = platformX;
				_item.char.shadowData.push(_item);
			}
			else if(_item.char.shadowData?.length > 0) {
				_item.char.shadowData.splice(0, _item.char.shadowIndex ?? 2);
				if(_item.char.shadowData?.length === 0)
					_item.char.shadowData = undefined;
			}
			this.drawRelatedObjects(_item, _relateds);
			if(_item.char.canvasObjects?.[0])
				for(let _cobj of _item.char.canvasObjects){
					if(!_cobj.params.after)
						canvasAnimations[_cobj.key](_item.char, _cobj.params, offCtx);
					else
						_afterCanvasAnimations.push({key:_cobj.key, char:_item.char,params:_cobj.params});
				}
		}
		if(_afterCanvasAnimations?.[0])
			for(let _cobj of _afterCanvasAnimations)
				canvasAnimations[_cobj.key](_cobj.char, _cobj.params, offCtx);
		if(offCtx.reversed) {
			offCtx.restore();
			offCtx.reversed = false;
		}
		if(c10.reversed) {
			c10.restore();
			c10.reversed = false;
		}
		c10.drawImage(this.offCanvas, 0, 0);
		if (__account.options.gore){
			if(offGoreCtx.reversed)
				offGoreCtx.restore();
			cGore.drawImage(this.offGoreCanvas, 0, 0);
		}
		if(this.cameraMoveStep){
			if(mainCharacter.left > centerMinX) {
				prevPlatformX = platformX;
				platformX += this.cameraMoveStep;
				mainCharacter.left -= this.cameraMoveStep;
				mainCharacter.platformX = platformX;
				if(mainCharacter.left <= centerMinX){
					mainCharacter.direction = __right;
					delete this.cameraMoveStep;
					mainCharacter.disableKeyboard = mainCharacter.immobilize = false;
					if(this.cameraMoveEndFunc) {
						this.cameraMoveEndFunc();
						delete this.cameraMoveEndFunc;
					}
				}
			}
			else {
				prevPlatformX = platformX;
				platformX -= this.cameraMoveStep;
				mainCharacter.left += this.cameraMoveStep;
				mainCharacter.platformX = platformX;
				if(mainCharacter.left >= centerMinX){
					mainCharacter.direction = __left;
					delete this.cameraMoveStep;
					mainCharacter.disableKeyboard = mainCharacter.immobilize = false;
					if(this.cameraMoveEndFunc) {
						this.cameraMoveEndFunc();
						delete this.cameraMoveEndFunc;
					}
				}
			}
		}
		this.checkUnseenEnemyPointer();
		this.checkSceneActions();
	}
	this.borderizeSprite = function(ctx, image, x, y, glowColor = 'red', glowSize = 3) {
		const w = image.width;
		const h = image.height;

		// Geçici canvas (offscreen)
		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = w + glowSize * 2;
		tempCanvas.height = h + glowSize * 2;
		const tempCtx = tempCanvas.getContext('2d');

		// Sprite'ı ortalanmış şekilde çiz
		tempCtx.drawImage(image, glowSize, glowSize);

		// Görseli birkaç kez hafif kaydırarak çizerek glow efekti üret
		tempCtx.globalCompositeOperation = 'source-in';
		tempCtx.fillStyle = glowColor;
		tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

		// Ana canvas'a glow'lu hali blur ile bastır
		ctx.save();
		ctx.shadowColor = glowColor;
		ctx.shadowBlur = glowSize * 2;
		ctx.drawImage(tempCanvas, x - glowSize, y - glowSize);
		ctx.shadowBlur = 0;

		// Ana sprite'ı en üste çiz
		ctx.drawImage(image, x, y);
		ctx.restore();
	}
	this.checkUnseenEnemyPointer = function() {
		if((_gameTick - 500) < this.enemyArrowsShown)
			return;
		const _l = mainCharacter?.hasLeftEnemy;
		const _r = mainCharacter?.hasRightEnemy;
		if(!this.enemyLeftArrow)
			this.enemyLeftArrow = document.querySelector('.enemy-left-arrow');
		else { 
			if(_l)
				removeClass(this.enemyLeftArrow, 'v-none');
			else
				addClass(this.enemyLeftArrow, 'v-none');
		}
			
		if(!this.enemyRightArrow)
			this.enemyRightArrow = document.querySelector('.enemy-right-arrow');
		else {
			if(_r)
				removeClass(this.enemyRightArrow, 'v-none');
			else
				addClass(this.enemyRightArrow, 'v-none');
		}
		this.enemyArrowsShown  = _gameTick;
		return;
		if(!_l && !_r)
			return;
		const _step = MathCeil(this.cHeight / 30);
		const _miniStep = MathCeil(_step / 3);
		const _start = MathRound((this.cHeight / 2) - (_step / 2));
		c10.fillStyle = 'red';
		c10.strokeStyle = '#000';
		if(_l) {
			const path = new Path2D();
			path.moveTo(0, _start);
			path.lineTo(_step, _start - _step);
			path.lineTo(_step, _start - _step + _miniStep);
			path.lineTo(_miniStep, _start);
			path.lineTo(_step, _start + _step - _miniStep);
			path.lineTo(_step, _start + _step);
			c10.fill(path);
		}
		if(_r) {
			const path = new Path2D();
			path.moveTo(this.cWidth, _start);
			path.lineTo(this.cWidth - _step, _start - _step);
			path.lineTo(this.cWidth - _step, _start - _step + _miniStep);
			path.lineTo(this.cWidth - _miniStep, _start);
			path.lineTo(this.cWidth - _step, _start + _step - _miniStep);
			path.lineTo(this.cWidth - _step, _start + _step);
			c10.fill(path);
		}
	}
	this.checkSceneActions = function(_before) {
		if(!__storyScene?.actions)
			return;
		for(let _act of __storyScene.actions) {
			if((_act.before && !_before) || (!_act.before && _before))
				continue;
			if(_act.when() && _act.do)
				_act.do();
		}
	}
	
	this.checkBubbleText = function (_char) {
		if (_char.remove || _char.dead || _char.dying) {
			const _bubble = episode.bubbles?.find(x => x.key === _char.key)?.elem; //document.querySelectorAll('.talk-bubble-' + _char.key);
			if (_bubble)
				removeBubble(_bubble, _char);
		}
	}
	this.drawBuffs = function (_char, _size) {
		if (_char.buffs?.[0]) {
			if(!_char.buffContainer)
				_char.buffContainer = document.querySelector('#char-' + _char.key + ' .buffs');
			if (!_char.buffContainer)
				return;
			if(_char.buffKey === _char.lastBuffKey)
				return;
			while (_char.buffContainer.firstChild) {
				_char.buffContainer.removeChild(_char.buffContainer.firstChild);
			}
			const _arr = this.sortBuffs(_char.buffs);
			for (var _buff of _arr) {
				const _buffItem = document.createElement('img');
				_buffItem.src = './images/buff/icons/' + _buff.key + '.png';
				_buffItem.className = (_allBuffs[_buff.key].gain ? 'buff' : 'debuff') + (_buff.level > 3 ? 3 : _buff.level) + '-' + _size;
				_char.buffContainer.appendChild(_buffItem);
			}
			_char.lastBuffKey = _char.buffKey;
		}
		else if (_char.buffContainer && _char.hadBuff) {
			delete _char.hadBuff;
			_char.buffContainer.innerHTML = '';
			delete _char.lastBuffKey;
		}
	}
	this.sortBuffs = function (_buffs) {
		return _buffs.sort((a, b) => {
			const _at = a.type === 'buff' ? 2 : 1;
			const _bt = b.type === 'buff' ? 2 : 1;
			if (_at === _bt) {
				if (a.time == b.time) {
					return b.level - a.level;
				}
				return b.time - a.time;
			}
			else
				return _bt - _at;
		});
	}
	this.hideHealthBar = function (_char) {
		if (_char.remove || _char.skipHealthBar || _char.isDead() || _char.healthBarDrawn) {
			const hb = _char.healthBarElem ?? document.getElementById('hb-' + _char.key);
			if (hb) {
				_char.healthBarDrawn = false;
				hb.remove();
			}
		}
	}
	this.fillRoundedRect = function(ctx, color, x, y, width, height) {
        ctx.fillStyle = color;
		ctx.fillRect(x,y,width,height);
    }
    this.drawRoundedRect = function(ctx, color, lineWidth, x, y, width, height) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
		ctx.strokeRect(x,y,width,height);
    }
	
	// this.drawHealthBar2 = function (_item) {
	// 	if(__batterySaveMode || _item.unseen || _item.char.skipHealthBar || _item.char.remove || _item.char.health <= 0 || _item.char.dead)
	// 		return;
	// 	if (_item.char.main) {
	// 		this.drawBuffs(_item.char, 'big');
	// 		return;
	// 	}
	// 	if (!_item.char.key || !_item.char.hpDropped || _item.char.MAXHP <= 1 || _item.char.class === __spell || _item.char.animation === 'respawn')
	// 		return;
	// 	if(_item.char.hpDropped < (_gameTick - 4000))
	// 		return;
	// 	const _hpRate = _item.char.healthRate;
	// 	const isWarPlayer = _item.char.enemy && this.war;
	// 	const _isBoss = _item.char.class === 'boss';
	// 	let hbInner = {};
	// 	let _hWidth = MathRound((this.cWidth / 100) * (_item.char.class === 'boss' ? 8 : 4));
	// 	if(_item.char.healthBarWidthRate)
	// 		_hWidth = MathRound(_item.char.healthBarWidthRate * _hWidth); 
	// 	const _xGap = MathRound((_item.char.WIDTH - _hWidth) / 2);
	// 	let _hLeft = MathRound(_item.char.EXACTLEFT + _xGap);
	// 	let _extraTop = isWarPlayer ? MathRound(-40 * _item.char.ZOOM) : 0;
	// 	let _hHeight = this.defaultHealthBarHeight;
	// 	if(_item.char.healthBarHeightRate)
	// 		_hHeight = MathRound(_item.char.healthBarHeightRate * _hHeight); 
	// 	let _hTop = MathRound((this.cHeight + _extraTop) - _hHeight - (MathRound((_item.char.healtbarGap ?? 0) * __zoom)) - _item.char.yPosition -  _item.char.HEIGHT - (_item.yGap ?? 0) - (_item.char.yGap ?? 0));
	// 	if(_isBoss) {
	// 		const _id = 'hb-' + _item.char.key;
	// 		let hb = _item.char.healthBarElem ?? document.getElementById(_id);
	// 		if (!hb) {
	// 			hb = document.createElement('div');
	// 			hb.id = _id;
	// 			hb.className = 'health-bar-tiny boss';
	// 			hbInner = document.createElement('div');
	// 			hbInner.className = 'health-bar-tiny-inner flex flex-jc-start';
	// 			hb.appendChild(hbInner);
	// 			if (_item.char.animations.block && _item.char.enemy) {
	// 				const _enemyDefBar = document.createElement('div');
	// 				_enemyDefBar.style = 'height:35%;width:100%;background:#9D00FF';
	// 				_enemyDefBar.id = 'defbar-' + _id;
	// 				_enemyDefBar.className = 'enemy-def-bar';
	// 				hb.appendChild(_enemyDefBar);
	// 				_item.char.hasFatiqueBar = 1;
	// 			}
	// 			if (_item.char.animations.air2 && _item.char.enemy) {
	// 				const _enemyRageBar = document.createElement('div');
	// 				_enemyRageBar.style = 'height:20%;width:100%';
	// 				_enemyRageBar.className = 'enemy-rage-bar';
	// 				const _innerRageBar = document.createElement('div');
	// 				_innerRageBar.className = 'enemy-rage-bar-inner';
	// 				_innerRageBar.id = "ragebar-" + _id;
	// 				_enemyRageBar.appendChild(_innerRageBar);
	// 				hb.appendChild(_enemyRageBar);
	// 				_item.char.hasRageBar = 1;
	// 			}
	// 			_gameUI.appendChild(hb);
	// 			_item.char.healthBarDrawn = true;
	// 			hb.h = _item.char.HEIGHT;
	// 			if (_item.char.grade > 1 && _item.char.gradeLeft > 0)
	// 				hb.style.background = getGradeBGColor(_item.char.grade);
	// 		}
	// 		if(hbInner && 
	// 			hbInner.gradeLeft != _item.char.gradeLeft) {
	// 			hbInner.gradeLeft = _item.char.gradeLeft;
	// 			hb.innerHTML = hb.innerHTML + '<span style="position:absolute;height:100%;display:flex;align-items:center;left:1vw;top:0;color:#f7f7f7 !important;text-shadow:0 0 .5vh #000">Lvl ' + _item.char.level + ' - ' + _item.char.displayName + '</span><span id="boss-grade-count" style="color:#f7f7f7 !important;text-shadow:0 0 .5vh #000;position:absolute;top:0;height:100%;right:1vw;display:flex;align-items:center">' + (_item.char.gradeLeft > 0 ? 'x' + (_item.char.gradeLeft + 1) : '') + '</span>';
	// 		}
	// 		hb.scrLeft = _hLeft;
	// 		hb.scrTop = _hTop;
	// 		if (!hbInner)
	// 			hbInner = document.querySelector('#' + _id + ' .health-bar-tiny-inner');
	// 		if(hbInner?.style && _hpRate !== hbInner.hpRate) {
	// 			hbInner.style.width = _hpRate + '%';
	// 			hbInner.hpRate =_hpRate;
	// 		}
	// 		if(!isWarPlayer) {
	// 			if (!_item.char.autoMode) {
	// 				addClass(hb, 'friendly-enemy');
	// 				removeClass(hb, 'hostile-enemy');
	// 			}
	// 			else if (_item.char.autoMode === 2) {
	// 				addClass(hb, 'hostile-enemy');
	// 				removeClass(hb, 'friendly-enemy');
	// 			}
	// 		}
	// 	}
	// 	let _hpBG = !_item.char.gradeLeft ? '#B2BEB5' : getGradeBGColor(_item.char.gradeLeft + 1), _bg, _border;
	// 	if (_item.char.gradeLeft > 0) {
	// 		if(hbInner && hbInner.bg !== 1) {
	// 			if (__account.questStatus.quest && (__account.questStatus.quest.loots ?? __account.questStatus.quest.kills)?.find(x => x.enemy?.indexOf(_item.char.id) >= 0))
	// 				_border = '#B87333';
	// 			let _color = _item.char.grade < 2 ? '#2E8B57' : getGradeBGColor((_item.char.gradeLeft ?? 0) + 2);
	// 			if(!_isBoss)
	// 				_bg = _color;
	// 			else if(hbInner?.style)
	// 				hbInner.style.background = _color;
	// 			hbInner.bg = 1;
	// 		}
	// 	}
	// 	else if (_hpRate > 50) {
	// 		if(hbInner && hbInner.bg !== 4) {
	// 			if (__account.questStatus.quest && (__account.questStatus.quest.loots ?? __account.questStatus.quest.kills)?.find(x => x.enemy?.indexOf(_item.char.id) >= 0))
	// 				_border = '#B87333';
	// 			_bg =  _item.char.grade < 2 ? '#2E8B57' : getGradeBGColor((_item.char.gradeLeft ?? 0) + 2);
	// 			hbInner.bg = 4;
	// 		}
	// 	}
	// 	else {//if (_hpRate > 0){
	// 		if(hbInner && hbInner.bg !== 2) {
	// 			_bg = 'yellow';
	// 			hbInner.bg = 2;
	// 		}
	// 	}
	// 	// else {
	// 	// 	if(hbInner && hbInner.bg !== 3) {
	// 	// 		_bg = 'red';
	// 	// 		hbInner.bg = 3;
	// 	// 	}
	// 	// }
	// 	if(_item.char.hurting?.count === 2)
	// 		_border = '#f3f4f5';
	// 	else if(!_border) {
	// 		if (!_item.char.autoMode)
	// 			_border = '#36454F';
	// 		else if (_item.char.autoMode === 2)
	// 			_border = '#C41E3A';
	// 	}
	// 	if (offCtx.reversed) 
	// 		offCtx.restore();
	// 	const _tinyHeight = MathRound(_hHeight / 5);
	// 	const _H = (MathRound(_tinyHeight * 1.35) * 2) + _hHeight + 2;
	// 	let _barHeight = MathRound(_tinyHeight * 1.5) + _hHeight;
	// 	this.fillRoundedRect(offCtx, _hpBG, _hLeft, _hTop, _hWidth, _hHeight);
	// 	this.fillRoundedRect(offCtx, _bg, _hLeft, _hTop, MathCeil(_hWidth * (_hpRate / 100)), _hHeight);
    //     this.drawRoundedRect(offCtx, _border ?? '#E97451', 1, _hLeft, _hTop, _hWidth, _hHeight);
	// 	//if(px === 1)
    //     	//this.drawRoundedRect(offCtx, '#cccccc', 1, _hLeft, _hTop + 1, MathRound(MathCeil(_hWidth * (_hpRate / 100)) * .95), 1);
	// 	// if (_item.char.animations.block && _item.char.enemy) {
	// 	// 	const _fRate = (_item.char.fatique / _item.char.maxFatique);
    //     // 	this.fillRoundedRect(offCtx, '#702963', _hLeft, _hTop + _hHeight, _hWidth, MathRound(_tinyHeight * 1.5));
    //     // 	this.fillRoundedRect(offCtx, '#6082B6', _hLeft, _hTop + _hHeight, MathCeil(_hWidth * _fRate), MathRound(_tinyHeight * 1.5));
	// 	// 	this.drawRoundedRect(offCtx, '#0437F2', 1, _hLeft, _hTop + _hHeight, _hWidth, MathRound(_tinyHeight * 1.35));
	// 	// }
	// 	// if(_item.char.animations.air2 && _item.char.enemy)
	// 	// 	this.fillRoundedRect(offCtx, '#D2042D', _hLeft, _hTop + _hHeight + MathRound(_tinyHeight * 1.35), _hWidth, MathRound(_tinyHeight * 1.35));
    //     if(_item.char.healthBarIcon) {
	// 		_hTop -= (MathRound(((2 * _hHeight) - _barHeight) / 2) - 1);
	// 		this.fillRoundedRect(offCtx, '#000000', _hLeft - _H - 2, _hTop - 2, _H + 4, _H + 4);
	// 		getImage('./images/icons/' + _item.char.healthBarIcon + '.png', function(_img) {
	// 			offCtx.drawImage(_img, _hLeft - _H, _hTop,_H,_H);
	// 		});
	// 	}
	// 	if(offCtx.reversed) {
	// 		offCtx.save();
	// 		offCtx.scale(-1, 1);
	// 	}
	// }
	this.healthBarCache = this.healthBarCache ?? new Map();
	this.w100 = MathRound(this.cWidth / 100);
	this.VH3 = MathRound(window.innerHeight / 33);
	// this.drawMobHealthBar = function(cofftx, _item, x, y, w) {
	// 	const _char = _item.char;
	// 	const h = MathRound(w * (26 / 124));
	//     // HP Ratio
	//     let ratio = Math.max(0, Math.min(1, _char.health / _char.MAXHP));

	//     // İlk tick ise previousHPRatio yok → oluştur
	//     if (_char.previousHPRatio === undefined) {
	//         _char.previousHPRatio = ratio;
	//         _char.damageFlash = 0; 
	//     }

	//     // HP düştüyse flash tetikle
	//     if (ratio < _char.previousHPRatio) {
	//         _char.damageFlash = 1; 
	//     }

	//     // Flash zamanla sönsün
	//     if (_char.damageFlash > 0) {
	//         _char.damageFlash = Math.max(0, _char.damageFlash - 0.10);
	//     }

	//     // Yeni HP değerini sakla
	//     _char.previousHPRatio = ratio;
	// 	const _rev = offCtx.reversed;
	// 	if(offCtx.reversed)
	// 		offCtx.restore();

	//     // --- 1. ÇERÇEVEYİ ÇİZ ---
	//     cofftx.drawImage(this.HBMob, x, y, w, h);


	//     // --- 2. INNER BAR MARGIN ---
	// 	let padX = w * .06;
	// 	let padY = h * .225;
	//     let innerX = x + padX;
	//     let innerY = y + padY;
	//     let innerW = w - padX * 2;
	//     let innerH = h - padY * 2;

	//     // --- 3. HEALTH COLOR (yeşil → kırmızı) ---
	//     let r = Math.floor(255 * (1 - ratio));
	//     let g = Math.floor(255 * ratio);
	//     let color = `rgb(${r},${g},0)`;

	//     // Bar genişliği
	//     let barW = innerW * ratio;

	//     // Health bar'ı çiz
	//     cofftx.save();
	//     cofftx.fillStyle = color;
	//     cofftx.fillRect(innerX, innerY, barW, innerH);
	//     //cofftx.restore();


	//     // --- 4. DAMAGE FLASH (otomatik) ---
	//     if (_char.damageFlash > 0) {
	//         //cofftx.save();
	//         cofftx.globalAlpha = _char.damageFlash;
	//         cofftx.fillStyle = "white";
	//         cofftx.fillRect(innerX, innerY, innerW, innerH);
	//         //cofftx.restore();
	//     }
	// 	cofftx.restore();
	// 	if(_rev) {
	// 		offCtx.save();
	// 		offCtx.scale(-1, 1);
	// 	}
	// }
	this.drawMobHealthBar = function (ctx, _item, x, y, w) {
		const _char = _item.char;
		const h = MathRound(w * (26 / 124));

		let ratio = _char.health / _char.MAXHP;
		if (ratio < 0) ratio = 0;
		else if (ratio > 1) ratio = 1;

		if (_char.previousHPRatio === undefined) {
			_char.previousHPRatio = ratio;
			_char.damageFlash = 0;
		}

		if (ratio < _char.previousHPRatio)
			_char.damageFlash = 1;

		if (_char.damageFlash > 0)
			_char.damageFlash = Math.max(0, _char.damageFlash - 0.10);

		_char.previousHPRatio = ratio;

		// 🔑 WORLD-SPACE FIX
		const drawX = ctx.reversed ? (-x - w) : x;

		// --- FRAME ---
		ctx.drawImage(this.HBMob, drawX, y, w, h);

		const padX = w * 0.06;
		const padY = h * 0.225;

		const innerX = drawX + padX;
		const innerY = y + padY;
		const innerW = w - padX * 2;
		const innerH = h - padY * 2;

		const barW = innerW * ratio;

		const r = (255 * (1 - ratio)) | 0;
		const g = (255 * ratio) | 0;

		ctx.save();
		ctx.fillStyle = `rgb(${r},${g},0)`;

		// 🔥 YÖN FIX (ASIL MESELE)
		ctx.fillRect(
			ctx.reversed ? (innerX + innerW) : innerX,
			innerY,
			ctx.reversed ? -barW : barW,
			innerH
		);

		if (_char.damageFlash > 0) {
			ctx.globalAlpha = _char.damageFlash;
			ctx.fillStyle = "#fff";
			ctx.fillRect(
				ctx.reversed ? (innerX + innerW) : innerX,
				innerY,
				ctx.reversed ? -innerW : innerW,
				innerH
			);
		}

		ctx.restore();
	};


	this.drawBossName = function(cofftx, _char, x, y, w, padX) {

		const name = _char.displayName ?? _char.name ?? "BOSS";

		// Font ölçeklemesi (her çözünürlükte temiz)
		let fontSize = MathRound(w * 0.12); // genişliğe göre ayarlanır

		cofftx.save();

		cofftx.font = `${fontSize}px 'Cinzel', serif`;
		cofftx.textBaseline = "top";
		cofftx.textAlign = "left";

		// Stroke kalınlığı (dinamik)
		cofftx.lineWidth = fontSize * 0.15;

		// --- OUTLINE ---
		cofftx.strokeStyle = "black";
		cofftx.strokeText(name, x, y - fontSize);

		// --- FILL ---
		cofftx.fillStyle = "#F2F2F2"; // okunabilir kirli beyaz
		cofftx.fillText(name, x, y - fontSize);
		if(_char.gradeLeft > 0) {
			const gradeText = "x" + (_char.gradeLeft + 1);
			cofftx.strokeText(gradeText, x + w + padX, y);
			cofftx.fillText(gradeText, x + w + padX, y);
		}
		cofftx.restore();
	};
	this.drawBossHealthBar = function(cofftx, _item, x, y, w) {

		const _char = _item.char;
		const h = MathRound(w * (26 / 252)); // boss bar aspect ratio

		// HP Ratio
		let ratio = Math.max(0, Math.min(1, _char.health / _char.MAXHP));

		// Init
		if (_char.previousHPRatio === undefined) {
			_char.previousHPRatio = ratio;
			_char.damageFlash = 0;
		}

		// Flash trigger
		if (ratio < _char.previousHPRatio) {
			_char.damageFlash = 1;
		}

		// Fade flash
		if (_char.damageFlash > 0) {
			_char.damageFlash = Math.max(0, _char.damageFlash - 0.10);
		}

		_char.previousHPRatio = ratio;

		// Reverse fix
		const _rev = offCtx.reversed;
		if (_rev) offCtx.restore();

		// --- 1. ÇERÇEVE ---
		cofftx.drawImage(this.HBBoss, x, y, w, h);

		// --- 2. INNER BAR MARGIN ---
		let padX = w * .03;
		let padY = h * .225;
		let innerX = x + padX;
		let innerY = y + padY;
		let innerW = w - padX * 2;
		let innerH = h - padY * 2;

		// --- 3. Renkler (daha parlak DF paleti) ---
		const fantasy = [
			"#C62828",
			"#2ECC71",
			"#2874A6",
			"#E67E22",
			"#8E44AD",
			"#F1C40F",
			'#1FA6A0',
			'#7CB342',
			'#C13A4A',
			'#7470bbff',
			'#C7CCD6',
			'#3d354b'
		];

		let mainColor = fantasy[_char.gradeLeft + 1];
		let underColor = fantasy[_char.gradeLeft];

		// Bar width
		let barW = innerW * ratio;

		// --- 4. GradeLeft = 0 → Mob mantığı ---
		if (_char.gradeLeft === 0) {

			// arka plan yok (transparan)
			// sadece ratio'lu ön bar var

			if (ratio >= 0.5) {
				// mob yeşil
				mainColor = "#3CA64C";
			} else {
				// mob kırmızı
				mainColor = "#B22222";
			}

			cofftx.save();
			cofftx.fillStyle = mainColor;
			cofftx.fillRect(innerX, innerY, barW, innerH);
			cofftx.restore();

		} else {

			// --- 5. GradeLeft > 0 → Çift katmanlı boss bar ---

			// Arka katman (gradeLeft)
			cofftx.save();
			cofftx.fillStyle = underColor;
			cofftx.fillRect(innerX, innerY, innerW, innerH);
			cofftx.restore();

			// Üst katman (grade)
			cofftx.save();
			cofftx.fillStyle = mainColor;
			cofftx.fillRect(innerX, innerY, barW, innerH);
			cofftx.restore();
		}

		// --- 6. DAMAGE FLASH ---
		if (_char.damageFlash > 0) {
			cofftx.save();
			cofftx.globalAlpha = _char.damageFlash;
			cofftx.fillStyle = "white";
			cofftx.fillRect(innerX, innerY, innerW, innerH);
			cofftx.restore();
		}
		
		this.drawBossName(cofftx, _item.char, x + padX, y, w, MathRound(padX * .5));
		// Reverse geri al
		if (_rev) {
			offCtx.save();
			offCtx.scale(-1, 1);
		}
	};

	this.drawHealthBar2 = function (_item) {
		const _isPvp = !this.gold && ((this.pvp || this.war) || _item.char.flagCapturer);
		if(__batterySaveMode || _item.char.skipHealthBar || _item.char.health <= 0 || _item.char.dead)
			return;

		// if(!(_item.char.grade > 1))
		// 	return;

		if (_item.char.main || (_isPvp && _item.char.alp)) {
			this.drawBuffs(_item.char, 'big');
			if(!_isPvp)
				return;
		}
		if(!_isPvp) {
			const _pass = (_item.char.class !== 'boss' && _item.char.phased == undefined);
			if (!_item.char.key || (!_item.char.hpDropped && _pass) || _item.char.MAXHP <= 1 || _item.char.class === __spell || _item.animation === 'respawn')
				return;

			if (_pass && _item.char.hpDropped < mainCharacter.attackedUnitTime)
				return;
		}
		else{
			const _isBoss = _item.char.class === 'boss';

			let _hWidth = MathRound((this.cWidth / 100) * (_isBoss ? 10 : 4));
			if (_item.char.healthBarWidthRate)
				_hWidth = MathRound(_item.char.healthBarWidthRate * _hWidth);

			const _xGap = MathRound((_item.char.WIDTH - _hWidth) / 2);
			const _hLeft = MathRound(_item.char.EXACTLEFT + _xGap);
			const isWarPlayer = _item.char.enemy;
			const _extraTop = isWarPlayer ? MathRound(-40 * __zoom * __scale) : MathRound(-10 * __zoom * __scale);
			let _hHeight = this.cHeight / 75;
			if (_item.char.healthBarHeightRate)
				_hHeight *= _item.char.healthBarHeightRate;

			const _hTop = MathRound(
				(this.cHeight + _extraTop)
				- _hHeight
				- ((_item.hbGap ?? 0))
				- _item.char.yPosition
				- _item.char.HEIGHT
				- (_item.yGap ?? 0)
				- ((_item.char.yGap ?? 0))
			);
			const c = document.createElement('canvas');
			const _ch = _hHeight * 2;
			c.width = _hWidth;
			c.height = _ch;
			const ctx = c.getContext('2d');
			ctx.imageSmoothingEnabled = false;

			// Üçgenin noktaları
			const x1 = MathRound(_hWidth * .25), y1 = 0;   // sol üst
			const x2 = MathRound(_hWidth * .75), y2 = 0;  // sağ üst
			const x3 = MathRound(_hWidth * .5), y3 = _ch; // alt orta (uç)

			// Çizim
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.closePath();

			// Dolgu rengi
			ctx.fillStyle = _item.char.main ? "orange" : "red";
			ctx.fill();

			// Çerçeve (opsiyonel)
			ctx.strokeStyle = "black";
			ctx.lineWidth = MathCeil(episode.cHeight / 500);
			ctx.stroke();
			if(offCtx.reversed)
				offCtx.restore();
			offCtx.drawImage(c, _hLeft, _hTop);
			if(offCtx.reversed) {
				offCtx.save();
				offCtx.scale(-1, 1);
			}
			return;
		}
		const _hpRate = _item.char.healthRate;

		// === 4'lü gruba dönüştür ===
		let hpGroupRate;
		if (_hpRate >= 70) hpGroupRate = 100;
		else if (_hpRate >= 50) hpGroupRate = 75;
		else if (_hpRate >= 30) hpGroupRate = 50;
		else hpGroupRate = 25;

		const _isBoss = _item.char.class === 'boss';

		let _hWidth = MathRound((this.cWidth / 100) * (_isBoss ? 10 : 4));
		if (_item.char.healthBarWidthRate)
			_hWidth = MathRound(_item.char.healthBarWidthRate * _hWidth);

		const _xGap = MathRound((_item.char.WIDTH - _hWidth) / 2);
		const _hLeft = MathRound(_item.char.EXACTLEFT + _xGap);
		const isWarPlayer = _item.char.enemy && _isPvp;
		const _extraTop = isWarPlayer ? MathRound(-40 * __zoom * __scale) : MathRound(-10 * __zoom * __scale);
		let _hHeight = this.cHeight / 75;
		if (_item.char.healthBarHeightRate)
			_hHeight *= _item.char.healthBarHeightRate;
		const _hTop = MathRound(
			(this.cHeight + _extraTop)
			- _hHeight
			- ((_item.hbGap ?? 0))
			- _item.char.yPosition
			- _item.char.HEIGHT
			- (_item.yGap ?? 0)
			- ((_item.char.yGap ?? 0))
		);
		_hHeight = MathCeil(_hHeight);
		if(!(_item.char.grade > 1))
			this.drawMobHealthBar(offCtx, _item, _hLeft, _hTop, _hWidth);
		else 
			this.drawBossHealthBar(offCtx, _item, _hLeft, _hTop, _hWidth);
		return;
		const _hpBG = !_item.char.gradeLeft ? '#B2BEB5' : getGradeBGColor(_item.char.gradeLeft + 1);
		let _bg = 'yellow';
		if (hpGroupRate === 100 || hpGroupRate === 75)
			_bg = _item.char.grade < 2 ? '#0BDA51' : getGradeBGColor((_item.char.gradeLeft ?? 0) + 2);
		else if(_item.char.gradeLeft)
			_bg = getGradeBGColor((_item.char.gradeLeft ?? 0) + 2);
		// === Cache'e bak ===
		const cacheKey = _isPvp ? `group-${_item.char.groupId}` : `group-${hpGroupRate}-${_hWidth}x${_hHeight}-${_bg}`;
		let cached = this.healthBarCache.get(cacheKey);

		if (!cached) {
			
			
			// let _border = '#E97451';
			// if(_item.char.hurting?.count === 2) _border = '#f3f4f5';
			// else if (!_item.char.autoMode) _border = '#36454F';
			// else if (_item.char.autoMode === 2) _border = '#C41E3A';

			const c = document.createElement('canvas');
			if(_isPvp) {
				const _ch = _hHeight * 2;
				c.width = _hWidth;
				c.height = _ch;
				const ctx = c.getContext('2d');
				ctx.imageSmoothingEnabled = false;

				// Üçgenin noktaları
				const x1 = MathRound(_hWidth * .25), y1 = 0;   // sol üst
				const x2 = MathRound(_hWidth * .75), y2 = 0;  // sağ üst
				const x3 = MathRound(_hWidth * .5), y3 = _ch; // alt orta (uç)

				// Çizim
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				ctx.closePath();

				// Dolgu rengi
				ctx.fillStyle = _item.char.main ? "orange" : "red";
				ctx.fill();

				// Çerçeve (opsiyonel)
				ctx.strokeStyle = "black";
				ctx.lineWidth = MathCeil(episode.cHeight / 500);
				ctx.stroke();
			}
			else {
				const _isGradedChar = _item.char.grade > 1 && _item.char.gradeLeft > 0;
				const _maxTextHeight = _isGradedChar ? (_hHeight * 2) : _hHeight;
				const _maxTextWidth = (_isGradedChar ? (_maxTextHeight * ((_item.char.gradeLeft + 1).toString().length + 1)) + (this.cWidth / 100) : 0);
				c.width = MathRound(_hWidth + _maxTextWidth);
				c.height = _maxTextHeight;
				const ctxY = MathFloor((_maxTextHeight - _hHeight) / 2);
				const ctx = c.getContext('2d');
				ctx.imageSmoothingEnabled = false;
				this.fillRoundedRect(ctx, _hpBG, 0, ctxY, _hWidth, _hHeight);
				this.fillRoundedRect(ctx, _bg, 0, ctxY, MathCeil(_hWidth * (hpGroupRate / 100)), _hHeight);
				//this.drawRoundedRect(ctx, '#C41E3A', 1, 0, ctxY, _hWidth, _height);
				if(_isGradedChar){
					ctx.fillStyle = '#262626';
					ctx.font = 'bold ' + _maxTextHeight + 'px "Courier New", monospace';
					const _txt = 'x' + (_item.char.gradeLeft + 1);
					const metrics = ctx.measureText(_txt);
					ctx.fillRect(_hWidth, 0, metrics.width + this.w100, _maxTextHeight);
					ctx.fillStyle = '#f3f4f5';
					ctx.textBaseline = 'middle';
					ctx.fillText(_txt, 
						_hWidth + MathRound(this.w100 / 2), _hHeight);
				}
			}
			this.healthBarCache.set(cacheKey, c);
			cached = c;
		}
		if(offCtx.reversed)
			offCtx.restore();
		offCtx.drawImage(cached, _hLeft, _hTop);
		if(offCtx.reversed) {
			offCtx.save();
			offCtx.scale(-1, 1);
		}
	};
	this.drawRelatedObjects = function (_item, _arr) {
		if(!_arr?.[0] || this.disposing || __batterySaveMode || _item.alpha)
			return;
		let shouldRemove, _draw, removeIds = [];
		for (let _rel of _arr) {
			if(_rel.ground)
				continue;
			if(!_rel.background && !__account.options.effect)
				continue;
			var _can = _rel.background ? _cNPC : offCtx;
			let _left = _item.left;
			if(this.still && _rel.background){
				delete _rel.background;
				_left = _item.char.LEFT;
			}
			_draw = _item.char.main;
			if (_rel.bind === _item.animation)
				_draw = true;
			else if (_rel.bind) {
				_rel.remove = true;
				if(_rel.type === 'buff' && _item.char.buffs?.find(x => x.key === _rel.bind)){
					delete _rel.remove;
					_draw = true;
				}
				else
					_draw = false;
			}
			else if (_rel.remove){
				if(!shouldRemove)
					shouldRemove = 1;
				if(_rel.removeId)
					removeIds.push(_rel.removeId);
				continue;
			}
			if (_rel.delay) {
				_rel.delay--;
				continue;
			}
			if (_rel.reset) {
				_rel.reset = false;
				_rel.start = _rel.frame = 0;
				_rel.stillLeft = _rel.stillReversed = undefined;
			}
			if (_rel.totalFrames) {
				if (_rel.start === undefined)
					_rel.start = 0;
				if (_rel.frame === undefined)
					_rel.frame = 0;
				if (_rel.start > 0 && ((_rel.start % (_rel.speed * (/*_item.char.fps ??*/ 1))) === 0)) {
					_rel.frame++;
					if (_rel.skip && (_rel.frame % _rel.skip) === 0)
						_rel.frame++;
					_rel.start = 0;
					_item.char.calculateRelatedTop(_rel, _rel.position);
					if (_rel.frame >= _rel.totalFrames) {
						if (!_rel.stay) {
							if (_rel.repeat) {
								if(typeof _rel.repeat === 'number')
									_rel.repeat--;
								if(!_rel.repeat)
									_rel.remove = true;
								else
									_rel.frame = 0;
							}
							else
								_rel.remove = true;
						}
						else {
							_rel.stay--;
							_rel.frame--;
						}
					}
				}
			}
			if (!_rel.remove || _draw) {
				if (_rel.sound && _rel.start === 0 && _rel.frame === 0)
					this.playSound(_rel.sound);
				let _reversed = (((_rel.reversed ? 1 : 0) + (_item.reversed ? 1 : 0)) % 2) > 0;
				if (_rel.still && (_rel.stillLeft === undefined || (_rel.stillReversed !== undefined && _rel.stillReversed !== _reversed))) {
					_rel.stillPlatformX = platformX;
					if(_rel.background && (_rel.stillLeft === undefined))
						_rel.stillLeft = _item.left;
					else if(!_rel.background)
						_rel.stillLeft = _item.left;
					_rel.stillTop = _rel.top;
					// if(_rel.xGapMin && _rel.xGapMax)
					// 	_rel.xGap = 0; //MathRound(getRandomValue2(_rel.xGapMin, _rel.xGapMax) / (__zoom *__scale));
					// if(_rel.yGapMin && _rel.yGapMax)
					// 	_rel.yGap = 0; // MathRound(getRandomValue2(_rel.yGapMin, _rel.yGapMax) / (__zoom *__scale));
					_rel.stillXGap = (_rel.xGap + ((_rel.reversable === false && _item.reversed) ? _item.char.WIDTH : 0));
					if (_rel.reversable != false)
						_rel.stillReversed = _reversed;
				} 
				else if(_rel.type === 'buff') {
					_rel.xGap = _item.char.getObjectXGap(_rel, {});
					_rel.stillPlatformX = platformX;
					_rel.stillReversed = _reversed;
					_rel.stillLeft = _left;
					_rel.stillXGap = _rel.xGap + ((_item.reversed ? 1 : -1) * (_rel.stillLeft === undefined ? 0 : _rel.stillLeft - _left));
					_rel.stillTop = _rel.top;
				}else if(_rel.stillOnChar) {
					if(_rel.stillLeft !== _left || _rel.type === 'buff'){
						if(!_rel.still && _rel.type !== 'buff')
							_rel.still = true;
						_rel.stillPlatformX = platformX;
						_rel.stillLeft = _left;
						_rel.stillXGap = _rel.xGap + ((_item.reversed ? 1 : -1) * (_rel.stillLeft === undefined ? 0 : _rel.stillLeft - _left));
						_rel.stillReversed = _reversed;
					}
					if(_rel.stillTop !== _rel.top)
						_rel.stillTop = _rel.top;
				}
				let _relLeft = (_rel.stillLeft !== undefined ? _rel.stillLeft + (_rel.stillPlatformX - platformX) :
					_left);
				let _restored;
				if (_reversed) {
					if (_rel.reversable != false) {
						if (!_can.reversed && !_rel.background) {
							_can.save();
							_can.scale(-1, 1);
							_can.reversed = true;
						}
					}
					else if (_can.reversed && !_rel.background) {
						_can.restore();
						_can.reversed = false;
						_restored = 1;
					}
				}
				else if (_can.reversed && !_rel.background) {
					_can.restore();
					_can.reversed = false;
					_restored = 1;
				}
				if (!_can.reversed && _rel.stillReversed && !_rel.background) {
					_can.save();
					_can.scale(-1, 1);
					_can.reversed = true;
				}
				else if (!_restored && _rel.stillReversed === false && _can.reversed && !_rel.background) {
					_can.restore();
					_can.reversed = false;
				}
				if(_rel.background && _rel.stillLeft !== undefined)
					_relLeft = _rel.stillLeft;
				let _xGap = _rel.locate ? ((_rel.stillXGap ?? _rel.xGap) ?? 0) : (MathAbs(_rel.stillXGap ?? _rel.xGap) ?? 0);
				_relLeft += ((_can.reversed ? 1 : -1) * (_xGap));
				if (_can.reversed)
					_relLeft *= -1;
				let _fl = _rel.frame, _ft = 0;
				if (_rel.col) {
					const frameIndex = _rel.frame;
					_fl = frameIndex % _rel.col;
					_ft = (frameIndex / _rel.col | 0) * _rel.height;
				}
				if(!__batterySaveMode || _rel.background) {
					let _spr = _rel.sprite;
					if(_rel.color)
						_spr = this.colorizeRelSprite4({
							sprite: _spr,
							char: _item.char,
							width: MathRound(_rel.width / _rel.zoom),
							zoom: _rel.zoom ?? 1,
							height: MathRound(_rel.height / _rel.zoom),
							spriteX: ((_fl ?? 0) * _rel.width) + (_rel.baseLeft ?? 0),
							spriteY:  _ft + (_rel.baseTop ?? 0),
							spriteWidth: _rel.width - (_rel.baseRight ?? 0),
							spriteHeight: _rel.height
						}, _rel.color, _rel.key + '-frame' + (_rel.frame ?? 0));
					if(_spr?.width > 0){
						if(_rel.alpha < 1) {
							this.drawSpriteWithFade(_can, _spr, 
								((_fl ?? 0) * _rel.width) + (_rel.baseLeft ?? 0), 
								_ft + (_rel.baseTop ?? 0), 
								_rel.width - (_rel.baseRight ?? 0), 
								_rel.height,
							MathRound(_relLeft),
							MathRound((_rel.stillTop ?? _rel.top) - (((_rel.stillTop ? 0 : (_item.yGap ?? 0)) + ((_rel.yGap ?? 0))) / __scale)),
							MathFloor((_rel.width - (_rel.baseRight ?? 0)) * _rel.zoom), 
							MathFloor(_rel.height * _rel.zoom), _rel.alpha);
							if(_rel.fadeZoom)
								_rel.zoom *= _rel.fadeZoom;
						}
						else 
							_can.drawImage(_spr, ((_fl ?? 0) * _rel.width) + (_rel.baseLeft ?? 0), _ft + (_rel.baseTop ?? 0), _rel.width - (_rel.baseRight ?? 0), _rel.height,
							MathRound(_relLeft),
							MathRound((_rel.stillTop ?? _rel.top) - (((_rel.stillTop ? 0 : (_item.yGap ?? 0)) + ((_rel.yGap ?? 0))) / __scale)),
							MathFloor((_rel.width - (_rel.baseRight ?? 0)) * _rel.zoom), MathFloor(_rel.height * _rel.zoom));
					}
					if(_rel.fade) {
						if(!_rel.alpha)
							_rel.alpha = 1;
						_rel.alpha -= _rel.fade;
						if(_rel.alpha <= 0)
							_rel.remove = true;
					}
				}
			}
			if(_rel.remove && !shouldRemove)
				shouldRemove = 1;
			if (_rel.start >= 0)
				_rel.start++;
		}
		if(shouldRemove) {
			if(removeIds?.[0])
				for(let ri of removeIds)
				{
					const _index = this.limitedEffects.findIndex(x => x.removeId === ri);
					if(_index !== -1)
						this.limitedEffects.splice(_index, 1);
				}
			_item.char.relatedObjects = _item.char.relatedObjects.filter(x => !x.remove);
		}
	}

	this.drawGoreObjects = function (_item) {
		if(!__account.options.gore || this.disposing)
			return;
		for (var _rel of _item.objects) {
			if (!_rel.ground || _rel.remove)
				continue;
			if (_rel.delay) {
				_rel.delay--;
				continue;
			}
			if (_rel.totalFrames) {
				if (_rel.start === undefined)
					_rel.start = 0;
				if (_rel.frame === undefined)
					_rel.frame = 0;
				if (_rel.start > 0 && ((_rel.start % _rel.speed) === 0)) {
					_rel.frame++;
					if (_rel.skip && (_rel.frame % _rel.skip) === 0)
						_rel.frame++;
					_rel.start = 0;
					if (_rel.frame >= _rel.totalFrames) {
						if (!_rel.stay) {
							if (_rel.repeat)
								_rel.frame = 0;
							else
								_rel.remove = true;
						}
						else {
							_rel.stay--;
							_rel.frame--;
						}
					}
				}
			}
			if (!_rel.remove) {
				let _reversed = (((_rel.reversed ? 1 : 0) + (_item.reversed ? 1 : 0)) % 2) > 0;
				if (_rel.still && !_rel.stillOnChar && (_rel.stillLeft === undefined)) {
					_rel.stillPlatformX = platformX;
					_rel.stillLeft = (_item.char.main ? _item.left + platformX : _item.left) + ((_reversed ? 1 : -1) * (_rel.xGap ?? 0));
					_rel.stillTop = _rel.top;
					if(_reversed)
						_rel.stillReversed = _reversed;
				}
				let _relLeft = (_rel.stillLeft !== undefined ? _rel.stillLeft + (_rel.stillPlatformX - platformX) :
					_item.left);
				if (_rel.stillReversed ?? _reversed) {
					if (_rel.reversable != false) {
						if (!offGoreCtx.reversed) {
							offGoreCtx.save();
							offGoreCtx.scale(-1, 1);
							offGoreCtx.reversed = true;
						}
					}
					else if (offGoreCtx.reversed) {
						offGoreCtx.restore();
						offGoreCtx.reversed = false;
					}
				}
				else if (offGoreCtx.reversed) {
					offGoreCtx.restore();
					offGoreCtx.reversed = false;
				}
				if (offGoreCtx.reversed) {
					_relLeft *= -1;
					_relLeft += (_rel.stillPlatformX ?? platformX)
				}
				else
					_relLeft -= (_rel.stillPlatformX ?? platformX)
				let _fl = _rel.frame, _ft = 0;
				if (_rel.col) {
					const frameIndex = _rel.frame;
					_fl = frameIndex % _rel.col;
					_ft = (frameIndex / _rel.col | 0) * _rel.height;
				}
				if(!__batterySaveMode)
					offGoreCtx.drawImage(_rel.sprite, (_fl ?? 0) * _rel.width, _ft + (_rel.baseTop ?? 0), _rel.width - (_rel.baseRight ?? 0), _rel.height,
						MathRound(_relLeft),
						MathRound((_rel.stillTop ?? _rel.top) - ((_rel.yGap ?? 0) * _rel.zoom)),
						MathFloor((_rel.width - (_rel.baseRight ?? 0)) * _rel.zoom) - (_rel.baseRight ?? 0), MathFloor(_rel.height * _rel.zoom));
			}
			if (_rel.start >= 0)
				_rel.start++;
		}
	}

	this.getAvailableEnemies = function (_char, _func, _force) {
		if(!_force && (_char.lastAvailableEnemyPickDate > (_gameTick - 200)))
			return  _char.lastAvailableEnemies;
		_char.lastAvailableEnemyPickDate = _gameTick;
		const _enemies = this.pvp ? this.enemies : this.seenEnemies;
		if(_char.onlyTarget){
			const _en = _enemies.find(x => x.key === _char.onlyTarget);
			if(_en){
				_char.lastAvailableEnemies = [_en];
				return _char.lastAvailableEnemies;
			}
		}
		// const onlyTarget = _enemies?.find(x => x.attackingOnlyBy && x.attackingOnlyBy === _char.key && 
		// 	x != _char && x.enemy != undefined && !x.dead && !(x.knockbacking && x.dying) && 
		// 	(_ff || x.enemy !== _char.enemy) && isObjectInVisibleRectangle(x));
		// if (onlyTarget) 
		// {
		// 	_char.lastAvailableEnemies = [onlyTarget];
		// 	return _char.lastAvailableEnemies;
		// }
		// if(_char.lastEnemyPick?.[0] && ((_gameTick - _char.lastEnemyPickDate) < 200))
		// 	return _char.lastEnemyPick;
		// const activeEnemies = this.seenEnemies?.filter(x =>
		// 	!x.dead && x.class !== __spell);
		const _iv = !(_char.main && _char.autoMode === 2);
		if(!_char._enemyBuffer)
  			_char._enemyBuffer = [];
		else
			_char._enemyBuffer.length = 0;
		const _x = _char._enemyBuffer;
		const _ff = _char.friendlyFire && (_char.enemy !== mainCharacter.enemy);
		for(let x of _enemies) {
			if(x.attackingOnlyBy && x.attackingOnlyBy === _char.key && 
			x != _char && x.enemy != undefined && !x.dead && !(x.knockbacking && x.dying) && 
			(_ff || x.enemy !== _char.enemy) && isObjectInVisibleRectangle(x))
			{
				if(_x.length)
					_x.length = 0;
				_x.push(x);
				break;
			}

			if(x.dead || x.class === __spell)
				continue;
			if (x === _char || x.enemy == undefined) 
				continue;

			if (!_ff && (
				x.enemy === _char.enemy ||
				(x.owner === (_char.coopWith ?? _char)) ||
				(_char.owner === (x.coopWith ?? x))
			)) continue;
			if (x.knockbacking && x.dying && (!_func || !_func(x))) 
				continue;

			if (x.attackingOnlyBy) 
				continue;

			const anim = x.getCurrentAnimation?.();
			if (anim?.interactive && !this?.fatality) 
				continue;

			if (!this.pvp && _iv && !isObjectInVisibleRectangle(x))
				continue;

			_x.push(x);
		}

		// const _x = activeEnemies.filter(x => {
		// 	if(x.dead || x.class === __spell)
		// 		return false;
		// 	if (x === _char || x.enemy == undefined) 
		// 		return false;

		// 	if (!_ff && (
		// 		x.enemy === _char.enemy ||
		// 		(x.owner === (_char.coopWith ?? _char)) ||
		// 		(_char.owner === (x.coopWith ?? x))
		// 	)) return false;
		// 	if (x.knockbacking && x.dying && (!_func || !_func(x))) 
		// 		return false;

		// 	if (x.attackingOnlyBy) 
		// 		return false;

		// 	const anim = x.getCurrentAnimation?.();
		// 	if (anim?.interactive && !episode?.fatality) 
		// 		return false;

		// 	if (!episode.pvp && _iv && !isObjectInVisibleRectangle(x))
		// 		return false;

		// 	return true;
		// });
		_char.lastAvailableEnemies = _x;
		return _char.lastAvailableEnemies;
		return this.enemies?.filter(x =>
				x.class !== __spell &&
				x != _char && (!x.getCurrentAnimation().interactive || episode?.fatality) &&
				x.enemy != undefined &&
				(_ff || ((x.enemy !== _char.enemy) && (x.owner !== (_char.coopWith ?? _char)) &&
				(_char.owner !== (x.coopWith ?? x)))) &&
				(isObjectInVisibleRectangle(x) || episode.pvp || (_char.main && _char.autoMode === 2)) &&
				!x.dead && !x.remove &&
				(!(x.knockbacking && x.dying) || (_func && _func(x))) &&
				!x.attackingOnlyBy
			);
		//return _enn;
	}

	this.hasEnemyAlive = function (_c) {
		return this.enemies?.find(x => x.enemy !== _c.enemy && x.class !== __spell && !x.isDead());
	}
	this.removeBubbles = function() {
		if(episode.bubbles?.[0]) {
			for(let _b of episode.bubbles){
				const _bubble = _b.elem;
				if (_bubble?.remove)
					_bubble.remove();
			}
			episode.bubbles = [];
		}
		if(episode.dialogs?.[0])
			episode.dialogs = [];
	}
	this.initLightRadiusLayer = function() {

		const container = document.getElementById('css-canvas-foreground');

		const scale = 1;

		const canvas = document.createElement('canvas');

		canvas.width = container.clientWidth * scale;
		canvas.height = container.clientHeight * scale;

		const ctx = canvas.getContext('2d');
		//ctx.scale(scale, scale);

		container.appendChild(canvas);

		this.lightradius2 = {
			canvas: canvas,
			ctx: ctx
		};
	}
	this.disposeLightRadiusLayer = function() {

		const lr = this.lightradius2;

		if (!lr) return;

		// DOM'dan kaldır
		if (lr.canvas && lr.canvas.parentNode) {
			lr.canvas.parentNode.removeChild(lr.canvas);
		}

		// GPU context referansını bırak
		lr.ctx = null;
		lr.canvas = null;

		// Objeyi sil
		this.lightradius2 = null;
	}

	this.dispose = function() {
		if(this.challangeStarted)
			delete this.challangeStarted;
		if(this.pvpResult)
			this.pvpResult.remove();
		this.removeBubbles();
		this.pauseBgMusic(1);
		this.pauseAmbianceMusic();
		if(this.after)
			this.after();
		this.disposing = 1;
		if(this.bgMusicTimer)
			clearInterval(this.bgMusicTimer);
		if(this.goSound){
			if(!this.goSound.paused)
				this.goSound.pause();
			this.goSound = null;
		}
		const _bgAudios = [];
		if(this.bgMusic)
			_bgAudios.push(this.bgMusic);
		if(this.bgSound)
			_bgAudios.push(this.bgSound);
		clearAudioCache(_bgAudios);
		if(mainCharacter.heartbeat) {
			mainCharacter.heartbeat.pause();
			mainCharacter.heartbeat = undefined;
		}
		if(episode.enemies)
			episode.enemies.forEach(e => {
				e.stopStepSound();
			});
		if(episode.mobs?.find(x => !x.listed))
			episode.mobs = episode.mobs.filter(x => x.listed);
		if(episode.phase)
			delete episode.phase;
		if(episode.boss)
			delete episode.boss;
		this.removeLocationHand();
		for(let _elem of document.querySelectorAll('.dmg'))
			_elem.remove();
		if(this.offCanvas)
			delete this.offCanvas;
		for(let _sp of this.sprites)
			if(_sp.animation.sprites?.[0])
				for(let _asp of _sp.animation.sprites)
					if(_asp.image) {
						_asp.image.remove();
						_asp.image = null;
						delete _asp.image;
						_sp = null;
					}
		for(let _sp of this.enemies)
			if(_sp.sprite?.image) {
				if(_sp.castContainer)
					_sp.castContainer.remove();
				_sp.sprite.image.remove();
				_sp.sprite.image = null;
				delete _sp.sprite.image;
				_sp = null;
			}
		addClass(this.enemyRightArrow, 'v-none');
		addClass(this.enemyLeftArrow, 'v-none');
		this.layersDrawn = false;
		const _wrappers = document.querySelectorAll('.wrapper-3d');
		_wrappers?.forEach(x => x.remove());
		stopWeather();
		this.seenEnemies.length = 0;
		window.SoundManager.clearLoops();
		this.disposeLightRadiusLayer();
	}
	setBusyState(!(this.menu || this.lobby));
	this.initLightRadiusLayer();
	this.resize = function() {
		const _ms = mapSprites.find(x => x.id == this.season);
		this.width = MathRound((_ms.width) * __zoom);
		if(this.width < _canvas.width)
			this.width = _canvas.width;
		_canvasR.width = _canvasS.width = (this.width);
		_canvasS.style.width = (this.width * __scale) + 'px';
		for(let _c of _cArr) {
			_c.innerHTML = '';
			_c.style.transform = 'translateX(0)';
			_c.style.setProperty('-webkit-transform', 'translateX(0)');
			_c.backgroundSet = undefined;
		}
		this.height = _canvas.height;
		this.distance = (__globalDistance ? parseFloat(__globalDistance) / 100 : undefined) ?? (_ms.distance ?? .5);
		this.zoom = __zoom * (this.ground.zoom ?? 1);
		this.cHeight = _canvas.height;
		this.cUIHeight = _canvas.height * __scale;
		this.cWidth = _canvas.width;
		this.cUIWidth = _canvas.width * __scale;
		this.dmgFrameHeight = this.cHeight / 20;
		this.dmgFrameTopBoundary = MathRound(this.cHeight * .15);
		this.RECT = { 
			left: 0, 
			right: this.cWidth,
			top: 0, 
			bottom: this.cHeight, 
			width: this.cWidth, 
			realWidth: this.cWidth 
		};
		if (this.ground) {
			if (this.ground.yRate)
				groundheight = MathRound(idealground_height * this.ground.yRate);
			else
				groundheight = idealground_height;
			minPositionY = this.ground.bottomGap ? MathRound(this.ground.bottomGap * __zoom) : 1;
			minLeft = this.ground.leftGap ? MathRound(this.ground.leftGap * __zoom) : 0;
			maxLeft = this.ground.rightGap ? MathRound(this.ground.rightGap * __zoom) : 0;
		}
		else
			groundheight = idealground_height;
		
		this.loadLayers();
		if (this.loadObjects) {
			const _objects = _mapSprite.objects ?? [];
			let _arr;
			if(this.artifacts?.length > 0 && !this.artifactLocated) {
				_arr = _objects.concat(this.artifacts);
				this.artifactLocated = 1;
			}
			else
				_arr = _objects;
			for (var _obj of _arr)
				this.loadObject(_obj);
		}
		this.XStep = MathRound(getGroundHeight() / 4);
		this.YStep = MathRound(getGroundHeight() / 5);
		_yTol = 7 * __zoom;
		this.offCanvas.width = this.cWidth;
		this.offCanvas.height = this.cHeight;
		this.offGoreCanvas.width = this.cWidth;
		this.offGoreCanvas.height = this.cHeight;
		this.offDmgCanvas.width = this.cWidth;
		this.offDmgCanvas.height = this.cHeight;
		this.w100 = MathRound(this.cWidth / 100);
		this.VH3 = MathRound(window.innerHeight / 33);
		this.spritesDrawnBackGround = this.spritesDrawnForeGround = false;
		this.layersDrawn = 0;
		prevPlatformX = -1;
		this.drawSpriteObjects2();
		this.drawLayers();
	}
	this.resize();
}