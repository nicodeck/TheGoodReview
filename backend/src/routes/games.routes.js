const express = require("express");

const router = express.Router();

const { igdb_api_request } = require("../utils/igdb_request.utils");
const authentication = require("../middlewares/auth.middleware");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

router.get("/gamecard", authentication, async (req, res) => {
  const fields =
    "name, cover.image_id, first_release_date, summary, aggregated_rating";
  const id = req.query.id ? Number(req.query.id) : 1942;

  console.log("Requesting details of game with id: ", id);

  try {
    const rawGameCardData = await igdb_api_request(
      "/games",
      `fields ${fields}; where id=${id};`
    );

    console.log("Request auth: ", req.auth);

    const like = req.auth.isAuth
      ? await prisma.like.findUnique({
          where: {
            likeId: {
              gameId: id,
              authorId: req.auth.userId,
            },
          },
        })
      : null;

    const cleanGameCardData = {
      gameImageLink: `https://images.igdb.com/igdb/image/upload/t_cover_big/${rawGameCardData[0].cover.image_id}.jpg`,
      gameName: rawGameCardData[0].name,
      gameYear: new Date(
        rawGameCardData[0].first_release_date * 1000
      ).getFullYear(),
      gameDescription: rawGameCardData[0].summary,
      gameGrade: Math.round(rawGameCardData[0].aggregated_rating) / 10,
      gameLiked: like ? like.like : false,
    };

    res.send(cleanGameCardData);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/like", express.json(), authentication, async (req, res) => {
  const isAuth = req.auth.isAuth;
  if (!isAuth) {
    res.status(401).send({ message: "Unauthorized." });
    return;
  }

  const userId = req.auth.userId;
  const gameId = req.body.gameId;
  const liked = req.body.liked;

  const game = await prisma.game.upsert({
    where: {
      id: gameId,
    },
    update: {},
    create: {
      id: gameId,
    },
  });

  const like = await prisma.like.upsert({
    where: {
      likeId: {
        gameId: gameId,
        authorId: userId,
      },
    },
    update: {
      like: liked,
    },
    create: {
      game: {
        connect: {
          id: gameId,
        },
      },
      author: {
        connect: {
          id: userId,
        },
      },

      like: liked,
    },
  });

  console.log("Like: ", like);

  res.status(200).send();
});

router.get("/my", authentication, async (req, res) => {
  console.log("Requesting my games...");
  const userId = req.auth.isAuth ? req.auth.userId : 9;

  if (!userId) {
    res.status(401).send({ message: "Unauthorized." });
    return;
  }

  const games = await prisma.like.findMany({
    where: {
      authorId: userId,
      like: true,
    },
    include: {
      game: {
        select: {
          id: true,
        },
      },
    },
  });

  const rawHomepageGamesData = await igdb_api_request(
    "/games",
    `fields name, cover.image_id; where id=(${games
      .map((game) => game.game.id)
      .join(",")});`
  );

  const cleanHomepageGamesData = rawHomepageGamesData.map((game) => {
    return {
      gameImageLink: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
      gameName: game.name,
      gameId: game.id,
    };
  });

  res.status(200).send({ games: cleanHomepageGamesData });
});

module.exports = router;
