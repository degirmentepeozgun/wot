'use strict';
const __attackTolerance = 2;

function enemy(_e) {
	this.key = _e.key;
	this.id = _e.id;
	this.alp = _e.alp;
	this.frame = 0;
	this.start = 0;
	this.divider = getRandomValue2(1000, 9999);
	this.blocked = false;
	this.defaultAnimationKey = _e.defaultAnimationKey ?? 'idle';
	this.startAnimationKey = _e.startAnimationKey;
	this.defaultDirection = _e.defaultDirection ?? 'left';
	this.zoom = (_e.zoom ?? 1) * (episode.characterZoom ?? 1);
	this.harmless = _e.harmless;
	this.skills = _e.skills;
	this.still = _e.still;
	this.gender = _e.gender;
	this.finishableWith = _e.finishableWith;
	this.finishAfter = _e.finishAfter;
	this.moveDirection = undefined;
	this.experience = _e.experience ?? 500;
	this.healtbarGap = _e.healtbarGap;
	this.difficulty = _e.difficulty ?? __account.difficulty;
	this.phased = _e.phased;
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
	this.stepY = 1;
	this.color = _e.color;
	if(_e.bloodColor)
		this.bloodColor = _e.bloodColor;
	this.yGap = _e.yGap ?? 0;
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
	this.critDmg = _e.critDmg ?? 0;
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
	this.class = _e.class;
	this.skillClass = _e.skillClass;
	this.name = _e.name ?? _e.class;
	this.level = episode?.pvp ? 10 : (_e.level ?? 1);
	this.animation = this.defaultAnimationKey;
	this.invulnerable = _e.invulnerable;
	this.range = _e.range;
	this.grade = _e.grade ?? 1;
	this.related = _e.related;
	this.located = _e.located;
	this.weight = _e.weight;
	this.rageCount = 0;
	this.iceDmgRate = _e.iceDmgRate ?? 0;
	this.lightningDmgRate = _e.lightningDmgRate ?? 0;
	this.fireDmgRate = _e.fireDmgRate ?? 0;
	this.toxicDmgRate = _e.toxicDmgRate ?? 0;
	this.iceResistRate = _e.iceResistRate ?? 0;
	this.lightningResistRate = _e.lightningResistRate ?? 0;
	this.fireResistRate = _e.fireResistRate ?? 0;
	this.toxicResistRate = _e.toxicResistRate ?? 0;
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
	this.releaseAfter = _e.releaseAfter ?? 9;
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

	if (!this.still || _e.hasShadow) {
		if(_e.hasShadow !== false)
			this.shadow = JSON.parse(JSON.stringify(relatedObjects.find(x => x.id === 'shadow')));
	}
	this.getMaxRageCount = function() {
		return this.maxRageCount ?? __maxRageCount;
	}
	this.getCurrentAnimation = function () {
		return this.animations[this.animation];
	}
	this.getZoom = function () {
		return this.zoom * __zoom; // * (1 + ((getGroundHeight() - this.yPosition) / getGroundHeight()) * .25);
	}
	this.startZoom = this.getZoom();
	this.setAutoMode = function (_mode, _force) {
		var _am = this.autoMode;
		if((_am === undefined) && this.main && this.keyboard)
			_am = 0;
		if ((this.keyboard || this.receive || this.main) && !this.enemy) {
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
		return this.coopWith ? MathCeil(_atk / 4) : MathRound(_atk);
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
	this.getMaxHP = function () {
		const _char = this.coopWith ?? this;
		let _hp = _char.maxHP;
		if(_char.hpRate > 0)
			_hp *= ((100 + _char.hpRate) / 100);
		return this.coopWith ? MathCeil(_hp / 2) : MathRound(_hp);
	}
	this.isInFinishingMove = function () {
		return episode.enemies?.find(x => (x.killingBy == this.key) && !x.dead);
	}
	this.isDead = function () {
		return (this.health <= 0 || this.dying || this.dead) && (!this.ghost || episode.pvpEnded);
	}
	this.checkChainSkill = function (_frame) {
		if (!this.main)
			return;
		this.chains = _frame.chain;
		if (this.chains && !this.isDead()){
			if(!this.chainStatus) {
				for (let _c of this.chains) {
					const _chainCD = this.animations[_c.key]?.coolDownLeft;
					removeClass(chainSkills['skill' + _c.num], 'd-none');
					if (_chainCD >= 0 && this.animations[_c.key].coolDownStart) {
						chainSkills['skill' + _c.num].innerHTML =
							'<img draggable="false" ondragstart="return false;" src="./images/main/skill-icons/' + this.class + '/' + _c.key + '.png" /><div class="counter flex animate-me-1000">' + parseInt(_chainCD / 1000) + '</div>';
					}
					else 
						chainSkills['skill' + _c.num].innerHTML =
							'<img draggable="false" ondragstart="return false;" src="./images/main/skill-icons/' + this.class + '/' + _c.key + '.png" />';
				}
				this.chainStatus = 1;
			}
			else {
				for (let _c of this.chains) {
					const _chainCD = this.animations[_c.key]?.coolDownLeft;
					if (_chainCD >= 0 && this.animations[_c.key].coolDownStart) {
						const _cs = chainSkills['skill' + _c.num];
						if(!_cs.cdStart || (msNow - _cs.cdStart) > 1000) {
							_cs.cdStart = msNow; 
							let _csCounter = _cs.querySelector('.counter');
							if(!_csCounter){
								_csCounter = document.createElement('div');
								_csCounter.className = 'counter flex';
								_cs.appendChild(_csCounter);
							} 
							_csCounter.innerText = parseInt(_chainCD / 1000);
						}
					}
				}
			}
		}
		else {
			if(this.chainStatus === 1) {
				for (var i = 1; i < 5; i++)
					addClass(chainSkills['skill' + i], 'd-none');
				delete this.chainStatus;
			}
		}
	}
	this.getCurrentFrame = function () {
		return this.animations[this.animation]?.frames?.[this.frame];
	}
	this.pickRandomAttack = function (_noCD, _minRange, _reset) {
		if (this.animation === 'start' || this.animation === 'before' || this.noAttack)
			return;
		if(this.harmless && this.animations.idle)
		{
			this.upcomingAnimation = 'idle';
			return;
		}
		if (this.animations[this.lastAttack ?? this.animation].next) {
			this.upcomingAnimation = this.animations[this.lastAttack ?? this.animation].next;
			this.getSkillRange(this.animations[this.upcomingAnimation]);
		}
		const _enemies = episode.getAvailableEnemies(this)?.filter(x => x.health > 0 && !x.invulnerable);
		if (!_enemies?.[0]) {
			this.upcomingAnimation = 'idle';
			return;
		}
		if (this.upcomingAnimation && this.upcomingAnimation !== 'idle' && !_reset)
			return;
		const _theChar = this;
		const _keys = Object.keys(_theChar.animations).map(x => _theChar.animations[x]).sort(() => Math.random() - 0.5).sort(function(a, b) {
			if(a.cooldown > 0 && !b.cooldown)
				return 1;
			else if(a.cooldown > 0 && b.cooldown > 0)
				return 0;
			return -1;
		}).map(x => x.key);
		let _immunities;
		if (this.autoTarget && !this.autoTarget.isDead() && this.autoTarget.immunities)
			_immunities = this.autoTarget.immunities;
		let _chosenKey, _immuneKey, _useLastAttack;
		const _currentAnima = this.animations[this.animation];
		if(this.alp && _currentAnima.hurt) {
			const _frame = this.getCurrentFrame();
			if(_frame.chain?.[0]) {
				for(const _ch of _frame.chain) {
					const _chainAnima = this.animations[_ch.key];
					if(_chainAnima?.attack) {
						if(_chainAnima.totalRange === undefined)
							this.getSkillRange(_chainAnima);
						if(!(_chainAnima.coolDownLeft > 0) && (!_minRange || _minRange >= _chainAnima.totalRange))
							_chosenKey = _ch.key;
						break;
					}
				}
			}
		}
		if(!_chosenKey)
			for (var _key of _keys) {
				let _k = _key, _itIsOk;
				if(this.ultimate && !_k.endsWith('modified') && this.animations[_k + 'modified'] &&
					(this.animations[_k + 'modified']?.coolDownLeft > 0 ||
						this.skills?.[_k + 'modified']?.locked
					))
					continue;
				else if(this.skills?.[_k]?.locked)
					continue;
				let _anima = this.animations[_k];
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
				if (_minRange > 0) {
					if (_anima.totalRange > _minRange) {
						if(this.lastAttack && _k === this.lastAttack)
						{
							_useLastAttack = 1;
							continue;
						}
						_chosenKey = _k;
					}
				}
				else {
					if(this.lastAttack && _k === this.lastAttack)
					{
						_useLastAttack = 1;
						continue;
					}
					_chosenKey = _k;
				}
			}
		if(!_chosenKey && _useLastAttack && !_minRange)
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
			const _arr = (this.still ? this.animations.idle : this.animations.run).frames.map(x => x.spriteWidth - x.spriteOrigin);
			_arr.sort();
			this.maxRunRange = _arr[_arr.length - 1];
		}
		catch(e) {
			alert(e.key);
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
					xRangePX = (_frame.spriteWidth - _frame.spriteOrigin);
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
					}
					break;
				}
			}
			if (_anima.totalRange <= 0 && xRangePX > 0 && this.getMaxRunRange() < xRangePX)
				_anima.totalRange = MathFloor(((xRangePX - this.getMaxRunRange()) / _canvas.width) * 100);
			else if(_anima.chargeDistance && xRangePX > 0)
				_anima.normalRange = MathFloor(((xRangePX * this.getZoom()) / _canvas.width) * 100);
		}
	}
	this.pickNewTarget = function () {
		let _dir = this.direction;
		let _enemy = this.getClosestEnemy(10000, _dir, function (_e) {
			return !_e.invulnerable && !_e.isDead();
		}, 100);
		if (_enemy?.enemy) {
			this.setAutoTarget(_enemy.enemy);
			return;
		}
		_dir = _dir === 'left' ? 'right' : 'left';
		_enemy = this.getClosestEnemy(100, _dir, function (_e) {
			return !_e.invulnerable && !_e.isDead();
		}, 100);
		if (_enemy?.enemy) {
			this.setAutoTarget(_enemy.enemy);
			this.direction = this.moveDirection = _dir;
			this.turned = true;
		}
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
	this.autoCommand = function () {
		if (this.keyboard || this.harmless)
			return;
		if(!this.animationFinished && this.animations[this.animation]?.attack)
			return;
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
		if (!this.animations[this.animation]?.hurt)
			this.lastAttack = undefined;
		if (this.action?.command === 'move') {
			if (this.getLeft() > this.action.command.to)
				this.direction = 'left';
			else if (this.getLeft() > this.action.command.to)
				this.direction = 'right';
			this.moveDirection = this.direction;
			this.autoAttacking = false;
			this.run(this.getCurrentAnimation(), this.direction);
			return;
		}
		if (this.friendly && (!episode.pvp || episode.hasEnemyAlive(this)) && !this.still && !this.isDead() && !episode.enemies?.
		find(x => x.enemy && !x.invulnerable && !x.remove && !x.isDead() && x.autoTarget && x.autoMode > 0)) {
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
		if ((_anima.hurt && !this.hasChain && !this.animationFinished) || this.animation === 'release' || this.dying || this.dead || this.immobilize) {
			this.autoAttacking = false;
			return;
		}
		let _hurtingFinished;
		if (_anima.hurt && this.animationFinished)
			this.upcomingAnimation = _hurtingFinished = 'idle';
		let _dir = this.direction;
		if (this.autoAttacking) {
			if(this.autoTarget) {
				if(!this.chargimg && this.getCurrentFrame()?.directionChangeEnabled && this.start === 1) {
					const _diff = this.autoTarget.getExactLeft() - this.getExactLeft();
					const _tol = (4 * _canvas.width) / 100;
					if (_diff > _tol)
						_dir = 'right';
					else if (_diff < -_tol)
						_dir = 'left';
					if(this.direction !== _dir)
						this.direction = _dir;
				}
			}
			return;
		}
		else 
			this.upcomingAnimation = undefined;
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
				}, _newAnima.yRange, __attackTolerance);
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
					this.setAutoTarget(_enemy.enemy);
				_newAnima.useExtraStepXRate = _charge;
				if (this.animation !== 'before')
					if (this.animateAutoAnimation(1, _isEnemyClose, 1)) {
						if (this.animation === 'run')
							this.idle(96);
						return;
					}
			}
		}
		//EĞER ATAK Yapmıyorsa, ölmediyse, release olmuyorsa vs ve skill atacağı veya vuracağı mesafede
		//düşman yoksa buraya gelir
		//Burada hedefinde düşman varsa düşman seçilir yoksa görüş alanında düşman var mı diye bakılır y 100 alınır 
		const _sight = (!this.dmgTaken || this.friendly || episode.pvp) && this.sight ? this.sight : (this.dmgTaken ? 100 : MathCeil(_canvas.width / (this.sight ?? 100)) ?? 100);
		if (!_enemy?.enemy)
			_enemy = this.autoTarget ? {
				enemy: this.autoTarget
			} : this.getClosestEnemy(_sight, _dir, function (_e) {
				return !_e.invulnerable && !_e.isDead();;
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
			const _r = !_t.touch ? MathFloor((_t.originDiff * 100) / _canvas.width) : 0;
			//hedef ile aramızda belli bir mesafe varsa o mesafeye göre skill seç
			if (_r > 0)
				this.pickRandomAttack(null, _r, 1);
			//eğer çok yakınsak close değişkenine değer at
			_isEnemyClose = _t.touch;
			//}
			//x eksemimdeki farka bakıp yönünü değiştir
			const _diff = _enemy.enemy.getExactLeft() - this.getExactLeft();
			const _tol = (4 * _canvas.width) / 100; //this.animationFinished ? 0 : (4 * _canvas.width) / 100;
			if (_diff > _tol)
				_dir = 'right';
			else if (_diff < -_tol)
				_dir = 'left';
		}
		//düşman yoksa yönünü direk değiştir tekrar görüş alanına giren biri var mı diye bak Y Eksenini 100 al
		if (!_enemy?.enemy) {
			_dir = _dir === 'left' ? 'right' : 'left';
			_enemy = this.getClosestEnemy(_sight, _dir, function (_e) {
				return !_e.invulnerable && !_e.isDead();
			}, 100, __attackTolerance);
		}
		if (_enemy?.enemy && this.health > 0) {
			//düşman var yaşıyor ve hedef seçilmemiş ise onu hedef seç
			if (!this.dmgTaken && this.autoMode === 2 && !this.autoTarget && 
				!(_enemy.enemy.related ?? _enemy.enemy).invulnerable) {
				this.setAutoTarget(_enemy.enemy);
				if (this.enemy)
					this.setAutoMode(2);
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
					let _e = _enemy.enemy;
					if (!_isEnemyClose) {
						if (this.animationFinished || this.animation === 'walk') {
							if (this.animation === 'walk' && !this.animationFinished
								&& this.frame < this.animations.run.frames.length - 1) {
								const _oldStart = this.start;
								const _oldFrame = this.frame;
								this.run(_anima, _dir);
								this.start = _oldStart;
								this.frame = _oldFrame;
							}
							else {
								if(!this.ranged)
									this.run(_anima, _dir);
								else {
									let _wait;
									if(this.upcomingAnimation) {
										const _ua = this.animations[this.upcomingAnimation];
										if(_ua && _ua.totalRange && _enemy.range && _ua.totalRange >= ((_enemy.range / _canvas.width) * 100))
											_wait = 1;
									}
									this.upcomingAnimation = undefined;
									if(_wait)
										this.idle(95);
									else
										this.run(_anima, _dir);
								}
							}
							this.autoAttacking = false;
						}
					}
					else {
						if (this.animationFinished || this.animation === 'run' || this.animation === 'idle') {
							if (this.yPosition !== _e.yPosition && this.animations.walk) {
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
										if (!this.animateAutoAnimation(2,null,2)) {
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
						const _target = episode.enemies.find(x => x.key === this.autoTarget.key);
						if (_target)
							_e = _target;
					}
					if ((this.animation === 'run' || this.animation === 'walk')) {
						const _originDiff = Math.abs((this.getScreenLeft() - this.getOriginDistance()) - (_e.getScreenLeft() - _e.getOriginDistance()));
						const _range = MathCeil((_originDiff / _canvas.width) * 100);
						if(this.frame === 0 && this.start === 0 && !this.alp) {
							if(_range > 66)
								this.autoStepXRate = this.autoStepYRate = (getRandomValue(35,55) / 100);
							else if(_range > 33)
								this.autoStepXRate = this.autoStepYRate = (getRandomValue(55, 75) / 100);
							else
								this.autoStepXRate = this.autoStepYRate = undefined;
							this.animations[this.animation].moveInYCoords = (_isEnemyClose || getRandomValue(-_range, 100) > _range);
						}
						if (!(this.getFps() > 1) && (this.animations[this.animation].moveInYCoords || this.alp)) {
							var _up = this.yPosition >= _e.yPosition, _verticalStep;
							if (getRandomValue(1, 2) < 2 && Math.abs(this.yPosition - _e.yPosition) < MathCeil(getGroundHeight() / 150))
								this.yPosition = _e.yPosition;
							else if (this.yPosition > _e.yPosition){
								_verticalStep = this.calculateYStep();
								this.yPosition -= MathCeil(_verticalStep / ((_verticalStep > 4 && !this.alp)? getRandomValue(2, MathFloor(_verticalStep / 2)) : 1));// MathCeil(getGroundHeight() / (_range > 100 ? getGroundHeight() : (_isEnemyClose ? getGroundHeight() / 2 : getGroundHeight() / this.randomStep)));
							}
							else if (this.yPosition < _e.yPosition) {
								_verticalStep = this.calculateYStep();
								this.yPosition += MathCeil(_verticalStep / ((_verticalStep > 4 && !this.alp) ? getRandomValue(2, MathFloor(_verticalStep / 2)) : 1)); // MathCeil(getGroundHeight() / (_range > 100 ? getGroundHeight() : (_isEnemyClose ? getGroundHeight() / 2 : getGroundHeight() / this.randomStep)));
							}
							if(this.yPosition < _e.yPosition && _up)
								this.yPosition = _e.yPosition;
						}
					}
					else 
						this.autoStepXRate = this.autoStepYRate = undefined;
				}
				else if (!this.chargimg && this.getCurrentFrame()?.directionChangeEnabled)
					this.direction = _dir;
				else if(this.animationFinished)
					if (!this.animateAutoAnimation(4,null,3)) {
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
					this.turned = true;
					this.direction = this.moveDirection = _dir;
					this.pickRandomAttack(null, null, 1);
					if (this.upcomingAnimation) {
						_enemy = this.getClosestEnemy(0, this.direction, function (_e) {
							return !_e.invulnerable && !_e.isDead();
						}, this.animations[this.upcomingAnimation].yRange, __attackTolerance);
						if (_enemy?.enemy)
							if (!this.animateAutoAnimation(3,null,4)){
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
		if(!_enemy?.enemy && !this.isDead() && this.animation !== 'idle')
			this.animate('idle', 1, null, 2);
		this.pickRandomAttack(null, null, 1);
	}
	this.animateAutoAnimation = function (_q, _c, num) {
		if(this.anima === 'roll' && !this.animationFinished)
			return true;
		const _newAnima = this.animations[this.upcomingAnimation];
		if (this.class !== 'spell' && _newAnima.attack && this.lastAttackTime && (this.lastAttackTime + ((this.friendly ? 0 : this.difficulty) * 500)) > msNow)
			return false;
		this.animate(this.upcomingAnimation);
		this.autoAttacking = _newAnima.attack;
		if (this.autoAttacking)
			this.lastAttack = this.upcomingAnimation;
		this.upcomingAnimation = undefined;
		this.pickRandomAttack();
		return true;
	}
	this.follow = function (_char) {
		this.attacking = true;
		const _t = isObjectsInTouch(this, _char, 100);
		if ((_t.touch || (_t.originDiff < (_canvas.width / 10))) && _char.main) {
			this.idleStart = msNow;
			if (this.animation !== 'idle' || this.animationFinished)
				this.animate('idle', 1, null, 6);
		}
		else {
			if (this.animation === 'idle' && this.idleStart && (msNow - this.idleStart) < 200)
				return true;
			if (this.getExactLeft() > _char.getExactLeft())
				this.moveDirection = this.direction = 'left';
			else
				this.moveDirection = this.direction = 'right';
			if (Math.abs(this.yPosition - _char.yPosition) < MathCeil(getGroundHeight() / 6)) {

			}
			else if (this.yPosition > _char.yPosition)
				this.yPosition--;
			else if (this.yPosition < _char.yPosition)
				this.yPosition++;
			this.run(this.getCurrentAnimation(), this.direction);
			return true;
		}
		return false;
	}
	this.swapAnimation = function(_key) {
		const _anima = this.animations[_key ?? this.animation];
		if(_anima.changed) {
			delete _anima.changed;
			_anima.frames = [..._anima.originalFrames];
		}
		else {
			const _rate = getRandomValue(1, 100) / 100;
			const _a = _anima.alternateFrames
			.find(x => _rate <= x.rate && (!x.when || x.when(this)))?.frames;
			if(_a){
				if(!_anima.originalFrames)
					_anima.originalFrames = [..._anima.frames];
				_anima.frames = [..._a];
				if(_a.rate < 1)
					_anima.changed = 1;
				else
					_anima.looping = 1;
			}
			else if(_anima.looping) {
				delete _anima.looping;
				_anima.frames = [..._anima.originalFrames];
			}
		}
	}
	this.finishAnimation = function () {
		if(this.animation.startsWith('counter'))
			this.newBlocked = -1 * counterAttackTolerance;
		else
			this.newBlocked = false;
		if(this.animation === 'release' && !this.main)
			this.upcomingAnimation = this.animation = 'idle';
		if(this.animations[this.animation]?.attack)
			this.lastFinishedAttack = this.animation;
		else if(this.animations[this.animation].alternateFrames) {
			//const _keys = Object.keys(this.animations).filter(x => x.startsWith('idle'));
			//if(_keys.length > 1) {
				this.swapAnimation();
			//}
		}
		let _anima = this.animations[this.animation];
		if(_anima.once)
		{
			delete this.animations[this.animation];
			this.animation = 'idle';
		}
		this.animationFinished = true;
		if (this.enemy && this.autoMode > 0 && this.animations[this.animation].attack)
			this.lastAttackTime = msNow;
		this.autoAttacking = false;
		if(this.pushDirection)
			this.pushDirection = this.pushback = undefined;
		if(this.hurting && this.harmless)
			this.animation = 'idle';
		this.hurting = this.attacked = this.attacking = this.upcomingAnimation = this.randomStep = undefined;
		this.relatedObjects?.filter(x => x.bind === this.animation && !x.remove)?.forEach(x => x.remove = true);
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
		const _diff = 10 - MathFloor((msNow - this.deadTime) / 1000);
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
				this.castContainer.style.transform = 'translateX(' + (this.castContainer.platformX - platformX) + 'px)';
				this.castContainer.style.setProperty('-webkit-transform', this.castContainer.style.transform);
			}
		}
		else if(this.castContainer)
			delete this.castContainer;
	}
	this.cancelCast = function () {
		if(!this.castContainer)
			this.castContainer = document.getElementById('wcast-' + this.key);
		if (this.castContainer) {
			if (this.castContainer.timer)
				clearTimeout(this.castContainer.timer);
			this.castContainer.remove();
			delete this.castContainer;
		}
	}
	this.checkUseProgress = function () {
		if (!this.main)
			return;
		if (this.useProgressStart) {
			if (!useProgress)
				useProgress = document.getElementById('use-progress');
			if ((msNow - this.useProgressStart) > 1999) {
				this.useProgressStart = undefined;
				if(useProgress?.inProgress)
					delete useProgress.inProgress;
				const _portal = document.getElementById('SPRT-' + this.action?.loot);
				if (_portal)
					_portal.remove();
				addClass(_useBtn, 'd-none');
				episode.sprites.filter(x => x.animation.id === this.action.loot).forEach(x => {
					if(x.relatedEnemy)
						x.relatedEnemy.remove = true;
					if(!__account.questStatus.quest.after)
						x.remove = true;
					if(x.do) 
						x.do();
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
						dmgFrames.push({
							item: {key:_q.key},
							//text: '<p data-text="1 x ' + _qkey + '">1 x ' + _qkey + '</p>',
							//class: 'dmg dmg-orange',
							x: this.getLeft(),
							y: _canvas.height - this.yPosition - this.getHeight()
						});
					}
					episode.playSound({ key: 'loot' });
					if (!useProgress)
						useProgress = document.getElementById('use-progress');
					addClass(useProgress, 'd-none');
					_client.upgradeQuestStatus();
				}
				else {
					if (!useProgress)
						useProgress = document.getElementById('use-progress');
					addClass(useProgress, 'd-none');
					if(__account.questStatus.quest.after)
						__account.questStatus.quest.after();
				}
			}
			if (this.hurting || this.animation !== 'idle') {
				this.useProgressStart = undefined;
				addClass(useProgress, 'd-none');
				if(this.actionSound && !this.actionSound.paused)
					this.actionSound.pause();	
			}
		}
	}
	this.checkBoss = function () {
		if (this.class !== 'boss' && !this.main)
			return;
		if (this.isDead())
			episode.enemies?.filter(x => x.class === 'minion')?.forEach(x => x.remove = true);
	}
	this.checkAutoFillHP = function () {
		if (!this.main && !this.friendly)
			return;
		if (this.class === 'spell' || this.enemy)
			return;
		if(episode.pvp)
			return;
		const _maxHP = this.getMaxHP();
		if (this.health < _maxHP && this.health > 0) {
			if (!this.lastAutoFillHPTime)
				this.lastAutoFillHPTime = msNow;
			else if (msNow - this.lastAutoFillHPTime >= (__autoFillHPMS / (episode.lobby ? 10 : 1))) {
				const _rate = MathFloor((msNow - this.lastAutoFillHPTime) / (__autoFillHPMS / (episode.lobby ? 10 : 1)));
				this.setHealth(MathCeil((_maxHP / 100) * __autoFillHPRate * _rate) + this.health, null, null, 2);
				this.lastAutoFillHPTime = msNow;
			}
		}
		if (this.fatique < this.maxFatique) {
			if (!this.lastAutoFillFatiqueTime)
				this.lastAutoFillFatiqueTime = msNow;
			else if (msNow - this.lastAutoFillFatiqueTime >= (_autoFillFaiqueMS / (episode.lobby ? 10 : 1))) {
				this.increaseFatique(MathCeil((this.maxFatique / 100) * __autoFillFatiqueRate));
				this.lastAutoFillFatiqueTime = msNow;
			}
		}
	}
	this.checkInCombat = function() {
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
		var _speed = this.stepXRate * (this.autoStepXRate ?? 1);
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
			if (this.hasFatiqueBar) {
				const _bar = document.querySelector('#defbar-hb-' + this.key);
				if (_bar)
					_bar.style.background = 'linear-gradient(90deg, #9D00FF ' + this.fatique + '%, transparent ' + ((this.fatique / this.maxFatique) * 100) + '%)';
			}
		}
	}
	this.getRandom = function(_pos) {
		return ((msNow % this.divider) % _pos);
	}
	this.draw = function (_queue) {
		if(this.pushDirection)
			console.log(this.pushDirection);
		if(episode.enemies.filter(x => x.main).length > 1)
				alert('2 main var');
		if(!this.harmless && this.autoMode > 0 && this.animation === this.lastFinishedAttack)
		{
			const _a = this.animations[this.animation];
			if(_a?.attack && (_a.coolDownLeft > 0 || _a.next)) {
				this.pickRandomAttack(null, null, 1);
				this.animation = this.upcomingAnimation ?? 'idle';
			}
		}
		// if (this.lastActivity && (msNow - this.lastActivity) > __maxAFKMs)
		// 	disconnect();
		if (!episode.pvp && this.main && this.isDead() && this.remove) {
			if (!this.deadTime) {
				openGameOverModal();
				this.deadTime = msNow;
				this.deadBuffed = false;
				for (var _skillKey of Object.keys(this.animations)) {
					const _skill = this.animations[_skillKey];
					if (_skill.realNext !== _skill.next)
						_skill.next = _skill.realNext;
				}
				episode.enemies.filter(x => x.enemy && !x.isDead() && !x.invulnerable && x.health < x.getMaxHP())?.
					forEach(x => {
						x.resetAutoMode();
						if(x.rageCount > 0) {
							x.rageCount = 0;
							x.updateRageSkillUI();
						}
						x.resetFatique();
						x.autoTarget = x.dmgTaken = undefined;
						if(x.grade > 1)
							x.gradeLeft = x.grade - 1;
						x.setHealth(x.getMaxHP(), null, null, 6);
					});
			}
			else
				this.updateDeadTimer();
			return;
		}
		else if (this.reviveTime) {
			if (!this.deadBuffed) {
				this.addBuff({key:'release', level: 2});
				this.deadBuffed = 1;
				// const _height = relatedObjects.find(x => x.id === 'shield').height;
				// this.addObject({
				// 	key: 'shield',
				// 	position: 'middle',
				// 	scale: ((this.height * this.getZoom()) / _height) * 1.2
				// });
			}
			else if((msNow - this.reviveTime) > 3000)
				this.reviveTime = undefined;
		}
		else if (this.lifeTime && (msNow - this.lifeTime.from) > this.lifeTime.ms) {
			this.lifeTime.do();
			this.lifeTime = undefined;
		}
		if (!this.started)
			this.started = true;
		if(this.stop) {
			this.render(this.getCurrentFrame(), _queue);
			return;
		}
		if(this.main) {
			__pvp.checkInPvpContent();
			this.checkHitCount();
			checkCSSAnimations();
		}
		this.checkInCombat();
		this.checkAutoFillHP();
		this.checkCast();
		this.checkSkills();
		this.checkUseProgress();
		this.checkBoss();
		if (this.keyboard)
			this.applyCommand();
		if (!this.main && this.actions)
			this.checkActions();
		this.start++;
		let _anima = this.getCurrentAnimation();
		if(this.isDead() && !this.remove && !this.animation.startsWith('dead') && 
			!this.finishing && !this.attackingOnlyBy && !_anima.interactive)
			this.animate('dead', 1);
		const _move = this.keyboard?.getMove();
		if (!_anima.move)
			_anima.useExtraStepXRate = true;
		else if ((this.start === 1) && this.frame === 0)
			_anima.useExtraStepXRate = ((this.autoMode || this.push) && this.getCurrentAnimation().useExtraStepXRate) ? true : this.isXMove(_move);
		let _frame = this.getCurrentFrame();
		if (_frame.do && (this.start === 1))
			_frame.do(this, _anima);
		if (_frame.props)
			this.setProps(_frame.props);
		if (_frame.target && this.target)
			this.target.setProps(_frame.target);
		let _removeEnemy = false;
		this.render(_frame, _queue);
		if (this.start > 0 && ((this.start % MathCeil((_frame.speed * ((_anima.hurt || _anima.key.startsWith('dead')) ? 1 : (this.getFps() ?? 1))) / (_anima.attack ? this.getSpeedRate() : 1))) === 0)) {
			const _hasNext = _anima.next || _frame.next;
			if (_frame.finish) {
				this.finishAnimation();
				this.animate('finish' + this.getNextSkill(this.finishTarget.finishableWith));
				this.frame = 0;
				_anima = this.getCurrentAnimation();
				_frame = this.getCurrentFrame();
			}
			else if (_frame.next) {
				this.finishAnimation();
				this.animate(this.getNextSkill(_frame.next));
				this.frame = 0;
				_anima = this.getCurrentAnimation();
				_frame = this.getCurrentFrame();
			}
			else {
				this.frame++;
				if(this.soundPlaying)
					delete this.soundPlaying;
				const _skillCommand = this.keyboard?.getSkill();
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
					if (this.animation.startsWith('dead') && (this.enemy || this.class === 'spell'))
						this.remove = _removeEnemy = true;
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
							this.animate('dead', 2);
					}
					if (_anima.ultimate) { // && (this.main || this.friendly || episode.pvp)) {
						if (!this.ultimate)
							this.ultimate = true;
						if(this.alp || episode.pvp)
							resetSkills(1, null, this);
						this.rage = msNow;
						if(this.main && !__account.options.effect)
							addClass(_gamePad, 'rage-activated');
						if (this.main)
							removeClass(rageSkill, 'glow');
					}
					if (this.class === 'spell' && this.animation === 'dead')
						episode.enemies = episode.enemies.filter(x => x != this);
					else if (this.class === 'spell' && this.animation !== 'dead' && !_hasNextSkill)
						this.animate('dead', 3);
				}
				if (repeatFrame)
					this.frame = _anima.frames.length - 1;
				else {
					this.frame = 0;
					if(!_anima.maxRepeat && !_hasNext && !this.isDead() && this.class !== 'object' && this.class !== 'spell'
						 && this.autoMode > 0 && this.animation && this.animations[this.animation]?.attack)
						this.animation = 'idle';
				}
			}
		}
		let _goOn;
		if (this.autoMode) {
			if (!this.isDead()) {
				if(this.autoTarget && (_anima.type === 'move' || _anima.key === 'idle') && !this.keyboard && this.animationFinished && this.class !== 'spell') {
					const _range = this.getRangeBetween(this.autoTarget);
					const _arr = this.autoTarget.getClosestAttackers(__maxAttackedCount, _range, function(_e) {
						const _a = _e.getCurrentAnimation();
						return (_a.attack || _a.type === 'move') && _e !== this;
					});
					if(_arr?.length >= __maxAttackedCount) {
						if(this.animation === 'walk' || this.animation === 'run')
							this.idle(78);
						else
						switch(this.getRandom(10))
						{
							case 0:
								this.idle(79);
								break;
							case 1:
								this.lastDirection = this.direction;
								this.moveDirection = this.yPosition > this.autoTarget.yPosition ? 'down' : 'up';
								_anima = this.getCurrentAnimation();
								this.run(_anima, this.direction, true);
								if (this.station)
									this.animationChanged = true;
								break;
							case 2:
							case 3:
							case 4:
								if(_range > 66)
									this.autoStepYRate = (getRandomValue(35,55) / 100);
								else if(_range > 33)
									this.autoStepYRate = (getRandomValue(55,75) / 100);
								else
									this.autoStepYRate = undefined;
								this.lastDirection = this.direction;
								this.moveDirection = 'down';
								_anima = this.getCurrentAnimation();
								this.animate('walk', 1);
								if (this.station)
									this.animationChanged = true;
								break;
							case 5:
							case 6:
							case 7:
								if(_range > 66)
									this.autoStepYRate = (getRandomValue(35,55) / 100);
								else if(_range > 33)
									this.autoStepYRate = (getRandomValue(55,75) / 100);
								else
									this.autoStepYRate = undefined;
								this.lastDirection = this.direction;
								this.moveDirection = 'up';
								_anima = this.getCurrentAnimation();
								this.animate('walk', 1);
								if (this.station)
									this.animationChanged = true;
								break;
							default:
								_goOn = 1;
								break;
						}
					}
					else
						this.autoCommand();
				}
				else 
					this.autoCommand();
				_anima = this.getCurrentAnimation();
				_frame = this.getCurrentFrame();
			}
		}
		if ((!this.autoMode || !this.autoTarget || _goOn) && !this.keyboard && !this.finishing && this.enemy && this.class !== 'spell' && this.animationFinished) {
			if (!this.animations.run || this.immobilize)
				this.idle(6);
			else if (!this.autoTarget && !this.hasStation) {
				const _rand = getRandomValue2(1, 4);
				switch (_rand) {
					case 1:
						if (!this.lastDirection)
							this.direction = getRandomValue2(1, 2) === 1 ? 'left' : 'right';
						else
							this.direction = this.lastDirection === 'left' ? 'right' : 'left';
						this.lastDirection = this.direction;
						this.moveDirection = this.direction;
						_anima = this.getCurrentAnimation();
						this.run(_anima, this.direction);
						if (this.station)
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
				this.attacking = this.frame;//this.class !== 'spell';
				this.attack(_anima, _frame);
			}
			else {
				if (!_frame.atk)
					this.attacking = false;
				if (_frame.pullRange)
					this.pull(_anima, _frame);
			}
			if (_anima.attack && _frame.push)
			 	this.pushEnemies(_frame);
		}
		else
			_frame.charge = undefined;
		this.useRage();
		this.checkChainSkill(_frame);
		if (this.animation === 'attack' && this.animations.hug && this.frame === 0 && this.start === 1)
			this.checkHug();
		const _currentFrame = this.getCurrentFrame();
		if (_currentFrame.spell && !this.animationFinished && this.start === 0)
			this.throwSpell(_currentFrame);
		if (this.main && this.animation === 'run' && ((this.frame === 1 && this.start === 1) || this.turned)) {
			if (!this.stepSound && __account.options.sound) {
				let _footstepKey = ((episode.dungeon || episode.pvp) ? 'dungeon' : episode.theme.replace(/\d+/, '')) + 'footsteps';
				let _volume = .05;
				if (!soundFiles[_footstepKey]) {
					_footstepKey = 'footsteps';
					_volume = .5;
				}
				this.stepSound = getSound(null, _footstepKey);
				this.stepSound.volume = _volume;
				this.stepSound.loop = true;
				this.stepSound.crossOrigin = 'anonymous';
			}
			if (__account.options.sound && this.stepSound?.paused)
				this.stepSound.play();
		}
		else if (this.main && this.animation !== 'run' && this.stepSound) {
			this.stepSound.pause();
			this.stepSound.currentTime = 0;
		}
		var _sf = this.getCurrentFrame().sound;
		if (_sf && this.soundPlaying != (this.frame + 1) && !this.animationFinished) {
			if(!_sf.range || (!this.main && _sf.range))
			{
				this.soundPlaying = this.frame + 1;
				let _sound = episode.playSound({
					reset: _sf.reset,
					key: (!this.main ? this.name.toLowerCase() : this.class) + 
					(typeof _sf === 'string' ? _sf : (_sf?.key ?? this.animation)),
					volume:_sf.volume,
					speed: _sf.speed,
					owner: this,
					bind: _sf.bind
				}, [_sf?.key ??_sf], 1);
				if (_sound && _sf.bind)
					_anima.sound = _sound;
			}
		}
		if(this.do)
			this.do(this);
		this.checkNPC();
		this.checkBuff(_currentFrame);
		this.checkGlobalBuffs();
		this.checkFinishingMoveAvailable(_anima);
		if (this.health <= 0) {
			if (_anima.attack) {
				this.animate('dead', 4);
			}
			else if (!this.attacker)
				this.animations[this.animation].next = 'dead';
		}
		if (this.finishTarget?.dead)
			this.finishTarget = undefined;
		this.checkExperience();
		if (!this.noLoot || _currentFrame.loot)
			this.checkLoot(_currentFrame);
		if(this.enemy && this.remove && this.respawnAfterSeconds && !this.respawnRequested) {
			let _skip;
			if(this.groupId && this.spawnAsGroup) {
				if(episode.enemies?.find(x => x !== this && x.groupId === this.groupId && !x.remove))
					_skip = 1;
			}
			if(!_skip) {
				this.respawnRequested = 1;
				if(!episode.respawners)
					episode.respawners = [];
				for(let i = 0; i < (this.spawnAsGroup ?? 1); i++)
					episode.respawners.push({id: this.id, spawnSettings: this.spawnSettings, date: msNow, ms: this.respawnAfterSeconds * 1000})
			}
		}
		this.checkKillQuest();
		if (this.main && !episode.lobby)
			this.checkHealth();
		this.checkDialog();
		if (_removeEnemy && !episode.pvp){
			episode.hideHealthBar(this);
			episode.enemies = episode.enemies.filter(x => x !== this);
		}
		if (this.friendly && this.remove && !this.related)
			removeCoopCharacter();
		if (_frame.changeDirection)
			this.direction = this.direction === 'left' ? 'right' : 'left';
		if (episode.pvp && episode.check)
			episode.checkPVPResult();
		else if(episode.check)
			episode.checkMapName();
		episode.check = false;
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
					_commons[i].innerHTML = '<img onclick="mainCharacter.useCommonSkill(' + (i+1) + ')" src="./images/' + (__account.commonInventory[i].alternateType ?? 'common') + '/icons/' + __account.commonInventory[i].key + '.png" data-key="' + __account.commonInventory[i].key + '" />';
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
	this.checkHealth = function () {
		if ((this.hasSickness || ((this.health * 10) < this.getMaxHP())) && !this.isDead()) {
			if (!this.heartbeat && __account.options.sound) {
				this.heartbeat = getSound(null, 'heartbeat');
				this.heartbeat.crossOrigin = 'anonymous';
				this.heartbeat.loop = true;
				this.heartbeat.volume = 1;
				this.heartbeat.play();
			}
		}
		else if (this.heartbeat) {
			this.heartbeat.pause();
			this.heartbeat = undefined;
		}
	}
	this.checkDialog = function () {
		const _f = this.getCurrentFrame();
		if (_f.dialog){
			if(episode.dialogs)
				episode.dialogs.push(_f.dialog);
			else
				episode.dialogs = [_f.dialog];
			createBubbleDialog();
		}
		else if(episode.dialogs)
			createBubbleDialog();
	}
	this.getRangeBetween = function(_char) {
		return MathRound((100 * MathAbs(this.getOriginLeft() - _char.getOriginLeft())) / _canvas.width);
	}
	this.checkExperience = function () {
		if (episode.pvp || episode.gold || episode.tower)
			return;
		if (this.experience > 0 && this.enemy && this.class !== 'spell' && this.class !== 'minion' && this.class !== 'object' &&
			(this.health <= 0 || this.finishing) && !this.expGained) {
			this.expGained = true;
			updateGlobalQuest('kill-enemy');
			updateExperience(MathCeil((this.experience * (this.expEnabled ? 2 : 1)) * (this.level / mainCharacter.level)));
			if (_coopMembers?.[0])
				for (let _cm of _coopMembers)
					updateExperience(MathCeil((this.experience * (this.expEnabled ? 2 : 1)) * (this.level / _cm.level)), null, _cm);
		}
	}
	this.checkNPC = function () {
		if (!this.main || this.target)
			return;
		const _yStep = MathRound(getGroundHeight() / 4);
		const _xStep = MathRound(getGroundHeight() / 6);
		if (this.yPosition < _yStep || __account.questStatus.dialogArr) {
			addClass(_talkBtn, 'd-none');
			addClass(_useBtn, 'd-none');
		}
		const _objects = episode?.sprites?.filter(x => !x.disabled && (x.npc || x.sound));
		const _left = this.getScreenLeft() - this.getOriginDistance() + platformX;
		const _right = _left + this.getWidth();
		let _qid, _usable, _break, _did;
		const _quest = __story.quests.find(x => x.id === __account.questStatus.order);
		const _sideQuest = _sideQuests.find(x => x.id === __account.questStatus.side.order);
		let _hasProgress = false, _isSideQuestSprite = false, _isArtifact = false;
		if (!this.isDead()) {
			const _drawables = [];
			for (var _obj of _objects) {
				if (_obj.remove)
					continue;
				if (_obj.when && !_obj.when(_obj))
					continue;
				_drawables.push(_obj);
				const nLeft = _obj.left - ((_obj.rotate ? _obj.rightGap : 0) ?? 0);
				let nRight = _obj.left + (_obj.width - ((_obj.rotate ? 0 : _obj.rightGap) ?? 0));
				if (nLeft < (_xStep + _left) && nRight > (_right - _xStep)) {
					if (!_break) {
						if (_obj.dialogs)
							_did = _obj.dialogs;
						else if(_obj.artifactId) {
							_usable = _obj;
							_isArtifact = 1;
						}
						else if (_quest && _obj.animation.id === _quest.owner)
							_qid = _quest.id;
						else if (_sideQuest && _obj.animation.id === _sideQuest.owner)
							_qid = _sideQuest.id;
						else if (_sideQuest && _obj.questItem && _obj.animation.id === _sideQuest.loot)
						{
							_isSideQuestSprite = 1;
							_usable = _obj;
						}
						else if (_quest && _obj.questItem && this.animation === 'idle' &&
							_quest.loots?.find(x => x.object?.indexOf(_obj.animation.key) >= 0)) {
							_usable = _obj;
							_hasProgress = true;
						}
						else if (_obj.to) {
							if(!episode.runToSwitch)
								_usable = _obj;
							else {
								if(this.left < (_canvas.width / 2))
									episode.runToLeft = _obj.to;
								else if((this.left + platformX) > (episode.width - (_canvas.width / 2)))
									episode.runToRight = _obj.to;
							}
						}
						_break = true;
					}
				}
			}
			if(_drawables?.[0]) {
				_cNPC.clearRect(0, 0, _canvasS.width, _canvasS.height);
				for(var _d of _drawables)
					if (_d.drawNPCAnimation)
						_d.drawNPCAnimation();
			}
		}
		let actionSet = false;
		if (_did && this.animation === 'idle') {
			removeClass(_talkBtn, 'd-none');
			this.action = {
				command: 'talk',
				dialogs: _did
			}
			actionSet = true;
		}
		else if (_qid && this.animation === 'idle') {
			removeClass(_talkBtn, 'd-none');
			this.action = {
				command: 'talk',
				id: _qid
			};
			actionSet = true;
		}
		else {
			addClass(_talkBtn, 'd-none');
			if (!this.useProgressStart)
				this.action = undefined;
		}
		if (_usable && this.animation === 'idle') {
			removeClass(_useBtn, 'd-none');
			const _portal = document.getElementById('SPRT-' + _usable.animation.id);
			if (_portal || _usable.frames) {
				if (_portal) {
					if(!_portal.oldAlpha)
						_portal.oldAlpha = _usable.alpha ?? 1;
					_portal.style.opacity = 1;
				}
				if(_usable.skinable)
					addClass(_useBtn, 'skin-btn');
				else
					removeClass(_useBtn, 'skin-btn');
				this.action = {
					command: 'use',
					progress: _hasProgress,
					to: _usable.to,
					loot: _usable.animation.id,
					key: _usable.animation.key
				};
				if(_usable.skinable)
					this.action.sound = { key: 'skin', volume: .3, reset: true };
				else if(_isArtifact)
					this.action.artifactId = _usable.artifactId;
				if(_isSideQuestSprite)
					this.action.removeSprite = 1;
			}
		}
		else {
			if(!episode.portals)
				episode.portals = document.querySelectorAll('.portal');
			for (var _portal of episode.portals)
				if (_portal.oldAlpha)
					_portal.style.opacity = _portal.oldAlpha;
			if (!this.useProgressStart)
				addClass(_useBtn, 'd-none');
			if (!actionSet && !this.useProgressStart)
				this.action = undefined;
		}
	}
	this.dropItem = function (_type, _key, _alternateType) {
		if(episode.pvp || episode.gold || episode.tower)
			return;
		const _prevDrops = episode.enemies?.filter(x => x.dropType && x.dropType === _type);
		if(_prevDrops?.length > 3)
			return;
		let _item;
		switch (_type) {
			case 'gold':
				if (this.killedBy) {
					const _ch = mainCharacter;
					if (_ch) {
						const _maxAmount = _ch.level * 400;
						const _minAmount = .25 * _maxAmount;
						const _goldAmount = getRandomValue(_minAmount, _maxAmount);
						updateGold(_goldAmount, _ch);
						updateGlobalQuest('gain-gold', _goldAmount);
						dmgFrames.push({
							gold: _goldAmount,
							//text: _goldAmount + ' x &nbsp;<img src="./images/icons/gold.png" style="width:4vh" />',
							//class: 'effect-miss',
							x: _ch.getLeft(),
							y: _canvas.height - _ch.yPosition - _ch.getHeight()
						});
					}
				}
				return;
			case 'common':
				const _cs = commonSkills.find(x => x.key === _key);
				_item = JSON.parse(JSON.stringify(_cs));
				if (_cs.do)
					_item.do = _cs.do;
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
				break;
			case 'pot':
			case 'quest-item':
				_item = { type: _type, key: _key };
				break;
			case 'buff':
				const _keys = Object.keys(_allBuffs);
				if (_key === 'random')
					_key = _keys[getRandomValue(0, _keys.length - 1)];
				_item = JSON.parse(JSON.stringify(_allBuffs[_key]));
				const _arr = (_item.gain ?? _item.loss);
				const _level = _arr[getRandomValue(0, _arr.length - 1)].level;
				_item = { key: _key, level: _level, type: 'buff' };
				break;
		}
		const _self = this;
		getImage('./images/' + (_alternateType ?? _type) + '/icons/' + _key + '.png', function (image) {
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
								speed: 100,
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
					idle: {
						alternateFrames: [
							{ rate: .25, frames: [
								{
									spriteLeft: 0,
									spriteTop: 0,
									spriteWidth: image.width,
									spriteHeight: image.height,
									spriteOrigin: _origin,
									speed: 19,
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
				direction: 'right',
				defaultDirection: 'left',
				defaultAnimationKey: 'idle',
				zoom: _rate,
				height: _size,
				width: _size,
				maxHP: 1,
				stepX: 0,
				weight: 1000,
				stepXRate: 0,
				hasShadow: true,
				src: './images/' + (_alternateType ?? _type) + '/icons/' + _key + '.png'
			};
			_enemy.top = _self.getTop();
			_enemy.left = getRandomValue(_self.left - MathRound(_canvas.width / 50),
				_self.left + MathRound(_canvas.width / 50));
			_enemy.invulnerable = true;
			_enemy = new enemy(_enemy);
			_enemy.ultimate = _type === 'quest-item';
			if (!_enemy.ultimate) {
				if (_type === 'buff' || _type === 'common')
					_enemy.remarkableObject = true;
			}
			else
				_frames.find(x => x.bottomGap === undefined && x.extraStepXRate === undefined).objects = [{
					key: 'questshine',
					ygap:MathRound(_size / 2),
					position: 'middle'
				}];
			_enemy.direction = _self.direction === 'left' ? 'right' : 'left';
			_enemy.moveDirection = _enemy.direction;
			_enemy.yPosition = _self.yPosition;
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
		if (!this.killCounted && (this.health <= 0 || this.finishing) && this.enemy && __account.questStatus.quest?.kills) {
			const _q = __account.questStatus.quest.kills?.find(x => x.enemy.indexOf(this.id) !== -1);
			if (_q) {
				this.killCounted = 1;
				if (_q.count === undefined)
					_q.count = 0;
				if (_q.limit > _q.count)
					_q.count++;
				updateQuestArea();
				_client.upgradeQuestStatus();
			}
		}
	}
	this.checkLoot = function (_frame) {
		if (episode.pvp || episode.tower || episode.gold || this.looted)
			return;
		let _loot = _frame.loot, _key = 'random';
		if (!_loot && !this.looted && this.isDead() && _frame.alpha && this.enemy && !this.main && this.class !== 'spell') {
			this.looted = 1;
			if (__account.questStatus?.quest?.loots) {
				for (var _l of __account.questStatus.quest.loots)
					if (_l.enemy?.indexOf(this.id) !== -1 && _l.limit > (_l.count ?? 0))
						if (!_l.chanceRate || (_l.chanceRate && (getRandomValue(1, 100) <= _l.chanceRate))) {
							_loot = _l;
							break;
						}
			}
			_key = _loot?.key;
			const _rnd = getRandomValue(1, 10);
			if(episode.equipmentDropRates?.[0]) {
				let _edr = [...episode.equipmentDropRates];
				shuffle(_edr);
				this.dropItem('item', _edr[0].key);
			}
			if (_rnd < 3)
				this.dropItem('pot', 'pot');
			if (getRandomValue(1, 100) <= (((this.goldGainRate ?? 0) + this.baseProps.goldGainRate) * (this.goldEnabled ? 2 : 1)))
				this.dropItem('gold');
			if (getRandomValue(20, 30) < 22) {
				let _availSkills = commonSkills.filter(x => x.forEnemy?.indexOf(this.id) >= 0);
				if (!_availSkills?.[0])
					_availSkills = commonSkills.filter(x => !x.forEnemy);
				const _commonItem = _availSkills[getRandomValue(0, _availSkills.length - 1)];
				this.dropItem('common', _commonItem.key, _commonItem.type);
			}
		}
		if (_loot && _loot?.enemy)
			this.dropItem(_loot.type, _key);
		if (this.main) {
			const _objects = episode.enemies?.filter(x => x.enemy == undefined && !x.remove && x.class === 'object' && x.invulnerable);
			if (_objects?.[0]) {
				for (var _o of _objects) {
					if (_o.getCurrentFrame().bottomGap)
						continue;
					const _t = isObjectsInTouch(_o, this.getClone(-1 * (this.getWidth() / 3)));
					if (_t.touch || __batterySaveMode) {
						let _used = false;
						if (_o.inventory?.[0])
							for (var _inv of _o.inventory) {
								if (_inv.type === 'pot')
									_used = updatePot(1);
								else if (_inv.type === 'common')
									_used = this.addCommonSkill(_inv);
								else if (_inv.type === 'buff') {
									const _buff = this.addBuff(_inv);
									if (_buff) {
										this.addObject({
											key: 'buffup',
											position: 'over-head',
											still: false
										});
										_used = true;
									}
								}
								else if (_inv.type === 'item') {
									const _item = getRandomItem(_inv.grade, _inv.itemKey);
									if(_item.type === 'weapon')
									{
										var _class = getRandomValue(1, Object.keys(_allEnemies).filter(x => x.startsWith('enemy0')).length);
										_item.for = _allEnemies['enemy0' + _class]().class;
									}
									_used = pushItemIntoInventory(_item);
									if(_used) {
										updateGlobalQuest('loot-item');
										//var _invitem = getLangData(_inv.itemKey).toProperCase();
										dmgFrames.push({
											item: { key: _inv.itemKey, for: _item.for, grade: _inv.grade },
											//text: '<p data-text="' + _invitem + '">' + _invitem + '</p>',
											//class: 'dmg dmg-orange grade-' + _inv.grade,
											x: this.getLeft(),
											y: _canvas.height - this.yPosition - this.getHeight()
										});
									}
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
										dmgFrames.push({
											item: { key: _q.key },
											//text: '<p data-text="1 x ' + _qkey+ '">1 x ' + _qkey + '</p>' ,
											//class: 'dmg dmg-orange',
											x: this.getLeft(),
											y: _canvas.height - this.yPosition - this.getHeight()
										});
										episode.playSound({ key: 'loot' });
										_client.upgradeQuestStatus();
										_used = true;
									}
									else if(_q?.after)
										_q.after();
								}
							}
						else if (_o.touchDead && !_o.dying && !_o.dead) {
							_o.dead = true;
							_o.toucher = this;
							_o.animate('dead', 5);
						}
						if (_used) {
							_o.remove = true;
							episode.playSound({ key: 'inventory', volume: .5 });
						}
					}
				}
			}
		}
	}
	this.getBuffProps = function(_prop) {
		let _val = 0;
		for(let _buff of this.buffs ?? []) {
			var _b = _allBuffs[_buff.key];
			if(_b) {
				var _p = _b.gain ?? _b.loss;
				_p = _p.find(x => x.level === _buff.level);
				if(_p.props[_prop])
					_val += _p.props[_prop];
			}
		}
		return _val;
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
			if (this.buffs?.find(x => x.key === 'hps' && x.level > 1))
				this.addObject({ key: 'regen', position: 'middle', yGap: 50 });
			if ((msNow - this.lastHpRegenTime) > 999) {
				if(this.health != this.getMaxHP()) {
					const _val = MathRound(this.getMaxHP() / Math.abs(_hp * 100));
					this.increaseHealth();
					dmgFrames.push({
						//text: '+HP',
						val: _val,
						hp: 1,
						//class: 'effect-steal',
						x: this.getLeft(),
						y: _canvas.height - this.yPosition - this.getHeight()
					});
				}
				this.lastHpRegenTime = msNow;
			}
		}
		else {
			this.relatedObjects?.filter(x => x.key === 'regen')?.forEach(x => x.remove = true);
			if ((msNow - this.lastHpRegenTime) > 999) {
				const _decresement = MathRound(this.getMaxHP() / Math.abs(_hp * 100));
				this.decreaseHealth(_decresement);
				dmgFrames.push({
					//text: _decresement,
					//class: 'effect-dmg-taken',
					val: -_decresement,
					hp: 1,
					x: this.getLeft(),
					y: _canvas.height - this.yPosition - this.getHeight()
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
			if (_debuff && !this.main && this.autoMode !== 2)
				this.setAutoMode(2);
		}
		_buff.applying = true;
		if(_b.sound)
			episode.playSound(_b.sound);
		if (_b.objects)
			for (const _obj of _b.objects) {
				const _o = this.addObject(_obj);
				if (_o)
					_o.buff = _buff.key;
			}
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
				this.addBuff(JSON.parse(JSON.stringify(ab)), ab.time);
	}
	this.checkBuff = function (_frame) {
		if (this.buffs?.[0]) {
			let i = 0;
			for (var _buff of this.buffs)
				if ((msNow - _buff.time) >= _buff.ms || this.isDead())
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
	}
	this.addBuff = function (_b, _date) {
		if (this.dead || this.dying || this.class === 'spell' || this.class === 'object')
			return;
		if (_b.chanceRate)
			if (getRandomValue(1, 100) > _b.chanceRate)
				return;
		if (!_date)
			_date = Date.now();
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
		this.buffs.push({ type: _type, level: _b.level, key: _b.key, time: _date, ms: _b.ms ?? _attr.ms });
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
		if (_frame.push)
			return;
		const _enemies = episode.enemies.filter(x => !x.isDead() && x.pushingBy == this && !x.pushback);
		if (_enemies?.[0])
			for (var _e of _enemies)
				_e.pushingBy = _e.pushRate = _e.pushDirection = undefined;
	}
	this.inCrowdControl = function (_anima, _frame) {
		return _anima.hurt && !_frame.atk;
	}
	this.getHeight = function () {
		const _frame = this.getCurrentFrame();
		return MathRound((_frame.spriteHeight + Math.abs(_frame.bottomGap ?? 0)) * this.getZoom());
	}
	this.getHeightWithoutGap = function () {
		const _frame = this.getCurrentFrame();
		return MathRound(_frame.spriteHeight * this.getZoom());
	}
	this.getTop = function () {
		let _stepY = 0;
		if (this.extraStepYRate)
			_stepY = MathRound(this.extraStepYRate * (_canvas.height / 100));
		return MathRound((_canvas.height - this.yPosition - this.getHeight())) - _stepY;
	}
	this.getWidth = function () {
		const _frame = this.getCurrentFrame();
		return MathRound((_frame.spriteWidth + (_frame.rightGap ?? 0)) * this.getZoom());
	}
	this.getLeft = function () {
		const _frame = this.getCurrentFrame();
		const _reversed = this.direction !== this.defaultDirection;
		const _left = (this.main ? this.left : this.left - platformX);
		if (_reversed)
			return MathRound(_left - this.getWidth() + (_frame.spriteOrigin * this.getZoom()) - ((_frame.leftGap ?? 0) * this.getZoom()));
		else
			return MathRound(_left - (_frame.spriteOrigin * this.getZoom()) + ((_frame.leftGap ?? 0) * this.getZoom()));
	}
	this.hasEnemyNear = function (_range, _direction) {
		const _enemies = episode.getAvailableEnemies(this);
		if (_enemies?.[0]) {
			for (var _enemy of _enemies) {
				if (Math.abs(_enemy.yPosition - this.yPosition) > 10)
					continue;
				if (_enemy.invulnerable)
					continue;
				if (Math.abs(this.getLeft() - _enemy.getLeft()) > (this.getWidth() / 3))
					continue;
				const _t = isObjectsInTouch(_enemy, this);
				if (_t.originDiff <= _range)
					return _enemy;
			}
		}
		return false;
	}
	this.getClosestAttackers = function (_count, _range, _func) {
		const _enemies = episode.getAvailableEnemies(this, _func) ?? [];
		_count = _count ?? 10;
		_range = ((_canvas.width / 100) * _range);
		let _arr = [];
		if (_enemies?.[0]) {
			for (var _enemy of _enemies) {
				if (_enemy.invulnerable || _enemy.autoTarget !== this || _enemy.class === 'spell')
					continue;
				if (_func && !_func(_enemy))
					continue;
				const _t = isObjectsInTouch(_enemy, this);
				if (_t.touch)
					_arr.push({range:0, enemy:_enemy});
				else if(_t.originDiff <= _range)
					_arr.push({range:_t.originDiff, enemy:_enemy});
				if(_arr.length === _count)
					break;
			}
			if (_arr.length > _count)
				return _arr.sort((a, b) => a.range - b.range);
		}
		return _arr;
	}
	this.getClosestEnemy = function (_range, _direction, _func, _yRange, _tolerance) {
		const _enemies = episode.getAvailableEnemies(this, _func);
		if (_enemies?.[0]) {
			_range = _range ?? 0;
			if (_range)
				_range = MathRound((_canvas.width / 100) * _range);
			let _minRange = _range, _closestEnemies = [];
			for (var _enemy of _enemies) {
				if (_enemy.invulnerable || _enemy.class === 'spell')
					continue;
				if (_direction && (((this.getLeft() > (_enemy.getLeft())) && _direction !== 'left') ||
					(((_enemy.getLeft()) > this.getLeft()) && _direction !== 'right')))
					continue;
				if (_func && !_func(_enemy))
					continue;
				const _t = isObjectsInTouch(_enemy, this, _yRange, _tolerance);
				if (_t.touch) {
					return {
						enemy: _enemy,
						range: _tolerance ?? 0,
						yDiff: Math.abs(this.yPosition - _enemy.yPosition)
					}
				}
				else if (_t.originDiff <= _minRange) {
					const _yDiff = Math.abs(this.yPosition - _enemy.yPosition);
					if ((_yRange >= 100) || (_yDiff <= ((getGroundHeight() / 100) * (_yRange ?? 5))))
						_closestEnemies.push({
							enemy: _enemy,
							range: _t.originDiff,
							yDiff: _yDiff
						});
				}
			}
			if (_closestEnemies.length > 0)
				return _closestEnemies[_closestEnemies.length - 1];
		}
		return undefined;
	}
	this.getOriginX = function (_frame) {
		return (this.main ? 0 : platformX) + this.left + (_frame.spriteOrigin * this.getZoom());
	}
	this.getClone = function (_aoe) {
		return {
			left: this.getLeft() - (_aoe ?? 0),
			width: this.getWidth() + (2 * (_aoe ?? 0)),
			height: this.getHeight(),
			yGap: this.yGap ?? 0,
			top: this.getTop(),
			yPosition: this.yPosition,
			direction: this.direction
		};
	}
	this.getHitBox = function() {
		const _gap = this.direction === this.defaultDirection ? 
		MathRound(this.getOriginDistance()) : MathRound(this.getWidth() - this.getOriginDistance());
		return {
			left: (this.main ? this.left : this.left - platformX) - 
				(this.direction === this.defaultDirection ? 0 : this.getWidth() - _gap),
			width: this.getWidth() - _gap,
			height: this.getHeight(),
			top: this.getTop(),
			yPosition: this.yPosition,
			direction: this.direction,
			yGap: this.yGap
		};
	}
	this.getEnemiesInTouch = function (_anima, _tolerance, _func) {
		const _enemies = episode.getAvailableEnemies(this, _func);
		if (_enemies?.[0]) {
			const _frame = this.getCurrentFrame();
			const _aoe = MathRound((_frame.atk?.aoe ?? 0) * this.getZoom());
			const _closestEnemies = [];
			for (var _enemy of _enemies) {
				const _t = isObjectsInTouch(_enemy, _aoe > 0 ? this.getClone(_aoe) : this.getHitBox(), (_frame.atk?.yRange ?? 0) * 2, 0);
				if (_t.touch) {
					if (_aoe > 0)
						_enemy.aoe = true;
					_closestEnemies.push({ enemy: _enemy, dist: _t.originDiff });
				}
				else if (_enemy.attackingOnlyBy === this.key)
					_closestEnemies.push({ enemy: _enemy, dist: 1 });
			}
			return _closestEnemies.sort((a, b) => {
				if (a.dist < b.dist)
					return -1;
				else
					return 1
			});
		}
		return undefined;
	}
	this.charge2 = function (_anima, _frame) {
		if (this.immobilize)
			return;
		if (_anima.chargeDistance && (this.frame <= (_anima.chargeDistance.untilFrame ?? 0))) {
			const _y = this.yPosition;
			let _result = this.chargeProperties?.enemy ? undefined : this.getClosestEnemy(_anima.normalRange ?? 0, this.direction, function (_e) {
				return MathAbs(_e.yPosition - _y) < getGroundHeight() / 3;
			}, 33);
			if (!_result?.enemy) {
				_result = this.chargeProperties?.enemy ? { enemy: this.chargeProperties.enemy } : this.getClosestEnemy(_anima.chargeDistance.value, this.direction, function (_e) {
					return MathAbs(_e.yPosition - _y) < getGroundHeight() / 3;
				}, 33);
				if (_result?.enemy) {
					if (this.start === 1 && this.frame === 0){
						this.charging = true;
						episode.playSound({ key: 'charge', volume: .25, owner: this });
					}
					let _speed = 0;
					for (var i = 0; i <= _anima.chargeDistance.untilFrame ?? 0; i++)
						_speed += _anima.frames[i].speed;
					if (!this.chargeProperties && this.charging) {
						this.charging = (_anima.chargeDistance.value * .66) < (100 * (_result.range / _canvas.width)) ? 1 : 0;
						if(this.main)
							_result.enemy.hurtColor = '#880808';
						episode.playSound({key: 'impact'});
						this.chargeProperties = {
							enemy: _result.enemy,
							stepX: MathFloor((_result.range - (_result.enemy.getWidth() / 2)) / (_speed < 2 ? _speed : _speed - 1))//(_speed - this.start))
						};
					}
					if(this.chargeProperties) {
						if (MathAbs(this.chargeProperties.enemy.yPosition - this.yPosition) < 3)
							this.yPosition = this.chargeProperties.enemy.yPosition;
						else {
							if (this.chargeProperties.enemy.yPosition > this.yPosition)
								this.yPosition += MathCeil((this.chargeProperties.enemy.yPosition - this.yPosition) / 2);
							else
								this.yPosition -= MathCeil((this.yPosition - this.chargeProperties.enemy.yPosition) / 2);
						}
					}
				}
				else
					this.chargeProperties = this.charging = undefined;
			}
			else
				this.chargeProperties = this.charging = undefined;
			if(this.frame === 0 && !this.charging) {
				while(this.getCurrentFrame()?.chargeOnly) {
					this.frame++;
				}
			}
		}
		else {
			if(this.charging && !this.chargeProperties)
				delete this.charging;
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
		if ((_obj.main && !this.main) || __batterySaveMode)
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
					_o.xGap += MathRound(this.getWidth() / 2);
				else
					_o.xGap += MathRound(this.getWidth() / 2);
				break;
			}
			case 'screen-top': {
				_o = relatedObjects?.find(x => x.id === _obj.key);
				if (!_o)
					return null;
				const _oHeight = (_canvas.height - this.yGap - this.yPosition) - this.getHeight();
				const _zoom = _oHeight / (_o.height * (_o.zoom ?? 1) * __zoom);
				const _w = _o.width, _h = _o.height;
				_o = this.tryUseRelatedObject(_obj, _zoom);
				if (!_o)
					return null;
				_o.left = this.getScreenLeft() - MathRound((_w * _zoom) / 2);
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
					_o.xGap += 3 * MathRound(this.getWidth() / 2);
				else
					_o.xGap -= MathRound(this.getWidth() / 2);
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
				_o.xGap = -1 * MathRound((this.getWidth() - (_o.width * _o.zoom)) / 2);
				break;
			}
			case 'front-head': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (this.direction === 'left')
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
				else
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
				break;
			}
			case 'behind-head': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (this.direction === 'left')
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
				else
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
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
				if (this.direction === 'left')
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
				else
					_o.xGap -= MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
				break;
			}
			case 'middle-behind': {
				_o = this.tryUseRelatedObject(_obj);
				if (!_o)
					return null;
				this.calculateRelatedTop(_o, _position, _obj);
				_o.locate = true;
				if (this.direction === 'left')
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
				else
					_o.xGap += MathRound((_obj.pushObject ? (_o.width * _o.zoom) : this.getWidth()) / 2);
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
					cssAnimations[_obj.key](this, _obj.p1 ?? (this.getScreenLeft() - this.getOriginDistance()), _obj.p2 ?? ((_canvas.height - (this.yGap + this.yPosition)) - this.getHeight()), _obj.p3 ?? this.getWidth(), _obj.p4);
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
								if (this.direction === 'right')
									_o.left = _left + (_p.x * this.getZoom());
								else
									_o.left = (_left - (_p.x * this.getZoom())) - (_o.width * _o.zoom);
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
		if (_obj.bind && typeof _obj.bind === 'string')
			_o.bind = _obj.bind;
		else if (_obj.bind !== undefined)
			_o.bind = _obj.bind ? this.animation : undefined;
		else if (_o?.bind || _obj.bind)
			_o.bind = this.animation;
		return _o;
	}
	this.calculateRelatedTop = function (_o, _position, _obj) {
		if (!_obj)
			_obj = _o.object;
		switch (_position) {
			case 'behind-feet':
				_o.top = (this.getTop() + this.getHeight()) -
					MathRound(_o.height * _o.zoom) + MathRound((_obj.bottom ?? 0) * _o.zoom);
				break;
			case 'screen-top':
				_o.top = 0;
				break;
			case 'under-feet':
				_o.top = (this.getTop() + this.getHeight()) -
					MathRound((_o.height * _o.zoom) / 2) + MathRound((_obj.bottom ?? 0) * _o.zoom);
				break;
			case 'around':
				_o.top = this.getTop();
				break;
			case 'middle-feet':
				_o.top = (this.getTop() + this.getHeight()) -
					MathRound(_o.height * _o.zoom) + MathRound((_obj.bottom ?? 0) * _o.zoom);
				break;
			case 'front-feet':
				_o.top = (this.getTop() + this.getHeight()) -
					MathRound(_o.height * _o.zoom) + MathRound((_obj.bottom ?? 0) * _o.zoom);
				break;
			case 'over-head':
				_o.top = this.getTop() -
					MathRound((_o.height * _o.zoom) / 2) + MathRound((this.getCurrentFrame().headPositionY ?? 0) * this.getZoom());
				break;
			case 'middle-head':
				_o.top = MathRound(this.getTop() -
					(_o.height * _o.zoom) - ((_o.bottom ?? 0) * _o.zoom)) + MathRound((this.getCurrentFrame().headPositionY ?? 0) * this.getZoom());
				break;
			case 'front-head':
				_o.top = this.getTop() -
					MathRound((_o.height * _o.zoom) / 2) + MathRound((this.getCurrentFrame().headPositionY ?? 0) * this.getZoom());
				break;
			case 'behind-head':
				_o.top = this.getTop() -
					MathRound((_o.height * _o.zoom) / 2) + MathRound((this.getCurrentFrame().headPositionY ?? 0) * this.getZoom());
				break;
			case 'middle-bottom':
				_o.top = (_canvas.height - this.yGap - this.yPosition) -
					MathRound((_o.height * _o.zoom));
				break;
			case 'middle-top':
				_o.top = (_canvas.height - this.yGap - this.yPosition) -
					(this.getHeightWithoutGap(1) - MathRound((_o.height * _o.zoom)));
				break;
			case 'middle':
				_o.top = this.getTop() + MathRound(this.getHeightWithoutGap() / 2) -
					MathRound((_o.height * _o.zoom) / 2) - ((_obj.bottom ?? 0) * _o.zoom) - ((_o.bottom ?? 0) * _o.zoom);
				break;
			case 'middle-front':
				_o.top = this.getTop() + MathRound(this.getHeightWithoutGap() / 2) -
					MathRound((_o.height * _o.zoom) / 2) - ((_obj.bottom ?? 0) * _o.zoom) - ((_o.bottom ?? 0) * _o.zoom);
				break;
			case 'middle-behind':
				_o.top = this.getTop() + MathRound(this.getHeightWithoutGap() / 2) -
					MathRound((_o.height * _o.zoom) / 2) - ((_obj.bottom ?? 0) * _o.zoom) - ((_o.bottom ?? 0) * _o.zoom);
				break;
			default:
				if (_position.y)
					_o.top = ((_canvas.height - this.yGap - this.yPosition) - this.getHeight()) +
						(_position.y * this.getZoom());
				break;
		}
	}
	this.getScreenLeft = function () {
		return this.left - (this.main ? 0 : platformX);
	}
	this.getExactLeft = function () {
		return this.getScreenLeft() - this.getOriginDistance();
	}
	this.getOriginLeft = function (_frame) {
		return this.getScreenLeft() + ((_frame ?? this.getCurrentFrame()).spriteOrigin * this.getZoom());
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
		let _rate = _knocker.keyboard?.getXMove()?.name ? (this.related ? 1 : 2) : 1;
		if (_knocker.knockback && typeof _knocker.knockback === 'number')
			_rate = _knocker.knockback;
		let _p = _f.push ?? _f.atk?.push;
		if(!(_p && (typeof p === 'number')))
			_p = 1;
		else if (_p && (typeof p === 'number'))
			_p = ((_p - 1) / 2)  + 1;
		const _push = MathRound(_canvas.width * (((_p ?? 1) * _rate) / 100));
		let _enemies = [_enemy];
		if (!_enemies[0])
			_enemies = _knocker.finishTarget ? [_knocker.finishTarget] : episode.getAvailableEnemies(_knocker)?.filter(x => x.attacker === _knocker || x.pushingBy === _knocker);
		if (_enemies?.[0])
			for (var _e of _enemies) {
				if (_e.dead || (_e.knockbacking && _e.dying) || _e.noCC)
					continue;
				const _skillName = (_e.isDead() && _e.animations.deadfly) ? 'deadfly' : 'knockback' + (_e.getCurrentAnimation().hurt ?? _f.attack?.hurt?.type ?? 'air');
				if(_skillName === 'deadfly') {
					_e.animate(_skillName);
					continue;
				} 
				else if (_knocker.start < 1 && !_enemy) {
					_e.iframe = false;
					continue;
				}
				else if (_knocker.start === 1 || _enemy) {
					_e.animate(_skillName);
					_e.direction = _knocker.direction === 'right' ? 'left' : 'right';
					if (_e.dying)
						_e.knockbacking = true;
					if (_f.atk?.hurt?.next === 'dead')
						_e.getCurrentAnimation().next = 'dead';
				}
				const _step = MathCeil((_push * ((_f.speed - _knocker.start) / _f.speed)) / 100);
				if (_step) {
					_e.pushingBy = _knocker;
					_e.pushBack = true;
					const _eo = _e.getScreenLeft();
					const _to = _knocker.getScreenLeft();
					if (this.push === 'front')
						_e.pushDirection = this.direction;
					else if (this.push === 'back')
						_e.pushDirection = this.direction === 'right' ? 'left' : 'right';
					else if(_to > _eo && _f.atk?.aoe)
						_e.direction = _e.pushback = _e.pushDirection = 'right';
					else if(_to <= _eo && _f.atk?.aoe)
						_e.direction = _e.pushback = _e.pushDirection = 'left';
					else if (_eo > _to && _knocker.direction === 'right')
						_e.pushDirection = _knocker.direction;
					else if (_to > _eo && _knocker.direction === 'left')
						_e.pushDirection = _knocker.direction;
					else
						_e.pushDirection = undefined;
					const _range = episode.pvp ? 0 : this.getRangeBetween(_e);
					_e.pushRate = ((!_e.animations[_skillName] && !_e.attackingOnlyBy && _e.defaultDirection === 'right') ? -1 : 1) * (_step + (_range / 10));
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
		})?.filter(x => x.attacker == (this.related ?? this) || x == this.finishTarget);
		if (_enemies?.[0])
			for (var _e of _enemies) {
				if (_e.health <= 0 || _e.dead || (_e.knockbacking && _e.dying) || _e.release || _e.noCC)
					continue;
				const _anima = this.getCurrentAnimation();
				if (_e.class === 'boss' && _e.getCurrentFrame().def?.iframe)
					continue;
				if (_f.extraStepYRate && _f.push !== 'x')
					_e.extraStepYRate = this.extraStepYRate;
				if (_f.extraStepXRate && _anima.useExtraStepXRate) {
					if (!_e.aoe && this.direction === 'left' && _e.getScreenLeft() > (this.getScreenLeft() + this.getWidth()))
						continue;
					if (!_e.aoe && this.direction === 'right' && (_e.getScreenLeft() + _e.getWidth()) < this.getScreenLeft())
						continue;
					if (this.pushDirection)
						this.direction = this.pushDirection;
					_e.pushDirection = this.direction;
					let _left = (((_canvas.width * (Math.abs(_f.extraStepXRate) / 100))) + ((_f.leftGap ?? 0) * (this.related ?? this).getZoom()));
					_e.pushingBy = this;
					_e.direction = this.direction === 'right' ? 'left' : 'right';
					_e.pushRate = _e.calculateEasing(_e.getCurrentFrame(), ((100 * (_left ?? 0)) / _canvas.width) * (_e.defaultDirection !== 'right' ? 1 : -1));
					if (_f.push === 'reversed') {
						const _t = isObjectsInTouch(this, _e, 100);
						if (_t.touch)
							_e.pushRate = 0;
						else
							_e.pushRate *= -1;
					}
				}
			}
	}
	this.getOriginDistance = function () {
		const _frame = this.getCurrentFrame();
		if (this.direction !== this.defaultDirection)
			return this.getWidth() - (_frame.spriteOrigin * this.getZoom());
		return (_frame.spriteOrigin * this.getZoom());
	}
	this.checkFinishingMoveAvailable = function (_anima) {
		const _close = this.getClosestEnemy(30, this.direction, function (_e) {
			return _e.finishableWith && !_e.release;
		});
		const _enemy = _close?.enemy;
		if (this.main) {
			if (this.hasFinishingMove && !_anima.finishingMove && _enemy && !_enemy.gradeLeft && !_enemy.invulnerable && _enemy.health > 0 && (_enemy.health * (100 / (_enemy.finishAfter ?? __finishingMoveHPPercent))) <= _enemy.getMaxHP() && !_enemy.dying && !_enemy.dead) {
				const _finishingMoves = _enemy.finishableWith.split(',');
				const _f = this.upcomingFinishingMove ?? _finishingMoves[getRandomValue(0, _finishingMoves.length - 1)];
				const _finishAnima = this.animations['finish' + _f];
				if(_finishAnima && (!_finishAnima.when || _finishAnima.when(_enemy))) {
					_close.range = (_close.range / _canvas.width) * 100;
					if(!_finishAnima || ((_finishAnima.minRange??0) > _close.range) 
						|| ((_finishAnima.maxRange??30) < _close.range))
					{

					}
					else {
						this.upcomingFinishingMove = _f;
						const _actions = document.querySelectorAll('.action:not(#skill9,.d-none)');
						if (!_actions?.[0]) {
							removeClass(_finishingMove, 'd-none');
							if (this.target)
								this.target.targeted = false;
							_enemy.targeted = true;
							this.target = _enemy;
							return;
						}
					}
				}
			}
			addClass(_finishingMove, 'd-none');
			if (this.target)
				this.target.targeted = false;
			this.upcomingFinishingMove = this.target = undefined;
		}
	}
	this.getEnemyKillingBy = function () {
		const _kb = episode.enemies.find(x => x == this.finishTarget && !x.dead && x.health > 0);
		if (_kb)
			return [{ enemy: _kb }];
		return undefined;
	}
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
					spriteHeight: this.getHeight(),
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
	this.getAtackableUnits = function (_anima, _frame) {
		const _enemies = this.getEnemyKillingBy() ?? this.getEnemiesInTouch(_anima, 10);
		const units = [];
		if (_enemies?.[0])
			for (var _en of _enemies) {
				const _enemy = _en.enemy;
				if (_enemy.finishing && this.finishTarget != _enemy)
					continue;
				if ((_enemy.knockbacking && _enemy.dying) || _enemy.dead || _enemy.release || _enemy.invulnerable || _enemy.iframe)
					continue;
				if (!_enemy.attackingOnlyBy === this.key && !_enemy.aoe && this.direction === 'left' && _enemy.getScreenLeft() > this.getScreenLeft())
					continue;
				if (!_enemy.attackingOnlyBy === this.key && !_enemy.aoe && this.direction === 'right' && _enemy.getScreenLeft() < this.getScreenLeft())
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
		return !this.main && !this.friendly && !this.alp && this.class !== 'object' && 
		this.class !== 'boss' && !this.isDead();
	}
	this.attack = function (_anima, _frame) {
		(this.related ?? this).removeBuffByKey('invisibility');
		const _enemies = this.getAtackableUnits(_anima, _frame);
		episode.enemies?.forEach(x => {
			if (x.pushingBy == this || x.attacker == (this.related ?? this)) {
				if (!_enemies?.find(y => y == x)) {
					if (x.pushingBy?.class === 'spell' && x.pushingBy.push)
						return;
					x.pushingBy = x.attacker = undefined;
				}
			}
		});
		let _enemyHurted = false;
		if (_enemies?.[0]) {
			for (var _en of _enemies) {
				const _enemy = _en.enemy;
				if(_enemy.isDead())
					continue;
				const _enemyFrame = _enemy.getCurrentFrame();
				if (((_enemy.attackingOnlyBy && _enemy.attackingOnlyBy !== this.key && this.class !== 'spell') || _enemyFrame.def?.iframe || _enemy.iframe || _enemy.reviveTime) && _enemy.health > 0)
					continue;
				const _enemyAnima = _enemy.getCurrentAnimation();
				const hurtEnemy = function (_t, _f, _e, _ef, _ea, _tp, _ep) {
					if (_ea.key.startsWith('dead') || _ea.key === 'release')
						return false;
					if (_f.atk?.buffs)
						_f.atk.buffs.forEach(x => _e.addBuff(x, msNow));
					if (_f.atk.rate > 0)
						(_t?.owner ?? _t?.related ?? _t).increaseHitCount();
					else
						return false;
					if(!episode.pvp && episode.enemies?.filter(x => x.autoTarget === _e && x.attacked && x.animations[x.animation].attack)?.length > __maxAttackedCount)
						return false;
					const _prevAutoMode = _e.autoMode;
					if (!_e.main && !_e.friendly) {
						if (_e.groupId)
							episode.enemies.filter(x => x.groupId === _e.groupId).forEach(x => {
								x.setAutoMode(2);
							});
						else
							_e.setAutoMode(2);
					}
					if (_e.immunities?.[0])
						if (!_f.atk.type || _e.immunities.indexOf(_f.atk.type) !== -1) {
							dmgFrames.push({
								//text: '<p data-text="IMMUNE">IMMUNE</p>',
								//class: 'dmg dmg-orange effect-immune',
								text: 'IMMUNE',
								x: _e.getLeft(),
								y: _canvas.height - _e.yPosition - _e.getHeight()
							});
							return false;
						}
					if (_prevAutoMode === 2 && !_e.keyboard && _e.animations.block && _e.fatique >= fatiqueDecreasement) {
						if (_e.animation === 'run' || _e.animation === 'walk' ||
							_e.animation === 'idle') {
							if (_e.checkBlock(_t)) {
								_e.animate('block', 1);
								_e.decreaseFatique(_t);
								_e.autoAttacking = true;
								_e.setAutoTarget(_t);
								return false;
							}
						}
					}
					else if (_prevAutoMode === 2 && !_e.keyboard && _e.animations.roll && (_e.animations.roll.charge > 0 || _e.animations.roll.charge === undefined)
						&& (!_e.animations.roll.rate || (getRandomValue(1, 100) <= _e.animations.roll.rate))) {
						if (_e.animation === 'run' || _e.animation === 'walk' ||
							_e.animation === 'idle') {
							_e.animate('roll', 1);
							_e.setAutoTarget(_t);
							_e.autoAttacking = true;
							return false;
						}
					}
					else if (_e.animation === 'dodge' || (_prevAutoMode === 2 && !_e.keyboard && _e.animations.dodge && !(_e.animations.dodge.coolDownLeft > 0) && 
					(!_e.animations.dodge.rate || (getRandomValue(1, 100) <= _e.animations.dodge.rate)))) {
						if (_e.animation === 'run' || _e.animation === 'walk' || _e.animation === 'idle'){
							_e.animate('dodge', 1);
							_e.setAutoTarget(_t);
							_e.autoAttacking = true;
							return false;
						}
					}
					if (_f.atk.hurt) {
						_e.removeBuffByKey('invisibility');
						if(_e.sleep) {
							_e.removeBuffByKey('sleep');
							delete _e.sleep;
						}
						if(_f.atk.hurt.do)
							_f.atk.hurt.do(_f, _t, _e);
						if (!_e.alp && _f.atk.hurt.catch === 'back' && _e.direction !== _t.direction)
							_e.direction = _e.direction === 'left' ? 'right' : 'left';
						else if (!_e.alp && _f.atk.hurt.catch === 'front' && _e.direction === _t.direction)
							_e.direction = _e.direction === 'left' ? 'right' : 'left';
						if (_f.atk.hurt.sound)
							episode.playSound({ key: _e.class + _f.atk.hurt.sound, owner: _e }, [_f.atk.hurt.sound]);
						if (_f.atk.hurt.props) {
							const _dying = _e.dying;
							_e.setProps(_f.atk.hurt.props);
							if (!_dying && _e.dying)
								_e.killingBy = _t.key;
						}
						if(_f.atk.hurt.smash && _e.isSmashable()) {
							if(!_e.animations.hurtfeet)
								_e.animations.hurtfeet = new animation(createHurtFeet(_e.zoom));
							_e.animate('hurtfeet', 1);
							if(_t.talkCount && (msNow - (_t.lastTalkTime ?? 0) > 10000)) {
								_t.lastTalkTime = msNow;
								episode.playSound({path:'./images/talks/' + _t.class + '/' + getRandomValue(1, _t.talkCount) + '.mp3', volume: 1 });
							}
							return true;
						}
						else if(_e.phased) {
							if(_f.atk.hurt.smash)
								_e.phased = 0;
							else
								_e.phased--;
							if(_e.phased > 0) {
								const _hurtAnim = _e.animations['phase' + _e.phased];
								const _src = _hurtAnim.frames[0].src ?? _hurtAnim.src;
								if(_src) {
									_e.animations.idle.src = _src;
									_e.animations.idle.resetImage();
								}
								_e.animations.idle.frames = [{
									speed: 999,
									spriteLeft: _hurtAnim.frames[0].spriteLeft,
									spriteTop: _hurtAnim.frames[0].spriteTop,
									spriteWidth: _hurtAnim.frames[0].spriteWidth,
									spriteHeight: _hurtAnim.frames[0].spriteHeight,
									spriteOrigin: _hurtAnim.frames[0].spriteOrigin
								}];
								_e.animations.hurtground1 = _hurtAnim;
								_e.animations.hurtground1.key = 'hurtground1';
								_e.animate('hurtground1', 1);
							}
							else
								_e.animate('dead', 1);
						}
						const _hasReflect = _e.reflect;
						if(_hasReflect)
							dmgFrames.push({
								//text: '<p data-text="REFLECT">REFLECT</p>',
								//class: 'dmg dmg-orange effect-reflect',
								text: 'REFLECT',
								x: _e.getLeft(),
								y: _canvas.height - _e.yPosition - _e.getHeight()
							});
						if (!_e.hurting?.count) {
							if (_f.atk.hurt.spells)
								for (var _fsp of _f.atk.hurt.spells)
									_e.throwSpell({ spell: _fsp }, _t.parentKey ?? _t.key);
							_f.atk.hitTaken = _f.atk.hitTaken ?? 1;
							if (_f.atk.hitTaken > 0) {
								if (_ea.hurt) {
									if (_e.hitTakenCount === undefined)
										_e.hitTakenCount = 0;
									_e.hitTakenCount += _f.atk.hitTaken;
									_e.increaseRage(_f.atk.hitTaken);
								}
								else
									_e.hitTakenCount = _f.atk.hitTaken;
							}
							let _erelease;
							if (!_e.isDead() && !_e.still && _e.hitTakenCount > ((episode.war ? 2 : 1) *_e.releaseAfter) && _e.class !== 'object')
							{
								_erelease = true;
								if(_e.animations.release?.reversed) {
									if(_e.getExactLeft() < _t.getExactLeft())
										_e.direction = 'right';
									else
										_e.direction = 'left';
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
							_t.attacked = 1;
							if (_t?.related)
								_f.atk.hurt.objects?.forEach(x => _e.addObject(x));
							const _cced = _f.atk.hurt.type !== 'common' && (!_ep || _tp < _ep);
							if ((_erelease || _f.atk.hurt.key) && _cced) {
								if (_erelease) {
									episode.playSound({ key: 'release', volume: .3});
									if(_e.animations.release)
										_e.animate('release', 1);
									else
										_e.addBuff({ key: 'release', level: 3, ms: 3000 });
								}
								else {
									let _animateSkill = _e.cc ?? _f.atk.hurt.key;
									if (!_e.animations[_animateSkill])
										_animateSkill = 'hurtground1';
									//if (!_e.animations[_animateSkill]?.frames?.find(x => x.sound))
									//	episode.playSound({ owner: _e, key: (_e.main ? _e.class : _e.name.toLowerCase()) + (_e.main ? _animateSkill : 'hurt') }, ['hurt']);
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
										_e.animate(_animateSkill);
									}
								}
							}
							_e.hurting = { hit:1 };
							_e.hurtColor = _f.atk.type === 'fire' ? '#E25822' : (_f.atk.type === 'toxic' ? '#66cc1a' : '#ffffff');
							_e.hurting.count = _e.hurtColor ? ((_f.atk.type === 'fire' || _f.atk.type === 'ice' || _f.atk.type === 'toxic') ? 3 : 4) : 3; // _e.getCurrentFrame().speed;
							if(_e.size === 'big')
								_e.hurting.count = MathCeil(_e.hurting.count / 2);
							if(_t.charging)
								_t.addObject({ key: 'impact', position: 'css', p2: _t.direction });
							if (!_e.noCC && !_e.still && !_e.finishing && _cced && !_erelease && (_hurtType ?? (_e.animations[_e.cc]?.hurt ?? _f.atk.hurt?.type)) === 'ground')
								_e.addObject({ key: 'stun', position: 'middle-head', yGap: -25 });
							if (_cced && _e.casting)
								_e.cancelCast();
							if(_cced && _e.main) 
								removeClass(_gamePad, 'zoom');
							if (_f.atk.rate) {
								if (!_f.atk.hurt.dead) {
									if ((_t.class === 'spell' || _t.start <= 1) && (_e.health > 0 && !_e.finishing)) {
										if (_f.atk.hurt.buffs)
											_f.atk.hurt.buffs.forEach(x => _e.addBuff(x, msNow));
										let _dmg = _t.getAtkRate(); 
										if(_f.atk.rate)
											_dmg *= (_t.alp ? _t.getSkillRate() : _f.atk.rate);
										if (_dmg < 1)
											_dmg = 1;
										var _calculatedCrit = (((_t.coopWith ?? _t).critRate) * ((100 - ((_e.coopWith ?? _e).critResistRate ?? 0))/100) * 100);
										if (getRandomValue(0, 10000) <= _calculatedCrit) {
											_dmg *= (2 + ((_t.critDmgRate ?? 0) / 100));
											if((_e.coopWith ?? _e).critDmgResistRate)
												_dmg *= ((100 - (_e.coopWith ?? _e).critDmgResistRate) / 100);
											_t.criticalHit = true;
											if (episode.pvp) {
												if (_t.dmgGiven === undefined)
													_t.dmgGiven = 0;
												_t.dmgGiven += _dmg;
											}
											if (_t.main)
												_e.addObject({
													key: 'crit', position: 'middle-front'
												});
										}
										else
											_t.criticalHit = false;
										const _newDmg = _t.calculateElementalDmg(_dmg, _e);
										let _dmgEffect;
										if(_newDmg > _dmg || (_f.atk.type && _f.atk.type !== 'common')) {
											_dmgEffect = _t.getElementalEffect(_e);
											_dmg = _newDmg;
										}
										_dmg = _t.calculateDmgReduce(_dmg, _e);
										if(_ef.def?.rate)
											_dmg *= (1 - _ef.def.rate);
										_dmg = MathCeil(_dmg);
										if(episode.war)
											_dmg *= 2;
										//_dmg = 1;
										_t.checkSteal(_dmg, _e);
										if (!_e.main) {
											if(_t.criticalHit)
											{
												dmgFrames.push({
													crit: 1,
													val: _dmg,
													x: _e.getLeft() + ((_e.direction === 'left' ? 1 : -1) * __dmgFrameDistance),
													y: _canvas.height - _e.yPosition - _e.getHeight() -  __dmgFrameDistance
												});
											}
											else
												dmgFrames.push({
													atkType: _f.atk?.type ?? _dmgEffect ?? 'common',
													val: _dmg,
													x: _e.getLeft(),
													y: _canvas.height - _e.yPosition - _e.getHeight()
												});
										}
										else
											dmgFrames.push({
												hurt:1,
												val: _dmg,
												x: _e.getLeft(),
												y: _canvas.height - _e.yPosition - _e.getHeight()
											});
										if (!_e.dmgTaken) {
											_e.dmgTaken = 0;
											if (_e.autoMode >= 0 && !(_t.related ?? _t).invulnerable) {
												if (_e.enemy)
													_e.setAutoMode(2);
												if(!_t.invulnerable)
													_e.setAutoTarget(_t);
											}
										}
										_e.dmgTaken += _dmg;
										if(!_e.inCombat)
											_e.inCombat = 1;
										if(_hasReflect)
											(_t.related ?? _t).decreaseHealth(_dmg, _e);
										else if(!_e.phased)
											_e.decreaseHealth(_dmg, _t.related ?? _t);
									}
									if (_f.objects)
										for (var _o of _f.objects)
											if (_o.hurt)
												_t.addObject(_o);
								}
							}
							if (__account.options.gore && _f.atk?.type !== 'fire' && (_e.bleed || _e.bleed == undefined)) {
								_e.addObject({
									key: 'bloodfx' + (_e.bloodColor ?? '') + getRandomValue(1, 8),
									reset: true,
									pushObject: true,
									position: 'middle'
								});
								if(__account.options.sound) {
									const _bloodSound = getSound(null, 'blood');
									if (_bloodSound.currentTime > 0)
										_bloodSound.currentTime = 0;
									_bloodSound.crossOrigin = 'anonymous';
									_bloodSound.volume = .05;
									_bloodSound.play();
								}
								_e.setBleedEffect(_f, _anima, _t);
							}
						}
						if (_t.knockback || _f.knockback)
							_t.knockBackEnemies(_f, _e);
					}
					return true;
				}
				let _enemyPriority = _enemyFrame.priority ?? _enemyAnima.priority, _thisPriority = _frame.priority ?? _anima.priority;
				if (_enemyFrame?.atk) {
					if (_enemyPriority === _thisPriority) {
						if (this.class !== 'spell' && _enemy.class !== 'spell' && _enemy.direction !== this.direction && getRandomValue(1, 10) === 1) {
							_enemy.animate('dash');
							this.animate('dash');
							this.addObject({
								key: 'glow',
								position: 'middle'
							});
							_enemy.addObject({
								key: 'glow',
								position: 'middle'
							});
							episode.playSound({ key: this.class + 'block', owner: this }, 'block');
							return;
						}
					}
					if (_thisPriority < (_enemyPriority ?? 10)) {
						_enemyHurted = hurtEnemy(this, _frame, _enemy, _enemyFrame, _enemyAnima);
						if (this.class === 'spell' && !this.pierce && this.animation !== 'dead')
							this.animate('dead', 6);
					}
					else if (this.class === 'spell' && !this.pierce && this.animation !== 'dead')
						this.animate('dead', 7);
				}
				else if (_enemy.animations['counter'] && _enemy.newBlocked > 0 && _enemy.newBlocked <= counterAttackTolerance) {
					_enemy.newBlocked = _enemy.blocked = false;
					_enemy.animate('counter');
				}
				else if (_enemy.blocked && _thisPriority >= 1) {
					_enemy.animate('hurtblock');
					const _decreased = _enemy.decreaseFatique(this);
					if (!_decreased) {
						_enemyHurted = hurtEnemy(this, _frame, _enemy, _enemyFrame, _enemyAnima);
						if (_enemy.blocked)
							this.addObject({
								key: 'glow',
								position: 'middle'
							});
						_enemy.blocked = false;
					}
					else
						episode.playSound({ owner: this, key: _enemy.class + 'block' }, 'block');
				}
				else if ((!_enemy.dying || (_enemy.dying && this.key == _enemy.killingBy)) && (_thisPriority < (_enemyPriority ?? 10))) {
					_enemyHurted = hurtEnemy(this, _frame, _enemy, _enemyFrame, _enemyAnima);
					if (this.class === 'spell' && !this.pierce && this.animation !== 'dead')
						this.animate('dead', 8);
				}
				else if (this.class === 'spell' && !this.pierce && this.animation !== 'dead')
					this.animate('dead', 9);
				else
					_enemyHurted = hurtEnemy(this, _frame, _enemy, _enemyFrame, _enemyAnima, _thisPriority ?? 10, _enemyPriority ?? 10);
				if (_enemy.direction === this.direction && !this.friendlyFire && !this.pushingBy && (_enemy.autoMode || (_enemyHurted || _enemy.hurting || _enemy.blocked))) {
					if (_enemy.class !== 'spell' && !_enemy.dying && !_enemy.dead && !_enemy.release) {
						if(_enemy.enemy && !episode.pvp) {
							const _enemyOrigin = _enemy.getScreenLeft();
							const _thisOrigin = this.getScreenLeft();
							if (_enemyOrigin > _thisOrigin)
								_enemy.direction = 'left';
							else
								_enemy.direction = 'right';
						}
						if(!this.invulnerable)
						_enemy.setAutoTarget(this);
					}
				}
				if (_enemyHurted && !_enemy.isDead())
					(this.related ?? this).increaseRage(_frame.atk.rate);
			}
		}
		return _enemyHurted;
	}
	this.setBleedEffect = function(_f, _anima, _t) {
		for (var i = 0; i < 1; i++) {
			const ygap = (getRandomValue(0, 5) * 10) - 30 +
				((_f.bleed ?? _anima.bleed) === 'up' ? -30 : 0) +
				((_f.bleed ?? _anima.bleed) === 'down' ? 30 : 0);
			var _bloodDistance = getRandomValue(MathRound(this.getWidth() / 3), MathRound(this.getWidth() / 3) + 150);
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
				this.relatedObjects[this.relatedObjects.length - 1].xGap += this.getWidth();
			if (object) {
				object.zoom *= getRandomValue(2, 40) / 72;
				object.speed = getRandomValue(2, 4) * 500;
			}
		}
	}
	this.getElementalEffect = function(_enemy) {
		const _apply = getRandomValue(1, 5) < 2;
		if(_apply) {
			const _elementals = [
				{ key: 'fire', value: this.fireDmgRate ?? 0 },
				{ key: 'ice', value: this.iceDmgRate ?? 0 },
				{ key: 'lightning', value: this.lightningDmgRate ?? 0 },
				{ key: 'toxic', value: this.toxicDmgRate ?? 0 },
			];
			const _max = _elementals.sort((a, b) => b.value - a.value)[0];
			if(_max.value > 0)
			{
				switch(_max.key) {
					case 'fire':
						_enemy.addBuff({ key: 'fire', level: 1 });
						break;
					case 'toxic':
						_enemy.addBuff({ key: 'poison', level: 1 });
						break;
					case 'ice':
						_enemy.addBuff({ key: 'ice', level: 1 });
						break;
					case 'lightning':
						episode.playSound({key: 'electric', reset: true });
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
		if(getRandomValue(1, 100) <= (this.stealChanceRate ? this.stealChanceRate : 10)) {
			this.increaseHealth(_dmg * (this.stealRate / 100));
			dmgFrames.push({
				text: '+HP',
				class: 'effect-steal',
				x: this.getLeft(),
				y: _canvas.height - this.yPosition - this.getHeight()
			});
		}
	}
	this.calculateElementalDmg = function(_dmg, _enemy) {
		if(this.fireDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('fire') === -1)))
			_dmg += (this.fireDmg - (this.fireDmg * ((_enemy.fireResistRate ?? 0) / 100)));
		if(this.iceDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('ice') === -1)))
			_dmg += (this.iceDmg - (this.iceDmg * ((_enemy.iceResistRate ?? 0) / 100)));
		if(this.toxicDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('toxic') === -1)))
			_dmg += (this.toxicDmg - (this.toxicDmg * ((_enemy.toxicResistRate ?? 0) / 100)));
		if(this.lightningDmg > 0 && (!_enemy.immunities || (_enemy.immunities.indexOf('lightning') === -1)))
			_dmg += (this.lightningDmg - (this.lightningDmg * ((_enemy.lightningResistRate ?? 0) / 100)));
		return _dmg;
	}
	this.calculateDmgReduce = function(_dmg, _e) {
		const _char = this.coopWith ?? this;
		const _enemy = _e.coopWith ?? _e;
		let _enemyDef = _enemy.getDefRate();
		if(_char.pierceRate > 0)
			_enemyDef -= (_enemyDef * (_char.pierceRate / 100));
		_dmg -= ((_enemyDef / (_dmg + _enemyDef)) * _dmg);
		return _dmg;
	}
	this.checkHug = function () {
		return;
		if (this.keyboard?.getMove())
			return;
		const _enemies = this.getAtackableUnits();
		const _x = this.getLeft() + this.getWidth();
		const _tol = (this.width * this.getZoom()) / 3;
		for (var _en of _enemies) {
			const _dist = _en.dist;
			if (_dist == undefined)
				continue;
			if (_dist < (this.getWidth() / 2)) {
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
							const _y = _e.getLeft() + _e.getWidth();
							if (this.direction === 'left' && _x > _y) {
								if ((_x - _y) > _tol)
									continue;
							}
							else if (this.direction === 'right' && _y > _x)
								if ((this.getLeft() - _e.getLeft()) > _tol)
									continue;
							if (_e.direction === this.direction)
								_e.direction = this.direction === 'left' ? 'right' : 'left';
							_e.animate('hurthug', 1);
							_e.yPosition = this.yPosition - 1;
							_e.attackingOnlyBy = this.key;
							episode.enemies?.filter(x => x.attacker == this || x.pushingBy == this)?.
								forEach(x => x.attacker = x.pushingBy = undefined);
							const _skill = this.modifySkill('hug');
							this.animate(_skill, 1);
							_e.left = this.getScreenLeft() + (_e.main ? 0 : platformX) +
								MathRound((this.getWidth() - _e.getWidth()) / 2) -
								((this.direction === 'right' ? -1 : 1) * MathRound(.25 * _e.getWidth()));
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
	this.increaseRage = function (_point) {
		if (!this.animations.air2 || !this.animations.air2.ultimate)
			return;
		if (this.skills['air2']?.locked || this.animations[this.animation].ultimate)
			return;
		if (this.rage)
			return;
		if ((this.rageCount ?? 0) < 0)
			this.rageCount = 0;
		if (this.rageCount < this.getMaxRageCount())
			this.rageCount += (_point ?? 1);
		if (!rageSkill)
			rageSkill = document.getElementById('skill6');
		if (this.rageCount > this.getMaxRageCount())
			this.rageCount = this.getMaxRageCount();
		this.updateRageSkillUI();
	}
	this.useRage = function () {
		if (!this.rage)
			return;
		if (this.getCurrentAnimation()?.ultimate)
			return;
		if ((msNow - this.rage) > 999) {
			if(this.rageCount === this.getMaxRageCount())
				this.rageCount -= (this.rageDecreasement ?? (this.getMaxRageCount() / 10));
			this.rageCount -= (this.rageDecreasement ?? (this.getMaxRageCount() / 10));
			this.rage = msNow;
			this.updateRageSkillUI();
		}
	}
	this.updateRageSkillUI = function (_doNotResetSkills) {
		if (!rageSkill)
			rageSkill = document.getElementById('skill6');
		if (this.rageCount < 0)
			this.rageCount = 0;
		if (this.main)
			rageSkill.style = 'background:url(./images/main/skill-icons/air2.png), linear-gradient(0deg, red ' + MathRound(this.rageCount * (100 / this.getMaxRageCount())) + '%, black 0%); background-size:contain';
		else if(this.hasRageBar){
			const _bar = document.getElementById('ragebar-hb-' + this.key);
			if(_bar)
				_bar.style.width = MathRound(this.rageCount * (100 / this.getMaxRageCount())) + '%';
		}
		if (this.rageCount === 0) {
			this.rage = this.ultimate = this.shadowData = undefined;
			if(this.alp || episode.pvp)
				resetSkills(null, _doNotResetSkills, this);
			if (this.main) {
				removeUltimateCircle();
				removeClass(rageSkill, 'glow');
			}
			else if(this.hasRageBar)
				removeClass(document.getElementById('ragebar-hb-' + this.key), 'raging');
			return true;
		}
		else if (this.rageCount === this.getMaxRageCount()) {
			if(this.main)
				addClass(rageSkill, 'glow');
			else if(this.hasRageBar)
				addClass(document.getElementById('ragebar-hb-' + this.key), 'raging');
		}
		return false;
	}
	this.useCommonSkill = function (_order) {
		if(this.isDead() || this.deadTime || episode.pvp)
			return;
		const _item = __account.commonInventory[_order - 1];
		if (spells[_item.key]) {
			if (this.throwSpell({ spell: _item })){
				__account.commonInventory.splice(_order - 1, 1);
				this.checkCommonInventory();
			}
		}
		_client.saveState();
	}
	this.setAutoTarget = function (_e, _skipShare) {
		if (!this.autoTarget && _e && this.startSound) {
			if(!this.startSound.async) {
				this.upcomingAnimation = undefined;
				this.noAttack = true;
				const _s = this;
				this.startSound.end = function () {
					_s.noAttack = false;
				}
			}
			episode.playSound(this.startSound);
		}
		if (this.hasStation && ((_e.related ?? _e) !== this.autoTarget)) {
			const _diff = { at: (_e.related ?? _e).socketId, sy: 1 };
			this.setDefaultMessage(_diff);
			sendMessage(JSON.stringify(_diff));
		}
		const _shareWithGroup = !_skipShare && this.groupId && !this.autoTarget;
		if(!(_e.related ?? _e)?.invulnerable)
			this.autoTarget = _e.related ?? _e;
		if(_shareWithGroup)
			episode.enemies.filter(x => x.groupId === this.groupId).forEach(x => {
				x.setAutoTarget(_e, 1);
			});
	}
	this.throwSpell = function (_frame, _parentKey) {
		const _sp = _frame.spell ?? _frame.atk?.spell;
		if(Array.isArray(_sp)) {
			_sp.forEach(x => this.throwSpell({spell:x}, _parentKey));
			return;
		}
		if (_sp) {
			if (_parentKey) {
				if (this.lastSpellTakenKey !== _parentKey)
					this.lastSpellTakenKey = _parentKey;
				else
					return false;
			}
			const _spell = JSON.parse(JSON.stringify(spells[_sp.key]));
			const _dmgTypes = _spell.animations.idle.frames.
			filter(x => x.atk?.type && x.atk.type !== 'common')?.map(x => x.atk.type);
			const _animKeys = Object.keys(spells[_sp.key].animations);
			for(let _key of _animKeys)
				if(spells[_sp.key].animations[_key].frames.find(x => x.do))
					for(let _i = 0; _i < spells[_sp.key].animations[_key].frames.length; _i++)
						_spell.animations[_key].frames[_i].do = spells[_sp.key].animations[_key].frames[_i].do;
			let _enemy;
			if (_spell.autoAim) {
				_enemy = this.getClosestEnemy(_spell.autoAim, this.direction);
				if (!_enemy?.enemy)
					_spell.autoAim = false;
				else
					_enemy = _enemy.enemy;
			}
			_spell.direction = _spell.moveDirection = !_sp.reversed ? this.direction : (this.direction === 'right' ? 'left' : 'right');
			_spell.critRate = this.critRate;
			_spell.critDmg = this.critDmg;
			_spell.key = 'SPL-' + Math.random().toString().replace(/[.]/g, '');
			_spell.atk = this.atk * (_sp.atkRate ?? 1) * this.getSkillRate();
			_spell.health = _spell.maxHP = 1;
			_spell.enemy = this.enemy;
			_spell.friendly = this.friendly;
			_spell.main = false;
			_spell.related = this.related ?? this;
			if (_sp.bottomGap != undefined)
				_spell.top = _canvas.height - (_enemy ?? this).yPosition - ((_enemy ?? this).getZoom() * ((_enemy ?? this).yGap - _sp.bottomGap - (_spell.height ?? 0)));
			else
				_spell.top = _canvas.height - (_enemy ?? this).yPosition - ((_enemy ?? this).getZoom() * ((_enemy ?? this).yGap)) - (_enemy ?? this).getHeight();
			const _en = new enemy(_spell);
			if (_spell.push)
				_en.push = _spell.push;
			if (_sp.zoomRate)
				_en.zoom *= _sp.zoomRate;
			if(_sp.group)
				_en.spellGroup = _sp.group;
			if (_parentKey)
				_en.parentKey = _parentKey;
			if (_spell.noRelation)
				_en.related = undefined;
			_en.pierce = _sp.pierce ?? _spell.pierce;
			if(_dmgTypes?.[0])
			for(let _dt of _dmgTypes)
				_en[_dt + 'DmgRate'] = 1;
			_en.fireDmgRate = (_en.fireDmgRate ?? 0) + this.fireDmgRate;
			_en.lightningDmgRate = (_en.lightningDmgRate ?? 0) + this.lightningDmgRate;
			_en.toxicDmgRate = (_en.toxicDmgRate ?? 0) + this.toxicDmgRate;
			_en.iceDmgRate = (_en.iceDmgRate ?? 0) + this.iceDmgRate;
			_en.moveDirection = !_sp.reversed ? this.direction : (this.direction === 'right' ? 'left' : 'right');
			_en.yPosition = (_enemy ?? this).yPosition + ((_enemy ?? this).getZoom() * ((_enemy ?? this).yGap + (_sp.bottomGap ?? 0)));
			if(_spell.autoAim && _enemy)
				_en.yPosition = _enemy.yPosition;
			if (_en.animations.idle && !_en.animations.idle.priority)
				_en.animations.idle.priority = this.getCurrentAnimation().priority ?? 4;
			if (!_spell.autoAim)
				_en.left = ((this.direction === this.defaultDirection ? (this.defaultDirection === 'right' ? 1 : 0) : 0) * this.getWidth()) + this.getLeft() + platformX;
			else
				_en.left = _enemy.main ? _enemy.left + platformX : _enemy.left;
			if (_sp.xGap) {
				if (_en.moveDirection !== this.defaultDirection)
					_en.left -= (_sp.xGap * (_enemy ?? this).getZoom());
				else
					_en.left += (_sp.xGap * (_enemy ?? this).getZoom());
			}
			if (_sp.scale)
				_en.zoom *= _sp.scale;
			_en.speedRate = this.getSpeedRate();
			_en.started = _en.invulnerable = _en.located = true;
			_en.solid = false;
			episode.enemies.push(_en);
			return true;
		}
		return false;
	}
	this.tryUseRelatedObject = function (_o, _z) {
		this.relatedObjects = this.relatedObjects?.filter(x => !x.remove) ?? [];
		const _obj = relatedObjects?.find(x => x.id === _o.key);
		if (_obj) {
			const _clone = JSON.parse(JSON.stringify(_obj));
			let _anima = this.getCurrentAnimation();
			if(_anima.hurt)
				_clone.limit = 5;
			_clone.sprite = relatedObjectImages[_o.key]();
			if (_o.yGap)
				_clone.yGap = _o.yGap * __zoom * (_o.zoom ?? 1);
			if (!_clone.zoom)
				_clone.zoom = 1;
			_clone.zoom *= __zoom;
			if (_o.scale)
				_clone.zoom *= _o.scale;
			const _xg = MathRound((((_clone.width * _clone.zoom) - this.getWidth()) / 2) + (
				/*((this.direction !== this.defaultDirection) ? 1 : 1) * */(_o.xGap ?? 0) * _clone.zoom));
			if(_clone.xGap)
				_clone.xGap += _xg;
			else
				_clone.xGap = _xg;
			if (_clone.multiUse || _o.multiUse){
				_clone.id = _clone.id + Math.random().toString();
				if(!_clone.multiUse)
					_clone.multiUse;
			}
			if (this.relatedObjects.find(x => x.top === _clone.top && x.id === _clone.id && !x.remove))
				return _clone;
			let _arr = this.relatedObjects.filter(x => !x.remove && x.key === _o.key && !x.multiUse);
			const _length = _arr?.length ?? 0;
			if (!_length || _o.multiUse) {
				this.relatedObjects.push(_clone);
				_clone.pushDate = msNow;
			}
			else {
				const _current = _arr[0];
				_current.top = _clone.top;
				_current.xGap = _clone.xGap;
				_current.alpha = _clone.alpha;
				if (!_current.singleton || _current.reset)
					_current.start = _current.frame = 0;
				else if (_o.reset)
					_current.zoom = _clone.zoom;
				return _current;
			}
			if (_clone.limit) {
				let _clones = [];
				for (var _en of episode.enemies)
					if (_en.relatedObjects)
						for (var _ro of _en.relatedObjects) {
							if (_ro.key === _clone.key && !_ro.remove)
								_clones.push(_ro);
						}
				if (_clones.length > _clone.limit) {
					_clones = _clones.sort((a, b) => a.pushDate - b.pushDate);
					for (var i = 0; i < _clones.length - _clone.limit; i++)
						_clones[i].remove = true;
				}
			}
			return _clone;
		}
		return null;
	}
	this.isRelative = function () {
		if (this.main)
			return true;
		else if (this.related)
			return this.related.isRelative;
		return false;
	}
	this.calculateYStep = function () {
		return MathRound(_canvas.clientHeight / (this.alp ? 120 : getRandomValue(80, 120)));
	}
	this.calculateYStepAndMove = function (_solidity) {
		if(_solidity && _solidity.moveY === 0)
			return;
		if(!this.verticalStep)
			this.verticalStep = this.calculateYStep();
		if(this.autoStepYRate < 1)
			this.verticalStep *= this.autoStepYRate;
		const _moveY = this.solidOne ?? _solidity?.moveY;
		if ((this.moveDirection === 'up' || (_solidity && _moveY === -1)) && _moveY !== 1)
			this.yPosition += this.verticalStep;
		else if ((this.moveDirection === 'down' || (_solidity && _moveY === 1)) && _moveY !== -1)
			this.yPosition -= this.verticalStep;
	}
	this.render = function (_frame, _queue) {
		if(this.noDirection && (this.direction !== this.defaultDirection))
			this.direction = this.defaultDirection;
		else if((this.pushback === 'left' || this.pushback === 'right') && (this.direction !== this.pushback))
			this.direction = this.pushback;
		let _anima = this.getCurrentAnimation();
		let _speedRate = _anima.attack ? this.getSpeedRate() : 1;
		let _noXRate;
		if(this.autoMode > 0 && (this.animation === 'run' || this.animation === 'walk') && this.autoTarget && 
			isObjectsInTouch(this, this.autoTarget, 100)?.touch)
			_noXRate = 1;
		const _fps = this.getFps();
		if (_fps > 1 && !this.animations[this.animation].hurt)
			_speedRate /= _fps;
		this.extraStepYRate = (this.extraStepYRate ?? 0) + (_speedRate * (_frame.extraStepYRate ?? 0));
		let _stepY = MathRound(this.extraStepYRate * (_canvas.height / 100));
		const _solidity = this.isRunningAgainstSolidObject();
		if (!_anima) {
			this.idle(8);
			_anima = this.getCurrentAnimation();
			_frame = this.getCurrentFrame();
		}
		if (_anima.mobilityY && !this.still) 
			this.limitYPosition();
		let _xRate = 0, _extraX = ((this.extraStepXRate ? this.extraStepXRate : (_solidity?.moveX ? this.calculateMoveXStep() : 0)) ?? 0) * _speedRate;
		if (this.turned)
			_extraX = 0;
		else if ((this.moveDirection === 'down' || this.moveDirection === 'up') && this.keyboard && !this.keyboard.getXMove()?.name && !_solidity?.moveX)
			_extraX = 0;
		let _reversed = this.direction !== this.defaultDirection || this.reversed;
		if (!_anima.move || (_frame.extraStepXRate && (_anima.useExtraStepXRate || (!this.keyboard && !this.alp)) && (_anima.move && !_solidity)))
			_xRate = (_frame.extraStepXRate ?? 0) * _speedRate;
		let _stepX = _noXRate ? 0 : (((_extraX + (this.pushingBy ? (this.pushRate ?? 0) : 0) + (_xRate)) * _canvas.width) / 100);
		if (this.chargeProperties && !_noXRate)
			_stepX = this.chargeProperties.stepX * _speedRate;
		if (this.still || this.stop || _noXRate)
			_stepX = 0;
		_stepX = this.checkCenterOfScreen(_stepX, _anima.reversed);
		if(_solidity && _solidity.moveX === 0)
			_stepX = 0;
		//let _oldLeft = this.left;
		this.left = this.left + (((_reversed || _anima.reversed) && !(_reversed && _anima.reversed)) ? -1 * _stepX : _stepX);
		if (this.class !== 'spell' && !this.flying && !__storyCutScenePlaying) {
			if (this.left < ((this.yPosition / this.getMaxYPosition()) * minLeft))
				this.left = MathCeil((this.yPosition / this.getMaxYPosition()) * minLeft);
			else if (this.main && (this.left > (_canvas.width - ((this.yPosition / this.getMaxYPosition()) * maxLeft))))
				this.left = (_canvas.width - MathCeil((this.yPosition / this.getMaxYPosition()) * maxLeft));
			else if (this.enemy && (this.left > (episode.width - ((this.yPosition / this.getMaxYPosition()) * maxLeft))))
				this.left = (episode.width - MathCeil((this.yPosition / this.getMaxYPosition()) * maxLeft));
		}
		const _xDiff = ((_reversed ? -1 : 1) * (this.getZoom() * (_frame.leftGap ?? 0))) + ((_reversed ? 1 : -1) * (_frame.spriteOrigin * this.getZoom()));
		let _left = this.left + _xDiff;
		const _top = (_canvas.height - (_frame.spriteHeight * this.getZoom()) +
		MathRound((_frame.bottomGap ?? 0) * this.getZoom())) - _stepY - this.yPosition;
		if (this.turned)
			this.turned = false;
		let _invisible = (this.invisible && this.enemy) || (this.ghost && !this.main);
		if (_queue && (!this.unseen || (this.unseen && this.socketId) || (this.unseen && this.relatedObjects?.[0])) && !_invisible) {
			try {
				//let _oldYPosition = this.yPosition;
				if ((_anima.mobilityY || _noXRate) && !this.still)
					this.calculateYStepAndMove(_solidity);
				// _top -= this.yPosition;
				// _top -= _stepY;
				// const _coords = this.isRunningAgainstSolidObject2(this.left - _oldLeft, this.yPosition - _oldYPosition);
				// if(_coords && _coords.l !== 0) {
				// 	this.left = _oldLeft + (((_reversed || _anima.reversed) && !(_reversed && _anima.reversed)) ? - 1 * _coords.l : _coords.l);
				// 	_left = this.left + _xDiff;
				// }
				// if(_coords && _coords.t !== 0) {
				// 	_top += (this.yPosition - (_oldYPosition + _coords.t));
				// 	this.yPosition = _oldYPosition + _coords.t;
				// }
				// if(_coords && _coords.t !== 0){
				// 	console.log('1 - ' + _top + ', ' + _coords.t + ', ' + this.yPosition);
				// 	_top = _coords.t;
				// 	this.yPosition = MathRound(_canvas.height - _top - this.getHeight());
				// 	_oldYPosition = this.yPosition;
				// 	this.limitYPosition();
				// 	_top += (_oldYPosition - this.yPosition);
				// 	console.log('2 - ' + _top + ', ' + this.yPosition);
				// }
				if (_frame.objects)
					for (var _o of _frame.objects)
						if (!_o.hurt)
							this.addObject(_o);
				if (!this.release && this.attacker) {
					const _objects = this.attacker.getCurrentFrame().atk?.hurt?.objects;
					if (_objects)
						_objects.forEach(x => {
							if (x.crit && this.attacker.criticalHit && this.main)
								this.addObject(x);
							else if (!x.crit)
								this.addObject(x);
						});
				}
				if (!this.remove) {
					if (episode.enemies.find(x => x.receive) && (this.main || this.station))
						this.getNewStatus();
					const _drawIframe = this.class !== 'boss' && !this.invisible && !_anima.interactive && (_frame.alpha || (((_frame?.def?.iframe ?? this.iframe) || this.invulnerable ||
						this.release) && !this.isDead() && (this.class !== 'object' || this.remarkableObject) && this.class !== 'spell'));
					const _cut = _frame.positions?.find(x => x.key === 'stomach');
					const _cutX = _cut?.x ?? 0;
					const _cutY = _cut?.y ?? 0;
					if (this.drawHalf) { // && (_cutX || _cutY)) {
						_queue.push({
							skinColor: this.freeze ? '#a2d2df70' : _frame.color,
							dead: this.dead,
							drawPriority: this.drawPriority,
							targeted: this.targeted,
							sprite: _frame.src ? getImage(_frame.src) : (_anima.sprite ?? this.sprite),
							spriteX: _frame.spriteLeft,
							spriteY: _frame.spriteTop,
							alpha: _frame.alpha,
							zoom: _anima.zoom,
							interactive: _anima.interactive,
							spriteWidth: _frame.spriteWidth,
							spriteHeight: _frame.spriteHeight,
							shadow: this.chargeProperties || this.ultimate || _frame.shadow === 'red' || this.invisible,
							left: _left,
							top: _top,
							width: _frame.spriteWidth * this.getZoom(),
							height: (_frame.spriteHeight * this.getZoom()),
							yGap: _stepY ?? 0,
							reversed: _reversed,
							iframe: _drawIframe,
							objects: this.stop ? [] : this.relatedObjects,
							char: this
						});
						const _cutSpriteWidth = _cutX > 0 ? _cutX : _frame.spriteWidth;
						const _cutSpriteHeight = _cutY > 0 ? _cutY : _frame.spriteHeight;
						_queue.push({
							skinColor: this.freeze ? '#a2d2df70' : _frame.color,
							dead: this.dead,
							drawPriority: .5,
							targeted: this.targeted,
							sprite: _frame.src ? getImage(_frame.src) : (_anima.sprite ?? this.sprite),
							spriteX: _frame.spriteLeft,
							spriteY: _frame.spriteTop,
							alpha: _frame.alpha,
							zoom: _anima.zoom,
							interactive: _anima.interactive,
							spriteWidth: _cutSpriteWidth,
							spriteHeight: _cutSpriteHeight,
							shadow: this.chargeProperties || this.ultimate || _frame.shadow === 'red' || this.invisible,
							left: _left,
							top: _top,
							width: MathRound(_cutSpriteWidth * this.getZoom()),
							height: MathRound(_cutSpriteHeight * this.getZoom()),
							yGap: _stepY ?? 0,
							reversed: _reversed,
							iframe: _drawIframe,
							char: { yPosition: this.yPosition }
						});
					}
					else
						_queue.push({
							skinColor: this.freeze ? '#a2d2df70' : _frame.color,
							dead: this.dead,
							drawPriority: this.drawHalf ? .5 : this.drawPriority,
							targeted: this.targeted,
							sprite: _frame.src ? getImage(_frame.src) : (_anima.sprite ?? this.sprite),
							spriteX: _frame.spriteLeft,
							spriteY: _frame.spriteTop,
							alpha: _frame.alpha,
							zoom: _anima.zoom,
							interactive: _anima.interactive,
							spriteWidth: _frame.spriteWidth,
							spriteHeight: _frame.spriteHeight,
							shadow: this.chargeProperties || this.ultimate || _frame.shadow === 'red' || this.invisible,
							left: _left,
							top: _top,
							width: _frame.spriteWidth * this.getZoom(),
							height: (_frame.spriteHeight * this.getZoom()),
							yGap: _stepY ?? 0,
							reversed: _reversed,
							iframe: _drawIframe,
							objects: this.stop ? [] : this.relatedObjects,
							char: this
						});
				}
			}
			catch (xxxxxx) {
				console.log(xxxxxx.message);
			}
		}
		this.centerSolid = this.getCenterSolid();
	}
	this.getCenterSolid = function() {
		let _top = this.getTop();
		const _bottom = _top + this.getHeight(1);
		_top = _bottom - ((this.yGap ?? 10) * this.getZoom());
		const _srcLeft = this.getScreenLeft();
		const _left = _srcLeft - this.getOriginDistance();
		const _w = this.getWidth();
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
		return getGroundHeight() - (this.yGap * this.getZoom());
	}
	this.limitYPosition = function() {
		if (this.yPosition > this.getMaxYPosition())
			this.yPosition = MathFloor(this.getMaxYPosition());
		else if (this.yPosition < minPositionY)
			this.yPosition = minPositionY;
	}
	this.isRunningAgainstSolidObject2 = function(_sX, _sY) {
		if(this.main)
			return false;
		if(!this.animations.run && !this.animations.walk)
			return false;
		if(this.animation !== 'run' && this.animation !== 'walk')
			return false;
		const _stepX = MathAbs(_sX), _stepY = MathAbs(_sY);
		const _solids = episode.enemies.filter(x => x.centerSolid && x !== this && (x.solid && !x.isDead() && !x.remove /*|| (x.enemy && this.enemy && x.autoMode !== 0 && this.autoMode !== 0 && this.class !== 'object' && x.class !== 'object')*/) && !x.remove && !x.isDead());
		if(_solids?.[0]) {
			let _points = [];
			const _targetCenter = this.autoTarget?.centerSolid;
			_points.push({linc: -_stepX, l: this.centerSolid.l - _stepX, x:this.centerSolid.x - _stepX, t: this.centerSolid.t - _stepY, y: this.centerSolid.y - _stepY, tinc: -_stepY});
			_points.push({linc: -_stepX, l: this.centerSolid.l - _stepX, x:this.centerSolid.x - _stepX, t: this.centerSolid.t, y: this.centerSolid.y, tinc: 0});
			_points.push({linc: -_stepX, l: this.centerSolid.l - _stepX, x:this.centerSolid.x - _stepX, t: this.centerSolid.t + _stepY, y: this.centerSolid.y + _stepY, tinc: _stepY});
			_points.push({linc: 0, l: this.centerSolid.l, x:this.centerSolid.x, t: this.centerSolid.t - _stepY, y: this.centerSolid.y - _stepY, tinc: -_stepY});
			_points.push({linc: 0, l: this.centerSolid.l, x:this.centerSolid.x, t: this.centerSolid.t + _stepY, y: this.centerSolid.y + _stepY, tinc: _stepY});
			_points.push({linc: _stepX, l: this.centerSolid.l + _stepX, x:this.centerSolid.x + _stepX, t: this.centerSolid.t - _stepY, y: this.centerSolid.y - _stepY, tinc: -_stepY});
			_points.push({linc: _stepX, l: this.centerSolid.l + _stepX, x:this.centerSolid.x + _stepX, t: this.centerSolid.t, y: this.centerSolid.y, tinc: 0});
			_points.push({linc: _stepX, l: this.centerSolid.l + _stepX, x:this.centerSolid.x + _stepX, t: this.centerSolid.t + _stepY, y: this.centerSolid.y + _stepY, tinc: _stepY});
			//const _enemies = episode.enemies.filter(x => x.centerSolid && x !== this && x.solid && !x.isDead() && !x.remove);
			
			for(const _solid of _solids)
				if(this.centerSolid) {
					let _len = _points.length;
					for(let i = 0; i < _len;) {
						let _point = _points[i];
						if(this.isPointIntersectWithSolidObjects(_point, _solid, this.centerSolid.w, this.centerSolid.h)){
							//point is safe
							//_okPoints.push(_point);
							_points.splice(i , 1);
							_len--;
						}
						else
							i++;
					}
					if(!_len)
						break;
				}
			let _point;
			if(!_points?.[0]) {
				delete this.nextPoint;
				return { l:-_sX, t: _sY };
			}
			else if(_points.length === 8) {
				return { l:0, t:0 };
			}
			else if(_targetCenter){
				_points = _points.sort((a, b) => 
					(Math.sqrt(Math.pow(MathAbs(a.x - _targetCenter.x), 2) + Math.pow(MathAbs(a.y - _targetCenter.y), 2))) -
					(Math.sqrt(Math.pow(MathAbs(b.x - _targetCenter.x), 2) + Math.pow(MathAbs(b.y - _targetCenter.y), 2)))
				);
				_point = _points[0];
			}
			else 
				_point = _points[getRandomValue(0, _points.length - 1)];
			if(_point)
				this.nextPoint = {
					l: _point.linc,
					t: _point.tinc,
					h: this.centerSolid.h
				};
		}
		// if(this.nextPoint)
		// 	console.log((this.nextPoint.t + this.nextPoint.h) - this.getHeight(1));
		return this.nextPoint ? {
			l: this.nextPoint.l, 
			t: (this.nextPoint.t + this.nextPoint.h) - this.getHeight(1)
		} : { l:0, t:0 };
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
					w: _e.getWidth(),
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
	this.isRunningAgainstSolidObject = function() {
		if(!this.animations.run && !this.animations.walk)
			return false;
		if(this.animation !== 'run' && this.animation !== 'walk')
			return false;
		const _solids = episode.enemies.filter(x => x !== this && (x.solid /*|| (x.enemy && this.enemy && x.autoMode !== 0 && this.autoMode !== 0 && this.class !== 'object' && x.class !== 'object')*/) && !x.remove && !x.isDead());
		if(_solids?.[0]) {
			const _thisDir = { to: this.getCenterSolid(), from: this.centerSolid};
			for(const _solid of _solids)
				if(isObjectsPassingOver(this, _solid) && this.centerSolid && _solid.centerSolid) {
					const _solidDir = _solid.centerSolid;
					let _moveX = 1, _moveY = 0;
					switch(this.moveDirection) {
						// Eğer soldan sağa giderken çarptıysam
						case 'right':
							//TO.l+TO.w >= l && FROM.l + FROM.w < l MoveX = 0 
							if((_thisDir.to.l + _thisDir.to.w) >= _solidDir.l 
								&& (_thisDir.to.l + _thisDir.to.w) < (_solidDir.l + _thisDir.to.l)
								//&& (_thisDir.from.l + _thisDir.from.w) < _solidDir.l
							) {
								_moveX = 0;
								const _y = this.keyboard?.getYMove()?.name;
								switch(_y) {
									case 'up':
										_moveY = -1;
										break;
									case 'down':
										_moveY = 1;
										break;
									default:
										if(_thisDir.to.y < _solidDir.y)
											_moveY = -1;
										else
											_moveY = 1;
										break;
								}

							}
							//If y yönde hareket varsa o yönde gitsin else
							//If TO.y < y ise MoveY = -1 else MoveY = 1

							break;
							// Eğer sağdan sola giderken çarptıysam
						case 'left':
							//TO.l <= l+w && FROM.l > l+w MoveX = 0 
							if(_thisDir.to.l <= (_solidDir.l + _solidDir.w) 
								&& _thisDir.to.l > _solidDir.l
								//&& _thisDir.from.l > (_solidDir.l + _solidDir.w)
							) {
								_moveX = 0;
								const _y = this.keyboard?.getYMove()?.name;
								switch(_y) {
									case 'up':
										_moveY = -1;
										break;
									case 'down':
										_moveY = 1;
										break;
									default:
										if(_thisDir.to.y < _solidDir.y)
											_moveY = -1;
										else
											_moveY = 1;
										break;
								}

							}
							//If y yönde hareket varsa o yönde gitsin else
							//If TO.y < y ise MoveY = -1 else MoveY = 1

							break;
						case 'down':
							_moveX = 0;
							if(this.yPosition < _solid.yPosition) {
								_moveX = 0;
								_moveY = 1;
							}
							//TO.t+TO.h >= t && FROM.t + FROM.h < t MoveY = 0 
							else if((_thisDir.to.t + _thisDir.to.h) >= _solidDir.t 
							&& _thisDir.to.t < (_solidDir.t + _solidDir.h)) {
							//&& (_thisDir.from.t + _thisDir.from.h) < _solidDir.t) {
								_moveY = 0;
								_moveX = 1;
							}
							else
								_moveY = 1;
							//If y yönde hareket varsa o yönde gitsin else
							//If TO.y < y ise MoveY = -1 else MoveY = 1

							break;
						case 'up':
							_moveX = 0;
							if(this.yPosition > _solid.yPosition) {
								_moveX = 0;
								_moveY = -1;
							}
							//TO.t+TO.h >= t && FROM.t + FROM.h < t MoveY = 0 
							else if(_thisDir.to.t <= (_solidDir.t + _solidDir.h) &&
							(_thisDir.to.t + _thisDir.to.h) > _solidDir.t) {
							//_thisDir.from.t > (_solidDir.t + _solidDir.h)) {
								_moveY = 0;
								_moveX = 1;
							}
							else
								_moveY = -1;
							//If y yönde hareket varsa o yönde gitsin else
							//If TO.y < y ise MoveY = -1 else MoveY = 1

							break;
					}
					// Eğer yukardan aşağı giderken çarptıysam
					//TO.t+TO.h >= t && FROM.t + FROM.h < t MoveY = 0 
					//MoveX = 1
					
					// Eğer aşağıdan yukarı giderken çarptıysam
					//TO.t <= t+h && FROM.t > t+h MoveY = 0 
					//MoveX = 1
					// if(this.moveDirection === 'left' || this.moveDirection === 'right') {
					// 	if((this.direction === 'right') && (_thisDir.to.l > (_solidDir.l + _solidDir.w)))
					// 		_moveX = 1;
					// 	else if((this.direction === 'left') && (_thisDir.to.l + _thisDir.to.w) < _solidDir.l)
					// 		_moveX = 1;
					// 	else {
					// 		if(_thisDir.to.y > _solidDir.y)
					// 			_moveY = -1;
					// 		else
					// 			_moveY = 1;
					// 	}
					// }
					// else {
					// 	//yukardan aşağı direk iniyosa
					// 	if(this.moveDirection === 'down' && ((_thisDir.from.t + _thisDir.from.h) < _solidDir.t)
					// 		&& ((_thisDir.to.t + _thisDir.to.h) >= _solidDir.t))
					// 		_moveX = 1;
					// 		//aşağıdan yukarıya ise
					// 	else if(this.moveDirection === 'up' && (_thisDir.from.t > (_solidDir.t + _solidDir.h))
					// 		&& (_thisDir.to.t <= (_solidDir.t + _solidDir.h)))
					// 		_moveX = 1;
					// }
					if(_moveY === 2) {
						this.limitYPosition();
						_moveY = 0;
					}
					if(_moveY && this.enemy && !this.solidOne)
						this.solidOne = _moveY;
					return {
						moveX : _moveX,
						moveY : this.solidOne ?? _moveY
					}
				}
			}
		if(this.solidOne)
			delete this.solidOne;
		return false;
	}
	this.setNewStatus = function (_diff) {
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
					this.direction = _diff.d === 'l' ? 'left' : (_diff.d === 'r' ? 'right' : _diff.d);
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
					this.left = MathRound(_diff.x * (_canvas.width / (_diff.w ?? this.deviceWidth)));
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
	this.getNewStatus = function (_firstTime, _props) {
		if (!_firstTime && !this.animationChanged && !this.station && !(this.animation === 'idle' || this.animation === 'hug' || this.animation === 'release' || this.animation === 'counter' || this.animation.startsWith('hurt') || this.animation.startsWith('finish') ||
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
		if (this.oldStatus?.mhp !== _status.maxHP)
			_diff.mhp = _status.maxHP;
		if (this.oldStatus?.d !== (_status.direction === 'left' ? 'l' : (_status.direction === 'right' ? 'r' : undefined)))
			_diff.d = _status.direction === 'left' ? 'l' : (_status.direction === 'right' ? 'r' : undefined);
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
				_diff.mhp = this.maxHP;
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
				_diff.w = _canvas.width;
				_diff.k = this.key;
				if(this.joinDate)
					_diff.jd = this.joinDate;
				if (this.leader)
					_diff.ld = 1;
				if (this.station)
					_diff.hs = 1;
				_diff.z = this.zoom;
				if(episode.roomId)
					_diff.room = episode.roomId;
			}
			this.setDefaultMessage(_diff, _firstTime);
			sendMessage(JSON.stringify(_diff));
		}
	}
	this.setDefaultMessage = function (_diff, _firstTime) {
		_diff.c = _firstTime ? 'c' : 't';
		if (_diff.c === 't' && this.station)
			_diff.st = this.station;
		if (this.socketId)
			_diff.s = this.socketId;
		_diff.e = episode.id;
	}
	// this.checkCenterOfScreen2 = function (_step, _reversed) {
	// 	if (!this.main)
	// 		return _step;
	// 	let afterX;
	// 	let _dir = this.direction;
	// 	if (_reversed) {
	// 		if (_dir === 'left')
	// 			_dir = 'right';
	// 		else if (_dir === 'right')
	// 			_dir = 'left';
	// 	}
	// 	if (_dir === 'left') {
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
	// 					platformX += MathRound(this.pushDirection === 'right' ? Math.abs(_step) : -1 * Math.abs(_step));
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
	// 	else if (_dir === 'right') {
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
	// 					platformX += MathRound(this.pushDirection === 'right' ? Math.abs(_step) : -1 * Math.abs(_step));
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
				else if((this.left + this.getWidth()) >= _canvas.width && episode.runToRight)
					switchMap(episode.runToRight);
			}
			return _step;
		}
		let _afterX;
		let _dir = this.pushDirection ?? this.direction;
		if (_reversed && this.pushDirection === undefined) {
			if (_dir === 'left')
				_dir = 'right';
			else if (_dir === 'right')
				_dir = 'left';
		}
		let _s = Math.abs(_step);
		let _left = this.left; //this.getScreenLeft();
		if (_dir === 'left') {
			_afterX = _left - _s;
			//if (_left >= centerMinX && _left < centerMaxX) {
			if ((_left >= centerMinX || platformX > 0) && _left < centerMaxX) {
				if (_afterX < centerMinX) {
					_s = _left - centerMinX;
					platformX -= MathRound(centerMinX - _afterX);
					if (platformX < 0) {
						_s += Math.abs(platformX);
						platformX = 0;
						if(episode.runToLeft)
							switchMap(episode.runToLeft);
					}
				}
			}
			return (_step < 0 ? -1 : 1) * _s;
		}
		else {
			_left += (this.width * this.getZoom());
			_afterX = _left + _s;
			//if (_left > centerMinX && _left <= centerMaxX) {
			if (_left > centerMinX && (_left <= centerMaxX || platformX > 0)) {
				if (_afterX >= centerMaxX) {
					_s = centerMaxX - _left;
					platformX += MathRound(_afterX - centerMaxX);
					if (platformX > (episode.width - _canvas.width)) {
						_s += (platformX - (episode.width - _canvas.width));
						platformX = episode.width - _canvas.width;
						if(episode.runToRight)
							switchMap(episode.runToRight);
					}
				}
			}
			return (_step < 0 ? -1 : 1) * _s;
		}
	}
	this.isXMove = function (_move) {
		return _move === 'left' || _move === 'right';
	}
	this.isYMove = function (_move) {
		return _move === 'up' || _move === 'down';
	}
	this.applyCommand = function () {
		if(this.sleep && this.animation !== 'idle') {
			this.keyboard.holdingKeys = [];
			this.animate('idle', 1, null, 8);
			return;
		}
		let _anima = this.getCurrentAnimation();
		const _blockSkill = this.animation.endsWith('block');
		if (!(_anima.key === 'run' || this.attacker))
			this.extraStepXRate = 0;
		if (!this.isDead() && !episode.end && !this.autoMode) {
			const _move = this.keyboard?.getMove();
			let _skill;
			if (!this.ghost)
				_skill = this.keyboard?.getSkill();
			const _frame = this.getCurrentFrame();
			if (!_skill && _move && (this.animationFinished || this.animation === 'idle' || this.animation === 'run' || _anima.channeling))
				this.run(_anima, _move);
			else if (!_skill && (!_anima?.chain || (_anima.chain && this.animationFinished))
				&& !_move && (this.animation === 'run' || this.animationFinished)) {
				if (!this.attackingOnlyBy && !this.receive)
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
								if (!this.hurting) {
									useProgress.inProgress = true;
									removeClass(useProgress, 'd-none');
									this.useProgressStart = msNow;
									if(this.action.sound)
										this.actionSound = episode.playSound(this.action.sound);
									this.animate('idle', 1, null, 9);
								}
								else {
									if(this.actionSound && !this.actionSound.paused)
										this.actionSound.pause();	
									addClass(useProgress, 'd-none');
								}
							}
							else {
								addClass(useProgress, 'd-none');
								if(this.action.artifactId) {
									__account.artifacts.push({id:this.action.artifactId});
									_client.saveState();
									warn('<div class="flex heading" style="position:relative"><img style="position:absolute;z-index:-1;left:-40%;width:180%" src="./images/icons/banner.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('Talisman found') + '!</span></div>', 'level-up');
									const _portal = document.getElementById('SPRT-' + this.action.loot);
									if (_portal)
										_portal.remove();
									addClass(_useBtn, 'd-none');
									episode.sprites.filter(x => x.animation.id === this.action.loot).forEach(x => x.remove = true);
									applyBonusStats();
								}
								else {
									__account.questStatus.side.state = 'end';
									warn('<div class="flex heading" style="position:relative"><img style="position:absolute;z-index:-1;left:-40%;width:180%" src="./images/icons/banner.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('You found it') + '!</span></div>', 'level-up');
									episode.playSound({ key: 'questdone', volume: .8 });
									const _portal = document.getElementById('SPRT-' + this.action.loot);
									if (_portal)
										_portal.remove();
										addClass(_useBtn, 'd-none');
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
					const _order = this.keyboard.getCommonSkillOrder();
					if (_order > 0) {
						if (__account.commonInventory?.[_order - 1])
							this.useCommonSkill(_order);
						this.keyboard.removeCommonSkill();
					}
					this.idle(9);
				}
				else {
					let _newAnima = this.animations[_skill];
					if (!_newAnima.chain && this.immobilize) {

					}
					if (_newAnima.chain || _frame.imediateBreak || _anima.imediateBreak || this.animationFinished || _anima.channeling)
						if (!this.animate(_skill))
							this.idle(7);
				}
			}
			if (!_move)
				this.moveDirection = undefined;
			else if (_anima.mobilityY && !this.chargimg && _frame.directionChangeEnabled && this.isYMove(_move))
				this.moveDirection = _move;
			else if (_frame.directionChangeEnabled && !this.chargimg && this.isXMove(_move))
				this.direction = _move;
			const _oldBlockState = this.blocked || _blockSkill;
			this.blocked = this.animation === 'block';
			if (!_oldBlockState && this.blocked && !this.newBlocked)
				this.newBlocked = 1;
			else if (this.newBlocked)
				this.newBlocked++;
		}
	}
	this.organizeRelatedObjects = function (_skill) {
		if ((!this.animations[_skill]?.hurt || _skill === 'release') && this.relatedObjects)
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
		}
		else if (_skill.startsWith('finish')) {
			const _finishes = [];
			if(!episode.finishes)
				episode.finishes = [];
			for (var _key of Object.keys(this.animations)) {
				const _anima = this.animations[_key];
				if(_anima.finishType === _skill) {
					const _f = episode.enemies.find(x => x.key === _anima.key);
					if(_f && (msNow - _f.date) > 30000)
						_f.date = msNow;
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
	this.updateLeftAfterRun = function (_skill) {
		if (!this.main || this.autoMode !== 2 || this.still)
			return;
		const oldAnima = this.animations[this.animation];
		const newAnima = this.animations[_skill];
		if (oldAnima.key === 'run' || oldAnima.key === 'walk') {
			if (newAnima.attack) {
				const _oldW = this.getCurrentFrame().spriteWidth;
				const _newW = this.animations.idle.frames[0].spriteWidth;
				if (_oldW > _newW) {
					const _diff = MathRound((_oldW - _newW) * this.getZoom());
					if (this.direction === 'right')
						this.left += _diff;
					else
						this.left -= _diff;
				}
			}
		}
	}
	this.animate = function (_skill, _force, _dontResetFrame, num) {
		if (this.ghost && _skill.startsWith('dead'))
			return undefined;
		_skill = this.modifySkill(_skill);
		this.organizeRelatedObjects(_skill);
		const oldAnima = this.animations[this.animation];
		if (!_force) {
			try {
				if ((this.animations[_skill].coolDownLeft > 0 && !this.animations[_skill].charge) || this.animations[_skill].charge <= 0) {
					if(this.animations[_skill].before && _skill !== this.animation &&
						!this.skills[this.animations[_skill].before].locked
					) {
						const _sk = _skill;
						_skill = this.animations[_skill].before;
						if (this.animations[_skill].coolDownLeft > 0) {
							if (this.main && _sk !== this.animation)
								warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
							return undefined;
						}
					}
					else {
						if (this.main && _skill !== this.animation)
							warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
						return undefined;
					}
				}
			}
			catch (_ex) {
				_skill = 'idle';
			}
			if (this.animations[_skill]?.finishingMove || _skill === 'finish') {
				if (!this.target && !oldAnima.finishingMove && !this.isInFinishingMove()) {
					if (this.main)
						warn('<span>' + getLangData('Target not available') + '</span>', 'warn');
					return undefined;
				}
			}
			if (this.animations[_skill]?.ultimate && (this.rageCount ?? 0) < this.getMaxRageCount()) {
				if (this.main)
					warn('<span>' + getLangData('Not enough rage') + '</span>', 'warn');
				return undefined;
			}
			if (this.animations[_skill]?.ultimate && this.ultimate) {
				if (this.main)
					warn('<span>' + getLangData('Skill is already active') + '</span>', 'warn');
				return undefined;
			}
			if ((this.animation === _skill || _skill === oldAnima.baseKey) && oldAnima.hold && !this.animationFinished)
				return oldAnima;
			if ((this.animation === _skill || _skill === oldAnima.baseKey || (this.animationFinished && oldAnima.next)) && (this.animationFinished || oldAnima.imediateBreak))
				if (oldAnima.next)
					_skill = this.modifySkill(this.getNextSkill(oldAnima.next));
			if (_skill === 'roll' && !this.moveDirection && this.animations.dash)
				_skill = 'dash';
		}
		this.updateLeftAfterRun(_skill);
		this.animation = _skill;
		let anima = this.animations[this.animation];
		this.upcomingAnimation = undefined;
		if (!anima) {
			if(_skill === 'dead')
				this.setHealth(this.getMaxHP(), null, null, 7);
			_skill = 'idle';
			this.animation = _skill;
			anima = this.animations[this.animation];
			if(!anima)
				return undefined;
		}
		else if(this.randomizeAirCoords && this.animation?.startsWith('hurtair')) {
			const _coords = getRandomAirCoords();
			const _frames = anima.frames;
			let j = 0;
			for(var i = 0; i < _coords.length; i++)
				_frames[++j].bottomGap = _coords[i];
			for(var i = _coords.length - 1; i >= 0; i--)
				_frames[++j].bottomGap = _coords[i];
		}
		if(this.animation === 'deadfly') {
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
		if (oldAnima.next === 'dead') {
			this.dead = this.immobilize = true;
			if (this.relatedObjects)
				this.relatedObjects.length = 0;
			this.removeBuffs();
			if (_skill !== 'dead')
				anima.next = 'dead';
		}
		if (oldAnima.sound) {
			oldAnima.sound.pause();
			oldAnima.sound.currentTime = 0;
		}
		this.extraStepYRate = this.extraStepXRate = 0;
		if(!_dontResetFrame)
			this.start = this.frame = 0;
		this.animationFinished = this.iframe = false;
		this.startCooldown(anima.chargeKey ? this.animations[anima.chargeKey] : anima);
		if (!anima.hold)
			if (this.keyboard)
				this.keyboard.removeSkill(_skill);
		if (!anima.hurt)
			this.attacker = undefined;
		if (!anima.interactive)
			this.attackingOnlyBy = undefined;
		if (anima.finishingMove && !this.isInFinishingMove()) {
			const _finishTarget = episode.enemies.find(x => x.targeted);
			if (_finishTarget && !_finishTarget.getCurrentAnimation().interactive && !_finishTarget.isDead() && this.animation.startsWith('finish')) {
				//this.animation = 'finish' + getRandomValue(1, i);
				this.finishTarget = _finishTarget;
				if (!this.finishTarget.dying) {
					if(this.animation !== 'hurtair')
						this.finishTarget.animate('idle', 1, null, 5);
					this.finishTarget.idle.imediateBreak = false;
					this.finishTarget.iframe = this.finishTarget.hurting =
						this.finishTarget.targeted = false;
					this.finishTarget.immobilize = true;
					this.finishTarget.autoMode = this.finishTarget.hitTakenCount = 0;
					this.yPosition = this.finishTarget.yPosition;
					this.finishTarget.finishingFrom = this.direction;
					this.finishTarget.finishingBy = this.finishTarget.attackingOnlyBy = this.key;
					if (this.main) {
						let _ts = 0;
						anima.frames.forEach(x => _ts += x.speed);
						this.finishTarget.addObject({ key: 'zoom', position: 'css', p1: 1.5, p2: _ts * (900 / fps) });
					}
				}
			}
		}
		return anima;
	}
	this.calculateMoveXStep = function() {
		let _rate = ((((this.autoMode === undefined) || this.friendly || this.alp || (this.autoMode > 0 && this.autoTarget))) ? this.getStepXRate() : (this.getStepXRate() / 2)) * (this.defaultDirection === 'left' ? -1 : 1);
		if ((this.autoMode === 2 && !this.alp) && _rate && ((msNow - this.lastStepChosen) > 1000)) {
			this.lastStepChosen = msNow;
			this.lastStepRate = getRandomValue(85, 115) / 100;
			return this.lastStepRate;
		}
		return (msNow - this.lastStepChosen) > 1000 ? _rate : this.lastStepRate ?? _rate;
	}
	this.run = function (_anima, _move, _includeY) {
		this.organizeRelatedObjects('run');
		const _xMove = (this.autoMode >= 0 || this.hasStation) ? _move : this.keyboard?.getXMove()?.name;
		if (_xMove) {
			if ((this.direction === 'left' && _xMove === 'right') ||
				(this.direction === 'right' && _xMove === 'left'))
				this.start = this.frame = 0;
			this.direction = _xMove;
			if(!_includeY)
				this.moveDirection = _xMove;
			this.extraStepXRate = this.calculateMoveXStep();
		}
		const _yMove = this.autoMode ? false : this.keyboard?.getYMove()?.name;
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
		episode?.enemies?.filter(x => x.attacker == this)?.forEach(x => x.attacker = undefined);
		if (this.animation !== _key)
			this.extraStepYRate = this.extraStepXRate = this.start = this.frame = 0;
		if(this.main && this.animation !== _key)
			this.animationChanged = true;
		this.animation = _key;
		if (this.crossEnemyAnimation && this.crossEnemyAnimation !== this.animation)
			this.crossEnemyAnimation = undefined;
		let _xMove;
		if (!this.autoMode)
			_xMove = this.keyboard?.getXMove()?.name;
		this.moveDirection = _xMove;
		this.animationFinished = this.iframe = false;
		this.hurting = undefined;
	}
	this.decreaseHealth = function (_dmg, _attacker) {
		let _hpLeft = this.health - Math.abs(_dmg);
		let _realHP = _hpLeft;
		_hpLeft = parseFloat(parseFloat(_hpLeft).toFixed(1));
		this.setHealth(_hpLeft, _realHP, _attacker, 5);
	}
	this.checkHitCount = function() {
		if(this.countHit) {
			delete this.countHit;
			addClass(_hitCount, 'squash');
			for (var _v of _hitCountValues)
				_v.innerText = this.hitCount;
		}
		else 
			episode.resetBgMusicVolume();
	}
	this.increaseHitCount = function () {
		if (!this.main)
			return;
		this.hitCount++;
		if (this.hitCount > 1) {
			removeClass(_hitCount, 'd-none');
			removeClass(_hitCount, 'squash');
			if(this.hitCount > 9)
				episode.setBgMusicVolume(.01 + (parseInt(this.hitCount / 10) / 100));
			this.countHit = 1;
			this.lastHitDate = msNow;
		}
	}
	this.increaseHealth = function (_val) {
		_val = this.health + _val;
		const _maxHP = this.getMaxHP();
		if (_val > _maxHP)
			_val = _maxHP;
		this.setHealth(_val, null, null, 1);
	}
	this.setHealth = function (_val, _realHP, _attacker, num) {
		if (_val <= 0) {
			if (this.gradeLeft > 0) {
				this.gradeLeft--;
				_realHP = _val = this.getMaxHP() - MathAbs(_val);
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
		const _maxHP = this.getMaxHP();
		if(_val > _maxHP)
			_val = _maxHP;
		if (_val >= 0 && _val <= _maxHP) {
			_val = parseFloat(parseFloat(_val).toFixed(1));
			if (!this.enemy || episode.pvp) {
				try {
					const _bars = document.querySelectorAll('#char-' + this.key + ' .healthvalue');
					for (var _bar of _bars)
						_bar.style.width = (100 * (_realHP / _maxHP)).toString() + '%';
				}
				catch (ex) { }
			}
			if (_realHP !== this.health && this.dmgTaken) {
				const _mDiff = { h: _realHP, sy: 1 };
				this.setDefaultMessage(_mDiff);
				sendMessage(JSON.stringify(_mDiff));
			}
			this.health = _realHP;
			if (_attacker && this.health <= 0 && (this.enemy || episode.pvp))
				this.killedBy = (_attacker.owner ?? _attacker).key;
			if (this.friendly && !episode.pvp) {
				const _aidBtn = document.getElementById('aid-' + this.key);
				if (_aidBtn) {
					if (this.health <= 0 || this.health >= _maxHP)
						addClass(_aidBtn, 'd-none');
					else
						removeClass(_aidBtn, 'd-none');
				}
			}
			if (this.main && ((this.health * 4) < _maxHP))
				if (!this.lms) {
					this.lms = true;
					this.addBuff({ key: 'last', level: 2 });
				}
		}
		if (this.main || this.friendly)
			_client.setHP(this);
		if(this.main && episode.resultStars && (this.health * 2) < _maxHP)
			episode.resultStars[2].failed = 1;
	}
	this.decreaseFatique = function (_attacker) {
		if (this.fatique < fatiqueDecreasement)
			return false;
		this.fatique -= (fatiqueDecreasement * (_attacker?.getCurrentFrame()?.atk?.rate ?? 1));
		_client.setFatique(this);
		if (this.main || this.friendly)
			dmgFrames.push({
				//text: '-EP',
				//class: 'effect-energy',
				x: this.getLeft(),
				y: _canvas.height - this.yPosition - this.getHeight()
			});
		let _bar = document.querySelector('#char-' + this.key + ' .defbar-value');
		if (_bar)
			_bar.style.width = ((this.fatique / this.maxFatique) * 100) + '%';
		else if (this.enemy && this.hasFatiqueBar) {
			_bar = document.querySelector('#defbar-hb-' + this.key);
			if (_bar)
				_bar.style.background = 'linear-gradient(90deg, #9D00FF ' + this.fatique + '%, transparent ' + ((this.fatique / this.maxFatique) * 100) + '%)';
		}
		return true;
	}
	this.increaseFatique = function (_val) {
		this.fatique += _val ?? fatiqueDecreasement;
		if (this.fatique > this.maxFatique)
			this.fatique = this.maxFatique;
		if (!this.enemy) {
			try {
				document.querySelector((!this.main ? '#char-' + this.key : '#top-nav') + ' .defbar-value').style.width = ((this.fatique / this.maxFatique) * 100) + '%';
			}
			catch (ex) { }
			_client.setFatique(this);
		}
	}
	this.startCooldown = function (_skill, _continueCooldown) {
		if(_skill.beforeOrder)
			_skill.cooldown = this.animations[_skill.before].coolDownLeft;
		if (!_skill.cooldown)// || episode.lobby)
			return true;
		if (!_continueCooldown && ((parseFloat(_skill.coolDownLeft) > 0 && !_skill.charge) || _skill.charge === 0)) {
			if (this.main)
				warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
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
			_elem.innerHTML += '<div class="counter flex animate-me">' + parseInt((_skill.coolDownLeft ?? _cd) / 1000) + '</div>';
		}
		if (alreadyInCd)
			return true;
		if (!_skill.coolDownStart) {
			_skill.coolDownStart = msNow;
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
		if (_game.suspended) {
			for (const _anima of Object.keys(this.animations)) {
				if (this.animations[_anima].coolDownLeft > 0)
					this.animations[_anima].coolDownStart = msNow;
			}
			return;
		}
		for (const _anima of Object.keys(this.animations)) {
			const _skill = this.animations[_anima];
			if(_skill.coolDownLeft > 0 && !_skill.coolDownStart)
				delete _skill.coolDownLeft;
			if (_skill.coolDownStart && ((msNow - _skill.coolDownStart) > 1000)) {
				const _diff = (msNow - _skill.coolDownStart) - ((msNow - _skill.coolDownStart) % 1000);
				_skill.coolDownLeft -= _diff;
				_skill.coolDownStart += _diff;
				let _elem = this.main ? (_skill.chainOrder ? document.getElementById('chain-skill-' + _skill.chainOrder) :
					document.getElementById('skill' + (_skill.order ?? _skill.skillOrder))) : undefined;
				const counter = _elem ? _elem.querySelector('.counter') : undefined;
				if (counter && !counter.noText && _skill.coolDownLeft > 299) {
					const _currentCD = parseInt(_skill.coolDownLeft / 1000);
					if (parseInt(counter.innerText) !== _currentCD)
						counter.innerText = _currentCD;
				}
				else if (counter && !counter.noText) {
					counter.noText = true;
					counter.innerText = '0';
					if (_skill.maxCharge)
						counter.noText = false;
					else
						addClass(counter, 'fadeOut');
				}
				if (_skill.coolDownLeft <= 0) {
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
					_skill.coolDownStart = _skill.coolDownLeft = undefined;
				}
			}
			if(_skill.before && !_skill.beforeOrder && 
				_skill.coolDownLeft <= 1000 && _skill.coolDownLeft > 0
				&& (_skill.coolDownStart && ((msNow - _skill.coolDownStart) >= 600))){
				resetSkill(_skill.key, this, 2);
				console.log('reset');
			}
		}
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
	this.disableSkills = function() {
		const _keys = Object.keys(this.animations);
		for(const _key of _keys) {
			const _anima = this.animations[_key];
			if(_anima.order || _anima.ultimate || _anima.chainOrder || _anima.beforeOrder || _anima.skillOrder)
				_anima.disabled = true;
		}
		if(this.main)
			_gameUI.querySelectorAll('.skill:not(.action), .skill-charge, #auto-mode-on-off').forEach(x => addClass(x, 'disabled-skill'));
		resetSkills(null, null, this);
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
			if(_anima.order || _anima.ultimate || _anima.chainOrder || _anima.beforeOrder || _anima.skillOrder)
				delete _anima.disabled;
		}
		if(this.main)
			_gameUI.querySelectorAll('.skill:not(.action), .skill-charge, #auto-mode-on-off').forEach(x => removeClass(x, 'disabled-skill'));
		resetSkills(null, null, this);
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
		if(this.class !== 'spell' && (this.class !== 'object' || _e.randomStartFrame) && _e.randomStartFrame !== false && this.animations?.idle?.frames?.length > 0)
			this.frame = getRandomValue(0, this.animations.idle.frames.length - 1);
	}
	const _animationKeys = Object.keys(this.animations);
	for(var _ak of _animationKeys) {
		const _addSuperArmor = (this.alp) && this.animations[_ak].attack;
		if(_ak === 'release')
		{
			const _lf = this.animations[_ak].frames[this.animations[_ak].frames.length - 1];
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
		// else if(this.animations[_ak].delay)
		// 	this.startCooldown(this.animations[_ak]);
		if(this.enemy && !this.alp && ((this.related?.class ?? this.class) !== 'boss') && this.animations[_ak].priority)
			this.animations[_ak].priority = 4;
		const changeValues = function(x) {
			if(_addSuperArmor && !x.def?.iframe)
			{
				if(!x.def)
					x.def = {};
				x.def.rate = .8;
			}
			if(x.atk && x.atk.type === 'lightning') {
				if(x.atk.hurt)
				{
					if(!x.atk.hurt.spells)
						x.atk.hurt.spells = [];
					x.atk.hurt.spells.push({
						key: 'electricboltsmall'
					});
					x.atk.hurt.spells.push({
						key: 'electricboltsmall',
						reversed: true
					});
				}
			}
			const _oldSpeed = x.speed;
			x.oldSpeed = x.speed = MathRound(x.speed / ((__globalMS / 20) - .16));
			if(x.extraStepXRate)
				x.oldExtraStepXRate = x.extraStepXRate = x.extraStepXRate * (_oldSpeed / x.speed);
			if(x.extraStepYRate)
				x.extraStepYRate = x.extraStepYRate * (_oldSpeed / x.speed);
		}
		this.animations[_ak].frames.forEach(x => {
			changeValues(x);
		});
		if(!this.hasChain && this.animations[_ak].chain)
			this.hasChain = 1;
		if(this.animations[_ak].alternateFrames)
			this.animations[_ak].alternateFrames.forEach(x => x.frames.forEach(y => { changeValues(y);}));
	}
}