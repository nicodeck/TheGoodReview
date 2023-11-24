const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const games = require("./src/routes/games.routes");
const images = require("./src/routes/images.routes");

app.use("/games", games);

app.use("/images", images);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
