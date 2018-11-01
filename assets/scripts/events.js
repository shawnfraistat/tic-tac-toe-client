const api = require('./api.js')
const gamelogic = require('./gamelogic')
const getFormFields = require('../../lib/get-form-fields.js')
const store = require('./store.js')
const ui = require('./ui.js')

const onChangePassword = event => {
  event.preventDefault()
  const target = $('#password-form')[0]
  const data = getFormFields(target)
  api.changePassword(data)
    .then(ui.handleSignUpSuccess)
    .catch(ui.handleSignUpFailure)
}

const onLoadGame = function (event) {
  event.preventDefault()
  $('.board-plus-message').toggleClass('invisible')
  $('.load-view').toggleClass('invisible')
  api.getGameList()
    .then(ui.handleGameListSuccess)
    .catch(ui.handleGameListFailure)
}

const onNewGame = function (event) {
  console.log('Start game!')
  store.firstPlayer = $('input[name="first-player"]:checked').val()
  store.opponent = $('input[name="opponent"]:checked').val()
  store.aiDifficulty = $('input[name="difficulty"]:checked').val()
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ui.updateBoardDisplay()
  console.log(store.firstPlayer)
  console.log(store.opponent)
  console.log(store.aiDifficulty)
  $('#newGameModal').modal('hide')
  store.currentPlayer = store.firstPlayer
  if (store.currentPlayer === 'playerTwo' && store.opponent === 'ai') {
    gamelogic.takeAITurn()
  } else {
    gamelogic.readyPlayerTurn()
  }
}

const onSignIn = event => {
  event.preventDefault()
  const target = $('#sign-in')[0]
  const data = getFormFields(target)
  api.signIn(data)
    .then(api.storeSignInInfo)
    .catch(ui.handleSignInFailure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(api.eraseSignInInfo)
    .catch(ui.handleSignUpFailure)
}

const onSignUp = event => {
  event.preventDefault()
  const target = $('#sign-up')[0]
  const data = getFormFields(target)
  api.signUp(data)
    .then(ui.handleSignUpSuccess, api.signIn)
    .catch(ui.handleSignUpFailure)
}

const onSwitchToSignIn = (event) => {
  event.preventDefault()
  ui.hideSignUp()
  ui.showSignIn()
  $('#logInModalTitle').text('Sign In')
  $('#sign-up-submit').off('click', onSignUp)
  $('#sign-up-submit').attr('id', 'sign-in-submit')
  $('#sign-in-submit').on('click', onSignIn)
}

const onSwitchToSignUp = (event) => {
  event.preventDefault()
  ui.hideSignIn()
  ui.showSignUp()
  $('#logInModalTitle').text('Sign Up')
  $('#sign-in-submit').off('click', onSignIn)
  $('#sign-in-submit').attr('id', 'sign-up-submit')
  $('#sign-up-submit').on('click', onSignUp)
}

module.exports = {
  onChangePassword,
  onNewGame,
  onLoadGame,
  onSignIn,
  onSignUp,
  onSignOut,
  onSwitchToSignIn,
  onSwitchToSignUp
}
