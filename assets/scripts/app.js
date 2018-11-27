'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./events.js')
const ui = require('./ui.js')

/* TO DO:

1. Handlers are missing for some API actions -- really, for FAILURES
 -- SPECIFICALLY, need to deal with situation in which a game fails to LOAD

2. Weird bug where sign-in attempt lags, and seems to go through, but doesn't actually (at least, the nav buttons don't update)

3. Fix issue where multiplayer button optiuon appears even if user is not logged in

4. Fix bug where host can save multiplayer game (possibly only if host has already created game?)

*/

$(() => {
  $('#change-password-submit').on('click', events.onChangePasswordSubmit)
  $('#confirm-new-colors').on('click', events.onConfirmNewColors)
  $('#load-game-nav-button').on('click', events.onLoadView)
  $('#load-game-submit').on('click', events.onLoadGame)
  $('#logInModal').on('show.bs.modal', ui.resetLogInModal)
  $('#newGameModal').on('show.bs.modal', ui.showNewGameModal)
  $('#next-load-page-arrow').on('click', ui.displayNextLoadPage)
  $('#o-color-picker').on('input', events.onUpdateOColorValue)
  $('#opponent-ai-radio').on('click', ui.aiRadios)
  $('#opponent-multiplayer-radio').on('click', ui.multiplayerRadios)
  $('#opponent-self-radio').on('click', ui.selfRadios)
  $('#previous-load-page-arrow').on('click', ui.displayPreviousLoadPage)
  $('#saveGameModal').on('show.bs.modal', ui.showSaveGameModel)
  $('#save-game-nav-button').on('click', events.onSaveGameNavButton)
  $('#save-game-submit').on('click', events.onSaveGame)
  $('#sign-in-submit').on('click', events.onSignIn)
  $('#sign-out-submit').on('click', events.onSignOut)
  $('#sign-up-submit').on('click', events.onSignUp)
  $('#sign-up-continue').on('click', events.onSignUpContinue)
  $('#start-game-button').on('click', events.onNewGame)
  $('.switch-to-sign-in').on('click', events.onSwitchToSignIn)
  $('.switch-to-sign-up').on('click', events.onSwitchToSignUp)
  $('#user-view-done').on('click', ui.clearForms)
  $('#userViewModal').on('show.bs.modal', ui.showUserView)
  $('#x-color-picker').on('input', events.onUpdateXColorValue)
})
