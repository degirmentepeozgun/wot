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
		limit: 10,
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
			tr: '10000 altın topla (PVE)', 
			en: 'Gain 10000 golds (PVE)'
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
		limit: 20,
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
	}
];
function warnHonorReward(_val) {
    PlaySound({key: 'chestreward', volume: .3, reset: true });
    warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/honor.png" />&nbsp;' + _val + 'x&nbsp;<span style="flex:1">' + getLangData('Honor Point') + '</span></div>', 'level-up', null, 1);
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
	var _gQuestIds = _globalQuests.filter(x => x.key === _key);
	let _updated, _finished;
	for(let _quest of _gQuestIds) {
		const _gQ = __account.globalQuests.find(x => x.id === _quest.id && 
			x.current < _quest.limit);
		if(!_gQ)
			continue;
		if(_gQ.current < _quest.limit) {
			_gQ.current += (_val ?? 1);
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
		warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/quest.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('Achievement Completed') + '</span></div>', 'level-up');
}
function renderQuests(_tab) {
	const _hasUpdate = checkIfGlobalQuestDone();
	let _html = `<div id="quest-log" class="book-page-wrapper">
		<div style="width:100%;height:6vh;background:#5d5a49;padding:1vh;border-top-right-radius:1.6vh;border-top-left-radius:1.6vh" class="flex flex-jc-start">
		<div onclick="switchQuestTab(this, 1)" class="flex animate-me quest-tab selected" style="width:33%;height:100%">${getLangData('Quest Log')}</div>
		<div id="events-tab" onclick="switchQuestTab(this, 2)" class="flex animate-me quest-tab" style="width:33%;height:100%;border-left: .55vh solid">${getLangData('Event')}`
			+ (_hasUpdate ? '<div class="update-badge"></div>' : '') +
		`</div>
	</div>
	<div id="global-quests" class="book-page-bg flex">` +
	renderMainQuests() + '</div></div>';
	document.getElementById('book-content-6').innerHTML =  _html;
}
function renderMainQuests() {
	const _quest = _npcQuests.find(x => x.id === __account.questStatus.order);
	let _html = '<div id="main-quests" style="width:50%;height:100%;overflow-y:auto">';
	const _total = _npcQuests.length;
	for(let _i = _quest.id; _i >= 1; _i--) {
		const _q = _npcQuests.find(x => x.id === _i);
		_html += 
		`<div id="main-quest-${_i}" class="global-quest-item main-quest-item flex${_i === _quest.id ? ' current selected' : ''}" onclick="openMainQuestDescription(${_q.id})">
			<div class="global-quest-item-left flex flex-jc-start">
				${getLangData(_q.names[getLang()])}	
				<div class="global-quest-item-status">(${_i} / ${_total})</div>		
			</div>
		</div>`;
	}
	return _html + '</div><div id="main-quest-description" style="width:50%;height:100%;overflow-y:auto">' + getMainQuestDescription(_quest.id) + '</div>';
}
function getMainQuestDescription(_id) {
	const _quest = _npcQuests.find(x => x.id === _id);
	let _rewards = '';
	for(let _g of _quest.gain) 
		_rewards += `<div class="quest-description-text flex flex-jc-start">${_g.value.formatWithDots()}&nbsp;x&nbsp;
			<img style="height:5vh" src="./images/icons/${_g.key}.png" /></div>`;
	let _locations = '';
	for(let _m of _quest.maps) {
		const _map = mapSprites.find(x => x.id === _m);
		_locations += `<div onclick="selectMapArea(${_m}, document.getElementById('quest-log'))" class="quest-description-text flex flex-jc-start">${getLangData(_map.coords.title)}${_map.coords.dir ? ' (' + getLangData(_map.coords.dir) + ')' : ''}</div>`;
	}
	let _conversation = '';
	const _dialog = __dialogs[getLang()]['quest' + _quest.id].begin;
	for(let _d of _dialog)
		_conversation += `<div class="quest-description-text flex flex-jc-start"><span style="color:#f7f7f7dd!important;font-weight:600">${_d.owner === "main" ? getLangData('You') : _conceptArts[_quest.owner].title}:</span>&nbsp;${replaceDialogText(_d.text)}</div>`;

	return `<div>
		<div class="quest-description-title">${getLangData('Quest Owner')}</div>
		<div class="quest-description-text">${_conceptArts[_quest.owner].title}</div>
		<div class="quest-description-title">${getLangData('Min Level Requirement')}</div>
		<div class="quest-description-text">${_quest.minLevel}</div>
		<div class="quest-description-title">${getLangData('Quest Status')}</div>
		<div class="quest-description-text">${getQuestStatus(_id)}</div>
		<div class="quest-description-title">${getLangData('Finish Rewards')}</div>`
			+ _rewards +
		`<div class="quest-description-title">${getLangData('Location')}</div>`
			+ _locations +
		`<div class="quest-description-title">${getLangData('Conversation')}</div>`
			+ _conversation +
		(_quest.video ? 
			`<div onclick="requestVideo(${_quest.video}, 1)" class="quest-description-title">${getLangData('Watch Video')}</div>` : '') +
		`</div>`;
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
	document.getElementById('main-quest-description').innerHTML = getMainQuestDescription(_id);
}
function switchQuestTab(_elem, _order) {
    if(!_elem)
        _elem = document.querySelector('.quest-tab.selected');
    else if(hasClass(_elem, 'selected'))
        return;
    else
        PlaySound({ key: 'switch' });
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
function renderGlobalQuests() {
	let _html = '';
	for(let _q of _globalQuests) {
		const _gQ = __account.globalQuests.find(x => x.id === _q.id);
		_html += 
		`<div class="global-quest-item flex" onclick="collectGlobalQuestReward(${_q.id})">
			<div class="global-quest-item-left flex flex-jc-start">
				${replaceQuestTitle(getLangData(_q.names[getLang()]))}	
				<div class="global-quest-item-status">(${_gQ.current.formatWithDots()} / ${_q.limit.formatWithDots()})</div>		
			</div>
			<div class="global-quest-item-right flex">
				<img class="${_gQ.current < _q.limit ? 'gray' : 'glow'}" src="./images/icons/${_q.reward?.key ?? 'chest'}.png" />
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
	return _html;
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
	var _quest = _globalQuests.find(x => x.id === _id);
	if(_quest.limit > _current.current)
		return;
	else if(_current.rewarded)
		return;
	_quest.use();
	_current.rewarded = 1;
	_client.saveState();
	//renderQuests(2);
	switchQuestTab(null, 2);
	checkUpdateAvailable();
}

function replaceQuestTitle(_title) {
	return _title.replace(/\d{3,}/g, function (_match) {
		return parseInt(_match).formatWithDots();
	});
}