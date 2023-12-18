// /auth endpoint

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const authentication = require("../middlewares/auth.middleware");

const router = express.Router();

const prisma = new PrismaClient();

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

router.post("/register", express.json(), cors(), async (req, res) => {
  console.log("Register request received");
  console.log(req.body);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || !password || !email) {
      res.status(400).send();
      return;
    }

    if (!emailRegex.test(email)) {
      res.status(400).send();
      return;
    }

    const usernameExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (usernameExists || emailExists) {
      res.status(409).send({
        usernameExists: usernameExists ? true : false,
        emailExists: emailExists ? true : false,
      });
      return;
    }

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    console.log("User created: ", user);
    res.status(200).send({ username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
