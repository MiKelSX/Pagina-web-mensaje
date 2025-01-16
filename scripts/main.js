const canvas = document.getElementById('fluid-background');
const fluidToggleButton = document.getElementById("fluid-toggle");
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

// Verificar si hay un tema guardado en localStorage
if (localStorage.getItem('theme') === 'dark') {
    // Si el tema es oscuro, aplicar el estilo correspondiente
    toggle.checked = true;
    circle.style.fill = '#000';
    background.style.fill = 'url(#gradient-dark)';
    document.body.style.backgroundColor = '#1f1f1f'; // Fondo oscuro de la página
} else {
    // Si no hay tema guardado o es claro, aplicar el estilo claro
    toggle.checked = false;
    circle.style.fill = '#fff';
    background.style.fill = 'url(#gradient-light)';
    document.body.style.backgroundColor = '#fff'; // Fondo claro de la página
}

// Escuchar el cambio del estado del checkbox
toggle.addEventListener('change', function() {
    if (toggle.checked) {
        // Cuando el checkbox está marcado (fondo oscuro)
        circle.style.fill = '#000';  // Cambiar el color del círculo a negro
        background.style.fill = 'url(#gradient-dark)';  // Cambiar el fondo a oscuro
        document.body.style.backgroundColor = '#1f1f1f'; // Fondo oscuro de la página

        // Guardar la preferencia en localStorage
        localStorage.setItem('theme', 'dark');
    } else {
        // Cuando el checkbox no está marcado (fondo claro)
        circle.style.fill = '#fff';  // Cambiar el color del círculo a blanco
        background.style.fill = 'url(#gradient-light)';  // Cambiar el fondo a claro
        document.body.style.backgroundColor = '#fff'; // Fondo claro de la página

        // Guardar la preferencia en localStorage
        localStorage.setItem('theme', 'light');
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

let fluidActive = false; // Controla el estado del fluido

// Función para cambiar el estado de la explosión y activar el fluido
fluidToggleButton.addEventListener("click", () => {
    fluidActive = !fluidActive;

    // Activa/desactiva el estado "on" y la animación de explosión
    fluidToggleButton.classList.toggle("active", fluidActive);
    fluidToggleButton.classList.add("exploding");
    
    // Activar/desactivar animación de fondo
    if (fluidActive) {
        canvas.classList.add("explosion-bg");
        createParticles();  // Si está activo, crea partículas para el fluido
    } else {
        canvas.classList.remove("explosion-bg");
        particles = [];  // Desactiva las partículas
    }

    setTimeout(() => {
        fluidToggleButton.classList.remove("exploding");
    }, 1000);  // Elimina el efecto de explosión después de 0.5 segundos
});

// Función para crear partículas
function createParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        if (fluidActive) {
            particles.push(new ParticleType1(x, y)); // Crea partículas de Fluido Tipo 1
        }
    }
}

// Fluido, Partículas que siguen el movimiento del mouse
function ParticleType1(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 40 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
}

ParticleType1.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

// Animación para las partículas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

animate();
