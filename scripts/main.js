const canvas = document.getElementById('fluid-background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 40 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

const toggle = document.getElementById('toggle');
const body = document.body;

toggle.addEventListener('change', function () {
    if (toggle.checked) {
        body.style.backgroundColor = "#1F2241"; // Fondo oscuro
        body.style.color = "#fff"; // Texto en blanco
    } else {
        body.style.backgroundColor = "#f0f0f0"; // Fondo claro
        body.style.color = "#000"; // Texto en negro
    }
});


Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2000;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

Particle.prototype.animate = function () {
    this.update();
};

function createFluidEffect(event) {
    const xPos = event.x;
    const yPos = event.y;
    particles.push(new Particle(xPos, yPos));
}

function animateFluidBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.animate();
        if (particle.size <= 0.2) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animateFluidBackground);
}

window.addEventListener('mousemove', createFluidEffect);
animateFluidBackground();
