'use strict';

// ═══════════════════════════════════════════════════════════════════════════════
// RETRO ENEMY AI  –  Final Fight / Streets of Rage style belt-scroll AI
// ═══════════════════════════════════════════════════════════════════════════════
//
// STEP 1 – Create one director per stage (shared across all enemies):
//
//   const combatDirector = new CombatDirector({ maxSlots: 2 });
//
// STEP 2 – Attach AI to each enemy after construction:
//
//   createRetroEnemyAI(enemyInstance, combatDirector);
//
// STEP 3 – In your game loop replace  enemy.autoCommand()  with:
//
//   enemy.retroAutoCommand();
//
// ═══════════════════════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────────────────────────────────────
// COMBAT DIRECTOR
//
// A shared "traffic controller" for the entire scene.
// Only maxSlots enemies may be in the ATTACK state simultaneously.
// Every other enemy must wait, reposition, and ask again later.
// ─────────────────────────────────────────────────────────────────────────────
class CombatDirector {
    /**
     * @param {object}  [opts]
     * @param {number}  [opts.maxSlots=2]  Max simultaneous attackers.
     *   Classic arcade games use 1-2.  Boss waves can use 3-4.
     */
    constructor(opts = {}) {
        this.maxSlots     = opts.maxSlots ?? 2;

        // enemy.key → true  for every enemy currently holding an attack slot
        this._slots       = new Set();

        // full set of registered enemy instances (used for cleanup)
        this._registry    = new Set();
    }

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    /** Register when the enemy enters the scene. */
    register(enemy) {
        this._registry.add(enemy);
    }

    /** Call when an enemy dies / is removed.  Frees any held slot. */
    unregister(enemy) {
        this._registry.delete(enemy);
        this._slots.delete(enemy.key);
    }

    // ── Slot API ─────────────────────────────────────────────────────────────

    /**
     * Ask for permission to attack.
     * Returns true  → slot granted  (or already held by this enemy).
     * Returns false → all slots busy, enemy must wait.
     */
    requestSlot(enemy) {
        if (this._slots.has(enemy.key)) return true;   // already owns one
        if (this._slots.size < this.maxSlots) {
            this._slots.add(enemy.key);
            return true;
        }
        return false;
    }

    /** Release the slot after attack + recovery are complete. */
    releaseSlot(enemy) {
        this._slots.delete(enemy.key);
    }

    /** True if this enemy currently holds a slot. */
    hasSlot(enemy) {
        return this._slots.has(enemy.key);
    }

    /**
     * Sweep dead / removed enemies that are still holding a slot.
     * Call roughly once per second (driven by _gameTick % 1000 in the AI loop).
     */
    cleanup() {
        for (const key of this._slots) {
            const live = [...this._registry].some(
                e => e.key === key && !e.isDead() && !e.remove
            );
            if (!live) this._slots.delete(key);
        }
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// FSM STATE CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const RETRO_STATE = Object.freeze({
    //  Brief deterministic pause between every decision cycle.
    //  Prevents "spinning top" instant re-evaluation and gives the AI
    //  a human-like think delay.
    IDLE:         'IDLE',

    //  Enemy is far from the target.  Runs at full speed, also nudges Y.
    APPROACH:     'APPROACH',

    //  Enemy is in the combat zone (walk distance).
    //  Walks slowly toward the target while aligning its Y belt position.
    //  The "converging mob" effect you see in Final Fight.
    REPOSITION:   'REPOSITION',

    //  Enemy is in range and wants to attack but the CombatDirector's
    //  slot pool is full.  Stands ready, tracks the target, keeps Y aligned.
    //  If waiting too long → goes back to REPOSITION to avoid statue-freeze.
    ATTACK_WAIT:  'ATTACK_WAIT',

    //  Enemy owns a slot and is executing an attack animation.
    //  Handles chains, and direction-flip for pass-through / back attacks.
    ATTACK:       'ATTACK',

    //  Short mandatory cooldown after the attack chain finishes.
    //  Slot is released when the timer expires, then → IDLE.
    RECOVERY:     'RECOVERY',
});


