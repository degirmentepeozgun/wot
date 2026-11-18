'use strict';

class CombatDirector {
	constructor(opts = {}) {
		this.maxSlots = opts.maxSlots ?? 2;

		this._slots = new Set();

		this._registry = new Set();
	}

	register(enemy) {
		this._registry.add(enemy);
	}

	unregister(enemy) {
		this._registry.delete(enemy);
		this._slots.delete(enemy.key);
	}

	requestSlot(enemy) {
		if (this._slots.has(enemy.key)) return true;
		if (this._slots.size < this.maxSlots) {
			this._slots.add(enemy.key);
			return true;
		}
		return false;
	}

	releaseSlot(enemy) {
		this._slots.delete(enemy.key);
	}

	hasSlot(enemy) {
		return this._slots.has(enemy.key);
	}

	cleanup() {
		for (const key of this._slots) {
			const live = [...this._registry].some((e) => e.key === key && !e.isDead() && !e.remove);
			if (!live) this._slots.delete(key);
		}
	}
}

const RETRO_STATE = Object.freeze({
	IDLE: 'IDLE',

	APPROACH: 'APPROACH',

	REPOSITION: 'REPOSITION',

	ATTACK_WAIT: 'ATTACK_WAIT',

	ATTACK: 'ATTACK',

	RECOVERY: 'RECOVERY'
});

