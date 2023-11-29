import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./Homepage.css";

import GameCard, { GameCardProps } from "@components/GameCard/GameCard";

import homepageVideoGamesBackground from "./assets/img/video_games_background.jpg";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

/*
TODO: handle if search gives no result
*/

function Homepage() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const [games, setGames] = useState([]);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
  };

  useEffect(() => {
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
          setGames(res.data);
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
          setGames(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debouncedSearchText]);
  console.log(games);

  return (
    <div className="homepage-container">
      <div
        className="homepage-background-image"
        style={{
          backgroundImage: `url(${homepageVideoGamesBackground})`,
        }}
      ></div>
      <div className="homepage-games-outer-container">
        <div className="homepage-searchbar">
          <input type="text" value={searchText} onChange={searchInputHandler} />
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
