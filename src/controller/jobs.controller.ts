import { RequestHandler } from "express";
import logger from "../utils/logger";
import { findDataSearchParameter } from "../services/jobs_search.service";
import { StatusCodes } from "http-status-codes";
import ftstatus from "../constants/fulltime";
import { parseInt } from "lodash";

//* Basic document creation and checking with MongoDB

export const getPosition: RequestHandler = async (req, res) => {
  try {
    logger.info(`Fetching all data`);

    //* Handling fulltime
    let fulltime = ftstatus.both;
    if (req.query.is_fulltime != null) {
      logger.info("test");
      fulltime = req.query.is_fulltime == "true" ? ftstatus.yes : ftstatus.no;
    }
    //* Handling pagination
    const page = parseInt(<string>req.query.page) || 0;

    let query = {
      description: <string>req.query.description,
      location: <string>req.query.location,
      is_fulltime: fulltime,
      page: page,
    };
    const tik = await findDataSearchParameter(query);
    if (!tik) {
      logger.info("No matching job found");
      return res.status(StatusCodes.OK).json({ msg: "No matching job found" });
    }
    logger.info(`Found ${tik.length} jobs matched`);
    return res.status(StatusCodes.OK).send(tik);
  } catch (err: any) {
    logger.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  }
};
