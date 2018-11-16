// events.js

/* This document is organized into the following sections:

(1) LOAD and SAVE Events
(2) MULTIPLAYER events
(3) NEW GAME Events
(4) SIGN IN/OUT/UP Events
(5) USER View Events */

const ai = require('./ai.js')
const api = require('./api.js')
const gamelogic = require('./gamelogic')
const getFormFields = require('../../lib/get-form-fields.js')
const store = require('./store.js')
const ui = require('./ui.js')

let oColorValue = store.oColor
let xColorValue = store.xColor
let gameWatcher

////////////////////////////
//                        //
//  LOAD and SAVE Events  //
//                        //
////////////////////////////

// onLoadGame() fires when an individual game is selected in the LOAD view; it loads a specific game
const onLoadGame = () => {
  if (gameWatcher !== undefined) {
    gameWatcher.close()
  }
  api.loadThisGame(store.currentClickEvent)
    .then(setUpLoadedGame)
    .catch(ui.handleLoadGameFailure)
}

// onLoadView() fires when the LOAD nav button is clicked; it gets a list of games from the API and displays them
const onLoadView = function (event) {
  event.preventDefault()
  if (gameWatcher !== undefined) {
    gameWatcher.close()
  }
  api.getGameList()
    .then(storeLoadedGames)
    .then(ui.handleGameListSuccess)
    .catch(ui.handleGameListFailure)
}

// onSaveGame() fires when the user clicks confirm on the saveGameModal; it saves the current game
const onSaveGame = data => {
  if (store.game.id === 0) {
    api.createNewGame()
      .then(copyNewGameData)
      .then(api.signInAI)
      .then(saveThisGame)
      .then(ui.handleSaveGameSuccess)
      .catch(ui.handleSaveGameFailure)
  } else if (store.game.id !== 0) {
    $.when(saveThisGame)
      .then(saveThisGame)
      .then(ui.handleSaveGameSuccess)
      .catch(ui.handleSaveGameFailure)
  }
}

// onSaveGameNavButton() fires when the user clicks the SAVE nav button; it calls up saveGameModal
const onSaveGameNavButton = event => {
  event.preventDefault()
  $('#saveGameModal').modal('show')
}

// saveThisGame() is called by onSaveGame; it prepares all the current game info to send to the API
const saveThisGame = () => {
  let over = false
  if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin' || ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie' || ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
    over = true
  }
  for (let i = 0; i < store.currentBoard.length; i++) {
    if (store.currentBoard[i] === 'x' || store.currentBoard[i] === 'o') {
      const moveForAPI = {
        game: {
          cell: {
            index: i,
            value: (function () {
              if (store.currentBoard[i] === 'x') {
                return 'x'
              } else if (store.currentBoard[i] === 'o') {
                return 'o'
              }
            }())
          },
          over: over
        }
      }
      api.updateGame(moveForAPI)
    }
  }
}

