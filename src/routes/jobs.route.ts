import { Router } from "express";
import { getPosition } from "../controller/jobs.controller";
import { verifyToken } from "../middlewares/auth.jwt";

const jobRoute = Router();

jobRoute.get("/", verifyToken, getPosition);
jobRoute.get("/detail");

export default jobRoute;
