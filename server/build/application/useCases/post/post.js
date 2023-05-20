"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.postCreate = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const postCreate = async (post, repository) => {
    const newPost = await repository.createPost(post);
    console.log(post);
    if (!newPost) {
        throw new appError_1.default("post not created", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return newPost;
};
exports.postCreate = postCreate;
const getAllPosts = async (repository) => {
    const getPosts = await repository.getAllPost();
    if (!getPosts) {
        throw new appError_1.default("Posts Are not Available", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return getPosts;
};
exports.getAllPosts = getAllPosts;
