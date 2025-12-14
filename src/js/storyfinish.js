'use strict';
console.log('story-finish');
function animateStart() {
	const _template = `<div data-module='storyfinish' id="story-finish" class="finish flex d-none">
		<div class="w-50 side-left flex flex-ai-start" style="height:100% !important;width:55%">
			<div class="w-100 flex victory-header ms250">VICTORY</div>
			<img src="./images/main/${mainCharacter.class}/finish-concept.png" class="char slide-right">
		</div>
		<div class="w-50 container side-right flex flex-ai-start" style="height:90%;width:45%">
			<div class="full" style="position:relative;z-index:2;margin: 0 15% 0 0;width:85%">
				<div class="stars flex w-100" style="height: 20%;position:relative;background: url(./images/ui/header.png);background-size: contain;background-repeat: no-repeat;background-position: center;">
					<img class="ms250 op-none" src="./images/ui/star-on.png">
					<img class="ms500 op-none" src="./images/ui/star-on.png" style="transform:scale(1.1);margin-top:-6%">
					<img class="ms750 op-none" src="./images/ui/star-off.png">
					<div class="w-50 flex" style="position: absolute;left: 25%;height: 30%;font-size: 4vh !important;color: #f3f4f580;z-index: 0;text-shadow: 2px 2px 1px #000;padding-top: 1%;">Story 1-1</div>
				</div>
				<div class="flex w-100 ms1000 op-none" style="padding: 1.5% 12.5%;height: 8%;">
					<div id="level" class="flex" style="padding:0 3%">Lvl 1</div>
					<div class="flex flex-jc-start" style="flex:1;background:#232323;height: 60%;border: 1px solid #f3f4f540;">
						<div id="exp-bar" class="w-50 flex animate-me-1500" style="height: 100%; "></div>
					</div>
					<div id="next-level" class="flex" style="padding:0 3%; color: #f3f4f5cc">
						+Exp
					</div>
				</div>
				<div class="flex w-100" style="padding:0 12.5%;height: 62%;">
					<div class="header-content w-100" style="height: 14%;">
						<div class="w-100 flex op-none ms1000" style="padding: 1%;height: 100%">
							<div class="w-50 flex flex-jc-start" style="color: #9d987f">
								Play Time
							</div>
							<div class="w-50 flex flex-jc-end">
								10min 41sec
							</div>
						</div>
					</div>
					<div class="w-100 flex header flex-jc-start ms1500 op-none" style="height: 12%;">
						<div class="header-inner" style="flex:1">
							Achievements
						</div>
						<div class="flex flex-jc-end" style="opacity:.8">
							2&nbsp;/&nbsp;3
						</div>
					</div>
					<div class="header-content w-100 ms1500 op-none flex flex-jc-start" style="height: 30%;">
						<div class="w-100 flex flex-jc-start" style="color: #F4BB44; padding: 1%; height: 33%">
							<img src="./images/ui/star-on.png" style="height: 70%;margin-right: 2.5%;">Clear story
						</div>
						<div class="w-100 flex flex-jc-start" style="color: #F4BB44; padding: 1%; height: 33%">
							<img src="./images/ui/star-on.png" style="height: 70%;margin-right: 2.5%;">Finish in 30 minutes
						</div>
						<div class="w-100 flex flex-jc-start" style="/* opacity: .85; *//* text-decoration: line-through; */padding: 1%;height: 33%;color: #ff6c00cc !important;">
							<img src="./images/ui/star-off.png" style="height: 70%;margin-right: 2.5%;">Keep health over %50
						</div>
					</div>
					<div class="w-100 flex header flex-jc-start ms2000 op-none" style="height: 12%;">
						<div class="header-inner">
							Rewards
						</div>
					</div>
					<div class="header-content w-100 flex ms2000 op-none" style="height: 32%;">
						<div class="w-33 flex" style="padding: 1%; height: 50%">
							<span class="story-reward-item grade2-item" style="display:inline-block;position:relative">
								<img class="item-img" src="./images/items/icons/helmet2.png" />
							</span> x 1
						</div>
						<div class="w-33 flex" style="padding: 1%; height: 50%">
							<img style="filter:drop-shadow(0 0 1px #f3f4f5);height: 70%;margin-right: 5%;" src="./images/fragments/cyclops.png"> x 5
						</div>
						<div class="w-33 flex" style="padding: 1%; height: 50%">
							<img style="height: 70%;margin-right: 5%;" src="./images/icons/coin.png"> x 5.000
						</div>
						<div class="w-33 flex" style="padding: 1%; height: 50%">
							<img style="/* filter: drop-shadow(0 0 1px #f3f4f5); */height: 85%;margin-right: 5%;filter: drop-shadow(0 0 .15vh orange) drop-shadow(0 0 .3vh #FF7518);" src="./images/icons/chest2.png">x 1
						</div>
						<div class="w-33 flex" style="padding: 1%; height: 50%">
							<img style="height: 70%;margin-right: 5%;" src="./images/icons/exp.png"> x 1.000
						</div>
					</div>

				</div>
				<div class="flex w-100 ms2500 op-none" style="height: 10%;padding:0 4%">
					<div class="w-33 flex" onclick="playClick();loadLastStoryCheckPoint();detachModule()" style="padding: 1%;height: 100%">
						<div class="btn animate-me-500 flex">RETRY</div>
					</div>
					<div class="w-33 flex" onclick="playClick();hideMyModalPopUp(1);checkStoryFinish(1);detachModule()" style="padding: 1%;height: 100%">
						<div class="btn animate-me-500 flex">LOBBY</div>
					</div>
					<div class="w-33 flex" style="padding: 1%;height: 100%">
						<div class="btn inactivated animate-me-500 flex">NEXT</div>
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
			addClass(_seb,'w-100');
			_seb.ontransitionend = function () {
				if (story_ended)
					return;
				story_ended = 1;
				removeClass(_seb,'animate-me-1500');
				removeClass(_seb,'rise-up');
				_seb.style.background = '#232323';
				_seb.innerText = 'LEVEL UP!';
				addClass(_seb,'level-up');
				PlaySound({key:'levelup', volume:.2});
				_sl.innerText = 'Lvl 2';
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
		PlaySound({key:'storyfinish', volume:1});
		setTimeout(function () { 
			PlaySound({key:'ironx3', volume:.4});	 
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