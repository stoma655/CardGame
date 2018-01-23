// глобальные переменные
const nameBar = document.querySelector('#name');
const overlayName = document.querySelector('.enter-name');
const changeName = document.querySelector('.change_name');
const downcard1 = document.querySelector('.downcard');
const stop = document.querySelector('.stop');
const overlay = document.querySelector('.one');
const onetus = document.querySelector('.onetus');
const twotus = document.querySelector('.twotus');
let result = 0;
let stoped = 0;
let globalVin1 = 0;
let globalVin2 = 0;

// инициализация игры 
    var card = new card();
    var world = new worldOne();
    var bot = new bot();
    if (localStorage.getItem('name')) {
    overlayName.style.display = "none";
    start();
} else {    
    nameBar.addEventListener('keyup', () => {
    if (event.keyCode === 13) {
        const localName = nameBar.value;
        overlayName.style.display = "none";
        localStorage.setItem('name', localName);
        playerName = localStorage.getItem('name');
        start();
        }
    })
}
//запуск игры 
function start() {
    world.recordName();
    world.renderCards();
    world.settings();
}

//прослушка кнопок 
changeName.addEventListener('click', world.newName);
downcard1.addEventListener('click', card.take);
stop.addEventListener('click', world.stopFunc);






