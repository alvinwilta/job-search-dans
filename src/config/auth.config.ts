import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const authConfig = {
  accessTokenSecret: process.env.SECRET,
  refreshTokenSecret: process.env.REFRESH_SECRET,
  salt: 10,
  accessTokenTtl: 15 * 60 * 1000,
  refreshTokenTtl: 365 * 24 * 60 * 1000,
};

export default authConfig;
