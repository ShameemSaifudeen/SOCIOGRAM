import { type } from "os";
import Post from "../models/postModel";

export const postRepositoryImp = () => {
  const createPost = async (post: {
    userId: string;
    description: string;
    image: string;
    userName: string;
  }) => {
    const newPost = await new Post(post);

    return await newPost.save();
  };
  const getAllPost = async () => {
    return await Post.find();
  };
  const getUserPosts = async (id: string) => {
    return await Post.find({ userId: id });
  };
  const deletePost = async (id: string) => {
    const postDeleted: any = await Post.findByIdAndDelete({ _id: id });
    return postDeleted;
  };
  const likePost = async (id: string, loggedId: string) => {
    const post: any = await Post.findById({ _id: id });

    if (!post.likes.includes(loggedId)) {
      await post.updateOne(
        {
          $push: {
            likes: loggedId,
          },
        },
        { new: true }
      );
    } else {
      await post.updateOne(
        {
          $pull: {
            likes: loggedId,
          },
        },
        { new: true }
      );
    }
    return post;
  };
  const unLikePost = async (id: string, loggedId: string) => {
    const post: any = await Post.findById({ _id: id });

    if (post.likes.includes(loggedId)) {
      await post.updateOne({
        $pull: {
          likes: loggedId,
        },
      });
    } else {
      return null;
    }
    return post;
  };
  return {
    createPost,
    getAllPost,
    getUserPosts,
    deletePost,
    likePost,
    unLikePost,
  };
};

export type postRepositoryType = typeof postRepositoryImp;
