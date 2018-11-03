'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./events.js')
const ui = require('./ui.js')

// !! NEED TO ADD EVENT LISTENERS AND EVENTS TO RESET MODAL VALUES AFTER
// THE MODAL CLOSES

/* TO DO:

1. Check that AI players don't become bugged when you deploy--you'll be using a
different API, and your AI players won't exist on it

2. Handlers are missing for a lot of API actions

3. Add user view and user crap

4. Make Sign in and Sign up modals do their thing, display a confirmation
within the modal on success, and then change so that they can be dismissed

5. Have "sign up" log you in automatically

6. add id number below each game in Load Game view; display player-x and
player-o

*/

$(() => {
  $('.switch-to-sign-in').on('click', events.onSwitchToSignIn)
  $('.switch-to-sign-up').on('click', events.onSwitchToSignUp)
  $('#sign-in-submit').on('click', events.onSignIn)
  $('#sign-out-submit').on('click', events.onSignOut)
  $('#sign-up-submit').on('click', events.onSignUp)
  $('#sign-up-continue').on('click', events.onSignUpContinue)
  $('#start-game-button').on('click', events.onNewGame)
  $('#load-game-nav-button').on('click', events.onLoadView)
  $('#opponent-self-radio').on('click', ui.toggleAIDifficultyRadios)
  $('#opponent-ai-radio').on('click', ui.toggleAIDifficultyRadios)
  $('#previous-load-page-arrow').on('click', ui.displayPreviousLoadPage)
  $('#next-load-page-arrow').on('click', ui.displayNextLoadPage)
  $('#load-game-submit').on('click', events.onLoadGame)
  $('#logInModal').on('show.bs.modal', ui.resetLogInModal)
})
