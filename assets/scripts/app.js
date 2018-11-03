'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./events.js')
const ui = require('./ui.js')

/* TO DO:

1. Check that AI players don't become bugged when you deploy--you'll be using a
different API, and your AI players won't exist on it

2. Handlers are missing for a lot of API actions -- really, for FAILURES

5. When the user is logged in, show their email somewhere? Like, "Logged in as"?

7. Multiplayer? God help me?

8. Sound?

9. Let user pick colors?

10. Check what happens on mobile?

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
  $('#userViewModal').on('show.bs.modal', ui.showUserView)
  $('#user-view-done').on('click', ui.clearForms)
  $('#change-password-submit').on('click', events.onChangePasswordSubmit)
  $('#confirm-new-colors').on('click', events.onConfirmNewColors)
  $('#o-color-picker').on('input', events.onUpdateOColorValue)
  $('#x-color-picker').on('input', events.onUpdateXColorValue)
})
