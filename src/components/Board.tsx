import React from 'react';
import Tile from './Tile';
import { BoardType } from '../types';

interface BoardProps {
    board: BoardType;
    dummyFlag: BoardType;
    onTileClick: (row: number, col: number) => void;
    getNextDirection: (row: number, col: number) => string | null;
}

const Board: React.FC<BoardProps> = ({ board,dummyFlag, onTileClick, getNextDirection }) => {
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${board[0].length}, 60px)`,
        gap: '2px',
        margin: '20px auto',
    };

    return (
        <div style={gridStyle}>
            {board.map((row, rowIndex) =>
                row.map((tile, colIndex) => (
                    <Tile
                        key={`${rowIndex}-${colIndex}`}
                        value={tile}
                        dummyFlag={dummyFlag[rowIndex][colIndex]}
                        onClick={() => onTileClick(rowIndex, colIndex)}
                        nextDirection={getNextDirection(rowIndex, colIndex)}
                    />
                ))
            )}
        </div>
    );
};

export default Board;
