import { useState, useEffect } from 'react';
import findBestMove from './minimax';
import "./App.css";

function ModeSelector({ onModeChange }) {
  return (
    <div className="mode-selector">
      <button onClick={() => onModeChange('PvP')}>Player vs Player</button>
      <button onClick={() => onModeChange('PvE')}>Player vs Environment</button>
    </div>
  );
}

function ThemeToggle({ onThemeChange }) {
  return (
    <div className="theme-toggle">
      <button onClick={onThemeChange}>Toggle Theme</button>
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
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
  if (winner && winner !== 'draw') {
    status = 'Winner: ' + winner;
  } else if (winner === 'draw') {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] !== null) {
      return squares[a];
    }
  }
  if (squares.every(square => square !== null)) {
    return 'draw';
  }
  return null;
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [mode, setMode] = useState(null); // 'PvP' or 'PvE'
  const [theme, setTheme] = useState('light');

  function handlePlay(newSquares) {
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function handleThemeChange() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    if (mode === 'PvE' && !xIsNext) {
      const bestMove = findBestMove(squares, 'O');
      const newSquares = squares.slice();
      newSquares[bestMove] = 'O';
      handlePlay(newSquares);
    }
  }, [xIsNext, mode, squares]);

  return (
    <div className={`game ${theme}`}>
      <ThemeToggle onThemeChange={handleThemeChange} />
      <ModeSelector onModeChange={handleModeChange} />
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
      </div>
    </div>
  );
}