// Indebted to https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 for minimax idea and coding solution

// getAIMove() is used to calculate a move for the AI. It uses a different logic depending on the difficulty setting.

const store = require('./store')

const getAIMove = function (boardToEval) {
  let myMove
  switch (store.aiDifficulty) {
    case '0':
      myMove = { index: 0 }
      myMove.index = randomChoice(boardToEval)
      break
    case '1':
      myMove = { index: 0 }
      myMove.index = randomChoice(boardToEval)
      if (goForKill(boardToEval) != null) {
        myMove.index = goForKill(boardToEval)
      } else if (impendingDisaster(boardToEval) != null) {
        myMove.index = impendingDisaster(boardToEval)
      }
      break
    case '2':
      myMove = minimax(boardToEval, 'playerTwo')
      if (goForKill(boardToEval) != null) {
        myMove.index = goForKill(boardToEval)
      }
  }
  return myMove.index
}

// getAvailableSpaces searches through the board, creates an array filled with the indices of the empty spaces, and returns the array

const getAvailableSpaces = function (boardToEval) {
  const availSpaces = []
  for (let i = 0; i < boardToEval.length; i++) {
    if (boardToEval[i] !== 'o' && boardToEval[i] !== 'x') {
      availSpaces.push(i)
    }
  }
  return availSpaces
}

// randomChoice() is used as part of the easy and medium difficulty ai logics. It chooses a random spot from among the available spots on the board.

const randomChoice = function (boardToEval) {
  const availSpots = getAvailableSpaces(boardToEval)
  const randomNumber = Math.floor(Math.random() * (availSpots.length))
  if (availSpots.length === 1) {
    return availSpots[0]
  } else {
    return availSpots[randomNumber]
  }
}

/* goForKill() is used to check whether the computer has a move that will the game for it this turn.
This is used in two cases: (1) as part of the "medium" difficulty ai logic; (2) to correct a weird behavior with the "impossible" difficulty game logic
For medium difficulty, the ai just plays randomly unless it sees an immediate winning move for itself or the player. It calls goForKill to  see if it has a winning move.
For impossible difficulty, the computer evaluates branches on the move tree in such a way as to be indifferent between choosing a move that will make it win
this turn vs. a move that guarantees it a win in the future.
To prevent the ai from screwing around with the human player for a few turns, goForKill() checks to see if it has an immediate winning move and forces the computer to take it. */

const goForKill = function (boardToEval) {
  const availSpots = getAvailableSpaces(boardToEval)
  for (let i = 0; i < availSpots.length; i++) {
    boardToEval[availSpots[i]] = 'o'
    const checkResult = terminalCheck(boardToEval, 'playerTwo')
    if (checkResult === 'playerTwoWin') {
      boardToEval[availSpots[i]] = availSpots[i]
      return availSpots[i]
    }
    boardToEval[availSpots[i]] = availSpots[i]
  }
  return null
}

// impendingDisaster() is used as part of the "medium" difficulty ai logic. The computer uses it to see if the player has a winning move next turn. If so, it blocks the move.

const impendingDisaster = function (boardToEval) {
  const availSpots = getAvailableSpaces(boardToEval)
  for (let i = 0; i < availSpots.length; i++) {
    boardToEval[availSpots[i]] = 'x'
    const checkResult = terminalCheck(boardToEval, 'playerOne')
    if (checkResult === 'playerOneWin') {
      boardToEval[availSpots[i]] = availSpots[i]
      return availSpots[i]
    }
    boardToEval[availSpots[i]] = availSpots[i]
  }
  return null
}

// the minimax function for the "impossible" difficulty settings, courtesy of freecodecamp; I've adapted it and annotated heavily

