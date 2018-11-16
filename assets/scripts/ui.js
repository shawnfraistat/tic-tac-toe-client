// ui.js

/* This document is organized into the following sections:

(1) FORM rest
(2) GAME View UI functions
(3) LOAD GAME View UI functions
(4) MULTIPLAYER UI functions
(5) NEW GAME UI functions
(6) SAVE UI functions
(7) SIGN VIEW UI functions
(8) USER API Interactions */

const store = require('./store.js')

////////////////////
//                //
//  FORM  reset   //
//                //
////////////////////

// clearForms() clears form content in the sign-in/up and change password forms,
// so the form inputs are blank if the user reopens the model
const clearForms = () => {
  document.getElementById('sign-up').reset()
  $('.sign-up-message').html('<h5 class="sign-up-message"></h5>')
  document.getElementById('sign-in').reset()
  $('.sign-in-message').html('<h5 class="sign-in-message"></h5>')
  document.getElementById('change-password').reset()
  $('.change-password-message').text('')
  $('#user-name').text('')
}

//////////////////////////////
//                          //
//  GAME view UI functions  //
//                          //
//////////////////////////////

// displayNewMove() updates the display board with a new move every time a player goes
const displayNewMove = function (move) {
  if (store.currentBoard[move] === 'x') {
    document.getElementById(move).innerHTML = `<p class="show-mark" style="color:${store.xColor}">X</p>`
  } else if (store.currentBoard[move] === 'o') {
    document.getElementById(move).innerHTML = `<p class="show-mark" style="color:${store.oColor}">O</p>`
  }
}

// hideBoard() makes the gameboard invisible
const hideBoard = function () {
  $('.board-plus-message').addClass('invisible')
}

// showBoard() makes the gameboard visible (and hides the load view if it's open)
const showBoard = function () {
  $('.board-plus-message').removeClass('invisible')
  $('.load-view').addClass('invisible')
}

// showPlayerTurn() displays "Player _'s Turn" above the gameboard
const showPlayerTurn = function () {
  if (store.currentPlayer === 'playerOne') {
    $('.board-message').html(`<p><scan class="board-message-x-scan" style="color:${store.xColor}">Player One</scan>'s Turn</p>`)
  } else {
    $('.board-message').html(`<p><scan class="board-message-o-scan" style="color:${store.oColor}">Player Two</scan>'s Turn</p>`)
  }
}

// showPlayerWin() displays a message above the gameboard when a player wins
const showPlayerWin = function (player) {
  if (player === 'playerOne') {
    $('.board-message').html(`<p><scan class="board-message-x-scan" style="color:${store.xColor}">Player One</scan> Wins!</p>`)
  } else {
    $('.board-message').html(`<p><scan class="board-message-o-scan" style="color:${store.oColor}">Player Two</scan> Wins!</p>`)
  }
}

// showPlayerTie() displays a message above the game board indicating a tie
const showPlayerTie = function (player) {
  $('.board-message').html(`<p>Tie!</p>`)
}

// updateBoardDisplay() refreshes the entire gameboard; necessary when loading
// a game or changing the color of the pieces
const updateBoardDisplay = function () {
  for (let i = 0; i < 9; i++) {
    if (store.currentBoard[i] === 'x') {
      document.getElementById(i).innerHTML = `<p style="color:${store.xColor}">X</p>`
    }
    if (store.currentBoard[i] === 'o') {
      document.getElementById(i).innerHTML = `<p style="color:${store.oColor}">O</p>`
    }
    if (store.currentBoard[i] !== 'x' && store.currentBoard[i] !== 'o') {
      document.getElementById(i).innerHTML = ''
    }
  }
}

//////////////////////////////
//                          //
//  LOAD view UI functions  //
//                          //
//////////////////////////////

