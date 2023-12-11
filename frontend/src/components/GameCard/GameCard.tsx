import "./GameCard.css";

export interface GameCardProps {
  gameName: string;
  gameImageLink: string | undefined;
  gameId?: number;
  onClick: (gameId: number) => void;
}

function GameCard({ gameId, gameName, gameImageLink, onClick }: GameCardProps) {
  return (
    <div
      className="game-card-container"
      onClick={() => {
        onClick(gameId!);
      }}
    >
      <div className="game-card-image-container">
        <img src={gameImageLink} loading="lazy" />
      </div>
      <div className="game-card-name-container">
        <div className="game-card-name">{gameName}</div>
      </div>
    </div>
  );
}

export default GameCard;
