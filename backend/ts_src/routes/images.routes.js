const express = require("express");
const router = express.Router();
const axios = require("axios");

const { igdb_api_request } = require("../utils/igdb_request.utils");

router.get("/", (req, res) => {
  res.send("image route");
});

router.get("/cover", async (req, res) => {
  if (!req.query.id) {
    res.status(400).send("Error: missing required query parameter: id.");
  }
  const coverSize = req.query.size ? req.query.size : "cover_big";

  const imageInfo = await igdb_api_request(
    "/covers",
    `fields image_id; where id=${req.query.id};`
  );

  const imageId = imageInfo[0].image_id;

  res.send(
    `https://images.igdb.com/igdb/image/upload/t_${coverSize}/${imageId}.jpg`
  );
});

module.exports = router;
