// control
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

var bubn = new vid('bubn', 'red');
var cherv = new vid('cherv', 'red');
var crest = new vid('crest', 'black');
var pick = new vid('pick', 'black');

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
		elem.innerHTML = ''+ arr1[0].name +'<br> <h5>'+ count1 +'</h5>';
		document.body.appendChild(elem);
		cardleft += 40;
		count1 += 1;	
	}
	arr1.shift();
	count1 = 6;
}
Func2();

var items = document.querySelectorAll('.item h5');
for (var i = 0; i < items.length; i++) {
	switch(true) {
		case items[i].innerHTML.indexOf(11) !== -1: items[i].innerHTML += '<br> валет <br> ';
		break;
		case items[i].innerHTML.indexOf(12) !== -1: items[i].innerHTML += '<br> дама <br> ';
		break;
		case items[i].innerHTML.indexOf(13) !== -1: items[i].innerHTML += '<br> король <br> ';
		break;
		case items[i].innerHTML.indexOf(14) !== -1: items[i].innerHTML += '<br> туз <br> ';
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

function Func() {
	var arr = document.querySelectorAll('.item');
	function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
	}
	var number = getRandomInt(0,36);
	if (arr[number].innerHTML.indexOf(14) !== -1) {
		var onetus = document.querySelector('.onetus');
		var twotus = document.querySelector('.twotus');
		overlay.style.display = 'block';
		onetus.addEventListener('click', funcOne);
		twotus.addEventListener('click', funcTwo);
	}
	switch(true) {
		case arr[number].innerHTML.indexOf(6) !== -1: result += 6; perepis();break;
		case arr[number].innerHTML.indexOf(7) !== -1: result += 7; perepis();break;
		case arr[number].innerHTML.indexOf(8) !== -1: result += 8; perepis();break;
		case arr[number].innerHTML.indexOf(9) !== -1: result += 9; perepis();break;
		case arr[number].innerHTML.indexOf(10) !== -1: result += 10; perepis();break;
		case arr[number].innerHTML.indexOf(11) !== -1: result += 2; perepis();break;
		case arr[number].innerHTML.indexOf(12) !== -1: result += 3; perepis();break;
		case arr[number].innerHTML.indexOf(13) !== -1: result += 4; perepis();break;
	}
	arr[number].classList.remove('item');
	arr[number].classList.add('item-grab');
	arr[number].style.top = '100px';
	arr[number].style.color = 'black';
	arr[number].style.backgroundImage = 'url(img/two.jpg)';
}

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

function stopFunc() {
	stoped = result;
	switch(true) {
		case stoped < 21: alert('ты набрал '+ stoped +' недобор');break;
		case stoped === 21: alert('ты набрал '+ stoped +' ПОЗДРАВЛЯЮ!');break;
		case stoped > 21: alert('ты набрал '+ stoped +' перебор');break;
	}
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
}
function perepis() {
		var res = document.querySelector('h1');
		res.innerHTML = 'ТЕКУЩИЙ СЧЕТ:  '+ result +'';
	}

function funcOne() {
	overlay.style.display = 'none';
	result += 1;
	perepis();
}

function funcTwo() {
	overlay.style.display = 'none';
	result += 11;
	perepis();
}

var res = document.querySelector('h1');
	res.innerHTML = 'ТЕКУЩИЙ СЧЕТ:  '+ result +'';

