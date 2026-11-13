'use strict';
(function(){
	console.log('chat');
	function chat() {
	this.emojiSets = [
		{ key: 'action', label: 'Action', items: ['⚔️','🛡️','🗡️','🏹','💥','🔥','❄️','⚡','☠️','💀','🩸','👊'] },
		{ key: 'fantasy', label: 'Fantasy', items: ['👹','👺','🐉','🐍','🦇','👁️','🔱','🌙','☀️','🕯️','🪬','🌀'] },
		{ key: 'feeling', label: 'Feeling', items: ['😈','😎','🤬','😂','😭','🤔','🫡','🤝','👏','💪','🙏','❤️'] }
	];
	this.chatCursor = null;
	this.render = function(_noAnimation) {
		const _old = getRef('chat');
		if(_old?._emojiOutside) {
			document.removeEventListener('pointerdown', _old._emojiOutside);
			delete _old._emojiOutside;
		}
		let _tabs = '';
		for(const _set of this.emojiSets)
			_tabs += `<div class="chat-emoji-tab${_set.key === 'action' ? ' on' : ''}" onexactclick="getRef('chat')?.showEmojiSet('${_set.key}')">${_set.label}</div>`;
		let _html = 
		`<div data-module="chat" class="book-page-wrapper chat-container shop-container${_noAnimation ? '' : ' fade-me'}">
			<div class="flex flex-ai-end book-page-bg">
				<div class="chat-screen w-100 flex flex-jc-end flex-ai-end">
					<div class="chat-screen-inner w-100 flex flex-ai-end">`
					+ this.renderChatMessages() +
				`</div>
				</div>
				<div class="chat-send-wrapper flex w-100">
					<div class="chat-emoji-panel d-none">
						<div class="chat-emoji-tabs">${_tabs}</div>
						<div class="chat-emoji-grid"></div>
					</div>
					<div class="flex chat-send-text flex-jc-start">
						<input onkeydown="getRef(\'chat\')?.trySendMessage(event)" onkeyup="getRef(\'chat\')?.rememberChatCursor()" onclick="getRef(\'chat\')?.rememberChatCursor()" onselect="getRef(\'chat\')?.rememberChatCursor()" onblur="getRef(\'chat\')?.rememberChatCursor()" autocomplete="off" placeholder="${getLangData('Type your message')}" type="text" onpaste="return false" ondrop="return false" id="chat-message-owner-text" maxlength="200" />
						<div class="chat-emoji-btn" onexactclick="getRef(\'chat\')?.toggleEmojiPanel()"><img src="./images/ui/game/group-chat-emoji.png" /></div>
					</div>
					<div class="flex chat-send-btn">
						<img src="./images/ui/game/chat-send.png" />
					</div>
				</div>
			</div>
		</div>`;
		updateMenuBottom(3);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
		const _self = this;
		setTimeout(() => {
			let _lastTouched = false;
			const _csb = document.querySelector('.chat-send-btn');
			const _input = document.getElementById('chat-message-owner-text');

			document.addEventListener('touchstart', e => {
				let el = e.target;
				while (el && el !== document.body) {
					if (el.classList?.contains('chat-send-btn')) {
						_lastTouched = true;
						break;
					}
					el = el.parentElement;
				}
			}, { passive: true });

			document.addEventListener('pointerdown', e => {
				let el = e.target;
				while (el && el !== document.body) {
					if (el.classList?.contains('chat-send-btn')) {
						_lastTouched = true;
						break;
					}
					el = el.parentElement;
				}
			}, { passive: true });

			_csb.addEventListener('click', e => {
				// direkt çalıştır
				_self.sendMessage();
				_lastTouched = false;
			});

			_input.addEventListener('blur', () => {
				if (_lastTouched) {
					setTimeout(() => {
						_self.sendMessage();
						_lastTouched = false;
					}, 0);
				}
				resizeOuterWindow();
			});
		}, 20);
		this.scrollChatToBottom();
		this.showEmojiSet('action', 1);
		this._emojiOutside = (e) => {
			const _panel = document.querySelector("[data-module='chat'] .chat-emoji-panel");
			if(!_panel || _panel.classList.contains('d-none'))
				return;
			if(e.target.closest?.("[data-module='chat'] .chat-emoji-panel") || e.target.closest?.("[data-module='chat'] .chat-emoji-btn"))
				return;
			_panel.classList.add('d-none');
		};
		document.addEventListener('pointerdown', this._emojiOutside);
		__lastChatCheck = msNow;
	}
	this.showEmojiSet = function(_key, _silent) {
		const _set = this.emojiSets.find(x => x.key === _key) || this.emojiSets[0];
		const _root = document.querySelector("[data-module='chat']");
		const _grid = _root?.querySelector('.chat-emoji-grid');
		if(!_grid || !_set)
			return;
		_root.querySelectorAll('.chat-emoji-tab').forEach(x => x.classList.toggle('on', x.textContent === _set.label));
		let _html = '';
		for(const _emoji of _set.items)
			_html += `<div class="chat-emoji-item" onexactclick="getRef('chat')?.insertChatEmoji('${_emoji}')">${_emoji}</div>`;
		_grid.innerHTML = _html;
		_grid.scrollTop = 0;
		if(!_silent)
			playClick();
	}
	this.toggleEmojiPanel = function() {
		const _panel = document.querySelector("[data-module='chat'] .chat-emoji-panel");
		if(!_panel)
			return;
		_panel.classList.toggle('d-none');
	}
	this.rememberChatCursor = function() {
		const _input = document.getElementById('chat-message-owner-text');
		if(!_input)
			return;
		this.chatCursor = _input.selectionStart ?? 0;
	}
	this.insertChatEmoji = function(_emoji) {
		const _input = document.getElementById('chat-message-owner-text');
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
	this.renderChatMessages = function(){
		let _html = '';
		for(let _m of __chatMessages)
			_html += this.getMessageText(_m);
		return _html;
	}
	this.trySendMessage = function(e) {
		 if (e.key === "Enter" || e.keyCode === 13) {
			e.preventDefault(); // varsayılan davranışı (örneğin form submit) engelle
			this.sendMessage();
		}
	}
	this.getMessageText = function(_msg) {
		return "<div class='chat-message flex-ai-start" + (_msg.me ? ' your-chat-message' : '') + (_msg.system ? ' system-chat-message' : '') + (_msg.whisper ? ' whisper-chat-message' : '') + " w-100 flex flex-jc-start'><div class='chat-message-inner flex flex-ai-start'><span class='message-owner'>" + (_msg.system ? '[SYSTEM]' : (_msg.whisper ? '&gt;&gt;[' + _msg.id + ']' : '#' + _msg.id)) + ':</span>&nbsp;<span class="chat-message-text">' + _msg.text + '</span></div></div>';
	}
	this.writeRemoteMessage = function(_msg) {
		const cscr = document.querySelector('.chat-screen-inner');
		const div = document.createElement('div');
		div.innerHTML = this.getMessageText({text:_msg.m, id:_msg.n});
		//cscr.insertBefore(div, cscr.firstChild);
		cscr.appendChild(div.firstChild);
    	PlaySound({ key: 'notify' });
		__lastChatCheck = msNow;
		this.removeUnnecessaryMessages();
		this.scrollChatToBottom();
	}
	this.removeUnnecessaryMessages = function() {
		if(__chatMessages.length > 100){
			const _diff = __chatMessages.length - 100;
			__chatMessages.splice(0, _diff);
			const _messages = document.querySelectorAll('.chat-screen-inner .chat-message');
			if(_messages?.[0])
				for(let i = 0; i < _diff; i++)
					try{
						_messages[0].remove();
					}
					catch(e){}
		}
	}
	this.sendMessage = function() {
		const _text = document.getElementById('chat-message-owner-text');
		if(_text.value?.trim()?.length === 0)
			return;
		const _myMessages = __chatMessages.filter(x => x.me)?.sort((a,b) => b.time - a.time);
		if(_myMessages?.length > 2) {
			let _diff = msNow - _myMessages[2].time;
			if(_diff < 15000) {
				warn('<span>' + getLangData('You text too often') + '</span>', 'warn');
				return;
			}
		}
    	playClick();
		const cscr = document.querySelector('.chat-screen-inner');
		const div = document.createElement('div');
		const _data = {text:_text.value, me: 1, id:__account.name};
		div.innerHTML = this.getMessageText(_data);
		//cscr.insertBefore(div, cscr.firstChild);
		cscr.appendChild(div.firstChild);
		_data.time = msNow;
		__chatMessages.push(_data);
		sendChatMessage({n:__account.name, s:__socketId, m:_text.value});
		_text.value = '';
		this.chatCursor = 0;
		_text.blur();
		__account.lastMessageSent = msNow;
		_client.saveState();
		this.removeUnnecessaryMessages();
		this.scrollChatToBottom();
	}
	this.scrollChatToBottom = function() {
		const cscr = document.querySelector('.chat-screen');
		setTimeout(() => {
			cscr.scrollTop = cscr.scrollHeight;
		}, 50);
	}
	return this;
}
window.chat =chat;

})();