const store = require('./store.js')

//
//
// UI functions that deal with the LOAD views
//
//

const handleGameListSuccess = () => {
  $('.game-list').html('')
  $('.board-plus-message').addClass('invisible')
  $('.load-view').removeClass('invisible')
  const data = store.user
  if (data.games.length > 0) {
    store.totalLoadPages = Math.ceil((data.games.length / 9)) - 1
  }
  if (data.games.length === 0) {
    $('.game-list').text('No games found')
  } else if (data.games.length < 9) {
    const startPoint = 0
    const endPoint = data.games.length
    displayLoadedBoard(startPoint, endPoint)
  } else if (data.games.length >= 9) {
    const startPoint = 0
    const endPoint = 9
    displayLoadedBoard(startPoint, endPoint)
  }
  updatePageArrows()
  // if (data.games.length > 9) {
  //   setLoadBoardDimensions(9)
  // } else if (data.games.length > 0) {
  //   setLoadBoardDimensions(data.games.length)
  // }
}

const handleLoadGameSuccess = data => {

}

const handleCreateNewGameFailure = data => {
  console.log('New game failed to create!')
}

const displayLoadedBoard = (startPoint, endPoint) => {
  const data = store.user
  $('.game-list')[0].innerHTML = ''
  for (let i = startPoint; i < endPoint; i++) {
    $('.game-list')[0].innerHTML += `
    <div class="load-board" dataId="${data.games[i].id}">
      <div class="row">
        <div class="load-div load-div0">${data.games[i].cells[0]}</div>
        <div class="load-div load-div1">${data.games[i].cells[1]}</div>
        <div class="load-div load-div2">${data.games[i].cells[2]}</div>
      </div>
      <div class="row">
        <div class="load-div load-div3">${data.games[i].cells[3]}</div>
        <div class="load-div load-div4">${data.games[i].cells[4]}</div>
        <div class="load-div load-div5">${data.games[i].cells[5]}</div>
      </div>
      <div class="row">
        <div class="load-div load-div6">${data.games[i].cells[6]}</div>
        <div class="load-div load-div7">${data.games[i].cells[7]}</div>
        <div class="load-div load-div8">${data.games[i].cells[8]}</div>
      </div>`
  }
  setLoadBoardColors()
}

const setLoadBoardColors = () => {
  const loadDivs = document.getElementsByClassName('load-div')
  console.log(loadDivs)
  console.log(loadDivs[1].innerHTML)
  for (let i = 0; i < loadDivs.length; i++) {
    if (loadDivs[i].innerHTML === 'x') {
      loadDivs[i].innerHTML = `<p style="color:${store.xColor}">x</p>`
    } else if (loadDivs[i].innerHTML === 'o') {
      loadDivs[i].innerHTML = `<p style="color:${store.oColor}">o</p>`
    }
  }
}

const updatePageArrows = () => {
  console.log('totalLoadPages is', store.totalLoadPages)
  console.log('currentLoadPage is', store.currentLoadPage)
  if (store.totalLoadPages === 0) {
    $('#previous-load-page-arrow').addClass('invisible')
    $('#next-load-page-arrow').addClass('invisible')
    $('#current-page-display').addClass('invisible')
  } else {
    $('#current-page-display').removeClass('invisible')
    $('#current-page-display').text(`(${store.currentLoadPage + 1} / ${store.totalLoadPages + 1})`)
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
  const data = store.user
  store.currentLoadPage++
  const startPoint = store.currentLoadPage * 9
  const endPoint = startPoint + (data.games.length - startPoint)
  console.log('startPoint is', startPoint)
  console.log('endPoint is', endPoint)
  displayLoadedBoard(startPoint, endPoint)
  updatePageArrows()
  // setLoadBoardDimensions(data.games.length - startPoint)
}

const displayPreviousLoadPage = () => {
  store.currentLoadPage--
  const startPoint = store.currentLoadPage * 9
  const endPoint = startPoint + 9
  displayLoadedBoard(startPoint, endPoint)
  updatePageArrows()
  // setLoadBoardDimensions(9)
}

// const setLoadBoardDimensions = numOfBoards => {
//   let dimension
//   if (numOfBoards < 3) {
//     dimension = Math.floor((1 / numOfBoards) * 100)
//   } else {
//     dimension = Math.floor((1 / 4) * 100)
//   }
//   console.log('dimension is', dimension)
//   for (let i = 0; i < numOfBoards; i++) {
//     document.getElementsByClassName('load-board')[i].style.width = `${dimension}%`
//     document.getElementsByClassName('load-board')[i].style.height = `${dimension}%`
//   }
// }

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
  store.user.id = 0
  store.user.email = ''
  store.user.token = ''
  store.user.games = []
  store.currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  store.currentPlayer = ''
  $('.board-message').html('')
  $('.sign-out-message').html('<p class="green">Signed out</p>')
  $('#load-game-nav-button').toggleClass('invisible')
  $('#log-in-nav-button').toggleClass('invisible')
  $('#save-warning').toggleClass('invisible')
  $('#sign-out-nav-button').toggleClass('invisible')
  $('#user-profile-nav-button').toggleClass('invisible')
  updateBoardDisplay()
  showBoard()
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
  $('.board-plus-message').addClass('invisible')
}

const showBoard = function () {
  $('.board-plus-message').removeClass('invisible')
  $('.load-view').addClass('invisible')
}

const showPlayerTurn = function () {
  if (store.currentPlayer === 'playerOne') {
    $('.board-message').html(`<p><scan style="color:${store.xColor}">Player One</scan>'s Turn</p>`)
  } else {
    $('.board-message').html(`<p><scan style="color:${store.oColor}">Player Two</scan>'s Turn</p>`)
  }
}

const showPlayerWin = function (player) {
  if (player === 'playerOne') {
    $('.board-message').html(`<p><scan style="color:${store.xColor}">Player One</scan> Wins!</p>`)
  } else {
    $('.board-message').html(`<p><scan style="color:${store.oColor}">Player Two</scan> Wins!</p>`)
  }
}

const showPlayerTie = function (player) {
  $('.board-message').html(`<p>Tie!</p>`)
}

// updateBoardDisplay() updates the display board to match the current board state

const updateBoardDisplay = function () {
  for (let i = 0; i < 9; i++) {
    if (store.currentBoard[i] === 'x') {
      document.getElementById(i).innerHTML = `<p style="color:${store.xColor}">X</p>`
    }
    if (store.currentBoard[i] === 'o') {
      document.getElementById(i).innerHTML = `<p style="color:${store.oColor}">O</p>`
    }
    if (store.currentBoard[i] !== 'x' && store.currentBoard[i] !== 'o') {
      document.getElementById(i).innerHTML = ''
    }
  }
}

module.exports = {
  // NEW game UI functions
  handleCreateNewGameFailure,
  // LOAD view UI functions
  handleGameListSuccess,
  handleLoadGameSuccess,
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
