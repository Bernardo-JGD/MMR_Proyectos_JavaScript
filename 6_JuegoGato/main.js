const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]; // La matriz que representa al arreglo

let turn = 0; // 0 = para el usuario  y 1 para la computadora
//Seleccionando html del index
const boardContainer = document.querySelector('#board');
const playerDiv = document.querySelector('#player');

function renderBoard(){
    const html = board.map((row) =>{//Itero filas
        const cells = row.map((cell) =>{//Itero celda por celda de la fila actual
            return `<button class="cell" >${cell}</button>`;//Retorno un boton para cada celda
        })
        //Por cada fila iterada, voy a juntar las celdas separadas por espacios vacios
        return `<div class="row" >${cells.join("")}</div>`;
    });
    boardContainer.innerHTML = html.join("");//Uno las filas por espacios vacios
}