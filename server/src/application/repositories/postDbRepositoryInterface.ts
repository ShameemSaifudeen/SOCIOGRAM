import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository"

export const postDbInterface = (repository:ReturnType<postRepositoryType>) => {
    const createPost =   async (post:{
        userId: string;
        description: string;
        image: string;
        userName: string;
    })=> await repository.createPost(post)

    const getAllPost = async () => await repository.getAllPost()
    const getUserPosts = async (id: string) => await repository.getUserPosts(id)
    const deletePost = async (id: string) => await repository.deletePost(id) 
    const likePost = async (id: string, loggedId: string) => await repository.likePost(id, loggedId)
    const unLikePost = async (id: string, loggedId: string) => await repository.unLikePost(id, loggedId)
    const editPost = async ( postId: string,description: string) => await repository.editPost(postId,description)
    const reportPost = async ( postId: string,userId: string,reason: string) => await repository.reportPost(postId,userId,reason)
    const addComment = async ( postId: string,userId: string,comment: string) => await repository.addComment(postId,userId,comment)
    const deleteComment = async ( postId: string,userId: string,index: number) => await repository.deleteComment(postId,userId,index)
    
    return{
        createPost,
        getAllPost,
        getUserPosts,
        deletePost,
        likePost,
        unLikePost,
        editPost,
        addComment,
        reportPost,
        deleteComment
    }
}

export type postDbInterfaceType = typeof postDbInterface