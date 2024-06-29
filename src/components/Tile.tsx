import React from 'react';

interface TileProps {
    value: number | null;
    onClick: () => void;
    nextDirection: string | null;
}

const Tile: React.FC<TileProps> = ({ value, onClick, nextDirection }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="tile-wrapper"
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}>
            <button className="btn btn-light tile">
                {value !== null ? value : ''}
            </button>
            {isHovered && nextDirection && (
                <div className={`arrow ${nextDirection}`}>{nextDirection}</div>
            )}
        </div>
    );
};

export default Tile;
