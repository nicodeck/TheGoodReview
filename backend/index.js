const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

require("dotenv").config();

const games = require("./src/routes/games.routes");
const images = require("./src/routes/images.routes");
const { igdb_api_request } = require("./src/utils/igdb_request.utils");

app.use("/games", games);

app.use("/images", images);

app.get("/homepage", cors(), async (req, res) => {
  const rawHomepageGamesData = await igdb_api_request(
    "/games",
    "fields name, cover.image_id; sort total_rating desc; where aggregated_rating_count >= 7 & first_release_date > 1104534000; limit 20;"
  );
  const cleanHomepageGamesData = rawHomepageGamesData.map((game) => {
    return {
      gameImageLink: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
      gameName: game.name,
      gameId: game.id,
    };
  });
  res.send({ games: cleanHomepageGamesData });
});

app.get("/search", cors(), async (req, res) => {
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
    ? rawSearchResultsData.map((game) => {
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
  console.log(`Example app listening on port ${port}`);
});
