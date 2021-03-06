// checkWin recieves array with two defined values 
// play() receives a value between 0 and 6
// leftDiagonal validates win correctly
// rightDiagonal validates win correctly
// row validates win correctly
// col validates win correctly
const {play, checkWin, pcPlay} = require('./connect.js')

const testBoard = [
    [-1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [-1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [-1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
]

const rowWinBoard = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,-1,0,0,0],
    [-1,1,1,1,1,0,0],
    [-1,-1,-1,1,0,0,0],
]

const colWinBoard = [
    [0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0],
    [0,0,1,-1,0,0,0],
    [0,-1,1,-1,1,0,0],
    [-1,1,1,1,-1,0,0],
    [-1,-1,-1,1,0,0,0],
]

const leftDiagonalWinBoard = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [-1,1,0,0,0,0,0],
    [1,1,1,-1,0,0,0],
    [-1,-1,-1,1,0,0,0],
]
const rightDiagonalWinBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0,0,1,-1,0,0,0],
    [0,1,-1,1,0,0,0],
    [1,-1,-1,-1,0,0,0],
    
]

test('Play throws error when input greater than 6', () => {
    expect(play(7)).toBe('invalid-move')
    expect(play(6)).not.toBe('invalid-move')
})

test('Play throws error when player tries to place in an occupied column', () => {
    expect(play(0, testBoard)).toBe('invalid-move')
    expect(play(1, testBoard)).not.toBe('invalid-move')
})

test('Win check funciton returns no-winner if no winner is found', () => {
    expect(checkWin([5,5], rowWinBoard)).toBe('no-winner')
    expect(checkWin([4,4], rowWinBoard)).not.toBe('no-winner')
})

test('A player with four in a row wins', () => {
    expect(checkWin([4,4], rowWinBoard)).toBe('winner')
})

test('A player with a column of four wins', () => {
    expect(checkWin([1,2], colWinBoard)).toBe('winner')
})

test('A player with a diagonal of four from top to bottom wins', () => {
    expect(checkWin([2,0], leftDiagonalWinBoard)).toBe('winner')
})

test('A player with a diagonal of four from bottom to top wins', () => {
    expect(checkWin([2,2], rightDiagonalWinBoard)).toBe('winner')
})

