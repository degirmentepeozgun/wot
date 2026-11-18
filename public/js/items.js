'use strict';
const _equips = {
	helmet: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'def', power: 2, min: 5, max: 10, upgrade: 1 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'def', power: 2, min: 10, max: 15, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'def', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'def', power: 2, min: 35, max: 45, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'phsycal-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	leggings: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'def', power: 2, min: 5, max: 10, upgrade: 1 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'def', power: 2, min: 10, max: 15, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'def', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'def', power: 2, min: 35, max: 45, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'phsycal-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	chest: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'def', power: 2, min: 5, max: 10, upgrade: 1 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'def', power: 2, min: 10, max: 15, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'def', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'def', power: 2, min: 35, max: 45, upgrade: 1 },
				{ key: 'crit-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'phsycal-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	boots: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'hp', power: 0.5, min: 50, max: 100, upgrade: 10 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'hp', power: 0.5, min: 100, max: 150, upgrade: 10 },
				{ key: 'crit-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'hp', power: 0.5, min: 200, max: 300, upgrade: 10 },
				{ key: 'crit-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'hp', power: 0.5, min: 350, max: 450, upgrade: 10 },
				{ key: 'crit-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'steal-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	belt: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'hp', power: 0.5, min: 50, max: 100, upgrade: 10 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'hp', power: 0.5, min: 100, max: 150, upgrade: 10 },
				{ key: 'crit-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'hp', power: 0.5, min: 200, max: 300, upgrade: 10 },
				{ key: 'crit-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 2, max: 3, upgrade: 0.25 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'hp', power: 0.5, min: 350, max: 450, upgrade: 10 },
				{ key: 'crit-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'ice-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'lightning-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'toxic-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'shadow-resist-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'steal-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	ring: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'hp', power: 0.5, min: 50, max: 100, upgrade: 10 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'hp', power: 0.5, min: 100, max: 150, upgrade: 10 },
				{ key: 'crit-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'hp', power: 0.5, min: 200, max: 300, upgrade: 10 },
				{ key: 'crit-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 10, max: 20, upgrade: 1 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'hp', power: 0.5, min: 350, max: 450, upgrade: 10 },
				{ key: 'crit-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'steal-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	necklace: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'atk', power: 2, min: 5, max: 10, upgrade: 1 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'atk', power: 2, min: 10, max: 15, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'atk', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 10, max: 20, upgrade: 1 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'hp', power: 0.5, min: 350, max: 450, upgrade: 10 },
				{ key: 'crit-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'phsycal-dmg', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	gloves: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'hp', power: 0.5, min: 50, max: 100, upgrade: 10 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'hp', power: 0.5, min: 100, max: 150, upgrade: 10 },
				{ key: 'crit-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'hp', power: 0.5, min: 200, max: 300, upgrade: 10 },
				{ key: 'crit-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 10, max: 20, upgrade: 1 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'hp', power: 0.5, min: 350, max: 450, upgrade: 10 },
				{ key: 'crit-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'phsycal-dmg', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	bracers: {
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'atk', power: 2, min: 5, max: 10, upgrade: 1 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'atk', power: 2, min: 10, max: 15, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'atk', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 10, max: 20, upgrade: 1 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'atk', power: 2, min: 35, max: 45, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'pierce-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	},
	weapon: {
		grade0: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'atk', power: 2, min: 2, max: 4, upgrade: 0 }]
		},
		grade1: {
			minLevelRequired: 1,
			maxLevel: 1,
			props: [{ key: 'atk', power: 2, min: 5, max: 10, upgrade: 1 }]
		},
		grade2: {
			minLevelRequired: 1,
			maxLevel: 5,
			props: [
				{ key: 'atk', power: 2, min: 10, max: 15, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 1, max: 1.5, upgrade: 0.25 }
			]
		},
		grade3: {
			minLevelRequired: 5,
			maxLevel: 10,
			props: [
				{ key: 'atk', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 2, max: 3, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 10, max: 20, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 10, max: 20, upgrade: 1 }
			]
		},
		grade4: {
			minLevelRequired: 10,
			maxLevel: 15,
			props: [
				{ key: 'atk', power: 2, min: 35, max: 45, upgrade: 1 },
				{ key: 'crit-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'crit-dmg-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 },
				{ key: 'fire-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'ice-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'lightning-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'toxic-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'shadow-dmg', power: 2, min: 20, max: 30, upgrade: 1 },
				{ key: 'pierce-rate', power: 4, min: 3.5, max: 4.5, upgrade: 0.25 }
			]
		}
	}
};
