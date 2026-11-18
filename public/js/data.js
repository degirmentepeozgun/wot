'use strict';
function dataOperations(_quickPlay) {
	this.quickPlay = _presentationMode ? undefined : _quickPlay;
	this.mails = [];
	this.storageKey = 'com-bi-frame-wot-wrath-of-erlik' + (_presentationMode ? '' : '-demo');
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
		if (!_hp) return false;
		_char.setHealth(_hp, 0, 0, 12);
		return true;
	};
	this.loadFatique = function (_char) {
		const _fatique = this.localData[_char.class]?.fatique;
		return _fatique ?? _char.maxFatique;
	};
	this.setHP = function (_char) {
		if (!this.localData[_char.class]) this.localData[_char.class] = {};
		this.localData[_char.class].hp = _char.health;
	};
	this.setFatique = function (_char) {
		if (!this.localData[_char.class]) this.localData[_char.class] = {};
		this.localData[_char.class].fatique = _char.fatique;
	};
	this.saveState = function (_force) {
		if (this.quickPlay) return;
		if (!_force && (episode?.pvp || __storyPlaying)) return;
		localStorage.setItem(this.storageKey, JSON.stringify(__account));
	};
	this.createQuestID = function (length) {
		let result = '';
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(MathFloor(Math.random() * charactersLength));
			counter++;
		}
		return result;
	};
	this.getDefaultData = function () {
		const _id = this.createQuestID(10);
		return {
			act: 1,
			platina: 0,
			version: 55,
			fragments: [],
			gems: [],
			tutorials: [],
			eventsDone: [],
			storyTicket: 100,
			monthlyLogins: [1, 2, 3],
			storyResults: [],
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
			level: 10,
			grade: 1,
			cs: 0,
			artifacts: [],
			buffs: [],
			missions: [
				{
					key: 'lottery',
					lastActivity: 0
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
			visitedMaps: [103, 104, 105, 1, 0, 201, 11],
			slots: __startSlotAmount,
			inventory: getRandomItems(1, 'warrior'),
			misc: [],
			characters: [
				{
					class: 'warrior',
					experience: 0,
					level: 1,
					selected: true,
					skills: [
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
					talents: []
				},
				{
					class: 'archer',
					experience: 0,
					level: 1,
					skills: [
						{ order: 1, level: 1 },
						{ order: 3, level: 1 },
						{ order: 4, level: 1 },
						{ order: 5, level: 1 },
						{ order: 6, level: 1 },
						{ order: 8, level: 1 }
					]
				},
				{
					class: 'thief',
					experience: 0,
					level: 1,
					skills: [
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
	};
	this.upgradeQuestStatus = function () {
		this.saveState();
	};
	this.upgradeVisitedMaps = function (_id) {
		__account.visitedMaps.push(_id);
		this.saveState();
	};
	this.upgradeOptions = function (_key) {
		__account.options[_key] = __account.options[_key] ? 0 : 1;
		this.saveState();
		return __account.options[_key];
	};
	this.upgradeAccountGrade = function (_grade) {
		if (_grade > __account.grade) __account.grade = _grade;
		this.saveState();
	};
	this.upgradeExperience = function (_char) {
		const _c = __account.characters.find((x) => x.class === _char.class);
		if (!_c) return;
		_c.experience = _char.experience;
		_c.level = _char.level;
		this.upgradeAccountGrade(MathFloor(_c.level / 10) + 1);
		this.saveState();
	};
	this.upgradeSkill = function (_char, _skill) {
		__account.characters.find((x) => x.class === _char.class).skills.find((x) => x.order === _skill.order).level =
			_skill.level;
		this.saveState();
	};
	this.saveMailState = function () {
		localStorage.setItem(this.storageKey + '-mails', JSON.stringify(this.getMails()));
	};
	this.getMails = function () {
		return this.mails;
	};
	this.pushItemIntoMail = function (_item) {
		let _max = 0;
		for (let m of this.mails ?? []) if (m.id > _max) _max = m.id;
		for (let m of __account.mailbox ?? []) if (m.id > _max) _max = m.id;
		_item.key = 'item';
		this.mails.push({
			id: _max + 1,
			ts: Date.now(),
			owner: {
				en: 'Developer Team',
				tr: 'Geliştirici Ekibi'
			},
			body: {
				en: 'Since your inventory is full, the equipment has been sent to your email inbox.',
				tr: 'Envanteriniz dolu olduğu için ekipman posta kutunuza gönderildi.'
			},
			attachment: [structuredClone2(_item)]
		});
		requestAnimationFrame(() => {
			warn(
				'<div class="flex important achievement" style="position:relative"><img style="height:12cqh" src="./images/ui/menu-icons/mailbox.png" />&nbsp;<span style="flex:1">' +
					getLangData('Item Pushed Into Your Mailbox') +
					'</span></div>',
				null,
				null,
				1
			);
		});
		this.saveMailState();
	};
	this.loadMails = function (_reset) {
		let _json = _reset ? [] : JSON.parse(localStorage.getItem(this.storageKey + '-mails') ?? '[]');
		if (_json.length === 0) {
			_json = [
				{
					id: 1000,
					ts: Date.now() - 16545700,
					owner: {
						en: 'Just A Friend',
						tr: 'Bir Dost'
					},
					body: {
						en: 'Hail to you champion, welcome to the world\'s best game ever! Ahhh god, i know it will take too long but this is a mailbox system to check what is inside and you probably saying "Sh****t!" because this is an empty one but be patient with a hard work and being polite to other players, you will gain special rewards!!!',
						tr: 'Selam sana şampiyon, dünyanın en iyi oyununa hoş geldin! Ahhh tanrım, çok uzun süreceğini biliyorum ama bu, içinde ne olduğunu kontrol etmek için bir posta kutusu sistemi ve muhtemelen boş olduğu için "S****t!" diyorsun ama sabırlı ol, sıkı çalış ve diğer oyunculara karşı nazik ol, özel ödüller kazanacaksın!!!'
					}
				},
				{
					id: 1001,
					ts: Date.now() - 6545700,
					owner: {
						en: 'Developer Team',
						tr: 'Geliştirici Ekibi'
					},
					body: {
						en: 'We hope you enjoy using this little welcome gift that we think will accompany and guide you on your adventure.',
						tr: 'Sana maceranda eşlik edecek ve yol göstereceğini düşündüğümüz bu küçük aramıza hoşgeldin hediyesini  güle güle kullanmanı dileriz'
					},
					attachment: [
						{ key: 'misc', type: 'ticket-gold', count: 5 },
						{ key: 'misc', type: 'ticket-exp', count: 5 },
						{ key: 'misc', type: 'ticket-item', count: 5 },
						{ key: 'misc', type: 'ticket-pass', count: 5 }
					]
				}
			];
		}
		this.mails = _json;
	};
	this.loadState = function (_reset) {
		if (!_reset && _presentationMode) _reset = true;
		let _r = this.quickPlay ?? _reset;
		let _json = JSON.parse(localStorage.getItem(this.storageKey) ?? '{}');
		const _keptSocketId = _json?.socketId;
		if (_presentationMode || _json?.version !== this.getDefaultData().version) {
			localStorage.removeItem(this.storageKey);
			_json = {};
			_r = 1;
		}
		const _kb = _json?.keyboard;
		if (!_r) __account = _json;
		else {
			__account = this.getDefaultData();
			__account.inventory.forEach((x) => (x.weared = 'warrior'));
			if (_keptSocketId) __account.socketId = _keptSocketId;
			this.saveState(1);
		}
		if (_kb && !__account.keyboard) __account.keyboard = _kb;
		this.loadMails(_presentationMode);
		if (_presentationMode) __account.lastLobbyUsage = new Date();
	};
	this.loadItems = function (hasMainCharacter) {
		applyCharacterStats(hasMainCharacter);
	};
	this.loadGold = function () {
		if (!_goldCount) _goldCount = document.getElementById('main-gold-count');
		if (_goldCount) _goldCount.innerText = __account.gold.formatWithDots();
	};
	this.loadPots = function () {
		const lp = document.getElementById('main-pot-count');
		let _pot = __account.pots?.find((x) => x.key === 'pot');
		lp.innerText = _pot?.value ?? 0;
	};
	this.setCharacterValues = function (_char, _select, _tempLevel) {
		let _c;
		if (_char)
			if (_select) {
				__account.characters.forEach((x) => delete x.selected);
				try {
					_c = __account.characters.find((x) => x.class === _char.class);
					_c.selected = true;
					this.saveState();
				} catch (selex) {}
			}
		const _ch = _char ?? mainCharacter;

		if (!_c) _c = _ch;
		if (_c) {
			_ch.level = _tempLevel ?? _c.level ?? 1;
			_ch.experience = _c.experience;
			let _maxExp = 1000;
			for (var i = 1; i < _ch.level; i++) _maxExp = MathRound(_maxExp * 1.2);
			_ch.maxExperience = _maxExp;
			const _skills = skill.getSkills(_c);
			if (!_c.skills?.length)
				for (let _sk in _c.skills) {
					const _skill = _c.skills[_sk];
					_skills.find((x) => x.order === _skill.order).level = _skill.level ?? 1;
				}
			else for (let _skill of _c.skills) _skills.find((x) => x.order === _skill.order).level = _skill.level;
		}
	};
	this.checkResetTime = function () {
		const _reset = getCurrentResetTime();
		let _update;
		for (const _mission of __account.missions)
			if (_mission.lastActivity) {
				if (_mission.lastActivity < _reset) {
					_update = 1;
					_mission.lastActivity = undefined;
					if (_mission.current > 1) _mission.current = 1;
					if (_mission.played > 0) _mission.played = 0;
				}
			}
		if (_update) this.saveState();
	};
}
var _client = new dataOperations();
_client.loadState();
