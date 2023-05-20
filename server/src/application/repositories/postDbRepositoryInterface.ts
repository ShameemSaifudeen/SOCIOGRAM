import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository"

export const postDbInterface = (repository:ReturnType<postRepositoryType>) => {
    const createPost =   async (post:{
        userId: string;
        description: string;
        image: string;
        userName: string;
    })=> await repository.createPost(post)

    const getAllPost = async () => await repository.getAllPost()
    return{
        createPost,
        getAllPost
    }
}

export type postDbInterfaceType = typeof postDbInterface