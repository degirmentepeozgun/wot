'use strict';
function renderDailyLottery() {
    updateMenuBottom(7);
    const _container = selectMenuContainer();
	_container.innerHTML = 
	`<div class="book-page-wrapper lottery-container fade-me">
		<div class="flex book-page-bg">
			<div class="full flex book-page-bg-inner" style="height:86%">
				<div class="flex spinner-bg-wrapper">
					<img id="spinner-bg" src="./images/icons/spinnerbg0.png" style="" />
					<div id="spinner-bg2">
					</div>
					<img id="spinner-img" src="./images/icons/spinnerfg.png" class="full" />
					<div id="spinner-btn" class="flex animate-me" onclick="spinLottery()">
						
					</div>
				</div>
			</div>
		</div>
	</div>`;
	checkIfLotteryAvailable();
}

const _giftOrder = [
	{ key: 'pot', type: 'pot' },
	{ key: 'ticket-item', type: 'misc' },
	{ key: 'gold', type: 'gold' },
	{ key: 'ticket-exp', type: 'misc' },
	{ key: 'ticket-random', type: 'misc' },
	{ key: 'ticket-item-selection', type: 'misc' },
	{ key: 'chest', type: 'misc' },
	{ key: 'ticket-gold', type: 'misc' },
];
function spinLottery() {
	const _lot = __account.missions.find(x => x.key === 'lottery');
	if(_lot.lastActivity && ((_lot.lastActivity + (1000 * 60 * 60 * 24)) > Date.now()))
		return;
	addClass(document.getElementById('spinner-btn'), 'disabled');
	var style = getComputedStyle(document.documentElement);
	var minRate = 45 / 900;
	var currentRate = parseInt(style.getPropertyValue('--spin-rate'));
	var itemOrder = getRandomValue(0, 7);
	const root = document.querySelector(':root');
	root.style.setProperty('--spin-rate', currentRate + (minRate * itemOrder));
	var currentRate2 = parseInt(style.getPropertyValue('--spin-rate2'));
	var itemOrder2 = getRandomValue(0, 7);
	root.style.setProperty('--spin-rate2', currentRate2 + (minRate * itemOrder2));
	PlaySound({key:'click'});
	setTimeout(function() {
		const sbg = document.getElementById('spinner-bg');
		const sbg2 = document.getElementById('spinner-bg2');
		addClass(sbg, 'spin-me');
		sbg.src = sbg.src.replace('0.png', '.png');
		sbg2.style.background = sbg2.style.background.replace('bg0.png', '-bgf.png');
		addClass(sbg2, 'spin-me2');
		PlaySound({key:'spinner', volume: .5});
		setTimeout(function() {
			setTimeout(function() {
				PlaySound({key:'gift', volume: .5});
				setTimeout(function() {
					checkIfLotteryAvailable();
					removeClass(document.getElementById('spinner-bg'), 'spin-me');
					removeClass(document.getElementById('spinner-bg2'), 'spin-me2');
					removeClass(document.getElementById('spinner-btn'), 'disabled');
					sbg.src = sbg.src.replace('.png', '0.png');
					sbg2.style.background = sbg2.style.background.replace('-bgf.png', 'bg0.png');
				}, 2000);
				warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[itemOrder].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, null, 1);
				warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[itemOrder2].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, null, 1);
				getChestReward(__account.grade ?? 1, _giftOrder[itemOrder].type, _giftOrder[itemOrder].key);
				getChestReward(__account.grade ?? 1, _giftOrder[itemOrder2].type, _giftOrder[itemOrder2].key);
				_lot.lastActivity = Date.now();
				_client.saveState();
				checkUpdateAvailable();
				let itemOrder3;
				if(itemOrder === itemOrder2){
					PlaySound({key:'clap', volume:.3});
					itemOrder3 = getRandomValue(0, _giftOrder.length - 1);
					warn('<div class="flex achievement jackpot important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[itemOrder3].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">!!!' + getLangData('JACKPOT') + '!!!</span></div>', null, null, 1);
					getChestReward(__account.grade ?? 1, _giftOrder[itemOrder3].type, _giftOrder[itemOrder3].key);
				}
			}, 500);
		}, 2500);
	},300);
}

function checkIfLotteryAvailable() {
	const _lot = __account.missions.find(x => x.key === 'lottery');
	document.getElementById('spinner-btn').innerText = getLangData('SPIN');
	if(_lot.lastActivity && ((_lot.lastActivity + (1000 * 60 * 60 * 24)) > Date.now()))
	{
		var _scr = selectMenuContainer();
		var _block = document.getElementById('lottery-block');
		if(!_block){
			_block = document.createElement('div');
			_block.id = "lottery-block";
			_block.className = "full flex event-block";
			_block.innerHTML = `<div class="spin-block flex">
									<div class="flex w-100 next-spin">${getLangData('Next Spin')}</div>
									<div class="flex w-100 next-spin-until">${getTimeDiffUntilReset()}</div>
								</div>`;
			_scr.appendChild(_block);
		}
		return false;
	}
	return 1;
}