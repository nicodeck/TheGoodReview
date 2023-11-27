import "./Homepage.css";

import GameCarousel, {
  GameCarouselProps,
} from "../../components/GameCarousel/GameCarousel";
import { useLoaderData } from "react-router-dom";

interface HomepageData {
  carousels: Array<GameCarouselProps>;
}

export async function loader() {
  return {
    carousels: [
      {
        carouselName: "populaires",
        carouselGames: [
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
        ],
      },
    ],
  };
}

function Homepage() {
  const { carousels } = useLoaderData() as HomepageData;

  return (
    <>
      {carousels.map(({ carouselName, carouselGames }) => {
        return (
          <GameCarousel
            carouselName={carouselName}
            carouselGames={carouselGames}
          />
        );
      })}
    </>
  );
}

export default Homepage;