function createRetroEnemyAI(enemy, director) {
	director.register(enemy);

	const RUN_DIST = getRandomValue(35, 55);

	const WALK_DIST = getRandomValue(10, 22);

	const REPOS_MS = getRandomValue(400, 900);

	const RECOV_MS = getRandomValue(300, 700);

	const IDLE_MS = getRandomValue(80, 320);

	const SLOT_WAIT_MAX_MS = getRandomValue(800, 1800);

	const Y_ALIGN_TOL = 4;

	const HAS_WALK = !!enemy.animations.walk;
	const HAS_RUN = !!enemy.animations.run;

	const ai = {
		state: RETRO_STATE.IDLE,
		hasSlot: false,
		idleUntil: 0,
		reposUntil: 0,
		recovUntil: 0,
		slotWaitStart: 0
	};

	function setState(s) {
		ai.state = s;
	}

	function faceTarget(t) {
		if (!t) return;
		const diff = t.EXACTLEFT - enemy.EXACTLEFT;
		const tol = (4 * episode.cWidth) / 100;
		if (diff > tol) enemy.direction = __right;
		else if (diff < -tol) enemy.direction = __left;
	}

	function alignY(t) {
		if (!t) return;
		const dy = Math.abs(enemy.yPosition - t.yPosition);
		if (dy < Y_ALIGN_TOL) {
			enemy.yPosition = t.yPosition;
			return;
		}
		const step = Math.max(1, Math.ceil(enemy.calculateYStep() / 2));
		if (enemy.yPosition > t.yPosition) enemy.yPosition -= step;
		else if (enemy.yPosition < t.yPosition) enemy.yPosition += step;
	}

	function moveToward(t, useWalk) {
		faceTarget(t);
		if (useWalk && HAS_WALK) {
			if (enemy.animationFinished || enemy.animation !== 'walk') enemy.animate('walk', 1);
			enemy.moveDirection = enemy.direction;
		} else {
			enemy.run(enemy.getCurrentAnimation(), enemy.direction, null, 11);
		}
	}

	function inMeleeRange(t) {
		if (!t) return false;
		return isObjectsInTouch(enemy, t, null, 2).touch;
	}

	function inRangedRange(t) {
		if (!t || !enemy.upcomingAnimation) return false;
		const a = enemy.animations[enemy.upcomingAnimation];
		if (!a) return false;
		enemy.getSkillRange(a);
		return a.totalRange >= enemy.getRangeBetween(t);
	}

	function resolveTarget() {
		if (enemy.autoTarget && !enemy.autoTarget.isDead() && !enemy.autoTarget.invulnerable) return enemy.autoTarget;

		const found = enemy.getClosestEnemy(100, enemy.direction, (e) => !e.invulnerable && !e.isDead(), 100, 2);
		if (found?.enemy) {
			enemy.setAutoTarget(found.enemy, null, 10);
			return found.enemy;
		}
		return null;
	}

	function releaseSlot() {
		if (ai.hasSlot) {
			director.releaseSlot(enemy);
			ai.hasSlot = false;
		}
		enemy.autoAttacking = false;
	}

	function tryLaunchAttack(t) {
		if (!enemy.upcomingAnimation || enemy.upcomingAnimation === 'idle') enemy.pickRandomAttack(null, null, 1);
		if (!enemy.upcomingAnimation || enemy.upcomingAnimation === 'idle') return false;
		return !!enemy.animateAutoAnimation(11, t, inMeleeRange(t));
	}

	enemy.retroAutoCommand = function () {
		if (this.keyboard || this.harmless || (episode.realTime && this.alp)) return;

		if (!this.animationFinished && this.animations[this.animation]?.attack) {
			ai.state = RETRO_STATE.ATTACK;
			return;
		}

		if (this.animation === 'start' || (this.animation === 'before' && !this.animationFinished)) return;

		if (this.isDead() || this.dying || this.dead || this.remove) {
			releaseSlot();
			director.unregister(this);
			return;
		}
		if (this.immobilize) {
			releaseSlot();
			return;
		}
		if (this.finishing || this.attackingOnlyBy) {
			if (this.animationFinished) this.idle(92);
			this.autoAttacking = false;
			return;
		}
		if (this.animation === 'release') return;

		const cur = this.getCurrentAnimation();

		if (cur.hurt && !this.animationFinished && (!this.hasChain || this.noCounter)) {
			this.autoAttacking = false;
			return;
		}

		if (cur.hurt && this.animationFinished) {
			releaseSlot();
			this.upcomingAnimation = 'idle';
			setState(RETRO_STATE.IDLE);
			ai.idleUntil = _gameTick + IDLE_MS;
		}

		if (_gameTick % 1000 < 17) director.cleanup();

		const target = resolveTarget();

		if (!target) {
			releaseSlot();
			if (this.animation !== 'idle') this.idle(1);
			setState(RETRO_STATE.IDLE);
			ai.idleUntil = _gameTick + IDLE_MS;
			return;
		}

		const rangePct = this.getRangeBetween(target);

		if (ai.state !== RETRO_STATE.ATTACK) faceTarget(target);

		switch (ai.state) {
			case RETRO_STATE.IDLE: {
				if (_gameTick < ai.idleUntil) {
					if (this.animation !== 'idle') this.idle(2);
					return;
				}

				if (rangePct > RUN_DIST) setState(RETRO_STATE.APPROACH);
				else if (rangePct > WALK_DIST) {
					setState(RETRO_STATE.REPOSITION);
					ai.reposUntil = _gameTick + REPOS_MS;
				} else {
					setState(RETRO_STATE.ATTACK_WAIT);
					ai.slotWaitStart = _gameTick;
				}
				break;
			}

			case RETRO_STATE.APPROACH: {
				if (rangePct <= WALK_DIST) {
					setState(RETRO_STATE.REPOSITION);
					ai.reposUntil = _gameTick + REPOS_MS;
					if (this.animationFinished || this.animation === 'run') this.idle(3);
					break;
				}
				moveToward(target, false);
				alignY(target);
				break;
			}

			case RETRO_STATE.REPOSITION: {
				if (rangePct > RUN_DIST) {
					setState(RETRO_STATE.APPROACH);
					break;
				}
				moveToward(target, true);
				alignY(target);

				const timedOut = _gameTick >= ai.reposUntil;
				const touching = inMeleeRange(target);

				if (touching || timedOut) {
					setState(RETRO_STATE.ATTACK_WAIT);
					ai.slotWaitStart = _gameTick;
					this.idle(4);
				}
				break;
			}

			case RETRO_STATE.ATTACK_WAIT: {
				if (rangePct > RUN_DIST) {
					setState(RETRO_STATE.APPROACH);
					break;
				}

				if (this.animationFinished && this.animation !== 'idle') this.idle(5);

				alignY(target);

				if (!this.upcomingAnimation || this.upcomingAnimation === 'idle') this.pickRandomAttack(null, null, 1);

				const canHit = this.ranged ? inRangedRange(target) : inMeleeRange(target);

				if (canHit && director.requestSlot(this)) {
					ai.hasSlot = true;
					setState(RETRO_STATE.ATTACK);
					break;
				}

				if (_gameTick - ai.slotWaitStart > SLOT_WAIT_MAX_MS) {
					setState(RETRO_STATE.REPOSITION);
					ai.reposUntil = _gameTick + REPOS_MS;
				}
				break;
			}

			case RETRO_STATE.ATTACK: {
				if (!ai.hasSlot) {
					setState(RETRO_STATE.IDLE);
					ai.idleUntil = _gameTick + IDLE_MS;
					break;
				}

				if (!this.animationFinished && cur.attack) {
					this.autoAttacking = true;

					if (this.getCurrentFrame()?.directionChangeEnabled) faceTarget(target);
					return;
				}

				if (this.animationFinished) {
					this.pickRandomAttack(null, null, 1);
					if (!tryLaunchAttack(target)) {
						setState(RETRO_STATE.RECOVERY);
						ai.recovUntil = _gameTick + RECOV_MS;
						this.autoAttacking = false;
					}
				}
				break;
			}

			case RETRO_STATE.RECOVERY: {
				if (_gameTick < ai.recovUntil) {
					if (this.animationFinished && this.animation !== 'idle') this.idle(6);
					return;
				}
				releaseSlot();
				setState(RETRO_STATE.IDLE);
				ai.idleUntil = _gameTick + IDLE_MS;
				this.idle(7);
				break;
			}
		}

		if (ai.state === RETRO_STATE.ATTACK && ai.hasSlot && this.animationFinished) {
			if (!tryLaunchAttack(target)) {
				setState(RETRO_STATE.RECOVERY);
				ai.recovUntil = _gameTick + RECOV_MS;
			}
		}
	};

	enemy.__retroAI = ai;

	return {
		getState: () => ai.state,
		getDirector: () => director
	};
}
