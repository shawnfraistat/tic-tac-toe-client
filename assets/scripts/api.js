const config = require('./config.js')
const store = require('./store.js')
const ui = require('./ui.js')

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
  ui.handleSignInSuccess(data)
}

const eraseSignInInfo = () => {
  resetUser()
  ui.handleSignOutSuccess()
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
  eraseSignInInfo
}
