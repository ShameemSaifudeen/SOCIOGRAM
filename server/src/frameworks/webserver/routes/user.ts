import express from "express";
import userController from "../../../adapters/controllers/userController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import {
  userRepositoryMongoDB,
  UserRepositoryMongoDB,
} from "../../database/Mongodb/repositories/userRepository";
import { upload } from "../../services/multer";
import userAuthMiddleware from "../middlewares/authMiddleWare";


const userRouter = () => {
  const router = express.Router();
  const controller = userController(userDbRepository, userRepositoryMongoDB);
  router.get("/search",userAuthMiddleware,controller.searchUser)
  router.get("/getUsers",userAuthMiddleware,controller.getAllUsers)
  router.get("/:id",userAuthMiddleware, controller.getUserById);
  router.put("/:id/updateProfile",upload.single("picture"),controller.updateProfile)
  router.put("/:friendId/follow",userAuthMiddleware, controller.putFollowUser);
  router.put("/:friendId/unFollow",userAuthMiddleware, controller.putUnFollowUser);
  router.get("/:id/followers",userAuthMiddleware, controller.getUserFriends);
  router.get("/:id/following",userAuthMiddleware, controller.getUserFollowing);
  router.put("/:id/userHandle", controller.handleUser);

  return router;
};
export default userRouter;