// displayLoadedBoard() is used to create little gameboard previews for the user
// to click on in the LOAD view
const displayLoadedBoard = (startPoint, endPoint) => {
  const data = store.user
  $('.game-list')[0].innerHTML = ''
  for (let i = startPoint; i < endPoint; i++) {
    const playerOne = `${store.user.email} (You)`
    let playerTwo
    if (data.games[i].player_o === null) {
      playerTwo = `${store.user.email} (You)`
    } else if (data.games[i].player_o.email === 'ai@easy.com') {
      playerTwo = 'AI (Easy)'
    } else if (data.games[i].player_o.email === 'ai@medium.com') {
      playerTwo = 'AI (Medium)'
    } else if (data.games[i].player_o.email === 'ai@impossible.com') {
      playerTwo = 'AI (Impossible)'
    }
    $('.game-list')[0].innerHTML += `
    <div class="load-board" dataId="${data.games[i].id}">
      <div class="load-board-minus-text">
        <div class="row">
          <div class="load-div load-div0">${data.games[i].cells[0]}</div>
          <div class="load-div load-div1">${data.games[i].cells[1]}</div>
          <div class="load-div load-div2">${data.games[i].cells[2]}</div>
        </div>
        <div class="row">
          <div class="load-div load-div3">${data.games[i].cells[3]}</div>
          <div class="load-div load-div4">${data.games[i].cells[4]}</div>
          <div class="load-div load-div5">${data.games[i].cells[5]}</div>
        </div>
        <div class="row">
          <div class="load-div load-div6">${data.games[i].cells[6]}</div>
          <div class="load-div load-div7">${data.games[i].cells[7]}</div>
          <div class="load-div load-div8">${data.games[i].cells[8]}</div>
        </div>
      </div>
        <div class="load-board-bottom-text">
          ID #: ${data.games[i].id}<br />
          <scan class="player-one-board-bottom-text" style="color:${store.xColor}">Player One</scan>: ${playerOne}<br />
          <scan class="player-two-board-bottom-text" style="color:${store.oColor}">Player Two</scan>: ${playerTwo}<br />
        </div>
      </div>`
  }
  setLoadBoardColors()
  $('.load-board').on('click', onChooseLoadGame)
}

// displayNextLoadPage() is called when the player clicks on the --> arrow  in
// the LOAD view--it loads the next set of gameboards to display. (The LOAD view
// only displays nine boards at a time.)
const displayNextLoadPage = () => {
  const data = store.user
  store.currentLoadPage++
  const startPoint = store.currentLoadPage * 9
  let endPoint = 0
  if (data.games.length - startPoint < 9) {
    endPoint = startPoint + (data.games.length - startPoint)
  } else {
    endPoint = startPoint + 9
  }
  displayLoadedBoard(startPoint, endPoint)
  updatePageArrows()
}

// displayPreviousLoadPage() is called when the player clicks on the <-- arrow
// in the LOAD view.
const displayPreviousLoadPage = () => {
  const data = store.user
  store.currentLoadPage--
  const startPoint = store.currentLoadPage * 9
  let endPoint = 0
  if (data.games.length - startPoint < 9) {
    endPoint = startPoint + (data.games.length - startPoint)
  } else {
    endPoint = startPoint + 9
  }
  displayLoadedBoard(startPoint, endPoint)
  updatePageArrows()
}

/* handleGameListSuccess() is called in the LOAD view when the program
successfully retrieves the user's saved games from the API. It displays
"No games found" if the player doesn't have any saved; alternatively, it
creates little preview boards if saved games exist. */
const handleGameListSuccess = () => {
  store.currentLoadPage = 0
  $('.game-list').html('')
  $('.board-plus-message').addClass('invisible')
  $('.load-view').removeClass('invisible')
  const data = store.user
  if (data.games.length > 0) {
    store.totalLoadPages = Math.ceil((data.games.length / 9)) - 1
  }
  if (data.games.length === 0) {
    $('.game-list').text('No games found')
  } else if (data.games.length < 9) {
    const startPoint = 0
    const endPoint = data.games.length
    displayLoadedBoard(startPoint, endPoint)
  } else if (data.games.length >= 9) {
    const startPoint = 0
    const endPoint = 9
    displayLoadedBoard(startPoint, endPoint)
  }
  updatePageArrows()
}

