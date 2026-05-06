'use strict';
const _keyCombinations = [
	{ title: {
		en: 'Move Left',
		tr: 'Sola Git'
	 },
	  baseKey: 'A',
	  desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%" />'
	},
	{ title: {
		en: 'Move Right',
		tr: 'Sağa Git'
	 },
	  baseKey: 'D',
	  desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%;transform:rotate(-90deg)" />'
	},
	{ title: {
		en: 'Move Up',
		tr: 'Yukarı Git'
	 },
	  baseKey: 'W',
	  desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%;transform:rotate(-180deg)" />'
	},
	{ title: {
		en: 'Move Down',
		tr: 'Aşağı Git'
	 },
	  baseKey: 'S',
	  desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%;transform:rotate(-270deg)" />'
	},
	{ title: {
		en: 'Block',
		tr: 'Korunma'
	 },
	  baseKey: 'H',
	},
	{ title: {
		en: 'Dodge',
		tr: 'Atlama'
	 },
	  baseKey: 'G',
	},
	{ title: {
		en: 'Normal Attack',
		tr: 'Basit Saldırı'
	 },
	  baseKey: ' ',
	},
	{ title: {
		en: 'Ground Attack',
		tr: 'Yerden Saldırı'
	 },
	  baseKey: 'J',
	},
	{ title: {
		en: 'Air Attack',
		tr: 'Hava Saldırısı'
	 },
	  baseKey: 'K',
	},
	{ title: {
		en: 'Ranged Attack',
		tr: 'Uzaktan Saldırı'
	 },
	  baseKey: 'L',
	},
	{ title: {
		en: 'Rage Mode',
		tr: 'Öfke Modu'
	 },
	  baseKey: 'E',
	},
	{ title: {
		en: 'Special Skill',
		tr: 'Özel Yetenek'
	 },
	  baseKey: 'Q',
	},
	{ title: {
		en: 'Tag Skill',
		tr: 'Destek Yeteneği'
	 },
	  baseKey: 'T',
	},
	{ title: {
		en: 'Counter Attack Chain',
		tr: 'Karşı Saldırı Zinciri'
	 },
	  baseKey: 'F',
	},
	{ title: {
		en: 'Escape Chain',
		tr: 'Kaçış Zinciri'
	 },
	  baseKey: 'R',
	},
	{ title: {
		en: 'Action',
		tr: 'Eylem'
	 },
	  baseKey: 'U',
	},
	{ title: {
		en: 'Drink Potion',
		tr: 'İksir İçme'
	 },
	  baseKey: 'P',
	},
	{ title: {
		en: 'Common Skill 1',
		tr: 'Ortak Beceri 1'
	 },
	  baseKey: '1',
	},
	{ title: {
		en: 'Common Skill 2',
		tr: 'Ortak Beceri 2'
	 },
	  baseKey: '2',
	},
	{ title: {
		en: 'Common Skill 3',
		tr: 'Ortak Beceri 3'
	 },
	  baseKey: '3',
	},
	{ title: {
		en: 'Common Skill 4',
		tr: 'Ortak Beceri 4'
	 },
	  baseKey: '4',
	}
];
let activeInput = null;
let previousKeyBindValue = "";

const blockedKeys = [
  "Shift", "Control", "Alt", "AltGraph", "Meta", "CapsLock",
  "NumLock", "ScrollLock", "Pause", "Insert"
];
const blockedAsciis = [
	16,17,18,19,20,33,34,35,36,44,45,46,91,92,93,144,145,173,174,175,181,182,183
]
function readyToBindKey(_elem){
	document.querySelectorAll('.key-combination-item')?.forEach(x => removeClass(x, 'waiting'));
	activeInput = _elem;
    previousKeyBindValue = _elem.value;
    _elem.value = "...";
    addClass(_elem, "waiting");
}
function tryResetBindKey(_elem) {
  	removeClass(_elem,"waiting");
  	removeClass(_elem,"error");
	if(_elem.value === '...')
		_elem.value = previousKeyBindValue === ' ' ? 'SPACE' : previousKeyBindValue;
  	activeInput = null;
}
function formatKeyName(e) {
  if (e.code === "Space") return "SPACE";
  if (e.key.length === 1) return e.key.toUpperCase();
  return e.key.toUpperCase();
}

function isKeyAlreadyUsed(key, currentInput) {
  let used = false;

  document.querySelectorAll(".key-combination-item")?.forEach(inp => {
    if (inp !== currentInput && inp.value === key) {
      used = true;
    }
  });

  return used;
}

