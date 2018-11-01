const store = require('./store.js')

const testOne = {
  "games": [
    {
      "id": 1,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 2,
      "cells": ["","","","","","","","",""],
      "over": false,
      "player_x": {
        "id": 3,
        "email": "dna@dna.com"
      },
      "player_o": {
        "id": 1,
        "email": "and@and.com"
      }
    },
    {
      "id": 3,
      "cells": ["","","","","","","","",""],
      "over": false,
      "player_x": {
        "id": 3,
        "email": "dna@dna.com"
      },
      "player_o": {
        "id": 1,
        "email": "and@and.com"
      }
    },
    {
      "id": 4,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 5,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 6,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 7,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 8,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 9,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 10,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 11,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 12,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 13,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
    {
      "id": 14,
      "cells": ["o","x","o","x","o","x","o","x","o"],
      "over": true,
      "player_x": {
        "id": 1,
        "email": "and@and.com"
      },
      "player_o": {
        "id": 3,
        "email": "dna@dna.com"
      }
    },
  ]
}

//
//
// UI functions that deal with the LOAD views
//
//

const handleGameListSuccess = () => {
  const data = testOne
  store.totalLoadPages = Math.ceil((data.games.length / 9)) - 1
  if (data.games.length === 0) {
    $('.game-list').text('No games found')
  } else if (data.games.length < 9) {
    for (let i = 0; i < data.games.length; i++) {
      $('.game-list')[0].innerHTML += `
      <div class="load-board">
        <div class="row">
          <div id="0" class="load-div0">${data.games[i].cells[0]}</div>
          <div id="1" class="load-div1">${data.games[i].cells[1]}</div>
          <div id="2" class="load-div2">${data.games[i].cells[2]}</div>
        </div>
        <div class="row">
          <div id="3" class="load-div3">${data.games[i].cells[3]}</div>
          <div id="4" class="load-div4">${data.games[i].cells[4]}</div>
          <div id="5" class="load-div5">${data.games[i].cells[5]}</div>
        </div>
        <div class="row">
          <div id="6" class="load-div6">${data.games[i].cells[6]}</div>
          <div id="7" class="load-div7">${data.games[i].cells[7]}</div>
          <div id="8" class="load-div8">${data.games[i].cells[8]}</div>
        </div>`
    }
  } else if (data.games.length >= 9) {
    for (let i = 0; i < 9; i++) {
      $('.game-list')[0].innerHTML += `
      <div class="load-board">
        <div class="row">
          <div id="0" class="load-div0">${data.games[i].cells[0]}</div>
          <div id="1" class="load-div1">${data.games[i].cells[1]}</div>
          <div id="2" class="load-div2">${data.games[i].cells[2]}</div>
        </div>
        <div class="row">
          <div id="3" class="load-div3">${data.games[i].cells[3]}</div>
          <div id="4" class="load-div4">${data.games[i].cells[4]}</div>
          <div id="5" class="load-div5">${data.games[i].cells[5]}</div>
        </div>
        <div class="row">
          <div id="6" class="load-div6">${data.games[i].cells[6]}</div>
          <div id="7" class="load-div7">${data.games[i].cells[7]}</div>
          <div id="8" class="load-div8">${data.games[i].cells[8]}</div>
        </div>`
    }
    updatePageArrows()
  }
  setLoadBoardDimensions(data.games.length)
  // setLoadBoardColors()
}

const updatePageArrows = () => {
  console.log('totalLoadPages is', store.totalLoadPages)
  console.log('currentLoadPage is', store.currentLoadPage)
  if (store.totalLoadPages === 0) {
    $('#previous-load-page-arrow').addClass('invisible')
    $('#next-load-page-arrow').addClass('invisible')
  }
  if (store.currentLoadPage < store.totalLoadPages) {
    $('#next-load-page-arrow').removeClass('invisible')
  } else {
    $('#next-load-page-arrow').addClass('invisible')
  }
  if (store.currentLoadPage > 0) {
    $('#previous-load-page-arrow').removeClass('invisible')
  } else {
    $('#previous-load-page-arrow').addClass('invisible')
  }
}

const displayNextLoadPage = () => {
  const data = testOne
  store.currentLoadPage++
  const startPoint = store.currentLoadPage * 9
  const endPoint = startPoint + (data.games.length - startPoint)
  console.log('startPoint is', startPoint)
  console.log('endPoint is', endPoint)
  $('.game-list')[0].innerHTML = ''
  for (let i = startPoint; i < endPoint; i++) {
    $('.game-list')[0].innerHTML += `
    <div class="load-board">
      <div class="row">
        <div id="0" class="load-div0">${data.games[i].cells[0]}</div>
        <div id="1" class="load-div1">${data.games[i].cells[1]}</div>
        <div id="2" class="load-div2">${data.games[i].cells[2]}</div>
      </div>
      <div class="row">
        <div id="3" class="load-div3">${data.games[i].cells[3]}</div>
        <div id="4" class="load-div4">${data.games[i].cells[4]}</div>
        <div id="5" class="load-div5">${data.games[i].cells[5]}</div>
      </div>
      <div class="row">
        <div id="6" class="load-div6">${data.games[i].cells[6]}</div>
        <div id="7" class="load-div7">${data.games[i].cells[7]}</div>
        <div id="8" class="load-div8">${data.games[i].cells[8]}</div>
      </div>`
  }
  updatePageArrows()
}

const displayPreviousLoadPage = () => {
  const data = testOne
  store.currentLoadPage--
  const startPoint = store.currentLoadPage * 9
  $('.game-list')[0].innerHTML = ''
  for (let i = startPoint; i < startPoint + 9; i++) {
    $('.game-list')[0].innerHTML += `
    <div class="load-board">
      <div class="row">
        <div id="0" class="load-div0">${data.games[i].cells[0]}</div>
        <div id="1" class="load-div1">${data.games[i].cells[1]}</div>
        <div id="2" class="load-div2">${data.games[i].cells[2]}</div>
      </div>
      <div class="row">
        <div id="3" class="load-div3">${data.games[i].cells[3]}</div>
        <div id="4" class="load-div4">${data.games[i].cells[4]}</div>
        <div id="5" class="load-div5">${data.games[i].cells[5]}</div>
      </div>
      <div class="row">
        <div id="6" class="load-div6">${data.games[i].cells[6]}</div>
        <div id="7" class="load-div7">${data.games[i].cells[7]}</div>
        <div id="8" class="load-div8">${data.games[i].cells[8]}</div>
      </div>`
  }
  updatePageArrows()
}

const setLoadBoardDimensions = numOfBoards => {
  let dimension
  if (numOfBoards <= 3) {
    dimension = Math.floor((1 / numOfBoards) * 100)
  } else {
    dimension = Math.floor((1 / 3) * 100)
  }
  console.log('dimension is', dimension)
  // for (let i = 0; i < numOfBoards; i++) {
  //   document.getElementsByClassName('load-board')[i].style.width = `${dimension}%`
  //   document.getElementsByClassName('load-board')[i].style.height = `${dimension}%`
  // }
}

//
//
// UI functions that deal with the SIGN-FORM views
//
//

const hideSignView = function () {
  $('.sign-view').addClass('invisible')
}

const showSignView = function () {
  $('.sign-view').removeClass('invisible')
}

const hideSignIn = function () {
  $('#sign-in').addClass('invisible')
  clearForms()
}

const showSignIn = function () {
  $('#sign-in').removeClass('invisible')
}

const hideSignUp = function () {
  $('#sign-up').addClass('invisible')
  clearForms()
}

const showSignUp = function () {
  $('#sign-up').removeClass('invisible')
}

const handleSignInSuccess = event => {
  $('.sign-in-message').html('<p class="sign-in-message green">Signed in!</p>')
  $('#load-game-nav-button').toggleClass('invisible')
  $('#log-in-nav-button').toggleClass('invisible')
  $('#save-warning').toggleClass('invisible')
  $('#sign-out-nav-button').toggleClass('invisible')
  $('#user-profile-nav-button').toggleClass('invisible')
  console.log(event)
}

const handleSignInFailure = event => {
  $('.sign-in-message').html('<p class="sign-in-message red">Invalid sign in</p>')
  console.log(event)
}

const handleSignOutSuccess = () => {
  $('.sign-out-message').html('<p class="green">Signed out</p>')
  $('#load-game-nav-button').toggleClass('invisible')
  $('#log-in-nav-button').toggleClass('invisible')
  $('#save-warning').toggleClass('invisible')
  $('#sign-out-nav-button').toggleClass('invisible')
  $('#user-profile-nav-button').toggleClass('invisible')
}

const handleSignOutFailure = event => {
  $('.sign-out-message').html('<p class="green">Failed to sign out</p>')
  console.log(event)
}

const handleSignUpSuccess = event => {
  $('.sign-up-message').html('<p class="sign-up-message green">New account created</p>')
  console.log(event)
}

const handleSignUpFailure = event => {
  $('.sign-up-message').html('<p class="sign-up-message red">Invalid sign up</p>')
  console.log(event)
}

const clearForms = () => {
  document.getElementById('sign-up').reset()
  $('.sign-up-message').html('<p class="sign-up-message"></p>')
  document.getElementById('sign-in').reset()
  $('.sign-in-message').html('<p class="sign-in-message"></p>')
}

const toggleAIDifficultyRadios = () => {
  const buttons = $('input[name="difficulty"]')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].toggleAttribute('disabled')
  }
}

