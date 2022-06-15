
const params = { // rather than a config file
    height: 6,
    length: 7,
    playerTurn: 1,
    currentPlayer: 'X', 
    gameState: true,
    pcPlayer: true,
    winner:null
}

const pcPlayer = (boolean) => { // allows a user to switch between single and multiplayer
    params.pcPlayer = boolean
} // pcPlayer()
    
const board = Array(params.height) // board can be dynamically sized for the future challenges
    .fill()
    .map(() => Array(params.length).fill(0))
// console.table(board);

const drawBoard = (inputBoard=board) => {

    let asciiBoard = []

    inputBoard.forEach((e) => { // creates an ascii representation of the 2d Array 'board'
        e.forEach((f) => {
            if (f === 0){
                asciiBoard.push(`|_|`)
            }
            else {
                let turn = ''
                if (f === 1){
                    turn = 'x'
                } else {
                    turn = 'o'
                }
                asciiBoard.push(`|${turn}|`)
            }
            
        })
    }) // create ascii board

    for(let i = 7; i <= asciiBoard.length; i+=params.length){
        console.log(asciiBoard.slice((i-7), i).join('')) // since asciiBoard is a single dimension array, to be represented in the console, its rows must be split.
    } // log board

} // drawBoard()

const gameBoard = () => {
    drawBoard()
}

const checkWin = (index, inputBoard=board) => {

    function winMsg(){
        console.log(`%c${params.currentPlayer} WINS!`, "color:orange; font-family:sans-serif")
        params.winner = params.currentPlayer
        params.gameState = false
    } // winMsg()

    // ROWS
    // There are 4 combinations for an array of length 4 given 7 columns
    for (let row = 0; row < 4; row++){ 
        let snippet = inputBoard[index[0]].slice(row, (row + 4)) 
        let snippetSum = snippet.reduce((partialSum, a) => partialSum + a, 0)

        if ((snippetSum * params.playerTurn) === 4){
            winMsg()
            return 'winner'
        }
    }

    // COLS
    // There are 3 combinations for an array of length 4 given 6 rows
    for (let col = 0; col < 3; col++){
        let snippet = []
        for (let i = col; i < (col + 4); i++){
            snippet.push(inputBoard[i][index[1]])
        }
        let snippetSum = snippet.reduce((partialSum, a) => partialSum + a, 0)
        
        if ((snippetSum * params.playerTurn) === 4){
            winMsg()
            return 'winner'
        }
    }

    // DIAG 
    /**
     * Not too elegant of a solution. However, there are 2 sets (topLeft and bottomLeft) 
     * of 3 possible diagonal combinations per row with 3 rows to test. 
     * A possible future change would be to test only the diagonals that cross through 
     * the index of the most current move.
     */
    for (let i = 0; i < 3; i++){ 
        for(let j = 0; j < 3; j++){
            // L
            let currLeftTotal = inputBoard[j][i] + inputBoard[j + 1][i + 1] + inputBoard[j + 2][i + 2] + inputBoard[j + 3][i + 3]

            if ((currLeftTotal * params.playerTurn) === 4){
                winMsg()
                return 'winner'
            }
            // R
            let currRightTotal = inputBoard[j][i + 3] + inputBoard[j + 1][i + 2] + inputBoard[j + 2][i + 1] + inputBoard[j + 3][i]

            if ((currRightTotal * params.playerTurn) === 4){
                winMsg()
                return 'winner'
            }
        }
    }

    return 'no-winner'
} // checkWin()

const play = (col, inputBoard=board) => {
    if (params.gameState){ // if game ongoing
        for (let i = inputBoard.length - 1; i >= 0; i--){
            if (params.gameState){
                if (inputBoard[i][col] === 0){
                    inputBoard[i][col] = params.playerTurn;
                    // console.table(board);
                    drawBoard()
                    console.log(`%cYou placed in column ${col}`, "color:slateblue; font:sans-serif");
                    checkWin([i,col])
                    params.playerTurn = params.playerTurn * -1
                    if (params.playerTurn === 1){
                        params.currentPlayer = 'X'
                    } else {
                        params.currentPlayer = 'O'
                    }
                    break;
                }

                if (col > 6){
                    console.warn(`Sorry ${col} is an invalid column number. Please input a value between 0 and 6`);
                    return 'invalid-move'
                } else if (inputBoard[0][col] !== 0){
                    console.warn(`Sorry! This column (${col}) is full!`);
                    
                    if (params.pcPlayer === true && params.playerTurn === -1){
                        pcPlay()
                    }

                    return 'invalid-move';
                }
            }
        }
        if (params.gameState){
            console.log(`%cPlayer ${params.currentPlayer} make your move`, "color:lightgreen");
        }
    } else { // if game complete
        console.log(`Sorry, the game is complete. ${params.winner} won!`)   
    }

    if (params.pcPlayer && (params.playerTurn === -1) && params.gameState){ 
        pcPlay()
    }
} // play()

const pcPlay = () => {
    let pcChoice = Math.floor(Math.random() * 7)
    console.log('%cCalculating best move...', "color:red; font-family:monaco, monospace")
    console.log(`PC played column ${pcChoice}`)
    play(pcChoice)
    return 'pc-play'
} // pcPlay()

module.exports = {
    play,
    checkWin,
    pcPlay
}