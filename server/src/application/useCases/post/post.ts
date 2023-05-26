import { log } from "console";
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
export const getUserPosts = async ( id: string,
  repository: ReturnType<postDbInterfaceType>
) => {
  const getPosts = await repository.getUserPosts(id);
  if (!getPosts) {
    throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
  }
  return getPosts;
};
export const postDelete = async (id: string, repository: ReturnType<postDbInterfaceType>) => {
  const deletePost = await repository.deletePost(id)
  if(!deletePost) {
    throw new AppError("Post Delete Failed", HttpStatus.BAD_REQUEST);
  }
  return deletePost;
}
export const postLike = async (id: string, loggedId: string, repository: ReturnType<postDbInterfaceType>) => {
  const likedPost = await repository.likePost(id, loggedId)
  console.log(likedPost);
  
  if(!likedPost) {

    
    throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
  }
  return likedPost
}
export const postUnLike = async (id: string, loggedId: string, repository: ReturnType<postDbInterfaceType>) => {
  const unLikedPost = await repository.unLikePost(id, loggedId)
  console.log(unLikedPost);
  
  if(!unLikedPost) {

    
    throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
  }
  return unLikedPost
}