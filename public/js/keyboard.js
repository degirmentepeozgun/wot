'use strict';
const _keyCombinations = [
	{
		title: {
			en: 'Move Left',
			tr: 'Sola Git'
		},
		baseKey: 'A',
		desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%" />'
	},
	{
		title: {
			en: 'Move Right',
			tr: 'Sağa Git'
		},
		baseKey: 'D',
		desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%;transform:rotate(-90deg)" />'
	},
	{
		title: {
			en: 'Move Up',
			tr: 'Yukarı Git'
		},
		baseKey: 'W',
		desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%;transform:rotate(-180deg)" />'
	},
	{
		title: {
			en: 'Move Down',
			tr: 'Aşağı Git'
		},
		baseKey: 'S',
		desc: '<img class="readonly-key-combination" src="./images/icons/left-keyboard.png" style="height:80%;transform:rotate(-270deg)" />'
	},
	{
		title: {
			en: 'Block',
			tr: 'Korunma'
		},
		baseKey: 'H'
	},
	{
		title: {
			en: 'Dodge',
			tr: 'Atlama'
		},
		baseKey: 'G'
	},
	{
		title: {
			en: 'Normal Attack',
			tr: 'Basit Saldırı'
		},
		baseKey: ' '
	},
	{
		title: {
			en: 'Ground Attack',
			tr: 'Yerden Saldırı'
		},
		baseKey: 'J'
	},
	{
		title: {
			en: 'Air Attack',
			tr: 'Hava Saldırısı'
		},
		baseKey: 'K'
	},
	{
		title: {
			en: 'Ranged Attack',
			tr: 'Uzaktan Saldırı'
		},
		baseKey: 'L'
	},
	{
		title: {
			en: 'Rage Mode',
			tr: 'Öfke Modu'
		},
		baseKey: 'E'
	},
	{
		title: {
			en: 'Special Skill',
			tr: 'Özel Yetenek'
		},
		baseKey: 'Q'
	},
	{
		title: {
			en: 'Tag Skill',
			tr: 'Destek Yeteneği'
		},
		baseKey: 'T'
	},
	{
		title: {
			en: 'Counter Attack Chain',
			tr: 'Karşı Saldırı Zinciri'
		},
		baseKey: 'F'
	},
	{
		title: {
			en: 'Escape Chain',
			tr: 'Kaçış Zinciri'
		},
		baseKey: 'R'
	},
	{
		title: {
			en: 'Action',
			tr: 'Eylem'
		},
		baseKey: 'U'
	},
	{
		title: {
			en: 'Drink Potion',
			tr: 'İksir İçme'
		},
		baseKey: 'P'
	},
	{
		title: {
			en: 'Common Skill 1',
			tr: 'Ortak Beceri 1'
		},
		baseKey: '1'
	},
	{
		title: {
			en: 'Common Skill 2',
			tr: 'Ortak Beceri 2'
		},
		baseKey: '2'
	},
	{
		title: {
			en: 'Common Skill 3',
			tr: 'Ortak Beceri 3'
		},
		baseKey: '3'
	},
	{
		title: {
			en: 'Common Skill 4',
			tr: 'Ortak Beceri 4'
		},
		baseKey: '4'
	}
];
let activeInput = null;
let previousKeyBindValue = '';

const blockedKeys = [
	'Shift',
	'Control',
	'Alt',
	'AltGraph',
	'Meta',
	'CapsLock',
	'NumLock',
	'ScrollLock',
	'Pause',
	'Insert'
];
const blockedAsciis = [
	16, 17, 18, 19, 20, 33, 34, 35, 36, 44, 45, 46, 91, 92, 93, 144, 145, 173, 174, 175, 181, 182, 183
];
function readyToBindKey(_elem) {
	document.querySelectorAll('.key-combination-item')?.forEach((x) => removeClass(x, 'waiting'));
	activeInput = _elem;
	previousKeyBindValue = _elem.value;
	_elem.value = '...';
	addClass(_elem, 'waiting');
}
function tryResetBindKey(_elem) {
	removeClass(_elem, 'waiting');
	removeClass(_elem, 'error');
	if (_elem.value === '...') _elem.value = previousKeyBindValue === ' ' ? 'SPACE' : previousKeyBindValue;
	activeInput = null;
}