// handleLoadGameFailure() is called to display an error when a game fails to
// load; right now it doesn't do anything
const handleLoadGameFailure = event => {
}

// onChooseLoadGame should probably be in events.js, but I couldn't think of
// an easy way to do that without creating a circular dependency (because ui.js
// needs to bind onChooseLoadGame to .load-board in displayLoadedBoard())
const onChooseLoadGame = event => {
  event.preventDefault()
  store.currentClickEvent = event
  $('#loadConfirmModal').modal('show')
}

// setLoadBoardColors() is called in the LOAD view if the player changes the
// player mark colors; it ensures that the preview game boards have the right
// colors for the x's and o's
const setLoadBoardColors = () => {
  const loadDivs = document.getElementsByClassName('load-div')
  for (let i = 0; i < loadDivs.length; i++) {
    if (loadDivs[i].innerText === 'x') {
      loadDivs[i].innerHTML = `<p style="color:${store.xColor}">x</p>`
    } else if (loadDivs[i].innerText === 'o') {
      loadDivs[i].innerHTML = `<p style="color:${store.oColor}">o</p>`
    }
  }
}

// updateLoadGameTextColor() is called if the player changes the player mark
// colors while the load view is open--it updates the player one is so-and-so,
// player two is so-and-so text beneath each preview board
const updateLoadGameTextColor = () => {
  $('.player-one-board-bottom-text').attr('style', `color: ${store.xColor}`)
  $('.player-two-board-bottom-text').attr('style', `color: ${store.oColor}`)
}

/* updatePageArrows() is called in the LOAD view when the player has more than
nine games--they can page through their saved games by clicking on arrows
above the display boards. But only want each arrow to display when there are
more saved games to show. */
const updatePageArrows = () => {
  if (store.totalLoadPages === 0) {
    $('#previous-load-page-arrow').addClass('invisible')
    $('#next-load-page-arrow').addClass('invisible')
    $('#current-page-display').addClass('invisible')
  } else {
    $('#current-page-display').removeClass('invisible')
    $('#current-page-display').text(`(${store.currentLoadPage + 1} / ${store.totalLoadPages + 1})`)
  }
  if (store.currentLoadPage < store.totalLoadPages) {
    $('#next-load-page-arrow').removeClass('invisible')
  } else {
    $('#next-load-page-arrow').addClass('invisible')
  }
  if (store.currentLoadPage > 0) {
    $('#previous-load-page-arrow').removeClass('invisible')
  } else {
    $('#previous-load-page-arrow').addClass('invisible')
  }
}

////////////////////////////////
//                            //
//  MULTIPLAYER UI functions  //
//                            //
////////////////////////////////

// handleHostGameFailure() displays an error if the user tries to host a multiplayer
// game and the action fails (because the API returned an error)
const handleHostGameFailure = () => {
  $('.new-game-message').html(`<h5 class="sign-up-message red">Couldn't host game</h5>`)
}

// handleHostLobby() displays a message if the user successfully creates a new
// multiplayer game as the host; it displays a message informing the user that
// they need to wait for another player to join
const handleHostLobby = () => {
  $('#newGameModal').modal('hide')
  $('.board-message').html(`<p style="font-size: 24px">Game ID is ${store.game.id}. Waiting for Opponent to Join...</p>`)
  console.log(store.game.id)
}

// handleJoinGameFailure() displays an error if the user tries to join a
// multiplayer game and the action fails
const handleJoinGameFailure = () => {
  $('.new-game-message').html('<h5 class="sign-up-message red">Failed to join game</h5>')
}

//////////////////////////////////
//                              //
//  NEW GAME view UI functions  //
//                              //
//////////////////////////////////

