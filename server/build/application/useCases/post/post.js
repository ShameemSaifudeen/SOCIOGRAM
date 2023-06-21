"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentDelete = exports.addComment = exports.postReport = exports.postEdit = exports.postUnLike = exports.postLike = exports.postDelete = exports.getUserDisplayPosts = exports.singlePost = exports.getUserPosts = exports.getAllPosts = exports.postCreate = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const postCreate = async (post, repository) => {
    const newPost = await repository.createPost(post);
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
const getUserPosts = async (id, repository) => {
    const getPosts = await repository.getUserPosts(id);
    if (!getPosts) {
        throw new appError_1.default("Posts Are not Available", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return getPosts;
};
exports.getUserPosts = getUserPosts;
const singlePost = async (id, repository) => {
    const getPost = await repository.getSinglePost(id);
    if (!getPost) {
        throw new appError_1.default("Posts Are not Available", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return getPost;
};
exports.singlePost = singlePost;
const getUserDisplayPosts = async (id, repository, userRepository) => {
    const getUserFollowering = await userRepository.getUserFollowing(id);
    getUserFollowering.push(id);
    const getPosts = await repository.getUserTimelinePosts(id, getUserFollowering);
    if (!getPosts) {
        throw new appError_1.default("Posts Are not Available", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return getPosts;
};
exports.getUserDisplayPosts = getUserDisplayPosts;
const postDelete = async (id, repository) => {
    const deletePost = await repository.deletePost(id);
    if (!deletePost) {
        throw new appError_1.default("Post Delete Failed", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return deletePost;
};
exports.postDelete = postDelete;
const postLike = async (id, loggedId, repository) => {
    const likedPost = await repository.likePost(id, loggedId);
    if (!likedPost) {
        throw new appError_1.default("Post not Found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return likedPost;
};
exports.postLike = postLike;
const postUnLike = async (id, loggedId, repository) => {
    const unLikedPost = await repository.unLikePost(id, loggedId);
    if (!unLikedPost) {
        throw new appError_1.default("Post not Found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return unLikedPost;
};
exports.postUnLike = postUnLike;
const postEdit = async (postId, description, repository) => {
    const editPost = await repository.editPost(postId, description);
    if (!editPost) {
        throw new appError_1.default("Post not Found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return editPost;
};
exports.postEdit = postEdit;
const postReport = async (postId, userId, reason, repository) => {
    const reportPost = await repository.reportPost(postId, userId, reason);
    if (!reportPost) {
        throw new appError_1.default("Reported Already", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return reportPost;
};
exports.postReport = postReport;
const addComment = async (postId, userId, comment, repository) => {
    const addComment = await repository.addComment(postId, userId, comment);
    if (!addComment) {
        throw new appError_1.default("Post not Found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return addComment;
};
exports.addComment = addComment;
const commentDelete = async (postId, userId, index, repository) => {
    const deleteComment = await repository.deleteComment(postId, userId, index);
    if (!deleteComment) {
        throw new appError_1.default("Post not Found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return deleteComment;
};
exports.commentDelete = commentDelete;
