
const tasks = []; //Arreglo de tareas
let time = 0; //Lleva la cuenta regresiva
let timer = null; //setInterval: permite ejecutar un fragmento de codigo cada cierto
let timerBreak = null; //Para los minutos de descanso
let current = null; //Para saber que tarea es laque se esta ejecutando

//Tomando los id del html
const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName"); //Obtenemos el div con id taskName que se encuentra dentro del div con id time

//Evento cuando detecte el submit
form.addEventListener("submit", e =>{
    e.preventDefault();//Para que no haga un POST/GET por el submit
    if(itTask.value !== ""){//Si es diferente de vacio
        createTask(itTask.value); //Funcion para agregar la nueva tarea
        itTask.value = "";
        renderTasks();
    }
    
});

function createTask(value){
    
    //Creamos los atributos de cada objeto de Tarea
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false
    };
    tasks.unshift(newTask);//agregamos la tarea al arreglo de tareas
}

function renderTasks(){
    //map itera el arreglo de tareas y vamos a regresar codigo html
    const html = tasks.map(task =>{
        return `
            <div class="task" >
                <div class="completed" >${task.completed ? `<span class="done" >Done</span>` : `<button class="start-button" data-id="${task.id}" >Start</button>` }</div>
                <div class="title" >${task.title}</div>
            </div>
        `;
    });

    const tasksContainer = document.querySelector("#tasks");
    //join va a transformar el arreglo de strings de html en un solo string separado por un espacio vacio
    tasksContainer.innerHTML = html.join("");

    const startButtons = document.querySelectorAll(".task .start-button");//Arreglo de botones start

    //Iteramos los botones start
    startButtons.forEach(button =>{
        //A cada boton le agregamos el evento click
        button.addEventListener("click", e =>{
            //¿Ya se esta ejecutando una TAREA?
            if(!timer){//Si no hay tareas ejecutandose
                const id = button.getAttribute("data-id"); //obten el id del boton
                startButtonHandler(id);
                button.textContent = "In progress...";
            }

        });

    });

}

function startButtonHandler(id){
    time = 25 * 60;//Establecemos el valor de tiempo por defecto de la actividad
    current = id;//El id del boton de la tarea actual presionada
    const taskIndex = tasks.findIndex((task) => task.id === id); //Encontramos el id de la Tarea actual por medio el id del boton presionado
    
    taskName.textContent = tasks[taskIndex].title; //Establecemos el nombre de la tarea en curso en la parte superior

    timer = setInterval(() =>{
        timerHandler(id); //Proceso para cambiar la etiqueta
    }, 1000);//Se actualiza cada segundo
}

function timerHandler(id){
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timer);
        current = null;
        taskName.textContent = "";
        renderTime();
    }

}

function renderTime(){
    const timeDiv = document.querySelector("#time #value");
    const minutes = parseInt(time/60);
    const seconds = parseInt(time%60);

    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}: ${seconds < 10 ? "0" : ""}${seconds}`;
}

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let statusApp = "stop";

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

renderTasks();
renderTime();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(2),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
        <div class="task">
        <div class="completed">${
          task.completed
            ? "<span class='done'>Done</span>"
            : `<button class="start-button" data-id="${task.id}">Start</button></div>`
        }
            <div class="title">${task.title}</div>
        </div>`;
  });
  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");
  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", () => {
      if (!timer) {
        startButtonHandler(startButton.getAttribute("data-id"));
        startButton.textContent = "In progress...";
      }
    });
  });
}

function startButtonHandler(id) {
  time = 0.5 * 60;
  current = id;
  const taskId = tasks.findIndex((task) => task.id === id);
  document.querySelector("#time #taskName").textContent = tasks[taskId].title;
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

function timerHandler(id = null) {
  time--;
  renderTime();
  if (time === 0) {
    markComplete(id);
    clearInterval(timer);
    renderTasks();
    startBreak();
  }
}

function markComplete(id) {
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
}

function startBreak() {
  time = 1 * 60;
  document.querySelector("#time #taskName").textContent = "Break";
  timerBreak = setInterval(timerBreakHandler, 1000);
}

function timerBreakHandler() {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    document.querySelector("#time #taskName").textContent = "";
    renderTime();
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}