// aiRadios() makes the AI difficulty options clickable in the NEW GAME view
// (and disables the multiplayer options)
const aiRadios = () => {
  let buttons = $('input[name="difficulty"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled')
  }
  buttons = $('input[name="multiplayer"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('disabled', 'disabled')
  }
}

/* handleCreateNewGameFailure() logs an error to the console if the program
fails when it tries to create a new game; this error handler shouldn't be
necessary, because the only time new games are created are when the user
tries to save, and that's caught by the save game error handlers, or when
the user tries to create a multiplayer game, which should be caught by the
mulitplayer error handlers. I've left it in for now in case something odd
happens I didn't anticipate. */
const handleCreateNewGameFailure = data => {
  console.log('New game failed to create!')
}

// aiRadios() makes the multiplayer options clickable in the NEW GAME view
// (and disables the AI difficulty options)
const multiplayerRadios = () => {
  let buttons = $('input[name="difficulty"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('disabled', 'disabled')
  }
  buttons = $('input[name="multiplayer"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled')
  }
}

// selfRadios disables the multiplayer and AI difficulty options in the NEW GAME
// view (because we don't want the user to be able to select an AI difficulty
// or multiplayer role if they're going to create a game playing against themselves.)
const selfRadios = () => {
  let buttons = $('input[name="difficulty"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('disabled', 'disabled')
  }
  buttons = $('input[name="multiplayer"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('disabled', 'disabled')
  }
}

// showNewGameModal() clears old messages in the new game modal
const showNewGameModal = () => {
  $('.new-game-message').html('')
}

/////////////////////////
//                     //
//  SAVE UI functions  //
//                     //
/////////////////////////

// handleSaveGameFailure() displays a message if the user tries to save a game and the action fails
const handleSaveGameFailure = () => {
  $('#saveGameModalTitle').html(`<h5 class="save-game-message red">Game failed to save.</h5>`)
}

// handleSaveGameSuccess() displays a message if the user tries to save a game and the action succeeds
const handleSaveGameSuccess = () => {
  $('#save-game-cancel').addClass('invisible')
  $('#save-game-submit').addClass('invisible')
  $('#save-game-okay').removeClass('invisible')
  $('#saveGameModalTitle').html(`<h5 class="save-game-message">Game saved as ID#<scan class="blue">${store.game.id}</scan>.</h5>`)
}

// showSaveGameModel() refreshs the save game modal
const showSaveGameModel = () => {
  $('#save-game-cancel').removeClass('invisible')
  $('#save-game-submit').removeClass('invisible')
  $('#save-game-okay').addClass('invisible')
  $('#saveGameModalTitle').html(`<h5 class="modal-title" id="saveGameModalTitle">Save Game?</h5>`)
}

////////////////////////////////////
//                                //
//  SIGN-IN/UP view UI functions  //
//                                //
////////////////////////////////////

// handleSignInSuccess() transforms the logInModal to display a confirmation that the user signed in successfully
const handleSignInSuccess = event => {
  if (store.currentBoard.includes('x') || store.currentBoard.includes('o')) {
    $('#save-game-nav-button').removeClass('invisible')
  }
  $('#logInModalHeader').addClass('invisible')
  $('.sign-in-message').html(`<h4 class="sign-in-message">Signed in as <scan class="blue">${store.user.email}</scan></h4>`)
  $('#load-game-nav-button').toggleClass('invisible')
  $('#log-in-nav-button').toggleClass('invisible')
  $('#save-warning').toggleClass('invisible')
  $('#sign-out-nav-button').toggleClass('invisible')
  $('#user-profile-nav-button').toggleClass('invisible')
  $('#sign-in').addClass('invisible')
  $('#sign-in-cancel').addClass('invisible')
  $('#sign-in-submit').addClass('invisible')
  $('#sign-in-continue').removeClass('invisible')
  $('#multiplayer-radios').removeClass('invisible')
}

