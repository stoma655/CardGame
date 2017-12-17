let nameBar = document.querySelector('#name');
let overlayName = document.querySelector('.enter-name');
if (localStorage.getItem('name')) {
	overlayName.style.display = "none";
	start();
} else {	
	nameBar.addEventListener('keyup', function() {
	if (event.keyCode === 13) {
        let localName = nameBar.value;
        overlayName.style.display = "none";
        localStorage.setItem('name', localName);
        playerName = localStorage.getItem('name');
        start();
    	}
	})
}

// функция изменения имени
document.querySelector('.change_name').addEventListener('click', function(){
	overlayName.style.display = "block";
	nameBar.addEventListener('keyup', function(){
		if (event.keyCode === 13) {
			let changeName = nameBar.value;
			localStorage.setItem('name', changeName);
			playerName = localStorage.getItem('name');
			overlayName.style.display = "none";
		}
	})
})



function start() {
	playerName = localStorage.getItem('name');
	// объекты мастей и наследование от объекта карта основн параметров
	scoreName = document.querySelector('#scoreName');
	scoreName.innerHTML = ''+ playerName +'';


	var card = {
		width: '170px',
		height: '265px',
		background: '#f2f2f2'
	};

	var vid = function(name, color) {
		this.name = name;
		this.__proto__ = card;
		this.color = color;
	}

	var bubn = new vid('♦', 'red');
	var cherv = new vid('♥', 'red');
	var crest = new vid('♣', 'black');
	var pick = new vid('♠', 'black');
	 
	// построение айтемов (карт) на стол

	var arr1 = [bubn, cherv, crest, pick];
	var count1 = 6;
	var cardleft = 30;
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 9; i++) {
			var elem = document.createElement('div');
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


		var arr = document.querySelectorAll('.item');
		for (var i = 0; i < arr.length; i++) {
			arr[i].style.color = 'transparent';
			arr[i].style.top = '8px';
			arr[i].style.backgroundImage = 'url(img/one.jpg)';
			arr[i].style.backgroundSize = 'cover';
		}

	var items = document.querySelectorAll('.item');
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
	var overlay = document.querySelector('.one');

	var downcard1 = document.querySelector('.downcard');
	downcard1.addEventListener('click', Func);

	var perm = document.querySelector('.perm');
	perm.addEventListener('click', Func2);

	var stop = document.querySelector('.stop');
	stop.addEventListener('click', stopFunc);

	var result = 0;
	var stoped = 0;
	Func2();


function Func() {
	var arr = document.querySelectorAll('.item');
	function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
	}
	var number = getRandomInt(0,36);
	if (arr[number].innerHTML.indexOf(14) !== -1) {
		stop.style.display = 'none';
		var onetus = document.querySelector('.onetus');
		var twotus = document.querySelector('.twotus');
		overlay.style.display = 'block';
		onetus.addEventListener('click', funcOne);
		twotus.addEventListener('click', funcTwo);
	}
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
	// var topCard = 0;
	// setInterval(function() {
	// 	arr[number].style.top = ''+ topCard +'px ';
	// 	if (topCard < 100) {
	// 		topCard += 6;
	// 	}
	// }, 4);
	arr[number].style.color = 'black';
	arr[number].style.backgroundImage = 'url(img/two.jpg)';
}

// сброс текущей игры
function Func2() {
	var arrgrab = document.querySelectorAll('.item-grab');
	for (var i = 0; i < arrgrab.length; i++) {
		arrgrab[i].classList.remove('item-grab');
		arrgrab[i].classList.add('item');
	}
	var arr = document.querySelectorAll('.item');
	for (var i = 0; i < arr.length; i++) {
		arr[i].style.color = 'transparent';
		arr[i].style.top = '8px';
		arr[i].style.backgroundImage = 'url(img/one.jpg)';
		arr[i].style.backgroundSize = 'cover';
	}	
	result = 0;
	perepis();
}



var resOne = result;

// Ход Бота
function Bot() {	
	giveCard = document.querySelector('.downcard');
	give();
	function give() {
		botstep = document.querySelector('.botstep');
		deleteButtons = document.querySelector('.buttons');
		botstep.style.display = "block";
		deleteButtons.style.display = "none";
		setTimeout(function(){
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
var sravnenie1 = 0;
var sravnenie2 = 0;
var globalVin1 = 0;
var globalVin2 = 0;
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
	var botColumn = document.querySelector('.col-two');
	var elemscore = document.createElement('h3');
	elemscore.classList.add('item-score');
	elemscore.innerHTML = ''+ stoped +'';
	botColumn.appendChild(elemscore);
}


// ограничение количества очков на доске и вывод очков за партию + начисление рейтинга

var reitArr = [];
switch(true) {
	case localStorage.getItem('raiting') == 1: reitArr.push('one');break;
	case localStorage.getItem('raiting') == 2: reitArr.push('one', 'one');break;
	case localStorage.getItem('raiting') == 3: reitArr.push('one', 'one', 'one');break;
	case localStorage.getItem('raiting') == 4: reitArr.push('one', 'one', 'one', 'one');break;
	case localStorage.getItem('raiting') == 5: reitArr.push('one', 'one', 'one', 'one', 'one');break;
};
var  massiveScore = [];
setInterval(function() {
	massiveScore = document.querySelectorAll('.table h3');
if (massiveScore.length > 19){
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
	var finish = localStorage.getItem('raiting');
	var reit = document.querySelectorAll('.star');
		for (var i = 0; i < 5; i++) {
		reit[i].innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
	}

		alert('партия окончена');
		location.reload(true)
	}
}, 500);

setTimeout(function() {
	var reit = document.querySelectorAll('.star');
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

	// var deleteItems = document.querySelectorAll('.item-grab');
	// for (var i = 0; i < deleteItems.length; i++) {
	// 	deleteItems[i].remove();
	// };
	stoped = result;
	// switch(true) {
	// 	case stoped < 21: alert('ты набрал '+ stoped +' недобор');break;
	// 	case stoped === 21: alert('ты набрал '+ stoped +' ПОЗДРАВЛЯЮ!');break;
	// 	case stoped > 21: alert('ты набрал '+ stoped +' перебор');break;
	// }
	Func2();
	var table1 = document.querySelectorAll('.table h3');
	var tablelen = table1.length;
	

	
		if ( tablelen & 1 ) {
			var player2 = document.querySelector('.col-two');
			var elemscore = document.createElement('h3');
			elemscore.classList.add('item-score');
			elemscore.innerHTML = ''+ stoped +'';
			player2.appendChild(elemscore);
		} else {
			var player1 = document.querySelector('.col-one');
			var elemscore2 = document.createElement('h3');
			elemscore2.classList.add('item-score');
			elemscore2.innerHTML = ''+ stoped +'';
			player1.appendChild(elemscore2);
		}
	
	
	Bot();

}
function perepis() {
		var res = document.querySelector('h1');
		res.innerHTML = 'ТЕКУЩИЙ СЧЕТ:  '+ result +'';
		// localStorage.setItem('result', result);
		// var res = document.querySelector('h1');
		// LocalRes = localStorage.getItem('result');
		// res.innerHTML = 'ТЕКУЩИЙ СЧЕТ:  '+ LocalRes +'';
	}

var res = document.querySelector('h1');
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