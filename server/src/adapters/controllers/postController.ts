import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository";
import { postDbInterfaceType } from "../../application/repositories/postDbRepositoryInterface";
import { postCreate ,getAllPosts, getUserPosts, postDelete, postLike, postUnLike, postEdit, addComment, commentDelete, postReport, getUserDisplayPosts, singlePost} from "../../application/useCases/post/post";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";

const postController = (
  postDbInterface: postDbInterfaceType,
  postDbImp: postRepositoryType,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) => {
  const dbRepositoryPost = postDbInterface(postDbImp());
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const createPost = asyncHandler(async (req: Request, res: Response) => {
    
    const image: string[] = [];
    const { userId, description, userName } = req.body;
  const files: any = req?.files
    for (const file of files) {
      const picture = file.path;
      image.push(picture);
    }
    
  
    const post = { userId, description, image, userName };

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
  const getSinglePost = asyncHandler ( async (req:Request, res: Response) => {
    const {id} = req.params
    console.log(id,":::::");
    
    const posts = await singlePost(id, dbRepositoryPost)
    res.json({
      status : "success",
      posts
    })
  })
  const getDisplayPost = asyncHandler ( async (req:Request, res: Response) => {
    const {userId} = req.params
    const posts = await getUserDisplayPosts(userId, dbRepositoryPost,dbRepositoryUser)
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
  const editPost = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {description} = req.body
    const editedPost = await postEdit(postId,description,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully editedPost",
      editedPost
    })
  })
  const reportPost = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {userId,reason} = req.body
    const reportedPost = await postReport(postId,userId,reason,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully reportedPost",
      reportedPost
    })
  })
  const commentPost = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {userId,comment} = req.body
    const commentAdded = await addComment(postId,userId,comment,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully commentAdded",
      commentAdded
    })
  })
  const deleteComment = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {userId,index} = req.body
    const deletedComment = await commentDelete(postId,userId,index,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully commentAdded",
      deletedComment
    })
  })
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
export default postController;
