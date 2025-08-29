'use strict';
console.log('chat');
function chat() {
	this.render = function(_noAnimation) {
		let _html = 
		`<div data-module="chat" class="book-page-wrapper chat-container shop-container${_noAnimation ? '' : ' fade-me'}">
			<div class="flex book-page-bg">
				<div class="chat-send-wrapper flex w-100">
					<div class="flex chat-send-text flex-jc-start">
						<input placeholder="Type your message" type="text" />
					</div>
					<div class="flex chat-send-btn">
						<img class="flip" src="./images/ui/2.png" />
					</div>
				</div>
				<div class="chat-screen w-100 flex flex-ai-end flex-jc-start">
				
				</div>
			</div>
		</div>`;
		updateMenuBottom(3);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
	}
	return this;
}