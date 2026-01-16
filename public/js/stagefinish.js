'use strict';
console.log('stage-finish');
function animateStart(_failed) {
	_game.suspended = true;
	clearChainSkills();
	if(episode.mainClass && mainCharacter.id !== episode.mainClass) {
		let _oldES = episode.still;
		episode.still = true;
		startWithThisCharacter(episode.mainClass, null, 1, 1);
		episode.still = _oldES;
	}
	const _id = __story.id;
	const _story = __stories.find(x => x.id === _id);
	const _endTime = __story.endTime ?? _gameTick;
	const _passedTime = _endTime - __story.startTime;
	let _isPerfect;
	if(mainCharacter.storyVariables)
		mainCharacter.setProps(mainCharacter.storyVariables);
	delete mainCharacter.storyVariables;
	mainCharacter.stopHeartBeatSound();
	mainCharacter.stopStepSound();
	mainCharacter.removeBuffs();
	const _hour = MathFloor(_passedTime / (60000 * 60));
	const _minute = MathFloor(_passedTime / 60000);
	const _second = MathFloor((_passedTime % 60000) / 1000);
	let _elapsedTime;
	if(_hour > 0)
		_elapsedTime = getLangData('over 1 hour');
	else
		_elapsedTime = ((_minute > 0 ? (_minute + getLangData('m')) : '') + ' ' +
	(_second > 0 ? (_second + getLangData('s')) : '')).trim();
	const _calc = __storyScene.leaderBoards.calculate();
	const _achievements = _calc.description;
	let _achievementsHtml = '', _totalAchScore = _calc.score;
	if(_totalAchScore < 0)
		_totalAchScore = 0;
	__story.point += _totalAchScore;
	let _achMS = 250;
	for(let _rs of _achievements) {
		_achMS += 250;
		_achievementsHtml += `<div class="w-100 flex flex-jc-start stage-achievement-item op-none ms${_achMS}">
								<div class="flex flex-jc-start stage-achievement-item-left">
									<img src="./images/ui/menu-icons/${_rs.icon}.png" style="height: 70%;margin-right: 2.5%;">
								</div>
								<div class="flex flex-jc-end stage-achievement-item-right">
									<div class="flex flex-jc-end stage-achievement-item-right-top">
										${_rs.title[getLang()]}
									</div>
									<div class="flex flex-jc-end stage-achievement-item-right-bottom">
										${_rs.value.formatWithDots()}
									</div>
								</div>
						</div>`;
	}
	let _leaderboardsHTML = '';
	let _hasNext = _failed ? false : __storySceneOrder < __story.scenes.length;
	if(!_hasNext) {
		__story.leaderBoards.set(function() {
			__story.leaderBoards.get(function(_leadersData) {
				const _leadersList = document.querySelector('.leaderboards-list');
				if(!_leadersList)
					return;
				_leaderboardsHTML = `<div class="w-100 fade-me flex flex-ai-end victory-header">${getLangData('Leaderboard')}</div>
					<div class="quickplay-leaderboards flex fade-me flex-ai-start"><div class="full char slide-right">`;
				for(let _player of _leadersData)
					_leaderboardsHTML += `<div class="flex leaderboard-item${_player.me ? ' selected' : ''}">
					<div class="flex flex-jc-start w-50 leaderboard-item-left">
						${_player.name.substring(0,4).toUpperCase()}
					</div>
					<div class="flex flex-jc-end w-50 leaderboard-item-right">
						${_player.point.formatWithDots()}
					</div>
				</div>`;
				_leaderboardsHTML += '</div></div>';
				_leadersList.innerHTML = _leaderboardsHTML;
				const _orderElem = document.getElementById('stage-result-order');
				if(_orderElem) {
					let _html = `<div>
					
					</div>`;
				}
			});
		});
	}
	let _orderHTML = '', btnId, action;
	if(_hasNext) {
		btnId = 'next-stage-btn';
		action = 1;
		_orderHTML = `<div class="stage-finish-informer flex w-100">
						 <div class="flex w-100">${getLangData('After the countdown, you will be ported to next stage')}</div><span id="next-stage-counter">8</span>
					</div>`;
	}
	else {
		btnId = 'quit-stage-btn';
		_orderHTML = `<div class="stage-finish-informer flex w-100">
						 <div class="flex w-100">${getLangData('After the countdown, action will be active')}</div><span id="next-stage-counter">8</span>
					</div>`;
	}
	let _nextStageTimer, _nextStageCounter = 0;
	_nextStageTimer = setInterval(() => {
		const _cd = document.getElementById('next-stage-counter');
		if(!_cd){
			clearInterval(_nextStageTimer);
			return;
		}
		else {
			if(_cd.innerText === '0') {
				clearInterval(_nextStageTimer);
				const _child = document.getElementById(btnId);
				if(action && _child?.onexactclick)
					_child.onexactclick();
				else if(!action){
					removeClass(_child, 'inactivated');
					removeClass(_child, 'gray');
					const _elem = document.getElementById('stage-result-order');
					if(_elem)
						_elem.innerHTML = '';
				}
				return;
			}
			if(_nextStageCounter > 2)
				PlaySound({key:'tiktak', volume:.5, reset: true});
			_nextStageCounter++;
			_cd.innerText = parseInt(_cd.innerText) - 1;
		}
	}, 1000);

	let _missionTitle = getLangData('Stage') + ' ' + __storySceneOrder;
	const _template = `<div data-module='stagefinish' id="story-finish" class="finish flex d-none${_hasNext ? ' bg-none' : ''}">
		<div class="w-50 side-left flex flex-jc-start flex-ai-start leaderboards-list op-none ms250" style="height:100% !important;width:55%;flex-direction:column">`
			+ 
		`</div>
		<div class="w-50 container side-right flex flex-ai-start" style="height:90%;width:45%${_hasNext ? ';padding:.5% 0 3.5% 0!important' : ''}">
			<div class="full stage-results-screen-middle${_hasNext ? ' final-screen-before-next' : ''}" style="position:relative;z-index:2;margin: 0 13.5% 0 1.5%;width:85%">
				<div class="stars flex w-100" style="height: 20%;position:relative;background: url(./images/ui/header.png);background-size: contain;background-repeat: no-repeat;background-position: center;">
					<div class="w-50 flex one-line" style="position: absolute;left: 25%;height: 30%;font-size: 4vh !important;color: #f3f4f580;z-index: 0;text-shadow: 2px 2px 1px #000;padding-top: 1%;">` + _missionTitle + `</div>
				</div>
				<div class="flex flex-ai-start w-100" style="padding:0 27%;height:58%">
					<div class="header-content w-100 flex flex-jc-start" style="height: 60%">`
					 + _achievementsHtml +
					`</div>
					<div class="w-100 flex header flex-jc-start ms1500 op-none" style="height:20%;border-top:1px solid #f3f4f520">
						<div class="w-100 flex flex-jc-start stage-achievement-item" style="height:50%">
							<div class="w-50 flex flex-jc-start stage-achievement-item-left" style="height:100%">
								${getLangData('Total Score')}
							</div>
							<div class="w-50 flex flex-jc-end stage-achievement-item-right" style="height:100%">
								${_totalAchScore.formatWithDots()}
							</div>
						</div>
						<div class="w-100 flex flex-jc-start stage-achievement-item${__story.point > _totalAchScore ? '' : ' d-none'}" style="height:50%">
							<div class="w-50 flex flex-jc-start stage-achievement-item-left" style="height:100%">
								${getLangData('Final Score')}
							</div>
							<div class="w-50 flex flex-jc-end stage-achievement-item-right" style="height:100%">
								${__story.point.formatWithDots()}
							</div>
						</div>
					</div>
					<div id="stage-result-order" class="header-content w-100 flex ms2000 op-none" style="height:20%">`
						+ _orderHTML +
					'</div>'
					+ //_firstFinishRewardsHtml +
				`</div>
				<div class="flex w-100 ms2000 op-none" style="height: 10%">
					<div class="w-33 flex${_hasNext ? ' d-none' : ''}" style="padding: 1%;height: 100%">
						<div onexactclick="playClick();hideMyModalPopUp(1);createPromoScreen();detachModule()" id="quit-stage-btn" style="height:74%!important" class="btn inactivated gray animate-me-500 flex">${getLangData('QUIT')}</div>
					</div>
					<div id="next-stage-btn" class="w-33 flex${!_hasNext ? ' d-none' : ''}" style="padding: 1%;height: 100%" onexactclick="playClick();hideMyModalPopUp(1);checkStoryFinish(1, ${__stories.find(x => !x.passive && x.order > __story.order)?.id}, null, null, null, 1)">
						<div style="height:74%!important" class="btn animate-me-500 flex">${getLangData('NEXT')}</div>
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
		removeClass(_sf,'d-none');
		addClass(_sf,'animate');
		addClass(_sf,'fade-me');
		addClass(_sf,'show-ui');
		episode.pauseAmbianceMusic();
		PlaySound({key:'storyfinish', volume:1});
		if(_failed)
			PlaySound({key:'defeat', volume:1});
		const fade = function(_selector, _ms, _play) {
			setTimeout(function () {
				const _elems = document.querySelectorAll(_selector);
				_elems?.forEach(x => {
					if(!_play)
						addClass(x,'fade-me');
					removeClass(x,'op-none');
				});
				if(_play)
					PlaySound({key:'ironx1', volume:1, reset: true});
			}, _ms ?? 0);
		}
		fade('#story-finish .ms250', 500);
		fade('#story-finish .ms500', 750, 1);
		fade('#story-finish .ms750', 1000, 1);
		fade('#story-finish .ms1000', 1250,1);
		fade('#story-finish .ms1500', 2000);
		fade('#story-finish .ms2000', 2500);
		fade('#story-finish .ms2500', 3000);
	}, 100);
}