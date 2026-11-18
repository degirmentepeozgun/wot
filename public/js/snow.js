'use strict';
var letItSnow;
function startSnow() {
	if (__account.options.weather) letItSnow = new snowyWeather();
}
function endSnow() {
	if (letItSnow) {
		letItSnow.Purify();
		letItSnow = null;
	}
}
function snowyWeather() {
	var c = document.getElementById('canv'),
		snowMsPrev = window.performance.now();
	if (!c) {
		c = document.createElement('canvas');
		c.id = 'canv';
		const _parent = document.getElementById('dobj-foreground');
		c.width = _parent.clientWidth;
		c.height = _parent.clientHeight;
		_parent.appendChild(c);
	}
	var $ = c.getContext('2d');
	var w = c.width,
		f,
		h = c.height;
	this.Purify = function () {
		if (c) {
			c.remove();
			c = null;
		}
	};
	this.snows = Snowy();
	function Snowy() {
		if (__weather.status === 'snowy') return;
		else if (__weather.status) stopWeather();
		__weather.status = 'snowy';
		var snow,
			arr = [];
		var num = 600,
			tsc = 1,
			sp = 1;
		var sc = 1.3 * __zoom,
			t = 0,
			mv = MathRound(50 * __zoom),
			min = 1;
		for (var i = 0; i < num; ++i) {
			snow = new Flake();
			snow.y = Math.random() * (h + mv);
			snow.x = Math.random() * w;
			snow.p = platformX;
			snow.t = Math.random() * (Math.PI * 2);
			snow.sz = (100 / (10 + Math.random() * 100)) * sc;
			snow.sp = Math.pow(snow.sz * 0.8, 2) * 0.15 * sp;
			snow.sp = snow.sp < min ? min : snow.sp;
			arr.push(snow);
		}

		function go() {}
		function Flake() {
			this.draw = function (_still) {
				const _left = MathRound((platformX - this.p) * 0.5);
				this.t += 0.05;
				this.t = this.t >= Math.PI * 2 ? 0 : this.t;
				this.y += this.sp;
				const _x = Math.sin(this.t * tsc) * (this.sz * 0.3);
				if (_still) this.x += _x;
				if (this.x - _left > w) this.x -= w + mv;
				else if (this.x - _left < -mv) this.x += w + mv;
				if (this.y > h + mv) {
					this.y = -mv - Math.random() * mv;
					this.x = Math.random() * w;
					this.p = platformX;
				}
				this.g = $.createRadialGradient(this.x - _left, this.y, 0, this.x - _left, this.y, this.sz);
				this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
				this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
				$.moveTo(this.x - _left, this.y);
				$.fillStyle = this.g;
				$.beginPath();
				$.arc(this.x - _left, this.y, this.sz, 0, Math.PI * 2, true);
				$.fill();
			};
		}
		return arr;
	}
	this.drawSnowFlakes = function () {
		$.clearRect(0, 0, w, h);
		const _still = prevPlatformX === platformX;
		this.snows.forEach((x) => x.draw(_still));
	};
}
