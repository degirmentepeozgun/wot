'use strict';
(function () {
	function dungeon() {
		this.key = 'dungeon';
		this.tutorial = {
			tr: {
				title: 'Zindanlar',
				desc: 'Zindanlar günlük belli limitte oynanabilen içeriklerdir. Bu limite ulaştıktan sonra ertesi gün tekrar hak kazanırsınız. Karakterinizi daha güçlü hale getirmenize imkan sağlayacak güçte ekipmanlar ve özel ödüller bu zindanlarda sizleri bekliyor.'
			},
			en: {
				title: 'Dungeons',
				desc: "Dungeons are playable content with a set daily limit. Once you reach this limit, you'll regain access the next day. Powerful equipment and special rewards await you in these dungeons, allowing you to further strengthen your character."
			}
		};
		if (!tryShowMenuTutorial(this.key)) this.tutorial = undefined;
		this.render = function (_noAnimation, _id) {
			let _content = showMenuTutorial(this.tutorial, this.key);
			updateMenuBottom(5);
			const _container = selectMenuContainer();
			_container.innerHTML =
				`<div data-module='dungeon' class="menu-ui-left${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-left menu-modal-left-content">
				<div class="skills-content-left stories-content-left dungeon-content-left menu-modal-left-container">
					<div style="overflow-y:auto" class="full">` +
				this.getDungeons(_id) +
				`</div>
				</div>
			</div>
		</div>
		<div data-module='dungeon' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right menu-modal-right-content">
				<div class="skills-content-right stories-content-right dungeon-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">` +
				_content +
				`</div>
				</div>
			</div>
		</div>`;
			if (_content === '') this.selectDungeon(_id, 1, _noAnimation);
		};
		this.getDungeons = function (_id) {
			const _noSelect = tryShowMenuTutorial('dungeon');
			let _html = '';
			const _arr = __stories.filter((x) => x.mission && !(x.list === false));
			const _resetTime = getTodayResetTimestamp();
			for (var item of _arr) {
				const _mission = __account.missions?.find((x) => x.key === item.mission);
				if (item.daily && _mission?.current >= item.daily) {
					if (
						(_gameTick > _resetTime || _resetTime - _mission.lastActivity > 24 * 60 * 60 * 1000) &&
						_resetTime > _mission.lastActivity
					) {
						_mission.current = 0;
					}
				}
				_html +=
					`<div data-key="${item.id}" onexactclick="getRef('dungeon')?.selectDungeon(${item.id})" class="skill-card dungeon-card flex animate-me${item.id === _id && !_noSelect ? ' selected' : ''}">
				<div class="skill-icon-wrapper flex">
					<img${item.bgColor ? ' style="background:radial-gradient(' + item.bgColor + ', #000)"' : ''} src="./images/mission/icons/${item.mission}/icon.png" />
				</div>
				<div class="flex" style="flex:1;height:100%;padding:1cqh 0">
					<div class="flex flex-jc-start skill-card-title w-100" style="height:40%">${item.title[getLang()]}</div>
					<div class="story-level flex flex-jc-start w-100" style="height:30%">${getLangData('Lvl')}&nbsp;${item.minLevel}&nbsp;${getLangData('required')}</div>
					<div class="story-consume flex flex-jc-start w-100" style="height:30%;color:#f3f4f5bf !important">${getLangData('Used')}:&nbsp;<span style="color:${item.daily === _mission?.current ? '#ff6c00' : '#AAFF00'}!important">${_mission?.current ?? 0}&nbsp;/&nbsp;${item.daily}</span></div>
				</div>` +
					(item.daily
						? `<div class="story-bonus-mark dungeon-daily-mark">${getLangData('Daily').toLocaleUpperCase(getLang())}</div>`
						: '') +
					`</div>`;
			}
			return _html;
		};
		this.selectDungeon = function (_id, _noSound, _noAnimation) {
			const _arr = __stories.filter((x) => x.mission && !(x.list === false));
			if (!_id) _id = _arr?.length > 0 ? _arr[0].id : undefined;
			else playClick();
			if (!_id) return;
			const _cards = document.querySelectorAll('.dungeon-content-left .dungeon-card');
			_cards.forEach((x) => removeClass(x, 'selected'));
			const _card = document.querySelector('.dungeon-content-left .dungeon-card[data-key="' + _id + '"]');
			if (_card) {
				addClass(_card, 'selected');
				addClass(_card, 'read');
				this.openDungeonDetail(_id, _noSound, _noAnimation);
			}
		};
		this.openDungeonDetail = function (_id, _noSound, _noAnimation) {
			if (!_noSound) playClick();
			const _s = __stories.find((x) => x.id === _id);
			let _goals = '';
			if (_s.resultStars)
				for (let _rs of _s.resultStars) {
					_goals += `<div class="w-100 story-goal-item flex">
					<div class="flex story-goal-icon">
						<img src="./images/ui/game/quest-star.png" />
					</div>
					<div style="color:#c3b9a4 !important" class="flex flex-jc-start story-goal-title wot-subtitle">
						${getLangData(_rs.title)}
					</div>
				</div>`;
				}
			let _html =
				`<div class="flex full show-ui story-detail${_noAnimation ? '' : ' fade-me'}"><div class="flex flex-jc-end story-detail-close"><div class="page-detail-header">${_s.title[getLang()]}</div></div><div class="page-detail-splitter-thin"></div>
			<div class="story-detail-wrapper">` +
				_goals +
				`<div class="page-detail-splitter"></div>
			<div class="flex flex-jc-start story-detail-heading page-detail-header">${getLangData('Rewards')}</div>
			<div class="page-detail-splitter-thin"></div>
			<div class="story-rewards w-100 flex flex-jc-start">`;
			for (const _r of _s.rewards) {
				if (_r.key === 'fragment') {
					let _img = '';
					const _arr = _r.name?.split(',') ?? ['random'];
					for (let i = 0; i < _arr.length; i++)
						_img += `<img style="left:${i * 5}cqh;position:absolute;top:0" src="./images/fragments/${_arr[i]}.png" />`;
					_html +=
						`<div class="flex flex-jc-start w-50 story-reward story-reward-fragment">
							<div style="position:relative;height:8cqh;width:calc(8cqh + ${(_arr.length - 1) * 5}cqh)">` +
						_img +
						`</div>
							<div style="flex:1" class="flex">
								<div class="w-100 flex flex-jc-start page-detail-desc">
									${_r.count ? _r.count.formatWithDots() : _r.minCount && _r.maxCount ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1}
								</div>
								<div style="color:#ff6c00 !important" class="w-100 page-detail-desc flex-jc-start flex${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
							</div>
						</div>`;
				} else if (_r.key === 'gem')
					_html += `<div class="flex flex-jc-start w-50 story-reward">
							<span class="${_r.type === 'random' ? '' : 'story-reward-item grade' + (_r.grade ?? 1) + '-item'}" style="display:inline-block;position:relative">
								<img class="item-img" src="./images/gems/${_r.type}${_r.grade ?? 1}.png" />
							</span>
							<div style="flex:1;padding-left:1cqh" class="flex">
								<div class="w-100 flex flex-jc-start page-detail-desc">
									${_r.count ? _r.count.formatWithDots() : _r.minCount && _r.maxCount ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1}
								</div>
								<div style="color:#ff6c00 !important" class="flex page-detail-desc flex-jc-start w-100${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
							</div>
						</div>`;
				else if (_r.key === 'item')
					_html += `<div class="flex flex-jc-start w-50 story-reward">
							<span class="story-reward-item grade${_r.grade ?? 1}-item" style="display:inline-block;position:relative">
								<img class="item-img" src="./images/items/icons/${(_r.type ?? _r.key) === 'weapon' ? mainCharacter.class + '/' : ''}${_r.type ?? _r.key}${_r.grade ?? 1}.png" />
							</span>
							<div style="flex:1;padding-left:1cqh" class="flex">
								<div class="w-100 flex flex-jc-start page-detail-desc">
									${_r.count ? _r.count.formatWithDots() : _r.minCount && _r.maxCount ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1}
								</div>
								<div style="color:#ff6c00 !important" class="flex page-detail-desc flex-jc-start w-100${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
							</div>
						</div>`;
				else
					_html += `<div class="flex flex-jc-start w-50 story-reward">
								<img src="./images/${_r.key === 'item' ? 'items/' : ''}icons/${_r.type ?? _r.key}${_r.grade ?? ''}.png" />
								<div style="flex:1" class="flex">
									<div class="w-100 flex flex-jc-start page-detail-desc">
										${_r.count ? _r.count.formatWithDots() : _r.minCount && _r.maxCount ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1}
									</div>
									<div style="color:#ff6c00 !important" class="flex page-detail-desc flex-jc-start w-100${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
								</div>
							</div>`;
			}
			_html += `</div>
			<div class="page-detail-splitter"></div>
			<div class="flex flex-jc-start story-detail-heading page-detail-header">${getLangData('Description')}</div>
			<div class="page-detail-splitter-thin"></div>
			<div class="story-description page-detail-desc">${_s.description[getLang()]}</div>
			</div>
			<div class="w-100 flex action-button-container">
				<div class="page-detail-splitter w-100"></div>
				<div onexactclick="getRef('dungeon')?.start(${_id})" class="flex page-detail-button">
					<div class="flex">${getLangData('START')}</div>
				</div>
			</div>
		</div>`;
			const _container = document.querySelector('.dungeon-content-right .menu-modal-right-container');
			if (_container) _container.innerHTML = _html + '</div></div>';
		};
		this.start = function (_id) {
			const _s = __stories.find((x) => x.id === _id);

			if (mainCharacter.level < _s.minLevel) {
				warn('<span>' + getLangData('Your level is too low') + '</span>', 'warn');
				return;
			}

			if (_s.daily) {
				let _am = __account.missions.find((x) => x.key === _s.mission);
				let _save;
				if (!_am) {
					__account.missions.push({ current: 0, key: _s.mission });
					_am = __account.missions.find((x) => x.key === _s.mission);
					_save = true;
				}
				if (_am.current >= _s.daily) {
					const _resetTime = getTodayResetTimestamp();

					if (
						(_gameTick > _resetTime || _resetTime - _am.lastActivity > 24 * 60 * 60 * 1000) &&
						_resetTime > _am.lastActivity
					) {
						_am.current = 0;
						_save = true;
					} else {
						warn('<span>' + getLangData('Daily limit reached') + '</span>', 'warn');
						return;
					}
				}
				if (_save) _client.saveState();
			}
			playClick();
			const _mission = _missions.find((x) => x.key === _s.mission);
			if (_mission?.before) {
				_mission.before(_id);
				return;
			}
			tryStartStoryMission(_id);
		};
		this.approve = function (_id) {
			playClick();
			tryStartStoryMission(_id);
		};
		return this;
	}
	window.dungeon = dungeon;
})();
