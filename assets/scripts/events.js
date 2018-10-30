const ui = require('./ui.js')

const onSwitchToSignIn = (event) => {
  event.preventDefault()
  ui.hideSignUp()
  ui.showSignIn()
}

const onSwitchToSignUp = (event) => {
  event.preventDefault()
  ui.hideSignIn()
  ui.showSignUp()
}

const onSignIn = event => {
}

const onSignUp = event => {

}

module.exports = {
  onSwitchToSignIn,
  onSwitchToSignUp,
  onSignIn,
  onSignUp
}
