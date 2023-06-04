import { Application } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import postRouter from "./post";
import messageRouter from "./message";

import userAuthMiddleware from "../middlewares/authMiddleWare";
import chatRouter from "./chat";

const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/user", userAuthMiddleware, userRouter());
  app.use("/api/post", userAuthMiddleware, postRouter());
  app.use("/api/chat", chatRouter());
  app.use("/api/message", messageRouter());
};

export default routes;
