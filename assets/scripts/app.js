'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const ui = require('./ui.js')
const gamelogic = require('./gamelogic.js')
const store = require('./store.js')

$(() => {
  ui.updateBoardDisplay(store.currentBoard)
  gamelogic.takeAITurn(store.currentBoard)
})
