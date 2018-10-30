// updateBoardDisplay() updates the display board to match the current board state

const hideBoard = function () {
  $('.board').addClass('invisible')
}

const showBoard = function () {
  $('.board').removeClass('invisible')
}

const hideSignIn = function () {
  $('#sign-in').addClass('invisible')
}

const showSignIn = function () {
  $('#sign-in').removeClass('invisible')
}

const hideSignUp = function () {
  $('#sign-up').addClass('invisible')
}

const showSignUp = function () {
  $('#sign-up').removeClass('invisible')
}

const updateBoardDisplay = function (currentBoard) {
  for (let i = 0; i < 9; i++) {
    if (currentBoard[i] === 'x') {
      document.getElementById(i).innerHTML = '<p class="x-color">X</p>'
    }
    if (currentBoard[i] === 'o') {
      document.getElementById(i).innerHTML = '<p class="o-color">O</p>'
    }
    if (currentBoard[i] !== 'x' && currentBoard[i] !== 'o') {
      document.getElementById(i).innerHTML = ''
    }
  }
}

module.exports = {
  hideBoard,
  showBoard,
  showSignIn,
  hideSignIn,
  showSignUp,
  hideSignUp,
  updateBoardDisplay
}
