import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import {
  userRegister,
  userLogin,
  googleLogin,
} from "../../application/useCases/auth/userAuth";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
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
  const googleLoginUser = asyncHandler(async (req: Request, res: Response) => {
    const userName: string = req.body?.givenName;
    const name: string = req.body?.name;
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
    googleLoginUser,
  };
};

export default authController;
