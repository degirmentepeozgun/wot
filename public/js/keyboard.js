'use strict';
function keyboard(_character, _keys) {
	_character.blockReleased = true;
	this.character = _character;
	this.lastAction = {};
	this.holdingKeys = [];
	this.recordingKeys = [];
	this.keys = _keys;
	const self = this;
	this.recordKey = function(_k, _name) {
		// if(!episode?.fatality || episode?.fatalityHappened) {
		// 	if(this.recordingKeys?.[0])
		// 		this.recordingKeys = [];
		// 	return;
		// }
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
		if ((this.character?.immobilize || this.character?.sleep || _dialogAppeared) && !_focusMode)
			return;
		const _key = this.holdingKeys.find(x => x.key === _k);
		if (_key)
			return;
		this.removeKey(_k);
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
		this.removeKey(_skillName);
	}
	this.removeKey = function (_k, _release) {
		let _has;
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
		return parseInt(this.holdingKeys.find(x => x.name === 'common')?.key ?? 0);
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
		let _skillName = 'finish' + (this.character.upcomingFinishingMove ?? '');
		if(!_force && this.character.animations[_skillName]?.keyCombination)
			return;
		if (this.character.target || this.character.action)
			self.addKey(self.keys[18], _skillName);
	}
	this.action = function (_key) {
		if((this.character && (this.character.deadTime || this.character.isDead())) || keyboardHeight > 0)
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
// window.addEventListener('keydown', function (event) {
// 	if(mainCharacter?.disableKeyboard){
// 		mainCharacter.holdingKeys = [];
// 		return;
// 	}
// 	if (event.repeat) return;
// 	try {
// 		if (event?.key) {
// 			if (event.which === 9)
// 				event.preventDefault();
// 			// if(!mainCharacter.keyboard)
// 			// 	switchAutoMode();
// 			mainCharacter.keyboard.mouseDown(event.key.toLocaleLowerCase());
// 		}
// 	} catch (e) {

// 	}
// });
// window.addEventListener('keyup', function (event) {
// 	if(mainCharacter?.disableKeyboard){
// 		mainCharacter.holdingKeys = [];
// 		return;
// 	}
// 	try {
// 		if (event?.key) {
// 			if (event.which === 9)
// 				event.preventDefault();
// 			// if(!mainCharacter.keyboard)
// 			// 	switchAutoMode();
// 			mainCharacter.keyboard.mouseUp(event.key.toLowerCase());
// 		}
// 	} catch (e) {

// 	}
// });
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



const physicalKeys = new Set();
const lastDown = {};
const lastUp = {};
const antiGhostMs = 50; // 40–60 ms arası güvenli (re-press ghostları engeller)

// normalizeKey: yön tuşlarını WASD'e eşler
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

// --- Event listeners ---
window.addEventListener('keydown', (e) => {
  if (mainCharacter?.disableKeyboard) return;

  const kRaw = e.key?.toLowerCase?.();
  if (!kRaw) return;

  const now = performance.now();
  const lastUpTime = lastUp[kRaw] || 0;

  // Anti-ghost check — keyup’tan hemen sonra gelen keydown'u yoksay
  if (now - lastUpTime < antiGhostMs) {
    // console.log('[Ghost prevented]', kRaw, now - lastUpTime);
    return;
  }

  lastDown[kRaw] = now;
  physicalKeys.add(kRaw);
});

window.addEventListener('keyup', (e) => {
  const kRaw = e.key?.toLowerCase?.();
  if (!kRaw) return;
  lastUp[kRaw] = performance.now();
  physicalKeys.delete(kRaw);
});

window.addEventListener('blur', () => {
  physicalKeys.clear();
  for (const k in lastDown) delete lastDown[k];
  for (const k in lastUp) delete lastUp[k];
  if (mainCharacter?.keyboard)
    mainCharacter.keyboard.holdingKeys = [];
});

// --- Frame-based senkronizasyon ---
let frameCounter = 0;

function syncKeysRobust() {
  if (!mainCharacter?.keyboard) return requestAnimationFrame(syncKeysRobust);

  // === sadece her 3 frame'de bir çalışsın ===
  if (frameCounter++ % 3 === 0) {
    const logicalKeys = new Set(Array.from(physicalKeys, normalizeKey));
    const desiredHolding = [];

    for (const k of logicalKeys) {
      let bestRaw = null;
      let bestTime = 0;
      for (const raw of physicalKeys) {
        if (normalizeKey(raw) === k) {
          const t = lastDown[raw] || 0;
          if (t > bestTime) {
            bestTime = t;
            bestRaw = raw;
          }
        }
      }
      if (k) desiredHolding.push({ key: k, time: bestTime });
    }

    desiredHolding.sort((a, b) => (a.time || 0) - (b.time || 0));

    const desiredKeysArr = desiredHolding.map(x => x.key);
    const holdingKeys = mainCharacter.keyboard.holdingKeys.map(x => x.key);

    for (const k of desiredKeysArr) {
      if (!holdingKeys.includes(k)) {
        mainCharacter.keyboard.mouseDown(k);
      }
    }

    for (const k of holdingKeys) {
      if (!desiredKeysArr.includes(k)) {
        mainCharacter.keyboard.mouseUp(k);
      }
    }
  }

  requestAnimationFrame(syncKeysRobust);
}

syncKeysRobust();
