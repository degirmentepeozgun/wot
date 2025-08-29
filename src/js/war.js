'use strict';
function war() {
	this.render = function(_noAnimation) {
		let _html = 
		`<div data-module="war" class="book-page-wrapper war-container shop-container${_noAnimation ? '' : ' fade-me'}">
			<div class="flex book-page-bg">
				<div class="flex full">
					<div class="flex game-btn2 animate-me">MATCH</div>
				</div>
			</div>
		</div>`;
		updateMenuBottom(4);
		const _container = selectMenuContainer();
		_container.innerHTML = _html;
	}
	return this;
}