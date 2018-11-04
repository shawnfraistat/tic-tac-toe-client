const ai = require('./ai.js')
const api = require('./api.js')
const gamelogic = require('./gamelogic')
const getFormFields = require('../../lib/get-form-fields.js')
const store = require('./store.js')
const ui = require('./ui.js')

let oColorValue = store.oColor
let xColorValue = store.xColor

// LOAD and SAVE events

const onSaveGame = data => {
  console.log('inside onSaveGame')
  if (store.game.id === 0) {
    api.createNewGame()
      .then(copyNewGameData)
      .then(api.signInAI)
      .then(saveThisGame)
      .then(saveThisGame)
      .catch(ui.handleCreateNewGameFailure)
  } else if (store.game.id !== 0) {
    saveThisGame()
  }
}

const saveThisGame = () => {
  let over = false
  if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin' || ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie' || ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
    over = true
  }
  for (let i = 0; i < store.currentBoard.length; i++) {
    if (store.currentBoard[i] === 'x' || store.currentBoard[i] === 'o') {
      const moveForAPI = {
        "game": {
          "cell": {
            "index": i,
            "value": (function () {
              if (store.currentBoard[i] === 'x') {
                return 'x'
              } else if (store.currentBoard[i] === 'o') {
                return 'o'
              }
            }())
          },
          "over": over
        }
      }
      console.log('moveForAPI inside updateBoardGameInProgress is', moveForAPI)
      console.log('store game id is', store.game.id)
      console.log('store user token is', store.user.token)
      api.updateGame(moveForAPI)
    }
  }
}

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
  console.log('inside onLoadView')
  setUpLoadView()
  // $.when(api.updateBoardGameInProgress)
  //   .done(setUpLoadView)
}

