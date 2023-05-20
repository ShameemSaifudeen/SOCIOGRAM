import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { postDbInterfaceType } from "../../repositories/postDbRepositoryInterface";

export const postCreate = async (
  post: {
    userId: string;
    description: string;
    image: string;
    userName: string;
  },
  repository: ReturnType<postDbInterfaceType>
) => {
  const newPost = await repository.createPost(post);
  console.log(post);

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
