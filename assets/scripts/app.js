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

2. When the user is logged in, show their email somewhere? Like, "Logged in as"?

4. Check what happens on mobile?

5. Fix bug where sign in after sign up fails if user has already done it once

6. Weird bug where sign-in attempt lags, and seems to go through, but doesn't actually (at least, the nav buttons don't update)

7. Save game button doesn't appear if you log-in while you have a game in progress

8. Have a fail safe that prevents player from joining a multiplayer game no longer in progress? Possible?
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
  $('.switch-to-sign-in').on('click', events.onSwitchToSignIn)
  $('.switch-to-sign-up').on('click', events.onSwitchToSignUp)
  $('#sign-in-submit').on('click', events.onSignIn)
  $('#sign-out-submit').on('click', events.onSignOut)
  $('#sign-up-submit').on('click', events.onSignUp)
  $('#sign-up-continue').on('click', events.onSignUpContinue)
  $('#start-game-button').on('click', events.onNewGame)
  $('#user-view-done').on('click', ui.clearForms)
  $('#userViewModal').on('show.bs.modal', ui.showUserView)
  $('#x-color-picker').on('input', events.onUpdateXColorValue)
})
