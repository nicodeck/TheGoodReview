const express = require("express");
const cors = require("cors");

const router = express.Router();

const { igdb_api_request } = require("../utils/igdb_request.utils");

router.get("/", async (req, res) => {
  const fields = req.query.fields ? req.query.fields : "*";
  const limit = req.query.limit ? req.query.limit : 20;
  const id = req.query.id ? req.query.id : null;

  const gameData = await igdb_api_request(
    "/games",
    `fields ${fields}; limit ${limit}; ${id ? "where id=(" + id + ");" : ""}`
  );
  res.send(gameData);
});

router.get("/gamecard", cors(), async (req, res) => {
  const fields =
    "name, cover.image_id, first_release_date, summary, aggregated_rating";
  const id = req.query.id ? req.query.id : 1942;

  console.log("Requesting details of game with id: ", id);

  const rawGameCardData = await igdb_api_request(
    "/games",
    `fields ${fields}; where id=${id};`
  );

  const cleanGameCardData = {
    gameImageLink: `https://images.igdb.com/igdb/image/upload/t_cover_big/${rawGameCardData[0].cover.image_id}.jpg`,
    gameName: rawGameCardData[0].name,
    gameYear: new Date(
      rawGameCardData[0].first_release_date * 1000
    ).getFullYear(),
    gameDescription: rawGameCardData[0].summary,
    gameGrade: Math.round(rawGameCardData[0].aggregated_rating) / 10,
  };

  res.send(cleanGameCardData);
});

module.exports = router;
