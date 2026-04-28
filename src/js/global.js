﻿﻿'use strict';

console.log('global');
const __locations = [
		{
			mapId: 1,
			act:1,
			lobby: true,
			titles: {
				en: 'Village',
				tr: 'Köy'
			}, left: '34%', top: '48%'
		},
		{
			mapId: 3,
			act:1,
			titles: {
				en: 'Shadow Wood',
				tr: 'Gölge Ormanı'
			}, left: '32%', top: '72%'
		},
		{
			mapId: 11,
			act:1,
			titles: {
				en: 'Rotroot Marsh',
				tr: 'Kök Bataklığı'
			}, left: '62%', top: '67%'
		},
		{
			mapId: 36,
			act:1,
			titles: {
				en: 'Lair of The Unseen',
				tr: 'Görünmezin Mağarası'
			}, left: '49%', top: '43%'
		},
		{
			mapId: 41,
			act:1,
			titles: {
				en: 'Bluetail Burrow',
				tr: 'Mavikuyruk Yuvası'
			}, left: '60%', top: '34%'
		},
		{
			mapId: 106,
			act:1,
			titles: {
				en: 'City of Golden Wind',
				tr: 'Altın Rüzgar Şehri'
			}, left: '7.2%', top: '80%'
		},
		{
			mapId: 201,
			act:1,
			titles: {
				en: 'Training Ground',
				tr: 'İdman Yeri'
			}, left: '77%', top: '65%'
		},
		{
			mapId: 93,
			act:1,
			titles: {
				en: 'City of Snowshield',
				tr: 'Karkalkanı Şehri'
			}, left: '79%', top: '11%'
		},
		{
			act:1,
			titles: {
				en: 'Turguoise Lake',
				tr: 'Turkuaz Gölü'
			}, left: '43.2%', top: '64%'
		}
	];
const __passiveSkills = [
		{
			id:1,
			key: 'passive-atk',
			col: 1,
			names: {
				en: 'Sharp Blade',
				tr: 'Keskin Kılıç'
			},
			descriptions: {
				en: 'Additional attack to proove your strength',
				tr: 'Gücünüzü ispatlamak için ekstra saldırı'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Attack',
					value: 10
				},
				{
					type: 'Attack',
					value: 20
				}
			]
		}, 
		{
			id: 2,
			key: 'passive-hp',
			col: 2,
			names: {
				en: 'Toughness',
				tr: 'Dayanıklılık'
			},
			descriptions: {
				en: 'Additional health point for keeping yourself alive much longer',
				tr: 'Sizi daha fazla hayatta tutmak için ekstra sağlık puanı'
			},
			parent: [1,3],
			unlockLevel: 1,
			props: [
				{
					type: 'Health Point',
					value: 10
				},
				{
					type: 'Health Point',
					value: 20
				}
			]
		}, 
		{
			id: 3,
			key: 'passive-def',
			col: 3,
			names: {
				en: 'Protection',
				tr: 'Korunma'
			},
			descriptions: {
				en: 'Additional Defense for tough damage reduction',
				tr: 'Alınan hasarı azaltmaya yönelik ekstra savunma'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Defense',
					value: 10
				},
				{
					type: 'Defense',
					value: 20
				}
			]
		},
		{
			id:4,
			key: 'passive-crit-rate',
			col: 1,
			parent: [1],
			names: {
				en: 'Head Shot',
				tr: 'Kafaya İsabet'
			},
			descriptions: {
				en: 'Additional crit rate for insane damage per second',
				tr: 'Muazzam saldırı gücüne erişmeniz için ekstra kritik oranı'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Crit Rate',
					value: 1
				},
				{
					type: 'Crit Rate',
					value: 2
				}
			]
		}, 
		{
			id:5,
			key: 'passive-run-speed',
			col: 2,
			parent: [4,6],
			names: {
				en: 'Run Rabbit Run',
				tr: 'Koş Tavşan Koş'
			},
			descriptions: {
				en: 'Killing an enemy, increase run speed by for 5 seconds',
				tr: 'Bir düşman öldüğünde koşu hızınızı 5 saniye boyunca artar'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Run Speed',
					value: 5
				},
				{
					type: 'Run Speed',
					value: 10
				}
			]
		}, 
		{
			id:6,
			key: 'passive-crit-dmg-resist-rate',
			col: 3,
			parent: [3],
			names: {
				en: 'Lightning Reflexes',
				tr: 'Yıldırım Refleksleri'
			},
			descriptions: {
				en: 'Increase critical damage resistance rate',
				tr: 'Kritik hasarlara karşı direnç oranınızı arttırır'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Crit Damage Resist Rate',
					value: 5
				},
				{
					type: 'Crit Damage Resist Rate',
					value: 10
				}
			]
		}, 
		{
			id:7,
			key: 'passive-atk-speed',
			col: 1,
			parent: [4],
			names: {
				en: 'Frenzy',
				tr: 'Çılgınlık'
			},
			descriptions: {
				en: 'Increase attack speed after a critical hit for 5 seconds',
				tr: 'Kritik vuruşun ardından saldırı hızın 5 saniye boyunca artar'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Attack Speed',
					value: 5
				},
				{
					type: 'Attack Speed',
					value: 10
				}
			]
		}, 
		{
			id:8,
			key: 'passive-stun',
			col: 2,
			parent: [7,9],
			names: {
				en: 'Hit Me More',
				tr: 'Bana Daha Çok Vur'
			},
			descriptions: {
				en: 'When you stuck, hurls electric rays around by chance',
				tr: 'Sıkıştığın anda etrafa şansla elektrik akımı fırlatırsın'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Trigger Chance',
					value: 1
				},
				{
					type: 'Trigger Chance',
					value: 2
				}
			]
		}, 
		{
			id:9,
			key: 'passive-lms',
			col: 3,
			parent: [6],
			names: {
				en: 'Last Man Standing',
				tr: 'Son Hayatta Kalan'
			},
			descriptions: {
				en: 'When your hp decrease under %20, def will increase for a while',
				tr: 'Sağlığınız %20 altına düştüğünde defansınız bir süre artar'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Defense',
					value: 15
				},
				{
					type: 'Defense',
					value: 30
				}
			]
		},
		{
			id:10,
			key: 'passive-counter-cooldown',
			col: 1,
			parent: [7],
			names: {
				en: 'Sands of Time',
				tr: 'Zamanın Kumları'
			},
			descriptions: {
				en: 'Each successful shield counter attack decreases skill cooldowns',
				tr: 'Her başarılı kalkanlı karşı saldırının yetenek soğuma sürelerini düşürür'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Cooldown',
					value: 10
				}
			]
		},
		{
			id:11,
			key: 'passive-charge',
			col: 2,
			parent: [8],
			names: {
				en: 'Eagle Sight',
				tr: 'Kartal Görüşü'
			},
			descriptions: {
				en: 'Charge distance increases',
				tr: 'Şarj mesafesi artar'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Charge Distance',
					value: 10
				}
			]
		},
		{
			id:12,
			key: 'passive-counter-steal',
			col: 3,
			parent: [9],
			names: {
				en: 'Concentration',
				tr: 'Konsantrasyon'
			},
			descriptions: {
				en: 'Each successful shield counter-attacks may increase your health',
				tr: 'Her başarılı kalkanlı karşı saldırı bir ihtimal sağlığınızı arttırabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Life Steal',
					value: 5
				}
			]
		},
		{
			id:13,
			key: 'passive-crit-rate-rage',
			col: 1,
			names: {
				en: 'Final Destruction',
				tr: 'Son Yıkım'
			},
			parent: [10],
			descriptions: {
				en: 'Crit hits may give you extra rage',
				tr: 'Kritik saldırılar size fazladan öfke puanı kazandırabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Rage',
					value: 5
				},
				{
					type: 'Rage',
					value: 10
				}
			]
		},
		{
			id:14,
			key: 'passive-steal',
			col: 2,
			parent: [11],
			names: {
				en: 'Still Alive',
				tr: 'Hala Hayatta'
			},
			descriptions: {
				en: 'Attacks may steal life from enemies',
				tr: 'Saldırılar rakipten sağlık çalabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Life Steal',
					value: 1
				},
				{
					type: 'Life Steal',
					value: 2
				}
			]
		},
		{
			id:15,
			key: 'passive-counter-rage',
			col: 3,
			parent: [12],
			names: {
				en: 'Beast Mode',
				tr: 'Canavar Modu'
			},
			descriptions: {
				en: 'Shield counter attacks may give you extra rage',
				tr: 'Kalkanlı karşı saldırılar size fazladan öfke puanı kazandırabilir'
			},
			unlockLevel: 1,
			props: [
				{
					type: 'Rage',
					value: 5
				},
				{
					type: 'Rage',
					value: 10
				}
			]
		}
	];
const __chatMessages = [
	// { id: 'BladeX8X', text: 'Guys? How can i gain more tickets?' },
	// { id: 'Divorc€', text: 'Check your mailbox, may be you can find some in store / roulette' },
	// { id: 'dtmn', text: 'any pvp around? pls invite meee tooo!' },
	// { id: 'Guest', text: 'join bro' },
	// { id: 'Kuruvasan', text: 'Abi alma şu adamı yaa, ben onun takımında olmam' },
	// { id: 'Guest', text: 'Niye ki?' },
	// { id: 'Kuruvasan', text: 'Kafasına göre dalıyo takım elemanı değil' },
	// { id: 'Guest', text: ':) o zaman senin takıma atacam' },
	// { id: 'Kuruvasan', text: 'Hasss X.x' },
	// { id: 'See3P0', text: 'Stop speaking non-english ffs!' },
	// { id: 'TheEnd', text: 'When EU Servers will be available? 2o49?' },
	// { id: 'Divorc€', text: 'RofL! Just enjoy. No lag here, just lower the graphics settings and everything will be fine' },
	// { system: true, text: 'World boss will be summoned in 10 minutes...' },
	// { id: 'FBli', whisper: true, text: 'Abi salla maçı, boss\'u kaçırmayalım' },
];
const __gems = [
	{ 
		key: 'fire', 
		color: 'red',
		titles: {
			tr: 'Alev Taşı',
			en: 'Fire Gem'
		},
		grades: [
			{ 
				grade: 1,
				cost: 100,
				props: [
					{ key:'fire-dmg', value:5, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'fire-resist-rate', value:5, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 2,
				cost: 200,
				props: [
					{ key:'fire-dmg', value:10, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'fire-resist-rate', value:10, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 3,
				cost: 300,
				props: [
					{ key:'fire-dmg', value:15, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'fire-resist-rate', value:15, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			}
		] 
	},
	{ 
		key: 'ice', 
		color: 'blue',
		titles: {
			tr: 'Buz Taşı',
			en: 'Ice Gem'
		},
		grades: [
			{ 
				grade: 1,
				cost: 100,
				props: [
					{ key:'ice-dmg', value:5, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'ice-resist-rate', value:5, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 2,
				cost: 200,
				props: [
					{ key:'ice-dmg', value:10, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'ice-resist-rate', value:10, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 3,
				cost: 300,
				props: [
					{ key:'ice-dmg', value:15, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'ice-resist-rate', value:15, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			}
		] 
	},
	{ 
		key: 'toxic', 
		color: 'green',
		titles: {
			tr: 'Zehir Taşı',
			en: 'Toxic Gem'
		},
		grades: [
			{ 
				grade: 1,
				cost: 100,
				props: [
					{ key:'toxic-dmg', value:5, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'toxic-resist-rate', value:5, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 2,
				cost: 200,
				props: [
					{ key:'toxic-dmg', value:10, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'toxic-resist-rate', value:10, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 3,
				cost: 300,
				props: [
					{ key:'toxic-dmg', value:15, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'toxic-resist-rate', value:15, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			}
		] 
	},
	{ 
		key: 'lightning', 
		color: 'yellow',
		titles: {
			tr: 'Yıldırım Taşı',
			en: 'Lightning Gem'
		},
		grades: [
			{ 
				grade: 1,
				cost: 100,
				props: [
					{ key:'lightning-dmg', value:5, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'lightning-resist-rate', value:5, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 2,
				cost: 200,
				props: [
					{ key:'lightning-dmg', value:10, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'lightning-resist-rate', value:10, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 3,
				cost: 300,
				props: [
					{ key:'lightning-dmg', value:15, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'lightning-resist-rate', value:15, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			}
		] 
	},
	{ 
		key: 'shadow', 
		color: 'purple',
		titles: {
			tr: 'Gölge Taşı',
			en: 'Shadow Gem'
		},
		grades: [
			{ 
				grade: 1,
				cost: 100,
				props: [
					{ key:'shadow-dmg', value:5, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'shadow-resist-rate', value:5, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 2,
				cost: 200,
				props: [
					{ key:'shadow-dmg', value:10, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'shadow-resist-rate', value:10, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			},
			{ 
				grade: 3,
				cost: 300,
				props: [
					{ key:'shadow-dmg', value:15, for:['weapon', 'bracers', 'necklace', 'gloves', 'ring']},
					{ key:'shadow-resist-rate', value:15, for:['helmet', 'chest', 'leggings', 'belt', 'boots']}
				]
			}
		] 
	}
];
const __fragments = [
	{ id:1, key: 'cyclops', name: 'Cyclops', sound: {key:'cyclopstag', volume:.7}, color: '#781815', charId:47, limits: [
		{grade:1, limit:100, cost:10000, skill: 'ground1', atk: 200},
		{grade:2, limit:300, cost:20000, skill: 'ground1modified', atk: 200},
		{grade:3, limit:700, cost:40000, skill: 'ground2', atk: 200},
		{grade:4, limit:1500, cost:80000, skill: 'air1', atk: 200}
	] },
	{ id:2, key: 'werewolf', sound: {key:'werewolftag', volume:.5}, name: 'Gökbörü', color: '#1e4c7c', charId:29, limits: [
		{grade:1, limit:100, cost:10000, skill: 'ground1', atk: 200},
		{grade:2, limit:200, cost:20000, skill: 'ground2', atk: 200},
		{grade:3, limit:700, cost:40000, skill: 'air1', atk: 200},
		{grade:4, limit:1500, cost:80000, skill: 'air2', atk: 200}
	] },
	{ id:3, key: 'al', name: 'Al Karısı', sound: {key:'altag', volume:.6}, color: '#6d1977', charId:1000, limits: [
		{grade:1, limit:100, cost:10000, skill: 'attack', atk: 200},
		{grade:2, limit:300, cost:20000, skill: 'ground1', atk: 200}
	] },
	{ id:4, key: 'sisters', sound: {key:'shamantag', volume:1}, 
		name: 'Shaman Sisters', charId:[37, 38], color: '#ab3b8f', limits: [
		{grade:1, limit:100, cost:10000, skill: 'ground1', atk: 200},
		{grade:2, limit:300, cost:20000, skill: 'ground2', atk: 200}
	] },
	{ id:5, key: 'bomber', name: 'Bomber Goblin', sound: {key:'bombertag', volume:.5}, color: '#19671c', charId:75, limits: [
		{grade:1, limit:100, cost:10000, skill: 'attack', atk: 200, do: function(_skill) {
			_skill.frames.filter(x => x.spell)?.forEach(x => x.spell.pierce = true);
		}}
	] },
	{ id:6, key: 'king', sound: {key:'knighttag', volume:.5}, name: 'King', charId:59, color:'#dc76bb', limits: [
		{grade:1, limit:100, cost:10000, skill: 'attack', atk: 200}
	] }
];
const _tips = [
	{ 
		en: 'You can create sets and gain bonus features by collecting artifacts that may come across in some stories',
		tr: 'Bazı hikayelerde bulduğunuz tılsımlar set halinde toplayarak ekstra özellikleri aktif edebilirsiniz'
	},
	{ 
		en: 'With the passive skill points earned every two levels, you can create the talent tree that best suits your combat model',
		tr: 'Her iki seviyede bir kazanılan puanlama hakkı sayesinde savaş modelinize en uygun pasif yetenek ağacını oluşturabilirsiniz'
	},
	{ 
		en: 'You can forge high-level equipment set pieces using honor points',
		tr: 'Onur puanlarını kullanarak yüksek seviye ekipman seti parçaları dövdürebilirsiniz'
	},
	{ 
		en: 'You can earn honor points thanks to the PVP content that is active from level 10 onwards',
		tr: '10. seviye itibarıyle aktif olan pvp içerikleri sayesinde onur puanı kazanabilirsiniz'
	},
	{ 
		en: 'The gem rewards of story missions can be used on equipments with socket slots',
		tr: 'Bölümleri başarıyla bitirdiğinizde kazanılan mücevherleri soketli ekipmanlara takabilirsiniz'
	},
	{ 
		en: 'Gather and collect character fragments of villains to summon and use them as support skill',
		tr: 'Bölüm sonu canavarlarının parçacıklarını bulup biriktirdiğinizde onları yatarıp yardımcı yapabilirsiniz'
	},
	{ 
		en: 'Hold Shield(Block) skill to absorb damage taken',
		tr: 'Kalkan(Blok) yeteneğine basılı tutarak hasar almamayı sağlayabilirsiniz'
	},
	{ 
		en: 'The purple bar is fatique. No fatique means you can not block attacks anymore',
		tr: 'Mor çubuk yorgunluk seviyesidir. Yorgunluk puanınız kalmadığında blok yapamazsınız'
	},
	{ 
		en: 'The yellow sign over NPC head means there is a quest to do',
		tr: 'NPC\' lerin üstünde beliren işaretler, yapılacak bir görev olduğu anlamına gelir'
	},
	{ 
		en: 'You can counter-attack when you tap block right before enemy attack',
		tr: 'Rakip saldırısından hemen önce blok tuşuna bastığınızda karşı-saldırı yaparsınız'
	},
	{ 
		en: 'When you get hurt, chain skills will be active to give you a second chance',
		tr: 'Yara aldığınız anda zincir yetenekler belirir. İkinci bir şans elde edebilirsiniz'
	},
	{ 
		en: 'Hold and drag touch-pad on bottom-left of screen lets your character move through that direction',
		tr: 'Sol-alt tarafta bulunan yuvarlak kısma basılı tutup çektiğinizde karakteriniz o yöne hareket eder'
	},
	{ 
		en: 'Ticket materials are for boosting story missions to auto-pass or double specific rewards',
		tr: 'Bilet malzemeleri, hikaye görevlerini otomatik geçmenizi veya belirli ödülleri artırmanızı sağlar'
	},
	{ 
		en: 'Charge enemies with using normal attack skill from a distance not too far',
		tr: 'Normal saldırı, belli bir mesafeden kullanıldığında şarj saldırısına dönüşür'
	},
	{ 
		en: 'Hold normal attack to make a combo and knockback in the end',
		tr: 'Normal saldırıya basılı tutarak kombinasyon yapabilir ve sonunda düşmanı geriye fırlatabilirsiniz'
	},
	{ 
		en: 'A fatality option may appear next to your skill icons for some enemies to kill them quickly',
		tr: 'Bazı durumlarda düşmanı anında öldürmenizi sağlayan "Ölüm" seçeneği yeteneklerinizin yanında belirebilir'
	},
	{ 
		en: 'When you move or stand, press the skill on bottom-right to thumble and dodge enemy attacks',
		tr: 'Hareket ederken veya dururken, sağ-alt kısımdaki yetenek ile düşman saldırılarından takla atıp kurtulabilirsiniz'
	}
];

const _sideQuests = [
	// {
	// 	id: 10001, name: '', owner: 'board', minLevel: 1,
	// 	loot: 'rabbit', realOwner: 'child',
	// 	gain: [{ key: 'exp', value: 5000 }, { key: 'pot', value: 1 }],
	// 	maps: [2], chanceRate: 100,
	// 	end: function () {
	// 		episode.dialogs = [{
	// 			id: 2,
	// 			location: { map: 'farm' },
	// 			ms: 2000,
	// 			owner: 'child',
	// 			text: 'Wee... Thank you'
	// 		}];
	// 	},
	// 	texts: {
	// 		en: 'Rabbit "Lulu" lost and never seen around novadays. People who brings her back will be rewarded.',
	// 		tr: 'Tavşan "Lulu" kayboldu ve son zamanlarda hiç görülmedi. Kendisini bulup canlı getiren kişi ödüllendirilecektir.'
	// 	}
	// },
	// {
	// 	id: 10002, name: '', owner: 'board', minLevel: 2,
	// 	loot: 'owl', realOwner: 'board',
	// 	gain: [{ key: 'exp', value: 6000 }, { key: 'pot', value: 1 }],
	// 	maps: [2], chanceRate: 100,
	// 	text: '"Lore" The Mighty Owl tried to fly first time but he couldnt save enough energy to turn back. People who help us to bring him back will be rewarded'
	// }
];
const __storeItems = [
	{ id: 1, key: 'pot', count: 1, price: 600 },
	{ id: 2, key: 'ticket-pass', count: 1, price: 10000 },
	{ id: 3, key: 'ticket-item-selection', count: 1, price: 10000 },
	{ id: 4, key: 'ticket-random', count: 1, price: 10000 },
	{ id: 5, key: 'chest', count: 1, price: function() {
		return 0;
	} },
	{ id: 6, key: 'ticket-gold', count: 1, price: 10000 },
	{ id: 7, key: 'ticket-exp', count: 1, price: 10000 },
	{ id: 8, key: 'ticket-item', count: 1, price: 10000 },
];
const __dailyResetHour = 12;
let __ctfSupport;
function decreaseDummyCount() {
	const _dcc = document.getElementById('dummy-count');
	let _dc = parseInt(_dcc.innerText);
	if(_dc < 2)
		return;
	playClick();
	_dc--;
	_dcc.innerText = _dc;
}
function increaseDummyCount() {
	const _dcc = document.getElementById('dummy-count');
	let _dc = parseInt(_dcc.innerText);
	if(_dc > 98)
		return;
	playClick();
	_dc++;
	_dcc.innerText = _dc;
}
function selectCTFCharacter(_class) {
	playClick();
	const _si = document.querySelectorAll('.ctf-supporters .selection-item');
	for(let _sitem of _si) 
	{
		removeClass(_sitem, 'selected-character');
		const _c = _sitem.getAttribute('data-class');
		if(_c === _class){
			addClass(_sitem, 'selected-character');
			__ctfSupport = _c;
		}
	}
}
function approveCTFSelection(_id) {
	const _si = document.querySelector('.ctf-supporters .selection-item.selected-character');
	if(_si)
		getRef('dungeon')?.approve?.(_id);
	else 
		warn('<span>' + getLangData('Select a supporter first') + '</span>', 'warn');
}
const _missions = [
	{
		key: 'ph',
		storyId: 114,
		titles: {
			en: 'Pinata Party',
			tr: 'Pinyata Partisi'
		},
		descriptions: {
			en: "With bandits all around, your goal in this section is to destroy the beehive hanging in the middle. If you do it before time runs out, you'll be rewarded with extra loot.",
			tr: "Haydutlar ortalıkta cirit atarken bu bölümde amacın ortada asılı duran kovanı parçalamak. Vaktin dolmadan bunu yaparsan ganimet ile ödüllendirileceksin."
		}
	},
	{
		key: 'ad',
		storyId: 113,
		titles: {
			en: 'Area Defense',
			tr: 'Alan Savunması'
		},
		before: function(_id) {
			// const _si = document.querySelector('.ctf-supporters .selection-item.selected-character');
			// if(!_si) {
			// 	warn('<span>' + getLangData('Select supporter first') + '</span>', 'warn');
			// 	return false;
			// }
			// return true;
			let _choices = '';
			for(let _item of _selectableChars)
				if(_item.class !== mainCharacter.class)
					_choices += `<div data-class="${_item.class}" class="selection-item selection-char flex" onexactclick="selectCTFCharacter('${_item.class}')" style="width:21% !important;aspect-ratio:1/1;position:relative;cursor:pointer">
						<img src="./images/main/avatars/${_item.class}.png" style="padding:2%;height:84%" class="grade${_item.grade}-item" />
					</div>`;
			let _modal = `<div class="full fade-me show-ui flex inventory-question">
							<div class="inventory-modal">`
								+
								`<div style="padding:6vh 4vh 4vh 4vh" class="flex">
									<span style="color:#f7f7f7dd !important;font-size:3.2vh !important">${getLangData('CHOOSE YOUR SUPPORTER')}</span>
								</div>
								<div class="flex ctf-supporters" style="padding:2vh 4%">`
								+ _choices +
								`</div>
								<div style="padding:4vh 2vh 6vh 2vh" class="flex">
									<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('BACK')}</div>
									<div id="item-selection-approve-btn" class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="approveCTFSelection(${_id})">${getLangData('APPROVE')}</div>
								</div>
							</div>
						</div>`;
						const _div = document.createElement('div');
						_div.innerHTML = _modal;
						const parentEl = document.querySelector('#menu-ui');
						(parentEl ?? _gameUI).appendChild(_div.firstChild);
		},
		descriptions: {
			en: "Defend the flag with your chosen supporter and try not to let it fall to the enemy. If they grab it, you must retrieve immediately. You can switch roles with your supporter with tapping on its portrait.",
			tr: "Seçtiğiniz destekçi ile bayrağı savunun ve düşmanın almasına izin vermeyin. Eğer biri kaparsa hemen geri kazanmalısınız. Dilerseniz bu etkinlikte destekçinizin portresine basarak onu da yönetebilirsiniz."
		}
	},
	{
		key: 'training',
		storyId: 112,
		titles: {
			en: 'Training Ground',
			tr: 'İdman Alanı'
		},
		before: function() {
			const _dcc = document.getElementById('dummy-count');
			const _dc = parseInt(_dcc.innerText);
			__stories.find(x => x.id === 112).scenes[0].mobs[0].count = _dc;
			return true;
		},
		html: function() { 
			return `<div class="w-100 flex" style="padding:4vh 0 2vh 0">
				<div class="w-50 flex flex-jc-start" style="padding-left:1vh">${getLangData('Dummy Count')}</div>
				<div class="w-50 flex flex-jc-end" style="padding-right:1vh">
					<div style="aspect-ratio:1/1;font-size:3vh !important" onexactclick="decreaseDummyCount()" class="game-menu-button flex">-</div>
					<div style="width:6vh" class="flex" id='dummy-count'>10</div>
					<div style="aspect-ratio:1/1;font-size:3vh !important" onexactclick="increaseDummyCount()" class="game-menu-button flex">+</div>
				</div>
			</div>`;
		},
		descriptions: {
			en: "You can visit this location anytime so you can test your character's combos and improve your technique.",
			tr: "Karakterinizin kombolarını test edebilmeniz ve tekniğinizi geliştirebilmeniz için bu konumu istediğiniz zaman ziyaret edebilirsiniz."
		}
	},
	{
		key: 'lottery',
		daily: 1
	},
	{ 
		key: 'tower', 
		descriptions: {
			en: `This zone has 10 different missions. Each mission has 1 minute time limit (double for boss fights)
					and one-time chest reward. If you complete mission with all achievements you get rewards (depends on your remaining time, zone and mission level)
					and able to play next mission. When you beat the boss on last level, you will be able to level up your zone and fight for better rewards`,
			tr: `Bu etkinlik 10 bölümden oluşmaktadır. Her bölümde tek seferlik sandık ödülü ve 1 dakika süre limiti vardır (patron bölümlerinde iki katıdır).
					Eğer bölümü tüm başarıları ile birlikte tamamlarsanız, bölümün ödülünü kazanırsınız (kalan süre, bölüm ve alan seviyesi etki etmektedir)
					aynı zamanda bir sonraki bölüme geçmeye hak kazanırsınız. Patron bölümünü de geçtiğiniz taktirde bu alanı seviye atlatabilir ve daha büyük ödüllere ulaşabilirsini`
		},
		daily: 1, 
		description: function() {
			const _t = __account.missions.find(x => x.key === 'tower');
			const _lastReset = getCurrentResetTime();
			if(_t.lastActivity && _t.lastActivity < _lastReset)
				_t.current = 1;
			const _tower = _missions.find(x => x.key === 'tower');
			const _props = _tower.props.find(x => x.level === _t.level);
			const _floor = _props.floors.find(x => x.floor === _t.current);
			const _gain = _floor.gain;
			let _html = `<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Zone Level')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_t.level}
							</div>
						</div>
						<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Mission Done')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_floor.floor - 1}&nbsp;/&nbsp;10
							</div>
						</div>
						<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('All Time Record')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_t.max > 0 ? _t.max + '. ' + getLangData('Floor'): '-'}
							</div>
						</div>
						<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Reset After')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${getTimeDiffUntilReset()}
							</div>
						</div>
						<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Upgrade Cost')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_props.cost.formatWithDots()}&nbsp;<img style="height:2.4vh !important" src="./images/icons/coin.png" />
							</div>
						</div>
						<div class="w-100 flex flex-jc-start mission-desc-title">${getLangData('Rewards')}</div>`;
			for(let _g of _gain)
				_html += `<div class="flex flex-jc-start mission-reward-item">
					<img src="./images/icons/${_g.key}.png" />&nbsp;x${_g.count ?? 1}
					${_g.grade ? ' (' + getLangData('Grade') + ' ' + _g.grade + ')' : ''}
				</div>`;
			_html += `<div class="flex flex-jc-start mission-reward-item">
				<img src="./images/icons/coin.png" />&nbsp;+Bonus (${getLangData('Depends on time')})
			</div>`;
			_html +=`<div class="w-100 flex flex-jc-start mission-desc-title">${getLangData('Description')}</div>
				<div class="w-100 flex flex-jc-start mission-desc-text">
					${_tower.descriptions[getLang()]}
				</div>
			`;
			return _html;
		},
		props: [
			{ 
				level: 1, 
				goldRate: 100,
				cost: 40000,
				floors: [
					{ 
						floor: 1, gain: [ 
							{ key: 'chest', grade: 1}
						],
						mobs: [ 
							{id: 3, count:2}, 
							{id: 28, count:2}
						]
					},
					{ 
						floor: 2, gain: [ 
							{ key: 'chest', grade: 1 }
						], 
						mobs: [ 
							{id: 3, count:3}, 
							{id: 28, count:3}
						]
					},
					{ 
						floor: 3, gain: [ 
							{ key: 'chest', grade: 1 }, 
						], 
						mobs: [ 
							{id: 3, count:4}, 
							{id: 28, count:4}
						]
					},
					{ 
						floor: 4, gain: [ 
							{ key: 'chest', grade: 1, count: 2 }, 
							{ key: 'gold', count: 500 }
						], 
						mobs: [ 
							{id: 19, count:2}, 
							{id: 7, count:2},
							{id: 28, count:2}
						]
					},
					{ 
						floor: 5, gain: [ 
							{ key: 'chest', grade: 1, count: 2 }, 
							{ key: 'gold', count: 500 }
						], 
						mobs: [ 
							{id: 19, count:2}, 
							{id: 7, count:2},
							{id: 28, count:2},
							{id: 3, count:2}
						]
					},
					{ 
						floor: 6, gain: [ 
							{ key: 'chest', grade: 1, count: 2 }, 
							{ key: 'gold', count: 1000 }
						], 
						mobs: [ 
							{id: 19, count:3}, 
							{id: 7, count:3},
							{id: 28, count:2},
							{id: 3, count:2}
						]
					},
					{ 
						floor: 7, gain: [ 
							{ key: 'chest', grade: 1, count: 3 }, 
							{ key: 'gold', count: 1500 }
						], 
						mobs: [
							{id: 22, count:2}, 
							{id: 25, count:2}, 
							{id: 28, count:2},
							{id: 32, count:2}
						]
					},
					{ 
						floor: 8, gain: [ 
							{ key: 'chest', grade: 1, count: 3 }, 
							{ key: 'gold', value: 1500 }
						], 
						mobs: [ 
							{id: 22, count:2 }, 
							{id: 25, count:2 }, 
							{id: 28, count:3 },
							{id: 32, count:3 }
						]
					},
					{ 
						floor: 9, gain: [ 
							{ key: 'chest', grade: 1, count: 3 }, 
							{ key: 'gold', value: 2000 }
						], 
						mobs: [ 
							{id: 22, count:3 }, 
							{id: 25, count:3 }, 
							{id: 28, count:3 },
							{id: 32, count:3 }
						]
					},
					{ 
						floor: 10, gain: [ 
							{ key: 'chest', grade: 2, count: 2 }, 
							{ key: 'gold', value: 3000 }
						], 
						mobs: [ 
								{
								id: 1000,
								count: 1,
								grade: 2,
								level: 10,
								name: 'Alkarısı'
							}
						]
					}
				]
			}
		]
	},
	{ 
		key: 'gold', 
		daily: 1,
		descriptions: {
			en: 'This daily mission lets you play twice in a day until reset time. You can boost your gold with smashing objects in time. More dps brings more bonus rewards.',
			tr: 'Bu günlük bölüm size gün içinde sıfırlanma süresine kadar iki defa oynama hakkı tanır. Nesneleri parçalayarak altın kazanımınıza ciddi katkıda bulunabilirsiniz. Hızlı parçalamak bonus altınları beraberinde getirecektir.'
		},
		description: function() {
			const _t = __account.missions.find(x => x.key === 'gold');
			const _mission = _missions.find(x => x.key === 'gold');
			const _props = _mission.props.find(x => x.level === _t.level);
			const _gain = _props.gold;
			let _html = `<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Zone Level')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_t.level}
							</div>
						</div>
						<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Played Today')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_t.current} / ${_mission.limit}
							</div>
						</div>
						<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Reset After')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${getTimeDiffUntilReset()}
							</div>
						</div>
						<div class="w-100 flex">
							<div class="w-50 flex flex-jc-start">
								${getLangData('Upgrade Cost')}
							</div>
							<div class="w-50 flex flex-jc-end">
								${_props.cost.formatWithDots()}&nbsp;<img style="height:2.4vh !important" src="./images/icons/coin.png" />
							</div>
						</div>
						<div class="w-100 flex flex-jc-start mission-desc-title">
								${getLangData('Rewards')}
						</div>`;
			//for(let _g of _gain)
				_html += `<div class="flex flex-jc-start mission-reward-item">
					<img src="./images/icons/gold.png" />&nbsp;x${_gain ?? 1}
				</div>`;
			_html += `<div class="flex flex-jc-start mission-reward-item">
				<img src="./images/icons/coin.png" />&nbsp;+Bonus (${getLangData('Depends on time')})
			</div>`;
			_html +=`<div class="w-100 flex flex-jc-start mission-desc-title">${getLangData('Description')}</div>
				<div class="w-100 flex flex-jc-start mission-desc-text">
					${_mission.descriptions[getLang()]}
				</div>
			`;
			return _html;
		},
		limit: 2,
		props: [
			{ 
				level: 1, 
				cost:40000,
				gold: 6500
			}
		]
	}
];
const __quickTips = [
	{ id:1, desc: {
		en: 'Hold to absorb damage, press right before an attack to make counter',
		tr: 'Hasarı emmek için basılı tutun, saldırı anında basıp rakibinize omuz atın'
	}, skills: ['block'], descDir: 'bottom'},
	{ id:2, desc: {
		en: 'Your skills will change when you activate rage mode',
		tr: 'Öfke modunu başlattığında yeteneklerin değişiklik gösterecek'
	}, skills: ['air2', 'ground1modified'], descDir: 'bottom'},
	{ id:3, desc: {
		en: 'This skill is chained to other skills so you can continue your combo',
		tr: 'Bu yetenek başka yeteneğe zincirlidir, kombonuza devam edebilirsiniz'
	}, skills: ['ground1', 'ground3'], descDir: 'bottom'},
	{ id:4, desc: {
		en: 'You can dodge all attacks with rolling, but you can\'t do it all the time',
		tr: 'Takla atarak tüm saldırılardan kaçabilirsiniz ama sürekli yapamazsınız'
	}, skills: ['roll'], descDir: 'bottom'},
	{ id:5, desc: {
		en: 'Performs a charge attack when in range, hold for making a combo attack',
		tr: 'Belli mesafeden ilk basışta şarj, basılı tutunca kombo saldırısı yapar'
	}, skills: ['attack'], descDir: 'bottom'},
	{ id:7, desc: {
		en: 'Leap attack knocks the opponent into the air, severely breaks skill',
		tr: 'Sersemleten saldırı rakibin yeteneğini yüksek oranda kırarak onu havaya atar'
	}, skills: ['ground2'], descDir: 'bottom'},
	{ id:11, desc: {
		en: 'Try to break open the hanging beehive',
		tr: 'Asılı duran arı kovanını parçalamaya çalışın'
	}, skills: [], descDir: 'bottom'},
	{ id:12, desc: {
		en: 'Try to complete the quest before the time runs out',
		tr: 'Görevi süre bitmeden tamamlamaya çalışın'
	}, skills: [], descDir: 'bottom'},
	{ id:13, desc: {
		en: 'You should be wary of enemies who don\'t like you attacking the hive',
		tr: 'Kovana saldırmanızdan hoşlanmayan düşmanlara dikkat etmelisiniz'
	}, skills: [], descDir: 'bottom'},
	{ id:14, desc: {
		en: 'The hive will drop equipment as it takes damage. Equip this equipment',
		tr: 'Kovan hasar aldıkça ekipmanlar düşürecek. Bu ekipmanları kuşanın'
	}, skills: [], descDir: 'bottom'},
	{ id:17, desc: {
		en: 'During this time, you must be very careful of poison traps',
		tr: 'Bu esnada zehirli tuzaklara çok dikkat etmelisiniz'
	}, skills: [], descDir: 'bottom'},
	{ id:16, desc: {
		en: 'Defeat the final boss you encounter if you survive the time limit',
		tr: 'Süre zarfında hayatta kaldığınızda karşılaşacağınız yaratığı yenin'
	}, skills: [], descDir: 'bottom'},
]
const _npcQuests = [
	{
		id: 1, 
		key: 'carcass', 
		video: 1,
		names: { 
			en: 'Remove Carcasses',
			tr: 'Leşleri Kaldır'
		},
		descriptions: {
			en: 'Carcass Removed',
			tr: 'Leş Kaldırıldı'
		},
		owner: 'druid', 
		minLevel: 1, 
		loots: [
			{
				object: ['carcass1', 'carcass2'],
				limit: 3, key: 'carcass', type: 'quest-item', chanceRate: 100, command:'Remove'
			}
		], gain: [
			{ key: 'gold', value: 1000 }, 
			{ key: 'exp', value: 1000 }
		],
		maps: [1],
		before: function () {
			//episode.enemies.forEach(x => episode.hideHealthBar(x));
			episode.enemies = [];
			episode.installMobs();
			episode.sprites.forEach(x => x.questItem = x.relatedEnemy = undefined);
			episode.reset();
		}
	},
	{
		id: 2, 
		key: 'tulga', 
		names: { 
			en: 'Find The Child',
			tr: 'Çocuğu Bul'
		}, 
		descriptions: {
			en: 'Child Found',
			tr: 'Çocuk Bulundu'
		},
		owner: 'druid', 
		minLevel: 1, 
		loots: [
			{ key: 'tulga', type: 'npc', limit: 1, chanceRate: 100 }
		], gain: [{ key: 'gold', value: 1500 }, { key: 'exp', value: 1000 }],
		maps: [3]
	},
	{
		id: 3, names: { 
			en: 'Rat Terror',
			tr: 'Fare Saldırısı'
		},
		descriptions: {
			en: 'Rat Killed',
			tr: 'Fare Öldürüldü'
		}, owner: 'tank', minLevel: 2, kills: [
			{ enemy: [28], limit: 4, key: 'Rat' }
		], gain: [{ key: 'gold', value: 2000 }, { key: 'exp', value: 1500 }],
		maps: [3]
	},
	{
		id: 4, names: { 
			en: 'Finding Food',
			tr: 'Erzakları Kurtar'
		 },
		 descriptions: {
			 en: 'Meat Gathered',
			 tr: 'Et Bulundu'
		 }, owner: 'blacksmith', minLevel: 3, loots: [
			{ key: 'meat', type: 'quest-item', limit: 4, enemy: [19], chanceRate: 100 }
		], gain: [{ key: 'gold', value: 2000 }, { key: 'exp', value: 1500 }],
		maps: [3]
	},	
	{
		id: 5, names: { 
			en: 'The Payback',
			tr: 'Hesaplaşma'
		},
		descriptions: {
			en: 'Hyena Killed',
			tr: 'Sırtlan Öldürüldü'
		}, owner: 'tank', minLevel: 4, kills: [
			{ enemy: [20], limit: 4, key: 'Hyena' }
		], gain: [{ key: 'gold', value: 2500 }, { key: 'exp', value: 2000 }],
		maps: [5]
	},
	{
		id: 6, names: { 
			en: 'A Good Dinner',
			tr: 'Ziyafet'
		},
		descriptions: {
			en: 'Mushroom Picked',
			tr: 'Mantar Toplandı'
		}, owner: 'wizard', minLevel: 5, loots: [
			{ key: 'mushroom', type: 'quest-item', limit: 3, object: ['mushroom'], chanceRate: 100 }
		], gain: [{ key: 'gold', value: 2500 }, { key: 'exp', value: 2000 }],
		then: function () {
			cssAnimations.black(null, 3900, getLangData('Couple Hours Later...'), null, 1000);
			setTimeout(rain, 3500);
		},
		maps: [5]
	},
	{
		id: 7, key: 'lestat', names: { 
			en: 'Tooth Of Lestat',
			tr: 'Lestat\'ın Dişi'
		 },
		 descriptions: {
			 en: 'Teeth Found',
			 tr: 'Diş Bulundu'
		 }, owner: 'blacksmith', minLevel: 6, loots: [
			{ enemy: ['Lestat'], limit: 1, key: 'lestat-tooth', type: 'quest-item', chanceRate: 100 }
		], gain: [{ key: 'gold', value: 3000 }, { key: 'exp', value: 2500 }],
		then: function () {
			stopWeather();
			//playCutScene(2);
		},
		maps: [5]
	},
	// {
	// 	id: 6, name: 'Flowers of Evil', owner: 'wizard', minLevel: 5, loots: [
	// 		{ key: 'plant', type: 'quest-item', limit: 3, object: ['plant4'], chanceRate: 100 }
	// 	], gain: [{ key: 'gold', value: 1500 }, { key: 'exp', value: 10000 }],
	// 	maps: [2]
	// },
	// {
	// 	id: 2, name: 'Oh Crab!', owner: 'blacksmith', minLevel: 2, loots: [
	// 		{ enemy: [26], limit: 5, key: 'shell', type: 'quest-item', chanceRate: 100 }
	// 	], gain: [{ key: 'gold', value: 1500 }, { key: 'exp', value: 10000 }],
	// 	maps: [2]
	// },
	// {
	// 	id: 4, name: 'Beat The Nest', owner: 'tank', minLevel: 3, kills: [
	// 		{ enemy: [7], limit: 3, key: 'Wasp' }
	// 	], gain: [{ key: 'gold', value: 1500 }, { key: 'exp', value: 10000 }],
	// 	maps: [2]
	// },
	// {
	// 	id: 6, name: 'The Cure', owner: 'blacksmith', minLevel: 3, loots: [
	// 		{ enemy: [21, 7], limit: 3, key: 'poison', type: 'quest-item', chanceRate: 50 }
	// 	], gain: [{ key: 'gold', value: 2000 }, { key: 'exp', value: 15000 }],
	// 	// dialogs: [
	// 	// 	{ location: { map: 'lush', minX: 0 }, owner: 'main', text: 'The cure material must be around here...', ms: 2000 }
	// 	// ],
	// 	maps: [2]
	// },
	// // {
	// // 	id: 10, name: 'Oh Crab!', owner: 'tank', minLevel: 3, kills: [
	// // 		{ enemy: [26], limit: 5, key: 'Crab' }
	// // 	], gain: [{ key: 'gold', value: 2000 }, { key: 'exp', value: 15000 }],
	// // 	maps: [4]
	// // },
	// {
	// 	id: 8, name: 'Slime Party', owner: 'blacksmith', minLevel: 4, loots: [
	// 		{ key: 'spit', type: 'quest-item', limit: 4, enemy: [3], chanceRate: 50 }
	// 	], gain: [{ key: 'gold', value: 2500 }, { key: 'exp', value: 20000 }],
	// 	maps: [4]
	// },
	// {
	// 	id: 9, name: 'Exterminate Sickness', owner: 'tank', minLevel: 3, kills: [
	// 		{ enemy: [21], limit: 3, key: 'Lizard' }
	// 	], gain: [{ key: 'gold', value: 1500 }, { key: 'exp', value: 10000 }],
	// 	maps: [4]
	// },
	
	// // {
	// // 	id: 8, name: 'The Payback', owner: 'tank', minLevel: 5, kills: [
	// // 		{ enemy: [2], limit: 4, key: 'Bandit' }
	// // 	], gain: [{ key: 'gold', value: 3000 }, { key: 'exp', value: 25000 }],
	// // 	maps: [5]
	// // },
	// // {
	// // 	id: 9, name: 'A Good Dinner', owner: 'wizard', minLevel: 6, loots: [
	// // 		{ key: 'mushroom', type: 'quest-item', limit: 3, object: ['mushroom'], chanceRate: 100 }
	// // 	], gain: [{ key: 'gold', value: 3000 }, { key: 'exp', value: 25000 }],
	// // 	then: function () {
	// // 		cssAnimations.black(null, 3900, 'Couple Hours Later...');
	// // 		setTimeout(rain, 3500);
	// // 	},
	// // 	maps: [5]
	// // },
	// // {
	// // 	id: 10, key: 'lestat', name: 'Tooth Of Lestat', owner: 'blacksmith', minLevel: 6, loots: [
	// // 		{ enemy: ['Lestat'], limit: 1, key: 'lestat-tooth', type: 'quest-item', chanceRate: 100 }
	// // 	], gain: [{ key: 'gold', value: 3500 }, { key: 'exp', value: 30000 }],
	// // 	then: function () {
	// // 		stopWeather();
	// // 	},
	// // 	maps: [5]
	// // },
	{
		id: 8, names: { en: 'Break The Bones', tr: 'Kemikleri Kır' },
		descriptions: {
			en: 'Skeleton Killed',
			tr: 'İskelet Öldürüldü'
		}, owner: 'tank', minLevel: 6, kills: [
			{ enemy: [24], limit: 10, key: 'Skeleton' }
		], gain: [{ key: 'gold', value: 3000 }, { key: 'exp', value: 2500 }],
		maps: [7]
	},
	{
		id: 9, names: { en: 'Larval Silk', tr: 'Larva İpeği' },
		descriptions: {
			en: 'Silk Gathered',
			tr: 'İpek Bulundu'
		}, owner: 'druid', minLevel: 7, loots: [
			{ key: 'silk', type: 'quest-item', limit: 4, enemy: [10], chanceRate: 100 }
		], gain: [{ key: 'gold', value: 3500 }, { key: 'exp', value: 3000 }],
		maps: [7]
	},
	{
		id: 10, names: { en: 'Hortlak\'s Saliva', tr: 'Hortlak Salyası' }, 
		descriptions: {
			en: 'Saliva Gathered',
			tr: 'Salya Bulundu'
		},owner: 'blacksmith', minLevel: 7, loots: [
			{ key: 'saliva', type: 'quest-item', limit: 4, enemy: [23, 30], chanceRate: 100 }
		], gain: [{ key: 'gold', value: 3500 }, { key: 'exp', value: 3000 }],
		maps: [9]
	},
	{
		id: 11, names: { en: 'Roots of Death', tr: 'Ölümün Kökleri' }, 
		descriptions: {
			en: 'Herb Picked',
			tr: 'Ot Toplandı'
		},owner: 'druid', minLevel: 8, loots: [
			{
				object: ['bush1', 'bush2', 'bush3', 'bush4', 'bush5', 'bush6', 'bush7'],
				limit: 5, key: 'herb', type: 'quest-item', chanceRate: 100
			}
		], gain: [{ key: 'gold', value: 4000 }, { key: 'exp', value: 3500 }],
		maps: [9]
	},
	{
		id: 12, names: { en: 'Clear The Alley', tr: 'Patikayı Temizle' },
		descriptions: {
			en: 'Bandit Killed',
			tr: 'Haydut Öldürüldü'
		}, owner: 'tank', minLevel: 8, kills: [
			{ enemy: [33, 35, 36, 2], limit: 10, key: 'Bandit' }
		], gain: [{ key: 'gold', value: 4000 }, { key: 'exp', value: 3500 }],
		maps: [11, 13]
	},
	{
		id: 13,
		descriptions: {
			en: 'Wolf Saved',
			tr: 'Kurt Kurtarıldı'
		}, key: 'wolf', names: { en: 'Save Wolves', tr: 'Kurtları Kurtar' }, owner: 'blacksmith', minLevel: 8, kills: [
			{ enemy: [42], limit: 6, key: 'Wolf', command: 'Free' }
		], gain: [{ key: 'gold', value: 4500 }, { key: 'exp', value: 4000 }],
		maps: [11]
	},
	{
		id: 14, key: 'wasp', names: { en: 'Beat The Nest', tr: 'Kovanı Dürt' },
		descriptions: {
			en: 'Skin Found',
			tr: 'Deri Bulundu'
		}, owner: 'blacksmith', minLevel: 9, loots: [
			{ object: [ 'skin' ], limit: 7, key: 'skin', type: 'quest-item', chanceRate: 50 }
		], gain: [{ key: 'gold', value: 4500 }, { key: 'exp', value: 4000 }],
		maps: [13]
	},
	{
		id: 15, key:'shaman', names: { en: 'Shaman Sisters', tr: 'Şaman Kardeşler' }, owner: 'blacksmith', minLevel: 9, kills: [
			{ enemy: [37], limit: 1, key: 'Malvera',descriptions: {
				en: 'Malvera Killed',
				tr: 'Malvera Öldürüldü'
			} },
			{ enemy: [38], limit: 1, key: 'Noctara',descriptions: {
				en: 'Noctara Killed',
				tr: 'Noctara Öldürüldü'
			} }
		], gain: [{ key: 'gold', value: 5000 }, { key: 'exp', value: 4500 }],
		maps: [13]
	},
	{
		id: 16, names: { en: 'Tough Eggs', tr: 'Güçlü Yumurtalar' },descriptions: {
			en: 'Kobold Killed',
			tr: 'Ejder Öldürüldü'
		}, owner: 'tank', minLevel: 9, kills: [
			{ enemy: [41], limit: 6, key: 'Kobold' }
		], gain: [{ key: 'gold', value: 5000 }, { key: 'exp', value: 4500 }],
		maps: [15]
	},
	{
		id: 17, key:'itbarak', names: { en: 'It\'Barak Threat', tr: 'It\'Barak Tehdidi' },descriptions: {
			en: 'It\'Barak Killed',
			tr: 'It\'Barak Öldürüldü'
		}, owner: 'wizard', minLevel: 1, kills: [
			{ enemy: [29], limit: 1, key: 'It\'Barak' }
		], gain: [{ key: 'gold', value: 5500 }, { key: 'exp', value: 5000 }],
		maps: [15]
	},
	// {
	// 	id: 9, name: 'Disrupt The Hive', owner: 'tank', minLevel: 8, kills: [
	// 		{ enemy: [7], limit: 4, key: 'Wasp' }
	// 	], gain: [{ key: 'gold', value: 6000 }, { key: 'exp', value: 40000 }],
	// 	maps: [2]
	// },
	// {
	// 	id: 14, name: 'Slain Vegetables', owner: 'tank', minLevel: 8, kills: [
	// 		{ enemy: [25], limit: 5, key: 'Turnip' }
	// 	], gain: [{ key: 'gold', value: 5000 }, { key: 'exp', value: 40000 }],
	// 	maps: [9]
	// },
	// {
	// 	id: 15, name: 'Bloody Hyenas', owner: 'tank', minLevel: 8, kills: [
	// 		{ enemy: [20], limit: 5, key: 'Hyena' }
	// 	], gain: [{ key: 'gold', value: 5000 }, { key: 'exp', value: 40000 }],
	// 	maps: [9]
	// },
	// {
	// 	id: 16, name: 'Dusty Thorns', owner: 'wizard', minLevel: 9, loots: [
	// 		{ key: 'cactus', type: 'quest-item', limit: 3, object: ['cactus'], chanceRate: 100 }
	// 	], gain: [{ key: 'gold', value: 5000 }, { key: 'exp', value: 40000 }],
	// 	maps: [9]
	// },
	// {
	// 	id: 17, name: 'Stop The Giants', owner: 'tank', minLevel: 9, kills: [
	// 		{ enemy: [22], limit: 5, key: 'Troll' }
	// 	], gain: [{ key: 'gold', value: 5000 }, { key: 'exp', value: 40000 }],
	// 	maps: [11]
	// },
	// {
	// 	id: 18, name: 'Potion Of Power', owner: 'wizard', minLevel: 9, loots: [
	// 		{ key: 'snowdrop', type: 'quest-item', limit: 3, object: ['snowdrop'], chanceRate: 100 }
	// 	], gain: [{ key: 'gold', value: 5500 }, { key: 'exp', value: 45000 }],
	// 	maps: [11]
	// },
	// {
	// 	id: 19, name: 'Cleanse Wolves', owner: 'tank', minLevel: 10, kills: [
	// 		{ enemy: [27], limit: 5, key: 'Wolf' }
	// 	], gain: [{ key: 'gold', value: 5500 }, { key: 'exp', value: 45000 }],
	// 	maps: [11],
	// 	then: function() { 
	// 		_client.upgradeVisitedMaps(6);
	// 		warn('<div class="flex heading achievement" style="position:relative"><img style="height:12vh" src="./images/icons/scroll.png" />&nbsp;<span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('New Map Discovered') + '!</span></div>', 'level-up');
	// 		PlaySound({ key: 'page', volume: .5 });
	// 	},
	// },
	// {
	// 	id: 20, name: 'Kill Al\'Karısı', owner: 'tank', minLevel: 10, kills: [
	// 		{ enemy: [1000], limit: 1, key: 'Al\'Karısı' }
	// 	], gain: [{ key: 'gold', value: 7500 }, { key: 'exp', value: 50000 }],
	// 	maps: [6]
	// }
	// {
	// 	id: 9, dungeon: 1, name: 'Dungeon Challange', owner: 'tank', minLevel: 6, kills: [
	// 		{ enemy: [15], limit: 5, key: 'Hınkır Munkur' }
	// 	], gain: [{ key: 'gold', value: 7500 }, { key: 'exp', value: 50000 }],
	// 	maps: [1000]
	// }
];
const _quests = [
	{ id: 1, props: { kill: 10 } },
	{ id: 2, props: { kill: 20 } },
	{ id: 3, props: { kill: 30 } },
	{ id: 4, props: { kill: 40 } },
	{ id: 5, props: { kill: 50 } },
	{ id: 6, props: { kill: 100 } },
	{ id: 7, props: { kill: 150 } },
	{ id: 8, props: { kill: 200 } },
	{ id: 9, props: { kill: 250 } },
	{ id: 10, props: { kill: 300 } },
	{ id: 11, props: { kill: 400 } },
	{ id: 12, props: { kill: 500 } },
	{ id: 13, props: { kill: 600 } },
	{ id: 14, props: { kill: 700 } },
	{ id: 15, props: { kill: 800 } },
	{ id: 16, props: { kill: 900 } },
	{ id: 17, props: { kill: 1000 } }
];
const commonSkills = [
	//{ key: 'timestop' },
	{ key: 'firespray', title: {
		tr: 'Ateş Spreyi',
		en: 'Fire Spray'
	} },
	// { key: 'fireexplosion' },
	{ key: 'icespike', title: {
		tr: 'Buz Mızrağı',
		en: 'Ice Spike'
	} },
	{ key: 'electricbolt', title: {
		tr: 'Elektrik Oku',
		en: 'Electric Bolt'
	} },
	{ key: 'waterwave', title: {
		tr: 'Su Dalgası',
		en: 'Water Wave'
	} },
	{ key: 'poisonpuff', title: {
		tr: 'Zehirli Puf',
		en: 'Poison Puff'
	} },
	{ key: 'earthrock', title: {
		tr: 'Toprak Kaya',
		en: 'Earth Rock'
	} },
	{ key: 'corpseexplode', pvp: false,
		do: function(_char) {
			const _corpses = episode.seenEnemies.filter(x => x !== _char && x.isDead()
			&& x.class !== __spell && !x.finishingBy && !x.owner && !x.related && 
			x.class !== 'object' && !x.corpseExploding);
			let _used;
			if(_corpses?.[0])
			{
				for(let x of _corpses)
				{
					if(x.animation === 'dead')
					{
						_char.throwSpell({spell:{key:'corpseexplode'}}, null, x);
						x.corpseExploding = x.invisible = 1;
						if(!_used)
							_used = 1;
					}
				}
				if(_used){
					PlaySound({key:'corpse', volume:.3, reset:true});
					requestAnimationFrame(() => {
						PlaySound({key:'soul', volume:.7, reset:true});
					});
					return true;
				}
			}
			warn('<span>' + getLangData('No corpse around') + '</span>', 'warn');
			return false;
		}, 
	},
	// { key: 'last', type: 'buff' },
	// { key: 'hps', type: 'buff', level: 2 },
	// { key: 'speedup', type: 'buff' },
	// { key: 'teberweapon', forEnemy: [2] }
];
function pickRandomCommonSkill() {
	const _isPvp = episode?.pvp;
	const _indexes = [];
	commonSkills.forEach((x, i) => {
		if (_isPvp && x.pvp === false)
			return;
		_indexes.push(i);
	});
	return commonSkills[_indexes[getRandomValue2(0, _indexes.length - 1)]].key;
}
function drinkPot(_char, _gifter, _event) {
	if (_event) {
		_event.stopPropagation();
		_event.preventDefault();
	}
	if(_focusMode)
		return;
	const _ch = _char ?? mainCharacter;
	if (episode.pvp || episode.missionCountDown || _ch.health <= 0 || _ch.deadTime)
		return;
	if(_ch.health >= _ch.MAXHP)
		return;
	if((_gameTick - _ch.lastPotUsage) < 2000)
		return;
	const _hp = MathCeil(_ch.MAXHP / 5);
	const _pot = __account.pots.find(x => x.key === 'pot');
	if (episode?.lobby) {
		warn('<span>' + getLangData('Can not use potion in safe zone') + '</span>', 'warn');
		return;
	}
	if ((!_pot || _pot.value <= 0) && episodePot <= 0) {
		warn('<span>' + getLangData('No potion left for now') + '</span>', 'warn');
		return;
	}
	_ch.increaseHealth(_hp);
	PlaySound({ key: 'drink', volume: 1 });
	addDmgFrame({
		text: 'plus-hp',
		//class: 'effect-steal',
		x: _ch.LEFT,
		from:_ch,
		y: _canvas.height - _ch.yPosition - _ch.HEIGHT
	});
	if(episodePot > 0)
		episodePot--;
	else if(_pot)
		_pot.value--;
	if (_pot?.value <= 0)
		__account.pots.splice(0, 1);
	_potCount = document.getElementById('main-pot-count');
	if (_gifter)
		_ch.addObject({
			key: 'hpgift',
			position: 'over-head'
		});
	if ((!_gifter && _ch === mainCharacter) || _gifter === mainCharacter)
		_potCount.innerText = (_pot?.value ?? 0) + episodePot;
	_ch.lastPotUsage = _gameTick;
	if(_ch.potBtn) {
		const _pt = _ch.potBtn;
		removeClass(_pt, 'cooldown');
		void _pt.offsetWidth;
		addClass(_pt, 'cooldown');
		_ch.potsActive = false;
	}
	_client.saveState();
}
const relatedObjects = [
	{
		id: 'charge', key: 'charge', width: 200, reversed: true, height: 124, col: 3,
		zoom: 1, totalFrames: 10, speed: 4, singleton: true, still: true
	},
	{
		id: 'liquidblood', key: 'liquidblood', width: 52, height: 72, col: 7,
		zoom: 1.2, totalFrames: 14, speed: 4, repeat: 3, singleton: true, still: true
	},
	{
		id: 'sleep', key: 'sleep', width: 158, height: 45, col: 5,
		zoom: 2, totalFrames: 15, speed: 4, singleton: true, stillOnChar: true, repeat: true
	},
	{
		id: 'heart', key: 'heart', width: 64, height: 64, col: 5,
		zoom: .65, totalFrames: 10, speed: 4, repeat: 3, singleton: true, still: true
	},
	{
		id: 'nocc', key: 'nocc', width: 300, height: 225, col: 8,
		zoom: 1.5, totalFrames: 23, speed: 4, singleton: true, repeat: true
	},
	{
		id: 'crit', key: 'crit', width: 109, height: 95, col: 5,
		zoom: 1, totalFrames: 6, speed: 5, singleton: true, still: true
	},
	{
		id: 'void', key: 'void', width: 334, height: 99, col: 8,
		zoom: 1, totalFrames: 31, speed: 8, singleton: true, repeat: true, still: true
	},
	{
		id: 'shadowfront', key: 'shadowfront', width: 450, height: 350, col: 6,
		zoom: 1, totalFrames: 17, speed: 3, singleton: true, repeat: true
	},
	{
		id: 'invisiblesmoke', key: 'invisiblesmoke', width: 120, height: 120, col: 3,
		zoom: 2, totalFrames: 9, speed: 3, singleton: true, still: true
	},
	{
		id: 'cloudred', key: 'cloudred', width: 120, height: 120, col: 3,
		zoom: 2, totalFrames: 9, speed: 3, singleton: true, still: true
	},
	{
		id: 'regen', key: 'regen', width: 117, height: 63, zoom: 1, col: 8,
		totalFrames: 16, speed: 4, singleton: true
	},
	{
		id: 'questshine', key: 'questshine', width: 256, height: 256, zoom: 2, col: 8,
		totalFrames: 72, skip: 2, speed: 8, repeat: true, 
		singleton: true, preDraw: true, still: true, bind: true
	},
	{
		id: 'hpgift', key: 'hpgift', width: 64, height: 48, zoom: 2,
		sound: { key: 'hpgift', volume: .25, reset: true },
		totalFrames: 8, speed: 7, singleton: true
	},
	{
		id: 'stun', key: 'stun', type: 'hurt', width: 102, height: 48, zoom: 1, repeat: true, bottom: 10,
		totalFrames: 20, skip: 2, speed: 4, stillOnChar: true, stillY: true, singleton: true, effect: 'stun', limit: 5, bind: 'hurtground'
	},
	{ id: 'glow', key: 'glow', width: 250, height: 250, totalFrames: 4, speed: 2, zoom: .8, still: true, singleton: true },
	{ id: 'shadow', key: 'shadow', width: 128, height: 19, top: 0, zoom: 1, bottom: 0 },
	{
		id: 'ouch', key: 'ouch', type: 'hurt', width: 46, height: 43, zoom: 3,
		totalFrames: 5, speed: 3
	},
	{
		id: 'bigouch', key: 'bigouch', type: 'hurt', width: 46, height: 43, zoom: 15,
		totalFrames: 5, speed: 3, singleton: true
	},
	{
		id: 'shine', key: 'shine', width: 100, height: 100, zoom: 1,
		totalFrames: 5, baseTop: 100, speed: 4, still: true, singleton: true
	},
	{
		id: 'shine2', key: 'shine2', width: 112, height: 115, zoom: 2, col:4,
		totalFrames: 8, speed: 3, still: true, singleton: true
	},
	{
		id: 'shield', key: 'shield', width: 79, height: 76, zoom: 1,
		totalFrames: 8, col: 4, speed: 6, singleton: true
	},
	{
		id: 'dashanimated', key: 'dashanimated', width: 237, height: 160, zoom: .8,
		totalFrames: 5, speed: 4, still: true, singleton: true
	},
	{
		id: 'lightning', key: 'lightning', width: 240, height: 260, zoom: 1,
		totalFrames: 4, speed: 8, still: true, singleton: true, reversed: true
	},
	{
		id: 'cloudground', key: 'cloudground', width: 202, height: 131, zoom: 1,
		totalFrames: 6, speed: 4, still: true, singleton: true, reversed: true
	},
	{
		id: 'cloudground2', key: 'cloudground2', width: 202, height: 131, zoom: 1,
		totalFrames: 6, speed: 4, still: true, singleton: true
	},
	{
		id: 'friction', key: 'friction', width: 129, height: 76, zoom: .65,
		totalFrames: 5, speed: 5, still: true, yGap: -20, reversed: true, bind: true
	},
	{
		id: 'electric', key: 'electric', width: 104, height: 170, zoom: 1.25,
		totalFrames: 11, col: 2, speed: 4, singleton: true, bind: true, repeat: true
	},
	{
		id: 'electricred', key: 'electricred', width: 104, height: 170, zoom: 1.25,
		totalFrames: 11, col: 2, speed: 3, singleton: true
	},
	{
		id: 'defaultfootsteps', key: 'defaultfootsteps', width: 150, height: 60, zoom: 2,
		totalFrames: 11, col: 5, speed: 2, still: true, yGap: -48
	},
	{
		id: 'lushfootsteps', key: 'lushfootsteps', width: 118, height: 24, zoom: 1.2,
		totalFrames: 8, speed: 2, still: true, col: 1
	},
	{
		id: 'explode', key: 'explode', width: 300, height: 85, baseTop: 172, zoom: 2.4,
		totalFrames: 10, speed: 2, still: true, singleton: true
	},
	{
		id: 'blood', key: 'blood', type: 'hurt', width: 512, height: 512, zoom: .25,
		totalFrames: 6, speed: 4, singleton: true
	},
	{
		id: 'bloodmouth', key: 'bloodmouth', width: 50, height: 40, zoom: 2,
		totalFrames: 6, speed: 6, singleton: true
	},
	{
		id: 'squish', key: 'squish', type: 'hurt', width: 100, height: 70, zoom: 1.8,
		totalFrames: 6, speed: 4, singleton: true
	},
	{
		id: 'blooddrop1', key: 'blooddrop1', width: 79, height: 20, zoom: 1, delay: 10,
		totalFrames: 7, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop2', key: 'blooddrop2', width: 100, height: 25, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop3', key: 'blooddrop3', width: 100, height: 25, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop4', key: 'blooddrop4', width: 100, height: 31, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop5', key: 'blooddrop5', width: 100, height: 44, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop6', key: 'blooddrop6', width: 176, height: 74, zoom: .45, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop7', key: 'blooddrop7', width: 204, height: 74, zoom: .4, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop8', key: 'blooddrop8', width: 158, height: 104, zoom: .45, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop9', key: 'blooddrop9', width: 200, height: 87, zoom: .4, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop10', key: 'blooddrop10', width: 179, height: 81, zoom: .45, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddrop11', key: 'blooddrop11', width: 100, height: 37, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen1', key: 'blooddropgreen1', width: 79, height: 20, zoom: 1, delay: 10,
		totalFrames: 7, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen2', key: 'blooddropgreen2', width: 100, height: 25, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen3', key: 'blooddropgreen3', width: 100, height: 25, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen4', key: 'blooddropgreen4', width: 100, height: 31, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen5', key: 'blooddropgreen5', width: 100, height: 44, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen6', key: 'blooddropgreen6', width: 176, height: 74, zoom: .45, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen7', key: 'blooddropgreen7', width: 204, height: 74, zoom: .4, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen8', key: 'blooddropgreen8', width: 158, height: 104, zoom: .45, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen9', key: 'blooddropgreen9', width: 200, height: 87, zoom: .4, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen10', key: 'blooddropgreen10', width: 179, height: 81, zoom: .45, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'blooddropgreen11', key: 'blooddropgreen11', width: 100, height: 37, zoom: 1, delay: 10,
		totalFrames: 1, speed: 4, still: true, reversable: false, limit: 10,
		multiUse: true, shadow: 'rgba(0,0,0,.5)', blur: 10, fade: true, ground: true
	},
	{
		id: 'puf1', key: 'puf1', type: 'hurt', width: 100, height: 115, zoom: 1.2,
		totalFrames: 6, speed: 4, singleton: true, still: true
	},
	{
		id: 'puf2', key: 'puf2', type: 'hurt', width: 100, height: 110, zoom: 1.2,
		totalFrames: 6, speed: 4, singleton: true, still: true
	},
	{
		id: 'puf3', key: 'puf3', type: 'hurt', width: 100, height: 110, zoom: 1.2,
		totalFrames: 6, speed: 4, still: true
	},
	{
		id: 'smoke', key: 'smoke', width: 46, height: 43, zoom: 3,
		totalFrames: 5, speed: 3, singleton: true, still: true
	},
	{
		id: 'blooddead', key: 'blooddead', type: 'hurt', width: 145, height: 31, zoom: 1,
		totalFrames: 1, speed: 120, reversed: true, still: true, ground: true, multiUse: true, reversable: false
	},
	{
		id: 'finish', key: 'finish', type: 'hurt', width: 113, height: 197, zoom: 1,
		totalFrames: 8, speed: 5, singleton: true
	},
	{
		id: 'touch', key: 'touch', type: 'hurt', width: 204, height: 204, zoom: 1,
		totalFrames: 5, col: 3, speed: 4, singleton: true
	},
	{
		id: 'bloodstar', key: 'bloodstar', col: 4, width: 196, height: 158, zoom: .8,
		totalFrames: 6, speed: 3, singleton: true, still: true
	},
	{
		id: 'bloodhead1', key: 'bloodhead1', type: 'hurt', width: 100, height: 63, zoom: 2,
		totalFrames: 10, speed: 6, multiUse: true, still: true
	},
	{
		id: 'bloodhead2', key: 'bloodhead2', type: 'hurt', width: 100, height: 94, zoom: 2,
		totalFrames: 10, speed: 6, multiUse: true, still: true
	},
	{
		id: 'bloodneck', key: 'bloodneck', width: 100, height: 37, zoom: .75,
		totalFrames: 1, speed: 250, still: true, multiUse: true
	},
	{
		id: 'bloodnecksmall', key: 'bloodneck', type: 'hurt', width: 100, height: 37, zoom: .55,
		totalFrames: 1, speed: 250, still: true, multiUse: true
	},
	{
		id: 'wind', key: 'wind', width: 407 / 2, height: 613 / 7, baseTop: 613 / 7, zoom: 2.5,
		totalFrames: 12, col: 2, speed: 4, still: true, singleton: true
	},
	{
		id: 'wind2', key: 'wind2', width: 407 / 2, height: 613 / 7, baseTop: 613 / 7, zoom: 2.5,
		totalFrames: 12, col: 2, speed: 4, still: true, singleton: true
	},
	{
		id: 'poison', key: 'poison', width: 83, height: 106, zoom: 1,
		totalFrames: 6, col: 4, speed: 4, still: true, singleton: true
	},
	{
		id: 'poison2', key: 'poison2', width: 102, height: 75, zoom: 2,
		totalFrames: 6, col: 3, speed: 4, still: true, singleton: true
	},
	{
		id: 'dzzt', key: 'dzzt', type: 'hurt', width: 68, height: 123, zoom: 2,
		totalFrames: 6, speed: 4, singleton: true
	},
	{
		id: 'jump', key: 'jump', width: 112, height: 112, zoom: 2, yGap: -15,
		totalFrames: 20, skip: 2, col: 5, speed: 4, still: true, reversed: true, singleton: true
	},
	{
		id: 'buffup', key: 'buffup', width: 90, height: 116, zoom: 1,
		totalFrames: 10, col: 5, speed: 4, still: true, singleton: true
	},
	{
		id: 'blacksmoke', key: 'blacksmoke', width: 155, height: 114, zoom: .6,
		totalFrames: 5, speed: 12, still: true, singleton: true, reversed: true
	},
	{
		id: 'disease', key: 'disease', width: 75, height: 75, col: 5,
		zoom: 2.4, totalFrames: 10, speed: 4, singleton: true, stillOnChar: true
	},
	{
		id: 'burn', key: 'burn', width: 90, height: 90, zoom: 1,
		totalFrames: 10, col: 5, speed: 6, singleton: true, stillOnChar: true
	},
	{
		id: 'weakness', key: 'weakness', width: 64, height: 64, zoom: 1,
		totalFrames: 13, col: 4, speed: 6, singleton: true
	},
	{
		id: 'landing', key: 'landing', sound: { key: 'landing', volume: .2 }, width: 150, height: 109, zoom: 2,
		totalFrames: 17, col: 4, skip:2, speed: 4, singleton: true, yGap: 27, still: true
	},
	{
		id: 'bloodhit', key: 'bloodhit', type: 'hurt', width: 120, height: 120, zoom: 2,
		totalFrames: 8, speed: 2, singleton: true, still: true
	},
	{
		id: 'levelup', key: 'levelup', width: 200, height: 148, zoom: .75,
		totalFrames: 14, skip: 2, speed: 4, singleton: true
	},
	{
		id: 'tebergroundhit', key: 'tebergroundhit', width: 158, height: 50, zoom: 1.75,
		totalFrames: 16, skip: 2, speed: 6, singleton: true, still: true
	},
	{
		id: 'freeze', key: 'freeze', width: 1290 / 5, height: 774 / 3, zoom: 1,
		totalFrames: 15, speed: 6, singleton: true, still: true, col: 5,
		sound: { key: 'icespike', volume: .75 }
	},
	{
		id: 'tebergroundattack', key: 'tebergroundattack', width: 236, height: 210,
		zoom: 1, totalFrames: 5, speed: 4, singleton: true, still: true, col: 5
	},
	{
		id: 'headsmash', key: 'headsmash', width: 355, height: 117,
		zoom: 1.2, totalFrames: 6, speed: 6, singleton: true, still: true, col: 2
	},
	{
		id: 'hurtdead2blood', key: 'hurtdead2blood', width: 98, height: 78,
		zoom: 2, totalFrames: 5, speed: 6, singleton: true, still: true
	},
	{
		id: 'ring', key: 'ring', width: 258, height: 50, col: 1,
		zoom: 2.4, totalFrames: 5, speed: 5, singleton: true
	},
	{
		id: 'trail', key: 'trail', width: 513/3, height: 84, col: 3, preDraw: true,
		zoom: 1.5, totalFrames: 5, speed: 4, singleton: true, bind: true, repeat: true
	},
	{
		id: 'trail2', key: 'trail2', width: 513/3, height: 84, col: 3, fade: .05, alpha:.95,
		zoom: 1.5, totalFrames: 5, speed: 2, still: true, multiUse: true, fadeZoom: 1.05
	},
	{
		id: 'shockwave', key: 'shockwave', width: 240, height: 196, col: 3,
		zoom: 1.2, totalFrames: 4, speed: 3, singleton: true, still: true
	},
	{
		id: 'shockwave2', key: 'shockwave2', width: 180, height: 128, col: 6,
		zoom: 2, totalFrames: 30, speed: 2, singleton: true, stillOnChar: true
	},
	{
		id: 'ring2', key: 'ring2', width: 202, height: 108, col: 3,
		zoom: 2, totalFrames: 6, speed: 6, singleton: true
	},
	{
		id: 'dustsmoke', key: 'dustsmoke', width: 128, height: 256, col: 5,
		zoom: 1.5, totalFrames: 14, speed: 8, skip: 2, repeat: true, 
		singleton: true, still: true, bind: 'dead'
	},
	{
		id: 'shieldactive', key: 'shieldactive', width: 51, height: 111,
		zoom: 1.35, totalFrames: 1, speed: 1, singleton: true, bind: 'block', repeat: true
	},
	{
		id: 'shieldhurt', key: 'shieldhurt', width: 51, height: 111,
		zoom: 1.35, totalFrames: 1, speed: 1, singleton: true, bind: 'hurtblock', repeat: true
	},
	{
		id: 'shieldhurt2', key: 'shieldhurt2', width: 51, height: 111,
		zoom: 1.45, totalFrames: 1, speed: 6, singleton: true
	},
	{
		id: 'web', key: 'web', width: 225, height: 82, color: '#f7f7f7ec',
		zoom: 1, totalFrames: 1, speed: 120, singleton: true, still: true
	},
	{
		id: 'witch', key: 'witch', width: 2560, height: 1024,
		zoom: .5, totalFrames: 1, speed: 600, singleton: true, still: true
	},
	{
		id: 'slam', key: 'slam', width: 198, col: 3, height: 121,
		zoom: 2, totalFrames: 9, speed: 6, singleton: true, still: true
	},
	{
		id: 'reflect', key: 'reflect', width: 200, col: 4, height: 160,
		zoom: 2, totalFrames: 19, speed: 4, singleton: true, repeat: true
	},
	{
		id: 'respawn', key: 'respawn', width: 350, col: 4, height: 175,
		zoom: 1, totalFrames: 24, skip: 2, speed: 3, still: true, singleton: true
	},
	{
		id: 'skull', key: 'skull', width: 187, col: 10, height: 286,
		zoom: 1, totalFrames: 28, skip: 2, speed: 3, still: true, singleton: true
	},
	{
		id: 'cold', key: 'cold', width: 44, col: 1, height: 47,
		zoom: 1.65, totalFrames: 5, speed: 4, singleton: true, repeat: true
	},
	{
		id: 'cagebg', key: 'cagebg', width: 380, height: 244,
		zoom: .9, totalFrames: 1, speed: 2100000000, 
		singleton: true, preDraw: true, still: true, bind: true, repeat: true
	},
	{
		id: 'cagefg', key: 'cagefg', width: 379, height: 233, 
		zoom: .95, totalFrames: 1, speed: 2100000000, singleton: true, repeat: true, 
		still: true, bind: true
	},
	{
		id: 'cagebg2', key: 'cagebg2', width: 256, height: 242,
		zoom: 1.4, totalFrames: 1, speed: 2100000000, 
		singleton: true, preDraw: true, still: true, bind: true, repeat: true
	},
	{
		id: 'cagefg2', key: 'cagefg2', width: 256, height: 242, 
		zoom: 1.4, totalFrames: 1, speed: 2100000000, singleton: true, repeat: true, 
		still: true, bind: true
	},
	{
		id: 'swarm', key: 'swarm', width: 266, height: 95, 
		zoom: .5, totalFrames: 4, speed: 8, singleton: true, repeat: true, still: true
	},
	{ id: 'bloodfx1', type: 'hurt', key: 'bloodfx1', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 114, height: 97, baseTop: 740, zoom: 1.2 },
	{ id: 'bloodfx2', type: 'hurt', key: 'bloodfx2', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 110, height: 85, baseTop: 470, zoom: 1.2 },
	{ id: 'bloodfx3', type: 'hurt', key: 'bloodfx3', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 110, height: 100, baseTop: 370, zoom: 1.2 },
	{ id: 'bloodfx4', type: 'hurt', key: 'bloodfx4', reset:true, reversed: true, totalFrames: 4, still: true, speed: 4, singleton: true, width: 110, height: 80, baseTop: 200, zoom: 1.2 },
	{ id: 'bloodfx5', type: 'hurt', key: 'bloodfx5', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 110, height: 100, baseTop: 280, zoom: 1.2 },
	{ id: 'bloodfx6', type: 'hurt', key: 'bloodfx6', reset:true, reversed: true, totalFrames: 7, still: true, speed: 4, singleton: true, width: 110, height: 110, baseTop: 90, zoom: 1.2 },
	{ id: 'bloodfx7', type: 'hurt', key: 'bloodfx7', reset:true, reversed: true, totalFrames: 6, still: true, speed: 4, singleton: true, width: 110, height: 80, baseTop: 660, zoom: 1.2 },
	//{ id: 'bloodfx8', type: 'hurt', key: 'bloodfx8', totalFrames: 13, speed: 3, singleton: true, width: 110, height: 106, baseTop: 554, zoom: 1 },
	{ id: 'bloodfx8red', type: 'hurt', key: 'bloodfx8red',  reset: true, totalFrames: 6, still:true, speed: 5, singleton: true, width: 400, height: 225, zoom: 1, xGap: 25, stillOnChar: true },
	{ id: 'bloodfx1green', type: 'hurt', key: 'bloodfx1green', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 114, height: 97, baseTop: 740, zoom: 1.2 },
	{ id: 'bloodfx2green', type: 'hurt', key: 'bloodfx2green', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 110, height: 85, baseTop: 470, zoom: 1.2 },
	{ id: 'bloodfx3green', type: 'hurt', key: 'bloodfx3green', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 110, height: 100, baseTop: 370, zoom: 1.2 },
	{ id: 'bloodfx4green', type: 'hurt', key: 'bloodfx4green', reset:true, reversed: true, totalFrames: 4, still: true, speed: 4, singleton: true, width: 110, height: 80, baseTop: 200, zoom: 1.2 },
	{ id: 'bloodfx5green', type: 'hurt', key: 'bloodfx5green', reset:true, reversed: true, totalFrames: 8, still: true, speed: 4, singleton: true, width: 110, height: 100, baseTop: 280, zoom: 1.2 },
	{ id: 'bloodfx6green', type: 'hurt', key: 'bloodfx6green', reset:true, reversed: true, totalFrames: 7, still: true, speed: 4, singleton: true, width: 110, height: 110, baseTop: 90, zoom: 1.2 },
	{ id: 'bloodfx7green', type: 'hurt', key: 'bloodfx7green', reset:true, reversed: true, totalFrames: 6, still: true, speed: 4, singleton: true, width: 110, height: 80, baseTop: 660, zoom: 1.2 },
	//{ id: 'bloodfx8green', type: 'hurt', key: 'bloodfx8green', totalFrames: 13, speed: 3, singleton: true, width: 110, height: 106, baseTop: 554, zoom: 1 },
	{ id: 'bloodfx8green', type: 'hurt', key: 'bloodfx8green', reset: true, totalFrames: 6, speed: 5, still:true, singleton: true, width: 400, height: 225, zoom: 1, stillOnChar: true },
	{
		id: 'questshadow', key: 'questshadow', width: 192, height: 67, baseTop:7,
		zoom: .9, totalFrames: 4, speed: 8, singleton: true, repeat: true, stillOnChar: true
	},
	{
		id: 'laserend', key: 'laserend', width: 128, height: 128, still: true,
		zoom: 1, totalFrames: 4, speed: 4, singleton: true, repeat: true
	},
	{
		id: 'campfire', key: 'campfire', width: 128, height: 128, still: true,
		zoom: 1, totalFrames: 6, speed: 6, singleton: true, repeat: true, 
		bind: true
	},
	{
		id: 'slash', key: 'slash', width: 125, height: 150, stillOnChar: true,
		zoom: 1, totalFrames: 6, speed: 6, singleton: true
	},
	{
		id: 'campfiresmoke', key: 'campfiresmoke', width: 128, height: 128, still: true,
		zoom: 1, totalFrames: 6, speed: 6, singleton: true, repeat: true
	},
	{
		id: 'woodhit', key: 'woodhit', width: 256, height: 256, still: true,
		zoom: 1, totalFrames: 10, speed: 6, singleton: true, reset: true
	},
	{
		id: 'dust', key: 'dust', width: 144, height: 144, still: true,
		zoom: 1, totalFrames: 10, speed: 5, singleton: true
	},
	{
		id: 'aura', key: 'aura', width: 192, height: 192,
		zoom: 1, totalFrames: 16, speed: 5, col: 5, singleton: true, still:true, stillOnChar: true
	},
	{
		id: 'aura2', key: 'aura2', width: 192, height: 192,
		zoom: 1, totalFrames: 16, speed: 5, col: 5, singleton: true, still:true, stillOnChar: true
	},
	{
		id: 'atkbuff', key: 'atkbuff', width: 150, height: 150,
		zoom: 1.5, totalFrames: 27, speed: 6, col: 7, singleton: true, still:true
	},
	{
		id: 'hit', key: 'hit', width: 100, height: 92, limit: 5,
		zoom: 2, totalFrames: 8, speed: 4, col: 4, singleton: true
	},
	{
		id: 'hitwhite', key: 'hitwhite', width: 196, height: 158, limit: 5,
		zoom: 1, totalFrames: 8, speed: 4, col: 4, singleton: true
	},
	{
		id: 'caboom', key: 'caboom', width: 200, height: 200,
		zoom: 1, totalFrames: 10, speed: 4, singleton: true
	},
	{
		id: 'slashturn', key: 'slashturn', width: 147, height: 147, stillOnChar: true,
		zoom: 2.2, totalFrames: 4, speed: 6, singleton: true, repeat: true, bind: true
	},
	{
		id: 'caboom', key: 'caboom', width: 200, height: 200,
		zoom: 1, totalFrames: 10, speed: 4, singleton: true
	},
	{
		id: 'queststart', key: 'queststart', width: 80, reversable: false, height: 80, zoom: 1,
		totalFrames: 1, speed: 999, repeat: true, singleton: true, yGap: 50, still: true, background: true
	},
	{
		id: 'queststartgray', key: 'queststartgray', width: 80, reversable: false, height: 80, zoom: 1,
		totalFrames: 1, speed: 999, repeat: true, singleton: true, yGap: 50, still: true, background: true
	},
	{
		id: 'questprogress', key: 'questprogress', width: 80, reversable: false, height: 86, zoom: 1,
		totalFrames: 1, speed: 999, repeat: true, singleton: true, yGap: 50, still: true, background: true
	},
	{
		id: 'questprogressgray', key: 'questprogressgray', reversable: false, width: 80, height: 78, zoom: 1,
		totalFrames: 1, speed: 999, repeat: true, singleton: true, yGap: 50, still: true, background: true
	},
	{
		id: 'hit1', key: 'hit1', width: 192, height: 192, zoom: 1,
		totalFrames: 10, speed: 4, singleton: true, still: true
	},
	{
		id: 'hit2', key: 'hit2', width: 100, height: 100, zoom: 2, limit:5, col:5,
		totalFrames: 10, speed: 4, skip:2, singleton: true, still: true
	},
	{
		id: 'hit2v3', key: 'hit2v3', width: 100, height: 100, zoom: 2, limit:5, col:5,
		totalFrames: 10, speed: 4, skip:2, singleton: true, still: true
	},
	{
		id: 'hit2v4', key: 'hit2v4', width: 100, height: 100, zoom: 2, limit:5, col:5,
		totalFrames: 10, speed: 4, skip:2, singleton: true, still: true
	},
	{
		id: 'hit3', key: 'hit3', width: 192, height: 192, zoom: 1, limit:5, col:5,
		totalFrames: 15, speed: 4, singleton: true, still: true
	},
	{
		id: 'hit4', key: 'hit4', width: 192, height: 192, zoom: 2, col:5,
		totalFrames: 12, speed: 4, singleton: true, still: true
	},
	{
		id: 'hit5', key: 'hit5', width: 192, height: 192, col: 5, zoom: 1,
		totalFrames: 14, speed: 3, singleton: true, still: true
	},
	{
		id: 'hurtvfx', key: 'hurtvfx', width: 192, height: 192, zoom: 1,
		totalFrames: 20, speed: 4, singleton: true, type: 'hurt'
	},
	{
		id: 'hurtsteal1', key: 'hurtsteal1', width: 192, col:5, height: 192, zoom: 2,
		totalFrames: 25, speed: 4, singleton: true, type: 'hurt'
	},
	{
		id: 'hurtsteal2', key: 'hurtsteal2', width: 192, col:5, height: 192, zoom: 2,
		totalFrames: 8, speed: 3, singleton: true, type: 'hurt'
	},
	{
		id: 'aura3', key: 'aura3', width: 192, height: 192, col:5, zoom: 2,
		totalFrames: 25, speed: 4, singleton: true, repeat:true, stillOnChar: true
	},
	{
		id: 'bam', key: 'bam', width: 200, height: 200, col:6, zoom: 1,
		totalFrames: 6, speed: 4, singleton: true, still: true, type: 'hurt'
	},
	{
		id: 'deadsparkred', key: 'deadsparkred', width: 152, height: 166, col:11, zoom: 1, reset: true,
		totalFrames: 10, speed: 2, singleton: true, still: true, type: 'hurt'
	},
	{
		id: 'deadsparkgreen', key: 'deadsparkgreen', width: 152, height: 166, col:11, zoom: 1, reset: true,
		totalFrames: 10, speed: 2, singleton: true, still: true, type: 'hurt'
	},
	{
		id: 'target', key: 'target', width: 256, height: 241, col:4, zoom: 1,
		totalFrames: 28, speed: 4, skip:2, singleton: true, stillOnChar: true
	},
	{
		id: 'sparkblocksmall', key: 'sparkblocksmall',
		width: 40, height: 40, col:4, zoom: 2, type: 'hurt', baseTop: 0,
		totalFrames: 4, speed: 3, singleton: true, still: true
	},
	{
		id: 'sparkblockmedium', key: 'sparkblockmedium',
		width: 40, height: 40, col:4, zoom: 2, type: 'hurt', baseTop: 40,
		totalFrames: 4, speed: 3, singleton: true, still: true
	},
	{
		id: 'sparkblockbig', key: 'sparkblockbig',
		width: 40, height: 40, col:4, zoom: 2, type: 'hurt', baseTop: 80,
		totalFrames: 4, speed: 3, singleton: true, still: true
	},
	{
		id: 'sparkhitsmall', key: 'sparkhitsmall',
		width: 40, height: 40, col:4, zoom: 2, type: 'hurt', baseTop: 120,
		totalFrames: 4, speed: 3, singleton: true, still: true
	},
	{
		id: 'sparkhitmedium', key: 'sparkhitmedium',
		width: 40, height: 40, col:4, zoom: 2.2, type: 'hurt', baseTop: 160,
		totalFrames: 4, speed: 3, singleton: true, still: true
	},
	{
		id: 'sparkhitbig', key: 'sparkhitbig',
		width: 40, height: 40, col:4, zoom: 2.4, type: 'hurt', baseTop: 200,
		totalFrames: 4, speed: 3, singleton: true, still: true
	},
	{
		id: 'sparkcrit', key: 'sparkcrit',
		width: 40, height: 40, col:5, zoom: 2.5, type: 'hurt', baseTop: 240,
		totalFrames: 5, speed: 3, singleton: true, still: true
	},
	{
		id: 'sparkcharge', key: 'sparkcharge',
		width: 150, height: 150, col:4, zoom: 1.5, type: 'hurt',
		totalFrames: 14, speed: 3, frame: 2, skip:2, singleton: true, still: true
	},
	{
		id: 'stars', key: 'stars',
		width: 256, height: 256, col:6, zoom: 1,
		totalFrames: 24, speed: 3, frame: 2, skip:3, singleton: true, still: true
	},
	{
		id: 'sparks', key: 'sparks',
		width: 64, height: 64, col:1, zoom: 1,
		totalFrames: 11, speed: 2, singleton: true, still: true
	},
	{
		id: 'energy', key: 'energy',
		width: 100, height: 100, col:4, zoom: 2, type: 'hurt',
		totalFrames: 8, speed: 3, singleton: true
	},
	{
		id: 'energy2', key: 'energy2',
		width: 128, height: 128, col:4, zoom: 2,
		totalFrames: 16, skip:2, speed: 3, singleton: true
	},
	{
		id: 'energy3', key: 'energy3',
		width: 32, height: 32, col:9, zoom:3,
		totalFrames: 9, speed: 3, singleton: true
	},
	{
		id: 'bloodsplat', key: 'bloodsplat',
		width: 250, height: 250, col:4, zoom: 1, type: 'hurt',
		totalFrames: 16, speed: 4, skip:2, singleton: true, still: true
	},
	{
		id: 'bloodsplat2', key: 'bloodsplat2',
		width: 200, height: 200, col:4, zoom: 1.5,
		totalFrames: 10, speed: 3, singleton: true, still: true
	},
	{
		id: 'death', key: 'death',
		width: 256, height: 256, col:6, zoom: .8,
		totalFrames: 24, speed: 3, skip:2, singleton: true, still: true
	},
	{
		id: 'throw', key: 'throw',
		width: 140, height: 31, col:1, zoom: 1.5,
		totalFrames: 6, speed: 4, singleton: true, still: true
	},
	{
		id: 'throwwhite', key: 'throwwhite',
		width: 140, height: 35, col:1, zoom: 1.5, frame:1,
		totalFrames: 20, skip:3, speed: 3, singleton: true, still: true
	},
	{
		id: 'chargeimpact', key: 'chargeimpact',
		width: 1280/4, height: 1182/6, col:4, zoom: 1, frame:1, bind: true,
		totalFrames: 23, speed: 3, singleton: true, stillOnChar: true
	},
	{
		id: 'groundbackdust', key: 'groundbackdust',
		width: 202, height: 411/3, col:3, zoom: 1,
		totalFrames: 8, speed: 3, singleton: true, still: true
	}
];
function setRelatedObjectSpeed() {
	for(let x of relatedObjects)
		if(x.speed)
			x.speed = MathRound(x.speed / ((__globalMS / 20) - .16));
}
setRelatedObjectSpeed();
const relatedObjectImages = {
	groundbackdust: function () {
		return getImage('./images/related/ground-back-dust.png')
	},
	chargeimpact: function () {
		return getImage('./images/related/charge-impact.png')
	},
	stars: function () {
		return getImage('./images/related/stars.png')
	},
	throwwhite: function () {
		return getImage('./images/related/throw.png')
	},
	throw: function () {
		return getImage('./images/related/throwdarker.png')
	},
	sparks: function () {
		return getImage('./images/related/sparks.png')
	},
	death: function () {
		return getImage('./images/related/death.png')
	},
	energy3: function () {
		return getImage('./images/related/energy4.png')
	},
	energy2: function () {
		return getImage('./images/related/energy3.png')
	},
	energy: function () {
		return getImage('./images/related/energy.png')
	},
	bloodsplat2: function () {
		return getImage('./images/related/blood-splatter2.png')
	},
	bloodsplat: function () {
		return getImage('./images/related/bloodsplatter.png')
	},
	trail: function () {
		return getImage('./images/related/trail.png?x=2')
	},
	trail2: function () {
		return getImage('./images/related/trail2.png')
	},
	shockwave2: function () {
		return getImage('./images/related/shockwave2.png')
	},
	// shockwave: function () {
	// 	return getImage('./images/related/shockwave.png')
	// },
	sparkblocksmall: function () {
		return getImage('./images/related/spark3.png')
	},
	sparkblockmedium: function () {
		return getImage('./images/related/spark3.png')
	},
	sparkblockbig: function () {
		return getImage('./images/related/spark3.png')
	},
	sparkhitsmall: function () {
		return getImage('./images/related/spark3.png')
	},
	sparkhitmedium: function () {
		return getImage('./images/related/spark3.png')
	},
	sparkhitbig: function () {
		return getImage('./images/related/spark3.png')
	},
	sparkcrit: function () {
		return getImage('./images/related/spark3.png')
	},
	sparkcharge: function () {
		return getImage('./images/related/chargespark.png')
	},
	target: function () {
		return getImage('./images/related/target.png?x=2')
	},
	bam: function () {
		return getImage('./images/related/bam.png')
	},
	deadsparkred: function () {
		return getImage('./images/related/dead-spark.png')
	},
	deadsparkgreen: function () {
		return getImage('./images/related/dead-spark-green.png')
	},
	hurtsteal1: function () {
		return getImage('./images/related/steal1.png')
	},
	hurtsteal2: function () {
		return getImage('./images/related/steal2.png')
	},
	hurtvfx: function () {
		return getImage('./images/related/hurt-vfx.png')
	},
	hit1: function () {
		return getImage('./images/related/hit_1.png')
	},
	hit2: function () {
		return getImage('./images/related/hit2v2.png')
	},
	hit2v3: function () {
		return getImage('./images/related/hit2v3.png')
	},
	hit2v4: function () {
		return getImage('./images/related/hit2v4.png')
	},
	hit3: function () {
		return getImage('./images/related/hit_3.png')
	},
	hit4: function () {
		return getImage('./images/related/hit_4.png')
	},
	hit5: function () {
		return getImage('./images/related/hit_5.png')
	},
	weakness: function () {
		return getImage('./images/related/weakness.png')
	},
	queststart: function () {
		return getImage('./images/icons/quest-start.png')
	},
	queststartgray: function () {
		return getImage('./images/icons/quest-start-gray.png')
	},
	questprogress: function () {
		return getImage('./images/icons/quest-progress.png')
	},
	questprogressgray: function () {
		return getImage('./images/icons/quest-progress-gray.png')
	},
	charge: function () {
		return getImage('./images/related/charge2.png')
	},
	slashturn: function () {
		return getImage('./images/related/slash-turn.png')
	},
	slash: function () {
		return getImage('./images/related/slash.png')
	},
	caboom: function () {
		return getImage('./images/related/caboom.png')
	},
	hitwhite: function () {
		return getImage('./images/related/hit-white.png')
	},
	hit: function () {
		return getImage('./images/related/hit.png')
	},
	atkbuff: function () {
		return getImage('./images/related/atk.png')
	},
	aura: function () {
		return getImage('./images/related/aura.png')
	},
	aura2: function () {
		return getImage('./images/related/aura2.png')
	},
	aura3: function () {
		return getImage('./images/related/aura3.png')
	},
	dust: function () {
		return getImage('./images/related/dust.png')
	},
	woodhit: function () {
		return getImage('./images/related/woodhit.png')
	},
	campfiresmoke: function () {
		return getImage('./images/related/smoke.png')
	},
	campfire: function () {
		return getImage('./images/related/campfire.png')
	},
	laserend: function () {
		return getImage('./images/sprites/ep47/laserend.png')
	},
	questshadow: function () {
		return getImage('./images/related/quest-shadow.png')
	},
	touch: function () {
		return getImage('./images/related/touch.png')
	},
	coldcloud: function () {
		return getImage('./images/related/cold2.png')
	},
	bloodfx1: function () {
		return getImage('./images/related/bloodfx.png')
	},
	bloodfx2: function () {
		return getImage('./images/related/bloodfx.png')
	},
	bloodfx3: function () {
		return getImage('./images/related/bloodfx.png')
	},
	bloodfx4: function () {
		return getImage('./images/related/bloodfx.png')
	},
	bloodfx5: function () {
		return getImage('./images/related/bloodfx.png')
	},
	bloodfx6: function () {
		return getImage('./images/related/bloodfx.png')
	},
	bloodfx7: function () {
		return getImage('./images/related/bloodfx.png')
	},
	bloodfx8red: function () {
		return getImage('./images/related/bloodfx9.png')
	},
	// bloodfx9: function () {
	// 	return getImage('./images/related/bloodfx9.png')
	// },
	bloodfx1green: function () {
		return getImage('./images/related/bloodfxgreen.png')
	},
	bloodfx2green: function () {
		return getImage('./images/related/bloodfxgreen.png')
	},
	bloodfx3green: function () {
		return getImage('./images/related/bloodfxgreen.png')
	},
	bloodfx4green: function () {
		return getImage('./images/related/bloodfxgreen.png')
	},
	bloodfx5green: function () {
		return getImage('./images/related/bloodfxgreen.png')
	},
	bloodfx6green: function () {
		return getImage('./images/related/bloodfxgreen.png')
	},
	bloodfx7green: function () {
		return getImage('./images/related/bloodfxgreen.png')
	},
	bloodfx8green: function () {
		return getImage('./images/related/bloodfx9green.png')
	},
	swarm: function () {
		return getImage('./images/related/swarm.png')
	},
	liquidblood: function () {
		return getImage('./images/related/liquid-blood.png')
	},
	sleep: function () {
		return getImage('./images/related/sleep.png')
	},
	heart: function () {
		return getImage('./images/related/heart.png')
	},
	cagebg: function () {
		return getImage('./images/related/cage-bg.png')
	},
	cagefg: function () {
		return getImage('./images/related/cage-fg.png')
	},
	cagebg2: function () {
		return getImage('./images/related/cage2bg.png')
	},
	cagefg2: function () {
		return getImage('./images/related/cage2fg.png?x=2')
	},
	cold: function () {
		return getImage('./images/related/cold.png')
	},
	skull: function () {
		return getImage('./images/related/skull.png')
	},
	respawn: function () {
		return getImage('./images/related/circle-smoke.png')
	},
	reflect: function () {
		return getImage('./images/related/reflect.png')
	},
	slam: function () {
		return getImage('./images/related/slam.png')
	},
	witch: function () {
		return getImage('./images/related/witch.png')
	},
	nocc: function () {
		return getImage('./images/related/nocc.png')
	},
	crit: function () {
		return getImage('./images/related/crit.png')
	},
	void: function () {
		return getImage('./images/related/void.png')
	},
	shadowfront: function () {
		return getImage('./images/related/shadow-front.png')
	},
	invisiblesmoke: function () {
		return getImage('./images/related/thiefpuf.png')
	},
	cloudred: function () {
		return getImage('./images/related/cloud-red.png')
	},
	web: function () {
		return getImage('./images/related/web.png')
	},
	regen: function () {
		return getImage('./images/related/regen.png')
	},
	shieldhurt: function () {
		return getImage('./images/related/shield-hurt.png')
	},
	shieldhurt2: function () {
		return getImage('./images/related/shield-hurt.png?v=2')
	},
	shieldactive: function () {
		return getImage('./images/related/shield-active.png')
	},
	dustsmoke: function () {
		return getImage('./images/related/dustsmoke.png')
	},
	questshine: function () {
		return getImage('./images/related/quest-shine.png')
	},
	hpgift: function () {
		return getImage('./images/related/hpgift.png')
	},
	shield: function () {
		return getImage('./images/related/shield.png')
	},
	ring: function () {
		return getImage('./images/related/ring.png')
	},
	ring2: function () {
		return getImage('./images/related/ring2.png')
	},
	disease: function () {
		return getImage('./images/related/disease.png')
	},
	hurtdead2blood: function () {
		return getImage('./images/related/hurt-dead2.png')
	},
	tebergroundattack: function () {
		return getImage('./images/related/teber-ground-attack.png')
	},
	freeze: function () {
		return getImage('./images/related/freeze.png')
	},
	blood: function () {
		return getImage('./images/related/blood-animated.png')
	},
	smoke: function () {
		return getImage('./images/related/ouch-animated.png')
	},
	explode: function () {
		return getImage('./images/related/explode.png')
	},
	blooddrop1: function () {
		return getImage('./images/related/blood-drop.png')
	},
	blooddrop2: function () {
		return getImage('./images/related/blood-drop2.png')
	},
	blooddrop3: function () {
		return getImage('./images/related/blood-drop3.png')
	},
	blooddrop4: function () {
		return getImage('./images/related/blood-drop4.png')
	},
	blooddrop5: function () {
		return getImage('./images/related/blood-drop5.png')
	},
	blooddrop6: function () {
		return getImage('./images/related/blood-drop6.png')
	},
	blooddrop7: function () {
		return getImage('./images/related/blood-drop7.png')
	},
	blooddrop8: function () {
		return getImage('./images/related/blood-drop8.png')
	},
	blooddrop9: function () {
		return getImage('./images/related/blood-drop9.png')
	},
	blooddrop10: function () {
		return getImage('./images/related/blood-drop10.png')
	},
	blooddrop11: function () {
		return getImage('./images/related/blood-drop11.png')
	},
	blooddropgreen1: function () {
		return getImage('./images/related/blood-dropgreen.png')
	},
	blooddropgreen2: function () {
		return getImage('./images/related/blood-dropgreen2.png')
	},
	blooddropgreen3: function () {
		return getImage('./images/related/blood-dropgreen3.png')
	},
	blooddropgreen4: function () {
		return getImage('./images/related/blood-dropgreen4.png')
	},
	blooddropgreen5: function () {
		return getImage('./images/related/blood-dropgreen5.png')
	},
	blooddropgreen6: function () {
		return getImage('./images/related/blood-dropgreen6.png')
	},
	blooddropgreen7: function () {
		return getImage('./images/related/blood-dropgreen7.png')
	},
	blooddropgreen8: function () {
		return getImage('./images/related/blood-dropgreen8.png')
	},
	blooddropgreen9: function () {
		return getImage('./images/related/blood-dropgreen9.png')
	},
	blooddropgreen10: function () {
		return getImage('./images/related/blood-dropgreen10.png')
	},
	blooddropgreen11: function () {
		return getImage('./images/related/blood-dropgreen11.png')
	},
	electric: function () {
		return getImage('./images/related/electric.png')
	},
	electricred: function () {
		return getImage('./images/related/electric-red.png')
	},
	blooddead: function () {
		return getImage('./images/related/blood-dead2.png')
	},
	puf1: function () {
		return getImage('./images/related/puf1.png')
	},
	puf2: function () {
		return getImage('./images/related/puf2.png')
	},
	puf3: function () {
		return getImage('./images/related/puf3.png')
	},
	bloodmouth: function () {
		return getImage('./images/related/blood-mouth.png')
	},
	friction: function () {
		return getImage('./images/related/friction-animated.png')
	},
	defaultfootsteps: function () {
		return getImage('./images/related/defaultfootsteps.png')
	},
	lushfootsteps: function () {
		return getImage('./images/related/swampfootsteps.png')
	},
	lightning: function () {
		return getImage('./images/related/lightning-animated.png')
	},
	shine: function () {
		return getImage('./images/related/shine.png')
	},
	shine2: function () {
		return getImage('./images/related/shine2.png')
	},
	dashanimated: function () {
		return getImage('./images/related/dash-animated.png')
	},
	cloudground: function () {
		return getImage('./images/related/cloud-ground3.png')
	},
	cloudground2: function () {
		return getImage('./images/related/cloud-ground3.png')
	},
	glow: function () {
		return getImage('./images/related/glow2.png')
	},
	stun: function () {
		return getImage('./images/related/stun-animated.png')
	},
	shadow: function () {
		return getImage('./images/related/shadow3.png')
	},
	ouch: function () {
		return getImage('./images/related/ouch-animated.png')
	},
	bigouch: function () {
		return getImage('./images/related/ouch-animated.png')
	},
	finish: function () {
		return getImage('./images/related/finish.png')
	},
	bloodstar: function () {
		return getImage('./images/related/blood-hurt.png')
	},
	bloodhead1: function () {
		return getImage('./images/related/blood-head1.png')
	},
	bloodhead2: function () {
		return getImage('./images/related/blood-head2.png')
	},
	bloodneck: function () {
		return getImage('./images/related/blood-neck.png')
	},
	bloodnecksmall: function () {
		return getImage('./images/related/blood-neck.png')
	},
	wind: function () {
		return getImage('./images/related/wind.png')
	},
	wind2: function () {
		return getImage('./images/related/wind2.png')
	},
	poison: function () {
		return getImage('./images/related/poison.png')
	},
	poison2: function () {
		return getImage('./images/related/poison2.png')
	},
	dzzt: function () {
		return getImage('./images/related/dzzt-2.png')
	},
	jump: function () {
		return getImage('./images/related/air-jump.png')
	},
	buffup: function () {
		return getImage('./images/related/buffup.png')
	},
	burn: function () {
		return getImage('./images/related/burn.png')
	},
	landing: function () {
		return getImage('./images/related/landing.png')
	},
	bloodhit: function () {
		return getImage('./images/related/bloodhit.png')
	},
	levelup: function () {
		return getImage('./images/related/levelup.png')
	},
	tebergroundhit: function () {
		return getImage('./images/related/tebergroundhit.png')
	},
	headsmash: function () {
		return getImage('./images/related/head-smash.png')
	}
}
const __artifactGroups = [
	{ id: 1, count:4, bonus: { key: 'atk', rate: 10 }},
	{ id: 2, count:4, bonus: { key: 'def', rate: 20 }}
];
const __artifacts = [
	{ id:1,titles:{en:'Hunger Of The Moon', tr:'Ayın Açlığı'}, group:1},
	{ id:2,titles:{en:'War Of The Moon', tr:'Ayın Katliamı'}, group:1},
	{ id:3,titles:{en:'Disease Of The Moon', tr:'Ayın İlleti'}, group:1},
	{ id:4,titles:{en:'Death Of The Moon', tr:'Ayın Ölümü'}, group:1},
	{ id:5,titles:{en:'Guard Of The Sun', tr:'Güneşin Koruması'}, group:2},
	{ id:6,titles:{en:'Blessing Of The Sun', tr:'Güneşin Bereketi'}, group:2},
	{ id:7,titles:{en:'Light Of The Sun', tr:'Güneşin Işığı'}, group:2},
	{ id:8,titles:{en:'Heart Of The Sun', tr:'Güneşin Kalbi'}, group:2}
];
const misc = [
	{ 
		titles: { en: 'Gem Selection Ticket', tr: 'Yakut Seçme Bileti' },
		cost: 100,
		type:'ticket-gem-selection', 
		graded: true,
		descriptions: { 
			en: 'Choose the gem type you want. Maximum grade of gem depends on your account grade',
			tr: 'Listeden istediğiniz bir yakutu seçebilirsiniz. Yakut seviyesi hesap seviyenize oranla değişiklik gösterebilir'
		},
		do: function(_type, _grade) {
			let _level = _grade;
			if(!_level) {
				_level = 1;
				const _maxLevel = MathFloor(mainCharacter.level / 10) + 1;
				if(_maxLevel > _level)
					_level = getRandomValue(_level, _maxLevel);
			}
			useGemSelectionTicket(_level);
		}
	},
	{ 
		titles: { en: 'Item Selection Ticket', tr: 'Ekipman Seçme Bileti' },
		cost: 100,
		type:'ticket-item-selection', 
		graded: true,
		descriptions: { 
			en: 'Choose the item type you want. Maximum grade of item depends on your account grade',
			tr: 'Listeden istediğiniz bir ekipmanı seçebilirsiniz. Ekipman seviyesi hesap seviyenize oranla değişiklik gösterebilir'
		},
		do: function(_type, _grade) {
			let _level = _grade;
			if(!_level) {
				_level = 1;
				const _maxLevel = MathFloor(mainCharacter.level / 10) + 1;
				if(_maxLevel > _level)
					_level = getRandomValue(_level, _maxLevel);
			}
			useItemSelectionTicket(_level);
		}
	},
	{ 
		titles: { en: 'Option Change Ticket', tr: 'Özellik Değiştirme Bileti' },
		cost: 100,
		type:'ticket-random', 
		descriptions: { 
			en: 'Changes attributes of selected item with random ones',
			tr: 'Seçili ekipmanda bulunan özellikleri rasgele değiştirir' 
		}
	},
	{ 
		titles: { en: 'Story Pass Ticket', tr: 'Bölüm Geçme Bileti' },
		cost: 100,
		type:'ticket-pass', 
		descriptions: { 
			en: 'It helps you to finish story missions instantly and gain mission finish rewards',
			tr: 'Hikaye bölümlerini hızlı bir şekilde bitirerek ödüllerini kazanmanıza imkan sağlar' 
		},
		do: function(_item) {
			switchBookPage(3,1);
			return false;
		}
	},
	{ 
		titles: { en: 'Gold Ticket', tr: 'Altın Bileti' },
		time: 3600000,
		cost: 100,
		type:'ticket-gold', 
		descriptions: { 
			en: 'Doubles gold gain rate of story plays',
			tr: 'Hikaye oynarken kazanılan altın miktarını iki ile çarpar' 
		},
		do: function(_item) {
			switchBookPage(3,1);
			return false; //addMiscBuff(_item);
		}
	},
	{ 
		titles: { en: 'Item Ticket', tr: 'Ekipman Bileti' },
		time: 3600000,
		cost: 100,
		type:'ticket-item', 
		descriptions: {
			en: 'Doubles item gain rate of story plays',
			tr: 'Hikaye oynarken kazanılan ekipman miktarını iki ile çarpar' 
		},
		do: function(_item) {
			switchBookPage(3,1);
			return false; //addMiscBuff(_item);
		}
	},
	{ 
		titles: { en: 'Experience Ticket', tr: 'Tecrübe Bileti' },
		time: 3600000,
		cost: 100,
		type:'ticket-exp', 
		descriptions: { 
			en: 'Doubles experience gain rate of story plays',
			tr: 'Hikaye oynarken kazanılan tecrübe puanını iki ile çarpar' 
		},
		do: function(_item) {
			switchBookPage(3,1);
			return false; //addMiscBuff(_item);
		}
	},
	{ 
		titles: { en: 'Reward Chest', tr: 'Ödül Sandığı' },
		cost: 100,
		type:'chest', 
		graded: true,
		descriptions: { 
			en: 'Contains random rewards depends on grade',
			tr: 'Seviyesine göre rastgele ödül içerir' 
		},
		do: function(_item, _grade) {
			warnChestReward(getChestReward(_grade ?? _item.grade ?? 1));
			return true;
		}
	}
];
function addMiscBuff(_item) {
	const _key = _item.type.replace(/[-]/g, '');
	const _current = __account.buffs.find(x => x.key === _key);
	if(_current) {
		warn('<span>' + getLangData('Another one is still active') + '</span>', 'warn');
		return false;
	}
	__account.buffs.push({
		type: 'buff',
		key: _key,
		time: _gameTick,
		level: 1,
		ms: _item.time
	});
	return true;
}
const storySoundFiles = {
	st1: {
		sc1: {
			id1: './images/scene/sounds/st1sc1id1.mp3',
			//id2: './images/scene/sounds/st1sc1id2.wav',
			id3: './images/scene/sounds/st1sc1id3.wav',
			// id6: './images/scene/sounds/st1sc1id6.mp3',
			// id7: './images/scene/sounds/st1sc1id7.mp3',
			// id10: './images/scene/sounds/st1sc1id10.mp3',
			// id11: './images/scene/sounds/st1sc1id11.mp3',
			// id13: './images/scene/sounds/st1sc1id13.mp3',
			// id20: './images/scene/sounds/st1sc1id20.mp3',
			// id21: './images/scene/sounds/st1sc1id21.mp3',
			// id26: './images/scene/sounds/st1sc1id26.mp3',
		}
	}
}
const soundFiles = {
	packagegain: './images/sounds/package-gain.wav',
	woodland: './images/sounds/wood-land2.mp3',
	airwhistle: './images/sounds/air-whistle.mp3',
	doggrunt: './images/sounds/dog-grunt.mp3',
	skillmove3: './images/sounds/skill-move3.mp3',
	skillmove2: './images/sounds/skill-move2.mp3',
	skillmove: './images/sounds/skill-move.mp3',
	scoreup: './images/sounds/score-up.mp3',
	eggfall: './images/sounds/egg-fall.mp3',
	cliff: './images/sounds/cliff.mp3',
	goblinkingtongue: './images/sounds/goblin-king-tongue.mp3',
	goblinkingrelease: './images/sounds/goblin-king-release.mp3',
	goblinkingenter: './images/sounds/goblin-king-enter.mp3',
	goblinkingdead: './images/sounds/goblin-king-dead.mp3',
	goblinkinghurt1: './images/sounds/goblin-king-hurt1.mp3',
	goblinkinghurt2: './images/sounds/goblin-king-hurt2.mp3',
	goblinkinghurt3: './images/sounds/goblin-king-hurt3.mp3',
	goblinkingkickhurt: './images/sounds/goblin-king-kick-hurt.mp3',
	goblinkingkick: './images/sounds/goblin-king-kick.mp3',
	punchcartoon: './images/sounds/punch-cartoon.mp3',
	jesperroll: './images/sounds/jesper-roll6.mp3',
	jesperhurt: './images/sounds/jesper-hurt.mp3',
	jesperboom: './images/sounds/jesper-boom.wav',
	slingmelee: './images/sounds/sling-melee.mp3',
	rockhit: './images/sounds/rock-hit.mp3',
	rockhit2: './images/sounds/rock-hit2.mp3',
	rockhit3: './images/sounds/rock-hit3.mp3',
	bonusscore: './images/sounds/bonus-score.mp3',
	bigbodydrop: './images/sounds/body-drop-big.mp3',
	bodydrop: './images/sounds/body-drop.mp3',
	deepimpact: './images/sounds/deep-impact.mp3',
	deadimpact: './images/sounds/dead-impact.mp3',
	nointernet: './images/sounds/no-internet.mp3',
	newrecord: './images/sounds/new-record.mp3',
	goldground: './images/sounds/gold-ground.mp3',
	portalclose: './images/sounds/portal-close.mp3',
	portalopen: './images/sounds/portal-open.mp3',
	itemweared: './images/sounds/item-weared.mp3',
	wooshfilm: './images/sounds/woosh-film.mp3',
	kick: './images/sounds/kick.mp3',
	slam: './images/sounds/slam.mp3',
	horror: './images/sounds/horror.mp3',
	singlekick: './images/sounds/single-kick.mp3',
	woosh: './images/sounds/woosh.mp3',
	waterfall: './images/sounds/waterfall2.mp3',
	hivedeath: './images/sounds/hivedeath.mp3',
	hivehurt1: './images/sounds/hivehurt1.mp3',
	hivehurt2: './images/sounds/hivehurt2.mp3',
	hivelurk: './images/sounds/hivelurk.mp3',
	confetti: './images/sounds/confetti.mp3',
	hiaaa: './images/sounds/hea2.mp3',
	cash: './images/sounds/cash.mp3',
	tiktak: './images/sounds/tiktak.mp3',
	bell: './images/sounds/bell.mp3',
	bonusactive: './images/sounds/bonus-active.mp3',
	bonusdone: './images/sounds/bonus-done.mp3',
	bonecrack: './images/sounds/bonecrack.mp3',
	root1: './images/sounds/root1.mp3',
	root2: './images/sounds/root2.mp3',
	root3: './images/sounds/root3.mp3',
	root4: './images/sounds/root4.mp3',
	root5: './images/sounds/root5.mp3',
	toygarhurt1: './images/sounds/toygarhurt1.mp3',
	toygarhurt2: './images/sounds/toygarhurt2.mp3',
	toygarhurt3: './images/sounds/toygarhurt3.mp3',
	toygarhurt4: './images/sounds/toygarhurt4.mp3',
	toygarhurt5: './images/sounds/toygarhurt5.mp3',
	toygarhurt6: './images/sounds/toygarhurt6.mp3',
	toygarhurt7: './images/sounds/toygarhurt7.mp3',
	deadeffect1: './images/sounds/deadeffect1.mp3',
	deadeffect2: './images/sounds/deadeffect2.mp3',
	ultiactive: './images/sounds/ulti-active.mp3?v=2',
	dzztshort: './images/sounds/dzzt-short.mp3',
	keyboard: './images/sounds/keyboard.mp3',
	chargehit1: './images/sounds/charge-hit1.mp3',
	chargehit2: './images/sounds/charge-hit2.mp3',
	chargepower: './images/sounds/chargepower5.mp3',
	blockbreak2: './images/sounds/blockbreak2.mp3',
	bloodsquish: './images/sounds/bloodsquish.mp3',
	punchhit: './images/sounds/punchhit4.wav',
	tak: './images/sounds/tak5.mp3',
	beyblade: './images/sounds/beyblade.mp3',
	taklong: './images/sounds/tak.mp3',
	soul: './images/sounds/soul.mp3?x=3',
	corpse: './images/sounds/corpse.mp3',
	conquer: './images/sounds/conquer.mp3',
	flaghurt1: './images/sounds/flaghurt1.mp3',
	flaghurt2: './images/sounds/flaghurt2.mp3',
	flaghurt3: './images/sounds/flaghurt3.mp3',
	duelrequest: './images/sounds/duel-request.mp3',
	warselect: './images/sounds/war-select.mp3',
	cartoonfall: './images/sounds/fall-cartoon.mp3',
	warstart: './images/sounds/war-start.mp3',
	cyclopstag: './images/sounds/cyclops-tag2.mp3',
	werewolftag: './images/sounds/werewolf-tag.mp3',
	werewolfspin: './images/sounds/werewolf-spin.mp3?x=2',
	bombertag: './images/sounds/bomber-tag.mp3',
	knighttag: './images/sounds/knight-tag.mp3',
	altag: './images/sounds/al-tag.mp3',
	tagimpact: './images/sounds/tag-impact.mp3',
	geminsert: './images/sounds/gem-insert.mp3',
	autopass: './images/sounds/auto-pass.mp3',
	unlock: './images/sounds/unlock.mp3',
	wolves: './images/sounds/wolves.mp3',
	enter: './images/sounds/enter.mp3',
	gem: './images/sounds/gem.mp3',
	boss: './images/sounds/boss.mp3',
	bossalert: './images/sounds/boss-alert.mp3',
	hua: './images/sounds/hua.mp3',
	fireex: './images/sounds/fireex.mp3',
	storyfinish: './images/sounds/story-finish-impact.wav',
	ironx1: './images/sounds/ironx1.mp3',
	raaa: './images/sounds/raaaaaa.mp3',
	yeah: './images/sounds/yeah.mp3',
	trade: './images/sounds/trade.mp3',
	reset: './images/sounds/reset.mp3',
	paperrip: './images/sounds/paper-rip.mp3',
	rockobom: './images/sounds/rockobom.mp3?v=2',
	heavyhit: './images/sounds/heavy-hit.mp3',
	powerdown: './images/sounds/power-down.mp3',
	bullrun: './images/sounds/bull-step.mp3?v=2',
	bullangry: './images/sounds/bull-angry.mp3',
	fatality: './images/sounds/fatality.mp3',
	failure: './images/sounds/failure.mp3',
	baseballhit: './images/sounds/baseball-hit.mp3?v=2',
	baseball: './images/sounds/baseball.mp3',
	glasscrack: './images/sounds/glass-crack.mp3',
	finishhim: './images/sounds/finishhim.mp3',
	select2: './images/sounds/select2.mp3',
	squash: './images/sounds/squash.mp3',
	sling: './images/sounds/sling.mp3',
	rocksbreak: './images/sounds/rocks-break.mp3',
	powercharge: './images/sounds/power-charge.mp3',
	frogrun: './images/sounds/frog-run.mp3?x=2',
	diks: './images/sounds/diks.mp3?x=2',
	hiyaah: './images/sounds/hiyaah.mp3?x=2',
	fireburst: './images/sounds/fire-burst.mp3',
	huthurt1: './images/sounds/huthurt1.mp3',
	huthurt2: './images/sounds/huthurt2.mp3',
	huthurt3: './images/sounds/huthurt3.mp3',
	huthurt4: './images/sounds/huthurt4.mp3',
	summon: './images/sounds/summon.mp3',
	fleshhurt1: './images/sounds/flesh-hurt1.mp3',
	fleshhurt2: './images/sounds/flesh-hurt2.mp3',
	fleshhurt3: './images/sounds/flesh-hurt3.mp3',
	fleshhurt4: './images/sounds/flesh-hurt4.mp3',
	fleshhurt5: './images/sounds/flesh-hurt5.mp3',
	fleshhurt6: './images/sounds/flesh-hurt6.mp3',
	flesh: './images/sounds/flesh.mp3?v=2',
	bone: './images/sounds/bone.mp3',
	pot: './images/sounds/pot.mp3',
	aura: './images/sounds/aura.mp3',
	iron: './images/sounds/iron.mp3',
	spearhurt: './images/sounds/spear-hurt.mp3',
	speardead: './images/sounds/spear-dead.mp3?x=3',
	kingattack: './images/sounds/king-attack.mp3',
	kingcharge: './images/sounds/king-charge2.mp3',
	rockfallsmall: './images/sounds/rock-fall-small.mp3',
	weaponfound: './images/sounds/weapon-found.mp3',
	weaponswing: './images/sounds/item-swing.mp3',
	treasure: './images/sounds/treasure.mp3',
	go: './images/sounds/go-beep.mp3',
	greenarrow: './images/sounds/greenarrow.mp3',
	marksmandead: './images/sounds/marksman-dead.mp3',
	minebomb: './images/sounds/minebomb.mp3',
	timebomb: './images/sounds/timebomb.mp3',
	bombplant: './images/sounds/bomb-plant.mp3',
	bomberdrop: './images/sounds/bomber-drop.mp3',
	bomberexplode: './images/sounds/bomber-explode.mp3',
	bomberdead: './images/sounds/bomber-dead.mp3',
	bomberhurt2: './images/sounds/bomber-hurt2.mp3',
	bomberhurt1: './images/sounds/bomber-hurt1.mp3',
	womanhurt2: './images/sounds/woman-hurt2.mp3',
	womanhurt3: './images/sounds/woman-hurt3.mp3',
	womanhurt4: './images/sounds/woman-hurt4.mp3',
	story: './images/sounds/story.mp3',
	buff: './images/sounds/buff.wav',
	woodhit: './images/sounds/woodhit.wav',
	riderhurt: './images/sounds/rider-hurt.mp3',
	ridercharge: './images/sounds/rider-charge.mp3',
	riderdead: './images/sounds/rider-dead.mp3',
	riderattack: './images/sounds/rider-attack.mp3',
	riderground1: './images/sounds/rider-ground1.mp3',
	goblintentdead: './images/sounds/goblintent-dead.mp3',
	goblinrogueattack: './images/sounds/goblinrogue-attack.mp3',
	goblinrogueground1: './images/sounds/goblinrogue-ground1.mp3',
	clock: './images/sounds/clock.mp3?x=3',
	flyhit: './images/sounds/flyhit.mp3',
	goblinfly: './images/sounds/goblin-fly.mp3?x=5',
	giantrun: './images/sounds/giant-run.mp3',
	giantrun1: './images/sounds/giant-run1.mp3',
	giantrun2: './images/sounds/giant-run2.mp3',
	sistersenter: './images/sounds/sisters-enter.mp3',
	cyclopsbefore: './images/sounds/cyclops-before.mp3',
	cyclopsweapondrop: './images/sounds/cyclops-weapon-drop.mp3',
	cyclopsheadground: './images/sounds/cyclops-head-ground.mp3',
	cyclopsshout: './images/sounds/cyclops-shout.mp3',
	cyclopsultimate: './images/sounds/cyclops-ultimate.mp3',
	cyclopshead: './images/sounds/cyclops-head.mp3',
	cyclopsfall: './images/sounds/cyclops-fall.mp3',
	cyclopslasershow: './images/sounds/cyclops-lasershow.mp3',
	cyclopslaser: './images/sounds/cyclops-laser-fast.mp3',
	cyclopsair1: './images/sounds/cyclops-air1.mp3',
	cyclopsattack1: './images/sounds/cyclops-attack2.mp3',
	cyclopsground1: './images/sounds/cyclops-ground1.mp3',
	cyclopsground2: './images/sounds/cyclops-ground2.mp3',
	cyclopsdead: './images/sounds/cyclops-dead.mp3?x=2',
	cyclopshurt1: './images/sounds/cyclops-hurt1.mp3',
	cyclopshurt2: './images/sounds/cyclops-hurt2.mp3',
	cyclopsattack3: './images/sounds/cyclops-attack3.mp3',
	forgestart: './images/sounds/forge-start.mp3?x=1',
	forgeready: './images/sounds/forge-ready.mp3',
	vomitterattack: './images/sounds/vomitter-attack.mp3',
	vomitterdead: './images/sounds/vomitter-dead.mp3',
	vomitterhurt: './images/sounds/vomitter-hurt.mp3',
	poisonpuff: './images/sounds/hisss.mp3',
	//poisonpuff: './images/sounds/poisonpuff.mp3',
	sell: './images/sounds/sell.mp3',
	chestreward: './images/sounds/chest-reward.mp3',
	disabled: './images/sounds/disabled.mp3',
	flames: './images/sounds/flames.wav',
	reward: './images/sounds/coin.mp3',
	rock: './images/sounds/rock.mp3',
	taktak: './images/sounds/taktak.mp3',
	clap: './images/sounds/clap.mp3',
	debuff: './images/sounds/debuff.mp3',
	cs001001: './images/sounds/cs1-1.mp3',
	lavabubble: './images/sounds/eruption.wav',
	finishswordground: './images/sounds/finish-sword-ground.mp3',
	barrelhurt: './images/sounds/barrel-hurt.mp3',
	heartfinish: './images/sounds/heartfinish.mp3',
	skin: './images/sounds/skin.mp3',
	crate: './images/sounds/crate.mp3',
	crush: './images/sounds/crush.wav',
	flap: './images/sounds/flap.mp3',
	crow: './images/sounds/crow.mp3',
	gift: './images/sounds/gift.wav',
	spinner: './images/sounds/spinner.mp3',
	wagonphase: './images/sounds/wagon-phase.mp3',
	wagondead: './images/sounds/wagon-dead.mp3',
	wagonhurt1: './images/sounds/wagon-hurt1.mp3',
	wagonhurt2: './images/sounds/wagon-hurt2.mp3',
	wagonhurt3: './images/sounds/wagon-hurt3.mp3',
	wagonhurt4: './images/sounds/wagon-hurt4.mp3',
	wagonhurt5: './images/sounds/wagon-hurt5.mp3',
	wagonhurt6: './images/sounds/wagon-hurt6.mp3',
	whisper: './images/sounds/whisper.mp3',
	victory: './images/sounds/victory.wav',
	defeat: './images/sounds/loose.mp3',
	koboldground1: './images/sounds/kobold-ground1.mp3',
	koboldground2: './images/sounds/kobold-ground2.mp3',
	koboldhurt: './images/sounds/kobold-hurt.mp3',
	kobolddead: './images/sounds/kobold-dead.mp3',
	ravensflap: './images/sounds/ravens.wav',
	roots: './images/sounds/roots.mp3',
	rocks: './images/sounds/rocks.mp3',
	item: './images/sounds/item.mp3',
	count: './images/sounds/count.mp3',
	click: './images/sounds/click.mp3',
	switch: './images/sounds/click2.mp3',
	wear: './images/sounds/wear.mp3',
	boomerang: './images/sounds/boomerang.mp3',
	eagle: './images/sounds/eagle.mp3',
	mountstart: './images/sounds/mount-start.mp3',
	mountdead: './images/sounds/mountdead.mp3',
	handwoosh: './images/sounds/hand-woosh.mp3',
	egghurt: './images/sounds/egg-hurt.mp3',
	cavalierdead: './images/sounds/cavalier-dead.mp3',
	cavalierhurt: './images/sounds/cavalier-hurt.wav',
	cavalierground1: './images/sounds/cavalier-ground1.mp3',
	cavalierattack: './images/sounds/cavalier-attack.mp3',
	tughurt: './images/sounds/tughurt.mp3',
	tugarrow: './images/sounds/tugarrow.mp3',
	fireball: './images/sounds/fireball.mp3',
	impact: './images/sounds/impact.mp3',
	swing: './images/sounds/swing.mp3',
	ultimate: './images/sounds/ultimate.mp3',
	claw2: './images/sounds/claw2.mp3',
	claw: './images/sounds/claw.mp3',
	poisoncloud: './images/sounds/poisoncloud.mp3',
	slimerelease: './images/sounds/slime-release.mp3',
	slimeattack: './images/sounds/slime-attack.wav',
	shamantag: './images/sounds/shaman-tag.mp3?x=2',
	shamandead: './images/sounds/shaman-dead.mp3',
	shamanair2: './images/sounds/shaman-air2.mp3',
	shamanlaugh: './images/sounds/shaman-laugh.mp3',
	shamanwalk: './images/sounds/shaman-walk.mp3',
	shamanfire: './images/sounds/shaman-fire.mp3',
	shamanhurt: './images/sounds/shaman-hurt.mp3',
	shamanhurt2: './images/sounds/shaman-hurt2.mp3',
	shamanhurt5: './images/sounds/shaman-hurt5.mp3',
	shamanhurt6: './images/sounds/shaman-hurt6.mp3',
	shamanhurt7: './images/sounds/shaman-hurt7.mp3',
	shamanhurtv31: './images/sounds/shamanhurtv31.mp3',
	shamanhurtv32: './images/sounds/shamanhurtv32.mp3',
	shamanhurtv33: './images/sounds/shamanhurtv33.mp3',
	shamanhurtv34: './images/sounds/shamanhurtv34.mp3',
	shamanhurtv35: './images/sounds/shamanhurtv35.mp3',
	shamanhurtv36: './images/sounds/shamanhurtv36.mp3',
	shamanrelease: './images/sounds/shaman-release.mp3',
	shamanulti: './images/sounds/shamanulti.mp3',
	slimehurt: './images/sounds/slime-hurt.mp3',
	slimedead: './images/sounds/slime-dead.mp3',
	firespray: './images/sounds/firespray.wav',
	dummyrelease: './images/sounds/dummy-release.mp3',
	dummyattack: './images/sounds/dummy-attack.mp3',
	dummyhurt: './images/sounds/dummy-hurt.mp3',
	ballthrow: './images/sounds/ball-swoosh.mp3',
	ballhit: './images/sounds/ball-hit.mp3',
	wolfhurt1: './images/sounds/wolfhurt1.mp3',
	wolfhurt2: './images/sounds/wolfhurt2.mp3',
	wolfhurt3: './images/sounds/wolfhurt3.mp3',
	werewolfcounter: './images/sounds/werewolf-counter.mp3?v=3',
	werewolfrelease: './images/sounds/werewolf-release.mp3',
	werewolfattack: './images/sounds/werewolf-attack.mp3',
	werewolfhurt: './images/sounds/werewolf-hurt.mp3',
	werewolfranged: './images/sounds/werewolfranged.mp3',
	werewolfdead: './images/sounds/werewolf-dead.wav',
	wolfdead: './images/sounds/wolf-dead.mp3',
	ratdead: './images/sounds/rat-dead.mp3',
	ratattack: './images/sounds/rat-attack.mp3',
	rathurt: './images/sounds/rat-hurt.mp3',
	rathurt2: './images/sounds/rathurt2.mp3',
	rathurt3: './images/sounds/rathurt3.mp3',
	howl: './images/sounds/howl.mp3',
	shield: './images/sounds/shield.mp3',
	reflect: './images/sounds/reflect.mp3',
	notify: './images/sounds/notify.mp3',
	grove: './images/sounds/grove.mp3',
	release: './images/sounds/release.mp3',
	greenwood: './images/sounds/greenwood.mp3',
	lava: './images/sounds/lava.wav',
	desert: './images/sounds/desert.wav',
	snowfootsteps: './images/sounds/snow-footsteps.mp3',
	crabattack: './images/sounds/crab-attack.mp3',
	crabhurt: './images/sounds/crab-hurt.mp3',
	crabdead: './images/sounds/crab-dead.mp3',
	turniphurt: './images/sounds/turnip-hurt.mp3',
	turnipdead: './images/sounds/turnip-dead.mp3',
	turnipattack: './images/sounds/turnip-attack.mp3',
	skeletondead: './images/sounds/seeker-dead.mp3',
	zombiehurt: './images/sounds/zombie-hurt.mp3',
	zombiehurt1: './images/sounds/zombiehurt1.mp3',
	zombiehurt2: './images/sounds/zombiehurt2.mp3',
	zombiehurt3: './images/sounds/zombiehurt3.mp3',
	zombiehurt4: './images/sounds/zombiehurt4.mp3',
	zombiehurt5: './images/sounds/zombiehurt5.mp3',
	zombiedead: './images/sounds/zombie-dead.mp3',
	zombieattack: './images/sounds/zombie-attack.mp3',
	trolldead: './images/sounds/troll-dead.mp3',
	trollhurt1: './images/sounds/troll-hurt1.mp3',
	trollhurt2: './images/sounds/troll-hurt2.mp3',
	trollground2: './images/sounds/troll-ground2.mp3',
	trollattack: './images/sounds/troll-attack.mp3',
	murlockrelease: './images/sounds/murlock-release.mp3',
	murlockhurt: './images/sounds/murlock-hurt.mp3',
	murlockdead: './images/sounds/murlock-dead.mp3',
	murlockattack: './images/sounds/murlock-attack.mp3',
	gnollrelease: './images/sounds/gnoll-release.wav',
	gnollhurt1: './images/sounds/gnollhurt1.mp3',
	gnollhurt2: './images/sounds/gnollhurt2.mp3',
	gnollhurt3: './images/sounds/gnollhurt3.mp3',
	gnollhurt4: './images/sounds/gnollhurt4.mp3',
	gnollhurt5: './images/sounds/gnollhurt5.mp3',
	gnolldead: './images/sounds/gnoll-dead.wav',
	gnollattack: './images/sounds/gnoll-attack.mp3',
	goblinrelease: './images/sounds/goblin-release.mp3',
	goblinattack: './images/sounds/goblin-attack.mp3',
	goblinhurt: './images/sounds/goblin-hurt.mp3',
	goblinhurt1: './images/sounds/goblinhurt1.mp3',
	goblinhurt2: './images/sounds/goblinhurt2.mp3',
	goblinhurt3: './images/sounds/goblinhurt3.mp3',
	goblinhurt4: './images/sounds/goblinhurt4.mp3',
	goblinhurt5: './images/sounds/goblinhurt5.mp3',
	goblinhurt6: './images/sounds/goblinhurt6.mp3',
	goblinhurt7: './images/sounds/goblinhurt7.mp3',
	dinohurt1: './images/sounds/dinohurt1.mp3',
	dinohurt2: './images/sounds/dinohurt2.mp3',
	dinohurt3: './images/sounds/dinohurt3.mp3',
	dinohurt4: './images/sounds/dinohurt4.mp3',
	dinohurt5: './images/sounds/dinohurt5.mp3',
	dinohurt6: './images/sounds/dinohurt6.mp3',
	goblindead: './images/sounds/goblin-dead.mp3',
	trouble: './images/sounds/trouble.mp3',
	puff: './images/sounds/puff.mp3',
	puff2: './images/sounds/puff2.mp3',
	puff3: './images/sounds/puff3.mp3',
	puff4: './images/sounds/puff4.mp3',
	puff5: './images/sounds/puff5.wav',
	batrun: './images/sounds/bat-run.mp3',
	bathurt: './images/sounds/bat-hurt.mp3',
	bathurt2: './images/sounds/bat-hurt2.mp3',
	bathurt3: './images/sounds/bat-hurt3.mp3',
	batground1: './images/sounds/bat-ground1.mp3',
	batdead: './images/sounds/bat-dead.mp3?x=2',
	insectcharge: './images/sounds/insect-charge.mp3',
	medusabubble: './images/sounds/medusa-bubble.mp3',
	medusarelease: './images/sounds/medusa-release.wav',
	medusaground1: './images/sounds/medusa-ground1.mp3',
	medusahurt: './images/sounds/medusa-hurt.mp3',
	rocksmash: './images/sounds/rock-smash.mp3',
	rockfall: './images/sounds/rock-fall.mp3',
	creaturerelease: './images/sounds/creature-release.mp3',
	creatureattack: './images/sounds/creature-attack.mp3',
	creaturedead: './images/sounds/creature-dead.mp3',
	creatureground1: './images/sounds/creature-ground1.mp3',
	creatureground2: './images/sounds/creature-ground2.mp3',
	creaturehurt: './images/sounds/creature-hurt.mp3',
	dungeon: './images/sounds/dungeon.mp3?x=2',
	femalelaugh: './images/sounds/female-laugh.mp3',
	femalepain: './images/sounds/female-pain.mp3?x=2',
	malelaugh: './images/sounds/male-laugh.mp3',
	beep: './images/sounds/beep.mp3',
	//cave: './images/sounds/cave.mp3',
	eat: './images/sounds/eat.mp3',
	curse: './images/sounds/curse.mp3',
	alhand: './images/sounds/al-hand.mp3',
	alhit: './images/sounds/al-hit.mp3',
	alhurt1: './images/sounds/alhurt1.mp3',
	alhurt2: './images/sounds/alhurt2.mp3',
	aldeadspeak: './images/sounds/al-dead-speak.mp3',
	alstart: './images/sounds/al-start.mp3',
	alscream: './images/sounds/al-scream.mp3?v=3',
	alwin: './images/sounds/al-win.mp3',
	alground2: './images/sounds/al-ground2.mp3',
	allaugh: './images/sounds/witch-laugh.mp3?v=2',
	batsattack: './images/sounds/bats-attack.mp3',
	gearultimates: './images/sounds/gear-ultimate.wav',
	tesla: './images/sounds/tesla.wav',
	upgrade: './images/sounds/upgrade.wav',
	batflap: './images/sounds/batflap.wav',
	lock: './images/sounds/lock.mp3',
	coin: './images/sounds/coin.wav',
	smokebomb: './images/sounds/smoke-bomb.mp3?x=2',
	page: './images/sounds/page.mp3',
	flag: './images/sounds/flag.mp3',
	cemetery: './images/sounds/cemetery.mp3',
	// insectdead: './images/sounds/insect-dead.mp3',
	// insectground1: './images/sounds/insect-ground1.wav',
	// insectattack: './images/sounds/insect-attack.mp3',
	void: './images/sounds/void.mp3',
	chain: './images/sounds/chain.mp3',
	thiefdefense: './images/sounds/invisibility.mp3',
	throwingstar: './images/sounds/throwing-star.mp3?v=2',
	airblock: './images/sounds/block.mp3',
	skeletonblock: './images/sounds/skeleton-block.mp3',
	skeletonhurt: './images/sounds/skeleton-hurt.mp3',
	skeletonhurt2: './images/sounds/skeleton-hurt2.mp3',
	skeletonhurt3: './images/sounds/skeleton-hurt3.mp3',
	skeletonhurt4: './images/sounds/skeleton-hurt4.mp3',
	skeletonattack: './images/sounds/skeleton-attack.mp3',
	spiderstart: './images/sounds/spider-start.mp3',
	spiderground1: './images/sounds/spider-ground1.mp3',
	spiderattack: './images/sounds/spider-attack.mp3',
	spiderhurt1: './images/sounds/spider-hurt1.mp3',
	spiderhurt2: './images/sounds/spider-hurt2.mp3',
	spiderdead: './images/sounds/spider-dead.mp3',
	arrow: './images/sounds/arrow.mp3?x=3',
	explode: './images/sounds/explode.mp3?x=2',
	firearrow: './images/sounds/fire-arrow.mp3',
	thunderdzzt: './images/sounds/thunder-dzzt.wav?x=2',
	archerselect1: './images/sounds/archer-select1.mp3',
	archerselect2: './images/sounds/archer-select2.mp3?V=2',
	thiefselect1: './images/sounds/thief-select1.wav',
	thiefselect2: './images/sounds/thief-select2.wav',
	werewolfselect1: './images/sounds/werewolf-select1.mp3?x=2',
	werewolfselect2: './images/sounds/werewolf-select2.mp3?x=2',
	cyclopsselect1: './images/sounds/cyclops-select1.mp3',
	cyclopsselect2: './images/sounds/cyclops-select2.mp3',
	thiefslash1: './images/sounds/thief-slash1.mp3',
	thiefslash2: './images/sounds/thief-slash2.mp3',
	thiefslash3: './images/sounds/thief-slash3.mp3',
	knifefall: './images/sounds/knife-fall.mp3',
	archerhug: './images/sounds/archer-hug.wav?x=3',
	archerdead: './images/sounds/archer-death.wav',
	thiefdead: './images/sounds/thief-dead.wav',
	thiefhurt1: './images/sounds/thief-hurt1.wav',
	thiefhurt2: './images/sounds/thief-hurt2.wav',
	archerhurt1: './images/sounds/archer-hurt1.wav',
	archerhurt2: './images/sounds/archer-hurt2.wav',
	alkinhurt1: './images/sounds/alkinhurt1.mp3',
	alkinhurt2: './images/sounds/alkinhurt2.mp3',
	alkinhurt3: './images/sounds/alkinhurt3.mp3',
	karayelhurt1: './images/sounds/karayelhurt1.mp3',
	karayelhurt2: './images/sounds/karayelhurt2.mp3',
	karayelhurt3: './images/sounds/karayelhurt3.mp3',
	karayelhurt4: './images/sounds/karayelhurt4.mp3',
	karayelhurt5: './images/sounds/karayelhurt5.mp3',
	mushroomattack: './images/sounds/mushroom-attack.wav',
	snakeattack: './images/sounds/snake-attack.mp3',
	icespike: './images/sounds/icespike.mp3',
	icecrack: './images/sounds/ice-crack.mp3?v=2',
	landing: './images/sounds/landing.mp3',
	headoff: './images/sounds/headoff.mp3',
	wasprun: './images/sounds/wasp-run.wav',
	wasphurt: './images/sounds/wasp-hurt.wav?v=4',
	waspdead: './images/sounds/waspdead.wav',
	rain: './images/sounds/rain.mp3?v=2',
	shockwave: './images/sounds/shockwave.wav',
	inventory: './images/sounds/inventory.mp3',
	bubbles: './images/sounds/bubbles.mp3',
	throw: './images/sounds/throw.mp3',
	drink: './images/sounds/drink.mp3',
	fireexplosion: './images/sounds/fireexplosion.mp3',
	headsmash: './images/sounds/head-smash.mp3',
	lestatthunder: './images/sounds/lestat-thunder.wav',
	lestathowl: './images/sounds/lestat-howl.mp3?v=2',
	lestattransform: './images/sounds/lestat-transform.mp3?v=2',
	warriorblock: './images/sounds/warrior-block.mp3',
	warriorhurtair: './images/sounds/warrior-hurt-air.mp3',
	warriorcounter: './images/sounds/warrior-counter.mp3?v=2',
	lestatbreath: './images/sounds/lestat-breath.mp3?v=2',
	finish3: './images/sounds/finish3.mp3?v=3',
	spin: './images/sounds/spin.mp3',
	thunder: './images/sounds/thunder.mp3',
	thunder4: './images/sounds/thunder4v2.mp3',
	dash: './images/sounds/dash.mp3',
	electric: './images/sounds/electric.mp3',
	roll: './images/sounds/roll.mp3?v=3',
	heartbeat: './images/sounds/heartbeat.mp3',
	villageblacksmith: './images/sounds/village-blacksmith.mp3',
	villagearcher: './images/sounds/village-archer.wav',
	villagewizard: './images/sounds/village-wizard.mp4',
	villagethief: './images/sounds/village-thief.mp3',
	archerdefense: './images/sounds/archerdefense.wav',
	warriorselect1: './images/sounds/warrior-select1.mp3',
	warriorselect2: './images/sounds/warrior-select2.mp3',
	warriorattack: './images/sounds/warrior-attack.mp3',
	warriorattack2: './images/sounds/warrior-attack2.mp3',
	warriorattack3: './images/sounds/warrior-attack3.mp3',
	warriorattack4: './images/sounds/warrior-attack4.mp3',
	warriorattack5: './images/sounds/warrior-attack5.mp3',
	warriorground1: './images/sounds/warrior-ground1.mp3',
	warriorground1modified: './images/sounds/warrior-ground1modified.wav?v=11',
	warriorair1: './images/sounds/warrior-air1.mp3?v=2',
	warriordead: './images/sounds/warrior-dead.mp3?v=2',
	aduketdead: './images/sounds/aduket-dead.mp3',
	warriorhurtground1: './images/sounds/warriorhurt1.mp3',
	warriorhurtground2: './images/sounds/warrior-hurt1.mp3',
	warriorhurtground3: './images/sounds/warriorhurt2.mp3',
	itbarakyell: './images/sounds/itbyell.mp3',
	hyenaground2: './images/sounds/hyena-ground2.mp3',
	hyenahurt1: './images/sounds/hyenahurt1.mp3',
	hyenahurt2: './images/sounds/hyenahurt2.mp3',
	hyenahurt3: './images/sounds/hyenahurt3.mp3',
	hyenahurt4: './images/sounds/hyenahurt4.mp3',
	hyenadead: './images/sounds/hyena-dead.mp3',
	hyenadead2: './images/sounds/hyena-dead2.mp3?v=3',
	teberhurt: './images/sounds/teber-hurt.mp3?v=2',
	teberattack: './images/sounds/teber-attack.mp3?v=2',
	teberdead: './images/sounds/teber-dead.mp3',
	emegenhurt: './images/sounds/emegen-hurt.mp3',
	emegendead: './images/sounds/emegen-dead.mp3',
	emegenspitdead: './images/sounds/emegenspitdead.wav',
	jungle: './images/sounds/jungle.mp3',
	farm: './images/sounds/farm.mp3',
	lush: './images/sounds/lush.mp3',
	lushfootsteps: './images/sounds/lush-footsteps.mp3',
	footsteps: './images/sounds/steps.mp3',
	questaccepted: './images/sounds/quest-accepted.mp3',
	questdone: './images/sounds/quest-done.mp3',
	levelup: './images/sounds/levelup.mp3?v=2',
	loot: './images/sounds/loot.mp3',
	commonloot: './images/sounds/common-loot.mp3',
	charge: './images/sounds/charge.mp3',
	rockdestroy: './images/sounds/rockdestroy.mp3',
	crack: './images/sounds/crack.mp3',
	jump: './images/sounds/jump.mp3',
	push: './images/sounds/push.mp3',
	punch: './images/sounds/punch.mp3',
	bite: './images/sounds/bite.mp3',
	regeneration: './images/sounds/regeneration.mp3?v=2',
	blood: './images/sounds/blood.mp3',
	bloodsplat: './images/sounds/bloodsplat.mp3'
}
function loadSounds() {
	const _mapThemes = mapSprites.map(x => x.theme);
	for (var _key of Object.keys(soundFiles)) {
		if(_mapThemes.indexOf(_key) !== -1)
			continue;
		getSound(soundFiles[_key], _key);
	}
}
function loadSceneSounds() {
	if(!__story)
		return;
	const files = storySoundFiles['st'+__story.id]?.['sc' + __storySceneOrder];
	if(files)
		for (var _key of Object.keys(files))
			getSound(storySoundFiles['st'+__story.id]['sc' + __storySceneOrder][_key], 'st' + __story.id + 'sc' + __storySceneOrder + _key);
}
function loadRelatedImages() {
	for(let _key of Object.keys(relatedObjectImages))
		relatedObjectImages[_key]();
}
function installQuestItem(_npc, _skipMark, _force) {
	if (_npc.questItem === undefined) {
		const _item = __account.questStatus.quest?.loots?.find(x => x.object?.indexOf(_npc.animation?.key ?? _npc.npc) >= 0);
		if (_item && __account.questStatus.state === 'progress' && getRandomValue(1, 100) <= _item.chanceRate)
			_npc.questItem = true;
		else
			_npc.questItem = false;
		if(_force && !_npc.questItem)
			_npc.questItem = true;
		if(!_skipMark && _npc.questItem) {
			_npc.relatedEnemy = episode.installMob(
				{
					id: 9999,
					minX: MathRound(((_npc.width / 2) + _npc.left) / __zoom),
					maxX: MathRound(((_npc.width / 2) + _npc.left) / __zoom),
					zoom: _npc.zoom,
					sight: 0,
					yPosition: function(_e) {
						const _qs = relatedObjects.find(x => x.key === 'questshadow');
						return MathRound(_canvas.height - _npc.top - _npc.height - (MathRound(_qs.zoom * _qs.height * __zoom) / 2));
					},
					count: 1,
					minLevel: 1,
					maxLevel: 1
				}, null, 1);
			if(_npc.zoom)
				_npc.relatedEnemy.animations.idle.frames[0].objects[0].scale = _npc.zoom;
		}
	}
	return _npc.questItem;
}
const __holoMenuItems = [
	{ icon: 'inventory', order:1, subOrder:1, titles: {
		en: 'Inventory',
		tr: 'Envanter'
	}},
	{ icon: 'skill', order:2, subOrder:1, titles: {
		en: 'Skill',
		tr: 'Yetenek'
	}},
	{ icon: 'quest', order:3, subOrder:1, titles: {
		en: 'Story',
		tr: 'Hikaye'
	}},
	{ icon: 'fragment', order:7, subOrder:1, titles: {
		en: 'Fragment',
		tr: 'Parçacık'
	}},
	{ icon: 'artifact', order:1, subOrder:2, titles: {
		en: 'Artifact',
		tr: 'Tılsım'
	}},
	{ icon: 'talent', order:2, subOrder:2, titles: {
		en: 'Talent',
		tr: 'Beceri'
	}},
	{ icon: 'achievement',  order:3, subOrder:2, titles: {
		en: 'Event',
		tr: 'Etkinlik'
	}},
	{ icon: 'dungeon', order:6, subOrder:1/*, tabOrder:2*/, titles: {
		en: 'Dungeon',
		tr: 'Zindan'
	}},
	{ icon: 'pvp', order:5, subOrder:1, titles: {
		en: 'PvP',
		tr: 'PvP'
	}},
	{ icon: 'social', order:4, subOrder:3, titles: {
		en: 'Friend',
		tr: 'Arkadaş'
	}},
	{ icon: 'shop', order:8, subOrder:1, titles: {
		en: 'Shop',
		tr: 'Market'
	}},
	{ icon: 'mailbox', order:4, subOrder:2, titles: {
		en: 'Mailbox',
		tr: 'Posta'
	}},
	{ icon: 'forge', order:5, subOrder:2, titles: {
		en: 'Forge',
		tr: 'Demirci'
	}},
	{ icon: 'lottery', order:8, subOrder:2, titles: {
		en: 'Lottery',
		tr: 'Piyango'
	}},
	{ icon: 'war', order:5, subOrder:3, titles: {
		en: 'War',
		tr: 'Savaş'
	}},
	{ icon: 'calendar', order:8, subOrder:3, titles: {
		en: 'Calendar',
		tr: 'Takvim'
	}},
	{ icon: 'chat', order:4, subOrder:1, titles: {
		en: 'Chat',
		tr: 'Sohbet'
	}},
	{ icon: 'world', order:3, subOrder:3, titles: {
		en: 'Map',
		tr: 'Harita'
	}},
	{ icon: 'settings', order:9, subOrder:1, titles: {
		en: 'Settings',
		tr: 'Ayarlar'
	}},
	{ icon: 'tip', order:9, subOrder:2, titles: {
		en: 'About Us',
		tr: 'Bize Dair'
	}}
];
const mapSprites = [
	{
		id: 0, menu: true, still: true, coords: { left: '20%', top: '60%', title: 'Lobby' },
		theme: __scale >= 2 ? 'lobbymobile' : 'lobby', distance: 1, width: MathFloor(4096 * .48 * __scale), 
		ambiancePath: './images/music/lobby.mp3',
		ambianceVolume: .5,
		mobs: [
			
		],
		objects : [
			{ id: 'ff1', src:'./images/texture/farm-fireflies.gif', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 1100 , bottom: 200} },
		],
		tiles: [
			{ 
				name: 'ground',
				count: 1, 
				height: 2296, 
				zoom: .48 * __scale, 
				rate: 1, 
				width: 4096, 
				bottom: -350 
			}
		],
		ground: { width: 4096, height: 2296, zoom: .48 * __scale }
	},
	{
		id: 1, coords: { left: '20%', top: '60%', title: 'Village' }, 
		ambiancePath: './images/sounds/farm.mp3',
		ambianceVolume: .5,
		theme: 'farm', lobby: true, distance: 1, width: MathFloor(6144 * 1.065),
		mobs: [
			
		],
		objects: [
			
			{ id: 'ff1', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 10, bottom: 20 } },
			{ id: 'ff2', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 1500, bottom: 20 }, delay: 200 },
			{ id: 'ff3', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 3250, bottom: 20 }, delay: 800 },
			{ id: 'ff4', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 4650, bottom: 20 }, delay: 800 },
			{ id: 'banner2', totalFrames: 6, speed: 10, key: 'banner2', width: 170, height: 519, zoom: 1.1, locate: { left: 86, bottom: 5 }, wait: 10 },
			{ id: 'board', topGap: 100, npc: true, width: 100, height: 100, zoom: 1, locate: { left: 1490, bottom: 230 } },
			// {
			// 	id: 'warrior', topGap: 80, frames: [
			// 		{ top: 6, left: 159, width: 116, height: 192, speed: 72 },
			// 		{ top: 6, left: 13, width: 116, height: 192, speed: 116 }
			// 	], when: function (_npc) {
			// 		return mainCharacter.class !== 'warrior' && !_coopMembers.find(x => x.class === 'warrior');
			// 	},
			// 	npc: true, dialogs: [
					
			// 		{ owner: 'warrior', texts: { en: 'How can i help you?', tr: 'Size nasıl yardımcı olabilirim?' } },
			// 	{
			// 		owner: 'main',
			// 		options: [{
			// 			texts: { en: 'Join my squad', tr: 'Ekibime katıl' }, do: "addWarriorCoopCharacter()"
			// 		}, {
			// 			texts: { en: 'Forget about it', tr: 'Unut gitsin' },
			// 		}]
			// 	}], width: 116, height: 192,
			// 	zoom: 1.2, locate: { left: 5430, bottom: 0 }
			// },
			// {
			// 	when: function () {
			// 		return __account.questStatus.side.order > 10001;
			// 	},
			// 	id: 'rabbit', frames: [
			// 		{ top: 390, left: 215, width: 104, height: 74, speed: 8 },
			// 		{ top: 390, left: 44 + (171 * 2), width: 104, height: 74, speed: 8 },
			// 		{ top: 390, left: 44 + (171 * 3), width: 104, height: 74, speed: 8 },
			// 		{ top: 390, left: 44 + (171 * 4), width: 104, height: 74, speed: 8 },
			// 		{ top: 390, left: 44 + (171 * 5), width: 104, height: 74, speed: 8 },
			// 		{ top: 486, left: 893, width: 104, height: 74, speed: 8 },
			// 		{ top: 486, left: 720, width: 104, height: 74, speed: 8 },
			// 		{ top: 486, leftGap: 30, left: 546, width: 104, height: 74, speed: 8 },
			// 		{ top: 486, leftGap: 60, left: 365, width: 104, height: 74, speed: 8 },
			// 		{ top: 486, leftGap: 90, left: 202, width: 104, height: 74, speed: 8 },
			// 		{ top: 486, leftGap: 120, left: 29, width: 104, height: 74, speed: 8 },
			// 		{ top: 5, leftGap: 150, left: 889, width: 104, height: 74, speed: 8 },
			// 		{ top: 5, leftGap: 180, left: 714, width: 104, height: 74, speed: 8 },
			// 		{ top: 5, leftGap: 210, left: 545, width: 104, height: 74, speed: 8 },
			// 		{ top: 5, leftGap: 240, left: 381, width: 104, height: 74, speed: 8 },
			// 		{ top: 5, leftGap: 270, left: 207, width: 104, height: 74, speed: 8 },
			// 		{ top: 5, leftGap: 290, left: 37, width: 104, height: 74, speed: 8 },
			// 		{ top: 101, leftGap: 310, left: 34, width: 104, height: 74, speed: 8 },
			// 		{ top: 101, leftGap: 290, left: 208, width: 104, height: 74, speed: 8 },
			// 		{ top: 101, leftGap: 270, left: 382, width: 104, height: 74, speed: 8 },
			// 		{ top: 101, leftGap: 240, left: 558, width: 104, height: 74, speed: 8 },
			// 		{ top: 101, leftGap: 210, left: 731, width: 104, height: 74, speed: 8 },
			// 		{ top: 101, leftGap: 180, left: 894, width: 104, height: 74, speed: 8 },
			// 		{ top: 197, leftGap: 150, left: 37, width: 104, height: 74, speed: 8 },
			// 		{ top: 197, leftGap: 120, left: 37 + 171, width: 104, height: 74, speed: 8 },
			// 		{ top: 197, leftGap: 100, left: 37 + (2 * 171), width: 104, height: 74, speed: 8 },
			// 		{ top: 197, leftGap: 80, left: 37 + (3 * 171), width: 104, height: 74, speed: 8 },
			// 		{ top: 197, leftGap: 60, left: 37 + (4 * 171), width: 104, height: 74, speed: 8 },
			// 		{ top: 197, leftGap: 40, left: 37 + (5 * 171), width: 104, height: 74, speed: 8 },
			// 		{ top: 294, leftGap: 20, left: 40, width: 104, height: 74, speed: 8 },
			// 		{ top: 294, left: 211, width: 104, height: 74, speed: 8 },
			// 		{ top: 294, left: 382, width: 104, height: 74, speed: 8 },
			// 		{ top: 294, left: 553, width: 104, height: 74, speed: 8 },
			// 		{ top: 294, left: 44 + (171 * 4), width: 104, height: 74, speed: 8 },
			// 		{ top: 294, left: 44 + (171 * 5), width: 104, height: 74, speed: 8 },
			// 		{ top: 390, left: 44, width: 104, height: 74, speed: 8 },
			// 	], npc: true, width: 104, maxWidth: 414, height: 74,
			// 	zoom: 1, locate: { left: 800, bottom: -20 }
			// },
			// {
			// 	when: function () {
			// 		return __account.questStatus.side.order > 10002;
			// 	},
			// 	id: 'owl', frames: [
			// 		{ top: 5, left: 0, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 2, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 3, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 4, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 5, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 6, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 7, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 8, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 9, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 10, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 11, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 12, width: 64, height: 112, speed: 72 }
			// 	], npc: true, width: 64, height: 117,
			// 	zoom: .65, locate: { left: 1280, bottom: 218 }
			// },
			// {
			// 	id: 'wizard', topGap: 100, frames: [
			// 		{ top: 0, left: 0, width: 170, height: 169, speed: 16 },
			// 		{ top: 0, left: 170, width: 170, height: 169, speed: 16 },
			// 		{ top: 0, left: 340, width: 170, height: 169, speed: 16 },
			// 		{ top: 0, left: 510, width: 170, height: 169, speed: 16 },
			// 		{ top: 0, left: 680, width: 170, height: 169, speed: 16 }
			// 	],
			// 	npc: true, width: 170, height: 169, zoom: 1,
			// 	locate: { left: 1185, bottom: 0 }
			// },
			// {
			// 	id: 'thief', frames: [
			// 		{ top: 100, left: 45, width: 315, height: 321, speed: 6 },
			// 		{ top: 100, left: 579, width: 315, height: 321, speed: 6 },
			// 		{ top: 100, left: 1096, width: 315, height: 321, speed: 6 },
			// 		{ top: 100, left: 1618, width: 315, height: 321, speed: 6 },
			// 		{ top: 100, left: 2143, width: 315, height: 321, speed: 6 },
			// 		{ top: 100, left: 2673, width: 315, height: 321, speed: 6 },
			// 		{ top: 100, left: 3214, width: 315, height: 321, speed: 6 },
			// 		{ top: 100, left: 3755, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 50, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 596, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 1090, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 1687, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 2175, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 2645, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 3204, width: 315, height: 321, speed: 6 },
			// 		{ top: 634, left: 3757, width: 315, height: 321, speed: 6 },
			// 		{ top: 1161, left: 57, width: 315, height: 321, speed: 6 },
			// 		{ top: 1161, left: 542, width: 315, height: 321, speed: 6 },
			// 		{ top: 1161, left: 1081, width: 315, height: 321, speed: 6 },
			// 		{ top: 1161, left: 1605, width: 315, height: 321, speed: 6 },
			// 		{ top: 1161, left: 2135, width: 315, height: 321, speed: 6 },
			// 		{ top: 1161, left: 2682, width: 315, height: 321, speed: 6, sound: { key: 'villagethief', volume: .5 } },
			// 		{ top: 1161, left: 3221, width: 315, height: 321, speed: 6 },
			// 		{ top: 1161, left: 3765, width: 315, height: 321, speed: 24 },
			// 	],
			// 	when: function (_npc) {
			// 		return mainCharacter.class !== 'thief' && !_coopMembers.find(x => x.class === 'thief');
			// 	},
			// 	npc: true, 
			// 	// dialogs: [
			// 	// 	{ owner: 'thief', texts: { en: 'How can i help you?', tr: 'Size nasıl yardımcı olabilirim?' } },
				
			// 	// 	{
			// 	// 	owner: 'main',
			// 	// 	options: [{
			// 	// 		texts: { en: 'Join my squad', tr: 'Ekibime katıl' }, do: "addThiefCoopCharacter()"
			// 	// 	}, {
			// 	// 		texts: { en: 'Forget about it', tr: 'Unut gitsin' },
			// 	// 	}]
			// 	// }],
			// 	width: 315, height: 321, zoom: .85,
			// 	locate: { left: 2720, bottom: 20 }
			// },
			// {
			// 	id: 'archer', frames: [
			// 		{ top: 0, left: 950, width: 190, height: 260, speed: 32 },
			// 		{ top: 0, left: 760, width: 190, height: 260, speed: 16 },
			// 		{ top: 0, left: 570, width: 190, height: 260, speed: 120 },
			// 		{ top: 0, left: 380, width: 190, height: 260, speed: 8 },
			// 		{
			// 			top: 0, left: 190, width: 190, height: 260, speed: 8,
			// 			sound: {
			// 				key: 'villagearcher',
			// 				volume: 1
			// 			}
			// 		},
			// 		{ top: 0, left: 0, width: 190, height: 260, speed: 8 }
			// 	],
			// 	when: function (_npc) {
			// 		return mainCharacter.class !== 'archer' && !_coopMembers.find(x => x.class === 'archer');
			// 	},
			// 	npc: true, 
			// 	dialogs: [
			// 	{ owner: 'archer', texts: { en: 'How can i help you?', tr: 'Size nasıl yardımcı olabilirim?' } },
			// 	{
			// 		owner: 'main',
			// 		options: [{
			// 			texts: { en: 'Join my squad', tr: 'Ekibime katıl' }, do: "addArcherCoopCharacter()"
			// 		}, {
			// 			texts: { en: 'Forget about it', tr: 'Unut gitsin' },
			// 		}]
			// 	}],
			// 	width: 190, rightGap: -50, topGap: 40, height: 260, zoom: 1.1,
			// 	locate: { left: 4100, bottom: 50 }
			// },
			// {
			// 	id: 'druid', frames: [
			// 		{ top: 0, left: -41, width: 276, height: 438, speed: 72 },
			// 		{ top: 0, left: 315, width: 276, height: 438, speed: 24 },
			// 		{ top: 0, left: 666, width: 276, height: 438, speed: 24 }
			// 	], npc: true, rotate: true,
			// 	width: 276, rightGap: 620, topGap: 180, height: 438, zoom: .5,
			// 	locate: { left: 2000, bottom: 0 }
			// },
			// {
			// 	id: 'tank', frames: [
			// 		{ top: 0, left: 0, width: 205, height: 206, speed: 24 },
			// 		{ top: 0, left: 206, width: 205, height: 206, speed: 24 },
			// 		{ top: 0, left: 412, width: 205, height: 206, speed: 24 },
			// 		{ top: 0, left: 617, width: 205, height: 206, speed: 24 }
			// 	], npc: true, 
			// 	width: 205, topGap: 55, rightGap: 6, height: 206, zoom: 1.3,
			// 	locate: { left: 2300, bottom: 0 }
			// },
			// {
			// 	id: 'blacksmith', frames: [
			// 		{ top: 0, left: 0, width: 500, height: 462, speed: 10 },
			// 		{ top: 0, left: 500, width: 500, height: 462, speed: 10 },
			// 		{ top: 0, left: 1000, width: 500, height: 462, speed: 10 },
			// 		{ top: 0, left: 1500, width: 500, height: 462, speed: 10 },
			// 		{ top: 0, left: 2000, width: 500, height: 462, speed: 12 },
			// 		{ top: 0, left: 2500, width: 500, height: 462, speed: 12 },
			// 		{
			// 			top: 0, left: 3000, width: 500, height: 462, speed: 30,
			// 			sound: {
			// 				key: 'villageblacksmith',
			// 				volume: .1
			// 			}
			// 		}
			// 	], npc: true, width: 500, rightGap: 230, height: 462,
			// 	zoom: .75, locate: { left: 3340, bottom: 15 }
			// },
			// {
			// 	id: 'child', topGap: 80, frames: [
			// 		{ top: 7, left: 33, width: 62, height: 146, speed: 24 },
			// 		{ top: 7, left: 128, width: 62, height: 146, speed: 64 }
			// 	], npc: true, width: 62, height: 146,
			// 	when: function () {
			// 		return __account.questStatus.side.order;
			// 	},
			// 	zoom: 1, locate: { left: 700, bottom: -20 }
			// },
			{ id: 'fly', totalFrames: 2, width: 90, height: 82, zoom: 1, locate: { left: 2510, bottom: 200 } },
			//{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 'lush', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 5700, bottom: -235 } },
			//{ id: 'signvillage', text: 'Swamp', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5730, bottom: -150 } },
			//{ id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 3, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -235 } },
			//{ id: 'signforestwest', text: 'Forest', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 150, bottom: -50 } }
			//{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 3, key: 'portal', npc: true, totalFrames: 7, width: 820, height: 0, zoom: 1, locate: { left: 5950, bottom: -200 } },
		],
		// tiles: [
		// 	{ name : 'bg', count: 128, height: 1080, zoom: 1.065, rate: .85, width: 48, bottom: -350 },
		// 	{ name: 'ground', count: 128, height: 1080, zoom: 1.065, rate: 1, width: 48, bottom: -350 }
		// ],
		tiles: [
			{ name : 'bg', count: 1, height: 1080, zoom: 1.065, rate: .85, width: 6144, bottom: -350 },
			{ name: 'ground', count: 1, height: 1080, zoom: 1.065, rate: 1, width: 6144, bottom: -350 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 1.75 },
		bgAnimations: [],
	},
	{
		id: 3, do:startAutumn, after:stopWeather, repeat:23000, minLevel: 1, itemGrade: 2, coords: { left: '18.5%', top: '76%', title: 'Forest' }, 
		theme: 'jungle', ambianceVolume: .2, distance: 1, width: MathFloor(5888 * 1.065),
		equipmentDropRates: [
			{ key:'helmet', rate: 8 },
			{ key:'bracers', rate: 8 },
			{ key:'belt', rate: 8 },
		],
		mobs: [
			// {
			// 	id: 100,
			// 	minX: 5800,
			// 	maxX: 5800,
			// 	count: 1,
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			// {
			// 	id: 100,
			// 	minX: 240,
			// 	maxX: 240,
			// 	count: 1,
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			//  {
			// 	id: 43,
			// 	minX: 3500,
			// 	maxX: 3600,
			// 	sight: 150,
			// 	count: 1,
			// 	minLevel: 1,
			// 	maxLevel: 1,
			// 	actions: [
			// 		{
			// 			when: function (_e) {
			// 				return __account.questStatus.quest?.key !== 'tulga' ||
			// 				__account.questStatus.state !== 'progress';
			// 			},
			// 			do: function (_e) {
			// 				_e.remove = _e.noLoot = 1;
			// 			}
			// 		}
			// 	]
				
			// },
			// {
			// 	id: 28,
			// 	minX: 500,
			// 	maxX: 3000,
			// 	sight: 150,
			// 	count: 5,
			// 	hp: 100,
			// 	minLevel: 2,
			// 	maxLevel: 3,
			// 	attackAfterHit: true
			// }
		],
		objects: [
			// {
			// 	id: 'rabbit', frames: [
			// 		//{ top: 294, left: 725, width: 104, height: 74, speed: 8 },
			// 		//{ top: 294, left: 896, width: 104, height: 74, speed: 8 },
			// 		{ top: 390, left: 42, width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (1 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (2 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (3 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (4 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (5 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (4 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (3 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (2 * 171), width: 104, height: 74, speed: 12 },
			// 		{ top: 390, left: 42 + (1 * 171), width: 104, height: 74, speed: 12 }
			// 	], npc: true, width: 104, height: 74,
			// 	zoom: 1, locate: { left: 800, bottom: 15 },
			// 	when: function (_npc) {
			// 		if (_npc.rendered)
			// 			return _npc.questItem;
			// 		_npc.rendered = true;
			// 		if (_npc.questItem)
			// 			return true;
			// 		let _show = __account.questStatus.side.quest?.id === 10001 && __account.questStatus.side.state === 'progress';
			// 		if (_show && getRandomValue(1, 100) > __account.questStatus.side.quest.chanceRate)
			// 			_show = false;
			// 		if (_show) {
			// 			_npc.questItem = true;
			// 			_npc.left = getRandomValue(MathRound(episode.width * .1),
			// 				MathRound(episode.width * .9));
			// 		}
			// 		return _show;
			// 	}
			// },
			// {
			// 	id: 'owl', frames: [
			// 		{ top: 5, left: 0, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 2, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 3, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 4, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 5, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 6, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 7, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 8, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 9, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 10, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 11, width: 64, height: 112, speed: 12 },
			// 		{ top: 5, left: 64 * 12, width: 64, height: 112, speed: 72 }
			// 	], npc: true, width: 64, height: 117,
			// 	zoom: .65, locate: { left: 931, bottom: 234 },
			// 	when: function (_npc) {
			// 		if (_npc.rendered)
			// 			return _npc.questItem;
			// 		_npc.rendered = true;
			// 		if (_npc.questItem)
			// 			return true;
			// 		let _show = __account.questStatus.side.quest?.id === 10002 && __account.questStatus.side.state === 'progress';
			// 		if (_show && getRandomValue(1, 100) > __account.questStatus.side.quest.chanceRate)
			// 			_show = false;
			// 		if (_show)
			// 			_npc.questItem = true;
			// 		return _show;
			// 	}
			// },
			// //{ id: 'foreground', key: 'foreground', width: 5888, height: 1080, locate: { left: 0, bottom: -680 }, foreground: true, zoom: 1.1, rate: 1 },
			// { id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 5, key: 'portal', npc: true, totalFrames: 7, width: 820, height: 0, zoom: 1, locate: { left: 5700, bottom: -335 } },
			// // { id: 'signvillage', text: 'Village', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5600, bottom: -380 } },
			// { id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 1, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -335 } },
			// // { id: 'signforestwest', text: 'Forest West', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 225, bottom: -380 } }
		],
		// layers: [
		// 	{ name: 'bg', width: 5888, height: 1080, zoom: 1.1, rate: .5, locate: { left: 0, bottom: -680 } },
		// 	{ name: 'back', width: 5888, height: 1080, zoom: 1.1, rate: .5, locate: { left: 0, bottom: -680 } },
		// ],
		// tiles: [
		// 	{ name : 'back', count: 128, height: 1080, zoom: 1.065, rate: .5, width: 26, bottom: -700 },
		// 	// { name: 'bg1', width: 1536, height: 1080, zoom: 1.065, rate: .85, locate: { left: 0, bottom: -350 } },
		// 	// { name: 'bg2', width: 1536, height: 1080, zoom: 1.065, rate: .85, locate: { left: 1536, bottom: -350 } },
		// 	// { name: 'bg3', width: 1536, height: 1080, zoom: 1.065, rate: .85, locate: { left: 1536 * 2, bottom: -350 } },
		// 	// { name: 'bg4', width: 1536, height: 1080, zoom: 1.065, rate: .85, locate: { left: 1536 *3, bottom: -350 } },
		// 	{ name: 'bg', count: 128, height: 1080, zoom: 1.065, rate: .85, width: 26, bottom: -700 },
		// 	{ name: 'ground', count: 128, height: 1080, zoom: 1.065, rate: 1, width: 46, bottom: -700 },
		// 	{ name: 'foreground', count: 128, foreground: true, height: 1080, zoom: 1.065, width: 46, bottom: -700 }
		// ],
		tiles: [
			{ name: 'bg', count: 1, height: 1080, zoom: 1.6, rate: .85, width: 3357, bottom: -700 },
			{ name: 'back', count: 1, height: 1080, zoom: 1.25, rate: .9, width: 4238, bottom: -700 },
			{ name: 'flare', marginTop: 20, marginLeft: 2944, count: 1, height: 90, zoom: 1, rate: .9, width: 99, bottom: 0 },
			{ name: 'flare2', marginTop: 40, marginLeft: 1060, count: 1, height: 90, zoom: .8, rate: .9, width: 99, bottom: 0 },
			{ name: 'ground', count: 1, height: 1080, zoom: 1.065, rate: 1, width: 5888, bottom: -700 },
			//{ name: 'foreground', count: 1, foreground: true, height: 1080, rate:1.29, zoom: 1.065, width: 5888, bottom: -700 }
		],
		ground: { width: 5888, height: 1080, zoom: 1.065, yRate: 2.5 }
	},
	{
		id: 5, repeat:15000, do:startAutumn2, after:stopWeather, minLevel: 1,
		coords: { left: '33%', top: '22%', title: 'Greenlands' }, 
		theme: 'greenwood', distance: 1, width: MathFloor(6000 * 1.065),
		mobs: [
		],
		objects: [
		],
		tiles: [
			{ name: 'bg', width: 6144, height: 1080, zoom: 1.1, rate: .9, bottom: -400, count:1 },
			{ name: 'ground', width: 6000, height: 1055, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6000, height: 1055, zoom: 1.065, yRate: 2.35 }
	},	
	{
		id: 7, coords: { left: '15%', top: '47%', title: 'Crypt', key: 'ad' }, 
		theme: 'cemetery', distance: 1, width: MathFloor(6144 * 1.065),
		minLevel: 5, itemGrade: 2,
		equipmentDropRates: [
			{ key:'weapon', rate: 8 },
			{ key:'ring', rate: 8 },
			{ key:'boots', rate: 8 },
			{ key:'leggings', rate: 8 }
		],
		mobs: [
			// {
			// 	id: 100,
			// 	minX: 5800 + 256,
			// 	maxX: 5800 + 256,
			// 	count: 1,
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			// {
			// 	id: 100,
			// 	minX: 240,
			// 	maxX: 240,
			// 	count: 1,
			// 	props: {
			// 		reversed: 1
			// 	},
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			// {
			// 	id: 10,
			// 	minX: 4300,
			// 	maxX: 5300,
			// 	sight: 50,
			// 	count: 4,
			// 	minLevel: 6,
			// 	maxLevel: 8,
			// 	spawn: 30,
			// 	groupId: 1
			// },
			// {
			// 	id: 39,
			// 	minX: 4000,
			// 	maxX: 4000,
			// 	sight: 99,
			// 	count: 1,
			// 	yPosition: function () { return MathRound(groundheight * .25) },
			// 	minLevel: 6,
			// 	maxLevel: 8
			// },
			// {
			// 	id: 39,
			// 	minX: 2000,
			// 	maxX: 2000,
			// 	sight: 99,
			// 	count: 1,
			// 	yPosition: function () { return MathRound(groundheight * .75) },
			// 	minLevel: 6,
			// 	maxLevel: 8
			// },
			// {
			// 	id: 24,
			// 	minX: 1000,
			// 	maxX: 5000,
			// 	sight: 500,
			// 	count: 10,
			// 	minLevel: 6,
			// 	maxLevel: 8,
			// 	spawn: 30,
			// 	attackAfterHit: true
			// }
		],
		objects: [
			// {
			// 	id: 'bush4x1', key: 'bush4', npc: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 91, height: 93, locate: { left: 440, bottom: -6 }, zoom: 1, rate: 1
			// },
			// {
			// 	id: 'bush3x1', key: 'bush3', npc: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 101, height: 100, locate: { left: 940, bottom: -6 }, zoom: 1, rate: 1
			// },
			// {
			// 	id: 'bush2x1', key: 'bush7', npc: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 102, height: 112, locate: { left: 2000, bottom: -6 }, zoom: 1, rate: 1
			// },
			// {
			// 	id: 'bush1x1', key: 'bush6', npc: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 106, height: 114, locate: { left: 3000, bottom: -6 }, zoom: 1, rate: 1
			// },
			// {
			// 	id: 'bush5x1', key: 'bush5', npc: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 66, height: 91, locate: { left: 4080, bottom: -6 }, zoom: 1.1, rate: 1
			// },
			// { id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 5, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -235 } },
			// //{ id: 'signforestwest', text: 'Desert', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 250, bottom: -150 } },
			// { id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 9, key: 'portal', npc: true, totalFrames: 7, width: 850, height: 0, zoom: 1, locate: { left: 5950, bottom: -200 } },
			// //{ id: 'signsnowypeaks', text: 'Forest West', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5860, bottom: -115 } }
		],
		tiles: [
			{ name: 'bg', width: 6144, height: 1080, zoom: 1.065, rate: .85, bottom: -400, count:1 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2 }
	},
	{
		id: 9, coords: { left: '27.5%', top: '40.5%', title: 'Crypt', dir: 'North' }, 
		theme: 'cemetery', distance: 1, width: MathFloor(6144 * 1.065),
		minLevel: 6, itemGrade: 3, assetPath: 'cemetery',
		equipmentDropRates: [
			{ key:'helmet', rate: 8 },
			{ key:'bracers', rate: 8 },
			{ key:'belt', rate: 8 },
		],
		mobs: [
			{
				id: 100,
				minX: 5800 + 256,
				maxX: 5800 + 256,
				count: 1,
				yPosition: function() {
					return MathRound((groundheight / 2) * 1.1);
				}
			},
			{
				id: 100,
				minX: 240,
				maxX: 240,
				count: 1,
				props: {
					reversed: 1
				},
				yPosition: function() {
					return MathRound((groundheight / 2) * 1.1);
				}
			},
			{
				id: 30,
				minX: 1000,
				maxX: 5000,
				sight: 50,
				count: 8,
				minLevel: 8,
				maxLevel: 10,
				spawn: 20
			},
			{
				id: 23,
				minX: 1000,
				maxX: 5000,
				sight: 50,
				count: 8,
				minLevel: 8,
				maxLevel: 10,
				spawn: 20
			},
			{
				id: 39,
				minX: 4000,
				maxX: 4000,
				sight: 99,
				count: 1,
				yPosition: function () { return MathRound(groundheight * .25) },
				minLevel: 6,
				maxLevel: 8
			},
			{
				id: 39,
				minX: 2000,
				maxX: 2000,
				sight: 99,
				count: 1,
				yPosition: function () { return MathRound(groundheight * .75) },
				minLevel: 6,
				maxLevel: 8
			}
		],
		objects: [
			{
				id: 'bush4x1', key: 'bush4', npc: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 91, height: 93, locate: { left: 440, bottom: -6 }, zoom: 1, rate: 1
			},
			{
				id: 'bush3x1', key: 'bush3', npc: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 101, height: 100, locate: { left: 940, bottom: -6 }, zoom: 1, rate: 1
			},
			{
				id: 'bush2x1', key: 'bush7', npc: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 102, height: 112, locate: { left: 2000, bottom: -6 }, zoom: 1, rate: 1
			},
			{
				id: 'bush1x1', key: 'bush6', npc: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 106, height: 114, locate: { left: 3000, bottom: -6 }, zoom: 1, rate: 1
			},
			{
				id: 'bush5x1', key: 'bush5', npc: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 66, height: 91, locate: { left: 4080, bottom: -6 }, zoom: 1.1, rate: 1
			},
			{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 7, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -235 } },
			//{ id: 'signforestwest', text: 'Desert', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 250, bottom: -150 } },
			{ id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 11, key: 'portal', npc: true, totalFrames: 7, width: 850, height: 0, zoom: 1, locate: { left: 5950, bottom: -200 } },
			//{ id: 'signsnowypeaks', text: 'Forest West', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5860, bottom: -115 } }
		],
		tiles: [
			{ name: 'bg', width: 6144, height: 1080, zoom: 1.065, rate: .85, bottom: -400, count:1 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2 }
	},
	{
		id: 10, subMap:1, coords: { left: '20%', top: '60%', title: 'Village' }, assetPath: 'farmempty',
		theme: 'farmempty', distance: 1, width: MathFloor(6144 * 1.065),
		mobs: [
		],
		objects: [
			{ theme: 'farm', id: 'ff1', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 10, bottom: 20 } },
			{ theme: 'farm', id: 'ff2', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 1500, bottom: 20 }, delay: 200 },
			{ theme: 'farm', id: 'ff3', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 3250, bottom: 20 }, delay: 800 },
			{ theme: 'farm', id: 'ff4', totalFrames: 2, key: 'fireflies', width: 400, height: 300, zoom: 1.2, locate: { left: 4650, bottom: 20 }, delay: 800 },
			//{ theme: 'farm', id: 'banner2', totalFrames: 6, speed: 10, key: 'banner2', width: 170, height: 519, zoom: 1.1, locate: { left: 86, bottom: 5 }, wait: 10 },
		],
		tiles: [
			{ theme:'farm', name : 'bg', count: 1, height: 1080, zoom: 1.065, rate: .85, width: 6144, bottom: -350 },
			{ name: 'ground', count: 1, height: 1080, zoom: 1.065, rate: 1, width: 6144, bottom: -350 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 1.75 }
	},
	{
		id: 41, minLevel : 1,
		coords: { 
			title: 'Troll Cave',
		 }, theme: 'dungeon1', 
		distance: 1, width: 5888,
		mobs: [
			
		],
		tiles: [
			{ name: 'ground', width: 5888, height: 1080, count:1, bottom: -610, zoom: 1.065, rate: 1 },
			{ name: 'foreground', width: 5888, height: 1080, count:1, bottom: -610, foreground: true, zoom: 1.35, rate: 1 }
		],
		ground: { width: 5888, height: 1080, zoom: 1.065, yRate: 3.2, bottomGap: 120 }
	},
	{
		id: 42, minLevel : 1,
		coords: { 
			title: 'Arena Ground',
		 }, theme: 'arena', 
		distance: 1, width: MathRound(6144 * 1.065),
		playGrounds: [
			{ min_X: 0, max_X:1700, bottom_Gap: 20, round: { rate: .44, dir: __right} },
			{ min_X: MathRound(4544 * 1.065), round: { rate: .44, dir: __left}, max_X:MathRound(6144 * 1.065), bottom_Gap: 20 },
		],
		cliffs: [
			{ minYRate: 85, maxYRate: 100, min_X: MathRound(1850 * 1.065), max_X: MathRound(2700 * 1.065), background: true },
			{ minYRate: 85, maxYRate: 100, min_X: MathRound(3400 * 1.065), max_X: MathRound(4250 * 1.065), background: true },
			{ minYRate: 0, maxYRate: 15, min_X: MathRound(1950 * 1.065), max_X: MathRound(2650 * 1.065), foreground: true },
			{ minYRate: 0, maxYRate: 15, min_X: MathRound(3500 * 1.065), max_X: MathRound(4200 * 1.065), foreground: true }
		],
		mobs: [
			{
				id: 626,
				minX : 560,
				maxX : 560,
				zoom: .75,
				yPosition: function() {
					return groundheight;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .5;
				}
			},
			{
				id: 627,
				minX : 6000,
				maxX : 6000,
				zoom: .75,
				yPosition: function() {
					return groundheight;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .5;
				}
			},
			{
				id: 628,
				minX : 1741,
				maxX : 1741,
				zoom: 1.75,
				yPosition: function() {
					return 0;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .4;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -235);
					_e.animations.idle.foreground = true;
				}
			},
			{
				id: 628,
				minX : 4812,
				maxX : 4812,
				zoom: 1.75,
				yPosition: function() {
					return 0;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .4;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -235);
					_e.animations.idle.foreground = true;
				}
			},
			{
				id: 625,
				minX : 4810,
				maxX : 4810,
				zoom: 1.5,
				yPosition: function() {
					return 0;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .3;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -362);
					_e.animations.idle.foreground = true;
					_e.animations.idle.frames.forEach(x => {
						if(x.objects)
							for(let o of x.objects)
								o.foreground = true;
					});
				}
			},
			{
				id: 629,
				minX : 4848,
				maxX : 4848,
				yPosition: function() {
					return groundheight;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .6;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -155);
				}
			},
			{
				id: 630,
				minX : 4848,
				maxX : 4848,
				zoom: .8,
				yPosition: function() {
					return groundheight;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .5;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -252);
				}
			},
			{
				id: 625,
				minX : 1739,
				maxX : 1739,
				zoom: 1.5,
				yPosition: function() {
					return 0;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .3;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -362);
					_e.animations.idle.foreground = true;
					_e.animations.idle.frames.forEach(x => {
						if(x.objects)
							for(let o of x.objects)
								o.foreground = true;
					});
				}
			},
			{
				id: 629,
				minX : 1703,
				maxX : 1703,
				yPosition: function() {
					return groundheight;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .6;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -155);
				}
			},
			{
				id: 630,
				minX : 1703,
				maxX : 1703,
				zoom: .8,
				yPosition: function() {
					return groundheight;
				},
				do : function(_e) {
					_e.positionable = true;
					_e.drawPriority = .5;
					_e.animations.idle.frames.forEach(x => x.bottomGap = -244);
				}
			},
			// {
			// 	id: 9999,
			// 	minX : 1700,
			// 	maxX : 1700,
			// 	zoom: 1,
			// 	yPosition: function() {
			// 		return 0;
			// 	},
			// 	do : function(_e) {
			// 		_e.animations.idle.frames.forEach(x => {
			// 			x.spriteWidth = 2800;
			// 			x.spriteHeight = 200;
			// 			x.spriteOrigin = 1400;
			// 			delete x.objects;
			// 		});
			// 		_e.yGap = MathRound(200 * __zoom);
			// 		_e.relatedObjects = [];
			// 		_e.solid = true;
			// 		_e.width = 2800;
			// 		_e.height = 200;
			// 		_e.block = 1;
			// 		_e._HURTBOX = {
			// 			w: MathRound(_e.width * _e.getZoom()),
			// 			h: MathRound(_e.height * _e.getZoom())
			// 		};
			// 		if(_e._HURTBOX.w % 2 > 0)
			// 			_e._HURTBOX.w += 1;
			// 		_e.HURTWIDTH = _e._HURTBOX.w;
			// 		_e._HURTBOX_half = MathRound(_e._HURTBOX.w / 2);
			// 		episode.hasSolid = true;
			// 		// _e.drawPriority = .5;
			// 		// _e.animations.idle.frames.forEach(x => x.bottomGap = -244);
			// 	}
			// }
		],
		tiles: [
			{ name: 'bg', width: 6144, height: 1080, count:1, bottom: -610, zoom: 1.065, rate: .85 },
			{ name: 'ground', width: 6144, height: 1080, count:1, bottom: -610, zoom: 1.065, rate: 1 },
			{ name: 'fg', width: 6144, height: 1080, count:1, bottom: -610, foreground: true, zoom: 1.065, rate: 1 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate:3.1, bottomGap: 300 }
	},
	{
		id: 999, still: true, tower: true, minLevel : 1,
		coords: { 
			left: '45%', 
			top: '48%', 
			title: 'Tower',
			key: 'tower'
		 }, theme: 'dungeon1', 
		distance: 1, width: 5888,
		mobs: [
			
		],
		tiles: [
			{ name: 'ground', width: 5888, height: 1080, count:1, bottom: -610, zoom: 1.065, rate: 1 },
			{ name: 'foreground', width: 5888, height: 1080, count:1, bottom: -610, foreground: true, zoom: 1.35, rate: 1 }
		],
		ground: { width: 5888, height: 1080, zoom: 1.065, yRate: 3.2, bottomGap: 120 }
	},
	{
		id: 9999, still: true, minLevel : 1,
		enterDirection: __left, gold: true, characterZoom: 1.4,
		ambiancePath: './images/music/story1-quest10.mp3',
		ambianceVolume: .67,
		coords: { 
			left: '48%', 
			top: '62%', 
			title: 'Gold Hunt',
			key: 'gold'
		 }, theme: 'gold', 
		distance: 1, width: MathFloor(2048 * .96),
		mobs: [
			{
				id: 2000,
				minX: MathFloor(1050 * .96),
				maxX: MathFloor(1050 * .96),
				yPosition: function() {
					return MathRound(groundheight / 4);
				},
				sight: 1,
				count: 1,
				grade: 5,
				name: 'Gold Waggon',
				minLevel: 10,
				maxLevel: 10
			},
			{
				id: 1999,
				minX: MathFloor(1090 * .96),
				maxX: MathFloor(1090 * .96),
				yPosition: function() {
					return MathRound(groundheight / 4);
				},
				sight: 1,
				count: 1,
				minLevel: 1,
				maxLevel: 1
			}
		],
		tiles: [
			{ name: 'bg', width: 2048, height: 1152, zoom: .96, rate: .85, bottom: -400, count:1 },
		],
		ground: { width: 2048, height: 1152, zoom: 1.06, yRate: .9 }
	},
	{
		id: 9998, still: true, minLevel : 1,
		enterDirection: __left, //characterZoom: 1.4,
		//ambiancePath: './images/music/story1-quest10.mp3',
		//ambianceVolume: .67,
		// coords: { 
		// 	left: '48%', 
		// 	top: '62%', 
		// 	title: 'Gold Hunt',
		// 	key: 'gold'
		//  }, 
		 theme: 'gold', 
		distance: 1, width: MathFloor(2048 * .96),
		mobs: [
			// {
			// 	id: 2000,
			// 	minX: MathFloor(1050 * .96),
			// 	maxX: MathFloor(1050 * .96),
			// 	yPosition: function() {
			// 		return MathRound(groundheight / 4);
			// 	},
			// 	sight: 1,
			// 	count: 1,
			// 	grade: 5,
			// 	name: 'Gold Waggon',
			// 	minLevel: 10,
			// 	maxLevel: 10
			// },
			// {
			// 	id: 1999,
			// 	minX: MathFloor(1090 * .96),
			// 	maxX: MathFloor(1090 * .96),
			// 	yPosition: function() {
			// 		return MathRound(groundheight / 4);
			// 	},
			// 	sight: 1,
			// 	count: 1,
			// 	minLevel: 1,
			// 	maxLevel: 1
			// }
		],
		tiles: [
			{ name: 'bg', width: 2048, height: 1152, zoom: .96, rate: .85, bottom: -400, count:1 },
		],
		ground: { width: 2048, height: 1152, zoom: 1.06, yRate: .9 }
	},
	// {
	// 	id: 800, disabled: true, battleGround: true, coords: { left: '4%', top: '22%', title: 'Battleground', icon: 'battleground' }, theme: 'cave', distance: 1, width: 6144,
	// 	mobs: [
	// 		{
	// 			id: 10001,
	// 			minX: 5800,
	// 			maxX: 5800,
	// 			sight: 10000,
	// 			count: 1,
	// 			direction: __left,
	// 			name: 'Player1',
	// 			difficulty: 0,
	// 			minLevel: 10,
	// 			maxLevel: 10,
	// 			yPosition: function () { return MathRound(groundheight / 6); }
	// 		},
	// 		{
	// 			id: 10002,
	// 			minX: 5900,
	// 			maxX: 5900,
	// 			sight: 10000,
	// 			count: 1,
	// 			direction: __left,
	// 			name: 'Player2',
	// 			difficulty: 0,
	// 			minLevel: 10,
	// 			maxLevel: 10,
	// 			yPosition: function () {
	// 				return MathRound(groundheight / 2);
	// 			}
	// 		},
	// 		{
	// 			id: 10003,
	// 			minX: 5800,
	// 			maxX: 5800,
	// 			sight: 10000,
	// 			count: 1,
	// 			direction: __left,
	// 			name: 'Player3',
	// 			difficulty: 0,
	// 			minLevel: 10,
	// 			maxLevel: 10,
	// 			yPosition: function () {
	// 				return MathRound((groundheight / 6) * 5);
	// 			}
	// 		}
	// 	],
	// 	// objects: [
	// 	// 	{ id: 'void1', glow: { rate: 10, widthRate: 10, top: -200 }, npc: true, key: 'void', totalFrames: 2, width: 30, height: 30, zoom: 1, locate: { left: 3000, bottom: 100 } },
	// 	// 	{ id: 'void2', glow: { rate: 11, widthRate: 11, top: -205 }, npc: true, key: 'void', totalFrames: 2, width: 30, height: 30, zoom: 1, locate: { left: 4630, bottom: 100 } }
	// 	// ],
	// 	tiles: [
	// 		{ name: 'bg', count:1, width: 6144, height: 1080, zoom: 1.07, rate: .5, count:1, bottom: -440 },
	// 		{ name: 'ground', width: 6144, height: 1080, zoom: 1.07, rate: 1, bottom: -400, count:1 },
	// 		{ name: 'foreground', count:1, width: 6144, height: 1080, bottom:-416, foreground: true, zoom: 1, rate: 1 },
	// 	],
	// 	ground: { width: 6144, height: 1080, zoom: 1.07, yRate: 2.2 }
	// },
	// {
	// 	id: 9, coords: { left: '19%', top: '28%', title: 'Cemetery ' }, 
	// 	theme: 'cemetery', distance: 1, width: MathFloor(6144 * 1.065),
	// 	minLevel: 8, itemGrade: 2,
	// 	equipmentDropRates: [
	// 		{ key:'necklace', rate: 8 },
	// 		{ key:'chest', rate: 8 },
	// 		{ key:'gloves', rate: 8 }
	// 	],
	// 	mobs: [
	// 		{
	// 			id: 30,
	// 			minX: 1000,
	// 			maxX: 2000,
	// 			sight: 50,
	// 			count: 3,
	// 			minLevel: 6,
	// 			maxLevel: 8,
	// 			groupId: 1
	// 		},
	// 		{
	// 			id: 39,
	// 			minX: 2000,
	// 			maxX: 2000,
	// 			sight: 99,
	// 			count: 1,
	// 			yPosition: function () { return MathRound(groundheight * .25) },
	// 			minLevel: 6,
	// 			maxLevel: 8
	// 		},
	// 		{
	// 			id: 39,
	// 			minX: 4000,
	// 			maxX: 4000,
	// 			sight: 99,
	// 			count: 1,
	// 			yPosition: function () { return MathRound(groundheight * .75) },
	// 			minLevel: 6,
	// 			maxLevel: 8
	// 		},
	// 		{
	// 			id: 23,
	// 			minX: 2000,
	// 			maxX: 3000,
	// 			sight: 500,
	// 			count: 3,
	// 			minLevel: 6,
	// 			maxLevel: 8,
	// 			groupId: 1,
	// 			attackAfterHit: true
	// 		},
	// 		{
	// 			id: 24,
	// 			minX: 1000,
	// 			maxX: 5000,
	// 			sight: 500,
	// 			count: 6,
	// 			minLevel: 6,
	// 			maxLevel: 8,
	// 			attackAfterHit: true
	// 		}
	// 	],
	// 	objects: [
	// 		{
	// 			id: 'bush4x1', key: 'bush4', npc: true, when: function (_npc) {
	// 				return installQuestItem(_npc);
	// 			}, width: 91, height: 93, locate: { left: 440, bottom: -6 }, zoom: 1, rate: 1
	// 		},
	// 		{
	// 			id: 'bush3x1', key: 'bush3', npc: true, when: function (_npc) {
	// 				return installQuestItem(_npc);
	// 			}, width: 101, height: 100, locate: { left: 940, bottom: -6 }, zoom: 1, rate: 1
	// 		},
	// 		{
	// 			id: 'bush2x1', key: 'bush7', npc: true, when: function (_npc) {
	// 				return installQuestItem(_npc);
	// 			}, width: 102, height: 112, locate: { left: 2000, bottom: -6 }, zoom: 1, rate: 1
	// 		},
	// 		{
	// 			id: 'bush1x1', key: 'bush6', npc: true, when: function (_npc) {
	// 				return installQuestItem(_npc);
	// 			}, width: 106, height: 114, locate: { left: 3000, bottom: -6 }, zoom: 1, rate: 1
	// 		},
	// 		{
	// 			id: 'bush5x1', key: 'bush5', npc: true, when: function (_npc) {
	// 				return installQuestItem(_npc);
	// 			}, width: 66, height: 91, locate: { left: 4080, bottom: -6 }, zoom: 1.1, rate: 1
	// 		},
	// 		{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 'desert', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 215, bottom: -235 } },
	// 		{ id: 'signforestwest', text: 'Desert', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 250, bottom: -150 } },
	// 		{ id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 'jungle2', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 5850, bottom: -200 } },
	// 		{ id: 'signsnowypeaks', text: 'Forest West', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5860, bottom: -115 } }
	// 	],
	// 	tiles: [
	// 		{ name: 'bg', width: 6144, height: 1080, zoom: 1.065, rate: .85, bottom: -400, count:1 },
	// 		{ name: 'ground', width: 6144, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
	// 	],
	// 	ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2 }
	// },
	{
		id: 499, disabled: true, pvp: true, coords: { left: '5%', top: '40%', title: 'Arena', icon: 'battleground' }, 
		theme: __scale >= 2 ? 'cavemobile' : 'cave', distance: 1, width: MathFloor(6144 * 1.06),
		mobs: [
			
		],
		objects: [
			// { id: 'void1', glow: { rate: 10, widthRate: 10, top: -200 }, npc: true, key: 'void', totalFrames: 2, width: 30, height: 30, zoom: 1, locate: { left: 3000, bottom: 100 } },
			// { id: 'void2', glow: { rate: 11, widthRate: 11, top: -205 }, npc: true, key: 'void', totalFrames: 2, width: 30, height: 30, zoom: 1, locate: { left: 4630, bottom: 100 } }
		],
		tiles: [
			{ name: 'bg', count:1, width: 6144, height: 1080, zoom: 1.06 * __scale, rate: .5, count:1, bottom: -440 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.06 * __scale, rate: 1, bottom: -400, count:1 },
			{ name: 'foreground', count:1, width: 6144, height: 1080, bottom:-416, foreground: true, zoom: 1 * __scale, rate: 1 },
		],
		ground: { width: 6144, height: 1080, zoom: 1.06 * __scale, yRate: 2.2 }
	},
	{
		id: 500, disabled: true, pvp: true, coords: { left: '5%', top: '40%', title: 'Arena', icon: 'battleground' }, theme: 'cave', distance: 1, 
			width: 6144 * 1.06,
		mobs: [
			
		],
		objects: [
			// { id: 'void1', glow: { rate: 10, widthRate: 10, top: -200 }, npc: true, key: 'void', totalFrames: 2, width: 30, height: 30, zoom: 1, locate: { left: 3000, bottom: 100 } },
			// { id: 'void2', glow: { rate: 11, widthRate: 11, top: -205 }, npc: true, key: 'void', totalFrames: 2, width: 30, height: 30, zoom: 1, locate: { left: 4630, bottom: 100 } }
		],
		tiles: [
			{ name: 'bg', count:1, width: 6144, height: 1080, zoom: 1.06 * __scale, rate: .5, count:1, bottom: -440 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.06 * __scale, rate: 1, bottom: -400, count:1 },
			{ name: 'foreground', count:1, width: 6144, height: 1080, bottom:-416, foreground: true, zoom: 1, rate: 1 },
		],
		ground: { width: 6144, height: 1080, zoom: 1.06 * __scale, yRate: 2.2 }
	},
	{
		id: 11, ambianceVolume: .3, coords: { left: '16%', top: '32%', title: 'Swamp' }, 
		theme: 'lush', distance: 1, width: MathFloor(6144 * 1.065),
		minLevel: 1, 
		// itemGrade: 3,
		// equipmentDropRates: [
		// 	{ key:'necklace', rate: 8 },
		// 	{ key:'chest', rate: 8 },
		// 	{ key:'gloves', rate: 8 }
		// ],
		mobs: [
			// {
			// 	id: 100,
			// 	minX: 5800 + 256,
			// 	maxX: 5800 + 256,
			// 	count: 1,
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			// {
			// 	id: 100,
			// 	minX: 240,
			// 	maxX: 240,
			// 	count: 1,
			// 	props: {
			// 		reversed: 1
			// 	},
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			// {
			// 	id: 2,
			// 	minX: 750,
			// 	maxX: 4750,
			// 	sight: 50,
			// 	count: 5,
			// 	minLevel: 10,
			// 	maxLevel: 11
			// },
			// {
			// 	id: 33,
			// 	minX: 3000,
			// 	maxX: 4000,
			// 	sight: 50,
			// 	count: 2,
			// 	minLevel: 10,
			// 	maxLevel: 11
			// },
			// {
			// 	id: 33,
			// 	minX: 2000,
			// 	maxX: 3000,
			// 	sight: 50,
			// 	count: 2,
			// 	minLevel: 10,
			// 	maxLevel: 11
			// },
			// {
			// 	id: 33,
			// 	minX: 1000,
			// 	maxX: 2000,
			// 	sight: 50,
			// 	count: 1,
			// 	minLevel: 10,
			// 	maxLevel: 11
			// },
			// {
			// 	id: 42,
			// 	minX: 500,
			// 	maxX: 5500,
			// 	sight: 150,
			// 	count: 6,
			// 	minLevel: 10,
			// 	maxLevel: 10,
			// 	actions: [
			// 		{
			// 			when: function (_e) {
			// 				return __account.questStatus.quest?.key !== 'wolf' ||
			// 				__account.questStatus.state !== 'progress';
			// 			},
			// 			do: function (_e) {
			// 				_e.remove = _e.noLoot = 1;
			// 			}
			// 		}
			// 	]
			// },
		],
		objects: [
			{ id: 'ripplex1', key: 'ripple', totalFrames: 4, width: 260, height: 145, zoom: .41 * 2, locate: { left: 2480, bottom: 0 } },
			{ id: 'ripplex2', key: 'ripple', totalFrames: 4, width: 260, height: 145, zoom: .36 * 2, locate: { left: 1920, bottom: 35}, rotate: true },
			{ id: 'ripplex3', key: 'ripple', totalFrames: 4, width: 260, height: 145, zoom: .41 * 2, locate: { left: 4270, bottom: 80 } },
			{ id: 'waterfall3', key: 'waterfall3', totalFrames: 6, width: 1136, height: 547, zoom: 1.07, locate: { left: 2812, bottom: 168 } },
			
			//{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 9, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -235 } },
			//{ id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 13, key: 'portal', npc: true, totalFrames: 7, width: 850, height: 0, zoom: 1, locate: { left: 5950, bottom: -200 } },
		],
		tiles: [
			{ name : 'bg', count: 1, height: 1080, zoom: 1.065, rate: .85, width: 6144, bottom: -400 },
			{ name: 'ground', count: 1, height: 1080, zoom: 1.065, rate: 1, width: 6144, bottom: -400 },
			// { name: 'fog', count: 7, height: 540, zoom: 1, rate: 1.1, foreground: true, width: 960, 
			// 	bottom: -400, marginTop: 400 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2 }
	},
	{
		id: 13, ambianceVolume: .3, 
		coords: {  left: '21%', top: '21%', title: 'Swamp', dir: 'North' }, 
		theme: __scale >= 2 ? 'lushmobile' : 'lush', distance: 1, width: MathFloor(6144 * 1.06),
		minLevel: 8, itemGrade: 3,
		equipmentDropRates: [
			{ key:'weapon', rate: 8 },
			{ key:'ring', rate: 8 },
			{ key:'boots', rate: 8 },
			{ key:'leggings', rate: 8 }
		],
		mobs: [
			// {
			// 	id: 100,
			// 	minX: 5800 + 256,
			// 	maxX: 5800 + 256,
			// 	count: 1,
			// 	props: {
			// 	},
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			// {
			// 	id: 100,
			// 	minX: 240,
			// 	maxX: 240,
			// 	count: 1,
			// 	props: {
			// 		reversed: 1
			// 	},
			// 	yPosition: function() {
			// 		return MathRound((groundheight / 2) * 1.1);
			// 	}
			// },
			// {
			// 	id: 7,
			// 	minX: 1500,
			// 	maxX: 5000,
			// 	sight: 150,
			// 	count: 10,
			// 	minLevel: 11,
			// 	maxLevel: 12,
			// 	actions: [
			// 		{
			// 			when: function (_e) {
			// 				return __account.questStatus.quest?.key === 'shaman';
			// 			},
			// 			do: function (_e) {
			// 				_e.remove = _e.noLoot = 1;
			// 			}
			// 		}
			// 	]
			// },
			// {
			// 	id: 35,
			// 	minX: 1500,
			// 	maxX: 3500,
			// 	sight: 150,
			// 	count: 4,
			// 	minLevel: 11,
			// 	maxLevel: 12,
			// 	actions: [
			// 		{
			// 			when: function (_e) {
			// 				return __account.questStatus.quest?.key === 'shaman';
			// 			},
			// 			do: function (_e) {
			// 				_e.remove = _e.noLoot = 1;
			// 			}
			// 		}
			// 	]
			// },
			// {
			// 	id: 37,
			// 	minX: 4000,
			// 	maxX: 4500,
			// 	sight: 150,
			// 	count: 1,
			// 	name: 'Malvera',
			// 	minLevel: 15,
			// 	maxLevel: 15,
			// 	difficulty: 1,
			// 	grade: 3,
			// 	actions: [
			// 		{
			// 			when: function (_e) {
			// 				return __account.questStatus.quest?.key !== 'shaman';
			// 			},
			// 			do: function (_e) {
			// 				_e.remove = _e.noLoot = 1;
			// 			}
			// 		}
			// 	]
			// },
			// {
			// 	id: 38,
			// 	minX: 4000,
			// 	maxX: 4500,
			// 	sight: 150,
			// 	count: 1,
			// 	name: 'Noctara',
			// 	minLevel: 15,
			// 	maxLevel: 15,
			// 	difficulty: 1,
			// 	grade: 3,
			// 	actions: [
			// 		{
			// 			when: function (_e) {
			// 				return __account.questStatus.quest?.key !== 'shaman';
			// 			},
			// 			do: function (_e) {
			// 				_e.remove = _e.noLoot = 1;
			// 			}
			// 		}
			// 	]
			// }
		],
		objects: [
			{ id: 'ripple', totalFrames: 4, width: 260, height: 145, zoom: .4, locate: { left: 2480 * __scale, bottom: 0 } },
			{ id: 'ripple', totalFrames: 4, width: 260, height: 145, zoom: .35, locate: { left: 1920 * __scale, bottom: 35 * __scale }, rotate: true },
			{ id: 'ripple', totalFrames: 4, width: 260, height: 145, zoom: .4, locate: { left: 4270 * __scale, bottom: 80 * __scale } },
			{ id: 'waterfall', totalFrames: 6, width: 1136, height: 547, zoom: 1.06, locate: { left: 2700 * __scale, bottom: 180 * __scale } },

			//{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 11, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -235 } },
			//{ id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 15, key: 'portal', npc: true, totalFrames: 7, width: 850, height: 0, zoom: 1, locate: { left: 5950, bottom: -200 } },
		],
		tiles: [
			{ name : 'bg', count: 1, height: 1080, zoom: 1.06 * __scale, rate: .85, width: 6144, bottom: -400 },
			{ name: 'ground', count: 1, height: 1080, zoom: 1.06 * __scale, rate: 1, width: 6144, bottom: -400 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.06 * __scale, yRate: 2 }
	},
	{
		id: 21, disabled: true, ambianceVolume: 1, coords: { left: '38%', top: '16%', title: 'Desert' }, theme: 'desert', distance: 1, width: MathFloor(5886 * 1.065),
		background: { width: 1964, height: 1080, key: 'bg' },
		minLevel: 10, itemGrade: 1,
		equipmentDropRates: [
			{ key:'helmet', rate: 10 },
			{ key:'belt', rate: 5 },
			{ key:'boots', rate: 2 },
		],
		mobs: [
			{
				id: 20,
				minX: 1000,
				maxX: 3000,
				sight: 50,
				count: 5,
				minLevel: 8,
				maxLevel: 10
			},
			{
				id: 34,
				minX: 3500,
				maxX: 5000,
				sight: 50,
				count: 5,
				minLevel: 8,
				maxLevel: 10
			}
		],
		objects: [
			{
				id: 'cactusx1', key: 'cactus', npc: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 128, height: 125, locate: { left: 1805, bottom: 100 }, zoom: 1, rate: 1
			},
			{
				id: 'cactusx2', key: 'cactus', npc: true, rotate: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 128, height: 125, locate: { left: 3990, bottom: 5 }, zoom: 1, rate: 1
			},
			{
				id: 'cactusx3', key: 'cactus', npc: true, when: function (_npc) {
					return installQuestItem(_npc);
				}, width: 128, height: 125, locate: { left: 4740, bottom: 50 }, zoom: 1, rate: 1
			},
			{ id: 'portal2', src:'./images/texture/portal.gif', alpha: .75, to: 'cemetery', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 5725, bottom: -235 } },
			{ id: 'signsnowypeaks', text: 'Cemetery', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5745, bottom: -150 } },
			{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 'snow', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 215, bottom: -235 } },
			{ id: 'sign-cemetery', text: 'Snowy Peaks', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 220, bottom: -150 } }
		],
		tiles: [
			{ name: 'back', width: 4859, height: 1080, zoom: 1.065, rate: .85, bottom: -400, count:1 },
			{ name: 'ground', width: 5886, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 5886, height: 1080, zoom: 1.065, yRate: 2.8 }
	},
	{
		id: 93, disabled: true, ambianceVolume: .2, do: startSnow, after: stopWeather, 
		coords: { left: '70%', top: '12%', title: 'Snowy Peaks' }, 
		ambiancePath: './images/sounds/snow.mp3',
		theme: 'snow', distance: 1, width: MathFloor(6144 * 1.065),
		minLevel: 1, itemGrade: 3,
		equipmentDropRates: [

		],
		mobs: [
			// {
			// 	id: 27,
			// 	minX: 1000,
			// 	maxX: 5000,
			// 	sight: 50,
			// 	count: 5,
			// 	minLevel: 10,
			// 	maxLevel: 12
			// },
			// {
			// 	id: 22,
			// 	minX: 5000,
			// 	maxX: 5000,
			// 	sight: 500,
			// 	count: 1,
			// 	minLevel: 10,
			// 	maxLevel: 12,
			// 	attackAfterHit: true
			// }
		],
		objects: [
			//{
			// 	id: 'dropx1', key: 'snowdrop', npc: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 128, height: 157, locate: { left: 1040, bottom: -6 }, zoom: 1, rate: 1
			// },
			// {
			// 	id: 'dropx2', key: 'snowdrop', npc: true, rotate: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 128, height: 157, locate: { left: 2940, bottom: -6 }, zoom: 1, rate: 1
			// },
			// {
			// 	id: 'dropx3', key: 'snowdrop', npc: true, when: function (_npc) {
			// 		return installQuestItem(_npc);
			// 	}, width: 128, height: 157, locate: { left: 4540, bottom: -6 }, zoom: 1, rate: 1
			// },
			// { id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 'desert', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 5850, bottom: -235 } },
			// { id: 'sign-cemetery', text: 'Desert', key: 'sign', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5885, bottom: -150 } }
		],
		tiles: [
			{ name: 'bg', width: 6144, height: 1080, zoom: 1.065, rate: .85, bottom: -400, count:1 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2 }
	},
	{
		id: 15, ambianceVolume: .3, 
		coords: { left: '18%', top: '8%', title: 'Volcano' }, 
		theme: 'lava', distance: 1, width: MathFloor(5876 * 1.065),
		background: { width: 1860, height: 1080, key: 'bg' },
		minLevel: 8, itemGrade: 3,
		equipmentDropRates: [
			{ key:'bracers', rate: 5 },
			{ key:'leggings', rate: 5 },
			{ key:'gloves', rate: 5 },
			{ key:'weapon', rate: 5 },
			{ key:'boots', rate: 5 },
			{ key:'chest', rate: 5 },
			{ key:'belt', rate: 5 },
			{ key:'helmet', rate: 5 },
			{ key:'necklace', rate: 5 },
			{ key:'ring', rate: 5 }
		],
		mobs: [
			{
				id: 100,
				minX: 240,
				maxX: 240,
				count: 1,
				props: {
					reversed: 1
				},
				yPosition: function() {
					return MathRound((groundheight / 2) * 1.1);
				}
			},
			{
				id: 40,
				displayId: 41,
				minX: 500,
				maxX: 5250,
				sight: 100,
				count: 10,
				zoom: 1,
				minLevel: 10,
				maxLevel: 12
			},
			{
				id: 40,
				displayId: 41,
				minX: 500,
				maxX: 5250,
				sight: 100,
				count: 10,
				zoom: 1,
				actions: [
					{
						when: function (_e) {
							return __account.questStatus.quest?.key !== 'itbarak';
						},
						do: function (_e) {
							_e.remove = _e.noLoot = 1;
						}
					}
				],
				minLevel: 10,
				maxLevel: 12
			},
			{
				id: 45,
				minX: 1250,
				maxX: 1250,
				sight: 50,
				count: 1,
				zoom: 2,
				difficulty:1,
				minLevel: 15,
				maxLevel: 15,
				yPosition: function () { return MathRound(groundheight * .05) }
			},
			{
				id: 45,
				minX: 3000,
				maxX: 3000,
				sight: 50,
				count: 1,
				zoom: 1.8,
				difficulty:1,
				minLevel: 15,
				maxLevel: 15,
				yPosition: function () { return MathRound(groundheight * .1) }
			},
			{
				id: 45,
				minX: 5320,
				maxX: 5320,
				sight: 50,
				count: 1,
				zoom: 1.5,
				difficulty:1,
				minLevel: 15,
				maxLevel: 15,
				yPosition: function () { return MathRound(groundheight * .28) }
			},
			{
				id: 1,
				minX: 2000,
				maxX: 3000,
				sight: 50,
				count: 2,
				difficulty:1,
				minLevel: 15,
				maxLevel: 15,
				grade: 2,
				groupId: 1,
				actions: [
					{
						when: function (_e) {
							return __account.questStatus.quest?.key !== 'itbarak';
						},
						do: function (_e) {
							_e.remove = _e.noLoot = 1;
						}
					}
				],
				yPosition: function () { return MathRound(groundheight * .5) }
			},
			{
				id: 1,
				minX: 2000,
				maxX: 3000,
				sight: 50,
				count: 2,
				difficulty:1,
				minLevel: 15,
				maxLevel: 15,
				grade: 2,
				groupId: 1,
				actions: [
					{
						when: function (_e) {
							return __account.questStatus.quest?.key !== 'itbarak';
						},
						do: function (_e) {
							_e.remove = _e.noLoot = 1;
						}
					}
				],
				yPosition: function () { return MathRound(groundheight * .25) }
			},
			{
				id: 1,
				minX: 2000,
				maxX: 3000,
				sight: 50,
				count: 2,
				difficulty:1,
				minLevel: 15,
				maxLevel: 15,
				grade: 2,
				groupId: 1,
				actions: [
					{
						when: function (_e) {
							return __account.questStatus.quest?.key !== 'itbarak';
						},
						do: function (_e) {
							_e.remove = _e.noLoot = 1;
						}
					}
				],
				yPosition: function () { return MathRound(groundheight * .75) }
			},
			{
				id: 29,
				minX: 2500,
				maxX: 2500,
				sight: 50,
				count: 1,
				minLevel: 15,
				maxLevel: 15,
				grade: 3,
				groupId: 1,
				difficulty:1,
				yPosition: function () { return MathRound(groundheight * .5) },
				name: 'It Barak',
				actions: [
					{
						when: function (_e) {
							return __account.questStatus.quest?.key !== 'itbarak';
						},
						do: function (_e) {
							_e.remove = _e.noLoot = 1;
						}
					},
					{
						when: function (_e) {
							return _e.autoTarget && !_e.groupAttack;
						},
						do: function (_e) {
							if(_e.remove)
								return;
							_e.groupAttack = 1;
							PlaySound({key:'itbarakyell', volume: .35});
							const _arr = [];
							let _id = 1;
							_arr.push({
								id: _id,
								location: { map: 'lava' },
								owner: _e.key,
								ms: 3000,
								color: '#FF3131',
								text: 'Lets Finish This!'
							});
							episode.enemies.filter(x => x.enemy && x.id === 1 && x !== _e).forEach(x => {
								_id++;
								if(getRandomValue(0, 1))
									_arr.push({
										id: _id,
										location: { map: 'lava' },
										owner: x.key,
										ms: getRandomValue(2000, 3000),
										text: ['Rrrrr!', 'Grrrr!', 'Shhhh!'][getRandomValue(0, 2)]
									});
							});
							episode.dialogs = _arr;
						}
					}
				]
			}
		],
		objects: [
			{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 13, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -335 } },
		],
		tiles: [
			{ name: 'back2', width: 3750, height: 1080, zoom: 1.065, rate: .5, bottom: -400, count:1 },
			{ name: 'back1', width: 5077, height: 1080, zoom: 1.065, rate: .85, bottom: -400, count:1 },
			{ name: 'ground', width: 5876, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 5876, height: 1080, zoom: 1.065, yRate: 2.8 }
	},
	{
		id: 35, disabled: true, ambianceVolume: .1, coords: { left: '34%', top: '34%', title: 'Grove' }, theme: 'grove', distance: 1, width: MathFloor(6144 * 1.065),	
		minLevel: 4, itemGrade: 2,
		equipmentDropRates: [
			{ key:'helmet', rate: 8 },
			{ key:'bracers', rate: 8 },
			{ key:'belt', rate: 8 },
		],
		mobs: [
			// {
			// 	id: 37,
			// 	minX: 4500,
			// 	maxX: 5500,
			// 	sight: 50,
			// 	count: 1,
			// 	minLevel: 11,
			// 	name: '',
			// 	grade: 1,
			// 	maxLevel: 11,
			// 	groupId: 1,
			// 	name: 'Abra',
			// 	hp: 400
			// },
			// {
			// 	id: 38,
			// 	minX: 4500,
			// 	maxX: 5500,
			// 	sight: 50,
			// 	count: 1,
			// 	groupId: 1,
			// 	minLevel: 10,
			// 	maxLevel: 10,
			// 	grade: 1,
			// 	name: 'Yutpa',
			// 	hp: 300
			// },
			// {
			// 	id: 32,
			// 	minX: 3000,
			// 	maxX: 5000,
			// 	sight: 150,
			// 	count: 5,
			// 	minLevel: 15,
			// 	maxLevel: 16,
			// 	attackAfterHit: true
			// },
			// {
			// 	id: 18,
			// 	minX: 1000,
			// 	maxX: 3000,
			// 	sight: 150,
			// 	count: 5,
			// 	minLevel: 15,
			// 	maxLevel: 16,
			// 	attackAfterHit: true
			// }
		],
		objects: [
		],
		tiles: [
			{ name: 'back', width: 6144, height: 1080, zoom: 1.065, rate: .9, bottom: -400, count:1 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2 }
	},
	{
		id: 36, coords: { left: '5%', top: '40%', title: 'Arena', icon: 'battleground' }, 
		theme: 'cave', distance: 1, width: MathFloor(6144 * 1.065), ambiancePath: './images/sounds/cave2.mp3',
		ambianceVolume: .5,
		mobs: [
		],
		objects: [
		],
		tiles: [
			{ name: 'bg', count:1, width: 6144, height: 1080, zoom: 1.065, rate: .5, count:1, bottom: -440 },
			{ name: 'parts2', width: 1920, height: 1080, count: 3, bottom: 500, zoom: 1, rate: .75 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
			//{ name: 'foreground', count:1, width: 6144, height: 1080, bottom:-416, foreground: true, zoom: 1, rate: 1 },
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2.2 }
	},
	{
		id: 103, subMap: 104, repeat:1000, ambianceVolume:.5, do: startQuake, after: stopWeather,
		ambiancePath: './images/sounds/quake.mp3', 
		still: true, minLevel : 1, theme: 'chamber',
		coords: { title: 'Secret Room' },
		distance: 1, width: MathFloor(1920 * 1.067), characterZoom: 1.4,
		// objects: [
		// 	{
		// 		id: 'void', npc: true, when: function(_npc) {
		// 			if(!_npc.relatedObj)
		// 			{
		// 				const _chest = episode.enemies?.find(x => x.id === 56);
		// 				if(_chest && _chest.animations?.dead){
		// 					_chest.animations.dead.frames[0].do = function() {
		// 						_npc.relatedEnemy.remove = _npc.remove = true;
		// 					}
		// 					_npc.relatedObj = true;
		// 				}
		// 			}
		// 			return installQuestItem(_npc, null, 1);
		// 		}, width: 100, height: 50, locate: { left: 963, bottom: -20 }, zoom: 2.3, rate: 1
		// 	},
		// ],
		mobs: [
			{
				id: 500,
				minX: 917,
				maxX: 917,
				do: function(_e) {
					_e.animations.idle.frames[0].objects[0].p1.from = '#FFFFF0ba';
					_e.animations.idle.frames[0].objects[0].p1.to = '#F0EAD670';
					_e.animations.idle.frames[0].bottomGap = -285;
				},
				yPosition: function() {
					return groundheight;
				},
				count: 1,
			},
			{
				id: 500,
				minX: 1210,
				maxX: 1210,
				do: function(_e) {
					_e.animations.idle.frames[0].objects[0].p1.from = '#FFFFF0ba';
					_e.animations.idle.frames[0].objects[0].p1.to = '#F0EAD670';
					_e.animations.idle.frames[0].bottomGap = -285;
				},
				yPosition: function() {
					return groundheight;
				},
				count: 1,
			},
			{
				id: 56,
				minX: 1046,
				maxX: 1046,
				yPosition: function() {
					return groundheight;
				},
				do: function(_e) {
					_e.npc = 'chest';
				},
				count: 1,
			}
		],
		tiles: [
			{ name: 'bg', width: 1920, height: 1076, zoom: 1.067, rate: .85, bottom: -400, count:1 },
		],
		ground: { width: 1920, height: 1076, zoom: 1.067, yRate: 1.6, bottomGap: 120, leftGap:700, rightGap:550 }
	},
	{
		id: 102, repeat:1000, subMap: 104,
		do: startQuake, after: stopWeather, repeat:1000,
		ambianceVolume:.5, ambiancePath: './images/sounds/quake.mp3', still: true, minLevel : 1, theme: 'room1',
		coords: { title: 'Seewers' },
		distance: 1, width: MathFloor(1920 * 1.067), characterZoom: 1.4,
		// objects: [
		// 	{
		// 		id: 'void', npc: true, when: function(_npc) {
		// 			if(!_npc.relatedObj)
		// 			{
		// 				const _chest = episode.enemies?.find(x => x.id === 56);
		// 				if(_chest && _chest.animations?.dead){
		// 					_chest.animations.dead.frames[0].do = function() {
		// 						_npc.relatedEnemy.remove = _npc.remove = true;
		// 					}
		// 					_npc.relatedObj = true;
		// 				}
		// 			}
		// 			return installQuestItem(_npc, null, 1);
		// 		}, width: 100, height: 50, locate: { left: 963, bottom: -20 }, zoom: 2.3, rate: 1
		// 	},
		// ],
		mobs: [
			// {
			// 	id: 500,
			// 	minX: 945,
			// 	maxX: 945,
			// 	do: function(_e) {
			// 		_e.animations.idle.frames[0].objects[0].p1.from = '#FFFFF0ba';
			// 		_e.animations.idle.frames[0].objects[0].p1.to = '#F0EAD670';
			// 		_e.animations.idle.frames[0].bottomGap = -265;
			// 	},
			// 	yPosition: function() {
			// 		return groundheight;
			// 	},
			// 	count: 1,
			// },
			// {
			// 	id: 500,
			// 	minX: 1245,
			// 	maxX: 1245,
			// 	do: function(_e) {
			// 		_e.animations.idle.frames[0].objects[0].p1.from = '#FFFFF0ba';
			// 		_e.animations.idle.frames[0].objects[0].p1.to = '#F0EAD670';
			// 		_e.animations.idle.frames[0].bottomGap = -265;
			// 	},
			// 	yPosition: function() {
			// 		return groundheight;
			// 	},
			// 	count: 1,
			// },
			{
				id: 78,
				minX: 1390,
				maxX: 1390,
				zoom: 1.4,
				direction: __left,
				yPosition: function() {
					return MathRound(groundheight * .6);
				},
				props: {
					reversed: true
				},
				count: 1
			},
			{
				id: 178,
				minX: 1100,
				maxX: 1100,
				zoom: 1.4,
				direction: __left,
				yPosition: function() {
					return MathRound(groundheight * .8);
				},
				count: 1
			},
			// {
			// 	id: 28,
			// 	minX: 1250,
			// 	maxX: 1250,
			// 	yPosition: function() {
			// 		return MathRound(groundheight * .5);
			// 	},
			// 	hp: 1,
			// 	attackAfterHit: true,
			// 	direction: __right,
			// 	props: {
			// 		still: true,
			// 		immobilize: true,
			// 		noLoot: true,
			// 		experience: 250,
			// 		noDirection: true
			// 	},
			// 	count: 1
			// },
			{
				id: 28,
				minX: 1500,
				maxX: 1500,
				sight: 100,
				attackAfterHit: true,
				yPosition: function() {
					return MathRound(groundheight * .5);
				},
				hp: 1,
				direction: __left,
				props: {
					still: true,
					noLoot: true,
					reversed: true,
					immobilize: true,
					noDirection: true
				},
				count: 1
			}
		],
		tiles: [
			{ name: 'bg', width: 1920, height: 1076, zoom: 1.067, rate: .85, bottom: -400, count:1 },
			{ name: 'fg', width: 1920, height: 1076, count:1, bottom: -400, foreground: true, zoom: 1.067, rate: 1 }

		],
		ground: { width: 1920, height: 1076, zoom: 1.067, yRate: .7 }
	},
	{
		id: 104, repeat:1000, do: startQuake, after: stopWeather,
		ambianceVolume:.5, ambiancePath: './images/sounds/quake.mp3', still: true, minLevel : 1, theme: 'seewers', /*runToSwitch: true,*/
		coords: { title: 'Dungeon' }, distance: 1, width: MathFloor(1920 * 1.067), characterZoom: 1.4,
		mobs: [
			{
				id: 500,
				minX: 590,
				maxX: 590,
				do: function(_e) {
					_e.animations.idle.frames[0].objects[0].p1.to = '#e2582260';
					_e.animations.idle.frames[0].objects[0].p1.r = 120;
					_e.animations.idle.frames[0].objects[0].p1.x = 40;
					_e.animations.idle.frames[0].bottomGap = -420;
				},
				yPosition: function() {
					return groundheight;
				},
				count: 1,
			},
			{
				id: 500,
				minX: 1370,
				maxX: 1370,
				do: function(_e) {
					_e.animations.idle.frames[0].objects[0].p1.to = '#e2582260';
					_e.animations.idle.frames[0].objects[0].p1.r = 120;
					_e.animations.idle.frames[0].objects[0].p1.x = 40;
					_e.animations.idle.frames[0].bottomGap = -420;
				},
				yPosition: function() {
					return groundheight;
				},
				count: 1,
			}
		],
		tiles: [
			{ name: 'bg', width: 1920, height: 1080, zoom: 1.067, rate: 1, bottom: -400, count:1 },
		],
		objects: [
			// {
			// 	id: 'void', npc: true, when: function(_npc) {
			// 		return installQuestItem(_npc, null, 1);
			// 	}, width: 100, height: 50, locate: { left: 100, bottom: -100 }, zoom: 2, rate: 1
			// },
			//{ id: 'portal2', disabled: true, src:'./images/texture/portal.gif', alpha: .75, to: 103, key: 'portal', npc: true, totalFrames: 7, width: 420, height: 0, zoom: 1, locate: { left: -80, bottom: -335 } },
		],
		ground: { width: 1920, height: 1080, zoom: 1.067, yRate: 1 }
	},
	{
		id: 105, minLevel: 1,
		coords: { left: '53%', top: '42%', title: 'Castle' }, 
		theme: 'darkvillage', distance: 1, width: MathFloor(6000 * 1.1),
		mobs: [
		],
		objects: [
		],
		tiles: [
			{ name: 'bg', width: 6144, height: 1080, zoom: 1.1, rate: .9, bottom: -400, count:1 },
			{ name: 'ground', width: 6000, height: 1055, zoom: 1.1, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6000, height: 1055, zoom: 1.1, yRate: 2 }
	},	
	{
		id: 106, minLevel: 1, ambiancePath: './images/sounds/castle.mp3', ambianceVolume:.1,
		coords: { left: '53%', top: '42%', title: 'Castle' }, 
		theme: 'ruinedvillage', distance: 1, width: MathFloor(6144 * 1.065),
		mobs: [
		],
		objects: [
		],
		tiles: [
			{ name: 'bg', width: 6144, height: 1080, zoom: 1.065, rate: .9, bottom: -400, count:1 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.065, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.065, yRate: 2 }
	},	
	{
		id: 201, minLevel: 1, public: 1,
		coords: { left: '33%', top: '52%', title: 'Training', key:'training' }, 
		theme: 'plains', distance: 1, width: MathFloor(6144 * 1.06),
		mobs: [
			// {
			// 	id: 30, //31,
			// 	minX: 1000,
			// 	maxX: 5000,
			// 	sight: 150,
			// 	count: 15,
			// 	minLevel: 1,
			// 	maxLevel: 1,
			// 	attackAfterHit: true
			// }
		],
		objects: [
		],
		tiles: [
			{ name: 'back', width: 6144, height: 1080, zoom: 1.06 * __scale, rate: .9, bottom: -400, count:1 },
			{ name: 'ground', width: 6144, height: 1080, zoom: 1.06 * __scale, rate: 1, bottom: -400, count:1 }
		],
		ground: { width: 6144, height: 1080, zoom: 1.06 * __scale, yRate: 2 }
	},	
	{
		id: 1000, disabled: true, dungeon: 1, floors: 3, coords: { left: '61%', top: '44%', title: 'Dungeon' }, theme: 'dungeon1', distance: 1, width: 5888,
		mobs: [
			//{
			//	id: 15,
			//	minX: 500,
			//	maxX: 500,
			//	sight: 150,
			//	count: 1,
			//	minLevel: 1,
			//	maxLevel: 2,
			//	hp: 300,
			//},
			{
				id: 13,
				minX: 2000,
				maxX: 3000,
				sight: 150,
				count: 5,
				minLevel: 8,
				maxLevel: 10,
				groupId: 1,
				hp: 300,
				attackAfterHit: true
			},
			{
				id: 132,
				minX: 4000,
				maxX: 5000,
				sight: 150,
				count: 5,
				minLevel: 8,
				maxLevel: 10,
				groupId: 2,
				hp: 300,
				attackAfterHit: true
			},
		],
		objects: [
			{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 'dungeon2', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 5350, bottom: -275 } },
			{ id: 'sign-dungeon2', text: '2nd Floor', key: 'sign-dungeon2', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 5400, bottom: -200 } },
		],
		tiles: [
			{ name: 'ground', width: 5888, height: 1080, count:1, bottom: -610, zoom: 1.065, rate: 1 },
			{ name: 'foreground', width: 5888, height: 1080, count:1, bottom: -610, foreground: true, zoom: 1.35, rate: 1 }
		],
		ground: { width: 5888, height: 1080, zoom: 1.065, yRate: 3.2, bottomGap: 120 }
	},
	{
		id: 1002, dungeon: 1, floors: 3, currentFloor: 2, theme: 'dungeon2', distance: 1, width: 3890,
		mobs: [
			{
				id: 16,
				minX: 2500,
				maxX: 3200,
				sight: 30,
				count: 5,
				groupId: 1,
				minLevel: 8,
				maxLevel: 10,
				hp: 300
			},
			{
				id: 17,
				minX: 1200,
				maxX: 2200,
				sight: 150,
				count: 5,
				groupId: 2,
				minLevel: 8,
				maxLevel: 10,
				hp: 300,
				attackAfterHit: true
			},
		],
		objects: [
			{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 'dungeon3', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 3350, bottom: -275 } },
			{ id: 'sign-dungeon2', text: '3rd Floor', key: 'sign-dungeon2', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 3400, bottom: -200 } },
		],
		tiles: [
			{ name: 'ground', width: 5888, height: 1080, count:1, bottom: -610, zoom: 1.065, rate: 1 },
			{ name: 'foreground', width: 5888, height: 1080, count:1, bottom: -610, foreground: true, zoom: 1.35, rate: 1.25 }
		],
		ground: { width: 5888, height: 1080, zoom: 1.065, yRate: 3.2, bottomGap: 120 }
	},
	{
		id: 1004, dungeon: 1, floors: 3, currentFloor: 3, theme: 'dungeon3', assetPath: 'dungeon2', distance: 1, width: 3890,
		mobs: [
			{
				id: 15,
				minX: 3200,
				maxX: 3200,
				sight: 50,
				direction: __left,
				count: 1,
				groupId: 1,
				minLevel: 8,
				maxLevel: 10,
				yPosition: function () { return MathRound(groundheight * .5) },
				grade: 5,
				name: 'Hınkır Munkur',
				hp: 300
			},
			{
				id: 18,
				minX: 3000,
				maxX: 3000,
				sight: 30,
				direction: __left,
				yPosition: function () { return MathRound(groundheight * .35) },
				count: 1,
				groupId: 1,
				minLevel: 8,
				maxLevel: 10,
				hp: 300
			},
			{
				id: 18,
				minX: 3000,
				maxX: 3000,
				sight: 30,
				direction: __left,
				yPosition: function () { return MathRound(groundheight * .65) },
				count: 1,
				groupId: 1,
				minLevel: 8,
				maxLevel: 10,
				hp: 300
			}
		],
		objects: [
			{ id: 'portal1', src:'./images/texture/portal.gif', alpha: .75, to: 'farm', key: 'portal', npc: true, totalFrames: 7, width: 192, height: 87, zoom: 1, locate: { left: 3350, bottom: -275 } },
			{ id: 'sign-dungeon3', text: 'Exit', key: 'sign-dungeon3', totalFrames: 2, width: 100, height: 40, zoom: 1, locate: { left: 3400, bottom: -200 } },
		],
		tiles: [
			{ name: 'ground', width: 5888, height: 1080, count:1, bottom: -610, zoom: 1.065, rate: 1 },
			{ name: 'foreground', width: 5888, height: 1080, count:1, bottom: -610, foreground: true, zoom: 1.35, rate: 1 }
		],
		ground: { width: 5888, height: 1080, zoom: 1.065, yRate: 3.2, bottomGap: 120 }
	}
];

const grades = [
	{ key: 0, color: 'red', hex: '#8B0A1A' },
	{ key: 1, color: 'yellow', hex: '#B59A00' },
	{ key: 2, color: 'green', hex: '#2D6A3A' },
	{ key: 3, color: 'blue', hex: '#0A1E6A' },
	{ key: 4, color: 'orange', hex: '#A83F0F' },
	{ key: 5, color: 'maroon', hex: '#6A003A' },
	{ key: 6, color: 'purple', hex: '#3C116A' },
	{ key: 7, color: 'gold', hex: '#6F5B10' },
	{ key: 8,  color: 'cyan',     hex: '#1FA6A0' }, // parlak turkuaz
	{ key: 9,  color: 'lime',     hex: '#7CB342' }, // canlı ama kirli yeşil
	{ key: 10, color: 'crimson',  hex: '#C13A4A' }, // açık elite red
	{ key: 11, color: 'platinum', hex: '#C7CCD6' }, // açık metalik gri
	{ key: 11, color: 'obsidian', hex: '#3d354b' } // açık metalik gri
];
function getGradeColor(_grade) {
	return grades.find(x => x.key === _grade)?.color;
}
function getGradeBGColor(_grade) {
	return grades.find(x => x.key === _grade)?.hex;
}
const properties = [
	//{ noList: true, key: "hot", type: "hot", title: "Heal On Time", baseValue: 0, rate: 100 },
	//{ noList: true, key: "cooldown", type: "cooldown", title: "Cooldown Decrease", baseValue: 0, rate: 1 },
	//{ noList: true, key: "energy", type: "energy", title: "Energy", baseValue: 100, rate: 1 },
	{ order:5,key: "fire-dmg-rate", type: "fireDmgRate", titles: { en: "Fire Damage", tr: "Alev Hasarı" }, group: 'atk', baseValue: 0, rate: 1, color: '#EE4B2B' },
	{ order:6,key: "ice-dmg-rate", type: "iceDmgRate", titles: { en: "Ice Damage", tr: "Buz Hasarı" }, group: 'atk', baseValue: 0, rate: 1, color: '#0096FF' },
	{ order:7,key: "lightning-dmg-rate", type: "lightningDmgRate", titles: { en: "Lightning Damage", tr: "Işık Hasarı" }, group: 'atk', baseValue: 0, rate: 1, color: '#FFEA00' },
	{ order:8,key: "toxic-dmg-rate", type: "toxicDmgRate", titles: { en: "Toxic Damage", tr: "Zehir Hasarı" }, group: 'atk', baseValue: 0, rate: 1, color: '#AAFF00' },
	{ key: "min-dmg", type: "minDmg", titles: { en: "Minimum Damage", tr: "En Düşük Hasar" }, baseValue: 0, rate: 1 },
	{ key: "max-dmg", type: "maxDmg", titles: { en: "Maximum Damage", tr: "En Yüksek Hasar" }, baseValue: 0, rate: 1 },
	{ key: "armor", type: "armor", titles:  { en: "Armor", tr: "Zırh" }, baseValue: 0, rate: 1 },
	//{ noList: true, key: "run", type: "runWalk", title: "Faster Run/Walk", baseValue: 0, rate: 1 },
	{ order:1, key: "atk-rate", type: "atk", titles: { en: "Extra Attack", tr: "Atak" }, baseValue: 0, group: 'atk', rate: 1 },
	{ order:2,key: "pierce-rate", type: "pierce", titles:{ en: "Defense Pierce", tr: "Defans Delme" }, baseValue: 0, group: 'atk', limit: 30, rate: 750 },
	{ order:1,key: "def-rate", type: "def", titles: { en: "Extra Defense", tr: "Defans" }, baseValue: 0, group: 'def', limit: 75, rate: 1 },
	{ order:1,key: "hp-rate", type: "hp", titles: { en: "Extra Health", tr: "Sağlık" }, baseValue: 100, group: 'hp', rate: 0.005, addTo: [ 'helmet'] },
	{ order:4,key: "luck-rate", type: "hp", titles: { en: "Item Find Luck", tr: "Ekipman Bulma Şansı" }, baseValue: 5, group: 'hp', rate: 0.005, addTo: [ 'chest', 'leggings', 'boots'] },
	{ order:5,key: "gold-gain-rate", type: "hp", titles: { en: "Gold Find Luck", tr: "Altın Bulma Şansı" }, baseValue: 5, group: 'hp', rate: 0.005, addTo: [ 'necklace', 'bracers', 'gloves'] },
	
	{ key: "max-hp", type: "maxHP", titles: { en: "Maximum Health", tr: "Toplam Sağlık" }, baseValue: 0, rate: 1 },
	{ order:6,key: "fire-resist-rate", type: "fireResistRate", titles: { en: "Fire Resist", tr: "Alev Direnci" }, baseValue: 0, group: 'def', limit: 100, rate: 250, color: '#EE4B2B' },
	{ order:7,key: "ice-resist-rate", type: "iceResistRate", titles: { en: "Ice Resist", tr: "Buz Direnci" }, baseValue: 0, group: 'def', limit: 100, rate: 250, color: '#0096FF' },
	{ order:8,key: "lightning-resist-rate", type: "lightningResistRate", titles: { en: "Lightning Resist", tr: "Işık Direnci" }, baseValue: 0, group: 'def', limit: 100, rate: 250, color: '#FFEA00' },
	{ order:9,key: "toxic-resist-rate", type: "toxicResistRate", titles: { en: "Toxic Resist", tr: "Zehir Direnci" }, baseValue: 0, group: 'def', limit: 100, rate: 250, color: '#AAFF00' },
	{ order:2,key: "steal-chance-rate", addTo: [ 'ring', 'gloves' ], type: "stealChance", titles: { en: "Steal Chance", tr: "Sağlık Çalma Şansı" }, baseValue: 0, group: 'hp', limit: 30, rate: 750 },
	{ order:3,key: "steal-rate", addTo: [ 'ring', 'gloves' ], type: "stealRate", titles: { en: "Steal Rate",  tr: "Sağlık Çalma Oranı" }, baseValue: 1, group: 'hp', limit: 30, rate: 750 },
	{ order:4,key: "crit-dmg-rate", type: "critDmg", titles: { en: "Critical Damage", tr: "Kritik Hasar" }, baseValue: 0, group: 'atk', rate: 1 },
	{ order:3,key: "crit-rate", type: "critRate", titles: { en: "Critical Rate", tr: "Kritik Oranı" }, baseValue: 10, group: 'atk', limit: 30, rate: 750 },
	{ order:4,key: "crit-dmg-resist-rate", type: "critDmgResistRate", titles: { en: "Critical Damage Resist", tr: "Kritik Hasar Direnci" }, baseValue: 0, group: 'def', rate: 1 },
	{ order:3,key: "crit-resist-rate", type: "critResistRate", titles: { en: "Critical Rate Resist", tr: "Kritik Oran Direnci" }, baseValue: 10, group: 'def', limit: 30, rate: 750 },
	{ order:5,key: "pierce-resist-rate", type: "pierceResistRate", titles: { en: "Defense Pierce Resist", tr: "Defans Delme Direnci" }, baseValue: 0, group: 'def', limit: 30, rate: 750 }
];
const __basePropValues = {
	minDmg : {
		g1: 10,
		g2: 20,
		g3: 40,
		g4: 80,
		g5: 160,
		g6: 320
	},
	maxDmg : {
		g1: 20,
		g2: 40,
		g3: 80,
		g4: 160,
		g5: 320,
		g6: 640
	},
	armor : {
		g1: 10,
		g2: 20,
		g3: 40,
		g4: 80,
		g5: 160,
		g6: 320
	},
	maxHP : {
		g1: 10,
		g2: 20,
		g3: 40,
		g4: 80,
		g5: 160,
		g6: 320
	}
}
function structuredClone2(_x) {
	return JSON.parse(JSON.stringify(_x));
}
function createFrames(_speed, _count, _width, _height, _col, _atkFrame, _sound) {
	const _frames = [];
	let _l = 0, _t = -1 * _height;
	const _origin = MathRound(_width / 2);
	for(let i = 0; i < _count; i++) {
		if((i % _col) === 0) {
			_l = 0;
			_t += _height;
		}
		_frames.push( {
			spriteLeft: _l,
			spriteTop: _t,
			spriteOrigin: _origin,
			speed: _speed,
			atk: structuredClone2(_atkFrame),
			spriteWidth:_width,
			spriteHeight:_height
		});
		_l += _width;
	}
	if(_sound)
		_frames[0].sound = _sound;
	return _frames;
}
const spells = {
	lasershow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: .85,
		width: 76,
		invulnerable: true,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep47/skill.png',
		name: 'Laser Show',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 2
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				attack: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						do: function(_e) {
							const _enemy = episode.enemies.filter(x => 
								x.name === _e.name && 
								x.related === _e.related &&
							x.spellGroup === _e.spellGroup);
							if(_enemy.length > 20 || _enemy.find(x => x.unseen)){
								_enemy[_enemy.length - 1].animate('dead', 1);
								return;
							}
							else {
								if(_e.related.class !== __spell)
									_e.owner = _e.related;
								else
									_e.owner = _e.related.owner;
								const _diff = MathRound(groundheight / 5);
								switch(_enemy.length % 3) {
									case 0:
										_e.yPosition = _e.owner.yPosition + _diff;
										_e.zoom *= (_e.owner.zoom * .9);
										break;
									case 1:
										_e.yPosition = _e.owner.yPosition;
										_e.zoom = _e.owner.zoom;
										break;
									case 2:
										_e.yPosition = _e.owner.yPosition - _diff;
										_e.zoom *= (_e.owner.zoom * 1.1);
										break;
								}
							}
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1
					},
					{
						spriteLeft: 1543,
						spriteTop: 0,
						spriteWidth: 34,
						spriteHeight: 338,
						spriteOrigin: 17,
						bottomGap: -560,
						sound: { key: 'cyclopslasershow', volume: .8, reset: true },
						speed: 3,
					},
					{
						spriteLeft: 1543,
						spriteTop: 0,
						spriteWidth: 34,
						spriteHeight: 338,
						spriteOrigin: 17,
						bottomGap: -560,
						speed: 3,
						spell: {
							key: 'lasershow',
							xGap: 60
						},
						atk: {
							yRange: 15,
							rate: .1,
							ignoreDef: true,
							hitTaken: .1,
							reset: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1244,
						spriteTop: 0,
						spriteWidth: 34,
						ignoreDef: true,
						spriteHeight: 706,
						spriteOrigin: 17,
						bottomGap: -560 + 369,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							hitTaken: .1,
							ignoreDef: true,
							reset: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 925,
						spriteTop: 0,
						spriteWidth: 69,
						spriteHeight: 910,
						spriteOrigin: 35,
						speed: 6,
						objects: [{ key:'laserend', position:'under-feet', scale: 2, yGap: 20 }],
						atk: {
							yRange: 10,
							rate: .1,
							hitTaken: .1,
							reset: true,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 628,
						spriteTop: 0,
						spriteWidth: 69,
						spriteHeight: 910,
						spriteOrigin: 32,
						speed: 6,
						atk: {
							yRange: 10,
							reset: true,
							rate: .1,
							hitTaken: .1,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 328,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 910,
						spriteOrigin: 33,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							reset: true,
							ignoreDef: true,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 27,
						spriteTop: 0,
						spriteWidth: 76,
						spriteHeight: 910,
						spriteOrigin: 33,
						speed: 6,
						atk: {
							yRange: 10,
							reset: true,
							rate: .1,
							ignoreDef: true,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 925,
						spriteTop: 0,
						spriteWidth: 69,
						spriteHeight: 910,
						spriteOrigin: 35,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							ignoreDef: true,
							hitTaken: .1,
							reset: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 628,
						spriteTop: 0,
						spriteWidth: 69,
						spriteHeight: 910,
						spriteOrigin: 32,
						speed: 6,
						atk: {
							yRange: 10,
							reset: true,
							rate: .1,
							hitTaken: .1,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 328,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 910,
						spriteOrigin: 33,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							reset: true,
							hitTaken: .1,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 27,
						spriteTop: 0,
						spriteWidth: 76,
						spriteHeight: 910,
						spriteOrigin: 33,
						speed: 6,
						atk: {
							yRange: 10,
							reset: true,
							rate: .1,
							hitTaken: .1,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 925,
						spriteTop: 0,
						spriteWidth: 69,
						spriteHeight: 910,
						spriteOrigin: 35,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							hitTaken: .1,
							reset: true,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 628,
						spriteTop: 0,
						spriteWidth: 69,
						spriteHeight: 910,
						spriteOrigin: 32,
						speed: 6,
						atk: {
							yRange: 10,
							reset: true,
							rate: .1,
							hitTaken: .1,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 328,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 910,
						spriteOrigin: 33,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							reset: true,
							hitTaken: .1,
							ignoreDef: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 27,
						spriteTop: 0,
						spriteWidth: 76,
						spriteHeight: 910,
						spriteOrigin: 33,
						speed: 6,
						atk: {
							yRange: 10,
							reset: true,
							ignoreDef: true,
							rate: .1,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1244,
						spriteTop: 0,
						spriteWidth: 32,
						spriteHeight: 706,
						spriteOrigin: 17,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							ignoreDef: true,
							hitTaken: .1,
							aoe: 50,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1543,
						spriteTop: 0,
						spriteWidth: 34,
						spriteHeight: 338,
						spriteOrigin: 17,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1,
							ignoreDef: true,
							hitTaken: .1,
							reset: true,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
				]
			}
		}
	},
	warriorhead: {
		src: './images/main/warrior/Death.png',
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		noRelation: true,
		class: __spell,
		name: 'warriorhead',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				useExtraStepXRate: true,
				frames: [
					{
						objects: [
							{ key: 'slowMotion', position: 'css' }
						],
						spriteLeft: 1323,
						spriteTop: 235,
						spriteWidth: 39,
						spriteHeight: 48,
						spriteOrigin: 0,
						bottomGap: -120,
						extraStepXRate: -.3,
						speed: 12
					},
					{
						spriteLeft: 1373,
						spriteTop: 235,
						spriteWidth: 54,
						spriteHeight: 48,
						spriteOrigin: 0,
						bottomGap: -100,
						extraStepXRate: -.25,
						speed: 12
					},
					{
						spriteLeft: 1445,
						spriteTop: 235,
						spriteWidth: 43,
						spriteHeight: 48,
						spriteOrigin: 0,
						bottomGap: -80,
						extraStepXRate: -.2,
						speed: 10
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						bottomGap: -60,
						extraStepXRate: -.2,
						speed: 10
					},
					{
						spriteLeft: 1575,
						spriteTop: 235,
						spriteWidth: 42,
						spriteHeight: 48,
						spriteOrigin: 0,
						bottomGap: -40,
						extraStepXRate: -.15,
						speed: 8
					},
					{
						spriteLeft: 1323,
						spriteTop: 235,
						spriteWidth: 39,
						spriteHeight: 48,
						spriteOrigin: 0,
						bottomGap: -20,
						extraStepXRate: -.15,
						speed: 8
					},
					{
						spriteLeft: 1373,
						spriteTop: 235,
						spriteWidth: 54,
						spriteHeight: 48,
						spriteOrigin: 0,
						objects: [{
							key: 'puf1',
							position: 'under-feet',
							alpha: .35
						},
						{ key: 'blooddrop3', zoom: .8, position: 'under-feet', still: true, speed: 275 }],
						extraStepXRate: -.18,
						speed: 8
					}
					, {
						spriteLeft: 1445,
						spriteTop: 235,
						spriteWidth: 43,
						spriteHeight: 48,
						spriteOrigin: 0,
						extraStepXRate: -.16,
						speed: 8
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						extraStepXRate: -.14,
						speed: 8
					},
					{
						spriteLeft: 1575,
						spriteTop: 235,
						spriteWidth: 42,
						spriteHeight: 48,
						spriteOrigin: 0,
						extraStepXRate: -.12,
						speed: 8
					},
					{
						spriteLeft: 1323,
						spriteTop: 235,
						spriteWidth: 39,
						spriteHeight: 48,
						spriteOrigin: 0,
						extraStepXRate: -.1,
						speed: 8
					},
					{
						spriteLeft: 1373,
						spriteTop: 235,
						spriteWidth: 54,
						spriteHeight: 48,
						spriteOrigin: 0,
						extraStepXRate: -.08,
						speed: 8
					}, {
						spriteLeft: 1445,
						spriteTop: 235,
						spriteWidth: 43,
						spriteHeight: 48,
						spriteOrigin: 0,
						extraStepXRate: -.06,
						speed: 8
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -2, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1, position: 'head', alpha: .5 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -5, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.15, position: 'head', alpha: .05 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -7, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.2, position: 'head', alpha: .05 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -10, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.25, position: 'head', alpha: .05 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -12, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.3, position: 'head', alpha: .05 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -15, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.35, position: 'head', alpha: .05 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -17, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.45, position: 'head', alpha: .1 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -20, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.55, position: 'head', alpha: .1 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -23, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.6, position: 'head', alpha: .15 }],
						speed: 15
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -24, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.63, position: 'head', alpha: .2 }],
						speed: 35
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -25, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.66, position: 'head', alpha: .25 }],
						speed: 30
					},
					{
						spriteLeft: 1509,
						spriteTop: 235,
						spriteWidth: 48,
						spriteHeight: 48,
						spriteOrigin: 0,
						positions: [{ key: 'head', x: -26, y: 22 }],
						objects: [{ key: 'blooddead', zoom: 1.7, position: 'head', alpha: .3 }],
						speed: 25
					}
				]
			}
		}
	},
	teberhead: {
		src: './images/sprites/ep02/sprite.png',
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.35,
		invulnerable: true,
		noRelation: true,
		class: __spell,
		name: 'teberhead',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				useExtraStepXRate: true,
				frames: [
					{
						objects: [
							{ key: 'slowMotion', position: 'css' }
						],
						spriteLeft: 1349,
						spriteTop: 1302,
						spriteWidth: 42,
						spriteHeight: 46,
						spriteOrigin: 0,
						bottomGap: -120,
						extraStepXRate: -.3,
						speed: 12
					},
					{
						spriteLeft: 1404,
						spriteTop: 1302,
						spriteWidth: 54,
						spriteHeight: 46,
						spriteOrigin: 0,
						bottomGap: -100,
						extraStepXRate: -.25,
						speed: 12
					},
					{
						spriteLeft: 1476,
						spriteTop: 1302,
						spriteWidth: 48,
						spriteHeight: 46,
						spriteOrigin: 0,
						bottomGap: -80,
						extraStepXRate: -.2,
						speed: 10
					},
					{
						spriteLeft: 1541,
						spriteTop: 1302,
						spriteWidth: 51,
						spriteHeight: 46,
						spriteOrigin: 0,
						bottomGap: -60,
						extraStepXRate: -.2,
						speed: 10
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						bottomGap: -40,
						extraStepXRate: -.15,
						speed: 8
					},
					{
						spriteLeft: 1349,
						spriteTop: 1302,
						spriteWidth: 42,
						spriteHeight: 46,
						spriteOrigin: 0,
						bottomGap: -20,
						extraStepXRate: -.15,
						speed: 8
					},
					{
						spriteLeft: 1404,
						spriteTop: 1302,
						spriteWidth: 54,
						spriteHeight: 46,
						spriteOrigin: 0,
						objects: [{
							key: 'puf1',
							position: 'under-feet'
						},
						{ key: 'blooddrop3', zoom: .8, position: 'under-feet', still: true, speed: 275 }],
						extraStepXRate: -.18,
						speed: 8
					}
					, {
						spriteLeft: 1476,
						spriteTop: 1302,
						spriteWidth: 48,
						spriteHeight: 46,
						spriteOrigin: 0,
						extraStepXRate: -.16,
						speed: 8
					},
					{
						spriteLeft: 1541,
						spriteTop: 1302,
						spriteWidth: 51,
						spriteHeight: 46,
						spriteOrigin: 0,
						extraStepXRate: -.14,
						speed: 8
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						extraStepXRate: -.12,
						speed: 8
					},
					{
						spriteLeft: 1349,
						spriteTop: 1302,
						spriteWidth: 42,
						spriteHeight: 46,
						spriteOrigin: 0,
						extraStepXRate: -.1,
						speed: 8
					},
					{
						spriteLeft: 1404,
						spriteTop: 1302,
						spriteWidth: 54,
						spriteHeight: 46,
						spriteOrigin: 0,
						extraStepXRate: -.08,
						speed: 8
					}, {
						spriteLeft: 1476,
						spriteTop: 1302,
						spriteWidth: 48,
						spriteHeight: 46,
						spriteOrigin: 0,
						extraStepXRate: -.06,
						speed: 8
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 15
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 35
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 30
					},
					{
						spriteLeft: 1599,
						spriteTop: 1302,
						spriteWidth: 46,
						spriteHeight: 46,
						spriteOrigin: 0,
						speed: 25
					}
				]
			}
		}
	},
	dynamite: {
		src: './images/sprites/ep92/tnt.png',
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.5,
		invulnerable: true,
		class: __spell,
		name: 'Dynamite',
		pierce: true,
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				useExtraStepXRate: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -100,
						extraStepXRate: .35,
						sound: {key:'cartoonfall', reset: true},
						speed: 8
					},
					{
						spriteLeft: 50,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -120,
						extraStepXRate: .4,
						speed: 8
					},	{
						spriteLeft: 100,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -150,
						extraStepXRate: .45,
						speed: 8
					},	{
						spriteLeft: 150,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -160,
						extraStepXRate: .5,
						speed: 8
					},
						{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -140,
						extraStepXRate: .5,
						speed: 8
					},	{
						spriteLeft: 50,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -120,
						extraStepXRate: .4,
						speed: 8
					},	{
						spriteLeft: 100,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -90,
						extraStepXRate: .3,
						speed: 8
					},	{
						spriteLeft: 150,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -60,
						extraStepXRate: .2,
						speed: 8
					},	{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -30,
						extraStepXRate: .1,
						speed: 8
					},	{
						spriteLeft: 50,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: 0,
						speed: 4,
						spell: {
							key: 'groundexplosion'
						}
					}
				]
			}
		}
	},
	dynamiteshort: {
		src: './images/sprites/ep92/tnt.png',
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.5,
		invulnerable: true,
		class: __spell,
		name: 'Dynamite Short',
		pierce: true,
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				useExtraStepXRate: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -100,
						extraStepXRate: .05,
						sound: {key:'cartoonfall', reset: true},
						speed: 8
					},
					{
						spriteLeft: 50,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -120,
						extraStepXRate: .075,
						speed: 8
					},	{
						spriteLeft: 100,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -150,
						extraStepXRate: .1,
						speed: 8
					},	{
						spriteLeft: 150,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -160,
						extraStepXRate: .15,
						speed: 8
					},
						{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -140,
						extraStepXRate: .15,
						speed: 8
					},	{
						spriteLeft: 50,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -120,
						extraStepXRate: .1,
						speed: 8
					},	{
						spriteLeft: 100,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -90,
						extraStepXRate: .075,
						speed: 8
					},	{
						spriteLeft: 150,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -60,
						extraStepXRate: .05,
						speed: 8
					},	{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: -30,
						extraStepXRate: .025,
						speed: 8
					},	{
						spriteLeft: 50,
						spriteTop: 0,
						spriteWidth: 50,
						spriteHeight: 45,
						spriteOrigin: 25,
						bottomGap: 0,
						speed: 4,
						spell: {
							key: 'groundexplosion'
						}
					}
				]
			}
		}
	},
	earthspikes: {
		src: './images/main/warrior/wave2.png',
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: .65,
		invulnerable: true,
		still: true,
		class: __spell,
		name: 'Spikes',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 618,
						spriteWidth: 77,
						spriteHeight: 35,
						spriteOrigin: 39,
						bottomGap: 6,
						speed: 8,
						leftGap: 77,
						sound: 'crack',
					},
					{
						spriteLeft: 0,
						spriteTop: 528,
						spriteWidth: 155,
						spriteHeight: 77,
						spriteOrigin: 78,
						bottomGap: 6,
						leftGap: 232,
						speed: 8,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 409,
						spriteWidth: 161,
						spriteHeight: 111,
						spriteOrigin: 82,
						bottomGap: 6,
						leftGap: 393,
						speed: 8,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 223,
						spriteWidth: 293,
						spriteHeight: 179,
						spriteOrigin: 147,
						bottomGap: 6,
						leftGap: 686,
						speed: 8,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 2,
						spriteWidth: 405,
						spriteHeight: 217,
						spriteOrigin: 203,
						bottomGap: 6,
						leftGap: 1031,
						speed: 8,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 223,
						spriteWidth: 293,
						spriteHeight: 179,
						spriteOrigin: 147,
						bottomGap: 6,
						leftGap: 1143 + 112,
						speed: 8,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 409,
						spriteWidth: 161,
						spriteHeight: 111,
						spriteOrigin: 82,
						bottomGap: 6,
						leftGap: 1143 + 244,
						speed: 8
					},
					{
						spriteLeft: 0,
						spriteTop: 528,
						spriteWidth: 155,
						spriteHeight: 77,
						spriteOrigin: 78,
						bottomGap: 6,
						leftGap: 1143 + 250,
						speed: 7
					},
					{
						spriteLeft: 0,
						spriteTop: 618,
						spriteWidth: 77,
						spriteHeight: 35,
						spriteOrigin: 39,
						bottomGap: 6,
						speed: 6,
						leftGap: 1143 + 328
					}
				]
			}
		}
	},
	earthspikes2: {
		src: './images/main/warrior/spikes.png',
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		class: __spell,
		name: 'Spikes',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 1377,
						spriteTop: 303,
						spriteWidth: 78,
						spriteHeight: 27,
						spriteOrigin: 39,
						speed: 4,
						extraStepXRate: 1,
						sound: 'crack'
					},
					{
						spriteLeft: 12,
						spriteTop: 479,
						spriteWidth: 123,
						spriteHeight: 27,
						spriteOrigin: 62,
						extraStepXRate: 1,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							rate: .2,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 504,
						spriteTop: 479,
						spriteWidth: 156,
						spriteHeight: 27,
						spriteOrigin: 78,
						extraStepXRate: 1,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							rate: .2,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1020,
						spriteTop: 479,
						spriteWidth: 156,
						spriteHeight: 27,
						spriteOrigin: 78,
						extraStepXRate: 1,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1536,
						spriteTop: 479,
						spriteWidth: 156,
						spriteHeight: 27,
						spriteOrigin: 78,
						extraStepXRate: .9,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							rate: .2,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 225,
						spriteTop: 655,
						spriteWidth: 156,
						spriteHeight: 27,
						spriteOrigin: 78,
						extraStepXRate: .8,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							rate: .2,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 279,
						spriteTop: 25,
						spriteWidth: 144,
						spriteHeight: 141,
						spriteOrigin: 72,
						extraStepXRate: .7,
						speed: 4,
						sound: { key: 'rock', reset: true, volume: .8 },
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 729,
						spriteTop: 19,
						spriteWidth: 159,
						spriteHeight: 141,
						spriteOrigin: 80,
						speed: 4,
						objects: [
							{
								position:'canvas', 
								key: 'debris',
								p1: { color: '#b57064', strength: 2, xVelocity: .12, yVelocity:.001 } 
							}
						],
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1188,
						spriteTop: 16,
						spriteWidth: 162,
						spriteHeight: 144,
						spriteOrigin: 81,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1647,
						spriteTop: 25,
						spriteWidth: 165,
						spriteHeight: 135,
						spriteOrigin: 83,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 270,
						spriteTop: 222,
						spriteWidth: 165,
						spriteHeight: 114,
						spriteOrigin: 83,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 15,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 729,
						spriteTop: 228,
						spriteWidth: 165,
						spriteHeight: 102,
						spriteOrigin: 83,
						speed: 4
					},
					{
						spriteLeft: 1227,
						spriteTop: 321,
						spriteWidth: 87,
						spriteHeight: 9,
						spriteOrigin: 44,
						speed: 4
					}
				]
			}
		}
	},
	earthspikes3: {
		src: './images/main/warrior/spikes2.png',
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		still: true,
		class: __spell,
		name: 'Spikes',
		priority: 1,
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 206,
						spriteTop: 274,
						spriteWidth: 136,
						spriteHeight: 19,
						spriteOrigin: 68,
						speed: 4,
						leftGap: 60,
						sound: 'crack'
					},
					{
						spriteLeft: 693,
						spriteTop: 260,
						spriteWidth: 232,
						spriteHeight: 31,
						spriteOrigin: 116,
						leftGap: 110,
						speed: 4
					},
					{
						spriteLeft: 1231,
						spriteTop: 173,
						spriteWidth: 274,
						spriteHeight: 120,
						spriteOrigin: 137,
						leftGap: 165,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							rate: .2,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1763,
						spriteTop: 150,
						spriteWidth: 274,
						spriteHeight: 142,
						spriteOrigin: 137,
						leftGap: 220,
						speed: 4
					},
					{
						spriteLeft: 2280,
						spriteTop: 127,
						spriteWidth: 274,
						spriteHeight: 165,
						spriteOrigin: 137,
						leftGap: 280,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							rate: .2,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2822,
						spriteTop: 87,
						spriteWidth: 305,
						spriteHeight: 206,
						spriteOrigin: 153,
						leftGap: 340,
						speed: 4
					},
					{
						spriteLeft: 3370,
						spriteTop: 86,
						spriteWidth: 275,
						spriteHeight: 207,
						spriteOrigin: 138,
						leftGap: 400,
						speed: 8,
						bleed: true,
						sound: 'rock',
						atk: {
							yRange: 10,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3370,
						spriteTop: 86,
						spriteWidth: 275,
						spriteHeight: 207,
						spriteOrigin: 138,
						leftGap: 400,
						speed: 4
					},
					{
						spriteLeft: 3370,
						spriteTop: 86,
						spriteWidth: 275,
						spriteHeight: 207,
						spriteOrigin: 138,
						leftGap: 400,
						speed: 8,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3909,
						spriteTop: 86,
						spriteWidth: 274,
						spriteHeight: 207,
						spriteOrigin: 137,
						leftGap: 400,
						speed: 4
					},
					{
						spriteLeft: 4400,
						spriteTop: 105,
						spriteWidth: 274,
						spriteHeight: 188,
						spriteOrigin: 137,
						leftGap: 400,
						speed: 4,
						bleed: true,
						atk: {
							yRange: 10,
							hitTaken: .2,
							reset: 1,
							rate: .2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4977,
						spriteTop: 159,
						spriteWidth: 274,
						spriteHeight: 134,
						spriteOrigin: 137,
						leftGap: 400,
						speed: 4
					},
					{
						spriteLeft: 5536,
						spriteTop: 172,
						spriteWidth: 274,
						spriteHeight: 120,
						spriteOrigin: 137,
						leftGap: 400,
						speed: 4
					},
					{
						spriteLeft: 693 - 21,
						spriteTop: 260,
						spriteWidth: 274,
						spriteHeight: 31,
						spriteOrigin: 116 + 21,
						leftGap: 400,
						speed: 4
					},
					{
						spriteLeft: 206 - 69,
						spriteTop: 274,
						spriteWidth: 274,
						spriteHeight: 19,
						spriteOrigin: 68 + 69,
						leftGap: 400,
						speed: 4
					}
				]
			}
		}
	},
	tnt: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		src: './images/sprites/ep29/tnt.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'TNT',
		priority: 1,
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						sound: { key: 'beep',volume: .5, reset: true },
						speed: 4
					},
					{
						spriteLeft: 320,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 640,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						sound: { key: 'beep',volume: .5, reset: true },
						speed: 3
					},
					{
						spriteLeft: 320,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 3
					},
					{
						spriteLeft: 640,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 3
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						sound: { key: 'beep',volume: .5, reset: true },
						speed: 2
					},
					{
						spriteLeft: 320,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 2
					},
					{
						spriteLeft: 640,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 2
					},
					{
						spriteLeft: 960,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 320,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4,
						knockback: true,
						sound: { key: 'minebomb', volume: 1, reset: true },
						atk: {
							rate: 1,
							ignoreDef: true, 
							yRange: 10,
							aoe: 100,
							hurt: {
								smash: true,
								key: 'hurtair',
								type: 'air',
								reset: true,
								objects: [
									{
										key: 'crack', position: 'css', main: true
									},
									{
										key: 'shake', position: 'css'
									}
								]
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 320,
						spriteTop: 320,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 640,
						spriteTop: 320,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 960,
						spriteTop: 320,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 640,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 320,
						spriteTop: 640,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 640,
						spriteTop: 640,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					},
					{
						spriteLeft: 960,
						spriteTop: 640,
						spriteWidth: 320,
						spriteHeight: 320,
						spriteOrigin: 160,
						speed: 4
					}
				]
			}
		}
	},
	fireclaw: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		src: './images/sprites/ep29/fire-claw.png?v=2',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'Fire Claw',
		priority: 1,
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 131,
						spriteHeight: 169,
						spriteOrigin: 66,
						speed: 5,
						sound: { key: 'fireburst', volume: 1, reset: true },
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 139,
						spriteTop: 0,
						spriteWidth: 121,
						spriteHeight: 169,
						spriteOrigin: 61,
						extraStepXRate: 1.25,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 275,
						spriteTop: 0,
						spriteWidth: 152,
						spriteHeight: 169,
						spriteOrigin: 76,
						extraStepXRate: 1.25,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 438,
						spriteTop: 0,
						spriteWidth: 172,
						spriteHeight: 169,
						spriteOrigin: 86,
						extraStepXRate: 1.2,
						speed: 5,
						spell: {
							key: 'firewall4'
						},
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 616,
						spriteTop: 0,
						spriteWidth: 159,
						spriteHeight: 169,
						spriteOrigin: 80,
						extraStepXRate: 1.2,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 785,
						spriteTop: 0,
						spriteWidth: 171,
						spriteHeight: 169,
						spriteOrigin: 86,
						extraStepXRate: 1.15,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 962,
						spriteTop: 0,
						spriteWidth: 159,
						spriteHeight: 169,
						spriteOrigin: 80,
						extraStepXRate: 1.1,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1127,
						spriteTop: 0,
						spriteWidth: 170,
						spriteHeight: 169,
						spriteOrigin: 85,
						extraStepXRate: 1.05,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1330,
						spriteTop: 0,
						spriteWidth: 147,
						spriteHeight: 169,
						spriteOrigin: 74,
						extraStepXRate: 1,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true,
								burn: true
							},
							type: 'fire'
						}
					}
				]
			}
		}
	},
	emegenspit: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		src: './images/sprites/ep03/spit.png',
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		name: 'Spit',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 56,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						speed: 5
					},
					{
						spriteLeft: 0,
						spriteTop: 56,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 75,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 150,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 225,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 300,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 375,
						spriteTop: 0,
						spriteWidth: 75,
						spriteHeight: 56,
						spriteOrigin: 38,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					}
				]
			}
		}
	},
	suicide: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2.5,
		noRemove: true,
		src: './images/sprites/ep623/eplosion.png',
		invulnerable: true,
		pierce: true,
		class: __spell,
		name: 'Suicide',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 137 * 4,
						spriteTop: 600,
						spriteWidth: 137,
						spriteHeight: 200,
						spriteOrigin: 69,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				priority: 1,
				frames: [
						{
							spriteLeft: 137,
							spriteTop: 0,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 1
						},
						{
							spriteLeft: 137,
							spriteTop: 0,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							knockback: true,
							priority:1,
							sound: { key: 'jesperboom', volume:1},
							atk: {
								yRange: 15,
								rate: 5,
								hitTaken: 1,
								push: 5,
								aoe: 200,
								hurt: {
									key: 'hurtair',
									type: 'air',
									knockback: 3
								},
								type: 'common'
							},
							speed: 5
						},
						{
							spriteLeft: 137 * 2,
							spriteTop: 0,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 3,
							spriteTop: 0,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 4,
							spriteTop: 0,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 0,
							spriteTop: 200,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 1,
							spriteTop: 200,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 2,
							spriteTop: 200,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 3,
							spriteTop: 200,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 4,
							spriteTop: 200,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 0,
							spriteTop: 400,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 1,
							spriteTop: 400,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 2,
							spriteTop: 400,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 3,
							spriteTop: 400,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 4,
							spriteTop: 400,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 0,
							spriteTop: 600,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 1,
							spriteTop: 600,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 2,
							spriteTop: 600,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						},
						{
							spriteLeft: 137 * 3,
							spriteTop: 600,
							spriteWidth: 137,
							spriteHeight: 200,
							spriteOrigin: 69,
							speed: 6
						}
				]
			}
		}
	},
	emegenspit2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: .6,
		src: './images/sprites/ep03/spit2.png',
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		name: 'Emegen Spit',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 784,
						spriteTop: 155,
						spriteWidth: 42,
						spriteHeight: 42,
						spriteOrigin: 82,
						bottomGap: -113,
						sound: { key: 'emegenspitdead', volume: .3 },
						speed: 4
					},
					{
						spriteLeft: 848,
						spriteTop: 121,
						spriteWidth: 52,
						spriteHeight: 86,
						spriteOrigin: 26,
						bottomGap: -103,
						speed: 4
					},
					{
						spriteLeft: 927,
						spriteTop: 84,
						spriteWidth: 86,
						spriteHeight: 154,
						spriteOrigin: 43,
						bottomGap: -72,
						speed: 4
					},
					{
						spriteLeft: 1044,
						spriteTop: 46,
						spriteWidth: 130,
						spriteHeight: 262,
						spriteOrigin: 65,
						bottomGap: -2,
						speed: 4
					},
					{
						spriteLeft: 1195,
						spriteTop: 23,
						spriteWidth: 150,
						spriteHeight: 270,
						spriteOrigin: 75,
						bottomGap: -17,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 18,
						spriteTop: 168,
						spriteWidth: 36,
						spriteHeight: 10,
						spriteOrigin: 18,
						bottomGap: -132,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 72,
						spriteTop: 166,
						spriteWidth: 98,
						spriteHeight: 14,
						spriteOrigin: 49,
						bottomGap: -130,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 192,
						spriteTop: 167,
						spriteWidth: 164,
						spriteHeight: 18,
						spriteOrigin: 82,
						bottomGap: -125,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 376,
						spriteTop: 163,
						spriteWidth: 158,
						spriteHeight: 24,
						spriteOrigin: 79,
						bottomGap: -123,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 567,
						spriteTop: 165,
						spriteWidth: 108,
						spriteHeight: 22,
						spriteOrigin: 54,
						bottomGap: -123,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							reset: 1,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 709,
						spriteTop: 163,
						spriteWidth: 54,
						spriteHeight: 24,
						spriteOrigin: 27,
						bottomGap: -123,
						extraStepXRate: .6,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					}
				]
			}
		}
	},
	itbu1: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 1',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						sound: { key: 'claw', reset: true, volume: .75 },
						extraStepXRate: 2,
						extraStepYRate: .5,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: .35,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: -.35,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: -.5,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2620,
						spriteTop: 70,
						spriteWidth: 300,
						spriteHeight: 260,
						spriteOrigin: 105,
						shadow: 'red',
						speed: 8,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	itbu2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 2',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: .5,
						sound: { key: 'claw', reset: true, volume: .75 },
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: .35,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: -.35,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: -.5,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2619,
						spriteTop: 459,
						spriteWidth: 310,
						spriteHeight: 216,
						spriteOrigin: 96,
						shadow: 'red',
						speed: 8,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	itbu3: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 3',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 5036,
						spriteTop: 1848,
						spriteWidth: 146,
						spriteHeight: 207,
						spriteOrigin: 73,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: .5,
						sound: { key: 'claw', reset: true, volume: .75 },
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 5036,
						spriteTop: 1848,
						spriteWidth: 146,
						spriteHeight: 207,
						spriteOrigin: 73,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: .35,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4403,
						spriteTop: 1848,
						spriteWidth: 170,
						spriteHeight: 207,
						spriteOrigin: 85,
						extraStepXRate: 2,
						extraStepYRate: -.35,
						shadow: 'red',
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4403,
						spriteTop: 1848,
						spriteWidth: 170,
						spriteHeight: 207,
						spriteOrigin: 85,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: -.5,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3763,
						spriteTop: 1890,
						spriteWidth: 246,
						spriteHeight: 165,
						spriteOrigin: 123,
						bottomGap: 15,
						shadow: 'red',
						speed: 8,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	itbu4: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 4',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: .5,
						sound: { key: 'claw', reset: true, volume: .75 },
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: .35,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: -.35,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2,
						extraStepYRate: -.5,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1976,
						spriteTop: 1837,
						spriteWidth: 244,
						spriteHeight: 224,
						spriteOrigin: 122,
						shadow: 'red',
						speed: 8,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 1000,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	itbu1faster: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 1 Faster',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						sound: { key: 'claw', reset: true, volume: .75 },
						extraStepXRate: 2* 1.33,
						extraStepYRate: .5* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						extraStepXRate: 2 * 1.33,
						extraStepYRate: .35 * 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						extraStepXRate: 2 * 1.33,
						extraStepYRate: -.35 * 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1,
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3190,
						spriteTop: 70,
						spriteWidth: 180,
						spriteHeight: 260,
						spriteOrigin: 90,
						shadow: 'red',
						extraStepXRate: 2 * 1.33,
						extraStepYRate: -.5 * 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2620,
						spriteTop: 70,
						spriteWidth: 300,
						spriteHeight: 260,
						spriteOrigin: 105,
						shadow: 'red',
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	itbu2faster: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 2 Faster',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: .5* 1.33,
						sound: { key: 'claw', reset: true, volume: .75 },
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: .35* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: -.35* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3159,
						spriteTop: 459,
						spriteWidth: 222,
						spriteHeight: 216,
						spriteOrigin: 108,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: -.5* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2619,
						spriteTop: 459,
						spriteWidth: 310,
						spriteHeight: 216,
						spriteOrigin: 96,
						shadow: 'red',
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	itbu3faster: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 3 Faster',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 5036,
						spriteTop: 1848,
						spriteWidth: 146,
						spriteHeight: 207,
						spriteOrigin: 73,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: .5* 1.33,
						sound: { key: 'claw', reset: true, volume: .75 },
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 5036,
						spriteTop: 1848,
						spriteWidth: 146,
						spriteHeight: 207,
						spriteOrigin: 73,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: .35* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4403,
						spriteTop: 1848,
						spriteWidth: 170,
						spriteHeight: 207,
						spriteOrigin: 85,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: -.35* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4403,
						spriteTop: 1848,
						spriteWidth: 170,
						spriteHeight: 207,
						spriteOrigin: 85,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: -.5* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3763,
						spriteTop: 1890,
						spriteWidth: 246,
						spriteHeight: 165,
						spriteOrigin: 123,
						bottomGap: 15,
						shadow: 'red',
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	itbu4faster: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.6,
		src: './images/sprites/ep29/sprite2.png',
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		name: 'It Barak Ultimate 4 Faster',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: .5* 1.33,
						sound: { key: 'claw', reset: true, volume: .75 },
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: .35* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: -.35* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 3192,
						spriteTop: 847,
						spriteWidth: 230,
						spriteHeight: 174,
						spriteOrigin: 115,
						bottomGap: 5,
						shadow: 'red',
						extraStepXRate: 2* 1.33,
						extraStepYRate: -.5* 1.33,
						speed: 3,
						atk: {
							yRange: 10,
							rate: .1,
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1976,
						spriteTop: 1837,
						spriteWidth: 244,
						spriteHeight: 224,
						spriteOrigin: 122,
						shadow: 'red',
						speed: 6,
						atk: {
							yRange: 10,
							rate: .1, 
							hitTaken: .1,
							reset:1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [
									{
										key: 'claw',
										position: 'css',
										p2: 750,
										main: true
									}
								]
							},
							type: 'common'
						}
					}
				]
			}
		}
	},
	poisoncloud: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		src: './images/sprites/ep07/poison.png',
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		name: 'Poisoncloud',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 710,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						extraStepXRate: 1.5,
						speed: 6
					},
					{
						spriteLeft: 600,
						spriteTop: 710,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						sound: { key: 'poisoncloud', volume:.5},
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1200,
						spriteTop: 710,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1800,
						spriteTop: 710,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 2400,
						spriteTop: 710,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 1065,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						speed: 6,
						bottomGap: 80,
						atk: {
							yRange: 10,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 1065,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1200,
						spriteTop: 1065,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1800,
						spriteTop: 1065,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 2400,
						spriteTop: 1065,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 1420,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 600,
						spriteTop: 1420,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 1200,
						spriteTop: 1420,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1800,
						spriteTop: 1420,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 2400,
						spriteTop: 1420,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 1775,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 600,
						spriteTop: 1775,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1200,
						spriteTop: 1775,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 1800,
						spriteTop: 1775,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 2400,
						spriteTop: 1775,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 2130,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 2130,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1200,
						spriteTop: 2130,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1800,
						spriteTop: 2130,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 2400,
						spriteTop: 2130,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 2485,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 600,
						spriteTop: 2485,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1200,
						spriteTop: 2485,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1800,
						spriteTop: 2485,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 2400,
						spriteTop: 2485,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 2840,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 600,
						spriteTop: 2840,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 6
					},
					{
						spriteLeft: 1200,
						spriteTop: 2840,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						speed: 5
					},
					{
						spriteLeft: 1200,
						spriteTop: 2840,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						bottomGap: 80,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 3
					},
					{
						spriteLeft: 0,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						},
						speed: 1
					},
					{
						spriteLeft: 600,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 3
					},
					{
						spriteLeft: 600,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 1,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						},
					},
					{
						spriteLeft: 1200,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 3
					},
					{
						spriteLeft: 1200,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 1,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						},
					},
					{
						spriteLeft: 1800,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 3
					},
					{
						spriteLeft: 1800,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 1,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						},
					},
					{
						spriteLeft: 2400,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 3
					},
					{
						spriteLeft: 2400,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 335,
						spriteOrigin: 300,
						extraStepXRate: 1.5,
						speed: 1,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						},
					}
				]
			}
		}
	},
	rasengan: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2.3,
		src: './images/sprites/ep83/rasengan.png',
		invulnerable: true,
		class: __spell,
		name: 'Rasengan',
		pierce: true,
		priority: 1,
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 1,
						spriteOrigin: 50,
						bottomGap: -48,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				priority: 1,
				frames: [
					{
						spriteLeft: 12,
						spriteTop: 0,
						spriteWidth: 43,
						spriteHeight: 70,
						sound:{key:'powercharge',  volume:.3},
						spriteOrigin: 16,
						speed: 4
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 23,
						speed: 4
					},
					{
						spriteLeft: 155,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 220,
						spriteTop: 0,
						spriteWidth: 42,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 12,
						spriteTop: 0,
						spriteWidth: 43,
						spriteHeight: 70,
						spriteOrigin: 16,
						speed: 4
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 23,
						speed: 4
					},
					{
						spriteLeft: 155,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 220,
						spriteTop: 0,
						spriteWidth: 42,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 12,
						spriteTop: 0,
						spriteWidth: 43,
						spriteHeight: 70,
						spriteOrigin: 16,
						speed: 4
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 23,
						speed: 4
					},
					{
						spriteLeft: 155,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 220,
						spriteTop: 0,
						spriteWidth: 42,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 12,
						spriteTop: 0,
						spriteWidth: 43,
						spriteHeight: 70,
						spriteOrigin: 16,
						speed: 4
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 23,
						speed: 4
					},
					{
						spriteLeft: 155,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 220,
						spriteTop: 0,
						spriteWidth: 42,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 12,
						spriteTop: 0,
						spriteWidth: 43,
						spriteHeight: 70,
						spriteOrigin: 16,
						speed: 4
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 23,
						speed: 4
					},
					{
						spriteLeft: 155,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 220,
						spriteTop: 0,
						spriteWidth: 42,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 12,
						spriteTop: 0,
						spriteWidth: 43,
						spriteHeight: 70,
						spriteOrigin: 16,
						speed: 4
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 23,
						speed: 4
					},
					{
						spriteLeft: 155,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 220,
						spriteTop: 0,
						spriteWidth: 42,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 12,
						spriteTop: 0,
						spriteWidth: 43,
						spriteHeight: 70,
						spriteOrigin: 16,
						speed: 4
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 23,
						speed: 4
					},
					{
						spriteLeft: 155,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 70,
						spriteOrigin: 24,
						speed: 4
					},
					{
						spriteLeft: 12,
						spriteTop: 15,
						src: './images/sprites/ep83/boom.png',
						spriteWidth: 48,
						spriteHeight: 70,
						spriteOrigin: 24,
						do: function(_e) {
							const _rel = _e.related;
							if(_rel && _rel.animation !== 'dead')
								_rel.animate('dead', 1);
						},
						atk: {
							rate: 50,
							yRange: 10,
							aoe: 100,
							push: 3,
							hurt: {
								type: 'air',
								key: 'hurtair'
							},
							type: 'common'
						},
						sound: { key: 'minebomb',volume: 1, reset: true },
						speed: 4
					},
					{
						spriteLeft: 73,
						spriteTop: 0,
						src: './images/sprites/ep83/boom.png',
						spriteWidth: 67,
						spriteHeight: 98,
						bottomGap: -14,
						spriteOrigin: 34,
						speed: 4
					},
					{
						spriteLeft: 149,
						spriteTop: 0,
						src: './images/sprites/ep83/boom.png',
						spriteWidth: 94,
						spriteHeight: 98,
						bottomGap: 14,
						spriteOrigin: 47,
						speed: 4
					},
					{
						spriteLeft: 255,
						spriteTop: 0,
						src: './images/sprites/ep83/boom.png',
						spriteWidth: 96,
						spriteHeight: 98,
						bottomGap: 14,
						spriteOrigin: 48,
						speed: 4
					},
					{
						spriteLeft: 372,
						spriteTop: 0,
						src: './images/sprites/ep83/boom.png',
						spriteWidth: 88,
						spriteHeight: 98,
						bottomGap: 14,
						spriteOrigin: 44,
						speed: 4
					},
					{
						spriteLeft: 481,
						spriteTop: 0,
						src: './images/sprites/ep83/boom.png',
						spriteWidth: 70,
						spriteHeight: 98,
						bottomGap: 14,
						spriteOrigin: 35,
						speed: 4
					},
					{
						spriteLeft: 573,
						spriteTop: 0,
						src: './images/sprites/ep83/boom.png',
						spriteWidth: 43,
						spriteHeight: 98,
						bottomGap: 14,
						spriteOrigin: 22,
						speed: 4
					}
				]
			}
		}
	},
	poisonbubbles: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		src: './images/sprites/ep07/bubbles.png',
		invulnerable: true,
		class: __spell,
		drawPriority: .5,
		name: 'Poisonbubbles',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 141,
						spriteTop: 201,
						spriteWidth: 196,
						spriteHeight: 73,
						spriteOrigin: 149,
						bottomGap: 14,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 1333,
						spriteTop: 198,
						spriteWidth: 172,
						spriteHeight: 75,
						spriteOrigin: ((580 * 2) + 290) - 1333,
						bottomGap: 13,
						sound: { key: 'poisoncloud', volume:.5},
						speed: 6
					},
					{
						spriteLeft: 2483,
						spriteTop: 194,
						spriteWidth: 192,
						spriteHeight: 74,
						spriteOrigin: ((580 * 4) + 290) - 2483,
						bottomGap: 8,
						speed: 6
					},
					{
						spriteLeft: 3635,
						spriteTop: 184,
						spriteWidth: 206,
						spriteHeight: 98,
						spriteOrigin: ((580 * 6) + 290) - 3635,
						bottomGap: 22,
						speed: 6
					},
					{
						spriteLeft: 152,
						spriteTop: 582,
						spriteWidth: 218,
						spriteHeight: 112,
						spriteOrigin: ((580 * 0) + 290) - 152,
						speed: 6,
						bottomGap: 23,
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 1307,
						spriteTop: 579,
						spriteWidth: 262,
						spriteHeight: 115,
						spriteOrigin: ((580 * 2) + 290) - 1307,
						bottomGap: 23,
						speed: 6
					},
					{
						spriteLeft: 2464,
						spriteTop: 567,
						spriteWidth: 277,
						spriteHeight: 127,
						spriteOrigin: ((580 * 4) + 290) - 2464,
						bottomGap: 23,
						speed: 6
					},
					{
						spriteLeft: 3604,
						spriteTop: 548,
						spriteWidth: 317,
						spriteHeight: 145,
						spriteOrigin: ((580 * 6) + 290) - 3604,
						bottomGap: 22,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 114,
						spriteTop: 939,
						spriteWidth: 342,
						spriteHeight: 161,
						spriteOrigin: ((580 * 0) + 290) - 114,
						bottomGap: 18,
						speed: 6
					},
					{
						spriteLeft: 1269,
						spriteTop: 970,
						spriteWidth: 351,
						spriteHeight: 128,
						spriteOrigin: ((580 * 2) + 290) - 1269,
						bottomGap: 16,
						speed: 6
					},
					{
						spriteLeft: 2425,
						spriteTop: 966,
						spriteWidth: 382,
						spriteHeight: 131,
						spriteOrigin: ((580 * 4) + 290) - 2425,
						bottomGap: 15,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 3585,
						spriteTop: 967,
						spriteWidth: 346,
						spriteHeight: 129,
						spriteOrigin: ((580 * 6) + 290) - 3585,
						bottomGap: 14,
						speed: 6
					},
					{
						spriteLeft: 154,
						spriteTop: 1384,
						spriteWidth: 264,
						spriteHeight: 123,
						spriteOrigin: ((580 * 0) + 290) - 154,
						bottomGap: 14,
						speed: 6
					},
					{
						spriteLeft: 1307,
						spriteTop: 1393,
						spriteWidth: 270,
						spriteHeight: 114,
						spriteOrigin: ((580 * 2) + 290) - 1307,
						bottomGap: 14,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 2459,
						spriteTop: 1404,
						spriteWidth: 272,
						spriteHeight: 103,
						spriteOrigin: 151,
						bottomGap: 14,
						speed: 6
					},
					{
						spriteLeft: 3612,
						spriteTop: 1384,
						spriteWidth: 278,
						spriteHeight: 118,
						spriteOrigin: ((580 * 6) + 290) - 3612,
						bottomGap: 9,
						speed: 6
					},
					{
						spriteLeft: 122,
						spriteTop: 1785,
						spriteWidth: 278,
						spriteHeight: 140,
						spriteOrigin: ((580 * 0) + 290) - 122,
						bottomGap: 21,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 1270,
						spriteTop: 1782,
						spriteWidth: 287,
						spriteHeight: 144,
						spriteOrigin: ((580 * 2) + 290) - 1270,
						bottomGap: 22,
						speed: 6
					},
					{
						spriteLeft: 2417,
						spriteTop: 1781,
						spriteWidth: 300,
						spriteHeight: 146,
						spriteOrigin: ((580 * 4) + 290) - 2417,
						bottomGap: 23,
						speed: 6
					},
					{
						spriteLeft: 3568,
						spriteTop: 1794,
						spriteWidth: 312,
						spriteHeight: 134,
						spriteOrigin: ((580 * 6) + 290) - 3568,
						bottomGap: 26,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 240,
						spriteTop: 2280,
						spriteWidth: 156,
						spriteHeight: 57,
						spriteOrigin: ((580 * 0) + 290) - 240,
						bottomGap: 22,
						speed: 6
					},
					{
						spriteLeft: 1401,
						spriteTop: 2273,
						spriteWidth: 156,
						spriteHeight: 60,
						spriteOrigin: ((580 * 2) + 290) - 1401,
						bottomGap: 18,
						speed: 6
					},
					{
						spriteLeft: 2547,
						spriteTop: 2273,
						spriteWidth: 170,
						spriteHeight: 60,
						spriteOrigin: ((580 * 4) + 290) - 2547,
						bottomGap: 18,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 3692,
						spriteTop: 2283,
						spriteWidth: 187,
						spriteHeight: 47,
						spriteOrigin: ((580 * 6) + 290) - 3692,
						bottomGap: 15,
						speed: 6
					},
					{
						spriteLeft: 206,
						spriteTop: 2694,
						spriteWidth: 149,
						spriteHeight: 47,
						spriteOrigin: ((580 * 0) + 290) - 206,
						bottomGap: 15,
						speed: 6
					},
					{
						spriteLeft: 1367,
						spriteTop: 2675,
						spriteWidth: 148,
						spriteHeight: 65,
						spriteOrigin: ((580 * 2) + 290) - 1367,
						bottomGap: 14,
						speed: 6
					},
					{
						spriteLeft: 1367,
						spriteTop: 2675,
						spriteWidth: 148,
						spriteHeight: 65,
						spriteOrigin: ((580 * 2) + 290) - 1367,
						bottomGap: 14,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 245,
						spriteOrigin: 300,
						extraStepXRate: .65,
						src: './images/sprites/ep07/poison.png',
						speed: 6
					},
					{
						spriteLeft: 600,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 245,
						spriteOrigin: 300,
						extraStepXRate: .65,
						src: './images/sprites/ep07/poison.png',
						speed: 6
					},
					{
						spriteLeft: 1200,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 245,
						spriteOrigin: 300,
						extraStepXRate: .65,
						src: './images/sprites/ep07/poison.png',
						speed: 6
					},
					{
						spriteLeft: 1800,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 245,
						spriteOrigin: 300,
						extraStepXRate: .65,
						src: './images/sprites/ep07/poison.png',
						speed: 6
					},
					{
						spriteLeft: 2400,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 245,
						spriteOrigin: 300,
						extraStepXRate: .65,
						src: './images/sprites/ep07/poison.png',
						speed: 5
					},
					{
						spriteLeft: 2400,
						spriteTop: 355,
						spriteWidth: 600,
						spriteHeight: 245,
						spriteOrigin: 300,
						extraStepXRate: .65,
						src: './images/sprites/ep07/poison.png',
						speed: 1,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						},
					}
				]
			}
		}
	},
	poisonball: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		src: './images/sprites/ep30/poison-bolt.png',
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		name: 'Poisonball',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 256,
						spriteTop: 192 * 7,
						spriteWidth: 256,
						spriteHeight: 192,
						spriteOrigin: 128,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 256 + 512,
						spriteTop: 192 * 7,
						spriteWidth: 256,
						sound: { key: 'ballhit', volume: .2 },
						spriteHeight: 192,
						spriteOrigin: 128,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 256,
						spriteTop: 192 * 8,
						spriteWidth: 256,
						spriteHeight: 192,
						spriteOrigin: 128,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 256 + 512,
						spriteTop: 192 * 8,
						spriteWidth: 256,
						spriteHeight: 192,
						spriteOrigin: 128,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 256,
						spriteTop: 192 * 9,
						spriteWidth: 256,
						spriteHeight: 192,
						spriteOrigin: 128,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 256 + 512,
						spriteTop: 192 * 9,
						spriteWidth: 256,
						spriteHeight: 192,
						spriteOrigin: 128,
						bottomGap: -50,
						speed: 3
					},
					{
						spriteLeft: 256 + 512,
						spriteTop: 192 * 9,
						spriteWidth: 256,
						spriteHeight: 192,
						spriteOrigin: 128,
						bottomGap: -50,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 114,
						spriteTop: 192,
						spriteWidth: 59,
						spriteHeight: 192,
						spriteOrigin: 30,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 614,
						spriteTop: 192,
						spriteWidth: 74,
						spriteHeight: 192,
						spriteOrigin: 45,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 87,
						spriteTop: 192 * 2,
						spriteWidth: 95,
						spriteHeight: 192,
						spriteOrigin: 60,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 586,
						spriteTop: 192 * 2,
						spriteWidth: 108,
						spriteHeight: 192,
						spriteOrigin: 73,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 59,
						spriteTop: 192 * 3,
						spriteWidth: 115,
						spriteHeight: 192,
						spriteOrigin: 85,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 560,
						spriteTop: 192 * 3,
						spriteWidth: 126,
						spriteHeight: 192,
						spriteOrigin: 97,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 47,
						spriteTop: 192 * 4,
						spriteWidth: 127,
						spriteHeight: 192,
						spriteOrigin: 97,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 554,
						spriteTop: 192 * 4,
						spriteWidth: 138,
						spriteHeight: 192,
						spriteOrigin: 103,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 34,
						spriteTop: 192 * 5,
						spriteWidth: 140,
						spriteHeight: 192,
						spriteOrigin: 110,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 540,
						spriteTop: 192 * 5,
						spriteWidth: 146,
						spriteHeight: 192,
						spriteOrigin: 116,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 20,
						spriteTop: 192 * 6,
						spriteWidth: 154,
						spriteHeight: 192,
						spriteOrigin: 124,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4
					},
					{
						spriteLeft: 528,
						spriteTop: 192 * 6,
						spriteWidth: 160,
						spriteHeight: 192,
						spriteOrigin: 129,
						extraStepXRate: 1,
						bottomGap: -50,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
				]
			}
		}
	},
	web: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		src: './images/sprites/ep10/web.png',
		invulnerable: true,
		extraStepXRate: 2,
		class: __spell,
		name: 'Web',
		animations: {
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 192,
						spriteHeight: 192,
						spriteOrigin: 96,
						extraStepXRate: .8,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								buffs: [{
									level: 1,
									key: 'web'
								}],
								objects: [{
									key: 'web',
									position: 'under-feet'
								}],
								type: 'common'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 192,
						spriteTop: 0,
						spriteWidth: 192,
						spriteHeight: 192,
						spriteOrigin: 96,
						extraStepXRate: .8,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								buffs: [{
									level: 1,
									key: 'web'
								}],
								objects: [{
									key: 'web',
									position: 'under-feet'
								}],
								type: 'common'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 192 * 2,
						spriteTop: 0,
						spriteWidth: 192,
						spriteHeight: 192,
						spriteOrigin: 96,
						extraStepXRate: .8,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								buffs: [{
									level: 1,
									key: 'web'
								}],
								objects: [{
									key: 'web',
									position: 'under-feet'
								}],
								type: 'common'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 192 * 3,
						spriteTop: 0,
						spriteWidth: 192,
						spriteHeight: 192,
						spriteOrigin: 96,
						extraStepXRate: .8,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								buffs: [{
									level: 1,
									key: 'web'
								}],
								objects: [{
									key: 'web',
									position: 'under-feet'
								}],
								type: 'common'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 192 * 4,
						spriteTop: 0,
						spriteWidth: 192,
						spriteHeight: 192,
						spriteOrigin: 96,
						extraStepXRate: .8,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								buffs: [{
									level: 1,
									key: 'web'
								}],
								objects: [{
									key: 'web',
									position: 'under-feet'
								}],
								type: 'common'
							},
							type: 'toxic'
						}
					}
				]
			}
		}
	},
	timestop: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.91,
		width: 520,
		invulnerable: true,
		autoAim: 50,
		pierce: true,
		hasShadow: false,
		still: true,
		class: __spell,
		src: './images/sprites/common/timestop.png',
		name: 'Timestop',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				maxRepeat: 2,
				move: true,
				frames: [
					{
						spriteLeft: (0 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						sound: { key: 'void', bind: true },
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,
							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (1 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (2 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (3 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (4 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (5 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (6 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (7 * 800) + 160,
						spriteTop: (0 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (0 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (1 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (2 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (3 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (4 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (5 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (6 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (7 * 800) + 160,
						spriteTop: (1 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (0 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (1 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (2 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (3 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (4 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (5 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (6 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (7 * 800) + 160,
						spriteTop: (2 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (0 * 800) + 160,
						spriteTop: (3 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (1 * 800) + 160,
						spriteTop: (3 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (2 * 800) + 160,
						spriteTop: (3 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (3 * 800) + 160,
						spriteTop: (3 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (4 * 800) + 160,
						spriteTop: (3 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (5 * 800) + 160,
						spriteTop: (3 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					},
					{
						spriteLeft: (6 * 800) + 160,
						spriteTop: (3 * 600) + 33,
						spriteWidth: 515,
						spriteHeight: 300,
						spriteOrigin: 258,
						speed: 8,
						objects: [{ key: 'void', position: 'under-feet', scale: 3.05 }],
						atk: {
							yRange: 10,

							buffs: [{
								key: 'timestop',
								level: 1
							}]
						}
					}
				]
			}
		}
	},
	lestatthunder: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.5,
		width: 450,
		invulnerable: true,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep01/thunder.png',
		name: 'WaterThunder',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 29,
						objects: [{ key: 'cast', position: 'css' }],
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 90,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						sound: { key: 'lestatthunder' },
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 570,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1050,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1530,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 90,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						atk: {
							rate: 3,
							yRange: 15,
							aoe: 100,
							hurt: {
								type: 'air',
								key: 'hurtair'
							},
							type: 'lightning'
						},
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 570,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1050,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						atk: {
							rate: 3,
							yRange: 15,
							aoe: 100,
							hurt: {
								type: 'air',
								key: 'hurtair'
							},
							type: 'lightning'
						},
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1530,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 90,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 570,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1050,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1530,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 480,
						spriteOrigin: 150,
						speed: 6,
						def: {
							iframe: true
						}
					},
				]
			}
		}
	},
	earthrock: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		width: 400,
		invulnerable: true,
		autoAim: 50,
		pierce: true,
		class: __spell,
		src: './images/main/warrior/rock-bomb.png',
		name: 'Earth Rock',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: createFrames(4, 45, 400, 400, 9,
						{
							yRange: 10,
							hitTaken: .1,
							reset: true,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}, {key:'rockobom', volume:.5, reset: true})
			}
		}
	},
	corpseexplode: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 4,
		width: 48,
		invulnerable: true,
		autoAim: 100,
		pierce: true,
		class: __spell,
		src: './images/related/ghost.png',
		name: 'Corpse Explode',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						bottomGap:10,
						speed: 2
					},
						{
						spriteLeft: 512,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 241,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
						{
						spriteLeft: 512,
						spriteTop: 241,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 241 * 2,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
						{
						spriteLeft: 512,
						spriteTop: 241 * 2,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 241 * 3,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
						{
						spriteLeft: 512,
						spriteTop: 241 * 3,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 241 * 4,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spell: {
							key: 'groundexplosion',
							xGap: -130,
							harmless: true
						},
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
						{
						spriteLeft: 512,
						spriteTop: 241 * 4,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 241 * 5,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
					{
						spriteLeft: 512,
						spriteTop: 241 * 5,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 241 * 6,
						spriteWidth: 256,
						spriteHeight: 241 - 62,
						bottomGap:10,
						spriteOrigin: 128,
						src: './images/related/target.png',
						zoom: .7,
						speed: 2,
						objects: [{
							key: 'bombshock',
							position: 'css'
						}],
						atk: {
							yRange: 20,
							rate: .1,
							ignoreDef: true,
							hitTaken: .5,
							reset: true,
							aoe: 20,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								smash: true
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
						{
						spriteLeft: 48,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 2,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 3,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 4,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 5,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 6,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 7,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 8,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 9,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 10,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 11,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 12,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 13,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 14,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 48 * 15,
						spriteTop: 0,
						spriteWidth: 48,
						spriteHeight: 64,
						spriteOrigin: 24,
						bottomGap: -20,
						speed: 4
					}
				]
			}
		}
	},
	icespike: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 2,
		width: 256,
		invulnerable: true,
		autoAim: 50,
		pierce: true,
		class: __spell,
		src: './images/sprites/common/icespike.png',
		name: 'Icespike',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 1280,
						spriteTop: 192,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4,
						sound: { key: 'icespike' }
					},
					{
						spriteLeft: 1536,
						spriteTop: 192,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 1792,
						spriteTop: 192,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 2048,
						spriteTop: 192,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'puf1',
									position: 'over-head',
									scale: 1.5
								}]
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 2304,
						spriteTop: 192,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 384,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'puf1',
									position: 'over-head',
									scale: 1.5
								}]
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 256,
						spriteTop: 384,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 512,
						spriteTop: 384,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'puf1',
									position: 'over-head',
									scale: 1.5
								}]
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 768,
						spriteTop: 384,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 1024,
						spriteTop: 384,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'puf1',
									position: 'over-head',
									scale: 1.5
								}]
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 1280,
						spriteTop: 384,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 40,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'puf1',
									position: 'over-head',
									scale: 1.5
								}]
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 768,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 1024,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: 20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'puf1',
									position: 'over-head',
									scale: 1.5
								}]
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 1280,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 180,
						bottomGap: 20,
						spriteOrigin: 128,
						speed: 4
					},
					{
						spriteLeft: 1536,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 180,
						bottomGap: 20,
						spriteOrigin: 128,
						speed: 4
					},
					{
						spriteLeft: 1792,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 180,
						bottomGap: 20,
						spriteOrigin: 128,
						speed: 4
					}
				]
			}
		}
	},
	darkbolt: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 4,
		width: 64,
		invulnerable: true,
		autoAim: 50,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep29/darkbolt.png',
		name: 'Dark Bolt',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4,
						sound: { key: 'icespike' }
					},
					{
						spriteLeft: 64,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 64 * 2,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 64 * 3,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 64 * 4,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .66,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 64 * 5,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 64 * 6,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .66,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 64 * 7,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 64 * 8,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .66,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 64 * 9,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4
					},
					{
						spriteLeft: 64 * 10,
						spriteTop: 0,
						spriteWidth: 64,
						spriteHeight: 88,
						spriteOrigin: 32,
						bottomGap: -20,
						speed: 4
					}
				]
			}
		}
	},
	mine: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		width: 160,
		invulnerable: true,
		still: true,
		noDirection: true,
		noLoot: true,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep75/mine.png',
		name: 'Mine',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						def: {
							iframe: true
						},
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						bottomGap: -80,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						bottomGap: -40,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						sound: { key: 'bombplant', reset: true, bind: true },
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						sound: { key: 'timebomb', reset: true, bind: true },
						objects: [{ key: 'cast', position: 'css' }],
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 4,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 4,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 4,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 1,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 4,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -2,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 3,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 2,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 3,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -2,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 3,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 2,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 3,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -3,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 2,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 3,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 2,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: -3,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 2,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 3,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 2,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 150,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						knockback: true,
						objects: [
							{ key: 'shake', position: 'css' }
						],
						atk: {
							rate: 3,
							yRange: 15,
							aoe: 100,
							push: 4,
							hurt: {
								type: 'air',
								key: 'hurtair'
							},
							type: 'fire'
						},
						sound: { key: 'minebomb',volume: 1, reset: true },
					},
					{
						spriteLeft: 300,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6
					},
					{
						spriteLeft: 450,
						spriteTop: 0,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 150,
						spriteTop: 85,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 300,
						spriteTop: 85,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 6,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 450,
						spriteTop: 85,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 5,
						def: {
							iframe: true
						}
					},
					{
						spriteLeft: 450,
						spriteTop: 85,
						spriteWidth: 150,
						spriteHeight: 85,
						spriteOrigin: 75,
						speed: 1,
						props: {
							casting: false
						},
						def: {
							iframe: true
						}
					}
				]
			}
		}
	},
	poisonpuff2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		width: 71,
		invulnerable: true,
		autoAim: 50,
		pierce: true,
		class: __spell,
		src: './images/sprites/common/poison-puff.png',
		name: 'Poisonpuff',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 81,
						spriteTop: 87,
						spriteWidth: 16,
						spriteHeight: 15,
						spriteOrigin: 8,
						speed: 4,
						sound: { key: 'poisonpuff', volume: .3 }
					},
					{
						spriteLeft: 215,
						spriteTop: 73,
						spriteWidth: 28,
						spriteHeight: 30,
						spriteOrigin: 14,
						speed: 4,
						spell: {
							key: 'poisonpuff3',
							xGap: 50
						}
					},
					{
						spriteLeft: 349,
						spriteTop: 51,
						spriteWidth: 43,
						spriteHeight: 52,
						spriteOrigin: 22,
						speed: 4,
						spell: {
							key: 'poisonpuff4',
							xGap: -100
						}
					},
					{
						spriteLeft: 476,
						spriteTop: 41,
						spriteWidth: 71,
						spriteHeight: 63,
						spriteOrigin: 36,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'poison',
									position: 'middle'
								}]
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 50,
						spriteTop: 162,
						spriteWidth: 66,
						spriteHeight: 64,
						spriteOrigin: 33,
						speed: 4
					},
					{
						spriteLeft: 188,
						spriteTop: 161,
						spriteWidth: 83,
						spriteHeight: 63,
						spriteOrigin: 42,
						speed: 4
					}
				]
			}
		}
	},
	poisonpuff: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		width: 200,
		invulnerable: true,
		autoAim: 50,
		pierce: true,
		class: __spell,
		src: './images/sprites/common/poison-puff2.png',
		name: 'Poisonpuff',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 200,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4,
						sound: { key: 'poisonpuff', volume: .3 }
					},
					{
						spriteLeft: 400,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 600,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 800,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 1000,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 250,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 200,
						spriteTop: 250,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 400,
						spriteTop: 250,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'poison',
									position: 'middle'
								}]
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 250,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 800,
						spriteTop: 250,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 1000,
						spriteTop: 250,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 500,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 200,
						spriteTop: 500,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 400,
						spriteTop: 500,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 600,
						spriteTop: 500,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 800,
						spriteTop: 500,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 1000,
						spriteTop: 500,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 750,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 200,
						spriteTop: 750,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 400,
						spriteTop: 750,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 600,
						spriteTop: 750,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					},
					{
						spriteLeft: 800,
						spriteTop:750,
						spriteWidth: 200,
						spriteHeight: 225,
						spriteOrigin: 100,
						speed: 4
					}
				]
			}
		}
	},
	poisonpuff3: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2.2,
		width: 71,
		invulnerable: true,
		pierce: true,
		class: __spell,
		src: './images/sprites/common/poison-puff.png',
		name: 'Poisonpuff3',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 30
					},
					{
						spriteLeft: 81,
						spriteTop: 87,
						spriteWidth: 16,
						spriteHeight: 15,
						spriteOrigin: 8,
						speed: 4,
						sound: { key: 'poisonpuff', volume: .3 }
					},
					{
						spriteLeft: 215,
						spriteTop: 73,
						spriteWidth: 28,
						spriteHeight: 30,
						spriteOrigin: 14,
						speed: 4
					},
					{
						spriteLeft: 349,
						spriteTop: 51,
						spriteWidth: 43,
						spriteHeight: 52,
						spriteOrigin: 22,
						speed: 4
					},
					{
						spriteLeft: 476,
						spriteTop: 41,
						spriteWidth: 71,
						spriteHeight: 63,
						spriteOrigin: 36,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'poison',
									position: 'middle'
								}]
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 50,
						spriteTop: 162,
						spriteWidth: 66,
						spriteHeight: 64,
						spriteOrigin: 33,
						speed: 4
					},
					{
						spriteLeft: 188,
						spriteTop: 161,
						spriteWidth: 83,
						spriteHeight: 63,
						spriteOrigin: 42,
						speed: 4
					}
				]
			}
		}
	},
	poisonpuff4: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.8,
		width: 71,
		invulnerable: true,
		pierce: true,
		class: __spell,
		src: './images/sprites/common/poison-puff.png',
		name: 'Poisonpuff4',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 40
					},
					{
						spriteLeft: 81,
						spriteTop: 87,
						spriteWidth: 16,
						spriteHeight: 15,
						spriteOrigin: 8,
						speed: 4,
						sound: { key: 'poisonpuff', volume: .3 }
					},
					{
						spriteLeft: 215,
						spriteTop: 73,
						spriteWidth: 28,
						spriteHeight: 30,
						spriteOrigin: 14,
						speed: 4
					},
					{
						spriteLeft: 349,
						spriteTop: 51,
						spriteWidth: 43,
						spriteHeight: 52,
						spriteOrigin: 22,
						speed: 4
					},
					{
						spriteLeft: 476,
						spriteTop: 41,
						spriteWidth: 71,
						spriteHeight: 63,
						spriteOrigin: 36,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
								objects: [{
									key: 'poison',
									position: 'middle'
								}]
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 50,
						spriteTop: 162,
						spriteWidth: 66,
						spriteHeight: 64,
						spriteOrigin: 33,
						speed: 4
					},
					{
						spriteLeft: 188,
						spriteTop: 161,
						spriteWidth: 83,
						spriteHeight: 63,
						spriteOrigin: 42,
						speed: 4
					}
				]
			}
		}
	},
	fatalityrock1: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: .8,
		width: 570,
		invulnerable: true,
		pierce: true,
		class: __spell,
		src: './images/main/warrior/finish5.png',
		name: 'Rock Spikes',
		maxAttackedCount:10,
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 4944 - 4322,
						spriteTop: 29,
						spriteWidth: 597,
						spriteHeight: 259,
						spriteOrigin: 299,
						speed: 4
					},
					{
						spriteLeft: 5625 - 4322,
						spriteTop: 68,
						spriteWidth: 494,
						spriteHeight: 220,
						spriteOrigin: 247,
						speed: 4
					},
					{
						spriteLeft: 6342 - 4322,
						spriteTop: 129,
						spriteWidth: 318,
						spriteHeight: 159,
						spriteOrigin: 159,
						speed: 4
					},
					{
						spriteLeft: 7056 - 4322,
						spriteTop: 238,
						spriteWidth: 104,
						spriteHeight: 50,
						spriteOrigin: 52,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 3077,
						spriteTop: 0,
						spriteWidth: 1,
						spriteHeight: 50,
						spriteOrigin: 52,
						speed: 4,
						objects: [
							{
								position:'canvas', 
								key: 'debris',
								p1: { color: '#b57064', strength: 6, xVelocity: .12, yVelocity:.025 } 
							}
						],
					},
					{
						spriteLeft: 7056 - 4322,
						spriteTop: 238,
						spriteWidth: 104,
						spriteHeight: 50,
						spriteOrigin: 52,
						speed: 4,
						objects: [
							{
								position:'css', key:'shakevert'
							}
						],
						sound: { key: 'rocksmash', volume: 1 }
					},
					{
						spriteLeft: 6342 - 4322,
						spriteTop: 129,
						spriteWidth: 318,
						spriteHeight: 159,
						spriteOrigin: 159,
						speed: 4
					},
					{
						spriteLeft: 5625 - 4322,
						spriteTop: 68,
						spriteWidth: 494,
						spriteHeight: 220,
						spriteOrigin: 247,
						speed: 4
					},
					{
						spriteLeft: 4944 - 4322,
						spriteTop: 29,
						spriteWidth: 597,
						spriteHeight: 259,
						spriteOrigin: 299,
						speed: 4,
						push: 1,
						knockback: true,
						atk: {
							yRange: 10,
							rate: 3.1,
							hurt: {
								slam: true,
								smashIfDead: true,
								knockback: 1,
								airFlow: 1.25,
								do: function() {
									requestAnimationFrame(function() {
										mainCharacter.addObject(
										{ 
											key: 'distortionhit', 
											position: 'canvas', 
											p1: {
												ms: 220,
												rX: MathRound(episode.cWidth / 7),
												rY: MathRound(episode.cWidth / 9),
												yGap: -130,
												after: true,
												strength:.2
											} 
										});
									});
								},
								skipTinyCameraMove: 20,
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						speed: 4,
						sound: { key: 'rocks', volume: .8 },
						// spell: {
						// 	key: 'fatalityrock2',
						// 	xGap: 100
						// }
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						speed: 4,
						push: 1,
						knockback: true,
						atk: {
							yRange: 10,
							rate: 3.1,
							hurt: {
								slam: true,
								knockback: 1,
								smashIfDead: true,
								airFlow: 1.25,
								do: function() {
									requestAnimationFrame(function() {
										mainCharacter.addObject(
										{ 
											key: 'distortionhit', 
											position: 'canvas', 
											p1: {
												ms: 220,
												rX: MathRound(episode.cWidth / 7),
												rY: MathRound(episode.cWidth / 9),
												yGap: -130,
												after: true,
												strength:.2
											} 
										});
									});
								},
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						extraStepXRate:-.04,
						spriteOrigin: 305,
						speed: 4
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						extraStepXRate:.04,
						speed: 4,
						push: 1,
						knockback: true,
						atk: {
							yRange: 10,
							rate: 3.1,
							hurt: {
								slam: true,
								smashIfDead: true,
								knockback: 1,
								airFlow: 1.25,
								do: function() {
									requestAnimationFrame(function() {
										mainCharacter.addObject(
										{ 
											key: 'distortionhit', 
											position: 'canvas', 
											p1: {
												ms: 220,
												rX: MathRound(episode.cWidth / 7),
												rY: MathRound(episode.cWidth / 9),
												yGap: -130,
												after: true,
												strength:.2
											} 
										});
									});
								},
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						extraStepXRate:-.06,
						objects: [
							{
								position:'css', key:'shaketiny'
							}
						],
						speed: 4
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						extraStepXRate:.06,
						speed: 4
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						extraStepXRate:-.04,
						speed: 4
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						extraStepXRate:.04,
						speed: 4
					},
					{
						spriteLeft: 4322 - 4322,
						spriteTop: 20,
						spriteWidth: 610,
						spriteHeight: 268,
						spriteOrigin: 305,
						speed: 4
					}
				]
			}
		}
	},
	fireexplosion: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 2.4,
		width: 252,
		invulnerable: true,
		autoAim: 50,
		pierce: true,
		class: __spell,
		src: './images/sprites/common/fire-explosion.png',
		name: 'Fireexplosion',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 258,
						spriteTop: 0,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: -200,
						speed: 4,
						sound: { key: 'fireexplosion' }
					},
					{
						spriteLeft: 770,
						spriteTop: 0,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: -170,
						speed: 4
					},
					{
						spriteLeft: 1282,
						spriteTop: 0,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: -140,
						speed: 4
					},
					{
						spriteLeft: 1794,
						spriteTop: 0,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: -110,
						speed: 4
					},
					{
						spriteLeft: 2,
						spriteTop: 192,
						spriteWidth: 254,
						spriteHeight: 180,
						spriteOrigin: 128,
						bottomGap: -80,
						speed: 4
					},
					{
						spriteLeft: 770,
						spriteTop: 192,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: -60,
						speed: 4
					},
					{
						spriteLeft: 1026,
						spriteTop: 192,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: -40,
						speed: 4
					},
					{
						spriteLeft: 1538,
						spriteTop: 192,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: -20,
						speed: 6,
						atk: {
							yRange: 10,
							hitTaken: .3,
							rate: .3,
							aoe: 20,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 2,
						spriteTop: 384,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: 0,
						speed: 6
					},
					{
						spriteLeft: 514,
						spriteTop: 384,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						bottomGap: 20,
						speed: 6,
						atk: {
							yRange: 10,
							hitTaken: .3,
							rate: .3,
							aoe: 20,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1026,
						spriteTop: 384,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						speed: 4
					},
					{
						spriteLeft: 1538,
						spriteTop: 384,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						speed: 4,
						atk: {
							yRange: 10,
							hitTaken: .3,
							rate: .3,
							aoe: 20,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1794,
						spriteTop: 384,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						speed: 4
					},
					{
						spriteLeft: 2,
						spriteTop: 576,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						speed: 4
					},
					{
						spriteLeft: 514,
						spriteTop: 576,
						spriteWidth: 252,
						spriteHeight: 180,
						spriteOrigin: 126,
						speed: 4
					}
				]
			}
		}
	},
	rockfall: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		width: 96,
		invulnerable: true,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep15/rock.png',
		name: 'Rockfall',
		animations: {
			dead: {
				key: 'dead',
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			},
			idle: {
				key: "idle",
				type: 'skill',
				attack: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						bottomGap: -700,
						speed: 1,
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						bottomGap: -700,
						objects: [{ key: 'cast', position: 'css' }],
						speed: 59,
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -700,
						sound: { key: 'rockfall' },
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -650,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -600,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -550,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -500,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -450,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -400,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -350,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -300,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -250,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -200,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -150,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -100,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						bottomGap: -50,
						speed: 2,
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 195,
						spriteOrigin: 48,
						speed: 2,
						sound: { key: 'rocksmash', volume: .4 },
						atk: {
							yRange: 6,
							rate: .2,
							hitTaken: .1,
							aoe: 50,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 145,
						spriteOrigin: 48,
						speed: 2,
						objects: [
							{
								key: 'ouch',
								position: 'middle',
								still: true
							},
							{
								key: 'landing',
								position: 'under-feet',
								still: true
							}
						]
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 95,
						spriteOrigin: 48,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 96,
						spriteHeight: 45,
						spriteOrigin: 48,
						speed: 2
					}
				]
			}
		}
	},
	groundexplosion: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		pierce: true,
		invulnerable: true,
		still: true,
		class: __spell,
		src: './images/main/archer/bomb.png',
		name: 'Ground Explosion',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				frames: [
					{
						spriteLeft: 19,
						spriteTop: 82,
						spriteWidth: 47,
						spriteHeight: 61,
						spriteOrigin: 24,
						speed: 8,
						sound: { key: 'explode', sound: .25 },
						atk: {
							yRange: 15,
							rate: .2,
							reset: true,
							aoe: 100,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 94,
						spriteTop: 57,
						spriteWidth: 64,
						spriteHeight: 86,
						spriteOrigin: 32,
						speed: 8,
						atk: {
							yRange: 15,
							aoe: 100,
							rate: .2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 185,
						spriteTop: 18,
						spriteWidth: 103,
						spriteHeight: 125,
						spriteOrigin: 52,
						speed: 8,
						atk: {
							yRange: 10,
							rate: .2,
							aoe: 100,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 32,
						spriteTop: 190,
						spriteWidth: 112,
						spriteHeight: 102,
						spriteOrigin: 56,
						speed: 8,
						atk: {
							yRange: 10,
							rate: .2,
							aoe: 100,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 161,
						spriteTop: 173,
						spriteWidth: 116,
						spriteHeight: 119,
						spriteOrigin: 58,
						speed: 8,
						atk: {
							yRange: 10,
							rate: .2,
							aoe: 100,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 294,
						spriteTop: 166,
						spriteWidth: 125,
						spriteHeight: 126,
						spriteOrigin: 63,
						speed: 8,
						atk: {
							yRange: 10,
							rate: .2,
							aoe: 100,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	groundexplosionsmash: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		pierce: true,
		invulnerable: true,
		still: true,
		class: __spell,
		src: './images/main/archer/bomb.png',
		name: 'Ground Explosion',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				frames: [
					{
						spriteLeft: 19,
						spriteTop: 82,
						spriteWidth: 47,
						spriteHeight: 61,
						spriteOrigin: 24,
						speed: 8,
						sound: { key: 'explode', sound: .35 }
					},
					{
						spriteLeft: 94,
						spriteTop: 57,
						spriteWidth: 64,
						spriteHeight: 86,
						spriteOrigin: 32,
						speed: 8,
						atk: {
							yRange: 15,
							aoe: 100,
							rate: 1,
							hurt: {
								key: 'hurtground',
								type: 'ground',
								smash: true
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 185,
						spriteTop: 18,
						spriteWidth: 103,
						spriteHeight: 125,
						spriteOrigin: 52,
						speed: 8
					},
					{
						spriteLeft: 32,
						spriteTop: 190,
						spriteWidth: 112,
						spriteHeight: 102,
						spriteOrigin: 56,
						speed: 8
					},
					{
						spriteLeft: 161,
						spriteTop: 173,
						spriteWidth: 116,
						spriteHeight: 119,
						spriteOrigin: 58,
						speed: 8
					},
					{
						spriteLeft: 294,
						spriteTop: 166,
						spriteWidth: 125,
						spriteHeight: 126,
						spriteOrigin: 63,
						speed: 8
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	sonicwave: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.5,
		invulnerable: true,
		knockback: true,
		extraStepXRate: 1,
		push: 'front',
		class: __spell,
		src: './images/sprites/ep1000/sonic-wave.png',
		name: 'Sonicwave',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				useExtraStepXRate: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 230,
						spriteHeight: 364,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						push: 15,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									key: 'slow',
									level: 2
								},
								{
									key: 'curse',
									level: 3,
									chanceRate: 15
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 230,
						spriteTop: 0,
						spriteWidth: 230,
						spriteHeight: 364,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						push: 15,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									key: 'slow',
									level: 2
								},
								{
									key: 'curse',
									level: 3,
									chanceRate: 15
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 230 * 2,
						spriteTop: 0,
						spriteWidth: 230,
						spriteHeight: 364,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						push: 15,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									key: 'slow',
									level: 2
								},
								{
									key: 'curse',
									level: 3,
									chanceRate: 15
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 230 * 3,
						spriteTop: 0,
						spriteWidth: 230,
						spriteHeight: 364,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						push: 15,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									key: 'slow',
									level: 2
								},
								{
									key: 'curse',
									level: 3,
									chanceRate: 15
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 230 * 4,
						spriteTop: 0,
						spriteWidth: 230,
						spriteHeight: 364,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						push: 15,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									key: 'slow',
									level: 2
								},
								{
									key: 'curse',
									level: 3,
									chanceRate: 15
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	tugarrow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/ep33/arrow.png',
		name: 'Tug Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 80,
						spriteOrigin: 60,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 120,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 80,
						spriteOrigin: 60,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 240,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 80,
						spriteOrigin: 60,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 360,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 80,
						spriteOrigin: 60,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 480,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 80,
						spriteOrigin: 60,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 80,
						spriteOrigin: 60,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	tugflameeagle: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		pierce: true,
		src: './images/sprites/ep33/flameeagle.png',
		name: 'Tug Flame Eagle',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 24,
						spriteTop: 7,
						spriteWidth: 68,
						spriteHeight: 110,
						spriteOrigin: 34,
						extraStepXRate: 2,
						bottomGap: -40,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								// buffs: [{
								// 	level: 1,
								// 	key: 'sleep'
								// }]
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 101,
						spriteTop: 7,
						spriteWidth: 72,
						spriteHeight: 110,
						spriteOrigin: 36,
						extraStepXRate: 2,
						bottomGap: -40,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								// buffs: [{
								// 	level: 1,
								// 	key: 'sleep'
								// }]
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 184,
						spriteTop: 7,
						spriteWidth: 45,
						spriteHeight: 110,
						spriteOrigin: 23,
						extraStepXRate: 2,
						bottomGap: -40,
						speed: 6,
						spell: {
							key: 'toxicwall'
						},
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								// buffs: [{
								// 	level: 1,
								// 	key: 'sleep'
								// }]
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 247,
						spriteTop: 7,
						spriteWidth: 55,
						spriteHeight: 110,
						spriteOrigin: 28,
						extraStepXRate: 2,
						bottomGap: -40,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								// buffs: [{
								// 	level: 1,
								// 	key: 'sleep'
								// }]
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 318,
						spriteTop: 7,
						spriteWidth: 88,
						spriteHeight: 110,
						spriteOrigin: 44,
						extraStepXRate: 2,
						bottomGap: -40,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								// buffs: [{
								// 	level: 1,
								// 	key: 'sleep'
								// }]
							},
							type: 'fire'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 427,
						spriteTop: 7,
						spriteWidth: 86,
						spriteHeight: 110,
						spriteOrigin: 43,
						extraStepXRate: 1.5,
						bottomGap: -40,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 7,
						spriteWidth: 0,
						spriteHeight: 110,
						spriteOrigin: 0,
						extraStepXRate: .5,
						bottomGap: -40,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	hurlingbomb: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.66,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/ep75/bomb.png',
		name: 'Hurling Bomb',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.65,
						sound: { key: 'bomberdrop', volume: .2, bind: true },
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 10,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 40,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.65,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.6,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 120,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.55,
						speed: 4,
						spell: {
							key: 'firewall4'
						},
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.5,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 10,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 40,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.45,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.4,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 120,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.35,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.25,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 40,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.15,
						speed: 4,
						spell: {
							key: 'firewall4'
						},
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: 1.05,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 120,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: .9,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: .75,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 40,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: .6,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 80,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: .4,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 120,
						spriteTop: 0,
						spriteWidth: 40,
						spriteHeight: 40,
						spriteOrigin: 20,
						extraStepXRate: .2,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .5,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 40,
						spriteOrigin: 0,
						sound: {key:'bomberexplode', volume:.3, reset: true },
						objects: [
							{ key: 'caboom', position: 'middle', scale: 1.5 },
							{ key: 'shake', position: 'css' }
						],
						speed: 40
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	shamanboomerang: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		pierce: true,
		src: './images/sprites/ep38/sprite.png',
		name: 'Boomerang',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				maxRepeat: 2,
				next: 'ground1',
				frames: [
					{
						spriteLeft: 281,
						spriteTop: 1172,
						spriteWidth: 67,
						spriteHeight: 94,
						spriteOrigin: 34,
						extraStepXRate: 1.25,
						bottomGap: -105,
						sound: { key: 'boomerang', volume: .6 },
						shadow: 'red',
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 100,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 416,
						spriteTop: 1172,
						spriteWidth: 79,
						spriteHeight: 94,
						spriteOrigin: 40,
						extraStepXRate: 1.25,
						bottomGap: -105,
						sound: { key: 'boomerang', volume: .6 },
						shadow: 'red',
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 549,
						spriteTop: 1172,
						spriteWidth: 71,
						spriteHeight: 94,
						spriteOrigin: 36,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 697,
						spriteTop: 1172,
						spriteWidth: 68,
						spriteHeight: 94,
						spriteOrigin: 34,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 866,
						spriteTop: 1172,
						spriteWidth: 68,
						spriteHeight: 94,
						spriteOrigin: 34,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1043,
						spriteTop: 1172,
						spriteWidth: 99,
						spriteHeight: 94,
						spriteOrigin: 50,
						extraStepXRate: 1.25,
						bottomGap: -105,
						sound: { key: 'boomerang', volume: .75 },
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1248,
						spriteTop: 1172,
						spriteWidth: 59,
						spriteHeight: 94,
						spriteOrigin: 30,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1432,
						spriteTop: 1172,
						spriteWidth: 82,
						spriteHeight: 94,
						spriteOrigin: 41,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1591,
						spriteTop: 1172,
						spriteWidth: 90,
						spriteHeight: 94,
						spriteOrigin: 45,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1809,
						spriteTop: 1172,
						spriteWidth: 55,
						spriteHeight: 94,
						spriteOrigin: 28,
						extraStepXRate: 1.25,
						bottomGap: -105,
						sound: { key: 'boomerang', volume: .6 },
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1978,
						spriteTop: 1172,
						spriteWidth: 100,
						spriteHeight: 94,
						spriteOrigin: 50,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2211,
						spriteTop: 1172,
						spriteWidth: 78,
						spriteHeight: 94,
						spriteOrigin: 39,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2416,
						spriteTop: 1172,
						spriteWidth: 76,
						spriteHeight: 94,
						spriteOrigin: 38,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2594,
						spriteTop: 1172,
						spriteWidth: 104,
						spriteHeight: 94,
						spriteOrigin: 52,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			ground1: {
				key: "ground1",
				type: 'skill',
				move: true,
				maxRepeat: 2,
				reversed: true,
				frames: [
					{
						spriteLeft: 549,
						spriteTop: 1172,
						spriteWidth: 71,
						spriteHeight: 94,
						spriteOrigin: 36,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 697,
						spriteTop: 1172,
						spriteWidth: 68,
						spriteHeight: 94,
						spriteOrigin: 34,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 866,
						spriteTop: 1172,
						spriteWidth: 68,
						spriteHeight: 94,
						spriteOrigin: 34,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1043,
						spriteTop: 1172,
						spriteWidth: 99,
						spriteHeight: 94,
						spriteOrigin: 50,
						extraStepXRate: 1.25,
						bottomGap: -105,
						sound: { key: 'boomerang', volume: .75 },
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1248,
						spriteTop: 1172,
						spriteWidth: 59,
						spriteHeight: 94,
						spriteOrigin: 30,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1432,
						spriteTop: 1172,
						spriteWidth: 82,
						spriteHeight: 94,
						spriteOrigin: 41,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1591,
						spriteTop: 1172,
						spriteWidth: 90,
						spriteHeight: 94,
						spriteOrigin: 45,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1809,
						spriteTop: 1172,
						spriteWidth: 55,
						spriteHeight: 94,
						spriteOrigin: 28,
						extraStepXRate: 1.25,
						bottomGap: -105,
						sound: { key: 'boomerang', volume: .6 },
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1978,
						spriteTop: 1172,
						spriteWidth: 100,
						spriteHeight: 94,
						spriteOrigin: 50,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2211,
						spriteTop: 1172,
						spriteWidth: 78,
						spriteHeight: 94,
						spriteOrigin: 39,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2416,
						spriteTop: 1172,
						spriteWidth: 76,
						spriteHeight: 94,
						spriteOrigin: 38,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 2594,
						spriteTop: 1172,
						spriteWidth: 104,
						spriteHeight: 94,
						spriteOrigin: 52,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 549,
						spriteTop: 1172,
						spriteWidth: 71,
						spriteHeight: 94,
						spriteOrigin: 36,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 697,
						spriteTop: 1172,
						spriteWidth: 68,
						spriteHeight: 94,
						spriteOrigin: 34,
						extraStepXRate: 1.25,
						bottomGap: -105,
						speed: 4,
						shadow: 'red',
						atk: {
							yRange: 15,
							aoe: 100,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 1172,
						spriteWidth: 0,
						spriteHeight: 94,
						spriteOrigin: 0,
						bottomGap: -105,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	greenarrowright: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.4,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/ep52/arrow.png',
		name: 'Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 26,
						spriteTop: 59,
						spriteWidth: 116,
						spriteHeight: 46,
						spriteOrigin: 58,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 1,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 26,
						spriteTop: 59,
						spriteWidth: 116,
						spriteHeight: 46,
						spriteOrigin: 58,
						extraStepXRate: 2.1,
						bottomGap: -80,
						sound: { key:'greenarrow', volume: .5, reset: 1 },
						speed: 5,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 195,
						spriteTop: 59,
						spriteWidth: 115,
						spriteHeight: 38,
						spriteOrigin: 58,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 363,
						spriteTop: 60,
						spriteWidth: 115,
						spriteHeight: 36,
						spriteOrigin: 58,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 537,
						spriteTop: 60,
						spriteWidth: 111,
						spriteHeight: 38,
						spriteOrigin: 56,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 702,
						spriteTop: 61,
						spriteWidth: 114,
						spriteHeight: 36,
						spriteOrigin: 57,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 16,
						spriteTop: 209,
						spriteWidth: 125,
						spriteHeight: 40,
						spriteOrigin: 63,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 195,
						spriteTop: 211,
						spriteWidth: 115,
						spriteHeight: 34,
						spriteOrigin: 58,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 364,
						spriteTop: 208,
						spriteWidth: 116,
						spriteHeight: 46,
						spriteOrigin: 58,
						extraStepXRate: 2.1,
						bottomGap: -80,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'toxic'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerarrow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/main/archer/arrow2.png',
		name: 'Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 32,
						atk: {
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	lightningarrow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 3,
		invulnerable: true,
		class: __spell,
		still: true,
		src: './images/main/archer/lightningarrow.png',
		name: 'Lightning Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						sound: { key: 'thunderdzzt', sound: .5 },
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 4
					},
					{
						spriteLeft: 220,
						spriteTop: 0,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 4
					},
					{
						spriteLeft: 440,
						spriteTop: 0,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 4
					},
					{
						spriteLeft: 660,
						spriteTop: 0,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 4
					},
					{
						spriteLeft: 880,
						spriteTop: 0,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						bottomGap: 20,
						speed: 4
					},
					{
						spriteLeft: 0,
						spriteTop: 300,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						bottomGap: 20,
						speed: 4,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 220,
						spriteTop: 300,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						bottomGap: 20,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 440,
						spriteTop: 300,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						bottomGap: 20,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 660,
						spriteTop: 300,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 6,
						bottomGap: 20,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 880,
						spriteTop: 300,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 6,
						bottomGap: 20,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 600,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 6,
						bottomGap: 20,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 220,
						spriteTop: 600,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 6,
						bottomGap: 20,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 440,
						spriteTop: 600,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 4,
						bottomGap: 20,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 660,
						spriteTop: 600,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 4,
						bottomGap: 20,
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 880,
						spriteTop: 600,
						spriteWidth: 220,
						spriteHeight: 300,
						spriteOrigin: 110,
						speed: 4,
						bottomGap: 20
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerupperarrow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/main/archer/upperarrow.png',
		name: 'Upper Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						extraStepXRate: 1.5,
						extraStepYRate: 2.4,
						bottomGap: -140,
						speed: 20
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						extraStepYRate: 1.6,
						bottomGap: -140,
						speed: 1,
						spell: {
							key: 'lightningarrow',
							pierce: true
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						extraStepYRate: 1.6,
						bottomGap: -140,
						speed: 1,
						spell: {
							key: 'lightningarrow',
							pierce: true,
							xGap: 500
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						extraStepYRate: 1.6,
						bottomGap: -140,
						speed: 1,
						spell: {
							key: 'lightningarrow',
							pierce: true,
							xGap: -500
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerdownrightarrow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/main/archer/downrightarrow.png',
		name: 'Down Right Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						extraStepXRate: .75,
						extraStepYRate: -1.25,
						bottomGap: -440,
						speed: 24
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						speed: 1,
						spell: {
							key: 'groundexplosion'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerdownleftarrow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/main/archer/downleftarrow.png',
		name: 'Down Left Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						extraStepXRate: -.75,
						extraStepYRate: -1.25,
						bottomGap: -440,
						speed: 24
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						speed: 1,
						spell: {
							key: 'groundexplosion',
							xGap: -330
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerdownarrow: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/main/archer/downarrow.png',
		name: 'Down Arrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						extraStepYRate: -1.25,
						bottomGap: -40,
						speed: 24
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 126,
						spriteHeight: 78,
						spriteOrigin: 63,
						speed: 1,
						spell: {
							key: 'groundexplosion',
							xGap: -100
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerarrowtop: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		knockback: true,
		extraStepXRate: 1.1,
		class: __spell,
		src: './images/main/archer/arrow2.png',
		name: 'TopArrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerarrowbottom: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		knockback: true,
		extraStepXRate: 1.2,
		class: __spell,
		src: './images/main/archer/arrow2.png',
		name: 'BottomArrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				attack: true,
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							reset: true,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						speed: 8,
						atk: {
							push: 2,
							yRange: 15,
							reset: true,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerarrowmiddle: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/main/archer/arrow2.png',
		name: 'Arrow Middle',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 32,
						atk: {
							push: 2,
							yRange: 15,
							reset: true,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	archerarrowfire: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		fireDmgRate: 100,
		src: './images/main/archer/arrow2.png',
		name: 'FireArrow',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 110,
						spriteOrigin: 70,
						extraStepXRate: 1.5,
						bottomGap: -80,
						speed: 30,
						objects: [{
							key: 'burn',
							position: 'middle-front',
							bind: true,
							speed: 3
						}],
						atk: {
							yRange: 6,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 140,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 1.5,
						bottomGap: -130,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	warriorspell: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * .75,
		invulnerable: true,
		extraStepXRate: 1,
		lightningDmgRate: 100,
		lightColor: '#00FF0020',
		class: __spell,
		name: 'Aduket',
		src: './images/main/warrior/sprite.png',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 373,
						spriteTop: 1370,
						spriteWidth: 217,
						spriteHeight: 198 + 65,
						spriteOrigin: 108,
						extraStepXRate: 1,
						bottomGap: -15,
						speed: 12,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							aoe: 120,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								sound:{key:'punchhit', volume:.5},
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 607,
						spriteTop: 1370,
						spriteWidth: 290,
						spriteHeight: 198 + 65,
						spriteOrigin: 145,
						extraStepXRate: 1,
						bottomGap: -15,
						speed: 12,
						atk: {
							yRange: 10,
							reset: true,
							rate: 2,
							aoe: 120,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								sound:{key:'punchhit', volume:.5},
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 373,
						spriteTop: 1370,
						spriteWidth: 217,
						spriteHeight: 198 + 65,
						spriteOrigin: 108,
						bottomGap: -15,
						extraStepXRate: 1,
						speed: 12,
						atk: {
							yRange: 10,
							rate: 2,
							aoe: 120,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								sound:{key:'punchhit', volume:.5},
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 607,
						spriteTop: 1370,
						spriteWidth: 290,
						spriteHeight: 198 + 65,
						spriteOrigin: 145,
						bottomGap: -15,
						extraStepXRate: 1,
						speed: 12,
						atk: {
							yRange: 10,
							rate: 2,
							aoe: 120,
							reset: true,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								sound:{key:'punchhit', volume:.5},
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 1531,
						spriteTop: 1326,
						spriteWidth: 282,
						sound: {key:'aduketdead', volume:1},
						spriteHeight: 276,
						spriteOrigin: 141,
						extraStepXRate: .7,
						bottomGap: -40,
						speed: 4
					},
					{
						spriteLeft: 1876,
						spriteTop: 1326,
						spriteWidth: 124,
						spriteHeight: 276,
						spriteOrigin: 62,
						extraStepXRate: .6,
						bottomGap: -40,
						speed: 4
					},
					{
						spriteLeft: 2075,
						spriteTop: 1326,
						spriteWidth: 70,
						spriteHeight: 276,
						spriteOrigin: 35,
						extraStepXRate: .5,
						bottomGap: -40,
						speed: 4
					},
					{
						spriteLeft: 2235,
						spriteTop: 1326,
						spriteWidth: 48,
						spriteHeight: 276,
						spriteOrigin: 24,
						extraStepXRate: .4,
						bottomGap: -40,
						speed: 4
					},
					{
						spriteLeft: 2373,
						spriteTop: 1326,
						spriteWidth: 97,
						spriteHeight: 276,
						spriteOrigin: 49,
						extraStepXRate: .3,
						bottomGap: -40,
						speed: 4
					},
					{
						spriteLeft: 2540,
						spriteTop: 1326,
						spriteWidth: 80,
						spriteHeight: 276,
						spriteOrigin: 40,
						extraStepXRate: .2,
						bottomGap: -40,
						speed: 4
					},
					{
						spriteLeft: 2712,
						spriteTop: 1326,
						spriteWidth: 22,
						spriteHeight: 276,
						spriteOrigin: 11,
						extraStepXRate: .1,
						bottomGap: -40,
						speed: 3
					},
					{
						spriteLeft: 2712,
						spriteTop: 1326,
						spriteWidth: 22,
						spriteHeight: 276,
						spriteOrigin: 11,
						bottomGap: -40,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	teberweapon: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/ep02/sprite.png',
		name: 'Teberweapon',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 66,
						spriteTop: 1478,
						spriteWidth: 144,
						spriteHeight: 167,
						spriteOrigin: 72,
						extraStepXRate: 1.2,
						bottomGap: -100,
						speed: 10,
						sound: { key: 'throw', volume: 1 },
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 247,
						spriteTop: 1478,
						spriteWidth: 144,
						spriteHeight: 167,
						spriteOrigin: 72,
						extraStepXRate: 1.2,
						bottomGap: -100,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 757,
						spriteTop: 1478,
						spriteWidth: 144,
						spriteHeight: 167,
						spriteOrigin: 72,
						extraStepXRate: 1.2,
						bottomGap: -100,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 980,
						spriteTop: 1478,
						spriteWidth: 144,
						spriteHeight: 167,
						spriteOrigin: 72,
						extraStepXRate: 1.2,
						bottomGap: -100,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1190,
						spriteTop: 1478,
						spriteWidth: 144,
						spriteHeight: 167,
						spriteOrigin: 72,
						extraStepXRate: 1.2,
						bottomGap: -100,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	electricbolt: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 2,
		invulnerable: true,
		pierce: true,
		extraStepXRate: 1,
		class: __spell,
		lightColor: '#0000FF10',
		src: './images/sprites/common/electricbolt.png',
		name: 'Electricbolt',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 70,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						sound: { key: 'shockwave', volume: .2 },
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 140,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 210,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 280,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 350,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 125,
						spriteTop: 0,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 125,
						spriteTop: 70,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 125,
						spriteTop: 140,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 125,
						spriteTop: 210,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 125,
						spriteTop: 280,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						bottomGap: -40,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -50,
						speed: 1
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: 2.5,
						bottomGap: -50,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	electricboltsmall: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 2,
		invulnerable: true,
		extraStepXRate: 1,
		friendlyFire: true,
		bounce: true,
		lightColor: '#0000FF10',
		pierce: true,
		class: __spell,
		src: './images/sprites/common/el.png',
		name: 'Electricboltsmall',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						speed: 5,
						sound: { key: 'shockwave', volume: .2 },
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: -2.5,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 70,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: -2.5,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 140,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: -2.5,
						speed: 2
					},
					{
						spriteLeft: 0,
						spriteTop: 210,
						spriteWidth: 125,
						spriteHeight: 70,
						spriteOrigin: 63,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	electricboltsmall2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2.66,
		invulnerable: true,
		extraStepXRate: 1,
		friendlyFire: true,
		bounce: true,
		lightColor: '#0000FF10',
		pierce: true,
		class: __spell,
		src: './images/sprites/common/e.png',
		name: 'Electricboltsmall2',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 117,
						spriteTop: 85,
						spriteWidth: 91,
						spriteHeight: 54,
						spriteOrigin: 46,
						bottomGap: -20 - 17,
						speed: 5,
						sound: { key: 'shockwave', volume: .2 },
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: -2.5,
						bottomGap: -20,
						speed: 2
					},
					{
						spriteLeft: 232,
						spriteTop: 101,
						spriteWidth: 69,
						spriteHeight: 17,
						spriteOrigin: 35,
						bottomGap: -20 - 53,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: -2.5,
						bottomGap: -20,
						speed: 2
					},
					{
						spriteLeft: 328,
						spriteTop: 96,
						spriteWidth: 74,
						spriteHeight: 41,
						spriteOrigin: 37,
						bottomGap: -20 - 9,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: -2.5,
						bottomGap: -20,
						speed: 2
					},
					{
						spriteLeft: 422,
						spriteTop: 99,
						spriteWidth: 51,
						spriteHeight: 31,
						spriteOrigin: 26,
						bottomGap: -20 - 39,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						extraStepXRate: -2.5,
						bottomGap: -20,
						speed: 2
					},
					{
						spriteLeft: 482,
						spriteTop: 102,
						spriteWidth: 74,
						spriteHeight: 13,
						spriteOrigin: 37,
						bottomGap: -20 - 57,
						speed: 5,
						atk: {
							yRange: 100,
							rate: .2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	firespray: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.5,
		invulnerable: true,
		pierce: true,
		knockback: 10,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/common/firespray.png',
		name: 'Firespray',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 5,
						spriteTop: 517,
						spriteWidth: 400,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 3,
						speed: 1
					},
					{
						spriteLeft: 5,
						spriteTop: 517,
						spriteWidth: 400,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 3,
						sound: { key: 'firespray', volume: .2 },
						speed: 1
					},
					{
						spriteLeft: 5,
						spriteTop: 517,
						spriteWidth: 400,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 3,
						speed: 2,
						push: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 606,
						spriteTop: 517,
						spriteWidth: 470,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 11,
						speed: 2
					},
					{
						spriteLeft: 606,
						spriteTop: 517,
						spriteWidth: 470,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 11,
						speed: 2,
						push: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1212,
						spriteTop: 517,
						spriteWidth: 470,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 6,
						speed: 2
					},
					{
						spriteLeft: 1212,
						spriteTop: 517,
						spriteWidth: 470,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 6,
						speed: 2,
						push: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1825,
						spriteTop: 517,
						spriteWidth: 510,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 5,
						speed: 2
					},
					{
						spriteLeft: 1825,
						spriteTop: 517,
						spriteWidth: 510,
						spriteHeight: 256,
						spriteOrigin: 0,
						bottomGap: 5,
						speed: 2,
						push: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 63,
						spriteTop: 58,
						spriteWidth: 502,
						spriteHeight: 266,
						spriteOrigin: 0,
						bottomGap: 3,
						speed: 2
					},
					{
						spriteLeft: 63,
						spriteTop: 58,
						spriteWidth: 502,
						spriteHeight: 266,
						spriteOrigin: 0,
						bottomGap: 3,
						speed: 2,
						push: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 695,
						spriteTop: 58,
						spriteWidth: 480,
						spriteHeight: 266,
						spriteOrigin: 0,
						speed: 2
					},
					{
						spriteLeft: 695,
						spriteTop: 58,
						spriteWidth: 480,
						spriteHeight: 266,
						spriteOrigin: 0,
						speed: 2,
						push: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1325,
						spriteTop: 58,
						spriteWidth: 470,
						spriteHeight: 266,
						spriteOrigin: 0,
						speed: 2
					},
					{
						spriteLeft: 1325,
						spriteTop: 58,
						spriteWidth: 470,
						spriteHeight: 266,
						spriteOrigin: 0,
						speed: 2,
						push: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	firewall: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		pierce: true,
		still: true,
		class: __spell,
		src: './images/sprites/ep34/fire.png',
		name: 'Firewall',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 4,
						spriteTop: 61,
						spriteWidth: 18,
						spriteHeight: 14,
						spriteOrigin: 9,
						bottomGap: -3,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 25
						}
					},
					{
						spriteLeft: 4,
						spriteTop: 61,
						spriteWidth: 18,
						spriteHeight: 14,
						spriteOrigin: 9,
						bottomGap: -3,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 50
						}
					},
					{
						spriteLeft: 31,
						spriteTop: 40,
						spriteWidth: 25,
						spriteHeight: 36,
						spriteOrigin: 13,
						bottomGap: -2,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						},
						spell: {
							key: 'firewall2',
							xGap: 75
						}
					},
					{
						spriteLeft: 31,
						spriteTop: 40,
						spriteWidth: 25,
						spriteHeight: 36,
						spriteOrigin: 13,
						bottomGap: -2,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						},
						spell: {
							key: 'firewall2',
							xGap: 100
						}
					},
					{
						spriteLeft: 70,
						spriteTop: 20,
						spriteWidth: 38,
						spriteHeight: 58,
						spriteOrigin: 19,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						},
						spell: {
							key: 'firewall2',
							xGap: 125
						}
					},
					{
						spriteLeft: 70,
						spriteTop: 20,
						spriteWidth: 38,
						spriteHeight: 58,
						spriteOrigin: 19,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						},
						spell: {
							key: 'firewall2',
							xGap: 150
						}
					},
					{
						spriteLeft: 119,
						spriteTop: 41,
						spriteWidth: 24,
						spriteHeight: 35,
						spriteOrigin: 12,
						bottomGap: -2,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						},
						spell: {
							key: 'firewall2',
							xGap: 175
						}
					},
					{
						spriteLeft: 119,
						spriteTop: 41,
						spriteWidth: 24,
						spriteHeight: 35,
						spriteOrigin: 12,
						bottomGap: -2,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						},
						spell: {
							key: 'firewall2',
							xGap: 200
						}
					},
					{
						spriteLeft: 156,
						spriteTop: 61,
						spriteWidth: 19,
						spriteHeight: 14,
						spriteOrigin: 10,
						bottomGap: -3,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 225
						}
					},
					{
						spriteLeft: 156,
						spriteTop: 61,
						spriteWidth: 19,
						spriteHeight: 14,
						spriteOrigin: 10,
						bottomGap: -3,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 250
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 275
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 300
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 325
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 350
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 375
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 400
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 425
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 450
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 475
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 4,
						spell: {
							key: 'firewall2',
							xGap: 500
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	firewall2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		pierce: true,
		knockback: 10,
		still: true,
		class: __spell,
		src: './images/sprites/ep34/fire.png',
		name: 'Firewall2',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 4,
						spriteTop: 61,
						spriteWidth: 18,
						spriteHeight: 14,
						spriteOrigin: 9,
						bottomGap: -3,
						speed: 4
					},
					{
						spriteLeft: 31,
						spriteTop: 40,
						spriteWidth: 25,
						spriteHeight: 36,
						spriteOrigin: 13,
						bottomGap: -2,
						speed: 4,
						push: 5,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 70,
						spriteTop: 20,
						spriteWidth: 38,
						spriteHeight: 58,
						spriteOrigin: 19,
						speed: 4,
						push: 5,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 119,
						spriteTop: 41,
						spriteWidth: 24,
						spriteHeight: 35,
						spriteOrigin: 12,
						bottomGap: -2,
						speed: 4,
						push: 5,
						atk: {
							yRange: 15,
							rate: 1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 156,
						spriteTop: 61,
						spriteWidth: 19,
						spriteHeight: 14,
						spriteOrigin: 10,
						bottomGap: -3,
						speed: 4
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	firewall3: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		pierce: true,
		still: true,
		class: __spell,
		src: './images/sprites/ep34/flame.png',
		name: 'Firewall3',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 10,
				maxRepeat: 10,
				frames: [
					{
						spriteLeft: 4,
						spriteTop: 16,
						spriteWidth: 202,
						spriteHeight: 65,
						spriteOrigin: 101,
						speed: 6,
						atk: {
							yRange: 15,
							aoe: 100,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 236,
						spriteTop: 16,
						spriteWidth: 199,
						spriteHeight: 65,
						spriteOrigin: 100,
						speed: 6,
						atk: {
							yRange: 15,
							aoe: 100,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 6,
						spriteTop: 95,
						spriteWidth: 198,
						spriteHeight: 65,
						spriteOrigin: 99,
						speed: 6,
						atk: {
							yRange: 15,
							reset: 1,
							aoe: 100,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 240,
						spriteTop: 95,
						spriteWidth: 197,
						spriteHeight: 65,
						spriteOrigin: 99,
						speed: 6,
						atk: {
							yRange: 15,
							reset: 1,
							aoe: 100,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	firewall4: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		pierce: true,
		still: true,
		class: __spell,
		drawPriority: .5,
		src: './images/sprites/ep34/flame5.png',
		name: 'Firewall4',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 10,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						sound: { key: 'flames', volume: .5, bind: true },
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	toxicwall: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		pierce: true,
		still: true,
		class: __spell,
		drawPriority: .5,
		src: './images/sprites/ep33/toxicwall.png',
		name: 'toxicwall',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 10,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						sound: { key: 'flames', volume: .5, bind: true },
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 43,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 85,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 127,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6,
						atk: {
							yRange: 12,
							aoe: 1,
							reset: 1,
							rate: .1,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'toxic'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 169,
						spriteWidth: 338,
						spriteHeight: 41,
						spriteOrigin: 119,
						speed: 6
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	fireball: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		class: __spell,
		src: './images/sprites/ep34/fireball.png',
		name: 'Fireball',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				priority: 2,
				frames: [
					{
						spriteLeft: 14,
						spriteTop: 30,
						spriteWidth: 57,
						spriteHeight: 47,
						extraStepXRate: 1.5,
						spriteOrigin: 29,
						bottomGap: -70,
						sound: { key: 'fireball', volume: .2 },
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 93,
						spriteTop: 30,
						spriteWidth: 86,
						spriteHeight: 47,
						extraStepXRate: 1.5,
						spriteOrigin: 43,
						bottomGap: -70,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 196,
						spriteTop: 30,
						spriteWidth: 86,
						spriteHeight: 47,
						extraStepXRate: 1.5,
						spriteOrigin: 43,
						bottomGap: -70,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 306,
						spriteTop: 30,
						spriteWidth: 82,
						spriteHeight: 47,
						extraStepXRate: 1.5,
						spriteOrigin: 41,
						bottomGap: -70,
						speed: 6,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
							},
							type: 'fire'
						}
					},
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 408,
						spriteTop: 10,
						spriteWidth: 55,
						spriteHeight: 70,
						spriteOrigin: 28,
						bottomGap: -59,
						sound: { key: 'shamanfire', volume: .2 },
						speed: 6
					},
					{
						spriteLeft: 49,
						spriteTop: 106,
						spriteWidth: 78,
						spriteHeight: 95,
						spriteOrigin: 39,
						bottomGap: -47,
						speed: 6
					},
					{
						spriteLeft: 148,
						spriteTop: 96,
						spriteWidth: 98,
						spriteHeight: 114,
						spriteOrigin: 49,
						bottomGap: -37,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	waterwave: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2,
		invulnerable: true,
		pierce: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/common/waterwave.png',
		name: 'Waterwave',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4,
						sound: { key: 'bubbles' }
					},
					{
						spriteLeft: 256,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4
					},
					{
						spriteLeft: 512,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 2,
							aoe: 100,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 768,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 768,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 1,
						spell: {
							key: 'waterwavehit',
							pierce: true
						}
					},
					{
						spriteLeft: 1024,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4
					},
					{
						spriteLeft: 1280,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4
					},
					{
						spriteLeft: 1536,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 2,
							aoe: 100,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 1792,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 1792,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 1,
						spell: {
							key: 'waterwavehit',
							pierce: true
						}
					},
					{
						spriteLeft: 2048,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4
					},
					{
						spriteLeft: 2304,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4
					},
					{
						spriteLeft: 2560,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 2,
							aoe: 100,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 2816,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 2816,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 139,
						spriteOrigin: 128,
						extraStepXRate: 1,
						speed: 1,
						spell: {
							key: 'waterwavehit',
							pierce: true
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	waterwavehit: {
		defaultDirection: __left,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 1.5,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/common/waterwavehit.png',
		name: 'Waterwavehit',
		animations: {
			idle: {
				key: "idle",
				move: true,
				type: 'skill',
				frames: [
					{
						spriteLeft: 195,
						spriteTop: 60,
						spriteWidth: 76,
						spriteHeight: 52,
						spriteOrigin: 38,
						extraStepXRate: -.5,
						speed: 6,
					},
					{
						spriteLeft: 279,
						spriteTop: 42,
						spriteWidth: 82,
						spriteHeight: 70,
						spriteOrigin: 41,
						extraStepXRate: -.4,
						speed: 6,
					},
					{
						spriteLeft: 365,
						spriteTop: 13,
						spriteWidth: 82,
						spriteHeight: 99,
						spriteOrigin: 41,
						extraStepXRate: -.3,
						speed: 6
					},
					{
						spriteLeft: 456,
						spriteTop: 11,
						spriteWidth: 91,
						spriteHeight: 101,
						spriteOrigin: 46,
						extraStepXRate: -.2,
						speed: 6
					},
					{
						spriteLeft: 551,
						spriteTop: 11,
						spriteWidth: 93,
						spriteHeight: 101,
						spriteOrigin: 47,
						extraStepXRate: -.1,
						speed: 5,
					},
					{
						spriteLeft: 551,
						spriteTop: 11,
						spriteWidth: 93,
						spriteHeight: 101,
						spriteOrigin: 47,
						extraStepXRate: -.1,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							aoe: 100,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 652,
						spriteTop: 11,
						spriteWidth: 93,
						spriteHeight: 101,
						spriteOrigin: 47,
						speed: 6
					},
					{
						spriteLeft: 16,
						spriteTop: 135,
						spriteWidth: 124,
						spriteHeight: 81,
						spriteOrigin: 62,
						speed: 6
					},
					{
						spriteLeft: 145,
						spriteTop: 135,
						spriteWidth: 163,
						spriteHeight: 81,
						spriteOrigin: 82,
						speed: 6
					},
					{
						spriteLeft: 313,
						spriteTop: 135,
						spriteWidth: 191,
						spriteHeight: 81,
						spriteOrigin: 96,
						speed: 6
					},
					{
						spriteLeft: 509,
						spriteTop: 135,
						spriteWidth: 196,
						spriteHeight: 81,
						spriteOrigin: 98,
						speed: 6
					},
					{
						spriteLeft: 12,
						spriteTop: 227,
						spriteWidth: 203,
						spriteHeight: 77,
						spriteOrigin: 102,
						speed: 6
					},
					{
						spriteLeft: 259,
						spriteTop: 227,
						spriteWidth: 202,
						spriteHeight: 77,
						spriteOrigin: 101,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		},
		dead: {
			key: 'dead',
			type: 'skill',
			frames: [
				{
					spriteLeft: 0,
					spriteTop: 0,
					spriteWidth: 0,
					spriteHeight: 0,
					spriteOrigin: 0,
					speed: 1,
					props: {
						remove: true
					}
				}
			]
		}
	},
	gear: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 1.5,
		invulnerable: true,
		knockback: 5,
		height: 179 * 1.5,
		class: __spell,
		src: './images/main/archer/gear.png',
		name: 'Gear',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 12,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 12,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193 * 2,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 11,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193 * 3,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193 * 2,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193 * 2,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air',
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193 * 3,
						spriteTop: 0,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 179,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193,
						spriteTop: 179,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193 * 2,
						spriteTop: 179,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 193 * 3,
						spriteTop: 179,
						spriteWidth: 193,
						spriteHeight: 179,
						spriteOrigin: 97,
						extraStepXRate: .4,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	star: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * .65,
		invulnerable: true,
		height: 54 * .65,
		class: __spell,
		src: './images/main/thief/blade.png',
		name: 'Star',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 9,
						spriteTop: 0,
						spriteWidth: 80,
						spriteHeight: 154,
						spriteOrigin: 40,
						extraStepXRate: 1,
						speed: 8,
						props: {
							ultimate: true
						},
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 100,
						spriteTop: 0,
						spriteWidth: 72,
						spriteHeight: 154,
						spriteOrigin: 36,
						extraStepXRate: 1,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 184,
						spriteTop: 0,
						spriteWidth: 85,
						spriteHeight: 154,
						spriteOrigin: 43,
						extraStepXRate: 1,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 9,
						spriteTop: 0,
						spriteWidth: 80,
						spriteHeight: 154,
						spriteOrigin: 40,
						extraStepXRate: 1,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 100,
						spriteTop: 0,
						spriteWidth: 72,
						spriteHeight: 154,
						spriteOrigin: 36,
						extraStepXRate: 1,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 184,
						spriteTop: 0,
						spriteWidth: 85,
						spriteHeight: 154,
						spriteOrigin: 43,
						extraStepXRate: 1,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	chain: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 3,
		invulnerable: true,
		push: true,
		height: 30,
		class: __spell,
		pierce: true,
		src: './images/main/thief/chain2.png',
		name: 'Chain',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				attack: true,
				useExtraStepXRate: true,
				frames: [
					{
						spriteLeft: 366,
						spriteTop: 0,
						spriteWidth: 54,
						spriteHeight: 30,
						spriteOrigin: 27,
						bottomGap: -40,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 366,
						spriteTop: 0,
						spriteWidth: 54,
						spriteHeight: 30,
						spriteOrigin: 27,
						bottomGap: -40,
						speed: 3
					},
					{
						spriteLeft: 300,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 30,
						spriteOrigin: 60,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 300,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 30,
						spriteOrigin: 60,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 250,
						spriteTop: 0,
						spriteWidth: 170,
						spriteHeight: 30,
						spriteOrigin: 85,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 250,
						spriteTop: 0,
						spriteWidth: 170,
						spriteHeight: 30,
						spriteOrigin: 85,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 200,
						spriteTop: 0,
						spriteWidth: 220,
						spriteHeight: 30,
						spriteOrigin: 110,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 200,
						spriteTop: 0,
						spriteWidth: 220,
						spriteHeight: 30,
						spriteOrigin: 110,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 3,
					},
					{
						spriteLeft: 150 + 840,
						spriteTop: 0,
						spriteWidth: 270,
						spriteHeight: 30,
						spriteOrigin: 135,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 150 + 840,
						spriteTop: 0,
						spriteWidth: 270,
						spriteHeight: 30,
						spriteOrigin: 135,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 100 + 840,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 30,
						spriteOrigin: 160,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 100 + 840,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 30,
						spriteOrigin: 160,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 50 + 1260,
						spriteTop: 0,
						spriteWidth: 370,
						spriteHeight: 30,
						spriteOrigin: 185,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 50 + 1260,
						spriteTop: 0,
						spriteWidth: 370,
						spriteHeight: 30,
						spriteOrigin: 185,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 0 + 1260,
						spriteTop: 0,
						spriteWidth: 420,
						spriteHeight: 30,
						spriteOrigin: 210,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 1,
						bleed: 'back',
						atk: {
							yRange: 10,
							rate: .5,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0 + 1260,
						spriteTop: 0,
						spriteWidth: 420,
						spriteHeight: 30,
						spriteOrigin: 210,
						bottomGap: -40,
						extraStepXRate: 1,
						speed: 3
					},
					{
						spriteLeft: 0 + 420,
						spriteTop: 0,
						spriteWidth: 420,
						spriteHeight: 30,
						spriteOrigin: 210,
						bottomGap: -40,
						extraStepXRate: -.5,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 50 + 420,
						spriteTop: 0,
						spriteWidth: 370,
						spriteHeight: 30,
						spriteOrigin: 185,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0 + 420,
						spriteTop: 0,
						spriteWidth: 320,
						spriteHeight: 30,
						spriteOrigin: 160,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 150 + 420,
						spriteTop: 0,
						spriteWidth: 270,
						spriteHeight: 30,
						spriteOrigin: 135,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 200 + 420,
						spriteTop: 0,
						spriteWidth: 220,
						spriteHeight: 30,
						spriteOrigin: 110,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 250 + 420,
						spriteTop: 0,
						spriteWidth: 170,
						spriteHeight: 30,
						spriteOrigin: 85,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 300 + 420,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 30,
						spriteOrigin: 60,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 300 + 420,
						spriteTop: 0,
						spriteWidth: 120,
						spriteHeight: 30,
						spriteOrigin: 60,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4,
						push: 'reversed',
						atk: {
							yRange: 10,
							rate: .25,
							reset: true,
							hurt: {
								objects: [{ key: 'bloodhit', position: 'middle' }],
								key: 'hurtground2',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 400 + 420,
						spriteTop: 0,
						spriteWidth: 20,
						spriteHeight: 30,
						spriteOrigin: 10,
						bottomGap: -40,
						extraStepXRate: -1,
						speed: 4
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 30,
						spriteOrigin: 0,
						bottomGap: -40,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	hurricane2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.3,
		invulnerable: true,
		height: 250,
		lightningDmgRate: 100,
		class: __spell,
		src: './images/main/warrior/storm2.png',
		name: 'Hurricane',
		lightColor: '#00FF0020',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				maxRepeat: 2,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 8
					},
					{
						spriteLeft: 250,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 250,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 8
					},
					{
						spriteLeft: 500,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 500,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 8
					},
					{
						spriteLeft: 750,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 250,
						spriteTop: 0,
						spriteWidth: 250,
						spriteHeight: 250,
						spriteOrigin: 125,
						extraStepXRate: .4,
						speed: 8
					},
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	hurricane: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 1.5,
		invulnerable: true,
		height: 182 * 1.5,
		lightningDmgRate: 100,
		class: __spell,
		src: './images/main/warrior/storm.png',
		name: 'Hurricane',
		lightColor: '#00FF0020',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 11
					},
					{
						spriteLeft: 218,
						spriteTop: 0,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 218,
						spriteTop: 0,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 11
					},
					{
						spriteLeft: 436,
						spriteTop: 0,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 436,
						spriteTop: 0,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 11
					},
					{
						spriteLeft: 0,
						spriteTop: 192,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 192,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 11
					},
					{
						spriteLeft: 218,
						spriteTop: 192,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 218,
						spriteTop: 192,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 11
					},
					{
						spriteLeft: 436,
						spriteTop: 192,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 1,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 436,
						spriteTop: 192,
						spriteWidth: 218,
						spriteHeight: 182,
						spriteOrigin: 109,
						extraStepXRate: .4,
						speed: 11
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	lightningball2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.35,
		invulnerable: true,
		height: 600 * 1.35,
		class: __spell,
		pierce: true,
		src: './images/main/thief/lightning-ball2.png',
		name: 'Tesla Ball',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 257 * 4,
						spriteTop: 0,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 4,
						spriteTop: 600,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 4,
						spriteTop: 1200,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 4,
						spriteTop: 1800,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 4,
						spriteTop: 2400,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 4,
						spriteTop: 3000,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 3,
						spriteTop: 0,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 3,
						spriteTop: 600,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 3,
						spriteTop: 1200,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 3,
						spriteTop: 1800,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 3,
						spriteTop: 2400,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 3,
						spriteTop: 3000,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 2,
						spriteTop: 0,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 2,
						spriteTop: 600,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 2,
						spriteTop: 1200,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 2,
						spriteTop: 1800,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 2,
						spriteTop: 2400,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257 * 2,
						spriteTop: 3000,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257,
						spriteTop: 0,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257,
						spriteTop: 600,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257,
						spriteTop: 1200,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257,
						spriteTop: 1800,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257,
						spriteTop: 2400,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 257,
						spriteTop: 3000,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 600,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 1200,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 1800,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 300,
							reset: true,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 2400,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 3000,
						spriteWidth: 257,
						spriteHeight: 450,
						spriteOrigin: 129,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							reset: true,
							aoe: 300,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	lightningball: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		height: 1365,
		class: __spell,
		src: './images/main/thief/lightning-ball.png',
		name: 'Lightning Ball',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 1,
						spriteTop: 0,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 2,
						spriteTop: 0,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 3,
						spriteTop: 0,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 4,
						spriteTop: 0,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 5,
						spriteTop: 0,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 683,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 1,
						spriteTop: 683,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 2,
						spriteTop: 683,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							rate: .5,
							aoe: 342,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 3,
						spriteTop: 683,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 4,
						spriteTop: 683,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 5,
						spriteTop: 683,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 683 * 2,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 1,
						spriteTop: 683 * 2,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 2,
						spriteTop: 683 * 2,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 3,
						spriteTop: 683 * 2,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 4,
						spriteTop: 683 * 2,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 5,
						spriteTop: 683 * 2,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 683 * 3,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 1,
						spriteTop: 683 * 3,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 2,
						spriteTop: 683 * 3,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 3,
						spriteTop: 683 * 3,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 4,
						spriteTop: 683 * 3,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 683 * 5,
						spriteTop: 683 * 3,
						spriteWidth: 683,
						spriteHeight: 683,
						spriteOrigin: 342,
						speed: 6,
						atk: {
							yRange: 10,
							aoe: 342,
							rate: .5,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	beyblade: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * .75,
		invulnerable: true,
		class: __spell,
		lightColor: '#00FF0020',
		name: 'Beyblade',
		src: './images/main/warrior/sprite.png',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 111,
						spriteTop: 1620,
						spriteWidth: 255,
						spriteHeight: 269,
						spriteOrigin: 128,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							aoe: 130,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 452,
						spriteTop: 1620,
						spriteWidth: 267,
						spriteHeight: 269,
						spriteOrigin: 134,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						sound: { key:'beyblade', volume:.4 },
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							aoe: 130,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 835,
						spriteTop: 1620,
						spriteWidth: 269,
						spriteHeight: 269,
						spriteOrigin: 135,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							aoe: 130,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 1200,
						spriteTop: 1620,
						spriteWidth: 264,
						spriteHeight: 269,
						spriteOrigin: 132,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 111,
						spriteTop: 1620,
						spriteWidth: 255,
						spriteHeight: 269,
						spriteOrigin: 128,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 452,
						spriteTop: 1620,
						spriteWidth: 267,
						spriteHeight: 269,
						spriteOrigin: 134,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							reset: 1,
							aoe: 130,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 835,
						spriteTop: 1620,
						spriteWidth: 269,
						spriteHeight: 269,
						spriteOrigin: 135,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 1200,
						spriteTop: 1620,
						spriteWidth: 264,
						spriteHeight: 269,
						spriteOrigin: 132,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 111,
						spriteTop: 1620,
						spriteWidth: 255,
						spriteHeight: 269,
						spriteOrigin: 128,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 452,
						spriteTop: 1620,
						spriteWidth: 267,
						spriteHeight: 269,
						spriteOrigin: 134,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 835,
						spriteTop: 1620,
						spriteWidth: 269,
						spriteHeight: 269,
						spriteOrigin: 135,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 1200,
						spriteTop: 1620,
						spriteWidth: 264,
						spriteHeight: 269,
						spriteOrigin: 132,
						extraStepXRate: 1,
						bottomGap: -40,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 2,
							aoe: 130,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground',
								buffs: [{
									key: 'slow',
									level: 2
								}]
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 1923,
						spriteTop: 1620,
						spriteWidth: 256,
						spriteHeight: 269,
						spriteOrigin: 128,
						bottomGap: -40,
						speed: 3
					},
					{
						spriteLeft: 2285,
						spriteTop: 1620,
						spriteWidth: 265,
						spriteHeight: 269,
						spriteOrigin: 133,
						bottomGap: -40,
						speed: 2
					},
					{
						spriteLeft: 2285,
						spriteTop: 1620,
						spriteWidth: 265,
						spriteHeight: 269,
						spriteOrigin: 133,
						bottomGap: -40,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	horse: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.25,
		invulnerable: true,
		class: __spell,
		name: 'Horse',
		src: './images/sprites/ep29/horse.png',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 1
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						sound:{key:'neigh', reset:true, bind:true, volume:.3},
						speed: 3,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 380,
						spriteTop: 0,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						objects: [
							{
								key: 'cloudground',
								position: 'behind-feet',
								xGap: 150
							}
						],
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 760,
						spriteTop: 0,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						sound:{key:'horse', bind:true, volume:.3},
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 0,
						spriteTop: 291,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 380,
						spriteTop: 291,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 760,
						spriteTop: 291,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 0,
						spriteTop: 291 * 2,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 380,
						spriteTop: 291 * 2,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						objects: [
							{
								key: 'cloudground',
								position: 'behind-feet',
								xGap: 150
							}
						],
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 760,
						spriteTop: 291 * 2,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 0,
						spriteTop: 291 * 3,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 380,
						spriteTop: 291 * 3,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 760,
						spriteTop: 291 * 3,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 0,
						spriteTop: 291 * 4,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 380,
						spriteTop: 291 * 4,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						objects: [
							{
								key: 'cloudground',
								position: 'behind-feet',
								xGap: 150
							}
						],
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 760,
						spriteTop: 291 * 4,
						spriteWidth: 380,
						spriteHeight: 291,
						spriteOrigin: 190,
						bottomGap: 16,
						extraStepXRate: 1,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 291,
						spriteOrigin: 0,
						bottomGap: 16,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	wolf: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.33,
		invulnerable: true,
		class: __spell,
		name: 'Wolf',
		pierce: true,
		src: './images/sprites/ep29/wolf.png',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				maxRepeat: 2,
				frames: [
					{
						spriteLeft: 300,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						objects: [
							{
								key: 'cloudground',
								position: 'behind-feet',
								xGap: 150
							}
						],
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 240,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 240,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 240,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						objects: [
							{
								key: 'cloudground',
								position: 'behind-feet',
								xGap: 150
							}
						],
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 720,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 720,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 720,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 291,
						spriteOrigin: 0,
						bottomGap: 16,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	wolf2: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.33,
		invulnerable: true,
		class: __spell,
		name: 'Wolf 2',
		pierce: true,
		src: './images/sprites/ep29/wolf.png',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				maxRepeat: 2,
				frames: [
					{
						spriteLeft: 600,
						spriteTop: 240,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 480,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						objects: [
							{
								key: 'cloudground',
								position: 'behind-feet',
								xGap: 150
							}
						],
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 720,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 720,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 720,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 960,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 300,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 0,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						objects: [
							{
								key: 'cloudground',
								position: 'behind-feet',
								xGap: 150
							}
						],
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 240,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					},

					{
						spriteLeft: 300,
						spriteTop: 240,
						spriteWidth: 300,
						spriteHeight: 240,
						spriteOrigin: 150,
						bottomGap: 39,
						extraStepXRate: .8,
						speed: 4,
						atk: {
							yRange: 15,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'common'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 291,
						spriteOrigin: 0,
						bottomGap: 16,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	bats: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.2 * 1.5,
		invulnerable: true,
		class: __spell,
		autoAim: 30,
		src: './images/sprites/ep14/sprite.png',
		name: 'Bats',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				maxRepeat: 12,
				move: true,
				frames: [
					{
						spriteLeft: 40,
						spriteTop: 32,
						spriteWidth: 18,
						spriteHeight: 107,
						spriteOrigin: 9,
						extraStepYRate: .75,
						extraStepXRate: .15,
						speed: 4,
						atk: {
							yRange: 50,
							rate: .1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 72,
						spriteTop: 32,
						spriteWidth: 18,
						spriteHeight: 107,
						spriteOrigin: 9,
						extraStepYRate: .75,
						extraStepXRate: .15,
						speed: 4,
						atk: {
							yRange: 50,
							rate: .1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 106,
						spriteTop: 37,
						spriteWidth: 18,
						spriteHeight: 117,
						spriteOrigin: 9,
						extraStepYRate: .75,
						extraStepXRate: .15,
						speed: 4,
						atk: {
							yRange: 50,
							rate: .1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						bottomGap: -107,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	bat: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		class: __spell,
		autoAim: 42,
		src: './images/sprites/ep624/sprite.png',
		name: 'Bat',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				maxRepeat: 12,
				move: true,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 200,
						spriteOrigin: 100,
						bottomGap: -100,
						extraStepXRate: 1,
						speed: 6,
						sound: { key: 'batflap' , volume: 1 },
						atk: {
							yRange: 10,
							rate: 1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 200,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 200,
						spriteOrigin: 100,
						bottomGap: -100,
						extraStepXRate: 1,
						speed: 6,
						sound: { key: 'batflap' , volume: 1 },
						atk: {
							yRange: 10,
							rate: 1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 400,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 200,
						spriteOrigin: 100,
						bottomGap: -100,
						extraStepXRate: 1,
						speed: 6,
						sound: { key: 'batflap' , volume: 1 },
						atk: {
							yRange: 10,
							rate: 1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 600,
						spriteTop: 0,
						spriteWidth: 200,
						spriteHeight: 200,
						spriteOrigin: 100,
						bottomGap: -100,
						extraStepXRate: 1,
						speed: 6,
						sound: { key: 'batflap' , volume: 1 },
						atk: {
							yRange: 10,
							rate: 1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 200,
						spriteWidth: 200,
						spriteHeight: 200,
						spriteOrigin: 100,
						bottomGap: -100,
						extraStepXRate: 1,
						speed: 6,
						sound: { key: 'batflap' , volume: 1 },
						atk: {
							yRange: 10,
							rate: 1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 200,
						spriteTop: 200,
						spriteWidth: 200,
						spriteHeight: 200,
						spriteOrigin: 100,
						bottomGap: -100,
						extraStepXRate: 1,
						speed: 6,
						sound: { key: 'batflap' , volume: 1 },
						atk: {
							yRange: 10,
							rate: 1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					},
					{
						spriteLeft: 400,
						spriteTop: 200,
						spriteWidth: 200,
						spriteHeight: 200,
						spriteOrigin: 100,
						bottomGap: -100,
						extraStepXRate: 1,
						speed: 6,
						sound: { key: 'batflap' , volume: 1 },
						atk: {
							yRange: 10,
							rate: 1,
							type: 'common',
							hurt: {
								sound: 'batsattack',
								key: 'hurtground1',
								type: 'ground'
							}
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						bottomGap: -107,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	medusabolt: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/ep16/spell.png',
		name: 'Medusa Bolt',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 10,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 85,
						spriteOrigin: 50,
						extraStepXRate: .8,
						bottomGap: -65,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 110,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 85,
						spriteOrigin: 50,
						extraStepXRate: .8,
						bottomGap: -65,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 210,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 85,
						spriteOrigin: 50,
						extraStepXRate: .8,
						bottomGap: -65,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 310,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 85,
						spriteOrigin: 50,
						extraStepXRate: .8,
						bottomGap: -65,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					},
					{
						spriteLeft: 410,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 85,
						spriteOrigin: 50,
						extraStepXRate: .8,
						bottomGap: -65,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'lightning'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 8,
						spriteTop: 90,
						spriteWidth: 100,
						spriteHeight: 100,
						spriteOrigin: 50,
						extraStepXRate: .4,
						bottomGap: -65,
						speed: 3
					},
					{
						spriteLeft: 110,
						spriteTop: 90,
						spriteWidth: 100,
						spriteHeight: 100,
						spriteOrigin: 50,
						extraStepXRate: .3,
						bottomGap: -65,
						speed: 3
					},
					{
						spriteLeft: 210,
						spriteTop: 90,
						spriteWidth: 100,
						spriteHeight: 100,
						spriteOrigin: 50,
						bottomGap: -65,
						extraStepXRate: .2,
						speed: 3
					},
					{
						spriteLeft: 313,
						spriteTop: 90,
						spriteWidth: 100,
						spriteHeight: 100,
						spriteOrigin: 50,
						bottomGap: -65,
						extraStepXRate: .1,
						speed: 3
					},
					{
						spriteLeft: 413,
						spriteTop: 90,
						spriteWidth: 100,
						spriteHeight: 100,
						spriteOrigin: 50,
						bottomGap: -65,
						speed: 2
					},
					{
						spriteLeft: 413,
						spriteTop: 90,
						spriteWidth: 100,
						spriteHeight: 100,
						spriteOrigin: 50,
						bottomGap: -65,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	medusabubble: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 2,
		invulnerable: true,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep16/spell.png',
		name: 'Medusa Bubble',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 11,
						spriteTop: 215,
						spriteWidth: 92,
						spriteHeight: 44,
						spriteOrigin: 46,
						bottomGap: 9,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 116,
						spriteTop: 215,
						spriteWidth: 92,
						spriteHeight: 44,
						spriteOrigin: 46,
						bottomGap: 9,
						sound: 'medusabubble',
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 220,
						spriteTop: 215,
						spriteWidth: 92,
						spriteHeight: 44,
						spriteOrigin: 46,
						bottomGap: 9,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 327,
						spriteTop: 215,
						spriteWidth: 92,
						spriteHeight: 44,
						spriteOrigin: 46,
						bottomGap: 9,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 434,
						spriteTop: 215,
						spriteWidth: 86,
						spriteHeight: 44,
						spriteOrigin: 43,
						bottomGap: 9,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 11,
						spriteTop: 315,
						spriteWidth: 92,
						spriteHeight: 65,
						spriteOrigin: 46,
						bottomGap: 27,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 116,
						spriteTop: 315,
						spriteWidth: 92,
						spriteHeight: 65,
						spriteOrigin: 46,
						bottomGap: 27,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 217,
						spriteTop: 315,
						spriteWidth: 98,
						spriteHeight: 65,
						spriteOrigin: 49,
						bottomGap: 27,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 319,
						spriteTop: 315,
						spriteWidth: 104,
						spriteHeight: 65,
						spriteOrigin: 52,
						bottomGap: 27,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					},
					{
						spriteLeft: 432,
						spriteTop: 315,
						spriteWidth: 88,
						spriteHeight: 65,
						spriteOrigin: 44,
						bottomGap: 27,
						speed: 8,
						atk: {
							yRange: 10,
							rate: 2,
							hurt: {
								key: 'hurtair',
								type: 'air'
							},
							type: 'ice'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						props: {
							remove: true
						},
						speed: 1
					}
				]
			}
		}
	},
	shamanravens: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep38/sprite.png',
		name: 'Shaman Ravens',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 262,
						spriteTop: 885,
						spriteWidth: 159,
						spriteHeight: 179,
						spriteOrigin: 143,
						bottomGap: -84,
						sound: { key: 'ravensflap', volume: 1 },
						speed: 6
					},
					{
						spriteLeft: 570,
						spriteTop: 885,
						spriteWidth: 227,
						spriteHeight: 179,
						spriteOrigin: 114,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 972,
						spriteTop: 885,
						spriteWidth: 421,
						spriteHeight: 179,
						spriteOrigin: 211,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1519,
						spriteTop: 885,
						spriteWidth: 360,
						spriteHeight: 179,
						spriteOrigin: 180,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1988,
						spriteTop: 885,
						spriteWidth: 377,
						spriteHeight: 179,
						spriteOrigin: 189,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 972,
						spriteTop: 885,
						spriteWidth: 421,
						spriteHeight: 179,
						spriteOrigin: 211,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1519,
						spriteTop: 885,
						spriteWidth: 360,
						spriteHeight: 179,
						spriteOrigin: 180,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1988,
						spriteTop: 885,
						spriteWidth: 377,
						spriteHeight: 179,
						spriteOrigin: 189,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 972,
						spriteTop: 885,
						spriteWidth: 421,
						spriteHeight: 179,
						spriteOrigin: 211,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1519,
						spriteTop: 885,
						spriteWidth: 360,
						spriteHeight: 179,
						spriteOrigin: 180,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1988,
						spriteTop: 885,
						spriteWidth: 377,
						spriteHeight: 179,
						spriteOrigin: 189,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 972,
						spriteTop: 885,
						spriteWidth: 421,
						spriteHeight: 179,
						spriteOrigin: 211,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1519,
						spriteTop: 885,
						spriteWidth: 360,
						spriteHeight: 179,
						spriteOrigin: 180,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 1988,
						spriteTop: 885,
						spriteWidth: 377,
						spriteHeight: 179,
						spriteOrigin: 189,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					// {
					// 	spriteLeft: 2605,
					// 	spriteTop: 1455,
					// 	spriteWidth: 377,
					// 	spriteHeight: 179,
					// 	spriteOrigin: 189,
					// 	bottomGap: -84,
					// 	speed: 10,
					// 	atk: {
					// 		yRange: 10,
					// 		rate: 2,
					// 		reset: 1,
					// 		hurt: {
					// 			key: 'hurtground1',
					// 			type: 'ground'
					// 		},
					// 		type: 'common'
					// 	}
					// },
					// {
					// 	spriteLeft: 3138,
					// 	spriteTop: 1443,
					// 	spriteWidth: 377,
					// 	spriteHeight: 179,
					// 	spriteOrigin: 189,
					// 	bottomGap: -84,
					// 	speed: 6
					// },
					// {
					// 	spriteLeft: 3641,
					// 	spriteTop: 1434,
					// 	spriteWidth: 374,
					// 	spriteHeight: 179,
					// 	spriteOrigin: 187,
					// 	bottomGap: -84,
					// 	speed: 6
					// }
					{
						spriteLeft: 570,
						spriteTop: 885,
						spriteWidth: 227,
						spriteHeight: 179,
						spriteOrigin: 114,
						bottomGap: -84,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 262,
						spriteTop: 885,
						spriteWidth: 159,
						spriteHeight: 179,
						spriteOrigin: 143,
						bottomGap: -84,
						speed: 6
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	shamanbreath: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep36/sprite.png',
		name: 'Shaman Fire Breath',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 1330,
						spriteTop: 1790,
						spriteWidth: 286,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1702,
						spriteTop: 1790,
						spriteWidth: 285,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 2064,
						spriteTop: 1790,
						spriteWidth: 284,
						spriteHeight: 191,
						spriteOrigin: 142,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1330,
						spriteTop: 1790,
						spriteWidth: 286,
						spriteHeight: 191,
						spriteOrigin: 143,
						sound: { key: 'creatureground2', volume: .2 },
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1702,
						spriteTop: 1790,
						spriteWidth: 285,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 2064,
						spriteTop: 1790,
						spriteWidth: 284,
						spriteHeight: 191,
						spriteOrigin: 142,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1330,
						spriteTop: 1790,
						spriteWidth: 286,
						spriteHeight: 191,
						spriteOrigin: 143,
						sound: { key: 'creatureground2', volume: .2 },
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 1702,
						spriteTop: 1790,
						spriteWidth: 285,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 2064,
						spriteTop: 1790,
						spriteWidth: 284,
						spriteHeight: 191,
						spriteOrigin: 142,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 2466,
						spriteTop: 1790,
						spriteWidth: 278,
						spriteHeight: 191,
						spriteOrigin: 139,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 2871,
						spriteTop: 1790,
						spriteWidth: 263,
						spriteHeight: 191,
						spriteOrigin: 132,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 3258,
						spriteTop: 1790,
						spriteWidth: 257,
						spriteHeight: 191,
						spriteOrigin: 129,
						bottomGap: -78,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 3649,
						spriteTop: 1790,
						spriteWidth: 240,
						spriteHeight: 191,
						spriteOrigin: 120,
						bottomGap: -78,
						speed: 10
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	shamanbreathrage: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.1,
		invulnerable: true,
		extraStepXRate: 1,
		pierce: true,
		class: __spell,
		src: './images/sprites/ep36/shaman-breath-rage.png',
		name: 'Shaman Rage Breath',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 1330 - 1299,
						spriteTop: 30,
						spriteWidth: 286,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 1702 - 1299,
						spriteTop: 30,
						spriteWidth: 285,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 2064 - 1299,
						spriteTop: 30,
						spriteWidth: 284,
						spriteHeight: 191,
						spriteOrigin: 142,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 1330 - 1299,
						spriteTop: 30,
						spriteWidth: 286,
						spriteHeight: 191,
						spriteOrigin: 143,
						sound: { key: 'creatureground2', volume: .2 },
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 1702 - 1299,
						spriteTop: 30,
						spriteWidth: 285,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 2064 - 1299,
						spriteTop: 30,
						spriteWidth: 284,
						spriteHeight: 191,
						spriteOrigin: 142,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 1330 - 1299,
						spriteTop: 30,
						spriteWidth: 286,
						spriteHeight: 191,
						spriteOrigin: 143,
						sound: { key: 'creatureground2', volume: .2 },
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 1702 - 1299,
						spriteTop: 30,
						spriteWidth: 285,
						spriteHeight: 191,
						spriteOrigin: 143,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 2064 - 1299,
						spriteTop: 30,
						spriteWidth: 284,
						spriteHeight: 191,
						spriteOrigin: 142,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 2466 - 1299,
						spriteTop: 30,
						spriteWidth: 278,
						spriteHeight: 191,
						spriteOrigin: 139,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 2871 - 1299,
						spriteTop: 30,
						spriteWidth: 263,
						spriteHeight: 191,
						spriteOrigin: 132,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3258 - 1299,
						spriteTop: 30,
						spriteWidth: 257,
						spriteHeight: 191,
						spriteOrigin: 129,
						bottomGap: -70,
						speed: 10,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 3649 - 1299,
						spriteTop: 30,
						spriteWidth: 240,
						spriteHeight: 191,
						spriteOrigin: 120,
						bottomGap: -78,
						speed: 10
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	shamanfire: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/ep36/sprite.png',
		name: 'Shaman Fireball',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 2639,
						spriteTop: 1330,
						spriteWidth: 132,
						spriteHeight: 76,
						spriteOrigin: 108,
						bottomGap: -120,
						extraStepXRate: 1.25,
						sound: { key: 'fireball', volume: .2 },
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 2888,
						spriteTop: 1330,
						spriteWidth: 143,
						spriteHeight: 76,
						spriteOrigin: 122,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 3152,
						spriteTop: 1330,
						spriteWidth: 144,
						spriteHeight: 76,
						spriteOrigin: 112,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 3399,
						spriteTop: 1330,
						spriteWidth: 142,
						spriteHeight: 76,
						spriteOrigin: 121,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
					{
						spriteLeft: 3650,
						spriteTop: 1321,
						spriteWidth: 140,
						spriteHeight: 76,
						spriteOrigin: 119,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 2,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'fire'
						}
					},
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 2622,
						spriteTop: 1446,
						spriteWidth: 142,
						spriteHeight: 126,
						spriteOrigin: 120,
						bottomGap: -95,
						speed: 6
					},
					{
						spriteLeft: 2887,
						spriteTop: 1446,
						spriteWidth: 133,
						spriteHeight: 126,
						spriteOrigin: 113,
						bottomGap: -95,
						speed: 6
					},
					{
						spriteLeft: 3171,
						spriteTop: 1446,
						spriteWidth: 112,
						spriteHeight: 126,
						spriteOrigin: 98,
						bottomGap: -95,
						speed: 6
					},
					{
						spriteLeft: 3483,
						spriteTop: 1446,
						spriteWidth: 38,
						spriteHeight: 126,
						spriteOrigin: 28,
						bottomGap: -95,
						speed: 6
					},
					{
						spriteLeft: 3733,
						spriteTop: 1446,
						spriteWidth: 18,
						spriteHeight: 126,
						spriteOrigin: 10,
						bottomGap: -95,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	shamanskull: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		extraStepXRate: 1,
		class: __spell,
		src: './images/sprites/ep36/sprite.png',
		name: 'Shaman Skull',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				frames: [
					{
						spriteLeft: 3236,
						spriteTop: 2255,
						spriteWidth: 71,
						spriteHeight: 76,
						spriteOrigin: 56,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3380,
						spriteTop: 2255,
						spriteWidth: 59,
						spriteHeight: 76,
						spriteOrigin: 19,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3504,
						spriteTop: 2255,
						spriteWidth: 93,
						spriteHeight: 76,
						spriteOrigin: 16,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3650,
						spriteTop: 2255,
						spriteWidth: 70,
						spriteHeight: 76,
						spriteOrigin: 41,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3236,
						spriteTop: 2255,
						spriteWidth: 71,
						spriteHeight: 76,
						spriteOrigin: 56,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 5,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3380,
						spriteTop: 2255,
						spriteWidth: 59,
						spriteHeight: 76,
						spriteOrigin: 19,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3504,
						spriteTop: 2255,
						spriteWidth: 93,
						spriteHeight: 76,
						spriteOrigin: 16,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					},
					{
						spriteLeft: 3650,
						spriteTop: 2255,
						spriteWidth: 70,
						spriteHeight: 76,
						spriteOrigin: 41,
						bottomGap: -120,
						extraStepXRate: 1.25,
						speed: 4,
						atk: {
							yRange: 10,
							rate: 3,
							reset: 1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'fire'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'shadow'
						}
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						sound: 'puff',
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	roots: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1.35,
		invulnerable: true,
		class: __spell,
		width: 120,
		autoAim: 80,
		drawPriority: .5,
		pierce: true,
		hasShadow: false,
		still: true,
		src: './images/sprites/ep38/roots.png',
		name: 'Roots',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 8,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 60,
						spriteOrigin: 50,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							reset: 1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 200,
						spriteTop: 0,
						spriteWidth: 98,
						spriteHeight: 60,
						spriteOrigin: 49,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							reset:1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 376,
						spriteTop: 0,
						spriteWidth: 135,
						spriteHeight: 60,
						spriteOrigin: 68,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							reset:1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'root'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 567,
						spriteTop: 0,
						spriteWidth: 133,
						spriteHeight: 60,
						spriteOrigin: 67,
						speed: 6
					},
					{
						spriteLeft: 760,
						spriteTop: 0,
						spriteWidth: 128,
						spriteHeight: 60,
						spriteOrigin: 64,
						speed: 6
					},
					{
						spriteLeft: 951,
						spriteTop: 0,
						spriteWidth: 132,
						spriteHeight: 60,
						spriteOrigin: 66,
						speed: 84
					},
					{
						spriteLeft: 760,
						spriteTop: 0,
						spriteWidth: 128,
						spriteHeight: 60,
						spriteOrigin: 64,
						speed: 6
					},
					{
						spriteLeft: 567,
						spriteTop: 0,
						spriteWidth: 133,
						spriteHeight: 60,
						spriteOrigin: 67,
						speed: 6
					},
					{
						spriteLeft: 376,
						spriteTop: 0,
						spriteWidth: 135,
						spriteHeight: 60,
						spriteOrigin: 68,
						speed: 6
					},
					{
						spriteLeft: 200,
						spriteTop: 0,
						spriteWidth: 98,
						spriteHeight: 60,
						spriteOrigin: 49,
						speed: 6
					},
					{
						spriteLeft: 8,
						spriteTop: 0,
						spriteWidth: 100,
						spriteHeight: 60,
						spriteOrigin: 50,
						speed: 6
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						sound: 'puff',
						props: {
							remove: true
						}
					}
				]
			}
		}
	},
	tentacles: {
		defaultDirection: __right,
		defaultAnimationKey: 'run',
		zoom: 1,
		invulnerable: true,
		class: __spell,
		width: 256,
		autoAim: 80,
		drawPriority: .5,
		pierce: true,
		hasShadow: false,
		still: true,
		src: './images/sprites/ep38/tentacles.png',
		name: 'Tentacles',
		animations: {
			idle: {
				key: "idle",
				type: 'skill',
				move: true,
				priority: 1,
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 256,
						spriteHeight: 40,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 266,
						spriteTop: 0,
						spriteWidth: 266,
						spriteHeight: 80,
						spriteOrigin: 128,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							reset:1,
							hurt: {
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 532,
						spriteTop: 0,
						spriteWidth: 266,
						spriteHeight: 120,
						spriteOrigin: 128,
						speed: 6,
						atk: {
							yRange: 10,
							rate: 1,
							reset:1,
							hurt: {
								buffs: [{
									level: 1,
									key: 'root'
								}],
								key: 'hurtground1',
								type: 'ground'
							},
							type: 'common'
						}
					},
					{
						spriteLeft: 0,
						spriteTop: 249,
						spriteWidth: 266,
						spriteHeight: 160,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 266,
						spriteTop: 249,
						spriteWidth: 266,
						spriteHeight: 200,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 532,
						spriteTop: 249,
						spriteWidth: 266,
						spriteHeight: 230 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 480,
						spriteWidth: 266,
						spriteHeight: 228 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 266,
						spriteTop: 480,
						spriteWidth: 266,
						spriteHeight: 228 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 532,
						spriteTop: 480,
						spriteWidth: 266,
						spriteHeight: 228 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 266,
						spriteHeight: 248 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 266,
						spriteTop: 0,
						spriteWidth: 266,
						spriteHeight: 248 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 532,
						spriteTop: 0,
						spriteWidth: 266,
						spriteHeight: 248 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 249,
						spriteWidth: 266,
						spriteHeight: 230 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 266,
						spriteTop: 249,
						spriteWidth: 266,
						spriteHeight: 230 - 30,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 532,
						spriteTop: 249,
						spriteWidth: 266,
						spriteHeight: 200,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 480,
						spriteWidth: 266,
						spriteHeight: 160,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 266,
						spriteTop: 480,
						spriteWidth: 266,
						spriteHeight: 120,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 532,
						spriteTop: 480,
						spriteWidth: 266,
						spriteHeight: 80,
						spriteOrigin: 128,
						speed: 6
					},
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 266,
						spriteHeight: 40,
						spriteOrigin: 128,
						speed: 6
					}
				]
			},
			dead: {
				key: "dead",
				type: 'skill',
				frames: [
					{
						spriteLeft: 0,
						spriteTop: 0,
						spriteWidth: 0,
						spriteHeight: 0,
						spriteOrigin: 0,
						speed: 1,
						sound: 'puff',
						props: {
							remove: true
						}
					}
				]
			}
		}
	}
}

function addSlingStoneSpells() {
    const _spellEffects = ['common', 'fire', 'ice', 'shadow', 'lightning', 'toxic', 'common'];
    const _colors = ['#808080cc', '#ff0000cc', '#0000ffcc', '#ff00ffcc', '#ffff00cc', '#00ff00cc'];
    const _bottomGaps = {
        common: [-120, -90, -60, -30, 0, -20, -40, -60, -80, -70, -35, 0, -15, -30, -45],
        fire: [-120, -135, -119, -100, -75, -45, 0, -40, -70, -90, -105, -95, -80, -60, -35],
        ice: [-120, -110, -90, -80, -70, -55, -30, 0, -25, -50, -70, -85, -95, -100, -90],
        shadow: [-120, -90, -60, -30, 0, -20, -40, -60, -80, -70, -35, 0, -15, -30, -45],
        lightning: [-110, -100, -90, -80, -65, -50, -35, -20, 0, -20, -35, -50, -65, -80, -90],
        toxic: [-130, -100, -70, -35, 0, -25, -50, -70, -80, -70, -40, 0, -20, -40, -55],
    };
    const _xCoords = {
        common: [1, 1, 1, .8, .8, .8, .6, .6, .6, .5, .5, .5, .4, .4, .4],
        fire: [.9, .9, .9, .8, .8, .8, .7, .7, .7, .6, .6, .5, .5, .4, .4],
        ice: [1.2, 1.2, 1.1, 1, 1, .9, .8, .7, .6, .5, .4, .3, .2, .1, .1],
        shadow: [1.1, 1.1, 1, .1, .9, .8, .7, .6, .6, .5, .5, .5, .4, .4, .4],
        lightning: [1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1, 1, 1, .9, .9, .9, .8, .8, .8],
        toxic: [1, 1, .9, .9, .8, .8, .7, .7, .6, .6, .5, .4, .3, .1, .1],
    };
	const _stoneReverse = function(_e, _dir) {
		const _reversed = !_dir;
		_dir = _dir ?? -1;
		const _fr = _e.animations.dead.frames;
		if(!_reversed) {
			delete _fr[0].objects;
			delete _fr[0].sound;
		}
		else {
			_fr[0].objects = [{
                                key: 'stars',
                                position: 'middle'
                            }];
			_fr[0].sound = { key: 'confetti', volume: 1 };
		}
		const _prev = _e.getPreviousFrame();
		if(!_prev)
			return;
		_fr[0].bottomGap = _prev.bottomGap ?? 0;
		_fr[0].extraStepXRate = _dir * _prev.extraStepXRate;
		_fr[1].bottomGap = MathRound((_prev.bottomGap ?? 0) / 2);
		_fr[1].extraStepXRate = MathRound(_dir * _prev.extraStepXRate * (_reversed ? .5 : .8));
		_fr[2].extraStepXRate = MathRound(_dir * _prev.extraStepXRate * (_reversed ? .35 : .5));
		_fr[3].extraStepXRate = MathRound(_dir * _prev.extraStepXRate * (_reversed ? .15 : .2));
	}
    for (let i = 1; i < 8; i++) {
        spells['slingstone' + i] = {
            defaultDirection: __right,
            defaultAnimationKey: 'run',
            zoom: 1,
            src: './images/sprites/ep620/sapantas' + i + '.png',
            invulnerable: true,
            extraStepXRate: 1,
            class: __spell,
            lightColor: _colors[i - 1],
            name: 'SlingStone' + i,
            animations: {
                dead: {
                    key: "dead",
                    type: 'skill',
                    frames: [
						{
                            spriteLeft: 180,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: -80,
                            extraStepXRate: -1,
                            speed: 6
                        },
						{
                            spriteLeft: 120,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: -40,
                            extraStepXRate: -.9,
                            speed: 6
                        },
						{
                            spriteLeft: 60,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: 0,
							sound: {
                                key: 'rockhit3',
                                volume: 1,
                                reset: true
                            },
                            extraStepXRate: -.7,
                            speed: 6
                        },
						{
                            spriteLeft: 0,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: 0,
                            extraStepXRate: -.5,
                            speed: 6
                        },
                        {
                            spriteLeft: 0,
                            spriteTop: 0,
                            spriteWidth: 0,
                            spriteHeight: 0,
                            spriteOrigin: 0,
                            props: {
                                remove: true
                            },
                            speed: 1
                        }
                    ]
                },
                idle: {
                    key: "idle",
                    type: 'skill',
                    move: true,
                    frames: [{
                            spriteLeft: 0,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][0],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][0],
                            speed: 1,
							do: function(_e) {
								_stoneReverse(_e);
							},
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 0,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][0],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][0],
                            speed: 5,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 60,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][1],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][1],
                            sound: _bottomGaps[_spellEffects[i - 1]][1] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][0]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][0] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            speed: 6,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 120,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][2],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][2],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][2] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][1]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][1] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 180,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][3],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][3],
                            sound: _bottomGaps[_spellEffects[i - 1]][3] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][2]) / 50,
                                reset: true
                            } : null,
                            speed: 6,
                            objects: _bottomGaps[_spellEffects[i - 1]][2] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 0,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][4],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][4],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][4] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][3]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][3] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 60,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][5],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][5],
                            sound: _bottomGaps[_spellEffects[i - 1]][5] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][4]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][4] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            speed: 6,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 120,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][6],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][6],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][6] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][5]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][5] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 180,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][7],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][7],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][7] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][6]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][6] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 0,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][8],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][8],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][8] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][7]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][7] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 60,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][9],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][9],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][9] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][8]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][8] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 120,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][10],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][10],
                            sound: _bottomGaps[_spellEffects[i - 1]][10] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][9]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][9] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            speed: 6,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 180,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][11],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][11],
                            sound: _bottomGaps[_spellEffects[i - 1]][11] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][10]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][10] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            speed: 6,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 0,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][12],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][12],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][12] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][11]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][11] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 60,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][13],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][13],
                            speed: 6,
                            sound: _bottomGaps[_spellEffects[i - 1]][13] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][12]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][12] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 120,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][14],
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][14],
                            sound: _bottomGaps[_spellEffects[i - 1]][14] === 0 ? {
                                key: 'rockhit3',
                                volume: MathAbs(_bottomGaps[_spellEffects[i - 1]][13]) / 50,
                                reset: true
                            } : null,
                            objects: _bottomGaps[_spellEffects[i - 1]][13] === 0 ? [{
                                key: 'throwwhite',
                                position: 'under-feet',
                                yGap: 10
                            }] : null,
                            speed: 6,
                            atk: {
                                yRange: 10,
                                rate: 2,
                                reset: true,
                                hurt: {
                                    key: 'hurtground1',
                                    type: 'ground'
                                },
                                type: _spellEffects[i - 1]
                            }
                        },
                        {
                            spriteLeft: 120,
                            spriteTop: 0,
                            spriteWidth: 60,
                            spriteHeight: 60,
                            spriteOrigin: 30,
                            extraStepXRate: _xCoords[_spellEffects[i - 1]][14],
                            bottomGap: _bottomGaps[_spellEffects[i - 1]][14],
                            do: function(_e) {
								_stoneReverse(_e, 1);
							},
                            speed: 1
                        }
                    ]
                }
            }
        };
    }
}

addSlingStoneSpells();
function getExistingImage(src, _isnew) {
	const _img = loadedEpisodeImages[src] ?? loadedImages[src];
	if(_isnew)
		return _img.cloneNode();
	return _img;
}
function getExistingSound(key) {
	return loadedSounds.find(x => x.key === key);
}
function getSound(src, key, _load, _noCache) {
	try	{
		let load = getExistingSound(key);
		if (load)
			return load.sound;
		if (!src)
			src = soundFiles[key];
		if (!src && !_load)
			return;
		const sound = document.createElement("audio");
		sound.crossOrigin = 'anonymous';
		if ("src" in sound)
			sound.autoPlay = false;
		else {
			//sound = document.createElement("bgsound");
			sound.preload = 'auto';
		}
		sound.volume = 0;
		sound.src = src;
		sound.play();
		if(key && !_noCache)
			loadedSounds.push({ sound: sound, key: key });
		//audioPreloader.appendChild(sound);
		return sound;
	}
	catch(_sex) {
		alert(_sex.message);
		return undefined;
	}
}
function getImagePromise(src, _cache) {
	return new Promise((resolve, reject) => {
		getImage(src, img => {
			if (!img)
				reject(new Error('Image load failed: ' + src));
			else
				resolve(img);
		}, null, _cache);
	});
}
function getImage(src, _func, _global, _cache) {
	let _zoom = src.split('?z=')?.[1];
	if(_zoom)
		_zoom = parseFloat(_zoom) * __zoom;
	else
		_zoom = 1;
	let load = getExistingImage(src);
	if (load) {
		if (_func)
			_func(load);
		return load;
	}
	const image = new Image();
	image.onerror = function() {
		alert('image ' + this.src);
	}
	image.relativeSrc = src;
	image.onload = async function () {
		if(this.notYet)
			delete this.notYet;
		let _returnImg = getExistingImage(this.relativeSrc);
		if (!_returnImg) {
			const _cacheCAN = document.createElement('canvas');
			_cacheCAN.width = MathRound(this.width * (_zoom ?? 1));
			_cacheCAN.height = MathRound(this.height * (_zoom ?? 1));
			const _cacheCTX = _cacheCAN.getContext('2d');
			_cacheCAN.imageSmoothingEnabled = false;
			_cacheCTX.drawImage(this, 0, 0, this.width, this.height, 0, 0, 
			_cacheCAN.width, _cacheCAN.height);
			_cacheCAN.relativeSrc = this.relativeSrc;
			//try {
				_returnImg = _cacheCAN;// await createImageBitmap(_cacheCAN, 0, 0, _cacheCAN.width, _cacheCAN.height);
			// } catch (e) {
			// 	console.warn("createImageBitmap failed, fallback to canvas", e);
			// 	_returnImg = _cacheCAN; // fallback
			// }
			//if(_cache)
				(_global ? loadedImages : loadedEpisodeImages)[this.relativeSrc] = _returnImg;
		}
		if (_func)
			_func(_returnImg);
	}
	image.src = src;
	image.notYet = 1;
	return image;
}
function bitmapToCanvas(bitmap) {
	const canvas = document.createElement('canvas');
	canvas.width = bitmap.width;
	canvas.height = bitmap.height;
	const ctx = canvas.getContext('2d');
	canvas.imageSmoothingEnabled = false;
	ctx.drawImage(bitmap, 0, 0);
	return canvas;
}
function getObject(_object, _locationX, _locationY) {
	const _r = (_object.zoom ?? 1) * __zoom * __scale;
	if (_object.src)
		_object.sprites = [{ image: getImage(_object.src, function(_image) {
		}), totalFrames: _object.totalFrames }];
	return {
		animation: _object,
		width: MathRound(_r * _object.width),
		height: MathRound(_r * _object.height),
		realHeight: MathRound(_r * (_object.realHeight ?? _object.height)),
		left: MathRound(_locationX * __zoom * __scale),
		zoom: (_object.zoom ?? 1),
		top: MathRound(((_canvas.height * __scale) - (groundheight * __scale) - MathRound(_r * _object.height) - ((_locationY ?? 0) * __zoom * __scale)))
	}
}
function getObjectWide(_rate, _object, _locationX, _locationY, _func) {
	//const obj = JSON.parse(JSON.stringify(_object));
	const _r = (_rate ?? 1) * __zoom;
	if (_object.src)
		_object.sprites = [{ image: getImage(_object.src, function(_image) {
			if(_func){
				_object.sprites = [{image:_image, totalFrames: _object.totalFrames}];
				_func({
					animation: _object,
					width: (_r * _object.width),
					height: MathRound(_r * _object.height),
					realHeight: MathRound(_r * (_object.realHeight ?? _object.height)),
					left: (_locationX * __zoom),
					zoom: (_object.zoom ?? 1),
					top: MathRound(episode.cHeight - groundheight - MathRound(_r * _object.height) - ((_locationY ?? 0) * __zoom))
				}, _object);
			}
		}), totalFrames: _object.totalFrames }];
	return {
		animation: _object,
		width: (_r * _object.width),
		height: MathRound(_r * _object.height),
		realHeight: MathRound(_r * (_object.realHeight ?? _object.height)),
		left: (_locationX * __zoom),
		zoom: (_object.zoom ?? 1),
		top: MathRound(episode.cHeight - groundheight - MathRound(_r * _object.height) - ((_locationY ?? 0) * __zoom))
	}
}
const __minLeft = -9999;
function isObjectInVisibleRectangle(obj, rect, _leftRate, _tolerance) {
	_leftRate = _leftRate ?? 1;
	if (!rect)
		rect =episode.RECT;
	const _l = obj.HURTLEFT ?? obj.LEFT;
	const _w = obj.HURTWIDTH ?? obj.WIDTH;
	const _rl = rect.HURTLEFT ?? rect.LEFT;
	const _rw = rect.HURTWIDTH ?? rect.WIDTH;
	const _left = ((_l >= __minLeft ? _l : obj.left) / _leftRate) - 
		((_tolerance ? (_tolerance / 2) : 0) * episode.w100);
	const _width = (_w >= 0 ? _w : (obj.realWidth ?? obj.width)) + ((_tolerance ?? 0) * episode.w100);
	const _objRight = _left + _width;
	const _rectWidth = (_rw >= 0 ? _rw : (rect.realWidth ?? rect.width));// + (_tolerance ?? 0);
	const _rectLeft = (_rl >= __minLeft ? _rl : rect.left);// - (_tolerance ? (_tolerance / 2) : 0);
	return (_objRight > _rectLeft) && (_left < (_rectLeft + _rectWidth));
}
function isObjectsVerticallyInTouch(obj1, obj2) {
	const top1 = obj1.TOP ?? obj1.top;
	const bottom1 = top1 + (obj1.HEIGHT ?? (obj1.realHeight ?? obj1.height));

	const top2 = obj2.TOP ?? obj2.top;
	const bottom2 = top2 + (obj2.HEIGHT ?? (obj2.realHeight ?? obj2.height));

	return !(bottom1 < top2 || top1 > bottom2);
}
function isObjectsVerticallyInSameOrder(obj1, obj2) {
	return isObjectInVisibleRectangle({
		left:obj1.HURTLEFT,
		width:obj1.HURTWIDTH, 
		height: episode.cHeight,
		top:0
	}, {
		left:obj2.HURTLEFT,
		width:obj2.HURTWIDTH, 
		height: episode.cHeight,
		top:0
	});
}
function isObjectsPassingOver(obj1, obj2) {
	const top1 = obj1.TOP ?? obj1.top;
	const height1 = obj1.HEIGHT ?? (obj1.realHeight ?? obj1.height);
	const bottom1 = top1 + height1;

	const top2 = obj2.TOP ?? obj2.top;
	const height2 = obj2.HEIGHT ?? (obj2.realHeight ?? obj2.height);
	const bottom2 = top2 + height2;

	const gap1 = (obj1.yGap ?? 10) * obj1.ZOOM;
	const gap2 = (obj2.yGap ?? 10) * obj2.ZOOM;

	const adjustedTop1 = bottom1 - gap1;
	const adjustedTop2 = bottom2 - gap2;

	const left1 = obj1.SCREENLEFT - obj1.ORIGINDIST;
	const right1 = left1 + obj1.WIDTH;

	const left2 = obj2.SCREENLEFT - obj2.ORIGINDIST;
	const right2 = left2 + obj2.WIDTH;

	return !(right1 < left2 || right2 < left1 || bottom1 < adjustedTop2 || bottom2 < adjustedTop1);
}
function getVisibleRectangle(_rate) {
	const _r = platformX * (_rate ?? 1);
	return {
		left: _r,
		top: 0,
		right: _r + episode.cWidth,
		bottom: episode.cHeight,
		width: episode.cWidth,
		realWidth: episode.cWidth
	}
}
function isObjectsInTouch(obj1, obj2, yRange, _tolerance) {
	if (!obj1 || !obj2)
		return {
			touch: false,
			obj1Direction: obj1?.direction,
			obj2Direction: obj2?.direction
		}
	if(obj1.class === __spell || obj2.class === __spell)
		_tolerance = 0;
	let obj1Left = obj1.HURTLEFT >= __minLeft ? obj1.HURTLEFT : obj1.left;
	let obj2Left = obj2.HURTLEFT >= __minLeft ? obj2.HURTLEFT : obj2.left;
	let _originX1 = obj1Left + (obj1._HURTBOX_half ?? ((obj1.HURTWIDTH >= 0 ? obj1.HURTWIDTH : obj1.width) / 2));
	let _originX2 = obj2Left + (obj2._HURTBOX_half ?? ((obj2.HURTWIDTH >= 0 ? obj2.HURTWIDTH : obj2.width) / 2));
	let obj1Direction, obj2Direction, touch = false;
	if (_originX1 > _originX2) {
		obj1Direction = __right;
		obj2Direction = __left;
	}
	else {
		obj1Direction = __left;
		obj2Direction = __right;
	}
	// if (true) {
	// 	showBorders(obj1Left, _gamePad.clientHeight - obj1.yPosition, obj1.HURTWIDTH ?? obj1.width, obj1.getTop ? obj1.getTop() : obj1.top, obj1.main ? 'green' : 'red');
	//  	showBorders(obj2Left, _gamePad.clientHeight - obj2.yPosition, obj2.HURTWIDTH ?? obj2.width, obj2.getTop ? obj2.getTop() : obj2.top, obj2.main ? 'green' : 'red');
	// }
	if (isObjectInVisibleRectangle(obj1, obj2, null, _tolerance))
		touch = true;
	let _checkVertical = true;
	if (touch && obj1.yPosition >= 0 && obj2.yPosition >= 0) {
		let _yGapTol = (episode.cHeight / 200) * (yRange ?? 10);
		// if(_yGapTol < MathRound(groundheight / (yRange ?? 15)))
		// 	_yGapTol = MathRound(groundheight / (yRange ?? 15));
		//MathAbs((obj1.yPosition + (obj1.yGap ?? 0)) - (obj2.yPosition + (obj2.yGap ?? 0))) > ((groundheight / 100) * (yRange ?? 5)))
		if(MathAbs((obj1.yPosition + ((obj1.yGap ?? 10) / 2)) - (obj2.yPosition + ((obj2.yGap ?? 10) / 2))) > _yGapTol)
			touch = false;
		else
			_checkVertical = false;
	}
	if (_checkVertical && touch && !isObjectsVerticallyInTouch(obj1, obj2))
		touch = false;
	return {
		obj1Direction: obj1Direction,
		obj2Direction: obj2Direction,
		touch: touch,
		originDiff: MathAbs(_originX1 - _originX2)
	};
}
// function isObjectInVisibleRectangle(obj, rect, _leftRate, _tolerance) {
// 	if (!rect){
// 		if(!(obj.lastVisibleTime > (_gameTick - 500)))
// 			rect = episode.RECT;
// 		else
// 			return obj.lastVisibility;
// 	}
// 	_leftRate = _leftRate ?? 1;
// 	const _left = ((obj.LEFT >= 0 ? obj.LEFT : obj.left) / _leftRate) - MathRound((_tolerance ? (_tolerance / 2) : 0) * (episode.cWidth / 100));
// 	const _width = (obj.WIDTH >= 0 ? obj.WIDTH : (obj.realWidth ?? obj.width)) + MathRound((_tolerance ?? 0) * (episode.cWidth / 100));
// 	const _objRight = _left + _width;
// 	const _rectWidth = (rect.WIDTH >= 0 ? rect.WIDTH : (rect.realWidth ?? rect.width));// + (_tolerance ?? 0);
// 	const _rectLeft = (rect.LEFT >= 0 ? rect.LEFT : rect.left);// - (_tolerance ? (_tolerance / 2) : 0);
// 	const result = (_objRight > _rectLeft) && (_left < (_rectLeft + _rectWidth));
// 	obj.lastVisibleTime = _gameTick;
// 	obj.lastVisibility = result;
// 	return result;
// }
// // function isObjectInVisibleRectangle(obj, rect, _leftRate = 1, _tolerance = 0) {
// // 	if (!rect) {
// // 		rect = {
// // 			left: 0,
// // 			right: episode.cWidth,
// // 			top: 0,
// // 			bottom: episode.cHeight,
// // 			width: episode.cWidth,
// // 			realWidth: episode.cWidth
// // 		};
// // 	}

// // 	const baseLeft = obj.LEFT ?? obj.left;
// // 	const baseWidth = obj.WIDTH ?? (obj.realWidth ?? obj.width);
// // 	const tol = Math.round((_tolerance / 2) * (episode.cWidth / 100));
// // 	const widthAdd = Math.round(_tolerance * (episode.cWidth / 100));

// // 	const objLeft = (baseLeft / _leftRate) - tol;
// // 	const objRight = objLeft + baseWidth + widthAdd;

// // 	const rectLeft = rect.LEFT ?? rect.left;
// // 	const rectWidth = rect.WIDTH ?? (rect.realWidth ?? rect.width);

// // 	return objRight > rectLeft && objLeft < (rectLeft + rectWidth);
// // }

// // function isObjectsVerticallyInTouch(obj1, obj2) {
// // 	const _obj1Top = obj1.TOP >= 0 ? obj1.TOP : obj1.top;
// // 	const _obj1Bottom = _obj1Top + (obj1.HEIGHT >= 0 ? obj1.HEIGHT: (obj1.realHeight ?? obj1.height))
// // 	const _obj2Top = obj2.TOP >= 0 ? obj2.TOP : obj2.top;
// // 	const _obj2Bottom = _obj2Top + (obj2.HEIGHT >= 0 ? obj2.HEIGHT : (obj2.realHeight ?? obj2.height));
// // 	//return (_obj1Bottom > _obj2Top) && (_obj1Top < _obj2Bottom);
// // 	return !((_obj1Bottom < _obj2Top) || (_obj1Top > _obj2Bottom));
// // }
// function isObjectsVerticallyInTouch(obj1, obj2) {
// 	const top1 = obj1.TOP ?? obj1.top;
// 	const bottom1 = top1 + (obj1.HEIGHT ?? (obj1.realHeight ?? obj1.height));

// 	const top2 = obj2.TOP ?? obj2.top;
// 	const bottom2 = top2 + (obj2.HEIGHT ?? (obj2.realHeight ?? obj2.height));

// 	return !(bottom1 < top2 || top1 > bottom2);
// }
// function isObjectsPassingOver(obj1, obj2) {
// 	let _top = obj1.TOP >= 0 ? obj1.TOP : obj1.top;
// 	const _obj1Bottom = _top + (obj1.HEIGHT >= 0 ? obj1.HEIGHT : (obj1.realHeight ?? obj1.height));
// 	const obj2Height = (obj2.HEIGHT >= 0 ? obj2.HEIGHT : (obj2.realHeight ?? obj2.height));
// 	let _obj2Top = obj2.TOP >= 0 ? obj2.TOP : obj2.top;
// 	const _obj2Bottom = _obj2Top + obj2Height;
// 	_top = _obj1Bottom - ((obj1.yGap ?? 10) * obj1.ZOOM);
// 	_obj2Top = _obj2Bottom - ((obj2.yGap ?? 10) * obj2.ZOOM);
// 	const _obj1Left = obj1.SCREENLEFT - obj1.ORIGINDIST;
// 	const _obj2Left = obj2.SCREENLEFT - obj2.ORIGINDIST;
	
// 	return !(_obj1Left + obj1.WIDTH < _obj2Left ||
// 			_obj2Left + obj2.WIDTH < _obj1Left ||
// 				_obj1Bottom < _obj2Top ||
// 				_obj2Bottom < _top);
// }
// function getVisibleRectangle(_rate) {
// 	return {
// 		left: platformX * (_rate ?? 1),
// 		top: 0,
// 		right: (platformX * (_rate ?? 1)) + episode.cWidth,
// 		bottom: episode.cHeight,
// 		width: episode.cWidth,
// 		realWidth: episode.cWidth
// 	}
// }
// function isObjectsInTouch(obj1, obj2, yRange, _tolerance) {
// 	if (!obj1 || !obj2)
// 		return {
// 			touch: false,
// 			obj1Direction: obj1?.direction,
// 			obj2Direction: obj2?.direction
// 		}
// 	if(obj1.class === __spell || obj2.class === __spell)
// 		_tolerance = 0;
// 	let obj1Direction, obj2Direction, touch = false;
// 	if (obj1.ORIGINX > obj2.ORIGINX) {
// 		obj1Direction = __right;
// 		obj2Direction = __left;
// 	}
// 	else {
// 		obj1Direction = __left;
// 		obj2Direction = __right;
// 	}
// 	// if (true) {
// 	// 	showBorders(obj1Left, _gamePad.clientHeight - obj1.yPosition, obj1.WIDTH >= 0 ? obj1.WIDTH : obj1.width, obj1.TOP >= 0 ? obj1.TOP : obj1.top, 'red');
// 	//  	showBorders(obj2Left, _gamePad.clientHeight - obj2.yPosition, obj2.WIDTH >=0 ? obj2.WIDTH : obj2.width, obj2.TOP >= 0 ? obj2.TOP : obj2.top, 'green');
// 	// }
// 	if (isObjectInVisibleRectangle(obj1, obj2, null, _tolerance))
// 		touch = true;
// 	if (touch && obj1.yPosition >= 0 && obj2.yPosition >= 0) {
// 		let _yGapTol = MathRound(episode.cHeight / (320 / ((yRange ?? 10) < 20 ? 20 : yRange)));
// 		// if(_yGapTol < MathRound(groundheight / (yRange ?? 15)))
// 		// 	_yGapTol = MathRound(groundheight / (yRange ?? 15));
// 		//MathAbs((obj1.yPosition + (obj1.yGap ?? 0)) - (obj2.yPosition + (obj2.yGap ?? 0))) > ((groundheight / 100) * (yRange ?? 5)))
// 		if(MathAbs((obj1.yPosition + ((obj1.yGap ?? 10) / 2)) - (obj2.yPosition + ((obj2.yGap ?? 10) / 2))) > _yGapTol)
// 			touch = false;
// 	}
// 	if (touch && !isObjectsVerticallyInTouch(obj1, obj2))
// 		touch = false;
// 	return {
// 		obj1Direction: obj1Direction,
// 		obj2Direction: obj2Direction,
// 		touch: touch,
// 		originDiff: MathAbs(obj1.ORIGINX - obj2.ORIGINX)
// 	};
// }
// function calculateDmg(obj, _props, _victim) {
// 	if (_victim?.invulnerable)
// 		return {
// 			value: 0
// 		};
// 	let _elementalDmg;
// 	if (_props.atk.type)
// 		_elementalDmg = this[_props.atk.type + 'Dmg'];
// 	let _levelRate = _props.atk.rate;
// 	if (_props.atk.rate) {
// 		const _anima = obj.animations[obj.animation];
// 		if (_anima) {
// 			const _charSkill = skill.getSkillByKey(obj.class, obj.animation);
// 			if (_charSkill?.level)
// 				_levelRate = _props.atk.rate + ((_charSkill.props[_charSkill.level - 1].value) / 100);
// 		}
// 	}
// 	let _dmg = (getRandomValue(obj.minDmg + (obj.atk ?? 0), obj.maxDmg + (obj.atk ?? 0)) * (_levelRate ?? obj.animations[obj.animation].atkRate ?? 1));
// 	//if (episode.pvp)
// 	//	_dmg *= 2;
// 	const _buff = this.buffs?.find(x => x.type === 'atk');
// 	if (_buff)
// 		_dmg *= (1 + (_buff.value * _buff.grade));
// 	let _steal = 0;
// 	if (obj.stealChance && obj.stealRate) {
// 		if (getRandomValue(1, 100) <= obj.stealChance)
// 			_steal = obj.MAXHP * obj.stealRate;
// 	}
// 	const _crit = getRandomValue(1, 100);
// 	if (_crit <= (obj.critRate + baseCritRate))
// 		return { steal: _steal, value: ((_dmg + (obj.critDmg ?? 0)) * 2) + (_elementalDmg ?? 0), crit: true, elementalDmg: { value: _elementalDmg, atkType: _props.atkType } };
// 	return {
// 		steal: _steal, value: _dmg + (_elementalDmg ?? 0), elementalDmg: { value: _elementalDmg, atkType: _props.atkType }
// 	};
// }
function addClass(_elem, _classname) {
	if (!_elem)
		return;
	if (hasClass(_elem, _classname))
		return;
	_elem.classList.add(_classname);
}
function removeClass(_elem, _classname) {
	if (!_elem)
		return;
	if (!hasClass(_elem, _classname))
		return;
	_elem.classList.remove(_classname);
}
function hasClass(_elem, _classname) {
	try {
		return _elem.classList?.contains(_classname);
	} catch (e) {
		return false;
	}
}
function toggleClass(_elem, _classname) {
	if (hasClass(_elem, _classname))
		removeClass(_elem, _classname);
	else
		addClass(_elem, _classname);
}
function getFloat(_num) {
	return parseFloat(parseFloat(_num).toFixed(1));
}
String.prototype.toProperCase = function () {
	return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toLocaleUpperCase(getLang()) + txt.substring(1).toLocaleLowerCase(getLang()); });
};
function setCharacterFunctions(_char, _pvp) {
	if(_pvp) {
		const _newChar = new enemy(_char);
		_newChar.pvp = _char.pvp;
		_newChar.inventory = _char.inventory;
		return _newChar;
	}
	const _keys = Object.keys(_char.animations);
	const _noSkill = !_char.skills;
	if (_noSkill)
		_char.skills = {};
	const _skills = skill.getSkills(_char);
	for (var _key of _keys)
		_char.animations[_key] = new animation(_char.animations[_key]);
	if (_noSkill)
		for (var _skill of _skills)
			_char.skills[_skill.key] = {
				level: _skill.level ?? 1,
				order: _skill.order,
				maxLevel: _skill.props.length,
				locked: _skill.unlockLevel > (_char.level ?? 1),
				unlockLevel: _skill.unlockLevel,
				//increment: _char.animations[_key].increment
			};
	if (_char.spriteWidth)
		_char.width = _char.spriteWidth;
	if (_char.spriteHeight)
		_char.height = _char.spriteHeight;
	const _newChar = new enemy(_char);
	_newChar.top = episode.cHeight - (_newChar.HEIGHT);
	_newChar.pvp = _char.pvp;
	//_newChar.pets = _char.pets;
	//_newChar.petFoods = _char.petFoods;
	//_newChar.locks = _char.locks;
	//_newChar.gold = _char.gold;
	_newChar.inventory = _char.inventory;
	_newChar.title = _char.title ?? 'Newbie';
	_newChar.experience = 0; //_char.experience ?? 500;
	_newChar.maxExperience = _char.maxExperience;
	return _newChar;
}
function showBorders(_l, _t, _w, _h, _id, _key) {
	let _a = document.getElementById(_key ?? _id ?? 'main-frame');
	if (!_a) {
		_a = document.createElement('div');
		_a.id = _key ?? _id ?? 'main-frame';
		_gamePad.appendChild(_a);
		_a.style.position = "absolute";
		_a.style.zIndex = 9999;
	}
	_a.style.border = '2px solid ' + (_id ?? 'green');
	_a.style.width = _w + 'px';
	_a.style.left = _l + 'px';
	_a.style.top = _t + 'px';
	_a.style.height = _h + 'px';
}
function removeUltimateCircle() {
	const _a = document.getElementById('ultimate-circle');
	if (_a)
		_a.remove();
}
function runCssAnimation(_l, _t, _w, _key) {
	let _a = document.getElementById(_key);
	if (!_a) {
		_a = document.createElement('div');
		_a.id = _key;
		_css.appendChild(_a);
	}
	_a.style.width = _w + 'px';
	_a.style.left = _l + 'px';
	_a.style.top = _t + 'px';
	_a.style.height = _w + 'px';
	setTimeout(function () {
		const _glow = (episode.cUIHeight * 2.25) * 2;
		const _R = _glow + Math.sqrt(Math.pow(episode.cUIWidth, 2) + Math.pow(episode.cUIHeight, 2));
		_a.style.width = _R + 'px';
		_a.style.left = (-1 * (_R - episode.cUIWidth) / 2) + 'px';
		_a.style.top = (-1 * (_R - episode.cUIHeight) / 2) + 'px';
		_a.style.height = _R + 'px';
	}, 20);
}
const cssAnimationProps = {

};
function checkCSSAnimations() {
	for(let _c of Object.keys(cssAnimationProps)) {
		const _anima = cssAnimationProps[_c];
		cssAnimations[_c](_anima.p1, _anima.p2, _anima.p3, _anima.p4, _anima.p5, _anima.p6);
	}
}
const canvasAnimations =  {
// 	debris: function (_char, _params, _canv) {

// 	const offCtx = _canv ?? c10;

// 	const _l = _char.SCREENLEFT;
// 	const _t = _params.top ?? _char.getTop() + MathRound((_char.HEIGHT * 1.1));
// 	if(_params.top === undefined)
// 		_params.top = _t;
// 	const _z = _char.getZoom();

// 	const x = _l + MathRound((_params.x ?? 0) * _z);
// 	const groundY = _t + MathRound((_params.y ?? 0) * _z);

// 	const dir = _params.dir ?? 'up';
// 	const color = _params.color;
// 	const strength = Math.max(0.5, _params.strength ?? 1.5);

// 	if (!_char.debrisParticles)
// 		_char.debrisParticles = [];

// 	// ---------------- COLORS ----------------
// 	const SOIL_COLORS = [
// 		[92, 72, 48],
// 		[110, 88, 60],
// 		[80, 64, 42],
// 		[120, 98, 70]
// 	];

// 	function randomSoilColor() {
// 		const c = SOIL_COLORS[Math.random() * SOIL_COLORS.length | 0];
// 		return `rgb(
// 			${c[0] + Math.random() * 20 - 10 | 0},
// 			${c[1] + Math.random() * 20 - 10 | 0},
// 			${c[2] + Math.random() * 20 - 10 | 0}
// 		)`;
// 	}

// 	function randomShade(hex) {
// 		let r = parseInt(hex.substr(1, 2), 16);
// 		let g = parseInt(hex.substr(3, 2), 16);
// 		let b = parseInt(hex.substr(5, 2), 16);

// 		r += Math.random() * 30 - 15;
// 		g += Math.random() * 30 - 15;
// 		b += Math.random() * 30 - 15;

// 		return `rgb(${r | 0},${g | 0},${b | 0})`;
// 	}

// 	// ---------------- SPAWN ----------------
// 	if (!_char.debrisParticles?.length) {

// 		const count = Math.min(100, 15 + strength * 15);
// 		const screenScale = Math.min(1.4, Math.max(0.8, episode.cWidth / 1200));
// 		const baseSpeed = (2.2 + strength * 1.1) * screenScale;

// 		let centerAngle = 270;
// 		if (dir === 'left') centerAngle = 225;
// 		if (dir === 'right') centerAngle = 315;

// 		// 🔹 biraz daha yanlara
// 		const spread = 165;

// 		for (let i = 0; i < count; i++) {

// 			const angle =
// 				centerAngle +
// 				(Math.random() * spread - spread / 2);

// 			const rad = angle * Math.PI / 180;

// 			let speed =
// 				baseSpeed *
// 				(0.75 + Math.random() * Math.random() * 1.7);

// 			// 🔹 yatay biraz daha güçlü
// 			let vx = Math.cos(rad) * speed * 1.6;

// 			// 🔹 yukarı saçılma biraz daha fazla
// 			let vy = Math.sin(rad) * speed * 0.35;
// 			vy -= 0.85 + Math.random() * 0.6;

// 			_char.debrisParticles.push({
// 				x,
// 				y: groundY,
// 				vx,
// 				vy,
// 				p: platformX,
// 				radius: 1.3 + Math.random() * 3.1,
// 				life: 0.85 + Math.random() * 0.35,
// 				decay: 0.04 + Math.random() * 0.03,
// 				frame: 0,
// 				gravity: 0.22 + Math.random() * 0.25,
// 				wobble: Math.random() * 2,
// 				hitGround: false,
// 				color: color ? randomShade(color) : randomSoilColor()
// 			});
// 		}
// 	}

// 	// ---------------- UPDATE & DRAW ----------------
// 	const oldAlpha = offCtx.globalAlpha;

// 	if (offCtx.reversed)
// 		offCtx.restore();

// 	for (let i = _char.debrisParticles.length - 1; i >= 0; i--) {

// 		const p = _char.debrisParticles[i];

// 		p.x += p.vx + Math.sin(p.frame + p.wobble) * 0.25;
// 		p.y += p.vy;

// 		p.vy += p.gravity * 0.4;
// 		p.vx *= 0.96;

// 		// -------- ZEMİN KİLİDİ --------
// 		if (p.y >= groundY) {
// 			p.y = groundY;
// 			p.vy = 0;
// 			p.vx *= 0.82;

// 			if (!p.hitGround) {
// 				p.life -= 0.12;
// 				p.hitGround = true;
// 			} else {
// 				p.life -= 0.06;
// 			}
// 		}

// 		p.life -= p.decay;
// 		p.frame++;

// 		offCtx.globalAlpha = Math.max(0, p.life);
// 		offCtx.fillStyle = p.color;

// 		offCtx.beginPath();
// 		offCtx.ellipse(
// 			p.x - (platformX - p.p),
// 			p.y,
// 			p.radius,
// 			p.radius * (0.7 + Math.random() * 0.6),
// 			0,
// 			0,
// 			Math.PI * 2
// 		);
// 		offCtx.fill();

// 		if (p.life <= 0)
// 			_char.debrisParticles.splice(i, 1);
// 	}

// 	offCtx.globalAlpha = oldAlpha;

// 	if (offCtx.reversed) {
// 		offCtx.save();
// 		offCtx.scale(-1, 1);
// 	}

// 	if (_char.debrisParticles.length === 0){
//         _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'debris');
// 		delete _char.debrisParticles;
// 		delete _params.top;
// 	}
// },
	// debris: function (_char, _params, _canv) {

	// 	const ctx = _canv ?? c10;

	// 	const _l = _char.SCREENLEFT;
	// 	const _t = _params.top ?? (_char.getTop() + _char.HEIGHT + MathRound(episode.cHeight * 0.01));
	// 	if (_params.top === undefined) _params.top = _t;

	// 	const _z = _char.getZoom();

	// 	const x = _l + MathRound((_params.x ?? 0) * _z);
	// 	const groundY = _t + MathRound((_params.y ?? 0) * _z);

	// 	const dir = _params.dir ?? 'up';
	// 	const strength = _params.strength ?? 1.5;

	// 	if (!_char.dparticles)
	// 		_char.dparticles = [];

	// 	/* ================= COLORS ================= */

	// 	function dustColor(alpha) {
	// 		const b = 165 + Math.random() * 35;
	// 		return `rgba(${b}, ${b - 15}, ${b - 35}, ${alpha})`;
	// 	}

	// 	/* ================= SHAPE ================= */

	// 	function makeDustShape(size) {
	// 		const points = [];
	// 		const count = 6 + Math.random() * 4;

	// 		for (let i = 0; i < count; i++) {
	// 			const a = (Math.PI * 2 / count) * i;
	// 			const r = size * (0.6 + Math.random() * 0.5);
	// 			points.push({
	// 				x: Math.cos(a) * r,
	// 				y: Math.sin(a) * r
	// 			});
	// 		}
	// 		return points;
	// 	}

	// 	/* ================= SPAWN ONCE ================= */

	// 	if (!_params._spawned) {
	// 		_params._spawned = true;

	// 		const rockCount = Math.min(55, 12 + strength * 14);
	// 		const baseSpeed = 2.2 + strength * 1.1;

	// 		let centerAngle = 270;
	// 		if (dir === __left) centerAngle = 210;
	// 		if (dir === __right) centerAngle = 330;

	// 		const spread = 140;

	// 		/* ===== ROCKS ===== */

	// 		for (let i = 0; i < rockCount; i++) {

	// 			const a =
	// 				centerAngle +
	// 				(Math.random() * spread - spread / 2);

	// 			const rad = a * Math.PI / 180;
	// 			const spd = baseSpeed * (0.7 + Math.random());

	// 			_char.dparticles.push({
	// 				type: 'rock',
	// 				x,
	// 				y: groundY,
	// 				vx: Math.cos(rad) * spd,
	// 				vy: Math.sin(rad) * spd - (1.2 + Math.random()),
	// 				p: platformX,
	// 				radius: 1.4 + Math.random() * 2.5,
	// 				life: 1,
	// 				decay: 0.045,
	// 				gravity: 0.55,
	// 				frame: 0,
	// 				color: 'rgb(95,75,55)'
	// 			});
	// 		}

	// 		/* ===== DUST CLUSTER ===== */

	// 		const clusterCount = 6 + Math.floor(strength * 3);

	// 		for (let i = 0; i < clusterCount; i++) {
	// 			const size = (2 + strength * 2) * (0.8 + Math.random() * 0.5);
	// 			const shape = makeDustShape(size);

	// 			const path = new Path2D();
	// 			path.moveTo(shape[0].x, shape[0].y);
	// 			for (let j = 1; j < shape.length; j++)
	// 				path.lineTo(shape[j].x, shape[j].y);
	// 			path.closePath();
	// 			let ox = x;
	// 			let oy = groundY;
	// 			_char.dparticles.push({
	// 				type: 'dust',
	// 				x: x + ox,
	// 				y: groundY + oy,
	// 				vx: (Math.random() - 0.5) * 0.35,
	// 				vy: -0.25 - Math.random() * 0.25,
	// 				p: platformX,

	// 				shape,       // debug için kalabilir
	// 				path,        // <<< CACHE

	// 				scale: 0.4,
	// 				scaleGrow: 0.035 + Math.random() * 0.03,
	// 				life: 1,
	// 				decay: 0.025 + Math.random() * 0.01,
	// 				frame: 0,
	// 				gravity: 0.015,
	// 				alpha: 0.28 + Math.random() * 0.12
	// 			});

	// 		}
	// 	}

	// 	/* ================= UPDATE & DRAW ================= */

	// 	const oldAlpha = ctx.globalAlpha;
	// 	if (ctx.reversed) ctx.restore();

	// 	for (let i = _char.dparticles.length - 1; i >= 0; i--) {

	// 		const p = _char.dparticles[i];

	// 		p.x += p.vx;
	// 		p.y += p.vy;

	// 		if (p.type === 'rock') {
	// 			p.vy += p.gravity;
	// 			p.vx *= 0.97;
	// 		}

	// 		if (p.type === 'dust') {
	// 			p.vy += p.gravity;
	// 			p.scale += p.scaleGrow;
	// 			p.scaleGrow *= 0.92;
	// 		}

	// 		p.life -= p.decay;
	// 		p.frame++;

	// 		ctx.globalAlpha = Math.max(0, p.life);

	// 		if (p.type === 'rock') {
	// 			ctx.fillStyle = p.color;
	// 			ctx.beginPath();
	// 			ctx.ellipse(
	// 				p.x - (platformX - p.p),
	// 				p.y,
	// 				p.radius,
	// 				p.radius * 0.7,
	// 				0, 0, Math.PI * 2
	// 			);
	// 			ctx.fill();
	// 		}

	// 		if (p.type === 'dust') {
	// 			// ctx.fillStyle = dustColor(p.alpha * p.life);
	// 			// ctx.beginPath();
	// 			// const s = p.shape;
	// 			// ctx.moveTo(
	// 			// 	(p.x - (platformX - p.p)) + s[0].x * p.scale,
	// 			// 	p.y + s[0].y * p.scale
	// 			// );
	// 			// for (let j = 1; j < s.length; j++) {
	// 			// 	ctx.lineTo(
	// 			// 		(p.x - (platformX - p.p)) + s[j].x * p.scale,
	// 			// 		p.y + s[j].y * p.scale
	// 			// 	);
	// 			// }
	// 			// ctx.closePath();
	// 			// ctx.fill();
	// 			 ctx.fillStyle = dustColor(p.alpha * p.life);

	// 			ctx.save();
	// 			ctx.translate(
	// 				p.x - (platformX - p.p),
	// 				p.y
	// 			);
	// 			ctx.scale(p.scale, p.scale);
	// 			ctx.fill(p.path);
	// 			ctx.restore();
	// 		}

	// 		if (p.life <= 0)
	// 			_char.dparticles.splice(i, 1);
	// 	}

	// 	ctx.globalAlpha = oldAlpha;

	// 	if (ctx.reversed) {
	// 		ctx.save();
	// 		ctx.scale(-1, 1);
	// 	}

	// 	if (_char.dparticles.length === 0) {
	// 		delete _char.dparticles;
	// 		delete _params.top;
	// 		delete _params._spawned;
    //     	_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'debris');
	// 	}
	// },
	debris: function (_char, _params, _canv) {

	const ctx = _canv ?? c10;

	const _l = _char.SCREENLEFT;
	const _t = _params.top ?? (_char.getTop() + _char.HEIGHT + MathRound(episode.cHeight * 0.01));
	if (_params.top === undefined) _params.top = _t;

	const _z = _char.getZoom();

	const x = _l + MathRound((_params.x ?? 0) * _z);
	const groundY = _t + MathRound((_params.y ?? 0) * _z);

	const dir = _params.dir ?? 'up';
	const strength = _params.strength ?? 1.5;

	// 🔥 eksik olanlar
	const ox = (Math.random() - 0.5) * 6;
	const oy = (Math.random() - 0.5) * 3;
	const sizeBase = (2 + strength * 2);

	if (!_char.dparticles)
		_char.dparticles = [];

	function dustColor(alpha) {
		const b = 165 + Math.random() * 35;
		return `rgba(${b}, ${b - 15}, ${b - 35}, ${alpha})`;
	}

	function makeDustShape(size) {
		const points = [];
		const count = 6 + Math.floor(Math.random() * 4);

		for (let i = 0; i < count; i++) {
			const a = (Math.PI * 2 / count) * i;
			const r = size * (0.6 + Math.random() * 0.5);
			points.push({
				x: Math.cos(a) * r,
				y: Math.sin(a) * r
			});
		}
		return points;
	}

	if (!_params._spawned) {
		_params._spawned = true;

		const rockCount = Math.min(55, 12 + strength * 14);
		const baseSpeed = 2.2 + strength * 1.1;

		let centerAngle = 270;
		if (dir === __left) centerAngle = 210;
		if (dir === __right) centerAngle = 330;

		const spread = 140;

		/* ===== ROCKS ===== */
		for (let i = 0; i < rockCount; i++) {

			const a = centerAngle + (Math.random() * spread - spread / 2);
			const rad = a * Math.PI / 180;
			const spd = baseSpeed * (0.7 + Math.random());

			_char.dparticles.push({
				type: 'rock',
				x,
				y: groundY,
				vx: Math.cos(rad) * spd,
				vy: Math.sin(rad) * spd - (1.2 + Math.random()),
				p: platformX,
				radius: 1.4 + Math.random() * 2.5,
				life: 1,
				decay: 0.045,
				gravity: 0.55,
				color: 'rgb(95,75,55)'
			});
		}

		/* ===== DUST ===== */
		const clusterCount = 6 + Math.floor(strength * 3);

		for (let i = 0; i < clusterCount; i++) {

			const size = sizeBase * (0.8 + Math.random() * 0.5);
			const shape = makeDustShape(size);

			const path = new Path2D();
			path.moveTo(shape[0].x, shape[0].y);
			for (let j = 1; j < shape.length; j++)
				path.lineTo(shape[j].x, shape[j].y);
			path.closePath();

			_char.dparticles.push({
				type: 'dust',
				x: x + ox,
				y: groundY + oy,
				vx: (Math.random() - 0.5) * 0.35,
				vy: -0.25 - Math.random() * 0.25,
				p: platformX,

				path,

				scale: 0.4,
				scaleGrow: 0.035 + Math.random() * 0.03,
				life: 1,
				decay: 0.025 + Math.random() * 0.01,
				gravity: 0.015,
				alpha: 0.28 + Math.random() * 0.12
			});
		}
	}

	const oldAlpha = ctx.globalAlpha;
	if (ctx.reversed) ctx.restore();

	for (let i = _char.dparticles.length - 1; i >= 0; i--) {

		const p = _char.dparticles[i];

		p.x += p.vx;
		p.y += p.vy;

		if (p.type === 'rock') {
			p.vy += p.gravity;
			p.vx *= 0.97;
		}

		if (p.type === 'dust') {
			p.vy += p.gravity;
			p.scale += p.scaleGrow;
			p.scaleGrow *= 0.92;
		}

		p.life -= p.decay;

		ctx.globalAlpha = Math.max(0, p.life);

		if (p.type === 'rock') {
			ctx.fillStyle = p.color;
			ctx.beginPath();
			ctx.ellipse(
				p.x - (platformX - p.p),
				p.y,
				p.radius,
				p.radius * 0.7,
				0, 0, Math.PI * 2
			);
			ctx.fill();
		}

		if (p.type === 'dust') {
			ctx.fillStyle = dustColor(p.alpha * p.life);

			ctx.save();
			ctx.translate(p.x - (platformX - p.p), p.y);
			ctx.scale(p.scale, p.scale);
			ctx.fill(p.path);
			ctx.restore();
		}

		if (p.life <= 0)
			_char.dparticles.splice(i, 1);
	}

	ctx.globalAlpha = oldAlpha;

	if (ctx.reversed) {
		ctx.save();
		ctx.scale(-1, 1);
	}

	if (_char.dparticles.length === 0) {
		delete _char.dparticles;
		delete _params.top;
		delete _params._spawned;
		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'debris');
	}
},
	flash: function(_char, _params, _canv) {
		const ctx = _canv ?? c10;
		if (_params.start === undefined) {
			_params.start = 0;
			_params.phase = 0;                // 0 = full, 1 = fade
			_params.alpha = 1;                // başlangıç parlaklığı
			_params.durationFull = _params.dfu ?? 1;         // 4 tick tam parlak (≈60ms)
			_params.durationFade = _params.dfa ?? 3;        // 10 tick fade (≈150ms)
			_params.realR = _params.r;        // ana yarıçap
			_params.x = _char.ORIGINLEFT + ((_params.xGap ?? 0) * _char.ZOOM * (ctx.reversed ? -1 : 1));
			_params.y = MathRound(_char.TOP + (_char.HEIGHT / 2) - ((_params.yGap ?? 0) * _char.ZOOM));
		}

		_params.start++;

		// Koordinatlar (senin glow ile birebir aynı)
		const _z = _char.getZoom();

		const _x = _params.x;
		const _y = _params.y;
		const _r = MathRound((_params.r ?? 0) * _z);
		const _rr = MathRound(3.25 * (_r / 10));


		// Faz geçişleri
		if (_params.start <= _params.durationFull) {
			// full glow
			_params.alpha = 1;
		} 
		else if (_params.start <= _params.durationFull + _params.durationFade) {
			// fade-out
			const p = (_params.start - _params.durationFull) / _params.durationFade;
			_params.alpha = 1 - p;            // 1 → 0
		} 
		else {
			// bitti
			delete _params.start;
			_params.alpha = 0;
        	_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'flash');
			return; // animasyon sona erdi, tekrar çağırmaya gerek yok
		}

		// Radial Gradient
		const grad = ctx.createRadialGradient(
			_x, _y, MathRound(_r / 15),
			_x, _y - _rr, _r
		);

		// AAA golden impact colors
		const c1 = `rgba(255, 212, 138, ${_params.alpha ?? 0})`;      // #ffd48a
		const c2 = `rgba(255, 242, 200, ${(_params.alpha ?? 0) * .4})`;
		const c3 = `rgba(255, 255, 255, 0)`;                     // edge transparent

		grad.addColorStop(0,     c1);
		grad.addColorStop(0.35,  c2);
		grad.addColorStop(1,     c3);

		if(ctx.reversed)
			ctx.restore();
		ctx.fillStyle = grad;
		const oldGCO = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = 'lighter';
		ctx.beginPath();
		ctx.arc(_x, _y - _rr, _r, 0, Math.PI * 2);
		ctx.fill();

		// restore
		ctx.globalCompositeOperation = oldGCO;
		if(ctx.reversed) {
			ctx.save();
			ctx.scale(-1, 1);
		}
	},
	glow:function(_char, _params, _canv) {
		if(_char.glowing && _params.start === undefined)
			return;
		if(_params.start === undefined)
			_params.start = 0;
		if(!_params.realR)
			_params.realR = _params.r;
		_params.start++;
		_char.glowing = 1;
		const _l  = _char.SCREENLEFT;
		const _t = _char.getTop();
		const _z = _char.getZoom();
		const _x = _l + (MathRound((_params.x  ?? 0) * _z));
		const _y = _t + MathRound((_params.y  ?? 0) * _z);
		const _r = MathRound((_params.r  ?? 0) * _z);
		const _rr = MathRound(3.25 * (_r / 10));
		let _ca;
		if(_params.background)
			_ca = cSPB;
		else if(_params.foreground)
			_ca = cFGA;
		else 
			_ca = _canv ?? c10;
		const grad = _ca.createRadialGradient(_x,  _y,  MathRound(_r / 10), _x, _y - _rr, _r);
		grad.addColorStop(0, _params.from);
		grad.addColorStop(.35, _params.to);
		grad.addColorStop(1, '#FAD5A500');
		const oldStyle = _ca.fillStyle;
		_ca.fillStyle = grad;
		_ca.fillRect(_x - _r, _y - _r - _rr, _r * 2, _r * 2);		
		switch(_params.start) {
			case _params.speed:
				_params.r = _params.realR + 1;
				break;
			case _params.speed * 2:
				_params.r = _params.realR;
				break;
			case _params.speed * 3:
				_params.r = _params.realR - 1;
				break;
			case _params.speed * 4:
				_params.r = _params.realR;
				_params.start = 0;
				break;
		}
		_ca.fillStyle = oldStyle;
	},

	// halo: function (_char, _params, _canv) {
	// 	const ctx = _canv ?? c10;
	// 	const now = _gameTick;
	// 	const W = episode.cWidth;
	// 	const TAU = Math.PI * 2;
	// 	const S = W / 1280; // çözünürlüğe göre ölçek faktörü

	// 	// === INIT ===
	// 	// Efekt başlatıldığında parametreleri sıfırla
	// 	if (!_params.startTime || _params.finished) {
	// 		_params.startTime = now;
	// 		_params.finished = false;
	// 		_params.sparkLines = []; // Faz 1’deki “ışık çizgileri”
	// 		_params.particles = [];  // Faz 3’teki “partiküller”
	// 	}

	// 	// Karakterin ekrandaki merkez koordinatı
	// 	const c = {
	// 		x: _char.SCREENLEFT,
	// 		y: (episode.cHeight - _char.yPosition) - ((_params.y ?? 0) * _char.ZOOM)
	// 	};
	// 	if (ctx.reversed) c.x *= -1; // ayna modu için (örneğin karakter sağa dönükse)

	// 	const elapsed = now - _params.startTime;

	// 	// Efekt süresi (toplam ~650ms)
	// 	const dur1 = 180; // Faz 1: Spark’lar merkeze çekiliyor
	// 	const dur2 = 90;  // Faz 2: Beyazdan siyaha geçiş anı (flash)
	// 	const dur3 = 400; // Faz 3: Halo (çember) genişleme + partikül dağılması
	// 	const total = dur1 + dur2 + dur3;

	// 	ctx.save();

	// 	// === FAZ 1: Spark çizgiler merkeze toplanıyor ===
	// 	if (elapsed < dur1) {
	// 		// İlk frame'de çizgileri oluştur
	// 		if (_params.sparkLines.length === 0) {
	// 			const count = 12; // 12 yönlü çizgi
	// 			for (let i = 0; i < count; i++) {
	// 				const angle = (TAU / count) * i;
	// 				_params.sparkLines.push({
	// 					angle,
	// 					len: (100 + Math.random() * 30) * S, // her çizginin uzunluğu
	// 				});
	// 			}
	// 		}

	// 		ctx.strokeStyle = 'rgb(125,249,255)';
	// 		ctx.lineWidth = 2 * S;
	// 		const prog = elapsed / dur1; // zaman ilerleme oranı (0–1)

	// 		// Her spark çizgisini merkeze doğru kısaltarak çiz
	// 		for (const s of _params.sparkLines) {
	// 			const r = s.len * (1 - prog);
	// 			const x1 = c.x + Math.cos(s.angle) * r;
	// 			const y1 = c.y + Math.sin(s.angle) * r;
	// 			const x2 = c.x + Math.cos(s.angle) * (r + 8 * S);
	// 			const y2 = c.y + Math.sin(s.angle) * (r + 8 * S);
	// 			ctx.beginPath();
	// 			ctx.moveTo(x1, y1);
	// 			ctx.lineTo(x2, y2);
	// 			ctx.stroke();
	// 		}

	// 		if(elapsed > (dur1 / 2)) {
	// 			// Küçük merkez parlaması
	// 			const rad = (40 + 40 * prog) * S;
	// 			ctx.fillStyle = `rgb(255,255,255)`;
	// 			ctx.beginPath();
	// 			ctx.arc(c.x, c.y, rad, 0, TAU);
	// 			ctx.fill();
	// 		}

	// 		ctx.restore();
	// 		return;
	// 	}

	// 	// === FAZ 2: Beyazdan siyaha dönüş (Flash anı) ===
	// 	if (elapsed < dur1 + dur2) {
	// 		if(!_params.sound) {
	// 			PlaySound({key:'ultimate', volume: 1});
	// 			_params.sound = true;
	// 		}
	// 		// const t = (elapsed - dur1) / dur2;
	// 		// const alpha = 1 - t; // şeffaflık kademeli azalıyor
	// 		// ctx.fillStyle = `rgb(0,0,0)`;
	// 		// ctx.beginPath();
	// 		// ctx.arc(c.x, c.y, 80 * S, 0, TAU);
	// 		// ctx.fill();
	// 		// ctx.restore();
	// 		ctx.restore();
	// 		return;
	// 	}

	// 	// === FAZ 3: Halo genişliyor + partiküller saçılıyor ===
	// 	const t3 = (elapsed - dur1 - dur2) / dur3;
	// 	// 🔸 Dış halka
	// 	const minR = W * 0.08;
	// 	const maxR = W * 0.65;
	// 	const ringR = minR + (maxR - minR) * Math.min(t3, 1); // zamana göre genişler
	// 	const ringAlpha = 1 - t3 * 1.3; // şeffaflaşır
	// 	const lineWidth = (12 * S) * (1 - t3 * 0.7); // kalınlık azalır

	// 	if (ringAlpha > 0) {
	// 		ctx.lineWidth = lineWidth;
	// 		ctx.strokeStyle = `rgb(184, 251, 255)`;

	// 		ctx.beginPath();
	// 		ctx.ellipse(c.x, c.y, ringR * 1.1, ringR * 0.9, 0, 0, TAU);
	// 		ctx.stroke();
	// 	}

	// 	// 🔸 İç halka (Street Fighter tarzı dotted fade-out)
	// 	const innerMaxR = ringR * 0.5 * (1 + 0.25 * t3); // %10 ekstra genişleme
	// 	const innerR = innerMaxR * Math.min(t3 * 1.5, 1);
	// 	const innerAlpha = Math.max(0, 0.6 - t3); // kademeli şeffaflaşma
	// 	const innerLineW = (6 * S) * (1 - t3 * 0.5); // çizgi kalınlığı azalıyor

	// 	if (innerAlpha > 0) {
	// 		ctx.lineWidth = innerLineW;
	// 		ctx.strokeStyle = `rgb(125,249,255)`;

	// 		const segCount = 14; // kaç parça olacak (nokta sayısı)
	// 		const gapRatio = 0.45 + (0.35 * t3); // boşluk oranı zamanla artar (0.45 → 0.8)

	// 		// Dotted efekt: her segment arası boş bırakılarak yaylar çizilir
	// 		ctx.beginPath();
	// 		for (let i = 0; i < segCount; i++) {
	// 			const start = (i / segCount) * TAU
	// 			const end = start + (TAU / segCount) * (1 - gapRatio);
	// 			ctx.arc(c.x, c.y, innerR, start, end);
	// 		}
	// 		ctx.stroke();
	// 	}

	// 	// 🔸 Partiküller (küçük beyaz tanecikler)
	// 	if (_params.particles.length === 0) {
	// 		const pCount = 25;
	// 		for (let i = 0; i < pCount; i++) {
	// 			const angle = Math.random() * TAU;
	// 			const spd = (2 + Math.random() * 3) * S;
	// 			_params.particles.push({
	// 				x: c.x, y: c.y,
	// 				vx: Math.cos(angle) * spd,
	// 				vy: Math.sin(angle) * spd,
	// 				life: 1,
	// 				size: (2 + Math.random() * 2) * S
	// 			});
	// 		}
	// 	}

	// 	// Partikül hareket ve solma
	// 	for (const p of _params.particles) {
	// 		p.x += p.vx;
	// 		p.y += p.vy;
	// 		p.life -= 0.03;
	// 		if (p.life > 0) {
	// 			ctx.fillStyle = 'rgb(255,255,255)';
	// 			ctx.beginPath();
	// 			ctx.arc(p.x, p.y, p.size, 0, TAU);
	// 			ctx.fill();
	// 		}
	// 	}

	// 	ctx.restore();

	// 	// Efekt süresi bitince temizle
	// 	if (elapsed >= total) {
	// 		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'halo');
	// 		_params.finished = true;
	// 		delete _params.sound;
	// 	}
	// }

	halo: function (_char, _params, _canv) {
		if(episode?.realTime)
			return;
		const ctx = _canv ?? c10;
		const now = _gameTick;
		const W = episode.cWidth;
		const H = episode.cHeight;
		const TAU = Math.PI * 2;
		const S = W / 1280;

		// === INIT ===
		if (!_params.startTime || _params.finished) {
			_params.startTime = now;
			_params.finished = false;

			// Pre-allocate & reuse arrays
			if (!_params.sparkLines) _params.sparkLines = new Array(8);
			if (!_params.particles) _params.particles = new Array(25);
			for (let i = 0; i < _params.sparkLines.length; i++) _params.sparkLines[i] = null;
			for (let i = 0; i < _params.particles.length; i++) _params.particles[i] = null;
			episode.enemies?.forEach(x => x.stop = 1);
			episode.ultimateTimeStop = 1;
			PlaySound({ key: 'chargepower', volume: 1 });
		}

		// === CONSTANTS ===
		const dur1 = 510; // Spark toplama
		const dur2 = 90;  // Flash
		const dur3 = 400; // Halo genişleme + partiküller
		const total = dur1 + dur2 + dur3;

		// === COORD ===
		const c = {
			x: _char.SCREENLEFT,
			y: (H - _char.yPosition) - ((_params.y ?? 0) * _char.ZOOM)
		};
		if (ctx.reversed) c.x *= -1;

		const elapsed = now - _params.startTime;

		ctx.save();

		// === FAZ 1: Spark toplama ===
		if (elapsed < dur1) {
			// garanti: sparkLines dizisi her zaman tanımlı olur
			let sparks = _params.sparkLines = _params.sparkLines || [];

			// sabit 8 yön
			const COUNT = 8;
			if (sparks.length !== COUNT || !sparks[0]) {
				sparks.length = 0;
				const step = TAU / COUNT;
				for (let i = 0; i < COUNT; i++) {
					sparks.push({
						angle: step * i,
						len: (140 + Math.random() * 40) * S,
						curl: (Math.random() * 0.5 - 0.25),
						offset: Math.random() * TAU
					});
				}
			}

			const prog = elapsed / dur1;
			ctx.strokeStyle = 'rgb(125,249,255)';
			ctx.lineWidth = 2.5 * S;
			ctx.globalAlpha = Math.max(0, 1 - prog * 0.6);

			for (let i = 0; i < sparks.length; i++) {
				const s = sparks[i];
				if (!s) continue;

				const shrink = Math.max(0, 1 - prog * 1.1);
				const len = s.len * shrink;

				const angleBase = s.angle + Math.sin(prog * 6 + s.offset) * s.curl;
				const cosA = Math.cos(angleBase);
				const sinA = Math.sin(angleBase);

				const x1 = c.x + cosA * len;
				const y1 = c.y + sinA * len;
				const x2 = c.x + cosA * (len - 20 * S);
				const y2 = c.y + sinA * (len - 20 * S);

				const midX = (x1 + x2) / 2 + sinA * 10 * S;
				const midY = (y1 + y2) / 2 - cosA * 10 * S;

				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.quadraticCurveTo(midX, midY, x2, y2);
				ctx.stroke();
			}

			// merkez parlaması (son kısıma doğru)
			if (elapsed > dur1 * 0.9) {
				const t = (elapsed - dur1 * 0.9) / (dur1 * 0.1);
				const rad = (40 + 80 * t) * S;
				ctx.globalAlpha = Math.min(1, t * 1.5);
				ctx.fillStyle = 'rgb(255,255,255)';
				ctx.beginPath();
				ctx.arc(c.x, c.y, rad, 0, TAU);
				ctx.fill();
			}

			ctx.restore();
			return;
		}

		// === FAZ 2: Flash ===
		if (elapsed < dur1 + dur2) {
			if (!_params.sound) {
				PlaySound({ key: 'ultimate', volume: 1 });
				_params.sound = true;
				episode.enemies?.forEach(x => delete x.stop);
				delete episode.ultimateTimeStop;
			}
			ctx.restore();
			return;
		}

		// === FAZ 3: Halo + Partiküller ===
		const t3 = (elapsed - dur1 - dur2) / dur3;

		// ---- Dış halka (eliptik genişleme) ----
		const minR = W * 0.08;
		const maxR = W * 0.65;
		const ringR = minR + (maxR - minR) * Math.min(t3, 1);
		//const ringAlpha = 1 - t3 * 1.3;
		const lineWidth = (12 * S) * (1 - t3 * 1.5);

		if (lineWidth >= 1) {
			ctx.lineWidth = lineWidth;
			//ctx.globalAlpha = ringAlpha;
			ctx.strokeStyle = 'rgb(184,251,255)';
			ctx.beginPath();
			ctx.ellipse(c.x, c.y, ringR * 1.1, ringR * 0.9, 0, 0, TAU);
			ctx.stroke();
		}

		// ---- İç halka (dotted) ----
		const innerR = (ringR * 0.5) * Math.min(t3 * 1.5, 1);
		const innerAlpha = Math.max(0, 0.6 - t3);
		const innerLineW = (6 * S) * (1 - t3 * 0.5);

		if (innerAlpha > 0.01) {
			//ctx.globalAlpha = innerAlpha;
			ctx.lineWidth = innerLineW;
			ctx.strokeStyle = 'rgb(125,249,255)';

			const segCount = 14;
			const gapRatio = 0.45 + 0.35 * t3;
			const arcStep = TAU / segCount;

			ctx.beginPath();
			for (let i = 0; i < segCount; i++) {
				const start = arcStep * i;
				const end = start + arcStep * (1 - gapRatio);
				ctx.arc(c.x, c.y, innerR, start, end);
			}
			ctx.stroke();
		}

		// ---- Partiküller (reuse & pool) ----
		let parts = _params.particles;
		if (!parts[0]) {
			const pCount = parts.length;
			for (let i = 0; i < pCount; i++) {
				const angle = Math.random() * TAU;
				const spd = (2 + Math.random() * 3) * S;
				parts[i] = {
					x: c.x, y: c.y,
					vx: Math.cos(angle) * spd,
					vy: Math.sin(angle) * spd,
					life: 1,
					size: (2 + Math.random() * 2) * S
				};
			}
		}

		// Update & Draw (no array filter)
		//ctx.globalAlpha = 1;
		for (let i = 0; i < parts.length; i++) {
			const p = parts[i];
			if (!p) continue;
			p.x += p.vx;
			p.y += p.vy;
			p.life -= 0.03;
			if (p.life > 0) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, TAU);
				ctx.fillStyle = '#FFFFFF';
				ctx.fill();
			} else parts[i] = null; // reuse slot
		}

		ctx.restore();

		if (elapsed >= total) {
			_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'halo');
			_params.finished = true;
			_params.sparkLines = [];
			_params.particles = [];
			delete _params.sound;
		}
	},
	// distortion: function(_char, _params, _canv) {
	// 	const _ms = _params.ms;
	// 	const _ctx = _canv ?? c10;
	// 	if(!_ctx?.canvas)
	// 		return;
	// 	const _x = _char.ORIGINLEFT;
	// 	const _y = MathRound(_char.TOP + (_char.HEIGHT / 2));
	// 	let w, h;
	// 	try {
	// 		w = _ctx.canvas.width;
	// 	 	h = _ctx.canvas.height;
	// 	}
	// 	catch(cex) {
	// 		return;
	// 	}

	// 	// initialize
	// 	if (!_params.start)
	// 		_params.start = _gameTick;

	// 	// time check
	// 	const elapsed = _gameTick - _params.start;
	// 	if (elapsed >= _params.ms) {
	// 		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortion');
	// 		return;
	// 	}

	// 	// normalize time 0 → 1
	// 	const t = elapsed / _params.ms;

	// 	// power from character (opsiyonel, sende ne varsa kullan)
	// 	const baseRadius = /*anim.p1 ? anim.p1.power * 2 : */80;

	// 	const currentRadius = baseRadius * (1 + t * 1.3);
	// 	const amount = 0.15 * (1 - t);

	// 	const src = _ctx.getImageData(0, 0, w, h);
	// 	const dst = _ctx.createImageData(w, h);

	// 	const sData = src.data;
	// 	const dData = dst.data;

	// 	const cx = _x;
	// 	const cy = _y;
	// 	const cr2 = currentRadius * currentRadius;

	// 	// PER TICK distortion warp
	// 	for (let y = 0; y < h; y++) {
	// 		for (let x = 0; x < w; x++) {

	// 			const dx = x - cx;
	// 			const dy = y - cy;
	// 			const dist2 = dx*dx + dy*dy;

	// 			let ox = x;
	// 			let oy = y;

	// 			if (dist2 < cr2) {
	// 				const d = Math.sqrt(dist2);
	// 				const f = (currentRadius - d) / currentRadius;
	// 				const bend = Math.sin((d / currentRadius) * Math.PI) * amount;
	// 				ox = x + (dx / d) * bend * currentRadius;
	// 				oy = y + (dy / d) * bend * currentRadius;
	// 			}

	// 			const sx = ox|0;
	// 			const sy = oy|0;

	// 			const sI = (sy * w + sx) * 4;
	// 			const dI = (y * w + x) * 4;

	// 			if (sx >= 0 && sy >= 0 && sx < w && sy < h) {
	// 				dData[dI]   = sData[sI];
	// 				dData[dI+1] = sData[sI+1];
	// 				dData[dI+2] = sData[sI+2];
	// 				dData[dI+3] = sData[sI+3];
	// 			} else {
	// 				dData[dI+3] = 0;
	// 			}
	// 		}
	// 	}

	// 	_ctx.putImageData(dst, 0, 0);
	// }
// distortion: function(_char, _params, _canv) {
// 	const _ms = _params.ms;
//     const _ctx = _canv ?? c10;
//     if(!_ctx?.canvas) return;

//     const _x = _char.ORIGINLEFT;
//     const _y = MathRound(_char.TOP + (_char.HEIGHT / 2));

// 	let w, h;
// 	try {
// 		w = _ctx.canvas.width;
// 		h = _ctx.canvas.height;
// 	} catch {
// 		return;
// 	}

// 	// initialize
// 	if (!_params.start)
// 		_params.start = _gameTick;

// 	// time check
// 	const elapsed = _gameTick - _params.start;
// 	if (elapsed >= _params.ms) {
// 		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortion');
// 		return;
// 	}

// 	// normalize time 0 → 1
// 	const t = elapsed / _params.ms;

// 	// base shock radius (opsiyonel power)
// 	const baseRadius = MathRound(episode.cWidth / 10);  
// 	const currentRadius = baseRadius * (1 + t * 1.3);
// 	const amount = 0.15 * (1 - t);

// 	// ---- BOUNDING BOX OPTIMIZATION ----
// 	const minX = Math.max(0, Math.floor(_x - currentRadius));
// 	const maxX = Math.min(w - 1, Math.ceil(_x + currentRadius));
// 	const minY = Math.max(0, Math.floor(_y - currentRadius));
// 	const maxY = Math.min(h - 1, Math.ceil(_y + currentRadius));

// 	const boxW = maxX - minX + 1;
// 	const boxH = maxY - minY + 1;

// 	// sadece gerekli alanı alıyoruz
// 	const src = _ctx.getImageData(minX, minY, boxW, boxH);
// 	const dst = _ctx.createImageData(boxW, boxH);

// 	const sData = src.data;
// 	const dData = dst.data;

// 	const cx = _x - minX;
// 	const cy = _y - minY;
// 	const cr2 = currentRadius * currentRadius;

// 	// sadece dar alan içinde warp
// 	for (let y = 0; y < boxH; y++) {
// 		for (let x = 0; x < boxW; x++) {

// 			const dx = x - cx;
// 			const dy = y - cy;
// 			const dist2 = dx*dx + dy*dy;

// 			let ox = x;
// 			let oy = y;

// 			if (dist2 < cr2) {
// 				const d = Math.sqrt(dist2);
// 				const bend = Math.sin((d / currentRadius) * Math.PI) * amount;
// 				ox = x + (dx / d) * bend * currentRadius;
// 				oy = y + (dy / d) * bend * currentRadius;
// 			}

// 			const sx = ox|0;
// 			const sy = oy|0;

// 			const sI = (sy * boxW + sx) * 4;
// 			const dI = (y * boxW + x) * 4;

// 			if (sx >= 0 && sy >= 0 && sx < boxW && sy < boxH) {
// 				dData[dI]   = sData[sI];
// 				dData[dI+1] = sData[sI+1];
// 				dData[dI+2] = sData[sI+2];
// 				dData[dI+3] = sData[sI+3];
// 			} else {
// 				dData[dI+3] = 0;
// 			}
// 		}
// 	}

// 	_ctx.putImageData(dst, minX, minY);
// }
// distortionhit: function(_char, _params, _canv) {
// 	if(episode.distorting && episode.distorting !== _char.key)
// 	{
// 		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit');
// 		return;
// 	}
//     const _ms = _params.ms;
//     const _ctx = _canv ?? c10;
//     if (!_ctx?.canvas) return;

//     const _x = _char.ORIGINLEFT;
//     const _y = MathRound(_char.TOP + (_char.HEIGHT/2));

//   	let w, h;
// 	try {
// 		w = _ctx.canvas.width;
// 		h = _ctx.canvas.height;
// 	} catch {
// 		return;
// 	}
// 	episode.distorting = _char.key;

//     if (!_params.start) _params.start = _gameTick;
//     const elapsed = _gameTick - _params.start;
//     if (elapsed >= _ms) {
// 		delete episode.distorting;
// 		delete _params.start;
//         _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit');
//         return;
//     }

//     const t = elapsed / _ms;

//     // ----- Radius ayarı -----
//     const rx = _params.rX ?? MathRound(episode.cWidth/10);
//     const ry = _params.rY ?? rx;
//     const currentRadiusX = rx * (1 + t*1.3);
//     const currentRadiusY = ry * (1 + t*1.3);
//     const amount = 0.15 * (1 - t);

//     // ---- Bounding box ----
//     const minX = Math.max(0, (_x - currentRadiusX)|0);
//     const maxX = Math.min(w-1, (_x + currentRadiusX)|0);
//     const minY = Math.max(0, (_y - currentRadiusY)|0);
//     const maxY = Math.min(h-1, (_y + currentRadiusY)|0);

//     const boxW = maxX - minX + 1;
//     const boxH = maxY - minY + 1;

//     const src = _ctx.getImageData(minX, minY, boxW, boxH);
//     const dst = _ctx.createImageData(boxW, boxH);
//     const sData = src.data;
//     const dData = dst.data;

//     const cx = _x - minX;
//     const cy = _y - minY;

//     for (let y=0; y<boxH; y++) {
//         for (let x=0; x<boxW; x++) {
//             const dx = x - cx;
//             const dy = y - cy;
//             const nx = dx / currentRadiusX;
//             const ny = dy / currentRadiusY;
//             const dist2 = nx*nx + ny*ny;

//             let ox = x;
//             let oy = y;

//             if (dist2 < 1) {
//                 const d = Math.sqrt(dist2) || 1;
//                 const bend = Math.sin(d * Math.PI) * amount;

//                 // --- heatwave akışı ---
//                 const noise = (Math.sin((x+y+_gameTick)*0.12)*(1-t)) * 3;

//                 ox = x + nx*bend*currentRadiusX + noise;
//                 oy = y + ny*bend*currentRadiusY + noise*0.5;

//                 // --- mini chromatic ---
//                 const shift = (1 - t) * 2;
//                 ox += shift * Math.sin(_gameTick*0.2);
//                 oy += shift * Math.cos(_gameTick*0.2);
//             }

//             const sx = ox|0;
//             const sy = oy|0;

//             const sI = (sy*boxW + sx)*4;
//             const dI = (y*boxW + x)*4;

//             if (sx>=0 && sy>=0 && sx<boxW && sy<boxH) {
//                 // RGB ayrışması
//                 dData[dI]   = sData[sI] + ((sx%2)?2:0); // R slight shift
//                 dData[dI+1] = sData[sI+1];             // G normal
//                 dData[dI+2] = sData[sI+2] + ((sy%2)?2:0); // B slight shift
//                 dData[dI+3] = sData[sI+3];
//             } else dData[dI+3] = 0;
//         }
//     }

//     _ctx.putImageData(dst, minX, minY);
// },
	distortionhit01: function(_char, _params, _canv) {

    if (episode.distorting && episode.distorting !== _char.key) {
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit');
        return;
    }

    const _ms = _params.ms;
    const _ctx = _canv ?? c10;
    if (!_ctx?.canvas) return;


    let w, h;
    try {
        w = _ctx.canvas.width;
        h = _ctx.canvas.height;
    } catch {
        return;
    }

    if (!_params.start) {
    	episode.distorting = _char.key;
		_params.start = _gameTick;
		return;
	}
	
    // === 30 FPS Throttle ===
    if (!_params.lastDraw) _params.lastDraw = 0;
    if (_gameTick - _params.lastDraw < 33) return;
    _params.lastDraw = _gameTick;

	if (!_params.cx) _params.cx = _char.ORIGINLEFT;
	if (!_params.cy) _params.cy = MathRound(_char.TOP + (_char.HEIGHT / 2) - ((_params.yGap ?? 0) * _char.ZOOM));

    const _x = _params.cx;
    const _y = _params.cy;

    const elapsed = _gameTick - _params.start;

    if (elapsed >= _ms) {
        delete episode.distorting;
		delete _params.cx;
		delete _params.cy;
        delete _params.start;
        delete _params.lastDraw;
		delete _params.box;
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit');
        return;
    }
    const t = elapsed / _ms;

    // ----- Radius ayarı -----
    const rx = _params.rX ?? MathRound(episode.cWidth / 10);
    const ry = _params.rY ?? rx;

    const currentRadiusX = rx * (1 + t * 1.3);
    const currentRadiusY = ry * (1 + t * 1.3);

    // 🔹 Strength parametresi
    const strength = _params.strength ?? 0.15;  // default eskisiyle aynı
    const amount = strength * (1 - t);
	if (!_params.box) {
		_params.box = {
			minX: Math.max(0, (_x - currentRadiusX)|0),
			maxX: Math.min(w-1, (_x + currentRadiusX)|0),
			minY: Math.max(0, (_y - currentRadiusY)|0),
			maxY: Math.min(h-1, (_y + currentRadiusY)|0)
		};
	}
	const {minX, maxX, minY, maxY} = _params.box;
    // ---- Bounding box ----
    // const minX = Math.max(0, (_x - currentRadiusX) | 0);
    // const maxX = Math.min(w - 1, (_x + currentRadiusX) | 0);
    // const minY = Math.max(0, (_y - currentRadiusY) | 0);
    // const maxY = Math.min(h - 1, (_y + currentRadiusY) | 0);

    const boxW = maxX - minX + 1;
    const boxH = maxY - minY + 1;
    if (boxW <= 1 || boxH <= 1) return;

    // === OFFSCREEN CANVAS ===
    const FX = window._distortFX;
    const fxC = FX.distc;
    const fx = FX.dctx;

    // boyut eşitle
    if (fxC.width !== boxW || fxC.height !== boxH) {
        fxC.width = boxW;
        fxC.height = boxH;
    }

    // ana canvas'tan sadece gerekli alanı fx'e al
    fx.clearRect(0, 0, boxW, boxH);
    fx.drawImage(_ctx.canvas, minX, minY, boxW, boxH, 0, 0, boxW, boxH);

    const src = fx.getImageData(0, 0, boxW, boxH);
    const dst = fx.createImageData(boxW, boxH);

    const sData = src.data;
    const dData = dst.data;

    const cx = _x - minX;
    const cy = _y - minY;

    for (let y = 0; y < boxH; y++) {
        for (let x = 0; x < boxW; x++) {

            const dx = x - cx;
            const dy = y - cy;

            const nx = dx / currentRadiusX;
            const ny = dy / currentRadiusY;
            const dist2 = nx * nx + ny * ny;

            let ox = x;
            let oy = y;

            if (dist2 < 1) {
                const d = Math.sqrt(dist2) || 1;

                // 🧠 Basınç hissi
                const bend = (1 - d) * amount;

                // heatwave
                const noise = (Math.sin((x + y + _gameTick) * 0.12) * (1 - t)) * 2;

                ox = x + nx * bend * currentRadiusX + noise;
                oy = y + ny * bend * currentRadiusY + noise * 0.5;

                // micro chromatic shift feel
                const shift = (1 - t) * 1.5;
                ox += shift * Math.sin(_gameTick * 0.2);
                oy += shift * Math.cos(_gameTick * 0.2);
            }

            const sx = ox | 0;
            const sy = oy | 0;

            const sI = (sy * boxW + sx) * 4;
            const dI = (y * boxW + x) * 4;

            if (sx >= 0 && sy >= 0 && sx < boxW && sy < boxH) {
                dData[dI]     = sData[sI];
                dData[dI + 1] = sData[sI + 1];
                dData[dI + 2] = sData[sI + 2];
                dData[dI + 3] = sData[sI + 3];
            } else {
                dData[dI + 3] = 0;
            }
        }
    }

    // fx canvas'a bas
    fx.putImageData(dst, 0, 0);

    // ana canvas'a geri bas
    _ctx.drawImage(fxC, minX, minY);
},
distortionhit: function(_char, _params, _canv) {

    if (episode.distorting && episode.distorting !== _char.key) {
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit');
        return;
    }

    const _ms = _params.ms;
    const _ctx = _canv ?? c10;
    if (!_ctx?.canvas) return;

    if (!_params.start) {
        episode.distorting = _char.key;
        _params.start = _gameTick;
        return;
    }

    const elapsed = _gameTick - _params.start;

    if (elapsed >= _ms) {
        delete episode.distorting;
        delete _params.start;
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit');
        return;
    }

    const t = elapsed / _ms;
    const ease = 1 - t;

    const cx = _params.cx ?? (_params.cx = _char.ORIGINLEFT);
    const cy = _params.cy ?? (_params.cy = MathRound(
        _char.TOP + (_char.HEIGHT / 2) - ((_params.yGap ?? 0) * _char.ZOOM)
    ));

    const strength = _params.strength ?? 0.2;

    const pulse = 1 + (strength * 0.4 * ease);

    // === SHOCKWAVE SCALE WARP ===
    _ctx.save();
    _ctx.translate(cx, cy);
    _ctx.scale(pulse, pulse);
    _ctx.translate(-cx, -cy);
    _ctx.globalAlpha = 0.25 * ease;
    _ctx.drawImage(_ctx.canvas, 0, 0);
    _ctx.restore();

    // === CHROMATIC GHOST ===
    const ghostOffset = 4 * ease * strength;

    _ctx.save();
    _ctx.globalAlpha = 0.15 * ease;
    _ctx.globalCompositeOperation = "lighter";
    _ctx.drawImage(_ctx.canvas, ghostOffset, 0);
    _ctx.drawImage(_ctx.canvas, -ghostOffset, 0);
    _ctx.restore();

    // === FLASH RING ===
    const radius = (_params.rX ?? episode.cWidth / 10) * (1 + t * 1.2);

    const g = _ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius);
    g.addColorStop(0, "rgba(255,255,255,0.4)");
    g.addColorStop(1, "rgba(255,255,255,0)");

    _ctx.save();
    _ctx.globalAlpha = 0.6 * ease;
    _ctx.fillStyle = g;
    _ctx.beginPath();
    _ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    _ctx.fill();
    _ctx.restore();
},

distortionhit2: function(_char, _params, _canv) {

    if (episode.distorting && episode.distorting !== _char.key) {
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit2');
        return;
    }

    const _ms = _params.ms ?? 220;
    const delay = _params.delay ?? 20; // 🔹 eklenen delay
    const _ctx = _canv ?? c10;
    if (!_ctx?.canvas) return;

    // === 30 FPS Throttle ===
    if (!_params.lastDraw) _params.lastDraw = 0;
    if (_gameTick - _params.lastDraw < 33) return;
    _params.lastDraw = _gameTick;

    const _x = _char.ORIGINLEFT;
    const _y = MathRound(_char.TOP + (_char.HEIGHT / 2));

    let w, h;
    try {
        w = _ctx.canvas.width;
        h = _ctx.canvas.height;
    } catch {
        return;
    }

    episode.distorting = _char.key;

    // 🔹 Delay uygulama
    if (!_params.start) _params.start = _gameTick + delay;
    const elapsed = _gameTick - _params.start;

    if (elapsed < 0) return; // delay süresi dolmamış

    if (elapsed >= _ms) {
        delete episode.distorting;
        delete _params.start;
        delete _params.lastDraw;
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit2');
        return;
    }

    const t = elapsed / _ms;

    // ===== PARAMETRELER (hepsi dışarıdan override edilebilir) =====
    const rx = _params.rX ?? MathRound(episode.cWidth / 10);
    const ry = _params.rY ?? rx;

    const waveStrength = _params.power ?? 0.20;     // bükme gücü
    const waveFreq     = _params.freq ?? 10;        // halka sıkılığı
    const waveSpeed    = _params.speed ?? 6;        // halka yayılma hızı

    const shockRadiusX = rx * (t * 1.4);
    const shockRadiusY = ry * (t * 1.4);
    const amount = waveStrength * (1 - t);

    // ---- Bounding box ----
    const minX = Math.max(0, (_x - rx * 1.5) | 0);
    const maxX = Math.min(w - 1, (_x + rx * 1.5) | 0);
    const minY = Math.max(0, (_y - ry * 1.5) | 0);
    const maxY = Math.min(h - 1, (_y + ry * 1.5) | 0);

    const boxW = maxX - minX + 1;
    const boxH = maxY - minY + 1;
    if (boxW <= 1 || boxH <= 1) return;

    const FX = window._distortFX;
    const fxC = FX.distc;
    const fx = FX.dctx;

    if (fxC.width !== boxW || fxC.height !== boxH) {
        fxC.width = boxW;
        fxC.height = boxH;
    }

    fx.clearRect(0, 0, boxW, boxH);
    fx.drawImage(_ctx.canvas, minX, minY, boxW, boxH, 0, 0, boxW, boxH);

    const src = fx.getImageData(0, 0, boxW, boxH);
    const dst = fx.createImageData(boxW, boxH);

    const sData = src.data;
    const dData = dst.data;

    const cx = _x - minX;
    const cy = _y - minY;

    for (let y = 0; y < boxH; y++) {
        for (let x = 0; x < boxW; x++) {

            const dx = x - cx;
            const dy = y - cy;

            const nx = dx / rx;
            const ny = dy / ry;
            const dist = Math.sqrt(nx * nx + ny * ny);

            let ox = x;
            let oy = y;

            if (dist < 1) {

                const ringX = shockRadiusX / rx;
                const ringY = shockRadiusY / ry;
                const ring = Math.abs(dist - (t * 1.2));

                let ringForce = 0;
                if (ring < 0.08) ringForce = (1 - ring / 0.08) * 4;

                const bend = (1 - dist) * amount * 40;
                const wave = Math.sin((dist * waveFreq) - (t * waveSpeed)) * bend;
				const noise = (_gameTick - _params.start < 1) ? 0 : (Math.sin((x+y+_gameTick)*0.12)*(1-t))*2;
				const shift = (_gameTick - _params.start < 1) ? 0 : (1-t)*1.5;

                ox = x + (nx * (wave + ringForce)) * rx + noise;
                oy = y + (ny * (wave + ringForce)) * ry + noise;

                ox += shift * Math.sin(_gameTick * 0.15);
                oy += shift * Math.cos(_gameTick * 0.15);
            }

            const sx = ox | 0;
            const sy = oy | 0;

            const sI = (sy * boxW + sx) * 4;
            const dI = (y * boxW + x) * 4;

            if (sx >= 0 && sy >= 0 && sx < boxW && sy < boxH) {
                dData[dI]     = sData[sI];
                dData[dI + 1] = sData[sI + 1];
                dData[dI + 2] = sData[sI + 2];
                dData[dI + 3] = sData[sI + 3];
            } else {
                dData[dI + 3] = 0;
            }
        }
    }

    fx.putImageData(dst, 0, 0);
    _ctx.drawImage(fxC, minX, minY);
},
distortionhit3: function(_char, _params, _canv) {

    if (episode.distorting && episode.distorting !== _char.key) {
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit3');
        return;
    }

    const _ms = _params.ms ?? 220;
    const delay = _params.delay ?? (_params.after ? 20 : 0);
    const _ctx = _canv ?? c10;
    if (!_ctx?.canvas) return;

    // 30 FPS Throttle
    if (!_params.lastDraw) _params.lastDraw = 0;
    if (_gameTick - _params.lastDraw < 33) return;
    _params.lastDraw = _gameTick;

    const _x = _char.ORIGINLEFT;
    const _y = MathRound(_char.TOP + (_char.HEIGHT / 2));

    let w, h;
    try { w = _ctx.canvas.width; h = _ctx.canvas.height; } catch { return; }

    episode.distorting = _char.key;

    if (!_params.start) _params.start = _gameTick + delay;
    const elapsed = _gameTick - _params.start;

    if (elapsed < 0) return;
    if (elapsed >= _ms) {
        delete episode.distorting;
        delete _params.start;
        delete _params.lastDraw;
        _char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortionhit3');
        return;
    }

    // normalize time
    let t = elapsed / _ms;
    t = t < 0 ? 0 : t > 1 ? 1 : t; // clamp 0-1
    // smooth ease
    t = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2,2)/2;

    const rx = _params.rX ?? MathRound(episode.cWidth / 10);
    const ry = _params.rY ?? rx;

    const power = _params.power ?? 0.2;
    const freq  = _params.freq ?? 10;
    const speed = _params.speed ?? 6;

    const shockRadiusX = rx * (t * 1.4);
    const shockRadiusY = ry * (t * 1.4);
    const amount = power * (1 - t);

    const minX = Math.max(0, (_x - rx*1.5)|0);
    const maxX = Math.min(w-1, (_x + rx*1.5)|0);
    const minY = Math.max(0, (_y - ry*1.5)|0);
    const maxY = Math.min(h-1, (_y + ry*1.5)|0);

    const boxW = maxX - minX + 1;
    const boxH = maxY - minY + 1;
    if (boxW <= 1 || boxH <= 1) return;

    const FX = window._distortFX;
    const fxC = FX.distc;
    const fx = FX.dctx;

    if (fxC.width !== boxW || fxC.height !== boxH) { fxC.width = boxW; fxC.height = boxH; }

    fx.clearRect(0,0,boxW,boxH);
    fx.drawImage(_ctx.canvas,minX,minY,boxW,boxH,0,0,boxW,boxH);

    const src = fx.getImageData(0,0,boxW,boxH);
    const dst = fx.createImageData(boxW,boxH);
    const sData = src.data;
    const dData = dst.data;

    const cx = _x - minX;
    const cy = _y - minY;

    for (let y=0;y<boxH;y++){
        for (let x=0;x<boxW;x++){
            const dx = x - cx;
            const dy = y - cy;

            const nx = dx / rx;
            const ny = dy / ry;
            const dist = Math.sqrt(nx*nx + ny*ny);

            let ox = x;
            let oy = y;

            if(dist < 1){
                const bend = (1 - dist) * amount * 40;
                const wave = Math.sin(dist*freq - t*speed) * bend;
                const noise = Math.sin((x+y+_gameTick)*0.15)*(1-t);

                ox = x + (nx*(wave)) * rx + noise;
                oy = y + (ny*(wave)) * ry + noise*0.5;

                const shift = (1-t)*0.8;
                ox += shift*Math.sin(_gameTick*0.15);
                oy += shift*Math.cos(_gameTick*0.15);
            }

            const sx = ox|0;
            const sy = oy|0;

            const sI = (sy*boxW + sx)*4;
            const dI = (y*boxW + x)*4;

            if(sx>=0 && sy>=0 && sx<boxW && sy<boxH){
                dData[dI] = sData[sI];
                dData[dI+1] = sData[sI+1];
                dData[dI+2] = sData[sI+2];
                dData[dI+3] = sData[sI+3];
            } else {
                dData[dI+3]=0;
            }
        }
    }

    fx.putImageData(dst,0,0);
    _ctx.drawImage(fxC,minX,minY);
},

distortion: function(_char, _params, _canv) {
	if(episode.distorting && episode.distorting !== _char.key)
	{
		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortion');
		return;
	}
	const _ms = _params.ms;
    const _ctx = _canv ?? c10;
    if(!_ctx?.canvas) 
		return;

    const _x = _char.ORIGINLEFT;
    const _y = MathRound(_char.TOP + (_char.HEIGHT / 2));

	let w, h;
	try {
		w = _ctx.canvas.width;
		h = _ctx.canvas.height;
	} catch {
		return;
	}
	episode.distorting = _char.key;
	// initialize
	if (!_params.start)
		_params.start = _gameTick;

	// time check
	const elapsed = _gameTick - _params.start;
	if (elapsed >= _ms) {
		delete episode.distorting;
		delete _params.start;
		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'distortion');
		return;
	}

	// normalize time 0 → 1
	// const t = elapsed / _ms;

	// // *** MOBIL DOSTU ***
	// const baseRadius = MathRound(episode.cWidth / 10);
	// const currentRadius = baseRadius * (1 + t * 1.3);
	// const amount = 0.15 * (1 - t);

	// // ---- BOUNDING BOX ----
	// const minX = Math.max(0, (_x - currentRadius)|0);
	// const maxX = Math.min(w - 1, (_x + currentRadius)|0);
	// const minY = Math.max(0, (_y - currentRadius)|0);
	// const maxY = Math.min(h - 1, (_y + currentRadius)|0);

	// const boxW = maxX - minX + 1;
	// const boxH = maxY - minY + 1;

	// // SADECE ALAN
	// const src = _ctx.getImageData(minX, minY, boxW, boxH);
	// const dst = _ctx.createImageData(boxW, boxH);

	// const sData = src.data;
	// const dData = dst.data;

	// const cx = _x - minX;
	// const cy = _y - minY;
	// const cr2 = currentRadius * currentRadius;

	// // ------- ANA LOOP (sadece etki alanı) -------
	// for (let y = 0; y < boxH; y++) {
	// 	for (let x = 0; x < boxW; x++) {

	// 		const dx = x - cx;
	// 		const dy = y - cy;
	// 		const dist2 = dx*dx + dy*dy;

	// 		let ox = x;
	// 		let oy = y;

	// 		if (dist2 < cr2) {
	// 			const d = Math.sqrt(dist2) || 1;

	// 			const bend = Math.sin((d / currentRadius) * Math.PI) * amount;

	// 			// --- noise SADECE ALAN DAHİLİNDE ---
	// 			const noise = (Math.sin((x+y + _gameTick) * 0.15) * (1 - t)) * 3;

	// 			const ndx = (dx / d) * bend * currentRadius + noise;
	// 			const ndy = (dy / d) * bend * currentRadius + noise * 0.5;

	// 			ox = x + ndx;
	// 			oy = y + ndy;
	// 		}

	// 		const sx = ox|0;
	// 		const sy = oy|0;

	// 		const si = (sy * boxW + sx) * 4;
	// 		const di = (y * boxW + x) * 4;

	// 		if (sx >= 0 && sy >= 0 && sx < boxW && sy < boxH) {
	// 			dData[di]   = sData[si];
	// 			dData[di+1] = sData[si+1];
	// 			dData[di+2] = sData[si+2];
	// 			dData[di+3] = sData[si+3];
	// 		} else {
	// 			dData[di+3] = 0;
	// 		}
	// 	}
	// }

	// _ctx.putImageData(dst, minX, minY);
	const t = elapsed / _ms;

    // ----- Radius Ayarı -----
    const rx = _params.rX ?? MathRound(episode.cWidth / 10);
    const ry = _params.rY ?? rx;
    const currentRadiusX = rx * (1 + t * 1.3);
    const currentRadiusY = ry * (1 + t * 1.3);
    const amount = 0.15 * (1 - t);

    // ---- Bounding Box ----
    const minX = Math.max(0, Math.floor(_x - currentRadiusX));
    const maxX = Math.min(w - 1, Math.ceil(_x + currentRadiusX));
    const minY = Math.max(0, Math.floor(_y - currentRadiusY));
    const maxY = Math.min(h - 1, Math.ceil(_y + currentRadiusY));

    const boxW = maxX - minX + 1;
    const boxH = maxY - minY + 1;

    const src = _ctx.getImageData(minX, minY, boxW, boxH);
    const dst = _ctx.createImageData(boxW, boxH);

    const sData = src.data;
    const dData = dst.data;

    const cx = _x - minX;
    const cy = _y - minY;

    // ----- Distortion Loop -----
    for (let y = 0; y < boxH; y++) {
        for (let x = 0; x < boxW; x++) {
            const dx = x - cx;
            const dy = y - cy;

            // normalize ellipse distance
            const nx = dx / currentRadiusX;
            const ny = dy / currentRadiusY;
            const dist2 = nx*nx + ny*ny;

            let ox = x;
            let oy = y;

            if (dist2 < 1) {
                const d = Math.sqrt(dist2) || 1;

                // bend effect
                const bend = Math.sin(d * Math.PI) * amount;

                // noise ile hava dalgası efekti
                const noise = (Math.sin((x+y + _gameTick)*0.15) * (1 - t)) * 3;

                ox = x + nx * bend * currentRadiusX + noise;
                oy = y + ny * bend * currentRadiusY + noise * 0.5;
            }

            const sx = ox|0;
            const sy = oy|0;

            const si = (sy * boxW + sx) * 4;
            const di = (y * boxW + x) * 4;

            if (sx >= 0 && sy >= 0 && sx < boxW && sy < boxH) {
                dData[di]   = sData[si];
                dData[di+1] = sData[si+1];
                dData[di+2] = sData[si+2];
                dData[di+3] = sData[si+3];
            } else {
                dData[di+3] = 0;
            }
        }
    }

    _ctx.putImageData(dst, minX, minY);
},
crit: function(_char, _params, _canv) {

	if(!_char.main){
		_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'crit');
		return; 
	}

	const ctx = _canv ?? c10;
	const _can = ctx?.canvas;
	if (!_can) return;

	if(!_params.startTime){
		_params.startTime = _gameTick;
	}

	const elapsed = _gameTick - _params.startTime;
	const duration = 1000;

	if(elapsed < duration){

		const t = elapsed / duration;
		const alpha = 1 - t; // güçlü başlasın

		const cx = _can.width / 2;
		const cy = _can.height / 2;
		const maxRadius = Math.max(_can.width, _can.height);

		ctx.save();

		ctx.globalAlpha = alpha;
		ctx.globalCompositeOperation = "source-over";

		const gradient = ctx.createRadialGradient(
			cx, cy, 0,
			cx, cy, maxRadius
		);

		// Kenar yoğunluğu arttırıldı
		gradient.addColorStop(0.35, "rgba(255,0,0,0)");
		gradient.addColorStop(0.65, "rgba(255,0,0,0.8)");
		gradient.addColorStop(0.85, "rgba(200,0,0,1)");
		gradient.addColorStop(1,    "rgba(120,0,0,1)");

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, _can.width, _can.height);

		ctx.restore();
		return;
	}

	_char.canvasObjects = _char.canvasObjects.filter(o => o.key !== 'crit');
	_params.startTime = undefined;
}

}


// setInterval(function() {
// 	if(!episode || !mainCharacter)
// 		return;
// 	if(episode.id < 2)
// 		return;
// 	const _e = episode.seenEnemies.filter(x => x.enemy)?.[0];
// 	if(_e)
// 		_e.addObject({key:'distortion', position:'canvas', p1: { ms: 500, after:true }});
// }, 3000);

let _focusMode;
function cacheCanvas(ctx) {
	return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function restoreCanvas(ctx, imageData) {
	ctx.putImageData(imageData, 0, 0);
}
function darkenLayer(ctx, alpha) {
	ctx.save();
	ctx.globalCompositeOperation = 'source-atop';
	ctx.fillStyle = `rgba(0,0,0,${alpha})`;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.restore();
}
const cssAnimations = {
	blur: function () {
		return;
		removeClass(_css, 'blur-canvas');
		addClass(_css, 'blur-canvas');
	},
	poison: function (_char, _l, _ms, _rate, _opacity) {
		return;
		if(_cssF.querySelector('.screen-poison'))
			return;
		let _a = document.createElement('img');
		_a.style.opacity = 0;
		_cssF.appendChild(_a);
		if(!_rate || getRandomValue(0, 100) < _rate) {
			_a.src = './images/bloods/poison.gif';
			_a.className = 'animate-me-1000 screen-poison full';
			_char.hasSickness = 1;
		}
		setTimeout(function () {
			_a.style.opacity = _opacity ?? .5;
			setTimeout(function () {
				_a.style.opacity = 0;
				setTimeout(function () {
					delete _char.hasSickness;
					_a.remove();
				}, 1000);
			}, _ms);
		}, 20);
	},
	claw: function (_char, _l, _ms, _p3, _final) {
		if(_css.querySelectorAll('.screen-claw')?.length > (_final ? 0 : 3)) {
			if(_final){
				var _removes = _css.querySelectorAll('.screen-claw');
				if(_removes?.[0])
					_removes.forEach(x => x.remove());
			}
			return;
		}
		else if(_final && _css.querySelector('.screen-claw-final'))
			return;
		let _a;// = document.createElement('img');
		//_a.src = './images/bloods/claw' + (_final ? (_char.direction === __left ? 23 : 22) : getRandomValue(10, 18)) + '.png';
		if(!_final) {
			_a = document.createElement('img');
			_a.src = './images/bloods/claw' + getRandomValue(10, 18) + '.png';
			_a.style.width = getRandomValue(episode.cUIWidth / 4, episode.cUIWidth / 2) + 'px';
			_a.style.maxWidth = '25vw';
			_a.style.maxHeight = '50vh';
			_a.style.left = getRandomValue(_l - (episode.cUIWidth / 8), _l + (episode.cUIWidth / 8)) + 'px';
			_a.style.top = getRandomValue(episode.cUIHeight * .1, episode.cUIHeight * .4) + 'px';
			_a.style.opacity = getRandomValue(40, 80) / 100;
			_a.style.transform = 'rotate(' + getRandomValue(0, 360) + 'deg)';
			_a.className = 'screen-blood screen-claw animate-me-3000';
		}
		else {
			_a = document.createElement('div');
			_a.className = 'full flex animate-me-2000 screen-claw-final';
			const _img = document.createElement('img');
			_img.style.height = '70%';
			_img.style.opacity = .6;
			_img.src = './images/bloods/claw' + (_char.direction === __left ? 23 : 22) + '.png';
			//_img.style.left = _img.style.top = '50%';
			//_img.style.transform = 'translate(-50%, -50%)';
			_a.appendChild(_img);
		}
		//_a.className = 'screen-blood screen-claw animate-me-' + (_final ? 1 : 3) + '000' + (_final ? ' screen-claw-final' : '');
		const plug = function() {
			_css.appendChild(_a);
			setTimeout(function () {
				_a.style.opacity = 0;
				setTimeout(function () {
					_a.remove();
				}, _ms ?? 3000);
			}, 20);
		}
		if(_final)
			setTimeout(() => {
				plug();
				PlaySound({ key: 'swing', volume: .65 });
			}, msPerFrame * 3);
		else
			plug();
	},
	blood: function (_char, _l, _ms) {
		return;
		let _a = document.createElement('img');
		_a.src = './images/bloods/' + getRandomValue(1, 7) + '.png';
		_a.style.width = getRandomValue(_canvas.width / 20, _canvas.width / 10) + 'px';
		_a.style.left = getRandomValue(_l - (_canvas.width / 4), _l + (_canvas.width / 4)) + 'px';
		_a.style.top = getRandomValue(_canvas.height * .2, _canvas.height * .85) + 'px';
		_a.style.opacity = getRandomValue(40, 80) / 100;
		_a.style.transform = 'rotate(' + getRandomValue(0, 360) + 'deg)';
		_a.className = 'screen-blood animate-me-3000';
		_css.appendChild(_a);
		setTimeout(function () {
			_a.style.opacity = 0;
			setTimeout(function () {
				_a.remove();
			}, _ms ?? 3000);
		}, 20);
	},
	crack: function () {
		if(cssAnimationProps.crack) {
			if((_gameTick - cssAnimationProps.crack.start) > 2900) {
				const _elem = document.querySelector('#css-canvas .crack');
				if(_elem)
					_elem.remove();
				delete cssAnimationProps.crack;
			}
		}
		else {
			let _a = document.createElement('img');
			_a.src = './images/related/crack.png';
			_a.className = 'full crack fade-end-3000';
			_a.style.transform = 'rotate(' + getRandomValue(0, 360) + 'deg)';
			_css.appendChild(_a);
			cssAnimationProps.crack = { start: _gameTick };
		}
	},
	focusui: function (_selector, _func, _transparent, _text, _doneBtn, _blackBG, _fingerFade, _circle, _noFinger) {
		_focusMode = 1;
		let _curt = document.createElement('div');
		_curt.id = 'focus-ui';
		_curt.className = 'flex' + (_doneBtn ? ' focus-with-button' : '');
		if(_transparent)
			_curt.className += ' focus-transparent';
		if(_text) {
			if(!_doneBtn)
				_curt.innerHTML = '<div class="flex overlay-black-text">' + _text + '</div>';
			else {
				const _wrapper = document.createElement('div');
				_wrapper.className = 'flex w-100 show-ui';
				const _txtWrapper = document.createElement('div');
				_txtWrapper.innerHTML = _text;
				_txtWrapper.className = 'flex black-screen-information w-100';
				const _btnWrapper = document.createElement('div');
				_btnWrapper.className = 'flex black-screen-ok-btn w-100';
				const _btn = document.createElement('div');
				_btn.style = 'color:#f7f7f7cc !important;font-size:3vh !important';
				_btn.className = "game-btn2 flex one-line";
				_btn.innerText = getLangData('Done');
				_btn.onexactclick = function() {
					if(_func)
						_func();
					removeFocus();
				};
				_wrapper.appendChild(_txtWrapper);
				_wrapper.appendChild(_btnWrapper);
				_btnWrapper.appendChild(_btn);
				if(!_blackBG)
					_curt.appendChild(_wrapper);
				else {
					const _wrapperOuter = document.createElement('div');
					_wrapperOuter.className = "flex overlay-black-text";
					_wrapperOuter.appendChild(_wrapper);
					_curt.appendChild(_wrapperOuter);
				}
			}
		}
		const _elem = document.querySelector(_selector);
		if(_func && _elem) {
			const _self = this;
			setTimeout(() => {
				const _shield = document.querySelectorAll('.focus-shield')?.[0];
				if(_shield) {
					const _s = _self;
					_shield.onexactclick = function(event) {
						event.stopPropagation();
						event.preventDefault();
						_func();
						addClass(_elem, 'focus-clicked');
						if(_s.keyboardHandler)
							window.removeEventListener('keydown', _s.keyboardHandler);
					}
					if(_elem && __isPC) {
						let _kbKey = _elem.getAttribute('data-key');
						if(_kbKey) {
							if(_kbKey === 'space')
								_kbKey = ' ';
							_self.keyboardHandler = function (event) {
								try {
									if (event?.key?.toLowerCase() === _kbKey) {
										event.preventDefault();
										_shield.onexactclick(event);
									}
								} catch (e) {

								}
							};
							window.addEventListener('keydown', _self.keyboardHandler);
						}
					}
				}
			}, 20);
		}
		addClass(_elem, 'focus-me');
		const _gm = document.getElementById('game-ui');
		let _container = _gm, _extraX = 0, _extraY = 0;
		if(!hasClass(_gm, 'loaded')) {
			_container = _gameUI;
			const _wrapper = document.getElementById('wrapper');
			_extraX = _wrapper.offsetLeft ?? 0;
			_extraY = _wrapper.offsetTop ?? 0;
		}
		_container.appendChild(_curt);
		let _finger = document.querySelector('.push-me-finger');
		if(_finger)
			_finger.remove();
		if(_doneBtn)
			return;
		_finger = null;
		if(!_noFinger) {
			_finger = document.createElement('img');
			_finger.className = 'push-me-finger';
			if(__isPC && (hasClass(_elem, 'skill') || hasClass(_elem, 'main-menu-btn')) && !_elem.id.startsWith('chain-skill'))
				_finger.className += ' finger-top';
			if(_fingerFade)
				_finger.className += ' fade-me';
		}
		const _rect = _elem.getBoundingClientRect();
		const L = MathRound(_rect.left - _extraX);
		const T = MathRound(_rect.top - _extraY);
		const W = MathRound(_rect.width);
		const H = MathRound(_rect.height);
		const R = L + W;
		const B = T + H;
		//const _allW = _container.getBoundingClientRect().width;
		// _curt.innerHTML += 
		// `<div class='overlay-black show-ui fade-me' style="background:#00000080;position:absolute;width:${L}px;left:0;top:0;height:100%"></div>
		// <div class='overlay-black show-ui fade-me' style="background:#00000080;position:absolute;width:${W}px;left:${L}px;top:0;height:${T}px"></div>
		// <div class='overlay-black show-ui fade-me' style="background:#00000080;position:absolute;width:${_allW - (L + W)}px;left:${L + W}px;top:0;right:1px;height:100%"></div>
		// <div class='overlay-black show-ui fade-me' style="background:#00000080;position:absolute;width:${W}px;left:${L}px;top:${T + H}px;height:calc(100% - ${T + H}px)"></div>
		// <div class='focus-shield${_circle ? ' circle' : ''} show-ui focus-shield-circle' style="background:#FFFFFF01;position:absolute;width:${W}px;left:${L}px;top:${T}px;height:${H}px"></div>`;
		_curt.innerHTML += `
<!-- SOL -->
<div class='overlay-black show-ui fade-me' style="
  position:absolute;
  left:0;
  top:0;
  width:${L}px;
  height:100%;
  background:#00000080;
"></div>

<!-- ÜST -->
<div class='overlay-black show-ui fade-me' style="
  position:absolute;
  left:${L}px;
  top:0;
  width:${W}px;
  height:${T}px;
  background:#00000080;
"></div>

<!-- SAĞ -->
<div class='overlay-black show-ui fade-me' style="
  position:absolute;
  left:${R}px;
  right:0;
  top:0;
  bottom:0;
  background:#00000080;
"></div>

<!-- ALT -->
<div class='overlay-black show-ui fade-me' style="
  position:absolute;
  left:${L}px;
  right:0;
  top:${B}px;
  bottom:0;
  background:#00000080;
"></div>

<!-- FOCUS -->
<div class='focus-shield${_circle ? ' circle' : ''} show-ui focus-shield-circle' style="
  position:absolute;
  left:${L}px;
  top:${T}px;
  width:${W}px;
  height:${H}px;
  background:#FFFFFF01;
"></div>
`;
		if(!_noFinger) {
			_finger.style.left = (_rect.left - _extraX) + 'px';
			_finger.style.top = ((_rect.top - _extraY) + MathRound(.5 * _elem.offsetHeight)) + 'px';
			_finger.src = './images/icons/push-me.gif';
			_container.appendChild(_finger);
		}
		addClass(_gameUI, 'focus-ui-activated');
	},
	black: function (_c, _ms, _text, _func, _delay, _after) {
		if(cssAnimationProps.black) {
			if((_gameTick - cssAnimationProps.black.start) > ((cssAnimationProps.black.p2 ?? _ms ?? 4000) + (_delay ?? 0))) {
				const _elem = document.querySelector('#css-canvas-foreground');
				_elem.onanimationend = function(e) {
					if(e.animationName === 'black-bg') {
						removeClass(_gameUI, 'd-none');
						removeClass(_elem, 'black-bg');
						removeClass(_elem, 'flex');
						if(_after)
							_after();
					}
				}
				_elem.innerText = '';
				if(_func) 
					_func();
				delete cssAnimationProps.black;
			}
			else if(_delay && ((_gameTick - cssAnimationProps.black.start) > _delay)) {
				const _elem = document.querySelector('#css-canvas-foreground');
				delete cssAnimationProps.black.p5; 
				_elem.style.animation = 'none';
				_elem.offsetHeight;
				_elem.style.animation = null;
				addClass(_elem, 'black-bg');
				addClass(_elem, 'flex');
			}
		}
		else {
			const _elem = document.querySelector('#css-canvas-foreground');
			const __r = document.querySelector(':root');
			__r.style.setProperty('--black-duration', ((_ms ?? 4000) + 1000).toString() + 'ms');
			if(!_delay) {
				_elem.style.animation = 'none';
				_elem.offsetHeight;
				_elem.style.animation = null;
				addClass(_elem, 'black-bg');
				addClass(_elem, 'flex');
			}
			_elem.innerText = _text ?? '';
			addClass(_gameUI, 'd-none');
			cssAnimationProps.black = { start: _gameTick, p1: _c, p2: (_ms ?? 4000) + (_delay ?? 0), p3: _text, p4: _func, p5: _delay, p6:_after };
		}
	},
	vs: function (_c, _json, _func) {
		if(cssAnimationProps.vs) {
			if((_gameTick - cssAnimationProps.vs.start) > ((_json?.ms ?? 3000))) {
				const _elem = document.querySelector('#css-canvas-foreground');
				removeClass(_elem, 'black-bg');
				removeClass(_elem, 'flex');
				if(!cssAnimationProps.vs.p1.keepDisableUI)
					removeClass(_gameUI, 'disable-ui');
				if(_func) 
					_func();
				delete cssAnimationProps.vs;
				const _div = document.querySelector('#vs-img');
				if(_div) {
					addClass(_div, 'fade-out');
					_div.onanimationend = function() {
						this.remove();
					}
				}
			}
		}
		else {
			addClass(_gameUI, 'disable-ui');
			const _dPad = document.getElementById('touch-d-pad-inner');
			if(_dPad) {
				addClass(_dPad, 'stay');
				resetDPadKeyCommands();
			}
			PlaySound({force:1,volume:1,key:'boss'});
			const _elem = document.querySelector('#css-canvas-foreground');
			_elem.style.animation = 'none';
			_elem.offsetHeight;
			_elem.style.animation = null;
			addClass(_elem, 'black-bg');
			addClass(_elem, 'flex');
			const _div = document.createElement('div');
			_div.id = 'vs-img';
			_div.className = 'full flex show-ui';
			const _img = document.createElement('img');
			const _imgVs = document.createElement('img');
			_imgVs.src = './images/icons/vs.png';
			_imgVs.className = 'vs-img fade-in';
			_img.id = 'vs-gif';
			_img.src = './images/icons/vs.gif';
			_img.style.height = '100%';
			_div.appendChild(_img);
			_div.appendChild(_imgVs);
			_gameUI.appendChild(_div);
			const _c1Div = document.createElement('div');
			_c1Div.className = 'flex';
			_c1Div.style = 'height:100%;position:absolute;top:0;left:0;width:50&;overflow-hidden';
			const _c1 = document.createElement('img');
			_c1.className = 'concept-slide-left';
			_c1.src = './images/main/' + _c.class + '/concept.png';
			_c1Div.appendChild(_c1);
			_div.appendChild(_c1Div);
			const _c2Div = document.createElement('div');
			_c2Div.className = 'flex';
			_c2Div.style = 'height:100%;position:absolute;top:0;right:0;width:50&;overflow-hidden';
			const _c2 = document.createElement('img');
			_c2.className = 'concept-slide-right';
			_c2.src = './images/main/' + _allEnemies['enemy' + _json.enemyId]().class + '/concept.png';
			_c2Div.appendChild(_c2);
			_div.appendChild(_c2Div);
			const _t1Div = document.createElement('div');
			_t1Div.className = 'flex vs-talk';
			_t1Div.innerText = _json.q1;
			_c1Div.appendChild(_t1Div);
			const _t2Div = document.createElement('div');
			_t2Div.className = 'flex vs-talk';
			_t2Div.innerText = _json.q2;
			_c2Div.appendChild(_t2Div);
			cssAnimationProps.vs = { start: _gameTick, p1: _json, p3: _func };
			hideDmgFrames();
		}
	},
	glasscrack: function (_c, _ms, _zoom) {
		if(cssAnimationProps.glasscrack) {
			if(_c?.removing || ((_gameTick - cssAnimationProps.glasscrack.start) > (cssAnimationProps.glasscrack.p1 ?? 2900))) {
				const _elem = document.querySelector('#css-canvas-foreground');
				removeClass(_elem, 'glass-crack-bg');
				delete cssAnimationProps.glasscrack;
				_elem.style.backgroundPosition = 'inherit';
			}
		}
		else {
			const _elem = document.querySelector('#css-canvas-foreground');
			addClass(_elem, 'glass-crack-bg');
			cssAnimationProps.glasscrack = { start: _gameTick, p1: _ms };
			const _x = _c.SCREENLEFT;
			const _y = MathRound(_c.TOP - ((_zoom ?? 1) * (_c.getHeightWithoutGap() / 2)));
			const _centerX = MathRound(episode.cUIWidth / 2);
			const _centerY = MathRound(episode.cUIHeight / 2);
			_elem.style.setProperty('background-position',(-1 * (_centerX - _x)) + 'px ' + (-1 *(_centerY - _y)) + 'px', 'important');
		}
	},
	white: function () {
		if(cssAnimationProps.white) {
			if((_gameTick - cssAnimationProps.white.start) > 2900) {
				const _elem = document.querySelector('#css-canvas-foreground');
				removeClass(_elem, 'white-bg');
				delete cssAnimationProps.white;
			}
		}
		else {
			const _elem = document.querySelector('#css-canvas-foreground');
			addClass(_elem, 'white-bg');
			cssAnimationProps.white = { start: _gameTick };
		}
	},
	criteffect: function () {
		if(__storyCutScenePlaying)
			return;
		if(cssAnimationProps.criteffect) {
			if((_gameTick - cssAnimationProps.criteffect.start) > 600) {
				const _elem = document.querySelector('#css-canvas-foreground');
				removeClass(_elem, 'critEffect');
				delete cssAnimationProps.criteffect;
			}
		}
		else {
			const _elem = document.querySelector('#css-canvas-foreground');
			addClass(_elem, 'critEffect');
			cssAnimationProps.criteffect = { start: _gameTick };
		}
	},
	curse: function (_c, _ms, _url) {
		if(cssAnimationProps.curse) {
			if((_gameTick - cssAnimationProps.curse.start) > (_ms ?? 1100)) {
				if (_url) {
					const _elem = document.getElementById('css-canvas-content');
					if(_elem)
						_elem.remove();
				}
				delete cssAnimationProps.curse;
			}
		}
		else {
			if (_url)
				_css.innerHTML = '<div id="css-canvas-content" style="opacity:.35;background:#000" class="full"><div class="full flex pop-outin"><img src="' + _url + '" style="max-width:80%;max-height:80%" /></div>';
			PlaySound({ key: 'curse', volume: .5 });
			cssAnimationProps.curse = { start: _gameTick, p1: _c, p2: _ms, p3: _url};
		}
	},
	shake: function (_c, _ms, _infinite) {
		if(cssAnimationProps.shake) {
			if((_gameTick - cssAnimationProps.shake.start) > (_ms ?? 1000)) {
				removeClass(_gamePad, 'shake-me');
				delete cssAnimationProps.shake;
			}
		}
		else {
			addClass(_gamePad, 'shake-me');
			cssAnimationProps.shake = { start: _gameTick, p1: _c, p2: _ms, p3: _infinite};
		}
	},
	shakevert: function (_c, _ms, _infinite) {
		if(cssAnimationProps.shakevert) {
			if((_gameTick - cssAnimationProps.shakevert.start) > (_ms ?? 1000)) {
				removeClass(_gamePad, 'shake-vert');
				delete cssAnimationProps.shakevert;
			}
		}
		else {
			addClass(_gamePad, 'shake-vert');
			cssAnimationProps.shakevert = { start: _gameTick, p1: _c, p2: _ms, p3: _infinite};
		}
	},
	shakevertical: function (_c, _ms, _infinite) {
		if(cssAnimationProps.film)
			return;
		if(cssAnimationProps.shakevertical) {
			if((_gameTick - cssAnimationProps.shakevertical.start) > (_ms ?? 1000)) {
				removeClass(_gamePad, 'shake-v');
				delete cssAnimationProps.shakevertical;
			}
		}
		else {
			addClass(_gamePad, 'shake-v');
			cssAnimationProps.shakevertical = { start: _gameTick, p1: _c, p2: _ms, p3: _infinite};
		}
	},
	shakeverticaltiny: function (_c, _ms, _infinite) {
		if(cssAnimationProps.film)
			return;
		if(cssAnimationProps.shakeverticaltiny) {
			if((_gameTick - cssAnimationProps.shakeverticaltiny.start) > (_ms ?? 1000)) {
				removeClass(_gamePad, 'shake-v-tiny');
				delete cssAnimationProps.shakeverticaltiny;
			}
		}
		else {
			addClass(_gamePad, 'shake-v-tiny');
			cssAnimationProps.shakeverticaltiny = { start: _gameTick, p1: _c, p2: _ms, p3: _infinite};
		}
	},
	shaketiny: function (_c, _ms, _infinite) {
		if(cssAnimationProps.shaketiny) {
			if((_gameTick - cssAnimationProps.shaketiny.start) > (_ms ?? 500)) {
				removeClass(_gamePad, 'shake-tiny');
				delete cssAnimationProps.shaketiny;
			}
		}
		else {
			addClass(_gamePad, 'shake-tiny');
			cssAnimationProps.shaketiny = { start: _gameTick, p1: _c, p2: _ms, p3: _infinite};
		}
	},
	air: function (_c, _ms) {
		if(cssAnimationProps.air) {
			if((_gameTick - cssAnimationProps.air.start) > cssAnimationProps.air.p2) {
				removeClass(_gamePad, 'air-combo');
				delete cssAnimationProps.air;
			}
		}
		else {
			addClass(_gamePad, 'air-combo');
			cssAnimationProps.air = { start: _gameTick, p1: _c, p2: 650};
		}
	},
	impact: function (_c, _ms) {
		if(cssAnimationProps.impact) {
			if((_gameTick - cssAnimationProps.impact.start) > (_ms ?? 1000)) {
				removeClass(_gamePad, 'charge-impact-left');
				removeClass(_gamePad, 'charge-impact-right');
				delete cssAnimationProps.impact;
			}
		}
		else {
			if(!_ms)
				_ms = 1000;
			addClass(_gamePad, 'charge-impact-' + _c.direction);
			cssAnimationProps.impact = { start: _gameTick, p1: _c, p2: _ms, p3: _c.direction };
		}
	},
	impactsmall: function (_c, _ms) {
		if(cssAnimationProps.impactsmall) {
			if((_gameTick - cssAnimationProps.impactsmall.start) > ( cssAnimationProps.impactsmall.p2 ?? 1000)) {
				removeClass(_gamePad, 'impact-left');
				removeClass(_gamePad, 'impact-right');
				removeClass(_gamePad, 'heavy-hitting');
				delete cssAnimationProps.impactsmall;
			}
		}
		else {
			if(!_ms)
				_ms = 1000;
			addClass(_gamePad, 'impact-' + _c.direction);
			addClass(_gamePad, 'heavy-hitting');
			cssAnimationProps.impactsmall = { start: _gameTick, p1: _c, p2: _ms, p3: _c.direction };
		}
	},
	fatality: function (_char, _l, _ms) {
		if(_char.frame === 0 && _char.start === 1 && cssAnimations.dark(_char, _ms ?? 3000))
			PlaySound({ key: mainCharacter.gender + 'laugh', reset: true, volume: .3 });
	},
	darkout: function(_ctx, _opacity, _cnvs) {
		if(cssAnimationProps.darkout) {
			_opacity -= 16;
			if(_opacity <= 0) {
				const fc = document.getElementById('filter-canvas');
				if(fc)
					fc.remove();
				delete cssAnimationProps.darkout;
				c9.style.opacity = 1;
				_canvasF.style.opacity = 1;
				_canvasBRB.style.opacity = 1;
				return;
			}
			const alpha = (_opacity / 100);
			if(_ctx?.clearRect && typeof _ctx.clearRect === 'function'){
				_ctx.clearRect(0, 0, episode.cUIWidth, episode.cUIHeight);
				//_ctx.filter = 'blur(' + _opacity + 'px)';
				_ctx.fillStyle = 'rgba(0,0,0,' + alpha + ')';
				_ctx.fillRect(0, 0, episode.cUIWidth, episode.cUIHeight);
			}
			cssAnimationProps.darkout.p2 = _opacity;
		}
		else
			cssAnimationProps.darkout = { start: _gameTick, p1: _ctx, p2: _opacity, p3: _cnvs};
	},
	dark: function (_char, _ms, _ctx, _opacity, _cnvs) {
		if (cssAnimationProps.dark) {
			var fc = document.getElementById('filter-canvas');
			if(!fc)
				return false;
			if (_ms > 0 && ((_gameTick - cssAnimationProps.dark.start) > _ms)) {
				delete cssAnimationProps.dark;
				cssAnimations.darkout(null, _opacity, fc);
				return false;
			}

			_opacity += 16;

			if (_opacity <= 80) {
				cssAnimationProps.dark.p4 = _opacity;
				const alpha = _opacity / 100;
				fc.style.background = `rgba(0,0,0,${alpha})`;
				c9.style.opacity = _canvasF.style.opacity = (1 - alpha) * 1.2;
				_canvasBRB.style.opacity = (1 - alpha) * .85;
			}

			return false;
		}
		else {
			var fc = document.getElementById('filter-canvas');

			if (!fc) {
				fc = document.createElement("div");
				fc.id = 'filter-canvas';

				fc.style.position = 'absolute';
				fc.style.left = '0';
				fc.style.top = '0';
				fc.style.width = '100%';
				fc.style.height = '100%';
				fc.style.background = 'rgba(0,0,0,0)';
				fc.style.pointerEvents = 'none';
				_css.appendChild(fc);
			}
			cssAnimationProps.dark = {
				start: _gameTick,
				p1: _char,
				p2: _ms ?? 1000,
				p3: null,
				p4: 0,
				p5: fc
			};
		}
		return true;
	},
	slowMotion: function (_char, _ms, _arg1, _arg2, _rate, _forceStep) {
		if ((fps < _defaultFPS || episode?.realTime) && !_forceStep)
			return;
		if(!cssAnimationProps.slowMotion || _forceStep){
			setFps(MathRound(_defaultFPS / (_rate ?? 2)), _forceStep);
			addClass(_css, 'dark-blur-canvas');
			if(!cssAnimationProps.slowMotion)
				cssAnimationProps.slowMotion = { start: _gameTick, p1: _char, p2: _ms, p5: _rate};
			else
			{
				cssAnimationProps.slowMotion.start = _gameTick;
				cssAnimationProps.slowMotion.p2 = _ms;
			}
		}
		else if((_gameTick - cssAnimationProps.slowMotion.start) > (_ms ?? 1000)) {
			removeClass(_css, 'dark-blur-canvas');
			delete cssAnimationProps.slowMotion;
		}
	},
	cast: function (_char) {
		if(episode?.pvp)
			return;
		const _id = "cast-" + _char.key;
		let _castContainer = _char.castContainer ?? document.getElementById(_id);
		if (_castContainer) 
			return;
		_char.relatedObjects?.forEach(x => { if (x.key === 'cast') x.remove = true; });
		const _anima = _char.getCurrentAnimation();
		let _totalSpeed = 0, _left = 0, _right = 0, _top = 0, _height = 0, _dir;
		for (var i = _char.frame; i < _anima.frames.length; i++) {
			const _frame = _anima.frames[i];
			if (!_frame.atk)
				_totalSpeed += _frame.speed;
			else {
				if (_frame.atk.aoe)
					_left = _right = MathRound(_frame.atk.aoe * _char.ZOOM * 1.2);
				else if (_anima.totalRange) {
					_dir = _char.direction;
					if (_char.direction === __left)
						_left = MathRound(episode.cUIWidth * ((_anima.totalRange + 5) / 100));
					else
						_right = MathRound(episode.cUIWidth * ((_anima.totalRange + 5) / 100));
				}
				else
					return;
				_height = MathRound(((episode.cHeight * (2 * (_frame.atk.yRange ?? 5))) / 100));
				break;
			}
		}
		_totalSpeed *= __globalMS;
		const _wrapper = document.createElement('div');
		_wrapper.className = 'perspective';
		_wrapper.id = 'w' + _id;
		_castContainer = document.createElement('div');
		_castContainer.className = 'cast-wrapper full flex';
		if (_dir === __left)
			_castContainer.className += ' flex-jc-end';
		else if (_dir === __right)
			_castContainer.className += ' flex-jc-start';
		else
			_castContainer.className += ' circle';
		_wrapper.platformX = (platformX * __scale);
		_castContainer.id = _id;
		_wrapper.animation = _char.animation;
		const _innerCast = document.createElement('div');
		_innerCast.className = 'cast';
		_innerCast.style.setProperty('animation', 'cast ' + _totalSpeed + 'ms linear');
		_innerCast.style.setProperty('-webkit-animation', 'cast ' + _totalSpeed + 'ms linear');
		_castContainer.appendChild(_innerCast);
		const _centerX = (_char.SCREENLEFT - _left);
		const _centerY = (_char.yPosition + MathRound((_char.yGap ?? 0) / 2));
		_wrapper.leftPosition = _centerX;
		_wrapper.style.left = ((_centerX - MathRound(_char.WIDTH / 2)) * __scale) + 'px';
		_wrapper.style.bottom = ((_centerY - ((_height) / 2)) * __scale) + 'px';
		_wrapper.style.width = ((_right + _char.WIDTH + _left) * __scale) + 'px';
		_wrapper.style.height = (_height * __scale) + 'px';
		_wrapper.appendChild(_castContainer);
		_css.appendChild(_wrapper);
		_char.casting = true;
		_wrapper.char = _char;
		_innerCast.onanimationend = function(_e) {
			if(_e.animationName === 'cast')
			{
				_wrapper.char.casting = false;
				_wrapper.remove();
			}
		}
	},
	ultimateCircle: function (_char, _l, _t, _w) {
		return;
		if(cssAnimationProps.ultimateCircle) {
			if((_gameTick - cssAnimationProps.ultimateCircle.start) > 10999) {
				removeClass(_gamePad, 'ultimate-me');
				delete cssAnimationProps.ultimateCircle;
				removeUltimateCircle();
			}
		}
		else {
			PlaySound({key:'ultimate', volume: .5});
			const _key = 'ultimate-circle';
			let _a = document.getElementById(_key);
			if (!_a) {
				_a = document.createElement('div');
				_a.id = _key;
				_a.style.border = '.5vh solid ' + (_char.color ?? '#f7f7f7');
				_css.appendChild(_a);
			}
			addClass(_a, 'circle-started');
			_a.style.width = _w + 'px';
			_a.style.left = _l + 'px';
			_a.style.top = _t + 'px';
			_a.style.height = _w + 'px';
			addClass(_gamePad, 'ultimate-me');
			cssAnimationProps.ultimateCircle = { start: _gameTick };
		}
		// return;
		// const _key = 'ultimate-circle';
		// let _a = document.getElementById(_key);
		// if (!_a) {
		// 	_a = document.createElement('div');
		// 	_a.id = _key;
		// 	_a.style.border = '.5vh solid ' + (_char.color ?? '#f7f7f7');
		// 	_a.style.boxShadow = 'inset 0 0 2vh ' + (_char.color ?? '#f7f7f7');
		// 	_css.appendChild(_a);
		// }
		// else if (hasClass(_a, 'circle-started'))
		// 	return;
		// addClass(_a, 'circle-started');
		// _a.style.width = _w + 'px';
		// _a.style.left = _l + 'px';
		// _a.style.top = _t + 'px';
		// _a.style.height = _w + 'px';
		// setTimeout(function () {
		// 	// const _glow = (_canvas.height * 2.25) * 2;
		// 	// const _R = _glow + Math.sqrt(Math.pow(_canvas.width, 2) + Math.pow(_canvas.height, 2));
		// 	// _a.style.width = _R + 'px';
		// 	// _a.style.left = (-1 * (_R - _canvas.width) / 2) + 'px';
		// 	// _a.style.top = (-1 * (_R - _canvas.height) / 2) + 'px';
		// 	// _a.style.height = _R + 'px';
		// 	flash(2, _a);
		// }, 20);
	},
	filmout: function(_char, _ms, _endFunc) {
		let _left,_width,_height,x,y;
		if(_char){
			_left = _char.SCREENLEFT;
			_width = _char.WIDTH;
			_height = _char.HEIGHT;
			x = MathRound(_left + (_width / 2));
			y = MathRound(episode.cUIHeight - _char.yPosition - (_height / 2));
		}
		if(cssAnimationProps.filmout) {
			if(x !== undefined)
				_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			if((_gameTick - cssAnimationProps.filmout.start) > (_ms ?? 2000)) {
				const _top = document.querySelector('.film-top');
				if(_top)
					_top.remove();
				const _bottom = document.querySelector('.film-bottom');
				if(_bottom)
					_bottom.remove();
				removeClass(_gameUI, 'disable-ui');
				removeClass(_gamePad, 'film-zoom-out');
				removeClass(_gamePad, 'film-zoom-in');
				_gamePad.style.transformOrigin = 'unset';
				if(cssAnimationProps.filmout.p3)
					cssAnimationProps.filmout.p3();
				delete cssAnimationProps.filmout;
			}
		}
		else {
			//const _top = document.querySelector('.film-top');
			//removeClass(_top, 'film-zoom-in');
			//addClass(_top, 'film-zoom-out');
			//const _bottom = document.querySelector('.film-bottom');
			//removeClass(_bottom, 'film-zoom-in');
			//addClass(_bottom, 'film-zoom-out');
			if(_char)
				addClass(_gamePad, 'film-zoom-out');
			if(x !== undefined)
				_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			const _parts = document.querySelectorAll('.film-part.show');
			for(let _p of _parts) {
				removeClass(_p, 'show');
				addClass(_p, 'hide');
			}
			const _filmSkip = document.querySelector('.film-skip');
			if(_filmSkip)
				_filmSkip.remove();
			cssAnimationProps.filmout = { start: _gameTick, p1: _char, p2: _ms, p3: _endFunc};
		}
	},
	film: function(_char, _array, _ms, _endFunc, _skip) {
		if(cssAnimationProps.film) {
			// if(_opacity <= 0) {
			// 	removeClass(_gameUI, 'd-none');
			// 	return;
			// }
			const _items = _array.filter(x => !x.done && ((_gameTick - cssAnimationProps.film.start) > x.ms));
			const _item = _items?.[0] ? _items[_items.length - 1] : undefined;
			if(_item) {
				_item.done = 1;
				cssAnimationProps.film.p2 = _array;
				_item.do();
			}
			if((_gameTick - cssAnimationProps.film.start) > (_ms ?? 5000)) {
				//addClass(_gamePad, 'film-zoom-out');
				cssAnimations.filmout(_char, 2000, cssAnimationProps.film.p4);
				delete cssAnimationProps.film;
			}
		}
		else {
			const _top = document.createElement('div');
			_top.className = 'film-part film-top show';
			const _bottom = document.createElement('div');
			_bottom.className = 'film-part film-bottom show';
			if(_skip && __account.storyResults?.find(x => x.id === __story.id)) {
				const _skipBtn = document.createElement('div');
				_bottom.onanimationend = function(e) {
					if(e.animationName === 'film-start')
						_bottom.appendChild(_skipBtn);
				}
				_bottom.className += ' flex flex-jc-end';
				_skipBtn.onexactclick = function () {
					_skip();
					episode.removeBubbles();
					_skipBtn.remove();
					if(cssAnimationProps.film)
						cssAnimationProps.film.p3 = 0;
				}
				_skipBtn.className = 'film-skip flex fade-me';
				_skipBtn.innerHTML = getLangData('SKIP') + '&gt;';
			}
			document.documentElement.appendChild(_top);
			document.documentElement.appendChild(_bottom);
			addClass(_gameUI, 'disable-ui');
			const _dPad = document.getElementById('touch-d-pad-inner');
			if(_dPad) {
				addClass(_dPad, 'stay');
				resetDPadKeyCommands();
			}
			if(_char)
				cssAnimations.zoom(_char, 0, _ms, null, 1);
			cssAnimationProps.film = { start: _gameTick, p1: _char, p2: _array, p3: _ms, p4: _endFunc, p5: _skip};
		}
	},
	zoom: function (_char, _rate, _ms, _group, _force) {
		if(!_char.main && !_force)
			return;
		const _left = _char.SCREENLEFT;
		const _width = _char.WIDTH;
		const _height = _char.HEIGHT;
		const x = MathRound(_left + (_width / 2));
		const y = MathRound(episode.cUIHeight - _char.yPosition - (_height / 2));
		if(!cssAnimationProps.zoom){
			if(_char.getFps() !== 1 && !_force)
				return;
			if(_gamePad.lastZoomTime && ((_gameTick - _gamePad.lastZoomTime) < 5000) && !_force){
				if(_group)
					_gamePad.lastZoomTime = _gameTick;
				return;
			}
			addClass(_gamePad, _force ? 'film-zoom-in' : 'zoom');
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			_gamePad.lastZoomTime = _gameTick;
			cssAnimationProps.zoom = { start: _gameTick, p1: _char, p2: _rate, p3: _ms, p4: _group, p5: _force };
		}
		else {
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			if(cssAnimationProps.zoom.p4)
				_gamePad.lastZoomTime = _gameTick;
			if((_gameTick - cssAnimationProps.zoom.start) > (_ms ?? 2000)) {
				removeClass(_gamePad, 'zoom');
				if(!_force)
					_gamePad.style.transformOrigin = 'unset';
				delete cssAnimationProps.zoom;
			}
		}
	},
	zoom2x: function (_char, _rate, _ms) {
		if(!_char)
			return;
		const _left = _char.SCREENLEFT;
		const _width = _char.WIDTH;
		const _height = _char.HEIGHT;
		const x = MathRound(_left + (_width / 2));
		const y = MathRound(episode.cUIHeight - _char.yPosition - (_height / 2));
		if(!cssAnimationProps.zoom2x){
			addClass(_gamePad, 'zoom2x');
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			_gamePad.style.setProperty('--zoom-duration', (_ms ?? 2000) + 'ms');
			_gamePad.style.setProperty('--zoom-2x', (_rate ?? 2));
			cssAnimationProps.zoom2x = { start: _gameTick, p1: _char, p2: _rate, p3: _ms };
		}
		else {
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			if(__switchingMap || (_gameTick - cssAnimationProps.zoom2x.start) > (_ms ?? 2000)) {
				removeClass(_gamePad, 'zoom2x');
				_gamePad.style.transformOrigin = 'unset';
				delete cssAnimationProps.zoom2x;
			}
		}
	},
	zoomquick: function (_char) {
		if(!_char.main || __storyCutScenePlaying)
			return;
		const _left = _char.SCREENLEFT;
		const _width = _char.WIDTH;
		const _height = _char.HEIGHT;
		const x = MathRound(_left + (_width / 2));
		const y = MathRound(episode.cUIHeight - _char.yPosition - (_height / 2));
		if(!cssAnimationProps.zoomquick){
			if(_char.getFps() !== 1)
				return;
			addClass(_gamePad, 'camera');
			addClass(_gamePad, 'heavy-hitting');
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			cssAnimationProps.zoomquick = { start: _gameTick, p1: _char };
		}
		else {
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			if((_gameTick - cssAnimationProps.zoomquick.start) < 80)
				return;
			removeClass(_gamePad, 'camera');
			removeClass(_gamePad, 'heavy-hitting');
			_gamePad.style.transformOrigin = 'unset';
			delete cssAnimationProps.zoomquick;
		}
	},
	zoomquickred: function (_char) {
		if(__storyCutScenePlaying)
			return;
		const _left = _char.SCREENLEFT;
		const _width = _char.WIDTH;
		const _height = _char.HEIGHT;
		const x = MathRound(_left + (_width / 2));
		const y = MathRound(episode.cUIHeight - _char.yPosition - (_height / 2));
		if(!cssAnimationProps.zoomquickred){
			addClass(_gamePad, 'camera-red');
			addClass(_gamePad, 'heavy-hitting');
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			cssAnimationProps.zoomquickred = { start: _gameTick, p1: _char };
		}
		else {
			_gamePad.style.transformOrigin = x + 'px ' + y + 'px';
			if((_gameTick - cssAnimationProps.zoomquickred.start) < 110)
				return;
			removeClass(_gamePad, 'camera-red');
			removeClass(_gamePad, 'heavy-hitting');
			_gamePad.style.transformOrigin = 'unset';
			delete cssAnimationProps.zoomquickred;
		}
	},
	bombshock: function (_char) {
		if(__storyCutScenePlaying)
			return;
		if(!cssAnimationProps.bombshock){
			addClass(_gamePad, 'bombshock');
			addClass(_gamePad, 'heavy-hitting');
			cssAnimationProps.bombshock = { start: _gameTick };
		}
		else {
			if((_gameTick - cssAnimationProps.bombshock.start) < 180)
				return;
			removeClass(_gamePad, 'bombshock');
			removeClass(_gamePad, 'heavy-hitting');
			delete cssAnimationProps.bombshock;
		}
	},
	smallexplosion: function (_char) {
		if(__storyCutScenePlaying)
			return;
		if(!cssAnimationProps.smallexplosion){
			addClass(_gamePad, 'small-explosion');
			addClass(_gamePad, 'heavy-hitting');
			cssAnimationProps.smallexplosion = { start: _gameTick };
		}
		else {
			if((_gameTick - cssAnimationProps.smallexplosion.start) < 180)
				return;
			removeClass(_gamePad, 'small-explosion');
			removeClass(_gamePad, 'heavy-hitting');
			delete cssAnimationProps.smallexplosion;
		}
	},	
	combofinisherimpact: function (_char) {
		if(!cssAnimationProps.combofinisherimpact){
			addClass(_gamePad, 'combo-finisher-impact');
			addClass(_gamePad, 'heavy-hitting');
			cssAnimationProps.combofinisherimpact = { start: _gameTick };
		}
		else {
			if((_gameTick - cssAnimationProps.combofinisherimpact.start) < 180)
				return;
			removeClass(_gamePad, 'combo-finisher-impact');
			removeClass(_gamePad, 'heavy-hitting');
			delete cssAnimationProps.combofinisherimpact;
		}
	},
	impactdizzy: function (_char, strength = 2) {
		if(__storyCutScenePlaying)
			return;
		if (!cssAnimationProps.impactdizzy) {

			// Strength preset seçimi
			let sClass = (
				strength <= 1 ? 'dizzy-light' :
				strength <= 2 ? 'dizzy-medium' :
								'dizzy-heavy'
			);

			// 🎲 Mikro random hissiyat
			let randX = (0.7 + Math.random() * 0.6).toFixed(2); // 0.7 - 1.3
			if(_char.direction === __left)
				randX *= -1;
			let randY = (0.7 + Math.random() * 0.6).toFixed(2);
			let randTime = (0.20 + Math.random() * 0.12).toFixed(3); // 0.20 - 0.32

			_gamePad.style.setProperty('--ix', randX + 'vw');
			_gamePad.style.setProperty('--iy', randY + 'vh');
			_gamePad.style.setProperty('--impact-time', randTime + 's');

			addClass(_gamePad, 'impact-dizzy');
			addClass(_gamePad, 'heavy-hitting');
			addClass(_gamePad, sClass);

			cssAnimationProps.impactdizzy = {
				start: _gameTick,
				p2: sClass
			};
		}
		else {

			if ((_gameTick - cssAnimationProps.impactdizzy.start) < 320)
				return;

			removeClass(_gamePad, 'impact-dizzy');
			removeClass(_gamePad, 'heavy-hitting');
			removeClass(_gamePad, cssAnimationProps.impactdizzy.sClass);

			delete cssAnimationProps.impactdizzy;
		}
	},
	forceimpact: function(_char, dirX) {
		let _mainRelated = _char.main || _char.related?.main || _char.owner?.main || _char.smasher?.main || _char.smasher?.related?.main 
		|| _char.friendly || _char.related?.friendly || _char.owner?.friendly || _char.smasher?.friendly || _char.smasher?.related?.friendly
		|| _char.tag || _char.related?.tag || _char.owner?.tag || _char.smasher?.tag || _char.smasher?.related?.tag;
		if(_mainRelated) {
			const _isSpell = _char.smasher?.spellKey;
			if(_isSpell) {
				const _isCommon = commonSkills.find(x => x.key === _isSpell);
				if(_isCommon)
					_mainRelated = false;
			}
		}
		if(_mainRelated)
		{
			cssAnimations.smallexplosion(_char.attacker);
			return false;
		}
		delete cssAnimationProps.zoomdynamic;
		_gamePad.classList.remove(
			"zoomdynamic-light-right",
			"zoomdynamic-light-left",
			"zoomdynamic-medium-right",
			"zoomdynamic-medium-left",
			"zoomdynamic-heavy-right",
			"zoomdynamic-heavy-left",
			'charge-impact-left',
			'charge-impact-right',
			'impact-left',
			'impact-right'
		);
		delete cssAnimationProps.impact;
		cssAnimations.impact(_char,null,dirX);
		return true;
	},
	zoomdynamic: function (_char, dirX, strength) {
		if(hasClass(_gamePad, 'heavy-hitting') || __storyCutScenePlaying)
        	return;
		if (!cssAnimationProps.zoomdynamic) {

			// --- AAA RANDOM MOTION LAYERS ---
			const micro = (Math.random() * 0.006 - 0.003);   // -0.003vw ~ +0.003vw
			const delay = (Math.random() * 0.020);           // 0 ~ 20ms

			_gamePad.style.setProperty('--shiftX', micro + 'vw');
			//_gamePad.style.animationDelay = delay + 's';
			// ---------------------------------

			let cls =
			(strength <= 1 ? "zoomdynamic-light" :
			strength <= 2 ? "zoomdynamic-medium" :
							"zoomdynamic-heavy");

			cls += (dirX === __right ? "-right" : "-left");
			_gamePad.classList.add(cls);

			cssAnimationProps.zoomdynamic = {
				start: _gameTick,
				p1: delay * 1000
			};
		}
		else {

			if (_gameTick - cssAnimationProps.zoomdynamic.start < (200 + cssAnimationProps.zoomdynamic.p1))
				return;

			if (_gameTick - cssAnimationProps.zoomdynamic.start > 400)
				delete cssAnimationProps.zoomdynamic;
			else {
				_gamePad.classList.remove(
					"zoomdynamic-light-right",
					"zoomdynamic-light-left",
					"zoomdynamic-medium-right",
					"zoomdynamic-medium-left",
					"zoomdynamic-heavy-right",
					"zoomdynamic-heavy-left"
				);
			}
		}
		// if(hasClass(_gamePad, 'camera'))
		// 	return;
		// if (!cssAnimationProps.zoomdynamic) {
		// 	let cls =
		// 	(strength <= 1 ? "zoomdynamic-light" :
		// 	strength <= 2 ? "zoomdynamic-medium" :
		// 					"zoomdynamic-heavy");

    	// 	cls += (dirX === __right ? "-right" : "-left");

		// 	_gamePad.classList.add(cls);
		// 	cssAnimationProps.zoomdynamic = {
		// 		start: _gameTick
		// 	};
		// }
		// else {

		// 	if (_gameTick - cssAnimationProps.zoomdynamic.start < 180)
		// 		return;


		// 	if (_gameTick - cssAnimationProps.zoomdynamic.start > 1000)
		// 		delete cssAnimationProps.zoomdynamic;
		// 	else
		// 		_gamePad.classList.remove(
		// 			"zoomdynamic-light-right",
		// 			"zoomdynamic-light-left",
		// 			"zoomdynamic-medium-right",
		// 			"zoomdynamic-medium-left",
		// 			"zoomdynamic-heavy-right",
		// 			"zoomdynamic-heavy-left"
		// 		);
		// }
	},
	lightradius: function(_char, _rate, _root) {
		let _left = _char.SCREENLEFT;
		const _h = MathRound(_char.height * _char.ZOOM);
		const _width = MathRound(_char.width * _char.ZOOM * _rate);
		const _height = _width;
		_left -= MathRound(_width / 2);
		const _top = MathRound(episode.cUIHeight - (_char.yPosition + (_h / 2) + (_height / 2)));

		if(!cssAnimationProps.lightradius){
			const _elem = document.querySelector('#css-canvas-foreground');
			addClass(_elem, 'light-radius');
			_gamePad.lastZoomTime = _gameTick;
			_root = document.querySelector(':root');
			_root.style.setProperty('--light-radius-width', _width + "px");
			cssAnimationProps.lightradius = { start: _gameTick, p1: _char, p2: _rate, p3: _root };
		}
		_root.style.setProperty('--light-radius-left', _left + "px");
		_root.style.setProperty('--light-radius-top', _top + "px");
	},
	lightradius2: function(_char, _rate, _ctx, _force) {
		if(!_char.main && !_force)
			return;
		let _left = _char.SCREENLEFT  * __scale;
		const _h = (_char.height ? MathRound(_char.height * _char.ZOOM) : _char.HEIGHT);
		const _hwg = (_char.height ? MathRound(_char.height * _char.ZOOM) : _char.getHeightWithoutGap());
		const _width = (_char.width ? MathRound(_char.width * _char.ZOOM * _rate) : _char.WIDTH) * __scale;
		let _top = MathRound(episode.cHeight - _h - (_char.yPosition - (_hwg / 2))) * __scale;
		//_top += MathRound(_width / 2);
		if(!cssAnimationProps.lightradius2){
			_gamePad.lastZoomTime = _gameTick;
			cssAnimationProps.lightradius2 = { start: _gameTick, p1: _char, p2: _rate };
		}
		if(_char.main) {
			ligthenGradient(_left, _top, _width, episode.lightradius2.ctx);
			const _spells = episode.activeSpells;
			for(let i = 0; i < _spells.length; i++) {
				const _spell = _spells[i];
				if((_spell.owner ?? _spell.related)?.main) {
					if(_spell._lightTick !== _gameTick) {
						_spell._lightTick = _gameTick;
						cssAnimations.lightradius2(_spell, 
							(cssAnimationProps.lightradius2.p2 ?? _rate) / 2, episode.lightradius2.ctx, 1);
					}
				}
			}
		}
		else{
			ligthenGradientColored(_left, _top, _width, episode.lightradius2.ctx, 
			adjustColorForIntensity(_char.lightColor ?? '#0000FF10', __maxFreqCount));
		}
	},
	lightradius3: function(_char, _rate) {
		if(!cssAnimationProps.lightradius3){
			_gamePad.lastZoomTime = _gameTick;
			cssAnimationProps.lightradius3 = { start: _gameTick, p1: _char, p2: _rate };
		}
		const _canv = episode.lightradius2.ctx.canvas;
		episode.lightradius2.ctx.clearRect(0, 0, _canv.width, _canv.height);
		//ligthenGradient(_left, _top, _width, episode.lightradius2.ctx); 
		for(let _spl of episode.activeSpells)
			if(_spl.lightColor){
				let _left = (_spl.SCREENLEFT + _spl.ORIGINDIST)  * __scale;
				const _h = (_spl.height ? MathRound(_spl.height * _spl.ZOOM) : _spl.HEIGHT);
				const _hwg = (_spl.height ? MathRound(_spl.height * _spl.ZOOM) : _spl.getHeightWithoutGap());
				const _width = (_spl.width ? MathRound(_spl.width * _spl.ZOOM * _rate) : _spl.WIDTH) * __scale;
				let _top = MathRound(episode.cHeight - _h - (_spl.yPosition - (_hwg / 2))) * __scale;
				ligthenGradientColored2(_left, _top, _width, episode.lightradius2.ctx, 
				adjustColorForIntensity(_spl.lightColor, __maxFreqCount));
			}
	}
}

const __maxFreqCount = 3;
function adjustColorForIntensity(hex, yogunluk) {
    // #RRGGBBAA
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    let a = parseInt(hex.substring(7, 9), 16) / 255;

    // Normalizasyon faktörü
    const f = 1 / Math.sqrt((yogunluk - 1 / 2));

    r = Math.round(r * f);
    g = Math.round(g * f);
    b = Math.round(b * f);
    a = a * f;

    const rr = r.toString(16).padStart(2, '0');
    const gg = g.toString(16).padStart(2, '0');
    const bb = b.toString(16).padStart(2, '0');
    const aa = Math.round(a * 255).toString(16).padStart(2, '0');

    return `#${rr}${gg}${bb}${aa}`;
}
function ligthenGradient(x, y, radius, ctx) {
	const _c = ctx.canvas;
	ctx.clearRect(0, 0, _c.width, _c.height);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var rnd = .01 * Math.sin(1.1 * Date.now() / 1000);
    radius = MathRound(radius * (1 + rnd) * 5);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, 'transparent');
    radialGradient.addColorStop(0.2 + rnd, '#00000080');
    radialGradient.addColorStop(0.7 + rnd, '#000');
    radialGradient.addColorStop(1, '#000');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
function ligthenGradientColored(x, y, radius, ctx, _color, _canvasMode) {
    ctx.save();
    ctx.globalCompositeOperation = _canvasMode ?? 'xor';
    radius = MathRound(radius * 1.1);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#FFFFFF40');
    radialGradient.addColorStop(0.7, _color ? _color : '#FF000010');
    radialGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
function ligthenGradientColored2(x, y, radius, ctx, _color) {
    radius = MathRound(radius * 1.1);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#FFFFFF40');
    radialGradient.addColorStop(0.7, _color ? _color : '#FF000010');
    radialGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
async function PlaySound(_s, _alternateKeys, _volumeRate) {
	const _hidden = !__account.options.sound || episode?.hasSkippableScreen || episodeVisibilityHidden || __batterySaveMode;
	const _hasEnd = _s.end;
	if((_hidden && !_hasEnd) || (_s?.force ? false : __switchingMap))
			return undefined;
	let _soundKey = _s.key;
	if (_alternateKeys && !soundFiles[_soundKey])
		for (var _ak of _alternateKeys) {
			if(!_ak)
				continue;
			if(_ak.indexOf && _ak.indexOf(',') !== -1) {
				var _choices = _ak.split(',');
				let _chosen = getRandomValue(0, _choices.length - 1);
				if(soundFiles[_choices[_chosen]]) {
					_soundKey = _choices[_chosen];
					break;
				}
			}
			else if (soundFiles[_ak]) {
				_soundKey = _ak;
				break;
			}
		}
	if(_soundKey && _soundKey.indexOf(',') !== -1) {
		var _keys = _soundKey.split(',');
		_soundKey = _keys[getRandomValue(0, _keys.length - 1)];
	}
	try {
		if (!soundFiles[_soundKey] && _alternateKeys?.[0]?.indexOf && _alternateKeys[0].indexOf(',') >= 0)
		{
			var _keys = _alternateKeys[0].split(',');
			_soundKey = _keys[getRandomValue(0, _keys.length - 1)];
		}
	}
	catch(cex) {
		console.log(_alternateKeys);
	}
	return await window.SoundManager.play(_soundKey, _s.path, (_hasEnd && _hidden) ? 0 : (_s.volume ?? .1) * (_s.volumeRate ?? 1), _s.loop, _s.rate, _s.reset, _s.force, _s.end, _s.bind);
}
function flash(_count, _elem) {
	setTimeout(function () {
		addClass(_elem, 'flash');
		setTimeout(function () {
			removeClass(_elem, 'flash');
			_count--;
			if (_count > 0)
				flash(_count, _elem);
			//else
				//removeClass(_elem, 'circle-started');
		}, 200);
	}, 200);
}
function stopWeatherEffect() {
	switch(__weather.status) {
		case 'rainy':
			stopRain();
			break;
		case 'snowy': 
			endSnow();
			break;
		case 'autumn':
			stopAutumn();
			break;
		case 'quake':
			stopQuake();
			break;
	}
}
const _autumnColors = [ '#c62c11', '#c1220c', '#b01805', '#9a1703',
	'#8b7355', '#cd853f', '#a0522d', '#c9ae5d', '#deb887',
   '#4a6741', '#3f5a36', '#374f2f', '#304529', '#22311d'];
function startAutumn(_force) {
	if(!__account.options.weather && !_force)
		return;
	if(__weather.status)
		stopWeather();
	__weather.status = 'autumn';
	dropLeaves();
}
function dropLeaves(_limit) {
	var _canv = document.getElementById('css-canvas');
	for(let i = 0; i < 6; i++) {
		const _container = document.createElement('div');
		_container.className = 'leaf-wrapper';
		const _leaf = document.createElement('img');
		_leaf.className = 'leaf';
		_leaf.number = i + 1;
		createLeaf(_leaf, _container, _limit);
		_container.appendChild(_leaf);
		_canv.appendChild(_container);
	}
}
function startAutumn2(_force) {
	if(!__account.options.weather && !_force)
		return;
	if(__weather.status)
		stopWeather();
	__weather.status = 'autumn';
	dropLeaves(4);
}
function stopAutumn() {
	//if (__weather.status === 'autumn'){
		const _leaves = document.querySelectorAll('img.leaf');
		if(_leaves?.[0])
			_leaves.forEach(x => x.remove());
	//}
}
function startQuake(_force, _noRock) {
	if (__weather.status !== 'quake'){
		if(__weather.status)
			stopWeather();
		__weather.status = 'quake';
		addClass(_gamePad, 'shake-horizontal-infinite');
	}
	if(_noRock)
		return;
	var _canv = document.getElementById('css-canvas');
	const _container = document.createElement('div');
	_container.className = 'rock-wrapper';
	const _rock = document.createElement('img');
	_rock.className = 'rock';
	createRock(_rock, _container);
	_container.appendChild(_rock);
	_canv.appendChild(_container);
}
function stopQuake() {
	//if (__weather.status === 'quake') {
		removeClass(_gamePad, 'shake-horizontal-infinite');
		const _rocks = document.querySelectorAll('img.rock');
		if(_rocks?.[0])
			_rocks.forEach(x => x.remove());
	//}
}
function createRock(_rock, _container) {
	var _l = getRandomValue(10, 90);
	var _h = getRandomValue(10, 60) / 10;
	_rock.src = './images/texture/rock.png';
	_rock.style.filter = 'brightness(' + (getRandomValue(75, 100) / 100) + ')';
	_rock.style.height = _h + 'vh';
	_rock.style.transform = 'scale(' + getRandomValue(0, 360) + 'deg)';
	//_rock.style.borderRadius = (_w * .85) + 'vh ' + (_w / 10) + 'vh ' + (_w * 1.25) + 'vh ' + (_w / 10) + 'vh';
	//_rock.style.boxShadow = 'inset 0 0 ' + (_w / 4) + 'vh #222';
	_container.style.left = _l.toString() + '%';
	_rock.startPlatformX = platformX;
	_container.style.top = '-10vh';
	// let _br = 15;
	// for(var i = 1; i <= 4; i++)
	// 	removeClass(_leaf, 'leaf' + (_br + (i * 30)));
	// addClass(_leaf, 'leaf' + (_br + (getRandomValue(1, 4) * 30)));
	//_container.style.width = _leaf.style.width = _w + 'vh';
	if(episode){
		PlaySound({key:'rockfallsmall', volume:.1});
		episode.doTime = _gameTick;
		episode.repeat = getRandomValue(250, 2000);
	}
	_container.style.animation = 'fall-heavy ' + (.5 + (.3 - ((_h - 1) * .05))) + 's ease-in';
	_container.style.transform = 'translate3d(0,0,0)';
	_container.style.setProperty('-webkit-transform', _container.style.transform);
	_container.onanimationend = function() {
		this.remove();
	}
}
function createLeaf(_leaf, _container, _limit) {
	var _h = getRandomValue2(150, 250) / 60;
	var _l = getRandomValue2(0, 200);
	_leaf.src = './images/texture/leaf' + getRandomValue2(1, _limit ?? 5) + '.png';
	_container.style.height = _leaf.style.height = _h + 'vh';
	//_leaf.style.borderRadius = (_w * .85) + 'vh ' + (_w / 10) + 'vh ' + (_w * 1.25) + 'vh ' + (_w / 10) + 'vh';
	//_leaf.style.boxShadow = 'inset 0 0 ' + (_w / 4) + 'vh #222';
	_container.style.left = _l + 'vh';
	_leaf.startPlatformX = platformX;
	_container.style.top = _limit ? -getRandomValue2(3, 6) + 'vh' : -getRandomValue2(10, 30) + 'vh';
	// let _br = 15;
	// for(var i = 1; i <= 4; i++)
	// 	removeClass(_leaf, 'leaf' + (_br + (i * 30)));
	// addClass(_leaf, 'leaf' + (_br + (getRandomValue(1, 4) * 30)));
	//_container.style.width = _leaf.style.width = _w + 'vh';
	const _time = getRandomValue2(9, 12);
	const _delay = _limit ? getRandomValue2(1, 3) : getRandomValue2(4, 12);
	_leaf.fallingTime = (_time + _delay) * 1000;
	_leaf.fallingStart = _gameTick;
	//_leaf.style.background = 'linear-gradient(to bottom left, ' + _autumnColors[getRandomValue(0,_autumnColors.length - 1)] + ', ' + _autumnColors[getRandomValue(0, _autumnColors.length - 1)] + ')';
	_leaf.style.animation = 'none';
	_leaf.offsetHeight; /* trigger reflow */
	_leaf.style.animation = null; 
	_leaf.style.marginLeft = getRandomValue2(30, 60) + 'vh';
	_leaf.style.animation = 'fall' + getRandomValue2(1,4) + ' ' + _time + 's ease-in ' + _delay + 's';
	_container.style.transform = 'translate3d(0,0,0)';
	_container.style.setProperty('-webkit-transform', _container.style.transform);
}
function rain(_container, _noSound, _force) {
	if(!__account.options.weather && !_force)
		return;
	if (__weather.status === 'rainy')
		return;
	else if(__weather.status)
		stopWeather();
	__weather.status = 'rainy';
	//const _rain = document.createElement('div');
	//_rain.className = 'rain';
	//(_container ?? document.getElementById('game-pad')).appendChild(_rain);
	dancingInTheRain(_container);
	if(!_noSound) {
		__weather.sound = getSound(null, 'rain');
		__weather.sound.volume = 1;
		__weather.sound.loop = true;
		__weather.sound.play();
	}
}
function stopWeather() {
	if(__weather.sound)
		__weather.sound.pause();
	stopWeatherEffect();
	__weather = {};
}
function stopRain() {
	//if (__weather.status === 'rainy'){
		const _rain = document.querySelector('.rain');
		if(_rain)
			_rain.remove();
		const _cc = document.querySelector('.rrain');
		if(_cc)
			_cc.remove();
	//}
}
function isAudioPlaying(_audio) {
	return _audio
		&& _audio.currentTime > 0
		&& !_audio.paused
		&& !_audio.ended
		&& _audio.readyState > 2;
}
function daysInThisMonth() {
  const atm = new Date();
  return new Date(atm.getFullYear(), atm.getMonth()+1, 0).getDate();
}
function convertTimespanToTime(_diff) {
	_diff = 600000 - _diff;
	let _sec = parseInt(_diff / 1000);
	let _txt = '(';
	if(_sec < 60)
		_txt += '00:' + (_sec < 10 ? '0' + _sec.toString() : _sec.toString()) + ')';
	else
	{
		const _min = parseInt(_sec / 60);
		_sec -= (_min * 60);
		_txt += (_min < 10 ? '0' + _min.toString() : _min.toString()) + ':' +
			(_sec < 10 ? '0' + _sec.toString() : _sec.toString()) + ')';
	}
	return _txt;
}
function getNextResetTime() {
    const _now = new Date();
    const _hour = _now.getHours();
	if(_hour >= __dailyResetHour) {
		const _ms = _now.getTime();
		_now.setTime(_ms + (24 * 60 * 60 * 1000));
	}
	_now.setHours(__dailyResetHour);
	_now.setMinutes(0);
	return _now;
}
function getCurrentResetTime() {
    const _now = new Date();
    const _hour = _now.getHours();
	if(_hour < __dailyResetHour) {
		const _ms = _now.getTime();
		_now.setTime(_ms - (24 * 60 * 60 * 1000));
	}
	_now.setHours(__dailyResetHour);
	_now.setMinutes(0);
	return _now;
}
function getTodayResetTimestamp() {
  const now = new Date();

  // Türkiye sabit UTC+3
  const tzOffsetHours = 3;

  // Bugünün UTC tarihini al
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  // Türkiye saati 12:00 = UTC 09:00
  const resetUTC = Date.UTC(year, month, day, 12 - tzOffsetHours, 0, 0, 0);

  return resetUTC; // milisaniye epoch
}

function getTimeDiffUntilReset() {
	const _date = new Date();
    const _now = new Date();
    const _ms = _date.getTime();
    _date.setTime(_ms + (24 * 60 * 60 * 1000));
    const _hour = _now.getHours();
    let _minLeft, _hourLeft;
    if(_hour < __dailyResetHour) {
    	_minLeft = 60 - _now.getMinutes();
        _hourLeft = __dailyResetHour - _hour - 1;
    }
    else {
    	_hourLeft = 23 - (_hour - __dailyResetHour);
        _minLeft = 60 - _now.getMinutes();
    }
    if(_minLeft > 59) {
      _minLeft = 0;
      _hourLeft++;
    }
	const _result = (_hourLeft > 0 ? (_hourLeft + getLangData('h') + ' ') : '') + _minLeft + getLangData('m');
	if(_result.length > 3)
		return _result;
	return '<span style="color:#ff6c00 !important">' + _result + "</span>";
}
function getTimeDiffUntilDate(_date, _date2) {
    const _now = (_date2 ? _date : new Date());
    const _hour = _now.getHours();
	const _dHour = (_date2 ?? _date).getHours();
	const _minute = _now.getMinutes();
	const _dMinute = (_date2 ?? _date).getMinutes();
    let _minLeft, _hourLeft;
    if(_minute <= _dMinute) {
       _minLeft = _dMinute - _minute;
	   _hourLeft = _dHour - _hour;
    }
    else {
    	_minLeft = 60 - (_minute - _dMinute);
		_hourLeft = _dHour - _hour - 1;
    }
	if(_hourLeft < 0)
		_hourLeft += 24;
	const _result = (_hourLeft > 0 ? (_hourLeft + getLangData('h') + ' ') : '') + _minLeft + getLangData('m');
	if(_result.length > 3)
		return _result;
	return '<span style="color:#ff6c00 !important">' + _result + "</span>";
}
// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

function tryShowMenuTutorial(_key) {
	if(!__account.menuTutorials)
		__account.menuTutorials = [];
	return __account.menuTutorials.indexOf(_key) === -1;
}
function showMenuTutorial(_arr, _key) {
	if(!_arr)
		return '';
	const _data = _arr[getLang()];
	return `<div class="full flex menu-tutorial-content" style="flex-direction:column">
				<img style="position:absolute;top: 2.5%;left: 3%;width: 13%;" src="./images/ui/corner-small.png" />
				<img style="position:absolute;top: 2.5%;right: 3%;width: 13%;transform: scaleX(-1);" src="./images/ui/corner-small.png" />
				<img style="position:absolute;bottom: 2.8%;left: 3%;width: 13%;transform: scaleY(-1);" src="./images/ui/corner-small.png" />
				<img style="position:absolute;bottom: 2.8%;right: 3%;width: 13%;transform: scale(-1,-1);" src="./images/ui/corner-small.png" />
				<div class="menu-tutorial-header w-100 flex">${_data.title}</div>
				<div class="menu-tutorial-desc w-100 flex flex-ai-start"><div class="w-100 flex">${_data.desc}</div></div>
				<div class="menu-tutorial-skip w-100 flex"><div class="flex game-btn3 animate-me" onexactclick="skipMenuTutorial('${_key}')">${getLangData('UNDERSTOOD')}</div></div>
	</div>`;
}
function skipMenuTutorial(_key) {
	const _clicked = document.querySelector('.menu-tutorial-content');
	if(!_clicked)
		return;
	const _menuContainer = document.getElementById('menu-ui');
	const _splscr = document.createElement('div');
	 _splscr.className = "full flex menu-ui-splash";
	 _menuContainer.appendChild(_splscr);
	__account.menuTutorials.push(_key);
	_client.saveState();
	playClick();
	addClass(_splscr, 'fade-out-400');
	const _elm = document.querySelector('.menu-sub-button.active.selected');
	if(_elm)
		_elm.querySelector('img').onexactclick();
	_splscr.onanimationend = function(event) {
		if(event.animationName === 'fade-out-me'){
			const _menuSplash = document.querySelector('.menu-ui-splash');
			if(_menuSplash)
				_menuSplash.remove();
		}
	}
}
// function to generate drops
function createRain(_container) {
	const _rain = document.createElement('section');
	_rain.className = 'rrain';
	(_container ?? _gamePad).appendChild(_rain);
	var nbDrop = MathRound(episode.cUIWidth / 2); 
	for(let i = 1; i < nbDrop; i++) {
		var dropLeft = randRange(0, episode.cUIWidth);
		var dropTop = randRange(MathRound(-episode.cUIHeight * .7), episode.cUIHeight);
		const _drop = document.createElement('div');
		_drop.className = 'drop';
		_drop.id = 'drop' + i;
		document.querySelector('.rrain').appendChild(_drop);
		_drop.style.left = dropLeft + 'px';
		_drop.style.top = dropTop + 'px';
	}
}

function createRain2(_container) {
	const _ccContainer = document.createElement('div');
	_ccContainer.className = 'full rrain';
	const _cc = document.createElement('canvas');
	_cc.width = episode.cUIWidth;
	_cc.height = episode.cUIHeight;
	if(_cc.getContext) {
		var ctx = _cc.getContext('2d');
		var w = _cc.width;
		var h = _cc.height;
		ctx.strokeStyle = 'rgba(174,194,224,0.5)';
		ctx.lineWidth = 1;
		ctx.lineCap = 'round';
		var init = [];
		var maxParts = 1000;
		for(var a = 0; a < maxParts; a++) {
		init.push({
			x: Math.random() * w,
			y: Math.random() * h,
			l: Math.random() * 1,
			xs: -4 + Math.random() * 4 + 2,
			ys: Math.random() * 10 + 10
		})
		}
		
		var particles = [];
		for(var b = 0; b < maxParts; b++)
		particles[b] = init[b];
		
		function draw() {
		ctx.clearRect(0, 0, w, h);
		for(var c = 0; c < particles.length; c++) {
			var p = particles[c];
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
			ctx.stroke();
		}
		move();
		}
		
		function move() {
		for(var b = 0; b < particles.length; b++) {
			var p = particles[b];
			p.x += p.xs;
			p.y += p.ys;
			if(p.x > w || p.y > h) {
			p.x = Math.random() * w;
			p.y = -20;
			}
		}
		}
		setInterval(draw, 30);

	}
	_ccContainer.appendChild(_cc);
	(_container ?? c9).appendChild(_ccContainer);
}
// Make it rain
function dancingInTheRain(_container) {
	createRain2(_container);
}

function shuffle(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
}
function copyText(_elem) {
	try{
		cordova.plugins.clipboard.copy(_elem.innerText ?? _elem);
	}
	catch(tex) {
		navigator.clipboard.writeText(_elem.innerText ?? _elem);
	}
}

// function askExitApp(){
// 	if(closeInventoryQuestionModal())
// 		return;
// 	if(__switchingMap || _storySceneSwitching){
// 		PlaySound({key:'disabled'});
// 		return;
// 	}
// 	const _fs = document.getElementById('first-splash');
// 	const _isActive = _fs && !hasClass(_fs, 'v-none');
// 	if(episode?.menu || !__story || __story.mission === 'qp')
// 		askSomething(getLangData('Application will be closed'), "exitApplication()", "exit-app-question", _isActive ? _fs : undefined);
// 	else
// 		askSomething(getLangData('Exit to lobby'), "killStory()", "exit-app-question", _isActive ? _fs : undefined);
// }
function askExitApp(){
	try {
		if(closeInventoryQuestionModal())
			return;
		if(document.querySelector('.key-combinations'))
			return;
		if(__switchingMap || _storySceneSwitching || _game.spinned){
			PlaySound({key:'disabled'});
			return;
		}
		const _fs = document.getElementById('first-splash');
		const _isActive = _fs && !hasClass(_fs, 'v-none');
		playClick();
		if(!__story){
			askSomething(getLangData('Application will be closed'), "exitApplication()", "exit-app-question", _isActive ? _fs : undefined);
			return;
		}
		let _options = [
			{
				step:1,
				title: {
					en: 'To Lobby Screen',
					tr: 'Lobi Ekranına'
				},
				action: 'killStory()'
			},
			{
				step:2,
				title: {
					en: 'To Opening Screen',
					tr: 'Açılış Ekranına'
				},
				action: 'resetOpeningScreen()'
			},
			{
				step:3,
				title: {
					en: 'Leave Game',
					tr: 'Oyundan Çık'
				},
				action: 'exitApplication()'
			}
		];
		if(!__account.storyResults.find(x => x.id === 1))
			_options = _options.filter(x => x.step !== 1);
		if(episode?.menu || _client.quickPlay) {
			_options = _options.filter(x => x.step !== 1);
			if(_client.quickPlay)
				_options.splice(_options.length - 1, 0, {
					step:4,
					title: {
						en: 'Restart Current Mission',
						tr: 'Bölüme Baştan Başla'
					},
					action: 'restartStory()'
				});
		}
		let _buttons = '';
		for(let _op of _options)
			_buttons += `<div class="game-menu-button flex animate-me" style="padding:0 2vh;height:5.4vh!important;font-size:3vh!important;min-width:80%;margin:1.25vh 0" onexactclick="${_op.action}">${_op.title[getLang()]}</div>`;
		let _modal = `<div class="full fade-me show-ui flex inventory-question show-info">
			<div class="inventory-modal flex quit-modal" style="width:25%;flex-direction:column;position:relative;aspect-ratio:auto">
				<div style="padding:6vh 4vh 2vh 4vh" class="flex w-100">
					<span style="color:#F4BB44 !important;font-size:3.2vh !important">${getLangData('Go back')}?</span>
				</div>
				<div class="flex w-100" style="padding:2vh 2vh 4vh 2vh">`
					+ _buttons +
				`</div>
				<div onexactclick="closeInventoryQuestionModal()" style="font-size:4.2vh !important;color:#9d987f !important;padding:1.6vh 3.2vh" class="item-info-modal-close">&times;</div>
			</div>
		</div>`;
		const _div = document.createElement('div');
		_div.innerHTML = _modal;
		(_isActive ? _fs : _gameUI).appendChild(_div.firstChild);
	}
	catch(ex){}
}

function exitApplication() {
	closeInventoryQuestionModal();
	try{
		if (typeof globalThis.__APP_EXIT_HANDLER__ === "function") {
			globalThis.__APP_EXIT_HANDLER__();
		}
	}
	catch(ex) {

	}
}

var extractDigit = function(a, bitMask, shiftRightAmount) {
    return (a & bitMask) >>> shiftRightAmount;
}
function radixSortLSD(_input_array, getKey) {
    var numberOfBins = 256;
    var Log2ofPowerOfTwoRadix = 8;
    var _output_array = new Array(_input_array.length);
    var count = new Array(numberOfBins);
    var _output_array_has_result = false;
    var bitMask = 255;
    var shiftRightAmount = 0;
    var startOfBin = new Array( numberOfBins );
    var endOfBin = new Array( numberOfBins );
    while( bitMask != 0 ) {
        for (var i = 0; i < numberOfBins; i++ )
            count[ i ] = 0;
        for (var _current = 0; _current < _input_array.length; _current++ )    // Scan the array and count the number of times each digit value appears - i.e. size of each bin
            count[ extractDigit( getKey(_input_array[ _current ]), bitMask, shiftRightAmount ) ]++;
        startOfBin[ 0 ] = endOfBin[ 0 ] = 0;
        for( var i = 1; i < numberOfBins; i++ )
            startOfBin[ i ] = endOfBin[ i ] = startOfBin[ i - 1 ] + count[ i - 1 ];
        for ( var _current = 0; _current < _input_array.length; _current++ )
            _output_array[ endOfBin[ extractDigit( getKey(_input_array[ _current ]), bitMask, shiftRightAmount ) ]++ ] = _input_array[ _current ];
        bitMask <<= Log2ofPowerOfTwoRadix;
        shiftRightAmount += Log2ofPowerOfTwoRadix;
        _output_array_has_result = !_output_array_has_result;
        var tmp = _input_array, _input_array = _output_array, _output_array = tmp;    // swap input and output arrays
    }
    if ( _output_array_has_result )
        for ( var _current = 0; _current < _input_array.length; _current++ )    // copy from output array into the input array
            _input_array[ _current ] = _output_array[ _current ];
    
    return _input_array;
}

function summonMobWithJson(_json, _noReturn, _noPush, _noEffect) {
	if(!_noPush)
		episode.mobs.push(_json);
	let _mob = episode.installMob(_json, null, !_noReturn);
	if(!_noEffect) {
		PlaySound({ key: 'puff', volume: .3 });
		if(_mob)
			_mob.addObject({
				key: 'smoke',
				position: 'middle'
			});
	}
	if(!_noReturn)
		return _mob;
}

function summonMob(_id, _x, _y, _lvl, _target, _noEffect) {
	const _json = {
		id: _id,
		minX: _x,
		maxX: _x,
		sight: 1000,
		count: 1,
		yPosition : _y,
		minLevel: _lvl,
		maxLevel: _lvl
	};
	episode.mobs.push(_json);
	const _mob = episode.installMob(_json, null, 1);
	if(!_noEffect){
		PlaySound({ key: 'puff', volume: .3 });
		_mob.addObject({
			key: 'smoke',
			position: 'middle'
		});
	}
	_mob.setAutoTarget(_target ?? mainCharacter);
	_mob.updateVariables();
	return _mob;
}
//şans 1- 100
function checkChanceIfOk(_chance) {
	if(_chance >= 100)
		return true;
	return getRandomValue2(1, 100) <= _chance;
}
function getEnemyIdByClass(_class) {
	switch (_class) {
		case 'warrior':
			return '01';
		case 'archer':
			return '02';
		case 'thief':
			return '03';
	}
	return null;
}
function clearCanvasCache(_images) {
  for (const key in _images) {
    const canvas = _images[key];
    if (canvas instanceof HTMLCanvasElement) {
      // GPU belleğini temizle
      canvas.width = 0;
      canvas.height = 0;
    }
    delete _images[key]; // JS referansını da sil
  }
}
function to4Decimals(num) {
  return MathRound(num * 10000) / 10000;
}
function to3Decimals(num) {
  return MathRound(num * 1000) / 1000;
}
function clearAudioCache(_sounds) {
  for (let i = 0; i < _sounds.length; i++) {
    const sound = _sounds[i].sound;
    if (sound instanceof HTMLAudioElement) {
      try {
        sound.pause();           // sesi durdur
        sound.src = '';          // kaynağı sil
        sound.removeAttribute('src'); // src attribute'unu da sil
        sound.load();            // browser’ın cache’inden çıkart
      } catch (e) {
        console.warn('Audio temizlenirken hata:', e);
      }
    }
    _sounds[i] = null; // referansı kopar
  }
  _sounds.length = 0; // diziyi boşalt
}

(function () {
  // cooldown süresi (ms)
  const EXACTCLICK_COOLDOWN = 250;

  // Ortak helper -> gerçek listener
  function attachExactClick(el, handler) {
    if (!el._onexactclickAttached) {
      let startX, startY, moved;

      const pointerDown = (e) => {
        startX = e.clientX;
        startY = e.clientY;
        moved = false;

        const moveListener = (moveEvent) => {
          if (
            Math.abs(moveEvent.clientX - startX) > 5 ||
            Math.abs(moveEvent.clientY - startY) > 5
          ) {
            moved = true;
          }
        };

        const upListener = (upEvent) => {
          if (!moved && el._onexactclickHandler) {
            const now = _gameTick;

            // cooldown kontrolü
            if (
              !el._lastExactClick ||
              now - el._lastExactClick > EXACTCLICK_COOLDOWN
            ) {
              el._lastExactClick = now;
              el._onexactclickHandler.call(el, upEvent);
            }
          }
          document.removeEventListener("pointermove", moveListener);
          document.removeEventListener("pointerup", upListener);
        };

        document.addEventListener("pointermove", moveListener);
        document.addEventListener("pointerup", upListener);
      };

      el.addEventListener("pointerdown", pointerDown);
      el._onexactclickAttached = true;
    }

    // hangi handler atanmış onu sakla
    el._onexactclickHandler = handler;
  }

  // setAttribute override -> <div onexactclick="...">
  const origSetAttribute = HTMLElement.prototype.setAttribute;
  HTMLElement.prototype.setAttribute = function (name, value) {
    if (name.toLowerCase() === "onexactclick") {
      const handler = new Function("event", value);
      attachExactClick(this, handler);
    } else {
      return origSetAttribute.apply(this, arguments);
    }
  };

  // property destekle -> div.onexactclick = function(){ }
  Object.defineProperty(HTMLElement.prototype, "onexactclick", {
    set: function (handler) {
      attachExactClick(this, handler);
    },
    get: function () {
      return this._onexactclickHandler || null;
    },
  });

  // Mevcut DOM’u tara
  document.querySelectorAll("[onexactclick]").forEach((el) => {
    const code = el.getAttribute("onexactclick");
    if (code) {
      const handler = new Function("event", code);
      attachExactClick(el, handler);
    }
  });

  // Sonradan eklenenler için
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.hasAttribute && node.hasAttribute("onexactclick")) {
            const code = node.getAttribute("onexactclick");
            const handler = new Function("event", code);
            attachExactClick(node, handler);
          }
          node.querySelectorAll &&
            node.querySelectorAll("[onexactclick]").forEach((el) => {
              const code = el.getAttribute("onexactclick");
              const handler = new Function("event", code);
              attachExactClick(el, handler);
            });
        }
      });
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();