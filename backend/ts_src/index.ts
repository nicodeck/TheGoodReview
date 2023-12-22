import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

import games from "./routes/games.routes";
import images from "./routes/images.routes";
import auth from "./routes/auth.routes";

import { igdb_api_request } from "./utils/igdb_request.utils";

interface IGDB_GameCard {
  id: number;
  cover: {
    id: number;
    image_id: string;
  };
  name: string;
}

app.use(cors());

app.options("*", cors);

app.use("/games", games);

app.use("/images", images);

app.use("/auth", auth);

app.get("/homepage", async (res: Response) => {
  const rawHomepageGamesData = await igdb_api_request(
    "/games",
    "fields name, cover.image_id; sort total_rating desc; where aggregated_rating_count >= 7 & first_release_date > 1104534000; limit 20;"
  );

  console.log(rawHomepageGamesData);

  const cleanHomepageGamesData = rawHomepageGamesData.map(
    (game: IGDB_GameCard) => {
      return {
        gameImageLink: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
        gameName: game.name,
        gameId: game.id,
      };
    }
  );

  res.send({ games: cleanHomepageGamesData });
});

app.get("/search", async (req: Request, res: Response) => {
  const searchText = req.query.search_text ? req.query.search_text : "";
  console.log("Search: ", searchText);

  const start = performance.now();

  const rawSearchResultsData = await igdb_api_request(
    "/games",
    `fields id, name, cover.image_id; sort aggregated_rating_count desc; where aggregated_rating_count >= 0 & name ~*"${searchText}"*; limit 20;`
  );

  const end = performance.now();
  console.log("Request time: ", end - start);

  const cleanSearchResultsData = rawSearchResultsData
    ? rawSearchResultsData.map((game: IGDB_GameCard) => {
        return {
          gameImageLink:
            game.hasOwnProperty("cover") && game.cover.image_id
              ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
              : undefined,
          gameName: game.name,
          gameId: game.id,
        };
      })
    : [];
  res.send({ searchText: searchText, games: cleanSearchResultsData });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
