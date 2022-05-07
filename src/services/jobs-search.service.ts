import logger from "../utils/logger";
import { getDataFromDans } from "./jobs.service";

export async function findDataSearchParameter(query: any) {
  try {
    return await getDataFromDans();
  } catch (err: any) {
    throw err;
  }
}
