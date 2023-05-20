"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const userRegister = async (user, userRepository, authService) => {
    user.email = user.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        console.log("existing email: ");
        throw new appError_1.default("existing email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (user.password.length <= 3) {
        console.log("password length is 0: ");
        throw new appError_1.default("Password Empty", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    user.password = await authService.encryptPassword(user.password);
    const { _id: userId } = await userRepository.addUser(user);
    const token = authService.generateToken(userId.toString());
    return { token,
        user: userId
    };
};
exports.userRegister = userRegister;
const userLogin = async (userName, password, userRepository, authService) => {
    const user = await userRepository.getUserByUserName(userName);
    if (!user) {
        throw new appError_1.default("this user does not exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("Sorry, your password was incorrect. Please check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(user._id.toString());
    return { token, user };
};
exports.userLogin = userLogin;
