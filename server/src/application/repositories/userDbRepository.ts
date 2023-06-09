import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";

export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  const addUser = async (user: {
    name: string;
    userName: string;
    email: string;
    number?: number;
    password?: string;
  }) => {
    return await repository.addUser(user);
  };

  const getUserByEmail = async (email: string) =>
    await repository.getUserByEmail(email);
  const getUserById = async (id: string) => await repository.getUserById(id);
  const getAllUsers = async () => await repository.getAllUsers();
  const updateProfile = async (
    id: string,
    user: {
      name: string;
      userName: string;
      email: string;
      number?: string;
      bio?: string;
      location?: string;
      displayPicture?: string | null;
    }
  ) => await repository.updateProfile(id, user);
  const getUserByUserName = async (userName: string) =>
    await repository.getUserByUserName(userName);
  const followUser = async (id: string, friendId: string) =>
    await repository.followUser(id, friendId);
  const getUserFollowing = async (id: string) =>
    await repository.getUserFollowing(id);
  const unFollowUser = async (id: string, friendId: string) =>
    await repository.unFollowUser(id, friendId);
  const followersList = async (id: string) =>
    await repository.followersList(id);
  const followingList = async (id: string) =>
    await repository.followingList(id);
  const userHandle = async (id: string) =>
    await repository.userHandle(id);
  const userSearch = async (name: string) => await repository.userSearch(name);
  const reportUser = async ( id: string,userId: string,reason: string) => await repository.reportUser(id,userId,reason)

  return {
    addUser,
    getUserByEmail,
    getUserByUserName,
    updateProfile,
    getAllUsers,
    getUserById,
    followUser,
    userSearch,
    unFollowUser,
    followersList,
    followingList,
    userHandle,
    reportUser,
    getUserFollowing
  };
};
export type UserDbInterface = typeof userDbRepository;
