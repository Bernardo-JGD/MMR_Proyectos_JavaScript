const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]; // La matriz que representa al arreglo

let turn = 0; // 0 = para el usuario  y 1 para la computadora
//Seleccionando html del index
const boardContainer = document.querySelector('#board');
const playerDiv = document.querySelector('#player');

startGame();

function startGame(){
    renderBoard();
    turn = Math.random() <= 0.5 ? 0 : 1; //Cada vez que cargue la pagina puede variar quien empieza

    renderCurrentPlayer();

    if(turn === 0){
        playerPlays();
    }else{
        PCPlays();
    }
}

function playerPlays(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, i) =>{//Itero desde el 0 al 8 todas las celdas
        const column = i % 3;
        const row = parseInt(i / 3);

        if(board[row][column] === ""){//solo las celdas vacias pueden tener el evento click
            cell.addEventListener("click", (e) =>{
                board[row][column] = "O"; //Asignamos el valor a la matriz
                //Tomamos el valor de la matriz y lo asignamos a la celda
                cell.textContent = board[row][column]; 

                turn = 1;
                const won = checkIfWinner();

                if(won === 'none'){
                    PCPlays();//cedo el turno a la pc
                    return;
                }

                if(won === 'draw'){
                    renderDraw();
                    cell.removeEventListener('click', this);
                    return;
                }
                
            });
        }
    });
}

function PCPlays(){
    renderCurrentPlayer();//

    setTimeout(() =>{
        let played = false;
        const options = checkIfCanWin();

        if(options.length > 0){
            const bestOption = options[0];

            for(let i = 0; i < bestOption.length; i++){
                if(bestOption[i].value === 0){
                    const posi = bestOption[i].i;
                    const posj = bestOption[i].j;

                    board[posi][posj] = 'X';
                    player = true;
                    break;
                }
            }
        }else{
            for(let i = 0; i < board.length; i++){
                for(let j = 0; j < board.length; j++){
                    if(board[i][j] === "" && !played){
                        board[i][j] = "X";
                        played = true;
                    }
                }
            }
        }

        turn = 0;
        renderBoard();
        renderCurrentPlayer();

        const won = checkIfWinner();

        if(won === 'none'){
            playerPlays();
            return;
        }

        if(won === "draw"){
            playerPlays();
            renderDraw();
            return;
        }
        
    }, 1500);
}

function renderDraw(){
    playerDiv.textContent = "Draw";
}

function checkIfCanWin(){
    const arr = JSON.parse(JSON.stringify(board));//Copiar la matriz

    //Iteramos la copia de la matriz
    for(let i = 0; i<arr.length; i++){
        for(let j = 0; j<arr.length; j++){
            //Si coincide con algún if, asignamos un objeto con 3 atributos
            //a la posicion de la matriz copiada
            if(arr[i][j] === "X"){
                arr[i][j] = {value: 1, i, j};
            }

            if(arr[i][j] === ""){
                arr[i][j] = {value: 0, i, j};
            }

            if(arr[i][j] === "O"){
                arr[i][j] = {value: -2, i, j};
            }

        }
    }

    //Guardamos las posiciones como variables individuales
    //Fila1
    const p1 = arr[0][0];
    const p2 = arr[0][1];
    const p3 = arr[0][2];
    //Fila 2
    const p4 = arr[1][0];
    const p5 = arr[1][1];
    const p6 = arr[1][2];
    //Fila 3
    const p7 = arr[2][0];
    const p8 = arr[2][1];
    const p9 = arr[2][2];

    //Combinaciones de posiciones posibles para ganar, en orden consecutivo
    //Por filas
    const s1 = [p1, p2, p3];
    const s2 = [p4, p5, p6];
    const s3 = [p7, p8, p9];
    //Por columnas
    const s4 = [p1, p4, p7];
    const s5 = [p2, p5, p8];
    const s6 = [p3, p6, p9];
    //Por diagonales
    const s7 = [p1, p5, p9];
    const s8 = [p3, p5, p7];

    const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter((line) =>{
        return (
            line[0].value + line[1].value + line[2].value === 2 ||
            line[0].value + line[1].value + line[2].value === -4
        );
    });

    return res;
}

function checkIfWinner(){
    //Guardamos las posiciones como variables individuales
    //Fila1
    const p1 = board[0][0];
    const p2 = board[0][1];
    const p3 = board[0][2];
    //Fila 2
    const p4 = board[1][0];
    const p5 = board[1][1];
    const p6 = board[1][2];
    //Fila 3
    const p7 = board[2][0];
    const p8 = board[2][1];
    const p9 = board[2][2];

    //Combinaciones de posiciones posibles para ganar, en orden consecutivo
    //Por filas
    const s1 = [p1, p2, p3];
    const s2 = [p4, p5, p6];
    const s3 = [p7, p8, p9];
    //Por columnas
    const s4 = [p1, p4, p7];
    const s5 = [p2, p5, p8];
    const s6 = [p3, p6, p9];
    //Por diagonales
    const s7 = [p1, p5, p9];
    const s8 = [p3, p5, p7];

    const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter((line) =>{
        return (
            line[0] + line[1] + line[2] === "XXX" ||
            line[0] + line[1] + line[2] === "OOO" 
        );
    });

    if(res.length > 0){
        //Hay un ganador
        if(res[0][0] === "X"){
            playerDiv.textContent = "PC WINS";
            return "pcwon";
        }else{
            playerDiv.textContent = "USER WINS";
            return "userwon";
        }
    }else{
        let draw = true;
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j] === ""){
                    draw = false;
                }
            }
        }
        return draw? 'draw' : 'none';
    }
    
}

function renderCurrentPlayer(){
    //Cambia la etitqueta de quien esta en turno
    playerDiv.textContent = `${turn === 0 ? 'Player Turn': 'PC Turn'}`;
}

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