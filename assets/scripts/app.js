'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const ai = require('./ai.js')
const ui = require('./ui.js')

const currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const difficultySetting = 2
const aiMark = 'x'

// takeAITurn() calls ai.getAIMove to calculate a move for the ai player. It then updates the board display,
// evaluates the board to see if it won, and readies the game for the human player's move if the game isn't over yet

const takeAITurn = function () {
  console.log('Inside of takeAITurn, currentBoard is', currentBoard)
  const aiMove = ai.getAIMove(currentBoard, difficultySetting)
  console.log('Inside of takeAITurn, aiMove is', aiMove)
  currentBoard[aiMove] = aiMark
  ui.updateBoardDisplay(currentBoard)
  if (ai.terminalCheck(currentBoard, 'ai') === 'aiwin') {
    console.log('You lose!')
  } else if (ai.terminalCheck(currentBoard, 'ai') === 'tie') {
    console.log('Tie!')
  } else {
    readyPlayerTurn()
  }
}

// readyPlayerTurn() prepares the gameboard for the human player by placing
// eventListeners on available spots.

const readyPlayerTurn = function () {
  for (let i = 0; i < 9; i++) {
    if (document.getElementById(i).innerHTML !== '<p class="red">X</p>' && document.getElementById(i).innerHTML !== '<p class="blue">O</p>') {
      document.getElementById(i).addEventListener('click', takeHumanTurn)
    }
  }
}

// takeTurnHuman() is activated when a human player clicks on a available spot.
// It updates the board and checks to see if the human won or tied. Then it lets the ai player go.

const takeHumanTurn = function (event) {
  currentBoard[event.srcElement.id] = 'o'
  console.log(currentBoard)
  ui.updateBoardDisplay(currentBoard)
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).removeEventListener('click', takeHumanTurn)
  }
  if (ai.terminalCheck(currentBoard, 'human') === 'humanwin') {
    console.log('You win!')
  } else if (ai.terminalCheck(currentBoard, 'human') === 'tie') {
    console.log('Tie!')
  } else {
    console.log('Next turn for AI')
    takeAITurn()
  }
}

$(() => {
  ui.updateBoardDisplay(currentBoard)
  takeAITurn(currentBoard)
})
