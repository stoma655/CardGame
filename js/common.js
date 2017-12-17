// инициализация игры 
const nameBar = document.querySelector('#name');
const overlayName = document.querySelector('.enter-name');
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

// функция изменения имени
document.querySelector('.change_name').addEventListener('click', () => {
	overlayName.style.display = "block";
	nameBar.addEventListener('keyup', () => {
		if (event.keyCode === 13) {
			const changeName = nameBar.value;
			localStorage.setItem('name', changeName);
			playerName = localStorage.getItem('name');
			overlayName.style.display = "none";
		}
	})
})


function start() {
	playerName = localStorage.getItem('name');
	
	scoreName = document.querySelector('#scoreName');
	scoreName.innerHTML = ''+ playerName +'';

// объекты мастей и наследование от объекта карта основн параметров
	const card = {
		width: '170px',
		height: '265px',
		background: '#f2f2f2'
	};

	const vid = function(name, color) {
		this.name = name;
		this.__proto__ = card;
		this.color = color;
	}

	const bubn = new vid('♦', 'red');
	const cherv = new vid('♥', 'red');
	const crest = new vid('♣', 'black');
	const pick = new vid('♠', 'black');
	 
// построение айтемов (карт) на стол
	const arr1 = [bubn, cherv, crest, pick];
	let count1 = 6;
	let cardleft = 30;
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 9; i++) {
			const elem = document.createElement('div');
			elem.classList.add('item');
			elem.style.backgroundColor = ''+ card.background +'';
			elem.style.width = ''+ card.width +'';
			elem.style.height = ''+ card.height +'';
			elem.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
			
			elem.style.position = 'absolute';
			elem.style.left = ''+ cardleft +'px';
			elem.innerHTML = '<mast>'+ arr1[0].name +'</mast><br>'
			elem.innerHTML += '<h5>'+ count1 +'</h5>';
			document.body.appendChild(elem);
			cardleft += 40;
			count1 += 1;	
		}
		arr1.shift();
		count1 = 6;
	}

// раздача стилей перевернутым картам
		const arr = document.querySelectorAll('.item');
		for (var i = 0; i < arr.length; i++) {
			arr[i].style.color = 'transparent';
			arr[i].style.top = '8px';
			arr[i].style.backgroundImage = 'url(img/one.jpg)';
			arr[i].style.backgroundSize = 'cover';
		}
	const items = document.querySelectorAll('.item');
	for (var i = 0; i < items.length; i++) {
		switch(true) {
			case items[i].innerHTML.indexOf(6)  !== -1: items[i].innerHTML += '<he>6</he>';
			break;
			case items[i].innerHTML.indexOf(7)  !== -1: items[i].innerHTML += '<he>7</he>';
			break;
			case items[i].innerHTML.indexOf(8)  !== -1: items[i].innerHTML += '<he>8</he>';
			break;
			case items[i].innerHTML.indexOf(9)  !== -1: items[i].innerHTML += '<he>9</he>';
			break;
			case items[i].innerHTML.indexOf(10) !== -1: items[i].innerHTML += '<he>10</he>';
			break;
			case items[i].innerHTML.indexOf(11) !== -1: items[i].innerHTML += '<br> <none>валет</none> <br> <he>В</he> ';
			break;
			case items[i].innerHTML.indexOf(12) !== -1: items[i].innerHTML += '<br> <none>дама</none> <br> <he>Д</he> ';
			break;
			case items[i].innerHTML.indexOf(13) !== -1: items[i].innerHTML += '<br> <none>король</none> <br> <he>К</he> ';
			break;
			case items[i].innerHTML.indexOf(14) !== -1: items[i].innerHTML += '<br> <none>туз</none> <br> <he>Т</he> ';
			break;
		}
	}

// прослушка кнопок 
	const overlay = document.querySelector('.one');

	const downcard1 = document.querySelector('.downcard');
	downcard1.addEventListener('click', Func);

	const perm = document.querySelector('.perm');
	perm.addEventListener('click', Func2);

	const stop = document.querySelector('.stop');
	stop.addEventListener('click', stopFunc);

	let result = 0;
	let stoped = 0;
	Func2();

