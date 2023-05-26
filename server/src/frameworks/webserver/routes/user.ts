import express from "express";
import userController from "../../../adapters/controllers/userController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import {
  userRepositoryMongoDB,
  UserRepositoryMongoDB,
} from "../../database/Mongodb/repositories/userRepository";

const userRouter = () => {
  const router = express.Router();
  const controller = userController(userDbRepository, userRepositoryMongoDB);

  router.get("/:id", controller.getUserById);
  router.put("/:friendId/follow", controller.putFollowUser);
  router.put("/:friendId/unFollow", controller.putUnFollowUser);
  router.get("/:id/followers", controller.getUserFriends);
  router.get("/:id/following", controller.getUserFollowing);

  return router;
};
export default userRouter;
