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

// Obtener el checkbox y el círculo
const toggle = document.getElementById('toggle');
const circle = document.querySelector('circle');
const background = document.getElementById('background');

// Escuchar el cambio del estado del checkbox
toggle.addEventListener('change', function() {
    if (toggle.checked) {
        // Cuando el checkbox está marcado (fondo oscuro)
        circle.style.fill = '#000';  // Cambiar el color del círculo a negro
        background.style.fill = 'url(#gradient-dark)';  // Cambiar el fondo a oscuro
        document.body.style.backgroundColor = '#1f1f1f'; // Fondo oscuro de la página
    } else {
        // Cuando el checkbox no está marcado (fondo claro)
        circle.style.fill = '#fff';  // Cambiar el color del círculo a blanco
        background.style.fill = 'url(#gradient-light)';  // Cambiar el fondo a claro
        document.body.style.backgroundColor = '#fff'; // Fondo claro de la página
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
