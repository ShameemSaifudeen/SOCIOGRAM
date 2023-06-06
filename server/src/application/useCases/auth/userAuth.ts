import { log } from "console";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AdminDbInterface } from "../../repositories/adminDbRepositoryInterface";
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
  const isExistingUserName = await userRepository.getUserByUserName(
    user.userName
  );
  if (isExistingUserName) {
    throw new AppError(
      "This Username is already taken",
      HttpStatus.UNAUTHORIZED
    );
  }
  if (isExistingEmail) {
    throw new AppError(
      "An account is already registered with this mail",
      HttpStatus.UNAUTHORIZED
    );
  }
  if (user.password.length <= 3) {
    throw new AppError("Password Empty", HttpStatus.BAD_REQUEST);
  }
  user.password = await authService.encryptPassword(user.password);
  const users = await userRepository.addUser(user);
  const userId = users._id;
  const token = authService.generateToken(userId.toString());
  return { token, user: users };
};
export const userLogin = async (
  userName: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user: any = await userRepository.getUserByUserName(userName);
  if (!user) {
    throw new AppError("This user does not exist", HttpStatus.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      "Sorry, your password was incorrect. Please check your password",
      HttpStatus.UNAUTHORIZED
    );
  }
  const token = authService.generateToken(user._id.toString());
  return { token, user };
};
export const adminlogin = async (
  userName: string,
  password: string,
  adminRepository: ReturnType<AdminDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const admin: any = await adminRepository.getAdminByUserName(userName);
  if (!admin) {
    throw new AppError("This admin does not exist", HttpStatus.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    admin.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      "Sorry, your password was incorrect. Please check your password",
      HttpStatus.UNAUTHORIZED
    );
  }
  const token = authService.generateToken(admin._id.toString());
  return { token, admin };
};
export const googleLogin = async (
  userName: string,
  name: string,
  email: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = {
    userName,
    name,
    email,
  };
  const isUserExist = await userRepository.getUserByEmail(email);
  if (isUserExist) {
    const token = authService.generateToken(isUserExist._id.toString());
    return { token, user: isUserExist };
  } else {
    const userDetails = await userRepository.addUser(user);
    const token = authService.generateToken(userDetails._id.toString());
    return { token, user: userDetails };
  }
};
