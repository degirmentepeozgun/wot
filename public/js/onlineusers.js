'use strict';
(function () {
	console.log('onlineusers');
	let _onlineListTimer = null;
	function clearOnlineListTimer() {
		if (_onlineListTimer) {
			clearInterval(_onlineListTimer);
			_onlineListTimer = null;
		}
	}
	function onlineusers() {
		this.key = 'onlineuser';
		this.tutorial = {
			tr: {
				title: 'Çevrimiçi Oyuncular',
				desc: 'Tüm dünyada şu anda oyunda olan diğer oyuncuları burada görebilir, düello teklif edebilirsiniz. Düello teklif ettiğinizde sistem sizden bir karakter seçmenizi ister. Aynı şekilde siz karakterinizi belirlediğinizde seçiminiz ve isteğiniz karşı tarafa iletilir. Müsait olunduğu ve kabul edildiği taktirde iki taraf da Arena haritasına ışınlanır ve her iki tarafın da güçleri eşit olacak adil bir şekilde müsabaka başlar.'
			},
			en: {
				title: 'Online Players',
				desc: "Here, you can see other players currently playing around the world and challenge them to a duel. When you challenge a duel, the system prompts you to choose a character. Similarly, once you select your character, your choice and request are communicated to the other player. If available and accepted, both players are teleported to the Arena map, and a fair match begins, with both sides' strengths being equal."
			}
		};
		if (!tryShowMenuTutorial(this.key)) this.tutorial = undefined;
		this.render = function () {
			updateMenuBottom(3);
			const _container = selectMenuContainer();
			const _content = showMenuTutorial(this.tutorial, this.key);
			_container.innerHTML =
				'<div data-module="onlineusers" class="menu-ui-left fade-me">' +
				'<div class="menu-modal-left menu-modal-left-content w-100">' +
				'<div class="skills-content-left fragments-content-left menu-modal-left-container">' +
				'<div id="online-users-list" style="overflow-y:auto" class="full">' +
				this.getOnlineUsers() +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div data-module="onlineusers" class="menu-ui-right fade-me">' +
				'<div class="menu-modal-right menu-modal-right-content w-100">' +
				'<div class="skills-content-right fragments-content-right">' +
				'<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">' +
				_content +
				'<div id="shine"></div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';
			clearOnlineListTimer();
			const self = this;
			_onlineListTimer = setInterval(function () {
				self.pullOnlineUsers();
			}, 5000);
		};
		this.refreshing = false;
		this.pullOnlineUsers = async function () {
			const _root = document.getElementById('online-users-list');
			if (!_root) {
				clearOnlineListTimer();
				return;
			}
			if (this.refreshing) return;
			this.refreshing = true;
			try {
				if (typeof fetchOnlineUsers === 'function') await fetchOnlineUsers();
				const _still = document.getElementById('online-users-list');
				if (!_still) {
					clearOnlineListTimer();
					return;
				}
				_still.innerHTML = this.fillOnlineUsers();
			} catch (err) {
				console.warn(err);
			} finally {
				this.refreshing = false;
			}
		};
		this.fillOnlineUsers = function () {
			let _html = '',
				_counter = 0;
			const _users = (__onlineUsers ?? [])
				.slice()
				.sort((a, b) => new Date(b.connectedAt) - new Date(a.connectedAt));
			for (let ou of _users) {
				if (ou.socketId === __socketId) continue;
				const _minute = MathFloor(ou.onlineDuration / 60000);
				let _valid;
				if (_minute < 60 && _minute > 0) _valid = _minute + getLangData('m');
				else if (_minute > 59) _valid = MathFloor(_minute / 60) + getLangData('h');
				_html += `<div onexactclick="" class="online-user-card skill-card animate-me flex">
								<div class="skill-icon-wrapper flex">
									<img style="margin-left:.6cqh;padding:5%;border-radius:100%;border-color:#f3f4f5ab !important" src="./images/icons/player.png" />
								</div>
								<div style="flex:1;height:100%" class="flex flex-jc-end">
									<div class="w-100 flex" style="height:50%">
										<div class="w-50 flex flex-jc-start" style="color:#d7b671;height:100%;padding-left:2cqh">
											${ou.name}
										</div>
										<div class="w-50 flex flex-jc-end${ou.isBusy ? ' fire' : ' toxic'}" style="height:100%;padding-right:3cqh">
											${ou.isBusy ? getLangData('Busy') : getLangData('Available')}
										</div>
									</div>
									<div class="w-100 flex" style="height:50%">
										<div class="w-50 flex flex-jc-start${_valid ? '' : ' v-none'}" style="height:100%;padding-left:2cqh">
											${getLangData('Online')}:&nbsp;<span style="color:#f3f4f5ab">${_valid}</span>
										</div>
										<div class="w-50 flex flex-jc-end" style="height:100%;padding-right:2cqh">
											<div class="game-menu-button animate-me flex" onexactclick="getRef(\'onlineusers\').askDuelWithSelectingCharacter('${ou.socketId}')" style="height:75%;padding:0 10%"><div class="flex" style="color:#ff6c00 !important">${getLangData('Duel')}</div></div>
										</div>
									</div>
								</div>
							</div>`;
				_counter++;
				if (_counter > 99) break;
			}
			if (_html === '')
				_html = `<div class="full flex wot-subtitle" style="color:#f3f4f580 !important">${getLangData('No players online')}</div>`;
			return _html;
		};
		this.getOnlineUsers = function () {
			this.loading = 1;
			setTimeout(() => {
				const _cont = document.getElementById('online-users-list');
				if (_cont) _cont.innerHTML = this.fillOnlineUsers();
				this.loading = 0;
			}, 1000);
			return `<div class="full flex"><img style="width:18%;opacity:.5;aspect-ratio:1/1" src="./images/icons/loader.gif" /></div>`;
		};
		this.askDuel = function (_id) {
			askSomething(
				'Request a duel battle',
				"getRef(\'onlineusers\').askDuelWithSelectingCharacter(\'" + _id + "\')",
				'modal_2x1'
			);
		};
		this.selectCharacter = function (_class) {
			playClick();
			document.querySelectorAll('.selection-char').forEach((x) => removeClass(x, 'selected-character'));
			const _clicked = document.querySelector('.selection-char[data-class="' + _class + '"]');
			addClass(_clicked, 'selected-character');
			__selectedPvPClass = _class;
		};
		this.acceptDuel = function (_id) {
			const _clicked = document.querySelector('.selection-char.selected-character');
			const _class = _clicked.getAttribute('data-class');
			this.requestDuel(_id, _class);
		};
		this.askDuelWithSelectingCharacter = function (_id) {
			closeInventoryQuestionModal(1);
			playClick();
			let _choices = '',
				_selected = 1;
			__selectedPvPClass = _selectableChars[0].class;
			for (let _item of _selectableChars) {
				_choices += `<div data-class="${_item.class}" class="selection-item selection-char${_selected ? ' selected-character' : ''} flex" onexactclick="getRef(\'onlineusers\').selectCharacter(\'${_item.class}\')" style="width:21%;aspect-ratio:1/1;position:relative;cursor:pointer">
					<img src="./images/main/avatars/${_item.class}.png" style="padding:2%;height:80%" class="grade${_item.grade}-item" />
				</div>`;
				if (_selected) _selected = 0;
			}
			let _modal =
				`<div data-singleton-key="modal_middle" class="full fade-me flex inventory-question">
				<div class="inventory-modal">
					<div class="flex question-modal-title-wrapper">
						<div class="wot-title">${getLangData('Select A Character')}</div>
					</div>
					<div class="flex question-modal-desc">` +
				_choices +
				`</div>
					<div class="flex new-game-menu-buttons">
						<div class="new-game-menu-button flex animate-me" onexactclick="closeInventoryQuestionModal()">${getLangData('CANCEL')}</div>
						<div id="item-selection-approve-btn" class="new-game-menu-button flex animate-me" onexactclick="getRef(\'onlineusers\').acceptDuel(\'${_id}\')">${getLangData('APPROVE')}</div>
					</div>
				</div>
			</div>`;
			const _div = document.createElement('div');
			_div.innerHTML = _modal;
			document.querySelector('#menu-ui').appendChild(_div.firstChild);
		};
		this.requestDuel = function (_id, _class) {
			sendMessage({
				c: 'request-duel',
				n: __account.name,
				s: __socketId,
				cl: _class,
				t: _id
			});
			closeInventoryQuestionModal();
			warn(
				'<div class="flex important achievement" style="position:relative"><span style="text-shadow:0 0 .8cqh #000;color:#ffffffcc !important;flex:1">' +
					getLangData('Duel request sent') +
					'!</span></div>',
				null,
				null,
				1
			);
		};
		return this;
	}
	window.onlineusers = onlineusers;
})();
