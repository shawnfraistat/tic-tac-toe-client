const ai = require('./ai.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./store.js')

// takeAITurn() calls ai.getAIMove to calculate a move for the ai player. It then updates the board display,
// evaluates the board to see if it won, and readies the game for the human player's move if the game isn't over yet

const takeAITurn = function () {
  ui.showPlayerTurn()
  let over = false
  console.log('Inside of takeAITurn, currentBoard is', store.currentBoard)
  console.log('Inside of takeAITurn, aiDifficulty is', store.aiDifficulty)
  const aiMove = ai.getAIMove(store.currentBoard, store.aiDifficulty)
  console.log('Inside of takeAITurn, aiMove is', aiMove)
  store.currentBoard[aiMove] = 'o'
  ui.updateBoardDisplay(store.currentBoard)
  if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
    ui.showPlayerWin('playerTwo')
    over = true
  } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'tie') {
    ui.showPlayerTie()
    over = true
  } else {
    store.currentPlayer = 'playerOne'
    readyPlayerTurn()
  }
  const moveForAPI = {
    "game": {
      "cell": {
        "index": store.currentBoard[aiMove],
        "value": "o"
      },
      "over": over
    }
  }
  console.log('moveForAPI is', moveForAPI)
  if (store.user.id !== 0 && store.game.id !== 0) {
    api.updateGame(moveForAPI)
  }
}

// readyPlayerTurn() prepares the gameboard for the human player by placing
// eventListeners on available spots.

const readyPlayerTurn = function () {
  ui.showPlayerTurn()
  for (let i = 0; i < 9; i++) {
    if (document.getElementById(i).innerHTML !== '<p class="x-color">X</p>' && document.getElementById(i).innerHTML !== '<p class="o-color">O</p>') {
      document.getElementById(i).addEventListener('click', takeHumanTurn)
    }
  }
}

// takeTurnHuman() is activated when a human player clicks on a available spot.
// It updates the board and checks to see if the human won or tied. Then it lets the ai player go.

const takeHumanTurn = function (event) {
  const moveForAPI = {
    "game": {
      "cell": {
        "index": event.srcElement.id,
        "value": ""
      },
      "over": false
    }
  }
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).removeEventListener('click', takeHumanTurn)
  }
  if (store.currentPlayer === 'playerOne') {
    store.currentBoard[event.srcElement.id] = 'x'
    moveForAPI.game.cell.value = 'x'
  } else if (store.currentPlayer === 'playerTwo') {
    store.currentBoard[event.srcElement.id] = 'o'
    moveForAPI.game.cell.value = 'o'
  }
  ui.updateBoardDisplay(store.currentBoard)
  if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin') {
    console.log('Player One wins!')
    ui.showPlayerWin('playerOne')
    moveForAPI.game.over = true
  } else if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie') {
    ui.showPlayerTie()
    moveForAPI.game.over = true
  } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin' && store.opponent === 'self') {
    console.log('Player Two wins!')
    ui.showPlayerWin('playerTwo')
    moveForAPI.game.over = true
  } else {
    console.log('Next turn')
    if (store.currentPlayer === 'playerOne') {
      store.currentPlayer = 'playerTwo'
      if (store.opponent === 'ai') {
        takeAITurn()
      } else {
        readyPlayerTurn()
      }
    } else if (store.currentPlayer === 'playerTwo') {
      store.currentPlayer = 'playerOne'
      readyPlayerTurn()
    }
  }
  console.log('moveForAPI is', moveForAPI)
  if (store.user.id !== 0 && store.game.id !== 0) {
    api.updateGame(moveForAPI)
  }
}

module.exports = {
  readyPlayerTurn,
  takeAITurn,
  takeHumanTurn
}
