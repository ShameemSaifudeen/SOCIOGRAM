import express from "express";
import userController from "../../../adapters/controllers/userController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import {
  userRepositoryMongoDB,
  UserRepositoryMongoDB,
} from "../../database/Mongodb/repositories/userRepository";
import { upload } from "../../services/multer";


const userRouter = () => {
  const router = express.Router();
  const controller = userController(userDbRepository, userRepositoryMongoDB);
  router.get("/search",controller.searchUser)
  router.get("/getUsers",controller.getAllUsers)
  router.get("/:id", controller.getUserById);
  router.put("/:id/updateProfile",upload.single("picture"),controller.updateProfile)
  router.put("/:friendId/follow", controller.putFollowUser);
  router.put("/:friendId/unFollow", controller.putUnFollowUser);
  router.get("/:id/followers", controller.getUserFriends);
  router.get("/:id/following", controller.getUserFollowing);
  router.put("/:id/userHandle", controller.handleUser);

  return router;
};
export default userRouter;
