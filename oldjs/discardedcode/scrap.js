//scrap.js


if (score === 0) {
			for (let j = 0; j < thisAvailSpaces.length; j++) {
				if (thisAvailSpaces[j] != thisAvailSpaces[i]) {
					nowAvailSpaces.push(thisAvailSpaces[j])
				}
			}
			let currentBoard = 
			buildMoveTree(currentBoard)
		}
			f (nextPlayer == "ai") {
				boardToEval[availSpaces[j]] = "O";
				console.log("boardToEval[availSpaces[" + j + "]] is equal to " + boardToEval[availSpaces[j]]);
			} else if (nextPlayer == "human") {
				boardToEval[availSpaces[j]] = "X";
				console.log("boardToEval[availSpaces[" + j + "]] is equal to " + boardToEval[availSpaces[j]]);
			}
		var checkResult = terminalCheck(boardToEval, player);
		console.log("Within anticipateNextTurn, here's checkResult: " + checkResult);
		// while (checkResult == "continue") {
		// 	anticipateNextTurn(boardToEval, nextPlayer);
		// }
	}
	console.log("checkResult at the end of anticipateNextTurn is: " + checkResult);
	return checkResult;
};


if (player === "ai") {
			var spaceScore = evalSpace(currentBoard, space, "human");
		} else if (player === "human") {
			var spaceScore = evalSpace(currentBoard, space, "ai");
		}
	}

// //evalContinueOptions

// var evalContinueOptions = function (boardToEval, space, player) {
// 	availSpaces = getSpaces(boardToEval);
// 	for (var i = 0; i < availSpaces.length; i ++) {
// 		var spaceScore = evalSpace(availSpaces[i], player);
// 	}

