import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const userById = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const user = await repository.getUserById(id)
  console.log(user);
  
  if(!user){
    throw new AppError("user not found",HttpStatus.UNAUTHORIZED)
  }
  return user
};
