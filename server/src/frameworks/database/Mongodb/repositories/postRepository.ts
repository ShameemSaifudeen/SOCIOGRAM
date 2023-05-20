import { type } from "os";
import Post from "../models/postModel";

export const postRepositoryImp = () => {
    const createPost = ( async (post: {
        userId: string;
        description: string;
        image: string;
        userName: string;
      }) => {
        const newPost = await new Post(post);
        console.log(newPost,"postImpl");
        return await newPost.save();
    }) 
    const getAllPost = async () => {
       return await Post.find()
    }
    return {
        createPost,
        getAllPost
    }
}

export type postRepositoryType = typeof postRepositoryImp