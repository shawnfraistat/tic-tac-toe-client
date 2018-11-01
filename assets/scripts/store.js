'use strict'

const user = {
  id: 0,
  email: '',
  token: ''
}

// current game state
const currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let currentPlayer = ""

// settings
let firstPlayer = ""
let opponent = ""
let aiDifficulty = 0

module.exports = {

  currentBoard,
  currentPlayer,
  firstPlayer,
  opponent,
  aiDifficulty,
  user
}
