const api = require('./api.js')
const gamelogic = require('./gamelogic')
const getFormFields = require('../../lib/get-form-fields.js')
const store = require('./store.js')
const ui = require('./ui.js')

const onSwitchToSignIn = (event) => {
  event.preventDefault()
  // document.getElementsByTagName('FORM').forEach(x => x.reset())
  ui.hideSignUp()
  ui.showSignIn()
}

const onSwitchToSignUp = (event) => {
  event.preventDefault()
  // document.getElementsByTagName('FORM').forEach(x => x.reset())
  ui.hideSignIn()
  ui.showSignUp()
}

const onSignIn = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // const x = document.getElementsByTagName('FORM').reset()
  api.signIn(data)
    .then(ui.handleSignInSuccess)
    .catch(ui.handleSignInFailure)
}

const onSignUp = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // document.getElementsByTagName('FORM').forEach(x => x.reset())
  api.signUp(data)
    .then(ui.handleSignUpSuccess)
    .catch(ui.handleSignUpFailure)
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

module.exports = {
  onNewGame,
  onSwitchToSignIn,
  onSwitchToSignUp,
  onSignIn,
  onSignUp
}
