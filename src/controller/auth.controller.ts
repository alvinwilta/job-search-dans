import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createAccessToken,
  createAccount,
  findAccount,
  validatePassword,
} from "../services/account.service";
import { omit } from "lodash";
import logger from "../utils/logger";

//* Basic Authentication with JWT

const login: RequestHandler = async (req, res) => {
  try {
    //* validate input
    const username = req.body.username;
    const password = req.body.password;
    if (!(username && password))
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("username and/or password not provided!");

    //* check existing account
    const akun = await findAccount({ username: username });
    if (!akun) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Account not found" });
    }
    const isValid = await validatePassword(akun.username, password);
    if (!isValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Password invalid!" });
    }
    const token = await createAccessToken(username);
    return res
      .status(StatusCodes.OK)
      .send({ ...omit(akun, "password"), token: token });
  } catch (err: any) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Login error", err: err.message });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const user = await createAccount(req.body);
    return res.status(StatusCodes.OK).send(omit(user?.toJSON(), "password"));
  } catch (err: any) {
    logger.error(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Register error", err: err.message });
  }
};

const auth = { register, login };
export default auth;
