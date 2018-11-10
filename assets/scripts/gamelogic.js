// gamelogic.js

const ai = require('./ai.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./store.js')

// flipCurrentPlayer() flips who the currentPlayer is and updates it in store.js
const flipCurrentPlayer = function () {
  if (store.currentPlayer === 'playerOne') {
    store.currentPlayer = 'playerTwo'
  } else {
    store.currentPlayer = 'playerOne'
  }
}

// makeBoardUnclickable() removes eventlisteners from board divs so human players can't keep clicking
const makeBoardUnclickable = function () {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).removeEventListener('click', takeHumanTurn)
  }
}

// readyPlayerTurn() prepares the gameboard for the human player by placing
// eventListeners on available spots.
const readyPlayerTurn = function () {
  ui.showPlayerTurn()
  for (let i = 0; i < 9; i++) {
    if (document.getElementById(i).innerHTML !== `<p style="color:${store.xColor}">X</p>` && document.getElementById(i).innerHTML !== `<p style="color:${store.oColor}">O</p>`) {
      document.getElementById(i).addEventListener('click', takeHumanTurn)
    }
  }
}

// takeAITurn() calls ai.getAIMove to calculate a move for the ai player. It then updates the board display,
// evaluates the board to see if it won, and readies the game for the human player's move if the game isn't over yet
const takeAITurn = function () {
  const aiMove = ai.getAIMove(store.currentBoard, store.aiDifficulty)
  store.currentBoard[aiMove] = 'o'
  setTimeout(function () { ui.displayNewMove(aiMove) }, 100)
  setTimeout(function () {
    if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
      ui.showPlayerWin('playerTwo')
      makeBoardUnclickable()
    } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'tie') {
      ui.showPlayerTie()
      makeBoardUnclickable()
    } else {
      flipCurrentPlayer()
      readyPlayerTurn()
    }
  }, 300)
}

// takeHumanTurn() is activated when a human player clicks on a available spot.
// It updates the board and checks to see if the human won or tied. Then it lets the ai player go.
const takeHumanTurn = function (event) {
  // if the human clicked, disable the event listeners so they can't click again
  makeBoardUnclickable()
  // if this is a multiplayer game, jump to the multiplayer game logic; otherwise continue in this function
  if (store.opponent === 'multiplayer') {
    takeMultiplayerTurn(event.srcElement.id)
  } else {
    // check to see which player the human clicker was and update the local version of the board in store.js
    if (store.currentPlayer === 'playerOne') {
      store.currentBoard[event.srcElement.id] = 'x'
    } else if (store.currentPlayer === 'playerTwo') {
      store.currentBoard[event.srcElement.id] = 'o'
    }
    ui.displayNewMove(event.srcElement.id)
    // check to see if the move just played endede the game
    if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin') {
      ui.showPlayerWin('playerOne')
    } else if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie') {
      ui.showPlayerTie()
    } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
      ui.showPlayerWin('playerTwo')
    // assuming the game is continuing, do one of the following things:
    } else {
      // first case: if the opponent is self, flip the currentPlayer and ready the game board for the next turn
      if (store.opponent === 'self') {
        flipCurrentPlayer()
        readyPlayerTurn()
      // second case: player one just went, and player two is an AI--take the AI's turn
      } else if (store.opponent === 'ai') {
        flipCurrentPlayer()
        ui.showPlayerTurn()
        setTimeout(takeAITurn, 500)
      }
    }
  }
}

// takeMultiplayerTurn() is called from takeHumanTurn() in a multiplayer game;
// it updates store.js and the API with the new move and lets event.js take care
// of the rest
const takeMultiplayerTurn = function (index) {
  const moveForAPI = {
    game: {
      cell: {
        index: index,
        value: ''
      },
      over: false
    }
  }
  if (store.currentPlayer === 'playerOne') {
    store.currentBoard[index] = 'x'
    moveForAPI.game.cell.value = 'x'
  } else if (store.currentPlayer === 'playerTwo') {
    store.currentBoard[index] = 'o'
    moveForAPI.game.cell.value = 'o'
  }
  console.log('moveForAPI is', moveForAPI)
  api.updateGameASync(moveForAPI)
}

module.exports = {
  flipCurrentPlayer,
  readyPlayerTurn,
  takeAITurn,
  takeHumanTurn
}
