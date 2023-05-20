"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositoryImp = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const postRepositoryImp = () => {
    const createPost = (async (post) => {
        const newPost = await new postModel_1.default(post);
        console.log(newPost, "postImpl");
        return await newPost.save();
    });
    const getAllPost = async () => {
        return await postModel_1.default.find();
    };
    return {
        createPost, getAllPost
    };
};
exports.postRepositoryImp = postRepositoryImp;
