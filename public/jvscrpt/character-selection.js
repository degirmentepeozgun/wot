'use strict';
const __characterInfos = [
	{
		class: 'archer',
		race: 'Human',
		classText: 'Ranger',
		type: 'Ranged',
		atk: 7,
		def: 5,
		hp: 6,
		crit: 8,
		cc: 'Throwing Air',
		weapon: 'Bow',
		elemental: 'Fire'
	},
	{
		class: 'warrior',
		race: 'Human',
		classText: 'Berserker',
		type: 'Melee',
		atk: 8,
		def: 6,
		hp: 6,
		crit: 6,
		cc: 'Ground Stun',
		weapon: 'Sword',
		elemental: 'Lightning'
	}
]
function getStatProgress(_val, _stat) {
	let _statColor;
	switch(_stat) {
		case 'def':
			_statColor = '#FFEA00';
			break;
		case 'hp':
			_statColor = '#AAFF00';
			break;
		case 'atk':
			_statColor = '#ff6c00';
			break;
		case 'crit':
			_statColor = '#00c4ff';
			break;
	}
	let _html = '<div class="flex w-100">';
	for(let i = 1; i < 11; i++)
		_html += '<div style="height:2.5vh;background:' + _statColor + (_val < i ? '00' : (60 + (i * 10)).toString(16)) + ';width:calc(10% - 1vh);margin:0 .5vh"></div>'
	return _html + '</div>';
}
function getCharacterInformation(_class, _elem) {
	addClass(_gameUI, 'disable-ui');
	if(!_class)
		return `<div class="flex c-i-choose">Choose Your Character</div>`;
	const _info = __characterInfos.find(x => x.class === _class);
	document.querySelectorAll('.char-selection').forEach(x => removeClass(x, 'no-dark'));
	addClass(_elem, 'no-dark');
	episode.playSound({key:'switch', volume:.3});
	document.querySelector('.char-selection-center').innerHTML = `<div class="char-selection-center-inner" style="background:radial-gradient(#232323, #000)"><div class="flex w-100 c-i c-i-name">${_conceptArts[_class].title}</div>
	<div class="flex w-100 c-i c-i-race">Race: ${_info.race}</div>
	<div class="flex w-100 c-i c-i-class">Class: ${_info.classText}</div>
	<div class="flex w-100 c-i c-i-weapon">Weapon: ${_info.weapon}</div>
	<div class="flex w-100 c-i c-i-elemental">Elemental Power: ${_info.elemental}</div>
	<div class="flex w-100 c-i c-i-cc">Crowd Control: ${_info.cc}</div>
	<div class="flex w-100 c-i c-i-stats"><table><tr><td>Attack:</td><td>` + getStatProgress(_info.atk, 'atk') + `</td></tr>
	<tr><td>Defense:</td><td>` + getStatProgress(_info.def, 'def') + `</td></tr>
	<tr><td>Health:</td><td>` + getStatProgress(_info.hp, 'hp') + `</td></tr>
	<tr><td>Crit:</td><td>` + getStatProgress(_info.crit, 'crit') + `</td></tr></table></div>
	<div class="flex w-100 c-i c-i-btn"><div class="game-btn2 flex" onclick="selectHero('${_info.class}')"><div class="flex">SELECT</div></div></div></div>`;
}
function selectHero(_class) {
    episode.playSound({ key: 'click' });
	if(_class !== 'warrior'){
        warn('<span>' + getLangData('Not available for demo') + '</span>', 'warn');
		return;
	}
	let _ui = document.querySelector('.char-selection-ui');
	removeClass(_ui, 'fade-in');
	addClass(_ui, 'fade-out');
	_ui.onanimationend = function(event) {
		if(event.animationName === 'fade-out-me') {
			_ui = document.querySelector('.char-selection-ui');
			if(_ui) {
				_ui.remove();
				removeModule('character-selection');
				removeClass(_gameUI, 'disable-ui');
				mainCharacter = episode.enemies.find(x => x.class === _class);
				setKeyBoard(mainCharacter);
				mainCharacter.main = true;
				mainCharacter.friendly = false;
				mainCharacter.autoMode = undefined;
				setCharacterDefaults(mainCharacter, 1);
				_navbar.innerHTML = avatarTemplate(mainCharacter);
				_client.setCharacterValues(mainCharacter, 1);
				_client.loadItems();
				mainCharacter.disabled = mainCharacter.unarmed = false;
				mainCharacter.unarm();
				takeQuest(__story.quests[0], null, 'Quest Taken');
				const _another = episode.enemies.find(x => x.class !== _class);
				_another.enemy = _another.main = false;
				mainCharacter.respawn();
				mainCharacter.immobilize = mainCharacter.still = 
				mainCharacter.noDirection = mainCharacter.reversed = false;
				mainCharacter.direction = mainCharacter.moveDirection = 'left';
			}
		}
	}
}
function createCharacterSelectionUI() {
	const _div = document.createElement('div');
	_div.className = 'full flex char-selection-ui show-ui';
	_gameUI.appendChild(_div);
	_div.innerHTML = 
	`<div onclick="getCharacterInformation('archer', this)" class="char-selection char-selection-left no-dark">
	</div>
	<div class="char-selection-center">`
		+ getCharacterInformation() +
	`</div>
	<div onclick="getCharacterInformation('warrior', this)" class="char-selection char-selection-right no-dark">
	</div>`;
}