'use strict'

// current user data

let currentLoadPage = 0
let totalLoadPages = 0

const game = {
  id: 0,
  cells: [],
  over: false,
  player_x: {
    id: 0,
    email: ''
  },
  player_o: null
}

const games = {

}

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
  // current user data
  currentLoadPage,
  totalLoadPages,
  game,
  games,
  user,
  // current game state
  currentBoard,
  currentPlayer,
  // settings
  firstPlayer,
  opponent,
  aiDifficulty
}
