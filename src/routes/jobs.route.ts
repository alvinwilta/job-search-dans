import { Router } from "express";
import { getJobs, getOneJob } from "../controller/jobs.controller";
import { verifyToken } from "../middlewares/auth.jwt";

const jobRoute = Router();

jobRoute.get("/", verifyToken, getJobs);
jobRoute.get("/details/:id", verifyToken, getOneJob);

export default jobRoute;
