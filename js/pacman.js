'use strict'

const PACMAN = '😜'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: {i: 6, j:4},
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCounter--
}

function movePacman(ev) {
    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) removeGhost(nextLocation)
        else {
            gameOver('Wrong Move')
            return
        }
    }

    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) {
        updateScore(1)
        // playAudio()
        gFoodCounter--
    }
    

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        renderGhosts()
        // changeGhostsColor()
        setTimeout(()=>{
            gPacman.isSuper = false
            resetGhosts()
        }, 5000)
    }

    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)

    // checkVictory()
    if (gFoodCounter === 0) gameOver('You Win!!')
}



function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;

        default:
            return null;
    }
    return nextLocation
}

function findEmptyPos() {
    var emptyPoss = [] // [{i:0,j:0} , {i:0,j:1}]

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j]
            if (cell === EMPTY) {
                var pos = { i: i, j: j }
                emptyPoss.push(pos)
            } else {
                pos = null
            }
        }
    }
    var randIdx = getRandomIntInclusive(0, emptyPoss.length-1)
    var emptyPos = emptyPoss[randIdx]
    return emptyPos
}

function playAudio() {
	const audioRight = new Audio('audio/collected.mp3')
	audioRight.play()
}