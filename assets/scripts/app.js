'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const ui = require('./ui.js')
const store = require('./store.js')
const events = require('./events.js')

$(() => {
  ui.updateBoardDisplay(store.currentBoard)
  $('.switch-to-sign-in').on('click', events.onSwitchToSignIn)
  $('.switch-to-sign-up').on('click', events.onSwitchToSignUp)
  $('.sign-up-submit').on('click', events.onSignUp)
  $('.sign-in-submit').on('click', events.onSignIn)
  $('#start-game-button').on('click', events.onNewGame)
})
