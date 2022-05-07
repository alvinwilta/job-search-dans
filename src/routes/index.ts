import authRoute from "./auth.route";
import ticketRoute from "./jobs.route";

export default function setupRoute(app: any) {
  app.use("/jobs", ticketRoute);
  app.use("/auth", authRoute);
}
