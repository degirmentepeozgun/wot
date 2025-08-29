'use strict';
const _allBuffs = {
	nocc: {
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
		append: true,
		gain: [
			{
				level: 1,
				props: {
					hpRegenRate: .3
				},
				ms: 1000
			},
			{
				level: 2,
				props: {
					hpRegenRate: .2
				},
				ms: 10000
			}
		]
	},
	last: {
		stack: true,
		gain: [
			{
				level: 1,
				props: {
					def: 15
				},
				ms: 7000
			},
			{
				level: 2,
				props: {
					def: 25
				},
				ms: 15000
			}
		]
	},
	stun: {
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
	speedup: {
		gain: [
			{
				level: 1,
				props: {
					stepXRate: 25
				},
				ms: 3000
			},
			{
				level: 2,
				props: {
					stepXRate: 50
				},
				ms: 4000
			}
		]
	},
	curse: {
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