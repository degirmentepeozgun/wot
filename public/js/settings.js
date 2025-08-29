'use strict';
function getOptionsUI() {
	let _html = 
	`<div class="menu-ui-left fade-me">
		<div class="menu-modal-left menu-modal-left-content">
			<div class="skills-content-left settings-content-left menu-modal-left-container">
				<div style="padding:1% 5%;overflow-y:auto" class="full">
		<div style="width:100%;height:10%;padding:4vh 2vh 5vh 2vh" class="flex flex-jc-start">${getLangData('Language Choice')}</div>
		<div class="flex flex-jc-start" style="width:100%;padding:1vh;height:10vh">
			<div style="aspect-ratio:1/1;padding:1vh">
				<div onexactclick="langSelect('en')" class="my-radio${(getLang()) === 'en' ? ' selected' : ''} flex">
					<div></div>
				</div>
			</div>
			<div style="flex:1;width:80%" class="flex flex-jc-start one-line">
				${getLangData('English')}
			</div>
		</div>
		<div class="flex flex-jc-start" style="width:100%;padding:1vh;height:10vh">
			<div style="aspect-ratio:1/1;padding:1vh">
				<div onexactclick="langSelect('tr')" class="my-radio${(getLang()) === 'tr' ? ' selected' : ''} flex">
					<div></div>
				</div>
			</div>
			<div style="flex:1;width:80%" class="flex flex-jc-start one-line">
				${getLangData('Turkish')}
			</div>
		</div>
		<div style="flex:1"></div>
		<div onexactclick="askExitApp()" style="cursor:pointer;width:100%;height:10%;padding:4vh 2vh 7.5vh 2vh" class="flex flex-jc-start">${getLangData('Quit Game')}</div>
		</div>
			</div>
				</div>
					</div>
					<div class="menu-ui-right fade-me">
							<div class="menu-modal-right menu-modal-right-content">
						<div class="skills-content-right settings-content-right">
								<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">`;
	
	//_html += '<div class="flex" style="width:50%;height:100%">';
	const _optionTitles = { en: [
			'Gore Effects', 
			'Visual Effects', 
			'Weather Effects', 
			'Request From Players', 
			'Sound Effects', 
			'Background Music'
		],
		tr: [
			'Kan Efektleri', 
			'Görsel Efektler', 
			'Hava Olayları', 
			'Oyunculardan İstek Alma', 
			'Ses Efektleri', 
			'Arka Plan Müziği'
		]
	};
	
	let _i = 0;
	for(let _key of Object.keys(__account.options)) {
		const _opt = __account.options[_key];
		_html += '<div class="flex flex-jc-start" style="width:100%;padding:0 2%;height:15%">' +
					'<div style="aspect-ratio:1/1;padding:2%">' +
						'<div onexactclick="optionSelect(this, \'' + _key + '\')" class="my-check' + (_opt ? ' selected' : '') + ' flex">' +
							'<div></div>' +
						'</div>' +
					'</div>' +
					'<div style="flex:1;width:80%" class="flex flex-jc-start one-line">' +
						_optionTitles[getLang()][_i++] +
					'</div>' +
				'</div>';
	}
	
	updateMenuBottom(8);
	const _container = selectMenuContainer();
	_container.innerHTML = _html + '</div></div></div></div>';
}
function langSelect(_lang) {
	__account.lang = _lang;
	_client.saveState();
	getOptionsUI();
	updateQuestArea(1);
	const _name = document.querySelector('.map-name');
	if(_name) {
		const _mapSprite = mapSprites.find(x => x.id === episode.id);
		if(_mapSprite)
			_name.innerText = getLangData(_mapSprite.coords.title.split(' ')[0]);
	}
}
const _optionActions = [
		{ key: 'ambiance', do: function(_status) {
			if (!_status) {
				if(episode && episode.bgMusic)
					episode.pauseBgMusic();
				if(episode && episode.bgSound)
					episode.pauseAmbianceMusic();
			} else {
				
				if(episode && episode.bgMusic)
					episode.playBgMusic();
				if(episode && episode.bgSound)
					episode.resumeAmbianceMusic();
			}
		}}
	];
function optionSelect(_elem, _key) {
	const _lastStatus = _client.upgradeOptions(_key);
	if(__account.options[_key])
		addClass(_elem, 'selected');
	else
		removeClass(_elem, 'selected');
	const _option = _optionActions.find(x => x.key === _key);
	if(_option?.do)
		_option.do(_lastStatus);
}