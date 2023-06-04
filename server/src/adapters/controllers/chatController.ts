import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { chatDbInterfaceType } from "../../application/repositories/chatDbRepositoryInterface";
import { chatRepositoryType } from "../../frameworks/database/Mongodb/repositories/chatRepository";
import {
  chatCreate,
  getAllChats,
  getChat,
} from "../../application/useCases/chat/chat";

const chatController = (
  chatDbInterface: chatDbInterfaceType,
  chatDbImp: chatRepositoryType
) => {
  const dbRepositoryChat = chatDbInterface(chatDbImp());

  const createChat = asyncHandler(async (req: Request, res: Response) => {
    const {senderId} = req.body;
    const {recieverId} = req.body;
    const newChat = await chatCreate(senderId, recieverId, dbRepositoryChat);
    res.json({
      status: "success",
      newChat,
    });
  });
  const userChats = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const chats = await getAllChats(userId, dbRepositoryChat);
    res.json({
      status: "success",
      chats,
    });
  });
  const findChat = asyncHandler(async (req: Request, res: Response) => {
    const { firstId } = req.params;
    const { secondId } = req.params;
    const chat = await getChat(firstId, secondId, dbRepositoryChat);
    res.json({
      status: "success",
      chat,
    });
  });
  return {
    createChat,
    userChats,
    findChat,
  };
};
export default chatController;
