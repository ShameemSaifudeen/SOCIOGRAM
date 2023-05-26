import express from "express";
import postController from "../../../adapters/controllers/postController";
import { postDbInterface } from "../../../application/repositories/postDbRepositoryInterface";
import { postRepositoryImp } from "../../database/Mongodb/repositories/postRepository";
import { upload } from "../../services/multer";

const postRouter = () => {
  const router = express.Router();
  const controller = postController(postDbInterface, postRepositoryImp);

  router.post("/",upload.single("picture"), controller.createPost);
  router.get("/",controller.getPosts)
  router.get('/:userId',controller.getUserPost)
  router.delete('/:id',controller.deletePost)
  router.put('/:id/like',controller.likePost)
  router.put('/:id/unlike',controller.UnLikePost)

  return router;
};
export default postRouter;
