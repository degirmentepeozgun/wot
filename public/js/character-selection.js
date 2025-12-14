'use strict';
function characterSelection(){
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
			cc: 'Stun',
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
			cc: 'Stun',
			weapon: 'Sword',
			elemental: 'Lightning'
		}
	]
	let __characterSelectFuncs;
	this.getCharacterInformation = function(_class, _elem, _dir, _another, _newTitle) {
		addClass(_gameUI, 'disable-ui');
		if(!_class)
			return `<div class="flex c-i-choose">${_newTitle ?? getLangData('Choose Your Character')}</div>`;
		const _info = __characterInfos.find(x => x.class === _class);
		if(_info) {
			document.querySelectorAll('.char-selection').forEach(x => removeClass(x, 'no-dark'));
			addClass(_elem, 'no-dark');
			PlaySound({key:'switch', volume:.3});
			const _root = document.querySelector(':root');
			_root.style.setProperty('--main-char-bg', 'url(./../images/main/' + _class + '/bg.png)');
			let _html = `<div class="char-selection-center-inner flex"><div class="flex w-100 c-i c-i-name">${_conceptArts[_class]?.title ?? episode.enemies.find(x => x.class === _class)?.name ?? ''}</div>
			<div class="flex w-100 c-i c-i-race"><div class="flex flex-jc-start w-50">${getLangData("Race")}</div><div class="flex flex-jc-end w-50">${_info.race}</div></div>
			<div class="flex w-100 c-i c-i-class"><div class="flex flex-jc-start w-50">${getLangData("Class")}</div><div class="flex flex-jc-end w-50">${_info.classText}</div></div>
			<div class="flex w-100 c-i c-i-weapon"><div class="flex flex-jc-start w-50">${getLangData("Weapon")}</div><div class="flex flex-jc-end w-50">${_info.weapon}</div></div>
			<div class="flex w-100 c-i c-i-elemental"><div class="flex flex-jc-start w-50">${getLangData("Elemental")}</div><div class="flex flex-jc-end w-50">${_info.elemental}</div></div>
			<div class="flex w-100 c-i c-i-cc"><div class="flex flex-jc-start w-50">${getLangData("Control")}</div><div class="flex flex-jc-end w-50">${_info.cc}</div></div>
			<div class="flex w-100 c-i c-i-stats">`;
			const _bonus = __storyScene.bonusRewards;
			if(!_bonus){
				_html += `<div class="flex w-100 c-i c-i-stat">
					<div class="flex flex-jc-start w-50">${getLangData("Attack")}</div>
					<div class="flex flex-jc-end w-50">${_info.atk}&nbsp;/&nbsp;10</div>
				</div>
				<div class="flex w-100 c-i c-i-stat">
					<div class="flex flex-jc-start w-50">${getLangData("Defense")}</div>
					<div class="flex flex-jc-end w-50">${_info.def}&nbsp;/&nbsp;10</div>
				</div>
				<div class="flex w-100 c-i c-i-stat">
					<div class="flex flex-jc-start w-50">${getLangData("Health")}</div>
					<div class="flex flex-jc-end w-50">${_info.hp}&nbsp;/&nbsp;10</div>
				</div>
				<div class="flex w-100 c-i c-i-stat">
					<div class="flex flex-jc-start w-50">${getLangData("Crit")}</div>
					<div class="flex flex-jc-end w-50">${_info.crit}&nbsp;/&nbsp;10</div>
				</div>`;
			}
			// else 
			// {
			// 	const _bonuses = _bonus.filter(x => x.owner === _class);
			// 	_html += `<div class='bonus-mission-title w-100 flex'>${getLangData('Bonus Mission')}</div>`;
			// 	for(let _b of _bonuses)
			// 		_html += `<div class='bonus-mission-desc flex'><img src='./images/ui/lock.png' /><div style="flex:1">${_b.description[getLang()]}</div></div>`;
			// }
			else 
			{
				const _bonuses = _bonus.filter(x => x.when(_class));
				_html += `<div class='bonus-mission-title w-100 flex'>${getLangData('Bonus Reward')}</div>`;
				for(let _b of _bonuses){
					const _icon = getRewardIcon(_b.grade ?? 1, _b.key, _b.type);
					_html += `<div class='bonus-mission-desc flex'><img src='${_icon.src}' /><div style="flex:1">${_b.description[getLang()]}<div style="color:#ff6c00 !important" class="w-100 flex-jc-start flex">%100&nbsp;${getLangData('chance')}</div></div></div>`;
				}
			}
			_html +=
			`</div>
			<div class="flex w-100 c-i c-i-btn"><div class="game-btn2 flex" onexactclick="getRef('character-selection')?.selectHero('${_info.class}', '${_dir}', '${_another}')"><div class="flex">SELECT</div></div></div></div>`;
		
			document.querySelector('.char-selection-center').innerHTML = _html;
		}
	}
	this.selectStoryHero = function(_class, _dir, _another) {
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
					mainCharacter.setHealth(mainCharacter.MAXHP);
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
	this.selectHero = function(_class, _dir, _another) {
		playClick();
		if(_class !== 'warrior'){
			if(__characterInfos.find(x => x.class === _class)?.race === 'Beast')
				this.selectStoryHero(_class, _dir, _another);
			else
				warn('<span>' + getLangData('Not available for demo') + '</span>', 'warn');
			return;
		}
		const acceptCharacter = function() {
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
						episode.enemies = episode.enemies.filter(x => !x.main);
						const _m = episode.enemies.find(x => x.class === _class);
						const _mLeft = _m.left;
						mainCharacter = _m;
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
						takeQuest(1, null, 'Quest Taken', null, 1);
						const _another = episode.enemies.find(x => x.important && x.class !== _class);
						_another.enemy = _another.main = false;
						mainCharacter.respawn();
						mainCharacter.immobilize = mainCharacter.still = 
						mainCharacter.noDirection = mainCharacter.reversed = false;
						mainCharacter.direction = mainCharacter.moveDirection = 'left';
						mainCharacter.left = _mLeft;
						mainCharacter.updateVariables();
					}
				}
			}
		}
		if(__account.name?.length > 0)
			acceptCharacter();
		else
			playCutScene(1, undefined, function() {
				acceptCharacter();
			});
	}
	this.createCharacterSelectionUI = function(_key1, _key2, _start, _end, _newTitle) {
		__characterSelectFuncs = { start: _start, end: _end };
		if(!_key1)
			_key1 = 'archer';
		if(!_key2)
			_key2 = 'warrior';
		const _div = document.createElement('div');
		_div.className = 'full flex char-selection-ui show-ui';
		_gameUI.appendChild(_div);
		_div.innerHTML = 
		`<div onexactclick="getRef('character-selection')?.getCharacterInformation('${_key1}', this, 'left', '${_key2}')" class="char-selection char-selection-left no-dark">
		</div>
		<div class="flex char-selection-center">`
			+ this.getCharacterInformation(null, null, null, null, _newTitle) +
		`</div>
		<div onexactclick="getRef('character-selection')?.getCharacterInformation('${_key2}', this, 'right', '${_key1}')" class="char-selection char-selection-right no-dark">
		</div>`;
		if(__characterSelectFuncs?.start)
			__characterSelectFuncs.start();
	}
	// if(!window.installedModules)
	// 	window.installedModules = [];
	// window.installedModules.push({name:'character-selection', ref: this});
	return this;
}