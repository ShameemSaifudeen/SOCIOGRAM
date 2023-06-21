"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.adminlogin = exports.userLogin = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const userRegister = async (user, userRepository, authService) => {
    user.email = user.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    const isExistingUserName = await userRepository.getUserByUserName(user.userName);
    if (isExistingUserName) {
        throw new appError_1.default("This Username is already taken", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (isExistingEmail) {
        throw new appError_1.default("An account is already registered with this mail", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (user.password.length <= 3) {
        throw new appError_1.default("Password Empty", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    user.password = await authService.encryptPassword(user.password);
    const users = await userRepository.addUser(user);
    const userId = users._id;
    const token = authService.generateToken(userId.toString());
    return { token, user: users };
};
exports.userRegister = userRegister;
const userLogin = async (userName, password, userRepository, authService) => {
    const user = await userRepository.getUserByUserName(userName);
    if (!user) {
        throw new appError_1.default("This user does not exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("Sorry, your password was incorrect. Please check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (user.isBlocked) {
        throw new appError_1.default("Sorry, your account is blocked by admin", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(user._id.toString());
    return { token, user };
};
exports.userLogin = userLogin;
const adminlogin = async (userName, password, adminRepository, authService) => {
    const admin = await adminRepository.getAdminByUserName(userName);
    if (!admin) {
        throw new appError_1.default("This admin does not exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("Sorry, your password was incorrect. Please check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(admin._id.toString());
    return { token, admin };
};
exports.adminlogin = adminlogin;
const googleLogin = async (userName, name, email, userRepository, authService) => {
    const user = {
        userName,
        name,
        email,
    };
    const isUserExist = await userRepository.getUserByEmail(email);
    if (isUserExist.isBlocked) {
        throw new appError_1.default("Sorry, your account is blocked by admin", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (isUserExist) {
        const token = authService.generateToken(isUserExist._id.toString());
        return { token, user: isUserExist };
    }
    else {
        const userDetails = await userRepository.addUser(user);
        const token = authService.generateToken(userDetails._id.toString());
        return { token, user: userDetails };
    }
};
exports.googleLogin = googleLogin;
