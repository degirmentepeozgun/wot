'use strict';
let __storyCheckPoint;
function isMissionFailed(_index) {
	const _m = __story.resultStars[_index];
	if(_m.when)
		return !_m.when(_m);
	return _m.failed;
}
function getLobbyScene() {
	return {
			map: 0,
			start: function() {
				__account.questStatus = firstQuestData();
				if(episode.bgMusic){
					episode.pauseBgMusic();
					episode.bgMusic = null;
				}
				// mainCharacter.level = 2;
				// mainCharacter.maxExperience = 2200;
				// mainCharacter.experience = 0;
				//__account.gold = 0;
				__storyPlaying = false;

				//updateExperience(__story.rewards.find(x => x.key === 'exp').count);
				removeCoopCharacter();
				addClass(_gameUI, 'disable-ui');
				injectModule('lobby', function() {
					__storyPlaying = false;
					createMenu();
					__account.lastLobbyUsage = {
						storyId: __story.id,
						sceneOrder: __storySceneOrder
					}
					__account.commonInventory = [];
					_client.saveState();
					if(__account.tutorials?.indexOf('item-equips') >= 0)
						return;
					if(!__account.tutorials)
						__account.tutorials = [];
					//const _weapon = getRandomItem(0, 'weapon', mainCharacter.class);
					//_weapon.weared = mainCharacter.class;
					//__account.inventory = __account.inventory.filter(x => !x.weared);
					//__account.inventory.push(_weapon);
					__account.tutorials.push('item-equips');
					setTimeout(() => {
						focusMe('#side-hamburger-menu', function() {
							removeFocus(1);
							openSideMenu();
							setTimeout(function() {
								focusMe('#lobby-inventory', function() {
									removeFocus(1);
									hideSideMenu();
									openInventoryScreen();
									setTimeout(function() {
										focusMe('#inventory-slots .item-slot:first-child', function() {
											removeFocus(1);
											const _id = sortItemsFromBestToWorse(getItems())?.[0]?.id;
											if(!_id)
												return;
											openItemInfoModal(_id);
											focusMe('.equipment-wear-button', function() {
												wearItem(_id);
												removeFocus(1);
											});
										});
									}, 320);
								});
							}, 320);
						});
					}, 100);
				});
				if(mainCharacter){
					mainCharacter.left = MathRound(1735 * __zoom);
					mainCharacter.direction = 'right';
					mainCharacter.skipHealthBar = true;
					mainCharacter.noDirection = true;
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.disableKeyboard = mainCharacter.immobilize = true;
					mainCharacter.animate('idlelobby',1);
				}
			},
			afterInit: function() {
				mainCharacter.yPosition = MathRound(getGroundHeight() * 1.3);
			},
			save: true,
			mobs: [
				{
					id: 72,
					minX: 1175,
					maxX: 1175,
					count: 1,
					do: function(_e) {
						episode.msNow = 1;
						_e.direction = 'right';
						_e.noDirection = true;
						_e.swapAnimation('idle');
					},
					yPosition: function() {
						return MathRound(groundheight * 1.7);
					}
				},
				{
					id: 2002,
					minX: 1400,
					maxX: 1400,
					count: 1,
					do: function(_e) {
						_e.npc = true;
						_e.reversed = true;
						_e.direction = 'left';
						_e.noDirection = true;
					},
					yPosition: function() {
						return MathRound(groundheight * 1.85);
					}
				},
				{
					id: 5,
					minX: 1380,
					maxX: 1380,
					count: 1,
					yPosition: function() {
						return MathRound(groundheight * 1.6);
					}
				},
				{
					id: 87,
					minX: 1600,
					maxX: 1600,
					count: 1,
					zoom: .8,
					yPosition: function() {
						return MathRound(groundheight * 1.65);
					}
				},
				{
					id: 87,
					minX: 1250,
					maxX: 1250,
					count: 1,
					zoom: .85,
					yPosition: function() {
						return MathRound(groundheight * 1.2);
					}
				}
			]
		};
}
const __stories = [
	{
		id: 1,
		order: 1,
		disableWorldMap: true,
		loadingCharacterIds: [1, 2, 28],
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		ticket: 2,
		list:true,
		//startScene:1,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'belt', count:1 },
			{ key: 'fragment', name: 'king', minCount:1, maxCount:5, chance:50 },
			{ key: 'gold', count: 5000 },
			{ key: 'exp', count: 1000 }
		],
		quests: [
			{
				id: 1,
				key: '',
				names: {
					en: 'Eliminate Guards',
					tr: 'Nöbetçileri Yok Et'
				},
				descriptions: {
					en: 'Guards Eliminated',
					tr: 'Nöbetçi Yok Edildi'
				},
				owner: 'system',
				minLevel: 1,
				kills: [{ enemy: [51,52], limit: 24, key: 'Guard' }],
				maps: [105],
				after: function() {
					episode.enemies.forEach(x => x.spawnAsGroup = x.respawnAfterSeconds = x.spawn = undefined);
					updateQuestArea();
					__account.questStatus.quest = undefined;
					_client.upgradeQuestStatus();
					warn('<div class="flex heading toast-with-banner ink" style="position:relative;width:auto"><img style="height:20vh;z-index:-1" src="./images/icons/txtbg.png" /><div class="full flex" style="position:absolute">' + getLangData('Quest Completed') + '</div></div>');
					episode.playSound({ key: 'questdone', volume: .8 });
					episode.showLocationHand('right');
					episode.width *= 2;
					episode.moveCamera();
					episode.enemies.filter(x => !x.enemy && !x.main)?.forEach(x => x.remove = true);
					episode.phase = 2;
				}
			},
			{
				id: 2,
				names: {
					en: 'Save The Ranger',
					tr: 'Okçuyu Kurtar'
				},
				descriptions: {
					en: 'Ranger Saved',
					tr: 'Okçu Kurtarıldı'
				},
				owner: 'system',
				minLevel: 1,
				loots: [
					{
						object: ['archer'],
						limit: 1,
						noInfo: true,
						key: 'archer',
						type: 'quest-item',
						chanceRate: 100,
						command:'Save'
					}
				],
				after: function(){
					episode.enemies = episode.enemies.filter(x => x.class !== 'archer');
					removeCoopCharacter(1);
					const _char = addCoopCharacter(null, 'arc');
					_char.unarm();
					const _q = __account.questStatus.quest.loots[0];
					if(_q)
						_q.count = 1;
					getQuestRewards(__account.questStatus.quest);
					episode.playSound({ key: 'questdone', volume: .8 });
					updateQuestArea();
					episode.dialogs = [{
						id: 1,
						location: { map: episode.id }, ms: 2000,
						owner: _char.key,
						text: "We need arms now!",
						onend: function() {
							//episode.sprites.forEach(x => x.disabled = false);
							episode.phase = 1;
							takeQuest(2, 1);
							episode.showLocationHand('left');
						}
					}];
				},
				maps: [104]
			},
			{
				id: 3,
				names: {
					en: 'Find Weapons',
					tr: 'Silahları Bul'
				},
				owner: 'system',
				minLevel: 1,
				loots: [
					{
						object: ['chest'],
						limit: 1,
						key: 'sword',
						type: 'quest-item',
						chanceRate: 100,
						descriptions: {
							en: 'Sword Found',
							tr: 'Kılıç Bulundu'
						}
					},
					{
						object: ['bow'],
						limit: 1,
						key: 'bow',
						type: 'quest-item',
						chanceRate: 100,
						descriptions: {
							en: 'Bow Found',
							tr: 'Yay Bulundu'
						}
					}
				],
				maps: [104],
				after: function() {
					const _chest = episode.enemies.find(x => x.id === 56);
					if(_chest)
						_chest.animate('dead', 1);
					else {
						delete __account.questStatus.quest.after;
						episode.playSound({ key: 'loot', volume: 1 });
						const _dead = episode.enemies.find(x => x.id === 78);
						if(_dead && !_dead.unarmed)
							_dead.unarm();
						const _q = __account.questStatus.quest.loots.find(x => x.key === 'bow');
						if(_q) {
							_q.count = 1;
							updateQuestArea();
							episode.dialogs = [{
								id: 2,
								location: { map: episode.id }, ms: 2000,
								owner: mainCharacter.key,
								text: "Here! Take it",
								onend: function() {
									const _archer = episode.enemies.find(x => x.class === 'archer');
									_archer.disableUnarm();
									episode.dialogs = [{
										id: 3,
										location: { map: episode.id }, ms: 2000,
										owner: _archer.key,
										text: "Got it! Thanks",
										onend: function() {
											episode.dialogs.push({
												id: 11,
												location: { map: episode.id },
												ms: 3100,
												delay: 100,
												owner: mainCharacter.key,
												text: "We need to get out of here!",
												onend: function() {
													episode.showLocationHand('right');
													episode.phase = 5;
												}
											});
										}
									}];
								}
							}];
						}
					}
				}
			}
		],
		title: {
			en: "Royal Massacre",
			tr: "Kraliyet Katliyamı"
		},
		description: {
			en: "Cyclops attacks a castle with goblins for fun. While they are defeated by the king's military forces, one of them manages to escape and unites with our heroes who escaped captivity and seeks to put this giant in his place with the support they receive from the people of the village where they take refuge.",
			tr: "Tepegöz zevk için bir kaleye goblinler ile birlikte saldırıda bulunur. Kralın askeri birlikleri karşısında hezimete uğrarken içlerinden kaçmayı başaran biri, esaretten kurtulan kahramanlarımız ile birleşerek sığındıkları köyün halkından aldıkları destek ile bu deve haddini bildirme peşindedir"
		},
		boss: "king",
		minLevel: 1,
		scenes: [
			{
				map: 105,
				startWith: 47,
				actions: [
					{
						when: function() {
							return episode.phase === 2 && !episode.enemies.find(x => x.class === 'king') 
							&& (platformX > ((4635 * episode.zoom) - (episode.cWidth / 2)));
							//return (episode.phase ?? 0) < 3 && !episode.enemies.find(x => x.class === 'king') && (mainCharacter.LEFT + platformX) >= 0;
						},
						do: function() {
							episode.phase = 3;
							const _king = summonMob(59, MathRound((episode.width - (episode.cWidth * .4)) / __zoom), MathRound(groundheight * .5), mainCharacter.level);
							const _princess = summonMob(58, MathRound((episode.width - (episode.cWidth * .49)) / __zoom), MathRound(groundheight * .75), mainCharacter.level);
							//const _king = summonMob(59, MathRound((_canvas.width - (_canvas.width * .25)) / __zoom), MathRound(groundheight * .5), mainCharacter.level);
							//const _princess = summonMob(58, MathRound((_canvas.width - (_canvas.width * .34)) / __zoom), MathRound(groundheight * .75), mainCharacter.level);
							_princess.invulnerable = true;
							addClass(_gameUI, 'disable-ui');
							episode.removeLocationHand();
							mainCharacter.direction = 'right';
							mainCharacter.standBy();
							mainCharacter.left = MathRound(episode.cWidth * .2);
							mainCharacter.updateVariables();
							mainCharacter.yPosition = MathRound(groundheight * .5);
							if(mainCharacter.rageCount > 0 || mainCharacter.ultimate) {
								mainCharacter.rageCount = 0;
								mainCharacter.updateRageSkillUI();
							}
							if(mainCharacter.finishBombs)
								mainCharacter.finishBombs();
								setTimeout(function() {
									cssAnimations.vs(mainCharacter,
										{
											ms: 3000,
											enemyId: 59,
											q1: 'Get out! Smurf!',
											q2: 'Eye for an eye!'
										}, function() {
										const _goblins = [];
										__storyCutScenePlaying = 1;

										cssAnimations.film(null, [
											{
												do: function() {
													episode.dialogs = [];
													for(let i = 0; i < 2; i++) {
														const _goblin = summonMob(49, MathRound((platformX - (episode.cWidth * .25)) / __zoom), MathRound(groundheight * (.25 + (i * .5))), mainCharacter.level);
														_goblin.enemy = false;
														_goblin.level = _goblin.skipHealthBar = 1;
														_goblin.immunities = [];
														_goblin.disableSkills();
														if(_goblin.animations.idle?.alternateFrames){
															delete _goblin.animations.idle.alternateFrames;
															_goblin.swapAnimation('idle');
														}
														if(_goblin.animations.run?.alternateFrames){
															delete _goblin.animations.run.alternateFrames;
															_goblin.swapAnimation('run');
														}
														_goblin.direction = _goblin.moveDirection = 'right';
														_goblins.push(_goblin.key);
														_goblin.action =  {
															command: 'move',
															to: 500 * __zoom,
															after: function(_e) {
																_e.immobilize = _e.still = true;
																_e.animate('idle', 1);
																createBubbleText({
																	id: 11,
																	location: { map: episode.id }, ms: 1500,
																	owner: _king.key,
																	text: "You shall not pass!"
																});
															}
														}
													}
												},
												ms: 500
											},
											{
												do: function() {
													createBubbleText({
														id: 2,
														location: { map: episode.id }, ms: 2000,
														owner: mainCharacter.key,
														text: "We are here for expropriation"
													});
												},
												ms: 4800
											},
											{
												do: function() {
													createBubbleText({
														id: 13,
														location: { map: episode.id }, ms: 2000,
														owner: _king.key,
														text: "You freaks will pay!"
													});
												},
												ms: 6900
											},
											{
												do: function() {
													createBubbleText({
														id: 4,
														location: { map: episode.id }, ms: 2500,
														owner: _princess.key,
														leftGap: -200,
														text: "Get your strength my lord"
													});
												},
												ms: 9000
											},
											{
												do: function() {
													createBubbleText({
														id: 5,
														location: { map: episode.id }, ms: 2000,
														owner: _goblins[0],
														text: "The woman is mine! Master",
														onend: function(_e) {
															episode.hasSolid = true;
															_king.animate('buff1', 1);
															_e.hp = _e.maxHP = 1;
															_e.stepXRate = .65;
															_e.still = false;
															_e.action =  {
																command: 'move',
																to: 1100 * __zoom,
																y: .75,
																after: function(_g) {
																	_king.throwSpell({ spell: { key: 'icespike', priority: 1, smash: 1 }}, null, _g);
																	_g.immobilize = _g.still = true;
																	_g.animate('idle', 1);
																}
															}
														}
													});
												},
												ms: 11600
											},
											{
												do: function() {
													createBubbleText({
														id: 666,
														leftGap: 200,
														location: { map: episode.id }, ms: 1000,
														owner: mainCharacter.key,
														asap: 1,
														text: "#sigh#"
													});
												},
												ms: 15600
											},
											{
												do: function() {
													createBubbleText({
														id: 26,
														location: { map: episode.id }, ms: 2000,
														owner: _king.key,
														text: "How dare you?",
														onend: function(_e) {
															_e.animate('buff2', 1);
															_e.animations.buff2.after = function() {
																_e.still = false;
																_e.animate('charge', 1);
																episode.enemies.find(x => x.key === _goblins[1]).invulnerable = 1;
															}
														}
													});
												},
												ms: 16100
											},
											{
												do: function() {
													delete mainCharacter.friendlyFire;
													mainCharacter.animations.air1.coolDownLeft = 0;
													mainCharacter.enableSkill('air1');
													mainCharacter.animate('air1', 1);
												},
												ms: 22800
											},
											{
												do: function() {
													delete mainCharacter.animations.counterstun.frames[0].objects;
													mainCharacter.animate('counterstun', 1);
												},
												ms: 24000
											},
											{
												do: function() {
													createBubbleText({
														id: 7,
														location: { map: episode.id }, ms: 2000,
														owner: mainCharacter.key,
														text: "You fool!"
													});
												},
												ms: 25100
											},
											{
												do: function() {
													const _gob = episode.enemies.find(x => x.key === _goblins[1]);
													_gob.still = false;
													_gob.action = {
														command: 'move',
														to: 3000 * __zoom,
													};
													createBubbleText({
														id: 8,
														location: { map: episode.id }, ms: 1200,
														owner: _goblins[1],
														delay: 200,
														asap: 1,
														text: "Come here sweety!"
													});
												},
												ms: 27100
											},
											{
												do: function() {
													createBubbleText({
														id: 9,
														location: { map: episode.id }, ms: 3000,
														owner: _princess.key,
														asap: 1,
														text: "#screams#"
													});
												},
												ms: 27900
											},
											{
												do: function() {
													_princess.still = false;
													_princess.action = {
														command: 'move',
														to: 3000 * __zoom,
													};
												},
												ms: 28300
											}
										], 32000, function() {
											const _topGoblin = episode.enemies.find(x => x.key === _goblins[1]);
											if(_topGoblin)
												_topGoblin.remove = true;
											_princess.remove = true;
											__storyCutScenePlaying = 0;
											episode.minPlatformX = platformX;
											episode.still = true;
											mainCharacter.immobilize = false;
											mainCharacter.moveDirection = 'right';
											delete mainCharacter.disableKeyboard;
											episode.showLocationHand('right');
											//mainCharacter.enableSkills();
											episode.phase = 3;
										});
									});
								}, 1000);
						}
					},
					{
						when: function() {
							return episode.phase === 3 && !episode.enemies.find(x => x.class === 'king') && mainCharacter.ORIGINLEFT > (episode.width / 6);
						},
						do: function() {
							episode.phase = 4;
							mainCharacter.yPosition = MathRound(groundheight * .5);
							mainCharacter.standBy();
							mainCharacter.still = true;
							episode.still = true;
							episode.width = platformX + _canvas.width;
							mainCharacter.left = MathRound(episode.width / 6); //MathRound(_canvas.width / 2);
							mainCharacter.updateVariables();
							episode.removeLocationHand();
							mainCharacter.disableSkills();
							const _mLeft = MathRound(mainCharacter.SCREENLEFT + (mainCharacter.WIDTH / 2));
							for(let i = 1; i < 13; i++) {
								let _left =  MathRound((_mLeft + platformX) - (episode.cWidth / 2) - ((140 * __zoom) * MathCeil(i / 3))); //platformX - MathRound(-1 * (200 * MathCeil(i / 3)));
								if((i % 3) === 1)
									_left += (50 * __zoom);
								_left -= (350 * __zoom);
								let _m = summonMob(51, MathRound(_left / __zoom),
								MathRound(groundheight * (.2 + (.15 * (1 + (i % 3))))));
								_m.puppetMode = true;
								_m.disableSkills();
								_m.noLoot = true;
								_m.experience = 0;
								_m.direction = _m.moveDirection = 'right';
								_m.setAutoTarget(mainCharacter);
								_m.animations.run.imediateBreak = false;
								_m.animations.run.maxRepeat = 2;
								_m.animations.run.after = function() {
									_m.still = _m.immobilize = true;
									_m.animate('idle', 1);
									delete _m.animations.run;
								}
								_m.run();
							}
							for(let i = 1; i < 13; i++) {
								let _left = MathRound((_mLeft + platformX) + (_canvas.width / 2) + ((140 * __zoom) * MathCeil(i / 3)));
								if((i % 3) === 1)
									_left -= (50 * __zoom);
								_left -= (50 * __zoom);
								let _m = summonMob(51, MathRound(_left / __zoom),
								MathRound(groundheight * (.2 + (.15 * (1 + (i % 3))))));
								_m.puppetMode = true;
								_m.disableSkills();
								_m.noLoot = true;
								_m.experience = 0;
								_m.direction = _m.moveDirection = 'left';
								_m.setAutoTarget(mainCharacter);
								_m.animations.run.imediateBreak = false;
								_m.animations.run.maxRepeat = 2;
								_m.animations.run.after = function() {
									_m.still = _m.immobilize = true;
									_m.animate('idle', 1);
									delete _m.animations.run;
								}
								_m.run();
							}
							createBubbleText({
								id: 6,
								location: { map: episode.id },
								//delay: 1500,
								ms: 3000,
								owner: mainCharacter.key,
								text: "Come and get me!",
								onend: function() {
									mainCharacter.direction = 'left';
									mainCharacter.enableSkills();
									delete mainCharacter.animations.defense.delay;
									mainCharacter.animations.defense.coolDownLeft = 0;
									mainCharacter.animations.defense.do = function() {
										removeFocus();
									}
									mainCharacter.enableSkill('defense');
									focusMe('#skill8');
									mainCharacter.enableSkill('defense');
									mainCharacter.animations.defense.after = function() {
										mainCharacter.animations.release.frames.forEach(x => x.buffs = undefined);
										mainCharacter.animations.test = mainCharacter.animations.release;
										mainCharacter.animations.test.key = 'test';
										mainCharacter.animate('test', 1);
										createBubbleText({
											id: 10,
											location: { map: episode.id },
											delay: 1500,
											ms: 4000,
											owner: mainCharacter.key,
											text: "Damn! Machine in my head!",
											onend: function() {
												cssAnimations.black(null, 3000, getLangData('Meanwhile, deep in the sewers far, far away'), function() {
													switchStoryScene();
												});
											}
										});
									}
								}
							});
						}
					}
				],
				mobs: [
					{
						id: 51,
						minX: 800,
						maxX: 800,
						count: 1,
						sight:1000,
						minLevel: 20,
						groupId: 1,
						spawnAsGroup: 1,
						spawnTime: 1,
						spawnDirection: 'right',
						spawn:1,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 250,
						maxX: 250,
						count: 1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						attackAfterHit: true,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right',
							deadFirst: true
						}
					},
					{
						id: 51,
						minX: 700,
						maxX: 700,
						count: 1,
						sight:1000,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 700,
						maxX: 700,
						count: 1,
						sight:1000,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1000,
						maxX: 1000,
						count: 1,
						sight:1000,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 900,
						maxX: 900,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 900,
						maxX: 900,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1200,
						maxX: 1200,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1100,
						maxX: 1100,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1100,
						maxX: 1100,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 52,
						minX: 1400,
						maxX: 1400,
						count: 1,
						groupId: 2,
						spawnDirection: 'left',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 52,
						minX: 1500,
						maxX: 1500,
						count: 1,
						groupId: 2,
						spawnDirection: 'left',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 52,
						minX: 1400,
						maxX: 1400,
						count: 1,
						groupId: 2,
						spawnDirection: 'left',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 54,
						minX: 1200,
						maxX: 1200,
						count: 1,
						sight:1000,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return MathRound(groundheight * .9);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 54,
						minX: 4000,
						maxX: 4000,
						count: 1,
						sight:1000,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return MathRound(groundheight * .9);
						},
						props: {
							noLoot: true,
							experience: 0,
							reversed: true,
							immobilize: true,
							direction: 'right'
						}
					}
				],
				start: function() {
					__storyCutScenePlaying = 1;
					mainCharacter.disableSkill('defense');
					mainCharacter.zoom = 2;
					mainCharacter.updateVariables();
					mainCharacter.ironSkin = mainCharacter.solid = true;
					episode.width = MathRound(episode.width / 2);
					mainCharacter.left = MathRound(-1 *(episode.cWidth * .16));
					episode.enemies.forEach(x => {
						x.immobilize = true;
						if(!x.deadFirst)
							x.invulnerable = true;
					});
					setTimeout(() => {
						cssAnimations.film(mainCharacter,
							[
							{
								do: function() {
									// const _f = mainCharacter.animations.roll.frames;
									// _f[_f.length - 1].atk = {
									// 	yRange: 15,
									// 	rate: 1,
									// 	hurt: {
									// 		smash: true
									// 	}
									// };
									mainCharacter.animations.roll.after = function() {
										mainCharacter.animations.roll.after = undefined;
										episode.enemies.filter(x => x.enemy && !x.deadFirst && x.class !== 'object')?.forEach(x => x.invulnerable = true);
										const _e = episode.enemies.find(x => x.enemy && x.deadFirst);
										if(_e.isDead())
											return;
										if(!_e.animations.hurtfeet)
											_e.animations.hurtfeet = new animation(createHurtFeet(_e.zoom));
										_e.animate('hurtfeet', 1);
									}
									mainCharacter.animate('roll', 1);
								},
								ms: 1000
							},
							{
								do: function() {
									episode.enemies.filter(x => x !== mainCharacter && !x.isDead())
									.forEach(x => x.direction = 'left');
								},
								ms: 2100
							},
							{
								do: function() {
									episode.dialogs = [{
										id: 1,
										width: '30vw',
										location: { map: episode.id }, ms: 1800,
										owner: episode.enemies.find(x => x.id === 51 && !x.isDead()).key,
										text: "What the hell are you?",
									}];
								},
								ms:2200
							},
							{
								do: function() {
									for(let i = 0; i < 10; i++) {
										const _goblin = summonMob((i % 2) > 0 ? 19 : 49, MathRound((platformX - (_canvas.width * .25)) / __zoom), MathRound(groundheight * (getRandomValue2(1, 100) / 100)), 1);
										_goblin.enemy = false;
										_goblin.friendly = true;
										_goblin.level = _goblin.skipHealthBar = 1;
										_goblin.immunities = [];
										_goblin.direction = _goblin.moveDirection = 'right';
										_goblin.action =  {
											command: 'move',
											to: getRandomValue2(1, 50) * 2 * __zoom,
											after: function(_e) {
												_e.immobilize = true;
												_e.animate('idle', 1);
											}
										}
									}
									// const _f = mainCharacter.animations.roll.frames;
									// delete _f[_f.length - 1].atk;
									episode.dialogs = [{
										id: 3,
										location: { map: episode.id }, ms: 2000,
										owner: mainCharacter.key,
										leftGap: 100,
										text: "I will test my lasers",
									}];
								},
								ms: 4200
							},
							{
								do: function() {
									episode.dialogs = [{
										id: 4,
										onend: function() {
											episode.pauseBgMusic(1);
											episode.createBgMusic(null, null, null, 'cyclops1');
											episode.playBgMusic();
											mainCharacter.friendlyFire = true;
											// //episode.enemies.forEach(x => x.immobilize = false);
											// //__storyCutScenePlaying = 0;
											// delete mainCharacter.disableKeyboard;
											// takeQuest(__story.quests[0], 1);
										},
										location: { map: episode.id }, ms: 1000,
										owner: episode.enemies.find(x => x.id === 51 && !x.isDead()).key,
										asap: 1,
										text: "Huh?",
									}];
								},
								ms: 6500
							}
						], 7600, function() {
							episode.enemies.forEach(x => x.immobilize = x.invulnerable = false);
							__storyCutScenePlaying = 0;
							delete mainCharacter.disableKeyboard;
							takeQuest(0, 1);
							episode.enemies.filter(x => x.enemy && x.class !== 'object')?.forEach(x => x.invulnerable = false);
						});
					}, 1500);
				}
			},
			{
				map: 104,
				startWith: 0,
				actions: [
					{
						when: function(){
							return episode.id === 102 && episode.phase === 5 && (mainCharacter.left + mainCharacter.WIDTH) >= _canvas.width;
						},
						do: function() {
							episode.phase++;
							setTimeout(() => {
								__storyTell = new story(1, function() {
									stopQuake();
									//switchStoryScene();
									episode.enemies.filter(x => x.alp).forEach(x => x.remove = true);
									__storyPlaying = false;
									installStoryFinish();
								}, null, 'Two prisoners waiting for death in the dungeon managed to escape among these ruins');
							}, 100);
						}
					},
					{
						when: function(){
							return episode.id === 102 && !episode.phase && !episode.enemies.find(x => x.enemy && !x.invulnerable);
						},
						do: function() {
							episode.phase = 1;
							const _dead = episode.enemies.find(x => x.id === 78);
							_dead.npc = 'bow';
						}
					},
					{
						when: function(){
							return episode.id === 104 && episode.phase === 1 && mainCharacter.left <= 0;
						},
						do: function() {
							episode.phase = 2;
							switchMap(103, 1, function() {
								removeCoopCharacter(1);
								const _char = addCoopCharacter(null, 'arc');
								_char.unarm();
								_char.left = MathRound(_canvas.width * .8);
								_char.direction = mainCharacter.direction = 'left';
								_char.yPosition = MathRound(groundheight * .25);
								mainCharacter.keyboard.holdingKeys = [];
								mainCharacter.left = MathRound(_canvas.width * .75);
								mainCharacter.disableSkills();
								mainCharacter.idle();
								episode.removeLocationHand();
							});
						}
					},
					{
						when: function(){
							return episode.id === 104 && episode.phase === 10 && (mainCharacter.left + mainCharacter.WIDTH) > _canvas.width;
						},
						do: function() {
							episode.phase = 11;
							switchMap(102, 1, function() {
								removeCoopCharacter(1);
								const _char = addCoopCharacter(null, 'arc');
								_char.unarm();
								_char.left = MathRound(_canvas.width * .2);
								_char.direction = 'right';
								_char.yPosition = MathRound(groundheight * .25);
								mainCharacter.keyboard.holdingKeys = [];
								mainCharacter.left = MathRound(_canvas.width * .35);
								mainCharacter.idle();
								mainCharacter.enableSkills();
								episode.removeLocationHand();
								mainCharacter.still = mainCharacter.immobilize = true;
								createBubbleText({
									id: 1,
									location: { map: episode.id }, ms: 2000,
									owner: (episode.enemies.find(x => x.class === 'archer')).key,
									text: "Get off the rats!",
									onend: function() {
										focusMe('#skill1', function() {
											mainCharacter.disableKeyboard = mainCharacter.still = mainCharacter.immobilize = false;
											mainCharacter.enableSkills();
											mainCharacter.solid = true;
											mainCharacter.animate('attack', 1);
											episode.enemies.find(x => x.id === 78).npc = 'bow';
											episode.NPCS = episode.enemies.filter(x => x.npc);
											removeFocus();
										}, false, getLangData('Press to single attack, hold to combo attack'));
									}
								});
							});
						}
					},
					{
						when: function(){
							return episode.id === 103 && episode.phase === 1 && mainCharacter.left > (_canvas.width * .8);
						},
						do: function() {
							episode.phase = 2;
							switchMap(104, 1, function() {
								removeCoopCharacter(1);
								const _char = addCoopCharacter(null, 'arc');
								_char.unarm();
								mainCharacter.keyboard.holdingKeys = [];
								_char.left = 0;
								_char.direction = 'right';
								_char.yPosition = MathRound(groundheight * .25);
								mainCharacter.left = MathRound(_canvas.width * .1);
								mainCharacter.disableSkills();
								mainCharacter.idle();
								episode.showLocationHand('right');
								episode.phase = 10;
							});
						}
					}
				],
				mobs: [
					{
						id: '01',
						minX: 1730,
						maxX: 1730,
						count: 1,
						sight:1,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return groundheight;
						},
						do: function(_e) {
							_e.unarm();
							_e.noDirection = true;
						},
						props: {
							immobilize: true,
							direction: 'left',
							disabled: true,
							reversed: true,
							still: true,
							skipHealthBar: true
						}
					},
					{
						id: '02',
						minX: 380,
						maxX: 380,
						count: 1,
						sight:1,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return groundheight;
						},
						do: function(_e) {
							_e.unarm();
							_e.npc = 'archer';
							_e.noDirection = true;
						},
						props: {
							immobilize: true,
							direction: 'right',
							disabled: true,
							moveDirection: 'right',
							still: true,
							skipHealthBar: true
						}
					}
				],
				start: function() {
					if(mainCharacter){
						mainCharacter.disableKeyboard = 1;
						delete mainCharacter.disableKeyboard;
						episode.enemies = episode.enemies.filter(x => x !== mainCharacter);
						mainCharacter = undefined;
					}
					episode.enemies.forEach(x => x.immobilize = false);
					__storyCutScenePlaying = undefined;
					addClass(_gameUI, 'disable-ui');
					setTimeout(function() {
						injectModule('character-selection', function() {
							var x = new characterSelection();
							x.createCharacterSelectionUI();
						});
					}, 500);
				}
			},
			getLobbyScene()
		]
	},
	{
		id: 2,
		order: 2,
		disableWorldMap: true,
		loadingCharacterIds: [2],
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		ticket: 2,
		list:true,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'ring', count:1 },
			{ key: 'gem', grade: 1, type: 'random', count:1, chance:50 },
			{ key: 'gold', count: 5500 },
			{ key: 'exp', count: 1100 }
		],
		quests: [
			{
				id: 1,
				names: {
					en: 'Clear Goblins',
					tr: 'Goblinleri Temizle'
				},
				owner: 'system',
				minLevel: 1,
				kills: [{
					enemy: [19],
					limit: 5,
					descriptions: {
						en: 'Goblin Cleared',
						tr: 'Goblin Temizlendi'
					}
				},
				{ enemy: [49], limit: 1, descriptions: {
					en: 'Rogue Cleared',
					tr: 'Haydut Temizlendi'
				} },
				{ enemy: [66], limit: 1, descriptions: {
					en: 'Rider Cleared',
					tr: 'Binici Temizlendi'
				} }],
				maps: [3],
				after: function() {
					takeNextQuest();
					episode.enemies.find(x => x.npc === 'druid').disabled = false;
					episode.NPCS = episode.enemies.filter(x => x.npc && !x.disabled);
					episode.pauseBgMusic(1);
				}
			},
			{
				id: 2,
				names: {
					en: 'Save Princess',
					tr: 'Prensesi Kurtar'
				},
				descriptions: {
					en: 'Princess Saved',
					tr: 'Prenses Kurtarıldı'
				},
				owner: 'system',
				minLevel: 1,
				loots: [
					{
						object: ['druid'],
						limit: 1,
						noInfo: true,
						key: 'druid',
						type: 'quest-item',
						chanceRate: 100,
						command:'Save'
					}
				],
				after: function() {
					episode.pauseBgMusic(1);
					const _druid = episode.enemies.find(x => x.id === 67);
					_druid.remove = true;
					getQuestRewards(__account.questStatus.quest);
					episode.playSound({ key: 'questdone', volume: .8 });
					takeNextQuest();
					const _princess = summonMob(58, MathRound(mainCharacter.SCREENLEFT / __zoom), mainCharacter.yPosition, mainCharacter.level);
					_princess.friendly = _princess.invulnerable = true;
					_princess.still = _princess.immobilize = false;
					if(mainCharacter.direction === 'left') {
						_princess.direction = 'right';
						_princess.left = MathRound(mainCharacter.SCREENLEFT - mainCharacter.WIDTH);
					}
					else {
						_princess.direction = 'left';
						_princess.left = MathRound(mainCharacter.SCREENLEFT + mainCharacter.WIDTH + mainCharacter.WIDTH);
					}
					_princess.updateVariables();
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.animate('idle', 1);
					mainCharacter.immobilize = mainCharacter.disableKeyboard = true;
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 2,
									location: { map: episode.id }, ms: 2000,
									owner: _princess.key,
									text: "Thank you my hero"
								});
							},
							ms: 0
						},
						{
							do: function() {
								createBubbleText({
									id: 3,
									location: { map: episode.id }, ms: 2100,
									owner: mainCharacter.key,
									text: "We need somewhere to hide!"
								});
							},
							ms: 2200
						},
						{
							do: function() {
								createBubbleText({
									id: 4,
									location: { map: episode.id }, ms: 2100,
									owner: _princess.key,
									text: "I know a place, lets go..."
								});
							},
							ms: 4500
						}
					], 6800, function() {
						episode.showLocationHand('left');
						episode.phase = 1;
						mainCharacter.immobilize = false;
						delete mainCharacter.disableKeyboard;
					});
				},
				maps: [3]
			},
			{
				id: 3,
				names: {
					en: 'Find Safe Place',
					tr: 'Güvenli Yer Bul'
				},
				descriptions: {
					en: 'Place Found',
					tr: 'Yer Bulundu'
				},
				owner: 'system',
				minLevel: 1,
				loots: [
					{
						object: ['wizard'],
						limit: 1,
						noInfo: true,
						key: 'wizard',
						type: 'quest-item',
						chanceRate: 100,
						command:'Find'
					}
				],
				after: function() {
					takeNextQuest();
					__account.questStatus.state = 'begin';
					updateQuestArea();
					const _dk = episode.enemies.find(x => x.id === 72);
					_dk.npc = true;
					episode.resetMainQuest();
					episode.endTime = _gameTick;
				},
				maps: [1]
			},
			{
				id: 4,
				names: {
					en: 'Talk With Elder',
					tr: 'Bilge İle Konuş'
				},
				descriptions: {
					en: 'Elder Talked',
					tr: 'Bilge Konuştu'
				},
				dialogId:6,
				loots: [
					{
						object: ['wizard'],
						limit: 1,
						noInfo: true,
						key: 'wizard',
						type: 'quest-item',
						chanceRate: 100,
						command:'Talk'
					}
				],
				statusChanged: function(_status) {
					if(_status !== 'progress')
						return;
					completeQuest();
					const _p = episode.enemies.find(x => x.class === 'druid');
					if(!_p)
						return;
					const _a = episode.enemies.find(x => x.class === 'archer');
					if(!_a)
						return;
					_p.yPosition = groundheight;
					_p.still = _p.immobilize = true;
					_p.left = MathRound(1900 * __zoom);
					_p.npc = true;
					_p.platformX = platformX;
					_p.friendly = true;
					_p.enemy = false;
					_p.animate('idle', 1);
					_p.direction = 'left';
					mainCharacter.direction = 'right';
					_a.left = mainCharacter.SCREENLEFT + platformX + MathRound(1.5 * mainCharacter.WIDTH);
					_a.yPosition = mainCharacter.yPosition;
					mainCharacter.disableKeyboard = true;
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.standBy();
					_a.standBy();
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 991,
									location: { map: episode.id }, ms: 2000,
									owner: mainCharacter.key,
									text: "You should stay with them"
								});
							},
							ms: 2000
						},
						{
							do: function() {
								createBubbleText({
									id: 992,
									location: { map: episode.id }, ms: 2000,
									owner: _a.key,
									text: "Ok, but be careful"
								});
							},
							ms: 4100
						},
					], 5200, function() {
						__storyPlaying = false;
						installStoryFinish();
					});
				},
				owner: 'wizard',
				minLevel: 1,
				maps: [1]
			}
		],
		title: {
			en: "A Place to Refuge",
			tr: "Sığınılacak Bir Yer"
		},
		description: {
			en: "Our heroes are searching for a place to hide but goblins are all around",
			tr: "Kahramanlarımız saklanacakları bir yer ararken goblinler ortalıkta cirit atmaktadır"
		},
		boss: "tent",
		minLevel: 2,
		scenes: [
			{
				map: 3,
				from: 'right',
				startWith: 1,
				save: true,
				actions: [
					{
						when: function() {
							if(mainCharacter.attacked && !episode.firstFly){
								const _mob = episode.enemies.find(x => x.animations.deadfly && x.animation !== 'deadfly' && x.health < x.MAXHP)
								if(_mob){
									_mob.health = 0;
									_mob.animate('deadfly', 1);
									episode.firstFly = 1;
									return true;
								}
							}
							return false;
						}
					},
					{
						when: function() {
							return !_game.suspended && mainCharacter.chains && !mainCharacter.attackedByObject && !mainCharacter.counterLearned;
						},
						do: function() {
							if(__account.tutorials?.indexOf('hold-block') >= 0)
								return;
							if(!__account.tutorials)
								__account.tutorials = [];
							__account.tutorials.push('hold-block');
							let _id = 'chain-skill-2';
							const _cs = document.getElementById(_id);
							if(hasClass(_cs, 'v-none'))
								_id = 'chain-skill-4';
							_game.suspended = 1;
							focusMe('#' + _id, function() {
								removeFocus();
								delete _game.suspended;
								delete mainCharacter.disableKeyboard;
								mainCharacter.still = mainCharacter.immobilize = false;
								mainCharacter.enableSkills();
								mainCharacter.animate(mainCharacter.chains[1].key, 1);
								mainCharacter.counterLearned = 1;
							}, null, getLangData('Hold block before attack or press here after attack to make counterattack'))
						}
					},
					{
						when: function() {
							return !mainCharacter.curious && (mainCharacter.LEFT + platformX) < (episode.width - _canvas.width)
						},
						do: function() {
							mainCharacter.curious = 1;
							createBubbleText({
								id: 998,
								location: { map: episode.id }, ms: 2500,
								owner: mainCharacter.key,
								text: "What's going on there?",
							});
						}
					},
					{
						when: function() {
							return episode.phase === undefined && mainCharacter.targetedBy;
						},
						do: function() {
							episode.phase = 0;
							const _rider = episode.enemies.find(x => x.enemy && x.grade > 1);
							if(_rider) {
								createBubbleText({
									id: 999,
									location: { map: episode.id }, ms: 2000,
									owner: _rider.key,
									text: "Intruder!",
								});
								_rider.setAutoTarget(mainCharacter);
								episode.removeLocationHand();
								episode.pauseBgMusic(1);
								episode.createBgMusic(null, null, null, 'story1-forest', .5);
								episode.playBgMusic();
							}
						}
					},
					{
						when: function() {
							return episode.phase === 1 && mainCharacter.left <= 0 && platformX <= 0;
						},
						do: function() {
							delete episode.phase;
							__storyTell = new story(2, function() {
								switchStoryScene();
							}, null, 'Our heroes take shelter in a camp, unaware that they are being followed');
						}
					}
				],
				mobs: [
					{
						id: 5,
						minX: 1760,
						maxX: 1760,
						sight: 0,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .7);
						},
						minLevel: 1,
						maxLevel: 1
					},
					{
						id: 50,
						minX: 1900,
						maxX: 1900,
						sight: 1,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .82);
						},
						minLevel: 1,
						maxLevel: 1
					},
					{
						id: 66,
						minX: 1500,
						maxX: 1500,
						sight: 25,
						count: 1,
						grade:2,
						groupId: 5,
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(10,  70) /  100));
						}
					},
					{
						id: 49,
						minX: 1200,
						maxX: 1200,
						sight: 15,
						count: 1,
						minLevel: 1,
						experience: 0,
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(10,  70) /  100));
						},
						maxLevel: 1,
						groupId: 5,
						hp: 100
					},
					{
						id: 19,
						minX: 1800,
						maxX: 1800,
						sight: 15,
						count: 1,
						minLevel: 1,
						maxLevel: 1,
						groupId: 5,
						experience: 0,
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(10,  70) /  100));
						},
						hp: 100
					},
					{
						id: 61,
						minX: 1050,
						maxX: 1050,
						count: 1,
						experience: 0,
						yPosition: function() {
							return MathRound(groundheight * .96);
						}
					},
					{
						id: 64,
						minX: 1130,
						maxX: 1130,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .95);
						}
					},
					{
						id: 63,
						minX: 860,
						maxX: 860,
						yPosition: function() {
							return MathRound(groundheight * .8);
						},
						count: 1
					},
					{
						id: 62,
						minX: 1375,
						maxX: 1375,
						yPosition: function() {
							return MathRound(groundheight * .92);
						},
						count: 1
					},
					{
						id: 63,
						minX: 2280,
						maxX: 2280,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .71);
						},
						props: {
							noLoot: true,
							experience: 0,
							reversed: true,
							immobilize: true,
							direction: 'left'
						}
					},
					{
						id: 67,
						minX: 550,
						maxX: 550,
						count: 1,
						direction:'right',
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							npc: 'druid',
							noLoot: true,
							experience: 0,
							disabled: true,
							solid: true,
							noDirection: true
						}
					},
					{
						id: 60,
						minX: 2445,
						maxX: 2445,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .7);
						},
					},
					{
						id: 65,
						minX: 1900,
						maxX: 1900,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .7);
						}
					}
				],
				// mobs: [
				// 	{
				// 		id: 3,
				// 		minX: 900,
				// 		maxX: 5900,
				// 		count: 10,
				// 		attackAfterHit: true
				// 	}
				// ],
				start: function() {
					//setCharacterLevel(3);
					removeCoopCharacter(1);
					const _char = addCoopCharacter(null, 'arc');
					_char.direction = 'right';
					_char.left = mainCharacter.SCREENLEFT + platformX - MathRound(1.5 * mainCharacter.WIDTH);
					_char.platformX = platformX;
					_char.yPosition = MathRound(.5 * groundheight);
					mainCharacter.immobilize = true;
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.disableKeyboard = true;
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 991,
									location: { map: episode.id }, ms: 1000,
									owner: mainCharacter.key,
									text: "Are you ok?"
								});
							},
							ms: 1100
						},
						{
							do: function() {
								createBubbleText({
									id: 992,
									location: { map: episode.id }, ms: 2000,
									owner: _char.key,
									text: "I'm still in one piece"
								});
							},
							ms: 2300
						},
						{
							do: function() {
								episode.playSound({key:'femalepain', end: function() {
									_char.direction = 'left';
									createBubbleText({
										id: 993,
										location: { map: episode.id }, ms: 1600,
										owner: _char.key,
										text: "Someone need help"
									});
								}});
							},
							ms: 4600
						},
					], 5600, function() {
						mainCharacter.immobilize = false;
						delete mainCharacter.disableKeyboard;
						takeQuest(0, 1, null, null, 1);
						episode.showLocationHand('left');
						mainCharacter.solid = true;
						episode.enemies.filter(x => x.class === 'object' && x.id !== 5).forEach(x => x.solid = true);
						episode.hasSolid = true;
					});
				}
			},
			{
				map: 1,
				save: true,
				from: 'right',
				startWith: 1,
				// actions: [
				// 	{
				// 		when: function(){
				// 			return (episode.phase === 1) && document.querySelector('#map-location-106');
				// 		},
				// 		do: function() {
				// 			episode.phase = 2;
				// 			if(__account.tutorials?.indexOf('map-location') >= 0)
				// 				return;
				// 			if(!__account.tutorials)
				// 				__account.tutorials = [];
				// 			__account.tutorials.push('map-location');
				// 			mainCharacter.still = true;
				// 			removeFocus();
				// 			focusMe('#map-location-106' , function() {
				// 				removeFocus();
				// 				switchStoryScene();
				// 				hideMyMenu();
				// 			});
				// 		}
				// 	}
				// ],
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1235,
						maxX: 1235,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
								_e.swapAnimation('idle');
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					// {
					// 	id: 58,
					// 	minX: 1900,
					// 	maxX: 1900,
					// 	count: 1,
					// 	do: function(_e) {
					// 		_e.npc = true;
					// 		_e.friendly = true;
					// 		_e.enemy = false;
					// 		_e.reversed = true;
					// 		_e.direction = 'left';
					// 	},
					// 	yPosition: function() {
					// 		return groundheight;
					// 	}
					// }
				],
				start: function() {
					if(episode && episode.bgMusic)
						episode.pauseBgMusic();
					if(episode && episode.bgSound)
						episode.pauseAmbianceMusic();
					const _princess = summonMob(58, MathRound((mainCharacter.SCREENLEFT + mainCharacter.WIDTH + platformX) / __zoom), MathRound(.33 * groundheight), mainCharacter.level);
					_princess.friendly = _princess.invulnerable = true;
					_princess.still = _princess.immobilize = false;
					_princess.direction = 'left';
					//goToQuest(6);
					removeCoopCharacter(1);
					const _char = addCoopCharacter(null, 'arc');
					_char.direction = 'left';
					_char.left = mainCharacter.SCREENLEFT + platformX + mainCharacter.WIDTH;
					_char.platformX = platformX;
					_char.yPosition = MathRound(.66 * groundheight);
					completeQuest();
				}
			},
			getLobbyScene()
		]
	},
	{
		id: 3,
		order: 3,
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		ticket: 2,
		list:true,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'necklace', count:1 },
			{ key: 'gem', grade: 1, type: 'random', count:1, chance:50 },
			{ key: 'gold', count: 6000 },
			{ key: 'exp', count: 1200 }
		],
		quests: [
			{
				id: 1,
				names: {
					en: 'Gather Tails',
					tr: 'Kuyruk Topla'
				},
				dialogId: 6,
				descriptions: {
					en: 'Tails Gathered',
					tr: 'Kuyruk Toplandı'
				},
				owner: 'wizard',
				minLevel: 1,
				loots: [
					{
						enemy: [28],
						limit: 10,
						key: 'tail',
						type: 'quest-item',
						chanceRate: 50
					}
				],
				maps: [106],
				done: function() {
					if(__account.questStatus.lastStoryFinishTime)
						return;
					episode.enemies.forEach(x => {
						if(!x.main && x.stopSpawn)
							x.stopSpawn();
					});
					if(episode.respawners)
						episode.respawners = [];
					// focusMe('#quest-status', function() {
					// 	addClass(_gameUI, 'disable-ui');
					// 	removeFocus();
					// 	switchBookPage(3,1);
					// }, 1);
					__account.questStatus.lastStoryFinishTime = _gameTick;
					if(__account.tutorials?.indexOf('quest-world-map111') >= 0)
						return;
					if(!__account.tutorials)
						__account.tutorials = [];
					__account.tutorials.push('quest-world-map111');
					focusMe('#world-mini-map-area', function() {
						episode.phase = 1;
						addClass(_gameUI, 'disable-ui');
						removeFocus();
						switchBookPage(3, 3);
						episode.enemies.filter(x => x.standBy());
					}, 1);
				},
				complete: function() {
					__storyPlaying = false;
					installStoryFinish();
				}
			}
		],
		title: {
			en: "Check Back",
			tr: "Tekrar Kontrol Etmek"
		},
		description: {
			en: "Our heroes revisit the ruins of the destroyed castle to find one of the necessary materials.",
			tr: "Gerekli malzemelerden birini bulabilmek için kahramanlarımız yıkılan kale enkazına tekrar ziyarette bulunur"
		},
		boss: "wizard",
		minLevel: 3,
		scenes: [
			{
				map: 106,
				from: 'left',
				startWith: 2,
				start: function(){
					takeQuest(0, 1, null, null, 1);
					removeClass(_gameUI, 'disable-ui');
					removeCoopCharacter(1);
				},
				actions: [
					{
						when: function(){
							return (episode.phase === 1) && document.querySelector('#map-location-1');
						},
						do: function() {
							episode.phase = 2;
							removeFocus();
							focusMe('#map-location-1' , function() {
								removeFocus();
								switchStoryScene();
								hideMyMenu();
							}, null, null, null, 1);
						}
					}
				],
				mobs: [
					{
						id: 28,
						minX: 800,
						maxX: 1200,
						count: 3,
						sight: 30,
						groupId: 1,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 1800,
						maxX: 2200,
						count: 3,
						sight: 30,
						groupId: 2,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 2800,
						maxX: 3200,
						count: 3,
						sight: 30,
						groupId: 3,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 3800,
						maxX: 4200,
						count: 3,
						sight: 30,
						groupId: 4,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 4800,
						maxX: 5200,
						count: 3,
						sight: 30,
						groupId: 5,
						spawn: 10,
						attackAfterHit: true
					}
				]
			},
			{
				map: 1,
				from: 'right',
				startWith: 1,
				start: function() {
					removeClass(_gameUI, 'disable-ui');
					takeQuest(0, 1, null, 'end', 1);
					episode.drawSpriteObjects2('wizard', 1);
					episode.endTime = __account.questStatus.lastStoryFinishTime ?? _gameTick;
					if(__account.questStatus.lastStoryFinishTime)
						delete __account.questStatus.lastStoryFinishTime;
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			getLobbyScene()
		]
	},
	{
		id:4,
		order:4,
		ticket:4,
		disableWorldMap: true,
		minLevel: 4,
		list: true,
		bonus: true,
		boss:'wan',
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 60000, title: 'Finish in time',
				when: function(_item) {
					 /*!isMissionFailed(0) && !isMissionFailed(2) &&*/
					return ((__story.endTime ?? _gameTick) - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'combo', value: 50, title: 'Make 50x combo', when: function(_item) {
				return episode.hitCount >= _item.value;
			}}
		],
		title: {
			en: 'Gold Mine',
			tr: 'Altın Madeni'
		},
		description: {
			en: "Destroy the wan in time and gather treasure in the end. Each damage will add bonus gold reward.",
			tr: "Aracı zamanında parçala ve hazineye sahip ol. Her verdiğin hasar bonus altın kazandıracak."
		},
		rewards: [
			{ key: 'item', grade: 2, type: 'helmet', count:1 },
			{ key: 'gem', grade: 1, type: 'random', count:1, chance:50 },
			{ key: 'gold', count: 13000 },
			{ key: 'exp', count: 1300 }
		],
		scenes: [
			{
				map: 9999,
				startsWith: 1,
				save: true,
				start: function() {
					const _wagon = episode.enemies.find(x => x.id === 2000);
					_wagon.maxHP = _wagon.MAXHP = 300 + ((6 - __account.difficulty) * 300);

					//_wagon.health = _wagon.maxHP = _wagon.MAXHP = 1;

					_wagon.setHealth(_wagon.maxHP);
					_wagon.noDirection = _wagon.harmless = true;
					_wagon.experience = 0;
					mainCharacter.solid = true;
				}
			},
			getLobbyScene()
		],
		quests: [
			{
				id: 1,
				key: '',
				names: {
					en: 'Destroy the wan',
					tr: 'Aracı parçala'
				},
				descriptions: {
					en: 'Wan destroyed',
					tr: 'Araç parçalandı'
				},
				owner: 'system',
				minLevel: 1,
				kills: [{ enemy: [2000], limit: 1, key: 'Wan' }],
				maps: [9999]
			},
		]
	},
	{
		id: 5,
		order: 5,
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		ticket: 2,
		list:true,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'leggings', count:1 },
			{ key: 'gem', grade: 1, type: 'random', count:1, chance:50 },
			{ key: 'gold', count: 7000 },
			{ key: 'exp', count: 1400 }
		],
		quests: [
			{
				id: 1,
				key: 'wasp',
				dialogId:7,
				names: {
					en: 'Pick Lotus',
					tr: 'Nilüfer Topla'
				},
				descriptions: {
					en: 'Lotus Picked',
					tr: 'Nilüfer Toplandı'
				},
				owner: 'druid',
				minLevel: 1,
				loots: [
					{
						object: ['lotus'],
						limit: 5,
						key: 'lotus',
						type: 'quest-item',
						chanceRate: 100
					}
				],
				maps: [11],
				done: function() {
					__account.questStatus.lastStoryFinishTime = _gameTick;
				},
				complete: function() {
					__storyPlaying = false;
					installStoryFinish();
				}
			}
		],
		title: {
			en: "Garden Of Evil",
			tr: "İblisin Bahçesi"
		},
		description: {
			en: "Our heroes must gain more power before the Cyclops' attack. There's only one recipe for this power. And it's time to find the next ingredient listed in that recipe. The swamp demons will be their torment during this mission.",
			tr: "Kahramanlarımızın, Tepegöz' ün saldırısı öncesinde daha fazla güce kavuşmaları gerekmektedir. Bu güce ulaşmak için tek bir tarif vardır. Ve bu tarifte yazılı olan malzemelerden bir sonrakini bulmaktadır sıra. Bataklık iblisleri bu görevde ızdırapları olacaktır"
		},
		boss: "druid",
		minLevel: 6,
		scenes: [
			{
				map: 11,
				from: 'left',
				startWith: 1,
				start: function(){
					takeQuest(0, 1, null, 'progress', 1);
					removeClass(_gameUI, 'disable-ui');
					removeCoopCharacter(1);
				},
				mobs: [
					{
						id: 3,
						minX: 1000,
						maxX: 1500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 1000,
						maxX: 2000,
						count: 2,
						groupId: 1,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 2000,
						maxX: 2500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 1500,
						maxX: 2500,
						count: 2,
						groupId: 2,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 3000,
						maxX: 3500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 2500,
						maxX: 3500,
						count: 2,
						groupId: 3,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 4000,
						maxX: 4500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 3500,
						maxX: 4500,
						count: 2,
						groupId: 4,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 5000,
						maxX: 5500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 4500,
						maxX: 5500,
						count: 2,
						groupId: 5,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 79,
						minX: 1500,
						maxX: 5500,
						count: 5,
						props: {
							npc: 'lotus'
						}
					}
				]
			},
			{
				map: 1,
				save: true,
				from: 'right',
				startWith: 1,
				start: function() {
					removeClass(_gameUI, 'disable-ui');
					takeQuest(0, 1, null, 'end', 1);
					episode.drawSpriteObjects2('druid', 1);
					episode.endTime = __account.questStatus.lastStoryFinishTime ?? _gameTick;
					if(__account.questStatus.lastStoryFinishTime)
						delete __account.questStatus.lastStoryFinishTime;
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			getLobbyScene()
		]
	},
	{
		id: 6,
		order: 6,
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		ticket: 2,
		list:true,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'bracers', count:1 },
			{ key: 'gem', grade: 1, type: 'random', count:1, chance:50 },
			{ key: 'gold', count: 7500 },
			{ key: 'exp', count: 1500 }
		],
		quests: [
			{
				id: 1,
				dialogId: 8,
				names: {
					en: 'Skin Wing',
					tr: 'Kanat Yüz'
				},
				descriptions: {
					en: 'Wings Skinned',
					tr: 'Kanat Yüzüldü'
				},
				owner: 'blacksmith',
				minLevel: 1,
				loots: [
					{
						object: ['wing'],
						limit: 10,
						key: 'wing',
						type: 'quest-item',
						chanceRate: 100
					}
				],
				maps: [36],
				complete: function() {
					setTimeout(() => {
						__storyTell = new story(4, function() {
							__storyPlaying = false;
							installStoryFinish();
						}, null, 'Everything needed for the potion recipe was ready. Our heroes hoped it would work');
					}, 100);
				},
				done: function() {
					__account.questStatus.lastStoryFinishTime = _gameTick;
					episode.enemies.forEach(x => {
						if(!x.main && x.stopSpawn)
							x.stopSpawn();
					});
					if(episode.respawners)
						episode.respawners = [];
				}
			}
		],
		title: {
			en: "Dark Wings",
			tr: "Karanlık Kanatlar"
		},
		description: {
			en: "Our heroes hunt bats in a dark cave. A substance found in the bats' wings will increase the potion's effectiveness. Let's see if our heroes can get what they want and escape this cave alive.",
			tr: "Kahramanlarımız ışıktan yoksun bir mağarada yarasa avına çıkar, Yarasaların kanatlarında bulunan bir malzeme sayesinde güç iksiri etkisini arttıracaktır. Bakalım kahramanlarımız bu mağaradan istediklerini elde ederek canlı çıkabilecek mi"
		},
		boss: "blacksmith",
		minLevel: 8,
		scenes: [
			{
				map: 36,
				from: 'left',
				startWith: 1,
				actions: [
					{
						when: function() {
							return episode.phase === 1 && __account.commonInventory.length > 3;
						},
						do: function() {
							episode.phase = 2;
							focusMe('.enemy-profile', function() {
								episode.playSound({ key: 'click' });
								episode.still = false;
								episode.enemies.filter(x => x.stop).forEach(x => {
									x.still = x.stop = false;
								});
								mainCharacter.still = mainCharacter.immobilize = false;
								delete mainCharacter.disableKeyboard;
								mainCharacter.enableSkills();
							}, false, getLangData('You can use these single-use abilities anytime. It allows you to deal with crowd'), 1);
						}
					}
				],
				mobs: [
					{
						id: 4,
						minX: 560,
						maxX: 560,
						yPosition: function() { return MathRound(groundheight * .5); },
						count: 1,
						do: function(_e){
							const _lootFrameIndex = _e.animations.dead.frames.findIndex(x => x.loot || x.loots);
							if(_lootFrameIndex !== -1) {
								const _lootFrame = _e.animations.dead.frames[_lootFrameIndex];
								_lootFrame.loots = [{
									key: 'electricbolt',
									type: 'common'
								},
								{
									key: 'electricbolt',
									type: 'common'
								},
								{
									key: 'electricbolt',
									type: 'common'
								},
								{
									key: 'electricbolt',
									type: 'common'
								}];
							}
						}
					},
					{
						id: 18,
						minX: 2000,
						maxX: 5500,
						sight: 15,
						atk: 5,
						def: 20,
						count: 20,
						props: {
							skinable: true,
							npcKey: 'wing'
						}
					},
					{
						id: 85,
						minX: 2720,
						maxX: 2720,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight);
						}
					},
					{
						id: 10,
						minX: 2720,
						maxX: 3000,
						count: 10,
						groupId: 1,
						sight: 15,
						zoom: .65,
						do: function(_e){
							_e.skipHealthBar = true;
						},
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(5, 10) / 10));
						}
					}
				],
				start: function() {
					takeQuest(0, 1, null, 'progress', 1);
					removeClass(_gameUI, 'disable-ui');
					removeCoopCharacter(1);
					episode.still = true;
					episode.enemies.filter(x => x.enemy && !x.still).forEach(x => {
						x.still = x.stop = true;
					});
					const _spider = summonMob(10, MathRound((_canvas.width  * .4) * __zoom),
						MathRound(groundheight / 5));
					_spider.puppetMode = true;
					_spider.direction = 'right';
					_spider.skipHealthBar = true;
					_spider.stepXRate *= 2;
					_spider.stepX *= 2;
					_spider.action = {
						command: 'move',
						to: episode.width * __zoom,
					};
					mainCharacter.standBy();
					createBubbleText({
						id: 1,
						location: { map: episode.id }, ms: 2500,
						owner: mainCharacter.key,
						text: "Huh? What was that?",
						onend: function() {
							_spider.remove = true;
							mainCharacter.immobilize = false;
							delete mainCharacter.disableKeyboard;
						}
					});
					__account.commonInventory = [];
					_client.saveState();
					episode.phase = 1;
					cssAnimations.lightradius2(mainCharacter, 3);
					episode.after = function() {
						delete cssAnimationProps.lightradius2;
					}
				}
			},
			{
				map: 1,
				from: 'right',
				save: true,
				startWith: 1,
				start: function() {
					removeClass(_gameUI, 'disable-ui');
					takeQuest(0, 1, null, 'end', 1);
					episode.drawSpriteObjects2('blacksmith', 1);
					episode.endTime = __account.questStatus.lastStoryFinishTime ?? _gameTick;
					if(__account.questStatus.lastStoryFinishTime)
						delete __account.questStatus.lastStoryFinishTime;
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			getLobbyScene()
		]
	},
	{
		id: 7,
		order: 7,
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		ticket: 2,
		list:true,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'boots', count:1 },
			{ key: 'fragment', name: 'bomber', minCount:1, maxCount:5, chance:50 },
			{ key: 'gold', count: 8000 },
			{ key: 'exp', count: 1600 }
		],
		quests: [
			{
				id: 1,
				dialogId: 9,
				names: {
					en: 'Find Receipt',
					tr: 'Tarifi Bul'
				},
				descriptions: {
					en: 'Receipt Found',
					tr: 'Tarif Bulundu'
				},
				owner: 'blacksmith',
				minLevel: 1,
				loots: [
					{
						enemy: [75],
						limit: 1,
						key: 'receipt',
						type: 'quest-item',
						chanceRate: 100,
						command:'Find'
					}
				],
				maps: [41],
				done: function() {
					__account.questStatus.lastStoryFinishTime = _gameTick;
				},
				after:function() {
					const _bs = episode.enemies.find(x => x.class === 'blacksmith');
					mainCharacter.yPosition = groundheight;
					mainCharacter.standBy();
					createBubbleText({
						id: 1,
						location: { map: episode.id }, ms: 2000,
						owner: _bs.key,
						text: "Watch this!",
						onend: function() {
							createBubbleText({
								id: 2,
								location: { map: episode.id }, ms: 2500,
								owner: mainCharacter.key,
								text: "This is so strange!",
								onend: function() {
									createBubbleText({
										id: 3,
										location: { map: episode.id }, ms: 2500,
										owner: _bs.key,
										text: "The time has come"
									});
								}
							});
							startQuake(1,1);
							episode.playSound({path:'./images/sounds/bulls-run2.mp3?x=2', volume: 1 });
							mainCharacter.direction = 'right';
							let _finishes = 0, _limit = 0;
							const _stopBull = function(_e, _l) {
								_e.remove = true;
								_finishes++;
								if(_finishes === _l) {
									stopQuake();
									cssAnimations.black(null, 3000, getLangData('Village people move to a safe place'), function() {
										//switchStoryScene();
										__storyPlaying = false;
										installStoryFinish();
									});
								}
							}
							for(let i = 0; i < 6; i++) {
								_limit++;
								const _bull1 = summonMob(82,
									MathRound((_canvas.width + platformX) / __zoom),
									MathRound(groundheight * ((i % 2) == 0 ? .3 : .2)));
								_bull1.invulnerable = _bull1.puppetMode = _bull1.skipHealthBar = true;
								_bull1.direction = _bull1.moveDirection = 'left';
								_bull1.left += MathRound(i * _bull1.WIDTH * (getRandomValue2(5, 15) / 10));
								const _bull2 = summonMob(82,
									MathRound((_canvas.width + platformX) / __zoom),
									MathRound(groundheight * ((i % 2) == 0 ? .7 : .5)));
								_bull2.invulnerable = _bull2.puppetMode = _bull2.skipHealthBar = true;
								_bull2.direction = _bull2.moveDirection = 'left';
								_bull2.left += MathRound(i * _bull2.WIDTH* (getRandomValue2(5, 15) / 10));
								_limit++;
								_bull1.action =  {
									command: 'move',
									to: -1 * _bull1.WIDTH,
									after: function(_e) {
										_stopBull(_e, _limit);
									}
								};
								_bull2.action =  {
									command: 'move',
									to: -1 * _bull1.WIDTH,
									after: function(_e) {
										_stopBull(_e, _limit);
									}
								};
								if((i % 2) == 0)
									continue;
								const _bull3 = summonMob(82,
									MathRound((_canvas.width + platformX) / __zoom),
									MathRound(groundheight * .8));
								_bull3.invulnerable = _bull3.puppetMode = _bull3.skipHealthBar = true;
								_bull3.direction = _bull3.moveDirection = 'left';
								_bull3.left += MathRound(i * _bull3.WIDTH* (getRandomValue2(5, 15) / 10));
								_limit++;
								_bull3.action =  {
									command: 'move',
									to: -1 * _bull1.WIDTH,
									after: function(_e) {
										_stopBull(_e, _limit);
									}
								};
							}
						}
					});
				}
			}
		],
		title: {
			en: "Genious Troll",
			tr: "Dahi Yaratık"
		},
		description: {
			en: "Our heroes need engineering to finish Cyclops, and only way is planting explosives for high damage, the genius troll in cave have some recipes which Temir Han may help how to set some traps.",
			tr: "Kahramanlarımızın Tepegöz' e ölümcül vuruşu yapabilmesi için biraz mühendisliğe ihtiyaçları var ve bunun tek yolu yüksek hasar veren patlayıcılar kullanmak. Dahi mağara yaratığının elindeki planları bulup getirebilirlerse belki Temir Han' ın yardımı dokunabilir"
		},
		boss: "bomber",
		minLevel: 10,
		scenes: [
			{
				map: 41,
				from: 'left',
				startWith: 1,
				start: function() {
					takeQuest(0, 1, null, 'progress', 1);
					removeClass(_gameUI, 'disable-ui');
					removeCoopCharacter(1);
				},
				mobs: [
					{
						id: 75,
						minX: 5100,
						count: 1,
						sight: 100,
						grade: 5
					},
					{
						id: 77,
						minX: 1200,
						maxX: 1200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 1300,
						maxX: 1300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 2200,
						maxX: 2200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 2300,
						maxX: 2300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 3200,
						maxX: 3200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 3300,
						maxX: 3300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 4200,
						maxX: 4200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 4300,
						maxX: 4300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 5200,
						maxX: 5200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 5300,
						maxX: 5300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 76,
						minX: 1500,
						maxX: 5000,
						count: 10,
						sight: 50
					}
				]
			},
			{
				map: 1,
				from: 'right',
				startWith: 1,
				start: function() {
					removeClass(_gameUI, 'disable-ui');
					takeQuest(0, 1, null, 'end', 1);
					episode.drawSpriteObjects2('blacksmith', 1);
					episode.endTime = __account.questStatus.lastStoryFinishTime ?? _gameTick;
					if(__account.questStatus.lastStoryFinishTime)
						delete __account.questStatus.lastStoryFinishTime;
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			getLobbyScene()
		]
	},
	{
		id: 8,
		order: 8,
		disableWorldMap: true,
		loadingCharacterIds: [47],
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 20 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'heart', value: 1, title: 'Stay above 1 heart', when: function(_item) {
				return mainCharacter.heartCount > _item.value;
			}}
		],
		ticket: 4,
		bonus: 'exp',
		list:true,
		startScene: 14,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'chest', count:1 },
			{ key: 'fragment', name: 'sisters', minCount:1, maxCount:5, chance:50 },
			{ key: 'gold', count: 8500 },
			{ key: 'exp', count: 3400 }
		],
		quests: [
			{
				id: 1,
				key: '',
				names: {
					en: 'Eliminate Guards',
					tr: 'Nöbetçileri Yok Et'
				},
				descriptions: {
					en: 'Guards Eliminated',
					tr: 'Nöbetçi Yok Edildi'
				},
				owner: 'system',
				minLevel: 1,
				kills: [{ enemy: [51,52], limit: 24, key: 'Guard' }],
				maps: [105],
				after: function() {
					episode.enemies.forEach(x => x.spawnAsGroup = x.respawnAfterSeconds = x.spawn = undefined);
					updateQuestArea();
					__account.questStatus.quest = undefined;
					_client.upgradeQuestStatus();
					warn('<div class="flex heading toast-with-banner ink" style="position:relative;width:auto"><img style="height:20vh;z-index:-1" src="./images/icons/txtbg.png" /><div class="full flex" style="position:absolute">' + getLangData('Quest Completed') + '</div></div>');
					episode.playSound({ key: 'questdone', volume: .8 });
					episode.showLocationHand('right');
					episode.width *= 2;
					episode.moveCamera();
					episode.enemies.filter(x => !x.enemy && !x.main)?.forEach(x => x.remove = true);
					episode.phase = 2;
				}
			},
			{
				id: 2,
				names: {
					en: 'Save The Ranger',
					tr: 'Okçuyu Kurtar'
				},
				descriptions: {
					en: 'Ranger Saved',
					tr: 'Okçu Kurtarıldı'
				},
				owner: 'system',
				minLevel: 1,
				loots: [
					{
						object: ['archer'],
						limit: 1,
						noInfo: true,
						key: 'archer',
						type: 'quest-item',
						chanceRate: 100,
						command:'Save'
					}
				],
				after: function(){
					episode.enemies = episode.enemies.filter(x => x.class !== 'archer');
					removeCoopCharacter(1);
					const _char = addCoopCharacter(null, 'arc');
					_char.unarm();
					const _q = __account.questStatus.quest.loots[0];
					if(_q)
						_q.count = 1;
					getQuestRewards(__account.questStatus.quest);
					episode.playSound({ key: 'questdone', volume: .8 });
					updateQuestArea();
					episode.dialogs = [{
						id: 1,
						location: { map: episode.id }, ms: 2000,
						owner: _char.key,
						text: "We need arms now!",
						onend: function() {
							//episode.sprites.forEach(x => x.disabled = false);
							episode.phase = 1;
							takeQuest(2, 1);
							episode.showLocationHand('left');
						}
					}];
				},
				maps: [104]
			},
			{
				id: 3,
				names: {
					en: 'Find Weapons',
					tr: 'Silahları Bul'
				},
				owner: 'system',
				minLevel: 1,
				loots: [
					{
						object: ['chest'],
						limit: 1,
						key: 'sword',
						type: 'quest-item',
						chanceRate: 100,
						descriptions: {
							en: 'Sword Found',
							tr: 'Kılıç Bulundu'
						}
					},
					{
						object: ['bow'],
						limit: 1,
						key: 'bow',
						type: 'quest-item',
						chanceRate: 100,
						descriptions: {
							en: 'Bow Found',
							tr: 'Yay Bulundu'
						}
					}
				],
				maps: [104],
				after: function() {
					const _chest = episode.enemies.find(x => x.id === 56);
					if(_chest)
						_chest.animate('dead', 1);
					else {
						episode.playSound({ key: 'loot', volume: 1 });
						const _dead = episode.enemies.find(x => x.id === 78);
						if(_dead && !_dead.unarmed)
							_dead.unarm();
						const _q = __account.questStatus.quest.loots.find(x => x.key === 'bow');
						if(_q) {
							_q.count = 1;
							updateQuestArea();
							episode.dialogs = [{
								id: 2,
								location: { map: episode.id }, ms: 2000,
								owner: mainCharacter.key,
								text: "Here! Take it",
								onend: function() {
									const _archer = episode.enemies.find(x => x.class === 'archer');
									_archer.disableUnarm();
									episode.dialogs = [{
										id: 3,
										location: { map: episode.id }, ms: 2000,
										owner: _archer.key,
										text: "Got it! Thanks",
										onend: function() {
											episode.dialogs.push({
												id: 11,
												location: { map: episode.id },
												ms: 3100,
												delay: 100,
												owner: mainCharacter.key,
												text: "We need to get out of here!",
												onend: function() {
													episode.showLocationHand('right');
													episode.phase = 5;
												}
											});
										}
									}];
								}
							}];
						}
					}
				}
			},
			{
				id: 4,
				names: {
					en: 'Clear Goblins',
					tr: 'Goblinleri Temizle'
				},
				owner: 'system',
				minLevel: 1,
				kills: [{
					enemy: [19],
					limit: 5,
					descriptions: {
						en: 'Goblin Cleared',
						tr: 'Goblin Temizlendi'
					}
				},
				{ enemy: [49], limit: 1, descriptions: {
					en: 'Rogue Cleared',
					tr: 'Haydut Temizlendi'
				} },
				{ enemy: [66], limit: 1, descriptions: {
					en: 'Rider Cleared',
					tr: 'Binici Temizlendi'
				} }],
				maps: [3],
				after: function() {
					takeNextQuest();
					episode.pauseBgMusic(1);
				}
			},
			{
				id: 5,
				names: {
					en: 'Save Princess',
					tr: 'Prensesi Kurtar'
				},
				descriptions: {
					en: 'Princess Saved',
					tr: 'Prenses Kurtarıldı'
				},
				owner: 'system',
				minLevel: 1,
				loots: [
					{
						object: ['druid'],
						limit: 1,
						noInfo: true,
						key: 'druid',
						type: 'quest-item',
						chanceRate: 100,
						command:'Save'
					}
				],
				after: function() {
					episode.pauseBgMusic(1);
					const _druid = episode.enemies.find(x => x.id === 67);
					_druid.remove = true;
					getQuestRewards(__account.questStatus.quest);
					episode.playSound({ key: 'questdone', volume: .8 });
					updateQuestArea();
					const _princess = summonMob(58, MathRound(mainCharacter.SCREENLEFT / __zoom), mainCharacter.yPosition, mainCharacter.level);
					_princess.friendly = _princess.invulnerable = true;
					_princess.still = _princess.immobilize = false;
					if(mainCharacter.direction === 'left') {
						_princess.direction = 'right';
						_princess.left -= (_princess.WIDTH + 10);
					}
					else {
						_princess.direction = 'left';
						_princess.left += (mainCharacter.WIDTH + 10);
					}
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.animate('idle', 1);
					mainCharacter.immobilize = mainCharacter.disableKeyboard = true;
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 2,
									location: { map: episode.id }, ms: 2000,
									owner: _princess.key,
									text: "Thank you my hero"
								});
							},
							ms: 0
						},
						{
							do: function() {
								createBubbleText({
									id: 3,
									location: { map: episode.id }, ms: 2500,
									owner: mainCharacter.key,
									text: "We need somewhere to hide!"
								});
							},
							ms: 2600
						},
						{
							do: function() {
								createBubbleText({
									id: 4,
									location: { map: episode.id }, ms: 2500,
									owner: _princess.key,
									text: "I know a place, lets go..."
								});
							},
							ms: 5200
						}
					], 7800, function() {
						episode.showLocationHand('left');
						episode.phase = 1;
						mainCharacter.immobilize = false;
						delete mainCharacter.disableKeyboard;
					});
				},
				maps: [3]
			},
			{
				id: 6,
				names: {
					en: 'Gather Tails',
					tr: 'Kuyruk Topla'
				},
				descriptions: {
					en: 'Tails Gathered',
					tr: 'Kuyruk Toplandı'
				},
				owner: 'wizard',
				minLevel: 1,
				loots: [
					{
						enemy: [28],
						limit: 10,
						key: 'tail',
						type: 'quest-item',
						chanceRate: 50
					}
				],
				maps: [106],
				done: function() {
					episode.enemies.forEach(x => {
						if(!x.main && x.stopSpawn)
							x.stopSpawn();
					});
					if(episode.respawners)
						episode.respawners = [];
					// focusMe('#quest-status', function() {
					// 	addClass(_gameUI, 'disable-ui');
					// 	removeFocus();
					// 	switchBookPage(3,1);
					// }, 1);
					focusMe('#world-mini-map-area', function() {
						episode.phase = 1;
						addClass(_gameUI, 'disable-ui');
						removeFocus();
						switchBookPage(3, 3);
					}, 1);
				},
				before: function() {
					const _p = episode.enemies.find(x => x.class === 'druid');
					if(!_p)
						return;
					const _a = episode.enemies.find(x => x.class === 'archer');
					if(!_a)
						return;
					_p.yPosition = groundheight;
					_p.still = _p.immobilize = true;
					_p.left = MathRound(1900 * __zoom);
					_p.npc = true;
					_p.platformX = platformX;
					_p.friendly = true;
					_p.enemy = false;
					_p.animate('idle', 1);
					_p.direction = 'left';
					mainCharacter.direction = 'right';
					_a.left = mainCharacter.SCREENLEFT + platformX + MathRound(1.5 * mainCharacter.WIDTH);
					_a.yPosition = mainCharacter.yPosition;
					mainCharacter.disableKeyboard = true;
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.standBy();
					_a.standBy();
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 991,
									location: { map: episode.id }, ms: 2000,
									owner: mainCharacter.key,
									text: "You should stay with them"
								});
							},
							ms: 2000
						},
						{
							do: function() {
								createBubbleText({
									id: 992,
									location: { map: episode.id }, ms: 2000,
									owner: _a.key,
									text: "Ok, but be careful"
								});
							},
							ms: 4100
						},
					], 4200, function() {
						focusMe('#world-mini-map-area', function() {
							episode.phase = 1;
							addClass(_gameUI, 'disable-ui');
							removeFocus();
							switchBookPage(3, 3);
						});
					});
				}
			},
			{
				id: 7,
				key: 'wasp',
				names: {
					en: 'Pick Lotus',
					tr: 'Nilüfer Topla'
				},
				descriptions: {
					en: 'Lotus Picked',
					tr: 'Nilüfer Toplandı'
				},
				owner: 'druid',
				minLevel: 1,
				loots: [
					{
						object: ['lotus'],
						limit: 5,
						key: 'lotus',
						type: 'quest-item',
						chanceRate: 100
					}
				],
				maps: [11]
				// after: function() {
				// 	setCharacterLevel(7);
				// }
			},
			{
				id: 8,
				names: {
					en: 'Skin Wing',
					tr: 'Kanat Yüz'
				},
				descriptions: {
					en: 'Wings Skinned',
					tr: 'Kanat Yüzüldü'
				},
				owner: 'wizard',
				minLevel: 1,
				loots: [
					{
						object: ['wing'],
						limit: 10,
						key: 'wing',
						type: 'quest-item',
						chanceRate: 100
					}
				],
				maps: [36],
				done: function() {
					episode.enemies.forEach(x => {
						if(!x.main && x.stopSpawn)
							x.stopSpawn();
					});
					if(episode.respawners)
						episode.respawners = [];
				}
			},
			{
				id: 9,
				names: {
					en: 'Find Receipt',
					tr: 'Tarifi Bul'
				},
				descriptions: {
					en: 'Receipt Found',
					tr: 'Tarif Bulundu'
				},
				owner: 'blacksmith',
				minLevel: 1,
				loots: [
					{
						enemy: [75],
						limit: 1,
						key: 'receipt',
						type: 'quest-item',
						chanceRate: 100,
						command:'Find'
					}
				],
				maps: [41],
				after:function() {
					const _bs = episode.enemies.find(x => x.class === 'blacksmith');
					mainCharacter.yPosition = groundheight;
					mainCharacter.standBy();
					createBubbleText({
						id: 1,
						location: { map: episode.id }, ms: 2000,
						owner: _bs.key,
						text: "Watch this!",
						onend: function() {
							createBubbleText({
								id: 2,
								location: { map: episode.id }, ms: 2500,
								owner: mainCharacter.key,
								text: "This is so strange!",
								onend: function() {
									createBubbleText({
										id: 3,
										location: { map: episode.id }, ms: 2500,
										owner: _bs.key,
										text: "The time has come"
									});
								}
							});
							startQuake(1,1);
							episode.playSound({path:'./images/sounds/bulls-run2.mp3?x=2', volume: 1 });
							mainCharacter.direction = 'right';
							let _finishes = 0, _limit = 0;
							for(let i = 0; i < 6; i++) {
								_limit++;
								const _bull1 = summonMob(82,
									MathRound((_canvas.width + platformX) / __zoom),
									MathRound(groundheight * ((i % 2) == 0 ? .3 : .2)));
								_bull1.invulnerable = _bull1.puppetMode = _bull1.skipHealthBar = true;
								_bull1.direction = _bull1.moveDirection = 'left';
								_bull1.left += MathRound(i * _bull1.WIDTH * (getRandomValue2(5, 15) / 10));
								const _bull2 = summonMob(82,
									MathRound((_canvas.width + platformX) / __zoom),
									MathRound(groundheight * ((i % 2) == 0 ? .7 : .5)));
								_bull2.invulnerable = _bull2.puppetMode = _bull2.skipHealthBar = true;
								_bull2.direction = _bull2.moveDirection = 'left';
								_bull2.left += MathRound(i * _bull2.WIDTH* (getRandomValue2(5, 15) / 10));
								_limit++;
								_bull1.action =  {
									command: 'move',
									to: -1 * _bull1.WIDTH,
									after: function(_e) {
										_e.remove = true;
										_finishes++;
										if(_finishes === _limit) {
											stopQuake();
											cssAnimations.black(null, 3000, getLangData('Village people move to a safe place'), function() {
												switchStoryScene();
											});
										}
									}
								};
								_bull2.action =  {
									command: 'move',
									to: -1 * _bull1.WIDTH,
									after: function(_e) {
										_e.remove = true;
										_finishes++;
										if(_finishes === _limit) {
											stopQuake();
											cssAnimations.black(null, 3000, getLangData('Village people move to a safe place'), function() {
												switchStoryScene();
											});
										}
									}
								};
								if((i % 2) == 0)
									continue;
								const _bull3 = summonMob(82,
									MathRound((_canvas.width + platformX) / __zoom),
									MathRound(groundheight * .8));
								_bull3.invulnerable = _bull3.puppetMode = _bull3.skipHealthBar = true;
								_bull3.direction = _bull3.moveDirection = 'left';
								_bull3.left += MathRound(i * _bull3.WIDTH* (getRandomValue2(5, 15) / 10));
								_limit++;
								_bull3.action =  {
									command: 'move',
									to: -1 * _bull1.WIDTH,
									after: function(_e) {
										_e.remove = true;
										_finishes++;
										if(_finishes === _limit) {
											stopQuake();
											cssAnimations.black(null, 3000, getLangData('Village people move to a safe place'), function() {
												switchStoryScene();
											});
										}
									}
								};
							}
						}
					});
				}
			},
			{
				id: 10,
				names: {
					en: 'Defend Huts',
					tr: 'Çadırları Koru'
				},
				descriptions: {
					en: 'Huts Defended',
					tr: 'Çadır Korundu'
				},
				owner: 'system',
				minLevel: 1,
				timer: {
					ms: 1000,
					iconPath: './images/main/cyclops/avatar.png',
					after: function() {
						const _huts = episode.enemies.filter(x => x.id === 80 || x.id === 81);
						if(_huts?.[0]) {
							const _deads = _huts.find(x => x.health <= 0);
							if(!_deads?.[0]) {
								_huts.forEach(x => x.invulnerable = x.skipHealthBar = true);
								__account.questStatus.quest.loots = [
									{
										object: ['hut'],
										limit: 2,
										count:2,
										noInfo: true,
										key: 'hut',
										type: 'quest-item',
										chanceRate: 100,
										command:'Defend'
									}
								];
								getQuestRewards(__account.questStatus.quest);
								updateQuestArea();
								episode.phase = 20;
							}
						}
					}
				},
				maps: [10]
			},
			{
				id: 11,
				names: {
					en: 'Destroy Enemy',
					tr: 'Düşmanı Yok Et'
				},
				// descriptions: {
				// 	en: 'Enemy Destroyed',
				// 	tr: 'Düşman Yok Edildi'
				// },
				owner: 'system',
				minLevel: 1,
				maps: [10]
			}
		],
		title: {
			en: "More Power",
			tr: "Fazla Güç"
		},
		description: {
			en: "This stage will boost our heroes' experience to become even stronger. They will test themselves against a large crowd of enemies and race against time",
			tr: "Kahramanlarımızın daha fazla güçlenmesi için bu aşama tecrübelerini boostlayacak. Kalabalık düşman topluluğuna karşı kendilerini sınayacaklar ve bir yandan da zamana karşı yarışıyor olacaklar"
		},
		boss: "sisters",
		minLevel: 10,
		scenes: [
			{
				map: 105,
				startWith: 47,
				actions: [
					{
						when: function() {
							return episode.phase === 2 && !episode.enemies.find(x => x.class === 'king') && (mainCharacter.LEFT + platformX) >= (episode.width - (_canvas.width * .9));
							//return (episode.phase ?? 0) < 3 && !episode.enemies.find(x => x.class === 'king') && (mainCharacter.LEFT + platformX) >= 0;
						},
						do: function() {
							episode.phase = 3;
							const _king = summonMob(59, MathRound((episode.width - (episode.cWidth * .5)) / __zoom), MathRound(groundheight * .5), mainCharacter.level);
							const _princess = summonMob(58, MathRound((episode.width - (episode.cWidth * .59)) / __zoom), MathRound(groundheight * .75), mainCharacter.level);
							//const _king = summonMob(59, MathRound((_canvas.width - (_canvas.width * .25)) / __zoom), MathRound(groundheight * .5), mainCharacter.level);
							//const _princess = summonMob(58, MathRound((_canvas.width - (_canvas.width * .34)) / __zoom), MathRound(groundheight * .75), mainCharacter.level);
							_princess.invulnerable = true;
							addClass(_gameUI, 'disable-ui');
							episode.removeLocationHand();
							mainCharacter.direction = 'right';
							mainCharacter.standBy();
							mainCharacter.left = MathRound(episode.cWidth * .2);
							mainCharacter.yPosition = MathRound(groundheight * .5);
							if(mainCharacter.rageCount > 0 || mainCharacter.ultimate) {
								mainCharacter.rageCount = 0;
								mainCharacter.updateRageSkillUI();
							}
							if(mainCharacter.finishBombs)
								mainCharacter.finishBombs();
								setTimeout(function() {
									cssAnimations.vs(mainCharacter,
										{
											ms: 3000,
											enemyId: 59,
											q1: 'Get out! Smurf!',
											q2: 'Eye for an eye!'
										}, function() {
										const _goblins = [];
										__storyCutScenePlaying = 1;

										cssAnimations.film(null, [
											{
												do: function() {
													episode.dialogs = [];
													for(let i = 0; i < 2; i++) {
														const _goblin = summonMob(49, MathRound((platformX - (episode.cWidth * .25)) / __zoom), MathRound(groundheight * (.25 + (i * .5))), mainCharacter.level);
														_goblin.enemy = false;
														_goblin.level = _goblin.skipHealthBar = 1;
														_goblin.immunities = [];
														_goblin.disableSkills();
														_goblin.direction = _goblin.moveDirection = 'right';
														_goblins.push(_goblin.key);
														_goblin.action =  {
															command: 'move',
															to: 500 * __zoom,
															after: function(_e) {
																_e.immobilize = true;
																_e.animate('idle', 1);
																createBubbleText({
																	id: 11,
																	location: { map: episode.id }, ms: 1500,
																	owner: _king.key,
																	text: "You shall not pass!"
																});
															}
														}
													}
												},
												ms: 500
											},
											{
												do: function() {
													createBubbleText({
														id: 2,
														location: { map: episode.id }, ms: 2000,
														owner: mainCharacter.key,
														text: "We are here for expropriation"
													});
												},
												ms: 4800
											},
											{
												do: function() {
													createBubbleText({
														id: 13,
														location: { map: episode.id }, ms: 2000,
														owner: _king.key,
														text: "You freaks will pay!"
													});
												},
												ms: 6900
											},
											{
												do: function() {
													createBubbleText({
														id: 4,
														location: { map: episode.id }, ms: 2500,
														owner: _princess.key,
														leftGap: -200,
														text: "Get your strength my lord"
													});
												},
												ms: 9000
											},
											{
												do: function() {
													createBubbleText({
														id: 5,
														location: { map: episode.id }, ms: 2000,
														owner: _goblins[0],
														text: "The woman is mine! Master",
														onend: function(_e) {
															_king.animate('buff1', 1);
															_e.hp = _e.maxHP = 1;
															_e.stepXRate = .65;
															episode.hasSolid = true;
															_e.action =  {
																command: 'move',
																to: 1100 * __zoom,
																y: .75,
																after: function(_g) {
																	_king.throwSpell({ spell: { key: 'icespike', priority: 1, smash: 1 }}, null, _g);
																	_g.immobilize = true;
																	_g.animate('idle', 1);
																}
															}
														}
													});
												},
												ms: 11600
											},
											{
												do: function() {
													createBubbleText({
														id: 666,
														leftGap: 200,
														location: { map: episode.id }, ms: 1000,
														owner: mainCharacter.key,
														asap: 1,
														text: "#sigh#"
													});
												},
												ms: 15600
											},
											{
												do: function() {
													createBubbleText({
														id: 26,
														location: { map: episode.id }, ms: 2000,
														owner: _king.key,
														text: "How dare you?",
														onend: function(_e) {
															_e.animate('buff2', 1);
															_e.animations.buff2.after = function() {
																_e.still = false;
																_e.animate('charge', 1);
																episode.enemies.find(x => x.key === _goblins[1]).invulnerable = 1;
															}
														}
													});
												},
												ms: 16100
											},
											{
												do: function() {
													delete mainCharacter.friendlyFire;
													mainCharacter.animations.air1.coolDownLeft = 0;
													mainCharacter.enableSkill('air1');
													mainCharacter.animate('air1', 1);
												},
												ms: 22800
											},
											{
												do: function() {
													delete mainCharacter.animations.counterstun.frames[0].objects;
													mainCharacter.animate('counterstun', 1);
												},
												ms: 24000
											},
											{
												do: function() {
													createBubbleText({
														id: 7,
														location: { map: episode.id }, ms: 2000,
														owner: mainCharacter.key,
														text: "You fool!"
													});
												},
												ms: 25100
											},
											{
												do: function() {
													episode.enemies.find(x => x.key === _goblins[1]).action = {
														command: 'move',
														to: 3000 * __zoom,
													};
													createBubbleText({
														id: 8,
														location: { map: episode.id }, ms: 1200,
														owner: _goblins[1],
														delay: 200,
														asap: 1,
														text: "Come here sweety!"
													});
												},
												ms: 27100
											},
											{
												do: function() {
													createBubbleText({
														id: 9,
														location: { map: episode.id }, ms: 3000,
														owner: _princess.key,
														asap: 1,
														text: "#screams#"
													});
												},
												ms: 27900
											},
											{
												do: function() {
													_princess.still = false;
													_princess.action = {
														command: 'move',
														to: 3000 * __zoom,
													};
												},
												ms: 28300
											}
										], 32000, function() {
											episode.enemies.find(x => x.key === _goblins[1]).remove = _princess.remove = true;
											__storyCutScenePlaying = 0;
											episode.minPlatformX = platformX;
											episode.still = true;
											mainCharacter.immobilize = false;
											mainCharacter.moveDirection = 'right';
											delete mainCharacter.disableKeyboard;
											episode.showLocationHand('right');
											//mainCharacter.enableSkills();
											episode.phase = 3;
										});


										return;

										setTimeout(function() {
											for(let i = 0; i <  2; i++) {
												const _goblin = summonMob(49, MathRound((platformX - (_canvas.width * .25)) / __zoom), MathRound(groundheight * .9), mainCharacter.level);
												_goblin.invulnerable = true;
												_goblin.puppetMode = true;
												_goblin.enemy =  _goblin.friendly = false;
												_goblin.direction = _goblin.moveDirection = 'right';
												_goblin.run();
											}

											addClass(_gameUI, 'disable-ui');
											_mob.animate('buff', 1);
											_mob.still = false;
											episode.dialogs = [{
												id: 10,
												location: { map: episode.id }, ms: 1500,
												owner: _mob.key,
												text: "You shall not pass!",
												onend : function() {
													episode.dialogs.push({
														id: 11,
														delay:100,
														location: { map: episode.id }, ms: 2000,
														owner: _princess.key,
														text: "",
														onend: function(){
															mainCharacter.disableSkills(1);
															mainCharacter.immobilize = true;
															mainCharacter.animations.air1.coolDownLeft = 0;
															episode.dialogs.push({
																id: 4,
																location: { map: episode.id },
																ms: 4700,
																delay: 3700,
																owner: mainCharacter.key,
																text: "You fool!",
																onend : function() {
																	mainCharacter.enableSkill('air1');
																	mainCharacter.animate('air1', 1);
																	mainCharacter.animations.air1.after = function() {
																		//episode.playSound({path:'./images/talks/cyclops/haha.mp3', volume: 1 });
																		episode.dialogs.push({
																			id: 5,
																			location: { map: episode.id }, ms: 2000,
																			owner: mainCharacter.key,
																			text: "HAHAHA",
																			onend : function() {
																				episode.minPlatformX = platformX;
																				episode.still = true;
																				mainCharacter.immobilize = false;
																				mainCharacter.moveDirection = 'right';
																				delete mainCharacter.disableKeyboard;
																				episode.showLocationHand('right');
																				mainCharacter.enableSkills();
																				episode.phase = 3;
																			}
																		});
																	}
																}
															});
															const _ui = document.getElementById('focus-ui');
															if(_ui)
																_ui.remove();
															const _push = document.querySelector('.push-me-finger');
															if(_push)
																_push.remove();
															_focusMode = undefined;
														}
													});
												}
											}];
										}, 1500);
									});
								}, 1000);
						}
					},
					{
						when: function() {
							return episode.phase === 3 && (mainCharacter.LEFT >= (_canvas.width / 2));
						},
						do: function() {
							episode.phase = 4;
							mainCharacter.yPosition = MathRound(groundheight * .5);
							mainCharacter.standBy();
							mainCharacter.still = true;
							episode.still = true;
							episode.width = platformX + _canvas.width;
							mainCharacter.left = MathRound(_canvas.width / 2);
							episode.removeLocationHand();
							mainCharacter.disableSkills();
							const _mLeft = MathRound(mainCharacter.SCREENLEFT + (mainCharacter.WIDTH / 2));
							for(let i = 1; i < 13; i++) {
								let _left =  MathRound((_mLeft + platformX) - (episode.cWidth / 2) - ((140 * __zoom) * MathCeil(i / 3))); //platformX - MathRound(-1 * (200 * MathCeil(i / 3)));
								if((i % 3) === 1)
									_left += (50 * __zoom);
								_left -= (350 * __zoom);
								let _m = summonMob(51, MathRound(_left / __zoom),
								MathRound(groundheight * (.2 + (.15 * (1 + (i % 3))))));
								_m.puppetMode = true;
								_m.disableSkills();
								_m.noLoot = true;
								_m.experience = 0;
								_m.direction = _m.moveDirection = 'right';
								_m.setAutoTarget(mainCharacter);
								_m.animations.run.imediateBreak = false;
								_m.animations.run.maxRepeat = 2;
								_m.animations.run.after = function() {
									_m.still = _m.immobilize = true;
									_m.animate('idle', 1);
									delete _m.animations.run;
								}
								_m.run();
							}
							for(let i = 1; i < 13; i++) {
								let _left = MathRound((_mLeft + platformX) + (_canvas.width / 2) + ((140 * __zoom) * MathCeil(i / 3)));
								if((i % 3) === 1)
									_left -= (50 * __zoom);
								_left -= (50 * __zoom);
								let _m = summonMob(51, MathRound(_left / __zoom),
								MathRound(groundheight * (.2 + (.15 * (1 + (i % 3))))));
								_m.puppetMode = true;
								_m.disableSkills();
								_m.noLoot = true;
								_m.experience = 0;
								_m.direction = _m.moveDirection = 'left';
								_m.setAutoTarget(mainCharacter);
								_m.animations.run.imediateBreak = false;
								_m.animations.run.maxRepeat = 2;
								_m.animations.run.after = function() {
									_m.still = _m.immobilize = true;
									_m.animate('idle', 1);
									delete _m.animations.run;
								}
								_m.run();
							}
							createBubbleText({
								id: 6,
								location: { map: episode.id },
								//delay: 1500,
								ms: 3000,
								owner: mainCharacter.key,
								text: "Come and get me!",
								onend: function() {
									mainCharacter.direction = 'left';
									mainCharacter.enableSkills();
									delete mainCharacter.animations.defense.delay;
									mainCharacter.animations.defense.coolDownLeft = 0;
									mainCharacter.animations.defense.do = function() {
										removeFocus();
									}
									mainCharacter.enableSkill('defense');
									focusMe('#skill8');
									mainCharacter.enableSkill('defense');
									mainCharacter.animations.defense.after = function() {
										mainCharacter.animations.release.frames.forEach(x => x.buffs = undefined);
										mainCharacter.animations.test = mainCharacter.animations.release;
										mainCharacter.animations.test.key = 'test';
										mainCharacter.animate('test', 1);
										createBubbleText({
											id: 10,
											location: { map: episode.id },
											delay: 1500,
											ms: 4000,
											owner: mainCharacter.key,
											text: "Damn! Machine in my head!",
											onend: function() {
												cssAnimations.black(null, 3000, getLangData('Meanwhile, deep in the sewers far, far away'), function() {
													switchStoryScene();
												});
											}
										});
									}
								}
							});
						}
					}
				],
				mobs: [
					{
						id: 51,
						minX: 800,
						maxX: 800,
						count: 1,
						sight:1000,
						minLevel: 20,
						groupId: 1,
						spawnAsGroup: 1,
						spawnTime: 1,
						spawnDirection: 'right',
						spawn:1,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 250,
						maxX: 250,
						count: 1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						attackAfterHit: true,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right',
							deadFirst: true
						}
					},
					{
						id: 51,
						minX: 700,
						maxX: 700,
						count: 1,
						sight:1000,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 700,
						maxX: 700,
						count: 1,
						sight:1000,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1000,
						maxX: 1000,
						count: 1,
						sight:1000,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 900,
						maxX: 900,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 900,
						maxX: 900,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1200,
						maxX: 1200,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1100,
						maxX: 1100,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 51,
						minX: 1100,
						maxX: 1100,
						count: 1,
						groupId: 1,
						spawnDirection: 'right',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 52,
						minX: 1400,
						maxX: 1400,
						count: 1,
						groupId: 2,
						spawnDirection: 'left',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .75);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 52,
						minX: 1500,
						maxX: 1500,
						count: 1,
						groupId: 2,
						spawnDirection: 'left',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 52,
						minX: 1400,
						maxX: 1400,
						count: 1,
						groupId: 2,
						spawnDirection: 'left',
						spawnAsGroup: 1,
						spawnTime: 1,
						spawn:1,
						sight:1000,
						minLevel: 20,
						maxLevel: 20,
						yPosition: function() {
							return MathRound(groundheight * .25);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 54,
						minX: 1200,
						maxX: 1200,
						count: 1,
						sight:1000,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return MathRound(groundheight * .9);
						},
						props: {
							noLoot: true,
							experience: 0,
							immobilize: true,
							direction: 'right'
						}
					},
					{
						id: 54,
						minX: 4000,
						maxX: 4000,
						count: 1,
						sight:1000,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return MathRound(groundheight * .9);
						},
						props: {
							noLoot: true,
							experience: 0,
							reversed: true,
							immobilize: true,
							direction: 'right'
						}
					}
				],
				start: function() {
					__storyCutScenePlaying = 1;
					mainCharacter.disableSkill('defense');
					mainCharacter.ironSkin = true;
					episode.width = MathRound(episode.width / 2);
					mainCharacter.left = -1 * mainCharacter.WIDTH;
					episode.enemies.forEach(x => x.immobilize = true);
					setTimeout(() => {
						cssAnimations.film(mainCharacter,
							[
							{
								do: function() {
									// const _f = mainCharacter.animations.roll.frames;
									// _f[_f.length - 1].atk = {
									// 	yRange: 15,
									// 	rate: 1,
									// 	hurt: {
									// 		smash: true
									// 	}
									// };
									mainCharacter.animations.roll.after = function() {
										mainCharacter.animations.roll.after = undefined;
										episode.enemies.filter(x => x.enemy && !x.deadFirst && x.class !== 'object')?.forEach(x => x.invulnerable = true);
										const _e = episode.enemies.find(x => x.enemy && x.deadFirst);
										if(_e.isDead())
											return;
										if(!_e.animations.hurtfeet)
											_e.animations.hurtfeet = new animation(createHurtFeet(_e.zoom));
										_e.animate('hurtfeet', 1);
									}
									mainCharacter.animate('roll', 1);
								},
								ms: 1000
							},
							{
								do: function() {
									episode.enemies.filter(x => x !== mainCharacter && !x.isDead())
									.forEach(x => x.direction = 'left');
								},
								ms: 2100
							},
							{
								do: function() {
									episode.dialogs = [{
										id: 1,
										width: '30vw',
										location: { map: episode.id }, ms: 1800,
										owner: episode.enemies.find(x => x.id === 51 && !x.isDead()).key,
										text: "What the hell are you?",
									}];
								},
								ms:2200
							},
							{
								do: function() {
									for(let i = 0; i < 10; i++) {
										const _goblin = summonMob((i % 2) > 0 ? 19 : 49, MathRound((platformX - (_canvas.width * .25)) / __zoom), MathRound(groundheight * (getRandomValue2(1, 100) / 100)), 1);
										_goblin.enemy = false;
										_goblin.friendly = true;
										_goblin.level = _goblin.skipHealthBar = 1;
										_goblin.immunities = [];
										_goblin.direction = _goblin.moveDirection = 'right';
										_goblin.action =  {
											command: 'move',
											to: getRandomValue2(1, 50) * 2 * __zoom,
											after: function(_e) {
												_e.immobilize = true;
												_e.animate('idle', 1);
											}
										}
									}
									// const _f = mainCharacter.animations.roll.frames;
									// delete _f[_f.length - 1].atk;
									episode.dialogs = [{
										id: 3,
										location: { map: episode.id }, ms: 2000,
										owner: mainCharacter.key,
										leftGap: 100,
										text: "I will test my lasers",
									}];
								},
								ms: 4200
							},
							{
								do: function() {
									episode.dialogs = [{
										id: 4,
										onend: function() {
											episode.pauseBgMusic(1);
											episode.createBgMusic(null, null, null, 'cyclops1');
											episode.playBgMusic();
											mainCharacter.friendlyFire = true;
											// //episode.enemies.forEach(x => x.immobilize = false);
											// //__storyCutScenePlaying = 0;
											// delete mainCharacter.disableKeyboard;
											// takeQuest(__story.quests[0], 1);
										},
										location: { map: episode.id }, ms: 1000,
										owner: episode.enemies.find(x => x.id === 51 && !x.isDead()).key,
										asap: 1,
										text: "Huh?",
									}];
								},
								ms: 6500
							}
						], 7600, function() {
							episode.enemies.forEach(x => x.immobilize = false);
							__storyCutScenePlaying = 0;
							delete mainCharacter.disableKeyboard;
							takeQuest(0, 1);
							episode.enemies.filter(x => x.enemy && x.class !== 'object')?.forEach(x => x.invulnerable = false);
						});
					}, 1500);
				}
			},
			{
				map: 104,
				startWith: 0,
				actions: [
					{
						when: function(){
							return episode.id === 102 && episode.phase === 5 && (mainCharacter.left + mainCharacter.WIDTH) >= _canvas.width;
						},
						do: function() {
							episode.phase++;
							setTimeout(() => {
								__storyTell = new story(1, function() {
									stopQuake();
									switchStoryScene();
								}, null, 'Two prisoners waiting for death in the dungeon managed to escape among these ruins');
							}, 100);
						}
					},
					{
						when: function(){
							return episode.id === 102 && !episode.phase && !episode.enemies.find(x => x.enemy && !x.invulnerable);
						},
						do: function() {
							episode.phase = 1;
							const _dead = episode.enemies.find(x => x.id === 78);
							_dead.npc = 'bow';
						}
					},
					{
						when: function(){
							return episode.id === 104 && episode.phase === 1 && mainCharacter.left <= 0;
						},
						do: function() {
							episode.phase = 2;
							switchMap(103, 1, function() {
								removeCoopCharacter(1);
								const _char = addCoopCharacter(null, 'arc');
								_char.unarm();
								_char.left = MathRound(_canvas.width * .8);
								_char.direction = mainCharacter.direction = 'left';
								_char.yPosition = MathRound(groundheight * .25);
								mainCharacter.keyboard.holdingKeys = [];
								mainCharacter.left = MathRound(_canvas.width * .75);
								mainCharacter.disableSkills();
								mainCharacter.idle();
								episode.removeLocationHand();
							});
						}
					},
					{
						when: function(){
							return episode.id === 104 && episode.phase === 10 && (mainCharacter.left + mainCharacter.WIDTH) > _canvas.width;
						},
						do: function() {
							episode.phase = 11;
							switchMap(102, 1, function() {
								removeCoopCharacter(1);
								const _char = addCoopCharacter(null, 'arc');
								_char.unarm();
								_char.left = MathRound(_canvas.width * .2);
								_char.direction = 'right';
								_char.yPosition = MathRound(groundheight * .25);
								mainCharacter.keyboard.holdingKeys = [];
								mainCharacter.left = MathRound(_canvas.width * .35);
								mainCharacter.idle();
								mainCharacter.enableSkills();
								episode.removeLocationHand();
								mainCharacter.still = mainCharacter.immobilize = true;
								createBubbleText({
									id: 1,
									location: { map: episode.id }, ms: 2000,
									owner: (episode.enemies.find(x => x.class === 'archer')).key,
									text: "Get off the rats!",
									onend: function() {
										focusMe('#skill1', function() {
											mainCharacter.disableKeyboard = mainCharacter.still = mainCharacter.immobilize = false;
											mainCharacter.enableSkills();
											mainCharacter.solid = true;
											mainCharacter.animate('attack', 1);
											episode.NPCS = episode.enemies.filter(x => x.npc);
											removeFocus();
										}, false, getLangData('Press to single attack, hold to combo attack'));
									}
								});
							});
						}
					},
					{
						when: function(){
							return episode.id === 103 && episode.phase === 1 && mainCharacter.left > (_canvas.width * .8);
						},
						do: function() {
							episode.phase = 2;
							switchMap(104, 1, function() {
								removeCoopCharacter(1);
								const _char = addCoopCharacter(null, 'arc');
								_char.unarm();
								mainCharacter.keyboard.holdingKeys = [];
								_char.left = 0;
								_char.direction = 'right';
								_char.yPosition = MathRound(groundheight * .25);
								mainCharacter.left = MathRound(_canvas.width * .1);
								mainCharacter.disableSkills();
								mainCharacter.idle();
								episode.showLocationHand('right');
								episode.phase = 10;
							});
						}
					}
				],
				mobs: [
					{
						id: '01',
						minX: 1730,
						maxX: 1730,
						count: 1,
						sight:1,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return groundheight;
						},
						do: function(_e) {
							_e.unarm();
							_e.noDirection = true;
						},
						props: {
							immobilize: true,
							direction: 'left',
							disabled: true,
							reversed: true,
							still: true,
							skipHealthBar: true
						}
					},
					{
						id: '02',
						minX: 380,
						maxX: 380,
						count: 1,
						sight:1,
						minLevel: 1,
						maxLevel: 1,
						yPosition: function() {
							return groundheight;
						},
						do: function(_e) {
							_e.unarm();
							_e.npc = 'archer';
							_e.noDirection = true;
						},
						props: {
							immobilize: true,
							direction: 'right',
							disabled: true,
							moveDirection: 'right',
							still: true,
							skipHealthBar: true
						}
					}
				],
				start: function() {
					if(mainCharacter){
						mainCharacter.disableKeyboard = 1;
						delete mainCharacter.disableKeyboard;
						episode.enemies = episode.enemies.filter(x => x !== mainCharacter);
						mainCharacter = undefined;
					}
					episode.enemies.forEach(x => x.immobilize = false);
					__storyCutScenePlaying = undefined;
					addClass(_gameUI, 'disable-ui');
					setTimeout(function() {
						injectModule('character-selection', function() {
							var x = new characterSelection();
							x.createCharacterSelectionUI();
						});
					}, 500);
				}
			},
			{
				map: 3,
				from: 'right',
				startWith: 1,
				save: true,
				actions: [
					{
						when: function() {
							if(mainCharacter.attacked && !episode.firstFly){
								const _mob = episode.enemies.find(x => x.animations.deadfly && x.animation !== 'deadfly' && x.health < x.MAXHP)
								if(_mob){
									_mob.health = 0;
									_mob.animate('deadfly', 1);
									episode.firstFly = 1;
									return true;
								}
							}
							return false;
						}
					},
					{
						when: function() {
							return !_game.suspended && mainCharacter.chains && !mainCharacter.attackedByObject && !mainCharacter.counterLearned;
						},
						do: function() {
							_game.suspended = 1;
							let _id = 'chain-skill-2';
							const _cs = document.getElementById(_id);
							if(hasClass(_cs, 'v-none'))
								_id = 'chain-skill-4';
							focusMe('#' + _id, function() {
								removeFocus();
								delete _game.suspended;
								delete mainCharacter.disableKeyboard;
								mainCharacter.still = mainCharacter.immobilize = false;
								mainCharacter.enableSkills();
								mainCharacter.animate(mainCharacter.chains[1].key, 1);
								mainCharacter.counterLearned = 1;
							}, null, getLangData('Hold block before attack or press here after attack to make counterattack'))
						}
					},
					{
						when: function() {
							return !mainCharacter.curious && (mainCharacter.LEFT + platformX) < (episode.width - _canvas.width)
						},
						do: function() {
							mainCharacter.curious = 1;
							createBubbleText({
								id: 998,
								location: { map: episode.id }, ms: 2500,
								owner: mainCharacter.key,
								text: "What's going on there?",
							});
						}
					},
					{
						when: function() {
							return episode.phase === undefined && mainCharacter.targetedBy;
						},
						do: function() {
							episode.phase = 0;
							const _rider = episode.enemies.find(x => x.enemy && x.grade > 1);
							if(_rider) {
								createBubbleText({
									id: 999,
									location: { map: episode.id }, ms: 2000,
									owner: _rider.key,
									text: "Intruder!",
								});
								_rider.setAutoTarget(mainCharacter);
							}
							episode.removeLocationHand();
							episode.pauseBgMusic(1);
							episode.createBgMusic(null, null, null, 'story1-forest', .5);
							episode.playBgMusic();
						}
					},
					{
						when: function() {
							return episode.phase === 1 && mainCharacter.left <= 0 && platformX <= 0;
						},
						do: function() {
							delete episode.phase;
							__storyTell = new story(2, function() {
								switchStoryScene();
							}, null, 'Our heroes take shelter in a camp, unaware that they are being followed');
						}
					}
				],
				mobs: [
					{
						id: 5,
						minX: 1760,
						maxX: 1760,
						sight: 0,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .7);
						},
						minLevel: 1,
						maxLevel: 1
					},
					{
						id: 50,
						minX: 1900,
						maxX: 1900,
						sight: 1,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .82);
						},
						minLevel: 1,
						maxLevel: 1
					},
					{
						id: 66,
						minX: 1500,
						maxX: 1500,
						sight: 25,
						count: 1,
						grade:2,
						groupId: 5,
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(10,  70) /  100));
						}
					},
					{
						id: 49,
						minX: 1200,
						maxX: 1200,
						sight: 15,
						count: 1,
						minLevel: 1,
						experience: 0,
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(10,  70) /  100));
						},
						maxLevel: 1,
						groupId: 5,
						hp: 100
					},
					{
						id: 19,
						minX: 1800,
						maxX: 1800,
						sight: 15,
						count: 1,
						minLevel: 1,
						maxLevel: 1,
						groupId: 5,
						experience: 0,
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(10,  70) /  100));
						},
						hp: 100
					},
					{
						id: 61,
						minX: 1050,
						maxX: 1050,
						count: 1,
						experience: 0,
						yPosition: function() {
							return MathRound(groundheight * .96);
						}
					},
					{
						id: 64,
						minX: 1130,
						maxX: 1130,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .95);
						}
					},
					{
						id: 63,
						minX: 860,
						maxX: 860,
						yPosition: function() {
							return MathRound(groundheight * .8);
						},
						count: 1
					},
					{
						id: 62,
						minX: 1375,
						maxX: 1375,
						yPosition: function() {
							return MathRound(groundheight * .92);
						},
						count: 1
					},
					{
						id: 63,
						minX: 2280,
						maxX: 2280,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .71);
						},
						props: {
							noLoot: true,
							experience: 0,
							reversed: true,
							immobilize: true,
							direction: 'left'
						}
					},
					{
						id: 67,
						minX: 550,
						maxX: 550,
						count: 1,
						direction:'right',
						yPosition: function() {
							return MathRound(groundheight * .5);
						},
						props: {
							npc: 'druid',
							noLoot: true,
							experience: 0,
							disabled: true,
							solid: true,
							noDirection: true
						}
					},
					{
						id: 60,
						minX: 2445,
						maxX: 2445,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .7);
						},
					},
					{
						id: 65,
						minX: 1900,
						maxX: 1900,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * .7);
						}
					}
				],
				// mobs: [
				// 	{
				// 		id: 3,
				// 		minX: 900,
				// 		maxX: 5900,
				// 		count: 10,
				// 		attackAfterHit: true
				// 	}
				// ],
				start: function() {
					//setCharacterLevel(3);
					removeCoopCharacter(1);
					const _char = addCoopCharacter(null, 'arc');
					_char.direction = 'right';
					_char.left = mainCharacter.SCREENLEFT + platformX - MathRound(1.5 * mainCharacter.WIDTH);
					_char.platformX = platformX;
					_char.yPosition = MathRound(.5 * groundheight);
					mainCharacter.immobilize = true;
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.disableKeyboard = true;
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 991,
									location: { map: episode.id }, ms: 1500,
									owner: mainCharacter.key,
									text: "Are you ok?"
								});
							},
							ms: 2100
						},
						{
							do: function() {
								createBubbleText({
									id: 992,
									location: { map: episode.id }, ms: 2100,
									owner: _char.key,
									text: "I'm still in one piece"
								});
							},
							ms: 3700
						},
						{
							do: function() {
								episode.playSound({key:'femalepain', end: function() {
									_char.direction = 'left';
									createBubbleText({
										id: 993,
										location: { map: episode.id }, ms: 2100,
										owner: _char.key,
										text: "Someone need help"
									});
								}});
							},
							ms: 5500
						},
					], 7500, function() {
						mainCharacter.immobilize = false;
						delete mainCharacter.disableKeyboard;
						takeQuest(3, 1);
						episode.showLocationHand('left');
					});
				}
			},
			{
				map: 1,
				save: true,
				from: 'right',
				startWith: 1,
				actions: [
					{
						when: function(){
							return (episode.phase === 1) && document.querySelector('#map-location-106');
						},
						do: function() {
							episode.phase = 2;
							mainCharacter.still = true;
							removeFocus();
							focusMe('#map-location-106' , function() {
								removeFocus();
								switchStoryScene();
								hideMyMenu();
							});
						}
					}
				],
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1235,
						maxX: 1235,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					// {
					// 	id: 58,
					// 	minX: 1900,
					// 	maxX: 1900,
					// 	count: 1,
					// 	do: function(_e) {
					// 		_e.npc = true;
					// 		_e.friendly = true;
					// 		_e.enemy = false;
					// 		_e.reversed = true;
					// 		_e.direction = 'left';
					// 	},
					// 	yPosition: function() {
					// 		return groundheight;
					// 	}
					// }
				],
				start: function() {
					const _princess = summonMob(58, MathRound((mainCharacter.SCREENLEFT + mainCharacter.WIDTH + platformX) / __zoom), MathRound(.33 * groundheight), mainCharacter.level);
					_princess.friendly = _princess.invulnerable = true;
					_princess.still = _princess.immobilize = false;
					_princess.direction = 'left';
					goToQuest(6);
					removeCoopCharacter(1);
					const _char = addCoopCharacter(null, 'arc');
					_char.direction = 'left';
					_char.left = mainCharacter.SCREENLEFT + platformX + mainCharacter.WIDTH;
					_char.platformX = platformX;
					_char.yPosition = MathRound(.66 * groundheight);
				}
			},
			{
				map: 106,
				from: 'left',
				startWith: 2,
				start: function(){
					removeClass(_gameUI, 'disable-ui');
					removeCoopCharacter(1);
				},
				actions: [
					{
						when: function(){
							return (episode.phase === 1) && document.querySelector('#map-location-1');
						},
						do: function() {
							episode.phase = 2;
							removeFocus();
							focusMe('#map-location-1' , function() {
								removeFocus();
								switchStoryScene();
								hideMyMenu();
							});
						}
					}
				],
				mobs: [
					{
						id: 28,
						minX: 800,
						maxX: 1200,
						count: 3,
						sight: 30,
						groupId: 1,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 1800,
						maxX: 2200,
						count: 3,
						sight: 30,
						groupId: 2,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 2800,
						maxX: 3200,
						count: 3,
						sight: 30,
						groupId: 3,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 3800,
						maxX: 4200,
						count: 3,
						sight: 30,
						groupId: 4,
						spawn: 10,
						attackAfterHit: true
					},
					{
						id: 28,
						minX: 4800,
						maxX: 5200,
						count: 3,
						sight: 30,
						groupId: 5,
						spawn: 10,
						attackAfterHit: true
					}
				]
			},
			{
				map: 1,
				save: true,
				onCheckpoint: function() {
					//setCharacterLevel(6);
				},
				from: 'right',
				startWith: 1,
				start: function() {
					removeClass(_gameUI, 'disable-ui');
					takeQuest(5, 1, null, 'end');
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			{
				map: 11,
				from: 'left',
				startWith: 1,
				mobs: [
					{
						id: 3,
						minX: 1000,
						maxX: 1500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 1000,
						maxX: 2000,
						count: 2,
						groupId: 1,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 2000,
						maxX: 2500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 1500,
						maxX: 2500,
						count: 2,
						groupId: 2,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 3000,
						maxX: 3500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 2500,
						maxX: 3500,
						count: 2,
						groupId: 3,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 4000,
						maxX: 4500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 3500,
						maxX: 4500,
						count: 2,
						groupId: 4,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 3,
						minX: 5000,
						maxX: 5500,
						count: 2,
						sight: 50,
						atk: 10,
						def: 10
					},
					{
						id: 7,
						minX: 4500,
						maxX: 5500,
						count: 2,
						groupId: 5,
						sight: 50,
						atk: 10,
						def: 20
					},
					{
						id: 79,
						minX: 1500,
						maxX: 5500,
						count: 5,
						props: {
							npc: 'lotus'
						}
					}
				]
			},
			{
				map: 1,
				save: true,
				from: 'right',
				startWith: 1,
				onCheckpoint: function() {
					//setCharacterLevel(7);
				},
				start: function() {
					takeQuest(6, 1, null, 'end');
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			{
				map: 36,
				from: 'left',
				startWith: 1,
				actions: [
					{
						when: function() {
							return episode.phase === 1 && __account.commonInventory.length > 3;
						},
						do: function() {
							episode.phase = 2;
							focusMe('.enemy-profile', function() {
								episode.playSound({ key: 'click' });
								episode.still = false;
								episode.enemies.filter(x => x.stop).forEach(x => {
									x.still = x.stop = false;
								});
								mainCharacter.still = mainCharacter.immobilize = false;
								delete mainCharacter.disableKeyboard;
								mainCharacter.enableSkills();
							}, false, getLangData('You can use these single-use abilities anytime. It allows you to deal with crowd'), 1);
						}
					}
				],
				mobs: [
					{
						id: 4,
						minX: 560,
						maxX: 560,
						yPosition: function() { return MathRound(groundheight * .5); },
						count: 1,
						do: function(_e){
							const _lootFrameIndex = _e.animations.dead.frames.findIndex(x => x.loot || x.loots);
							if(_lootFrameIndex !== -1) {
								const _lootFrame = _e.animations.dead.frames[_lootFrameIndex];
								_lootFrame.loots = [{
									key: 'electricbolt',
									type: 'common'
								},
								{
									key: 'electricbolt',
									type: 'common'
								},
								{
									key: 'electricbolt',
									type: 'common'
								},
								{
									key: 'electricbolt',
									type: 'common'
								}];
							}
						}
					},
					{
						id: 18,
						minX: 2000,
						maxX: 5500,
						sight: 15,
						atk: 5,
						def: 20,
						count: 20,
						props: {
							skinable: true,
							npcKey: 'wing'
						}
					},
					{
						id: 85,
						minX: 2720,
						maxX: 2720,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight);
						}
					},
					{
						id: 10,
						minX: 2720,
						maxX: 3000,
						count: 10,
						groupId: 1,
						sight: 15,
						zoom: .65,
						do: function(_e){
							_e.skipHealthBar = true;
						},
						yPosition: function() {
							return MathRound(groundheight * (getRandomValue2(5, 10) / 10));
						}
					}
				],
				start: function() {
					episode.still = true;
					episode.enemies.filter(x => x.enemy && !x.still).forEach(x => {
						x.still = x.stop = true;
					});
					const _spider = summonMob(10, MathRound((_canvas.width  * .4) * __zoom),
						MathRound(groundheight / 5));
					_spider.puppetMode = true;
					_spider.direction = 'right';
					_spider.skipHealthBar = true;
					_spider.stepXRate *= 2;
					_spider.stepX *= 2;
					_spider.action = {
						command: 'move',
						to: episode.width * __zoom,
					};
					mainCharacter.standBy();
					createBubbleText({
						id: 1,
						location: { map: episode.id }, ms: 2500,
						owner: mainCharacter.key,
						text: "Huh? What was that?",
						onend: function() {
							_spider.remove = true;
							mainCharacter.immobilize = false;
							delete mainCharacter.disableKeyboard;
						}
					});
					__account.commonInventory = [];
					_client.saveState();
					episode.phase = 1;
					cssAnimations.lightradius2(mainCharacter, 3);
					episode.after = function() {
						delete cssAnimationProps.lightradius2;
					}
				}
			},
			{
				map: 1,
				from: 'right',
				save: true,
				startWith: 1,
				onCheckpoint: function() {
					//setCharacterLevel(8);
				},
				start: function() {
					takeQuest(7, 1, null, 'end');
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						do: function(_e) {
							if(episode.msNow < 501){
								_e.reversed = true;
								_e.direction = 'left';
							}
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			{
				map: 41,
				from: 'left',
				startWith: 1,
				mobs: [
					{
						id: 75,
						minX: 5100,
						count: 1,
						sight: 100
					},
					{
						id: 77,
						minX: 1200,
						maxX: 1200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 1300,
						maxX: 1300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 2200,
						maxX: 2200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 2300,
						maxX: 2300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 3200,
						maxX: 3200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 3300,
						maxX: 3300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 4200,
						maxX: 4200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 4300,
						maxX: 4300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 77,
						minX: 5200,
						maxX: 5200,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .75);
						}
					},
					{
						id: 77,
						minX: 5300,
						maxX: 5300,
						count: 1,
						sight: 100,
						yPosition: function() {
							return MathRound(groundheight * .25);
						}
					},
					{
						id: 76,
						minX: 1500,
						maxX: 5000,
						count: 10,
						sight: 50
					}
				]
			},
			{
				map: 1,
				save: true,
				from: 'right',
				startWith: 1,
				onCheckpoint: function() {
					//setCharacterLevel(10);
				},
				start: function() {
					takeQuest(8, 1, null, 'end');
				},
				mobs: [
					{
						id: 69,
						minX: 3340,
						maxX: 3340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 70,
						minX: 4340,
						maxX: 4340,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 73,
						minX: 2400,
						maxX: 2400,
						count: 1,
						// do: function(_e) {
						// 	_e.npc = true;
						// 	_e.dialogs = createTrainingDialog('tank');
						// },
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: '10002',
						minX: 2740,
						maxX: 2740,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.zoom *= .9;
							_e.still = _e.noDirection = true;
							_e.stepXRate = _e.stepX = 0;
							_e.dialogs = createPotDialog('archer');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.1);
						}
					},
					{
						id: 71,
						minX: 4550,
						maxX: 4550,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 72,
						minX: 1245,
						maxX: 1245,
						count: 1,
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 58,
						minX: 1900,
						maxX: 1900,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.friendly = true;
							_e.enemy = false;
							_e.reversed = true;
							_e.direction = 'left';
						},
						yPosition: function() {
							return groundheight;
						}
					}
				]
			},
			{
				map: 10,
				save: true,
				from: 'left',
				save: true,
				startWith: 1,
				bonusRewards: [
					{ 
						when: function() { return mainCharacter.id === 47 }, 
						key: 'fragment', 
						type: 'cyclops', 
						description: {
							"tr": "Tepegöz parçacığı",
							"en": "Cyclops fragment"
						}
					},
					{ 
						when: function() { return mainCharacter.id === 29 }, 
						key: 'fragment', 
						type: 'werewolf', 
						description: {
							"tr": "Gökbörü parçacığı",
							"en": "Gökbörü fragment"
						} 
					}
				],
				bonus: [
					{
						owner: 'cyclops',
						description: {
							tr: 'Okçu kızı öldürme',
							en: 'Do not kill the archer girl'
						},
						when: function(){
							let _archer = episode.enemies.find(x => x.class === 'archer');
							if(_archer && !_archer.isDead() && _archer.health > 0)
								return true;
							return false;
						}
					},
					{
						owner: 'werewolf',
						description: {
							tr: 'Bomba yeteneği ile patronu öldür',
							en: 'Kill the boss with bomb skill'
						},
						when: function(){
							let _cyc = episode.enemies.find(x => x.id === 47);
							if(_cyc && _cyc.isDead() && (_cyc.lastHitSkill === 'defense'))
								return true;
							return false;
						}
					}
				],
				actions: [
					{
						when: function() {
							return episode.phase === 20;// && (mainCharacter.left + platformX) > _canvas.width;
						},
						do: function() {
							episode.phase = 21;
							mainCharacter.direction = 'right';
							mainCharacter.keyboard.holdingKeys = [];
							mainCharacter.disableKeyboard = true;
							mainCharacter.still = mainCharacter.immobilize = true;
							mainCharacter.animate('idle');
							mainCharacter.enableSkill('defense');
							episode.pauseBgMusic(1);
							setTimeout(() => {
								mainCharacter.yPosition = MathRound(groundheight / 2);
								platformX = 0;
								mainCharacter.left = MathRound((_canvas.width * .05) + mainCharacter.ORIGINDIST);
								mainCharacter.platformX = 0;
								const _cyclops = summonMob(47, _canvas.width,
									MathRound(groundheight / 2), mainCharacter.level);
								_cyclops.direction = 'left';
								_cyclops.skipHealthBar = true;
								_cyclops.animate('idle');
								_cyclops.setAutoMode(0);
								_cyclops.left = MathRound(_canvas.width - (((_canvas.width * .05) + _cyclops.WIDTH) - _cyclops.ORIGINDIST));
								_cyclops.still = _cyclops.immobilize = _cyclops.ironSkin = true;
								episode.enemies.filter(x => !x.villain && x.class !== 'archer' && x.key !== 'vtl' && x.key !== 'vtm')?.forEach(x => {
									x.stopSpawn();
									x.health = 0;
									x.remove = true;
								});
								if(episode.respawners)
									episode.respawners = [];
							}, 1000);
							cssAnimations.vs(mainCharacter,
								{
									ms: 3000,
									enemyId: 47,
									keepDisableUI: true,
									q1: 'How do you see with one eye?',
									q2: 'I see dead people'
								},
								function() {
									injectModule('character-selection', function() {
										mainCharacter.name = 'Gökbörü';
										mainCharacter.level = 10;
										episode.width = _canvas.width;
										delete episode.towerDefenseStart;
										episode.still = true;
										var x = new characterSelection();
										x.createCharacterSelectionUI('werewolf', 'cyclops', function() {
											episode.mobs = [];
											summonMobWithJson({
												id: 19,
												minX: _canvas.width,
												maxX: _canvas.width,
												spawn: 2,
												ownerKey: episode.enemies.find(x => x.id === 47).key,
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true,
													skipHealthBar: true,
													direction: 'left'
												},
												count: 6
											}, 1);
											const _e19 = episode.enemies.filter(x => x.id === 19 && !x.remove && x.owner);
											let _archer = episode.enemies.find(x => x.class === 'archer');
											if(!_archer) {
												removeCoopCharacter(1);
												_archer = addCoopCharacter(null, 'arc');
												_archer.def *= mainCharacter.level;
											}
											if(_archer) {
												_archer.level = mainCharacter.level;
												resetSkills(null, 1, _archer);
												_archer.skipHealthBar = true;
												_archer.direction = 'right';
												_archer.left = MathRound(.05 * _canvas.width);
												_archer.platformX = 0;
												_archer.standBy();
												_archer.still = true;
												_archer.yPosition = MathRound(.7 * groundheight);
												_archer.setAutoMode(0, 1);
											}
											_e19[0].left = MathRound((_canvas.width * (.6 + (3.5 * .085))) + platformX);
											_e19[0].yPosition = MathRound((.2 * 1) * groundheight);
											_e19[1].left = MathRound(((_canvas.width * (.6 + (3.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[1].yPosition = MathRound((.2 * 2) * groundheight);
											_e19[2].left = MathRound(((_canvas.width * (.6 + (3.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[2].yPosition = MathRound((.2 * 3) * groundheight);
											_e19[3].left = MathRound((_canvas.width * (.6 + (3.5 * .085))) + platformX);
											_e19[3].yPosition = MathRound((.2 * 4) * groundheight);
											_e19[4].left = MathRound(((_canvas.width * (.6 + (1.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[4].yPosition = MathRound((.2 * 2) * groundheight);
											_e19[5].left = MathRound(((_canvas.width * (.6 + (1.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[5].yPosition = MathRound((.2 * 3) * groundheight);
											_e19.forEach(x => {
												x.setAutoMode(0, 1);
												x.standBy();
											});

											summonMobWithJson({
												id: 27,
												minX: 0,
												maxX:  0,
												spawn: 2,
												ownerKey: mainCharacter.key,
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true,
													skipHealthBar: true,
													direction: 'right'
												},
												count: 6
											}, 1);
											const _e27 = episode.enemies.filter(x => x.id === 27 && x.owner);
											_e27[0].left = MathRound((_canvas.width * (.4 - (3.5 * .085))) + platformX);
											_e27[0].yPosition = MathRound((.2 * 1) * groundheight);
											_e27[1].left = MathRound(((_canvas.width * (.4 - (3.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[1].yPosition = MathRound((.2 * 2) * groundheight);
											_e27[2].left = MathRound(((_canvas.width * (.4 - (3.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[2].yPosition = MathRound((.2 * 3) * groundheight);
											_e27[3].left = MathRound((_canvas.width * (.4 - (3.5 * .085))) + platformX);
											_e27[3].yPosition = MathRound((.2 * 4) * groundheight);
											_e27[4].left = MathRound(((_canvas.width * (.4 - (1.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[4].yPosition = MathRound((.2 * 2) * groundheight);
											_e27[5].left = MathRound(((_canvas.width * (.4 - (1.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[5].yPosition = MathRound((.2 * 3) * groundheight);
											_e27.forEach(x => {
												x.setAutoMode(0, 1);
												x.standBy();
											});
											episode.enemies.filter(x => x.key !== 'vtm' && x.key !== 'vtl' &&
												!x.alp && !x.owner && !x.villain)?.forEach(x => x.remove = true);
										},
										function(_another) {
											episode.bossFightStart = _gameTick;
											_another.ironSkin = mainCharacter.ironSkin = true;
											_another.releaseAfter = mainCharacter.releaseAfter =
											_another.animations.air2.maxRageCount =
											mainCharacter.animations.air2.maxRageCount = 30;
											mainCharacter.maxHP = _another.maxHP = mainCharacter.MAXHP =
											_another.MAXHP = mainCharacter.health = _another.health = 20000;
											_another.skipHealthBar = false;
											_another.setHealth(_another.MAXHP);
											//_another.setHealth(1); // TEST İÇİN
											_another.pvp = mainCharacter.pvp = true;
											_another.setDifficulty(__account.difficulty - 1);
											episode.chosenFragment = mainCharacter.class;
											const _archer = episode.enemies.find(x => x.class === 'archer');
											if(_archer && (_another.class === 'werewolf')) {
												_archer.level = mainCharacter.level;
												resetSkills(null, 1, _archer);
												_archer.friendly = false;
												_archer.immobilize = _archer.still = _archer.skipHealthBar = false;
												_archer.enemy = true;
												const _oldAvatar = document.getElementById('char-' + _coopMembers[0].key);
												if (_oldAvatar)
													_oldAvatar.remove();
												_coopMembers = [];
												_archer.setHealth(_archer.MAXHP);
												_archer.sight = 100;
												_archer.setAutoMode(2);
												_archer.pickNewTarget();
											}
											else if(_archer && (_another.class !== 'werewolf')) {
												_archer.level = mainCharacter.level;
												resetSkills(null, 1, _archer);
												_navbar.innerHTML += avatarTemplate(_archer);
												_archer.immobilize = false;
												_archer.autoTarget = undefined;
												_archer.setAutoMode(2);
												_archer.pickNewTarget();
												_archer.setHealth(_archer.MAXHP);
											}
											mainCharacter.setHealth(mainCharacter.MAXHP);
											episode.enemies.filter(x => x.id === 27).forEach(x => {
												x.immobilize = x.still = x.puppetMode = false;
												x.owner = mainCharacter.class === 'cyclops' ? _another : mainCharacter;
												x.enemy = mainCharacter.class === 'cyclops' ? true : false;
												x.setAutoMode(2, 1);
											});
											episode.enemies.filter(x => x.id === 19).forEach(x => {
												x.immobilize = x.still = x.puppetMode = false;
												x.owner = mainCharacter.class === 'werewolf' ? _another : mainCharacter;
												x.enemy = mainCharacter.class === 'werewolf' ? true : false;
												x.setAutoMode(2, 1);
											});
											episode.pauseBgMusic(1);
											episode.createBgMusic(null, null, null, 'story1-quest11', .65);
											episode.playBgMusic();
											_another.atk = mainCharacter.atk;
											_another.def = mainCharacter.def;
											mainCharacter.storyVariables = structuredClone2(episode.storyVariables);
											mainCharacter.maxExperience = mainCharacter.storyVariables.maxExperience;
											mainCharacter.experience = mainCharacter.storyVariables.experience;
											_another.experience = 0;
											delete episode.storyVariables;
										});
									});
								}
							);
						}
					},
					{
						when: function() {
							return episode.phase === 10;
						},
						do: function() {
							episode.phase = 1;
							episode.enemies.filter(x => x.id === 58 || x.id === 72).forEach(x => x.remove = true);
						}
					},
					{
						when: function() {
							return episode.phase === 1 && (mainCharacter.LEFT + platformX) >= (_canvas.width * .6);
						},
						do: function() {
							episode.phase = 3;

						}
					},
					{
						when: function() {
							if(!episode.questStatus)
								episode.questStatus = document.getElementById('quest-status');
							return episode.phase === 2 && hasClass(episode.questStatus, 'd-none');
						},
						do: function() {
							episode.phase = 3;
							episode.pauseBgMusic(1);
						}
					},
					{
						when: function() {
							if(episode?.bossFightStart)
								return false;
							let _vtl = episode.enemies.find(x => x.key === 'vtl');
							let _vtm = episode.enemies.find(x => x.key === 'vtm');
							let _archer = episode.enemies.find(x => x.class === 'archer');
							return episode.towerDefenseStart && !episode.end &&
							(
								(_vtl && _vtl.isDead())
								||
								(_vtm && _vtm.isDead())
								||
								(_archer && _archer.isDead())
								||
								(_vtl?.health??1) <= 0
								||
								(_vtm?.health ?? 1) <= 0
								||
								(_archer?.health ?? 1) <= 0
							);
						},
						do: function() {
							episode.end = true;
							createStoryResultScreen(1);
						}
					},
					{
						when: function() {
							return episode.bossFightStart && !episode.fatalityAvailable &&
							((episode.enemies.find(x => x.id === 47)?.health??1) <= 0 ||
							(episode.enemies.find(x => x.id === 29)?.health ?? 1) <= 0);
						},
						do: function() {
							episode.fatalityAvailable = true;
							const _b1 = episode.enemies.find(x => x.id === 47);
							const _b2 = episode.enemies.find(x => x.id === 29);
							if((_b1?.health ?? 1) <= 0 && _b2?.main)
								_b1.enterFinishState(_b2);
							if((_b2?.health ?? 1) <= 0 && _b1?.main)
								_b2.enterFinishState(_b1);
						}
					},
					{
						when: function() {
							return episode.bossFightStart && episode.fatalityAvailable &&
							episode.phase !== 666 &&
							episode.enemies.filter(x => x.pvp && !x.finishing && x.animation.startsWith('dead'))?.[0];
						},
						do: function() {
							episode.phase = 666;
							const _winner = episode.enemies.filter(x => x.pvp && !x.animation.startsWith('dead'))?.[0];
							if(_winner)
								_winner.standBy();
							setTimeout(() => {
								if(_winner) {
									_winner.animate('victory', 1);
									_winner.animations.idle.after = function() {
										episode.end = true;
										__storyPlaying = false;
										createStoryResultScreen();
										delete _winner.animations.idle.after;
									}
								}
							}, 2000);
						}
					},
					{
						when: function(){
							return episode.towerDefenseStart && (_gameTick - episode.towerDefenseStart) > 20000;
						},
						do:function(){
							//removeCoopCharacter(1);
							episode.towerDefenseStart = _gameTick;
							warn('<div class="flex heading achievement-red" style="position:relative;width:auto"><img style="height:15vh;z-index:-1" src="./images/icons/txtbg.png" /><div style="position:absolute;text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('Bomber Frog Incoming') + '</div></div>');
							episode.playSound({ key: 'curse', volume: .5 });
							summonMobWithJson({
								id: 83,
								minX: 4000,
								maxX: 4000,
								targetKey: 'vtm',
								yPosition: groundheight,
								props: {
									onlyTarget: 'vtm',
									experience: 0,
									noLoot: true
								},
								count: 1
							}, 1);
							// summonMobWithJson({
							// 	id: 83,
							// 	minX: -1000,
							// 	maxX: 0,
							// 	spawn: 20,
							// 	targetKey: 'vtl',
							// 	props: {
							// 		experience: 0,
							// 		noLoot: true
							// 	},
							// 	count: 1
							// }, 1);
						}
					},
					// {
					// 	when: function() {
					// 		return episode.bossFightStart && !episode.end && ((episode.enemies.find(x => x.id === 47)?.health??1) <= 0 || (episode.enemies.find(x => x.id === 29)?.health ?? 1) <= 0);
					// 	},
					// 	do: function() {
					// 		episode.end = true;
					// 		createStoryResultScreen();
					// 	}
					// },
				],
				start: function() {
					// episode.bossFightStart = _gameTick;
					// mainCharacter.ironSkin = mainCharacter.pvp = true;
					// return;
					removeCoopCharacter(1);
					let _char = addCoopCharacter(null, 'arc');
					_char.direction = 'left';
					_char.left = MathRound(1185 * __zoom);
					_char.immobilize = true;
					_char.platformX = platformX;
					_char.yPosition = MathRound(.4 * groundheight);

					episode.still = true;
					mainCharacter.left = MathRound(1250 * __zoom);
					mainCharacter.direction = 'left';
					mainCharacter.immobilize = mainCharacter.still = true;
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.disableKeyboard = true;
					const _princess = episode.enemies.find(x => x.id === 58);
					const _father = episode.enemies.find(x => x.id === 72);
					_princess.puppetMode = _father.puppetMode = _princess.still = _father.still = _princess.immobilize = _father.immobilize = true;
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 1,
									location: { map: episode.id }, ms: 2000,
									owner: _princess.key,
									text: "They are close"
								});
							},
							ms: 2000
						},
						{
							do: function() {
								createBubbleText({
									id: 2,
									location: { map: episode.id }, ms: 2100,
									owner: _father.key,
									text: "Time to use potion"
								});
							},
							ms: 4200
						},
						{
							do: function() {
								createBubbleText({
									id: 3,
									location: { map: episode.id }, ms: 1500,
									owner: mainCharacter.key,
									text: "Take cover!",
									onend: function() {
										mainCharacter.direction = 'right';
										_princess.direction = _princess.moveDirection =
										_father.direction = _father.moveDirection = 'left';
										_princess.still = _father.still = false;
										_princess.puppetMode = _father.puppetMode = true;
										_princess.action = {
											command: 'move',
											to: -500 * __zoom,
										};
										_father.action = {
											command: 'move',
											to: -500 * __zoom,
										};
									}
								});
							},
							ms: 6500
						},
						{
							do: function() {
								_char.direction = 'right';
								createBubbleText({
									id: 4,
									location: { map: episode.id }, ms: 2000,
									owner: _char.key,
									text: "I'll stay for help"
								});
							},
							ms: 8200
						},
						{
							do: function() {
								createBubbleText({
									id: 5,
									location: { map: episode.id }, ms: 1200,
									owner: mainCharacter.key,
									text: "Here we go...",
									onend: function() {
										episode.phase = 10;
									}
								});
							},
							ms: 10200
						},
						{
							do: function() {
								__storyTell = new story(5, function() {
									episode.realClass = mainCharacter.class;
									const _left = mainCharacter.left;
									mainCharacter.remove = true;
									mainCharacter.main = false;
									startWithThisCharacter(29);
									//setCharacterLevel(10, null, 1);
									_char = addCoopCharacter(null, 'arc', null, mainCharacter.level);
									resetSkills(null, 1, _char);
									_char.direction = 'right';
									_char.left = MathRound(1185 * __zoom);
									_char.immobilize = true;
									_char.platformX = platformX;
									_char.yPosition = MathRound(.4 * groundheight);
									mainCharacter.disableSkill('defense');
									episode.playSound({ key: 'puff', volume: .4 });
									mainCharacter.addObject({
										key: 'invisiblesmoke',
										position: 'middle'
									});
									mainCharacter.direction = 'right';
									mainCharacter.left = _left;
									mainCharacter.ironSkin = true;
									episode.enemies.filter(x => x.class === 'object')?.forEach(x => x.class = x.invulnerable = x.skipHealthBar = false);
									mainCharacter.yPosition = MathRound(groundheight / 2);
									episode.still = false;
									episode.width = MathRound(episode.width / 2);
									takeQuest(9);
									pauseQuestTimer();
									episode.pauseBgMusic(1);
									episode.moveCamera(function(){
										focusMe('#quest-status', function() {
											episode.playSound({ key: 'click' });
											mainCharacter.still = mainCharacter.immobilize = false;
											delete mainCharacter.disableKeyboard;
											resumeQuestTimer();
											mainCharacter.enableSkills();
											summonMobWithJson({
												id: 19,
												minX: 3000,
												maxX: 4000,
												spawn:2,
												targetKey: 'vtl,vtm',
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true
												},
												count: 20
											}, 1);
											summonMobWithJson({
												id: 49,
												minX: 3000,
												maxX: 4000,
												spawn:2,
												targetKey: 'vtl,vtm',
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true
												},
												count: 12
											}, 1);
											summonMobWithJson({
												id: 66,
												minX: 3000,
												maxX: 4000,
												spawn:2,
												targetKey: 'vtl,vtm',
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true
												},
												count: 10
											}, 1);
											episode.pauseBgMusic(1);
											episode.createBgMusic(null, null, null, 'story1-quest10-3', .65);
											episode.playBgMusic(1);
											_char.immobilize = false;
											_char.def *= mainCharacter.level;
											_char.releaseAfter = 5;
											episode.towerDefenseStart = _gameTick;

										}, false, getLangData('Defend the huts,<br/>keep your friends alive<br/>until that period of time'), 1);
										createBubbleText({
											id: 6,
											location: { map: episode.id }, ms: 2000,
											owner: mainCharacter.key,
											text: "Let's Rock!"
										});
									});
								}, 1);
							},
							ms: 11500
						}
					], 17300, function() {

					});
					mainCharacter.ironSkin = true;
					//episode.enemies.filter(x => x.class === 'object')?.forEach(x => x.invulnerable = true);
					// const _cyc = episode.enemies.find(x => x.id === 47);
					// _cyc.animations['hurtground1'].frames.forEach(x => x.speed *= 20);
					//removeCoopCharacter(1);
					//addCoopCharacter(null, 'arc');
					//takeQuest(9);
					// episode.pauseBgMusic(1);
					// episode.createBgMusic(null, null, function() {
					// 	episode.playBgMusic(1);
					// }, 'story1-quest10-3', .65);
					// episode.playBgMusic(1);
				},
				mobs: [
					{
						id: 80,
						minX: 562,
						maxX: 562,
						count: 1,
						do: function(_e) {
							_e.enemy = false;
							_e.noDirection = true;
							_e.healthBarIcon = 'target';
							_e.healthBarWidthRate = 3,
							_e.skipHealthBar = true;
							_e.healthBarHeightRate = 1.5;
							_e.solid = false;
							_e.targetPriority = 1;
							_e.harmless = true;
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 81,
						minX: 2090,
						maxX: 2090,
						count: 1,
						do: function(_e) {
							_e.enemy = false;
							_e.noDirection = true;
							_e.healthBarIcon = 'target';
							_e.healthBarWidthRate = 3,
							_e.healthBarHeightRate = 1.5;
							_e.skipHealthBar = true;
							_e.solid = false;
							_e.targetPriority = 1;
							_e.harmless = true;
						},
						yPosition: function() {
							return MathRound(groundheight * 1.11);
						}
					},
					{
						id: 58,
						minX: 950,
						maxX: 950,
						do: function(_e) {
							_e.direction = 'right';
							_e.noDirection = false;
						},
						yPosition: function() {
							return MathRound(groundheight * .5);
						}
					},
					{
						id: 72,
						minX: 1060,
						maxX: 1060,
						do: function(_e) {
							episode.msNow = 501;
							_e.direction = 'right';
							_e.noDirection = false;
							_e.swapAnimation('idle');
						},
						yPosition: function() {
							return MathRound(groundheight * .6);
						}
					}
					// {
					// 	id: 47,
					// 	minX: 1000,
					// 	maxX: 1000,
					// 	count: 1,
					// 	attackAfterHit: true,
					// 	yPosition: function() {
					// 		return MathRound(groundheight / 2);
					// 	},
					// 	props: {
					// 		health:1,
					// 		pvp: true,
					// 		ironSkin: true
					// 	}
					// }
				]
			},
			{
				map: 0,
				start: function() {
					mainCharacter.level = 1;
					mainCharacter.maxExperience = 1000;
					mainCharacter.experience = 0;
					//__account.gold = 0;
					const _weapon = getRandomItem(0, 'weapon', mainCharacter.class);
					//_weapon.weared = mainCharacter.class;
					__account.inventory = __account.inventory.filter(x => !x.weared);
					__account.inventory.push(_weapon);
					updateExperience(__story.rewards.find(x => x.key === 'exp').count);
					removeCoopCharacter();
					addClass(_gameUI, 'disable-ui');
					injectModule('lobby', function() {
						__storyPlaying = false;
						createMenu();
						setTimeout(() => {
							focusMe('#side-hamburger-menu', function() {
								removeFocus(1);
								openSideMenu();
								setTimeout(function() {
									focusMe('#lobby-inventory', function() {
										removeFocus(1);
										hideSideMenu();
										openInventoryScreen();
										setTimeout(function() {
											focusMe('#inventory-slots .item-slot:first-child', function() {
												const _id = getItems().find(x => !x.weared).id;
												openItemInfoModal(_id);
												removeFocus(1);
												focusMe('.equipment-wear-button', function() {
													wearItem(_id);
													removeFocus(1);
												});
											});
										}, 300);
									});
								}, 320);
							});
						}, 100);
					});
					if(mainCharacter){
						mainCharacter.left = MathRound(1707 * __zoom);
						mainCharacter.direction = 'right';
						mainCharacter.skipHealthBar = true;
						mainCharacter.noDirection = true;
						mainCharacter.keyboard.holdingKeys = [];
						mainCharacter.disableKeyboard = mainCharacter.immobilize = true;
						mainCharacter.animate('idlelobby',1);
					}
				},
				afterInit: function() {
					mainCharacter.yPosition = MathRound(getGroundHeight() * 1.3);
				},
				mobs: [
					// {
					// 	id: 88,
					// 	minX: 1000,
					// 	maxX: 1000,
					// 	count: 1,
					// 	direction: 'right',
					// 	props: {
					// 		flying: true
					// 	},
					// 	yPosition: function() {
					// 		return MathRound(groundheight * 4);
					// 	}
					// },
					{
						id: 72,
						minX: 1175,
						maxX: 1175,
						count: 1,
						do: function(_e) {
							episode.msNow = 1;
							_e.direction = 'right';
							_e.noDirection = true;
							_e.swapAnimation('idle');
						},
						yPosition: function() {
							return MathRound(groundheight * 1.7);
						}
					},
					{
						id: 2002,
						minX: 1400,
						maxX: 1400,
						count: 1,
						do: function(_e) {
							_e.npc = true;
							_e.reversed = true;
							_e.direction = 'left';
							_e.noDirection = true;
						},
						yPosition: function() {
							return MathRound(groundheight * 1.85);
						}
					},
					{
						id: 5,
						minX: 1380,
						maxX: 1380,
						count: 1,
						yPosition: function() {
							return MathRound(groundheight * 1.6);
						}
					},
					{
						id: 87,
						minX: 1600,
						maxX: 1600,
						count: 1,
						zoom: .8,
						yPosition: function() {
							return MathRound(groundheight * 1.65);
						}
					},
					{
						id: 87,
						minX: 1250,
						maxX: 1250,
						count: 1,
						zoom: .85,
						yPosition: function() {
							return MathRound(groundheight * 1.2);
						}
					}
				]
			},
			{
				map: 201,
				heartCount : 3,
				loots: [
					{type:'pot', key:'pot', chance:1}
				],
				startsWith: 1,
				save: true,
				start: function() {
							// __storyPlaying = false;
							// installStoryFinish();
							// return;
					// clearCanvasCache(loadedImages);
					// clearCanvasCache(loadedEpisodeImages);
					clearAudioCache(loadedSounds);
					removeCoopCharacter();
					mainCharacter.storyVariables = {
						level: mainCharacter.level,
						experience: mainCharacter.experience,
						maxExperience: mainCharacter.maxExperience
					};
					mainCharacter.level = 0;
					mainCharacter.experience = 0;
					mainCharacter.maxExperience = 833;
					setCharacterLevel(1, null, 1);
					//setCharacterLevel(13, null, 1);
					addClass(_gameUI, 'demo-playing');
					episode.pauseBgMusic(1);
					episode.createBgMusic(null, null, null, 'training');
					episode.playBgMusic();
					episode.phase = 1;
					updateQuestArea(null,
						{
							id: 1001,
							descriptions: {
								en: 'Become Level 2',
								tr: 'Seviye 2 ol'
							},
							names: {
								en: 'Power Up',
								tr: 'Güçlenme'
							},
							owner: 'system',
							minLevel: 1,
							maps: [201]
						}
					);
				},
				actions: [
					{
						when: function() {
							return episode.phase < 99 && mainCharacter.level > 12;
						},
						do: function() {
							episode.phase = 99;
							episode.enemies.filter(x => !x.main).forEach(x => {
								x.stopSpawn();
								x.health = x.experience = 0;
								x.dead = x.dying = true;
								x.animate('dead', 1);
							});
							episode.mobs = episode.respawners = [];
							episode.playSound({key:'bossalert', volume: .5});
							warn('<div class="flex leveling"><img style="height:22vh" src="./images/icons/boss-alert.gif" /></div>', 'level-up', 4000);
							const _elm = document.getElementById('quest-status');
							addClass(_elm, 'mission-done');
							__storyScene.bossQuest = {
								id: 1100,
								names: {
									en: 'Party Time',
									tr: 'Parti Zamanı'
								},
								owner: 'system',
								minLevel: 1,
								kills: [{
									enemy: [47],
									limit: 1,
									descriptions: {
										en: 'Boss Cleared',
										tr: 'Patron Temizlendi'
									}
								}],
								maps: [201]
							};
							_elm.onanimationend = function(e) {
								if(e.animationName === 'mission-done')
									updateQuestArea(null,
								 		__storyScene.bossQuest
									);
							}
							setTimeout(() => {
								episode.playSound({key:'sistersenter', volume:1});
								setTimeout(() => {
									const _bs = [37, 38];
									episode.phase = 100;
									for(let _b of _bs){
										const _boss = summonMobWithJson({
											id: _b,
											level: 13,
											atk: mainCharacter.atk * 2,
											grade: 4
										});
										//_boss.health = _boss.maxHP = 1;
										_boss.class = 'boss';
										//_boss.zoom = _boss.ZOOM = _boss.zoom * 1.2;
										_boss.experience = 0;
										mainCharacter.maxHP = mainCharacter.MAXHP =
										mainCharacter.maxHP * 1;
										mainCharacter.setHealth(mainCharacter.MAXHP);
										//_boss.animations.roll.maxCharge = 1;
										//delete _boss.animations.counterground;
										//delete _boss.animations.counterstun;
										//delete _boss.animations.escape;
										_boss.setDifficulty(__account.difficulty - 1);
										_boss.acceptChanges();
										_boss.pickNewTarget();
									}
									episode.pauseAmbianceMusic();
									episode.pauseBgMusic(1);
									episode.createBgMusic(null, null, null, 'cyclops-battle', .5);
									episode.playBgMusic();
								}, 1000);
							}, 4000);
						}
					},
					{
						when: function() {
							return mainCharacter.level > episode.phase;
						},
						do: function() {
							episode.phase++;
							for(let x of __storyScene.mobs){
								let y = summonMobWithJson(structuredClone2(x),0,1);
								y.experience = mainCharacter.level * 250;
								y.maxHP = y.MAXHP = mainCharacter.level * 30;
								y.setHealth(y.maxHP);
							}
							updateQuestArea(null, {
								id: 1000 + mainCharacter.level,
								descriptions: {
									en: 'Become Level ' + (mainCharacter.level + 1),
									tr: 'Seviye ' + (mainCharacter.level + 1) + ' ol'
								},
								names: {
									en: 'Power Up',
									tr: 'Güçlenme'
								},
								owner: 'system',
								minLevel: mainCharacter.level,
								maps: [201]
							});
						}
					},
					{
						when: function() {
							return episode.phase === 100 && !episode.enemies.filter(x => x.class === 'boss')?.length;
						},
						do: function() {
							episode.phase = 101;
							__storyScene.bossQuest.kills[0].count = 1;
							updateQuestArea(null, __storyScene.bossQuest);
							__storyPlaying = false;
							installStoryFinish();
						}
					}
				],
				mobs: [
					{
						id: 19,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					},
					{
						id: 20,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					},
					{
						id: 66,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					},
					{
						id: 28,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					},
					{
						id: 30,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					},
					{
						id: 24,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					},
					{
						id: 7,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					},
					{
						id: 1,
						minX: 1380,
						maxX: 4500,
						count: 1,
						spawn: 1,
						experience: 250,
						hp:60
					}
				]
			},
			getLobbyScene()
		]
	},	
	{
		id: 9,
		order: 9,
		disableWorldMap: true,
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return (_gameTick - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		ticket: 4,
		list:true,
		firstFinishRewards: [{ key: 'chest', grade: 1 }],
		perfectFinishRewards: [{ key: 'chest', grade: 1 }],
		rewards: [
			{ key: 'item', grade: 2, type: 'gloves', count:1 },
			{ key: 'fragment', name: 'cyclops,werewolf', minCount:1, maxCount:5 },
			{ key: 'gold', count: 9000 },
			{ key: 'exp', count: 1800 }
		],
		quests: [
			{
				id: 1,
				names: {
					en: 'Defend Huts',
					tr: 'Çadırları Koru'
				},
				descriptions: {
					en: 'Huts Defended',
					tr: 'Çadır Korundu'
				},
				owner: 'system',
				minLevel: 1,
				timer: {
					ms: 90000,
					iconPath: './images/main/cyclops/avatar.png',
					after: function() {
						const _huts = episode.enemies.filter(x => x.id === 80 || x.id === 81);
						if(_huts?.[0]) {
							const _deads = _huts.find(x => x.health <= 0);
							if(!_deads?.[0]) {
								_huts.forEach(x => x.invulnerable = x.skipHealthBar = true);
								__account.questStatus.quest.loots = [
									{
										object: ['hut'],
										limit: 2,
										count:2,
										noInfo: true,
										key: 'hut',
										type: 'quest-item',
										chanceRate: 100,
										command:'Defend'
									}
								];
								//getQuestRewards(__account.questStatus.quest);
								updateQuestArea();
								episode.phase = 20;
							}
						}
					}
				},
				maps: [10]
			},
			{
				id: 2,
				names: {
					en: 'Destroy Enemy',
					tr: 'Düşmanı Yok Et'
				},
				// descriptions: {
				// 	en: 'Enemy Destroyed',
				// 	tr: 'Düşman Yok Edildi'
				// },
				owner: 'system',
				minLevel: 1,
				maps: [10]
			}
		],
		title: {
			en: "Resistance",
			tr: "Direniş"
		},
		description: {
			en: "Our heroes and the villagers team up, the collected ingredients are boiled, and the resulting potion must be used after the villagers, alerted by the forest animals scurrying around, warn them. Will this potion have a positive or negative effect? The goblin army, which has raided the village's entrance, is determined to destroy it.",
			tr: "kahramanlarımız ve köy halkı birlik yapar, toplanan malzemeler kaynatılır ve elde edilen iksir etrafta koşuşturan orman hayvanlarını gören köylülerin uyarılarıyla artık kullanılmalıdır. Bu iksir olumlu mu yoksa olumsuz mu etki edecektir. Köyün girişine dadanan goblin ordusu köyü yerlebir etmeyi kafasına koymuştur."
		},
		boss: "cyclops",
		minLevel: 10,
		scenes: [
			{
				map: 10,
				save: true,
				from: 'left',
				save: true,
				startWith: 1,
				bonusRewards: [
					{ 
						when: function(_class) { return 'cyclops' === _class }, 
						key: 'fragment', 
						type: 'cyclops', 
						description: {
							"tr": "Tepegöz parçacığı",
							"en": "Cyclops fragment"
						}
					},
					{ 
						when: function(_class) { return 'werewolf' === _class }, 
						key: 'fragment', 
						type: 'werewolf', 
						description: {
							"tr": "Gökbörü parçacığı",
							"en": "Gökbörü fragment"
						} 
					}
				],
				bonus: [
					{
						owner: 'cyclops',
						description: {
							tr: 'Okçu kızı öldürme',
							en: 'Do not kill the archer girl'
						},
						when: function(){
							let _archer = episode.enemies.find(x => x.class === 'archer');
							if(_archer && !_archer.isDead() && _archer.health > 0)
								return true;
							return false;
						}
					},
					{
						owner: 'werewolf',
						description: {
							tr: 'Bomba yeteneği ile patronu öldür',
							en: 'Kill the boss with bomb skill'
						},
						when: function(){
							let _cyc = episode.enemies.find(x => x.id === 47);
							if(_cyc && _cyc.isDead() && (_cyc.lastHitSkill === 'defense'))
								return true;
							return false;
						}
					}
				],
				actions: [
					{
						when: function() {
							return episode.phase === 20;// && (mainCharacter.left + platformX) > _canvas.width;
						},
						do: function() {
							episode.phase = 21;
							mainCharacter.direction = 'right';
							mainCharacter.keyboard.holdingKeys = [];
							mainCharacter.disableKeyboard = true;
							mainCharacter.still = mainCharacter.immobilize = true;
							mainCharacter.animate('idle');
							mainCharacter.enableSkill('defense');
							episode.pauseBgMusic(1);
							setTimeout(() => {
								mainCharacter.yPosition = MathRound(groundheight / 2);
								platformX = 0;
								mainCharacter.left = MathRound((_canvas.width * .05) + mainCharacter.ORIGINDIST);
								mainCharacter.platformX = 0;
								const _cyclops = summonMob(47, _canvas.width,
									MathRound(groundheight / 2), mainCharacter.level);
								_cyclops.direction = 'left';
								_cyclops.zoom = 2;
								_cyclops.updateVariables();
								_cyclops.skipHealthBar = true;
								_cyclops.animate('idle');
								_cyclops.setAutoMode(0);
								_cyclops.left = MathRound(_canvas.width - (((_canvas.width * .05) + _cyclops.WIDTH) - _cyclops.ORIGINDIST));
								_cyclops.still = _cyclops.immobilize = _cyclops.ironSkin = true;
								episode.enemies.filter(x => !x.villain && x.class !== 'archer' && x.key !== 'vtl' && x.key !== 'vtm')?.forEach(x => {
									x.stopSpawn();
									x.health = 0;
									x.remove = true;
								});
								if(episode.respawners)
									episode.respawners = [];
							}, 1000);
							cssAnimations.vs(mainCharacter,
								{
									ms: 3000,
									enemyId: 47,
									keepDisableUI: true,
									q1: 'How do you see with one eye?',
									q2: 'I see dead people'
								},
								function() {
									injectModule('character-selection', function() {
										mainCharacter.name = 'Gökbörü';
										episode.width = _canvas.width;
										delete episode.towerDefenseStart;
										episode.still = true;
										var x = new characterSelection();
										x.createCharacterSelectionUI('werewolf', 'cyclops', function() {
											episode.mobs = [];
											summonMobWithJson({
												id: 19,
												minX: _canvas.width,
												maxX: _canvas.width,
												spawn: 2,
												ownerKey: episode.enemies.find(x => x.id === 47).key,
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true,
													skipHealthBar: true,
													direction: 'left'
												},
												count: 6
											}, 1);
											const _e19 = episode.enemies.filter(x => x.id === 19 && !x.remove && x.owner);
											let _archer = episode.enemies.find(x => x.class === 'archer');
											if(!_archer) {
												removeCoopCharacter(1);
												_archer = addCoopCharacter(null, 'arc');
												_archer.def *= mainCharacter.level;
											}
											if(_archer) {
												_archer.level = mainCharacter.level;
												resetSkills(null, 1, _archer);
												_archer.skipHealthBar = true;
												_archer.direction = 'right';
												_archer.left = MathRound(.05 * _canvas.width);
												_archer.platformX = 0;
												_archer.standBy();
												_archer.still = true;
												_archer.yPosition = MathRound(.7 * groundheight);
												_archer.setAutoMode(0, 1);
											}
											_e19[0].left = MathRound((_canvas.width * (.6 + (3.5 * .085))) + platformX);
											_e19[0].yPosition = MathRound((.2 * 1) * groundheight);
											_e19[1].left = MathRound(((_canvas.width * (.6 + (3.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[1].yPosition = MathRound((.2 * 2) * groundheight);
											_e19[2].left = MathRound(((_canvas.width * (.6 + (3.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[2].yPosition = MathRound((.2 * 3) * groundheight);
											_e19[3].left = MathRound((_canvas.width * (.6 + (3.5 * .085))) + platformX);
											_e19[3].yPosition = MathRound((.2 * 4) * groundheight);
											_e19[4].left = MathRound(((_canvas.width * (.6 + (1.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[4].yPosition = MathRound((.2 * 2) * groundheight);
											_e19[5].left = MathRound(((_canvas.width * (.6 + (1.5 * .085))) + platformX) + (_canvas.width * .05));
											_e19[5].yPosition = MathRound((.2 * 3) * groundheight);
											_e19.forEach(x => {
												x.setAutoMode(0, 1);
												x.standBy();
											});

											summonMobWithJson({
												id: 27,
												minX: 0,
												maxX:  0,
												spawn: 2,
												ownerKey: mainCharacter.key,
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true,
													skipHealthBar: true,
													direction: 'right'
												},
												count: 6
											}, 1);
											const _e27 = episode.enemies.filter(x => x.id === 27 && x.owner);
											_e27[0].left = MathRound((_canvas.width * (.4 - (3.5 * .085))) + platformX);
											_e27[0].yPosition = MathRound((.2 * 1) * groundheight);
											_e27[1].left = MathRound(((_canvas.width * (.4 - (3.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[1].yPosition = MathRound((.2 * 2) * groundheight);
											_e27[2].left = MathRound(((_canvas.width * (.4 - (3.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[2].yPosition = MathRound((.2 * 3) * groundheight);
											_e27[3].left = MathRound((_canvas.width * (.4 - (3.5 * .085))) + platformX);
											_e27[3].yPosition = MathRound((.2 * 4) * groundheight);
											_e27[4].left = MathRound(((_canvas.width * (.4 - (1.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[4].yPosition = MathRound((.2 * 2) * groundheight);
											_e27[5].left = MathRound(((_canvas.width * (.4 - (1.5 * .085))) + platformX) - (_canvas.width * .05));
											_e27[5].yPosition = MathRound((.2 * 3) * groundheight);
											_e27.forEach(x => {
												x.setAutoMode(0, 1);
												x.standBy();
											});
											episode.enemies.filter(x => x.key !== 'vtm' && x.key !== 'vtl' &&
												!x.alp && !x.owner && !x.villain)?.forEach(x => x.remove = true);
										},
										function(_another) {
											episode.bossFightStart = _gameTick;
											_another.level = 10;
											_another.ironSkin = mainCharacter.ironSkin = true;
											_another.releaseAfter = mainCharacter.releaseAfter =
											_another.animations.air2.maxRageCount =
											mainCharacter.animations.air2.maxRageCount = 30;
											mainCharacter.MAXHP = mainCharacter.maxHP = mainCharacter.health = 20000;
											_another.MAXHP = _another.maxHP = _another.health = 3000;
											_another.setDifficulty(__account.difficulty - 1);
											_another.grade = 5;
											_another.gradeLeft = 4;
											_another.updateVariables();
											_another.skipHealthBar = false;
											_another.setHealth(_another.MAXHP);
											//_another.setHealth(1); // TEST İÇİN
											_another.pvp = mainCharacter.pvp = true;
											const _archer = episode.enemies.find(x => x.class === 'archer');
											if(_archer && (_another.class === 'werewolf')) {
												_archer.level = mainCharacter.level;
												resetSkills(null, 1, _archer);
												_archer.friendly = false;
												_archer.immobilize = _archer.still = _archer.skipHealthBar = false;
												_archer.enemy = true;
												const _oldAvatar = document.getElementById('char-' + _coopMembers[0].key);
												if (_oldAvatar)
													_oldAvatar.remove();
												_coopMembers = [];
												_archer.setHealth(_archer.MAXHP);
												_archer.sight = 100;
												_archer.setAutoMode(2);
												_archer.pickNewTarget();
											}
											else if(_archer && (_another.class !== 'werewolf')) {
												_archer.level = mainCharacter.level;
												resetSkills(null, 1, _archer);
												_navbar.innerHTML += avatarTemplate(_archer);
												_archer.immobilize = false;
												_archer.autoTarget = undefined;
												_archer.setAutoMode(2);
												_archer.pickNewTarget();
												_archer.setHealth(_archer.MAXHP);
											}
											mainCharacter.setHealth(mainCharacter.MAXHP);
											episode.enemies.filter(x => x.id === 27).forEach(x => {
												x.immobilize = x.still = x.puppetMode = false;
												x.owner = mainCharacter.class === 'cyclops' ? _another : mainCharacter;
												x.enemy = mainCharacter.class === 'cyclops' ? true : false;
												x.setAutoMode(2, 1);
											});
											episode.enemies.filter(x => x.id === 19).forEach(x => {
												x.immobilize = x.still = x.puppetMode = false;
												x.owner = mainCharacter.class === 'werewolf' ? _another : mainCharacter;
												x.enemy = mainCharacter.class === 'werewolf' ? true : false;
												x.setAutoMode(2, 1);
											});
											episode.pauseBgMusic(1);
											episode.createBgMusic(null, null, null, 'story1-quest11', .65);
											episode.playBgMusic();
											_another.atk = mainCharacter.atk;
											_another.def = mainCharacter.def;
											mainCharacter.hbBars = undefined;
											_another.class = 'boss';
											mainCharacter.storyVariables = structuredClone2(episode.storyVariables);
											mainCharacter.maxExperience = mainCharacter.storyVariables.maxExperience;
											mainCharacter.experience = mainCharacter.storyVariables.experience;
											_another.experience = 0;
											episode.chosenFragment = mainCharacter.class;
											delete episode.storyVariables;
										});
									});
								}
							);
						}
					},
					{
						when: function() {
							return episode.phase === 10;
						},
						do: function() {
							episode.phase = 1;
							episode.enemies.filter(x => x.id === 58 || x.id === 72).forEach(x => x.remove = true);
						}
					},
					{
						when: function() {
							return episode.phase === 1 && (mainCharacter.LEFT + platformX) >= (_canvas.width * .6);
						},
						do: function() {
							episode.phase = 3;

						}
					},
					{
						when: function() {
							if(!episode.questStatus)
								episode.questStatus = document.getElementById('quest-status');
							return episode.phase === 2 && hasClass(episode.questStatus, 'd-none');
						},
						do: function() {
							episode.phase = 3;
							episode.pauseBgMusic(1);
						}
					},
					{
						when: function() {
							if(episode?.bossFightStart)
								return false;
							let _vtl = episode.enemies.find(x => x.key === 'vtl');
							let _vtm = episode.enemies.find(x => x.key === 'vtm');
							let _archer = episode.enemies.find(x => x.class === 'archer');
							return episode.towerDefenseStart && !episode.end &&
							(
								(_vtl && _vtl.isDead())
								||
								(_vtm && _vtm.isDead())
								||
								(_archer && _archer.isDead())
								||
								(_vtl?.health??1) <= 0
								||
								(_vtm?.health ?? 1) <= 0
								||
								(_archer?.health ?? 1) <= 0
							);
						},
						do: function() {
							episode.end = true;
							createStoryResultScreen(1);
						}
					},
					{
						when: function() {
							return episode.bossFightStart && !episode.fatalityAvailable &&
							(episode.enemies.filter(x => (x.id === 47 || x.id === 29) && x.health <= 0)?.length === 1);
						},
						do: function() {
							episode.fatalityAvailable = true;
							__account.questStatus.lastStoryFinishTime = _gameTick;
							const _b1 = episode.enemies.find(x => x.id === 47);
							const _b2 = episode.enemies.find(x => x.id === 29);
							if((_b1?.health ?? 1) <= 0 && _b2?.main){
								_b1.enterFinishState(_b2);
								_b2.removeBuffs();
							}
							if((_b2?.health ?? 1) <= 0 && _b1?.main){
								_b2.enterFinishState(_b1);
								_b1.removeBuffs();
							}
							episode.enemies.filter(x => x.id !== 29 && x.id !== 47 && x.key !== 'vtl' && x.key !== 'vtm')?.forEach(x => {
								x.stopSpawn();
								x.health = 0;
								x.remove = true;
							});
							//if(!episode.respawners)
								episode.respawners = [];
						}
					},
					{
						when: function() {
							return episode.bossFightStart && episode.fatalityAvailable &&
							episode.phase !== 666 &&
							episode.enemies.filter(x => x.pvp && !x.finishing && x.animation.startsWith('dead'))?.[0];
						},
						do: function() {
							episode.phase = 666;
							const _winner = episode.enemies.filter(x => x.pvp && !x.animation.startsWith('dead'))?.[0];
							if(_winner)
								_winner.standBy();
							setTimeout(() => {
								if(_winner) {
									_winner.animate('victory', 1);
									_winner.animations.idle.after = function() {
										if(mainCharacter === _winner) {
											__storyPlaying = false;
											installStoryFinish();
										}
										else {
											episode.end = true;
											createStoryResultScreen(1);
										}
										delete _winner.animations.idle.after;
									}
								}
							}, 2000);
						}
					},
					{
						when: function(){
							return episode.towerDefenseStart && (_gameTick - episode.towerDefenseStart) > 20000;
						},
						do:function(){
							//removeCoopCharacter(1);
							episode.towerDefenseStart = _gameTick;
							warn('<div class="flex heading achievement-red" style="position:relative;width:auto"><img style="height:15vh;z-index:-1" src="./images/icons/txtbg.png" /><div style="position:absolute;text-shadow:0px 0px 4px #000;color:#fff !important">' + getLangData('Bomber Frog Incoming') + '</div></div>');
							episode.playSound({ key: 'curse', volume: .5 });
							summonMobWithJson({
								id: 83,
								minX: 4000,
								maxX: 4000,
								targetKey: 'vtm',
								yPosition: groundheight,
								props: {
									onlyTarget: 'vtm',
									experience: 0,
									noLoot: true
								},
								count: 1
							}, 1);
							// summonMobWithJson({
							// 	id: 83,
							// 	minX: -1000,
							// 	maxX: 0,
							// 	spawn: 20,
							// 	targetKey: 'vtl',
							// 	props: {
							// 		experience: 0,
							// 		noLoot: true
							// 	},
							// 	count: 1
							// }, 1);
						}
					}
				],
				start: function() {
					// episode.bossFightStart = _gameTick;
					// mainCharacter.ironSkin = mainCharacter.pvp = true;
					// return;
					episode.realClass = mainCharacter.class;
					removeCoopCharacter(1);
					let _char = addCoopCharacter(null, 'arc');
					_char.direction = 'left';
					_char.left = MathRound(1185 * __zoom);
					_char.immobilize = true;
					_char.platformX = platformX;
					_char.yPosition = MathRound(.4 * groundheight);

					episode.still = true;
					mainCharacter.left = MathRound(1250 * __zoom);
					mainCharacter.direction = 'left';
					mainCharacter.immobilize = mainCharacter.still = true;
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.disableKeyboard = true;
					const _princess = episode.enemies.find(x => x.id === 58);
					const _father = episode.enemies.find(x => x.id === 72);
					_princess.puppetMode = _father.puppetMode = _princess.still = _father.still = _princess.immobilize = _father.immobilize = true;
					_princess.direction = 'right';
					cssAnimations.film(null, [
						{
							do: function() {
								createBubbleText({
									id: 1,
									location: { map: episode.id }, ms: 2000,
									owner: _princess.key,
									text: "They are close"
								});
							},
							ms: 2000
						},
						{
							do: function() {
								createBubbleText({
									id: 2,
									location: { map: episode.id }, ms: 2100,
									owner: _father.key,
									text: "Time to use potion"
								});
							},
							ms: 4200
						},
						{
							do: function() {
								createBubbleText({
									id: 3,
									location: { map: episode.id }, ms: 1500,
									owner: mainCharacter.key,
									text: "Take cover!",
									onend: function() {
										mainCharacter.direction = 'right';
										_princess.direction = _princess.moveDirection =
										_father.direction = _father.moveDirection = 'left';
										_princess.still = _father.still = false;
										_princess.puppetMode = _father.puppetMode = true;
										_princess.action = {
											command: 'move',
											to: -500 * __zoom,
										};
										_father.action = {
											command: 'move',
											to: -500 * __zoom,
										};
									}
								});
							},
							ms: 6500
						},
						{
							do: function() {
								_char.direction = 'right';
								createBubbleText({
									id: 4,
									location: { map: episode.id }, ms: 2000,
									owner: _char.key,
									text: "I'll stay for help"
								});
							},
							ms: 8200
						},
						{
							do: function() {
								createBubbleText({
									id: 5,
									location: { map: episode.id }, ms: 1200,
									owner: mainCharacter.key,
									text: "Here we go...",
									onend: function() {
										episode.phase = 10;
									}
								});
							},
							ms: 10200
						},
						{
							do: function() {
								__storyTell = new story(5, function() {
									const _var = structuredClone2({
										level: mainCharacter.level,
										experience: mainCharacter.experience,
										maxExperience: mainCharacter.maxExperience
									});
									const _left = mainCharacter.left;
									mainCharacter.remove = true;
									mainCharacter.main = false;
									startWithThisCharacter(29);
									mainCharacter.storyVariables = _var;
									episode.storyVariables = structuredClone2(_var);
									mainCharacter.level = _var.level;
									//setCharacterLevel(10, null, 1);
									_char = addCoopCharacter(null, 'arc', null, mainCharacter.level);
									resetSkills(null, 1, _char);
									_char.direction = 'right';
									_char.left = MathRound(1185 * __zoom);
									_char.immobilize = true;
									_char.platformX = platformX;
									_char.yPosition = MathRound(.4 * groundheight);
									mainCharacter.disableSkill('defense');
									episode.playSound({ key: 'puff', volume: .4 });
									mainCharacter.addObject({
										key: 'invisiblesmoke',
										position: 'middle'
									});
									mainCharacter.direction = 'right';
									mainCharacter.left = _left;
									mainCharacter.ironSkin = true;
									episode.enemies.filter(x => x.class === 'object')?.forEach(x => x.class = x.invulnerable = x.skipHealthBar = false);
									mainCharacter.yPosition = MathRound(groundheight / 2);
									episode.still = false;
									episode.width = MathRound(episode.width / 2);
									takeQuest(0, 1, null, null, 1);
									pauseQuestTimer();
									episode.pauseBgMusic(1);
									episode.moveCamera(function(){
										focusMe('#quest-status', function() {
											episode.playSound({ key: 'click' });
											mainCharacter.still = mainCharacter.immobilize = false;
											delete mainCharacter.disableKeyboard;
											resumeQuestTimer();
											mainCharacter.enableSkills();
											summonMobWithJson({
												id: 19,
												minX: 3000,
												maxX: 4000,
												spawn:2,
												targetKey: 'vtl,vtm',
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true
												},
												count: 20
											}, 1);
											summonMobWithJson({
												id: 49,
												minX: 3000,
												maxX: 4000,
												spawn:2,
												targetKey: 'vtl,vtm',
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true
												},
												count: 12
											}, 1);
											summonMobWithJson({
												id: 66,
												minX: 3000,
												maxX: 4000,
												spawn:2,
												targetKey: 'vtl,vtm',
												props: {
													skipHealthBar: true,
													experience: 0,
													noLoot: true
												},
												count: 10
											}, 1);
											episode.pauseBgMusic(1);
											episode.createBgMusic(null, null, null, 'story1-quest10-3', .65);
											episode.playBgMusic(1);
											_char.immobilize = false;
											_char.def *= mainCharacter.level;
											_char.releaseAfter = 5;
											episode.towerDefenseStart = _gameTick;

										}, false, getLangData('Defend the huts,<br/>keep your friends alive<br/>until that period of time'), 1);
										createBubbleText({
											id: 6,
											location: { map: episode.id }, ms: 2000,
											owner: mainCharacter.key,
											text: "Let's Rock!"
										});
									});
								}, 1);
							},
							ms: 11500
						}
					], 17300, function() {

					});
					mainCharacter.ironSkin = true;
					//episode.enemies.filter(x => x.class === 'object')?.forEach(x => x.invulnerable = true);
					// const _cyc = episode.enemies.find(x => x.id === 47);
					// _cyc.animations['hurtground1'].frames.forEach(x => x.speed *= 20);
					//removeCoopCharacter(1);
					//addCoopCharacter(null, 'arc');
					//takeQuest(9);
					// episode.pauseBgMusic(1);
					// episode.createBgMusic(null, null, function() {
					// 	episode.playBgMusic(1);
					// }, 'story1-quest10-3', .65);
					// episode.playBgMusic(1);
				},
				mobs: [
					{
						id: 80,
						minX: 562,
						maxX: 562,
						count: 1,
						do: function(_e) {
							_e.enemy = false;
							_e.noDirection = true;
							_e.healthBarIcon = 'target';
							_e.healthBarWidthRate = 3,
							_e.skipHealthBar = true;
							_e.healthBarHeightRate = 1.5;
							_e.solid = false;
							_e.targetPriority = 1;
							_e.harmless = true;
						},
						yPosition: function() {
							return groundheight;
						}
					},
					{
						id: 81,
						minX: 2090,
						maxX: 2090,
						count: 1,
						do: function(_e) {
							_e.enemy = false;
							_e.noDirection = true;
							_e.healthBarIcon = 'target';
							_e.healthBarWidthRate = 3,
							_e.healthBarHeightRate = 1.5;
							_e.skipHealthBar = true;
							_e.solid = false;
							_e.targetPriority = 1;
							_e.harmless = true;
						},
						yPosition: function() {
							return MathRound(groundheight * 1.11);
						}
					},
					{
						id: 58,
						minX: 950,
						maxX: 950,
						do: function(_e) {
							_e.direction = 'right';
							_e.noDirection = false;
						},
						yPosition: function() {
							return MathRound(groundheight * .5);
						}
					},
					{
						id: 72,
						minX: 1060,
						maxX: 1060,
						do: function(_e) {
							episode.msNow = 501;
							_e.direction = 'right';
							_e.noDirection = false;
							_e.swapAnimation('idle');
						},
						yPosition: function() {
							return MathRound(groundheight * .6);
						}
					}
					// {
					// 	id: 47,
					// 	minX: 1000,
					// 	maxX: 1000,
					// 	count: 1,
					// 	attackAfterHit: true,
					// 	yPosition: function() {
					// 		return MathRound(groundheight / 2);
					// 	},
					// 	props: {
					// 		health:1,
					// 		pvp: true,
					// 		ironSkin: true
					// 	}
					// }
				]
			},
			getLobbyScene()
		]
	},
	{
		id:10,
		side: true,
		disableWorldMap: true,
		order:10,
		boss:'al',
		minLevel:11,
		list: true,
		ticket:2,
		title: {
			en: 'Witch Grave',
			tr: 'Cadı Mezarı'
		},
		description: {
			en: "Al Karısı kidnaps a young boy from the village at midnight and the boy's mother and the villagers get worried when they can't see him. We will all witness together if our heroes can stop this witch and save the boy.",
			tr: "Al Karısı genç bir çocuğu köyden gece yarısı kaçırır ve çocuğun annesi ile köy halkı çocuğu göremeyince endişelenir. Kahramanlarımız bu cadıya dur diyebilip çocuğu kurtarabilecek mi hep birlikte şahit olacağız."
		},
		resultStars: [
			{ id: 1, title: 'Clear story', when: function() {
				return !mainCharacter.isDead();
			}},
			{ id: 2, key: 'time', value: 10 * 60000, title: 'Finish in time',
				when: function(_item) {
					//return !isMissionFailed(0) && !isMissionFailed(2) &&
					return ((__story.endTime ?? _gameTick) - (__story.startTime ?? _gameTick)) <= (_item.value);
			}},
			{ id: 3, key: 'hp', value: .5, title: 'Stay above %50 health', when: function(_item) {
				return mainCharacter.health >= MathFloor(mainCharacter.maxHP * _item.value);
			}}
		],
		rewards: [
			{ key: 'item', grade: 2, type: 'weapon' },
			{ key: 'gold', count: 9500 },
			{ key: 'exp', count: 1900 },
			{ key: 'fragment', name: 'al', minCount:1, maxCount:5, chance: 50 }
		],
		scenes: [
			// {
			// 	map: 1,
			// 	startWith: 1,
			// 	start: function() {
			// 		takeQuest(0, 1, null, 'begin');
			// 		episode.drawSpriteObjects2('druid', 1);
			// 	},
			// 	mobs: [
			// 		{
			// 			id: 69,
			// 			minX: 3340,
			// 			maxX: 3340,
			// 			count: 1,
			// 			yPosition: function() {
			// 				return groundheight;
			// 			}
			// 		},
			// 		{
			// 			id: 70,
			// 			minX: 4340,
			// 			maxX: 4340,
			// 			count: 1,
			// 			yPosition: function() {
			// 				return groundheight;
			// 			}
			// 		},
			// 		{
			// 			id: 73,
			// 			minX: 2400,
			// 			maxX: 2400,
			// 			count: 1,
			// 			yPosition: function() {
			// 				return groundheight;
			// 			}
			// 		},
			// 		{
			// 			id: '10002',
			// 			minX: 2740,
			// 			maxX: 2740,
			// 			count: 1,
			// 			do: function(_e) {
			// 				_e.npc = true;
			// 				_e.friendly = true;
			// 				_e.enemy = false;
			// 				_e.zoom *= .9;
			// 				_e.still = _e.noDirection = true;
			// 				_e.stepXRate = _e.stepX = 0;
			// 				_e.dialogs = createPotDialog('archer');
			// 			},
			// 			yPosition: function() {
			// 				return MathRound(groundheight * 1.1);
			// 			}
			// 		},
			// 		{
			// 			id: 71,
			// 			minX: 4550,
			// 			maxX: 4550,
			// 			count: 1,
			// 			yPosition: function() {
			// 				return groundheight;
			// 			}
			// 		},
			// 		{
			// 			id: 72,
			// 			minX: 1245,
			// 			maxX: 1245,
			// 			count: 1,
			// 			yPosition: function() {
			// 				return groundheight;
			// 			}
			// 		},
			// 		{
			// 			id: 58,
			// 			minX: 1900,
			// 			maxX: 1900,
			// 			count: 1,
			// 			do: function(_e) {
			// 				_e.npc = true;
			// 				_e.friendly = true;
			// 				_e.enemy = false;
			// 				_e.reversed = true;
			// 				_e.direction = 'left';
			// 			},
			// 			yPosition: function() {
			// 				return groundheight;
			// 			}
			// 		}
			// 	]
			// },
			{
				map: 11,
				startsWith: 1,
				from: 'left',
				loadingCharacterIds: [33, 35, 2, 1000, 46],
				save: true,
				start: function() {
					//takeQuest(0, 1, null, null, 1);
					//const _princess = summonMob(58, MathRound((mainCharacter.SCREENLEFT * 1.5) / __zoom), mainCharacter.yPosition, mainCharacter.level);
					//_princess.friendly = _princess.invulnerable = true;
					//_princess.still = _princess.immobilize = false;
					//_princess.direction = 'left';

					// mainCharacter.left = MathRound(_canvas.width / 5);
					// mainCharacter.direction = 'right';
					// mainCharacter.platformX = platformX = 0;

					mainCharacter.unarm();
					const _princess = episode.enemies.find(x => x.npc);
					mainCharacter.keyboard.holdingKeys = [];
					mainCharacter.disableKeyboard = mainCharacter.immobilize = true;
					cssAnimations.film(mainCharacter, [
						{
							do: function() {
								episode.dialogs = [];
								createBubbleText({
									id: 2,
									location: { map: episode.id }, ms: 2000,
									owner: _princess.key,
									text: "They kidnapped my child!"
								});
							},
							ms: 2000
						},
						{
							do: function() {
								_princess.puppetMode = 1;
								createBubbleText({
									id: 3,
									location: { map: episode.id }, ms: 2600,
									owner: mainCharacter.key,
									text: "Stay safe, i will do my best",
									onend: function(_e) {
										_princess.action = {
											command: 'move',
											to: -1 * MathRound(_canvas.width / 4),
											after: function(x) {
												x.remove = true;
											}
										};
									}
								});
							},
							ms: 4200
						}
					], 7000, function() {
						mainCharacter.disableUnarm();
						const _princess = episode.enemies.find(x => x.id === 58 && !x.remove);
						if(_princess)
							_princess.remove = true;
						__storyCutScenePlaying = 0;
						episode.phase = -1;
						delete mainCharacter.disableKeyboard;
						mainCharacter.immobilize = false;
						for(let i = 0; i < 3; i++) {
							const _m = summonMob(33, getRandomValue2(3000, 5000));
							_m.experience = 0;
							delete _m.finishableWith;
						}
						for(let i = 0; i < 3; i++) {
							const _m = summonMob(2, getRandomValue2(2000, 5000));
							_m.experience = 0;
							delete _m.finishableWith;
						}
						const _rider = summonMob(35, getRandomValue2(2000, 5000));
						_rider.experience = 0;
						const _flower = summonMob(46, getRandomValue2(2000, 5000));
						_flower.experience = 0;
						_flower.direction = 'left';
						_flower.yPosition = MathRound(getGroundHeight() / 2);
						});

				},
				actions: [
					{
						when: function() {
							return episode.phase === -1 && !episode.enemies.find(x => x.enemy && !x.remove);
						},
						do: function() {
							episode.phase = 1;
							episode.playSound({key:'alstart', volume:1});
								setTimeout(() => {
									const _boss = summonMobWithJson({
										id: 1000,
										level: 10,
										minX: 2500,
										maxX: 3500,
										grade: 5
									});
									episode.phase = 2;
									_boss.experience = 0;
									//_boss.health = _boss.maxHP = _boss.MAXHP = 1;
									_boss.pickNewTarget();
								}, 1000);
						}
					},
					{
						when: function() {
							return episode.phase === 2 && episode.enemies.find(x => x.class === 'boss')?.remove;
						},
						do: function() {
							// episode.phase = 3;
							// __storyPlaying = false;
							// installStoryFinish();
							episode.phase = 3;
							const _boss = episode.enemies.find(x => x.class === 'boss');
							summonMob(90, MathRound((_boss.SCREENLEFT + platformX) / __zoom), _boss.yPosition,1);
						}
					},
					{
						when: function() {
							return episode.phase === 3 && episode.enemies.find(x => x.enemy && x.class !== 'boss')?.remove;
						},
						do: function() {
							episode.phase = 4;
							__storyPlaying = false;
						}
					}
				],
				mobs: [
					{
						id: 58,
						count: 1,
						do: function(_e) {
							_e.direction = 'left';
							_e.npc = _e.reversed = _e.invulnerable = _e.friendly = _e.noDirection = true;
							_e.enemy = _e.still = false;
							_e.left = mainCharacter.left + MathRound(_canvas.width / 5);
						},
						yPosition: function() {
							return MathRound(getGroundHeight() / 2) - 1;
						}
					}
					// {
					// 	id: 33,
					// 	minX: 2380,
					// 	maxX: 4500,
					// 	count: 3,
					// 	do: function(_e) {
					// 		_e.experience = 0;
					// 		delete _e.finishableWith;
					// 	}
					// },
					// {
					// 	id: 2,
					// 	minX: 1380,
					// 	maxX: 4500,
					// 	count: 3,
					// 	do: function(_e) {
					// 		_e.experience = 0;
					// 		delete _e.finishableWith;
					// 	}
					// },
					// {
					// 	id: 35,
					// 	minX: 1380,
					// 	maxX: 4500,
					// 	count: 1,
					// 	do: function(_e) {
					// 		_e.experience = 0;
					// 	}
					// },
					// {
					// 	id: 46,
					// 	minX: 4500,
					// 	maxX: 4500,
					// 	count: 1,
					// 	do: function(_e) {
					// 		_e.experience = 0;
					// 		_e.direction = 'left';
					// 		_e.yPosition = MathRound(getGroundHeight() / 2);
					// 	}
					// }
				]
			},
			getLobbyScene()
		],
		quests: [
			{
				id: 1,
				key: '',
				names: {
					en: 'Save The Child',
					tr: 'Çocuğu Kurtar'
				},
				descriptions: {
					en: 'Child saved',
					tr: 'Çocuk kurtarıldı'
				},
				owner: 'system',
				minLevel: 7,
				kills: [{ enemy: [1000], limit: 1, key: 'Witch' }],
				maps: [11]
			},
		]
	}
];
let __story, __storySceneOrder, __storyScene, __storyCutScenePlaying, __storyPlaying;
var __storyBonusItemCount = 0;
function playStory(_id, _step, _func, _isFirstStart){
	resetQuestLine();
	const _s = __stories.find(x => x.id === _id);
	if(_s.passive) {
		warn('<span>' + getLangData('Story is passive for now') + '</span>', 'warn');
		return;
	}
	if(mainCharacter?.level && _s.minLevel > mainCharacter.level) {
		warn('<span>' + getLangData('Character level is too low') + '</span>', 'warn');
		return;
	}
	hideMyMenu();
	hideMenu();
	removeClass(_gameUI, 'disable-ui');
	__story = _s;
	if(!_isFirstStart)
		__storySceneOrder = __story.startScene ?? _step ?? 0;
	else
		__storySceneOrder--;
	episodeGold = episodePot = 0;
	__storyBonusItemCount = 0;
	switchStoryScene(function() {
		if(_func)
			_func();
		__story.startTime = _gameTick;
		__story.endTime = undefined;
	});
	mainCharacter.heartCount = __storyScene.heartCount ?? 1;
}
var _storySceneSwitching;
function switchStoryScene(_func, _newOrder) {
	if(_storySceneSwitching)
		return;
	_storySceneSwitching = 1;
	if(_newOrder)
		__storySceneOrder = _newOrder;
	else
		__storySceneOrder++;
	const _splash = document.getElementById('splash');
	removeClass(_splash, 'd-none');
	hideMyModalPopUp(1);
	__storyScene = __story.scenes[__storySceneOrder - 1];
	__storyPlaying = 1;
	if(__storyScene?.save && __storyCheckPoint?.sceneOrder !== (__storySceneOrder - 1)) {
		// __storyCheckPoint = JSON.parse(JSON.stringify(__account));
		// __storyCheckPoint.warn = 1;
		// __storyCheckPoint.sceneOrder = __storySceneOrder - 1;
	}
	//if(__storySceneOrder === 1) {// || (__storyScene.map !== __story.scenes[__storySceneOrder - 2].map)) {
		switchMap(__storyScene.map, null, null, null, __storyScene, function() {
			if(__storyScene.tiles?.[0])
				episode.loadLayers(__storyScene.tiles);
			if(__storyScene.mobs?.[0])
				episode.installMobs(__storyScene.mobs);
			if(__storyScene.objects?.[0])
				__storyScene.objects.forEach(x => episode.loadObject(x));
			setTimeout(() => {
				const _loc = __locations.find(x => x.mapId === episode.id);
				if(_loc) {
					document.querySelector('#world-mini-map .world-mini-map-img').style.background =
					'url(./images/icons/act' + _loc.act + '-map.jpg)';
					document.querySelector('#world-mini-map .world-mini-map-img').style.
					setProperty('background-position', _loc.left + ' ' + _loc.top, 'important');
				}
				episode.loadCharacterSprites(function() {
					addClass(_splash, 'd-none');
					const _ts = document.getElementById('tip-screen');
					if(_ts)
						_ts.remove();
					if(__storyCheckPoint?.warn) {
						//warn('<div class="flex heading achievement achievement-system" style="position:relative"><img src="./images/icons/loader.gif" /><span style="text-shadow:0px 0px 4px #000;color:#ffffffcc !important;flex:1">' + getLangData('Checkpoint Marked') + '</span></div>', 'level-up',null, 1);
						delete __storyCheckPoint.warn;
					}
					removeFocus();
					if(__storyScene.start)
						__storyScene.start();
					_storySceneSwitching = false;
					_game.suspended = false;
				}, __storyScene.loadingCharacterIds);
			}, 1000);
			if(_func)
				_func();
		});
	//}
}
function startStory(_order, _func, _isFirstStart,  _goldSelected, _expSelected, _itemSelected) {
	installStory(_order, function () {
		for (var i = 1; i <= Object.keys(chainSkills).length; i++)
			addClass(chainSkills['skill' + i], 'v-none');
		addClass(document.getElementById('first-splash'), 'v-none');
		removeClass(document.getElementById('game-start-loading-wrapper'), 'd-none');
		if(_func)
			_func();
	}, _isFirstStart,  _goldSelected, _expSelected, _itemSelected);
}
function installStory(_order, _func, _isFirstStart,  _goldSelected, _expSelected, _itemSelected) {
	//const _so = __storySceneOrder ?? 0;
	tryStartStoryMission(_order, _goldSelected, _expSelected, _itemSelected, _func, _isFirstStart);
	//playStory(_order, _so, _func, _isFirstStart,);
	// if(_so > 0) {
	// 	if(__storyScene.onCheckpoint)
	// 		__storyScene.onCheckpoint();
	// }
}
var __storyTell;
function story(_id, _func, _noBlack, _desc) {
	this.data = {
		st1: [
			{ text: '', ms: 0, w: '37%' },
			{ text: 'SPLASH!', ms: 400, marginLeft:'2%', class: 'talk', order: 3, w: '34.5%', position: 'top center' },
			{ text: '', ms: 800, imgSize: '117%', order: 4, marginLeft:'2%', w: '31%', position: 'top center' },
			{ finish: 1, ms: 4000 }
		],
		st2: [
			{ text: '', ms: 0, w: '40%', position: 'center left' },
			{ text: 'Over there!', ms: 400, marginLeft:'2%', class: 'talk', order: 3, w: '34.5%', position: 'top center' },
			{ text: '', ms: 800, imgSize: '125%', order: 4, marginLeft:'2%', w: '28%', position: 'top center' },
			{ finish: 1, ms: 4000 }
		],
		st3: [
			{ text: 'MEANWHILE...', ms: 0, class: 'desc', w: '26%' },
			{ text: 'CLUNK!', ms: 350, class: 'desc-vert',  w: '19.5%' },
			{ text: 'WHAT?', ms: 700, class: 'talk', w: '39%' },
			{ text: '', ms: 1050, w: '25.5%' },
			{ finish: 1, ms: 4000 }
		],
		st4: [
			{ text: '', ms: 0, w: '36%', position: 'bottom center' },
			{ text: '', ms: 400, order: 3, w: '40%', position: 'top right' },
			{ text: '', ms: 800, order: 4, w: '30.5%' },
			{ finish: 1, ms: 4000 }
		],
		st5: [
			{ text: '', ms: 0, w: '44%', position: 'top center' },
			{ text: '', ms: 400, order: 35, w: '34.5%', position: 'center left' },
			{ text: '', ms: 800, order: 4, w: '28%', position: 'top center' },
			{ finish: 1, ms: 4000 }
		]
	}
	this.id = _id;
	this.order = 1;
	const _s = this;
	this.init = function() {
		const _wrapper = document.createElement('div');
		_wrapper.className = 'story-wrapper fade-in' + (_desc ? ' story-with-description' : '');
		const _sin = document.createElement('div');
		_sin.className = 'full story-inner';
		const _inner = document.createElement('div');
		_inner.style.width = 'calc(36vh * ' + (this.data['st' + this.id].filter(x => !x.finish).length) + ')';
		_inner.className = 'inner-wrapper flex flex-jc-start';
		_wrapper.appendChild(_sin);
		if(_desc)
		{
			const _descDiv = document.createElement('div');
			_descDiv.className = 'story-inner-description flex';
			_descDiv.innerHTML = _desc;
			_wrapper.appendChild(_descDiv);
		}
		_sin.appendChild(_inner);
		document.body.appendChild(_wrapper);
		this.container = _inner;
		this.wrapper = _wrapper;
		if(!_noBlack)
			cssAnimations.black(null, this.data['st' + this.id].find(x => x.finish).ms - 400, '', _func);
	}
	this.render = function() {
		const i = this.order;
		if(i > _s.data.length)
			return;
		const item = _s.data['st' + this.id][i - 1];
		if((_gameTick - this.start) > item?.ms)
		{
			if(this.order === 1) {
				episode.playSound({key:'story', volume: .5});
			}
			if(!item.finish) {
				const _box = document.createElement('div');
				if(item.marginLeft)
					_box.style.left = item.marginLeft;
				_box.className = 'box box' + (item.order ?? i);
				if(item.w)
					_box.style.width = item.w;
				const _boxInner = document.createElement('div');
				_boxInner.className = 'full flex';
				if(item.position){
					_boxInner.style.setProperty('background-position', item.position, 'important');
					_boxInner.style.setProperty('transform-origin', item.position, 'important');
					_boxInner.style.setProperty('-webkit-transform-origin', item.position, 'important');
				}
				_boxInner.style.background =`url(./images/story/${this.id}/${i}.jpg)`;
				_boxInner.style.setProperty('background-size', (item.imgSize ?? '100%') + ' auto', 'important');
				
				this.container.appendChild(_box);
				_box.appendChild(_boxInner);
				_boxInner.innerHTML = `<div class="${item.class ?? 'full'}">${item.text ?? ''}</div>`;
			}
			else{
				removeClass(this.wrapper, 'fade-in');
				addClass(this.wrapper, 'fade-out');
				this.wrapper.onanimationend = function(event) {
					if(event.animationName === 'fade-out-me'){
						this.remove();
						__storyTell = undefined;
						if(_noBlack && _func)
							_func();
					}
				}
			}
			this.order++;
		}
	}
	this.start = _gameTick;
	this.init();
}

function storyBonus(_func, _instant) {
	const _s = this;
	this.init = function() {
		const _wrapper = document.createElement('div');
		_wrapper.className = 'story-wrapper story-gift-wrapper fade-in';
		const _sin = document.createElement('div');
		_sin.className = 'full story-inner story-gift-inner';
		const _inner = document.createElement('div');
		_inner.style.width = 'calc(36vh * 4)';
		_inner.className = 'inner-wrapper story-gift flex flex-jc-start';
		const _title = document.createElement('div');
		_title.className = 'w-100 flex story-gift-title';
		_title.innerText = 'Pick A Card';
		const _btnW = document.createElement('div');
		_btnW.className = 'w-100 flex story-gift-btn';
		const _btn = document.createElement('div');
		_btn.className = 'flex game-btn2 disabled';
		_btn.innerText = 'CONTINUE';
		_btn.onclick = function(){
			_s.close();
			if(_func)
				_func();
		};
		_btnW.appendChild(_btn);
		_wrapper.appendChild(_title);
		_wrapper.appendChild(_sin);
		_wrapper.appendChild(_btnW);
		_sin.appendChild(_inner);
		document.body.appendChild(_wrapper);
		this.container = _inner;
		this.wrapper = _wrapper;
		this.btn = _btn;
		this.render();
	}
	this.close = function() {
		if(this.closing)
			return;
		this.closing = 1;
		removeClass(this.wrapper, 'fade-in');
		addClass(this.wrapper, 'fade-out');
		this.wrapper.onanimationend = function(event) {
			if(event.animationName === 'fade-out-me')
				this.remove();
		}
	}
	let _possibilities = [ 'exp', 'gold', 'gold*2', 'item' ];
	this.render = function() {
		_possibilities = _possibilities.sort(() => Math.random() - 0.5);
		for (var i = 0; i < 4; i++) {
			let _iconPath;
			if(_possibilities[i] === 'item'){
				const _item = __story.rewards.find(x => x.key === 'item');
				_iconPath = './images/items/icons/' +
				(_item.type === 'weapon' ? mainCharacter.class + '/' : '')
				+ _item.type + (_item.grade ?? 1) + '.png';
			}
			else
				_iconPath = './images/icons/' + _possibilities[i].split('*')[0] + '.png';
			const _item = document.createElement('div');
			_item.className = 'card-item flex';
			const _wrapper = document.createElement('div');
			_item.appendChild(_wrapper)
			const _front = document.createElement('div');
			const _back = document.createElement('div');
			const _inner = document.createElement('div');
			const _img = document.createElement('img');
			const _title = document.createElement('div');
			const _itemImage = document.createElement('img');
			_itemImage.className = 'match-img';
			_itemImage.src = _iconPath;
			_img.className = 'match-img';
			_inner.className = 'flip-card-inner flex';
			_front.className = 'card-front flex match-item';
			_back.className = 'card-back flex match-item';
			_wrapper.className = 'match-card flex glow-jump';
			_img.src = './images/icons/story-gift-card.png';
			_title.className = 'bonus-title full flex';
			_s.container.appendChild(_item);
			_front.setAttribute('data-key', _possibilities[i]);
			_front.onclick = function () {
				if(_s.turning)
					return;
				const _dk = this.getAttribute('data-key');
				let _cardTitle;
				if(_dk === 'item'){
					const r = __story.rewards.find(x => x.key === 'item');
					_cardTitle = '';
					warnChestReward(getChestReward(r.grade ?? 1, 'item', { key: r.type }));
				}
				else{
					const _reward = getChestReward(_dk.split('*')?.[1] ? parseInt(_dk.split('*')[1]) : __account.act ?? 1, _dk.split('*')[0]);
					_cardTitle = _reward.count.formatWithDots();
					warnChestReward(_reward);
				}
				_title.innerText = _cardTitle;
				removeClass(_s.btn, 'disabled');
				episode.playSound({key:'select2', volume:.5});
				_wrapper.classList.add('selected');
				document.querySelectorAll('.story-gift .match-card').forEach(x =>
					x.classList.add('flip-card'));
				_s.turning = true;
				_s.timer = setTimeout(function () {
					_img.setAttribute("data-opened", 'y');
					_s.turning = false;
				}, 1000);
			}
			_wrapper.appendChild(_inner);
			_inner.appendChild(_back);
			_inner.appendChild(_front);
			_front.appendChild(_img);
			_back.appendChild(_itemImage);
			_back.appendChild(_title);
		}
	}
	this.start = _gameTick;
	if(!_instant)
		this.init();
	this.get = function() {
		return _possibilities[getRandomValue2(0, _possibilities.length - 1)];
	}
}


// setTimeout(() => {
// 	const asd = new storyBonus();
// }, 12000);

// setInterval(() => {
// 	if(!mainCharacter)
// 		return;
// 	dmgFrames.push({
// 		text: '',
// 		x: mainCharacter.LEFT,
// 		y: _canvas.height - mainCharacter.yPosition - mainCharacter.getHeight()
// 	});
// }, 2000);

function focusMe(_selector, _func, _transparent, _text, _doneBtn, _fingerFade) {
	cssAnimations.focusui(_selector, _func, _transparent, _text, _doneBtn, null, _fingerFade);
	if(!_transparent) {
		mainCharacter.disableSkills(1);
		mainCharacter.immobilize = mainCharacter.still = true;
		mainCharacter.keyboard.holdingKeys = [];
		mainCharacter.disableKeyboard = true;
	}
}
function removeFocus(_reUse) {
	const _ui = document.querySelectorAll('#focus-ui');
	if(_ui?.[0])
		_ui.forEach(x => x.remove());
	const _push = document.querySelector('.push-me-finger');
	if(_push)
		_push.remove();
	const _focuses = document.querySelectorAll('.focus-me');
	if(_focuses?.[0])
		_focuses.forEach(x => removeClass(x, 'focus-me'));
	_focusMode = undefined;
	removeClass(_gameUI, 'focus-ui-activated');
}
function portTo(_id) {
	if(!_id)
		return;
	hideMyMenu();
	if(!__story)
		switchMap(_id);
	else {
		if(__story.scenes[__storySceneOrder]?.map === _id)
			switchStoryScene();
		else
			switchMap(_id);
	}
}

function createStoryResultScreen(_failed) {
		if(mainCharacter.isDead() || _failed)
			__story.resultStars.forEach(x => x.failed = 1);
		if (!pvpResult)
			pvpResult = document.getElementById('pvp-result');
		if (!pvpStatus)
			pvpStatus = document.getElementById('pvp-status');
		showMyModalPopUp('pvp-result');
		episode.pauseBgMusic(1);
		episode.pauseAmbianceMusic();
		mainCharacter.stopHeartBeatSound();
		// for(let i = 0; i < __story.resultStars.length; i++)
		// 	if(isMissionFailed(i))
		// 		__story.resultStars[i].failed = true;
		const _fail = !__story.resultStars.filter(x => !x.failed)?.length;
		if(!_fail)
			episode.playSound({ key: 'victory', volume: .2 });
		else
			episode.enemies.forEach(x => x.standBy());
		let _table = '<div class="flex full pvp-result-table story-result"><div class="flex" style="width:100%;height:16vh;position:relative"><img src="./images/ui/wood.png" style="height:30%;margin-top:5vh;z-index:2;filter:drop-shadow(.5vh 1vh 1.5vh black);-webkit-filter:drop-shadow(.5vh 1vh 1.5vh black);position:absolute' + (_fail ? ';-webkit-filter:grayscale(66%);filter:grayscale(66%)': '') + '"' + (_fail ? ' class="gray"': '') + ' /><span style="z-index:2;margin-top:4.5vh;font-size:3.5vh!important;font-weight:600;text-shadow:0px 0px 1vh #000;color:' + (_fail ? 'crimson' : '#F4BB44') + ' !important">' + getLangData('Story' + (_fail ? ' Failed' : ' Cleared')) + '</span></div><div class="game-over-results"><div style="width:100%" class="flex"><span>';
		for(let _star of __story.resultStars)
			_table += `<div class="flex" style="padding:2vh 2vh 0 2vh;width:100%;height:6vh">
				<img src="./images/ui/star-${_star.failed ? 'off' : 'on'}.png" style="height:4vh"${_star.failed ? '' : ' class="glow"'} />
				<div class="flex flex-jc-start one-line game-over-result" style="${_star.failed ? 'color:#f7f7f799 !important;text-decoration: line-through' : 'color:#F4BB44 !important'}">
					${getLangData(_star.title)}
				</div>
			</div>`;
		_table += `</span></div>`;
		const _gain = _fail ? [] : JSON.parse(JSON.stringify(__story.rewards));
		if(_fail) {
			if(__story?.bonus === 'exp') {
				if(episode?.killCount > 0)
					_gain.push({key:'exp', count:episode.killCount * __account.act, bonus:1});
			}
		}
		else {
			const _bonuses = __storyScene.bonus?.filter(x => x.owner === mainCharacter.class);
			if(_bonuses?.[0])
			{
				let _warn;
				for(const _bon of _bonuses) {
					if(_bon.when()){
						getChestReward(__account.grade ?? 1, 'misc', 'chest');
						_warn = 1;
					}
				}
				if(_warn)
					warn('<div class="flex important achievement" style="position:relative"><img style="height:12vh" src="./images/icons/chest.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Bonus Reward') + '</span></div>', null, null, 1);
			}
			if(__story.perfectFinishRewards && (__story.resultStars.filter(x => !x.failed)?.length ?? 0) === 3)
				for(const _r of __story.perfectFinishRewards)
					_gain.push(JSON.parse(JSON.stringify(_r)));
			if(episodeGold > 0){
				_gain.push({key:'gold', count:episodeGold, bonus:1});
				episodeGold = 0;
			}
			if(__storyBonusItemCount > 0) {
				_gain.push({key:'item', count: __storyBonusItemCount, grade:__story.equipmentGrade, type: __story.equipmentType, bonus:1});
				__storyBonusItemCount = 0;
			}
		}
		const _rewards = [];
		for(const _g of _gain){
			if(!_g.count && _g.minCount && _g.maxCount)
				_g.count = getRandomValue2(_g.minCount, _g.maxCount);
			if(_g.key === 'chest')
				for(let _i = 0; _i < (_g.count ?? 1); _i++)
					_rewards.push(getChestReward(_g.grade ?? 1));
			else{
				if(_g.chance > 0 && !checkChanceIfOk(_g.chance))
					continue;
				if (_g.key === 'gold')
					updateGold(_g.count);
				else if(_g.key === 'fragment')
					updateFragment(_g.name, _g.count);
				else if (_g.key === 'exp')
					updateExperience(_g.count);
				else if (_g.key === 'pot')
					updatePot(_g.count);
				else if(_g.key === 'item'){
					for(let i = 0; i < _g.count; i++)
						getChestReward(_g.grade ?? 1, 'item', { key: _g.type }, 1);
					_g.src = './images/items/icons/' + _g.type + (_g.grade ?? 1) + '.png';
				}
				_rewards.push(JSON.parse(JSON.stringify(_g)));
			}
		}
		_table += `<div class="flex" style="width:100%;padding:2vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Clear Rewards')}</div>`;
		for(let _reward of _rewards)
			_table += `<div class="flex flex-jc-start" style="width:100%;height:5vh"><div style="height:100%" class="flex flex-jc-start"><img style="width:4vh;margin-left:2vh" src="${_reward.src ?? './images/icons/' + _reward.key + '.png'}" /><div class="flex one-line" style="flex:1;height:100%;font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">${(_reward.count ?? 1).formatWithDots()} x ${getLangData(_reward.title ?? _reward.type ?? _reward.key).toProperCase()}${_reward.bonus ? ' (bonus)' : ''}</div></div></div>`;
			//_table += `<div class="flex" style="width:100%;padding:2vh 0 1vh 0;color:#F4BB44 !important; font-size:2.6vh !important; font-weight: 600">${getLangData('Mission Rewards')}</div>
			//<div class="flex" style="width:100%;height:5vh"><div style="height:100%" class="flex"><img style="width:5vh" src="./images/icons/coin.png" /><div class="flex" style="height:100%;font-size:2.4vh !important;color:#f7f7f7cc !important;padding-left:2vh">${_missionGain} ${getLangData('Gold')} (+Bonus)</div></div></div>`;
		
		_table += `</div><div class="flex" style="width:100%;height:7.5vh;position:relative;z-index:2">
			<div class="flex" style="width:calc(50% - 1vh);margin-right:1vh;overflow:hidden;position:relative;height:100%">
				<div class="framed-btn full flex animate-me" style="border:.2vh solid #B8860Bab;right:unset;top:unset;cursor:pointer;color:#B8860Bcc !important;font-size:3vh !important;line-height:6.5vh !important;height:6.5vh !important" onclick="quitFromStory()">${getLangData('QUIT')}</div>
			</div>`
			// <div class="${_fail ? 'd-none' : 'flex'}" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
			// 	<div class="game-menu-button btn-info full flex animate-me" style="border:.2vh solid #B8860Bab;right:unset;top:unset;cursor:pointer;color:#B8860Bcc !important;font-size:3vh !important;line-height:3vh !important" onclick="trySwitchMap(${episode.id})">${getLangData('NEXT')}</div>
			// </div>
			+`<div class="${_fail ? 'flex' : 'd-none'}" style="width:calc(50% - 1vh);margin-left:1vh;overflow:hidden;position:relative;height:100%">
				<div class="framed-btn full flex animate-me" style="border:.2vh solid #B8860Bab;height:6.5vh !important;right:unset;top:unset;cursor:pointer;color:#B8860Bcc !important;font-size:3vh !important;line-height:6.5vh !important" onclick="loadLastStoryCheckPoint(null,${episode.goldSelected ? 1 : 0}, ${episode.expSelected ? 1 : 0}, ${episode.itemSelected ? 1 : 0})">${getLangData('RETRY')}</div>
			</div>
		</div>`;
		pvpStatus.innerHTML = _table + '</div>';
		if(mainCharacter.storyVariables)
		{
			mainCharacter.setProps(mainCharacter.storyVariables);
			delete mainCharacter.storyVariables;
		}
		switchAutoMode(1);
		episode.enemies.forEach(x => {
			if(x.health > 0)
				x.animate('idle',1);
			if (x.heartbeat) {
				x.heartbeat.pause();
				x.heartbeat = undefined;
			}
		});
		if (mainCharacter?.heartbeat) {
			mainCharacter.heartbeat.pause();
			mainCharacter.heartbeat = undefined;
		}
		_game.suspended = true;
}
function quitFromStory() {
	if(__account.storyResults.find(x => x.id === 1)?.stars?.[0]) {
		const _index = __story.scenes.findIndex(x => x.map === 0);
		if(_index >= 0)
			switchStoryScene(null, _index + 1);
		else
			switchStoryScene();
	}
	else
		askExitApp();
}
function checkStoryFinish(_success, _retryId, _goldSelected, _expSelected, _itemSelected) {
	const _after = function() {
		if(!_retryId)
			switchStoryScene();
		else{
			resetQuestLine();
			tryStartStoryMission(_retryId, _goldSelected, _expSelected, _itemSelected);
		}
	}
	if(_success)
		new storyBonus(function() {
			_after();
		});
	else
		_after();
}

function loadLastStoryCheckPoint(_func, _goldSelected, _expSelected, _itemSelected) {
	prevPlatformX = __storySceneOrder = undefined;
	//if(__storyCheckPoint){
		// hideMyModalPopUp();
		// __storySceneOrder = __storyCheckPoint.sceneOrder;
		// delete __storyCheckPoint.sceneOrder;
		// __account = JSON.parse(JSON.stringify(__storyCheckPoint));
		// startStory(__story.id, _func);
	//}
	//else
		startStory(__story.id, _func, null, _goldSelected, _expSelected, _itemSelected);
}

function createStoryUI(_id) {
		if(__story && __account.questStatus?.quest) {
			renderMainQuests();
			return;
		}
		updateMenuBottom(2);
		const _container = selectMenuContainer();
		if(!_id)
			_id = __stories.find(x => x.list).id;
		_container.innerHTML =
					'<div class="menu-ui-left fade-me">' +
						'<div class="menu-modal-left menu-modal-left-content">' +
							'<div class="stories-content-left skills-content-left menu-modal-left-container">' +
								'<div style="padding:1% 5%;overflow-y:auto" class="full">' +
									createStoriesUI(_id ?? 1) +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="menu-ui-right fade-me">' +
						'<div class="menu-modal-right menu-modal-right-content">' +
							'<div class="stories-content-right skills-content-right">' +
								'<div class="skills-content-detail-wrapper menu-modal-right-container" style="position:relative !important;overflow:hidden !important">' +
									createStoryDetailUI(_id ?? 1, 1) +
								'<div id="shine"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
	}
function createStoriesUI(_id) {
	let _html = '';
	if(!_id)
		_id = 1;
	_uiSelectedStoryId = _id;
	for (var _s of __stories) {
		if(!_s.list)
			continue;
		const _ss = __account.storyResults.find(x => x.id === _s.id);
		// html += '<div data-key="'+_skill.key+'" onclick="skill.selectSkill(\'' + _skill.key + '\', ' + _i + ')" class="skill-card animate-me flex' + ((_i + 1) === _order ? ' selected' : '') + '">' +
		// 			'<div class="skill-icon-wrapper flex"><img src="./images/main/skill-icons/' + _class + '/' + _skill.key + '.png" /></div>' +
		// 			'<div style="flex:1;height:100%">' +
		// 			'<div class="flex flex-jc-start skill-card-title" style="height:50%;width:100%">' + _skill.names[getLang()] + '</div>' +
		// 			(_level > 0 ?
		// 				'<div class="flex flex-jc-start skill-card-level"><span id="skill-' + _skill.key + '-level">' + _level + '</span>&nbsp;/&nbsp;' + _skill.props.length + '</div>' :
		// 				'<div class="flex flex-jc-start skill-card-state">' + getLangData('Unlock') + ':&nbsp;<span style="color:#ff6c00 !important">' + getLangData('Level') + ' ' + _skill.unlockLevel + '</span></div>') +
		// 			'</div>' +
		// 			'</div>';
		_html += `<div id="story-${_s.id}" onclick="selectStoryUI(${_s.id})" class="skill-card flex animate-me${_s.id === _id ? ' selected' : ''}">
			<div class="skill-icon-wrapper flex">
				<img src="./images/main/${_s.boss}/concept.png" />
			</div>
			<div class="flex" style="flex:1;height:100%;padding:1vh 0">
				<div class="flex flex-jc-start skill-card-title w-100" style="height:40%">${_s.title[getLang()]}</div>
				<div class="story-level flex flex-jc-start w-100" style="height:30%">Level ${_s.minLevel} required</div>
				<div class="story-consume flex flex-jc-start w-50" style="height:30%">${_s.ticket}&nbsp;<img src="./images/icons/key.png" style="height:2.8vh" /></div>
				<div class="story-stars flex flex-jc-end w-50" style="height:30%">
					<img src="./images/ui/star-${(!_s.locked && _ss?.stars) ? 'on' : 'off'}.png"  />
					<img src="./images/ui/star-${(!_s.locked && (_ss?.stars?.length >= 2)) ? 'on' : 'off'}.png" />
					<img src="./images/ui/star-${(!_s.locked && _ss?.perfect) ? 'on' : 'off'}.png" />
				</div>
			</div>`
			+ (_s.bonus ? 
				`<div class="story-bonus-mark">BONUS</div>` : (_s.side ? `<div class="story-bonus-mark story-side-bonus-mark">SIDE QUEST</div>` :'')) +
		`</div>`;
	}
	return _html;
}
function selectStoryUI(_id) {
	const _skillCards = document.querySelectorAll('#menu-ui .skill-card');
	const _container = document.querySelector('.menu-modal-right-container');
	unselectStoryTickets();
	let _i = 1;
	for (var _sc of _skillCards) {
		if (_i === _id) {
			addClass(_sc, 'selected');
			//const _skill = this.allSkills.filter(x => x.class === mainCharacter.class  && x.list !== false)?.sort((a, b) => a.order - b.order)[_index];
			//_container.innerHTML = this.getSkillDetailUI(mainCharacter.class, _skill.order) + '<div id="shine"></div>';
			_uiSelectedStoryId = _id;
			_container.innerHTML =createStoryDetailUI(_id);
		}
		else
			removeClass(_sc, 'selected');
		_i++;
	}
}
function createStoryDetailUI(_id, _noSound) {
	if(!_noSound)
		episode.playSound({ key: 'click' });
	const _s = __stories.find(x => x.id === _id);
	if(_s?.locked) {
		warn('<span>' + getLangData('Story is locked for now') + '</span>', 'warn');
		return;
	}
	const _cards = document.querySelectorAll('.stories-content-left .skill-card');
	for(let _card of _cards)
		removeClass(_card, 'selected');
	addClass(document.getElementById('story-' + _id), 'selected');
	let _goals = '', _goali = 0;
	const _ss = __account.storyResults.find(x => x.id === _s.id);
	if(_s.resultStars)
		for(let _rs of _s.resultStars){
			const _done = _ss?.stars?.indexOf(parseInt(Math.pow(2, _goali))) >= 0;
			_goals += `<div class="w-100 story-goal-item flex">
				<div class="flex story-goal-icon">
					<img src="./images/ui/${_done ? '36' : 'lock'}.png" />
				</div>
				<div class="flex flex-jc-start story-goal-title"${_done ? ' style="color:#F3F4F5 !important"' : ''}>
					${_rs.title}
				</div>
			</div>`;
			_goali++;
		}
	//const _div = document.createElement('div');
	//_div.className = 'flex show-ui story-detail fade-in';
	let _html = `<div class="flex full show-ui story-detail fade-me"><div class="flex flex-jc-end story-detail-close"><div>${__account.act}-${_s.order}&nbsp;${_s.title[getLang()]}</div></div>
		<div class="story-detail-wrapper">`
		+ _goals +
		`<div class="flex flex-jc-start story-detail-heading" style="margin-top:2vh">${getLangData('Rewards')}</div>
		<div class="story-rewards w-100 flex flex-jc-start">`;
	for(const _r of _s.rewards) {
		if(_r.key === 'fragment'){
			let _img = '';
			const _arr = _r.name?.split(',') ?? ['random'];
			for(let i = 0; i < _arr.length; i++)
				_img += `<img style="left:${i * 5}vh;position:absolute;top:0" src="./images/fragments/${_arr[i]}.png" />`;
			_html += `<div class="flex flex-jc-start w-50 story-reward story-reward-fragment">
						<div style="position:relative;height:8vh;width:calc(8vh + ${((_arr.length - 1) * 5)}vh)">`
						+ _img +
						`</div>
						<div style="flex:1" class="flex">
							<div class="w-100 flex flex-jc-start">
								${(_r.count ? _r.count.formatWithDots() : ((_r.minCount && _r.maxCount) ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1))}
							</div>
							<div style="color:#ff6c00 !important" class="w-100 flex-jc-start flex${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
						</div>
					</div>`;
		}
		else if(_r.key === 'gem')
				_html += `<div class="flex flex-jc-start w-50 story-reward">
						<span class="${_r.type === 'random' ? '' : 'story-reward-item grade' + (_r.grade ?? 1) + '-item'}" style="display:inline-block;position:relative">
							<img class="item-img" src="./images/gems/${_r.type}${_r.grade ?? 1}.png" />
						</span>
						<div style="flex:1;padding-left:1vh" class="flex">
							<div class="w-100 flex flex-jc-start">
								${(_r.count ? _r.count.formatWithDots() : ((_r.minCount && _r.maxCount) ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1))}
							</div>
							<div style="color:#ff6c00 !important" class="flex flex-jc-start w-100${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
						</div>
					</div>`;
		else if(_r.key === 'item')
			_html += `<div class="flex flex-jc-start w-50 story-reward">
						<span class="story-reward-item grade${_r.grade ?? 1}-item" style="display:inline-block;position:relative">
							<img class="item-img" src="./images/items/icons/${(_r.type ?? _r.key) === 'weapon' ? mainCharacter.class + '/' : ''}${_r.type ?? _r.key}${_r.grade ?? 1}.png" />
						</span>
						<div style="flex:1;padding-left:1vh" class="flex">
							<div class="w-100 flex flex-jc-start">
								${(_r.count ? _r.count.formatWithDots() : ((_r.minCount && _r.maxCount) ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1))}
							</div>
							<div style="color:#ff6c00 !important" class="flex flex-jc-start w-100${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
						</div>
					</div>`;
		else
			_html += `<div class="flex flex-jc-start w-50 story-reward">
							<img src="./images/${_r.key === 'item' ? 'items/' : ''}icons/${_r.type ?? _r.key}${_r.grade ?? ''}.png" />
							<div style="flex:1" class="flex">
								<div class="w-100 flex flex-jc-start">
									${(_r.count ? _r.count.formatWithDots() : ((_r.minCount && _r.maxCount) ? _r.minCount.formatWithDots() + ' - ' + _r.maxCount.formatWithDots() : 1))}
								</div>
								<div style="color:#ff6c00 !important" class="flex flex-jc-start w-100${_r.chance ? '' : ' d-none'}">%${_r.chance}&nbsp;${getLangData('chance')}</div>
							</div>
						</div>`;
	}
	_html +=
		`</div>
		<div class="flex flex-jc-start story-detail-heading" style="margin-top:2vh">${getLangData('Description')}</div>
		<div class="story-description">${_s.description[getLang()]}</div>
		</div>
		<div class="w-100 flex action-button-container" style="height:14%">
			<div onclick="tryStartStoryMission(${_id})" class="flex game-menu-button">
				<div class="flex">${getLangData('START')}</div>
			</div>
		</div>
	</div>`;
	//_gameUI.appendChild(_div);
	return _html;
}
function getStoryRewardsResultHtml(_story, _bonus, _pass) {
	let _rewardsHtml = '';
	if(_bonus){
		if(_bonus === 'item') {
			const r = __stories.find(x => x.id === _uiSelectedStoryId).rewards.find(x => x.key === 'item');
			_bonus = getChestReward(r.grade ?? 1, 'item', { key: r.type });
		}
		else
			_bonus = getChestReward(_bonus.split('*')?.[1] ?
		parseInt(_bonus.split('*')[1]) : __account.act ?? 1, _bonus.split('*')[0]);
	}
	for(let r of _story.rewards)
	{
		if(r.chance && getRandomValue2(1, 100) > r.chance)
			continue;
		let _count = r.count ?? 1;
		if(r.minCount >= 0 && r.maxCount >= 0)
			_count = getRandomValue2(r.minCount, r.maxCount);
		if(r.key === 'gold' && episode.goldSelected)
			_count *= 2;
		else if(r.key === 'exp' && episode.expSelected)
			_count *= 2;
		else if(r.key === 'item' && episode.itemSelected)
			_count *= 2;
		if(r.key === 'item'){
			_count =  _count + (_bonus?.type === r.type ? 1 : 0);
			for(let i = 0; i < _count; i++)
				getChestReward(r.grade, 'item', { key: r.type });
			_rewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 50%${episode.itemSelected ? ';color:#F4BB44 !important' : ''}">
				<span class="story-reward-item grade${r.grade}-item" style="display:inline-block;position:relative">
					<img class="item-img" src="./images/items/icons/${r.type === 'weapon' ? mainCharacter.class + '/' : ''}${r.type}${r.grade}.png" />
				</span> x ${_count}
			</div>`;
		}
		else if(r.key === 'fragment'){
			const _names = r.name?.split(',') ?? ['random'];
			const _name = episode.chosenFragment ?? _names[getRandomValue2(0, _names.length - 1)];
			updateFragment(_name, _count);
			_rewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 50%">
				<img style="filter:drop-shadow(0 0 1px #f3f4f5);height: 70%;margin-right: 5%;" src="./images/fragments/${_name}.png"> x ${_count}
			</div>`;
		}
		else if(r.key === 'gem'){
			const _gem = updateGem(r.type, r.grade, _count);
			_rewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 50%">
				<img style="filter:drop-shadow(0 0 1px #f3f4f5);height: 70%;margin-right: 5%;" src="./images/gems/${_gem.type}${_gem.grade}.png"> x ${_count}
			</div>`;
		}
		else if(r.key === 'gold'){
			updateGold(_count);
			if(_bonus?.type === 'gold')
				_count += _bonus.count;
			_rewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 50%${episode.goldSelected ? ';color:#F4BB44 !important' : ''}">
				<img style="height: 70%;margin-right: 5%;" src="./images/icons/coin.png"> x ${_count.formatWithDots()}
			</div>`;
		}
		else if(r.key === 'exp'){
			const _oldLevel = mainCharacter.level;
			updateExperience(_count, null, null, 1);
			const _newLevel = mainCharacter.level;
			let _lastLevelStatus = '';
			if(_pass && _newLevel > _oldLevel)
				_lastLevelStatus = '<div>' + getLangData('Lvl') + `&nbsp;${_oldLevel}&nbsp;<img class="level-increment" src="./images/icons/power-up.png" />&nbsp;${_newLevel}`;
			if(_bonus?.type === 'exp')
				_count += _bonus.count;
			_rewardsHtml += `<div class="w-50 flex" style="padding: 1%; height: 50%${episode.expSelected ? ';color:#F4BB44 !important' : ''}">
				<img style="height: 70%;margin-right: 5%;" src="./images/icons/exp.png"><div style="flex:1"><div class="w-100">&nbsp;x&nbsp;${_count.formatWithDots()}</div>` + _lastLevelStatus + `</div>
			</div>`;
		}
	}
	return _rewardsHtml;
}
function tryStartStoryMission(_id, _golds, _exps, _items, _func, _isFirstStart) {
	const _s = __stories.find(x => x.id === _id);
	if(_s?.passive) {
		warn('<span>' + getLangData('Story is passive for now') + '</span>', 'warn');
		return;
	}
	if(_s.order > 1 && !__account.storyResults.find(x => x.id ===
		__stories.find(y => y.order === (_s.order - 1)).id)){
		warn('<span>' + getLangData('Complete previous story first') + '</span>', 'warn');
		return;
	}
	const _passSelected = document.querySelector('.menu-right .menu-sub-button.selected[data-index="5"]');
	const _itemSelected = _items ?? document.querySelector('.menu-right .menu-sub-button.selected[data-index="4"]');
	const _goldSelected = _golds ?? document.querySelector('.menu-right .menu-sub-button.selected[data-index="3"]');
	const _expSelected = _exps ?? document.querySelector('.menu-right .menu-sub-button.selected[data-index="2"]');
	if(_passSelected)
		askPassStory(_itemSelected, _goldSelected, _expSelected);
	else{
		if(_s.ticket > 0){
			if(__account.storyTicket >= _s.ticket){
				__account.storyTicket -= _s.ticket;
				_client.saveState(1);
			}
			else {
				warn('<span>' + getLangData('Not enough story portal') + '</span>', 'warn');
				return;
			}
		}
		playStory(_id, null, function() {
			tryConsumeTickets(_goldSelected, _expSelected, _itemSelected);
			if(_func)
				_func();
		},_isFirstStart);
	}
}
function tryConsumeTickets(_goldSelected, _expSelected, _itemSelected) {
	if(_itemSelected)
	{
		const _tix = __account.misc.find(x => x.type === 'ticket-item');
		if(_tix?.count > 0){
			_tix.count--;
			episode.itemSelected = true;
		}
	}
	if(_goldSelected)
	{
		const _tix = __account.misc.find(x => x.type === 'ticket-gold');
		if(_tix?.count > 0){
			_tix.count--;
			episode.goldSelected = true;
		}
	}
	if(_expSelected)
	{
		const _tix = __account.misc.find(x => x.type === 'ticket-exp');
		if(_tix?.count > 0){
			_tix.count--;
			episode.expSelected = true;
		}
	}
	_client.saveState();
}
function askPassStory(_itemSelected, _goldSelected, _expSelected) {
    episode.playSound({ key: 'click' });
    const _limit = __account.misc.find(x => x.type === 'ticket-pass')?.count ?? 0;
    let _modal = `<div class="full fade-me flex inventory-question inventory-question-add-slot">
        <div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <span style="color:#f3f4f5cc !important;font-size:3vh !important">${getLangData('Auto-Pass Story Mission')}</span>
            </div>
            <div class="flex" style="padding:2vh">
                <span class="flex story-pass-info-container">
                    <div id="decrease-pass-btn" class="game-menu-button flex animate-me disabled" style="margin:0 1vh;cursor:pointer;color:#F4BB44;font-size:3vh !important" onclick="decreasePassAmount()">-</div>
                    &nbsp;<span id="pass-amount" style="font-size:3vh !important;color:#f3f4f5 !important">1</span>&nbsp;/&nbsp;${_limit}&nbsp;
                    <div id="increase-pass-btn" class="game-menu-button flex animate-me${_limit < 2 ? ' disabled' : ''}" style="margin:0 1vh;cursor:pointer;color:#F4BB44;font-size:3vh !important" onclick="increasePassAmount()">+</div>
                    <div id="use-max-pass-btn" class="game-menu-button flex animate-me${_limit < 2 ? ' disabled' : ''}" style="margin:0 1vh;cursor:pointer;color:#F4BB44;font-size:3vh !important" onclick="useMaxPassAmount()">max</div>
                </span>
            </div>
            <div style="padding:4vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onclick="acceptStoryPass(${_itemSelected ? 1 : 0}, ${_goldSelected ? 1 : 0}, ${_expSelected ? 1 : 0})">${getLangData('YES')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('#menu-ui').appendChild(_div.firstChild);
}
function useMaxPassAmount() {
    episode.playSound({ key: 'click' });
    const _limit = __account.misc.find(x => x.type === 'ticket-pass')?.count ?? 0;
    const _sa = document.getElementById('pass-amount');
    let _amount = parseInt(_sa.innerText);
    _amount = _limit;
    addClass(document.getElementById('increase-pass-btn'), 'disabled');
    addClass(document.getElementById('use-max-pass-btn'), 'disabled');
    removeClass(document.getElementById('decrease-pass-btn'), 'disabled');
    _sa.innerText = _amount;
}
function increasePassAmount() {
    episode.playSound({ key: 'click' });
    const _limit = __account.misc.find(x => x.type === 'ticket-pass')?.count ?? 0;
    const _sa = document.getElementById('pass-amount');
    let _amount = parseInt(_sa.innerText);
    _amount++;
    if(_amount >= _limit) {
        addClass(document.getElementById('increase-pass-btn'), 'disabled');
    	addClass(document.getElementById('use-max-pass-btn'), 'disabled');
	}
    removeClass(document.getElementById('decrease-pass-btn'), 'disabled');
    _sa.innerText = _amount;
}
function decreasePassAmount() {
    episode.playSound({ key: 'click' });
    const _sa = document.getElementById('pass-amount');
    let _amount = parseInt(_sa.innerText);
    _amount--;
    if(_amount <= 1)
        addClass(document.getElementById('decrease-pass-btn'), 'disabled');
    removeClass(document.getElementById('increase-pass-btn'), 'disabled');
    removeClass(document.getElementById('use-max-pass-btn'), 'disabled');
    _sa.innerText = _amount;
}
function acceptStoryPass(_itemSelected, _goldSelected, _expSelected) {
	// warn('<span>' + getLangData('Not available in demo') + '</span>', 'warn');
	// return;
    episode.playSound({ key: 'click' });
    const _sa = document.getElementById('pass-amount');
    let _amount = parseInt(_sa.innerText);
    if(_amount > 0) {
		closeInventoryQuestionModal();
		createStoryPassScreen(_amount);
	}
}
function redeemPassTicket(_id) {
	//bölüm 3 yıldız bitirilmiş mi bak
	//_id sinden bölümü bul
	//bölümün anahtar costunu al
	//anahtar yeterli mi bak
	//yetmiyorsa return false
	//yetiyorsa düş
	//bölümün rewardlarına bak
	//item + gold + exp ödülü ver
	//ticketlar seçili ise 1 tane daha ver
	//pass ticket ı 1 düş
	//client state i kaydet
	//true değeri dön
	return true;
}
var __storyAutoPassSkip;
function skipStoryPass() {
	episode.playSound({ key: 'click' });
	__storyAutoPassSkip = 1;
	//üstteki algoritmayı hızlı çalıştır
}
async function createStoryPassScreen(_amount) {
	const _itemSelected = document.querySelector('.menu-right .menu-sub-button.selected[data-index="4"]');
	const _goldSelected = document.querySelector('.menu-right .menu-sub-button.selected[data-index="3"]');
	const _expSelected = document.querySelector('.menu-right .menu-sub-button.selected[data-index="2"]');
	episode.itemSelected = _itemSelected;
	episode.goldSelected = _goldSelected;
	episode.expSelected = _expSelected;

	const _s = __stories.find(x => x.id === _uiSelectedStoryId);
	const _results = [];
	let _allTickets = __account.storyTicket;
	const _startTicketCount = _allTickets;
	const _oldLevel = mainCharacter.level;
	for (let i = 0; i < _amount; i++) {
		if (_allTickets < _s.ticket) {
			warn('<span>' + getLangData('Out of story tickets') + '</span>', 'warn');
			break;
		}
		_allTickets -= _s.ticket;

		if (episode.goldSelected) {
			const _tix = __account.misc.find(x => x.type === 'ticket-gold');
			if (_tix?.count > 0) _tix.count--;
		}
		if (episode.expSelected) {
			const _tix = __account.misc.find(x => x.type === 'ticket-exp');
			if (_tix?.count > 0) _tix.count--;
		}
		if (episode.itemSelected) {
			const _tix = __account.misc.find(x => x.type === 'ticket-item');
			if (_tix?.count > 0) _tix.count--;
		}
		const _tix = __account.misc.find(x => x.type === 'ticket-pass');
		if (_tix?.count > 0) _tix.count--;
		const _bonus = (new storyBonus(null, 1)).get();
		_results.push(getStoryRewardsResultHtml(_s, _bonus, 1));
	}
	updateTicket(_allTickets - _startTicketCount);
	updateRightMenuTemplate();
	_client.saveState();

	// modal HTML'ini kur
	let _modal = `<div class="full fade-me flex inventory-question inventory-question-add-slot">
		<div class="inventory-modal">
			<div style="padding:6vh 4vh 4vh 4vh" class="flex">
				<span style="color:#f3f4f5cc !important;font-size:3vh !important">${getLangData('Auto-Pass Results')}</span>
			</div>
			<div class="flex flex-ai-start auto-pass-results" style="padding:2vh;overflow-y:auto"></div>
			<div style="padding:4vh" class="flex">
				<div id="auto-pass-skip" class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onclick="skipStoryPass()">${getLangData('SKIP')}</div>
				<div id="auto-pass-close" class="game-menu-button flex animate-me disabled" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('CLOSE')}</div>
			</div>
		</div>
	</div>`;

	const _div = document.createElement('div');
	_div.innerHTML = _modal;
	document.querySelector('#menu-ui').appendChild(_div.firstChild);

	const _newLevel = mainCharacter.level;
	const _leveledUp = _newLevel > _oldLevel;
	const _container = document.querySelector('.auto-pass-results');
	__storyAutoPassSkip = false;
	// satır satır ekle
	for (let i = 0; i < _results.length; i++) {
		if(!__storyAutoPassSkip)
			episode.playSound({key:'autopass', volume:.4});
		const row = document.createElement('div');
		row.className = 'w-100 flex flex-jc-start auto-pass-result-item fade-me';
		row.innerHTML = _results[i];
		_container.appendChild(row);
		_container.scrollTo({
			top: _container.scrollHeight,
			behavior: 'smooth'
		});
		if(!__storyAutoPassSkip)
			await delay(750);
	}
	removeClass(document.getElementById('auto-pass-close'), 'disabled');
	addClass(document.getElementById('auto-pass-skip'), 'disabled');
	__storyAutoPassSkip = false;
}

// yardımcı delay fonksiyonu
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
// setTimeout(() => {
// 		warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[2].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, 990000, 1);
// 		warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[3].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, 990000, 1);
// 		warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[3].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, 990000, 1);
// 		warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[3].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, 990000, 1);
// 		warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/' + _giftOrder[3].key + '.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Enjoy Your Gift!') + '</span></div>', null, 990000, 1);
// }, 15000);