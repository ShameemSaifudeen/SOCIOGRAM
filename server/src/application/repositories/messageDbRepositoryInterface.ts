import { messageRepositoryType } from "../../frameworks/database/Mongodb/repositories/messageRepository";

export const messageDbInterface = (repository: ReturnType<messageRepositoryType>) => {
  const createMessage = async ( chatId: string,
    senderId: string,
    message: string) => await repository.createMessage(chatId, senderId, message)
  const getMessage = async ( chatId: string) => await repository.getMessage(chatId)

  return {
    createMessage,
    getMessage
  };
};

export type messageDbInterfaceType = typeof messageDbInterface;
