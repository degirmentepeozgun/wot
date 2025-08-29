'use strict';
function dailylogin() {
	const _rewards = [
		{ key:'gold', iconPath:'./images/icons/gold.png', value:5000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:1},
		{ key:'ticket-random', iconPath:'./images/icons/ticket-random.png', value:2},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:10000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:10},
		{ key:'ticket-pass', iconPath:'./images/icons/ticket-pass.png', value:2},
		{ key:'fragment', iconPath:'./images/fragments/random.png', value:5},

		{ key:'gold', iconPath:'./images/icons/gold.png', value:10000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:2},
		{ key:'ticket-gold', iconPath:'./images/icons/ticket-gold.png', value:5},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:20000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:20},
		{ key:'ticket-pass', iconPath:'./images/icons/ticket-pass.png', value:5},
		{ key:'fragment', iconPath:'./images/fragments/random.png', value:10},

		{ key:'gold', iconPath:'./images/icons/gold.png', value:20000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:3},
		{ key:'ticket-item', iconPath:'./images/icons/ticket-item.png', value:10},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:30000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:30},
		{ key:'ticket-pass', iconPath:'./images/icons/ticket-pass.png', value:10},
		{ key:'fragment', iconPath:'./images/fragments/random.png', value:15},

		{ key:'gold', iconPath:'./images/icons/gold.png', value:30000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:4},
		{ key:'ticket-item-selection', iconPath:'./images/icons/ticket-item-selection.png', value:3},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:40000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:40},
		{ key:'ticket-pass', iconPath:'./images/icons/ticket-pass.png', value:15},
		{ key:'fragment', iconPath:'./images/fragments/random.png', value:20},
	];
	this.render = function(_noAnimation) {
		let _html = 
		'<div data-module="dailylogin" class="book-page-wrapper daily-login-container shop-container' + (_noAnimation ? '' : ' fade-me') + '">' +
			'<div class="flex book-page-bg">'
				+ this.organizeMonthlyRewards() +
			'</div>' +
		'</div>';
		updateMenuBottom(7);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
	}
	this.organizeMonthlyRewards = function() {
		let _html = '', i = 1, _current = new Date().getDate();
		for(let _r of _rewards) {
			const _looted = __account.monthlyLogins.indexOf(i) !== -1;
			_html += `<div${((i === _current && !_looted) ? ' onclick="getRef(\'dailylogin\')?.getMonthlyReward(' + (i - 1) + ')"' : '')} class="daily-login-item flex${(i < _current || _looted) ? ' passed' : (i === _current ? ' current' : '')}" style="background:url(./images/ui/square.png)">
				<div class="w-100 flex daily-login-item-day">
					${getLangData('Day')}&nbsp;${i}
				</div>			
				<div class="w-100 flex">
					<img src='${_r.iconPath}' />
				</div>
				<div class="w-100 flex daily-login-item-title">
					x&nbsp;${_r.value.formatWithDots()}
				</div>
				<div class="passed-splash${_looted ? '' : ' no-loot'}"></div>
			</div>`;
			i++;
		}
		return _html;
	}
	this.getMonthlyReward = function(_index) {
		const _item = _rewards[_index];
		warnChestReward(getChestReward(_item.grade ?? 1, _item.key, null, _item.value));
    	__account.monthlyLogins.push(_index + 1);
		_client.saveState();
		this.render(1);
	}
	return this;
}