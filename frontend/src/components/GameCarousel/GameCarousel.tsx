import "./GameCarousel.css";

import GameCard from "./GameCard/GameCard";

import { GameCardProps } from "./GameCard/GameCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export interface GameCarouselProps {
  carouselTitle: string;
  carouselGames: Array<GameCardProps>;
}

function GameCarousel({ carouselTitle, carouselGames }: GameCarouselProps) {
  return (
    <div className="game-carousel">
      <h1 className="game-carousel-title">{carouselTitle}</h1>
      <div className="game-carousel-carousel-container">
        <div className="game-carousel-left-arrow-container">
          <div className="game-carousel-left-arrow">
            <IoChevronBack size={32} />
          </div>
        </div>
        <div className="game-carousel-carousel-games">
          {carouselGames.map(({ gameName, gameImageLink }: GameCardProps) => {
            return (
              <GameCard gameName={gameName} gameImageLink={gameImageLink} />
            );
          })}
        </div>
        <div className="game-carousel-right-arrow-container">
          <div className="game-carousel-right-arrow">
            <IoChevronForward size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCarousel;
