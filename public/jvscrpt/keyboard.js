'use strict';
function keyboard(_character, _keys) {
	_character.blockReleased = true;
	this.character = _character;
	this.lastAction = {};
	this.holdingKeys = [];
	this.keys = _keys;
	const self = this;
	this.addKey = function (_k, _name) {
		if (this.character?.immobilize || this.character?.sleep || _dialogAppeared)
			return;
		const _key = this.holdingKeys.find(x => x.key === _k);
		if (_key)
			return;
		this.removeKey(_k);
		const _type = (_k === self.keys[16] || _k === self.keys[17] || _k === self.keys[0] || _k === self.keys[2]) ? 'move' : 'skill';
		this.holdingKeys.push({
			type: _type,
			key: _k,
			name: _name
		});
		if (/*(_type === 'move' || _k === ' ') && */this.character.main) {
			const _json = { c: 'ak', hk: _k, s: this.character.socketId };
			if (_k === 'r' || _k === 'f')
				_json.ch = 1;
			sendMessage(JSON.stringify(_json));
		}
		this.character.lastActivity = msNow;
		// if (this.character.disconnected) {
		// 	console.log("re-connected");
		// 	this.character.getNewStatus(1);
		// 	delete this.character.disconnected;
		// }
	}
	this.removeCommonSkill = function () {
		this.holdingKeys = this.holdingKeys.filter(x => x.name !== 'common') ?? [];
	}
	this.removeSkill = function (_skillName) {
		this.removeKey(_skillName);
	}
	this.removeKey = function (_k) {
		let index = -1;
		for (var i = 0; i < this.holdingKeys.length; i++) {
			const _key = this.holdingKeys[i];
			if (_key.key === _k) {
				if (/*(_key.type === 'move' || _key.key === ' ') && */this.character.main)
					sendMessage(JSON.stringify({ c: 'rk', hk: _k, s: this.character.socketId }));
				index = i;
				break;
			}
		}
		if (index > -1) {
			this.holdingKeys.splice(index, 1);
			//sendMessage(JSON.stringify({ c: 'rk', k: _k, ck: this.character.key, e: episode.id }));
		}
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
							if (this.holdingKeys.find(x => x.name === _key) && this.character.main && this.character.animation !== _key)
								warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
							continue;
						}
					}
					else {
						if (this.holdingKeys.find(x => x.name === _key) && this.character.main && this.character.animation !== _key)
							warn('<span>' + getLangData('Skill not ready yet') + '</span>', 'warn');
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
				self.removeKey(key);
				break;
			case self.keys[5]:
				self.removeKey(key);
				break;
			case self.keys[6]:
				self.removeKey(key);
				break;
			case self.keys[7]:
				self.removeKey(key);
				break;
			case self.keys[8]:
				self.removeKey(key);
				break;
			case self.keys[9]:
				self.removeKey(key);
				break;
			case self.keys[10]:
				self.removeKey(key);
				break;
			case self.keys[11]:
				self.removeKey(key);
				break;
			case self.keys[18]:
				self.removeKey(key);
				break;
			case self.keys[3]:
				self.removeKey(key);
				break;
			case self.keys[1]:
				self.removeKey(self.keys[1]);
				break;
			case self.keys[13]:
			case self.keys[16]:
				self.removeKey(self.keys[16]);
				break;
			case self.keys[15]:
			case self.keys[17]:
				self.removeKey(self.keys[17]);
				break;
			case self.keys[19]:
			case self.keys[20]:
			case self.keys[21]:
			case self.keys[22]:
				self.removeCommonSkill();
				break;
			case self.keys[0]:
			case self.keys[12]:
				self.removeKey(self.keys[0]);
				break;
			case self.keys[2]:
			case self.keys[14]:
				{
					//key = self.keys[2];
					//const move = self.getLastMove();
					//if (move?.key === key)
					//	moveHoldDate = move.date;
					self.removeKey(self.keys[2]);
				}
				break;
			case 'tab':
				switchCharacter();
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
	this.action = function (_key) {
		if((this.character && (this.character.deadTime || this.character.isDead())) || document.querySelector('input'))
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
				if (self.character.chains)
					self.addKey(self.keys[10], self.character.chains[0].key);
				break;
			case self.keys[11]:
				if (self.character.chains)
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
				//if (!skill.isActive('finish'))
				//	return;
				let i = 1, _skillName = 'finish' + (this.character.upcomingFinishingMove ?? '');
				// while (true) {
				// 	if (!this.character.animations['finish' + i]) {
				// 		i--;
				// 		break;
				// 	}
				// 	i++;
				// }
				// if (i > 0)
				// 	_skillName += getRandomValue(1, i);
				if (this.character.target || this.character.action)
					self.addKey(self.keys[18], _skillName);
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
			case self.keys[3]:
				if (this.character.main && __account.questStatus.dialogArr) {
					skipDialog();
					return;
				}
				if (this.character.main && hasClass(document.getElementById('board-scroll'), 'loaded')) {
					if (!__account.questStatus.side.state)
						acceptSideQuest(__account.questStatus.side.order);
					else
						hideMyModalPopUp();
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
		const _btns = document.querySelectorAll('.skill[data-key="' + _key + '"]');
		if (_btns?.[0])
			for (var _btn of _btns) {
				addClass(_btn, 'pop-out-short');
				setTimeout(function () {
					removeClass(_btn, 'pop-out-short');
				}, 200);
			}
		this.action(_key);
	}
}
window.addEventListener('keydown', function (event) {
	if(mainCharacter?.disableKeyboard)
		return;
	try {
		if (event?.key) {
			if (event.which === 9)
				event.preventDefault();
			if(!mainCharacter.keyboard)
				switchAutoMode();
			mainCharacter.keyboard.mouseDown(event.key.toLocaleLowerCase());
		}
	} catch (e) {

	}
});
window.addEventListener('keyup', function (event) {
	if(mainCharacter?.disableKeyboard)
		return;
	try {
		if (event?.key) {
			if (event.which === 9)
				event.preventDefault();
			if(!mainCharacter.keyboard)
				switchAutoMode();
			mainCharacter.keyboard.mouseUp(event.key.toLowerCase());
		}
	} catch (e) {

	}
});