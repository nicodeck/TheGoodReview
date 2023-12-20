import { useEffect, useState } from "react";
import "./GameModal.css";
import fetchData from "services/fetchData";
import { useAuth } from "@hooks/useAuth";

import { IoClose, IoHeart, IoHeartDislikeOutline } from "react-icons/io5";

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
  liked: boolean;
}

function GameModal({
  gameId,
  gameInfo: { name, year, description, grade, imageLink, liked },
  handleClickOnCloseButton,
  gameInfoDidLoad,
}: GameModalProps) {
  const [gameLiked, setGameLiked] = useState(liked);
  const [gameLikedDidLoad, setGameLikedDidLoad] = useState(true);

  const { username } = useAuth();

  const handleGameLike = async () => {
    if (gameId > -1) {
      setGameLiked(!gameLiked);
      setGameLikedDidLoad(false);

      fetchData({
        method: "post",
        route: "/games/like",
        data: { gameId: gameId, liked: !gameLiked },
      })
        .then((res) => {
          console.log(res);
          setGameLikedDidLoad(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setGameLiked(liked);
  }, [liked]);

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
          {username ? (
            gameInfoDidLoad && gameLikedDidLoad ? (
              gameLiked ? (
                <div
                  className="game-modal-game-like game-modal-game-liked"
                  onClick={handleGameLike}
                >
                  <IoHeartDislikeOutline size={24} />
                </div>
              ) : (
                <div className="game-modal-game-like" onClick={handleGameLike}>
                  <IoHeart size={24} />
                </div>
              )
            ) : (
              <div className="game-modal-game-like loading">
                <div></div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default GameModal;