const setUpLoadView = () => {
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
  $('#save-game-nav-button').removeClass('invisible')
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
  store.game = {
    id: 0,
    cells: [],
    over: false,
    player_x: {
      id: 0,
      email: ''
    },
    player_o: null
  }
  if (store.user.id !== 0) {
    $('#save-game-nav-button').removeClass('invisible')
  }
  // Wanted to let user choose who goes first, but it screws up saving; no easy way for the API to
  // store who had the last move
  // store.firstPlayer = $('input[name="first-player"]:checked').val()
  store.opponent = $('input[name="opponent"]:checked').val()
  if (store.opponent === 'multiplayer') {
    startNewMultiplayerGame()
  } else {
    if (store.opponent === 'ai') {
      store.aiDifficulty = $('input[name="difficulty"]:checked').val()
    }
    store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
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
}

// SIGN IN/SIGN OUT Events

const onSignIn = event => {
  event.preventDefault()
  const target = $('#sign-in')[0]
  const data = getFormFields(target)
  api.signIn(data)
    .then(api.storeSignInInfo)
    .then(ui.handleSignInSuccess)
    // .then(api.createGameInProgress)
    .catch(ui.handleSignInFailure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(resetColors)
    .then(ui.handleSignOutSuccess)
    .catch(ui.handleSignOutFailure)
}

const onSignUp = event => {
  event.preventDefault()
  const target = $('#sign-up')[0]
  const data = getFormFields(target)
  console.log('inside onSignUp: data is', data)
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.storeSignUpInfo(data)
    api.signUp(data)
      .then(ui.handleSignUpSuccess)
      .catch(ui.handleSignUpFailure)
  } else {
    ui.handleSignUpMismatchingPasswords()
  }
}

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
    // .then(api.createGameInProgress)
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

const resetColors = () => {
  xColorValue = '#ff0000'
  oColorValue = '#0000ff'
  store.xColor = xColorValue
  store.oColor = oColorValue
  if (!($('.board-plus-message').hasClass('invisible'))) {
    if (store.currentBoard.includes('x') || store.currentBoard.includes('o')) {
      ui.updateBoardDisplay()
    }
  }
  if (!($('.load-view').hasClass('invisible'))) {
    ui.setLoadBoardColors()
    ui.updateLoadGameTextColor()
  }
  ui.updateHeader()
}

// USER VIEW Events

const onChangePassword = event => {
  event.preventDefault()
  const target = $('#password-form')[0]
  const data = getFormFields(target)
  api.changePassword(data)
    .then(ui.handleSignUpSuccess)
    .catch(ui.handleSignUpFailure)
}

const onChangePasswordSubmit = event => {
  event.preventDefault()
  const target = $('#change-password')[0]
  const data = getFormFields(target)
  if (data.passwords.new === data.passwords.confirm_new) {
    console.log('inside onChangePasswordSubmit, about to submit', data)
    api.changePassword(data)
      .done(ui.handleChangePasswordSuccess(data.passwords.new))
      .fail(ui.handleChangePasswordFailure)
  } else {
    ui.handleChangePasswordMismatchingPasswords()
  }
}

const onConfirmNewColors = event => {
  event.preventDefault()
  console.log('inside onConfirmNewColors')
  store.xColor = xColorValue
  store.oColor = oColorValue
  if (!($('.board-plus-message').hasClass('invisible'))) {
    if (store.currentBoard.includes('x') || store.currentBoard.includes('o')) {
      ui.updateBoardDisplay()
    }
  }
  if (!($('.load-view').hasClass('invisible'))) {
    ui.setLoadBoardColors()
    ui.updateLoadGameTextColor()
  }
  ui.updateHeader()
}

const onUpdateOColorValue = event => {
  console.log('Inside updateOColorValue')
  oColorValue = event.currentTarget.value
}

const onUpdateXColorValue = event => {
  xColorValue = event.currentTarget.value
}

// MULTIPLAYER EventSource

const onEstablishLink = (gameData) => {
  copyNewGameData(gameData)
  const gameWatcher = api.createGameWatcher(gameData)
  gameWatcher.on('connect', function (data) {
    console.log('connection made!')
    console.log(data)
  })

  gameWatcher.on('change', function (data) {
    // this handles what happens when the other player joins
    if (data.game && data.game.player_o_id) {
      const diff = changes => {
        let before = changes[0]
        let after = changes[1]
        for (let i = 0; i < after.length; i++) {
          if (before[i] !== after[i]) {
            return {
              index: i,
              value: after[i]
            }
          }
        }
        return { index: -1, value: '' }
      }
      // console.log('data.game.player_o_id is ', data.game.player_o_id)
      // store.game.player_o.id = data.game.player_o_id[1]
      store.currentPlayer = 'playerOne'
      ui.updateBoardDisplay()
      ui.showPlayerTurn()
      if (store.multiplayerRole === 'host') {
        console.log('I think this user is Player One')
        gamelogic.readyPlayerTurn()
      }
    }

    // this handles what happens when the other player makes a move
    console.log(data)
    if (data.game && data.game.cells) {
      console.log('The other player made a move')
      const diff = changes => {
        let before = changes[0]
        let after = changes[1]
        for (let i = 0; i < after.length; i++) {
          if (before[i] !== after[i]) {
            return {
              index: i,
              value: after[i]
            }
          }
        }
        return { index: -1, value: '' }
      }
      let cell = diff(data.game.cells)

      // original code
      // $('#watch-index').val(cell.index)
      // $('#watch-value').val(cell.value)

      // your attempt
      console.log('in onEstablishLink -- going to modify store at cell index', store.currentBoard[cell.index], cell.value)
      store.currentBoard[cell.index] = cell.value
      if (store.currentPlayer === 'playerOne') {
        store.currentPlayer = 'playerTwo'
      } else {
        store.currentPlayer = 'playerOne'
      }
      ui.showPlayerTurn()
      ui.updateBoardDisplay()
      if (ai.terminalCheck(store.currentBoard, store.currentPlayer) === 'continue') {
        console.log('performed a terminalCheck--found continue')
        gamelogic.readyPlayerTurn()
      }
    } else if (data.timeout) { //not an error
      gameWatcher.close()
    }
  })

  gameWatcher.on('error', function (e) {
    console.error('an error has occurred with the stream', e)
  })
}

const startNewMultiplayerGame = () => {
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ui.updateBoardDisplay()
  ui.showBoard()
  store.multiplayerRole = $('input[name="multiplayer"]:checked').val()
  console.log(store.multiplayerRole)
  if (store.multiplayerRole === 'host') {
    api.createNewGame()
      .then(onEstablishLink)
      .then(createHostLobby)
      .catch(ui.handleHostGameFailure)
    // store.currentPlayer = 'playerOne'
    // gamelogic.readyPlayerTurn()
  }
  if (store.multiplayerRole === 'join') {
    const gameToJoin = $('#join-id')[0].value
    console.log('gameToJoin is', gameToJoin)
    api.joinMultiplayerGame(gameToJoin)
      .then(onEstablishLink)
      .then(joinGameSuccess)
      .catch(ui.handleJoinGameFailure)
    // store.currentPlayer = 'playerTwo'
    // gamelogic.readyPlayerTurn()
  }
}

const joinGameSuccess = () => {
  store.currentPlayer = 'playerOne'
  ui.updateBoardDisplay()
  ui.showPlayerTurn()
}

const createHostLobby = () => {
  ui.handleHostLobby()
}

module.exports = {
  onChangePassword,
  onChangePasswordSubmit,
  onConfirmNewColors,
  onEstablishLink,
  onNewGame,
  onLoadGame,
  onLoadView,
  onSaveGame,
  onSignIn,
  onSignUp,
  onSignUpContinue,
  onSignOut,
  onSwitchToSignIn,
  onSwitchToSignUp,
  onUpdateOColorValue,
  onUpdateXColorValue
}
