'use strict';
(function(){
	function mailbox() {
	this.mails = _client.getMails();
	this.key = 'mailbox';
	this.tutorial = {
		tr: {
			title: 'Posta Kutusu',
			desc: 'Oyun sistemi tarafından bilgilendirme, duyuru metinleri veya içinde hediyeler bulunan ödül mesajları belli aralıklarla gönderilir. Bu mesajları ve daha fazlasını soldaki listeden mektup seçerek okuyabilir ve içindeki ödül varsa alabilirsiniz. Listenizdeki mektup zarfı resimleri eğer açıksa bu onları okuduğunuz anlamına gelir. Okuduğunuz mesajları sonrasında silebilirsiniz.'
		},
		en: {
			title: 'Mailbox',
			desc: 'The game system periodically sends messages containing information, announcements, or rewards. You can read these messages and more by selecting a letter from the list on the left and claiming any rewards. If the letter envelope images in your list are visible, this means you\'ve read them. You can delete messages you\'ve read afterward.'
		}
	};
	if(!tryShowMenuTutorial(this.key))
		this.tutorial = undefined;
	this.render = function(_noAnimation, _id) {
		let _content = showMenuTutorial(this.tutorial, this.key);
		updateMenuBottom(3);
		const _container = selectMenuContainer();
		if(!this.mails?.length) {
			_container.innerHTML = 
			`<div data-module='mailbox' class="book-page-wrapper mailbox-container${_noAnimation ? '' : ' fade-me'}">
				<div class="flex book-page-bg">
					<div class="full flex book-page-bg-inner">
						${getLangData('Your mailbox is empty')}
					</div>
				</div>
			</div>`;
			return;
		}
		_container.innerHTML = 
		`<div data-module='mailbox' class="menu-ui-left${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-left menu-modal-left-content">
				<div class="skills-content-left mailbox-content-left menu-modal-left-container">
					<div style="overflow-y:auto" class="full">`
						+ this.getMails(_id) +
					`</div>
				</div>
			</div>
		</div>
		<div data-module='mailbox' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right menu-modal-right-content">
				<div class="skills-content-right mailbox-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">`
						+ _content +
					`</div>
				</div>
			</div>
		</div>`;
		if(_content === '')
			this.selectMail(_id);
	}
	this.getMails = function() {
		let html = '';
		const _arr = this.mails?.sort((a,b) => b.ts - a.ts);
		for (var _m of _arr) {
			const _mail = __account.mailbox?.find(x => x.id === _m.id);
			html += `<div data-key="${_m.id}" onexactclick="getRef(\'mailbox\')?.selectMail(${_m.id})" class="skill-card mailbox-card animate-me flex${_mail ? ' read' : ''}${_m.attachment ? ' loot' : ''}${_mail?.looted ? ' looted' : ''}">
				<div class="skill-icon-wrapper mail-skill-icon-wrapper flex"><div class="animate-me-1000 mailbox-card-icon"></div></div>
				<div style="flex:1;height:100%">
					<div class="flex flex-jc-start skill-card-title" style="height:50%;width:100%">${_m.owner?.[getLang()] ?? _m.owner}</div>
					<div class="flex flex-jc-start skill-card-level mailbox-card-ts">
						<div class="w-50 flex flex-jc-start" style="height:100%">
							${getTimeDiffUntilDate(new Date(_m.ts), new Date())}
						</div>
						<div class="w-50 flex flex-jc-end mailbox-card-loot-icon" style="height:100%">
							<img style="max-height:66%;margin-right:2vh" src="./images/icons/quest-start.png" />
						</div>
					</div>
				</div>
			</div>`;
		}
		return html;
	}
	this.selectMail = function(_id, _looted) {
		const _arr = this.mails?.sort((a,b) => b.ts - a.ts);
		if(!_id)
			_id = _arr?.length > 0 ? _arr[0].id : undefined;
		else
   			playClick();
		if(!_id)
			return;
		const _cards = document.querySelectorAll('.mailbox-content-left .mailbox-card');
		_cards.forEach(x => removeClass(x, 'selected'));
		const _card = document.querySelector('.mailbox-content-left .mailbox-card[data-key="' + _id + '"]');
		if(_card) {
			addClass(_card, 'selected');
			addClass(_card, 'read');
			if(_looted)
				addClass(_card, 'looted');
			this.openMailDetail(_id);
		}
	}
	this.openMailDetail = function(_id) {
		let _html = 
		`<div class="full flex item-info-container-parent mailbox-item-info-container-parent" style="padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
			<div class="full flex flex-ai-start item-info-container artifact-info mailbox-info">`;
		if(!_id)
			_html += '<div class="full flex">' + getLangData('Your mailbox is empty') + '</div>';
		else {
			const _m = this.mails.find(x => x.id === _id);
			let _mail = __account.mailbox?.find(x => x.id === _m.id);
			if(!_mail)
			{
				if(!__account.mailbox)
					__account.mailbox = [];
				__account.mailbox.push({id:_id});
				checkUpdateAvailable2(4);
				_client.saveState();
				_mail = __account.mailbox?.find(x => x.id === _m.id);
			}
			let _attachment = '';
			if(_m.attachment)
				for(let _at of _m.attachment)
					_attachment += '<div class="item-slot flex' + (_mail?.looted ? ' gray' : '') + '">' + getMailAttachmentIcon(_at) + '</div>';
			_html += 
			`<div class="full mailbox-desc" style="height:86%">
				<div class="w-100 mailbox-desc-text">${_m.body?.[getLang()] ?? _m.body}</div>
				<div class="w-100 mailbox-owner">${_m.owner?.[getLang()] ?? _m.owner}</div>
				<div class="w-100 mailbox-attachment flex flex-jc-start">` + _attachment + `</div>
			</div>
			<div class="mailbox-buttons flex w-100 action-button-container" style="height:14%">
				<div class="flex w-100 page-detail-splitter"></div>
				<div class="flex w-50${!_m.attachment ? ' d-none' : ''}" style="height:100%">
					<div class="page-detail-button-half animate-me flex${(_mail?.looted ? ' disabled' : '')}" onexactclick="getRef(\'mailbox\')?.lootMail(${_id})" style="height:65%">
						<div class="flex">${getLangData('TAKE')}</div>
					</div>
				</div>
				<div class="flex w-50${!_m.attachment ? ' d-none' : ''}" style="height:100%">
					<div class="page-detail-button-half animate-me flex" onexactclick="getRef(\'mailbox\')?.askDeleteMail(${_id})" style="height:65%">
						<div class="flex">${getLangData('DELETE')}</div>
					</div>
				</div>
				<div class="page-detail-button animate-me flex${_m.attachment ? ' d-none' : ''}" onexactclick="getRef(\'mailbox\')?.askDeleteMail(${_id})" style="height:65%">
					<div class="flex">${getLangData('DELETE')}</div>
				</div>
			</div>`;
		}
		const _container = document.querySelector('.mailbox-content-right .menu-modal-right-container');
		if(_container)
			_container.innerHTML = _html + '</div></div>';
	}
	this.lootMail = function(_id) {
		const _m = this.mails.find(x => x.id === _id);
		if(!_m)
			return;
		const _mail = __account.mailbox?.find(x => x.id === _m.id);
		if(_mail && _m.attachment)
		{
			for(let _at of _m.attachment) {
				const _r = getChestReward(1, _at.key, _at.type, _at.count ?? 1, _at);
				if(_r) {
					warnChestReward(_r);
					_mail.looted = 1;
					_client.saveState();
					this.selectMail(_id, 1);
				}
			}
		}
		checkUpdateAvailable2(4);
	}
	this.askDeleteMail = function(_id) {
		const _m = this.mails.find(x => x.id === _id);
		if(!_m)
			return;
		const _mail = __account.mailbox?.find(x => x.id === _m.id);
		if(_mail && _m.attachment && !_mail.looted) {
			warn('<span>' + getLangData('Take attachment first') + '</span>', 'warn');
			return;
		}
   		askSomething(`${getLangData('Remove mail from your mailbox?')}`, `getRef(\'mailbox\')?.deleteMail(${_id})`, 'modal_2x1');
	}
	this.deleteMail = function(_id) {
		const _m = this.mails.find(x => x.id === _id);
		if(!_m)
			return;
   		PlaySound({ key: 'paperrip', volume: .5 });
		const i = this.mails.findIndex(x => x.id === _id);
		if(i >= 0)
		{
			this.mails.splice(i, 1);
			this.render(1);
			closeInventoryQuestionModal();
			_client.saveMailState();
		}
	}
	return this;
}
window.mailbox =mailbox;

})();