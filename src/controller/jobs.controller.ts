import { RequestHandler } from "express";
import logger from "../utils/logger";
import { findDataSearchParameter } from "../services/jobs-search.service";
import { StatusCodes } from "http-status-codes";

//* Basic document creation and checking with MongoDB

export const getPosition: RequestHandler = async (req, res) => {
  const token = req.query.token as string;
  logger.info(`Fetching all data`);
  try {
    const tik = await findDataSearchParameter({ token: token });
    if (!tik) {
      logger.info("Jobs not found");
      return res.status(StatusCodes.OK).json({ msg: "No jobs found" });
    }
    logger.info(`Found ${tik.length} jobs matched`);
    return res.status(StatusCodes.OK).send(tik);
  } catch (err: any) {
    logger.error(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  }
};
