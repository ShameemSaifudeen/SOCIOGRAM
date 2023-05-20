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

  return router;
};
export default postRouter;