// функция выпада карты из колоды
function Func() {
	const arr = document.querySelectorAll('.item');
	function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
	}
	const number = getRandomInt(0,36);
	// если выпал туз открыть модалку
	if (arr[number].innerHTML.indexOf(14) !== -1) {
		stop.style.display = 'none';
		const onetus = document.querySelector('.onetus');
		const twotus = document.querySelector('.twotus');
		overlay.style.display = 'block';
		onetus.addEventListener('click', funcOne);
		twotus.addEventListener('click', funcTwo);
	}
	// запись номинала карты в текущий счет
	switch(true) {
		case arr[number].innerHTML.indexOf(6)  !== -1: result += 6; perepis();break;
		case arr[number].innerHTML.indexOf(7)  !== -1: result += 7; perepis();break;
		case arr[number].innerHTML.indexOf(8)  !== -1: result += 8; perepis();break;
		case arr[number].innerHTML.indexOf(9)  !== -1: result += 9; perepis();break;
		case arr[number].innerHTML.indexOf(10) !== -1: result += 10; perepis();break;
		case arr[number].innerHTML.indexOf(11) !== -1: result += 2; perepis();break;
		case arr[number].innerHTML.indexOf(12) !== -1: result += 3; perepis();break;
		case arr[number].innerHTML.indexOf(13) !== -1: result += 4; perepis();break;
	}
	arr[number].classList.remove('item');
	arr[number].classList.add('item-grab');
	arr[number].style.top = '100px';
	arr[number].style.borderRadius = '5px';
	arr[number].style.color = 'black';
	arr[number].style.backgroundImage = 'url(img/two.jpg)';
}

// сброс текущей игры (кнопка имеет display none в css)
function Func2() {
	const arrgrab = document.querySelectorAll('.item-grab');
	for (var i = 0; i < arrgrab.length; i++) {
		arrgrab[i].classList.remove('item-grab');
		arrgrab[i].classList.add('item');
	}
	const arr = document.querySelectorAll('.item');
	for (var i = 0; i < arr.length; i++) {
		arr[i].style.color = 'transparent';
		arr[i].style.top = '8px';
		arr[i].style.backgroundImage = 'url(img/one.jpg)';
		arr[i].style.backgroundSize = 'cover';
	}	
	result = 0;
	perepis();
}

let resOne = result;

// Ход Бота
function Bot() {	
	giveCard = document.querySelector('.downcard');
	give();
	function give() {
		botstep = document.querySelector('.botstep');
		deleteButtons = document.querySelector('.buttons');
		botstep.style.display = "block";
		deleteButtons.style.display = "none";
		setTimeout(() => {
			giveCard.click();
			botTusOne = document.querySelector('.onetus');
			botTusOne.click();
			resOne = result;
			switch(true) {
				case resOne < 19: give();break;
				case resOne >= 19: alert('бот набрал '+ resOne +'');writeBot();
				gameOver();
				Func2();
				deleteButtons.style.display = "block";
				botstep.style.display = "none";
				break;
				case resOne === 21: alert('бот набрал 21!');writeBot();
				gameOver();
				Func2();
				deleteButtons.style.display = "block";
				botstep.style.display = "none";
				break;
			}
		}, 700)
	}		
}

// функция сравнения результата 
let sravnenie1 = 0;
let sravnenie2 = 0;
let globalVin1 = 0;
let globalVin2 = 0;
function gameOver() {
	sravnenie2 = result;
	if (sravnenie1 <= 21 && sravnenie2 <= 21) {
		switch (true) {
            case sravnenie1 > sravnenie2: 
                alert('Ты выйграл!');globalVin1 += 1;break;
            case sravnenie2 > sravnenie1: 
				alert('Ты проиграл :(');globalVin2 += 1;break;
            case sravnenie2 === sravnenie1: alert('ничья');break;
		}
	} else {
		switch (true) {
        	case sravnenie1 < sravnenie2: 
                alert('Ты выйграл!');globalVin1 += 1;break;
        	case sravnenie2 < sravnenie1: 
                alert('Ты проиграл :(');globalVin2 += 1;break;
        	case sravnenie2 === sravnenie1: alert('ничья'); break;
		}
	}
}

// запись очков бота на доску 
function writeBot() {
	stoped = result;
	const botColumn = document.querySelector('.col-two');
	const elemscore = document.createElement('h3');
	elemscore.classList.add('item-score');
	elemscore.innerHTML = ''+ stoped +'';
	botColumn.appendChild(elemscore);
}

