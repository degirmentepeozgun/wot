'use strict';
console.log('story-finish');
function animateStart() {
	_game.suspended = true;
	const _isFirstPlay = !__account.tutorials?.[0];
	const _id = __story.id;
	const _story = __stories.find(x => x.id === _id);
	const _endTime = __story.endTime ?? _gameTick;
	const _passedTime = _endTime - __story.startTime;
	const _2ndStar = _story.resultStars[1].when( _story.resultStars[1]);
	const _3rdStar = _story.resultStars[2].when( _story.resultStars[2]);
	const _totalStar = 1 + (_2ndStar ? 2 : 0) + (_3rdStar ? 4 : 0);
	let _oldResult = __account.storyResults.find(x => x.id === _id);
	if(!_oldResult) {
		__account.storyResults.push({id:_id, stars:[1]});
		_oldResult = __account.storyResults.find(x => x.id === _id);
	}
	const _stars = _oldResult.stars;
	let _isPerfect, _isFirstFinish = !_stars;
	if(mainCharacter.storyVariables)
		mainCharacter.setProps(mainCharacter.storyVariables);
	delete mainCharacter.storyVariables;
	mainCharacter.stopHeartBeatSound();
	mainCharacter.removeBuffs();
	const _currentLevel = mainCharacter.level;
	
	if(_2ndStar && _stars.indexOf(2) === -1)
		_stars.push(2);
	if(_3rdStar && _stars.indexOf(4) === -1)
		_stars.push(4);
	const _isBeforePerfect = _oldResult.perfect;
	if(_totalStar === 7)
		_isPerfect = _oldResult.perfect = true;
	_client.saveState();
	if(_isPerfect)
		updateGlobalQuest('complete-act-perfect');
	updateGlobalQuest('complete-act');
	const _currentExpRate = MathFloor((mainCharacter.experience / mainCharacter.maxExperience) * 100);
	const _newExp = _story.rewards.find(x => x.key === 'exp').count * (episode.expSelected ? 2 : 1);
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
	for(let _rs of _story.resultStars){
		const _ok = _rs.when(_rs);
		_achievementsHtml += `<div class="w-100 flex flex-jc-start" style="color:${_ok ? '#F4BB44' : '#ff6c00cc'}; padding: 1%; height: 33%">
							<img src="./images/ui/star-${_ok ? 'on' : 'off'}.png" style="height: 70%;margin-right: 2.5%;">${getLangData(_rs.title)}
						</div>`;
	}
	let _rewardsHtml =	getStoryRewardsResultHtml(_story);
	
	if(_isPerfect && !_isBeforePerfect)
        updateMisc({ type: 'chest', count: 1, grade: 1 });
	if(_isFirstFinish)
        updateMisc({ type: 'chest', count: 1, grade: 1 });
	if(episodePot > 0) {
		const _value = episodePot;
		episodePot = 0;
		updatePot(_value);
	}
	if((_isPerfect && !_isBeforePerfect) && _isFirstFinish)
		_firstFinishRewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 100%">
							<img style="/* filter: drop-shadow(0 0 1px #f3f4f5); */height: 100%;margin-right: 5%;filter: drop-shadow(0 0 .15vh orange) drop-shadow(0 0 .3vh #FF7518);" src="./images/icons/chest2.png">x 2
						</div>`;
	else {
		if(_isPerfect && !_isBeforePerfect)
			_firstFinishRewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 100%">
								<img style="/* filter: drop-shadow(0 0 1px #f3f4f5); */height: 100%;margin-right: 5%;filter: drop-shadow(0 0 .15vh orange) drop-shadow(0 0 .3vh #FF7518);" src="./images/icons/chest2.png">x 1
							</div>`;
		if(_isFirstFinish)
			_firstFinishRewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 100%">
								<img style="/* filter: drop-shadow(0 0 1px #f3f4f5); */height: 100%;margin-right: 5%;filter: drop-shadow(0 0 .15vh orange) drop-shadow(0 0 .3vh #FF7518);" src="./images/icons/chest2.png">x 1
							</div>`;
	}
	if(_firstFinishRewardsHtml !== '')
		_firstFinishRewardsHtml = `<div class="w-100 flex header flex-jc-start ms2000 op-none" style="height: 14%;">
						<div class="header-inner">
							First Finish Rewards
						</div>
						<div style="flex:1;height:100%" class="flex flex-jc-end">`
							+ _firstFinishRewardsHtml +
						`</div>
					</div>`;
	
	let _hasNext = !_isFirstPlay;
	if(_hasNext)
		_hasNext = __stories.find(x => x.order > __story.order && !x.passive && x.minLevel <= mainCharacter.level && x.list);
	const _template = `<div data-module='storyfinish' id="story-finish" class="finish flex d-none">
		<div class="w-50 side-left flex flex-jc-start" style="height:100% !important;width:55%;flex-direction:column">
			<div class="w-100 flex op-none victory-header ms250">VICTORY</div>
			<img src="./images/main/${(episode.realClass ?? mainCharacter.class)}/finish-concept.png" class="char slide-right">
		</div>
		<div class="w-50 container side-right flex flex-ai-start" style="height:90%;width:45%">
			<div class="full" style="position:relative;z-index:2;margin: 0 15% 0 0;width:85%">
				<div class="stars flex w-100" style="height: 20%;position:relative;background: url(./images/ui/header.png);background-size: contain;background-repeat: no-repeat;background-position: center;">
					<img class="ms250 op-none" src="./images/ui/star-on.png">
					<img class="ms500 op-none" src="./images/ui/star-${_2ndStar ? 'on' : 'off'}.png" style="margin-bottom: -4%;margin-top: -6%;">
					<img class="ms750 op-none" src="./images/ui/star-${_3rdStar ? 'on' : 'off'}.png">
					<div class="w-50 flex" style="position: absolute;left: 25%;height: 30%;font-size: 4vh !important;color: #f3f4f580;z-index: 0;text-shadow: 2px 2px 1px #000;padding-top: 1%;">Story ${__account.act}-${_story.order}</div>
				</div>
				<div class="flex w-100 ms1000 op-none" style="padding: 1.5% 12.5% 0 12.5%;height: 8%;">
					<div id="level" class="flex" style="padding:0 3%">Lvl ${_currentLevel}</div>
					<div class="flex flex-jc-start" style="flex:1;background:#232323;height: 60%;border: 1px solid #f3f4f540;">
						<div id="exp-bar" class="flex animate-me-1500" style="width:${_currentExpRate}%;height: 100%; "></div>
					</div>
					<div id="next-level" class="flex" style="padding:0 3%; color: #f3f4f5cc">
						+Exp
					</div>
				</div>
				<div class="flex flex-ai-start w-100" style="padding:0 12.5%;height: 62%;">
					<div class="header-content w-100" style="height: 8%;">
						<div class="w-100 flex op-none ms1000" style="padding: 0 1%;height: 100%">
							<div class="w-50 flex flex-jc-start" style="color: #9d987f">
								Play Time
							</div>
							<div class="w-50 flex flex-jc-end">
								${_elapsedTime}
							</div>
						</div>
					</div>
					<div class="w-100 flex header flex-jc-start ms1500 op-none" style="height: 12%">
						<div class="header-inner" style="flex:1">
							Achievements
						</div>
						<div class="flex flex-jc-end" style="opacity:.8">
							${_totalStar}&nbsp;/&nbsp;3
						</div>
					</div>
					<div class="header-content w-100 ms1500 op-none flex flex-jc-start" style="height: 24%;">`
					 + _achievementsHtml +
					`</div>
					<div class="w-100 flex header flex-jc-start ms2000 op-none" style="height: 12%">
						<div class="header-inner">
							Rewards
						</div>
					</div>
					<div class="header-content w-100 flex flex-jc-start ms2000 op-none" style="height:30%">`
						+ _rewardsHtml +
					'</div>'
					+ _firstFinishRewardsHtml +
				`</div>
				<div class="flex w-100 ms2500 op-none" style="height: 10%;padding:0 4%">
					<div class="w-33 flex" onexactclick="episode.playSound({ key: 'click' });hideMyModalPopUp(1);checkStoryFinish(1, ${_id}, ${episode.goldSelected ? 1 : 0}, ${episode.expSelected ? 1 : 0}, ${episode.itemSelected ? 1 : 0});detachModule()" style="padding: 1%;height: 100%">
						<div class="btn animate-me-500 flex">RETRY</div>
					</div>
					<div class="w-33 flex" onexactclick="episode.playSound({ key: 'click' });hideMyModalPopUp(1);checkStoryFinish(1);detachModule()" style="padding: 1%;height: 100%">
						<div class="btn animate-me-500 flex">LOBBY</div>
					</div>
					<div class="w-33 flex" style="padding: 1%;height: 100%${!_hasNext ? ';pointer-events:none!important' : ''}" onexactclick="episode.playSound({ key: 'click' });hideMyModalPopUp(1);checkStoryFinish(1, ${__stories.find(x => !x.passive && x.order > __story.order)?.id}, null, null, null, 1);detachModule()">
						<div class="btn${!_hasNext ? ' inactivated' : ''} animate-me-500 flex">${getLangData('NEXT')}</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;
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
				_seb.innerText = 'LEVEL UP!';
				addClass(_seb,'level-up');
				episode.playSound({key:'levelup', volume:.2});
				_sl.innerText = 'Lvl ' + mainCharacter.level;
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
		episode.playSound({key:'storyfinish', volume:1});
		setTimeout(function () {
			PlaySound({key:'ironx1', volume:1, reset: true, end: function() {
				if(_2ndStar)
					PlaySound({key:'ironx1', volume:1, reset: true, end: function() {
						if(_3rdStar)
							PlaySound({key:'ironx1', reset: true, volume:1});
					}});
			}});	 
		}, 500);
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
animateStart();