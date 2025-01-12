const carta = document.getElementById('carta');
const sobre = document.getElementById('sobre');
const mensaje = document.getElementById('mensaje');

carta.addEventListener('click', () => {
    sobre.style.transform = 'rotateY(180deg)';
    setTimeout(() => {
        mensaje.style.display = 'block';
    }, 1000);
});

// Carta y sobre 3D
document.body.style.perspective = '1000px';

let carta3D = document.querySelector('.carta');
let sobre3D = document.querySelector('.sobre');
let mouseX, mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 30;
    mouseY = (e.clientY / window.innerHeight) * 30;
    carta3D.style.transform = `rotateY(${mouseX}deg) rotateX(${mouseY}deg)`;
    sobre3D.style.transform = `rotateY(${mouseX}deg) rotateX(${mouseY}deg)`;
});
