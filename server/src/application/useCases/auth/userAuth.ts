import { log } from "console";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";

export const userRegister = async (
  user: {
    name: string;
    userName: string;
    email: string;
    number: number;
    password: string;
  },
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {  
  user.email = user.email.toLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    console.log("existing email: ")
    throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
  }
  if(user.password.length<=3){
    console.log("password length is 0: ")
    throw new AppError("Password Empty", HttpStatus.BAD_REQUEST);
  }
  user.password = await authService.encryptPassword(user.password);
  const users = await userRepository.addUser(user);
  const userId=users._id
  const token = authService.generateToken(userId.toString());
  return {token,
  user: users
  };
};
export const userLogin = async (
  userName: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user:any= await userRepository.getUserByUserName(userName)
  if(!user){
    throw new AppError("this user does not exist",HttpStatus.UNAUTHORIZED)
  }
  const isPasswordCorrect = await authService.comparePassword(password,user.password)
  if(!isPasswordCorrect){
    throw new AppError("Sorry, your password was incorrect. Please check your password",HttpStatus.UNAUTHORIZED,)
  }
  const token = authService.generateToken(user._id.toString())
  return {token,user}
};
