//main.js


//indebted to https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 for solution

let originalBoard = ["X", "1", "X", "O", "4", "5", "6", "O", "O"];
let turn = 1;

var takeAITurn = function (boardToEval) {
	// let availSpaces = getSpaces(boardToEval);
	let bestMoveList = buildMoveTree(boardToEval, "ai");
	console.log("bestMoveList is ");
	console.log(bestMoveList);
	originalBoard[bestMoveList.index] = "X";
	updateBoardDisplay();
	if (terminalCheck(originalBoard, "ai") === "aiwin") {
		alert("You lose!");
	} else if (terminalCheck(originalBoard, "ai") === "tie") {
		alert("Tie!");
	} else if (terminalCheck(originalBoard, "human") === "humanwin") {
		alert("You win!");
	} else {
		turn++;
		for (var i = 0; i < 9; i++) {
		document.getElementById(i).addEventListener("click", takeHumanTurn);
		}
	}
};

var updateBoardDisplay = function () {
	for (var i = 0; i < 9; i++) {
		document.getElementById(i).innerHTML = originalBoard[i];
	}	
};

var getBestMove = function (moves, player) {
	let bestMove;
	if (player === "ai") {
	    let bestScore = -10000;
	    for (let i = 0; i < moves.length; i++){
	      if (moves[i].score > bestScore) {
	        bestScore = moves[i].score;
	        console.log("updated best move to be" + i);
	        bestMove = i;
	      }
	   }
	} else {

// else loop over the moves and choose the move with the lowest score
		let bestScore = 10000;
		for(var i = 0; i < moves.length; i++){
		  if(moves[i].score < bestScore){
		    bestScore = moves[i].score;
		    bestMove = i;
		  }
		}
	}
    console.log("getBestMove is about to return " + bestMove);
	return bestMove;
};

var takeHumanTurn = function (boardToEval) {
	originalBoard[this.id] = "O";
	console.log(originalBoard);
	updateBoardDisplay();
	if (terminalCheck(originalBoard, "human") === "humanwin") {
		alert("You win!");
	} else if (terminalCheck(originalBoard, "human") === "tie") {
		alert("Tie!");
	} else {
		takeAITurn(originalBoard);
	}
};

//turnEval checks to see if a player has a move that ends the round. 

var buildMoveTree = function (boardToEval, player) {
	let moves = [];
	let nextPlayer = "";
	let thisAvailSpaces = getSpaces(boardToEval);
	if (terminalCheck(boardToEval, "ai") === "aiwin") {
		return { score: 10 }; 
	} else if (terminalCheck(boardToEval, "human") === "humanwin") {
		return { score: -10 }
	} else if (thisAvailSpaces.length === 0) {
		return { score: 0 }
	}
	console.log("thisAvailSpaces is " + thisAvailSpaces);
	for (let i = 0; i < thisAvailSpaces.length; i++) {
			console.log("boardToEval[thisAvailSpaces[i]] is " + boardToEval[thisAvailSpaces[i]])
			let move = {};
			move.index = boardToEval[thisAvailSpaces[i]];
			console.log("move index is " + move.index)
			if (player === "ai") {
				boardToEval[thisAvailSpaces[i]] = "X";
				nextPlayer = "human";
			} else if (player === "human") {
				boardToEval[thisAvailSpaces[i]] = "O";
				nextPlayer = "ai";
			}
			console.log(player + " this turn, " + nextPlayer + " next turn");
			let result = buildMoveTree(boardToEval, nextPlayer);
			console.log(result);
			console.log("result score is " + result.score);
			move.score = result.score;
			console.log(move);
			console.log("move score is" + move.score);
			boardToEval[thisAvailSpaces[i]] = move.index;
			console.log("boardToEval is " + boardToEval);
			moves.push(move);
	}
	console.log("moves is ");
	console.log(moves);
	let bestMove = getBestMove(moves, nextPlayer);
  	


  	console.log("bestMove is ")
  	console.log(bestMove);
  	return moves[bestMove];
};
	
//evalSpace() takes a boardToEval, a space, and a player. It imagines the player making a move in the given space. It then returns an updated board.

var evalSpace = function (boardToEval, space, player) {
	var currentBoard = [];
	for (var i = 0; i < boardToEval.length; i++) {
		currentBoard.push(boardToEval[i]);
	}
	if (player === "ai") {
		currentBoard[space] = "X";
	} else if (player === "human") {
		currentBoard[space] = "O";
	}
	return currentBoard;
};


//Checks to see if the board is in a terminal state

var terminalCheck = function (boardToEval, player) {
	var availSpaces = getSpaces(boardToEval);
	var playerMark;
	if (player === "human") {
		var playerMark = "O";
	} else if (player === "ai") {
		var playerMark = "X";
	}
	if (boardToEval[0] == playerMark && boardToEval[1] == playerMark && boardToEval[2] == playerMark) {
		// console.log("first row victory");
		return player + "win";
	} else if (boardToEval[3] == playerMark && boardToEval[4] == playerMark && boardToEval[5] == playerMark) {
		// console.log("second row victory");
		return player + "win";
	} else if (boardToEval[6] == playerMark && boardToEval[7] == playerMark && boardToEval[8] == playerMark) {
		// console.log("third row victory");
		return player + "win";
	} else if (boardToEval[0] == playerMark && boardToEval[3] == playerMark && boardToEval[6] == playerMark) {
		// console.log("first column victory");
		return player + "win";
	} else if (boardToEval[1] == playerMark && boardToEval[4] == playerMark && boardToEval[7] == playerMark) {
		// console.log("second column victory");
		return player + "win";
	} else if (boardToEval[2] == playerMark && boardToEval[5] == playerMark && boardToEval[8] == playerMark) {
		// console.log("third column victory");
		return player + "win";
	} else if (boardToEval[0] == playerMark && boardToEval[4] == playerMark && boardToEval[8] == playerMark) {
		// console.log("top left to bottom right diagonal victory");
		return player + "win";
	} else if (boardToEval[2] == playerMark && boardToEval[4] == playerMark && boardToEval[6] == playerMark) {
		// console.log("top right to bottom left diagonal victory");
		return player + "win";
	} else if (availSpaces.length === 0) {
		return "tie";
	} else if (availSpaces.length > 0) {
		return "continue";
	}
};
		

//Get available spaces

var getSpaces = function (boardToEval) {
	let availSpaces = [];
	for (var i = 0; i < boardToEval.length; i++) {
		if (boardToEval[i] != "O" && boardToEval[i] != "X") {
			availSpaces.push(i);
		}
	}
	return availSpaces;
};


//On page load code to run.

updateBoardDisplay();
takeAITurn(originalBoard);

