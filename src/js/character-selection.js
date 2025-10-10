'use strict';
const __characterInfos = [
	{
		class: 'werewolf',
		race: 'Beast',
		classText: 'Werewolf',
		type: 'Melee',
		atk: 8,
		def: 5,
		hp: 6,
		crit: 6,
		cc: 'Ground Stun',
		weapon: 'Claw & Fang',
		elemental: 'Fire'
	},
	{
		class: 'cyclops',
		race: 'Beast',
		classText: 'Cyclops',
		type: 'Ranged',
		atk: 7,
		def: 6,
		hp: 6,
		crit: 6,
		cc: 'Throwing Air',
		weapon: 'Laser Eye',
		elemental: 'Lightning'
	},
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
let __characterSelectFuncs;
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
function getCharacterInformation(_class, _elem, _dir, _another) {
	addClass(_gameUI, 'disable-ui');
	if(!_class)
		return `<div class="flex c-i-choose">${getLangData('Choose Your Character')}</div>`;
	const _info = __characterInfos.find(x => x.class === _class);
	if(_info) {
		document.querySelectorAll('.char-selection').forEach(x => removeClass(x, 'no-dark'));
		addClass(_elem, 'no-dark');
		PlaySound({key:'switch', volume:.3});
		const _root = document.querySelector(':root');
		_root.style.setProperty('--main-char-bg', 'url(./../images/main/' + _class + '/bg.png)');
		let _html = `<div class="char-selection-center-inner flex" style="background:radial-gradient(#232323, #000)"><div class="flex w-100 c-i c-i-name">${_conceptArts[_class]?.title ?? episode.enemies.find(x => x.class === _class)?.name ?? ''}</div>
		<div class="flex w-100 c-i c-i-race">Race: ${_info.race}</div>
		<div class="flex w-100 c-i c-i-class">Class: ${_info.classText}</div>
		<div class="flex w-100 c-i c-i-weapon">Weapon: ${_info.weapon}</div>
		<div class="flex w-100 c-i c-i-elemental">Elemental Power: ${_info.elemental}</div>
		<div class="flex w-100 c-i c-i-cc">Crowd Control: ${_info.cc}</div>
		<div class="flex w-100 c-i c-i-stats">`;
		const _bonus = __storyScene.bonus;
		if(!_bonus)
			_html += `<table><tr><td>Attack:</td><td>` + getStatProgress(_info.atk, 'atk') + `</td></tr>
			<tr><td>Defense:</td><td>` + getStatProgress(_info.def, 'def') + `</td></tr>
			<tr><td>Health:</td><td>` + getStatProgress(_info.hp, 'hp') + `</td></tr>
			<tr><td>Crit:</td><td>` + getStatProgress(_info.crit, 'crit') + `</td></tr></table>`;
		else 
		{
			const _bonuses = _bonus.filter(x => x.owner === _class);
			_html += `<div class='bonus-mission-title w-100 flex'>${getLangData('Bonus Mission')}</div>`;
			for(let _b of _bonuses)
				_html += `<div class='bonus-mission-desc flex'><img src='./images/icons/chest.png' />${_b.description[getLang()]}</div>`;
		}
		_html +=
		`</div>
		<div class="flex w-100 c-i c-i-btn"><div class="game-btn2 flex" onclick="selectHero('${_info.class}', '${_dir}', '${_another}')"><div class="flex">SELECT</div></div></div></div>`;
	
		document.querySelector('.char-selection-center').innerHTML = _html;
	}
}
function selectStoryHero(_class, _dir, _another) {
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
				resetSkills();
				mainCharacter.setHealth(mainCharacter.getMaxHP());
				mainCharacter.main = false;
				mainCharacter = episode.enemies.find(x => x.class === _class);
				mainCharacter.main = true;
				mainCharacter.immobilize = false;
				setKeyBoard(mainCharacter);
				mainCharacter.friendly = false;
				mainCharacter.autoMode = undefined;
				mainCharacter.disableKeyboard = false;
				setCharacterDefaults(mainCharacter, 1);
				_navbar.innerHTML = avatarTemplate(mainCharacter);
				_client.setCharacterValues(mainCharacter, 1);
				_client.loadItems();
				resetSkills();
				_another = episode.enemies.find(x => x.class === _another);
				//episode.moveCamera(function() {
					// const _anothers = episode.enemies.filter(x => x.class !== _class);
					// _anothers.forEach(x => {
					// 	if(x.owner !== mainCharacter)
					// 		x.enemy = true;
					// 	x.main = x.still = x.immobilize = false;
					// });
					mainCharacter.still = mainCharacter.enemy = false;
					mainCharacter.direction = _dir === 'right' ? 'left' : 'right';
					_another.enemy = true;
					_another.immobilize = _another.still = _another.main = false;
					_another.setAutoMode(2);
					_another.setAutoTarget(mainCharacter);
					_another.keyboard = undefined;
					__story.quests[__story.quests.length - 1].kills =
					[{ 
						enemy: [_another.id], 
						limit: 1, 
						descriptions: {
							en: _another.name + ' Destroyed',
							tr: _another.name + '  Yok Edildi'
						} 
					}];
					takeQuest(__story.quests.length - 1);
					if(__characterSelectFuncs?.end)
						__characterSelectFuncs.end(_another);
				//});
			}
		}
	};
}
function selectHero(_class, _dir, _another) {
    PlaySound({ key: 'click' });
	if(_class !== 'warrior'){
		if(__characterInfos.find(x => x.class === _class)?.race === 'Beast')
			selectStoryHero(_class, _dir, _another);
		else
        	warn('<span>' + getLangData('Not available for demo') + '</span>', 'warn');
		return;
	}
	playCutScene(1, undefined, function() {
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
				takeQuest(1, null, 'Quest Taken');
				const _another = episode.enemies.find(x => x.class !== _class);
				_another.enemy = _another.main = false;
				mainCharacter.respawn();
				mainCharacter.immobilize = mainCharacter.still = 
				mainCharacter.noDirection = mainCharacter.reversed = false;
				mainCharacter.direction = mainCharacter.moveDirection = 'left';
			}
		}
	}});
}
function createCharacterSelectionUI(_key1, _key2, _start, _end) {
	__characterSelectFuncs = { start: _start, end: _end };
	if(!_key1)
		_key1 = 'archer';
	if(!_key2)
		_key2 = 'warrior';
	const _div = document.createElement('div');
	_div.className = 'full flex char-selection-ui show-ui';
	_gameUI.appendChild(_div);
	_div.innerHTML = 
	`<div onclick="getCharacterInformation('${_key1}', this, 'left', '${_key2}')" class="char-selection char-selection-left no-dark">
	</div>
	<div class="flex char-selection-center">`
		+ getCharacterInformation() +
	`</div>
	<div onclick="getCharacterInformation('${_key2}', this, 'right', '${_key1}')" class="char-selection char-selection-right no-dark">
	</div>`;
	if(__characterSelectFuncs?.start)
		__characterSelectFuncs.start();
}