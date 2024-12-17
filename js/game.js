'use strict'

const WALL = '🧱'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER_FOOD = '🥦'
const CHERRY = '🍒'

const gSize = 10
const gGame = {
    score: 0,
    isOn: false
}
var gBoard

var gFoodCounter

var gCherryInterval

function onInit() {
    console.log('hello')
    gGame.score = 0
    hideModal()
    gBoard = buildBoard()

    createPacman(gBoard)
    // console.log(gFoodCounter);
    createGhosts(gBoard)

    clearInterval(gCherryInterval)
    gCherryInterval = setInterval(randCherry, 15000)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    
}

function buildBoard() {

    const board = []
    gFoodCounter = 0
    for (var i = 0; i < gSize; i++) {
        board.push([])

        for (var j = 0; j < gSize; j++) {

            board[i][j] = FOOD
            gFoodCounter++


            if (i === 0 || i === gSize - 1 ||
                j === 0 || j === gSize - 1 ||
                (j === 3 && i > 4 && i < gSize - 2)) {
                board[i][j] = WALL
                gFoodCounter--

            }
            if ((i === 1 && j === 1) || (i === gSize - 2 && j === 1) || (i === 1 && j === gSize - 2) || (i === gSize - 2 && j === gSize - 2)) {
                board[i][j] = SUPER_FOOD
                gFoodCounter--

            }
        }

    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff
    // console.log('gGame.score', gGame.score)
    // console.log('gFoodCounter', gFoodCounter)
    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}


function gameOver(msg) {
    console.log('Game Over')

    showModal(msg)
	gGame.isOn = false
}

function showModal(msg) {
	var elModal = document.querySelector('.modal')
    const elMsg = elModal.querySelector('h2')

    elMsg.innerText = msg
    elModal.classList.remove('hidden')
    gGame.isOn = false
}

function hideModal() {
	var elModal = document.querySelector('.modal')
	elModal.classList.add('hidden')
}


function randCherry() {
    var pos = findEmptyPos()
    if (!pos) return
    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos, CHERRY)
}

