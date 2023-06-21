"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/useCases/auth/userAuth");
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, adminDbRepository, adminDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { name, userName, email, number, password } = req.body;
        const user = {
            name,
            userName,
            email,
            number,
            password,
        };
        const token = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "new user registered",
            token: token,
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userName, password } = req.body;
        const token = await (0, userAuth_1.userLogin)(userName, password, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "user verified",
            token,
        });
    });
    const adminLogin = (0, express_async_handler_1.default)(async (req, res) => {
        const { userName, password } = req.body;
        const token = await (0, userAuth_1.adminlogin)(userName, password, dbRepositoryAdmin, authService);
        res.json({
            status: "success",
            message: "user verified",
            token,
        });
    });
    const googleLoginUser = (0, express_async_handler_1.default)(async (req, res) => {
        // const firstName = req.body?.displayName.split(" ")[0];
        const userName = req.body?.displayName;
        const name = req.body?.displayName;
        const email = req.body?.email;
        const token = await (0, userAuth_1.googleLogin)(userName, name, email, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "new user registered",
            token: token,
        });
    });
    return {
        registerUser,
        loginUser,
        adminLogin,
        googleLoginUser,
    };
};
exports.default = authController;
