import "./GameCard.css";

export interface GameCardProps {
  gameName: string;
  gameImageLink: string;
}

function GameCard({ gameName, gameImageLink }: GameCardProps) {
  return (
    <div className="game-card-container">
      <div className="game-card-image-container">
        <img src={gameImageLink} />
      </div>
      <div className="game-card-name-container">
        <div className="game-card-name">{gameName}</div>
      </div>
    </div>
  );
}

export default GameCard;
