function card() {
        // выбор еденицы при выпадании туза
    this.aceOne = function() {
        overlay.style.display = 'none';
        result += 1;
        world.scoreEntry();
        stop.style.display = 'inline-block';
    };
            // выбор одинадцати при выпадании
    this.aceEleven = function() {
        overlay.style.display = 'none';
        result += 11;
        world.scoreEntry();
        stop.style.display = 'inline-block';
    };
            // метод выброса карты из колоды
    this.take = function() {
        // выбираем рандомную карту из массива всех карт
        const arr = document.querySelectorAll('.item');
        function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
        }
        const number = getRandomInt(0,36);
            // если выпал туз открыть модалку
        if (arr[number].innerHTML.indexOf(14) !== -1) {
            stop.style.display = 'none';
            overlay.style.display = 'block';
            onetus.addEventListener('click', card.aceOne);
            twotus.addEventListener('click', card.aceEleven);
        }
            // запись номинала карты в текущий счет
        switch(true) {
            case arr[number].innerHTML.indexOf(6)  !== -1: result += 6; world.scoreEntry();break;
            case arr[number].innerHTML.indexOf(7)  !== -1: result += 7; world.scoreEntry();break;
            case arr[number].innerHTML.indexOf(8)  !== -1: result += 8; world.scoreEntry();break;
            case arr[number].innerHTML.indexOf(9)  !== -1: result += 9; world.scoreEntry();break;
            case arr[number].innerHTML.indexOf(10) !== -1: result += 10; world.scoreEntry();break;
            case arr[number].innerHTML.indexOf(11) !== -1: result += 2; world.scoreEntry();break;
            case arr[number].innerHTML.indexOf(12) !== -1: result += 3; world.scoreEntry();break;
            case arr[number].innerHTML.indexOf(13) !== -1: result += 4; world.scoreEntry();break;
        }
        arr[number].classList.remove('item');
        arr[number].classList.add('item-grab');
        arr[number].style.top = '100px';
        arr[number].style.borderRadius = '5px';
        arr[number].style.color = 'black';
        arr[number].style.backgroundImage = 'url(img/two.jpg)';
    };
}; // END OBJECT CARD!
