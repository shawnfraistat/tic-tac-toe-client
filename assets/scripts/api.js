const ai = require('./ai.js')
const config = require('./config.js')
const store = require('./store.js')
const watcher = require('./watcher.js')

// GAME API actions

const createGameInProgress = () => {
  // console.log('inside createGameInProgress')
  // if (store.currentBoard.includes('x') || store.currentBoard.includes('o')) {
  //   console.log('there is a game in progress; I should tell the API')
  //   $.when($.ajax({
  //     url: config.apiUrl + '/games',
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'Token token=' + store.user.token
  //     }
  //   }))
  //     .then(function (data) { store.game.id = data.game.id })
  //     .then(updateBoardGameInProgress)
  //     .then(signInAI)
  //     .catch(console.log('failed to createGameInProgress'))
  // }
}

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
  console.log('Attempting to update game on API')
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateBoardGameInProgress = () => {
  console.log('there is a game in progress; I should update all the moves on the API')
  //blank
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
  console.log('Inside storeSignInInfo')
  console.log(data.user)
  store.user.id = data.user.id
  store.user.email = data.user.email
  store.user.token = data.user.token
  console.log(store.user)
  return data
}

const storeSignUpInfo = data => {
  console.log('Inside storeSignUpInfo')
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
    console.log('The sign-in data for the AI is', data)
    $.ajax({
      url: config.apiUrl + '/sign-in',
      method: 'POST',
      data
    })
      .then(joinAI)
  }
}

const joinAI = aiUser => {
  console.log('Inside joinAi, aiUser is', aiUser)
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
  console.log('attempting to create game watcher')
  console.log(data)
  return watcher.resourceWatcher(`${config.apiUrl}/games/${data.game.id}/watch`, {
    Authorization: 'Token token=' + store.user.token
  })
}

const joinMultiplayerGame = id => {
  console.log('Inside joinMultiplayerGame')
  console.log('store.user.token is', store.user.token)
  console.log('game id is', id)
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  // GAME API functions
  createNewGame,
  createGameInProgress,
  getGameList,
  loadThisGame,
  updateGame,
  updateBoardGameInProgress,
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
  joinMultiplayerGame
}
