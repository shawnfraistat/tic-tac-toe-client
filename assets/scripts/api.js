const config = require('./config.js')
const store = require('./store.js')
const ui = require('./ui.js')

// GAME API actions

const getGameList = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
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
  console.log(store.user)
  store.user.id = data.user.id
  store.user.email = data.user.email
  store.user.token = data.user.token
  console.log(store.user)
  ui.handleSignInSuccess(data)
}

const eraseSignInInfo = () => {
  store.user.id = 0
  store.user.email = ''
  store.user.token = ''
  ui.handleSignOutSuccess()
}

module.exports = {
  // GAME API functions
  getGameList,
  // USER API functions
  signUp,
  signIn,
  signOut,
  changePassword,
  storeSignInInfo,
  eraseSignInInfo
}
