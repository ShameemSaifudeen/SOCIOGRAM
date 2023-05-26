import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { userById,followUser,unFollowUser,followersList, followingList } from "../../application/useCases/user/user"; 
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";

const userController = (userDbRepository:UserDbInterface,userDbRepositoryImpl:UserRepositoryMongoDB) =>{
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())
    const getUserById = asyncHandler(async(req:Request,res:Response) => {
        const {id} = req.params
        console.log(id,"9");
        
       const user = await userById(id,dbRepositoryUser)
       res.json({
           status: "success",
           user
       })
    })
    const putFollowUser = asyncHandler(async(req: Request , res: Response)=> {
        const {friendId} = req.params
        const {id} = req.body
        const result = await followUser(id,friendId,dbRepositoryUser)
        res.json({
            status: "success",
            message: "follow request successfully",
            result
        })
    })
    const putUnFollowUser = asyncHandler(async(req: Request , res: Response)=> {
        const {friendId} = req.params
        const {id} = req.body
        const result = await unFollowUser(id,friendId,dbRepositoryUser)
        res.json({
            status: "success",
            message: "unfollow request successfully",
            result
        })
    })
    const getUserFriends = asyncHandler(async(req: Request , res: Response)=> {
        const {id} = req.params
        const followers = await followersList(id,dbRepositoryUser)
        res.json({
            status: "success",
            followers
        })
    })
    const getUserFollowing = asyncHandler(async(req: Request , res: Response)=> {
        const {id} = req.params
        const following = await followingList(id,dbRepositoryUser)
        res.json({
            status: "success",
            following
        })
    })
return{
    getUserById,
    putFollowUser,
    putUnFollowUser,
    getUserFriends,
    getUserFollowing
}
}
export default userController