// объект бота
function bot() {
        // ход бота
    this.Bot = function() {
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
                    case resOne >= 19: alert('бот набрал '+ resOne +'');bot.writeBot();
                    world.gameOver();
                    world.Func2();
                    deleteButtons.style.display = "block";
                    botstep.style.display = "none";
                    break;
                    case resOne === 21: alert('бот набрал 21!');bot.writeBot();
                    world.gameOver();
                    world.Func2();
                    deleteButtons.style.display = "block";
                    botstep.style.display = "none";
                    break;
                }
            }, 700)
        }
    };
        // запись очков бота на доску 
    this.writeBot = function() {
        stoped = result;
        const botColumn = document.querySelector('.col-two');
        const elemscore = document.createElement('h3');
        elemscore.classList.add('item-score');
        elemscore.innerHTML = ''+ stoped +'';
        botColumn.appendChild(elemscore);
    };

};