const ai = require('./ai.js')
const config = require('./config.js')
const store = require('./store.js')
const watcher = require('./watcher.js')

// GAME API actions

const createNewGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getGameList = () => {
  return $.ajax({
    url: config.apiUrl + '/games?over=false',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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

const updateGame = data => {
  if (ai.terminalCheck(store.currentBoard, 'playerOne') === 'playerOneWin' || ai.terminalCheck(store.currentBoard, 'playerOne') === 'tie' || ai.terminalCheck(store.currentBoard, 'playerTwo') === 'playerTwoWin') {
    data.game.over = true
  }
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

// USER API actions

const signUp = data => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = data => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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

const storeSignInInfo = data => {
  store.user.id = data.user.id
  store.user.email = data.user.email
  store.user.token = data.user.token
  return data
}

const storeSignUpInfo = data => {
  store.user.email = data.credentials.email
  store.user.password = data.credentials.password
  return data
}

// AI API Interactions

const signInAI = () => {
  if (store.opponent === 'ai') {
    let data
    switch (store.aiDifficulty) {
      case '0':
        data = {
          credentials: {
            email: "ai@easy.com",
            password: "ai",
            password_confirmation: "ai"
          }
        }
        break
      case '1':
        data = {
          credentials: {
            email: "ai@medium.com",
            password: "ai",
            password_confirmation: "ai"
          }
        }
        break
      case '2':
        data = {
          credentials: {
            email: "ai@impossible.com",
            password: "ai",
            password_confirmation: "ai"
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

const joinAI = aiUser => {
  $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + aiUser.user.token
    }
  })
}

// MULTIPLAYER functions

const createGameWatcher = data => {
  return watcher.resourceWatcher(`${config.apiUrl}/games/${data.game.id}/watch`, {
    Authorization: 'Token token=' + store.user.token,
    timeout: 360
  })
}

const joinMultiplayerGame = id => {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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

module.exports = {
  // GAME API functions
  createNewGame,
  getGameList,
  loadThisGame,
  updateGame,
  // USER API functions
  signUp,
  signIn,
  signOut,
  changePassword,
  storeSignInInfo,
  storeSignUpInfo,
  // AI API functions
  signInAI,
  joinAI,
  // MULTIPLAYER API functions
  createGameWatcher,
  joinMultiplayerGame,
  updateGameASync
}
