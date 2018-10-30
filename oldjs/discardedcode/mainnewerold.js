//main.js

let originalBoard = ["X", "~", "O", "~", "~", "~", "~", "~", "X"];
let moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let turn = 1;

var takeAITurn = function (boardToEval) {
	availSpaces = getSpaces(boardToEval);
	let callingSpace = [];
	turnEval(boardToEval, "ai", callingSpace);
	console.log("The moves are " + moves);
	let bestMove = getBestMove(boardToEval);
	console.log("The bestMove is " + bestMove);
	let leastBadMove = getLeastBadMove(boardToEval);
	console.log("The leastBadMove is " + leastBadMove);
	let firstBoard = evalSpace(boardToEval, bestMove, "ai");
	let secondBoard = evalSpace(boardToEval, leastBadMove, "human")
	if (terminalCheck(firstBoard, "ai") === "aiwin") {
		console.log("Playing bestMove");
		originalBoard[bestMove] = "X";
	} else if (terminalCheck(secondBoard, "human") === "humanwin") {
			originalBoard[leastBadMove] = "X";
			console.log("Playing leastBadMove");
	} else { 
		originalBoard[leastBadMove] = "X";
		console.log("As default, playing leastBadMove");
	}
	moves = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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

var getBestMove = function (boardToEval) {
	let unSpaces = getUnSpaces(boardToEval);
	for (var k = 0; k < unSpaces.length; k++) {
		moves[unSpaces[k]] = -1000000;
	}
	let highestValue = moves[0];
	for (var i = 1; i < moves.length; i++) {
	    if (moves[i] > highestValue) {
	      highestValue = moves[i];
	    }
    }
	for (var j = 0; j < 9; j++) {
		if (moves[j] === highestValue) {
			var bestMoveList = j;
		}
	}	return bestMoveList;
};

var getLeastBadMove = function (boardToEval) {
	let unSpaces = getUnSpaces(boardToEval);
	for (var k = 0; k < unSpaces.length; k++) {
		moves[unSpaces[k]] = 1000000;
	}
	let lowestValue = moves[0];
	for (var i = 1; i < moves.length; i++) {
	    if (moves[i] < lowestValue) {
	      lowestValue = moves[i];
	    }
    }
	for (var j = 0; j < 9; j++) {
		if (moves[j] === lowestValue) {
			var leastBadMoveList = j;
		}
	}
	return leastBadMoveList;
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


// var clearCallingSpace = function () {
// 	while (callingSpace.length > 0) {
// 		callingSpace.pop();
// 	}
// };

//turnEval checks to see if a player has a move that ends the round. 

var turnEval = function (boardToEval, player, callingSpace) {
	let spaceScore;
	let nextPlayer;
	var thisAvailSpaces = getSpaces(boardToEval);
	console.log("thisAvailSpaces is " + thisAvailSpaces);
	for (var i = 0; i < thisAvailSpaces.length; i++) {   										//go through every available space
		callingSpace.push(thisAvailSpaces[i]); 													//push to the array callingSpace the first space we're checking
		var currentBoard = evalSpace(boardToEval, thisAvailSpaces[i], player); 					//imagine a new board with that space marked by the current player
		var thisCheckResult = terminalCheck(currentBoard, player); 								//check what the score on that new board would be for the current player
		if (thisCheckResult === "aiwin") {                      								//if that result would be a computer victory, whooppee!
			spaceScore = 100;										//prepare a spaceScore proportional to how fast AI can execute the move
			let newScore = moves[callingSpace[0]] + spaceScore;									//create a new score that combines the spaceScore with the points already there
			moves[callingSpace[0]] = newScore;
			console.log("ai wins with callingSpace combo " + callingSpace);						//update score associated with the top calling number
			callingSpace.pop();											
		} else if (thisCheckResult === "humanwin") {
			spaceScore = -10;										//prepare a spaceScore proportional to how fast AI can execute the move
			let newScore = moves[callingSpace[0]] + spaceScore;									//create a new score that combines the spaceScore with the points already there
			moves[callingSpace[0]] = newScore;
			console.log("human wins with callingSpace combo " + callingSpace);													//update score associated with the top calling number
			callingSpace.pop();
		} else if (thisCheckResult === "tie") {
			spaceScore = 1;										//prepare a spaceScore proportional to how fast AI can execute the move
			let newScore = moves[callingSpace[0]] + spaceScore;									//create a new score that combines the spaceScore with the points already there
			moves[callingSpace[0]] = newScore;
			console.log("there's a tie with callingSpace combo " + callingSpace);													//update score associated with the top calling number
			callingSpace.pop();
			console.log("here's callingSpace after being popped" + callingSpace); 
		} else if (thisCheckResult === "continue") {
			if (player === "ai") {
			  nextPlayer = "human";
			} else if (player === "human") {
				nextPlayer = "ai";
			}
			console.log("continuing with callingSpace " + callingSpace);
			turnEval(currentBoard, nextPlayer, callingSpace);
			// console.log("the value of nextMoves is " + nextMoves);
			// if (nextMoves.length > 0 ) {
			// 	moves.push(nextMoves);
			// }
		}
	}
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

var getUnSpaces = function (boardToEval) {
	var unSpaces = [];
	for (var i = 0; i < boardToEval.length; i++) {
		if (boardToEval[i] == "O" || boardToEval[i] == "X") {
			unSpaces.push(i);
		}
	}
	return unSpaces;
};

//On page load code to run.

updateBoardDisplay();
takeAITurn(originalBoard);

