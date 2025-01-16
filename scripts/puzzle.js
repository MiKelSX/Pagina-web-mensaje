const rows = 4;
const columns = 4;
let currTile;
let otherTile;

// Inicializar el tablero
window.onload = function () {
    // Mostrar la hora
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById("hora").innerText = `${hours}:${minutes}`;
    }, 1000);

    // Crear el tablero de juego vacío
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("img");
            tile.src = "./Imagenes/blank.jpg";
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // Crear piezas mezcladas
    const pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.sort(() => Math.random() - 0.5); // Mezclar piezas

    // Añadir piezas al área de piezas
    for (const piece of pieces) {
        const tile = document.createElement("img");
        tile.src = `./Imagenes/${piece}.jpg`;
        tile.draggable = true;
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
};

// Funciones de arrastrar y soltar
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) return;

    // Intercambiar imágenes
    const currSrc = currTile.src;
    const otherSrc = otherTile.src;
    currTile.src = otherSrc;
    otherTile.src = currSrc;

    checkCompletion(); // Comprobar si el rompecabezas está completo
}

// Comprobar si el rompecabezas está completo
function checkCompletion() {
    const board = document.getElementById("board").children;
    for (let i = 0; i < board.length; i++) {
        const tileNumber = parseInt(board[i].src.split('/').pop().split('.')[0]); // Obtener número de imagen
        if (tileNumber !== i + 1) return; // Si no está en orden, no está completo
    }

    // Reproducir sonido y mostrar celebración
    const successSound = document.getElementById("success-sound");
    successSound.play();
    const celebration = document.getElementById("celebration");
    celebration.classList.remove("hidden");
    celebration.classList.add("show");
}
