const express = require("express");
const router = express.Router();

const { igdb_api_request } = require("../utils/igdb_request.utils");

router.get("/", async (req, res) => {
  const fields = req.query.fields ? req.query.fields : "*";
  const limit = req.query.limit ? req.query.limit : 20;
  const id = req.query.id ? req.query.id : null;

  const gameData = await igdb_api_request(
    "/games",
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    `fields ${fields}; limit ${limit}; ${id ? "where id=(" + id + ");" : ""}`
  );
  res.send(gameData);
});

module.exports = router;
