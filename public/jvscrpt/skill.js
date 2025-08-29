'use strict';
function characterSkill() {
	this.allSkills = [
		{
			names: { 
				en: 'Normal Attack',
				tr: 'Basit Saldırı'
			},
			descriptions: {
				en: 'A combination of fast sword attacks ending with a knockback',
				tr: 'Sonunda düşmanı geriye teptiren hızlı ve ard arda gelen kılıç darbeleri'
			},
			key: 'attack',
			class: 'warrior',
			skillClass: 'Ground',
			type: 'skill',
			dmgType: 'Common',
			order: 1,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			names: { 
				en: 'Meditation',
				tr: 'Meditasyon'
			},
			descriptions:
			{ 
				en: 'A channeling skill which increase some of your HP per second, interrupts when opponents make an attack on you or when you move',
				tr: 'Engel olunmadığı taktirde geçen her saniye boyunca sağlığınızı arttırır. Saldırıya uğradığınızda veya kımıldadığınızda iptal olur'
			},
			key: 'defense',
			class: 'warrior',
			type: 'skill',
			order: 8,
			unlockLevel: 8,
			props: [
				{ level: 1, type: 'Health Per Second', value: 3 },
				{ level: 2, type: 'Health Per Second', value: 4 },
				{ level: 3, type: 'Health Per Second', value: 5 }
			]
		},
		{
			names: {
				en: 'Air Attack',
				tr: 'Hava Saldırısı'
			},
			descriptions: {
				en: 'A fast charge from ground to throw opponents into air',
				tr: 'Yerden hızlı bir hareket eşliğinde düşmanı havaya fırlatır'
			},
			class: 'warrior',
			key: 'ground1',
			skillClass: 'Air',
			dmgType: 'Common',
			type: 'skill',
			order: 3,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			names: {
				en: 'Round Kick',
				tr: 'Döner Tekme'
			},
			descriptions: {
				en: 'Being active after using air attack for couple of seconds. Pushes you forward with throwing opponents into air',
				tr: 'Hava saldırısı kullanıldıktan sonra bir kaç saniyeliğine aktif olur. Sizi ileri hareket ettirir ve rakiplerinizi havaya fırlatır'
			},
			class: 'warrior',
			key: 'ground3',
			skillClass: 'Air',
			dmgType: 'Common',
			type: 'skill',
			order: 10,
			unlockLevel: 2,
			props: [
				{ level: 1, type: 'Attack', value: 130 },
				{ level: 2, type: 'Attack', value: 140 },
				{ level: 3, type: 'Attack', value: 150 },
				{ level: 4, type: 'Attack', value: 160 },
				{ level: 5, type: 'Attack', value: 170 },
				{ level: 6, type: 'Attack', value: 180 },
				{ level: 7, type: 'Attack', value: 190 },
				{ level: 8, type: 'Attack', value: 200 },
				{ level: 9, type: 'Attack', value: 210 },
				{ level: 10, type: 'Attack', value: 220 }
			]
		},
		{
			names: {
				en: 'Leap Attack',
				tr: 'Zıplama Saldırısı'
			},
			descriptions: {
				en: 'A leap attack which throws opponents around landing area into air, you can choose the leap direction before use',
				tr: 'Kendi bulunduğu alanda veya seçilen yönde zıplayıp yere vurarak saldırı yapar, etrafındaki düşmanları havaya fırlatır'
			},
			key: 'ground2',
			affectedKeys: ['ground2modified'],
			class: 'warrior',
			skillClass: 'Air',
			dmgType: 'Earth',
			type: 'skill',
			order: 4,
			unlockLevel: 4,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			names: { 
				en: 'Ranged Attack',
				tr: 'Uzaktan Saldırı'
			},
			descriptions: {
				en: 'Hurl a lightning bolt forwards which stuns and gives lightning damage to opponents',
				tr: 'Uzaktan düşmana doğru bir ışık oku fırlatır. İlk çarptığı düşman sersemler'
			},
			key: 'air1',
			class: 'warrior',
			dmgType: 'Lightning',
			skillClass: 'Ground',
			type: 'skill',
			order: 5,
			unlockLevel: 6,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			names: {
				en: 'Rage Skill',
				tr: 'Öfke Yeteneği'
			},
			descriptions: {
				en: 'When you have enough rage, hurls big tornados around which throws opponents into air and gives massive lightning damage with Attack, Defense and Run Speed Increase for next 10 seconds',
				tr: 'Yeterli oranda öfke puanı toplandığında aftif olur. Kullanıldığı anda oluşan yıldırım hortumları etraftaki düşmanları havaya fırlatır ve belli süreliğine Saldırı, Savunma ve Koşu Hızı yeteneklerinizi arttırır'
			},
			key: 'air2',
			class: 'warrior',
			dmgType: 'Lightning',
			skillClass: 'Air',
			type: 'skill',
			order: 6,
			list: false,
			unlockLevel: 10,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			names: {
				en: 'Whirlwind Attack',
				tr: 'Kasırga Saldırısı'
			},
			descriptions: {
				en: 'A fast moving controllable attack from ground to throw opponents into air with sword attacks',
				tr: 'Yerden hareketi kontrol edilebilir hızlı kılıç darbeleri ile rakipleri havaya fırlatır'
			},
			class: 'warrior',
			key: 'ground1modified',
			skillClass: 'Air',
			dmgType: 'Lightning',
			type: 'skill',
			order: 11,
			unlockLevel: 10,
			props: [
				{ level: 1, type: 'Attack', value: 210 },
				{ level: 2, type: 'Attack', value: 220 },
				{ level: 3, type: 'Attack', value: 230 },
				{ level: 4, type: 'Attack', value: 240 },
				{ level: 5, type: 'Attack', value: 250 },
				{ level: 6, type: 'Attack', value: 260 },
				{ level: 7, type: 'Attack', value: 270 },
				{ level: 8, type: 'Attack', value: 280 },
				{ level: 9, type: 'Attack', value: 290 },
				{ level: 10, type: 'Attack', value: 300 }
			]
		},
		{
			names: {
				en: 'Bayblade',
				tr: 'Beyblade'
			},
			descriptions: {
				en: 'A piercing ranged lightning bolt attack',
				tr: 'Uzaktan kullanılabilen delici yıldırım saldırısı'
			},
			class: 'warrior',
			key: 'air1modified',
			skillClass: 'Ground',
			dmgType: 'Lightning',
			type: 'skill',
			order: 12,
			unlockLevel: 10,
			props: [
				{ level: 1, type: 'Attack', value: 210 },
				{ level: 2, type: 'Attack', value: 220 },
				{ level: 3, type: 'Attack', value: 230 },
				{ level: 4, type: 'Attack', value: 240 },
				{ level: 5, type: 'Attack', value: 250 },
				{ level: 6, type: 'Attack', value: 260 },
				{ level: 7, type: 'Attack', value: 270 },
				{ level: 8, type: 'Attack', value: 280 },
				{ level: 9, type: 'Attack', value: 290 },
				{ level: 10, type: 'Attack', value: 300 }
			]
		},
		{
			name: 'Normal Attack',
			description: 'A combination of fast duel knife attacks ending with a knockback',
			key: 'attack',
			class: 'thief',
			skillClass: 'Air',
			type: 'skill',
			dmgType: 'Common',
			order: 1,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Invisibility',
			description: 'Being invisible for 10 seconds, an attack move or taken damage breaks invisibility',
			key: 'defense',
			class: 'thief',
			type: 'skill',
			order: 8,
			unlockLevel: 8,
			props: [
				{ level: 1, type: 'Invisibility Duration', value: 100 },
				{ level: 2, type: 'Invisibility Duration', value: 125 },
				{ level: 3, type: 'Invisibility Duration', value: 150 }
			]
		},
		{
			name: 'Throwing Stars',
			description: 'Jump and hurls sharp stars around which throw opponents into air',
			class: 'thief',
			key: 'ground1',
			skillClass: 'Air',
			dmgType: 'Common',
			type: 'skill',
			order: 3,
			unlockLevel: 2,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Charge Attack',
			description: 'A fast charge with knife which stuns and knockback opponents',
			key: 'ground2',
			class: 'thief',
			skillClass: 'Ground',
			dmgType: 'Common',
			type: 'skill',
			order: 4,
			unlockLevel: 4,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Pull Attack',
			description: 'Hurl a chain through the direction you look and pull closer enemies',
			key: 'air1',
			class: 'thief',
			dmgType: 'Common',
			skillClass: 'Ground',
			type: 'skill',
			order: 5,
			unlockLevel: 6,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Rage Skill',
			description: 'When you have enough rage, pulls nearby enemies and summons lightning spheres, throwing opponents into air and summon a decoy which is immune all attacks for suppor next 10 seconds',
			key: 'air2',
			class: 'thief',
			dmgType: 'Lightning',
			skillClass: 'Air',
			type: 'skill',
			order: 6,
			unlockLevel: 10,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},

		{
			name: 'Normal Attack',
			description: 'Arrow shots with ending knockbacking multiple shot',
			key: 'attack',
			class: 'archer',
			skillClass: 'Ground',
			type: 'skill',
			dmgType: 'Common',
			order: 1,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Rejuvenation',
			description: 'A green energy covers your body and heals you per second',
			key: 'defense',
			class: 'archer',
			type: 'skill',
			order: 8,
			unlockLevel: 8,
			props: [
				{ level: 1, type: 'Rejuvenation Duration', value: 100 },
				{ level: 2, type: 'Rejuvenation Duration', value: 125 },
				{ level: 3, type: 'Rejuvenation Duration', value: 150 }
			]
		},
		{
			name: 'Fire Arrow',
			description: 'An arrow shot which pierce with an extra fire damage',
			class: 'archer',
			key: 'ground1',
			skillClass: 'Ground',
			dmgType: 'Fire',
			type: 'skill',
			order: 3,
			unlockLevel: 2,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Storm Attack',
			description: 'A long ranged atack with summoning thunder bolts through ground which throws opponents into air',
			key: 'ground2',
			class: 'archer',
			skillClass: 'Air',
			dmgType: 'Lightning',
			type: 'skill',
			order: 4,
			unlockLevel: 4,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Air Attack',
			description: 'Attack from air with arrows which explodes when hit the ground and gives massive damage',
			key: 'air1',
			class: 'archer',
			dmgType: 'Common',
			skillClass: 'Ground',
			type: 'skill',
			order: 5,
			unlockLevel: 6,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Rage Skill',
			description: 'When you have enough rage, you summon electric circles which moves around you and throws opponent into air, buffs you up with attack speed',
			key: 'air2',
			class: 'archer',
			dmgType: 'Lightning',
			skillClass: 'Air',
			type: 'skill',
			order: 6,
			unlockLevel: 10,
			props: [
				{ level: 1, type: 'Attack', value: 110 },
				{ level: 2, type: 'Attack', value: 120 },
				{ level: 3, type: 'Attack', value: 130 },
				{ level: 4, type: 'Attack', value: 140 },
				{ level: 5, type: 'Attack', value: 150 },
				{ level: 6, type: 'Attack', value: 160 },
				{ level: 7, type: 'Attack', value: 170 },
				{ level: 8, type: 'Attack', value: 180 },
				{ level: 9, type: 'Attack', value: 190 },
				{ level: 10, type: 'Attack', value: 200 }
			]
		},
		{
			name: 'Normal Attack',
			key: 'attack',
			class: 'cyclops',
			skillClass: 'Ground',
			type: 'skill',
			dmgType: 'Common',
			order: 1,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 }
			]
		},
		{
			name: 'Revive',
			key: 'defense',
			class: 'cyclops',
			type: 'skill',
			order: 8,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Rejuvenation Duration', value: 100 }
			]
		},
		{
			name: 'Ground1 Attack',
			class: 'cyclops',
			key: 'ground1',
			skillClass: 'Ground',
			dmgType: 'Fire',
			type: 'skill',
			order: 3,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 }
			]
		},
		{
			name: 'Ground2 Attack',
			key: 'ground2',
			class: 'cyclops',
			skillClass: 'Air',
			dmgType: 'Common',
			type: 'skill',
			order: 4,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 }
			]
		},
		{
			name: 'Air Attack',
			key: 'air1',
			class: 'cyclops',
			dmgType: 'Common',
			skillClass: 'Ground',
			type: 'skill',
			order: 5,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 }
			]
		},
		{
			name: 'Rage Skill',
			key: 'air2',
			class: 'cyclops',
			dmgType: 'fire',
			skillClass: 'Air',
			type: 'skill',
			order: 6,
			unlockLevel: 1,
			props: [
				{ level: 1, type: 'Attack', value: 110 }
			]
		}
	];
	this.passiveSkills = [{
		key: 'passive-hp',
		name: 'More HP',
		description: 'Additional HP for keeping yourself alive much longer',
		unlockLevel: 1,
		gain: ['%20 more health point'],
		price: 50000
	}, {
		key: 'passive-counter',
		name: 'Clever And Strong',
		description: 'When you time your block move within attack of your opponent, your hero makes a counter attack move against opponent',
		unlockLevel: 1,
		price: 15000,
		chanceRate: 50,
		gain: ['%10 atk and %10 defense increased after counter-attack for 5 seconds']
	}, {
		key: 'passive-run',
		name: 'Run Rabbit Run',
		description: 'You become a faster runner and move quickly against your oponents',
		unlockLevel: 5,
		gain: ['%25 faster run and walk'],
		price: 20000
	}, {
		key: 'passive-def',
		name: 'Last Man Standing',
		description: 'Your defense increase when your HP decrease under %20',
		gain: ['%20 defense increased'],
		unlockLevel: 5,
		price: 5000
	}, {
		key: 'passive-roll',
		name: 'lightning Reflexes',
		description: 'Decrease cooldown of dodge skill',
		gain: ['%25 dodge cooldown descreased'],
		unlockLevel: 10,
		price: 15000
	}, {
		key: 'passive-parry',
		name: 'Timing Is Precious',
		description: 'If you time your block well and activate counter-attack, you gain some HP',
		gain: ['Level 1 health per second buff applies'],
		unlockLevel: 10,
		chanceRate: 20,
		price: 10000
	}, {
		key: 'passive-crit',
		name: 'Hit Me More',
		description: 'When you crit your opponent well, you may gain an attack speed buff for next moves',
		gain: ['Level 1 attack speed buff applies'],
		unlockLevel: 10,
		chanceRate: 20,
		price: 10000
		}];
	//if (unlockAll)
		//this.allSkills.forEach(x => x.unlockLevel = 1);
	this.calculateSkillPrice = function (_key) {
		const _skill = this.allSkills.find(x => x.key === _key && x.class === mainCharacter.class);
		if (_skill)
			return 1000 * (_skill.level ?? 1);
		return 1000;
	}
	this.getSkillTab = function (_order) {
		if (_order === 0)
			this.getSkillUI(mainCharacter.class);
		else
			this.getPassiveSkillUI(1);
	}
	this.getSkillUI = function (_class) {
		const _left = document.querySelector('.skills-container .skills-content-left');
		if (_left) {
			_left.innerHTML = this.getSkillsUI(_class, 1);
			document.querySelector('.skills-container .skills-content-detail-wrapper').innerHTML = this.getSkillDetailUI(_class, 1) + '<div id="shine"></div>';
			return;
		}
		document.getElementById('book-content-2').innerHTML = 
			'<div class="skills-container need-money full" style="padding:0 9% 6% 9%;overflow:hidden;position:relative">' + 
				'<div class="full flex">' +
					'<div style="width:50%;height:100%">' +
						'<div class="skills-content-left">' +
							this.getSkillsUI(_class, 1) +
						'</div>' +
					'</div>' +
					'<div style="width:50%;height:100%">' + 
						'<div class="skills-content-right">' +
							'<div class="skills-content-detail-wrapper" style="position:relative !important;overflow:hidden !important">' +
								this.getSkillDetailUI(_class, 1) +
								'<div id="shine"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' + 
			'</div>';
	}
	this.getSkillsUI = function (_class, _order) {
		const _skills = this.allSkills.filter(x => x.class === _class && x.list !== false)?.sort((a, b) => a.order - b.order);
		let html = '';
		if (_skills) {
			let _i = 0;
			for (var _skill of _skills) {
				const _active = _skill.unlockLevel <= mainCharacter.level;
				let _level = !_active ? 0 : _skill.level ?? 1;
				html += '<div data-key="'+_skill.key+'" onclick="skill.selectSkill(\'' + _skill.key + '\', ' + _i + ')" class="skill-card flex' + ((_i + 1) === _order ? ' selected' : '') + '">' +
					'<div class="skill-icon-wrapper flex"><img src="./images/main/skill-icons/' + _class + '/' + _skill.key + '.png" /></div>' +
					'<div style="flex:1;height:100%">' +
					'<div class="flex flex-jc-start" style="height:50%;width:100%">' + _skill.names[getLang()] + '</div>' +
					(_level > 0 ?
						'<div class="flex flex-jc-start" style="height:50%;width:100%;padding-left:1vh"><span id="skill-' + _skill.key + '-level">' + _level + '</span> / ' + _skill.props.length + '</div>' :
						'<div class="flex flex-jc-start" style="height:50%;width:100%;padding-left:1vh">' + getLangData('Unlock') + ':&nbsp;<span style="color:#ff6c00 !important">' + getLangData('Level') + ' ' + _skill.unlockLevel + '</span></div>') +
					'</div>' +
					'</div>';
				_i++;
			}
		}
		return html;
	}
	this.selectSkill = function (_key, _index) {
		const _skillCards = document.querySelectorAll('.skills-container .skill-card');
		const _container = document.querySelector('.skills-container .skills-content-detail-wrapper');
		let _i = 0;
		for (var _sc of _skillCards) {
			if (_i === _index) {
				addClass(_sc, 'selected');
				const _skill = this.allSkills.filter(x => x.class === mainCharacter.class  && x.list !== false)?.sort((a, b) => a.order - b.order)[_index];
				_container.innerHTML = this.getSkillDetailUI(mainCharacter.class, _skill.order) + '<div id="shine"></div>';
			}
			else
				removeClass(_sc, 'selected');
			_i++;
		}
	}
	this.getSkillDetailUI = function (_class, _order) {
		const _skill = this.allSkills.find(x => x.class === _class && x.order === _order);
		if (_skill) {
			const _animation = mainCharacter.animations[_skill.key];
			const _currentProps = _skill.props.find(x => x.level === (_skill.level ?? 1));
			let _nextProps = _skill.props.find(x => x.level === ((_skill.level ?? 1) + 1));
			let html = '<div style="height:86%;overflow-y:auto">' +
				'<div style="padding:3vh 5vh 1vh 5vh">' + _skill.descriptions[getLang()] + (_skill.key.endsWith('modified') ? '<br/><span style="color:#ff6c00 !important">(' + getLangData('Rage mode only') + ')</span>' : '') + '</div>' +
				'<div class="skill-content-title" class="flex flex-jc-start">' + getLangData('Upgrade Cost') + '</div>' +
				'<div style="padding:1vh 5vh"><span id="skill-cost">' + this.calculateSkillPrice(_skill.key) + '</span>&nbsp;<img src="./images/icons/coin.png" style="height:2.6vh" /></div>' +
				'<div class="skill-content-title">' + getLangData('Skill Break Priority') + '</div>' +
				'<div style="padding:1vh 5vh">' + getLangData(this.getSkillPriority(_animation.priority)) + '</div>' +
				'<div class="skill-content-title">' + getLangData('Skill Type') + '</div>' +
				'<div style="padding:1vh 5vh">' + getLangData(_skill.skillClass ?? 'Common') + '</div>' +
				'<div class="skill-content-title">' + getLangData('Cooldown') + '</div>' +
				'<div style="padding:1vh 5vh">' + this.getSkillCooldown(_animation.cooldown) + '</div>' +
				(_skill.dmgType ?
					'<div class="skill-content-title">' + getLangData('Damage Type') + '</div>' +
					'<div class="flex flex-jc-start" style="padding:1vh 5vh"><img style="height:3vh;margin-right:1vh" src="./images/elemental/' + _skill.dmgType.toLowerCase() + '.png" />' + getLangData(_skill.dmgType) + '</div>' : '') +
				'<div id="skill-current-props"><div class="skill-content-title">' + getLangData('Current Level') + '</div>' +
				'<div style="padding:1vh 5vh">+ %' + _currentProps.value + ' ' + getLangData(_currentProps.type) + '</div></div>' +
				(_nextProps ? '<div id="skill-next-props"><div class="skill-content-title">' + getLangData('Next Level') + '</div>' +
					'<div style="padding:1vh 5vh">+ %' + _nextProps.value + ' ' + getLangData(_nextProps.type) + '</div></div>' : '') +
				'</div>' +
				'<div style="height:14%" class="flex"><div class="game-btn2 flex' + ((_nextProps && _skill.unlockLevel <= mainCharacter.level) ? '' : ' gray disabled') + '" onclick="skill.upgradeSkill(' + _order + ')" style="height:65%"><div class="flex">' + getLangData('UPGRADE') + '</div></div></div>';
			return html;
		}
		return '';
	}
	this.getPassiveSkillUI = function () {
		const _skillTabs = document.querySelectorAll('.skills-container .skill-tab');
		addClass(_skillTabs[1], 'selected');
		removeClass(_skillTabs[0], 'selected');
		document.querySelector('.skills-container .skills-content-left').innerHTML = this.getPassiveSkillsUI(1);
		document.querySelector('.skills-container .skills-content-detail-wrapper').innerHTML = this.getPassiveSkillDetailUI(0);
	}
	this.getPassiveSkillsUI = function (_order) {
		let html = '';
		let _i = 0;
		for (var _skill of this.passiveSkills) {
			const _active = _skill.unlockLevel <= mainCharacter.level;
			html += '<div onclick="skill.selectPassiveSkill(' + _i + ')" class="skill-card flex' + ((_i + 1) === _order ? ' selected' : '') + '">' +
				'<div class="skill-icon-wrapper flex"><img src="./images/skills/' + _skill.key + '.png" /></div>' +
				'<div style="flex:1;height:100%">' +
				'<div class="flex flex-jc-start" style="height:50%;width:100%">' + _skill.names[getLang()] + '</div>' +
				'<div class="flex flex-jc-start" style="height:50%;width:100%">' + (!_active ? getLangData('Unlock') + ':&nbsp;<span style="color:#ff6c00 !important">' + getLangData('Level') + ' ' + _skill.unlockLevel  + '</span>': '') + '</div>' +
				'</div>' +
				'</div>';
			_i++;
		}
		return html;
	}
	this.selectPassiveSkill = function (_index) {
		const _skillCards = document.querySelectorAll('.skills-container .skill-card');
		const _container = document.querySelector('.skills-container .skills-content-detail-wrapper');
		let _i = 0;
		for (var _sc of _skillCards) {
			if (_i === _index) {
				addClass(_sc, 'selected');
				_container.innerHTML = this.getPassiveSkillDetailUI(_index);
			}
			else
				removeClass(_sc, 'selected');
			_i++;
		}
	}
	this.getSkillPriority = function (_p) {
		switch (_p) {
			case 4:
				return 'Low';
			case 3:
				return 'Medium';
			case 2:
				return 'High';
			case 1:
				return 'Ultra';
			default:
				return 'None';
		}
	}
	this.getSkillCooldown = function (_cd) {
		if (!_cd)
			return getLangData('No Cooldown');
		return (_cd / 1000).toFixed(1) + ' seconds';
	}
	this.playSkillVideo = function (_skillKey) {
		const _video = document.querySelector('.skills-container video');
		const _preloader = document.querySelector('.skills-container .skill-video-preloader');
		addClass(_preloader, 'd-none');
		_video.play();
		setTimeout(function () {
			removeClass(_preloader, 'd-none');
		}, 4000);
	}
	this.getPassiveSkillDetailUI = function (_index) {
		const _skill = this.passiveSkills[_index??0];
		let html = '<div style="height:90%;overflow-y:auto">' +
			'<div style="padding:4vh 5vh 1vh 5vh">' + _skill.descriptions[getLang()] + '</div>' +
			'<div class="skill-content-title">Gain</div>' +
			'<div style="padding:1vh 5vh">' + _skill.gain[0] + '</div>' +
			'<div class="skill-content-title">Chance Rate</div>' +
			'<div style="padding:1vh 5vh">%' + (_skill.chanceRate ?? 100) + '</div>' +
			'</div>' +
			'<div style="height:10%" class="flex"><div class="game-btn flex' + (_skill.unlockLevel <= mainCharacter.level ? '' : ' gray disabled') + '" onclick="skill.activatePassiveSkill(' + _index + ')"><div class="flex">ACTIVATE&nbsp;<img src="./images/icons/coin.png" style="height:2.6vh" />&nbsp;' + _skill.price + '</div></div></div>';
		return html;
	}
	this.upgradeSkill = function (_order) {
		const _skill = this.allSkills.find(x => x.class === mainCharacter.class && x.order === _order);
		if (_skill.level >= _skill.props.length) {
			warn('<span>' + getLangData('You can not update anymore') + '</span>', 'warn');
			return;
		}
		if (_skill.level === mainCharacter.level) {
			warn('<span>' + getLangData('Increase character level first') + '</span>', 'warn');
			return;
		}
		const _price = this.calculateSkillPrice(_skill.key);
		if (_price > __account.gold) {
			warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
			return;
		}
		updateGold(-1 * _price, mainCharacter);
		if (!_skill.level)
			_skill.level = 1;
		_skill.level++;
		const _currentProps = _skill.props.find(x => x.level === _skill.level);
		document.getElementById('skill-current-props').innerHTML =
			(_currentProps ? '<div class="skill-content-title">' + getLangData('Current Level') + '</div>' +
				'<div style="padding:1vh 5vh">+ %' + _currentProps.value + ' ' + getLangData(_currentProps.type) + '</div>' : '');
		
		const _nextProps = _skill.props.find(x => x.level === (_skill.level + 1));
		document.getElementById('skill-next-props').innerHTML =
			(_nextProps ? '<div class="skill-content-title">' + getLangData('Next Level') + '</div>' +
				'<div style="padding:1vh 5vh">+ %' + _nextProps.value + ' ' + getLangData(_nextProps.type) + '</div>' : '');
		document.getElementById('skill-' + _skill.key + '-level').innerText = _skill.level;
		document.getElementById('skill-cost').innerText = this.calculateSkillPrice(_skill.key);
		episode.playSound({ key: 'upgrade', volume: .5, reset: true });
		shine(1000, document.querySelector('.skills-content-detail-wrapper'));
		_client.upgradeSkill(mainCharacter, _skill);
		checkUpdateAvailable();
	}
	this.getSkills = function (_char) {
		return this.allSkills.filter(x => x.class === (_char ?? mainCharacter).class);
	}
	this.getPassiveSkills = function () {
		return JSON.parse(JSON.stringify(this.passiveSkills));
	}
	this.getSkillByKey = function (_class, _key, _arr, _includeAffected) {
		return (_arr ?? this.allSkills).find(x => (x.key === _key || (_includeAffected && x.affectedKeys?.indexOf(_key) >= 0)) && x.class === (_class ?? mainCharacter.class));
	}
	this.getAvailableSkills = function (_char) {
		const _c = _char ?? mainCharacter;
		if(!_c)
			return undefined;
		return this.allSkills.filter(x => x.class === _c.class && x.unlockLevel <= _c.level);
	}
	this.isActive = function (_key) {
		return this.getAvailableSkills()?.find(x => x.key === _key);
	}
}
const skill = new characterSkill();