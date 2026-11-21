'use strict';
var letItSnow;
function startSnow() {
	if (!__account.options.weather) return;
	if (letItSnow || __weather.status === 'snowy') stopWeather();
	letItSnow = new snowyWeather();
}
function endSnow() {
	if (letItSnow) {
		letItSnow.Purify();
		letItSnow = null;
	}
}
function snowyWeather() {
	var c = document.getElementById('canv');
	if (c) c.remove();
	c = document.createElement('canvas');
	c.id = 'canv';
	c.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:20';
	const _pad = document.getElementById('game-pad');
	_pad.appendChild(c);
	var $ = c.getContext('2d');
	var w = 0,
		h = 0;
	const self = this;
	const _syncSize = function () {
		const _bw = _pad.clientWidth || (typeof _canvas !== 'undefined' ? _canvas.width : 0) || 0;
		const _bh = _pad.clientHeight || (typeof _canvas !== 'undefined' ? _canvas.height : 0) || 0;
		if (!_bw || !_bh) return false;
		if (c.width !== _bw || c.height !== _bh) {
			c.width = _bw;
			c.height = _bh;
			w = _bw;
			h = _bh;
			self.snows = null;
		} else {
			w = _bw;
			h = _bh;
		}
		return true;
	};
	this.Purify = function () {
		if (c) {
			c.remove();
			c = null;
		}
	};
	this.snows = null;
	function buildSnows() {
		if (__weather.status && __weather.status !== 'snowy') stopWeather();
		__weather.status = 'snowy';
		var snow,
			arr = [];
		var num = 600,
			tsc = 1,
			sp = 1;
		var sc = 1.3 * __zoom,
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
				$.fillStyle = this.g;
				$.beginPath();
				$.arc(this.x - _left, this.y, this.sz, 0, Math.PI * 2, true);
				$.fill();
			};
		}
		return arr;
	}
	_syncSize();
	if (w && h) {
		this.snows = buildSnows();
	} else {
		__weather.status = 'snowy';
	}
	this.drawSnowFlakes = function () {
		if (!_syncSize()) return;
		if (!this.snows) this.snows = buildSnows();
		$.clearRect(0, 0, w, h);
		const _still = prevPlatformX === platformX;
		this.snows.forEach((x) => x.draw(_still));
	};
}