// setUpLoadedGame() fires when the player selects a game to load; it sets up the game info locally
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
  $('#save-game-nav-button').removeClass('invisible')
  ui.showBoard()
  ui.updateBoardDisplay()
  // emails stored on API used here to figure out who the AI was on load
  if (store.game.player_o === null) {
    store.opponent = 'self'
  } else if (store.game.player_o.email === 'ai@easy.com') {
    store.opponent = 'ai'
    store.aiDifficulty = '0'
  } else if (store.game.player_o.email === 'ai@medium.com') {
    store.opponent = 'ai'
    store.aiDifficulty = '1'
  } else if (store.game.player_o.id === 'ai@impossible.com') {
    store.opponent = 'ai'
    store.aiDifficulty = '2'
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

// storeLoadedGames() filers the list of all the games the user has played to rule out multiplayer games and sort the remaining games by id number
const storeLoadedGames = data => {
  store.user.games = []
  for (let i = 0; i < data.games.length; i++) {
    if (data.games[i].player_o === null || (data.games[i].player_o !== null && (data.games[i].player_o.email === 'ai@easy.com' || data.games[i].player_o.email === 'ai@medium.com' || data.games[i].player_o.email === 'ai@impossible.com'))) {
      store.user.games.push(data.games[i])
    }
  }
  store.user.games.sort((a, b) => a.id - b.id)
}

//////////////////////////
//                      //
//  MULTIPLAYER Events  //
//                      //
//////////////////////////

// createHostLobby() fires for a user when they create a new multiplayer game as the host
const createHostLobby = () => {
  ui.handleHostLobby()
}

// joinGameSuccess() fires when a player successfully joins an existing multiplayer game
const joinGameSuccess = () => {
  store.currentPlayer = 'playerOne'
  ui.updateBoardDisplay()
  ui.showPlayerTurn()
  $('#newGameModal').modal('hide')
}

// onEstablishLink() creates a gameWatcher to communicate data between players in a multiplayer game
const onEstablishLink = (gameData) => {
  copyNewGameData(gameData)
  gameWatcher = api.createGameWatcher(gameData)
  // gameWatcher.on('connect', function (data) {
  //   console.log(data)
  // })

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
      store.currentPlayer = 'playerOne'
      ui.updateBoardDisplay()
      ui.showPlayerTurn()
      if (store.multiplayerRole === 'host') {
        gamelogic.readyPlayerTurn()
      }
    }

    // this handles what happens when a player makes a move
    if (data.game && data.game.cells) {
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
      // the version of the board on the API has been updated, so the local
      // version of the board in store.js should be updated too
      store.currentBoard[cell.index] = cell.value
      // update the display to show the move
      ui.displayNewMove(cell.index)
      // now evaluate the consequences
      if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin') {
        ui.showPlayerWin('playerOne')
        gameWatcher.close()
      } else if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie') {
        ui.showPlayerTie()
        gameWatcher.close()
      } else if (ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
        ui.showPlayerWin('playerTwo')
        gameWatcher.close()
      } else {
        // flip the currentPlayer
        gamelogic.flipCurrentPlayer()
        // show whose turn it is
        ui.showPlayerTurn()
        // now that currentPlayer has been flipped, check to see if it's this user's turn
        if (store.currentPlayer === 'playerOne' && store.multiplayerRole === 'host') {
          gamelogic.readyPlayerTurn()
        } else if (store.currentPlayer === 'playerTwo' && store.multiplayerRole === 'join') {
          gamelogic.readyPlayerTurn()
        }
      }

    // this handles what happens if the stream times out
    } else if (data.timeout) {
      gameWatcher.close()
    }
  })

  gameWatcher.on('error', function (e) {
    console.error('an error has occurred with the stream', e)
  })
}

// startNewMultiplayerGame() fires when the player starts a multiplayer game from the NEW GAME view
const startNewMultiplayerGame = () => {
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ui.updateBoardDisplay()
  ui.showBoard()
  store.multiplayerRole = $('input[name="multiplayer"]:checked').val()
  if (store.multiplayerRole === 'host') {
    api.createNewGame()
      .then(onEstablishLink)
      .then(createHostLobby)
      .catch(ui.handleHostGameFailure)
  }
  if (store.multiplayerRole === 'join') {
    const gameToJoin = $('#join-id')[0].value
    api.joinMultiplayerGame(gameToJoin)
      .then(onEstablishLink)
      .then(joinGameSuccess)
      .catch(ui.handleJoinGameFailure)
  }
}

///////////////////////
//                   //
//  NEW GAME events  //
//                   //
///////////////////////

// copyNewGameData() creates a local copy in store.js of the game id number it receives back from the API
const copyNewGameData = data => {
  store.game.id = data.game.id
}

