'use strict';
function dataOperations(_quickPlay) {
	this.quickPlay = _quickPlay;
	this.storageKey = 'com-bi-frame-wot-wrath-of-erlik'; //(__deviceId ?? 411191);// + '-' + (_dataId ?? '08');
	this.localData = {
		warrior: {
			hp: undefined,
			fatique: undefined
		},
		archer: {
			hp: undefined,
			fatique: undefined
		},
		thief: {
			hp: undefined,
			fatique: undefined
		}
	};
	this.loadHP = function (_char) {
		const _hp = this.localData[_char.class]?.hp;
		if (!_hp)
			return false;
		_char.setHealth(_hp, 0, 0, 12);
		return true;
	}
	this.loadFatique = function (_char) {
		const _fatique = this.localData[_char.class]?.fatique;
		return _fatique ?? _char.maxFatique;
	}
	this.setHP = function (_char) {
		if (!this.localData[_char.class])
			this.localData[_char.class] = {};
		this.localData[_char.class].hp = _char.health;
	}
	this.setFatique = function (_char) {
		if (!this.localData[_char.class])
			this.localData[_char.class] = {};
		this.localData[_char.class].fatique = _char.fatique;
	}
	this.saveState = function (_force) {
		if(this.quickPlay)
			return;
		if (!_force && (episode?.pvp || __storyPlaying))
			return;
		localStorage.setItem(this.storageKey, JSON.stringify(__account));
	}
	this.createQuestID = function(length) {
		let result = '';
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(MathFloor(Math.random() * charactersLength));
			counter++;
		}
		return result;
	}
	this.getDefaultData = function () {
		const _id = this.createQuestID(10);
		return {
			act: 1,
			version:55,//max 55
			fragments: [],
			gems: [
			],
			tutorials: [],
			eventsDone: [],
			storyTicket: 100,
			monthlyLogins: [1,2,3],
			storyResults: [
			// 	{ 
			// 		id: 1, 
			// 		stars: [
			// 			{ title: '', done: true },
			// 			{ title: '', done: true },
			// 			{ title: '', done: false }
			// 		]
			// 	}
			],
			name: '',
			friends: [],
			difficulty: 3,
			pvp: {
				order: 15000,
				honor: 0,
				lastDuelTime: 0,
				duelCount: 10,
				winCount: 0,
				looseCount: 0,
				lastDuelWin: false,
				winStreak: 0,
				maxWinCount: 0
			},
			level: 10, // account level
			grade: 1, // account grade
			cs: 0,
			artifacts: [
			],
			buffs: [],
			missions: [
				{ 
					key: 'lottery', 
					lastActivity: 0, 
				},
				{ 
					key: 'tower', 
					level: 1, 
					current: 1,
					lastActivity: 0, 
					max: 0
				},
				{ 
					key: 'gold', 
					lastActivity: 0, 
					level: 1, 
					current: 0
				},
				{ 
					key: 'ad', 
					lastActivity: 0, 
					level: 1, 
					current: 0
				}
			],
			lang: __account?.lang ? __account.lang : 'en',
			options: {
				gore: 0,
				effect: 1,
				weather: 1,
				request: 1,
				sound: 1,
				ambiance: 1
			},
			id: _id,
			gold: 0,
			commonInventory: [],
			pots: [],
			globalQuests: installGlobalQuests(),
			questStatus: firstQuestData(),
			visitedMaps: [103, 104, 105, 1, 0, 201, 11], //harita idlerini ekle ziyaret etmiş sayıl
			slots: __startSlotAmount,
			inventory: getRandomItems(1, 'warrior'), //getRandomItems(2, 'warrior'),
			misc: [
				//{ type:'ticket-item-selection', count: 100 },
				//{ type:'ticket-random', count: 10 },
				 //{ type:'ticket-gold', count: 12 },
				// { type:'ticket-item', count: 13 },
				// { type:'ticket-exp', count: 10 },
				// { type:'ticket-pass', count: 50 },
				// { type:'chest', grade:1, count: 10 },
			],
			characters: [
				{
					class: 'warrior', experience: 0, level: 1, selected: true /*character level*/, skills: [
						{ order: 1, level: 1 },
						{ order: 3, level: 1 },
						{ order: 4, level: 1 },
						{ order: 5, level: 1 },
						{ order: 6, level: 1 },
						{ order: 8, level: 1 },
						{ order: 10, level: 1 },
						{ order: 11, level: 1 },
						{ order: 12, level: 1 }
					],
					talents: [
						// {id:1, count:2},
						// {id:2, count:1},
						// {id:3, count:1},
						// {id:4, count:1}
					]
				},
				{
					class: 'archer', experience: 0, level: 1, skills: [
						{ order: 1, level: 1 },
						{ order: 3, level: 1 },
						{ order: 4, level: 1 },
						{ order: 5, level: 1 },
						{ order: 6, level: 1 },
						{ order: 8, level: 1 }
					]
				},
				{
					class: 'thief', experience: 0, level: 1, skills: [
						{ order: 1, level: 1 },
						{ order: 3, level: 1 },
						{ order: 4, level: 1 },
						{ order: 5, level: 1 },
						{ order: 6, level: 1 },
						{ order: 8, level: 1 }
					]
				}
			]
		};
	}
	this.upgradeQuestStatus = function () {
		//__account.questStatus = JSON.parse(JSON.stringify(__account.questStatus));
		this.saveState();
	}
	this.upgradeVisitedMaps = function (_id) {
		__account.visitedMaps.push(_id);
		this.saveState();
	}
	this.upgradeOptions = function (_key) {
		__account.options[_key] = __account.options[_key] ? 0 : 1;
		this.saveState();
		return __account.options[_key];
	}
	this.upgradeAccountGrade = function (_grade) {
		if(_grade > __account.grade)
			__account.grade = _grade;
		this.saveState();
	}
	this.upgradeExperience = function (_char) {
		const _c = __account.characters.find(x => x.class === _char.class);
		if(!_c)
			return;
		_c.experience = _char.experience;
		_c.level = _char.level;
		this.upgradeAccountGrade(MathFloor(_c.level / 10) + 1);
		this.saveState();
	}
	this.upgradeSkill = function (_char, _skill) {
		__account.characters.find(x => x.class === _char.class).skills.
			find(x => x.order === _skill.order).level = _skill.level;
		this.saveState();
	}
	this.loadState = function (_reset) {
		let _r = this.quickPlay ?? _reset;
		let _json = JSON.parse(localStorage.getItem(this.storageKey) ?? '{}');
		if(_json?.version !== this.getDefaultData().version){
			localStorage.removeItem(this.storageKey);
			_json = {};
			_r = 1;
		}
		const _kb = _json?.keyboard;
		if (!_r)
			__account = _json;
		else {
			__account = this.getDefaultData();
			__account.inventory.forEach(x => x.weared = 'warrior');
			this.saveState(1);
		}
		if(_kb && !__account.keyboard)
			__account.keyboard = _kb;
	}
	this.loadItems = function(hasMainCharacter) {
		applyCharacterStats(hasMainCharacter);
	}
	this.loadGold = function () {
		if (!_goldCount)
			_goldCount = document.getElementById('main-gold-count');
		if(_goldCount)
			_goldCount.innerText = __account.gold.formatWithDots();
	}
	this.loadPots = function () {
		const lp = document.getElementById('main-pot-count');
		let _pot = __account.pots?.find(x => x.key === 'pot');
		lp.innerText = _pot?.value ?? 0;
	}
	this.setCharacterValues = function (_char, _select, _tempLevel) {
		let _c;
		if (_char)
			if (_select) {
				__account.characters.forEach(x => delete x.selected);
				try {
					_c = __account.characters.find(x => x.class === _char.class);
					_c.selected = true;
					this.saveState();
				}
				catch(selex) { }
			}
		const _ch = _char ?? mainCharacter;
		//const _c = __account.characters.find(x => x.class === _ch.class);
		if(!_c)
			_c = _ch;
		if(_c) {
			_ch.level = _tempLevel ?? _c.level ?? 1;
			_ch.experience = _c.experience;
			let _maxExp = 1000;
			for(var i = 1; i < _ch.level; i++)
				_maxExp = MathRound(_maxExp * 1.2);
			_ch.maxExperience = _maxExp;
			const _skills = skill.getSkills(_c);
			if(!_c.skills?.length)
				for (let _sk in _c.skills){
					const _skill = _c.skills[_sk];
					_skills.find(x => x.order === _skill.order).level = _skill.level ?? 1;
				}
			else
				for (let _skill of _c.skills)
					_skills.find(x => x.order === _skill.order).level = _skill.level;
		}
	}
	this.checkResetTime = function() {
		const _reset = getCurrentResetTime();
		let _update;
		for(const _mission of __account.missions)
			if(_mission.lastActivity) {
				if(_mission.lastActivity < _reset) {
					_update = 1;
					_mission.lastActivity = undefined;
					if(_mission.current > 1)
						_mission.current = 1;
					if(_mission.played > 0)
						_mission.played = 0;
				}
			}
		if(_update)
			this.saveState();
	}
}
var _client = new dataOperations();
_client.loadState();