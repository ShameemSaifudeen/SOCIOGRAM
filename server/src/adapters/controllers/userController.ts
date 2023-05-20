import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { userById } from "../../application/useCases/user/user"; 
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";

const userController = (userDbRepository:UserDbInterface,userDbRepositoryImpl:UserRepositoryMongoDB) =>{
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())
    const getUserById = asyncHandler(async(req:Request,res:Response) => {
        const {id} = req.params
        console.log(id);
        
       const user = await userById(id,dbRepositoryUser)
       res.json({
           status: "success",
           user
       })
    })
return{
    getUserById
}
}
export default userController