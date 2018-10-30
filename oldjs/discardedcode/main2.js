//main2.js 

//Indebted to https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 for minimax idea and coding solution

let origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var takeAITurn = function (boardToEval) {
	let myMove = minimax(boardToEval, "ai");
	origBoard[myMove.index] = "X";
	updateBoardDisplay();
	if (terminalCheck(origBoard, "ai") === "aiwin") {
		alert("You lose!");
	} else if (terminalCheck(origBoard, "ai") === "tie") {
		alert("Tie!");
	} else if (terminalCheck(origBoard, "human") === "humanwin") {
		alert("You win!");
	} else {
		for (var i = 0; i < 9; i++) {
		document.getElementById(i).addEventListener("click", takeHumanTurn);
		}
	}
};

var takeHumanTurn = function (boardToEval) {
	origBoard[this.id] = "O";
	console.log(origBoard);
	updateBoardDisplay();
	if (terminalCheck(origBoard, "human") === "humanwin") {
		alert("You win!");
	} else if (terminalCheck(origBoard, "human") === "tie") {
		alert("Tie!");
	} else {
		takeAITurn(origBoard);
	}
};

var updateBoardDisplay = function () {
	for (var i = 0; i < 9; i++) {
		document.getElementById(i).innerHTML = origBoard[i];
	}	
};

// returns list of the indexes of empty spots on the board
function getAvailableSpaces(boardToEval){
	let availSpaces = [];
	for (var i = 0; i < boardToEval.length; i++) {
		if (boardToEval[i] != "O" && boardToEval[i] != "X") {
			availSpaces.push(i);
		}
	}
	return availSpaces;
};

// the main minimax function
function minimax(boardToEval, player){
  
  //available spots
  var availSpots = getAvailableSpaces(boardToEval);
  // checks for the terminal states such as win, lose, and tie 
  //and returning a value accordingly
  if (terminalCheck(boardToEval, "ai") === "aiwin") {
		return { score: 10 }; 
	} else if (terminalCheck(boardToEval, "human") === "humanwin") {
		return { score: -10 }
	} else if (availSpots.length === 0) {
		return { score: 0 }
	}
  // an array to collect all the objects
  var moves = [];

 
  // loop through available spots to create a list of possible moves with associated score and index values
  	for (let i = 0; i < availSpots.length; i++) {  // begin loop through available spots
		let move = {};							   // initialize a new move object
		move.index = availSpots[i];   // sets the move index to whatever spot the computer's trying out; that way the move object it creates will be associated with the correct space on the board
		if (player === "ai") {	
			boardToEval[availSpots[i]] = "X";  //if we're considering what would happen if the ai moved here, mark the board spot with an "X"
			nextPlayer = "human";              //prepare to run this function again to see what would happen the turn after; alternate the player
		} else if (player === "human") {
			boardToEval[availSpots[i]] = "O"; //if we're considering what would happen if the human moved here, mark the board spot with an "O"
			nextPlayer = "ai";                //prepare to run this function again to see what would happen the turn after; alternate the player
		}
			let result = minimax(boardToEval, nextPlayer); //check what the consequence of moving to availSpots[i] would be; if it ends the game, we'll get an immediate result. 
														   //if it doesn't end the game, the computer will go a level deeper, examining what would happen next turn after the next player goes, 
														   //and keep alternating till it hits an end game
			move.score = result.score; //that move object we're preparing now gets whatever score we eventually found.
			                           // now we've got a move object with an index corresponding to the available spot and a score coming from the terminal state that results from that spot; 
			boardToEval[availSpots[i]] = move.index; //since we provisionally marked the board to evaluate the consequences, we have to unmark it before we proceed
			moves.push(move); //the moves array will store all the moves on this level and their associated score
	}
//for each available spot, the computer scores it based on what would happen after its move. 

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if (player === "ai"){
    var bestScore = -100; //doesn't matter what this number is; just want something low to get the ball rolling
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 100;
    for (var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the moves array
  
  return moves[bestMove];
}

var terminalCheck = function (boardToEval, player) {
	var availSpaces = getAvailableSpaces(boardToEval);
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



updateBoardDisplay();
takeAITurn(origBoard);
