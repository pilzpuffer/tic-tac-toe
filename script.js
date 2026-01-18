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
    let gameValues = [[], 
                        [], 
                        []];
    let scores = {
        playerOne: 0,
        playerTwo: 0,
        tie: 0
    }

    let playerOneScoreDisplay = document.querySelector("#first-player .score");
    let tieScoreDisplay = document.querySelector("#tie .score");
    let playerTwoScoreDisplay = document.querySelector("#second-player .score");

    playerOneScoreDisplay.textContent = scores.playerOne;
    tieScoreDisplay.textContent = scores.tie;
    playerTwoScoreDisplay.textContent = scores.playerTwo;


    let reset = document.querySelector("#reset");
    reset.addEventListener('click', function() { 
        for (const row of gameBoard.gameValues) {
            row.length = 0;
        }
    });
    return { gameValues, scores }
}();

function player (name, shape) {
    const playerName = name;
    const chosenShape = shape;
    let movesMade = 0;

    const checkWin = function() {
        let diagonalCheckLeft = [];
        let diagonalCheckRight = [];
        let rowCheck = [];
        let columnCheck = [[], [], [], []];

        const horizontalWin = function() {
            for (const row of gameBoard.gameValues) {
                if (typeof row !== 'undefined' && row.length === 3
                    && row.every((value) => value === row[0])) {
                    console.log('meow', gameBoard.gameValues.indexOf(row));
                    console.log(`winning value is ${row[0]}`);
                    break; //will need to return winning data instead of 'break' commands (true/false, winning shape)
                } else if (row.includes('X') && row.includes('O')){
                    rowCheck.push(false);
                    console.log(rowCheck);
                }
            }
        };      

        const verticalWin = function() {
            for (i = 0; i < gameBoard.gameValues.length; i++) {
                columnCheck[i].push(gameBoard.gameValues[0][i], gameBoard.gameValues[1][i], gameBoard.gameValues[2][i])

                if ((gameBoard.gameValues[0][i] !== undefined &&
                gameBoard.gameValues[0][i] === gameBoard.gameValues[1][i] )
                && (gameBoard.gameValues[1][i] === gameBoard.gameValues[2][i])) {
                    console.log(`column number ${i} won!`);
                    break; //will need to return winning data instead of 'break' commands (true/false, winning shape) -> display a modal with 'win' message
                } else if (columnCheck[i].includes("X") && columnCheck[i].includes("O")) {
                    columnCheck[3].push(false);
                }
            }
        }

        const diagonalWin = function() {
            for (i = 0; i < gameBoard.gameValues.length; i++) {
            diagonalCheckLeft.push(gameBoard.gameValues[i][i]);
            diagonalCheckRight.push(gameBoard.gameValues[i][(gameBoard.gameValues.length-1)-i])
            }

            if (diagonalCheckLeft.every((value) => value === diagonalCheckLeft[0] && value !== undefined)) {
                console.log('wahoo!');
                //will need to return winning data instead of 'break' commands (true/false, winning shape) -> display a modal with 'win' message  
            } else if (diagonalCheckLeft.includes('X') && diagonalCheckLeft.includes('O')) {
                diagonalCheckLeft = false;
            }
            
            if (diagonalCheckRight.every((value) => value === diagonalCheckRight[0] && value !== undefined)) {
                console.log('oohaw!');
                //will need to return winning data instead of 'break' commands (true/false, winning shape) -> display a modal with 'win' message
            } else if (diagonalCheckRight.includes('X') && diagonalCheckRight.includes('O')) {
                diagonalCheckRight = false;
            }
        }
        
        const tieCheck = function() {
            if (rowCheck.length === 3 && columnCheck[3].length === 3 
            && diagonalCheckLeft === false && diagonalCheckRight === false) {
                console.log('tie!!')
            }
        }

        horizontalWin();
        verticalWin();
        diagonalWin();
        tieCheck();
    }

    const placeShape = function (row, column) {
        //will be attached to an event listener for clicks on gameBoard - once clicked, will need to check 
        //if there's a shape already placed
        //if not - track whose turn it is at the time, place shape, update gameValues
        //then - run CheckWin to see if this was the 'winning' move

        if (gameBoard.gameValues[row][column] === 'undefined') {
            gameBoard.gameValues[row][column] = chosenShape;
            checkWin();
            movesMade++;
        } else {
            //play some kind of error sound
        }
        
    }

    return {  playerName, chosenShape, placeShape, movesMade };
}

function gameFlow() {

let allCells = document.querySelectorAll(".game-cell");
    // allCells.forEach(function(cell) {
    //     cell.addEventListener('click', playerOne.placeShape(cell.dataset.row, cell.dataset.column))
    // })
                        
    //those values will need to be tied to the actual DOM elements + display update should be handled here... 
   

}

document.addEventListener('DOMContentLoaded', function() {
    let introductions = document.querySelector("#get-info");
    introductions.showModal();
})

//added for testing - will need to add a modal that will pop up on page load and ask the player for their names
let playerOne = player('Jenn', 'X');
let playerTwo = player('Rozy', 'O');