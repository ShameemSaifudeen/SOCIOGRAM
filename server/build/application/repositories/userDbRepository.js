"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = async (user) => {
        return await repository.addUser(user);
    };
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const getUserById = async (id) => await repository.getUserById(id);
    const getAllUsers = async () => await repository.getAllUsers();
    const updateProfile = async (id, user) => await repository.updateProfile(id, user);
    const getUserByUserName = async (userName) => await repository.getUserByUserName(userName);
    const followUser = async (id, friendId) => await repository.followUser(id, friendId);
    const getUserFollowing = async (id) => await repository.getUserFollowing(id);
    const unFollowUser = async (id, friendId) => await repository.unFollowUser(id, friendId);
    const followersList = async (id) => await repository.followersList(id);
    const followingList = async (id) => await repository.followingList(id);
    const userHandle = async (id) => await repository.userHandle(id);
    const userSearch = async (name) => await repository.userSearch(name);
    const reportUser = async (id, userId, reason) => await repository.reportUser(id, userId, reason);
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
exports.userDbRepository = userDbRepository;
