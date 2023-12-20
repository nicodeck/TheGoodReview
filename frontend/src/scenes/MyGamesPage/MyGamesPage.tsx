import { useEffect, useState } from "react";

import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "@components/Navbar/Navbar";
import "./MyGamesPage.css";
import Footer from "@components/Footer/Footer";
import GameModal, { GameModalInfo } from "@components/GameModal/GameModal";
import { GameCardProps } from "@components/GameCard/GameCard";
import fetchData from "services/fetchData";
import GameGrid from "@components/GameGrid/GameGrid";

function MyGamesPage() {
  const { autoLogin } = useAuth();

  const navigate = useNavigate();

  const [dataArrived, setDataArrived] = useState(false);

  const [gameModalId, setGameModalId] = useState(-1);
  const [gameModalInfoDidLoad, setGameModalInfoDidLoad] = useState(false);
  const [gameModalInfo, setGameModalInfo] = useState<GameModalInfo>({
    description: "",
    grade: 0,
    name: "",
    year: 0,
    imageLink: "",
    liked: false,
  });

  const [games, setGames] = useState([] as GameCardProps[]);

  const handleClickOnGameCard = (gameId: number) => {
    setGameModalId(gameId);
  };

  const handleClickOnModalCloseButton = () => {
    setGameModalId(-1);
  };

  const handleEscapeKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setGameModalId(-1);
    }
  };

  useEffect(() => {
    if (gameModalId > -1) {
      let gameModalIgnore = false;
      window.addEventListener("keydown", handleEscapeKeyPress);

      fetchData({
        method: "get",
        route: "/games/gamecard",
        params: { id: gameModalId },
      })
        .then((res) => {
          const gameInfo = {
            description: res.data.gameDescription,
            grade: res.data.gameGrade,
            name: res.data.gameName,
            year: res.data.gameYear,
            imageLink: res.data.gameImageLink,
            liked: res.data.gameLiked,
          };
          if (!gameModalIgnore) {
            setGameModalInfo(gameInfo);
            setGameModalInfoDidLoad(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        gameModalIgnore = true;
        window.removeEventListener("keydown", handleEscapeKeyPress);
        setGameModalInfoDidLoad(false);
      };
    }
  }, [gameModalId]);

  useEffect(() => {
    if (gameModalId == -1) {
      setGames([]);
      const ignoreGames = false;

      fetchData({
        method: "get",
        route: "/games/my",
      })
        .then((res) => {
          if (!ignoreGames) {
            setGames(res.data.games);
            setDataArrived(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [gameModalId]);

  useEffect(() => {
    const attemptAutoLogin = async () => {
      const isAutoLoginSuccessful = await autoLogin();
      if (!isAutoLoginSuccessful) {
        navigate("/login");
      }
    };
    attemptAutoLogin();
  }, []);

  return (
    <>
      <GameModal
        gameId={gameModalId}
        gameInfo={gameModalInfo}
        handleClickOnCloseButton={handleClickOnModalCloseButton}
        gameInfoDidLoad={gameModalInfoDidLoad}
      />

      <Navbar backgroundChangesOnScroll={false} forceNavbarVisible={true} />
      <div className="my-games-page-container">
        <h1 className="my-games-page-title">My Games</h1>
        <GameGrid
          games={games}
          handleClickOnGameCard={handleClickOnGameCard}
          altText={!dataArrived ? "Loading..." : "You have not liked any games"}
        />
      </div>
      <Footer />
    </>
  );
}

export default MyGamesPage;
