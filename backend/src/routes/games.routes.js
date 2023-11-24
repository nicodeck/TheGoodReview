const express = require("express");
const router = express.Router();
const axios = require("axios");

const igdb_request = require("../utils/igdb_request.utils");

router.get("/:id", async (req, res) => {
  const gameData = await igdb_request(
    "/games",
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    `fields *; where id = ${req.params.id};`
  );
  res.send(gameData);
});

module.exports = router;