function stopListening() {
  if (!activeInput) return;
  removeClass(activeInput,"waiting");
}
function setBindKey(_elem, e) {
	removeClass(_elem, "error");
    if (!activeInput) return;
	
    // TAB -> doğal davranış + sonraki inputa geçiş
    if (e.key === "Tab") {
      stopListening();
      return; // browser default TAB geçişi çalışsın
    }

    e.preventDefault();

	if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || e.key === 'Enter') {
		return;
	}
    // ESC -> eski değeri geri getir
    if (e.key === "Escape") {
      _elem.value = previousKeyBindValue;
      stopListening();
      return;
    }
	if(e.keyCode === 8) {
		readyToBindKey(_elem);
		return;
	}
    // Kontrol tuşlarını engelle
    if (blockedKeys.includes(e.key)) return;

    if (blockedAsciis.includes(e.keyCode)) return;
    let keyName = formatKeyName(e);

    // Çakışma kontrolü
    if (isKeyAlreadyUsed(keyName, _elem)) {
		PlaySound({key:'disabled'});
     	addClass(_elem, "error");
      	return;
    }

    _elem.value = keyName;
	PlaySound({key:'keyboard', volume:.2});
    stopListening();
}
function keyboard(_character, _keys) {
	_character.blockReleased = true;
	this.character = _character;
	this.lastAction = {};
	this.holdingKeys = [];
	this.keyStates = {};
	this.recordingKeys = [];
	this.keys = _keys;
	const self = this;
	this.recordKey = function(_k, _name) {
		if(!episode?.fatality || episode?.fatalityHappened) {
			if(this.recordingKeys?.[0])
				this.recordingKeys = [];
			return;
		}
		this.recordingKeys.push({key:_k, name: _name});
		if(this.recordingKeys.length > 10)
			this.recordingKeys.splice(0, 1);
		if(this.character.animations.finishend?.keyCombination?.[0] && this.recordingKeys.length >= this.character.animations.finishend.keyCombination.length){
			const _kc = this.character.animations.finishend.keyCombination;
			for(let i = this.recordingKeys.length - _kc.length; i < this.recordingKeys.length; i++) {
				const _rk = this.recordingKeys[i];
				if(_rk.name === _kc[0])
				{
					let _inc = 1;
					for(let j = i + 1; j < i + _kc.length; j++) {
						if(_kc[_inc] !== this.recordingKeys?.[j]?.name) 
							break;
						_inc++;
					}
					if(_inc === _kc.length && this.character.target)
						this.fatality(1);
				}
			}
		}
	}
	this.addKey = function (_k, _name) {
		if ((this.character?.immobilize || __storyTell || this.character?.sleep || _dialogAppeared) && !_focusMode)
			return;
		const _key = this.holdingKeys.find(x => x.key === _k);
		if (_key)
			return;
		const _end = this.keyStates[_k]?.lastEnd;
		this.removeKey(_k, null, 1);

		// end/cancel’den sonra çok erken start gelirse ignore
		if (performance.now() - _end < 40) 
			return;

		if (!this.keyStates[_k]?.isDown)
			this.keyStates[_k] = { isDown:true };
		const _type = (_k === self.keys[16] || _k === self.keys[17] || _k === self.keys[0] || _k === self.keys[2]) ? 'move' : 'skill';
		if(_type === 'skill')
			this.holdingKeys = this.holdingKeys.filter(x => x.type !== _type || x.key === ' ');
		this.holdingKeys.push({
			type: _type,
			key: _k,
			name: _name
		});
		this.character.lastActivity = _gameTick;
	}
	this.removeCommonSkill = function () {
		this.holdingKeys = this.holdingKeys.filter(x => x.name !== 'common') ?? [];
	}
	this.removeSkill = function (_skillName) {
		this.removeKey(_skillName, null, 1);
	}
	this.removeKey = function (_k, _release, _skipState) {
		let _has;
		if(!_skipState)
			this.keyStates[_k] = {isDown: false, lastEnd: performance.now()};
		for (var i = 0; i < this.holdingKeys.length; i++) {
			const _key = this.holdingKeys[i];
			if (_key.key === _k) {
				_has = 1;
				if(_release)
					this.recordKey(_k, _key.name);
				break;
			}
		}
		if(_has)
			this.holdingKeys = this.holdingKeys.filter(x => x.key !== _k);
	}
	this.getXMove = function () {
		const _arr = this.holdingKeys.filter(x => x.key === self.keys[0] || x.key === self.keys[2]);
		if (_arr?.[0])
			return _arr[_arr.length - 1];
		return undefined;
	}
	this.getYMove = function () {
		const _arr = this.holdingKeys.filter(x => x.key === self.keys[16] || x.key === self.keys[17]);
		if (_arr?.[0])
			return _arr[_arr.length - 1];
		return undefined;
	}
	this.getMove = function () {
		const _move = this.holdingKeys.filter(x => x.type === 'move');
		if (_move?.[0])
			switch (_move[_move.length - 1].key) {
				case self.keys[0]:
					return 'left';
				case self.keys[2]:
					return 'right';
				case self.keys[16]:
					return 'up';
				case self.keys[17]:
					return 'down';
			}
		return undefined;
	}
	this.getLastMove = function () {
		const _move = this.holdingKeys.filter(x => x.type === 'move');
		if (_move?.[0])
			return _move[_move.length - 1];
		return undefined;
	}
	this.getCommonSkillOrder = function () {
		return this.holdingKeys.find(x => x.name === 'common')?.key ?? 0;
	}
	this.getSkill = function () {
		const _skill = this.holdingKeys.filter(x => x.type === 'skill');
		if (_skill?.[0]) {
			for (var i = _skill.length - 1; i >= 0; i--) {
				const _key = _skill[i].name;
				const _s = _key === 'common' || this.character.animations[_key];
				if (!_s)
					continue;
				if (_s.coolDownLeft > 0 && !_s.charge) {
					if(_s.before) {
						const _sb = this.character.animations[_s.before];
						if (_sb.coolDownLeft > 0) {
							if (this.holdingKeys.find(x => x.name === _key) && this.character.main && !this.character.hurting && this.character.animation !== _key){
								if(!(this.character.lastKeyWarned > (_gameTick - 1000))){
									this.character.lastKeyWarned = _gameTick;
									//warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
								}
							}
							continue;
						}
					}
					else {
						if (this.holdingKeys.find(x => x.name === _key) && this.character.main && !this.character.hurting && this.character.animation !== _key)
							if(!(this.character.lastKeyWarned > (_gameTick - 1000))){
								this.character.lastKeyWarned = _gameTick;
								//warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
							}
						continue;
					}
				}
				return _skill[i].name;
			}
		}
		return undefined;
	}
	this.mouseUp = function (key) {
		//let moveHoldDate;
		switch (key) {
			case self.keys[4]:
				self.removeKey(key, 1);
				break;
			case self.keys[5]:
				self.removeKey(key, 1);
				break;
			case self.keys[6]:
				self.removeKey(key, 1);
				break;
			case self.keys[7]:
				self.removeKey(key, 1);
				break;
			case self.keys[8]:
				self.removeKey(key, 1);
				break;
			case self.keys[9]:
				self.removeKey(key, 1);
				break;
			case self.keys[10]:
				self.removeKey(key, 1);
				break;
			case self.keys[11]:
				self.removeKey(key, 1);
				break;
			case self.keys[18]:
				self.removeKey(key, 1);
				break;
			case self.keys[3]:
				self.removeKey(key, 1);
				break;
			case self.keys[1]:
				self.removeKey(self.keys[1], 1);
				break;
			case self.keys[13]:
			case self.keys[16]:
				self.removeKey(self.keys[16], 1);
				break;
			case self.keys[15]:
			case self.keys[17]:
				self.removeKey(self.keys[17], 1);
				break;
			case self.keys[19]:
			case self.keys[20]:
			case self.keys[21]:
			case self.keys[22]:
				self.removeCommonSkill();
				break;
			case self.keys[24]:
				self.removeKey(key, 1);
				break;
			case self.keys[0]:
			case self.keys[12]:
				self.removeKey(self.keys[0], 1);
				break;
			case self.keys[2]:
			case self.keys[14]:
				{
					//key = self.keys[2];
					//const move = self.getLastMove();
					//if (move?.key === key)
					//	moveHoldDate = move.date;
					self.removeKey(self.keys[2], 1);
				}
				break;
			case 'tab':
				switchCharacter(null,null,null,1);
				break;
			default:
				break;
		}
		//if (key === self.lastAction.key) {
		//	if (key === self.keys[0] || key === self.keys[2]) {
		//		if ((new Date() - (moveHoldDate ?? self.lastAction.date)) < 200) {
		//			self.addKey('dash', 'dash');
		//			self.lastAction = {};
		//			return;
		//		}
		//	}
		//}
		//if (self.character.animation === 'idle' || self.character.animation === 'run') {
		//	self.lastAction.key = key;
		//	self.lastAction.date = new Date();
		//}
	}
	this.fatality = function(_force) {
		if(this.character.hasAdvicedItem){
			wearStatusItem();
			return;
		}
		let _skillName = 'finish' + (this.character.upcomingFinishingMove ?? '');
		if(!_force && this.character.animations[_skillName]?.keyCombination)
			return;
		if (this.character.target || this.character.action)
			self.addKey(self.keys[18], _skillName);
	}
	this.action = function (_key) {
		if((this.character && !__storyTell && (this.character.deadTime || this.character.isDead())) || keyboardHeight > 0)
			return;
		switch (_key) {
			case self.keys[13]:
			case self.keys[16]:
				if (this.character.main && _dialogAppeared) {
					changeDialogOption(-1);
					return;
				}
				self.addKey(self.keys[16], 'up');
				break;
			case self.keys[1]:
				self.addKey(self.keys[1], 'roll');
				break;
			case self.keys[0]:
			case self.keys[12]:
				self.addKey(self.keys[0], 'left');
				break;
			case self.keys[2]:
			case self.keys[14]:
				self.addKey(self.keys[2], 'right');
				break;
			case self.keys[15]:
			case self.keys[17]:
				if (this.character.main && _dialogAppeared) {
					changeDialogOption(1);
					return;
				}
				self.addKey(self.keys[17], 'down');
				break;
			case self.keys[10]:
				if (self.character.chains?.[0])
					self.addKey(self.keys[10], self.character.chains[0].key);
				break;
			case self.keys[11]:
				if (self.character.chains?.[1])
					self.addKey(self.keys[11], self.character.chains[1].key);
				break;
			case self.keys[8]:
				if (!skill.isActive('air2'))
					return;
				self.addKey(self.keys[8], 'air2');
				break;
			case self.keys[9]:
				if (!skill.isActive('defense'))
					return;
				self.addKey(self.keys[9], 'defense');
				break;
			case self.keys[4]:
				//if (!skill.isActive('block'))
				//	return;
				self.addKey(self.keys[4], 'block');
				break;
			case self.keys[5]:
				if (!skill.isActive('ground1'))
					return;
				self.addKey(self.keys[5], 'ground1');
				break;
			case self.keys[6]:
				if (!skill.isActive('ground2'))
					return;
				self.addKey(self.keys[6], 'ground2');
				break;
			case 'dash':

				break;
			case self.keys[7]:
				if (!skill.isActive('air1'))
					return;
				self.addKey(self.keys[7], 'air1');
				break;
			case self.keys[18]:
				this.fatality();
				break;
			case self.keys[19]:
				self.addKey(self.keys[19], 'common');
				break;
			case self.keys[20]:
				self.addKey(self.keys[20], 'common');
				break;
			case self.keys[21]:
				self.addKey(self.keys[21], 'common');
				break;
			case self.keys[22]:
				self.addKey(self.keys[22], 'common');
				break;
			case self.keys[23]:
				drinkPot();
				break;
			case self.keys[24]:
				//tag skill
				if(!this.character.animations.tag)
					return;
				self.addKey(self.keys[24], 'tag');
				break;
			case self.keys[3]:
				if (this.character.main && __account.questStatus.dialogArr) {
					skipDialog();
					return;
				}
				else if(__storyTell?.firstSeen) {
					__storyTell.skip();
					return;
				}
				self.addKey(self.keys[3], 'attack');
				break;
		}
		//self.inform();
	}
	this.inform = function () {
		let _note = '';
		for (var _key of this.holdingKeys)
			_note += _key.key + ' ';
		console.log(_note);
	}
	this.mouseDown = function (_key) {
		// const _btns = document.querySelectorAll('.skill[data-key="' + _key + '"]');
		// if (_btns?.[0])
		// 	for (var _btn of _btns) {
		// 		addClass(_btn, 'pop-out-short');
		// 		setTimeout(function () {
		// 			removeClass(_btn, 'pop-out-short');
		// 		}, 200);
		// 	}
		this.action(_key);
	}
}
window.addEventListener('keydown', function (event) {
	const kRaw = event.key?.toLowerCase?.();
	if(kRaw === ' ') {
		if(episode?.hasFocusUIDoneBtn) {
			const _skippableScreen = document.querySelector('.black-screen-ok-btn');
			if(_skippableScreen) {
				const _click = _skippableScreen.querySelector('.game-btn2');
				if(_click)
					_click.onexactclick();
			}
			return;
		}
		else if(!episode || episode.end) {
			const _btn = document.querySelector('.quick-space-btn:not(.disabled,.inactivated)');
			if(_btn && _btn.onexactclick) {
				_btn.onexactclick();
				return;
			}
		}
	}
	if(mainCharacter?.disableKeyboard){
		mainCharacter.holdingKeys = [];
		return;
	}
	if (event.repeat) return;
	try {
  		if(kRaw === ' ' && episode?.hasSkippableScreen) {
			const _skippableScreen = document.querySelector('.quick-play-desc-container');
			if(_skippableScreen) {
				const _click = _skippableScreen.querySelector('[onexactclick]');
				if(_click)
					_click.onexactclick();
			}
			return;
		}
		if (event?.key) {
			if (event.which === 9)
				event.preventDefault();
			// if(!mainCharacter.keyboard)
			// 	switchAutoMode();
			pressSkill(event);
			mainCharacter.keyboard.mouseDown(event.key.toLocaleLowerCase());
		}
	} catch (e) {

	}
});
window.addEventListener('keyup', function (event) {
	if(mainCharacter?.disableKeyboard){
		mainCharacter.holdingKeys = [];
		return;
	}
	try {
		if (event?.key) {
			if (event.which === 9)
				event.preventDefault();
			// if(!mainCharacter.keyboard)
			// 	switchAutoMode();
			mainCharacter.keyboard.mouseUp(event.key.toLowerCase());
		}
	} catch (e) {

	}
});
// window.addEventListener("blur", () => {
// 	if(mainCharacter?.keyboard)
// 		mainCharacter.keyboard.holdingKeys = [];
// });




