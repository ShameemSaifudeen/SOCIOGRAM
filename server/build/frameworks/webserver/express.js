"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
// import configKeys from "../../config";
// import mongoSanitize from 'express-mongo-sanitize'
// import helmet from "helmet";
const expressConfig = (app) => {
    // Development logging
    app.use((0, morgan_1.default)("dev"));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173",
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    // app.use(helmet({xssFilter:true}))
    // app.use(mongoSanitize())
};
exports.default = expressConfig;
