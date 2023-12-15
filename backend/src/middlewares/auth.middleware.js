const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  console.log("Attempting authentication...");

  try {
    // Check if the request has the Authorization header
    if (!req.headers.authorization) {
      req.auth = {
        isAuth: false,
      };
      next();
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
    }

    req.auth = {
      isAuth: true,
      username: username,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Authentication failed." });
  }
}

module.exports = authentication;
