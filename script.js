/*
winning scenarios: 

[x x x] -> 3 in a row, horizontal victory

[x null null]   [null x null]   [null null x]                           [1][1][1]
[x null null]   [null x null]   [null null x]  -> vertical victories    [2][2][2]
[x null null]   [null x null]   [null null x]                           [3][3][3]

[x null null]    [null null x]                              [1][2][3]
[null x null]    [null x null]  -> diagonal victories           
[null null x]    [x null null]                              [3][2][1]
*/

const gameBoard = function (){
    let fullGameBoard = [['x', null, null], 
                        [null, 'x', null], 
                        [null, null, 'x']];
    return { fullGameBoard }
}();

function gameFlow() {

    const checkWin = function() {
        //check for horizontal wins
        for (const row of gameBoard.fullGameBoard) {
            if (row.every((value) => value === row[0])) {
                console.log('meow', gameBoard.fullGameBoard.indexOf(row));
                console.log(`winning value is ${row[0]}`);
                break;
            } else {
                console.log('woof', gameBoard.fullGameBoard.indexOf(row)); //can be removed later, added just for logging
            }
        }

        //check for vertical wins
        for (i = 0; i < gameBoard.fullGameBoard.length; i++) {
            if ((gameBoard.fullGameBoard[0][i] === gameBoard.fullGameBoard[1][i] )
                && (gameBoard.fullGameBoard[1][i] === gameBoard.fullGameBoard[2][i])) {
                    console.log(`column number ${i} won!`);
                    break;
                }
        }
    }

    return { checkWin } //temp measure, later will be done within gameflow
}

function player (name, shape) {
    const playerName = name || `Player ${shape}`;
    const chosenShape = shape;

    return {  playerName, chosenShape  };
}