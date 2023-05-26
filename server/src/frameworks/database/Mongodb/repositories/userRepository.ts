// import { UserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";

export const userRepositoryMongoDB = () => {
  const addUser = async (user: {
    name: string;
    userName: string;
    email: string;
    number: number;
    password: string;
  }) => {
    console.log("qqqqq");

    const newUser = await new User(user);
    console.log(newUser);

    return await newUser.save();
  };
  const getUserByEmail = async (email: string) => {
    const user: any = await User.findOne({ email });
    return user;
  };
  const getUserByUserName = async (userName: string) => {
    const user: any = await User.findOne({ userName });
    return user;
  };
  const getUserById = async (id: string) => {
    const user: any = await User.findOne({ _id: id });
    return user;
  };
  const followUser = async (id: string, friendId: string) => {
    const followingUser: any = await User.findOne({ _id: id });
    const follow: any = await User.findOne({ _id: friendId });
    if (!follow.followers.includes(id)) {
      console.log("kkk");

      await followingUser.updateOne(
        {
          $push: {
            following: friendId,
          },
        },
        { new: true }
      );
      await follow.updateOne(
        {
          $push: {
            followers: id,
          },
        },
        { new: true }
      );
    } else {
      console.log("mmmm");
      await followingUser.updateOne(
        {
          $pull: {
            following: friendId,
          },
        },
        { new: true }
      );
      await follow.updateOne(
        {
          $pull: {
            followers: id,
          },
        },
        { new: true }
      );
    }
    const user: any = await User.findOne({ _id: id }).select("-password");
    const following = await Promise.all(
      user.following.map(
        async (id: string) => await User.findById(id).select("-password")
      )
    );
    console.log(following,"@");
    const followers = await Promise.all(
      user.followers.map(
        async (id: string) => await User.findById(id).select("-password")
      )
    );
    console.log(followers,"#");

    return {following,followers};
  };
  const unFollowUser = async (id: string, friendId: string) => {
    let followingUser: any = await User.findOne({ _id: id });
    let follow: any = await User.findOne({ _id: friendId });
    console.log(followingUser, follow, id, friendId);

    if (follow.followers.includes(id)) {
      console.log("kkk");

      await followingUser.updateOne(
        {
          $pull: {
            following: friendId,
          },
        },
        { new: true }
      );
      await follow.updateOne(
        {
          $pull: {
            followers: id,
          },
        },
        { new: true }
      );
    } else {
      return null;
    }
    followingUser = await User.findOne({ _id: id });
    follow = await User.findOne({ _id: friendId });
    return {
      follow,
      followingUser,
    };
  };
  const followersList: any = async (id: string) => {
    const user: any = await User.findOne({ _id: id }).select("-password");
    const followers = await Promise.all(
      user.followers.map(
        async (id: string) => await User.findById(id).select("-password")
      )
    );
    console.log(followers);

    return followers;
  };
  const followingList: Function = async (id: string) => {
    const user: any = await User.findOne({ _id: id }).select("-password");
    const following = await Promise.all(
      user.following.map(
        async (id: string) => await User.findById(id).select("-password")
      )
    );
    console.log(following);

    return following;
  };

  return {
    addUser,
    getUserByEmail,
    getUserByUserName,
    getUserById,
    followUser,
    unFollowUser,
    followersList,
    followingList,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
