// api.js

/* This document is organized into the following sections:

(1) AI API Interactions
(2) GAME API Interactions
(3) MULTIPLAYER API Interactions
(4) USER API Interactions */

const ai = require('./ai.js')
const config = require('./config.js')
const store = require('./store.js')
const watcher = require('./watcher.js')

///////////////////////////
//                       //
//  AI API Interactions  //
//                       //
///////////////////////////

// joinAI() has the AI sign in to the API as a game's second player. This enables
// the API to remember that the human was playing against an AI opponent if the
// human wants to save the game or load it later.
const joinAI = aiUser => {
  $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + aiUser.user.token
    }
  })
}

// signInAI() signs an AI player into the API, who can then be joined into
// particular games via joinAI(). There are dummy accounts on the API for each
// AI; the difficulty setting determines which one gets signed in.
const signInAI = () => {
  if (store.opponent === 'ai') {
    let data
    switch (store.aiDifficulty) {
      case '0':
        data = {
          credentials: {
            email: 'ai@easy.com',
            password: 'ai',
            password_confirmation: 'ai'
          }
        }
        break
      case '1':
        data = {
          credentials: {
            email: 'ai@medium.com',
            password: 'ai',
            password_confirmation: 'ai'
          }
        }
        break
      case '2':
        data = {
          credentials: {
            email: 'ai@impossible.com',
            password: 'ai',
            password_confirmation: 'ai'
          }
        }
    }
    $.ajax({
      url: config.apiUrl + '/sign-in',
      method: 'POST',
      data
    })
      .then(joinAI)
  }
}

////////////////////////
//                    //
//  GAME API actions  //
//                    //
////////////////////////

// createNewGame() creates a new game on the API; it's called when a new multiplayer
// game is created, or the user tries to save a game they haven't saved before
const createNewGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// getGameList() gets data for all of the games associated with the user
const getGameList = () => {
  return $.ajax({
    url: config.apiUrl + '/games?over=false',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// loadThisGame() is called when the user tries to load a specific game
const loadThisGame = event => {
  const id = event.currentTarget.attributes.dataid.value
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// updateGame() is called when the user tries to save their current game; it
// is synchronous so as to avoid errors that pop up if the user tries to do
// things before the API is caught up
const updateGame = data => {
  $.ajax({
    async: false,
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

////////////////////////////////////
//                                //
//  MULTIPLAYER API Interactions  //
//                                //
////////////////////////////////////

// createGameWatcher() uses watcher.js to create a resourceWatcher that will
// check the API for updates on the game state--this is necessary for
// multiplayer, since it allows each player to know if the other made a move
const createGameWatcher = data => {
  return watcher.resourceWatcher(`${config.apiUrl}/games/${data.game.id}/watch`, {
    Authorization: 'Token token=' + store.user.token,
    timeout: 120
  })
}

// joinMultiplayerGame() joins a human player to an existing multiplayer game
//  as player two
const joinMultiplayerGame = id => {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// updateGameASync() updates the version of the game stored on the API with a
// new move--it does this asynchronously, which is useful for multiplayer
const updateGameASync = data => {
  if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin' || ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie' || ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
    data.game.over = true
  }
  $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

////////////////////////
//                    //
//  USER API actions  //
//                    //
////////////////////////

// changePassword() is used to update the API to change a user's password
const changePassword = data => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// signIn() logs in an existing user on the API, returning an authentication
// token
const signIn = data => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

// signOut() logs a signed-in usr out
const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// signUp() creates a new user on the API
const signUp = data => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  // AI API functions
  joinAI,
  signInAI,
  // GAME API functions
  createNewGame,
  getGameList,
  loadThisGame,
  updateGame,
  // MULTIPLAYER API functions
  createGameWatcher,
  joinMultiplayerGame,
  updateGameASync,
  // USER API functions
  changePassword,
  signIn,
  signOut,
  signUp
}
