// store.js

'use strict'

/////////////////////////
//                     //
//  Current User Data  //
//                     //
/////////////////////////

let currentLoadPage = 0
let totalLoadPages = 0
let oColor = '#0000ff'
let xColor = '#ff0000'

let game = {
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
  password: '',
  token: '',
  games: []
}

///////////////////////////////
//                           //
//  Current Game State Data  //
//                           //
///////////////////////////////

let currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let currentPlayer = ''

/////////////////////////////
//                         //
//  Current Game Settings  //
//                         //
/////////////////////////////

let firstPlayer = ''
let opponent = ''
let aiDifficulty = '0'
let multiplayerRole = ''

/////////////////////
//                 //
//  Misc. Globals  //
//                 //
/////////////////////

let currentClickEvent

module.exports = {
  // current user data
  currentLoadPage,
  totalLoadPages,
  game,
  user,
  oColor,
  xColor,
  // current game state
  currentBoard,
  currentPlayer,
  // current game settings
  firstPlayer,
  opponent,
  aiDifficulty,
  multiplayerRole,
  // misc globals
  currentClickEvent
}
