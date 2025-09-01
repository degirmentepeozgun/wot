const _globalQuests = [
	{ 
		id: 1, key: 'kill-enemy', names: { 
			tr: '100 düşman öldür (PVE)', 
			en: 'Kill 100 enemies (PVE)'
		},
		limit: 100,
		use: function() {
			warnChestReward(getChestReward(1));
		}
	},
	{
		id: 2, key: 'loot-item', names: { 
			tr: '100 ekipman topla (PVE)', 
			en: 'Find 100 equipments (PVE)'
		},
		limit: 100,
		use: function() {
			warnChestReward(getChestReward(1));
		}
	},
	{
		id: 3, key: 'gain-gold', names: { 
			tr: '10000 altın topla (PVE)', 
			en: 'Gain 10000 golds (PVE)'
		},
		limit: 10000,
		use: function() {
			warnChestReward(getChestReward(1));
		}
	},
	{
		id: 4, key: 'update-item', names: { 
			tr: '25 ekipman yükseltme yap', 
			en: 'Update items 25 times'
		},
		limit: 25,
		use: function() {
			warnChestReward(getChestReward(1));
		}
	},
	{
		id: 5, key: 'level-up', names: { 
			tr: 'Bir karakterini 10. seviyeye yükselt', 
			en: 'Level up a character until 10'
		},
		limit: 9,
		use: function() {
			warnChestReward(getChestReward(1));
		}
	},
	{
		id: 6, key: 'pvp-win', names: { 
			tr: '25 düello maçı kazan', 
			en: 'Win 25 duel match'
		},
		limit: 25,
		reward: { key: 'honor', value: 25 },
		use: function() {
			warnHonorReward(this.reward.value);
		}
	},
	{
		id: 7, key: 'pvp-league-silver', names: { 
			tr: 'Düelloda gümüş lige yüksel', 
			en: 'Rank up to silver league in duel'
		},
		limit: 1,
		reward: { key: 'honor', value: 500 },
		use: function() {
			warnHonorReward(this.reward.value);
		}
	},
	{ 
		id: 11, key: 'kill-enemy', names: { 
			tr: '1000 düşman öldür (PVE)', 
			en: 'Kill 1000 enemies (PVE)'
		},
		limit: 1000,
		use: function() {
			warnChestReward(getChestReward(2));
		}
	},
	{
		id: 12, key: 'loot-item', names: { 
			tr: '1000 ekipman topla (PVE)', 
			en: 'Find 1000 equipments (PVE)'
		},
		limit: 1000,
		use: function() {
			warnChestReward(getChestReward(2));
		}
	},
	{
		id: 13, key: 'gain-gold', names: { 
			tr: '100000 altın topla (PVE)', 
			en: 'Gain 100000 golds (PVE)'
		},
		limit: 100000,
		use: function() {
			warnChestReward(getChestReward(2));
		}
	},
	{
		id: 14, key: 'update-item', names: { 
			tr: '50 ekipman yükseltme yap', 
			en: 'Update items 50 times'
		},
		limit: 50,
		use: function() {
			warnChestReward(getChestReward(2));
		}
	},
	{
		id: 15, key: 'level-up', names: { 
			tr: 'Bir karakterini 20. seviyeye yükselt', 
			en: 'Level up a character until 20'
		},
		limit: 19,
		use: function() {
			warnChestReward(getChestReward(2));
		}
	},
	{
		id: 16, key: 'pvp-win', names: { 
			tr: '50 düello maçı kazan', 
			en: 'Win 50 duel match'
		},
		limit: 50,
		reward: { key: 'honor', value: 50 },
		use: function() {
			warnHonorReward(this.reward.value);
		}
	},
	{
		id: 17, key: 'pvp-league-gold', names: { 
			tr: 'Düelloda altın lige yüksel', 
			en: 'Rank up to gold league in duel'
		},
		limit: 1,
		reward: { key: 'honor', value: 1000 },
		use: function() {
			warnHonorReward(this.reward.value);
		}
	},
	{
		id: 18, key: 'complete-act', names: { 
			tr: '10 bölüm bitir', 
			en: 'Complete 10 missions'
		},
		limit:10,
		when: function(_current) {
			return __account.storyResults?.length > _current ? 1 : 0;
		},
		reward: { key: 'ticket-random', value: 10, type: 'misc' },
		use: function() {
			warnChestReward(getChestReward(this.reward.grade ?? 1, 'misc', this.reward.key, this.reward.value));
		}
	},
	{
		id: 19, key: 'complete-act-perfect', names: { 
			tr: '10 bölümü 3 yıldızla bitir', 
			en: 'Perfectly finish 10 missions'
		},
		limit:10,
		when: function(_current) {
			return __account.storyResults?.filter(x => x.perfect)?.length > _current ? 1 : 0;
		},
		reward: { key: 'ticket-item-selection', value: 10, grade: 3, type: 'misc' },
		use: function() {
			warnChestReward(getChestReward(this.reward.grade ?? 1, 'misc', this.reward.key, this.reward.value));
		}
	},
	{
		id: 20, key: 'melt-gem', names: { 
			tr: '10 ziynet erit', 
			en: 'Melt 10 gems'
		},
		limit:10,
		reward: { key: 'ticket', value: 100 },
		use: function() {
			warnChestReward(getChestReward(1, this.reward.key, null, this.reward.value));
		}
	},
	{
		id: 21, key: 'summon-character', names: { 
			tr: 'Bir karakter çağır', 
			en: 'Summon a character'
		},
		limit:1,
		reward: { type: 'fragment', key: 'random' },
		use: function() {
			for(let i = 0; i < __fragments.length; i++)
				warnChestReward(getChestReward(1, 'fragment', __fragments[i], 20));
		}
	}
];
function warnHonorReward(_val) {
	__account.pvp.honor += _val;
	_client.saveState();
	const _h = document.getElementById('main-honor-count');
	if(_h)
		_h.innerText = __account.pvp.honor.formatWithDots();
    episode.playSound({key: 'chestreward', volume: .3, reset: true });
    warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/honor.png" />&nbsp;' + _val + 'x&nbsp;<span style="flex:1">' + getLangData('Honor Point') + '</span></div>', null, null, 1);
}
function syncGlobalQuests() {
	let _sync;
	for(let _gQ of _globalQuests) {
		if(!__account.globalQuests.find(x => x.id === _gQ.id)) {
			_sync = 1;
			__account.globalQuests.push({id:_gQ.id, current: 0});
		}
	}
	if(_sync)
		_client.saveState();
}
function installGlobalQuests() {
	let _arr = [];
	for(let gq of _globalQuests)
		_arr.push({id: gq.id, current: 0});
	return _arr;
}
function firstQuestData() {
	return {
		dialogOrder: null,
		isStaticDialog: null,
		dialogArr: null,
		order: 1,
		side: { }
	};
}

