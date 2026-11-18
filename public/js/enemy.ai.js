function enemyAI(enemy) {
	this.updateCombatBrain = function () {
		if (!this.targetEnemy || !this.targetEnemy.enemy) {
			this.pickRandomTargetCharacter();
			if (!this.targetEnemy) {
				this.animateIdle();
				return;
			}
		}

		const distance = this.getRangeBetweenCharacters(this, this.targetEnemy.enemy);

		const attack = this.pickBestAvailableAttack(distance);

		if (attack) {
			this.handleAttackDecision(attack, distance);
		} else {
			this.handleNoAttackAvailable(distance);
		}
	};
	this.pickRandomTargetCharacter = function (rangePercent = 100) {
		const result = this.getClosestEnemy(rangePercent);

		if (!result || !result.enemy) {
			this.targetEnemy = null;
			return;
		}

		this.targetEnemy = result;
	};
	this.pickBestAvailableAttack = function (distance) {
		let possible = [];

		for (let key in this.animations) {
			const anim = this.animations[key];

			if (!anim.attack) continue;
			if (anim.cooldownLeft && anim.cooldownLeft > 0) continue;

			const range = anim.totalRange || 0;

			possible.push({
				anim: anim,
				range: range,
				distanceDiff: Math.abs(distance - range)
			});
		}

		if (possible.length === 0) return null;

		possible.sort((a, b) => a.distanceDiff - b.distanceDiff);

		return possible[0].anim;
	};
	this.handleAttackDecision = function (attack, distance) {
		const range = attack.totalRange || 0;

		if (distance <= range) {
			if (!this.attackDelayStart) {
				this.attackDelayStart = Date.now();
				this.pendingAttack = attack;
				this.animate('idle', 1);
				return;
			}

			const delay = this.getDifficultyDelay();

			if (Date.now() - this.attackDelayStart >= delay) {
				this.attackDelayStart = null;
				this.animate(this.pendingAttack);
				this.pendingAttack = null;
				return;
			}

			this.animate('idle', 1);
			return;
		}

		if (range > 0) {
			this.moveTowardTarget();
		} else {
			this.moveToMeleeSlot();
		}
	};
	this.handleNoAttackAvailable = function (distance) {
		if (this.hasMeleeAttack()) {
			this.moveToMeleeSlot();
			return;
		}

		if (this.allAttacksAreRanged()) {
			this.maintainDistanceBand(distance);
			return;
		}

		this.moveTowardTarget();
	};
	this.moveTowardTarget = function () {
		if (!this.targetEnemy) return;

		const speed = this.getRandomizedSpeed();

		this.run();

		const distance = this.getRangeBetweenCharacters(this, this.targetEnemy.enemy);
		const attack = this.pickBestAvailableAttack(distance);

		if (attack && attack.totalRange > 0 && distance <= attack.totalRange) {
			this.stopMoving();
		}
	};
	this.moveToMeleeSlot = function () {
		if (!this.currentSlot || this.currentSlot.occupied) {
			this.currentSlot = this.pickRandomSlot();
		}

		if (!this.currentSlot) {
			this.orbitPlayer();
			return;
		}
		const bodyOrigin = this.HURTLEFT + this._HURTBOX_half;
		const slotX = this.currentSlot.x;
		const myX = bodyOrigin;

		const distance = Math.abs(slotX - myX);
		const percDistance = (distance / episode.cWidth) * 100;

		if (percDistance < 5) {
			this.animate('walk');
			return;
		}

		if (myX < slotX) {
			this.direction = __right;
		} else {
			this.direction = __left;
		}

		if (percDistance > 20) {
			this.run();
		} else {
			this.animate('walk');
		}
	};
	this.orbitPlayer = function () {
		if (!this.targetEnemy || !this.targetEnemy.enemy) return;

		const bodyOrigin = this.HURTLEFT + this._HURTBOX_half;
		const enemyBodyOrigin = this.targetEnemy.enemy.HURTLEFT + this.targetEnemy.enemy._HURTBOX_half;
		const playerX = enemyBodyOrigin;
		const myX = bodyOrigin;

		const offset = episode.w100 * 10;

		let orbitX;

		if (myX < playerX) {
			orbitX = playerX - offset;
		} else {
			orbitX = playerX + offset;
		}

		const distance = (Math.abs(myX - orbitX) / episode.cWidth) * 100;

		if (distance < 20) {
			this.walk();
			return;
		}

		if (myX < orbitX) {
			this.direction = __right;
		} else {
			this.direction = __left;
		}

		this.run();
	};

	this.maintainDistanceBand = function (distance) {
		if (!this.target || !this.target.enemy) return;

		const playerX = this.target.enemy.HURTLEFT + this.target.enemy._HURTBOX_half;
		const myX = this.HURTLEFT + this._HURTBOX_half;

		const maxRange = this.getMaxRange();

		const preferredMin = maxRange * 0.6;
		const preferredMax = maxRange * 0.9;

		if (distance < preferredMin) {
			if (myX < playerX) {
				this.direction = __left;
			} else {
				this.direction = __right;
			}

			this.run();
			return;
		}

		if (distance > preferredMax) {
			if (myX < playerX) {
				this.direction = __right;
			} else {
				this.direction = __left;
			}

			this.run();
			return;
		}

		this.idle();
	};
	this.getRangeBetweenCharacters = function (charA, charB) {
		const aX = charA.HURTLEFT + charA._HURTBOX_half;
		const bX = charB.HURTLEFT + charB._HURTBOX_half;
		return (Math.abs(aX - bX) / episode.cWidth) * 100;
	};
	this.pickRandomSlot = function () {
		if (!episode.slots || episode.slots.length === 0) return null;

		let freeSlots = episode.slots.filter((s) => !s.occupied);

		if (freeSlots.length === 0) return null;

		freeSlots.sort((a, b) => {
			const da = this.getRangeBetweenCharacters(this, a);
			const db = this.getRangeBetweenCharacters(this, b);
			return da - db;
		});

		return freeSlots[0];
	};

	this.hasMeleeAttack = function () {
		for (let key in this.animations) {
			const a = this.animations[key];
			if (a.attack && (a.totalRange || 0) < 20) return true;
		}
		return false;
	};

	this.allAttacksAreRanged = function () {
		for (let key in this.animations) {
			const a = this.animations[key];
			if (a.attack && (a.totalRange || 0) < 20) return false;
		}
		return true;
	};
	this.getDifficultyDelay = function () {
		switch (this.difficulty) {
			case 0:
				return 0;
			case 1:
				return 250;
			case 2:
				return 500;
			case 3:
				return 750;
			case 4:
				return 1000;
			default:
				return 1000;
		}
	};

	this.getMaxRange = function () {
		let max = 0;

		for (let key in this.animations) {
			const a = this.animations[key];
			if (a.attack && (a.totalRange || 0) > max) max = a.totalRange;
		}

		return max;
	};

	this.getRandomizedSpeed = function () {
		return this.baseSpeed * (0.85 + Math.random() * 0.3);
	};
}
