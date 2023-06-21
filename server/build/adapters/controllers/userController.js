"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("../../application/useCases/user/user");
const userController = (userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const getUserById = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const user = await (0, user_1.userById)(id, dbRepositoryUser);
        res.json({
            status: "success",
            user,
        });
    });
    const getAllUsers = (0, express_async_handler_1.default)(async (req, res) => {
        const users = await (0, user_1.allUsers)(dbRepositoryUser);
        res.json({
            status: "success",
            users,
        });
    });
    const updateProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const displayPicture = req?.file?.filename;
        const { name, userName, email, number, bio, location } = req.body;
        const { id } = req.params;
        const user = {
            name,
            userName,
            email,
            number,
            bio,
            location,
            displayPicture,
        };
        const updatedProfile = await (0, user_1.profileUpdate)(id, user, dbRepositoryUser);
        res.json({
            status: "success",
            updatedProfile,
        });
    });
    const putFollowUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { friendId } = req.params;
        const { id } = req.body;
        const result = await (0, user_1.followUser)(id, friendId, dbRepositoryUser);
        res.json({
            status: "success",
            message: "follow request successfully",
            result,
        });
    });
    const searchUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { name } = req.query;
        if (!name) {
            // Return empty result
            res.json({
                status: "success",
                message: "No search query provided",
                result: [],
            });
        }
        const result = await (0, user_1.userSearch)(name, dbRepositoryUser);
        res.json({
            status: "success",
            message: "follow request successfully",
            result,
        });
    });
    const putUnFollowUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { friendId } = req.params;
        const { id } = req.body;
        const result = await (0, user_1.unFollowUser)(id, friendId, dbRepositoryUser);
        res.json({
            status: "success",
            message: "unfollow request successfully",
            result,
        });
    });
    const getUserFriends = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const followers = await (0, user_1.followersList)(id, dbRepositoryUser);
        res.json({
            status: "success",
            followers,
        });
    });
    const getUserFollowing = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const following = await (0, user_1.followingList)(id, dbRepositoryUser);
        res.json({
            status: "success",
            following,
        });
    });
    const handleUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const isBlocked = await (0, user_1.userHandle)(id, dbRepositoryUser);
        res.json({
            status: "success",
            isBlocked,
        });
    });
    const reportUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const { userId, reason } = req.body;
        const reportedUser = await (0, user_1.userReport)(id, userId, reason, dbRepositoryUser);
        res.json({
            status: "success",
            message: "Successfully reportedPost",
            reportedUser
        });
    });
    return {
        getUserById,
        getAllUsers,
        updateProfile,
        searchUser,
        putFollowUser,
        putUnFollowUser,
        getUserFriends,
        getUserFollowing,
        handleUser,
        reportUser
    };
};
exports.default = userController;
