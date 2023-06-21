"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepositoryMongoDB = () => {
    const addUser = async (user) => {
        const newUser = await new userModel_1.default(user);
        return await newUser.save();
    };
    const getUserByEmail = async (email) => {
        const user = await userModel_1.default.findOne({ email });
        return user;
    };
    const getUserByUserName = async (userName) => {
        const user = await userModel_1.default.findOne({ userName });
        return user;
    };
    const getUserById = async (id) => {
        const user = await userModel_1.default.findOne({ _id: id });
        return user;
    };
    const getAllUsers = async () => {
        try {
            const usersWithPosts = await userModel_1.default.aggregate([
                {
                    $lookup: {
                        from: 'posts',
                        let: { userId: { $toString: '$_id' } },
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
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };
    const userSearch = async (name) => {
        const user = await userModel_1.default.find({
            name: { $regex: `^${name}`, $options: "i" },
        });
        return user;
    };
    const reportUser = async (id, userId, reason) => {
        try {
            const user = await userModel_1.default.findById(id);
            const isReported = user.report.some((report) => report.userId === userId);
            if (isReported) {
                return null;
            }
            user.report.push({ userId, reason });
            await user.save();
            return user;
        }
        catch (error) {
            console.error(error);
        }
    };
    const getUserFollowing = async (id) => {
        const user = await userModel_1.default.findById(id).select("following").exec();
        const followingIds = user.following.map((following) => following.toString());
        return followingIds;
    };
    const updateProfile = async (id, user) => {
        const updatedProfile = await userModel_1.default.findByIdAndUpdate(id, user, {
            new: true,
        });
        return updatedProfile;
    };
    const followUser = async (id, friendId) => {
        const followingUser = await userModel_1.default.findOne({ _id: id });
        const follow = await userModel_1.default.findOne({ _id: friendId });
        if (!follow.followers.includes(id)) {
            await followingUser.updateOne({
                $push: {
                    following: friendId,
                },
            }, { new: true });
            await follow.updateOne({
                $push: {
                    followers: id,
                },
            }, { new: true });
        }
        else {
            await followingUser.updateOne({
                $pull: {
                    following: friendId,
                },
            }, { new: true });
            await follow.updateOne({
                $pull: {
                    followers: id,
                },
            }, { new: true });
        }
        const user = await userModel_1.default.findOne({ _id: id }).select("-password");
        const following = await Promise.all(user.following.map(async (id) => await userModel_1.default.findById(id).select("-password")));
        const followers = await Promise.all(user.followers.map(async (id) => await userModel_1.default.findById(id).select("-password")));
        return { following, followers };
    };
    const unFollowUser = async (id, friendId) => {
        let followingUser = await userModel_1.default.findOne({ _id: id });
        let follow = await userModel_1.default.findOne({ _id: friendId });
        if (follow.followers.includes(id)) {
            await followingUser.updateOne({
                $pull: {
                    following: friendId,
                },
            }, { new: true });
            await follow.updateOne({
                $pull: {
                    followers: id,
                },
            }, { new: true });
        }
        else {
            return null;
        }
        followingUser = await userModel_1.default.findOne({ _id: id });
        follow = await userModel_1.default.findOne({ _id: friendId });
        return {
            follow,
            followingUser,
        };
    };
    const followersList = async (id) => {
        const user = await userModel_1.default.findOne({ _id: id }).select("-password");
        const followers = await Promise.all(user.followers.map(async (id) => await userModel_1.default.findById(id).select("-password")));
        return followers;
    };
    const followingList = async (id) => {
        const user = await userModel_1.default.findOne({ _id: id }).select("-password");
        const following = await Promise.all(user.following.map(async (id) => await userModel_1.default.findById(id).select("-password")));
        return following;
    };
    const userHandle = async (id) => {
        try {
            const user = await userModel_1.default.findOne({ _id: id });
            if (!user) {
                return;
            }
            const newIsBlocked = !user.isBlocked;
            user.isBlocked = newIsBlocked;
            return await user.save();
        }
        catch (error) {
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
exports.userRepositoryMongoDB = userRepositoryMongoDB;
