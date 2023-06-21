"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepositoryMongoDB = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const adminRepositoryMongoDB = () => {
    const getAdminByUserName = async (userName) => {
        const admin = await adminModel_1.default.findOne({ userName });
        return admin;
    };
    return {
        getAdminByUserName,
        // getUserById,
    };
};
exports.adminRepositoryMongoDB = adminRepositoryMongoDB;
