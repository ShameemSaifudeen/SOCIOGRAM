import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const userById = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const user = await repository.getUserById(id);
  console.log(user);

  if (!user) {
    throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
  }
  return user;
};

export const followUser = async (
  id: string,
  friendId: string,
  repository: ReturnType<UserDbInterface>
) => {
  const result = await repository.followUser(id, friendId)
  if(!result){
    throw new AppError("user is already followed",HttpStatus.FORBIDDEN)
  }
  return result
};
export const unFollowUser = async (
  id: string,
  friendId: string,
  repository: ReturnType<UserDbInterface>
) => {
  const result = await repository.unFollowUser(id, friendId)
  if(!result){
    throw new AppError("user is already unfollowed",HttpStatus.FORBIDDEN)
  }
  return result
};
export const followersList = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const followers = await repository.followersList(id)
  // if(!followers){
  //   // throw new AppError("No Followers",HttpStatus.FORBIDDEN)

  // }
  return followers
};
export const followingList = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const following = await repository.followingList(id)
  // if(!followers){
  //   // throw new AppError("No Followers",HttpStatus.FORBIDDEN)

  // }
  return following
};


