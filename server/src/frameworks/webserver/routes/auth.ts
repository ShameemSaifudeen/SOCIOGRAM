import express from "express";
import authController from "../../../adapters/controllers/authControllers";
// import { adminDbRepository } from "../../../application/repositories/adminDbRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import {authServiceInterface} from "../../../application/services/authServiceInterface";
// import { googleAuthServiceInterface } from "../../../application/services/googleAuthServiceInterface";
// import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepositoryMongoDB";
import { userRepositoryMongoDB } from "../../database/Mongodb/repositories/userRepository";
import { authService } from "../../services/authService";
// import { googleAuthService } from "../../services/googleAuthService";


const authRouter=()=>{
    const router = express.Router();
    
    const controller = authController(
    authServiceInterface ,
    authService,
    userDbRepository,
    userRepositoryMongoDB,
    );

   

    router.post('/register',controller.registerUser)

    router.post('/login',controller.loginUser)

  

    return router
}

export default authRouter