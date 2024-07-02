import React from 'react';

interface TileProps {
    value: number;
    dummyFlag: number;
    onClick: () => void;
    nextDirection: string | null;
}

const Tile: React.FC<TileProps> = ({ value, dummyFlag,onClick, nextDirection }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="tile-wrapper"
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}>
            <button className={dummyFlag ? "btn btn-secondary disabled tile" :"btn btn-light tile"}>
                {value !== 0 ? value : ''}
            </button>
            {!dummyFlag &&isHovered && nextDirection && (
                <div className={`arrow ${nextDirection}`}>{nextDirection}</div>
            )}
        </div>
    );
};

export default Tile;