function isKeyAlreadyUsed(key, currentInput) {
	let used = false;

	document.querySelectorAll('.key-combination-item')?.forEach((inp) => {
		if (inp !== currentInput && inp.value === key) {
			used = true;
		}
	});

	return used;
}

function stopListening() {
	if (!activeInput) return;
	removeClass(activeInput, 'waiting');
}
function setBindKey(_elem, e) {
	removeClass(_elem, 'error');
	if (!activeInput) return;

	if (e.key === 'Tab') {
		stopListening();
		return;
	}

	e.preventDefault();

	if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || e.key === 'Enter') {
		return;
	}

	if (e.key === 'Escape') {
		_elem.value = previousKeyBindValue;
		stopListening();
		return;
	}
	if (e.keyCode === 8) {
		readyToBindKey(_elem);
		return;
	}

	if (blockedKeys.includes(e.key)) return;

	if (blockedAsciis.includes(e.keyCode)) return;
	let keyName = formatKeyName(e);

	if (isKeyAlreadyUsed(keyName, _elem)) {
		PlaySound({ key: 'disabled' });
		addClass(_elem, 'error');
		return;
	}

	_elem.value = keyName;
	PlaySound({ key: 'keyboard', volume: 0.2 });
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
	this.recordKey = function (_k, _name) {
		if (!episode?.fatality || episode?.fatalityHappened) {
			if (this.recordingKeys?.[0]) this.recordingKeys = [];
			return;
		}
		this.recordingKeys.push({ key: _k, name: _name });
		if (this.recordingKeys.length > 10) this.recordingKeys.splice(0, 1);
		if (
			this.character.animations.finishend?.keyCombination?.[0] &&
			this.recordingKeys.length >= this.character.animations.finishend.keyCombination.length
		) {
			const _kc = this.character.animations.finishend.keyCombination;
			for (let i = this.recordingKeys.length - _kc.length; i < this.recordingKeys.length; i++) {
				const _rk = this.recordingKeys[i];
				if (_rk.name === _kc[0]) {
					let _inc = 1;
					for (let j = i + 1; j < i + _kc.length; j++) {
						if (_kc[_inc] !== this.recordingKeys?.[j]?.name) break;
						_inc++;
					}
					if (_inc === _kc.length && this.character.target) this.fatality(1);
				}
			}
		}
	};
	this.addKey = function (_k, _name) {
		if ((this.character?.immobilize || __storyTell || this.character?.sleep || _dialogAppeared) && !_focusMode)
			return;
		const KEYS = this.holdingKeys;
		const index = KEYS.findIndex((x) => x.key === _k);

		if (index !== -1) {
			if (index !== KEYS.length - 1) KEYS.push(KEYS.splice(index, 1)[0]);

			return;
		}
		const _end = this.keyStates[_k]?.lastEnd;
		this.removeKey(_k, null, 1);

		if (performance.now() - _end < 20) {
			console.log('AHANDA BULDUM 2');
			return;
		}

		if (!this.keyStates[_k]?.isDown) this.keyStates[_k] = { isDown: true };
		const _type =
			_k === self.keys[16] || _k === self.keys[17] || _k === self.keys[0] || _k === self.keys[2]
				? 'move'
				: 'skill';
		if (_type === 'skill') this.holdingKeys = this.holdingKeys.filter((x) => x.type !== _type || x.key === ' ');
		this.holdingKeys.push({
			type: _type,
			key: _k,
			name: _name
		});

		this.character.lastActivity = _gameTick;
	};
	this.removeCommonSkill = function () {
		this.holdingKeys = this.holdingKeys.filter((x) => x.name !== 'common') ?? [];
	};
	this.removeSkill = function (_skillName) {
		this.removeKey(_skillName, null, 1);
	};
	this.removeKey = function (_k, _release, _skipState) {
		let _has;
		if (!_skipState) this.keyStates[_k] = { isDown: false, lastEnd: performance.now() };
		for (var i = 0; i < this.holdingKeys.length; i++) {
			const _key = this.holdingKeys[i];
			if (_key.key === _k) {
				_has = 1;
				if (_release) this.recordKey(_k, _key.name);
				break;
			}
		}
		if (_has) this.holdingKeys = this.holdingKeys.filter((x) => x.key !== _k);
	};
	this.getXMove = function () {
		const _arr = this.holdingKeys.filter((x) => x.key === self.keys[0] || x.key === self.keys[2]);
		if (_arr?.[0]) return _arr[_arr.length - 1];
		return undefined;
	};
	this.getYMove = function () {
		const _arr = this.holdingKeys.filter((x) => x.key === self.keys[16] || x.key === self.keys[17]);
		if (_arr?.[0]) return _arr[_arr.length - 1];
		return undefined;
	};
	this.getMove = function () {
		const _move = this.holdingKeys.filter((x) => x.type === 'move');
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
	};
	this.getLastMove = function () {
		const _move = this.holdingKeys.filter((x) => x.type === 'move');
		if (_move?.[0]) return _move[_move.length - 1];
		return undefined;
	};
	this.getCommonSkillOrder = function () {
		return this.holdingKeys.find((x) => x.name === 'common')?.key ?? 0;
	};
	this.getSkill = function () {
		const _skill = this.holdingKeys.filter((x) => x.type === 'skill');
		if (_skill?.[0]) {
			for (var i = _skill.length - 1; i >= 0; i--) {
				const _key = _skill[i].name;
				const _s = _key === 'common' || this.character.animations[_key];
				if (!_s) continue;
				if (_s.coolDownLeft > 0 && !_s.charge) {
					if (_s.before) {
						const _sb = this.character.animations[_s.before];
						if (_sb.coolDownLeft > 0) {
							if (
								this.holdingKeys.find((x) => x.name === _key) &&
								this.character.main &&
								!this.character.hurting &&
								this.character.animation !== _key
							) {
								if (!(this.character.lastKeyWarned > _gameTick - 1000)) {
									this.character.lastKeyWarned = _gameTick;
								}
							}
							continue;
						}
					} else {
						if (
							this.holdingKeys.find((x) => x.name === _key) &&
							this.character.main &&
							!this.character.hurting &&
							this.character.animation !== _key
						)
							if (!(this.character.lastKeyWarned > _gameTick - 1000)) {
								this.character.lastKeyWarned = _gameTick;
							}
						continue;
					}
				}
				return _skill[i].name;
			}
		}
		return undefined;
	};
	this.mouseUp = function (key) {
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
					self.removeKey(self.keys[2], 1);
				}
				break;
			case 'tab':
				switchCharacter(null, null, null, 1);
				break;
			default:
				break;
		}
	};
	this.fatality = function (_force) {
		let _skillName = 'finish' + (this.character.upcomingFinishingMove ?? '');
		if (!_force && this.character.animations[_skillName]?.keyCombination) return;
		if (this.character.target || this.character.action) self.addKey(self.keys[18], _skillName);
		else if (this.character.hasAdvicedItem) wearStatusItem();
	};
	this.action = function (_key) {
		if (
			(this.character && !__storyTell && (this.character.deadTime || this.character.isDead())) ||
			keyboardHeight > 0
		)
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
				if (self.character.chains?.[0]) self.addKey(self.keys[10], self.character.chains[0].key);
				break;
			case self.keys[11]:
				if (self.character.chains?.[1]) self.addKey(self.keys[11], self.character.chains[1].key);
				break;
			case self.keys[8]:
				if (!skill.isActive('air2')) return;
				self.addKey(self.keys[8], 'air2');
				break;
			case self.keys[9]:
				if (!skill.isActive('defense')) return;
				self.addKey(self.keys[9], 'defense');
				break;
			case self.keys[4]:
				self.addKey(self.keys[4], 'block');
				break;
			case self.keys[5]:
				if (!skill.isActive('ground1')) return;
				self.addKey(self.keys[5], 'ground1');
				break;
			case self.keys[6]:
				if (!skill.isActive('ground2')) return;
				self.addKey(self.keys[6], 'ground2');
				break;
			case 'dash':
				break;
			case self.keys[7]:
				if (!skill.isActive('air1')) return;
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
				if (!this.character.animations.tag) return;
				self.addKey(self.keys[24], 'tag');
				break;
			case self.keys[3]:
				if (this.character.main && __account.questStatus.dialogArr) {
					skipDialog();
					return;
				} else if (__storyTell?.firstSeen) {
					__storyTell.skip();
					return;
				}
				self.addKey(self.keys[3], 'attack');
				break;
		}
	};
	this.inform = function () {
		let _note = '';
		for (var _key of this.holdingKeys) _note += _key.key + ' ';
		console.log(_note);
	};
	this.mouseDown = function (_key) {
		this.action(_key);
	};
}
const ignoredKeys = ['Escape', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock', 'Tab'];
function tryOpenGame() {
	if (__account?.gameOpening && gameIsReady) {
		const _modal = document.querySelectorAll('.inventory-question, .settings-before-play');
		if (!_modal?.[0]) {
			if (ignoredKeys.includes(event.key)) return;
			if (/^F\d+$/.test(event.key)) return;
			delete __account.gameOpening;
			if (_presentationMode) activateGameStart();
			else activateGameStart(1, 1);
			return true;
		}
	}
	return false;
}
window.addEventListener('keydown', function (event) {
	if (tryOpenGame()) return;
	const kRaw = String(event.key || '').toLowerCase();
	if (kRaw === ' ') {
		if (episode?.hasFocusUIDoneBtn) {
			const _skippableScreen = document.querySelector('.black-screen-ok-btn');
			if (_skippableScreen) {
				const _click = _skippableScreen.querySelector('.game-btn2');
				if (_click) _click.onexactclick();
			}
			return;
		} else if (!episode || episode.end) {
			const _btn = document.querySelector('.quick-space-btn:not(.disabled,.inactivated)');
			if (_btn && _btn.onexactclick) {
				_btn.onexactclick();
				return;
			}
		}
	}
	if (mainCharacter?.disableKeyboard) {
		mainCharacter.holdingKeys = [];
		return;
	}

	try {
		if (episode?.hasSkippableScreen && kRaw === ' ') {
			const _skippableScreen = document.querySelector('.quick-play-desc-container');
			if (_skippableScreen) {
				const _click = _skippableScreen.querySelector('[onexactclick]');
				if (_click) _click.onexactclick();
			}
			return;
		}
		if (event?.key) {
			if (event.which === 9) event.preventDefault();

			pressSkill(event);

			mainCharacter.keyboard.mouseDown(event.key.toLocaleLowerCase());
		}
	} catch (e) {
		console.log(e.message);
	}
});
window.addEventListener('keyup', function (event) {
	if (mainCharacter?.disableKeyboard) {
		mainCharacter.holdingKeys = [];
		return;
	}
	try {
		if (event?.key) {
			if (event.which === 9) event.preventDefault();
			mainCharacter.keyboard.mouseUp(event.key.toLowerCase());
		}
	} catch (e) {}
});

const physicalKeys = new Set();
const lastDown = {};
const lastUp = {};

const antiGhostMsDir = 50;
const antiGhostMsOther = 10;

function normalizeKey(key) {
	const _k = key?.toLowerCase?.() || null;
	switch (_k) {
		case 'arrowleft':
			return 'a';
		case 'arrowup':
			return 'w';
		case 'arrowdown':
			return 's';
		case 'arrowright':
			return 'd';
	}
	return _k;
}

function blurKeyboard() {
	for (const k in lastDown) delete lastDown[k];
	for (const k in lastUp) delete lastUp[k];

	if (mainCharacter?.keyboard) mainCharacter.keyboard.holdingKeys = [];
	resetDPadKeyCommands();
}

window.addEventListener('blur', blurKeyboard);
let frameCounter = 0;

function resetTouchPad() {
	const _tp = document.getElementById('touch-d-pad-inner');
	if (_tp) {
		addClass(_tp, 'stay');
		_tp.style.transform = 'translate3d(0, 0, 0)';
	}
}
function resetDPadKeyCommands() {
	if (!mainCharacter?.keyboard) return;

	mainCharacter.keyboard.mouseUp('w');
	mainCharacter.keyboard.mouseUp('a');
	mainCharacter.keyboard.mouseUp('s');
	mainCharacter.keyboard.mouseUp('d');
	mainCharacter.keyboard.lastDirection = null;
}
let lastAngle = null;
let lastDirKeys = new Set();

function calculateSin(currentX, currentY) {
	const dx = currentX - touch_startX;
	const dy = currentY - touch_startY;
	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < deadZone) return;

	const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

	if (angle >= -25 && angle < 25) {
		mainCharacter.keyboard.mouseDown('d');
		if (mainCharacter.keyboard.lastDirection === 'sağ') return;
		mainCharacter.keyboard.mouseUp('w');
		mainCharacter.keyboard.mouseUp('a');
		mainCharacter.keyboard.mouseUp('s');

		mainCharacter.keyboard.lastDirection = 'sağ';
	} else if (angle >= 25 && angle < 70) {
		mainCharacter.keyboard.mouseDown('d');
		mainCharacter.keyboard.mouseDown('s');
		if (mainCharacter.keyboard.lastDirection === 'sağ-alt') return;
		mainCharacter.keyboard.mouseUp('w');
		mainCharacter.keyboard.mouseUp('a');

		mainCharacter.keyboard.lastDirection = 'sağ-alt';
	} else if (angle >= 70 && angle < 110) {
		mainCharacter.keyboard.mouseDown('s');
		if (mainCharacter.keyboard.lastDirection === 'alt') return;
		mainCharacter.keyboard.mouseUp('w');
		mainCharacter.keyboard.mouseUp('a');
		mainCharacter.keyboard.mouseUp('d');

		mainCharacter.keyboard.lastDirection = 'alt';
	} else if (angle >= 110 && angle < 155) {
		mainCharacter.keyboard.mouseDown('s');
		mainCharacter.keyboard.mouseDown('a');
		if (mainCharacter.keyboard.lastDirection === 'sol-alt') return;
		mainCharacter.keyboard.mouseUp('w');
		mainCharacter.keyboard.mouseUp('d');

		mainCharacter.keyboard.lastDirection = 'sol-alt';
	} else if (angle >= 155 || angle < -155) {
		mainCharacter.keyboard.mouseDown('a');
		if (mainCharacter.keyboard.lastDirection === 'sol') return;
		mainCharacter.keyboard.mouseUp('w');
		mainCharacter.keyboard.mouseUp('s');
		mainCharacter.keyboard.mouseUp('d');

		mainCharacter.keyboard.lastDirection = 'sol';
	} else if (angle >= -155 && angle < -110) {
		mainCharacter.keyboard.mouseDown('a');
		mainCharacter.keyboard.mouseDown('w');
		if (mainCharacter.keyboard.lastDirection === 'sol-üst') return;
		mainCharacter.keyboard.mouseUp('s');
		mainCharacter.keyboard.mouseUp('d');

		mainCharacter.keyboard.lastDirection = 'sol-üst';
	} else if (angle >= -110 && angle < -70) {
		mainCharacter.keyboard.mouseDown('w');
		if (mainCharacter.keyboard.lastDirection === 'üst') return;
		mainCharacter.keyboard.mouseUp('a');
		mainCharacter.keyboard.mouseUp('s');
		mainCharacter.keyboard.mouseUp('d');

		mainCharacter.keyboard.lastDirection = 'üst';
	} else if (angle >= -70 && angle < -25) {
		mainCharacter.keyboard.mouseDown('w');
		mainCharacter.keyboard.mouseDown('d');
		if (mainCharacter.keyboard.lastDirection === 'sağ-üst') return;
		mainCharacter.keyboard.mouseUp('a');
		mainCharacter.keyboard.mouseUp('s');

		mainCharacter.keyboard.lastDirection = 'sağ-üst';
	}
}
let deadZone, touch_startX, touch_startY;
let lastValidTouch = null;
let touchID, _touches;
let cancelRecoveryTimeout = null;

