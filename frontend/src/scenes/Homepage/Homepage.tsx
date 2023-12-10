import axios from "axios";
import "./Homepage.css";

import Navbar from "@components/Navbar/Navbar";
import GameCard, { GameCardProps } from "@components/GameCard/GameCard";
import GameModal, { GameModalInfo } from "@components/GameModal/GameModal";
import homepageVideoGamesBackground from "./assets/img/abstract_background.jpg";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import Footer from "@components/Footer/Footer";

function Homepage() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const [dataArrived, setDataArrived] = useState(false);

  const [games, setGames] = useState([]);

  const [gameModalId, setGameModalId] = useState(-1);
  const [gameModalInfoDidLoad, setGameModalInfoDidLoad] = useState(false);
  const [gameModalInfo, setGameModalInfo] = useState<GameModalInfo>({
    description:
      "The Last of Us Remastered is an updated release of the PS3 game The Last of Us. It is identical to the PS3 version but runs at a 1080p resolution and incorporates character models with a higher resolution. There are also improved shadows and lighting, upgraded textures, 60 frames per second and other types of improvements. In addition to the base game, two map packs and the expansion The Last of Us: Left Behind are included. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor consequat augue, ut malesuada enim eleifend non. Fusce viverra feugiat blandit. In orci urna, rhoncus ac lacus et, posuere sollicitudin ipsum. Nulla hendrerit est justo, non tempor dolor ornare consectetur. Mauris pulvinar nec neque a tincidunt. Morbi eu tortor purus. Suspendisse placerat vestibulum tellus, a imperdiet libero efficitur in. Suspendisse facilisis quam id lectus laoreet, a mollis magna laoreet. Donec mattis mollis massa in suscipit. Fusce quis lacinia est, a eleifend purus. Donec at efficitur arcu. Morbi a fermentum ante. Vestibulum sodales cursus efficitur.",
    grade: 10,
    name: "Elden Ring",
    year: 2022,
    imageLink:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
  });

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
  };

  const handleClickOnGameCard = () => {
    setGameModalId(1942);
  };

  const handleClickOnModalCloseButton = () => {
    setGameModalId(-1);
  };

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

  useEffect(() => {
    if (gameModalId > -1) {
      return () => {
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
            />
          </div>
          <div className="homepage-games-inner-container">
            {games.length > 0 ? (
              games.map(
                ({ gameName, gameImageLink, gameId }: GameCardProps) => {
                  return (
                    <GameCard
                      onClick={handleClickOnGameCard}
                      gameName={gameName}
                      gameImageLink={gameImageLink}
                      key={gameId}
                    />
                  );
                }
              )
            ) : !dataArrived ? (
              <div className="homepage-games-loading">Loading...</div>
            ) : (
              <div className="homepage-games-no-result">
                No result for "{debouncedSearchText}"...
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
