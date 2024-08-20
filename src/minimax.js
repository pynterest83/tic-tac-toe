const MAXIMIZE_PLAYER = 'X'; // X is the player and O is the computer

function opponent(player) {
  return player === 'X' ? 'O' : 'X';
}

function findBestMove(squares, player) {
    let board = [...squares];
    let bestMoves = []; // store the best moves, since there can be multiple best moves
    let bestScore = player === MAXIMIZE_PLAYER ? -Infinity : Infinity; // -Infinity for maximize and +Infinity for minimize to start with

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = player; // make the move
            let score = minimax(board, opponent(player));
            board[i] = null; // undo the move

            if (player === MAXIMIZE_PLAYER) {
                if (score > bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                } else if (score === bestScore) {
                    bestMoves.push(i);
                }
            } else {
                if (score < bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                } else if (score === bestScore) {
                    bestMoves.push(i);
                }
            }
        }
    }
    return bestMoves.length > 0 ? bestMoves[Math.floor(Math.random() * bestMoves.length)] : undefined;
}

function minimax(board, player) {
    let winner = calculateWinner(board);
    if (winner !== null) {
        if (winner === MAXIMIZE_PLAYER) {
            return 1;
        } else if (winner === opponent(MAXIMIZE_PLAYER)) {
            return -1;
        } else {
            return 0;
        }
    }

    if (player === MAXIMIZE_PLAYER) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = player;
                let score = minimax(board, opponent(player));
                board[i] = null;
                bestScore = Math.max(score, bestScore);
                if (score === 1) {
                    return 1;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = player;
                let score = minimax(board, opponent(player));
                board[i] = null;
                bestScore = Math.min(score, bestScore);
                if (score === -1) {
                    return -1;
                }
            }
        }
        return bestScore;
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if (squares.every(square => square !== null)) {
        return 'draw';
    }
    return null;
}

export default findBestMove;
