'use strict'

// current user data

let currentLoadPage = 0
let totalLoadPages = 0
let oColor = "#00f"
let xColor = "#f00"

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

const user = {
  id: 0,
  email: '',
  token: '',
  games: []
}

// current game state
let currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let currentPlayer = ''

// settings
let firstPlayer = ''
let opponent = ''
let aiDifficulty = '0'

// misc globals

let currentClickEvent

module.exports = {
  // current user data
  currentLoadPage,
  totalLoadPages,
  game,
  user,
  // current game state
  currentBoard,
  currentPlayer,
  // settings
  firstPlayer,
  opponent,
  aiDifficulty,
  oColor,
  xColor,
  // misc globals
  currentClickEvent
}
