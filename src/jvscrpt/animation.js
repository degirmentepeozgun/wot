'use strict';
function animation(_a) {
	this.key = _a.key;
	this.zoom = _a.zoom;
	this.baseKey = _a.baseKey;
	this.description = _a.description;
	this.class = _a.class;
	this.chargeDistance = _a.chargeDistance;
	this.skillClass = _a.skillClass;
	this.name = _a.name;
	this.hurt = _a.hurt;
	this.attack = _a.attack;
	this.reset = _a.reset;
	this.maxRepeat = _a.maxRepeat;
	this.reversed = _a.reversed;
	this.shadow = _a.shadow;
	this.enable = _a.enable;
	this.speed = _a.speed;
	this.oldSpeed = this.speed;
	this.frames = _a.frames;
	if(_a.finishType)
		this.finishType = _a.finishType;
	if(this.speed)
		this.frames.forEach(x => x.speed = MathCeil(x.speed / this.speed));
	this.passive = _a.passive;
	this.ultimate = _a.ultimate;
	this.rage = _a.rage;
	this.rate = _a.rate;
	this.level = _a.level;
	this.maxLevel = _a.maxLevel;
	this.priority = _a.priority;
	this.price = _a.price;
	this.energyRate = _a.energyRate;
	this.unlockLevel = _a.unlockLevel;
	this.type = _a.type;
	this.sprite = _a.sprite;
	this.totalFrames = _a.totalFrames;
	this.totalRange = _a.totalRange;
	this.minRange = _a.minRange;
	this.maxRange = _a.maxRange;
	this.default = _a.default;
	this.top = _a.top;
	this.left = _a.left;
	this.chain = _a.chain;
	this.chainOrder = _a.chainOrder;
	this.beforeOrder = _a.beforeOrder;
	this.defRate = _a.defRate;
	this.atkRate = _a.atkRate;
	this.imediateBreak = _a.imediateBreak;
	this.maxCharge = _a.maxCharge;
	this.chargeKey = _a.chargeKey;
	this.realWidth = _a.realWidth;
	this.atkType = _a.atkType;
	this.cooldown = _a.cooldown;
	this.startCooldown = _a.startCooldown;
	this.mobilityY = _a.mobilityY;
	this.order = _a.order;
	this.skillOrder = _a.skillOrder;
	this.hold = _a.hold;
	this.pull = _a.pull;
	this.bleed = _a.bleed;
	this.extraStepX = _a.extraStepX ?? 0;
	this.useExtraStepXRate = _a.useExtraStepXRate;
	this.src = _a.src;
	this.yard = _a.yard;
	this.aoe = _a.aoe;
	this.interactive = _a.interactive;
	this.finishingMove = _a.finishingMove;
	this.channeling = _a.channeling;
	this.before = _a.before;
	this.next = _a.next;
	this.realNext = this.next;
	this.move = _a.move;
	this.when = _a.when;
	this.reset = _a.reset;
	this.once = _a.once;
	if (_a.src)
		this.sprite = getImage(_a.src);
	this.resetImage = function() {
		this.sprite = getImage(this.src);
	}
	//this.soundSrc = _a.soundSrc;
	//if (this.soundSrc)
	//	this.sound = new Audio(this.soundSrc);
}