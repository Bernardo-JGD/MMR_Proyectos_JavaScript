const keys = [
    [
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"]
    ],//Primer fila
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"]
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["¨", "{"],
        ["Ç", "}"]
    ],
    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"]
    ],
    [
        ["SPACE", "SPACE"]
    ]//Ultima fila
];

//El estado de estas variables cambia como se muestra el teclado
let mayus = false;
let shift = false;
let current = null; //Ultima tecla presionada

renderKeyboard();

function renderKeyboard(){
    //Extrayendo contenedor html
    const keyboardContainer = document.querySelector('#keyboard-container');

    let empty = `<div class="key-empty" ></div>`;//Espacios vacios

    const layers = keys.map((layer) =>{//Itero primero las filas
        return layer.map((key) =>{//Itero cada par de elementos de cada fila
            if(key[0] === "SHIFT"){//key[0] === "SHIFT"
                return `<button class="key key-shift ${shift ? 'activated': ''}" >${key[0]}</button>`;
            }
            if(key[0] === "MAYUS"){
                return `<button class="key key-mayus ${mayus ? 'activated' : ''}" >${key[0]}</button>`
            }
            if(key[0] === "SPACE"){
                return `<button class="key key-space" ></button>`;
            }

            return `
                <button class="key key-normal" >
                    ${
                        shift
                            ? key[1]
                            : mayus &&
                              key[0].toLowerCase().charCodeAt(0) >= 97
                              &&
                              key[0].toLowerCase().charCodeAt(0) <= 122
                            ? key[1]
                            : key[0]
                    }
                </button>
            `;

            /*
            shift ------------->Si shift esta presionado...
                 key[1] -------------> ...pon la segunda columna de las teclas...Si shift NO ESTA PRESIONADO...
                : mayus && -------------> Comprueba si mayus esta presionado y...
                    key[0].toLowerCase().charCodeAt(0) >= 97 ------------->... comprueba si la posicion actual es una minúscula...
                    &&
                    key[0].toLowerCase().charCodeAt(0) <= 122 ------------->... en el rango ASCII
                 key[1]------------->... si era una minuscula pon ahora una mayuscula (posicion 1)...
                : key[0] ------------->...si no era una minuscula entonces pon una mayuscula
            */

        });
    });

    layers[0].push(empty);//Agrego el espacio vacio al final de la primer fila
    layers[1].unshift(empty);//Agrego el espacio vacio al principio de la segunda fila

    const htmlLayers = layers.map((layer) =>{
        return layer.join("");//uno cada tecla
    });

    keyboardContainer.innerHTML = "";

    htmlLayers.forEach(layer=>{
        keyboardContainer.innerHTML += `<div class="layer" >${layer}</div>`;//Concateno cada fila
    });

    document.querySelectorAll(".key").forEach((key) =>{
        key.addEventListener("click", (e) =>{
            if(current){
                if(key.textContent === "SHIFT"){
                    shift = !shift;
                }else if(key.textContent === "MAYUS"){
                    mayus = !mayus;
                }else if(key.textContent === ""){
                    current.value += " ";
                }else{
                    current.value += key.textContent.trim();
                    if(shift){
                        shift = false;
                    }
                }
                renderKeyboard();
                current.focus();
            }
        });
    });

    
    
}

document.querySelectorAll("input").forEach((input) =>{
    input.addEventListener("focusin", (e) =>{//cuando el foco esté en el input
        current = e.target;//cambiar el valor de current
        renderKeyboard();
    });
});

