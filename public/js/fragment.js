'use strict';
function getFragmentUI(_id) {
	let _tutorial = {
		tr: {
			title: 'Karakter Parçacıkları',
			desc: 'Hikaye modunda bölüm sonlarında karşılaştığınız bazı düşmanlar belli oranda ve adette parçacık ile sizi ödüllendirebilir. Bu parçacıkları soldaki listeden oyun boyunca takip edebilirsiniz. Bu listeden seçtiğiniz bir karakter açıklamasında size hangi seviyede hangi yeteneği ile aktif olacağını size söyleyecek. Aktif karakterlerden birini seçerek savaş esnasında belli aralıklarla desteğe çağırabileceksiniz.'
		},
		en: {
			title: 'Character Fragments',
			desc: 'In story mode, some enemies you encounter at the end of levels may reward you with a certain number of shards. You can track these shards throughout the game in the list on the left. A character you select from this list will be shown in the description, which level and ability will be active. By selecting one of the active characters, you can call in support at regular intervals during battle.'
		}
	};
	if (!tryShowMenuTutorial('fragment')) _tutorial = undefined;
	let _content = showMenuTutorial(_tutorial, 'fragment');
	updateMenuBottom(6);
	if (!_id) _id = 1;
	const _container = selectMenuContainer();
	_container.innerHTML =
		'<div class="menu-ui-left fade-me">' +
		'<div class="menu-modal-left menu-modal-left-content">' +
		'<div class="skills-content-left fragments-content-left menu-modal-left-container">' +
		'<div style="overflow-y:auto" class="full">' +
		getFragmentsUI(_id) +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<div class="menu-ui-right fade-me">' +
		'<div class="menu-modal-right menu-modal-right-content">' +
		'<div class="skills-content-right fragments-content-right">' +
		'<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">' +
		(_content !== '' ? _content : getFragmentDetailUI(_id, 1, 1)) +
		'</div><div class="shine-area"></div>' +
		'</div>' +
		'</div>' +
		'</div>';
}
function getFragmentsUI(_id) {
	let html = '';
	const _char = __account.characters.find((x) => x.class === mainCharacter.class);
	for (var _f of __fragments) {
		const _myfr = __account.fragments.find((x) => x.key === _f.key);
		const _count = _myfr?.count ?? 0;
		let _limit = _f.limits.find((x) => x.grade > (_myfr?.grade ?? 0))?.limit;
		const _hasTag = _char?.tag?.id === _f.id;
		const _noSelect = tryShowMenuTutorial('fragment');
		if (!_limit) _limit = _f.limits.find((x) => x.grade === (_myfr?.grade ?? 0))?.limit;
		html +=
			'<div data-key="' +
			_f.key +
			'" onexactclick="selectFragment(' +
			_f.id +
			')" class="skill-card fragment-card animate-me flex' +
			(_f.id === _id && !_noSelect ? ' selected' : '') +
			(_hasTag ? ' activated' : '') +
			'">' +
			'<div class="skill-icon-wrapper flex"><img src="./images/main/' +
			_f.key +
			'/concept.png" /></div>' +
			'<div style="flex:1;height:100%">' +
			'<div class="flex flex-jc-start skill-card-title" style="height:50%;width:100%">' +
			getLangData(_f.name) +
			'</div>' +
			'<div class="flex flex-jc-start skill-card-level"><span id="fragment-' +
			_f.key +
			'-level">' +
			_count +
			'</span>&nbsp;/&nbsp;<span id="fragment-' +
			_f.key +
			'-limit">' +
			_limit +
			'</span></div>' +
			'</div>' +
			'<img class="tag-character-activated" src="./images/icons/tick.png" />' +
			'</div>';
	}
	return html;
}
function selectFragment(_id) {
	const _cards = document.querySelectorAll('#menu-ui .skill-card');
	const _key = __fragments.find((x) => x.id === _id).key;
	const _container = document.querySelector('#menu-ui .skills-content-detail-wrapper');
	for (var _sc of _cards) {
		if (_sc.getAttribute('data-key') === _key) {
			addClass(_sc, 'selected');
			_container.innerHTML = getFragmentDetailUI(_id) + '<div id="shine"></div>';
		} else removeClass(_sc, 'selected');
	}
}
function pickTagSkill(_id, _grade) {
	playClick();
	const _item = __fragments.find((x) => x.id === _id);
	const _myfr = __account.fragments.find((x) => x.key === _item.key);
	const _g = _myfr?.grade ?? 0;
	if (_g >= _grade) {
		const _char = __account.characters.find((x) => x.class === mainCharacter.class);
		if (_char?.tag?.id === _id && _char?.tag?.grade === _grade) return;
		_char.tag = { id: _id, grade: _grade };
		const _ts = document.querySelector('.character-tag-skill[data-key="tag-' + _item.key + '-' + _grade + '"]');
		addClass(_ts, 'selected');
		_client.saveState();
		selectFragment(_id);
		const _cards = document.querySelectorAll('.fragment-card');
		for (let _c of _cards) {
			removeClass(_c, 'activated');
			if (_c.getAttribute('data-key') === _item.key) addClass(_c, 'activated');
		}
		warn(
			'<div class="flex important achievement" style="position:relative"><img style="height:12cqh" src="./images/main/skill-icons/' +
				_item.key +
				'/' +
				_item.limits[_grade - 1].skill +
				'.png" />&nbsp;<span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' +
				getLangData('Tag Skill Selected') +
				'!</span></div>',
			null,
			null,
			1
		);
	} else warn('<span>' + getLangData('Update character first') + '</span>', 'warn');
}
function getFragmentDetailUI(_id, _noSound, _noAnimation) {
	if (!_noSound) playClick();
	const _item = __fragments.find((x) => x.id === _id);
	const _myfr = __account.fragments.find((x) => x.key === _item.key);
	const _grade = _myfr?.grade ?? 0;
	const _char = __account.characters.find((x) => x.class === mainCharacter.class);
	const _hasTag = _char?.tag?.id === _id;
	let _skills = '';
	for (let i = 1; i <= 5; i++) {
		if (_item.limits.length < i) break;
		_skills += `<img data-key="tag-${_item.key}-${i}" class="character-tag-skill${_grade >= i ? '' : ' gray'}${_hasTag && i === _char.tag.grade ? ' selected' : ''}" onexactclick="pickTagSkill(${_id},${i})" src="./images/main/skill-icons/${_item.key}/${_item.limits[i - 1].skill}.png" />`;
	}
	const _limit = _item.limits?.[_grade > 0 ? _grade - 1 : _grade];
	const _nextLimit = _item.limits?.[_grade];
	const _cost = _limit?.cost ?? 0;
	let _color;
	switch (_grade) {
		case 0:
			_color = '#FFFFFF';
			break;
		case 1:
			_color = '#008000';
			break;
		case 2:
			_color = '#000080';
			break;
		case 3:
			_color = '#000000';
			break;
		case 4:
			_color = '#FD1C03';
			break;
	}
	var _html =
		`<div class="full flex item-info-container-parent fragment-item-info-container-parent${_noAnimation ? '' : ' fade-me'}" style="padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
		<div class="full flex flex-ai-start item-info-container artifact-info fragment-info">
			<div class="flex w-100 artifact-detail-header">
				<div class="artifact-detail-header-icon">
					<img style="background:radial-gradient(${_color}40, transparent)" src="./images/main/${_item.key}/concept.png" />
				</div>
				<div class="artifact-detail-header-info">
					<div class="flex page-detail-header artifact-title artifact-detail-header-title" style="width:100%;padding:2cqh">
						${_item.name}
					</div>
					<div class="w-100 flex flex-jc-start fragment-char-quality">
						<img src="./images/ui/star-on.png" />
						<img src="./images/ui/star-${_item.limits?.length > 1 ? 'on' : 'off'}.png" />
						<img src="./images/ui/star-${_item.limits?.length > 2 ? 'on' : 'off'}.png" />
						<img src="./images/ui/star-${_item.limits?.length > 3 ? 'on' : 'off'}.png" />
						<img src="./images/ui/star-${_item.limits?.length > 4 ? 'on' : 'off'}.png" />
					</div>
					<div class="flex page-detail-desc artifact-description${_grade > 0 ? ' d-none' : ''}" style="width:100%;padding:2cqh;text-align:center">
						${getLangData('Summon that character to use as support skill')}
					</div>
					<div class="flex tag-skills flex-jc-start${_grade === 0 ? ' d-none' : ''}" style="width:100%;padding:2cqh;text-align:center">` +
		_skills +
		`</div>
				</div>
			</div>
			<div class="w-100 fragment-props">
				<div class="w-100 flex${_myfr?.grade > 0 ? ' d-none' : ''}">
					<div class="w-50 flex flex-jc-start page-detail-item-label">${getLangData('Grade')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value">${_grade}&nbsp;/&nbsp;${_item.limits?.length ?? 1}</div>
				</div>
				<div class="w-100 flex${_myfr?.grade > 0 ? '' : ' d-none'}">
					<div class="w-50 flex flex-jc-start page-detail-item-label">${getLangData('Current Grade')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value">${_grade}</div>
				</div>
				<div class="w-100 flex${_myfr?.grade > 0 ? '' : ' d-none'}">
					<div class="w-50 flex flex-jc-start page-detail-item-label">${getLangData('Current Attack Rate')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value">%${_limit.atk}</div>
				</div>
				<div class="w-100 flex${_myfr?.grade > 0 ? '' : ' d-none'}">
					<div class="w-50 flex flex-jc-start page-detail-item-label">${getLangData('Current Skill')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value"><img src="./images/main/skill-icons/${_item.key}/${_limit.skill}.png" /></div>
				</div>
				<div class="page-detail-splitter-thin"></div>
				<div class="w-100 flex${_nextLimit ? '' : ' d-none'}">
					<div class="w-50 flex flex-jc-start page-detail-item-label"><img src="./images/ui/game/double-arrow.png" />${getLangData('Next Grade')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value">${_grade + 1}</div>
				</div>
				<div class="w-100 flex${_nextLimit ? '' : ' d-none'}">
					<div class="w-50 flex flex-jc-start page-detail-item-label"><img src="./images/ui/game/double-arrow.png" />${getLangData('Next Attack Rate')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value">%${_nextLimit?.atk}</div>
				</div>
				<div class="w-100 flex${_nextLimit ? '' : ' d-none'}">
					<div class="w-50 flex flex-jc-start page-detail-item-label"><img src="./images/ui/game/double-arrow.png" />${getLangData('Unlock Skill')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value"><img src="./images/main/skill-icons/${_item.key}/${_nextLimit?.skill}.png" /></div>
				</div>	
				<div class="page-detail-splitter-thin"></div>
				<div class="w-100 flex${_nextLimit ? '' : ' d-none'}">
					<div class="w-50 flex flex-jc-start page-detail-item-label">${getLangData('Cost')}</div>
					<div class="w-50 flex flex-jc-end page-detail-item-value">${_cost.formatWithDots()}<img src="./images/icons/coin.png" style="border:none!important;height:2.6cqh !important" /></div>
				</div>
			</div>
			<div class="flex action-button-container w-100">
				<div class="page-detail-splitter"></div>
				<div class="w-50 flex" style="height:100%">
					<div class="page-detail-button-half animate-me flex" onexactclick="askSwapFragmentCharacter(${_id})" style="height:65%"><div class="flex" style="color:#ff6c00 !important">${getLangData('SWAP')}</div></div>
				</div>
				<div class="w-50 flex" style="height:100%">
					<div class="page-detail-button-half animate-me flex${_myfr?.grade > 0 ? ' d-none' : ''}" onexactclick="askUpgradeFragmentCharacter(${_id}, 1)" style="height:65%"><div class="flex">${getLangData('SUMMON')}</div></div>
					<div class="page-detail-button-half animate-me flex${_myfr?.grade > 0 ? '' : ' d-none'}${_nextLimit ? '' : ' disabled'}" onexactclick="askUpgradeFragmentCharacter(${_id})" style="height:65%"><div class="flex">${getLangData('UPGRADE')}</div></div>
				</div>
			</div>
		</div>
	</div>`;
	return _html;
}
function selectSwapFragment(_elem, _key) {
	if (hasClass(_elem, 'selected')) return;
	const _item = __fragments.find((x) => x.key === _key);
	playClick();
	removeClass(document.querySelector('.fragment-list-item.selected'), 'selected');
	addClass(_elem, 'selected');
	document.querySelector('.taken-fragment-portrait img').src = './images/fragments/' + _item.key + '.png';
}
function askSwapFragmentCharacter(_id) {
	playClick();
	const _item = __fragments.find((x) => x.id === _id);
	const _others = __fragments.filter((x) => x.key !== _item.key);
	let _html = '';
	for (let _f of _others)
		_html += `<div onexactclick="selectSwapFragment(this, '${_f.key}')" data-key="${_f.key}" class="fragment-list-item${_f.key === _others[0].key ? ' selected' : ''}"><img src="./images/fragments/${_f.key}.png" style="height:6cqh" /></div>`;
	const _myfr = __account.fragments.find((x) => x.key === _item.key);
	let _count = _myfr.count ?? 0;
	if (_myfr.grade > 0) _count -= _item.limits.find((x) => x.grade === _myfr.grade).limit;
	if (_count > 2) {
		let _modal =
			`<div data-singleton-key="modal_middle" class="full flex inventory-question fragment-swap-question">
			<div class="inventory-modal">
				<div class="flex w-100 fragment-swap-question-header">
					<div class="w-50 flex">
						<div class="main-portrait flex w-100">
							<img src="./images/fragments/${_item.key}.png" style="height:6cqh" />
						</div>
						<div class="flex w-100 swap-count-container">
							<div id="decrease-count-btn" class="flex animate-me disabled" onexactclick="decreaseSwapCount('${_item.key}')">
								
							</div>
							<div class="swap-count-wrapper flex">
								x <span id="swap-count">3</span>
							</div>
							<div id="increase-count-btn" class="flex animate-me${_count > 5 ? '' : ' disabled'}" onexactclick="increaseSwapCount('${_item.key}')">
								
							</div>          
						</div>
					</div>
					<div class="w-50 flex">
						<div class="taken-fragment-portrait flex w-100">
							<img src="./images/fragments/${_others[0].key}.png" style="height:6cqh" />
						</div>
						<div class="taken-fragment-count flex">
							x 1
						</div>
					</div>
					<div class="swap-right">
						<img src="./images/ui/game/double-arrow.png" />
					</div>
				</div>
				<div class="fragment-swap-list flex flex-jc-start question-modal-desc">
					<div class="page-detail-splitter"></div>` +
			_html +
			`</div>
				<div class="flex new-game-menu-buttons">
					<div class="new-game-menu-button flex animate-me" onexactclick="closeInventoryQuestionModal()">${getLangData('IGNORE')}</div>
					<div class="new-game-menu-button flex animate-me" onexactclick="swapCharacterFragment(${_id})">${getLangData('ACCEPT')}</div>
				</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		document.querySelector('#menu-ui').appendChild(_div.querySelector('.inventory-question'));
	} else warn('<span>' + getLangData('Not enough fragment') + '</span>', 'warn');
}
function increaseSwapCount(_key) {
	playClick();
	const _item = __account.fragments.find((x) => x.key === _key);
	const _sc = document.getElementById('swap-count');
	let _count = parseInt(_sc.innerText) + 3;
	_sc.innerText = _count;
	document.querySelector('.taken-fragment-count').innerText = 'x ' + _count / 3;
	let _c = _item.count ?? 0;
	if (_item.grade > 0)
		_c -= __fragments.find((x) => x.key === _key).limits.find((x) => x.grade === _item.grade).limit;
	if (_c < _count + 3) addClass(document.getElementById('increase-count-btn'), 'disabled');
	removeClass(document.getElementById('decrease-count-btn'), 'disabled');
}
function decreaseSwapCount(_key) {
	playClick();
	const _sc = document.getElementById('swap-count');
	let _count = parseInt(_sc.innerText) - 3;
	_sc.innerText = _count;
	document.querySelector('.taken-fragment-count').innerText = 'x ' + _count / 3;
	if (_count <= 3) addClass(document.getElementById('decrease-count-btn'), 'disabled');
	removeClass(document.getElementById('increase-count-btn'), 'disabled');
}
function swapCharacterFragment(_id) {
	PlaySound({ key: 'trade', volume: 1 });
	const _item = document.querySelector('.fragment-swap-question .selected');
	if (!_item) return;
	const _key = _item.getAttribute('data-key');
	const _count = parseInt(document.querySelector('.taken-fragment-count').innerText.replace('x ', ''));
	if (_count > 0) {
		const _current = __fragments.find((x) => x.id === _id);
		const _myfr = __account.fragments.find((x) => x.key === _current.key);
		_myfr.count -= _count * 3;
		const _new = __fragments.find((x) => x.key === _key);
		updateFragment(_key, _count);
		const _newCount = document.querySelector(
			'.fragment-card[data-key="' + _key + '"] #fragment-' + _key + '-level'
		);
		_newCount.innerText = (parseInt(_newCount.innerText) + _count).toString();
		const _oldCount = document.querySelector(
			'.fragment-card[data-key="' + _current.key + '"] #fragment-' + _current.key + '-level'
		);
		_oldCount.innerText = _myfr.count.toString();
		warn(
			'<div class="flex achievement important" style="position:relative"><img style="height:12cqh" src="./images/fragments/' +
				_key +
				'.png" />&nbsp;<span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' +
				_count +
				'&nbsp;x&nbsp;' +
				_new.name +
				' ' +
				getLangData('fragment') +
				'</span></div>',
			null,
			null,
			1
		);
	}
	closeInventoryQuestionModal();
}
function askUpgradeFragmentCharacter(_id, _summon) {
	const _item = __fragments.find((x) => x.id === _id);
	const _myfr = __account.fragments.find((x) => x.key === _item.key);
	const _limit = _item.limits[_myfr?.grade ?? 0];
	const _cost = _limit.cost;
	askSomething(
		`${getLangData((_summon ? 'Summon' : 'Upgrade') + ' this character for')} <b style="margin-left:1cqh;color:#F3f4f5 !important">${_cost.formatWithDots()}</b> <img style="height:2cqh" src="./images/icons/coin.png" />`,
		`acceptAndUpgradeFragment(${_id}, ${_cost})`,
		'modal_2x1'
	);
}
function acceptAndUpgradeFragment(_id, _cost) {
	const _item = __fragments.find((x) => x.id === _id);
	const _myfr = __account.fragments.find((x) => x.key === _item.key);
	const _grade = (_myfr?.grade ?? 0) + 1;
	const _limit = _item.limits[_myfr?.grade ?? 0];
	if (__account.gold < _cost) {
		playClick();
		warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
		return;
	}
	if ((_myfr?.count ?? 0) < _limit.limit) {
		playClick();
		warn('<span>' + getLangData('Not enough fragment') + '</span>', 'warn');
		return;
	}
	if (!shine(1000, document.querySelector('.skills-content-detail-wrapper'))) return;
	updateGold(-_cost);
	if (!_myfr) __account.fragments.push({ key: _item.key, count: 0, grade: _grade });
	else {
		_myfr.grade = _grade;
		if (_grade === 1) updateGlobalQuest('summon-character');
	}
	_client.saveState();
	closeInventoryQuestionModal();
	document.getElementById('fragment-' + _item.key + '-limit').innerText =
		_item.limits?.[_grade]?.limit ?? _item.limits[_grade - 1].limit;
	selectFragment(_id);
	checkUpdateAvailable2(7);
}
function hasFragmentUpdate(_key) {
	const _myfr = __account.fragments?.find((x) => x.key === _key);
	const _nextGrade = (_myfr?.grade ?? 0) + 1;
	const _limit = __fragments.find((x) => x.key === _key).limits.find((x) => x.grade === _nextGrade)?.limit;
	return _myfr?.count >= _limit;
}
