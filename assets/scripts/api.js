const config = require('./config.js')
const store = require('./store.js')
const ui = require('./ui.js')

// GAME API actions

const createGameInProgress = () => {
  console.log('inside createGameInProgress')
  if (store.currentBoard.includes('x') || store.currentBoard.includes('o')) {
    console.log('there is a game in progress; I should tell the API')
    $.ajax({
      url: config.apiUrl + '/games',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
      .then(updateBoardGameInProgress)
      .catch(console.log('failed to createGameInProgress'))
  }
}

//

const updateBoardGameInProgress = data => {
  store.game.id = data.game.id
  console.log('there is a game in progress; I should update all the moves on the API')
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
          "over": false
        }
      }
      console.log('moveForAPI inside updateBoardGameInProgress is', moveForAPI)
      console.log('store game id is', store.game.id)
      console.log('store user token is', store.user.token)
      updateGame(moveForAPI)
        .then(console.log)
        .catch(console.log)
    }
  }
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

module.exports = {
  // GAME API functions
  createNewGame,
  createGameInProgress,
  getGameList,
  loadThisGame,
  updateGame,
  // USER API functions
  signUp,
  signIn,
  signOut,
  changePassword,
  storeSignInInfo
}
