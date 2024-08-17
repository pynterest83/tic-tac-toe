import { useState } from 'react';

function Square({value, onSquareClick}) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
}

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const newSquares = squares.slice(); // copy the array
        newSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(newSquares);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner && winner !== 'withdraw') {
        status = 'Winner: ' + winner;
    } 
    else if (winner === 'withdraw') {
        status = 'Withdraw';
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </>
    );
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
    return 'withdraw';
  }
  return null;
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(squares) {
      const newHistory = [...history.slice(0, currentMove + 1), squares]; // copy the array
      setHistory(newHistory); // set history
      setCurrentMove(newHistory.length - 1); // set current move
      setXIsNext(!xIsNext); // set xIsNext
    }

    function jumpTo(move) {
      setCurrentMove(move); // set current move
      setXIsNext((move % 2) === 0); // set xIsNext to true if move is even
    }

    const moves = history.map((squares, move) => {
      let desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    }
    );

    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
}