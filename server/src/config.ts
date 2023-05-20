import dotenv from "dotenv";

dotenv.config();
const configKeys = {
  MONGO_DB_URL: process.env.MONGODB_URL as string,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_KEY as string
};

export default configKeys;
