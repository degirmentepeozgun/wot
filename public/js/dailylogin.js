'use strict';
console.log('daily login');
function dailylogin() {
	const _rewards = [
		{ key:'gold', iconPath:'./images/icons/gold.png', value:5000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:1},
		{ key:'ticket-random', type: 'misc', iconPath:'./images/icons/ticket-random.png', value:2},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:10000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:10},
		{ key:'ticket-pass', type: 'misc', iconPath:'./images/icons/ticket-pass.png', value:2},
		{ key:'fragment', iconPath:'./images/fragments/random.png', value:5},

		{ key:'gold', iconPath:'./images/icons/gold.png', value:10000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:2},
		{ key:'ticket-gold', type: 'misc', iconPath:'./images/icons/ticket-gold.png', value:5},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:20000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:20},
		{ key:'ticket-pass', type: 'misc', iconPath:'./images/icons/ticket-pass.png', value:5},
		{ key:'fragment', iconPath:'./images/fragments/random.png', value:10},

		{ key:'gold', iconPath:'./images/icons/gold.png', value:20000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:3},
		{ key:'ticket-item', type: 'misc', iconPath:'./images/icons/ticket-item.png', value:10},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:30000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:30},
		{ key:'ticket-pass', type: 'misc', iconPath:'./images/icons/ticket-pass.png', value:10},
		{ key:'fragment', iconPath:'./images/fragments/random.png', value:15},

		{ key:'gold', iconPath:'./images/icons/gold.png', value:30000},
		{ key:'pot', iconPath:'./images/icons/pot.png', value:4},
		{ key:'ticket-item-selection', type: 'misc', iconPath:'./images/icons/ticket-item-selection.png', value:3},
		{ key:'gold', iconPath:'./images/icons/gold.png', value:40000},
		{ key:'ticket', iconPath:'./images/icons/key.png', value:40},
		{ key:'ticket-pass', type: 'misc', iconPath:'./images/icons/ticket-pass.png', value:15},
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
		const _date = new Date();
		let _html = '', i = 1, _current = _date.getDate();
		const _month = _date.getMonth() + 1;
		const _year = _date.getFullYear();
		for(let _r of _rewards) {
			const _key =i.toString()+'-'+ _month.toString()+ '-' + _year.toString();
			const _looted = __account.monthlyLogins.indexOf(_key) !== -1;
			_html += `<div${((i === _current && !_looted) ? ' onexactclick="getRef(\'dailylogin\')?.getMonthlyReward(' + (i - 1) + ', \'' + _key + '\')"' : '')} class="daily-login-item flex${(i < _current || _looted) ? ' passed' : (i === _current ? ' current' : '')}" style="background:url(./images/ui/square.png)">
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
	this.getMonthlyReward = function(_index, _key) {
		const _item = _rewards[_index];
		warnChestReward(getChestReward(_item.grade ?? 1, _item.type ?? _item.key, _item.key, _item.value));
    	__account.monthlyLogins.push(_key);
		_client.saveState();
		this.render(1);
		checkUpdateAvailable2(8);
	}
	return this;
}