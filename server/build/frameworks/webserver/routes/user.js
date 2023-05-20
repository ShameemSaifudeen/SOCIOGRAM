"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../adapters/controllers/userController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepository_1 = require("../../database/Mongodb/repositories/userRepository");
const userRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.get('/:id', controller.getUserById);
    return router;
};
exports.default = userRouter;
