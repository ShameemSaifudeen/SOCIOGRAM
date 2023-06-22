import dotenv from "dotenv";

dotenv.config();
const configKeys = {
  MONGO_DB_URL: process.env.MONGODB_URL as string,
  PORT: process.env.PORT,
  ORIGIN_PORT: process.env.ORIGIN_PORT as string,
  JWT_SECRET: process.env.JWT_KEY as string,
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  API_KEY: process.env.API_KEY as string,
  API_SECRET: process.env.API_SECRET as string,
};

export default configKeys;