// let physicalKeys = new Set();

// function normalizeKey(key) {
//   const _k = key?.toLowerCase?.() || null;
//   switch (_k) {
//     case 'arrowleft': return 'a';
//     case 'arrowup': return 'w';
//     case 'arrowdown': return 's';
//     case 'arrowright': return 'd';
//   }
//   return _k;
// }

// window.addEventListener('keydown', (e) => {
//   console.log('KEY DOWN <----------');
//   if (mainCharacter?.disableKeyboard) return;
//   const k = e.key.toLowerCase();
//   physicalKeys.add(k);
// });

// window.addEventListener('keyup', (e) => {
//   console.log('KEY UP');
//   const k = e.key.toLowerCase();
//   physicalKeys.delete(k);
// });

// window.addEventListener('blur', () => {
// 	physicalKeys.clear();
// 	if (mainCharacter?.keyboard) 
// 		mainCharacter.keyboard.holdingKeys = [];
// });

// // 🔥 her frame'de logical key set oluştur ve karakterle senkronize et
// function syncKeys() {
// 	if (!mainCharacter?.keyboard) 
// 		return requestAnimationFrame(syncKeys);

// 	// normalize edilmiş logical set (ör: ['a','w'])
// 	const logicalKeys = new Set(Array.from(physicalKeys, normalizeKey));

