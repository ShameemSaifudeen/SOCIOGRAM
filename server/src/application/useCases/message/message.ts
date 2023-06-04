import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { messageDbInterfaceType } from "../../repositories/messageDbRepositoryInterface"; 

export const messageAdd = async (
  chatId: string,
  senderId: string,
  message: string,
  repository: ReturnType<messageDbInterfaceType>
) => {
  const messages = await repository.createMessage(chatId, senderId, message);

  if (!messages) {
    throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
  }
  return messages;
};
export const getMessage = async (
  chatId: string,
  repository: ReturnType<messageDbInterfaceType>
) => {
  const messages = await repository.getMessage(chatId);

  if (!messages) {
    throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
  }
  return messages;
};
