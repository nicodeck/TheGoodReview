import { PrismaClient } from "@prisma/client";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

async function authentication(req: Request, next: NextFunction) {
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
    const secret: Secret = process.env.JWT_KEY
      ? process.env.JWT_KEY
      : "mon-secret-par-defaut";
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const username = decodedToken.username;
    const iat = decodedToken.iat;

    if (iat! * 1000 < Date.now() - 1000 * 60 * 60) {
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

    if (!user) {
      req.auth = {
        isAuth: false,
      };
      next();
      return;
    }

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
