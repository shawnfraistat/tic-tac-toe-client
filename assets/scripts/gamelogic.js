const ai = require('./ai.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./store.js')

// takeAITurn() calls ai.getAIMove to calculate a move for the ai player. It then updates the board display,
// evaluates the board to see if it won, and readies the game for the human player's move if the game isn't over yet

const takeAITurn = function () {
  ui.showPlayerTurn()
  const aiMove = ai.getAIMove(store.currentBoard, store.aiDifficulty)
  store.currentBoard[aiMove] = 'o'
  ui.updateBoardDisplay(store.currentBoard)
  if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
    ui.showPlayerWin('playerTwo')
    for (let i = 0; i < 9; i++) {
      document.getElementById(i).removeEventListener('click', takeHumanTurn)
    }
  } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'tie') {
    ui.showPlayerTie()
    for (let i = 0; i < 9; i++) {
      document.getElementById(i).removeEventListener('click', takeHumanTurn)
    }
  } else {
    store.currentPlayer = 'playerOne'
    readyPlayerTurn()
  }
}

// readyPlayerTurn() prepares the gameboard for the human player by placing
// eventListeners on available spots.

const readyPlayerTurn = function () {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).removeEventListener('click', takeHumanTurn)
  }
  ui.showPlayerTurn()
  for (let i = 0; i < 9; i++) {
    if (document.getElementById(i).innerHTML !== `<p style="color:${store.xColor}">X</p>` && document.getElementById(i).innerHTML !== `<p style="color:${store.oColor}">O</p>`) {
      document.getElementById(i).addEventListener('click', takeHumanTurn)
    }
  }
}

// takeTurnHuman() is activated when a human player clicks on a available spot.
// It updates the board and checks to see if the human won or tied. Then it lets the ai player go.

const takeHumanTurn = function (event) {
  let flipPlayer = false
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).removeEventListener('click', takeHumanTurn)
  }
  const moveForAPI = {
    "game": {
      "cell": {
        "index": event.srcElement.id,
        "value": ""
      },
      "over": false
    }
  }
  if (store.currentPlayer === 'playerOne') {
    store.currentBoard[event.srcElement.id] = 'x'
    moveForAPI.game.cell.value = 'x'
  } else if (store.currentPlayer === 'playerTwo') {
    store.currentBoard[event.srcElement.id] = 'o'
    moveForAPI.game.cell.value = 'o'
  }
  ui.updateBoardDisplay()
  if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin') {
    ui.showPlayerWin('playerOne')
    moveForAPI.game.over = true
  } else if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie') {
    ui.showPlayerTie()
    moveForAPI.game.over = true
  } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin' && store.opponent === 'self') {
    ui.showPlayerWin('playerTwo')
    moveForAPI.game.over = true
  } else {
    // first case: if player one just went, and there's no player two, 'cause the human is playing self
    if (store.currentPlayer === 'playerOne' && store.opponent === 'self') {
      flipPlayer = true
    // second case: player one just went, and player two is an AI
    } else if (store.opponent === 'ai') {
      store.currentPlayer = 'playerTwo'
      takeAITurn()
    // third case: player is playing against someone online, so push his/her move to the API
    } else if (store.opponent === 'multiplayer') {
      console.log('I think the first player is playing vs. another human online')
      console.log('moveForAPI is', moveForAPI)
      api.updateGameASync(moveForAPI)
      if (store.currentPlayer === 'playerOne') {
        store.currentPlayer = 'playerTwo'
      } else {
        store.currentPlayer = 'playerOne'
      }
    }
    if (store.currentPlayer === 'playerTwo' && store.opponent === 'self') {
      flipPlayer = true
    }
  }
  if (flipPlayer === true) {
    if (store.currentPlayer === 'playerOne') {
      store.currentPlayer = 'playerTwo'
    } else {
      store.currentPlayer = 'playerOne'
    }
    readyPlayerTurn()
  }
}

module.exports = {
  readyPlayerTurn,
  takeAITurn,
  takeHumanTurn
}
