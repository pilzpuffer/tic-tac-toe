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

    let movesMade = 0;

    let playerOneScoreDisplay = document.querySelector("#first-player .score");
    let tieScoreDisplay = document.querySelector("#tie .score");
    let playerTwoScoreDisplay = document.querySelector("#second-player .score");

    playerOneScoreDisplay.textContent = scores.playerOne;
    tieScoreDisplay.textContent = scores.tie;
    playerTwoScoreDisplay.textContent = scores.playerTwo;

    let allGameCells = document.querySelectorAll('.game-cell');

    let reset = document.querySelector("#reset");
    reset.addEventListener('click', function() { 
        for (const row of gameBoard.gameValues) {
            row.length = 0;
        }

        allGameCells.forEach(function(cell) {
            cell.replaceChildren();
        })
    });
    return { gameValues, scores, playerOneScoreDisplay, playerTwoScoreDisplay, tieScoreDisplay, movesMade}
}();

function player (name, shape) {
    const playerName = name;
    const chosenShape = shape;

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
                     //will need to return winning data instead of 'break' commands (true/false, winning shape)
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
                     //will need to return winning data instead of 'break' commands (true/false, winning shape) -> display a modal with 'win' message
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
                gameBoard.scores.playerOne++;
                gameBoard.playerOneScoreDisplay.textContent = gameBoard.scores.playerOne;
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
        

        if (!gameBoard.gameValues[row][column] || gameBoard.gameValues[row][column] === 'undefined') {
            gameBoard.gameValues[row][column] = chosenShape;
            checkWin();
            gameBoard.movesMade++;

        } else {
            console.log('there`s some kind of issue here...')
            //play an error sign maybe
        }
        
    }

    return {  playerName, chosenShape, placeShape };
}

let playerOne = player('Jenn', 'X');
let playerTwo = player('Rozy', 'O');


const gameFlow = function () {
    //player creation AND current player tracking should be managed here

    let allCells = document.querySelectorAll(".game-cell");
    allCells.forEach(function(cell) {
        cell.addEventListener('click', function (event) {
            if (cell.childNodes.length === 0) {
                let currentPlayer = gameBoard.movesMade % 2 === 0 ? playerOne : playerTwo;
                
                if (currentPlayer === playerOne) {
                    playerOne.placeShape(cell.dataset.row, cell.dataset.column);
                    let shapeX = document.createElement("img");
                    shapeX.setAttribute("src", './image-assets/cross.svg');
                    shapeX.classList.add("placeX");
                    cell.appendChild(shapeX);
                    playerOne.movesMade++;
                } else if (currentPlayer === playerTwo){
                    playerTwo.placeShape(cell.dataset.row, cell.dataset.column);
                    let shapeO = document.createElement("img");
                    shapeO.setAttribute("src", './image-assets/circle.svg');
                    shapeO.classList.add("placeO");
                    cell.appendChild(shapeO);
                    playerTwo.movesMade++;
                }
            }
        } )
      
    })
                        
    //those values will need to be tied to the actual DOM elements + display update should be handled here... 
   

}();

// document.addEventListener('DOMContentLoaded', function() {
//     let introductions = document.querySelector("#get-info");
//     introductions.showModal();
// })

//added for testing - will need to add a modal that will pop up on page load and ask the player for their names

//add an event listener for shape selectors in the initial player creation modal - disable the same kind of shape
//from the diffenent optgroup