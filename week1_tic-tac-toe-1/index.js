//Ваш код будет здесь
window.addEventListener('load', function() {

    var startBtn = document.querySelector('.startNewGame');
    var winnerMsg = document.querySelector('.winner-message');
    var allCells = document.querySelectorAll('.cell');
    var fieldParent = document.querySelector('.field');
    var previousSymbol;

    startBtn.addEventListener('click', prepareGameSession);

    function prepareGameSession() {
        winnerMsg.innerHTML = "";
        prepareGame();
        previousSymbol = 'o';
    }

    function prepareGame(){
    for (var i = 0; i < allCells.length; i++) {
            allCells[i].classList.remove('x', 'o');
        }
    fieldParent.addEventListener('click', setSymbol);
    }

    function setSymbol(event) {
        var result;
        var currentSymbol;

        if (previousSymbol == 'o') {currentSymbol = 'x'}
        else currentSymbol = 'o';

        if ( event.target.classList.contains('x')||event.target.classList.contains('o')){
            return;
        }

        if (result) {
            gameEndClearListeners();
            return;
        }

        if (!event.target.classList.contains('field')){
            event.target.classList.add(currentSymbol);
            previousSymbol = currentSymbol;

            event.target.removeEventListener('click', setSymbol, false);//Avoided: Два раза кликаем в одно и то же поле - получаем там и крестик и нолик

        }

        result = getWinner();
        if (result) {
            if (result == 'x') (result = 'Крестик');
            else result = 'Нолик';
            winnerMsg.innerHTML = result + ' победил';
            gameEndClearListeners();
        }
    }

    function gameEndClearListeners(){
        var allCellsFields = document.querySelector('.field');
        allCellsFields.removeEventListener('click', setSymbol, false);
    }
}
)

/*
69/100. Вы делаете действия до нажатия на кнопку
75/100. Первым всегда ходит крестик. У вас возможна ситуация когда после нажатия кнопки начала игры ход будет за ноликом
81/100. Новые крестики/нолики не должны появляться после того, как кто-то победил
88/100. Два раза кликаем в одно и то же поле - получаем там и крестик и нолик. Важно - из-за CSS этого может быть и не видно. Но ошибка есть
94/100. Все почти верно. Это сообщение говорит о том что ваш код не до конца оптимален - вешать слушателя на каждую ячейку - плохая идея. Может вспомнить что события всплывают?
94/100. Один слушатель.... замечательно, но что будет если пользователь кликнет в границу поля? Вы этого не увидите, но у поля появится класс x или o
100/100.
*/