import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository";
import { postDbInterfaceType } from "../../application/repositories/postDbRepositoryInterface";
import { postCreate ,getAllPosts, getUserPosts, postDelete, postLike, postUnLike} from "../../application/useCases/post/post";

const postController = (
  postDbInterface: postDbInterfaceType,
  postDbImp: postRepositoryType
) => {
  const dbRepositoryPost = postDbInterface(postDbImp());
  const createPost = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body,req.file);
    const image : any = req.file?.filename
    const { userId, description,userName } = req.body;   
    const post = { userId, description, image ,userName};
    const newPost = await postCreate(post, dbRepositoryPost);
    res.json({
      status: "success",
      newPost,
    });
  });
  const getPosts = asyncHandler ( async (req:Request, res: Response) => {
    const posts = await getAllPosts(dbRepositoryPost)
    res.json({
      status : "success",
      posts
    })
  })
  const getUserPost = asyncHandler ( async (req:Request, res: Response) => {
    const {userId} = req.params
    const posts = await getUserPosts(userId, dbRepositoryPost)
    res.json({
      status : "success",
      posts
    })
  })
  const deletePost = asyncHandler( async (req:Request, res: Response) => {
    const {id} = req.params
    const post = await postDelete(id, dbRepositoryPost)
    res.json({
      status : "success",
      message: "Successfully post deleted",
      post
    })
  })
  const likePost = asyncHandler( async (req: Request, res: Response) => {
    const{id} = req.params
    const{loggedId} = req.body
    
    const likedPost = await postLike(id,loggedId,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully liked",
      likedPost
    })
  })
  const UnLikePost = asyncHandler( async (req: Request, res: Response) => {
    const{id} = req.params
    const{loggedId} = req.body
    const unLikedPost = await postUnLike(id,loggedId,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully unliked",
      unLikedPost
    })
  })
  return {
    createPost,
    getPosts,
    getUserPost,
    deletePost,
    likePost,
    UnLikePost
  };
};
export default postController;
