//Tomando inputs html
const inputCard = document.querySelector("#inputCard");
const inputDate = document.querySelector("#inputDate");
const inputCVV = document.querySelector("#inputCVV");

//Patrones de las mascaras de cada input
const maskNumber = "####-####-####-####";
const maskDate = "##/##";
const maskCVV = "###";

let current = "";
//Estos arreglos son para guardar los valores del input de forma intermedia para transformarlos
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

inputCard.addEventListener("keydown", (e) => {
    
    if(e.key === 'Tab'){//Si es tabulador (para cambiar de input) no hacer nada, por eso return
        return;
    }

    e.preventDefault();//Elimina funcionalidad nativa de "keydown"
    handleInput(maskNumber, e.key, cardNumber);
    //cardNumber se modifica en la llamada al metodo en la linea anterior
    inputCard.value = cardNumber.join("");//aquí los elementos del arreglo se unen por espacios en un solo string

});

inputDate.addEventListener("keydown", (e) =>{
    if(e.key === "Tab"){
        return;
    }

    e.preventDefault();
    handleInput(maskDate, e.key, dateNumber);
    inputDate.value = dateNumber.join("");
});

inputCVV.addEventListener("keydown", (e) => {
    if(e.key === "Tab"){
        return;
    }

    e.preventDefault();
    handleInput(maskCVV, e.key, cvvNumber);
    inputCVV.value = cvvNumber.join("");
});

function handleInput(mask, key, arr){
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; //Caracteres permitidos

    if(key === 'Backspace' && arr.length > 0){//Si presiona borrar y hay elementos en el arreglo
        arr.pop(); //Elimina el último elemento del arreglo
        return;
    }

    //si la tecla presionada coincide con alguno de los caracteres del arreglo
    //y el tamaño del arreglo + 1 es menor que el tamaño de la mascara
    //La segunda condición es para evitar que siga escribiendo
    if(numbers.includes(key) && arr.length + 1 <= mask.length ){

        //Usamos el tamaño del arreglo como posición de la mascara
        //Imaginar a partir del tercer y cuarto elemento del arreglo.
        if(mask[arr.length] === "-" || mask[arr.length] === "/"){//cuando coincida con la posicion de estos caracteres...
            arr.push(mask[arr.length], key);//... se agregara el caracter / o - segun corresponda y el numero
        }else{
            arr.push(key);
        }

    }

}