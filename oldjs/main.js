//main2.js

//Indebted to https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 for minimax idea and coding solution

const ai = require('./ai.js')

let origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let difficultySetting = 2;

// takeTurnHuman() is activated when a human player clicks on a spot. It updates the board and checks to see if the human won or tied. Then it lets the ai player go.

const takeHumanTurn = function (boardToEval) {
	origBoard[this.id] = "O"
	console.log(origBoard)
	updateBoardDisplay()
	if (terminalCheck(origBoard, "human") === "humanwin") {
		alert("You win!")
	} else if (terminalCheck(origBoard, "human") === "tie") {
		alert("Tie!")
	} else {
		ai.takeAITurn(origBoard)
	}
}


// updateBoardDisplay() updates the display board to match the current board state

const updateBoardDisplay = function () {
	for (let i = 0; i < 9; i++) {
		if (origBoard[i] === "X") {
			document.getElementById(i).innerHTML = "X"
		} else if (origBoard[i] === "O") {
			document.getElementById(i).innerHTML = "O"
		} else {
			document.getElementById(i).innerHTML = "~"
		}
	}
}


//terminalCheck() receives a version of the board to check along with the current player; it then returns whether the board has reached an end state (either a tie or player victory)

const terminalCheck = function (boardToEval, player) {
	let availSpaces = getAvailableSpaces(boardToEval)
	let playerMark
	if (player === "human") {
		var playerMark = "O"
	} else if (player === "ai") {
		var playerMark = "X"
	}
	if (boardToEval[0] == playerMark && boardToEval[1] == playerMark && boardToEval[2] == playerMark) {
		// console.log("first row victory")
		return player + "win"
	} else if (boardToEval[3] == playerMark && boardToEval[4] == playerMark && boardToEval[5] == playerMark) {
		// console.log("second row victory")
		return player + "win"
	} else if (boardToEval[6] == playerMark && boardToEval[7] == playerMark && boardToEval[8] == playerMark) {
		// console.log("third row victory")
		return player + "win"
	} else if (boardToEval[0] == playerMark && boardToEval[3] == playerMark && boardToEval[6] == playerMark) {
		// console.log("first column victory")
		return player + "win"
	} else if (boardToEval[1] == playerMark && boardToEval[4] == playerMark && boardToEval[7] == playerMark) {
		// console.log("second column victory")
		return player + "win"
	} else if (boardToEval[2] == playerMark && boardToEval[5] == playerMark && boardToEval[8] == playerMark) {
		// console.log("third column victory")
		return player + "win"
	} else if (boardToEval[0] == playerMark && boardToEval[4] == playerMark && boardToEval[8] == playerMark) {
		// console.log("top left to bottom right diagonal victory")
		return player + "win"
	} else if (boardToEval[2] == playerMark && boardToEval[4] == playerMark && boardToEval[6] == playerMark) {
		// console.log("top right to bottom left diagonal victory")
		return player + "win"
	} else if (availSpaces.length === 0) {
		return "tie"
	} else if (availSpaces.length > 0) {
		return "continue"
	}
}

updateBoardDisplay()
ai.takeAITurn(origBoard)
