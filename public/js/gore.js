'use strict';
const goreFx = (function () {
	const CUBE_JITTER = [
		[0.9, 0.2, 0.7, 0.4, 0.8, 0.1],
		[0.3, 0.9, 0.2, 0.8, 0.5, 0.7],
		[0.7, 0.5, 0.95, 0.15, 0.6, 0.35],
		[0.1, 0.6, 0.4, 0.9, 0.25, 0.85],
		[0.55, 0.05, 0.8, 0.6, 0.95, 0.3],
		[0.4, 0.75, 0.1, 0.5, 0.2, 0.9]
	];
	const GENERIC_FEET = /\/images\/related\/(boom|bodoff|ice-crack)|\/ep02\/burn\.png/;
	const LAND_WAIT = 3000;
	const GROUP_LIMIT = 6000;
	const BLINK_STEP = 500;
	const BLINK_STEPS = 4;
	const MAX_ITEMS = 1400;
	const cubes = new Map();

	const rand = function (_a, _b) {
		return _a + Math.random() * (_b - _a);
	};
	const cubeOf = function (_size, _variant) {
		const _key = _variant * 1000 + _size;
		let _cv = cubes.get(_key);
		if (_cv) return _cv;
		const _dim = _size + 4;
		_cv = document.createElement('canvas');
		_cv.width = _cv.height = _dim;
		const _c = _cv.getContext('2d');
		const _mid = _dim / 2;
		const _r = _size / 2;
		const _pts = [];
		for (let i = 0; i < 6; i++) {
			const _a = ((-90 + i * 60) * Math.PI) / 180;
			const _j = 0.82 + CUBE_JITTER[_variant][i] * 0.3;
			_pts.push([_mid + Math.cos(_a) * _r * _j, _mid + Math.sin(_a) * _r * _j]);
		}
		const face = function (_a, _b, _c2, _d, _color) {
			_c.beginPath();
			_c.moveTo(_a[0], _a[1]);
			_c.lineTo(_b[0], _b[1]);
			_c.lineTo(_c2[0], _c2[1]);
			if (_d) _c.lineTo(_d[0], _d[1]);
			_c.closePath();
			_c.fillStyle = _color;
			_c.fill();
		};
		const _center = [_mid, _mid];
		face(_center, _pts[5], _pts[0], _pts[1], '#d6f9ff');
		face(_center, _pts[5], _pts[4], _pts[3], '#74d7ea');
		face(_center, _pts[1], _pts[2], _pts[3], '#3aaec9');
		_c.beginPath();
		_c.moveTo(_pts[0][0], _pts[0][1]);
		for (let i = 1; i < 6; i++) _c.lineTo(_pts[i][0], _pts[i][1]);
		_c.closePath();
		_c.strokeStyle = 'rgba(240,255,255,0.85)';
		_c.lineWidth = Math.max(0.6, _size / 18);
		_c.stroke();
		cubes.set(_key, _cv);
		return _cv;
	};
	const bodyOf = function (_ep, _e, _t) {
		const _h = _e.HURTHEIGHT || _e.HEIGHT || _e.height || 80;
		const _ground = _ep.cHeight - (_e.yPosition ?? 0) + (_e.yGap ?? 0);
		const _left = _e.LEFT ?? _e.left ?? 0;
		return {
			h: _h,
			w: _e.WIDTH || _e.width || 40,
			ground: _ground,
			top: _e.TOP ?? _ground - _h,
			left: _left,
			sign: _t && (_t.LEFT ?? _t.left ?? 0) > _left ? -1 : 1,
			depth: _ep.getDepthDrawScaleY(_e.yPosition ?? 0)
		};
	};
	const bankOf = function (_ep) {
		if (!_ep._goreFx) _ep._goreFx = [];
		const _over = _ep._goreFx.length - MAX_ITEMS;
		if (_over > 0) _ep._goreFx.splice(0, _over);
		return _ep._goreFx;
	};
	const release = function (_e) {
		_e._goreDone = 1;
		_e._goreLinger = 0;
		_e.particles = undefined;
	};
	const addIce = function (_bank, _s, _size, _tier, _group) {
		_group.pending++;
		const _sz = Math.max(4, Math.round(_size));
		const _burst = _s.h / 16;
		const _gy = _s.ground + (Math.random() - 0.5) * _s.h * 0.14 - _sz * 0.3 * _s.depth;
		const _away = Math.random() < 0.62 ? _s.sign : -_s.sign;
		const _slow = _tier === 0 ? 0.7 : 1;
		_bank.push({
			x: _s.left + _s.w * rand(0.15, 0.85),
			y: Math.min(_s.top + _s.h * rand(0.15, 0.85), _gy - 4),
			vx: _away * rand(0.2, 1) * _burst * _slow * (_tier === 2 ? 1.25 : 1),
			vy: -rand(0.6, 1.3) * _burst * _slow,
			g: Math.max(1.1, _s.h / 90),
			rot: rand(-Math.PI, Math.PI),
			vr: rand(-0.5, 0.5) * (_tier === 2 ? 1.6 : 1),
			sz: _sz,
			v: (Math.random() * CUBE_JITTER.length) | 0,
			gy: _gy,
			d: _s.depth,
			p: platformX,
			bounces: 0,
			landed: 0,
			gr: _group
		});
	};
	const ice = function (_e, _t) {
		if (!_e || _e._goreDone || _e.class === 'object') return false;
		const _ep = episode;
		const _s = bodyOf(_ep, _e, _t);
		const _m = Math.max(0.5, Math.min(2, Math.sqrt(_s.w * _s.h) / 110));
		const _low = _ep.LowPerformance ? 0.5 : 1;
		const _bank = bankOf(_ep);
		const _group = { pending: 0, land: 0, born: _gameTick };
		const _big = Math.max(1, Math.round(2 * _m * _low));
		for (let i = 0; i < _big; i++) addIce(_bank, _s, _s.h * rand(0.143, 0.215), 0, _group);
		const _mid = Math.round(5 * _m * _low);
		for (let i = 0; i < _mid; i++) addIce(_bank, _s, _s.h * rand(0.084, 0.132), 1, _group);
		const _small = Math.round(12 * _m * _low);
		for (let i = 0; i < _small; i++) addIce(_bank, _s, _s.h * rand(0.047, 0.077), 2, _group);
		PlaySound({ key: 'icecrack', volume: 0.3, owner: _e });
		release(_e);
		return true;
	};
	const draw = function (_ctx, _ep) {
		const _bank = _ep._goreFx;
		if (!_bank?.length) return;
		const _now = _gameTick;
		for (let i = _bank.length - 1; i >= 0; i--) {
			const p = _bank[i];
			if (!p.landed) {
				p.vy += p.g;
				p.x += p.vx;
				p.y += p.vy;
				p.vx *= 0.97;
				p.rot += p.vr;
				if (p.y >= p.gy) {
					p.y = p.gy;
					if (p.bounces < 1 && p.vy > 3) {
						p.vy = -p.vy * 0.32;
						p.vx *= 0.6;
						p.vr *= 0.5;
						p.bounces++;
					} else {
						p.vx = p.vy = p.vr = 0;
						p.landed = _now;
						p.gr.pending--;
					}
				}
			} else {
				const _gr = p.gr;
				if (!_gr.land && (_gr.pending <= 0 || _now - _gr.born > GROUP_LIMIT)) _gr.land = _now;
				const _wait = _gr.land ? _now - _gr.land - LAND_WAIT : -1;
				if (_wait >= 0) {
					const _step = (_wait / BLINK_STEP) | 0;
					if (_step >= BLINK_STEPS) {
						_bank[i] = _bank[_bank.length - 1];
						_bank.pop();
						continue;
					}
					if (_step % 2 === 0) continue;
				}
			}
			const _cv = cubeOf(p.sz, p.v);
			const _dim = _cv.width * p.d;
			_ctx.save();
			_ctx.translate(p.x - (platformX - p.p), p.y);
			_ctx.rotate(p.rot);
			_ctx.drawImage(_cv, -_dim / 2, -_dim / 2, _dim, _dim);
			_ctx.restore();
		}
	};
	const isGenericFeet = function (_anima) {
		return !!_anima?.src && GENERIC_FEET.test(_anima.src);
	};
	return { ice: ice, draw: draw, isGenericFeet: isGenericFeet };
})();
