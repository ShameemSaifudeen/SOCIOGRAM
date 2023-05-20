"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_1 = require("../../application/useCases/post/post");
const postController = (postDbInterface, postDbImp) => {
    const dbRepositoryPost = postDbInterface(postDbImp());
    const createPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId, description, image } = req.body;
        const post = { userId, description, image };
        const newPost = await (0, post_1.postCreate)(post, dbRepositoryPost);
        res.json({
            status: "success",
            newPost,
        });
    });
    const getPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const posts = await (0, post_1.getAllPosts)(dbRepositoryPost);
        res.json({
            status: "success",
            posts
        });
    });
    return {
        createPost,
        getPosts
    };
};
exports.default = postController;