// handleSignInFailure() displays an error message if a sign-in attempt fails
const handleSignInFailure = event => {
  $('.sign-in-message').html('<h5 class="sign-in-message red">Sign in failed</h5>')
}

// handleSignInAfterSignUpFailure() displays an error if the program fails when it
// tries to automatically sign a user in after a successful sign up
const handleSignInAfterSignUpFailure = event => {
  $('.sign-in-message').html('<h5 class="sign-up-message red">Sign in after sign up failed</h5>')
}

// handleSignInAfterSignUpSuccess() hides the logInModal if the program is able
// to sign the user in automatically following a successful sign up
const handleSignInAfterSignUpSuccess = event => {
  $('#logInModal').modal('hide')
}

// handleSignOutSuccess() clears local data in store.js and resets the view if
// the user successfully signs out
const handleSignOutSuccess = () => {
  $('#signOutModal').modal('hide')
  store.user.id = 0
  store.user.email = ''
  store.user.token = ''
  store.user.games = []
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  store.currentPlayer = ''
  $('.board-message').html('')
  $('#load-game-nav-button').toggleClass('invisible')
  $('#log-in-nav-button').toggleClass('invisible')
  $('#save-warning').toggleClass('invisible')
  $('#sign-out-nav-button').toggleClass('invisible')
  $('#user-profile-nav-button').toggleClass('invisible')
  $('#multiplayer-radios').addClass('invisible')
  $('#save-game-nav-button').addClass('invisible')
  document.getElementById('x-color-picker').value = '#ff0000'
  document.getElementById('o-color-picker').value = '#0000ff'
  updateBoardDisplay()
  showBoard()
}

// handleSignOutFailure() displays an error if a sign-out attempt fails
const handleSignOutFailure = event => {
  $('.sign-out-message').html('<p class="red">Failed to sign out</p>')
  console.log(event)
}

// handleSignUpSuccess() transforms the logInModal after the user successfully
// signs up to display a confirmation and get ready for automatic sign-in
const handleSignUpSuccess = event => {
  $('.sign-up-message').html(`<h4 class="sign-up-message">New account created. Logged in as <scan class="blue">${store.user.email}</scan>.</h4>`)
  $('#logInModalHeader').addClass('invisible')
  $('#load-game-nav-button').toggleClass('invisible')
  $('#log-in-nav-button').toggleClass('invisible')
  $('#save-warning').toggleClass('invisible')
  $('#sign-out-nav-button').toggleClass('invisible')
  $('#user-profile-nav-button').toggleClass('invisible')
  $('#sign-up').addClass('invisible')
  $('#sign-up-cancel').addClass('invisible')
  $('#sign-up-submit').addClass('invisible')
  $('#sign-up-continue').removeClass('invisible')
  $('#multiplayer-radios').removeClass('invisible')
}

// handleSignUpFailure() displays an error if a sign-up attempt fails
const handleSignUpFailure = event => {
  $('.sign-up-message').html('<h5 class="sign-up-message red">Sign up failed</h5>')
  console.log('Invalid sign up event', event)
}

// handleSignUpMismatchingPasswords() displays an error if, when the user tries
// to sign up, the password and password_confirmation fields don't match
const handleSignUpMismatchingPasswords = event => {
  $('.sign-up-message').html('<h5 class="sign-up-message red">Passwords do not match</h5>')
  console.log('Invalid sign up event', event)
}

// resetLogInModal() sets the sign-in/up modal back to its defaults
const resetLogInModal = () => {
  $('#logInModalHeader').removeClass('invisible')
  $('.sign-in-message').text('')
  $('.sign-up-message').text('')
  $('#sign-in-cancel').removeClass('invisible')
  $('#sign-in-submit').removeClass('invisible')
  $('#sign-in-continue').addClass('invisible')
  switchToSignIn()
}

