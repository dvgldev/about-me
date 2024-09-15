const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particlesArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = 1.1;
        this.shrinkRate = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * 360;
        this.rotationSpeed = Math.random() * 0.05 - 0.025;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.shrinkRate;
        this.angle += this.rotationSpeed;

        if (this.alpha <= 0) {
            this.alpha = 0;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.random() * 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.size * 15, 0);
        ctx.stroke();
        ctx.restore();
    }
}

function createParticles() {
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].alpha <= 0) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();
setInterval(createParticles, 150); 

