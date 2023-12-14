const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  console.log("Attempting authentication...");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const username = decodedToken.username;
    req.auth = {
      username: username,
    };
    console.log("token: ", token);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Authentication failed." });
  }
}

module.exports = authentication;
