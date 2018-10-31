const store = require('./store.js')

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

const hideSignIn = function () {
  $('#sign-in').addClass('invisible')
  clearForms()
}

const showSignIn = function () {
  $('#sign-in').removeClass('invisible')
}

const hideSignUp = function () {
  $('#sign-up').addClass('invisible')
  clearForms()
}

const showSignUp = function () {
  $('#sign-up').removeClass('invisible')
}

const handleSignInSuccess = event => {
  $('.sign-in-message').html('<p class="sign-in-message green">Signed in!</p>')
  console.log(event)
}

const handleSignInFailure = event => {
  $('.sign-in-message').html('<p class="sign-in-message red">Invalid sign in</p>')
  console.log(event)
}

const handleSignUpSuccess = event => {
  $('.sign-up-message').html('<p class="sign-up-message green">New account created</p>')
  console.log(event)
}

const handleSignUpFailure = event => {
  $('.sign-up-message').html('<p class="sign-up-message red">Invalid sign up</p>')
  console.log(event)
}

const clearForms = () => {
  document.getElementById('sign-up').reset()
  $('.sign-up-message').html('<p class="sign-up-message"></p>')
  document.getElementById('sign-in').reset()
  $('.sign-in-message').html('<p class="sign-in-message"></p>')
}

//
//
// UI functions that deal with the USER view
//
//

const showUserView = function () {
}



//
//
// UI functions that deal with the GAME views
//
//

const hideBoard = function () {
  $('.board').addClass('invisible')
}

const showBoard = function () {
  $('.board').removeClass('invisible')
}

const showPlayerTurn = function () {
  if (store.currentPlayer === 'playerOne') {
    $('.board-message').html(`<p><scan class="x-color">Player One</scan>'s Turn</p>`)
  } else {
    $('.board-message').html(`<p><scan class="o-color">Player Two</scan>'s Turn</p>`)
  }
}

const showPlayerWin = function (player) {
  if (player === 'playerOne') {
    $('.board-message').html(`<p><scan class="x-color">Player One</scan> Wins!</p>`)
  } else {
    $('.board-message').html(`<p><scan class="o-color">Player Two</scan> Wins!</p>`)
  }
}

const showPlayerTie = function (player) {
  $('.board-message').html(`<p>Tie!</p>`)
}

// updateBoardDisplay() updates the display board to match the current board state

const updateBoardDisplay = function () {
  for (let i = 0; i < 9; i++) {
    if (store.currentBoard[i] === 'x') {
      document.getElementById(i).innerHTML = '<p class="x-color">X</p>'
    }
    if (store.currentBoard[i] === 'o') {
      document.getElementById(i).innerHTML = '<p class="o-color">O</p>'
    }
    if (store.currentBoard[i] !== 'x' && store.currentBoard[i] !== 'o') {
      document.getElementById(i).innerHTML = ''
    }
  }
}

module.exports = {
  // USER view UI functions
  hideSignView,
  showSignView,
  hideSignIn,
  showSignIn,
  hideSignUp,
  showSignUp,
  handleSignUpSuccess,
  handleSignUpFailure,
  handleSignInSuccess,
  handleSignInFailure,
  // GAME view UI functions
  hideBoard,
  showBoard,
  updateBoardDisplay,
  showPlayerTurn,
  showPlayerWin,
  showPlayerTie
}
