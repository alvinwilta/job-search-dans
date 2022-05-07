import { Router } from "express";
import { getPosition } from "../controller/jobs.controller";
import { verifyToken } from "../middlewares/auth.jwt";

const ticketRoute = Router();

ticketRoute.get("/", verifyToken, getPosition);

export default ticketRoute;
