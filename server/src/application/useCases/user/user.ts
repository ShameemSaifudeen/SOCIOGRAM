import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const userById = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const user = await repository.getUserById(id);

  if (!user) {
    throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
  }
  return user;
};
export const allUsers = async (
  repository: ReturnType<UserDbInterface>
) => {
  const users = await repository.getAllUsers();

  if (!users) {
    throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
  }
  return users;
};
export const profileUpdate = async (
  id: string,
  user: {
    name: string;
    userName: string;
    email: string;
    number: string;
    bio: string;
    location: string;
    displayPicture: string | null;
  },
  repository: ReturnType<UserDbInterface>
) => {
  const updateProfile = await repository.updateProfile(id, user);

  if (!updateProfile) {
    throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
  }
  return updateProfile;
};

export const followUser = async (
  id: string,
  friendId: string,
  repository: ReturnType<UserDbInterface>
) => {
  const result = await repository.followUser(id, friendId);
  if (!result) {
    throw new AppError("user is already followed", HttpStatus.FORBIDDEN);
  }
  return result;
};
export const userSearch = async (
  name: any,
  repository: ReturnType<UserDbInterface>
) => {
  const result = await repository.userSearch(name);
  if (!result) {
    throw new AppError("user is already followed", HttpStatus.FORBIDDEN);
  }
  return result;
};
export const unFollowUser = async (
  id: string,
  friendId: string,
  repository: ReturnType<UserDbInterface>
) => {
  const result = await repository.unFollowUser(id, friendId);
  if (!result) {
    throw new AppError("user is already unfollowed", HttpStatus.FORBIDDEN);
  }
  return result;
};
export const followersList = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const followers = await repository.followersList(id);
  // if(!followers){
  //   // throw new AppError("No Followers",HttpStatus.FORBIDDEN)

  // }
  return followers;
};
export const followingList = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const following = await repository.followingList(id);
  return following;
};
export const userHandle = async (
  id: string,
  repository: ReturnType<UserDbInterface>
) => {
  const result = await repository.userHandle(id);
  if (!result) {
    throw new AppError("Cannot find User", HttpStatus.FORBIDDEN);
  }
  return result;
};
