'use strict';
function store(_repeatEpisodeKey) {
	this.key = 'storm-of-blade-xyzxyz556';
	localStorage.removeItem(this.key);
	localStorage.setItem(this.key, JSON.stringify(mainCharacter));
	this.getMainCharacter = function (_ch, _friendlyChar) {
		let _char = _ch ?? createMainCharacter(_friendlyChar);
		_char = setCharacterFunctions(_char);
		_char.direction = 'right';
		_char.top = _canvas.height - _char.getHeight();
		_char.gearScore = _char.health = undefined;
		_char.buffs = _char.deBuffs = [];
		//_char.gearScore = this.calculateGearScore(null, _char);
		return _char;
	}
	// this.calculateGearScore = function (_x, _char) {
	// 	let _total = 0;
	// 	const items = (_x && !_x.inventory) ? [_x] : (_x?.inventory ? _x : (_char ?? mainCharacter))?.inventory?.filter(x => x.weared);
	// 	if (items?.[0])
	// 		for (var item of items) {
	// 			const _levelRate = (1 + (((item.level ?? 1) * 5) / 100));
	// 			if (item.baseProps)
	// 				for (var prop of item.baseProps) {
	// 					const _rate = properties.filter(x => x.type === prop.type)[0].rate ?? 1;
	// 					if (prop.type === 'minDmg') {
	// 						const dmg = parseFloat(prop.value * _levelRate);
	// 						_total += (((dmg + (minMaxDmgRate * dmg)) / 2) * _rate);
	// 					}
	// 					else if (prop.type === 'maxDmg')
	// 						continue;
	// 					else
	// 						_total += (parseFloat(prop.value * _levelRate) * _rate);
	// 				}
	// 			if (item.props) {
	// 				for (var prop of item.props)
	// 					_total += ((parseFloat(prop.value) * _levelRate) *
	// 						(properties.filter(x => x.type === prop.type)[0].rate ?? 1));
	// 			}
	// 		}
	// 	return parseInt(_total);
	// }
	this.getStats = function (_gear, _char) {
		const _items = _gear ? [_gear] : (_char ?? mainCharacter).inventory?.filter(x => x.weared);
		const _stats = [];
		if (_items?.[0])
			for (var _item of _items) {
				const _lvlRate = 1 + (_item.level > 1 ? _item.level / 20 : 0);
				if (_item.props)
					for (var _prop of _item.props) {
						const _stat = _stats.filter(x => x.key === _prop.type)?.[0];
						if (!_stat)
							_stats.push({ key: _prop.type, value: _prop.value * _lvlRate });
						else
							_stat.value += (_prop.value * _lvlRate);
					}
				if (_item.baseProps)
					for (var _prop of _item.baseProps) {
						const _stat = _stats.filter(x => x.key === _prop.type)?.[0];
						if (!_stat)
							_stats.push({ key: _prop.type, value: (_prop.value * _lvlRate) });
						else
							_stat.value += (_prop.value * _lvlRate);
					}
			}
		_stats.forEach(x => x.value = MathCeil(x.value));
		return _stats.sort((a, b) => this.getPropertyIndex(a) < this.getPropertyIndex(b));
	}
	this.getPropertyIndex = function (_prop) {
		for (var i = 0; i < properties.length; i++)
			if (_prop === properties[i].key)
				return i;
		return -1;
	}
	this.setCharacterStats = function (_char) {
		for (var _stat of properties)
			(_char ?? mainCharacter)[_stat.type] += _stat.baseValue;
		const _stats = this.getStats(null, _char);
		for (var _stat of _stats)
			(_char ?? mainCharacter)[_stat.key] += _stat.value;
		for (var _stat of properties)
			if (_stat.limit < (_char ?? mainCharacter)[_stat.type])
				(_char ?? mainCharacter)[_stat.type] = _stat.limit;
	}
	// this.getGearScoreDifference = function (_drop) {
	// 	const _wearedOne = mainCharacter.inventory.filter(x => x.type === _drop.type && x.weared)?.[0];
	// 	if (!_wearedOne)
	// 		return this.calculateGearScore(_drop);
	// 	else
	// 		return this.calculateGearScore(_drop) - this.calculateGearScore(_wearedOne);
	// }
}
let _store = new store();