// onNewGame() runs when the player submits the newGameModal; it sets up a new game
const onNewGame = function (event) {
  if (gameWatcher !== undefined) {
    gameWatcher.close()
  }
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
  // Wanted to let user choose who goes first, but it screws up saving; no easy way for the API to
  // store who had the last move--so I've commented the code out
  // store.firstPlayer = $('input[name="first-player"]:checked').val()
  store.opponent = $('input[name="opponent"]:checked').val()
  if (store.user.id !== 0 && store.opponent !== 'multiplayer') {
    $('#save-game-nav-button').removeClass('invisible')
  }
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

/////////////////////////////
//                         //
//  SIGN IN/OUT/UP Events  //
//                         //
/////////////////////////////

// onSignIn() is called when the player submits the sign-in form; it collects the info
// from logInModal and passes it to the API
const onSignIn = event => {
  event.preventDefault()
  const target = $('#sign-in')[0]
  const data = getFormFields(target)
  api.signIn(data)
    .then(storeSignInInfo)
    .then(ui.handleSignInSuccess)
    .catch(ui.handleSignInFailure)
}

// onSignOut() is called when the player clicks the sign-out nav button
const onSignOut = event => {
  if (gameWatcher !== undefined) {
    gameWatcher.close()
  }
  event.preventDefault()
  api.signOut()
    .then(resetColors)
    .then(ui.handleSignOutSuccess)
    .catch(ui.handleSignOutFailure)
}

// onSignUp() is called when the player submits the sign-up form; it collects the info
// from logInModal and passes it to the API
const onSignUp = event => {
  event.preventDefault()
  const target = $('#sign-up')[0]
  const data = getFormFields(target)
  if (data.credentials.password === data.credentials.password_confirmation) {
    storeSignUpInfo(data)
    api.signUp(data)
      .then(ui.handleSignUpSuccess)
      .catch(ui.handleSignUpFailure)
  } else {
    ui.handleSignUpMismatchingPasswords()
  }
}

// onSignUpContinue() is called when the player tries to dismiss the sign-up
// view on the logInModal--it tries to automatically log a newly signed-up player in
const onSignUpContinue = data => {
  const newCredentials = {
    credentials: {
      email: store.user.email,
      password: store.user.password
    }
  }
  api.signIn(newCredentials)
    .then(storeSignInInfo)
    .then(ui.handleSignInAfterSignUpSuccess)
    .catch(ui.handleSignInAfterSignUpFailure)
}

// onSwitchToSignIn() switches the logInModal to the sign in view; it happens if
// the player clicks that option in the logInModal
const onSwitchToSignIn = event => {
  event.preventDefault()
  ui.switchToSignIn()
}

// onSwitchToSignUp() switches the logInModal to the sign up view; it happens if
// the player clicks that option in the logInModal
const onSwitchToSignUp = event => {
  event.preventDefault()
  ui.switchToSignUp()
}

// resetColors() is called by onSignOut(); it resets the x and o colors to their default
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

// storeSignInInfo() creates a local version in store.js of the sign-in info it receives from the API
const storeSignInInfo = data => {
  store.user.id = data.user.id
  store.user.email = data.user.email
  store.user.token = data.user.token
  return data
}

// storeSignUpInfo() creates a local version in store.js of the sign-up info it receives from the API
const storeSignUpInfo = data => {
  store.user.email = data.credentials.email
  store.user.password = data.credentials.password
  return data
}

////////////////////////
//                    //
//  USER VIEW Events  //
//                    //
////////////////////////

// onChangePassword() fires when the player clicks submit on the change password submit button in the USER view
const onChangePasswordSubmit = event => {
  event.preventDefault()
  const target = $('#change-password')[0]
  const data = getFormFields(target)
  if (data.passwords.new === data.passwords.confirm_new) {
    api.changePassword(data)
      .done(ui.handleChangePasswordSuccess(data.passwords.new))
      .fail(ui.handleChangePasswordFailure)
  } else {
    ui.handleChangePasswordMismatchingPasswords()
  }
}

// onConfirmNewColors() fires when the player confirms their choice of new colors
const onConfirmNewColors = event => {
  event.preventDefault()
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

// onUpdateOColorValue() fires when the player chooses a new o color in the color picker
const onUpdateOColorValue = event => {
  oColorValue = event.currentTarget.value
}

// onUpdateXColorValue() fires when the player chooses a new x color in the color picker
const onUpdateXColorValue = event => {
  xColorValue = event.currentTarget.value
}

module.exports = {
  // LOAD and SAVE Events
  onLoadGame,
  onLoadView,
  onSaveGame,
  onSaveGameNavButton,
  // NEW GAME Events
  onNewGame,
  // SIGN IN/OUT/UP Events
  onSignIn,
  onSignOut,
  onSignUp,
  onSignUpContinue,
  onSwitchToSignIn,
  onSwitchToSignUp,
  // MULTIPLAYER events
  onEstablishLink,
  // USER View Events
  onChangePasswordSubmit,
  onConfirmNewColors,
  onUpdateOColorValue,
  onUpdateXColorValue
}
