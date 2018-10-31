const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../lib/get-form-fields.js')

const onSwitchToSignIn = (event) => {
  event.preventDefault()
  // document.getElementsByTagName('FORM').forEach(x => x.reset())
  ui.hideSignUp()
  ui.showSignIn()
}

const onSwitchToSignUp = (event) => {
  event.preventDefault()
  // document.getElementsByTagName('FORM').forEach(x => x.reset())
  ui.hideSignIn()
  ui.showSignUp()
}

const onSignIn = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // const x = document.getElementsByTagName('FORM').reset()
  api.signIn(data)
    .then(ui.handleSignInSuccess)
    .catch(ui.handleSignInFailure)
}

const onSignUp = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // document.getElementsByTagName('FORM').forEach(x => x.reset())
  api.signUp(data)
    .then(ui.handleSignUpSuccess)
    .catch(ui.handleSignUpFailure)
}

module.exports = {
  onSwitchToSignIn,
  onSwitchToSignUp,
  onSignIn,
  onSignUp
}
