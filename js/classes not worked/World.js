// "окружение" главный объект игры 
function worldOne(playerName, scoreName, card, finish) {
    let count1 = 6;
    let cardleft = 30;
    let reitArr = [];
    let sravnenie1 = 0;
    let sravnenie2 = 0;
        //получение имени игрока из local-storage и запись на доску
    this.recordName = function() {
        playerName = localStorage.getItem('name');
        scoreName = document.querySelector('#scoreName');
        scoreName.innerHTML = ''+ playerName +'';
    };
        //функция изменения имени
     this.newName = function() {
        overlayName.style.display = "block";
        nameBar.addEventListener('keyup', () => {
        if (event.keyCode === 13) {
            const changeName = nameBar.value;
            localStorage.setItem('name', changeName);
            playerName = localStorage.getItem('name');
            overlayName.style.display = "none";
            }
        })
    };
        // перезапись текусчего счета (срабатывает после любого действия)
     this.scoreEntry = function() {
        const res = document.querySelector('h1');
        res.innerHTML = 'ТЕКУЩИЙ СЧЕТ:  '+ result +'';
    };
        // отрисовка карт на стол
     this.renderCards = function() {
        const bubn = {
            name: '♦',
            __proto__: card,
            color: 'red'
        };
        const cherv = {
            name: '♥',
            __proto__: card,
            color: 'red'
        };
        const crest = {
            name: '♣',
            __proto__: card,
            color: 'black'
        };
        const pick = {
            name: '♠',
            __proto__: card,
            color: 'black'
        };
        // построение айтемов (карт) на стол
        const arr1 = [bubn, cherv, crest, pick];
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 9; i++) {
            const elem = document.createElement('div');
            elem.classList.add('item');
            elem.style.backgroundColor = '#f2f2f2';
            elem.style.width = '170px';
            elem.style.height = '265px';
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
        // раздача стилей и номеров картам
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
    };
        // все карты собираем в исходное состояние (например после окончания хода) 
     this.Func2 = function() {
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
    world.scoreEntry();
    };
        // остановка хода и переход к ходу бота
     this.stopFunc = function() {
        sravnenie1 = result;
        stoped = result;
        world.Func2();
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
    bot.Bot();
    };
        // показать кто выйграл последнюю катку
     this.gameOver = function() {
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
    };
        // основные настройки игры (ограничение количества очков на доске и вывод очков за партию + начисление рейтинга)
     this.settings = function() {
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
    };

};   
// export default worldOne;
// import worldOne from './world.js';
