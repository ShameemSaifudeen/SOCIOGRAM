"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("../../../adapters/controllers/authControllers"));
// import { adminDbRepository } from "../../../application/repositories/adminDbRepository";
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
// import { googleAuthServiceInterface } from "../../../application/services/googleAuthServiceInterface";
// import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepositoryMongoDB";
const userRepository_1 = require("../../database/Mongodb/repositories/userRepository");
const authService_1 = require("../../services/authService");
// import { googleAuthService } from "../../services/googleAuthService";
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.post('/register', controller.registerUser);
    router.post('/login', controller.loginUser);
    return router;
};
exports.default = authRouter;
