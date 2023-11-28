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
        carouselTitle: "Jeux populaires",
        carouselGames: [
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
        ],
      },
      {
        carouselTitle: "Jeux pas populaires",
        carouselGames: [
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
        ],
      },
      {
        carouselTitle: "Jeux un peu populaires",
        carouselGames: [
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
          {
            gameName: "the witcher",
            gameImageLink:
              "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png",
          },
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
      {carousels.map(({ carouselTitle, carouselGames }) => {
        return (
          <GameCarousel
            carouselTitle={carouselTitle}
            carouselGames={carouselGames}
          />
        );
      })}
    </>
  );
}

export default Homepage;
