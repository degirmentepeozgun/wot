'use strict';
const _conceptArts = {
	blacksmith: { direction: 'right', title: 'Temir Han' },
	wizard: { direction: 'right', title: 'Dede Korkut' },
	druid: { direction: 'right', title: 'Vargas' },
	archer: { direction: 'right', title: 'Alkin' },
	thief: { direction: 'right', title: 'Karayel' },
	warrior: { direction: 'right', title: 'Toygar' },
	tank: { direction: 'right', title: 'Deli Dumrul' }
};
let _dialogAppeared;
function updateQuestArea(_skipIfNoUI) {
	let _elm = document.getElementById('quest-status');
	if(!_elm)
		return;
	removeClass(_elm, 'mission-done');
	if(__storyScene?.back) {
		removeClass(_elm, 'd-none');
		_elm.innerHTML = '<div style="cursor:pointer" onclick="event.stopPropagation();event.preventDefault();loadLastStoryCheckPoint();" class="full flex">Back To Lobby</div>';
		return;
	}
	if (episode.pvp || episode.id > 199){
		if(_elm)
			addClass(_elm, 'd-none');
		return;
	}
	if (!_elm) {
		if(_skipIfNoUI)
			return;
		_elm = document.createElement('div');
		_elm.id = 'quest-status';
		_elm.onclick = function() {
			//showMyModalPopUp('game-menu');
			switchBookPage(3,1);
		}
		_gameUI.appendChild(_elm);
	}
	else
		removeClass(_elm, 'd-none');
	let _html = '<div class="full" style="overflow-y:auto">';
	if (__account.questStatus.quest?.loots) {
		let _steps = '', _finish = 1;
		for (var _item of __account.questStatus.quest.loots) {
			if(__account.questStatus.state === 'end')
				_item.count = _item.limit;
			const _f = (_item.count ?? 0) >= _item.limit;
			if(!_f)
				_finish = undefined;
			_steps += '<div style="height:30%" class="flex flex-jc-start"><div class="d-none flex"><img style="height:.9rem;margin:0 .2rem;background:none" src="./images/icons/quest-progress.png"' + (!_finish ? 'class="gray"' : '') + ' /></div><div class="flex" style="justify-content:flex-start;height:100%;flex:1;color:' + (!_finish ? '#ffffff80' : '#fff') + ' !important">(' + (_item.count ?? 0) + '/' + _item.limit + ') ' + (_item.descriptions ?? __account.questStatus.quest.descriptions)[getLang()] + '</div></div>';
		}
		if (_finish) {
			__account.questStatus.state = 'end';
			if(__account.questStatus.quest.done && __account.questStatus.quest.maps.indexOf(episode.id) !== -1)
				__account.questStatus.quest.done();
			_client.upgradeQuestStatus();
			if(__account.questStatus.quest.owner === 'system')
			{
				addClass(_elm, 'mission-done');
				episode.reset();
				_elm.onanimationend = function(e) {
					if(e.animationName === 'mission-done')
						addClass(_elm, 'd-none');
				}
			}
		}
		_html += '<div class="one-line" style="padding-bottom:3%;color:#DAA520' + (__account.questStatus.state == 'end' ? '' : 'bb') + ' !important">-&nbsp;' + __account.questStatus.quest.names[getLang()] + '</div>' + _steps;
	}
	else if (__account.questStatus.quest?.kills) {
		let _steps = '', _finish = 1;
		for (var _item of __account.questStatus.quest.kills) {
			if(__account.questStatus.state === 'end')
				_item.count = _item.limit;
			const _f = (_item.count ?? 0) >= _item.limit;
			if(!_f)
				_finish = undefined;
			_steps += '<div class="one-line flex flex-jc-start"><div class="d-none flex" style="width:15%"><img style="width:3vh;background:none" src="./images/icons/quest-progress.png"' + (!_finish ? 'class="gray"' : '') + ' /></div><div style="width:85%;color:' + (!_finish ? '#ffffff80' : '#fff') + ' !important">(' + (_item.count ?? 0) + '/' + _item.limit + ') ' + (_item.descriptions ?? __account.questStatus.quest.descriptions)[getLang()]  + '</div></div>';
		}
		if (_finish) {
			__account.questStatus.state = 'end';
			_client.upgradeQuestStatus();
			if(__account.questStatus.quest.owner === 'system')
			{
				addClass(_elm, 'mission-done');
				episode.reset();
				_elm.onanimationend = function(e) {
					if(e.animationName === 'mission-done')
						addClass(_elm, 'd-none');
				}
			}
		}
		_html += '<div  class="one-line" style="padding-bottom:3%;color:#DAA520' + (__account.questStatus.state == 'end' ? '' : 'bb') + ' !important">-&nbsp;' + __account.questStatus.quest.names[getLang()] + '</div>' + _steps;
	}
	else if(__account.questStatus.quest?.timer) {
		if(!__account.questStatus.quest.timer.startTime)
			__account.questStatus.quest.timer.startTime = _gameTick;
		let  _steps = '', _finish = (_gameTick - __account.questStatus.quest.timer.startTime) >= __account.questStatus.quest.timer.ms;
		if (!_finish) {
			let _icon = '';
			if(__account.questStatus.quest.timer.iconPath)
				_icon = '<img src="' + __account.questStatus.quest.timer.iconPath + '" class="timedquest-icon" />';
			_steps += `<div class="timedquest-timer one-line flex flex-jc-start">`
					+ _icon + 
					`<div class='timedquest-progress-wrapper'><div class='timedquest-progress'></div></div></div>`;

		} 
		else {
			__account.questStatus.state = 'end';
			_client.upgradeQuestStatus();
			if(__account.questStatus.quest.owner === 'system')
			{
				addClass(_elm, 'mission-done');
				episode.reset();
				_elm.onanimationend = function(e) {
					if(e.animationName === 'mission-done')
						addClass(_elm, 'd-none');
				}
			}
		}
		let _ms = __account.questStatus.quest.timer.ms, tQCounter;
		_ms = MathFloor(_ms / 1000);
		const _s = (_ms % 60);
		const _m = parseInt(_ms / 60);
		tQCounter = (_m > 9 ? _m : '0' + _m.toString()) + ':' 
		+ (_s > 9 ? _s : '0' + _s.toString());
		_html += '<div class="flex" style="width:100%"><div class="one-line" style="flex:1;padding-bottom:3%;color:#DAA520' + (__account.questStatus.state == 'end' ? '' : 'bb') + ' !important">-&nbsp;' + __account.questStatus.quest.names[getLang()] + '</div><div class="timedquest-counter">' + tQCounter + '</div></div>' + _steps;
	}
	else {
		addClass(_elm, 'd-none');
		episode.reset();
		return;
	}
	if(__account.questStatus.state !== 'end' ||  __account.questStatus.quest.owner === 'system'){
		if(__account.questStatus.quest.navLocation)
			delete __account.questStatus.quest.navLocation;
	}
	else
		__account.questStatus.quest.navLocation = 'end';
	removeClass(_elm, 'd-none');
	_html += '</div>';
	_elm.innerHTML = _html;
	episode.reset();
}
function pauseQuestTimer() {
	if(__account?.questStatus?.quest?.timer)
		__account.questStatus.quest.timer.suspended = _gameTick;
}
function resumeQuestTimer() {
	if(__account?.questStatus?.quest?.timer?.startTime && __account.questStatus.quest.timer.suspended) {
		__account.questStatus.quest.timer.startTime += (_gameTick - __account.questStatus.quest.timer.suspended);
		delete __account.questStatus.quest.timer.suspended;
	}
}
function checkTimedQuest() {
	if(__account?.questStatus?.quest?.timer?.startTime && episode && !__account?.questStatus?.quest?.timer.suspended) {
		const _time = _gameTick - __account.questStatus.quest.timer.startTime;
		if(!episode.timedQuestWrapperElem)
			episode.timedQuestWrapperElem = document.querySelector('.timedquest-progress-wrapper');
		if(!episode.timedQuestElem)
			episode.timedQuestElem = document.querySelector('.timedquest-progress');
		if(!episode.timedQuestCounter)
			episode.timedQuestCounter = document.querySelector('.timedquest-counter');
		if(!episode.timedQuestElem.dataRate)
			episode.timedQuestElem.dataRate = 100;
		const _rate = MathCeil(((__account.questStatus.quest.timer.ms - _time) / __account.questStatus.quest.timer.ms) * 100);
		if(_rate !== episode.timedQuestElem.dataRate){
			episode.timedQuestElem.style.width = _rate + '%';
			episode.timedQuestElem.dataRate = _rate;
		}
		let _ms = __account.questStatus.quest.timer.ms - _time;
		_ms = MathFloor(_ms / 1000);
		if(_ms !== episode.timedQuestCounter.ms) {
			const _s = (_ms % 60);
			const _m = parseInt(_ms / 60);
			episode.timedQuestCounter.ms = _ms;
			episode.timedQuestCounter.innerText = (_m > 9 ? _m : '0' + _m.toString()) + ':' 
			+ (_s > 9 ? _s : '0' + _s.toString());
		}
		if(_ms <= 0) {
			delete __account.questStatus.quest.timer.startTime;
			if(__account.questStatus.quest.timer.after)
				__account.questStatus.quest.timer.after();
		}
	}
}
function renderDialogOptions(_options, _order) {
	let _html = '', _i = 0;
	for (var _option of _options) {
		_html += '<div onclick="selectDialogOption(' + _i + ');skipDialog()" class="dialog-option' + ((_i === (_order ?? 0)) ? ' selected' : '') + '">' + _option.texts[getLang()] + '</div>';
		_i++;
	}
	return _html;
}
function selectDialogOption(_index) {
	const _options = document.querySelectorAll('.dialog-option');
	for (var i = 0; i < _options.length; i++) {
		removeClass(_options[i], 'selected');
		if (i === _index)
			addClass(_options[i], 'selected');
	}
}
function changeDialogOption(_direction) {
	const _options = document.querySelectorAll('.dialog-option');
	let _index;
	for (var i = 0; i < _options.length; i++) {
		if (hasClass(_options[i], 'selected')) {
			_index = i;
			removeClass(_options[i], 'selected');
			break;
		}
	}
	if (_index === 0 && _direction === -1)
		_index = _options.length - 1;
	else if (_index === (_options.length - 1) && _direction === 1)
		_index = 0;
	else
		_index += _direction;
	addClass(_options[_index], 'selected');
}
let _lastSkipTime;
function skipDialog() {
	if(_lastSkipTime && ((_gameTick - _lastSkipTime) < 500))
		return;
	_lastSkipTime = _gameTick;
	if (__account.questStatus.dialogArr[__account.questStatus.dialogOrder]) {
		if(__account.questStatus.dialogArr[__account.questStatus.dialogOrder]?.cutscene) {
			playCutScene(__account.questStatus.dialogArr[__account.questStatus.dialogOrder].cutscene);
			hideMyModalPopUp();
			__account.questStatus.dialogOrder = __account.questStatus.dialogArr = undefined;
			addClass(document.getElementById('quest-dialog'), 'd-none');
			return;
		}
		const _last = (__account.questStatus.dialogOrder + 1) === __account.questStatus.dialogArr.length;
		const _quest = __story.quests.find(x => x.id === __account.questStatus.order);
		let _add = '', _gain = '';
		if (_last) {
			const _skip = document.getElementById('quest-skip');
			if (!__account.questStatus.isStaticDialog) {
				if (_quest?.gain)
					for (var i = 0; i < _quest.gain.length; i++) {
						const _item = _quest.gain[i];
						if (i > 0)
							_gain += '&nbsp;, &nbsp;';
						_gain += '&nbsp;<img src="./images/icons/' + _item.key + '.png" style="width:4vh" /> &nbsp;x &nbsp;' + _item.value;
					}
				if (__account.questStatus.state === 'begin') {
					_skip.innerHTML = '<span style="color:#16F529 !important">' + getLangData('ACCEPT') + '</span>';
					_add = '<div class="flex" style="margin-top:2%;padding:1%;width:100%;border-top:1px solid #F4BB44;border-bottom:1px solid #F4BB44"><div class="flex" style="color:#fff !important">' + getLangData('Complete Rewards') + ': &nbsp;' + _gain + '</div></div>';
				}
				else if (__account.questStatus.state === 'end') {
					_skip.innerHTML = '<span style="color:#16F529 !important">' + getLangData('COMPLETE') + '</span>';
					_add = '<div class="flex" style="margin-top:2%;padding:1%;width:100%;border-top:1px solid #F4BB44;border-bottom:1px solid #F4BB44"><div class="flex" style="color:#fff !important">' + getLangData('Rewards') + ': &nbsp;' + _gain + '</div></div>';
				}
			}
			else
				_skip.innerHTML = '';
		}
		let _text = replaceDialogText(__account.questStatus.dialogArr[__account.questStatus.dialogOrder].texts?.[getLang()] ?? __account.questStatus.dialogArr[__account.questStatus.dialogOrder].text ?? '');
		if (__account.questStatus.dialogArr[__account.questStatus.dialogOrder].options)
			_text = renderDialogOptions(__account.questStatus.dialogArr[__account.questStatus.dialogOrder].options);
		document.getElementById('dialog-text').innerHTML = _text + _add;
		let _class = (__account.questStatus.dialogArr[__account.questStatus.dialogOrder].owner === 'main' ? mainCharacter.class : __account.questStatus.dialogArr[__account.questStatus.dialogOrder].owner);
		if(_class === 'owner')
			_class = _quest.owner;
		if(__account.questStatus.dialogArr[__account.questStatus.dialogOrder - 1]?.faceExpression !== __account.questStatus.dialogArr[__account.questStatus.dialogOrder]?.faceExpression) {
				const _cImg = document.getElementById('concept-' + _class);
				_cImg.src = './images/main/' + _class + '/' + (__account.questStatus.dialogArr[__account.questStatus.dialogOrder]?.faceExpression ??  'concept') + '.png';
		}
		document.getElementById('dialog-owner').innerHTML = '<span style="color:#f7f7f7cc !important;font-size:3vh !important">[' + (_conceptArts[_class]?.title ?? _class) + ']</span>' +
			(__account.questStatus.dialogArr[__account.questStatus.dialogOrder].expression ?
				'&nbsp;&nbsp;<span style="font-size:2.8vh!important" class="dialog-owner-expression">(' + __account.questStatus.dialogArr[__account.questStatus.dialogOrder].expression + ')</span>' : '');
		const _customConcept = __account.questStatus.dialogArr[__account.questStatus.dialogOrder].concept;
		if(_customConcept) {
			for (var _item of document.querySelectorAll('.concept-image'))
				_item.remove();
			let _dialogScreen = document.getElementById('quest-dialog');
			_dialogScreen.style.backgroundColor = '#000';
			//_dialogScreen.style.backgroundImage = 'url(./images/cutscenes/' + _customConcept.bg + '.png)';
			//_dialogScreen.style.backgroundSize = '100% auto';
			//_dialogScreen.style.backgroundPosition = 'center top';
			//_dialogScreen.style.backgroundRepeat = 'no-repeat';
			if(_customConcept.bg) {
				let bgImg = document.createElement('img');
				bgImg.src = './images/cutscenes/' + _customConcept.bg + '.png';
				bgImg.className = 'dialog-concept-bg-img fade-start';
				_dialogScreen.appendChild(bgImg);
			}
			_dialogScreen.style.position = 'relative';
			for (var _img of _customConcept?.images ?? [])
			{
				let _con = new Image();
				_con.style.position = 'absolute';
				_con.style.left = _img.coords.left + '%';
				_con.style.top = _img.coords.top + '%';
				_con.style.width = _img.width + '%';
				_con.className = 'concept-image custom-concept fade-start';
				_con.id = 'concept-' + _img.class;
				if(_img.class !== __account.questStatus.dialogArr[__account.questStatus.dialogOrder].owner)
					_con.className += ' gray-concept';
				_con.src = './images/cutscenes/' + _img.key + '.png';
				_dialogScreen.appendChild(_con);
			}
		}
		else {
			for (var _item of document.querySelectorAll('.concept-image'))
				addClass(_item, 'gray-concept');
			removeClass(document.getElementById('concept-' + _class), 'gray-concept');
		}
		__account.questStatus.dialogOrder++;
	}
	else {
		_dialogAppeared = false;
		removeClass(_gameUI, 'disable-ui');
		if (!__account.questStatus.isStaticDialog) {
			if (__account.questStatus.state === 'begin') 
				takeQuest();
			else if (__account.questStatus.state === 'end') {
				getQuestRewards(__account.questStatus.quest);
				if (__account.questStatus.quest.after)
					__account.questStatus.quest.after();
				__account.questStatus.quest = __account.questStatus.state = undefined;
				updateQuestArea();
				warn('<div class="flex heading quest-status-main" style="position:relative;width:auto"><img style="height:15vh;z-index:-1" src="./images/icons/txtbg.png" /><div style="position:absolute;text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('Quest Completed') + '</div></div>', 'level-up');
				PlaySound({ key: 'questdone', volume: .8 });
			}
		}
		else {
			const _options = document.querySelectorAll('.dialog-option');
			for (var i = 0; i < _options.length; i++)
				if (hasClass(_options[i], 'selected')) {
					const _func = __account.questStatus.dialogArr[__account.questStatus.dialogOrder - 1].options[i].do;
					if (_func)
						_func();
					break;
				}
		}
		__account.questStatus.dialogOrder = __account.questStatus.dialogArr = undefined;
		addClass(document.getElementById('quest-dialog'), 'd-none');
	}
	_client.upgradeQuestStatus();
}
function resetQuestLine() {
	__account.questStatus = firstQuestData();
	_client.saveState();
}
function takeQuest(_storyQuestIndex, _nowarn, _title, _state){
	let _q;
	if(_storyQuestIndex >= 0) {
		__account.questStatus.order = _storyQuestIndex + 1;
		_q = __story.quests[_storyQuestIndex];
	}
	//if(!_nowarn)
	//	warn('<div class="flex heading toast-with-banner" style="position:relative;width:auto"><img style="height:10vh;z-index:-1" src="./images/icons/quest-accepted.png" /><div class="full flex" style="position:absolute;text-shadow:0px 0px 4px #000;color:#f7f7f7 !important">' + getLangData(_title ?? 'Quest Accepted') + '</div></div>', 'level-up');
	if(!_state)
		PlaySound({ key: 'questaccepted', volume: .8 });
	const _quest = _q ?? __story.quests.find(x => x.id === __account.questStatus.order);
	const _before = _quest.before;
	const _after = _quest.after;
	const _done = _quest.done;
	const _timerAfter = _quest.timer?.after;
	__account.questStatus.quest = JSON.parse(JSON.stringify(_quest));
	__account.questStatus.state = _state ?? 'progress';
	__account.questStatus.quest.after = _after;
	__account.questStatus.quest.done = _done;
	if(_timerAfter)
		__account.questStatus.quest.timer.after = _timerAfter;
	updateQuestArea();
	if(!_state && _before)
		_before();
	__account.questStatus.quest.navLocation = 'start';
}
function goToQuest(_index, _state) {
	__account.questStatus.order = _index;
	__account.questStatus.quest = __account.questStatus.state = undefined;
	// const _quest = __story.quests[_index];
	// __account.questStatus.quest = JSON.parse(JSON.stringify(_quest));
	// __account.questStatus.state = 'progress';
}
function takeNextQuest(_id){
	takeQuest(__story.quests.findIndex(x => x.id === (_id ?? __account.questStatus.quest.id)) + 1, 1);
}
function replaceDialogText(_text) {
	return _text.replace(/[$][{](?<name>[^}]*)[}]/g, function (m, _name) {
		return eval(_name);
	});
}
function getQuestRewards(_quest, _isSideQuest) {
	const _owner = _quest.realOwner ?? _quest.owner;
	if(_owner) {
		const _sprite = episode.sprites.find(x => x.animation.key === _owner);
		if(_sprite) {
			const _id =_sprite.animation.id + (_isSideQuest ? '-side' : '') + '-quest-mark';
			const _elem = document.getElementById(_id);
			if(_elem)
				_elem.remove();
		}
	}
	if(_isSideQuest)
		__account.questStatus.side.order++;
	else
		__account.questStatus.order++;
	if (_quest.gain) {
		let _delay = 0;
		for (let _item of _quest.gain) {
			let _looted = 1;
			if (_item.key === 'gold') 
				updateGold(_item.value);
			else if (_item.key === 'exp')
				updateExperience(_item.value);
			else if (_item.key === 'pot')
				_looted = updatePot(_item.value);
			if(_looted) {
				const _val = _item.value, _k = _item.key;
				setTimeout(function () {
					dmgFrames.push({
						//text: _val + ' x &nbsp;<img src="./images/icons/' + _k + '.png" style="width:4vh" />',
						//class: 'dmg quest-reward',
						val: _val,
						item: { key: _k },
						x: mainCharacter.getScreenLeft(),
						y: _canvas.height - mainCharacter.yPosition - mainCharacter.getHeight()
					});
				}, _delay * 100);
				_delay++;
			}
		}
	}
}
function createBubbleDialog() {
	if (episode.status !== 'loaded')
		return;
	let _dialogs = __story.quests.find(x => x.id === __account.questStatus.order)?.dialogs;
	if(!_dialogs?.[0] && episode.dialogs)
		_dialogs = episode.dialogs;
	if (!_dialogs)
		return;
	let _dIndexes = [], _removals = [], _notAllowed = [], _d, _c;
	for (var i = 0; i < _dialogs.length; i++) {
		_d = _dialogs[i];
		if (_d.location.map && (episode.theme !== _d.location.map) && (_d.location.map !== episode.id))
			continue;
		_c = mainCharacter;
		if (_d.owner) {
			_c = episode.enemies.find(x => x.key === _d.owner || x.class === _d.owner);
			if (!_c)
				_c = episode.sprites.find(x => x.npc && x.animation.id === _d.owner);
			if (!_c)
				_c = mainCharacter;
		}
		if(!_d.dateStart)
			_d.dateStart = _gameTick;
		if ((_d.dateStart ?? _d.date) && ((_gameTick - (_d.dateStart ?? _d.date)) > (_d.ms ?? 1000)))
			_removals.push(_c);
		else if(__storyCutScenePlaying && _d.type === 'mumble')
			_notAllowed.push(i);
		else
			_dIndexes.push(i);
	}
	if (_dIndexes.length > 0)
		for(let _i of _dIndexes) {
			const _item = _dialogs[_i];
			if(!_item.date)
				_item.date = _gameTick;
			createBubbleText(_item);
		}
	if (_notAllowed.length > 0 && episode.dialogs?.length > 0)
	{
		_notAllowed.reverse();
		for(let _i of _notAllowed)
			episode.dialogs.splice(_i, 1);
	}
	if (_removals.length > 0)
		for(let _r of _removals) {
			const _bubble = episode.bubbles?.find(x => x.key === _r.key)?.elem;
			if (_bubble)
				removeBubble(_bubble, _r);
		}
}
function removeBubble(_bubble, _char) {
	const _id = _bubble.getAttribute('data-id');
	if (_id) {
		const _d = episode.dialogs?.find(x => x.id.toString() === _id);
		if (_d?.onend)
			_d.onend(_char);
		if(_d)
			episode.dialogs = episode.dialogs?.filter(x => x !== _d);
	}
	_bubble.remove();
	_bubble = undefined;
	episode.bubbles = episode.bubbles?.filter(x => x.elem && x.key !== _char.key);
}
function createBubbleText(_dialog) {
	if(cssAnimationProps.vs)
		return;
	if(!_dialog.date)
		_dialog.date = _gameTick;
	let _c = mainCharacter;
	if (_dialog.owner) {
		_c = episode.enemies.find(x => x.key === _dialog.owner || x.class === _dialog.owner);
		if (!_c) {
			_c = episode.sprites.find(x => x.npc && x.animation.id === _dialog.owner);
			if (_c?.npc)
				_c.key = _c.animation.id;
			else
				_c = mainCharacter;
		}
	}
	if(_dialog.delay && ((_gameTick - _dialog.date) < _dialog.delay)) {
		if(!episode.dialogs?.find(x => x.id === _dialog.id)) {	
			if(!episode.dialogs)
				episode.dialogs = [];
			episode.dialogs.push(_dialog);
		}
		return;
	}
	if(_dialog.delay)
		delete _dialog.delay;
	let _d = episode.bubbles?.find(x => x.key === _c.key)?.elem;
	let _firstCreation;
	if (!_d) {
		_firstCreation = 1;
		_d = document.createElement('div');
		_d.className = 'talk-bubble show-ui';
		if(_dialog.owner) {
			const _borderColor = getCharacterChatColor(episode.enemies?.find(x => x.key === _dialog.owner)?.class);
			if(_borderColor && (_borderColor !== '#f7f7f7'))
				_d.style.borderColor = _borderColor;
		}
		if (_dialog.id)
			_d.setAttribute('data-id', _dialog.id);
		_d.id = 'talk-bubble-' + _c.key;
		if(_dialog.width)
			_d.style.maxWidth = _dialog.width;
		if (!_c.npc)
			_d.charHeight = _c.getHeight();
		if(Array.isArray(_dialog.text))
			_dialog.text = _dialog.text[getRandomValue2(0, _dialog.text.length - 1)];
		_d.dialogText = getLangData(_dialog.text);
		if(!_dialog.asap)
			_d.letterOrder = 0;
		_d.innerHTML = '<div class="talk-bubble-inner"' + (_dialog.color ? ' style="color:' + _dialog.color + ' !important"' : '') + '>' + (_dialog.asap ? _d.dialogText : '') + '</div>';
		_gameUI.appendChild(_d);
		if(!episode.bubbles)
			episode.bubbles = [];
		episode.bubbles.push({key:_c.key, elem: _d});
		if(__story)
			PlaySound({key:'st' + __story.id + 'sc' + __storySceneOrder + 'id' + _dialog.id, volume:.5 })
	}
	if(!_c.still || _dialog.move || _firstCreation) {
		let _left, _top;
		// if (_c.npc) {
		// 	_left = MathRound(_c.left - (((_gamePad.clientWidth * .15) - _c.width) / 2)) - platformX;
		// 	_top = _c.top - MathRound(_canvas.height / 7);
		// }
		// else {
			_top = MathRound(_c.getTop() - (_canvas.height / 7) - (__zoom * (_dialog.bottomGap ?? 0)));
			//_left = MathRound(_c.getScreenLeft() - _c.getOriginDistance() -
			//	(((_gamePad.clientWidth * .15) - _c.getWidth()) / 2));
			_left = MathRound(_c.getExactLeft() + (__zoom * (_dialog.leftGap ?? 0)));  //MathRound((_c.getExactLeft() - 
			//(_d.clientWidth / 2)) + (_c.direction === 'left' ? 0 : _c.getWidth()));
		//}
		// _d.style.top = _top + 'px';
		// _d.style.left = _left + 'px';
		_d.style.transform = 'translate(' + _left + 'px,' + _top + 'px)';
		_d.style.setProperty('-webkit-transform', _d.style.transform);
	}
	//if(!episode.dialogs?.find(x => x.id === _dialog.id))
	if(!episode.dialogs?.find(x => x.id === _dialog.id)){
		if(!episode.dialogs)
			episode.dialogs = [];
		episode.dialogs.push(_dialog);
	}
	else {
		if(_d.letterOrder >= 0 && (_d.letterOrder % MathCeil(25 / msPerFrame)) === 0) {
			//kaydır
			const _inner =  _d.querySelector('.talk-bubble-inner');
			let _dText =  _inner?.innerText ?? '';
			if(_dText?.length > 0 && _dText.endsWith('_'))
				_dText = _dText.substring(0, _dText.length - 1);
			if(_dText?.length < _d.dialogText.length)
				_inner.innerText = _d.dialogText.substring(0, (_dText?.length ?? 0) + 1) + '_';
			if(_inner.innerText.length > _d.dialogText.length)
			{
				_inner.innerText = _d.dialogText;
				delete _d.letterOrder;
				return;
			}
		}
		_d.letterOrder ++;
	}
}
function acceptSideQuest(_id) {
	warn('<div class="flex heading toast-with-banner" style="position:relative"><img style="position:absolute;z-index:-1;left:-40%;width:180%" src="./images/icons/quest-accepted.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#f7f7f7 !important">' + getLangData('Side Quest Accepted') + '</span></div>', 'level-up');
	PlaySound({ key: 'questaccepted', volume: .8 });
	__account.questStatus.side.quest = JSON.parse(JSON.stringify(_sideQuests.find(x => x.id === _id)));
	__account.questStatus.side.state = 'progress';
	episode.reset();
	hideMyModalPopUp();
	_client.upgradeQuestStatus();
}
function createDialogScreen(_arr, _quest) {
	if(_dialogAppeared)
		return;
	mainCharacter.keyboard.holdingKeys = [];
	__account.questStatus.isStaticDialog = _quest ? false : true;
	if (__account.questStatus.isStaticDialog)
		__account.questStatus.dialogArr = _arr;
	let _dialogScreen = document.getElementById('quest-dialog');
	if(_dialogScreen) {
		_dialogScreen.remove();
		_dialogScreen = undefined;
	}
	if (!_dialogScreen) {
		_dialogScreen = document.createElement('div');
		_dialogScreen.style.position = 'absolute';
		_dialogScreen.style.width = '100%';
		_dialogScreen.style.height = '100%';
		_dialogScreen.style.top = _dialogScreen.style.left = 0;
		_dialogScreen.style.background = '#00000020';
		_dialogScreen.style.opacity = '0';
		_dialogScreen.className = 'animate-me flex show-ui';
		_dialogScreen.id = 'quest-dialog';
		_gameUI.appendChild(_dialogScreen);
	}
	mainCharacter.animate('idle', true);
	_dialogAppeared = true;
	addClass(_gameUI, 'disable-ui');
	let _people;
	if(_quest) {
		_people = [];
		for(let _item of _arr) {
			if(_item.concept)
				break;
			const _o = _item.owner === 'owner' ? _quest.owner : (_item.owner === 'main' ? mainCharacter.class : _item.owner);
			if(_people.indexOf(_o) === -1)
				_people.push(_o);
		}
	} 
	else
		_people = [_arr[0].owner, mainCharacter.class];
	// for (var _item of __account.questStatus.dialogArr) {
	// 	if (_item.owner === 'owner')
	// 		_item.owner = _quest.owner;
	// 	if (_people.indexOf(_item.owner) === -1)
	// 		_people.push(_item.owner);
	// }
	if (_people.length > 2)
		return;
	let _html = '<div class="full flex" style="justify-content:space-between">';
	let _conceptDirection, _order = 0;
	for (var _item of _people) {
		let _class = _item;
		if (_class === 'main')
			_class = mainCharacter.class;
		_conceptDirection = _conceptArts[_class].direction;
		_html += '<div class="flex animate-me flex-jc-' + (_order > 0 ? 'end' : 'start') + '" style="background:linear-gradient(0deg, #000, transparent);width:50%;height:100%">' +
			'<img onload="this.style.opacity=1" class="easeload concept-image gray-concept animate-me" id="concept-' + _class + '" style="' + ((((_order % 2) === 0) && _conceptDirection === 'left') || (((_order % 2) === 1) && _conceptDirection === 'right') ? "-webkit-transform: scaleX(-1);transform: scaleX(-1);" : '') + 'max-height:100%;max-width:100%" src="./images/main/' + (_class === 'owner' ? _quest.owner : _class) + '/concept.png" />'
			+ "</div>";
		_order++;
	}
	_html += '</div><div class="dialog-scr-left"></div><div onclick="skipDialog()" id="game-dialogs" style="border-top-left-radius:3vh;border-top-right-radius:3vh;overflow:hidden;width:70%;left:15%;top:65%;height:35%;background:#121212;position:absolute;z-index:99999 !important"><div style="height:20%;background:#00000080;border-bottom:2px solid #856b2c;color:#856b2c;padding-left:5%" id="dialog-owner" class="flex flex-jc-start"><span style="color:#f7f7f7cc!important;font-size:3vh !important">[' + _conceptArts[_people[0]].title + ']</span>' + (__account.questStatus.dialogArr[0].expression ? '&nbsp;&nbsp;<span style="font-size:2.8vh!important" class="dialog-owner-expression">(' + __account.questStatus.dialogArr[0].expression + ')</span>' : '') + '</div><div style="height:60%;padding:2% 5% 1% 5%"><div class="full" style="overflow-y:auto;color:#F4BB44 !important" id="dialog-text">' + replaceDialogText(__account.questStatus.dialogArr[0].texts?.[getLang()] ?? __account.questStatus.dialogArr[0].text) + '</div></div><div style="height:20%;padding:1% 5%"><span id="quest-skip" style="font-size:2.8vh!important;cursor:pointer;color:#fff !important">' + getLangData('NEXT') + ' &gt;&gt;</span></div></div><div class="dialog-scr-right"></div>';
	_dialogScreen.innerHTML = _html;
	setTimeout(function () {
		removeClass(document.querySelectorAll('.concept-image')[0], 'gray-concept');
		_dialogScreen.style.opacity = __account.questStatus.dialogOrder = 1;
		document.getElementById('concept-' + _people[0]).style.filter = 'drop-shadow:0px 0px .8vh #000';
		_client.upgradeQuestStatus();
	}, 20);
}
function createDialog(_questId) {
	if (_questId > 10000) {
		const _quest = _sideQuests.find(x => x.id === _questId);
		if (!_quest)
			return;
		if (__account.questStatus.side.state === 'end') {
			getQuestRewards(__account.questStatus.side.quest, 1);
			__account.questStatus.side.state = undefined;
			warn('<div class="flex heading" style="position:relative"><img style="position:absolute;z-index:-1;left:-40%;width:180%" src="./images/icons/banner.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('Side Quest Completed') + '</span></div>', 'level-up');
			PlaySound({ key: 'questdone', volume: .8 });
			if (_quest.end)
				_quest.end();
			if (!episode.drawSpriteObjects2(_quest.loot))
				episode.reset();
			_client.upgradeQuestStatus();
			return;
		}
		let _gain = '<div class="flex" style="height:70%;padding-top:18vh;width:60%;margin:0 20%;color:#262626 !important;font-size:4vh !important;align-items:flex-start !important">' + _quest.texts[getLang()] + '</div><div class="flex" style="width:60%;margin:0 20%;color:#262626 !important;height:10%">';
		if (_quest?.gain)
			for (let i = 0; i < _quest.gain.length; i++) {
				const _item = _quest.gain[i];
				if (i > 0)
					_gain += '&nbsp;, &nbsp;';
				_gain += '<img src="./images/icons/' + _item.key + '.png" style="width:4vh" /> &nbsp;x &nbsp;' + _item.value;
			}
		_gain += '</div>';
		if (!__account.questStatus.side.state)
			_gain += '<div class="flex" style="width:100%;height:20%"><div class="game-btn flex" onclick="acceptSideQuest(' + _questId + ')" style="font-size:4vh !important;height:6vh !important">' + getLangData('ACCEPT') + '</div></div>';
		document.getElementById('board-scroll-content').innerHTML = _gain;
		showMyModalPopUp('board-scroll');
		return;
	}
	let _status = __account.questStatus.state;
	const _quest = __story.quests.find(x => x.id === __account.questStatus.order);
	if (!_status || _status === 'incapable')
		_status = __account.questStatus.state = mainCharacter.level < _quest.minLevel ? 'incapable' : 'begin';
	__account.questStatus.dialogArr = __dialogs[getLang()]["quest" + __account.questStatus.order]?.[_status] ?? [{
		owner: _quest.owner,
		text: _defaultDialogs[getLang()][_status] + ((!_status || _status === 'incapable') ? '<br/><span class="min-level-required">(' + getLangData('Level') + ' ' + _quest.minLevel + ' ' + getLangData('required') + ')</span>' : '')
	}];
	createDialogScreen(__account.questStatus.dialogArr, _quest);
	_client.upgradeQuestStatus();
}
function createPotDialog(_class) {
	return [
		{ 
			owner: _class, 
			texts: { 
				en: 'Do you need anything?', 
				tr: 'Bir ihtiyacın var mı?' 
			} 
		},
		{
			owner: 'main',
			options: [
				{
					texts: { en: 'Some health potions may help', tr: 'Biraz sağlık iksiri yardımcı olabilir' }, 
					do: function() {
						addClass(_talkBtn, 'd-none');
						const _got = updatePot(1);
						const _npc = episode.enemies.find(x => x.class === _class);
						delete _npc.dialogs;
						if(_got) {
							createBubbleText({
								id: 1, 
								move: 1,
								location: { map: episode.id }, ms: 2000,
								owner: _npc.key, 
								text: "Here one for you"
							});
							dmgFrames.push({
								item: { key: 'pot' },
								val: 1,
								x: mainCharacter.getLeft(),
								y: _canvas.height - mainCharacter.yPosition - mainCharacter.getHeight()
							});
						}
					}
				}, 
				{
					texts: { en: 'Forget about it', tr: 'Unut gitsin' },
				}
			]
		}
	];
}
function createTrainingDialog(_class) {
	return [
		{ 
			owner: _class, 
			texts: { 
				en: 'Do you need anything?', 
				tr: 'Bir ihtiyacın var mı?' 
			} 
		},
		{
			owner: 'main',
			options: [
				{
					texts: { en: 'I need some training', tr: 'Biraz antrenmana ihtiyacım var' }, 
					do: function() {
						addClass(_talkBtn, 'd-none');
						switchStoryScene(null, __story.scenes.findIndex(x => x.map === 201) + 1);
					}
				}, 
				{
					texts: { en: 'Forget about it', tr: 'Unut gitsin' },
				}
			]
		}
	];
}
function createCommonSkillDialog(_class) {
	return [
		{ 
			owner: _class, 
			texts: { 
				en: 'You look so worried', 
				tr: 'Çok endişeli gördüm seni' 
			} 
		},
		{
			owner: 'main',
			options: [
				{
					texts: { en: 'I need more power', tr: 'Biraz güce ihtiyacım var' }, 
					do: function() {
						addClass(_talkBtn, 'd-none');
						const _got = mainCharacter.addCommonSkill({key: commonSkills[getRandomValue2(0, commonSkills.length - 1)].key});
						const _npc = episode.enemies.find(x => x.class === _class);
						if(_got) {
							delete _npc.dialogs;
							createBubbleText({
								id: 51, 
								move: 1,
								location: { map: episode.id }, ms: 2000,
								owner: _npc.key, 
								text: "Use this on enemy"
							});
						}
						else 
							createBubbleText({
								id: 52, 
								move: 1,
								location: { map: episode.id }, ms: 2000,
								owner: _npc.key, 
								text: "You already have"
							});
					}
				}, 
				{
					texts: { en: 'Forget about it', tr: 'Unut gitsin' },
				}
			]
		}
	];
}
const _defaultDialogs = {
	en: {
		incapable: 'You are not ready yet...',
		progress: 'I believe you can do it!',
		end: 'Thank you'
	},
	tr: {
		incapable: 'Henüz hazır değilsin...',
		progress: 'Sana inanıyorum, yapabilirsin!',
		end: 'Teşekkürler'
	}
};
function getMainName() {
	return _conceptArts[mainCharacter.class].title;
}
function getCharacterDialogTitle(_char) {
	return '<span style="color:' + _char.color + '!important">[' + (_char.displayName ?? _char.name) + ']</span>';
}
let _nameDeclared, _csEndFunc;
function declareAccountName() {
	if(_nameDeclared)
		return;
    PlaySound({ key: 'click' });
	__account.name = document.querySelector('#choose-acc-name input').value?.trim();
	if(!__account.name?.length) {
		warn('<span>' + getLangData('Name can\'t be empty') + '</span>', 'warn');
		return;
	}
	playCutScene(1, _cutScenes['cs1'].dialogs[getLang()].length);
	__account.cs = _nameDeclared = 1;
	_client.saveState();
	_navbar.innerHTML = avatarTemplate(mainCharacter);
	episode.drawSpriteObjects();
	episode.playAmbianceMusic();
}
function playCutScene(_id, _order, _func) {
	const _first = _order === undefined;
	if(_first)
		_order = 0;
	var _current = _cutScenes['cs' + _id];
	var _currentDialog = _current?.dialogs[getLang()]?.[_order];
	let _container = document.getElementById('cutscene');
	if(!_currentDialog) {
		closeInventoryQuestionModal();
		if(_container) {
			addClass(_container, 'fade-end');
			setTimeout(function() {
				_container.remove();
			}, 1000);
		}
		_dialogAppeared = undefined;
		removeClass(_gameUI, 'disable-ui');
		if(_csEndFunc)
			_csEndFunc();
		return;
	}
	var _currentBg = _currentDialog.bg;
	if(!_container) {
		_container = document.createElement('div');
		_container.id = 'cutscene';
		_container.className = 'cs' + _id + ' show-ui';
		hideMyModalPopUp();
		_dialogAppeared = 1;
		addClass(_gameUI, 'disable-ui');
		_gameUI.appendChild(_container);
		_csEndFunc = _func;
	}
	const goon = function() {
		if(_currentBg || (_first && _current.bg) || _currentDialog.text || _currentDialog.html) {
			const _bg = document.createElement('div');
			_bg.addEventListener('transitionend', () => {
				const _bgs = document.querySelectorAll('.cutscene-bg');
				_bgs.forEach(x => { if(x !== _bg) x.remove(); });
			});
			_bg.className = 'full cutscene-bg flex' + ((_currentDialog.class && !_first) ? ' ' + _currentDialog.class : '');
			if(_currentDialog.html)
				_bg.innerHTML = _currentDialog.html;
			_container.appendChild(_bg);
		}
	}
	goon();
}

const _cutScenes = {
	cs1: {
		dialogs: {
			en: [ 
				{ main: 1, skip: false, ms: 9999999, html: '<div class="flex" id="choose-acc-name"><input onpaste="return false;" ondrop="return false;" autocomplete="off" placeholder="Choose Your Name" id="acc-name-input" maxlength="14" type="text" /><span onclick="declareAccountName()" class="flex framed-btn">Play</span></div>' },
			],
			tr: [
				{ main: 1, skip: false, ms: 9999999, html: '<div class="flex" id="choose-acc-name"><input onpaste="return false;" ondrop="return false;" autocomplete="off" placeholder="İsmini Belirle" id="acc-name-input" maxlength="14" type="text" /><span onclick="declareAccountName()" class="flex framed-btn">Oyna</span></div>' },
			]
		}
	}
}
const __dialogs = {
	en: {
		// quest1: {
		// 	begin: [
		// 		{ owner: 'owner', expression: 'with fear and sadness for the lost', text: '${getMainName()}, we need to remove these carcasses around, better to carry them somewhere far away and burn them.' },
		// 		{ owner: 'main', expression: 'in a reassuring tone', text: 'I can help for that. We must hurry.' },
		// 		{ owner: 'owner', expression: 'grateful but panicked', text: 'I wanted to help, but I couldn\'t see my son Tulga when I woke up in the morning. I should look for him first.' },
		// 		{ owner: 'main', expression: 'determinedly and calmly', text: 'Don\'t worry Vargas. I can handle with this. Hope you find Tulga' }
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Check the grounds in here, still some carcasses are around.' },
		// 		{ owner: 'main', text: 'Let me check again Vargas, thank you...' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', text: 'Thank you ${getMainName()}, we must be vigilant to prevent such an incident from happening again. May the Tengri protect us all' },
		// 		{ owner: 'main', text: 'You are welcome.' }
		// 	]
		// },
		// quest2: {
		// 	begin: [
		// 		{ owner: 'owner', expression: 'with tears in her eyes, a shaky voice', text: '${getMainName()}, I beg you as a mother. My son Tulga ran away from the village with his rabbit Lulu yesterday morning. We have not heard anything from him since that day. I waited for whole night without blinking an eye, but he did not return. Everywhere is dark, everywhere is silent. I\'m afraid something might have happened to Tulga!' },
		// 		{ owner: 'main', expression: 'determinedly and calmly', text: 'Don\'t worry, Vargas, I will find Tulga and bring him back safely. Can you tell me where you last saw him?' },
		// 		{ owner: 'owner', expression: 'in despair and helplessness', text: 'The last time I saw them was playing on the edge of the forest. Lulu is Tulga\'s best friend. He never leaves her alone. But the forest is full of dangers, there may even be traces of evil hyenas. It\'s cold at night, it\'s hard to find food. My Tulga is the only one there." I don\'t know what he\'ll do to himself' },
		// 		{ owner: 'main', expression: 'in a comforting tone', text: 'You are a strong mother, Vargas. Tulga is also brave like you. I will find him, I promise you. I will set out immediately and bring him back as soon as possible.' },
		// 		{ owner: 'owner', expression: 'with a glimmer of hope in her eyes', text: 'Tengri bless you, ${getMainName()}. Find him and bring him back home to his mother. I trust you. Please bring my Tulga back to me.' },
		// 		{ owner: 'main', expression: 'lowering his head and determined', text: 'This is my duty, Vargas. I will find Tulga and bring her back to you. Wait for me.' },
		// 		{ owner: 'owner', expression: 'praying silently', text: 'Tengri help you, ${getMainName()}. Good luck.' }
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Any news about Tulga?' },
		// 		{ owner: 'main', text: 'I am so close Vargas' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', text: 'Thank you and Tengri to bring my child back to me' },
		// 		{ owner: 'main', text: 'He was so brave to survive like his mom' }
		// 	]
		// },
		// quest3: {
		// 	begin: [
		// 		{ owner: 'owner', expression: 'with a strong and determined voice', text: '${getMainName()}, recently our village has been plagued by swarms of rats. They have ravaged our food stores and the diseases they spread are deadly. We must act quickly.' },
		// 		{ owner: 'main', expression: 'curiously', text: "Where are the rats coming from, Deli Dumrul?" },
		// 		{ owner: 'owner', expression: 'seriously', text: 'Our village has been under the influence of some kind of dark magic for a long time. We have been struggling to breake this curse. To find the source of the rats, you must go to the forest path. You can track them from there.' },
		// 		{ owner: 'main', expression: 'determinedly', text: "I understand, Dumrul. I will track the rats and rid our village of this plague." },
		// 		{ owner: 'owner', expression: 'gratefully and with a hopeful voice', text: 'May the Tengri protect you, ${getMainName()}. Our village is counting on you. Return successfully.' }
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Go to the forest and let me smell the bloods of rats' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', expression: 'with a mockingly happy face', text: 'Thank you Ratman!' },
		// 		{ owner: 'main', text: 'Not at all Chief' }
		// 	]
		// },
		// quest4: {
		// 	incapable: [
		// 		{ owner: 'owner', text: 'Better to get stronger first' },
		// 		{ owner: 'main', text: 'I will...' },
		// 	],
		// 	begin: [
		// 		{ owner: 'owner', expression: 'with a serious and concerned voice', text: 'our village has been plagued by Goblins for some time. They steal our food and kill our livestock. Last night, the fresh meat we brought from the hunt was stolen, likely by the Goblins.' },
		// 		{ owner: 'main', expression:  'curiously and angrily', text: 'Where are these Goblins coming from, Temir Han?' },
		// 		{ owner: 'owner',  expression: 'seriously', text: 'With the curse on our village The Goblins have come down from the mountain caves into the forests and are getting very close to our village. A big storm is approaching, and we must retrieve the meat immediately, otherwise the villagers will starve. Also, their actions must be punished.' },
		// 		{ owner: 'main', expression: 'determinedly', text: 'Don\'t worry, Temir Han. I will track the Goblins and retrieve the stolen meat.' },
		// 		{ owner: 'owner',  expression:  'gratefully and encouragingly', text: 'Thank you, ${getMainName()}. May the Tengri be with you. Our village is counting on you. Return safely.' }
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Also don\'t forget to threat them not to do it again' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', text: 'Thanks to Tengri that brought you before me and we no longer have meat problems. Did the goblins get what they deserved?' },
		// 		{ owner: 'main', text: 'Goblins won\'t be problem anymore, i swear' }
		// 	]
		// },
		// // quest4: {
		// // 	begin: [
		// // 		{ owner: 'owner', text: 'Swamp is being massy on these seasons' },
		// // 		{ owner: 'main', text: 'Trouble huh?' },
		// // 		{ owner: 'owner', text: 'We are facing with a lot of trouble' },
		// // 		{ owner: 'main', text: 'Like what?' },
		// // 		{ owner: 'owner', text: 'The wasp bugs of swamp, they are the lord of sickness' },
		// // 		{ owner: 'main', text: 'Leave them to me' }
		// // 	],
		// // 	progress: [
		// // 		{ owner: 'owner', text: 'Swamp must be saved from the bugs' }
		// // 	],
		// // 	end: [
		// // 		{ owner: 'owner', text: 'Great work!' },
		// // 		{ owner: 'main', text: 'They wont be trouble anymore' }
		// // 	]
		// // },
		// quest5: {
		// 	begin: [
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'with a strong and determined voice', 
		// 			text: '${getMainName()}, fear and dread have once again descended upon our village. Maced hyenas have settled in the western part of the forest. They pose a significant threat to the prosperity of our village and must be eliminated.' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'determinedly', 
		// 			text: 'I understand, Dumrul. I will set out immediately to stop these animals.' 
		// 		},
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'gratefully and with a hopeful voice', 
		// 			text: 'May the Tengri protect you, ${getMainName()}. Our village is counting on you. Return successfully.' 
		// 		}
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', expression: 'with an anxious and hasty voice', text: 'Please help quick! We have to cast out that fear clouds above us.' },
		// 		{ owner: 'main', text: 'Calm down! Let me check the west side of forest first.' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', expression: 'with a relaxed voice', text: 'Fear is gone for a while, thank you ${getMainName()}.' },
		// 		{ owner: 'main', text: 'I\'m here for you whenever you need.' }
		// 	]
		// },
		// quest5: {
		// 	begin: [
		// 		{ owner: 'owner', text: 'Hello, kid!' },
		// 		{ owner: 'main', text: 'You are so busy today' },
		// 		{ owner: 'owner', text: 'And i have a lot to do' },
		// 		{ owner: 'main', text: 'A lot?' },
		// 		{ owner: 'owner', text: 'Yes. Storm is coming. We need to get back our snacks from robber goblins' },
		// 		{ owner: 'main', text: 'What kind of snacks?' },
		// 		{ owner: 'owner', text: 'Meats! They steal our meats that we bring from hunt, I smell their saliva from here. I am sure they are around' },
		// 		{ owner: 'main', text: 'Ahh Got It! Easy job. Wait here i will be back' }
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Still nothing?' },
		// 		{ owner: 'main', text: 'Damn goblins. I will get all back soon...' },
		// 		{ owner: 'owner', text: 'Better to check forest first' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', text: 'Great! I saw you brought something for us. Now enjoy the meal time. ' },
		// 		{ owner: 'main', text: 'Thanks' }
		// 	]
		// },
		// quest6: {
		// 	begin: [
		// 		{ owner: 'owner', text: 'Fear is back again' },
		// 		{ owner: 'main', text: 'Again?' },
		// 		{ owner: 'owner', text: 'This time bandits. They are hiding in west of forest' },
		// 		{ owner: 'main', text: 'Can you describe more?' },
		// 		{ owner: 'owner', text: 'They carry a metal weapon, punish them before too late' },
		// 		{ owner: 'main', text: "Wont be easy..." }
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Use the path in the end of Forest' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', text: 'Once again you did a great job for our people. Thank you' },
		// 		{ owner: 'main', text: 'My pleasure' }
		// 	]
		// },
		quest6: {
			begin: [
				{ 
					owner: 'owner', 
					text: 'Is there anything i can help?' 
				},
				{ 
					owner: 'main', 
					text: 'We are in a big trouble. The castle was destroyed and a goblin army attacked us.' 
				},
				{ 
					owner: 'owner', 
					faceExpression: 'angry',
					text: 'We should talk about this in my tent'
				},
				{ 
					concept: {
						bg: 'cs2-1',
						images: [
							{ key: 'cs2-c1', class: 'druid', height: 50, width: 25, coords: { left: 15, top: 25 }},
							{ key: 'cs2-c2', class: 'wizard', height: 50, width: 25, coords: { left: 40, top: 20 }},
							{ key: 'cs2-c3', class: 'blacksmith', height: 50, width: 25, coords: { left: 65, top: 25 }}
						]
					},
					owner: 'wizard',
					text: 'Temir Han, our new guests arrived tired and injured, and I shuddered when I heard what they said. We should listen to what they have to say.'
				},
				{
					owner: 'blacksmith',
					text: 'Hope you get well soon. May i ask your names?' 
				},
				{ 
					owner: 'druid',
					text: 'I am Vargas, the princess of Castle. Thank you for accepting us.' 
				},
				{ 
					owner: 'main',
					text: 'And i am ${getMainName()}, I found the.... princess tied to a tree in the forest' 
				},
				{ 
					owner: 'blacksmith',
					text: 'What happened to you my lady?' 
				},
				{ 
					owner: 'druid',
					text: 'An army of goblins with a black giant attacked our Castle, the giant was so powerful, even our King couldn\'t resist.' 
				},
				{ 
					owner: 'blacksmith',
					text: 'That is so sad. We are so sorry for your losses. Can you describe this giant more?'
				},
				{ 
					owner: 'druid',
					text: 'He has one red eye, using red beans and areal attacks. Was so scary.' 
				},
				{ 
					owner: 'main',
					text: 'I just heard sounds, didn\'t see the giant.' 
				},
				{ 
					owner: 'wizard',
					text: 'It\'s Cyclops! It may come here as well, we must be prepared! But how?' 
				},
				{ 
					owner: 'main',
					text: 'If anything i can help, i do with pleasure' 
				},
				{ 
					owner: 'druid',
					text: '${getMainName()}, You need a protection potion to resist his attacks. I can make it for you, but you must bring rat tails. You can around our ruined castle.'
					//text: '${getMainName()}, You are our only hope, you must go to the trolls\' cave and bring explosives to resist that creature. Remember that it will not be easy to take these away from them.' 
				}
			],
			progress: [
				{ 
					owner: 'owner',
					faceExpression: 'angry', 
					text: 'We don\'t have much time. Bring the tails as soon as possible!' },
				{ owner: 'main', text: 'Calm down! Let me check the ruined castle.' }
			],
			end: [
				{ owner: 'owner',
					faceExpression: 'happy', text: 'That is enough for tails but we will need another materials to craft it, Vargas will lead you for your next step' },
				{ owner: 'main', text: 'She has wisdom more than i guess, i will ask her without wasting time' }  
				//come back later. Meanwhile it would be good to talk to Temir Han, he also has an advice' },
				//{ owner: 'main', text: 'Sure, I will talk to him right now.' }
			]
			// begin: [
			// 	{ 
			// 		owner: 'owner', 
			// 		expression: 'with a wise and gentle voice', 
			// 		text: '${getMainName()}, did you know the forest offers many different and delightful flavors? For tonight\'s meal, we need to gather mushrooms from the western part of the forest, especially the blue mushrooms. We need your help.' 
			// 	},
			// 	{ 
			// 		owner: 'main', 
			// 		expression: 'curiously',
			// 		text: 'Blue mushrooms, Dede Korkut the Wise? Why are they so important?' 
			// 	},
			// 	{ 
			// 		owner: 'owner', 
			// 		expression: 'explaining',
			// 		text: 'Blue mushrooms are rare and very delicious. Moreover, everyone in the village needs a morale boost, and these mushrooms will make our meal special.' 
			// 	},
			// 	{ 
			// 		owner: 'main', 
			// 		expression: 'determinedly',
			// 		text: 'I understand, Dede Korkut. I will go to the west of the forest and gather the mushrooms right away.' 
			// 	},
			// 	{ 
			// 		owner: 'owner', 
			// 		expression: 'gratefully and with a hopeful voice',
			// 		text: 'Thank you, ${getMainName()}. May the Tengri protect you. Return safely.' 
			// 	}
			// ],
			// progress: [
			// 	{ owner: 'owner', text: 'Mushrooms, especially the blue ones, check the west of forest' }
			// ],
			// end: [
			// 	{ owner: 'owner', expression: 'whisper shyly', text: 'Thank you for take care of this' },
			// 	{ owner: 'main', expression: 'respectfully', text: 'Always welcome' }
			// ]
		},
		quest7: {
			begin: [
				{ 
					owner: 'owner', 
					text: 'I\'m so happy that you are ok and better than ever' 
				},
				{ 
					owner: 'main', 
					text: 'This is a very peaceful place. It gives me strength. I think you have the information for the next ingredient.' 
				},
				{ 
					owner: 'owner', 
					text: 'Yes, you need to bring us lotus plant which you can find in Swamp'
				},
				{ 
					owner: 'main', 
					text: 'Swamp? How scary was the surroundings of this quiet area'
				},
				{ 
					owner: 'owner', 
					text: 'Be careful, swamp beasts has toxic abilities'
				},
				{ 
					owner: 'main', 
					text: 'No pain no gain'
				}
			],
			progress: [
				{ 
					owner: 'owner',
					text: 'Tick ​​tock. Time is running out' },
				{ owner: 'main', text: 'Let me check my quest log about the place' }
			],
			end: [
				{ owner: 'owner', text: 'Ah there you are with full of plants, now give them to Dede Korkut and get ready for the last step' },
				{ owner: 'main', text: 'It is good to hear that we are close to combine everything. See you around' }
			]
		},
		quest8: {
			begin: [
				{ 
					owner: 'owner', 
					text: 'You are already strong but after this one, you will be much stronger' 
				},
				{ 
					owner: 'main', 
					text: 'I am ready and lets do this!' 
				},
				{ 
					owner: 'owner', 
					text: 'Take that skinning knife and bring us some bat wings from the cave of north'
				},
				{ 
					owner: 'main', 
					text: 'Sounds easy'
				}
			],
			progress: [
				{ owner: 'owner', text: 'Why are you still here? Are you afraid of the dark?' },
				{ owner: 'main', text: 'You saw me just as I was leaving' }
			],
			end: [
				{ owner: 'owner', text: 'When I first saw you, I could see in your eyes that you were fearless' },
				{ owner: 'main', text: 'One of us needs to stand strong after these recent tragic events' },
				{ owner: 'owner', text: 'To prevent another one from happening, take that potion and talk with Temir Han. He has a suggestion we can\'t miss' },
				{ owner: 'main', text: 'Thank you for your effort' }
			]
		},
		quest9: {
			begin: [
				{ 
					owner: 'owner', 
					text: 'It\'s good to see you around' 
				},
				{ 
					owner: 'main', 
					text: 'Dede Korkut said you have an idea, I came to listen to it' 
				},
				{ 
					owner: 'owner', 
					text: 'There is a dungeon in forest, and a troll is hiding something in there'
				},
				{ 
					owner: 'main', 
					text: 'What kind of thing?'
				},
				{ 
					owner: 'owner', 
					text: 'A Powerful receipt to make explosives, which you may need in fight'
				},
				{ 
					owner: 'main', 
					text: 'Sounds good. Let me search the dungeon and see if I find anything.'
				}
			],
			progress: [
				{ 
					owner: 'owner',
					text: 'If you get the plans I mentioned in time, you have a chance' },
				{ owner: 'main', text: 'Let me check my quest log about the place' }
			],
			end: [
				{ owner: 'owner', text: 'Take these explosives ${getMainName()}. Carefully target them. If you miss, it may occur trouble' },
				{ owner: 'main', text: 'I will do my best. Thank you' }
			]
		},
		// quest6: {
		// 	begin: [
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'in a stern voice', 
		// 			text: '${getMainName()}, there’s something important I need to discuss with you. You must go to the western side of the forest. The number of hyenas there is growing rapidly, and they’re becoming a threat to our village. Their howls can be heard all the way to the village at night, and I’d bet Dede Korkut’s kopuz that Erlik is organizing them to spread fear in our village!' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'with determination',
		// 			text: 'I will eliminate the hyenas, Deli Dumrul. I won’t let Erlik spread fear in our village!' 
		// 		}
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Let me hear the great news after punishing the hyenas.' }
		// 	],
		// 	end: [
		// 		{ owner: 'main', text: 'Howl is gone! And never will be back again.' },
		// 		{ owner: 'owner', expression: 'with touching both shoulders', text: 'You did well, ${getMainName()}. Thank you.' },
		// 	]
		// },
		// quest7: {
		// 	begin: [
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'with a serious and determined voice', 
		// 			text: '${getMainName()}, in the western part of the forest, there is a giant hyena named Lestat. He is a major threat to our village. He is giant and terrifying; no one dares to face him nowadays. He is a ruthless killer and a bloodsucking creature. Kill him and prove your bravery! But be careful, he is very dangerous. If you kill him, bring back a part as proof.' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'determinedly',
		// 			text: 'I understand, Temir Han. I will kill Lestat and bring back a part of him.' 
		// 		}
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Lestat must be stopped!' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', text: 'Good to see you ${getMainName()}. I didn\'t expect you to complete the task so quickly.' },
		// 		{ owner: 'main', expression: 'excitedly', text: 'Temir Han, I found Lestat and fought him. However, strange things happened. Lestat transformed into a giant werewolf and then escaped. Here, I brought his tooth.' },
		// 		{ owner: 'owner', expression: 'with a surprised and curious expression', text: 'This is incredible! We need to uncover the truth behind the werewolf story. I will take this tooth to Dede Korkut and seek his knowledge. May the Tengri protect you, ${getMainName()}. You\'ve done an excellent job.' },
		// 	]
		// },
		// quest8: {
		// 	begin: [
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'with a serious and concerned voice', 
		// 			text: '${getMainName()}, the source of the evil spreading in our region might be the nearby crypt. The cursed creatures there pose a great threat to our village. They must be destroyed.' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'with concern',
		// 			text: 'Cursed creatures? What could they be?' 
		// 		},
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'with a serious and concerned voice', 
		// 			text: 'According to rumors in the village, bones rise from the graves at night. If this is true, these bones could be skeleton warriors, and they might emerge to attack the village. The crypt must be cleansed.' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'determinedly',
		// 			text: 'I will cleanse the crypt, Deli Dumrul. I will protect the village from this evil.' 
		// 		},
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'gratefully',
		// 			text: 'Thank you, ${getMainName()}. May the Tengri protect you. Be careful.' 
		// 		}
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Make your way through the forest towards the cemetery. We need to keep an eye on that area for a while and find out what\'s going on.' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', text: 'Welcome ${getMainName()}, I hope you\'re back with good news.' },
		// 		{ owner: 'main', text: 'Just as you guessed. I saw some skeleton warriors at crypt and broke their bones.' },
		// 		{ owner: 'owner', text: 'Skeleton warriors are tough nuts to deal with, but as always, you did a great job, ${getMainName()}' },
		// 	]
		// },
		// quest9: {
		// 	begin: [
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'with determination', 
		// 			text: '${getMainName()}, I need you to gather spider\'s silks from the forest. With these silks, I will create the Sacred Path Illuminator Sigun Elixir. Those who drink it in the darkness will have their path illuminated.' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'curiously',
		// 			text: 'Spider\'s silks? Where does the elixir draw its power from?' 
		// 		},
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'with a solemn tone', 
		// 			text: 'These silks hold the light hidden within the darkness. The Sigun Elixir releases that light and guides those lost in the dark. Be cautious in the forest, as the spiders may defend their silks fiercely.' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'with determination',
		// 			text: 'Don\'t worry, Vargas. I\'ll gather the necessary silks and return.' 
		// 		}
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Spiders may try to trap you with their sticky saliva. You must be very careful.' }
		// 	],
		// 	end: [
		// 		{ owner: 'owner', expression: 'gratefully', text: 'I am grateful to you for bringing the spider\'s silks, ${getMainName()}. Now, I can craft the Sacred Path Illuminator Sigun Elixir. This elixir will be a great hope for those who lose their way in the darkness. Your help is invaluable to our village.' },
		// 		{ owner: 'main', expression: 'smiling', text: 'I\'m always ready to help, Vargas. I can\'t wait to see the power of the sacred elixir.' },
		// 	]
		// },
		quest10: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'gratefully', 
					text: '${getMainName()}, we are grateful to you for saving our village from the skeletons! This is a great act of courage! I am curious about, if you were encounter any ghouls in the graveyard?' 
				},
				{ 
					owner: 'main', 
					expression: 'with a serious expression',
					text: 'Yes, Temir Han. I saw many ghouls.' 
				},
				{ 
					owner: 'owner', 
					expression: 'with curiosity and seriousness', 
					text: 'I\'d like you to collect the ghouls\' saliva. As disgusting as it sounds, their saliva contains a vital substance used in treating certain diseases. This is very important for our village.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'You should be very careful about ghouls and be careful not to come into contact with them.' }
			],
			end: [
				{ owner: 'main', text: 'Here are the salivas you wanted. I hope they will heal our people.' },
				{ owner: 'owner', text: 'Thank you, ${getMainName()}. There is no doubt that it will work.' },
			]
		},
		quest11: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'in a gentle voice', 
					text: '${getMainName()}, I have an important request. I want you to collect the harmal herb for our village? I use this herb against the possibility of an evil eye being cast on people, animals or objects. I also add it to the medicines I produce to treat many diseases. It is found abundantly in the cemetery, you need to go there!' 
				},
				{ 
					owner: 'main', 
					expression: 'eagerly',
					text: 'Of course, Vargas, I\'ll go and gather the Harmal Herb right away.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'The herbs in my hand is running out. You must hurry ${getMainName()}' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'gratefully', 
					text: '${getMainName()}, I\'m very grateful for bringing the Harmal Herb. This herb is of great importance to our village. Once again, you\'ve protected us and the villagers. Thank you.' 
				},
				{ 
					owner: 'main', 
					expression: 'smiling',
					text: 'I\'m always ready to help, Vargas.' 
				}
			]
		},
		quest12: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'in a serious tone', 
					text: '${getMainName()}, you need to cleanse the swamp of the creatures. Evil is spreading from that cursed swamp, and until it\'s completely cleansed, our village won\'t find peace.' 
				},
				{ 
					owner: 'main', 
					expression: 'determined',
					text: 'I understand, Deli Dumrul. I\'ll go and cleanse the swamp right away.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'When you go further than the cemetery you will encounter the swamp and its creatures.' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'with gratitude and admiration', 
					text: '${getMainName()}, you\'ve proven once again how brave and strong a warrior you are. I\'m grateful for your efforts in cleansing the swamp.' 
				},
				{ 
					owner: 'main', 
					expression: 'smiling',
					text: 'I\'m always ready to protect our village.' 
				}
			]
		},
		quest13: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'with an emotional voice', 
					text: '${getMainName()}, the sacred great wolves of our people have been captured by the evil in the swamp. You must not waste any time in rescuing them. These wolves are sacred to us. Do you remember the Grey Wolf who guided Oğuz Khan?' 
				},
				{ 
					owner: 'main', 
					expression: 'with respect',
					text: 'Yes, I remember. That wolf walked before Oğuz Khan and showed him the way.' 
				}
				,{ 
					owner: 'owner', 
					expression: 'recalling an old tale', 
					text: 'At dawn, a light like the sun entered Oğuz Khan\'s tent. From that light, a great male wolf with a blue mane and blue fur appeared. The wolf said to Oğuz, "Oğuz, you wish to march against Urum; I want to walk before you." And the army followed this great wolf.' 
				},
				{ 
					owner: 'main', 
					expression: 'with determination',
					text: 'I will rescue the great wolves, Temir Han. They too will be our guides!' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Recent tracks indicate the wolves were caged and taken to the swamp.' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'with a grateful and appreciative voice', 
					text: '${getMainName()}, you have proven once again what a brave and strong hero you are. Thank you for clearing the swamp.' 
				},
				{ 
					owner: 'main', 
					expression: 'smiling',
					text: 'I am always ready to protect our village.' 
				}
			]
		},
		quest14: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'serious and cautionary', 
					text: '${getMainName()}, I need the wings, stingers, and especially the venom of the Wasps in the Swamp. With these materials, I can craft powerful, poisonous arrows. But remember, these Wasps are extremely dangerous. Their venom can be lethal. Be very careful when gathering them.' 
				},
				{ 
					owner: 'main', 
					expression: 'determined',
					text: 'Don\'t worry, Temir Han. I\'ll keep their danger in mind and bring back all the materials you need.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'They usually attack in flocks. So you have to be very careful.' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'grateful', 
					text: 'You did an excellent job, hero! The Wasp wings, stingers, and venom are exactly what I needed. These arrows will be crucial in defending our village. I\'m deeply grateful to you.' 
				},
				{ 
					owner: 'main', 
					expression: 'humble',
					text: 'It was an honor to fulfill my duty, Temir Han.' 
				}
			]
		},
		quest15: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'anxious and determined',
					text: '${getMainName()}, deep in the forest, there are two cursed shaman sisters named Malvera and Noctara. Once, they were powerful shamans who could communicate with nature spirits. But their ambition led them astray. They sought the secret of immortality from the Great Eagle Spirit, but their attempt cursed them into dark beings. Now, they\'re trying to take over the forest with dark rituals. You must stop them!' 
				},
				{ 
					owner: 'main', 
					expression: 'with a surprised voice',
					text: 'How could this be!' 
				},
				{ 
					owner: 'owner', 
					expression: 'explaining',
					text: 'The spirits cursed Malvera and Noctara for disrupting the balance of nature. Their quest for immortality condemned them to eternal pain. Although they no longer died physically, their spirits were filled with eternal hunger and darkness. At night, instead of binding the nature spirits to themselves, they transformed into beings that exploited them and gained power. These sisters, who consumed people and spirits, gradually became known as "Cursed Shamans"' 
				},
				{ 
					owner: 'main', 
					expression: 'confident',
					text: 'I\'ll take care of it, Tank. I\'ll put an end to their evil.' 
				},
				{ 
					owner: 'owner', 
					expression: 'with a voice full of gratitude and hope',
					text: 'I\'m grateful to you, ${getMainName()}. This village remains safe because of your bravery.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'This is a really dangerous mission. Are you really sure you are ready for this?' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'grateful and relieved', 
					text: 'I\'m deeply grateful, ${getMainName()}. You\'ve saved our village from this curse. Without your courage and strength, we wouldn\'t have survived this darkness. Thanks to you, the forest and our village can find peace again.' 
				},
				{ 
					owner: 'main', 
					expression: 'bravely',
					text: 'All this is not for fame, glory or money, but for friends...' 
				},
				{ 
					owner: 'owner', 
					expression: 'with admiration', 
					text: 'May the Tengri protect you...' 
				}
			]
		},
		quest16: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'in a serious and concerned tone',
					text: '${getMainName()}, Nowadays, a Kobolt cub was spotted in an area close to the village. It is estimated that they came here from the volcanic region. If we don\'t intervene early, they may become unstoppable when they grow up. You have to go to that area, find their eggs and destroy them.' 
				},
				{ 
					owner: 'main', 
					expression: 'determined',
					text: 'I understand, Deli Dumrul. I\'ll take care of them and protect our village from this danger.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'To reach the volcanic area, you must head north of the cemetery' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'gratefully', 
					text: 'thanks to you, our village has been saved from another threat. I can\'t express how grateful I am. You are a true hero.' 
				},
				{ 
					owner: 'main', 
					expression: 'smiling',
					text: 'I\'m always ready to protect this village.' 
				}
			]
		},
		quest17: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'with looking around worriedly',
					text: '${getMainName()}, there is a very important problem that concerns us all. We should sit inside and talk' 
				},
				{ 
					concept: {
					},
					owner: '...',
					text:'The village\'s most important warriors and leaders were invited to this meeting: Vargas, Temir Han, and the Alps, fully informed of all that had transpired, had gathered in Dede Korkut\'s tent...'
				},
				{ 
					concept: {
						bg: 'cs2-1',
						images: [
							{ key: 'cs2-c1', class: 'druid', height: 50, width: 25, coords: { left: 15, top: 30 }},
							{ key: 'cs2-c2', class: 'wizard', height: 50, width: 25, coords: { left: 40, top: 20 }},
							{ key: 'cs2-c3', class: 'blacksmith', height: 50, width: 25, coords: { left: 65, top: 30 }}
						]
					},
					owner: 'wizard',
					text: 'Welcome, Temir Han, and our brave hero... I know you\'re facing a difficult task. There\'s an urgent matter concerning the It-Baraks. These creatures were once known as dogs by humans. But through a dark curse, they were transformed into vicious beasts, the It-Baraks.'
				},
				{
					owner: 'druid',
					text: 'Tulga was telling something like that when our hero safely brought him back to village. Poor Tulga, He may have seen some very bad things in the forest that night.' 
				},
				{ 
					owner: 'blacksmith',
					text: 'It-Baraks? The name sounds familiar, but I didn\'t know there was such a dark truth behind them.' 
				},
				{ 
					owner: 'wizard',
					text: 'Yes, Temir Han. The It-Baraks were cursed by a powerful shaman. This curse not only changed them physically but also led them into spiritual darkness. Now they serve dark forces and are each a dangerous enemy.' 
				},
				{ 
					owner: 'main',
					text: 'Lestat... So, Lestat is one of these It-Baraks! We knew he was approaching our village, but we didn\'t realize he was this dangerous. We must stop him!' 
				},
				{ 
					owner: 'druid',
					text: 'Lestat is no ordinary It-Barak. He\'s a leader, guiding the others and stealthily approaching our village. If you don\'t stop him, he could bring great destruction to our home. It will take courage to face him, but if you succeed, you will save our village from this dark power.' 
				},
				{ 
					owner: 'blacksmith',
					text: 'This task is something only a hero like you can handle. We must defeat Lestat and eliminate this dark threat. We\'ll be right beside you.' 
				},
				{ 
					owner: 'main',
					text: 'I will do whatever it takes to protect this village. Lestat will meet his end, and the It-Baraks will be cleansed from this land. I\'m ready, Dede Korkut, Temir Han. Thank you for your support.' 
				},
				{ 
					owner: 'wizard',
					text: 'Tengri bless us all.' 
				}
			],
			progress: [ 
				{ owner: 'owner', text: 'I believe you can do it.' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'gratefully', 
					text: 'Thats it for now. Our village is safe with your help.' 
				},
				{ 
					owner: 'main', 
					expression: 'satisfied',
					text: 'Then I\'ll get some rest. If you need me I will be happy to help' 
				}
			]
		},
	},
	tr: {
		quest1: {
			begin: [
				{ owner: 'owner', expression: 'korku ve kayıplar için üzgün', text: '${getMainName()}, etraftaki leşleri kaldırmalıyız, onları uzak bir yere taşıyıp yakarsak çok iyi olur.' },
				{ owner: 'main', expression: 'güven verici bir ses tonuyla', text: 'Bu konuda yardımcı olabilirim. Ama acele etmeliyiz.' },
				{ owner: 'owner', expression: 'minnettar ama panik içinde', text: 'Ben de yardım etmek isterim ama oğlum Tulga\'yı sabah uyandığımdan beri göremiyorum. Öncelikle onu aramalıyım.' },
				{ owner: 'main', expression: 'kararlılıkla ve sakince', text: 'Önemli değil Vargas. Bunu halledebilirim. Umarım Tulga\'yı bulursun.' }
			],
			progress: [
				{ owner: 'owner', text: 'Yakındaki yerleri kontrol edebilirsin, hala yerde leşlerin kokusunu alabiliyorum.' },
				{ owner: 'main', text: 'Tekrar kontrol edeceğim Vargas, teşekkür ederim.' }
			],
			end: [
				{ owner: 'owner', text: 'Teşekkürler ${getMainName()}, bir daha böyle bir olayın yaşanmaması için tetikte olmalıyız. Tengri hepimizi korusun.' },
				{ owner: 'main', text: 'Rica ederim.' }
			]
		},
		quest2: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'gözleri yaşlı ve titrek bir sesle', 
					text: '${getMainName()}, Sana bir anne olarak yalvarıyorum. Dün sabah oğlum Tulga, tavşanı Lulu ile ormana gitmişti. O andan beri hiç haber alamadık. Gözümü kırpmadan bütün gece bekledim, fakat geri dönmedi. Her yer karanlık ve sessiz. Tulga\'nın başına bir şey gelmiş olabileceğinden çok korkuyorum!' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlı ve sakin bir ses tonuyla', 
					text: 'Merak etme, Vargas, Onu bulup güvenli bir şekilde geri getireceğim. Onu en son nerede gördüğünü sorabilir miyim?' 
				},
				{ owner: 'owner', expression: 'çaresiz bir şekilde', text: 'En son onları ormanda görmüştüm. Lulu, Tulga\'nın en iyi dostudur. Tulga onu hiç yalnız bırakmaz. Ama orman tehlikelerle dolu, vahşi sırtlanlar kokusunu alabilir. Gecenin soğuğunda aç ve susuz kalabilir. Tulga\'cığım orada tek başına.' },
				{ owner: 'main', expression: 'rahatlatıcı bir ses tonuyla', text: 'Sen güçlü bir annesin, Vargas. Tulga da aynı şekilde. Onu bulacağım, sana söz veriyorum. Hemen yola koyulup onu sana getireceğim.' },
				{ owner: 'owner', expression: 'umut dolu bakışlarla', text: 'Tengri seni kutsasın, ${getMainName()}. Onu bulup anneciğine kavuştur. Sana güveniyorum. Lütfen onu bana getir.' },
				{ owner: 'main', expression: 'kararlılıkla yüzünü alçaltarak', text: 'Bu benim görevim, Vargas. Onu bulup sana getireceğim. Bekle beni' },
				{ owner: 'owner', expression: 'sessizce dua ederek', text: 'Tengri yardımcın olsun, ${getMainName()}. Bol şans.' }
			],
			progress: [
				{ owner: 'owner', expression: 'bir umutla', text: 'Tulga\'dan bir haber var mı?' },
				{ owner: 'main', expression: 'teselli edercesine', text: 'Henüz yok ama çok yaklaştım Vargas' }
			],
			end: [
				{ owner: 'owner', expression: 'mutlu ve sıcak bir karşılamayla', text: 'Sana ve Tengri\'ye şükürler olsun, oğlumu bana ulaştırdın.' },
				{ owner: 'main', expression: 'bir anneyi mutlu etmenin gururuyla', text: 'He was so brave to survive like his mom' }
			]
		},
		quest3: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'güçlü ve kararlı bir sesle', 
					text: '${getMainName()}, , köyümüze yakın zamanda fare sürüleri dadandı ve yiyecek ambarlarımızı mahvettiler. Yaydıkları hastalıklar ölümcül. Bu duruma acilen müdahale etmeliyiz.' 
				},
				{ 
					owner: 'main', 
					expression: 'merakla', 
					text: 'Fareler nereden geliyor, Deli Dumrul?' 
				},
				{ owner: 'owner', expression: 'ciddi bir ifadeyle', text: 'Uzun süredir köyümüz bir çeşit kara büyünün etkisi altında. Bu lanetin kalkması için mücadele ediyoruz. Farelerin geldiği yeri bulmak için orman yoluna gitmen gerekecek. Orada izlerini sürebilirsin.' },
				{ owner: 'main', expression: 'kararlılıkla', text: 'Anladım Dumrul. Farelerin izini sürecek ve köyümüzü bu beladan kurtaracağım.' },
				{ owner: 'owner', expression: 'teşekkürle ve umut dolu bir sesle', text: 'Tengri seni korusun, ${getMainName()}. Köyümüz sana güveniyor. Başarıyla dön.' },
			],
			progress: [
				{ owner: 'owner', text: 'Bir an önce ormanda onları bul ve yok et. Artık kanlarının kokusunu almak istiyorum' }
			],
			end: [
				{ owner: 'owner', expression: 'alaycı ve mutlu bir ifadeyle', text: 'Aferin fareadam!' },
				{ owner: 'main', expression: 'gülümseyerek', text: 'Bir şey değil Şef' }
			]
		},
		quest4: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'ciddi ve endişeli bir sesle', 
					text: '${getMainName()}, köyümüze bir süredir Goblinler dadandı. Yiyeceklerimizi çalıyor ve hayvanlarımızı öldürüyorlar. Dün gece avdan yeni getirdiğimiz taze etler de çalındı, muhtemelen Goblinlerin işi!' 
				},
				{ 
					owner: 'main', 
					expression: 'merakla ve öfkeyle', 
					text: 'Bu Goblinler nereden geliyor, Temir Han?' 
				},
				{ owner: 'owner', expression: 'ciddi bir ifadeyle', text: 'Köyümüzün üzerindeki lanetle birlikte Goblinler dağlardaki mağaralardan ormanlara indiler ve köyümüze çok yaklaştılar. Büyük bir fırtına yaklaşıyor ve hemen bu etleri geri almalıyız yoksa köylüler aç kalacak. Ayrıca, yaptıklarının cezasız kalmaması gerekiyor.' },
				{ owner: 'main', expression: 'kararlılıkla', text: 'Endişelenme Temir Han. Goblinlerin izini sürecek ve çaldıkları etleri geri getireceğim.' },
				{ owner: 'owner', expression: 'teşekkürle ve cesaret verici bir sesle', text: 'Teşekkür ederim, ${getMainName()}. Tengri seninle olsun. Köyümüz sana güveniyor. Güvenle dön.' },
			],
			progress: [
				{ owner: 'owner', text: 'Ayrıca onları tekrar yapmamaları konusunda tehdit etmeyi de unutma!' }
			],
			end: [
				{ owner: 'owner', text: 'Şükürler olsun ki, Tengri seni karşıma çıkardı ve erzak sıkıntımızı çözdün. Goblinler hakettiklerini buldu mu=' },
				{ owner: 'main', expression: 'bir anneyi mutlu etmenin gururuyla', text: 'Goblinler artık bu köye dadanmayacak, söz veriyorum' }
			]
		},
		quest5: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'güçlü ve kararlı bir sesle', 
					text: '${getMainName()}, korku ve dehşet bir kez daha köyümüzün üstüne çöktü. Ormanın batı yakasına ağır teber kullanan savaşçılar yerleşti. Onlar köyümüzün refahı için büyük bir tehdit oluşturuyorlar ve yok edilmeleri gerekiyor.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla', 
					text: 'Anladım Dumrul. Bu hayvanları durdurmak için hemen yola çıkacağım.' 
				},
				{ 
					owner: 'owner', 
					expression: 'teşekkürle ve umut dolu bir sesle', 
					text: 'Tengri seni korusun, ${getMainName()}. Köyümüz sana güveniyor. Başarıyla dön.' 
				}
			],
			progress: [
				{ owner: 'owner', expression: 'tedirgin ve aceleci bir ses tonuyla', text: 'Lütfen acele yardım et! Artık üstümüzdeki bu korku bulutları dağılsın.' },
				{ owner: 'main', text: 'Sakin ol! Önce ormanın batı kısmını bir kontrol edeyim.' }
			],
			end: [
				{ owner: 'owner', expression: 'sakin bir ses tonuyla', text: 'Bir süreliğine bu sıkıntımızı çözmemize yardımcı oldun, teşekkürler ${getMainName()}.' },
				{ owner: 'main', text: 'Ne zaman ihtiyacınız olursa, yanınızdayım' }
			]
		},
		quest6: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'bilge ve nazik bir sesle', 
					text: '${getMainName()}, ormanın birçok farklı ve güzel lezzeti bir arada sunduğunu biliyor muydun? Bu akşamki yemek için ormanın batısındaki bölgeden mantarları, özellikle mavi mantarları toplamamız gerekiyor. Yardımına ihtiyacımız var.' 
				},
				{ 
					owner: 'main', 
					expression: 'merakla',
					text: 'Mavi mantarlar mı, Dede Korkut? Neden onlar bu kadar önemli?' 
				},
				{ 
					owner: 'owner', 
					expression: 'açıklayıcı bir şekilde',
					text: 'Mavi mantarlar nadir bulunur ve çok lezzetlidirler. Ayrıca, köydeki herkesin morale ihtiyacı var ve bu mantarlar yemeğimizi özel kılacak.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla',
					text: 'Anladım, bilge Dede Korkut. Hemen ormanın batısına gidip mantarları toplayacağım.' 
				},
				{ 
					owner: 'owner', 
					expression: 'teşekkürle ve umut dolu bir sesle',
					text: 'Teşekkür ederim, ${getMainName()}. Tengri seni korusun. Güvenle dön.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Mantarlar, özellikle de mavi olanlar. Ormanın batı tarafında aramalısın.' }
			],
			end: [
				{ owner: 'owner', expression: 'whisper shyly', text: 'Bununla ilgilendiğin ve vakit ayırdığın için teşekkür ederim.' },
				{ owner: 'main', expression: 'respectfully', text: 'Her zaman, memnuniyetle.' }
			]
		},
		// quest6: {
		// 	begin: [
		// 		{ 
		// 			owner: 'owner', 
		// 			expression: 'sert bir sesle', 
		// 			text: '${getMainName()}, seninle konuşmam gereken önemli bir mesele var. Çöle gitmen gerekiyor. Orada sayıları hızla artan sırtlanlar, köyümüze tehdit oluşturuyorlar. Sesleri geceleri köye kadar geliyor, ve Dede Korkut\'un kopuzu üstüne bahse girerim ki Erlik, onları köyümüze korku salmak için örgütlüyor!' 
		// 		},
		// 		{ 
		// 			owner: 'main', 
		// 			expression: 'kararlılıkla',
		// 			text: 'Sırtlanları yok edeceğim, Deli Dumrul. Erlik\'in köyümüze korku salmasına izin vermeyeceğim!' 
		// 		}
		// 	],
		// 	progress: [
		// 		{ owner: 'owner', text: 'Şu çakalları cezalandırdığında haberim olsun.' }
		// 	],
		// 	end: [
		// 		{ owner: 'main', text: 'Uluma artık gitti! Ve bir daha asla geri gelmeyecek.' },
		// 		{ owner: 'owner', expression: 'iki omuza da dokunarak', text: 'Çok iyi iş çıkardın, ${getMainName()}. Teşekkürler.' },
		// 	]
		// },
		quest7: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'ciddi ve kararlı bir sesle', 
					text: '${getMainName()}, ormanın kuzeyinde Lestat isimli dev bir sırtlan yaşıyor. O, köyümüz için büyük bir tehdit. Devasa ve korkunç bir yaratık; kimse onunla karşılaşmaya cesaret edemedi. O, acımasız bir katil ve kan emici bir yaratık. Onu öldür ve cesaretini kanıtla! Ancak dikkatli ol, çok tehlikeli. Onu öldürürsen kanıt olarak bir parçasını getir.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla',
					text: 'Anladım, Temir Han. Lestat\'ı öldüreceğim ve size bir parçasını getireceğim.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Lestat durdurulmalı!' }
			],
			end: [
				{ owner: 'owner', text: 'Seni görmek ne güzel ${getMainName()}. Açıkçası görevi bu kadar çabuk yapacağını tahmin etmiyordum.' },
				{ owner: 'main', expression: 'heyecanlı bir şekilde', text: 'Temir Han, Lestat\'ı buldum ve savaştım. Ancak, çok garip şeyler oldu. Lestat dev bir kurtadama dönüştü ve ardından kaçtı. İşte, onun dişini getirdim.' },
				{ owner: 'owner', expression: 'şaşkın ve meraklı bir ifadeyle', text: 'Bu inanılmaz! Kurtadam hikayesinin ardındaki gerçeği öğrenmemiz gerekiyor. Bu dişi alıp Dede Korkut\'a göstereceğim ve bilgi almaya çalışacağım. Tengri seni korusun, ${getMainName()}. Harika bir iş çıkardın.' },
			]
		},
		quest8: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'ciddi ve endişeli bir sesle', 
					text: '${getMainName()}, bölgemize yayılan lanetin kaynağı, yakınlardaki eski mahsen olabilir. Oradaki uğursuz yaratıkların varlığı, köyümüz için büyük bir tehlike oluşturuyor. Onların yok edilmesi gerekiyor.' 
				},
				{ 
					owner: 'main', 
					expression: 'endişeli bir şekilde',
					text: 'Uğursuz yaratıklar mı? Onlar ne olabilir?' 
				},
				{ 
					owner: 'owner', 
					expression: 'karamsar bir ifadeyle', 
					text: 'Köydeki söylentilere göre, geceleri mezarlardan çıkan kemikler var. Eğer bu doğruysa, bu kemikler iskelet savaşçılar olabilir ve mezarlardan çıkıp köye saldırabilirler. Mezarlığın temizlenmesi şart.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla',
					text: 'Mezarlığı temizleyeceğim, Temir Han. Köyü bu kötülükten koruyacağım.' 
				},
				{ 
					owner: 'owner', 
					expression: 'teşekkürle',
					text: 'Teşekkür ederim, ${getMainName()}. Tengri seni korusun. Dikkatli ol.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Ormanı aşarak mezarlığa doğru ilerle. O bölgeyi bir süre takibe alıp neler döndüğünü öğrenmeliyiz.' }
			],
			end: [
				{ owner: 'owner', text: 'Hoşgeldin ${getMainName()}, Umarım iyi haberler ile dönmüşsündür.' },
				{ owner: 'main', text: 'Tam tahmin ettiğin gibi. Mahsende iskelet savaşçıları buldum ve tüm kemiklerini kırdım.' },
				{ owner: 'owner', text: 'İskelet savaşçılar çetin cevizdir. Ama sen her zamanki gibi iyi iş başardın, ${getMainName()}' },
			]
		},
		quest9: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'kararlı bir şekilde', 
					text: '${getMainName()}, ormanda yaşayan örümceklerin ağlarını toplamana ihtiyacım var. Bu ağlardan Kutsal Yol Gösterici Sigun İksiri yapacağım. Karanlıkta bu iksiri içenlerin yolu aydınlanacak.' 
				},
				{ 
					owner: 'main', 
					expression: 'merakla',
					text: 'Örümcek ağları mı? Bu iksirin gücü nereden geliyor?' 
				},
				{ 
					owner: 'owner', 
					expression: 'ağırbaşlı bir tonla', 
					text: 'Bu ağlar, karanlığın içinde gizlenen ışığı barındırır. Sigun İksiri, bu ışığı serbest bırakır ve karanlıkta kaybolanların yolunu gösterir. Ormanda dikkatli ol, çünkü örümcekler avlarını savunmak için tehlikeli olabilirler.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla',
					text: 'Endişelenme, Vargas. Gerekli ağları toplayıp geri döneceğim.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Örümcekler yapışkan tükürükleriyle seni hapsetmeye çalışabilirler. Çok dikkatli olmalısın.' }
			],
			end: [
				{ owner: 'owner', expression: 'minnettar bir şekilde', text: 'Örümcek ağlarını getirdiğin için sana minnettarım, Kurt Oğlu. Artık Kutsal Yol Gösterici Sigun İksirini yapabiliriz. Bu iksir, karanlıkta yolunu kaybedenler için büyük bir umut olacak. Yardımın köyümüz için çok değerli.' },
				{ owner: 'main', expression: 'gülümseyerek', text: 'Her zaman yardıma hazırım, Vargas. Kutsal iksirin gücünü görmek için sabırsızlanıyorum.' },
			]
		},
		quest10: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'teşekkürle', 
					text: '${getMainName()}, köyümüzü iskeletlerden kurtardığın için sana minnettarız! Bu büyük bir cesaret örneği! Peki, mahsende hortlaklara rastladın mı?' 
				},
				{ 
					owner: 'main', 
					expression: 'ciddi bir ifadeyle',
					text: 'Evet, Temir Han. Çok fazla hortlak gördüm.' 
				},
				{ 
					owner: 'owner', 
					expression: 'merakla ve ciddiyetle',
					text: 'Hortlaklardan salya örneği getirmeni rica edeceğim. Bu iğrenç yaratıkların salyası, bazı hastalıkların tedavisinde elzem olan bir madde içeriyor. Köyümüz için bu çok önemli.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Hortlaklara çok dikkat etmeli ve onlara temas etmemeye özen göstermelisin.' }
			],
			end: [
				{ owner: 'main', text: 'İstediğin hortlak salyaları işte burada. Umarım halkımıza şifa olur.' },
				{ owner: 'owner', text: 'Teşekkürler, ${getMainName()}. İşe yarayacğı konusunda hiç şühen olmasın.' },
			]
		},
		quest11: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'nazik bir sesle', 
					text: '${getMainName()}, senden önemli bir ricam olacak! Köyümüz için Üzerlik Otu toplamanı istiyorum. Bu otu, insana, hayvana ya da eşyaya nazar değme ihtimaline karşı tütsü olarak kullanıyorum. Ayrıca, birçok hastalığın tedavisinde ürettiğim ilaçlara ekliyorum. Mahsende çokça bulunur, oraya gitmen gerekli!' 
				},
				{ 
					owner: 'main', 
					expression: 'hevesle',
					text: 'Elbette Vargas, hemen gidip Üzerlik Otu\'nu toplayacağım.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Elimdeki tütsüler tükeniyor. Acele edersen sevinirim ${getMainName()}' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'minnettar bir şekilde', 
					text: '${getMainName()}, Üzerlik Otu\'nu getirdiğin için çok minnettarım. Bu ot köyümüz için büyük önem taşıyor. Bizi ve köylülerimizi bir kez daha korudun. Teşekkür ederim.' 
				},
				{ 
					owner: 'main', 
					expression: 'gülümseyerek',
					text: 'Her zaman yardıma hazırım, Vargas.' 
				}
			]
		},
		quest12: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'ciddi bir sesle', 
					text: '${getMainName()}, bataklığı yaratıklardan temizlemen gerekiyor. Kötülük bu lanetli bataklıktan yayılıyor ve burayı tamamen arındırmadan köyümüzün huzura kavuşması mümkün değil.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla',
					text: 'Anladım Deli Dumrul. Hemen gidip bataklığı temizleyeceğim.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Mahsenden daha ileri gittiğinde bataklık ve oradaki yaratıklarla karşılaşacaksın.' }
			],
			end: [
				{ 
					owner: 'owner', 
					text: '${getMainName()}, ne kadar cesur ve güçlü bir savaşçı olduğunu bir kez daha kanıtladın. Bataklığı temizlediğin için sana minnettarım.' 
				},
				{ 
					owner: 'main', 
					expression: 'gülümseyerek',
					text: 'Her zaman köyümüzü korumak için hazırım.' 
				}
			]
		},
		quest13: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'duygusal bir sesle', 
					text: '${getMainName()}, köyümüzün kutsal olan ulu kurtları, bataklıktaki kötülük tarafından tutsak alındı. Onları kurtarmak için zaman kaybetmemelisin. Bu kurtlar, bizim için kutsaldır. Oğuz Kağan\'ın yolunu aydınlatan Bozkurt\'u hatırlıyor musun?' 
				},
				{ 
					owner: 'main', 
					expression: 'saygıyla',
					text: 'Evet, hatırlıyorum. O kurt Oğuz Kağan\'ın önünde yürüdü ve ona yol gösterdi.' 
				}
				,{ 
					owner: 'owner', 
					expression: 'eski bir hikayeyi hatırlatarak', 
					text: 'Tan ağarınca Oğuz Kağan\'ın çadırına güneş gibi bir ışık girdi. O ışıktan gök tüylü ve gök yeleli büyük bir erkek kurt çıktı. Bu kurt Oğuz Kağan\'a, "Ey Oğuz, sen Urum üstüne yürümek istiyorsun; ben senin önünde yürümek istiyorum." dedi. Ve ordu, bu büyük kurtun ardı sıra yürüdü.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla',
					text: 'Ulu kurtları kurtaracağım, Temir Han. Onlar da bizim öncümüz olacak!' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'En son görülen izler, kurtların kafeslenip bataklığa doğru götürüldüklerini işaret ediyor.' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'minnettar ve takdir dolu bir sesle', 
					text: '${getMainName()}, ne kadar cesur ve güçlü bir savaşçı olduğunu bir kez daha kanıtladın. Bataklığı temizlediğin için sana minnettarım.' 
				},
				{ 
					owner: 'main', 
					expression: 'gülümseyerek',
					text: 'Her zaman köyümüzü korumak için hazırım.' 
				}
			]
		},
		quest14: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'ciddi ve uyarıcı', 
					text: '${getMainName()}, Bataklıkta yaşayan yaban arılarının kanatlarına, iğnelerine ve özellikle zehirlerine ihtiyacım var. Bu malzemelerle çok güçlü, zehirli oklar yapabileceğim. Ancak unutma, yaban arıları son derece tehlikelidir. Zehirleri öldürücü olabilir. Onları toplarken dikkatli olmalısın.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlı',
					text: 'Merak etme, Temir Han. yaban arılarının tehlikesini göz önünde bulundurarak, gereken tüm malzemeleri getireceğim.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Genelde sürü halinde saldırırlar. O yüzden çok dikkat etmelisin.' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'minnettar', 
					text: 'Harika bir iş çıkardın, ${getMainName()}! Yaban arılarının kanatları, iğneleri ve zehirleri tam olarak ihtiyacım olan malzemeler. Bu oklar köyümüzü korumada çok işe yarayacak. Sana minnettarım.' 
				},
				{ 
					owner: 'main', 
					expression: 'mütevazı',
					text: 'Görevimi yerine getirmek benim için bir onurdu, Temir Han.' 
				}
			]
		},
		quest15: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'endişeli ve kararlı',
					text: '${getMainName()}, ormanın derinliklerinde Malvera ve Noctara isimli iki lanetli şaman kardeş yaşıyor. Onlar bir zamanlar doğa ruhlarla konuşabilen güçlü şamanlardı. Ancak hırsları onları yoldan çıkardı. Ulu Kartal\'ın ruhuyla ölümsüzlük sırrını öğrenmeye çalıştılar, ama bu girişimleri onları lanetli varlıklara dönüştürdü. Şimdi karanlık ritüellerle ormanı ele geçirmeye çalışıyorlar. Onları durdurmalısın!' 
				},
				{ 
					owner: 'main', 
					expression: 'şaşırmış bir sesle',
					text: 'Bu nasıl olabilir!' 
				},
				{ 
					owner: 'owner', 
					expression: 'açıklayıcı bir şekilde',
					text: 'Ruhlar, Malvera ve Noctara\'yı doğanın dengesini bozdukları için lanetlediler. Ölümsüzlük arayışları, onları sonsuz bir acıya mahkum etti. Artık bedensel olarak ölmeseler de ruhları sonsuz bir açlık ve karanlıkla doldu. Geceleri, doğa ruhlarını kendilerine bağlamak yerine, onları sömürüp güç kazanan varlıklara dönüştüler. İnsanları ve ruhları tüketen bu kardeşler, zamanla "Lanetli Şamanlar" olarak anılmaya başlandı.' 
				},
				{ 
					owner: 'main', 
					expression: 'kendinden emin',
					text: 'Bu işin peşine düşeceğim, Deli Dumrul. Kötülüklerini sonlandıracağım.' 
				},
				{ 
					owner: 'owner', 
					expression: 'minnettar ve umut dolu bir sesle',
					text: 'Sana minnettarım, ${getMainName()}. Bu köy senin cesaretin sayesinde güvende kalacak.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Bu biraz tehlikeli bir görev. Gerçekten hazır olduğuna emin misin?' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'minnettar ve rahatlamış', 
					text: 'Köyümüzü bu lanetten kurtardığın için sana minnettarım, ${getMainName()}. Senin cesaretin ve gücün olmasaydı, bizler bu karanlıkla başa çıkamazdık. Orman ve köy senin sayende tekrar huzur bulacak.' 
				},
				{ 
					owner: 'main', 
					expression: 'cesurca',
					text: 'Tüm bunlar, şan, şöhret veya para için değil sadece dostlar için...' 
				},
				{ 
					owner: 'owner', 
					expression: 'takdir dolu bir sesle', 
					text: 'Tengri seni korusun...' 
				}
			]
		},
		quest16: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'ciddi ve endişeli bir sesle',
					text: '${getMainName()}, geçtiğimiz günlerde bir Kobolt yavrusu köye yakın bir bölgede farkedilmiş. Volkanik bölgeden buraya geldikleri tahmin ediliyor. Erken müdehale etmez isek büyüdüklerinde durdurulamaz olabilirler. O bölgeye gidip, onlara ait yumurtaları bulup yok etmelisin.' 
				},
				{ 
					owner: 'main', 
					expression: 'kararlılıkla',
					text: 'Anladım Deli Dumrul, onları yok edeceğim ve köyümüzü bu tehlikeden koruyacağım.' 
				}
			],
			progress: [
				{ owner: 'owner', text: 'Volkanik bölgeye ulaşmak için, mezarlığın kuzeyine doğru yönelmelisin.' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'minnettar bir şekilde', 
					text: '${getMainName()}, senin sayende köyümüz bir tehlikeden daha kurtuldu. Sana ne kadar minnettar olduğumu anlatamam. Sen gerçek bir kahramansın.' 
				},
				{ 
					owner: 'main', 
					expression: 'gülümseyerek',
					text: 'Bu köyü korumak için her zaman hazırım.' 
				}
			]
		},
		quest17: {
			begin: [
				{ 
					owner: 'owner', 
					expression: 'etrafa endişeli gözlerle bakarak',
					text: '${getMainName()}, hepimizi ilgilendiren çok önemli bir konu var. İçerde oturup konuşmamız gerekiyor.' 
				},
				{ 
					concept: {
					},
					owner: '...',
					text: 'Köyün en önemli savaşçıları ve liderleri bu toplantıya çağrılmıştır: Vargas, Temir Han ve alpler, tüm olanlardan haberdar edilip Dede Korkut’un çadırında toplanmışlardı...'
				},
				{ 
					concept: {
						bg: 'cs2-1',
						images: [
							{ key: 'cs2-c1', class: 'druid', height: 50, width: 25, coords: { left: 15, top: 30 }},
							{ key: 'cs2-c2', class: 'wizard', height: 50, width: 25, coords: { left: 40, top: 20 }},
							{ key: 'cs2-c3', class: 'blacksmith', height: 50, width: 25, coords: { left: 65, top: 30 }}
						]
					},
					owner: 'wizard',
					text: 'Hoş geldiniz, Temir Han, ve cesur kahramanımız... Zor bir görevle karşı karşıya olduğunuzu biliyorum. It-Barak\'larla ilgili önemli bir mesele var. Bu yaratıklar, bir zamanlar insanlar tarafından köpek olarak bilinen varlıklardı. Ancak karanlık bir büyü sonucu, bu köpekler vahşi yaratıklara, yani It-Baraklara dönüştüler.' 
				},
				{
					owner: 'druid',
					text: 'Tulga, kahramanımız eşliğinde köye güvenli bir şekilde geri döndüğü gün, buna benzer şeyler sayıklıyordu. Belki o gece ormanda çok kötü şeyler görmüş olabilir.'
				},
				{
					owner: 'blacksmith',
					text: 'It-Baraklar mı? Bu isim bana tanıdık geliyor, ama bu yaratıklar hakkında bu kadar karanlık bir gerçek olduğunu bilmiyordum.'
				},
				{
					owner: 'wizard',
					text: 'Evet, Temir Han. It-Baraklar, güçlü bir şaman tarafından lanetlendiler. Bu lanet, onları sadece fiziksel olarak değil, ruhsal olarak da karanlığa sürükledi. Artık onlar, karanlık güçlerin hizmetkârları ve her birisi tehlikeli bir düşman.'
				},
				{
					owner: 'main',
					text: 'Lestat... Demek ki Lestat da bu It-Baraklardan biri! Onun köyümüze yaklaştığını biliyorduk ama bu kadar tehlikeli olduğunu bilmiyorduk. Onu durdurmalıyız!'
				},
				{
					owner: 'druid',
					text: 'Lestat, sıradan bir It-Barak değil. O, diğerlerini yöneten ve köyümüze sinsice yaklaşan tehlikeli bir lider. Eğer onu durdurmazsanız, köyümüz için büyük bir yıkım getirebilir. Onunla savaşmak cesaret ister ama başarabilirseniz, köyümüzü bu karanlık güçten kurtarabilirsiniz.'
				},
				{
					owner: 'blacksmith',
					text: 'Bu görevin, yalnızca senin gibi bir kahraman üstesinden gelebilir. Lestat\'ı yenip bu karanlık tehdidi yok etmeliyiz. Biz senin yanında olacağız.'
				},
				{
					owner: 'main',
					text: 'Bu köyü korumak için ne gerekiyorsa yapacağım. Lestat\'ın sonu gelecek ve It-Baraklar da bu diyardan temizlenecek. Hazırım, Dede Korkut, Temir Han, desteğiniz için minnettarım.'
				},
				{ 
					owner: 'wizard',
					text: 'Tengri hepimizi kutsasın.' 
				}
			],
			progress: [ 
				{ owner: 'owner', text: 'Yapabilirsin, sana inanıyorum' }
			],
			end: [
				{ 
					owner: 'owner', 
					expression: 'minnettar bir şekilde', 
					text: 'Şimdilik bu kadar. Köyümüz senin sayende artık güvende.' 
				},
				{ 
					owner: 'main', 
					expression: 'tatmin olmuş bir ifadeyle',
					text: 'O zaman ben biraz dinleneyim. Eğer bana ihtiyacınız olursa severek yardım ederim.' 
				}
			]
		},
	}
};