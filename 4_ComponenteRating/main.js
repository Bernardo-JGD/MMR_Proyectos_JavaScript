//Tomamos el contenedor por la clase css que tiene
const ratingContainer = document.querySelector('.rating');

let currentValue = 0;
const limit = 10;

//Crea un arreglo el cual itera con map, y retorna elementos html
//los cuales traen la clase y data-pos enumerado de acuerdo a la iteracion desde cero
const html = Array.from(Array(limit)).map((_, i) =>{
    return `<div class="item item-${i}" data-pos="${i}" ></div>`;
});

ratingContainer.innerHTML = html.join("");//Pega todo en el contenedor separado por vacio

//itero todos los elementos con la clase ".item" (las estrellitas)
document.querySelectorAll(".item").forEach((item) =>{
    //Les agrego un evento del raton pasando por encima
    item.addEventListener("mouseover", (e) =>{

        const pos = item.getAttribute("data-pos");

        //si estoy en la posición actual y vuelvo a esa posición, ya no actualizo los html, puede ser pesado
        if(currentValue === parseInt(pos) + 1){
            return;
        }

        //itero cada elemento con clase item...
        document.querySelectorAll(".item").forEach((it) =>{
            //...si tiene esta clase css...
            if(it.classList.contains("item-full")){
                it.classList.remove("item-full"); //...se la quito...
                //Para poder volver a iterar y agregar la clase más adelante
            }
        });

        //Itero hasta la posicion en la que se encuentra el mouse
        for(let i = 0; i<=pos; i++){

            //en cada iteracion voy a tomar el html de cada cuadrito/estrellita
            //por medio de la clase css "item-#"
            const square = document.querySelector(`.item-${i}`);

            if(!square.classList.contains("item-full")){ //Si el cuadrito no incluye la clase css item-full...
                square.classList.add("item-full");//...le agrego la clase
            }

        }

        currentValue = parseInt(pos) + 1;

    });

    item.addEventListener("click",(e) =>{
        const pos = item.getAttribute("data-pos");
        currentValue = parseInt(pos) + 1;
        console.log(currentValue);
    });

});