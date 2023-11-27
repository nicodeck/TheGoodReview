import "./GameCarousel.css";

import GameCard from "./GameCard/GameCard";

import { GameCardProps } from "./GameCard/GameCard";

export interface GameCarouselProps {
  carouselName: string;
  carouselGames: Array<GameCardProps>;
}

function GameCarousel({ carouselName, carouselGames }: GameCarouselProps) {
  return (
    <div className="game-carousel-container">
      <h1>{carouselName}</h1>
      {carouselGames.map(({ gameName, gameImageLink }: GameCardProps) => {
        return <GameCard gameName={gameName} gameImageLink={gameImageLink} />;
      })}
    </div>
  );
}
//TODO: il faut maper les jeux pour chaque carte et ajouter les parametres dans la homepage

export default GameCarousel;
