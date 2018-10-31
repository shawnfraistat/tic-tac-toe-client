'use strict'

let apiUrl
const apiUrls = {
  development: 'http://tic-tac-toe.wdibos.com',
  production: 'https://aqueous-atoll-85096.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