function updateGlobalQuest(_key, _val) {
	syncGlobalQuests();
	var _gQuestIds = _globalQuests.filter(x => x.key === _key);
	let _updated, _finished;
	for(let _quest of _gQuestIds) {
		const _gQ = __account.globalQuests.find(x => x.id === _quest.id && 
			x.current < _quest.limit);
		if(!_gQ)
			continue;
		if(_gQ.current < _quest.limit) {
			_gQ.current += _quest.when ? (_quest.when(_gQ.current) ? (_val ?? 1) : 0) : (_val ?? 1);
			_updated = 1;
			if(_gQ.current > _quest.limit)
				_gQ.current = _quest.limit;
			if(_gQ.current === _quest.limit)
				_finished = 1;
		}
	}
	if(_updated)
		_client.saveState();
	if(_finished)
		warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/quest.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('Achievement Completed') + '</span></div>');
}

function renderMainQuests() {
	updateMenuBottom(2);
	const _container = selectMenuContainer();
	const _quest = __story.quests.find(x => x.id === __account.questStatus.order);
	let _html = '<div class="menu-ui-left fade-me">' +
					'<div class="menu-modal-left menu-modal-left-content">' +
						'<div class="stories-content-left skills-content-left menu-modal-left-container">' +
							'<div style="padding:1% 5%;overflow-y:auto" class="full">';
	const _total = __story.quests.length;
	for(let _i = _quest.id; _i >= 1; _i--) {
		const _q = __story.quests.find(x => x.id === _i);
		_html += 
		`<div id="main-quest-${_i}" class="global-quest-item skill-card animate-me main-quest-item flex${_i === _quest.id ? ' current selected' : ''}" onexactclick="openMainQuestDescription(${_q.id})">
			<div class="global-quest-item-left flex flex-jc-start">
				${getLangData(_q.names[getLang()])}	
				<div class="global-quest-item-status">(${_i} / ${_total})</div>		
			</div>
		</div>`;
	}
	_container.innerHTML = _html + 
		'</div></div></div></div>' +
		'<div class="menu-ui-right fade-me">' + 
			'<div class="menu-modal-right menu-modal-right-content">' +
				'<div class="stories-content-right skills-content-right">' +
					'<div class="quests-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">' +
						getMainQuestDescription(_quest.id) + 
						'</div>' +
			'</div>' +
		'</div>' +
	'</div>';
}
function getMainQuestDescription(_id) {
	const _quest = __story.quests.find(x => x.id === _id);
	const _current = __account.questStatus.quest;
	const _backDisplay = _quest.owner?.toLowerCase() !== 'system' && __account.questStatus.state === 'end' && episode.id !== 1;
	let _rewards = '<div class="w-100 flex flex-jc-start">';
	if(!_quest.gain?.[0])
		_rewards = '<div class="w-100 quest-description-text flex flex-jc-start">-</div>';
	else
		for(let _g of _quest.gain) 
			_rewards += `<div class="w-50 quest-description-text quest-reward-info-item flex flex-jc-start"><div class="flex">
				<img style="height:5vh" src="./images/icons/${_g.key}.png" />&nbsp;${_g.value.formatWithDots()}</div></div>`;
	_rewards += '</div>';
	let _locations = '';
	for(let _m of _quest.maps) {
		const _locDisplay =  __account.questStatus.quest.id === _id && __account.questStatus.state === 'progress' && episode.id !== _m;
		const _map = mapSprites.find(x => x.id === _m);
		_locations += `<div class="quest-description-text flex flex-jc-start">${getLangData(_map.coords.title)}${_map.coords.dir ? ' (' + getLangData(_map.coords.dir) + ')' : ''}` + (_locDisplay ? `<div id='quest-area-nav-btn' onexactclick='portTo(${_m})' class='game-menu-button d-none'>${getLangData('Go')}</div>` : '') + `</div>`;
	}
	let _conversation = '<div class="quest-description-text flex flex-jc-start">'+ getLangData('No conversation') + '</div>';
	const _dialog = __dialogs[getLang()]['quest' + _quest.id]?.begin ?? [];
	if(_dialog?.[0])
		_conversation = '';
	for(let _d of _dialog)
		_conversation += `<div class="quest-description-text flex flex-jc-start"><span class="quest-conversation-item-title">${_d.owner === "main" ? getLangData('You') : _conceptArts[_d.owner === 'owner' ? _quest.owner : _d.owner].title}:</span>&nbsp;${replaceDialogText(_d.text)}</div>`;
	let _needs = '';
	const _loots = _quest.loots ?? [];
	for(let _l of _loots)
		_needs += `<div class="quest-description-text flex flex-jc-start quest-need-item"><img onerror='this.parentNode.remove(); document.querySelector(".quest-needs").remove()' src='./images/quest-item/icons/${_l.key}.png' style='height:5vh' />&nbsp;${_current.loots.find(x => x.key === _l.key)?.count ?? 0}/${_l.limit}</div>`;

	return `<div class="quest-desc-container">
		<div class="w-100 quest-desc-container-title flex flex-jc-start">${getLangData(__story.title[getLang()])} - ${_quest.names[getLang()]}</div>
		<div class="w-100 flex">
		<div class="w-50 flex flex-jc-start quest-description-title">${getLangData('Quest Owner')}</div>
		<div class="w-50 flex flex-jc-end quest-description-text">${_conceptArts[_quest.owner]?.title ?? getLangData('System')}` + (_backDisplay ? `<div id='quest-area-nav-btn' onexactclick='portTo(1)' class='d-none game-menu-button'>${getLangData('Go')}</div>` : '') + `</div>` +
		`</div>
		<div class="w-100 flex"><div class="w-50 flex flex-jc-start quest-description-title">${getLangData('Location')}</div>`
		+ '<div class="w-50 flex flex-jc-end">'	+ _locations + '</div></div>' +
		`<div class="w-100 flex"><div class="w-50 flex flex-jc-start quest-description-title">${getLangData('Min Level')}</div>
		<div class="w-50 flex flex-jc-end quest-description-text">${_quest.minLevel}</div></div>
		<div class="w-100 flex"><div class="w-50 flex flex-jc-start quest-description-title">${getLangData('Quest Status')}</div>
		<div class="w-50 flex flex-jc-end quest-description-text">${getQuestStatus(_id)}</div></div>
		<div class="quest-desc-title w-100">${getLangData('Finish Rewards')}</div>`
			+ _rewards +
		(_needs === '' ? '' :`<div class="quest-desc-title w-100 quest-needs">${getLangData('Quest Needs')}</div>`
			+ _needs) +
		`<div class="quest-conversation-title quest-desc-title w-100">${getLangData('Conversation')}</div>` + _conversation +
		(_quest.video ? 
			`<div onexactclick="requestVideo(${_quest.video}, 1)" class="quest-description-title">${getLangData('Watch Video')}</div>` : '') +
		`</div></div>`;
}
function getQuestStatus(_id) {
	const _quest = _npcQuests.find(x => x.id === _id);
	if(_quest.id < __account.questStatus.order)
		return getLangData('Reward received');
	else if(__account.questStatus.state === 'progress')
		return getLangData('In progress');
	else if(__account.questStatus.state === 'end')
		return getLangData('Finished');
	return getLangData('Not started yet');
}
function openMainQuestDescription(_id) {
	document.querySelectorAll('.main-quest-item').forEach(x => removeClass(x, 'selected'));
	addClass(document.querySelector('#main-quest-' + _id), 'selected');
	document.querySelector('.quest-desc-container').parentNode.innerHTML = getMainQuestDescription(_id);
}
function switchQuestTab(_elem, _order) {
    if(!_elem)
        _elem = document.querySelector('.quest-tab.selected');
    else if(hasClass(_elem, 'selected'))
        return;
    else
        episode.playSound({ key: 'switch' });
    const _tabs = document.querySelectorAll('.quest-tab');
    for(let _tab of _tabs){
        removeClass(_tab, 'selected');
        if(_tab === _elem)
            addClass(_tab, 'selected');
    }
    const _slots = document.getElementById('global-quests');
    switch(_order) {
        case 1:
            _slots.innerHTML = renderMainQuests();
            break;
        case 2:
            _slots.innerHTML = renderGlobalQuests();
            break;
    }
}
function renderGlobalQuestList() {
	updateMenuBottom(2);
		const _container = selectMenuContainer();
		_container.innerHTML = 
					'<div class="menu-ui-left fade-me">' +
						'<div class="menu-modal-left menu-modal-left-content">' +
							'<div class="skills-content-left menu-modal-left-container">' +
								'<div style="padding:1% 5%;overflow-y:auto" class="full">' +
									renderGlobalQuests() +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="menu-ui-right fade-me">' + 
						'<div class="menu-modal-right menu-modal-right-content">' +
							'<div class="skills-content-right">' +
								'<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">' +
									renderEvent() +
								'<div id="shine"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
}
function getEventReward(_index) {
	const _chests = document.querySelectorAll('.event-gifts img');
	const _chest = _chests[_index];
	if(_chest) {
		const _order = parseInt(_chest.getAttribute('data-event-id'));
		if(_order > 1 && !__account.eventsDone.find(x => x === (_order - 1)))
		{
			warn('<span>' + getLangData('Get previos reward first') + '</span>', 'warn');
			return;
		}
		if(!hasClass(_chest, 'glow-yellow'))
			return;
		removeClass(_chest, 'glow-yellow');
		addClass(_chest, 'gray');
		__account.eventsDone.push(_order);
		const _gold = (_index + 1) * 10000;
		updateGold(_gold);
		warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/coin.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + _gold.formatWithDots() + '</span></div>', null, null, 1);
		_client.saveState();
		checkUpdateAvailable2(3);
	}
}
function renderEvent() {
	let _before = 0;
	if(__account.eventsDone.indexOf(4) !== -1)
		_before = 60 * 1000 * 60;
	else if(__account.eventsDone.indexOf(3) !== -1)
		_before = 60 * 1000 * 45;
	else if(__account.eventsDone.indexOf(2) !== -1)
		_before = 60 * 1000 * 30;
	else if(__account.eventsDone.indexOf(1) !== -1)
		_before = 60 * 1000 * 15;
	const _diff = Date.now() - (__account.onlineStart - _before);
	return `<div class="full flex event-container">
		<div class="event-item w-100 flex flex-jc-start${_diff > (15 * 60 * 1000) ? ' completed' : ''}" style="height:15%">
			<img src="./images/ui/star-on.png" /> Stay online for 15 minutes
		</div>	
		<div class="event-item w-100 flex flex-jc-start${_diff > (30 * 60 * 1000) ? ' completed' : ''}" style="height:15%">
			<img src="./images/ui/star-on.png" /> Stay online for 30 minutes
		</div>	
		<div class="event-item w-100 flex flex-jc-start${_diff > (45 * 60 * 1000) ? ' completed' : ''}" style="height:15%">
			<img src="./images/ui/star-on.png" /> Stay online for 45 minutes
		</div>
		<div class="event-item w-100 flex flex-jc-start${_diff > (60 * 60 * 1000) ? ' completed' : ''}" style="height:15%">
			<img src="./images/ui/star-on.png" /> Stay online for 60 minutes
		</div>
		<div class="w-100 flex flex-ai-end event-gifts" style="height:20%">
			<div style="width:18%" class="flex flex-jc-start">
				<img${__account.eventsDone.indexOf(1) === -1 ? (_diff > (15 * 60 * 1000) ? ' class="glow-yellow"' : '') : ' class="gray'} data-event-id="1" onexactclick="getEventReward(0)" src="./images/icons/reward${_diff > (15 * 60 * 1000) ? '2' : '1'}.png" style="height:5vh" />
			</div>
			<div style="width:32%" class="flex">
				<img${__account.eventsDone.indexOf(2) === -1 ? (_diff > (30 * 60 * 1000) ? ' class="glow-yellow"' : '') : ' class="gray'} data-event-id="2" onexactclick="getEventReward(1)" src="./images/icons/reward${_diff > (30 * 60 * 1000) ? '2' : '1'}.png" style="height:5vh" />
			</div>
			<div style="width:32%" class="flex">
				<img${__account.eventsDone.indexOf(3) === -1 ? (_diff > (45 * 60 * 1000) ? ' class="glow-yellow"' : '') : ' class="gray'} data-event-id="3" onexactclick="getEventReward(2)" src="./images/icons/reward${_diff > (45 * 60 * 1000) ? '2' : '1'}.png" style="height:5vh" />
			</div>
			<div style="width:18%" class="flex flex-jc-end">
				<img${__account.eventsDone.indexOf(4) === -1 ? (_diff > (60 * 60 * 1000) ? ' class="glow-yellow"' : '') : ' class="gray'} data-event-id="4" onexactclick="getEventReward(3)" src="./images/icons/reward${_diff > (60 * 60 * 1000) ? '2' : '1'}.png" style="height:5vh" />
			</div>
		</div>
		<div class="event-path w-100 flex">
			<div class="w-100 flex" style="padding:0 2vh">
				<img${_diff > (30 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (30 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (30 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (45 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (45 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (45 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (60 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (60 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
				<img${_diff > (60 * 60 * 1000) ? '' : ' class="gray"'} src="./images/ui/shine.png" style="width:11.1%" />
			</div>
			<div class="w-100 flex event-dots">
				<img src="./images/ui/star-${_diff > (15 * 60 * 1000) ? 'on' : 'off'}.png" />
				<img src="./images/ui/star-${_diff > (30 * 60 * 1000) ? 'on' : 'off'}.png" />
				<img src="./images/ui/star-${_diff > (45 * 60 * 1000) ? 'on' : 'off'}.png" />
				<img src="./images/ui/star-${_diff > (60 * 60 * 1000) ? 'on' : 'off'}.png" />
			</div>
		</div>
	</div>`;
}
function renderGlobalQuests() {
	let _html = '';
	for(let _q of _globalQuests) 
		_html += renderGlobalQuest(_q);
	return _html;
}
function renderGlobalQuest(_q) {
	syncGlobalQuests();
	const _gQ = __account.globalQuests.find(x => x.id === _q.id);
	if(_gQ.current === undefined)
		_gQ.current = 0;
	return `<div data-global-quest="${_q.id}" class="skill-card animate-me flex" onexactclick="collectGlobalQuestReward(${_q.id})">
			<div class="global-quest-item-left flex flex-jc-start">
				${replaceQuestTitle(getLangData(_q.names[getLang()]))}	
				<div class="global-quest-item-status">(${_gQ.current.formatWithDots()} / ${_q.limit.formatWithDots()})</div>		
			</div>
			<div class="global-quest-item-right flex">
				<img class="${_gQ.current < _q.limit ? 'gray' : 'glow'}" src="${getRewardIcon(1,_q.reward?.type ?? _q.reward?.key ?? 'chest',_q.reward?.key).src}" />
				<div class="full global-quest-item-reward-value flex${_q.reward?.value ? '' : ' d-none'}">
					${_q.reward?.value ?? ''}
				</div>
			</div>
			<div class="global-quest-rewarded flex w-100${_gQ.rewarded ? '' : ' d-none'}">
				<div class="flex">
					${getLangData('Taken')}
				</div>
			</div>
		</div>`;
}
function checkIfGlobalQuestDone() {
	for(let _q of __account.globalQuests) {
		var _quest = _globalQuests.find(x => x.id === _q.id);
		if(_quest.limit <= _q.current && !_q.rewarded)
			return true;
	}
	return false;
}
function collectGlobalQuestReward(_id) {
	var _current = __account.globalQuests.find(x => x.id === _id);
	if(_current.rewarded)
		return;
	var _quest = _globalQuests.find(x => x.id === _id);
	if(_quest.limit > _current.current)
		return;
	else if(_current.rewarded)
		return;
	_quest.use();
	_current.rewarded = 1;
	_client.saveState();
	const gcitem = document.querySelector('.skill-card[data-global-quest="' + _id + '"]');
	const _div = document.createElement('div');
	_div.innerHTML = renderGlobalQuest(_globalQuests.find(x => x.id === _id));
	gcitem.replaceWith(_div.firstChild);
	//switchQuestTab(null, 2);
	checkUpdateAvailable2(3);
}

function replaceQuestTitle(_title) {
	return _title.replace(/\d{3,}/g, function (_match) {
		return parseInt(_match).formatWithDots();
	});
}