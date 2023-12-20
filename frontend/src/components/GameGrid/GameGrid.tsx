import GameCard, { GameCardProps } from "@components/GameCard/GameCard";

import "./GameGrid.css";

interface GameGridProps {
  games: GameCardProps[];
  altText?: string;
  handleClickOnGameCard: (gameId: number) => void;
}

function GameGrid({
  games,
  altText = "Loading...",
  handleClickOnGameCard,
}: GameGridProps) {
  return (
    <>
      <div className="game-grid-container">
        {games.length > 0 ? (
          games.map(({ gameName, gameImageLink, gameId }: GameCardProps) => {
            return (
              <GameCard
                gameId={gameId}
                onClick={handleClickOnGameCard}
                gameName={gameName}
                gameImageLink={gameImageLink}
                key={gameId}
              />
            );
          })
        ) : (
          <div>{altText}</div>
        )}
      </div>
    </>
  );
}

export default GameGrid;
