'use strict';
function mailbox() {
	const _mails = [
		{
			id: 1000,
			ts: Date.now() - 16545700,
			owner: {
				en: 'Just A Friend',
				tr: 'Bir Dost'
			},
			body: {
				en: 'Hail to you champion, welcome to the world\'s best game ever! Ahhh god, i know it will take too long but this is a mailbox system to check what is inside and you probably saying "Sh****t!" because this is an empty one but be patient with a hard work and being polite to other players, you will gain special rewards!!!',
				tr: 'Selam sana şampiyon, dünyanın en iyi oyununa hoş geldin! Ahhh tanrım, çok uzun süreceğini biliyorum ama bu, içinde ne olduğunu kontrol etmek için bir posta kutusu sistemi ve muhtemelen boş olduğu için "S****t!" diyorsun ama sabırlı ol, sıkı çalış ve diğer oyunculara karşı nazik ol, özel ödüller kazanacaksın!!!'
			}
		},
		{
			id: 1001,
			ts: Date.now() - 6545700,
			owner: {
				en: 'Developer Team',
				tr: 'Geliştirici Ekibi'
			},
			body: {
				en: 'We hope you enjoy using this little welcome gift that we think will accompany and guide you on your adventure.',
				tr: 'Sana maceranda eşlik edecek ve yol göstereceğini düşündüğümüz bu küçük aramıza hoşgeldin hediyesini  güle güle kullanmanı dileriz'
			},
			attachment: { type:'ticket-pass', count: 5 },
		}
	]
	this.render = function(_noAnimation, _id) {
		updateMenuBottom(3);
		const _container = selectMenuContainer();
		if(!_mails?.length) {
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
			<div class="menu-modal-left">
				<div class="skills-content-left mailbox-content-left menu-modal-left-container">
					<div style="padding:1% 5%;overflow-y:auto" class="full">`
						+ this.getMails(_id) +
					`</div>
				</div>
			</div>
		</div>
		<div data-module='mailbox' class="menu-ui-right${_noAnimation ? '' : ' fade-me'}">
			<div class="menu-modal-right">
				<div class="skills-content-right mailbox-content-right">
					<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">`
						+ //this.openMailDetail(_id) +
					`</div>
				</div>
			</div>
		</div>`;
		this.selectMail(_id);
	}
	this.getMails = function() {
		let html = '';
		const _arr = _mails?.sort((a,b) => b.ts - a.ts);
		for (var _m of _arr) {
			const _mail = __account.mailbox?.find(x => x.id === _m.id);
			html += `<div data-key="${_m.id}" onclick="getRef(\'mailbox\')?.selectMail(${_m.id})" class="skill-card mailbox-card animate-me flex${_mail ? ' read' : ''}${_m.attachment ? ' loot' : ''}${_mail?.looted ? ' looted' : ''}">
				<div class="skill-icon-wrapper flex"><div class="animate-me-1000 mailbox-card-icon"></div></div>
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
		const _arr = _mails?.sort((a,b) => b.ts - a.ts);
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
		`<div class="full flex item-info-container-parent" style="padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
			<div class="full flex flex-ai-start item-info-container artifact-info mailbox-info">`;
		if(!_id)
			_html += '<div class="full flex">' + getLangData('Your mailbox is empty') + '</div>';
		else {
			const _m = _mails.find(x => x.id === _id);
			let _mail = __account.mailbox?.find(x => x.id === _m.id);
			if(!_mail)
			{
				if(!__account.mailbox)
					__account.mailbox = [];
				__account.mailbox.push({id:_id});
				_client.saveState();
				_mail = __account.mailbox?.find(x => x.id === _m.id);
			}
			let _attachment = '';
			if(_m.attachment)
				_attachment = '<div class="item-slot flex' + (_mail?.looted ? ' gray' : '') + '">' + getMiscItemIcon(_m.attachment) + '</div>';
			_html += 
			`<div class="full mailbox-desc" style="height:86%">
				<div class="w-100 mailbox-desc-text">${_m.body?.[getLang()] ?? _m.body}</div>
				<div class="w-100 mailbox-owner">${_m.owner?.[getLang()] ?? _m.owner}</div>
				<div class="w-100 mailbox-attachment">` + _attachment + `</div>
			</div>
			<div class="mailbox-buttons flex w-100" style="height:14%">
				<div class="flex w-50${!_m.attachment ? ' d-none' : ''}" style="height:100%">
					<div class="game-menu-button animate-me flex${(_mail?.looted ? ' disabled' : '')}" onclick="getRef(\'mailbox\')?.lootMail(${_id})" style="height:65%">
						<div class="flex">${getLangData('TAKE')}</div>
					</div>
				</div>
				<div class="flex w-50${!_m.attachment ? ' d-none' : ''}" style="height:100%">
					<div class="game-menu-button animate-me flex" onclick="getRef(\'mailbox\')?.askDeleteMail(${_id})" style="height:65%">
						<div class="flex">${getLangData('DELETE')}</div>
					</div>
				</div>
				<div class="game-menu-button animate-me flex${_m.attachment ? ' d-none' : ''}" onclick="getRef(\'mailbox\')?.askDeleteMail(${_id})" style="height:65%">
					<div class="flex">${getLangData('DELETE')}</div>
				</div>
			</div>`;
		}
		const _container = document.querySelector('.mailbox-content-right .menu-modal-right-container');
		if(_container)
			_container.innerHTML = _html + '</div></div>';
	}
	this.lootMail = function(_id) {
		const _m = _mails.find(x => x.id === _id);
		if(!_m)
			return;
		const _mail = __account.mailbox?.find(x => x.id === _m.id);
		if(_mail && _m.attachment)
		{
			_mail.looted = 1;
			_client.saveState();
			this.selectMail(_id, 1);
			warnChestReward(getChestReward(1, 'misc', _m.attachment.type, _m.attachment.count ?? 1));
		}
	}
	this.askDeleteMail = function(_id) {
   		askSomething(`${getLangData('Remove mail from your mailbox?')}`, `getRef(\'mailbox\')?.deleteMail(${_id})`);
	}
	this.deleteMail = function(_id) {
		const _m = _mails.find(x => x.id === _id);
		if(!_m)
			return;
   		PlaySound({ key: 'paperrip', volume: .5 });
		const i = _mails.findIndex(x => x.id === _id);
		if(i >= 0)
		{
			_mails.splice(i, 1);
			this.render(1);
			closeInventoryQuestionModal();
		}
	}
	return this;
}