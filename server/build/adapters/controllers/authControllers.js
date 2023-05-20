"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/useCases/auth/userAuth");
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        // const user: {
        //   name: string;
        //   userName: string;
        //   email: string;
        //   number: number;
        //   password: string;
        // } = req.body;
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
    return {
        registerUser,
        loginUser,
    };
};
exports.default = authController;
