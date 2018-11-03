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

const copyNewGameData = data => {
  console.log('Inside copyNewGameData--data is:', data)
  store.game.id = data.game.id
}

const onLoadGame = () => {
  api.loadThisGame(store.currentClickEvent)
    .then(setUpLoadedGame)
    .then(ui.handleLoadGameSuccess)
  console.log('Loading your game!')
}

const onLoadView = function (event) {
  event.preventDefault()
  setTimeout(setUpLoadView(event), 1000000)
}

const setUpLoadView = event => {
  event.preventDefault()
  api.getGameList()
    .then(storeLoadedGames)
    .then(ui.handleGameListSuccess)
    .catch(ui.handleGameListFailure)
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
  // hard-coded ids used here to figure out who the AI was on load
  // need to change if API changes
  if (store.game.player_o === null) {
    store.opponent = 'self'
  } else if (store.game.player_o.id === 142) {
    store.opponent = 'ai'
    store.aiDifficulty = '0'
    console.log('Loading easy ai')
  } else if (store.game.player_o.id === 144) {
    store.opponent = 'ai'
    store.aiDifficulty = '1'
    console.log('Loading medium ai')
  } else if (store.game.player_o.id === 145) {
    store.opponent = 'ai'
    store.aiDifficulty = '2'
    console.log('Loading impossible ai')
  }
  const xArray = store.currentBoard.filter(value => value === 'x')
  const oArray = store.currentBoard.filter(value => value === 'o')
  if (xArray.length > oArray.length) {
    store.currentPlayer = 'playerTwo'
  } else {
    store.currentPlayer = 'playerOne'
  }
  if (store.currentPlayer === 'playerTwo' && store.opponent === 'ai') {
    gamelogic.takeAITurn()
  } else {
    gamelogic.readyPlayerTurn()
  }
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

// NEW GAME events

const onNewGame = function (event) {
  console.log('Start game!')
  // This is a nice idea, but it screws up saving; no easy way for the API to
  // store who had the last move
  // store.firstPlayer = $('input[name="first-player"]:checked').val()
  store.opponent = $('input[name="opponent"]:checked').val()
  store.aiDifficulty = $('input[name="difficulty"]:checked').val()
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  if (store.user.id !== 0) {
    api.createNewGame()
      .then(copyNewGameData)
      .then(api.signInAI)
      .catch(ui.handleCreateNewGameFailure)
  }
  ui.showBoard()
  ui.updateBoardDisplay()
  $('#newGameModal').modal('hide')
  store.currentPlayer = 'playerOne'
  if (store.currentPlayer === 'playerTwo' && store.opponent === 'ai') {
    gamelogic.takeAITurn()
  } else {
    gamelogic.readyPlayerTurn()
  }
}

// SIGN IN/SIGN OUT Events

const onSignUpContinue = data => {
  const newCredentials = {
    "credentials": {
      "email": store.user.email,
      "password": store.user.password
    }
  }
  console.log('In callSignin; data is', newCredentials)
  api.signIn(newCredentials)
    .then(api.storeSignInInfo)
    .then(api.createGameInProgress)
    .catch(ui.handleSignUpFailure)
}

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
  console.log('inside onSignUp: data is', data)
  api.storeSignUpInfo(data)
  api.signUp(data)
    .then(ui.handleSignUpSuccess)
    .catch(ui.handleSignUpFailure)
}

const onSwitchToSignIn = event => {
  event.preventDefault()
  ui.switchToSignIn()
}

const onSwitchToSignUp = event => {
  event.preventDefault()
  ui.switchToSignUp()
}

module.exports = {
  onChangePassword,
  onNewGame,
  onLoadGame,
  onLoadView,
  onSignIn,
  onSignUp,
  onSignUpContinue,
  onSignOut,
  onSwitchToSignIn,
  onSwitchToSignUp
}
