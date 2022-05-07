import JobQuery from "../interfaces/jobs_query.interface";
import logger from "../utils/logger";
import { getDataFromDans } from "./jobs.service";
import { remove, lowerCase } from "lodash";
import Jobs from "../interfaces/jobs.interface";
import ftstatus from "../constants/fulltime";

const item_per_page = 5;

export async function findDataSearchParameter(query: JobQuery) {
  try {
    let data: Jobs[] = await getDataFromDans();
    if (query.is_fulltime != ftstatus.both) {
      remove(data, (pred) => {
        return query.is_fulltime == ftstatus.yes
          ? !(pred.type == "Full Time")
          : !(pred.type == "Part Time");
        // TODO: Make sure this is "Part Time"
      });
    }
    if (query.location) {
      remove(data, (pred) => {
        return !lowerCase(pred.location).includes(lowerCase(query.location));
      });
    }
    if (query.description) {
      remove(data, (pred) => {
        return !lowerCase(pred.description).includes(
          lowerCase(query.description)
        );
      });
    }
    if (query.page != 0) {
      logger.info(`${(query.page - 1) * item_per_page}`);
      logger.info(`${query.page * item_per_page}`);
      data = data.slice(
        (query.page - 1) * item_per_page,
        query.page * item_per_page
      );
    }
    return data;
  } catch (err: any) {
    throw err;
  }
}