// 	const holding = mainCharacter.keyboard.holdingKeys.map(x => x.key);

// 	// yeni basılanları bul
// 	for (const key of logicalKeys)
// 		if (!holding.includes(key))
// 			mainCharacter.keyboard.mouseDown(key);

// 	// bırakılanları bul
// 	for (const key of holding)
// 		if (!logicalKeys.has(key))
// 			mainCharacter.keyboard.mouseUp(key);

// 	requestAnimationFrame(syncKeys);
// }
// syncKeys();

// const physicalKeys = new Set();
// const lastDown = {};
// const lastUp = {};
// const antiGhostMsDir = 50; // yön tuşları için
// const antiGhostMsOther = 10; // diğer tüm tuşlar için daha düşük

// function normalizeKey(key) {
//   const _k = key?.toLowerCase?.() || null;
//   switch (_k) {
//     case 'arrowleft': return 'a';
//     case 'arrowup': return 'w';
//     case 'arrowdown': return 's';
//     case 'arrowright': return 'd';
//   }
//   return _k;
// }

// // Yön tuşları seti
// const directionKeys = new Set(['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']);

// window.addEventListener('keydown', (e) => {
//   if (mainCharacter?.disableKeyboard) return;

//   const kRaw = e.key?.toLowerCase?.();
//   if (!kRaw) return;

