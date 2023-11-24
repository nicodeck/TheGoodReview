const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const games = require("./src/routes/games.routes");

app.use("/games", games);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