// ограничение количества очков на доске и вывод очков за партию + начисление рейтинга
let reitArr = [];
switch(true) {
	case localStorage.getItem('raiting') == 1: reitArr.push('one');break;
	case localStorage.getItem('raiting') == 2: reitArr.push('one', 'one');break;
	case localStorage.getItem('raiting') == 3: reitArr.push('one', 'one', 'one');break;
	case localStorage.getItem('raiting') == 4: reitArr.push('one', 'one', 'one', 'one');break;
	case localStorage.getItem('raiting') == 5: reitArr.push('one', 'one', 'one', 'one', 'one');break;
};
let  massiveScore = [];
setInterval(() => {
	massiveScore = document.querySelectorAll('.table h3');
if (massiveScore.length > 3){
	switch(true) {
		case globalVin1 > globalVin2: alert('в итоге ты выйграл! +1 к рейтингу '+ globalVin1 +' vs '+ globalVin2 +'');
		if (reitArr.length < 5) {
			reitArr.push('one');
		};break;
		case globalVin1 < globalVin2: alert('в итоге ты проиграл :( -1 от рейтинга '+ globalVin1 +' vs '+ globalVin2 +'');
		if (reitArr.length > 0) {
			reitArr.shift();
		};break;
	};
	numberReiting = reitArr.length;
	localStorage.setItem('raiting', numberReiting);
	let finish = localStorage.getItem('raiting');
	let reit = document.querySelectorAll('.star');
		for (var i = 0; i < 5; i++) {
		reit[i].innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
	}
		alert('партия окончена');
		location.reload(true)
	}
}, 500);
setTimeout(() => {
	let reit = document.querySelectorAll('.star');
	finish = localStorage.getItem('raiting');
	console.log(finish);
	switch(true) {
		case finish == 0:
		for (var i = 0; i < 5; i++) {
			reit[i].innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
		};break;
		case finish == 1:
			reit[0].innerHTML = '<i class="fa fa-star winstar" aria-hidden="true"></i>';break;
		case finish == 2:
		for (var i = 0; i < 2; i++) {
			reit[i].innerHTML = '<i class="fa fa-star winstar" aria-hidden="true"></i>';
		};break;
		case finish == 3:
		for (var i = 0; i < 3; i++) {
			reit[i].innerHTML = '<i class="fa fa-star winstar" aria-hidden="true"></i>';
		};break;
		case finish == 4:
		for (var i = 0; i < 4; i++) {
			reit[i].innerHTML = '<i class="fa fa-star winstar" aria-hidden="true"></i>';
		};break;
		case finish == 5:
		for (var i = 0; i < 5; i++) {
			reit[i].innerHTML = '<i class="fa fa-star winstar" aria-hidden="true"></i>';
		};break;
	}
}, 500);
	
// кнопка хватит
function stopFunc() {
	sravnenie1 = result;
	stoped = result;
	Func2();
	const table1 = document.querySelectorAll('.table h3');
	const tablelen = table1.length;
		if ( tablelen & 1 ) {
			const player2 = document.querySelector('.col-two');
			const elemscore = document.createElement('h3');
			elemscore.classList.add('item-score');
			elemscore.innerHTML = ''+ stoped +'';
			player2.appendChild(elemscore);
		} else {
			const player1 = document.querySelector('.col-one');
			const elemscore2 = document.createElement('h3');
			elemscore2.classList.add('item-score');
			elemscore2.innerHTML = ''+ stoped +'';
			player1.appendChild(elemscore2);
		}
	Bot();
}
function perepis() {
		const res = document.querySelector('h1');
		res.innerHTML = 'ТЕКУЩИЙ СЧЕТ:  '+ result +'';
	}
const res = document.querySelector('h1');
LocalRes = localStorage.getItem('result');
res.innerHTML = 'ТЕКУЩИЙ СЧЕТ:  '+ LocalRes +'';
	function funcOne() {
		overlay.style.display = 'none';
		result += 1;
		perepis();
		stop.style.display = 'inline-block';
	}
	function funcTwo() {
		overlay.style.display = 'none';
		result += 11;
		perepis();
		stop.style.display = 'inline-block';
	}
}