'use strict';
console.log('talent')
function talent() {
	this.passiveSkills = [
		{
			id:1,
			key: 'passive-atk',
			col: 1,
			names: {
				en: 'Sharp Blade',
				tr: 'Keskin Kılıç'
			},
			descriptions: {
				en: 'Additional attack to proove your strength',
				tr: 'Gücünüzü ispatlamak için ekstra saldırı'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Attack',
					value: 10
				},
				{
					type: 'Attack',
					value: 20
				}
			]
		}, 
		{
			id: 2,
			key: 'passive-hp',
			col: 2,
			names: {
				en: 'Toughness',
				tr: 'Dayanıklılık'
			},
			descriptions: {
				en: 'Additional health point for keeping yourself alive much longer',
				tr: 'Sizi daha fazla hayatta tutmak için ekstra sağlık puanı'
			},
			parent: [1,3],
			unlockLevel: 1,
			props: [
				{
					type: 'Health Point',
					value: 10
				},
				{
					type: 'Health Point',
					value: 20
				}
			]
		}, 
		{
			id: 3,
			key: 'passive-def',
			col: 3,
			names: {
				en: 'Protection',
				tr: 'Korunma'
			},
			descriptions: {
				en: 'Additional Defense for tough damage reduction',
				tr: 'Alınan hasarı azaltmaya yönelik ekstra savunma'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Defense',
					value: 10
				},
				{
					type: 'Defense',
					value: 20
				}
			]
		},
		{
			id:4,
			key: 'passive-crit-rate',
			col: 1,
			parent: [1],
			names: {
				en: 'Head Shot',
				tr: 'Kafaya İsabet'
			},
			descriptions: {
				en: 'Additional crit rate for insane damage per second',
				tr: 'Muazzam saldırı gücüne erişmeniz için ekstra kritik oranı'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Crit Rate',
					value: 1
				},
				{
					type: 'Crit Rate',
					value: 2
				}
			]
		}, 
		{
			id:5,
			key: 'passive-run-speed',
			col: 2,
			parent: [4,6],
			names: {
				en: 'Run Rabbit Run',
				tr: 'Koş Tavşan Koş'
			},
			descriptions: {
				en: 'Killing an enemy, increase run speed by %5 for 5 seconds',
				tr: 'Bir düşman öldüğünde koşu hızınızı 5 saniyeliğine %5 artar'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Run Speed',
					value: 5
				},
				{
					type: 'Run Speed',
					value: 10
				}
			]
		}, 
		{
			id:6,
			key: 'passive-crit-dmg-resist-rate',
			col: 3,
			parent: [3],
			names: {
				en: 'Lightning Reflexes',
				tr: 'Yıldırım Refleksleri'
			},
			descriptions: {
				en: 'Increase critical damage resistance rate',
				tr: 'Kritik hasar direnci oranınızı arttırır'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Crit Damage Resist Rate',
					value: 1
				},
				{
					type: 'Crit Damage Resist Rate',
					value: 2
				}
			]
		}, 
		{
			id:7,
			key: 'passive-atk-speed',
			col: 1,
			parent: [4],
			names: {
				en: 'Frenzy',
				tr: 'Çılgınlık'
			},
			descriptions: {
				en: 'Increase attack speed after a critical hit by chance',
				tr: 'Kritik vuruşun ardından şansla saldırı hızınızı arttırır'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Attack Speed',
					value: 5
				},
				{
					type: 'Attack Speed',
					value: 10
				}
			]
		}, 
		{
			id:8,
			key: 'passive-stun',
			col: 2,
			parent: [7,9],
			names: {
				en: 'Hit Me More',
				tr: 'Bana Daha Çok Vur'
			},
			descriptions: {
				en: 'When you stuck, hurls a hurricane by chance',
				tr: 'Sıkıştığın anda etrafa şansla hortum fırlatırsın'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Trigger Chance',
					value: 1
				},
				{
					type: 'Trigger Chance',
					value: 2
				}
			]
		}, 
		{
			id:9,
			key: 'passive-lms',
			col: 3,
			parent: [6],
			names: {
				en: 'Last Man Standing',
				tr: 'Son Hayatta Kalan'
			},
			descriptions: {
				en: 'When your hp decrease under %20, def will increase for a while',
				tr: 'Sağlığınız %20 altına düştüğünde defansınız bir süre artar'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Defense',
					value: 15
				},
				{
					type: 'Defense',
					value: 30
				}
			]
		},
		{
			id:10,
			key: 'passive-counter-cooldown',
			col: 1,
			parent: [7],
			names: {
				en: 'Sands of Time',
				tr: 'Zamanın Kumları'
			},
			descriptions: {
				en: 'Each successful counter attack has a chance to decrease skill cooldowns',
				tr: 'Her başarılı karşı saldırının yetenek soğuma sürelerini düşürme şansı olur'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Cooldown',
					value: 10
				}
			]
		},
		{
			id:11,
			key: 'passive-charge',
			col: 2,
			parent: [8],
			names: {
				en: 'Eagle Sight',
				tr: 'Kartal Görüşü'
			},
			descriptions: {
				en: 'Charge distance increases',
				tr: 'Şarj mesafesi artar'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Charge Distance',
					value: 10
				}
			]
		},
		{
			id:12,
			key: 'passive-counter-steal',
			col: 3,
			parent: [9],
			names: {
				en: 'Concentration',
				tr: 'Konsantrasyon'
			},
			descriptions: {
				en: 'Each successful counter-attacks may increase your health',
				tr: 'Her başarılı karşı saldırı bir ihtimal sağlığınızı arttırabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Life Steal',
					value: 5
				}
			]
		},
		{
			id:13,
			key: 'passive-crit-rate-rage',
			col: 1,
			names: {
				en: 'Final Destruction',
				tr: 'Son Yıkım'
			},
			parent: [10],
			descriptions: {
				en: 'Crit hits may give you extra rage',
				tr: 'Kritik saldırılar size fazladan öfke puanı kazandırabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Rage',
					value: 5
				},
				{
					type: 'Rage',
					value: 10
				}
			]
		},
		{
			id:14,
			key: 'passive-steal',
			col: 2,
			parent: [11],
			names: {
				en: 'Still Alive',
				tr: 'Hala Hayatta'
			},
			descriptions: {
				en: 'Attacks may steal life from enemies',
				tr: 'Saldırılar rakipten sağlık çalabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Life Steal',
					value: 1
				},
				{
					type: 'Life Steal',
					value: 2
				}
			]
		},
		{
			id:15,
			key: 'passive-counter-rage',
			col: 3,
			parent: [12],
			names: {
				en: 'Beast Mode',
				tr: 'Canavar Modu'
			},
			descriptions: {
				en: 'Counter attacks may give you extra rage',
				tr: 'Karşı saldırılar size fazladan öfke puanı kazandırabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Rage',
					value: 5
				},
				{
					type: 'Rage',
					value: 10
				}
			]
		}
	];
	this.render = function(_noAnimation, _id) {
		updateMenuBottom(1);
		const _container = selectMenuContainer();
		const _char = __account.characters.find(x => x.class === mainCharacter.class);
		_container.innerHTML = 
		`<div data-module='talent' class="menu-ui-left${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-left">
				<div class="skills-content-left talent-content-left menu-modal-left-container">
					<div class="w-100 flex talent-tree-top">
						<div class="w-50 flex flex-jc-start">
							${getLangData('Points')}:&nbsp;<span id="talent-points-remaining">${_char.talents?.reduce((x, {count}) => x + count, 0) ?? 0}</span>&nbsp;/&nbsp;<span id="talent-points-all">${MathFloor(mainCharacter.level / 2)}</span>
						</div>
						<div class="w-50 flex flex-jc-end">
							 <div onclick="getRef(\'talent\').askReset()" class="game-menu-button btn-reset flex animate-me"s>${getLangData('RESET')}</div>
						</div>
					</div>
					<div class="w-100 flex flex-ai-start talent-tree-middle">`
						+ this.getTalents(_id) +
					`</div>
				</div>
			</div>
		</div>
		<div data-module='talent' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right">
				<div class="skills-content-right talent-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">
					</div>
				</div>
			</div>
		</div>`;
		this.selectTalent(_id);
	}
	this.getTalents = function() {
		let html = '', i = 0;
		const _talents = __account.characters.find(x => x.class === mainCharacter.class)?.talents;
		let _zIndex = 999;
		for (var _m of this.passiveSkills) {
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
				let _parent = this.passiveSkills.find(x => x.id === _p);
				const _parentLevel = _talents?.find(x => x.id === _parent.id)?.count ?? 0;
				if(_m.col === _parent.col)
					_dir ='up';
				else if(_m.col < _parent.col)
					_dir = 'right';
				else
					_dir = 'left';
				_nodes += `<div class="talent-tree-node talent-tree-node-${_dir}${_parentLevel > 0 ? ' active' : ''}"></div>`;
			}
			html += `<div data-key="${_m.id}" style="z-index:${_m.col === 2 ? (_zIndex - 2) : _zIndex}" onclick="getRef(\'talent\')?.selectTalent(${_m.id})" class="talent-card flex talent-card-col-${_m.col}${_level > 0 ? ' glow-yellow':''}${(!_ok && !_level) ? ' gray' : ''}">`
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
	this.selectTalent = function(_id, _upgraded) {
		if(!_id)
			_id = 1;
		else
   			episode.playSound({ key: 'click' });
		if(!_id)
			return;
		const _cards = document.querySelectorAll('.talent-content-left .talent-card');
		_cards.forEach(x => removeClass(x, 'selected'));
		const _card = document.querySelector('.talent-content-left .talent-card[data-key="' + _id + '"]');
		if(_card) {
			addClass(_card, 'selected');
			this.openTalentDetail(_id);
			if(_upgraded) {
				episode.playSound({ key: 'upgrade', volume: .5, reset: true });
				shine(1000, document.querySelector('.talent-info'));
			}
		}
	}
	this.openTalentDetail = function(_id) {
		let _html = 
		`<div class="full flex item-info-container-parent" style="padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
			<div class="full flex flex-ai-start item-info-container artifact-info talent-info">`;
		const _m = this.passiveSkills.find(x => x.id === _id);
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
			<div class="game-menu-button animate-me flex${_maxed ? ' disabled' : ''}" onclick="getRef(\'talent\')?.upgrade(${_id})" style="height:65%">
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
   		episode.playSound({ key: 'reset', volume:1 });
		const _char = __account.characters.find(x => x.class === mainCharacter.class);
		_char.talents = [];
		_client.saveState();
		closeInventoryQuestionModal(1);
		this.render(1);
	}
	this.upgrade = function(_id) {
		const _m = this.passiveSkills.find(x => x.id === _id);
		const _char = __account.characters.find(x => x.class === mainCharacter.class);
		if(!_char.talents)
			_char.talents = [];
		const _current = _char.talents?.find(x => x.id === _m.id);
		if(!_current)
			_char.talents.push({id:_id, count:1});
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
			_needs = this.passiveSkills.filter(x => x.parent?.indexOf(_id) >= 0);
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
		document.querySelector('#talent-points-remaining').innerText = _char.talents?.reduce((x, {count}) => x + count, 0) ?? 0;
	}
	return this;
}