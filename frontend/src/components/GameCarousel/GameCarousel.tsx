import "./GameCarousel.css";

import GameCard from "./GameCard/GameCard";

function GameCarousel() {
  return (
    <div className="game-carousel-container">
      <GameCard
        name="The Witcher III"
        imageLink="https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png"
      />
    </div>
  );
}

export default GameCarousel;
