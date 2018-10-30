// updateBoardDisplay() updates the display board to match the current board state

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
  updateBoardDisplay
}
