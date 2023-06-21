"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    MONGO_DB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    ORIGIN_PORT: process.env.ORIGIN_PORT,
    JWT_SECRET: process.env.JWT_KEY
};
exports.default = configKeys;
