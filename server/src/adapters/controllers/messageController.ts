import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { messageDbInterfaceType } from "../../application/repositories/messageDbRepositoryInterface";
import { messageRepositoryType } from "../../frameworks/database/Mongodb/repositories/messageRepository";
import { messageAdd, getMessage } from "../../application/useCases/message/message";

const messageController = (
  messageDbInterface: messageDbInterfaceType,
  messageDbImp: messageRepositoryType
) => {
  const dbRepositorymessage = messageDbInterface(messageDbImp());

  const addMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId, senderId, message } = req.body;
    const messages = await messageAdd(
      chatId,
      senderId,
      message,
      dbRepositorymessage
    );
    res.json({
      status: "success",
      messages,
    });
  });
  const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
    const messages = await getMessage(
      chatId,
      dbRepositorymessage
    );
    res.json({
      status: "success",
      messages,
    });
  });

  return {
    addMessage,
    getMessages
  };
};
export default messageController;
