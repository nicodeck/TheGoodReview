import "./Homepage.css";

import Navbar from "@components/Navbar/Navbar";
import GameModal, { GameModalInfo } from "@components/GameModal/GameModal";
import homepageVideoGamesBackground from "./assets/img/abstract_background.jpg";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import Footer from "@components/Footer/Footer";
import fetchData from "services/fetchData";
import GameGrid from "@components/GameGrid/GameGrid";

function Homepage() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const [dataArrived, setDataArrived] = useState(false);

  const [games, setGames] = useState([]);

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

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
  };

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
    let searchIgnore = false;

    setGames([]);
    setDataArrived(false);

    if (debouncedSearchText == "") {
      fetchData({ method: "get", route: "/homepage" })
        .then((res) => {
          if (!searchIgnore) {
            setGames(res.data.games);
            setDataArrived(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchData({
        method: "get",
        route: "/search",
        params: { search_text: debouncedSearchText },
      })
        .then((res) => {
          if (!searchIgnore) {
            setGames(res.data.games);
            setDataArrived(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      searchIgnore = true;
    };
  }, [debouncedSearchText]);

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

  return (
    <>
      <GameModal
        gameId={gameModalId}
        gameInfo={gameModalInfo}
        handleClickOnCloseButton={handleClickOnModalCloseButton}
        gameInfoDidLoad={gameModalInfoDidLoad}
      />

      <Navbar
        backgroundChangesOnScroll={true}
        forceNavbarVisible={gameModalId > -1}
      />

      <div className="homepage-container">
        <div
          className="homepage-background-image"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${homepageVideoGamesBackground})`,
          }}
        ></div>
        <div className="homepage-games-outer-container">
          <div className="homepage-searchbar">
            <input
              type="text"
              value={searchText}
              onChange={searchInputHandler}
              placeholder="Elden Ring, The Last of Us..."
              autoFocus
            />
          </div>
          <GameGrid
            games={games}
            handleClickOnGameCard={handleClickOnGameCard}
            altText={
              !dataArrived ? "Loading..." : `No results for ${searchText}...`
            }
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
