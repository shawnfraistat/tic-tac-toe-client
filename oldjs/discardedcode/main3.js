//main2.js 

let origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// human
var huPlayer = "O";

// ai
var aiPlayer = "X";

let turn = 0;

var takeAITurn = function (boardToEval) {
	let myMove = minimax(boardToEval, aiPlayer);
	console.log(myMove)
	origBoard[myMove.index] = "X";
	updateBoardDisplay();
	if (terminalCheck(origBoard, "ai") === "aiwin") {
		alert("You lose!");
	} else if (terminalCheck(origBoard, "ai") === "tie") {
		alert("Tie!");
	} else if (terminalCheck(origBoard, "human") === "humanwin") {
		alert("You win!");
	} else {
		turn++;
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
function emptyIndexies(boardToEval){
	let availSpaces = [];
	for (var i = 0; i < boardToEval.length; i++) {
		if (boardToEval[i] != "O" && boardToEval[i] != "X") {
			availSpaces.push(i);
		}
	}
	return availSpaces;
};

// winning combinations using the board indexies
function winning(board, player){
 if (
 (board[0] == player && board[1] == player && board[2] == player) ||
 (board[3] == player && board[4] == player && board[5] == player) ||
 (board[6] == player && board[7] == player && board[8] == player) ||
 (board[0] == player && board[3] == player && board[6] == player) ||
 (board[1] == player && board[4] == player && board[7] == player) ||
 (board[2] == player && board[5] == player && board[8] == player) ||
 (board[0] == player && board[4] == player && board[8] == player) ||
 (board[2] == player && board[4] == player && board[6] == player)
 ) {
 return true;
 } else {
 return false;
 }
}

// the main minimax function
function minimax(newBoard, player){
  
  //available spots
  var availSpots = emptyIndexies(newBoard);
  // checks for the terminal states such as win, lose, and tie 
  //and returning a value accordingly
  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }
  // an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot 
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    /*collect the score resulted from calling minimax 
      on the opponent of the current player*/
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    // reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }
// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
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
	var availSpaces = emptyIndexies(boardToEval);
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
