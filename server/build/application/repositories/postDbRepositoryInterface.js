"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDbInterface = void 0;
const postDbInterface = (repository) => {
    const createPost = async (post) => await repository.createPost(post);
    const getAllPost = async () => await repository.getAllPost();
    const getUserPosts = async (id) => await repository.getUserPosts(id);
    const getSinglePost = async (id) => await repository.getSinglePost(id);
    const getUserTimelinePosts = async (id, followers) => await repository.getUserTimelinePosts(id, followers);
    const deletePost = async (id) => await repository.deletePost(id);
    const likePost = async (id, loggedId) => await repository.likePost(id, loggedId);
    const unLikePost = async (id, loggedId) => await repository.unLikePost(id, loggedId);
    const editPost = async (postId, description) => await repository.editPost(postId, description);
    const reportPost = async (postId, userId, reason) => await repository.reportPost(postId, userId, reason);
    const addComment = async (postId, userId, comment) => await repository.addComment(postId, userId, comment);
    const deleteComment = async (postId, userId, index) => await repository.deleteComment(postId, userId, index);
    return {
        createPost,
        getAllPost,
        getUserPosts,
        getSinglePost,
        getUserTimelinePosts,
        deletePost,
        likePost,
        unLikePost,
        editPost,
        addComment,
        reportPost,
        deleteComment
    };
};
exports.postDbInterface = postDbInterface;
