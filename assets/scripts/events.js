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

// LOAD events

const onLoadGame = () => {
  api.loadThisGame(store.currentClickEvent)
    .then(setUpLoadedGame)
    .then(ui.handleLoadGameSuccess)
  console.log('Loading your game!')
}

const onLoadView = function (event) {
  event.preventDefault()
  api.getGameList()
    .then(storeLoadedGames)
    .then(ui.handleGameListSuccess)
    .catch(ui.handleGameListFailure)
}

const storeLoadedGames = data => {
  store.user.games = []
  console.log('Inside storeLoadedGames')
  console.log(data)
  for (let i = 0; i < data.games.length; i++) {
    store.user.games[i] = data.games[i]
  }
  store.user.games.sort((a, b) => a.id - b.id)
}

const setUpLoadedGame = data => {
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = 0; i < store.currentBoard.length; i++) {
    if (data.game.cells[i] === 'x') {
      store.currentBoard[i] = 'x'
    } else if (data.game.cells[i] === 'o') {
      store.currentBoard[i] = 'o'
    }
  }
  for (const key in data.game) {
    store.game[key] = data.game[key]
  }
  console.log(store.game)
  ui.showBoard()
  ui.updateBoardDisplay()
  store.currentPlayer = 'playerOne'
  store.opponent = 'self'
  store.aiDifficulty = 0
  gamelogic.readyPlayerTurn()
}

const onPreviousPageArrowClick = () => {
  ui.displayPreviousLoadPage()
}

const onNextPageArrowClick = () => {
  ui.displayNextLoadPage()
}

// NEW GAME events

const onNewGame = function (event) {
  console.log('Start game!')
  store.firstPlayer = $('input[name="first-player"]:checked').val()
  store.opponent = $('input[name="opponent"]:checked').val()
  store.aiDifficulty = $('input[name="difficulty"]:checked').val()
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  if (store.user.id !== 0) {
    api.createNewGame()
      .then(copyNewGameData)
      .catch(ui.handleCreateNewGameFailure)
  }
  ui.showBoard()
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

const copyNewGameData = data => {
  console.log('Inside copyNewGameData--data is:', data)
  store.game.id = data.game.id
}

// SIGN IN/SIGN OUT Events

const onSignIn = event => {
  event.preventDefault()
  const target = $('#sign-in')[0]
  const data = getFormFields(target)
  api.signIn(data)
    .then(api.storeSignInInfo)
    .then(ui.handleSignInSuccess)
    .then(api.createGameInProgress)
    .catch(ui.handleSignInFailure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.handleSignOutSuccess)
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
  onLoadView,
  onPreviousPageArrowClick,
  onNextPageArrowClick,
  onSignIn,
  onSignUp,
  onSignOut,
  onSwitchToSignIn,
  onSwitchToSignUp
}
