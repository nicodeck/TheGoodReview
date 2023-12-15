const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const authentication = require("../middlewares/auth.middleware");

const router = express.Router();

const prisma = new PrismaClient();

router.options("/login", cors());

router.post("/login", express.json(), cors(), async (req, res) => {
  console.log("Login request received");

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send();
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username,
      password: md5(password),
    },
    select: {
      username: true,
    },
  });

  if (!user) {
    res.status(401).send();
    return;
  }
  console.log("User found: ", user);

  const tokenData = {
    username: user.username,
  };
  const token = jwt.sign(tokenData, process.env.JWT_KEY);
  res.status(200).send({ token, username });
});

router.options("/autologin", cors());

router.post(
  "/autologin",
  express.json(),
  authentication,
  cors(),
  async (req, res) => {
    console.log("Autologin request received");

    if (!req.auth.isAuth) {
      res.status(401).send();
      return;
    }

    res.status(200).send({ username: req.auth.username });
  }
);

module.exports = router;