//   const now = performance.now();
//   const lastUpTime = lastUp[kRaw] || 0;

//   const antiGhostMs = directionKeys.has(kRaw)
//     ? antiGhostMsDir
//     : antiGhostMsOther;

//   // Ghost engelleme
//   if (now - lastUpTime < antiGhostMs)
//     return;

//   lastDown[kRaw] = now;
//   physicalKeys.add(kRaw);
// });

// window.addEventListener('keyup', (e) => {
//   const kRaw = e.key?.toLowerCase?.();
//   if (!kRaw) return;
//   lastUp[kRaw] = performance.now();
//   physicalKeys.delete(kRaw);
// });
// function blurKeyboard() {
// 	physicalKeys.clear();
// 	for (const k in lastDown) delete lastDown[k];
// 	for (const k in lastUp) delete lastUp[k];
//   	if (mainCharacter?.keyboard)
//     	mainCharacter.keyboard.holdingKeys = [];
// }
// window.addEventListener('blur', () => {
// 	blurKeyboard();
// });

// let frameCounter = 0;
// function syncKeysRobust() {
//   if (!mainCharacter?.keyboard)
//     return requestAnimationFrame(syncKeysRobust);

//   // Mobilde her frame, PC'de 3 frame'de bir
//   const doSync = !__isPC || (frameCounter++ % 3 === 0);

