import "./GameCard.css";

interface GameCardParams {
  name: string;
  imageLink: string;
}

function GameCard({ name, imageLink }: GameCardParams) {
  return (
    <div className="game-card-container">
      <div className="game-card-image-container">
        <img src={imageLink} />
      </div>
      <div className="game-card-name-container">
        <div className="game-card-name">{name}</div>
      </div>
    </div>
  );
}

export default GameCard;
