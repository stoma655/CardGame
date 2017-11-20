// control
var card = {
	width: '170px',
	height: '250px',
	background: '#888'
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

var items = document.querySelectorAll('.item h5');
for (var i = 0; i < items.length; i++) {
	switch(true) {
		case items[i].innerHTML.indexOf(11) !== -1: items[i].innerHTML += '<br> валет';
		break;
		case items[i].innerHTML.indexOf(12) !== -1: items[i].innerHTML += '<br> дама';
		break;
		case items[i].innerHTML.indexOf(13) !== -1: items[i].innerHTML += '<br> король';
		break;
		case items[i].innerHTML.indexOf(14) !== -1: items[i].innerHTML += '<br> туз';
		break;
	}
}


var downcard1 = document.querySelector('.downcard');
downcard1.addEventListener('click', Func);

var perm = document.querySelector('.perm');
perm.addEventListener('click', Func2);

function Func() {
	var arr = document.querySelectorAll('.item');
	function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
	}
	var number = getRandomInt(0,36);
	arr[number].style.top = '100px';
	arr[number].style.color = 'black';
}

function Func2() {
	var arr = document.querySelectorAll('.item');
	for (var i = 0; i < arr.length; i++) {
		arr[i].style.color = 'transparent';
		arr[i].style.top = '8px';
	}
	

	
}



