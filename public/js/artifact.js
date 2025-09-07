'use strict';
console.log('art');
function createArtifactsUI(_id) {
	let _tutorial = {
		tr: {
			title: 'Tılsımlar',
			desc: 'Hikaye bölümlerinde çok ender görebileceğin talismanlar olabilir. Bu özel parçaları toplayıp biriktirdiğinde ve set olarak tüm parçaları tamamladığında setin bonus özelliğini pasif olarak kazanabiliyorsun. O yüzden hikaye modunda oynarken etrafı da dikkatlice kolaçan etmeyi unutma.'
		},
		en: {
			title: 'Talismans',
			desc: 'There may be rare talismans you\'ll encounter during the story stages. Collecting and accumulating these special pieces and completing all the pieces in a set will passively grant you the set\'s bonus feature. So, be sure to scout your surroundings carefully while playing the story mode.'
		}
	};
	if(!tryShowMenuTutorial('artifact'))
		_tutorial = undefined;
	let _content = showMenuTutorial(_tutorial, 'artifact');
    updateMenuBottom(0);
	const _container = selectMenuContainer();
	const _noSelect = tryShowMenuTutorial('artifact');
	let _html = '<div class="menu-ui-left fade-me">' +
						'<div class="menu-modal-left menu-modal-left-content">' +
							'<div class="skills-content-left menu-modal-left-container">' +
								'<div style="padding:1% 5%;overflow-y:auto" class="full">';
	for(let _i of __artifacts) {
		if(!_id)
			_id = _i.id;
		let _ok = __account.artifacts.find(x => x.id === _i.id);
		_html += `<div data-artifact-key="${_i.id}" onexactclick="openArtifactDetailModal(${_i.id}, 'artifact-detail')" class="skill-card animate-me flex${(((_i.id === _id) && !_noSelect) ? ' selected' : '')}">
				<div style="opacity:.75" class="skill-icon-wrapper flex"><img src="./images/artifacts/${_i.id}.png" /></div>
				<div style="flex:1;height:100%;position:relative">
					<div class="flex flex-jc-start skill-card-title" style="height:50%;width:100%">${_i.titles[getLang()]}</div>
				<div${_ok ? '' : ' class="d-none"'} style="position:absolute;right:2vh;bottom:1vh;font-weight:bold">&check;</div>
				<div class="artifact-not-found${_ok ? ' d-none' : ''}">Not found</div>
				</div></div>`;
	}
	_html += `</div></div></div></div>
	<div class="menu-ui-right fade-me">
			<div class="menu-modal-right menu-modal-right-content">
		<div class="skills-content-right">
				<div id="artifact-detail" class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">` +
						(_content !== '' ? _content : openArtifactDetailModal(__artifacts[0].id)) +
	`</div></div></div></div>`;
	_container.innerHTML = _html;
}
function openArtifactDetailModal(_id, _containerId, _noAnimation) {
	if(_containerId)
		episode.playSound({ key: 'click' });
	const _selected = document.querySelector('.skill-card[data-artifact-key="' + _id + '"]');
	if(_selected) {
		const _cards = document.querySelectorAll('.skill-card[data-artifact-key]');
		_cards.forEach(x => removeClass(x, 'selected'));
		addClass(_selected, 'selected');
	}
    var _item = __artifacts.find(x => x.id === _id);
	_item.bonus = __artifactGroups.find(x => x.id === _item.group).bonus;
	var _ids = __artifacts.filter(x => x.group === _item.group).map(x => x.id);
	var _bonusTitle = __properties.find(x => x.key === _item.bonus.key).titles[getLang()];
	var _pieces = '';
	for(let _i of __artifacts.filter(x => x.group === _item.group)) {
		var _owned = __account.artifacts.find(x => x.id === _i.id);
		_pieces += `<div class="flex artifact-bonus-item${_owned ? ' owned' : ''}" style="width:100%;padding:1vh">
               ${_i.titles[getLang()]}
        	</div>`;
	}
	const _isActive = __account.artifacts.filter(x => _ids.indexOf(x.id) !== -1)?.length >= 4;
    var _html = `<div class="full flex item-info-container-parent artifact-item-info-container-parent${_noAnimation ? '' : ' fade-me'}" style="padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
        <div class="full flex flex-ai-start item-info-container artifact-info" style="overflow:hidden;background:radial-gradient(#262626, #000);border-radius:1.6vh;border:.4vh solid darkgoldenrod;position:relative">
           	<div class="flex w-100 artifact-detail-header">
				<div class="artifact-detail-header-icon">
					<img style="background:radial-gradient(${_item.group === 1 ? '#008000' : '#000080'}40, transparent)" src="./images/artifacts/${_id}.png" />
				</div>
				<div class="artifact-detail-header-info">
					<div class="flex artifact-title artifact-detail-header-title" style="width:100%;padding:2vh">
						${_item.titles[getLang()]}
					</div>
					<div class="flex artifact-description" style="width:100%;padding:2vh;text-align:center">
						${getItemGradeLetter(_item.group)} ${getLangData('grade talisman, collect all pieces for set bonus')}
					</div>
				</div>
			</div>
			<div class="flex artifact-bonus" style="width:100%;padding:1vh">`
               + _pieces +
            `</div>
			<div class="flex artifact-heading" style="width:100%;padding:2vh">
               <span style="color:#f3f4f5cc!important">Set Bonus: <span style="font-weight:600;color:${_item.group < 2 ? '#FF3131': '#6495ED'}!important">%${_item.bonus.rate} ${_bonusTitle}</span><span${_isActive ? ' style="color:green!important;font-weight:600"' : ' class="d-none"'}">&nbsp;(${getLangData('Active')})</span></span>
            </div>
			<div class="d-none" onexactclick="closeItemInfoModal()" style="position:absolute;top:0;right:0;padding:2vh;font-weight:600;font-size:5vh!important;line-height:3vh !important;color:darkgoldenrod !important">&times;</div>
        </div>
    </div>`;
	if(!_containerId)
		return _html;
	else
		document.getElementById(_containerId).innerHTML = _html;
}