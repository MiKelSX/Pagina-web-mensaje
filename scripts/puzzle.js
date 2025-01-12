const puzzleContainer = document.getElementById('puzzle-container');
const img = new Image();
img.src = 'images/foto.png'; // Imagen para el rompecabezas

img.onload = () => {
    const rows = 5;  // Filas
    const cols = 6;  // Columnas
    const pieceWidth = img.width / cols;
    const pieceHeight = img.height / rows;
    const pieces = [];

    // Crear las piezas del rompecabezas
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const pieceCanvas = document.createElement('canvas');
            const pieceCtx = pieceCanvas.getContext('2d');
            pieceCanvas.width = pieceWidth;
            pieceCanvas.height = pieceHeight;

            // Dibujar la pieza de la imagen en el canvas
            pieceCtx.drawImage(
                img,
                col * pieceWidth,
                row * pieceHeight,
                pieceWidth,
                pieceHeight,
                0,
                0,
                pieceWidth,
                pieceHeight
            );

            pieces.push({ pieceCanvas, row, col });
            puzzleContainer.appendChild(pieceCanvas);

            pieceCanvas.style.position = 'absolute';
            pieceCanvas.style.top = `${Math.random() * (puzzleContainer.clientHeight - pieceHeight)}px`;
            pieceCanvas.style.left = `${Math.random() * (puzzleContainer.clientWidth - pieceWidth)}px`;

            pieceCanvas.addEventListener('mousedown', (e) => {
                pieceCanvas.style.zIndex = 10;
                let offsetX = e.clientX - pieceCanvas.offsetLeft;
                let offsetY = e.clientY - pieceCanvas.offsetTop;

                function dragMove(event) {
                    pieceCanvas.style.left = `${event.clientX - offsetX}px`;
                    pieceCanvas.style.top = `${event.clientY - offsetY}px`;
                }

                function dragEnd() {
                    document.removeEventListener('mousemove', dragMove);
                    document.removeEventListener('mouseup', dragEnd);

                    // Verificar si la pieza está en su lugar correcto
                    if (
                        Math.abs(pieceCanvas.offsetLeft - pieceWidth * pieces.find(p => p.row === row && p.col === col).col) < 10 &&
                        Math.abs(pieceCanvas.offsetTop - pieceHeight * pieces.find(p => p.row === row && p.col === col).row) < 10
                    ) {
                        pieceCanvas.style.left = `${pieceWidth * pieces.find(p => p.row === row && p.col === col).col}px`;
                        pieceCanvas.style.top = `${pieceHeight * pieces.find(p => p.row === row && p.col === col).row}px`;
                    }
                }

                document.addEventListener('mousemove', dragMove);
                document.addEventListener('mouseup', dragEnd);
            });
        }
    }
};
