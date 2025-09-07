'use strict';
function war() {
	this.unlockLevel = 10;
	this.findOpponents = function () {
		this.opponents = [];
		const _place = getRandomValue2(1, 6);
		for(var i = 1; i < 7; i++) {
			if(i === _place){
				mainCharacter.totalPower = getTotalPower().total;
				this.opponents.push(mainCharacter);
				continue;
			}
			const _e = setCharacterFunctions(_allEnemies['enemy0' + getRandomValue2(1, 3)](), 1);
			_e.level = MathRound(getRandomValue2((mainCharacter.level - (this.unlockLevel / 2)) < this.unlockLevel ? this.unlockLevel : mainCharacter.level - (this.unlockLevel / 2), mainCharacter.level + (this.unlockLevel / 2)));
			_e.inventory = getRandomItems(2, _e.class);
			_e.inventory.forEach(x => x.weared = _e.class);
			_e.totalPower = getTotalPower(_e).total;
			this.opponents.push(_e);
		}
		
	}
	this.render = function(_noAnimation) {
		let _content;
		if(mainCharacter.level < this.unlockLevel)
			_content = renderLockedContent('Level ' + this.unlockLevel + ' required');
		else
			_content = `<div id="war-match-opponents" class="full flex"></div>
				<div class="flex full" style="position:absolute">
					<img class="d-none war-loading" src="./images/icons/war.png" />
					<div class="flex game-btn2 animate-me" onexactclick="getRef(\'war\')?.match()">${getLangData('MATCH').toLocaleUpperCase(getLang())}</div>
				</div>`;
		let _html = 
		`<div data-module="war" class="book-page-wrapper war-container shop-container${_noAnimation ? '' : ' fade-me'}">
			<div class="flex book-page-bg" style="position:relative">`
				+ _content +
			`</div>
		</div>`;
		updateMenuBottom(4);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
	}
	this.match = async function() {
		if(_warMatchInProgress)
			return;
		if(episode && episode.bgMusic)
			episode.pauseBgMusic(1);
		if(episode && episode.bgSound)
			episode.pauseAmbianceMusic();
		_warMatchInProgress = true;
		const _btn = document.querySelector('.war-container .game-btn2');
		addClass(_btn, 'd-none');
		const _loading = document.querySelector('.war-container .war-loading');
		addClass(_loading, 'fade-me');
		removeClass(_loading, 'd-none');
		PlaySound({key:'warstart', volume:.7});
		this.findOpponents();
		const _container = document.getElementById('war-match-opponents');
		await delay(1000);
		for(let i = 1; i < 7; i++) {
			const _team = i < 4 ? 1 : 2;
			const _op = this.opponents[i - 1];
			PlaySound({key:'warselect', volume:1, reset: true});
			const row = document.createElement('div');
			row.className = 'fade-me flex war-player-card war-player-card-' + i + (_op === mainCharacter ? ' war-player-card-me' : '');
			row.innerHTML = `<div class='war-player-card-left flex'>
				<div class='flex war-player-card-left-content war-player-team-${_team}'>${i}</div>
			</div>
			<div class='war-player-card-medium flex'>
				<div class='war-player-card-medium-content flex'><img src="./images/icons/${_op.class}.png" /></div>
			</div>
			<div class='war-player-card-right flex flex-jc-start'>
				<div class='war-player-card-right-top flex flex-jc-start w-100 one-line'>${_op.class}</div>
				<div class='war-player-card-right-bottom flex w-100 flex-jc-start one-line'>Power:&nbsp;${_op.totalPower.formatWithDots()}</div>
			</div>`;
			_container.appendChild(row);
			await delay(1000);
		}
		PlaySound({key:'enter', volume:.5});
		_warMatchInProgress = false;
		createWar(this.opponents);
	}
	return this;
}