import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
import logger from "../utils/logger";

//* Middleware to verify whether the jwt is valid

export const verifyToken: RequestHandler = (req, res, next) => {
  try {
    let token;
    if (req.body.token) {
      token = req.body.token;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({
        msg: "No token provided",
      });
    }
    if (!authConfig.accessTokenSecret) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Secret not provided");
    }
    jwt.verify(
      token,
      authConfig.accessTokenSecret!,
      (err: any, decoded: any) => {
        if (err) {
          logger.error(err.message);
          return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: "Invalid authorization",
          });
        }
        res.locals.decoded = decoded;
        next();
      }
    );
  } catch (err: any) {
    if (err.name !== "JsonWebTokenError") {
      logger.error(err);
    } else {
      logger.error("Invalid token", err.message);
    }
  }
};
