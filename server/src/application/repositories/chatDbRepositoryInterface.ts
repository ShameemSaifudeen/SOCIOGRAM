import { chatRepositoryType } from "../../frameworks/database/Mongodb/repositories/chatRepository";

export const chatDbInterface = (repository: ReturnType<chatRepositoryType>) => {
  const createChat = async (senderId: string, receiverId: string) =>
    await repository.createChat(senderId, receiverId);
  const getAllChat = async (userId: string) =>
    await repository.getAllChat(userId);
  const getChat = async (firstId: string, secondId: string) =>
    await repository.getChat(firstId, secondId);

  return {
    createChat,
    getAllChat,
    getChat,
  };
};

export type chatDbInterfaceType = typeof chatDbInterface;