// };


		var thisCheckResult = terminalCheck(currentBoard, player);
		console.log("first check result within evalBoard is: " + thisCheckResult);
		while (thisCheckResult === "continue") {
			thisCheckResult = anticipateNextTurn(currentBoard, player);
		}
		console.log("after while loop in evalBoard, thisCheckResult is " + thisCheckResult);
		if (thisCheckResult !== "continue") {
			console.log("within evalBoard, right before scoring, thisCheckResult is " + thisCheckResult);
			spaceScore = getScore(thisCheckResult);
			var move = { spaceNumber: thisAvailSpaces[i], moveScore: spaceScore };
			console.log(move);
			moves.push(move);


	thisCheckResult = anticipateNextTurn(currentBoard, player);

var anticipateNextTurn = function (boardToEval, player) {
	if (player === "ai") {
		var nextPlayer = "human";
	} else if (player === "human") {
		var nextPlayer = "ai";
	}
	console.log("Within anticipateNextTurn, here's boardToEval: " + boardToEval);
	availSpaces = getSpaces(boardToEval);
	for (var j = 0; j < availSpaces.length; j++) {	
		var currentBoard = evalSpace(boardToEval, availSpaces[j], nextPlayer);
		console.log("Anticipating move for: " + nextPlayer);
		var checkResult = terminalCheck(currentBoard, nextPlayer);
		console.log(nextPlayer + "'s next move would result in : " + checkResult);
		if (checkResult !== "continue") {
			console.log("About to return " + checkResult + "as thisCheckResult");
			return checkResult;
		} else if (checkResult === "continue") {
			while (checkResult === "continue") {
				checkResult = anticipateNextTurn(currentBoard, nextPlayer);
			}
		}
	}
};

player = "human";
	
	for (var j = 0; j < thisAvailSpaces.length; j++) {
		var currentBoard = evalSpace(boardToEval, thisAvailSpaces[j], player);
		var checkResult = terminalCheck(currentBoard, player);
		if (thisCheckResult === )
	}

	if (thisCheckResult === "humanwin") {
		spaceScore = getScore(thisCheckResult);
		console.log("spaceScore for a human win is " + spaceScore);
		var move = { spaceNumber: thisAvailSpaces[i], moveScore: spaceScore };
		console.log(move);
		moves.push(move);


		}

		var move = { spaceNumber: callingSpace[0], moveScore: spaceScore };
			console.log("The move about to be pushed is " + move.spaceNumber + ":" + move.moveScore);
			moves
			moves.push(move);

			var move = { spaceNumber: callingSpace[0], moveScore: spaceScore };

//evalBoard() looks at the current board state. 
//First, it calls getSpaces() to build a list of available spaces. 
//Second, it runs evalSpace() on each of the available spaces to see what the consequences would be of making a move there.
//Third . . .

var evalBoard = function (boardToEval, player) {
	console.log("Inside evalBoard");
	moves = turnEval(boardToEval, player);
	return moves;
};

var nextTurnEval = function (boardToEval, player) {
// 	var moves = [];
// 	var foundIt = false;
// 	var spaceScore;
// 	var thisAvailSpaces = getSpaces(boardToEval); //find out how many blank spots there on the board
// 	for (var i = 0; i < thisAvailSpaces.length; i++) { // go through every open spot
// 		var currentBoard = evalSpace(boardToEval, thisAvailSpaces[i], player); //for each open spot, imagine the player moved there
// 		var thisCheckResult = terminalCheck(currentBoard, player); //check what that new board would be like
// 		if (thisCheckResult === "aiwin") { //if the new board is one the AI wins on, save this move!
// 			console.log("spaceScore for an ai win is " + spaceScore);
// 			spaceScore = getScore(thisCheckResult);
// 			var move = { spaceNumber: thisAvailSpaces[i], moveScore: spaceScore };
// 			console.log(move);
// 			moves.push(move);
// 			break;
// 		} else if (thisCheckResult === "humanwin") { //if the new board is one the human wins on, flag this move with a negative score!
// 			console.log("spaceScore for an ai win is " + spaceScore);
// 			spaceScore = getScore(thisCheckResult);
// 			var move = { spaceNumber: thisAvailSpaces[i], moveScore: spaceScore };
// 			console.log(move);
// 			moves.push(move);
// 			break;
// 		} else if (thisCheckResult === "tie") { //if the new board is a tie, flag this move with a zero score!
// 			console.log("spaceScore for tie is " + spaceScore);
// 			spaceScore = getScore(thisCheckResult);
// 			var move = { spaceNumber: thisAvailSpaces[i], moveScore: spaceScore };
// 			console.log(move);
// 			moves.push(move);
// 			break;
// 		} else if (thisCheckResult === "continue") { //if the new board doesn't lead to anyone winning, things get complicated
// 			if (player === "ai") { //it's time to imagine the next turn, so switch the players around
// 			 var nextPlayer = "human";
// 			} else if (player === "human") {
// 				var nextPlayer = "ai";
// 			} 
// 			while (moves.length < 1) {
// 				moves.push(nextTurnEval(currentBoard, nextPlayer));
// 			}
// 		}		
// 	}
// 	return moves;
// };	

console.log("newMoves equals " + newMoves);
			for (var j = 0; j < newMoves.length; j++) {
				moves[j] += newMoves[j];
			}
			newMoves = [0, 0, 0, 0, 0, 0, 0, 0, 0];


	// }
	// if (turn % 2 === 1) {
		
	// } else {
	// 
	// 	originalBoard[leastBadMove] = "X";
	// }

		// if (availSpaces.length === 1) {
	// 	var bestMove = availSpaces[0];
	// 	console.log("Only one move! bestMove = " + bestMove);
	// } else {

		// originalBoard[leastBadMove] = "X";

		//alert("Terminal checked the AI and found " + terminalCheck(originalBoard, "ai"));

		//NOTES
//Having a problem where it doesn't prefer an immediate victory over a victory several moves later; maybe use availSpaces = getSpaces() within the scoring function to create a preference for shorter paths?


//NOTES
//Having a problem where it doesn't prefer an immediate victory over a victory several moves later; maybe use availSpaces = getSpaces() within the scoring function to create a preference for shorter paths?

//getScore scores checkResult, and calls evalSpace recursively if needed

var getScore = function (checkResult) {
	if (checkResult === "humanwin") {
		var spaceScore = -10;
	} else if (checkResult === "aiwin") {
		var spaceScore = 10;
	} else if (checkResult === "tie") {
		var spaceScore = 5;
	} else if (checkResult === "continue") {
		var spaceScore = 0;
	}
	return spaceScore;
};

			// 	if (callingSpace.length === 1) {
			// 		moves[callingSpace[0]] += 100000;       //100000;
			// 	}

//the old version of takeAITurn, using arrays
var takeAITurn = function (boardToEval) {
	// let availSpaces = getSpaces(boardToEval);
	while (callingSpace.length > 0) {
		callingSpace.pop();
	}
	turnEval(boardToEval, "ai");
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


		for (let j = 0; j < currentBoard.length; j++) {
			let move = {};
			move.index = thisAvailSpaces[i];
			let score = 0;
			if (terminalCheck(boardToEval, "ai") === "aiwin") {
				score = 10; 
			} else if (terminalCheck(boardToEval, "ai") === "tie") {
				score = 1;
			} else if (terminalCheck(boardToEval, "human") === "humanwin") {
				score = -10;
			}
		moves.push(move);
		}

var getUnSpaces = function (boardToEval) {
	var unSpaces = [];
	for (var i = 0; i < boardToEval.length; i++) {
		if (boardToEval[i] == "O" || boardToEval[i] == "X") {
			unSpaces.push(i);
		}
	}
	return unSpaces;
};
	// 		// if it is the computer's turn loop over the moves and choose the move with the highest score
	//   let bestMove;
	//   if(player === "ai"){
	//     let bestScore = -10000;
	//     for(var i = 0; i < moves.length; i++){
	//       if(moves[i].score > bestScore){
	//         bestScore = moves[i].score;
	//         bestMove = i;
	//       }
	//     }
	//   }else{

	// // else loop over the moves and choose the move with the lowest score
	//     let bestScore = 10000;
	//     for(var i = 0; i < moves.length; i++){
	//       if(moves[i].score < bestScore){
	//         bestScore = moves[i].score;
	//         bestMove = i;
	//       }
	//     }
	//   }
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

// var clearCallingSpace = function () {
// 	while (callingSpace.length > 0) {
// 		callingSpace.pop();
// 	}
// };
	// 	console.log("newMoves is now on next line: ");
	// 	console.log(newMoves);
	// 	if (player === "ai") {
	// 		console.log("i within if player is ai equals " + i);
	// 		currentBoard[thisAvailSpaces[i]] = "X";
	// 		nextPlayer = "human";
	// 	} else if (player === "human") {
	// 		console.log("i within if player is human equals " + i);
	// 		currentBoard[thisAvailSpaces[i]] = "O";
	// 		nextPlayer = "ai";
	// 	}
	// 	// if (thisAvailSpaces.length > 0) {
	// 	// 	console.log("currentBoard should be different from boardToEval; currentBoard is " + currentBoard);
	// 	// 	let newMoves = buildMoveTree(currentBoard, nextPlayer); //I want new moves to be an array
	// 	// 	console.log("newMoves is on next line: ");
	// 	// 	console.log(newMoves);
	// 	// 	moves.push(newMoves);
	// 	// }
	// 	if (thisAvailSpaces === 0) {
	// 		continue;
	// 	} else {
	// 		moves.push(buildMoveTree(currentBoard, nextPlayer));
	// 	}
	// }
	// console.log("moves is on next line: ");
	// console.log(moves);
	// // return the chosen move (object) from the moves array
	// return moves;
// };


ar getBestMove = function (moves, player) {
	let bestMove;
	if (player === "ai") {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
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
	return bestMove;
};


for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot 
    var move = {};
  	move.index = boardToEval[availSpots[i]];

    // set the empty spot to the current player
    boardToEval[availSpots[i]] = player;

    /*collect the score resulted from calling minimax 
      on the opponent of the current player*/
    if (player == aiPlayer){
      var result = minimax(boardToEval, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(boardToEval, aiPlayer);
      move.score = result.score;
    }

    // reset the spot to empty
    boardToEval[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }