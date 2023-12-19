const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function authentication(req, res, next) {
  console.log("Attempting authentication...");

  try {
    // Check if the request has the Authorization header
    if (!req.headers.authorization) {
      req.auth = {
        isAuth: false,
      };
      next();
      return;
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const username = decodedToken.username;
    const iat = decodedToken.iat;

    if (iat * 1000 < Date.now() - 1000 * 60 * 60) {
      req.auth = {
        isAuth: false,
      };
      next();
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    console.log("User found: ", user);

    req.auth = {
      isAuth: true,
      username: username,
      userId: user.id,
    };

    next();
    return;
  } catch (error) {
    req.auth = {
      isAuth: false,
    };
    next();
    return;
  }
}

module.exports = authentication;