//   if (doSync) {
//     const logicalKeys = new Set(Array.from(physicalKeys, normalizeKey));
//     const desiredHolding = [];

//     for (const k of logicalKeys) {
//       let bestTime = 0;
//       for (const raw of physicalKeys) {
//         if (normalizeKey(raw) === k) {
//           const t = lastDown[raw] || 0;
//           if (t > bestTime) bestTime = t;
//         }
//       }
//       if (k) desiredHolding.push({ key: k, time: bestTime });
//     }

//     desiredHolding.sort((a, b) => a.time - b.time);
//     const desiredKeysArr = desiredHolding.map(x => x.key);
//     const holdingKeys = mainCharacter.keyboard.holdingKeys.map(x => x.key);

//     for (const k of desiredKeysArr)
//       if (!holdingKeys.includes(k))
//         mainCharacter.keyboard.mouseDown(k);

//     for (const k of holdingKeys)
//       if (!desiredKeysArr.includes(k))
//         mainCharacter.keyboard.mouseUp(k);
//   }

//   requestAnimationFrame(syncKeysRobust);
// }
// syncKeysRobust();

// --- GLOBAL KEY STATE SYSTEM ---
const physicalKeys = new Set();
const lastDown = {};
const lastUp = {};

const antiGhostMsDir = 50;   // W A S D yön tuşları için
const antiGhostMsOther = 10; // diğerleri için

function normalizeKey(key) {
  const _k = key?.toLowerCase?.() || null;
  switch (_k) {
    case 'arrowleft': return 'a';
    case 'arrowup': return 'w';
    case 'arrowdown': return 's';
    case 'arrowright': return 'd';
  }
  return _k;
}

const directionKeys = new Set(['w','a','s','d','arrowleft','arrowright','arrowup','arrowdown']);

// window.addEventListener('keydown', (e) => {
//   const kRaw = e.key?.toLowerCase?.();
//   if(kRaw === ' ' && episode?.hasSkippableScreen) {
// 		const _skippableScreen = document.querySelector('.quick-play-desc-container');
// 		if(_skippableScreen) {
// 			const _click = _skippableScreen.querySelector('[onexactclick]');
// 			if(_click)
// 				_click.onexactclick();
// 		}
// 		return;
//   }
//   if(e.repeat) {
// 	if(!physicalKeys.has(kRaw))
// 		return;
//   }
//   if (mainCharacter?.disableKeyboard || mainCharacter?.stop) {
// 	blurKeyboard();
// 	return;
//   }

  
//   if (!kRaw) return;

//   const now = performance.now();
//   const lastUpTime = lastUp[kRaw] || 0;

//   const antiGhostMs = directionKeys.has(kRaw)
//     ? antiGhostMsDir
//     : antiGhostMsOther;

//   // Ghost engelleme (çok hızlı basılıp bırakılmış gibi olaylar)
//   if (now - lastUpTime < antiGhostMs)
//     return;
//   pressSkill(e);
//   lastDown[kRaw] = now;
//   physicalKeys.add(kRaw);
// });

// window.addEventListener('keyup', (e) => {
//   const kRaw = e.key?.toLowerCase?.();
//   if (!kRaw) return;

