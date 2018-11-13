// config.js

'use strict'

let apiUrl
const apiUrls = {
  oldDevelopment: 'https://tic-tac-toe-wdi.herokuapp.com',
  development: 'https://stormy-atoll-66060.herokuapp.com',
  oldProduction: 'https://aqueous-atoll-85096.herokuapp.com',
  production: 'https://stormy-atoll-66060.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
