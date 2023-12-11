import "./GameModal.css";

import { IoClose } from "react-icons/io5";

export interface GameModalProps {
  gameId: number;
  gameInfo: GameModalInfo;
  handleClickOnCloseButton: () => void;
  gameInfoDidLoad: boolean;
}

export interface GameModalInfo {
  name: string;
  year: number;
  description: string;
  grade: number;
  imageLink: string;
}

function GameModal({
  gameId,
  gameInfo: { name, year, description, grade, imageLink },
  handleClickOnCloseButton,
  gameInfoDidLoad,
}: GameModalProps) {
  return (
    <div
      className={"game-modal-container" + (gameId == -1 ? " is-hidden" : "")}
    >
      <div className="game-modal-card">
        <div
          className="game-modal-close-button"
          onClick={handleClickOnCloseButton}
        >
          <IoClose size={24} />
        </div>
        <div className="game-modal-inner-container">
          <div
            className={
              "game-modal-image-container" +
              (!gameInfoDidLoad ? " game-modal-image-loading" : "")
            }
          >
            <img src={gameInfoDidLoad ? imageLink : ""} />
          </div>
          <div className="game-modal-info-container">
            <h1 className="game-modal-game-name">
              {gameInfoDidLoad ? name : "Loading..."}
            </h1>
            <h2 className="game-modal-game-year">
              {gameInfoDidLoad ? year : "..."}
            </h2>
            <p className="game-modal-game-description">
              {gameInfoDidLoad ? description : "Loading..."}
            </p>
          </div>
        </div>
        <div className="game-modal-game-grades-container">
          <div className="game-modal-game-grade">
            <div className="game-modal-game-grade-title">IGDB Grade</div>
            <div className="game-modal-game-grade-value">
              {" "}
              {gameInfoDidLoad ? grade : "..."} / 10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameModal;
