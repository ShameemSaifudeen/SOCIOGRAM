"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDbInterface = void 0;
const postDbInterface = (repository) => {
    const createPost = async (post) => await repository.createPost(post);
    const getAllPost = async () => await repository.getAllPost();
    return {
        createPost,
        getAllPost
    };
};
exports.postDbInterface = postDbInterface;