//   lastUp[kRaw] = performance.now();
//   physicalKeys.delete(kRaw);
// });

// Blur'da tüm tuşları temizleyelim
function blurKeyboard() {
  //physicalKeys.clear();
  for (const k in lastDown) delete lastDown[k];
  for (const k in lastUp) delete lastUp[k];

  if (mainCharacter?.keyboard)
    mainCharacter.keyboard.holdingKeys = [];
}

window.addEventListener('blur', blurKeyboard);
let frameCounter = 0;


function resetTouchPad() {
	const _tp = document.getElementById("touch-d-pad-inner");
	if(_tp)
	{
		addClass(_tp, 'stay');
		_tp.style.transform = 'translate3d(0, 0, 0)';
	}
}
function resetDPadKeyCommands() {
	if(!mainCharacter?.keyboard)
		return;
	// if(!mainCharacter.keyboard)
	// 	switchAutoMode();
	mainCharacter.keyboard.mouseUp('w');
	mainCharacter.keyboard.mouseUp('a');
	mainCharacter.keyboard.mouseUp('s');
	mainCharacter.keyboard.mouseUp('d');
}
let lastAngle = null;
let lastDirKeys = new Set();
const directionThreshold = 18;  // açı farkı bu değeri aşmadıkça yön değişmez
//const deadZone = 10;            // dokunmatik merkez ölü bölge yarıçapı

function calculateSin(currentX, currentY) {
	const dx = currentX - touch_startX;
	const dy = currentY - touch_startY;
	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < deadZone) return; // ölü bölge

	const angle = Math.atan2(dy, dx) * 180 / Math.PI;

	//resetDPadKeyCommands();
	const _directionChangeable = mainCharacter && (mainCharacter.animation === 'idle' ||
		mainCharacter.animation === 'run' || mainCharacter.animation === 'walk'
	);
	if(_directionChangeable) {
		if(angle > -85 && angle < 85)
			mainCharacter.direction = __right;
		else if(angle > 95 || angle < -95)
			mainCharacter.direction = __left;
	}
	if (angle >= -30 && angle < 30) {
		// sağ
		mainCharacter.keyboard.mouseDown('d');
	}
	else if (angle >= 30 && angle < 65) {
		// sağ-alt
		mainCharacter.keyboard.mouseDown('d');
		mainCharacter.keyboard.mouseDown('s');
	}
	else if (angle >= 65 && angle < 115) {
		// alt
		mainCharacter.keyboard.mouseDown('s');
	}
	else if (angle >= 115 && angle < 150) {
		// sol-alt
		mainCharacter.keyboard.mouseDown('s');
		mainCharacter.keyboard.mouseDown('a');
	}
	else if (angle >= 150 || angle < -150) {
		// sol
		mainCharacter.keyboard.mouseDown('a');
	}
	else if (angle >= -150 && angle < -115) {
		// sol-üst
		mainCharacter.keyboard.mouseDown('a');
		mainCharacter.keyboard.mouseDown('w');
	}
	else if (angle >= -115 && angle < -65) {
		// üst
		mainCharacter.keyboard.mouseDown('w');
	}
	else if (angle >= -65 && angle < -30) {
		// sağ-üst
		mainCharacter.keyboard.mouseDown('w');
		mainCharacter.keyboard.mouseDown('d');
	}
}
let deadZone, touch_startX, touch_startY;
let lastValidTouch = null;
let touchID, _touches;
let cancelRecoveryTimeout = null;

