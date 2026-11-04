'use strict';
(function() {
	console.log('story-finish');
	function animateStart(_failed, _extraGain, _content) {
	_game.suspended = true;
	clearChainSkills();
	if(episode.mainClass && mainCharacter.id !== episode.mainClass) {
		// delete __account.characters.find(x => x.selected).selected;
		// const _ch = __account.characters.find(x => x.class === episode.mainClass);
		// initMainCharacter(_ch, 1);
		// _client.setCharacterValues();
		// setCharacterDefaults(mainCharacter);
		let _oldES = episode.still;
		episode.still = true;
		startWithThisCharacter(episode.mainClass, null, 1, 1);
		episode.still = _oldES;
	}
	const _isPvp = (episode.pvp || episode.war) & !episode.gold;
	const _id = __story.id;
	const _story = __stories.find(x => x.id === _id);
	const _isFirstPlay = !_story.mission && !__account.storyResults.find(x => x.id === 1);//  !__account.tutorials?.[1];
	const _endTime = __story.endTime ?? _gameTick;
	const _passedTime = _endTime - __story.startTime;
	const _2ndStar = _failed ? false : _story.resultStars?.[1]?.when( _story.resultStars?.[1]);
	const _3rdStar = _failed ? false : _story.resultStars?.[2]?.when( _story.resultStars?.[2]);
	const _totalStar = _failed ? 0 : 1 + (_2ndStar ? 2 : 0) + (_3rdStar ? 4 : 0);
	const _totalAchDone = _failed ? 0 : 1 + (_2ndStar ? 1: 0) + (_3rdStar ? 1 : 0);
	let _oldResult = __account.storyResults.find(x => x.id === _id);
	if(!_oldResult && !_failed && !_story.mission) {
		__account.storyResults.push({id:_id, stars:[1]});
		_oldResult = __account.storyResults.find(x => x.id === _id);
	}
	const _stars = _oldResult?.stars;
	let _isPerfect, _isFirstFinish = _failed ? false : !_stars;
	if(mainCharacter.storyVariables)
		mainCharacter.setProps(mainCharacter.storyVariables);
	delete mainCharacter.storyVariables;
	mainCharacter.stopHeartBeatSound();
	mainCharacter.stopStepSound();
	mainCharacter.removeBuffs();
	const _currentLevel = mainCharacter.level;
	
	if(_2ndStar && _stars?.indexOf?.(2) === -1)
		_stars.push(2);
	if(_3rdStar && _stars?.indexOf?.(4) === -1)
		_stars.push(4);
	const _isBeforePerfect = _oldResult?.perfect;
	if(_totalStar === 7)
		_isPerfect = true;
	if(_oldResult && _isPerfect)
		_oldResult.perfect = true;
	if(!episode.realTime)
		_client.saveState();
	if(_isPerfect && !_story.mission)
		updateGlobalQuest('complete-act-perfect');
	if(!_failed && _story.mission)
		updateGlobalQuest('complete-dungeon');
	if(!_failed && !_isPvp && !_story.mission)
		updateGlobalQuest('complete-act');
	else if(__story?.bonus === 'exp') {
		if(episode?.killCount > 0)
			_extraGain = {key:'exp', count:episode.killCount * __account.act, bonus:1};
	}
	const _currentExpRate = MathFloor((mainCharacter.experience / mainCharacter.maxExperience) * 100);
	const _newExp = _failed ? 0 : (_story?.rewards?.find(x => x.key === 'exp')?.count ?? 0) * (episode.expSelected ? 2 : 1);
	let _newExpRate = (mainCharacter.experience + _newExp) >= mainCharacter.maxExperience ? 100 :
			MathFloor(((mainCharacter.experience + _newExp) / mainCharacter.maxExperience) * 100);
	const _levelUP = _newExpRate >= 100;
	const _hour = MathFloor(_passedTime / (60000 * 60));
	const _minute = MathFloor(_passedTime / 60000);
	const _second = MathFloor((_passedTime % 60000) / 1000);
	let _elapsedTime;
	if(_hour > 0)
		_elapsedTime = getLangData('over 1 hour');
	else
		_elapsedTime = ((_minute > 0 ? (_minute + getLangData('m')) : '') + ' ' +
	(_second > 0 ? (_second + getLangData('s')) : '')).trim();
	let _firstFinishRewardsHtml = '';
	let _achievementsHtml = '';
	if(_story?.resultStars)
		for(let _rs of _story.resultStars){
			const _ok = _failed ? false : _rs.when(_rs);
			_achievementsHtml += `<div class="w-100 flex flex-jc-start" style="color:${_ok ? '#F4BB44' : '#ff6c00cc'}; padding: 1%; height: 33%">
								<img src="./images/ui/game/${_ok ? 'yellow' : 'event'}-badge.png" style="height:80%;margin-right: 2.5%;">${getLangData(_rs.title)}
							</div>`;
		}
	let _rewardsHtml = (_failed && !_extraGain) ? '' : getStoryRewardsResultHtml(_story, null, null, _extraGain, 1, _totalStar >= 1);
	if(_isPerfect && !_isBeforePerfect && _story.perfectFinishRewards)
        updateMisc(structuredClone2(_story.perfectFinishRewards));
	if(_isFirstFinish && _story.firstFinishRewards)
        updateMisc(structuredClone2(_story.firstFinishRewards));
	if(episodePot > 0) {
		const _value = episodePot;
		episodePot = 0;
		updatePot(_value);
	}
	if((_isPerfect && _story.perfectFinishRewards && !_isBeforePerfect) && (_isFirstFinish && _story.firstFinishRewards))
		_firstFinishRewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 100%">
							<img style="/* filter: drop-shadow(0 0 1px #f3f4f5); */height: 100%;margin-right: 5%;filter: drop-shadow(0 0 .15vh orange) drop-shadow(0 0 .3vh #FF7518);" src="./images/icons/chest2.png">x 2
						</div>`;
	else {
		if(_isPerfect && _story.perfectFinishRewards && !_isBeforePerfect)
			_firstFinishRewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 100%">
								<img style="/* filter: drop-shadow(0 0 1px #f3f4f5); */height: 100%;margin-right: 5%;filter: drop-shadow(0 0 .15vh orange) drop-shadow(0 0 .3vh #FF7518);" src="./images/icons/chest2.png">x 1
							</div>`;
		if(_isFirstFinish && _story.firstFinishRewards)
			_firstFinishRewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 100%">
								<img style="/* filter: drop-shadow(0 0 1px #f3f4f5); */height: 100%;margin-right: 5%;filter: drop-shadow(0 0 .15vh orange) drop-shadow(0 0 .3vh #FF7518);" src="./images/icons/chest2.png">x 1
							</div>`;
	}
	if(_firstFinishRewardsHtml !== '')
		_firstFinishRewardsHtml = `<div class="w-100 flex header flex-jc-start ms2000 op-none" style="height: 14%;">
						<div class="header-inner">
							${getLangData('First Finish Rewards')}
						</div>
						<div style="flex:1;height:100%" class="flex flex-jc-end">`
							+ _firstFinishRewardsHtml +
						`</div>
					</div>`;
	let _missionTitle = '';
	if(episode.roomId)
		leaveRoom(episode.roomId);
	const _draw = _failed === 2;
	const _isDuel = _isPvp && !episode.war;
	if(episode.war)
		_missionTitle = getLangData('War');
	else if(_isDuel)
		_missionTitle = getLangData('Duel');
	else if(_story.mission)
		_missionTitle = _story.title[getLang()];
	else
		_missionTitle = getLangData('Story') + '&nbsp;' + __account.act + '-' + _story.order;
	let _hasNext = _failed ? false : !_isFirstPlay;
	let _hasRetry = true;
	if(_story.mission)
	{
		const _dm = __account.missions?.find(x => x.key === _story.mission);
		if(_dm?.current >= _story.daily)
			_hasRetry = false;
	}
	if(_hasNext)
		_hasNext = _story.missin ? false : __stories.find(x => x.order > __story.order && !x.passive && x.list);
	const _template = `<div data-module='storyfinish' id="story-finish" class="finish flex d-none">
		<div class="w-50 side-left flex flex-jc-start" style="height:100% !important;width:55%;flex-direction:column">
			<div class="w-100 flex op-none ${_failed ? 'victory' : 'victory'}-header ms250" lang="${getLang()}">${getLangData(_failed ? (_draw ? 'DRAW' : 'DEFEAT') : 'VICTORY')}
				<div class="page-detail-splitter-thin"></div>
			</div>
			<img src="./images/${_draw ? 'icons/war.png' : 'main/' + (episode.realClass ?? mainCharacter.class) + '/' + (_failed ? 'loose' : 'finish') + '-concept.png'}" class="char slide-right">
		</div>
		<div class="w-50 container side-right flex flex-ai-start" style="height:90%;width:45%">
			<div class="full" style="position:relative;z-index:2;margin: 0 15% 0 0;width:85%">
				<div class="stars flex w-100" style="height: 20%;position:relative;background: url(./images/ui/game/story-finish-header.png);background-size: contain;background-repeat: no-repeat;background-position: center;">
					<img class="ms250 op-none${_isPvp ? ' d-none':''}" src="./images/ui/game/star-${_totalAchDone > 0 ? 'on' : 'off'}.png">
					<img class="ms500 op-none${_isPvp ? ' d-none':''}" src="./images/ui/game/star-${_totalAchDone > 1 ? 'on' : 'off'}.png" style="margin-bottom: -4%;margin-top: -6%;">
					<img class="ms750 op-none${_isPvp ? ' d-none':''}" src="./images/ui/game/star-${_totalAchDone > 2 ? 'on' : 'off'}.png">
					<div class="w-50 flex one-line" style="position: absolute;left: 25%;height: 30%;font-size: calc(var(--wot-font-base) * 2.85)!important;color: #f3f4f580;z-index: 0;text-shadow: 2px 2px 1px #000;padding-top: 1%;padding-left:0 !important;justify-content:center !important">` + _missionTitle + `</div>
				</div>
				<div class="flex w-100 ms1000 op-none${_isPvp ? ' d-none' : ''}" style="padding: 1.5% 12.5% 0 12.5%;height: 8%;">
					<div id="level" class="flex" style="padding:0 3%">${getLangData('Lvl')}&nbsp;${_currentLevel}</div>
					<div class="flex flex-jc-start" style="flex:1;background:#232323;height: 60%;border: 1px solid #f3f4f540;">
						<div id="exp-bar" class="flex animate-me-1500" style="width:${_currentExpRate}%;height: 100%; "></div>
					</div>
					<div id="next-level" class="flex" style="padding:0 3%; color: #f3f4f5cc">
						+Exp
					</div>
				</div>
				<div class="flex flex-ai-start w-100" style="padding:${_isDuel ? '0' : '0 12.5%'};height:${_isPvp ? (episode.war ? '68%;margin:2% 0 1% 0' : '80%') : '62%'}">`
					+ (_content ??
					`<div class="header-content w-100" style="height: 8%;">
						<div class="w-100 flex op-none ms1000" style="padding: 0 1%;height: 100%">
							<div class="w-50 flex flex-jc-start" style="color: #9d987f">
								${getLangData('Play Time')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_elapsedTime}
							</div>
						</div>
					</div>
					<div class="w-100 flex header flex-jc-start ms1500 op-none" style="height: 12%">
						<div class="header-inner" style="flex:1">
							${getLangData('Achievements')}
						</div>
						<div class="flex flex-jc-end" style="opacity:.8">
							${_totalAchDone}&nbsp;/&nbsp;3
						</div>
						<div class="page-detail-splitter-thin"></div>
					</div>
					<div class="header-content w-100 ms1500 op-none flex flex-jc-start" style="height: 24%;">`
					 + _achievementsHtml +
					`</div>`) +
					`<div class="w-100 flex header flex-jc-start ms${_isPvp ? 1000 : 2000} op-none" style="height:${episode.war ? '0%' : '12%'}">
						<div class="header-inner${_rewardsHtml === '' ? ' v-none' : ''}">
							${episode.war ? '' : getLangData('Rewards')}
						</div>
						<div class="page-detail-splitter-thin"></div>
					</div>
					<div class="header-content w-100 flex flex-jc-start flex-ai-start ms${_isPvp ? 1000 : 2000} op-none" style="height:${episode.war ? '20%;margin:2% 0 3.5% 0' : '30%'}">`
						+ _rewardsHtml +
					'</div>'
					+ _firstFinishRewardsHtml +
				`</div>
				<div class="flex w-100 ms2500 op-none${_isPvp ? ' d-none' : ''}" style="height: 10%">
					<div class="w-33 flex" onexactclick="playClick();hideMyModalPopUp(1);checkStoryFinish(${_failed ? 0 : 1}, ${_id}, ${episode.goldSelected ? 1 : 0}, ${episode.expSelected ? 1 : 0}, ${episode.itemSelected ? 1 : 0})" style="padding: 1%;height: 100%${_isFirstPlay ? ';pointer-events:none!important' : ''}">
						<div style="height:74%!important" class="btn${((_isFirstPlay && !_failed) || !_hasRetry) ? ' inactivated' : ''} animate-me-500 flex">${getLangData('RETRY')}</div>
					</div>
					<div class="w-33 flex${!_client.quickPlay ? ' d-none' : ''}" onexactclick="playClick();hideMyModalPopUp(1);createPromoScreen();detachModule()" style="padding: 1%;height: 100%${_isFirstPlay ? ';pointer-events:none!important' : ''}">
						<div style="height:74%!important" class="btn${((_isFirstPlay && !_failed) || !_hasRetry) ? ' inactivated' : ''} animate-me-500 flex">${getLangData('BACK')}</div>
					</div>
					<div class="w-33 flex${_client.quickPlay ? ' d-none' : ''}" onexactclick="playClick();hideMyModalPopUp(1);checkStoryFinish(${_failed ? 0 : 1})" style="padding: 1%;height: 100%">
						<div style="height:74%!important" class="btn animate-me-500 flex">${getLangData('LOBBY')}</div>
					</div>
					<div class="w-33 flex${(_client.quickPlay || _story.mission) ? ' d-none' : ''}" style="padding: 1%;height: 100%${!_hasNext ? ';pointer-events:none!important' : ''}" onexactclick="playClick();hideMyModalPopUp(1);checkStoryFinish(1, ${__stories.find(x => !x.passive && x.order > __story.order)?.id}, null, null, null, 1)">
						<div style="height:74%!important" class="btn${!_hasNext ? ' inactivated' : ''} animate-me-500 flex">${getLangData('NEXT')}</div>
					</div>
				</div>
				<div class="flex w-100 ms1000 op-none${!_isPvp ? ' d-none' : ''}" style="height:${_isDuel ? 12 : 10}%;padding:0 4%">
					<div class="w-50 flex" onexactclick="playClick();hideMyModalPopUp(1);detachModule();switchStoryScene(null, __storySceneOrder)" style="padding: 1%;height: 100%">
						<div class="btn animate-me-500 flex">${getLangData('QUIT')}</div>
					</div>
					<div class="w-50 flex" onexactclick="playClick();hideMyModalPopUp(1);detachModule();switchStoryScene(function() { switchBookPage(${episode.leadTo?.bottomPageIndex ?? (episode.realTime ? 4 : 5)}, ${episode.leadTo?.leftPageIndex ?? (episode.war ? 3 : (episode.realTime ? 3 : 1))}); }, __storySceneOrder)" style="padding: 1%;height: 100%">
						<div class="btn animate-me-500 flex">${getLangData('BACK')}</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;
	// <div class="flex d-none w-100" style="height:8vh">
	// 	<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
	// 		<div class="game-menu-button btn-info full flex animate-me" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(null, __storySceneOrder)">${getLangData('QUIT')}</div>
	// 	</div>
	// 	<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
	// 		<div class="game-menu-button btn-info full flex animate-me${!__account.pvp.duelCount ? ' disabled' : ''}" style="right:unset;top:unset;cursor:pointer;color:darkgoldenrod !important;font-size:3vh !important" onexactclick="switchStoryScene(function() { switchBookPage(5, 1); }, __storySceneOrder)">${getLangData('BACK')}</div>
	// 	</div>
	// </div>
	const _a = document.createElement('div');
	_a.innerHTML = _template;
	_gameUI.appendChild(_a.firstChild);
	setTimeout(function () {
		const _sf = document.querySelector('#story-finish.finish');
		const _seb = document.querySelector('#story-finish #exp-bar');
		const _sl = document.querySelector('#story-finish #level');
		removeClass(_sf,'d-none');
		addClass(_sf,'animate');
		addClass(_sf,'fade-me');
		addClass(_sf,'show-ui');
		let story_ended;
		setTimeout(function() {
			_seb.style.width = _newExpRate + '%';
			_seb.ontransitionend = function () {
				if (story_ended)
					return;
				story_ended = 1;
				if(!_levelUP)
					return;
				removeClass(_seb,'animate-me-1500');
				removeClass(_seb,'rise-up');
				_seb.style.background = '#232323';
				_seb.innerText = getLangData('LEVEL UP!');
				addClass(_seb,'level-up');
				PlaySound({key:'levelup', volume:.2});
				_sl.innerText = getLangData('Lvl') + ' ' + (mainCharacter.realLevel ?? mainCharacter.level);
				_sl.style.color = '#fff';
				setTimeout(function () {
					addClass(_sl,'animate-me-1500');
					_sl.style.color = '#9d987f';
				}, 10);
				setTimeout(function () {
					addClass(_seb,'animate-me-1500');
					_seb.style.color = 'transparent';
				}, 1000);
			}
		}, 2500);
		episode.pauseAmbianceMusic();
		PlaySound({key:'storyfinish', volume:1});
		if(!_failed && (_isPvp || _story.mission))
			PlaySound({key:'victory', volume:1});
		if(!_failed && !_isPvp)
			setTimeout(function () {
				PlaySound({key:'ironx1', volume:1, reset: true, end: function() {
					if(_2ndStar)
						PlaySound({key:'ironx1', volume:1, reset: true, end: function() {
							if(_3rdStar)
								PlaySound({key:'ironx1', reset: true, volume:1});
						}});
				}});	 
			}, 500);
		else if(_failed)
			PlaySound({key:'defeat', volume:1});
		const fade = function(_selector, _ms) {
			setTimeout(function () {
				const _elems = document.querySelectorAll(_selector);
				_elems?.forEach(x => {
					addClass(x,'fade-me');
					removeClass(x,'op-none');
				});
			}, _ms ?? 0);
		}
		fade('#story-finish .ms250', 500);
		fade('#story-finish .ms500', 750);
		fade('#story-finish .ms750', 1000);
		fade('#story-finish .ms1000', 1500);
		fade('#story-finish .ms1500', 2000);
		fade('#story-finish .ms2000', 2500);
		fade('#story-finish .ms2500', 3000);
	}, 100);
	}

	window.storyfinish = window.storyfinish || {};
	window.storyfinish.animateStart = animateStart;

})();