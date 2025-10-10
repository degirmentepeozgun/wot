'use strict';
console.log('talent')
function talent() {
	this.key = 'talent';
	this.tutorial = {
		tr: {
			title: 'Pasif Beceriler',
			desc: 'Solda görmekte olduğunuz beceri ağacı üzerinde her 2 seviye atladığınızda bir kazandığınız beceri puanlarını kullanabilirsiniz. Her yaptığınız puanlama, puanladığınız daldan çıkan yol veya yolların ulaştığı becerileri aktif eder. Bazı beceriler defalarca puanlanabilir. Oyun stilinize göre kombine edip istediğinizde sıfırlayabilirsiniz.'
		},
		en: {
			title: 'Passive Talents',
			desc: 'You can use the skill points you earn every two levels you gain on the skill tree shown on the left. Each point you earn activates the skills accessed by the path(s) leading from that branch. Some skills can be scored multiple times. You can combine them to suit your play style and reset them whenever you like.'
		}
	};
	if(!tryShowMenuTutorial(this.key))
		this.tutorial = undefined;
	this.render = function(_noAnimation, _id) {
		updateMenuBottom(1);
		let _content = showMenuTutorial(this.tutorial, this.key);
		const _container = selectMenuContainer();
		const _char = __account.characters.find(x => x.class === mainCharacter.class);
		_container.innerHTML = 
		`<div data-module='talent' class="menu-ui-left${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-left menu-modal-left-content">
				<div class="skills-content-left talent-content-left menu-modal-left-container">
					<div class="w-100 flex talent-tree-top">
						<div class="w-50 flex flex-jc-start">
							<span style="color:#9d987f !important">${getLangData('Points Used')}:</span>&nbsp;&nbsp;<span id="talent-points-remaining">${_char.talents?.reduce((x, {count}) => x + count, 0) ?? 0}</span>&nbsp;/&nbsp;<span id="talent-points-all">${MathFloor(mainCharacter.level / 2)}</span>
						</div>
						<div class="w-50 flex flex-jc-end">
							 <div onexactclick="getRef(\'talent\').askReset()" class="game-menu-button btn-reset flex animate-me"s>${getLangData('RESET')}</div>
						</div>
					</div>
					<div class="w-100 flex flex-ai-start talent-tree-middle">`
						+ this.getTalents(_id) +
					`</div>
				</div>
			</div>
		</div>
		<div data-module='talent' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right menu-modal-right-content">
				<div class="skills-content-right talent-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">`
					+ _content +
					`</div>
				</div>
			</div>
		</div>`;
		if(_content === '')
			this.selectTalent(_id, null, _noAnimation);
	}
	this.getTalents = function() {
		let html = '', i = 0;
		const _talents = __account.characters.find(x => x.class === mainCharacter.class)?.talents;
		let _zIndex = 999;
		for (var _m of __passiveSkills) {
			const _limit = _m.props.length;
			const _level = _talents?.find(x => x.id === _m.id)?.count ?? 0;
			let _ok = !_m.parent?.[0] ? 1 : 0;
			if(!_ok)
				for(let _n of _m.parent)
					if(_talents?.find(x => x.id === _n)) {
						_ok=1;
						break;
					}
			let _nodes ='';
			for(let _p of _m.parent ?? []) {
				let _dir = '';
				let _parent = __passiveSkills.find(x => x.id === _p);
				const _parentLevel = _talents?.find(x => x.id === _parent.id)?.count ?? 0;
				if(_m.col === _parent.col)
					_dir ='up';
				else if(_m.col < _parent.col)
					_dir = 'right';
				else
					_dir = 'left';
				_nodes += `<div class="talent-tree-node talent-tree-node-${_dir}${_parentLevel > 0 ? ' active' : ''}"></div>`;
			}
			html += `<div data-key="${_m.id}" style="z-index:${_m.col === 2 ? (_zIndex - 2) : _zIndex}" onexactclick="getRef(\'talent\')?.selectTalent(${_m.id})" class="talent-card flex talent-card-col-${_m.col}${_level > 0 ? ' glow-yellow':''}${(!_ok && !_level) ? ' gray' : ''}">`
				+
				_nodes
				+
				`<img class="talent-icon-bg" src="./images/ui/quest.png" />
				<img class="talent-icon" src="./images/main/skill-icons/passives/${_m.id}.png" />
				<div class="talent-card-level${_level > 0 ? '' : ' d-none'}${_level >= _limit ? ' maxed' : ''}">${_level}</div>
			</div>`;
			i++;
			_zIndex--;
		}
		return html;
	}
	this.selectTalent = function(_id, _upgraded, _noAnimation) {
		if(!_id)
			_id = 1;
		else
   			PlaySound({ key: 'click' });
		if(!_id)
			return;
		const _cards = document.querySelectorAll('.talent-content-left .talent-card');
		_cards.forEach(x => removeClass(x, 'selected'));
		const _card = document.querySelector('.talent-content-left .talent-card[data-key="' + _id + '"]');
		if(_card) {
			addClass(_card, 'selected');
			this.openTalentDetail(_id, _noAnimation);
			if(_upgraded)
				shine(1000, document.querySelector('.talent-info'));
		}
	}
	this.openTalentDetail = function(_id, _noAnimation) {
		let _html = 
		`<div class="full flex item-info-container-parent talent-item-info-container-parent${_noAnimation ? '' : ' fade-me'}" style="padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
			<div class="full flex flex-ai-start item-info-container artifact-info talent-info">`;
		const _m = __passiveSkills.find(x => x.id === _id);
		const _talents = __account.characters.find(x => x.class === mainCharacter.class)?.talents;
		const _level = _talents?.find(x => x.id === _m.id)?.count ?? 0;
		const _maxed = _level === _m.props.length;
		//Başlık 
		//Icon
		//Seviye
		//Açıklama
		//Şimdiki Özellik
		//Sonraki özellik (Varsa)
		const _current = _m.props[_level > 0 ? _level - 1 : 0];
		let _next = _m.props?.[_level];
		_html += 
		`<div class="full talent-desc" style="height:86%">
			<div class="flex w-100 artifact-detail-header">
				<div class="artifact-detail-header-icon">
					<div class="full flex">
						<img src="./images/main/skill-icons/passives/${_id}.png" style="max-width:100%;max-height:100%" />
					</div>
				</div>
				<div class="artifact-detail-header-info">
					<div class="flex artifact-title artifact-detail-header-title" style="width:100%;padding:2vh">
						${_m.names[getLang()]}
					</div>
					<div class="flex talent-level flex-jc-start${_maxed ? ' maxed' : ''}">
						${_level}&nbsp;/&nbsp;${_m.props.length}<span class="${_maxed ? '' : 'd-none '}already-maxed">&nbsp;(max)</span>
					</div>
					<div class="flex artifact-description" style="width:100%;padding:2vh;text-align:center">
						${_m.descriptions[getLang()]}
					</div>
				</div>
			</div>
			<div class="flex artifact-bonus" style="width:100%;padding:1vh">
               	<div class="w-100">
			   		<div class="talent-props-header flex flex-jc-start w-100">
						${getLangData('Current Level')}
					</div>
					<div class="talent-props-desc flex flex-jc-start w-100">
						<div class="w-50 flex flex-jc-start">
							${getLangData(_current.type)}
						</div>
						<div class="w-50 flex flex-jc-end">
							&percnt;${_current.value}
						</div>
					</div>
				</div>
			   	<div class="w-100${(_level > 0 && _next) ? '' : ' d-none'} talent-props-next-level">
			   		<div class="talent-props-header flex flex-jc-start w-100">
						${getLangData('Next Level')}
					</div>
					<div class="talent-props-desc flex flex-jc-start w-100">
						<div class="w-50 flex flex-jc-start">
							${getLangData(_next?.type ?? '')}
						</div>
						<div class="w-50 flex flex-jc-end">
							&percnt;${_next?.value ?? ''}
						</div>
					</div>
				</div>
            </div>
		</div>
		<div class="talent-buttons flex w-100" style="height:14%">
			<div class="game-menu-button animate-me flex${_maxed ? ' disabled' : ''}" onexactclick="getRef(\'talent\')?.upgrade(${_id})" style="height:65%">
				<div class="flex">${getLangData(_level > 0 ? 'UPGRADE' : 'ACTIVATE')}</div>
			</div>
		</div>`;
		const _container = document.querySelector('.talent-content-right .menu-modal-right-container');
		if(_container)
			_container.innerHTML = _html + '<div id="shine"></div></div></div>';
	}
	this.askReset = function() {
   		askSomething(`${getLangData('Reset talent build?')}`, `getRef(\'talent\')?.reset()`);
	}
	this.reset = function(){
   		PlaySound({ key: 'reset', volume:1 });
		const _char = __account.characters.find(x => x.class === mainCharacter.class);
		_char.talents = [];
		_client.saveState();
		closeInventoryQuestionModal(1);
		this.render(1);
	}
	this.upgrade = function(_id) {
		const _m = __passiveSkills.find(x => x.id === _id);
		const _char = __account.characters.find(x => x.class === mainCharacter.class);
		if(!_char.talents)
			_char.talents = [];
		const _currentTotalTalents = _char.talents?.reduce((x, {count}) => x + count, 0);
		const _currentTalentsLimit = MathFloor(mainCharacter.level / 2);
		if(_currentTalentsLimit <= _currentTotalTalents) {
			warn('<span>' + getLangData('No more talent points') + '</span>', 'warn');
			return;
		}
		const _current = _char.talents?.find(x => x.id === _m.id);
		if(!_current) {
			if(_m.parent?.[0]) {
				const _preChoices = _char.talents?.filter(x => _m.parent.indexOf(x.id) >= 0);
				if(!_preChoices?.[0]) {
					warn('<span>' + getLangData('At least one previos node must be active') + '</span>', 'warn');
					return;
				}
			}
			_char.talents.push({id:_id, count:1});
		}
		else if(_current.count < _m.props.length)
			_current.count++;
		else {
			//daha fazla yükseltemezsin
			return;
		}
		this.selectTalent(_id, 1);

		//upgrade left
		const _isNew = (_current?.count ?? 1) === 1;
		let _needs;
		if(_isNew)
			_needs = __passiveSkills.filter(x => x.parent?.indexOf(_id) >= 0);
		if(_needs?.[0]) {
			for(let _need of _needs) {
				const _parentCard = document.querySelector('.talent-card[data-key="' + _need.id + '"]');
				if(_parentCard)
				{
					let _dir;
					if(_m.col > _need.col)
						_dir = 'right';
					else if(_m.col < _need.col)
						_dir = 'left';
					removeClass(_parentCard, 'gray');
					const _nodes = _parentCard.querySelectorAll('.talent-tree-node-up, .talent-tree-node-' + _dir);
					if(_nodes)
						_nodes.forEach(x => addClass(x,'active'));
				}
			}
		}
		const _talentCard = document.querySelector('.talent-card.selected');
		const _talentCardLevel = _talentCard.querySelector('.talent-card-level');
		removeClass(_talentCardLevel, 'd-none');
		const _maxed = (_current?.count ?? 1) === _m.props.length;
		if(_maxed)
			addClass(_talentCardLevel, 'maxed');
		_talentCardLevel.innerText = (_current?.count ?? 1);
		addClass(_talentCard,'glow-yellow');
		removeClass(_talentCard, 'gray');
		checkUpdateAvailable2(2);
		_client.saveState();
		document.querySelector('#talent-points-remaining').innerText = _char.talents?.reduce((x, {count}) => x + count, 0) ?? 0;
	}
	return this;
}