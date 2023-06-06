import express from "express";
import authController from "../../../adapters/controllers/authControllers";
import { adminDbRepository } from "../../../application/repositories/adminDbRepositoryInterface";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import {authServiceInterface} from "../../../application/services/authServiceInterface";
import { adminRepositoryMongoDB } from "../../database/Mongodb/repositories/adminRepository";
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
    adminDbRepository,
    adminRepositoryMongoDB
    );

   

    router.post('/register',controller.registerUser)

    router.post('/login',controller.loginUser)
    
    router.post('/googleLogin',controller.googleLoginUser)

    router.post('/adminLogin',controller.adminLogin)
  

    return router
}

export default authRouter