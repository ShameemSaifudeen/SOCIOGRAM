import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";

export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  const addUser = async (user: {
    name: string;
    userName: string;
    email: string;
    number: number;
    password: string;
  }) => {
    console.log("mm");
    console.log(user);

   return await repository.addUser(user);
  };

  const getUserByEmail = async (email: string) => await repository.getUserByEmail(email);
  const getUserById = async (id: string) => await repository.getUserById(id);
  const getUserByUserName = async (userName: string) => await repository.getUserByUserName(userName);
  const followUser = async (id:string, friendId: string) => await repository.followUser(id, friendId);
  const unFollowUser = async (id:string, friendId: string) => await repository.unFollowUser(id, friendId);
  const followersList = async (id:string) => await repository.followersList(id);
  const followingList = async (id:string) => await repository.followingList(id);
  
  
  return {
    addUser,
    getUserByEmail,
    getUserByUserName,
    getUserById,
    followUser,
    unFollowUser,
    followersList,
    followingList
  };
};
export type UserDbInterface = typeof userDbRepository;
