"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../adapters/controllers/userController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepository_1 = require("../../database/Mongodb/repositories/userRepository");
const multer_1 = require("../../services/multer");
const authMiddleWare_1 = __importDefault(require("../middlewares/authMiddleWare"));
const userRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.get("/search", authMiddleWare_1.default, controller.searchUser);
    router.get("/getUsers", authMiddleWare_1.default, controller.getAllUsers);
    router.get("/:id", authMiddleWare_1.default, controller.getUserById);
    router.put("/:id/updateProfile", multer_1.upload.single("picture"), controller.updateProfile);
    router.put("/:friendId/follow", authMiddleWare_1.default, controller.putFollowUser);
    router.put("/:friendId/unFollow", authMiddleWare_1.default, controller.putUnFollowUser);
    router.get("/:id/followers", authMiddleWare_1.default, controller.getUserFriends);
    router.get("/:id/following", authMiddleWare_1.default, controller.getUserFollowing);
    router.put("/:id/userHandle", controller.handleUser);
    router.put("/:id/report", authMiddleWare_1.default, controller.reportUser);
    return router;
};
exports.default = userRouter;
