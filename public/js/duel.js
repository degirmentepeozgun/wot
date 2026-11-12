'use strict';
(function() {
	function duel() {
	this.key = 'duel';
	this.rooms = [
		{ 
			n: 'P-O-G-O',
			s: '12345',
			t: 0,
			p: [
				{ 
					c: 'warrior', 
					n: 'Basat', 
					s: '1234',
					p: 213,
					l: 1,
					t: 1,
					r: 1
				},
				{ 
					c: 'archer', 
					n: 'Legolas', 
					s: '1235',
					p: 198,
					t: 1,
					r: 1
				},
				{ 
					c: 'cyclops', 
					n: 'Popeye', 
					s: '1236',
					p: 177,
					t: 2,
					r: 1
				},
				{ 
					c: 'archer', 
					n: 'Alkin', 
					s: '1237',
					p: 188,
					t: 2,
					r: 0
				}
			],
			dummy: 1
		},
		{ 
			n: 'Champions League', 
			s: '54321',
			t: 1,
			pwd: '123456', // bu normalde sunucudan socket ile gelmeyecek t:1 veya t:0 gelecek, 1 private 0 ise public demek
			p: [
				{ 
					c: 'archer', 
					n: 'Daywalker', 
					s: '1238',
					p: 443,
					l: 1,
					t: 1,
					r: 1
				},
				{ 
					c: 'thief', 
					n: 'Arven', 
					s: '1239',
					p: 567,
					t: 2,
					r: 0
				}
			],
			dummy: 1
		}
	];
	this.dummyRooms = this.rooms;
	this.serverRooms = [];
	this.botChars = {};
	this.render = function(_noAnimation) {
		updateMenuBottom(4);
		this.roomType = 'public';
		const _container = selectMenuContainer();
		_container.innerHTML =
		`<div data-module='duel' class="menu-ui-left${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-left menu-modal-left-content">
				<div class="skills-content-left stories-content-left duel-content-left menu-modal-left-container">
					<div style="overflow-y:auto" class="full duel-rooms-container">`
						+ this.getRooms() +
					`</div>
				</div>
			</div>
		</div>
		<div data-module='duel' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right menu-modal-right-content">
				<div class="skills-content-right stories-content-right duel-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important"></div>
				</div>
			</div>
		</div>`;
		this.renderCreateRoomUI(_noAnimation);
		this.loadRooms();
	}
	this.getRooms = function() {
		let _html = '';
		for (let i = 0; i < this.rooms.length; i++) {
			const _r = this.rooms[i];
			const _owner = _r.p?.find(x => x.l);
			if(!_owner)
				continue;
			const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _owner.c) : undefined;
			const _grade = _ch?.grade ?? 3;
			const _vis = !_r.t ? getLangData('Public') : getLangData('Private');
			const _visClass = _r.t === 1 ? 'fire' : 'toxic';
			_html += `<div id="duel-card-${_r.s}" data-key="${i}" class="skill-card duel-card flex animate-me">
				<div class="skill-icon-wrapper flex">
					<img class="grade${_grade}-item" src="./images/main/avatars/${_owner.c}.png" />
				</div>
				<div class="flex" style="flex:1;height:100%;padding:1cqh 1cqh 1cqh 0;min-width:0">
					<div class="flex flex-jc-start skill-card-title w-100" style="height:34%">${_r.n ?? ''}</div>
					<div class="story-level flex flex-jc-start w-100" style="height:33%">${_owner.n ?? ''}</div>
					<div id="duel-room-players-count-${_r.s}" class="story-consume flex flex-jc-start w-100" style="height:33%">${_r.p?.length ?? 0} / 6</div>
				</div>
				<div class="flex flex-jc-start" style="height:100%;width:30%;flex-direction:column;justify-content:space-between;padding:.6cqh 0">
					<div class="w-100 flex flex-jc-end ${_visClass} room-visibility" style="height:40%">${_vis}</div>
					<div style="height:0%;flex:1"></div>
					<div onexactclick="event.stopPropagation();getRef('duel')?.JoinRoom('${_r.s}')" class="list-item-btn animate-me flex" style="height:42%;width:100%;margin:0 0 6% 0">
						<div class="flex">${getLangData('Join Room')}</div>
					</div>
				</div>
			</div>`;
		}
		return _html;
	}
	this.renderCreateRoomUI = function(_noAnimation) {
		const _right = document.querySelector('.duel-content-right .menu-modal-right-container');
		if (!_right)
			return;
		_right.innerHTML = `<div class="flex full show-ui duel-detail story-detail${_noAnimation ? '' : ' fade-me'}">
		<div class="flex duel-create-room-container full">
			<div class="flex w-100 duel-create-room-title">
				<div class="flex duel-create-room-title-item">
					${getLangData('Create New Room')}
				</div>
			</div>
			<div class="flex w-100 duel-create-room-input">
				<img src="./images/ui/game/duel-rn-icon.png" />
				<input placeholder="${getLangData('Room Name')}" id="duel-room-name" class="duel-room-input" type="text" maxlength="20" autocomplete="off" />
			</div>
			<div class="flex w-100 duel-create-room-input gray">
				<img src="./images/ui/game/duel-pwd-icon.png" />
				<input placeholder="${getLangData('Password')}" id="duel-room-password" class="duel-room-input" type="text" maxlength="20" autocomplete="off" />
			</div>
			<div class="flex w-100 duel-create-room-types">
				<div class="flex duel-create-room-types-wrapper">
					<div class="flex w-50 duel-create-room-type-item" onexactclick="getRef('duel')?.SwitchRoomType('public')">
						<img class="duel-create-room-type-public" src="./images/ui/game/duel-radio-active.png" />
						<div class="flex">${getLangData('Public')}</div>
					</div>
					<div class="flex w-50 duel-create-room-type-item" onexactclick="getRef('duel')?.SwitchRoomType('private')">
						<img class="duel-create-room-type-private" src="./images/ui/game/duel-radio-passive.png" />
						<div class="flex">${getLangData('Private')}</div>
					</div>
				</div>
			</div>
			<div class="flex w-100 duel-create-room-button">
				<div class="flex duel-create-room-button-item" onexactclick="getRef('duel')?.CreateRoom()">
					${getLangData('Create Room')}
				</div>
			</div>
		</div>
		</div>`;
	}
	this.TryJoinRoom = function(_roomId) {
		const _room = this.roomById(_roomId);
		if(!_room)
			return;
		const _password = document.querySelector('#duel-join-room-password')?.value?.trim() || '';
		if(_room.dummy && _password !== _room.pwd) {
			warn('<span>' + getLangData('Wrong Password') + '</span>', 'warn');
			return;
		}
		closeInventoryQuestionModal();
		this.JoinRoom(_roomId, 1, _password);
	}
	this.JoinRoom = function(_roomId, _pass, _password) {
		const _room = this.roomById(_roomId);
		if(!_room)
			return;
		if(_room.dummy)
			return this.joinDummyRoom(_room, _pass);
		if((_room.p?.length ?? 0) >= 6) {
			warn('<span>' + getLangData('Room is full') + '</span>', 'warn');
			return;
		}
		if(_room.p?.find(x => x.s === mainCharacter.socketId)) {
			this.renderJoinRoomUI(_roomId, 1, 1);
			return;
		}
		if(_room.t && !_pass) {
			askSomething(
			`<div class="flex w-100 duel-create-room-input">
				<input placeholder="${getLangData('Enter Room Password')}" id="duel-join-room-password" class="duel-room-input" type="text" maxlength="20" autocomplete="off" />
			</div>`, `getRef(\'duel\')?.TryJoinRoom(\'${_roomId}\')`, 'modal_2x1');
			return;
		}
		this.joinServerRoom(_roomId, _password || '');
	}
	this.joinDummyRoom = function(_room, _pass) {
		if((_room.p?.length ?? 0) >= 6 && !_room.p?.some(x => x.s === mainCharacter.socketId)) {
			warn('<span>' + getLangData('Room is full') + '</span>', 'warn');
			return;
		}
		if(_room.p?.find(x => x.s === mainCharacter.socketId)) {
			this.renderJoinRoomUI(_room.s);
			return;
		}
		if(_room.t && !_pass) {
			askSomething(
			`<div class="flex w-100 duel-create-room-input">
				<input placeholder="${getLangData('Enter Room Password')}" id="duel-join-room-password" class="duel-room-input" type="text" maxlength="20" autocomplete="off" />
			</div>`, `getRef(\'duel\')?.TryJoinRoom(\'${_room.s}\')`, 'modal_2x1');
			return;
		}
		if(this.roomId && this.roomId !== _room.s) {
			const _current = this.roomById(this.roomId);
			if(_current && !_current.dummy) {
				this.leaveServerRoom(() => this.joinDummyRoom(_room, _pass));
				return;
			}
			this.leaveDummyLocal();
		}
		delete mainCharacter.leader;
		const _bluePlayers = _room.p?.filter(x => x.t === 1) ?? [];
		const _redPlayers = _room.p?.filter(x => x.t === 2) ?? [];
		const _myTeam = _bluePlayers.length <= _redPlayers.length ? 1 : 2;
		_room.p.push({
			c: mainCharacter.class,
			n: __account.name,
			s: mainCharacter.socketId,
			p: getTotalPower().total,
			t: _myTeam,
			r: 0
		});
		this.updateRoomPlayersCount(_room.s);
		this.renderJoinRoomUI(_room.s);
	}
	this.updateRoomPlayersCount = function(_roomId) {
		const _room = this.rooms.find(x => x.s === _roomId);
		if(!_room)
			return;
		const _el = document.getElementById(`duel-room-players-count-${_roomId}`);
		if(_el)
			_el.innerHTML = (_room.p?.length ?? 0) + ' / 6';
	}
	this.rollClassPower = function(_class) {
		const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _class) : undefined;
		const _src = _ch ? _allEnemies['enemy' + _ch.id] : undefined;
		if(!_src)
			return 0;
		const _e = setCharacterFunctions(_src(), 1);
		_e.level = 10;
		_e.inventory = getRandomItems(2, _e.class);
		_e.inventory.forEach(x => x.weared = _e.class);
		return getTotalPower(_e).total || 0;
	}
	this.PickClass = async function(_botId) {
		if(this.pending || typeof _selectableChars === 'undefined')
			return;
		const _room = this.roomById(this.roomId);
		if(!_room)
			return;
		this.pickBotId = _botId || undefined;
		const _seat = _botId ? _room.p.find(x => x.id === _botId) : _room.p.find(x => x.s === mainCharacter.socketId);
		if(!_seat)
			return;
		if(!_botId && _seat.r) {
			if(_room.dummy) {
				_seat.r = 0;
				this.renderJoinRoomUI(this.roomId, 1, 1);
			}
			else {
				this.pending = 1;
				try {
					const _res = await this.invoke('DuelUnready');
					if(!this.afterInvoke(_res))
						return;
				}
				finally {
					delete this.pending;
				}
			}
		}
		const _current = _seat.c || _selectableChars[0].class;
		__selectedPvPClass = _current;
		let _choices = '';
		for(const _item of _selectableChars) {
			_choices += `<div data-class="${_item.class}" class="selection-item selection-char${_item.class === _current ? ' selected-character' : ''} flex" onexactclick="selectDuelCharacter('${_item.class}')" style="width:21%;aspect-ratio:1/1;position:relative;cursor:pointer">
				<img src="./images/main/avatars/${_item.class}.png" style="padding:2%;height:84%" class="grade${_item.grade}-item" />
			</div>`;
		}
		closeInventoryQuestionModal();
		const _modal = `<div data-singleton-key="modal_square_duel" class="duel-char-selection full fade-me show-ui flex inventory-question">
			<div class="inventory-modal">
				<div class="flex w-100 question-modal-title-wrapper duel-char-selection-title-wrapper">
					<div class="flex question-modal-title">${getLangData('Choose your character')}</div>
				</div>
				<div class="flex w-100 question-modal-choices duel-char-selection-choices">${_choices}</div>
				<div class="flex new-game-menu-buttons duel-char-selection-buttons">
					<div class="new-game-menu-button flex animate-me" onexactclick="closeInventoryQuestionModal()">${getLangData('CANCEL')}</div>
					<div class="new-game-menu-button flex animate-me" onexactclick="getRef('duel')?.ConfirmClass()">${getLangData('APPROVE')}</div>
				</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		(document.querySelector('#menu-ui') ?? _gameUI).appendChild(_div.firstChild);
		playClick(1);
	}
	this.ConfirmClass = async function() {
		const _class = __selectedPvPClass;
		if(!_class || this.pending)
			return;
		closeInventoryQuestionModal();
		const _power = this.rollClassPower(_class);
		if(this.pickBotId)
			return this.confirmBotClass(_class, _power);
		this.pending = 1;
		try {
			const _res = await this.invoke('DuelClass', _class, _power);
			if(!this.afterInvoke(_res))
				return;
		}
		finally {
			delete this.pending;
		}
	}
	this.confirmBotClass = async function(_class, _power) {
		const _room = this.roomById(this.roomId);
		const _bot = _room?.p?.find(x => x.id === this.pickBotId);
		if(!_bot)
			return;
		if(_room.dummy) {
			_bot.c = _class;
			_bot.p = _power;
			_bot.r = 1;
			this.renderJoinRoomUI(this.roomId, 1, 1);
			return;
		}
		const _index = _room.p.indexOf(_bot);
		const _ch = _selectableChars.find(x => x.class === _class);
		const _src = _ch ? _allEnemies['enemy' + _ch.id] : undefined;
		if(_src) {
			const _e = setCharacterFunctions(_src(), 1);
			_e.aiId = _bot.id;
			_e.name = _bot.n;
			_e.level = 10;
			_e.inventory = getRandomItems(2, _e.class);
			_e.inventory.forEach(x => x.weared = _e.class);
			_e.totalPower = _power;
			this.botChars[_bot.id] = _e;
		}
		this.pending = 1;
		try {
			const _res = await this.invoke('DuelBot', _bot.id, _bot.n, _class, _power, _bot.t, _index);
			this.afterInvoke(_res);
		}
		finally {
			delete this.pending;
		}
	}
	this.RePickBot = function(_botId) {
		const _room = this.roomById(this.roomId);
		if(!_room)
			return;
		const _bot = _room.p.find(x => x.id === _botId);
		if(!_bot)
			return;
		this.PickClass(_botId);
	}
	this.AddBot = function(_roomId, _teamNo, _specificIndex) {
		const _room = this.roomById(_roomId);
		if(!_room)
			return;
		if(!_room.dummy)
			return this.addServerBot(_room, _teamNo, _specificIndex);
		if(_specificIndex === undefined) {
			const _players = _room.p.filter(x => x.team === _teamNo);
			if(_players?.length >= 3)
				return;
		}
		const _char = createRandomPlayer(mainCharacter.level);
		_char.aiId = getRandomString(5);
		_char.name = 'BOT' + getRandomValue2(1000, 9999);
		const _bot = {
			c: _char.class, 
			n: _char.name, 
			p: _char.totalPower,
			char: _char,
			id: _char.aiId,
			t: _teamNo,
			r: 1
		};
		if(_specificIndex === undefined)
			_room.p.push(_bot);
		else
			_room.p[_specificIndex] = _bot;
		this.updateRoomPlayersCount(_roomId);
		this.renderJoinRoomUI(_roomId, 1);
	}
	this.renderJoinRoomUI = function(_roomId, _noAnimation, _noSound) {
		const _room = this.roomById(_roomId);
		if(!_room)
			return;
		const _right = document.querySelector('.duel-content-right .menu-modal-right-container');
		if (!_right)
			return;
		this.roomId = _roomId;
		this.openRoomChat(_room);
		if(!_noSound)
			playClick(1);
		const _bluePlayers = _room.p?.filter(x => x.t === 1)??[];
		const _redPlayers = _room.p?.filter(x => x.t === 2)??[];
		const _humans = _room.p?.filter(x => x.s) ?? [];
		const _canStart = !!mainCharacter.leader && _humans.length > 0 && _humans.every(x => x.r) && _bluePlayers.length > 0 && _redPlayers.length > 0;
		let _blueHTML = '';
		for (let i = 0; i < _bluePlayers.length; i++) {
			const _p = _bluePlayers[i];
			const _isMe = _p.s === mainCharacter.socketId;
			const _isMeOrLeader = _isMe || mainCharacter.leader;
			const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _p.c) : undefined;
			const _grade = _ch?.grade ?? 3;
			const _ready = _p.r ? 'ready' : 'away';
			const _isBot = _p.id;
			_blueHTML += `<div class="flex w-100 team-player-row--blue${_isMe ? ' me' : ''}">
				<div class="flex duel-join-player-avatar">
					<img class="grade${_grade}-item" src="./images/main/avatars/${_p.c}.png" />
				</div>
				<div class="flex duel-join-player-info duel-join-player-info-blue">
					<div class="flex duel-join-player-info-name">
						<img class="duel-join-player-leader${_p.l ? '' : ' d-none'}" src="./images/ui/game/duel-leader.png" />${_p.n}
					</div>
					<div class="flex duel-join-player-info-power">
						${getLangData('Power')}:&nbsp;${_p.p.formatWithDots()}
					</div>
				</div>
				<div class="flex duel-join-player-buttons">
					<div class="duel-square${_isMe ? '' : ' d-none'}" onexactclick="getRef('duel')?.SetReady('${_p.s}')">
						<img src="./images/ui/game/duel-${_ready}.png" />
					</div>
					<div class="duel-square${_isMe ? '' : ' d-none'}" onexactclick="getRef('duel')?.PickClass()">
						<img src="./images/ui/game/duel-refresh.png" />
					</div>
					<div class="duel-square${!_isMe && !_isBot ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-rival-${_ready}.png" />
					</div>
					<div class="duel-square${_isBot && !mainCharacter.leader ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-rival-ready.png" />
					</div>
					<div class="duel-square${_isBot && mainCharacter.leader ? '' : ' d-none'}" onexactclick="getRef('duel')?.RePickBot('${_p.id}')">
						<img src="./images/ui/game/duel-refresh.png" />
					</div>
					<div class="duel-square${mainCharacter.leader ? '' : ' d-none'}" onexactclick="getRef('duel')?.SwapPlayers('${_p.s ?? _p.id}', 1)">
						<img src="./images/ui/game/duel-arrow-up.png" />
					</div>
					<div class="duel-square${mainCharacter.leader ? '' : ' d-none'}" onexactclick="getRef('duel')?.SwapPlayers('${_p.s ?? _p.id}', 2)">
						<img src="./images/ui/game/duel-arrow-down.png" />
					</div>
					<div class="duel-square${_isMeOrLeader ? '' : ' d-none'}" onexactclick="getRef('duel')?.AskKickPlayer('${_p.s ?? _p.id}')">
						<img src="./images/ui/game/duel-kick.png" />
					</div>
				</div>
			</div>`;
		}
		for(let i = 0; i < 3 - _bluePlayers.length; i++) {
			_blueHTML += `<div class="flex w-100 team-player-row--blue">
				<div onexactclick="getRef('duel')?.AddBot('${_room.s}', 1)" class="duel-add-bot-btn list-item-btn animate-me flex${mainCharacter.leader ? '' : ' d-none'}">
					<img src="./images/ui/game/add-count.png" /> ${getLangData('Add Bot')}
				</div>
			</div>`;
		}
		let _redHTML = '';
		for (let i = 0; i < _redPlayers.length; i++) {
			const _p = _redPlayers[i];
			const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _p.c) : undefined;
			const _grade = _ch?.grade ?? 3;
			const _isMe = _p.s === mainCharacter.socketId;
			const _isMeOrLeader = _isMe || mainCharacter.leader;
			const _isBot = _p.id;
			const _ready = _p.r ? 'ready' : 'away';
			_redHTML += `<div class="flex w-100 team-player-row--red${_isMe ? ' me' : ''}">
				<div class="flex duel-join-player-avatar">
					<img class="grade${_grade}-item" src="./images/main/avatars/${_p.c}.png" />
				</div>
				<div class="flex duel-join-player-info duel-join-player-info-red">
					<div class="flex duel-join-player-info-name">
						<img class="duel-join-player-leader${_p.l ? '' : ' d-none'}" src="./images/ui/game/duel-leader.png" />${_p.n}
					</div>
					<div class="flex duel-join-player-info-power">
						${getLangData('Power')}:&nbsp;${_p.p.formatWithDots()}
					</div>
				</div>
				<div class="flex duel-join-player-buttons">
					<div class="duel-square${_isMe ? '' : ' d-none'}" onexactclick="getRef('duel')?.SetReady('${_p.s}')">
						<img src="./images/ui/game/duel-${_ready}.png" />
					</div>
					<div class="duel-square${_isMe ? '' : ' d-none'}" onexactclick="getRef('duel')?.PickClass()">
						<img src="./images/ui/game/duel-refresh.png" />
					</div>
					<div class="duel-square${!_isMe && !_isBot ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-rival-${_ready}.png" />
					</div>
					<div class="duel-square${_isBot && !mainCharacter.leader ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-rival-ready.png" />
					</div>
					<div class="duel-square${_isBot && mainCharacter.leader ? '' : ' d-none'}" onexactclick="getRef('duel')?.RePickBot('${_p.id}')">
						<img src="./images/ui/game/duel-refresh.png" />
					</div>
					<div class="duel-square${mainCharacter.leader ? '' : ' d-none'}" onexactclick="getRef('duel')?.SwapPlayers('${_p.s ?? _p.id}', 1)">
						<img src="./images/ui/game/duel-arrow-up.png" />
					</div>
					<div class="duel-square${mainCharacter.leader ? '' : ' d-none'}" onexactclick="getRef('duel')?.SwapPlayers('${_p.s ?? _p.id}', 2)">
						<img src="./images/ui/game/duel-arrow-down.png" />
					</div>
					<div class="duel-square${_isMeOrLeader ? '' : ' d-none'}" onexactclick="getRef('duel')?.AskKickPlayer('${_p.s ?? _p.id}')">
						<img src="./images/ui/game/duel-kick.png" />
					</div>
				</div>
			</div>`;
		}
		for(let i = 0; i < 3 - _redPlayers.length; i++) {
			_redHTML += `<div class="flex w-100 team-player-row--red">
				<div onexactclick="getRef('duel')?.AddBot('${_room.s}', 2)" class="duel-add-bot-btn list-item-btn animate-me flex${mainCharacter.leader ? '' : ' d-none'}">
					<img src="./images/ui/game/add-count.png" /> ${getLangData('Add Bot')}
				</div>
			</div>`;
		}
		_right.innerHTML = `<div class="flex full show-ui duel-detail story-detail">
		<div class="flex duel-join-room-container duel-create-room-container full">
			<div class="flex w-100 duel-join-room-title duel-create-room-title">
				<div class="flex duel-join-room-title-item duel-create-room-title-item">
					${_room.n}
				</div>
			</div>`
			+ _blueHTML +
			`<div class="flex w-100 duel-vs-sign">
				<img src="./images/ui/game/duel-vs.png" />
			</div>`
			+ _redHTML +
			`<div class="flex w-100 duel-create-room-button">
				<div class="flex duel-start-button${_canStart ? '' : ' disabled'}" onexactclick="getRef('duel')?.StartDuel()">
					${getLangData('START DUEL')}
				</div>
			</div>
		</div>
		</div>`;
	}
	this.SwitchRoomType = function(_type) {
		if(this.roomType === _type)
			return;
		this.roomType = _type;
		playClick(1);
		switch(_type) {
			case 'public': {
					document.querySelector('.duel-create-room-type-public').src = './images/ui/game/duel-radio-active.png';
					document.querySelector('.duel-create-room-type-private').src = './images/ui/game/duel-radio-passive.png';
					const _inputs = document.querySelectorAll('.duel-create-room-input');
					const _pwdContainer = _inputs[_inputs.length - 1];
					addClass(_pwdContainer, 'gray');
					const _pwd = _pwdContainer.querySelector('input');
					_pwd.value = '';
				}
				break;
			case 'private': {
					document.querySelector('.duel-create-room-type-public').src = './images/ui/game/duel-radio-passive.png';
					document.querySelector('.duel-create-room-type-private').src = './images/ui/game/duel-radio-active.png';
					const _inputs = document.querySelectorAll('.duel-create-room-input');
					const _pwdContainer = _inputs[_inputs.length - 1];
					removeClass(_pwdContainer, 'gray');
					const _pwd = _pwdContainer.querySelector('input');
					_pwd.value = '';
				}
				break;
		}
	}
	this.CreateRoom = async function() {
		const _roomName = document.querySelector('#duel-room-name')?.value?.trim();
		const _password = document.querySelector('#duel-room-password')?.value?.trim();
		if(!_roomName) {
			warn('<span>' + getLangData('Please enter room name') + '</span>', 'warn');
			return;
		}
		if(this.roomType === 'private' && !_password) {
			warn('<span>' + getLangData('Please enter password') + '</span>', 'warn');
			return;
		}
		if(this.pending)
			return;
		this.pending = 1;
		try {
			if(this.roomId && this.roomById(this.roomId)?.dummy)
				this.leaveDummyLocal();
			const _res = await this.invoke('DuelCreate', _roomName, this.roomType === 'private' ? _password : '', mainCharacter?.class || '', this.myPower());
			if(!this.afterInvoke(_res))
				return;
			if(_res.value)
				this.applyServerRoom(_res.value, 1);
		}
		finally {
			delete this.pending;
		}
	}
	this.SwapPlayers = function(_socketId, _upOrDown) {
		//1 ise yukarı 2 ise aşağı. Sıra ekrandaki gibi: önce mavi takım, sonra kırmızı.
		const _room = this.roomById(this.roomId);
		if(!_room)
			return;
		if(!_room.dummy) {
			if(!mainCharacter.leader)
				return;
			this.invoke('DuelSwap', _socketId, _upOrDown).then(_res => this.afterInvoke(_res));
			return;
		}
		const _ordered = [
			..._room.p.filter(x => x.t === 1),
			..._room.p.filter(x => x.t === 2)
		];
		const _index = _ordered.findIndex(x => (x.s ?? x.id) === _socketId);
		if(_index < 0)
			return;
		if(_index === 0 && _upOrDown === 1)
			return;
		if(_index === _ordered.length - 1 && _upOrDown === 2)
			return;
		const _player = _ordered[_index];
		const _other = _ordered[_index + (_upOrDown === 1 ? -1 : 1)];
		const _playerTeam = _player.t;
		_player.t = _other.t;
		_other.t = _playerTeam;
		const _i1 = _room.p.indexOf(_player);
		const _i2 = _room.p.indexOf(_other);
		_room.p[_i1] = _other;
		_room.p[_i2] = _player;
		this.renderJoinRoomUI(this.roomId, 1);
	}
	this.AskKickPlayer = function(_socketId) {
		const _room = this.roomById(this.roomId);
		if(!_room)
			return;
		const _player = _room.p.find(x => (x.s ?? x.id) === _socketId);
		if(!_player)
			return;
		const _me = _player.s === mainCharacter.socketId;
		if(!_me){
			const _isBot = _player.id;
			if(_isBot)
				this.KickPlayer(_player.id);
			else
				askSomething(_player.n + ' ' + getLangData('will be kicked'), `getRef(\'duel\')?.KickPlayer(\'${_player.s ?? _player.id}\')`, 'modal_2x1');
		} 
		else 
			askSomething(getLangData('Leave the room')+'?', `getRef(\'duel\')?.KickPlayer(\'${_player.s ?? _player.id}\')`, 'modal_2x1');
	}
	this.KickPlayer = function(_socketId) {
		const _room = this.roomById(this.roomId);
		if(!_room)
			return;
		const _player = _room.p.find(x => (x.s ?? x.id) === _socketId);
		if(!_player)
			return;
		closeInventoryQuestionModal();
		if(!_room.dummy) {
			if(_player.s === mainCharacter.socketId)
				this.leaveServerRoom(() => this.backToList());
			else if(mainCharacter.leader)
				this.invoke('DuelKick', _socketId).then(_res => this.afterInvoke(_res));
			return;
		}
		if(_player.s === mainCharacter.socketId) {
			this.leaveDummyLocal();
			this.render(1);
			return;
		}
		_room.p = _room.p.filter(x => (x.s ?? x.id) !== _socketId);
		this.updateRoomPlayersCount(this.roomId);
		this.renderJoinRoomUI(this.roomId, 1);
	}
	this.SetReady = function(_socketId) {
		const _room = this.roomById(this.roomId);
		if(!_room)
			return;
		if(!_room.dummy) {
			if(_socketId !== mainCharacter.socketId)
				return;
			this.invoke('DuelReady').then(_res => this.afterInvoke(_res));
			return;
		}
		const _player = _room.p.find(x => x.s === _socketId);
		if(!_player)
			return;
		_player.r = !_player.r;
		this.renderJoinRoomUI(this.roomId, 1);
	}
	this.StartDuel = function() {
		const _room = this.roomById(this.roomId);
		if(!_room)
			return;
		if(_room.s !== mainCharacter.socketId) {
			warn('<span>' + getLangData('Only the room leader can start the duel') + '</span>', 'warn');
			return;
		}
		if(_room.p?.some(x => x.s && !x.r))
			return;
		const _blue = _room.p?.filter(x => x.t === 1).length ?? 0;
		const _red = _room.p?.filter(x => x.t === 2).length ?? 0;
		if(_blue < 3 || _red < 3) {
			askSomething('Teams are not full yet. Do you still want to start?', `getRef('duel')?.ConfirmStartDuel()`, 'modal_2x1');
			return;
		}
		this.ConfirmStartDuel();
	}
	this.ConfirmStartDuel = function() {
		closeInventoryQuestionModal();
		const _room = this.roomById(this.roomId);
		if(!_room || _room.s !== mainCharacter.socketId)
			return;
		this.invoke('DuelStart').then(_res => this.afterInvoke(_res));
	}
	this.roomById = function(_roomId) {
		return this.rooms.find(x => x.s === _roomId) || (this.liveRoom?.s === _roomId ? this.liveRoom : null);
	}
	this.myPower = function() {
		return getTotalPower().total || 0;
	}
	this.invoke = async function(_method, ..._args) {
		if(!_my_hub || _my_hub.q !== 'Connected')
			return { ok: 0, offline: 1 };
		try {
			const _value = await _my_hub.invoke(_method, ..._args);
			return { ok: 1, value: _value };
		}
		catch(_err) {
			return { ok: 0, error: _err };
		}
	}
	this.afterInvoke = function(_res) {
		if(_res?.ok)
			return 1;
		if(_res?.offline)
			warn('<span>' + getLangData('Not connected') + '</span>', 'warn');
		else
			this.hubFail(_res?.error);
		return 0;
	}
	this.hubFail = function(_err) {
		let _msg = String(_err?.message || 'missing');
		const _i = _msg.indexOf('HubException:');
		if(_i >= 0)
			_msg = _msg.slice(_i + 'HubException:'.length).trim();
		if(_msg === 'Name is required')
			_msg = 'Please enter room name';
		warn('<span>' + getLangData(_msg) + '</span>', 'warn');
	}
	this.attachBotChars = function(_room) {
		if(!_room?.p)
			return;
		for(const _p of _room.p)
			if(_p.id && this.botChars[_p.id])
				_p.char = this.botChars[_p.id];
	}
	this.syncLeader = function(_room) {
		const _me = _room?.p?.find(x => x.s === mainCharacter.socketId);
		if(_me?.l)
			mainCharacter.leader = 1;
		else
			delete mainCharacter.leader;
	}
	this.paintRoomList = function() {
		if(document.querySelector('.duel-room-chat'))
			return;
		const _box = document.querySelector('.duel-rooms-container');
		if(!_box)
			return;
		_box.innerHTML = this.getRooms();
		if(this.roomId)
			addClass(document.getElementById('duel-card-' + this.roomId), 'selected');
	}
	this.applyServerRoom = function(_view, _open) {
		if(!_view?.s || this.dummyRooms.some(x => x.s === _view.s))
			return;
		this.attachBotChars(_view);
		const _i = this.serverRooms.findIndex(x => x.s === _view.s);
		if(_i >= 0)
			this.serverRooms[_i] = _view;
		else
			this.serverRooms.unshift(_view);
		this.rooms = this.dummyRooms.concat(this.serverRooms);
		const _mine = _view.p?.some(x => x.s === mainCharacter.socketId);
		if(_mine)
			this.liveRoom = _view;
		if(this.switching) {
			this.paintRoomList();
			return;
		}
		if(_open || this.roomId === _view.s || _mine) {
			this.syncLeader(_view);
			this.paintRoomList();
			this.renderJoinRoomUI(_view.s, 1, 1);
			return;
		}
		this.paintRoomList();
	}
	this.removeServerRoom = function(_roomId) {
		this.serverRooms = this.serverRooms.filter(x => x.s !== _roomId);
		this.rooms = this.dummyRooms.concat(this.serverRooms);
		if(this.liveRoom?.s === _roomId)
			delete this.liveRoom;
	}
	this.leaveDummyLocal = function() {
		this.closeRoomChat();
		const _room = this.dummyRooms.find(x => x.s === this.roomId);
		if(_room)
			_room.p = _room.p.filter(x => x.s !== mainCharacter.socketId);
		if(_room) {
			delete this.roomId;
			delete mainCharacter.leader;
		}
	}
	this.askLeaveForMenu = async function(_order, _subOrder, _tabOrder) {
		if(!this.roomId)
			return;
		this.pendingMenu = { order: _order, sub: _subOrder, tab: _tabOrder };
		const _room = this.roomById(this.roomId);
		const _me = _room?.p?.find(x => x.s === mainCharacter.socketId);
		if(_me?.r) {
			if(_room.dummy) {
				_me.r = 0;
				this.renderJoinRoomUI(this.roomId, 1, 1);
			}
			else if(this.pending)
				return;
			else {
				this.pending = 1;
				try {
					const _res = await this.invoke('DuelUnready');
					if(!this.afterInvoke(_res))
						return;
				}
				finally {
					delete this.pending;
				}
			}
		}
		if(document.querySelector(".inventory-question[data-singleton-key='modal_2x1']"))
			return;
		askSomething('bu eylem gruptan çıkmanıza sebep olacaktır?', `getRef('duel')?.confirmLeaveForMenu()`, 'modal_2x1');
	}
	this.confirmLeaveForMenu = function() {
		closeInventoryQuestionModal();
		const _nav = this.pendingMenu;
		delete this.pendingMenu;
		if(!_nav)
			return;
		const _go = () => switchBookPage(_nav.order, _nav.sub, _nav.tab);
		const _room = this.roomById(this.roomId);
		if(_room?.dummy) {
			this.leaveDummyLocal();
			_go();
			return;
		}
		this.leaveServerRoom(_go);
	}
	this.leaveServerRoom = async function(_then) {
		if(this.pending)
			return;
		this.pending = 1;
		this.switching = 1;
		try {
			const _res = await this.invoke('DuelLeave');
			if(!this.afterInvoke(_res))
				return;
			this.closeRoomChat();
			delete this.roomId;
			delete this.liveRoom;
			delete mainCharacter.leader;
			if(_then)
				_then();
		}
		finally {
			delete this.pending;
			delete this.switching;
		}
	}
	this.backToList = function() {
		this.closeRoomChat();
		delete this.roomId;
		delete this.liveRoom;
		delete this.startedRoom;
		delete mainCharacter.leader;
		this.botChars = {};
		if(document.querySelector("[data-module='duel']"))
			this.render(1);
	}
	this.joinServerRoom = async function(_roomId, _password) {
		if(this.pending)
			return;
		this.pending = 1;
		try {
			if(this.roomId && this.roomId !== _roomId && this.roomById(this.roomId)?.dummy)
				this.leaveDummyLocal();
			const _res = await this.invoke('DuelJoin', _roomId, _password || '', mainCharacter?.class || '', this.myPower());
			if(!this.afterInvoke(_res))
				return;
			if(_res.value)
				this.applyServerRoom(_res.value, 1);
		}
		finally {
			delete this.pending;
		}
	}
	this.addServerBot = async function(_room, _teamNo, _specificIndex, _oldId) {
		if(!mainCharacter.leader || this.pending)
			return;
		const _char = createRandomPlayer(mainCharacter.level);
		_char.aiId = getRandomString(5);
		_char.name = 'BOT' + getRandomValue2(1000, 9999);
		this.botChars[_char.aiId] = _char;
		const _index = _specificIndex === undefined ? -1 : _specificIndex;
		this.pending = 1;
		try {
			const _res = await this.invoke('DuelBot', _char.aiId, _char.name, _char.class, _char.totalPower || 0, _teamNo, _index);
			if(!this.afterInvoke(_res)) {
				delete this.botChars[_char.aiId];
				return;
			}
			if(_oldId && _oldId !== _char.aiId)
				delete this.botChars[_oldId];
		}
		finally {
			delete this.pending;
		}
	}
	this.loadRooms = async function() {
		const _seq = (this.listSeq = (this.listSeq || 0) + 1);
		const _res = await this.invoke('DuelRooms');
		if(_seq !== this.listSeq)
			return;
		if(!_res.ok || !Array.isArray(_res.value)) {
			if(_res.error)
				this.hubFail(_res.error);
			return;
		}
		this.serverRooms = _res.value.filter(x => !this.dummyRooms.some(d => d.s === x.s));
		for(const _room of this.serverRooms)
			this.attachBotChars(_room);
		this.rooms = this.dummyRooms.concat(this.serverRooms);
		this.paintRoomList();
		if(this.switching || this.pending || this.roomId)
			return;
		const _mine = this.serverRooms.find(x => x.p?.some(p => p.s === mainCharacter.socketId));
		if(_mine)
			this.joinServerRoom(_mine.s, '');
	}
	this.onDuelStart = function(_view) {
		if(!_view)
			return;
		this.startedRoom = _view;
		this.removeServerRoom(_view.s);
		this.paintRoomList();
		this.beginDuel(_view);
	}
	this.beginDuel = function(_view) {
		if(this.fightStarted || !_view?.p?.length)
			return;
		this.fightStarted = 1;
		this.startedAt = window.__duelClock = Date.now();
		const _me = mainCharacter.socketId;
		if(_view.s === _me)
			mainCharacter.leader = 1;
		else
			delete mainCharacter.leader;
		const _seatToFighter = function(_seat) {
			if(_seat.s === _me) {
				mainCharacter.pvpName = __account.name;
				mainCharacter.duelTeam = _seat.t;
				mainCharacter.duelClass = _seat.c;
				return mainCharacter;
			}
			const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _seat.c) : undefined;
			return {
				id: _ch?.id ?? 10001,
				pvpName: _seat.n,
				level: 10,
				duelTeam: _seat.t,
				socketId: _seat.s || _seat.id,
				duelBot: _seat.s ? undefined : 1
			};
		};
		const _ops = [
			..._view.p.filter(x => x.t === 1).map(_seatToFighter),
			..._view.p.filter(x => x.t === 2).map(_seatToFighter)
		];
		createJusticeWar(_ops, _view.s);
	}
	this.onDuel = function(_kind, _payload) {
		if(_kind === 'chat')
			return this.receiveRoomChat(_payload);
		if(_kind === 'changed')
			return this.loadRooms();
		if(_kind === 'room')
			return this.applyServerRoom(_payload, 0);
		if(_kind === 'closed') {
			this.removeServerRoom(_payload);
			if(!this.switching && this.roomId === _payload)
				this.backToList();
			else
				this.paintRoomList();
			return;
		}
		if(_kind === 'kicked') {
			if(!this.switching)
				this.backToList();
			else
				this.paintRoomList();
			return;
		}
		if(_kind === 'start')
			this.onDuelStart(_payload);
	}
	this.emojiSets = [
		{ key: 'action', label: 'Action', items: ['⚔️','🛡️','🗡️','🏹','💥','🔥','❄️','⚡','☠️','💀','🩸','👊'] },
		{ key: 'fantasy', label: 'Fantasy', items: ['👹','👺','🐉','🐍','🦇','👁️','🔱','🌙','☀️','🕯️','🪬','🌀'] },
		{ key: 'feeling', label: 'Feeling', items: ['😈','😎','🤬','😂','😭','🤔','🫡','🤝','👏','💪','🙏','❤️'] }
	];
	this.escapeChat = function(_text) {
		return String(_text ?? '').replace(/[&<>"']/g, function(_c) {
			return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[_c];
		});
	}
	this.chatClock = function() {
		const _d = new Date();
		return String(_d.getHours()).padStart(2, '0') + ':' + String(_d.getMinutes()).padStart(2, '0');
	}
	this.closeRoomChat = function() {
		if(this.chatRoom && this.roomChats)
			delete this.roomChats[this.chatRoom];
		delete this.chatRoom;
		this.chatCursor = null;
		if(this._chatOutside) {
			document.removeEventListener('pointerdown', this._chatOutside);
			delete this._chatOutside;
		}
	}
	this.openRoomChat = function(_room) {
		const _box = document.querySelector('.duel-rooms-container');
		if(!_box || !_room)
			return;
		if(this.chatRoom === _room.s && _box.querySelector('.duel-room-chat'))
			return;
		this.roomChats = this.roomChats || {};
		this.roomChats[_room.s] = this.roomChats[_room.s] || [];
		this.chatRoom = _room.s;
		this.chatCursor = null;
		let _tabs = '';
		for(const _set of this.emojiSets)
			_tabs += `<div class="duel-emoji-tab${_set.key === 'action' ? ' on' : ''}" onexactclick="getRef('duel')?.showEmojiSet('${_set.key}')">${_set.label}</div>`;
		_box.innerHTML = `<div class="duel-room-chat">
			<div class="duel-chat-log quest-list"><div class="duel-chat-spacer"></div><div class="duel-chat-rows"></div></div>
			<div class="duel-chat-compose">
				<div class="duel-emoji-panel d-none">
					<div class="duel-emoji-tabs">${_tabs}</div>
					<div class="duel-emoji-grid quest-list"></div>
				</div>
				<div class="duel-chat-field">
					<input id="duel-chat-text" class="duel-chat-text-input" type="text" maxlength="200" autocomplete="off" placeholder="${getLangData('Type your message')}" onkeydown="getRef('duel')?.chatKey(event)" onkeyup="getRef('duel')?.rememberChatCursor()" onclick="getRef('duel')?.rememberChatCursor()" onselect="getRef('duel')?.rememberChatCursor()" onblur="getRef('duel')?.rememberChatCursor()" onpaste="getRef('duel')?.pasteRoomChat(event)" ondrop="event.preventDefault()" ondragover="event.preventDefault()" />
					<div class="duel-emoji-btn" onexactclick="getRef('duel')?.toggleEmojiPanel()"><img src="./images/ui/game/group-chat-emoji.png" /></div>
				</div>
				<div class="duel-chat-send" onexactclick="getRef('duel')?.sendRoomChat()"><img src="./images/ui/game/group-chat-send.png" /></div>
			</div>
		</div>`;
		this.showEmojiSet('action');
		this.paintRoomMessages();
		if(this._chatOutside)
			document.removeEventListener('pointerdown', this._chatOutside);
		this._chatOutside = (e) => {
			const _panel = document.querySelector('.duel-emoji-panel');
			if(!_panel || _panel.classList.contains('d-none'))
				return;
			if(e.target.closest?.('.duel-emoji-panel') || e.target.closest?.('.duel-emoji-btn'))
				return;
			_panel.classList.add('d-none');
		};
		document.addEventListener('pointerdown', this._chatOutside);
	}
	this.showEmojiSet = function(_key) {
		const _set = this.emojiSets.find(x => x.key === _key) || this.emojiSets[0];
		const _grid = document.querySelector('.duel-emoji-grid');
		if(!_grid || !_set)
			return;
		document.querySelectorAll('.duel-emoji-tab').forEach(x => x.classList.toggle('on', x.textContent === _set.label));
		let _html = '';
		for(const _emoji of _set.items)
			_html += `<div class="duel-emoji-item" onexactclick="getRef('duel')?.insertChatEmoji('${_emoji}')">${_emoji}</div>`;
		_grid.innerHTML = _html;
		_grid.scrollTop = 0;
		playClick();
	}
	this.toggleEmojiPanel = function() {
		const _panel = document.querySelector('.duel-emoji-panel');
		if(!_panel)
			return;
		_panel.classList.toggle('d-none');
	}
	this.rememberChatCursor = function() {
		const _input = document.getElementById('duel-chat-text');
		if(!_input)
			return;
		this.chatCursor = _input.selectionStart ?? 0;
	}
	this.pasteRoomChat = function(e) {
		e.preventDefault();
		const _input = document.getElementById('duel-chat-text');
		if(!_input)
			return false;
		const _clip = ((e.clipboardData || window.clipboardData)?.getData('text') || '').replace(/[<>]/g, '');
		const _start = _input.selectionStart ?? 0;
		const _end = _input.selectionEnd ?? _start;
		const _raw = (_input.value.slice(0, _start) + _clip + _input.value.slice(_end)).replace(/[<>]/g, '').replace(/\r?\n/g, ' ');
		_input.value = _raw.slice(0, 200);
		const _caret = Math.min(_input.value.length, _start + _clip.replace(/\r?\n/g, ' ').length);
		_input.setSelectionRange(_caret, _caret);
		this.chatCursor = _caret;
		return false;
	}
	this.insertChatEmoji = function(_emoji) {
		const _input = document.getElementById('duel-chat-text');
		if(!_input || !_emoji)
			return;
		const _at = (this.chatCursor == null || this.chatCursor < 0) ? 0 : this.chatCursor;
		const _next = (_input.value.slice(0, _at) + _emoji + _input.value.slice(_at)).slice(0, 200);
		_input.value = _next;
		const _caret = Math.min(_next.length, _at + _emoji.length);
		this.chatCursor = _caret;
		_input.focus();
		_input.setSelectionRange(_caret, _caret);
	}
	this.chatKey = function(e) {
		if(e.key === 'Enter' || e.keyCode === 13) {
			e.preventDefault();
			this.sendRoomChat();
		}
	}
	this.chatRowHtml = function(_row) {
		const _avatar = _row.c ? `<div class="duel-chat-avatar-wrap"><img class="duel-chat-avatar" src="./images/main/avatars/${this.escapeChat(_row.c)}.png" /></div>` : '';
		const _mine = _row.s && _row.s === mainCharacter?.socketId ? ' duel-chat-mine' : '';
		return `<div class="duel-chat-row${_mine}">${_avatar}<div class="duel-chat-main"><div class="duel-chat-top"><div class="duel-chat-name" style="color:${getCharacterChatColor(_row.c) ?? 'inherit'} !important">${this.escapeChat(_row.n)}</div><div class="duel-chat-time">${this.escapeChat(_row.time)}</div></div><div class="duel-chat-body"><div class="duel-chat-text">${this.escapeChat(_row.m)}</div></div></div></div>`;
	}
	this.paintRoomMessages = function() {
		const _rows = document.querySelector('.duel-chat-rows');
		const _list = this.roomChats?.[this.chatRoom];
		if(!_rows || !_list)
			return;
		let _html = '';
		for(const _row of _list)
			_html += this.chatRowHtml(_row);
		_rows.innerHTML = _html;
		this.scrollRoomChat();
	}
	this.scrollRoomChat = function() {
		const _log = document.querySelector('.duel-chat-log');
		if(!_log)
			return;
		_log.scrollTop = _log.scrollHeight;
	}
	this.pushRoomChat = function(_row) {
		if(!this.chatRoom)
			return;
		this.roomChats = this.roomChats || {};
		const _list = this.roomChats[this.chatRoom] = this.roomChats[this.chatRoom] || [];
		_row.time = _row.time || this.chatClock();
		_row.m = String(_row.m ?? '').slice(0, 200);
		_list.push(_row);
		const _extra = _list.length - 100;
		if(_extra > 0)
			_list.splice(0, _extra);
		const _rows = document.querySelector('.duel-chat-rows');
		if(_rows) {
			const _div = document.createElement('div');
			_div.innerHTML = this.chatRowHtml(_row);
			_rows.appendChild(_div.firstChild);
			while(_rows.children.length > 100)
				_rows.firstChild.remove();
			this.scrollRoomChat();
		}
	}
	this.receiveRoomChat = function(_msg) {
		if(!this.roomId || !_msg?.m)
			return;
		if(_msg.s && _msg.s === mainCharacter?.socketId)
			return;
		const _seat = this.roomById(this.roomId)?.p?.find(x => x.s === _msg.s);
		this.pushRoomChat({
			n: _msg.n || _seat?.n || '',
			m: String(_msg.m).slice(0, 200),
			s: _msg.s,
			c: _seat?.c
		});
	}
	this.sendRoomChat = async function() {
		const _input = document.getElementById('duel-chat-text');
		const _room = this.roomById(this.roomId);
		if(!_input || !_room)
			return;
		const _text = _input.value.replace(/\r?\n/g, ' ').trim().slice(0, 200);
		if(!_text)
			return;
		const _seat = _room.p?.find(x => x.s === mainCharacter?.socketId);
		if(!_room.dummy) {
			const _res = await this.invoke('DuelChat', _text);
			if(!this.afterInvoke(_res))
				return;
		}
		this.pushRoomChat({
			n: __account?.name || _seat?.n || '',
			m: _text,
			s: mainCharacter?.socketId,
			c: _seat?.c || mainCharacter?.class
		});
		_input.value = '';
		this.chatCursor = 0;
		playClick();
	}
	return this;
}
window.duel = duel;

})();
