'use strict'

const GHOST = '&#9781'
var gGhosts

var gGhostsInterval

var gGhostRemoved = []

function createGhosts(board) {
    gGhosts = []
    // TODO: Create 3 ghosts and an interval
    for(var i = 0; i < 3; i++){
        createGhost(gBoard)
    }
    clearInterval(gGhostsInterval)
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = {
        location: {i: 2, j:3},
        currCellContent: FOOD,
        color: getRandomColor()
    }
    
    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost)

    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // TODO: loop through ghosts
    for(var i = 0; i < gGhosts.length; i++){
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // console.log('ghost' ,ghost)
    // TODO: figure out moveDiff, nextLocation, nextCell
    const diff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + diff.i,
        j: ghost.location.j + diff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if(gPacman.isSuper || !gGame.isOn) return
        gameOver('Youre Busted')
        return
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    
    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    
    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0,  j: 1  }
        case 2: return { i: 1,  j: 0  }
        case 3: return { i: 0,  j: -1 }
        case 4: return { i: -1, j: 0  }
    }
}

function getGhostHTML(ghost) {
    if(gPacman.isSuper) return `<span style="color: darkblue;">${GHOST}</span>`
    return `<span style="color: ${ghost.color};">${GHOST}</span>`
}

// function changeGhostsColor(){
//     for(var i=0; i<gGhosts.length; i++){
//         var curColor = gGhosts[i].color
//         gGhosts[i].color = 'darkblue'
//     }
//     return curColor
// }

function removeGhost(pos){
    for(var i=0; i<gGhosts.length; i++){
        console.log( gGhosts[i].location)
        // console.log('pos', pos)
        if( gGhosts[i].location.i === pos.i && gGhosts[i].location.j === pos.j){
            var ghost = gGhosts.splice(i, 1)[0]
            gGhostRemoved.push(ghost)
        } 
    }   
}

function renderGhosts() {
    for(var i = 0; i < gGhosts.length; i++){
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
}

function resetGhosts(){
    console.log('gGhostRemoved',gGhostRemoved)
    
    if (gGhostRemoved.length) {
        for (var i = 0; i < gGhostRemoved.length; i++) {
            gGhosts.push(gGhostRemoved[i])
        }
    }
    gGhostRemoved = []
    renderGhosts()
}

