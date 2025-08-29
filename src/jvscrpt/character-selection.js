'use strict';
const __characterInfos = [
	{
		class: 'archer',
		type: 'ranged',
		atk: 7,
		def: 5,
		hp: 6,
		crit: 8,
		cc: 'throwing air',
		weapon: 'bow',
		elemental: 'fire'
	},
	{
		class: 'warrior',
		type: 'melee',
		atk: 8,
		def: 6,
		hp: 6,
		crit: 6,
		cc: 'ground stun',
		weapon: 'sword',
		elemental: 'lightning'
	}
]
function getCharacterInformation(_class, _elem) {
	if(!_class)
		return `<div class="flex c-i-choose">Choose Your Character</div>`;
	const _info = __characterInfos.find(x => x.class === _class);
	document.querySelectorAll('.char-selection').forEach(x => removeClass(x, 'no-dark'));
	addClass(_elem, 'no-dark');
	return `<div class="flex w-100 c-i c-i-name">Name: ${_conceptArts[_class].title}</div>
	<div class="flex w-100 c-i c-i-class">Class: ${_info.class}</div>
	<div class="flex w-100 c-i c-i-weapon">Weapon: ${_info.weapon}</div>
	<div class="flex w-100 c-i c-i-elemental">Elemental Power: ${_info.elemental}</div>
	<div class="flex w-100 c-i c-i-cc">Crowd Control Type: ${_info.cc}</div>
	<div class="flex w-100 c-i c-i-atk">Attack: ${_info.atk} / 10</div>
	<div class="flex w-100 c-i c-i-def">Defense: ${_info.def} / 10</div>
	<div class="flex w-100 c-i c-i-atk">Health: ${_info.hp} / 10</div>
	<div class="flex w-100 c-i c-i-def">Crit: ${_info.crit} / 10</div>`;
}

function createCharacterSelectionUI() {
	const _div = document.createElement('div');
	_div.className = 'full flex char-selection-ui';
	_gameUI.appendChild(_div);
	_div.innerHTML = `<div onclick="getCharacterInformation('archer', this)" class="char-selection char-selection-left no-dark" style="width:25%;height:100%">

		</div>
		<div class="char-selection-center" style="width:50%;height:100%">
			<div class="char-selection-center" style="width:50%;height:100%">`
			+ getCharacterInformation() +
			`</div>
		</div>
		<div onclick="getCharacterInformation('warrior', this)" class="char-selection-right no-dark" style="width:25%;height:100%">

		</div>`;
}