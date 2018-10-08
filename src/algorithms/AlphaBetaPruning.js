var winner = -1;

function alphaBetaPruning(board, turn) {

  if(isGameOver(board, turn) === true) {
    return getScore(board, turn);
  }

  if(turn === 0) {
    return maxValue(board, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 0);
  }else {
    return minValue(board, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 1);
  }
}

function maxValue(board, alpha, beta, turn) {
  var indexOfBestMove = -1;

  for(var availableMove in getAvailableMoves(board)){

    var tempBoard = copyBoard(board);
    tempBoard[availableMove] = 0;
    var score = alphaBetaPruning(tempBoard, 1);

    if (score > alpha) {
      alpha = score;
      indexOfBestMove = availableMove;
    }

    if (alpha >= beta) {
      break;
    }

  }

  if (indexOfBestMove !== -1) {
    board[indexOfBestMove] = 0;
  }
  return alpha;
}


function minValue(board, alpha, beta, turn) {
  var indexOfBestMove = -1;

  for(var availableMove in getAvailableMoves(board)){

    var tempBoard = copyBoard(board);
    tempBoard[availableMove] = 1;
    var score = alphaBetaPruning(tempBoard, 0);

    if (score < beta) {
      beta = score;
      indexOfBestMove = availableMove;
    }

    if (alpha >= beta) {
      break;
    }

  }

  if (indexOfBestMove !== -1) {
    board[indexOfBestMove] = 1;
  }
  return beta;
}

function getScore(board, turn) {
  if(isGameOver(board, turn) && winner === 1) {
    return 10;
  }else if(isGameOver(board, turn) && winner === 0) {
    return -10;
  }else {
    return 0;
  }
}

function isGameOver(board, turn) {

		if(isThereAWinner(board, turn) === false) {
			for(var i = 0; i < board.length; i++) {
				if(board[i] === 0) {
					return false;
				}
			}
			return true;
		}else {
			return true;
		}
	}

function isThereAWinner(board, turn) {
		if((board[0] === board[1] && board[0] === board[2] && board[0] !== -1)
				|| (board[3] === board[4] && board[3] === board[5] && board[3] !== -1)
				|| (board[6] === board[7] && board[6] === board[8] && board[6] !== -1)

				|| (board[0] === board[3] && board[0] === board[6] && board[0] !== -1)
				|| (board[1] === board[4] && board[1] === board[7] && board[1] !== -1)
				|| (board[2] === board[5] && board[2] === board[8] && board[2] !== -1)

				|| (board[0] === board[4] && board[0] === board[8] && board[0] !== -1)
				|| (board[2] === board[4] && board[2] === board[6] && board[2] !== -1)
				) {
			winner = turn;
			return true;
		}else {
			return false;
		}
	}

function getAvailableMoves(board) {
		var availableMoves = [];

		for(var i = 0; i < board.length; i++) {
			if(board[i] === -1) {
				availableMoves.push(i);
			}
		}
		return availableMoves;
	}

function copyBoard(board){
  		var newBoard = [];
      for(var i = 0; i < board.length; i++){
        newBoard.push(board[i]);
      }
  		return newBoard;
  	}

  const AlphaBetaPruning = {isThereAWinner,  alphaBetaPruning};

  export default AlphaBetaPruning;
