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
    
    return{
        createPost,
        getAllPost,
        getUserPosts,
        deletePost,
        likePost,
        unLikePost
    }
}

export type postDbInterfaceType = typeof postDbInterface