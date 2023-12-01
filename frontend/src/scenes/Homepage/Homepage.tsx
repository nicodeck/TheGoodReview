import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./Homepage.css";

import GameCard, { GameCardProps } from "@components/GameCard/GameCard";

import homepageVideoGamesBackground from "./assets/img/video_games_background.jpg";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

function Homepage() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const [dataArrived, setDataArrived] = useState(false);

  const [games, setGames] = useState([]);

  const [scrollTop, setScrollTop] = useState(window.scrollY);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
  };

  // useEffect to update scrollTop
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect to toggle navbar class .navbar-transparent
  useEffect(() => {
    if (scrollTop < 50) {
      document
        .getElementById("navbar-container")
        ?.classList.add("navbar-transparent");
    } else {
      document
        .getElementById("navbar-container")
        ?.classList.remove("navbar-transparent");
    }
  }, [scrollTop]);

  useEffect(() => {
    let ignore = false;

    setGames([]);
    setDataArrived(false);

    if (debouncedSearchText == "") {
      axios({
        method: "GET",
        url:
          import.meta.env.VITE_BACKEND_URL +
          ":" +
          import.meta.env.VITE_BACKEND_PORT +
          "/homepage",
      })
        .then((res) => {
          if (!ignore) {
            setGames(res.data.games);
            setDataArrived(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        method: "GET",
        url:
          import.meta.env.VITE_BACKEND_URL +
          ":" +
          import.meta.env.VITE_BACKEND_PORT +
          "/search?search_text=" +
          debouncedSearchText,
      })
        .then((res) => {
          if (!ignore) {
            setGames(res.data.games);
            setDataArrived(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      ignore = true;
    };
  }, [debouncedSearchText]);

  return (
    <div className="homepage-container">
      <div
        className="homepage-background-image"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${homepageVideoGamesBackground})`,
        }}
      ></div>
      <div className="homepage-games-outer-container">
        <div className="homepage-searchbar">
          <input
            type="text"
            value={searchText}
            onChange={searchInputHandler}
            placeholder="Elden Ring, The Last of Us..."
          />
        </div>
        <div className="homepage-games-inner-container">
          {games.length > 0 ? (
            games.map(({ gameName, gameImageLink }: GameCardProps) => {
              return (
                <GameCard
                  gameName={gameName}
                  gameImageLink={gameImageLink}
                  key={uuidv4()}
                />
              );
            })
          ) : !dataArrived ? (
            <div className="homepage-games-loading">Loading...</div>
          ) : (
            <div className="homepage-games-no-result">
              No result for "{debouncedSearchText}"...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
