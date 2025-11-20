class DustEmitter {
    constructor() {
        this.particles = [];
        this.noiseSeed = Math.random() * 1000; // shader vari noise kaynağı
    }

    spawn(x, y) {
        const count = 6 + Math.floor(Math.random()*6);

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x,
                y,
                baseY: y,
                height: 4 + Math.random()*6,
                maxHeight: 30 + Math.random()*25,
                widthBottom: 8 + Math.random()*8,
                widthTop: 1 + Math.random()*3,
                offsetX: 0,
                alpha: 1,
                life: 0,
                maxLife: 0.6 + Math.random()*0.4,
                noiseOffset: Math.random()*1000
            });
        }
    }

    // Perlin/noise benzeri basit jitter
    noise(t) {
        return Math.sin(t * 1.7 + Math.sin(t * 0.5) * 2.3);
    }

    update(dt) {
        for (let p of this.particles) {

            p.life += dt;
            if (p.life >= p.maxLife) {
                p.alpha -= dt * 2;
                if (p.alpha <= 0) p.dead = true;
            }

            let t = p.life / p.maxLife;
            if (t < 0) t = 0;
            if (t > 1) t = 1;

            p.height = (p.maxHeight * t);

            // Shader vari gürültü jitter
            const n = this.noise(p.noiseOffset + p.life * 3);
            p.offsetX = n * 4; // hafif yan sallanma

        }

        // temizle
        this.particles = this.particles.filter(p => !p.dead);
    }

    draw(ctx) {
        for (let p of this.particles) {

            const bottomW = p.widthBottom;
            const topW = p.widthTop;

            const bx1 = p.x - bottomW/2;
            const bx2 = p.x + bottomW/2;

            const tx1 = p.x - topW/2 + p.offsetX;
            const tx2 = p.x + topW/2 + p.offsetX;

            const topY = p.y - p.height;

            // Yumuşak shader vari gradient
            const grad = ctx.createLinearGradient(p.x, p.y, p.x, topY);
            grad.addColorStop(0, `rgba(200,200,200,${p.alpha})`);
            grad.addColorStop(0.3, `rgba(150,150,150,${p.alpha * 0.5})`);
            grad.addColorStop(1, `rgba(150,150,150,0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(bx1, p.y);
            ctx.lineTo(bx2, p.y);
            ctx.lineTo(tx2, topY);
            ctx.lineTo(tx1, topY);
            ctx.closePath();
            ctx.fill();
        }
    }
}

const dust = new DustEmitter();