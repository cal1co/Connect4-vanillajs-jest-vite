
const params = {
    height: 6,
    length: 7,
    playerTurn: 1,
    currentPlayer: 'x', 
    gameState: true,
    pcPlayer: true,
    winner:null
}

const pcPlayer = (boolean) => {
    params.pcPlayer = boolean
} // pcPlayer()
    
const board = Array(params.height)
    .fill()
    .map(() => Array(params.length).fill(0))
// console.table(board);

const drawBoard = () => {

    let asciiBoard = []
    board.forEach((e) => {
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
    })
    for(let i = 7; i <= asciiBoard.length; i+=params.length){
        console.log(asciiBoard.slice((i-7), i).join(''))
    }
} // drawBoard()

const checkWin = (index, inputBoard=board) => {
    function winMsg(){
        console.log(params.currentPlayer, 'WINS!')
        params.winner = params.currentPlayer
        params.gameState = false
    }

    // ROWS
    for (let row = 0; row < 4; row++){
        let snippet = inputBoard[index[0]].slice(row, (row + 4)) 
        let snippetSum = snippet.reduce((partialSum, a) => partialSum + a, 0)

        if ((snippetSum * params.playerTurn) === 4){
            winMsg()
            return 'winner'
        }
    }

    // COLS
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

    if (params.gameState){
        for (let i = inputBoard.length - 1; i >= 0; i--){
            if (params.gameState){
                if (inputBoard[i][col] === 0){
                    inputBoard[i][col] = params.playerTurn;
                    // console.table(board);
                    drawBoard()
                    console.log('you placed in column', col);
                    checkWin([i,col])
                    params.playerTurn = params.playerTurn * -1
                    if (params.playerTurn === 1){
                        params.currentPlayer = 'x'
                    } else {
                        params.currentPlayer = 'o'
                    }
                    break;
                }
                if (col > 6){
                    console.log(`Sorry ${col} is an invalid column number. Please input a value between 0 and 6`);
                    return 'invalid-move'
                }
                else if (inputBoard[0][col] !== 0){
                    console.log(`Sorry! This column (${col}) is full!`);
                    return 'invalid-move';
                }
            }
        }
        if (params.gameState){
            console.log(`It is player ${params.currentPlayer}'s turn`);
        }
    } else {
        console.log(`Sorry, the game is complete. ${params.winner} won!`)   
    }
    if (params.pcPlayer && (params.playerTurn === -1) && params.gameState){
        pcPlay()
    }
} // play()

const pcPlay = () => {
    let pcChoice = Math.floor(Math.random() * 7)
    console.log('Calculating best move...')
    console.log(`PC played column ${pcChoice}`)
    play(pcChoice)
    return 'pc-play'
} // pcPlay()

module.exports = {
    play,
    checkWin,
    pcPlay
}