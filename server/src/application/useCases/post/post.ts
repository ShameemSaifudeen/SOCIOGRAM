import { log } from "console";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { postDbInterfaceType } from "../../repositories/postDbRepositoryInterface";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const postCreate = async (
  post: {
    userId: string;
    description: string;
    image: string[] ;
    userName: string;
  },
  repository: ReturnType<postDbInterfaceType>
) => {
  const newPost = await repository.createPost(post);
  if (!newPost) {
    throw new AppError("post not created", HttpStatus.BAD_REQUEST);
  }
  return newPost;
};
export const getAllPosts = async (
  repository: ReturnType<postDbInterfaceType>
) => {
  const getPosts = await repository.getAllPost();
  if (!getPosts) {
    throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
  }
  return getPosts;
};
export const getUserPosts = async (
  id: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const getPosts = await repository.getUserPosts(id);
  if (!getPosts) {
    throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
  }
  return getPosts;
};
export const singlePost = async (
  id: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const getPost = await repository.getSinglePost(id);
  if (!getPost) {
    throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
  }
  return getPost;
};
export const getUserDisplayPosts = async (
  id: string,
  repository: ReturnType<postDbInterfaceType>,
  userRepository:ReturnType<UserDbInterface>
) => {
  const getUserFollowering = await userRepository.getUserFollowing(id);
  getUserFollowering.push(id);
  

  const getPosts = await repository.getUserTimelinePosts(id,getUserFollowering);
  if (!getPosts) {
    throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
  }
  return getPosts;
};
export const postDelete = async (
  id: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const deletePost = await repository.deletePost(id);
  if (!deletePost) {
    throw new AppError("Post Delete Failed", HttpStatus.BAD_REQUEST);
  }
  return deletePost;
};
export const postLike = async (
  id: string,
  loggedId: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const likedPost = await repository.likePost(id, loggedId);

  if (!likedPost) {
    throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
  }
  return likedPost;
};
export const postUnLike = async (
  id: string,
  loggedId: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const unLikedPost = await repository.unLikePost(id, loggedId);

  if (!unLikedPost) {
    throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
  }
  return unLikedPost;
};
export const postEdit = async (
  postId: string,
  description: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const editPost = await repository.editPost(postId,description);

  if (!editPost) {
    throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
  }
  return editPost;
};
export const postReport = async (
  postId: string,
  userId: string,
  reason: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const reportPost = await repository.reportPost(postId,userId,reason);

  if (!reportPost) {
    throw new AppError("Reported Already", HttpStatus.BAD_REQUEST);
  }
  return reportPost;
};
export const addComment = async (
  postId: string,
  userId: string,
  comment: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const addComment = await repository.addComment(postId,userId,comment);

  if (!addComment) {
    throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
  }
  return addComment;
};
export const commentDelete = async (
  postId: string,
  userId: string,
  index: number,
  repository: ReturnType<postDbInterfaceType>
) => {
  const deleteComment = await repository.deleteComment(postId,userId,index);

  if (!deleteComment) {
    throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
  }
  return deleteComment;
};
