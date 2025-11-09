'use strict';
const _allBuffs = {
	nocc: {
		id: 1,
		objects: [
			{ key: 'nocc', position: 'middle' }
		],
		gain: [{
			level: 1,
			props: {
				noCC: true
			},
			ms: 5000
		}, {
			level: 2,
			props: {
				noCC: true
			},
			ms: 10000
		}]
	},
	reflect: {
		id: 2,
		sound: { key: 'reflect', volume: 1 },
		objects: [
			{ key: 'reflect', position: 'middle' }
		],
		gain: [{
			level: 1,
			props: {
				reflect: true
			},
			ms: 5000
		}, {
			level: 2,
			props: {
				reflect: true
			},
			ms: 10000
		}]
	},
	hps: {
		id: 3,
		append: true,
		gain: [
			{
				level: 1,
				props: {
					hpRegenRate: 3
				},
				ms: 1000
			},
			{
				level: 2,
				props: {
					hpRegenRate: 4
				},
				ms: 1000
			},
			{
				level: 3,
				props: {
					hpRegenRate: 5
				},
				ms: 1000
			},
			{
				level: 4,
				props: {
					hpRegenRate: .2
				},
				ms: 10000
			}
		]
	},
	last: {
		id: 4,
		stack: true,
		gain: [
			{
				level: 1,
				props: {
					def: 15
				},
				ms: 10000
			},
			{
				level: 2,
				props: {
					def: 30
				},
				ms: 10000
			}
		]
	},
	atk: {
		id: 5,
		objects: [
			{ key: 'atkbuff', position: 'over-head',  type: 'buff', still: false, repeat: true, bind: 'atk' }
		],
		gain: [
			{
				level: 1,
				props: {
					atk: 15
				},
				ms: 10000
			},
			{
				level: 2,
				props: {
					atk: 25
				},
				ms: 20000
			}
		]
	},
	stun: {
		id: 6,
		stack: 1,
		loss: [
			{
				level: 1,
				props: {
					immobilize: true
				},
				ms: 1000
			}
		]
	},
	rage: {
		id: 7,
		gain: [
			{
				level: 3,
				props: {
					stepXRate: 25,
					atk: 20,
					def: 20,
					ultimate: true
				},
				ms: 10000
			},
			{
				level: 4,
				props: {
					stepXRate: 25,
					speedRate: 50,
					atk: 20,
					def: 20,
					ultimate: true
				},
				ms: 10000
			},
			{
				level: 5,
				props: {
					ultimate: true
				},
				ms: 20000
			}
		]
	},
	weakness: {
		id: 8,
		stack: 3,
		objects: [
			{ key: 'weakness', position: 'middle', type: 'buff', still: false, scale: .8, singleton: true, bind: 'weakness', repeat: true }
		],
		loss: [
			{
				level: 1,
				props: {
					atk: -5,
					def: -5
				},
				ms: 3000
			},
			{
				level: 2,
				props: {
					atk: -10,
					def: -10
				},
				ms: 3000
			}
		]
	},
	speedup: {
		id: 9,
		gain: [
			{
				level: 1,
				props: {
					stepXRate: 5
				},
				ms: 5000
			},
			{
				level: 2,
				props: {
					stepXRate: 10
				},
				ms: 5000
			}
		]
	},
	dance: {
		id: 10,
		gain: [
			{
				level: 1,
				props: {
					stepRate: 5
				},
				ms: 5000
			},
			{
				level: 2,
				props: {
					stepRate: 10
				},
				ms: 5000
			}
		]
	},
	curse: {
		id: 11,
		waitToFinish: true,
		objects: [
			{
				key: 'curse',
				position: 'css',
				p1: 3000,
				p2: './images/related/witch.png',
				main: true
			}
		],
		loss: [
			{
				level: 3,
				props: {
					hpRegenRate: -2,
					immobilize: true
				},
				ms: 5000
			}
		]
	},
	poison: {
		id: 12,
		objects: [
			{ key: 'disease', position: 'middle', type: 'buff', still: false, scale: .8, singleton: true, bind: 'poison', repeat: true }
		],
		stack: 3,
		append: true,
		loss: [
			{
				level: 1,
				props: {
					hpRegenRate: -1,
					poison: true
				},
				ms: 3000
			},
			{
				level: 2,
				props: {
					hpRegenRate: -2,
					poison: true
				},
				ms: 3000
			}
		]
	},
	root: {
		id: 13,
		loss: [
			{
				level: 1,
				props: {
					hpRegenRate: -1,
					still: true
				},
				ms: 3000
			}
		]
	},
	fire: {
		id: 14,
		objects: [
			{ key: 'burn', position: 'middle', type: 'buff', still: false, singleton: true, bind: 'fire', repeat: true }
		],
		stack: 3,
		append: true,
		loss: [
			{
				level: 1,
				props: {
					hpRegenRate: -1,
					burn: true
				},
				ms: 3000
			},
			{
				level: 2,
				props: {
					hpRegenRate: -2,
					burn: true
				},
				ms: 3000
			}
		]
	},
	ice: {
		id: 15,
		// objects: [
		// 	{ key: 'cold', position: 'middle-head', type: 'buff', still: false, singleton: true, bind: 'ice', repeat: true }
		// ],
		//stack: 3,
		append: true,
		loss: [
			{
				level: 1,
				props: {
					hpRegenRate: -.5,
					fps: .25,
					freeze: true
				},
				ms: 3000
			},
			{
				level: 2,
				props: {
					hpRegenRate: -1,
					fps: 1,
					freeze: true
				},
				ms: 3000
			}
		]
	},
	sleep: {
		id: 16,
		objects: [
			{ key: 'sleep', position: 'middle-head' }
		],
		loss: [
			{
				level: 1,
				props: {
					sleep: true
				},
				ms: 3000
			}
		]
	},
	slow: {
		id: 17,
		loss: [
			{
				level: 1,
				props: {
					stepXRate: 25
				},
				ms: 2000
			},
			{
				level: 2,
				props: {
					stepXRate: 50
				},
				ms: 3000
			}
		]
	},
	web: {
		id: 18,
		loss: [
			{
				level: 1,
				props: {
					still: true
				},
				ms: 2000
			},
			{
				level: 2,
				props: {
					still: true
				},
				ms: 3000
			}
		]
	},
	invisibility: {
		id: 19,
		gain: [
			{
				level: 1,
				props: {
					iframe: true,
					invisible: true
				},
				ms: 10000
			},
			{
				level: 2,
				props: {
					iframe: true,
					invisible: true
				},
				ms: 12500
			},
			{
				level: 3,
				props: {
					iframe: true,
					invisible: true
				},
				ms: 15000
			}
		]
	},
	timestop: {
		id: 20,
		waitToFinish: true,
		loss: [
			{
				level: 1,
				props: {
					fps: -1900
				},
				ms: 500
			}
		]
	},
	ticketgold: {
		id: 21,
		gain: [
			{
				level: 1,
				props: {
					goldEnabled: true
				},
				ms: 1
			}
		]
	},
	ticketexp: {
		id: 22,
		gain: [
			{
				level: 1,
				props: {
					expEnabled: true
				},
				ms: 1
			}
		]
	},
	ticketitem: {
		id: 23,
		gain: [
			{
				level: 1,
				props: {
					itemEnabled: true
				},
				ms: 1
			}
		]
	},
	release: {
		id: 24,
		gain: [
			{
				level: 1,
				props: {
					invulnerable: true,
					iframe: true,
					release: true
				},
				ms: 3000
			},
			{
				level: 2,
				props: {
					invulnerable: true,
					iframe: true,
					release: true
				},
				ms: 3000
			},
			{
				level: 3,
				props: {
					invulnerable: true,
					iframe: true,
					release: true
				},
				ms: 2000
			}
		]
	}
};

function getBuffKeyById(_id) {
	for(let key in _allBuffs) {
		const b = _allBuffs[key];
		if(b.id === _id)
			return key;
	}
	return null;
}