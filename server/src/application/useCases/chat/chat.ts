import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { chatDbInterfaceType } from "../../repositories/chatDbRepositoryInterface";

export const chatCreate = async (
  senderId: string,
  receiverId: string,
  repository: ReturnType<chatDbInterfaceType>
) => {
  const chat = await repository.createChat(senderId, receiverId);

  if (!chat) {
    throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
  }
  return chat;
};
export const getAllChats = async (
  userId: string,
  repository: ReturnType<chatDbInterfaceType>
) => {
  const getChats = await repository.getAllChat(userId);
  if (!getChats) {
    throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
  }
  return getChats;
};
export const getChat = async (
  firstId: string,
  secondId: string,
  repository: ReturnType<chatDbInterfaceType>
) => {
  const getChats = await repository.getChat(firstId, secondId);
  if (!getChats) {
    throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
  }
  return getChats;
};
