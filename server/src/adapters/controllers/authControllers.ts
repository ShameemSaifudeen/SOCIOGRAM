import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { AdminDbInterface } from "../../application/repositories/adminDbRepositoryInterface";
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import { AdminRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/adminRepository";
import {
  userRegister,
  userLogin,
  googleLogin,
  adminlogin,
} from "../../application/useCases/auth/userAuth";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl: AdminRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl())
  const authService = authServiceInterface(authServiceImpl());

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, userName, email, number, password } = req.body;
    const user = {
      name,
      userName,
      email,
      number,
      password,
    };
    const token = await userRegister(user, dbRepositoryUser, authService);
    res.json({
      status: "success",
      message: "new user registered",
      token: token,
    });
  });

  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { userName, password }: { userName: string; password: string } =
      req.body;
    const token = await userLogin(
      userName,
      password,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "user verified",
      token,
    });
  });
  const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    const { userName, password }: { userName: string; password: string } =
      req.body;
      console.log(userName,":::");
      
    const token = await adminlogin(
      userName,
      password,
      dbRepositoryAdmin,
      authService
    );
    res.json({
      status: "success",
      message: "user verified",
      token,
    });
  });
  const googleLoginUser = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    
    // const firstName = req.body?.displayName.split(" ")[0];
    const userName: string = req.body?.displayName;
    const name: string = req.body?.displayName;
    const email: string = req.body?.email;
    const token = await googleLogin(
      userName,
      name,
      email,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "new user registered",
      token: token,
    });
  });

  return {
    registerUser,
    loginUser,
    adminLogin,
    googleLoginUser,
  };
};

export default authController;
