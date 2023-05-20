"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userById = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const userById = async (id, repository) => {
    const user = await repository.getUserById(id);
    console.log(user);
    if (!user) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return user;
};
exports.userById = userById;
