//Ваш код будет здесь
window.addEventListener('load', function() {

    var startBtn = document.querySelector('.startNewGame');
    var winnerMsg = document.querySelector('.winner-message');

    startBtn.addEventListener('click', prepareGameSession);
    //trialAlert.addEventListener('click',  function() {alert('Начать игру');});

    var allCells = document.querySelectorAll('.cell');
    var currentSymbol;
    //var currentSymbol = 'x';//Avoided trouble with: Первым всегда ходит крестик

    function prepareGameSession() {
        winnerMsg.innerHTML = "";
        prepareGame();
        currentSymbol = 'x';//Avoided trouble with: Первым всегда ходит крестик
    }
    //prepareGame(); //Avoided: Вы делаете действия до нажатия на кнопку
    function prepareGame(){
    for (var i = 0; i < allCells.length; i++) {
            //console.log(allCells[i]);
            allCells[i].classList.remove('x', 'o');
            allCells[i].addEventListener('click', setSymbol);
        }
    }

    function setSymbol() {
        this.classList.add(currentSymbol);
        event.stopPropagation();
        if (currentSymbol == 'x') {currentSymbol = 'o'}
        else currentSymbol = 'x';
        this.removeEventListener('click', setSymbol, false);//Avoided: Два раза кликаем в одно и то же поле - получаем там и крестик и нолик

        //filledCellRemoveListeners(); //Avoided: Два раза кликаем в одно и то же поле - получаем там и крестик и нолик

        var result = getWinner();
        if (result) {
            if (result == 'x') (result = 'Крестик');
            else result = 'Нолик';
            winnerMsg.innerHTML = result + ' победил';
            gameEndClearListeners();
        }
    }

    /*function filledCellRemoveListeners(){
        for (var i = 0; i < allCells.length; i++) {
            if (allCells[i].classList.contains('x', 'o')){
                allCells[i].removeEventListener('click', setSymbol, false);
            }
        }
    }*/

    function gameEndClearListeners(){
        for (var i = 0; i < allCells.length; i++) {
            allCells[i].removeEventListener('click', setSymbol, false);
        }
    }
}
)

/*
69/100. Вы делаете действия до нажатия на кнопку
75/100. Первым всегда ходит крестик. У вас возможна ситуация когда после нажатия кнопки начала игры ход будет за ноликом
81/100. Новые крестики/нолики не должны появляться после того, как кто-то победил
88/100. Два раза кликаем в одно и то же поле - получаем там и крестик и нолик. Важно - из-за CSS этого может быть и не видно. Но ошибка есть
94/100. Все почти верно. Это сообщение говорит о том что ваш код не до конца оптимален - вешать слушателя на каждую ячейку - плохая идея. Может вспомнить что события всплывают?
*/