// switchToSignIn() transforms the logInModal so that the user can sign in
const switchToSignIn = function () {
  clearForms()
  $('#sign-up').addClass('invisible')
  $('.sign-up-footer-buttons').addClass('invisible')
  $('#sign-in').removeClass('invisible')
  $('.sign-in-footer-buttons').removeClass('invisible')
  $('#logInModalTitle').text('Sign In')
}

// switchToSignUp() transforms the logInModal so that the user can sign up
const switchToSignUp = function () {
  clearForms()
  $('#sign-in').addClass('invisible')
  $('.sign-in-footer-buttons').addClass('invisible')
  $('#sign-up').removeClass('invisible')
  $('.sign-up-footer-buttons').removeClass('invisible')
  $('#logInModalTitle').text('Sign Up')
}

//////////////////////////////
//                          //
//  USER view UI functions  //
//                          //
//////////////////////////////

// handleChangePasswordFailure() displays an error message if the attempt to
// change a user's password on the API failed
const handleChangePasswordFailure = function () {
  $('.change-password-message').html('<h6 class="change-password-message red">Invalid password</h6>')
}

// handleChangePasswordMismatchingPasswords() displays an error if the user
// tries to change their password, and the new password and
// new password confirmation fields don't match
const handleChangePasswordMismatchingPasswords = function () {
  $('.change-password-message').html('<h6 class="change-password-message red">New passwords do not match</h6>')
}

// handleChangePasswordSuccess() displays a message when the user successfully
// changes their password
const handleChangePasswordSuccess = function (newPassword) {
  store.user.password = newPassword
  $('.change-password-message').html('<h6 class="change-password-message blue">Password changed</h6>')
}

// showUserView() is called to refresh the USER view modal that displays user
// settings
const showUserView = function () {
  $('#user-name').html(`Current User: <scan class="blue">${store.user.email} </scan>`)
  $('#x-color-picker').attr('value', store.xColor)
  $('#o-color-picker').attr('value', store.oColor)
}

// updateHeader() changes the colors of the x and o in the "Tic-Tac-Toe" at the
// top of the page if the user picks new player mark colors in the USER view
const updateHeader = function () {
  $('.header-x').attr('style', `color: ${store.xColor}`)
  $('.header-o').attr('style', `color: ${store.oColor}`)
  $('.board-message-x-scan').attr('style', `color: ${store.xColor}`)
  $('.board-message-o-scan').attr('style', `color: ${store.oColor}`)
}

module.exports = {
  // FORM reset
  clearForms,
  // GAME view UI functions
  displayNewMove,
  hideBoard,
  showBoard,
  updateBoardDisplay,
  showPlayerTurn,
  showPlayerWin,
  showPlayerTie,
  // LOAD view UI functions
  displayNextLoadPage,
  displayPreviousLoadPage,
  handleGameListSuccess,
  handleLoadGameFailure,
  setLoadBoardColors,
  updateLoadGameTextColor,
  // MULTIPLAYER UI functions
  handleHostGameFailure,
  handleHostLobby,
  handleJoinGameFailure,
  // NEW game UI functions
  aiRadios,
  handleCreateNewGameFailure,
  multiplayerRadios,
  selfRadios,
  showNewGameModal,
  // SAVE UI functions
  handleSaveGameFailure,
  handleSaveGameSuccess,
  showSaveGameModel,
  // SIGN-IN/UP view UI functions
  handleSignInSuccess,
  handleSignInFailure,
  handleSignInAfterSignUpFailure,
  handleSignInAfterSignUpSuccess,
  handleSignUpSuccess,
  handleSignUpFailure,
  handleSignUpMismatchingPasswords,
  handleSignOutSuccess,
  handleSignOutFailure,
  resetLogInModal,
  switchToSignIn,
  switchToSignUp,
  // USER view UI functions
  handleChangePasswordFailure,
  handleChangePasswordMismatchingPasswords,
  handleChangePasswordSuccess,
  showUserView,
  updateHeader
}
