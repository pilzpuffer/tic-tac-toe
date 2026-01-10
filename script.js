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
    let fullGameBoard = [['x', 'z', 'y'], 
                        ['b', 'y', 'm'], 
                        ['y', 'k', 'x']];
    return { fullGameBoard }
}();

function gameFlow() {
    let diagonalCheckLeft = [];
    let diagonalCheckRight = [];

    const checkWin = function() {
        //check for horizontal wins
        for (const row of gameBoard.fullGameBoard) {
            if (row.every((value) => value === row[0])) {
                console.log('meow', gameBoard.fullGameBoard.indexOf(row));
                console.log(`winning value is ${row[0]}`);
                break; //will need to return winning data instead of 'break' commands (true/false, winning shape)
            } 
        }

        //check for vertical wins
        for (i = 0; i < gameBoard.fullGameBoard.length; i++) {
        
            if ((gameBoard.fullGameBoard[0][i] === gameBoard.fullGameBoard[1][i] )
                && (gameBoard.fullGameBoard[1][i] === gameBoard.fullGameBoard[2][i])) {
                    console.log(`column number ${i} won!`);
                    break; //will need to return winning data instead of 'break' commands (true/false, winning shape)
                }
        }

        //check for diagonal wins
        for (i = 0; i < gameBoard.fullGameBoard.length; i++) {
            diagonalCheckLeft.push(gameBoard.fullGameBoard[i][i]);
            diagonalCheckRight.push(gameBoard.fullGameBoard[i][2-i])
        }

        if (diagonalCheckLeft.every((value) => value === diagonalCheckLeft[0])) {
            console.log('wahoo!');
            //will need to return winning data instead of 'break' commands (true/false, winning shape)
            
        } 
        
        if (diagonalCheckRight.every((value) => value === diagonalCheckRight[0])) {
            console.log('oohaw!');
            //will need to return winning data instead of 'break' commands (true/false, winning shape)
        }

    }

    return { checkWin } //temp measure, later will be done within gameflow
}

function player (name, shape) {
    const playerName = name || `Player ${shape}`;
    const chosenShape = shape;

    return {  playerName, chosenShape  };
}