//
//
// UI functions that deal with the USER view
//
//

const showUserView = function () {
}



//
//
// UI functions that deal with the GAME views
//
//

const hideBoard = function () {
  $('.board').addClass('invisible')
}

const showBoard = function () {
  $('.board').removeClass('invisible')
}

const showPlayerTurn = function () {
  if (store.currentPlayer === 'playerOne') {
    $('.board-message').html(`<p><scan class="x-color">Player One</scan>'s Turn</p>`)
  } else {
    $('.board-message').html(`<p><scan class="o-color">Player Two</scan>'s Turn</p>`)
  }
}

const showPlayerWin = function (player) {
  if (player === 'playerOne') {
    $('.board-message').html(`<p><scan class="x-color">Player One</scan> Wins!</p>`)
  } else {
    $('.board-message').html(`<p><scan class="o-color">Player Two</scan> Wins!</p>`)
  }
}

const showPlayerTie = function (player) {
  $('.board-message').html(`<p>Tie!</p>`)
}

// updateBoardDisplay() updates the display board to match the current board state

const updateBoardDisplay = function () {
  for (let i = 0; i < 9; i++) {
    if (store.currentBoard[i] === 'x') {
      document.getElementById(i).innerHTML = '<p class="x-color">X</p>'
    }
    if (store.currentBoard[i] === 'o') {
      document.getElementById(i).innerHTML = '<p class="o-color">O</p>'
    }
    if (store.currentBoard[i] !== 'x' && store.currentBoard[i] !== 'o') {
      document.getElementById(i).innerHTML = ''
    }
  }
}

module.exports = {
  // LOAD view UI functions
  handleGameListSuccess,
  displayNextLoadPage,
  displayPreviousLoadPage,
  // USER view UI functions
  hideSignView,
  showSignView,
  hideSignIn,
  showSignIn,
  hideSignUp,
  showSignUp,
  handleSignInSuccess,
  handleSignInFailure,
  handleSignUpSuccess,
  handleSignUpFailure,
  handleSignOutSuccess,
  handleSignOutFailure,
  toggleAIDifficultyRadios,
  // GAME view UI functions
  hideBoard,
  showBoard,
  updateBoardDisplay,
  showPlayerTurn,
  showPlayerWin,
  showPlayerTie
}
