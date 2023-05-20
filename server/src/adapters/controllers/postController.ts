import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository";
import { postDbInterfaceType } from "../../application/repositories/postDbRepositoryInterface";
import { postCreate ,getAllPosts} from "../../application/useCases/post/post";

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
  return {
    createPost,
    getPosts
  };
};
export default postController;
