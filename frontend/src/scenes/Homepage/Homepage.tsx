import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./Homepage.css";

import GameCard, { GameCardProps } from "../../components/GameCard/GameCard";
import { useLoaderData } from "react-router-dom";

import homepageVideoGamesBackground from "./assets/img/video_games_background.jpg";

interface HomepageData {
  games: Array<GameCardProps>;
}

export async function loader() {
  const homepageGamesData = await axios({
    method: "GET",
    url:
      import.meta.env.VITE_BACKEND_URL +
      ":" +
      import.meta.env.VITE_BACKEND_PORT +
      "/homepage",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("response", homepageGamesData);
  return { games: homepageGamesData };
}

function Homepage() {
  const { games } = useLoaderData() as HomepageData;
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
          <input type="text" />
        </div>
        <div className="homepage-games-inner-container">
          {games.map(({ gameName, gameImageLink }: GameCardProps) => {
            return (
              <GameCard
                gameName={gameName}
                gameImageLink={gameImageLink}
                key={uuidv4()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