const minimax = function (boardToEval, player) {
  // declare nextPlayer, which will be set by if-else if statements later in function
  let nextPlayer = ''
  // declare moves array to collect the move objects the function will create later
  const moves = []
  // get available spaces on the board
  const availSpots = getAvailableSpaces(boardToEval)
  // check for the terminal states such as win, lose, and tie and return a value accordingly
  if (terminalCheck(boardToEval, 'playerTwo') === 'playerTwoWin') {
    return { score: 10 }
  } else if (terminalCheck(boardToEval, 'playerOne') === 'playerOneWin') {
    return { score: -10 }
  } else if (availSpots.length === 0) {
    return { score: 0 }
  }
  // if the board isn't already in a terminal state, loop through available spots to create an array of possible move objects with associated score and index values
  for (let i = 0; i < availSpots.length; i++) {
    // initialize a new move object
    const move = {}
    // sets the move index to whatever spot the computer's trying out; that way the move object it creates will be associated with the correct space on the board
    move.index = availSpots[i]
    // if we're considering what would happen if the ai moved here, mark the board spot with an "x"
    // then prepare to run this function again to see what would happen the turn after; alternate the player and consider the human's possible moves
    if (player === 'playerTwo') {
      boardToEval[availSpots[i]] = 'o'
      nextPlayer = 'playerOne'
    } else if (player === 'playerOne') {
      // if we're considering what would happen if the human moved here, mark the board spot with an "o"
      // then prepare to run this function again to see what would happen the turn after; alternate the player and consider the ai's possible moves
      boardToEval[availSpots[i]] = 'x'
      nextPlayer = 'playerTwo'
    }
    // check what the consequence of moving to availSpots[i] would be; if it ends the game, we'll get an immediate result.
    // if it doesn't end the game, the computer will go a level deeper, examining what would happen next turn after the next player goes,
    // and keep alternating till it hits an end game state
    const result = minimax(boardToEval, nextPlayer)
    // the move object we're preparing now gets whatever score we eventually found.
    move.score = result.score
    // now we've got a move object with an index corresponding to the available spot and a score coming from the end game state that results from that spot
    // since we provisionally marked the board to evaluate the consequences, we have to unmark it before we proceed
    boardToEval[availSpots[i]] = move.index
    // the moves array will store all the moves on this level and their associated score
    moves.push(move)
  }
  /* By now the computer's out of the for loop; at this point, it needs to assess all the move objects it's created.
  Each move object contains an index value referring to a space on the board, and it has a score associated with it that comes from
  checking the state of the board after the move: a 10 results from an AI win, a 0 from a tie, and a -10 from a human victory.

  What the ai doing here is intuitive enough if we're just thinking about what will happen as a consequence of its move this turn.
  It should pick a move object that has the highest score, and return that as the move it should take right now.

  But the code here has to be more complicated, because sometimes a move doesn't end the game immediately.
  In that case, this function is being called recursively. It needs to summarize the possibilities available wherever it is in the move tree
  and kick them back up a level for evaluation.

  The way it summarizes them is like this:
  (1) Is the AI assessing the possibilites that result from an AI turn? If so, it should push the BEST possibility up a level,
  because it knows it can take that possibility when the time comes.
  (2) But if the AI is assessing the possibilities that result from a human turn, it should push the WORST possibility (for the AI) up a level,
  acting on the assumption that the human player will take advantage of any opportunities the AI gives him/her.

  That's why the AI is going to go through the move tree, returning the move with the highest score if it's thinking about the moves on its turn, and
  returning the lowest score if it's thinking about the moves on the human's turn */
  let bestMove
  if (player === 'playerTwo') {
    let bestScore = -100 // doesn't matter what this number is; just want something low to get the ball rolling
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else { // this applies if it's the human's turn we're considering
    let bestScore = 100 // again, doesn't matter what this number is; just want something high to get the ball rolling
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  // now return the chosen move (object) from the moves array
  return moves[bestMove]
}

// terminalCheck() receives a version of the board to check along with the current player; it then returns whether the board has reached an end state (either a tie or player victory)

const terminalCheck = function (boardToEval, player) {
  const availSpaces = getAvailableSpaces(boardToEval)
  let playerMark
  if (player === 'playerOne') {
    playerMark = 'x'
  } else if (player === 'playerTwo') {
    playerMark = 'o'
  }
  if (boardToEval[0] === playerMark && boardToEval[1] === playerMark && boardToEval[2] === playerMark) {
    return player + 'Win'
  } else if (boardToEval[3] === playerMark && boardToEval[4] === playerMark && boardToEval[5] === playerMark) {
    return player + 'Win'
  } else if (boardToEval[6] === playerMark && boardToEval[7] === playerMark && boardToEval[8] === playerMark) {
    return player + 'Win'
  } else if (boardToEval[0] === playerMark && boardToEval[3] === playerMark && boardToEval[6] === playerMark) {
    return player + 'Win'
  } else if (boardToEval[1] === playerMark && boardToEval[4] === playerMark && boardToEval[7] === playerMark) {
    return player + 'Win'
  } else if (boardToEval[2] === playerMark && boardToEval[5] === playerMark && boardToEval[8] === playerMark) {
    return player + 'Win'
  } else if (boardToEval[0] === playerMark && boardToEval[4] === playerMark && boardToEval[8] === playerMark) {
    return player + 'Win'
  } else if (boardToEval[2] === playerMark && boardToEval[4] === playerMark && boardToEval[6] === playerMark) {
    return player + 'Win'
  } else if (availSpaces.length === 0) {
    return 'tie'
  } else {
    return 'continue'
  }
}

module.exports = {
  getAIMove,
  terminalCheck
}