// ─────────────────────────────────────────────────────────────────────────────
// createRetroEnemyAI
//
// Attaches  retroAutoCommand()  to any enemy instance.
//
// @param {object}          enemy     – fully constructed enemy instance
// @param {CombatDirector}  director  – shared director for this scene/stage
// ─────────────────────────────────────────────────────────────────────────────
function createRetroEnemyAI(enemy, director) {

    // Register this enemy with the shared director.
    director.register(enemy);

    // ── Per-enemy randomised "personality" ───────────────────────────────────
    // Rolled ONCE at creation; each unit behaves slightly differently but
    // deterministically (no Math.random() inside the hot loop).

    // X-distance % of screen width above which enemy sprints.
    const RUN_DIST   = getRandomValue(35, 55);

    // X-distance % at which enemy slows to a walk for final approach.
    const WALK_DIST  = getRandomValue(10, 22);

    // How long (ms) the REPOSITION phase lasts before forcing an attack slot
    // request regardless of Y alignment.
    const REPOS_MS   = getRandomValue(400, 900);

    // How long (ms) the RECOVERY cooldown lasts after an attack chain.
    const RECOV_MS   = getRandomValue(300, 700);

    // How long (ms) the IDLE think-pause lasts between decisions.
    const IDLE_MS    = getRandomValue(80, 320);

    // Max (ms) to stay in ATTACK_WAIT before repositioning again.
    const SLOT_WAIT_MAX_MS = getRandomValue(800, 1800);

    // Y-pixel gap below which the enemy is considered vertically aligned.
    const Y_ALIGN_TOL = 4;

    // ── Animation capability flags ────────────────────────────────────────────
    const HAS_WALK = !!enemy.animations.walk;
    const HAS_RUN  = !!enemy.animations.run;

    // ── Per-enemy AI state object ─────────────────────────────────────────────
    const ai = {
        state:          RETRO_STATE.IDLE,
        hasSlot:        false,
        idleUntil:      0,   // _gameTick timestamp when IDLE pause ends
        reposUntil:     0,   // _gameTick timestamp when REPOSITION times out
        recovUntil:     0,   // _gameTick timestamp when RECOVERY ends
        slotWaitStart:  0,   // _gameTick when we entered ATTACK_WAIT
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Internal helpers
    // ─────────────────────────────────────────────────────────────────────────

    function setState(s) { ai.state = s; }

    // Face toward target on the X axis.
    // Called every tick outside of active attack animations so the sprite
    // always looks at the target, even after a pass-through dash attack.
    function faceTarget(t) {
        if (!t) return;
        const diff = t.EXACTLEFT - enemy.EXACTLEFT;
        const tol  = (4 * episode.cWidth) / 100;
        if      (diff >  tol) enemy.direction = __right;
        else if (diff < -tol) enemy.direction = __left;
    }

    // Nudge the enemy's Y position one step toward the target's Y belt.
    // This is the core of the arcade "all enemies align to player's row" feel.
    function alignY(t) {
        if (!t) return;
        const dy = Math.abs(enemy.yPosition - t.yPosition);
        if (dy < Y_ALIGN_TOL) { enemy.yPosition = t.yPosition; return; }
        const step = Math.max(1, Math.ceil(enemy.calculateYStep() / 2));
        if      (enemy.yPosition > t.yPosition) enemy.yPosition -= step;
        else if (enemy.yPosition < t.yPosition) enemy.yPosition += step;
    }

    // Move toward the target using run (fast) or walk (slow).
    // If the requested animation doesn't exist, falls back to the other.
    function moveToward(t, useWalk) {
        faceTarget(t);
        if (useWalk && HAS_WALK) {
            // Walk: explicitly animate and set moveDirection so the engine
            // advances the X position through its normal step logic.
            if (enemy.animationFinished || enemy.animation !== 'walk')
                enemy.animate('walk', 1);
            enemy.moveDirection = enemy.direction;
        } else {
            // Run (also the fallback when there is no walk animation).
            enemy.run(enemy.getCurrentAnimation(), enemy.direction, null, 11);
        }
    }

    // True when the enemy's hitbox is physically touching the target's hitbox.
    function inMeleeRange(t) {
        if (!t) return false;
        return isObjectsInTouch(enemy, t, null, 2).touch;
    }

    // True when the queued ranged attack's totalRange covers current distance.
    // Only called when  enemy.ranged === true.
    function inRangedRange(t) {
        if (!t || !enemy.upcomingAnimation) return false;
        const a = enemy.animations[enemy.upcomingAnimation];
        if (!a) return false;
        enemy.getSkillRange(a);                    // populates a.totalRange once
        return a.totalRange >= enemy.getRangeBetween(t);
    }

    // Find (or reuse) the best living target.
    function resolveTarget() {
        if (enemy.autoTarget && !enemy.autoTarget.isDead() && !enemy.autoTarget.invulnerable)
            return enemy.autoTarget;

        const found = enemy.getClosestEnemy(
            100,              // search up to 100 % of screen width
            enemy.direction,
            e => !e.invulnerable && !e.isDead(),
            100,              // full Y range
            2                 // hit-box tolerance
        );
        if (found?.enemy) {
            enemy.setAutoTarget(found.enemy, null, 10);
            return found.enemy;
        }
        return null;
    }

    // Release attack slot and clear the attacking flag.
    function releaseSlot() {
        if (ai.hasSlot) {
            director.releaseSlot(enemy);
            ai.hasSlot = false;
        }
        enemy.autoAttacking = false;
    }

    // Attempt to start the queued attack animation via the engine's
    // animateAutoAnimation(), which handles difficulty throttle, attackerCount
    // tracking on the target, and chain/next animation logic.
    function tryLaunchAttack(t) {
        if (!enemy.upcomingAnimation || enemy.upcomingAnimation === 'idle')
            enemy.pickRandomAttack(null, null, 1);
        if (!enemy.upcomingAnimation || enemy.upcomingAnimation === 'idle')
            return false;
        return !!enemy.animateAutoAnimation(11, t, inMeleeRange(t));
    }


    // ═════════════════════════════════════════════════════════════════════════
    // retroAutoCommand()
    //
    // Drop-in replacement for enemy.autoCommand().
    // Call this from your game loop every tick for AI-controlled enemies.
    // ═════════════════════════════════════════════════════════════════════════
    enemy.retroAutoCommand = function () {

        // ── Hard guards (match original autoCommand contract) ─────────────────

        // Player-controlled or passive units never run the AI.
        if (this.keyboard || this.harmless || (episode.realTime && this.alp))
            return;

        // While an attack animation is mid-flight, do NOT interrupt it.
        if (!this.animationFinished && this.animations[this.animation]?.attack) {
            ai.state = RETRO_STATE.ATTACK;
            return;
        }

        // Wind-up animations (before / start) must finish before AI acts.
        if (this.animation === 'start' || (this.animation === 'before' && !this.animationFinished))
            return;

        // Dead / dying / special lock-out states.
        if (this.isDead() || this.dying || this.dead || this.remove) {
            releaseSlot();
            director.unregister(this);
            return;
        }
        if (this.immobilize) { releaseSlot(); return; }
        if (this.finishing || this.attackingOnlyBy) {
            if (this.animationFinished) this.idle(92);
            this.autoAttacking = false;
            return;
        }
        if (this.animation === 'release') return; // ground-bounce / knockdown

        // ── Hurt handling ─────────────────────────────────────────────────────
        const cur = this.getCurrentAnimation();

        // Still in a hurt animation and no chain counter → wait it out.
        if (cur.hurt && !this.animationFinished && (!this.hasChain || this.noCounter)) {
            this.autoAttacking = false;
            return;
        }

        // Hurt animation just finished → abort current attack, reset to IDLE.
        if (cur.hurt && this.animationFinished) {
            releaseSlot();
            this.upcomingAnimation = 'idle';
            setState(RETRO_STATE.IDLE);
            ai.idleUntil = _gameTick + IDLE_MS;
        }

        // ── Periodic dead-enemy slot cleanup (~once per second) ───────────────
        if ((_gameTick % 1000) < 17) director.cleanup();

        // ── Resolve target ────────────────────────────────────────────────────
        const target = resolveTarget();

        if (!target) {
            // Nothing alive to fight.
            releaseSlot();
            if (this.animation !== 'idle') this.idle(1);
            setState(RETRO_STATE.IDLE);
            ai.idleUntil = _gameTick + IDLE_MS;
            return;
        }

        // Current X-distance as % of screen width.
        const rangePct = this.getRangeBetween(target);

        // Always face target except during active attack (handled inside state).
        if (ai.state !== RETRO_STATE.ATTACK) faceTarget(target);


        // ═════════════════════════════════════════════════════════════════════
        // FINITE STATE MACHINE
        // ═════════════════════════════════════════════════════════════════════
        switch (ai.state) {

            // ─────────────────────────────────────────────────────────────────
            // IDLE  –  think-pause between decisions
            //
            // Duration: IDLE_MS (per-enemy random 80–320 ms)
            // Purpose:  prevents mechanical same-tick re-evaluation; gives
            //           the mob feel of individuals reacting at their own pace.
            // ─────────────────────────────────────────────────────────────────
            case RETRO_STATE.IDLE: {
                if (_gameTick < ai.idleUntil) {
                    if (this.animation !== 'idle') this.idle(2);
                    return;
                }
                // Pause over – pick the appropriate next state based on distance.
                if      (rangePct > RUN_DIST)  setState(RETRO_STATE.APPROACH);
                else if (rangePct > WALK_DIST) {
                    setState(RETRO_STATE.REPOSITION);
                    ai.reposUntil = _gameTick + REPOS_MS;
                }
                else {
                    setState(RETRO_STATE.ATTACK_WAIT);
                    ai.slotWaitStart = _gameTick;
                }
                break;
            }

            // ─────────────────────────────────────────────────────────────────
            // APPROACH  –  full-speed run toward the target
            //
            // Combines X movement (run) and Y nudging every tick so the enemy
            // arrives at the correct belt row.  For X: uses run animation.
            // For Y: a calculated step so it doesn't teleport.
            //
            // Exits to REPOSITION once inside the walk-distance threshold.
            // ─────────────────────────────────────────────────────────────────
            case RETRO_STATE.APPROACH: {
                if (rangePct <= WALK_DIST) {
                    setState(RETRO_STATE.REPOSITION);
                    ai.reposUntil = _gameTick + REPOS_MS;
                    if (this.animationFinished || this.animation === 'run')
                        this.idle(3);  // stop run before walking
                    break;
                }
                moveToward(target, false);  // false = use run animation
                alignY(target);             // Y alignment happens even while running
                break;
            }

            // ─────────────────────────────────────────────────────────────────
            // REPOSITION  –  walk into melee range and align Y belt
            //
            // This is the arcade "converging crowd" behaviour:
            // each enemy shuffles in from a different angle since they each
            // have different Y positions and slightly different REPOS_MS timers.
            //
            // Uses walk animation (slow, controlled).
            // If there is no walk animation, run is used instead.
            //
            // Exits when:
            //   a) hitbox is touching the target (melee contact), OR
            //   b) REPOS_MS timer expires (enemy is close enough)
            // Falls back to APPROACH if target moved far away.
            // ─────────────────────────────────────────────────────────────────
            case RETRO_STATE.REPOSITION: {
                if (rangePct > RUN_DIST) {
                    setState(RETRO_STATE.APPROACH);
                    break;
                }
                moveToward(target, true);   // true = walk animation preferred
                alignY(target);

                const timedOut = _gameTick >= ai.reposUntil;
                const touching = inMeleeRange(target);

                if (touching || timedOut) {
                    setState(RETRO_STATE.ATTACK_WAIT);
                    ai.slotWaitStart = _gameTick;
                    this.idle(4);  // stop moving, stand ready
                }
                break;
            }

            // ─────────────────────────────────────────────────────────────────
            // ATTACK_WAIT  –  in range, waiting for a free attack slot
            //
            // Every tick:
            //   • Keeps standing in idle (no movement spam)
            //   • Nudges Y alignment (the subtle foot-shuffle)
            //   • Pre-selects an attack so we know its range
            //   • For ranged enemies: checks totalRange ≥ current X distance
            //   • For melee enemies: checks hitbox touch
            //   • Polls CombatDirector; if granted → transition to ATTACK
            //
            // Safety valve: if no slot arrives within SLOT_WAIT_MAX_MS,
            // go back to REPOSITION to avoid statue-like freezing.
            // ─────────────────────────────────────────────────────────────────
            case RETRO_STATE.ATTACK_WAIT: {
                if (rangePct > RUN_DIST) {
                    setState(RETRO_STATE.APPROACH);
                    break;
                }

                if (this.animationFinished && this.animation !== 'idle')
                    this.idle(5);

                alignY(target);  // subtle shuffle while waiting

                // Pre-select attack so we know its range before committing.
                if (!this.upcomingAnimation || this.upcomingAnimation === 'idle')
                    this.pickRandomAttack(null, null, 1);

                // Validate whether we can physically reach the target.
                const canHit = this.ranged
                    ? inRangedRange(target)
                    : inMeleeRange(target);

                if (canHit && director.requestSlot(this)) {
                    ai.hasSlot = true;
                    setState(RETRO_STATE.ATTACK);
                    break;  // handled immediately below in the late-launch block
                }

                // Waited too long with no slot → reposition to prevent freeze.
                if ((_gameTick - ai.slotWaitStart) > SLOT_WAIT_MAX_MS) {
                    setState(RETRO_STATE.REPOSITION);
                    ai.reposUntil = _gameTick + REPOS_MS;
                }
                break;
            }

            // ─────────────────────────────────────────────────────────────────
            // ATTACK  –  owns a slot, executing the attack animation chain
            //
            // The guard at the very top of retroAutoCommand blocks re-entry
            // while an attack frame is playing, so this state body is only
            // reached when the animation has just FINISHED.
            //
            // On each entry after animation finish:
            //   • pickRandomAttack selects the next attack/chain link
            //   • tryLaunchAttack() delegates to animateAutoAnimation() which
            //     handles difficulty throttle & attackerCount on the target
            //   • If no valid attack can be launched → RECOVERY
            //
            // Direction-flip: frames with directionChangeEnabled=true mean
            // the enemy may have dashed through the target (e.g. a sliding kick).
            // faceTarget() is called on those frames so the sprite flips
            // immediately and the enemy stays visually correct.
            // ─────────────────────────────────────────────────────────────────
            case RETRO_STATE.ATTACK: {
                if (!ai.hasSlot) {
                    // Slot was cleaned up externally.
                    setState(RETRO_STATE.IDLE);
                    ai.idleUntil = _gameTick + IDLE_MS;
                    break;
                }

                if (!this.animationFinished && cur.attack) {
                    this.autoAttacking = true;
                    // Direction flip for pass-through attacks.
                    if (this.getCurrentFrame()?.directionChangeEnabled)
                        faceTarget(target);
                    return;
                }

                if (this.animationFinished) {
                    this.pickRandomAttack(null, null, 1);
                    if (!tryLaunchAttack(target)) {
                        // Chain exhausted or all attacks on cooldown → recover.
                        setState(RETRO_STATE.RECOVERY);
                        ai.recovUntil = _gameTick + RECOV_MS;
                        this.autoAttacking = false;
                    }
                }
                break;
            }

            // ─────────────────────────────────────────────────────────────────
            // RECOVERY  –  post-attack cooldown
            //
            // The slot is still held during this phase so the same enemy
            // can't be instantly re-granted by the director.
            // When the timer expires the slot is released and the enemy
            // returns to IDLE, freeing the slot for a different enemy.
            // ─────────────────────────────────────────────────────────────────
            case RETRO_STATE.RECOVERY: {
                if (_gameTick < ai.recovUntil) {
                    if (this.animationFinished && this.animation !== 'idle')
                        this.idle(6);
                    return;
                }
                releaseSlot();
                setState(RETRO_STATE.IDLE);
                ai.idleUntil = _gameTick + IDLE_MS;
                this.idle(7);
                break;
            }
        }

        // ── Late-launch: if we just transitioned INTO ATTACK this tick ─────────
        // We need to fire the animation immediately rather than waiting for the
        // next tick (which would cause a 1-frame ghost delay).
        if (ai.state === RETRO_STATE.ATTACK && ai.hasSlot && this.animationFinished) {
            if (!tryLaunchAttack(target)) {
                setState(RETRO_STATE.RECOVERY);
                ai.recovUntil = _gameTick + RECOV_MS;
            }
        }
    };

    // Expose the internal state object for easy debugging in the browser console.
    // Usage:  episodeEnemies[0].__retroAI
    enemy.__retroAI = ai;

    return {
        getState:    () => ai.state,
        getDirector: () => director,
    };
}