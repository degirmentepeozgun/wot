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
		}
	];
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
	}
	this.getRooms = function() {
		let _html = '';
		for (let i = 0; i < this.rooms.length; i++) {
			const _r = this.rooms[i];
			const _owner = _r.p.find(x => x.l);
			const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _owner.c) : undefined;
			const _grade = _ch?.grade ?? 3;
			const _vis = !_r.t ? getLangData('Public') : getLangData('Private');
			const _visClass = _r.t === 1 ? 'fire' : 'toxic';
			_html += `<div id="duel-card-${_r.s}" data-key="${i}" class="skill-card duel-card flex animate-me">
				<div class="skill-icon-wrapper flex">
					<img class="grade${_grade}-item" src="./images/main/avatars/${_owner.c}.png" />
				</div>
				<div class="flex" style="flex:1;height:100%;padding:1vh 1vh 1vh 0;min-width:0">
					<div class="flex flex-jc-start skill-card-title w-100" style="height:34%">${_r.n ?? ''}</div>
					<div class="story-level flex flex-jc-start w-100" style="height:33%">${_owner.n ?? ''}</div>
					<div id="duel-room-players-count-${_r.s}" class="story-consume flex flex-jc-start w-100" style="height:33%">${_r.p?.length ?? 0} / 6</div>
				</div>
				<div class="flex flex-jc-start" style="height:100%;width:30%;flex-direction:column;justify-content:space-between;padding:.6vh 0">
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
		const _room = this.rooms.find(x => x.s === _roomId);
		if(!_room)
			return;
		const _password = document.querySelector('#duel-join-room-password').value?.trim();
		if(_password !== _room.pwd) {
			warn('<span>' + getLangData('Wrong Password') + '</span>', 'warn');
			return;
		}
		closeInventoryQuestionModal();
		this.JoinRoom(_roomId, 1);
	}
	this.JoinRoom = function(_roomId, _pass) {
		const _room = this.rooms.find(x => x.s === _roomId);
		if(!_room)
			return;
		if(_room.p?.length >= 6) {
			warn('<span>' + getLangData('Room is full') + '</span>', 'warn');
			return;
		}
		if(this.roomId) {
			this.KickPlayer(mainCharacter.socketId);
		}
		//eğer oyunculardan biri zaten bensem return;
		if(_room.p?.find(x => x.s === mainCharacter.socketId)) {
			return;
		}
		if(_room.t && !_pass) {
			//password ekranı soracaz
			askSomething(
			`<div class="flex w-100 duel-create-room-input">
				<input placeholder="${getLangData('Enter Room Password')}" id="duel-join-room-password" class="duel-room-input" type="text" maxlength="20" autocomplete="off" />
			</div>`, `getRef(\'duel\')?.TryJoinRoom(\'${_roomId}\')`, 'modal_2x1');
			return;
		}
		//beni bu odadaki p arrayinde eğer t si 1 ve 2 olanlara bakarak oyuncusu en az olan takıma ekle eğer eşitlerse 1. takıma ekle
		const _bluePlayers = _room.p?.filter(x => x.t === 1)??[];
		const _redPlayers = _room.p?.filter(x => x.t === 2)??[];
		const _myTeam = _bluePlayers.length <= _redPlayers.length ? 1 : 2;
		_room.p.push({
			c: mainCharacter.class,
			n: __account.name,
			s: mainCharacter.socketId,
			p: getTotalPower().total,
			t: _myTeam,
			r: 0
		});
		this.updateRoomPlayersCount(_roomId);
		this.renderJoinRoomUI(_roomId);
	}
	this.updateRoomPlayersCount = function(_roomId) {
		const _room = this.rooms.find(x => x.s === _roomId);
		if(!_room)
			return;
		document.getElementById(`duel-room-players-count-${_roomId}`).innerHTML = (_room.p?.length ?? 0) + ' / 6';
	}
	this.RePickBot = function(_botId) {
		const _room = this.rooms.find(x => x.s === this.roomId);
		if(!_room)
			return;
		const _bot = _room.p.find(x => x.id === _botId);
		if(!_bot)
			return;
		const _index = _room.p.indexOf(_bot);
		this.AddBot(this.roomId, _bot.t, _index);
	}
	this.AddBot = function(_roomId, _teamNo, _specificIndex) {
		const _room = this.rooms.find(x => x.s === _roomId);
		if(!_room)
			return;
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
		const _room = this.rooms.find(x => x.s === _roomId);
		if(!_room)
			return;
		const _right = document.querySelector('.duel-content-right .menu-modal-right-container');
		if (!_right)
			return;
		this.roomId = _roomId;
		if(this.roomId) {
			const _roomCards = document.querySelectorAll('.duel-card');
			if(_roomCards?.length > 0) {
				_roomCards.forEach(x => removeClass(x, 'selected'));
				addClass(document.getElementById(`duel-card-${_roomId}`), 'selected');
			}
		}
		if(!_noSound)
			playClick(1);
		const _bluePlayers = _room.p?.filter(x => x.t === 1)??[];
		const _redPlayers = _room.p?.filter(x => x.t === 2)??[];
		let _blueHTML = '';
		let _readyCount = 0;
		let _blueReadyCount = 0;
		let _redReadyCount = 0;
		for (let i = 0; i < _bluePlayers.length; i++) {
			const _p = _bluePlayers[i];
			const _isMe = _p.s === mainCharacter.socketId;
			const _isMeOrLeader = _isMe || mainCharacter.leader;
			const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _p.c) : undefined;
			const _grade = _ch?.grade ?? 3;
			const _ready = _p.r ? 'ready' : 'away';
			const _isBot = _p.id;
			if(_p.r) {
				_readyCount++;
				_blueReadyCount++;
			}
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
					<div class="duel-square${!_isMe && !_isBot ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-${_ready}.png" />
					</div>
					<div class="duel-square${_isBot && !mainCharacter.leader ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-ready.png" />
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
			if(_p.r) {
				_readyCount++;
				_redReadyCount++;
			}
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
					<div class="duel-square${!_isMe && !_isBot ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-${_ready}.png" />
					</div>
					<div class="duel-square${_isBot && !mainCharacter.leader ? '' : ' d-none'}">
						<img src="./images/ui/game/duel-ready.png" />
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
				<div class="flex duel-start-button${(_readyCount === _room.p?.length && _blueReadyCount > 0 && _redReadyCount > 0) ? '' : ' disabled'}" onexactclick="getRef('duel')?.StartDuel()">
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
	this.CreateRoom = function() {
		const _roomName = document.querySelector('#duel-room-name').value?.trim();
		const _password = document.querySelector('#duel-room-password').value?.trim();
		if(!_roomName) {
			warn('<span>' + getLangData('Please enter room name') + '</span>', 'warn');
			return;
		}
		if(this.roomType === 'private' && !_password) {
			warn('<span>' + getLangData('Please enter password') + '</span>', 'warn');
			return;
		}
		mainCharacter.leader = 1;
		const _socketId = mainCharacter.socketId;
		this.rooms.push({
			n: _roomName,
			s: _socketId,
			pwd: this.roomType === 'public' ? null : _password,
			t: this.roomType === 'public' ? 0 : 1,
			p: [
				{ 
					c: mainCharacter.class, 
					n: __account.name, 
					l: 1,
					s: _socketId,
					p: getTotalPower(mainCharacter).total,
					t: 1,
					r: 0
				}
			],
			selected: true
		});
		const _duelRoomsContainer = document.querySelector('.duel-rooms-container');
		_duelRoomsContainer.innerHTML = this.getRooms();
		this.renderJoinRoomUI(_socketId, 1);
	}
	this.SwapPlayers = function(_socketId, _upOrDown) {
		//1 ise yukarı 2 ise aşağı. Sıra ekrandaki gibi: önce mavi takım, sonra kırmızı.
		const _room = this.rooms.find(x => x.s === this.roomId);
		if(!_room)
			return;
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
		const _room = this.rooms.find(x => x.s === this.roomId);
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
		const _room = this.rooms.find(x => x.s === this.roomId);
		if(!_room)
			return;
		const _player = _room.p.find(x => (x.s ?? x.id) === _socketId);
		if(!_player)
			return;
		closeInventoryQuestionModal();
		if(_player.s === mainCharacter.socketId && mainCharacter.leader) {
			this.rooms = this.rooms.filter(x => x.s !== this.roomId);
			delete this.roomId;
			delete mainCharacter.leader;
			this.render(1);
			return;
		}
		else if(_player.s === mainCharacter.socketId) {
			_room.p = _room.p.filter(x => (x.s ?? x.id) !== _socketId);
			this.updateRoomPlayersCount(this.roomId);
			delete this.roomId;
			this.render(1);
			return;
		}
		_room.p = _room.p.filter(x => (x.s ?? x.id) !== _socketId);
		this.updateRoomPlayersCount(this.roomId);
		this.renderJoinRoomUI(this.roomId, 1);
	}
	this.SetReady = function(_socketId) {
		const _room = this.rooms.find(x => x.s === this.roomId);
		if(!_room)
			return;
		const _player = _room.p.find(x => x.s === _socketId);
		if(!_player)
			return;
		_player.r = !_player.r;
		this.renderJoinRoomUI(this.roomId, 1);
	}
	this.StartDuel = function() {
	}
	return this;
}
window.duel = duel;

})();