function activateTouchPad() {
	if (document.getElementById('touch-d-pad')) return;

	deadZone = Math.min(episode.cWidth, episode.cHeight) * 0.04;
	const _dPadWrapper = document.createElement('div');
	_dPadWrapper.id = 'touch-d-pad';
	const _dPad = document.createElement('div');
	_dPad.id = 'touch-d-pad-inner';
	_dPad.className = 'stay';
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
	const _dpadRect = document.getElementById('touch-d-pad').getBoundingClientRect();
	const _centerX = _dpadRect.left + _dpadRect.width / 2;
	const _centerY = _dpadRect.top + _dpadRect.height / 2;
	const _gapY = episode.cUIHeight - _dpadRect.bottom;
	const dpadRect = {
		left: _dpadRect.left - _gapY,
		right: _dpadRect.right + _gapY,
		bottom: _dpadRect.bottom + _gapY,
		top: _dpadRect.top - _gapY
	};
	const workForDPad = function (x, y) {
		if (!mainCharacter?.keyboard) return;
		const _newTouches = {
			x: MathRound(x),
			y: MathRound(y)
		};
		calculateSin(_newTouches.x, _newTouches.y);
		const _diffX = _newTouches.x - touch_startX;
		let _left = _diffX;
		if (_left > _maxLeft) _left = _maxLeft;
		else if (_left < -_maxLeft) _left = -_maxLeft;
		const _diffY = _newTouches.y - touch_startY;
		let _top = _diffY;
		if (_top > _maxTop) _top = _maxTop;
		else if (_top < -_maxTop) _top = -_maxTop;
		if (!(_dPad.lastMoveTime > _gameTick - __globalMS)) {
			_dPad.style.transform = `translate3d(${_left}px, ${_top}px, 0)`;
			_dPad.lastMoveTime = _gameTick;
		}

		_touches = _newTouches;
		lastValidTouch = _newTouches;
	};
	document.addEventListener(
		'touchstart',
		function (_event) {
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
						x: MathRound(_centerX),
						y: MathRound(_centerY)
					};
					touch_startX = _touches.x;
					touch_startY = _touches.y;
					lastValidTouch = { x: touch_startX, y: touch_startY };
					workForDPad(t.clientX, t.clientY);
				}
			}
		},
		{ passive: false }
	);

	document.addEventListener(
		'touchmove',
		function (_event) {
			if (mainCharacter?.disableKeyboard || mainCharacter?.stop) {
				blurKeyboard();
				return;
			}
			_event.preventDefault();

			for (let t of _event.changedTouches) {
				if (t.identifier === touchID) {
					if (!_touches) {
						_touches = {
							x: MathRound(t.clientX),
							y: MathRound(t.clientY)
						};
					}
					workForDPad(t.clientX, t.clientY);
				}
			}
		},
		{ passive: false }
	);

	const handleTouchEndOrCancel = function (_event, isCancel = false) {
		for (let t of _event.changedTouches) {
			if (t.identifier === touchID) {
				if (!hasClass(_dPad, 'stay')) addClass(_dPad, 'stay');
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

	document.addEventListener('touchend', (e) => handleTouchEndOrCancel(e), { passive: false });
	document.addEventListener('touchcancel', (e) => handleTouchEndOrCancel(e, true), { passive: false });
}

function pressSkill(e) {
	if (e.repeat) return;
	let key = formatKeyName(e);
	const slot = document.querySelector('[data-key="' + key + '"]:not(.v-none)');
	if (!slot) return;
	if (hasClass(slot, 'skill-pressed')) return;
	if (hasClass(slot, 'locked')) return;

	addClass(slot, 'skill-pressed');

	slot.onanimationend = null;

	slot.onanimationend = () => {
		removeClass(slot, 'skill-pressed');
	};
}
function formatKeyName(e) {
	const key = String(e?.key || '').toLowerCase();

	if (e.code === 'Space') return 'space';

	return key;
}
