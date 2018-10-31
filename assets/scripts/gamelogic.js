const ai = require('./ai.js')
const ui = require('./ui.js')
const store = require('./store.js')

// takeAITurn() calls ai.getAIMove to calculate a move for the ai player. It then updates the board display,
// evaluates the board to see if it won, and readies the game for the human player's move if the game isn't over yet

const takeAITurn = function () {
  ui.showPlayerTurn()
  console.log('Inside of takeAITurn, currentBoard is', store.currentBoard)
  console.log('Inside of takeAITurn, aiDifficulty is', store.aiDifficulty)
  const aiMove = ai.getAIMove(store.currentBoard, store.aiDifficulty)
  console.log('Inside of takeAITurn, aiMove is', aiMove)
  store.currentBoard[aiMove] = 'o'
  ui.updateBoardDisplay(store.currentBoard)
  if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
    ui.showPlayerWin('playerTwo')
  } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'tie') {
    ui.showPlayerTie()
  } else {
    store.currentPlayer = 'playerOne'
    readyPlayerTurn()
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
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).removeEventListener('click', takeHumanTurn)
  }
  if (store.currentPlayer === 'playerOne') {
    store.currentBoard[event.srcElement.id] = 'x'
  } else if (store.currentPlayer === 'playerTwo') {
    store.currentBoard[event.srcElement.id] = 'o'
  }
  ui.updateBoardDisplay(store.currentBoard)
  if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin') {
    console.log('Player One wins!')
    ui.showPlayerWin('playerOne')
  } else if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie') {
    ui.showPlayerTie()
  } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin' && store.opponent === 'self') {
    console.log('Player Two wins!')
    ui.showPlayerWin('playerTwo')
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
}

module.exports = {
  readyPlayerTurn,
  takeAITurn,
  takeHumanTurn
}
