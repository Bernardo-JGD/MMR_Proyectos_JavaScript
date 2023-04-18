let events = []; // Arreglo de fechas
let arr = []; // Cargar informacion

//Elementos html
const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const buttonAdd = document.querySelector('#bAdd');
const eventsContainer = document.querySelector('#eventsContainer');

const json = load();

try{
    arr = JSON.parse(json);//Seria como serializar para guardar
    //Estamos en trycatch porque lo anterior puede generar un "undefined"
}catch(error){
    arr = [];
}
//Si encuentra algo de información en load y no truena al serializar
//cargar el arreglo de fechas/eventos con la informacion guardada


events = arr ?  [...arr] : [];
//Y actualizamos la lista de fechas/eventos
renderEvents();

//Acciones cuando presione submit
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); //Evitar lo de los get o post por defecto
    addEvent();
});

buttonAdd.addEventListener("click", (e) => {
    e.preventDefault(); //Evitar lo de los get o post por defecto
    addEvent();
});

function addEvent(){
    //Si el nombre o la fecha están vacios, no hacer nada
    if(eventName.value === "" || eventDate.value === ""){
        return; 
    }

    //Si la fecha ya pasó, no hacer nada
    if(dateDiff(eventDate.value) < 0){
        return;
    }

    const newEvent = { //Creando un objeto a partir de los datos de entrada
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value
    }

    events.unshift(newEvent); // Agregar elemento al arreglo de fechas al inicio del arreglo

    save(JSON.stringify(events)); // Guardamos de forma local cada vez que se agrega un nuevo evento/fecha

    eventName.value = "";
    renderEvents();
}

function dateDiff(d){
    const targetDate = new Date(d);
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24)); // ...Redondeando y dando formato al resultado para saber si es mayor o menor que cero
    return days;
}

function renderEvents(){
    //Recorriendo el arreglo de events y retornando sus valores en etiquetas html
    const eventsHTML = events.map(event => {
        return `
            <div class="event" >
                
                <div class="days" >
                    <span class="days-number" > ${dateDiff(event.date)} </span>
                    <span class="days-text" > dias </span>
                </div>

                <div class="event-name" >${event.name}</div>
                <div class="event-date" >${event.date}</div>
                <div class="actions" >
                    <button class="bDelete" data-id="${event.id}" >Eliminar</button>
                </div>

            </div>
        `;
    });
    eventsContainer.innerHTML = eventsHTML.join('');//Unimos todos los elementos del arreglo por espacio vacio
    //Iteramos todos los elementos (botones) con la clase de css bDelete...
    document.querySelectorAll('.bDelete').forEach(button => {
        //... y les agregamos el evento click
        button.addEventListener('click', e =>{
            const id = button.getAttribute('data-id');
            events = events.filter(event => event.id !== id);

            save(JSON.stringify(events));

            renderEvents();
        });
    });
}

function save(data){
    localStorage.setItem('items', data);
}

function load(){
    return localStorage.getItem('items');
}