function activateTouchPad() {
	if(document.getElementById('touch-d-pad'))
		return;

	deadZone = Math.min(episode.cWidth, episode.cHeight) * 0.04;
	const _dPadWrapper = document.createElement('div');
	_dPadWrapper.id = "touch-d-pad";
	const _dPad = document.createElement('div');
	_dPad.id = "touch-d-pad-inner";
	_dPad.className = "stay";
	_gameUI.appendChild(_dPad);
	_gameUI.appendChild(_dPadWrapper);
	_dPad.style.transform = 'translate3d(0, 0, 0)';
	const _rect = {
		left: MathRound(_dPadWrapper.offsetLeft),
		width: MathRound(_dPadWrapper.offsetWidth),
		height: MathRound(_dPadWrapper.offsetHeight),
		top: MathRound(_dPadWrapper.offsetTop)
	};
	const _maxLeft = MathRound(_rect.width / 2);
	const _maxTop = _maxLeft;
	const _padding = ((document.body.clientWidth - _gamePad.clientWidth) / 2);
	const _dpadRect = document.getElementById('touch-d-pad').getBoundingClientRect();
	const _gapY = episode.cUIHeight - _dpadRect.bottom;
	const dpadRect = {
		left: _dpadRect.left - _gapY,
		right: _dpadRect.right + _gapY,
		bottom: _dpadRect.bottom + _gapY,
		top: _dpadRect.top - _gapY
	};
	const workForDPad = function (x, y) {
		if(!mainCharacter?.keyboard)
			return;
		const _newTouches = {
			x: MathRound(x - _padding),
			y: MathRound(y)
		};
		calculateSin(_newTouches.x, _newTouches.y);
		const _diffX = _newTouches.x - touch_startX;
		let _left = _diffX;
		if (_left > _maxLeft) 
			_left = _maxLeft;
		else if (_left < -_maxLeft) 
			_left = -_maxLeft;
		const _diffY = _newTouches.y - touch_startY;
		let _top = _diffY;
		if (_top > _maxTop) 
			_top = _maxTop;
		 else if(_top  < -_maxTop) 
			_top = -_maxTop;
		if (!(_dPad.lastMoveTime > (_gameTick - __globalMS))) {
			_dPad.style.transform = `translate3d(${_left}px, ${_top}px, 0)`;
			_dPad.lastMoveTime = _gameTick;
		}

		_touches = _newTouches;
		lastValidTouch = _newTouches; // ← dokunmayı sakla
	};
	document.addEventListener('touchstart', function (_event) {
		 if (mainCharacter?.disableKeyboard || mainCharacter?.stop) {
			blurKeyboard();
			return;
		}
		for (let t of _event.changedTouches) {
			if (
				t.clientX >= dpadRect.left &&
				t.clientX <= dpadRect.right &&
				t.clientY >= dpadRect.top &&
				t.clientY <= dpadRect.bottom
			) {
				touchID = t.identifier;
				removeClass(_dPad, 'stay');
				_touches = {
					x: MathRound((_rect.left + (_rect.width / 2))),
					y: MathRound((_rect.top + (_rect.height / 2)))
				};
				touch_startX = _touches.x; //MathRound(t.pageX - _padding);
				touch_startY = _touches.y; // MathRound(t.pageY);
				lastValidTouch = { x: touch_startX, y: touch_startY };
				workForDPad(t.pageX, t.pageY);
			}
		}
	}, { passive: false });

	document.addEventListener('touchmove', function (_event) {
		 if (mainCharacter?.disableKeyboard || mainCharacter?.stop) {
			blurKeyboard();
			return;
		}
		_event.preventDefault();

		for (let t of _event.changedTouches) {
			if (t.identifier === touchID) {
				if (!_touches) {
					_touches = {
						x: MathRound(t.pageX - _padding),
						y: MathRound(t.pageY)
					};
				}
				workForDPad(t.pageX, t.pageY);
			}
		}
	}, { passive: false });

	const handleTouchEndOrCancel = function (_event, isCancel = false) {
		// if (mainCharacter?.disableKeyboard)
		// 	return;

		for (let t of _event.changedTouches) {
			if (t.identifier === touchID) {
				if (!hasClass(_dPad, 'stay'))
					addClass(_dPad, 'stay');
				_touches = touchID = undefined;
				resetDPadKeyCommands();
				if (isCancel && lastValidTouch) {
					clearTimeout(cancelRecoveryTimeout);
					cancelRecoveryTimeout = setTimeout(() => {
						if (mainCharacter?.disableKeyboard) return;
						touch_startX = lastValidTouch.x;
						touch_startY = lastValidTouch.y;
						_touches = { ...lastValidTouch };
						removeClass(_dPad, 'stay');
					}, 30);
				}
			}
		}
	};

	document.addEventListener('touchend', e => handleTouchEndOrCancel(e), { passive: false });
	document.addEventListener('touchcancel', e => handleTouchEndOrCancel(e, true), { passive: false });
}

function pressSkill(e) {
	if(e.repeat)
		return;
	let key = formatKeyName(e).toLowerCase();
	const slot = document.querySelector('[data-key="' + key + '"]:not(.v-none)');
	if(!slot)
		return;
	 if (hasClass(slot, "skill-pressed")) return;
	 if (hasClass(slot, "locked")) return;

    addClass(slot, 'skill-pressed');

    slot.addEventListener("animationend", () => {
    	removeClass(slot, 'skill-pressed');
    }, { once:true });
}