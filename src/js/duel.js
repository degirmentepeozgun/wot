'use strict';
(function() {
	function duel() {
	this.key = 'duel';
	this.rooms = [
		{ ownerName: 'bla bla', roomName: 'bla bla', ownerClass: 'warrior', isPublic: true, playerCount: 2 },
		{ ownerName: 'bla bla', roomName: 'bla bla', ownerClass: 'archer', isPublic: false, playerCount: 6 }
	];
	this.render = function(_noAnimation) {
		updateMenuBottom(4);
		const _container = selectMenuContainer();
		_container.innerHTML =
		`<div data-module='duel' class="menu-ui-left${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-left menu-modal-left-content">
				<div class="skills-content-left stories-content-left dungeon-content-left menu-modal-left-container">
					<div style="overflow-y:auto" class="full">`
						+ this.getRooms() +
					`</div>
				</div>
			</div>
		</div>
		<div data-module='duel' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right menu-modal-right-content">
				<div class="skills-content-right stories-content-right dungeon-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important"></div>
				</div>
			</div>
		</div>`;
		this.openCreate(_noAnimation);
	}
	this.getRooms = function() {
		let _html = '';
		for (let i = 0; i < this.rooms.length; i++) {
			const _r = this.rooms[i];
			const _ch = (typeof _selectableChars !== 'undefined') ? _selectableChars.find(x => x.class === _r.ownerClass) : undefined;
			const _grade = _ch?.grade ?? 3;
			const _vis = _r.isPublic ? getLangData('Public') : getLangData('Private');
			const _visClass = _r.isPublic ? 'toxic' : 'fire';
			_html += `<div data-key="${i}" class="skill-card dungeon-card flex animate-me">
				<div class="skill-icon-wrapper flex">
					<img class="grade${_grade}-item" src="./images/main/avatars/${_r.ownerClass}.png" />
				</div>
				<div class="flex" style="flex:1;height:100%;padding:1vh 1vh 1vh 0;min-width:0">
					<div class="flex flex-jc-start skill-card-title w-100" style="height:34%">${_r.roomName ?? ''}</div>
					<div class="story-level flex flex-jc-start w-100" style="height:33%">${_r.ownerName ?? ''}</div>
					<div class="story-consume flex flex-jc-start w-100" style="height:33%">${_r.playerCount ?? 0} / 6</div>
				</div>
				<div class="flex" style="height:100%;width:30%;flex-direction:column;justify-content:space-between;padding:.6vh 1vh .6vh 0">
					<div class="flex ${_visClass}" style="height:30%">${_vis}</div>
					<div style="height:18%"></div>
					<div onexactclick="event.stopPropagation();getRef('duel')?.JoinRoom(${i})" class="game-menu-button animate-me flex" style="height:42%;width:100%">
						<div class="flex">${getLangData('Join Room')}</div>
					</div>
				</div>
			</div>`;
		}
		return _html;
	}
	this.openCreate = function(_noAnimation) {
		const _right = document.querySelector('.dungeon-content-right .menu-modal-right-container');
		if (!_right)
			return;
		_right.innerHTML = `<div class="flex full show-ui story-detail${_noAnimation ? '' : ' fade-me'}">
			<div class="story-detail-wrapper duel-create-top">
				<div class="page-detail-header" style="height:auto;margin-top:4%">${getLangData('Room Name')}</div>
				<input id="duel-room-name" class="duel-room-input" type="text" maxlength="20" autocomplete="off" />
				<div class="page-detail-header" style="height:auto;margin-top:4%">${getLangData('Password')}</div>
				<input id="duel-room-password" class="duel-room-input" type="text" maxlength="20" autocomplete="off" />
			</div>
			<div class="w-100 flex action-button-container">
				<div class="page-detail-splitter w-100"></div>
				<div onexactclick="getRef('duel')?.CreateRoom()" class="flex page-detail-button">
					<div class="flex">${getLangData('Create Room')}</div>
				</div>
			</div>
		</div>`;
	}
	this.CreateRoom = function() {
	}
	this.JoinRoom = function() {
	}
	this.LeftFromRoom = function() {
	}
	return this;
}
window.duel = duel;

})();
