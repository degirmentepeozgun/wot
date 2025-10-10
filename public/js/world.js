'use strict';
function world() {
	this.render = function(_noAnimation, _zoomed) {
		let _mapName = 'world-map';
		if(_zoomed)
			_mapName = 'act' + (__account.act ?? 1) + '-map';
		else if(_zoomed === false)
			_mapName = 'world-map';
		else if(__storyPlaying)
			_mapName = 'act' + (__account.act ?? 1) + '-map';
		let _html = 
		`<div data-module='world' class="book-page-wrapper world-map-container shop-container${_noAnimation ? '' : ' fade-me'}">
			<div class="flex book-page-bg has-world-map">
				<div id="world-map" class="animate-me">
					<img loading="lazy" id="game-map-img" src="./images/icons/${_mapName}.jpg?x=2" />
					<div id="map-coords" style="overflow:hidden;position:absolute;top:0;left:0" class="full remove-me">
					</div>
				</div>
			</div>
		</div>`;
		updateMenuBottom(2);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
		let mapArea = document.getElementById('map-coords');
		this.closeMapInfoModal(1);
		if(_mapName !== 'world-map')
			mapArea.innerHTML = '<img loading="lazy" src="./images/icons/compass.png" class="map-compass" />';
		else
			mapArea.innerHTML = `<div class="full flex act-map-whole">
				<div class="flex active act-map-part">${getLangData('Act')}&nbsp;I</div>
				<div class="flex act-map-part">${getLangData('Act')}&nbsp;II</div>
				<div class="flex act-map-part">${getLangData('Act')}&nbsp;III</div>
				<div class="flex act-map-part">${getLangData('Act')}&nbsp;IV</div>
				<img loading="lazy" src="./images/icons/world-title.png" />
			</div>
			<div class="full world-map-frame"></div>
			<div class="full flex act-map-whole-outer">
				<div onexactclick="zoomInWorldMap(1)" class="flex act-map-part-outer"></div>
				<div class="flex act-map-part-outer"></div>
				<div class="flex act-map-part-outer"></div>
				<div class="flex act-map-part-outer"></div>
				<img loading="lazy" src="./images/icons/world-title.png" />
			</div>`;
		const _clouds = document.createElement('img');
		_clouds.className = 'map-clouds';
		_clouds.loading = "lazy";
		_clouds.src = "./images/icons/clouds.png";
		mapArea.appendChild(_clouds);
		// if(!__storyPlaying)
		// 	for (let sprite of _missions) {
		// 		const _ms = mapSprites.find(x => x.coords?.key === sprite.key);
		// 		if (!_ms || !_ms.coords || _ms.disabled)
		// 			continue;
		// 		const _isLocked = mainCharacter.level < (_ms.minLevel ?? 1);
		// 		let _label = '<div class="waypoint-title' + (_isLocked ? ' waypoint-locked' : '') + 
		// 		(episode.id === _ms.id ? ' waypoint-current' : '') + '" onexactclick="getRef(\'world\')?.openMapDetailModal(' + _ms.id + 
		// 		')" style="left:' + _ms.coords.left + ';top:' + _ms.coords.top + ';cursor:pointer">' +
		// 			getLangData(_ms.coords.title) + (_ms.coords.dir ? ' (' + getLangData(_ms.coords.dir) + ')': '');
		// 		if (_ms.coords.icon)
		// 			_label += '<img src="./images/icons/' + _ms.coords.icon + '.png" class="map-lock map-icon" />';
		// 		else if (_isLocked)
		// 			_label += '<img src="./images/icons/lock.png" class="map-lock" />';
		// 		mapArea.innerHTML += (_label + '</div>');
		// 	}
		// else
		if(_mapName !== 'world-map') {
			let _mark;
			if(__account.questStatus?.quest?.navLocation)
			{
				const _quest = __story.quests.find(x => x.id === __account.questStatus.order);
				if(_quest) {
					if(__account.questStatus.quest.navLocation === 'end')
						_mark = [__locations.find(x => x.act === __account.act && x.lobby)?.mapId];
					else if(__account.questStatus.quest.navLocation === 'start' && __account.questStatus.state !== 'end')
						_mark = _quest.maps;
				}
			}
			for (let sprite of __locations) {
				const _isLocked = false;
				const _canPort = (_mark?.indexOf(sprite.mapId) >= 0 && episode.id !== sprite.mapId);
				let _label = '<div' + (sprite.mapId ? ' id="map-location-' + sprite.mapId + '"' : '') + ' class="flex waypoint-title' + (_isLocked ? ' waypoint-locked' : '') + 
				(sprite.mapId ? '' : ' waypoint-title-small') +
				(_canPort ? ' glow-yellow' : '') +
				(episode?.id === sprite.mapId ? ' waypoint-current' : '') + '" onexactclick="getRef(\'world\')?.tryPort(' + sprite.mapId + ', ' + (_canPort ? 1 : 0) + ')" style="left:' + sprite.left + ';top:' + sprite.top + ';cursor:pointer">' +
					sprite.titles[getLang()];
				// if (_ms.coords.icon)
				// 	_label += '<img src="./images/icons/' + _ms.coords.icon + '.png" class="map-lock map-icon" />';
				// else if (_isLocked)
				// 	_label += '<img src="./images/icons/lock.png" class="map-lock" />';
				mapArea.innerHTML += (_label + '</div>');
			}
		}
	}
	this.tryPort = function(_id, _canPort) {
		if(_canPort)
			portTo(_id);
		else if(!episode?.menu)
			warn('<span>' + getLangData('Cannot port while a quest is in progress') + '</span>', 'warn');
		else
			this.openMapDetailModal(_id);
	}
 	this.closeMapInfoModal = function(_nosound) {
		if(!_nosound)
			PlaySound({ key: 'click' });
		const _mdc = document.getElementById('map-detail-modal');
		if(_mdc) {
			addClass(_mdc, 'fade-out');
			_mdc.onanimationend = function(event) {
				if(event.animationName === 'fade-out-me') {
					const _mdc2 = document.getElementById('map-detail-modal');
					if(_mdc2)
						_mdc2.remove();
				}
			}
		}
	}
	this.startPort = function(_id) {
		PlaySound({key:'click'});
		const _map = mapSprites.find(x => x.id === _id);
		let _mission;
		if(_map.coords.key)
			_mission = _missions.find(x => x.key === _map.coords.key);
		if(_mission?.storyId) {
			if(_mission.before)
				if(!_mission.before())
					return;
			playStory(_mission.storyId);
		}
	}
	this.openMapDetailModal = function(_id) {
		const _map = mapSprites.find(x => x.id === _id);
		let _mission;
		if(_map?.coords?.key)
			_mission = _missions.find(x => x.key === _map.coords.key);
		if(!_mission)
			return;
		PlaySound({ key: 'click' });
		let _container = document.getElementById('map-detail-modal');
		if(_container)
			_container.remove();
		_container = document.createElement('div');
		_container.id = 'map-detail-modal';
		_container.className = 'flex animate-me fade-me';
		_container.style = "background:url(./images/ui/square.png)";
		_container.innerHTML = `<div class="full map-detail-modal-inner">
			<div class="w-100 flex flex-jc-start map-detail-modal-title">${_mission?.titles?.[getLang()]?.toLocaleUpperCase(getLang())}</div>
			<div class="full flex flex-ai-start flex-jc-start map-detail-modal-content">
				<div class="w-100 flex flex-jc-start map-detail-modal-desc">${_mission?.descriptions?.[getLang()] ?? ''}`
				+ (_mission.html?.() ?? '') +
			`</div>
			</div>
			<div class="flex map-detail-modal-btn">
				<div class="w-50 flex d-none">
					<div class="game-menu-button animate-me flex" onexactclick="" style="height:65%">
						<div class="flex">${getLangData('UPGRADE')}</div>
					</div>
				</div>
				<div class="w-100 flex" style="height:100%">
					<div class="game-menu-button animate-me flex" onexactclick="getRef(\'world\')?.startPort(${_id})" style="height:65%">
						<div class="flex" style="height:100%;color:#ff6c00 !important">${getLangData('START')}</div>
					</div>
				</div>
			</div>
			<div onexactclick="getRef(\'world\')?.closeMapInfoModal()" class="item-info-modal-close">&times;</div>
        	<div id="shine"></div>
		</div>`;
		document.querySelector('.world-map-container .book-page-bg').appendChild(_container);
	}
	return this;
}