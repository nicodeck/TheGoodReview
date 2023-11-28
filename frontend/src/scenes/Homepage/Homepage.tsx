import "./Homepage.css";

import { GameCarouselProps } from "../../components/GameCarousel/GameCarousel";
import { useLoaderData } from "react-router-dom";

interface HomepageData {
  games: Array<GameCarouselProps>;
}

export async function loader() {
  return {
    games: [
      {
        gameName: "The Witcher III",
        gameImageLink:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
      },
    ],
  };
}

function Homepage() {
  const { games } = useLoaderData() as HomepageData;

  return <></>;
}

export default Homepage;
