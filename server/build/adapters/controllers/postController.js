"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_1 = require("../../application/useCases/post/post");
const postController = (postDbInterface, postDbImp, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryPost = postDbInterface(postDbImp());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const createPost = (0, express_async_handler_1.default)(async (req, res) => {
        const image = [];
        const { userId, description, userName } = req.body;
        const files = req?.files;
        for (const file of files) {
            const picture = file.filename;
            image.push(picture);
        }
        const post = { userId, description, image, userName };
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
    const getUserPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const posts = await (0, post_1.getUserPosts)(userId, dbRepositoryPost);
        res.json({
            status: "success",
            posts
        });
    });
    const getSinglePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        console.log(id, ":::::");
        const posts = await (0, post_1.singlePost)(id, dbRepositoryPost);
        res.json({
            status: "success",
            posts
        });
    });
    const getDisplayPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const posts = await (0, post_1.getUserDisplayPosts)(userId, dbRepositoryPost, dbRepositoryUser);
        res.json({
            status: "success",
            posts
        });
    });
    const deletePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const post = await (0, post_1.postDelete)(id, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully post deleted",
            post
        });
    });
    const likePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const { loggedId } = req.body;
        const likedPost = await (0, post_1.postLike)(id, loggedId, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully liked",
            likedPost
        });
    });
    const UnLikePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const { loggedId } = req.body;
        const unLikedPost = await (0, post_1.postUnLike)(id, loggedId, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully unliked",
            unLikedPost
        });
    });
    const editPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { description } = req.body;
        const editedPost = await (0, post_1.postEdit)(postId, description, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully editedPost",
            editedPost
        });
    });
    const reportPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { userId, reason } = req.body;
        const reportedPost = await (0, post_1.postReport)(postId, userId, reason, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully reportedPost",
            reportedPost
        });
    });
    const commentPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { userId, comment } = req.body;
        const commentAdded = await (0, post_1.addComment)(postId, userId, comment, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully commentAdded",
            commentAdded
        });
    });
    const deleteComment = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { userId, index } = req.body;
        const deletedComment = await (0, post_1.commentDelete)(postId, userId, index, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully commentAdded",
            deletedComment
        });
    });
    return {
        createPost,
        getPosts,
        getUserPost,
        getSinglePost,
        deletePost,
        likePost,
        UnLikePost,
        editPost,
        commentPost,
        reportPost,
        deleteComment,
        getDisplayPost
    };
};
exports.default = postController;
