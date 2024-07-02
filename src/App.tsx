import React, { useState } from 'react';
import Board from './components/Board';
import { BoardType } from './types';
import './styles.css';

const createInitialBoard = (rows: number, cols: number): BoardType => {
  const totalTiles = rows * cols;
  const tiles = Array.from({ length: totalTiles }, (_, index) => (index < totalTiles - 1 ? index + 1 : 0));
  const board: BoardType = [];
  while (tiles.length) board.push(tiles.splice(0, cols));
  return board;
};

const createInitialdummy = (rows: number, cols: number): BoardType => {
  const totalTiles = rows * cols;
  const tiles = Array.from({ length: totalTiles }, (_, index) => (index < totalTiles - 1 ? 0 : 0));
  const board: BoardType = [];
  while (tiles.length) board.push(tiles.splice(0, cols));
  return board;
};

const App: React.FC = () => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [board, setBoard] = useState<BoardType>(createInitialBoard(3, 3));

  const [tmpRows,setTmpRows] = useState<number>(3);
  const [tmpCols,setTmpCols] = useState<number>(3);

  const [isEdditMode, setIsEdditMode] = useState<boolean>(false);
  const [dummyboard, setDummyBoard] = useState<BoardType>(createInitialdummy(3, 3));

  const handleTileClick = (row: number, col: number) => {
    if(isEdditMode && board[row][col] !== 0){
      const newDummyBoard = [...dummyboard];
      newDummyBoard[row][col] = newDummyBoard[row][col] === 0 ? 1 : 0;
      setDummyBoard(newDummyBoard);
    }else{
      const newBoard = [...board];
      const emptyTile = findEmptyTile(board);
      if(dummyboard[row][col] === 1)return;
      if (isAdjacent(emptyTile, [row, col])) {
        [newBoard[emptyTile[0]][emptyTile[1]], newBoard[row][col]] =
          [newBoard[row][col], newBoard[emptyTile[0]][emptyTile[1]]];
        setBoard(newBoard);
      }
    }
  };

  const findEmptyTile = (board: BoardType): [number, number] => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    throw new Error('No empty tile found');
  };

  const isAdjacent = (a: [number, number], b: [number, number]): boolean => {
    return (
      (Math.abs(a[0] - b[0]) === 1 && a[1] === b[1]) ||
      (Math.abs(a[1] - b[1]) === 1 && a[0] === b[0])
    );
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTmpRows(parseInt(event.target.value, 10));
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTmpCols(parseInt(event.target.value, 10));
  };

  const handleBoardSizeChange = () => {
    if(tmpRows < 1 || tmpCols < 1 || tmpRows > 10 || tmpCols > 10 || tmpRows !== Math.floor(tmpRows) || tmpCols !== Math.floor(tmpCols)){
      alert('1 - 10');
    }else{
      setRows(tmpRows);
      setCols(tmpCols);
      setBoard(createInitialBoard(tmpRows, tmpCols));
      setDummyBoard(createInitialdummy(tmpRows, tmpCols));
    }
  }

  const getNextDirection = (row: number, col: number): string | null => {
    if(isEdditMode){
      return null;
    }
    const emptyTile = findEmptyTile(board);
    if (isAdjacent(emptyTile, [row, col])) {
      if (emptyTile[0] === row) {
        return emptyTile[1] > col ? '→' : '←';
      } else if (emptyTile[1] === col) {
        return emptyTile[0] > row ? '↓' : '↑';
      }
    }
    return null;
  };

  const toggleEdditMode = () => {
    setIsEdditMode(!isEdditMode);
  };


  return (
    <div className='app'>
      <h1>8？ パズル</h1>
      <div className='controls'>
        <label className='form-label'>
          <input type='number' className='form-control' value={tmpRows} onChange={handleRowsChange} min='2' max='10' />
        </label>
        x
        <label className='form-label'>
          <input type='number' className='form-control' value={tmpCols} onChange={handleColsChange} min='2' max='10'/>
        </label>
        <button className="btn btn-primary" onClick={handleBoardSizeChange}>Apply</button>
      </div>
      <button className={isEdditMode ? "btn btn-outline-primary" :"btn btn-primary"} onClick={toggleEdditMode}>{isEdditMode ? 'Eddit finish' : 'Edit mode'}</button>
      <div className='boad-container'>
        <Board board={board} dummyFlag={dummyboard} onTileClick={handleTileClick} getNextDirection={getNextDirection} />
      </div>
    </div>
  );
};

export default App;
