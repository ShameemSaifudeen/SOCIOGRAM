// import { UserInterface } from "../../../../types/userInterface";
import { log } from "console";
import User from "../models/userModel";

export const userRepositoryMongoDB = () => {
  const addUser = async (user: {
    name: string;
    userName: string;
    email: string;
    number?: number;
    password?: string;
  }) => {
    const newUser = await new User(user);

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
  const getAllUsers = async () => {
    try {
      const usersWithPosts = await User.aggregate([
        {
          $lookup: {
            from: 'posts',
            let: { userId: { $toString: '$_id' } }, // Convert _id to string
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$userId', '$$userId'], // Compare as string
                  },
                },
              },
            ],
            as: 'posts',
          },
        },
      ]);
  
      return usersWithPosts;
    }  catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  const userSearch = async (name: string) => {
    const user: any = await User.find({
      name: { $regex: `^${name}`, $options: "i" },
    });

    return user;
  };
  const reportUser = async (id: string, userId: string, reason: string) => {
    try {
      const user: any = await User.findById(id);
      const isReported = user.report.some((report: { userId: string }) => report.userId === userId);
      if (isReported) {
        return null;
      }
      user.report.push({ userId, reason });
      await user.save();
      return user;
    } catch (error) {
      console.error(error);
    }
  };
  const getUserFollowing = async (id: string) => {
    const user: any = await User.findById(id).select("following").exec();
    const followingIds = user.following.map((following: any) => following.toString());
    return followingIds;
  };
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
  ) => {
    const updatedProfile: any = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedProfile;
  };
  const followUser = async (id: string, friendId: string) => {
    const followingUser: any = await User.findOne({ _id: id });
    const follow: any = await User.findOne({ _id: friendId });
    if (!follow.followers.includes(id)) {
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

    const followers = await Promise.all(
      user.followers.map(
        async (id: string) => await User.findById(id).select("-password")
      )
    );

    return { following, followers };
  };
  const unFollowUser = async (id: string, friendId: string) => {
    let followingUser: any = await User.findOne({ _id: id });
    let follow: any = await User.findOne({ _id: friendId });

    if (follow.followers.includes(id)) {
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

    return followers;
  };
  const followingList: Function = async (id: string) => {
    const user: any = await User.findOne({ _id: id }).select("-password");
    const following = await Promise.all(
      user.following.map(
        async (id: string) => await User.findById(id).select("-password")
      )
    );

    return following;
  };
  const userHandle = async (id: string) => {
    try {
      const user: any = await User.findOne({ _id: id });
      if (!user) {
        return;
      }
      const newIsBlocked = !user.isBlocked;
      user.isBlocked = newIsBlocked;
      return await user.save();
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
    }
  };
  

  return {
    addUser,
    getUserByEmail,
    getAllUsers,
    getUserByUserName,
    getUserById,
    followUser,
    unFollowUser,
    updateProfile,
    userSearch,
    followersList,
    followingList,
    userHandle,
    reportUser,
    getUserFollowing
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
