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
    };
  });
  res.send(cleanHomepageGamesData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
