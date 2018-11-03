const store = require('./store.js')

//
//
// UI functions that deal with the LOAD views
//
//

const displayLoadedBoard = (startPoint, endPoint) => {
  const data = store.user
  $('.game-list')[0].innerHTML = ''
  for (let i = startPoint; i < endPoint; i++) {
    let playerOne
    let playerTwo
    if (data.games[i].player_x.email === store.user.email) {
      playerOne = `${store.user.email} (You)`
    } else {
      playerOne = `${data.games[i].player_x.email} (Human Opponent)`
    }
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

const displayNextLoadPage = () => {
  const data = store.user
  store.currentLoadPage++
  console.log('inside displayPreviousLoadPage')
  const startPoint = store.currentLoadPage * 9
  let endPoint = 0
  if (data.games.length - startPoint < 9) {
    endPoint = startPoint + (data.games.length - startPoint)
  } else {
    endPoint = startPoint + 9
  }
  console.log('startPoint is', startPoint)
  console.log('endPoint is', endPoint)
  displayLoadedBoard(startPoint, endPoint)
  updatePageArrows()
}

const displayPreviousLoadPage = () => {
  const data = store.user
  store.currentLoadPage--
  console.log('inside displayPreviousLoadPage')
  const startPoint = store.currentLoadPage * 9
  let endPoint = 0
  if (data.games.length - startPoint < 9) {
    endPoint = startPoint + (data.games.length - startPoint)
  } else {
    endPoint = startPoint + 9
  }
  console.log('startPoint is', startPoint)
  console.log('endPoint is', endPoint)
  displayLoadedBoard(startPoint, endPoint)
  updatePageArrows()
}

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

const handleLoadGameSuccess = data => {

}

const handleCreateNewGameFailure = data => {
  console.log('New game failed to create!')
}

const updateLoadGameTextColor = () => {
  $('.player-one-board-bottom-text').attr('style', `color: ${store.xColor}`)
  $('.player-two-board-bottom-text').attr('style', `color: ${store.oColor}`)
}

// onChooseLoadGame should probably be in events.js, but I couldn't think of
// an easy way to do that without creating a circular dependency (because ui.js
// needs to bind onChooseLoadGame to .load-board in displayLoadedBoard())

const onChooseLoadGame = event => {
  event.preventDefault()
  store.currentClickEvent = event
  $('#loadConfirmModal').modal('show')
}

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

const updatePageArrows = () => {
  console.log('totalLoadPages is', store.totalLoadPages)
  console.log('currentLoadPage is', store.currentLoadPage)
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

//
//
// UI functions that deal with the SIGN-FORM views
//
//

const hideSignView = function () {
  $('.sign-view').addClass('invisible')
}

const showSignView = function () {
  $('.sign-view').removeClass('invisible')
}

const switchToSignIn = function () {
  clearForms()
  $('#sign-up').addClass('invisible')
  $('.sign-up-footer-buttons').addClass('invisible')
  $('#sign-in').removeClass('invisible')
  $('.sign-in-footer-buttons').removeClass('invisible')
  $('#logInModalTitle').text('Sign In')
}

const switchToSignUp = function () {
  clearForms()
  $('#sign-in').addClass('invisible')
  $('.sign-in-footer-buttons').addClass('invisible')
  $('#sign-up').removeClass('invisible')
  $('.sign-up-footer-buttons').removeClass('invisible')
  $('#logInModalTitle').text('Sign Up')
}

const handleSignInSuccess = event => {
  console.log('inside handleSignInSuccess')
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
}

const handleSignInFailure = event => {
  $('.sign-in-message').html('<h5 class="sign-in-message red">Invalid sign in</h5>')
}

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
  document.getElementById('x-color-picker').value = '#ff0000'
  document.getElementById('o-color-picker').value = '#0000ff'
  updateBoardDisplay()
  showBoard()
}

const handleSignOutFailure = event => {
  $('.sign-out-message').html('<p class="red">Failed to sign out</p>')
  console.log(event)
}

const handleSignUpSuccess = event => {
  console.log('inside handleSignUpSuccess')
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
}

const handleSignUpFailure = event => {
  $('.sign-up-message').html('<h5 class="sign-up-message red">Invalid sign up</h5>')
  console.log('Invalid sign up event', event)
}

const handleSignUpMismatchingPasswords = event => {
  $('.sign-up-message').html('<h5 class="sign-up-message red">Passwords do not match</h5>')
  console.log('Invalid sign up event', event)
}

const toggleAIDifficultyRadios = () => {
  const buttons = $('input[name="difficulty"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].toggleAttribute('disabled')
  }
}

//
//
// UI functions that deal with the USER view
//
//

const handleChangePasswordFailure = function () {
  $('.change-password-message').html('<h6 class="change-password-message red">Invalid Password</h6>')
}

const handleChangePasswordMismatchingPasswords = function () {
  $('.change-password-message').html('<h6 class="change-password-message red">New Passwords Do Not Match</h6>')
}

const handleChangePasswordSuccess = function (newPassword) {
  store.user.password = newPassword
  $('.change-password-message').html('<h6 class="change-password-message blue">Password Changed</h6>')
}

const showUserView = function () {
  console.log('inside showUserView')
  console.log(store.xColor)
  console.log(store.oColor)
  $('#user-name').html(`Current User: <scan class="blue">${store.user.email} </scan>`)
  $('#x-color-picker').attr('value', store.xColor)
  $('#o-color-picker').attr('value', store.oColor)
}

const updateHeader = function () {
  console.log('inside updateHeader')
  $('.header-x').attr('style', `color: ${store.xColor}`)
  $('.header-o').attr('style', `color: ${store.oColor}`)
}

//
//
// UI functions that deal with the GAME views
//
//

const hideBoard = function () {
  $('.board-plus-message').addClass('invisible')
}

const showBoard = function () {
  $('.board-plus-message').removeClass('invisible')
  $('.load-view').addClass('invisible')
}

const showPlayerTurn = function () {
  if (store.currentPlayer === 'playerOne') {
    $('.board-message').html(`<p><scan style="color:${store.xColor}">Player One</scan>'s Turn</p>`)
  } else {
    $('.board-message').html(`<p><scan style="color:${store.oColor}">Player Two</scan>'s Turn</p>`)
  }
}

const showPlayerWin = function (player) {
  if (player === 'playerOne') {
    $('.board-message').html(`<p><scan style="color:${store.xColor}">Player One</scan> Wins!</p>`)
  } else {
    $('.board-message').html(`<p><scan style="color:${store.oColor}">Player Two</scan> Wins!</p>`)
  }
}

const showPlayerTie = function (player) {
  $('.board-message').html(`<p>Tie!</p>`)
}

// updateBoardDisplay() updates the display board to match the current board state

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

// MODAL resets

const clearForms = () => {
  console.log('inside clearForms')
  document.getElementById('sign-up').reset()
  $('.sign-up-message').html('<h5 class="sign-up-message"></h5>')
  document.getElementById('sign-in').reset()
  $('.sign-in-message').html('<h5 class="sign-in-message"></h5>')
  document.getElementById('change-password').reset()
  $('.change-password-message').text('')
  $('#user-name').text('')
}

const resetLogInModal = () => {
  $('#logInModalHeader').removeClass('invisible')
  switchToSignIn()
  // $('#sign-in').removeClass('invisible')
  $('.sign-in-message').text('')
  $('.sign-up-message').text('')
  $('#sign-in-cancel').removeClass('invisible')
  $('#sign-in-submit').removeClass('invisible')
  $('#sign-in-continue').addClass('invisible')
}

module.exports = {
  // NEW game UI functions
  handleCreateNewGameFailure,
  // LOAD view UI functions
  handleGameListSuccess,
  handleLoadGameSuccess,
  displayNextLoadPage,
  displayPreviousLoadPage,
  setLoadBoardColors,
  updateLoadGameTextColor,
  // USER view UI functions
  handleChangePasswordFailure,
  handleChangePasswordMismatchingPasswords,
  handleChangePasswordSuccess,
  showUserView,
  updateHeader,
  // SIGN-IN/SIGN-UP view UI functions
  hideSignView,
  showSignView,
  switchToSignIn,
  switchToSignUp,
  handleSignInSuccess,
  handleSignInFailure,
  handleSignUpSuccess,
  handleSignUpFailure,
  handleSignUpMismatchingPasswords,
  handleSignOutSuccess,
  handleSignOutFailure,
  // NEW GAME UI functions
  toggleAIDifficultyRadios,
  // GAME view UI functions
  hideBoard,
  showBoard,
  updateBoardDisplay,
  showPlayerTurn,
  showPlayerWin,
  showPlayerTie,
  // MODAL resets
  clearForms,
  resetLogInModal
}
