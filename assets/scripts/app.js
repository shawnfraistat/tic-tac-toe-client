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

1. Have load game view display games ordered by id number--should be possible to
accomplish this by sorting games array before committing it to store.js DONE

2. have games in load game view highlight on hover DONE

3. when trying to load a game, have confirmation modal

4. There might be a bug that occurs if players start a new game, _then_ sign in--
it might try to update on the API, but the game won't exist

5. Add ai players to API database

6. Add logic that checks for AI players and loads them in when loading a game

7. Check that this doesn't become bugged when you deploy--you'll be using a
different API, and your AI players won't exist on it

7. Add logic that figures out whose turn it is when loading a game

8. Handlers are missing for a lot of API actions

9. Add user view and user crap

10. color the letters on the load view boards DONE

11. Make Sign in and Sign up modals do their thing, display a confirmation
within the modal on success, and then change so that they can be dismissed

*/

$(() => {
  $('.switch-to-sign-in').on('click', events.onSwitchToSignIn)
  $('.switch-to-sign-up').on('click', events.onSwitchToSignUp)
  $('#sign-in-submit').on('click', events.onSignIn)
  $('#sign-out-submit').on('click', events.onSignOut)
  $('#start-game-button').on('click', events.onNewGame)
  $('#load-game-nav-button').on('click', events.onLoadView)
  $('#opponent-self-radio').on('click', ui.toggleAIDifficultyRadios)
  $('#opponent-ai-radio').on('click', ui.toggleAIDifficultyRadios)
  $('#previous-load-page-arrow').on('click', ui.displayPreviousLoadPage)
  $('#next-load-page-arrow').on('click', ui.displayNextLoadPage)
})
