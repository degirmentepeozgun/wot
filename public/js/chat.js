'use strict';
console.log('chat');
function chat() {
	this.render = function(_noAnimation) {
		let _html = 
		`<div data-module="chat" class="book-page-wrapper chat-container shop-container${_noAnimation ? '' : ' fade-me'}">
			<div class="flex flex-ai-end book-page-bg">
				<div class="chat-screen w-100 flex flex-jc-end flex-ai-end">
					<div class="chat-screen-inner w-100 flex flex-ai-end">`
					+ this.renderChatMessages() +
				`</div>
				</div>
				<div class="chat-send-wrapper flex w-100">
					<div class="flex chat-send-text flex-jc-start">
						<input onkeydown="getRef(\'chat\')?.trySendMessage(event)" autocomplete="off" placeholder="${getLangData('Type your message')}" type="text" onpaste="return false" ondrop="return false" id="chat-message-owner-text" maxlength="200" />
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
		__lastChatCheck = msNow;
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