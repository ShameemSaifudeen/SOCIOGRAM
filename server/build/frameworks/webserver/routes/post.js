"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../../../adapters/controllers/postController"));
const postDbRepositoryInterface_1 = require("../../../application/repositories/postDbRepositoryInterface");
const postRepository_1 = require("../../database/Mongodb/repositories/postRepository");
const multer_1 = require("../../services/multer");
const postRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, postController_1.default)(postDbRepositoryInterface_1.postDbInterface, postRepository_1.postRepositoryImp);
    router.post("/", multer_1.upload.single("image"), controller.createPost);
    router.get("/", controller.getPosts);
    return router;
};
exports.default = postRouter;
