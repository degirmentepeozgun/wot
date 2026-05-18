﻿﻿﻿﻿'use strict';
const __attackTolerance = 2;

function enemy(_e) {
	this.key = _e.key;
	this.id = _e.id;
	this.realId = _e.realId??_e.id;
	this.alp = _e.alp;
	this.frame = 0;
	this.start = 0;
	this.npc = _e.npc;
	this.class = _e.class;
	this.mustDraw = _e.mustDraw;
	this.noSmash = _e.noSmash;
	this.noRemove = _e.noRemove;
	this.villain = _e.villain;
	this.divider = getRandomValue2(1000, 9999);
	this.healthRate = 100;
	this.blocked = false;
	this.defaultAnimationKey = _e.defaultAnimationKey ?? 'idle';
	this.startAnimationKey = _e.startAnimationKey;
	this.defaultDirection = _e.defaultDirection ?? __left;
	this.zoom = (_e.zoom ?? 1) * (episode.characterZoom ?? 1);
	this.harmless = _e.harmless;
	this.skills = _e.skills;
	this.still = _e.still;
	this.gender = _e.gender;
	this.noSpeedChange = _e.noSpeedChange;
	this.finishableWith = _e.finishableWith;
	this.finishAfter = _e.finishAfter;
	this.animationKeysShuffledTime = _gameTick;
	if(_e.finishWhen)
		this.finishWhen = function() {
			return _e.finishWhen(this);
		};
	if(_e.slotPriority)
		this.slotPriority = _e.slotPriority;
	this.moveDirection = undefined;
	this.experience = 0; // _e.experience ?? 500;
	this.healtbarGap = _e.healtbarGap;
	this.difficulty = _e.difficulty ?? __account.difficulty;
	this.phased = _e.phased;
	if(_e.healthBarWidthRate)
		this.healthBarWidthRate = _e.healthBarWidthRate;
	this.colorized = ((this.divider % 2) === 0);
	this.attackedUnitCount = 0;
	this.maxAttackerCount = getRandomValue2((6 - __account.difficulty), (5 - __account.difficulty) * (6 - __account.difficulty));
	this.relatedObjects = [];
	if(_e.deadAnimationKey)
		this.deadAnimationKey = _e.deadAnimationKey;
	if(_e.talkCount)
		this.talkCount = _e.talkCount;
	if(_e.size)
		this.size = _e.size;
	if(_e.do)
		this.do = _e.do;
	if(_e.solid)
		this.solid = 1;
	if (this.still)
		this.stepX = 0;
	else
		this.stepX = _e.stepX ?? 4;
	this.startSound = _e.startSound;
	this.bestRing = _e.bestRing;
	this.stepY = 1;
	this.color = _e.color;
	if(_e.lightColor)
		this.lightColor = _e.lightColor;
	if(_e.bloodColor)
		this.bloodColor = _e.bloodColor;
	this.yGap = (_e.yGap ?? 5);
	this.stepXRate = (_e.stepXRate * (__globalMS / 20)) * (episode.characterZoom ?? 1);
	this.yPosition = _e.yPosition ?? MathRound(getGroundHeight() / 2);
	this.maxHP = _e.maxHP ?? _e.health;
	this.fatique = _e.fatique ?? 100;
	this.maxFatique = this.fatique;
	this.direction = _e.direction ?? _e.defaultDirection;
	this.atk = _e.atk ?? 0;
	this.def = _e.def ?? 0;
	this.width = _e.width;
	this.height = _e.height;
	this.left = _e.left;
	this.top = _e.top;
	this.bleed = _e.bleed;
	this.skipHealthBar = _e.skipHealthBar || _e.health <= 1;
	this.hitCount = 0;
	this.pierceRate = _e.pierceRate ?? 0;
	this.critRate = _e.critRate ?? 0;
	this.stealRate = _e.stealRate ?? 0;
	this.critResistRate = _e.critResistRate ?? 0;
	this.critDmgResistRate = _e.critDmgResistRate ?? 0;
	this.critDmgRate = _e.critDmgRate ?? 0;
	this.hpRegenRate = _e.hpRegenRate ?? 0;
	this.animations = _e.animations;
	this.buffs = _e.buffs ?? [];
	this.drops = _e.drops;
	this.autoMode = _e.autoMode;
	this.autoTarget = _e.autoTarget;
	this.knockback = _e.knockback;
	this.ranged = _e.ranged;
	this.main = _e.main;
	this.drawPriority = this.main ? 1 : _e.drawPriority ?? 9;
	this.startDrawPriority = this.drawPriority;
	this.enemy = _e.enemy;
	this.friendly = _e.friendly;
	this.friendlyFire = _e.friendlyFire;
	this.skillClass = _e.skillClass;
	this.name = _e.name ?? _e.class;
	this.level = episode?.pvp ? 10 : (_e.level ?? 1);
	this.animation = this.defaultAnimationKey;
	this.invulnerable = _e.invulnerable;
	this.range = _e.range;
	this.grade = _e.grade ?? 1;
	this.gradeZoomRate = _e.gradeZoomRate;
	this.related = _e.related;
	this.located = _e.located;
	this.weight = _e.weight;
	this.rageCount = 0;
	this.iceDmg = _e.iceDmg ?? 0;
	this.lightningDmg = _e.lightningDmg ?? 0;
	this.fireDmg = _e.fireDmg ?? 0;
	this.toxicDmg = _e.toxicDmg ?? 0;
	this.iceResistRate = _e.iceResistRate ?? 0;
	this.lightningResistRate = _e.lightningResistRate ?? 0;
	this.fireResistRate = _e.fireResistRate ?? 0;
	this.toxicResistRate = _e.toxicResistRate ?? 0;
	this.important = this.villain || this.alp || this.main || this.class === 'boss' || this.class === 'minion' || this.grade > 1;
	this.baseProps = {
		maxHP: _e.maxHP ?? 100,
		critRate: _e.critRate ?? 5,
		goldGainRate: _e.goldGainRate ?? 10
	}
	if(_e.maxRageCount)
		this.maxRageCount = _e.maxRageCount;
	if(_e.rageDecreasement)
		this.rageDecreasement = _e.rageDecreasement;
	this.touchDead = _e.touchDead;
	this.noCC = _e.noCC;
	this.noDirection = _e.noDirection;
	this.speedRate = 1;
	this.noLoot = _e.noLoot;
	this.immunities = _e.immunities;
	this.fps = _e.fps ?? 1;
	this.releaseAfter = (episode.war ? 2 : 1) * (_e.releaseAfter ?? 19);
	this.oldProps = {
		expEnabled: false,
		goldEnabled: false,
		itemEnabled: false,
		reflect: false,
		noCC: this.noCC,
		still: this.still,
		speedRate: 1,
		fps: 1,
		invulnerable: this.invulnerable,
		immobilize: false,
		hpRegenRate: this.hpRegenRate,
		stepXRate: this.stepXRate,
		atk: this.atk,
		def: this.def,
		ultimate: false,
		burn: false,
		poison: false,
		freeze: false,
		iframe: false,
		release: false,
		sleep: false,
	}
	if (_e.src) {
		if (_e.src.endsWith('.png'))
			this.sprite = getImage(_e.src);
		else {
			let _skin = '';
			if(_e.variant) {
				_skin = getRandomValue2(1, _e.variant);
				if(_skin === 1)
					_skin = '';
			}
			this.sprite = getImage(_e.src + 'sprite' + _skin + '.png');
		}
	}
	else
		this.sprite = getImage('./images/main/' + (this.related?.class ?? this.class) + '/sprite.png');
	this.src =  _e.src;
	if (!this.still || _e.hasShadow) {
		if(_e.hasShadow !== false)
			this.shadow = structuredClone2(relatedObjects.find(x => x.id === 'shadow'));
	}
	this.getMaxRageCount = function() {
		return this.maxRageCount ?? __maxRageCount;
	}
	// this.getCurrentAnimation = function () {
	// 	const _x = this.animations[this.animation];
	// 	if(!_x){
	// 		this.animation = 'idle';
	// 		return this.animations[this.animation];
	// 	}
	// 	return _x;
	// }
	this.getCurrentAnimation = function () {
		if(this.lastUsedAnimation !== this.animation) {
			let _x = this.animations[this.animation];
			if(!_x){
				this.animation = this.defaultAnimationKey;
				_x = this.animations[this.animation];
			}
			this.CURRENT_ANIMA = _x;
			this.lastUsedAnimation = this.animation;
		}
		return this.CURRENT_ANIMA;
	}
	this.getZoom = function () {
		return this.zoom * __zoom; // * (1 + ((getGroundHeight() - this.yPosition) / getGroundHeight()) * .25);
	}
	if(this.yGap)
		this.yGap *= this.getZoom();
	if(this.healtbarGap)
		this.healtbarGap *= this.getZoom();
	this.startZoom = this.getZoom();
	this._HURTBOX = {
		w: MathRound(this.width * this.getZoom()),
		h: MathRound(this.height * this.getZoom())
	};
	if(this._HURTBOX.w % 2 > 0)
		this._HURTBOX.w += 1;
	this.HURTWIDTH = this._HURTBOX.w;
	this.HURTHEIGHT = this._HURTBOX.h;
	this._HURTBOX_half = MathRound(this._HURTBOX.w / 2);
	this.setAutoMode = function (_mode, _force) {
		if(episode.realTime && this.alp)
			return;
		var _am = this.autoMode;
		if((_am === undefined) && this.main && this.keyboard)
			_am = 0;
		if ((this.keyboard || this.main) && !this.enemy) {
			this.realAutoMode = this.autoMode = undefined;
			return;
		}
		if (!this.firstAutoModeSet) {
			this.realAutoMode = _am ?? _mode;
			this.firstAutoModeSet = true;
		}
		if (!this.main || _force)
			this.autoMode = _mode;
	}
	this.resetAutoMode = function () {
		if (this.autoMode !== this.realAutoMode)
			this.autoMode = this.realAutoMode;
		else if(this.keyboard)
			this.autoMode = this.realAutoMode = 0;
	}
	this.getAtkRate = function() {
		const _char = this.coopWith ?? this;
		let _atk = getRandomValue(MathCeil(_char.atk / 2), _char.atk);
		if(_char.atkRate > 0)
			_atk *= ((100 * _char.atkRate) / 100);
		const _buffAtk = _char.getBuffProps('atk');
		if(_buffAtk)
			_atk *= ((100 + _buffAtk) / 100);
		if(_char.bonusAtk)
			_atk *= _char.bonusAtk;
		return this.coopWith ? _atk / 4 : _atk;
	}
	this.getDefRate = function() {
		const _char = this.coopWith ?? this;
		let _def = _char.def; // this.armor > 1 ? this.armor : 1;
		if(_char.defRate > 0)
			_def *= ((100 + _char.defRate) / 100);
		const _buffDef = _char.getBuffProps('def');
		if(_buffDef)
			_def *= ((100 + _buffDef) / 100);
		if(_char.bonusDef)
			_def *= _char.bonusDef;
		return this.coopWith ? MathCeil(_def / 4) : MathRound(_def);
	}
	// this.getMaxHP = function () {
	// 	const _char = this.coopWith ?? this;
	// 	let _hp = _char.maxHP;
	// 	if(_char.hpRate > 0)
	// 		_hp *= ((100 + _char.hpRate) / 100);
	// 	return this.coopWith ? MathCeil(_hp / 2) : MathRound(_hp);
	// }
	this.isInFinishingMove = function () {
		return episode.enemies?.find(x => (x.killingBy == this.key) && !x.dead);
	}
	this.isDead = function () {
		return (this.health <= 0 || this.dying || this.dead);
	}
	this.getHeight = function () {
		const _frame = this.getCurrentFrame();
		if(!_frame)
			console.log(this.key + ' ' + this.frame);
		return MathRound((_frame.spriteHeight + MathAbs(_frame.bottomGap ?? 0)) * this.ZOOM);
	}
	this.getTop = function () {
		let _stepY = 0;
		if (this.extraStepYRate && !this.stop)
			_stepY = MathRound(this.extraStepYRate * (_canvas.height / 100));
		return MathRound((_canvas.height - this.yPosition - this.getHeight())) - _stepY;
	}
	this.getWidth = function () {
		const _frame = this.getCurrentFrame();
		if(!_frame)
			console.log(this.id + ' - ' + this.animation + ' - ' + this.frame);
		return MathRound((_frame.spriteWidth + (_frame.rightGap ?? 0)) * this.ZOOM);
	}
	this.getLeft = function () {
		const _frame = this.getCurrentFrame();
		const _reversed = this.direction !== this.defaultDirection;
		const _left = (this.main ? this.left : this.left - platformX);
		if (_reversed)
			return MathRound(_left - this.getWidth() + (_frame.spriteOrigin * this.ZOOM) - ((_frame.leftGap ?? 0) * this.ZOOM));
		else
			return MathRound(_left - (_frame.spriteOrigin * this.ZOOM) + ((_frame.leftGap ?? 0) * this.ZOOM));
	}
	this.getOriginDistance = function () {
		const _frame = this.getCurrentFrame();
		if (this.direction !== this.defaultDirection)
			return this.getWidth() - (_frame.spriteOrigin * this.ZOOM);
		return (_frame.spriteOrigin * this.ZOOM);
	}
	this.checkChainSkill = function (_frame) {
		if (!this.main)
			return;
		if(this.chains && !_frame.chain && this.keyboard)
			this.chains.forEach(x => this.keyboard.removeSkill?.(x.key));
		if(!this.noCounter){
			this.chains = _frame.chain;
			if(this.chains) {
				const _chainKeys = this.chains.map(x => x.key).join(',');
				if(_chainKeys !== this.lastChainKeys && this.chainStatus)
					delete this.chainStatus;
				this.lastChainKeys = _chainKeys;
			}
		}
		else
			this.chains = undefined;
		if (this.chains && !this.isDead()){
			if(!this.chainStatus) {
				for (let _c of this.chains) {
					const _skill = this.animations[_c.key];
					const _chainCD = _skill?.coolDownLeft;
					removeClass(chainSkills['skill' + _c.num], 'v-none');
					const cfc = chainSkills['skill' + _c.num].firstChild;
					if((cfc.src ?? '') === '') {
						if ((_chainCD >= 0) && _skill.coolDownStart2)
							cfc.src= './images/main/skill-icons/' + this.class + '/' + _c.key + '.png';
						else
							cfc.src = './images/main/skill-icons/' + this.class + '/' + _c.key + '.png';
					}
				}
				this.chainStatus = 1;
			}
			if(this.chainStatus) {
				for (let _c of this.chains) {
					const _skill = this.animations[_c.key];
					const _chainCD = _skill?.coolDownLeft;
					if ((_chainCD >= 0) && _skill.coolDownStart2) {
						const _cs = chainSkills['skill' + _c.num];
						if(!_cs.cdStart || ((_gameTick - _cs.cdStart) > 1000)) {
							_cs.cdStart = _gameTick;
							let _csCounter = _cs.querySelector('.counter');
							if(!_csCounter){
								_csCounter = document.createElement('div');
								_csCounter.className = 'counter flex';
								_cs.appendChild(_csCounter);
							}
							const _co = MathFloor(_chainCD / 1000);
							if(_csCounter.innerText !== _co.toString())
								_csCounter.innerText = _co;
						}
					}
				}
			}
		}
		else {
			if(this.chainStatus === 1) {
				for (var i = 1; i < 5; i++)
					addClass(chainSkills['skill' + i], 'v-none');
				delete this.chainStatus;
			}
		}
	}
	// this.getCurrentFrame = function () {
	// 	return this.getCurrentAnimation()?.frames?.[this.frame];
	// }
	this.getPreviousFrame = function() {
		return this.PREV_FRAME;
	}
	this.getCurrentFrame = function () {
		const anima = this.getCurrentAnimation();
		if (!anima) return undefined;

		if (
			this._cachedFrameIndex !== this.frame ||
			this._cachedAnimation !== anima || (anima && !this.CURRENT_FRAME)
		) {
			this.PREV_FRAME = this.CURRENT_FRAME;
			this.CURRENT_FRAME = anima.frames?.[this.frame];
			this._cachedFrameIndex = this.frame;
			this._cachedAnimation = anima;
		}
		return this.CURRENT_FRAME;
	}
	this.getNextFrame = function () {
		return this.animations[this.animation]?.frames?.[this.frame + 1];
	}
	this.pickRandomAttack = function (_noCD, _minRange, _reset) {
		if (this.animation === 'start' || this.animation === 'before' || this.noAttack)
			return;
		if(this.harmless && this.animations.idle)
		{
			this.upcomingAnimation = 'idle';
			return;
		}
		const _hasRange = _minRange > 0;
		if (this.animations[this.lastAttack ?? this.animation].next) {
			const _ua = this.animations[this.lastAttack ?? this.animation].next;
			const _uas = this.animations[_ua];
			this.getSkillRange(_uas);
			if(!_hasRange || (_minRange <= _uas.totalRange))
			{
				this.upcomingAnimation = _ua;
				return;
			}
		}
		const _enemies = episode.getAvailableEnemies(this)?.find(x => x.health > 0 && !x.invulnerable);
		if (!_enemies) {
			this.upcomingAnimation = 'idle';
			return;
		}
		if (this.upcomingAnimation && this.upcomingAnimation !== 'idle' && !_reset)
			return;
		const _theChar = this;
		// const _keys = Object.keys(_theChar.animations).map(x => _theChar.animations[x]).sort(() => Math.random() - 0.5).sort(function(a, b) {
		// 	if(a.cooldown > 0 && !b.cooldown)
		// 		return 1;
		// 	else if(a.cooldown > 0 && b.cooldown > 0)
		// 		return 0;
		// 	return -1;
		// }).map(x => x.key);
		let _immunities;
		if (this.autoTarget && !this.autoTarget.isDead() && this.autoTarget.immunities)
			_immunities = this.autoTarget.immunities;
		let _chosenKey, _immuneKey, _useLastAttack;
		const _currentAnima = this.animations[this.animation];
		const _frame = this.getCurrentFrame();
		if(this.hasChain && !this.noCounter && _currentAnima.hurt) {
			if(_frame.chain?.[0]) {
				let _defChain;
				for(const _ch of _frame.chain) {
					const _chainAnima = this.animations[_ch.key];
					if(_chainAnima?.attack) {
						if(_chainAnima.totalRange === undefined)
							this.getSkillRange(_chainAnima);
						if(!(_chainAnima.coolDownLeft > 0) && (!_hasRange || (_minRange <= _chainAnima.totalRange)))
						{
							_chosenKey = _ch.key;
							break;
						}
					}
					else if(_chainAnima && !(_chainAnima.coolDownLeft > 0))
						_defChain = _ch.key;
				}
				if(!_chosenKey && _defChain)
					_chosenKey = _defChain;
			}
			if(!_chosenKey) {
				this.upcomingAnimation = 'idle';
				return;
			}
		}
		if(!_chosenKey) {
			if((this.animationKeysShuffledTime + 1000) < _gameTick) {
				shuffle(_theChar.attackKeys);
				this.animationKeysShuffledTime = _gameTick;
			}
			const _keys = _theChar.attackKeys;
			let _chosenRange;
			for (var _key of _keys) {
				let _k = _key, _itIsOk;
				let _modified = _k.endsWith('modified');
				if(this.ultimate && !_modified && this.animations[_k + 'modified'] &&
					(this.animations[_k + 'modified']?.coolDownLeft > 0 ||
						this.skills?.[_k + 'modified']?.locked
					))
					continue;
				else if(this.skills?.[_k]?.locked)
					continue;
				if(_modified && !this.ultimate)
					continue;
				let _anima = this.animations[_k];
				if(_anima.disabled)
					continue;
				if(_anima.before && !this.skills?.[_anima.before]?.locked)
					if(!_noCD && _anima.coolDownLeft > 0) {
						_k = _anima.before;
						_anima = this.animations[_k];
					}
				else if(_anima.beforeOrder && _anima.before && !_noCD) {
					let _preAnima = this.animations[_anima.before];
					if(_preAnima.coolDownLeft > 0)
						_itIsOk = 1;
				}
				if (!_anima.attack || _anima.chain || (_anima.ultimate && this.ultimate) || (_anima.ultimate && this.rageCount < this.getMaxRageCount())
					|| (!_noCD && _anima.coolDownLeft > 0) || (_anima.baseKey && !_itIsOk) || (!_anima.order && !_anima.beforeOrder && !_itIsOk) || _anima.finishingMove)
				{
					if(_currentAnima?.ultimate)
					{
						this.upcomingAnimation = this.animation;
						return this.animation;
					}
					continue;
				}
				this.getSkillRange(_anima);
				if (_immunities)
					if (_anima.frames.filter(x => x.atk).map(x => x.atk.type ?? 'common')?.find(x => x.includes(_immunities)))
					{
						_immuneKey = _k;
						continue;
					}
				if (_hasRange || (_anima.minRange && !_anima.interactive)) {
					if(_anima.minRange && this.autoTarget) {
						if(_anima.minRange <= this.getRangeBetween(this.autoTarget)) {
							if(this.lastAttack && _k === this.lastAttack)
							{
								_useLastAttack = 1;
								continue;
							}
							_chosenKey = _k;
							_chosenRange = _anima.totalRange;
						}
					}
					else if (_minRange <= _anima.totalRange) {
						if(this.lastAttack && _k === this.lastAttack)
						{
							_useLastAttack = 1;
							continue;
						}
						_chosenKey = _k;
						_chosenRange = _anima.totalRange;
					}
					else if(this.ranged && this.autoTarget) {
						if(this.getRangeBetween(this.autoTarget) > _anima.totalRange)
							continue;
					}
				}
				else {
					if(this.lastAttack && _k === this.lastAttack)
					{
						_useLastAttack = 1;
						continue;
					}
					if(_chosenKey && this.ranged && _chosenRange > _anima.totalRange)
						continue;
					_chosenKey = _k;
					_chosenRange = _anima.totalRange;
				}
			}
		}
		if(!_chosenKey && _useLastAttack && !_hasRange)
			_chosenKey = this.lastAttack;
		if (_chosenKey || _immuneKey) {
			const _key = _chosenKey ?? _immuneKey;
			_chosenKey = this.modifySkill(_key);
			this.upcomingAnimation = _chosenKey;
			return _chosenKey;
		}
		else
			this.upcomingAnimation = (!this.animationFinished && (this.animation === 'run' || this.animation === 'walk')) ? this.animation : 'idle';
	}
	this.getMaxRunRange = function () {
		if (this.maxRunRange !== undefined)
			return this.maxRunRange;
		try{
			const _arr = (this.still ? this.animations.idle : this.animations.run ?? this.animations.idle).frames.map(x => x.spriteWidth - x.spriteOrigin);
			_arr.sort();
			this.maxRunRange = _arr[_arr.length - 1] * this.getZoom();
		}
		catch(e) {
			console.log(e.message);
			alert(this.key + ' getmaxrange: ' + e.message);
		}
		return this.maxRunRange;
	}
	this.getSkillRange = function (_anima) {
		if (_anima.totalRange === undefined) {
			if (_anima.chargeDistance)
				_anima.totalRange = _anima.chargeDistance.value;
			else
				_anima.totalRange = 0;
			_anima.yRange = 0;
			let xRangePX = 0;
			for (var _frame of _anima.frames) {
				if (_frame.atk?.yRange > _anima.yRange)
					_anima.yRange = _frame.atk.yRange;
				if (_frame.atk?.rate && (_frame.spriteWidth - _frame.spriteOrigin) > xRangePX)
					xRangePX = (_frame.spriteWidth - _frame.spriteOrigin) * this.getZoom();
				_anima.totalRange += (_frame.speed * (_frame.extraStepXRate ?? 0));
				if (_frame.atk?.spell || _frame.spell) {
					let _sp = _frame.atk?.spell ?? _frame.spell;
					if(!Array.isArray(_sp))
						_sp = [ _sp ];
					for(let _s of _sp) {
						let _spellRange = 0;
						const _spell = spells[_s.key];
						for (var _spellFrame of _spell.animations.idle.frames)
							_spellRange += (_spellFrame.speed * (_spellFrame.extraStepXRate ?? 0));
						if (_spellRange > _anima.totalRange)
							_anima.totalRange = _spellRange;
						if(_spell.autoAim && _spell.autoAim > _anima.totalRange)
							_anima.totalRange = _spell.autoAim;
					}
					break;
				}
			}
			if (_anima.totalRange <= 0 && xRangePX > 0 && this.getMaxRunRange() < xRangePX)
				_anima.totalRange = MathFloor(((xRangePX - this.getMaxRunRange()) / episode.cWidth) * 100);
			else if(_anima.chargeDistance && xRangePX > 0){
				_anima.normalRange = MathFloor(((xRangePX * this.ZOOM) / episode.cWidth) * 100);
				if(_anima.normalRange < (_anima.chargeDistance.value / 3))
					_anima.normalRange = MathFloor(_anima.chargeDistance.value / 3);
			}
		}
	}
	this.pickNewTarget = function () {
		let _dir = this.direction;
		let _enemy = this.getClosestEnemy(this.sight ?? 10000, _dir, function (_e) {
			return !_e.invulnerable && !_e.isDead();
		}, 100, 100);
		if (_enemy?.enemy) {
			this.setAutoTarget(_enemy.enemy, null, 1);
			return;
		}
		_dir = _dir === __left ? __right : __left;
		_enemy = this.getClosestEnemy(this.sight ?? 10000, _dir, function (_e) {
			return !_e.invulnerable && !_e.isDead();
		}, 100, 100);
		if (_enemy?.enemy) {
			this.setAutoTarget(_enemy.enemy, null, 2);
			this.direction = this.moveDirection = _dir;
			this.turned = true;
		}
		else
			this.idle();
	}
	this.stopSpawn = function() {
		this.respawnAfterSeconds = this.spawnAsGroup = this.spawnTime = this.spawn = undefined;
		this.respawnRequested = 1;
		this.noBirth = 1;
	}
	this.standBy = function() {
		this.moveDirection = undefined;
		this.immobilize = true;
		this.chargeProperties = this.useExtraStepXRate = undefined;
		if(this.keyboard) {
			blurKeyboard();
			this.disableKeyboard = true;
		}
		if(this.animation !== 'idle')
			this.animate('idle', 1);
		this.stopStepSound();
	}
	this.unarm = function() {
		if(this.unarmed)
			return;
		this.unarmed = true;
		this.swapAnimation('idle');
		this.swapAnimation('run');
		this.swapAnimation('walk');
		this.start = this.frame = 0;
		this.disableSkills();
	}
	this.disableUnarm = function() {
		if(!this.unarm)
			return;
		delete this.unarmed;
		this.swapAnimation('idle');
		this.swapAnimation('run');
		this.swapAnimation('walk');
		this.start = this.frame = 0;
		this.enableSkills();
	}
	this.assignSlots = function() {
        //Yapılması gereken işlem
		return;

        if(!this.dirtySlots || this.dirtySlots.length === 0)
            return;

        const _centerX = this.HURTLEFT + this._HURTBOX_half;
		const _self = this;
        const _enemies = episode
            .getAvailableEnemies(this, function(e) {
				return !e.slot && e.autoTarget === _self;
			});

        if(!_enemies || _enemies.length === 0)
            return;

        const _stillDirty = [];

        for(let _slot of this.dirtySlots) {

            const _isLeft = _slot.xGap < 0;

            let _bestSameSide = null;
            let _bestSameSideDist = Infinity;

            let _bestAnySide = null;
            let _bestAnyDist = Infinity;

            for(let _enemy of _enemies) {

                if(_enemy.slot)
                    continue;

                const _enemyOriginX = _enemy.HURTLEFT + _enemy._HURTBOX_half;
                const _isEnemyLeft = _enemyOriginX < _centerX;
                const _distance = Math.abs(_enemyOriginX - _centerX);

                if(_isLeft === _isEnemyLeft) {
                    if(_distance < _bestSameSideDist) {
                        _bestSameSideDist = _distance;
                        _bestSameSide = _enemy;
                    }
                }

                if(_distance < _bestAnyDist) {
                    _bestAnyDist = _distance;
                    _bestAnySide = _enemy;
                }
            }

            let _chosen = null;
            let _sameSide = false;

            if(_bestSameSide) {
                _chosen = _bestSameSide;
                _sameSide = true;
            } else {
                _chosen = _bestAnySide;
                _sameSide = false;
            }

            if(!_chosen) {
                _stillDirty.push(_slot);
                continue;
            }

            // ==== YAKIN / UZAK SLOT DOLULUK ANALİZİ ====

            const sameSideSlots = this.slots.filter(s =>
                (s.xGap < 0) === (_slot.xGap < 0)
            );

            const nearSlots = sameSideSlots.filter(s => s.yGap === 0);
            const farSlots  = sameSideSlots.filter(s => s.yGap !== 0);

            const nearOccupied = nearSlots.filter(s => s.occupied).length;
            const farOccupied  = farSlots.filter(s => s.occupied).length;

            const nearRatio = nearOccupied / nearSlots.length;
            const farRatio  = farOccupied  / farSlots.length;

            let _finalSlot = _slot;

            // Eğer yakın doluluk oranı uzak doluluktan yüksekse
            // ve bu slot yakın ise → uzaktan boş bir tane seç
            if(_slot.yGap === 0 && nearRatio > farRatio) {

                const emptyFar = farSlots.find(s => !s.occupied);
                if(emptyFar)
                    _finalSlot = emptyFar;
            }

            _finalSlot.occupied = true;
            // if(_chosen.pendingSlot) {
            //     _chosen.reorderPendingQueue();
            //     _chosen.pendingSlot = undefined;
            // }
            _finalSlot.occupant = _chosen;
            _finalSlot.mustCross = !_sameSide;
            _finalSlot.owner = this;
			_chosen.reactionDelay = getRandomValue2(300, 500);
            _chosen.slot = _finalSlot;
			_chosen.lookingAtTarget = false;
            _chosen.pickRandomAttack();
            _enemies.splice(_enemies.indexOf(_chosen), 1);
        }

        this.dirtySlots = _stillDirty;
    }
	// this.createSlots = function(_ringLevel) {

	// 	const makeSlot = (ring, angle, distance) => {

	// 		const rad = angle * Math.PI / 180;

	// 		const xGap = Math.round(Math.cos(rad) * distance) * 3.2;
	// 		const yGap = Math.round(Math.sin(rad) * distance) * .8;
	// 		const type = xGap >= 0 ? "front" : "back";
	// 		return {
	// 			ring: ring,
	// 			angle: angle,
	// 			xGap: xGap,
	// 			type: type,
	// 			yGap: yGap,
	// 			support: ring > 1,
	// 			occupied: false,
	// 			occupant: null,
	// 			owner: this,
	// 			lastAttackTime: _gameTick
	// 		};
	// 	};

	// 	const base = MathRound(this._HURTBOX_half * .75);

	// 	const rings = [
	// 		{ count: 6,  dist: base * .9 },
	// 		{ count: 12, dist: base * 2.1 },
	// 		{ count: 18, dist: base * 3.2 },
	// 		{ count: 24, dist: base * 4.2 },
	// 		{ count: 24, dist: base * 5.1 }
	// 	];
	// 	if(!this.slots)
	// 		this.slots = [];
	// 	for (let r = 0; r < rings.length; r++) {
	// 		if(_ringLevel && (r + 1) !== _ringLevel)
	// 			continue;
	// 		const ring = rings[r];
	// 		const step = 360 / ring.count;

	// 		for (let i = 0; i < ring.count; i++) {

	// 			const angle = i * step;
	// 			let dist = ring.dist;
	// 			if(angle === 0 || angle === 180)
	// 			{
	// 				dist *= 0.75; // %25 daha yakın
	// 			}
	// 			const _slot = makeSlot(r + 1, angle, dist);
	// 			if((r + 1) > 2 && MathAbs(180 - angle) <= 30)
	// 				_slot.ranged = true;
	// 			this.slots.push(_slot);
	// 		}
	// 	}
	// 	if(_ringLevel)
	// 		this.ringLevel = _ringLevel;
	// };
	this.createSlots = function(_ringLevel) {

		const makeSlot = (ring, angle, distance) => {

			const rad = angle * Math.PI / 180;

			const xGap = Math.round(Math.cos(rad) * distance) * 3.2;
			const yGap = Math.round(Math.sin(rad) * distance) * .8;
			const type = xGap >= 0 ? "front" : "back";

			return {
				ring: ring,
				angle: angle,
				xGap: xGap,
				type: type,
				yGap: yGap,
				support: ring > 1,
				occupied: false,
				occupant: null,
				owner: this,
				lastAttackTime: _gameTick
			};
		};

		let base = MathRound(this._HURTBOX_half * .75);
		if(base > (episode.cWidth / 28))
			base = episode.cWidth / 28;

		const rings = [
			{ count: 6,  dist: base * .9 },
			{ count: 12, dist: base * 2.1 },
			{ count: 18, dist: base * 3.2 },
			{ count: 24, dist: base * 4.2 },
			{ count: 24, dist: base * 5.1 }
		];

		if(!this.slots) this.slots = [];
		if(!this.slotsByRing) this.slotsByRing = {};
		if(!this.releasedSlotOrders) this.releasedSlotOrders = {};

		for (let r = 0; r < rings.length; r++) {

			if(_ringLevel && (r + 1) !== _ringLevel)
				continue;

			const ring = rings[r];
			const step = 360 / ring.count;

			if(!this.slotsByRing[r + 1])
				this.slotsByRing[r + 1] = [];

			if(this.releasedSlotOrders[r + 1] === undefined)
				this.releasedSlotOrders[r + 1] = 0;

			for (let i = 0; i < ring.count; i++) {

				const angle = i * step;
				let dist = ring.dist;

				if(angle === 0 || angle === 180)
					dist *= 0.75;

				const _slot = makeSlot(r + 1, angle, dist);
				if((r + 1) > 2 && (MathAbs(180 - angle) <= 30 || MathAbs(180 - angle) >= 150))
					_slot.ranged = true;
				this.slots.push(_slot);
				this.slotsByRing[r + 1].push(_slot);
			}
		}

		if(_ringLevel)
			this.ringLevel = _ringLevel;
	};
    this.getSlotCoords = function() {
        if(!this.slot)
            return undefined;
        const _slot = this.slot;
        const _owner = _slot.owner;
        //burada owner bizim saldıracağımız karakter ve slotun xGap ve yGap değerlerini
        //ownerın origin noktasına xGap ekleyerek ve yPosition değerine yGap ekleyerek koordinat bulunup geri döndürülür
        const _ownerOriginX = _owner.HURTLEFT + _owner._HURTBOX_half;
        const _x = _ownerOriginX + _slot.xGap;
        let _y = _owner.yPosition + _slot.yGap;
		const my = this.getMaxYPosition()
		if (_y > my)
			_y = MathFloor(my);
		else {
			const _minY = episode.getMinPositionY(this);
			if (_y < _minY.y)
				_y = _minY.y;
		}
        return { x: _x, y: _y };
    }
    this.getAttackMsByDifficulty = function() {
		if(this.friendly)
			return 0;
        const _df = this.difficulty ?? __account.difficulty ?? 4;
        switch(_df) {
            case 0: return 0;
            case 1: return 500;
            case 2: return 1000;
            case 3: return 1500;
            case 4: return 2000;
            default: return 2000;   
        }
    }
    this.animateSlotAttack = function(_supportSlot) {
		const _target = this.autoTarget;
		if(!_target.attackers)
			_target.attackers = {
				melees : [],
				rangeds : []
			};
		const _ranged = this.ranged;
		if(_ranged && _target.attackers.rangeds.length > 0)
			return;
		else if(!_ranged && _target.attackers.melees.length > 1)
			return;
		if(!this.bestRing){
			if(_ranged)
				_target.attackers.rangeds.push(this);
			else
				_target.attackers.melees.push(this);
		}
		const _slot = _supportSlot ?? this.slot;
		// if(this.autoTarget && this.autoTarget.slots){
		// 	if(this.autoTarget.slots.filter(x => x.attacking)?.length === 2)
		// 		return;
		// }
        if(_slot)
            _slot.attacking = true;
        this.animate(this.upcomingAnimation, 1);
        this.autoAttacking = true;  
        this.upcomingAnimation = undefined;
		const _thisOrigin = this.HURTLEFT + this._HURTBOX_half;
		const _targetOrigin = _target.HURTLEFT + _target._HURTBOX_half;
		this.direction = _thisOrigin < _targetOrigin ? __right : __left;
		this.lastAttackSlot = _slot;
    }
	this.pickSlotOrder = function () {
		if(this.slot)
			return this.slot;
		const target = this.autoTarget;

		const targetCenterX = target.HURTLEFT + target._HURTBOX_half;
		const targetCenterY = target.yPosition - (target.yGap / 2);

		const myCenterX = this.HURTLEFT + this._HURTBOX_half;
		const myCenterY = this.yPosition - (this.yGap / 2);

    	const isTargetLeft = myCenterX > targetCenterX;
		let bestSlot = null;
		let bestScore = Infinity;
		let bestRing = this.bestRing ?? 0;
		let bestMustCross = false;
		let _ranged = this.ranged;
		for (const slot of target.slots) {
			if(this.bestRing && slot.ring !== this.bestRing)
				continue;
			if(bestRing > 0 && slot.ring > bestRing)
				break;
			if(_ranged && !slot.ranged)
				continue;
			if (slot.occupied && !this.bestRing)
				continue;

			const slotX = targetCenterX + slot.xGap;
			if(slotX < 0 || (slotX + platformX) > episode.width)
				continue;
			const slotY = targetCenterY + slot.yGap;

			
			const dx = slotX - myCenterX;
			const dy = slotY - myCenterY;

			const distance = Math.sqrt(dx*dx + dy*dy);

			const mustCross =
				(isTargetLeft && slot.type === "back") ||
				(!isTargetLeft && slot.type === "front");
			const score = slot.ring * 10000 + distance;

			if (score < bestScore) {

				bestScore = score;
				bestSlot = slot;
            	bestMustCross = mustCross;
				bestRing = slot.ring;
			}
		}

		if (!bestSlot)
			return null;
		bestSlot.mustCross = bestMustCross;
		bestSlot.occupied = true;
		bestSlot.occupant = this;

		this.slot = bestSlot;
		this.slot.bindTick = _gameTick;
		this.reactionDelay =
			getRandomValue2(300, 600) * (this.slot.ring + 1);
		return bestSlot;
	};

	this.validateSlot = function() {

		if (!this.slot)
			return;

		const target = this.autoTarget;

		const targetCenterX = target.HURTLEFT + target._HURTBOX_half;
		const myCenterX = this.HURTLEFT + this._HURTBOX_half;

		const isTargetLeft = myCenterX > targetCenterX;

		const slot = this.slot;

		const wrongSide =
			(!isTargetLeft && slot.type === "front") ||
			(isTargetLeft && slot.type === "back");

		if (wrongSide && !slot.mustCross) {

			this.releaseSlot();
		}
		// else if(!wrongSide && slot.placed) {
		// 	const base = target._HURTBOX_half;
		// 	const hardBreak = base * (3.2 + (slot.mustCross ? 1 : 0));
		// 	const dist = MathAbs(targetCenterX - myCenterX);
		// 	if(dist > hardBreak)
		// 		this.releaseSlot();
		// }
	};
	// this.releaseSlot = function () {

	// 	const root = this.slot;
	// 	if (!root) return;

	// 	const clearBranch = (slot) => {

	// 		if (!slot) return;

	// 		const occ = slot.occupant;

	// 		// Eğer occupant varsa onun slot referansını da temizle
	// 		if (occ) {
	// 			occ.slot = null;
	// 		}

	// 		// Alt support slotları temizle
	// 		if (occ && occ.slots) {
	// 			for (const s of occ.slots) {
	// 				clearBranch(s);
	// 			}

	// 			// support slot listesini de yok edebilirsin
	// 			occ.slots = null;
	// 		}

	// 		// if (!slot.support && slot.owner?.dirtySlots)
	// 		// 	slot.owner.dirtySlots.push(slot);

	// 		slot.occupied = false;
	// 		slot.occupant = null;
	// 		slot.mustCross = false;
	// 		slot.attacking = false;
	// 		slot.placed = false;
	// 	};

	// 	clearBranch(root);

	// 	this.slot = null;
	// 	this.lookingAtTarget = false;
	// };
	this.releaseSlot = function (_force) {
		const root = this.slot;
		if (!root) return;
		if(!_force && this.bestRing)
			return;

		const owner = root.owner;
		const releasedRing = root.ring;

		const visitedOcc = new Set();
		const clearBranch = (slot) => {

			if (!slot)
				return;

			const occ = slot.occupant;

			let skipChildren = false;

			if (occ) {
				if (visitedOcc.has(occ)) {
					skipChildren = true; // 🔥 sadece recursion'ı kes
				} else {
					visitedOcc.add(occ);
				}

				occ.slot = null;

				if (occ === this)
					skipChildren = true;
			}

			// 🔥 sadece çocuklara gitmeyi kesiyoruz
			if (!skipChildren && occ && occ.slots) {
				for (const s of occ.slots)
					clearBranch(s);

				occ.slots = null;
			}

			// 🔥 BUNLAR HER ZAMAN ÇALIŞMALI
			slot.occupied = false;
			slot.occupant = null;
			slot.mustCross = false;
			slot.attacking = false;
			slot.placed = false;
		};
		clearBranch(root);

		// 🔥 ORDER ARTIR
		if(owner?.releasedSlotOrders && owner.releasedSlotOrders[releasedRing] !== undefined) {
			owner.releasedSlotOrders[releasedRing]++;
		}
		const _attackers = this.ranged ? owner.attackers?.rangeds : owner.attackers?.melees;
		if(_attackers){
			const _attackerIndex = _attackers.indexOf(this);
			if(_attackerIndex !== -1)
				_attackers.splice(_attackerIndex, 1);
		}
		this.slot = null;
		this.lookingAtTarget = false;
		this.slotJustReleasedTick = _gameTick;
	};
    this.updateSlot = function() {
        const _slot = this.slot;
        if (!_slot || !_slot.owner) {
            this.releaseSlot();
            return undefined;
        }
        const _target = _slot.owner;
        const coords = this.getSlotCoords();
        if (coords) {
            return {
                HURTLEFT: coords.x
				 + (_slot.mustCross ? 
					MathRound((_slot.xGap < 0 ? -this.HURTWIDTH : this.HURTWIDTH) / 3) : 0)
					,
                HURTWIDTH: 1,
                TOP: _target.TOP,
                HEIGHT: _target.HEIGHT,
                _HURTBOX_half: .5,
                yPosition: coords.y,
                yGap: 1,
                oldYPosition: _target.oldYPosition
            };
        }
        return undefined;
    }
	this.getTouchAreaBySlot = function() {
		if(!this.slot)
			return this;
		return {
                HURTLEFT: this.HURTLEFT + (this.slot.type === 'back' ? 
					this._HURTBOX_half : 0) 
					//+
					// (this.slot.support ? (
					// 	this.slot.type === 'back' ? -this.slot.distance : 
					// 		this.slot.distance
					// ) : 0)
					,
                HURTWIDTH: this._HURTBOX_half,
                TOP: this.TOP,
                HEIGHT: this.HEIGHT,
                _HURTBOX_half: this._HURTBOX_half / 2,
                yPosition: this.yPosition,
                yGap: this.yGap,
                oldYPosition: this.oldYPosition
            };
	}
	// this.tryCheckBetterSlot = function() {

	// 	if (!this.slot)
	// 		return true;

	// 	if(this.slotJustReleasedTick === _gameTick)
	// 		return false;

	// 	const target = this.autoTarget;
	// 	const myRing = this.slot.ring;

	// 	const orders = target.releasedSlotOrders;
	// 	if(!orders)
	// 		return true;

	// 	let candidateRings = [];

	// 	// 🎯 PRIORITY 1 — RANGED optimize (5+ → 3/4)
	// 	if(this.ranged) {
	// 		if(myRing > 4) {
	// 			if(target.ringLevel > 2)
	// 			for(let i = 3; i <= target.ringLevel; i++)
	// 				if(orders[i] > 0) 
	// 					candidateRings.push(i);
	// 		}
	// 	}
	// 	else {
	// 		// 🎯 PRIORITY 2 — melee stuck in ranged slot
	// 		if(this.slot.ranged) {
	// 			if(orders[1] > 0) candidateRings.push(1);
	// 			if(orders[2] > 0) candidateRings.push(2);
	// 			//There can be some melee slots in same ring
	// 			if(candidateRings.length === 0 && this.slot.ring > 2)
	// 				for(let i = 3; i <= this.slot.ring; i++)
	// 					if(orders[i] > 0) 
	// 						candidateRings.push(i);
	// 		}

	// 		// 🎯 PRIORITY 3 — default forward push
	// 		for(let r = 1; r < myRing; r++) {
	// 			if(orders[r] > 0 && !candidateRings.includes(r))
	// 				candidateRings.push(r);
	// 		}
	// 	}

	// 	if(candidateRings.length === 0)
	// 		return true;

	// 	const targetCenterX = target.HURTLEFT + target._HURTBOX_half;
	// 	const myCenterX = this.HURTLEFT + this._HURTBOX_half;
	// 	const amILeft = myCenterX < targetCenterX;

	// 	for(const ring of candidateRings) {

	// 		const ringSlots = target.slotsByRing[ring];
	// 		if(!ringSlots) continue;

	// 		let bestSlot = null;
	// 		let bestDist = Infinity;

	// 		for (const s of ringSlots) {

	// 			if (s.occupied)
	// 				continue;

	// 			if (amILeft && s.type === "front") continue;
	// 			if (!amILeft && s.type === "back") continue;

	// 			// ranged constraint
	// 			if(this.ranged && !s.ranged)
	// 				continue;

	// 			const dx = (targetCenterX + s.xGap) - myCenterX;
	// 			const dist = Math.abs(dx);

	// 			if (dist < bestDist) {
	// 				bestDist = dist;
	// 				bestSlot = s;
	// 			}
	// 		}

	// 		if(bestSlot) {

	// 			this.releaseSlot();

	// 			// 🔥 ORDER TÜKET
	// 			if(target.releasedSlotOrders[ring] > 0)
	// 				target.releasedSlotOrders[ring]--;

	// 			return null;
	// 		}
	// 	}

	// 	return true;
	// };
	this.tryCheckBetterSlot = function() {

		if (!this.slot)
			return true;

		if(this.slot.ring === 1 || (_gameTick - this.slot.bindTick) < 600)
			return true;
		if(this.slotJustReleasedTick === _gameTick)
			return false;
		if(this.ranged && this.rangedSlotOccupiedTime && 
			(_gameTick - this.rangedSlotOccupiedTime) < this.rangedSlotOccupyDelay)
			return true;
		const target = this.autoTarget;
		const myRing = this.slot.ring;
		const myPriority = this.slotPriority ?? 10;

		const orders = target.releasedSlotOrders;
		if(!orders)
			return true;

		const targetCenterX = target.HURTLEFT + target._HURTBOX_half;
		let currentSlotLeft = (targetCenterX + this.slot.xGap);
		if(currentSlotLeft < 0 || (currentSlotLeft + platformX) > episode.width){
			this.releaseSlot();	
			return true;
		}

		let candidateRings = [];

			// 🎯 PRIORITY 1 — RANGED optimize (5+ → 3/4)
			if(this.ranged) {
				if(myRing > 4) {
					if(target.ringLevel > 2)
					for(let i = 3; i <= target.ringLevel; i++)
						if(orders[i] > 0) 
							candidateRings.push(i);
				}
			}
			else {
				// 🎯 PRIORITY 2 — melee stuck in ranged slot
				if(this.slot.ranged) {
					if(orders[1] > 0) candidateRings.push(1);
					if(orders[2] > 0) candidateRings.push(2);
					//There can be some melee slots in same ring
					if(candidateRings.length === 0 && this.slot.ring > 2)
						for(let i = 3; i <= this.slot.ring; i++)
							if(orders[i] > 0) 
								candidateRings.push(i);
				}

				// 🎯 PRIORITY 3 — default forward push
				for(let r = 1; r < myRing; r++) {
					if(orders[r] > 0 && !candidateRings.includes(r))
						candidateRings.push(r);
				}
			}

		if(candidateRings.length === 0)
			return true;

		const myCenterX = this.HURTLEFT + this._HURTBOX_half;
		const isTargetLeft = myCenterX > targetCenterX;

		// const slotSideWrong =
		// 	(!isTargetLeft && this.slot.type === "front") ||
		// 	(isTargetLeft && this.slot.type === "back");

		// if(slotSideWrong && !this.slot.mustCross) {
		// 	if(this.ranged)
		// 		console.log('Geliom');
		// 	this.releaseSlot(6); // direkt bırak → yeni slot seçilecek
		// 	return true;
		// }
		for(const ring of candidateRings) {

			const ringSlots = target.slotsByRing[ring];
			if(!ringSlots) continue;

			let bestSlot = null;
			let bestScore = Infinity;

			for (const s of ringSlots) {
				if(s === this.slot || s.attacking)
					continue;
				// side constraint
				if (!isTargetLeft && s.type === "front") continue;
				if (isTargetLeft && s.type === "back") continue;

				// ranged / melee constraint
				if(this.ranged && !s.ranged) continue;
				let score = Infinity;
				let slotLeft = (targetCenterX + s.xGap);
				if(slotLeft < 0 || (slotLeft + platformX) > episode.width)
					continue;	
				if (!s.occupied) {
					// 🟢 boş slot
					const dx = slotLeft - myCenterX;
					score = Math.abs(dx);
				}
				else {
					// 🔴 DOLU SLOT → STEAL CHECK
					const other = s.occupant;
					if(!other || other === this)
						continue;

					const otherPriority = other.slotPriority ?? 10;

					// ✅ CASE 1: normal priority steal
					let canSteal = otherPriority > myPriority;

					// ✅ CASE 2: ranged → melee steal (eşit priority ise)
					if(!canSteal && this.ranged && !other.ranged && otherPriority === myPriority) {
						canSteal = true;
					}
					
					if(!canSteal)
						continue;

					// çok yakınsa steal et (daha agresif)
					const dx = (targetCenterX + s.xGap) - myCenterX;
					score = MathAbs(dx) * 0.5; // steal bonus
				}

				if (score < bestScore) {
					bestScore = score;
					bestSlot = s;
				}
			}

			if(bestSlot) {

				// 🔥 STEAL varsa önce adamı düşür
				if(bestSlot.occupied && bestSlot.occupant) {
					bestSlot.occupant.releaseSlot();
				}

				this.releaseSlot();
				bestSlot.occupied = true;
				bestSlot.occupant = this;
				if(this.ranged)
				{
					this.rangedSlotOccupiedTime = _gameTick;
					this.rangedSlotOccupyDelay = getRandomValue2(800, 1200);
				}
				this.slot = bestSlot;
				this.slot.bindTick = _gameTick;
				this.reactionDelay =
					getRandomValue2(300, 600) * (this.slot.ring + 1);
				// order tüket (sadece boş slot senaryosunda mantıklı ama yine azaltıyoruz)
				if(target.releasedSlotOrders[ring] > 0)
					target.releasedSlotOrders[ring]--;

				return null;
			}
		}

		return true;
	};
    this.autoCommand2 = function () { 
        if (this.harmless || (episode.realTime && this.alp))
            return;
        if(!this.animationFinished && this.animations[this.animation]?.attack)
            return;
        if(this.isDead()) {
            this.releaseSlot(true);
            return;
        }
		if(this.animation === 'idle' && this.reactionStartTime && _gameTick < this.reactionStartTime)
            return;
        if(!this.autoTarget || this.autoTarget.isDead())
            this.pickNewTarget();
        if(!this.autoTarget || this.autoTarget.isDead())
        {
            if(this.animation !== 'idle')
                this.idle(201);
            return;
        }
        if(!this.autoTarget.slots){
            this.autoTarget.createSlots(1);
        }
		if(this.touchDead && this.autoTarget && isObjectsInTouch(this, this.autoTarget).touch) {
			this.toucher = this.autoTarget;
			this.animate(this.deadAnimationKey ?? 'dead', 1);
			return;
		}
        const _away = this.animation === 'release'  || this.animation.startsWith('knockback') || this.invisible;
        if(((this.slot && (this.slot.owner?.isDead?.() || 
			(!this.slot.support && this.slot.owner !== this.autoTarget))) || _away)){
            this.releaseSlot();
        }
        let _anima = this.getCurrentAnimation();
        if ((_anima.hurt && !this.animationFinished && (!this.hasChain || this.noCounter)) || this.animation === 'release' || this.dying || this.dead || this.immobilize) {
            this.autoAttacking = false;
            if(this.slot)
                this.slot.attacking = false;
            return;
        }
        //if(!this.ranged) {
			this.validateSlot();
			if(!this.tryCheckBetterSlot())
				return null;
			const _pickedSlot = this.pickSlotOrder();
			if(!_pickedSlot) {
				if(this.ranged) {
					while(this.autoTarget.ringLevel < 3) {
						this.autoTarget.createSlots(this.autoTarget.ringLevel + 1);
					}
				}
				else
					this.autoTarget.createSlots(this.autoTarget.ringLevel + 1);
				this.pickSlotOrder();
			}
            //eğer bir slot varsa isObjectsInTouch için 2. parametremiz bu slotun koordinatı olmalı eğer yok ise this.autoTarget olmalı
            let _target;
            if (this.slot) {
                if(!this.upcomingAnimation)
                    this.pickRandomAttack();
                _target = this.updateSlot();

                if(!_target)
                    return;
            }
            // else {
            //     // let hasEmptySlot = this.autoTarget.dirtySlots?.length > 0;
            //     // if(!hasEmptySlot && this.autoTarget.dirtySlots !== undefined)
            //     this.pickSlotOrder();
            //     if(this.slot){
            //         _target = this.updateSlot();
            //         if(!_target)
            //             return;
            //     }
            // }
            _target = _target ?? this.autoTarget;
			const _area = this.getTouchAreaBySlot();
            const _touch = isObjectsInTouch(_area, _target);
			//const _canAttack = (_target.attackerCount ?? 0) < 2 && !this.slot?.support;
			let _canAttack = false, _isPlacing = false;	
			if(this.autoTarget?.lastHitTime && (_gameTick - this.autoTarget.lastHitTime) < 
				(this.getAttackMsByDifficulty() * (this.ranged ? .66 : 1))) {
				_canAttack = false;
			}
			else {
				if(!this.nextAttackTime || _gameTick > this.nextAttackTime){
					if(this.ranged)
						_canAttack =
							((_target.attackers?.rangeds?.length ?? 0) < 1) &&
							this.slot &&
							!this.slot.mustCross;
					else
						_canAttack =
							((_target.attackers?.melees?.length ?? 0) < 2) &&
							this.slot &&
							!this.slot.support &&
							!this.slot.mustCross;
				}
			}
			if(!_canAttack && this.bestRing)
				_canAttack = true; // bestRing'li moblar slot kısıtlamasına takılmaz, her zaman saldırabilir
			// if(this.lookingAtTarget && this.slot?.support && !this.slot?.parent?.support && this.animation === 'idle')
			// {
            // 	const _supportTouch = isObjectsInTouch(_area, this.slot.owner.getTouchAreaBySlot());
			// 	if(_supportTouch.touch) {
			// 		const _supportSlot = this.slot.parent;
			// 		if(_supportSlot && (_gameTick - _supportSlot.lastAttackTime) >= (this.getAttackMsByDifficulty() + getRandomValue2(0, 120))) {
			// 			this.pickRandomAttack();
			// 			if(this.upcomingAnimation && this.upcomingAnimation !== 'idle'){
			// 				this.animateSlotAttack(_supportSlot);
			// 				_supportSlot.lastAttackTime = _gameTick;
			// 				return;
			// 			}
			// 		}
			// 	}
			// }
			//if(this.touching !== _touch.touch)
            if(_touch.touch && this.lookingAtTarget) {
				// if(this.slot?.mustCross) {
				// 	this.oldDirection = this.direction;
				// 	this.direction = this.slot.xGap > 0 ? __left : __right;
				// 	this.turned = this.oldDirection !== this.direction;
				// 	this.slot.mustCross = false;
				// }
				if(this.slot?.mustCross) {

					const myOrigin = this.HURTLEFT + this._HURTBOX_half;
					const ownerOrigin = this.slot.owner.HURTLEFT + this.slot.owner._HURTBOX_half;

					// doğru yöne bak
					this.oldDirection = this.direction;
					this.direction = this.slot.xGap > 0 ? __left : __right;
					this.turned = this.oldDirection !== this.direction;

					// gerçekten karşıya geçti mi kontrol et
					const crossed =
						(this.slot.type === "back"  && myOrigin < ownerOrigin) ||
						(this.slot.type === "front" && myOrigin > ownerOrigin);

					if(crossed)
						this.slot.mustCross = false;
				}
                if(this.animation !== 'idle' && !this.slot?.mustCross){
                    if(this.slot)
                        this.slot.attacking = false;
                    this.idle(200);
					if(this.autoTarget) {
						const _thisOrigin = this.HURTLEFT + this._HURTBOX_half;
						const _targetOrigin = this.autoTarget.HURTLEFT + this.autoTarget._HURTBOX_half;
						if(_targetOrigin < _thisOrigin && this.direction !== __left) {
							this.direction = __left;
							this.turned = true;
						}
						else if(_targetOrigin > _thisOrigin && this.direction !== __right){
							this.direction = __right;
							this.turned = true;
						}
					}
					if(this.slot)
                    	this.slot.lastAttackTime = _gameTick;
                }
                if(this.slot && !this.slot.lastAttackTime)
                    this.slot.lastAttackTime = _gameTick;
                if(this.slot && _canAttack && (this.bestRing || (!this.nextAttackTime || _gameTick >= this.nextAttackTime))) {
                    this.pickRandomAttack();
                    if(this.upcomingAnimation && this.upcomingAnimation !== 'idle'){
                        this.animateSlotAttack();
						this.slot.lastAttackTime = _gameTick;
					}
                }
				_isPlacing = true;
            }
            else {
                if(this.lookingAtTarget){
                    this.lookingAtTarget = false; 
					if(this.reactionDelay) {
						this.reactionStartTime = _gameTick + this.reactionDelay;
						return;
					}
				}  
                if(isObjectsVerticallyInSameOrder(_area, _target)) {
                    if(this.animation !== 'walk'){
                        this.animate('walk', 1);
					}
                    _anima = this.getCurrentAnimation();
                    _anima.mobilityY = true;
					if(this.lookingAtTarget)
                        this.moveDirection = undefined;
                    else if(this.yPosition < _target.yPosition && this.moveDirection !== 'up')
                        this.moveDirection = 'up';
                    else if(this.yPosition > _target.yPosition && this.moveDirection !== 'down')
                        this.moveDirection = 'down';
                    if (MathAbs(_target.yPosition - this.yPosition) <= this.verticalStep) {
                        this.lookingAtTarget = true;
						if(this.slot && _touch.touch)
							this.slot.placed = _isPlacing = true;
						this.autoStepXRate = 0;
						// if(!this.slot?.support && this.slots) {
						// 	this.slots.forEach(s => s.occupant?.releaseSlot?.());
						// }
                    }
                }
				else {
					const _thisOrigin = this.HURTLEFT + this._HURTBOX_half;
					const _targetOrigin = _target.HURTLEFT + _target._HURTBOX_half;
					const _yDiff = MathAbs(this.yPosition - _target.yPosition);
					if(this.autoTarget && _canAttack && this.upcomingAnimation && _yDiff < getGroundHeight() / 3) {
						const _newAnima = this.animations[this.upcomingAnimation];
						if(_newAnima && _newAnima.attack && _newAnima.chargeDistance) {
							const _realTargetOrigin = this.autoTarget.HURTLEFT + this.autoTarget._HURTBOX_half;
							const _realDiff = (MathAbs(_realTargetOrigin - _thisOrigin) * 100) / episode.cWidth;
							_newAnima.useExtraStepXRate = (_realDiff < _newAnima.chargeDistance.value && _realDiff > (_newAnima.chargeDistance.value * .5));
							if(_newAnima.useExtraStepXRate) {
								this.animateSlotAttack();
								this.slot.lastAttackTime = _gameTick;
								return;
							}
						}
					}
					if(_thisOrigin < _targetOrigin && this.direction !== __right) {
						this.direction = __right;
						this.turned = true;
					}
					else if(_thisOrigin > _targetOrigin && this.direction !== __left) {
						this.direction = __left;
						this.turned = true;
					}	
					const maxInfluenceDistance = MathRound(episode.cWidth * 0.4); 
					const _autoTargetOrigin = this.autoTarget.HURTLEFT + this.autoTarget._HURTBOX_half;
					const diffX = Math.abs(_autoTargetOrigin - _thisOrigin);
					if(!this.noSpeedChange) {
						let _runAway;
						const _targetExactOrigin = this.autoTarget ?
							this.autoTarget.HURTLEFT + this.autoTarget._HURTBOX_half 
							: _targetOrigin;
						if((_thisOrigin < _targetExactOrigin && this.direction === __left)
							||
							(_thisOrigin > _targetExactOrigin && this.direction === __right))
							_runAway = 1;
						if(_runAway || (diffX > maxInfluenceDistance && !this.slot?.support)) {
							if(_runAway || (diffX > episode.cWidth || getRandomValue2(1, 10) === 10)) {
								if(this.slot && this.animation !== 'run') {
									this.animate('run', 1);
									this.autoStepXRate = 1;
									if(!this.extraStepXRate)
										this.extraStepXRate = this.calculateMoveXStep();
								}
								else if(this.slot && _runAway)
									this.autoStepXRate = 1;
							}
							else if(this.animation !== 'run') {
								if(this.animation !== 'walk')
									this.moveDirection = undefined;
								if(this.extraStepXRate > 0)
									this.extraStepXRate = 0;
							}
						}
						else {
							if(this.animation !== 'walk'){
								this.animate('walk', 1);
							}
							_anima = this.getCurrentAnimation();
							_anima.mobilityY = false;
							this.moveDirection = this.direction;
							if(this.slot?.support)
								this.autoStepXRate = .5 + ((diffX / episode.cWidth) * 0.1);
							else
								this.autoStepXRate = .5 + ((diffX / episode.cWidth) * 0.5);
							if(!this.extraStepXRate)
								this.extraStepXRate = this.calculateMoveXStep();
						}
					}
					this.organizeAutoYPosition(_target, diffX / maxInfluenceDistance);
				}
			}
			if(this.slot?.placed && !_isPlacing)
				this.slot.placed = undefined;
		//}
	}
	this.organizeAutoYPosition = function(_target, maxFactor) {
		if(this.animation !== 'run' && this.animation !== 'walk'){
			this.lookingAtTarget = false;
			return;
		}
		if(this.stop)
			return;
		const _rand = getRandomValue2(1, 4);
		if(maxFactor > 1.2 && _rand > 1){
			this.lookingAtTarget = false;
			return;
		}
		else if(maxFactor > .75 && _rand > 2){
			this.lookingAtTarget = false;
			return;
		}
		const diffY = _target.yPosition - this.yPosition;

		// X mesafesine göre Y düzeltme gücü
		// Yaklaştıkça daha hassas, uzakken daha serbest
		// sahneye göre ayarlayabilirsin
		const distanceFactor = Math.max(0, 1 - maxFactor);

		// Dalgalı hareket için zaman tabanlı sin
		const time = (_gameTick ?? Date.now()) * .005;

		let _mod = this.getRandom(200);
		const wave =
			Math.sin(time + _mod) * .6 +   // ana dalga
			Math.sin(time * .5 + _mod) * .4; // yumuşatma

		// Random mikro jitter
		const jitter = (Math.random() - .5) * .3;

		// Toplam Y düzeltme gücü
		const baseAdjust = .6 * distanceFactor; // yaklaştıkça azalır

		// const yStep =
		// 	MathRound((diffY * 0.04) +            // hedefe yaklaşma eğilimi
		// 	(wave * baseAdjust) +       // doğal dalga
		// 	jitter);                     // mikro kaos
		let yStep = MathRound(
			(diffY * .04) +
			(diffY * wave * baseAdjust * .2) +
			jitter * .2
		);

		// sadece aşırı spike'ı kes
		if (MathAbs(yStep) > MathAbs(diffY))
			yStep = diffY * .5;

		// Çok küçük fark varsa titreşmesin
		if (MathAbs(diffY) > 2) {
			this.yPosition += yStep;
			this.limitYPosition();
		}
	}
	this.autoCommand = function () {
		if (this.keyboard || this.sleep || this.harmless || (episode.realTime && this.alp))
			return;
		if(!this.animationFinished && this.animations[this.animation]?.attack){
			if(!this.chargimg && this.autoTarget && this.start <= 1 && this.getCurrentFrame()?.directionChangeEnabled) {
				const _thisOrigin = this.HURTLEFT + this._HURTBOX_half;
				const _targetOrigin = this.autoTarget.HURTLEFT + this.autoTarget._HURTBOX_half;
				const _diff = _targetOrigin - _thisOrigin;
				const _tol = (4 * episode.cWidth) / 100;
				let _dir = this.direction;
				if (_diff > _tol){
					_dir = __right;
					this.setDirection(_dir, 1);
				}
				else if (_diff < -_tol){
					_dir = __left;
					this.setDirection(_dir, 1);
				}
			}
			return;
		}
		if (this.animation === 'start' || (this.animation === 'before' && !this.animationFinished))
			return;
		const _anima = this.getCurrentAnimation();
		if (this.animationFinished && (_anima.attack || (this.animation === 'before' || this.animation === 'start'))) {
			if (this.animation === 'before' && !this.autoTarget) {
				this.animate('before', 1);
				this.upcomingAnimation = 'before';
			}
			else if (this.animation === 'before' && this.autoTarget) {
				if (this.animations.start)
					this.upcomingAnimation = 'start';
				else {
					this.autoAttacking = false;
					this.idle(91);
					this.pickRandomAttack();
					return;
				}
			}
		}
		if (!_anima?.hurt)
			this.lastAttack = undefined;
		if (this.action?.command === 'move') {
			if (this.LEFT > this.action.to)
				this.direction = __left;
			else
				this.direction = __right;
			if(!this.action.startDirection)
				this.action.startDirection = this.direction;
			let _yMoveSet;
			if(this.action.y !== undefined) {
				if((this.action.y * getGroundHeight()) > this.yPosition && this.action.startYDirection !== 'down')
					_yMoveSet = this.moveDirection = 'up';
				else if((this.action.y * getGroundHeight()) < this.yPosition && this.action.startYDirection !== 'up')
					_yMoveSet = this.moveDirection = 'down';
			}
			if(!this.action.startYDirection)
				this.action.startYDirection = _yMoveSet;
			if(this.direction !==  this.action.startDirection) {
				this.direction = this.action.startDirection;
				if(this.action.after)
					this.action.after(this);
				if(!this.action.repeat)
					this.action = undefined;
				this.moveDirection = undefined;
				return;
			}
			if(!_yMoveSet)
				this.moveDirection = this.direction;
			this.autoAttacking = false;
			this.run(this.getCurrentAnimation(), this.direction, _yMoveSet, 7);
			return;
		}
		if (this.friendly && (!episode.pvp || episode.hasEnemyAlive(this)) && !this.still && !this.isDead() && !episode.seenEnemies?.
		find(x => x.enemy && !x.invulnerable && !x.isDead() && x.autoTarget && x.autoMode > 0)) {
			this.follow(mainCharacter);
			return;
		}
		if ((this.animations[this.animation].interactive && this.animation !== 'before' && this.animation !== 'start') || this.finishing || this.attackingOnlyBy) {
			if (this.animationFinished) {
				this.idle(92);
				this.upcomingAnimation = undefined;
			}
			this.autoAttacking = false;
			return;
		}
		if (this.isDead()) {
			this.upcomingAnimation = undefined;
			this.autoAttacking = false;
			return;
		}
		if ((_anima.hurt && !this.animationFinished && (!this.hasChain || this.noCounter)) || this.animation === 'release' || this.dying || this.dead || this.immobilize) {
			this.autoAttacking = false;
			return;
		}
		else if(_anima.hurt && this.autoAttacking)
			this.autoAttacking = false;
		let _hurtingFinished;
		if (_anima.hurt && this.animationFinished)
			this.upcomingAnimation = _hurtingFinished = 'idle';
		let _dir = this.direction;
		if (this.autoAttacking) {
			if(this.autoTarget) {
				if(!this.chargimg && this.start <= 1 && this.getCurrentFrame()?.directionChangeEnabled) {
					const _thisOrigin = this.HURTLEFT + this._HURTBOX_half;
					const _targetOrigin = this.autoTarget.HURTLEFT + this.autoTarget._HURTBOX_half;
					const _diff = _targetOrigin - _thisOrigin;
					const _tol = (4 * episode.cWidth) / 100;
					if (_diff > _tol)
						_dir = __right;
					else if (_diff < -_tol)
						_dir = __left;
					this.setDirection(_dir, 1);
				}
			}
			return;
		}
		else
			this.upcomingAnimation = undefined;
		if(_anima.hurt && this.hasChain && !this.noCounter && !this.animationFinished){
			this.pickRandomAttack(null, null, 1);
			if(this.upcomingAnimation === 'idle')
				return;
		}
		let _enemy;
		let _isEnemyClose = false;
		if ((!this.autoAttacking || (this.animationFinished && this.frame > 0) || (_anima.imediateBreak && !_anima.channeling && !_anima.attack)) &&
			(!this.upcomingAnimation || (this.animations[this.upcomingAnimation]?.coolDownLeft ?? 0) <= 0)) {
			if (!this.upcomingAnimation)
				this.pickRandomAttack(null, null, 1);
			let _newAnima = this.animations[this.upcomingAnimation];
			if(!_newAnima)
				return;
			const _range = _newAnima.totalRange ?? 0;
			let _charge = false;
			_enemy = this.getClosestEnemy(0, _dir, function (_e) {
				return !_e.invulnerable && !_e.isDead();
			}, _newAnima.yRange, __attackTolerance);
			_isEnemyClose = _enemy?.enemy;
			if (_range > 0 && !_isEnemyClose) { // && _newAnima.move) {
				//yakınında ve baktığın yönde düşman var mı
				//if (!_enemy?.enemy) {
				//yoksa sıradaki skilinin atış mesafesine bak
				_enemy = this.getClosestEnemy(_range, _dir, function (_e) {
					return !_e.invulnerable && !_e.isDead();
				}, _newAnima.yRange, __attackTolerance, this.animations[this.upcomingAnimation]?.chargeDistance);
				_charge = true;
				//}
			}
			//else {
			//yakınında düşman var mı
			//_enemy = this.getClosestEnemy(_range ?? 0, _dir, function (_e) {
			//	return !_e.invulnerable && !_e.isDead();
			//}, _newAnima.yRange);
			//_isEnemyClose = (_enemy?.enemy && !_range);
			//}
			if (_enemy?.enemy) {
				if (!(_enemy.enemy.related ?? _enemy.enemy).invulnerable)
					this.setAutoTarget(_enemy.enemy, null, 3);
				_newAnima.useExtraStepXRate = _charge;
				if(_isEnemyClose && this.touchDead && !this.isDead()) {
					if(_enemy.enemy.class !== 'minion') {
						this.toucher = _enemy.enemy;
						this.animate(this.deadAnimationKey ?? 'dead', 1);
						return;
					}
				}
				if (this.animation !== 'before' && (!_anima.hurt || (_anima.hurt && _newAnima.chain))) {
					if(this.animation === 'walk' && !this.animationFinished && this.upcomingAnimation === 'idle')
						return;
					if (this.animateAutoAnimation(1, _enemy.enemy, _isEnemyClose)) {
						if (this.animation === 'run')
							this.idle(96);
						return;
					}
					if(_anima.hurt) {
						this.upcomingAnimation = 'idle';
						return;
					}
				}
			}
		}
		else if(!this.animationFinished || this.autoAttacking)
			return;
		//EĞER ATAK Yapmıyorsa, ölmediyse, release olmuyorsa vs ve skill atacağı veya vuracağı mesafede
		//düşman yoksa buraya gelir
		//Burada hedefinde düşman varsa düşman seçilir yoksa görüş alanında düşman var mı diye bakılır y 100 alınır
		const _sight = (!this.dmgTaken || this.friendly || episode.pvp) && this.sight ? this.sight : (this.dmgTaken ? 100 : /*MathCeil(_canvas.width / (this.sight ?? 100))*/ this.sight ?? 100);
		if (!_enemy?.enemy)
			_enemy = this.autoTarget ? {
				enemy: this.autoTarget
			} : this.getClosestEnemy(_sight, _dir, function (_e) {
				return !_e.invulnerable && !_e.isDead();
			}, 100, __attackTolerance);
		//Eğer önceden hedefe kitlediği varsa
		if (this.autoTarget) {
			//Eğer hedef ölmüş ise hedeften çıkartılıp idle durumuna geçilir
			if (this.autoTarget.isDead()) {
				this.autoTarget = undefined;
				this.pickNewTarget();
				this.upcomingAnimation = 'idle';
				return;
			}
			//else if (!_isEnemyClose) {
			//hedefteki düşman ile biz çok yakın mıyız uzaksak ne kadar uzağız
			const _t = isObjectsInTouch(this, this.autoTarget, null, __attackTolerance);
			const _r = !_t.touch ? MathFloor((_t.originDiff * 100) / episode.cWidth) : 0;
			//hedef ile aramızda belli bir mesafe varsa o mesafeye göre skill seç
			if (_r > 0)
				this.pickRandomAttack(null, _r, 1);
			//eğer çok yakınsak close değişkenine değer at
			_isEnemyClose = _t.touch;
			//}
			//x eksemimdeki farka bakıp yönünü değiştir
			const _diff = _enemy.enemy.EXACTLEFT - this.EXACTLEFT;
			const _tol = (4 * episode.cWidth) / 100; //this.animationFinished ? 0 : (4 * _canvas.width) / 100;
			if (_diff > _tol)
				_dir = __right;
			else if (_diff < -_tol)
				_dir = __left;
		}
		//düşman yoksa yönünü direk değiştir tekrar görüş alanına giren biri var mı diye bak Y Eksenini 100 al
		if (!_enemy?.enemy) {
			_dir = _dir === __left ? __right : __left;
			_enemy = this.getClosestEnemy(_sight, _dir, function (_e) {
				return !_e.invulnerable && !_e.isDead();
			}, 100, __attackTolerance);
		}
		if (_enemy?.enemy && this.health > 0) {
			//düşman var yaşıyor ve hedef seçilmemiş ise onu hedef seç
			if (!this.dmgTaken && this.autoMode === 2 && !this.autoTarget &&
				!(_enemy.enemy.related ?? _enemy.enemy).invulnerable) {
				this.setAutoTarget(_enemy.enemy, null, 4);
				if (this.enemy)
					this.setAutoMode(2);
			}
			if(_isEnemyClose && this.touchDead && !this.isDead()) {
				this.toucher = _enemy.enemy;
				this.animate(this.deadAnimationKey ?? 'dead', 1);
				return;
			}
			//yön sabitse
			if (this.direction === _dir) {
				if (!this.still) {
					if (!_isEnemyClose) {
						if (this.getClosestEnemy(0, _dir, function (_e) {
							return !_e.invulnerable && !_e.isDead();
						}, this.upcomingAnimation ? this.animations[this.upcomingAnimation].yRange : _anima.yRange, __attackTolerance)?.enemy)
							_isEnemyClose = true;
					}
					let _enm = _enemy.enemy;
					if (!_isEnemyClose) {

						if (this.animationFinished || this.animation === 'walk') {
							if (this.animation === 'walk' && this.animations.run && !this.animationFinished && !this.ranged
								&& this.frame < this.animations.run.frames.length - 1) {
								const _oldStart = this.start;
								const _oldFrame = this.frame;
								this.run(_anima, _dir, null, 1);
								this.start = _oldStart;
								this.frame = _oldFrame;
							}
							else {
								if(!this.ranged){
									if(isObjectsVerticallyInSameOrder(this, _enemy)){
										this.setDirection(_dir, 1);
										if(this.yPosition > _enemy.yPosition && this.moveDirection !== 'down')
											this.moveDirection = 'down';
										else if(this.yPosition < _enemy.yPosition && this.moveDirection !== 'up')
											this.moveDirection = 'up';
										this.animate('walk', 1);
									}
									else
										this.run(_anima, _dir, null, 2);
								}
								else {
									let _wait;
									if(!this.upcomingAnimation)
										this.pickRandomAttack(null, null, 1);
									if(this.upcomingAnimation) {
										const _ua = this.animations[this.upcomingAnimation];
										if(_ua && _ua.totalRange && _enemy.range && _ua.totalRange >= ((_enemy.range / episode.cWidth) * 100))
											_wait = 1;
									}

									if(_wait)
										this.idle(95);
									else {
										this.upcomingAnimation = undefined;
										this.run(_anima, _dir, null, 3);
									}
								}
							}
							this.autoAttacking = false;
						}
					}
					else {
						if (!this.puppetMode && (this.animationFinished || this.animation === 'run' || this.animation === 'idle')) {
							const _touch = isObjectsInTouch(this, _enm)?.touch;
							if (!_touch && (this.yPosition !== _enm.yPosition) && this.yPosition <= getGroundHeight() && _enm.yPosition <= getGroundHeight() && this.animations.walk) {
								if (this.animation == 'run' && this.frame < this.animations.walk.frames.length - 1) {
									const _oldStart = this.start;
									const _oldFrame = this.frame;
									this.animate('walk');
									this.start = _oldStart;
									this.frame = _oldFrame;
								}
								else
									this.animate('walk');
							}
							else {
								if (!this.friendly) {
									if (this.upcomingAnimation && this.upcomingAnimation !== 'idle') {
										if (!this.animateAutoAnimation(2,_enm,_isEnemyClose)) {
											//if (this.animation !== 'idle' && this.animation !== 'run')
											this.upcomingAnimation = undefined;
											this.idle(11);
										}
									}
									else if (this.animation !== 'idle'){
										this.upcomingAnimation = undefined;
										this.idle(5);
									}
								}
							}
						}
						this.autoAttacking = this.getCurrentAnimation().attack;
					}
					if (this.autoTarget) {
						const _target = this.autoTarget; // episode.enemies.find(x => x.key === this.autoTarget.key);
						if (_target)
							_enm = _target;
					}
					if (!this.puppetMode && (this.animation === 'run' || this.animation === 'walk')) {
						const _originDiff = MathAbs((this.EXACTLEFT) - (_enm.EXACTLEFT));
						const _range = MathCeil((_originDiff / episode.cWidth) * 100);
						if(this.frame === 0 && this.start === 0 && !this.alp) {
							if(_range > 66)
								this.autoStepXRate = this.autoStepYRate = (getRandomValue(35,55) / 100);
							else if(_range > 33)
								this.autoStepXRate = this.autoStepYRate = (getRandomValue(55, 75) / 100);
							else
								this.autoStepXRate = this.autoStepYRate = undefined;
							this.animations[this.animation].moveInYCoords = (_isEnemyClose || getRandomValue(-_range, 100) > _range);
						}
						if (!this.stop && !(this.getFps() > 1) && this.getRandom(20) > 5 && (this.animations[this.animation].moveInYCoords || this.alp)) {
							var _up = this.yPosition >= _enm.yPosition, _verticalStep;
							// const _isTargetRunning = this.autoTarget?.animation === 'run' ||
							// 	this.autoTarget?.animation === 'walk';
							// const _hasPassed = _isTargetRunning ?
							// 	(this.lastYPositionSync + 200) < _gameTick : true;
							//const _run = this.getRandom(20) > 5;
							if (getRandomValue(1, 2) < 2 && MathAbs(this.yPosition - _enm.yPosition) < MathCeil(getGroundHeight() / 150))
								this.yPosition = _enm.yPosition;
							else if (this.yPosition > _enm.yPosition){
								_verticalStep = this.calculateYStep();
								this.yPosition -= MathCeil(_verticalStep / ((_verticalStep > 4 && !this.alp)? getRandomValue(2, MathFloor(_verticalStep / 2)) : 1));// MathCeil(getGroundHeight() / (_range > 100 ? getGroundHeight() : (_isEnemyClose ? getGroundHeight() / 2 : getGroundHeight() / this.randomStep)));
								if(this.yPosition < _enm.yPosition)
									this.yPosition = _enm.yPosition;
							}
							else if (this.yPosition < _enm.yPosition) {
								_verticalStep = this.calculateYStep();
								this.yPosition += MathCeil(_verticalStep / ((_verticalStep > 4 && !this.alp) ? getRandomValue(2, MathFloor(_verticalStep / 2)) : 1)); // MathCeil(getGroundHeight() / (_range > 100 ? getGroundHeight() : (_isEnemyClose ? getGroundHeight() / 2 : getGroundHeight() / this.randomStep)));
								if(this.yPosition > _enm.yPosition)
									this.yPosition = _enm.yPosition;
							}
							if(this.yPosition < _enm.yPosition && _up)
								this.yPosition = _enm.yPosition;
						}
					}
					else
						this.autoStepXRate = this.autoStepYRate = undefined;
				}
				else if (!this.chargimg && this.getCurrentFrame()?.directionChangeEnabled)
					this.setDirection(_dir, 1);
				else if(this.animationFinished)
					if (!this.animateAutoAnimation(4,_enemy?.enemy,_isEnemyClose)) {
						this.upcomingAnimation = undefined;
						this.idle(21);
					}
			}
			else {
				if (this.still && !_isEnemyClose) {
					const _newEnemy = this.getClosestEnemy(0, _dir, function (_e) {
						return !_e.invulnerable && !_e.isDead();
					}, _anima.yRange, __attackTolerance);
					_isEnemyClose = _newEnemy?.enemy;
					if(_newEnemy)
						_enemy = _newEnemy;
				}
				if (!this.still || (this.still && _isEnemyClose) || (this.still && this.ranged && _enemy?.enemy)) {
					this.setDirection(_dir);
					this.moveDirection = _dir;

					this.pickRandomAttack(null, null, 1);
					if (this.upcomingAnimation) {
						_enemy = this.getClosestEnemy(0, this.direction, function (_e) {
							return !_e.invulnerable && !_e.isDead();
						}, this.animations[this.upcomingAnimation].yRange, __attackTolerance);
						if (_enemy?.enemy)
							if (!this.animateAutoAnimation(3,_enemy.enemy,_isEnemyClose)){
								this.idle(10);
								this.upcomingAnimation = undefined;
							}
					}

				}
				if (!this.friendly) {
					this.upcomingAnimation = undefined;
					this.pickRandomAttack(null, null, 1);
					if(_hurtingFinished && this.upcomingAnimation === 'idle')
						this.animate('idle', 1, null, 1);
				}
				return;
			}
		}
		else if (this.friendly && !this.still && !this.isDead() && !episode.pvp)
			if (this.follow(mainCharacter))
				return;
		// if(!_enemy?.enemy && !this.isDead() && this.animation !== 'idle')
		// 	thisc.animate('idle', 1, null, 2);
		this.pickRandomAttack(null, null, 1);
	}
	this.setDirection = function(_dir, _force) {
		if(!this.lastTurnTime && this.enemy)
			this.lastTurnTime = _gameTick - getRandomValue2(0, 350);
		if(this.enemy && this.lastTurnTime > (_gameTick - 700))
			return;
		if(this.noDirection || this.direction === _dir)
			return;
		if(this.enemy)
			this.lastTurnTime = undefined;
		this.direction = _dir;
		if(!_force && this.animation !== 'idle' && this.animation !== 'run' && this.animation !== 'walk')
			return;
		this.turned = true;
	}
	this.animateAutoAnimation = function (_q, _c, _touch) {
		if(this.animation === 'roll' && !this.animationFinished)
			return true;
		const _overwhelmed = this.grade < 2 && !_c.harmless && (_c.attackerCount > _c.maxAttackerCount);
		if(_overwhelmed){
			if(!(this.animation === 'run' || this.animation === 'walk' || this.animation === 'release'))
				this.upcomingAnimation = 'idle';
			else if(this.animation === 'run' || this.animation === 'walk')
				if(isObjectsInTouch(this, _c)?.touch)
					this.upcomingAnimation = 'idle';
				else
					return true;
		}
		let _newAnima = this.animations[this.upcomingAnimation];
		const monsterAttack = this.class !== __spell && _newAnima.attack;
		const _anima = this.getCurrentAnimation();
		const shouldContinue = _anima.next === this.upcomingAnimation;
		if(monsterAttack && !this.lastAttackTime && !this.important)
			this.lastAttackTime = _gameTick;
		else if(!_newAnima.attack)
			this.lastAttackTime = undefined;
		if(!shouldContinue && _c?.class !== 'object') {
			if (monsterAttack && this.lastAttackTime && ((this.lastAttackTime + ((this.friendly ? 0 : this.difficulty) * 500)) > _gameTick))
				return false;
			else if(_c.main && monsterAttack && _overwhelmed)
				return false;
		}
		if(this.commonItem && _newAnima.attack && !_anima.attack) {
			this.useCommonSkill(1);
			this.upcomingAnimation = 'idle';
			return true;
		}
		this.animate(this.upcomingAnimation, null, null, 31);
		this.autoAttacking = _newAnima.attack;
		if (this.autoAttacking){
			this.lastAttack = this.upcomingAnimation;
			if(_c && !episode.pvp && _c.class !== 'object'){
				if(!_c.attackerCount)
					_c.attackerCount = 1;
				else
					_c.attackerCount++;
			}
		}
		this.upcomingAnimation = undefined;
		this.pickRandomAttack();
		return true;
	}
	this.follow = function (_char) {
		if(!_char)
			return false;
		this.attacking = true;
		const _t = isObjectsInTouch(this, _char, 100);
		if ((_t.touch || (_t.originDiff < (episode.cWidth / 10))) && _char.main) {
			this.idleStart = _gameTick;
			if (this.animation !== 'idle' || this.animationFinished)
				this.animate('idle', 1, null, 6);
		}
		else {
			if (this.animation === 'idle' && this.idleStart && ((_gameTick - this.idleStart) < 200))
				return true;
			if (this.EXACTLEFT > _char.EXACTLEFT)
				this.moveDirection = this.direction = __left;
			else
				this.moveDirection = this.direction = __right;
			if(!this.stop) {
				if (MathAbs(this.yPosition - _char.yPosition) < MathCeil(getGroundHeight() / 6)) {

				}
				else if (this.yPosition > _char.yPosition)
					this.yPosition--;
				else if (this.yPosition < _char.yPosition)
					this.yPosition++;
			}
			this.run(this.getCurrentAnimation(), this.direction);
			return true;
		}
		return false;
	}
	this.swapAnimation = function(_key) {
		const _anima = this.animations[_key ?? this.animation];
		if(!_anima || !_anima.alternateFrames)
			return;
		if(_anima.changed) {
			delete _anima.changed;
			_anima.frames = [..._anima.originalFrames];
			_anima.src = _anima.originalSrc;
			if(_anima.resetImage)
				_anima.resetImage();
		}
		else {
			const _rate = getRandomValue2(1, 100) / 100;
			const _a = _anima.alternateFrames?.
			find(x => _rate <= x.rate && (!x.when || x.when(this)));
			if(_a){
				if(!_anima.originalFrames){
					_anima.originalFrames = [..._anima.frames];
					_anima.originalSrc = _anima.src;
				}
				_anima.frames = [..._a.frames];
				if(_a.src){
					_anima.src = _a.src;
					if(_anima.resetImage)
						_anima.resetImage();
				}
				if(_a.rate < 1)
					_anima.changed = 1;
				else
					_anima.looping = 1;
			}
			else if(_anima.looping) {
				delete _anima.looping;
				_anima.frames = [..._anima.originalFrames];
				_anima.src = _anima.originalSrc;
				if(_anima.resetImage)
					_anima.resetImage();
			}
		}
	}
	this.finishAnimation = function () {
		let _anima = this.animations[this.animation];
		if(_anima.chargeStarted)
			_anima.chargeStarted = undefined;
		if(this.animation.startsWith('counter') || _anima.ultimate){
			this.newBlocked = -1 * counterAttackTolerance;
			this.comfortStarted = _gameTick;
		}
		else
			this.newBlocked = false;
		if((this.animation === 'release' || _anima.hurt) && !this.main)
			this.upcomingAnimation = this.animation = 'idle';
		if(_anima?.attack)
			this.lastFinishedAttack = this.animation;
		if(_anima.repeat)
			_anima.repeat = undefined;
		if(_anima.sound?.stop){
			_anima.sound.stop();
			delete _anima.sound;
		}
		if(_anima.once)
		{
			delete this.animations[this.animation];
			this.animation = 'idle';
		}
		else if(_anima.finishingMove)
			this.animation = 'idle';
		this.animationFinished = true;
		if (this.enemy && this.autoMode > 0 && _anima?.attack) {
			this.lastAttackTime = _gameTick;
			if(this.lastAttackSlot) {
				this.lastAttackSlot.lastAttackTime = _gameTick;
				this.lastAttackSlot = undefined;
			}
		}
		if(this.autoAttacking && this.slot && !this.bestRing) {
			this.slot.attacking = false;
			const _target = this.autoTarget;
			if(_target && _target.attackers)
			{
				const _difficultyMS = this.getAttackMsByDifficulty();
				this.nextAttackTime = _gameTick + (_difficultyMS === 0 ? 0 : _difficultyMS + getRandomValue2(0, 120));
				const _ranged = this.ranged;
				if(_ranged)		
					_target.attackers.rangeds = _target.attackers.rangeds.filter(x => x !== this) ?? [];
				else
					_target.attackers.melees = _target.attackers.melees.filter(x => x !== this) ?? [];
			}
		}
		this.autoAttacking = false;
		if(this.pushDirection || this.pushback)
			this.pushDirection = this.pushback = undefined;
		if(this.pull)
			this.pull = undefined;
		if(this.hurting && this.harmless)
			this.animation = 'idle';
		if(this.animations[this.animation]?.alternateFrames)
			this.swapAnimation(this.animation);
		if(this.attackerCount)
			this.maxAttackerCount = getRandomValue2((6 - __account.difficulty), (5 - __account.difficulty) * (6 - __account.difficulty));
		// if(this.socketDirPressed)
		// 	this.socketDirPressed = undefined;
		this.hurting = this.chargeProperties = this.chargimg = this.attackerCount = this.noCounter =
		this.lastSpellTakenKey = this.attacked = this.attacking = this.upcomingAnimation =
		this.randomStep = this.soundPlaying = undefined;
		//this.relatedObjects?.filter(x => x.bind === this.animation && !x.remove)?.forEach(x => x.remove = true);
		if(this.keyboard) {
			const _dirName = this.getKeyboardXMove();
			if(_dirName)
				this.setDirection(_dirName, 1);
		}
		if(_anima?.after)
			_anima.after(this);
		if(this.realTime) {
			if(!this.main && !this.rivalMove && !_anima.hold)
				this.animation = 'idle';
			if(_anima.rivalXMove)
				delete _anima.rivalXMove;
		}
		if(this.slot)
			this.slot.attacking = false;
	}
	this.checkActions = function () {
		if(this.actions)
			for (var _action of this.actions)
				if (_action.when(this)) {
					_action.do(this);
					return;
				}
	}
	this.updateDeadTimer = function () {
		if (!this.deadTime)
			return;
		const _diff = 10 - MathFloor((_gameTick - this.deadTime) / 1000);
		if (_diff < 0) {
			closeGameOverModal();
			reviveAtLobby(this);
		}
		else if (deadCountdown && deadCountdown.innerText !== _diff.toString())
			deadCountdown.innerText = _diff;
	}
	this.checkCast = function () {
		if (this.casting) {
			if(!this.castContainer)
				this.castContainer = document.getElementById('wcast-' + this.key);
			if (this.castContainer) {
				if((this.isDead() || (this.related ?? this).isDead()) && !this.castContainer.animation.startsWith('dead'))
					this.cancelCast();
				else {
					this.castContainer.style.transform = 'translateX(' + (this.castContainer.platformX - (platformX * __scale)) + 'px)';
					this.castContainer.style.setProperty('-webkit-transform', this.castContainer.style.transform);
				}
			}
		}
		else {
			if (this.castContainer) {
				this.castContainer.remove();
				delete this.castContainer;
			}
		}
	}
	this.cancelCast = function () {
		if(!this.castContainer)
			this.castContainer = document.getElementById('wcast-' + this.key);
		if (this.castContainer) {
			this.castContainer.remove();
			delete this.castContainer;
		}
		this.casting = false;
	}
	this.checkUseProgress = function () {
		if (!this.main)
			return;
		if (this.useProgressStart) {
			if (!useProgress)
				useProgress = document.getElementById('use-progress');
			if ((_gameTick - this.useProgressStart) > 1999) {
				this.useProgressStart = undefined;
				removeClass(useProgress, 'use-in-progress');
				if(useProgress?.inProgress)
					delete useProgress.inProgress;
				let _portal = document.getElementById('SPRT-' + this.action?.loot);
				if (_portal)
					_portal.remove();
				if(this.action.enemyKey){
					_portal = episode.seenEnemies.find(x => x.key === this.action.enemyKey);
					if(_portal){
						_portal.npc = undefined;
						if(!_portal.canSkin && _portal.animations.dead)
							_portal.animate('dead', 1);
						else
							_portal.remove = true;
					}
				}
				addClass(_useBtn, 'v-none');
				episode.sprites.filter(x => x.animation.id === (this.action.id ?? this.action?.loot)).forEach(x => {
					if(x.relatedEnemy)
						x.relatedEnemy.remove = true;
					if(!__account.questStatus.quest.after)
						x.remove = true;
					if(x.do)
						x.do(x);
				});
				const _q = __account.questStatus.quest.loots?.find(x => x.object.indexOf(this.action.key) >= 0);
				if (_q && !__account.questStatus.quest.after) {
					if (_q.count === undefined)
						_q.count = 0;
					if (_q.limit > _q.count)
						_q.count++;
					updateQuestArea();
					if(!_q.noInfo) {
						//var _qkey = getLangData(_q.key);
						addDmgFrame({
							item: {key:_q.key, quest: 1},
							//text: '<p data-text="1 x ' + _qkey + '">1 x ' + _qkey + '</p>',
							//class: 'dmg dmg-orange',
							x: this.LEFT,
							from: this,
							y: episode.cHeight - this.yPosition - this.HEIGHT
						});
					}
					PlaySound({ key: 'loot' });
					if (!useProgress)
						useProgress = document.getElementById('use-progress');
					addClass(useProgress, 'v-none');
					_client.upgradeQuestStatus();
				}
				else {
					if (!useProgress)
						useProgress = document.getElementById('use-progress');
					addClass(useProgress, 'v-none');
					if(__account.questStatus.quest.after && !__account.questStatus.quest.loots.find(x => x.limit > x.count))
						__account.questStatus.quest.after();
				}
			}
			if (this.hurting || this.animation !== 'idle') {
				this.useProgressStart = undefined;
				removeClass(useProgress, 'use-in-progress');
				useProgress.inProgress = false;
				addClass(useProgress, 'v-none');
				if(this.actionSound?.stop)
					this.actionSound.stop();
			}

		}
	}
	this.checkBoss = function () {
		if (this.class !== 'boss')
			return;
		if (this.isDead() && !this.minionsRemoved) {
			episode.enemies?.filter(x => x.class === 'minion' && x.owner === this)?.forEach(x => x.remove = true);
			this.minionsRemoved = 1;
		}
	}
	this.checkAutoFillHP = function () {
		if (!this.main && !this.friendly)
			return;
		if (!this.important || episode.lobby)
			return;
		// const _maxHP = this.MAXHP;
		// if (this.health < _maxHP && this.health > 0) {
		// 	if (!this.lastAutoFillHPTime)
		// 		this.lastAutoFillHPTime = _gameTick;
		// 	else if ((_gameTick - this.lastAutoFillHPTime) >= (__autoFillHPMS / (episode.lobby ? 10 : 1))) {
		// 		const _rate = MathFloor((_gameTick - this.lastAutoFillHPTime) / (__autoFillHPMS / (episode.lobby ? 10 : 1)));
		// 		this.setHealth(MathCeil((_maxHP / 100) * __autoFillHPRate * _rate) + this.health, null, null, 2);
		// 		this.lastAutoFillHPTime = _gameTick;
		// 	}
		// }
		if (this.fatique < this.maxFatique) {
			if (!this.lastAutoFillFatiqueTime)
				this.lastAutoFillFatiqueTime = _gameTick;
			else if ((_gameTick - this.lastAutoFillFatiqueTime) >= (_autoFillFaiqueMS / (episode.lobby ? 10 : 1))) {
				this.increaseFatique(MathCeil((this.maxFatique / 100) * __autoFillFatiqueRate));
				this.lastAutoFillFatiqueTime = _gameTick;
			}
		}
	}
	this.checkInCombat = function() {
		return;
		if(!this.main)
			return;
		if(!this.isInFinishingMove() &&
			episode.enemies.find(x => x.enemy &&
				x.class !== 'object' &&
				!x.remove && !x.isDead() &&
				(x.autoTarget === this ||
					x.inCombat ||
					x.realAutoMode !== x.autoMode ||
					x.attacker === this ||
					x.dmgTaken ||
					x.amimation === 'release' ||
					x.release ||
					x.buffs?.find(b => b.key === 'release'))
				)
			)
			episode.playBgMusic();
		else if(!episode.lobby)
			episode.pauseBgMusic();
	}
	this.getStepXRate = function() {
		var _speed = this.stepXRate * (this.puppetMode ? 1 : (this.autoStepXRate ?? 1));
		var _buffSpeed = this.getBuffProps('stepXRate');
		return _speed * (1 + (_buffSpeed / 100));
	}
	this.getSpeedRate = function() {
		var _speed = this.speedRate ?? 1;
		var _buffSpeed = this.getBuffProps('speedRate');
		return _speed * (1 + (_buffSpeed / 100));
	}
	this.resetFatique = function() {
		if(this.fatique < this.maxFatique)
		{
			this.fatique = this.maxFatique;
			const _bar = document.querySelector('#char-' + this.key + ' .defbar-value');
			if (_bar)
				_bar.style.transform = 'scaleX(' + (this.fatique / this.maxFatique) + ')';
		}
	}
	this.getRandom = function(_pos) {
		return ((_gameTick % this.divider) % _pos);
	}
	this.hasXMove = function() {
		return this.rivalMove ?? this.keyboard?.getXMove()?.name;
	}
	this.standUp = function() {
		this.heartCount--;
		this.dmgTaken = 0;
			addClass(document.getElementById('heartcount' + (this.heartCount + 1)), 'gray');
		if(this.heartCount > 0) {
			//this.finishAnimation();
			this.increaseHealth(MathAbs(this.health) + this.MAXHP);
			this.ultimateUsed = false;
			forceResetSkills();
			this.dying = this.dead = this.remove = false;
			this.attackerCount = 0;
			this.addBuff({ key: 'release', level: 3, ms: 3000 });
			this.finishAnimation();
			this.animate('idle', 1);
			episode.enemies.forEach(x => {
				if(x.gradeLeft < (x.grade - 1))
					x.gradeLeft = x.grade - 1;
				if(x.health < x.MAXHP)
					x.setHealth(x.MAXHP);
				x.resetFatique();
				x.fps = 1;
			});
			this.immobilize = this.oldProps.immobilize;
			delete this.deadDramaStart;
		}
	}
	// this.setSound = async function(_sf,_anima) {
	// 	let _volumeRate = 1;
	// 	if(this.soundVolumeRate) {
	// 		_volumeRate *= this.soundVolumeRate;
	// 		delete this.soundVolumeRate;
	// 	}
	// 	if(_sf.skipUnseen && this.unseen) {
	// 		this.soundPlaying = undefined;
	// 		return;
	// 	}
	// 	let _sound = await PlaySound({
	// 		reset: _sf.reset,
	// 		key: (!this.main ? this.name.toLowerCase() : this.class) +
	// 		(typeof _sf === 'string' ? _sf : (_sf?.key ?? this.animation)),
	// 		volume:_sf.volume,
	// 		volumeRate: _volumeRate,
	// 		speed: _sf.speed,
	// 		owner: this,
	// 		bind: _sf.bind
	// 	}, [_sf?.key ??_sf], 1);
	// 	if (_sound && _sf.bind)
	// 		_anima.sound = _sound;
	// 	if(_sound && !this.main && _sf.range) {
	// 		if(_sound.startVolume === undefined)
	// 			_sound.startVolume = _sound.volume;
	// 		const _r = this.getRangeBetween(mainCharacter);
	// 		if(_r > 99)
	// 			_sound.volume = 0;
	// 		else
	// 			_sound.volume = _sound.startVolume * (1 - (_r / 100));
	// 	}
	// 	if(!_sound)
	// 		this.soundPlaying = undefined;
	// }
	this.setSound = async function(_sf,_anima) {

		let _volumeRate = 1;

		if(this.soundVolumeRate) {
			_volumeRate *= this.soundVolumeRate;
			delete this.soundVolumeRate;
		}

		if(_sf.skipUnseen && this.unseen) {
			this.soundPlaying = undefined;
			return;
		}
		_volumeRate = _volumeRate * (getRandomValue2(92,104) / 100);
		let _sound = await PlaySound({
			reset: _sf.reset,
			key: (!this.main ? this.name.toLowerCase() : this.class) +
			(typeof _sf === 'string' ? _sf : (_sf?.key ?? this.animation)),
			volume:_sf.volume,
			loop: _sf.loop,
			volumeRate: _volumeRate,
			speed: (_sf?.speed ?? 1) * (getRandomValue2(95,105) / 100),
			owner: this,
			bind: _sf.bind
		}, [_sf?.key ??_sf], 1);

		if (_sound && _sf.bind)
			_anima.sound = _sound;
		this.setVolume(_sound);

		if(!_sound)
			this.soundPlaying = undefined;
	}
	this.setVolume = function(_sound) {
		if(_sound && !this.main/* && _sf.range*/) {
			
			if(_sound.startVolume === undefined)
				_sound.startVolume = _sound.volume;

			const r = this.getRangeBetween(mainCharacter);
			const MAX_RANGE = 100;
			const minAudible = 0.05;

			// VOLUME (range bazlı)
			let volume = _sound.startVolume;
			if(r > MAX_RANGE)
				volume *= .1;
			else
				volume *= (1 - (r / MAX_RANGE));
			volume = Math.max(volume, minAudible);
			if(!Number.isFinite(volume))
				volume = minAudible;
			if(_sound.gain)
				_sound.gain.value = volume;

			// PAN (ekran referanslı)
			const dx = this.ORIGINLEFT - mainCharacter.ORIGINLEFT;

			// ekran genişliğinin yarısı ideal referans
			const maxPanDistance = episode.cWidth / 2;

			let pan = dx / maxPanDistance;
			pan = Math.max(-1, Math.min(1, pan));

			// uzaklaştıkça stereo etkisi azalır
			const normalizedRange = Math.min(r / MAX_RANGE, 1);
			pan *= (1 - normalizedRange);

			// yön bias (çok hafif)
			if (this.direction === __left)  pan -= 0.05;
			if (this.direction === __right) pan += 0.05;

			if(pan < 0.05 && pan > -0.05) pan = 0;

			if(_sound.pannerNode && Number.isFinite(pan))
				_sound.pannerNode.pan.value = pan;
		}
	}
	this.checkCommonSkills = function() {
		let _active;
		if(!this.lastCommonSkillUsed || (_gameTick - this.lastCommonSkillUsed) > 2000)
			_active = 1;
		if(this.commonSkillsActive && !_active) {
			_commons.forEach(x => {
				removeClass(x, 'cooldown');
				void x.offsetWidth;
				addClass(x, 'cooldown');
			});
			this.commonSkillsActive = false;
		}
		else if(!this.commonSkillsActive && _active) {
			_commons.forEach(x => removeClass(x, 'cooldown'));
			this.commonSkillsActive = true;
		}
	}
	this.checkPotUsage = function() {
		let _active;
		if(!this.lastPotUsage || (_gameTick - this.lastPotUsage) > 2000)
			_active = 1;
		if(!this.potBtn)
			this.potBtn = document.getElementById('pot-btn');
		if(!this.potsActive && _active) {
			removeClass(this.potBtn, 'cooldown');
			this.potsActive = true;
		}
	}
	this.TESTSLOTS = function (){
		showBorders(this.HURTLEFT, _gamePad.clientHeight - this.yPosition, this.HURTWIDTH, 20, this.slot?.mustCross ? 'white' : this.slot && !this.slot.support ? 'orange' : (this.slot ? 'yellow' : (this.main ? 'blue' : 'green')), 'border-' + this.key);
		if(this.slots)
			for(let i = 0; i < this.slots.length; i++) {
				const _slot = this.slots[i];
				// if(_slot.support)
				// 	continue;
				const _xGap = _slot.xGap ?? 0;
				const _origin = this.HURTLEFT + this._HURTBOX_half + _xGap;
				// showBorders(_origin - 10, _gamePad.clientHeight - this.yPosition + (_slot.yGap ?? 0), 
				// 	20, 20, _slot.occupied ? 'pink' : 'red', 'slot-' + i + '-' + this.key);
				showBorders(_origin - 10, _gamePad.clientHeight - this.yPosition + (_slot.yGap ?? 0), 
					20, 20, _slot.occupied ? 'pink' : (_slot.ranged ? 'purple' : 'red'), 'slot-' + i + '-' + this.key);
			}
	}
	this.draw = function (_queue) {
		if(this.remove || (_game.suspended && !this.warm))
			return;
		// if(!this.harmless && this.autoMode > 0 && this.animation === this.lastFinishedAttack)
		// {
		// 	const _a = this.animations[this.animation];
		// 	if(_a?.attack && (_a.coolDownLeft > 0 || _a.next)) {
		// 		this.pickRandomAttack(null, null, 1);
		// 		console.log(1341);
		// 		this.animation = this.upcomingAnimation ?? 'idle';
		// 	}
		// }
		if (!episode.fatality && !episode.pvp && this.main && this.isDead() && !this.deadDramaStart) {
			this.deadDramaStart = _gameTick;
		}
		else if(this.deadDramaStart && ((_gameTick - this.deadDramaStart) > 3000) && this.heartCount > 1) {
			this.standUp();
		}
		if(this.deadDramaStart && ((_gameTick - this.deadDramaStart) > 3000) && !this.deadModalAppeared) {
			this.deadModalAppeared = 1;
			//createStoryResultScreen();
			installStoryFinish(1);
			//GAME OVER
		}
		if (!this.started)
			this.started = true;
		if(this.stop) {
			this.render(this.getCurrentFrame(), _queue);
			return;
		}
		if(this.main) {
			this.checkHitCount();
			this.checkPotUsage();
			this.checkCommonSkills();
			checkTimedQuest();
			this.checkUseProgress();
		}
		else
			this.checkBoss();
		if(this.slots && !this.slot)
			this.assignSlots();
		this.checkInCombat();
		this.checkAutoFillHP();
		this.checkCast();
		this.checkSkills();
		if (this.keyboard)
			this.applyCommand();
		if (!this.main)
			this.checkActions();
		this.start++;
		let _anima = this.getCurrentAnimation();
		if(this.isDead() && !episode.fatality && !this.remove && !this.finishing &&
		!this.attackingOnlyBy && !_anima.interactive && !this.animation.startsWith('dead')){
			if(this.hurting && this.class !== 'object' && !this.phased && !this.still) {
				delete this.hurting;
				this.laying = true;
				_anima.next = 'dead';
				if(!this.heartCount && !episode.pvp){
					_anima.frames = _anima.frames?.filter(x => !x.invisibleWhenLay);
					const _knockDead = this.knockDead;
					const _isImportant = this.important;
					_anima.frames?.forEach(x => {
						if(!x.def)
							x.def = {};
						//x.speed *= 2;
						if(_knockDead && !_isImportant)
							x.speed = MathRound(x.speed * getRandomValue2(130, 150) / 100);
						else if(!_isImportant)
							x.speed = MathRound(x.speed * 1.2);
						if(!x.def.iframe)
							x.def.iframe = true;
						if(!_knockDead)
							x.extraStepXRate = 0;
					});
					const _fLen =  _anima.frames?.length ?? 0;
					if(this.frame >= _fLen && _fLen > 0)
						this.frame = _anima.frames.length - 1;
					if(_fLen > 1) {
						_anima.frames[0].color = _anima.frames[1].color =
						this.skinColor = this.hurtColor = '#FFFFFF';
						this.hitStop = this.knockDead ? getRandomValue2(3,4) : getRandomValue2(5,6);
					}
					else
						this.animate(_anima.next);
					if(!this.knockDead)
						PlaySound({key:'deadeffect1'});
				}
				if(this.hurting?.hit)
					delete this.hurting.hit;
				const _alphaFrame = this.animations?.dead?.frames?.[2];
				if(_alphaFrame && !_alphaFrame.objects)
					_alphaFrame.objects = [{key: 'sparks', position: 'under-feet', speed:2, scale: 1.8, yGap:50}];
				if(!this.chargeDead){
					setTimeout(() => {
						try{
							this.addObject({ key: 'hit2v3', position: 'middle', scale:1.2 });
							this.addObject({ key: 'death', position: 'middle' });
						}catch(cex){}
					}, getRandomValue2(1,3) * (this.animation.startsWith('hurtair') ? 150 : 50));
				}
				if(!this.knockDead)
					this.extraStepXRate = 0;
			}
			else if(!this.laying)
				this.animate('dead', null, null, 1);
		}
		const _move = this.keyboard?.getMove?.() ?? this.rivalMove;
		if (!_anima.move)
			_anima.useExtraStepXRate = true;
		else if ((this.start === 1) && this.frame === 0)
			_anima.useExtraStepXRate = ((this.autoMode || this.push) && this.getCurrentAnimation().useExtraStepXRate) ? true : (this.isXMove(_move) || this.hasXMove());
		let _frame = this.getCurrentFrame();
		if(!_frame)
			console.log('HATA: ' + this.key + ' - ' + this.animation + ' - ' + this.frame);
		if (_frame.do && (this.start === 1))
			_frame.do(this, _anima);
		if (_frame.props)
			this.setProps(_frame.props);
		if (_frame.target && this.target)
			this.target.setProps(_frame.target);
		let _removeEnemy = false;
		this.updateVariables();
		
		
		let _goOn;
		if (this.autoMode && !this.keyboard && this.class !== __spell){
			if(this.important || this.puppetMode || this.immobilize || this.harmless 
				|| this.still || this.action || this.friendly || this.class === 'minion')
				this.autoCommand();
			else
				this.autoCommand2();
		}
		//this.TESTSLOTS();
		
		if (this.autoMode && this.important) {
			if (!this.isDead()) {
				if(this.autoTarget && (_anima.type === 'move' || _anima.key === 'idle') && !this.keyboard && this.animationFinished && this.class !== __spell) {
					const _range = this.getRangeBetween(this.autoTarget);
					// const _arr = this.autoTarget.getClosestAttackers(__maxAttackedCount, _range, function(_e) {
					// 	const _a = _e.getCurrentAnimation();
					// 	return (_a.attack || _a.type === 'move') && _e !== this;
					// });
					//if(_arr?.length >= __maxAttackedCount) {
						// if(this.animation === 'walk' || this.animation === 'run')
						// {

						// }
						// else
						let _mod = this.getRandom(10);
						if(_mod === 1)
						{
							if(this.autoTarget.yPosition > this.yPosition)
								_mod = 5;
							else if(this.autoTarget.yPosition < this.yPosition)
								_mod = 2;
							else
								_mod = 9;
						}
						switch(_mod)
						{
							case 0:
								this.idle(79);
								break;
							case 1:
								this.lastDirection = this.direction;
								this.moveDirection = this.yPosition > this.autoTarget.yPosition ? 'down' : 'up';
								_anima = this.getCurrentAnimation();
								this.run(_anima, this.direction, true, 4);
								if (this.socketId)
									this.animationChanged = true;
								break;
							case 2:
							case 3:
							case 4:
								if(isObjectsInTouch(this, this.autoTarget)?.touch || this.still)
									this.idle(89);
								else {
									if(_range > 66)
										this.autoStepYRate = (getRandomValue(55,70) / 100);
									else if(_range > 33)
										this.autoStepYRate = (getRandomValue(70,85) / 100);
									else
										this.autoStepYRate = undefined;
									this.lastDirection = this.direction;
									this.moveDirection = 'down';
									_anima = this.getCurrentAnimation();
									this.animate('walk', 1);
									if (this.socketId)
										this.animationChanged = true;
								}
								break;
							case 5:
							case 6:
							case 7:
								if(isObjectsInTouch(this, this.autoTarget)?.touch || this.still)
									this.idle(99);
								else {
									if(_range > 66)
										this.autoStepYRate = (getRandomValue(55,70) / 100);
									else if(_range > 33)
										this.autoStepYRate = (getRandomValue(70,85) / 100);
									else
										this.autoStepYRate = undefined;
									this.lastDirection = this.direction;
									this.moveDirection = 'up';
									_anima = this.getCurrentAnimation();
									this.animate('walk', 1);
									if (this.socketId)
										this.animationChanged = true;
								}
								break;
							default:
								_goOn = 1;
								break;
						}
					//}
					// else
					// 	this.autoCommand();
				}
				else if(this.owner && !this.autoTarget)
					this.pickNewTarget();
				//else //if(this.animationFinished)
				
				//this.autoCommand2();
				// _anima = this.getCurrentAnimation();
				// _frame = this.getCurrentFrame();
			}
		}
		if ((!this.autoMode || !this.autoTarget || _goOn) && !this.keyboard && !this.realTime && !this.finishing && this.enemy && this.class !== __spell && this.animationFinished) {
			if (!this.animations.run || this.immobilize)
				this.idle(6);
			else if (!this.autoTarget) {
				const _rand = getRandomValue2(1, 4);
				switch (_rand) {
					case 1:
						if (!this.lastDirection)
							this.direction = getRandomValue2(1, 2) === 1 ? __left : __right;
						else
							this.direction = this.lastDirection === __left ? __right : __left;
						this.lastDirection = this.direction;
						this.moveDirection = this.direction;
						_anima = this.getCurrentAnimation();
						this.run(_anima, this.direction, null, 5);
						if (this.socketId)
							this.animationChanged = true;
						break;
					default:
						this.idle(77);
						break;
				}
			}
		}
		_anima = this.getCurrentAnimation();
		_frame = this.getCurrentFrame();
		this.checkPush(_frame);
		this.checkHPRegen();
		this.charge2(_anima, _frame);
		if (!this.inCrowdControl(_anima, _frame)) {
			_frame.charge = undefined;
			if (_frame.atk && (!this.attacking || (_frame.atk.reset && (this.frame !== this.attacking)))) {
				this.attacking = this.frame;//this.class !== __spell;
				this.attack(_anima, _frame);
			}
			else {
				if (!_frame.atk)
					this.attacking = false;
				//if (_frame.pullRange)
					//this.pull(_anima, _frame);
			}
			if (_anima.attack && _frame.push)
			 	this.pushEnemies(_frame);
		}
		else
			_frame.charge = undefined;
		this.useRage(_anima);
		this.checkChainSkill(_frame);
		// if (this.animation === 'attack' && this.animations.hug && this.frame === 0 && this.start === 1)
		// 	this.checkHug();
		const _currentFrame = this.getCurrentFrame();
		if (_currentFrame.spell && this.start === 1)
			this.throwSpell(_currentFrame);
		if (this.main && this.animation === 'run' && ((this.frame === 1 && this.start === 1) || this.turned)) {
			if (!this.stepSound && __account.options.sound) {
				let _footstepKey = ((episode.dungeon || episode.pvp) ? 'dungeon' : episode.theme.replace(/\d+/, '')) + 'footsteps';
				let _volume = .2;
				if (!soundFiles[_footstepKey]) {
					_footstepKey = 'footsteps';
					_volume = .5;
				}
				this.stepSound = getSound(null, _footstepKey);
				this.stepSound.volume = _volume;
				this.stepSound.loop = true;
				this.stepSound.crossOrigin = 'anonymous';
			}
			if (__account.options.sound && (this.stepSound?.paused || this.stepSound.currentTime === 0))
				this.stepSound.play();
		}
		else if (this.main && this.animation !== 'run' && this.stepSound) {
			this.stepSound.pause();
			this.stepSound.currentTime = 0;
		}
		var _sf = this.getCurrentFrame().sound;
		if (_sf && this.soundPlaying != (this.frame + 1) && (!this.animationFinished || _sf.force)) {
			if(!_sf.range || (!this.main && _sf.range))
			{
				this.soundPlaying = this.frame + 1;
				this.setSound(_sf, _anima);
			}
		}
		else if(_anima.sound)
			this.setVolume(_anima.sound);
		if(this.do)
			this.do(this);
		this.checkNPC();
		this.checkBuff(_currentFrame);
		this.checkGlobalBuffs();
		this.checkFinishingMoveAvailable(_anima);
		if (this.health <= 0) {
			if (_anima.attack) {
				this.animate('dead', null, null, 4);
			}
			else if (!this.attacker)
				this.animations[this.animation].next = 'dead';
		}
		if (this.finishTarget?.dead){
			this.finishTarget = undefined;
			if(this.finishingMoveVisible)
				addClass(_finishingMove, 'v-none');
		}
		this.checkExperience();
		this.checkLoot(_currentFrame);
		//this.checkSpawn();
		this.checkKillQuest();
		if (this.main && !episode.lobby)
			this.checkHealth();
		// if((this.main || this.hasRageBar) && !this.ultimate && !this.isDead() && !this.hurting){
		// 	if((_gameTick - this.attackedUnitTime) > 10010)
		// 		this.decreaseRage();
		// }
		this.checkDialog(_currentFrame);
		if (this.friendly && this.remove && !this.related && _coopMembers?.find(x => x == this))
			removeCoopCharacter();
		if (_frame.changeDirection)
			this.direction = this.direction === __left ? __right : __left;
		if (episode.check) {
			if(episode.pvp)
				episode.checkPVPResult();
			else
				episode.checkMapName();
			episode.check = false;
		}
		if (this.start > 0 && ((this.start % MathCeil((_frame.speed * ((_anima.hurt || _anima.key.startsWith('dead')) ? 1 : (this.getFps() ?? 1))) / (_anima.attack ? this.getSpeedRate() : 1))) === 0)) {
			const _hasNext = _anima.next || _frame.next || _frame.nextAndRemove;
			if (_frame.finish) {
				this.finishAnimation();
				this.animate('finish' + this.getNextSkill(this.finishTarget.finishableWith));
				this.frame = 0;
				_anima = this.getCurrentAnimation();
				_frame = this.getCurrentFrame();
			}
			else if (_frame.next || _frame.nextAndRemove) {
				this.finishAnimation();
				this.animate(this.getNextSkill(_frame.next ?? _frame.nextAndRemove));
				if(_frame.nextAndRemove)
					delete _frame.nextAndRemove;
				this.frame = 0;
				_anima = this.getCurrentAnimation();
				_frame = this.getCurrentFrame();
			}
			else {
				if(_frame.go)
					this.calculateGoFrame(_frame);
				else
					this.frame++;
				if(this.soundPlaying)
					delete this.soundPlaying;
				const _skillCommand = this.keyboard?.getSkill?.();
				let _workCommand = this.getCurrentFrame()?.worksOnlyWithCommand;
				while (_workCommand && (_workCommand !== _skillCommand)) {
					this.frame++;
					_workCommand = this.getCurrentFrame().worksOnlyWithCommand;
				}
				while ((_anima.next === 'dead' || this.isDead()) && this.getCurrentFrame()?.invisibleWhenDead) {
					this.frame++;
					_anima.next = 'dead';
				}
			}
			this.start = 0;
			if (this.frame >= _anima.frames.length) {
				let repeatFrame = false;
				if (_anima.maxRepeat) {
					if (!_anima.repeat)
						_anima.repeat = _anima.maxRepeat;
					_anima.repeat--;
				}
				if (!_anima.repeat) {
					this.finishAnimation();
					let _hasNextSkill;
					if (this.animation.startsWith('dead') && (this.enemy || this.class === __spell)){
						this.remove = _removeEnemy = true;
					}
					if (this.animation.startsWith('dead') && this.main)
						repeatFrame = true;
					else if (_anima.next === 'dead')
						this.animate('dead', 1);
					else if (_anima.next && !_anima.imediateBreak) {
						this.animate(this.getNextSkill(_anima.next));
						this.frame = 0;
						_anima = this.getCurrentAnimation();
						_frame = this.getCurrentFrame();
						_hasNextSkill = 1;
					}
					if (this.attacker) {
						const _attackerAnima = this.attacker.getCurrentAnimation();
						if (!(_attackerAnima.finishingMove || _attackerAnima.interactive))
							this.attacker = this.pushDirection = undefined;
						if (this.isDead() && !this.finishing && !this.attackingOnlyBy)
							this.animate('dead', null, null, 2);
					}
					if (_anima.ultimate) { // && (this.main || this.friendly || episode.pvp)) {
						if (!this.ultimate)
							this.ultimate = true;
						if(!this.ultimateUsed)
							this.ultimateUsed = true;
						if(this.alp || episode.pvp)
							resetSkills(1, null, this);
						this.rage = _gameTick;
						// if(this.main && !__account.options.effect)
						// 	addClass(_gamePad, 'rage-activated');
						// if (this.main)
						// 	removeClass(rageSkill, 'rage-shimmer');
					}
					if (this.class === __spell && this.animation === 'dead'){
						//episode.enemies = episode.enemies.filter(x => x != this);
						this.remove = true;
					}
					else if (this.class === __spell && this.animation !== 'dead' && !_hasNextSkill)
						this.animate('dead', null, null, 3);
				}
				if (repeatFrame)
					this.frame = _anima.frames.length - 1;
				else {
					this.frame = 0;
					if(!_anima.maxRepeat && !_hasNext && !this.isDead() && this.class !== 'object' && this.class !== __spell
						 && this.autoMode > 0 && this.animation && this.animations[this.animation]?.attack)
						this.animation = 'idle';
				}
			}
		}
		if (_removeEnemy && !episode.pvp) {
			this.remove = true;
		}
		
		//_frame = this.getCurrentFrame();
		this.render(_frame, _queue);
	}
	this.checkSpawn = function() {
		if(this.respawnAfterSeconds && !this.respawnRequested) {
			let _skip;
			if(this.groupId && this.spawnAsGroup) {
				if(episode.enemies?.find(x => x !== this && x.groupId === this.groupId && !x.remove))
					_skip = 1;
			}
			if(!_skip) {
				this.respawnRequested = 1;
				if(!episode.respawners)
					episode.respawners = [];
				const _mobs = episode.mobs.filter(x => x.id === this.id && x.groupId === this.groupId && (x.spawnAsGroup || x.spawn));
				for(let _mob of _mobs) {
					if(_mob.spawnTimeStart >= 0) {
						if(_mob.spawnTimeStart > 0)
							_mob.spawnTimeStart--;
						else
							continue;
					}
					for(let i = 0; i < (_mob.spawn ? 1 : (_mob.count ?? 1)); i++){
						if(_mob.spawnDirection)
							_mob.spawnMinX = _mob.spawnMaxX = MathRound((_mob.spawnDirection === __right ? platformX + episode.cWidth  + ((getRandomValue2(100, 200) / 100) * (episode.cWidth * .2)) :  platformX  - ((getRandomValue2(100, 200) / 100) * (episode.cWidth  * .2))) / __zoom);
						episode.respawners.push({id: _mob.id, spawnSettings: function() {
							_mob.attacker = _mob.autoTarget = _mob.owner = undefined;
							const _json = structuredClone2(_mob);
							_json.count = 1;
							return _json;
						}(), date: _gameTick, ms: _mob.spawn * 1000});
					}
				}
			}
		}
	}
	this.stopStepSound = function() {
		if(!this.stepSound)
			return;
		this.stepSound.pause();
		this.stepSound.currentTime = 0;
	}
	this.calculateGoFrame = function(_frame) {
		const _go = _frame.go;
		if(_frame.when) {
			if(_frame.when(this))
				this.frame = _go.frame - 1;
			else
				this.frame++;
			return;
		}
		if(_go.rate) {
			if(getRandomValue2(1, 100) > (_go.rate * 100))
				this.frame++;
			else
				this.frame = _go.frame - 1;
		}
		else
			this.frame = _go.frame - 1;
	}
	this.addCommonSkill = function (_c) {
		if (__account.commonInventory.length >= 4) {
			if (this.main)
				warn('<span>' + getLangData('No room for pocket') + '</span>', 'warn');
			return false;
		}
		__account.commonInventory.push(_c);
		this.checkCommonInventory();
		_client.saveState();
		return true;
	}
	this.checkCommonInventory = function () {
		if (this.main)
			for (let i = 0; i < 4; i++) {
				if (__account.commonInventory?.[i]) {
					const _img = _commons[i].getElementsByTagName('img')?.[0];
					if(episode.pvp) {
						if(_img)
							_img.remove();
						continue;
					}
					if (_img?.getAttribute('data-key') === __account.commonInventory[i].key)
						continue;
					_commons[i].innerHTML = '<img onexactclick="mainCharacter.useCommonSkill(' + (i+1) + ')" src="./images/' + (__account.commonInventory[i].alternateType ?? 'common') + '/icons/' + __account.commonInventory[i].key + '.png" data-key="' + __account.commonInventory[i].key + '" />';
				}
				else if (_commons[i].innerHTML !== '')
					_commons[i].innerHTML = '';
			}
	}
	this.disableCommonInventory = function () {
		if (this.main)
			for (var i = 0; i < 4; i++)
				_commons[i].innerHTML = '';
	}
	this.stopHeartBeatSound = function() {
		if (this.heartbeat) {
			this.heartbeat.pause();
			this.heartbeat = undefined;
		}
	}
	this.checkHealth = function () {
		const _dead = !(this.heartCount > 0) && this.isDead();
		if ((this.hasSickness || ((this.health * 10) < this.MAXHP)) && !_dead && this.health > 0) {
			if (!this.heartbeat && __account.options.sound) {
				this.heartbeat = getSound(null, 'heartbeat');
				this.heartbeat.crossOrigin = 'anonymous';
				this.heartbeat.loop = true;
				this.heartbeat.volume = 1;
				this.heartbeat.play();
			}
		}
		else
			this.stopHeartBeatSound();
	}
	this.checkDialog = function (_f) {
		if (_f.dialog)
			createBubbleText(_f.dialog);
		else if((episode.dialogs?.[0] || episode.bubbles?.[0]) && this.main)
			createBubbleDialog();
	}
	this.getRangeBetween = function(_char) {
		return MathRound((100 * MathAbs(this.ORIGINLEFT - _char.ORIGINLEFT)) / episode.cWidth);
	}
	this.getZRangeBetween = function(_char) {
		const _y = MathRound(MathAbs((_char.yPosition - this.yPosition) / getGroundHeight()) * 100);
		const _x = MathRound((100 * MathAbs(this.ORIGINLEFT - _char.ORIGINLEFT)) / episode.cWidth);
		return MathRound(Math.sqrt(Math.pow(_y, 2) + Math.pow(_x, 2)));
	}
	this.checkExperience = function () {
		if (episode.pvp || episode.war || episode.gold || episode.tower || episode.menu)
			return;
		if (this.enemy && this.class !== __spell && this.class !== 'minion' && this.class !== 'object' &&
			(this.dead || this.finishing) && !this.expGained) {
			this.expGained = true;
			updateGlobalQuest('kill-enemy');
			if(_client.quickPlay)
				updateExperience(MathCeil((this.experience * (this.expEnabled ? 2 : 1)) * (this.level / mainCharacter.level)));
			// if (_coopMembers?.[0])
			// 	for (let _cm of _coopMembers)
			// 		updateExperience(MathCeil((this.experience * (this.expEnabled ? 2 : 1)) * (this.level / _cm.level)), null, _cm);
		}
	}
	this.checkNPC = function () {
		if (!this.main || this.target)
			return;
		const _xStep = episode.XStep;
		const _yStep = episode.YStep;
		if ((this.yPosition < _xStep) || __account.questStatus.dialogArr) {
			addClass(_talkBtn, 'v-none');
			if(!useProgress?.inProgress)
				addClass(_useBtn, 'v-none');
		}
		let _objects = episode?.sprites?.filter(x => !x.disabled && (x.npc || x.sound));
		const _npcs = episode.NPCS;
		if(_npcs?.[0])
			for(let _n of _npcs)
				_objects.push(_n);
		const _left = this.EXACTLEFT + platformX;
		const _right = _left + this.WIDTH;
		let _qid, _usable, _break, _did;
		const _quest = __story?.quests?.find(x => x.id === __account.questStatus.order);
		const _sideQuest = _sideQuests.find(x => x.id === __account.questStatus.side.order);
		let _hasProgress = false, _isSideQuestSprite = false, _isArtifact = false;
		if (!this.isDead()) {
			const _drawables = [];
			for (var _obj of _objects) {
				if (_obj.remove)
					continue;
				if (_obj.when && !_obj.when(_obj))
					continue;
				if(MathAbs(this.yPosition - _obj.yPosition) > (_yStep + (_obj.solid ? _obj.yGap : 0)))
					continue;
				_drawables.push(_obj);
				const _l = (_obj.getLeft ? (_obj.EXACTLEFT + platformX) : _obj.left);
				const _w = (_obj.WIDTH ? _obj.WIDTH : _obj.width);
				const nLeft = _l - ((_obj.rotate ? _obj.rightGap : 0) ?? 0);
				let nRight = _l + (_w - ((_obj.rotate ? 0 : _obj.rightGap) ?? 0));
				if (nLeft < (_xStep + _left) && nRight > (_right - _xStep)) {
					if (!_break) {
						if (_obj.dialogs)
							_did = _obj.dialogs;
						else if(_obj.artifactId) {
							_usable = _obj;
							_isArtifact = 1;
						}
						else if (_quest && _obj.class === _quest.owner)
							_qid = _quest.id;
						else if (_sideQuest && _obj.class === _sideQuest.owner)
							_qid = _sideQuest.id;
						else if (_sideQuest && _obj.questItem && _obj.animation.id === _sideQuest.loot)
						{
							_isSideQuestSprite = 1;
							_usable = _obj;
						}
						else if (!useProgress?.inProgress && _quest && _obj.npc && this.animation === 'idle' &&
							_quest.loots?.find(x => x.object?.indexOf(_obj.npc) >= 0)) {
							_usable = _obj;
							_hasProgress = true;
						}
						else if (_obj.to) {
							if(!episode.runToSwitch)
								_usable = _obj;
							else {
								if(this.left < (episode.cWidth / 2)){
									if(_obj.do)
										_obj.do(_obj);
									else
										episode.runToLeft = _obj.to;
								}
								else if((this.left + platformX) > (episode.width - (episode.cWidth / 2))) {
									if(_obj.do)
										_obj.do(_obj);
									else
										episode.runToRight = _obj.to;
								}
							}
						}
						_break = true;
					}
				}
			}
			if(_drawables?.[0]) {
				for(var _d of _drawables)
					if (_d.drawNPCAnimation)
						_d.drawNPCAnimation();
			}
		}
		let actionSet = false;
		if (_did && this.animation === 'idle') {
			removeClass(_talkBtn, 'v-none');
			this.action = {
				command: 'talk',
				dialogs: _did
			}
			actionSet = true;
		}
		else if (_qid && this.animation === 'idle') {
			removeClass(_talkBtn, 'v-none');
			this.action = {
				command: 'talk',
				id: _qid
			};
			actionSet = true;
		}
		else {
			addClass(_talkBtn, 'v-none');
			if (!this.useProgressStart)
				this.action = undefined;
		}
		if (_usable && this.animation === 'idle') {
			removeClass(_useBtn, 'v-none');
			//const _portal = document.getElementById('SPRT-' + _usable.animation.id);
			//if (_portal || _usable.frames) {
				// if (_portal) {
				// 	if(!_portal.oldAlpha)
				// 		_portal.oldAlpha = _usable.alpha ?? 1;
				// 	_portal.style.opacity = 1;
				// }
				if(_usable.canSkin)
					addClass(_useBtn, 'skin-btn');
				else
					removeClass(_useBtn, 'skin-btn');
				this.action = {
					command: 'use',
					progress: _hasProgress,
					to: _usable.to,
					loot: _usable.npc,
					key: _usable.npc,
					id: _usable?.animation.id,
					enemyKey: _usable.key
				};
				if(_usable.canSkin)
					this.action.sound = { key: 'skin', volume: .3, reset: true };
				if(_usable.actionSound) {
					this.action.sound = structuredClone2(_usable.actionSound);
					this.action.sound.reset = true;
				}
				else if(_isArtifact)
					this.action.artifactId = _usable.artifactId;
				if(_isSideQuestSprite)
					this.action.removeSprite = 1;
			//}
		}
		else {
			// if(!episode.portals)
			// 	episode.portals = document.querySelectorAll('.portal');
			// for (var _portal of episode.portals)
			// 	if (_portal.oldAlpha)
			// 		_portal.style.opacity = _portal.oldAlpha;
			if (!this.useProgressStart && !useProgress?.inProgress)
				addClass(_useBtn, 'v-none');
			if (!actionSet && !this.useProgressStart)
				this.action = undefined;
		}
	}
	this.dropItem = function (_type, _key, _alternateType) {
		if(episode.pvp || episode.gold || episode.tower)
			return;
		//const _prevDrops = episode.enemies?.filter(x => x.dropType && x.dropType === _type);
		let _itemLimit;
		if(_type === 'quest-item')
		{
			const _qItem = __account.questStatus?.quest?.loots?.find(x => x.key === _key);
			_itemLimit = _qItem?.limit ?? 10;
		}
		// if(_type !== 'item' && _prevDrops?.length > (_itemLimit ?? 3))
		// 	return;
		let _item, _isEquipment, _src;
		switch (_type) {
			case 'gold':
				_item = { type: _type, key: _key };
				_src = './images/items/icons/gold/' + getRandomValue2(1,9) + '.png';
				if(false){// (this.killedBy) {
					const _ch = mainCharacter;
					if (_ch) {
						const _maxAmount = _ch.level * 400;
						const _minAmount = .25 * _maxAmount;
						const _goldAmount = getRandomValue(_minAmount, _maxAmount);
						updateGold(_goldAmount, _ch);
						addDmgFrame({
							item: { key: 'gold' },
							val: _goldAmount,
							from: _ch.key,
							//text: _goldAmount + ' x &nbsp;<img src="./images/icons/gold.png" style="width:4vh" />',
							//class: 'effect-miss',
							x: _ch.LEFT,
							y: episode.cHeight - _ch.yPosition - _ch.HEIGHT
						});
					}
				}
				break;
				//return;
			case 'common':
				const _cs = commonSkills.find(x => x.key === _key);
				_item = structuredClone2(_cs);
				if (!_alternateType)
					_item.type = _type;
				else {
					_item.alternateType = _item.type;
					_item.type = 'common';
				}
				break;
			case 'item':
				const _itemTypeIndex = getRandomValue(0, itemTypes.length - 1);
				const _itemGrade = episode.itemGrade;
				_item = { type: _type, grade: _itemGrade, itemKey: _key ?? itemTypes[_itemTypeIndex].key };
				_key = _item.itemKey + _itemGrade;
				if(_item.itemKey === 'weapon')
					_key = mainCharacter.class + '/' + _key;
				_alternateType = 'items';
				_isEquipment = 1;
				break;
			case 'pot':
			case 'quest-item':
				_item = { type: _type, key: _key };
				break;
			case 'buff':
				const _keys = Object.keys(_allBuffs);
				if (_key === 'random')
					_key = _keys[getRandomValue(0, _keys.length - 1)];
				_item = structuredClone2(_allBuffs[_key]);
				const _arr = (_item.gain ?? _item.loss);
				const _level = _arr[getRandomValue(0, _arr.length - 1)].level;
				_item = { key: _key, level: _level, type: 'buff' };
				break;
		}
		const _self = this;
		getImage(_src ?? ('./images/' + (_alternateType ?? _type) + '/icons/' + _key + '.png'), function (image) {
			const _origin = MathRound(image.width / 2);
			const _size = 56;
			const _rate = _size / image.width;
			const _xRate = getRandomValue2(1, 3);
			const _frames = [
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.125 * _xRate,
					bottomGap: -15 / _rate,
					speed: 7
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.125 * _xRate,
					bottomGap: -25 / _rate,
					speed: 6
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.125 * _xRate,
					bottomGap: -34 / _rate,
					speed: 5
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.1 * _xRate,
					bottomGap: -42 / _rate,
					speed: 4
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.1 * _xRate,
					bottomGap: -49 / _rate,
					speed: 4
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.1 * _xRate,
					bottomGap: -42 / _rate,
					speed: 4
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.075 * _xRate,
					bottomGap: -34 / _rate,
					speed: 5
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.075 * _xRate,
					bottomGap: -25 / _rate,
					speed: 4
				},
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					extraStepXRate: -.075 * _xRate,
					bottomGap: -15 / _rate,
					sound: _type === 'gold' ? { key: 'goldground', volume: 1 } : undefined,
					speed: 3
				},
				{
					props: {
						iframe: true
					},
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					speed: 1,
					objects: [
						{
							key: 'ouch',
							position: 'middle',
							still: true,
							scale: 1
						}
					]
				}
			];
			_frames.push(
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: image.width,
					spriteHeight: image.height,
					spriteOrigin: _origin,
					speed: 1,
					do: function(_dItem) {
						_dItem.animations.idle.frames = [
							{
								spriteLeft: 0,
								spriteTop: 0,
								spriteWidth: image.width,
								spriteHeight: image.height,
								spriteOrigin: _origin,
								speed: 50,
								def: {
									iframe: true
								}
							},
							{
								spriteLeft: 0,
								spriteTop: 0,
								spriteWidth: image.width,
								spriteHeight: image.height,
								spriteOrigin: _origin,
								speed: 50,
								def: {
									iframe: true
								}
							}
						];
						_dItem.start = _dItem.frame = 0;
					},
					def: {
						iframe: true
					}
				});
			let _enemy = {
				animations: {
					notallowed: {
						key: 'notallowed',
						type: 'skill',
						next: 'idle',
						frames: [
							{
								spriteLeft: 0,
								spriteTop: 0,
								spriteWidth: image.width,
								spriteHeight: image.height,
								spriteOrigin: _origin - 2,
								speed: 4
							},
							{
								spriteLeft: 0,
								spriteTop: 0,
								spriteWidth: image.width,
								spriteHeight: image.height,
								spriteOrigin: _origin + 2,
								speed: 4
							},
							{
								spriteLeft: 0,
								spriteTop: 0,
								spriteWidth: image.width,
								spriteHeight: image.height,
								spriteOrigin: _origin - 2,
								speed: 4
							},
							{
								spriteLeft: 0,
								spriteTop: 0,
								spriteWidth: image.width,
								spriteHeight: image.height,
								spriteOrigin: _origin + 2,
								speed: 4
							},
							{
								spriteLeft: 0,
								spriteTop: 0,
								spriteWidth: image.width,
								spriteHeight: image.height,
								spriteOrigin: _origin - 2,
								speed: 4
							}
						]
					},
					idle: {
						alternateFrames: [
							{ rate: .3, frames: [
								{
									spriteLeft: 0,
									spriteTop: 0,
									spriteWidth: image.width,
									spriteHeight: image.height,
									spriteOrigin: _origin,
									speed: 1,
									def: {
										iframe: true
									}
								},
								{
									spriteLeft: 0,
									spriteTop: 0,
									spriteWidth: image.width,
									spriteHeight: image.height,
									spriteOrigin: _origin,
									speed: 99,
									objects: [{
										key: 'shine',
										position: 'over-head',
										scale: .35
									}],
									def: {
										iframe: true
									}
								}
							]}
						],
						key: 'idle',
						type: 'skill',
						frames: _frames
					}
				},
				key: 'bff-' + Math.random().toString().replace(/[.]/g, ''),
				yGap: 10,
				name: 'Item',
				class: 'object',
				level: 1,
				direction: __right,
				defaultDirection: __left,
				defaultAnimationKey: 'idle',
				zoom: _rate,
				height: _size,
				width: _size,
				maxHP: 1,
				stepX: 0,
				weight: 1000,
				stepXRate: 0,
				hasShadow: true,
				src: _src ??  ('./images/' + (_alternateType ?? _type) + '/icons/' + _key + '.png')
			};
			_enemy.top = _self.TOP;
			_enemy.left = getRandomValue(_self.left - MathRound(episode.cWidth / 50),
				_self.left + MathRound(episode.cWidth / 50));
			_enemy.invulnerable = true;
			_enemy = new enemy(_enemy);
			_enemy.ultimate = _isEquipment || _type === 'quest-item';
			if (!_enemy.ultimate) {
				if (_type === 'buff' || _type === 'common')
					_enemy.remarkableObject = true;
			}
			else
				_frames.find(x => x.bottomGap === undefined && x.extraStepXRate === undefined).objects = [{
					key: 'questshine',
					position: 'middle',
					yGap: 128 - _size
				}];
			_enemy.direction = (!_self.noDirection ? (_self.direction === __left) : (getRandomValue2(1,2) === 1)) ? __right : __left;
			_enemy.moveDirection = _enemy.direction;
			_enemy.yPosition = getRandomValue2(_self.yPosition - _self.yGap, _self.yPosition + _self.yGap);
			if (!_enemy.inventory?.[0])
				_enemy.inventory = [_item];
			else
				_enemy.inventory.push(_item);
			_enemy.located = _enemy.started = true;
			episode.enemies.push(_enemy);
			_enemy.animate('idle', 1, null, 7);
			_enemy.health = 1;
			_enemy.dropType = _type;
		});
	}
	this.checkKillQuest = function (_frame) {
		if (episode.pvp)
			return;
		if (!this.killCounted && (this.isDead() || this.finishing) && this.enemy && this.class !== __spell && this.class !== 'object') {
			const _q = __account.questStatus?.quest?.kills?.find(x => x.enemy.indexOf(this.id) !== -1);
			if (_q) {
				this.killCounted = 1;
				if (_q.count === undefined)
					_q.count = 0;
				if (_q.limit > _q.count)
					_q.count++;
				if(_q.limit <= _q.count && !__account.questStatus.quest.kills.find(x => x.limit > (x.count ?? 0))) {
					if(__account.questStatus.quest?.after){
						__account.questStatus.quest.after();
						return;
					}
				}
				updateQuestArea();
				_client.upgradeQuestStatus();
			}
			else
				this.killCounted = 1;
			if(this.killedBy === mainCharacter.key)
			{
				const _rstp = mainCharacter.getTalentPoint('passive-run-speed');
				if(_rstp > 0)
					mainCharacter.addBuff({ key: 'speedup', level: _rstp });
			}
			if(!episode.killCount)
				episode.killCount = 0;
			episode.killCount++;
		}
	}
	this.grabGold = function(_noWarn) {
		const _ch = mainCharacter;
		if (_ch) {
			const _maxAmount = _ch.level * 100;
			const _minAmount = .25 * _maxAmount;
			const _goldAmount = getRandomValue(_minAmount, _maxAmount);
			updateGold(_goldAmount, _ch);
			if(!_noWarn)
				addDmgFrame({
					item: { key: 'gold' },
					val: _goldAmount,
					from: _ch,
					x: _ch.LEFT,
					y: episode.cHeight - _ch.yPosition - _ch.HEIGHT
				});
		}
	}
	this.grabItem = function(_inv, _o) {
		const _item = getRandomItem(_inv.grade, _inv.itemKey);
		if(_item.type === 'weapon')
		{
			var _class = getRandomValue(1, Object.keys(_allEnemies).filter(x => x.startsWith('enemy0')).length);
			_item.for = _allEnemies['enemy0' + _class]().class;
		}
		let _used = pushItemIntoInventory(_item);
		if(_used) {
			if(__storyPlaying)
				__storyBonusItemCount++;
			this.lastItemLootedTime = _gameTick;
			//var _invitem = getLangData(_inv.itemKey).toProperCase();
			// addDmgFrame({
			// 	item: { key: _inv.itemKey, for: _item.for, grade: _inv.grade },
			// 	//text: '<p data-text="' + _invitem + '">' + _invitem + '</p>',
			// 	//class: 'dmg dmg-orange grade-' + _inv.grade,
			// 	x: _char.LEFT,
			// 	from: _char.key,
			// 	y: episode.cHeight - _char.yPosition - _char.HEIGHT
			// });
		}
		else if(this.main && _o && _o.animations.notallowed && _o.animation === 'idle')
			_o.animate('notallowed', 1);
		return _used;
	}
	this.checkLoot = function (_frame) {
		const _char = episode.loot?.enemy ?? this;
		if (episode.pvp || episode.tower || episode.gold || _char.looted || _char.noLoot)
			return;
		let _loots = _frame?.loot ? [_frame?.loot] : _frame?.loots, _key = 'random';
		if(!_loots){
			if(episode.loot?.loots)
				_loots = structuredClone2(episode.loot.loots);
			if(_loots)
				delete episode.loot;
		}
		if(!_loots?.[0]) {
			if (!_char.looted && _frame.alpha && _char.isDead() && _char.enemy && !_char.main && _char.class !== __spell && _char.class !== 'boss') {
				if (__account.questStatus?.quest?.loots) {
					for (var _l of __account.questStatus.quest.loots)
						if (_l.enemy?.indexOf(_char.id) !== -1 && _l.limit > (_l.count ?? 0))
							if (!_l.chanceRate || (_l.chanceRate && (getRandomValue(1, 100) <= _l.chanceRate))) {
								_loots = [_l];
								break;
							}
							else
								_char.looted = 1;
				}
				if(__storyScene?.loots)
				{
					if(!_loots)
						_loots = [];
					for(let _loo of __storyScene.loots)
						_loots.push(_loo);
				}
			}
		}
		if(_loots?.[0])
			for(let _loot of _loots) {
				_key = _loot?.key;
				const _rnd = getRandomValue(1, 100);
				if(_loot.type === 'item' || (!_loot.type && episode.equipmentDropRates?.[0] && _rnd === 1)) {
					if(_loot.grade)
						episode.itemGrade = _loot.grade;
					if(episode.equipmentDropRates?.[0]) {
						let _edr = [...episode.equipmentDropRates];
						shuffle(_edr);
						_char.dropItem('item', _edr[0].key);
					}
					else {
						const _itemChance = _loot.chance ?? 100;
						if(getRandomValue2(1, 100) <= _itemChance)
							_char.dropItem('item', _loot.key);
					}
				}
				if(_loot.type === 'pot' && _loot.chance && (getRandomValue2(1, 100) <= _loot.chance))
					_char.dropItem('pot', 'pot');
				else if((_loot.type === 'pot' && !_loot.chance) || (!_loot.type && (getRandomValue2(1, 100) <= 10)))
					_char.dropItem('pot', 'pot');
				if (_loot.type === 'gold' || (!_loot.type && (getRandomValue2(1, 100) <= (((_char.goldGainRate ?? 0) + _char.baseProps.goldGainRate) * (_char.goldEnabled ? 2 : 1)))))
					_char.dropItem('gold');
				if ((_loot.type === 'common' && !_loot.chance) || (_loot.type === 'common' && _loot.chance && (getRandomValue2(1, 100) <= _loot.chance)) || (!_loot.type && (getRandomValue2(1, 100) < 11))) {
					let _availSkills = commonSkills.filter(x => x.forEnemy?.indexOf(_char.id) >= 0);
					if (!_availSkills?.[0])
						_availSkills = commonSkills.filter(x => !x.forEnemy);
					const _commonItem = (_key && _key !== 'random') ? _availSkills.find(x => x.key === _key) :
						_availSkills[getRandomValue(0, _availSkills.length - 1)];
					if(_commonItem)
						_char.dropItem('common', _commonItem.key, _commonItem.type);
				}
				if (_loot?.enemy)
					_char.dropItem(_loot.type, _key);
				_char.looted = 1;
			}
		
		if (_char.main) {
			const _objects = episode.enemies?.filter(x => x.enemy == undefined && !x.remove && x.class === 'object' && x.invulnerable);
			
			if (_objects?.[0]) {
				for (var _o of _objects) {
					if (_o.getCurrentFrame().bottomGap)
						continue;
					const _t = isObjectsInTouch(_o, _char.getClone(-1 * (_char.WIDTH / 3)));
					if (_t.touch || __batterySaveMode) {
						let _used = false;
						if (_o.inventory?.[0])
							for (var _inv of _o.inventory) {
								if (_inv.type === 'pot')
									_used = updatePot(1);
								else if(_inv.type === 'gold') {
									_char.grabGold();
									_used = 1;
								}
								else if (_inv.type === 'common') {
									_used = _char.addCommonSkill(_inv);
									if(!_used && _char.main && _o.animations.notallowed && _o.animation === 'idle')
										_o.animate('notallowed', 1);
									if(_used)
										PlaySound({ key: 'commonloot', volume:.3 });
								}
								else if (_inv.type === 'buff') {
									const _buff = _char.addBuff(_inv);
									if (_buff) {
										_char.addObject({
											key: 'buffup',
											position: 'over-head',
											still: false
										});
										_used = true;
									}
								}
								else if (_inv.type === 'item') {
									_used = _char.grabItem(_inv, _o);
								}
								else if (_inv.type === 'quest-item') {
									const _q = __account.questStatus.quest.loots?.find(x => x.key === _inv.key);
									if (_q && !_q.after) {
										if (_q.count === undefined)
											_q.count = 0;
										if (_q.limit > _q.count)
											_q.count++;
										updateQuestArea();
										//var _qkey = getLangData(_q.key);
										addDmgFrame({
											item: { key: _q.key, quest: 1 },
											//text: '<p data-text="1 x ' + _qkey+ '">1 x ' + _qkey + '</p>' ,
											//class: 'dmg dmg-orange',
											from: _char,
											x: _char.LEFT,
											y: episode.cHeight - _char.yPosition - _char.HEIGHT
										});
										PlaySound({ key: 'loot' });
										_client.upgradeQuestStatus();
										_used = true;
									}
									else if(_q?.after)
										_q.after();
								}
							}
						else if (_o.touchDead && !_o.dying && !_o.dead) {
							_o.dead = true;
							_o.toucher = _char;
							_o.animate('dead', null, null, 5);
						}
						if (_used) {
							_o.remove = true;
							PlaySound({ key: 'inventory', volume: .5 });
						}
					}
				}
			}
		}
	}
	// this.getBuffProps = function(_prop) {
	// 	const _current = this.finalBuffProps?.[_prop];
	// 	if(_current && _current.lastCalculated > (_gameTick - 100))
	// 		return _current.val;
	// 	let _val = 0;
	// 	for(let _buff of this.buffs ?? []) {
	// 		var _b = _allBuffs[_buff.key];
	// 		if(_b) {
	// 			var _p = _b.gain ?? _b.loss;
	// 			_p = _p.find(x => x.level === _buff.level);
	// 			if(_p.props[_prop])
	// 				_val += _p.props[_prop];
	// 		}
	// 	}
	// 	if(!this.finalBuffProps)
	// 		this.finalBuffProps = {};
	// 	this.finalBuffProps[_prop] = { lastCalculated: _gameTick, val: _val };
	// 	return _val;
	// }
	this.getBuffProps = function (_prop) {

		const current = this.finalBuffProps?.[_prop];
		if (current && (_gameTick - current.lastCalculated) < 100)
			return current.val;

		let val = 0;
		const buffs = this.buffs;
		if (buffs) {
			for (let i = 0; i < buffs.length; i++) {

				const bData = _allBuffs[buffs[i].key];
				if (!bData) continue;

				const list = bData.gain ?? bData.loss;
				const p = list[buffs[i].level];

				if (p?.props[_prop])
					val += p.props[_prop];
			}
		}

		if (!this.finalBuffProps)
			this.finalBuffProps = {};

		this.finalBuffProps[_prop] = {
			lastCalculated: _gameTick,
			val: val
		};

		return val;
	}
	this.hasBuff = function(_prop) {
		for(let _buff of this.buffs ?? []) {
			var _b = _allBuffs[_buff.key];
			if(_b) {
				var _p = _b.gain ?? _b.loss;
				_p = _p.find(x => x.level === _buff.level);
				if(_p.props[_prop] === true)
					return true;
			}
		}
		return false;
	}
	this.getHPRegen = function() {
		let _regen = this.hpRegenRate ?? 0;
		let _buffRegen = this.getBuffProps('hpRegenRate');
		return _regen + _buffRegen;
	}
	this.getFps =  function() {
		let _f = this.fps ?? 1;
		let _buffF = this.getBuffProps('fps');
		return _f + _buffF;
	}
	this.checkHPRegen = function () {
		var _hp = this.getHPRegen();
		if (!_hp || this.isDead()) {
			if (this.lastHpRegenTime)
				this.lastHpRegenTime = undefined;
			return;
		}
		if (!this.lastHpRegenTime)
			this.lastHpRegenTime = msNow;
		if (_hp > 0) {
			if (this.buffs?.find(x => x.key === 'hps' && x.level > 0))
				this.addObject({ key: 'regen', position: 'middle', yGap: 10 });
			if ((msNow - this.lastHpRegenTime) > 999) {
				if(this.health != this.MAXHP) {
					const _val = MathRound(this.MAXHP / MathAbs(_hp * 100));
					this.increaseHealth(_val);
					addDmgFrame({
						//text: '+HP',
						text: 'plus-hp',
						//class: 'effect-steal',
						from: this,
						x: this.LEFT,
						y: episode.cHeight - this.yPosition - this.HEIGHT
					});
				}
				this.lastHpRegenTime = msNow;
			}
		}
		else {
			this.relatedObjects?.filter(x => x.key === 'regen')?.forEach(x => x.remove = true);
			if ((msNow - this.lastHpRegenTime) > 999) {
				const _decresement = MathRound(this.MAXHP / MathAbs(_hp * 100));
				this.decreaseHealth(_decresement);
				addDmgFrame({
					//text: _decresement,
					//class: 'effect-dmg-taken',
					text: 'minus-hp',
					from: this,
					x: this.LEFT,
					y: episode.cHeight - this.yPosition - this.HEIGHT
				});
				this.lastHpRegenTime = msNow;
			}
		}
	}
	this.removeBuffs = function () {
		while (this.buffs?.[0])
			this.removeBuff(this.buffs[0], 0);
	}
	this.removeBuffByKey = function (_key) {
		for (var i = 0; i < this.buffs?.length ?? 0; i++)
			if (this.buffs[i].key === _key) {
				this.removeBuff(this.buffs[i], i);
				break;
			}
	}
	this.removeDebuffs = function () {
		let _removeIndex;
		for (var i = 0; i < this.buffs?.length ?? 0; i++)
			if (this.buffs[i].type === 'debuff') {
				_removeIndex = i;
				break;
			}
		if (_removeIndex >= 0) {
			this.removeBuff(this.buffs[_removeIndex], _removeIndex);
			this.removeDebuffs();
		}
	}
	this.removeBuff = function (_buff, i) {
		const _b = _allBuffs[_buff.key];
		const _props = (_b.gain ?? _b.loss).find(x => x.level === _buff.level).props;
		for (var _key of Object.keys(_props))
			if(typeof this[_key] !== 'number')
				this[_key] = _buff[_key + 'Diff'];
		if (i >= 0) {
			this.relatedObjects?.filter(x => x.buff === _buff.key)?.forEach(x => x.remove = true);
			const _tb = this.buffs[i];
			if(_tb.end)
				_tb.end(this);
			this.buffs.splice(i, 1);
			if(i === 0 && this.buffs.length === 0)
				this.hadBuff = 1;
		}
	}
	this.applyBuff = function (_buff, _force) {
		if ((this.dead || this.dying) && !_force)
			return;
		const _b = _allBuffs[_buff.key];
		const _props = (_b.gain ?? _b.loss).find(x => x.level === _buff.level).props;
		const _debuff = _b.loss;
		for (var _key of Object.keys(_props)) {
			if (typeof _props[_key] !== 'number')
				this[_key] = _props[_key];
			if (_debuff && !this.main && this.autoMode !== 2 && !this.socketId)
				this.setAutoMode(2);
		}
		_buff.applying = true;
		if(_b.sound)
			PlaySound(_b.sound);
		if (_b.objects)
			for (const _obj of _b.objects) {
				const _o = this.addObject(_obj);
				if (_o)
					_o.buff = _buff.key;
			}
		if(_b.after)
			_b.after(this);
	}
	this.checkGlobalBuffs = function () {
		if(!this.main)
			return;
		if (__account.buffs?.[0]) {
			let _hasUpdate = 0;
			for (var _buff of __account.buffs)
				if ((msNow - _buff.time) >= _buff.ms) {
					__account.buffs.splice(__account.buffs.findIndex(x => x === _buff), 1);
					_hasUpdate = 1;
				}
			if(_hasUpdate)
				_client.saveState();
		}
		for(let ab of __account.buffs)
			if(!this.buffs.find(x => x.key === ab.key))
				this.addBuff(structuredClone2(ab), ab.time);
	}
	this.checkBuff = function (_frame) {
		if (this.buffs?.[0]) {
			let i = 0;
			for (var _buff of this.buffs)
				if (((msNow - _buff.time) >= _buff.ms) || this.isDead())
					this.removeBuff(_buff, i);
				else
					i++;
		}
		if (_frame?.buffs) {
			let _date;
			for (var _b of _frame.buffs) {
				let _add = true;
				for (var i = 0; i < this.buffs.length; i++) {
					const _buff = this.buffs[i];
					if (_buff.key === _b.key) {
						_add = false;
						if (_buff.level <= _b.level) {
							this.removeBuff(_buff, i);
							_add = true;
							break;
						}
					}
				}
				if (_add) {
					if (!_date)
						_date = msNow;
					this.addBuff(_b, _date);
				}
			}
		}
		this.applyBuffs();
		const _buffs = this.buffs.map(x => x.key + x.level.toString());
		_buffs.sort();
		const _bfj = _buffs.join('-');
		if(this.buffKey !== _bfj)
			this.buffKey = _bfj;
	}
	this.addBuff = function (_b, _date) {
		if (this.dead || this.dying || this.class === __spell || this.class === 'object')
			return;
		if (_b.chanceRate)
			if (getRandomValue(1, 100) > _b.chanceRate)
				return;
		if (!_date)
			_date = msNow;
		const _buff = _allBuffs[_b.key];
		const _type = _buff.gain ? 'buff' : 'debuff';
		if (_buff.stack && (typeof _buff.stack === 'number')) {
			const _oldBuffs = this.buffs?.filter(x => x.key === _b.key && x.type === _type && x.level === _b.level)?.sort((a, b) => a.time - b.time);
			if (_oldBuffs?.length >= _buff.stack) {
				_oldBuffs[0].time = _date;
				return undefined;
			}
		}
		const _attr = (_buff.loss ?? _buff.gain).find(x => x.level === _b.level);
		let _currentBuff;
		for (var i = 0; i < this.buffs.length; i++) {
			const _bu = this.buffs[i];
			if (_bu.key === _b.key && _bu.type === _type) {
				if (_bu.level > _b.level)
					return undefined;
				_currentBuff = _bu;
				if (_buff.waitToFinish)
					return null;
				this.removeBuff(_currentBuff, i);
				break;
			}
		}
		this.buffs.push({ type: _type, end: _b.end, level: _b.level, key: _b.key, time: _date, ms: _b.ms ?? _attr.ms });
		return _buff;
	}
	this.applyBuffs = function () {
		if (this.buffs?.[0])
			for (let _buff of this.buffs) {
				if (!_buff.applying)
					this.applyBuff(_buff);
			}
	}
	this.checkPush = function (_frame) {
		if(!this.pushingBy || this.knockbacking)
			return;
		if(_frame?.push)
			return;
		if(!this.pushingBy?.pull)
			this.pushRate = this.pushDirection = this.pushingBy = undefined;
		if(this.pushback === true)
			this.pushback = undefined;
		// if (_frame.push)
		// 	return;
		// const _enemies = episode.enemies.filter(x => !x.isDead() && x.pushingBy == this && !x.pushback);
		// if (_enemies?.[0])
		// 	for (var _e of _enemies)
		// 		_e.pushingBy = _e.pushRate = _e.pushDirection = undefined;
	}
	this.getHeightWithoutGap = function () {
		const _frame = this.getCurrentFrame();
		return MathRound(_frame.spriteHeight * this.ZOOM);
	}
	this.inCrowdControl = function (_anima, _frame) {
		return _anima.hurt && !_frame.atk;
	}
	// this.getHeight = function () {
	// 	try {
	// 		const _frame = this.getCurrentFrame();
	// 		if(!_frame)
	// 			console.log(this.key + ' ' + this.frame);
	// 		return MathRound((_frame.spriteHeight + Math.abs(_frame.bottomGap ?? 0)) * this.ZOOM);
	// 	}
	// 	catch(ex) {
	// 		console.log(ex.message);
	// 	}
	// }
	// this.updateVariables = function() {
	// 	const _char = this.coopWith ?? this;
	// 	let _hp = _char.maxHP;
	// 	if(_char.hpRate > 0)
	// 		_hp *= ((100 + _char.hpRate) / 100);
	// 	this.MAXHP = this.coopWith ? MathCeil(_hp / 2) : MathRound(_hp);
	// 	const _frame = this.getCurrentFrame();
	// 	try {
	// 		if(!_frame)
	// 			console.log(this.key + ' ' + this.frame);
	// 		this.HEIGHT = MathRound((_frame.spriteHeight + MathAbs(_frame.bottomGap ?? 0)) * this.ZOOM);
	// 	}
	// 	catch(ex) {
	// 		console.log(ex.message);
	// 	}
	// 	let _stepY = 0;
	// 	if (this.extraStepYRate)
	// 		_stepY = MathRound(this.extraStepYRate * (_canvas.height / 100));
	// 	this.TOP = MathRound((_canvas.height - this.yPosition - this.HEIGHT)) - _stepY;

	// 	if(!_frame)
	// 		console.log(this.id + ' - ' + this.animation + ' - ' + this.frame);
	// 	this.WIDTH = MathRound((_frame.spriteWidth + (_frame.rightGap ?? 0)) * this.ZOOM);
	// 	const _revr = this.direction !== this.defaultDirection;
	// 	const _left = (this.main ? this.left : this.left - platformX);
	// 	if (_revr)
	// 		this.LEFT = MathRound(_left - this.WIDTH + (_frame.spriteOrigin * this.ZOOM) - ((_frame.leftGap ?? 0) * this.ZOOM));
	// 	else
	// 		this.LEFT = MathRound(_left - (_frame.spriteOrigin * this.ZOOM) + ((_frame.leftGap ?? 0) * this.ZOOM));

	// 	this.SCREENLEFT = this.left - (this.main ? 0 : platformX);
	// 	if (this.direction !== this.defaultDirection)
	// 		this.ORIGINDIST = this.WIDTH - (_frame.spriteOrigin * this.ZOOM);
	// 	else
	// 		this.ORIGINDIST = (_frame.spriteOrigin * this.ZOOM);
	// 	this.EXACTLEFT = this.SCREENLEFT - this.ORIGINDIST;
	// 	this.ORIGINLEFT = this.SCREENLEFT + (_frame.spriteOrigin * this.ZOOM);
	// 	this.ORIGINX = (this.LEFT >= 0 ? this.LEFT : this.left) + (this.ORIGINDIST >= 0 ? this.ORIGINDIST : ((this.WIDTH >= 0 ? this.WIDTH : this.width) / 2));
	// }
	this.updateVariables = function () {
		const _char = this.coopWith ?? this;
		let _hp = _char.maxHP;
		if (_char.hpRate > 0)
			_hp *= ((100 + _char.hpRate) / 100);
		let _mhp = this.coopWith ? MathCeil(_hp / 2) : MathRound(_hp);
		if(_mhp !== this.MAXHP)
			this.MAXHP = _mhp;
		const _frame = this.getCurrentFrame();
		if (!_frame)
			return console.warn(this.key + ' missing frame ' + this.frame + ' ' + this.animation);
		const zoom = this.getZoom();
		if(zoom !== this.ZOOM)
			this.ZOOM = zoom;
		let spriteOrigin = _frame.spriteOrigin ?? 0;
		const bottomGap = _frame.bottomGap ?? 0;
		const rightGap = _frame.rightGap ?? 0;
		const leftGap = _frame.leftGap ?? 0;
		const _h = MathRound((_frame.spriteHeight + MathAbs(bottomGap)) * zoom);
		if(_h !== this.HEIGHT)
			this.HEIGHT = _h;
		let stepY = this.extraStepYRate && !this.stop ? MathRound(this.extraStepYRate * (episode.cHeight / 100)) : 0;
		const _t = MathRound((episode.cHeight - this.yPosition - this.HEIGHT)) - stepY;
		if(_t !== this.TOP)
			this.TOP = _t;

		const _w = MathRound((_frame.spriteWidth + rightGap) * zoom);
		if(_w !== this.WIDTH)
			this.WIDTH = _w;
		const reversed = this.reversed || (!this.noDirection && this.direction !== this.defaultDirection);
		const offset = (this.main ? this.left : this.left - platformX);
		const originPx = spriteOrigin * zoom;
		const leftGapPx = leftGap * zoom;

		const _l = MathRound(
			reversed
				? offset - this.WIDTH + originPx - leftGapPx
				: offset - originPx + leftGapPx
		);
		this.HURTLEFT = MathRound(
			reversed
				? offset - this._HURTBOX_half - leftGapPx
				: offset - this._HURTBOX_half + leftGapPx
		);
		this.PREVLEFT = this.left;
		if(_l !== this.LEFT)
			this.LEFT = _l;
		const _sl = this.left - (this.main ? 0 : platformX);
		if(_sl !== this.SCREENLEFT)
			this.SCREENLEFT = _sl;
		const _od = reversed ? this.WIDTH - originPx : originPx;
		if(_od !== this.ORIGINDIST)
			this.ORIGINDIST = _od;
		const _el = this.SCREENLEFT - this.ORIGINDIST;
		if(_el !== this.EXACTLEFT)
			this.EXACTLEFT = _el;
		const _ol = this.SCREENLEFT + originPx;
		if(_ol !== this.ORIGINLEFT) {
			this.ORIGINLEFT = _ol;
			if(isNaN(this.ORIGINLEFT))
			{
				console.warn(this.key + ' left ' + this.left + ' plat ' + platformX + ' screenLeft ' + this.SCREENLEFT + ' originDist ' + this.ORIGINDIST + ' originLeft ' + _ol);
			}
		}
		const _ox = (this.LEFT >= __minLeft ? this.LEFT : this.left) +
			(this.ORIGINDIST >= 0 ? this.ORIGINDIST : ((this.WIDTH >= 0 ? this.WIDTH : this.width) / 2));
		if(_ox !== this.ORIGINX)
			this.ORIGINX = _ox;
		if(this.solid && !episode.hasSolid)
			episode.hasSolid = 1;
		if(this.main && this.socketId !== __socketId)
			this.socketId = __socketId;
	};
	if(!this.left)
		this.left = 0;
	this.getTalentPoint = function(_key) {
		if(!this.alp || episode.realTime)
			return 0;
		const _current = this[_key];
		if(_current)
			return _current;
		const _talents = __account.characters.find(x => x.class === this.class)?.talents;
		if(!_talents)
			return 0;
		const _passive = __passiveSkills.find(x => x.key === _key);
		if(!_passive)
			return 0;
		const _talent = _talents.find(x => x.id === _passive.id);
		if(!_talent)
			return 0;
		this[_key] = _talent.count;
		return _talent.count;
	}
	this.getTalentValue = function(_key) {
		if(!this.alp || episode.realTime)
			return 0;
		const _current = this[_key];
		if(_current)
			return _current;
		const _talents = __account.characters.find(x => x.class === this.class)?.talents;
		if(!_talents)
			return 0;
		const _passive = __passiveSkills.find(x => x.key === _key);
		if(!_passive)
			return 0;
		const _talent = _talents.find(x => x.id === _passive.id);
		if(!_talent)
			return 0;
		const _props = _passive.props?.[_talent.count - 1];
		if(!_props?.value)
			return 0;
		this[_key] = _props.value;
		return _props.value;
	}
	this.updateVariables();
	// this.getClosestAttackers = function (_count, _range, _func) {
	// 	const _enemies = episode.getAvailableEnemies(this, _func) ?? [];
	// 	_count = _count ?? 10;
	// 	_range *= episode.w100;
	// 	let _arr = [];
	// 	if (_enemies?.[0]) {
	// 		for (var _enemy of _enemies) {
	// 			if (_enemy.invulnerable || _enemy.autoTarget !== this || _enemy.class === __spell)
	// 				continue;
	// 			if (_func && !_func(_enemy))
	// 				continue;
	// 			const _t = isObjectsInTouch(_enemy, this);
	// 			if (_t.touch)
	// 				_arr.push({range:0, enemy:_enemy});
	// 			else if(_t.originDiff <= _range)
	// 				_arr.push({range:_t.originDiff, enemy:_enemy});
	// 			if(_arr.length === _count)
	// 				break;
	// 		}
	// 		if (_arr.length > _count)
	// 			return _arr.sort((a, b) => a.range - b.range);
	// 	}
	// 	return _arr;
	// }
	// this.getClosestEnemy = function (_range, _direction, _func, _yRange, _tolerance, _force) {
	// // if(this.autoTarget && ...) → açık değilse şimdilik dokunmuyoruz
	// // if (!_force && ...) → önbellek kısmı kapalıysa dokunmuyoruz

	// 	let _best = undefined;
	// 	let _bestPriority = undefined;
	// 	let _minDist = Infinity;
	// 	let _minYDiff = Infinity;

	// 	let _enemies = episode.getAvailableEnemies(this, _func);
	// 	if (!_enemies?.length) return;

	// 	_range = _range ? episode.w100 * _range : 0;
	// 	const _yRangeAbs = (_yRange ?? 5) * (getGroundHeight() / 100);
	// 	const _checkYRange = _yRange >= 100 ? false : true;

	// 	for (let i = 0; i < _enemies.length; i++) {
	// 		const _enemy = _enemies[i];

	// 		if (_enemy.invulnerable || _enemy.class === __spell) continue;

	// 		if (!_enemy.targetPriority && _direction) {
	// 			if ((this.ORIGINLEFT > _enemy.ORIGINLEFT && _direction !== __left) ||
	// 				(_enemy.ORIGINLEFT > this.ORIGINLEFT && _direction !== __right)) {
	// 				continue;
	// 			}
	// 		}

	// 		if (_func && !_func(_enemy)) continue;

	// 		const _touch = isObjectsInTouch(_enemy, this, _yRange, _tolerance);
	// 		const _yDiff = MathAbs(this.yPosition - _enemy.yPosition);

	// 		if (_touch.touch) {
	// 			// Öncelikli hedef varsa direkt yaz ama en yakınını tut
	// 			if (_enemy.targetPriority) {
	// 				if (!_bestPriority || _touch.originDiff < _minDist) {
	// 					_bestPriority = {
	// 						enemy: _enemy,
	// 						range: _touch.originDiff,
	// 						yDiff: _yDiff,
	// 						targetPriority: true
	// 					};
	// 					_minDist = _touch.originDiff;
	// 					_minYDiff = _yDiff;
	// 				}
	// 			} else if (!_bestPriority && (!_best || _touch.originDiff < _minDist)) {
	// 				_best = {
	// 					enemy: _enemy,
	// 					range: _touch.originDiff,
	// 					yDiff: _yDiff
	// 				};
	// 				_minDist = _touch.originDiff;
	// 				_minYDiff = _yDiff;
	// 			}
	// 		}
	// 		else if (_touch.originDiff <= _range) {
	// 			if (_checkYRange && _yDiff > _yRangeAbs) continue;

	// 			if (_enemy.targetPriority) {
	// 				if (!_bestPriority || _touch.originDiff < _minDist) {
	// 					_bestPriority = {
	// 						enemy: _enemy,
	// 						range: _touch.originDiff,
	// 						yDiff: _yDiff,
	// 						targetPriority: true
	// 					};
	// 					_minDist = _touch.originDiff;
	// 					_minYDiff = _yDiff;
	// 				}
	// 			} else if (!_bestPriority && (!_best || _touch.originDiff < _minDist)) {
	// 				_best = {
	// 					enemy: _enemy,
	// 					range: _touch.originDiff,
	// 					yDiff: _yDiff
	// 				};
	// 				_minDist = _touch.originDiff;
	// 				_minYDiff = _yDiff;
	// 			}
	// 		}
	// 	}
	// 	// Önce targetPriority varsa onu döndür
	// 	return _bestPriority ?? _best;
	// }
	this.getClosestEnemy = function (_range, _direction, _func, _yRange, _tolerance, _force) {

		let _best = undefined;
		let _bestPriority = undefined;
		let _minDist = Infinity;
		let _minYDiff = Infinity;

		let _enemies = episode.getAvailableEnemies(this, _func);
		if (!_enemies?.length) return;

		_range = _range ? episode.w100 * _range : 0;
		const _yRangeAbs = (_yRange ?? 5) * (getGroundHeight() / 100);
		const _checkYRange = _yRange >= 100 ? false : true;

		// 🔥 CHEAP DATA CACHE (loop dışı)
		const _myX = this.HURTLEFT + this._HURTBOX_half;
		const _myY = this.yPosition;

		for (let i = 0; i < _enemies.length; i++) {

			const _enemy = _enemies[i];
			if (_enemy.invulnerable || _enemy.class === __spell) continue;
			const _enemyOL = _enemy.HURTLEFT + _enemy._HURTBOX_half;
			// Direction filtresi aynen kalıyor
			if (!_enemy.targetPriority && _direction) {
				if ((_myX > _enemyOL && _direction !== __left) ||
					(_enemyOL > _myX && _direction !== __right)) {
					continue;
				}
			}

			if (_func && !_func(_enemy)) continue;

			// ===============================
			// 🚀 CHEAP CHECK BAŞLIYOR
			// ===============================

			// const _dx = MathAbs(_myX - _enemyOL) - this._HURTBOX_half - _enemy._HURTBOX_half;

			// // Range dışındaysa pahalı hesaba sokma
			// if (_range !== undefined && _dx > _range) continue;

			const _yDiff = MathAbs(_myY - _enemy.yPosition);

			 if (_checkYRange && _yDiff > _yRangeAbs) continue;

			// ===============================
			// Artık GERÇEKTEN yakın olanlar kaldı
			// ===============================

			const _touch = isObjectsInTouch(_enemy, this, _yRange, _tolerance);

			if (_touch.touch) {

				if (_enemy.targetPriority) {

					if (!_bestPriority || _touch.originDiff < _minDist) {
						_bestPriority = {
							enemy: _enemy,
							range: _touch.originDiff,
							yDiff: _yDiff,
							targetPriority: true
						};

						_minDist = _touch.originDiff;
						_minYDiff = _yDiff;
					}

				} else if (!_bestPriority && (!_best || _touch.originDiff < _minDist)) {

					_best = {
						enemy: _enemy,
						range: _touch.originDiff,
						yDiff: _yDiff
					};

					_minDist = _touch.originDiff;
					_minYDiff = _yDiff;
				}

			}
			else if (_touch.originDiff <= _range) {

				if (_enemy.targetPriority) {

					if (!_bestPriority || _touch.originDiff < _minDist) {
						_bestPriority = {
							enemy: _enemy,
							range: _touch.originDiff,
							yDiff: _yDiff,
							targetPriority: true
						};

						_minDist = _touch.originDiff;
						_minYDiff = _yDiff;
					}

				} else if (!_bestPriority && (!_best || _touch.originDiff < _minDist)) {

					_best = {
						enemy: _enemy,
						range: _touch.originDiff,
						yDiff: _yDiff
					};

					_minDist = _touch.originDiff;
					_minYDiff = _yDiff;
				}
			}
		}

		return _bestPriority ?? _best;
	};

	this.throwAroundEnemies = function (_range, _attacker, _yRange) {
		const _oldEnemyState =  this.enemy;
		this.enemy = !this.enemy;
		let _enemies = episode.getAvailableEnemies(this, function(e) {
			return e !== _attacker && !(e.grade > 1);
		}, 1);
		this.enemy = _oldEnemyState;
		if (!_enemies?.length) return;

		const _yRangeAbs = (_yRange ?? 5) * (getGroundHeight() / 100);
		for (let i = 0; i < _enemies.length; i++) {
			const _enemy = _enemies[i];

			if (_enemy.invulnerable || _enemy.class === __spell) continue;

			//if (_func && !_func(_enemy)) continue;

			const _yDiff = MathAbs(this.yPosition - _enemy.yPosition);
			if(_yDiff > _yRangeAbs)
				continue;

			if(this.getRangeBetween(_enemy) > _range)
				continue;
			if(this.ORIGINLEFT > _enemy.ORIGINLEFT && _enemy.direction !== __right)
				_enemy.direction = __right;
			else if(this.ORIGINLEFT <= _enemy.ORIGINLEFT && _enemy.direction !== __left)
				_enemy.direction = __left;
			if(_enemy.animations.knockbackair){
				_enemy.randomAirCoords(_enemy.animations.knockbackair);
				_enemy.animate('knockbackair', 1);
			}
			else if(_enemy.animations.knockbackground)
				_enemy.animate('knockbackground', 1);
			if(_enemy.health > 0)
				_enemy.decreaseHealth(MathFloor(_enemy.health / 2), _attacker);
			if(_enemy.health <= 0 && !_enemy.remove)
				_enemy.remove = true;
		}
	}
	// this.getClosestEnemy = function (_range, _direction, _func, _yRange, _tolerance, _force) {
	// 	// if(this.autoTarget && this.autoTarget.health > 0 && this.autoTarget.targetPriority)
	// 	// 	return {
	// 	// 		enemy: this.autoTarget,
	// 	// 		range: isObjectsInTouch(this.autoTarget, this, _yRange, _tolerance)?.originDiff,
	// 	// 		yDiff: MathAbs(this.yPosition - this.autoTarget.yPosition)
	// 	// 	};
	// 	// if(!_force && ((!this.main && !this.animationFinished) || this.closeEnemiesPickDate > (_gameTick - 1000)))
	// 	// 	return this.CLOSEENEMIES;
	// 	let _ce =undefined;
	// 	let _enemies = episode.getAvailableEnemies(this, _func);
	// 	if (_enemies?.[0]) {
	// 		_range = _range ?? 0;
	// 		if (_range)
	// 			_range = MathRound((episode.cWidth / 100) * _range);
	// 		let _minRange = _range, _closestEnemies = [], _hasTargetPriority;
	// 		_enemies = _enemies.sort((a,b) => ((a.targetPriority || a.class !== 'object') ? (a.targetPriority ? -1 : 0) : 1) - ((b.class !== 'object' || b.targetPriority) ? (b.targetPriority ? -1 : 0) : 1))
	// 		for (var _enemy of _enemies) {
	// 			if (_enemy.invulnerable || _enemy.class === __spell)
	// 				continue;
	// 			if (!_enemy.targetPriority && _direction && (((this.ORIGINLEFT > (_enemy.ORIGINLEFT)) && _direction !== __left) ||
	// 				(((_enemy.ORIGINLEFT) > this.ORIGINLEFT) && _direction !== __right)))
	// 				continue;
	// 			if (_func && !_func(_enemy))
	// 				continue;
	// 			if(!_hasTargetPriority && _enemy.targetPriority)
	// 				_hasTargetPriority = 1;
	// 			const _t = isObjectsInTouch(_enemy, this, _yRange, _tolerance);
	// 			if (_t.touch && (_enemy.targetPriority || (!_enemy.targetPriority && !_hasTargetPriority))) {
	// 				_ce = {
	// 					enemy: _enemy,
	// 					range: _tolerance ?? 0,
	// 					yDiff: MathAbs(this.yPosition - _enemy.yPosition),
	// 					targetPriority: _enemy.targetPriority
	// 				}
	// 			}
	// 			else if (_t.originDiff <= _minRange) {
	// 				const _yDiff = MathAbs(this.yPosition - _enemy.yPosition);
	// 				if ((_yRange >= 100) || (_yDiff <= ((getGroundHeight() / 100) * (_yRange ?? 5))))
	// 					_closestEnemies.push({
	// 						enemy: _enemy,
	// 						range: _t.originDiff,
	// 						yDiff: _yDiff,
	// 						targetPriority: _enemy.targetPriority
	// 					});
	// 			}
	// 		}
	// 		if (_closestEnemies.length > 0)
	// 			_ce = _closestEnemies?.filter(x => x.targetPriority)?.sort((a, b) => a.range - b.range)?.[0] ??
	// 				 _closestEnemies[_closestEnemies.length - 1];
	// 	}
	// 	// this.closeEnemiesPickDate = _gameTick;
	// 	// this.CLOSEENEMIES = _ce;
	// 	return _ce;
	// }
	this.getOriginX = function (_frame) {
		return (this.main ? 0 : platformX) + this.left + (_frame.spriteOrigin * this.ZOOM);
	}
	this.getClone = function (_aoe) {
		return {
			left: this.LEFT - (_aoe ?? 0),
			width: this.WIDTH + (2 * (_aoe ?? 0)),
			height: this.HEIGHT,
			yGap: this.yGap ?? 0,
			top: this.TOP,
			yPosition: this.yPosition,
			direction: this.direction
		};
	}
	// this.getHitBox = function() {
	// 	const _gap = MathRound(this.ORIGINDIST);
	// 	return {
	// 		left: (this.main ? this.left : this.left - platformX) -
	// 			(this.direction === this.defaultDirection ? 0 : _gap),
	// 		width: (this.direction === this.defaultDirection ? (this.WIDTH - _gap) : _gap),
	// 		height: this.HEIGHT,
	// 		top: this.TOP,
	// 		yPosition: this.yPosition,
	// 		direction: this.direction,
	// 		yGap: this.yGap
	// 	};
	// 	//showBorders(_x.left, _x.top, _x.width, _x.height);
	// }
	this.getHitBox = function() {
		const _gap = MathRound(this.ORIGINDIST);
		return {
			left: (this.main ? this.left : this.left - platformX) -
				(this.direction === this.defaultDirection ? 0 : _gap),
			width: (this.direction === this.defaultDirection ? (this.WIDTH - _gap) : _gap),
			height: this.HEIGHT,
			top: this.TOP,
			yPosition: this.yPosition,
			direction: this.direction,
			yGap: this.yGap
		};
		//showBorders(_x.left, _x.top, _x.width, _x.height);
	}
	// this.getEnemiesInTouch = function (_anima, _frame, _tolerance, _func, _force) {
	// 	const _enemies = episode.getAvailableEnemies(this, _func, _force);
	// 	if (_enemies?.[0]) {
	// 		const _aoe = MathRound((_frame.atk?.aoe ?? 0) * this.ZOOM);
	// 		const cl = this.getClone(_aoe);
	// 		const hb = this.getHitBox();
	// 		const _closestEnemies = [];
	// 		let _t;
	// 		for (var _enemy of _enemies) {
	// 			_t = isObjectsInTouch(_enemy, _aoe > 0 ? cl : hb, (_frame.atk?.yRange ?? 0), 0);
	// 			if (_t.touch) {
	// 				if (_aoe > 0)
	// 					_enemy.aoe = true;
	// 				_closestEnemies.push({ enemy: _enemy, dist: _t.originDiff });
	// 			}
	// 			else if (_enemy.attackingOnlyBy === this.key)
	// 				_closestEnemies.push({ enemy: _enemy, dist: 1 });
	// 		}
	// 		if (_closestEnemies.length > 1)
	// 			_closestEnemies.sort((a, b) => a.dist - b.dist);
	// 		return _closestEnemies;
	// 	}
	// 	return undefined;
	// }
		this.getEnemiesInTouch = function (_anima, _frame, _tolerance, _func, _force, _charging) {
	const _enemies = episode.getAvailableEnemies(this, _func, _force);
	if (!_enemies?.length) return;

	const _aoe = MathRound((_frame.atk?.aoe ?? 0) * this.ZOOM);
	const cl = _aoe > 0 ? this.getClone(_aoe) : null;
	const hb = this.getHitBox();

	const _src = _aoe > 0 ? cl : hb;

	const _myX = _src.ORIGINLEFT;
	const _maxRange = (_frame.atk?.range ?? 10) * this.ZOOM;

	const _closestEnemies = [];
	let _enemy, _dx, _t;

	for (let i = 0; i < _enemies.length; i++) {

		_enemy = _enemies[i];

		// ===== HARD FILTERS =====
		if (_enemy === this) continue;
		if (_enemy.dead) continue;

		// ===== CHEAP X DIST CHECK =====
		_dx = MathAbs(_myX - _enemy.ORIGINLEFT);

		if (_dx > _maxRange && _enemy.attackingOnlyBy !== this.key)
			continue;

		// ===== EXPENSIVE TOUCH CHECK =====
		_t = isObjectsInTouch(
			_src,
			_enemy,
			(_frame.atk?.yRange ?? 0),
			_charging ? 6 : 0
		);

		if (_t.touch) {

			if (_aoe > 0)
				_enemy.aoe = true;

			_closestEnemies.push({
				enemy: _enemy,
				dist: _t.originDiff
			});

		}
		else if (_enemy.attackingOnlyBy === this.key) {

			_closestEnemies.push({
				enemy: _enemy,
				dist: 1
			});
		}
	}

	if (_closestEnemies.length > 1)
		_closestEnemies.sort((a, b) => a.dist - b.dist);

	return _closestEnemies;
}


	this.charge2 = function (_anima, _frame) {
		if (this.immobilize || this.slot?.support || this.stop)
			return;

		if(this.realTime && !this.main && this.alp)
			if(!this.charging){
				if(this.chargeProperties)
					this.chargeProperties = undefined;
				return;
			}
		if (_anima.chargeDistance && (this.frame <= (_anima.chargeDistance.untilFrame ?? 0)) && !this.chargeProperties?.stop) {
			const _y = this.yPosition;
			const _dir = this.getKeyboardXMove() ?? this.direction;
			let _result = this.chargeProperties?.enemy ? undefined : this.getClosestEnemy(_anima.normalRange ?? 0, _dir, function (_e) {
				return MathAbs(_e.yPosition - _y) < (getGroundHeight() / 3) && _e.health > 0;
			}, 33, null, 1);
			if (!_result?.enemy) {
				const _enemyHalf = (this.WIDTH * 50) / episode.cWidth;
				_result = this.chargeProperties?.enemy ? { enemy: this.chargeProperties.enemy } : this.getClosestEnemy(_anima.chargeDistance.value + _enemyHalf, _dir, function (_e) {
					return MathAbs(_e.yPosition - _y) < (getGroundHeight() / 3) && _e.health > 0;
				}, 33, null, 1);
				if(!_result?.enemy && this.autoTarget && !this.main && _anima.chargeDistance.value)
					_result = {
						enemy: this.autoTarget,
						range: _anima.chargeDistance.value * episode.w100
					};
				if (_result?.enemy) {
					if(this.charging && !this.chargeProperties)
						this.charging = undefined;
					//if(!_result.range)
					const _left = this.HURTLEFT + platformX;
					let _enemyLeft = _result.enemy.HURTLEFT + platformX;
					const _right = _left + this.HURTWIDTH;
					let _enemyRight = _enemyLeft + _result.enemy.HURTWIDTH;
					if(this.chargeProperties?.additionalRange){
						if(this.direction === __left) {
							if(_enemyRight < this.chargeProperties.additionalRange)
								_enemyRight = this.chargeProperties.additionalRange;
						}
						else {
							if(_enemyLeft > this.chargeProperties.additionalRange)
								_enemyLeft = this.chargeProperties.additionalRange;
						}
					}
					_result.range = 
					(MathAbs((this.HURTLEFT + this._HURTBOX_half) - 
						(_result.enemy.HURTLEFT + _result.enemy._HURTBOX_half)) 
						- (_result.enemy._HURTBOX_half + (this._HURTBOX_half * .5)));	
					// (this.direction === __left ? _left - _enemyRight
					// 	: _enemyLeft - _right) + 1;
					if(_result.range <= 0) {
						_result.range = 0;
						if(this.chargeProperties)
							this.chargeProperties.stop = 1;
						else
							return;
					}
					if (this.start <= 1 && this.frame === 0 && !this.charging){
						this.charging = true;
						PlaySound({ key: 'charge', volume: .5, owner: this });
					}
					let _speed = this.chargeProperties?.speed ?? 0;
					if (!this.chargeProperties && this.charging) {
						this.charging = (_anima.chargeDistance.value * .66) <
						(100 * (_result.range / episode.cWidth)) ? 1 : 0;
						if(!_speed)
							for (var i = 0; i <= _anima.chargeDistance.untilFrame ?? 0; i++)
								_speed += _anima.frames[i].speed;
						// const _addRange = _result.range * .2;
						let _additionalRange = 0;
						// if(this.direction === __left)
						// 	_additionalRange = _enemyRight - _addRange;
						// else
						// 	_additionalRange = _enemyLeft + _addRange;
						this.chargeStarted = _gameTick;
						_anima.chargeStarted = _gameTick;
						//burada %10 tölerans da verelim eğer rakip kaçarsa geriye %10 daha ileri gidelim
						this.chargeProperties = {
							enemy: _result.enemy,
							dir: _dir,
							additionalRange: _additionalRange,
							speed: _speed,
							stepX: MathCeil(_result.range / (_speed < 2 ? 1 : _speed))
						};
					}
					else if(this.chargeProperties) {
						if(this.chargeProperties.stop)
							this.chargeProperties.stepX = 0;
						else
							this.chargeProperties.stepX =
								MathCeil((_result.range/* - (_result.enemy.WIDTH / 2)*/)
								/ (_speed < 2 ? 1 : _speed));
					}
					if(this.chargeProperties) {
						this.chargeProperties.speed--;
						if(this.chargeProperties.dir !== this.direction)
							this.direction = this.chargeProperties.dir;
						if (MathAbs(this.chargeProperties.enemy.yPosition - this.yPosition) < 3)
							this.yPosition = this.chargeProperties.enemy.yPosition;
						else {
							if (this.chargeProperties.enemy.yPosition > this.yPosition)
								this.yPosition += MathCeil((this.chargeProperties.enemy.yPosition - this.yPosition) / 2);
							else
								this.yPosition -= MathCeil((this.yPosition - this.chargeProperties.enemy.yPosition) / 2);
						}
						if(!_result.enemy?.getCurrentAnimation?.()?.def?.iframe && isObjectsInTouch(this, _result.enemy)?.touch){
							this.chargeProperties.stop = 1;
							this.chargeProperties.stepX = 0;
						}
					}
				}
				else
					this.chargeProperties = this.charging = undefined;
			}
			else
				this.chargeProperties = this.charging = undefined;
			if(this.frame === 0 && this.start <= 1 && !this.charging) {
				while(this.getCurrentFrame()?.chargeOnly) {
					this.frame++;
				}
			}
		}
		else {
			if(this.charging && !this.chargeProperties)
				this.charging = undefined;
			this.chargeProperties = undefined;
		}
	}
	this.pull = function (_anima, _frame) {
		const _enemies = this.getClosestEnemies(_frame.pullRange);
		for (var _e of _enemies) {
			const _enemyAnima = _e.getCurrentAnimation();
			if (_enemyAnima.priority < _anima.priority)
				_e.pullingBy = {
					target: this,
					speed: _frame.speed
				}
		}
	}
	this.addObject = function (_obj) {
		if ((_obj.main && !this.main) || __batterySaveMode || this.hitStop)
			return null;
		const _position = _obj.position;
		let _o;
		switch (_position) {
			case 'behind-feet': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (_obj.reversed || ((_obj.reversed === undefined) && _o.reversed))
					_o.xGap += MathRound(this.WIDTH / 2);
				else
					_o.xGap += MathRound(this.WIDTH / 2);
				break;
			}
			case 'screen-top': {
				_o = relatedObjects?.find(x => x.id === _obj.key);
				if (!_o)
					return null;
				const _oHeight = (episode.cHeight - this.yGap - this.yPosition) - this.HEIGHT;
				const _zoom = _oHeight / (_o.height * (_o.zoom ?? 1) * __zoom);
				const _w = _o.width, _h = _o.height;
				_o = this.tryUseRelatedObject(_obj, _zoom);
				if (!_o)
					return null;
				_o.left = this.SCREENLEFT - MathRound((_w * _zoom) / 2);
				this.calculateRelatedTop(_o, _position, _obj);
				break;
			}
			case 'under-feet': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				break;
			}
			case 'around': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				break;
			}
			case 'middle-feet': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				break;
			}
			case 'front-feet': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (_obj.reversed || ((_obj.reversed === undefined) && _o.reversed))
					_o.xGap += 3 * MathRound(this.WIDTH / 2);
				else
					_o.xGap -= MathRound(this.WIDTH / 2);
				break;
			}
			case 'over-head': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				break;
			}
			case 'middle-head': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				_o.xGap = -1 * MathRound((this.WIDTH - (_o.width * _o.zoom)) / 2);
				break;
			}
			case 'front-head': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (this.direction === __left)
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				else
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				break;
			}
			case 'behind-head': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (this.direction === __left)
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				else
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				break;
			}
			case 'middle-bottom': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				break;
			}
			case 'middle-top': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				break;
			}
			case 'middle': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				break;
			}
			case 'middle-front': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (this.direction === __left)
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				else
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				break;
			}
			case 'middle-behind': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (this.direction === __left)
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				else
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.WIDTH) / 2);
				break;
			}
			case 'canvas': {
				if (!this.remove){
					if(!this.canvasObjects)
						this.canvasObjects =[];
					if(!this.canvasObjects.find(x => x.key === _obj.key))
						this.canvasObjects.push({ key: _obj.key, params: _obj.p1 });
				}
				return null;
			}
			case 'css': {
				if (!this.remove)
					cssAnimations[_obj.key](this, _obj.p1 ?? this.EXACTLEFT, _obj.p2 ?? ((episode.cHeight - (this.yGap + this.yPosition)) - this.HEIGHT), _obj.p3 ?? this.WIDTH, _obj.p4);
				return null;
			}
			default: {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				if (_obj.zoom || _obj.scale)
					_o.zoom *= (_obj.scale ?? _obj.zoom);
				const _positions = _obj.positions ?? this.getCurrentFrame().positions;
				if (_positions)
					for (var _p of _positions)
						if (_p.key === _obj.position) {
							if (_p.x) {
								const _left = this.main ? this.left : this.left - platformX;
								if (this.direction === __right)
									_o.left = _left + (_p.x * this.ZOOM);
								else
									_o.left = (_left - (_p.x * this.ZOOM)) - (_o.width * _o.zoom);
							}
							if (_p.y)
								this.calculateRelatedTop(_o, { y: _p.y }, _obj);
							_o.positioned = true;
							break;
						}
			}
		}
		const _frame = this.getCurrentFrame();
		_o.position = _position;
		_o.object = _obj;
		if (_frame.leftGap)
			_o.left -= _frame.leftGap;
		if (_obj.still != undefined)
			_o.still = _obj.still;
		if(_obj.stillOnChar != undefined)
			_o.stillOnChar = _obj.stillOnChar;
		if(_obj.multiUse != undefined)
			_o.multiUse = _obj.multiUse;
		if (_obj.xGapMin)
			_o.xGapMin = _obj.xGapMin;
		if (_obj.yGapMin)
			_o.yGapMin = _obj.yGapMin;
		if (_obj.xGapMax)
			_o.xGapMax = _obj.xGapMax;
		if (_obj.yGapMax)
			_o.yGapMax = _obj.yGapMax;
		if (_obj.reset)
			_o.reset = _obj.reset;
		if (_obj.background != undefined)
			_o.background = _obj.background;
		if (_obj.singleton != undefined)
			_o.singleton = _obj.singleton;
		if (_obj.reversed != undefined)
			_o.reversed = _obj.reversed;
		if (_obj.speed)
			_o.speed = _obj.speed;
		if (_obj.shadow)
			_o.shadow = _obj.shadow;
		if (_obj.delay)
			_o.delay = _obj.delay;
		if (_obj.type)
			_o.type = _obj.type;
		if (_obj.repeat)
			_o.repeat = _obj.repeat;
		if(_obj.remove === false && _o.remove)
			_o.remove = false;
		if (_obj.bind && typeof _obj.bind === 'string')
			_o.bind = _obj.bind;
		else if (_obj.bind !== undefined)
			_o.bind = _obj.bind ? this.animation : undefined;
		else if (_o?.bind === true || _obj.bind === true)
			_o.bind = this.animation;
		return _o;
	}
	this.calculateRelatedTop = function (_o, _position, _obj) {
		if (!_obj)
			_obj = _o.object;
		switch (_position) {
			case 'behind-feet':
				_o.top = (this.TOP + this.HEIGHT) -
					MathRound((_o.height * _o.zoom) + ((_obj.bottom ?? 0) * _o.zoom));
				break;
			case 'screen-top':
				_o.top = 0;
				break;
			case 'under-feet':
				_o.top = (this.TOP + this.HEIGHT) -
					MathRound(((_o.height * _o.zoom) / 2) - ((_obj.bottom ?? 0) * _o.zoom));
				break;
			case 'around':
				_o.top = this.TOP;
				break;
			case 'middle-feet':
				_o.top = (this.TOP + this.HEIGHT) -
					MathRound((_o.height * _o.zoom) + ((_obj.bottom ?? 0) * _o.zoom));
				break;
			case 'front-feet':
				_o.top = (this.TOP + this.HEIGHT) -
					MathRound((_o.height * _o.zoom) + ((_obj.bottom ?? 0) * _o.zoom));
				break;
			case 'over-head':
				_o.top = this.TOP -
					MathRound(((_o.height * _o.zoom) / 2) + ((this.getCurrentFrame().headPositionY ?? 0) * this.ZOOM));
				break;
			case 'middle-head':
				_o.top = MathRound(this.TOP -
					(_o.height * _o.zoom) - ((_o.bottom ?? 0) * _o.zoom)) + MathRound((this.getCurrentFrame().headPositionY ?? 0) * this.ZOOM);
				break;
			case 'front-head':
				_o.top = this.TOP -
					MathRound(((_o.height * _o.zoom) / 2) +((this.getCurrentFrame().headPositionY ?? 0) * this.ZOOM));
				break;
			case 'behind-head':
				_o.top = this.TOP -
					MathRound(((_o.height * _o.zoom) / 2) +((this.getCurrentFrame().headPositionY ?? 0) * this.ZOOM));
				break;
			case 'middle-bottom':
				_o.top = (episode.cHeight - this.yGap - this.yPosition) -
					MathRound((_o.height * _o.zoom));
				break;
			case 'middle-top':
				_o.top = (episode.cHeight - this.yGap - this.yPosition) -
					(this.getHeightWithoutGap(1) - MathRound((_o.height * _o.zoom)));
				break;
			case 'middle':
				_o.top = (this.TOP + MathRound(this.getHeightWithoutGap() / 2)) -
					(MathRound((_o.height * _o.zoom) / 2) + ((_obj.bottom ?? 0) * _o.zoom) + ((_o.bottom ?? 0) * _o.zoom));
				break;
			case 'middle-front':
				_o.top = this.TOP + MathRound(this.getHeightWithoutGap() / 2) -
					MathRound((_o.height * _o.zoom) / 2) - ((_obj.bottom ?? 0) * _o.zoom) - ((_o.bottom ?? 0) * _o.zoom);
				break;
			case 'middle-behind':
				_o.top = this.TOP + MathRound(this.getHeightWithoutGap() / 2) -
					MathRound((_o.height * _o.zoom) / 2) - ((_obj.bottom ?? 0) * _o.zoom) - ((_o.bottom ?? 0) * _o.zoom);
				break;
			default:
				if (_position?.y)
					_o.top = ((episode.cHeight - this.yGap - this.yPosition) - this.HEIGHT) +
						(_position.y * this.ZOOM);
				break;
		}
	}
	this.hasStun = function () {
		return this.relatedObjects?.find(x => !x.remove && x.key === 'stun');
	}
	this.knockBackEnemies = function (_f, _enemy) {
		const _knocker = this.related ?? this;
		if (_enemy && _enemy.attacker !== _knocker)
			return;
		if (_enemy && _enemy.hasStun() && _enemy.attacker !== _knocker)
			return;
		let _rate = _knocker.getKeyboardXMove() ? (this.related ? 1 : 2) : 1;
		if (_knocker.knockback && typeof _knocker.knockback === 'number')
			_rate = _knocker.knockback;
		let _p = _f.push ?? _f.atk?.push;
		if(!(_p && (typeof p === 'number')))
			_p = 1;
		else if (_p && (typeof p === 'number'))
			_p = ((_p - 1) / 2)  + 1;
		const _push = MathRound(episode.w100 * ((_p ?? 1) * _rate));
		let _enemies = [_enemy];
		if (!_enemies[0])
			_enemies = _knocker.finishTarget ? [_knocker.finishTarget] : episode.getAvailableEnemies(_knocker)?.filter(x => x.attacker === _knocker || x.pushingBy === _knocker);
		if (_enemies?.[0])
			for (var _e of _enemies) {
				if (_e.dead || (_e.knockbacking && _e.dying) || _e.noCC || _e.autoAttacking || _e.still)
					continue;
				const _enemyFrame = _e.getCurrentFrame();
				if(_enemyFrame.def?.iframe)
					continue;
				let _skillName = (_e.isDead() && this.alp && _e.animations.deadfly && _e.animation !== 'deadfly') ? 'deadfly' : 'knockback' + ((_enemyFrame.hurt && !_f.atk?.hurt?.reset) ? _enemyFrame.hurt : (_f.atk?.hurt?.type ?? 'air'));
				if(_skillName === 'deadfly') {
					_e.animate(_skillName);
					(this.owner ?? this).talk();
					continue;
				}
				else if (_knocker.start < 2 && !_enemy) {
					_e.iframe = false;
					continue;
				}
				else if (_knocker.start <= 2 || _enemy) {
					if(_skillName.startsWith('knockbackground') && _e.animation.startsWith('hurtair') && _e.animations.knockbackair)
						_skillName = 'knockbackair';
					if(!_e.animation.startsWith('knockback') && _skillName.startsWith('knockback')){
						const _fall = _e.tryFall();
						if(_fall)
						{
							_e.setHealth(0);
							_e.killedBy = _knocker.key;
							_e.animate('deadfall', 1);
						}
						else
							_e.animate(_skillName);
					}
					(this.owner ?? this).talk();
					_e.direction = _knocker.direction === __right ? __left : __right;
					if (_e.dying)
						_e.knockbacking = true;
					if (_f.atk?.hurt?.next === 'dead')
						_e.getCurrentAnimation().next = 'dead';
					_e.analyzeSkill();
				}
				const _step = MathCeil((_push * ((_f.speed - (_knocker.realTime ? 1 : _knocker.start)) / _f.speed)) / 100);
				if (_step) {
					if(!_e.pushback && _e.bleed)
						PlaySound({key:'bonecrack', volume:1});
					_e.pushingBy = _knocker;
					_e.pushback = true;
					const _eo = _e.HURTLEFT + _e._HURTBOX_half;
					const _to = _knocker.HURTLEFT + _knocker._HURTBOX_half;
					if (this.push === 'front')
						_e.pushDirection = this.direction;
					else if (this.push === 'back')
						_e.pushDirection = this.direction === __right ? __left : __right;
					else if(_to > _eo && _f.atk?.aoe)
						_e.direction = _e.pushback = _e.pushDirection = __right;
					else if(_to <= _eo && _f.atk?.aoe)
						_e.direction = _e.pushback = _e.pushDirection = __left;
					// else if ((_eo + (episode.cWidth * .02)) >= _to && _knocker.direction === __right)
					// 	_e.pushDirection = _knocker.direction;
					// else if ((_to + (episode.cWidth * .02)) >= _eo && _knocker.direction === __left)
					// 	_e.pushDirection = _knocker.direction;
					// else
					// 	_e.pushDirection = undefined;
					else
						_e.pushDirection = _knocker.direction;
					let _range = episode.pvp ? 0 : this.getRangeBetween(_e);
					if(_range > 10)
						_range = 10;
					_e.pushRate = ((!_e.animations[_skillName] && !_e.attackingOnlyBy && _e.defaultDirection === __right) ? -1 : 1) * (_step + (_range / 10));
					if(_e.pushRate > .5)
						_e.pushRate = .5;
					else if(_e.pushRate  < -.5)
						_e.pushRate = -.5;
					//console.log('PR ' + _e.pushRate + ' step: ' + _step + ' speed ' + _f.speed + ' ks ' + _knocker.start);
					if(_e.critDead)
						_e.pushRate *= _e.critDead;
				}
			}
	}
	this.calculateEasing = function (_frame, _rate) {
		const _start = this.start + 1;
		if (_start <= (_frame.speed / 3))
			return _rate * 2;
		else if (_start > (_frame.speed * (2 / 3)))
			return _rate / 2;
		return _rate;
	}
	this.pushEnemies = function (_f) {
		if (typeof _f.push === 'number') {
			this.knockBackEnemies(_f);
			return;
		}
		const _enemies = episode.getAvailableEnemies(this, function (_e) {
			return _e == this.finishTarget
		})?.filter(x => x.attacker == (this.related ?? this) || x.pushingBy == this || x == this.finishTarget);
		if (_enemies?.[0]) {
			const _anima = this.getCurrentAnimation();
			const comboIndex = _anima.comboOrder ?? 1;
			const comboScale = .9 + (comboIndex * .1);
			for (var _e of _enemies) {
				if (_e.health <= 0 || _e.dead || (_e.knockbacking && _e.dying) || _e.release || _e.noCC || _e.autoAttacking)
					continue;
				const _ef = _e.getCurrentFrame();
				if (_e.class === 'boss' && _ef.def?.iframe)
					continue;
				if (_f.extraStepYRate && _f.push !== 'x')
					_e.extraStepYRate = this.extraStepYRate;
				if (_f.extraStepXRate && _anima.useExtraStepXRate) {
					if (!_e.aoe && this.direction === __left && _e.SCREENLEFT > (this.SCREENLEFT + this.WIDTH))
						continue;
					if (!_e.aoe && this.direction === __right && (_e.SCREENLEFT + _e.WIDTH) < this.SCREENLEFT)
						continue;
					if (this.pushDirection)
						this.direction = this.pushDirection;
					_e.pushDirection = this.direction;
					let _left = (((episode.cWidth * (MathAbs(_f.extraStepXRate) / 100))) + ((_f.leftGap ?? 0) * (this.related ?? this).ZOOM));
					_e.pushingBy = this;
					_e.direction = this.direction === __right ? __left : __right;
					_e.pushRate = _e.calculateEasing(_ef, 
						((100 * (_left ?? 0)) / episode.cWidth) * (_e.defaultDirection !== __right ? 1 : -1)
						* comboScale);
					if (_f.push === 'reversed') {
						const _t = isObjectsInTouch(this.related ?? this, _e, 100);
						if (_t.touch){
							delete this.pull;
							_e.pushRate = 0;
						}
						else {
							this.pull = true;
							_e.pushRate *= -1;
							_e.pushDirection = _e.pushDirection === __right ? __left : __right;
							//_e.GO = 1;
						}
					}
				}
			}
		}
	}
	this.canFinish = function() {
		if(this.finishWhen && !this.finishWhen())
			return false;
		return ((this.health * (100 / (this.finishAfter ?? __finishingMoveHPPercent))) <= this.MAXHP);
	}
	this.checkFinishingMoveAvailable = function (_anima) {
		if(!this.main)
			return;
		if(!this.hasFinishingMove || _anima.finishingMove || _anima.interactive){
			if(this.finishingMoveVisible)
				addClass(_finishingMove, 'v-none');
			return;
		}
		const _close = this.getClosestEnemy(this.maxFinishingMoveRange ?? 30, this.direction, function (_e) {
			return _e.finishableWith && !_e.release;
		});
		const _enemy = _close?.enemy;
		if (_enemy && !_enemy.gradeLeft && !_enemy.invulnerable && (_enemy.health > 0 || _enemy.readyForFatality) &&
		(_enemy.readyForFatality || _enemy.canFinish())) {
			const _f = this.upcomingFinishingMove ?? _enemy.finishingMoves[getRandomValue(0, _enemy.finishingMoves.length - 1)];
			const _finishAnima = this.animations['finish' + _f];
			if(_finishAnima && (!_finishAnima.when || _finishAnima.when(_enemy, this))) {
				_close.range = (_close.range / episode.cWidth) * 100;
				if(((_finishAnima.minRange??0) > _close.range)
					|| ((_finishAnima.maxRange??30) < _close.range))
				{
					if(episode?.fatalityAvailable)
						addClass(_finishingMove, 'v-none');
				}
				else {
					this.upcomingFinishingMove = _f;
					//const _actions = document.querySelectorAll('.action:not(#skill9,.v-none)');
					//if (!hasActiveActions()) {
						if(!this.target)
							removeClass(_finishingMove, 'v-none');
						else if(this.target.targeted)
							this.target.targeted = false;
						if(!_enemy.targeted)
							_enemy.targeted = true;
						this.target = _enemy;
						if(!_enemy.readyForFatality)
							this.targetedTime = _gameTick;
						this.finishingMoveVisible = true;
						return;
					//}
				}
			}
		}
		if(!(this.targetedTime > (_gameTick - 1000))){
			if (this.target) {
				if(this.target.targeted)
					this.target.targeted = false;
				this.target = undefined;
			}
			if(this.finishingMoveVisible){
				addClass(_finishingMove, 'v-none');
				this.finishingMoveVisible = false;
			}
			if(this.upcomingFinishingMove)
				this.upcomingFinishingMove = undefined;
			if(this.targetedTime)
				this.targetedTime = undefined;
		}
	}
	// this.getEnemyKillingBy = function () {
	// 	if(this.onlyTarget)
	// 	{
	// 		const _ot = episode.seenEnemies.find(x => x.key ===  this.onlyTarget);
	// 		if(_ot)
	// 			return [{enemy:_ot}];
	// 	}
	// 	if(!this.finishTarget)
	// 		return undefined;
	// 	const _kb = episode.seenEnemies.find(x => x == this.finishTarget && !x.dead && x.health > 0);
	// 	if (_kb)
	// 		return [{ enemy: _kb }];
	// 	return undefined;
	// }
	this.getEnemyKillingBy = function () {
		const _enemies = episode.seenEnemies;
		if (!_enemies?.length) return;

		let _onlyTarget = this.onlyTarget;
		let _finishTarget = this.finishTarget;

		let _ot = null;
		let _kb = null;

		for (let i = 0; i < _enemies.length; i++) {

			const e = _enemies[i];

			// ===== ONLY TARGET =====
			if (_onlyTarget && e.key === _onlyTarget) {
				_ot = e;
				break; // priority en yüksek → direkt çık
			}

			// ===== FINISH TARGET =====
			if (!_kb && e === _finishTarget && !e.dead && e.health > 0) {
				_kb = e;
				// break yok → belki onlyTarget aşağıda vardır
			}
		}

		if (_ot)
			return [{ enemy: _ot }];

		if (_kb)
			return [{ enemy: _kb }];

		return undefined;
	};

	this.respawn = function() {
		this.animations.respawn = {
			key: 'respawn',
			type: 'skill',
			frames: [
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: 0,
					spriteOrigin: 0,
					spriteHeight: this.HEIGHT,
					objects: [{
						key:'respawn',
						position: 'middle',
						scale: (this.height * this.zoom) / 100
					}],
					sound: { key: 'puff', volume: .3 },
					speed: 20,
					def: { iframe: true }
				}
			]
		};
		this.animate('respawn', 1);
		this.noLoot = 1;
	}
	this.getAtackableUnits = function (_anima, _frame, _force) {
		const _onlyKilling = this.getEnemyKillingBy();
		if(_onlyKilling)
			return _onlyKilling;
		const _enemies = _onlyKilling ?? this.getEnemiesInTouch(_anima, _frame, 10, null, _force, this.charging);
		const units = [];
		if (_enemies?.[0])
			for (var _en of _enemies) {
				const _enemy = _en.enemy;
				if (_enemy.finishing && this.finishTarget != _enemy)
					continue;
				if ((_enemy.knockbacking && _enemy.dying) || _enemy.dead || _enemy.release || _enemy.invulnerable || _enemy.iframe)
					continue;
				const _eo = _enemy.HURTLEFT + _enemy._HURTBOX_half;
				const _to = this.HURTLEFT + this._HURTBOX_half;
				if (_enemy.attackingOnlyBy === this.key && !_enemy.aoe && this.direction === __left && _eo > _to)
					continue;
				if (_enemy.attackingOnlyBy === this.key && !_enemy.aoe && this.direction === __right && _eo < _to)
					continue;
				units.push(_en);
			}
		return units;
	}
	this.checkBlock = function (_attacker) {
		const _tp = _attacker.getCurrentAnimation().priority;
		if ((_tp ?? 10) > _e.animations.block.priority)
			return true;
		return false;
	}
	this.isSmashable = function() {
		return !this.main && !this.friendly && !this.alp && this.class !== 'object' && !this.noSmash &&
		this.class !== 'boss' && !this.ironSkin && this.class !== __spell && !this.isDead();
	}
	this.analyzeSkill = function() {
		if(this.animation.startsWith('knockback')) {
			const _anima = this.getCurrentAnimation();
			const _frames = _anima.frames;
			const _rand = getRandomValue2(80, 120) / 100;
			_frames.forEach(x => {
				if(x.extraStepXRate && !x.realExtraStepXRate)
					x.realExtraStepXRate = x.extraStepXRate;
				if(x.extraStepYRate && !x.realExtraStepYRate)
					x.realExtraStepYRate = x.extraStepYRate;
				if(x.realExtraStepXRate)
					x.extraStepXRate = x.realExtraStepXRate * _rand;
				if(x.realExtraStepYRate)
					x.extraStepYRate = x.realExtraStepYRate * _rand;
			});
		}
	}
	this.talk = function() {
		if(!__storyCutScenePlaying && this.talkCount && (_gameTick - (this.lastTalkTime ?? 0) > 10000)) {
			if(this.animation.startsWith('counter'))
				return;
			this.lastTalkTime = _gameTick;
			let _talkId;
			while(true) {
				_talkId = getRandomValue2(1, this.talkCount);
				if(this.talkCount === 1)
					break;
				if(_talkId !== this.lastTalkId){
					this.lastTalkId = _talkId;
					break;
				}
			}
			PlaySound({path:'./images/talks/' + this.class + '/' + _talkId + '.mp3', volume: 1 });
		}
	}
	this.installHurtFeet = function(_f) {
		this.animations.hurtfeet = new animation(
			_f.atk?.hurt?.burn 
			? 
			createHurtFeetAndBurn(this) 
			: (_f.atk?.hurt?.knockback 
				? 
				createHurtFeetWithKnockback(this, _f.atk.hurt.knockback) 
				: 
				createHurtFeet(this.zoom, this.bloodColor, null, _f.bottomGap, _f.atk?.type)
			)
		);
	}
	this.installFall = function(_cliff) {
		this.animations.deadfall = new animation(
			createFall(this)
		);
		this.animations.deadfall.key = 'deadfall';
		this.animations.deadfall.zoom = _cliff.background ? .95 : 1.05;
		if(_cliff.background)
			this.animations.deadfall.frames.forEach(x => {
				if(x.extraStepYRate < 0 || x.extraStepYRate === undefined)
					x.background = true;
			});
		else
			this.animations.deadfall.frames.forEach(x => {
				if(x.extraStepYRate < 0 || x.extraStepYRate === undefined)
					x.foreground = true;
			});
	}
	this.smash = function(_t, _f) {
		_f = _f ?? this.getCurrentFrame();
		this.smasher = _t.owner ?? _t;
		//if(!this.animations.hurtfeet)
		this.installHurtFeet(_f);
		this.animate('hurtfeet', 1);
		this.smasher.talk();
	}
	this.addPVPRespawnFrame = function() {
		const x = this;
		Object.keys(x.animations).filter(y => y.startsWith('dead')).forEach(y => {
			x.animations[y].frames.forEach(z => {
				if(z.props?.remove) {
					delete z.props;
					z.do = function() {									
						x.left = x.startLeft;
						if(x.startLeft < (episode.cWidth / 2))
							x.direction = __right;
						else												
							x.direction = __left;
						x.yPosition = getRandomValue2(0, getGroundHeight());
						x.health = x.maxHP;
						x.dead = x.dying = x.ultimateUsed = false;
						delete x.killedBy;
						const _animaKeys = Object.keys(x.animations);
						_animaKeys.forEach(y => x.animations[y].next = x.animations[y].realNext);
						x.removeBuffs();
						x.animate('idle',1);
						x.swapAnimation('idle');
						x.attackerCount = x.hitTakenCount = 0;
						x.setHealth(x.maxHP);
						x.commonItem = undefined;
						resetSkills(null, null,x);
						if(x.main) {
							let _div = document.querySelector('.game-status-screen');
							if(_div) 
								_div.remove();
						}
						x.addBuff({ key: 'release', level: 3, ms: 3000, end: function(_c) {
							_c.still = _c.immobilize = _c.disableKeyboard = false;
							delete x.grayAvatar;	
							const _avatar = document.getElementById('char-' + x.key);
							if (_avatar)
								removeClass(_avatar, 'gray');
						} });
						x.immobilize = x.still = true;
						if(x.keyboard)
							x.disableKeyboard = true;
						if(x.main)
						{
							platformX = 0;
							prevPlatformX = -1;
						}
					}
				}
			});
		});
	}
	this.hurtEnemy = function(_anima, _f, _e, _ef, _ea, _tp, _ep) {
		const _t = this;
		if(_t.attackedUnitCount > (_anima.maxAttackedCount ?? __maxAttackedCount)){
			return false;
		}
		if((_gameTick - _e.comfortStarted) < 500){
			return false;
		}
		if (_ea.key.startsWith('dead') || _ea.key === 'release'){
			return false;
		}
		if (_f.atk?.buffs)
			_f.atk.buffs.forEach(x => _e.addBuff(x, _gameTick));
		if (_f.atk.rate > 0)
			(_t?.owner ?? _t?.related ?? _t).increaseHitCount();
		else{
			return false;
		}
		// if(!episode.pvp && episode.enemies?.filter(x => x.autoTarget === _e && x.attacked && x.animations[x.animation].attack)?.length > __maxAttackedCount)
		// 	return false;
		if(_t.parentKey === _e.key || _e === _t.related){
			return false;
		}
		let _critHitTaken = false;
		const _prevAutoMode = _e.autoMode;
		if (_e.autoMode !== 2 && !_e.main && !_e.friendly && !_e.socketId) {
			if (_e.groupId)
				episode.enemies.filter(x => x.groupId === _e.groupId).forEach(x => {
					x.setAutoMode(2);
				});
			else
				_e.setAutoMode(2);
		}
		if (_e.immunities?.[0])
			if (!_f.atk.type || _e.immunities.indexOf(_f.atk.type) !== -1) {
				addDmgFrame({
					//text: '<p data-text="IMMUNE">IMMUNE</p>',
					//class: 'dmg dmg-orange effect-immune',
					text: 'immune',
					from: _t,
					x: _e.LEFT,
					y: episode.cHeight - _e.yPosition - _e.HEIGHT
				});
				return false;
			}
		if (_prevAutoMode === 2 && !_e.keyboard && _e.animations.block && _e.fatique >= fatiqueDecreasement) {
			if (_e.animation === 'run' || _e.animation === 'walk' ||
				_e.animation === 'idle' || _e.animation === 'hurtblock') {
				if (_e.checkBlock(_t)) {
					if(_e.animations.hurtblock)
						_e.animate('hurtblock', 1);
					else
						_e.animate('block', 1);
					_e.decreaseFatique(_t, _f.atk?.rate);
					_e.autoAttacking = true;
					_e.setAutoTarget(_t, null, 5);
					addDmgFrame({
						from: _e,
						text: 'block',
						x: _t.LEFT,
						y: episode.cHeight - _e.yPosition - _e.HEIGHT
					});
					return false;
				}
			}
		}
		else if (_prevAutoMode === 2 && !_e.keyboard && _e.animations.roll && (_e.animations.roll.charge > 0 || _e.animations.roll.charge === undefined)
			&& (!_e.animations.roll.rate || (getRandomValue(1, 100) <= _e.animations.roll.rate))) {
			if (_e.animation === 'run' || _e.animation === 'walk' ||
				_e.animation === 'idle') {
				_e.animate('roll', 1);
				_e.setAutoTarget(_t, null, 6);
				_e.autoAttacking = true;
				return false;
			}
		}
		else if (_e.animation === 'dodge' || (_prevAutoMode === 2 && !_e.keyboard && _e.animations.dodge && !(_e.animations.dodge.coolDownLeft > 0) &&
		(!_e.animations.dodge.rate || (getRandomValue(1, 100) <= _e.animations.dodge.rate)))) {
			if (_e.animation === 'run' || _e.animation === 'walk' || _e.animation === 'idle'){
				_e.animate('dodge', 1);
				_e.setAutoTarget(_t, null, 7);
				_e.autoAttacking = true;
				return false;
			}
		}
		if (_f.atk.hurt) {
			let _decreaseHP;
			_e.removeBuffByKey('invisibility');
			if(_e.sleep && !_e.curse) {
				_e.removeBuffByKey('sleep');
				delete _e.sleep;
			}
			if(_f.atk.hurt.do)
				_f.atk.hurt.do(_f, _t, _e);
			if (!_e.alp && _f.atk.hurt.catch === 'back' && _e.direction !== _t.direction)
				_e.direction = _e.direction === __left ? __right : __left;
			else if (!_e.alp && _f.atk.hurt.catch === 'front' && _e.direction === _t.direction)
				_e.direction = _e.direction === __left ? __right : __left;
			if (_f.atk.hurt.sound)
				requestAnimationFrame(() => {
					if(_f.atk.hurt.sound.key)
						PlaySound(_f.atk.hurt.sound);
					else
						PlaySound({ key: _e.class + _f.atk.hurt.sound, owner: _e }, [_f.atk.hurt.sound]);
				});
			else if(_e.bleed)
				PlaySound({key:'fleshhurt' + getRandomValue2(1,6), volume:.7, owner: _e});
			if (_f.atk.hurt.props) {
				const _dying = _e.dying;
				_e.setProps(_f.atk.hurt.props);
				if (!_dying && _e.dying)
					_e.killingBy = _t.key;
			}
			if(_f.atk.hurt.smash && _e.isSmashable()) {
				_e.smash(_t, _f);
				return { smashed:true };
			}
			else if(_e.phased) {
				let _phaseDropped;
				if(_f.atk.hurt.smash)
					_e.phased = 0;
				else{
					_e.phased--;
					_phaseDropped = 1;
				}
				if(_e.phased > 0) {
					let _hurtAnim = _e.animations['phase' + _e.phased];
					if(_phaseDropped && _hurtAnim?.when && !_hurtAnim.when(_e)){
						_e.phased++;
						_decreaseHP = 1;
					}
					else {
						_decreaseHP = 1;
						const _src = _hurtAnim.frames[0].src ?? _hurtAnim.src;
						if(_src) {
							_e.animations.idle.src = _src;
							if(_e.animations.idle.resetImage)
								_e.animations.idle.resetImage();
						}
						_e.animations.idle.frames = [{
							speed: 999,
							spriteLeft: _hurtAnim.frames[0].spriteLeft,
							spriteTop: _hurtAnim.frames[0].spriteTop,
							bottomGap: _hurtAnim.frames[0].bottomGap,
							spriteWidth: _hurtAnim.frames[0].spriteWidth,
							spriteHeight: _hurtAnim.frames[0].spriteHeight,
							spriteOrigin: _hurtAnim.frames[0].spriteOrigin
						}];
						_e.animations.hurtground1 = _hurtAnim;
						_e.animations.hurtground1.key = 'hurtground1';
						_e.animate('hurtground1', 1);
					}
				}
				else
					_e.animate('dead', 1);
			}
			const _hasReflect = _e.reflect;
			if(_hasReflect)
				addDmgFrame({
					//text: '<p data-text="REFLECT">REFLECT</p>',
					//class: 'dmg dmg-orange effect-reflect',
					text: 'reflect',
					from: _t,
					x: _e.LEFT,
					y: episode.cHeight - _e.yPosition - _e.HEIGHT
				});
			if (!_e.hurting?.count) {
				if (_f.atk.hurt.spells)
					for (var _fsp of _f.atk.hurt.spells)
						_t.throwSpell({ spell: _fsp }, _t.parent ?? _t);
				_f.atk.hitTaken ??= 1;
				if (_f.atk.hitTaken > 0) {
					if (_ea.hurt) {
						if (_e.hitTakenCount === undefined)
							_e.hitTakenCount = 0;
						_e.hitTakenCount += _f.atk.hitTaken;
						// if(!_t.attackedUnitCount)
						// 	_e.increaseRage(_f.atk.hitTaken);
					}
					else
						_e.hitTakenCount = _f.atk.hitTaken;
				}
				let _erelease;
				if (!_e.isDead() && !_e.still && _e.hitTakenCount > _e.releaseAfter && _e.class !== 'object')
				{
					_erelease = true;
					if(_e.animations.release?.reversed) {
						if(_e.EXACTLEFT< _t.EXACTLEFT)
							_e.direction = __right;
						else
							_e.direction = __left;
					}
				}
				let _hurtType;
				if (!_erelease && _ea.hurt) {
					_e.cc = _ea.key;
					if (_f.atk.hurt.key) {
						if (_f.atk.hurt.imediateBreak)
							_e.cc = _f.atk.hurt.key;
						else if (_ea.hurt) {// && _e.animations[_f.atk.hurt.key]?.hurt === _ea.hurt)
							if(_e.cc !== 'hurtair' && _e.cc !== _f.atk.hurt.key)
								_e.cc = _f.atk.hurt.key;
						}
						else if (_e.animations[_f.atk.hurt.key]?.reset || _f.atk.hurt.reset){
							_e.cc = _f.atk.hurt.key;
						}
						else if (!_e.animations[_f.atk.hurt.key]) {
							if (_f.atk.hurt.type === 'air' && _e.animations['hurtground1']) {
								_hurtType = 'ground';
								_e.cc = 'hurtground1';
							}
							else if (_f.atk.hurt.type === 'ground' && _e.animations['hurtground1']) {
								_hurtType = 'ground';
								_e.cc = 'hurtground1';
							}
							else if (_f.atk.hurt.type === 'ground' && _e.animations['hurtair']) {
								_hurtType = 'air';
								_e.cc = 'hurtair';
							}
						}
					}
				}
				if (!_ea.hurt || _erelease) {
					_e.cc = _e.attacker = undefined;
					_e.hitTakenCount = _e.extraStepXRate = 0;
				}
				_e.attacker = _t?.related ?? _t;
				if(_t.related)
					_e.realAttacker = _t;
				else
					_e.realAttacker = undefined;
				_e.attackerRange  = _e.getZRangeBetween(_t);
				_t.attacked = 1;
				if(_t.class === 'object')
					_e.attackedByObject = 1;
				else if(_e.attackedByObject)
					delete _e.attackedByObject;
				if (_t?.related)
					_f.atk.hurt.objects?.forEach(x => _e.addObject(x));
				const _cced = _f.atk.hurt.type !== 'common' && (!_ep || _tp < _ep) ;
				const _charged = _anima.chargeDistance && (_t.charging || ((_gameTick - _t.chargeStarted) < 999));
				let _animateSkill;
				if ((_erelease || _f.atk.hurt.key) && _cced) {
						_animateSkill = _e.cc ?? _f.atk.hurt.key;
						if (!_e.animations[_animateSkill])
							_animateSkill = 'hurtground1';
					if (!_erelease) {
						//if (!_e.animations[_animateSkill]?.frames?.find(x => x.sound))
						//	PlaySound({ owner: _e, key: (_e.main ? _e.class : _e.name.toLowerCase()) + (_e.main ? _animateSkill : 'hurt') }, ['hurt']);
						if (_animateSkill.startsWith('hurt') && !_e.noCC){
							if(_animateSkill === 'hurtair' && _e.animations.hurtair2)
							{
								let airPoss;
								for(airPoss = 2; airPoss > 1; airPoss++) {
									if(!_e.animations['hurtair' + (airPoss + 1)])
										break;
								}
								airPoss = getRandomValue(1, airPoss);
								if(airPoss > 1)
									_animateSkill += airPoss.toString();
							}
							if(_animateSkill.startsWith('hurtground') && _e.groundHurtKeys.length > 1)
								_animateSkill = _e.groundHurtKeys[getRandomValue2(0, _e.groundHurtKeys.length - 1)];
							else if(_animateSkill.startsWith('hurtair') && _e.airHurtKeys.length > 1)
								_animateSkill = _e.airHurtKeys[getRandomValue2(0, _e.airHurtKeys.length - 1)];
							if(_t.animations[_t.animation].uncounterable)
								_e.noCounter = 1;
							if(_f.atk.hurt?.airFlow)
								_e.airFlow = _f.atk.hurt.airFlow;
							_e.animate(_animateSkill);
							_e.addObject({
								position: 'css',
								key: 'zoomdynamic',
								p1: _t.direction,
								p2: (_t.criticalHit ? 1 : 0) + _f.atk.rate
							});
							// if(_t.class !== __spell){
							// 	let distortMS;
							// 	if(_f.atk.rate < 1)
							// 		distortMS = 80;
							// 	else if(_f.atk.rate <=2)
							// 		distortMS = 100;
							// 	else
							// 		distortMS = 120;
							// 	_e.addObject({
							// 		position:'canvas',
							// 		key:'distortion',
							// 		p1: {
							// 			after:true,
							// 			rX: MathRound(episode.cWidth / (getRandomValue2(80,100) / 10)),
							// 			rY: MathRound(episode.cWidth / (getRandomValue2(80,100) / 10)),
							// 			ms:distortMS
							// 		}
							// 	});
							// }
							//Enemy cced
							if(_e.alp) {
								const _pstv = _e.getTalentValue('passive-stun');
								if(_pstv) {
									if(getRandomValue2(1, 100) <= _pstv) {
										_e.throwSpell({
											key: 'electricboltsmall'
										});
										_e.throwSpell({
											key: 'electricboltsmall',
											reversed: true
										});
									}
								}
							}
						}
					}
				}
				_e.hurting = { hit: 4 };
				_e.hurtColor = _f.atk.type === 'fire' ? '#E25822' : (_f.atk.type === 'toxic' ? '#66cc1a' : '#ffffff');
				_e.hurting.count = _e.hurtColor ? ((_f.atk.type === 'fire' || _f.atk.type === 'ice' || _f.atk.type === 'toxic') ? 3 : 4) : 3; // _e.getCurrentFrame().speed;
				if(_e.size === 'big')
					_e.hurting.count = MathCeil(_e.hurting.count / 2);
				if(_charged && _t.main){
					requestAnimationFrame(function() { _t.addObject({ key: 'impact', position: 'css', p2: _t.direction });});
					_t.talk();
				}
				if (!_e.noCC && !_e.still && !_e.finishing && _cced && !_erelease && (_hurtType ?? (_e.animations[_e.cc]?.hurt ?? _f.atk.hurt?.type)) === 'ground')
					requestAnimationFrame(function() {
						_e.addObject({ key: 'stun', position: 'middle-head', yGap: -25 });
					});
				if (_cced && _e.casting)
					_e.cancelCast();
				if(_cced && _e.main)
					removeClass(_gamePad, 'zoom');
				if (_f.atk.rate) {
					if(_f.atk.hurt?.hitZoom)
						_e.setHitZoom(_ef, _f.atk.hurt?.hitZoom);//_ef.hitZoom = _f.atk.hurt?.hitZoom;
					if (!_f.atk.hurt.dead) {
						let _hasEffect;
						if ((_t.class === __spell || _t.start <= 1) && (_e.health > 0 && !_e.finishing)) {
							if (_f.atk.hurt.buffs)
								_f.atk.hurt.buffs.forEach(x => _e.addBuff(x, _gameTick));
							let _dmg = _t.getAtkRate();
							if(_f.atk.rate)
								_dmg *= (_t.alp ? _t.getSkillRate() : 1) * _f.atk.rate;
							if (_dmg < 1)
								_dmg = 1;
							const _tr = (_t.related ?? _t);
							var _calculatedCrit = (((_t.coopWith ?? _t).critRate) * ((100 - ((_e.coopWith ?? _e).critResistRate ?? 0))/100) * 100);
							if (getRandomValue2(0, 10000) <= _calculatedCrit) {
								_dmg *= (2 + ((_t.critDmgRate ?? 0) / 100));
								if((_e.coopWith ?? _e).critDmgResistRate)
									_dmg *= ((100 - (_e.coopWith ?? _e).critDmgResistRate) / 100);
								_t.criticalHit = _critHitTaken = true;
								if(_tr.alp)
								{
									const _rstp = _tr.getTalentPoint('passive-atk-speed');
									if(_rstp > 0)
										_tr.addBuff({ key: 'dance', level: _rstp });
								}
								if (episode.pvp) {
									if (_t.dmgGiven === undefined)
										_t.dmgGiven = 0;
									_t.dmgGiven += _dmg;
								}
							}
							else
								_t.criticalHit = false;
							// setTimeout(function() {
							// 	_t.randomShake(_e, _anima, _f, _dmg, _t.criticalHit);
							// }, getRandomValue2(20, 35));
							const _newDmg = _t.calculateElementalDmg(_dmg, _e);
							let _dmgEffect;
							if(_newDmg > _dmg && (_f.atk.type && _f.atk.type !== 'common')) {
								_dmgEffect = _t.getElementalEffect(_e);
								_dmg = _newDmg;
								_hasEffect = 1;
							}
							_dmg = _t.calculateDmgReduce(_dmg, _e, _f.atk.ignoreDef);
							if(!_f.atk.ignoreDef && _ef.def?.rate)
								_dmg *= (1 - _ef.def.rate);
							_dmg = MathCeil(_dmg);
							if(episode.war)
								_dmg *= 2;
							//_dmg = 1;
							_tr.checkSteal(_dmg, _e);
							if (!_e.main)
								addDmgFrame({
									atkType: _f.atk?.type ?? _dmgEffect ?? 'common',
									val: _dmg,
									crit: _t.criticalHit,
									heavy: _charged || _f.atk?.hurt?.slam || _f.atk.rate > 2 || _t.criticalHit,
									x: _e.LEFT,
									from:_t,
									y: episode.cHeight - _e.yPosition - _e.HEIGHT
								});
							else
								addDmgFrame({
									atkType: 'hurt',
									val: _dmg,
									x: _e.LEFT,
									from:_t,
									y:episode.cHeight - _e.yPosition - _e.HEIGHT
								});
							if (!_e.dmgTaken) {
								_e.dmgTaken = 0;
								if (_e.autoMode >= 0 && !_tr.invulnerable) {
									if (_e.enemy)
										_e.setAutoMode(2);
									if(!_t.invulnerable)
										_e.setAutoTarget(_t, null, 8);
								}
							}
							_e.dmgTaken += _dmg;
							if(!_e.inCombat)
								_e.inCombat = 1;
							if(_hasReflect)
								_tr.decreaseHealth(_dmg, _e);
							else if(!_e.phased || _decreaseHP){
								if(_e.realTime && (_t.main || (_t.related ?? _t.owner)?.main))
									setTransferMessage([{
										t: _e.socketId,
										s: _tr.socketId,
										k: _dmg
									}]);
								if(_f.atk.hurt?.skipTinyCameraMove)
									episode.skipTinyCameraMove = _f.atk.hurt.skipTinyCameraMove;
								_e.decreaseHealth(_dmg, _t.related ?? _t);
								_e.lastDamage = _dmg;
								if(_f.atk.hitZoom)
									_t.setHitZoom(_f, _f.atk.hitZoom);//_f.hitZoom = _f.atk.hitZoom;
								if(_e.main && _critHitTaken && _cced){
									_e.addObject({
										// position: 'css',
										// key: 'criteffect'
										position: 'canvas',
										key: 'crit',
										p1: {
											startTime: undefined,
											critTime:0
										} 
									});
									_e.soundVolumeRate = 2;
								}
								_e.increaseRage(_f.atk.hitTaken * (_t.criticalHit ? 2 : 1), null, 1);
								let _canStop = false;
								if(_t.class !== __spell && !_t.hitStop && (_anima.hitStop || _f.atk.hitStop)) {
									let _stopAdd = -1;
									if(!_t.criticalHit) {
										if(_f.atk.rate < 1)
											_stopAdd = -2;
										else if(_f.atk.rate >= 2)
											_stopAdd = 0;
									}
									else
										_stopAdd = 1;
									const _stopMe = (_f.atk.hitStop ?? _anima.hitStop) + _stopAdd;
									if(_e.class !== __spell && !_e.hitStop) {
										if(!_f.hitStopTime || (_gameTick - _f.hitStopTime) > 500)
										{
											_e.hitStop = 2;
											_t.hitStop = _stopMe;
											_f.hitStopTime = _gameTick;
											_canStop = 1;
										}
									}
								}
								//_e.addObject({key:'hit' + getRandomValue2(1,5), position: 'middle'});
								//successfull hit
								_e.lastHitSkill = _tr.animation;
								_e.lastHitTime = _gameTick;
								if(_e.isDead())
								{
									if(_t.tag || _f.atk.hurt.smashIfDead) {
										_e.smash(_t, _f);
										return {smashed: true, criticalHit: _critHitTaken};
									}
									const _isHeavyHit = (_f.knockback || _charged || (_f.push && typeof _f.push === 'number'));
									const _fall = false;
									//_e.tryFall(_isHeavyHit);
									if(_isHeavyHit && !_fall) {
										_e.critDead = _t.criticalHit ? 3: 2;
										let _knockbacked;
										if(_hurtType === 'air' && _e.animations.knockbackair){
											_e.animations.knockbackair.next = 'dead';
											_e.animate('knockbackair', 1);
											_knockbacked = 1;
										}
										else if(_e.animations.knockbackground){
											_e.animations.knockbackground.next = 'dead';
											_e.animate('knockbackground', 1);
											_knockbacked = 1;
										}
										if(_knockbacked) {
											PlaySound({key:'deadeffect2', volume:.2});
											_e.knockDead = 1;
										}
									}
								}
								if(_canStop && _e.animation.startsWith('hurt')) {
									if(_e.hitStop)
										_e.start -= _e.hitStop;
									if(_t.hitStop)
										_t.start -= _t.hitStop;
								}
							}
							if(_e.isDead())
								_e.relatedObjects = _e.relatedObjects.filter(x => x.key !== 'stun');
						}
						if (_f.objects)
							for (var _o of _f.objects)
								if (_o.hurt){
									_e.addObject(_o);
									// if(!_hasEffect)
									// 	_hasEffect = 1;
								}
						if(_charged){
							requestAnimationFrame(function() { _e.addObject({key:'sparkcharge', position: 'middle'});});
							if(_e.isDead())
								_e.chargeDead = 1;
							PlaySound({key:'chargehit1', reset: true, volume:.4});
							episode.skipTinyCameraMove = 10;
						}
						else if(!_hasEffect && _animateSkill?.startsWith('hurtground')) {
							setTimeout(() => {
								if(_t.criticalHit) {
									//buraya crit spark
									_e.addObject({ key:'sparkcrit', position: 'middle'});
									_e.addObject({ key: 'deadspark' + (_e.bloodColor ?? 'red'), position: 'middle' });
								}
								else {
									//_e.addObject({key:'hitwhite', position: 'middle'});
									//buraya normal spark
									if(_f.atk.rate < 1) {
										//ufak
										_e.addObject({key:'shine', position: 'middle'});
										_e.addObject({key:'sparkhitsmall', position: 'middle'});
									}
									else if(_f.atk.rate < 2) {
										//orta
										_e.addObject({key:'shine', scale:1.1, position: 'middle'});
										_e.addObject({key:'sparkhitmedium', position: 'middle'});
									}
									else {
										//büyük
										_e.addObject({key:'shine', scale:1.2, position: 'middle'});
										_e.addObject({key:'sparkhitbig', position: 'middle'});
									}
								}
							}, getRandomValue2(8,20));
						}
					}
				}
				if(!_e.isDead() && _erelease) {
					PlaySound({ key: 'release', volume: .3});
					_e.addObject({key:'hurtsteal2', position: 'middle'});
					if(_e.animations.release)
						_e.animate('release', 1);
					else
						_e.addBuff({ key: 'release', level: 3, ms: 3000 });
				}
				if(_e.bleed || _e.bleed == undefined) {
					if(_f.atk?.hurt?.slam)
						_e.hurtingStrength = 'slam';
					else
						_e.hurtingStrength = _f.atk.rate + (_charged ? 2 : 0);
				}
				// if (__account.options.gore && _f.atk?.type === 'common' && (_e.bleed || _e.bleed == undefined)) {
				// 	_e.addObject({
				// 		key: 'bloodfx' + (_e.bloodColor ?? '') + getRandomValue(1, 8),
				// 		reset: true,
				// 		pushObject: true,
				// 		position: 'middle'
				// 	});
				// 	if(__account.options.sound) {
				// 		const _bloodSound = getSound(null, 'blood');
				// 		if(_bloodSound && !(_bloodSound.lastUsed > (_gameTick - 100))) {
				// 			if (!_bloodSound.paused)
				// 				_bloodSound.pause();
				// 			if (_bloodSound.currentTime > 0)
				// 				_bloodSound.currentTime = 0;
				// 			if(_bloodSound.crossOrigin !== 'anonymous')
				// 				_bloodSound.crossOrigin = 'anonymous';
				// 			if(_bloodSound.volume !== .05)
				// 				_bloodSound.volume = .05;
				// 			_bloodSound.lastUsed = _gameTick;
				// 			_bloodSound.play();
				// 		}
				// 	}
				// 	_e.setBleedEffect(_f, _anima, _t);
				// }
			}
			if (_t.knockback || _f.knockback)
				_t.knockBackEnemies(_f, _e);
		}
		if(_t.attackedUnitTime === _gameTick)
			_t.attackedUnitCount++;
		else {
			_t.attackedUnitTime = _gameTick;
			_t.attackedUnitCount = 1;
		}
		if (_f.atk?.pushY && _e.class !== __spell && _e.animation.startsWith('huyrt'))
			_e.pushY = MathRound((episode.cHeight * _f.atk.pushY) / 100);
		return {criticalHit: _critHitTaken};
	}
	this.tryFall = function(_heavy) {
		if(!episode.cliffs || !this.animations.hurtair)
			return false;
		if(getRandomValue2(1, 10) > 1)
			return false;
		const _thisCenter = (this.HURTLEFT + this._HURTBOX_half + platformX);
		let _y = this.yPosition;
		const _maxY = getGroundHeight();
		const _minY = ((episode.ground?.bottomGap ?? 0) * __zoom);
		if(_minY > 0)
			_y -= _minY;
		const _yArea = (_maxY - _minY);
		const _halfY = _yArea / 2;
		if(_y <= _halfY)
			_y -= this.yGap;
		else
			_y += this.yGap;
		let _perc = (_y / _yArea) * 100;
		if(_perc < 0)
			_perc = 0;
		else if(_perc > 100)
			_perc = 100;
		for(let _cliff of episode.cliffs) {
			if(_thisCenter >= _cliff.minX && _thisCenter <= _cliff.maxX && 
				_perc >= _cliff.minYRate && _perc <= _cliff.maxYRate
			) {
				this.installFall(_cliff);
				if(_heavy && this.animations.deadfall) {
					this.animations.deadfall.frames.forEach(x => {
						if(x.extraStepXRate) {
							x.extraStepXRate *= 2;
						}
					});
				}
				return true;
			}
		}
		return false;
	}
	this.attack = function (_anima, _frame) {
		const trt = (this.related ?? this);
		trt.removeBuffByKey('invisibility');
		const _enemies = this.getAtackableUnits(_anima, _frame, this.important ? 1 : 0);
		episode.seenEnemies?.forEach(x => {
			if (x.pushingBy == this || x.attacker == trt)
				if (!_enemies?.find(y => y == x)) {
					if (x.pushingBy?.push && x.pushingBy?.class === __spell)
						return;
					if(!x.pushingBy?.pull)
						x.pushingBy = x.attacker = undefined;
				}
		});
		let _enemyHurted = false, _critHitTaken;
		if(this.attackedUnitCount > 0)
			this.attackedUnitCount = 0;
		if (_enemies?.[0]) {
			for (var _en of _enemies) {
				const _enemy = _en.enemy;
				if(_enemy.readyForFatality && !episode?.fatalityHappened){
					continue;
				}

				if(_enemy.isDead()){
					continue;
				}
				const _enemyFrame = _enemy.getCurrentFrame();
				if (((_enemy.attackingOnlyBy && _enemy.attackingOnlyBy !== this.key && this.class !== __spell) || _enemyFrame.def?.iframe || _enemy.iframe || _enemy.reviveTime) && _enemy.health > 0)
				{
					if(_enemyFrame.def?.iframe){
						_enemy.hasIframe = true;
						this.iFrameJitter = MathRound(episode.cWidth / getRandomValue2(100, 200));
					}
					continue;
				}
				_critHitTaken = false;
				const _enemyAnima = _enemy.getCurrentAnimation();
				let _enemyPriority = _enemyFrame.priority ?? _enemyAnima.priority;
				let _thisPriority = _frame.priority ?? _anima.priority;
				if(_thisPriority > 1 && this.chargeStarted && _anima.chargeStarted === this.chargeStarted)
					_thisPriority--;
				if(_enemyPriority > 1 && _enemy.chargeStarted && _enemyAnima.chargeStarted === _enemy.chargeStarted)
					_enemyPriority--;
				let hurtedByPriority;
				if (!_enemy.ironSkin && _enemyPriority !== undefined && !_enemy.newBlocked) {
					if (_enemyPriority === _thisPriority && _enemyFrame?.atk) {
						if (this.class !== __spell && _enemy.class !== __spell && _enemy.direction !== this.direction && !this.friendly && !_enemy.friendly && getRandomValue(1, 10) === 1) {
							const _eck = _enemy.animations.dash?.chargeKey;
							if(_eck)
								delete _enemy.animations.dash.chargeKey;
							_enemy.animate('dash');
							if(_eck)
								_enemy.animations.dash.chargeKey = _eck;
							const _ck = this.animations.dash?.chargeKey;
							if(_ck)
								delete this.animations.dash.chargeKey;
							this.animate('dash');
							if(_ck)
								this.animations.dash.chargeKey = _ck;
							this.addObject({
								key: 'glow',
								position: 'middle'
							});
							_enemy.addObject({
								key: 'glow',
								position: 'middle'
							});
							PlaySound({ key: this.class + 'block', owner: this }, 'block');
							return false;
						}
					}
					if (_thisPriority < (_enemyPriority ?? 10)) {
						if(_enemyPriority)
							(this.owner ?? trt).talk();
						_enemyHurted = this.hurtEnemy(_anima, _frame, _enemy, _enemyFrame, _enemyAnima);
						if (this.class === __spell && (!this.pierce) && this.animation !== 'dead')
							this.animate('dead', null, null, 6);
						hurtedByPriority = true;
					}
					else if (this.class === __spell && (!this.pierce) && this.animation !== 'dead')
						this.animate('dead', null, null, 7);
				}
				else if(_enemy.ironSkin && !(this.owner ?? trt).ironSkin) {
					_enemy.addObject({
						key: 'glow',
						position: 'middle'
					});
					PlaySound({ key: 'iron', owner: this, volume: .5 });
					return false;
				}
				else if (_enemy.animations['counter'] && _enemy.newBlocked > 0 && _enemy.newBlocked <= counterAttackTolerance) {
					_enemy.newBlocked = _enemy.blocked = false;
					_enemy.animate('counter');
					if(_enemy.alp) {
						const _pcctv = _enemy.getTalentValue('passive-counter-cooldown');
						if(_pcctv) {
							for(let _s_k in _enemy.animations) {
								const _sk = _enemy.animations[_s_k];
								if(_sk.coolDownLeft > 0) {
									_sk.coolDownLeft -= MathRound(_sk.cooldown * (_pcctv / 100));
									if(_sk.coolDownLeft < 0)
										_sk.coolDownLeft = 0;
								}
							}
						}
					}
				}
				if (!hurtedByPriority && _enemy.lastFatiqueDecreaseTime !== _gameTick && _enemy.animation.endsWith('block') && _thisPriority >= 1) {
					_enemy.animate('hurtblock');
					const _decreased = _enemy.decreaseFatique(this, _frame.atk?.rate);
					if (!_decreased) {
						_enemyHurted = this.hurtEnemy(_anima, _frame, _enemy, _enemyFrame, _enemyAnima);
						if (_enemy.animation.endsWith('block')){
							this.addObject({
								key: 'glow',
								position: 'middle'
							});
							_enemy.blocked = false;
						}
					}
				}
				else if ((!_enemy.dying || (_enemy.dying && this.key == _enemy.killingBy)) && (_thisPriority < (_enemyPriority ?? 10))) {
					_enemyHurted = this.hurtEnemy(_anima, _frame, _enemy, _enemyFrame, _enemyAnima);
					if (this.class === __spell && (!this.pierce) && this.animation !== 'dead')
						this.animate('dead', null, null, 8);
				}
				else if (this.class === __spell && (!this.pierce) && this.animation !== 'dead')
					this.animate('dead', null, null, 9);
				else {
					_enemyHurted = this.hurtEnemy(_anima, _frame, _enemy, _enemyFrame, _enemyAnima, _thisPriority ?? 10, _enemyPriority ?? 10);
				}
				if (_enemy.direction === this.direction && !this.friendlyFire && !this.pushingBy && (_enemy.autoMode || (_enemyHurted || _enemy.hurting || _enemy.blocked))) {
					if (_enemy.class !== __spell && !_enemy.dying && !_enemy.dead && !_enemy.release) {
						if(_enemy.enemy && !episode.pvp) {
							const _enemyOrigin = _enemy.HURTLEFT + _enemy._HURTBOX_half;
							const _thisOrigin = this.HURTLEFT + this._HURTBOX_half;
							if (_enemyOrigin > _thisOrigin)
								_enemy.direction = __left;
							else
								_enemy.direction = __right;
						}
						if(!this.invulnerable)
							_enemy.setAutoTarget(this, null, 9);
					}
				}
				if (_enemyHurted && !_enemy.isDead())
					(this.owner ?? trt).increaseRage(_frame.atk.rate, _enemyHurted.criticalHit);
				if(_enemyHurted && !_enemyHurted.smashed && _frame.atk?.hurt?.next)
					_frame.nextAndRemove = _frame.atk.hurt.next;
			}
		}
		return _enemyHurted;
	}
	// Enemy veya Character sınıfı içine
	this.randomShake = function (_e, _a, _f, _dmg, _crit) {
		return;
		if (!this.main || !_e.getCurrentAnimation().hurt) return; // sadece main karakter için
		if ((_gameTick - (this.lastShakeTime || 0)) < 500) return;
		this.lastShakeTime = _gameTick;

		// === HitStop kontrolü ===
		const hitStop = _f.atk?.hitStop ?? _a.hitStop ?? 0;
		if (hitStop > 2) return; // uzun hitstop varsa titreme iptal

		// === Amplitude hesaplama ===
		let baseAmp = 4;

		// Crit bonus
		if (_crit) baseAmp += 1.2;

		// Skill gücü bonus (rate yüksekse daha fazla titreme)
		if (_f.atk?.rate >= 2) baseAmp += (_f.atk.rate - 1) * 1.5;

		// Damage şiddetine göre küçük katkı (isteğe bağlı)
		const dmgFactor = Math.min(_dmg / 100, 2); // aşırı büyük sayılarda sınırla
		baseAmp += dmgFactor;

		// Hitstop varsa hafif azalt
		if (hitStop > 0) baseAmp *= (1 - Math.min(hitStop / 5, 0.8));

		// === Ekran boyutuna göre normalize ===
		const scale = Math.max(1, (window.innerWidth / 1920) * 1.5);
		let amp = baseAmp * scale;

		// === Rastgele yön belirleme ===
		const horiz = Math.random() > 0.5;
		const ampX = horiz ? (Math.random() > 0.5 ? amp : -amp) : 0;
		const ampY = !horiz ? (Math.random() > 0.5 ? amp : -amp) : 0;

		// === Shake parametreleri ===
		const duration = 120 + Math.random() * 60; // 120–180 ms
		const decay = 0.6 + Math.random() * 0.2;  // sönümlenme
		const steps = 5;

		// === Keyframes oluştur ===
		let keyframes = '';
		for (let i = 0; i <= steps; i++) {
			const t = i / steps;
			const strength = amp * Math.pow(decay, i);
			const x = (ampX ? Math.sin(t * Math.PI * 2) * strength : 0).toFixed(2);
			const y = (ampY ? Math.cos(t * Math.PI * 2) * strength : 0).toFixed(2);
			keyframes += `${(t * 100).toFixed(1)}% { transform: translate(${x}px, ${y}px); }\n`;
		}

		// === CSS animasyonu enjekte et ===
		const styleId = 'shake-style';
		let styleEl = document.getElementById(styleId);
		if (!styleEl) {
			styleEl = document.createElement('style');
			styleEl.id = styleId;
			document.head.appendChild(styleEl);
		}

		const animName = `shake_${Date.now()}_${Math.floor(Math.random()*9999)}`;
		styleEl.textContent = `@keyframes ${animName} {\n${keyframes}\n}`;

		// === Animasyonu uygula ===
		const wrapper = _gamePad || document.body;
		wrapper.style.animation = `${animName} ${duration}ms linear 1`;

		// === Temizleme ===
		setTimeout(() => {
			wrapper.style.animation = '';
			styleEl.textContent = ''; // önceki keyframes temizlenir
		}, duration + 30);
	};



	this.setBleedEffect = function(_f, _anima, _t) {
		for (var i = 0; i < 1; i++) {
			const ygap = (getRandomValue(0, 5) * 10) - 30 +
				((_f.bleed ?? _anima.bleed) === 'up' ? -30 : 0) +
				((_f.bleed ?? _anima.bleed) === 'down' ? 30 : 0);
			const _w = MathRound(this.WIDTH / 3);
			var _bloodDistance = getRandomValue(_w, _w + 150);
			const xgap = (_bloodDistance * ((_f.bleed ?? _anima.bleed) === 'back' ? -1 : 1)) * ((_t.direction === this.defaultDirection) ? -1 : 1)
			if ((this.yPosition + (-1 * ygap) + (2 * this.yGap)) > getGroundHeight())
				continue;
			var _bloodIndex = getRandomValue(1, 11);
			let object = this.addObject({
				key: 'blooddrop' + (this.bloodColor ?? '') + _bloodIndex,
				position: 'middle-feet',
				yGap: ygap,
				xGap: xgap
			});
			if (this.defaultDirection === this.direction)
				this.relatedObjects[this.relatedObjects.length - 1].xGap += this.WIDTH;
			if (object) {
				object.zoom *= getRandomValue(2, 40) / 72;
				object.speed = getRandomValue(2, 4) * 500;
			}
		}
	}
	this.getElementalEffect = function(_enemy) {
		if(!(this.lastEEAppliedTime > (_gameTick - 1000))) {
			this.lastEEApply = getRandomValue(1, 5) < 2;
			this.lastEEAppliedTime = _gameTick;
			if(this.lastEEApply)
				this._elementals = [
					{ key: 'fire', value: this.fireDmg ?? 0 },
					{ key: 'ice', value: this.iceDmg ?? 0 },
					{ key: 'lightning', value: this.lightningDmg ?? 0 },
					{ key: 'toxic', value: this.toxicDmg ?? 0 },
					{ key: 'shadow', value: this.shadowDmg ?? 0 },
				];
		}
		if(this.lastEEApply) {
			const _max = this._elementals.sort((a, b) => b.value - a.value)[0];
			if(_max.value > 0)
			{
				switch(_max.key) {
					case 'fire':
						_enemy.addBuff({ key: 'fire', level: 1 });
						break;
					case 'toxic':
						_enemy.addBuff({ key: 'poison', level: 1 });
						break;
					case 'shadow':
						_enemy.addBuff({ key: 'weakness', level: 1 });
						break;
					case 'ice':
						_enemy.addBuff({ key: 'ice', level: 1 });
						break;
					case 'lightning':
						PlaySound({key: 'electric', reset: true });
						_enemy.addObject(
							{ key: 'dzzt', position: 'middle' }
						);
						break;
				}
			}
			return _max.key;
		}
		else
			return null;
	}
	this.checkSteal = function(_dmg, _enemy) {
		if(!_enemy.bleed || !this.stealRate)
			return;
		let _alreadyStolen;
		const _r = getRandomValue2(1, 100);
		if(_r <= (this.stealChanceRate ? this.stealChanceRate : 10)) {
			this.increaseHealth(_dmg * (this.stealRate / 100));
			addDmgFrame({
				text: 'plus-hp',
				x: this.LEFT,
				from:this,
				y:episode.cHeight - this.yPosition - this.HEIGHT
			});
			_alreadyStolen = 1;
		}
		if(this.alp && !_alreadyStolen) {
			const _pstv = this.getTalentValue('passive-steal');
			if(_pstv && _r === 1) {
				const _hpVal = MathRound(this.MAXHP * (_pstv / 100));
				this.increaseHealth(_hpVal);
				addDmgFrame({
					text: 'plus-hp',
					x: this.LEFT,
					from:this,
					y: episode.cHeight - this.yPosition - this.HEIGHT
				});
			}
		}
	}
	this.calculateElementalDmg = function(_dmg, _enemy) {
		if(this.fireDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('fire') === -1)))
			_dmg += (this.fireDmg - (this.fireDmg * ((_enemy.fireResistRate ?? 0) / 100)));
		if(this.iceDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('ice') === -1)))
			_dmg += (this.iceDmg - (this.iceDmg * ((_enemy.iceResistRate ?? 0) / 100)));
		if(this.toxicDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('toxic') === -1)))
			_dmg += (this.toxicDmg - (this.toxicDmg * ((_enemy.toxicResistRate ?? 0) / 100)));
		if(this.shadowDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('shadow') === -1)))
			_dmg += (this.shadowDmg - (this.shadowDmg * ((_enemy.shadowResistRate ?? 0) / 100)));
		if(this.lightningDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('lightning') === -1)))
			_dmg += (this.lightningDmg - (this.lightningDmg * ((_enemy.lightningResistRate ?? 0) / 100)));
		return _dmg;
	}
	this.calculateDmgReduce = function(_dmg, _e, _ignoreDef) {
		const _char = this.coopWith ?? this;
		const _enemy = _e.coopWith ?? _e;
		let _enemyDef = _ignoreDef ? 0 : _enemy.getDefRate();
		if(_char.pierceRate > 0 && _enemyDef > 0)
			_enemyDef -= (_enemyDef * (_char.pierceRate / 100));
		_dmg -= ((_enemyDef / (_dmg + _enemyDef)) * _dmg);
		return _dmg;
	}
	this.checkHug = function () {
		return;
		if (this.keyboard?.getMove())
			return;
		const _enemies = this.getAtackableUnits();
		const _x = this.LEFT + this.WIDTH;
		const _tol = (this.width * this.ZOOM) / 3;
		for (var _en of _enemies) {
			const _dist = _en.dist;
			if (_dist == undefined)
				continue;
			if (_dist < (this.WIDTH / 2)) {
				const _e = _en.enemy;
				if (_e.iframe || _e.release || _e.health <= 0 || _e.hurting)
					continue;
				if (_e.weight > this.weight)
					continue;
				if (_e.attackingOnlyBy)
					continue;
				if (this.animation === 'attack' && this.animations.hug && !(this.animations.hug.coolDownLeft > 0)) {
					const _enemyFrame = _e.getCurrentFrame();
					let _enemyAnimation = _e.getCurrentAnimation();
					if (_enemyAnimation.interactive || _enemyAnimation.type === 'hurt')
						continue;
					if ((_enemyAnimation.priority ?? 10) >= this.animations.hug.priority) {
						if (!_enemyFrame.def?.iframe) {
							const _y = _e.LEFT + _e.WIDTH;
							if (this.direction === __left && _x > _y) {
								if ((_x - _y) > _tol)
									continue;
							}
							else if (this.direction === __right && _y > _x)
								if ((this.LEFT - _e.LEFT) > _tol)
									continue;
							if (_e.direction === this.direction)
								_e.direction = this.direction === __left ? __right : __left;
							_e.animate('hurthug', 1);
							_e.yPosition = this.yPosition - 1;
							_e.attackingOnlyBy = this.key;
							episode.enemies?.filter(x => x.attacker == this || x.pushingBy == this)?.
								forEach(x => x.attacker = x.pushingBy = undefined);
							const _skill = this.modifySkill('hug');
							this.animate(_skill, 1);
							_e.left = this.SCREENLEFT + (_e.main ? 0 : platformX) +
								MathRound((this.WIDTH - _e.WIDTH) / 2) -
								((this.direction === __right ? -1 : 1) * MathRound(.25 * _e.WIDTH));
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	this.setProps = function (_props) {
		for (var _key of Object.keys(_props)) {
			if (_key === 'do')
				_props[_key]();
			else
				this[_key] = _props[_key];
		}
	}
	this.increaseRage = function (_point, _crit, _hurt) {
		if (!this.animations.air2 || !this.animations.air2.ultimate)
			return;
		if (this.skills['air2']?.locked || this.animations[this.animation].ultimate)
			return;
		if (this.rage)
			return;
		if(!_hurt && (_gameTick - this.lastRageGainTime) < 333)
			return;
		if ((this.rageCount ?? 0) < 0)
			this.rageCount = 0;
		const _mr = this.getMaxRageCount();
		if (this.rageCount < _mr){
			if(this.alp) {
				if(_crit) {
					const _pcrrtv = this.getTalentValue('passive-crit-rate-rage');
					if(_pcrrtv) {
						const _extra = MathCeil(_mr * (_pcrrtv / 100));
						this.rageCount += (_extra ?? 1);
					}
				}
				if(this.animation === 'counter'){
					const _pcrtv = this.getTalentValue('passive-counter-rage');
					if(_pcrtv) {
						const _extra = MathCeil(_mr * (_pcrtv / 100));
						this.rageCount += (_extra ?? 1);
					}
					const _pcstv = this.getTalentValue('passive-counter-steal');
					if(_pcstv && getRandomValue2(1,2) === 1) {
						const _hpVal = MathRound(this.MAXHP * (_pcstv / 100));
						this.increaseHealth(_hpVal);
						addDmgFrame({
							text: 'plus-hp',
							x: this.LEFT,
							from:this,
							y: episode.cHeight - this.yPosition - this.HEIGHT
						});
					}
				}
			}
			this.rageCount += (_point ?? 1);
		}
		else
			return;
		//this.attackedUnitTime = _gameTick - 10;
		if (!rageSkill)
			rageSkill = document.getElementById('skill6');
		if (this.rageCount > _mr)
			this.rageCount = _mr;
		this.updateRageSkillUI();
		this.lastRageGainTime = _gameTick;
	}
	this.decreaseRage = function () {
		if (this.rageCount <= 0)
			return;
		if (this.rage)
			return;
		// if(this.main && this.rageCount === this.getMaxRageCount())
		// 	removeClass(rageSkill, 'rage-shimmer');
		this.rageCount--;
		this.attackedUnitTime = _gameTick - 10;
		this.updateRageSkillUI();
	}
	this.stopRage = function() {
		if(this.rage) {
			this.rageCount = 0;
			this.updateRageSkillUI();
		}
	}
	this.useRage = function (_anima) {
		if (!this.rage)
			return;
		if (_anima?.ultimate)
			return;
		const _mr = this.getMaxRageCount();
		if ((_gameTick - this.rage) > 999) {
			if(this.rageCount === _mr)
				this.rageCount -= (this.rageDecreasement ?? (_mr / 10));
			this.rageCount -= (this.rageDecreasement ?? (_mr / 10));
			this.rage = _gameTick;
			this.updateRageSkillUI();
		}
	}
	this.updateRageSkillUI = function (_doNotResetSkills) {
		if (!rageSkill)
			rageSkill = document.getElementById('skill6');
		if (this.rageCount < 0)
			this.rageCount = 0;
		if (this.main) {
			const _perc = MathRound(this.rageCount * (100 / this.getMaxRageCount()));
			if(_perc >= 100){
				PlaySound({key:'ultiactive', volume:.5});
				addClass(rageSkill, 'skill-pulse');
				rageSkill.onanimationend = function(e) {
					if(e.animationName === 'skillPulse')
						removeClass(rageSkill, 'skill-pulse');
				}
			}
			rageSkill.style.background = (__isPC ? '' : 'radial-gradient(transparent, transparent, #00000080, transparent, transparent), ') + 'url(./images/main/skill-icons/air2.png), linear-gradient(0deg, ' + (_perc < 100 ? '#A42A04':'#FF2020') + ' ' + _perc + '%, black 0%)';
		}
		if (this.rageCount === 0) {
			const _endOfRage = this.ultimate;
			this.rage = this.ultimate = this.shadowData = undefined;
			if(this.alp || episode.pvp)
				resetSkills(null, _doNotResetSkills, this, null, _endOfRage);
			if (this.main) {
				removeUltimateCircle();
				//removeClass(rageSkill, 'rage-shimmer');
			}
			else if(this.hasRageBar)
				removeClass(document.getElementById('ragebar-hb-' + this.key), 'raging');
			return true;
		}
		// else if (this.rageCount === this.getMaxRageCount()) {
		// 	if(this.main)
		// 		addClass(rageSkill, 'rage-shimmer');
		// }
		return false;
	}
	this.useCommonSkill = function (_order) {
		if(this.isDead() || this.deadTime || (episode.pvp && !this.commonItem))
			return;
		if((_gameTick - this.lastCommonSkillUsed) < 2000)
			return;
		const _item = this.commonItem ?? __account.commonInventory[_order - 1];
		let _renew;
		const _cs = commonSkills.find(x => x.key === _item.key);
		if(_cs?.do) {
			if(_cs.do(this))
				_renew = 1;
			else
				return;
		}
		else if (spells[_item.key]) {
			if (this.throwSpell({ spell: _item }))
				_renew = 1;
		}
		if(_renew) {
			if(this.commonItem) {
				this.commonItem = undefined;
				if(this.main) {
					let _div = document.querySelector('.game-status-screen');
					if(_div) 
						_div.remove();
				}
			}
			else if(this.main) {
				__account.commonInventory.splice(_order - 1, 1);
				this.checkCommonInventory();
				this.lastCommonSkillUsed = _gameTick;
				_client.saveState();
			}
		}
	}
	this.setAutoTarget = function (_e, _skipShare, _num) {

		// START SOUND
		if (!this.autoTarget && _e && this.startSound) {

			if (!this.startSound.async) {
				this.upcomingAnimation = undefined;
				this.noAttack = true;

				const self = this;
				this.startSound.end = function () {
					self.noAttack = false;
				};
			}

			PlaySound(this.startSound);
		}

		const shareWithGroup = !_skipShare && this.groupId && !this.autoTarget;

		let trg = _e ? (_e.related || _e) : null;

		// ONLY TARGET
		if (this.onlyTarget) {

			const enemies = episode.enemies;
			for (let i = 0; i < enemies.length; i++) {
				if (enemies[i].key === this.onlyTarget) {
					this.autoTarget = enemies[i];
					this.autoTarget.targetedBy = this.key;
					trg = null;
					break;
				}
			}
		}

		// NORMAL TARGET
		if (trg && !trg.invulnerable) {
			this.autoTarget = trg;
			trg.targetedBy = this.key;
		}

		// GROUP SHARE (filter + forEach yerine tek loop)
		if (shareWithGroup) {

			const enemies = episode.enemies;

			for (let i = 0; i < enemies.length; i++) {
				const e = enemies[i];
				if (e.groupId === this.groupId) {
					e.setAutoTarget(_e, 1);
				}
			}
		}
	};

	// this.setAutoTarget = function (_e, _skipShare, _num) {
	// 	if (!this.autoTarget && _e && this.startSound) {
	// 		if(!this.startSound.async) {
	// 			this.upcomingAnimation = undefined;
	// 			this.noAttack = true;
	// 			const _s = this;
	// 			this.startSound.end = function () {
	// 				_s.noAttack = false;
	// 			}
	// 		}
	// 		PlaySound(this.startSound);
	// 	}
	// 	// if (this.hasStation && ((_e.related ?? _e) !== this.autoTarget)) {
	// 	// 	const _diff = { at: (_e.related ?? _e).socketId, sy: 1 };
	// 	// 	this.setDefaultMessage(_diff);
	// 	// 	sendMessage(JSON.stringify(_diff));
	// 	// }
	// 	const _shareWithGroup = !_skipShare && this.groupId && !this.autoTarget;
	// 	let _trgt = 1;
	// 	if(this.onlyTarget)
	// 	{
	// 		this.autoTarget = episode.enemies.find(x=> x.key === this.onlyTarget);
	// 		if(this.autoTarget) {
	// 			this.autoTarget.targetedBy = this.key;
	// 			_trgt = undefined;
	// 		}
	// 	}
	// 	if(_trgt && !(_e.related ?? _e)?.invulnerable){
	// 		this.autoTarget = _e.related ?? _e;
	// 		if(this.autoTarget)
	// 			this.autoTarget.targetedBy = this.key;
	// 	}
	// 	if(_shareWithGroup)
	// 		episode.enemies.filter(x => x.groupId === this.groupId).forEach(x => {
	// 			x.setAutoTarget(_e, 1);
	// 		});
	// }
	this.throwSpell = function (_frame, _parent, _target) {
		const _sp = _frame.spell ?? _frame.atk?.spell;
		// if(Array.isArray(_sp)) {
		// 	_sp.forEach(x => this.throwSpell({spell:x}, _parentKey));
		// 	return;
		// }
		if (_sp) {
			if(!_sp.reset && this.lastSpellThrown?.time > (_gameTick - 300) && this.lastSpellThrown.key === _sp.key && this.lastSpellThrown.count >= 2)
				return false;
			let _spKey = _sp.key;
			if(_spKey.indexOf(',') !== -1) {
				const _keys = _spKey.split(',');
				_spKey = _keys[getRandomValue2(0,_keys.length - 1)];
			}
			const spl = spells[_spKey];
			if (_parent && spl.bounce) {
				//const _parentKey = _parent.parent ?? _parent.key;
				//if (this.lastSpellTakenKey !== _parentKey) {
					//_parent = episode.enemies.find(x => x.key === _parentKey);
					//if(!_parent)
					//	return false;
					//else {
						if(!_parent.freqCount){
							_parent.freqCount = 1;
							_parent.lastFreq = _gameTick;
						}
						else {
							if(_gameTick !== _parent.lastFreq) {
								_parent.freqCount++;
								_parent.lastFreq = _gameTick;
							}
						}
						if(_parent.freqCount > __maxFreqCount)
							return false;
					//}
					//this.lastSpellTakenKey = _parentKey;
				//}
				//else
					//return false;
			}
			const _spell = structuredClone2(spl);
			const _dmgTypes = _spell.animations.idle.frames.
			filter(x => x.atk?.type && x.atk.type !== 'common')?.map(x => x.atk.type);

			let _enemy;
			if (_spell.autoAim) {
				_enemy = _target ? { enemy: _target } : this.getClosestEnemy(_spell.autoAim, this.direction);
				if (!_enemy?.enemy)
					_spell.autoAim = false;
				else
					_enemy = _enemy.enemy;
			}
			_spell.direction = _spell.moveDirection = !_sp.reversed ? this.direction : (this.direction === __right ? __left : __right);
			_spell.critRate = this.critRate;
			_spell.critDmgRate = this.critDmgRate;
			_spell.key = 'SPL-' + Math.random().toString().replace(/[.]/g, '');
			_spell.atk = this.atk * (_sp.atkRate ?? 1) * this.getSkillRate();
			if(spl.bounce)
				_spell.atk = MathCeil(_spell.atk / 10);
			_spell.health = _spell.maxHP = 1;
			_spell.enemy = this.enemy;
			_spell.friendly = this.friendly;
			_spell.main = false;
			_spell.related = this.related ?? this;
			_spell.onlyTarget = _spell.related.onlyTarget;
			if (_sp.bottomGap != undefined)
				_spell.top = episode.cHeight - (_enemy ?? this).yPosition - ((_enemy ?? this).ZOOM * ((_enemy ?? this).yGap - _sp.bottomGap - (_spell.height ?? 0)));
			else
				_spell.top = episode.cHeight - (_enemy ?? this).yPosition - ((_enemy ?? this).ZOOM * ((_enemy ?? this).yGap)) - (_enemy ?? this).HEIGHT;
			
			if(!_spell.animations[_spell.defaultAnimationKey])
				_spell.defaultAnimationKey = 'idle';
			const _en = new enemy(_spell);
			const _animKeys = _en._animationKeys;
			for(let _key of _animKeys)
				if(spl.animations[_key].frames.find(x => x.do))
					for(let _i = 0; _i < spl.animations[_key].frames.length; _i++)
						_spell.animations[_key].frames[_i].do = spl.animations[_key].frames[_i].do;
			_en.spellKey = _spKey;
			if(_sp.harmless)
				_en.harmless = true;
			if (_spell.push)
				_en.push = _spell.push;
			if (_sp.zoomRate)
				_en.zoom *= _sp.zoomRate;
			if(_sp.group)
				_en.spellGroup = _sp.group;
			if (_parent)
				_en.parent = _parent;
			if (_spell.noRelation)
				_en.related = undefined;
			if(_sp.drawPriority)
				_en.drawPriority = _sp.drawPriority;
			_en.pierce = _sp.pierce ?? _spell.pierce;
			if(_dmgTypes?.[0])
			for(let _dt of _dmgTypes)
				_en[_dt + 'Dmg'] = 1;
			_en.fireDmg = (_en.fireDmg ?? 0) + this.fireDmg;
			_en.lightningDmg = (_en.lightningDmg ?? 0) + this.lightningDmg;
			_en.toxicDmg = (_en.toxicDmg ?? 0) + this.toxicDmg;
			_en.iceDmg = (_en.iceDmg ?? 0) + this.iceDmg;
			_en.moveDirection = !_sp.reversed ? this.direction : (this.direction === __right ? __left : __right);
			_en.yPosition = (_enemy ?? this).yPosition + ((_enemy ?? this).ZOOM * ((_enemy ?? this).yGap + (_sp.bottomGap ?? 0)));
			if(_spell.autoAim && _enemy)
				_en.yPosition = _enemy.yPosition;
			if (_en.animations.idle && (!_en.animations.idle.priority || _sp.priority))
				_en.animations.idle.priority = _sp.priority ?? this.getCurrentAnimation().priority ?? 4;
			if(_sp.smash && _en.animations.idle)
				_en.animations.idle.frames.filter(x => x.atk?.hurt)?.forEach(x => x.atk.hurt.smash = true);
			if (!_spell.autoAim)
				_en.left = ((this.direction === this.defaultDirection ? (this.defaultDirection === __right ? 1 : 0) : 0) * this.WIDTH) + this.LEFT + platformX;
			else
				_en.left = _enemy.main ? _enemy.left + platformX : _enemy.left;
			if (_sp.xGap) {
				if (_en.moveDirection !== this.defaultDirection)
					_en.left -= (_sp.xGap * (_enemy ?? this).ZOOM);
				else
					_en.left += (_sp.xGap * (_enemy ?? this).ZOOM);
			}
			if (_sp.scale)
				_en.zoom *= _sp.scale;
			_en.speedRate = this.getSpeedRate();
			_en.started = _en.invulnerable = _en.located = true;
			_en.solid = false;
			if(_spell.bounce)
				_en.bounce = true;
			episode.enemies.push(_en);
			_en.updateVariables();
			if(this.lastSpellThrown?.time > (_gameTick - 300) && this.lastSpellThrown.key === _spKey)
				this.lastSpellThrown.count++;
			else
				this.lastSpellThrown = { time: _gameTick, count: 1, key:_spKey };
			return true;
		}
		return false;
	}
	this.getObjectXGap = function(_clone, _o) {
		let XGAP = _o.xGap;
		if(_o.xGapMin && _o.xGapMax)
			XGAP = getRandomValue2(_o.xGapMin, _o.xGapMax);
		return MathRound((((_clone.width * _clone.zoom) - this.WIDTH) / 2) + (
				(XGAP ?? 0) * __zoom * (_o.zoom ?? 1)));
	}
	// this.tryUseRelatedObject = function (_o, _z) {
	// 	//this.relatedObjects = this.relatedObjects?.filter(x => !x.remove) ?? [];
	// 	const _obj = relatedObjects?.find(x => x.id === _o.key);
	// 	if (_obj) {
	// 		if(_o.remove) {
	// 			this.relatedObjects = this.relatedObjects.filter(x => x.key !== _o.key);
	// 			return undefined;
	// 		}
	// 		const _clone = structuredClone2(_obj);
	// 		let _anima = this.getCurrentAnimation();
	// 		if(_anima.hurt)
	// 			_clone.limit = 5;
	// 		_clone.sprite = relatedObjectImages[_o.key]();
	// 		if(_o.yGapMin && _o.yGapMax)
	// 			_o.yGap = getRandomValue2(_o.yGapMin, _o.yGapMax);
	// 		if (!_clone.zoom)
	// 			_clone.zoom = 1;
	// 		_clone.zoom *= __zoom;
	// 		if (_o.scale)
	// 			_clone.zoom *= _o.scale;
	// 		if (_o.yGap)
	// 			_clone.yGap = _o.yGap * _clone.zoom * __scale;
	// 		const _xg = this.getObjectXGap(_clone, _o);
	// 		if(_clone.xGap)
	// 			_clone.xGap += _xg;
	// 		else
	// 			_clone.xGap = _xg;
	// 		if (_clone.multiUse || _o.multiUse){
	// 			_clone.id = _clone.id + Math.random().toString();
	// 			if(!_clone.multiUse)
	// 				_clone.multiUse;
	// 		}
	// 		if (this.relatedObjects.find(x => x.top === _clone.top && x.id === _clone.id && !x.remove))
	// 			return _clone;
	// 		let _arr = this.relatedObjects.filter(x => !x.remove && x.key === _o.key && !x.multiUse);
	// 		const _length = _arr?.length ?? 0;
	// 		if (!_length || _o.multiUse) {
	// 			this.relatedObjects.push(_clone);
	// 			// if(this.relatedObjects.length > 4) {
	// 			// 	const _rels = (this.relatedObjects.filter(x => !x.remove));
	// 			// 	if(_rels.length > 4)
	// 			// 		this.relatedObjects = this.relatedObjects.sort((a,b) => (b.pushDate - a.pushDate)).slice(0, 4).reverse();
	// 			// }

	// 			_clone.pushDate = _gameTick;
	// 		}
	// 		else if(_length && (_o.xGapMin || _o.yGapMin)) {
	// 			this.relatedObjects = this.relatedObjects.filter(x => x !== _arr[0]);
	// 			this.relatedObjects.push(_clone);
	// 			_clone.pushDate = _gameTick;
	// 		}
	// 		else {
	// 			const _current = _arr[0];
	// 			_current.top = _clone.top;
	// 			_current.xGap = _clone.xGap;
	// 			_current.alpha = _clone.alpha;
	// 			_current.pushDate = _gameTick;
	// 			if (!_current.singleton || _current.reset)
	// 				_current.start = _current.frame = 0;
	// 			else if (_o.reset)
	// 				_current.zoom = _clone.zoom;
	// 			return _current;
	// 		}
	// 		if (_clone.limit) {
	// 			let _coIndex = -1, count = 0, _removeClone;
	// 			const _removeId = this.id + _clone.key + _gameTick;
	// 			for(let i = 0; i < episode.limitedEffects.length; i++) {
	// 				const _ef = episode.limitedEffects[i];
	// 				if(_ef.removeId === _removeId)
	// 					return _clone;
	// 				if(_ef.key === _clone.key) {
	// 					if(_coIndex === -1)
	// 						_coIndex = i;
	// 					count++;
	// 					if(count === _clone.limit) {
	// 						_removeClone = 1;
	// 						break;
	// 					}
	// 				}
	// 			}
	// 			if(_removeClone && _coIndex !== -1){
	// 				episode.limitedEffects[_coIndex].remove = true;
	// 				episode.limitedEffects.splice(_coIndex, 1);
	// 			}

	// 			_clone.removeId = _removeId;
	// 			episode.limitedEffects.push(_clone);

	// 			// let _clones = [];
	// 			// for (var _en of episode.enemies)
	// 			// 	if (_en.relatedObjects)
	// 			// 		for (var _ro of _en.relatedObjects) {
	// 			// 			if (_ro.key === _clone.key && !_ro.remove)
	// 			// 				_clones.push(_ro);
	// 			// 		}
	// 			// if (_clones.length > _clone.limit) {
	// 			// 	_clones = _clones.sort((a, b) => a.pushDate - b.pushDate);
	// 			// 	for (var i = 0; i < _clones.length - _clone.limit; i++)
	// 			// 		_clones[i].remove = true;
	// 			// }
	// 		}
	// 		return _clone;
	// 	}
	// 	return null;
	// }
	this.tryUseRelatedObject = function (_o, _z) {

	const rel = this.relatedObjects;
	const list = relatedObjects;
	if (!list || !list.length) return null;

	// FIND yerine for
	let baseObj = null;
	for (let i = 0; i < list.length; i++) {
		if (list[i].id === _o.key) {
			baseObj = list[i];
			break;
		}
	}
	if (!baseObj) return null;

	if (_o.remove) {
		for (let i = rel.length - 1; i >= 0; i--) {
			if (rel[i].key === _o.key)
				rel.splice(i, 1);
		}
		return;
	}

	// Structured clone yerine hızlı shallow copy
	const _clone = Object.assign({}, baseObj);

	let _anima = this.getCurrentAnimation();
	if (_anima?.hurt) _clone.limit = 5;

	_clone.sprite = relatedObjectImages[_o.key]();

	if (_o.yGapMin && _o.yGapMax)
		_o.yGap = getRandomValue2(_o.yGapMin, _o.yGapMax);

	_clone.zoom = (_clone.zoom || 1) * __zoom;

	if (_o.scale)
		_clone.zoom *= _o.scale;

	if (_o.yGap)
		_clone.yGap = _o.yGap * _clone.zoom * __scale;

	const _xg = this.getObjectXGap(_clone, _o);
	_clone.xGap = (_clone.xGap || 0) + _xg;

	if (_clone.multiUse || _o.multiUse) {
		_clone.id = _clone.id + _gameTick; // random yerine deterministic
	}

	// duplicate kontrol
	for (let i = 0; i < rel.length; i++) {
		const r = rel[i];
		if (r.top === _clone.top && r.id === _clone.id && !r.remove)
			return _clone;
	}

	// same key count
	let firstIndex = -1;
	let count = 0;

	for (let i = 0; i < rel.length; i++) {
		const r = rel[i];
		if (!r.remove && r.key === _o.key && !r.multiUse) {
			if (firstIndex === -1) firstIndex = i;
			count++;
		}
	}

	if (!count || _o.multiUse) {
		_clone.pushDate = _gameTick;
		rel.push(_clone);
	}
	else if (_o.xGapMin || _o.yGapMin) {
		rel.splice(firstIndex, 1);
		_clone.pushDate = _gameTick;
		rel.push(_clone);
	}
	else {
		const cur = rel[firstIndex];
		cur.top = _clone.top;
		cur.xGap = _clone.xGap;
		cur.alpha = _clone.alpha;
		cur.pushDate = _gameTick;

		if (!cur.singleton || cur.reset)
			cur.start = cur.frame = 0;
		else if (_o.reset)
			cur.zoom = _clone.zoom;

		return cur;
	}

	// LIMIT EFFECT
	if (_clone.limit) {

		const lim = episode.limitedEffects;
		let count = 0;
		let removeIndex = -1;

		const removeId = this.id + _clone.key;

		for (let i = 0; i < lim.length; i++) {
			const e = lim[i];

			if (e.removeId === removeId)
				return _clone;

			if (e.key === _clone.key) {
				if (removeIndex === -1)
					removeIndex = i;
				count++;
			}
		}

		if (count >= _clone.limit && removeIndex !== -1) {
			lim.splice(removeIndex, 1);
		}

		_clone.removeId = removeId;
		lim.push(_clone);
	}

	return _clone;
};

	this.isRelative = function () {
		if (this.main)
			return true;
		else if (this.related)
			return this.related.isRelative;
		return false;
	}
	this.calculateYStep = function () {
		if(this.lastYStepTime > (_gameTick - 500))
			return this.lastYStep;
		this.lastYStepTime = _gameTick;
		this.lastYStep = MathRound((episode.cHeight / (this.alp ? 120 : getRandomValue(80, 120))) * (this.zoomYRate ?? 1));
		return this.lastYStep;
	}
	this.calculateYStepAndMove = function (_solidity, _touch) {
		if(this.stop || (_solidity && _solidity.moveY === 0)){
			return;
		}
		if(_touch && this.yPosition === this.autoTarget?.yPosition){
			return;
		}
		if(!this.verticalStep || _touch)
			this.verticalStep = this.calculateYStep();
		if(!_touch && this.autoStepYRate < 1)
			this.verticalStep *= this.autoStepYRate;
		const _moveY = this.solidOne ?? _solidity?.moveY;
		if ((this.moveDirection === 'up' || (_solidity && _moveY === -1)) && _moveY !== 1){
			this.yPosition += this.verticalStep;
			// if(!this.main && this.autoTarget && this.yPosition > this.autoTarget.yPosition){
			// 	this.yPosition = this.autoTarget.yPosition;
			// 	console.log('Eşit 1');
			// }
		}
		else if ((this.moveDirection === 'down' || (_solidity && _moveY === 1)) && _moveY !== -1){
			this.yPosition -= this.verticalStep;
			// if(!this.main && this.autoTarget && this.yPosition < this.autoTarget.yPosition){
			// 	this.yPosition = this.autoTarget.yPosition;
			// 	console.log('Eşit 2');
			// }
		}
	}
	this.setDifficulty = function(_dif) {
		if(_dif >= 0)
			this.difficulty = _dif;
	}
	this.normalizeZoom = function(_zoom) {
		if(this.size !== 'big')
			return _zoom;
		if(_zoom > 1)
			return 1 + ((_zoom - 1) / 2);
		else
			return 1 - ((1 - _zoom) / 2);
	}
	this.setHitZoom = function(_f, _z) {
		if((_gameTick - this.lastHitZoomTime) < 500)
			return;
		_f.hitZoom = _z;
		this.lastHitZoomTime = _gameTick;
	}
	this.render = function (_frame, _queue) {
		if(this.noDirection && (this.direction !== this.defaultDirection))
			this.direction = this.defaultDirection;
		else if((this.pushback === __left || this.pushback === __right) && (this.direction !== this.pushback))
			this.direction = this.pushback;
		let _anima = this.getCurrentAnimation();
		let _speedRate = _anima.attack ? this.getSpeedRate() : 1;
		let _noXRate;
		if(this.friendly && this.autoTarget && this.autoTarget.isDead())
			this.autoTarget = undefined;
		// if(this.action?.command !== 'move' && this.autoMode > 0 && !_frame.extraStepXRate && (this.animation === 'run' || this.animation === 'walk') && this.autoTarget
		// 	&& !this.autoTarget.isDead() && isObjectsInTouch(this, this.autoTarget, 100)?.touch)
		// 	_noXRate = 1;
		const _fps = this.getFps();
		if (_fps > 1 && !_anima.hurt)
			_speedRate /= _fps;
		this.extraStepYRate = this.stop ? 0 : (this.extraStepYRate ?? 0) + (_speedRate * (_frame.extraStepYRate ?? 0));
		let _stepY = this.puppetMode ? 0 : MathRound(this.extraStepYRate * (episode.cHeight / 100));
		const _solidity = this.isRunningAgainstSolidObject();
		if (!_anima) {
			this.idle(8);
			_anima = this.getCurrentAnimation();
			_frame = this.getCurrentFrame();
		}
		//if (_anima.mobilityY && !this.still)
		const _limitYResult = this.limitYPosition();
		if(_limitYResult)
			_noXRate = 1;
		let _xRate = 0, _extraX = ((this.extraStepXRate ? this.extraStepXRate : (_solidity?.moveX ? this.calculateMoveXStep() : 0)) ?? 0) * _speedRate;
		if (this.turned)
			_extraX = 0;
		else if ((this.moveDirection === 'down' || this.moveDirection === 'up') && (this.keyboard || (this.realTime && this.alp)) && !this.getKeyboardXMove() && !_solidity?.moveX)
			_extraX = 0;
		const _dirReversed = (this.direction !== this.defaultDirection);
		let _reversed = _dirReversed || this.reversed;
		if(_frame.reversed)
			_reversed = !_reversed;
		if (!_anima.move || (_frame.extraStepXRate && (_anima.useExtraStepXRate || (!this.keyboard && (!this.alp || _anima.rivalXMove))) && (_anima.move && !_solidity)))
		{
			_xRate = (_frame.extraStepXRate ?? 0) * _speedRate;
		}
		// if(_reversed && _frame.extraStepXRate)
		// 	_xRate *= -1;
		let _stepX = _noXRate ? 0 : (((_extraX + (this.pushingBy ? (this.pushRate ?? 0) : 0) + (_xRate)) * episode.cWidth) / 100);
		if (this.chargeProperties && !_noXRate)
			_stepX = this.chargeProperties.stepX * _speedRate;
		if (this.still || this.stop || _noXRate || this.hitStop)
			_stepX = 0;
		if(this.GO) {
			_stepX = this.checkCenterOfScreen(this.GO);
			delete this.GO;
		}
		else {
			_stepX = this.checkCenterOfScreen(_stepX, _anima.reversed);
			if(_solidity && _solidity.moveX === 0)
				_stepX = 0;
		}
		this.left = this.left + (((_reversed || _anima.reversed) && !(_reversed && _anima.reversed)) ? -1 * _stepX : _stepX);
		const _maxY = this.getMaxYPosition();
		const yy = this.yPosition / _maxY;
		if (this.class !== __spell && !this.flying && !this.puppetMode && !__storyCutScenePlaying) {
			if (this.left < (yy * minLeft))
				this.left = MathCeil(yy * minLeft);
			else if (this.main && (this.left > (episode.cWidth - (yy * maxLeft))))
				this.left = (episode.cWidth - MathCeil(yy * maxLeft));
			else if ((this.enemy || this.dropType === 'quest-item') && (this.left > (episode.width - (yy * maxLeft))))
				this.left = (episode.width - MathCeil(yy * maxLeft));
		}
		let _xDiff = ((_reversed ? -1 : 1) * (this.ZOOM * (_frame.leftGap ?? 0))) + ((_reversed ? 1 : -1) * (_frame.spriteOrigin * this.ZOOM));
		let _sw = _frame.spriteWidth * this.ZOOM;
		if(this.iFrameJitter)
		{
			_xDiff -= (_reversed ? -1 : 1) * this.iFrameJitter;
			_sw += this.iFrameJitter;
			if(!this.iframeJitterTime) {
				this.iframeJitterTime = _gameTick;
			}
			else if(this.iframeJitterTime < (_gameTick - 60)){
				delete this.iFrameJitter;
				delete this.iframeJitterTime;
			}
		}
		let _left = this.left + _xDiff;
		let _py = this.pushY;
		if(_py && this.animation.startsWith('hurt'))
			_py = 0;
		const _top = (episode.cHeight - (_frame.spriteHeight * this.ZOOM) + (_py ?? 0) +
		MathRound((this.pushY ? 0 :_frame.bottomGap ?? 0) * this.ZOOM)) - _stepY - this.yPosition;
		if(this.pushY) {
			if(!this.pushYStep)
				this.pushYStep = MathRound((episode.cHeight * .5) / 100);
			if(this.pushY > 0) {
				this.pushY -= this.pushYStep;
				if(this.pushY < 0)
					this.pushY = 0;
			}
			else if(this.pushY < 0){
				this.pushY += this.pushYStep;
				if(this.pushY > 0)
					this.pushY = 0;
			}
		}
		if (this.turned)
			this.turned = false;
		let _invisible = (this.invisible && this.enemy) || this.unseen;
		if (_queue && !_invisible) {
			try {
				//let _oldYPosition = this.yPosition;;
				if ((_anima.mobilityY || _noXRate) && !this.still && !this.puppetMode)
					this.calculateYStepAndMove(_solidity, _noXRate);
				if (_frame.objects)
					for (var _o of _frame.objects)
						if (!_o.hurt)
							this.addObject(_o);
				let _particleColor;
				if (!this.release && this.attacker) {
					const _ah = this.attacker.getCurrentFrame().atk?.hurt;
					const _objects = _ah?.objects;
					_particleColor = _ah?.particleColor;
					if (_objects)
						_objects.forEach(x => {
							if (x.crit && this.attacker.criticalHit && this.main)
								this.addObject(x);
							else if (!x.crit)
								this.addObject(x);
						});
				}
				if (!this.remove) {
					const _cut = _frame.positions?.find(x => x.key === 'cut');
					const _cutX = _cut?.x ?? 0;
					const _cutY = _cut?.y ?? 0;
					if(_frame.src && !_frame.sprite)
						_frame.sprite = getImage(_frame.src);
					let _hs = this.hitStop > 0 ? this.hitStop - 1 : 0;
					if(_hs === 1)
						_hs = 2;
					let _zoom = _frame.hitZoom;
					if(_zoom) {
						_zoom = this.normalizeZoom(_zoom);
						_zoom *= (_frame.zoom ?? _anima.zoom ?? 1);
					}
					else
						_zoom = (_frame.zoom ?? _anima.zoom);
					// if (this.drawHalf || _cut) { // && (_cutX || _cutY)) {
					// 	_queue.push({
					// 		skinColor: this.freeze ? '#a2d2df70' : _frame.color,
					// 		particleColor: _particleColor,
					// 		drawPriority: this.drawPriority,
					// 		sprite: _frame.sprite ?? (_anima.sprite ?? this.sprite),
					// 		spriteX: _frame.spriteLeft,
					// 		spriteY: _frame.spriteTop,
					// 		alpha: _frame.alpha,
					// 		zoom: _zoom,
					// 		spriteWidth: _frame.spriteWidth,
					// 		spriteHeight: _frame.spriteHeight,
					// 		shadow: _frame.hasShadowBehind ? (_frame.shadow ?? '#000000') : undefined,
					// 		left: _left,
					// 		top: _top,
					// 		width: _frame.spriteWidth * this.ZOOM,
					// 		height: _frame.spriteHeight * this.ZOOM,
					// 		yGap: _stepY ?? 0,
					// 		reversed: _reversed,
					// 		border: _frame.border,
					// 		frameKey: _frame.frameKey,
					// 		objects: this.stop ? this.relatedObjects?.filter(x => x.totalFrames === 1) ?? [] : this.relatedObjects,
					// 		char: this,
					// 		animation: this.animation,
					// 		hbGap: this.healtbarGap + (_frame.healtbarGap ?? 0)
					// 	});
					// 	let _cutSpriteWidth = _cutX > 0 ? _cutX : _frame.spriteWidth;
					// 	let _cutSpriteHeight = _cutY > 0 ? _cutY : _frame.spriteHeight;
					// 	let _cutSpriteTop = _frame.spriteTop;
					// 	let _cutTop = _top;
					// 	if(_cut.exclude) {
					// 		if(_cutY > 0) {
					// 			_cutSpriteTop += _cutSpriteHeight;
					// 			_cutTop += (_cutSpriteHeight * this.ZOOM);
					// 			_cutSpriteHeight = _frame.spriteHeight - _cutSpriteHeight;
					// 		}
					// 	}
					// 	_queue.push({
					// 		skinColor: this.freeze ? '#a2d2df70' : _frame.color,
					// 		particleColor: _particleColor,
					// 		drawPriority: .5,
					// 		sprite: _frame.sprite ?? (_anima.sprite ?? this.sprite),
					// 		spriteX: _frame.spriteLeft,
					// 		spriteY: _cutSpriteTop,
					// 		alpha: _frame.alpha,
					// 		zoom: _zoom,
					// 		spriteWidth: _cutSpriteWidth,
					// 		spriteHeight: _cutSpriteHeight,
					// 		shadow: _frame.hasShadowBehind ? (_frame.shadow ?? '#000000') : undefined,
					// 		left: _left,
					// 		top: _cutTop,
					// 		width: MathRound(_cutSpriteWidth * this.ZOOM),
					// 		height: MathRound(_cutSpriteHeight * this.ZOOM),
					// 		yGap: _stepY ?? 0,
					// 		reversed: _reversed,
					// 		frameKey: _frame.frameKey,
					// 		char: this,
					// 		animation: this.animation,
					// 		hbGap: this.healtbarGap + (_frame.healtbarGap ?? 0)
					// 	});
					// }
					// else
						_queue.push({
							skinColor: this.freeze ? '#a2d2df70' : _frame.color,
							particleColor: _particleColor,
							drawPriority: this.drawPriority,
							sprite: _frame.sprite ?? (_anima.sprite ?? this.sprite),
							spriteX: _frame.spriteLeft,
							spriteY: _frame.spriteTop,
							alpha: _frame.alpha,
							zoom: _zoom,
							spriteWidth: _frame.spriteWidth,
							spriteHeight: _frame.spriteHeight,
							shadow: _frame.hasShadowBehind ? (_frame.shadow ?? '#000000') : undefined,
							left: _left,
							top: _top,
							background: _frame.background ?? _anima.background,
							foreground: _frame.foreground ?? _anima.foreground,
							width: _sw,
							height: _frame.spriteHeight * this.ZOOM,
							yGap: _stepY ?? 0,
							reversed: _reversed,
							border: _frame.border,
							frameKey: _frame.frameKey,
							objects: this.stop ? this.relatedObjects?.filter(x => x.totalFrames === 1) ?? [] : this.relatedObjects,
							char: this,
							animation: this.animation,
							hbGap: this.healtbarGap + (_frame.healtbarGap ?? 0)
						});
				}
			}
			catch (xxxxxx) {
				console.log(xxxxxx.message);
			}
		}
		if(this.solid || episode.hasSolid)
			this.centerSolid = this.getCenterSolid();
		if(_frame.hitZoom) {
			_frame.hitZoom -= 0.025;
			if(_frame.hitZoom <= 1)
				delete _frame.hitZoom;
		}
		this.oldYPosition = this.yPosition;
		this.oldHURTLEFT = this.HURTLEFT + platformX;
	}
	this.getCenterSolid = function() {
		let _top = this.TOP;
		const _bottom = _top + this.HEIGHT;
		_top = _bottom - (this.yGap ?? (5 * this.ZOOM));
		const _srcLeft = this.SCREENLEFT;
		const _left = _srcLeft - this.ORIGINDIST;
		const _w = this.WIDTH;
		return {
			l: _left,
			w: _w,
			x: MathRound(_left + (_w / 2)),
			t: _top,
			y: MathRound(_top + ((_bottom - _top) / 2)),
			h: MathRound(_bottom - _top)
		}
	}
	this.getMaxYPosition = function() {
		return getGroundHeight() - this.yGap;
	}
	this.limitYPosition = function() {
		if(this.positionable)
			return;
		const my = this.getMaxYPosition()
		if (this.yPosition > my)
			this.yPosition = MathFloor(my);
		else {
			const _miny = episode.getMinPositionY(this);
			if (!_miny.noXRate && this.yPosition < _miny.y)
				this.yPosition = _miny.y;
			//return _miny.noXRate;
		}
		return undefined;
	}
	this.intersectRect = function(r1, r2) {
		return !(r2.l > (r1.l + r1.w) ||
		(r2.l + r2.w) < r1.l ||
		  r2.t > (r1.t + r1.h) ||
		  (r2.t + r2.h) < r1.t);
	}
	
	this.isPointIntersectWithSolidObjects = function(_point, _e, _pWidth, _pHeight) {
		//for(let _e of _enemies) {
			if(_e.nextPoint) {
				if(this.intersectRect(
				{
					w: _pWidth,
					h: _pHeight,
					l: _point.l,
					t: _point.t
				},
				{
					w: _e.WIDTH,
					l: _e.nextPoint.l,
					t: _e.nextPoint.t,
					h: _e.nextPoint.h
				}))
				return true;
			}
			else if(this.intersectRect(
				{
					w: _pWidth,
					h: _pHeight,
					l: _point.l,
					t: _point.t
				},
				{
					w: _e.centerSolid.w,
					l: _e.centerSolid.l,
					t: _e.centerSolid.t,
					h: _e.centerSolid.h
				}))
					return true;
		//}
		return false;
	}
	
	this.isRunningAgainstSolidObject = function () {

		if (!episode.hasSolid) return false;

		if (this.action?.y) {
			return {
				moveX: 1,
				moveY: this.moveDirection === 'up' ? -1 : (this.moveDirection === 'down' ? 1 : 0)
			};
		}

		if (this.puppetMode) {
			return { moveX: 1, moveY: 0 };
		}

		if ((!this.animations.run && !this.animations.walk) ||
			(this.animation !== 'run' && this.animation !== 'walk'))
			return false;

		const enemies = episode.seenEnemies;
		const thisCenter = this.centerSolid;
		const thisNext = this.getCenterSolid();

		if (!thisCenter || !thisNext) return false;

		for (let i = 0; i < enemies.length; i++) {

			const solid = enemies[i];

			// ===== CHEAP FILTER =====
			if (!solid.solid ||
				solid.remove ||
				solid === this ||
				solid.isDead())
				continue;

			if (!solid.centerSolid) continue;

			// ===== HEAVY CHECK SONRA =====
			if (!isObjectsPassingOver(this, solid))
				continue;

			const s = solid.centerSolid;
			let moveX = 1;
			let moveY = 0;

			switch (this.moveDirection) {

				case __right:
					if ((thisNext.l + thisNext.w) >= s.l &&
						(thisNext.l + thisNext.w) < (s.l + thisNext.l)) {

						moveX = 0;

						const y = this.getKeyboardYMove();
						moveY = y === 'up' ? -1 :
								y === 'down' ? 1 :
								(thisNext.y < s.y ? -1 : 1);
					}
					break;

				case __left:
					if (thisNext.l <= (s.l + s.w) &&
						thisNext.l > s.l) {

						moveX = 0;

						const y = this.getKeyboardYMove();
						moveY = y === 'up' ? -1 :
								y === 'down' ? 1 :
								(thisNext.y < s.y ? -1 : 1);
					}
					break;

				case 'down':
					if ((thisNext.t + thisNext.h) >= s.t &&
						thisNext.t < (s.t + s.h)) {

						moveY = 0;
						moveX = 1;
					} else {
						moveY = 1;
					}
					break;

				case 'up':
					if (thisNext.t <= (s.t + s.h) &&
						(thisNext.t + thisNext.h) > s.t) {

						moveY = 0;
						moveX = 1;
					} else {
						moveY = -1;
					}
					break;
			}

			if (moveY === 2) {
				this.limitYPosition();
				moveY = 0;
			}

			if (moveY && this.enemy && !this.solidOne)
				this.solidOne = moveY;

			return {
				moveX: moveX,
				moveY: this.solidOne ?? moveY
			};
		}

		if (this.solidOne)
			delete this.solidOne;

		return false;
	};
	this.setNewStatus = function (_diff) {
		return;
		for (var _k of Object.keys(_diff))
			switch (_k) {
				case 'w':
					this.deviceWidth = _diff.w;
					break;
				case 'b':
					this.buffs = _diff.b;
					break;
				case 'h':
					this.setHealth(_diff.h, null, null, 3);
					break;
				case 'mhp':
					this.maxHP = _diff.mhp;
					break;
				case 'd':
					this.direction = _diff.d === 'l' ? __left : (_diff.d === 'r' ? __right : _diff.d);
					break;
				case 'md':
					this.moveDirection = _diff.md;
					break;
				case 'at':
					if (_diff.at) {
						alert(123);
						this.autoTarget = episode.enemies?.find(x => x.socketId === _diff.at);
						this.setAutoMode(this.autoTarget ? 2 : 0, 1);
					}
					break;
				case 'f':
					this.fatique = _diff.f;
					break;
				case 'yp':
					this.yPosition = _diff.yp * getGroundHeight();
					break;
				case 'a':
					this.animation = _diff.a;
					this.start = this.frame = 0;
					break;
				case 'ey':
					this.extraStepYRate = _diff.ey;
					break;
				case 'ex':
					this.extraStepXRate = _diff.ex;
					break;
				case 'r':
					this.release = _diff.r;
					break;
				case 'rm':
					this.remove = _diff.rm;
					break;
				case 'fps':
					this.fps = _diff.fps;
					break;
				case 'x':
					this.left = MathRound(_diff.x * (episode.cWidth / (_diff.w ?? this.deviceWidth)));
					break;
				case 'l':
					this.level = _diff.l;
					break;
				case 'z':
					this.zoom = _diff.z;
					break;
				//case 'k':
				//	this.socketId = _diff.k;
				//	break;
			}
	}
	this.getAnimationKeyById = function(_id) {
		for (const key in this.animations)
			if(this.animations[key]?.id === _id)
				return key;
	}
	this.setNewStatus2 = function (_diff) {
		if(this.main && !_diff.k)
			return;
		let _chooseDirection;
		if(_diff.a) {
			this.animation = this.getAnimationKeyById(_diff.a);
			this.start = this.frame = 0;
			this.animationFinished = this.iframe = false;
			const _anima = this.getCurrentAnimation();
			if(_anima.rivalXMove)
				delete _anima.rivalXMove;
			if(_anima.move && !_anima.imediateBreak)
				_chooseDirection = _anima;
		}
		const _keys = Object.keys(_diff);
		for (var _k of _keys)
			switch (_k) {
				case 'b':
					this.buffs = _diff.b?.map(x =>
					({
						time: x.s,
						key: getBuffKeyById(x.k),
						level: x.l,
					})) ?? [];
					if(this.buffs?.[0])
						this.buffs.forEach(b => {
							if(!b.ms) {
								const _b = _allBuffs[b.key];
								b.type = _b.gain ? 'buff' : 'debuff';
								b.ms = (_b.gain ?? _b.loss).find(x => x.level === b.level).ms;
							}
						});
					break;
				case 'h':
					this.setHealth(_diff.h, null, null, 3);
					break;
				case 'k':
					this.decreaseHealth(_diff.k, episode.enemies?.find(x => x.socketId === _diff.s), 1);
					break;
				case 'mh':
					this.maxHP = _diff.mh;
					break;
				case 'v':
					this.extraStepYRate = _diff.v;
					break;
				case 'u':
					this.rivalXMove = this.rivalYMove = this.rivalMove = undefined;
					if((_diff.u & 1) > 0)
						this.rivalXMove = __right;
					else if((_diff.u & 2) > 0)
						this.rivalXMove = __left;
					if((_diff.u & 4) > 0)
						this.rivalYMove = 'up';
					else if((_diff.u & 8) > 0)
						this.rivalYMove = 'down';
					if(_diff.u > 15)
					{
						if((_diff.u & 16) > 0)
							this.rivalMove = __right;
						else if((_diff.u & 32) > 0)
							this.rivalMove = __left;
						else if((_diff.u & 64) > 0)
							this.rivalMove = 'up';
						else if((_diff.u & 128) > 0)
							this.rivalMove = 'down';
					}
					if(this.rivalXMove && _chooseDirection)
						_chooseDirection.rivalXMove = this.rivalXMove;
					else if(!this.rivalXMove) {
						const _anima = this.getCurrentAnimation();
						if(_anima.rivalXMove && _anima.imediateBreak)
							delete _anima.rivalXMove;
					}
					break;
				case 'd':
					if((_diff.d & 1) > 0)
						this.moveDirection = __right;
					else if((_diff.d & 2) > 0)
						this.moveDirection = __left;
					else if((_diff.d & 4) > 0)
						this.moveDirection = 'up';
					else if((_diff.d & 8) > 0)
						this.moveDirection = 'down';
					else
						this.moveDirection = undefined;
					if((_diff.d & 16) > 0)
						this.direction = __right;
					else if((_diff.d & 32) > 0)
						this.direction = __left;
					//this.direction = _diff.d === 1 ? __left : (_diff.d === 0 ? __right : _diff.d);
					break;
				case 'f':
					this.fatique = _diff.f;
					break;
				case 'q':
					this.chargeProperties = _diff.q ? {
						enemy:	episode.enemies.find(x => x.socketId === _diff.q.e),
						stepX: MathRound((_diff.q.s * episode.cWidth) / 100),
						dir: _diff.q.d === 1 ? __left : __right
					} : undefined;
					if(this.chargeProperties && !this.chargimg) {
						this.charging = true;
						PlaySound({ key: 'charge', volume: .25, owner: this });
					}
					break;
				case 'g':
					this.release = (_diff.g & 1) > 0;
					this.remove = (_diff.g & 2) > 0;
					this.sleep = (_diff.g & 4) > 0;
					this.invisible = (_diff.g & 8) > 0;
					this.immobilize = (_diff.g & 16) > 0;
					this.charging = (_diff.g & 32) > 0;
					this.pull = (_diff.g & 128) > 0;
					this.invulnerable = (_diff.g & 256) > 0;
					break;
				case 'p':
					this.fps = _diff.p;
					break;
				case 'y':
					this.yPosition = _diff.y * getGroundHeight();
					break;
				case 'x':
					//_diff.x ekranına göre oran
					this.left = MathRound(_diff.x * episode.width);
					break;
				case 'l':
					this.level = _diff.l;
					break;
			}
		if(_keys.indexOf('j') !== -1)
			this.extraStepXRate = _diff.j;
	}
	this.convertMDAndDirectionData = function(_md, _dir) {
		let _total = 0;
		switch(_md) {
			case __right:
				_total += 1;
				break;
			case __left:
				_total += 2;
				break;
			case 'up':
				_total += 4;
				break;
			case 'down':
				_total += 8;
				break;
		}
		return _total + (_dir === __right ? 16 : 32);
	}
	this.convertKeyboardXMove = function(_dir) {
		switch(_dir) {
			case __right:
				return 0;
			case __left:
				return 1;
			default:
				return undefined;
		}
	}
	this.getDirection = function(){
		const _x = this.keyboard.getXMove()?.name;
		const _y = this.keyboard.getYMove()?.name;
		const _m = this.keyboard.getMove();
		let _total = 0;
		if(_x)
			_total += _x === __right ? 1 : 2;
		if(_y)
			_total += _y === 'up' ? 4 : 8;
		if(_m)
			switch(_m) {
				case __right:
					_total += 16;
					break;
				case __left:
					_total += 32;
					break;
				case 'up':
					_total += 64;
					break;
				default:
					_total += 128;
					break;
			}
		return _total;
	}
	this.getNewStatus2 = function (_firstTime, _add) {
		if (_firstTime)
			this.oldStatus = undefined;
		const _anima = this.getCurrentAnimation();
		const _status = {
			buffs: this.buffs,
			health: this.health,
			fatique: this.fatique,
			flag: (this.release ? 1 : 0) + (this.remove ? 2 : 0) +
				(this.sleep ? 4 : 0) + (this.invisible ? 8 : 0) + (this.immobilize ? 16 : 0)
				+ (this.charging ? 32 : 0) + (_anima.useExtraStepXRate ? 64 : 0)
				+ (this.pull ? 128 : 0) + (this.invulnerable ? 256 : 0),
			maxHP: this.MAXHP,
			dir: this.convertMDAndDirectionData(this.moveDirection, this.direction),
			keyboardDirection: this.getDirection(),
			chargeProperties: this.chargeProperties,
			fps: this.getFps(),
			//rivalXMove: this.convertKeyboardXMove(this.getKeyboardXMove()),
			level: this.level,
			extraStepXRate: this.extraStepXRate,
			extraStepYRate: this.extraStepYRate,
			animation: this.animation
		};
		let _diff = {};
		if (this.oldStatus?.b?.length !== _status.buffs?.length)
			_diff.b = _status.buffs.map(x => ({
				s:x.time,
				k:_allBuffs[x.key].id,
				l:x.level
			}));
		if (this.oldStatus?.h !== _status.health)
			_diff.h = _status.health;
		if (this.oldStatus?.f !== _status.fatique)
			_diff.f = _status.fatique;
		if (this.oldStatus?.j !== _status.extraStepXRate)
			_diff.j = _status.extraStepXRate;
		if (this.oldStatus?.u !== _status.keyboardDirection)
			_diff.u = _status.keyboardDirection;
		if(this.oldStatus?.q?.e !== _status.chargeProperties?.enemy?.socketId){
			_diff.q = _status.chargeProperties ?
				{
					e:_status.chargeProperties.enemy.socketId,
					d:_status.chargeProperties.dir === __left ? 1 : 0,
					s: to3Decimals((_status.chargeProperties.stepX * 100) / episode.cWidth)
				} : undefined;
			if(!_diff.q)
				_add = 1;
		}
		if(this.oldStatus?.d !== _status.dir)
			_diff.d = _status.dir;
		if ((!(_status.animation === 'idle' && this.start === 0) && (this.oldStatus?.a !== this.animations[_status.animation].id)) || this.animationChanged) {
			_diff.a = _anima.id;
			if (this.animationChanged)
				this.animationChanged = false;
			if(_anima.move)
			 	_diff.u = _status.keyboardDirection;
			_add = 1;
			_diff.d = _status.dir;
		}
		if(this.oldStatus?.g !== _status.flag)
			_diff.g = _status.flag;
		if (this.oldStatus?.p !== _status.fps)
			_diff.p = _status.fps;
		const _keys = Object.keys(_diff);
		const _hasKey = _keys?.[0];
		if (_hasKey || _add) {
			if (!this.oldStatus)
				this.oldStatus = {};
			if(_hasKey)
				for (var _k of _keys)
					this.oldStatus[_k] = _diff[_k];
			if (_firstTime) {
				_diff.mh = this.MAXHP;
				_diff.l = this.level;
				this.lastSyncDate = msNow;
			}
			if(_add) {
				if(_status.extraStepYRate === 0) {
					if(!this.extraStepYRateReset) {
						this.extraStepYRateReset = 1;
						_diff.v = 0;
					}
				}
				else
					this.extraStepYRateReset = undefined;
				_diff.y = to3Decimals(this.yPosition / getGroundHeight());
				if(!this.chargeProperties)
					_diff.x = to4Decimals((this.left + (this.enemy ? 0 : platformX)) / episode.width); //this.left + (this.enemy ? 0 : platformX);
				this.lastSyncDate = msNow;
			}
			return _diff;
		}
		return undefined;
	}
	this.getNewStatus = function (_firstTime, _props) {
		if (!_firstTime && !this.animationChanged && !this.socketId && !(this.animation === 'idle' || this.animation === 'hug' || this.animation === 'release' || this.animation === 'counter' || this.animation.startsWith('hurt') || this.animation.startsWith('finish') ||
			this.animation.startsWith('knockback') || this.animation.startsWith('dead'))) {
			if (this.oldStatus && this.oldStatus.a !== this.animation)
				this.oldStatus.a = this.animation;
			return;
		}
		if (_firstTime)
			this.oldStatus = undefined;
		const _status = {
			buffs: this.buffs,
			health: this.health,
			maxHP: this.maxHP,
			direction: this.direction,
			moveDirection: this.moveDirection,
			yPosition: this.yPosition,
			left: this.left,
			fps: this.getFps(),
			remove: this.remove,
			level: this.level,
			animation: this.animation,
			extraStepYRate: this.extraStepYRate,
			extraStepXRate: this.extraStepXRate,
			release: this.release
		};
		let _diff = {};
		if (this.oldStatus?.b?.length !== _status.buffs?.length)
			_diff.b = _status.buffs;
		if (this.oldStatus?.h !== _status.health)
			_diff.h = _status.health;
		if (this.oldStatus?.mh !== _status.maxHP)
			_diff.mh = _status.maxHP;
		if (this.oldStatus?.d !== (_status.direction === __left ? 'l' : (_status.direction === __right ? 'r' : undefined)))
			_diff.d = _status.direction === __left ? 'l' : (_status.direction === __right ? 'r' : undefined);
		if (this.oldStatus?.md !== _status.moveDirection)
			_diff.md = _status.moveDirection;
		if ((!(_status.animation === 'idle' && this.start === 0) && (this.oldStatus?.a !== _status.animation)) || this.animationChanged) {
			_diff.a = _status.animation;
			_diff.x = this.left + (this.enemy ? 0 : platformX);
			if (this.animationChanged)
				this.animationChanged = false;
		}
		if (this.oldStatus?.ey !== _status.extraStepYRate)
			_diff.ey = _status.extraStepYRate;
		if (this.oldStatus?.ex !== _status.extraStepXRate)
			_diff.ex = _status.extraStepXRate;
		if (this.oldStatus?.r !== (_status.release ? 1 : 0))
			_diff.r = _status.release ? 1 : 0;
		if (this.oldStatus?.rm !== (_status.remove ? 1 : 0))
			_diff.rm = _status.remove ? 1 : 0;
		if (this.oldStatus?.fps !== _status.fps)
			_diff.fps = _status.fps;
		if (this.oldStatus?.l !== _status.level)
			_diff.l = _status.level;
		const _keys = Object.keys(_diff);
		if (_keys?.[0]) {
			if (!this.oldStatus)
				this.oldStatus = {};
			for (var _k of _keys)
				this.oldStatus[_k] = _diff[_k];
			if (_firstTime) {
				_diff.t = getEnemyIdByClass(this.class);
				if (!_diff.t)
					_diff.t = this.id;
				if (this.name)
					_diff.n = this.name;
				if (this.autoMode >= 0)
					_diff.am = this.autoMode;
				_diff.yp = this.yPosition / getGroundHeight();
				_diff.mh = this.maxHP;
				_diff.x = this.left + (this.enemy ? 0 : platformX);
				_diff.l = this.level;
				if(this.main) {
					_diff.cl = this.class;
					_diff.ai = __account.id;
					_diff.n = __account.name;
				}
				if (this.animations.block) {
					_diff.f = this.fatique;
					_diff.mf = this.maxFatique;
				}
				_diff.d = this.direction;
				_diff.w = episode.cWidth;
				_diff.k = this.key;
				if (this.leader)
					_diff.ld = 1;
				if (this.socketId)
					_diff.hs = 1;
				_diff.z = this.zoom;
			}
			setDefaultMessage(_diff, _firstTime);
			sendMessage(JSON.stringify(_diff));
		}
	}
	// this.checkCenterOfScreen2 = function (_step, _reversed) {
	// 	if (!this.main)
	// 		return _step;
	// 	let afterX;
	// 	let _dir = this.direction;
	// 	if (_reversed) {
	// 		if (_dir === __left)
	// 			_dir = __right;
	// 		else if (_dir === __right)
	// 			_dir = __left;
	// 	}
	// 	if (_dir === __left) {
	// 		if (this.left <= centerMinX && platformX === 0)
	// 			return _step;
	// 		afterX = this.left - _step;
	// 		if (afterX >= centerMinX) {
	// 			if (this.pushDirection) {
	// 				if (this.left >= centerMinX && afterX < centerMinX) {
	// 					platformX -= MathRound(this.left - centerMinX);
	// 					_step += (centerMinX - afterX);
	// 					if (platformX < 0) {
	// 						_step += platformX;
	// 						platformX = 0;
	// 					}
	// 				}
	// 				else if (this.left <= centerMaxX && afterX > centerMaxX) {
	// 					platformX += MathRound(centerMaxX - this.left);
	// 					_step += (afterX - centerMaxX);
	// 					if (platformX > (episode.width - _canvas.width)) {
	// 						_step -= (platformX - (episode.width - _canvas.width));
	// 						platformX = episode.width - _canvas.width;
	// 					}
	// 				}
	// 				else if (this.left <= centerMaxX && this.left >= centerMinX && afterX <= centerMaxX && afterX >= centerMinX) {

	// 				}
	// 				else {
	// 					platformX += MathRound(this.pushDirection === __right ? Math.abs(_step) : -1 * Math.abs(_step));
	// 					if (platformX < 0)
	// 						platformX = 0;
	// 					else if (platformX > (episode.width - _canvas.width))
	// 						platformX = episode.width - _canvas.width;
	// 				}
	// 			}
	// 			return _step;
	// 		}
	// 		platformX -= MathRound(_step - (this.left - centerMinX));
	// 		_step = this.left - centerMinX;
	// 		if (platformX < 0)
	// 			platformX = 0;
	// 		return _step;
	// 	}
	// 	else if (_dir === __right) {
	// 		if (this.left >= centerMaxX && platformX === (episode.width - _canvas.width))
	// 			return _step;
	// 		afterX = this.left + _step;
	// 		if (afterX <= centerMaxX) {
	// 			if (this.pushDirection) {
	// 				if (this.left >= centerMinX && afterX < centerMinX) {
	// 					platformX -= MathRound(this.left - centerMinX);
	// 					_step += (centerMinX - afterX);
	// 					if (platformX < 0) {
	// 						platformX = 0;
	// 					}
	// 				}
	// 				else if (this.left <= centerMaxX && afterX > centerMaxX) {
	// 					platformX += MathRound(centerMaxX - this.left);
	// 					_step += (afterX - centerMaxX);
	// 					if (platformX > (episode.width - _canvas.width)) {
	// 						_step -= (platformX - (episode.width - _canvas.width));
	// 						platformX = episode.width - _canvas.width;
	// 					}
	// 				}
	// 				else if (this.left <= centerMaxX && this.left >= centerMinX && afterX <= centerMaxX && afterX >= centerMinX) {

	// 				}
	// 				else {
	// 					platformX += MathRound(this.pushDirection === __right ? Math.abs(_step) : -1 * Math.abs(_step));
	// 					if (platformX < 0)
	// 						platformX = 0;
	// 					else if (platformX > (episode.width - _canvas.width))
	// 						platformX = episode.width - _canvas.width;
	// 				}
	// 			}
	// 			return _step;
	// 		}
	// 		platformX += MathRound(_step - (centerMaxX - this.left));
	// 		_step = centerMaxX - this.left;
	// 		if (platformX > (episode.width - _canvas.width))
	// 			platformX = episode.width - _canvas.width;
	// 		return _step;
	// 	}
	// 	return _step;
	// }
	this.checkCenterOfScreen = function (_step, _reversed) {
		if (!this.main || !_step || episode.still) {
			if(episode.still && this.main) {
				if(this.left <= 0 && episode.runToLeft)
					switchMap(episode.runToLeft);
				else if((this.left + this.WIDTH) >= episode.cWidth && episode.runToRight)
					switchMap(episode.runToRight);
			}
			else if(!episode.still && this.main) {
				if(this.left <= 0 && platformX <= 0 && episode.runToLeft)
					switchMap(episode.runToLeft);
				else if((this.left + this.WIDTH) >= episode.width && episode.runToRight)
					switchMap(episode.runToRight);
			}
			return _step;
		}
		let _afterX;
		let _dir = this.pushDirection ?? this.direction;
		if (_reversed && (this.pushDirection === undefined && !this.knockbacking)) {
			if (_dir === __left)
				_dir = __right;
			else if (_dir === __right)
				_dir = __left;
		}
		let _s = MathAbs(_step);
		let _left = this.left;
		if (_dir === __left) {
			_afterX = _left - _step;
			//if (_left >= centerMinX && _left < centerMaxX) {
			if (_left < centerMaxX && (_left >= centerMinX || ((platformX > 0) && (_left < centerMinX)))) {
				if (_afterX < centerMinX) {
					_s = _left - centerMinX;
					if(!episode.still)
						platformX -= MathRound(centerMinX - _afterX);
					if (platformX < (episode.minPlatformX ?? 0)) {
						_s += MathAbs(platformX);
						platformX = (episode.minPlatformX ?? 0);
						if(episode.runToLeft)
							switchMap(episode.runToLeft);
					}
				}
			}
			return (_step < 0 ? -1 : 1) * _s;
		}
		else {
			//_left += ((this.width / 2) * this.ZOOM);
			_afterX = _left + _step;
			const _maxW = episode.width - episode.cWidth;
			//if (_left > centerMinX && _left <= centerMaxX) {
			if (_left > centerMinX && (_left <= centerMaxX || ((platformX < _maxW) && (_left > centerMaxX)))) {
				if (_afterX >= centerMaxX) {
					_s = centerMaxX - _left;
					if(!episode.still)
						platformX += MathRound(_afterX - centerMaxX);
					if (platformX > _maxW) {
						_s += (platformX - _maxW);
						platformX = _maxW;
						if(episode.runToRight)
							switchMap(episode.runToRight);
					}
				}
			}
			return (_step < 0 ? -1 : 1) * _s;
		}
	}
	this.isXMove = function (_move) {
		return _move === __left || _move === __right;// || this.socketDirPressed;
	}
	this.isYMove = function (_move) {
		return _move === 'up' || _move === 'down';
	}
	this.applyCommand = function () {
		if(this.sleep && this.animation !== 'idle') {
			blurKeyboard();
			this.animate('idle', 1);
			return;
		}
		let _anima = this.getCurrentAnimation();
		// if(!this.keyboard.holdingKeys?.[0] && (this.animationFinished || _anima.imediateBreak) && !this.isDead()) {
		// 	this.animate('idle', 1, null, 8);
		// 	return;
		// }
		const _blockSkill = this.animation.endsWith('block');
		if (!(_anima.key === 'run' || this.attacker))
			this.extraStepXRate = 0;
		if (!this.isDead() && !episode.end && !this.autoMode) {
			const _move = this.keyboard?.getMove?.() ?? this.rivalMove;
			let _skill = this.keyboard?.getSkill?.();
			const _frame = this.getCurrentFrame();
			if (!_skill && _move && (this.animationFinished || this.animation === 'idle' || this.animation === 'run' || _anima.channeling))
				this.run(_anima, _move, null, 6);
			else if (!_skill && (!_anima?.chain || (_anima.chain && this.animationFinished))
				&& !_move && ((this.animation === 'run' || this.animation === 'walk') || this.animationFinished)) {
				if (!this.attackingOnlyBy)
					this.idle(3);
			}
			else if ((this.action?.command && !_skill && this.keyboard?.holdingKeys?.find(x => x.key === 'u')) || (_skill?.startsWith('finish') && !this.target)) {
				switch (this.action?.command) {
					case 'talk':
						if (this.action.dialogs)
							createDialogScreen(this.action.dialogs);
						else
							createDialog(this.action.id);
						break;
					case 'use':
						if (this.action.to) {
							for (var i = 0; i < mapSprites.length; i++)
								if (mapSprites[i].id === this.action.to) {
									switchMap(mapSprites[i].id);
									break;
								}
						}
						else {
							if (!useProgress)
								useProgress = document.getElementById('use-progress');
							if (this.action.progress || useProgress.inProgress) {
								if(useProgress.inProgress){
									this.action.command = undefined;
									break;
								}
								if (!this.hurting) {
									useProgress.inProgress = true;
									removeClass(useProgress, 'v-none');
									this.useProgressStart = _gameTick;
									addClass(useProgress, 'use-in-progress');
									if(this.action.sound){
										const _setActionSound = async function(_th) {
											_th.action.sound.bind = true;
											_th.actionSound = await PlaySound(_th.action.sound);
										}
										_setActionSound(this);
									}
									this.animate('idle', 1, null, 9);
								}
								else {
									if(this.actionSound?.stop)
										this.actionSound.stop();
									addClass(useProgress, 'v-none');
								}
							}
							else {
								addClass(useProgress, 'v-none');
								if(this.action.artifactId) {
									__account.artifacts.push({id:this.action.artifactId});
									_client.saveState(1);
									warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/rune.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Talisman found') + '!</span></div>', null, null, 1);

									//warn('<div class="flex heading" style="position:relative"><img style="position:absolute;z-index:-1;left:-40%;width:180%" src="./images/icons/banner.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('Talisman found') + '!</span></div>', 'level-up');
									const _portal = document.getElementById('SPRT-' + this.action.loot);
									if (_portal)
										_portal.remove();
									addClass(_useBtn, 'v-none');
									episode.sprites.filter(x => x.animation.id === this.action.id).forEach(x => x.remove = true);
									applyBonusStats();
									if(episode.artifacts?.length > 0)
										episode.artifacts.length = 0;
								}
								else {
									__account.questStatus.side.state = 'end';
									warn('<div class="flex heading" style="position:relative"><img style="position:absolute;z-index:-1;left:-40%;width:180%" src="./images/icons/banner.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('You found it') + '!</span></div>', 'level-up');
									PlaySound({ key: 'questdone', volume: .8 });
									const _portal = document.getElementById('SPRT-' + this.action.loot);
									if (_portal)
										_portal.remove();
										addClass(_useBtn, 'v-none');
										episode.sprites.filter(x => x.animation.id === this.action.loot).forEach(x => x.remove = true);
										const _sideQuest = _sideQuests.find(x => x.id === __account.questStatus.side.quest.id);
										if (_sideQuest.realOwner)
											_sideQuest.owner = _sideQuest.realOwner;
									_client.upgradeQuestStatus();
								}
							}
						}
						break;
				}
				if (!this.useProgressStart)
					this.action = undefined;
			}
			else if (_skill) {
				if (_skill === 'common') {
					const _pressedKey = this.keyboard.getCommonSkillOrder?.();
					if (_pressedKey) {
						let _order = getBaseKeyboardKey(_pressedKey);
						if(_order) {
							_order = parseInt(_order);
							if(_order === 1 && this.commonItem) {
								this.useCommonSkill(1);
							}
							else 
							{
								if (__account.commonInventory?.[_order - 1])
									this.useCommonSkill(_order);
							}
							this.keyboard.removeCommonSkill?.();
						}	
					}
					//this.idle(9);
				}
				else {
					let _newAnima = this.animations[_skill];
					if (!_newAnima.chain && this.immobilize && !_newAnima.useInCC) {
					}
					if (_newAnima.chain || _frame.imediateBreak || (_anima.imediateBreak && (!this.charging || !_anima.attack)) || this.animationFinished || _anima.channeling || (_newAnima.useInCC && _anima.hurt))
					{
						const _isMoving = this.animation === 'run' || this.animation === 'walk';
						if (!this.animate(_skill)) {
							if(!_isMoving){
								this.idle(7);
							}
						}
					}
				}
			}
			if (!_move) {
				this.moveDirection = undefined;
				if(!_skill && (this.animation === 'walk' || this.animation === 'run'))
					this.idle();
			}
			else if (_anima.mobilityY && !this.chargimg && _frame.directionChangeEnabled && this.isYMove(_move))
				this.moveDirection = _move;
			else if (_frame.directionChangeEnabled && !this.chargimg && this.isXMove(_move))
			{
				this.direction = _move;
			}
			const _oldBlockState = this.blocked || _blockSkill;
			this.blocked = this.animation.endsWith('block');
			if (!_oldBlockState && this.blocked && !this.newBlocked){
				this.newBlocked = 1;
			}
			else if (this.newBlocked)
				this.newBlocked++;
		}
	}
	this.organizeRelatedObjects = function (_skill) {
		return;
		if (this.relatedObjects?.[0] && (!this.animations[_skill]?.hurt || _skill === 'release'))
			this.relatedObjects = this.relatedObjects.filter(x => x.type !== 'hurt' && (!x.bind ||
				x.bind === this.animation || (x.type === 'buff' && this.buffs.find(y => y.key === x.bind))));
	}
	this.modifySkill = function (_skill) {
		if (this.ultimate)
			if (this.animations[_skill + 'modified'])
				return _skill + 'modified';
		if (_skill === 'dead') {
			const _type = this.animations[this.cc]?.hurt;
			if (_type === 'head')
				_skill = 'deadhead';
			else if (_type === 'ground')
				_skill = 'deadground';
			else if (_type === 'air')
				_skill = 'deadair';
			if (!this.animations[_skill])
				_skill = 'dead';
		}
		else if (_skill.startsWith('knockback')) {
			if (!this.animations[_skill]) {
				_skill = 'knockbackground';
				if (!this.animations[_skill]) {
					_skill = 'hurtground1';
					this.attackingOnlyBy = false;
				}
			}
			else if(_skill.startsWith('knockbackair')) {
				const _frames = this.animations?.[_skill]?.frames;
				if(_frames){
					const _bgRate = getRandomValue2(95,115) / 100;
					_frames.forEach(x => {
						if(x.bottomGap)
						{
							if(!x.realBottomGap)
								x.realBottomGap = x.bottomGap;
							x.bottomGap = MathRound(x.realBottomGap * _bgRate);
						}
					});
				}
			}
		}
		else if (_skill.startsWith('finish')) {
			const _finishes = [];
			if(!episode.finishes)
				episode.finishes = [];
			for (const key in this.animations) {
				const _anima = this.animations[key];
				if(_anima.finishType === _skill) {
					const _f = episode.enemies.find(x => x.key === _anima.key);
					if(_f && ((_gameTick - _f.date) > 30000))
						_f.date = _gameTick;
					else if(_f)
						continue;
					_finishes.push(_anima.key);
				}
			}
			if(_finishes.length > 0)
				_skill = _finishes[getRandomValue(0, _finishes.length - 1)];
		}
		else if (this.animations[_skill]?.disabled)
			_skill = 'idle';
		return _skill;
	}
	this.updateLeftAfterRun = function (_oldAnima, _newAnima) {
		if (!this.main || this.autoMode !== 2 || this.still)
			return;
		if (_oldAnima.key === 'run' || _oldAnima.key === 'walk') {
			if (newAnima.attack) {
				const _oldW = this.getCurrentFrame().spriteWidth;
				const _newW = this.animations.idle.frames[0].spriteWidth;
				if (_oldW > _newW) {
					const _diff = MathRound((_oldW - _newW) * this.ZOOM);
					if (this.direction === __right)
						this.left += _diff;
					else
						this.left -= _diff;
				}
			}
		}
	}
	this.lookAtAttacker = function() {
		const _dir = this.getKeyboardXMove();
		if(_dir) {
			if(this.direction !== _dir)
				this.direction = _dir;
			return;
		}
		const _la = this.attacker.ORIGINLEFT;
		const _lm = this.ORIGINLEFT;
		if(this.direction === __left && _la > _lm)
			this.direction = __right;
		else if(this.direction === __right && _lm > _la)
			this.direction = __left;
	}
	this.lookAtEnemy = function(_e) {
		const _la = _e.ORIGINLEFT;
		const _lm = this.ORIGINLEFT;
		if(this.direction === __left && _la > _lm)
			this.direction = __right;
		else if(this.direction === __right && _lm > _la)
			this.direction = __left;
	}
	this.randomAirCoords = function(anima , _rate) {
		const _coords = getRandomAirCoords();
		const _frames = anima.frames;
		const _len = _coords.length;
		_rate = _rate ? getRandomValue2(100, _rate * 110) / 100 : 1;
		const _xRate = _rate / 100;
		let j = 0;
		for(var i = 0; i < _len; i++){
			_frames[j].bottomGap = _coords[i] * _rate;
			if(_rate > 1)
				_frames[j].extraStepXRate = -_xRate * (j + 1);
			else
				delete _frames[j].extraStepXRate;
			j++;
		}
		for(var i = _len - 1; i >= 0; i--){
			_frames[j].bottomGap = _coords[i] * _rate;
			if(_rate > 1)
				_frames[j].extraStepXRate = -_xRate * (j + 1);
			else
				delete _frames[j].extraStepXRate;
			j++;
		}
	}
	this.animate = function (_skill, _force, _dontResetFrame, num) {
		if(this.puppetMode && _skill === 'walk')
			_skill = 'run';
		_skill = this.modifySkill(_skill);
		this.organizeRelatedObjects(_skill);
		let oldAnima = this.animations[this.animation];
		if(!oldAnima)
			oldAnima = this.animations.idle ?? this.animations[Object.keys(this.animations)[0]];
		let _sk = this.animations[_skill];
		if (!_force) {
			try {
				if ((_sk.coolDownLeft > 0 && !_sk.charge) || _sk.charge <= 0) {
					if(_sk.before && _skill !== this.animation &&
						!this.skills[_sk.before]?.locked
					) {
						const _osk = _skill;
						_skill = _sk.before;
						_sk = this.animations[_skill];
						if (_sk.coolDownLeft > 0) {
							if (this.main && _osk !== this.animation) {
								//console.log(_skill + ' - ' + this.id + ' - 1');
								//warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
							}
							return undefined;
						}
					}
					else {
						if (this.main && _skill !== this.animation) {
							//console.log(_skill + ' - ' + this.id + ' - 2');
							//warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
						}
						return undefined;
					}
				}
			}
			catch (_ex) {
				console.log('HATA:' + _ex.message + ' ' + _skill +  ' ' + this.id);
				if(this.animationFinished || oldAnima.imediateBreak) {
					_skill = 'idle';
					_sk = this.animations[_skill];
				}
				else
					return true;
			}
			if (_sk?.finishingMove || _skill === 'finish') {
				if (!this.target && !oldAnima.finishingMove && !this.isInFinishingMove()) {
					if (this.main)
						warn('<span>' + getLangData('Target not available') + '</span>', 'warn');
					return undefined;
				}
			}
			if (_sk?.ultimate && (this.rageCount ?? 0) < this.getMaxRageCount()) {
				if (this.main)
					warn('<span>' + getLangData('Not enough rage') + '</span>', 'warn');
				return undefined;
			}
			if (_sk?.ultimate && this.ultimate) {
				if (this.main)
					warn('<span>' + getLangData('Skill is already active') + '</span>', 'warn');
				return undefined;
			}
			if ((this.animation === _skill || _skill === oldAnima.baseKey) && oldAnima.hold && !this.animationFinished)
				return oldAnima;
			if ((this.animation === _skill || _skill === oldAnima.baseKey || (this.animationFinished && oldAnima.next)) && (this.animationFinished || oldAnima.imediateBreak))
				if (oldAnima.next)
					_skill = this.modifySkill(this.getNextSkill(oldAnima.next));
			if (_skill === 'roll' && !this.moveDirection && this.animations.dash) {
				if(!this.getKeyboardXMove())
					_skill = 'dash';
			}
		}
		this.updateLeftAfterRun(oldAnima, _sk);
		if(_skill.startsWith('counter') && this.attacker)
			this.lookAtAttacker();
		if(_skill === 'idle' && this.autoTarget && (this.animation === 'run' || this.animation === 'walk')) {
			const _fr = this.getCurrentFrame();
			const _frn = this.animations?.[_skill]?.frames?.[0];
			if(_fr && _frn) {
				const _diff = (_fr.spriteWidth - _fr.spriteOrigin) -
				(_frn.spriteWidth - _frn.spriteOrigin);
				if(_diff > 0) {
					if(this.direction === __left)
						this.left -= MathCeil(_diff * this.ZOOM);
					else
						this.left += MathCeil(_diff * this.ZOOM);
				}
			}
		}
		this.chargeProperties = this.charging = undefined;
		this.animation = _skill;
		let anima = this.animations[this.animation];
		if(anima?.swapBeforeStart)
			this.swapAnimation(this.animation);
		if(anima?.attack){
			if(!this.autoAttacking)
				this.autoAttacking = true;
			if(this.lastAttackTime && this.class !== __spell)
				this.lastAttackTime = undefined;
		}
		//this.upcomingAnimation = undefined; //YENİ
		if (!anima) {
			if(!this.phased && _skill === 'dead')
				this.setHealth(this.MAXHP, null, null, 7);
			_skill = 'idle';
			this.animation = _skill;
			anima = this.animations[this.animation];
			if(!anima)
				return undefined;
		}
		else if((this.randomizeAirCoords || this.airFlow) && this.animation?.startsWith('hurtair')) {
			this.randomAirCoords(anima, this.airFlow);
			if(this.airFlow)
				delete this.airFlow;
		}
		else if(this.skinable && this.animation.startsWith('dead'))  {
			const _i = anima.frames.findIndex(x => x.alpha);
			if(_i > 0)
			{
				anima.frames[_i - 1].props = {
					canSkin: true,
					npc: this.npcKey
				};
				anima.frames[_i - 1].speed = 6000;
				anima.frames[_i - 1].do = function(_th) {
					if(!_th.canSkin) {
						_th.canSkin = true;
						_th.npc = _th.npcKey;
					}
					episode.NPCS = episode.enemies.filter(x => x.npc);
				};
				anima.frames[_i - 1].border = '#ffbc34';
				anima.frames[_i].props = {
					canSkin: false,
					npc: false
				};
			}
		}
		if(this.animation === 'deadfly') {
			if(this.pushingBy || this.attacker)
				this.direction = (this.pushingBy ?? this.attacker).direction === __left ? __right: __left;
			else if(this.pushDirection)
				this.direction = this.pushDirection === __left ? __right: __left;
			this.pushDirection = this.pushingBy = this.pushback = this.knockbacking = this.pushRate = undefined;
			const _frames = anima.frames;
			const _rand = getRandomValue2(35, 85) / 100;
			for(let _frame of _frames)
				if(_frame.extraStepXRate)
					_frame.extraStepXRate -= _rand;
		}
		if(anima.attack && anima.totalRange === undefined)
			this.getSkillRange(anima);
		if(this.main)
			this.animationChanged = true;
		if (this.crossEnemyAnimation && this.crossEnemyAnimation !== _skill)
			this.crossEnemyAnimation = undefined;
		if (oldAnima?.next === 'dead') {
			this.immobilize = true;
			if(!episode?.fatality)
				this.dead = true;
			if (this.relatedObjects)
				this.relatedObjects.length = 0;
			this.removeBuffs();
			if (_skill !== 'dead')
				anima.next = 'dead';
		}
		if(oldAnima?.sound?.stop){
			oldAnima.sound.stop();
			delete oldAnima.sound;
		}
		this.extraStepYRate = this.extraStepXRate = 0;
		if(!_dontResetFrame && !(oldAnima?.key === 'idle' && anima.key === 'idle'))
			this.start = this.frame = 0;
		this.animationFinished = this.iframe = false;
		const _a = anima.chargeKey ? this.animations[anima.chargeKey] : anima;
		if(_a.chainOrder)
			this.pushDirection = this.pushingBy = this.pushback = this.knockbacking = this.pushRate = undefined;
		this.startCooldown(_a);
		if (!anima.hold)
			if (this.keyboard)
				this.keyboard.removeSkill?.(_skill);
		if(anima.maxRepeat)
			anima.repeat = anima.maxRepeat;
		if (!anima.hurt){
			this.attacker = undefined;
			if(this.main && __story.startTime && !episode.endTime && anima.attack && anima.coolDownLeft > 0)
			{
				if(!episode.usedSkill)
					episode.usedSkill = 1;
			}
		}
		if (!anima.interactive)
			this.attackingOnlyBy = undefined;
		if (anima.finishingMove && !this.isInFinishingMove()) {
			const _finishTarget = episode.enemies.find(x => x.targeted);
			if (_finishTarget && !_finishTarget.getCurrentAnimation().interactive && !_finishTarget.isDead() && this.animation.startsWith('finish')) {
				//this.animation = 'finish' + getRandomValue(1, i);
				this.finishTarget = _finishTarget;
				if (!this.finishTarget.dying) {
					const _fr = this.finishTarget.getCurrentFrame();
					const _isLaying = _fr?.lay;
					if(this.animation !== 'hurtair' && !_isLaying) {
						this.finishTarget.animate('idle', 1, null, 5);
						this.finishTarget.idle.imediateBreak = false;
					}
					else if(_isLaying)
						_fr.speed = 999;
					this.finishTarget.iframe = this.finishTarget.hurting =
						this.finishTarget.targeted = false;
					this.finishTarget.immobilize = this.finishTarget.interactive = true;
					this.finishTarget.autoMode = this.finishTarget.hitTakenCount = 0;
					this.yPosition = this.finishTarget.yPosition;
					this.finishTarget.finishingFrom = this.direction;
					this.finishTarget.removeBuffs();
					this.finishTarget.finishingBy = this.finishTarget.attackingOnlyBy = this.key;
					if (this.main) {
						let _ts = 0;
						if(this.finishingMoveVisible)
							addClass(_finishingMove, 'v-none');
						anima.frames.forEach(x => _ts += x.speed);
						this.finishTarget.addObject({ key: 'zoom', position: 'css', p1: 1.5, p2: _ts * (900 / fps) });
					}
				}
			}
			else if(!_finishTarget?.readyForFatality) {
				this.animation = 'idle';
				anima = this.getCurrentAnimation();
				if(!anima)
					return undefined;
			}
		}
		if(anima.do)
			anima.do(this);
		return anima;
	}
	this.throwClosestEnemies = function(_attacker) {

	}
	this.calculateMoveXStep = function() {
		if(this.puppetMode)
			return this.puppetXMove ?? 1;
		let _rate = ((((this.autoMode === undefined) || this.friendly || this.alp || (this.autoMode > 0 && this.autoTarget))) ? this.getStepXRate() : (this.getStepXRate() / 2)) * (this.defaultDirection === __left ? -1 : 1);
		if ((this.autoMode === 2 && !this.alp) && _rate && ((_gameTick - this.lastStepChosen) > 1000)) {
			this.lastStepChosen = _gameTick;
			this.lastStepRate = getRandomValue(85, 115) / 100;
			return this.lastStepRate;
		}
		return (_gameTick - this.lastStepChosen) > 1000 ? _rate : this.lastStepRate ?? _rate;
	}
	this.run = function (_anima, _move, _includeY, _order) {
		if(!this.animations.run || this.still) {
			this.idle();
			return;
		}
		this.organizeRelatedObjects('run');
		if(this.puppetMode && !_move)
			_move = this.moveDirection;
		const _xMove = (this.autoMode >= 0 || this.puppetMode) ? _move : this.getKeyboardXMove();
		if (_xMove) {
			if ((this.direction === __left && _xMove === __right) ||
				(this.direction === __right && _xMove === __left))
				this.start = this.frame = 0;
			this.setDirection(_xMove, 1);
			if(!_includeY)
				this.moveDirection = _xMove;
			else
				this.moveDirection = _includeY;
			this.extraStepXRate = this.calculateMoveXStep();
		}
		const _yMove = this.autoMode ? false : this.getKeyboardYMove();
		if (_yMove)
			this.moveDirection = _yMove;
		if (_anima?.key === 'run' && !this.animationFinished)
			return;
		if (this.getCurrentFrame()?.still)
			return;
		this.extraStepYRate = this.start = this.frame = 0;
		this.animation = 'run';
		this.animationFinished = false;
		if(this.main)
			this.animationChanged = true;
	}
	this.getNextSkill = function (_next) {
		if (!_next)
			return _next;
		const _arr = _next.split(',');
		const _skill = _arr[getRandomValue(0, _arr.length - 1)];
		return _skill;
	}
	this.idle = function (_s) {
		let _key = 'idle';
		if (!this.animations.idle)
			_key = this.defaultAnimationKey;
		this.organizeRelatedObjects(_key);
		//this.attacker = undefined;
		//episode?.enemies?.filter(x => x.attacker == this)?.forEach(x => x.attacker = undefined);
		if (this.animation !== _key){
			if(_key === 'idle' && this.animations.idle.alternateFrames)
				this.swapAnimation(_key);
			this.extraStepYRate = this.extraStepXRate = this.start = this.frame = 0;
		}
		if(this.main && this.animation !== _key)
			this.animationChanged = true;
		if(this.autoTarget && (this.animation === 'run' || this.animation === 'walk')) {
			const _fr = this.getCurrentFrame();
			const _frn = this.animations[_key].frames[0];
			const _diff = (_fr.spriteWidth - _fr.spriteOrigin) -
			(_frn.spriteWidth - _frn.spriteOrigin);
			if(_diff > 0) {
				if(this.direction === __left)
					this.left -= MathCeil(_diff * this.ZOOM);
				else
					this.left += MathCeil(_diff * this.ZOOM);
			}
		}
		this.animation = _key;
		if (this.crossEnemyAnimation && this.crossEnemyAnimation !== this.animation)
			this.crossEnemyAnimation = undefined;
		let _xMove;
		if (!this.autoMode)
			_xMove = this.getKeyboardXMove();
		this.moveDirection = _xMove;
		this.animationFinished = this.iframe = false;
		this.hurting = undefined;
	}
	this.getKeyboardXMove = function() {
		if(this.keyboard)
			return  this.keyboard?.getXMove?.()?.name;
		return this.rivalXMove;
	}
	this.getKeyboardYMove = function() {
		if(this.keyboard)
			return  this.keyboard?.getYMove?.()?.name;
		return this.rivalYMove;
	}
	this.decreaseHealth = function (_dmg, _attacker, _force) {
		if(episode.realTime && this.main && !_force)
			return;
		let _hpLeft = this.health - MathAbs(_dmg);
		let _realHP = _hpLeft;
		_hpLeft = parseFloat(parseFloat(_hpLeft).toFixed(1));
		this.hpDropped = _gameTick;
		this.setHealth(_hpLeft, _realHP, _attacker, 5);
	}
	this.checkHitCount = function() {
		if(this.countHit) {
			if(!(this.lastHitDate > (_gameTick - 200)) && this.hitCount > 1) {
				delete this.countHit;
				addClass(_hitCount, 'squash');
				// for (var _v of _hitCountValues)
				// 	if(_v.innerText !== this.hitCount.toString())
				// 		_v.innerText = this.hitCount;
				let _hcs = this.hitCount > 999 ? '999+' : this.hitCount.toString();
				const _limit = _hitCountValues.length, _len = _hcs.length;
				let j = 0, d;
				for(let i = 0; i < _limit; i++)
				{
					const _img = _hitCountValues[i];
					const dd = _img.getAttribute('data-digit');
					if(_len < (_limit - i)){
						if(dd !== 'x')
							_img.setAttribute('data-digit', 'x');
					}
					else {
						d = _hcs[j];
						if(d === '+')
							d = 'plus';
						if(dd !== d)
							_img.setAttribute('data-digit', d);
						j++;
					}
				}
				this.lastHitDate = _gameTick;
			}
		}
		else if(!this.hitCount)
			if(episode && episode.bgMusic){
				if(!episode.bgMusic.volumeDown)
					episode.bgMusic.volumeDown = 1;
				episode.resetBgMusicVolume();
			}
	}
	this.increaseHitCount = function () {
		if (!this.main)
			return;
		this.hitCount++;
		if (this.hitCount > 1) {
			removeClass(_hitCount, 'v-none');
			removeClass(_hitCount, 'squash');
			if(this.hitCount > 9)
				episode.setBgMusicVolume((episode.bgMusicVolume ?? .1) + (MathFloor(this.hitCount / 10) / 100));
			this.countHit = 1;
		}
		if(episode.hitCount < this.hitCount)
			episode.hitCount = this.hitCount;
	}
	this.increaseHealth = function (_val) {
		_val = this.health + _val;
		const _maxHP = this.MAXHP;
		if (_val > _maxHP)
			_val = _maxHP;
		this.setHealth(_val, null, null, 1);
	}
	this.setHealth = function (_val, _realHP, _attacker, num) {
		if (_val <= 0) {
			if (this.gradeLeft > 0) {
				const _whole = (this.MAXHP * this.gradeLeft) + _val;
				const _g = parseInt(_whole / this.MAXHP);
				if(_g <= 0)
					this.gradeLeft = 0;
				else
					this.gradeLeft = _g;
				if(_whole <= 0)
					_realHP = _val = 0;
				else {
					_realHP = (_whole % this.MAXHP);
					if(_realHP === 0) {
						if(this.gradeLeft > 0) {
							this.gradeLeft--;
							_realHP = _val = this.MAXHP;
						}
					}
					else
						_val = _realHP;
				}
				this.health = _realHP;
				if(!this.healthBarElem)
					this.healthBarElem = document.getElementById('hb-' + this.key);
				if(this.healthBarElem) {
					if(this.class === 'boss')
						this.healthBarElem.querySelector('#boss-grade-count').innerText =
						(this.gradeLeft < 1 ? '' : 'x' + (this.gradeLeft + 1));
					if (this.gradeLeft > 0)
						this.healthBarElem.style.background = getGradeBGColor(this.gradeLeft + 1);
					else
						this.healthBarElem.style.background = 'linear-gradient(180deg, #fff, #00000020)';
					const hbInner = this.healthBarElem.querySelector('.health-bar-tiny-inner');
					if (this.gradeLeft > 0) {
						let _color = this.grade < 2 ? '#008000' : getGradeBGColor((this.gradeLeft ?? 0) + 2);
						hbInner.style.background = this.class === 'boss' ? _color : 'linear-gradient(180deg, ' + _color + '80, ' + _color + ', ' + _color + ', ' + _color + '80)';
					}
				}
			}
			else
				_val = _realHP = 0;
		}
		if (!_realHP)
			_realHP = _val;
		const _maxHP = this.MAXHP;
		if(_val > _maxHP)
			_val = _maxHP;
		if (_val >= 0 && _val <= _maxHP) {
			_val = parseFloat(parseFloat(_val).toFixed(1));
			if (!this.enemy || episode.pvp) {
				try {
					const _bars = this.hbBars ?? document.querySelectorAll('#char-' + this.key + ' .healthvalue');
					for (var _bar of _bars)
						_bar.style.transform = 'scaleX(' + (_realHP / _maxHP) + ')';
					if(!this.hbBars)
						this.hbBars = _bars;
				}
				catch (ex) { }
			}
			// if (_realHP !== this.health && this.dmgTaken) {
			// 	const _mDiff = { h: _realHP, sy: 1 };
			// 	this.setDefaultMessage(_mDiff);
			// 	sendMessage(JSON.stringify(_mDiff));
			// }
			this.health = _realHP;
			// if(this.main && this.health <= 0 && this.heartCount > 0)
			// 	this.standUp();
			if (_attacker && this.health <= 0)
				this.killedBy = (_attacker.parent ?? _attacker.owner ?? _attacker.related ?? _attacker)?.key; //allah ne verdiyse gönder
			if (this.friendly && !episode.pvp) {
				const _aidBtn = document.getElementById('aid-' + this.key);
				if (_aidBtn) {
					if (this.health <= 0 || this.health >= _maxHP)
						addClass(_aidBtn, 'v-none');
					else
						removeClass(_aidBtn, 'v-none');
				}
			}
			if (this.main && ((this.health * 5) < _maxHP) && this.health > 0){
				const _lmstv = this.getTalentPoint('passive-lms');
				if(_lmstv > 0)
					this.addBuff({ key: 'last', level: _lmstv });
			}
				// if (!this.lms) {
				// 	this.lms = true;
				// 	this.addBuff({ key: 'last', level: 2 });
				// }
		}
		if (this.main || this.friendly)
			_client.setHP(this);
		else if(!this.skipHealthBar){
			const _hpRate = (this.health / _maxHP) * 100;
			this.healthRate = _hpRate;
		}
		if(this.health <= 0 && !this.gradeLeft) {
			if(this.ultimate)
				this.ultimate = false;
			this.removeBuffs();
			episode.drawBuffs(this);
		}
		// if(this.main && episode.resultStars && (this.health * 2) < _maxHP)
		// 	episode.resultStars[2].failed = 1;
	}
	this.decreaseFatique = function (_attacker, _rate) {
		const _r = _rate ?? 1;
		const _dec = MathRound(fatiqueDecreasement * (_r < 1 ? 1 : _r));
		if (this.fatique < _dec){
			PlaySound({ key: 'blockbreak2' });
			this.addObject({key:'bloodhit', position:'middle'});
			return false;
		}
		this.fatique -= _dec;
		this.lastFatiqueDecreaseTime = _gameTick;
		_client.setFatique(this);
		const _bar = document.querySelector('#char-' + this.key + ' .defbar-value');
		if(_bar)
			_bar.style.transform = 'scaleX(' + (this.fatique / this.maxFatique) + ')';
		PlaySound({ owner: _attacker, key: this.class + 'block' }, 'block');
		const _gap = MathRound(this.getCurrentFrame().spriteWidth / 2);
		if(_r < 1)
			this.addObject({key:'sparkblocksmall', position: 'middle', xGap: -_gap});
		else if(_r < 2)
			this.addObject({key:'sparkblockmedium', position: 'middle', xGap: -_gap});
		else
			this.addObject({key:'sparkblockbig', position: 'middle', xGap: -_gap});
		if(this.animations.hurtblock && this.animation !== 'hurtblock'){
			this.animate('hurtblock', 1);
			alert(1);
		}
		return true;
	}
	this.increaseFatique = function (_val) {
		this.fatique += _val ?? fatiqueDecreasement;
		if (this.fatique > this.maxFatique)
			this.fatique = this.maxFatique;
		if (!this.enemy) {
			try {
				const _bar = document.querySelector('#char-' + this.key + ' .defbar-value');
				_bar.style.transform = 'scaleX(' + (this.fatique / this.maxFatique) + ')';
			}
			catch (ex) { }
			_client.setFatique(this);
		}
	}
	this.startCooldown = function (_skill, _continueCooldown, _atStart) {
		if(_skill.beforeOrder)
			_skill.cooldown = this.animations[_skill.before].coolDownLeft;
		if (!_skill.cooldown)// || episode.lobby)
			return true;
		if (!_continueCooldown && ((_skill.coolDownLeft > 0 && !_skill.charge) || _skill.charge === 0)) {
			//if (this.main && !_atStart)
				//warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
			return false;
		}
		let _elem, alreadyInCd = false, _cd = parseInt(_skill.cooldown);
		if (_skill.key === 'roll')
			_cd = this.checkRollCooldown(_cd);
		if (this.main)
			_elem = _skill.chainOrder ? document.getElementById('chain-skill-' + _skill.chainOrder) :
				document.getElementById('skill' + (_skill.order ?? _skill.skillOrder));
		if ((_skill.order || _skill.skillOrder) && _skill.maxCharge) {
			if (_skill.charge === undefined)
				_skill.charge = _skill.maxCharge;
			if (this.main)
				addClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder) + '-cd-' + _skill.charge), 'passive-charge');
			alreadyInCd = _skill.charge < _skill.maxCharge;
			if (_skill.charge > 0)
				_skill.charge--;
		}
		if (!alreadyInCd && _elem && this.main) {
			const _oldCounter = _elem.getElementsByClassName('counter')?.[0];
			if (_oldCounter)
				_oldCounter.remove();
			_elem.innerHTML += '<div class="counter flex">' + MathFloor((_skill.coolDownLeft > 0 ?  _skill.coolDownLeft : _cd) / 1000) + '</div>';
		}
		if (alreadyInCd)
			return true;
		if (!_skill.coolDownStart2) {
			//_skill.coolDownStart = msNow;
			_skill.coolDownStart2 = _gameTick;
			_skill.coolDownLeft = _cd;
			if(_skill.reset)
				return resetSkill(_skill.before ?? _skill.key, this, 1);
		}
		return true;
	}
	this.getSkillRate = function() {
		var _props = skill.getSkillByKey(this.class, this.animation, null, 1)?.props;
		var _level = this.skills?.[this.animation]?.level ?? 1;
		return ((_props?.find(x => x.level === _level)?.value ?? 0) / 100) + 1;
	}
	this.checkSkills = function () {
		if((this.skillsChecked > (_gameTick - (this.main ? 200 : 1000))))
			return;
		if (_game.suspended) {
			for (const _anima of Object.keys(this.animations)) {
				if (this.animations[_anima].coolDownLeft > 0)
					this.animations[_anima].coolDownStart2 = _gameTick;
			}
			return;
		}
		for (const key in this.animations) {
			const _skill = this.animations[key];
			const _hasCD = _skill.coolDownLeft > 0;
			if(_hasCD && _skill.delay && !_skill.coolDownStart2)
				_skill.coolDownStart2 = _gameTick;
			if(_hasCD && !_skill.coolDownStart2)
				delete _skill.coolDownLeft;
			if (_skill.coolDownStart2 && ((_gameTick - _skill.coolDownStart2) > 1000)) {
				const _diff = (_gameTick - _skill.coolDownStart2) - ((_gameTick - _skill.coolDownStart2) % 1000);
				_skill.coolDownLeft -= _diff;
				_skill.coolDownStart2 += _diff;
				let _elem = this.main ? (_skill.chainOrder ? document.getElementById('chain-skill-' + _skill.chainOrder) :
					document.getElementById('skill' + (_skill.order ?? _skill.skillOrder))) : undefined;
				const counter = _elem ? _elem.querySelector('.counter') : undefined;
				if (counter && !counter.noText && _skill.coolDownLeft > 299) {
					const _currentCD = MathFloor(_skill.coolDownLeft / 1000);
					if (_skill.cooldownCounter !== _currentCD){
						counter.innerText = _currentCD;
						_skill.cooldownCounter = _currentCD;
					}
				}
				else if (counter && !counter.noText) {
					counter.noText = true;
					counter.innerText = '0';
					_skill.cooldownCounter = 0;
					if (_skill.maxCharge)
						counter.noText = false;
					else
						addClass(counter, 'fadeOut');
				}
				if ((_skill.coolDownLeft ?? 0) <= 0) {
					if (_skill.maxCharge) {
						_skill.charge++;
						removeClass(document.getElementById('skill' + (_skill.order ?? _skill.skillOrder) + '-cd-' + _skill.charge), 'passive-charge');
						if (_skill.charge < _skill.maxCharge) {
							let _cool = parseInt(_skill.cooldown);
							if (this.main && _skill.key === 'roll')
								_cool = this.checkRollCooldown(_cool);
							_skill.coolDownLeft = _cool;
							continue;
						}
					}
					if (counter)
						counter.remove();
					//_skill.coolDownStart =
					_skill.coolDownLeft = undefined;
					delete _skill.coolDownStart2;
				}
			}
			if(_skill.before && !_skill.beforeOrder &&
				(_skill.coolDownLeft <= 1000) //&& _hasCD
				&& ((_skill.coolDownStart2 > 0) && ((_gameTick - _skill.coolDownStart2 >= 600)))){
				resetSkill(_skill.key, this, 2);
			}
		}
		this.skillsChecked = _gameTick;
	}
	this.calculatePVPScore = function () {
		const _dps = this.dmgGiven * (1 + (this.killCount ?? 0) + (this.isDead() ? 0 : 1));
		return !isNaN(_dps) ? _dps : 0;
	}
	this.disableSkill = function(_k) {
		const _keys = Object.keys(this.animations);
		for(const _key of _keys)
			if(_key === _k) {
				const _anima = this.animations[_key];
				_anima.disabled = true;
			}
		resetSkills(null, null, this, _k);
	}
	this.disableSkills = function(_keepUI) {
		const _keys = Object.keys(this.animations);
		for(const _key of _keys) {
			const _anima = this.animations[_key];
			if(_anima.order || _anima.ultimate || _anima.chainOrder || _anima.beforeOrder || _anima.skillOrder){
				if(_anima.disabled)
					_anima.alreadyDisabled = 1;
				else
					_anima.disabled = true;
			}
		}
		if(_keepUI)
			return;
		if(this.main)
			this.disableSkillUI();
		resetSkills(null, null, this);
	}
	this.disableSkillUI = function() {
		_gameUI.querySelectorAll('.skill:not(.action), .skill-charge').forEach(x => addClass(x, 'disabled-skill'));
	}
	this.enableSkill = function(_k) {
		const _keys = Object.keys(this.animations);
		for(const _key of _keys)
			if(_key === _k) {
				const _anima = this.animations[_key];
				delete _anima.disabled;
			}
		resetSkills(null, null, this, _k);
	}
	this.enableSkills = function() {
		const _keys = Object.keys(this.animations);
		for(const _key of _keys) {
			const _anima = this.animations[_key];
			if(!_anima.alreadyDisabled && (_anima.order || _anima.ultimate || _anima.chainOrder || _anima.beforeOrder || _anima.skillOrder))
			{
				if(!this.skills?.[_anima.key]?.locked)
					delete _anima.disabled;
			}
		}
		if(this.main)
			this.enableSkillUI();
		resetSkills(null, null, this);
	}
	this.enableSkillUI = function() {
		_gameUI.querySelectorAll('.skill:not(.action), .skill-charge').forEach(x => removeClass(x, 'disabled-skill'));
	}
	this.checkRollCooldown = function (_cd) {
		const _level = this.skills?.['roll']?.level;
		if (_level)
			return _cd * (1 - ((skill.getSkillByKey(this.class, 'roll', skill.passiveSkills).increment * _level) / 100));
		return _cd;
	}
	if (this.animations.before)
		this.animate('before');
	else {
		this.idle(1);
		if(this.class !== __spell && (this.class !== 'object' || _e.randomStartFrame) && _e.randomStartFrame !== false && this.animations?.idle?.frames?.length > 0)
		{
			this.frame = getRandomValue2(0, this.animations.idle.frames.length - 1);
		}
	}
	this.groundHurtKeys = [];
	this.airHurtKeys = [];
	this.attackKeys = [];
	this.hasChain = false;
	this.acceptChanges = function(){
		this.groundHurtKeys.length = this.airHurtKeys.length = this.attackKeys.length = 0;
		if(!this.main && this.animations.block)
		{
			if(this.animations.block.imediateBreak)
				delete this.animations.block.imediateBreak;
			const _blockFrames = this.animations.block.frames;
			let _totalFrameSpeed = 0;
			for(let _f of _blockFrames)
				_totalFrameSpeed += _f.speed;
			if(_totalFrameSpeed < 8)
				_blockFrames[_blockFrames.length - 1].speed += (8 - _totalFrameSpeed);
		}
		this._animationKeys = Object.keys(this.animations);
		let i = 1;
		for(var _ak of this._animationKeys) {
			const _aks = this.animations[_ak];
			_aks.id = i;
			i++;
			if(_aks.finishingMove && _aks.maxRange && (this.maxFinishingMoveRange ?? 30) < _aks.maxRange)
				this.maxFinishingMoveRange = _aks.maxRange;
			const _addSuperArmor = (this.alp) && _aks.attack;
			if(_ak === 'release')
			{
				const _lf = _aks.frames[_aks.frames.length - 1];
				const _bf = _lf.buffs?.find(y => y.key === 'release');
				if(_bf)
					_bf.level = 3;
				else
				{
					if(!_lf.buffs)
						_lf.buffs = [];
					_lf.buffs.push({key:'release', level: 3});
				}
			}
			else if(_ak.startsWith('hurtground'))
				this.groundHurtKeys.push(_ak);
			else if(_ak.startsWith('knockback'))
				_aks.frames.forEach(x => {
					const _blood = x.objects?.find(y => y.key === 'bloodfx8');
					if(_blood)
						_blood.key += (this.bloodColor ?? 'red');
				});
			else if(_ak.startsWith('hurtair'))
				this.airHurtKeys.push(_ak);
			else if(_aks.attack && !_aks.chain)
				this.attackKeys.push(_ak);
			if(!this.hasChain && _aks.chain)
				this.hasChain = 1;
			//else if(_aks.delay)
				//this.startCooldown(_aks);
			if(this.enemy && !this.alp && ((this.related?.class ?? this.class) !== 'boss') && _aks.priority)
				_aks.priority = 4;
			const changeValues = function(x) {
				if(_addSuperArmor && !x.def?.iframe)
				{
					if(!x.def)
						x.def = {};
					if((x.def.rate ?? 0) < .8)
						x.def.rate = .8;
				}
				if(x.atk && x.atk.type === 'lightning') {
					if(x.atk.hurt)
					{
						if(!x.atk.hurt.spells)
							x.atk.hurt.spells = [];
						if(!x.atk.hurt.spells.find(s => s.key === 'electricboltsmall')){
							x.atk.hurt.spells.push({
								key: 'electricboltsmall',
								reset: true
							});
							x.atk.hurt.spells.push({
								key: 'electricboltsmall',
								reversed: true,
								reset: true
							});
						}
					}
				}
				const _oldSpeed = x.speed;
				x.oldSpeed = x.speed = MathRound(x.speed / ((__globalMS / 20) - .16));
				if(x.extraStepXRate)
					x.oldExtraStepXRate = x.extraStepXRate = x.extraStepXRate * (_oldSpeed / x.speed);
				if(x.extraStepYRate)
					x.extraStepYRate = x.extraStepYRate * (_oldSpeed / x.speed);
			}
			if(!this.frameSpeedsSet){
				_aks.frames.forEach(x => {
					changeValues(x);
				});
				if(_aks.alternateFrames)
					_aks.alternateFrames.forEach(x => x.frames.forEach(y => { changeValues(y);}));
			}
			if(this.alp && _aks.chargeDistance) {
				const _pctv = this.getTalentValue('passive-charge');
				if(_pctv) {
					const _dist = _aks.chargeDistance;
					if(!_dist.startValue)
						_dist.startValue = _dist.value;
					_dist.value = _dist.startValue * ((_pctv + 100) / 100);
				}
			}
			if(_aks.delay && !_aks.disabled)
				this.startCooldown(_aks, null, 1);
		}
		this.frameSpeedsSet = 1;
	}
	this.acceptChanges();
	this.enterFinishedState = function(_victoryKey) {
		warn('<div class="flex heading achievement achievement-red" style="position:relative"><img style="height:12vh !important" src="./images/frames/fatality.png" /></div>', null, null, 1);
		const _t = this;
		PlaySound({key:'fatality', volume:1, end: function() {
			_t.animate(_victoryKey, 1);
			_t.animations.idle.after = function() {
				__storyPlaying = false;
				installStoryFinish();
				delete _t.animations.idle.after;
			}
		}});
		this.standBy();
	}
	this.enterFinishState = function(_attacker){
		if(!this.animations.hurtground1 || !_attacker)
			return;
		episode.fatality = true;
		this.stopRage();
		if(this.animations.hurtstun) {
			this.animations.hurtground1 = this.animations.hurtstun;
			this.animations.hurtground1.key = 'hurtground1';
		}
		this.animations.hurtground1.maxRepeat = 6;
		this.animations.hurtground1.next = 'dead';
		this.animations.hurtground1.interactive = true;
		this.attacker = _attacker;
		episode.respawners = [];
		_attacker.stopHeartBeatSound();
		_attacker.stopStepSound();
		_attacker.removeBuffs();
		this.removeBuffs();
		const _obj = this.animations.hurtground1.frames[0].objects ?? [];
		_obj.push({ key: 'stun', position: 'middle-head', yGap: -25 });
		warn('<div class="flex heading achievement achievement-red" style="position:relative"><img style="height:12vh !important" src="./images/icons/finish.png" /><div class="w-100 flex" style="text-shadow:0px 0px 4px #880808;color:#ffffffcc !important;font-size:3.4vh !important; font-weight:bold !important">' + getLangData('FINISH THIS') + '</div><div class="flex"><img class="flip-90" src="./images/icons/left-keyboard.png" style="height:40px !important;width:40px !important;margin:1vh !important" />+<img class="flip-270" src="./images/icons/left-keyboard.png" style="height:40px !important;width:40px !important;margin:1vh !important" />+<span style="margin:1vh">Attack</span></div></div>', null, 3000, 1, null, 1);
		this.animations.hurtground1.frames[0].objects = _obj;
		this.health = 1;
		this.readyForFatality = this.skipHealthBar = this.flying = true;
		this.dead = this.remove = this.dying = undefined;
		episode.pauseBgMusic(1);
		PlaySound({key:'finishhim', volume:1});
		episode.enemies.filter(x => x !== _attacker && x !== this)?.forEach(x => {
			if(x.class === __spell || x.health <= 0)
				x.remove = true;
			else {
				x.standBy();
				x.invulnerable = true;
			}
			x.stopSpawn();
		});
		this.animations.hurtground1.frames.forEach(x => delete x.def);
		this.animate('hurtground1', 1);
		_attacker.animate('idle', 1);
		if(_attacker.health <= 0)
			_attacker.health = 1;
		_attacker.invulnerable = true;
		_attacker.dead = _attacker.remove = _attacker.dying = undefined;
		_attacker.lookAtEnemy(this);
		_attacker.fatalityOnlyTarget = _attacker.onlyTarget = this.key;
	}
	this.equalizeHeights = function(_a){
		return;
		if(_a.frames)
		{
			const _max = _a.frames.map(x => x.spriteHeight).sort().reverse()[0];
			_a.frames.filter(x => x.spriteHeight < _max)?.forEach(x => {
				const  _diff  = _max - x.spriteHeight;
				x.spriteHeight  = _max;
				x.spriteTop -= _diff;
			});
		}
		if(_a.alternateFrames)
			for(let _item of _a.alternateFrames)
				if(_item.frames) {
					const _max = _item.frames.map(x => x.spriteHeight).sort().reverse()[0];
					_item.frames.filter(x => x.spriteHeight < _max)?.forEach(x => {
						const  _diff  = _max - x.spriteHeight;
						x.spriteHeight  = _max;
						x.spriteTop -= _diff;
					});
				}
	}
	if(this.animations.idle)
		this.equalizeHeights(this.animations.idle);
	if(_e.npc && _e.animations.idle.alternateFrames)
		this.swapAnimation('idle');
	if(_e.syncCanvas) {
		let _maxFront = 0;
		const _keys = this._animationKeys;
		for(let _key of _keys) {
			let _a = this.animations[_key];
			for(let _f of _a.frames ?? [])
				if((_f.spriteWidth - _f.spriteOrigin) > _maxFront)
					_maxFront = _f.spriteWidth - _f.spriteOrigin;
			for(let _f of _a.alternateFrames ?? [])
				if((_f.spriteWidth - _f.spriteOrigin) > _maxFront)
					_maxFront = _f.spriteWidth - _f.spriteOrigin;
		}
		if(_maxFront > 0)
			for(let _key of _keys) {
				let _a = this.animations[_key];
				for(let _f of _a.frames ?? [])
					_f.spriteWidth = _f.spriteOrigin + _maxFront;
				for(let _f of _a.alternateFrames ?? [])
					_f.spriteWidth = _f.spriteOrigin + _maxFront;
			}
	}
	if(this.finishableWith) {
		this.finishingMoves = this.finishableWith.split(',');
		if(this.finishingMoves.indexOf('feet') !== -1)
			this.installHurtFeet(this.getCurrentFrame());
	}
}