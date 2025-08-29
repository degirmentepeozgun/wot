'use strict';
console.log('map');
function map(_m) {
	this.season = _m.season;
	const _mapSprite = mapSprites.find(x => x.id == this.season);
	this.still = _mapSprite.still;
	this.width = MathRound((_mapSprite.width ?? _m.width) * __zoom);
	_canvasR.width = _canvasS.width = (this.width);
	_canvasR.style.width = _canvasS.style.width = (this.width) + 'px';
	this.missionRoadRate = 1;
	cc = document.getElementById('constant-obj');
	c3 = document.getElementById('droad');
	c50 = document.getElementById('droad50');
	c85 = document.getElementById('droad85');
	c90 = document.getElementById('droad90');
	c9 = document.getElementById('dobj-foreground');
	const _cArr = [c3, c9, c50, c85, c90, cc];
	for(let _c of _cArr) {
		_c.style.width = this.width + 'px';
		_c.style.transform = 'translate3d(0,0,0)';
		_c.style.setProperty('-webkit-transform', 'translate3d(0,0,0)');
		_c.backgroundSet = undefined;
	}
	this.after = _mapSprite.after;
	this.height = _m.height;
	this.distance = (__globalDistance ? parseFloat(__globalDistance) / 100 : undefined) ?? (_mapSprite.distance ?? .5);
	this.sprites = _m.sprites;
	this.status = _m.status ?? 'loading';
	this.loadObjects = _m.loadObjects;
	this.loadEnemies = _m.loadEnemies;
	this.enemies = [];
	this.type = _m.type ?? 'mission';
	this.enemyCounts = _m.enemyCounts;
	this.pvp = _mapSprite.battleGround || _mapSprite.pvp;
	this.tower = _mapSprite.tower;
	this.gold = _mapSprite.gold;
	this.dungeon = _mapSprite.dungeon;
	__maxRageCount = this.pvp ? 40 : 20;
	this.theme = _mapSprite.theme;
	this.assetPath = _mapSprite.assetPath ?? this.theme;
	this.lobby = _mapSprite.lobby;
	this.floors = _mapSprite.floors;
	this.ambianceVolume = _mapSprite.ambianceVolume;
	if (this.floors)
		this.currentFloor = _m.currentFloor ?? 1;
	this.backgroundSrc = this.assetPath;
	this.totalObjectCount = _m.totalObjectCount;
	this.ground = _mapSprite.ground;
	this.id = _mapSprite.id;
	if(this.id === 500)
		this.war = 1;
	this.mobs = _mapSprite.mobs;
	this.itemGrade = _mapSprite.itemGrade ?? 0;
	this.equipmentDropRates = _mapSprite.equipmentDropRates;
	this.artifacts = [];
	if(this.id < 100 && !this.lobby)
	{
		//artifact ekleyelim
		const _minArtifactGrade = __artifacts.map(x => x.group).sort()[0];
		const _maxArtifactGrade = __artifacts.map(x => x.group).sort().reverse()[0];
		const _artifactGrade = getRandomValue(_minArtifactGrade, _maxArtifactGrade);
		let _artifact;
		if(getRandomValue(1, _artifactGrade * 100) === 1)
		{
			const _artifactOrder = getRandomValue(1, __artifacts.filter(x => x.group === _artifactGrade).length);
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
				locate: { left: getRandomValue(256, _mapSprite.width - 256), bottom: -10 },
			});
	}
	const self = this;
	if (_mapSprite.do)
		_mapSprite.do();
	let _canvasAreas = document.querySelectorAll('.canvas');
	for (var _ca of _canvasAreas)
		_ca.innerHTML = '';
	_canvasAreas = document.querySelectorAll('canvas');
	for (var _ca of _canvasAreas)
		_ca.getContext('2d').clearRect(0, 0, _ca.width, _ca.height);
	const _healtbars = document.querySelectorAll('.health-bar-tiny');
	for (var _hb of _healtbars)
		_hb.remove();
	if (pvpCounter)
		pvpCounter.remove();
	if (this.ground) {
		this.ground.src = './images/texture/' + this.assetPath + '-ground.png';
		if (this.ground.yRate)
			groundHeight = idealground_height * this.ground.yRate;
		else
			groundHeight = idealground_height;
		minPositionY = this.ground.bottomGap ? MathRound(this.ground.bottomGap * __zoom) : 0;
	}
	this.installMob = function (_mob, _func, _return, _respawn) {
		for (var i = 0; i < (_respawn ? 1 : (_mob.count ?? 1)); i++) {
			if (_mob.chanceRate && getRandomValue(1, 100) > _mob.chanceRate)
				continue;
			let _id = _mob.id;
			if (_mob.ids)
				_id = _mob.ids[getRandomValue(0, _mob.ids.length - 1)];
			const _enemy = _store.getMainCharacter(_allEnemies[('enemy' + _id)]());
			_store.setCharacterStats(_enemy);
			_enemy.yPosition = (_mob.yPosition ? (typeof _mob.yPosition === 'function' ? _mob.yPosition(_enemy) : _mob.yPosition) : getRandomValue(minPositionY, groundHeight));
			_enemy.direction = _mob.direction ?? getRandomValue(0, 1) < 1 ? 'left' : 'right';
			_enemy.left = getRandomValue(_mob.minX ? MathRound(_mob.minX * __zoom) : 0,
				_mob.maxX ? MathRound(_mob.maxX * __zoom) : this.width - _enemy.getWidth());
			_enemy.platformX = platformX;
			_enemy.grade = _mob.grade ?? 1;
			if(_mob.props)
				_enemy.setProps(_mob.props);
			if (_enemy.grade > 1) {
				_enemy.gradeLeft = _enemy.grade - 1;
				_enemy.zoom *= (1 + (.1 * _enemy.gradeLeft));
				_enemy.atk *= _enemy.grade;
				_enemy.experience *= _enemy.grade;
			}
			if(_mob.spawn)
				_enemy.respawnAfterSeconds = _mob.spawn;
			if (_mob.groupId)
				_enemy.groupId = _mob.groupId;
			_enemy.displayName = _mob.name;
			_enemy.level = getRandomValue(_mob.minLevel ?? 1, _mob.maxLevel ?? (_mob.minLevel ?? 1));
			let _levelRate = 1;
			if(_enemy.level > (_mob.minLevel ?? _enemy.level))
				_levelRate = 1 + ((_enemy.level - _mob.minLevel) / 10);
			_enemy.atk = MathRound(_enemy.atk *_levelRate);
			_enemy.maxHP = MathRound(_enemy.maxHP *_levelRate);
			_enemy.def = MathRound(_enemy.def *_levelRate);
			if (_mob.hp)
				_enemy.maxHP = _mob.hp;
			_enemy.setHealth(_enemy.getMaxHP());
			_enemy.sight = _mob.sight ? MathCeil(_mob.sight * __zoom) : 500;
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
			_enemy.enemy = true;
			_enemy.friendly = _enemy.main = false;
			_enemy.setAutoMode(_mob.attackAfterHit ? 0 : 2);
			this.enemies.push(_enemy);
			if (_func)
				_func(_enemy);
			if((this.dungeon || this.pvp) && mainCharacter.leader) 
			{
				_enemy.socketId = (this.enemies.filter(x => x.socketId < 1000).map(x => x.socketId).sort().slice(-1)[0] ?? 0) + 1;
				_enemy.station = mainCharacter.socketId;
				//_enemy.getNewStatus(1, 1);
			}
			if (_return)
				return _enemy;
		}
	}
	this.installMobs = function (_arr, _func) {
		if (!mainCharacter.leader && this.dungeon)
			return;
		if (this.mobs?.[0] || _arr)
			for (var _mob of _arr ?? this.mobs)
				this.installMob(_mob, _func);
	}
	this.road = _mapSprite.road;
	if (this.road)
		this.road.src = './images/texture/' + this.assetPath + '-road.png';
	const _tiles = _mapSprite.tiles ?? [];
	this.layers = [];
	for(let _tile of _tiles)
		for(var i = 1; i <= _tile.count; i++)
			this.layers.push({
				name: _tile.name,
				locate: {
					bottom: _tile.bottom,
					left: _tile.left ? _tile.left : 0// (i - 1) * _tile.width
				},
				marginTop: _tile.marginTop,
				marginLeft: _tile.marginLeft,
				left: _tile.left ? _tile.left : 0,
				bottom: _tile.bottom,
				foreground: _tile.foreground,
				rate: _tile.rate,
				zoom: _tile.zoom,
				width: _tile.width,
				height: _tile.height
			});
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
	if (this.layers)
		for (var _lay of this.layers)
			_lay.src = './images/texture/' + this.assetPath + '-' + _lay.name + '.png?z=' + _lay.zoom;
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
			const _clone = JSON.parse(JSON.stringify(_obj));
			let _src = _clone.src;
			if (!_clone.text && !_src)
				_clone.src = (_obj.id === 'artifact' ? './images/artifacts/' : './images/texture/') +
					(_obj.totalFrames > 1 ? this.assetPath + '-' + _obj.key + '.gif' :
					(_obj.id !== 'artifact' ? this.assetPath + _obj.key + '.png' : _obj.artifactId + '.png'));
			if (!_clone.totalFrames)
				_clone.totalFrames = 1;
			if (!_clone.zoom)
				_clone.zoom = 1;
			const _object = getObject(_clone, _obj.locate.left, _obj.locate.bottom);
			if (_obj.when)
				_object.when = _obj.when;
			_object.totalFrames = _clone.totalFrames;
			_object.speed = _clone.speed;
			_object.delay = _clone.delay;
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
	if (this.loadObjects) {
		const _objects = _mapSprite.objects ?? [];
		let _arr;
		if(this.artifacts?.length > 0)
			_arr = _objects.concat(this.artifacts);
		else
			_arr = _objects;
		for (var _obj of _arr)
			this.loadObject(_obj);
	}
	this.checkTowerResult = function(_timeIsUp, _diff) {
		let _end;
		if(mainCharacter.isDead()) {
			this.resultStars.forEach(x => x.failed = 1);
			_end = 1;
		}
		const _drawCount = this.enemies?.filter(x => x.enemy && x.class !== 'spell' && x.class !== 'object' && !x.remove)?.length ?? 0;
		const _enemyCount = this.enemies?.filter(x => x.enemy && x.class !== 'spell' && x.class !== 'object' && !x.isDead())?.length ?? 0;
		const _object = this.enemies?.find(x => x.enemy && x.class === 'object');
		if(_enemyCount === 0 && !this.pauseTime)
			this.pauseTime = msNow;
		if(_timeIsUp && _enemyCount > 0)
			this.resultStars[1].failed = _end = 1;
		const _t = __account.missions.find(x => x.key === 'tower');
		const _noObject = _t.current <= _t.max;
		if(_drawCount === 0 && !_object && !_noObject) {
			const _chest = {
				id: 4,
				count: 1,
				direction: 'right',
				minX: this.centerLeft,
				maxX: this.centerLeft,
				yPosition: groundHeight,
				attackAfterHit: true
			};
			const _respawner = episode.installMob(_chest, null, 1);
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
						objects: [{ 
							key:'respawn', 
							position: 'middle',
							scale: (_respawner.height * _respawner.zoom) / 100
						}],
						sound: { key: 'puff', volume: .3 },
						speed: 20,
						def: { iframe: true }
					}
				]
			};
			_respawner.animate('respawn', 1);
			_respawner.noLoot = 1;
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
		let _table = '<div class="flex full pvp-result-table tower-result"><div class="flex" style="width:100%;height:16vh;position:relative"><img src="./images/icons/reward-star.png" style="height:100%;position:absolute"' + (_fail ? ' class="gray"': '') + ' /><span style="z-index:2;margin-top:4.7vh;font-size:3.15vh!important;font-weight:600;text-shadow:0px 0px 1vh #000;color:' + (_fail ? 'crimson' : '#F4BB44') + ' !important">' + getLangData('Mission' + (_fail ? ' Failed' : ' Cleared')) + '</span></div><div style="width:100%;overflow-y:auto;height:calc(100% - 24vh)"><div style="width:100%" class="flex"><span>';
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
					_rewards.push(JSON.parse(JSON.stringify(_g)));
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
				_t.lastActivity = msNow;
				_client.saveState(1);
			}
			else 
				_needUpdateFirst = 1;
		}
		_table += `</div><div class="flex" style="width:100%;height:8vh">
			<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important;line-height:3vh !important" onclick="hideMyModalPopUp(1);reviveAtLobby()">${getLangData('QUIT')}</div>
			</div>
			<div class="${_fail ? 'd-none' : 'flex'}" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me${_needUpdateFirst ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important;line-height:3vh !important" onclick="trySwitchMap(${episode.id})">${getLangData('NEXT')}</div>
			</div>
			<div class="${_fail ? 'flex' : 'd-none'}" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important;line-height:3vh !important" onclick="trySwitchMap(${episode.id})">${getLangData('RETRY')}</div>
			</div>
		</div>`;
		pvpStatus.innerHTML = _table + '</div>';
		this.pvpEnded = true;
		switchAutoMode(1);
	}
	this.checkMapName = function () {
		if (!_mapSprite.coords.title || _mapSprite.gold || _mapSprite.tower || _mapSprite.pvp)
			return;
		if(!this.nameWriten) {
			this.nameWriten = msNow;
			pvpCounter = document.createElement('div');
			pvpCounter.className = 'flex animate-me-600 map-name countdown';
			pvpCounter.id = 'pvp-counter';
			pvpCounter.innerText = getLangData(_mapSprite.coords.title.split(' ')[0]);
			_gameUI.appendChild(pvpCounter);
		}
		else if((msNow - this.nameWriten) > 2399) {
			this.nameWriten *= 2;
			removeClass(pvpCounter, 'countdown');
		}
	}
	this.checkGoldResult = function(_timeIsUp, _diff) {
		let _end;
		let _fail = false;
		const _enemyCount = this.enemies?.filter(x => x.enemy && x.class != 'object' && !x.isDead())?.length ?? 0;
		if(_enemyCount === 0 && !this.pauseTime)
			this.pauseTime = msNow;
		const _t = __account.missions.find(x => x.key === 'gold');
		const _mission = _missions.find(x => x.key === 'gold').props.find(x => x.level === _t.level);
		let _goldGain = _mission.gold;
		const _en = this.enemies.find(x => x.enemy);
		if(_timeIsUp && _enemyCount > 0){
			_fail = _end = 1;
			const _hpAll = _en.getMaxHP() * _en.grade;
			const _hpLeft = (_en.getMaxHP() * _en.gradeLeft) + _en.health;
			_goldGain = MathRound(_goldGain * (_hpLeft / _hpAll));
		}
		if(!_en?.remove && !_end)
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
		if(!_fail)
			this.playSound({ key: 'victory', volume: .2 });
		else
			mainCharacter.immobilize = true;
		const _missionGain = _fail ? 0 : (!_diff ? 0 : _diff * 100);
		let _table = '<div class="flex full pvp-result-table tower-result"><div class="flex" style="width:100%;height:16vh;position:relative"><img src="./images/icons/reward-star.png" style="height:100%;position:absolute"' + (_fail ? ' class="gray"': '') + ' /><span style="margin-top:4.7vh;z-index:2;font-size:3.15vh !important;font-weight:600;text-shadow:0px 0px 1vh #000;color:' + (_fail ? 'crimson' : '#F4BB44') + ' !important">' + getLangData('Mission' + (_fail ? ' Failed' : ' Cleared')) + '!</span></div><div style="width:100%;overflow-y:auto;height:calc(100% - 24vh)"><div style="width:100%" class="flex"><span>';
		_table += `</span></div>`;
		let _reachedMax = false;
		_table += `<div class="flex" style="width:100%;padding:2vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Finish Rewards')}</div>`;
		_table += `<div class="flex" style="width:100%"><div class="flex flex-ai-end"><img style="width:5vh" src="./images/icons/gold.png" /><div style="font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">${_goldGain}x ${getLangData('Gold')}</div></div></div>`;
		if(!_fail)
			_table += `<div class="flex" style="width:100%;padding:2vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Mission Rewards')}</div>
				<div class="flex" style="width:100%"><div class="flex"><img style="width:5vh" src="./images/icons/coin.png" /><div style="font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">${_missionGain} ${getLangData('Gold')} (+Bonus)</div></div></div>`;
		//_t.current++;
		if(_mission.limit === _t.current)
			_reachedMax = 1;
		updateGold(_missionGain + _goldGain);
		_table += `</div><div class="flex" style="width:100%;height:8vh">
			<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onclick="hideMyModalPopUp(1);reviveAtLobby()">${getLangData('QUIT')}</div>
			</div>
			<div class="flex" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="game-menu-button btn-info full flex animate-me${_reachedMax ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onclick="trySwitchMap(${episode.id})">${getLangData('RETRY')}</div>
			</div>
		</div>`;
		pvpStatus.innerHTML = _table + '</div>';
		this.pvpEnded = true;
		switchAutoMode(1);
	}
	this.checkPVPResult = function () {
		if (this.pvpEnded || __switchingMap || this.disposing || (this.enemies?.length??0) < 2)
			return;
		let _end, _diff;
		if (!this.pvpStarted) {
			this.pvpStarted = msNow;
			this.missionCountDown = 1;
			pvpCounter = document.createElement('div');
			pvpCounter.className = 'flex animate-me countdown pop2';
			pvpCounter.id = 'pvp-counter';
			pvpCounter.innerHTML = this.tower ? '<span style="font-weight:600;color:crimson!important">FLOOR ' +__account.missions.find(x => x.key === 'tower').current + '</span>' : 3;
			if(!this.tower)
				this.playSound({ key: 'beep' });
			_gameUI.appendChild(pvpCounter);
		}
		else {
			const _baseTime = ((this.tower && (__account.missions.find(x => x.key === 'tower').current % 10) > 0) || this.gold) ? 60 : 120;
			_diff = (_baseTime + (this.tower ? 4 : 3)) - MathFloor(((this.pauseTime ?? msNow) - this.pvpStarted) / 1000);
			if (_diff < 10)
				addClass(pvpCounter, 'pvp-end-soon');
			if (_diff < 0) {
				_end = true;
				pvpCounter.innerText = 0;
			}
			if (_diff > _baseTime) {
				if (pvpCounter.innerText !== (_diff - _baseTime).toString()) {
					if((_diff - _baseTime) <= 3) {
						this.playSound({ key: 'beep' });
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
					this.playSound({ key: 'questaccepted' });
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
				}
				if (_diff >= 0)
					pvpCounter.innerText = _diff;
			}
		}
		if (pvpResult && (hasClass(pvpResult, 'show') || hasClass(pvpResult, 'loaded')))
			return;
		if(this.tower) {
			this.checkTowerResult(_end, _diff);
			return;
		}
		else if(this.gold) {
			this.checkGoldResult(_end, _diff);
			return;
		}
		if (mainCharacter.remove)
			reviveAsGhost();
		const _enemies = this.enemies?.filter(x => x.enemy && x.class !== 'spell' && x.class !== 'object' && !x.isDead() && !x.remove && !x.ghost);
		const _teamMates = this.enemies?.filter(x => (x.friendly || x.main) && x.class !== 'spell' && x.class !== 'object' && !x.isDead() && !x.remove && !x.ghost);
		const _deads = this.enemies?.filter(x => x.class !== 'spell' && x.class !== 'object' && x.killedBy);
		if(!this.war)
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
					warn('<div class="pvp-kill">' + _msg + (_killer.displayName ?? _killer.name) + '&nbsp;<span style="color:' + (_killer.enemy ? 'red' : 'blue') + ' !important">' + getLangData('killed') + '</span>&nbsp;' + (x.displayName ?? x.name) + '</div>', 'level-up', null, null, 1);
				}
				else
					return;
				if (!x.enemy) {
					const _avatar = document.getElementById('char-' + x.key);
					if (_avatar)
						addClass(_avatar, 'gray');
				}
			});
		const _eCount = _enemies?.length ?? 0;
		const _tCount = _teamMates?.length ?? 0;
		if (_eCount === 0 || _tCount === 0 || _end) {
			if (!pvpResult)
				pvpResult = document.getElementById('pvp-result');
			if (!pvpStatus)
				pvpStatus = document.getElementById('pvp-status');
			showMyModalPopUp('pvp-result');
			this.pauseAmbianceMusic();
			let _status = (_eCount > 0 && _tCount > 0) ? 1 : (_tCount > 0 ? 2 : 0);
			let _table = '<div class="flex full pvp-result-table arena-result"><div class="flex" style="width:100%;height:16vh;position:relative"><img src="./images/icons/reward-star.png" style="height:100%;position:absolute"' + (!_status ? ' class="gray"': '') + ' /><span style="margin-top:4.7vh;z-index:2;font-size:3.15vh !important;font-weight:600;text-shadow:0px 0px 1vh #000;color:' + (!_status ? 'crimson' : '#F4BB44') + ' !important">' + getLangData(!_status ? 'Defeat' : (_status > 1 ? 'Victory' : 'Draw')) + '</span></div><div class="flex" style="flex-direction:column;justify-content:space-between;width:100%;overflow-y:auto;height:calc(100% - 24vh)"><div style="width:80%" class="flex">';
			switch(_status) {
				case 2: 
					_table += `<div class="pvp-player-item pvp-winner flex"><div class="pvp-player-item-left flex">
						${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
						<div class="pvp-player-item pvp-looser flex"><div class="pvp-player-item-left flex">
						Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/dead.png" /></div></div>`;
					break;
				case 1: 
					_table += `<div class="pvp-player-item pvp-draw flex"><div class="pvp-player-item-left flex">
						${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
						<div class="pvp-player-item pvp-draw flex"><div class="pvp-player-item-left flex">
						Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>`;
					break;
				case 0: 
					_table += `<div class="pvp-player-item pvp-winner flex"><div class="pvp-player-item-left flex">
						Player</div><div class="pvp-player-item-right flex"><img src="./images/icons/kill.png" /></div></div>
						<div class="pvp-player-item pvp-looser flex"><div class="pvp-player-item-left flex">
						${__account.name}</div><div class="pvp-player-item-right flex"><img src="./images/icons/dead.png" /></div></div>`;
				break;
			}
			_table + `</div>`;
			if(_status > 1) {
				__account.pvp.honor++;
				_client.saveState();
				this.playSound({ key: 'victory', volume: .2 });
				_table += `<div class="flex" style="width:100%;padding:2vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Duel Rewards')}</div>
					<div class="flex" style="width:100%"><div class="flex"><img style="width:5vh" src="./images/icons/honor.png" /><div style="font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">+1 ${getLangData('Honor Point')}</div></div></div>`;
			}
			_table += `</div><div class="flex" style="width:100%;height:8vh">
				<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
					<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onclick="hideMyModalPopUp(1);reviveAtLobby()">${getLangData('QUIT')}</div>
				</div>
				<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
					<div class="game-menu-button btn-info full flex animate-me${!__account.pvp.duelCount ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onclick="hideMyModalPopUp(1);reviveAtLobby(null, function() { showMyModalPopUp('game-menu');switchBookPage(10); })">${getLangData('BACK')}</div>
				</div>
			</div>`;
			pvpStatus.innerHTML =  _table;
			
			
			// let _table = '<div class="flex pvp-result-table">';
			// const _reds = this.enemies?.filter(x => x.enemy && x.class !== 'spell' && x.class !== 'object' && x.class !== 'minion').sort((a, b) => b.calculatePVPScore() - a.calculatePVPScore());
			// const _blues = this.enemies?.filter(x => (x.friendly || x.main) && x.class !== 'spell' && x.class !== 'object' && x.class !== 'minion').sort((a, b) => b.calculatePVPScore() - a.calculatePVPScore());
			// _table += '<div class="flex" style="width:100%;padding:2% 0">';
			// _table += '<div style="width:25%" class="flex"><img style="max-width:90%;max-height:90%" src="./images/icons/flag-blue.png"/></div>';
			// _table += '<div style="width:75%" class="flex flex-ai-start"><div class="flex" style="width:100%;padding:2%"><div style="width:60%"></div><div style="width:20%" class="flex"><img src="./images/icons/kill.png" style="width:3vw; border-radius:100%;border:2px solid #f8f8f8" /></div><div style="width:20%" class="flex"><img src="./images/icons/dead.png" style="width:3vw; border-radius:100%;border:2px solid #f8f8f8" /></div></div>';
			// let _i = 0, _isArena = _reds?.length === 1;
			// for (var _b of _blues) {
			// 	_table += '<div class="flex' + ((!_isArena && _i === 0) ? ' mvp' : '') + '" style="padding:2%;width:100%' + ((_i % 2) === 0 ? ';background:#00000040' : '') + '"><div style="width:60%" class="flex flex-jc-start"><span style="color:' + _b.color + '!important;font-size:2.6vh !important">&#9654;&nbsp;</span>' + (_b.displayName ?? _b.name) + '</div><div style="width:20%" class="flex">' + (_b.killCount ?? 0) + '</div><div style="width:20%" class="flex">' + (_b.isDead() ? 1 : 0) + '</div></div>';
			// 	_i++;
			// }
			// _table += '</div>';
			// _table += '<div class="flex" style="width:100%;padding:2% 0"><div style="width:25%" class="flex"><img style="max-width:90%;max-height:90%" src="./images/icons/flag-red.png"/></div><div style="width:75%" class="flex flex-ai-start"><div class="flex" style="width:100%;padding:2%"><div style="width:60%"></div><div style="width:20%" class="flex"></div><div style="width:20%" class="flex"></div></div>';
			// _i = 0;
			// for (var _r of _reds) {
			// 	_table += '<div class="flex' + ((!_isArena && _i === 0) ? ' mvp' : '') + '" style="padding:2%;width:100%' + ((_i % 2) === 0 ? ';background:#00000040' : '') + '"><div style="width:60%" class="flex flex-jc-start"><span style="color:' + _r.color + '!important;font-size:2.6vh !important">&#9654;&nbsp;</span>' + (_r.displayName ?? _r.name) + '</div><div style="width:20%" class="flex">' + (_r.killCount ?? 0) + '</div><div style="width:20%" class="flex">' + (_r.isDead() ? 1 : 0) + '</div></div>';
			// 	_i++;
			// }
			// _table += '</div>';
			// _table += '</div>';
			// _table += `<div style="width:100%" class="flex"><div style="flex:1" class="flex">
			// 	<div class="game-btn flex" onclick="restartPvp()">RESTART</div>
			// </div>
			// <div style="flex:1" class="flex">
			// 	<div class="game-btn flex" onclick="ral()">QUIT</div>
			// </div></div>`;
			// if (_tCount === 0)
			// 	pvpStatus.innerHTML = '<div class="flex" style="color:red !important">DEFEAT</div>' + _table;
			// else if (_eCount === 0)
			// 	pvpStatus.innerHTML = '<div class="flex" style="color:darkgoldenrod !important">VICTORY</div>' + _table;
			// else
			// 	pvpStatus.innerHTML = '<div class="flex">DRAW</div>' + _table;


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
	this.checkRespawn = function() {
		if(!this.respawners?.[0])
			return;
		for(let i = 0; i < this.respawners.length; i++)
		{
			const _mob = this.respawners[i];
			if((_mob.date + _mob.ms) < msNow) {
				let _respawner = this.installMob(
					this.mobs.find(x => x.id === _mob.id),
					null, 1, 1
				);
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
								spriteHeight: _respawner.getHeight(),
								objects: [{ 
									key:'respawn', 
									position: 'middle',
									scale: (_respawner.zoom * _respawner.height) / 100
								}],
								sound: { key: 'puff', volume: .3 },
								speed: 20,
								def: { iframe: true }
							}
						]
					};
				//_respawner.addObject({ key: 'respawn', position: 'around' });
				_respawner.animate('respawn', 1);
				return;
			}
		}
	}
	this.drawEnemies = function (_queue) {
		//const rect = getVisibleRectangle();
		if(this.disposing)
			return;
		this.checkRespawn();
		this.enemies?.filter(x => x.unseen && x.class !== 'boss' && x.healthBarDrawn)?.forEach(x => episode.hideHealthBar(x));
		if(this.enemies?.find(x => x.related?.dead))
			this.enemies = this.enemies.filter(x => !x.related?.dead);
		let sprites = this.enemies?.filter(x => !x.main && !x.remove);
		if (sprites?.[0])
			for (var sprite of sprites) {
				sprite.unseen = (((sprite.getScreenLeft() - sprite.getOriginDistance()) + sprite.getWidth()) < 0 ||
					(sprite.getScreenLeft() - sprite.getOriginDistance()) > _canvas.width);
				if (sprite.autoMode > 0)
					sprite.started = true;
				else if (sprite.autoMode === 0 && sprite.dmgTaken)
					sprite.started = true;
				if (!sprite.located && sprite.animations.run)
					sprite.located = true;
				if (!episode.end || (episode.end && sprite.class !== 'spell'))
					if (!sprite.unseen || sprite.started || sprite.station || (this.pvp || this.dungeon))
						sprite.draw(_queue);
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
	this.drawLayers7 = function () {
		if(this.disposing || __batterySaveMode)
			return;
		let i = 0;
		for (let _lay of this.layers) {
			let _c;// = _lay.foreground ? c9 : (_lay.rate == .9 ? c90 : (_lay.rate == .85 ? c85 : (_lay.rate == .5 ? c50 : c3)));
			if(_lay.rate == .85)
				_c = c85;
			else if(_lay.rate == .9)
				_c = c90;
			else if(_lay.rate <= .5)
				_c = c50;
			else
				_c = c3;
			// else
			// switch(i) {
			// 	case 0:
			// 		_c = c50;
			// 		break;
			// 	case 1:
			// 		_c = c85;
			// 		break;
			// 	case 2:
			// 		_c = c90;
			// 		break;
			// 	case 3:
			// 		_c = c3;
			// 		break;
			// 	case 4:
			// 		_c = c9;
			// 		break;
			// }
			const p = MathRound(platformX * (_lay.rate ?? 1));
			if(!this.layersDrawn)
			{
				const _img = getExistingImage(_lay.src);
				if(!_img)
					return;
				if(_lay.marginTop)
					_img.image.style.top = _lay.marginTop;
				if(_lay.marginLeft)
					_img.image.style.left = _lay.marginLeft;
				if(_lay.marginTop || _lay.marginLeft)
					_img.image.style.position = 'absolute';
				_c.appendChild(_img.image);
			}	
			_c.style.transform = 'translate3d(-' + p + 'px,0,0)';
			_c.style.setProperty('-webkit-transform', _c.style.transform);
			i++;
		}
		if(!this.layersDrawn)
			this.layersDrawn = 1;
	}
	this.drawSpriteObjects2 = function (_forceId, _reset) {
		if(this.disposing)
			return;
		let sprites = this.sprites?.filter(x => (x.totalFrames > 1 || x.npc) && !x.remove);
		if (_forceId)
			sprites = sprites.filter(x => x.animation.id === _forceId);
		if (sprites?.[0]) {
			if (!this.spritesDrawnForeGround || _forceId || _reset) {
				for (var sprite of sprites) {
					let _unseen = false; //true;
					// if((platformX < sprite.left && (platformX + _canvas.width) > sprite.left) || 
					// (platformX < (sprite.left + sprite.width) && (platformX + _canvas.width) > (sprite.left + sprite.width)))	
					// 	_unseen = false;
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
				_canvasS.style.transform = 'translate3d(-' + platformX + 'px,0,0)';
				_canvasS.style.setProperty('-webkit-transform', _canvasS.style.transform);
			}
			cc.style.transform = 'translate3d(-' + platformX + 'px,0,0)';
			cc.style.setProperty('-webkit-transform', cc.style.transform);
		}
		return false;
	}
	this.spritesDrawnBackGround = false, this.spritesDrawnForeGround = false;
	this.drawSpriteObjects = function (_forceId) {
		return this.drawSpriteObjects2(_forceId);
	}
	this.createBgMusic = function(_path, _start, _end) {
		if(!this.bgMusic)
			this.bgMusic = (_path && _path.indexOf('.') === -1) ? getSound(null, _path) :
		new Audio(_path ?? './images/music/' + getRandomValue(1, 13) + '.mp3');
		if(_start)
			this.bgMusic.oncanplay = function() {
				_start();
			}
		if(_end)
			this.bgMusic.onended = function() {
				_end();
			}
	}
	this.playBgMusic = function (_once) {
		if(!_once)
			return;
		if(!__account.options.ambiance || this.tower || !this.bgMusic)
			return;
		if(__batterySaveMode) {
			this.pauseBgMusic();
			return;
		}
		if(this.bgMusic && !this.bgMusic.paused){
			if((msNow - this.bgMusic.startTime) > 10000) {
				this.bgMusic.playbackRate = parseFloat((this.bgMusic.playbackRate + .025).toFixed(2));
				if(this.bgMusic.playbackRate > 1.25)
					this.bgMusic.playbackRate = 1.25;
				this.bgMusic.startTime = msNow;
			}
			return;
		}
		if(this.bgMusic?.playRequestSent)
			return;
		try {
			this.bgMusic.volume = .01;
			this.bgMusic.crossOrigin = 'anonymous';
			if(!_once)
				this.bgMusic.loop = true;
			this.bgMusic.playbackRate = 1;
			this.bgMusic.play();
			this.bgMusic.playRequestSent = 1;
			this.bgMusic.startTime = msNow;
			if(this.bgMusicTimer) {
				clearInterval(episode.bgMusicTimer);
				delete episode.bgMusicTimer;
			}
			this.bgMusicTimer = setInterval(function() {
				console.log('timeup');
				if(!episode.bgMusic || episode.bgMusic.volume >= .1) {
					episode.bgMusic.volume = .1;
					clearInterval(episode.bgMusicTimer);
					delete episode.bgMusicTimer;
					return;
				}
				episode.bgMusic.volume += .01;
			}, 100);
		} catch (e) {

		}
	}
	this.pauseBgMusic = function () {
		if(!this.bgMusic || this.bgMusicTimer)
			return;
		if(this.bgMusic && this.bgMusic.paused)
			return;
		try {
			this.bgMusic.volume = .1;
			if(this.bgMusicTimer) {
				clearInterval(episode.bgMusicTimer);
				delete episode.bgMusicTimer;
			}
			this.bgMusicTimer = setInterval(function() {
				console.log('timedown');
				if(!episode.bgMusic || episode.bgMusic.volume <= .01) {
					clearInterval(episode.bgMusicTimer);
					delete episode.bgMusicTimer;
					episode.bgMusic.pause();
					delete episode.bgMusic.playRequestSent;
					return;
				}
				episode.bgMusic.volume -= .01;
			}, 100);
		} catch (e) {

		}
	}
	this.pauseAmbianceMusic = function() {
		if(this.bgSound)
			this.bgSound.pause();
	}
	this.resumeAmbianceMusic = function() {
		if(!__account.options.ambiance)
			return;
		if(this.bgSound && this.bgSound.paused)
			this.bgSound.play();
	}
	this.playAmbianceMusic = function (_src) {
		if(!__account.cs)
			return;
		if(!_src)
			_src = this.dungeon ? 'dungeon' : this.theme.replace(/\d+/, '');
		if(!__account.options.ambiance || __batterySaveMode)
			return;
		try {
			const _sound = getSound(null, _src, 1);
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

		}
	}
	this.playSound = function (_s, _alternateKeys, _volumeRate) {
		if(!__account.options.sound || __batterySaveMode || __switchingMap)
			return undefined;
		let _soundKey = _s.key;
		if (_alternateKeys && !soundFiles[_soundKey])
			for (var _ak of _alternateKeys)
				if (soundFiles[_ak]) {
					_soundKey = _ak;
					break;
				}
		if(_soundKey && _soundKey.indexOf(',') !== -1) {
			var _keys = _soundKey.split(',');
			_soundKey = _keys[getRandomValue(0, _keys.length - 1)];
		}
		try {
			if (!soundFiles[_soundKey] && _alternateKeys?.[0]?.indexOf && _alternateKeys[0].indexOf(',') >= 0)
			{
				var _keys = _alternateKeys[0].split(',');
				_soundKey = _keys[getRandomValue(0, _keys.length - 1)];
			}
		}
		catch(cex) {
			console.log(_alternateKeys);
		}
		let _sound = getSound(null, _soundKey);
		let _play;
		if(!_sound && _s.path){
			_sound = getSound(_s.path);
			_play = true;
		}
		if (_sound && (_sound.paused || _sound.currentTime > 0 || _play)) {
			_sound.volume = (_volumeRate ?? 1) * (_s.volume ?? .1);
			if (_s.loop)
				_sound.loop = true;
			let _speed = _s.speed;
			const _fps = _s.owner ? _s.owner.getFps() : 1;
			if (_s.owner && _fps !== 1)
				_speed = (_speed ?? 1) / _fps;
			if (_speed && _speed !== 1)
				_sound.playbackRate = _speed < 1 ? .5 : 2;
			_sound.key = _soundKey;
			_sound.crossOrigin = 'anonymous';
			if (_sound.currentTime > 0 && !_sound.paused && (_s.reset && (_soundKey === _sound.key))) {
				_sound.currentTime = 0;
				_sound.pause();
			}
			if (_sound.currentTime === 0 || _sound.paused)
				try {
					_sound.play();
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
			return;
		if((platformX < _rel.left && (platformX + _canvas.width) > _rel.left) || 
				(platformX < (_rel.left + (_rel.maxWidth ?? _rel.width)) && (platformX + _canvas.width) > (_rel.left + (_rel.maxWidth ?? _rel.width))))	
		{
			if (!_rel.frames || this.disposing || _rel.remove)
				return;
			if (_rel.start === undefined)
				_rel.start = 0;
			if (_rel.frame === undefined)
				_rel.frame = 0;
			let _f = _rel.frames[_rel.frame];
			if ((_rel.start % _f.speed) === 0) {
				//_canvasS.clearRect(0, 0, _c.width, _c.height);
					//  _c.width, 
					//  _c.height);
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
				}
				if(_rel.rotate)
					_cNPC.restore();
		}
	}
	this.drawQuestNavIcon = function () {
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
				let _side = 'left';
				// if (((_closestSide % 2) === 0) && _closestSide < episode.id && ((episode.id % 2) === 0))
				// 	_side = 'left';
				// else 
				if (((_closestSide % 2) === 1) && _closestSide > episode.id)
					_side = 'right';
				if (_side === 'left') {
					addClass(_nav, 'left');
					removeClass(_nav, 'right');
				}
				else {
					addClass(_nav, 'right');
					removeClass(_nav, 'left');
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
		const sprites =  _sprite ? [_sprite] : this.sprites?.filter(x => x.frames && x.npc);
		if (sprites?.[0]) {
			if(!_sprite) {
				const _nodes = document.querySelectorAll('.quest-sign');
				for (var _node of _nodes)
					_node.remove();
			}
			const _quest = _npcQuests.find(x => x.id === __account.questStatus.order);
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
					_status = _quest.minLevel > (__account.characters.find(x => x.class === mainCharacter.class).level ?? 1) ? 1 : 2;
					break;
			}
			for (var sprite of sprites) {
				if (sprite.animation.id !== _quest.owner)
					continue;
				const _id =_sprite.animation.id + '-quest-mark';
				let _imgQuest = document.getElementById(_id);
				if(_imgQuest && _unseen)
						addClass(_imgQuest, 'd-none');
				if(!_unseen){
					if(!_imgQuest) {
						const _w = MathRound(sprite.width);
						const _l = MathRound(sprite.left);
						const _t = MathRound(sprite.top);
						const _c = sprite.rate == .9 ? _canvasAnimated90 : cc;
						_imgQuest = document.createElement('img');
						_imgQuest.id = _id;
						const _questMarkHeight = MathRound(_canvas.height / 16);
						const _left = MathRound(_l + (((_w - (sprite.rightGap ?? 0)) - _questMarkHeight) / 2));
						_imgQuest.left = _left;
						_imgQuest.oldStatus = _status;
						_imgQuest.src = "./images/icons/quest-" + (_status < 3 ? 'start' : 'progress') + ".png";
						_imgQuest.style.left = _left + 'px';
						_imgQuest.style.height = _imgQuest.style.width = _questMarkHeight + 'px';
						_imgQuest.style.top = MathRound(_t - (sprite.topGap ?? 0)) + 'px';
						_imgQuest.style.position = 'absolute';
						_imgQuest.className = 'quest-sign';
						if ((_status % 2) === 0)
							_imgQuest.className += ' glow-dark';
						else
							_imgQuest.className += ' gray';
						_c.appendChild(_imgQuest);
					}
					else
					{
						if(_imgQuest.oldStatus !== _status) {
							_imgQuest.src = "./images/icons/quest-" + (_status < 3 ? 'start' : 'progress') + ".png";
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
	this.resetSideQuests = function (_sprite, _unseen) {
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
						const _questMarkHeight = MathRound(_canvas.height / 16);
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
		c6.clearRect(0, 0, _canvas.clientWidth, _canvas.clientHeight);
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
	this.isSameCoords = function (_item1, _item2) {
		return _item1.sprite.src === _item2.sprite.src &&
			_item1.spriteX === _item2.spriteX &&
			_item1.spriteY === _item2.spriteY &&
			_item1.spriteWidth === _item2.spriteWidth &&
			_item1.spriteHeight === _item2.spriteHeight &&
			_item1.reversed === _item2.reversed &&
			_item1.left === _item2.left &&
			_item1.top === _item2.top &&
			_item1.width === _item2.width &&
			_item1.height === _item2.height;
	}
	this.hurtSprites = [];
	this.colorizeSprite = function(_item) {
		const _color = _item.skinColor ?? _item.char.hurtColor ?? 'white';
		const _sprite = this.hurtSprites.find(x => x.animation === _item.char.animation &&
			x.id === _item.char.id && x.color === _color
		)?.image;
		if(_sprite)
			return _sprite;
		const _osc = document.createElement('canvas');
		_osc.width = MathRound(_item.width * (_item.zoom ?? 1));
		_osc.height = MathRound(_item.height * (_item.zoom ?? 1));
		const _osContext = _osc.getContext('2d');
		_osContext.drawImage(_item.sprite, 
			_item.spriteX, 
			_item.spriteY,
			_item.spriteWidth, 
			_item.spriteHeight,
			0, 0, _osc.width, _osc.height);
		_osContext.globalCompositeOperation = 'source-atop';
		_osContext.fillStyle = _color;
		if(_item.char.hurting?.count <= 0 && _item.char.hurtColor)
			delete _item.char.hurtColor;
		_osContext.fillRect(0, 0, _osc.width, _osc.height);
		this.hurtSprites.push({
			image: _osc,
			id: _item.char.id,
			animation: _item.char.animation,
			color: _color
		});
		return _osc;
	}
	this.drawCharacterQueue = function (_queue) {
		if (this.disposing || !_queue?.[0])
			return;
		_queue = _queue.sort(function (a, b) {
			const ya = a.char?.yPosition ?? 0;
			const yb = b.char?.yPosition ?? 0;
			if (MathAbs(ya - yb) < (8 * __zoom)) {
				if (a.drawPriority < b.drawPriority)
					return 1;
				else if (a.drawPriority > b.drawPriority)
					return -1;
				return (a.char.drawOrder ?? 0) - (b.char.drawOrder ?? 0);
			}
			else {
				if (yb < ya)
					return -1;
				else if (yb > ya)
					return 1;
			}
		});
		c10.clearRect(0, 0, _canvas.clientWidth, _canvas.clientHeight);
		// if(!_cNPC.cleared)
		// 	_cNPC.clearRect(0, 0, _canvas.clientWidth, _canvas.clientHeight);
		if(__account.options.gore)
			cGore.clearRect(0, 0, _canvasGore.width, _canvasGore.height);
		if(__account.options.effect)
			cShadow.clearRect(0, 0, _canvasShadow.width, _canvasShadow.height);
		let _hasShadow, _hasDmg;
		 for (var _item of _queue) {
		 	if (!_hasShadow && _item.shadow)
		 		_hasShadow = true;
			if(!_hasDmg && (_item.char.hurting?.count > 0 || _item.skinColor))
				_hasDmg = true;
			if (_item.char?.shadow && !_item.char.unseen && !_item.unseen) {
				const _rel = _item.char.shadow;
				const _relZoom = _item.char.getWidth() / (_rel.width);
				//const _relHeightZoom = (_item.char.yGap * 1.6) / (_rel.height);
				const _shadowHeight = _item.char.getZoom() * (_item.char.yGap < 5 ? 8 : _item.char.yGap) * 3;
				//const _diff = MathAbs((_item.char.getWidth() - _item.char.getOriginDistance()) - _item.char.getOriginDistance());
				if(!__batterySaveMode)
				c10.drawImage(getImage('./images/related/shadow3.png'), _rel.left ?? 0, _rel.top ?? 0, _rel.width, _rel.height,
					_item.char.getLeft(),
					MathRound(_canvas.height - _item.char.yPosition - (_item.char.yGap < 5 ? _shadowHeight / 2 : ((_shadowHeight * 3) / 4))),
					parseInt(_rel.width * _relZoom), parseInt(_shadowHeight));
			}
		}
		let i = 0;
		if(__account.options.effect) {
			if (_hasShadow) {
				cRage.reversed = false;
				cRage.clearRect(0, 0, _canvasRage.width, _canvasRage.height);
				addClass(_canvasRage, 'rage-me');
				cRage.drawn = true;
			}
			else {
				removeClass(_canvasRage, 'rage-me');
				if (cRage.drawn) {
					cRage.clearRect(0, 0, _canvasRage.width, _canvasRage.height);
					cRage.drawn = false;
				}
			}
		}
		if (_hasDmg) {
			cHurt.reversed = false;
			cHurt.clearRect(0, 0, _canvasHurt.width, _canvasHurt.height);
			cHurt.drawn = true;
		}
		else {
			if (cHurt.drawn) {
				cHurt.clearRect(0, 0, _canvasHurt.width, _canvasHurt.height);
				cHurt.drawn = false;
			}
		}
		c10.reversed = cShadow.reversed = cGore.reversed = _cNPC.cleared = false;
		for (var _item of _queue) {
			if (_item.char.remove)
				continue;
			this.drawRelatedObjects(_item, function (x) { return x.background });
			this.drawGoreObjects(_item);
			if (!_item.char.unseen && !_item.unseen && !_item.alpha) {
				if (_item.reversed) {
					if (!c10.reversed) {
						c10.reversed = true;
						c10.save();
						c10.scale(-1, 1);
					}
				}
				else {
					if (c10.reversed) {
						c10.reversed = false;
						c10.restore();
					}
				}
			}
			++i;
			_item.char.drawOrder = i;
			if (!_item.char.main && platformX)
				_item.left -= platformX;
			let _hurt = _item.char.hurting?.count > 0;
			if(_hurt && !_item.char.animations[_item.char.animation]?.hurt) {
				_hurt = false;
				_item.char.hurting.count = 0;
			}
			const _flash = _hurt && (!_item.char.lastHurtTime || (msNow - _item.char.lastHurtTime) > 200);
			let _shadowItems = [], cs;
			if((_hurt && _flash) || _item.skinColor)
			{
				cs = cHurt;
				if (_item.reversed && !cs.reversed) {
					cs.save();
					cs.scale(-1, 1);
					cs.reversed = true;
				}
				else if (!_item.reversed && cs.reversed) {
					cs.restore();
					cs.reversed = false;
				}
			}
			else if (__account.options.effect && (_item.shadow || _item.char.shadowData?.length > 0) && !_item.char.unseen && !_hurt) {
				cs = _item.shadow && !_item.char.invisible ? cShadow : cShadow;
				if (_item.reversed && !cs.reversed) {
					cs.save();
					cs.scale(-1, 1);
					cs.reversed = true;
				}
				else if (!_item.reversed && cs.reversed) {
					cs.restore();
					cs.reversed = false;
				}
				for (var shadowindex = 0; shadowindex < (_item.char.shadowData?.length ?? 1); shadowindex++) {
					if ((shadowindex % 2) === 1)
						continue;
					_shadowItems.push(_item.char.shadowData?.[shadowindex] ?? _item);
					// cs.drawImage(_shadowItem.sprite, _shadowItem.spriteX, _shadowItem.spriteY,
					// 	_shadowItem.spriteWidth, _shadowItem.spriteHeight,
					// 	MathRound(_shadowItem.reversed ? (-1 * _shadowItem.left) + (platformX - (_shadowItem.platformX ?? platformX))
					// 		: _shadowItem.left - (platformX - (_shadowItem.platformX ?? platformX))), MathRound(_shadowItem.top), _shadowItem.width,
					// 	_shadowItem.height);
				}
			}
			if (_hurt){
				_item.char.hurting.count--;
				if(_item.char.hurting.count <= 0)
					_item.char.lastHurtTime = msNow;
			}
			if (!_item.char.unseen && !_item.unseen && !_item.alpha) {
				if(_item.char.release || _item.char.animation === 'release' || _item.char.buffs?.find(x => x.key === 'release')) {
					if(!_item.char.releaseCount)
						_item.char.releaseCount = 0;
					_item.char.releaseCount++;
				}
				else if(_item.char.releaseCount)
					delete _item.char.releaseCount;
				if(!_item.char.releaseCount || ((_item.char.releaseCount % 8) < 4)) {
					const _wDiff = (c10.reversed ? -1 : 1) * ((_item.width - (_item.width * (_item.zoom ?? 1))) / 2);
					const _hDiff = (_item.height - (_item.height * (_item.zoom ?? 1)));
					if(!__batterySaveMode) {
						let _shadowItemOrder = 95;
						for(let _shadowItem of _shadowItems) {
							if(_shadowItemOrder > 255)
								break;
							cShadow.globalCompositeOperation = "source-over";
							cShadow.drawImage(_shadowItem.sprite, _shadowItem.spriteX, _shadowItem.spriteY,
								_shadowItem.spriteWidth, _shadowItem.spriteHeight,
								MathRound(_shadowItem.reversed ? (-1 * _shadowItem.left) + (platformX - (_shadowItem.platformX ?? platformX))
									: _shadowItem.left - (platformX - (_shadowItem.platformX ?? platformX))), 
									MathRound(_shadowItem.top), 
									_shadowItem.width,
								_shadowItem.height);
							cShadow.globalCompositeOperation = "source-atop";
							cShadow.fillStyle = '#000000' + _shadowItemOrder.toString(16);
							_shadowItemOrder += 40;
							cShadow.fillRect(
								MathRound(_shadowItem.reversed ? (-1 * _shadowItem.left) + (platformX - (_shadowItem.platformX ?? platformX))
									: _shadowItem.left - (platformX - (_shadowItem.platformX ?? platformX))), 
									MathRound(_shadowItem.top), 
									_shadowItem.width,
								_shadowItem.height);
						}
						const _rotate = _item.char.animations ?  _item.char.animations[_item.char?.animation]?.rotate : null;
						if(_rotate) {
							c10.translate(MathRound(c10.reversed ? -1 * (_item.left + _wDiff - (_item.width / 2)) : (_item.left + _wDiff + (_item.width / 2))), 
							MathRound(_item.top + _hDiff + (_item.height / 2)));  
							c10.rotate(_rotate);  
						}
						//this.drawCharacter(c10, _item);
						if(((_hurt && _flash) || _item.skinColor) && (_item.char.frame + _item.char.start) > 0) {
							const _hurtSprite = this.colorizeSprite(_item);
							c10.drawImage(_hurtSprite,
								MathRound(c10.reversed ? -1 * (_item.left + _wDiff) : (_item.left + _wDiff)), 
								MathRound(_item.top + _hDiff));
						}
						else
							c10.drawImage(_item.sprite, _item.spriteX, _item.spriteY,
								_item.spriteWidth, _item.spriteHeight,
								MathRound(c10.reversed ? -1 * (_item.left + _wDiff) : (_item.left + _wDiff)), 
								MathRound(_item.top + _hDiff), 
								MathRound(_item.width * (_item.zoom ?? 1)),
								MathRound(_item.height * (_item.zoom ?? 1)));
						if(_item.char.text)
						{
							let _restored;
							if (c10.reversed) {
								c10.restore();
								_restored = 1;
							}
							const _text = getLangData(_item.char.text.value).toLocaleUpperCase(getLang());
							c10.font = "bold 3vh immortal";
							c10.fillStyle = "#1B1212";
							c10.textAlign = 'center';
							c10.fillText(_text, 
								MathRound((_item.left + _wDiff - (_item.char.getZoom() * _item.char.text.left))), 
								MathRound(_item.top + _hDiff + (_item.char.getZoom() * _item.char.text.top)));
							if(_restored) {
								c10.save();
								c10.scale(-1, 1);
							}				
						}
						if(_rotate) { 
							c10.rotate(-_rotate);  
							c10.translate(-1 * MathRound(c10.reversed ? -1 * (_item.left + _wDiff - (_item.width / 2)) : (_item.left + _wDiff + (_item.width / 2))), 
							-1 * MathRound(_item.top + _hDiff + (_item.height / 2)));  
						}
					}
				}
			}
			if (!_item.char.friendly)
				this.drawHealthBar(_item);
			this.checkBubbleText(_item.char);
			if (_item.char.chargeProperties && (_item.char.class === 'boss' || _item.char.alp)) {
				if (!_item.char.shadowData)
					_item.char.shadowData = [];
				else if (_item.char.shadowData.length > (_item.char.chargeProperties ? 5 : (_item.char.class === 'boss' ? 3 : 1)))
					_item.char.shadowData.splice(0, 1);
				_item.platformX = platformX;
				_item.char.shadowData.push(_item);
			}
			else if(_item.char.shadowData?.length > 0) {
				_item.char.shadowData.splice(0, 1);
				if(_item.char.shadowData?.length === 0)
					_item.char.shadowData = undefined;
			}
			this.drawRelatedObjects(_item, function (x) { return !x.background });
		}
		if (c10.reversed)
			c10.restore();
		if(cHurt.reversed)
			cHurt.restore();
		if (__account.options.gore && cGore.reversed)
			cGore.restore();
		if(__account.options.effect) {
			if (cShadow.reversed)
				cShadow.restore();
			if (cRage.reversed && _hasShadow)
				cRage.restore();
		}
	}
	this.drawCharacter = function(_can, _item) {
		const _wDiff = (_can.reversed ? -1 : 1) * ((_item.width - (_item.width * (_item.zoom ?? 1))) / 2);
		const _hDiff = (_item.height - (_item.height * (_item.zoom ?? 1)));
		const _left = MathRound(_can.reversed ? -1 * (_item.left + _wDiff) : (_item.left + _wDiff));
		const _top = MathRound(_item.top + _hDiff);
		const _width = MathRound(_item.width * (_item.zoom ?? 1));
		const _height =	MathRound(_item.height * (_item.zoom ?? 1));
		if(!this.characterSprites)
			this.characterSprites = [];
		const _anim = _item.char.animation;
		const _frame = _item.char.frame;
		const _sprite = this.characterSprites.find(x => 
			x.animation === _anim && 
			x.frame === _frame && 
			x.width === _width &&
			x.height === _height
		);
		if(!_sprite?.img) {
			_can.drawImage(_item.sprite, _item.spriteX, _item.spriteY,
				_item.spriteWidth, _item.spriteHeight, _left, _top, _width, _height);
			if(!this.characterCanvas)
				this.characterCanvas = document.createElement('canvas');
			this.characterCanvas.width = _width;
			this.characterCanvas.height = _height;
			const characterCanvasContext = this.characterCanvas.getContext('2d');
			characterCanvasContext.clearRect(0, 0, _width, _height);
			characterCanvasContext.drawImage(_item.sprite, _item.spriteX, _item.spriteY,
				_item.spriteWidth, _item.spriteHeight, 0, 0, _width, _height);
			this.characterCanvas.toBlob((blob) => {
				let img = new Image();
				img.onload = function() {
					episode.characterSprites.push({
						width: _width,
						height: _height,
						animation: _anim,
						frame: _frame,
						img: this
					});
				}
				img.src = URL.createObjectURL(blob);
			});
		}
		else
			_can.drawImage(_sprite.img, _left, _top);
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
			_char.buffContainer.innerHTML = '';
			const _arr = this.sortBuffs(_char.buffs);
			for (var _buff of _arr) {
				const _buffItem = document.createElement('img');
				_buffItem.src = './images/buff/icons/' + _buff.key + '.png';
				_buffItem.className = (_allBuffs[_buff.key].gain ? 'buff' : 'debuff') + (_buff.level > 3 ? 3 : _buff.level) + '-' + _size;
				_char.buffContainer.appendChild(_buffItem);
			}
		}
		else if (_char.buffContainer && _char.hadBuff) {
			delete _char.hadBuff;
			_char.buffContainer.innerHTML = '';
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
	this.drawHealthBar = function (_item) {
		if(__batterySaveMode)
			return;
		if (_item.char.main) {
			this.drawBuffs(_item.char, 'big');
			return;
		}
		if (!_item.char.key || _item.char.getMaxHP() <= 1 || _item.char.class === 'spell' || _item.char.animation === 'respawn')
			return;
		const _id = 'hb-' + _item.char.key;
		let hb = _item.char.healthBarElem ?? document.getElementById(_id), hbInner;
		const hbWidth = MathRound((_canvas.width / 100) * (_item.char.class === 'boss' ? 8 : 4));
		if (_item.char.remove || _item.char.skipHealthBar || _item.char.isDead()) {
			if (hb) {
				hb.remove();
				_item.char.healthBarElem = undefined;
				_item.char.healthBarDrawn = false;
			}
			return;
		}
		else if(_item.unseen && hb) {
			hb.unseen = 1;
			addClass(hb, 'd-none');
			return;
		}
		else if(hb?.unseen && !_item.unseen) {
			delete hb.unseen;
			removeClass(hb, 'd-none');
		}
		if(_item.char.lastHBUpdateTime && (msNow - _item.char.lastHBUpdateTime) < 30)
			return;
		const _bigHPClass = 'boss';
		_item.char.lastHBUpdateTime = msNow;
		const xGap = MathRound((_item.char.getWidth() - hbWidth) / 2);
		const hpRate = _item.char.darkenHealthBar ? 100 : (_item.char.health / _item.char.getMaxHP()) * 100;
		if (!hb) {
			hb = document.createElement('div');
			hb.id = _id;
			hb.className = 'health-bar-tiny' + (_item.char.class === _bigHPClass ? ' boss' : '');
			hbInner = document.createElement('div');
			if (_item.char.displayName && (_item.char.grade > 1 || this.pvp || _item.char.receive) && (_item.char.class !== _bigHPClass))
				hbInner.innerHTML = '<div class="flex one-line" style="color:#ffffffcc;position:absolute;top:-3vh">' + _item.char.displayName + '</div>';
			hbInner.className = 'health-bar-tiny-inner flex flex-jc-start';
			hb.appendChild(hbInner);
			if (_item.char.animations.block && _item.char.enemy) {
				const _enemyDefBar = document.createElement('div');
				_enemyDefBar.style = 'height:35%;width:100%;background:#9D00FF';
				_enemyDefBar.id = 'defbar-' + _id;
				_enemyDefBar.className = 'enemy-def-bar';
				hb.appendChild(_enemyDefBar);
				_item.char.hasFatiqueBar = 1;
			}
			if (_item.char.animations.air2 && _item.char.enemy) {
				const _enemyRageBar = document.createElement('div');
				_enemyRageBar.style = 'height:20%;width:100%';
				_enemyRageBar.className = 'enemy-rage-bar';
				const _innerRageBar = document.createElement('div');
				_innerRageBar.className = 'enemy-rage-bar-inner';
				_innerRageBar.id = "ragebar-" + _id;
				_enemyRageBar.appendChild(_innerRageBar);
				hb.appendChild(_enemyRageBar);
				_item.char.hasRageBar = 1;
			}
			(_item.char.class === _bigHPClass ? _gameUI : _gamePad).appendChild(hb);
			_item.char.healthBarDrawn = true;
			hb.h = _item.char.getHeight();
			if (_item.char.grade > 1 && _item.char.gradeLeft > 0)
				hb.style.background = getGradeBGColor(_item.char.grade);
		}

		let _buffContainer = _item.char.buffWrapper ?? document.getElementById('buff-' + _id);
		if (!_buffContainer) {
			_buffContainer = document.createElement('div');
			_buffContainer.className = 'flex flex-jc-start buff-container';
			_buffContainer.id = 'buff-' + _id;
			hb.appendChild(_buffContainer);
			_item.char.buffWrapper = _buffContainer;
		}
		if (_item.char.buffs?.length > 0) {
			let _buffCount = 0, _debuffCount = 0;
			const _arr = this.sortBuffs(_item.char.buffs);
			const _arrKey = _arr.map(x => x.key).join(',');
			if(_buffContainer.buffKey !== _arrKey) {
				_buffContainer.innerHTML = '';
				for (var _b of _arr) {
					const _buff = _allBuffs[_b.key];
					const _type = _buff.gain ? 'buff' : 'debuff';
					if (_buff.gain) {
						if (_buffCount === 2)
							continue;
						_buffCount++;
					}
					else if (_buff.loss) {
						if (_debuffCount === 2)
							continue;
						_debuffCount++;
					}
					const _buffIcon = document.createElement('img');
					_buffIcon.src = './images/buff/icons/' + _b.key + '.png';
					_buffIcon.className = _type + _b.level + '-small';
					_buffContainer.appendChild(_buffIcon);
				}
				_buffContainer.buffKey =_arrKey;
			}
		}
		else if(_buffContainer.buffKey) {
			delete _buffContainer.buffKey;
			_buffContainer.innerHTML = '';
		}
		const _finishable = hpRate <= __finishingMoveHPPercent;
		let _extraTop = 0;
		if (_item.char.animation === 'hurthug')
			_extraTop = -1 * MathRound(_item.char.getHeight() / 2);
		const _frame = _item.char.getCurrentFrame();
		if (_frame.bottomGap)
			_extraTop += MathRound(_frame.bottomGap * _item.char.getZoom());
		const _hbTop = MathRound((_canvas.height + _extraTop) - (MathRound((_item.char.healtbarGap ?? 0) * __zoom)) - _item.char.yPosition - hb.h - (_item.yGap ?? 0) - (_item.char.yGap ?? 0));
		//if(hb.scrTop !== _hbTop)
		//	hb.style.top = _hbTop + 'px';
		const _hbLeft = MathRound(_item.char.getScreenLeft() - _item.char.getOriginDistance() + xGap);
		if((hb.scrLeft !== _hbLeft || hb.scrTop !== _hbTop) && (_item.char.class !== _bigHPClass)){
			hb.style.transform = 'translate(' + _hbLeft + 'px,-' + (_canvas.height - _hbTop) + 'px)';
			hb.style.setProperty('-webkit-transform', hb.style.transform);
		}
		else if(_item.char.class === _bigHPClass && hbInner && 
			hbInner.gradeLeft != _item.char.gradeLeft) {
			hbInner.gradeLeft = _item.char.gradeLeft;
			hb.innerHTML = hb.innerHTML + '<span style="position:absolute;height:100%;display:flex;align-items:center;left:1vw;top:0;color:#f7f7f7 !important;text-shadow:0 0 .5vh #000">Lvl ' + _item.char.level + ' - ' + _item.char.displayName + '</span><span id="boss-grade-count" style="color:#f7f7f7 !important;text-shadow:0 0 .5vh #000;position:absolute;top:0;height:100%;right:1vw;display:flex;align-items:center">' + (_item.char.gradeLeft > 0 ? 'x' + (_item.char.gradeLeft + 1) : '') + '</span>';
		}
		hb.scrLeft = _hbLeft;
		hb.scrTop = _hbTop;
		if (!hbInner)
			hbInner = document.querySelector('#' + _id + ' .health-bar-tiny-inner');
		if(hbInner && hpRate !== hbInner.hpRate) {
			hbInner.style.width = hpRate + '%';
			hbInner.hpRate = hpRate;
		}
		if (_item.targeted && !_item.char.hasTargetIcon) {
			let _icon = document.getElementById(_id + '-span');
			if (_icon)
				_icon.remove();
			_icon = document.getElementById(_id + '-icon');
			if (!_icon) {
				_icon = document.createElement('div');
				_icon.id = _id + '-icon';
				_icon.className = 'finishable health-bar-tiny-icon';
				_icon.innerHTML = '<img style="border-radius:100%" src="./images/main/skill-icons/finish.png" class="full finishable" />';
				hb.appendChild(_icon);
				_item.char.hasTargetIcon = 1;
			}
		}
		else if(!_item.targeted) {
			let _icon = document.getElementById(_id + '-icon');
			if (_icon)
				_icon.remove();
			_icon = document.getElementById(_id + '-span');
			if (!_icon) {
				_icon = document.createElement('span');
				_icon.id = _id + '-span';
				_icon.className = (_item.char.class === 'minion' ? 'minion ' : '') + 'flex mob-level' + (_item.char.grade > 1 ? ' mob-level-grade' : '') + ' health-bar-tiny-icon';
				_icon.innerText = _item.char.level;
				hb.appendChild(_icon);
			}
			delete _item.char.hasTargetIcon;
		}
		if (_finishable)
			addClass(hb, 'finishable');
		else if (!_item.char.autoMode) {
			addClass(hb, 'friendly-enemy');
			removeClass(hb, 'hostile-enemy');
		}
		else if (_item.char.autoMode === 2) {
			addClass(hb, 'hostile-enemy');
			removeClass(hb, 'friendly-enemy');
		}
		else
			removeClass(hb, 'finishable');
		if (_item.char.darkenHealthBar) {
			if(hbInner && hbInner.bg !== 0) {
				hbInner.style.background = 'linear-gradient(180deg, rgba(0, 0, 0,.5),  black, black, #00000080)';
				hbInner.bg = 0;
			}
		}
		else if (_item.char.gradeLeft > 0) {
			if(hbInner && hbInner.bg !== 1) {
				if (__account.questStatus.quest && (__account.questStatus.quest.loots ?? __account.questStatus.quest.kills)?.find(x => x.enemy?.indexOf(_item.char.id) >= 0))
					hbInner.style.border = '.4vh solid orange';
				let _color = _item.char.grade < 2 ? '#008000' : getGradeBGColor((_item.char.gradeLeft ?? 0) + 2);
				if(!_bigHPClass)
					hbInner.style.background = 'linear-gradient(180deg, ' + _color + '80, ' + _color + ', ' + _color + ', ' + _color + '80)';
				else
					hbInner.style.background = _color;
				hbInner.bg = 1;
			}
		}
		else if (hpRate > 66) {
			if(hbInner && hbInner.bg !== 4) {
				if (__account.questStatus.quest && (__account.questStatus.quest.loots ?? __account.questStatus.quest.kills)?.find(x => x.enemy?.indexOf(_item.char.id) >= 0))
					hbInner.style.border = '.4vh solid orange';
				let _color = _item.char.grade < 2 ? '#008000' : getGradeBGColor((_item.char.gradeLeft ?? 0) + 2);
				hbInner.style.background = 'linear-gradient(180deg, ' + _color + '80, ' + _color + ', ' + _color + ', ' + _color + '80)';
				hbInner.bg = 4;
			}
		}
		else if (hpRate > 33){
			if(hbInner && hbInner.bg !== 2) {
				hbInner.style.background = 'linear-gradient(180deg, rgba(255, 255, 0,.5),  yellow, yellow, #00000080)';
				hbInner.bg = 2;
			}
		}
		else {
			if(hbInner && hbInner.bg !== 3) {
				hbInner.style.background = 'linear-gradient(180deg, rgba(255, 0, 0,.5),  red, red, #00000080)';
				hbInner.bg = 3;
			}
		}
	}
	this.drawRelatedObjects = function (_item, _func) {
		if(!__account.options.effect || this.disposing || __batterySaveMode || _item.alpha)
			return;
		var _objects = _item.objects?.filter(x => !x.ground && (!_func || _func(x)));
		if (!_objects?.[0])
			return;
		for (const _rel of _objects) {
			try {
				var _can = _rel.background ? _cNPC : c10;
				if(_rel.background && !_can.cleared) {
					_can.clearRect(0, 0, _can.clientWidth, _can.clientHeight);
					_can.cleared = true;
				}
				let _draw = !_item.char.unseen || _item.char.main;
				if (_rel.bind === _item.char.animation)
					_draw = true;
				else if (_rel.bind && _rel.bind !== _item.char.animation) {
					_rel.remove = true;
					if(_rel.type === 'buff' && _item.char.buffs?.find(x => x.key === _rel.bind)){
						delete _rel.remove;
						_draw = true;
					}
					else
						_draw = false;
				}
				else if (_rel.remove)
					continue;
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
					if (_rel.still && (_rel.stillLeft === undefined)) {
						_rel.stillPlatformX = platformX;
						if(_rel.background && (_rel.stillLeft === undefined))
							_rel.stillLeft = _item.left;
						else if(!_rel.background)
							_rel.stillLeft = _item.left;
						_rel.stillTop = _rel.top;
						if(_rel.xGapMin && _rel.xGapMax)
							_rel.xGap = getRandomValue(_rel.xGapMin, _rel.xGapMax);
						if(_rel.yGapMin && _rel.yGapMax)
							_rel.yGap = getRandomValue(_rel.yGapMin, _rel.yGapMax);
						_rel.stillXGap = _rel.xGap;
						if (_rel.reversable != false)
							_rel.stillReversed = _reversed;
					} else if(_rel.stillOnChar) {
						if(_rel.stillLeft !== _item.left){
							if(!_rel.still)
								_rel.still = true;
							_rel.stillPlatformX = platformX;
							_rel.stillXGap = _rel.xGap + ((_item.reversed ? 1 : -1) * (_rel.stillLeft === undefined ? 0 : _rel.stillLeft - _item.left));
							_rel.stillReversed = _reversed;
							_rel.stillLeft = _item.left;
						}
						if(_rel.stillTop !== _rel.top)
							_rel.stillTop = _rel.top;
					}
					let _relLeft = (_rel.stillLeft !== undefined ? _rel.stillLeft + (_rel.stillPlatformX - platformX) :
						_item.left);
					if (_reversed) {
						if (_rel.reversable != false) {
							//if (_rel.positioned)
							//	_relLeft -= (MathRound(_rel.width * (_rel.zoom ?? 1)));
							if (!_can.reversed && !_rel.background) {
								_can.save();
								_can.scale(-1, 1);
								_can.reversed = true;
							}
						}
						else if (_can.reversed && !_rel.background) {
							_can.restore();
							_can.reversed = false;
						}
					}
					else if (_can.reversed && !_rel.background) {
						_can.restore();
						_can.reversed = false;
					}
					if (!_can.reversed && _rel.stillReversed && !_rel.background) {
						_can.save();
						_can.scale(-1, 1);
						_can.reversed = true;
					}
					else if (_rel.stillReversed === false && _can.reversed && !_rel.background) {
						_can.restore();
						_can.reversed = false;
					}
					if(_rel.background && _rel.stillLeft !== undefined)
					  	_relLeft = _rel.stillLeft;
					let _xGap = _rel.locate ? ((_rel.stillXGap ?? _rel.xGap) ?? 0) : (MathAbs(_rel.stillXGap ?? _rel.xGap) ?? 0);
					_relLeft += ((_can.reversed ? 1 : -1) * _xGap);
					if (_can.reversed)
						_relLeft *= -1;
					let _fl = _rel.frame, _ft = 0;
					if (_rel.col) {
						_fl = (_rel.frame % _rel.col);
						_ft = parseInt(_rel.frame / _rel.col) * _rel.height;
					}
					if(!__batterySaveMode || _rel.background)
						_can.drawImage(_rel.sprite, (_fl ?? 0) * _rel.width, _ft + (_rel.baseTop ?? 0), _rel.width - (_rel.baseRight ?? 0), _rel.height,
							MathRound(_relLeft),
							MathRound((_rel.stillTop ?? _rel.top) - (_rel.still ? 0 : (_item.yGap ?? 0)) - ((_rel.yGap ?? 0))),
							parseInt((_rel.width - (_rel.baseRight ?? 0)) * _rel.zoom), parseInt(_rel.height * _rel.zoom));
				}
				if (_rel.start >= 0)
					_rel.start++;

			} catch (e) {
				console.log(_rel.key ?? rel.animation?.key);
			}
		}
	}

	this.drawGoreObjects = function (_item) {
		if(!__account.options.gore || this.disposing)
			return;
		var _objects = _item.objects?.filter(x => x.ground);
		if (!_objects?.[0])
			return;
		for (var _rel of _objects) {
			if (_rel.remove)
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
				if (_rel.still && (_rel.stillLeft === undefined)) {
					_rel.stillPlatformX = platformX;
					_rel.stillLeft = (_item.char.main ? _item.left + platformX : _item.left) + ((_reversed ? 1 : -1) * (_rel.xGap ?? 0));
					_rel.stillTop = _rel.top;
				}
				let _relLeft = (_rel.stillLeft !== undefined ? _rel.stillLeft + (_rel.stillPlatformX - platformX) :
					_item.left);
				if (_reversed) {
					if (_rel.reversable != false) {

						//if (_rel.positioned)
						//	_relLeft -= (MathRound(_rel.width * (_rel.zoom ?? 1)));
						if (!cGore.reversed) {
							cGore.save();
							cGore.scale(-1, 1);
							cGore.reversed = true;
						}
					}
					else if (cGore.reversed) {
						cGore.restore();
						cGore.reversed = false;
					}
				}
				else if (cGore.reversed) {
					cGore.restore();
					cGore.reversed = false;
				}
				if (cGore.reversed) {
					_relLeft *= -1;
					_relLeft += (_rel.stillPlatformX ?? platformX)
				}
				else
					_relLeft -= (_rel.stillPlatformX ?? platformX)
				let _fl = _rel.frame, _ft = 0;
				if (_rel.col) {
					_fl = (_rel.frame % _rel.col);
					_ft = parseInt(_rel.frame / _rel.col) * _rel.height;
				}
				if(!__batterySaveMode)
					cGore.drawImage(_rel.sprite, (_fl ?? 0) * _rel.width, _ft + (_rel.baseTop ?? 0), _rel.width - (_rel.baseRight ?? 0), _rel.height,
						MathRound(_relLeft),
						MathRound((_rel.stillTop ?? _rel.top) - ((_rel.yGap ?? 0) * _rel.zoom)),
						parseInt((_rel.width - (_rel.baseRight ?? 0)) * _rel.zoom) - (_rel.baseRight ?? 0), parseInt(_rel.height * _rel.zoom));
			}
			if (_rel.start >= 0)
				_rel.start++;
		}
	}

	this.getFriendlyUnits = function () {
		return this.enemies?.filter(x => !x.dead && !x.enemy && x.class !== 'spell');
	}

	this.getAvailableEnemies = function (_char, _func) {
		const _ff = _char.friendlyFire;
		const onlyTarget = this.enemies?.find(x => x.attackingOnlyBy && x.attackingOnlyBy === _char.key && x != _char && !x.ghost && x.enemy != undefined && ((_ff && x.enemy === _char.enemy) || (!_ff && x.enemy !== _char.enemy)) && isObjectInVisibleRectangle(x) && !x.dead
			&& !(x.knockbacking && x.dying));
		if (onlyTarget)
			return [onlyTarget];
		return this.enemies?.filter(x =>
			x != _char && !x.getCurrentAnimation().interactive &&
			x.enemy != undefined &&
			((_ff && x.enemy === _char.enemy) || (!_ff && x.enemy !== _char.enemy)) &&
			(isObjectInVisibleRectangle(x) || episode.pvp || (_char.main && _char.autoMode === 2)) &&
			!x.dead && !x.ghost &&
			(!(x.knockbacking && x.dying) || (_func && _func(x))) &&
			!x.attackingOnlyBy
		);
	}

	this.hasEnemyAlive = function (_c) {
		return this.enemies?.find(x => x.enemy !== _c.enemy && x.class !== 'spell' && !x.isDead() && !x.ghost);
	}

	this.getEnemyByKey = function (_key) {
		return this.enemies?.find(x => x.key === _key);
	}

	this.dispose = function() {
		this.pauseBgMusic();
		if(this.after)
			this.after();
		this.disposing = 1;
		if(this.bgMusicTimer)
			clearInterval(this.bgMusicTimer);
		if(this.bgMusic){
			if(!this.bgMusic.paused)
				this.bgMusic.pause();
			this.bgMusic = null;
		}
		if(mainCharacter.heartbeat) {
			mainCharacter.heartbeat.pause();
			mainCharacter.heartbeat = undefined;
		}
		if (!this.dungeon)
			disconnect();
		for(let _elem of document.querySelectorAll('.dmg'))
			_elem.remove();
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
	}
	if(!this.lobby && !this.pvp)
		this.createBgMusic();
}